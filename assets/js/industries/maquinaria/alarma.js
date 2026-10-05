/* Hidromec Ebro · alarma con aprobación: vibración del husillo del centro de mecanizado MC-04.
 * Empresa ficticia; datos sintéticos de demostración (MFM). Las funciones reciben el contexto H de la escena
 * (W workflow, C condición evaluada, sc alcance vigente, ids generados al aprobar, fmt, fv, pl…). */
(function () {
  'use strict';

  /* Vibración RMS del husillo (VS-MC04-01), una lectura cada 4 min. */
  const V = [
    ['03:20', 2.3], ['03:24', 2.4], ['03:28', 2.2], ['03:32', 2.6], ['03:36', 3.8], ['03:40', 4.7], ['03:44', 4.9],
    ['03:48', 5.0], ['03:52', 5.2], ['03:56', 5.3], ['04:00', 5.5], ['04:04', 5.6], ['04:08', 5.8], ['04:12', 5.9],
    ['04:16', 6.0], ['04:20', 6.2], ['04:24', 6.3], ['04:28', 6.4], ['04:32', 6.6], ['04:36', 6.7], ['04:40', 6.8],
    ['04:44', 6.9], ['04:48', 7.0], ['04:52', 7.3], ['04:56', 7.4], ['05:00', 7.6], ['05:04', 7.7], ['05:08', 7.9],
    ['05:12', 8.0], ['05:16', 8.1], ['05:20', 8.2], ['05:24', 8.3], ['05:28', 8.3], ['05:32', 8.4], ['05:36', 8.1],
    ['05:40', 7.9], ['05:44', 7.9], ['05:48', 7.8], ['05:52', 0.6], ['05:56', 0.4], ['06:00', 0.4], ['06:04', 0.4],
    ['06:08', 0.3], ['06:12', 0.4], ['06:16', 0.4], ['06:20', 0.4]
  ].map(([time, value]) => ({ time, value }));

  /* 42 culatas de la ventana 03:40–05:52 (n.º de serie 55–96 del lote CUL-2609-118), por contenedor. */
  const CONT = [
    { id: 'CUL-118-C1', from: 55, to: 65, start: 3 * 60 + 40, loc: 'Almacén intermedio AI-2 · hueco 14' },
    { id: 'CUL-118-C2', from: 66, to: 76, start: 4 * 60 + 18, loc: 'Lavadora LV-01' },
    { id: 'CUL-118-C3', from: 77, to: 86, start: 4 * 60 + 56, loc: 'Cola de metrología CMM-01' },
    { id: 'CUL-118-C4', from: 87, to: 96, start: 5 * 60 + 24, loc: 'Salida de MC-04' }
  ];
  const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  const UNITS = [];
  CONT.forEach((c) => {
    for (let n = c.from; n <= c.to; n += 1) {
      UNITS.push({ item: c.id, serial: `CUL250-26-118-${String(n).padStart(3, '0')}`, n, time: hhmm(c.start + (n - c.from) * 3 + 2), loc: c.loc, of: '4100872' });
    }
  });

  const COST = 412;
  const ROLE = {
    maintenance: 'Jefe de mantenimiento', quality: 'Responsable de Calidad', quality_shift: 'Técnico de Calidad de turno',
    production: 'Jefe de producción', decider: 'Jefe de planta'
  };
  const TEAMS = 'Mantenimiento · Planta de Zaragoza';

  agenticPack('maquinaria', {
    alarma: {
      nav: 'Alarma MC-04',
      title: 'Alarma MC-04 en ejecución',
      icon: 'activity',
      page_title: 'Centro MC-04 · vibración del husillo',
      alarm_id: 'ALM-MC04-0550',
      alarm_time: '05:50',
      source_system: 'IIoT Vibración',
      asset: 'MC-04',
      location: 'Planta de Zaragoza · Nave de mecanizado',
      excursion_noun: 'anomalía',
      workflow_topic: 'vigilancia de vibraciones',
      policy_ref: 'PR-MAN-011',
      procedures: 'PR-MAN-011 · PR-CAL-004 · PR-SEG-002',
      decider_short: 'Mantenimiento',
      approval_node: 'Aprobación de Mantenimiento',
      measure: { short: 'vibración del husillo', col: 'Vibración RMS', unit: 'mm/s', dec: 1, icon: 'activity' },
      setpoint: 2.3,
      setpoint_label: 'línea base',
      limit: 4.5,
      critical: 7.1,
      min_minutes: 30,
      interval_min: 4,
      series: V,
      peak: 8.4,
      peak_time: '05:32',
      current: 0.4,
      current_time: '06:20',
      current_note: 'husillo parado desde las 05:52 (parada de avance)',
      chart: {
        title: 'Centro MC-04 · vibración del husillo',
        sub: 'Línea base 2,3 mm/s · ahora 0,4 mm/s (06:20), husillo parado',
        tab: 'Vibración',
        series_label: 'Vibración RMS (VS-MC04-01)',
        yTicks: [0, 2, 4, 6, 8, 10],
        xTicks: ['03:30', '04:00', '04:30', '05:00', '05:30', '06:00']
      },
      event_kv: [
        ['Máquina', 'MC-04 · DMG Mori DMU 65 monoBLOCK · nave de mecanizado'],
        ['Sensor', 'VS-MC04-01 · acelerómetro en el cabezal · RMS 10–1.000 Hz, lectura cada 4 min'],
        ['Pieza en máquina', 'Culata de cilindro CUL-250 · lote CUL-2609-118 · OF 4100872, operación 30'],
        ['Equipos', 'Husillo HSK-A63 de 18.000 rpm · rodamiento delantero de contacto angular']
      ],
      events: [
        { time: '03:36', text: 'Cambio de herramienta T12 (fresa de planear Ø80) en el ciclo de la culata', equipment: 'MC-04', tone: 'brand' },
        { time: '03:40', end: '05:52', text: 'Aviso de nivel 1 de IIoT Vibración: más de 4,5 mm/s (zona D de ISO 10816-3); la máquina sigue mecanizando', ref: 'AV-MC04-0340', tone: 'warn', band: '42 culatas con vibración alta', bandTone: 'warn' },
        { time: '03:44', text: 'El operario de noche reconoce el aviso en el HMI y continúa el ciclo', equipment: 'HMI MC-04', tone: 'warn' },
        { time: '04:52', text: 'La vibración supera 7,1 mm/s, el límite de parada de PR-MAN-011', tone: 'crit', ref: 'PR-MAN-011' },
        { time: '05:04', end: '05:52', text: 'Temperatura del rodamiento delantero por encima de 55 °C (61 °C a las 05:32)', equipment: 'Husillo', tone: 'warn', band: 'Rodamiento delantero > 55 °C' },
        { time: '05:32', text: 'Pico de 8,4 mm/s; el espectro marca la frecuencia de defecto de pista exterior (BPFO)', equipment: 'VS-MC04-01', tone: 'crit' },
        { time: '05:50', text: 'Alarma ALM-MC04-0550: 60 min seguidos por encima de 7,1 mm/s', ref: 'ALM-MC04-0550', tone: 'crit' },
        { time: '05:52', text: 'El operario pone MC-04 en parada de avance; husillo parado', equipment: 'MC-04', tone: 'ok' }
      ],
      probable_cause: 'Desgaste o pérdida de precarga del rodamiento delantero del husillo: la frecuencia de defecto de pista exterior (BPFO) aparece en el espectro desde las 03:40 y el rodamiento llegó a 61 °C. El cambio de la fresa T12 a las 03:36 pudo añadir desequilibrio. A confirmar por Mantenimiento con el análisis espectral, la prueba de holgura axial y la revisión del cono HSK.',
      backup: { id: 'wf-vibracion-respaldo', name: 'Vibración anómala en centros de mecanizado', version: 'v1', threshold: 4.5, minutes: 30, critical: 7.1, approver: ROLE.maintenance },
      untouched: 'SAP QM, Maximo, SAP PP ni Teams',
      apply_systems: 'SAP QM, Opcenter, Maximo, SAP PP y Teams',
      llm_cost_usd: 0.05,
      ids: [
        { key: 'blq', prefix: 'QM-2026-', start: 3318, label: 'Bloqueo de calidad' },
        { key: 'ot', prefix: 'OT-2026-', start: 58213, label: 'Orden de trabajo' },
        { key: 'nc', prefix: 'NC-2026-', start: 214, label: 'No conformidad' }
      ],
      block_id_key: 'blq',
      proposer: 'cal',
      lanes: [
        { id: 'mon', name: 'Monitor de condición', short: 'Monitor', icon: 'activity', systems: ['IIoT Vibración'], idle: 'Confirma la anomalía con las lecturas del sensor', gsub: 'confirma la anomalía', gsys: ['IIoT Vibración'] },
        { id: 'traz', name: 'Trazabilidad de piezas', short: 'Trazabilidad', icon: 'git-branch', systems: ['MES Opcenter', 'SAP S/4HANA'], idle: 'Localiza piezas, lote y órdenes', gsub: 'piezas, lote y órdenes', gsys: ['Opcenter', 'SAP'] },
        { id: 'cal', phase: 2, name: 'Calidad', icon: 'lock', systems: ['SAP QM', 'MES Opcenter'], idle: 'Prepara el bloqueo y pide la aprobación', gsub: 'bloqueo QM, metrología y 8D', gsys: ['SAP QM', 'Opcenter'] },
        { id: 'man', phase: 2, name: 'Mantenimiento', icon: 'wrench', systems: ['GMAO Maximo', 'Microsoft Teams'], idle: 'Abre la OT de parada y avisa al técnico', gsub: 'OT, LOTO y aviso', gsys: ['Maximo', 'Teams'] },
        { id: 'pla', phase: 2, name: 'Planificación', icon: 'calendar', systems: ['SAP S/4HANA', 'MES Opcenter'], idle: 'Reasigna la OF a otro centro', gsub: 'reasigna la OF a MC-02', gsys: ['SAP PP', 'Opcenter'] }
      ],
      steps: {
        p1: (H) => {
          const a = H.all;
          return [
            { lane: 'mon', system: 'IIoT Vibración', verb: 'Consultando', action: 'Lee el sensor VS-MC04-01 de 03:20 a 06:20, una lectura cada 4 min', result: `${V.length} lecturas, sin huecos · ahora 0,4 mm/s (06:20), husillo parado desde las 05:52`, ms: 1850, set: { volume: `${V.length} lecturas de vibración` } },
            { lane: 'mon', system: 'Agentic Platform', eval: true, ms: 90 },
            { lane: 'mon', system: 'IIoT Vibración', verb: 'Consultando', action: 'Cruza la anomalía con el espectro y la temperatura del rodamiento delantero', result: 'Frecuencia de defecto de pista exterior (BPFO) marcada desde las 03:40 y rodamiento a 61 °C: hipótesis para Mantenimiento', tone: 'warn', ms: 1400, set: { volume: `${V.length} lecturas · espectro · temperatura`, result: `Anomalía confirmada: ${H.C.above} min por encima · pico 8,4 mm/s` } },
            { lane: 'traz', system: 'MES Opcenter', verb: 'Consultando', action: `Lista las piezas mecanizadas en MC-04 entre ${H.C.start} y ${H.C.end}`, result: `${a.count} culatas con número de serie en ${a.items.length} contenedores`, ms: 2100, set: { volume: `${a.count} números de serie` } },
            { lane: 'traz', system: 'SAP S/4HANA', verb: 'Consultando', action: 'Resuelve lote, orden y material de cada número de serie', result: `Lote CUL-2609-118 · OF 4100872 (operación 30) · ${H.fmt.eur(a.value)} a coste estándar`, ms: 2400, set: { volume: `${a.count} culatas · 1 lote · 1 OF` }, reveal: 'lots' },
            { lane: 'traz', system: 'MES Opcenter', verb: 'Consultando', action: 'Busca piezas del mismo lote fuera de la ventana de la anomalía', result: `${a.elseTotal} culatas mecanizadas antes de las 03:40 en AI-2 y CMM-01, a evaluar · ${H.goneTotal} ya salieron antes de la alarma`, ms: 1700, reveal: 'map' },
            { lane: 'traz', system: 'SAP S/4HANA', verb: 'Consultando', action: 'Consulta las órdenes y envíos que consumen esas culatas', result: `${a.holds.length} órdenes y envíos; la primera, ${H.first.id}, a las ${H.first.time} en la ${H.first.where.toLowerCase()}`, tone: 'warn', ms: 2200, set: { volume: `${a.count} culatas · ${a.holds.length} órdenes y envíos`, result: `Primera operación afectada a las ${H.first.time}` }, milestone: 'traz', audit: { action: 'Piezas y órdenes identificadas', detail: `${a.count} culatas del lote CUL-2609-118 en ${a.items.length} contenedores · ${a.holds.length} órdenes y envíos siguientes · ${a.elseTotal} culatas del mismo lote a evaluar` } },
            { lane: 'cal', node: 'apr', system: 'Procedimientos', verb: 'Analizando', action: 'Aplica PR-MAN-011 y PR-CAL-004 a esta anomalía', result: 'Parar y revisar el husillo; bloquear las piezas de la ventana y medirlas al 100 % en la CMM; solo Calidad libera', ms: 1300 },
            { lane: 'cal', node: 'apr', system: 'Modelo de lenguaje', verb: 'Redactando', action: 'Redacta la propuesta y su motivo con las evidencias', result: `Propuesta: bloquear ${a.count} culatas, retener ${a.holds.length} órdenes y envíos, OT de parada del husillo y pasar la OF 4100872 a MC-02`, ms: 6800, set: { volume: `${a.count} culatas · ${a.holds.length} órdenes` } },
            { lane: 'cal', node: 'apr', system: 'Agentic Platform', verb: 'Evaluando', action: `Pide la aprobación de ${H.W.approver} antes de escribir en SAP QM, Maximo y SAP PP`, result: 'Esperando la decisión de Mantenimiento', tone: 'warn', ms: 60, wait: 1500, set: { result: 'Propuesta enviada a Mantenimiento' }, milestone: 'prop', audit: { action: 'Propuesta de bloqueo y parada enviada a aprobación', detail: `${a.count} culatas en ${a.items.length} contenedores · OT de parada · OF 4100872 a MC-02 · aprueba ${H.W.approver}` } }
          ];
        },
        p2: (H) => {
          const sc = H.sc;
          const ids = H.ids;
          return [
            { lane: 'cal', system: 'SAP QM', verb: 'Aplicando', action: `Registra el bloqueo de calidad de ${sc.count} culatas del lote CUL-2609-118`, result: `${ids.blq} · ${sc.count} números de serie en estado «bloqueado»`, tone: 'ok', ms: 2300, milestone: 'blq', audit: { action: 'Bloqueo de calidad aplicado', detail: `${ids.blq} · SAP QM · ${sc.count} culatas en ${sc.items.length} contenedores` } },
            { lane: 'cal', system: 'MES Opcenter', verb: 'Aplicando', action: `Retiene ${sc.holds.length} órdenes y envíos y crea la inspección 100 % en la CMM-01`, result: `${sc.holds.map((h) => h.id).join(', ')} retenidos · plan de metrología de ${sc.count} culatas`, tone: 'ok', ms: 2000, set: { result: `${ids.blq} aplicado · ${sc.holds.length} órdenes y envíos retenidos` }, milestone: 'mes', audit: { action: 'Culatas retenidas en el MES', detail: `MES Opcenter · ${sc.count} culatas · ${sc.holds.map((h) => h.id).join(', ')} · inspección 100 % en CMM-01` } },
            { lane: 'man', system: 'GMAO Maximo', verb: 'Aplicando', action: 'Abre la OT correctiva del husillo de MC-04 con prioridad 1', result: `${ids.ot} · consignación LOTO (PR-SEG-002), análisis espectral, holgura axial y rodamientos`, tone: 'ok', ms: 1900, set: { volume: '1 OT de prioridad 1' }, milestone: 'ot', audit: { action: 'Orden de trabajo abierta', detail: `${ids.ot} · GMAO Maximo · husillo de MC-04 · prioridad 1` } },
            { lane: 'pla', system: 'SAP S/4HANA', verb: 'Aplicando', action: 'Reasigna la operación 30 de la OF 4100872 a MC-02 (DMU 65, mismo programa CNC)', result: 'OF 4100872: 64 culatas pendientes pasan a MC-02 desde las 07:30', tone: 'ok', ms: 2100, set: { volume: '1 OF reasignada' }, milestone: 'pp', audit: { action: 'Orden de fabricación reasignada', detail: 'SAP PP · OF 4100872, operación 30 · de MC-04 a MC-02 desde las 07:30' } },
            { lane: 'pla', system: 'MES Opcenter', verb: 'Aplicando', action: 'Reprograma el montaje de la OF 4100903 con culatas liberadas del lote CUL-2609-104', result: 'Montaje de cilindros de las 08:00 sin retraso · 22 culatas de stock', tone: 'ok', ms: 1700, set: { volume: '1 OF reasignada · 1 montaje reprogramado', result: 'OF 4100872 en MC-02 · montaje sin retraso' } },
            { lane: 'cal', system: 'SAP QM', verb: 'Aplicando', action: 'Abre la no conformidad con la curva, el espectro y los números de serie', result: `${ids.nc} abierta (PR-CAL-004)`, tone: 'ok', ms: 1800, set: { volume: '1 no conformidad' }, milestone: 'nc', audit: { action: 'No conformidad abierta', detail: `${ids.nc} · SAP QM · culatas mecanizadas con vibración excesiva en MC-04` } },
            { lane: 'cal', system: 'Modelo de lenguaje', verb: 'Redactando', action: 'Redacta el borrador de 8D (D1–D8) con responsables por rol', result: 'Borrador de 8D listo para la revisión de Calidad', ms: 7600, set: { volume: '1 no conformidad · 8D en borrador' }, milestone: 'd8', audit: { action: 'Borrador de 8D redactado', detail: `${ids.nc} · D1–D8 · pendiente de revisión de Calidad` } },
            { lane: 'man', system: 'Microsoft Teams', verb: 'Enviando', action: `Avisa al técnico de mantenimiento de guardia, a ${ROLE.production} y a ${ROLE.quality}`, result: `Aviso publicado en el canal «${TEAMS}»`, tone: 'ok', ms: 900, wait: 1600, set: { volume: '1 OT · 1 aviso', result: `${ids.ot} abierta · equipo avisado` }, milestone: 'teams', audit: { action: 'Aviso enviado por Microsoft Teams', detail: `Técnico de guardia, ${ROLE.production} y ${ROLE.quality} · canal «${TEAMS}»` } }
          ];
        }
      },
      kpis: (H, held) => [
        { label: 'Culatas mecanizadas durante la anomalía', value: H.all.count, sub: `${H.all.items.length} contenedores · lote CUL-2609-118 · OF 4100872`, icon: 'box' },
        { label: 'Primera operación afectada', value: H.first.time, sub: `${H.first.id} · ${H.first.where} · ${H.pl(H.holdCount(H.all, H.first))}${held ? ' · retenida' : ''}`, icon: 'calendar' }
      ],
      scope: {
        icon: 'box',
        unit: ['culata', 'culatas'],
        item_noun: ['contenedor', 'contenedores'],
        qty_unit: null,
        per_square: 1,
        items: [
          {
            id: 'CUL-118-C1', trace: 'CUL-2609-118', title: 'Culatas CUL-250 n.º 55–65', sub: 'mecanizadas 03:40–04:14', group: 'Almacén intermedio AI-2', group_short: 'C1', count: 11, value: 11 * COST, hold: 'OF-4100903', channel: 'montaje de cilindros',
            elsewhere: [
              { loc: 'AI-2', count: 18, note: 'n.º 37–54 · antes de 03:40 · a medir por muestreo' },
              { loc: 'CMM-01', count: 6, note: 'n.º 31–36 · en metrología · conformes' }
            ],
            gone: [
              { id: 'MON-2609-41', date: '2026-09-28', time: '22:10', count: 18, lot: 'CUL-2609-118', to: 'n.º 1–18 · montaje de cilindros CIL-250 · OF 4100889' },
              { id: 'ENT-26-0911', date: '2026-09-29', time: '01:30', count: 12, lot: 'CUL-2609-118', to: 'n.º 19–30 · recambios para posventa' }
            ]
          },
          { id: 'CUL-118-C2', trace: 'CUL-2609-118', title: 'Culatas CUL-250 n.º 66–76', sub: 'mecanizadas 04:18–04:52', group: 'Lavadora LV-01', group_short: 'C2', count: 11, value: 11 * COST, hold: 'OF-4100903', channel: 'montaje de cilindros' },
          { id: 'CUL-118-C3', trace: 'CUL-2609-118', title: 'Culatas CUL-250 n.º 77–86', sub: 'mecanizadas 04:56–05:24', group: 'Cola de metrología CMM-01', group_short: 'C3', count: 10, value: 10 * COST, hold: 'OF-4100911', channel: 'montaje de cilindros' },
          { id: 'CUL-118-C4', trace: 'CUL-2609-118', title: 'Culatas CUL-250 n.º 87–96', sub: 'mecanizadas 05:24–05:52', group: 'Salida de MC-04', group_short: 'C4', count: 10, value: 10 * COST, hold: 'ENT-26-0918', channel: 'recambios de posventa' }
        ],
        holds: {
          'OF-4100903': { date: '2026-09-29', time: '08:00', where: 'Línea de montaje M2', label: 'Montaje de cilindros CIL-250' },
          'OF-4100911': { date: '2026-09-29', time: '14:00', where: 'Línea de montaje M2', label: 'Montaje de cilindros CIL-250' },
          'ENT-26-0918': { date: '2026-09-30', time: '09:00', where: 'Expedición · muelle 2', label: 'Envío de recambios a posventa' }
        },
        units: UNITS,
        csv_name: 'culatas-mc04-anomalia',
        csv_cols: [
          { label: 'Contenedor', key: 'item' },
          { label: 'Número de serie', key: 'serial', text: true },
          { label: 'Mecanizada a las', key: 'time' },
          { label: 'Orden de fabricación', key: 'of' },
          { label: 'Ubicación', key: 'loc' },
          { label: 'Siguiente operación', value: (r, it) => it.hold }
        ],
        labels: {
          items_title: 'Culatas y órdenes afectadas',
          items_systems: 'MES Opcenter y SAP S/4HANA',
          items_where: 'mecanizadas en MC-04',
          item_col: 'Contenedor',
          at_col: 'Culatas',
          group_col: 'Ubicación',
          hold_col: 'Siguiente operación',
          else_col: 'Fuera de la ventana',
          else_none: 'Sin piezas',
          gone_verb: 'salieron',
          exposed: 'Sospechosa',
          blocked: 'Bloqueada',
          unblocked: 'Sin bloqueo',
          block_noun: 'bloqueo',
          block_verb: 'Bloquear',
          hold_verb: 'Retener',
          held: 'Retenidas',
          holds_label: 'Órdenes y envíos siguientes',
          holds_first: 'la primera',
          scope_main: 'Culatas mecanizadas en MC-04 durante la anomalía',
          else_scope: 'Mismo lote antes de las 03:40',
          else_decision: 'Muestreo',
          map_title: 'Ubicación de las culatas',
          map_sub: 'MES Opcenter · Planta de Zaragoza',
          zone_title: 'Ventana de la anomalía (03:40–05:52) por contenedor',
          zone_sub: '4 contenedores',
          else_title: 'Mismo lote fuera de la ventana',
          else_sub: 'mecanizadas antes de las 03:40 · a evaluar',
          gone_title: 'Salidas del lote antes de la alarma',
          legend_exposed: 'Mecanizada durante la anomalía',
          legend_else: 'A evaluar por muestreo',
          csv_button: 'Descargar números de serie (CSV)',
          value_label: 'a coste estándar',
          report_scope: 'Alcance del bloqueo'
        }
      },
      text: {
        proposal_title: 'propuesta de bloqueo y parada',
        stop_without: 'proponer bloqueo ni parada',
        activates: 'el bloqueo ni la parada',
        no_proposal: 'sin propuesta de bloqueo',
        idle_log: 'La ejecución se detiene en la aprobación: nada se escribe en SAP QM, Maximo ni SAP PP sin la decisión del Jefe de mantenimiento.',
        approve_action: 'Aprueba el bloqueo y la parada',
        scope_short: (H) => `bloquear ${H.pl(H.sc.count)} en ${H.fmt.plural(H.sc.items.length, 'contenedor', 'contenedores')}, parar el husillo y pasar la OF 4100872 a MC-02`,
        audit_approved: 'Bloqueo y parada aprobados',
        audit_approved_detail: (H) => `${H.ids.blq} · ${H.sc.count} culatas en ${H.sc.items.length} contenedores · ${H.sc.holds.length} órdenes y envíos retenidos · OT de parada · OF 4100872 a MC-02${H.sc.out.length ? ` · alcance editado (sin ${H.sc.out.map((l) => l.id).join(', ')})` : ''}`,
        outcome_approved: (H) => `Bloqueo ${H.ids.blq} aprobado · ${H.sc.count} culatas`,
        audit_rejected: 'Bloqueo y parada rechazados',
        outcome_rejected: 'Bloqueo rechazado · sin acciones aplicadas',
        toast_done: (H) => `${H.ids.blq} aplicado · ${H.ids.ot} abierta · OF 4100872 en MC-02`,
        presenter_applying: 'Tras la aprobación: bloqueo en SAP QM, retención en Opcenter, OT en Maximo, OF a MC-02 y aviso por Teams.',
        reject_nothing: 'ni bloqueo en SAP QM, ni OT en Maximo, ni cambio de planificación, ni aviso por Teams',
        edit_intro: 'PR-CAL-004 pide bloquear todas las piezas mecanizadas durante la anomalía.'
      },
      approval: {
        id: 'blq-mc04',
        approve_label: 'Aprobar bloqueo y parada',
        policy: 'PR-MAN-011 · PR-CAL-004 · solo Calidad libera',
        title: (H) => `Bloqueo de ${H.sc.count} culatas y parada de MC-04`,
        summary: (H) => `Motivo: vibración del husillo por encima de ${H.fv(H.C.threshold)} durante ${H.C.above} min (${H.span}), más de los ${H.C.minutes} min que fija ${H.W.backup ? 'PR-MAN-011' : 'el workflow'}${H.critMin ? `, y ${H.critMin} min por encima de ${H.fv(H.crit)}: zona de parada` : ''}. Se bloquean las culatas mecanizadas en la ventana hasta medirlas al 100 % y se revisa el husillo antes de volver a producir.`,
        effects: (H) => [
          `SAP QM: bloqueo de calidad de ${H.sc.count} culatas (${H.sc.items.length} contenedores)`,
          `MES Opcenter: ${H.sc.holds.length} órdenes y envíos retenidos e inspección 100 % en CMM-01`,
          'GMAO Maximo: OT correctiva de prioridad 1 con consignación LOTO',
          'SAP PP: la OF 4100872 pasa a MC-02',
          `Microsoft Teams: aviso al técnico de guardia, a ${ROLE.production} y a ${ROLE.quality}`
        ],
        applied: (H) => [
          `SAP QM: ${H.ids.blq} · ${H.sc.count} culatas bloqueadas · ${H.ids.nc} con borrador de 8D`,
          `MES Opcenter: ${H.sc.holds.map((h) => h.id).join(', ')} retenidos · inspección 100 % creada`,
          `GMAO Maximo: ${H.ids.ot} · prioridad 1`,
          'SAP PP: OF 4100872 reasignada a MC-02 desde las 07:30',
          `Microsoft Teams: aviso en «${TEAMS}»`
        ]
      },
      result: {
        title: (H) => `Bloqueo ${H.ids.blq} aplicado, ${H.ids.ot} abierta y OF en MC-02`,
        stats: (H) => [
          { label: 'Culatas bloqueadas', value: H.sc.count, tone: 'crit' },
          { label: 'Órdenes y envíos retenidos', value: H.sc.holds.length },
          { label: 'Contenedores con bloqueo', value: H.sc.items.length },
          { label: 'Culatas a evaluar por muestreo', value: H.sc.elseTotal, tone: 'warn' }
        ],
        tiles: (H) => [
          {
            icon: 'lock', tone: 'crit', title: `Bloqueo ${H.ids.blq}`, systems: ['SAP QM', 'MES Opcenter'],
            kv: [
              ['Estado', App.chip('blocked')],
              ['Alcance', `${H.pl(H.sc.count)} · ${H.fmt.plural(H.sc.items.length, 'contenedor', 'contenedores')}`],
              ['Valor a coste estándar', H.fmt.eur(H.sc.value)],
              ['Retenidos', H.sc.holds.map((h) => h.id).join(', ')],
              ['Libera', `${ROLE.quality} (PR-CAL-004)`]
            ],
            next: 'Siguiente paso según PR-CAL-004: medir las culatas al 100 % en la CMM-01 (planitud de la cara de cierre, diámetro del alojamiento de la junta y rugosidad Ra).',
            buttons: [{ action: 'csv', label: 'Números de serie bloqueados (CSV)' }]
          },
          {
            icon: 'wrench', title: `Orden de trabajo ${H.ids.ot}`, systems: ['GMAO Maximo', 'SAP S/4HANA'], chip: ['running', 'Prioridad 1'],
            kv: [
              ['Equipo', 'MC-04 · husillo HSK-A63'],
              ['Tipo', 'Correctiva · parada de máquina'],
              ['Tareas', 'Consignación LOTO, análisis espectral, holgura axial, rodamientos y cono HSK'],
              ['Asignada a', 'Técnico de mantenimiento de guardia'],
              ['Producción', 'OF 4100872 reasignada a MC-02 desde las 07:30']
            ],
            next: 'MC-04 no vuelve a producir hasta cerrar la OT con una medida de vibración por debajo de 2,8 mm/s (zona B).'
          },
          {
            icon: 'clipboard', title: `No conformidad ${H.ids.nc}`, systems: ['SAP QM'], chip: ['draft', '8D en borrador'],
            items: A8D(H),
            buttons: [{ action: 'report-doc', icon: 'printer', label: 'Descargar borrador 8D (PDF)' }]
          },
          {
            icon: 'send', title: 'Aviso al equipo', systems: ['Microsoft Teams'], note: H.run.endAt ? `enviado a las ${H.fmt.time(H.run.endAt)}` : '',
            message: {
              from: 'Agentic Platform · agente Mantenimiento', channel: `canal «${TEAMS}»`, at: H.run.endAt ? H.fmt.time(H.run.endAt) : '',
              paras: [
                { to: 'Técnico de guardia', text: `${H.ids.ot} de prioridad 1 en MC-04, aprobada por ${H.decision.by}. Consignar según PR-SEG-002 y revisar el rodamiento delantero del husillo (BPFO en el espectro, 61 °C a las 05:32).` },
                { to: ROLE.production, text: 'La OF 4100872 pasa a MC-02 desde las 07:30; el montaje de las 08:00 sale con culatas del lote CUL-2609-104.' },
                { to: ROLE.quality, text: `${H.ids.blq}: ${H.sc.count} culatas bloqueadas; retenidos ${H.sc.holds.map((h) => `${h.id} (${H.holdWhen(h)})`).join(', ')}. Detalle en ${H.ids.nc}.` }
              ]
            }
          }
        ]
      },
      doc: {
        code: 'REG-CAL-008-11',
        lane: 'cal',
        heading: 'Disciplinas D1–D8',
        title: (H) => `Informe 8D · ${H.ids.nc}`,
        subtitle: 'No conformidad por mecanizado con vibración excesiva del husillo en MC-04 · borrador para revisión',
        filename: (H) => `borrador-8d-${H.ids.nc}`,
        meta: (H) => [['No conformidad', H.ids.nc], ['Bloqueo asociado', H.ids.blq], ['Orden de trabajo', H.ids.ot]],
        items: (H) => A8D(H),
        reviewer: ROLE.quality,
        approver: ROLE.decider,
        note: 'Borrador generado a partir de las evidencias de la ejecución. Las fechas objetivo son una propuesta: las confirma el equipo del 8D. La causa raíz es una hipótesis hasta que Mantenimiento cierre la OT con el análisis del rodamiento.'
      },
      report: {
        noun: 'informe de incidencia',
        code: 'REG-MAN-011-04',
        title: 'Informe de incidencia · centro MC-04',
        subtitle: 'Vibración excesiva del husillo',
        filename: 'informe-incidencia-mc04',
        site_label: 'Planta',
        site: 'Planta de Zaragoza (PLAZA)',
        description: (H) => `El 29/09/2026 a las ${'05:50'} IIoT Vibración emitió la alarma ALM-MC04-0550 en el centro de mecanizado MC-04 (DMG Mori DMU 65). La vibración del husillo (sensor VS-MC04-01) estuvo ${H.C.above} min por encima de ${H.fv(H.C.threshold)} (${H.span}), con un pico de 8,4 mm/s a las 05:32 y ${H.critMin} min por encima de ${H.fv(H.crit)}. En la ventana se mecanizaron ${H.all.count} culatas CUL-250 del lote CUL-2609-118 (OF 4100872). El operario puso la máquina en parada de avance a las 05:52.`,
        criteria: 'PR-MAN-011 (parada y revisión del husillo si la vibración supera 4,5 mm/s durante más de 30 min; parada inmediata por encima de 7,1 mm/s) y PR-CAL-004 (bloqueo en SAP QM de las piezas fabricadas durante la anomalía; solo Calidad libera).',
        actions: (H) => [
          `SAP QM · ${H.ids.blq}: bloqueo de calidad de ${H.sc.count} culatas en ${H.sc.items.length} contenedores (${H.fmt.eur(H.sc.value)} a coste estándar).`,
          `MES Opcenter: retenidos ${H.sc.holds.map((h) => `${h.id} (${H.holdWhen(h)}, ${h.where})`).join(', ')}; inspección 100 % en CMM-01.`,
          `GMAO Maximo · ${H.ids.ot}: OT correctiva de prioridad 1 con consignación LOTO (PR-SEG-002).`,
          'SAP PP: operación 30 de la OF 4100872 reasignada a MC-02; montaje de la OF 4100903 reprogramado con culatas del lote CUL-2609-104.',
          `SAP QM · ${H.ids.nc}: no conformidad abierta con borrador de 8D (REG-CAL-008-11).`,
          `Microsoft Teams: aviso al técnico de guardia, a ${ROLE.production} y a ${ROLE.quality} en «${TEAMS}».`
        ],
        pending: () => [
          'Medir al 100 % las culatas bloqueadas en la CMM-01 y decidir por número de serie: liberar, reprocesar o desechar (PR-CAL-004).',
          'Muestrear 5 culatas del mismo lote mecanizadas antes de las 03:40 (AI-2) para descartar degradación previa.',
          'Cerrar la OT con el informe del rodamiento y una medida de vibración en zona B antes de volver a producir en MC-04.',
          `Liberación de las culatas: solo ${ROLE.quality} (PR-CAL-004).`
        ],
        reviewer: ROLE.quality,
        final_step: 'Destino de las culatas',
        final_role: ROLE.quality,
        note: 'Documento sujeto a la revisión de Calidad y Mantenimiento; no sustituye la decisión de destino de las piezas.'
      },
      not_applied: (H) => [
        { sys: 'SAP QM', text: 'Sin bloqueo de calidad ni no conformidad' },
        { sys: 'MES Opcenter', text: `Ninguna culata retenida; las ${H.all.holds.length} órdenes y envíos siguen planificados` },
        { sys: 'GMAO Maximo', text: 'Sin orden de trabajo' },
        { sys: 'SAP S/4HANA', text: 'La OF 4100872 sigue asignada a MC-04' },
        { sys: 'Microsoft Teams', text: 'Sin aviso al equipo' }
      ],
      compare: [
        { k: 'Personas que intervienen', today: '3–4: operario, Mantenimiento, Calidad y Planificación', now: 'Mantenimiento revisa y decide; Calidad y Planificación reciben el resultado con los datos' },
        { k: 'Sistemas que se consultan a mano', today: '5–6: IIoT, Opcenter, SAP QM, SAP PP, Maximo y teléfono', now: 'Ninguno: los agentes consultan 6 sistemas y cada dato queda en el registro' },
        { k: 'Pasos', today: '10–12 pasos manuales, con esperas entre turnos', steps: true },
        { k: 'Tiempo hasta parar, bloquear y replanificar', today: '1–3 h (esta noche, 2 h 12 min de anomalía sin actuar)', measured: true },
        { k: 'Evidencia para la auditoría', today: 'Repartida entre el HMI, correos y hojas de cálculo', now: 'Informe REG-MAN-011-04, 8D en borrador y registro de auditoría de la ejecución' }
      ],
      presenter: {
        intro: () => 'Alarma de las 05:50 en MC-04: el husillo vibró a 7,8 mm/s, con pico de 8,4 a las 05:32, desde las 03:40. En la ventana salieron 42 culatas del lote CUL-2609-118; la primera orden que las consume arranca a las 08:00.',
        agents: 'Cinco agentes, cada uno con su sistema: IIoT para la vibración; Opcenter y SAP para piezas y órdenes; SAP QM para el bloqueo; Maximo para la OT; SAP PP para pasar la OF a MC-02.',
        waiting: (H) => [
          `Las ${H.sc.elseTotal} culatas del mismo lote mecanizadas antes de las 03:40 quedan «a evaluar»: muestreo, no bloqueo. Todavía no se ha escrito nada en SAP QM, Maximo ni SAP PP.`,
          'Se puede editar el alcance (quitar un contenedor, con motivo) o rechazar: si se rechaza, no se aplica nada y queda en auditoría.'
        ],
        rejected: ['Rechazado: no se ha bloqueado nada, no hay OT ni cambio de planificación. El motivo queda en el registro de auditoría.', 'La decisión es siempre de Mantenimiento; se puede volver a ejecutar cuando se quiera.'],
        done: (H) => [
          `Aplicado tras la aprobación: ${H.ids.blq} en SAP QM con ${H.sc.count} culatas, ${H.ids.ot} en Maximo, la OF 4100872 en MC-02 y ${H.ids.nc} con el 8D en borrador.`,
          'El informe de incidencia sale como documento controlado: código, revisión, aprobaciones y registro de la ejecución, listo para una auditoría ISO 9001.'
        ],
        next: { done: 'Abrir «Descargar informe de incidencia» y después pasar a la reclamación (flecha derecha).', no_trigger: 'Ir a «De palabras a workflow», dejar 30 min y volver a ejecutar.' }
      }
    }
  });

  /* 8D propuesto por el agente de Calidad. */
  function A8D(H) {
    const sc = H.sc;
    return [
      { d: 'D1', t: 'Equipo', text: `Líder: ${ROLE.quality}. Equipo: ${ROLE.maintenance}, ${ROLE.production}, ${ROLE.quality_shift} y el programador CNC de mecanizado.`, owner: ROLE.quality, due: '2026-09-29' },
      { d: 'D2', t: 'Descripción del problema', text: `El 29/09/2026 la vibración del husillo de MC-04 superó 4,5 mm/s durante ${H.C.above} min (${H.span}), con un pico de 8,4 mm/s a las 05:32 y ${H.critMin} min por encima de ${H.fv(H.crit)}. Se mecanizaron ${H.all.count} culatas CUL-250 del lote CUL-2609-118 (OF 4100872). El aviso de las 03:40 se reconoció en el HMI sin parar la máquina.`, owner: ROLE.quality, due: '2026-09-29' },
      { d: 'D3', t: 'Contención', text: `${H.ids.blq}: ${sc.count} culatas bloqueadas en SAP QM y ${sc.holds.length} órdenes y envíos retenidos. Medición 100 % en CMM-01. MC-04 parada con ${H.ids.ot}; OF 4100872 en MC-02.`, owner: ROLE.quality_shift, due: '2026-09-29' },
      { d: 'D4', t: 'Causa raíz (hipótesis)', text: 'Rodamiento delantero del husillo con defecto de pista exterior (BPFO) y posible desequilibrio tras el cambio de la fresa T12. Causa de no detección: el aviso de nivel 1 no obliga a parar en el turno de noche.', owner: ROLE.maintenance, due: '2026-10-01' },
      { d: 'D5', t: 'Acciones correctivas propuestas', text: 'Sustituir los rodamientos del husillo y verificar el equilibrado de la T12; convertir el aviso de nivel 1 sostenido 30 min en parada de avance automática.', owner: ROLE.maintenance, due: '2026-10-06' },
      { d: 'D6', t: 'Implantación y verificación', text: 'Medir la vibración tras la reparación (objetivo < 2,8 mm/s, zona B) y verificar 5 culatas de prueba en la CMM antes de liberar la máquina.', owner: ROLE.maintenance, due: '2026-10-08' },
      { d: 'D7', t: 'Prevención', text: 'Extender la parada automática por vibración a MC-01, MC-02 y MC-03 y actualizar PR-MAN-011 e IT-MEC-021 (cambio de husillo).', owner: ROLE.quality, due: '2026-10-16' },
      { d: 'D8', t: 'Cierre', text: `Cerrar ${H.ids.nc} tras verificar la eficacia y registrar el destino de las ${sc.count} culatas por número de serie.`, owner: ROLE.quality, due: '2026-10-30' }
    ];
  }
})();
