/*
 * Modelo de lenguaje de la consola · App.llm
 * Dos modos, elegidos con el selector «Frontera / Local» de la barra superior:
 *   - frontier: la demo de siempre, con respuestas preparadas y sin llamar a ningún modelo.
 *   - local: las escenas que redactan texto (procedimientos, cuestionario, reclamación) llaman a un modelo
 *     servido por LiteLLM (API compatible con OpenAI: POST {baseUrl}/chat/completions).
 * La URL, el modelo y la clave se guardan solo en este navegador. Para no teclearlos, un fichero local
 * assets/js/llm-local.js (fuera de git) puede definir window.AGENTIC_LLM_DEFAULTS = {baseUrl, model, apiKey}.
 */
(function () {
  'use strict';

  const { html, icon } = App;
  const I18N = window.CN_I18N;
  const EN = !!(I18N && I18N.english);
  const KEY = 'agentic-ind-llm-v1';
  const LOCAL_FILE = window.AGENTIC_LLM_DEFAULTS || null;
  const DEFAULTS = Object.assign({ baseUrl: 'http://localhost:4000/v1', model: 'gemma', apiKey: '', confirmed: !!LOCAL_FILE }, LOCAL_FILE || {});
  const L = (es, en) => (EN ? en : es);
  /* Servida con tools/serve.py, la consola llega a Prodigy por el mismo origen (/prodigy) y se evita CORS. */
  const PRODIGY_URL = /^https?:$/.test(location.protocol) && !/claude/.test(location.hostname) ? `${location.origin}/prodigy` : 'http://localhost:9700';
  const MODES = ['frontier', 'local', 'prodigy'];

  function load() {
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { saved = {}; }
    const cfg = Object.assign({ mode: 'frontier' }, DEFAULTS, saved);
    cfg.prodigy = Object.assign({ baseUrl: PRODIGY_URL, email: '', token: '' }, saved.prodigy || {});
    let qs = null;
    try { qs = new URLSearchParams(location.search); } catch (e) { qs = null; }
    const m = qs && qs.get('model');
    if (MODES.includes(m)) cfg.mode = m;
    return cfg;
  }
  let cfg = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(cfg)); } catch (e) { /* sin almacenamiento */ } }

  const trimUrl = (u) => String(u || '').trim().replace(/\/+$/, '');
  /* «Configurado» = conexión guardada desde el diálogo o fichero llm-local.js: la primera vez se piden los datos. */
  function configured() { return !!(cfg.confirmed && trimUrl(cfg.baseUrl) && String(cfg.model || '').trim()); }
  function prodigyReady() { return !!(cfg.prodigy.token && trimUrl(cfg.prodigy.baseUrl)); }
  function isProdigy() { return cfg.mode === 'prodigy' && prodigyReady(); }
  /* Modo con modelo real (LiteLLM directo o Prodigy): las escenas que redactan dejan de usar texto preparado. */
  function isLocal() { return (cfg.mode === 'local' && configured()) || isProdigy(); }
  function active() { return isProdigy() ? 'prodigy' : isLocal() ? 'local' : 'frontier'; }
  function modelName() { return isProdigy() ? 'Prodigy' : cfg.model; }
  function label() { return isLocal() ? modelName() : L('Frontera (simulado)', 'Frontier (simulated)'); }

  async function request(path, opts) {
    const o = opts || {};
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), o.timeout || 90000);
    if (o.signal) o.signal.addEventListener('abort', () => ctrl.abort(), { once: true });
    const headers = { 'Content-Type': 'application/json' };
    const bearer = o.token !== undefined ? o.token : cfg.apiKey;
    if (bearer) headers.Authorization = `Bearer ${bearer}`;
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
      if (e instanceof TypeError && /claude\.ai|claudeusercontent/.test(location.hostname)) throw new Error(L('La página publicada en claude.ai no puede llamar a servidores externos. Para el modo Local, descarga el HTML y ábrelo en tu navegador.', 'The page published on claude.ai cannot call external servers. For Local mode, download the HTML and open it in your browser.'));
      if (e instanceof TypeError) throw new Error(L(`No se puede conectar con ${trimUrl(o.baseUrl || cfg.baseUrl)} (¿está LiteLLM en marcha y permite CORS?)`, `Cannot reach ${trimUrl(o.baseUrl || cfg.baseUrl)} (is LiteLLM running and allowing CORS?)`));
      throw e;
    } finally {
      clearTimeout(timer);
    }
  }

  /* Prodigy no tiene campo de sistema: las instrucciones de la escena van delante del mensaje. */
  async function prodigyChat(o) {
    const parts = o.messages ? o.messages.map((m) => m.content) : [o.system, o.user];
    const message = parts.filter(Boolean).join('\n\n');
    const t0 = performance.now();
    let data;
    try {
      data = await request('/chat', { baseUrl: cfg.prodigy.baseUrl, token: cfg.prodigy.token, signal: o.signal, timeout: 180000, body: { message, include_history: false } });
    } catch (e) {
      if (/HTTP 401/.test(e.message)) {
        cfg.prodigy.token = '';
        save();
        syncSwitch();
        throw new Error(L('La sesión de Prodigy ha caducado; vuelve a entrar desde el selector de modelo', 'The Prodigy session expired; sign in again from the model selector'));
      }
      throw e;
    }
    const raw = String((data && (data.message || data.answer || data.response)) || '');
    const text = raw.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
    if (!text) throw new Error(L('Prodigy ha devuelto una respuesta vacía', 'Prodigy returned an empty answer'));
    const meta = (data && data.metadata) || {};
    const usage = meta.token_usage && meta.token_usage.totals ? { total_tokens: meta.token_usage.totals.total_tokens } : null;
    const ms = Math.round(performance.now() - t0);
    App.audit(L('Consulta a Prodigy', 'Prodigy call'), `${ms} ms${usage ? ` · ${usage.total_tokens || '?'} tokens` : ''}`, 'Prodigy');
    return { text, model: 'Prodigy', ms, usage, metadata: meta };
  }

  /** chat({system, user, messages, temperature, maxTokens, signal}) → {text, model, ms, usage} */
  async function chat(o) {
    if (isProdigy()) return prodigyChat(o);
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
    App.audit(L('Consulta al modelo local', 'Local model call'), `${cfg.model} · ${ms} ms${data.usage ? ` · ${data.usage.total_tokens || '?'} tokens` : ''}`, `Agentic Platform · ${cfg.model}`);
    return { text: text.trim(), model: data.model || cfg.model, ms, usage: data.usage || null };
  }
  async function listModels(baseUrl) {
    const data = await request('/models', { baseUrl, timeout: 15000 });
    return ((data && data.data) || []).map((m) => m.id).filter(Boolean);
  }

  /* ---------------------------------------------------------------- Selector y ajustes */

  function syncSwitch() {
    const cur = active();
    document.querySelectorAll('[data-model]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.model === cur)));
    const chip = document.getElementById('model-name');
    if (chip) {
      chip.textContent = cur === 'prodigy' ? (cfg.prodigy.email || 'Prodigy') : cur === 'local' ? cfg.model : '';
      chip.hidden = cur === 'frontier';
    }
  }
  function apply(mode) {
    cfg.mode = mode;
    save();
    syncSwitch();
    const detail = {
      local: [`Local · ${cfg.model} · ${trimUrl(cfg.baseUrl)}`, L(`Modelo local: ${cfg.model} vía LiteLLM`, `Local model: ${cfg.model} via LiteLLM`)],
      prodigy: [`Prodigy · ${trimUrl(cfg.prodigy.baseUrl)}`, L('Modo Prodigy: los agentes llaman al orquestador de Prodigy', 'Prodigy mode: the agents call the Prodigy orchestrator')],
      frontier: [L('Frontera · respuestas simuladas', 'Frontier · simulated answers'), L('Modo Frontera: respuestas simuladas', 'Frontier mode: simulated answers')]
    }[mode];
    App.audit(L('Modelo de la demo cambiado', 'Demo model changed'), detail[0]);
    App.toast(detail[1], { tone: 'ok', icon: 'cpu' });
    document.dispatchEvent(new CustomEvent('llm-mode', { detail: { mode } }));
    if (typeof App.refresh === 'function') App.refresh();
  }

  function settings(then) {
    const f = { url: App.uid ? App.uid('llm-url') : 'llm-url', model: 'llm-model', key: 'llm-key', list: 'llm-models' };
    const m = App.modal({
      title: L('Modelo local (LiteLLM)', 'Local model (LiteLLM)'),
      kicker: L('Conexión', 'Connection'),
      size: 'sm',
      body: html`<p class="slate small mb-4">${L('Agentic Platform llamará a este modelo para redactar las respuestas de procedimientos, el cuestionario y la reclamación. La clave se guarda solo en este navegador.', 'Agentic Platform will call this model to draft the answers in procedures, the questionnaire and the complaint. The key is stored only in this browser.')}</p>
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

  /* Inicio de sesión en Prodigy: la contraseña solo se usa para pedir el token y no se guarda. */
  function prodigySettings(then) {
    const f = { url: App.uid ? App.uid('pd-url') : 'pd-url', email: 'pd-email', pass: 'pd-pass' };
    return App.modal({
      title: L('Conectar con Prodigy', 'Connect to Prodigy'),
      kicker: L('Conexión', 'Connection'),
      size: 'sm',
      body: html`<p class="slate small mb-4">${L('Los agentes de la consola enviarán sus peticiones al orquestador de Prodigy, que elige capacidades, recupera conocimiento y llama al modelo de su catálogo. El token se guarda solo en este navegador; la contraseña no.', 'The console agents will send their requests to the Prodigy orchestrator, which picks capabilities, retrieves knowledge and calls a model from its catalog. The token is stored only in this browser; the password is not.')}</p>
        <div class="field"><label class="label" for="${f.url}">${L('URL de Prodigy', 'Prodigy URL')}</label><input id="${f.url}" class="input" type="url" value="${cfg.prodigy.baseUrl || ''}" placeholder="http://localhost:9700" autocomplete="off"></div>
        <div class="field mt-3"><label class="label" for="${f.email}">${L('Usuario (email)', 'User (email)')}</label><input id="${f.email}" class="input" type="email" value="${cfg.prodigy.email || ''}" placeholder="superadmin@prodigy.local" autocomplete="username"></div>
        <div class="field mt-3"><label class="label" for="${f.pass}">${L('Contraseña', 'Password')}</label><input id="${f.pass}" class="input" type="password" value="" autocomplete="current-password"><span class="hint" data-llm-hint>${L('Pulsa «Probar conexión» para comprobar que Prodigy responde.', 'Press “Test connection” to check that Prodigy answers.')}</span></div>`,
      actions: [
        { label: L('Probar conexión', 'Test connection'), variant: 'secondary', icon: 'activity', left: true, onClick: (api) => { test(api); return false; } },
        { label: L('Cancelar', 'Cancel'), variant: 'secondary' },
        { label: L('Entrar y usar', 'Sign in and use'), variant: 'primary', icon: 'key', onClick: (api) => { login(api); return false; } }
      ]
    });
    function read(api) {
      const q = (id) => api.body.querySelector(`#${id}`);
      return { baseUrl: trimUrl(q(f.url).value), email: q(f.email).value.trim(), password: q(f.pass).value };
    }
    function hint(api, text, bad) {
      const h = api.body.querySelector('[data-llm-hint]');
      if (h) { h.textContent = text; h.classList.toggle('t-crit', !!bad); h.classList.toggle('t-ok', !bad); }
    }
    async function test(api) {
      const v = read(api);
      hint(api, L('Probando…', 'Testing…'));
      try {
        await request('/health', { baseUrl: v.baseUrl, token: '', timeout: 15000 });
        hint(api, L('Prodigy responde', 'Prodigy is answering'));
      } catch (e) { hint(api, e.message, true); }
    }
    async function login(api) {
      const v = read(api);
      if (!v.baseUrl || !v.email || !v.password) { hint(api, L('Indica la URL, el usuario y la contraseña', 'Enter the URL, the user and the password'), true); return; }
      hint(api, L('Entrando…', 'Signing in…'));
      try {
        const data = await request('/auth/login', { baseUrl: v.baseUrl, token: '', timeout: 20000, body: { email: v.email, password: v.password } });
        if (!data || !data.access_token) throw new Error(L('Prodigy no ha devuelto un token', 'Prodigy returned no token'));
        cfg.prodigy = { baseUrl: v.baseUrl, email: v.email, token: data.access_token };
        save();
        api.close();
        if (then) setTimeout(then, 0);
      } catch (e) {
        hint(api, /HTTP 401/.test(e.message) ? L('Usuario o contraseña incorrectos', 'Wrong user or password') : e.message, true);
      }
    }
  }

  function choose(mode) {
    if (mode === 'local' && (!configured() || cfg.mode === 'local')) { settings(() => apply('local')); return; }
    if (mode === 'prodigy' && (!prodigyReady() || cfg.mode === 'prodigy')) { prodigySettings(() => apply('prodigy')); return; }
    apply(mode);
  }

  function start() {
    document.querySelectorAll('[data-model]').forEach((b) => b.addEventListener('click', () => choose(b.dataset.model)));
    const chip = document.getElementById('model-name');
    if (chip) chip.addEventListener('click', () => (active() === 'prodigy' ? prodigySettings(() => apply('prodigy')) : settings(() => apply('local'))));
    syncSwitch();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();

  /** Etiqueta para el registro de pasos de un agente: «Modelo de lenguaje» o el modelo real. */
  function systemName() { return isProdigy() ? 'Prodigy · orquestador' : isLocal() ? `LiteLLM · ${cfg.model}` : 'Modelo de lenguaje'; }
  /** Quién redacta, en los dos idiomas, para las notas de las escenas. */
  function via() { return isProdigy() ? { es: 'orquestador de Prodigy', en: 'Prodigy orchestrator' } : { es: 'modelo local vía LiteLLM', en: 'local model via LiteLLM' }; }

  App.llm = { isLocal, isProdigy, via, configured, chat, listModels, settings, prodigySettings, choose, label, systemName, get model() { return modelName(); }, get mode() { return active(); } };
  void icon;
})();
