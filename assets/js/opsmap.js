/*
 * Mapa de operación · App.opsMap (sustituye al plano de planta de Fustiñana).
 * Esquema por zonas, de izquierda a derecha en el sentido del flujo: gris para lo normal, color solo para lo
 * anormal. Cada industria lo describe en CN_DATA.turno.map:
 *   { zones: [{ id, title, sub, items: [{ code, name, reading, status: 'crit'|'warn'|'ok'|null, note, tags, go, goLabel, kv: [[k, v]] }] }] }
 * Al pulsar un elemento se abre su ficha al lado; el filtro «Alertas» atenúa lo que está en rango.
 */
(function () {
  'use strict';

  const { html, icon, chip, fmt } = App;

  const STATUS = { crit: 'critical', warn: 'warning', ok: 'ok' };
  const TONE_LABEL = { crit: 'Crítico', warn: 'Aviso', ok: 'En rango' };

  function itemTile(it, selected, filter) {
    const st = it.status || 'none';
    const dim = filter === 'alerts' && !(it.status === 'crit' || it.status === 'warn');
    return html`<button type="button" class="om-item st-${st}${selected === it.code ? ' is-selected' : ''}${dim ? ' is-dim' : ''}" data-om-item="${it.code}" title="${it.name}">
      <span class="om-code">${it.code}</span>
      <span class="om-name">${it.name}</span>
      ${it.reading ? html`<span class="om-reading">${fmt.minus(it.reading)}</span>` : ''}
      ${(it.tags || []).length ? html`<span class="om-tags">${it.tags.map((t) => html`<span class="om-tag">${t}</span>`)}</span>` : ''}
    </button>`;
  }

  function panel(it, actions) {
    if (!it) {
      return html`<div class="om-panel om-panel-empty">${icon('eye', 18)}<span>Pulsa un elemento del mapa para ver su lectura, su estado y lo que propone Agentic Platform.</span></div>`;
    }
    return html`<div class="om-panel">
      <div class="om-panel-head">
        <span class="code strong">${it.code}</span>
        ${it.status ? chip(STATUS[it.status] || 'neutral', TONE_LABEL[it.status]) : chip('neutral', 'Sin indicador')}
        <button type="button" class="icon-btn om-close" data-om-close aria-label="Cerrar la ficha">${icon('x', 16)}</button>
      </div>
      <div class="om-panel-title">${it.name}</div>
      ${it.reading ? html`<div class="om-panel-reading ${it.status === 'crit' ? 't-crit' : it.status === 'warn' ? 't-warn' : ''}">${fmt.minus(it.reading)}</div>` : ''}
      ${it.kv ? App.kv(it.kv) : ''}
      ${it.note ? html`<p class="om-panel-note">${fmt.text(it.note)}</p>` : ''}
      <div class="om-panel-actions">
        ${it.go ? html`<button type="button" class="btn btn-secondary btn-sm" data-go="${it.go}">${it.goLabel || 'Abrir'}${icon('arrow-right', 15)}</button>` : ''}
        ${actions || ''}
      </div>
    </div>`;
  }

  /** Devuelve un elemento DOM listo para insertar. opts: {map, selected, filter, onSelect(code|null), onFilter(value), panelActions(item)} */
  function opsMap(opts) {
    const o = Object.assign({ selected: null, filter: 'all' }, opts || {});
    const map = o.map || { zones: [] };
    const all = [];
    map.zones.forEach((z) => z.items.forEach((it) => all.push(it)));
    const byCode = Object.fromEntries(all.map((it) => [it.code, it]));
    const counts = { crit: all.filter((i) => i.status === 'crit').length, warn: all.filter((i) => i.status === 'warn').length };
    const el = document.createElement('div');
    el.className = 'om';

    function render() {
      const sel = o.selected && byCode[o.selected] ? byCode[o.selected] : null;
      el.innerHTML = String(html`
        <div class="om-toolbar">
          <div class="gx-map-legend">
            <span class="om-lg"><i class="om-sw st-crit"></i>Crítico</span>
            <span class="om-lg"><i class="om-sw st-warn"></i>Aviso</span>
            <span class="om-lg"><i class="om-sw st-ok"></i>En rango</span>
            <span class="om-lg"><i class="om-sw st-none"></i>Sin indicador en el parte</span>
          </div>
          ${App.segmented({ name: 'om-filter', label: 'Filtrar el mapa', value: o.filter, options: [
            { value: 'all', label: 'Todo' },
            { value: 'alerts', label: 'Alertas', count: counts.crit + counts.warn, tone: 'crit' }
          ] })}
        </div>
        <div class="om-body">
          <div class="om-flow">${map.zones.map((z, zi) => html`${zi ? html`<span class="om-arrow" aria-hidden="true">${icon('chevron-right', 16)}</span>` : ''}<div class="om-zone" data-zone="${z.id || zi}">
            <div class="om-zone-head"><span class="om-zone-title">${z.title}</span>${z.sub ? html`<span class="om-zone-sub">${z.sub}</span>` : ''}</div>
            <div class="om-items">${z.items.map((it) => itemTile(it, o.selected, o.filter))}</div>
          </div>`)}</div>
          ${panel(sel, sel && o.panelActions ? o.panelActions(sel) : '')}
        </div>`);
    }
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-om-item]');
      if (b) {
        const code = b.getAttribute('data-om-item');
        o.selected = o.selected === code ? null : code;
        render();
        if (o.onSelect) o.onSelect(o.selected);
        return;
      }
      if (e.target.closest('[data-om-close]')) {
        o.selected = null;
        render();
        if (o.onSelect) o.onSelect(null);
      }
    });
    el.addEventListener('segchange', (e) => {
      if (e.detail.name !== 'om-filter') return;
      o.filter = e.detail.value;
      render();
      if (o.onFilter) o.onFilter(o.filter);
    });
    render();
    return el;
  }

  App.opsMap = opsMap;
})();
