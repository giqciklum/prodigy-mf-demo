/*
 * Escena «procedimientos» · Preguntar a los procedimientos, común a todas las industrias.
 * Misma estructura que la demo de referencia:
 *  - Respuestas extractivas: cada frase lleva su cita [n] a un pasaje literal de un documento indexado; el panel
 *    «Fuente» abre el documento (docPreview) con ese pasaje resaltado.
 *  - Sin fuente no hay respuesta: «No hay evidencia suficiente en los procedimientos indexados», sin citas.
 *  - Las respuestas se cruzan con lo que pasa hoy en la operación (bloque «Aplicado a … hoy»).
 *  - render() es idempotente: la conversación, la cita seleccionada y las valoraciones viven en ctx.local.
 *  - Enlace directo a un documento: #procedimientos/<CÓDIGO>[/<apartado>].
 * Todo el contenido sale de CN_DATA.procedimientos (documentos, preguntas preparadas, huecos sin fuente y textos).
 * El índice de documentos se publica también como window.CN_DOCS (y window.CN_DOCS_READY) para otras escenas.
 */
(function () {
  'use strict';

  const { html, icon, fmt, chip, sys } = App;
  const D = window.CN_DATA;
  const P = D.procedimientos;
  if (!P) return;
  const AGENT = P.agent || 'Procedimientos';
  const AGENT_ACTOR = `Agentic Platform · agente ${AGENT}`;
  const NONE_TITLE = 'No hay evidencia suficiente en los procedimientos indexados';
  const UI = P.ui || {};
  const DOC_SYS = P.system || 'Procedimientos';

  /* ---------------------------------------------------------------- Índice de documentos (CN_DOCS) */

  const NB = ' ';
  /** Signo menos tipográfico y espacio duro entre cifra y unidad (−18 °C, 15 min, 2,5 %, 30 l). */
  function tidy(s) {
    return String(s == null ? '' : s)
      .replace(/(^|[\s(«])-(?=\d)/g, '$1−')
      .replace(/(\d) (?=(°C|%|€|h\b|min\b|mm\b|mm\/s\b|kg\b|g\b|t\b|l\b|hl\b|bar\b|Nm\b|µm\b|ufc|ppm\b|días\b|meses\b|semanas\b|años\b|horas\b|days\b|months\b|weeks\b|years\b|hours\b))/g, `$1${NB}`);
  }

  const DOCS = (P.docs || []).map((d) => Object.assign({}, d, {
    title: tidy(d.title),
    sections: (d.sections || []).map((s) => Object.assign({}, s, {
      id: String(s.id),
      heading: tidy(s.heading),
      text: s.text ? s.text.map(tidy) : undefined,
      list: s.list ? s.list.map(tidy) : undefined
    }))
  }));
  const UNINDEXED = {};
  Object.keys(P.unindexed || {}).forEach((k) => {
    const u = P.unindexed[k];
    UNINDEXED[k] = Object.assign({ code: k }, u, { mentionedIn: Object.assign({}, u.mentionedIn, { sec: String(u.mentionedIn.sec), quote: tidy(u.mentionedIn.quote) }) });
  });
  const BY_CODE = Object.fromEntries(DOCS.map((d) => [d.code, d]));

  const STOP_ES = ('a al algo algun alguna algunas alguno algunos ante antes aqui asi aun cada como con contra cual cuales cuando cuanto cuanta cuantas cuantos de del desde donde dos durante e el ella ellas ellos en entre era es esa esas ese eso esos esta estan estar estas este esto estos fue ha hace hacen hacer hacemos hago hay la las le les lo los mas me mi mis mucho muy nada ni no nos nosotros nuestra nuestras nuestro nuestros o os otra otras otro otros para pero poco por porque puede pueden puedo podemos que quien quienes se segun ser si sin sobre son su sus tambien tanto te tener tenemos tengo tiene tienen todo todos tu tus un una unas uno unos usa usan usar y ya debe deben debo debemos pasa ocurre dice dicen decir haya sea sean seria estamos vez veces favor quiero necesito saber dime explica explicame indica indicame');
  const STOP_EN = 'a an and are as at be been but by can could did do does for from had has have how i if in into is it its may me must my no not of on or our shall should so than that the their them then there these they this to us was we were what when where which who whom why will with would you your about after before any all also each per please tell explain show want need know happens happen';
  const EN = !!(window.CN_I18N && window.CN_I18N.english);
  /* Palabras vacías del idioma de los documentos (los datos pueden traer su lista en P.stopwords). */
  const STOP = new Set((P.stopwords || (EN ? STOP_EN : STOP_ES)).split(/\s+/));

  function normalize(s) {
    return String(s == null ? '' : s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/−/g, '-').replace(/[^a-z0-9ñ\s-]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  /* Recorte ligero: plural en -s y prefijo de 6 letras (reclamación/reclamaciones → «reclam»). */
  function stem(t) {
    let w = t;
    if (/^\d/.test(w)) return w;
    if (w.length > 3 && /s$/.test(w)) w = w.slice(0, -1);
    return w.length > 6 ? w.slice(0, 6) : w;
  }
  function terms(s) {
    return normalize(s).split(/[\s-]+/).filter((t) => t && (t.length > 2 || /^\d+$/.test(t)) && !STOP.has(t)).map(stem);
  }

  let PASSAGES = null;
  let DF = null;
  function buildIndex() {
    if (PASSAGES) return;
    PASSAGES = [];
    DOCS.forEach((d) => d.sections.forEach((s) => {
      if (s.refs) return;
      (s.text || []).concat(s.list || []).forEach((text) => {
        const bag = new Set(terms(`${text} ${s.heading.replace(/^\d+\.\s*/, '')}`));
        PASSAGES.push({ doc: d.code, sec: s.id, heading: s.heading, text, bag });
      });
    }));
    DF = new Map();
    PASSAGES.forEach((p) => p.bag.forEach((t) => DF.set(t, (DF.get(t) || 0) + 1)));
  }
  function idf(t) { const n = PASSAGES.length; const df = DF.get(t) || 0; return Math.log(1 + (n - df + 0.5) / (df + 0.5)); }
  /** Fragmentos por pertinencia: coverage = términos de la pregunta presentes / términos; strong = términos poco frecuentes. */
  function search(question, opts) {
    buildIndex();
    const o = opts || {};
    const q = Array.from(new Set(terms(question)));
    if (!q.length) return [];
    const strongCut = Math.max(2, Math.floor(PASSAGES.length * 0.08));
    const out = PASSAGES.map((p) => {
      const matched = q.filter((t) => p.bag.has(t));
      const score = matched.reduce((acc, t) => acc + idf(t), 0);
      const strong = matched.filter((t) => (DF.get(t) || 0) <= strongCut);
      return { doc: p.doc, sec: p.sec, heading: p.heading, text: p.text, score, matched, strong, coverage: matched.length / q.length };
    }).filter((r) => r.score > 0).sort((a, b) => b.score - a.score || b.coverage - a.coverage);
    return o.limit ? out.slice(0, o.limit) : out;
  }
  function section(code, id) { const d = BY_CODE[code]; return d ? d.sections.find((s) => s.id === String(id)) || null : null; }
  function has(code, id, quote) {
    const s = section(code, id);
    if (!s || !quote) return false;
    return (s.text || []).concat(s.list || []).some((t) => t.indexOf(quote) >= 0);
  }

  const DOCS_API = {
    source: P.source || DOC_SYS,
    indexedAt: P.indexed_at || `${D.meta.today}T06:00`,
    order: DOCS.map((d) => d.code),
    docs: BY_CODE,
    unindexed: UNINDEXED,
    get: (code) => BY_CODE[String(code || '').trim().toUpperCase()] || null,
    all: () => DOCS.slice(),
    section,
    has,
    passages: () => { buildIndex(); return PASSAGES.map((p) => ({ doc: p.doc, sec: p.sec, heading: p.heading, text: p.text })); },
    search,
    tidy,
    normalize,
    terms,
    stem
  };
  window.CN_DOCS = DOCS_API;
  window.CN_DOCS_READY = Promise.resolve(DOCS_API);
  if (typeof App.emit === 'function') App.emit('docs-ready', DOCS_API);
  const K = () => DOCS_API;
  const T = (s) => tidy(s);

  /* ---------------------------------------------------------------- Preguntas preparadas (datos) */

  /** Bloque de datos → {t, c: [{doc, sec, quote}]} · lista → {intro, list} */
  function toCite(c) { return Array.isArray(c) ? { doc: c[0], sec: String(c[1]), quote: c[2] } : { doc: c.doc, sec: String(c.sec), quote: c.quote }; }
  function toBlock(b) {
    if (!b) return null;
    if (typeof b === 'string') return { t: b, c: [] };
    if (b.list) return { intro: b.intro ? toBlock(b.intro) : null, list: b.list.map(toBlock) };
    return { t: b.t, c: (b.c || []).map(toCite) };
  }
  const INTENTS = (P.intents || []).map((it) => Object.assign({}, it, {
    build: (q) => {
      const src = typeof it.build === 'function' ? it.build(q, { D, fmt, App }) : it;
      return {
        blocks: (src.blocks || []).map(toBlock),
        note: src.note || null,
        context: src.context || null,
        followups: src.followups || []
      };
    }
  }));
  const INTENT = Object.fromEntries(INTENTS.map((i) => [i.id, i]));
  const SUGGESTED = (P.suggested || INTENTS.slice(0, 6).map((i) => i.id)).filter((id) => INTENT[id]);
  const GAPS = (P.gaps || []).slice();
  const GAP = Object.fromEntries(GAPS.map((g) => [g.id, g]));
  const OTHER = P.other_scopes || null; // {words: [...], reason: '… {x} …'}

  /* ---------------------------------------------------------------- Motor de consulta (determinista) */

  let prepared = false;
  function prepareTerms() {
    if (prepared) return;
    const conv = (w) => {
      if (w.charAt(0) === '=') return { exact: normalize(w.slice(1)) };
      const n = normalize(w);
      return /\s/.test(n) ? { phrase: n } : { stem: stem(n) };
    };
    const uniq = (list) => {
      const seen = new Set();
      return list.filter((a) => { const k = JSON.stringify(a); if (seen.has(k)) return false; seen.add(k); return true; });
    };
    INTENTS.concat(GAPS).forEach((d) => {
      d._anchors = uniq((d.anchors || []).map(conv));
      const ak = new Set(d._anchors.map((a) => JSON.stringify(a)));
      d._terms = uniq((d.terms || []).map(conv)).filter((t) => !ak.has(JSON.stringify(t)));
    });
    prepared = true;
  }
  function qBag(question) {
    const norm = normalize(question);
    const words = norm.split(/[\s-]+/).filter(Boolean);
    return { norm: ` ${norm} `, words: new Set(words), stems: new Set(words.map((w) => stem(w))) };
  }
  function hits(bag, list) {
    return (list || []).filter((a) => (a.exact ? bag.words.has(a.exact) : a.phrase ? bag.norm.includes(` ${a.phrase} `) : bag.stems.has(a.stem))).length;
  }
  function scoreDef(bag, d) {
    const a = hits(bag, d._anchors);
    return a ? a * 2 + hits(bag, d._terms) : 0;
  }

  /** Clasifica una pregunta: {type: 'intent'|'gap'|'generic'|'none', id, cites, scopeWord} */
  function classify(question) {
    prepareTerms();
    const bag = qBag(question);
    const exact = INTENTS.find((i) => normalize(i.q) === bag.norm.trim());
    if (exact) return { type: 'intent', id: exact.id };
    let best = null;
    INTENTS.forEach((d) => { const s = scoreDef(bag, d); if (s >= (d.min || 3) && (!best || s > best.s)) best = { d, s }; });
    let gap = null;
    GAPS.forEach((d) => { const s = scoreDef(bag, d); if (s >= 2 && (!gap || s > gap.s)) gap = { d, s }; });
    if (gap && (!best || gap.s >= best.s)) return { type: 'gap', id: gap.d.id };
    const other = OTHER && (OTHER.words || []).find((w) => bag.norm.includes(` ${normalize(w)} `));
    if (best && other && best.d.scope === 'local') return { type: 'gap', id: 'otro-ambito', scopeWord: other };
    if (best) return { type: 'intent', id: best.d.id };
    const found = search(question);
    const top = found[0];
    if (top && top.coverage >= 0.75 && top.strong.length >= 2) {
      const seen = new Set();
      const cites = found.filter((r) => r.coverage >= Math.max(0.5, top.coverage - 0.25) && r.strong.length >= 1)
        .filter((r) => { const k = `${r.doc}#${r.sec}#${r.text}`; if (seen.has(k)) return false; seen.add(k); return true; })
        .slice(0, 3).map((r) => ({ doc: r.doc, sec: r.sec, quote: r.text }));
      return { type: 'generic', cites };
    }
    return { type: 'none' };
  }

  /** Numeración de citas por orden de aparición (sin duplicados). */
  function finalize(spec) {
    const cites = [];
    const key = (c) => `${c.doc}#${c.sec}#${c.quote}`;
    const num = (c) => {
      const cc = { doc: c.doc, sec: String(c.sec), quote: T(c.quote) };
      let i = cites.findIndex((x) => key(x) === key(cc));
      if (i < 0) { cites.push(cc); i = cites.length - 1; }
      return i + 1;
    };
    const blk = (b) => ({ t: T(b.t), n: (b.c || []).map(num) });
    const blocks = spec.blocks.map((b) => (b.list ? { intro: b.intro ? blk(b.intro) : null, list: b.list.map(blk) } : blk(b)));
    return Object.assign({}, spec, { blocks, cites, note: spec.note ? T(spec.note) : null });
  }

  function answerOf(turn) {
    if (turn.type === 'llm' && turn.llm) {
      const base = turn.ref && INTENT[turn.ref] ? INTENT[turn.ref].build(turn.q) : null;
      return finalize({
        context: base ? base.context : null,
        kind: 'answer',
        blocks: turn.llm.blocks.map((b) => (b.list ? { intro: b.intro || null, list: b.list } : b)),
        note: LT(`Redactada por ${turn.llm.model} (${App.llm.via().es}) solo con los ${turn.llm.passages} fragmentos recuperados; cada cita se ha comprobado contra el texto original.`, `Written by ${turn.llm.model} (${App.llm.via().en}) using only the ${turn.llm.passages} retrieved passages; every citation has been checked against the original text.`),
        followups: []
      });
    }
    if (turn.type === 'intent') {
      const it = INTENT[turn.ref];
      if (!it) return null;
      return finalize(Object.assign({ kind: it.kind || 'answer' }, it.build(turn.q)));
    }
    if (turn.type === 'generic') {
      return finalize({
        kind: 'answer',
        blocks: [{ intro: { t: 'Pasajes de los documentos indexados que responden a la pregunta:', c: [] }, list: (turn.cites || []).map((c) => ({ t: `«${c.quote}»`, c: [c] })) }],
        followups: []
      });
    }
    return null;
  }
  function gapOf(turn) {
    if (turn.type === 'llm') return { topic: LT('Consulta al modelo', 'Model query'), reason: turn.llmReason || LT('El modelo no encuentra la respuesta en los fragmentos recuperados de los documentos indexados.', 'The model cannot find the answer in the passages retrieved from the indexed documents.') };
    if (turn.type === 'gap' && turn.ref === 'otro-ambito') {
      return { topic: OTHER.topic || 'Otro ámbito', reason: String(OTHER.reason || 'No hay evidencia para {x}.').replace('{x}', fmt.cap(turn.scopeWord || '')) };
    }
    if (turn.type === 'gap') return GAP[turn.ref] || null;
    return { topic: 'Sin tema reconocido', reason: `Ningún fragmento de los ${K().order.length} documentos indexados responde a esta pregunta.` };
  }
  function topicOf(turn) {
    if (turn.type === 'llm') return LT('Consulta al modelo', 'Model query');
    if (turn.type === 'intent') return (INTENT[turn.ref] || {}).topic || 'Consulta';
    if (turn.type === 'generic') return 'Consulta libre';
    const g = gapOf(turn);
    return g ? g.topic : 'Sin tema reconocido';
  }
  function secName(c) { const s = K().section(c.doc, c.sec); return s ? s.heading.replace(/^\d+\.\s*/, '') : ''; }
  function secShort(c) { return /^\d/.test(c.sec) ? `§${c.sec}` : 'resumen'; }
  function secSpoken(c) { return /^\d/.test(c.sec) ? `apartado ${c.sec}` : 'resumen'; }
  function refLabel(c) {
    const name = secName(c);
    return /^\d/.test(c.sec) ? `${c.doc} §${c.sec}${name ? ` ${name}` : ''}` : `${c.doc} · ${name || 'Resumen'}`;
  }

  function statsFor(question, ans) {
    const total = K().passages().length;
    const found = K().search(question);
    const keys = new Set(found.map((r) => `${r.doc}#${r.sec}`));
    (ans ? ans.cites : []).forEach((c) => keys.add(`${c.doc}#${c.sec}`));
    const k = ans ? ans.cites.length : 0;
    const nd = ans ? new Set(ans.cites.map((c) => c.doc)).size : 0;
    return { total, cands: Math.max(found.length, k), sections: keys.size, k, nd, docs: K().order.length };
  }
  function stepsFor(turn) {
    const s = turn.stats || statsFor(turn.q, turn.kind !== 'none' ? answerOf(turn) : null);
    const ans = turn.kind !== 'none';
    const steps = [
      { agent: AGENT, system: 'Agentic Platform', action: 'Interpreta la pregunta', result: `Tema: ${topicOf(turn)}`, ms: 42, wait: 300 },
      { agent: AGENT, system: 'Procedimientos', action: `Busca en ${s.docs} documentos vigentes, por texto y por significado`, result: `${s.total} fragmentos revisados · ${s.cands} candidatos`, ms: 214, wait: 560 },
      { agent: AGENT, system: 'Agentic Platform', action: 'Filtra por los permisos del usuario', result: `${UI.permission || 'Usuario'}: ${s.cands} de ${s.cands} accesibles`, ms: 26, wait: 280 },
      { agent: AGENT, system: 'Agentic Platform', action: 'Ordena los candidatos por pertinencia', result: ans ? `${fmt.plural(s.k, 'fragmento', 'fragmentos')} de ${fmt.plural(s.nd, 'documento', 'documentos')}` : 'Ningún fragmento por encima del umbral', ms: 131, wait: 380 },
      { agent: AGENT, system: 'Modelo de lenguaje', action: '¿Responden las fuentes a la pregunta?', result: turn.kind === 'answer' ? 'Sí: la respuesta está en las fuentes' : turn.kind === 'partial' ? 'En parte: remiten a un documento no indexado' : 'No: ningún fragmento responde', ms: 690, wait: 620, tone: turn.kind === 'answer' ? 'ok' : 'warn' }
    ];
    if (turn.llm) {
      const sysName = App.llm.systemName();
      steps[4] = Object.assign({}, steps[4], { system: sysName, ms: Math.round(turn.llm.ms * 0.35) });
      if (ans) steps.push({ agent: AGENT, system: sysName, action: 'Redacta la respuesta citando solo esos fragmentos', result: `${fmt.plural(s.k, 'cita comprobada', 'citas comprobadas')} contra el texto original`, ms: Math.round(turn.llm.ms * 0.65), wait: 500, tone: 'ok' });
      else steps.push({ agent: AGENT, system: 'Agentic Platform', action: 'Responde sin fuente', result: NONE_TITLE, ms: 14, wait: 320, tone: 'warn' });
      return steps;
    }
    if (ans) steps.push({ agent: AGENT, system: 'Modelo de lenguaje', action: 'Redacta la respuesta citando solo esos fragmentos', result: `${fmt.plural(s.k, 'cita comprobada', 'citas comprobadas')} contra el texto original`, ms: 1180 + s.k * 40, wait: 700, tone: 'ok' });
    else steps.push({ agent: AGENT, system: 'Agentic Platform', action: 'Responde sin fuente', result: NONE_TITLE, ms: 14, wait: 320, tone: 'warn' });
    return steps;
  }

  /* ---------------------------------------------------------------- Piezas de la vista */

  function selectedCite(ctx) {
    const sel = ctx.local.sel;
    if (!sel) return null;
    if (sel.doc) return { doc: sel.doc, sec: sel.sec || null, quote: sel.quote || null, n: null, turn: null };
    const turn = (ctx.local.turns || []).find((t) => t.id === sel.turn);
    const ans = turn && answerOf(turn);
    const c = ans && ans.cites[sel.n - 1];
    return c ? Object.assign({ n: sel.n, turn: turn.id }, c) : null;
  }

  function citeButtons(turnId, ns, cites, active) {
    return ns.map((n) => {
      const c = cites[n - 1];
      const on = active && active.turn === turnId && active.n === n;
      return html`<button type="button" class="cite${on ? ' is-active' : ''}" data-cite="${n}" data-turn="${turnId}" title="${refLabel(c)}" aria-label="Fuente ${n}: ${c.doc}, ${secSpoken(c)}">${n}</button>`;
    });
  }
  function blockLine(turnId, b, cites, active) {
    return html`${b.t}${b.n.length ? html`&nbsp;${citeButtons(turnId, b.n, cites, active)}` : ''}`;
  }
  function answerBody(turn, ans, active) {
    return html`<div class="pr-body">${ans.blocks.map((b) => (b.list
      ? html`${b.intro ? html`<p>${blockLine(turn.id, b.intro, ans.cites, active)}</p>` : ''}<ul>${b.list.map((li) => html`<li>${blockLine(turn.id, li, ans.cites, active)}</li>`)}</ul>`
      : html`<p>${blockLine(turn.id, b, ans.cites, active)}</p>`))}</div>`;
  }

  function contextBlock(ans) {
    const c = ans.context;
    if (!c) return '';
    const out = c.outcome ? App.outcome(c.outcome) : null;
    return html`<div class="pr-context">${App.callout({
      tone: 'brand',
      icon: 'link',
      title: UI.context_title || 'Aplicado hoy',
      body: html`<p>${T(c.text)}</p>
        <div class="row mt-2">${App.sysList(c.systems)}${out ? chip(out.status === 'rejected' ? 'rejected' : 'approved', out.label || undefined) : ''}${c.lot ? App.lotTag(c.lot) : ''}</div>`,
      actions: c.go ? html`<button type="button" class="btn btn-secondary btn-sm" data-go="${c.go}">${c.goLabel}${icon('arrow-right', 15)}</button>` : ''
    })}</div>`;
  }

  function sourcesBlock(turn, ans, active) {
    if (!ans.cites.length) return '';
    return html`<div class="pr-sources">
      <div class="pr-label">Fuentes</div>
      <ol class="pr-src-list">${ans.cites.map((c, i) => {
        const d = K().get(c.doc);
        const on = active && active.turn === turn.id && active.n === i + 1;
        return html`<li><button type="button" class="pr-src${on ? ' is-active' : ''}" data-cite="${i + 1}" data-turn="${turn.id}">
          <span class="pr-src-n">${i + 1}</span>
          <span class="pr-src-main"><span class="pr-src-ref"><span class="code">${c.doc}</span> · ${/^\d/.test(c.sec) ? `§${c.sec} ` : ''}${secName(c)}</span><span class="pr-src-quote">«${c.quote}»</span></span>
          <span class="pr-src-rev">Rev. ${d ? d.version : '—'}</span>
        </button></li>`;
      })}</ol>
    </div>`;
  }

  function noneBlock(turn) {
    const g = gapOf(turn);
    const rel = g && g.related ? K().unindexed[g.related] : null;
    const routeTo = UI.route_to || 'Calidad';
    return html`<div class="pr-none">${App.callout({
      tone: 'warn',
      icon: 'search',
      title: NONE_TITLE,
      body: html`<p>${g ? g.reason : ''}</p>
        ${rel ? html`<p><span class="code">${rel.code}</span> (${rel.title}) se menciona en ${rel.mentionedIn.doc}, apartado ${rel.mentionedIn.sec}, pero no está indexado.
          <button type="button" class="link-btn" data-open-doc="${rel.mentionedIn.doc}" data-sec="${rel.mentionedIn.sec}" data-quote="${rel.mentionedIn.quote}">Ver la mención</button></p>` : ''}
        <p>Sin una fuente no se genera respuesta. La pregunta puede derivarse a ${routeTo} para que la conteste o incorpore el documento.</p>`,
      actions: turn.routed
        ? chip('done', `Derivada a ${routeTo} · ${fmt.time(turn.routed)}`)
        : html`<button type="button" class="btn btn-secondary btn-sm" data-action="route" data-turn="${turn.id}">${icon('send', 15)}<span>Derivar a ${routeTo}</span></button>`
    })}</div>`;
  }

  function kindChip(turn, ans) {
    if (turn.kind === 'none') return chip({ tone: 'warn', icon: 'alert-triangle', label: 'Sin evidencia suficiente' });
    if (turn.kind === 'partial') return chip({ tone: 'warn', icon: 'alert-circle', label: 'Evidencia parcial' });
    const nd = new Set(ans.cites.map((c) => c.doc)).size;
    return chip({ tone: 'ok', icon: 'check', label: `${fmt.plural(ans.cites.length, 'cita', 'citas')} · ${fmt.plural(nd, 'documento', 'documentos')}` });
  }

  function questionRow(turn) {
    return html`<div class="pr-q"><span class="pr-avatar" aria-hidden="true">${UI.asker_initials || D.meta.user_initials || 'TU'}</span><div class="pr-q-text">${turn.q}</div><span class="pr-q-time">${fmt.time(turn.at)}</span></div>`;
  }

  function ratingBlock(turn) {
    if (turn.rating) {
      const up = turn.rating === 'up';
      return html`<span class="pr-rate is-done">${chip({ tone: up ? 'ok' : 'warn', icon: up ? 'check' : 'x', label: up ? 'Valorada como útil' : 'Valorada como no útil' })}</span>`;
    }
    return html`<span class="pr-rate"><span class="muted xs">¿Te ha servido?</span>
      <button type="button" class="btn btn-ghost btn-sm" data-action="rate" data-rate="up" data-turn="${turn.id}" aria-label="Útil">${icon('check', 15)}<span>Sí</span></button>
      <button type="button" class="btn btn-ghost btn-sm" data-action="rate" data-rate="down" data-turn="${turn.id}" aria-label="No útil">${icon('x', 15)}<span>No</span></button></span>`;
  }

  function turnHTML(turn, active) {
    const ans = turn.kind !== 'none' ? answerOf(turn) : null;
    const follow = ans && ans.followups ? ans.followups.filter((id) => INTENT[id]) : [];
    return html`<li class="pr-turn" id="pr-${turn.id}" data-turn-id="${turn.id}">
      ${questionRow(turn)}
      <div class="pr-a${turn.kind === 'none' ? ' is-none' : turn.kind === 'partial' ? ' is-partial' : ''}">
        <div class="pr-a-head">${icon('workflow', 16)}<span class="strong">Agentic Platform</span><span class="muted">· agente ${AGENT}</span>${ans || turn.kind === 'none' ? kindChip(turn, ans) : ''}${turn.llm ? html`<span class="llm-badge" title="LiteLLM">${icon('cpu', 12)}${turn.llm.model}</span>` : ''}<span class="spacer"></span><span class="muted xs nowrap">Respondida en ${fmt.ms(turn.ms)}</span></div>
        ${ans ? answerBody(turn, ans, active) : noneBlock(turn)}
        ${ans && ans.note ? html`<div class="pr-note">${icon('info', 15)}<span>${ans.note}</span></div>` : ''}
        ${ans ? contextBlock(ans) : ''}
        ${ans ? sourcesBlock(turn, ans, active) : ''}
        <div class="pr-a-foot">
          <details class="run-log pr-log"><summary>${icon('chevron-right', 16)}<span>Cómo se ha respondido · ${stepsFor(turn).length} pasos · ${fmt.ms(turn.ms)}</span></summary><div class="mt-2" data-log="${turn.id}"></div></details>
          ${ans ? ratingBlock(turn) : ''}
          ${ans ? html`<button type="button" class="btn btn-ghost btn-sm pr-copy" data-action="copy" data-turn="${turn.id}">${icon('copy', 15)}<span>Copiar respuesta</span></button>` : ''}
        </div>
        ${follow.length ? html`<div class="pr-follow"><span class="pr-label">Relacionadas</span>${follow.map((id) => html`<button type="button" class="pr-chip" data-ask="${id}">${INTENT[id].q}</button>`)}</div>` : ''}
      </div>
    </li>`;
  }

  function suggestions(compact, turns) {
    if (compact) {
      const asked = new Set((turns || []).filter((t) => (t.type === 'intent' || t.type === 'llm') && t.ref).map((t) => t.ref));
      const left = SUGGESTED.filter((id) => !asked.has(id));
      if (!left.length) return '';
      return html`<div class="pr-chips"><span class="pr-label">Preguntas sugeridas</span>${left.map((id) => html`<button type="button" class="pr-chip" data-ask="${id}">${INTENT[id].q}</button>`)}</div>`;
    }
    return html`<div class="pr-suggest">${SUGGESTED.map((id) => html`<button type="button" class="pr-sugg" data-ask="${id}">${icon(INTENT[id].icon || 'book-open', 18)}<span>${INTENT[id].q}</span></button>`)}</div>`;
  }

  function hintText() { return `Busca en ${K().order.length} documentos vigentes. Pulsa Intro para preguntar.`; }

  function consultaCard(ctx, turns, active) {
    const body = html`
      ${turns.length
        ? html`<ol class="pr-thread" id="pr-thread">${turns.map((t) => turnHTML(t, active))}</ol>`
        : html`<div class="pr-intro" id="pr-intro">
            <div class="h3">${UI.intro_title || 'Pregunta sobre los procedimientos'}</div>
            <p class="slate small mt-1">${UI.intro_text || 'Cada frase de la respuesta cita el documento y el apartado de donde sale. Si ningún documento indexado lo recoge, la consulta lo indica y no responde.'}</p>
            ${suggestions(false)}
          </div>`}
      <div class="pr-compose">
        <form class="pr-ask" data-form="ask" autocomplete="off">
          <label class="sr-only" for="pr-q">Pregunta sobre los procedimientos</label>
          <input id="pr-q" class="input" name="q" type="text" maxlength="300" placeholder="${UI.placeholder || 'Escribe una pregunta sobre los procedimientos'}" ${App.attrs({ disabled: ctx.vars.busy ? true : null })}>
          <button type="submit" class="btn btn-primary" data-ask-btn ${App.attrs({ disabled: ctx.vars.busy ? true : null })}>${icon('send')}<span>Preguntar</span></button>
        </form>
        <div class="pr-hint" id="pr-hint" aria-live="polite">${hintText()}</div>
        ${turns.length ? suggestions(true, turns) : ''}
      </div>`;
    return App.card({
      id: 'pr-consulta',
      title: 'Consulta',
      sub: 'Respuestas extraídas de los documentos vigentes, con la cita de cada frase',
      icon: 'message-square',
      flush: true,
      actions: turns.length ? html`<button type="button" class="btn btn-ghost btn-sm" data-action="clear">${icon('rotate-ccw', 15)}<span>Nueva consulta</span></button>` : '',
      body
    });
  }

  function docView(c) {
    const d = K().get(c.doc);
    if (!d) return '';
    return App.docPreview({
      code: d.code, title: d.title, version: d.version, date: d.date, owner: d.owner, org: P.doc_org,
      sections: d.sections,
      highlight: c.sec ? { section: c.sec, text: c.quote || '', tone: 'brand' } : null
    });
  }

  function sourceCard(ctx) {
    const c = selectedCite(ctx);
    const turns = ctx.local.turns || [];
    const last = turns[turns.length - 1];
    if (!c) {
      const lastNone = last && last.kind === 'none' && !ctx.local.sel;
      return App.card({
        id: 'pr-source', class: 'pr-source-card', title: 'Fuente', icon: 'book-open',
        sub: lastNone ? 'La última pregunta no tiene fuente' : 'Documento y pasaje citados',
        body: App.empty({
          icon: lastNone ? 'search' : 'book-open',
          title: lastNone ? 'Sin fuente para la última pregunta' : 'Selecciona una cita',
          text: lastNone ? `Ningún pasaje de los ${K().order.length} documentos indexados responde a «${last.q}». No se muestra ninguna cita.` : 'Pulsa un número de cita de la respuesta o un documento de la biblioteca: se abre aquí con el pasaje exacto resaltado.'
        })
      });
    }
    const d = K().get(c.doc);
    const s = c.sec ? K().section(c.doc, c.sec) : null;
    return App.card({
      id: 'pr-source', class: 'pr-source-card', title: 'Fuente', icon: 'book-open',
      sub: c.n ? `Cita ${c.n} · ${c.doc} · ${s ? s.heading : ''}` : `${c.doc} · ${s ? s.heading : 'documento completo'}`,
      actions: html`<button type="button" class="btn btn-ghost btn-sm" data-action="doc-full" title="Abrir el documento completo">${icon('maximize', 15)}<span>Ampliar</span></button>`,
      flush: true,
      body: html`<div class="pr-src-meta">
          ${c.n ? html`<span class="pr-src-n">${c.n}</span>` : ''}
          <span class="pr-src-meta-main"><span class="strong"><span class="code">${d.code}</span> · ${d.short || d.title}</span><span class="pr-src-meta-sub">${d.type} · revisión ${d.version} · vigente desde ${fmt.date(d.date)}</span></span>
          ${chip('ok', 'Vigente')}
        </div>
        ${c.quote ? html`<div class="pr-quote">${icon('file-text', 15)}<span>Pasaje citado: «${c.quote}»</span></div>` : ''}
        <div class="pr-doc-scroll" id="pr-doc-scroll">${docView(c)}</div>`,
      footer: html`<span class="muted small row">${sys(DOC_SYS)}<span>Documento controlado · copia indexada el ${fmt.date(K().indexedAt, { time: true })}</span></span>`
    });
  }

  function citeCounts(ctx) {
    const out = {};
    (ctx.local.turns || []).forEach((t) => {
      const ans = t.kind !== 'none' ? answerOf(t) : null;
      if (ans) ans.cites.forEach((c) => { out[c.doc] = (out[c.doc] || 0) + 1; });
    });
    return out;
  }

  function libraryCard(ctx) {
    const counts = citeCounts(ctx);
    const pcount = {};
    K().passages().forEach((p) => { pcount[p.doc] = (pcount[p.doc] || 0) + 1; });
    const cur = selectedCite(ctx);
    const unindexed = Object.values(K().unindexed);
    return App.card({
      id: 'pr-library',
      title: 'Documentos indexados',
      sub: `${K().order.length} documentos vigentes · ${K().passages().length} fragmentos · origen: ${DOC_SYS}`,
      icon: 'layers',
      flush: true,
      body: App.table({
        dense: true,
        clickable: true,
        rows: K().all(),
        rowAttrs: (d) => ({ 'data-open-doc': d.code }),
        rowClass: (d) => (cur && cur.doc === d.code ? 'is-selected' : ''),
        cols: [
          { label: 'Documento', render: (d) => html`<span class="code strong">${d.code}</span><span class="sub">${d.title}</span>` },
          { label: 'Tipo', width: '13%', render: (d) => d.type },
          { label: 'Revisión', width: '8%', render: (d) => `Rev. ${d.version}` },
          { label: 'Vigente desde', width: '11%', render: (d) => fmt.date(d.date) },
          { label: 'Propietario', width: '15%', render: (d) => d.owner },
          { label: 'Fragmentos', width: '9%', num: true, render: (d) => fmt.num(pcount[d.code] || 0) },
          { label: 'Citas en la sesión', width: '11%', num: true, render: (d) => (counts[d.code] ? html`<span class="strong">${fmt.num(counts[d.code])}</span>` : html`<span class="muted">—</span>`) },
          { label: 'Estado', width: '8%', render: () => chip('ok', 'Vigente') }
        ]
      }),
      footer: unindexed.length ? html`<span class="muted small row row-nowrap" style="align-items:flex-start">${icon('info', 16)}<span>${unindexed.map((u) => html`Citado y no indexado: <span class="code">${u.code}</span> ${u.title} (se menciona en ${u.mentionedIn.doc}, apartado ${u.mentionedIn.sec}). Las preguntas sobre su contenido se responden «sin evidencia suficiente». `)}</span></span>` : ''
    });
  }

  /* ---------------------------------------------------------------- Acciones */

  function isStacked(ctx) {
    const side = ctx.$('.pr-side');
    const main = ctx.$('.pr-main');
    if (!side || !main) return true;
    return side.getBoundingClientRect().top >= main.getBoundingClientRect().bottom - 2;
  }
  function scrollToMark(box) {
    if (!box) return;
    const m = box.querySelector('mark.hl') || box.querySelector('.doc-sec.is-hl');
    if (!m) { box.scrollTop = 0; return; }
    const top = m.getBoundingClientRect().top - box.getBoundingClientRect().top + box.scrollTop - 56;
    box.scrollTop = Math.max(0, top);
  }
  function refreshSource(ctx) {
    const el = ctx.$('#pr-source');
    if (el) el.outerHTML = String(sourceCard(ctx));
    const cur = ctx.local.sel || {};
    ctx.$$('.cite[data-turn], .pr-src[data-turn]').forEach((b) => {
      b.classList.toggle('is-active', b.getAttribute('data-turn') === cur.turn && Number(b.getAttribute('data-cite')) === cur.n);
    });
    const docCode = (selectedCite(ctx) || {}).doc;
    ctx.$$('#pr-library tr[data-open-doc]').forEach((tr) => tr.classList.toggle('is-selected', tr.getAttribute('data-open-doc') === docCode));
    requestAnimationFrame(() => scrollToMark(ctx.$('#pr-doc-scroll')));
  }
  function docModal(c) {
    const d = K().get(c.doc);
    if (!d) return;
    const s = c.sec ? K().section(c.doc, c.sec) : null;
    const m = App.modal({
      title: d.title,
      kicker: c.n ? `Fuente ${c.n} · ${d.code} · ${s ? s.heading : ''}` : `${d.code} · ${d.type}`,
      size: 'lg',
      body: html`${c.quote ? html`<div class="pr-quote mb-4">${icon('file-text', 15)}<span>Pasaje citado: «${c.quote}»</span></div>` : ''}${docView(c)}`,
      actions: [
        c.quote ? { label: 'Copiar referencia', icon: 'copy', variant: 'ghost', left: true, close: false, onClick: () => { App.copyText(`${d.code} (rev. ${d.version}), ${s ? s.heading : ''}: «${c.quote}»`, 'Referencia copiada'); return false; } } : null,
        { label: 'Cerrar', variant: 'primary' }
      ].filter(Boolean)
    });
    if (m) requestAnimationFrame(() => scrollToMark(m.body));
  }
  function select(ctx, sel) {
    ctx.setLocal({ sel });
    const c = selectedCite(ctx);
    if (!c) return;
    if (isStacked(ctx)) { refreshSource(ctx); docModal(c); return; }
    refreshSource(ctx);
  }

  function plainAnswer(turn) {
    const ans = turn.kind !== 'none' ? answerOf(turn) : null;
    if (!ans) {
      const g = gapOf(turn);
      return `${NONE_TITLE}. ${g ? g.reason : ''}`.trim();
    }
    const line = (b) => `${b.t}${b.n.length ? ' ' + b.n.map((n) => `[${n}]`).join('') : ''}`;
    const parts = [];
    ans.blocks.forEach((b) => {
      if (b.list) { if (b.intro) parts.push(line(b.intro)); b.list.forEach((li) => parts.push(`- ${line(li)}`)); } else parts.push(line(b));
    });
    if (ans.note) parts.push(ans.note);
    return parts.join('\n');
  }
  function plainSources(turn) {
    const ans = turn.kind !== 'none' ? answerOf(turn) : null;
    if (!ans) return [];
    return ans.cites.map((c, i) => { const d = K().get(c.doc); return `[${i + 1}] ${c.doc} (rev. ${d ? d.version : '—'}), ${secName(c)}: «${c.quote}»`; });
  }

  /* ---------------------------------------------------------------- Modelo local (LiteLLM) */

  function LT(es, en) { return EN ? en : es; }
  /** Pasajes para el modelo: los de la respuesta preparada (si la pregunta es una sugerida) y los mejores de la búsqueda. */
  function passagesFor(q, turn) {
    const out = [];
    const seen = new Set();
    const add = (doc, sec, text) => {
      const k = `${doc}#${sec}#${text}`;
      if (seen.has(k) || out.length >= 10) return;
      seen.add(k);
      out.push({ doc, sec: String(sec), text });
    };
    if (turn.type === 'intent' || turn.type === 'generic') {
      const prepared = answerOf(turn);
      (prepared ? prepared.cites : []).forEach((c) => {
        const s = section(c.doc, c.sec);
        const full = s ? (s.text || []).concat(s.list || []).find((t) => t.indexOf(c.quote) >= 0) : null;
        add(c.doc, c.sec, full || c.quote);
      });
    }
    search(q, { limit: 12 }).filter((r) => r.coverage >= 0.25).forEach((r) => add(r.doc, r.sec, r.text));
    return out;
  }
  function parseModel(text, passages) {
    const blocks = [];
    let list = null;
    const toBlock = (line) => {
      const ns = [];
      const t = line.replace(/\s*\[(\d+(?:\s*[,;]\s*\d+)*)\]/g, (m, g) => { g.split(/[,;]/).forEach((n) => { const i = parseInt(n, 10); if (i >= 1 && i <= passages.length && !ns.includes(i)) ns.push(i); }); return ''; }).replace(/\*\*/g, '').trim();
      return { t, c: ns.map((i) => ({ doc: passages[i - 1].doc, sec: passages[i - 1].sec, quote: passages[i - 1].text })) };
    };
    String(text).split(/\n+/).map((l) => l.trim()).filter(Boolean).forEach((l) => {
      const li = /^(?:[-*•]|\d+[.)])\s+(.*)$/.exec(l);
      if (li) {
        if (!list) { list = { intro: null, list: [] }; blocks.push(list); }
        list.list.push(toBlock(li[1]));
      } else {
        const b = toBlock(l);
        if (!b.t) return;
        if (/:$/.test(b.t) && !b.c.length) { list = { intro: b, list: [] }; blocks.push(list); return; }
        list = null;
        blocks.push(b);
      }
    });
    const clean = blocks.filter((b) => (b.list ? b.list.length : b.t));
    const cited = clean.some((b) => (b.list ? b.list.some((x) => x.c.length) || (b.intro && b.intro.c.length) : b.c.length));
    return { blocks: clean, cited };
  }
  async function askModel(q, turn, signal) {
    const passages = passagesFor(q, turn);
    if (!passages.length) return { type: 'llm', kind: 'none', ref: turn.ref, llm: null, llmReason: LT(`Ningún fragmento de los ${K().order.length} documentos indexados se parece a la pregunta; no se consulta al modelo.`, `No passage in the ${K().order.length} indexed documents resembles the question; the model is not called.`) };
    const org = (D.meta && (D.meta.doc_org || D.meta.company)) || '';
    const system = EN
      ? `You are the ${AGENT} agent of Agentic Platform for ${org}. Answer the user's question using ONLY the numbered passages from the company's current procedures. Every sentence must end with the citation of the passage(s) it comes from, written as [n]. Do not invent figures, deadlines, roles or steps that are not in the passages. If the passages do not answer the question, reply exactly NO_EVIDENCE. Answer in English, in at most 6 short sentences or a short bulleted list, without a title.`
      : `Eres el agente ${AGENT} de Agentic Platform para ${org}. Responde a la pregunta del usuario usando SOLO los pasajes numerados de los procedimientos vigentes de la empresa. Cada frase debe terminar con la cita del pasaje o pasajes de los que sale, escrita como [n]. No inventes cifras, plazos, roles ni pasos que no estén en los pasajes. Si los pasajes no responden a la pregunta, responde exactamente NO_EVIDENCE. Responde en español, en 6 frases cortas como máximo o una lista breve, sin título.`;
    const user = `${EN ? 'Question' : 'Pregunta'}: ${q}\n\n${EN ? 'Passages' : 'Pasajes'}:\n${passages.map((p, i) => { const s = section(p.doc, p.sec); return `[${i + 1}] ${p.doc} §${p.sec}${s ? ` (${s.heading.replace(/^\d+\.\s*/, '')})` : ''}: ${p.text}`; }).join('\n')}`;
    const r = await App.llm.chat({ system, user, maxTokens: 700, signal });
    if (/NO_EVIDENCE/.test(r.text)) return { type: 'llm', kind: 'none', ref: turn.ref, llm: null, llmModel: r.model, llmReason: LT(`${r.model} no encuentra la respuesta en los ${passages.length} fragmentos recuperados.`, `${r.model} cannot find the answer in the ${passages.length} retrieved passages.`) };
    const parsed = parseModel(r.text, passages);
    if (!parsed.cited) return { type: 'llm', kind: 'none', ref: turn.ref, llm: null, llmModel: r.model, llmReason: LT(`${r.model} ha respondido sin citar ninguna fuente, así que la respuesta se descarta.`, `${r.model} answered without citing any source, so the answer is discarded.`) };
    return { type: 'llm', kind: 'answer', ref: turn.ref, llm: { blocks: parsed.blocks, model: r.model, ms: r.ms, passages: passages.length } };
  }

  async function ask(ctx, raw, forcedId) {
    const input = ctx.$('#pr-q');
    const q = String(raw || '').trim().replace(/\s+/g, ' ');
    const hint = ctx.$('#pr-hint');
    if (!q) {
      if (hint) { hint.textContent = 'Escribe una pregunta o elige una de las sugeridas.'; hint.classList.add('t-warn'); }
      if (input) input.focus();
      return;
    }
    if (ctx.vars.busy) return;
    ctx.vars.busy = true;
    const typed = !(forcedId && INTENT[forcedId]);
    const res = typed ? classify(q) : { type: 'intent', id: forcedId };
    const seqN = (ctx.local.seq || 0) + 1;
    const turn = { id: `t${seqN}`, q, type: res.type, ref: res.id || null, scopeWord: res.scopeWord || null, cites: res.cites || null, at: App.nowISO(), routed: null, rating: null };
    turn.kind = res.type === 'intent' ? ((INTENT[res.id] && INTENT[res.id].kind) || 'answer') : res.type === 'generic' ? 'answer' : 'none';
    let ans = turn.kind !== 'none' ? answerOf(turn) : null;
    let steps = null;

    App.audit('Pregunta a los procedimientos', `«${q}»`);
    if (input) { input.value = ''; input.disabled = true; }
    ctx.$$('[data-ask-btn], [data-ask]').forEach((b) => { b.disabled = true; });
    if (hint) { hint.classList.remove('t-warn'); hint.textContent = `Consultando ${K().order.length} documentos…`; }

    let thread = ctx.$('#pr-thread');
    if (!thread) {
      const intro = ctx.$('#pr-intro');
      thread = document.createElement('ol');
      thread.className = 'pr-thread';
      thread.id = 'pr-thread';
      if (intro) intro.replaceWith(thread); else ctx.$('#pr-consulta .card-body').prepend(thread);
    }
    thread.insertAdjacentHTML('beforeend', String(html`<li class="pr-turn is-pending" id="pr-${turn.id}">${questionRow(turn)}
      <div class="pr-a"><div class="pr-a-head">${icon('workflow', 16)}<span class="strong">Agentic Platform</span><span class="muted">· agente ${AGENT}</span>${chip('running', 'Consultando')}</div><div class="pr-run mt-2" id="pr-run-${turn.id}"></div></div></li>`));
    const li = ctx.$(`#pr-${turn.id}`);
    if (li) li.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    ctx.presenter({ next: 'Mientras responde: busca en los documentos, filtra por permisos, comprueba que las fuentes responden y solo entonces redacta.' });

    if (App.llm && App.llm.isLocal()) {
      try {
        const got = await askModel(q, turn, ctx.signal);
        if (!ctx.alive()) return;
        Object.assign(turn, got);
      } catch (e) {
        if (!ctx.alive()) return;
        App.toast(LT(`El modelo no ha respondido (${e.message}). Se muestra la respuesta preparada.`, `The model did not answer (${e.message}). Showing the prepared answer.`), { tone: 'warn', icon: 'alert-triangle', duration: 7000 });
      }
    }
    ans = turn.kind !== 'none' ? answerOf(turn) : null;
    turn.stats = statsFor(q, ans);
    steps = stepsFor(turn);
    const run = App.reasoningStream(ctx.$(`#pr-run-${turn.id}`), steps, { title: `Consulta · ${topicOf(turn)}`, signal: ctx.signal, maxHeight: 280, controls: false, start: turn.at });
    const r = await run.done;
    if (!ctx.alive()) return;
    ctx.vars.busy = false;
    turn.ms = r.ms;
    const turns = (ctx.local.turns || []).concat([turn]);
    ctx.setLocal({ turns, seq: seqN, sel: ans && ans.cites.length ? { turn: turn.id, n: 1 } : null });
    if (ans) {
      const refs = Array.from(new Set(ans.cites.map((c) => `${c.doc} ${secShort(c)}`)));
      App.audit(turn.kind === 'partial' ? 'Respuesta con evidencia parcial' : 'Respuesta con citas', `${fmt.plural(ans.cites.length, 'cita', 'citas')}: ${refs.join(', ')}`, AGENT_ACTOR);
    } else {
      const g = gapOf(turn);
      App.audit('Respuesta sin evidencia suficiente', `«${q}» · sin citas${g && g.related ? ` · documento relacionado no indexado: ${g.related}` : ''}`, AGENT_ACTOR);
    }
    ctx.presenter(null);
    ctx.rerender();
    requestAnimationFrame(() => {
      const el = ctx.$(`#pr-${turn.id}`);
      const top = el ? el.getBoundingClientRect().top : 0;
      if (el && (top > window.innerHeight * 0.45 || top < 56)) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const again = ctx.$('#pr-q');
      if (typed && again && !isStacked(ctx)) again.focus({ preventScroll: true });
    });
  }

  function patchTurn(ctx, id, patch) {
    const turns = (ctx.local.turns || []).map((t) => (t.id === id ? Object.assign({}, t, patch) : t));
    ctx.setLocal({ turns });
    return turns.find((x) => x.id === id) || null;
  }
  function routeTurn(ctx, id) {
    const t = patchTurn(ctx, id, { routed: App.nowISO() });
    if (!t) return;
    const to = UI.route_to || 'Calidad';
    App.audit(`Consulta derivada a ${to}`, `«${t.q}»`);
    App.toast(`Pregunta derivada a ${to}`, { tone: 'ok', icon: 'send' });
    ctx.rerender();
  }
  function rateTurn(ctx, id, rating) {
    const t = patchTurn(ctx, id, { rating });
    if (!t) return;
    App.audit('Valoración de la respuesta', `«${t.q}» · ${rating === 'up' ? 'útil' : 'no útil'}`);
    App.toast(rating === 'up' ? 'Gracias: valoración registrada' : 'Valoración registrada: la revisará el propietario del documento', { tone: rating === 'up' ? 'ok' : 'warn', icon: rating === 'up' ? 'check' : 'info' });
    ctx.rerender();
  }

  function fillLog(ctx, id) {
    const host = ctx.$(`[data-log="${id}"]`);
    if (!host || host.childElementCount) return;
    const t = (ctx.local.turns || []).find((x) => x.id === id);
    if (!t) return;
    App.reasoningStream(host, stepsFor(t), { title: `Consulta · ${topicOf(t)}`, instant: true, start: t.at, maxHeight: 320 });
  }

  function exportReport(ctx) {
    const turns = ctx.local.turns || [];
    if (!turns.length) return;
    const withCites = turns.filter((t) => t.kind !== 'none').length;
    const R = P.report || {};
    App.printableReport({
      title: R.title || UI.page_title || 'Consulta de procedimientos',
      subtitle: `${fmt.plural(turns.length, 'pregunta', 'preguntas')} · respuestas con cita al documento y apartado`,
      code: `${R.code_prefix || 'CON-PROC'}-${D.meta.today.replace(/-/g, '')}`,
      filename: `${R.filename || 'consulta-procedimientos'}-${D.meta.today}`,
      meta: [[R.scope_label || 'Ámbito', R.scope || D.meta.site], ['Consultado por', UI.asker_role || D.meta.user_role], ['Documentos indexados', `${K().order.length} vigentes (${DOC_SYS})`], ['Con fuente', `${withCites} de ${turns.length}`], ['Sin evidencia', String(turns.length - withCites)]],
      sections: turns.map((t, i) => {
        const s = { heading: `${i + 1}. ${t.q}`, text: plainAnswer(t) + (t.rating ? `\n\nValoración: ${t.rating === 'up' ? 'útil' : 'no útil'}.` : '') };
        const src = plainSources(t);
        if (src.length) s.list = src;
        return s;
      }).concat([{ heading: 'Nota', callout: 'Las respuestas citan solo pasajes literales de los documentos vigentes indexados. Una pregunta sin fuente se responde «No hay evidencia suficiente en los procedimientos indexados», sin citas.' }]),
      signatures: [{ role: UI.asker_role || D.meta.user_role, note: 'Consulta realizada' }]
    });
  }

  /* ---------------------------------------------------------------- Registro de la escena */

  const PR = P.presenter || {};
  const scene = App.scene({
    id: 'procedimientos',
    order: 70,
    section: P.section || 'Calidad',
    nav: P.nav || 'Procedimientos',
    title: P.title || 'Preguntar a los procedimientos',
    icon: 'book-open',
    presenter: {
      say: (state) => {
        const turns = (state.scenes.procedimientos && state.scenes.procedimientos.turns) || [];
        const answered = turns.some((t) => t.kind !== 'none');
        const none = turns.some((t) => t.kind === 'none');
        const out = (PR.say || []).slice();
        if (!turns.length && PR.say_empty) out.push(PR.say_empty);
        if (answered && PR.say_answered) out.push(PR.say_answered);
        if (none && PR.say_none) out.push(PR.say_none);
        return out;
      },
      next: (state) => {
        const turns = (state.scenes.procedimientos && state.scenes.procedimientos.turns) || [];
        if (!turns.length) return PR.next_empty || '';
        if (!turns.some((t) => t.kind === 'none')) return PR.next_answered || '';
        return PR.next_done || '';
      }
    },
    render(root, ctx) {
      const deep = ctx.params && ctx.params[0] ? K().get(ctx.params[0]) : null;
      if (deep && !(ctx.vars.deepDone)) {
        ctx.vars.deepDone = true;
        ctx.setLocal({ sel: { doc: deep.code, sec: ctx.params[1] && K().section(deep.code, ctx.params[1]) ? String(ctx.params[1]) : null } });
      }
      const turns = ctx.local.turns || [];
      const active = ctx.local.sel && ctx.local.sel.turn ? ctx.local.sel : null;
      const idx = K().indexedAt;
      root.innerHTML = String(html`
        ${App.pageHead({
          title: UI.page_title || 'Consulta de procedimientos',
          meta: [
            { icon: 'book-open', text: `${K().order.length} documentos vigentes` },
            { icon: 'layers', text: `${fmt.num(K().passages().length)} fragmentos indexados` },
            { icon: 'history', text: `Índice actualizado el ${fmt.date(idx.slice(0, 10))} a las ${fmt.time(idx)}` },
            sys(DOC_SYS)
          ],
          actions: turns.length ? html`<button type="button" class="btn btn-secondary" data-action="export">${icon('printer')}<span>Exportar consulta (PDF)</span></button>` : ''
        })}
        <div class="pr-wrap">
          <div class="pr-grid">
            <div class="pr-main">${consultaCard(ctx, turns, active)}</div>
            <aside class="pr-side" aria-label="Fuente citada">${sourceCard(ctx)}</aside>
          </div>
        </div>
        <div class="section">${libraryCard(ctx)}</div>
      `);
      requestAnimationFrame(() => scrollToMark(ctx.$('#pr-doc-scroll')));

      ctx.on('submit', 'form[data-form="ask"]', (e, form) => { e.preventDefault(); ask(ctx, form.querySelector('input').value); });
      ctx.on('click', '[data-ask]', (e, el) => { const id = el.getAttribute('data-ask'); if (INTENT[id]) ask(ctx, INTENT[id].q, id); });
      ctx.on('click', '[data-cite]', (e, el) => { e.preventDefault(); select(ctx, { turn: el.getAttribute('data-turn'), n: Number(el.getAttribute('data-cite')) }); });
      ctx.on('click', '[data-open-doc]', (e, el) => {
        const code = el.getAttribute('data-open-doc');
        if (!K().get(code)) return;
        select(ctx, { doc: code, sec: el.getAttribute('data-sec') || null, quote: el.getAttribute('data-quote') || null });
      });
      ctx.on('click', '[data-action="doc-full"]', () => { const c = selectedCite(ctx); if (c) docModal(c); });
      ctx.on('click', '[data-action="route"]', (e, el) => routeTurn(ctx, el.getAttribute('data-turn')));
      ctx.on('click', '[data-action="rate"]', (e, el) => rateTurn(ctx, el.getAttribute('data-turn'), el.getAttribute('data-rate')));
      ctx.on('click', '[data-action="copy"]', (e, el) => {
        const t = (ctx.local.turns || []).find((x) => x.id === el.getAttribute('data-turn'));
        if (t) App.copyText(`Pregunta: ${t.q}\n\n${plainAnswer(t)}\n\nFuentes:\n${plainSources(t).join('\n')}`, 'Respuesta copiada con sus fuentes');
      });
      ctx.on('click', '[data-action="export"]', () => exportReport(ctx));
      ctx.on('click', '[data-action="clear"]', async () => {
        const ok = await App.confirm({ title: 'Nueva consulta', body: html`<p class="slate">Se vacía la conversación de esta vista. El registro de auditoría conserva las preguntas y respuestas.</p>`, confirmLabel: 'Vaciar conversación', icon: 'rotate-ccw' });
        if (!ok || !ctx.alive()) return;
        ctx.setLocal({ turns: [], sel: null });
        ctx.rerender();
      });
      ctx.on('click', 'details.pr-log > summary', (e, el) => { const host = el.parentElement.querySelector('[data-log]'); if (host) fillLog(ctx, host.getAttribute('data-log')); });
      ctx.on('input', '#pr-q', () => { const hint = ctx.$('#pr-hint'); if (hint && hint.classList.contains('t-warn')) { hint.classList.remove('t-warn'); hint.textContent = hintText(); } });
    }
  });

  /* Motor expuesto para pruebas y para otras escenas. */
  if (scene) {
    scene.engine = {
      ready: () => Promise.resolve(DOCS_API),
      classify: (q) => classify(q),
      intents: () => INTENTS.map((i) => ({ id: i.id, q: i.q })),
      suggested: () => SUGGESTED.slice(),
      answer: (q) => { const r = classify(q); const t = { q, type: r.type, ref: r.id, cites: r.cites, scopeWord: r.scopeWord }; t.kind = r.type === 'intent' ? ((INTENT[r.id] && INTENT[r.id].kind) || 'answer') : r.type === 'generic' ? 'answer' : 'none'; return { result: r, kind: t.kind, answer: t.kind !== 'none' ? answerOf(t) : null, text: plainAnswer(t) }; },
      /** Comprueba que cada cita preparada existe literalmente en su documento y que las preguntas sugeridas se reconocen. */
      validate: () => {
        const bad = [];
        INTENTS.forEach((it) => {
          const a = finalize(Object.assign({ kind: 'answer' }, it.build(it.q)));
          a.cites.forEach((c) => { if (!K().has(c.doc, c.sec, c.quote)) bad.push(`${it.id}: ${c.doc} §${c.sec} «${c.quote}»`); });
          (it.followups || []).forEach((f) => { if (!INTENT[f]) bad.push(`${it.id}: followup ${f}`); });
          const r = classify(it.q);
          if (r.type !== 'intent' || r.id !== it.id) bad.push(`${it.id}: la pregunta se clasifica como ${r.type}/${r.id}`);
        });
        Object.values(K().unindexed).forEach((u) => { if (!K().has(u.mentionedIn.doc, u.mentionedIn.sec, u.mentionedIn.quote)) bad.push(`mención ${u.code}`); });
        GAPS.forEach((g) => { if (g.related && !K().unindexed[g.related]) bad.push(`gap ${g.id}: related ${g.related}`); });
        return bad;
      }
    };
  }
})();
