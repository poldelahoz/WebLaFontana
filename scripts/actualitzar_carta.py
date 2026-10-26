"""Converteix el full de càlcul de la carta (maquetat a mà) en carta.js per a la web.

El full no té columnes fixes: s'interpreta com el llegiria una persona.
  - Cada fila té un text (qualsevol columna) i, opcionalment, un preu (l'últim número de la fila).
  - Una línia en MAJÚSCULES sense preu, aïllada per files buides, és un títol de secció.
  - Les línies sense preu seguides d'una línia amb preu formen un mateix plat
    (text partit en dues files, o nom en una fila i descripció a la de sota).
  - "NOM - descripció" o "NOM amb descripció" separa el nom de la descripció.
  - Les línies que comencen amb "*" són suplements / ingredients extra.
  - Dues o més files buides seguides sense títol obren un grup nou sense títol.

Ús:
  python scripts/actualitzar_carta.py <full.xlsx|full.xls> [--out carta.js] [--sense-traduccio]

Surt amb codi 1 (sense escriure res) si la carta resultant sembla incorrecta.
"""
from __future__ import annotations

import argparse
import datetime as dt
import io
import json
import re
import sys
import time
import unicodedata
import urllib.parse
import urllib.request
from pathlib import Path

HERE = Path(__file__).resolve().parent
CONFIG_PATH = HERE / "carta-config.json"
DICT_PATH = HERE / "carta-diccionari.json"

PRICE_RE = re.compile(r"^\s*(\d{1,3}(?:[.,]\d{1,2})?)\s*€?\s*$")
HYPHEN_SPLIT_RE = re.compile(r"\s+-\s*|\s*-\s+")
SMALL_WORDS = {"de", "del", "di", "la", "le", "les", "el", "els", "a", "al", "i", "e", "amb", "o"}


# ---------------------------------------------------------------- lectura

def _cell_to_row_parts(values):
    texts, prices = [], []
    for v in values:
        if v is None:
            continue
        if isinstance(v, bool):
            continue
        if isinstance(v, (int, float)):
            if v > 0:
                prices.append(float(v))
            continue
        s = str(v).strip()
        if not s:
            continue
        m = PRICE_RE.match(s)
        if m:
            prices.append(float(m.group(1).replace(",", ".")))
        else:
            texts.append(s)
    return " ".join(texts), (prices[-1] if prices else None)


def read_workbook(path: Path, ignored: set[str]):
    """Retorna [(nom_full, [(fila, text, preu), ...]), ...] dels fulls visibles."""
    sheets = []
    if path.suffix.lower() == ".xls":
        import xlrd
        book = xlrd.open_workbook(str(path))
        for sh in book.sheets():
            if sh.visibility != 0 or sh.name in ignored or sh.name.startswith("_"):
                continue
            rows = []
            for r in range(sh.nrows):
                text, price = _cell_to_row_parts(sh.row_values(r))
                if text or price is not None:
                    rows.append((r, text, price))
            sheets.append((sh.name, rows))
    else:
        import openpyxl
        book = openpyxl.load_workbook(str(path), data_only=True, read_only=False)
        for ws in book.worksheets:
            if ws.sheet_state != "visible" or ws.title in ignored or ws.title.startswith("_"):
                continue
            rows = []
            for r, values in enumerate(ws.iter_rows(values_only=True)):
                text, price = _cell_to_row_parts(values)
                if text or price is not None:
                    rows.append((r, text, price))
            sheets.append((ws.title, rows))
    return sheets


# ---------------------------------------------------------------- utilitats de text

def clean(s: str) -> str:
    s = s.replace(" ", " ")
    s = re.sub(r"\s+", " ", s).strip()
    s = re.sub(r"\s+([,.;:])", r"\1", s)
    return s


def strip_accents(s: str) -> str:
    return "".join(c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn")


def norm_key(s: str, fixes: dict[str, str]) -> str:
    words = re.findall(r"[a-z0-9]+", strip_accents(s.lower()))
    return " ".join(fixes.get(w, w) for w in words)


def letters(s: str) -> str:
    return "".join(c for c in s if c.isalpha())


def is_caps(s: str) -> bool:
    l = letters(s)
    return len(l) >= 2 and l == l.upper()


def first_word_caps(s: str) -> bool:
    for w in s.split():
        l = letters(w)
        if l:
            return len(l) >= 2 and l == l.upper()
    return False


def nice_name(raw: str, fixes: dict[str, str]) -> str:
    out = []
    for i, tok in enumerate(raw.split()):
        l = letters(tok)
        if not l or l != l.upper() or ("." in tok and len(l) <= 2):
            out.append(tok)
            continue
        low = tok.lower()
        core = strip_accents(re.sub(r"[^\w]", "", low))
        if core in fixes:
            low = low.replace(re.sub(r"[^\w]", "", low), fixes[core])
        if i > 0 and core in SMALL_WORDS:
            out.append(low)
        else:
            idx = next((k for k, c in enumerate(low) if c.isalpha()), 0)
            out.append(low[:idx] + low[idx].upper() + low[idx + 1:])
    return " ".join(out)


def sentence(s: str) -> str:
    s = clean(s).strip(" -")
    if not s:
        return s
    if is_caps(s):
        s = s.lower()
    return s[0].upper() + s[1:]


# ---------------------------------------------------------------- interpretació

def parse_sheet(rows):
    """Converteix les files d'un full en una seqüència d'esdeveniments."""
    events = []
    blocks, current, last_r = [], [], None
    for r, text, price in rows:
        if last_r is not None and r != last_r + 1:
            blocks.append((current, r - last_r - 1))
            current = []
        current.append((r, clean(text), price))
        last_r = r
    if current:
        blocks.append((current, 0))

    # gap_before[i] = files buides abans del bloc i
    gaps = [0] + [g for _, g in blocks[:-1]]
    for (block, _), gap in zip(blocks, gaps):
        if gap >= 2:
            events.append(("gap",))
        buf, star_buf = [], []
        for r, text, price in block:
            if text.startswith("*"):
                if buf:
                    events.append(("header", buf)); buf = []
                t = text.lstrip("* ").strip()
                if price is None:
                    if t.endswith(":"):
                        events.append(("extras_title", t.rstrip(": ")))
                    else:
                        star_buf.append(t)
                else:
                    events.append(("extra", clean(" ".join(star_buf + [t])), price)); star_buf = []
                continue
            if star_buf:
                # continuació d'una línia de suplement que no porta "*"
                if price is None:
                    star_buf.append(text)
                else:
                    events.append(("extra", clean(" ".join(star_buf + [text])), price)); star_buf = []
                continue
            if buf and len(buf) == 1 and is_caps(buf[0]) and " - " not in buf[0] and first_word_caps(text):
                # títol enganxat al primer plat, sense fila buida pel mig
                events.append(("header", buf)); buf = []
            if price is None:
                if text:
                    buf.append(text)
            else:
                events.append(("item", buf + ([text] if text else []), price)); buf = []
        if buf:
            events.append(("header", buf))
    return events


def split_item(lines, fixes):
    unit = None
    joined = clean(" ".join(lines))
    for pat, u in ((r"\(?\bració\b\)?", "portion"), (r"\(?\bunitat\b\)?", "unit")):
        if re.search(pat, joined, re.I):
            unit = u
            lines = [re.sub(pat, "", l, flags=re.I) for l in lines]
    lines = [clean(l) for l in lines if clean(l)]
    joined = clean(" ".join(lines))

    if len(lines) > 1 and is_caps(lines[0]) and not HYPHEN_SPLIT_RE.search(lines[0]):
        name, desc = lines[0], " ".join(lines[1:])
    else:
        parts = HYPHEN_SPLIT_RE.split(joined, maxsplit=1)
        if len(parts) == 2:
            name, desc = parts
        else:
            m = re.search(r"\s(amb)\s", joined)
            if m and is_caps(joined[: m.start()].split()[0]):
                name, desc = joined[: m.start()], joined[m.start():]
            else:
                name, desc = joined, ""
    return nice_name(clean(name), fixes), sentence(desc), unit


def auto_tags(name: str, desc: str, cfg) -> list[str]:
    text = strip_accents(f"{name} {desc}".lower())
    has = lambda words: any(strip_accents(w.lower()) in text for w in words)
    tags = []
    if has(cfg["paraules_vega"]):
        tags.append("vg")
    elif not has(cfg["paraules_carn_peix"]):
        tags.append("v")
    if has(cfg["paraules_picant"]):
        tags.append("hot")
    return tags


# ---------------------------------------------------------------- traducció

class Translator:
    """Tradueix CA→ES amb diccionari; els textos nous es tradueixen en lot amb translate_missing()."""

    CHUNK_CHARS = 4000

    def __init__(self, dictionary, fixes: dict[str, str]):
        self.d = dictionary
        self.fixes = fixes
        self.missing: list[str] = []
        self.new = 0

    def _fix(self, es: str) -> str:
        for wrong, right in self.fixes.items():
            es = es.replace(wrong, right)
        return es

    def es(self, ca: str) -> str | None:
        if not ca:
            return None
        if ca in self.d["textos"]:
            return self.d["textos"][ca]
        if ca in self.d["textos_auto"]:
            return self._fix(self.d["textos_auto"][ca])
        if ca not in self.missing:
            self.missing.append(ca)
        return None

    @staticmethod
    def _google(text: str) -> str:
        # Endpoint públic (no oficial) de Google Translate; sense clau. Si deixa de funcionar,
        # la web mostra el text en català fins que s'afegeixi la traducció a "textos".
        data = urllib.parse.urlencode({"q": text}).encode()
        url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=ca&tl=es&dt=t"
        req = urllib.request.Request(url, data=data, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
        return "".join(part[0] for part in payload[0] if part and part[0])

    def translate_missing(self):
        if not self.missing:
            return

        chunks, current = [], []
        for text in self.missing:
            if current and sum(len(t) + 1 for t in current) + len(text) > self.CHUNK_CHARS:
                chunks.append(current); current = []
            current.append(text)
        chunks.append(current)

        for i, chunk in enumerate(chunks):
            if i:
                time.sleep(1.5)
            try:
                result = self._google("\n".join(chunk))
            except Exception as exc:
                print(f"Avís: traducció automàtica fallida, es mostrarà el text en català ({exc})", file=sys.stderr)
                return
            lines = [l.strip() for l in (result or "").split("\n")]
            if len(lines) != len(chunk):
                print("Avís: la traducció automàtica ha tornat un nombre de línies diferent; s'ignora.", file=sys.stderr)
                continue
            for ca, es in zip(chunk, lines):
                if es:
                    self.d["textos_auto"][ca] = es
                    self.new += 1
        self.missing = []


def bi(ca: str, tr: Translator):
    es = tr.es(ca)
    return {"ca": ca, "es": es} if es and es != ca else ca


# ---------------------------------------------------------------- construcció

def build(sheets, cfg, dictionary, tr: Translator):
    fixes = cfg["correccions_noms"]
    tabs = {t["id"]: {"id": t["id"], "it": t["it"], "sub": t["sub"], "groups": []} for t in cfg["pestanyes"]}
    order = [t["id"] for t in cfg["pestanyes"]]

    def tab_for(header: str):
        h = strip_accents(header.lower())
        for t in cfg["pestanyes"]:
            if any(strip_accents(w.lower()) in h for w in t["paraules"]):
                return t["id"]
        return None

    stats = {"plats": 0}
    current_tab = order[0]
    group = None

    def new_group(title=None):
        nonlocal group
        note = None
        if title and HYPHEN_SPLIT_RE.search(title):
            # "ENTRANTS - PER PICAR I COMPARTIR" → títol + subtítol
            title, note = (sentence(p) for p in HYPHEN_SPLIT_RE.split(title, maxsplit=1))
        group = {"title": bi(title, tr) if title else None, "items": []}
        if note:
            group["note"] = bi(note, tr)
        tabs[current_tab]["groups"].append(group)

    for sheet_name, rows in sheets:
        group = None
        for ev in parse_sheet(rows):
            kind = ev[0]
            if kind == "header":
                title = sentence(" ".join(ev[1]))
                current_tab = tab_for(title) or current_tab
                new_group(title)
            elif kind == "gap":
                if group is not None and group["items"]:
                    group = None  # el proper plat obre un grup sense títol
            elif kind == "item":
                lines, price = ev[1], ev[2]
                if not lines:
                    continue
                name, desc, unit = split_item(lines, fixes)
                if group is None:
                    new_group()
                key = norm_key(name, fixes)
                known = dictionary["noms"].get(key)
                item = {"n": known if known else name, "p": round(price, 2)}
                if desc:
                    item["d"] = bi(desc, tr)
                if unit:
                    item["u"] = unit
                tags = dictionary["etiquetes"].get(key)
                if tags is None:
                    tags = auto_tags(name, desc, cfg)
                if tags:
                    item["t"] = tags
                group["items"].append(item)
                stats["plats"] += 1
            elif kind == "extras_title":
                if group is None:
                    new_group()
                group["extrasTitle"] = bi(sentence(ev[1]), tr)
            elif kind == "extra":
                if group is None:
                    new_group()
                group.setdefault("extras", []).append({"p": round(ev[2], 2), "d": bi(sentence(ev[1]), tr)})

    categories = []
    for tid in order:
        tab = tabs[tid]
        tab["groups"] = [g for g in tab["groups"] if g["items"] or g.get("extras")]
        for g in tab["groups"]:
            if g["title"] is None:
                del g["title"]
        if tab["groups"]:
            categories.append(tab)
        elif tid == "dolci":
            categories.append({"id": "dolci", "it": tab["it"], "sub": tab["sub"], "dolci": True})
    return categories, stats


def validate(categories, stats, cfg):
    errors = []
    if stats["plats"] < cfg["min_plats"]:
        errors.append(f"Només s'han trobat {stats['plats']} plats (mínim {cfg['min_plats']}).")
    for c in categories:
        for g in c.get("groups", []):
            for it in g["items"]:
                name = it["n"]["ca"] if isinstance(it["n"], dict) else it["n"]
                if not name or len(name) > 80:
                    errors.append(f"Nom de plat estrany: «{name[:90]}»")
                if not (0 < it["p"] < 200):
                    errors.append(f"Preu fora de rang a «{name}»: {it['p']}")
    return errors


# ---------------------------------------------------------------- sortida

def read_existing(out: Path):
    if not out.exists():
        return None
    m = re.search(r"window\.CARTA\s*=\s*(\{.*\});?\s*$", out.read_text(encoding="utf-8"), re.S)
    return json.loads(m.group(1)) if m else None


def _ca(v):
    return v.get("ca") if isinstance(v, dict) else (v or "")


def _flatten(categories):
    dishes = {}
    for c in categories or []:
        for g in c.get("groups", []):
            for it in g["items"]:
                name = _ca(it["n"])
                key = (c["it"], name)
                n = 2
                while key in dishes:  # plats repetits amb el mateix nom (p. ex. dos Gnocchi)
                    key = (c["it"], f"{name} ({n})"); n += 1
                dishes[key] = (it["p"], _ca(it.get("d")))
            for e in g.get("extras", []):
                dishes[(c["it"], "+ " + _ca(e["d"])[:60])] = (e["p"], "")
    return dishes


def compare(old_categories, new_categories) -> str:
    """Informe en Markdown dels canvis entre la carta publicada i la nova."""
    old, new = _flatten(old_categories), _flatten(new_categories)
    price = lambda p: f"{p:.2f} €".replace(".", ",")
    added = [k for k in new if k not in old]
    removed = [k for k in old if k not in new]
    prices = [(k, old[k][0], new[k][0]) for k in new if k in old and old[k][0] != new[k][0]]
    descs = [k for k in new if k in old and old[k][1] != new[k][1]]

    lines = []
    if not (added or removed or prices or descs):
        if old_categories == new_categories:
            return "**Cap canvi**: la carta del full és idèntica a la publicada.\n"
        lines.append("**Cap canvi de plats, preus ni descripcions** (només canvis menors de format o traducció).")
    for title, rows in (
        ("Preus canviats", [f"- {n} ({t}): {price(a)} → **{price(b)}**" for (t, n), a, b in prices]),
        ("Plats nous", [f"- {n} ({t}): {price(new[(t, n)][0])}" for t, n in added]),
        ("Plats eliminats", [f"- {n} ({t})" for t, n in removed]),
        ("Descripcions canviades", [f"- {n} ({t}): «{new[(t, n)][1]}»" for t, n in descs]),
    ):
        if rows:
            lines.append(f"### {title} ({len(rows)})")
            lines.extend(rows)
    return "\n".join(lines) + "\n"


def write_carta(out: Path, categories, source: str):
    existing = read_existing(out)
    if existing and existing.get("categories") == categories:
        return False
    data = {
        "updated": dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds"),
        "source": source,
        "categories": categories,
    }
    body = json.dumps(data, ensure_ascii=False, indent=1)
    out.write_text(
        "/* Generat automàticament per scripts/actualitzar_carta.py a partir del full de càlcul.\n"
        "   No l'editis a mà: els canvis es perdrien a la propera actualització. */\n"
        f"window.CARTA = {body};\n",
        encoding="utf-8",
    )
    return True


def main(argv=None):
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")
    ap = argparse.ArgumentParser()
    ap.add_argument("workbook", type=Path)
    ap.add_argument("--out", type=Path, default=HERE.parent / "carta.js")
    ap.add_argument("--sense-traduccio", action="store_true", help="no crida el traductor automàtic")
    ap.add_argument("--resum", action="store_true", help="mostra la carta interpretada per pantalla")
    ap.add_argument("--prova", action="store_true", help="no escriu cap fitxer; només informa dels canvis")
    ap.add_argument("--informe", type=Path, help="afegeix l'informe de canvis (Markdown) a aquest fitxer")
    args = ap.parse_args(argv)

    cfg = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    dictionary = json.loads(DICT_PATH.read_text(encoding="utf-8"))
    dictionary.setdefault("textos_auto", {})

    sheets = read_workbook(args.workbook, set(cfg.get("fulls_ignorats", [])))
    tr = Translator(dictionary, cfg.get("correccions_es", {}))
    categories, stats = build(sheets, cfg, dictionary, tr)
    if tr.missing and not args.sense_traduccio:
        tr.translate_missing()
        categories, stats = build(sheets, cfg, dictionary, tr)

    if args.resum:
        for c in categories:
            print(f"\n## {c['it']}")
            for g in c.get("groups", []):
                t = g.get("title")
                print(f"  -- {(t['ca'] if isinstance(t, dict) else t) or '(sense títol)'}")
                for it in g["items"]:
                    n = it["n"]["ca"] if isinstance(it["n"], dict) else it["n"]
                    d = it.get("d")
                    d = d["ca"] if isinstance(d, dict) else (d or "")
                    print(f"     {n:<34} {it['p']:>6.2f}  {','.join(it.get('t', [])):<6} {d[:70]}")
                for e in g.get("extras", []):
                    d = e["d"]["ca"] if isinstance(e["d"], dict) else e["d"]
                    print(f"     + {e['p']:.2f}  {d[:80]}")

    errors = validate(categories, stats, cfg)
    report_head = f"## Carta llegida del full: {stats['plats']} plats\n\n"
    if errors:
        print("La carta NO s'ha actualitzat:", *errors, sep="\n  - ", file=sys.stderr)
        if args.informe:
            with args.informe.open("a", encoding="utf-8") as f:
                f.write(report_head + "**ERROR: la carta no es publica.**\n\n" + "\n".join(f"- {e}" for e in errors) + "\n")
        return 1

    existing = read_existing(args.out)
    report = compare(existing.get("categories") if existing else None, categories)
    print(report)
    if args.informe:
        with args.informe.open("a", encoding="utf-8") as f:
            mode = "Mode **prova**: no s'ha publicat res.\n\n" if args.prova else ""
            f.write(report_head + mode + report)

    if args.prova:
        print(f"{stats['plats']} plats · mode prova, no s'ha escrit cap fitxer")
        return 0

    if tr.new:
        DICT_PATH.write_text(json.dumps(dictionary, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    changed = write_carta(args.out, categories, args.workbook.name)
    print(f"{stats['plats']} plats · {tr.new} traduccions noves · carta {'ACTUALITZADA' if changed else 'sense canvis'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
