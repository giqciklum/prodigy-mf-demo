/*
 * Escena «alarma» · Alarma con aprobación humana, común a todas las industrias.
 * Misma estructura que la demo de Congelados de Navarra (alarma C-07):
 *  - Usa el workflow publicado en «De palabras a workflow» (App.state.workflows, template 'alarma' o nombre que
 *    case CN_DATA.workflow.alarmMatch). Si no hay ninguno, ejecuta el de respaldo (CN_DATA.alarma.backup) y lo dice.
 *    La condición (tramo continuo por encima del umbral durante más de N min) se evalúa de verdad sobre la serie.
 *  - Fase 1 (agentes), aprobación humana y fase 2 (aplicar). Rechazar no aplica nada.
 *  - La ejecución sigue aunque se cambie de vista o se recargue: al volver se muestra terminada.
 *  - Todo el contenido del sector sale de CN_DATA.alarma (textos fijos o funciones que reciben el contexto H).
 *    La escena es agnóstica de la unidad (°C, mm/s, %…): A.measure.unit.
 */
(function () {
  'use strict';

  const { html, icon, fmt, chip, sys } = App;
  const D = window.CN_DATA;
  const A = D && D.alarma;
  if (!A) return;
  const ROLE = D.roles || {};
  const M = A.measure;
  const S = A.scope;
  const L = S.labels;
  const TX = A.text;

  /* Modo Local/Prodigy: el modelo redacta el análisis de la propuesta para quien aprueba. La condición, el alcance
     y la aprobación siguen siendo deterministas; si el modelo falla, la propuesta preparada se mantiene. */
  const EN_UI = !!(window.CN_I18N && window.CN_I18N.english);
  const LTA = (es, en) => (EN_UI ? en : es);
  const plainA = (v) => String(v == null ? '' : v).replace(/<[^>]+>/g, ' ').replace(/[ \t]+/g, ' ').trim();
  let AI_PENDING = null;
  const useModel = () => !!(App.llm && App.llm.isLocal());
  async function askAnalysis(run, signal) {
    const H = ctxH(run);
    const AP = A.approval;
    const C = run.cond;
    const org = (D.meta && (D.meta.report_org || D.meta.company)) || '';
    const system = EN_UI
      ? `You are the agent that prepares alarm proposals in Agentic Platform for ${org}. With the facts given, write the analysis for the person who must approve: what happened, why it matters, what the agents propose and what happens if it is not approved. Use ONLY the facts given; do not invent figures, deadlines or names. A person makes the decision: do not say anything has already been applied. At most 5 sentences, in English, without a title.`
      : `Eres el agente que prepara las propuestas de alarma en Agentic Platform para ${org}. Con los datos que te doy, escribe el análisis para la persona que debe aprobar: qué ha pasado, por qué importa, qué proponen los agentes y qué ocurre si no se aprueba. Usa SOLO los datos facilitados; no inventes cifras, plazos ni nombres. La decisión la toma una persona: no digas que ya se ha aplicado nada. Máximo 5 frases, en español, sin título.`;
    const effects = (AP.effects(H) || []).map((e) => plainA(e && e.text != null ? e.text : e)).filter(Boolean);
    const facts = [
      `${LTA('Alarma', 'Alarm')}: ${A.alarm_id} · ${plainA(A.asset)} · ${A.alarm_time}`,
      `${LTA('Medida', 'Measure')}: ${plainA(M.short || M.col || '')} · ${LTA('umbral', 'threshold')} ${C.threshold} ${M.unit || ''} · ${C.above} min ${LTA('por encima', 'above')} (${C.start || '-'}–${C.end || LTA('en curso', 'ongoing')}) · ${LTA('crítico', 'critical')} ${critOf(C)} ${M.unit || ''}`,
      `Workflow: ${run.wf.name} ${run.wf.version || ''} · ${LTA('aprueba', 'approver')}: ${run.wf.approver}`,
      `${LTA('Alcance', 'Scope')}: ${plainA(TX.scope_short(H))}`,
      `${LTA('Propuesta', 'Proposal')}: ${plainA(AP.title(H))}. ${plainA(AP.summary(H))}`,
      effects.length ? `${LTA('Efectos si se aprueba', 'Effects if approved')}: ${effects.join('; ')}` : ''
    ].filter(Boolean);
    const r = await App.llm.chat({ system, user: facts.join('\n'), maxTokens: 500, temperature: 0.2, signal });
    return { text: plainA(r.text), model: r.model, ms: r.ms };
  }
  function analysisBlock(run) {
    const via = App.llm && App.llm.via ? App.llm.via() : { es: 'modelo', en: 'model' };
    if (run.llm && run.llm.error) return html`<div class="muted mt-4">${icon('alert-triangle', 15)} ${LTA(`El modelo no ha redactado el análisis (${run.llm.error}); se muestra la propuesta preparada.`, `The model did not write the analysis (${run.llm.error}); showing the prepared proposal.`)}</div>`;
    if (run.llm) return html`<div class="mt-4"><div class="strong">${icon('cpu', 15)} ${LTA('Análisis del agente', 'Agent analysis')} · ${run.llm.model} (${LTA(via.es, via.en)})</div><p class="mt-1" style="white-space:pre-line">${run.llm.text}</p></div>`;
    if (AI_PENDING === run.id) return html`<div class="al-wait mt-4"><span class="spinner"></span><span>${LTA('El modelo está redactando el análisis para quien aprueba…', 'The model is writing the analysis for the approver…')}</span></div>`;
    return '';
  }

  /* Hoja de estilos propia (enlazada en consola.html; si faltara, se añade aquí). */
  try {
    if (!document.querySelector('link[href$="scene-alarma.css"]')) {
      const l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = 'assets/css/scene-alarma.css';
      document.head.appendChild(l);
    }
  } catch (e) { /* sin DOM */ }

  /* ---------------------------------------------------------------- Utilidades */

  const sum = (arr, k) => arr.reduce((s, x) => s + (Number(typeof k === 'function' ? k(x) : x[k]) || 0), 0);
  const uniq = (arr) => Array.from(new Set(arr));
  const byWhen = (a, b) => `${a.date || ''} ${a.time || ''}`.localeCompare(`${b.date || ''} ${b.time || ''}`);
  const pad2 = (n) => String(n).padStart(2, '0');
  const iso = (ms) => { const d = new Date(ms); return `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}T${pad2(d.getUTCHours())}:${pad2(d.getUTCMinutes())}:${pad2(d.getUTCSeconds())}`; };
  /** Valor con su unidad: 7.8 → «7,8 mm/s» · −13.9 → «−13,9 °C» · 2.9 → «2,9 %» */
  const fv = (v) => {
    if (v == null || isNaN(Number(v))) return '—';
    const d = Number.isInteger(Number(v)) ? 0 : M.dec;
    return M.unit === '°C' ? fmt.temp(v, d) : `${fmt.num(v, d)}\u00a0${M.unit}`;
  };
  const DEC_OF = A.decider_of || `de ${A.decider_short}`;
  const pl = (n) => fmt.plural(n, S.unit[0], S.unit[1]);
  const fq = (q) => (q == null ? '' : S.qty_unit === '€' ? fmt.eur(q) : S.qty_unit === 'kg' ? fmt.kg(q) : `${fmt.num(q)} ${S.qty_unit}`);
  const hasTrace = (code) => !!(code && D.trace && D.trace[String(code).toUpperCase()]);
  const codeTag = (code) => (hasTrace(code) ? App.lotTag(code) : html`<span class="code">${code}</span>`);

  const series = A.series;
  const LIMIT = A.limit;
  const CRIT = A.critical;
  const MIN_HOLD = A.min_minutes;
  const LLM_COST_USD = A.llm_cost_usd != null ? A.llm_cost_usd : 0.04;

  /* ---------------------------------------------------------------- Alcance */

  const ITEMS = S.items.slice();
  const ITEM = Object.fromEntries(ITEMS.map((l) => [l.id, l]));
  const HOLD = (id) => Object.assign({ id }, S.holds[id] || {});
  const holdWhen = (h) => (!h.date || h.date === D.meta.today ? (h.time || '') : `${fmt.dayMonth(h.date)} ${h.time || ''}`.trim());
  const ELSE = ITEMS.flatMap((l) => (l.elsewhere || []).map((b) => Object.assign({ item: l.id, title: l.title }, b)))
    .sort((a, b) => String(a.loc).localeCompare(String(b.loc)));
  const GONE = ITEMS.flatMap((l) => (l.gone || []).map((s) => Object.assign({ item: l.id, title: l.title }, s))).sort(byWhen);
  const GONE_TOTAL = sum(GONE, 'count');
  const UNITS = S.units || null;

  function scopeOf(excluded) {
    const ex = new Set(excluded || []);
    const items = ITEMS.filter((l) => !ex.has(l.id));
    const out = ITEMS.filter((l) => ex.has(l.id));
    const holds = uniq(items.map((l) => l.hold).filter(Boolean)).map(HOLD).sort(byWhen);
    const elsewhere = ELSE.filter((s) => !ex.has(s.item));
    return {
      items, out, holds, elsewhere,
      count: sum(items, 'count'),
      qty: sum(items, 'qty'),
      value: sum(items, 'value'),
      exCount: sum(out, 'count'),
      elseTotal: sum(elsewhere, 'count'),
      units: UNITS ? UNITS.filter((u) => !ex.has(u.item)) : null
    };
  }
  const ALL = scopeOf([]);
  const FIRST = ALL.holds[0] || { id: '—', time: '—' };
  const holdCount = (sc, h) => sum(sc.items.filter((l) => l.hold === h.id), 'count');

  /* ---------------------------------------------------------------- Workflow y condición */

  const BACKUP = Object.assign({ id: 'wf-alarma-respaldo', version: 'v1', threshold: LIMIT, minutes: MIN_HOLD, critical: CRIT, approver: ROLE.quality_shift }, A.backup, { backup: true, publishedAt: null });

  function alarmWorkflow() {
    let re = null;
    try { re = D.workflow && D.workflow.alarmMatch ? new RegExp(D.workflow.alarmMatch, 'i') : null; } catch (e) { re = null; }
    const list = (App.state.workflows || []).slice().reverse();
    return list.find((w) => w && w.status !== 'draft' && (w.template === 'alarma'
      || (re && re.test([w.name, w.trigger && (w.trigger.type || w.trigger.label || w.trigger.text)].filter(Boolean).join(' '))))) || null;
  }
  function num(v, d) {
    if (v == null || v === '') return d;
    if (typeof v === 'number') return Number.isFinite(v) ? v : d;
    const n = Number(String(v).replace('−', '-').replace(',', '.').replace(/[^\d.+-]/g, ''));
    return Number.isFinite(n) ? n : d;
  }
  function currentWorkflow() {
    const w = alarmWorkflow();
    if (!w) return Object.assign({}, BACKUP);
    const tr = w.trigger || {};
    const p = w.params || {};
    const first = (...vals) => vals.find((v) => v != null && v !== '');
    const who = (a) => (a && typeof a === 'object' ? (a.role || a.label || a.name) : a);
    return {
      id: w.id || 'wf-alarma',
      name: w.name || BACKUP.name,
      version: w.version || 'v1',
      backup: false,
      threshold: num(first(p.threshold, p.umbral, tr.threshold, tr.value), LIMIT),
      minutes: num(first(p.minutes, p.minutos, tr.minutes, tr.duration), MIN_HOLD),
      critical: num(first(p.critical, p.critico, tr.critical), CRIT),
      approver: who(first(w.approver, p.approver, p.aprobador)) || BACKUP.approver,
      publishedAt: w.publishedAt || null
    };
  }
  /* Tramo continuo más largo con la variable por encima de T (lecturas cada A.interval_min minutos). */
  function evaluate(T, Mn) {
    let best = null;
    let cur = null;
    const longer = (a, b) => !b || (a.i1 - a.i0) > (b.i1 - b.i0);
    series.forEach((p, i) => {
      if (p.value > T) { if (cur) cur.i1 = i; else cur = { i0: i, i1: i }; } else if (cur) { cur.end = p.time; if (longer(cur, best)) best = cur; cur = null; }
    });
    if (cur) { cur.end = null; cur.open = true; if (longer(cur, best)) best = cur; }
    const above = best ? (best.i1 - best.i0 + 1) * A.interval_min : 0;
    return { threshold: T, minutes: Mn, above, start: best ? series[best.i0].time : null, end: best ? (best.end || series[best.i1].time) : null, open: !!(best && best.open), met: above > Mn };
  }
  const CRIT_MIN = evaluate(CRIT, 0).above;
  function condOf(wf) {
    const critical = wf.critical != null ? wf.critical : CRIT;
    return Object.assign(evaluate(wf.threshold, wf.minutes), { critical, critAbove: evaluate(critical, 0).above });
  }
  const critOf = (C) => (C && C.critical != null ? C.critical : CRIT);
  const critMinOf = (C) => (C && C.critAbove != null ? C.critAbove : CRIT_MIN);
  const span = (C) => (C.open ? `desde las ${C.start}, en curso` : `${C.start}–${C.end}`);

  /* Contexto que reciben las funciones de CN_DATA.alarma. */
  function ctxH(run) {
    const r = run || { wf: currentWorkflow(), excluded: [] };
    const W = r.wf;
    const C = r.cond || condOf(W);
    return {
      A, D, R: ROLE, fmt, fv, pl, fq, run: r, W, C, sc: scopeOf(r.excluded), all: ALL, first: FIRST,
      ids: r.ids || {}, crit: critOf(C), critMin: critMinOf(C), span: span(C), holdWhen, holdCount,
      decision: r.decision || null, gone: GONE, goneTotal: GONE_TOTAL, elsewhere: ELSE
    };
  }

  /* ---------------------------------------------------------------- Agentes, pasos y auditoría */

  const LANES = A.lanes;
  const LANE = Object.fromEntries(LANES.map((l) => [l.id, l]));
  const P1 = LANES.filter((l) => l.phase !== 2);
  const P2 = LANES.filter((l) => l.phase === 2);
  const PROPOSER = A.proposer || (P2[0] && P2[0].id);
  const MON = P1[0].id;
  const ORCH = 'Orquestador';
  const ACTOR_ORCH = 'Agentic Platform · orquestador';
  const actorOf = (s) => (s.lane ? `Agentic Platform · agente ${LANE[s.lane].name}` : ACTOR_ORCH);
  const SYSTEMS_ALL = uniq(LANES.flatMap((l) => l.systems));

  function decorate(steps) {
    return steps.map((s) => Object.assign({ agent: s.lane ? LANE[s.lane].name : ORCH, node: s.lane || undefined }, s));
  }

  function triggerStep(H) {
    const W = H.W;
    return { agent: ORCH, node: 't', system: 'Agentic Platform', action: `Recibe la alarma ${A.alarm_id} (${A.asset}, ${A.alarm_time}) y arranca el workflow «${W.name}» ${W.version}`, result: `Disparador: ${M.short} por encima de ${fv(W.threshold)} durante más de ${W.minutes} min · aprueba ${W.approver}`, ms: 180, wait: 1800 };
  }
  function evalStep(H, base, met) {
    const W = H.W;
    const C = H.C;
    const action = `Evalúa la condición del workflow: ${M.short} por encima de ${fv(W.threshold)} durante más de ${W.minutes} min`;
    if (met) {
      return Object.assign({}, base, {
        verb: 'Evaluando', action,
        result: `Se cumple: ${C.above} min por encima (${span(C)}); ${critMinOf(C)} min por encima de ${fv(critOf(C))}; pico de ${fv(A.peak)} a las ${A.peak_time}`,
        tone: 'crit', ms: base.ms || 90, wait: 2200,
        set: { result: `${fmt.cap(A.excursion_noun)} confirmada: ${C.above} min por encima de ${fv(W.threshold)}` },
        milestone: 'mon',
        audit: { action: `${fmt.cap(A.excursion_noun)} confirmada`, detail: `${A.asset} · ${C.above} min por encima de ${fv(C.threshold)} (${span(C)}) · pico de ${fv(A.peak)} a las ${A.peak_time}` }
      });
    }
    const why = C.above
      ? `No se cumple: ${C.above} min por encima de ${fv(W.threshold)} (${span(C)}); el workflow pide más de ${W.minutes} min`
      : `No se cumple: ${M.short} no supera ${fv(W.threshold)} (pico de ${fv(A.peak)} a las ${A.peak_time})`;
    return Object.assign({}, base, {
      verb: 'Evaluando', action, result: why, tone: 'warn', ms: base.ms || 90, wait: 2200,
      set: { result: 'Condición del workflow no cumplida' },
      milestone: 'notrig',
      audit: { action: 'Condición del workflow no cumplida', detail: `${C.above} min por encima de ${fv(C.threshold)}; el workflow pide más de ${C.minutes} min · ${TX.no_proposal}` }
    });
  }

  function p1Steps(run) {
    const H = ctxH(run);
    const raw = A.steps.p1(H).map((s) => (s.eval ? evalStep(H, s, true) : s));
    return decorate([triggerStep(H)].concat(raw));
  }
  function noTrigSteps(run) {
    const H = ctxH(run);
    const raw = A.steps.p1(H);
    const k = raw.findIndex((s) => s.eval);
    const head = raw.slice(0, k).concat([evalStep(H, raw[k], false)]);
    return decorate([triggerStep(H)].concat(head, [{ agent: ORCH, system: 'Agentic Platform', action: `Detiene la ejecución sin ${TX.stop_without}`, result: `Sin cambios en ${A.untouched}`, ms: 40, wait: 1400 }]));
  }
  function decisionSteps(run) {
    const d = run.decision;
    if (!d) return [];
    const H = ctxH(run);
    if (d.status === 'approved') {
      return [{ agent: d.by, human: true, system: 'Agentic Platform', action: `${run.excluded && run.excluded.length ? `${TX.approve_action} con el alcance editado` : TX.approve_action}: ${TX.scope_short(H)}`, result: `Aprobado a las ${fmt.time(d.at, true)}`, tone: 'ok', ms: d.waitMs }];
    }
    return [
      { agent: d.by, human: true, system: 'Agentic Platform', action: `Rechaza la propuesta · motivo: «${d.reason}»`, result: 'No se aplica ninguna acción', ms: d.waitMs },
      { agent: ORCH, system: 'Agentic Platform', action: 'Detiene la ejecución', result: `Sin cambios en ${A.untouched}`, ms: 40 }
    ];
  }
  function p2Steps(run, calls) {
    const H = ctxH(run);
    return decorate(A.steps.p2(H).concat([{
      agent: ORCH, system: 'Agentic Platform', action: `Cierra la ejecución y guarda el ${A.report.noun}`,
      result: `${calls != null ? calls : CALLS.total} llamadas a sistemas y al modelo de lenguaje · coste estimado ${fmt.usd(LLM_COST_USD)}`,
      ms: 120, wait: 1600, milestone: 'end',
      audit: { action: 'Ejecución del workflow completada', detail: `${run.id} · ${calls != null ? calls : CALLS.total} llamadas · coste estimado ${fmt.usd(LLM_COST_USD)}` }
    }]));
  }
  function stepsFor(run) {
    if (!run) return [];
    if (!run.cond.met) return noTrigSteps(run);
    const s = p1Steps(run);
    if (!run.decision) return s;
    const d = decisionSteps(run);
    return run.decision.status === 'approved' ? s.concat(d, p2Steps(run)) : s.concat(d);
  }
  const FAKE_IDS = Object.fromEntries((A.ids || []).map((x) => [x.key, `${x.prefix}0000`]));
  const CALLS = (() => {
    const fake = { id: 'EJE', wf: BACKUP, cond: condOf(BACKUP), excluded: [], ids: FAKE_IDS };
    const all = p1Steps(fake).concat(p2Steps(fake, 0));
    return { total: all.filter((s) => s.system !== 'Agentic Platform').length, llm: all.filter((s) => s.system === 'Modelo de lenguaje').length, auto: all.length };
  })();

  function logStep(ctx, s) {
    const run = ctx.local.run;
    if (!run || !s.milestone || !s.audit || (run.logged && run.logged[s.milestone])) return;
    App.audit(s.audit.action, s.audit.detail, actorOf(s));
    ctx.setLocal({ run: Object.assign({}, ctx.local.run, { logged: Object.assign({}, ctx.local.run.logged, { [s.milestone]: true }) }) });
  }

  /* ---------------------------------------------------------------- Progreso: carriles y grafo */

  function laneState(run, steps, done, running) {
    const waitingNow = run && run.cond.met && !run.decision && done >= p1Steps(run).length;
    return LANES.map((Ln) => {
      const idx = [];
      steps.forEach((s, i) => { if (s.lane === Ln.id) idx.push(i); });
      const completed = idx.filter((i) => i < done);
      const st = { id: Ln.id, lat: sum(completed.map((i) => steps[i]), 'ms'), count: completed.length, volume: null, result: null, system: null, status: 'idle' };
      completed.forEach((i) => { const set = steps[i].set || {}; if (set.volume) st.volume = set.volume; if (set.result) st.result = set.result; });
      if (idx.includes(running)) { st.status = 'active'; st.system = steps[running].system; st.verb = steps[running].verb || 'Consultando'; } else if (completed.length) st.status = completed.length === idx.length ? 'done' : 'active';
      if (!run) return st;
      if (Ln.id === PROPOSER && waitingNow) st.status = 'waiting';
      if (run.decision && run.decision.status === 'rejected' && Ln.phase === 2) st.status = Ln.id === PROPOSER ? 'stopped' : 'skipped';
      if (!run.cond.met && Ln.id !== MON) st.status = 'skipped';
      return st;
    });
  }

  const NODES = [MON].concat(P1.slice(1).map((l) => l.id), ['apr'], P2.map((l) => l.id));
  function graphStatus(run, steps, done, running) {
    const st = { t: 'done' };
    NODES.forEach((n) => { st[n] = 'pending'; });
    if (!run) return st;
    NODES.forEach((n) => {
      const idx = [];
      steps.forEach((s, i) => { if (s.node === n) idx.push(i); });
      if (!idx.length) return;
      if (idx.includes(running)) st[n] = 'active';
      else if (idx.every((i) => i < done)) st[n] = 'done';
      else if (idx.some((i) => i < done)) st[n] = 'active';
    });
    if (run.cond.met && !run.decision && done >= p1Steps(run).length) st.apr = 'waiting';
    if (run.decision && run.decision.status === 'approved') st.apr = 'done';
    if (run.decision && run.decision.status === 'rejected') { st.apr = 'rejected'; P2.forEach((l) => { st[l.id] = 'skipped'; }); }
    if (!run.cond.met) NODES.forEach((n) => { if (n !== MON) st[n] = 'skipped'; });
    if (run.status === 'running' && running === 0) st[MON] = 'active';
    return st;
  }

  const LANE_CHIP = {
    idle: () => chip('neutral', 'En espera'),
    done: () => chip('ok', 'Listo'),
    waiting: () => chip('waiting', 'Esperando aprobación'),
    skipped: () => chip('neutral', 'No se ejecuta'),
    stopped: () => chip('neutral', 'Detenido')
  };

  function lanesHTML(run, steps, done, running) {
    const states = laneState(run, steps, done, running);
    return html`${LANES.map((Ln, i) => {
      const st = states[i];
      const used = uniq(Ln.systems.concat(steps.filter((s) => s.lane === Ln.id && s.system !== 'Agentic Platform').map((s) => s.system)));
      const status = st.status === 'active' ? chip('running', st.verb || 'Consultando') : LANE_CHIP[st.status]();
      let result = st.result || (st.status === 'idle' ? Ln.idle : '');
      if (st.status === 'skipped') result = run && !run.cond.met ? 'No se ejecuta: la condición del workflow no se cumple' : 'No se ejecuta tras el rechazo';
      if (st.status === 'stopped') result = 'Propuesta rechazada: no se aplica nada';
      return html`<li class="al-lane is-${st.status}" data-lane="${Ln.id}">
        <span class="al-lane-icon">${icon(Ln.icon, 18)}</span>
        <div class="al-lane-main">
          <div class="al-lane-top"><span class="al-lane-name">${Ln.name}</span>${status}</div>
          <div class="al-lane-sys">${used.map((n) => html`<span class="al-sysw${st.status === 'active' && st.system === n ? ' is-on' : ''}">${sys(n)}</span>`)}</div>
          ${st.count || st.volume ? html`<div class="al-lane-meta"><span>${st.volume || '—'}</span><span class="lat">${st.count ? `${fmt.plural(st.count, 'paso', 'pasos')} · latencia ${fmt.ms(st.lat)}` : ''}</span></div>` : ''}
          ${result ? html`<div class="al-lane-result">${icon(st.status === 'waiting' ? 'user-check' : 'arrow-right', 13)}<span>${result}</span></div>` : ''}
        </div>
      </li>`;
    })}`;
  }

  function execChip(run, steps, done) {
    if (!run) return chip('neutral', 'Sin ejecutar');
    if (run.status === 'running') return done >= steps.length && run.cond.met ? chip('waiting') : chip('running', 'En curso');
    if (run.status === 'waiting') return chip('waiting');
    if (run.status === 'applying') return chip('running', 'Aplicando');
    if (run.status === 'done') return chip('done', 'Completada');
    if (run.status === 'rejected') return chip('rejected', 'Detenida · propuesta rechazada');
    return chip('neutral', 'Detenida · condición no cumplida');
  }

  function paint(ctx, run, steps, done, running) {
    const lanes = ctx.$('#al-lanes');
    if (lanes) lanes.innerHTML = String(lanesHTML(run, steps, done, running));
    App.planGraph.set(ctx.root, graphStatus(run, steps, done, running));
    const st = ctx.$('#al-exec-state');
    if (st) st.innerHTML = String(execChip(run, steps, done));
  }

  /* ---------------------------------------------------------------- Piezas de la vista */

  function itemState(run, id) {
    if (!run || !run.decision) return (run && run.excluded && run.excluded.includes(id)) ? 'out' : 'exposed';
    if (run.excluded && run.excluded.includes(id)) return 'out';
    return run.decision.status === 'approved' ? 'blocked' : 'unblocked';
  }
  const ITEM_CHIP = {
    exposed: () => chip('critical', L.exposed || 'Expuesto'),
    blocked: () => chip('blocked', L.blocked || 'Bloqueado'),
    out: () => chip('neutral', 'Fuera del alcance'),
    unblocked: () => chip('neutral', L.unblocked || 'Sin bloqueo')
  };

  function head(run, wf) {
    const st = run ? run.status : 'idle';
    let actions;
    if (st === 'running' || st === 'applying') actions = html`<button type="button" class="btn btn-primary is-busy" disabled><span class="spinner"></span><span>${st === 'running' ? 'Ejecutando…' : 'Aplicando…'}</span></button>`;
    else if (st === 'waiting') actions = html`<button type="button" class="btn btn-primary" data-action="scroll-approval">${icon('user-check')}<span>Revisar la propuesta</span></button>`;
    else if (st === 'done') actions = html`<button type="button" class="btn btn-secondary" data-open-audit>${icon('history')}<span>Ver en auditoría</span></button><button type="button" class="btn btn-primary" data-action="report">${icon('printer')}<span>Descargar ${A.report.noun}</span></button>`;
    else actions = html`<button type="button" class="btn btn-primary" data-action="execute">${icon('play')}<span>${st === 'idle' ? (wf.backup ? 'Ejecutar workflow de respaldo' : 'Ejecutar workflow') : 'Volver a ejecutar'}</span></button>`;
    return App.pageHead({
      title: A.page_title,
      meta: [
        { icon: 'bell', text: `Alarma ${A.alarm_id} · ${fmt.date(D.meta.today, A.alarm_time)}` },
        { icon: 'map-pin', text: A.location },
        { icon: 'user-check', text: `Aprueba: ${wf.approver}` }
      ],
      actions
    });
  }

  function kpis(wf, cond, run) {
    const H = ctxH(run || { wf, cond, excluded: [] });
    const held = !!(run && run.decision && run.decision.status === 'approved' && scopeOf(run.excluded).holds.some((x) => x.id === FIRST.id));
    const k = A.kpis(H, held);
    return html`<div class="kpis">
      ${App.kpi({ label: `Pico de ${M.short}`, value: fv(A.peak), sub: `A las ${A.peak_time} · ${critMinOf(cond)} min por encima de ${fv(critOf(cond))}`, icon: M.icon, tone: 'crit' })}
      ${App.kpi({ label: `Tiempo por encima de ${fv(wf.threshold)}`, value: cond.above ? `${cond.above} min` : '0 min', sub: cond.above ? `${span(cond)} · el workflow actúa a partir de ${wf.minutes} min` : `El workflow actúa a partir de ${wf.minutes} min`, icon: 'clock', tone: cond.met ? 'warn' : undefined })}
      ${k.map((x) => App.kpi(x))}
    </div>`;
  }

  function workflowBlock(wf, run) {
    if (wf.backup) {
      return html`<div class="al-wf">
        <div class="al-wf-label">Workflow que responde</div>
        ${App.callout({
          tone: 'brand',
          icon: 'workflow',
          title: run ? `Se ha ejecutado el workflow de respaldo «${wf.name}» ${wf.version}` : `Se ejecutará el workflow de respaldo «${wf.name}» ${wf.version}`,
          body: html`No se ha publicado ningún workflow de ${A.workflow_topic} en esta sesión, así que Agentic Platform usa el de respaldo, configurado con los parámetros de ${A.policy_ref}: ${M.short} por encima de ${fv(LIMIT)} durante más de ${MIN_HOLD} min y aprobación de ${BACKUP.approver}.`,
          actions: html`<button type="button" class="btn btn-secondary btn-sm" data-go="workflow">${icon('workflow', 15)}<span>Crear el workflow desde el procedimiento</span></button>`
        })}
      </div>`;
    }
    return html`<div class="al-wf">
      <div class="al-wf-label">Workflow que responde</div>
      <div class="al-wf-head"><span class="al-wf-name">${wf.name}</span>${chip({ tone: 'brand', icon: 'git-branch', label: `${wf.version} · publicado` })}</div>
      ${App.kv([
        ['Origen', `«De palabras a workflow»${wf.publishedAt ? `, publicado a las ${fmt.time(wf.publishedAt)}` : ''}`],
        ['Disparador', `${A.source_system} · ${M.short} por encima de ${fv(wf.threshold)} durante más de ${wf.minutes} min`],
        ['Agentes', `${LANES.length} · ${fmt.list(LANES.map((l) => l.short || l.name))}`],
        ['Aprobación', wf.approver]
      ])}
    </div>`;
  }

  function eventCard(wf, run) {
    return App.card({
      title: `Alarma ${A.alarm_id}`,
      sub: `Recibida de ${A.source_system} el ${fmt.date(D.meta.today)} a las ${A.alarm_time}`,
      icon: 'bell',
      iconTone: 'crit',
      body: html`${App.kv(A.event_kv.concat([
        ['Consigna y límites', `${A.setpoint != null ? `${A.setpoint_label || 'consigna'} ${fv(A.setpoint)} · ` : ''}límite ${fv(LIMIT)} · crítico ${fv(CRIT)}`],
        ['Ahora', `${fv(A.current)} a las ${A.current_time}${A.current_note ? ` · ${A.current_note}` : ''}`],
        ['Procedimientos', A.procedures]
      ]))}${workflowBlock(wf, run)}`
    });
  }

  function chartCard(wf, cond) {
    const bands = A.events.filter((e) => e.end && e.band).map((e) => ({ from: e.time, to: e.end, tone: e.bandTone, label: e.band }));
    const T = wf.threshold;
    const K = critOf(cond);
    const chart = App.lineChart({
      series,
      unit: M.unit,
      threshold: { value: T, label: `Límite ${fv(T)}`, legend: `Límite del workflow ${fv(T)} · ${cond.above} min por encima` },
      critical: T !== K ? { value: K, label: `Crítico ${fv(K)}`, legend: `Crítico ${fv(K)} · ${critMinOf(cond)} min por encima` } : null,
      peak: { x: A.peak_time, y: A.peak, label: `${fv(A.peak)} · ${A.peak_time}` },
      last: { label: `${fv(series[series.length - 1].value)} · ${series[series.length - 1].time}` },
      yTicks: A.chart.yTicks,
      xTicks: A.chart.xTicks,
      annotations: [{ x: A.alarm_time, label: `Alarma ${A.alarm_time}` }],
      bands,
      height: 250,
      seriesLabel: A.chart.series_label,
      shadeLabel: cond.above ? `${fmt.cap(A.excursion_noun)} ${span(cond)}` : 'Por encima del límite'
    });
    const toneOf = (e) => e.tone || 'brand';
    const events = App.timeline({ compact: true, items: A.events.map((e) => ({
      time: e.time, timeSub: e.end ? `a ${e.end}` : '', title: fmt.text(e.text), tone: toneOf(e),
      meta: e.equipment ? chip('neutral', e.equipment, { dot: false }) : (e.ref ? chip('neutral', e.ref, { dot: false }) : '')
    })) });
    const readings = html`<div class="al-readings">${App.table({ dense: true, stack: false, rows: series, cols: [
      { label: 'Hora', render: (p) => html`<span class="code">${p.time}</span>` },
      { label: M.col, num: true, render: (p) => html`<span class="${p.value > K ? 't-crit strong' : p.value > T ? 't-warn strong' : ''}">${fv(p.value)}</span>` },
      { label: 'Estado', render: (p) => (p.value > K ? chip('critical', 'Crítico') : p.value > T ? chip('warning', fmt.cap(A.excursion_noun)) : chip('ok', 'En rango')) }
    ] })}</div>`;
    return App.card({
      title: A.chart.title,
      sub: A.chart.sub,
      icon: M.icon,
      iconTone: 'crit',
      flush: true,
      body: App.tabs({ id: 'al-chart', flush: true, label: A.chart.title, tabs: [
        { id: 'serie', label: A.chart.tab, body: chart },
        { id: 'eventos', label: 'Eventos', count: A.events.length, body: html`${events}<div class="mt-4">${App.callout({ tone: 'warn', icon: 'wrench', title: 'Hipótesis de causa', body: fmt.text(A.probable_cause) })}</div>` },
        { id: 'lecturas', label: 'Lecturas', count: series.length, body: readings }
      ] }),
      footer: html`<span class="muted small row">${sys(A.source_system)}<span>${series.length} lecturas de ${series[0].time} a ${series[series.length - 1].time}</span></span>`
    });
  }

  function graphHTML(run, wf, steps, prog) {
    const nodes = [{ id: 't', kind: 'trigger', label: `${fmt.cap(M.short)} > ${fv(wf.threshold)} más de ${wf.minutes} min`, sub: `Alarma ${A.alarm_id}`, systems: [A.source_system], icon: 'bell' }]
      .concat(P1.map((l) => ({ id: l.id, label: l.name, sub: l.gsub, systems: l.gsys || l.systems, icon: l.icon })))
      .concat([{ id: 'apr', kind: 'approval', label: A.approval_node, sub: 'propuesta con motivo', icon: 'user-check' }])
      .concat(P2.map((l) => ({ id: l.id, label: l.name, sub: l.gsub, systems: l.gsys || l.systems, icon: l.icon })));
    const chain = ['t'].concat(P1.map((l) => l.id), ['apr']);
    const base = chain.slice(1).map((n, i) => [chain[i], n]);
    const wide = base.concat(P2.map((l) => ['apr', l.id]));
    const p2c = ['apr'].concat(P2.map((l) => l.id));
    const narrow = base.concat(p2c.slice(1).map((n, i) => [p2c[i], n]));
    const status = graphStatus(run, steps, prog.done, prog.running);
    const title = `Workflow ${wf.name}`;
    return html`<div class="al-graph-wide">${App.planGraph({ id: 'al-graph', title, nodes, status, edges: wide })}</div>
      <div class="al-graph-narrow">${App.planGraph({ title, nodes, status, layout: 'tb', nodeWidthTB: 270, edges: narrow })}</div>`;
  }

  function roomHTML(run, steps, prog) {
    return html`<div class="al-room" id="al-room">
      <div class="al-room-head"><span class="al-room-title">Sala de agentes</span><span class="al-room-sub">${LANES.length} agentes · ${SYSTEMS_ALL.length} sistemas</span></div>
      <ol class="al-lanes" id="al-lanes">${lanesHTML(run, steps, prog.done, prog.running)}</ol>
    </div>`;
  }

  function execCard(run, wf, steps, prog) {
    const idleLog = html`<div class="rs al-log-idle">
      <div class="rs-head"><span>${chip('neutral', 'Sin ejecutar')}</span><span class="rs-title">Registro de ejecución</span></div>
      <div class="al-idle">
        <p>Cada llamada de los agentes aparecerá aquí con su sistema, el resultado y la latencia. ${TX.idle_log}</p>
        <button type="button" class="btn btn-primary" data-action="execute">${icon('play')}<span>${wf.backup ? 'Ejecutar workflow de respaldo' : 'Ejecutar workflow'}</span></button>
      </div>
    </div>`;
    return App.card({
      id: 'al-exec',
      title: `Ejecución · ${wf.name}`,
      sub: `${wf.version}${wf.backup ? ' · workflow de respaldo' : ' · publicado en esta sesión'} · disparador ${A.alarm_id}${run ? ` · ${run.id}` : ''}`,
      icon: 'workflow',
      actions: html`<span id="al-exec-state">${execChip(run, steps, prog.done)}</span>`,
      flush: true,
      body: html`<div class="card-body">${graphHTML(run, wf, steps, prog)}</div>
        <div class="card-body"><div class="grid cols-5-7 al-exec-grid">${roomHTML(run, steps, prog)}<div id="al-log">${run ? '' : idleLog}</div></div></div>`
    });
  }

  function itemsCard(run) {
    const sc = scopeOf(run.excluded);
    const cols = [
      { label: L.item_col, width: '27%', render: (l) => (l.trace && l.trace !== l.id
        ? html`<span class="code strong">${l.id}</span><span class="sub">${l.title}${l.sub ? ` · ${l.sub}` : ''}</span><span class="sub">${codeTag(l.trace)}</span>`
        : html`${codeTag(l.id)}<span class="sub">${l.title}${l.sub ? ` · ${l.sub}` : ''}</span>`) },
      { label: L.at_col, width: '15%', render: (l) => html`<span class="strong">${pl(l.count)}</span><span class="sub">${l.group}${l.qty != null ? ` · ${fq(l.qty)}` : ''}</span>` },
      { label: L.hold_col, render: (l) => { if (!l.hold) return html`<span class="muted">—</span>`; const h = HOLD(l.hold); return html`<span class="code">${h.id}</span><span class="sub">${holdWhen(h)}${h.where ? ` · ${h.where}` : ''}</span>`; } },
      { label: L.else_col, width: '16%', render: (l) => {
        const els = ELSE.filter((s) => s.item === l.id);
        const gn = GONE.filter((s) => s.item === l.id);
        return html`${els.length ? els.map((s) => html`<span class="t-warn strong">${fmt.num(s.count)} en ${s.loc}</span> `) : html`<span class="muted">${L.else_none || 'Sin existencias'}</span>`}${gn.length ? html`<span class="sub">${gn.map((s) => `${fmt.num(s.count)} ${L.gone_verb} el ${fmt.dayMonth(s.date)}`).join(' · ')}</span>` : ''}`;
      } },
      { label: 'Estado', width: '16%', render: (l) => ITEM_CHIP[itemState(run, l.id)]() }
    ];
    return App.card({
      id: 'al-lots',
      title: L.items_title,
      sub: `${L.items_systems} · ${L.items_where} ${span(run.cond)}`,
      icon: S.icon,
      iconTone: 'crit',
      flush: true,
      body: App.table({ cols, rows: ITEMS, clickable: ITEMS.some((l) => hasTrace(l.trace || l.id)), rowAttrs: (l) => (hasTrace(l.trace || l.id) ? { 'data-lot': l.trace || l.id, title: `Ver la traza de ${l.trace || l.id}` } : {}), rowClass: (l) => { const st = itemState(run, l.id); return st === 'out' ? 'is-muted' : st === 'unblocked' ? '' : 'tone-crit'; } }),
      footer: html`<span class="small slate">${pl(ALL.count)}${S.qty_unit ? ` · ${fq(ALL.qty)}` : ''}${ALL.value ? ` · ${fmt.eur(ALL.value)} ${L.value_label}` : ''}${sc.out.length ? ` · ${fmt.num(sc.exCount)} fuera del alcance` : ''}</span><span class="spacer"></span><button type="button" class="btn btn-secondary btn-sm" data-action="csv">${icon('download', 15)}<span>${L.csv_button}</span></button>`
    });
  }

  function mapCard(run) {
    const per = S.per_square || 1;
    const sqClass = (id) => { const s = itemState(run, id); return s === 'blocked' ? ' is-blocked' : s === 'out' ? ' is-out' : ''; };
    const rows = ITEMS.map((l) => {
      const h = l.hold ? HOLD(l.hold) : null;
      const out = sqClass(l.id) === ' is-out';
      const n = Math.max(1, Math.ceil(l.count / per));
      const tr = hasTrace(l.trace || l.id);
      const tag = tr ? 'button' : 'div';
      return html`${App.raw(`<${tag} ${tr ? 'type="button" ' : ''}class="al-lrow${out ? ' is-out' : ''}"${tr ? ` data-lot="${l.trace || l.id}" title="Ver la traza de ${l.trace || l.id}"` : ''}>`)}
        <span class="al-lrow-name">${l.group_short || l.group}</span>
        <span class="al-plts" role="img" aria-label="${pl(l.count)}">${Array.from({ length: n }, () => html`<i class="al-plt${sqClass(l.id)}"></i>`)}</span>
        <span class="al-lrow-info"><span class="code">${l.id}</span>${h ? `${holdWhen(h)}${h.where ? ` · ${h.where}` : ''}` : l.title}</span>
      ${App.raw(`</${tag}>`)}`;
    });
    const els = ELSE.map((s) => {
      const out = run.excluded && run.excluded.includes(s.item);
      return html`<div class="al-silo${out ? ' is-out' : ''}">
        <span class="al-silo-code">${s.loc}</span>
        <span class="al-silo-num">${fmt.num(s.count)}</span>
        <span class="al-silo-sub">${s.note || s.item}</span>
      </div>`;
    });
    const blocked = run.decision && run.decision.status === 'approved';
    const rejected = run.decision && run.decision.status === 'rejected';
    return App.card({
      id: 'al-map',
      title: L.map_title,
      sub: L.map_sub,
      icon: 'map-pin',
      body: html`<div class="al-map">
        <div>
          <div class="al-zone-head"><span class="al-zone-title">${L.zone_title}</span><span class="al-zone-sub">${pl(ALL.count)} · ${L.zone_sub}</span></div>
          <div class="al-c07">${rows}</div>
        </div>
        ${ELSE.length ? html`<div>
          <div class="al-zone-head"><span class="al-zone-title">${L.else_title}</span><span class="al-zone-sub">${pl(sum(ELSE, 'count'))} · ${L.else_sub}</span></div>
          <div class="al-silos">${els}</div>
        </div>` : ''}
        ${GONE.length ? html`<div>
          <div class="al-zone-head"><span class="al-zone-title">${L.gone_title}</span><span class="al-zone-sub">${pl(GONE_TOTAL)} · fuera del alcance</span></div>
          <ul class="al-shipped">${GONE.map((s) => html`<li><span class="code">${s.id}</span><span class="al-sh-when">${fmt.date(s.date)} ${s.time}</span><span class="al-sh-what">${pl(s.count)} de <span class="code">${s.lot || s.item}</span><span class="sub">${s.to}</span></span></li>`)}</ul>
        </div>` : ''}
        <div class="al-legend"><span><i class="al-plt${blocked ? ' is-blocked' : ''}"></i>${blocked ? (L.blocked || 'Bloqueado') : rejected ? `${L.exposed || 'Expuesto'}, sin ${L.block_noun}` : (L.legend_exposed || 'Expuesto')}</span><span><i class="al-plt is-out"></i>Fuera del alcance</span>${ELSE.length ? html`<span><i class="al-plt is-silo"></i>${L.legend_else}</span>` : ''}${per > 1 ? html`<span class="muted">Cada cuadro = ${pl(per)}</span>` : ''}</div>
      </div>`
    });
  }

  function approvalHTML(run) {
    const H = ctxH(run);
    const sc = H.sc;
    const d = run.decision;
    const status = d ? d.status : 'pending';
    const applying = run.status === 'applying';
    const AP = A.approval;
    const scope = [
      { label: L.scope_main, value: `${pl(sc.count)} · ${fmt.plural(sc.items.length, S.item_noun[0], S.item_noun[1])}${S.qty_unit ? ` · ${fq(sc.qty)}` : ''}`, status: 'blocked', chip: status === 'approved' ? (L.blocked || 'Bloqueado') : L.block_verb },
      sc.out.length ? { label: `Retirado del alcance: ${sc.out.map((l) => l.id).join(', ')}`, value: pl(sc.exCount), status: 'neutral', chip: 'Excluido' } : null,
      sc.elseTotal ? { label: `${L.else_scope} (${uniq(sc.elsewhere.map((s) => s.loc)).join(', ')})`, value: pl(sc.elseTotal), status: 'evaluate' } : null,
      sc.holds.length ? { label: `${L.holds_label} · ${L.holds_first} ${sc.holds[0].id} ${holdWhen(sc.holds[0]).includes('/') ? 'el' : 'a las'} ${holdWhen(sc.holds[0])}`, value: String(sc.holds.length), status: 'hold', chip: status === 'approved' ? L.held : L.hold_verb } : null
    ].filter(Boolean).concat(AP.extra_scope ? AP.extra_scope(H) : []);
    const effects = status === 'approved' && !applying ? AP.applied(H) : status === 'approved' ? [] : AP.effects(H);
    const comments = [];
    if (sc.out.length) comments.push(html`<div><strong>Alcance editado:</strong> se retira ${fmt.list(sc.out.map((l) => l.id))}. Motivo: «${run.editReason}»</div>`);
    if (d && d.status === 'rejected') comments.push(html`<div${comments.length ? App.raw(' class="mt-1"') : ''}><strong>Motivo del rechazo:</strong> «${d.reason}»</div>`);
    const doneActions = status === 'rejected'
      ? html`<button type="button" class="btn btn-ghost" data-open-audit>${icon('history')}<span>Ver en auditoría</span></button><button type="button" class="btn btn-secondary" data-action="execute">${icon('rotate-ccw')}<span>Volver a ejecutar</span></button>`
      : html`<button type="button" class="btn btn-ghost" data-open-audit>${icon('history')}<span>Ver en auditoría</span></button>`;
    return App.approvalCard({
      id: AP.id,
      status,
      title: AP.title(H),
      summary: AP.summary(H),
      approver: run.wf.approver,
      policy: AP.policy,
      scope,
      effects,
      extra: html`${analysisBlock(run)}${applying ? html`<div class="al-wait mt-4"><span class="spinner"></span><span>Aplicando en ${A.apply_systems}…</span></div>` : ''}`,
      editable: ITEMS.length > 1,
      approveLabel: AP.approve_label,
      rejectLabel: 'Rechazar',
      editLabel: 'Editar alcance',
      decidedBy: d ? d.by : null,
      decidedAt: d ? d.at : null,
      comment: comments.length ? html`${comments}` : null,
      doneActions
    });
  }

  function approvalPlaceholder() {
    return App.card({
      id: 'al-approval-wait',
      title: fmt.cap(TX.proposal_title),
      sub: `La prepara el agente ${LANE[PROPOSER].name}`,
      icon: 'user-check',
      body: html`<div class="al-wait"><span class="spinner"></span><span>Aparecerá aquí para su aprobación. ${TX.idle_log}</span></div>`
    });
  }

  function decisionRow(run, opts) {
    const o = opts || {};
    return html`<div class="grid cols-7-5 al-dec-grid">
      <div class="stack">${itemsCard(run)}${o.map !== false ? mapCard(run) : ''}</div>
      <div class="al-side" id="al-approval">${o.approval === false ? approvalPlaceholder() : approvalHTML(run)}</div>
    </div>`;
  }

  /* ---------------------------------------------------------------- Resultado, documento y comparación */

  function tileHTML(t) {
    const head = html`<div class="al-out-head"><span class="card-icon${t.tone ? ` tone-${t.tone}` : ''}">${icon(t.icon || 'check', 18)}</span><div><div class="al-out-title">${t.title}</div><div class="al-out-sub">${(t.systems || []).map((s) => sys(s))}${t.chip ? chip(t.chip[0], t.chip[1]) : ''}${t.note ? html`<span>${t.note}</span>` : ''}</div></div></div>`;
    let body = '';
    if (t.kv) body = App.kv(t.kv);
    if (t.items) body = html`<ol class="al-8d">${t.items.map((x) => html`<li><span class="d">${x.d}</span><span class="t">${x.t}<span class="o">${x.owner}${x.due ? ` · ${fmt.dayMonth(x.due)}` : ''}</span></span></li>`)}</ol>`;
    if (t.message) {
      const m = t.message;
      body = html`<div class="al-msg">
        <div class="al-msg-head">${icon(m.icon || 'message-square', 15)}<strong>${m.from}</strong><span>${m.channel}</span><span class="spacer"></span><span>${m.at || ''}</span></div>
        <div class="al-msg-body">${m.paras.map((p, i) => html`<p>${p.to ? html`<span class="al-mention">@${p.to}</span> ` : ''}${p.text}</p>${i === 0 && m.list && m.list.length ? html`<ul>${m.list.map((x) => html`<li>${x}</li>`)}</ul>` : ''}`)}</div>
      </div>`;
    }
    const btns = (t.buttons || []).map((b) => html`<button type="button" class="btn btn-secondary btn-sm" data-action="${b.action}">${icon(b.icon || 'download', 15)}<span>${b.label}</span></button>`);
    return html`<div class="al-out-tile">${head}${body}${t.next ? html`<div class="al-next">${t.next}</div>` : ''}${btns.length ? html`<div class="al-out-foot">${btns}</div>` : ''}</div>`;
  }

  function resultCard(run) {
    const H = ctxH(run);
    const agentsMs = (run.p1Ms || 0) + (run.p2Ms || 0);
    const total = agentsMs + (run.decision ? run.decision.waitMs : 0);
    const R = A.result;
    return App.card({
      id: 'al-result',
      tone: 'ok',
      icon: 'check-circle',
      iconTone: 'ok',
      title: R.title(H),
      sub: `Workflow completado a las ${fmt.time(run.endAt, true)} · ${fmt.ms(total)} en total, con la decisión ${DEC_OF}`,
      actions: html`<button type="button" class="btn btn-secondary btn-sm" data-open-audit>${icon('history', 15)}<span>Ver en auditoría</span></button><button type="button" class="btn btn-primary btn-sm" data-action="report">${icon('printer', 15)}<span>Descargar ${A.report.noun} (PDF)</span></button>`,
      body: html`<div class="stack">
        ${App.stats(R.stats(H).concat([
          { label: 'Llamadas a sistemas y modelo', value: CALLS.total },
          { label: 'Coste estimado', value: fmt.usd(LLM_COST_USD) }
        ]))}
        ${((tiles) => html`<div class="al-out${tiles.length === 4 ? ' is-4' : ''}">${tiles.map(tileHTML)}</div>`)(R.tiles(H))}
        <div class="al-metrics">
          <span>${icon('gauge', 15)}Ejecución <strong>${run.id}</strong></span>
          <span>${CALLS.auto} pasos automáticos y 1 aprobación</span>
          <span>Agentes <strong>${fmt.ms(agentsMs)}</strong></span>
          <span>Decisión ${DEC_OF} <strong>${fmt.ms(run.decision.waitMs)}</strong></span>
          <span>${CALLS.total} llamadas, ${CALLS.llm} al modelo de lenguaje</span>
          <span>Coste estimado <strong>${fmt.usd(LLM_COST_USD)}</strong></span>
        </div>
      </div>`
    });
  }

  function comparisonCard(run) {
    const agentsMs = (run.p1Ms || 0) + (run.p2Ms || 0);
    const total = agentsMs + run.decision.waitMs;
    const rows = A.compare.map((r) => (r.measured
      ? Object.assign({}, r, { now: html`${fmt.ms(total)}<span class="al-cmp-now">Medido en esta sesión: propuesta en ${fmt.ms(run.p1Ms)}, decisión ${DEC_OF} en ${fmt.ms(run.decision.waitMs)}</span>` })
      : r.steps ? Object.assign({}, r, { now: `${CALLS.auto} pasos automáticos y 1 aprobación` }) : r));
    return App.card({
      id: 'al-compare',
      title: 'Comparación con el proceso actual',
      sub: 'La columna «Hoy» es un supuesto ilustrativo que se valida con la línea base del piloto',
      icon: 'scale',
      flush: true,
      class: 'al-cmp',
      body: App.table({ rows, cols: [
        { label: 'Aspecto', width: '22%', render: (r) => html`<span class="strong">${r.k}</span>` },
        { label: 'Hoy (estimación)', width: '36%', render: (r) => r.today },
        { label: 'Con Agentic Platform (simulación)', render: (r) => r.now }
      ] }),
      footer: html`<span class="al-cmp-foot">${icon('info', 15)}<span>«Hoy» usa supuestos ilustrativos. El tiempo de esta simulación no mide rendimiento real; ambos se validan con la línea base del piloto.</span></span>`
    });
  }

  function rejectedCard(run) {
    const d = run.decision;
    return App.card({
      id: 'al-result',
      icon: 'x-circle',
      title: 'Propuesta rechazada · no se ha aplicado ninguna acción',
      sub: `Decisión de ${d.by} a las ${fmt.time(d.at)}`,
      actions: html`<button type="button" class="btn btn-secondary btn-sm" data-open-audit>${icon('history', 15)}<span>Ver en auditoría</span></button><button type="button" class="btn btn-primary btn-sm" data-action="execute">${icon('rotate-ccw', 15)}<span>Volver a ejecutar el workflow</span></button>`,
      body: html`<div class="stack">
        ${App.callout({ tone: 'neutral', icon: 'message-square', title: 'Motivo del rechazo', body: `«${d.reason}»` })}
        <ul class="al-notapplied">${A.not_applied(ctxH(run)).map((x) => html`<li>${sys(x.sys)}<span>${x.text}</span><span>${chip('neutral', 'Sin cambios')}</span></li>`)}</ul>
        <p class="small muted">La decisión y su motivo quedan en el registro de auditoría. La alarma sigue en el resumen del turno como decidida por ${d.by}.</p>
      </div>`
    });
  }

  function noTriggerCard(run) {
    const W = run.wf;
    const C = run.cond;
    return App.card({
      id: 'al-result',
      icon: 'alert-triangle',
      iconTone: 'warn',
      title: 'La condición del workflow no se cumple',
      sub: `«${W.name}» ${W.version} · ${run.id}`,
      actions: html`<button type="button" class="btn btn-secondary btn-sm" data-go="workflow">${icon('workflow', 15)}<span>Revisar el workflow</span></button><button type="button" class="btn btn-primary btn-sm" data-action="execute">${icon('rotate-ccw', 15)}<span>Volver a ejecutar</span></button>`,
      body: App.callout({
        tone: 'warn',
        icon: 'info',
        title: `${C.above} min por encima de ${fv(W.threshold)}; el workflow pide más de ${W.minutes} min`,
        body: html`<p>Con estos parámetros la alarma ${A.alarm_id} no activa ${TX.activates}: no se ha propuesto ni aplicado ninguna acción en ${A.untouched}.</p><p class="mt-2">${A.policy_ref} fija la actuación a partir de ${MIN_HOLD} min por encima de ${fv(LIMIT)}. Revisa los parámetros en «De palabras a workflow» y vuelve a ejecutarlo.</p>`
      })
    });
  }

  /* ---------------------------------------------------------------- Flujo */

  function scrollTo(ctx, sel, block) {
    requestAnimationFrame(() => { const el = ctx.$(sel); if (el) el.scrollIntoView({ behavior: 'smooth', block: block || 'start' }); });
  }

  function finalizePhase1(ctx) {
    const run = ctx.local.run;
    if (!run || run.status !== 'running') return;
    const steps = run.cond.met ? p1Steps(run) : noTrigSteps(run);
    steps.forEach((s) => logStep(ctx, s));
    const cur = ctx.local.run;
    ctx.setLocal({ run: Object.assign({}, cur, { status: run.cond.met ? 'waiting' : 'no-trigger', p1Ms: sum(steps, 'ms'), proposalWall: App.now().getTime(), endAt: run.cond.met ? null : iso(run.t0 + sum(steps, 'ms')) }) });
  }

  function finalizePhase2(ctx) {
    const run = ctx.local.run;
    if (!run || run.status !== 'applying') return;
    const steps = p2Steps(run);
    steps.forEach((s) => logStep(ctx, s));
    const cur = ctx.local.run;
    const p2Ms = sum(steps, 'ms');
    ctx.setLocal({ run: Object.assign({}, cur, { status: 'done', p2Ms, endAt: iso(run.t0 + run.p1Ms + run.decision.waitMs + p2Ms) }) });
  }

  function onStep(ctx, steps, s, k) {
    if (!ctx.alive()) return;
    logStep(ctx, s);
    const run = ctx.local.run;
    const done = k + 1;
    paint(ctx, run, steps, done, done < steps.length ? done : -1);
    if (s.reveal) {
      const host = ctx.$('#al-decision');
      if (host) host.innerHTML = String(decisionRow(run, { approval: false, map: s.reveal === 'map' }));
    }
  }

  async function execute(ctx) {
    if (ctx.vars.live) return;
    const prev = ctx.local.run;
    if (prev && !['rejected', 'no-trigger'].includes(prev.status)) return;
    const wf = currentWorkflow();
    const cond = condOf(wf);
    const history = (ctx.local.history || []).slice();
    if (prev) { history.push({ id: prev.id, status: prev.status, at: prev.endAt || null }); if (App.outcome('alarma')) App.outcome('alarma', null); }
    const run = { id: App.seq('EJE-2026-', 1), status: 'running', wf, cond, t0: App.now().getTime(), excluded: [], editReason: '', logged: {} };
    App.audit(wf.backup ? 'Workflow de respaldo ejecutado' : 'Workflow ejecutado', `«${wf.name}» ${wf.version} · alarma ${A.alarm_id} (${A.asset}, ${A.alarm_time}) · ${run.id}`);
    ctx.setLocal({ run, history });
    ctx.vars.live = true;
    ctx.rerender();
    scrollTo(ctx, '#al-exec');
    ctx.presenter({ next: cond.met
      ? 'Mientras corre: la sala de agentes resume y el registro detalla cada llamada con su sistema y latencia. Se detendrá en la aprobación. «Acelerar» si vamos justos.'
      : 'Mirar la condición: con estos parámetros el workflow no se activa.' });
    const steps = cond.met ? p1Steps(run) : noTrigSteps(run);
    paint(ctx, run, steps, 0, 0);
    const analysis = cond.met && useModel() ? askAnalysis(run, ctx.signal).catch((e) => ({ error: e.message })) : null;
    if (analysis) {
      AI_PENDING = run.id;
      analysis.then((got) => {
        if (AI_PENDING === run.id) AI_PENDING = null;
        if (!ctx.alive()) return;
        const cur = ctx.local.run;
        if (!cur || cur.id !== run.id) return;
        ctx.setLocal({ run: Object.assign({}, cur, { llm: got }) });
        if (got.error) App.toast(LTA(`El modelo no ha redactado el análisis (${got.error}).`, `The model did not write the analysis (${got.error}).`), { tone: 'warn', icon: 'alert-triangle', duration: 7000 });
        else App.audit(LTA('Análisis redactado por el modelo', 'Analysis written by the model'), `${A.alarm_id} · ${got.model} · ${fmt.ms(got.ms)}`, ACTOR_ORCH);
        if (!ctx.vars.live) ctx.rerender();
      });
    }
    const stream = App.reasoningStream(ctx.$('#al-log'), steps, {
      title: `Registro · ${run.id}`, signal: ctx.signal, maxHeight: 400, start: iso(run.t0),
      minDelay: 0, maxDelay: 9000, speed: ctx.vars.fast ? 4 : 1,
      onStep: (s, k) => onStep(ctx, steps, s, k)
    });
    await stream.done;
    if (!ctx.alive()) return;
    finalizePhase1(ctx);
    ctx.vars.live = false;
    ctx.presenter(null);
    ctx.rerender();
    if (ctx.local.run.status === 'waiting') {
      App.toast(`${fmt.cap(TX.proposal_title)} lista: ${TX.scope_short(ctxH(ctx.local.run))}. Pendiente de aprobación.`, { tone: 'warn', icon: 'user-check' });
      scrollTo(ctx, '#al-approval', 'center');
    } else scrollTo(ctx, '#al-result', 'center');
  }

  async function approve(ctx) {
    const run = ctx.local.run;
    if (!run || run.status !== 'waiting' || ctx.vars.live) return;
    const ids = {};
    (A.ids || []).forEach((x) => { ids[x.key] = App.seq(x.prefix, x.start, x.width); });
    const wall = App.now().getTime();
    const waitMs = Math.max(1000, wall - (run.proposalWall || wall));
    const decision = { status: 'approved', by: run.wf.approver, at: iso(run.t0 + run.p1Ms + waitMs), waitMs };
    const next = Object.assign({}, run, { status: 'applying', decision, ids });
    const H = ctxH(next);
    App.audit(TX.audit_approved, TX.audit_approved_detail(H), run.wf.approver);
    App.outcome('alarma', { status: 'approved', label: TX.outcome_approved(H) });
    ctx.setLocal({ run: next });
    ctx.vars.live = true;
    ctx.rerender();
    ctx.presenter({ next: TX.presenter_applying });
    const cur = ctx.local.run;
    const pre = p1Steps(cur).concat(decisionSteps(cur)).map((s) => Object.assign({}, s, { wait: 0 }));
    const steps = pre.concat(p2Steps(cur));
    paint(ctx, cur, steps, pre.length, pre.length);
    const stream = App.reasoningStream(ctx.$('#al-log'), steps, {
      title: `Registro · ${cur.id}`, signal: ctx.signal, maxHeight: 400, start: iso(cur.t0),
      minDelay: 0, maxDelay: 9000, speed: ctx.vars.fast ? 4 : 1,
      onStep: (s, k) => { if (k >= pre.length - 1) onStep(ctx, steps, s, k); }
    });
    scrollTo(ctx, '#al-exec');
    await stream.done;
    if (!ctx.alive()) return;
    finalizePhase2(ctx);
    ctx.vars.live = false;
    ctx.presenter(null);
    ctx.rerender();
    App.toast(TX.toast_done(ctxH(ctx.local.run)), { tone: 'ok', icon: 'check-circle' });
    scrollTo(ctx, '#al-result');
  }

  async function reject(ctx) {
    const run = ctx.local.run;
    if (!run || run.status !== 'waiting' || ctx.vars.live) return;
    const reason = await App.promptText({
      title: `Rechazar la ${TX.proposal_title}`,
      text: `No se aplicará ninguna acción: ${TX.reject_nothing}. El motivo queda en el registro de auditoría.`,
      label: 'Motivo del rechazo',
      required: true,
      confirmLabel: 'Rechazar propuesta'
    });
    if (reason == null || !ctx.alive()) return;
    const cur = ctx.local.run;
    if (!cur || cur.status !== 'waiting') return;
    const H = ctxH(cur);
    const wall = App.now().getTime();
    const waitMs = Math.max(1000, wall - (cur.proposalWall || wall));
    const decision = { status: 'rejected', by: cur.wf.approver, at: iso(cur.t0 + cur.p1Ms + waitMs), waitMs, reason };
    App.audit(TX.audit_rejected, `Propuesta: ${TX.scope_short(H)} · motivo: «${reason}» · no se aplica ninguna acción`, cur.wf.approver);
    App.outcome('alarma', { status: 'rejected', label: TX.outcome_rejected });
    ctx.setLocal({ run: Object.assign({}, cur, { status: 'rejected', decision, endAt: iso(cur.t0 + cur.p1Ms + waitMs + 40) }) });
    ctx.rerender();
    App.toast('Propuesta rechazada: no se ha aplicado ninguna acción', { tone: 'info', icon: 'x-circle' });
    scrollTo(ctx, '#al-result', 'center');
  }

  function editScope(ctx) {
    const run = ctx.local.run;
    if (!run || run.status !== 'waiting') return;
    const ex = new Set(run.excluded || []);
    const fid = App.uid('al-scope');
    App.modal({
      title: 'Editar alcance',
      kicker: `${fmt.cap(TX.proposal_title)} · ${A.asset}`,
      size: 'md',
      body: html`<p class="slate small mb-4">${TX.edit_intro} Si retiras ${S.item_noun[0] === S.item_noun[1] ? 'un elemento' : `un ${S.item_noun[0]}`}, indica el motivo: queda en el registro de auditoría y en el ${A.report.noun}.</p>
        <ul class="al-scope-edit">${ITEMS.map((l) => html`<li>
          <label class="check"><input type="checkbox" data-scope-item="${l.id}" ${App.attrs({ checked: !ex.has(l.id) })}><span class="code">${l.id}</span></label>
          <span class="al-se-prod">${l.title}</span>
          <span class="al-se-num">${pl(l.count)} · ${l.group_short || l.group}</span>
        </li>`)}</ul>
        <div class="field mt-4"><label class="label" for="${fid}">Motivo del cambio</label><textarea id="${fid}" class="textarea" rows="2" style="min-height:76px" placeholder="Explica por qué se retira del alcance">${run.editReason || ''}</textarea><span class="hint" data-scope-hint>Obligatorio si retiras algún elemento</span></div>`,
      actions: [
        { label: 'Cancelar', variant: 'secondary' },
        {
          label: 'Aplicar alcance',
          variant: 'primary',
          icon: 'check',
          onClick: (api) => {
            const excluded = Array.from(api.body.querySelectorAll('[data-scope-item]')).filter((b) => !b.checked).map((b) => b.getAttribute('data-scope-item'));
            const ta = api.body.querySelector('textarea');
            const reason = ta.value.trim();
            const hint = api.body.querySelector('[data-scope-hint]');
            const warn = (t) => { hint.textContent = t; hint.classList.add('t-crit'); };
            if (excluded.length === ITEMS.length) { warn('Deja al menos un elemento en el alcance o rechaza la propuesta.'); return false; }
            if (excluded.length && !reason) { warn('Escribe el motivo para retirar elementos del alcance.'); ta.focus(); return false; }
            applyScope(ctx, excluded, reason);
            return undefined;
          }
        }
      ]
    });
  }

  function applyScope(ctx, excluded, reason) {
    const run = ctx.local.run;
    if (!run || run.status !== 'waiting') return;
    const before = (run.excluded || []).slice().sort().join('|');
    const after = excluded.slice().sort().join('|');
    if (before === after && (!excluded.length || reason === run.editReason)) return;
    const sc = scopeOf(excluded);
    App.audit('Alcance de la propuesta editado', excluded.length
      ? `Se retira ${fmt.list(excluded)} (${pl(sc.exCount)}) · nuevo alcance: ${pl(sc.count)} en ${fmt.plural(sc.items.length, S.item_noun[0], S.item_noun[1])} · motivo: «${reason}»`
      : `Alcance completo restaurado: ${pl(sc.count)} en ${fmt.plural(sc.items.length, S.item_noun[0], S.item_noun[1])}`, run.wf.approver);
    ctx.setLocal({ run: Object.assign({}, run, { excluded, editReason: excluded.length ? reason : '' }) });
    ctx.rerender();
    App.toast(`Alcance actualizado: ${pl(sc.count)} en ${fmt.plural(sc.items.length, S.item_noun[0], S.item_noun[1])}`, { tone: 'info', icon: 'edit' });
    scrollTo(ctx, '#al-approval', 'center');
  }

  function downloadCsv(ctx) {
    const run = ctx.local.run;
    if (!run) return;
    const H = ctxH(run);
    const stateLabel = { exposed: L.exposed || 'Expuesto', blocked: `${L.blocked || 'Bloqueado'}${H.ids[A.block_id_key] ? ` (${H.ids[A.block_id_key]})` : ''}`, out: 'Fuera del alcance', unblocked: L.unblocked || 'Sin bloqueo' };
    const rows = UNITS || ITEMS.map((l) => Object.assign({ item: l.id }, l));
    const cols = (S.csv_cols || [{ label: L.item_col, key: 'item' }, { label: 'Descripción', key: 'title' }, { label: fmt.cap(S.unit[1]), key: 'count' }])
      .map((c) => ({ label: c.label, value: (r) => { const v = typeof c.value === 'function' ? c.value(r, ITEM[r.item]) : r[c.key]; return c.text ? `="${v}"` : v; } }))
      .concat([{ label: 'Estado', value: (r) => stateLabel[itemState(run, r.item)] }]);
    App.downloadFile(`${S.csv_name}-${D.meta.today}.csv`, 'text/csv', App.csv({ rows, cols }));
  }

  /* ---------------------------------------------------------------- Documentos controlados */

  const PRINT_STYLE = (code, rev) => App.raw(`<style>
@page{@top-right{content:"${code} · rev. ${rev}";font:500 8.5px Inter,system-ui,sans-serif;color:var(--muted)}@bottom-left{content:"${(D.meta.report_org || D.meta.company || '').replace(/"/g, '')} · Documento generado por Agentic Platform · demostración con datos sintéticos";font:8.5px Inter,system-ui,sans-serif;color:var(--muted)}@bottom-right{content:"Página " counter(page) " de " counter(pages);font:600 8.5px Inter,system-ui,sans-serif;color:var(--muted)}}
.sec h2{break-after:avoid}
td .code{white-space:nowrap}
</style>`);

  function approvalsTable(rows) {
    return {
      cols: [{ label: 'Paso', key: 'step' }, { label: 'Rol', key: 'role' }, { label: 'Decisión', render: (r) => html`<span class="tag ${r.tone || ''}">${r.decision}</span>` }, { label: 'Fecha y hora', key: 'when' }],
      rows
    };
  }

  function openReport(ctx) {
    const run = ctx.local.run;
    if (!run || run.status !== 'done') return;
    const H = ctxH(run);
    const sc = H.sc;
    const W = run.wf;
    const C = run.cond;
    const RP = A.report;
    const steps = stepsFor(run);
    const when = run.endAt;
    const propAt = iso(run.t0 + run.p1Ms);
    const sample = series.filter((p) => p.value > C.threshold);
    let t = new Date(run.t0).getTime();
    const logRows = steps.map((s) => { const at = fmt.time(iso(t), true); t += Number(s.ms) || 0; return { at, agent: s.agent, system: s.system, action: s.action, result: s.result }; });
    App.printableReport({
      title: RP.title,
      subtitle: `${RP.subtitle} del ${fmt.dateLong(D.meta.today)} · workflow «${W.name}» ${W.version}${W.backup ? ' (respaldo)' : ''}`,
      code: RP.code,
      filename: `${RP.filename}-${D.meta.today}`,
      date: when,
      meta: [
        ['Revisión', '1'],
        ['Estado', html`<span class="tag ok">Aprobado</span>`],
        [RP.site_label || 'Centro', RP.site]
      ].concat((A.ids || []).map((x) => [x.label, H.ids[x.key]]), [
        ['Ejecución', run.id],
        ['Aprobado por', W.approver],
        ['Fecha de aprobación', fmt.date(run.decision.at, { time: true })]
      ]),
      sections: [
        { html: PRINT_STYLE(RP.code, 1) },
        { heading: '1. Descripción del evento', text: `${RP.description(H)}\n\nCriterio aplicado: ${RP.criteria}` },
        { heading: '2. Lecturas por encima del límite', table: { cols: [{ label: 'Hora', key: 'time' }, { label: M.col, render: (p) => fv(p.value), num: true }, { label: 'Estado', render: (p) => html`<span class="tag ${p.value > critOf(C) ? 'crit' : 'warn'}">${p.value > critOf(C) ? `Por encima de ${fv(critOf(C))}` : `Por encima de ${fv(C.threshold)}`}</span>` }], rows: sample } },
        { heading: '3. Eventos', table: { cols: [{ label: 'Hora', render: (e) => `${e.time}${e.end ? `–${e.end}` : ''}` }, { label: 'Equipo o referencia', render: (e) => e.equipment || e.ref || '—' }, { label: 'Evento', render: (e) => fmt.text(e.text) }], rows: A.events } },
        { heading: `4. ${L.report_scope}`, table: { cols: [
          { label: L.item_col, render: (l) => html`<span class="code">${l.id}</span>` },
          { label: 'Descripción', render: (l) => `${l.title}${l.sub ? ` · ${l.sub}` : ''}` },
          { label: L.group_col || 'Ubicación', key: 'group' },
          { label: fmt.cap(S.unit[1]), render: (l) => fmt.num(l.count), num: true },
          S.qty_unit ? { label: S.qty_unit, render: (l) => fmt.num(l.qty), num: true } : null,
          { label: L.hold_col, render: (l) => { if (!l.hold) return '—'; const h = HOLD(l.hold); return `${h.id} · ${holdWhen(h)}${h.where ? ` · ${h.where}` : ''}`; } }
        ].filter(Boolean), rows: sc.items } },
        sc.out.length ? { heading: '4 bis. Retirado del alcance', text: `${fmt.list(sc.out.map((l) => `${l.id} (${pl(l.count)})`))}. Motivo indicado por ${W.approver}: «${run.editReason}».` } : null,
        sc.elsewhere.length ? { heading: `5. ${L.else_title}`, table: { cols: [{ label: 'Ubicación', key: 'loc' }, { label: L.item_col, render: (s) => html`<span class="code">${s.item}</span>` }, { label: fmt.cap(S.unit[1]), key: 'count', num: true }, { label: 'Nota', render: (s) => s.note || '' }, { label: 'Decisión', render: () => html`<span class="tag warn">${L.else_decision || 'A evaluar'}</span>` }], rows: sc.elsewhere } } : null,
        GONE.length ? { heading: `6. ${L.gone_title} (fuera del alcance)`, table: { cols: [{ label: 'Referencia', render: (s) => html`<span class="code">${s.id}</span>` }, { label: 'Fecha', render: (s) => fmt.date(s.date, s.time) }, { label: L.item_col, render: (s) => html`<span class="code">${s.lot || s.item}</span>` }, { label: fmt.cap(S.unit[1]), key: 'count', num: true }, { label: 'Destino', key: 'to' }], rows: GONE } } : null,
        { heading: '7. Acciones aplicadas tras la aprobación', list: RP.actions(H) },
        { heading: '8. Hipótesis de causa y acciones pendientes', text: fmt.text(A.probable_cause), list: RP.pending(H) },
        { heading: '9. Aprobaciones', table: approvalsTable([
          { step: fmt.cap(TX.proposal_title), role: `Agentic Platform · agente ${LANE[PROPOSER].name}`, decision: 'Propuesto', tone: '', when: fmt.date(propAt, { time: true, seconds: true }) },
          { step: `Aprobación de la propuesta`, role: W.approver, decision: 'Aprobado', tone: 'ok', when: fmt.date(run.decision.at, { time: true, seconds: true }) },
          { step: 'Revisión del informe', role: RP.reviewer, decision: 'Pendiente', tone: 'warn', when: '—' },
          { step: RP.final_step, role: RP.final_role, decision: 'Pendiente de evaluación', tone: 'warn', when: '—' }
        ]) },
        { heading: '10. Registro de la ejecución', table: { cols: [{ label: 'Hora', key: 'at' }, { label: 'Agente o rol', key: 'agent' }, { label: 'Sistema', key: 'system' }, { label: 'Acción', key: 'action' }, { label: 'Resultado', key: 'result' }], rows: logRows } },
        { heading: 'Nota', callout: `Ejecución ${run.id}: ${CALLS.auto} pasos automáticos y 1 aprobación, ${CALLS.total} llamadas (${CALLS.llm} al modelo de lenguaje), coste estimado ${fmt.usd(LLM_COST_USD)}. ${RP.note}` }
      ].filter(Boolean),
      signatures: [{ role: W.approver, note: `Aprobado · ${fmt.date(run.decision.at, { time: true })}` }, { role: RP.reviewer, note: 'Revisión pendiente' }],
      footer: `${RP.code} · revisión 1 · Documento generado por Agentic Platform el ${fmt.date(when, { time: true })} · demostración con datos sintéticos · preparado por MFM`
    });
  }

  function openDoc(ctx) {
    const run = ctx.local.run;
    if (!run || run.status !== 'done') return;
    const H = ctxH(run);
    const DC = A.doc;
    const items = DC.items(H);
    const drafted = run.endAt;
    App.printableReport({
      title: DC.title(H),
      subtitle: DC.subtitle,
      code: DC.code,
      filename: DC.filename(H),
      date: drafted,
      meta: [
        ['Revisión', '0 (borrador)'],
        ['Estado', html`<span class="tag warn">Borrador</span>`],
        [A.report.site_label || 'Centro', A.report.site]
      ].concat(DC.meta(H), [
        [fmt.cap(A.report.noun), A.report.code],
        ['Origen', `Workflow «${run.wf.name}» ${run.wf.version}`],
        ['Redactado por', `Agentic Platform · agente ${LANE[DC.lane].name}`]
      ]),
      sections: [
        { html: PRINT_STYLE(DC.code, 0) },
        { heading: DC.heading, table: { cols: [
          { label: DC.col_d || 'D', render: (x) => html`<strong>${x.d}</strong>` },
          { label: 'Apartado', key: 't' },
          { label: 'Contenido', key: 'text' },
          { label: 'Responsable', key: 'owner' },
          { label: 'Fecha objetivo', render: (x) => (x.due ? fmt.date(x.due) : '—') }
        ], rows: items } },
        { heading: 'Aprobaciones', table: approvalsTable([
          { step: 'Redacción del borrador', role: `Agentic Platform · agente ${LANE[DC.lane].name}`, decision: 'Redactado', tone: '', when: fmt.date(drafted, { time: true, seconds: true }) },
          { step: 'Revisión', role: DC.reviewer, decision: 'Pendiente', tone: 'warn', when: '—' },
          { step: 'Aprobación y cierre', role: DC.approver, decision: 'Pendiente', tone: 'warn', when: '—' }
        ]) },
        { heading: 'Nota', callout: DC.note }
      ],
      signatures: [{ role: DC.reviewer, note: 'Revisión' }, { role: DC.approver, note: 'Aprobación' }],
      footer: `${DC.code} · revisión 0 (borrador) · Documento generado por Agentic Platform el ${fmt.date(drafted, { time: true })} · demostración con datos sintéticos · preparado por MFM`
    });
  }

  /* ---------------------------------------------------------------- Presentador */

  function presenterSay(state) {
    const run = state.scenes && state.scenes.alarma && state.scenes.alarma.run;
    const H = ctxH(run || null);
    const P = A.presenter;
    const wf = H.W;
    const base = [
      P.intro(H),
      wf.backup
        ? `En esta sesión no se ha publicado el workflow, así que corre el de respaldo con los parámetros de ${A.policy_ref}. La pantalla lo dice.`
        : `Ejecutamos el workflow «${wf.name}» que acabamos de publicar desde el procedimiento escrito: usa sus parámetros de verdad.`,
      P.agents
    ];
    if (!run || run.status === 'running') return base;
    if (run.status === 'no-trigger') {
      return [`Con los parámetros del workflow (más de ${run.cond.minutes} min por encima de ${fv(run.cond.threshold)}), esta alarma no lo activa: ${run.cond.above} min. No se propone nada.`, 'Es la prueba de que el workflow usa sus parámetros de verdad.'];
    }
    if (run.status === 'waiting') return [`Agentic Platform ha reunido la evidencia en ${fmt.ms(run.p1Ms)} y propone: ${TX.scope_short(H)}.`].concat(P.waiting(H));
    if (run.status === 'rejected') return P.rejected;
    if (run.status === 'applying') return [`Aprobado por ${run.decision.by}. Ahora los agentes escriben: ${A.apply_systems}.`];
    return P.done(H).concat(['Comparación ilustrativa: el tiempo de esta animación no mide rendimiento real. En el piloto se miden tiempos actuales y resultados con Agentic Platform.']);
  }
  function presenterNext(state) {
    const run = state.scenes && state.scenes.alarma && state.scenes.alarma.run;
    const N = A.presenter.next || {};
    if (!run) return 'Pulsar «Ejecutar workflow» y comentar la sala de agentes mientras corre.';
    switch (run.status) {
      case 'waiting': return `Pulsar «${A.approval.approve_label}». Opcional: «Editar alcance» para enseñar el control.`;
      case 'applying': return 'Esperar a que termine la fase de aplicación.';
      case 'done': return N.done || `Abrir «Descargar ${A.report.noun}» y pasar a la siguiente escena (flecha derecha).`;
      case 'rejected': return '«Volver a ejecutar el workflow» para aprobarlo, o pasar a la siguiente escena (flecha derecha).';
      case 'no-trigger': return N.no_trigger || 'Ir a «De palabras a workflow», bajar el tiempo mínimo y volver a ejecutar.';
      default: return 'Comentar la sala de agentes mientras corre; se detendrá en la aprobación.';
    }
  }

  /* ---------------------------------------------------------------- Registro de la escena */

  App.scene({
    id: 'alarma',
    order: 30,
    section: 'Automatización',
    nav: A.nav,
    title: A.title,
    icon: A.icon || M.icon,
    badge: (state) => {
      if (state.outcomes && state.outcomes.alarma) return null;
      const run = state.scenes && state.scenes.alarma && state.scenes.alarma.run;
      return run && run.status === 'waiting' ? { text: '1', tone: 'warn' } : { text: '1', tone: 'crit' };
    },
    presenter: { say: presenterSay, next: presenterNext },
    render(root, ctx) {
      if (ctx.local.run && ctx.local.run.status === 'running' && !ctx.vars.live) finalizePhase1(ctx);
      if (ctx.local.run && ctx.local.run.status === 'applying' && !ctx.vars.live) finalizePhase2(ctx);
      const run = ctx.local.run || null;
      const wf = run ? run.wf : currentWorkflow();
      const cond = run ? run.cond : condOf(wf);
      const live = !!ctx.vars.live;
      const steps = run && !live ? stepsFor(run) : [];
      const prog = live
        ? (run.status === 'applying' ? { done: p1Steps(run).length + decisionSteps(run).length, running: p1Steps(run).length + decisionSteps(run).length } : { done: 0, running: 0 })
        : { done: steps.length, running: -1 };
      const liveSteps = live ? (run.status === 'applying' ? p1Steps(run).concat(decisionSteps(run), p2Steps(run)) : (run.cond.met ? p1Steps(run) : noTrigSteps(run))) : steps;
      const traced = run && ['waiting', 'applying', 'done', 'rejected'].includes(run.status);
      root.innerHTML = String(html`
        ${head(run, wf)}
        ${kpis(wf, cond, run)}
        <div class="grid cols-5-7 section">${eventCard(wf, run)}${chartCard(wf, cond)}</div>
        <div class="section">${execCard(run, wf, liveSteps, prog)}</div>
        <div class="section" id="al-decision">${traced ? decisionRow(run) : ''}</div>
        ${run && run.status === 'done' ? html`<div class="section">${resultCard(run)}</div><div class="section">${comparisonCard(run)}</div>` : ''}
        ${run && run.status === 'rejected' ? html`<div class="section">${rejectedCard(run)}</div>` : ''}
        ${run && run.status === 'no-trigger' ? html`<div class="section">${noTriggerCard(run)}</div>` : ''}
      `);
      if (run && !live) {
        const log = ctx.$('#al-log');
        App.reasoningStream(log, steps, { title: `Registro · ${run.id}`, instant: true, start: iso(run.t0), maxHeight: 400 });
        const stateEl = log.querySelector('[data-rs-state]');
        const tweak = { waiting: chip('waiting'), rejected: chip('rejected', 'Detenido · rechazado'), 'no-trigger': chip('neutral', 'Detenido · sin disparo') }[run.status];
        if (stateEl && tweak) stateEl.innerHTML = String(tweak);
      }
      ctx.on('click', '[data-action="execute"]', () => execute(ctx));
      ctx.on('click', '[data-approval="approve"]', () => approve(ctx));
      ctx.on('click', '[data-approval="reject"]', () => reject(ctx));
      ctx.on('click', '[data-approval="edit"]', () => editScope(ctx));
      ctx.on('click', '[data-action="report"]', () => openReport(ctx));
      ctx.on('click', '[data-action="report-doc"]', () => openDoc(ctx));
      ctx.on('click', '[data-action="csv"]', () => downloadCsv(ctx));
      ctx.on('click', '[data-action="scroll-approval"]', () => scrollTo(ctx, '#al-approval', 'center'));
      ctx.on('click', '[data-rs="fast"]', () => { ctx.vars.fast = true; });
    },
    onLeave(ctx) {
      const run = ctx.local.run;
      if (!run) return;
      if (run.status === 'running') finalizePhase1(ctx);
      else if (run.status === 'applying') finalizePhase2(ctx);
    }
  });
})();
