/* =========================================================
   Restaurant La Fontana — app.js
   Vanilla JS (ES6+) · i18n CA/ES · Carta amb pestanyes ·
   Smooth scroll · Reveal on scroll · Estat obert/tancat
   ========================================================= */

(() => {
  'use strict';

  /* -------------------------------------------------------
     1. Diccionari i18n (CA per defecte, ES alternatiu)
     ------------------------------------------------------- */
  const I18N = {
    ca: {
      'meta.title': "Restaurant La Fontana · Cuina italiana a L'Ametlla del Vallès",
      'meta.description': "Restaurant i pizzeria italiana a L'Ametlla del Vallès. Pastes fresques, pizzes amb massa reposada tota la nit i producte italià D.O.P. Reserves: 93 845 76 06.",

      'a11y.skip': 'Salta al contingut',
      'a11y.menu': 'Obre el menú',
      'a11y.menuClose': 'Tanca el menú',
      'a11y.tabs': 'Categories de la carta',

      'nav.home': 'Inici',
      'nav.restaurant': 'El Restaurant',
      'nav.menu': 'La Carta',
      'nav.gallery': 'Galeria',
      'nav.contact': 'Contacte',
      'nav.delivery': 'A domicili',

      'cta.book': 'Reservar taula',
      'cta.bookShort': 'Reservar',
      'cta.menu': 'Veure la carta',
      'cta.call': 'Trucar i reservar',
      'cta.menuShort': 'Carta',
      'cta.mapShort': 'Mapa',

      'hero.eyebrow': "Restaurant · Pizzeria · L'Ametlla del Vallès",
      'hero.title': 'La cuina italiana de sempre, <em>feta sense presses</em>',
      'hero.lead': "Pastes fresques, pizzes amb massa reposada tota la nit i producte italià D.O.P., al cor de L'Ametlla del Vallès.",
      'hero.deliveryTitle': 'També a domicili i per emportar',
      'hero.deliveryText': 'Truca al 93 845 76 06 i fes la comanda',

      'delivery.eyebrow': 'A domicili · Per emportar',
      'delivery.title': 'La Fontana, <em>també a casa</em>',
      'delivery.lead': "Les nostres pizzes, pastes i plats de la carta, per endur-te'ls o perquè te'ls portem a casa. Només cal una trucada.",
      'delivery.phoneLabel': 'Truca i fes la comanda',
      'delivery.call': 'Trucar ara',
      'delivery.copy': 'Copiar el número',
      'delivery.copied': 'Número copiat',
      'delivery.hours': 'Mateix horari que el restaurant.',
      'delivery.hoursLink': 'Veure horaris',
      'delivery.promoNote': 'El <strong>Dilluns boig</strong> és només al restaurant i per recollir, no a domicili.',
      'delivery.s1t': 'Tria a la carta',
      'delivery.s1d': 'Mira la carta i apunta què et ve de gust.',
      'delivery.s1l': 'Obrir la carta',
      'delivery.s2t': "Truca'ns",
      'delivery.s2d': "Al 93 845 76 06. Et confirmem l'hora i, si és a domicili, l'adreça d'entrega.",
      'delivery.s3t': 'Recull-la o te la portem',
      'delivery.s3d': 'Passa a buscar-la pel restaurant (Carrer Poeta Maragall, 1) o rep-la a casa, ben calenta.',

      'story.eyebrow': "L'essència italiana",
      'story.title': 'Receptes amb memòria, <em>producte amb nom propi</em>',
      'story.p1': 'A La Fontana cuinem com es cuina a Itàlia: amb paciència, respecte per les receptes de sempre i ingredients que parlen per si sols.',
      'story.p2': "Fem la massa de les pizzes amb farines seleccionades i la deixem reposar d'un dia per l'altre, perquè surti lleugera i aromàtica. Les pastes arriben a taula al dente, amb salses fetes al moment, i a la cuina hi trobaràs mozzarella de búfala, burrata, mortadel·la D.O. i formatges italians de denominació d'origen.",
      'story.p3': 'Tot plegat en un local renovat, càlid i acollidor, pensat per a sopars sense presses, celebracions en família o una pizza per emportar quan ve de gust.',
      'story.k1': 'Impasto',
      'story.h1': 'Reposada tota la nit',
      'story.d1': "La massa es fa el dia abans i reposa fins a l'endemà.",
      'story.k2': 'Pasta',
      'story.h2': 'Sempre al dente',
      'story.d2': 'Pasta fresca i farcida, amb salses de la casa.',
      'story.k3': 'Prodotto',
      'story.h3': 'D.O.P. italià',
      'story.d3': "Burrata, búfala, provolone i embotits d'Itàlia.",
      'story.badge': 'La massa de les nostres pizzes',

      'menu.eyebrow': 'Il Menù',
      'menu.title': 'La Carta <em>Italiana</em>',
      'menu.lead': 'Per compartir, pastes, pizzes artesanes i cuina de mercat. També per emportar i a domicili.',
      'menu.orderTitle': 'Ho vols a casa?',
      'menu.orderText': 'Fes la comanda per emportar o a domicili al 93 845 76 06.',

      'promo.day': 'Cada dilluns',
      'promo.today': 'Avui és dilluns!',
      'promo.text': 'Preu especial en una selecció de pizzes i en alguns postres, per menjar al restaurant o per recollir.',
      'promo.note': "No s'aplica a les comandes a domicili. Pregunta'ns quines pizzes i postres hi entren.",
      'menu.allergens': "Si tens alguna al·lèrgia o intolerància, demana al nostre equip la informació d'al·lèrgens de cada plat.",
      'menu.pdf': 'Descarregar la carta (PDF)',
      'menu.takeaway': 'A domicili · 93 845 76 06',
      'menu.unit': 'unitat',
      'menu.portion': 'ració',
      'menu.extrasTitle': 'Ingredients extra',
      'menu.updated': 'Carta actualitzada el {date}',
      'menu.dolciTitle': 'Dolci <em>artigianali</em>',
      'menu.dolciText': "Els postres canvien segons el dia i la temporada: tiramisú, panna cotta i altres dolços fets a casa. Pregunta al nostre equip quins tenim avui.",
      'menu.dolciCta': 'Pregunta pels postres del dia',

      'legend.v': 'Vegetarià',
      'legend.vg': 'Vegà',
      'legend.hot': 'Picant',

      'gallery.eyebrow': 'Galeria',
      'gallery.title': 'Forn, taula <em>i bona companyia</em>',
      'gallery.c1': 'Pasta al dente',
      'gallery.c2': 'Crudo',
      'gallery.c3': 'La casa',
      'gallery.c4': 'Burrata',
      'gallery.c5': 'Alla brace',
      'gallery.c6': 'Caprese',
      'gallery.alt1': 'Spaghetti amb marisc, gamba i musclos',
      'gallery.alt2': 'Carpaccio de peix amb tomàquet i julivert',
      'gallery.alt3': 'Entrada del restaurant, porta de fusta i glicina florida',
      'gallery.alt4': 'Burrata amb pesto, tomàquet sec i olives',
      'gallery.alt5': 'Entrecot a la brasa amb verdures i patata',
      'gallery.alt6': 'Caprese de tomàquet i mozzarella amb orenga',

      'reviews.eyebrow': 'Ressenyes',
      'reviews.title': 'El que diuen <em>a la taula</em>',
      'reviews.badge': 'Llegeix totes les ressenyes a Google',

      'contact.eyebrow': 'Contacte',
      'contact.title': "Vine a <em>veure'ns</em>",
      'contact.address': 'Adreça',
      'contact.phone': 'Reserves, per emportar i a domicili',
      'contact.hours': 'Horari',
      'contact.directions': 'Com arribar',
      'contact.gmaps': 'Veure a Google Maps',

      'hours.closed': 'Tancat',
      'hours.today': 'Avui',
      'status.openUntil': 'Obert ara · fins a les {time}',
      'status.opensToday': 'Ara tancat · obrim avui a les {time}',
      'status.opensOn': 'Ara tancat · obrim {day} a les {time}',
      'status.opensTomorrow': 'Ara tancat · obrim demà a les {time}',

      'day.0': 'Diumenge', 'day.1': 'Dilluns', 'day.2': 'Dimarts', 'day.3': 'Dimecres',
      'day.4': 'Dijous', 'day.5': 'Divendres', 'day.6': 'Dissabte',

      'footer.tagline': "Restaurant i pizzeria a L'Ametlla del Vallès.",
      'footer.visit': "Visita'ns",
      'footer.follow': 'Segueix-nos',
      'footer.delivery': 'A domicili i per emportar',
      'footer.rights': 'Tots els drets reservats.',
      'footer.legal': 'Avís legal',
      'footer.privacy': 'Privacitat',
      'footer.cookies': 'Cookies'
    },

    es: {
      'meta.title': "Restaurant La Fontana · Cocina italiana en L'Ametlla del Vallès",
      'meta.description': "Restaurante y pizzería italiana en L'Ametlla del Vallès. Pastas frescas, pizzas con masa reposada toda la noche y producto italiano D.O.P. Reservas: 93 845 76 06.",

      'a11y.skip': 'Saltar al contenido',
      'a11y.menu': 'Abrir el menú',
      'a11y.menuClose': 'Cerrar el menú',
      'a11y.tabs': 'Categorías de la carta',

      'nav.home': 'Inicio',
      'nav.restaurant': 'El Restaurante',
      'nav.menu': 'La Carta',
      'nav.gallery': 'Galería',
      'nav.contact': 'Contacto',
      'nav.delivery': 'A domicilio',

      'cta.book': 'Reservar mesa',
      'cta.bookShort': 'Reservar',
      'cta.menu': 'Ver la carta',
      'cta.call': 'Llamar y reservar',
      'cta.menuShort': 'Carta',
      'cta.mapShort': 'Mapa',

      'hero.eyebrow': "Restaurante · Pizzería · L'Ametlla del Vallès",
      'hero.title': 'La cocina italiana de siempre, <em>hecha sin prisas</em>',
      'hero.lead': "Pastas frescas, pizzas con masa reposada toda la noche y producto italiano D.O.P., en el corazón de L'Ametlla del Vallès.",
      'hero.deliveryTitle': 'También a domicilio y para llevar',
      'hero.deliveryText': 'Llama al 93 845 76 06 y haz tu pedido',

      'delivery.eyebrow': 'A domicilio · Para llevar',
      'delivery.title': 'La Fontana, <em>también en casa</em>',
      'delivery.lead': 'Nuestras pizzas, pastas y platos de la carta, para llevar o para que te los llevemos a casa. Solo hace falta una llamada.',
      'delivery.phoneLabel': 'Llama y haz tu pedido',
      'delivery.call': 'Llamar ahora',
      'delivery.copy': 'Copiar el número',
      'delivery.copied': 'Número copiado',
      'delivery.hours': 'Mismo horario que el restaurante.',
      'delivery.hoursLink': 'Ver horarios',
      'delivery.promoNote': 'El <strong>Dilluns boig</strong> es solo en el restaurante y para recoger, no a domicilio.',
      'delivery.s1t': 'Elige en la carta',
      'delivery.s1d': 'Mira la carta y apunta lo que te apetece.',
      'delivery.s1l': 'Abrir la carta',
      'delivery.s2t': 'Llámanos',
      'delivery.s2d': 'Al 93 845 76 06. Te confirmamos la hora y, si es a domicilio, la dirección de entrega.',
      'delivery.s3t': 'Recógelo o te lo llevamos',
      'delivery.s3d': 'Pasa a recogerlo por el restaurante (Carrer Poeta Maragall, 1) o recíbelo en casa, bien calentito.',

      'story.eyebrow': 'La esencia italiana',
      'story.title': 'Recetas con memoria, <em>producto con nombre propio</em>',
      'story.p1': 'En La Fontana cocinamos como se cocina en Italia: con paciencia, respeto por las recetas de siempre e ingredientes que hablan por sí solos.',
      'story.p2': 'Hacemos la masa de las pizzas con harinas seleccionadas y la dejamos reposar de un día para otro, para que salga ligera y aromática. Las pastas llegan a la mesa al dente, con salsas hechas al momento, y en la cocina encontrarás mozzarella de búfala, burrata, mortadela D.O. y quesos italianos con denominación de origen.',
      'story.p3': 'Todo ello en un local renovado, cálido y acogedor, pensado para cenas sin prisas, celebraciones en familia o una pizza para llevar cuando apetece.',
      'story.k1': 'Impasto',
      'story.h1': 'Reposada toda la noche',
      'story.d1': 'La masa se hace el día antes y reposa hasta el día siguiente.',
      'story.k2': 'Pasta',
      'story.h2': 'Siempre al dente',
      'story.d2': 'Pasta fresca y rellena, con salsas de la casa.',
      'story.k3': 'Prodotto',
      'story.h3': 'D.O.P. italiano',
      'story.d3': 'Burrata, búfala, provolone y embutidos de Italia.',
      'story.badge': 'La masa de nuestras pizzas',

      'menu.eyebrow': 'Il Menù',
      'menu.title': 'La Carta <em>Italiana</em>',
      'menu.lead': 'Para compartir, pastas, pizzas artesanas y cocina de mercado. También para llevar y a domicilio.',
      'menu.orderTitle': '¿Lo quieres en casa?',
      'menu.orderText': 'Haz tu pedido para llevar o a domicilio al 93 845 76 06.',

      'promo.day': 'Cada lunes',
      'promo.today': '¡Hoy es lunes!',
      'promo.text': 'Precio especial en una selección de pizzas y en algunos postres, para comer en el restaurante o para recoger.',
      'promo.note': 'No se aplica a los pedidos a domicilio. Pregúntanos qué pizzas y postres entran.',
      'menu.allergens': 'Si tienes alguna alergia o intolerancia, pide a nuestro equipo la información de alérgenos de cada plato.',
      'menu.pdf': 'Descargar la carta (PDF)',
      'menu.takeaway': 'A domicilio · 93 845 76 06',
      'menu.unit': 'unidad',
      'menu.portion': 'ración',
      'menu.extrasTitle': 'Ingredientes extra',
      'menu.updated': 'Carta actualizada el {date}',
      'menu.dolciTitle': 'Dolci <em>artigianali</em>',
      'menu.dolciText': 'Los postres cambian según el día y la temporada: tiramisú, panna cotta y otros dulces caseros. Pregunta a nuestro equipo cuáles tenemos hoy.',
      'menu.dolciCta': 'Pregunta por los postres del día',

      'legend.v': 'Vegetariano',
      'legend.vg': 'Vegano',
      'legend.hot': 'Picante',

      'gallery.eyebrow': 'Galería',
      'gallery.title': 'Horno, mesa <em>y buena compañía</em>',
      'gallery.c1': 'Pasta al dente',
      'gallery.c2': 'Crudo',
      'gallery.c3': 'La casa',
      'gallery.c4': 'Burrata',
      'gallery.c5': 'Alla brace',
      'gallery.c6': 'Caprese',
      'gallery.alt1': 'Spaghetti con marisco, gamba y mejillones',
      'gallery.alt2': 'Carpaccio de pescado con tomate y perejil',
      'gallery.alt3': 'Entrada del restaurante, puerta de madera y glicina en flor',
      'gallery.alt4': 'Burrata con pesto, tomate seco y aceitunas',
      'gallery.alt5': 'Entrecot a la brasa con verduras y patata',
      'gallery.alt6': 'Caprese de tomate y mozzarella con orégano',

      'reviews.eyebrow': 'Reseñas',
      'reviews.title': 'Lo que dicen <em>en la mesa</em>',
      'reviews.badge': 'Lee todas las reseñas en Google',

      'contact.eyebrow': 'Contacto',
      'contact.title': 'Ven a <em>vernos</em>',
      'contact.address': 'Dirección',
      'contact.phone': 'Reservas, para llevar y a domicilio',
      'contact.hours': 'Horario',
      'contact.directions': 'Cómo llegar',
      'contact.gmaps': 'Ver en Google Maps',

      'hours.closed': 'Cerrado',
      'hours.today': 'Hoy',
      'status.openUntil': 'Abierto ahora · hasta las {time}',
      'status.opensToday': 'Ahora cerrado · abrimos hoy a las {time}',
      'status.opensOn': 'Ahora cerrado · abrimos el {day} a las {time}',
      'status.opensTomorrow': 'Ahora cerrado · abrimos mañana a las {time}',

      'day.0': 'Domingo', 'day.1': 'Lunes', 'day.2': 'Martes', 'day.3': 'Miércoles',
      'day.4': 'Jueves', 'day.5': 'Viernes', 'day.6': 'Sábado',

      'footer.tagline': "Restaurante y pizzería en L'Ametlla del Vallès.",
      'footer.visit': 'Visítanos',
      'footer.follow': 'Síguenos',
      'footer.delivery': 'A domicilio y para llevar',
      'footer.rights': 'Todos los derechos reservados.',
      'footer.legal': 'Aviso legal',
      'footer.privacy': 'Privacidad',
      'footer.cookies': 'Cookies'
    }
  };

  /* -------------------------------------------------------
     2. La carta: dades a carta.js (window.CARTA), generat a partir
        del full de càlcul per scripts/actualitzar_carta.py
        n: nom (string o {ca, es}) · d: descripció · p: preu €
        u: 'unit' | 'portion' · t: v = vegetarià, vg = vegà, hot = picant
     ------------------------------------------------------- */
  const CARTA = window.CARTA ?? { categories: [] };
  const MENU = CARTA.categories;

  /* -------------------------------------------------------
     3. Horari (minuts des de mitjanit). 0 = diumenge
     ------------------------------------------------------- */
  const HOURS = {
    0: [[13 * 60, 16 * 60], [20 * 60, 23 * 60]],
    1: [[20 * 60, 23 * 60]],
    2: [],
    3: [[20 * 60, 23 * 60]],
    4: [[20 * 60, 23 * 60]],
    5: [[20 * 60, 23 * 60 + 30]],
    6: [[13 * 60, 16 * 60], [20 * 60, 23 * 60 + 30]]
  };

  /* -------------------------------------------------------
     Utilitats
     ------------------------------------------------------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const STORAGE_KEY = 'lafontana-lang';
  const SUPPORTED = ['ca', 'es'];

  let lang = 'ca';
  let activeTab = MENU[0]?.id;

  const t = (key, vars = {}) => {
    const str = I18N[lang][key] ?? I18N.ca[key] ?? key;
    return str.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
  };
  const pick = (value) => (value && typeof value === 'object' ? value[lang] ?? value.ca : value);
  const formatPrice = (n) =>
    new Intl.NumberFormat(lang === 'es' ? 'es-ES' : 'ca-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n) + ' €';
  const formatTime = (mins) => `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;
  const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const storage = {
    get(key) { try { return window.localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { window.localStorage.setItem(key, value); } catch { /* storage unavailable */ } }
  };

  /* -------------------------------------------------------
     4. Render de la carta
     ------------------------------------------------------- */
  const TAG_HTML = {
    v: () => `<span class="tag tag--v" title="${escapeHtml(t('legend.v'))}"><svg class="icon" aria-hidden="true"><use href="#i-leaf"/></svg>V</span>`,
    vg: () => `<span class="tag tag--vg" title="${escapeHtml(t('legend.vg'))}"><svg class="icon" aria-hidden="true"><use href="#i-leaf"/></svg>VG</span>`,
    hot: () => `<span class="tag tag--hot" title="${escapeHtml(t('legend.hot'))}"><svg class="icon" aria-hidden="true"><use href="#i-flame"/></svg><span class="visually-hidden">${escapeHtml(t('legend.hot'))}</span></span>`
  };

  const dishHtml = (item) => {
    const name = escapeHtml(pick(item.n));
    const desc = item.d ? `<p class="dish__desc">${escapeHtml(pick(item.d))}</p>` : '';
    const tags = (item.t ?? []).map((tag) => TAG_HTML[tag]?.() ?? '').join('');
    const unit = item.u ? `<span class="dish__unit">${escapeHtml(t(item.u === 'unit' ? 'menu.unit' : 'menu.portion'))}</span>` : '';
    return `
      <li class="dish">
        <div class="dish__head"><h4 class="dish__name">${name}</h4>${tags}</div>
        <span class="dish__price">${formatPrice(item.p)}${unit}</span>
        ${desc}
      </li>`;
  };

  const groupHtml = (group) => {
    const note = group.note ? `<p class="menu-group__note">${escapeHtml(pick(group.note))}</p>` : '';
    const head = group.title || group.note
      ? `<header class="menu-group__head">
          ${group.title ? `<h3 class="menu-group__title">${escapeHtml(pick(group.title))}</h3>` : ''}
          ${note}
        </header>`
      : '';
    const extrasTitle = group.extrasTitle ? pick(group.extrasTitle) : t('menu.extrasTitle');
    const extras = group.extras
      ? `<div class="extras">
           <h4 class="extras__title">${escapeHtml(extrasTitle)}</h4>
           ${group.extras.map((e) => `<div class="extras__row"><span>${escapeHtml(pick(e.d))}</span><strong>+ ${formatPrice(e.p)}</strong></div>`).join('')}
         </div>`
      : '';
    return `
      <section class="menu-group">
        ${head}
        <ul class="dish-list">${group.items.map(dishHtml).join('')}</ul>
        ${extras}
      </section>`;
  };

  const dolciHtml = () => `
    <div class="dolci">
      <div class="dolci__img">
        <img src="img/tiramisu.jpg" alt="" loading="lazy" width="900" height="600">
      </div>
      <div class="dolci__body">
        <h3 class="dolci__title">${t('menu.dolciTitle')}</h3>
        <p>${escapeHtml(t('menu.dolciText'))}</p>
        <a class="btn btn--primary" href="tel:+34938457606">
          <svg class="icon" aria-hidden="true"><use href="#i-phone"/></svg>
          <span>${escapeHtml(t('menu.dolciCta'))}</span>
        </a>
      </div>
    </div>`;

  const renderMenu = () => {
    const tabsEl = $('[data-menu-tabs]');
    const panelsEl = $('[data-menu-panels]');
    if (!tabsEl || !panelsEl) return;

    tabsEl.setAttribute('aria-label', t('a11y.tabs'));

    const updatedEl = $('[data-menu-updated]');
    if (updatedEl && CARTA.updated) {
      const date = new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'ca-ES', { day: 'numeric', month: 'long', year: 'numeric' })
        .format(new Date(CARTA.updated));
      updatedEl.textContent = t('menu.updated', { date });
    }

    tabsEl.innerHTML = MENU.map((cat) => {
      const selected = cat.id === activeTab;
      return `
        <button type="button" class="menu-tab" role="tab"
                id="tab-${cat.id}" aria-controls="panel-${cat.id}"
                aria-selected="${selected}" tabindex="${selected ? 0 : -1}"
                data-tab="${cat.id}">
          <span class="menu-tab__it">${escapeHtml(cat.it)}</span>
          <span class="menu-tab__local">${escapeHtml(pick(cat.sub))}</span>
        </button>`;
    }).join('');

    panelsEl.innerHTML = MENU.map((cat) => `
      <div class="menu-panel" role="tabpanel" id="panel-${cat.id}"
           aria-labelledby="tab-${cat.id}" tabindex="0" ${cat.id === activeTab ? '' : 'hidden'}>
        ${cat.dolci ? dolciHtml() : cat.groups.map(groupHtml).join('')}
      </div>`).join('');
  };

  const selectTab = (id, { focus = false, scroll = false } = {}) => {
    if (id === activeTab && !focus) return;
    activeTab = id;

    $$('.menu-tab').forEach((tab) => {
      const selected = tab.dataset.tab === id;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected) {
        if (focus) tab.focus();
        tab.scrollIntoView({ block: 'nearest', inline: 'center', behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    });

    $$('.menu-panel').forEach((panel) => {
      const show = panel.id === `panel-${id}`;
      panel.hidden = !show;
      panel.classList.remove('is-entering');
      if (show) {
        void panel.offsetWidth; // restart the animation
        panel.classList.add('is-entering');
      }
    });

    if (scroll) {
      const wrap = $('.menu__tabs-wrap');
      const top = wrap.getBoundingClientRect().top;
      if (top < 0 || top > window.innerHeight * 0.5) scrollToEl($('#carta'));
    }
  };

  const initTabs = () => {
    const tabsEl = $('[data-menu-tabs]');
    if (!tabsEl) return;

    tabsEl.addEventListener('click', (e) => {
      const tab = e.target.closest('.menu-tab');
      if (tab) selectTab(tab.dataset.tab);
    });

    tabsEl.addEventListener('keydown', (e) => {
      const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
      if (!keys.includes(e.key)) return;
      e.preventDefault();
      const ids = MENU.map((c) => c.id);
      const idx = ids.indexOf(activeTab);
      const next =
        e.key === 'ArrowRight' ? ids[(idx + 1) % ids.length] :
        e.key === 'ArrowLeft' ? ids[(idx - 1 + ids.length) % ids.length] :
        e.key === 'Home' ? ids[0] : ids[ids.length - 1];
      selectTab(next, { focus: true });
    });
  };

  /* -------------------------------------------------------
     5. i18n: aplicar idioma
     ------------------------------------------------------- */
  const applyLanguage = (next) => {
    lang = SUPPORTED.includes(next) ? next : 'ca';
    document.documentElement.lang = lang;
    document.title = t('meta.title');
    $('meta[name="description"]')?.setAttribute('content', t('meta.description'));

    $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-html]').forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
    $$('[data-i18n-alt]').forEach((el) => { el.alt = t(el.dataset.i18nAlt); });

    $$('.lang-switch__btn').forEach((btn) => btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang)));

    const burgerLabel = $('.burger .visually-hidden');
    if (burgerLabel) burgerLabel.textContent = t(document.body.classList.contains('nav-open') ? 'a11y.menuClose' : 'a11y.menu');

    renderMenu();
    updateOpeningStatus();
  };

  const initLanguage = () => {
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    const initial = SUPPORTED.includes(fromUrl) ? fromUrl : storage.get(STORAGE_KEY) ?? 'ca';
    applyLanguage(initial);

    $$('.lang-switch__btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.dataset.lang === lang) return;
        storage.set(STORAGE_KEY, btn.dataset.lang);
        applyLanguage(btn.dataset.lang);
      });
    });
  };

  /* -------------------------------------------------------
     6. Navegació: header, menú mòbil, smooth scroll, actiu
     ------------------------------------------------------- */
  const header = $('.site-header');
  const burger = $('.burger');

  const headerOffset = () => (header ? header.getBoundingClientRect().height : 0);

  const scrollToEl = (el) => {
    if (!el) return;
    const top = el.id === 'inici' ? 0 : el.getBoundingClientRect().top + window.scrollY - headerOffset() + 1;
    window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  const setNavOpen = (open) => {
    document.body.classList.toggle('nav-open', open);
    burger?.setAttribute('aria-expanded', String(open));
    const label = $('.burger .visually-hidden');
    if (label) label.textContent = t(open ? 'a11y.menuClose' : 'a11y.menu');
  };

  const initNav = () => {
    burger?.addEventListener('click', () => setNavOpen(!document.body.classList.contains('nav-open')));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
        setNavOpen(false);
        burger?.focus();
      }
    });

    window.matchMedia('(min-width: 1080px)').addEventListener('change', (e) => { if (e.matches) setNavOpen(false); });

    // Smooth scroll for every in-page link
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute('href');
      if (hash.length < 2) return;
      const target = document.getElementById(hash.slice(1));
      if (!target) return;
      e.preventDefault();
      setNavOpen(false);
      scrollToEl(target);
      history.replaceState(null, '', hash);
    });

    // Header state on scroll + sticky mobile CTA
    const mobileCta = $('[data-mobile-cta]');
    const onScroll = () => {
      const y = window.scrollY;
      header?.classList.toggle('is-scrolled', y > 24);
      mobileCta?.classList.toggle('is-visible', y > window.innerHeight * 0.55);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Active link
    const links = $$('.nav__links a');
    const sections = links.map((a) => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${entry.target.id}`));
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sections.forEach((s) => io.observe(s));
    }
  };

  /* -------------------------------------------------------
     7. Animacions al fer scroll (Intersection Observer)
     ------------------------------------------------------- */
  const initReveal = () => {
    const items = $$('.reveal');
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    items.forEach((el, i) => {
      // Stagger siblings inside grids (gallery, reviews)
      const parent = el.parentElement;
      if (parent?.classList.contains('bento') || parent?.classList.contains('reviews__grid')) {
        el.style.transitionDelay = `${([...parent.children].indexOf(el) % 6) * 70}ms`;
      }
      io.observe(el);
    });
  };

  /* -------------------------------------------------------
     8. Estat obert / tancat + dia actual (hora de Madrid)
     ------------------------------------------------------- */
  const madridNow = () => {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Madrid', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date());
    const get = (type) => parts.find((p) => p.type === type)?.value;
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
    return { day, mins: Number(get('hour')) * 60 + Number(get('minute')) };
  };

  function updateOpeningStatus() {
    const { day, mins } = madridNow();

    $$('.hours__row').forEach((row) => {
      const isToday = Number(row.dataset.day) === day;
      row.classList.toggle('is-today', isToday);
      if (isToday) row.querySelector('dt')?.setAttribute('data-today-label', t('hours.today'));
    });

    const promo = $('[data-promo]');
    if (promo) {
      promo.classList.toggle('is-today', day === 1);
      $('[data-promo-day]', promo).textContent = t(day === 1 ? 'promo.today' : 'promo.day');
    }

    const chip = $('[data-status]');
    if (!chip) return;

    const current = HOURS[day].find(([open, close]) => mins >= open && mins < close);
    if (current) {
      chip.textContent = t('status.openUntil', { time: formatTime(current[1]) });
      chip.classList.add('is-open');
      return;
    }
    chip.classList.remove('is-open');

    const laterToday = HOURS[day].find(([open]) => open > mins);
    if (laterToday) {
      chip.textContent = t('status.opensToday', { time: formatTime(laterToday[0]) });
      return;
    }
    for (let i = 1; i <= 7; i++) {
      const d = (day + i) % 7;
      if (HOURS[d].length) {
        const time = formatTime(HOURS[d][0][0]);
        chip.textContent = i === 1
          ? t('status.opensTomorrow', { time })
          : t('status.opensOn', { day: t(`day.${d}`).toLowerCase(), time });
        return;
      }
    }
  }

  /* -------------------------------------------------------
     9. Carta en PDF (diàleg d'impressió → "Desa com a PDF")
     ------------------------------------------------------- */
  const initPrint = () => {
    $('[data-print-menu]')?.addEventListener('click', () => {
      $$('.reveal').forEach((el) => el.classList.add('is-visible'));
      window.print();
    });
  };

  /* -------------------------------------------------------
     10. Copiar el telèfon (útil a l'ordinador, on no es pot trucar)
     ------------------------------------------------------- */
  const initCopyPhone = () => {
    const btn = $('[data-copy-phone]');
    if (!btn) return;
    const label = $('[data-copy-label]', btn);
    const icon = $('[data-copy-icon] use', btn);
    const status = $('[data-copy-status]');
    let timer;

    const showCopied = () => {
      btn.classList.add('is-copied');
      label.textContent = t('delivery.copied');
      icon?.setAttribute('href', '#i-check');
      if (status) status.textContent = t('delivery.copied');
      clearTimeout(timer);
      timer = setTimeout(() => {
        btn.classList.remove('is-copied');
        label.textContent = t('delivery.copy');
        icon?.setAttribute('href', '#i-copy');
        if (status) status.textContent = '';
      }, 2500);
    };

    const selectNumber = () => {
      const number = $('.delivery__number');
      if (!number) return;
      const range = document.createRange();
      range.selectNodeContents(number);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    };

    btn.addEventListener('click', () => {
      const value = btn.dataset.copyPhone;
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(value).then(showCopied, selectNumber);
      } else {
        selectNumber();
      }
    });
  };

  /* -------------------------------------------------------
     Init
     ------------------------------------------------------- */
  const init = () => {
    $$('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });
    initLanguage();
    initTabs();
    initNav();
    initReveal();
    initPrint();
    initCopyPhone();
    setInterval(updateOpeningStatus, 60 * 1000);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
