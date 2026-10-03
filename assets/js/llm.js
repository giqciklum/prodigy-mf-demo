/*
 * Modelo de lenguaje de la consola · App.llm
 * Dos modos, elegidos con el selector «Frontera / Local» de la barra superior:
 *   - frontier: la demo de siempre, con respuestas preparadas y sin llamar a ningún modelo.
 *   - local: las escenas que redactan texto (procedimientos, cuestionario, reclamación) llaman a un modelo
 *     servido por LiteLLM (API compatible con OpenAI: POST {baseUrl}/chat/completions).
 * La URL, el modelo y la clave se guardan solo en este navegador. Para no teclearlos, un fichero local
 * assets/js/llm-local.js (fuera de git) puede definir window.PRODIGY_LLM_DEFAULTS = {baseUrl, model, apiKey}.
 */
(function () {
  'use strict';

  const { html, icon } = App;
  const I18N = window.CN_I18N;
  const EN = !!(I18N && I18N.english);
  const KEY = 'prodigy-ind-llm-v1';
  const LOCAL_FILE = window.PRODIGY_LLM_DEFAULTS || null;
  const DEFAULTS = Object.assign({ baseUrl: 'http://localhost:4000/v1', model: 'gemma', apiKey: '', confirmed: !!LOCAL_FILE }, LOCAL_FILE || {});
  const L = (es, en) => (EN ? en : es);

  function load() {
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { saved = {}; }
    const cfg = Object.assign({ mode: 'frontier' }, DEFAULTS, saved);
    let qs = null;
    try { qs = new URLSearchParams(location.search); } catch (e) { qs = null; }
    const m = qs && qs.get('model');
    if (m === 'local' || m === 'frontier') cfg.mode = m;
    return cfg;
  }
  let cfg = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(cfg)); } catch (e) { /* sin almacenamiento */ } }

  const trimUrl = (u) => String(u || '').trim().replace(/\/+$/, '');
  /* «Configurado» = conexión guardada desde el diálogo o fichero llm-local.js: la primera vez se piden los datos. */
  function configured() { return !!(cfg.confirmed && trimUrl(cfg.baseUrl) && String(cfg.model || '').trim()); }
  function isLocal() { return cfg.mode === 'local' && configured(); }
  function label() { return isLocal() ? cfg.model : L('Frontera (simulado)', 'Frontier (simulated)'); }

  async function request(path, opts) {
    const o = opts || {};
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), o.timeout || 90000);
    if (o.signal) o.signal.addEventListener('abort', () => ctrl.abort(), { once: true });
    const headers = { 'Content-Type': 'application/json' };
    if (cfg.apiKey) headers.Authorization = `Bearer ${cfg.apiKey}`;
    try {
      const res = await fetch(`${trimUrl(o.baseUrl || cfg.baseUrl)}${path}`, { method: o.body ? 'POST' : 'GET', headers, body: o.body ? JSON.stringify(o.body) : undefined, signal: ctrl.signal });
      const text = await res.text();
      let data = null;
      try { data = JSON.parse(text); } catch (e) { data = null; }
      if (!res.ok) {
        const msg = (data && data.error && (data.error.message || data.error)) || text || res.statusText;
        throw new Error(`HTTP ${res.status}: ${String(msg).slice(0, 240)}`);
      }
      return data;
    } catch (e) {
      if (e.name === 'AbortError') throw new Error(L('El modelo no ha respondido a tiempo', 'The model did not answer in time'));
      if (e instanceof TypeError) throw new Error(L(`No se puede conectar con ${trimUrl(o.baseUrl || cfg.baseUrl)} (¿está LiteLLM en marcha y permite CORS?)`, `Cannot reach ${trimUrl(o.baseUrl || cfg.baseUrl)} (is LiteLLM running and allowing CORS?)`));
      throw e;
    } finally {
      clearTimeout(timer);
    }
  }

  /** chat({system, user, messages, temperature, maxTokens, signal}) → {text, model, ms, usage} */
  async function chat(o) {
    const messages = o.messages || [].concat(o.system ? [{ role: 'system', content: o.system }] : [], [{ role: 'user', content: o.user || '' }]);
    const t0 = performance.now();
    const data = await request('/chat/completions', {
      signal: o.signal,
      body: { model: cfg.model, messages, temperature: o.temperature != null ? o.temperature : 0.1, max_tokens: o.maxTokens || 900 }
    });
    const choice = data && data.choices && data.choices[0];
    const text = choice && choice.message ? String(choice.message.content || '') : '';
    if (!text.trim()) throw new Error(L('El modelo ha devuelto una respuesta vacía', 'The model returned an empty answer'));
    const ms = Math.round(performance.now() - t0);
    App.audit(L('Consulta al modelo local', 'Local model call'), `${cfg.model} · ${ms} ms${data.usage ? ` · ${data.usage.total_tokens || '?'} tokens` : ''}`, `Prodigy · ${cfg.model}`);
    return { text: text.trim(), model: data.model || cfg.model, ms, usage: data.usage || null };
  }
  async function listModels(baseUrl) {
    const data = await request('/models', { baseUrl, timeout: 15000 });
    return ((data && data.data) || []).map((m) => m.id).filter(Boolean);
  }

  /* ---------------------------------------------------------------- Selector y ajustes */

  function syncSwitch() {
    document.querySelectorAll('[data-model]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.model === (isLocal() ? 'local' : 'frontier'))));
    const chip = document.getElementById('model-name');
    if (chip) { chip.textContent = isLocal() ? cfg.model : ''; chip.hidden = !isLocal(); }
  }
  function apply(mode) {
    cfg.mode = mode;
    save();
    syncSwitch();
    App.audit(L('Modelo de la demo cambiado', 'Demo model changed'), mode === 'local' ? `Local · ${cfg.model} · ${trimUrl(cfg.baseUrl)}` : L('Frontera · respuestas simuladas', 'Frontier · simulated answers'));
    App.toast(mode === 'local' ? L(`Modelo local: ${cfg.model} vía LiteLLM`, `Local model: ${cfg.model} via LiteLLM`) : L('Modo Frontera: respuestas simuladas', 'Frontier mode: simulated answers'), { tone: 'ok', icon: 'cpu' });
    document.dispatchEvent(new CustomEvent('llm-mode', { detail: { mode } }));
    if (typeof App.refresh === 'function') App.refresh();
  }

  function settings(then) {
    const f = { url: App.uid ? App.uid('llm-url') : 'llm-url', model: 'llm-model', key: 'llm-key', list: 'llm-models' };
    const m = App.modal({
      title: L('Modelo local (LiteLLM)', 'Local model (LiteLLM)'),
      kicker: L('Conexión', 'Connection'),
      size: 'sm',
      body: html`<p class="slate small mb-4">${L('Prodigy llamará a este modelo para redactar las respuestas de procedimientos, el cuestionario y la reclamación. La clave se guarda solo en este navegador.', 'Prodigy will call this model to draft the answers in procedures, the questionnaire and the complaint. The key is stored only in this browser.')}</p>
        <div class="field"><label class="label" for="${f.url}">${L('URL de LiteLLM (compatible con OpenAI)', 'LiteLLM URL (OpenAI-compatible)')}</label><input id="${f.url}" class="input" type="url" value="${cfg.baseUrl || ''}" placeholder="http://localhost:4000/v1" autocomplete="off"></div>
        <div class="field mt-3"><label class="label" for="${f.key}">${L('Clave (virtual key de LiteLLM)', 'Key (LiteLLM virtual key)')}</label><input id="${f.key}" class="input" type="password" value="${cfg.apiKey || ''}" placeholder="sk-…" autocomplete="off"></div>
        <div class="field mt-3"><label class="label" for="${f.model}">${L('Modelo', 'Model')}</label><input id="${f.model}" class="input" list="${f.list}" value="${cfg.model || ''}" placeholder="gemma" autocomplete="off"><datalist id="${f.list}"></datalist><span class="hint" data-llm-hint>${L('Pulsa «Probar conexión» para ver los modelos que ofrece la clave.', 'Press “Test connection” to list the models the key can use.')}</span></div>`,
      actions: [
        { label: L('Probar conexión', 'Test connection'), variant: 'secondary', icon: 'activity', left: true, onClick: (api) => { test(api); return false; } },
        { label: L('Cancelar', 'Cancel'), variant: 'secondary' },
        {
          label: L('Guardar y usar', 'Save and use'),
          variant: 'primary',
          icon: 'cpu',
          onClick: (api) => {
            const v = read(api);
            if (!v.baseUrl || !v.model) { hint(api, L('Indica la URL y el modelo', 'Enter the URL and the model'), true); return false; }
            Object.assign(cfg, v, { confirmed: true });
            save();
            if (then) setTimeout(then, 0);
            return undefined;
          }
        }
      ]
    });
    function read(api) {
      const q = (id) => api.body.querySelector(`#${id}`);
      return { baseUrl: trimUrl(q(f.url).value), apiKey: q(f.key).value.trim(), model: q(f.model).value.trim() };
    }
    function hint(api, text, bad) {
      const h = api.body.querySelector('[data-llm-hint]');
      if (h) { h.textContent = text; h.classList.toggle('t-crit', !!bad); h.classList.toggle('t-ok', !bad); }
    }
    async function test(api) {
      const v = read(api);
      const prev = Object.assign({}, cfg);
      Object.assign(cfg, v);
      hint(api, L('Probando…', 'Testing…'));
      try {
        const ids = await listModels(v.baseUrl);
        const dl = api.body.querySelector(`#${f.list}`);
        if (dl) dl.innerHTML = ids.map((id) => `<option value="${String(id).replace(/"/g, '&quot;')}"></option>`).join('');
        const modelInput = api.body.querySelector(`#${f.model}`);
        if (modelInput && ids.length && !ids.includes(modelInput.value)) {
          const gemma = ids.find((id) => /gemma/i.test(id));
          if (gemma) modelInput.value = gemma;
        }
        hint(api, ids.length ? L(`Conectado. Modelos: ${ids.join(', ')}`, `Connected. Models: ${ids.join(', ')}`) : L('Conectado, pero la clave no tiene modelos', 'Connected, but the key has no models'), !ids.length);
      } catch (e) {
        hint(api, e.message, true);
      } finally {
        Object.assign(cfg, prev);
      }
    }
    return m;
  }

  function choose(mode) {
    if (mode === 'local' && !configured()) { settings(() => apply('local')); return; }
    if (mode === 'local' && cfg.mode === 'local') { settings(() => apply('local')); return; }
    apply(mode);
  }

  function start() {
    document.querySelectorAll('[data-model]').forEach((b) => b.addEventListener('click', () => choose(b.dataset.model)));
    const chip = document.getElementById('model-name');
    if (chip) chip.addEventListener('click', () => settings(() => apply('local')));
    syncSwitch();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();

  /** Etiqueta para el registro de pasos de un agente: «Modelo de lenguaje» o el modelo real. */
  function systemName() { return isLocal() ? `LiteLLM · ${cfg.model}` : 'Modelo de lenguaje'; }

  App.llm = { isLocal, configured, chat, listModels, settings, choose, label, systemName, get model() { return cfg.model; }, get mode() { return isLocal() ? 'local' : 'frontier'; } };
  void icon;
})();
