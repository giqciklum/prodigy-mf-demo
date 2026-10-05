/*
 * Escena «retirada» · Simulacro de trazabilidad y retirada, común a todas las industrias.
 * Misma estructura que la demo de Congelados de Navarra:
 *  - Punto de partida: un código (lote, número de serie, expediente…) en uno de los modos que define el paquete.
 *  - Cronómetro frente al objetivo (4 h), genealogía hacia atrás y hacia delante (origen → lote → unidades →
 *    envíos → clientes), balance de masas por flujo (entrada − mermas − salidas = diferencia que se muestra tal
 *    cual), unidades localizadas, clientes y entidades a notificar con canal, vista previa de cada aviso,
 *    aprobación humana, informe imprimible y CSV.
 *  - Todo el contenido sale de CN_DATA.retirada; los totales del balance se calculan aquí a partir de los flujos.
 *  - Código desconocido: no se inventa nada («No encuentro … en …»). Rechazar no aplica ninguna acción.
 *  - render() es idempotente: el resultado se guarda en ctx.local y se repinta al volver o recargar.
 */
(function () {
  'use strict';

  const { html, icon, fmt, chip, sys } = App;
  const D = window.CN_DATA;
  const R = D.retirada;
  if (!R) {
    App.scene({ id: 'retirada', order: 50, section: 'Calidad', nav: 'Simulacro de retirada', title: 'Simulacro de retirada', icon: 'git-branch',
      render(root) { root.innerHTML = String(html`${App.pageHead({ title: 'Simulacro de retirada' })}${App.card({ body: App.empty({ icon: 'alert-triangle', title: 'Sin datos del simulacro', text: 'El paquete de esta industria no incluye el simulacro.' }) })}`); } });
    return;
  }

  const ROLE = D.roles || {};
  const META = D.meta || {};
  const TODAY = META.today;
  const APPROVER = R.approver || ROLE.quality_shift || META.user_role;
  const AGENTS = Object.assign({ trace: 'Trazabilidad', bal: 'Balance de masas', rec: 'Registro y avisos' }, R.agents || {});
  const actorOf = (k) => `Agentic Platform · agente ${AGENTS[k] || k}`;
  const TARGET_S = R.target_s || 4 * 3600;
  const TITLE = R.title || 'Simulacro de retirada';
  const MODES = R.modes;
  const MODE_KEYS = Object.keys(MODES);
  const ENTRIES = R.entries || [];
  const DEFAULT_MODE = R.defaultMode || MODE_KEYS[0];
  const DEFAULTS = {};
  MODE_KEYS.forEach((m) => { const e = ENTRIES.find((x) => x.mode === m); DEFAULTS[m] = (R.defaults && R.defaults[m]) || (e ? e.code : ''); });
  const STEP_MARKS_DEFAULT = { 0: 'Punto de partida localizado' };

  /* ---------------------------------------------------------------- Utilidades */

  const norm = (s) => String(s == null ? '' : s).trim().toUpperCase();
  const sum = (arr, f) => arr.reduce((s, x) => s + (f ? f(x) : x), 0);
  const uniq = (arr) => Array.from(new Set(arr));
  const pct1 = (v) => fmt.pct(v, 1);
  const qty = (n, unit) => `${fmt.num(n)}${unit ? ` ${unit}` : ''}`;
  const tok = (s, map) => String(s == null ? '' : s).replace(/\{(\w+)\}/g, (m, k) => (map[k] != null ? map[k] : m));
  function secondsBetween(a, b) { const x = Date.parse(`${a}Z`); const y = Date.parse(`${b}Z`); return isNaN(x) || isNaN(y) ? 0 : Math.max(0, Math.round((y - x) / 1000)); }
  function addMs(iso, ms) {
    const d = new Date(Date.parse(`${iso}Z`) + ms);
    const p = (n) => String(n).padStart(2, '0');
    return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())}T${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())}`;
  }

  /** Columnas declarativas del paquete → columnas de App.table: {label, key, num, mono, sub, lot, chip, strong, ok, warn, fmt:'num', width}. */
  function cellOf(c, r) {
    const v = r[c.key];
    if (c.lot) return html`${v ? App.lotTag(v) : '—'}${c.sub && r[c.sub] ? html`<span class="sub">${r[c.sub]}</span>` : ''}`;
    if (c.chip) return v ? chip(v.status || v, v.label) : '—';
    const txt = v == null || v === '' ? '—' : c.fmt === 'num' || (typeof v === 'number' && c.num) ? fmt.num(v) : v;
    const main = c.mono ? html`<span class="code">${txt}</span>` : c.ok ? html`<strong class="t-ok">${txt}</strong>` : c.warn ? html`<span class="t-warn strong">${txt}</span>` : c.strong ? html`<span class="strong">${txt}</span>` : txt;
    return html`${main}${c.sub && r[c.sub] != null && r[c.sub] !== '' ? html`<span class="sub">${r[c.sub]}</span>` : ''}`;
  }
  const colsOf = (cols) => (cols || []).map((c) => ({ label: c.label, num: c.num, width: c.width, render: (r) => cellOf(c, r) }));
  function plainOf(c, r) {
    const v = r[c.key];
    if (v == null) return '';
    if (typeof v === 'object') return v.label || v.status || '';
    const s = c.fmt === 'num' || (typeof v === 'number' && c.num) ? fmt.num(v) : String(v);
    return c.sub && r[c.sub] ? `${s} · ${r[c.sub]}` : s;
  }

  /* ---------------------------------------------------------------- Alcance (desde CN_DATA.retirada) */

  const scopeCache = {};
  /** Alcance del simulacro o null si el código no está en los sistemas (no se inventa nada). */
  function findScope(mode, raw) {
    const code = norm(raw);
    if (!code || !MODES[mode]) return null;
    const key = `${mode}|${code}`;
    if (scopeCache[key] !== undefined) return scopeCache[key];
    const e = ENTRIES.find((x) => x.mode === mode && norm(x.code) === code);
    const base = e && R.scopes[e.scope];
    scopeCache[key] = base ? buildScope(mode, e, base) : null;
    return scopeCache[key];
  }

  function flowCalc(f) {
    const phases = f.phases || [];
    const stages = [].concat(...phases.map((p) => (p.stages || []).map(([eq, label, q]) => ({ eq, label, q, phase: p.title }))));
    const outs = f.outs || [];
    const losses = sum(stages, (s) => s.q);
    const outQ = sum(outs, (o) => o.qty);
    const diff = f.inQty - losses - outQ;
    return Object.assign({}, f, { stages, losses, outQ, diff, reconciled: f.inQty ? (100 * (f.inQty - Math.abs(diff))) / f.inQty : 100 });
  }

  function buildScope(mode, entry, base) {
    const B = base.balance || {};
    const flows = (B.flows || []).map(flowCalc);
    const main = flows.filter((f) => f.main);
    const mainFlows = main.length ? main : flows.slice(0, 1);
    const unit = mainFlows.length ? mainFlows[0].unit : '';
    const outsAll = [].concat(...mainFlows.map((f) => f.outs || []));
    const received = sum(mainFlows, (f) => f.inQty);
    const absDiff = sum(mainFlows, (f) => Math.abs(f.diff));
    const bal = {
      unit,
      received,
      losses: sum(mainFlows, (f) => f.losses),
      toProduct: sum(outsAll.filter((o) => o.kind !== 'stock'), (o) => o.qty),
      stock: sum(outsAll.filter((o) => o.kind === 'stock'), (o) => o.qty),
      diff: sum(mainFlows, (f) => f.diff),
      absDiff,
      reconciled: received ? (100 * (received - absDiff)) / received : 100,
      stages: sum(flows, (f) => f.stages.length),
      allReconciled: flows.every((f) => f.diff === 0)
    };
    const customers = (base.customers && base.customers.items) || [];
    return Object.assign({}, base, {
      mode,
      code: norm(entry.code),
      entry,
      label: entry.label || `${MODES[mode].label} ${entry.code}`,
      headline: entry.headline || base.headline,
      startNode: entry.startNode || base.startNode,
      flows,
      bal,
      notify: customers.filter((c) => c.notify),
      inform: customers.filter((c) => !c.notify),
      holds: (base.customers && base.customers.holds) || []
    });
  }

  /* ---------------------------------------------------------------- Pasos del agente */

  function streamSteps(sc) {
    return sc.steps.map((s, i) => {
      const x = { agent: AGENTS[s.agent] || s.agent, system: s.system, action: s.action, result: s.result, ms: s.ms, tone: s.tone, reveal: s.reveal };
      if (i === 0 && sc.entry.startResult) x.result = sc.entry.startResult;
      if (i === 0) x.action = `Localiza el punto de partida: ${sc.label}`;
      return x;
    });
  }

  /* ---------------------------------------------------------------- Diagrama de genealogía */

  const GEN_GAP = 20;
  const GEN_MIN_COL = 112;

  function genModel(sc) {
    const stageIcon = {};
    sc.stages.forEach((s) => { stageIcon[s.id] = s.icon; });
    const nodes = sc.nodes.map((n) => {
      const start = n.id === sc.startNode;
      return Object.assign({}, n, { start, icon: n.icon || stageIcon[n.stage] || 'circle', reveal: start ? 0 : (n.reveal != null ? n.reveal : 1) });
    });
    const ids = new Set(nodes.map((n) => n.id));
    return { stages: sc.stages, nodes, edges: (sc.edges || []).filter(([a, b]) => ids.has(a) && ids.has(b)) };
  }

  function genNode(n, visible) {
    const cls = ['gen-node', n.start ? 'is-start' : '', n.tone ? `tone-${n.tone}` : '', visible ? '' : 'is-hidden'].filter(Boolean).join(' ');
    const a = { class: cls, 'data-gid': n.id, 'data-reveal': String(n.reveal) };
    if (n.lot) Object.assign(a, { 'data-lot': n.lot, role: 'button', tabindex: '0', title: `Ver la traza de ${n.lot}` });
    return html`<div ${App.attrs(a)}>
      <div class="gen-kicker">${icon(n.icon, 12)}<span>${n.kicker}</span>${n.start ? html`<span class="gen-flag">Punto de partida</span>` : ''}</div>
      <div class="gen-title${n.mono ? ' mono' : ''}">${n.mono ? String(n.title).split('-').map((part, i, arr) => html`${part}${i < arr.length - 1 ? html`-<wbr>` : ''}`) : n.title}</div>
      ${n.sub ? html`<div class="gen-sub">${n.sub}</div>` : ''}
      ${n.meta ? html`<div class="gen-meta${n.alertTone ? ' t-warn' : ''}">${n.meta}</div>` : ''}
      ${n.alert ? html`<div class="gen-alert">${n.alert}</div>` : ''}
    </div>`;
  }

  function genHTML(sc, revealAll) {
    const m = genModel(sc);
    const cols = m.stages.map((st) => {
      const list = m.nodes.filter((n) => n.stage === st.id);
      return html`<div class="gen-col" data-stage="${st.id}">
        <div class="gen-head">${icon(st.icon, 14)}<span>${st.label}</span><span class="count">${st.count != null ? st.count : list.length}</span></div>
        <div class="gen-body">${list.map((n) => genNode(n, revealAll))}</div>
      </div>`;
    });
    return html`<div class="gen" data-gen data-cols="${m.stages.length}" data-edges="${JSON.stringify(m.edges)}" style="--gen-cols:${m.stages.length}" role="group" aria-label="Genealogía de ${sc.label}: ${m.nodes.length} elementos">
      <svg class="gen-links" aria-hidden="true" focusable="false"></svg>
      <div class="gen-grid">${cols}</div>
    </div>`;
  }

  function genDraw(gen) {
    if (!gen || !gen.isConnected) return;
    const cols = Number(gen.getAttribute('data-cols')) || 7;
    const w = gen.clientWidth;
    if (w < 40) return;
    const vertical = (w - (cols - 1) * GEN_GAP) / cols < GEN_MIN_COL;
    gen.classList.toggle('is-vertical', vertical);
    const svg = gen.querySelector('.gen-links');
    if (!svg) return;
    if (vertical) { svg.innerHTML = ''; return; }
    const box = gen.getBoundingClientRect();
    const W = Math.round(box.width);
    const H = Math.round(box.height);
    svg.setAttribute('width', String(W));
    svg.setAttribute('height', String(H));
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    let edges = [];
    try { edges = JSON.parse(gen.getAttribute('data-edges') || '[]'); } catch (e) { edges = []; }
    const r1 = (v) => Math.round(v * 10) / 10;
    const find = (id) => gen.querySelector(`[data-gid="${window.CSS && CSS.escape ? CSS.escape(id) : id}"]`);
    let out = '';
    edges.forEach(([a, b]) => {
      const na = find(a);
      const nb = find(b);
      if (!na || !nb || na.classList.contains('is-hidden') || nb.classList.contains('is-hidden')) return;
      const ra = na.getBoundingClientRect();
      const rb = nb.getBoundingClientRect();
      const x1 = ra.right - box.left;
      const y1 = ra.top + ra.height / 2 - box.top;
      const x2 = rb.left - box.left;
      const y2 = rb.top + rb.height / 2 - box.top;
      const dx = Math.max(8, (x2 - x1) / 2);
      const planned = nb.classList.contains('tone-planned') && na.classList.contains('tone-planned');
      out += `<path class="gen-link${planned ? ' is-planned' : ''}" d="M${r1(x1)},${r1(y1)} C${r1(x1 + dx)},${r1(y1)} ${r1(x2 - dx)},${r1(y2)} ${r1(x2 - 6)},${r1(y2)}"/><path class="gen-arrow${planned ? ' is-planned' : ''}" d="M${r1(x2 - 6)},${r1(y2 - 3.5)} L${r1(x2)},${r1(y2)} L${r1(x2 - 6)},${r1(y2 + 3.5)} Z"/>`;
    });
    svg.innerHTML = out;
  }

  function genBind(ctx) {
    if (ctx.vars.ro) { try { ctx.vars.ro.disconnect(); } catch (e) { /* sin observador */ } ctx.vars.ro = null; }
    const gen = ctx.$('[data-gen]');
    if (!gen) return;
    const redraw = () => requestAnimationFrame(() => genDraw(gen));
    redraw();
    if (typeof ResizeObserver === 'function') {
      const ro = new ResizeObserver(redraw);
      ro.observe(gen);
      ctx.vars.ro = ro;
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (ctx.alive()) redraw(); }).catch(() => {});
  }

  function genReveal(ctx, k) {
    const gen = ctx.$('[data-gen]');
    if (!gen) return;
    gen.querySelectorAll('.gen-node.is-hidden').forEach((n) => { if (Number(n.getAttribute('data-reveal')) <= k) n.classList.remove('is-hidden'); });
    genDraw(gen);
  }

  /* ---------------------------------------------------------------- Avisos */

  const NT = Object.assign({
    title: 'Simulacro de retirada',
    pending: 'Pendiente de aprobación. En un simulacro el aviso no se envía: se guarda como borrador con la marca SIMULACRO.',
    approved: 'Guardado como borrador con la marca SIMULACRO: no se envía.',
    rejected: 'Simulacro rechazado: el aviso no se ha preparado.',
    savedChip: 'Borrador guardado',
    rejectedChip: 'No preparado',
    notifyChip: 'Notificar',
    informChip: 'Informar'
  }, R.notice || {});

  function openNotice(ctx, sc, cid) {
    const c = (sc.customers.items || []).find((x) => x.id === cid);
    if (!c || !c.notice) return;
    const run = ctx.local.run;
    const dec = ctx.local.decision;
    const n = c.notice;
    const state = dec ? (dec.status === 'approved' ? NT.approved : NT.rejected) : NT.pending;
    const headers = Object.assign({}, n.headers, { Date: `${fmt.date(TODAY)} (borrador ${run.code})` });
    App.audit('Aviso revisado', `${run.code} · ${c.label}`);
    App.modal({
      title: `Aviso a ${c.label}`,
      kicker: `Vista previa · ${n.lang} · ${c.channel ? `${c.channel} · ` : ''}registro ${run.code}`,
      size: 'lg',
      body: html`<div class="stack stack-sm">
        ${App.callout({ tone: dec && dec.status === 'rejected' ? 'warn' : 'brand', icon: 'mail', title: NT.title, body: state })}
        ${App.emailView({ headers, text: n.body, highlights: (n.highlights || []).map((code) => ({ text: code, tone: 'brand', all: true })) })}
      </div>`,
      actions: [
        { label: 'Copiar texto', icon: 'copy', variant: 'ghost', left: true, close: false, onClick: () => { App.copyText(`${n.subject || headers.Subject}\n\n${n.body}`, 'Aviso copiado al portapapeles'); return false; } },
        { label: 'Cerrar', variant: 'primary' }
      ]
    });
  }

  /* ---------------------------------------------------------------- Piezas de la vista */

  function referenceCard() {
    const ref = R.reference;
    return App.card({
      title: ref.title || 'Referencia de auditoría',
      sub: ref.sub,
      icon: 'shield-check',
      body: html`<ul class="ret-ref">${ref.items.map(([k, v]) => html`<li><span class="ret-ref-k">${k}</span><span>${v}</span></li>`)}</ul>
      ${ref.note ? html`<p class="muted small mt-4">${ref.note}</p>` : ''}`
    });
  }

  function setupCard(ctx) {
    const mode = MODES[ctx.local.mode] ? ctx.local.mode : DEFAULT_MODE;
    const codes = Object.assign({}, DEFAULTS, ctx.local.codes || {});
    const code = codes[mode];
    const m = MODES[mode];
    const options = ENTRIES.filter((e) => e.mode === mode).map((e) => [e.code, e.option || e.headline || '']);
    return App.card({
      id: 'ret-setup',
      title: (R.setup && R.setup.title) || 'Punto de partida',
      sub: R.setup && R.setup.sub,
      icon: 'git-branch',
      body: html`<div class="stack">
        ${MODE_KEYS.length > 1 ? html`<div class="ret-mode">${App.segmented({ name: 'ret-mode', label: 'Tipo de punto de partida', value: mode, options: MODE_KEYS.map((k) => ({ value: k, label: MODES[k].label, icon: MODES[k].icon })) })}</div>` : ''}
        <div>
          <div class="ret-field-row">
            <div class="field">
              <label class="label" for="ret-code">${m.field}</label>
              <input class="input mono" id="ret-code" list="ret-codes" value="${code}" autocomplete="off" spellcheck="false" autocapitalize="characters" placeholder="${m.format}" aria-describedby="ret-code-hint">
              <datalist id="ret-codes">${options.map(([v, t]) => html`<option value="${v}">${t}</option>`)}</datalist>
            </div>
            <button type="button" class="btn btn-primary btn-lg" data-action="start">${icon('play')}<span>${R.startLabel || 'Iniciar simulacro'}</span></button>
          </div>
          <div class="hint mt-2" id="ret-code-hint">Formato ${m.format} · búsqueda en ${m.where}</div>
        </div>
        <div class="ret-examples"><span>Ejemplos:</span>
          ${(R.examples || []).map((x) => html`<button type="button" class="ret-example" data-example="${x.mode}|${x.code}">${x.label || `${MODES[x.mode].label} ${x.code}`}</button>`)}
        </div>
        <div id="ret-preview" aria-live="polite">${previewHTML(ctx, mode, code)}</div>
      </div>`
    });
  }

  function previewHTML(ctx, mode, code) {
    const miss = ctx.local.miss;
    const m = MODES[mode];
    if (miss && miss.mode === mode && norm(miss.code) === norm(code)) {
      return App.callout({ tone: 'warn', icon: 'search', title: `No encuentro ${m.noun} «${norm(miss.code) || '—'}» en ${m.where}`,
        body: `No se ha iniciado el simulacro: Agentic Platform no genera datos que no estén en los sistemas. Comprueba el código (formato ${m.format}) o elige uno de la lista.` });
    }
    const sc = findScope(mode, code);
    if (!sc) return html`<div class="ret-preview muted small">${icon('search', 16)}<span>Escribe o elige un código de la lista.</span></div>`;
    return html`<div class="ret-preview">
      ${icon(m.icon, 16)}
      <div class="ret-preview-main"><div class="strong">${sc.label}</div><div class="muted small">${sc.headline}</div></div>
      <div class="ret-preview-side">${sc.previewSide || ''}</div>
    </div>`;
  }

  function historyCard(ctx) {
    const hist = (ctx.local.history || []).slice().reverse();
    if (!hist.length) return '';
    return App.card({
      title: 'Simulacros de esta sesión',
      icon: 'history',
      flush: true,
      body: App.table({ dense: true, rows: hist, cols: [
        { label: 'Registro', render: (r) => html`<span class="code">${r.code}</span><span class="sub">${fmt.time(r.at)}</span>` },
        { label: 'Punto de partida', render: (r) => r.label },
        { label: 'Trazado', render: (r) => fmt.ms(r.ms), num: true },
        { label: 'Conciliado', render: (r) => pct1(r.reconciled), num: true },
        { label: 'Estado', render: (r) => (r.status === 'approved' ? chip('approved') : r.status === 'rejected' ? chip('rejected') : chip('draft')) }
      ] })
    });
  }

  function kpis(sc, run) {
    const b = sc.bal;
    const L = sc.located;
    const K = sc.kpiNotify || {};
    return html`<div class="kpis">
      ${App.kpi({ label: 'Tiempo de trazado', value: fmt.ms(run.ms), sub: `Tiempo simulado · ${(R.targetText || 'objetivo ilustrativo: 4 h').toLowerCase()}`, icon: 'clock', tone: 'ok' })}
      ${App.kpi({ label: L.label, value: L.value, sub: L.sub, icon: L.icon || 'pallet' })}
      ${App.kpi({ label: (sc.balance && sc.balance.kpiLabel) || 'Balance de masas conciliado', value: pct1(b.reconciled), sub: `${qty(b.diff, b.unit)} sin justificar de ${qty(b.received, b.unit)}`, icon: 'scale', action: 'scroll-balance' })}
      ${App.kpi({ label: K.label || 'Clientes a notificar', value: K.value != null ? K.value : sc.notify.length, sub: K.sub, icon: 'mail', tone: sc.notify.length ? 'warn' : undefined, action: 'scroll-customers' })}
    </div>`;
  }

  function genCard(sc, run) {
    const lg = Object.assign({ start: 'Punto de partida', planned: 'Envío planificado: retener', click: 'Pulsa un código para ver su traza completa' }, R.legend || {});
    return App.card({
      id: 'ret-gen-card',
      title: 'Genealogía hacia atrás y hacia delante',
      sub: `${sc.label} · ${sc.genSub}`,
      icon: 'git-branch',
      actions: App.sysList(sc.systems || []),
      body: html`${genHTML(sc, true)}
        <div class="gen-legend">
          <span class="lg"><i class="gen-lg is-start"></i>${lg.start}</span>
          <span class="lg"><i class="gen-lg tone-planned"></i>${lg.planned}</span>
          <span class="lg"><i class="gen-lg"></i>${lg.click}</span>
        </div>`,
      footer: html`<details class="run-log" style="width:100%">
        <summary>${icon('chevron-right', 16)}<span>Registro de ejecución · ${sc.steps.length} pasos · ${fmt.ms(run.ms)}</span></summary>
        <div class="mt-2" id="ret-log"></div>
      </details>`
    });
  }

  function balanceRows(f) {
    const rows = [{ type: 'in', label: f.inLabel, sub: f.inSub, stage: f.inStage, q: f.inQty, pct: 100 }];
    (f.phases || []).forEach((p) => {
      rows.push({ type: 'group', label: `${p.title}${p.date ? ` · ${fmt.date(p.date)}` : ''}${p.extra ? ` · ${p.extra}` : ''}` });
      (p.stages || []).forEach(([eq, label, q]) => rows.push({ type: 'loss', label, stage: eq, q: -q, pct: f.inQty ? (100 * q) / f.inQty : 0 }));
    });
    rows.push({ type: 'group', label: f.outsTitle || 'Salidas' });
    (f.outs || []).forEach((o) => rows.push({ type: 'out', label: o.label, sub: o.sub, stage: o.stage, q: o.qty, pct: f.inQty ? (100 * o.qty) / f.inQty : 0 }));
    rows.push({ type: 'diff', label: 'Diferencia sin justificar', sub: 'Entrada − mermas − salidas', q: f.diff, pct: f.inQty ? (100 * f.diff) / f.inQty : 0 });
    rows.push({ type: 'total', label: 'Conciliado', q: null, pct: f.reconciled });
    return rows;
  }

  function balanceTable(f) {
    return App.table({
      dense: true,
      class: 'ret-bal',
      rows: balanceRows(f),
      rowClass: (r) => `is-${r.type}`,
      cols: [
        { label: 'Concepto', render: (r) => (r.type === 'group' ? html`<span class="ret-group">${r.label}</span>` : html`${r.type === 'total' || r.type === 'in' ? html`<strong>${r.label}</strong>` : r.label}${r.sub ? html`<span class="sub">${r.sub}</span>` : ''}`) },
        { label: 'Etapa', width: '104px', render: (r) => (r.type === 'group' || r.type === 'total' || r.type === 'diff' ? '' : r.stage ? html`<span class="code">${r.stage}</span>` : html`<span class="muted">—</span>`) },
        { label: f.colLabel || fmt.cap(f.unit || 'Cantidad'), width: '96px', num: true, render: (r) => (r.q == null || r.type === 'group' ? '' : html`<span class="${r.type === 'in' || r.type === 'out' ? 'strong' : r.type === 'diff' ? (r.q ? 't-warn strong' : 'strong') : ''}">${fmt.num(r.q)}</span>`) },
        { label: '%', width: '76px', num: true, render: (r) => (r.type === 'group' ? '' : r.type === 'total' ? html`<strong class="t-ok">${pct1(r.pct)}</strong>` : html`<span class="muted">${fmt.pct(Math.abs(r.pct), 1)}</span>`) }
      ]
    });
  }

  function balanceCard(ctx, sc) {
    const b = sc.bal;
    const B = sc.balance;
    const lb = Object.assign({ in: 'Entrada', losses: 'Mermas justificadas', out: 'A producto terminado', stock: 'En existencias' }, B.labels || {});
    const flows = sc.flows;
    const sel = flows.find((f) => f.key === ctx.local.flow) || flows[0];
    const P = B.product;
    return App.card({
      id: 'ret-balance',
      title: B.title || 'Balance de masas',
      sub: B.sub,
      icon: 'scale',
      body: html`<div class="stack">
        <div>
          <div class="row between mb-2"><div class="h3">${B.head}</div><span class="muted small">${B.headSide || `${fmt.plural(flows.length, 'flujo', 'flujos')} · ${fmt.plural(b.stages, 'concepto de merma', 'conceptos de merma')}`}</span></div>
          <div class="ret-stats">${App.stats([
            { label: lb.in, value: qty(b.received, b.unit) },
            { label: lb.losses, value: qty(b.losses, b.unit) },
            { label: lb.out, value: qty(b.toProduct, b.unit) },
            { label: lb.stock, value: b.stock ? qty(b.stock, b.unit) : '—' },
            { label: `Sin justificar (${fmt.num(b.received ? (100 * b.diff) / b.received : 0, 2)} %)`, value: qty(b.diff, b.unit), tone: b.diff ? 'warn' : 'ok' },
            { label: 'Conciliado', value: pct1(b.reconciled), tone: 'ok' }
          ])}</div>
        </div>
        <div>
          <div class="row between mb-2"><div class="h3">${B.detailTitle || 'Detalle por flujo'}</div>${flows.length > 1 ? App.segmented({ name: 'ret-flow', label: 'Flujo del balance', value: sel.key, options: flows.map((f) => ({ value: f.key, label: f.seg || f.key })) }) : ''}</div>
          <div class="muted small mb-2">${sel.title}</div>
          <div class="card flat">${balanceTable(sel)}</div>
        </div>
        ${P ? html`<div>
          <div class="row between mb-2"><div class="h3">${P.title}</div><span class="muted small">${P.side || ''}</span></div>
          <div class="card flat ret-scroll" id="ret-product">${App.table({ dense: true, rows: P.rows, cols: colsOf(P.cols) })}</div>
        </div>` : ''}
        <div class="row row-nowrap muted small" style="align-items:flex-start">${icon('info', 16)}<span>${B.criterio}</span></div>
      </div>`
    });
  }

  function timingRows(sc, run) {
    const steps = sc.steps;
    let acc = 0;
    const rows = [{ at: run.startedAt, what: 'Inicio del simulacro', who: APPROVER, sys: null, ms: 0 }];
    steps.forEach((s, i) => {
      acc += s.ms;
      const mark = s.mark || STEP_MARKS_DEFAULT[i];
      if (mark) rows.push({ at: addMs(run.startedAt, acc), what: mark, who: `Agente ${AGENTS[s.agent] || s.agent}`, sys: s.system, ms: acc });
    });
    const dec = run.decision;
    if (dec) rows.push({ at: dec.at, what: dec.status === 'approved' ? `Aprobación · ${APPROVER}` : `Rechazo · ${APPROVER}`, who: APPROVER, sys: null, ms: null, total: secondsBetween(run.startedAt, dec.at) });
    return rows;
  }

  function clockCard(sc, run, dec) {
    const rows = timingRows(sc, Object.assign({}, run, { decision: dec }));
    return App.card({
      title: (R.clock && R.clock.title) || 'Cronómetro frente a auditoría',
      sub: (R.clock && R.clock.sub) || 'Tiempos de la simulación; no son medidas de rendimiento de los sistemas',
      icon: 'clock',
      body: html`<div class="stack">
        ${App.stats([
          { label: 'Trazado con Agentic Platform', value: fmt.ms(run.ms), tone: 'ok' },
          { label: 'Objetivo del ejercicio', value: fmt.dur(TARGET_S) },
          { label: 'Hoy (estimación)', value: R.todayEstimate || '1–4 h' }
        ])}
        <div class="card flat">${App.table({ dense: true, rows, cols: [
          { label: 'Hora', width: '84px', render: (x) => html`<span class="code">${fmt.time(x.at, true)}</span>` },
          { label: 'Actividad', render: (x) => html`${x.what}<span class="sub">${x.who}${x.sys ? ' · ' : ''}${x.sys ? sys(x.sys) : ''}</span>` },
          { label: 'Transcurrido', num: true, render: (x) => (x.total != null ? fmt.dur(x.total) : x.ms ? fmt.ms(x.ms) : '0 s') }
        ] })}</div>
      </div>`
    });
  }

  function unitsCard(sc) {
    const U = sc.units;
    const BL = U.byLoc;
    const byLoc = App.table({ dense: true, rows: BL.rows, rowClass: (r) => (r.tone === 'crit' ? 'tone-crit' : r.tone === 'warn' ? 'tone-warn' : ''), cols: [
      { label: BL.refLabel || 'Lote', render: (r) => (r.tag ? App.lotTag(r.ref) : html`<span class="code">${r.ref}</span>`) },
      { label: BL.whereLabel || 'Ubicación', render: (r) => html`<span class="strong">${r.where}</span>${r.whereSub ? html`<span class="sub">${r.whereSub}</span>` : ''}` },
      { label: BL.nLabel || 'Unidades', num: true, render: (r) => (r.n == null ? '—' : fmt.num(r.n)) },
      { label: BL.qtyLabel || 'Cantidad', num: true, render: (r) => (r.qty == null ? '—' : fmt.num(r.qty)) },
      { label: BL.actionLabel || 'Acción en una retirada real', render: (r) => r.action }
    ] });
    const L = U.list;
    const listTable = html`${L.note ? html`<div class="gx-note" style="padding:10px 16px 0">${icon('info', 15)}<span>${L.note}</span></div>` : ''}<div class="card flat ret-scroll">${App.table({ dense: true, rows: L.rows, cols: colsOf(L.cols) })}</div>`;
    return App.card({
      id: 'ret-pallets',
      title: U.title,
      sub: U.sub,
      icon: U.icon || 'pallet',
      flush: true,
      actions: html`<button type="button" class="btn btn-secondary btn-sm" data-action="csv">${icon('download', 15)}<span>${U.csvLabel || 'CSV'}</span></button>`,
      body: App.tabs({ id: 'ret-pal', flush: true, label: U.title, tabs: [
        { id: 'loc', label: BL.label || 'Por ubicación', count: BL.rows.length, body: html`<div class="card flat">${byLoc}</div>` },
        { id: 'list', label: L.label, count: fmt.num(L.count != null ? L.count : L.rows.length), body: listTable }
      ].concat(U.extra ? [{
        id: U.extra.id || 'extra',
        label: U.extra.label,
        count: fmt.num(U.extra.count != null ? U.extra.count : U.extra.rows.length),
        body: html`${U.extra.note ? html`<div class="gx-note" style="padding:10px 16px 0">${icon('info', 15)}<span>${U.extra.note}</span></div>` : ''}<div class="card flat ret-scroll">${App.table({ dense: true, rows: U.extra.rows, cols: colsOf(U.extra.cols) })}</div>`
      }] : []) })
    });
  }

  const isWide = (sc) => (sc.customers.items || []).length > 4;
  function customersCard(sc, dec) {
    const C = sc.customers;
    const items = C.items.map((c) => ({
      icon: c.icon || 'building',
      tone: c.notify ? 'warn' : 'brand',
      title: c.label,
      meta: (c.meta || []).concat(c.channel ? [`Canal: ${c.channel}`] : []),
      body: c.body,
      side: html`${dec && (c.notice || c.notify) ? (dec.status === 'approved' ? chip('done', NT.savedChip) : chip('rejected', NT.rejectedChip)) : c.notify ? chip('pending', c.chip || NT.notifyChip) : chip('info', c.chip || NT.informChip)}${c.notice ? html`<button type="button" class="btn btn-secondary btn-sm" data-action="notice" data-customer="${c.id}">${icon('eye', 15)}<span>Ver aviso</span></button>` : ''}`
    }));
    return App.card({
      id: 'ret-customers',
      title: C.title || 'Clientes a notificar',
      sub: C.sub,
      icon: 'mail',
      flush: true,
      class: isWide(sc) ? 'ret-cust-wide' : undefined,
      body: html`${App.list(items)}${sc.holds.length ? html`<div class="ret-subhead">${icon(C.holdsIcon || 'truck', 14)}<span>${C.holdsTitle}</span></div>${App.list(sc.holds.map((h) => ({ icon: h.icon || 'truck', tone: h.tone || 'warn', title: h.title, meta: h.meta, body: h.body })))}` : ''}`
    });
  }

  function approval(sc, run, dec) {
    const A = sc.approval;
    const map = { code: run.code, n: String((sc.customers.items || []).filter((c) => c.notice).length) };
    return App.approvalCard({
      id: 'ret-cierre',
      status: dec ? dec.status : 'pending',
      title: `${A.titlePrefix || (R.approval && R.approval.titlePrefix) || 'Avisos y cierre del simulacro'} ${run.code}`,
      summary: `${sc.label}: trazado en ${fmt.ms(run.ms)}, ${sc.located.short} y balance conciliado al ${pct1(sc.bal.reconciled)}.`,
      approver: APPROVER,
      policy: (R.approval && R.approval.policy) || A.policy,
      scope: A.scope,
      effects: A.effects.map((e) => tok(e, map)),
      approveLabel: (R.approval && R.approval.approveLabel) || 'Aprobar y cerrar simulacro',
      rejectLabel: 'Rechazar',
      decidedBy: dec ? dec.by : undefined,
      decidedAt: dec ? dec.at : undefined,
      comment: dec && dec.comment ? `Motivo: ${dec.comment}` : undefined,
      doneActions: dec ? html`<button type="button" class="btn btn-secondary" data-open-audit>${icon('history')}<span>Ver en auditoría</span></button><button type="button" class="btn btn-primary" data-action="pack">${icon('download')}<span>${R.packLabel || 'Descargar paquete de retirada'}</span></button>` : ''
    });
  }

  function compareCard(sc, run, dec) {
    const CMP = R.compare;
    const review = dec ? secondsBetween(run.doneAt, dec.at) : null;
    const map = { steps: String(sc.steps.length), reconciled: pct1(sc.bal.reconciled), approver: APPROVER };
    const rows = CMP.rows.map((r) => ({ k: r.k, today: tok(r.today, map), agentic: tok(r.agentic, map) })).concat([{
      k: 'Tiempo',
      today: `${R.todayEstimate || '1–4 h'} (estimación)`,
      agentic: review != null ? `${fmt.ms(run.ms)} de trazado + ${fmt.dur(review)} hasta la decisión` : `${fmt.ms(run.ms)} de trazado · decisión pendiente`,
      strong: true
    }]);
    return App.card({
      id: 'ret-compare',
      title: 'Hoy frente a Agentic Platform',
      sub: 'Mismo simulacro · la columna «Hoy» es un supuesto ilustrativo que se valida con una línea base en el piloto',
      icon: 'bar-chart',
      flush: true,
      body: App.table({ rows, cols: [
        { label: 'Concepto', width: '22%', render: (r) => html`<span class="strong">${r.k}</span>` },
        { label: 'Hoy (estimación a validar)', width: '39%', render: (r) => r.today },
        { label: 'Con Agentic Platform (simulación)', render: (r) => (r.strong ? html`<strong class="t-ok">${r.agentic}</strong>` : r.agentic) }
      ] }),
      footer: html`<span class="muted small row row-nowrap" style="align-items:flex-start">${icon('info', 16)}<span>${CMP.footer || `Los valores de «Hoy» son supuestos ilustrativos y los segundos de esta demo corresponden a una simulación; en las semanas 1–2 del piloto se mide la línea base real de ${META.company}.`}</span></span>`
    });
  }

  /* ---------------------------------------------------------------- Descargas */

  function csvContent(sc, run) {
    const L = sc.units.list;
    const cols = (sc.units.csvCols || L.cols).map((c) => ({ label: c.label, value: (r) => plainOf(c, r) }));
    return App.csv({ rows: sc.units.csvRows || L.rows, cols: [{ label: 'Registro', value: () => run.code }].concat(cols) });
  }

  function downloadCsv(ctx) {
    const run = ctx.local.run;
    const sc = run && findScope(run.mode, run.code_in);
    if (!sc) return;
    App.downloadFile(`paquete-retirada-${run.code}-${sc.units.csvName || 'unidades'}.csv`, 'text/csv', csvContent(sc, run));
  }

  function openReport(ctx) {
    const run = ctx.local.run;
    const sc = run && findScope(run.mode, run.code_in);
    if (!sc) return;
    const dec = ctx.local.decision;
    const status = dec ? (dec.status === 'approved' ? 'Aprobado' : 'Rechazado') : 'Borrador';
    const rev = dec && dec.status === 'approved' ? '1' : '0';
    const b = sc.bal;
    const RP = Object.assign({}, R.report || {}, sc.report || {});
    const tbl = (t) => ({ cols: t.cols.map((c) => ({ label: c.label, num: c.num, render: (r) => (c.mono ? App.raw(`<span class="code">${App.esc(plainOf(c, r))}</span>`) : plainOf(c, r)) })), rows: t.rows });
    const balSections = sc.flows.map((f, i) => ({
      heading: `5.${i + 1} ${f.title}`,
      table: { cols: [{ label: 'Concepto', key: 'label' }, { label: 'Etapa', key: 'stage' }, { label: f.colLabel || fmt.cap(f.unit || 'Cantidad'), key: 'q', num: true }, { label: '%', key: 'pct', num: true }],
        rows: balanceRows(f).map((r) => ({ label: r.type === 'group' ? `— ${r.label}` : `${r.label}${r.sub ? ` · ${r.sub}` : ''}`, stage: r.type === 'group' || r.type === 'total' || r.type === 'diff' ? '' : (r.stage || '—'), q: r.type === 'group' || r.q == null ? '' : fmt.num(r.q), pct: r.type === 'group' ? '' : r.type === 'total' ? pct1(r.pct) : fmt.pct(Math.abs(r.pct), 1) })) }
    }));
    const times = timingRows(sc, Object.assign({}, run, { decision: dec })).map((x) => ({ hora: fmt.time(x.at, true), act: x.what, quien: `${x.who}${x.sys ? ` · ${x.sys}` : ''}`, t: x.total != null ? fmt.dur(x.total) : x.ms ? fmt.ms(x.ms) : '0 s' }));
    const custRows = sc.customers.items.map((c) => ({ cliente: c.label, canal: c.channel || '—', ref: c.refs || '—', q: c.qtyText || '—', accion: c.action || (c.notify ? 'Aviso' : 'Informar') }));
    const decisionText = dec
      ? (dec.status === 'approved'
        ? `Aprobado por ${dec.by} el ${fmt.date(dec.at, { time: true })}. ${RP.approvedText || 'Avisos guardados como borrador con la marca SIMULACRO; no se ha enviado ninguno.'}`
        : `Rechazado por ${dec.by} el ${fmt.date(dec.at, { time: true })}. Motivo: ${dec.comment || '—'}. No se ha preparado ningún aviso.`)
      : `Pendiente de la aprobación de ${APPROVER}.`;
    const code = run.code;
    const org = META.report_org || META.company;
    const pageCss = `<style>@page{@top-left{content:"${org}";font:500 8.5px Inter,system-ui,sans-serif;color:var(--muted)}@top-right{content:"${code} · Rev. ${rev} · ${status}";font:600 8.5px Inter,system-ui,sans-serif;color:var(--muted)}@bottom-left{content:"Documento generado por Agentic Platform · demostración con datos sintéticos";font:8.5px Inter,system-ui,sans-serif;color:var(--muted)}@bottom-right{content:"Página " counter(page) " de " counter(pages);font:8.5px Inter,system-ui,sans-serif;color:var(--muted)}}</style>`;
    const P = sc.balance.product;
    const L = sc.units.list;
    App.printableReport({
      title: `${TITLE} · ${sc.label}`,
      subtitle: `${RP.subtitle || 'Registro del ejercicio de trazabilidad y retirada'} · ${fmt.dateLong(TODAY)}`,
      code,
      filename: `simulacro-retirada-${code}`,
      kicker: 'Vista previa del registro',
      meta: [
        ['Revisión', rev], ['Estado', status], ['Centro', META.site],
        ['Punto de partida', sc.label], ['Inicio', fmt.date(run.startedAt, { time: true, seconds: true })], ['Tiempo de trazado', fmt.ms(run.ms)],
        [sc.located.label, sc.located.value], [(sc.balance.kpiLabel || 'Balance de masas'), `${pct1(b.reconciled)} conciliado`], [(sc.kpiNotify && sc.kpiNotify.label) || 'Clientes a notificar', String(sc.kpiNotify && sc.kpiNotify.value != null ? sc.kpiNotify.value : sc.notify.length)]
      ],
      footer: `Documento generado por Agentic Platform el ${fmt.date(App.nowISO(), { time: true })} · demostración con datos sintéticos · ${code} · revisión ${rev} · ${status.toLowerCase()}`,
      sections: [
        { heading: '1. Objeto y alcance', text: `${tok(RP.objeto, { label: sc.label })} ${RP.noAction || 'El ejercicio no bloquea existencias ni envía avisos.'}` },
        { heading: '2. Resultado', list: [
          `Trazado simulado en ${fmt.ms(run.ms)}. ${R.targetText || 'Objetivo ilustrativo: 4 h'}, a confirmar por ${APPROVER}.`,
          `${fmt.cap(sc.located.short)}.`,
          `Balance conciliado al ${pct1(b.reconciled)}: ${qty(b.received, b.unit)} de entrada, ${qty(b.losses, b.unit)} de mermas justificadas, ${qty(b.toProduct, b.unit)} a destino${b.stock ? `, ${qty(b.stock, b.unit)} en existencias` : ''} y ${qty(b.diff, b.unit)} sin justificar.`
        ].concat(RP.results || []) },
        { heading: '3. Genealogía hacia atrás', table: tbl(RP.back) },
        { heading: '4. Genealogía hacia delante', table: tbl(RP.fwd) },
        { heading: '5. Balance de masas', text: sc.balance.reportText || sc.balance.criterio }
      ].concat(balSections).concat([
        P ? { heading: `5.${balSections.length + 1} ${P.title}`, table: tbl({ cols: P.cols, rows: P.rows }) } : null,
        { heading: `6. ${sc.units.title}`, text: L.note || '', table: tbl({ cols: L.cols, rows: L.rows }) },
        { heading: `7. ${(sc.customers.title || 'Clientes a notificar')}`, table: { cols: [{ label: 'Destinatario', key: 'cliente' }, { label: 'Canal', key: 'canal' }, { label: 'Referencias', key: 'ref' }, { label: 'Cantidad', key: 'q', num: true }, { label: 'Acción', key: 'accion' }], rows: custRows } },
        { heading: '8. Tiempos de las actividades clave', table: { cols: [{ label: 'Hora', key: 'hora' }, { label: 'Actividad', key: 'act' }, { label: 'Responsable y sistema', key: 'quien' }, { label: 'Transcurrido', key: 't', num: true }], rows: times } },
        { heading: '9. Decisión y conclusión', text: `${decisionText}\n\n${RP.conclusion || ''}` },
        { heading: 'Nota', callout: RP.note || 'Simulacro: no se ha bloqueado nada y no se ha enviado ningún aviso. Datos sintéticos de demostración.' },
        { html: App.raw(pageCss) }
      ].filter(Boolean)),
      signatures: [
        { role: `Elaborado · Agentic Platform (agente ${AGENTS.trace})`, note: fmt.date(run.doneAt, { time: true }) },
        { role: `${dec && dec.status === 'rejected' ? 'Rechazado' : 'Aprobado'} · ${APPROVER}`, note: dec ? fmt.date(dec.at, { time: true }) : 'Pendiente de aprobación' }
      ]
    });
  }

  /* ---------------------------------------------------------------- Acciones */

  function readInput(ctx) {
    const el = ctx.$('#ret-code');
    const mode = MODES[ctx.local.mode] ? ctx.local.mode : DEFAULT_MODE;
    return { mode, code: el ? el.value : (Object.assign({}, DEFAULTS, ctx.local.codes || {}))[mode] };
  }

  function runMs(steps, i) { return sum(steps.slice(0, i + 1), (s) => s.ms); }

  async function start(ctx) {
    if (ctx.vars.busy || ctx.local.run) return;
    const { mode, code } = readInput(ctx);
    const sc = findScope(mode, code);
    if (!sc) {
      ctx.setLocal({ miss: { mode, code: norm(code) }, codes: Object.assign({}, ctx.local.codes, { [mode]: norm(code) }) });
      App.audit('Consulta de trazabilidad sin resultado', `${MODES[mode].label} «${norm(code) || '—'}» · no se inicia el simulacro`);
      const pv = ctx.$('#ret-preview');
      if (pv) pv.innerHTML = String(previewHTML(ctx, mode, code));
      return;
    }
    ctx.vars.busy = true;
    const regCode = ctx.local.nextCode || App.seq(R.regPrefix || 'SR-2026-', 4, 3);
    ctx.setLocal({ miss: null, nextCode: regCode, codes: Object.assign({}, ctx.local.codes, { [mode]: sc.code }) });
    const startedAt = App.nowISO();
    App.audit(`${TITLE} iniciado`, `${regCode} · ${sc.label}`);
    ctx.vars.running = { sc, code: regCode, startedAt };
    ctx.presenter({ next: (R.presenter && R.presenter.running) || 'Mientras corre: «Mirad cómo aparece la genealogía, del origen al cliente, y qué sistema consulta cada paso». Si hace falta, pulsa «Acelerar».' });
    ctx.rerender();
    const host = ctx.$('#ret-run-log');
    const timer = ctx.$('#ret-timer');
    if (!host) { ctx.vars.busy = false; return; }
    const steps = streamSteps(sc);
    const stream = App.reasoningStream(host, steps, {
      title: `Simulacro ${regCode} · ${sc.label}`, signal: ctx.signal, maxHeight: 320, start: startedAt,
      onStep: (s, i) => { if (timer) timer.textContent = fmt.ms(runMs(steps, i)); if (s.reveal != null) genReveal(ctx, s.reveal); }
    });
    const res = await stream.done;
    if (!ctx.alive()) { ctx.vars.busy = false; ctx.vars.running = null; return; }
    ctx.vars.busy = false;
    ctx.vars.running = null;
    const doneAt = App.nowISO();
    const b = sc.bal;
    ctx.setLocal({ run: { code: regCode, mode, code_in: sc.code, label: sc.label, startedAt, doneAt, ms: res.ms, steps: res.steps }, decision: null, nextCode: null, flow: null });
    const AU = sc.audit || {};
    App.audit('Traza hacia atrás completada', `${sc.label} · ${AU.back || ''}`, actorOf('trace'));
    App.audit('Traza hacia delante completada', AU.fwd || sc.located.short, actorOf('trace'));
    App.audit('Balance de masas calculado', `Conciliado ${pct1(b.reconciled)} · ${qty(b.diff, b.unit)} sin justificar de ${qty(b.received, b.unit)}`, actorOf('bal'));
    App.audit('Registro de simulacro abierto', `${regCode} · borrador`, actorOf('rec'));
    App.audit('Avisos preparados sin enviar', `${fmt.plural(sc.customers.items.filter((c) => c.notice).length, 'aviso', 'avisos')} · pendientes de aprobación`, actorOf('rec'));
    App.outcome('retirada', { status: 'done', label: `Simulacro ${regCode} trazado en ${fmt.ms(res.ms)}` });
    App.toast(`Simulacro ${regCode}: trazado en ${fmt.ms(res.ms)} · ${pct1(b.reconciled)} conciliado`, { tone: 'ok' });
    ctx.presenter(null);
    ctx.rerender();
    requestAnimationFrame(() => { const el = ctx.$('.kpis'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  }

  async function decide(ctx, status) {
    const run = ctx.local.run;
    if (!run || ctx.local.decision) return;
    let comment = '';
    if (status === 'rejected') {
      const r = await App.promptText({ title: 'Rechazar el cierre del simulacro', label: 'Motivo del rechazo', placeholder: (R.approval && R.approval.rejectPlaceholder) || 'Por ejemplo: falta confirmar un contacto de retirada', required: true, confirmLabel: 'Rechazar', danger: true });
      if (r == null || !ctx.alive()) return;
      comment = r;
    }
    const at = App.nowISO();
    ctx.setLocal({ decision: { status, at, by: APPROVER, comment } });
    const sc = findScope(run.mode, run.code_in);
    const nNotices = sc ? sc.customers.items.filter((c) => c.notice).length : 0;
    if (status === 'approved') {
      App.audit(`${TITLE} aprobado`, `${run.code} · ${run.label} · ${fmt.ms(run.ms)} · ${sc ? pct1(sc.bal.reconciled) : '—'} conciliado`);
      App.audit('Avisos guardados como borrador (simulacro, sin enviar)', `${run.code} · ${fmt.plural(nNotices, 'aviso', 'avisos')}`, actorOf('rec'));
      App.audit('Registro de simulacro aprobado', `${run.code} · revisión 1`, actorOf('rec'));
      App.outcome('retirada', { status: 'approved', label: `Simulacro ${run.code} aprobado` });
      App.toast(`Simulacro ${run.code} aprobado · avisos guardados como borrador, sin enviar`, { tone: 'ok' });
    } else {
      App.audit(`${TITLE} rechazado`, `${run.code} · motivo: ${comment} · no se prepara ningún aviso`);
      App.outcome('retirada', { status: 'rejected', label: `Simulacro ${run.code} rechazado` });
      App.toast('Simulacro rechazado: no se ha preparado ningún aviso', { tone: 'warn' });
    }
    ctx.rerender();
    requestAnimationFrame(() => { const el = ctx.$('[data-approval-card="ret-cierre"]'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' }); });
  }

  function newSimulation(ctx) {
    const run = ctx.local.run;
    if (!run) return;
    const sc = findScope(run.mode, run.code_in);
    const dec = ctx.local.decision;
    const hist = (ctx.local.history || []).concat([{ code: run.code, label: run.label, at: run.startedAt, ms: run.ms, reconciled: sc ? sc.bal.reconciled : 100, status: dec ? dec.status : 'draft' }]);
    App.audit('Simulacro archivado', `${run.code} · ${dec ? (dec.status === 'approved' ? 'aprobado' : 'rechazado') : 'sin decisión'}`);
    ctx.setLocal({ run: null, decision: null, history: hist, miss: null, flow: null });
    ctx.rerender();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function applyParams(ctx) {
    const p = norm(ctx.params && ctx.params[0]);
    if (!p || ctx.local.run || ctx.vars.paramDone === p) return;
    ctx.vars.paramDone = p;
    const e = ENTRIES.find((x) => norm(x.code) === p);
    const mode = e ? e.mode : DEFAULT_MODE;
    ctx.setLocal({ mode, miss: null, codes: Object.assign({}, ctx.local.codes, { [mode]: p }) });
  }

  /* ---------------------------------------------------------------- Registro de la escena */

  const PR = R.presenter || {};
  App.scene({
    id: 'retirada',
    order: 50,
    section: R.section || 'Calidad',
    nav: R.nav || TITLE,
    title: TITLE,
    icon: 'git-branch',
    presenter: {
      say: (state) => {
        const loc = state.scenes.retirada || {};
        const run = loc.run;
        if (!run) return PR.idle || [];
        const sc = findScope(run.mode, run.code_in);
        const out = [
          `Trazado simulado en ${fmt.ms(run.ms)}; el objetivo de 4 horas es ilustrativo y lo confirma ${APPROVER}.`,
          sc ? `El balance cuadra: ${pct1(sc.bal.reconciled)} conciliado, con cada merma justificada por su etapa. Lo que no cuadra (${qty(sc.bal.diff, sc.bal.unit)}) se ve, no se reparte.` : ''
        ].concat(sc && sc.say ? sc.say : []);
        if (loc.decision) out.push('El registro sale con código, revisión, tiempos de cada actividad y bloque de firmas, como los registros de su sistema de gestión.');
        return out.filter(Boolean);
      },
      next: (state) => {
        const loc = state.scenes.retirada || {};
        if (!loc.run) return PR.nextIdle || 'Pulsar «Iniciar simulacro».';
        if (!loc.decision) return PR.nextRun || 'Pulsar «Ver aviso» de un destinatario y después «Aprobar y cerrar simulacro».';
        return PR.nextDone || '«Descargar paquete de retirada»: CSV y registro imprimible. Después, «Cuestionario de cliente» (flecha derecha).';
      }
    },
    render(root, ctx) {
      applyParams(ctx);
      const running = ctx.vars.running;
      const run = ctx.local.run;
      const sc = run ? findScope(run.mode, run.code_in) : null;
      const dec = ctx.local.decision || null;
      const baseMeta = [
        { icon: 'calendar', text: `${fmt.cap(META.weekday)} ${fmt.date(TODAY)}` },
        { icon: 'map-pin', text: R.place || META.site },
        { icon: 'user', text: APPROVER }
      ];

      if (running) {
        const rs = running.sc;
        root.innerHTML = String(html`
          ${App.pageHead({ title: TITLE, meta: baseMeta.concat([{ icon: 'hash', text: running.code }, { icon: MODES[rs.mode].icon, text: rs.label }]) })}
          ${App.card({
            id: 'ret-run',
            title: `Simulacro en curso · ${rs.label}`,
            sub: rs.headline,
            icon: 'activity',
            actions: html`<div class="ret-timer" aria-live="off"><span class="ret-timer-label">Cronómetro</span><span class="ret-timer-num" id="ret-timer">0 ms</span><span class="ret-timer-ref">${R.timerRef || 'Objetivo demo: 4 h'}</span></div>`,
            body: html`<div class="stack">${genHTML(rs, false)}<div id="ret-run-log"></div></div>`
          })}`);
        genBind(ctx);
        return;
      }

      if (!run || !sc) {
        root.innerHTML = String(html`
          ${App.pageHead({ title: TITLE, meta: baseMeta, desc: R.desc })}
          <div class="grid cols-7-5">${setupCard(ctx)}${referenceCard()}</div>
          ${ctx.local.history && ctx.local.history.length ? html`<div class="section">${historyCard(ctx)}</div>` : ''}`);
        ctx.on('segchange', '[data-seg="ret-mode"]', (e) => { ctx.setLocal({ mode: e.detail.value, miss: null }); ctx.rerender(); const el = ctx.$('#ret-code'); if (el) { el.focus(); el.select(); } });
        ctx.on('input', '#ret-code', (e, el) => {
          const mode = MODES[ctx.local.mode] ? ctx.local.mode : DEFAULT_MODE;
          ctx.setLocal({ codes: Object.assign({}, ctx.local.codes, { [mode]: el.value }), miss: null });
          const pv = ctx.$('#ret-preview');
          if (pv) pv.innerHTML = String(previewHTML(ctx, mode, el.value));
        });
        ctx.on('keydown', '#ret-code', (e) => { if (e.key === 'Enter') { e.preventDefault(); start(ctx); } });
        ctx.on('click', '[data-action="start"]', () => start(ctx));
        ctx.on('click', '[data-example]', (e, el) => {
          const [mode, code] = el.getAttribute('data-example').split('|');
          ctx.setLocal({ mode, miss: null, codes: Object.assign({}, ctx.local.codes, { [mode]: code }) });
          ctx.rerender();
        });
        return;
      }

      root.innerHTML = String(html`
        ${App.pageHead({
          title: TITLE,
          meta: baseMeta.slice(0, 2).concat([{ icon: 'hash', text: `${run.code} · ${dec ? (dec.status === 'approved' ? 'aprobado' : 'rechazado') : 'borrador'}` }, { icon: MODES[run.mode].icon, text: sc.label }]),
          actions: html`<button type="button" class="btn btn-secondary" data-action="new">${icon('plus')}<span>Nuevo simulacro</span></button><button type="button" class="btn btn-primary" data-action="pack">${icon('download')}<span>${R.packLabel || 'Descargar paquete de retirada'}</span></button>`
        })}
        ${kpis(sc, run)}
        <div class="section">${genCard(sc, run)}</div>
        <div class="grid cols-7-5 section">${balanceCard(ctx, sc)}<div class="stack ret-side">${clockCard(sc, run, dec)}${referenceCard()}</div></div>
        ${isWide(sc) ? html`<div class="section">${customersCard(sc, dec)}</div><div class="section">${approval(sc, run, dec)}</div>` : html`<div class="grid cols-5-7 section">${customersCard(sc, dec)}${approval(sc, run, dec)}</div>`}
        <div class="section">${unitsCard(sc)}</div>
        <div class="section">${compareCard(sc, run, dec)}</div>
      `);
      genBind(ctx);
      const log = ctx.$('#ret-log');
      if (log) App.reasoningStream(log, streamSteps(sc), { title: `Simulacro ${run.code} · ${sc.label}`, instant: true, start: run.startedAt, maxHeight: 420 });
      ctx.on('click', '[data-action="new"]', () => newSimulation(ctx));
      ctx.on('click', '[data-action="pack"]', () => { downloadCsv(ctx); openReport(ctx); });
      ctx.on('click', '[data-action="csv"]', () => downloadCsv(ctx));
      ctx.on('click', '[data-action="notice"]', (e, el) => openNotice(ctx, sc, el.getAttribute('data-customer')));
      ctx.on('click', '[data-approval="approve"]', () => decide(ctx, 'approved'));
      ctx.on('click', '[data-approval="reject"]', () => decide(ctx, 'rejected'));
      ctx.on('click', '[data-action="scroll-balance"]', () => { const el = ctx.$('#ret-balance'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
      ctx.on('click', '[data-action="scroll-customers"]', () => { const el = ctx.$('#ret-customers'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
      ctx.on('segchange', '[data-seg="ret-flow"]', (e) => {
        ctx.setLocal({ flow: e.detail.value });
        const card = ctx.$('#ret-balance');
        if (card) card.outerHTML = String(balanceCard(ctx, sc));
      });
      ctx.on('keydown', '.gen-node[data-lot]', (e, el) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); } });
    },
    onLeave(ctx) {
      if (ctx.vars.ro) { try { ctx.vars.ro.disconnect(); } catch (e) { /* sin observador */ } ctx.vars.ro = null; }
    }
  });
})();
