/*
 * Arranque de la consola por industria.
 * Elige el paquete de datos (?ind=maquinaria|banca|retail|cerveceria|abogados, o la última industria abierta),
 * lo publica como window.CN_DATA para el núcleo y las escenas, aplica sus colores y rellena el marco.
 * Se carga después de los paquetes (assets/js/industries/*.js) y antes de core.js.
 */
(function () {
  'use strict';

  const I18N = window.CN_I18N;
  const EN = !!(I18N && I18N.english);
  const PACKS_ES = window.AGENTIC_INDUSTRIES || {};
  const PACKS_EN = window.AGENTIC_INDUSTRIES_EN || {};
  /* En inglés cada parte se sustituye entera por su versión inglesa (si existe); el resto queda en español. */
  const PACKS = {};
  Object.keys(PACKS_ES).forEach((k) => { PACKS[k] = EN ? Object.assign({}, PACKS_ES[k], PACKS_EN[k] || {}) : PACKS_ES[k]; });
  const ORDER = ['maquinaria', 'banca', 'retail', 'cerveceria', 'abogados'].filter((id) => PACKS[id]);
  const LAST_KEY = 'agentic-ind-last';

  let qs = null;
  try { qs = new URLSearchParams(location.search); } catch (e) { qs = null; }
  let id = qs && qs.get('ind');
  if (!PACKS[id]) {
    try { id = localStorage.getItem(LAST_KEY); } catch (e) { id = null; }
  }
  if (!PACKS[id]) id = ORDER[0];
  try { localStorage.setItem(LAST_KEY, id); } catch (e) { /* sin almacenamiento */ }
  if (qs && qs.get('ind') !== id) {
    qs.set('ind', id);
    try { history.replaceState(null, '', `${location.pathname}?${qs.toString()}${location.hash}`); } catch (e) { /* file:// */ }
  }

  const pack = PACKS[id];
  const meta = pack.meta;
  window.CN_DATA = pack;
  window.AGENTIC_INDUSTRY = id;

  const root = document.documentElement;
  root.setAttribute('data-industry', id);
  const theme = meta.theme || {};
  const vars = { '--cn-green': theme.brand, '--cn-green-dark': theme.dark, '--cn-green-900': theme.deep, '--cn-green-50': theme.tint };
  Object.keys(vars).forEach((k) => { if (vars[k]) root.style.setProperty(k, vars[k]); });

  function setText(elId, text) { const el = document.getElementById(elId); if (el) el.textContent = text || ''; }

  function fill() {
    setText('ws-avatar', meta.short);
    setText('ws-name', meta.company);
    setText('ws-sub', meta.site);
    setText('me-avatar', meta.user_initials);
    setText('me-name', meta.user_role);
    setText('me-sub', meta.user_sub);
    setText('crumb-root', meta.company);
    const clock = document.getElementById('clock');
    if (clock) clock.title = meta.clock_title || 'Hora local';
    const tc = document.querySelector('meta[name="theme-color"]');
    if (tc && theme.dark) tc.setAttribute('content', theme.dark);
    const menu = document.getElementById('ws-menu');
    if (menu) {
      menu.innerHTML = ORDER.map((k) => {
        const m = PACKS[k].meta;
        const cur = k === id;
        return `<a class="ws-opt${cur ? ' is-current' : ''}" role="listitem" href="consola.html?ind=${k}"${cur ? ' aria-current="true"' : ''}>`
          + `<span class="ws-avatar" style="background:${m.theme.brand}">${m.short}</span>`
          + `<span class="ws-text"><span class="ws-name">${m.industry}</span><span class="ws-sub">${m.company}</span></span></a>`;
      }).join('') + `<a class="ws-opt ws-all" role="listitem" href="index.html"><span class="ws-text"><span class="ws-sub">${EN ? 'See all industries' : 'Ver todas las industrias'}</span></span></a>`;
    }
    document.addEventListener('click', (e) => {
      const sw = document.getElementById('ws-switch');
      if (sw && sw.open && !sw.contains(e.target)) sw.open = false;
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fill);
  else fill();
})();
