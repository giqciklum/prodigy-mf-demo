/*
 * Escena «reclamacion» · Reclamación de cliente, común a todas las industrias.
 * Misma estructura que la demo de Congelados de Navarra: correo entrante, extracción resaltada y ficha
 * comprobada en los sistemas, traza del lote o expediente afectado, histórico de casos parecidos, borrador 8D
 * (o el plan equivalente del sector), respuesta al cliente con aprobación humana, comparación «hoy / con Agentic Platform»,
 * auditoría e informe controlado.
 *  - Todo el contenido sale de CN_DATA.reclamacion; el modal de traza lee CN_DATA.trace (App.traceModal).
 *  - La causa se presenta siempre como hipótesis; nada se envía ni se aplica sin aprobación.
 *  - Un código que no está en los sistemas no genera datos: se dice y no se cambia nada.
 *  - render() es idempotente: todo se reconstruye desde ctx.local (analysis, reply).
 */
(function () {
  'use strict';

  const { html, icon, fmt, chip } = App;
  const D = window.CN_DATA;
  const R = D.reclamacion;
  if (!R) return;
  const ROLE = D.roles || {};
  const AGENT = R.agent;
  const AGENT_ACTOR = `Agentic Platform · agente ${AGENT}`;
  const NC = R.nc;
  const FORM = R.form || { code: '—', rev: '1' };
  const LOT = R.lot || {};
  const EN = !!(window.CN_I18N && window.CN_I18N.english);
  const L = (es, en) => (EN ? en : es);

  /* ---------------------------------------------------------------- Correo (texto original) */

  function parseEmail(raw) {
    const s = String(raw || '').replace(/\r\n/g, '\n');
    const cut = s.indexOf('\n\n');
    const headers = {};
    (cut >= 0 ? s.slice(0, cut) : '').split('\n').forEach((line) => {
      const m = /^([A-Za-z-]+):\s?(.*)$/.exec(line);
      if (m) headers[m[1]] = m[2];
    });
    return { headers, body: (cut >= 0 ? s.slice(cut + 2) : s).replace(/\s+$/, '') };
  }
  const MAIL = parseEmail(R.email_text);
  const HDR = MAIL.headers;
  const BODY = MAIL.body;
  const addrOf = (s) => { const m = /<([^>]+)>/.exec(String(s || '')); return m ? m[1] : String(s || '').trim(); };
  const nameOf = (s) => String(s || '').replace(/\s*<[^>]*>\s*$/, '').trim();
  const OWN_ADDR = R.own_addr || addrOf(HDR.To);
  const OWN_NAME = R.own_name || nameOf(HDR.To);
  const CUST_ADDR = R.cust_addr || addrOf(HDR.From);
  const CUST_NAME = R.cust_name || nameOf(HDR.From);
  const ATTACHMENTS = R.attachments || [];

  function workingDays(fromIso, toIso) {
    const a = Date.parse(`${fromIso}T00:00:00Z`);
    const b = Date.parse(`${toIso}T00:00:00Z`);
    if (isNaN(a) || isNaN(b)) return null;
    const holidays = new Set(R.holidays || []);
    let n = 0;
    for (let t = a; t <= b; t += 86400000) {
      const d = new Date(t);
      const w = d.getUTCDay();
      if (w !== 0 && w !== 6 && !holidays.has(d.toISOString().slice(0, 10))) n += 1;
    }
    return n;
  }
  const DUE_LEFT = workingDays(D.meta.today, R.due);
  function isoMs(s) {
    const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/.exec(String(s || ''));
    return m ? Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +(m[6] || 0)) : NaN;
  }
  const toast = (msg, opts) => App.toast(msg, opts);
  const download = (name, mime, content) => App.downloadFile(name, mime, content);

  /* Elige el valor que corresponde al estado de la respuesta: {pending, approved, rejected} o un valor fijo. */
  function byStatus(v, st) {
    if (v == null || typeof v !== 'object' || Array.isArray(v) || !('pending' in v || 'approved' in v)) return v;
    const s = (st && st.reply && st.reply.status) || 'pending';
    return v[s] != null ? v[s] : v.pending;
  }
  const STATUS_KEYS = ['pending', 'approved', 'rejected'];
  const isStatusMap = (v) => v && typeof v === 'object' && !Array.isArray(v) && STATUS_KEYS.some((k) => k in v) && !('status' in v) && !('text' in v);
  function pick(v, st) { return isStatusMap(v) ? byStatus(v, st) : v; }

  /* ---------------------------------------------------------------- Workflow: grafo y registro */

  const RUN = R.run;
  const NODES = RUN.nodes;
  const EDGES = RUN.edges;
  const GRAPH_AT = RUN.graph_at || {};
  const STEPS = R.steps.map((s) => Object.assign({ agent: AGENT }, s));
  const STEP_SYSTEMS = Array.from(new Set(STEPS.map((s) => s.system)));
  const EXTERNAL_SYSTEMS = STEP_SYSTEMS.filter((s) => !['Agentic Platform', 'Modelo de lenguaje', 'Procedimientos'].includes(s));
  const LLM_CALLS = STEPS.filter((s) => s.system === 'Modelo de lenguaje').length;
  const NODE_IDS = NODES.map((n) => n.id);
  const APPROVAL_NODE = (NODES.find((n) => n.kind === 'approval') || {}).id;
  const OUTPUT_NODE = (NODES.find((n) => n.kind === 'output') || {}).id;

  /* Paso del agente que redacta la respuesta: en modo Local lo hace de verdad el modelo (último paso del modelo de lenguaje). */
  const DRAFT_AT = (() => { for (let i = STEPS.length - 1; i >= 0; i -= 1) if (STEPS[i].system === 'Modelo de lenguaje') return i; return -1; })();
  function logSteps(st) {
    const x = st.analysis && st.analysis.llm;
    if (!x || x.idx == null || !STEPS[x.idx]) return STEPS;
    return STEPS.map((s, i) => (i === x.idx ? Object.assign({}, s, { system: x.system, ms: x.ms, result: x.result, tone: x.ok ? s.tone : 'crit' }) : s));
  }

  function graphStatus(st) {
    if (!st.analysis) return {};
    const r = st.reply || {};
    const base = {};
    NODE_IDS.forEach((id) => { if (id !== APPROVAL_NODE && id !== OUTPUT_NODE) base[id] = 'done'; });
    if (r.status === 'approved') return Object.assign(base, { [APPROVAL_NODE]: 'done', [OUTPUT_NODE]: 'done' });
    if (r.status === 'rejected') return Object.assign(base, { [APPROVAL_NODE]: 'rejected', [OUTPUT_NODE]: 'skipped' });
    return Object.assign(base, { [APPROVAL_NODE]: 'waiting' });
  }

  /* Workflow publicado en «De palabras a workflow» (contrato App.state.workflows), si lo hay. */
  function complaintWorkflow() {
    const list = (App.state.workflows || []).slice().reverse();
    return list.find((w) => w && w.status !== 'draft'
      && (w.template === 'reclamacion' || /reclamaci|complaint|disputa/i.test([w.name, w.trigger && (w.trigger.type || w.trigger.label)].filter(Boolean).join(' ')))) || null;
  }

  /* ---------------------------------------------------------------- Respuesta */

  const REPLY = R.reply;
  /* Texto que se envía: el editado por la persona, si no el redactado por el modelo, si no el preparado. */
  function replyText(st) { const r = st.reply || {}; return r.text || r.draft || REPLY.text; }

  /* ---------------------------------------------------------------- Plan (8D o equivalente) */

  const PLAN = R.plan;
  function planRows(st) {
    return PLAN.rows.map((x) => Object.assign({}, x, {
      status: x.containment ? byStatus(PLAN.containment_status, st) : x.status,
      items: (x.items || []).map((t) => pick(t, st))
    }));
  }

  /* ---------------------------------------------------------------- Comprobación de códigos (nunca inventa) */

  function lotCheck(raw) {
    const code = String(raw || '').trim().toUpperCase();
    if (!code) return { kind: 'empty', code };
    if (code === String(LOT.code).toUpperCase()) return { kind: 'same', code };
    const known = (LOT.known || {})[code];
    if (known) return Object.assign({ code }, known);
    if (App.lot(code)) return { kind: 'mismatch', code, title: `${code} existe, pero no corresponde a esta reclamación`, body: LOT.mismatch_body || 'El código existe en los sistemas, pero no coincide con el producto reclamado: no se cambia la ficha.' };
    return { kind: 'unknown', code };
  }
  function lotCheckCallout(res) {
    const noun = LOT.noun || 'lote';
    if (res.kind === 'empty') return App.callout({ tone: 'warn', icon: 'search', title: `Escribe un código de ${noun}`, body: `Formato ${LOT.code}.` });
    if (res.kind === 'same') return App.callout({ tone: 'ok', icon: 'check-circle', title: `${res.code} es el ${noun} de la ficha`, body: LOT.same_body || 'Existe en los sistemas y corresponde al producto reclamado. Sin cambios.' });
    if (res.kind === 'unknown') return App.callout({ tone: 'warn', icon: 'search', title: `No encuentro «${res.code}» en ${LOT.systems}`, body: `No se cambia la ficha ni se muestra ninguna traza: Agentic Platform no genera datos que no estén en los sistemas. ${LOT.unknown_hint || ''}` });
    return App.callout({ tone: 'warn', icon: 'alert-triangle', title: res.title, body: res.body });
  }

  /* ---------------------------------------------------------------- Piezas de la vista */

  function statusChip(st) {
    const r = st.reply || {};
    const S = R.status_chips || {};
    if (!st.analysis) return chip('open', S.idle || 'Abierta · sin analizar');
    if (r.status === 'approved') return chip('sent', S.approved || 'Respuesta enviada · 8D en curso');
    if (r.status === 'rejected') return chip('rejected', S.rejected || 'Respuesta rechazada');
    return chip('waiting', S.pending || 'Esperando aprobación');
  }

  function analyzeButton(size) {
    return html`<button type="button" class="btn btn-primary${size ? ' btn-' + size : ''}" data-action="analyze">${icon('play')}<span>${R.analyze_label || 'Analizar reclamación'}</span></button>`;
  }

  function head(st) {
    const r = st.reply || {};
    const actions = !st.analysis
      ? analyzeButton()
      : html`<button type="button" class="btn btn-secondary" data-action="report">${icon('printer')}<span>${R.report.button}</span></button>
        ${r.status === 'pending' ? html`<button type="button" class="btn btn-primary" data-action="scroll-reply">${icon('user-check')}<span>Revisar y aprobar</span></button>` : ''}`;
    return App.pageHead({
      title: R.title,
      meta: [
        { icon: 'mail', text: `Recibida el ${fmt.date(R.received.date, R.received.time)}` },
        { icon: 'building', text: R.customer_line },
        { icon: 'calendar', text: R.due_line },
        statusChip(st)
      ],
      actions
    });
  }

  function runStats() {
    return RUN.stats.map((s) => (s.due ? { label: s.label, value: DUE_LEFT, tone: 'warn' } : s));
  }

  function runCard(st) {
    const a = st.analysis;
    const wf = complaintWorkflow();
    const wfChip = wf ? chip({ tone: 'brand', icon: 'workflow', label: `«${wf.name}» ${wf.version || 'v1'} publicado` }) : '';
    const graph = App.planGraph({ id: 'rc-graph', title: RUN.graph_title, nodes: NODES, edges: EDGES, status: graphStatus(st) });
    if (!a) {
      return App.card({
        id: 'rc-run',
        title: RUN.title,
        sub: RUN.sub,
        icon: 'workflow',
        actions: wfChip,
        body: html`<div class="rc-run-grid" id="rc-run-grid"><div class="rc-run-main">${graph}</div><div class="rc-run-side"><div id="rc-stream" hidden></div></div></div>`,
        footer: html`<span class="muted small">${RUN.idle_footer}</span><span class="spacer"></span>${analyzeButton('sm')}`
      });
    }
    return App.card({
      id: 'rc-run',
      title: `Análisis completado en ${fmt.ms(a.ms)}`,
      sub: `${STEPS.length} pasos · ${EXTERNAL_SYSTEMS.length} sistemas consultados · ${LLM_CALLS} llamadas al modelo de lenguaje · ${fmt.time(a.at)}`,
      icon: 'workflow',
      actions: wfChip,
      body: html`<div class="rc-run-grid has-side" id="rc-run-grid"><div class="rc-run-main">${graph}</div><div class="rc-run-side stack">
        ${App.stats(runStats())}
        <details class="run-log">
          <summary>${icon('chevron-right', 16)}<span>Registro de ejecución · ${STEPS.length} pasos · ${fmt.ms(a.ms)}</span></summary>
          <div class="mt-2" id="rc-log"></div>
        </details>
      </div></div>`
    });
  }

  const MAIL_HIGHLIGHTS = (R.highlights || []).filter((h) => h.text && BODY.includes(h.text));

  function mailCard(st) {
    const headers = { From: HDR.From, To: HDR.To, Date: HDR.Date, Subject: HDR.Subject };
    const original = App.emailView({ headers, text: BODY, attachments: ATTACHMENTS, highlights: st.analysis ? MAIL_HIGHLIGHTS : [] });
    const X = R.mail_extra;
    const body = st.analysis
      ? App.tabs({ id: 'rc-mail', flush: true, label: 'Correo del cliente', tabs: [
        { id: 'orig', label: R.mail_tab_label || 'Correo recibido', body: html`<p class="muted small mb-2">Resaltado: lo que Agentic Platform ha extraído (${MAIL_HIGHLIGHTS.length} datos). El texto no se modifica.</p>${original}` },
        X ? { id: 'extra', label: X.label, body: html`<p class="muted small mb-2">${X.note}</p>${App.emailView({ headers: X.headers || {}, text: X.text, highlights: X.highlights || [] })}` } : null
      ].filter(Boolean) })
      : html`<div class="card-body">${original}</div>`;
    return App.card({
      id: 'rc-mail-card',
      title: R.mail_title || 'Correo del cliente',
      sub: R.mail_sub,
      icon: 'mail',
      flush: true,
      actions: html`<button type="button" class="btn btn-ghost btn-sm" data-action="eml-original" title="Correo tal como se recibió">${icon('download', 15)}<span>Original (.eml)</span></button>`,
      body
    });
  }

  function sheetRows() {
    const ok = (t) => html`<span class="sub"><span class="t-ok">${icon('check', 13)}</span> ${t}</span>`;
    const sub = (t) => html`<span class="sub">${t}</span>`;
    return R.sheet.rows.map((row) => {
      let v;
      if (row.lot) v = html`<span class="row" style="gap:4px 10px">${App.lotTag(LOT.code)}<button type="button" class="link-btn small" data-action="fix-lot">Corregir</button></span>`;
      else if (row.due) v = html`<span class="row" style="gap:4px 8px"><span>${row.v}</span>${chip('pending', `${DUE_LEFT} días hábiles`)}</span>`;
      else if (row.trace) v = html`<span class="row" style="gap:4px 10px">${row.v ? html`<span>${row.v}</span>` : ''}${App.lotTag(row.trace)}</span>`;
      else if (row.code) v = html`<span class="code strong">${row.v}</span>`;
      else v = html`${row.v}`;
      return { k: row.k, v: html`${v}${row.ok ? ok(row.ok) : ''}${row.sub ? sub(row.sub) : ''}` };
    });
  }

  function sheetCard(st) {
    const S = R.sheet;
    if (!st.analysis) {
      return App.card({
        id: 'rc-sheet',
        title: S.title || 'Ficha de la reclamación',
        sub: 'Se rellena al analizar el correo',
        icon: 'clipboard',
        body: App.empty({ icon: 'search', title: 'Pendiente de análisis', text: S.empty_text })
      });
    }
    return App.card({
      id: 'rc-sheet',
      title: S.title || 'Ficha de la reclamación',
      sub: S.sub,
      icon: 'clipboard',
      flush: true,
      body: App.table({ hideHead: true, dense: true, rows: sheetRows(), cols: [
        { label: 'Dato', width: '30%', render: (r) => html`<span class="muted">${r.k}</span>` },
        { label: '', render: (r) => r.v }
      ] })
    });
  }

  function paramNote(ctx) {
    const p = ctx.params && ctx.params[0];
    if (!p) return '';
    const res = lotCheck(p);
    if (res.kind === 'same') return '';
    return html`<div class="mb-4">${lotCheckCallout(res)}</div>`;
  }

  function traceCard(st) {
    const T = R.trace;
    const items = T.back.map((b) => ({
      time: b.time,
      timeSub: b.timeSub,
      title: b.title,
      text: b.route ? html`${b.route.map((c, i) => html`${i ? html`<span class="muted">${icon('chevron-right', 12)}</span>` : ''}<span class="${c === b.route_mark ? 'strong t-warn' : 'code'}">${c}</span>`)}${b.text ? html`<div class="muted small mt-1">${b.text}</div>` : ''}` : b.text,
      tone: b.tone || 'brand',
      meta: b.ref || b.chip ? html`${b.ref ? html`<span class="code">${b.ref}</span>` : ''}${b.chip ? chip(b.chip.status, b.chip.label) : ''}` : ''
    }));
    const C = T.fwd_cols || {};
    const fwdRows = T.fwd.map((f) => Object.assign({}, f, { st: byStatus(f.status, st) }));
    return App.card({
      id: 'rc-trace',
      title: T.title,
      sub: T.sub,
      icon: 'git-branch',
      actions: html`<button type="button" class="btn btn-secondary btn-sm" data-lot="${T.button_code}">${icon('barcode', 15)}<span>${T.button_label}</span></button>`,
      body: html`<div class="grid cols-2">
          <div>
            <div class="h3 mb-4">${T.back_title || 'Hacia atrás'}</div>
            ${App.timeline({ items })}
          </div>
          <div>
            <div class="h3 mb-4">${T.fwd_title || 'Hacia delante'}</div>
            <div class="card flat">${App.table({ dense: true, rows: fwdRows, cols: [
              { label: C.id || 'Destino', render: (r) => html`${r.trace ? App.lotTag(r.id) : html`<span class="code strong">${r.id}</span>`}<span class="sub">${r.dest}${r.sub ? html` · ${r.sub}` : ''}</span>` },
              { label: C.qty || 'Uds.', key: 'qty', num: true },
              { label: C.when || 'Fecha', render: (r) => html`<span class="nowrap">${r.when}</span>` },
              { label: C.status || 'Estado', render: (r) => chip(r.st.status, r.st.label) }
            ] })}</div>
            <p class="muted small mt-2">${T.fwd_note}</p>
          </div>
        </div>
        <div class="mt-4">${hypothesisCallout()}</div>`
    });
  }

  function hypothesisCallout() {
    const H = R.trace.hypothesis;
    return App.callout({
      tone: H.tone || 'warn',
      icon: H.icon || 'wrench',
      title: H.title,
      body: html`${H.paras.map((p, i) => html`<p class="${i ? 'mt-2' : ''}">${p}</p>`)}`
    });
  }

  function requestsCard(st) {
    const Q = R.requests;
    const items = Q.items.map((q) => {
      const side = byStatus(q.side, st);
      const ic = byStatus(q.icon, st) || 'clock';
      const tone = byStatus(q.tone, st) || 'warn';
      return { icon: ic, tone, title: q.title, meta: q.meta, body: q.quote ? html`<span class="muted">«${q.quote}»</span>` : '', side: chip(side.status, side.label) };
    });
    return App.card({
      id: 'rc-requests',
      title: Q.title || 'Lo que pide el cliente',
      sub: `${items.length} peticiones del correo y dónde se responden`,
      icon: 'list-checks',
      flush: true,
      body: App.list(items)
    });
  }

  function historyCard() {
    const H = R.history;
    const rows = H.rows.slice().sort((a, b) => (Number(b.similar) - Number(a.similar)) || String(b.date).localeCompare(String(a.date)));
    const similar = rows.filter((h) => h.similar).length;
    const table = App.table({
      dense: true,
      rows,
      rowClass: (h) => (h.similar ? 'tone-warn' : ''),
      cols: [
        { label: H.col_id || 'Reclamación', render: (h) => html`<span class="code strong">${h.id}</span><span class="sub">${fmt.date(h.date)}</span>` },
        { label: H.col_product || 'Producto y lote', render: (h) => html`${h.product}<span class="sub code">${h.lot}</span>` },
        { label: 'Motivo', render: (h) => html`${h.description}<span class="sub">${h.category} · ${h.customer_label}</span>` },
        { label: H.col_cause || 'Causa raíz', render: (h) => html`${h.root_cause}<span class="sub">${h.nc} · ${h.status}</span>` },
        { label: 'Relación', render: (h) => (h.similar ? chip('warn', 'Parecida') : chip('neutral', 'Distinta')) }
      ]
    });
    const note = H.note ? App.callout({ tone: 'brand', icon: 'history', title: H.note.title, body: H.note.body }) : '';
    return App.card({
      id: 'rc-history',
      title: H.title || 'Reclamaciones anteriores',
      sub: `${H.sub} · ${rows.length} casos · ${fmt.plural(similar, 'parecido', 'parecidos')}`,
      icon: 'history',
      flush: true,
      body: html`${table}${note ? html`<div class="card-body">${note}</div>` : ''}`
    });
  }

  function planCard(st) {
    return App.card({
      id: 'rc-8d',
      title: PLAN.title,
      sub: PLAN.sub,
      icon: 'clipboard',
      flush: true,
      actions: html`<button type="button" class="btn btn-secondary btn-sm" data-action="report">${icon('printer', 15)}<span>${R.report.button}</span></button>`,
      body: App.table({
        rows: planRows(st),
        rowClass: (x) => (x.status.tone === 'warn' ? 'tone-warn' : x.status.tone === 'ok' ? 'tone-ok' : ''),
        cols: [
          { label: PLAN.col_label || 'Disciplina', width: '15%', render: (x) => html`<span class="strong">${x.d} · ${x.title}</span>` },
          { label: 'Borrador', render: (x) => html`<div class="prose">${x.lead ? html`<p>${x.lead}</p>` : ''}${x.items && x.items.length ? html`<ul>${x.items.map((t) => html`<li>${t}</li>`)}</ul>` : ''}${x.note ? html`<p class="muted">${x.note}</p>` : ''}</div>` },
          { label: 'Responsable', width: '19%', render: (x) => html`${x.owner[0]}${x.owner.slice(1).map((o) => html`<span class="sub">${o}</span>`)}` },
          { label: 'Fecha', width: '10%', render: (x) => html`<span class="nowrap">${fmt.date(x.date)}</span>` },
          { label: 'Estado', width: '13%', render: (x) => chip(x.status.tone, x.status.text) }
        ]
      })
    });
  }

  function replyCard(st) {
    const r = st.reply || {};
    const sent = r.status === 'approved';
    const text = replyText(st);
    const headers = { From: `${OWN_NAME} <${OWN_ADDR}>`, To: `${CUST_NAME} <${CUST_ADDR}>`, Date: sent && r.decidedAt ? fmt.date(r.decidedAt, { time: true }) : null, Subject: REPLY.subject };
    const edited = !!r.text;
    const K = REPLY.control;
    const ctlNote = edited
      ? html`<p class="small mb-2 t-warn">${K.edited_note || `Corresponde al borrador de Agentic Platform; la versión ${r.version} incluye cambios en el texto que se envía.`}</p>`
      : html`<p class="muted small mb-2">${K.note}</p>`;
    const badge = r.draft && r.model ? html`<span class="llm-badge" title="${L('Borrador redactado por el modelo', 'Draft written by the model')}">${icon('cpu', 12)}${r.model}</span>` : '';
    const title = sent ? `Respuesta enviada · ${fmt.time(r.decidedAt)}` : r.status === 'rejected' ? `Respuesta rechazada · versión ${r.version}` : `Respuesta ${REPLY.to_label || 'al cliente'} · borrador v${r.version || 1}`;
    return App.card({
      id: 'rc-reply-card',
      title,
      sub: `${REPLY.sub}${edited ? ' · editada' : ''}`,
      icon: 'send',
      iconTone: sent ? 'ok' : undefined,
      actions: badge,
      flush: true,
      body: App.tabs({ id: 'rc-reply-tabs', flush: true, label: 'Respuesta al cliente', tabs: [
        { id: 'msg', label: sent ? 'Enviada' : (REPLY.tab_label || 'Se envía'), body: App.emailView({ headers, text, highlights: (REPLY.highlights || []).filter((h) => text.includes(h.text)) }) },
        { id: 'ctl', label: K.label, body: html`${ctlNote}${App.emailView({ headers: K.subject ? { Subject: K.subject } : {}, text: K.text })}` }
      ] }),
      footer: html`<span class="row row-nowrap muted small" style="align-items:flex-start">${icon('shield-check', 16)}<span>${REPLY.criterion}</span></span>
        <span class="spacer"></span>
        <button type="button" class="btn btn-ghost btn-sm" data-action="eml">${icon('download', 15)}<span>${sent ? 'Respuesta enviada (.eml)' : 'Borrador (.eml)'}</span></button>`
    });
  }

  function approvalBlock(st) {
    const A = R.approval;
    const r = st.reply || { status: 'pending', version: 1 };
    const st0 = r.status || 'pending';
    const sent = st0 === 'approved';
    const scope = A.scope.map((s, i) => {
      const x = byStatus(s.state, st);
      const value = i === 0 ? `v${r.version || 1}${r.draft && r.model ? ` · ${r.model}` : ''}${r.text ? ' · editada' : ''}` : s.value;
      return { label: s.label, value, status: x.status, chip: x.chip };
    });
    const doneActions = sent
      ? html`<button type="button" class="btn btn-secondary btn-sm" data-action="eml">${icon('download', 15)}<span>Respuesta (.eml)</span></button><button type="button" class="btn btn-primary btn-sm" data-action="report">${icon('printer', 15)}<span>${R.report.button}</span></button>`
      : st0 === 'rejected' ? html`<button type="button" class="btn btn-primary btn-sm" data-action="new-version">${icon('edit', 15)}<span>Preparar nueva versión</span></button>` : '';
    const comment = sent ? A.next_step : st0 === 'rejected' ? `Motivo: ${r.reason || '—'}` : null;
    return html`<div class="stack" id="rc-approval" style="position:sticky;top:calc(var(--topbar-h) + 16px);align-self:start">${App.approvalCard({
      id: 'rc-reply',
      status: st0,
      title: A.title,
      summary: byStatus(A.summary, st),
      approver: A.approver,
      policy: A.policy,
      scope,
      effects: A.effects,
      editable: true,
      editLabel: 'Editar respuesta',
      approveLabel: A.approve_label || 'Aprobar y enviar',
      rejectLabel: 'Rechazar',
      decidedBy: r.decidedBy,
      decidedAt: r.decidedAt,
      comment,
      doneActions
    })}</div>`;
  }

  function measuredSeconds(st) {
    const a = st.analysis;
    const r = st.reply || {};
    if (!a || r.status !== 'approved' || !r.decidedAt) return null;
    const review = (isoMs(r.decidedAt) - isoMs(a.at)) / 1000;
    return Math.max(0, Math.round((a.ms || 0) / 1000 + (isNaN(review) ? 0 : review)));
  }

  function compareCard(st) {
    const a = st.analysis;
    const M = R.compare;
    const sec = measuredSeconds(st);
    const timeCell = sec != null
      ? html`<span class="strong t-ok">${fmt.dur(sec)}</span> medidos en esta sesión<span class="sub">Análisis automático de ${fmt.ms(a.ms)}; el resto, revisión y aprobación</span>`
      : html`<span class="strong">${fmt.ms(a.ms)}</span> de análisis automático<span class="sub">El total se mide al aprobar la respuesta</span>`;
    const rows = M.rows.map((x) => ({ k: x.k, hoy: x.hoy, pro: html`<span class="strong">${x.pro_strong}</span>${x.pro}` }))
      .concat([
        { k: 'Pasos', hoy: M.steps_today, pro: html`<span class="strong">${STEPS.length}</span> automáticos y <span class="strong">1</span> aprobación` },
        { k: M.time_label, hoy: M.time_today, pro: timeCell, hl: true }
      ]);
    return App.card({
      id: 'rc-compare',
      title: 'Esta reclamación: hoy y con Agentic Platform',
      sub: '«Hoy»: supuesto ilustrativo que se valida con la línea base del piloto · «Con Agentic Platform»: duración de la simulación, no rendimiento de producción',
      icon: 'bar-chart',
      flush: true,
      body: App.table({
        rows,
        rowClass: (r) => (r.hl ? 'tone-ok' : ''),
        cols: [
          { label: '', width: '26%', render: (r) => html`<span class="strong">${r.k}</span>` },
          { label: 'Hoy · estimación', width: '37%', render: (r) => html`<span class="slate">${r.hoy}</span>` },
          { label: 'Con Agentic Platform · simulación', render: (r) => r.pro }
        ]
      }),
      footer: html`<span class="row row-nowrap muted small" style="align-items:flex-start">${icon('list-checks', 16)}<span>${M.footer}</span></span>`
    });
  }

  /* ---------------------------------------------------------------- Acciones */

  const AU = R.audit;

  /* ---------------------------------------------------------------- Modelo local (LiteLLM) */

  const pad = (n) => String(n).padStart(2, '0');
  function showLlmLine(host, startedAt, atMs) {
    const state = host.querySelector('[data-rs-state]');
    if (state) state.innerHTML = String(chip('running', 'En curso'));
    const list = host.querySelector('.rs-list');
    if (!list) return;
    const s = STEPS[DRAFT_AT];
    const d = new Date((isNaN(isoMs(startedAt)) ? Date.now() : isoMs(startedAt)) + atMs);
    const li = document.createElement('li');
    li.className = 'rs-line is-new is-running';
    li.innerHTML = String(html`<span class="rs-time">${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}</span>
      <span class="rs-who"><span class="rs-agent">${AGENT}</span>${App.sys(App.llm.systemName(), { icon: 'cpu', title: L(App.llm.via().es, App.llm.via().en) })}</span>
      <span class="rs-text"><span class="rs-action">${s.action}</span><span class="rs-result">${App.raw('<span class="typing" aria-hidden="true"><i></i><i></i><i></i></span>')}</span></span>
      <span class="rs-ms">${App.raw('<span class="spinner" aria-hidden="true"></span>')}</span>`);
    list.appendChild(li);
    list.scrollTop = list.scrollHeight;
  }

  const plain = (v) => String(v == null ? '' : v).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  function llmContext() {
    const st0 = {};
    const sheet = (R.sheet.rows || []).map((row) => {
      const v = row.lot ? LOT.code : row.trace ? [row.v, row.trace].filter(Boolean).join(' · ') : row.v;
      return `- ${row.k}: ${plain(v)}${row.ok ? ` (${plain(row.ok)})` : ''}${row.sub ? ` · ${plain(row.sub)}` : ''}`;
    });
    const asks = ((R.requests && R.requests.items) || []).map((q) => `- ${plain(q.title)}${q.quote ? ` («${plain(q.quote)}»)` : ''}${q.meta ? ` → ${plain([].concat(q.meta).join(' · '))}` : ''}`);
    const T = R.trace;
    const back = T.back.map((b) => `- ${b.time}${b.timeSub ? ` ${b.timeSub}` : ''} · ${plain(b.title)}: ${plain(b.text)}${b.ref ? ` (${b.ref})` : ''}`);
    const fwd = T.fwd.map((f) => `- ${f.id} · ${plain(f.dest)}${f.sub ? ` (${plain(f.sub)})` : ''} · ${f.qty} · ${plain(f.when)} · ${plain(byStatus(f.status, st0).label)}`);
    const plan = planRows(st0).map((x) => [`- ${x.d} · ${plain(x.title)}${x.lead ? `: ${plain(x.lead)}` : ''}`].concat((x.items || []).map((t) => `    · ${plain(t)}`)).join('\n'));
    const mailExtra = R.mail_extra ? `\n\n${L('Correo reenviado', 'Forwarded email')} (${plain(R.mail_extra.label)}):\n${R.mail_extra.text}` : '';
    return [
      `${L('CORREO DEL CLIENTE', 'CUSTOMER EMAIL')}:\n${R.email_text}${mailExtra}`,
      `${L('DATOS EXTRAÍDOS Y COMPROBADOS EN LOS SISTEMAS', 'DATA EXTRACTED AND CHECKED IN THE SYSTEMS')}:\n${sheet.join('\n')}\n- ${L('Plazos', 'Deadlines')}: ${plain(R.due_line)} · ${DUE_LEFT} ${L('días hábiles', 'working days')}`,
      `${L('LO QUE PIDE EL CLIENTE', 'WHAT THE CUSTOMER ASKS FOR')}:\n${asks.join('\n')}`,
      `${L('TRAZA', 'TRACE')} · ${plain(T.title)}:\n${back.join('\n')}\n${plain(T.fwd_title || '')}:\n${fwd.join('\n')}\n${plain(T.fwd_note)}\n${plain(T.hypothesis.title)}:\n${T.hypothesis.paras.map((p) => `- ${plain(p)}`).join('\n')}`,
      `${plain(PLAN.title)} (${plain(PLAN.sub)}):\n${plan.join('\n')}`,
      `${L('CRITERIO DE REDACCIÓN', 'DRAFTING CRITERION')}: ${plain(REPLY.criterion)}`,
      `${L('MENSAJE', 'MESSAGE')}:\n- ${L('De', 'From')}: ${OWN_NAME} <${OWN_ADDR}>\n- ${L('Para', 'To')}: ${CUST_NAME} <${CUST_ADDR}>\n- ${L('Asunto (ya puesto, no lo repitas)', 'Subject (already set, do not repeat it)')}: ${REPLY.subject}\n- ${L('Nuestra referencia', 'Our reference')}: ${NC}`
    ].join('\n\n');
  }
  function llmSystem() {
    const I = REPLY.llm_instructions || [];
    const lang = EN ? 'British English' : 'español';
    const base = EN
      ? ['You are the customer-complaints agent of the company described below. You write the reply email to the customer; a person reviews and approves it before it is sent.',
        'Use only facts that appear in the information provided. Do not invent dates, quantities, references, names or commitments.',
        'Present any cause only as something under investigation: never state a root cause that is not confirmed.',
        `Write in ${lang}. Plain text only: no Markdown, no bold, no subject line, no notes or explanations about the email. Short paragraphs; you may use hyphen lists.`,
        'Start with the greeting and end with the signature of the sending department.']
      : ['Eres el agente de reclamaciones de cliente de la empresa descrita abajo. Redactas el correo de respuesta al cliente; una persona lo revisa y lo aprueba antes de enviarlo.',
        'Usa solo hechos que aparezcan en la información facilitada. No inventes fechas, cantidades, referencias, nombres ni compromisos.',
        'Presenta cualquier causa solo como algo en investigación: nunca afirmes una causa raíz que no esté confirmada.',
        `Escribe en ${lang}. Solo texto plano: sin Markdown, sin negritas, sin línea de asunto, sin notas ni explicaciones sobre el correo. Párrafos cortos; puedes usar listas con guiones.`,
        'Empieza por el saludo y termina con la firma del departamento que envía.'];
    return base.concat(I.length ? [EN ? 'Rules of tone and content for this sector:' : 'Normas de tono y contenido de este sector:'].concat(I.map((t) => `- ${t}`)) : []).join('\n');
  }
  function cleanDraft(t) {
    let s = String(t || '').replace(/\r\n/g, '\n').trim();
    s = s.replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/, '').trim();
    s = s.replace(/^(subject|asunto)\s*:.*\n+/i, '').trim();
    s = s.replace(/\*\*(.+?)\*\*/g, '$1');
    return s;
  }
  async function draftWithModel(ctx) {
    const system = App.llm.systemName();
    const t0 = performance.now();
    try {
      const out = await App.llm.chat({
        system: llmSystem(),
        user: `${llmContext()}\n\n${EN ? 'Write now only the body of the reply email, in British English.' : 'Escribe ahora solo el cuerpo del correo de respuesta, en español.'}`,
        maxTokens: 1200,
        temperature: 0.3,
        signal: ctx.signal
      });
      const text = cleanDraft(out.text);
      if (!text) throw new Error(L('El modelo ha devuelto una respuesta vacía', 'The model returned an empty answer'));
      const words = text.split(/\s+/).filter(Boolean).length;
      App.audit(L('Respuesta al cliente redactada por el modelo', 'Customer reply drafted by the model'), `${R.code} · ${out.model} · ${fmt.ms(out.ms)} · ${words} ${L('palabras', 'words')}`, AGENT_ACTOR);
      return {
        draft: { text, model: out.model },
        log: { idx: DRAFT_AT, system, model: out.model, ms: out.ms, ok: true, result: L(`Borrador redactado por ${out.model} · ${words} palabras · pendiente de aprobación`, `Draft written by ${out.model} · ${words} words · pending approval`) }
      };
    } catch (e) {
      const ms = Math.round(performance.now() - t0);
      if (ctx.alive()) toast(L(`No se ha podido usar el modelo (${e.message}). Se usa el borrador preparado.`, `The model could not be used (${e.message}). The prepared draft is used instead.`), { tone: 'warn', icon: 'alert-triangle' });
      App.audit(L('Modelo sin respuesta', 'Model unavailable'), `${R.code} · ${e.message} · ${L('se usa el borrador preparado', 'prepared draft used')}`, AGENT_ACTOR);
      return { draft: null, log: { idx: DRAFT_AT, system, model: App.llm.model, ms, ok: false, result: L(`Sin respuesta del modelo (${e.message}) · se usa el borrador preparado`, `No answer from the model (${e.message}) · prepared draft used`) } };
    }
  }

  async function analyze(ctx) {
    if (ctx.local.analysis || ctx.vars.busy) return;
    ctx.vars.busy = true;
    App.audit(AU.requested.action, AU.requested.detail);
    ctx.$$('[data-action="analyze"]').forEach((b) => {
      b.disabled = true;
      b.classList.add('is-busy');
      b.innerHTML = String(html`<span class="spinner"></span><span>Analizando…</span>`);
    });
    const host = ctx.$('#rc-stream');
    host.hidden = false;
    const grid = ctx.$('#rc-run-grid');
    if (grid) grid.classList.add('has-side', 'is-running');
    const card = ctx.$('#rc-run');
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (R.presenter && R.presenter.running) ctx.presenter({ next: R.presenter.running });
    const startedAt = App.nowISO();
    App.planGraph.set(ctx.root, { [NODE_IDS[0]]: 'active' });
    /* En modo Local el paso que redacta la respuesta llama de verdad al modelo: el registro corre hasta ese paso,
       espera a la llamada y se completa con el sistema, el resultado y el tiempo reales. */
    const local = !!(App.llm && App.llm.isLocal()) && DRAFT_AT >= 0;
    const run = App.reasoningStream(host, local ? STEPS.slice(0, DRAFT_AT) : STEPS, {
      title: `Agente ${AGENT}`,
      signal: ctx.signal,
      maxHeight: 380,
      start: startedAt,
      onStep: (s, i) => { if (GRAPH_AT[i]) App.planGraph.set(ctx.root, GRAPH_AT[i]); }
    });
    const res = await run.done;
    if (!ctx.alive()) return;
    let llm = null;
    let draft = null;
    if (local) {
      showLlmLine(host, startedAt, res.ms);
      const out = await draftWithModel(ctx);
      if (!ctx.alive()) return;
      llm = out.log;
      draft = out.draft;
      const done = App.reasoningStream(host, logSteps({ analysis: { llm } }), { title: `Agente ${AGENT}`, instant: true, start: startedAt, maxHeight: 380 });
      const list = host.querySelector('.rs-list');
      if (list) list.scrollTop = list.scrollHeight;
      for (let i = DRAFT_AT; i < STEPS.length; i += 1) if (GRAPH_AT[i]) App.planGraph.set(ctx.root, GRAPH_AT[i]);
      res.ms = done.ms;
      res.steps = STEPS.length;
    }
    ctx.vars.busy = false;
    ctx.setLocal({ analysis: { startedAt, at: App.nowISO(), ms: res.ms, steps: res.steps, llm }, reply: Object.assign({ status: 'pending', version: 1 }, draft ? { draft: draft.text, model: draft.model } : {}) });
    App.audit(AU.analyzed.action, `${AU.analyzed.detail} · ${res.steps} pasos · ${fmt.ms(res.ms)}`, AGENT_ACTOR);
    (AU.after_analysis || []).forEach((e) => App.audit(e.action, e.detail, AGENT_ACTOR));
    toast(`${R.toast_analyzed} · ${fmt.ms(res.ms)}`, { tone: 'ok' });
    ctx.presenter(null);
    ctx.rerender();
    requestAnimationFrame(() => { const el = ctx.$('#rc-extract'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  }

  async function approve(ctx) {
    const r = ctx.local.reply || {};
    if (!ctx.local.analysis || r.status !== 'pending' || ctx.vars.sending) return;
    ctx.vars.sending = true;
    const btn = ctx.$('[data-approval="approve"]');
    if (btn) { btn.disabled = true; btn.classList.add('is-busy'); btn.innerHTML = String(html`<span class="spinner"></span><span>Enviando…</span>`); }
    await ctx.sleep(600);
    if (!ctx.alive()) return;
    ctx.vars.sending = false;
    const at = App.nowISO();
    ctx.setLocal({ reply: Object.assign({}, r, { status: 'approved', decidedAt: at, decidedBy: R.approval.approver }) });
    App.audit(AU.approved.action, `${AU.approved.detail} · versión ${r.version || 1}`);
    App.audit('Correo enviado', `Outlook · de ${OWN_ADDR} a ${CUST_ADDR} · «${REPLY.subject}»`, AGENT_ACTOR);
    (AU.after_approval || []).forEach((e) => App.audit(e.action, e.detail, AGENT_ACTOR));
    App.outcome('reclamacion', { status: 'sent', label: R.outcome_label });
    toast(R.approval.toast_approved, { tone: 'ok', icon: 'send' });
    ctx.rerender();
    requestAnimationFrame(() => { const el = ctx.$('#rc-compare'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' }); });
  }

  async function reject(ctx) {
    const r = ctx.local.reply || {};
    if (!ctx.local.analysis || r.status !== 'pending') return;
    const reason = await App.promptText({
      title: 'Rechazar la respuesta',
      kicker: R.title,
      text: R.approval.reject_text,
      label: 'Motivo',
      placeholder: R.approval.reject_placeholder,
      required: true,
      confirmLabel: 'Rechazar'
    });
    if (reason == null || !ctx.alive()) return;
    const cur = ctx.local.reply || {};
    if (cur.status !== 'pending') return;
    ctx.setLocal({ reply: Object.assign({}, cur, { status: 'rejected', decidedAt: App.nowISO(), decidedBy: R.approval.approver, reason }) });
    App.audit('Respuesta rechazada', `${R.code} · versión ${cur.version || 1} · motivo: ${reason} · ${R.approval.reject_audit}`);
    toast(R.approval.toast_rejected, { tone: 'info' });
    ctx.rerender();
  }

  function newVersion(ctx) {
    const r = ctx.local.reply || {};
    if (r.status !== 'rejected') return;
    const version = (r.version || 1) + 1;
    ctx.setLocal({ reply: { status: 'pending', version, text: r.text || null, draft: r.draft || null, model: r.model || null, previous: { version: r.version, reason: r.reason } } });
    App.audit('Nueva versión de la respuesta', `${R.code} · versión ${version} · pendiente de aprobación`);
    ctx.rerender();
    requestAnimationFrame(() => { const el = ctx.$('#rc-reply'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  }

  function editReply(ctx) {
    const r = ctx.local.reply || {};
    if (r.status !== 'pending') return;
    const current = replyText(ctx.local);
    const fid = App.uid('rc-edit');
    const m = App.modal({
      title: 'Editar la respuesta al cliente',
      kicker: `${R.title} · versión ${r.version || 1}`,
      size: 'lg',
      body: html`<div class="field"><label class="label" for="${fid}">Texto de la respuesta (se envía tal cual)</label><textarea id="${fid}" class="textarea" rows="18" style="min-height:360px" spellcheck="true">${current}</textarea><span class="hint">Los cambios crean una versión nueva y quedan en el registro de auditoría.</span></div>`,
      actions: [
        { label: 'Cancelar', variant: 'secondary' },
        {
          label: 'Guardar versión',
          icon: 'save',
          variant: 'primary',
          onClick: (api) => {
            const ta = api.body.querySelector('textarea');
            const t = String(ta.value || '').replace(/\s+$/, '');
            if (!t.trim()) { ta.focus(); return false; }
            if (t === current) return undefined;
            const version = (r.version || 1) + 1;
            ctx.setLocal({ reply: Object.assign({}, r, { text: t, version }) });
            App.audit('Respuesta editada', `${R.code} · versión ${version} · ${t.length - current.length >= 0 ? '+' : '−'}${Math.abs(t.length - current.length)} caracteres`);
            toast(`Versión ${version} guardada · pendiente de aprobación`, { tone: 'ok', icon: 'save' });
            setTimeout(() => ctx.rerender(), 0);
            return undefined;
          }
        }
      ]
    });
    setTimeout(() => { const ta = m && m.body.querySelector('textarea'); if (ta) ta.focus(); }, 40);
  }

  function openLotFix() {
    const fid = App.uid('rc-lot');
    const noun = LOT.noun || 'lote';
    const m = App.modal({
      title: `Corregir ${LOT.fix_title || `el ${noun} de la reclamación`}`,
      kicker: R.title,
      size: 'sm',
      body: html`<p class="slate mb-4">${LOT.fix_text}</p>
        <div class="field"><label class="label" for="${fid}">${LOT.label || 'Código'}</label><input id="${fid}" class="input mono" value="${LOT.code}" autocomplete="off" spellcheck="false" data-lotfix-input><span class="hint">Formato ${LOT.code}</span></div>
        <div class="mt-4" data-lotfix-result></div>`,
      actions: [
        { label: 'Cerrar', variant: 'secondary' },
        { label: `Comprobar en ${LOT.systems_short || LOT.systems}`, icon: 'search', variant: 'primary', close: false, onClick: (api) => { runCheck(api); return false; } }
      ]
    });
    if (!m) return;
    function runCheck(api) {
      const input = api.body.querySelector('[data-lotfix-input]');
      const res = lotCheck(input.value);
      api.body.querySelector('[data-lotfix-result]').innerHTML = String(lotCheckCallout(res));
      if (res.kind === 'unknown') App.audit('Corrección no aplicada', `${res.code} no existe en ${LOT.systems} · ${R.code}`);
      else if (res.kind === 'mismatch' || res.kind === 'same-product') App.audit('Corrección no aplicada', `${res.code} · no corresponde a ${R.code}`);
      else if (res.kind === 'same') App.audit(`Código de la reclamación comprobado`, `${res.code} · sin cambios`);
    }
    const input = m.body.querySelector('[data-lotfix-input]');
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); runCheck(m); } });
    setTimeout(() => { input.focus(); input.select(); }, 40);
  }

  /* ---------------------------------------------------------------- Descargas */

  const WD_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const MON_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const pad2 = (n) => String(n).padStart(2, '0');
  function rfcDate(iso) {
    const t = isoMs(iso);
    const d = new Date(isNaN(t) ? Date.UTC(2026, 8, 29, 7, 5) : t);
    return `${WD_EN[d.getUTCDay()]}, ${d.getUTCDate()} ${MON_EN[d.getUTCMonth()]} ${d.getUTCFullYear()} ${pad2(d.getUTCHours())}:${pad2(d.getUTCMinutes())}:${pad2(d.getUTCSeconds())} +0200`;
  }

  function downloadReply(ctx) {
    const st = ctx.local;
    if (!st.analysis) return;
    const r = st.reply || {};
    const sent = r.status === 'approved';
    const when = sent && r.decidedAt ? r.decidedAt : App.nowISO();
    const stamp = String(when).replace(/\D/g, '');
    const lines = [
      `From: "${OWN_NAME}" <${OWN_ADDR}>`,
      `To: "${CUST_NAME}" <${CUST_ADDR}>`,
      `Subject: ${REPLY.subject}`,
      `Date: ${rfcDate(when)}`,
      `Message-ID: <${NC}.${stamp}@${R.mail_domain || 'demo.example'}>`,
      sent ? null : 'X-Unsent: 1',
      'MIME-Version: 1.0',
      'Content-Type: text/plain; charset=UTF-8',
      'Content-Transfer-Encoding: 8bit',
      sent ? `X-Agentic Platform-Approval: ${R.approval.approver}; ${fmt.date(when, { time: true })}` : `X-Agentic Platform-Status: draft v${r.version || 1}, pending approval`,
      '',
      replyText(st)
    ].filter((x) => x != null);
    download(sent ? `respuesta-${R.code}.eml` : `borrador-respuesta-${R.code}.eml`, 'message/rfc822', lines.join('\r\n').replace(/\r?\n/g, '\r\n') + '\r\n');
  }

  function downloadOriginal() {
    download(`${R.code}-correo-original.eml`, 'message/rfc822', String(R.email_text).replace(/\r?\n/g, '\r\n'));
  }

  function openReport(ctx) {
    const st = ctx.local;
    if (!st.analysis) return;
    const P = R.report;
    const r = st.reply || {};
    const approved = r.status === 'approved';
    const rejected = r.status === 'rejected';
    const esc = App.esc;
    const tag = (s) => App.raw(`<span class="tag ${s.tone === 'warn' ? 'warn' : s.tone === 'ok' ? 'ok' : s.tone === 'crit' ? 'crit' : ''}">${esc(s.text)}</span>`);
    const pageCss = `<style>@page{@bottom-left{content:"${FORM.code} rev. ${FORM.rev} · ${NC}";font:8.5px Inter,system-ui,sans-serif;color:var(--muted)}@bottom-center{content:"Documento generado por Agentic Platform · demostración con datos sintéticos";font:8.5px Inter,system-ui,sans-serif;color:var(--muted)}@bottom-right{content:"Página " counter(page) " de " counter(pages);font:8.5px Inter,system-ui,sans-serif;color:var(--muted)}}</style>`;
    const dSections = planRows(st).map((x) => ({
      heading: `${x.d} · ${x.title}`,
      html: App.raw(`${x.lead ? `<p>${esc(x.lead)}</p>` : ''}${x.items && x.items.length ? `<ul>${x.items.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}${x.note ? `<p class="muted">${esc(x.note)}</p>` : ''}<p class="muted" style="margin-top:6px">Responsable: ${esc(x.owner.join(' · '))} · Fecha objetivo: ${esc(fmt.date(x.date))} · Estado: ${String(tag(x.status))}</p>`)
    }));
    const U = P.units;
    const H = R.history;
    const approvals = P.approvals.map((a) => ({
      paso: a.paso,
      rol: a.rol,
      fecha: a.kind === 'agent' ? fmt.date(st.analysis.at, { time: true }) : a.kind === 'reply' && r.decidedAt ? fmt.date(r.decidedAt, { time: true }) : '—',
      estado: a.kind === 'agent' ? { text: 'Completado', tone: 'ok' } : a.kind === 'reply' ? (approved ? { text: 'Aprobado', tone: 'ok' } : rejected ? { text: 'Rechazado', tone: 'neutral' } : { text: 'Pendiente', tone: 'warn' }) : { text: 'Pendiente', tone: 'warn' }
    }));
    const mono = (v) => App.raw(`<span class="code" style="white-space:nowrap">${esc(v)}</span>`);
    App.printableReport({
      title: P.title,
      subtitle: P.subtitle,
      kicker: 'Documento controlado · vista previa',
      code: FORM.code,
      filename: P.filename,
      meta: [['Revisión', FORM.rev], ['Registro', NC]].concat(P.meta, [['Estado', byStatus(P.state, st)]]),
      sections: [
        { heading: 'Resumen', html: App.raw(`${pageCss}${P.summary.map((p) => `<p>${esc(p)}</p>`).join('')}`) },
        ...dSections,
        { heading: P.trace_heading, table: { cols: [{ label: 'Etapa', key: 'etapa' }, { label: 'Fecha', key: 'fecha' }, { label: 'Detalle', key: 'detalle' }, { label: 'Referencia', render: (x) => mono(x.ref) }], rows: P.trace_rows } },
        { heading: U.heading, table: { cols: U.cols.map((c) => (c.mono ? { label: c.label, render: (x) => mono(x[c.key]) } : c.status ? { label: c.label, render: (x) => (approved && x[`${c.key}_after`]) || x[c.key] } : { label: c.label, key: c.key, num: c.num })), rows: U.rows } },
        { heading: P.history_heading, table: { cols: [{ label: H.col_id || 'Reclamación', render: (h) => App.raw(`<span class="code" style="white-space:nowrap">${esc(h.id)}</span><br><span class="muted">${esc(fmt.date(h.date))}</span>`) }, { label: H.col_product || 'Producto y lote', render: (h) => App.raw(`${esc(h.product)}<br><span class="code muted" style="white-space:nowrap">${esc(h.lot)}</span>`) }, { label: 'Motivo', key: 'description' }, { label: H.col_cause || 'Causa raíz', key: 'root_cause' }, { label: 'Registro', render: (h) => `${h.nc} · ${h.status}` }, { label: 'Relación', render: (h) => (h.similar ? App.raw('<span class="tag warn">Parecida</span>') : 'Distinta') }], rows: H.rows } },
        ...(r.draft ? [{ heading: L('Respuesta al cliente', 'Reply to the customer'), html: App.raw(`<p class="muted">${esc(L(`Versión ${r.version || 1} · borrador redactado por ${r.model || App.llm.model}${r.text ? ' y editado por la persona que aprueba' : ''}`, `Version ${r.version || 1} · draft written by ${r.model || App.llm.model}${r.text ? ' and edited by the approver' : ''}`))}</p><div style="white-space:pre-wrap">${esc(replyText(st))}</div>`) }] : []),
        { heading: 'Aprobaciones', table: { cols: [{ label: 'Paso', key: 'paso' }, { label: 'Rol', key: 'rol' }, { label: 'Fecha y hora', key: 'fecha' }, { label: 'Estado', render: (x) => tag(x.estado) }], rows: approvals } }
      ],
      signatures: [
        { role: R.approval.approver, note: approved ? `Aprobado el ${fmt.date(r.decidedAt, { time: true })}` : rejected ? `Rechazado el ${fmt.date(r.decidedAt, { time: true })}` : 'Pendiente de aprobación' },
        { role: P.second_signer.role, note: P.second_signer.note }
      ],
      footer: `Documento generado por Agentic Platform el ${fmt.date(App.nowISO(), { time: true })} · demostración con datos sintéticos · preparado por MFM`
    });
  }

  /* ---------------------------------------------------------------- Registro de la escena */

  function sceneState(state) { return (state.scenes && state.scenes.reclamacion) || {}; }
  const PR = R.presenter || {};

  App.scene({
    id: 'reclamacion',
    order: 40,
    section: R.section || 'Calidad',
    nav: R.nav,
    title: R.title,
    icon: 'mail',
    presenter: {
      say: (state) => {
        const st = sceneState(state);
        const r = st.reply || {};
        if (!st.analysis) return PR.idle || [];
        if (r.status === 'approved') return PR.approved || [];
        if (r.status === 'rejected') return PR.rejected || ['Rechazada: no se ha enviado ni aplicado nada. El motivo queda en auditoría.', 'Se puede preparar otra versión, editarla y volver a aprobar.'];
        return PR.pending || [];
      },
      next: (state) => {
        const st = sceneState(state);
        const r = st.reply || {};
        const N = PR.next || {};
        if (!st.analysis) return N.idle || 'Pulsar «Analizar reclamación» y leer en voz alta dos líneas del registro: el sistema consultado y lo que encuentra.';
        if (r.status === 'approved') return N.approved || `Pulsar «${R.report.button}» y enseñar la cabecera del documento.`;
        if (r.status === 'rejected') return 'Pulsar «Preparar nueva versión» y después «Aprobar y enviar».';
        return N.pending || 'Pulsar «Revisar y aprobar» (arriba) o bajar hasta la respuesta y pulsar «Aprobar y enviar».';
      }
    },
    render(root, ctx) {
      const st = ctx.local;
      root.innerHTML = String(html`<div class="rc-wrap">
        ${head(st)}
        ${paramNote(ctx)}
        ${runCard(st)}
        ${st.analysis
          ? html`<div class="grid cols-7-5 rc-split section" id="rc-extract"><div class="stack">${mailCard(st)}</div><div class="stack">${sheetCard(st)}${requestsCard(st)}</div></div>
          <div class="section">${traceCard(st)}</div>
          <div class="section">${historyCard()}</div>
          <div class="section">${planCard(st)}</div>
          <div class="grid cols-7-5 rc-split section" id="rc-reply"><div class="stack">${replyCard(st)}</div>${approvalBlock(st)}</div>
          <div class="section">${compareCard(st)}</div>`
          : html`<div class="grid cols-7-5 rc-split section" id="rc-extract">${mailCard(st)}${sheetCard(st)}</div>`}
      </div>`);
      const log = ctx.$('#rc-log');
      if (log && st.analysis) App.reasoningStream(log, logSteps(st), { title: `Agente ${AGENT}`, instant: true, start: st.analysis.startedAt || st.analysis.at, maxHeight: 420 });
      ctx.on('click', '[data-action="analyze"]', () => analyze(ctx));
      ctx.on('click', '[data-action="report"]', () => openReport(ctx));
      ctx.on('click', '[data-action="eml"]', () => downloadReply(ctx));
      ctx.on('click', '[data-action="eml-original"]', () => downloadOriginal());
      ctx.on('click', '[data-action="fix-lot"]', () => openLotFix());
      ctx.on('click', '[data-action="new-version"]', () => newVersion(ctx));
      ctx.on('click', '[data-action="scroll-reply"]', () => { const el = ctx.$('#rc-approval') || ctx.$('#rc-reply'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
      ctx.on('click', '[data-approval="approve"]', () => approve(ctx));
      ctx.on('click', '[data-approval="reject"]', () => reject(ctx));
      ctx.on('click', '[data-approval="edit"]', () => editReply(ctx));
    }
  });
})();
