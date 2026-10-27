/* =========================================================
   Restaurant La Fontana — legal.js
   Pàgines legals: mostra la versió CA/ES segons l'idioma
   triat a la web (mateixa clau que app.js)
   ========================================================= */

(() => {
  'use strict';

  const STORAGE_KEY = 'lafontana-lang';
  const SUPPORTED = ['ca', 'es'];

  const storage = {
    get(key) { try { return window.localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { window.localStorage.setItem(key, value); } catch { /* storage unavailable */ } }
  };

  const applyLanguage = (next) => {
    const lang = SUPPORTED.includes(next) ? next : 'ca';
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-lang-content]').forEach((el) => {
      const show = el.dataset.langContent === lang;
      el.hidden = !show;
      if (show && el.dataset.title) document.title = el.dataset.title;
    });

    document.querySelectorAll('[data-legal-label]').forEach((el) => {
      const [ca, es] = el.dataset.legalLabel.split('|');
      el.textContent = lang === 'es' ? es : ca;
    });

    document.querySelectorAll('.lang-switch__btn').forEach((btn) => btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang)));
  };

  const scrollToCookies = () => {
    if (window.location.hash !== '#cookies') return;
    document.querySelector('[data-lang-content]:not([hidden]) [id^="cookies"]')?.scrollIntoView();
  };

  const init = () => {
    document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });

    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    applyLanguage(SUPPORTED.includes(fromUrl) ? fromUrl : storage.get(STORAGE_KEY) ?? 'ca');
    scrollToCookies();

    document.querySelectorAll('.lang-switch__btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        storage.set(STORAGE_KEY, btn.dataset.lang);
        applyLanguage(btn.dataset.lang);
      });
    });

    window.addEventListener('hashchange', scrollToCookies);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
