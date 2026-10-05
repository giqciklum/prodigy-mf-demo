/* Cervecera Bardenas · alarma con aprobación: temperatura del fermentador FV-12 fuera de consigna.
 * Empresa ficticia; datos sintéticos de demostración (MFM). Las funciones reciben el contexto H de la escena
 * (W workflow, C condición evaluada, sc alcance vigente, ids generados al aprobar, fmt, fv, pl…). */
(function () {
  'use strict';

  /* Temperatura del mosto en fermentación (sonda TT-FV12-02, zona central), cada 10 min. */
  const KEY = [['01:00', 12.0], ['01:30', 12.1], ['02:00', 12.2], ['02:20', 13.1], ['02:30', 13.8], ['03:00', 14.6], ['03:30', 15.0], ['03:40', 15.1], ['04:30', 16.4], ['05:10', 17.0], ['05:20', 17.1], ['05:30', 17.0], ['05:50', 16.8], ['06:30', 16.6], ['07:00', 16.5]];
  const mins = (t) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
  const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  const SERIES = [];
  for (let m = mins('01:00'); m <= mins('07:00'); m += 10) {
    const i = KEY.findIndex((k) => mins(k[0]) >= m);
    const b = KEY[i];
    const a = KEY[Math.max(0, i - 1)];
    const v = mins(b[0]) === m || i === 0 ? b[1] : a[1] + (b[1] - a[1]) * (m - mins(a[0])) / (mins(b[0]) - mins(a[0]));
    SERIES.push({ time: hhmm(m), value: Math.round(v * 10) / 10 });
  }

  /* Partidas del lote en FV-12: los 4 cocimientos que lo llenaron y la levadura a recuperar del cono. */
  const UNITS = [
    { item: 'L2609-FV12', part: 'C-2609-41', date: '26/09/2026 06:10', hl: 120, op: '11,6', malt: 'MAL-2609-02', hop: 'LUP-2606-11' },
    { item: 'L2609-FV12', part: 'C-2609-42', date: '26/09/2026 09:40', hl: 120, op: '11,5', malt: 'MAL-2609-02', hop: 'LUP-2606-11' },
    { item: 'L2609-FV12', part: 'C-2609-43', date: '26/09/2026 13:15', hl: 120, op: '11,6', malt: 'MAL-2609-02', hop: 'LUP-2606-11' },
    { item: 'L2609-FV12', part: 'C-2609-44', date: '26/09/2026 16:50', hl: 120, op: '11,5', malt: 'MAL-2609-03', hop: 'LUP-2606-11' },
    { item: 'LEV-2609-12', part: 'W-34/70 · generación 5', date: '26/09/2026 06:30', hl: 14, op: '—', malt: '—', hop: '—' }
  ];

  const ROLE = {
    brewmaster: 'Maestro cervecero', quality: 'Responsable de Calidad', quality_shift: 'Técnico de Calidad de turno',
    maintenance: 'Jefe de mantenimiento', production: 'Jefa de producción', cellar: 'Encargado de bodega'
  };
  const TEAMS = 'Bodega · Arguedas';

  agenticPack('cerveceria', {
    alarma: {
      nav: 'Alarma FV-12',
      title: 'Alarma FV-12 en ejecución',
      icon: 'thermometer',
      page_title: 'Fermentador FV-12 · temperatura fuera de consigna',
      alarm_id: 'ALM-FV12-0550',
      alarm_time: '05:50',
      source_system: 'SCADA bodega',
      asset: 'FV-12',
      location: 'Fábrica de Arguedas · bodega de fermentación',
      excursion_noun: 'excursión',
      workflow_topic: 'control de fermentación',
      policy_ref: 'PR-FER-003',
      procedures: 'PR-FER-003 · APPCC-01 · PR-CAL-006',
      decider_short: 'Maestro cervecero',
      decider_of: 'del Maestro cervecero',
      approval_node: 'Aprobación del Maestro cervecero',
      measure: { short: 'temperatura del mosto', col: 'Temperatura', unit: '°C', dec: 1, icon: 'thermometer' },
      setpoint: 12,
      setpoint_label: 'consigna',
      limit: 13.5,
      critical: 15,
      min_minutes: 120,
      interval_min: 10,
      series: SERIES,
      peak: 17.1,
      peak_time: '05:20',
      current: 16.5,
      current_time: '07:00',
      current_note: 'válvula de glicol VG-12 sin abrir',
      chart: {
        title: 'Fermentador FV-12 · temperatura del mosto',
        sub: 'Consigna 12 °C · ahora 16,5 °C (07:00)',
        tab: 'Temperatura',
        series_label: 'Mosto, zona central (TT-FV12-02)',
        yTicks: [10, 12, 14, 16, 18],
        xTicks: ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00']
      },
      event_kv: [
        ['Fermentador', 'FV-12 · cilindrocónico de 600 hl · bodega 2'],
        ['Lote', 'L2609-FV12 · Bardenas Lager · 480 hl · día 3 de fermentación'],
        ['Sonda', 'TT-FV12-02 · zona central · lectura cada 10 min'],
        ['Equipos', 'Válvula de glicol VG-12 · camisas superior e inferior · circuito de glicol B']
      ],
      events: [
        { time: '02:20', end: '07:00', text: 'La válvula de glicol VG-12 no abre: posición 0 % con demanda del 100 %', equipment: 'VG-12', tone: 'warn', band: 'Válvula VG-12 sin abrir', bandTone: 'warn' },
        { time: '02:30', text: 'Supera 13,5 °C: aviso en SCADA bodega; el operario de noche está en el CIP de la línea de barriles', ref: 'AV-FV12-0230', tone: 'warn' },
        { time: '03:40', text: 'Supera 15 °C, límite crítico de PR-FER-003 (riesgo de diacetilo, acetaldehído y ésteres fuera de perfil)', ref: 'PR-FER-003', tone: 'crit' },
        { time: '05:20', text: 'Pico de 17,1 °C en plena fermentación tumultuosa', equipment: 'TT-FV12-02', tone: 'crit' },
        { time: '05:50', text: 'Alarma ALM-FV12-0550: 2 h 10 min seguidas por encima de 15 °C', ref: 'ALM-FV12-0550', tone: 'crit' },
        { time: '06:10', text: 'El operario confirma la válvula VG-12 bloqueada; el resto del circuito B funciona', equipment: 'Circuito de glicol B', tone: 'brand' }
      ],
      probable_cause: 'Válvula de glicol VG-12 bloqueada en cerrado (el actuador neumático no responde desde las 02:20): sin refrigeración de las camisas, el calor de la fermentación tumultuosa del día 3 sube la temperatura del mosto. El circuito de glicol B y el resto de fermentadores funcionan con normalidad. A confirmar por Mantenimiento.',
      backup: { id: 'wf-fermentacion-respaldo', name: 'Temperatura de fermentación fuera de consigna', version: 'v1', threshold: 13.5, minutes: 120, critical: 15, approver: ROLE.brewmaster },
      untouched: 'Brewmaxx, SAP, LIMS, Maximo ni Teams',
      apply_systems: 'SAP QM, LIMS, Maximo, Brewmaxx y Teams',
      llm_cost_usd: 0.05,
      ids: [
        { key: 'ret', prefix: 'RET-2026-', start: 77, label: 'Retención de calidad' },
        { key: 'mu', prefix: 'MU-2609-', start: 1188, label: 'Muestra LIMS' },
        { key: 'ot', prefix: 'OT-2026-', start: 31544, label: 'Orden de trabajo' },
        { key: 'nc', prefix: 'DES-2026-', start: 41, label: 'Desviación de proceso' }
      ],
      block_id_key: 'ret',
      proposer: 'cal',
      lanes: [
        { id: 'mon', name: 'Monitor de bodega', short: 'Monitor', icon: 'thermometer', systems: ['SCADA bodega'], idle: 'Confirma la excursión con las lecturas de la sonda', gsub: 'confirma la excursión', gsys: ['SCADA bodega'] },
        { id: 'traz', name: 'Trazabilidad de lote', short: 'Trazabilidad', icon: 'git-branch', systems: ['Brewmaxx (MES)', 'SAP S/4HANA'], idle: 'Localiza lote, cocimientos y operaciones previstas', gsub: 'lote, cocimientos y planes', gsys: ['Brewmaxx', 'SAP'] },
        { id: 'cal', phase: 2, name: 'Calidad', icon: 'flask', systems: ['SAP QM', 'LIMS LabWare'], idle: 'Prepara la retención y pide la aprobación', gsub: 'retención y análisis LIMS', gsys: ['SAP QM', 'LIMS'] },
        { id: 'man', phase: 2, name: 'Mantenimiento', icon: 'wrench', systems: ['GMAO Maximo', 'Microsoft Teams'], idle: 'Abre la OT de la válvula VG-12', gsub: 'OT de la válvula VG-12', gsys: ['Maximo', 'Teams'] },
        { id: 'pro', phase: 2, name: 'Producción', icon: 'calendar', systems: ['Brewmaxx (MES)', 'SAP S/4HANA'], idle: 'Reprograma el trasiego y la siembra', gsub: 'reprograma trasiego y siembra', gsys: ['Brewmaxx', 'SAP'] }
      ],
      steps: {
        p1: (H) => {
          const a = H.all;
          return [
            { lane: 'mon', system: 'SCADA bodega', verb: 'Consultando', action: 'Lee la sonda TT-FV12-02 de 01:00 a 07:00, una lectura cada 10 min', result: `${SERIES.length} lecturas, sin huecos · ahora 16,5 °C (07:00)`, ms: 1800, set: { volume: `${SERIES.length} lecturas de temperatura` } },
            { lane: 'mon', system: 'Agentic Platform', eval: true, ms: 90 },
            { lane: 'mon', system: 'SCADA bodega', verb: 'Consultando', action: 'Cruza la excursión con la posición de la válvula VG-12 y el circuito de glicol B', result: 'VG-12 al 0 % con demanda del 100 % desde las 02:20; circuito B a −4 °C: hipótesis para Mantenimiento', tone: 'warn', ms: 1400, set: { volume: `${SERIES.length} lecturas · válvula y circuito`, result: `Excursión confirmada: ${H.C.above} min por encima · pico 17,1 °C` } },
            { lane: 'traz', system: 'Brewmaxx (MES)', verb: 'Consultando', action: 'Identifica el lote y los cocimientos que llenaron FV-12', result: `L2609-FV12 · Bardenas Lager · 4 cocimientos (C-2609-41 a 44) · ${H.pl(480)}`, ms: 2000, set: { volume: '1 lote · 4 cocimientos' } },
            { lane: 'traz', system: 'SAP S/4HANA', verb: 'Consultando', action: 'Resuelve materias primas, levadura y coste del lote', result: `Malta MAL-2609-02/03, lúpulo LUP-2606-11, levadura W-34/70 de 5.ª generación · ${H.fmt.eur(a.value)} a coste estándar`, ms: 2400, set: { volume: `${H.pl(a.count)} · ${a.items.length} partidas` }, reveal: 'lots' },
            { lane: 'traz', system: 'SCADA bodega', verb: 'Consultando', action: 'Revisa los fermentadores del mismo circuito de glicol', result: `FV-11 y FV-14 (${H.pl(a.elseTotal)}) en consigna: a vigilar, sin retención`, ms: 1600, reveal: 'map' },
            { lane: 'traz', system: 'Brewmaxx (MES)', verb: 'Consultando', action: 'Consulta las operaciones planificadas que dependen de FV-12', result: `${a.holds.length} operaciones; la primera, ${H.first.id}, ${H.holdWhen(H.first).includes('/') ? 'el' : 'a las'} ${H.holdWhen(H.first)}`, tone: 'warn', ms: 1900, set: { volume: `${H.pl(a.count)} · ${a.holds.length} operaciones`, result: `Primera operación afectada: ${H.first.id}` }, milestone: 'traz', audit: { action: 'Lote y operaciones identificados', detail: `L2609-FV12 (480 hl) y levadura LEV-2609-12 (14 hl) · ${a.holds.length} operaciones planificadas · FV-11 y FV-14 a vigilar` } },
            { lane: 'cal', node: 'apr', system: 'Procedimientos', verb: 'Analizando', action: 'Aplica PR-FER-003 y APPCC-01 a esta excursión', result: 'Retener el lote, analizar diacetilo (VDK), acetaldehído y ésteres en LIMS y no reutilizar la levadura; decide el Maestro cervecero', ms: 1300 },
            { lane: 'cal', node: 'apr', system: 'Modelo de lenguaje', verb: 'Redactando', action: 'Redacta la propuesta y su motivo con las evidencias', result: `Propuesta: retener ${H.pl(a.count)} en ${a.items.length} partidas, muestra urgente a LIMS, OT de la válvula y reprogramar ${a.holds.length} operaciones`, ms: 6500, set: { volume: `${H.pl(a.count)} · ${a.holds.length} operaciones` } },
            { lane: 'cal', node: 'apr', system: 'Agentic Platform', verb: 'Evaluando', action: `Pide la aprobación del ${H.W.approver} antes de escribir en SAP QM, LIMS, Maximo y Brewmaxx`, result: 'Esperando la decisión del Maestro cervecero', tone: 'warn', ms: 60, wait: 1500, set: { result: 'Propuesta enviada al Maestro cervecero' }, milestone: 'prop', audit: { action: 'Propuesta de retención enviada a aprobación', detail: `L2609-FV12 y LEV-2609-12 · ${H.pl(a.count)} · aprueba ${H.W.approver}` } }
          ];
        },
        p2: (H) => {
          const sc = H.sc;
          const ids = H.ids;
          return [
            { lane: 'cal', system: 'SAP QM', verb: 'Aplicando', action: `Registra la retención de calidad de ${fmtList(sc)}`, result: `${ids.ret} · ${H.pl(sc.count)} en estado «retenido»`, tone: 'ok', ms: 2100, milestone: 'ret', audit: { action: 'Retención de calidad aplicada', detail: `${ids.ret} · SAP QM · ${fmtList(sc)} · ${H.pl(sc.count)}` } },
            { lane: 'cal', system: 'LIMS LabWare', verb: 'Aplicando', action: 'Crea la muestra urgente: diacetilo (VDK), acetaldehído, ésteres, extracto aparente y pH', result: `${ids.mu} · toma a las 07:30 · resultados antes de las 12:00`, tone: 'ok', ms: 1800, set: { result: `${ids.ret} aplicada · ${ids.mu} en laboratorio` }, milestone: 'mu', audit: { action: 'Muestra urgente creada en LIMS', detail: `${ids.mu} · LIMS LabWare · VDK, acetaldehído, ésteres, extracto y pH` } },
            { lane: 'man', system: 'GMAO Maximo', verb: 'Aplicando', action: 'Abre la OT correctiva de la válvula VG-12 con prioridad 1', result: `${ids.ot} · revisar actuador y posicionador; refrigeración provisional por el bypass manual`, tone: 'ok', ms: 1900, set: { volume: '1 OT de prioridad 1' }, milestone: 'ot', audit: { action: 'Orden de trabajo abierta', detail: `${ids.ot} · GMAO Maximo · válvula de glicol VG-12 · prioridad 1` } },
            { lane: 'pro', system: 'Brewmaxx (MES)', verb: 'Aplicando', action: `Reprograma ${sc.holds.length} operaciones planificadas`, result: `${sc.holds.map((h) => h.id).join(', ')} en espera de la decisión del Maestro cervecero`, tone: 'ok', ms: 2000, set: { volume: `${sc.holds.length} operaciones reprogramadas` }, milestone: 'pro', audit: { action: 'Operaciones reprogramadas', detail: `Brewmaxx · ${sc.holds.map((h) => h.id).join(', ')}` } },
            { lane: 'pro', system: 'SAP S/4HANA', verb: 'Aplicando', action: 'Asigna levadura propagada del tanque YT-02 a la siembra de FV-16', result: 'Siembra de FV-16 a las 14:00 sin retraso, con levadura de 1.ª generación', tone: 'ok', ms: 1600, set: { volume: `${sc.holds.length} operaciones · 1 siembra reasignada`, result: 'Siembra de FV-16 sin retraso' } },
            { lane: 'cal', system: 'SAP QM', verb: 'Aplicando', action: 'Abre la desviación de proceso con la curva, la válvula y el lote', result: `${ids.nc} abierta (PR-FER-003)`, tone: 'ok', ms: 1500, set: { volume: '1 desviación' }, milestone: 'nc', audit: { action: 'Desviación de proceso abierta', detail: `${ids.nc} · SAP QM · temperatura de FV-12 fuera de consigna` } },
            { lane: 'cal', system: 'Modelo de lenguaje', verb: 'Redactando', action: 'Redacta el plan de evaluación del lote (análisis, cata y criterios de decisión)', result: 'Plan de evaluación listo para la revisión del Maestro cervecero', ms: 7100, set: { volume: '1 desviación · plan en borrador' }, milestone: 'plan', audit: { action: 'Plan de evaluación redactado', detail: `${ids.nc} · pendiente de revisión del Maestro cervecero` } },
            { lane: 'man', system: 'Microsoft Teams', verb: 'Enviando', action: `Avisa al ${ROLE.cellar}, a la ${ROLE.production} y al técnico de mantenimiento`, result: `Aviso publicado en el canal «${TEAMS}»`, tone: 'ok', ms: 900, wait: 1600, set: { volume: '1 OT · 1 aviso', result: `${ids.ot} abierta · bodega avisada` }, milestone: 'teams', audit: { action: 'Aviso enviado por Microsoft Teams', detail: `${ROLE.cellar}, ${ROLE.production} y mantenimiento · canal «${TEAMS}»` } }
          ];
        }
      },
      kpis: (H, held) => [
        { label: 'Volumen en FV-12 fuera de consigna', value: '480 hl', sub: 'L2609-FV12 · Bardenas Lager · día 3 · más 14 hl de levadura', icon: 'droplet' },
        { label: 'Primera operación afectada', value: H.first.time, sub: `${H.first.id} · ${H.first.where}${held ? ' · reprogramada' : ''}`, icon: 'calendar' }
      ],
      scope: {
        icon: 'droplet',
        unit: ['hl', 'hl'],
        item_noun: ['partida', 'partidas'],
        qty_unit: null,
        per_square: 40,
        items: [
          {
            id: 'L2609-FV12', trace: 'L2609-FV12', title: 'Bardenas Lager · mosto en fermentación', sub: 'día 3 · cocimientos C-2609-41 a 44', group: 'FV-12 · bodega 2', group_short: 'FV-12', count: 480, value: 27840, hold: 'TRS-2610-03',
            elsewhere: [
              { loc: 'FV-11', count: 480, note: 'L2609-FV11 · 12,1 °C · mismo circuito de glicol' },
              { loc: 'FV-14', count: 360, note: 'L2609-FV14 · 12,0 °C · mismo circuito de glicol' }
            ]
          },
          { id: 'LEV-2609-12', title: 'Levadura W-34/70 de cosecha (5.ª generación)', sub: 'a recuperar del cono de FV-12', group: 'Cono de FV-12', group_short: 'Cono', count: 14, value: 1680, hold: 'SIE-0929-FV16' }
        ],
        holds: {
          'SIE-0929-FV16': { date: '2026-09-29', time: '14:00', where: 'Siembra de FV-16 · Bardenas Lager', label: 'Siembra' },
          'TRS-2610-03': { date: '2026-10-03', time: '06:00', where: 'Trasiego a guarda TG-07', label: 'Trasiego' }
        },
        units: UNITS,
        csv_name: 'lote-l2609-fv12-excursion',
        csv_cols: [
          { label: 'Partida', key: 'item' },
          { label: 'Cocimiento o cosecha', key: 'part' },
          { label: 'Fecha', key: 'date' },
          { label: 'hl', key: 'hl' },
          { label: 'Extracto original (°P)', key: 'op' },
          { label: 'Lote de malta', key: 'malt' },
          { label: 'Lote de lúpulo', key: 'hop' }
        ],
        labels: {
          items_title: 'Lote y operaciones afectados',
          items_systems: 'Brewmaxx y SAP S/4HANA',
          items_where: 'fermentador FV-12,',
          item_col: 'Partida',
          at_col: 'Volumen',
          group_col: 'Ubicación',
          hold_col: 'Operación planificada',
          else_col: 'Mismo circuito',
          else_none: '—',
          gone_verb: 'trasegados',
          exposed: 'Fuera de consigna',
          blocked: 'Retenido',
          unblocked: 'Sin retención',
          block_noun: 'retención',
          block_verb: 'Retener',
          hold_verb: 'Reprogramar',
          held: 'Reprogramadas',
          holds_label: 'Operaciones planificadas',
          holds_first: 'la primera',
          scope_main: 'Lote y levadura de FV-12 durante la excursión',
          else_scope: 'Fermentadores del mismo circuito de glicol',
          else_decision: 'Vigilar',
          map_title: 'Ubicación en bodega',
          map_sub: 'SCADA bodega · bodega 2',
          zone_title: 'FV-12 · lote y levadura',
          zone_sub: '2 partidas',
          else_title: 'Fermentadores del mismo circuito de glicol',
          else_sub: 'en consigna · a vigilar',
          gone_title: 'Trasegados antes de la alarma',
          legend_exposed: 'Fuera de consigna',
          legend_else: 'A vigilar',
          csv_button: 'Descargar cocimientos (CSV)',
          value_label: 'a coste estándar',
          report_scope: 'Alcance de la retención'
        }
      },
      text: {
        proposal_title: 'propuesta de retención del lote',
        stop_without: 'proponer retención',
        activates: 'la retención del lote',
        no_proposal: 'sin propuesta de retención',
        idle_log: 'La ejecución se detiene en la aprobación: nada se escribe en SAP QM, LIMS, Maximo ni Brewmaxx sin la decisión del Maestro cervecero.',
        approve_action: 'Aprueba la retención y la evaluación del lote',
        scope_short: (H) => `retener ${H.pl(H.sc.count)} (${fmtList(H.sc)}), analizar en LIMS, reparar la válvula y reprogramar ${H.fmt.plural(H.sc.holds.length, 'operación', 'operaciones')}`,
        audit_approved: 'Retención del lote aprobada',
        audit_approved_detail: (H) => `${H.ids.ret} · ${fmtList(H.sc)} · ${H.pl(H.sc.count)} · ${H.sc.holds.length} operaciones reprogramadas${H.sc.out.length ? ` · alcance editado (sin ${H.sc.out.map((l) => l.id).join(', ')})` : ''}`,
        outcome_approved: (H) => `Retención ${H.ids.ret} aprobada · ${fmtList(H.sc)}`,
        audit_rejected: 'Retención del lote rechazada',
        outcome_rejected: 'Retención rechazada · sin acciones aplicadas',
        toast_done: (H) => `${H.ids.ret} aplicada · ${H.ids.mu} en LIMS · ${H.ids.ot} abierta`,
        presenter_applying: 'Tras la aprobación: retención en SAP QM, muestra urgente en LIMS, OT de la válvula en Maximo, reprogramación en Brewmaxx y aviso por Teams.',
        reject_nothing: 'ni retención en SAP QM, ni muestra en LIMS, ni OT en Maximo, ni cambios en Brewmaxx',
        edit_intro: 'PR-FER-003 pide retener el lote y no reutilizar la levadura de un fermentador fuera de consigna.'
      },
      approval: {
        id: 'ret-fv12',
        approve_label: 'Aprobar retención',
        policy: 'PR-FER-003 · APPCC-01 · decide el Maestro cervecero',
        title: (H) => `Retención de ${fmtList(H.sc)} · ${H.pl(H.sc.count)}`,
        summary: (H) => `Motivo: mosto de FV-12 por encima de ${H.fv(H.C.threshold)} durante ${H.C.above} min (${H.span}), más de los ${H.C.minutes} min que fija ${H.W.backup ? 'PR-FER-003' : 'el workflow'}${H.critMin ? `, y ${H.critMin} min por encima de ${H.fv(H.crit)}: riesgo de diacetilo y acetaldehído fuera de perfil` : ''}. Se retiene el lote hasta los análisis de LIMS y la cata, y no se reutiliza su levadura.`,
        effects: (H) => [
          `SAP QM: retención de ${fmtList(H.sc)} (${H.pl(H.sc.count)})`,
          'LIMS LabWare: muestra urgente de VDK, acetaldehído, ésteres, extracto y pH',
          'GMAO Maximo: OT de prioridad 1 de la válvula VG-12',
          `Brewmaxx: ${H.fmt.plural(H.sc.holds.length, 'operación reprogramada', 'operaciones reprogramadas')}`,
          `Microsoft Teams: aviso al ${ROLE.cellar}, a la ${ROLE.production} y a mantenimiento`
        ],
        applied: (H) => [
          `SAP QM: ${H.ids.ret} · ${H.pl(H.sc.count)} retenidos · ${H.ids.nc} con plan de evaluación`,
          `LIMS LabWare: ${H.ids.mu} · resultados antes de las 12:00`,
          `GMAO Maximo: ${H.ids.ot} · prioridad 1`,
          `Brewmaxx: ${H.sc.holds.map((h) => h.id).join(', ')} reprogramados`,
          `Microsoft Teams: aviso en «${TEAMS}»`
        ]
      },
      result: {
        title: (H) => `Retención ${H.ids.ret} aplicada, ${H.ids.mu} en LIMS y ${H.ids.ot} abierta`,
        stats: (H) => [
          { label: 'Hectolitros retenidos', value: H.sc.count, tone: 'crit' },
          { label: 'Operaciones reprogramadas', value: H.sc.holds.length },
          { label: 'Análisis urgentes en LIMS', value: 5 },
          { label: 'Hectolitros a vigilar', value: H.sc.elseTotal, tone: 'warn' }
        ],
        tiles: (H) => [
          {
            icon: 'lock', tone: 'crit', title: `Retención ${H.ids.ret}`, systems: ['SAP QM', 'LIMS LabWare'],
            kv: [
              ['Estado', App.chip('blocked', 'Retenido')],
              ['Alcance', `${fmtList(H.sc)} · ${H.pl(H.sc.count)}`],
              ['Valor a coste estándar', H.fmt.eur(H.sc.value)],
              ['Muestra', `${H.ids.mu} · VDK, acetaldehído, ésteres, extracto y pH`],
              ['Decide', `${ROLE.brewmaster} (PR-FER-003)`]
            ],
            next: 'Siguiente paso según PR-FER-003: con los resultados de LIMS, decidir entre reposo de diacetilo prolongado, mezcla controlada o descarte del lote.',
            buttons: [{ action: 'csv', label: 'Cocimientos retenidos (CSV)' }]
          },
          {
            icon: 'wrench', title: `OT ${H.ids.ot} y reprogramación`, systems: ['GMAO Maximo', 'Brewmaxx (MES)'], chip: ['running', 'Prioridad 1'],
            kv: [
              ['Equipo', 'Válvula de glicol VG-12 · actuador y posicionador'],
              ['Provisional', 'Refrigeración por el bypass manual, vigilada cada 30 min'],
              ['Reprogramado', H.sc.holds.map((h) => `${h.id} (${H.holdWhen(h)})`).join(', ')],
              ['Siembra de FV-16', 'Con levadura propagada de YT-02, sin retraso'],
              ['Responsable', ROLE.maintenance]
            ],
            next: 'FV-12 vuelve a control automático cuando la válvula responda en la prueba de apertura y cierre.'
          },
          {
            icon: 'clipboard', title: `Plan de evaluación · ${H.ids.nc}`, systems: ['SAP QM', 'LIMS LabWare'], chip: ['draft', 'Borrador'],
            items: PLAN(H),
            buttons: [{ action: 'report-doc', icon: 'printer', label: 'Descargar plan de evaluación (PDF)' }]
          },
          {
            icon: 'send', title: 'Aviso a bodega', systems: ['Microsoft Teams'], note: H.run.endAt ? `enviado a las ${H.fmt.time(H.run.endAt)}` : '',
            message: {
              from: 'Agentic Platform · agente Mantenimiento', channel: `canal «${TEAMS}»`, at: H.run.endAt ? H.fmt.time(H.run.endAt) : '',
              paras: [
                { to: ROLE.cellar, text: `Retención ${H.ids.ret} de FV-12 aprobada por el ${H.decision.by}. Mantener la refrigeración por el bypass y no recuperar la levadura del cono. Muestra ${H.ids.mu} a las 07:30.` },
                { to: 'Mantenimiento', text: `${H.ids.ot}: válvula de glicol VG-12 sin abrir desde las 02:20 (actuador sin respuesta).` },
                { to: ROLE.production, text: `Reprogramado: ${H.sc.holds.map((h) => `${h.id} (${H.holdWhen(h)})`).join(', ')}. La siembra de FV-16 sale con levadura de YT-02. Detalle en ${H.ids.nc}.` }
              ]
            }
          }
        ]
      },
      doc: {
        code: 'REG-FER-003-09',
        lane: 'cal',
        heading: 'Plan de evaluación del lote',
        col_d: 'Paso',
        title: (H) => `Plan de evaluación · ${H.ids.nc}`,
        subtitle: 'Desviación de temperatura en el fermentador FV-12 (L2609-FV12) · borrador para revisión',
        filename: (H) => `plan-evaluacion-${H.ids.nc}`,
        meta: (H) => [['Desviación', H.ids.nc], ['Retención', H.ids.ret], ['Muestra LIMS', H.ids.mu]],
        items: (H) => PLAN(H),
        reviewer: ROLE.brewmaster,
        approver: ROLE.quality,
        note: 'Borrador generado a partir de las evidencias de la ejecución. Los criterios de decisión siguen PR-FER-003; el destino del lote lo decide el Maestro cervecero con los resultados de LIMS y la cata.'
      },
      report: {
        noun: 'informe de desviación',
        code: 'REG-FER-003-08',
        title: 'Informe de desviación · fermentador FV-12',
        subtitle: 'Temperatura de fermentación fuera de consigna',
        filename: 'informe-desviacion-fv12',
        site_label: 'Fábrica',
        site: 'Fábrica de Arguedas',
        description: (H) => `El 29/09/2026 a las 05:50 SCADA bodega emitió la alarma ALM-FV12-0550 en el fermentador FV-12 (Bardenas Lager, lote L2609-FV12, 480 hl, día 3 de fermentación, consigna 12 °C). La temperatura del mosto (sonda TT-FV12-02) estuvo ${H.C.above} min por encima de ${H.fv(H.C.threshold)} (${H.span}), con un pico de 17,1 °C a las 05:20 y ${H.critMin} min por encima de ${H.fv(H.crit)}. La causa inmediata es la válvula de glicol VG-12, que no abre desde las 02:20.`,
        criteria: 'PR-FER-003 (retención del lote y análisis de diacetilo y acetaldehído si el mosto supera 13,5 °C durante más de 2 h; no reutilizar la levadura) y APPCC-01 (registro de la desviación; el destino del producto lo decide el Maestro cervecero con Calidad).',
        actions: (H) => [
          `SAP QM · ${H.ids.ret}: retención de ${fmtList(H.sc)} (${H.pl(H.sc.count)}; ${H.fmt.eur(H.sc.value)} a coste estándar).`,
          `LIMS LabWare · ${H.ids.mu}: muestra urgente de VDK, acetaldehído, ésteres, extracto aparente y pH.`,
          `GMAO Maximo · ${H.ids.ot}: OT de prioridad 1 de la válvula VG-12; refrigeración provisional por bypass.`,
          `Brewmaxx: reprogramados ${H.sc.holds.map((h) => `${h.id} (${H.holdWhen(h)}, ${h.where})`).join(', ')}; siembra de FV-16 con levadura de YT-02.`,
          `SAP QM · ${H.ids.nc}: desviación de proceso con plan de evaluación en borrador (REG-FER-003-09).`,
          `Microsoft Teams: aviso al ${ROLE.cellar}, a la ${ROLE.production} y a mantenimiento en «${TEAMS}».`
        ],
        pending: () => [
          'Recibir los resultados de LIMS (antes de las 12:00) y hacer la cata triangular con el panel.',
          'Si el diacetilo supera 0,10 mg/l, prolongar el reposo a 14 °C y repetir el análisis cada 24 h.',
          'Vigilar FV-11 y FV-14 (mismo circuito de glicol B) cada 30 min hasta cerrar la OT.',
          `Destino del lote: solo el ${ROLE.brewmaster} con ${ROLE.quality} (PR-FER-003).`
        ],
        reviewer: ROLE.quality,
        final_step: 'Destino del lote',
        final_role: ROLE.brewmaster,
        note: 'Documento sujeto a la revisión de Calidad; no sustituye la decisión de destino del lote.'
      },
      not_applied: (H) => [
        { sys: 'SAP QM', text: 'Sin retención ni desviación de proceso' },
        { sys: 'LIMS LabWare', text: 'Sin muestra urgente; solo la muestra diaria de las 08:00' },
        { sys: 'GMAO Maximo', text: 'Sin orden de trabajo de la válvula' },
        { sys: 'Brewmaxx (MES)', text: `Las ${H.all.holds.length} operaciones siguen planificadas, incluida la siembra con levadura de FV-12` },
        { sys: 'Microsoft Teams', text: 'Sin aviso a bodega' }
      ],
      compare: [
        { k: 'Personas que intervienen', today: '3–4: operario de bodega, Maestro cervecero, Calidad y Mantenimiento', now: 'El Maestro cervecero revisa y decide; Calidad, Mantenimiento y Producción reciben el resultado' },
        { k: 'Sistemas que se consultan a mano', today: '5–6: SCADA, Brewmaxx, SAP, LIMS, Maximo y teléfono', now: 'Ninguno: los agentes consultan 6 sistemas y cada dato queda en el registro' },
        { k: 'Pasos', today: '10–12 pasos manuales, con esperas hasta el turno de mañana', steps: true },
        { k: 'Tiempo hasta retener, analizar y reparar', today: '2–4 h (esta noche, más de 3 h fuera de consigna sin actuar)', measured: true },
        { k: 'Evidencia para la auditoría', today: 'Repartida entre el SCADA, el cuaderno de bodega y correos', now: 'Informe REG-FER-003-08, plan de evaluación y registro de auditoría de la ejecución' }
      ],
      presenter: {
        intro: () => 'Alarma de las 05:50 en el fermentador FV-12: el mosto de Bardenas Lager está a 16,8 °C con consigna de 12 °C desde las 02:30, con pico de 17,1 a las 05:20. Son 480 hl en el día 3; la levadura de este tanque iba a sembrar FV-16 a las 14:00.',
        agents: 'Cinco agentes, cada uno con su sistema: SCADA para la temperatura y la válvula; Brewmaxx y SAP para lote y planes; SAP QM y LIMS para la retención y los análisis; Maximo para la OT; Brewmaxx para reprogramar.',
        waiting: (H) => [
          `FV-11 y FV-14 (${H.pl(H.sc.elseTotal)}) comparten circuito de glicol pero están en consigna: se vigilan, no se retienen. Todavía no se ha escrito nada en SAP QM, LIMS ni Brewmaxx.`,
          'Se puede editar el alcance (por ejemplo, dejar fuera la levadura, con motivo) o rechazar: si se rechaza, no se aplica nada y queda en auditoría.'
        ],
        rejected: ['Rechazado: no hay retención, ni muestra urgente, ni OT, ni reprogramación. El motivo queda en el registro de auditoría.', 'La decisión es siempre del Maestro cervecero; se puede volver a ejecutar cuando se quiera.'],
        done: (H) => [
          `Aplicado tras la aprobación: ${H.ids.ret} en SAP QM, ${H.ids.mu} urgente en LIMS, ${H.ids.ot} de la válvula en Maximo y ${H.sc.holds.length} operaciones reprogramadas, con el plan de evaluación en borrador.`,
          'El informe de desviación sale como documento controlado, con aprobaciones y registro de la ejecución, listo para una auditoría IFS o BRCGS.'
        ],
        next: { done: 'Abrir «Descargar informe de desviación» y después pasar a la reclamación (flecha derecha).', no_trigger: 'Ir a «De palabras a workflow», dejar 120 min y volver a ejecutar.' }
      }
    }
  });

  function fmtList(sc) {
    const ids = sc.items.map((l) => l.id);
    return ids.length < 2 ? (ids[0] || '') : `${ids.slice(0, -1).join(', ')} y ${ids[ids.length - 1]}`;
  }

  /* Plan de evaluación del lote propuesto por el agente de Calidad. */
  function PLAN(H) {
    return [
      { d: 'P1', t: 'Contención', text: `${H.ids.ret}: ${fmtList(H.sc)} retenidos en SAP QM; no recuperar la levadura del cono.`, owner: ROLE.quality_shift, due: '2026-09-29' },
      { d: 'P2', t: 'Análisis urgente', text: `${H.ids.mu}: diacetilo total (VDK), acetaldehído, acetato de isoamilo, extracto aparente y pH.`, owner: ROLE.quality, due: '2026-09-29' },
      { d: 'P3', t: 'Cata', text: 'Prueba triangular frente al patrón de Bardenas Lager con el panel de cata (5 catadores).', owner: ROLE.brewmaster, due: '2026-09-29' },
      { d: 'P4', t: 'Corrección del proceso', text: 'Bajar a 12 °C de forma gradual (máx. 1 °C cada 4 h) y valorar un reposo de diacetilo prolongado.', owner: ROLE.brewmaster, due: '2026-09-30' },
      { d: 'P5', t: 'Criterios de decisión', text: 'VDK ≤ 0,10 mg/l y cata conforme: liberar; por encima: reposo y nuevo análisis; fuera de perfil tras 72 h: mezcla controlada o descarte.', owner: ROLE.brewmaster, due: '2026-10-02' },
      { d: 'P6', t: 'Causa (hipótesis)', text: `Válvula VG-12 bloqueada en cerrado; ${H.ids.ot} revisa el actuador y el posicionador.`, owner: ROLE.maintenance, due: '2026-09-30' },
      { d: 'P7', t: 'Prevención', text: 'Alarma de posición de válvula frente a demanda en todos los fermentadores y llamada automática al encargado de bodega.', owner: ROLE.maintenance, due: '2026-10-16' },
      { d: 'P8', t: 'Cierre', text: `Cerrar ${H.ids.nc} con el destino del lote y la verificación de la válvula.`, owner: ROLE.quality, due: '2026-10-09' }
    ];
  }
})();
