/*
 * Escena «cuestionario» · Cuestionario de cliente, común a todas las industrias.
 * Misma estructura que la demo de Congelados de Navarra:
 *  - 15 preguntas del cliente. Agentic Platform redacta cada respuesta solo con fragmentos de las fuentes indexadas
 *    (documentos controlados y registros de sistemas) y marca con [n] la fuente de cada afirmación.
 *    Si el cliente escribe en inglés (CN_DATA.cuestionario.lang = 'en'), la respuesta va en inglés con
 *    traducción de revisión en español. Con la interfaz en inglés (CN_I18N.english) la vista es monolingüe en
 *    inglés: los datos ingleses (industries/<id>/en/cuestionario.js) traen qEn/en y no hay conmutador de idioma.
 *  - Modo Local (App.llm.isLocal()): el paso «Redacta…» pide al modelo la respuesta de cada pregunta con fuentes,
 *    solo con los pasajes citados ([1], [2]… como en la respuesta preparada); si falla o no cita, texto preparado.
 *  - Cada cita se comprueba aquí, en código: el fragmento tiene que aparecer literalmente en su fuente.
 *  - Las preguntas sin evidencia suficiente no se responden: quedan para revisión humana.
 *  - Revisión humana por respuesta (editar, descartar con motivo, aprobar); en bloque solo las de confianza alta.
 *  - Exporta Excel (.csv) y un documento controlado imprimible (App.printableReport).
 *  - Termina con la comparativa «Hoy / Con Agentic Platform» y la revisión medida en la sesión.
 * Todo el contenido sale de CN_DATA.cuestionario; render() reconstruye la vista desde ctx.local.
 */
(function () {
  'use strict';

  const { html, raw, esc, icon, fmt, chip, sys } = App;
  const D = window.CN_DATA;
  const QD = D.cuestionario;
  if (!QD) { console.warn('[cuestionario] Falta CN_DATA.cuestionario'); return; }
  const META = D.meta;
  const AGENT = QD.agent || 'Cuestionarios de cliente';
  const AGENT_ACTOR = `Agentic Platform · agente ${AGENT}`;
  const DEFAULT_SEL = QD.default_sel;
  const EN_UI = !!(window.CN_I18N && window.CN_I18N.english);
  /** Bilingüe: cliente en inglés con la interfaz en español (respuesta en inglés y traducción de revisión). */
  const BI = !EN_UI && QD.lang === 'en';
  /** Idioma de la vista monolingüe (clave de los textos: es/qEs o en/qEn). */
  const MK = EN_UI ? 'en' : 'es';
  /** Idioma del texto que se envía al cliente. */
  const CL = BI || EN_UI ? 'en' : 'es';
  const qText = (q, lang) => (lang === 'en' ? (q.qEn || q.qEs) : q.qEs) || '';
  const secName = (s) => (s ? (EN_UI ? (s.en || s.es) : s.es) : '');
  const REVIEWER = QD.reviewer;
  const ASSIGNEE = QD.assignee;
  const TEAM = QD.team || 'Calidad';
  const ASSIGNEE_SHORT = QD.assignee_short || ASSIGNEE;
  const ASSIGN_DUE = QD.assign_due;

  // Hoja de estilo de la escena (enlazada en consola.html; si faltase el enlace, se añade aquí).
  if (!document.querySelector('link[href*="scene-cuestionario.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'assets/css/scene-cuestionario.css';
    document.head.appendChild(link);
  }

  /* ---------------------------------------------------------------- Datos */

  const QN = QD.qn;
  const EMAIL = QD.email;
  const SECS = QD.sections;
  const SEC = Object.fromEntries(SECS.map((s) => [s.id, s]));
  const SOURCES = QD.sources;
  const DOC_COUNT = Object.values(SOURCES).filter((s) => s.type === 'doc').length;
  // Copia de trabajo de las preguntas (se anotan las citas verificadas sin tocar CN_DATA).
  const QS = QD.questions.map((q) => Object.assign({}, q, {
    cites: q.cites ? q.cites.map((c) => Object.assign({}, c)) : undefined,
    flag: q.flag ? Object.assign({}, q.flag, { partial: (q.flag.partial || []).map((c) => Object.assign({}, c)) }) : undefined
  }));
  const QBY = Object.fromEntries(QS.map((q) => [q.id, q]));

  /* ---------------------------------------------------------------- Verificación de citas (en código) */

  // Solo se normalizan caracteres 1 a 1 (signo menos y espacio duro) para poder recuperar el fragmento original.
  function norm(s) { return String(s == null ? '' : s).replace(/\u2212/g, '-').replace(/\u00a0/g, ' '); }
  function locate(c) {
    const src = SOURCES[c.src];
    const needle = norm(c.q);
    if (!src || !needle) return { ok: false };
    for (const s of src.sections) {
      const parts = [s.text || ''].concat(s.list || []);
      for (const part of parts) {
        const i = norm(part).indexOf(needle);
        if (i >= 0) return { ok: true, sec: s.id, heading: s.heading || '', page: s.page || null, frag: part.slice(i, i + needle.length) };
      }
    }
    return { ok: false };
  }
  QS.forEach((q) => {
    (q.cites || []).forEach((c) => Object.assign(c, locate(c)));
    if (q.flag) (q.flag.partial || []).forEach((c) => Object.assign(c, locate(c)));
  });
  const CITES_TOTAL = QS.reduce((n, q) => n + (q.cites || []).length, 0);
  const CITES_OK = QS.reduce((n, q) => n + (q.cites || []).filter((c) => c.ok).length, 0);
  const DRAFTED = QS.filter((q) => !q.flag).length;
  const FLAGGED = QS.filter((q) => q.flag);
  if (CITES_OK !== CITES_TOTAL) {
    QS.forEach((q) => (q.cites || []).forEach((c) => { if (!c.ok) console.warn(`[cuestionario] Cita no encontrada en ${c.src} (${q.id}): «${c.q}»`); }));
  }

  /** Sustituye {token} en los textos de datos por las cifras calculadas en la escena. */
  function tokens() {
    return {
      total: QS.length, drafted: DRAFTED, flagged: FLAGGED.length, flagged_ids: fmt.list(FLAGGED.map((q) => q.id)),
      alta: QS.filter((q) => q.conf === 'alta').length, media: QS.filter((q) => q.conf === 'media').length,
      media_ids: fmt.list(QS.filter((q) => q.conf === 'media').map((q) => q.id)),
      cites_ok: CITES_OK, cites_total: CITES_TOTAL, doc_count: DOC_COUNT, sections: SECS.length,
      due: fmt.date(QN.due), reviewer: REVIEWER, assignee: ASSIGNEE, team: TEAM, file: QN.file, via: QN.via,
      customer: QN.customer, code: QN.code, default_sel: DEFAULT_SEL,
      rec_code: (D.reclamacion && D.reclamacion.code) || ''
    };
  }
  function fill(s, extra) {
    const t = Object.assign(tokens(), extra || {});
    return String(s == null ? '' : s).replace(/\{(\w+)\}/g, (m, k) => (t[k] != null ? String(t[k]) : m));
  }

  /* ---------------------------------------------------------------- Estado de las respuestas */

  const CONF = {
    alta: { tone: 'ok', label: 'Alta', long: 'Confianza alta' },
    media: { tone: 'warn', label: 'Media', long: 'Confianza media' },
    none: { tone: 'neutral', label: 'Sin evidencia', long: 'Sin evidencia suficiente' }
  };
  const ST_LABEL = {
    pending: 'Sin responder', draft: 'Borrador pendiente de aprobación', approved: 'Aprobada', discarded: 'Descartada',
    flagged: `Requiere revisión de ${TEAM}`, assigned: `Asignada a ${ASSIGNEE_SHORT}`
  };
  const UNDECIDED = { draft: true, flagged: true };

  function ansOf(L, id) { return (L && L.ans && L.ans[id]) || { st: 'pending' }; }
  function textOf(q, a, lang) {
    if (a && a[lang] != null) return a[lang];
    return q.flag ? '' : (q[lang] || '');
  }
  function counts(L) {
    const c = { total: QS.length, cited: DRAFTED, alta: 0, media: 0, none: 0, pending: 0, draft: 0, approved: 0, discarded: 0, flagged: 0, assigned: 0, edited: 0, manual: 0, bulk: 0, single: 0 };
    QS.forEach((q) => {
      c[q.conf] += 1;
      const a = ansOf(L, q.id);
      c[a.st] = (c[a.st] || 0) + 1;
      if (a.edited) c.edited += 1;
      if (a.manual) c.manual += 1;
      if (a.st === 'approved') { if (a.via === 'bulk') c.bulk += 1; else c.single += 1; }
    });
    c.undecided = c.draft + c.flagged;
    c.decided = c.total - c.undecided - c.pending;
    return c;
  }
  function nextPending(L, current) {
    const i = QS.findIndex((q) => q.id === current);
    for (let k = 1; k <= QS.length; k++) {
      const q = QS[(i + k) % QS.length];
      if (q.id !== current && UNDECIDED[ansOf(L, q.id).st]) return q.id;
    }
    return null;
  }
  function isoMs(s) {
    const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/.exec(String(s || ''));
    return m ? Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +(m[6] || 0)) : NaN;
  }
  function secsBetween(a, b) { const d = (isoMs(b) - isoMs(a)) / 1000; return isFinite(d) ? Math.max(0, Math.round(d)) : 0; }

  /* ---------------------------------------------------------------- Registro del agente */

  const INTERNAL = { 'Agentic Platform': true, Procedimientos: true, 'Modelo de lenguaje': true };
  /** Texto nuevo del modo Local: se da ya en los dos idiomas (no pasa por el catálogo de la interfaz). */
  const LT = (es, en) => (EN_UI ? en : es);
  /** Paso del modelo en modo Local. llm: {system, model, ms, total, generated, fallback} (sin ms mientras corre). */
  function llmStep(llm) {
    const n = llm.total || DRAFTED;
    const done = llm.ms != null;
    const fb = llm.fallback || 0;
    return {
      agent: AGENT, system: llm.system, llm: true,
      action: LT(`Redacta con ${llm.model} solo con los pasajes citados (${n} llamadas, 3 en paralelo)`, `Drafts with ${llm.model} using only the cited passages (${n} calls, 3 in parallel)`),
      result: done
        ? LT(`${llm.generated} de ${n} respuestas redactadas por el modelo con referencias a sus fuentes${fb ? ` · ${fb} con el texto preparado` : ''}`, `${llm.generated} of ${n} answers drafted by the model with references to their sources${fb ? ` · ${fb} with the prepared text` : ''}`)
        : '',
      ms: done ? llm.ms : 0,
      tone: done && fb ? 'warn' : undefined
    };
  }
  function streamSteps(llm) {
    const t = tokens();
    const head = [
      { agent: AGENT, system: 'Outlook', action: `Lee el correo de ${QN.via} y el adjunto ${QN.file}`, result: `${QS.length} preguntas en ${SECS.length} bloques · plazo ${fmt.date(QN.due)}`, ms: 420 },
      { agent: AGENT, system: 'Agentic Platform', action: QD.identify_action || 'Identifica el cliente y el alcance del cuestionario', result: fill(QD.identify_result), ms: 180 },
      { agent: AGENT, system: 'Procedimientos', action: `Busca en los ${DOC_COUNT} documentos indexados: ${QD.search_scope}`, result: `Fragmentos citables para ${DRAFTED} de ${QS.length} preguntas`, ms: 860 }
    ];
    const lookups = (QD.lookups || []).map((s) => Object.assign({ agent: AGENT, ms: 420 }, s, { action: fill(s.action), result: fill(s.result) }));
    const tail = [
      llm ? llmStep(llm) : { agent: AGENT, system: 'Modelo de lenguaje', action: `Redacta${BI ? ' en inglés, con traducción,' : ''} solo con los fragmentos encontrados (${DRAFTED} llamadas)`, result: `${DRAFTED} borradores con referencias a sus fuentes`, ms: 11200 },
      { agent: AGENT, system: 'Agentic Platform', action: 'Comprueba que cada cita aparece literalmente en su fuente', result: `${CITES_OK} de ${CITES_TOTAL} citas verificadas`, ms: 140, tone: CITES_OK === CITES_TOTAL ? 'ok' : 'crit' },
      { agent: AGENT, system: 'Agentic Platform', action: 'Asigna el nivel de confianza de cada respuesta', result: `${t.alta} de confianza alta · ${t.media} de confianza media: falta un dato que pide el cliente`, ms: 90 },
      { agent: AGENT, system: 'Agentic Platform', action: 'Marca las preguntas sin evidencia suficiente', result: `${t.flagged_ids}: requieren revisión de ${TEAM}; no se redacta respuesta`, ms: 70, tone: 'warn' },
      { agent: AGENT, system: QD.save_system, action: `Guarda el borrador ${QN.code} para su revisión`, result: `Pendiente de ${REVIEWER}`, ms: 260, tone: 'ok' }
    ];
    return head.concat(lookups, tail);
  }
  const SYSTEMS = Array.from(new Set(streamSteps().map((s) => s.system).filter((s) => !INTERNAL[s])));

  /* ---------------------------------------------------------------- Piezas de la vista */

  function confChip(q, long) { const c = CONF[q.conf]; return chip({ tone: c.tone, label: long ? c.long : c.label }); }
  function stChip(a) {
    switch (a.st) {
      case 'draft': return chip('draft', a.manual ? `Borrador de ${TEAM}` : 'Borrador');
      case 'approved': return chip('approved', 'Aprobada');
      case 'discarded': return chip('rejected', 'Descartada');
      case 'flagged': return chip('review', 'Requiere revisión');
      case 'assigned': return chip('pending', `Asignada a ${TEAM}`);
      default: return chip('draft', 'Sin responder');
    }
  }
  function rowTone(a) {
    if (a.st === 'approved') return 'tone-ok';
    if (a.st === 'flagged' || a.st === 'assigned') return 'tone-warn';
    if (a.st === 'discarded') return 'is-muted';
    return '';
  }
  function srcRef(s) { return s.code || s.label || ''; }
  /** Apartado (y página, si la hay) donde aparece una cita. */
  function citeLoc(c) {
    if (!c || !c.ok) return '';
    const h = c.heading ? (/^\d/.test(c.heading) ? `apdo. ${c.heading}` : c.heading) : '';
    return [h, c.page ? `pág. ${c.page}` : ''].filter(Boolean).join(' · ');
  }
  /** Resumen de fuentes de una pregunta para la tabla (códigos sin cortar por el guion). */
  function srcSummary(q) {
    if (q.flag) return q.flag.partial && q.flag.partial.length ? 'Solo evidencia parcial' : 'Sin fuente indexada';
    const ids = Array.from(new Set(q.cites.map((c) => c.src)));
    const docs = ids.filter((id) => SOURCES[id].type === 'doc').map((id) => srcRef(SOURCES[id]));
    const recs = ids.filter((id) => SOURCES[id].type === 'record').length;
    const parts = docs.map((d) => html`<span class="nowrap">${d}</span>`);
    if (recs) parts.push(html`<span class="nowrap">${fmt.plural(recs, 'registro', 'registros')}</span>`);
    return parts.map((x, i) => html`${i ? ' · ' : ''}${x}`);
  }
  function matchFilter(q, L, f) {
    const st = ansOf(L, q.id).st;
    if (f === 'pending') return !!UNDECIDED[st];
    if (f === 'approved') return st === 'approved';
    if (f === 'quality') return !!q.flag;
    return true;
  }
  /** Texto de respuesta con las referencias [n] convertidas en botones de cita; los códigos no se cortan. */
  const CODE_RE = /\b[A-Z][A-Z0-9]*(?:[-/][A-Z0-9]+)+\b/g;
  function answerHTML(text, ncites) {
    return raw(String(text || '').split(/(\[\d+\])/).map((part) => {
      const m = /^\[(\d+)\]$/.exec(part);
      const n = m ? Number(m[1]) : 0;
      if (n >= 1 && n <= ncites) return `<button type="button" class="cite" data-cite="${n}" title="Ver la fuente ${n}">${n}</button>`;
      return esc(part).replace(CODE_RE, (code) => `<span class="nowrap">${code}</span>`);
    }).join(''));
  }
  /** Texto de nota con marcas [[lot:CODIGO]] convertidas en etiquetas de traza. */
  function richText(s) {
    return raw(String(s || '').split(/(\[\[lot:[^\]]+\]\])/).map((part) => {
      const m = /^\[\[lot:([^\]]+)\]\]$/.exec(part);
      if (m) return String(App.lotTag(m[1]));
      return esc(part).replace(CODE_RE, (code) => `<span class="nowrap">${code}</span>`);
    }).join(''));
  }

  function kpis(L, ran) {
    const c = counts(L);
    const K = QD.kpi;
    return html`<div class="kpis">
      ${App.kpi({ label: K.label, value: K.value, unit: K.unit, sub: K.sub, icon: K.icon || 'shield-check' })}
      ${App.kpi({ label: 'Preguntas del cuestionario', value: QS.length, sub: ran ? `${DRAFTED} con borrador citado · ${FLAGGED.length} para ${TEAM}` : `${SECS.length} bloques · ${BI ? 'en inglés · ' : ''}plazo ${fmt.date(QN.due)}`, icon: 'list-checks' })}
      ${App.kpi({ label: 'Fuentes indexadas', value: DOC_COUNT, unit: 'documentos', sub: `${QD.sources_sub} · registros de ${SYSTEMS.length} sistemas`, icon: 'book-open' })}
      ${App.kpi({ label: 'Respuestas aprobadas', value: `${c.approved} de ${QS.length}`, sub: ran ? (L.completedAt ? `Revisión completada a las ${fmt.time(L.completedAt)}` : `Decide: ${REVIEWER}`) : `Nada se envía sin la aprobación de ${TEAM}`, icon: 'user-check', tone: L.completedAt ? 'ok' : undefined })}
    </div>`;
  }

  function questionsCard(L, ran) {
    const c = counts(L);
    const filter = ran ? (L.filter || 'all') : 'all';
    const confTone = { alta: 't-ok', media: 't-warn', none: '' };
    const cols = [
      { label: 'Nº', width: '52px', render: (q) => html`<span class="code strong">${q.id}</span>` },
      { label: 'Pregunta', render: (q) => html`<span class="strong">${q.topic}</span><span class="sub">${ran ? srcSummary(q) : secName(SEC[q.sec])}</span>` },
      { label: 'Estado y confianza', width: '156px', stackLabel: 'Estado', render: (q) => html`${stChip(ansOf(L, q.id))}${ran ? html`<span class="sub ${confTone[q.conf]}">${q.conf === 'none' ? CONF.none.label : CONF[q.conf].long}</span>` : ''}` }
    ];
    const visible = QS.filter((q) => matchFilter(q, L, filter)).length;
    return App.card({
      id: 'cq-questions',
      title: 'Preguntas del cuestionario',
      sub: ran ? `${c.decided} de ${QS.length} decididas · ${c.approved} aprobadas` : `${QS.length} preguntas en ${SECS.length} bloques · ${QN.file}`,
      icon: 'list-checks',
      flush: true,
      actions: ran ? App.segmented({ name: 'cq-filter', label: 'Filtrar preguntas', value: filter, options: [
        { value: 'all', label: 'Todas', count: QS.length },
        { value: 'pending', label: 'Por decidir', count: c.undecided, tone: 'warn' },
        { value: 'approved', label: 'Aprobadas', count: c.approved, tone: 'ok' },
        { value: 'quality', label: `Para ${TEAM}`, count: FLAGGED.length }
      ] }) : '',
      body: html`${App.table({
        class: 'cq-table',
        dense: true,
        clickable: ran,
        cols,
        rows: QS,
        rowClass: (q) => [ran && q.id === L.sel ? 'is-selected' : '', ran ? rowTone(ansOf(L, q.id)) : ''].filter(Boolean).join(' '),
        rowAttrs: (q) => ({ 'data-q': q.id, 'data-st': ansOf(L, q.id).st, hidden: ran && !matchFilter(q, L, filter) ? true : null })
      })}<p class="cq-empty muted small" ${visible ? raw('hidden') : ''}>Ninguna pregunta con este filtro.</p>`,
      footer: ran
        ? html`<span class="muted small">Confianza <strong>alta</strong>: respaldada literalmente por un documento o un registro · <strong>media</strong>: falta un dato que pide el cliente · <strong>sin evidencia suficiente</strong>: no se redacta.</span>`
        : html`<span class="muted small">${SECS.map((s) => `${s.id} · ${secName(s)}`).join(' · ')}</span>`
    });
  }

  function emailCard() {
    return App.card({
      id: 'cq-detail',
      class: 'cq-panel',
      title: `Correo recibido · ${QN.via}`,
      sub: `${fmt.cap(fmt.dateLong(QN.received))} · ${fmt.time(QN.received)} · ${EMAIL.mailbox || 'buzón de Calidad'}`,
      icon: 'mail',
      body: App.emailView({ headers: EMAIL.headers, text: EMAIL.text, highlights: EMAIL.highlights, attachments: [QN.file] }),
      footer: html`${sys('Outlook')}<span class="muted small">${QS.length} preguntas${BI ? ' en inglés' : ''} · ${QN.scope_label}</span><span class="spacer"></span><button type="button" class="btn btn-primary btn-sm" data-action="prepare">${icon('play', 15)}<span>Preparar respuestas</span></button>`
    });
  }

  function questionBlock(q, lang) {
    if (!BI) {
      return html`<div class="cq-block">
        <div class="cq-label"><span>Pregunta del cliente</span>${q.ref ? html`<span class="code">${q.ref}</span>` : ''}</div>
        <p class="cq-question" data-no-translate>${qText(q, MK)}</p>
      </div>`;
    }
    const main = lang === 'en' ? q.qEn : q.qEs;
    const other = lang === 'en' ? q.qEs : q.qEn;
    return html`<div class="cq-block">
      <div class="cq-label"><span>Pregunta del cliente${q.ref ? html` · <span class="code">${q.ref}</span>` : ''}</span>${App.segmented({ name: 'cq-lang', label: 'Idioma de la vista', value: lang, options: [{ value: 'es', label: 'Español' }, { value: 'en', label: 'Inglés (envío)' }] })}</div>
      <p class="cq-question" data-no-translate>${main}</p>
      <p class="cq-orig"><b>${lang === 'en' ? 'Traducción' : 'Original en inglés'}:</b> ${other}</p>
    </div>`;
  }

  function answerBlock(q, a, lang) {
    let text = textOf(q, a, lang);
    let fallback = false;
    if (!text && lang === 'es' && BI) { text = textOf(q, a, 'en'); fallback = true; }
    const label = a.st === 'approved' ? 'Respuesta aprobada' : a.st === 'discarded' ? 'Borrador descartado' : a.manual ? `Respuesta redactada por ${TEAM}` : 'Respuesta propuesta';
    const tags = [llmBadge(a), a.edited ? chip('info', `Editada por ${TEAM}`) : '', a.manual ? chip('neutral', 'Sin fuente indexada', { dot: false }) : ''];
    const cls = `cq-answer${a.st === 'approved' ? ' is-approved' : ''}${a.st === 'discarded' ? ' is-discarded' : ''}`;
    const which = BI ? (lang === 'en' ? ' · texto para el cliente' : ' · traducción de revisión') : '';
    return html`<div class="cq-block">
      <div class="cq-label"><span>${label}${which}</span><span class="lbl">${tags}</span></div>
      <div class="${cls}" data-answer lang="${lang}" data-no-translate>${answerHTML(text, a.manual ? 0 : (q.cites || []).length)}</div>
      ${fallback ? html`<p class="xs muted mt-1">Sin traducción de revisión: se muestra el texto en inglés.</p>` : ''}
      ${a.st === 'discarded' && a.reason ? html`<p class="small slate mt-2">Motivo del descarte: ${a.reason}</p>` : ''}
    </div>`;
  }

  /** Etiqueta discreta con el modelo que redactó la respuesta (solo si el texto mostrado es suyo). */
  function llmBadge(a) {
    if (!a || !a.llm) return '';
    return html`<span class="llm-badge" title="${EN_UI ? 'Drafted by the model' : 'Redactada por el modelo'}" data-no-translate>${icon('cpu', 12)}${a.llm}</span>`;
  }

  function editBlock(q, a) {
    const hint = q.flag
      ? `Sin fuente indexada: la respuesta quedará marcada como redactada por ${TEAM}, sin citas.`
      : 'Las referencias [1], [2]… enlazan con las fuentes citadas. Si cambias el contenido, comprueba que la fuente lo siga respaldando.';
    return html`<div class="cq-block cq-edit">
      <div class="cq-label"><span>${q.flag ? `Redactar respuesta (${TEAM})` : 'Editar respuesta'}</span></div>
      ${BI
        ? html`<div class="field"><label class="label" for="cq-en">Respuesta para el cliente (inglés)</label><textarea id="cq-en" class="textarea" rows="6">${textOf(q, a, 'en')}</textarea></div>
      <div class="field mt-3"><label class="label" for="cq-es">Traducción de revisión (español)</label><textarea id="cq-es" class="textarea" rows="6">${textOf(q, a, 'es')}</textarea>
        <span class="hint" id="cq-edit-hint">${hint}</span></div>`
        : html`<div class="field"><label class="label" for="cq-es">Respuesta para el cliente</label><textarea id="cq-es" class="textarea" rows="8">${textOf(q, a, MK)}</textarea>
        <span class="hint" id="cq-edit-hint">${hint}</span></div>`}
    </div>`;
  }

  function srcItem(c, n, key, why) {
    const src = SOURCES[c.src];
    const loc = citeLoc(c);
    return html`<li class="cq-src" data-src-item="${key}">
      <span class="cq-src-n">${n}</span>
      <div class="cq-src-main">
        <div class="cq-src-head">${src.code ? html`<span class="code">${src.code}</span>` : ''}<span class="cq-src-title">${src.title}</span></div>
        <div class="cq-src-meta">${src.type === 'record' ? sys(src.system) : ''}${chip('neutral', src.kind, { dot: false })}${loc ? html`<span class="cq-src-loc">${loc}</span>` : ''}${c.ok ? chip({ tone: 'ok', icon: 'check', label: 'Cita verificada', size: 'sm' }) : chip({ tone: 'crit', icon: 'x', label: 'Cita no encontrada', size: 'sm' })}</div>
        <p class="cq-quote">«${c.ok ? html`<mark class="hl hl-brand">${c.frag}</mark>` : c.q}»</p>
        ${why ? html`<p class="cq-why">${why}</p>` : ''}
        <div><button type="button" class="link-btn small" data-src="${key}">Ver en la fuente</button></div>
      </div>
    </li>`;
  }

  function sourcesBlock(q) {
    const cites = q.cites || [];
    const ok = cites.filter((c) => c.ok).length;
    return html`<div class="cq-block">
      <div class="cq-label"><span>Fuentes citadas · ${cites.length}</span><span class="${ok === cites.length ? 't-ok' : 't-crit'}">${ok} de ${cites.length} verificadas en su fuente</span></div>
      <ol class="cq-srcs">${cites.map((c, i) => srcItem(c, i + 1, `c${i + 1}`))}</ol>
    </div>`;
  }

  function gapBlock(q) {
    const out = q.gapOutcome ? App.outcome(q.gapOutcome) : null;
    return App.callout({
      tone: 'warn',
      icon: 'alert-triangle',
      title: 'Confianza media: falta un dato que pide el cliente',
      body: html`<p>${q.gap}</p>${out ? html`<p class="mt-2">${q.gapOutcomeText ? fill(q.gapOutcomeText, { label: out.label }) : `En esta sesión ya hay un resultado: ${out.label}. Añádelo a la respuesta si procede.`}</p>` : ''}`,
      actions: q.gapGo ? html`<button type="button" class="btn btn-secondary btn-sm" data-go="${q.gapGo}">${q.gapGoLabel}${icon('arrow-right', 15)}</button>` : ''
    });
  }

  function flagBlocks(q) {
    const f = q.flag;
    return html`${App.callout({ tone: 'warn', icon: 'search', title: 'No hay evidencia suficiente en los documentos indexados', body: html`<p>${fill(f.reason)}</p><p class="mt-1">Agentic Platform no redacta una respuesta sin fuente.</p>` })}
      ${f.partial && f.partial.length ? html`<div class="cq-block"><div class="cq-label"><span>Evidencia parcial encontrada · ${f.partial.length}</span><span>No basta para responder</span></div><ol class="cq-srcs">${f.partial.map((c, i) => srcItem(c, i + 1, `p${i + 1}`, c.why))}</ol></div>` : ''}
      ${f.context ? App.callout({ tone: 'brand', icon: 'info', title: 'Contexto', body: f.context }) : ''}
      <div class="cq-block"><div class="cq-label"><span>Qué falta para responder</span></div><ul class="cq-missing">${f.missing.map((m) => html`<li>${m}</li>`)}</ul></div>`;
  }

  /**
   * Nota interna de una pregunta. Datos: {tone, icon, title, text, go, goLabel, outcome, requires,
   * text_done, tone_done, with: {approved|rejected|done|any: '…{label}'}, without}.
   * Con «outcome», la nota se adapta al resultado de esa escena en la sesión (App.outcome).
   */
  function noteOf(q) {
    const n = q.note;
    if (!n) return null;
    const out = n.outcome ? App.outcome(n.outcome) : null;
    if (n.requires && !(out && (n.requires === 'any' || out.status === n.requires))) return null;
    const base = out && n.text_done ? n.text_done : n.text;
    const tail = out ? ((n.with && (n.with[out.status] || n.with.any)) || '') : (n.without || '');
    return {
      tone: out && n.tone_done ? n.tone_done : n.tone,
      icon: n.icon,
      title: fill(n.title).replace(/\s+·\s*$|\s{2,}/g, ' ').trim(),
      text: fill(`${base}${tail ? ` ${tail}` : ''}`, { label: out ? out.label : '' }),
      go: n.go,
      goLabel: n.goLabel
    };
  }

  function noteBlock(n) {
    return App.callout({
      tone: n.tone || 'brand',
      icon: n.icon,
      title: n.title,
      attrs: { 'data-note': '' },
      body: html`<p>${richText(n.text)}</p><p class="xs muted mt-1">Nota interna: no forma parte de la respuesta al cliente.</p>`,
      actions: n.go ? html`<button type="button" class="btn btn-secondary btn-sm" data-go="${n.go}">${n.goLabel}${icon('arrow-right', 15)}</button>` : ''
    });
  }

  function footerFor(L, q, a, editing) {
    if (editing) {
      return html`<span class="spacer"></span><button type="button" class="btn btn-ghost btn-sm" data-action="cancel-edit">Cancelar</button><button type="button" class="btn btn-primary btn-sm" data-action="save-edit">${icon('save', 15)}<span>Guardar cambios</span></button>`;
    }
    const nxt = nextPending(L, q.id);
    const nextBtn = nxt ? html`<button type="button" class="btn btn-ghost btn-sm" data-action="next" data-next="${nxt}">${icon('arrow-right', 15)}<span>Siguiente por decidir · ${nxt}</span></button>` : '';
    switch (a.st) {
      case 'draft':
        return html`${nextBtn}<span class="spacer"></span>
          <button type="button" class="btn btn-ghost btn-sm" data-action="edit">${icon('edit', 15)}<span>Editar</span></button>
          ${a.manual ? '' : html`<button type="button" class="btn btn-secondary btn-sm" data-action="discard">${icon('x', 15)}<span>Descartar</span></button>`}
          <button type="button" class="btn btn-primary btn-sm" data-action="approve">${icon('check', 15)}<span>Aprobar respuesta</span></button>`;
      case 'approved':
        return html`<span class="cq-foot-status">${icon('check-circle', 16)}<span>Aprobada por ${a.by} · ${fmt.time(a.at)}${a.via === 'bulk' ? ' · en bloque' : ''}</span></span><span class="spacer"></span>${nextBtn}<button type="button" class="btn btn-ghost btn-sm" data-action="reopen">${icon('rotate-ccw', 15)}<span>Reabrir</span></button>`;
      case 'discarded':
        return html`<span class="cq-foot-status tone-muted">${icon('x-circle', 16)}<span>Descartada · no se exporta como respuesta</span></span><span class="spacer"></span>${nextBtn}<button type="button" class="btn btn-secondary btn-sm" data-action="restore">${icon('rotate-ccw', 15)}<span>Recuperar borrador</span></button>`;
      case 'flagged':
        return html`${nextBtn}<span class="spacer"></span>
          <button type="button" class="btn btn-secondary btn-sm" data-action="assign">${icon('user-check', 15)}<span>Asignar a ${ASSIGNEE_SHORT}</span></button>
          <button type="button" class="btn btn-primary btn-sm" data-action="edit">${icon('edit', 15)}<span>Redactar respuesta</span></button>`;
      case 'assigned':
        return html`<span class="cq-foot-status tone-warn">${icon('user-check', 16)}<span>Asignada a ${a.to} · ${fmt.time(a.at)}</span></span><span class="spacer"></span>${nextBtn}<button type="button" class="btn btn-secondary btn-sm" data-action="edit">${icon('edit', 15)}<span>Redactar respuesta</span></button>`;
      default:
        return '';
    }
  }

  function detailPanel(ctx, L) {
    const q = QBY[L.sel] || QBY[DEFAULT_SEL] || QS[0];
    const a = ansOf(L, q.id);
    const lang = BI ? (L.lang === 'en' ? 'en' : 'es') : MK;
    const editing = ctx.vars.editing === q.id;
    const blocks = [questionBlock(q, lang)];
    if (q.flag) {
      if (editing) blocks.push(editBlock(q, a));
      else if (a.manual) blocks.push(answerBlock(q, a, lang));
      blocks.push(flagBlocks(q));
    } else {
      blocks.push(editing ? editBlock(q, a) : answerBlock(q, a, lang));
      const note = noteOf(q);
      if (note) blocks.push(noteBlock(note));
      if (q.gap) blocks.push(gapBlock(q));
      blocks.push(sourcesBlock(q));
    }
    return App.card({
      id: 'cq-detail',
      class: 'cq-panel',
      attrs: { 'data-q': q.id, 'data-st': a.st },
      title: `${q.id} · ${q.topic}`,
      sub: `Bloque ${q.sec} · ${secName(SEC[q.sec])}`,
      icon: q.flag ? 'alert-triangle' : 'message-square',
      iconTone: q.flag ? 'warn' : undefined,
      actions: html`${confChip(q, true)}${stChip(a)}`,
      body: html`<div class="cq-body">${blocks}</div>`,
      footer: footerFor(L, q, a, editing)
    });
  }

  function resultCard(L) {
    const c = counts(L);
    const altaPending = QS.filter((q) => q.conf === 'alta' && ansOf(L, q.id).st === 'draft').length;
    const flagPending = FLAGGED.filter((q) => ansOf(L, q.id).st === 'flagged').length;
    const buttons = [
      altaPending ? html`<button type="button" class="btn btn-primary" data-action="approve-high">${icon('check')}<span>Aprobar las ${altaPending} de confianza alta</span></button>` : '',
      flagPending ? html`<button type="button" class="btn btn-secondary" data-action="assign-all">${icon('user-check')}<span>Asignar ${flagPending === 1 ? 'la pregunta sin fuente' : `las ${flagPending} sin fuente`} a ${ASSIGNEE_SHORT}</span></button>` : ''
    ].filter(Boolean);
    return App.card({
      id: 'cq-result',
      title: `Borradores preparados a las ${fmt.time(L.run.at)} en ${fmt.ms(L.run.ms)}`,
      sub: `${DRAFTED} de ${QS.length} preguntas con borrador y cita verificada · ${FLAGGED.length} sin evidencia suficiente, marcadas para ${TEAM}`,
      icon: 'list-checks',
      actions: html`${L.completedAt ? chip('done', `Revisión completada · ${fmt.time(L.completedAt)}`) : chip('pending', `${c.undecided} por decidir`)}<button type="button" class="btn btn-ghost btn-sm" data-action="email">${icon('mail', 15)}<span>Ver el correo</span></button>`,
      body: html`<div class="stack">
        ${App.stats([
          { label: 'Con borrador y cita', value: DRAFTED },
          { label: 'Confianza alta', value: c.alta, tone: 'ok' },
          { label: 'Confianza media', value: c.media, tone: 'warn' },
          { label: 'Sin evidencia suficiente', value: c.none, tone: 'warn' },
          { label: 'Citas verificadas en su fuente', value: `${CITES_OK} de ${CITES_TOTAL}`, tone: CITES_OK === CITES_TOTAL ? 'ok' : 'crit' },
          { label: 'Respuestas aprobadas', value: `${c.approved} de ${QS.length}` }
        ])}
        ${buttons.length ? html`<div class="row">${buttons}</div>` : ''}
        <div class="row row-nowrap muted small" style="align-items:flex-start">${icon('shield-check', 16)}<span>Política aplicada: nada se envía al cliente sin la aprobación de ${REVIEWER}; la aprobación en bloque solo incluye respuestas de confianza alta y las preguntas sin fuente indexada no se responden.</span></div>
        <details class="run-log">
          <summary>${icon('chevron-right', 16)}<span>Registro de ejecución · ${L.run.steps} pasos · ${fmt.ms(L.run.ms)}</span></summary>
          <div class="mt-2" id="cq-log"></div>
        </details>
      </div>`
    });
  }

  function compareCard(L) {
    const c = counts(L);
    const run = L.run;
    const done = !!L.completedAt;
    const review = done ? secsBetween(run.at, L.completedAt) : 0;
    const H = QD.compare;
    const appr = [];
    if (c.bulk) appr.push(`1 aprobación en bloque (${c.bulk} respuestas)`);
    if (c.single) appr.push(`${c.single} ${c.single === 1 ? 'aprobación individual' : 'aprobaciones individuales'}`);
    if (c.assigned) appr.push(`${c.assigned} ${c.assigned === 1 ? 'pregunta asignada' : 'preguntas asignadas'} a ${ASSIGNEE_SHORT}`);
    const rows = [
      { k: 'Personas', hoy: H.people, con: `1 revisor (${REVIEWER}); ${ASSIGNEE} completa las ${FLAGGED.length} preguntas sin fuente` },
      { k: 'Sistemas y documentos abiertos', hoy: H.systems, con: `Ninguno por parte del revisor: Agentic Platform consultó ${DOC_COUNT} documentos y ${SYSTEMS.length} sistemas, y cada respuesta enlaza su fuente` },
      { k: 'Pasos', hoy: H.steps, con: `${run.steps} pasos automáticos${appr.length ? ` · ${fmt.list(appr)}` : ` · aprobación de ${TEAM} pendiente`}` },
      { k: 'Tiempo', hoy: H.time, con: done ? `Borrador del agente en ${fmt.ms(run.ms)} · revisión de ${TEAM} de ${fmt.dur(review)}, medida en esta sesión` : `Borrador del agente en ${fmt.ms(run.ms)} · revisión en curso (${c.decided} de ${QS.length} decididas)`, time: true }
    ];
    return App.card({
      id: 'cq-compare',
      title: 'Hoy y con Agentic Platform · este cuestionario',
      sub: '«Hoy»: supuesto ilustrativo, a validar con vuestra línea base en el piloto · «Con Agentic Platform»: duración de la simulación, no rendimiento de producción',
      icon: 'bar-chart',
      flush: true,
      body: App.table({
        cols: [
          { label: '', width: '20%', render: (r) => html`<span class="strong">${r.k}</span>` },
          { label: 'Hoy (estimación)', width: '38%', render: (r) => (r.time ? html`<span class="strong">${r.hoy}</span>` : r.hoy) },
          { label: 'Con Agentic Platform (simulación)', render: (r) => (r.time ? html`<span class="strong${done ? ' t-ok' : ''}">${r.con}</span>` : r.con) }
        ],
        rows,
        rowAttrs: (r) => ({ 'data-row': r.k })
      }),
      footer: html`<span class="muted small">«Hoy» se sustituye por la línea base medida en las semanas 1–2 del piloto. «Con Agentic Platform» incluye la revisión humana, no solo el agente.</span><span class="spacer"></span>${done ? html`<button type="button" class="btn btn-primary btn-sm" data-action="pdf">${icon('printer', 15)}<span>Descargar cuestionario (PDF)</span></button>` : ''}`
    });
  }

  /* ---------------------------------------------------------------- Acciones */

  function setAns(ctx, patchById) {
    const ans = Object.assign({}, ctx.local.ans);
    Object.keys(patchById).forEach((id) => { ans[id] = Object.assign({}, ans[id], patchById[id]); });
    ctx.setLocal({ ans });
  }

  function checkComplete(ctx) {
    const L = ctx.local;
    if (!L.run || !L.ans) return;
    const c = counts(L);
    if (!c.undecided && !L.completedAt) {
      const at = App.nowISO();
      ctx.setLocal({ completedAt: at });
      const label = `${c.approved} de ${c.total} respuestas aprobadas${c.assigned ? ` · ${c.assigned} asignadas a ${ASSIGNEE_SHORT}` : ''}`;
      App.outcome('cuestionario', { status: 'done', label });
      App.audit('Revisión del cuestionario completada', `${QN.code} · ${label} · revisión de ${fmt.dur(secsBetween(L.run.at, at))}`);
      App.toast(`Revisión completada · ${label}`, { tone: 'ok' });
    } else if (c.undecided && L.completedAt) {
      ctx.setLocal({ completedAt: null });
      App.outcome('cuestionario', null);
    }
  }
  function decided(ctx) { checkComplete(ctx); ctx.rerender(); }

  /** Desplaza la ventana (no solo la vista visual en móvil) para dejar el elemento bajo la barra superior. */
  function scrollToEl(el) {
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 68;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }

  function select(ctx, id) {
    if (!QBY[id]) return;
    ctx.vars.editing = null;
    ctx.setLocal({ sel: id });
    ctx.rerender();
    requestAnimationFrame(() => {
      const panel = ctx.$('#cq-detail');
      if (!panel) return;
      const r = panel.getBoundingClientRect();
      const narrow = window.matchMedia('(max-width: 1023px)').matches;
      if (narrow || r.top < 0 || r.top > window.innerHeight - 160) scrollToEl(panel);
    });
  }

  /* ---------------------------------------------------------------- Modo Local: redacción con el modelo */

  /**
   * Limpia la respuesta del modelo y valida sus referencias: [1, 2] → [1][2], fuera de rango se quitan.
   * Devuelve {text, cited} (cited: hay al menos una referencia válida).
   */
  function cleanModel(raw0, n) {
    let t = String(raw0 || '').replace(/\r/g, '');
    t = t.replace(/\*\*|__/g, '').replace(/^#+\s*/gm, '').replace(/^\s*(?:[-*•]|\d+[.)])\s+/gm, '');
    t = t.replace(/^\s*(?:answer|respuesta)\s*:\s*/i, '');
    t = t.split(/\n+/).map((l) => l.trim()).filter(Boolean).join(' ');
    t = t.replace(/\[(\d+(?:\s*[,;–-]\s*\d+)+)\]/g, (m, g) => {
      const parts = g.split(/\s*[,;]\s*/);
      const out = [];
      parts.forEach((p) => {
        const r = /^(\d+)\s*[–-]\s*(\d+)$/.exec(p);
        if (r) { for (let i = +r[1]; i <= +r[2] && i - +r[1] < 10; i++) out.push(i); } else out.push(+p);
      });
      return out.map((i) => `[${i}]`).join('');
    });
    let cited = false;
    t = t.replace(/\s*\[(\d+)\]/g, (m, d) => {
      const i = Number(d);
      if (i >= 1 && i <= n) { cited = true; return m; }
      return '';
    });
    t = t.replace(/\s+([.,;:])/g, '$1').replace(/\s{2,}/g, ' ').trim();
    return { text: t, cited };
  }

  /** Pide al modelo la respuesta de una pregunta con los pasajes citados de la respuesta preparada. */
  async function draftWithModel(q, lang, signal) {
    const en = lang === 'en';
    const passages = q.cites.map((c, i) => {
      const src = SOURCES[c.src];
      const loc = citeLoc(c);
      return `[${i + 1}] ${srcRef(src)} · ${src.title}${loc ? ` (${loc})` : ''}: ${c.ok ? c.frag : c.q}`;
    });
    const org = QD.responder || (META && META.company) || '';
    const system = en
      ? `You are the ${AGENT} agent of Agentic Platform, drafting the answers of ${org} to the ${QN.title} sent by ${QN.customer}. Answer the customer's question in the first person plural on behalf of ${org}, using ONLY the numbered passages from its documents and system records. Every sentence must end with the citation of the passage(s) it comes from, written as [n]. Do not invent figures, dates, roles or commitments that are not in the passages, and keep codes, figures and names exactly as written. If the passages do not answer the question, reply exactly NO_EVIDENCE. Write in English, as one paragraph of at most 5 sentences, without a title or preamble.`
      : `Eres el agente ${AGENT} de Agentic Platform y redactas las respuestas de ${org} al ${QN.title} de ${QN.customer}. Responde a la pregunta del cliente en primera persona del plural en nombre de ${org}, usando SOLO los pasajes numerados de sus documentos y registros. Cada frase debe terminar con la cita del pasaje o pasajes de los que sale, escrita como [n]. No inventes cifras, fechas, responsables ni compromisos que no estén en los pasajes, y conserva los códigos, cifras y nombres tal como aparecen. Si los pasajes no responden a la pregunta, responde exactamente NO_EVIDENCE. Escribe en español, en un solo párrafo de 5 frases como máximo, sin título ni preámbulo.`;
    const user = `${en ? 'Question' : 'Pregunta'} ${q.id}${q.ref ? ` (${q.ref})` : ''}: ${qText(q, lang)}\n\n${en ? 'Passages' : 'Pasajes'}:\n${passages.join('\n')}`;
    const r = await App.llm.chat({ system, user, maxTokens: 600, temperature: 0.1, signal });
    if (/NO_EVIDENCE/.test(r.text)) return { ok: false, reason: LT('el modelo no encuentra la respuesta en los pasajes', 'the model cannot find the answer in the passages') };
    const c = cleanModel(r.text, q.cites.length);
    if (!c.text || !c.cited) return { ok: false, reason: LT('el modelo no ha citado ninguna fuente', 'the model did not cite any source') };
    return { ok: true, text: c.text, model: r.model, ms: r.ms };
  }

  /**
   * Redacta con el modelo las preguntas con fuentes (las de confianza «none» no se envían), 3 a la vez.
   * onProgress(hechas, total). Devuelve {results: {id: {ok, text, model, reason}}, ms, generated, fallback, errors}.
   */
  async function draftAll(signal, onProgress) {
    const list = QS.filter((q) => !q.flag && q.conf !== 'none' && q.cites && q.cites.length);
    const results = {};
    const t0 = performance.now();
    let next = 0;
    let done = 0;
    async function worker() {
      while (next < list.length) {
        const q = list[next++];
        try {
          results[q.id] = await draftWithModel(q, CL, signal);
        } catch (e) {
          results[q.id] = { ok: false, error: true, reason: e && e.message ? e.message : String(e) };
        }
        done += 1;
        if (onProgress) { try { onProgress(done, list.length); } catch (e) { /* solo visual */ } }
        if (signal && signal.aborted) return;
      }
    }
    await Promise.all([worker(), worker(), worker()]);
    const ok = list.filter((q) => results[q.id] && results[q.id].ok);
    return {
      results, list,
      ms: Math.round(performance.now() - t0),
      generated: ok.length,
      fallback: list.length - ok.length,
      model: (ok[0] && results[ok[0].id].model) || App.llm.model
    };
  }

  async function prepare(ctx) {
    if ((ctx.local.run && ctx.local.ans) || ctx.vars.busy) return;
    ctx.vars.busy = true;
    const startedAt = App.nowISO();
    App.audit('Preparación de respuestas solicitada', `${QN.code} · ${QS.length} preguntas · ${QN.customer}${QN.via !== QN.customer ? ` vía ${QN.via}` : ''}`);
    ctx.$$('[data-action="prepare"]').forEach((b) => {
      b.disabled = true;
      b.classList.add('is-busy');
      b.innerHTML = String(html`<span class="spinner"></span><span>Preparando respuestas…</span>`);
    });
    const host = ctx.$('#cq-run');
    host.hidden = false;
    scrollToEl(host);
    ctx.presenter({ next: 'Mientras corre: «Fijaos en qué sistema toca cada paso; el modelo solo redacta con los fragmentos encontrados y cada cita se comprueba». Si hace falta, pulsa «Acelerar».' });
    // Modo Local: el paso del modelo queda «en curso» hasta que terminan las llamadas reales y entonces se cierra
    // con su tiempo real (los pasos siguientes son comprobaciones en código y se completan a la vez).
    const local = !!(App.llm && App.llm.isLocal());
    const llm = local ? { system: App.llm.systemName(), model: App.llm.model, total: QS.filter((q) => !q.flag).length } : null;
    const steps = streamSteps(llm);
    const llmIdx = steps.findIndex((x) => x.llm);
    let drafted = null;
    let run = null;
    const opts = { title: `Agente ${AGENT} · ${QN.code}`, signal: ctx.signal, maxHeight: 400, start: startedAt };
    if (local) {
      steps[llmIdx].wait = 2e9;
      Object.assign(opts, {
        controls: false,
        maxDelay: 2e9,
        onStep: (x, k) => {
          if (k !== llmIdx - 1) return;
          const action = steps[llmIdx].action;
          const progress = (d, n) => {
            const el = host.querySelector('.rs-line.is-running .rs-action');
            if (el) el.textContent = `${action} · ${LT(`${d} de ${n} redactadas`, `${d} of ${n} drafted`)}`;
          };
          drafted = draftAll(ctx.signal, progress).then((r) => {
            Object.assign(llm, { ms: r.ms, generated: r.generated, fallback: r.fallback, model: r.model });
            Object.assign(steps[llmIdx], llmStep(llm), { wait: 0 });
            if (ctx.alive() && run) run.finish();
            return r;
          });
        }
      });
    }
    run = App.reasoningStream(host, steps, opts);
    const res = await run.done;
    if (!ctx.alive()) return;
    ctx.vars.busy = false;
    const ans = {};
    QS.forEach((q) => { ans[q.id] = { st: q.flag ? 'flagged' : 'draft' }; });
    const dr = drafted ? await drafted : null;
    if (!ctx.alive()) return;
    if (dr) {
      const failed = [];
      dr.list.forEach((q) => {
        const r = dr.results[q.id];
        if (r && r.ok) {
          ans[q.id] = Object.assign({ st: 'draft', llm: r.model, [CL]: r.text }, BI ? { es: '' } : {});
          App.audit(LT('Respuesta redactada por el modelo', 'Answer drafted by the model'), `${QN.code} · ${q.id} · ${r.model} · ${fmt.ms(r.ms)}`, AGENT_ACTOR);
        } else failed.push({ q, r: r || { error: true, reason: LT('sin respuesta', 'no answer') } });
      });
      if (failed.length) {
        const errs = failed.filter((f) => f.r.error);
        const first = (errs[0] || failed[0]).r.reason;
        const ids = failed.map((f) => f.q.id);
        App.audit(LT('Respuestas con el texto preparado', 'Answers with the prepared text'), `${QN.code} · ${ids.join(', ')} · ${first}`, AGENT_ACTOR);
        App.toast(failed.length === dr.list.length
          ? LT(`El modelo no ha redactado ninguna respuesta (${first}). Se usan las respuestas preparadas.`, `The model did not draft any answer (${first}). Using the prepared answers.`)
          : LT(`${fmt.list(ids)}: el modelo no ha dado una respuesta válida (${first}). Se usa el texto preparado.`, `${ids.join(', ')}: the model did not give a valid answer (${first}). Using the prepared text.`), { tone: 'warn', icon: 'alert-triangle', duration: 9000 });
      }
    }
    ctx.setLocal({ run: Object.assign({ startedAt, at: App.nowISO(), ms: res.ms, steps: res.steps }, llm ? { llm: Object.assign({}, llm) } : {}), ans, sel: DEFAULT_SEL, filter: 'all', completedAt: null });
    App.audit('Borradores de respuesta preparados', `${QN.code} · ${DRAFTED} con cita verificada (${CITES_OK} de ${CITES_TOTAL} citas) · ${FLAGGED.length} sin evidencia suficiente · ${fmt.ms(res.ms)}`, AGENT_ACTOR);
    FLAGGED.forEach((q) => App.audit(`Pregunta marcada para revisión de ${TEAM}`, `${QN.code} · ${q.id} · ${q.topic} · sin evidencia suficiente en los documentos indexados`, AGENT_ACTOR));
    App.toast(`${DRAFTED} respuestas preparadas en ${fmt.ms(res.ms)} · ${FLAGGED.length} quedan para ${TEAM}`, { tone: 'ok' });
    ctx.presenter(null);
    ctx.rerender();
    requestAnimationFrame(() => scrollToEl(ctx.$('#cq-result')));
  }

  async function approveOne(ctx, id) {
    const q = QBY[id];
    const a = ansOf(ctx.local, id);
    if (!q || a.st !== 'draft') return;
    if (q.conf === 'media' && !a.edited && !a.manual) {
      const ok = await App.confirm({
        title: `Aprobar ${q.id} con confianza media`,
        body: html`<p class="slate">${q.gap}</p><p class="slate mt-2">¿Apruebas la respuesta tal como está? Queda en el registro de auditoría.</p>`,
        confirmLabel: 'Aprobar respuesta',
        icon: 'check'
      });
      if (!ok || !ctx.alive()) return;
    }
    setAns(ctx, { [id]: { st: 'approved', by: REVIEWER, at: App.nowISO(), via: 'single' } });
    App.audit('Respuesta aprobada', `${QN.code} · ${q.id} · ${q.topic} · ${CONF[q.conf].long.toLowerCase()}${a.edited ? ' · editada' : ''}${a.manual ? ` · redactada por ${TEAM}, sin fuente indexada` : ''}`);
    App.toast(`${q.id} aprobada`, { tone: 'ok' });
    decided(ctx);
  }

  async function approveHigh(ctx) {
    const ids = QS.filter((q) => q.conf === 'alta' && ansOf(ctx.local, q.id).st === 'draft').map((q) => q.id);
    if (!ids.length) return;
    const ok = await App.confirm({
      title: `Aprobar ${ids.length} respuestas de confianza alta`,
      body: html`<p class="slate">Se aprueban las respuestas respaldadas literalmente por un documento o un registro: ${fmt.list(ids)}.</p><p class="slate mt-2">Las de confianza media y las preguntas sin fuente no se incluyen.</p>`,
      confirmLabel: `Aprobar ${ids.length} respuestas`,
      icon: 'check'
    });
    if (!ok || !ctx.alive()) return;
    const at = App.nowISO();
    const patch = {};
    ids.forEach((id) => { patch[id] = { st: 'approved', by: REVIEWER, at, via: 'bulk' }; });
    setAns(ctx, patch);
    App.audit('Aprobación en bloque', `${QN.code} · ${ids.length} respuestas de confianza alta: ${ids.join(', ')}`);
    App.toast(`${ids.length} respuestas aprobadas`, { tone: 'ok' });
    decided(ctx);
  }

  function assign(ctx, ids) {
    const list = ids.filter((id) => QBY[id] && QBY[id].flag && ansOf(ctx.local, id).st === 'flagged');
    if (!list.length) return;
    const at = App.nowISO();
    const patch = {};
    list.forEach((id) => { patch[id] = { st: 'assigned', to: ASSIGNEE, at }; });
    setAns(ctx, patch);
    App.audit(`Preguntas asignadas a ${ASSIGNEE_SHORT}`, `${QN.code} · ${list.join(', ')} · ${ASSIGNEE} · completar antes del ${fmt.date(ASSIGN_DUE)}`);
    App.audit('Aviso enviado por Microsoft Teams', `${ASSIGNEE} · ${fmt.plural(list.length, 'pregunta', 'preguntas')} del cuestionario ${QN.code} sin evidencia suficiente`, AGENT_ACTOR);
    App.toast(`${fmt.plural(list.length, 'pregunta asignada', 'preguntas asignadas')} a ${ASSIGNEE}`, { tone: 'ok', icon: 'user-check' });
    decided(ctx);
  }

  async function discard(ctx, id) {
    const q = QBY[id];
    if (!q || ansOf(ctx.local, id).st !== 'draft') return;
    const reason = await App.promptText({
      title: `Descartar el borrador de ${q.id}`,
      text: 'El borrador no se incluirá en la respuesta ni en la exportación. Queda en el registro de auditoría con su motivo.',
      label: 'Motivo',
      placeholder: QD.discard_placeholder || 'Por ejemplo: esta pregunta se responde con el certificado adjunto',
      required: true,
      confirmLabel: 'Descartar borrador'
    });
    if (reason == null || !ctx.alive()) return;
    setAns(ctx, { [id]: { st: 'discarded', by: REVIEWER, at: App.nowISO(), reason, via: null } });
    App.audit('Borrador descartado', `${QN.code} · ${q.id} · ${q.topic} · motivo: ${reason}`);
    decided(ctx);
  }

  function reopen(ctx, id, restore) {
    const q = QBY[id];
    const a = ansOf(ctx.local, id);
    if (!q || (restore ? a.st !== 'discarded' : a.st !== 'approved')) return;
    setAns(ctx, { [id]: { st: 'draft', by: null, at: null, via: null, reason: null } });
    App.audit(restore ? 'Borrador recuperado' : 'Respuesta reabierta', `${QN.code} · ${q.id} · ${q.topic}`);
    decided(ctx);
  }

  function saveEdit(ctx, id) {
    const q = QBY[id];
    const a = ansOf(ctx.local, id);
    const enEl = BI ? ctx.$('#cq-en') : null;
    const esEl = ctx.$('#cq-es');
    if (!q || !esEl || (BI && !enEl)) return;
    const en = enEl ? enEl.value.trim() : '';
    const es = esEl.value.trim();
    const main = BI ? en : es;
    if (!main) {
      const hint = ctx.$('#cq-edit-hint');
      if (hint) { hint.textContent = BI ? 'Escribe la respuesta en inglés para guardarla.' : 'Escribe la respuesta para guardarla.'; hint.classList.add('t-crit'); }
      (BI ? enEl : esEl).focus();
      return;
    }
    ctx.vars.editing = null;
    if (!BI && es === textOf(q, a, MK)) { ctx.rerender(); return; }
    if (BI && en === textOf(q, a, 'en') && es === textOf(q, a, 'es')) { ctx.rerender(); return; }
    const texts = BI ? { en, es } : { [MK]: es };
    if (q.flag) {
      setAns(ctx, { [id]: Object.assign({ st: 'draft', manual: true, edited: false, by: null, at: null, via: null }, texts) });
      App.audit(`Respuesta redactada por ${TEAM}`, `${QN.code} · ${q.id} · ${q.topic} · sin fuente indexada`);
    } else {
      setAns(ctx, { [id]: Object.assign({ st: 'draft', edited: true, by: null, at: null, via: null }, texts) });
      App.audit('Respuesta editada', `${QN.code} · ${q.id} · ${q.topic}`);
    }
    App.toast(`${q.id}: cambios guardados, pendiente de aprobación`, { tone: 'info', icon: 'edit' });
    decided(ctx);
  }

  function openSource(q, c, label) {
    if (!c) return;
    const src = SOURCES[c.src];
    const loc = citeLoc(c);
    App.modal({
      title: src.title,
      kicker: `${label} · ${src.kind}${src.type === 'record' ? ` · ${src.system}` : ''}${loc ? ` · ${loc}` : ''}`,
      size: 'md',
      body: html`${App.docPreview({ code: src.code, title: src.title, org: src.org, version: src.version, date: src.date, owner: src.owner, sections: src.sections, highlight: c.ok ? { section: c.sec, text: c.frag, tone: 'brand' } : null })}
        <p class="row row-nowrap small mt-4 ${c.ok ? 't-ok' : 't-crit'}" style="align-items:flex-start">${icon(c.ok ? 'check-circle' : 'alert-circle', 16)}<span>${c.ok ? 'El fragmento citado aparece literalmente en esta fuente.' : 'El fragmento no aparece en esta fuente: la cita no se usa.'}</span></p>`,
      actions: [{ label: 'Cerrar', variant: 'primary' }]
    });
  }

  function openEmail() {
    App.modal({
      title: EMAIL.headers.Subject,
      kicker: `Correo recibido · ${fmt.date(QN.received)} · ${QN.via}`,
      size: 'lg',
      body: App.emailView({ headers: EMAIL.headers, text: EMAIL.text, highlights: EMAIL.highlights, attachments: [QN.file] }),
      actions: [{ label: 'Cerrar', variant: 'primary' }]
    });
  }

  function applyFilter(ctx, value) {
    ctx.setLocal({ filter: value });
    let n = 0;
    ctx.$$('.cq-table tbody tr[data-q]').forEach((tr) => {
      const show = matchFilter(QBY[tr.getAttribute('data-q')], ctx.local, value);
      tr.hidden = !show;
      if (show) n += 1;
    });
    const empty = ctx.$('.cq-empty');
    if (empty) empty.hidden = n > 0;
  }

  /* ---------------------------------------------------------------- Exportación */

  function evidenceText(q, a) {
    if (a.manual) return `Redactada por ${TEAM} · sin fuente indexada`;
    if (q.flag) return 'No hay evidencia suficiente en los documentos indexados';
    return q.cites.map((c, i) => {
      const loc = citeLoc(c);
      return `[${i + 1}] ${srcRef(SOURCES[c.src])} · ${SOURCES[c.src].title}${loc ? ` · ${loc}` : ''}`;
    }).join(' | ');
  }
  function hasAnswer(q, a) { return a.st !== 'discarded' && (!q.flag || !!a.manual); }

  function exportCsv(ctx) {
    const L = ctx.local;
    if (!L.run || !L.ans) return;
    const rows = QS.map((q) => {
      const a = ansOf(L, q.id);
      const has = hasAnswer(q, a);
      return {
        id: q.id,
        ref: q.ref || '',
        sec: `${q.sec}. ${BI ? SEC[q.sec].en : secName(SEC[q.sec])}`,
        qEn: q.qEn || '',
        qEs: q.qEs || '',
        qM: qText(q, MK),
        aEn: has ? textOf(q, a, 'en') : '',
        aEs: has ? textOf(q, a, 'es') : '',
        aM: has ? textOf(q, a, MK) : '',
        ev: evidenceText(q, a),
        conf: CONF[q.conf].long,
        st: ST_LABEL[a.st] + (a.st === 'discarded' && a.reason ? ` (motivo: ${a.reason})` : '') + (a.edited ? ` · editada por ${TEAM}` : ''),
        by: a.st === 'approved' || a.st === 'discarded' ? a.by : a.st === 'assigned' ? a.to : '',
        at: a.at ? fmt.date(a.at, { time: true }) : ''
      };
    });
    const hasRef = QS.some((q) => q.ref);
    const cols = [{ label: 'Nº', key: 'id' }]
      .concat(hasRef ? [{ label: QD.ref_label || 'Referencia', key: 'ref' }] : [])
      .concat([{ label: 'Bloque', key: 'sec' }])
      .concat(BI
        ? [{ label: 'Question (EN)', key: 'qEn' }, { label: 'Pregunta (ES)', key: 'qEs' }, { label: 'Answer (EN)', key: 'aEn' }, { label: 'Respuesta (ES)', key: 'aEs' }]
        : [{ label: 'Pregunta', key: 'qM' }, { label: 'Respuesta', key: 'aM' }])
      .concat([{ label: 'Evidencia', key: 'ev' }, { label: 'Confianza', key: 'conf' }, { label: 'Estado', key: 'st' }, { label: 'Decidido por', key: 'by' }, { label: 'Fecha y hora', key: 'at' }]);
    const content = App.csv({ cols, rows });
    App.downloadFile(`cuestionario-${QN.code}.csv`, 'text/csv', content);
  }

  function cssString(s) { return `"${String(s).replace(/["\\]/g, '\\$&')}"`; }
  function pageStyle(rev, status) {
    const box = 'font:500 8pt Inter,system-ui,sans-serif;color:var(--muted,#6E7777)';
    return `<style>
.cq-q{border:1px solid var(--line);border-radius:6px;padding:9px 12px;margin:0 0 9px}
.cq-q p,.cq-q li,.cq-qh{break-inside:avoid}
.cq-qh,.cq-ql,.cq-qen{break-after:avoid}
.cq-qh{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-bottom:4px}
.cq-qen{font-style:italic;margin:4px 0 2px}
.cq-ql{margin-top:8px;font-size:10.5px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--muted)}
.cq-qs{margin-top:6px;font-size:11.5px}
@page{
@top-left{content:${cssString(META.report_org || META.company)};${box}}
@top-right{content:${cssString(`${QN.code} · revisión ${rev} · ${status}`)};${box}}
@bottom-left{content:${cssString('Documento generado por Agentic Platform · demostración con datos sintéticos')};${box}}
@bottom-right{content:"Página " counter(page) " de " counter(pages);${box}}
}
</style>`;
  }
  function pdfBlock(q, a) {
    const st = a.st || 'pending';
    const tone = st === 'approved' ? 'ok' : (st === 'flagged' || st === 'assigned') ? 'warn' : '';
    const has = hasAnswer(q, a);
    const main = has ? textOf(q, a, CL) : '';
    const es = has && BI ? textOf(q, a, 'es') : '';
    let decision = 'Borrador pendiente de aprobación';
    if (st === 'approved') decision = `Aprobada por ${a.by} · ${fmt.date(a.at, { time: true })}${a.via === 'bulk' ? ' · aprobación en bloque' : ''}`;
    else if (st === 'assigned') decision = `Asignada a ${a.to} · ${fmt.date(a.at, { time: true })} · completar antes del ${fmt.date(ASSIGN_DUE)}`;
    else if (st === 'discarded') decision = `Descartada por ${a.by} · ${fmt.date(a.at, { time: true })} · motivo: ${a.reason}`;
    else if (st === 'flagged') decision = `Sin decisión: requiere revisión de ${TEAM}`;
    const flagNote = q.flag && !a.manual ? `No hay evidencia suficiente en los documentos indexados. ${fill(q.flag.reason)} Falta: ${q.flag.missing.join('; ')}.` : '';
    const ev = !q.flag && has && !a.manual
      ? `<div class="cq-ql">Evidencia</div><ul>${q.cites.map((c, i) => {
        if (!c.ok) return '';
        const loc = citeLoc(c);
        return `<li>[${i + 1}] <span class="code">${esc(srcRef(SOURCES[c.src]))}</span> ${esc(SOURCES[c.src].title)}${loc ? ` (${esc(loc)})` : ''} · «${esc(c.frag)}»</li>`;
      }).join('')}</ul>`
      : '';
    const extra = [a.llm ? `redactada con ${a.llm}` : '', a.edited ? `editada por ${TEAM}` : '', a.manual ? `redactada por ${TEAM}, sin fuente indexada` : ''].filter(Boolean).join(' · ');
    const qHead = BI ? `<p class="cq-qen">${esc(q.qEn)}</p><p class="muted">${esc(q.qEs)}</p>` : `<p class="cq-qen" data-no-translate>${esc(qText(q, MK))}</p>`;
    return `<div class="cq-q">
<div class="cq-qh"><span class="code">${esc(q.id)}</span>${q.ref ? `<span class="code">${esc(q.ref)}</span>` : ''}<strong>${esc(q.topic)}</strong><span class="tag ${tone}">${esc(ST_LABEL[st])}</span><span class="tag">${esc(CONF[q.conf].long)}</span></div>
${qHead}
${main ? `<div class="cq-ql">Respuesta para el cliente${BI ? ' (inglés)' : ''}${extra ? ` · ${esc(extra)}` : ''}</div><p${EN_UI ? ' data-no-translate' : ''}>${esc(main)}</p>${es ? `<div class="cq-ql">Traducción de revisión</div><p class="muted">${esc(es)}</p>` : ''}` : ''}
${flagNote ? `<div class="note">${esc(flagNote)}</div>` : ''}
${st === 'discarded' ? '<div class="note">Borrador descartado: no se incluye en la respuesta.</div>' : ''}
${ev}
<p class="cq-qs muted">${esc(decision)}</p>
</div>`;
  }

  function openPdf(ctx) {
    const L = ctx.local;
    if (!L.run || !L.ans) return;
    const c = counts(L);
    const all = c.approved === QS.length;
    const rev = L.completedAt ? '1' : '0';
    const statusShort = all ? 'Aprobado' : 'Borrador';
    const statusLong = all ? 'Aprobado' : `Borrador · ${c.approved} de ${QS.length} respuestas aprobadas`;
    const used = Array.from(new Set(QS.reduce((acc, q) => acc.concat((q.cites || []).map((x) => x.src)), []))).map((id) => SOURCES[id]);
    const pendFlag = FLAGGED.filter((q) => ['flagged', 'assigned'].includes(ansOf(L, q.id).st));
    const pendDraft = QS.filter((q) => ansOf(L, q.id).st === 'draft');
    const lastApproval = QS.map((q) => ansOf(L, q.id)).filter((a) => a.st === 'approved' && a.at).map((a) => a.at).sort().pop();
    const history = [{ rev: '0', date: fmt.date(L.run.at, { time: true }), desc: `Borrador preparado: ${DRAFTED} respuestas con cita verificada y ${FLAGGED.length} preguntas sin evidencia suficiente`, by: AGENT_ACTOR }];
    if (L.completedAt) {
      const bits = [`${c.approved} aprobadas`, c.edited ? `${c.edited} editadas` : '', c.discarded ? `${c.discarded} descartadas` : '', c.assigned ? `${c.assigned} asignadas a ${ASSIGNEE_SHORT}` : ''].filter(Boolean);
      history.push({ rev: '1', date: fmt.date(L.completedAt, { time: true }), desc: `Revisión de ${TEAM}: ${fmt.list(bits)}`, by: REVIEWER });
    }
    const pendingItems = pendFlag.map((q) => `${q.id} · ${q.topic}: ${ansOf(L, q.id).st === 'assigned' ? `asignada a ${ASSIGNEE}, completar antes del ${fmt.date(ASSIGN_DUE)}` : 'sin asignar'}`)
      .concat(pendDraft.map((q) => `${q.id} · ${q.topic}: borrador pendiente de aprobación`));
    // Bloque de aprobaciones en la primera página (rol, estado y fecha y hora de la sesión).
    const approvals = [
      { fn: 'Elaboración del borrador', who: AGENT_ACTOR, st: `${DRAFTED} respuestas con cita verificada · ${FLAGGED.length} sin evidencia suficiente`, at: fmt.date(L.run.at, { time: true }) },
      { fn: 'Revisión y aprobación de respuestas', who: REVIEWER, st: c.approved ? `${c.approved} de ${QS.length} aprobadas${c.discarded ? ` · ${c.discarded} descartadas` : ''}` : 'Pendiente de revisión', at: lastApproval ? fmt.date(lastApproval, { time: true }) : '—' }
    ];
    if (pendFlag.length) approvals.push({ fn: 'Preguntas sin evidencia suficiente', who: ASSIGNEE, st: `Pendiente: ${fmt.list(pendFlag.map((q) => q.id))}`, at: `Antes del ${fmt.date(ASSIGN_DUE)}` });
    const sections = [
      {
        heading: '1. Aprobaciones',
        table: { cols: [{ label: 'Función', key: 'fn' }, { label: 'Responsable', key: 'who' }, { label: 'Estado', key: 'st' }, { label: 'Fecha y hora', key: 'at' }], rows: approvals },
        html: raw(pageStyle(rev, statusShort))
      },
      {
        heading: '2. Objeto y alcance',
        text: `Respuesta de ${QD.responder} al ${QN.title} de ${QN.customer}${QN.via !== QN.customer ? `, recibido de ${QN.via}` : ', recibido'} el ${fmt.date(QN.received)}. Alcance: ${QN.scope}. ${QS.length} preguntas en ${SECS.length} bloques.\n\nCada respuesta cita la fuente que la respalda (documento y apartado, o registro del sistema) y cada cita se ha comprobado literalmente en su fuente (${CITES_OK} de ${CITES_TOTAL}). Las preguntas sin evidencia suficiente en los documentos indexados no se responden y quedan para ${ASSIGNEE}.`
      },
      {
        heading: '3. Resumen de respuestas',
        table: { cols: [{ label: 'Nº', key: 'id' }, { label: 'Pregunta', key: 'topic' }, { label: 'Confianza', render: (q) => CONF[q.conf].long }, { label: 'Estado', render: (q) => ST_LABEL[ansOf(L, q.id).st] }], rows: QS }
      },
      { heading: '4. Respuestas', html: raw(QS.map((q) => pdfBlock(q, ansOf(L, q.id))).join('')) },
      {
        heading: '5. Fuentes consultadas',
        table: { cols: [{ label: 'Código', render: (s) => raw(`<span class="code">${esc(srcRef(s))}</span>`) }, { label: 'Fuente', key: 'title' }, { label: 'Tipo', key: 'kind' }, { label: 'Sistema', render: (s) => (s.type === 'record' ? s.system : 'Documentos indexados') }], rows: used }
      }
    ];
    if (pendingItems.length) sections.push({ heading: '6. Pendiente', list: pendingItems });
    sections.push({
      heading: `${pendingItems.length ? 7 : 6}. Historial de revisiones`,
      table: { cols: [{ label: 'Revisión', key: 'rev' }, { label: 'Fecha', key: 'date' }, { label: 'Descripción', key: 'desc' }, { label: 'Responsable', key: 'by' }], rows: history }
    });
    App.printableReport({
      title: QD.report_title || 'Respuesta a cuestionario de cliente',
      subtitle: `${QN.title} · ${QN.customer}${QN.via !== QN.customer ? ` · recibido de ${QN.via}` : ''}`,
      code: QN.code,
      filename: `cuestionario-${QN.code}`,
      meta: [
        ['Revisión', rev], ['Estado', statusLong], [QD.site_label || 'Centro', QD.site],
        ['Cliente', `${QN.customer}${QN.via !== QN.customer ? ` · vía ${QN.via}` : ''}`], [QD.scope_meta_label || 'Alcance', QN.scope_short || QN.scope], ['Recibido', fmt.date(QN.received)],
        ['Plazo de respuesta', fmt.date(QN.due)], ['Idioma de respuesta', BI ? 'Inglés, con traducción de revisión' : EN_UI ? 'Inglés' : 'Español']
      ],
      sections,
      footer: `Documento generado por Agentic Platform · demostración con datos sintéticos · ${QN.code} · revisión ${rev}`
    });
  }

  /* ---------------------------------------------------------------- Presentador */

  function sayFor(state) {
    const L = (state.scenes && state.scenes.cuestionario) || {};
    const ran = !!(L.run && L.ans);
    const S = QD.presenter || {};
    if (!ran) return (S.before || []).map((s) => fill(s));
    if (!L.completedAt) return (S.during || []).map((s) => fill(s));
    return (S.after || [
      'Revisión cerrada y registrada en la auditoría: cada aprobación, edición y asignación tiene hora y responsable.',
      'Excel para devolver el cuestionario al cliente y PDF como documento controlado: código, revisión, estado, aprobaciones y fuentes.',
      'Comparativa del final: hoy, varias horas repartidas en varios días (a validar en el piloto); aquí, el borrador en segundos más la revisión que acabamos de medir.'
    ]).map((s) => fill(s));
  }
  function nextFor(state) {
    const L = (state.scenes && state.scenes.cuestionario) || {};
    const S = QD.presenter || {};
    if (!(L.run && L.ans)) return 'Pulsar «Preparar respuestas» y comentar el registro mientras se ejecuta.';
    if (!L.completedAt) {
      return fill(S.next_during || 'Enseñar {default_sel} (cita y nota interna) y una pregunta sin evidencia. Después «Aprobar las {alta} de confianza alta», aprobar {media_ids} una a una y «Asignar las {flagged} sin fuente».');
    }
    return 'Pulsar «Descargar cuestionario (PDF)», enseñar la comparativa y pasar a «Procedimientos» con la flecha derecha.';
  }

  /* ---------------------------------------------------------------- Registro de la escena */

  App.scene({
    id: 'cuestionario',
    order: 60,
    section: QD.nav_section || 'Calidad',
    nav: 'Cuestionario de cliente',
    title: 'Cuestionario de cliente',
    icon: 'list-checks',
    badge: (state) => {
      const L = state.scenes && state.scenes.cuestionario;
      if (!L || !L.run || !L.ans) return null;
      const n = QS.filter((q) => UNDECIDED[ansOf(L, q.id).st]).length;
      return n ? { text: String(n), tone: 'warn' } : null;
    },
    presenter: { say: sayFor, next: nextFor },
    render(root, ctx) {
      let L = ctx.local;
      const ran = !!(L.run && L.ans);
      if (ran && !ctx.vars.paramDone) {
        ctx.vars.paramDone = true;
        const p = String(ctx.params[0] || '').toUpperCase();
        if (QBY[p] && p !== L.sel) { ctx.setLocal({ sel: p }); L = ctx.local; }
      }
      const actions = ran
        ? html`<button type="button" class="btn btn-secondary" data-action="csv">${icon('download')}<span>Exportar Excel (.csv)</span></button><button type="button" class="btn btn-secondary" data-action="pdf">${icon('printer')}<span>Descargar cuestionario (PDF)</span></button>`
        : html`<button type="button" class="btn btn-primary" data-action="prepare">${icon('play')}<span>Preparar respuestas</span></button>`;
      root.innerHTML = String(html`
        ${App.pageHead({
          title: QD.page_title,
          meta: [
            { icon: 'mail', text: `Recibido el ${fmt.date(QN.received)} · ${QN.via}` },
            { icon: 'calendar', text: `Plazo: ${fmt.weekday(QN.due)} ${fmt.date(QN.due)}` },
            { icon: 'hash', text: QN.code }
          ],
          actions
        })}
        ${kpis(L, ran)}
        <div class="section" id="cq-run" ${ran ? '' : raw('hidden')}>${ran ? resultCard(L) : ''}</div>
        <div class="grid cols-5-7 section cq-grid">${questionsCard(L, ran)}${ran ? detailPanel(ctx, L) : emailCard()}</div>
        ${ran ? html`<div class="section">${compareCard(L)}</div>` : ''}
      `);

      if (ran) {
        const log = ctx.$('#cq-log');
        if (log) App.reasoningStream(log, streamSteps(L.run.llm), { title: `Agente ${AGENT} · ${QN.code}`, instant: true, start: L.run.startedAt, maxHeight: 420 });
        if (ctx.vars.editing) {
          const ta = ctx.$(BI ? '#cq-en' : '#cq-es');
          if (ta) requestAnimationFrame(() => ta.focus());
        }
      }

      ctx.on('click', '[data-action="prepare"]', () => prepare(ctx));
      ctx.on('click', 'tr[data-q]', (e, el) => { if (ctx.local.run && ctx.local.ans) select(ctx, el.getAttribute('data-q')); });
      ctx.on('click', '[data-action="next"]', (e, el) => select(ctx, el.getAttribute('data-next')));
      ctx.on('segchange', '[data-seg="cq-lang"]', (e) => { ctx.setLocal({ lang: e.detail.value === 'en' ? 'en' : 'es' }); ctx.rerender(); });
      ctx.on('segchange', '[data-seg="cq-filter"]', (e) => applyFilter(ctx, e.detail.value));
      ctx.on('click', '[data-cite]', (e, el) => {
        const q = QBY[ctx.local.sel];
        const n = Number(el.getAttribute('data-cite'));
        if (q && q.cites) openSource(q, q.cites[n - 1], `Fuente [${n}] de ${q.id}`);
      });
      ctx.on('click', '[data-src]', (e, el) => {
        const q = QBY[ctx.local.sel];
        const key = el.getAttribute('data-src') || '';
        const n = Number(key.slice(1));
        if (!q) return;
        if (key.charAt(0) === 'p' && q.flag) openSource(q, q.flag.partial[n - 1], `Evidencia parcial ${n} de ${q.id}`);
        else if (q.cites) openSource(q, q.cites[n - 1], `Fuente [${n}] de ${q.id}`);
      });
      ctx.on('click', '[data-action="approve"]', () => approveOne(ctx, ctx.local.sel));
      ctx.on('click', '[data-action="approve-high"]', () => approveHigh(ctx));
      ctx.on('click', '[data-action="discard"]', () => discard(ctx, ctx.local.sel));
      ctx.on('click', '[data-action="reopen"]', () => reopen(ctx, ctx.local.sel, false));
      ctx.on('click', '[data-action="restore"]', () => reopen(ctx, ctx.local.sel, true));
      ctx.on('click', '[data-action="assign"]', () => assign(ctx, [ctx.local.sel]));
      ctx.on('click', '[data-action="assign-all"]', () => assign(ctx, FLAGGED.map((q) => q.id)));
      ctx.on('click', '[data-action="edit"]', () => { ctx.vars.editing = ctx.local.sel; ctx.rerender(); });
      ctx.on('click', '[data-action="cancel-edit"]', () => { ctx.vars.editing = null; ctx.rerender(); });
      ctx.on('click', '[data-action="save-edit"]', () => saveEdit(ctx, ctx.local.sel));
      ctx.on('click', '[data-action="email"]', () => openEmail());
      ctx.on('click', '[data-action="csv"]', () => exportCsv(ctx));
      ctx.on('click', '[data-action="pdf"]', () => openPdf(ctx));
    }
  });
})();
