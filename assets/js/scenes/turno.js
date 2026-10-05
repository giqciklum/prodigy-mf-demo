/*
 * Escena «turno» · Resumen del turno, común a todas las industrias.
 * Misma estructura que la demo de Congelados de Navarra: KPI, mapa de la operación, bandeja «Pendiente de
 * decisión» (alarma, reclamación y parte), serie de la alarma y parte diario que genera un agente.
 * Todo el contenido sale de CN_DATA.turno; render() es idempotente y reconstruye la vista desde ctx.local.
 */
(function () {
  'use strict';

  const { html, icon, fmt, chip, sys } = App;
  const D = window.CN_DATA;
  const T = D.turno;
  const P = T.parte;
  const AGENT = P.agent;
  const AGENT_ACTOR = `Agentic Platform · agente ${AGENT}`;

  const SEV = { critical: 0, warning: 1 };
  const machines = P.items.slice().sort((a, b) => {
    const sa = SEV[a.status] != null ? SEV[a.status] : 2;
    const sb = SEV[b.status] != null ? SEV[b.status] : 2;
    if (sa !== sb) return sa - sb;
    return (b.tag ? 1 : 0) - (a.tag ? 1 : 0);
  });
  const crit = machines.filter((m) => m.status === 'critical');
  const warn = machines.filter((m) => m.status === 'warning');
  const okm = machines.filter((m) => !m.status);
  const statusKey = (m) => (m.status === 'critical' ? 'critical' : m.status === 'warning' ? 'warning' : 'ok');
  const byEquipment = Object.fromEntries(P.news.concat(P.updates).map((t) => [t.equipment, t]));

  /* Workflow publicado en «De palabras a workflow» que responde a la alarma (contrato App.state.workflows). */
  function alarmWorkflow() {
    const re = new RegExp((D.workflow && D.workflow.alarmMatch) || '$^', 'i');
    const list = (App.state.workflows || []).slice().reverse();
    return list.find((w) => w && w.status !== 'draft' && (w.template === 'alarma' || re.test(`${w.name} ${(w.trigger && w.trigger.label) || ''}`))) || null;
  }
  function pendingCount(state) {
    const s = state || App.state;
    const parte = s.scenes && s.scenes.turno && s.scenes.turno.parte;
    return (s.outcomes.alarma ? 0 : 1) + (s.outcomes.reclamacion ? 0 : 1) + (parte ? 0 : 1);
  }

  /* ---------------------------------------------------------------- Piezas de la vista */

  function kpis() {
    return html`<div class="kpis">${T.kpis.map((k) => App.kpi(k))}</div>`;
  }

  function alarmItem() {
    const A = T.inbox.alarm;
    const wf = alarmWorkflow();
    const out = App.outcome('alarma');
    const wfLine = wf
      ? html`<div class="row mt-2">${chip({ tone: 'brand', icon: 'workflow', label: `Workflow «${wf.name}» ${wf.version || 'v1'} publicado` })}</div>`
      : html`<div class="row mt-2"><span class="muted small">Sin workflow de respuesta publicado.</span><button type="button" class="link-btn small" data-go="workflow">Crear workflow</button></div>`;
    return {
      icon: A.icon,
      tone: out ? (out.status === 'approved' ? 'ok' : '') : 'crit',
      done: !!out,
      title: A.title,
      meta: A.meta.concat((A.systems || []).map((s) => sys(s))),
      body: html`${A.body}${out ? html`<div class="row mt-2">${chip(out.status === 'approved' ? 'approved' : 'rejected', out.label || undefined)}</div>` : wfLine}`,
      side: html`${out ? '' : chip('critical')}<button type="button" class="btn btn-${wf && !out ? 'primary' : 'secondary'} btn-sm" data-go="alarma">${wf && !out ? 'Ejecutar workflow' : out ? 'Ver ejecución' : 'Revisar alarma'}${icon('arrow-right', 15)}</button>`
    };
  }

  function complaintItem() {
    const C = T.inbox.complaint;
    const out = App.outcome('reclamacion');
    return {
      icon: C.icon || 'mail',
      tone: out ? 'ok' : 'warn',
      done: !!out,
      title: C.title,
      meta: C.meta,
      body: html`${C.body}${C.trace ? html` ${App.lotTag(C.trace)}.` : ''}${C.after ? ` ${C.after}` : ''}${out ? html`<div class="row mt-2">${chip('resolved', out.label || undefined)}</div>` : ''}`,
      side: html`${out ? '' : chip('pending', C.due)}<button type="button" class="btn btn-secondary btn-sm" data-go="reclamacion">${C.goLabel || 'Abrir reclamación'}${icon('arrow-right', 15)}</button>`
    };
  }

  function parteItem(parte) {
    return {
      icon: 'activity',
      tone: parte ? 'ok' : 'crit',
      done: !!parte,
      title: P.inboxTitle,
      meta: [P.inboxCount].concat((P.systems || []).map((s) => sys(s))),
      body: parte
        ? `Generado a las ${fmt.time(parte.at)} en ${fmt.ms(parte.ms)}: ${P.news.length} tickets creados y ${P.updates.length} ${P.updates.length === 1 ? 'orden existente actualizada' : 'órdenes existentes actualizadas'}.`
        : P.inboxPending,
      side: parte
        ? html`${chip('done', 'Generado')}<button type="button" class="btn btn-secondary btn-sm" data-action="scroll-parte">Ver parte${icon('arrow-right', 15)}</button>`
        : html`${chip('critical', `${crit.length} críticos`)}<button type="button" class="btn btn-secondary btn-sm" data-action="generate">Generar parte</button>`
    };
  }

  function inboxCard(parte) {
    const n = pendingCount();
    return App.card({
      title: 'Pendiente de decisión',
      sub: n ? `${n} ${n === 1 ? 'asunto requiere' : 'asuntos requieren'} una decisión de ${T.decider}` : 'Sin asuntos pendientes en este turno',
      icon: 'inbox',
      flush: true,
      body: App.list([alarmItem(), complaintItem(), parteItem(parte)])
    });
  }

  function mapCard() {
    return App.card({
      id: 'mapa',
      title: T.map.title,
      sub: T.map.sub,
      icon: T.map.icon || 'factory',
      actions: chip({ tone: 'neutral', icon: 'eye', label: 'Solo lectura', title: T.map.readonly }),
      flush: true,
      body: html`<div id="ops-map-host"></div>`
    });
  }
  function mountMap(ctx) {
    const host = ctx.$('#ops-map-host');
    if (!host || typeof App.opsMap !== 'function') return;
    host.replaceChildren(App.opsMap({
      map: T.map,
      selected: ctx.local.mapSel || null,
      filter: ctx.local.mapFilter || 'all',
      onSelect: (code) => ctx.setLocal({ mapSel: code || null }),
      onFilter: (value) => ctx.setLocal({ mapFilter: value }),
      panelActions: (item) => (machines.some((m) => m.code === item.code)
        ? html`<button type="button" class="btn btn-secondary btn-sm" data-action="scroll-parte">${icon('list-checks', 15)}<span>Ver en el parte diario</span></button>`
        : '')
    }));
  }

  function chartCard() {
    const C = T.chart;
    const chart = App.lineChart(Object.assign({ height: 240, last: true }, C.chart));
    const events = App.timeline({ compact: true, items: C.events.map((e) => ({
      time: e.time,
      timeSub: e.end ? `a ${e.end}` : '',
      title: fmt.text(e.text),
      tone: e.tone || 'brand',
      meta: e.tag ? chip('neutral', e.tag, { dot: false }) : ''
    })) });
    return App.card({
      title: C.title,
      sub: C.sub,
      icon: C.icon || 'activity',
      iconTone: 'crit',
      flush: true,
      body: App.tabs({
        id: 'serie',
        flush: true,
        label: C.title,
        tabs: [
          { id: 'serie', label: C.tabLabel || 'Serie', body: chart },
          { id: 'eventos', label: 'Eventos', count: C.events.length, body: html`${events}${C.cause ? html`<div class="mt-4">${App.callout({ tone: 'warn', icon: 'wrench', title: 'Hipótesis de causa', body: fmt.text(C.cause) })}</div>` : ''}` }
        ]
      }),
      footer: html`<span class="muted small row">${sys(C.system)}<span>${C.footer}</span></span><span class="spacer"></span><button type="button" class="btn btn-secondary btn-sm" data-go="alarma">Abrir alarma${icon('arrow-right', 15)}</button>`
    });
  }

  function equipmentTable(parte, filter) {
    const cols = [
      { label: P.colItem || 'Equipo', width: '21%', render: (m) => html`<span class="strong">${m.name}</span>${m.tag ? html` ${chip('pcc', m.tag)}` : ''}<span class="sub">${m.area}</span>` },
      { label: 'Indicador', width: '14%', render: (m) => fmt.cap(m.metric) },
      { label: 'Lectura', width: '10%', render: (m) => html`<span class="strong nowrap ${m.status === 'critical' ? 't-crit' : m.status === 'warning' ? 't-warn' : ''}">${fmt.minus(m.reading)}</span>` },
      { label: 'Referencia', width: '17%', render: (m) => html`<span class="nowrap">${fmt.minus(m.baseline)}</span><span class="sub">${fmt.minus(m.limits || '')}</span>` },
      { label: 'Estado', width: '8%', render: (m) => chip(statusKey(m)) },
      { label: 'Observación', render: (m) => (m.note ? fmt.text(m.note) : html`<span class="muted">Sin incidencias</span>`) }
    ];
    if (parte) {
      cols.push({ label: 'Ticket', width: '11%', render: (m) => {
        const t = byEquipment[m.code];
        if (!t) return html`<span class="muted">—</span>`;
        return html`<span class="code">${t.id}</span><span class="sub">${t.kind === 'update' ? 'Actualizada' : 'Creado'}</span>`;
      } });
    }
    return App.table({
      cols,
      rows: machines,
      rowClass: (m) => (m.status === 'critical' ? 'tone-crit' : m.status === 'warning' ? 'tone-warn' : ''),
      rowAttrs: (m) => ({ 'data-status': statusKey(m), hidden: filter && filter !== 'all' && filter !== statusKey(m) ? true : null })
    });
  }

  function parteResult(parte) {
    const ticketCols = [
      { label: 'Ticket u orden', width: '14%', render: (t) => html`<span class="code strong">${t.id}</span><span class="sub">${t.kind === 'update' ? 'Orden existente' : 'Nuevo'}</span>` },
      { label: P.colItem || 'Equipo', width: '9%', render: (t) => html`<span class="code">${t.equipment}</span>` },
      { label: 'Prioridad', width: '13%', render: (t) => chip(t.tone === 'crit' ? 'critical' : 'warning', t.priority) },
      { label: 'Asignado a', width: '18%', render: (t) => t.owner },
      { label: 'Acción propuesta', render: (t) => fmt.minus(t.action) },
      { label: 'Estado', width: '10%', render: (t) => (t.kind === 'update' ? chip('updated') : chip('created')) }
    ];
    const tickets = P.news.map((t) => Object.assign({ kind: 'new' }, t)).concat(P.updates.map((t) => Object.assign({ kind: 'update' }, t)));
    return html`<div class="card-body stack" id="parte-result">
      <div class="row between">
        <div>
          <div class="h3">Parte generado a las ${fmt.time(parte.at)} en ${fmt.ms(parte.ms)}</div>
          <div class="muted small mt-1">${P.resultSummary}</div>
        </div>
        <div class="row">
          <button type="button" class="btn btn-secondary btn-sm" data-open-audit>${icon('history', 15)}<span>Ver en auditoría</span></button>
          <button type="button" class="btn btn-primary btn-sm" data-action="report">${icon('printer', 15)}<span>Descargar parte (PDF)</span></button>
        </div>
      </div>
      ${App.stats(P.stats)}
      ${P.relation ? App.callout({ tone: 'warn', icon: 'link', title: P.relation.title, body: html`<p>${P.relation.body}</p>${P.relation.more ? html`<p class="mt-2">${P.relation.more}</p>` : ''}`, actions: P.relation.go ? html`<button type="button" class="btn btn-secondary btn-sm" data-go="${P.relation.go}">${P.relation.goLabel}${icon('arrow-right', 15)}</button>` : '' }) : ''}
      <div class="card flat">${App.table({ cols: ticketCols, rows: tickets, rowClass: (t) => (t.tone === 'crit' ? 'tone-crit' : 'tone-warn') })}</div>
      <div class="row row-nowrap muted small" style="align-items:flex-start">${icon('shield-check', 16)}<span>${P.policy}</span></div>
      <details class="run-log">
        <summary>${icon('chevron-right', 16)}<span>Registro de ejecución · ${P.steps.length} pasos · ${fmt.ms(parte.ms)}</span></summary>
        <div class="mt-2" id="parte-log"></div>
      </details>
    </div>`;
  }

  function parteCard(parte, filter) {
    const counts = { all: machines.length, critical: crit.length, warning: warn.length, ok: okm.length };
    return App.card({
      id: 'parte',
      title: P.title,
      sub: P.sub,
      icon: 'activity',
      flush: true,
      actions: App.segmented({ name: 'parte-filtro', label: 'Filtrar por estado', value: filter || 'all', options: [
        { value: 'all', label: 'Todos', count: counts.all },
        { value: 'critical', label: 'Críticos', count: counts.critical, tone: 'crit' },
        { value: 'warning', label: 'Avisos', count: counts.warning, tone: 'warn' },
        { value: 'ok', label: 'OK', count: counts.ok, tone: 'ok' }
      ] }),
      body: html`<div class="card-body parte-run" id="parte-run" hidden></div>
        ${parte ? parteResult(parte) : ''}
        <div class="parte-table">${equipmentTable(parte, filter)}</div>`
    });
  }

  /* ---------------------------------------------------------------- Acciones */

  async function generate(ctx) {
    if (ctx.local.parte || ctx.vars.busy) return;
    ctx.vars.busy = true;
    App.audit('Parte diario solicitado', P.auditRequest);
    ctx.$$('[data-action="generate"]').forEach((b) => {
      b.disabled = true;
      b.classList.add('is-busy');
      b.innerHTML = String(html`<span class="spinner"></span><span>Generando parte…</span>`);
    });
    const host = ctx.$('#parte-run');
    host.hidden = false;
    host.scrollIntoView({ behavior: 'smooth', block: 'start' });
    ctx.presenter({ next: 'Mientras corre: «Mirad qué sistema toca cada paso y cuánto tarda». Si hace falta, pulsa «Acelerar».' });
    const startedAt = App.nowISO();
    const run = App.reasoningStream(host, P.steps, { title: `Agente ${AGENT}`, signal: ctx.signal, maxHeight: 380, start: startedAt });
    const res = await run.done;
    if (!ctx.alive()) return;
    ctx.vars.busy = false;
    ctx.setLocal({ parte: { at: App.nowISO(), startedAt, ms: res.ms } });
    App.audit('Parte diario generado', `${machines.length} elementos · ${crit.length} críticos · ${warn.length} avisos · ${fmt.ms(res.ms)}`, AGENT_ACTOR);
    P.news.forEach((t) => App.audit(P.auditNew || 'Ticket creado', `${t.id} · ${t.equipment} · ${t.priority} · ${t.owner}`, AGENT_ACTOR));
    P.updates.forEach((u) => App.audit(P.auditUpdate || 'Orden actualizada', `${u.id} · ${u.equipment} · ${u.priority}`, AGENT_ACTOR));
    if (P.channel) App.audit('Resumen publicado en Microsoft Teams', `Canal «${P.channel}»`, AGENT_ACTOR);
    App.outcome('parte', { status: 'done', label: `${P.news.length} tickets creados · ${P.updates.length} órdenes actualizadas` });
    App.toast(`Parte diario generado en ${fmt.ms(res.ms)} · ${P.news.length} tickets creados`, { tone: 'ok' });
    ctx.presenter(null);
    ctx.rerender();
    requestAnimationFrame(() => { const el = ctx.$('#parte-result'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  }

  function openReport(ctx) {
    const parte = ctx.local.parte;
    if (!parte) return;
    const row = (m) => ({ equipo: `${m.name}${m.tag ? ` (${m.tag})` : ''}`, area: m.area, lectura: fmt.minus(m.reading), ref: fmt.minus(m.baseline), nota: fmt.text(m.note || 'Sin incidencias') });
    const cols = [{ label: P.colItem || 'Equipo', key: 'equipo' }, { label: 'Área', key: 'area' }, { label: 'Lectura', key: 'lectura', num: true }, { label: 'Referencia', key: 'ref', num: true }, { label: 'Observación', key: 'nota' }];
    App.printableReport({
      title: P.reportTitle,
      subtitle: `${P.sub} · agente ${AGENT}`,
      code: P.reportCode,
      filename: P.reportCode.toLowerCase(),
      meta: P.reportMeta.concat([['Tickets creados', String(P.news.length)], ['Tiempo de generación', fmt.ms(parte.ms)]]),
      sections: [
        { heading: '1. Resumen', text: P.reportSummary },
        { heading: '2. Alertas críticas', table: { cols, rows: crit.map(row) } },
        { heading: '3. Avisos', table: { cols, rows: warn.map(row) } },
        { heading: '4. Sin incidencias', list: okm.map((m) => `${m.name} · ${fmt.minus(m.reading)} (referencia ${fmt.minus(m.baseline)})`) },
        { heading: '5. Tickets y órdenes', table: { cols: [{ label: 'Ticket u orden', key: 'id' }, { label: P.colItem || 'Equipo', key: 'equipment' }, { label: 'Prioridad', key: 'priority' }, { label: 'Asignado a', key: 'owner' }, { label: 'Acción propuesta', render: (t) => fmt.minus(t.action) }], rows: P.news.concat(P.updates) } },
        P.relation ? { heading: `6. ${P.relation.title}`, text: `${P.relation.plain || ''}` } : null,
        { heading: P.relation ? '7. Política aplicada' : '6. Política aplicada', text: P.policy }
      ].filter(Boolean),
      signatures: P.signatures
    });
  }

  function applyFilter(ctx, value) {
    ctx.setLocal({ filter: value });
    ctx.$$('.parte-table tbody tr[data-status]').forEach((tr) => { tr.hidden = value !== 'all' && tr.getAttribute('data-status') !== value; });
  }

  /* ---------------------------------------------------------------- Registro de la escena */

  App.scene({
    id: 'turno',
    order: 10,
    section: 'Operación',
    nav: T.nav || 'Resumen del turno',
    title: T.nav || 'Resumen del turno',
    icon: 'activity',
    badge: (state) => { const n = pendingCount(state); return n ? { text: String(n), tone: 'warn' } : null; },
    presenter: {
      say: (state) => {
        const parte = state.scenes.turno && state.scenes.turno.parte;
        return parte ? T.presenter.say.concat(T.presenter.sayAfter) : T.presenter.say.concat(T.presenter.sayBefore);
      },
      next: (state) => (state.scenes.turno && state.scenes.turno.parte ? T.presenter.nextAfter : T.presenter.next)
    },
    render(root, ctx) {
      const parte = ctx.local.parte || null;
      const filter = ctx.local.filter || 'all';
      const actions = parte
        ? html`<button type="button" class="btn btn-secondary" data-action="report">${icon('printer')}<span>Descargar parte (PDF)</span></button>`
        : html`<button type="button" class="btn btn-primary" data-action="generate">${icon('play')}<span>Generar parte diario</span></button>`;
      root.innerHTML = String(html`
        ${App.pageHead({
          title: T.title,
          meta: [
            { icon: 'calendar', text: `${fmt.cap(fmt.weekday(D.meta.today))} ${fmt.date(D.meta.today)}` },
            { icon: 'clock', text: `${T.clockLabel || 'Hora local'} ${App.clock()}` },
            { icon: 'user', text: D.meta.user_role }
          ],
          actions
        })}
        ${kpis()}
        <div class="section">${mapCard()}</div>
        <div class="grid cols-7-5 section">${inboxCard(parte)}${chartCard()}</div>
        <div class="section">${parteCard(parte, filter)}</div>
      `);
      mountMap(ctx);
      const log = ctx.$('#parte-log');
      if (log && parte) App.reasoningStream(log, P.steps, { title: `Agente ${AGENT}`, instant: true, start: parte.startedAt || parte.at, maxHeight: 420 });
      ctx.on('click', '[data-action="generate"]', () => generate(ctx));
      ctx.on('click', '[data-action="report"]', () => openReport(ctx));
      ctx.on('click', '[data-action="scroll-parte"]', () => { const el = ctx.$('#parte'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
      ctx.on('segchange', '[data-seg="parte-filtro"]', (e) => applyFilter(ctx, e.detail.value));
    }
  });
})();
