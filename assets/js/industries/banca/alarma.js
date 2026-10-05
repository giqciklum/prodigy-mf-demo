/* Banco Cierzo · alarma con aprobación: pico de fraude en compras sin tarjeta presente del BIN 454812.
 * Entidad ficticia; datos sintéticos de demostración (MFM). Las funciones reciben el contexto H de la escena
 * (W workflow, C condición evaluada, sc alcance vigente, ids generados al aprobar, fmt, fv, pl…). */
(function () {
  'use strict';

  /* Tasa de fraude CNP del BIN (% de operaciones con puntuación de fraude confirmada), cada 5 min. */
  const KEY = [['02:00', 0.3], ['02:05', 0.4], ['02:10', 1.1], ['02:40', 1.6], ['03:20', 2.2], ['03:50', 2.7], ['04:30', 3.2], ['04:50', 3.5], ['04:55', 3.6], ['05:00', 3.4], ['05:20', 3.2], ['05:40', 3.0], ['05:50', 2.9], ['06:30', 2.5], ['07:00', 2.2]];
  const mins = (t) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
  const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  const SERIES = [];
  for (let m = mins('02:00'); m <= mins('07:00'); m += 5) {
    const i = KEY.findIndex((k) => mins(k[0]) >= m);
    const b = KEY[i];
    const a = KEY[Math.max(0, i - 1)];
    const v = mins(b[0]) === m || i === 0 ? b[1] : a[1] + (b[1] - a[1]) * (m - mins(a[0])) / (mins(b[0]) - mins(a[0]));
    SERIES.push({ time: hhmm(m), value: Math.round(v * 10) / 10 });
  }

  /* Segmentos de comercio de las 186 operaciones sospechosas (214 tarjetas, 209 clientes, 41.230 €). */
  const SEG = [
    { id: 'SEG-A', title: 'Electrónica online de riesgo alto', sub: '71 operaciones · MCC 5732', group: 'Comercio electrónico', group_short: 'A', count: 78, ops: 71, qty: 18940, clients: 76, hold: 'CMP-0929-1' },
    { id: 'SEG-B', title: 'Tarjetas regalo y recargas', sub: '47 operaciones · MCC 5815 y 6540', group: 'Bienes digitales', group_short: 'B', count: 52, ops: 47, qty: 9870, clients: 51, hold: 'CMP-0929-1' },
    { id: 'SEG-C', title: 'Criptoactivos y monederos', sub: '29 operaciones · MCC 6051', group: 'Cuasi efectivo', group_short: 'C', count: 34, ops: 29, qty: 6150, clients: 33, hold: 'CMP-0929-2' },
    { id: 'SEG-D', title: 'Juego y apuestas online', sub: '24 operaciones · MCC 7995', group: 'Juego', group_short: 'D', count: 28, ops: 24, qty: 3480, clients: 27, hold: 'CMP-0929-2' },
    { id: 'SEG-E', title: 'Pruebas de tarjeta y primeras compras', sub: '15 operaciones · comercios con 3DS débil', group: 'Varios', group_short: 'E', count: 22, ops: 15, qty: 2790, clients: 22, hold: 'CMP-0930-1' }
  ];
  /* Tarjetas (PAN enmascarado), con reparto determinista de operaciones e importe. */
  const UNITS = [];
  let seed = 454812;
  const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
  SEG.forEach((s) => {
    const w = Array.from({ length: s.count }, () => 0.4 + rnd());
    const tw = w.reduce((x, y) => x + y, 0);
    let opsLeft = s.ops;
    let eurLeft = s.qty;
    for (let i = 0; i < s.count; i += 1) {
      const last = i === s.count - 1;
      const ops = last ? opsLeft : Math.min(opsLeft, i < s.ops ? 1 : 0);
      const eur = last ? Math.round(eurLeft * 100) / 100 : Math.round((s.qty * w[i] / tw) * 100) / 100;
      opsLeft -= ops;
      eurLeft -= eur;
      UNITS.push({ item: s.id, pan: `454812******${String(Math.floor(1000 + rnd() * 8999))}`, client: `CLI-${String(4100000 + Math.floor(rnd() * 899999))}`, ops, eur: eur.toFixed(2).replace('.', ','), hold: s.hold });
    }
  });

  const ROLE = {
    fraud: 'Responsable de Prevención del Fraude', fraud_shift: 'Analista de fraude de turno', cards: 'Responsable de Medios de Pago',
    sac: 'Servicio de Atención al Cliente (SAC)', compliance: 'Responsable de Cumplimiento Normativo', it_risk: 'Riesgo tecnológico (DORA)', decider: 'Director de Operaciones'
  };
  const TEAMS = 'Fraude y Medios de Pago · guardia';
  const clients = (sc) => sc.items.reduce((s, x) => s + x.clients, 0);
  const ops = (sc) => sc.items.reduce((s, x) => s + x.ops, 0);

  agenticPack('banca', {
    alarma: {
      nav: 'Alarma BIN 454812',
      title: 'Alarma BIN 454812 en ejecución',
      icon: 'shield',
      page_title: 'BIN 454812 · pico de fraude sin tarjeta presente',
      alarm_id: 'ALM-FRA-0550',
      alarm_time: '05:50',
      source_system: 'Falcon Fraud',
      asset: 'BIN 454812',
      location: 'Centro de Operaciones · Madrid',
      excursion_noun: 'anomalía',
      workflow_topic: 'prevención del fraude en tarjetas',
      policy_ref: 'POL-FRA-003',
      procedures: 'POL-FRA-003 · PR-TAR-007 · PR-DORA-002',
      decider_short: 'Prevención del Fraude',
      approval_node: 'Aprobación de Fraude',
      measure: { short: 'tasa de fraude CNP', col: 'Tasa de fraude', unit: '%', dec: 1, icon: 'shield' },
      setpoint: 0.3,
      setpoint_label: 'tasa habitual',
      limit: 1,
      critical: 2.5,
      min_minutes: 30,
      interval_min: 5,
      series: SERIES,
      peak: 3.6,
      peak_time: '04:55',
      current: 2.2,
      current_time: '07:00',
      current_note: 'ataque en curso (14 intentos en los últimos 10 min)',
      chart: {
        title: 'BIN 454812 · tasa de fraude sin tarjeta presente',
        sub: 'Habitual 0,3 % · ahora 2,2 % (07:00), ataque en curso',
        tab: 'Tasa de fraude',
        series_label: 'Tasa de fraude CNP del BIN (Falcon)',
        yTicks: [0, 1, 2, 3, 4],
        xTicks: ['02:00', '03:00', '04:00', '05:00', '06:00', '07:00']
      },
      event_kv: [
        ['BIN', '454812 · Tarjeta Cierzo Débito (Visa) · 61.420 tarjetas activas'],
        ['Canal', 'Comercio electrónico, sin tarjeta presente (CNP)'],
        ['Detección', 'Falcon Fraud · puntuación por operación y tasa por BIN cada 5 min'],
        ['Exposición', '186 operaciones sospechosas · 41.230 € · 214 tarjetas de 209 clientes']
      ],
      events: [
        { time: '02:10', end: '03:40', text: 'La tasa supera el 1 %: ráfaga de cargos de 1–2 € (pruebas de tarjeta) en comercios con autenticación débil', ref: 'FAL-AV-0210', tone: 'warn', band: 'Pruebas de tarjeta (micro-cargos)', bandTone: 'warn' },
        { time: '02:35', text: 'Falcon abre 12 casos individuales; en la cola nocturna hay un analista de turno', equipment: 'Falcon Fraud', tone: 'warn' },
        { time: '03:40', end: '05:50', text: 'Compras de importe alto en electrónica, tarjetas regalo y criptoactivos con exención de SCA por bajo riesgo', tone: 'crit', band: 'Compras de importe alto' },
        { time: '03:50', text: 'La tasa supera el 2,5 %, umbral crítico de POL-FRA-003', ref: 'POL-FRA-003', tone: 'crit' },
        { time: '04:55', text: 'Pico de 3,6 %: 73 operaciones sospechosas en la última hora', equipment: 'BIN 454812', tone: 'crit' },
        { time: '05:50', text: 'Alerta de BIN ALM-FRA-0550: la tasa sigue en 2,9 %; 186 operaciones sospechosas por 41.230 €', ref: 'ALM-FRA-0550', tone: 'crit' },
        { time: '06:10', text: 'Visa comunica el mismo patrón en otros emisores españoles (aviso de red)', ref: 'VAA-0929-114', tone: 'brand' }
      ],
      probable_cause: 'Ataque de enumeración sobre el BIN (BIN attack): los números se generan a partir del BIN y se validan con cargos de 1–2 € en comercios con autenticación débil; las tarjetas válidas se usan después en compras de importe alto que aprovechan la exención de SCA por bajo riesgo. A confirmar por Prevención del Fraude si hay además un punto común de compromiso.',
      backup: { id: 'wf-fraude-bin-respaldo', name: 'Pico de fraude por BIN', version: 'v1', threshold: 1, minutes: 30, critical: 2.5, approver: ROLE.fraud },
      untouched: 'Falcon, T24, Redsys, Salesforce ni Teams',
      apply_systems: 'Falcon, T24, Redsys, Salesforce FSC y Teams',
      llm_cost_usd: 0.06,
      ids: [
        { key: 'rule', prefix: 'FAL-R-2026-', start: 118, label: 'Regla de Falcon' },
        { key: 'blq', prefix: 'BLQ-TAR-2026-', start: 2207, label: 'Bloqueo de tarjetas' },
        { key: 'reem', prefix: 'REE-2026-', start: 4471, label: 'Orden de reemisión' },
        { key: 'exp', prefix: 'EXF-2026-', start: 902, label: 'Expediente de fraude' }
      ],
      block_id_key: 'blq',
      proposer: 'fra',
      lanes: [
        { id: 'mon', name: 'Monitor de fraude', short: 'Monitor', icon: 'activity', systems: ['Falcon Fraud'], idle: 'Confirma la anomalía con la tasa del BIN', gsub: 'confirma la anomalía', gsys: ['Falcon'] },
        { id: 'traz', name: 'Análisis de operaciones', short: 'Análisis', icon: 'git-branch', systems: ['Falcon Fraud', 'Core bancario T24', 'Redsys'], idle: 'Agrupa operaciones, tarjetas y clientes', gsub: 'operaciones, tarjetas y clientes', gsys: ['Falcon', 'T24', 'Redsys'] },
        { id: 'fra', phase: 2, name: 'Fraude', icon: 'shield', systems: ['Falcon Fraud', 'Core bancario T24'], idle: 'Prepara la regla y el bloqueo y pide la aprobación', gsub: 'regla preventiva y bloqueo', gsys: ['Falcon', 'T24'] },
        { id: 'pag', phase: 2, name: 'Medios de pago', icon: 'repeat', systems: ['Core bancario T24', 'Redsys'], idle: 'Prepara la reemisión y los contracargos', gsub: 'reemisión y contracargos', gsys: ['T24', 'Redsys'] },
        { id: 'cli', phase: 2, name: 'Clientes', icon: 'users', systems: ['Salesforce FSC', 'Microsoft Teams'], idle: 'Avisa a los titulares por SMS y en la app', gsub: 'SMS, app y expediente', gsys: ['Salesforce', 'Teams'] }
      ],
      steps: {
        p1: (H) => {
          const a = H.all;
          return [
            { lane: 'mon', system: 'Falcon Fraud', verb: 'Consultando', action: 'Lee la tasa de fraude CNP del BIN 454812 de 02:00 a 07:00, una medida cada 5 min', result: `${SERIES.length} medidas, sin huecos · ahora 2,2 % (07:00), ataque en curso`, ms: 1700, set: { volume: `${SERIES.length} medidas de la tasa` } },
            { lane: 'mon', system: 'Agentic Platform', eval: true, ms: 90 },
            { lane: 'mon', system: 'Falcon Fraud', verb: 'Consultando', action: 'Cruza la anomalía con los motivos de puntuación y los comercios', result: 'Patrón de enumeración: cargos de 1–2 € seguidos de compras altas con exención de SCA: hipótesis para Prevención del Fraude', tone: 'warn', ms: 1500, set: { volume: `${SERIES.length} medidas · motivos de puntuación`, result: `Anomalía confirmada: ${H.C.above} min por encima · pico 3,6 %` } },
            { lane: 'traz', system: 'Falcon Fraud', verb: 'Consultando', action: 'Lista las operaciones sospechosas del BIN desde las 02:10', result: `${ops(a)} operaciones · ${H.fmt.eur(a.qty)} · ${a.count} tarjetas`, ms: 2300, set: { volume: `${ops(a)} operaciones` } },
            { lane: 'traz', system: 'Core bancario T24', verb: 'Consultando', action: 'Resuelve titular, producto y estado de cada tarjeta', result: `${a.count} tarjetas de ${clients(a)} clientes en ${a.items.length} segmentos de comercio`, ms: 2600, set: { volume: `${ops(a)} operaciones · ${a.count} tarjetas` }, reveal: 'lots' },
            { lane: 'traz', system: 'Falcon Fraud', verb: 'Consultando', action: 'Busca el mismo patrón en tarjetas sin cargo confirmado', result: `${a.elseTotal} tarjetas a vigilar · ${H.goneTotal} intentos ya denegados por Falcon antes de la alarma`, ms: 1800, reveal: 'map' },
            { lane: 'traz', system: 'Redsys', verb: 'Consultando', action: 'Consulta qué operaciones están pendientes de compensación', result: `${a.holds.length} sesiones de compensación; la primera, ${H.first.id}, a las ${H.first.time}`, tone: 'warn', ms: 2000, set: { volume: `${ops(a)} operaciones · ${a.count} tarjetas · ${a.holds.length} sesiones`, result: `Primera compensación a las ${H.first.time}` }, milestone: 'traz', audit: { action: 'Operaciones, tarjetas y clientes identificados', detail: `${ops(a)} operaciones por ${H.fmt.eur(a.qty)} · ${a.count} tarjetas de ${clients(a)} clientes · ${a.holds.length} sesiones de compensación` } },
            { lane: 'fra', node: 'apr', system: 'Procedimientos', verb: 'Analizando', action: 'Aplica POL-FRA-003 y PR-TAR-007 a esta anomalía', result: 'Regla preventiva en el BIN, bloqueo y reemisión de las tarjetas comprometidas, contracargo y aviso al titular', ms: 1300 },
            { lane: 'fra', node: 'apr', system: 'Modelo de lenguaje', verb: 'Redactando', action: 'Redacta la propuesta y su motivo con las evidencias', result: `Propuesta: regla en Falcon, bloqueo y reemisión de ${a.count} tarjetas, contracargo de ${ops(a)} operaciones y aviso a ${clients(a)} clientes`, ms: 6600, set: { volume: `${a.count} tarjetas · ${ops(a)} operaciones` } },
            { lane: 'fra', node: 'apr', system: 'Agentic Platform', verb: 'Evaluando', action: `Pide la aprobación de ${H.W.approver} antes de escribir en Falcon, T24 y Redsys`, result: 'Esperando la decisión de Prevención del Fraude', tone: 'warn', ms: 60, wait: 1500, set: { result: 'Propuesta enviada a Prevención del Fraude' }, milestone: 'prop', audit: { action: 'Propuesta de bloqueo y reemisión enviada a aprobación', detail: `Regla preventiva en el BIN 454812 · ${a.count} tarjetas · aprueba ${H.W.approver}` } }
          ];
        },
        p2: (H) => {
          const sc = H.sc;
          const ids = H.ids;
          return [
            { lane: 'fra', system: 'Falcon Fraud', verb: 'Aplicando', action: 'Activa la regla preventiva: deniega compras CNP en MCC de riesgo alto del BIN 454812 salvo autenticación 3DS fuerte', result: `${ids.rule} activa · revisión obligatoria a las 72 h`, tone: 'ok', ms: 1900, milestone: 'rule', audit: { action: 'Regla preventiva activada', detail: `${ids.rule} · Falcon Fraud · BIN 454812 · CNP en MCC de riesgo alto sin 3DS fuerte` } },
            { lane: 'fra', system: 'Core bancario T24', verb: 'Aplicando', action: `Bloquea las ${sc.count} tarjetas comprometidas con motivo «fraude»`, result: `${ids.blq} · ${sc.count} tarjetas bloqueadas; las de sustitución no heredan el bloqueo`, tone: 'ok', ms: 2400, set: { result: `${ids.rule} activa · ${sc.count} tarjetas bloqueadas` }, milestone: 'blq', audit: { action: 'Tarjetas bloqueadas', detail: `${ids.blq} · T24 · ${sc.count} tarjetas en ${sc.items.length} segmentos` } },
            { lane: 'pag', system: 'Core bancario T24', verb: 'Aplicando', action: `Genera la reemisión de las ${sc.count} tarjetas con nuevo número y envío urgente`, result: `${ids.reem} · entrega en 48–72 h · tarjeta virtual en la app desde hoy`, tone: 'ok', ms: 2100, set: { volume: `${sc.count} tarjetas a reemitir` }, milestone: 'reem', audit: { action: 'Reemisión ordenada', detail: `${ids.reem} · ${sc.count} tarjetas · envío urgente` } },
            { lane: 'pag', system: 'Redsys', verb: 'Aplicando', action: `Marca ${ops(sc)} operaciones para contracargo (Visa 10.4, fraude sin tarjeta presente)`, result: `Marcadas en ${sc.holds.map((h) => h.id).join(', ')}`, tone: 'ok', ms: 1800, set: { volume: `${sc.count} tarjetas · ${ops(sc)} contracargos`, result: `${ids.reem} · ${ops(sc)} contracargos marcados` }, milestone: 'cb', audit: { action: 'Operaciones marcadas para contracargo', detail: `Redsys · ${ops(sc)} operaciones · ${H.fmt.eur(sc.qty)} · ${sc.holds.map((h) => h.id).join(', ')}` } },
            { lane: 'cli', system: 'Salesforce FSC', verb: 'Aplicando', action: 'Abre el expediente de fraude con abono provisional para cada titular', result: `${ids.exp} · ${clients(sc)} clientes · abono provisional antes del fin del día hábil siguiente (PSD2)`, tone: 'ok', ms: 1700, set: { volume: '1 expediente' }, milestone: 'exp', audit: { action: 'Expediente de fraude abierto', detail: `${ids.exp} · Salesforce FSC · ${clients(sc)} clientes` } },
            { lane: 'cli', system: 'Salesforce FSC', verb: 'Enviando', action: 'Envía SMS y notificación en la app a los titulares', result: `${clients(sc)} SMS y ${Math.round(clients(sc) * 0.94)} notificaciones en la app`, tone: 'ok', ms: 1500, set: { volume: `1 expediente · ${clients(sc)} avisos` }, milestone: 'sms', audit: { action: 'Clientes avisados', detail: `Salesforce FSC · ${clients(sc)} SMS y notificaciones en la app` } },
            { lane: 'cli', system: 'Modelo de lenguaje', verb: 'Redactando', action: 'Redacta el plan de respuesta y la valoración DORA del incidente', result: 'Plan R1–R8 en borrador · incidente operativo no grave según DORA', ms: 7200, milestone: 'plan', audit: { action: 'Plan de respuesta redactado', detail: `${ids.exp} · R1–R8 · valoración DORA: no grave` } },
            { lane: 'cli', system: 'Microsoft Teams', verb: 'Enviando', action: `Avisa al SAC, a ${ROLE.cards} y a ${ROLE.it_risk}`, result: `Aviso publicado en el canal «${TEAMS}»`, tone: 'ok', ms: 900, wait: 1600, set: { volume: `1 expediente · ${clients(sc)} avisos · 1 aviso interno`, result: `${ids.exp} abierto · clientes avisados` }, milestone: 'teams', audit: { action: 'Aviso enviado por Microsoft Teams', detail: `SAC, ${ROLE.cards} y ${ROLE.it_risk} · canal «${TEAMS}»` } }
          ];
        }
      },
      kpis: (H, held) => [
        { label: 'Operaciones sospechosas', value: ops(H.all), sub: `${H.fmt.eur(H.all.qty)} · ${H.all.count} tarjetas · desde las 02:10`, icon: 'euro' },
        { label: 'Primera compensación afectada', value: H.first.time, sub: `${H.first.id} · ${H.pl(H.holdCount(H.all, H.first))}${held ? ' · marcada' : ''}`, icon: 'calendar' }
      ],
      scope: {
        icon: 'ticket',
        unit: ['tarjeta', 'tarjetas'],
        item_noun: ['segmento', 'segmentos'],
        qty_unit: '€',
        per_square: 5,
        items: SEG.map((s, i) => Object.assign({}, s, i === 0 ? {
          elsewhere: [{ loc: 'BIN 454813', count: 41, note: 'Tarjeta Cierzo Crédito · mismos comercios · sin cargo' }]
        } : i === 4 ? {
          elsewhere: [{ loc: 'Vigilancia', count: 312, note: 'tarjetas del BIN con un intento rechazado · sin cargo' }],
          gone: [
            { id: 'FAL-DEN-01', date: '2026-09-29', time: '02:10', count: 64, to: 'Intentos denegados por la puntuación de Falcon; sin cargo' },
            { id: 'FAL-DEN-02', date: '2026-09-29', time: '04:00', count: 32, to: 'Intentos denegados por 3DS fallido; sin cargo' }
          ]
        } : {})),
        holds: {
          'CMP-0929-1': { date: '2026-09-29', time: '08:00', where: 'Visa · sesión 1 de compensación', label: 'Compensación' },
          'CMP-0929-2': { date: '2026-09-29', time: '14:00', where: 'Visa · sesión 2 de compensación', label: 'Compensación' },
          'CMP-0930-1': { date: '2026-09-30', time: '08:00', where: 'Visa · sesión 1 de compensación', label: 'Compensación' }
        },
        units: UNITS,
        csv_name: 'tarjetas-bin-454812-fraude',
        csv_cols: [
          { label: 'Segmento', key: 'item' },
          { label: 'Tarjeta (PAN enmascarado)', key: 'pan', text: true },
          { label: 'Cliente', key: 'client' },
          { label: 'Operaciones', key: 'ops' },
          { label: 'Importe (€)', key: 'eur' },
          { label: 'Compensación', key: 'hold' }
        ],
        labels: {
          items_title: 'Tarjetas y operaciones afectadas',
          items_systems: 'Falcon Fraud, T24 y Redsys',
          items_where: 'operaciones CNP del BIN 454812,',
          item_col: 'Segmento',
          at_col: 'Tarjetas',
          group_col: 'Tipo de comercio',
          hold_col: 'Compensación',
          else_col: 'Mismo patrón',
          else_none: 'Ninguna',
          gone_verb: 'denegadas',
          exposed: 'Comprometida',
          blocked: 'Bloqueada',
          unblocked: 'Sin bloqueo',
          block_noun: 'bloqueo',
          block_verb: 'Bloquear',
          hold_verb: 'Marcar',
          held: 'Marcadas',
          holds_label: 'Sesiones de compensación con operaciones a disputar',
          holds_first: 'la primera',
          scope_main: 'Tarjetas con operaciones sospechosas desde las 02:10',
          else_scope: 'Mismo patrón sin cargo',
          else_decision: 'Vigilar',
          map_title: 'Tarjetas por segmento de comercio',
          map_sub: 'Falcon Fraud · BIN 454812',
          zone_title: 'Tarjetas comprometidas por segmento',
          zone_sub: '5 segmentos de comercio',
          else_title: 'Mismo patrón, sin cargo confirmado',
          else_sub: 'a vigilar, sin bloqueo',
          gone_title: 'Intentos denegados antes de la alarma',
          legend_exposed: 'Tarjeta comprometida',
          legend_else: 'A vigilar',
          csv_button: 'Descargar tarjetas (CSV)',
          value_label: '',
          report_scope: 'Alcance del bloqueo y la reemisión'
        }
      },
      text: {
        proposal_title: 'propuesta de bloqueo y reemisión',
        stop_without: 'proponer regla ni bloqueo',
        activates: 'la regla ni el bloqueo',
        no_proposal: 'sin propuesta de bloqueo',
        idle_log: 'La ejecución se detiene en la aprobación: nada se escribe en Falcon, T24 ni Redsys sin la decisión de Prevención del Fraude.',
        approve_action: 'Aprueba la regla, el bloqueo y la reemisión',
        scope_short: (H) => `regla en Falcon, bloquear y reemitir ${H.pl(H.sc.count)} y marcar ${ops(H.sc)} operaciones para contracargo`,
        audit_approved: 'Bloqueo y reemisión aprobados',
        audit_approved_detail: (H) => `${H.ids.rule} · ${H.ids.blq} · ${H.sc.count} tarjetas de ${clients(H.sc)} clientes · ${ops(H.sc)} operaciones a contracargo${H.sc.out.length ? ` · alcance editado (sin ${H.sc.out.map((l) => l.id).join(', ')})` : ''}`,
        outcome_approved: (H) => `Bloqueo ${H.ids.blq} aprobado · ${H.sc.count} tarjetas`,
        audit_rejected: 'Bloqueo y reemisión rechazados',
        outcome_rejected: 'Bloqueo rechazado · sin acciones aplicadas',
        toast_done: (H) => `${H.ids.rule} activa · ${H.sc.count} tarjetas bloqueadas · ${clients(H.sc)} clientes avisados`,
        presenter_applying: 'Tras la aprobación: regla en Falcon, bloqueo y reemisión en T24, contracargos en Redsys y aviso a los clientes.',
        reject_nothing: 'ni regla en Falcon, ni bloqueo o reemisión en T24, ni contracargos en Redsys, ni aviso a los clientes',
        edit_intro: 'POL-FRA-003 pide bloquear todas las tarjetas con operaciones sospechosas confirmadas.'
      },
      approval: {
        id: 'blq-bin-454812',
        approve_label: 'Aprobar bloqueo y reemisión',
        policy: 'POL-FRA-003 · PR-TAR-007 · PSD2',
        title: (H) => `Regla preventiva y bloqueo de ${H.sc.count} tarjetas`,
        summary: (H) => `Motivo: tasa de fraude CNP del BIN 454812 por encima de ${H.fv(H.C.threshold)} durante ${H.C.above} min (${H.span}), más de los ${H.C.minutes} min que fija ${H.W.backup ? 'POL-FRA-003' : 'el workflow'}${H.critMin ? `, y ${H.critMin} min por encima de ${H.fv(H.crit)}: ataque activo` : ''}. Se bloquean y reemiten las tarjetas comprometidas, se disputan sus operaciones y se avisa a los titulares.`,
        extra_scope: (H) => [{ label: 'Regla preventiva en el BIN (CNP en MCC de riesgo alto sin 3DS fuerte)', value: '72 h', status: 'warn', chip: H.decision && H.decision.status === 'approved' ? 'Activa' : 'Activar' }],
        effects: (H) => [
          'Falcon Fraud: regla preventiva en el BIN 454812 durante 72 h',
          `Core bancario T24: bloqueo y reemisión de ${H.sc.count} tarjetas`,
          `Redsys: ${ops(H.sc)} operaciones marcadas para contracargo (Visa 10.4)`,
          `Salesforce FSC: expediente con abono provisional y SMS a ${clients(H.sc)} clientes`,
          `Microsoft Teams: aviso al SAC, a ${ROLE.cards} y a ${ROLE.it_risk}`
        ],
        applied: (H) => [
          `Falcon Fraud: ${H.ids.rule} activa`,
          `Core bancario T24: ${H.ids.blq} (${H.sc.count} tarjetas) y ${H.ids.reem}`,
          `Redsys: ${ops(H.sc)} operaciones marcadas en ${H.sc.holds.map((h) => h.id).join(', ')}`,
          `Salesforce FSC: ${H.ids.exp} · ${clients(H.sc)} clientes avisados`,
          `Microsoft Teams: aviso en «${TEAMS}»`
        ]
      },
      result: {
        title: (H) => `Regla ${H.ids.rule} activa, ${H.sc.count} tarjetas bloqueadas y ${H.ids.exp} abierto`,
        stats: (H) => [
          { label: 'Tarjetas bloqueadas y reemitidas', value: H.sc.count, tone: 'crit' },
          { label: 'Operaciones a contracargo', value: ops(H.sc) },
          { label: 'Clientes avisados', value: clients(H.sc) },
          { label: 'Tarjetas a vigilar', value: H.sc.elseTotal, tone: 'warn' }
        ],
        tiles: (H) => [
          {
            icon: 'lock', tone: 'crit', title: `Regla ${H.ids.rule} y bloqueo ${H.ids.blq}`, systems: ['Falcon Fraud', 'Core bancario T24'],
            kv: [
              ['Estado', App.chip('blocked')],
              ['Regla', 'Deniega CNP en MCC de riesgo alto del BIN 454812 sin 3DS fuerte · 72 h'],
              ['Tarjetas', `${H.pl(H.sc.count)} · ${H.fmt.plural(H.sc.items.length, 'segmento', 'segmentos')}`],
              ['Importe expuesto', H.fmt.eur(H.sc.qty)],
              ['Revisa', `${ROLE.fraud} (POL-FRA-003)`]
            ],
            next: 'Siguiente paso según POL-FRA-003: revisar la tasa del BIN a las 2 h y decidir si la regla se mantiene o se relaja.',
            buttons: [{ action: 'csv', label: 'Tarjetas bloqueadas (CSV)' }]
          },
          {
            icon: 'repeat', title: `Reemisión ${H.ids.reem} y contracargos`, systems: ['Core bancario T24', 'Redsys'], chip: ['running', 'En curso'],
            kv: [
              ['Reemisión', `${H.pl(H.sc.count)} con nuevo número · envío urgente`],
              ['Tarjeta virtual', 'Disponible en la app desde hoy'],
              ['Contracargos', `${ops(H.sc)} operaciones · Visa 10.4`],
              ['Compensación', H.sc.holds.map((h) => `${h.id} (${H.holdWhen(h)})`).join(', ')],
              ['Responsable', ROLE.cards]
            ]
          },
          {
            icon: 'clipboard', title: `Plan de respuesta ${H.ids.exp}`, systems: ['Salesforce FSC', 'GRC Archer'], chip: ['draft', 'Borrador'],
            items: PLAN(H),
            buttons: [{ action: 'report-doc', icon: 'printer', label: 'Descargar plan de respuesta (PDF)' }]
          },
          {
            icon: 'send', title: 'Aviso a los titulares', systems: ['Salesforce FSC'], note: H.run.endAt ? `enviado a las ${H.fmt.time(H.run.endAt)}` : '',
            message: {
              icon: 'message-square', from: 'Banco Cierzo', channel: `SMS a ${clients(H.sc)} clientes`, at: H.run.endAt ? H.fmt.time(H.run.endAt) : '',
              paras: [
                { text: 'Banco Cierzo: hemos bloqueado tu tarjeta terminada en ****** por compras que no parecen tuyas. No tienes que hacer nada: te enviamos una nueva y ya puedes usar la tarjeta virtual en la app.' },
                { text: 'Revisa los movimientos en la app; los cargos no reconocidos se abonan de forma provisional. Nunca te pediremos claves ni códigos por SMS o teléfono.' }
              ]
            }
          }
        ]
      },
      doc: {
        code: 'REG-FRA-003-07',
        lane: 'cli',
        heading: 'Acciones R1–R8',
        col_d: 'R',
        title: (H) => `Plan de respuesta · ${H.ids.exp}`,
        subtitle: 'Incidente de fraude en el BIN 454812 · borrador para revisión',
        filename: (H) => `plan-respuesta-${H.ids.exp}`,
        meta: (H) => [['Expediente', H.ids.exp], ['Regla de Falcon', H.ids.rule], ['Bloqueo de tarjetas', H.ids.blq]],
        items: (H) => PLAN(H),
        reviewer: ROLE.fraud,
        approver: ROLE.compliance,
        note: 'Borrador generado a partir de las evidencias de la ejecución. La valoración DORA es preliminar: la confirma Riesgo tecnológico. Las fechas objetivo son una propuesta del agente.'
      },
      report: {
        noun: 'informe de incidente',
        code: 'INF-FRA-2026-031',
        title: 'Informe de incidente · BIN 454812',
        subtitle: 'Pico de fraude en compras sin tarjeta presente',
        filename: 'informe-incidente-bin-454812',
        site_label: 'Centro',
        site: 'Centro de Operaciones (Madrid)',
        description: (H) => `El 29/09/2026 a las 05:50 Falcon Fraud emitió la alerta ALM-FRA-0550 sobre el BIN 454812 (Tarjeta Cierzo Débito). La tasa de fraude en compras sin tarjeta presente estuvo ${H.C.above} min por encima de ${H.fv(H.C.threshold)} (${H.span}), frente al 0,3 % habitual, con un pico de 3,6 % a las 04:55, un 2,9 % a la hora de la alerta y ${H.critMin} min por encima de ${H.fv(H.crit)}. Se identificaron ${ops(H.all)} operaciones sospechosas por ${H.fmt.eur(H.all.qty)} en ${H.all.count} tarjetas de ${clients(H.all)} clientes.`,
        criteria: 'POL-FRA-003 (regla preventiva y bloqueo de las tarjetas comprometidas si la tasa de fraude CNP de un BIN supera el 1 % durante más de 30 min) y PR-TAR-007 (bloqueo y reemisión con nuevo número; aviso al titular). Abono provisional según PSD2 (Real Decreto-ley 19/2018).',
        actions: (H) => [
          `Falcon Fraud · ${H.ids.rule}: regla preventiva en el BIN 454812 (CNP en MCC de riesgo alto sin 3DS fuerte) durante 72 h.`,
          `Core bancario T24 · ${H.ids.blq}: ${H.sc.count} tarjetas bloqueadas; ${H.ids.reem}: reemisión urgente con nuevo número.`,
          `Redsys: ${ops(H.sc)} operaciones (${H.fmt.eur(H.sc.qty)}) marcadas para contracargo Visa 10.4 en ${H.sc.holds.map((h) => `${h.id} (${H.holdWhen(h)})`).join(', ')}.`,
          `Salesforce FSC · ${H.ids.exp}: expediente con abono provisional; SMS y aviso en la app a ${clients(H.sc)} clientes.`,
          `Microsoft Teams: aviso al SAC, a ${ROLE.cards} y a ${ROLE.it_risk} en «${TEAMS}».`
        ],
        pending: () => [
          'Revisar la tasa del BIN a las 2 h y a las 24 h; mantener o relajar la regla preventiva.',
          'Analizar si hay un punto común de compromiso y, si se confirma, abrir expediente CPP.',
          'Confirmar la valoración DORA con Riesgo tecnológico y registrar el incidente en GRC Archer.',
          `Cierre del expediente y de los contracargos: ${ROLE.fraud}.`
        ],
        reviewer: ROLE.compliance,
        final_step: 'Cierre de contracargos y abonos',
        final_role: ROLE.cards,
        note: 'Documento sujeto a la revisión de Cumplimiento Normativo; no sustituye la resolución individual de cada reclamación.'
      },
      not_applied: (H) => [
        { sys: 'Falcon Fraud', text: 'Sin regla preventiva en el BIN' },
        { sys: 'Core bancario T24', text: `Ninguna tarjeta bloqueada ni reemitida; las ${H.all.count} siguen operativas` },
        { sys: 'Redsys', text: `Sin contracargos; las ${H.all.holds.length} sesiones de compensación siguen su curso` },
        { sys: 'Salesforce FSC', text: 'Sin expediente ni aviso a los clientes' },
        { sys: 'Microsoft Teams', text: 'Sin aviso interno' }
      ],
      compare: [
        { k: 'Personas que intervienen', today: '3–4: analista de fraude, Medios de pago, SAC y responsable de guardia', now: 'Prevención del Fraude revisa y decide; Medios de pago y SAC reciben el resultado con los datos' },
        { k: 'Sistemas que se consultan a mano', today: '5–6: Falcon, T24, Redsys, Salesforce, GRC y correo', now: 'Ninguno: los agentes consultan 5 sistemas y cada dato queda en el registro' },
        { k: 'Pasos', today: '12–15 pasos manuales, con esperas hasta el turno de mañana', steps: true },
        { k: 'Tiempo hasta bloquear y avisar', today: '2–4 h (esta noche, más de 3 h y media de ataque hasta la alerta)', measured: true },
        { k: 'Evidencia para la auditoría', today: 'Repartida entre casos de Falcon, correos y hojas de cálculo', now: 'Informe INF-FRA-2026-031, plan de respuesta y registro de auditoría de la ejecución' }
      ],
      presenter: {
        intro: () => 'Alerta de las 05:50 en el BIN 454812: la tasa de fraude en compras sin tarjeta presente pasó del 0,3 % habitual a un pico de 3,6 % a las 04:55 y seguía en 2,9 % a las 05:50. Son 186 operaciones por 41.230 € en 214 tarjetas; la primera compensación sale a las 08:00.',
        agents: 'Cinco agentes, cada uno con su sistema: Falcon para la tasa y las operaciones; T24 y Redsys para tarjetas y compensación; Falcon y T24 para la regla y el bloqueo; Salesforce y Teams para clientes y aviso.',
        waiting: (H) => [
          `Las ${H.sc.elseTotal} tarjetas con el mismo patrón pero sin cargo quedan «a vigilar»: no se bloquean. Todavía no se ha escrito nada en Falcon, T24 ni Redsys.`,
          'Se puede editar el alcance (quitar un segmento, con motivo) o rechazar: si se rechaza, no se aplica nada y queda en auditoría.'
        ],
        rejected: ['Rechazado: no hay regla, bloqueo, reemisión ni aviso. El motivo queda en el registro de auditoría.', 'La decisión es siempre de Prevención del Fraude; se puede volver a ejecutar cuando se quiera.'],
        done: (H) => [
          `Aplicado tras la aprobación: ${H.ids.rule} en Falcon, ${H.sc.count} tarjetas bloqueadas y reemitidas, ${ops(H.sc)} contracargos marcados y ${clients(H.sc)} clientes avisados por SMS.`,
          'El informe de incidente sale como documento controlado, con la valoración DORA preliminar y el registro de la ejecución, listo para Cumplimiento y auditoría interna.'
        ],
        next: { done: 'Abrir «Descargar informe de incidente» y después pasar a la reclamación (flecha derecha).', no_trigger: 'Ir a «De palabras a workflow», dejar 30 min y volver a ejecutar.' }
      }
    }
  });

  /* Plan de respuesta propuesto por el agente de Clientes. */
  function PLAN(H) {
    const sc = H.sc;
    return [
      { d: 'R1', t: 'Contención', text: `${H.ids.rule} activa en Falcon y ${sc.count} tarjetas bloqueadas (${H.ids.blq}).`, owner: ROLE.fraud_shift, due: '2026-09-29' },
      { d: 'R2', t: 'Clientes', text: `SMS y aviso en la app a ${clients(sc)} clientes; abono provisional antes del fin del día hábil siguiente.`, owner: ROLE.sac, due: '2026-09-30' },
      { d: 'R3', t: 'Reemisión', text: `${H.ids.reem}: ${sc.count} tarjetas con nuevo número y envío urgente; tarjeta virtual desde hoy.`, owner: ROLE.cards, due: '2026-10-02' },
      { d: 'R4', t: 'Contracargos', text: `${ops(sc)} operaciones marcadas con Visa 10.4; seguimiento de la disputa con cada adquirente.`, owner: ROLE.cards, due: '2026-10-15' },
      { d: 'R5', t: 'Análisis de origen', text: 'Comprobar si las tarjetas comparten un punto común de compromiso o si es enumeración pura del BIN.', owner: ROLE.fraud, due: '2026-10-01' },
      { d: 'R6', t: 'Valoración DORA', text: 'Preliminar: incidente operativo no grave (sin interrupción del servicio ni pérdida de datos propios). Registrar en GRC Archer.', owner: ROLE.it_risk, due: '2026-09-30' },
      { d: 'R7', t: 'Prevención', text: 'Exigir 3DS fuerte para MCC de riesgo alto en todos los BIN de débito y limitar los cargos de 1–2 € consecutivos.', owner: ROLE.fraud, due: '2026-10-16' },
      { d: 'R8', t: 'Cierre', text: `Cerrar ${H.ids.exp} cuando se resuelvan los contracargos y los abonos definitivos.`, owner: ROLE.compliance, due: '2026-11-30' }
    ];
  }
})();
