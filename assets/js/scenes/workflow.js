/*
 * Escena «workflow» · De palabras a workflow, común a todas las industrias.
 *
 * El responsable del área escribe su procedimiento en castellano (o en inglés con ENG) y Agentic Platform lo convierte en un workflow de la
 * plataforma (una Routine del Orchestrator: frases que lo activan + agentes en orden fijo + aprobación).
 *  - La interpretación es determinista: orden de aparición, negaciones «sin …», verbos de bloqueo. Cada
 *    disparador, paso, aprobación y parámetro sale de una frase concreta del texto, que se resalta.
 *  - Umbrales y plazos se contrastan con los procedimientos que declara el paquete de la industria.
 *  - «Publicar workflow» escribe en App.state.workflows (contrato con «alarma» y «turno») y en auditoría.
 *  - Texto fuera de alcance o sin disparador ni pasos: se explica el motivo y no se crea nada.
 *
 * Todo lo sectorial sale de CN_DATA.workflow (W):
 *   space, author (clave de rol que escribe y publica), authorNoun, alarmMatch (regex en texto),
 *   approverRoles [claves de rol], feminineRoles [claves], defaultPolicy, approverRule {policy, text, note},
 *   rolePatterns [[clave, regex]], outOfScope [{id, re, title, body}], idle [[icono, tono, título, texto]],
 *   idleNote, presenter {idle: [], rejected: [], next}, scheduleRe (regex opcional extra de programación),
 *   templates {alarma|reclamacion|parte: {label, icon, refs, text}},
 *   catalog {cap: {agent, icon, systems, what, hitl, restricted, gateVerb, multi, name, verb, token,
 *                  keywords: [regex | [regex, regexExcluirSiVaJustoAntes]], strong: [regex]}},
 *   domains {alarma|reclamacion|parte: {first, slug, name, approver, approverOptions, policy, go, goLabel, next,
 *            trigger {system, type, icon, badges, label, sub, entry, full},
 *            steps {cap: {sub, what, systems, outputs: [{icon, text}], gateVerb}}, extraOutputs [{icon, text}],
 *            params [{key, label, name, type: number|time|role, unit, unitLong, min, max, step, value, integer,
 *                     above, below, ref, hint, options, hl,
 *                     extract {from: trigger|sentence|text, re, near, kind: minutes|time|role, cap}}],
 *            check {id, ref, keys, label, describe, extra, action}, staticChecks [{id, text, stream}],
 *            rules [{key, re, label, check}], scenarios [], testUtterance, matchGroups [{re, w, label}],
 *            config {cap: [[clave, valor]]}, say {draft: [], published: []}}}
 *   Los textos admiten {clave} (valor formateado), {=clave} (valor crudo), {al:clave} y {del:clave} (rol con artículo;
 *   en inglés «the» + rol, salvo los roles de noArticleRoles).
 * Los regex se escriben sobre texto plegado: minúsculas y sin tildes. Las reglas propias del idioma (negación, disparador,
 * aprobación, plazos) están en LANG; en inglés los datos salen de industries/<id>/en/workflow.js con regex en inglés.
 */
(function () {
  'use strict';

  const { html, raw, esc, icon, fmt, chip, sys } = App;
  const D = window.CN_DATA;
  const ROLE = D.roles;
  const W = D.workflow;

  const AGENT = W.agent || 'Generador de workflows';
  const AGENT_ACTOR = `Agentic Platform · agente ${AGENT}`;
  const SPACE = W.space;
  const AUTHOR = ROLE[W.author] || W.author;
  const MIN_MATCH = 0.6;      // routines.min_match_confidence de Agentic Platform
  const ENFORCE_MIN = 0.8;    // routines.enforce_min_confidence de Agentic Platform

  const rx = (s) => (s instanceof RegExp ? s : new RegExp(s));
  const TEMPLATES = W.templates;
  const TEMPLATE_IDS = Object.keys(TEMPLATES);
  const DOMAINS = W.domains;

  /* ================================================================ Catálogo de agentes del espacio */

  const CATALOG = {};
  const STEP_RULES = [];
  const STRONG = {};
  Object.keys(W.catalog).forEach((cap) => {
    const c = W.catalog[cap];
    CATALOG[cap] = c;
    STEP_RULES.push([cap, (c.keywords || []).map((k) => (Array.isArray(k) ? [rx(k[0]), k[1] ? rx(k[1]) : null] : [rx(k), null]))]);
    STRONG[cap] = (c.strong || []).map(rx);
  });
  const CATALOG_N = Object.keys(CATALOG).length;
  const DOMAIN_BY_FIRST = {};
  Object.keys(DOMAINS).forEach((d) => { DOMAIN_BY_FIRST[DOMAINS[d].first] = d; });

  /* ================================================================ Reglas del idioma (sobre texto plegado) */

  // El texto se interpreta en el idioma de la consola: castellano o, con ENG, inglés (datos en industries/<id>/en/).
  const EN = !!(window.CN_I18N && window.CN_I18N.english);
  const LANG = EN ? {
    neg: /\b(?:without|never|nor|not|no|don't|do not|doesn't|does not|neither)\s+(?:\w+\s+){0,2}$/,
    approveNeg: /\b(?:without|never|nor|not|no|don't|doesn't|neither)\s+(?:\w+\s+){0,3}$/,
    approveAfter: /\b(?:once|after|following|upon)\s+(?:\w+\s+){0,3}$/,
    approve: /\b(?:approv\w*|authori[sz]\w*|sign(?:s|ed)? off)\b/,
    conj: /^(?:and|or|then|next|afterwards|after that)\s+(?=\S)/i,
    trigger: /\b(?:when|whenever|every time|each time|as soon as|on receipt of|in the event of)\s/,
    schedule: /\b(?:every day|each day|daily|every morning|each morning|every night|every shift|every week|every hour|every monday|every working day|every business day)\b/,
    ifStart: /(?:^|[.;:\n])\s*if\s/,
    atHour: /\bat (\d{1,2})(?:\s*(?:am|h|o'clock))?\b/,
    minutes: /(\d{1,3})\s*(?:minutes?|mins?)\b/,
    hours: /(\d{1,2})\s*(?:hours?|hrs?|h)\b/,
    halfHour: /\bhalf an hour\b/,
    quarterHour: /\b(?:quarter of an hour|quarter hour)\b/,
    oneHour: /\b(?:an|one) hour\b/,
    triggerLead: /^(when|whenever|if|every time|each time|as soon as)\s+/i,
    stop: ['when', 'from', 'until', 'during', 'over', 'between', 'with', 'than', 'this', 'that', 'there', 'more', 'have', 'into', 'which'],
    language: 'English'
  } : {
    // Negación en los 25 caracteres anteriores: «sin bloquear», «no abras…». «no conformidad» es un sustantivo.
    neg: /\b(?:sin|nunca|tampoco|ni|no)\s+(?!conformidad)(?:\w+\s+){0,2}$/,
    approveNeg: /\b(?:sin|nunca|ni|no(?!\s+conformidad))\s+(?:\w+\s+){0,3}$/,
    approveAfter: /\b(?:una vez|tras|despues de)\s+$/,
    approve: /\b(?:aprob\w*|aprueb\w*|autoriz\w*|valid(?:a|e|ar|ado|ada)\b)/,
    conj: /^(?:y|e|o|u|luego|después|despues)\s+(?=\S)/i,
    trigger: /\b(?:cuando|cada vez que|siempre que|en cuanto|ante (?:un|una|el|la|cualquier))\s/,
    schedule: /\b(?:cada dia|todos los dias|diariamente|cada manana|cada noche|cada turno|cada semana|cada hora|cada lunes|cada dia laborable|cada dia habil)\b/,
    ifStart: /(?:^|[.;:\n])\s*si\s/,
    atHour: /\ba las (\d{1,2})\b/,
    minutes: /(\d{1,3})\s*(?:minutos|min)\b/,
    hours: /(\d{1,2})\s*(?:horas?|h)\b/,
    halfHour: /\bmedia hora\b/,
    quarterHour: /\bcuarto de hora\b/,
    oneHour: /\buna hora\b/,
    triggerLead: /^(cuando|si|cada vez que|siempre que|en cuanto)\s+/i,
    stop: ['cuando', 'desde', 'hasta', 'durante', 'sobre', 'entre', 'para', 'como', 'este', 'esta', 'porque'],
    language: 'castellano'
  };

  const NEG_BEFORE = LANG.neg;

  const OUT_OF_SCOPE = (W.outOfScope || []).map((o) => Object.assign({}, o, { re: rx(o.re) }));
  const NOT_BUILT = {
    'sin-disparador': { title: 'Falta el disparador', body: `Reconozco pasos, pero no cuándo debe activarse el workflow. Indica el disparador, por ejemplo ${W.triggerExamples || '«Cuando …» o «Cada día a las 06:00…»'}.` },
    'sin-pasos': { title: 'Sin pasos reconocibles', body: `Entiendo cuándo debe activarse, pero ningún paso corresponde a un agente del espacio ${SPACE}.` },
    'no-reconocido': { title: 'No es un procedimiento', body: 'No encuentro un disparador ni pasos que pueda hacer un agente del espacio.' }
  };

  const ROLE_PATTERNS = (W.rolePatterns || []).map(([k, re]) => [k, rx(re)]);
  const APPROVER_ROLES = W.approverRoles || [];
  const FEMININE = new Set(W.feminineRoles || []);

  const MATCH_GROUPS = {};
  Object.keys(DOMAINS).forEach((d) => { MATCH_GROUPS[d] = (DOMAINS[d].matchGroups || []).map((g) => Object.assign({}, g, { re: rx(g.re) })); });

  /* ================================================================ Texto: plegado, cláusulas y frases */

  const DASHES = /[‐-―−]/;
  /** Minúsculas y sin tildes, con UN carácter de salida por cada carácter de entrada (las posiciones valen para el original). */
  function fold(s) {
    const t = String(s == null ? '' : s);
    let out = '';
    for (let i = 0; i < t.length; i++) {
      const ch = t[i];
      const code = t.charCodeAt(i);
      if (DASHES.test(ch)) { out += '-'; continue; }
      if (ch === '°' || ch === 'º' || /\s/.test(ch)) { out += ' '; continue; }
      if (code >= 0xd800 && code <= 0xdfff) { out += ' '; continue; }
      const base = ch.normalize('NFD')[0] || ch;
      const low = base.toLowerCase();
      out += low.length ? low[0] : ch;
    }
    return out;
  }
  const isDigit = (c) => c >= '0' && c <= '9';
  /** Separadores de cláusula: . ; : ! ? salto de línea y comas (no dentro de paréntesis ni entre cifras). */
  function boundaries(src) {
    const b = new Uint8Array(src.length);
    let depth = 0;
    for (let i = 0; i < src.length; i++) {
      const c = src[i];
      if (c === '(') { depth += 1; continue; }
      if (c === ')') { depth = Math.max(0, depth - 1); continue; }
      const between = isDigit(src[i - 1] || '') && isDigit(src[i + 1] || '');
      if (c === '\n' || c === ';' || c === '!' || c === '?') b[i] = 1;
      else if ((c === '.' || c === ':') && !between) b[i] = 1;
      else if (c === ',' && depth === 0 && !between) b[i] = 1;
    }
    return b;
  }
  function sentenceBounds(src) {
    const b = new Uint8Array(src.length);
    for (let i = 0; i < src.length; i++) {
      const c = src[i];
      const between = isDigit(src[i - 1] || '') && isDigit(src[i + 1] || '');
      if (c === '\n' || c === ';' || c === '!' || c === '?' || (c === '.' && !between)) b[i] = 1;
    }
    return b;
  }
  function spanAt(src, b, pos) {
    let s = pos;
    while (s > 0 && !b[s - 1]) s -= 1;
    let e = pos;
    while (e < src.length && !b[e]) e += 1;
    while (s < e && /\s/.test(src[s])) s += 1;
    const bullet = /^[-–•*]\s+/.exec(src.slice(s, e));
    if (bullet) s += bullet[0].length;
    const conj = LANG.conj.exec(src.slice(s, e));
    if (conj && e - s - conj[0].length > 12) s += conj[0].length;
    while (e > s && /\s/.test(src[e - 1])) e -= 1;
    return { start: s, end: e };
  }
  function clip(s, n) {
    const t = String(s || '').replace(/\s+/g, ' ').trim();
    return t.length <= n ? t : `${t.slice(0, Math.max(1, n - 1)).replace(/[\s,;:.]+$/, '')}…`;
  }
  const lowerFirst = (s) => (s ? s.charAt(0).toLowerCase() + s.slice(1) : s);
  const upperFirst = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
  function wordCount(s) { const t = String(s || '').trim(); return t ? t.split(/\s+/).length : 0; }
  function sentenceCount(s) { return String(s || '').split(/[.;!?]+(?:\s|$)|\n+/).map((x) => x.trim()).filter((x) => x.length > 2).length; }
  const pad2 = (n) => String(n).padStart(2, '0');

  function firstMatch(re, f, from, to, test) {
    const g = new RegExp(re.source, 'g');
    g.lastIndex = from || 0;
    let m;
    while ((m = g.exec(f)) && (to == null || m.index < to)) {
      if (!test || test(m.index, m)) return m;
      if (m[0].length === 0) g.lastIndex += 1;
    }
    return null;
  }
  const negatedAt = (f, pos) => NEG_BEFORE.test(f.slice(Math.max(0, pos - 25), pos));

  /* ================================================================ Roles y valores */

  const roleLabel = (k) => ROLE[k] || k;
  // {al:clave} y {del:clave}: en inglés, «the» + rol (sin artículo para los roles de W.noArticleRoles, p. ej. un servicio).
  const NO_ARTICLE = new Set(W.noArticleRoles || []);
  const roleRef = (k) => (NO_ARTICLE.has(k) ? roleLabel(k) : `the ${roleLabel(k)}`);
  const roleAl = (k) => (EN ? roleRef(k) : `${FEMININE.has(k) ? 'a la' : 'al'} ${roleLabel(k)}`);
  const roleDel = (k) => (EN ? roleRef(k) : `${FEMININE.has(k) ? 'de la' : 'del'} ${roleLabel(k)}`);
  function fmtParam(fd, v) {
    if (!fd) return String(v);
    if (fd.type === 'role') return roleLabel(v);
    if (fd.type === 'time') return String(v);
    if (fd.unit === '°C') return fmt.temp(v);
    if (fd.unit === '%') return fmt.pct(v);
    return `${fmt.num(v)} ${fd.unitLong || fd.unit || ''}`.trim();
  }
  function fieldSpec(domain, key) {
    const dom = DOMAINS[domain];
    return dom ? (dom.params || []).find((x) => x.key === key) : null;
  }
  /** Rellena {clave}, {=clave}, {al:clave} y {del:clave} con los parámetros del dominio. */
  function fill(str, domain, p) {
    if (str == null) return str;
    const s = String(str);
    const whole = /^\{=(\w+)\}$/.exec(s);
    if (whole) return p[whole[1]];
    return s.replace(/\{(=|al:|del:)?(\w+)\}/g, (all, mod, key) => {
      if (p[key] == null) return all;
      if (mod === '=') return String(p[key]);
      if (!mod && typeof p[key] === 'string' && ROLE[p[key]]) return roleLabel(p[key]);
      if (mod === 'al:') return roleAl(p[key]);
      if (mod === 'del:') return roleDel(p[key]);
      return fmtParam(fieldSpec(domain, key) || { type: ROLE[p[key]] ? 'role' : 'text' }, p[key]);
    });
  }

  /* ================================================================ Interpretación del texto */

  function findSteps(f) {
    const hits = [];
    STEP_RULES.forEach(([name, rules], order) => {
      let first = null;
      rules.forEach(([re, exclude]) => {
        const m = firstMatch(re, f, 0, null, (pos) => !negatedAt(f, pos) && !(exclude && exclude.test(f.slice(Math.max(0, pos - 25), pos))));
        if (m && (!first || m.index < first.pos)) first = { name, pos: m.index, end: m.index + m[0].length, order };
      });
      if (first) hits.push(first);
    });
    return hits.sort((a, z) => a.pos - z.pos || a.order - z.order);
  }

  const TRIGGER_WORDS = LANG.trigger;
  const SCHEDULE_WORDS = LANG.schedule;
  function findTrigger(src, f, b) {
    let m = TRIGGER_WORDS.exec(f);
    let type = 'evento';
    const s = SCHEDULE_WORDS.exec(f);
    if (s && (!m || s.index < m.index)) { m = s; type = 'programado'; }
    let start;
    if (m) start = m.index;
    else {
      const si = LANG.ifStart.exec(f);
      if (!si) return null;
      start = si.index + si[0].length - 3;
    }
    let end = start;
    while (end < src.length && !b[end]) end += 1;
    while (end > start && /\s/.test(src[end - 1])) end -= 1;
    if (end - start < 8) return null;
    const out = { start, end, text: src.slice(start, end), type };
    if (type === 'programado') {
      const seg = f.slice(start, end);
      const t = /\b(\d{1,2})[:.h](\d{2})\b/.exec(seg);
      const h = t ? null : LANG.atHour.exec(seg);
      if (t && +t[1] < 24 && +t[2] < 60) out.time = `${pad2(t[1])}:${t[2]}`;
      else if (h && +h[1] < 24) out.time = `${pad2(h[1])}:00`;
    }
    return out;
  }

  function stepSpans(src, f, b, cap, hit, trig) {
    const inTrig = (pos) => !!trig && pos >= trig.start && pos < trig.end;
    const found = [];
    (STRONG[cap] || []).forEach((re) => {
      const g = new RegExp(re.source, 'g');
      let m;
      while ((m = g.exec(f))) {
        if (!inTrig(m.index) && !negatedAt(f, m.index)) found.push(m.index);
      }
    });
    found.sort((a, z) => a - z);
    const max = (CATALOG[cap] && CATALOG[cap].multi) || 1;
    const out = [];
    const seen = new Set();
    for (const pos of found) {
      const c = spanAt(src, b, pos);
      const key = `${c.start}:${c.end}`;
      if (seen.has(key) || (trig && c.start < trig.end && c.end > trig.start)) continue;
      seen.add(key);
      out.push(c);
      if (out.length >= max) break;
    }
    if (!out.length) out.push(inTrig(hit.pos) ? { start: trig.start, end: trig.end, shared: true } : spanAt(src, b, hit.pos));
    return out;
  }

  function numsIn(f, re, from, to) {
    const out = [];
    const g = new RegExp(re.source, 'g');
    g.lastIndex = from;
    let m;
    while ((m = g.exec(f)) && m.index < to) {
      const v = parseFloat(String(m[1]).replace(',', '.'));
      if (Number.isFinite(v)) out.push({ value: v, start: m.index, end: m.index + m[0].length });
      if (m[0].length === 0) g.lastIndex += 1;
    }
    return out;
  }
  function minutesIn(f, from, to) {
    const seg = f.slice(from, to);
    let m = LANG.minutes.exec(seg);
    if (m) return Number(m[1]);
    m = LANG.hours.exec(seg);
    if (m) return Number(m[1]) * 60;
    if (LANG.halfHour.test(seg)) return 30;
    if (LANG.quarterHour.test(seg)) return 15;
    if (LANG.oneHour.test(seg)) return 60;
    return null;
  }
  function roleIn(f, from, to) {
    let best = null;
    ROLE_PATTERNS.forEach(([key, re]) => {
      const m = firstMatch(re, f, from, to);
      if (m && (!best || m.index < best.start)) best = { key, start: m.index, end: m.index + m[0].length };
    });
    return best;
  }

  function rolesIn(f, from, to) {
    const out = [];
    ROLE_PATTERNS.forEach(([key, re]) => {
      const g = new RegExp(re.source, 'g');
      g.lastIndex = from;
      let m;
      while ((m = g.exec(f)) && m.index < to) { out.push({ key, start: m.index }); if (m[0].length === 0) g.lastIndex += 1; }
    });
    return out.sort((a, z) => a.start - z.start);
  }

  const APPROVE_RE = LANG.approve;
  function findApproval(src, f, b) {
    const g = new RegExp(APPROVE_RE.source, 'g');
    let m;
    let neg = null;
    while ((m = g.exec(f))) {
      const pos = m.index;
      const before = f.slice(Math.max(0, pos - 32), pos);
      if (LANG.approveAfter.test(before)) continue;
      if (LANG.approveNeg.test(before)) { if (!neg) neg = { pos, span: spanAt(src, b, pos) }; continue; }
      return { pos, span: spanAt(src, b, pos), negated: neg };
    }
    return neg ? { pos: neg.pos, span: neg.span, negatedOnly: true, negated: neg } : null;
  }

  /** Valores de los parámetros de un dominio a partir del texto (o del procedimiento si el texto no los da). */
  function extractParams(dom, ctx, setV, notes) {
    const { src, f, b, sb, trig, steps, values } = ctx;
    (dom.params || []).forEach((fd) => {
      if (fd.key === 'approver') return;
      const ex = fd.extract || {};
      if (fd.type === 'time' || ex.kind === 'time') {
        if (trig.time) setV(fd.key, trig.time, 'texto'); else setV(fd.key, fd.value, 'politica');
        return;
      }
      if (fd.type === 'role' || ex.kind === 'role') {
        let found = null;
        const st = ex.cap ? steps.find((s) => s.cap === ex.cap) : null;
        const ok = (k) => k !== values.approver && (!fd.options || fd.options.includes(k));
        if (st) st.spans.forEach((sp) => { if (!found) { const r = rolesIn(f, sp.start, sp.end).find((x) => ok(x.key)); if (r) found = r.key; } });
        setV(fd.key, found || fd.value, found ? 'texto' : 'politica');
        return;
      }
      if (ex.kind === 'minutes') {
        const mins = minutesIn(f, trig.start, trig.end);
        if (mins != null && mins >= fd.min && mins <= fd.max) setV(fd.key, mins, 'texto'); else setV(fd.key, fd.value, 'procedimiento');
        return;
      }
      if (!ex.re) { setV(fd.key, fd.value, 'procedimiento'); return; }
      const re = rx(ex.re);
      const okRange = (v) => v >= fd.min && v <= fd.max;
      const okRel = (v) => (fd.above == null || values[fd.above] == null || v > values[fd.above]) && (fd.below == null || values[fd.below] == null || v < values[fd.below]);
      let hit = null;
      let bad = null;
      if (ex.from === 'trigger') {
        const T = numsIn(f, re, trig.start, trig.end);
        if (T[0]) { if (okRange(T[0].value)) hit = { value: T[0].value }; else bad = T[0].value; }
      } else if (ex.from === 'sentence' && ex.near) {
        const ng = new RegExp(rx(ex.near).source, 'g');
        let nm;
        while (!hit && (nm = ng.exec(f))) {
          const sp = spanAt(src, sb, nm.index);
          const t = numsIn(f, re, sp.start, sp.end).find((x) => okRange(x.value) && okRel(x.value));
          if (t) hit = { value: t.value, span: sp };
          if (nm[0].length === 0) ng.lastIndex += 1;
        }
      } else {
        const t = numsIn(f, re, 0, f.length)[0];
        if (t) { if (okRange(t.value)) hit = { value: t.value, span: spanAt(src, b, t.start) }; else bad = t.value; }
      }
      if (hit) {
        setV(fd.key, fd.integer ? Math.round(hit.value) : hit.value, 'texto', fd.hl ? hit.span : null);
      } else {
        let v = fd.value;
        if (fd.above && values[fd.above] != null && v <= values[fd.above]) v = values[fd.above] + (fd.step || 1);
        setV(fd.key, v, 'procedimiento');
        if (bad != null) notes.push({ id: 'invalido', key: fd.key, value: bad });
      }
    });
  }

  /** Interpretación pura del texto: sin parámetros editados. Devuelve {ok:false, category} o el borrador base. */
  function interpretRaw(text) {
    const src = String(text || '');
    const f = fold(src);
    if (wordCount(src) < 3) return { ok: false, category: 'no-reconocido', text: src };
    for (const o of OUT_OF_SCOPE) {
      const m = o.re.exec(f);
      if (m) return { ok: false, category: o.id, text: src, span: { start: m.index, end: m.index + m[0].length } };
    }
    const b = boundaries(src);
    const sb = sentenceBounds(src);
    const trig = findTrigger(src, f, b);
    const hits = findSteps(f);
    if (!hits.length) return { ok: false, category: trig ? 'sin-pasos' : 'no-reconocido', text: src, trigger: trig };
    if (!trig) return { ok: false, category: 'sin-disparador', text: src, steps: hits.map((h) => h.name) };

    const names = hits.map((h) => h.name);
    let domain = DOMAIN_BY_FIRST[names[0]];
    if (!domain) domain = Object.keys(DOMAINS).find((d) => names.includes(DOMAINS[d].first)) || 'generico';
    const steps = hits.map((h) => ({ cap: h.name, pos: h.pos, spans: stepSpans(src, f, b, h.name, h, trig) }));
    const approval = findApproval(src, f, b);

    const values = {};
    const sources = {};
    const spans = {};
    const notes = [];
    const setV = (k, v, source, span) => { values[k] = v; sources[k] = source; if (span) spans[k] = span; };
    const dom = DOMAINS[domain];

    // Aprobador: el rol nombrado en la frase de aprobación (o justo después); si no, el de la política.
    let approverKey = null;
    let approverSource = 'politica';
    if (approval && !approval.negatedOnly) {
      const r = roleIn(f, approval.span.start, approval.span.end) || roleIn(f, approval.pos, Math.min(f.length, approval.pos + 120));
      if (r) { approverKey = r.key; approverSource = 'texto'; }
    }
    const hasHitl = steps.some((s) => CATALOG[s.cap].hitl);
    const allowed = (dom && dom.approverOptions) || APPROVER_ROLES;
    const defaultApprover = dom ? dom.approver : APPROVER_ROLES[0];
    if (!approverKey) approverKey = defaultApprover;
    if (steps.some((s) => CATALOG[s.cap].restricted) && allowed.length && !allowed.includes(approverKey)) {
      notes.push({ id: 'aprobador', from: approverKey });
      approverKey = allowed.includes(defaultApprover) ? defaultApprover : allowed[0];
      approverSource = 'politica';
    }
    setV('approver', approverKey, approverSource, approval && !approval.negatedOnly ? approval.span : null);

    if (dom) {
      extractParams(dom, { src, f, b, sb, trig, steps, values }, setV, notes);
      (dom.rules || []).forEach((r) => {
        const m = rx(r.re).exec(f);
        values[r.key] = !!m;
        if (m) spans[r.key] = spanAt(src, b, m.index);
      });
    }

    return {
      ok: true, text: src, domain, trigger: trig, steps, approval, hasHitl, values, sources, spans, notes,
      approvalNegated: !!(approval && approval.negated), approvalMissing: !approval || !!approval.negatedOnly
    };
  }
  const cacheRaw = new Map();
  function interpret(text) {
    const k = String(text || '');
    if (!cacheRaw.has(k)) {
      if (cacheRaw.size > 24) cacheRaw.clear();
      cacheRaw.set(k, interpretRaw(k));
    }
    return cacheRaw.get(k);
  }

  /* ================================================================ Modelo del workflow (interpretación + parámetros) */

  function stepContext(cap, domain, p) {
    const dom = DOMAINS[domain];
    const s = dom && dom.steps && dom.steps[cap];
    if (!s) return {};
    const c = {};
    if (s.sub) c.sub = fill(s.sub, domain, p);
    if (s.what) c.what = fill(s.what, domain, p);
    if (s.systems) c.systems = s.systems.map((x) => fill(x, domain, p));
    if (s.outputs) c.outputs = s.outputs.map((o) => ({ icon: o.icon, text: fill(o.text, domain, p) }));
    if (s.gateVerb) c.gateVerb = s.gateVerb;
    return c;
  }

  function paramFields(domain, p, src) {
    const S = (k) => src[k] || 'procedimiento';
    const dom = DOMAINS[domain];
    const policy = dom ? dom.policy : W.defaultPolicy;
    const F = [];
    const approverField = (spec) => ({
      key: 'approver', label: (spec && spec.label) || 'Aprobación', name: 'Aprobador', type: 'select', value: p.approver, src: S('approver'),
      ref: (spec && spec.ref) || policy, hint: (spec && spec.hint) || 'Antes de bloquear, retener o enviar',
      options: ((dom && dom.approverOptions) || APPROVER_ROLES).map((k) => ({ value: k, label: roleLabel(k) })), fmtv: roleLabel
    });
    if (!dom) { F.push(approverField(null)); return F; }
    dom.params.forEach((fd) => {
      if (fd.key === 'approver') { F.push(approverField(fd)); return; }
      if (fd.type === 'role') {
        F.push({ key: fd.key, label: fd.label, name: fd.name || fd.label, type: 'select', value: p[fd.key], src: S(fd.key), ref: fd.ref || 'Política', hint: fill(fd.hint || '', domain, p), options: (fd.options || []).map((k) => ({ value: k, label: roleLabel(k) })), fmtv: roleLabel });
        return;
      }
      if (fd.type === 'time') {
        F.push({ key: fd.key, label: fd.label, name: fd.name || fd.label, type: 'time', value: p[fd.key], src: S(fd.key), ref: fd.ref || 'Política', hint: fill(fd.hint || '', domain, p), fmtv: (v) => v });
        return;
      }
      F.push({ key: fd.key, label: fd.label, name: fd.name || fd.label, type: 'number', unit: fd.unit, min: fd.min, max: fd.max, step: fd.step || 1, integer: !!fd.integer, above: fd.above, below: fd.below, value: p[fd.key], src: S(fd.key), ref: fd.ref || 'Política', hint: fill(fd.hint || '', domain, p), fmtv: (v) => fmtParam(fd, v) });
    });
    return F;
  }

  function scoreFor(domain, phrase, triggerText) {
    const f = fold(phrase);
    const groups = MATCH_GROUPS[domain];
    let s = 0.05;
    const hits = [];
    if (groups && groups.length) {
      groups.forEach((g) => { if (g.re.test(f)) { s += g.w; hits.push(g.label); } });
    } else {
      const STOP = new Set(LANG.stop);
      const words = (t) => (String(t || '').match(/\p{L}{4,}/gu) || []).filter((w) => !STOP.has(fold(w)));
      const a = new Set(words(triggerText).map((w) => fold(w).slice(0, 5)));
      const common = [];
      words(phrase).forEach((w) => { const k = fold(w).slice(0, 5); if (a.has(k) && !common.some((c) => fold(c).slice(0, 5) === k)) common.push(w.toLowerCase()); });
      s += Math.min(0.9, common.length * 0.3);
      common.slice(0, 4).forEach((w) => hits.push(w));
    }
    s = Math.min(0.97, Math.round(s * 100) / 100);
    return { phrase, score: s, hits, lane: s >= ENFORCE_MIN ? 'enforced' : s >= MIN_MATCH ? 'hint' : 'none' };
  }

  /** Comprobación de umbrales o plazos frente al procedimiento (menor o igual = igual o más estricto). */
  function procedureCheck(dom, domain, p, src, notes) {
    const ck = dom.check;
    const defs = {};
    dom.params.forEach((fd) => { defs[fd.key] = fd.value; });
    const spec = (k) => fieldSpec(domain, k);
    const same = ck.keys.every((k) => Number(p[k]) === Number(defs[k]));
    const stricter = ck.keys.every((k) => Number(p[k]) <= Number(defs[k]));
    const descNow = fill(ck.describe, domain, p);
    const descDef = fill(ck.describe, domain, Object.assign({}, p, defs));
    let tone = 'ok';
    let text;
    let shortText = null;
    if (same) text = `${ck.label} como ${ck.ref}: ${descDef}`;
    else if (stricter) text = `Más estricto que ${ck.ref} (${descDef})`;
    else {
      tone = 'warn';
      const parts = ck.keys.filter((k) => Number(p[k]) > Number(defs[k])).map((k) => `${lowerFirst(spec(k).name || spec(k).label)}: ${fmtParam(spec(k), p[k])} frente a ${fmtParam(spec(k), defs[k])}`);
      text = `Menos estricto que ${ck.ref} (${fmt.list(parts)}): al publicar se pide el motivo`;
      shortText = `Menos estricto que ${ck.ref}: ${fmt.list(parts)}.`;
    }
    const bad = notes.find((n) => n.id === 'invalido' && src[n.key] !== 'edicion');
    if (bad) {
      tone = 'warn';
      const fd = spec(bad.key);
      text = `El valor del texto para «${lowerFirst(fd.name || fd.label)}» (${fmtParam(fd, bad.value)}) no es válido: se usa el de ${fd.ref || ck.ref} (${fmtParam(fd, defs[bad.key])})`;
    }
    const extra = ck.extra ? ` · ${fill(ck.extra, domain, p)}` : '';
    return { id: ck.id, tone, text, short: shortText, deviation: !same && !stricter, stream: { system: 'Procedimientos', action: ck.action || `Contrasta los valores con ${ck.ref}`, result: `${same ? 'Coinciden' : stricter ? 'Más estrictos' : 'Menos estrictos'}: ${descNow}${extra}`, ms: 360 } };
  }

  /** Modelo completo: nodos del grafo, filas de la interpretación, comprobaciones, frases y firma de versión. */
  function compose(I, overrides) {
    const domain = I.domain;
    const dom = DOMAINS[domain] || null;
    const p = Object.assign({}, I.values);
    const src = Object.assign({}, I.sources);
    Object.keys(overrides || {}).forEach((k) => { if (overrides[k] != null && overrides[k] !== '') { p[k] = overrides[k]; src[k] = 'edicion'; } });
    const approverName = roleLabel(p.approver);

    // Pasos numerados en orden de aparición; la aprobación va justo antes del primer paso que la necesita.
    const steps = I.steps.map((s, i) => {
      const base = CATALOG[s.cap];
      const c = stepContext(s.cap, domain, p);
      return {
        cap: s.cap, n: i + 1, agent: base.agent, icon: base.icon, hitl: !!base.hitl,
        systems: c.systems || base.systems.slice(), sub: c.sub || '', what: c.what || base.what,
        outputs: c.outputs || [], spans: s.spans, shared: !!(s.spans[0] && s.spans[0].shared), pos: s.pos,
        gateVerb: c.gateVerb || base.gateVerb || (EN ? 'continuing' : 'continuar')
      };
    });
    const needsApproval = steps.some((s) => s.hitl) || !!(I.approval && !I.approval.negatedOnly);
    let gateIndex = -1;
    if (needsApproval) {
      gateIndex = steps.findIndex((s) => s.hitl);
      if (gateIndex < 0 && I.approval) gateIndex = steps.findIndex((s) => s.pos > I.approval.pos);
      if (gateIndex < 0) gateIndex = steps.length;
    }
    const policy = dom ? dom.policy : W.defaultPolicy;
    const gateStep = steps[gateIndex] || null;
    const approval = needsApproval ? {
      role: approverName, key: p.approver, policy,
      source: I.approvalMissing ? 'politica' : 'texto',
      negated: I.approvalNegated,
      reassigned: I.notes.some((n) => n.id === 'aprobador'),
      span: I.approval && !I.approval.negatedOnly ? I.approval.span : null,
      negSpan: I.approval && I.approval.negated ? I.approval.negated.span : null,
      gateCap: gateStep ? gateStep.cap : null,
      gateVerb: gateStep ? gateStep.gateVerb : (EN ? 'continuing' : 'continuar')
    } : null;

    // Disparador
    let trigger;
    if (dom) {
      const t = dom.trigger;
      trigger = { system: t.system, type: t.type, icon: t.icon, badges: (t.badges || []).slice(), label: fill(t.label, domain, p), sub: fill(t.sub || '', domain, p), entry: fill(t.entry, domain, p) };
      trigger.fullLabel = t.full ? fill(t.full, domain, p) : trigger.label;
    } else {
      trigger = { system: I.trigger.type === 'programado' ? 'Programado' : 'Agentic Platform', type: I.trigger.type, icon: I.trigger.type === 'programado' ? 'clock' : 'bell', badges: [], label: clip(upperFirst(I.trigger.text), 64), sub: '', entry: I.trigger.type === 'programado' ? 'Programación del servidor' : 'Evento o petición en el chat de Agentic Platform' };
      trigger.fullLabel = trigger.label;
    }
    trigger.text = I.trigger.text;

    // Grafo
    const nodes = [{ id: 'trigger', kind: 'trigger', label: trigger.label, sub: trigger.sub, systems: trigger.badges, icon: trigger.icon }];
    const edges = [];
    let prev = 'trigger';
    const push = (n) => { nodes.push(n); edges.push([prev, n.id]); prev = n.id; };
    steps.forEach((s, i) => {
      if (approval && i === gateIndex) push({ id: 'approval', kind: 'approval', label: approval.role, sub: approval.policy, icon: 'user-check' });
      push({ id: s.cap, kind: 'agent', kindLabel: `Paso ${s.n}`, label: s.agent, sub: s.sub, systems: s.systems, icon: s.icon });
    });
    if (approval && gateIndex >= steps.length) push({ id: 'approval', kind: 'approval', label: approval.role, sub: approval.policy, icon: 'user-check' });

    // Resaltado del texto
    const hl = [];
    const addSpan = (sp, label, tone, ref) => {
      if (!sp || sp.end <= sp.start) return false;
      const same = hl.find((h) => h.start === sp.start && h.end === sp.end);
      if (same) { if (!same.labels.includes(label)) same.labels.push(label); if (!same.refs.includes(ref)) same.refs.push(ref); return true; }
      if (hl.some((h) => sp.start < h.end && sp.end > h.start)) return false;
      hl.push({ start: sp.start, end: sp.end, labels: [label], tone, refs: [ref] });
      return true;
    };
    addSpan({ start: I.trigger.start, end: I.trigger.end }, 'Disparador', 'brand', 'trigger');
    steps.forEach((s) => s.spans.forEach((sp) => addSpan(sp, `Paso ${s.n}`, 'step', s.cap)));
    if (approval) {
      if (approval.span) addSpan(approval.span, 'Aprobación', '', 'approval');
      if (approval.negSpan && !approval.span) addSpan(approval.negSpan, 'Aprobación: se mantiene', '', 'approval');
    }
    if (dom) {
      dom.params.forEach((fd) => { if (fd.hl && I.spans[fd.key] && src[fd.key] !== 'edicion') addSpan(I.spans[fd.key], fd.hl, 'param', `param-${fd.key}`); });
      (dom.rules || []).forEach((r) => { if (I.spans[r.key]) addSpan(I.spans[r.key], r.label || 'Regla', 'param', `param-${r.key}`); });
    }

    const quote = (sp) => `«${clip(I.text.slice(sp.start, sp.end), 170)}»`;

    // Filas de la interpretación (mismo orden que el grafo)
    const rows = [{
      ref: 'trigger', kind: 'trigger', icon: trigger.icon,
      title: `Disparador · ${trigger.fullLabel}`,
      quote: quote({ start: I.trigger.start, end: I.trigger.end }),
      meta: html`<span>${trigger.entry}</span>${trigger.badges.length ? sys(trigger.badges[0]) : ''}`
    }];
    steps.forEach((s, i) => {
      if (approval && i === gateIndex) rows.push(approvalRow(approval, I.text));
      rows.push({
        ref: s.cap, kind: 'step', num: s.n,
        title: `Paso ${s.n} · ${s.agent}`,
        quote: s.shared ? 'Sale de la frase del disparador' : s.spans.map(quote).join(' · '),
        quoteNote: s.shared,
        meta: html`<span class="wf-cap">${s.cap}</span>${App.sysList(s.systems)}`
      });
    });
    if (approval && gateIndex >= steps.length) rows.push(approvalRow(approval, I.text));

    // Salidas
    const outputs = [];
    steps.forEach((s) => s.outputs.forEach((o) => outputs.push(o)));
    if (dom) (dom.extraOutputs || []).forEach((o) => outputs.push({ icon: o.icon, text: fill(o.text, domain, p) }));
    if (!outputs.length) steps.forEach((s) => outputs.push({ icon: s.icon, text: s.what }));

    // Frases que lo activan y prueba de activación
    let scenarios;
    let testUtterance;
    if (dom) {
      scenarios = dom.scenarios.map((s) => fill(s, domain, p));
      testUtterance = fill(dom.testUtterance, domain, p);
    } else {
      scenarios = [lowerFirst(clip(I.trigger.text, 140)), `el usuario pide: ${lowerFirst(steps[0].agent)}`];
      testUtterance = upperFirst(clip(I.trigger.text.replace(LANG.triggerLead, ''), 120));
    }
    const test = scoreFor(domain, testUtterance, I.trigger.text);

    // Nombre, slug y descripción
    let name;
    let slug;
    if (dom) {
      name = dom.name;
      slug = dom.slug;
    } else {
      const w = steps.map((s) => [CATALOG[s.cap].name || CATALOG[s.cap].agent, CATALOG[s.cap].verb || lowerFirst(CATALOG[s.cap].agent), CATALOG[s.cap].token || s.cap.replace(/_/g, '-')]);
      const rest = w.slice(1).map((x) => x[1]);
      name = rest.length ? `${w[0][0]}: ${fmt.list(rest)}` : w[0][0];
      slug = `wf-${w.map((x) => x[2]).join('-')}`.slice(0, 64);
    }
    const description = `Disparador: ${lowerFirst(trigger.fullLabel)}. Pasos: ${steps.map((s) => s.agent).join(', ')}.${approval ? ` Aprueba: ${approval.role}.` : ''}`;

    // Comprobaciones
    const checks = [];
    const pre = [];
    const post = [];
    nodes.slice(1).forEach((n) => {
      if (n.id === 'approval') return;
      const afterGate = approval && nodes.findIndex((x) => x.id === 'approval') < nodes.findIndex((x) => x.id === n.id);
      (n.systems || []).forEach((sname) => { const list = afterGate ? post : pre; if (!list.includes(sname) && sname !== 'Procedimientos') list.push(sname); });
    });
    if (dom && dom.check) checks.push(procedureCheck(dom, domain, p, src, I.notes));
    if (dom) {
      (dom.staticChecks || []).forEach((c) => checks.push({ id: c.id, tone: 'ok', text: fill(c.text, domain, p), stream: c.stream ? { system: 'Procedimientos', action: c.stream.action, result: fill(c.stream.result, domain, p), ms: 320 } : null }));
      (dom.rules || []).forEach((r) => { if (I.values[r.key] && r.check) checks.push({ id: r.key, tone: 'ok', text: r.check }); });
    }
    if (approval) {
      let tone = 'ok';
      let text = EN ? `Approval by ${roleDel(approval.key)} before ${approval.gateVerb} (${approval.policy})` : `Aprobación ${roleDel(approval.key)} antes de ${approval.gateVerb} (${approval.policy})`;
      if (approval.negated) { tone = 'warn'; text = EN ? `The text asks to act without approval: ${approval.policy} does not allow it, so approval by ${roleDel(approval.key)} is kept` : `El texto pide actuar sin aprobación: ${approval.policy} no lo permite y se mantiene la aprobación ${roleDel(approval.key)}`; } else if (approval.reassigned) { tone = 'warn'; text = EN ? `${W.approverRule.policy}: ${W.approverRule.text}; approver: ${roleLabel(approval.key)}` : `${W.approverRule.policy}: ${W.approverRule.text}; aprueba ${roleLabel(approval.key)}`; } else if (approval.source === 'politica') { tone = 'warn'; text = EN ? `The text does not say who approves: ${approval.policy} applies (${approval.role})` : `El texto no dice quién aprueba: se aplica ${approval.policy} (${approval.role})`; }
      checks.push({ id: 'aprobacion', tone, text, stream: { system: 'Procedimientos', action: `Comprueba la política de aprobación (${approval.policy})`, result: tone === 'ok' ? `Requiere aprobación: ${approval.role} · incluida` : text, ms: 220 } });
    } else {
      checks.push({ id: 'aprobacion', tone: 'ok', text: 'No bloquea, retiene ni envía nada: no necesita aprobación' });
    }
    checks.push({ id: 'catalogo', tone: 'ok', text: `${steps.length} de ${steps.length} pasos con agente activo en el espacio ${SPACE}`, stream: { system: 'Agentic Platform', action: 'Comprueba los conectores del espacio', result: approval && post.length ? `Antes de aprobar: ${fmt.list(pre)} · tras aprobar: ${fmt.list(post)}` : `Sistemas: ${fmt.list(pre.concat(post))}`, ms: 90 } });
    checks.push({ id: 'activacion', tone: test.lane === 'enforced' ? 'ok' : 'warn', text: `Frase de prueba: confianza ${fmt.num(test.score, 2)} · ${test.lane === 'enforced' ? 'lo ejecuta en orden fijo' : test.lane === 'hint' ? 'solo como sugerencia' : 'no lo activa'}` });

    // Configuración de cada agente (definición exportable)
    const config = [];
    const has = (cap) => steps.some((s) => s.cap === cap);
    if (dom && dom.config) {
      Object.keys(dom.config).forEach((cap) => { if (has(cap)) config.push([cap, dom.config[cap].map(([k, v]) => [k, fill(v, domain, p)])]); });
    } else if (approval) {
      config.push([approval.gateCap || steps[0].cap, [[EN ? 'approver' : 'aprobador', approverName]]]);
    }

    const fields = paramFields(domain, p, src);
    const contractParams = {};
    fields.forEach((fd) => { contractParams[fd.key] = fd.type === 'select' ? roleLabel(fd.value) : fd.value; });
    const sig = JSON.stringify({ t: I.text.replace(/\s+/g, ' ').trim(), s: steps.map((s) => s.cap), p: contractParams });

    return {
      ok: true, text: I.text, domain, dom, name, slug, description, trigger, steps, approval, nodes, edges, rows, hl, outputs,
      scenarios, testUtterance, test, checks, config, p, src, fields, contractParams, sig,
      deviations: checks.filter((c) => c.deviation)
    };
  }
  function approvalRow(a, text) {
    const note = a.negated ? `${a.policy} no permite quitarla` : a.reassigned ? W.approverRule.note : a.source === 'politica' ? `Añadida por política · ${a.policy}` : '';
    const sp = a.span || a.negSpan;
    return {
      ref: 'approval', kind: 'approval', icon: 'user-check',
      title: `Aprobación · ${a.role}`,
      quote: sp ? `«${clip(text.slice(sp.start, sp.end), 170)}»` : null,
      meta: html`<span>${a.policy} · antes de ${a.gateVerb}</span>${note ? chip('warning', note, { dot: false }) : ''}`
    };
  }

  const modelCache = new Map();
  function modelFor(text, overrides) {
    const key = `${text}\u0000${JSON.stringify(overrides || {})}`;
    if (!modelCache.has(key)) {
      if (modelCache.size > 24) modelCache.clear();
      const I = interpret(text);
      modelCache.set(key, I.ok ? compose(I, overrides) : I);
    }
    return modelCache.get(key);
  }

  /* ================================================================ Estado de la escena y versiones */

  const tabOf = (L) => (TEMPLATES[L && L.tab] ? L.tab : TEMPLATE_IDS[0]);
  function textFor(L, tab) {
    const t = L && L.texts && L.texts[tab];
    return t != null ? t : TEMPLATES[tab].text;
  }
  function publishedFor(slug, state) {
    return ((state || App.state).workflows || []).find((w) => w && (w.slug === slug || w.id === slug)) || null;
  }
  function versionState(m, pub) {
    if (!pub) return { n: 1, published: false, changes: [] };
    const pn = pub.versionNumber || Number(String(pub.version || 'v1').replace(/\D/g, '')) || 1;
    if (pub.sig === m.sig) return { n: pn, published: true, changes: [] };
    return { n: pn + 1, published: false, prev: pn, changes: diffWithPublished(m, pub) };
  }
  function diffWithPublished(m, pub) {
    const out = [];
    const before = pub.params || {};
    m.fields.forEach((fd) => {
      const a = before[fd.key];
      const bv = m.contractParams[fd.key];
      if (a != null && String(a) !== String(bv)) out.push(`${fd.name || fd.label}: de ${fd.type === 'select' ? a : fd.fmtv(a)} a ${fd.type === 'select' ? bv : fd.fmtv(bv)}`);
    });
    const ps = (pub.steps || []).filter((s) => s.kind !== 'approval').map((s) => s.capability || s.id);
    const ms = m.steps.map((s) => s.cap);
    ms.filter((c) => !ps.includes(c)).forEach((c) => out.push(`Paso añadido: ${CATALOG[c].agent}`));
    ps.filter((c) => !ms.includes(c)).forEach((c) => out.push(`Paso quitado: ${CATALOG[c] ? CATALOG[c].agent : c}`));
    if ((pub.sourceText || '').replace(/\s+/g, ' ').trim() !== m.text.replace(/\s+/g, ' ').trim()) out.push('Texto del procedimiento modificado');
    return out;
  }
  /** Situación de la pestaña activa (también para el panel del presentador). */
  function status(state) {
    const L = (state.scenes && state.scenes.workflow) || {};
    const tab = tabOf(L);
    const res = (L.results || {})[tab] || null;
    if (!res) return { phase: 'idle', tab, L };
    if (res.kind === 'rejected') return { phase: 'rejected', tab, L, res };
    const m = modelFor(res.text, res.params);
    if (!m.ok) return { phase: 'idle', tab, L };
    const pub = publishedFor(m.slug, state);
    const vs = versionState(m, pub);
    return { phase: vs.published ? 'published' : 'draft', tab, L, res, m, pub, vs, editing: !!(L.editing || {})[tab] };
  }

  /* ================================================================ Piezas de la vista */

  /** ['Paso 2', 'Paso 3', 'Aprobación'] → 'Pasos 2 y 3 · Aprobación' */
  function tagText(labels) {
    const nums = labels.map((l) => /^Paso (\d+)$/.exec(l)).filter(Boolean).map((m) => m[1]);
    if (nums.length < 2) return labels.join(' · ');
    const out = [];
    let done = false;
    labels.forEach((l) => {
      if (/^Paso \d+$/.test(l)) { if (!done) { out.push(`Pasos ${fmt.list(nums)}`); done = true; } } else out.push(l);
    });
    return out.join(' · ');
  }
  function markedText(src, spans) {
    const sorted = spans.slice().sort((a, z) => a.start - z.start);
    let out = '';
    let pos = 0;
    sorted.forEach((s) => {
      if (s.start < pos) return;
      out += esc(src.slice(pos, s.start));
      out += `<mark class="hl${s.tone ? ' hl-' + esc(s.tone) : ''}" data-ref="${esc(s.refs.join(' '))}" tabindex="0">${esc(src.slice(s.start, s.end))}<span class="hl-tag">${esc(tagText(s.labels))}</span></mark>`;
      pos = s.end;
    });
    out += esc(src.slice(pos));
    return raw(out);
  }

  function legend() {
    return html`<div class="wf-legend-row">
      <span><i class="wf-sw sw-brand"></i>Disparador</span>
      <span><i class="wf-sw sw-step"></i>Paso de un agente</span>
      <span><i class="wf-sw sw-appr"></i>Aprobación</span>
      <span><i class="wf-sw sw-param"></i>Parámetro o regla</span>
    </div>`;
  }

  /** Texto con los códigos de procedimiento sin partir (PR-CAL-004, APPCC-TIE-01, ISO 10816-3). */
  function codes(text) {
    return raw(esc(String(text == null ? '' : text)).replace(/\b((?:[A-Z]{2,6}-){1,3}[A-Z0-9]{1,6}|ISO \d{4,5}(?:-\d+)?)\b/g, '<span class="nowrap">$1</span>'));
  }
  function checksList(checks) {
    return html`<ul class="wf-checks">${checks.map((c) => html`<li class="is-${c.tone}" data-check="${c.id}">${icon(c.tone === 'ok' ? 'check-circle' : 'alert-triangle', 16)}<span>${codes(c.text)}</span></li>`)}</ul>`;
  }

  /** Resumen en vivo de lo que se reconoce en el texto (misma interpretación que «Crear workflow»). */
  function previewText(text, tab) {
    const words = wordCount(text);
    const I = interpret(text);
    let what;
    if (I.ok) {
      const needs = I.steps.some((x) => CATALOG[x.cap].hitl) || !!(I.approval && !I.approval.negatedOnly);
      what = `disparador, ${fmt.plural(I.steps.length, 'paso', 'pasos')}${needs ? ' y aprobación' : ''}`;
    } else if (words < 3) what = 'escribe cuándo se activa y qué pasos da';
    else if (OUT_OF_SCOPE.some((o) => o.id === I.category)) what = 'fuera del alcance del espacio';
    else what = I.category === 'sin-disparador' ? 'falta el disparador' : I.category === 'sin-pasos' ? 'sin pasos reconocibles' : 'sin disparador ni pasos';
    return `${fmt.plural(words, 'palabra', 'palabras')} · vista previa: ${what} · se contrasta con ${TEMPLATES[tab].refs}`;
  }
  function editorCard(tab, L, st) {
    const seg = App.segmented({ name: 'wf-plantilla', label: 'Plantilla del procedimiento', value: tab, options: TEMPLATE_IDS.map((k) => ({ value: k, label: TEMPLATES[k].label, icon: TEMPLATES[k].icon })) });
    const showMarked = (st.phase === 'draft' || st.phase === 'published') && !st.editing;
    let body;
    let footer;
    if (showMarked) {
      body = html`<div class="wf-text" id="wf-marked">${markedText(st.res.text, st.m.hl)}</div>
        ${legend()}
        <div class="wf-subhead">Comprobaciones</div>
        ${checksList(st.m.checks)}`;
      footer = html`<button type="button" class="btn btn-secondary btn-sm" data-action="edit">${icon('edit', 15)}<span>Editar texto</span></button>
        <button type="button" class="btn btn-ghost btn-sm" data-action="restore">${icon('rotate-ccw', 15)}<span>Restaurar plantilla</span></button>
        <span class="spacer"></span><span class="muted small">${wordCount(st.res.text)} palabras · interpretado a las ${fmt.time(st.res.createdAt)}</span>`;
    } else {
      const text = textFor(L, tab);
      const updating = st.phase === 'draft' || st.phase === 'published';
      body = html`<div class="field wf-editor">
          <label class="label" for="wf-input">Procedimiento, tal como lo escribe ${W.authorNoun || AUTHOR}</label>
          <textarea id="wf-input" class="textarea" rows="10" spellcheck="false">${text}</textarea>
          <span class="hint" id="wf-count">${previewText(text, tab)}</span>
        </div>`;
      footer = html`<button type="button" class="btn btn-primary" data-action="create">${icon('play')}<span>${updating ? 'Actualizar workflow' : 'Crear workflow'}</span></button>
        ${st.editing ? html`<button type="button" class="btn btn-secondary" data-action="cancel-edit"><span>Cancelar</span></button>` : ''}
        <span class="spacer"></span>
        <button type="button" class="btn btn-ghost btn-sm" data-action="restore">${icon('rotate-ccw', 15)}<span>Restaurar plantilla</span></button>`;
    }
    return App.card({ id: 'wf-editor-card', title: 'Procedimiento escrito', sub: EN ? `“${TEMPLATES[tab].label}” template · free text in English` : `Plantilla «${TEMPLATES[tab].label}» · texto libre en castellano`, icon: 'file-text', actions: seg, body, footer });
  }

  function idleBody() {
    const items = W.idle;
    return html`<div class="card-body">
      <ul class="wf-legend">${items.map(([ic, tone, t, d]) => html`<li><span class="li-icon${tone ? ' tone-' + tone : ''}">${icon(ic, 18)}</span><div><div class="strong">${t}</div><div class="slate small mt-1">${d}</div></div></li>`)}</ul>
      <p class="muted small mt-4">${W.idleNote || 'Cada elemento queda enlazado con la frase del texto de la que sale y se contrasta con los procedimientos antes de guardar el borrador.'}</p>
    </div>`;
  }

  function rejectedBody(res) {
    const cat = OUT_OF_SCOPE.find((o) => o.id === res.category) || NOT_BUILT[res.category] || NOT_BUILT['no-reconocido'];
    return html`<div class="card-body stack stack-sm" id="wf-rejected">
      ${App.callout({ tone: 'warn', icon: 'alert-triangle', title: `No se ha creado ningún workflow · ${cat.title}`, body: html`<p>${cat.body}</p><p class="mt-2">No se ha guardado nada. La petición queda en el registro de auditoría.</p>` })}
      <div class="wf-subhead">Agentes del espacio ${SPACE}</div>
      <div class="wf-agents">${Object.keys(CATALOG).map((k) => html`<span class="wf-agent">${icon(CATALOG[k].icon, 14)}${CATALOG[k].agent}</span>`)}</div>
      <p class="muted small">Corrige el texto o restaura la plantilla para volver a empezar.</p>
    </div>`;
  }

  function mapList(m) {
    return html`<ol class="wf-map">${m.rows.map((r) => html`<li class="wf-map-item" data-ref="${r.ref}" tabindex="0">
        <span class="wf-map-num kind-${r.kind}">${r.num != null ? r.num : icon(r.icon, 14)}</span>
        <div class="wf-map-main">
          <div class="wf-map-title">${r.title}</div>
          ${r.quote ? html`<div class="wf-quote${r.quoteNote ? ' is-note' : ''}">${r.quote}</div>` : ''}
          <div class="wf-map-meta">${r.meta}</div>
        </div>
      </li>`)}</ol>`;
  }

  function interpCard(st) {
    let sub = 'Qué entiende Agentic Platform del texto';
    let body = idleBody();
    if (st.phase === 'rejected') { sub = 'Resultado de la interpretación'; body = rejectedBody(st.res); }
    if (st.phase === 'draft' || st.phase === 'published') {
      const n = st.m.steps.length;
      sub = `${fmt.plural(n, 'paso', 'pasos')} · ${st.m.approval ? '1 aprobación' : 'sin aprobación'} · cada uno con su frase del texto`;
      body = html`${mapList(st.m)}${reviewBlock(st.res)}<div class="card-body"><details class="run-log"><summary>${icon('chevron-right', 16)}<span>Registro de interpretación · ${streamSteps(st.m, st.vs).length} pasos · ${fmt.ms(st.res.ms)}</span></summary><div class="mt-2 wf-stream" id="wf-log"></div></details></div>`;
    }
    return App.card({ id: 'wf-interp-card', title: 'Interpretación', sub, icon: 'cpu', flush: true, body: html`<div id="wf-interp">${body}</div>` });
  }

  function yamlText(m, vs) {
    const q = (s) => JSON.stringify(String(s));
    const L = [];
    // La definición va en <pre> (la interfaz no la traduce): en inglés, comentarios en inglés.
    L.push(EN ? `# Agentic Platform Routine · space ${SPACE}` : `# Routine de Agentic Platform · espacio ${SPACE}`);
    L.push(`# ${vs.published ? `v${vs.n} · ${EN ? 'published' : 'publicada'}` : `v${vs.n} · ${EN ? 'unpublished draft' : 'borrador sin publicar'}`}`);
    L.push(`slug: ${m.slug}`);
    L.push(`name: ${q(m.name)}`);
    L.push(`description: ${q(m.description)}`);
    L.push('scenarios:');
    m.scenarios.forEach((s) => L.push(`  - ${q(s)}`));
    L.push('steps:');
    m.steps.forEach((s) => L.push(`  - ${s.cap}${m.approval && m.approval.gateCap === s.cap ? `   # ${EN ? 'approval first' : 'antes, aprobación'}: ${m.approval.role}` : ''}`));
    L.push('ordered: true');
    L.push('enforce: true');
    L.push(`enabled: ${vs.published ? 'true' : 'false'}`);
    if (m.config.length) {
      L.push('');
      L.push(EN ? '# Agent configuration in this workflow' : '# Configuración de los agentes en este workflow');
      L.push('config:');
      m.config.forEach(([cap, kv]) => {
        L.push(`  ${cap}:`);
        kv.forEach(([k, v]) => L.push(`    ${k}: ${typeof v === 'number' ? String(v) : q(v)}`));
      });
    }
    return L.join('\n');
  }
  function yamlHTML(text) {
    return raw(text.split('\n').map((line) => {
      if (/^\s*#/.test(line)) return `<span class="y-c">${esc(line)}</span>`;
      const m = /^(\s*(?:-\s+)?)([a-z_]+)(:)(.*)$/.exec(line);
      if (m && !/^\s*-\s+[a-z_]+$/.test(line)) return `${esc(m[1])}<span class="y-k">${esc(m[2])}</span>${esc(m[3])}${m[4].includes('#') ? `${esc(m[4].slice(0, m[4].indexOf('#')))}<span class="y-c">${esc(m[4].slice(m[4].indexOf('#')))}</span>` : esc(m[4])}`;
      const c = line.indexOf('#');
      return c > 0 ? `${esc(line.slice(0, c))}<span class="y-c">${esc(line.slice(c))}</span>` : esc(line);
    }).join('\n'));
  }

  function versionChip(vs) {
    return vs.published
      ? chip({ tone: 'ok', icon: 'check', label: `v${vs.n} · publicado` })
      : chip({ tone: 'draft', icon: 'git-branch', label: `v${vs.n} · borrador` });
  }

  function publishedCallout(m, pub) {
    const dom = m.dom;
    const next = dom && dom.next ? fill(dom.next, m.domain, m.p) : 'Se ejecuta cuando se cumpla el disparador.';
    return App.callout({
      tone: 'ok',
      icon: 'check-circle',
      title: `Workflow publicado · ${pub.version} · ${fmt.time(pub.publishedAt)}`,
      body: html`Activo en el espacio ${SPACE} y registrado en auditoría. ${next}`,
      attrs: { id: 'wf-published' },
      actions: html`${dom ? html`<button type="button" class="btn btn-primary" data-go="${dom.go}">${icon('play')}<span>${dom.goLabel}</span></button>` : ''}<button type="button" class="btn btn-secondary" data-open-audit>${icon('history')}<span>Ver en auditoría</span></button>`
    });
  }

  function stepsTable(m) {
    const rows = m.nodes.slice(1);
    const byCap = Object.fromEntries(m.steps.map((s) => [s.cap, s]));
    return App.table({
      dense: true,
      rows,
      cols: [
        { label: 'Paso', width: '26%', render: (n) => (n.id === 'approval'
          ? html`<span class="strong">Aprobación</span><span class="sub">${n.label}</span>`
          : html`<span class="strong">${n.kindLabel} · ${n.label}</span><span class="sub">${n.sub}</span>`) },
        { label: 'Agente', width: '17%', render: (n) => (n.id === 'approval' ? html`<span class="muted">Persona</span>` : html`<span class="wf-cap">${n.id}</span>`) },
        { label: 'Sistemas', width: '20%', render: (n) => (n.systems && n.systems.length ? App.sysList(n.systems) : html`<span class="muted">—</span>`) },
        { label: 'Qué hace', render: (n) => (n.id === 'approval' ? `Revisa la propuesta y decide. Rechazar no aplica nada (${m.approval.policy}).` : byCap[n.id].what) }
      ],
      rowClass: (n) => (n.id === 'approval' ? 'tone-warn' : '')
    });
  }

  function workflowCard(st, view) {
    const m = st.m;
    const vs = st.vs;
    const top = vs.published
      ? publishedCallout(m, st.pub)
      : st.pub ? App.callout({ tone: 'brand', icon: 'git-branch', title: `Cambios respecto a la ${st.pub.version} publicada`, body: html`<ul class="wf-changes">${vs.changes.map((c) => html`<li>${c}</li>`)}</ul><p class="mt-2">Al publicar, la ${st.pub.version} queda en el historial y se activa la v${vs.n}.</p>` }) : '';
    const graph = App.planGraph({ id: 'wf-graph', nodes: m.nodes, edges: m.edges, gapX: 30, title: m.name });
    const yaml = yamlText(m, vs);
    const tabs = App.tabs({
      id: 'wf-tabs',
      flush: true,
      label: 'Vistas del workflow',
      active: view || 'diagrama',
      tabs: [
        { id: 'diagrama', label: 'Diagrama', icon: 'workflow', body: html`<div class="wf-graph">${graph}</div><div class="wf-subhead">Salidas</div><div class="wf-outputs">${m.outputs.map((o) => html`<div class="wf-output">${icon(o.icon, 16)}<span>${o.text}</span></div>`)}</div>` },
        { id: 'pasos', label: 'Pasos', count: m.steps.length + (m.approval ? 1 : 0), body: stepsTable(m) },
        { id: 'definicion', label: 'Definición', icon: 'file-text', body: html`<pre class="wf-yaml" id="wf-yaml">${yamlHTML(yaml)}</pre><div class="row mt-3"><button type="button" class="btn btn-secondary btn-sm" data-action="download-def">${icon('download', 15)}<span>Descargar definición (.yaml)</span></button><span class="muted small">Formato de las Routines de Agentic Platform: frases que lo activan y agentes en orden fijo.</span></div>` }
      ]
    });
    const actions = html`${versionChip(vs)}${vs.published ? '' : html`<button type="button" class="btn btn-primary btn-sm" data-action="publish">${icon('upload', 15)}<span>Publicar workflow</span></button>`}`;
    return App.card({
      id: 'wf-card',
      title: m.name,
      sub: html`<span class="wf-slug">${m.slug}</span> · ${fmt.plural(m.steps.length, 'agente', 'agentes')} en orden fijo${m.approval ? ' · 1 aprobación humana' : ''}`,
      icon: 'workflow',
      actions,
      flush: true,
      body: html`${top ? html`<div class="card-body">${top}</div>` : ''}${tabs}`,
      footer: html`<span class="muted small">Borrador creado por el ${AGENT} en ${fmt.ms(st.res.ms)} a partir del texto · 1 llamada al modelo</span>${vs.published && st.pub.versions && st.pub.versions.length > 1 ? html`<span class="muted small">· historial: ${st.pub.versions.map((v) => v.version).join(', ')}</span>` : ''}`
    });
  }

  function paramInput(fd) {
    const id = `wf-p-${fd.key}`;
    const srcChip = fd.src === 'texto' ? chip('brand', 'Del texto', { size: 'sm' }) : fd.src === 'edicion' ? chip('info', 'Modificado', { size: 'sm' }) : chip('neutral', fd.ref, { size: 'sm' });
    let control;
    if (fd.type === 'select') {
      control = html`<select id="${id}" class="select" data-param="${fd.key}">${fd.options.map((o) => html`<option value="${o.value}" ${o.value === fd.value ? raw('selected') : ''}>${o.label}</option>`)}</select>`;
    } else if (fd.type === 'time') {
      control = html`<input id="${id}" class="input" type="time" value="${fd.value}" data-param="${fd.key}">`;
    } else {
      control = html`<div class="input-group"><input id="${id}" class="input" type="number" inputmode="decimal" value="${String(fd.value)}" min="${fd.min}" max="${fd.max}" step="${fd.step}" data-param="${fd.key}"><span class="input-addon">${fd.unit}</span></div>`;
    }
    return html`<div class="field" data-field="${fd.key}"><div class="wf-field-head"><label class="label" for="${id}">${fd.label}</label>${srcChip}</div>${control}<span class="hint">${codes(fd.hint)}</span></div>`;
  }
  function paramsCard(st) {
    return App.card({
      id: 'wf-params-card',
      title: 'Parámetros',
      sub: 'Del texto o del procedimiento · los cambios se versionan al publicar',
      icon: 'sliders',
      body: html`<div class="wf-params">${st.m.fields.map(paramInput)}</div>`
    });
  }

  function testResult(t) {
    const tone = t.lane === 'enforced' ? 'ok' : t.lane === 'hint' ? 'warn' : 'neutral';
    const label = t.lane === 'enforced' ? 'Activa este workflow en orden fijo' : t.lane === 'hint' ? 'Lo sugiere al planificador, sin imponer el orden' : 'No activa este workflow';
    return html`<div class="row">${chip(tone, `Confianza ${fmt.num(t.score, 2)}`)}<span class="small strong">${label}</span></div>
      <div class="muted small mt-1">${t.hits.length ? `Coincide en: ${fmt.list(t.hits)}` : 'Sin coincidencias con las frases del workflow'}</div>`;
  }
  function phrasesCard(st) {
    const t = st.res.test || st.m.test;
    return App.card({
      id: 'wf-phrases-card',
      title: 'Frases que lo activan',
      sub: `Desde ${fmt.num(MIN_MATCH, 2)} de confianza lo sugiere; desde ${fmt.num(ENFORCE_MIN, 2)} lo ejecuta en orden fijo`,
      icon: 'message-square',
      body: html`<ul class="wf-scen">${st.m.scenarios.map((s) => html`<li>${icon('message-square', 15)}<span>${upperFirst(s)}</span></li>`)}</ul>
        <div class="wf-subhead">Probar una frase</div>
        <div class="wf-test"><input id="wf-test-input" class="input" type="text" value="${t.phrase}" aria-label="Frase de prueba" spellcheck="false"><button type="button" class="btn btn-secondary" data-action="test">${icon('search', 16)}<span>Probar</span></button></div>
        <div class="wf-test-result" id="wf-test-result">${testResult(t)}</div>`
    });
  }

  function publishedListCard() {
    const list = (App.state.workflows || []).slice().reverse();
    const goFor = (w) => (DOMAINS[w.template] ? DOMAINS[w.template] : null);
    return App.card({
      id: 'wf-list',
      title: `Workflows publicados en ${SPACE}`,
      sub: list.length ? `${fmt.plural(list.length, 'workflow activo', 'workflows activos')} en esta sesión` : 'Ninguno todavía en esta sesión',
      icon: 'layers',
      flush: true,
      body: list.length ? App.table({
        rows: list,
        dense: true,
        cols: [
          { label: 'Workflow', width: '28%', render: (w) => html`<span class="strong">${w.name}</span><span class="sub wf-slug">${w.slug || w.id}</span>` },
          { label: 'Versión', width: '10%', render: (w) => chip({ tone: 'ok', icon: 'check', label: w.version }) },
          { label: 'Disparador', render: (w) => (w.trigger && w.trigger.label) || '—' },
          { label: 'Aprobación', width: '20%', render: (w) => w.approver || html`<span class="muted">Sin aprobación</span>` },
          { label: 'Publicado', width: '10%', render: (w) => html`<span class="nowrap">${fmt.time(w.publishedAt)}</span><span class="sub">${fmt.dayMonth(w.publishedAt)}</span>` },
          { label: '', width: '12%', render: (w) => (goFor(w) ? html`<button type="button" class="btn btn-ghost btn-sm" data-go="${goFor(w).go}">Probar${icon('arrow-right', 15)}</button>` : '') }
        ]
      }) : html`<div class="card-body"><p class="muted small">Aún no hay workflows publicados. Crea uno a partir de un procedimiento y publícalo para que se ejecute solo cuando se cumpla su disparador.</p></div>`
    });
  }

  /* ================================================================ Registro de interpretación */

  function streamSteps(m, vs) {
    const words = wordCount(m.text);
    const sentences = sentenceCount(m.text);
    const chain = html`${m.steps.map((s, i) => html`${i ? icon('arrow-right', 12) : ''}<span class="wf-cap">${s.cap}</span>`)}`;
    const checkLines = m.checks.filter((c) => c.stream).map((c) => ({ agent: AGENT, system: c.stream.system, action: c.stream.action, result: c.stream.result, ms: c.stream.ms, tone: c.tone === 'warn' ? 'warn' : 'ok' }));
    const t = m.test;
    const lane = t.lane === 'enforced' ? 'orden fijo' : t.lane === 'hint' ? 'sugerencia' : 'no lo activa';
    return [
      { agent: AGENT, system: 'Agentic Platform', action: 'Lee el procedimiento escrito', result: EN ? `${fmt.plural(words, 'word', 'words')} · ${fmt.plural(sentences, 'sentence', 'sentences')} · ${LANG.language}` : `${fmt.plural(words, 'palabra', 'palabras')} · ${fmt.plural(sentences, 'frase', 'frases')} · castellano`, ms: 40 },
      { agent: AGENT, system: 'Modelo de lenguaje', action: 'Identifica disparador, pasos, aprobación y salidas (1 llamada)', result: `${m.trigger.fullLabel} · ${fmt.plural(m.steps.length, 'paso', 'pasos')} · ${m.approval ? '1 aprobación' : 'sin aprobación'}`, ms: 2350 },
      { agent: AGENT, system: 'Agentic Platform', action: `Asigna cada paso a un agente del espacio (${CATALOG_N} activos)`, result: chain, ms: 70 },
      ...checkLines,
      { agent: AGENT, system: 'Agentic Platform', action: 'Redacta las frases que lo activan y prueba la activación', result: `«${clip(t.phrase, 60)}» · confianza ${fmt.num(t.score, 2)} · ${lane}`, ms: 820, tone: t.lane === 'enforced' ? 'ok' : 'warn' },
      { agent: AGENT, system: 'Agentic Platform', action: 'Guarda el borrador, sin publicar', result: vs && vs.published ? `${m.slug} · sin cambios respecto a la v${vs.n} publicada` : `${m.slug} · v${vs ? vs.n : 1} · borrador`, ms: 110, tone: 'ok' }
    ];
  }
  function rejectSteps(I, text) {
    const cat = OUT_OF_SCOPE.find((o) => o.id === I.category) || NOT_BUILT[I.category] || NOT_BUILT['no-reconocido'];
    const words = wordCount(text);
    return [
      { agent: AGENT, system: 'Agentic Platform', action: 'Lee el procedimiento escrito', result: EN ? `${fmt.plural(words, 'word', 'words')} · ${LANG.language}` : `${fmt.plural(words, 'palabra', 'palabras')} · castellano`, ms: 40 },
      { agent: AGENT, system: 'Modelo de lenguaje', action: 'Identifica disparador, pasos, aprobación y salidas (1 llamada)', result: cat.title, ms: 1900, tone: 'warn' },
      { agent: AGENT, system: 'Agentic Platform', action: `Busca agentes del espacio para esos pasos (${CATALOG_N} activos)`, result: 'Ninguno corresponde: no se crea ningún workflow', ms: 60, tone: 'warn' }
    ];
  }

  /* ================================================================ Acciones */

  /* Modo Local/Prodigy: el modelo revisa el workflow generado y lo explica en lenguaje natural. La estructura
     (disparador, pasos, aprobación, parámetros) sigue saliendo de la interpretación determinista. */
  let REVIEW_PENDING = null;
  const useModel = () => !!(App.llm && App.llm.isLocal());
  const LTW = (es, en) => (EN ? en : es);
  const plainW = (v) => String(v == null ? '' : v).replace(/<[^>]+>/g, ' ').replace(/[ \t]+/g, ' ').trim();
  async function askReview(text, m) {
    const org = (D.meta && (D.meta.doc_org || D.meta.company)) || '';
    const system = EN
      ? `You are the ${AGENT} agent of Agentic Platform for ${org}. You receive a procedure written by a person and the workflow the platform generated from it (trigger, steps with their agent, human approval and parameters). In at most 5 short sentences, explain what the workflow will do and when, and point out any step, threshold or approval in the text that the workflow does not reflect. Use ONLY the information given; do not invent systems, figures or roles. Answer in English, without a title.`
      : `Eres el agente ${AGENT} de Agentic Platform para ${org}. Recibes un procedimiento escrito por una persona y el workflow que la plataforma ha generado a partir de él (disparador, pasos con su agente, aprobación humana y parámetros). En 5 frases cortas como máximo, explica qué hará el workflow y cuándo, y señala cualquier paso, umbral o aprobación del texto que el workflow no recoja. Usa SOLO la información facilitada; no inventes sistemas, cifras ni roles. Responde en español, sin título.`;
    const wf = {
      [LTW('nombre', 'name')]: m.name,
      [LTW('disparador', 'trigger')]: m.trigger ? plainW(m.trigger.label || m.trigger.full || m.trigger.entry || '') : null,
      [LTW('pasos', 'steps')]: m.steps.map((x, i) => `${i + 1}. ${plainW(x.name || x.agent || x.cap)}${x.what ? `: ${plainW(x.what)}` : ''}`),
      [LTW('aprobación', 'approval')]: m.approval ? `${m.approval.role} (${m.approval.policy})` : LTW('ninguna', 'none'),
      [LTW('parámetros', 'parameters')]: m.contractParams
    };
    const user = `${LTW('Procedimiento escrito', 'Written procedure')}:\n${text}\n\n${LTW('Workflow generado', 'Generated workflow')}:\n${JSON.stringify(wf, null, 2)}`;
    const r = await App.llm.chat({ system, user, maxTokens: 500, temperature: 0.2 });
    return { text: plainW(r.text), model: r.model, ms: r.ms };
  }
  function reviewBlock(res) {
    if (!res) return '';
    const via = App.llm && App.llm.via ? App.llm.via() : { es: 'modelo', en: 'model' };
    if (res.review && res.review.error) return html`<div class="card-body"><p class="muted">${icon('alert-triangle', 15)} ${LTW(`El modelo no ha revisado el workflow (${res.review.error}).`, `The model did not review the workflow (${res.review.error}).`)}</p></div>`;
    if (res.review) return html`<div class="card-body"><div class="strong">${icon('cpu', 15)} ${LTW('Revisión del agente', 'Agent review')} · ${res.review.model} (${LTW(via.es, via.en)})</div><p class="mt-1" style="white-space:pre-line">${res.review.text}</p></div>`;
    if (REVIEW_PENDING && REVIEW_PENDING === res.createdAt) return html`<div class="card-body"><div class="al-wait"><span class="spinner"></span><span>${LTW('El modelo está revisando el workflow…', 'The model is reviewing the workflow…')}</span></div></div>`;
    return '';
  }

  function patchMap(ctx, key, tab, value) {
    const cur = Object.assign({}, ctx.local[key] || {});
    if (value === undefined) delete cur[tab]; else cur[tab] = value;
    ctx.setLocal({ [key]: cur });
  }

  async function create(ctx) {
    if (ctx.vars.busy) return;
    const tab = tabOf(ctx.local);
    const ta = ctx.$('#wf-input');
    const text = String(ta ? ta.value : textFor(ctx.local, tab)).replace(/\s+$/, '').replace(/^\s+/, '');
    if (wordCount(text) < 3) {
      App.toast('Escribe el procedimiento: cuándo se activa y qué pasos debe dar.', { tone: 'warn' });
      if (ta) ta.focus();
      return;
    }
    patchMap(ctx, 'texts', tab, text === TEMPLATES[tab].text ? undefined : text);
    ctx.vars.busy = true;
    const prevStatus = status(App.state);
    App.audit('Workflow solicitado', `Plantilla «${TEMPLATES[tab].label}» · ${fmt.plural(wordCount(text), 'palabra', 'palabras')}`);
    ctx.$$('[data-action="create"]').forEach((b) => { b.disabled = true; b.classList.add('is-busy'); b.innerHTML = String(html`<span class="spinner"></span><span>Interpretando…</span>`); });
    ctx.$$('[data-seg="wf-plantilla"] .seg-btn, [data-action="restore"], [data-action="cancel-edit"]').forEach((b) => { b.disabled = true; });
    if (ta) ta.readOnly = true;
    const I = interpret(text);
    const m = I.ok ? modelFor(text, {}) : null;
    const vs = m ? versionState(m, publishedFor(m.slug)) : null;
    const host = ctx.$('#wf-interp');
    host.innerHTML = '<div class="card-body"><div id="wf-stream" class="wf-stream"></div></div>';
    const card = ctx.$('#wf-interp-card');
    if (card && window.innerWidth < 1024) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    ctx.presenter({ next: `Mientras interpreta: «lee el texto, asigna cada paso a un agente y lo contrasta con ${TEMPLATES[tab].refs}». «Acelerar» si hace falta.` });
    const startedAt = App.nowISO();
    const review = m && !vs.published && useModel() ? askReview(text, m).catch((e) => ({ error: e.message })) : null;
    const run = App.reasoningStream(ctx.$('#wf-stream'), m ? streamSteps(m, vs) : rejectSteps(I, text), { title: `${AGENT} · interpretación`, signal: ctx.signal, maxHeight: 420, start: startedAt });
    const res = await run.done;
    if (!ctx.alive()) return;
    ctx.vars.busy = false;
    patchMap(ctx, 'editing', tab, undefined);
    if (m) {
      const createdAt = App.nowISO();
      patchMap(ctx, 'results', tab, { kind: 'draft', text, createdAt, startedAt, ms: res.ms, params: {}, test: null });
      if (review) {
        REVIEW_PENDING = createdAt;
        review.then((got) => {
          REVIEW_PENDING = null;
          if (!ctx.alive()) return;
          const cur = (ctx.local.results || {})[tab];
          if (!cur || cur.createdAt !== createdAt) return;
          patchMap(ctx, 'results', tab, Object.assign({}, cur, { review: got }));
          if (got.error) App.toast(LTW(`El modelo no ha revisado el workflow (${got.error}).`, `The model did not review the workflow (${got.error}).`), { tone: 'warn', icon: 'alert-triangle', duration: 7000 });
          else App.audit(LTW('Workflow revisado por el modelo', 'Workflow reviewed by the model'), `${m.slug} · ${got.model} · ${fmt.ms(got.ms)}`, AGENT_ACTOR);
          ctx.rerender();
        });
      }
      if (vs.published) {
        App.audit('Workflow sin cambios', `${m.slug} · coincide con la v${vs.n} publicada`, AGENT_ACTOR);
        App.toast(`Sin cambios: coincide con la v${vs.n} publicada`, { tone: 'info' });
      } else {
        App.audit('Borrador de workflow creado', `${m.slug} · v${vs.n} · ${m.steps.map((s) => s.cap).join(', ')}${m.approval ? ` · aprueba ${m.approval.role}` : ''}`, AGENT_ACTOR);
        App.toast(`Borrador v${vs.n} creado en ${fmt.ms(res.ms)} · revísalo y publícalo`, { tone: 'ok' });
      }
    } else {
      const cat = OUT_OF_SCOPE.find((o) => o.id === I.category) || NOT_BUILT[I.category] || NOT_BUILT['no-reconocido'];
      patchMap(ctx, 'results', tab, { kind: 'rejected', text, category: I.category, at: App.nowISO(), ms: res.ms });
      patchMap(ctx, 'texts', tab, text);
      App.audit('Workflow no creado', `${cat.title} · «${clip(text, 90)}»`, AGENT_ACTOR);
      App.toast(`No se ha creado ningún workflow: ${lowerFirst(cat.title)}`, { tone: 'warn' });
    }
    ctx.presenter(null);
    ctx.rerender();
    if (prevStatus.phase === 'idle' || prevStatus.phase === 'rejected') {
      requestAnimationFrame(() => { const el = ctx.$('#wf-interp-card'); if (el && window.innerWidth < 1024) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    }
  }

  async function publish(ctx) {
    if (ctx.vars.busy) return;
    const st = status(App.state);
    if (st.phase !== 'draft') return;
    const m = st.m;
    const vs = st.vs;
    const summary = html`<div class="stack stack-sm">
      ${App.kv([
        ['Workflow', html`<strong>${m.name}</strong>`],
        ['Identificador', html`<span class="wf-slug">${m.slug}</span>`],
        ['Versión', `v${vs.n}${st.pub ? ` (sustituye a la ${st.pub.version})` : ''}`],
        ['Disparador', m.trigger.fullLabel],
        ['Pasos', m.steps.map((s) => s.agent).join(', ')],
        ['Aprobación', m.approval ? m.approval.role : 'No necesita'],
        ['Ejecución', `Orden fijo cuando la confianza es de ${fmt.num(ENFORCE_MIN, 2)} o más`]
      ])}
      ${vs.changes.length ? App.callout({ tone: 'brand', icon: 'git-branch', title: 'Cambios', body: html`<ul class="wf-changes">${vs.changes.map((c) => html`<li>${c}</li>`)}</ul>` }) : ''}
    </div>`;
    let reason = null;
    if (m.deviations.length) {
      reason = await App.promptText({
        title: `Publicar workflow · v${vs.n}`,
        kicker: 'Desviación respecto al procedimiento',
        text: `${m.deviations.map((d) => d.short || d.text).join(' ')} Indica el motivo: queda en el registro de auditoría junto a la versión publicada.`,
        label: 'Motivo de la desviación',
        required: true,
        confirmLabel: 'Publicar workflow'
      });
      if (reason == null) return;
    } else {
      const ok = await App.confirm({ title: `Publicar workflow · v${vs.n}`, kicker: `Espacio ${SPACE}`, body: summary, confirmLabel: 'Publicar workflow', icon: 'upload' });
      if (!ok) return;
    }
    if (!ctx.alive()) return;
    const at = App.nowISO();
    const nodes = m.nodes.slice(1);
    const triggerExtra = {};
    if (m.dom) (m.dom.params || []).forEach((fd) => { if (fd.type !== 'role' && fd.key !== 'approver' && m.p[fd.key] != null) triggerExtra[fd.key] = m.p[fd.key]; });
    const entry = {
      id: m.slug,
      slug: m.slug,
      name: m.name,
      version: `v${vs.n}`,
      versionNumber: vs.n,
      status: 'published',
      template: m.domain,
      trigger: Object.assign({ system: m.trigger.system, type: m.trigger.type, label: m.trigger.fullLabel, text: m.trigger.text }, triggerExtra),
      steps: nodes.map((n) => (n.id === 'approval'
        ? { id: 'approval', label: `Aprobación · ${m.approval.role}`, kind: 'approval', systems: [], approver: m.approval.role, policy: m.approval.policy }
        : { id: n.id, capability: n.id, label: n.label, kind: 'agent', systems: n.systems.slice(), sub: n.sub })),
      approver: m.approval ? m.approval.role : null,
      params: Object.assign({}, m.contractParams),
      outputs: m.outputs.map((o) => o.text),
      scenarios: m.scenarios.slice(),
      ordered: true,
      enforce: true,
      enabled: true,
      publishedAt: at,
      publishedBy: AUTHOR,
      sourceText: m.text,
      sig: m.sig,
      versions: ((st.pub && st.pub.versions) || []).concat([{ version: `v${vs.n}`, publishedAt: at, changes: vs.changes.slice(), reason: reason || null }])
    };
    App.update((s) => {
      const i = s.workflows.findIndex((w) => w && (w.slug === m.slug || w.id === m.slug));
      if (i >= 0) s.workflows[i] = entry; else s.workflows.push(entry);
    });
    const detail = `${m.slug} · v${vs.n} · ${m.trigger.fullLabel} · ${m.steps.map((s) => s.cap).join(', ')}${m.approval ? ` · aprueba ${m.approval.role}` : ''}${reason ? ` · motivo de la desviación: ${reason}` : ''}`;
    App.audit(st.pub ? 'Workflow actualizado' : 'Workflow publicado', detail);
    App.toast(`Workflow publicado · v${vs.n}`, { tone: 'ok', icon: 'check-circle', action: m.dom ? { label: 'Probar', onClick: () => App.go(m.dom.go) } : undefined });
    ctx.rerender();
    requestAnimationFrame(() => { const el = ctx.$('#wf-card'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  }

  function changeParam(ctx, el) {
    const st = status(App.state);
    if (!st.m || ctx.vars.busy) return;
    const key = el.getAttribute('data-param');
    const fd = st.m.fields.find((x) => x.key === key);
    if (!fd) return;
    let v = el.value;
    let problem = null;
    if (fd.type === 'number') {
      v = parseFloat(String(v).replace(',', '.'));
      if (!Number.isFinite(v)) problem = 'Escribe un número.';
      else if (v < fd.min || v > fd.max) problem = `Debe estar entre ${fmt.num(fd.min)} y ${fmt.num(fd.max)} ${fd.unit}.`;
      else if (fd.integer) v = Math.round(v);
      if (!problem && fd.below && st.m.p[fd.below] != null && v >= st.m.p[fd.below]) { const o = st.m.fields.find((x) => x.key === fd.below); problem = `Debe quedar por debajo de «${lowerFirst(o.name || o.label)}» (${o.fmtv(o.value)}).`; }
      if (!problem && fd.above && st.m.p[fd.above] != null && v <= st.m.p[fd.above]) { const o = st.m.fields.find((x) => x.key === fd.above); problem = `Debe quedar por encima de «${lowerFirst(o.name || o.label)}» (${o.fmtv(o.value)}).`; }
    } else if (fd.type === 'time') {
      if (!/^\d{2}:\d{2}$/.test(v)) problem = 'Indica la hora con el formato hh:mm.';
    }
    if (problem) {
      App.toast(`${fd.name || fd.label}: ${problem}`, { tone: 'warn' });
      el.value = String(fd.value);
      return;
    }
    if (String(v) === String(fd.value)) return;
    const before = fd.fmtv(fd.value);
    const params = Object.assign({}, st.res.params, { [key]: v });
    const base = interpret(st.res.text);
    if (base.ok && String(base.values[key]) === String(v)) delete params[key];
    patchMap(ctx, 'results', st.tab, Object.assign({}, st.res, { params, test: null }));
    App.audit('Parámetro de workflow modificado', `${st.m.slug} · ${fd.name || fd.label}: de ${before} a ${fd.fmtv(v)}`);
    const y = window.scrollY;
    ctx.rerender();
    window.scrollTo(0, y);
  }

  function runTest(ctx) {
    const st = status(App.state);
    if (!st.m) return;
    const input = ctx.$('#wf-test-input');
    const phrase = input ? input.value.trim() : '';
    if (!phrase) return;
    const t = scoreFor(st.m.domain, phrase, st.m.trigger.text);
    patchMap(ctx, 'results', st.tab, Object.assign({}, st.res, { test: t }));
    App.audit('Prueba de activación', `${st.m.slug} · «${clip(phrase, 90)}» · confianza ${fmt.num(t.score, 2)} · ${t.lane === 'enforced' ? 'orden fijo' : t.lane === 'hint' ? 'sugerencia' : 'no lo activa'}`);
    const box = ctx.$('#wf-test-result');
    if (box) box.innerHTML = String(testResult(t));
  }

  function downloadDefinition() {
    const st = status(App.state);
    if (!st.m) return;
    App.downloadFile(`${st.m.slug}-v${st.vs.n}.yaml`, 'text/yaml', `${yamlText(st.m, st.vs)}\n`);
  }

  function focusRefs(ctx, refs) {
    const want = new Set(refs);
    ctx.$$('.wf-map-item[data-ref], .wf-text mark[data-ref]').forEach((el) => {
      const on = el.getAttribute('data-ref').split(' ').some((r) => want.has(r));
      el.classList.toggle('is-focus', on);
    });
    ctx.$$('#wf-graph [data-node]').forEach((g) => g.classList.toggle('is-focus', want.has(g.getAttribute('data-node'))));
  }

  /* ================================================================ Registro de la escena */

  const PRES = W.presenter || {};
  App.scene({
    id: 'workflow',
    order: 20,
    section: 'Automatización',
    nav: 'De palabras a workflow',
    title: 'De palabras a workflow',
    icon: 'workflow',
    // Acceso de solo lectura para las pruebas: App.scenes().find((s) => s.id === 'workflow').debug
    debug: { interpret, modelFor, scoreFor, templates: TEMPLATES },
    presenter: {
      say: (state) => {
        const st = status(state);
        if (st.phase === 'rejected') {
          return PRES.rejected || [
            'Si el texto pide algo fuera de su alcance, Agentic Platform no se inventa un workflow: explica por qué y no guarda nada.',
            `Solo encadena agentes habilitados en el espacio ${SPACE}; la petición queda igualmente en auditoría.`
          ];
        }
        const say = (st.m && st.m.dom && st.m.dom.say) || {};
        if (st.phase === 'published') {
          return [`Publicado como ${st.pub.version} y registrado en auditoría: quién, cuándo y qué versión.`]
            .concat((say.published || ['Desde ahora se ejecuta solo cuando se cumple el disparador.']).map((s) => fill(s, st.m.domain, st.m.p)))
            .concat(['Si mañana cambia el procedimiento, se edita el texto o un parámetro y se publica la v2: la anterior queda en el historial.']);
        }
        if (st.phase === 'draft') {
          return (say.draft || ['Cada frase del texto está enlazada con lo que ha entendido: disparador, pasos y aprobación.', 'Cada paso dice qué agente lo hace y qué sistema toca.']).map((s) => fill(s, st.m.domain, st.m.p))
            .concat([`Los parámetros se ajustan aquí y se contrastan con el procedimiento. Si preguntan por los límites: escribir «${PRES.outOfScopeExample || 'Compra acciones de una eléctrica cuando baje la luz'}» y pulsar «Crear workflow».`]);
        }
        return PRES.idle || [
          'Así se escribe un procedimiento: en castellano, como en el manual. No hay que dibujar ni programar nada.',
          'Agentic Platform lo convierte en un workflow de la plataforma: disparador, agentes en orden, aprobación humana y salidas, cada uno enlazado a su frase.',
          'Honestidad: el generador desde texto se simula aquí y su integración en Agentic Platform se valida en el piloto; los workflows (Routines), el editor, la aprobación y la auditoría son de serie.'
        ];
      },
      next: (state) => {
        const st = status(state);
        const first = TEMPLATES[TEMPLATE_IDS[0]].label.toLowerCase();
        if (st.phase === 'rejected') return `Pulsar «Restaurar plantilla» y crear el workflow de ${first}.`;
        if (st.phase === 'published') return st.m.dom ? `Pulsar «${st.m.dom.goLabel}».` : 'Pasar a la siguiente escena con la flecha derecha.';
        if (st.phase === 'draft') return 'Señalar una frase resaltada y su paso en el diagrama; después, «Publicar workflow».';
        return `Pulsar «Crear workflow» con el texto de ${TEMPLATES[st.tab].label.toLowerCase()}.`;
      }
    },
    render(root, ctx) {
      const st = status(App.state);
      const tab = st.tab;
      const L = ctx.local;
      const published = (App.state.workflows || []).length;
      let actions = '';
      if (st.phase === 'draft') actions = html`<button type="button" class="btn btn-primary" data-action="publish">${icon('upload')}<span>Publicar workflow</span></button>`;
      if (st.phase === 'published' && st.m.dom) actions = html`<button type="button" class="btn btn-primary" data-go="${st.m.dom.go}">${icon('play')}<span>${st.m.dom.goLabel}</span></button>`;
      const ready = st.phase === 'draft' || st.phase === 'published';
      root.innerHTML = String(html`
        ${App.pageHead({
          title: 'Nuevo workflow a partir de un procedimiento',
          meta: [
            { icon: 'user', text: AUTHOR },
            { icon: 'layers', text: `Espacio ${SPACE}` },
            { icon: 'workflow', text: fmt.plural(published, 'workflow publicado', 'workflows publicados') }
          ],
          actions
        })}
        <div class="grid cols-2 wf-top">${editorCard(tab, L, st)}${interpCard(st)}</div>
        ${ready ? html`<div class="section">${workflowCard(st, L.view)}</div>
          <div class="grid cols-2 section">${paramsCard(st)}${phrasesCard(st)}</div>` : ''}
        <div class="section">${publishedListCard()}</div>
      `);

      const log = ctx.$('#wf-log');
      if (log && ready) App.reasoningStream(log, streamSteps(st.m, st.vs), { title: `${AGENT} · interpretación`, instant: true, start: st.res.startedAt || st.res.createdAt, maxHeight: 420 });

      ctx.on('segchange', '[data-seg="wf-plantilla"]', (e) => {
        if (ctx.vars.busy) return;
        const ta = ctx.$('#wf-input');
        if (ta && !ta.readOnly) patchMap(ctx, 'texts', tabOf(ctx.local), ta.value === TEMPLATES[tabOf(ctx.local)].text ? undefined : ta.value);
        ctx.setLocal({ tab: e.detail.value });
        ctx.rerender();
      });
      ctx.on('input', '#wf-input', (e, el) => {
        const t = tabOf(ctx.local);
        patchMap(ctx, 'texts', t, el.value);
        const c = ctx.$('#wf-count');
        if (c) c.textContent = previewText(el.value, t);
      });
      ctx.on('keydown', '#wf-input', (e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); create(ctx); } });
      ctx.on('click', '[data-action="create"]', () => create(ctx));
      ctx.on('click', '[data-action="publish"]', () => publish(ctx));
      ctx.on('click', '[data-action="edit"]', () => {
        const s = status(App.state);
        if (!s.res) return;
        patchMap(ctx, 'texts', s.tab, s.res.text);
        patchMap(ctx, 'editing', s.tab, true);
        ctx.rerender();
        requestAnimationFrame(() => { const ta = ctx.$('#wf-input'); if (ta) ta.focus(); });
      });
      ctx.on('click', '[data-action="cancel-edit"]', () => {
        const s = status(App.state);
        if (s.res) patchMap(ctx, 'texts', s.tab, s.res.text);
        patchMap(ctx, 'editing', s.tab, undefined);
        ctx.rerender();
      });
      ctx.on('click', '[data-action="restore"]', () => {
        if (ctx.vars.busy) return;
        const t = tabOf(ctx.local);
        patchMap(ctx, 'texts', t, undefined);
        patchMap(ctx, 'results', t, undefined);
        patchMap(ctx, 'editing', t, undefined);
        App.audit('Plantilla restaurada', `«${TEMPLATES[t].label}»`);
        ctx.rerender();
      });
      ctx.on('click', '[data-action="test"]', () => runTest(ctx));
      ctx.on('keydown', '#wf-test-input', (e) => { if (e.key === 'Enter') { e.preventDefault(); runTest(ctx); } });
      ctx.on('click', '[data-action="download-def"]', () => downloadDefinition());
      ctx.on('change', '[data-param]', (e, el) => changeParam(ctx, el));
      ctx.on('tabchange', '[data-tabs="wf-tabs"]', (e) => ctx.setLocal({ view: e.detail.tab }));
      ctx.on('click', '.wf-map-item[data-ref]', (e, el) => focusRefs(ctx, el.getAttribute('data-ref').split(' ')));
      ctx.on('keydown', '.wf-map-item[data-ref]', (e, el) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); focusRefs(ctx, el.getAttribute('data-ref').split(' ')); } });
      ctx.on('click', '.wf-text mark[data-ref]', (e, el) => focusRefs(ctx, el.getAttribute('data-ref').split(' ')));
      ctx.on('click', '#wf-graph [data-node]', (e, el) => focusRefs(ctx, [el.getAttribute('data-node')]));
    }
  });
})();
