/* Mercados Moncayo · alarma con aprobación: mural de lácteos MR-3 de la tienda T-027 por encima de 5 °C.
 * Empresa ficticia; datos sintéticos de demostración (MFM). Las funciones reciben el contexto H de la escena
 * (W workflow, C condición evaluada, sc alcance vigente, ids generados al aprobar, fmt, fv, pl…). */
(function () {
  'use strict';

  /* Temperatura del aire de retorno del mural (sonda TS-T027-MR3), cada 5 min. */
  const KEY = [['03:00', 3.1], ['03:20', 3.3], ['03:40', 4.2], ['03:50', 4.9], ['03:55', 5.3], ['04:30', 6.9], ['04:45', 7.8], ['04:50', 8.1], ['05:20', 9.6], ['05:30', 9.8], ['05:40', 9.6], ['05:50', 9.4], ['06:15', 9.5], ['06:40', 9.6], ['07:00', 9.4]];
  const mins = (t) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
  const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  const SERIES = [];
  for (let m = mins('03:00'); m <= mins('07:00'); m += 5) {
    const i = KEY.findIndex((k) => mins(k[0]) >= m);
    const b = KEY[i];
    const a = KEY[Math.max(0, i - 1)];
    const v = mins(b[0]) === m || i === 0 ? b[1] : a[1] + (b[1] - a[1]) * (m - mins(a[0])) / (mins(b[0]) - mins(a[0]));
    SERIES.push({ time: hhmm(m), value: Math.round(v * 10) / 10 });
  }

  /* Referencias del mural MR-3 por tramo (318 envases). */
  const REFS = {
    'MR3-T1': [['8437012600114', 'Yogur natural Moncayo 4 × 125 g', 'Y26258', '2026-10-14', 30], ['8437012600121', 'Yogur de fresa Moncayo 4 × 125 g', 'Y26258', '2026-10-14', 24], ['8437012600138', 'Yogur de limón Moncayo 4 × 125 g', 'Y26259', '2026-10-15', 22], ['8437012600145', 'Yogur natural azucarado Moncayo 4 × 125 g', 'Y26259', '2026-10-15', 20]],
    'MR3-T2': [['8437012600213', 'Yogur griego natural Moncayo 4 × 115 g', 'G26255', '2026-10-11', 24], ['8437012600220', 'Bífidus natural Moncayo 4 × 125 g', 'B26256', '2026-10-12', 22], ['8437012600237', 'Yogur griego con miel Moncayo 4 × 115 g', 'G26255', '2026-10-11', 18]],
    'MR3-T3': [['8437012600312', 'Natillas de vainilla Moncayo 4 × 125 g', 'N26254', '2026-10-09', 20], ['8437012600329', 'Flan de huevo Moncayo 4 × 100 g', 'F26253', '2026-10-08', 18], ['8437012600336', 'Arroz con leche Moncayo 4 × 125 g', 'A26254', '2026-10-09', 12], ['8437012600343', 'Cuajada Moncayo 4 × 125 g', 'C26256', '2026-10-06', 8]],
    'MR3-T4': [['8437012600411', 'Leche fresca entera Moncayo 1 l', 'L26270', '2026-10-04', 24], ['8437012600428', 'Leche fresca semidesnatada Moncayo 1 l', 'L26270', '2026-10-04', 12], ['8437012600435', 'Nata para montar Moncayo 200 ml', 'NM26249', '2026-10-20', 6]],
    'MR3-T5': [['8437012600510', 'Queso fresco de Burgos Moncayo 250 g', 'QB26266', '2026-10-06', 16], ['8437012600527', 'Requesón Moncayo 250 g', 'R26265', '2026-10-05', 10], ['8437012600534', 'Queso fresco batido 0 % Moncayo 500 g', 'QF26261', '2026-10-10', 8]],
    'MR3-T6': [['8437012600619', 'Masa de hojaldre fresca Moncayo 275 g', 'H26240', '2026-10-21', 12], ['8437012600626', 'Zumo de naranja exprimido Moncayo 1 l', 'Z26271', '2026-10-03', 12]]
  };
  const UNITS = [];
  Object.keys(REFS).forEach((item) => REFS[item].forEach(([ean, product, lot, bb, count]) => UNITS.push({ item, ean, product, lot, bb: bb.split('-').reverse().join('/'), count })));

  const ROLE = {
    quality: 'Responsable de Calidad', quality_shift: 'Técnico de Calidad de guardia', store_ops: 'Jefe de zona de tiendas',
    maintenance: 'Mantenimiento de frío', store_manager: 'Encargada de la tienda T-027', decider: 'Directora de Operaciones'
  };
  const TEAMS = 'Tiendas · Zona Huesca';

  agenticPack('retail', {
    alarma: {
      nav: 'Alarma T-027',
      title: 'Alarma T-027 en ejecución',
      icon: 'thermometer',
      page_title: 'Tienda T-027 · mural de lácteos MR-3',
      alarm_id: 'ALM-T027-0550',
      alarm_time: '05:50',
      source_system: 'Sensores de frío',
      asset: 'MR-3 de T-027',
      location: 'T-027 Huesca Centro · sala de ventas',
      excursion_noun: 'excursión',
      workflow_topic: 'cadena de frío en tienda',
      policy_ref: 'APPCC-TIE-01',
      procedures: 'APPCC-TIE-01 · PR-CAL-010 · IT-TIE-014',
      decider_short: 'Calidad',
      approval_node: 'Aprobación de Calidad',
      measure: { short: 'temperatura del mural', col: 'Temperatura', unit: '°C', dec: 1, icon: 'thermometer' },
      setpoint: 3,
      setpoint_label: 'consigna',
      limit: 5,
      critical: 8,
      min_minutes: 120,
      interval_min: 5,
      series: SERIES,
      peak: 9.8,
      peak_time: '05:30',
      current: 9.4,
      current_time: '07:00',
      current_note: 'ventilador del evaporador parado; la tienda abre a las 09:00',
      chart: {
        title: 'Mural MR-3 · temperatura de aire',
        sub: 'Consigna 3 °C · ahora 9,4 °C (07:00)',
        tab: 'Temperatura',
        series_label: 'Aire de retorno (TS-T027-MR3)',
        yTicks: [0, 2, 4, 6, 8, 10, 12],
        xTicks: ['03:00', '04:00', '05:00', '06:00', '07:00']
      },
      event_kv: [
        ['Mural', 'MR-3 · mural de lácteos y postres · 6 tramos · 318 envases'],
        ['Sonda', 'TS-T027-MR3 · aire de retorno · lectura cada 5 min'],
        ['Tienda', 'T-027 Huesca Centro · cerrada hasta las 09:00'],
        ['Equipos', 'Evaporador EV-MR3 · ventilador VF-2 · central frigorífica CF-T027']
      ],
      events: [
        { time: '03:40', end: '07:00', text: 'El ventilador VF-2 del evaporador deja de girar (consumo 0 A)', equipment: 'VF-2', tone: 'warn', band: 'Ventilador VF-2 parado', bandTone: 'warn' },
        { time: '03:55', text: 'Supera 5 °C: aviso de nivel 1 a la central de alarmas; no hay personal en la tienda', ref: 'AV-T027-0355', tone: 'warn' },
        { time: '04:50', text: 'Supera 8 °C, límite crítico de APPCC-TIE-01', ref: 'APPCC-TIE-01', tone: 'crit' },
        { time: '05:30', text: 'Pico de 9,8 °C en el aire de retorno', equipment: 'TS-T027-MR3', tone: 'crit' },
        { time: '05:50', text: 'Alarma ALM-T027-0550: 60 min seguidos por encima de 8 °C', ref: 'ALM-T027-0550', tone: 'crit' },
        { time: '06:05', text: 'El vigilante confirma la cortina nocturna bajada y escarcha en el evaporador', equipment: 'Seguridad', tone: 'brand' },
                { time: '06:40', text: 'La central avisa al frigorista de guardia: llegada prevista a las 08:15', equipment: 'Central de alarmas', tone: 'brand' }
      ],
      probable_cause: 'Fallo del motor del ventilador VF-2 del evaporador del mural MR-3 (consumo 0 A desde las 03:40): sin circulación de aire el evaporador se escarcha y el aire de retorno sube. La central CF-T027 y el compresor funcionan con normalidad. A confirmar por Mantenimiento de frío.',
      backup: { id: 'wf-frio-tienda-respaldo', name: 'Cadena de frío en murales de tienda', version: 'v1', threshold: 5, minutes: 120, critical: 8, approver: ROLE.quality },
      untouched: 'TPV, SAP, ServiceNow ni Teams',
      apply_systems: 'TPV, SAP S/4 Retail, ServiceNow y Teams',
      llm_cost_usd: 0.04,
      ids: [
        { key: 'blq', prefix: 'BLV-2026-', start: 731, label: 'Bloqueo de venta' },
        { key: 'tar', prefix: 'TAR-T027-', start: 312, label: 'Tarea de tienda' },
        { key: 'ot', prefix: 'INC00', start: 48213, label: 'Incidencia de frío' },
        { key: 'nc', prefix: 'AC-APPCC-2026-', start: 146, label: 'Acción correctiva APPCC' }
      ],
      block_id_key: 'blq',
      proposer: 'cal',
      lanes: [
        { id: 'mon', name: 'Monitor de frío', short: 'Monitor', icon: 'thermometer', systems: ['Sensores de frío'], idle: 'Confirma la excursión con las lecturas de la sonda', gsub: 'confirma la excursión', gsys: ['Sensores de frío'] },
        { id: 'traz', name: 'Trazabilidad de producto', short: 'Trazabilidad', icon: 'git-branch', systems: ['SAP S/4 Retail', 'TPV tiendas'], idle: 'Localiza referencias, lotes y ventas previstas', gsub: 'referencias, lotes y ventas', gsys: ['SAP', 'TPV'] },
        { id: 'cal', phase: 2, name: 'Calidad', icon: 'lock', systems: ['TPV tiendas', 'SAP S/4 Retail'], idle: 'Prepara el bloqueo de venta y pide la aprobación', gsub: 'bloqueo de venta y APPCC', gsys: ['TPV', 'SAP'] },
        { id: 'tie', phase: 2, name: 'Tienda', icon: 'building', systems: ['Microsoft Teams', 'SAP S/4 Retail'], idle: 'Prepara la retirada y el traslado a cámara', gsub: 'retirada y traslado a cámara', gsys: ['Teams', 'SAP'] },
        { id: 'man', phase: 2, name: 'Mantenimiento de frío', short: 'Mantenimiento', icon: 'wrench', systems: ['ServiceNow'], idle: 'Abre la incidencia urgente al frigorista', gsub: 'incidencia urgente', gsys: ['ServiceNow'] }
      ],
      steps: {
        p1: (H) => {
          const a = H.all;
          return [
            { lane: 'mon', system: 'Sensores de frío', verb: 'Consultando', action: 'Lee la sonda TS-T027-MR3 de 03:00 a 07:00, una lectura cada 5 min', result: `${SERIES.length} lecturas, sin huecos · ahora 9,4 °C (07:00)`, ms: 1800, set: { volume: `${SERIES.length} lecturas de temperatura` } },
            { lane: 'mon', system: 'Agentic Platform', eval: true, ms: 90 },
            { lane: 'mon', system: 'Sensores de frío', verb: 'Consultando', action: 'Cruza la excursión con el consumo del ventilador y la central CF-T027', result: 'Ventilador VF-2 a 0 A desde las 03:40; central y compresor en marcha: hipótesis para Mantenimiento de frío', tone: 'warn', ms: 1400, set: { volume: `${SERIES.length} lecturas · consumos`, result: `Excursión confirmada: ${H.C.above} min por encima · pico 9,8 °C` } },
            { lane: 'traz', system: 'SAP S/4 Retail', verb: 'Consultando', action: 'Lista el surtido del planograma de MR-3 y el stock por tramo', result: `${a.count} envases de ${UNITS.length} referencias en ${a.items.length} tramos`, ms: 2100, set: { volume: `${UNITS.length} referencias` } },
            { lane: 'traz', system: 'SAP S/4 Retail', verb: 'Consultando', action: 'Resuelve lote y fecha de caducidad de cada referencia', result: `${new Set(UNITS.map((u) => u.lot)).size} lotes de marca Moncayo · ${H.fmt.eur(a.value)} a PVP`, ms: 2300, set: { volume: `${a.count} envases · ${UNITS.length} referencias` }, reveal: 'lots' },
            { lane: 'traz', system: 'SAP S/4 Retail', verb: 'Consultando', action: 'Busca las mismas referencias fuera del mural', result: `${a.elseTotal} envases en la cámara CF-1 y en el reparto de las 06:30, en rango · ${H.goneTotal} vendidos antes de la excursión`, ms: 1700, reveal: 'map' },
            { lane: 'traz', system: 'TPV tiendas', verb: 'Consultando', action: 'Consulta las ventas y pedidos en línea previstos con esas referencias', result: `${a.holds.length} canales de venta; el primero, ${H.first.id}, a las ${H.first.time}`, tone: 'warn', ms: 1900, set: { volume: `${a.count} envases · ${a.holds.length} canales`, result: `Primera venta posible a las ${H.first.time}` }, milestone: 'traz', audit: { action: 'Productos y ventas identificados', detail: `${a.count} envases de ${UNITS.length} referencias en ${a.items.length} tramos de MR-3 · ${a.holds.length} canales de venta · ${a.elseTotal} envases fuera del mural` } },
            { lane: 'cal', node: 'apr', system: 'Procedimientos', verb: 'Analizando', action: 'Aplica APPCC-TIE-01 y PR-CAL-010 a esta excursión', result: 'Refrigerado más de 2 h por encima de 5 °C: bloquear la venta, retirar y destruir como merma; solo Calidad decide excepciones', ms: 1300 },
            { lane: 'cal', node: 'apr', system: 'Modelo de lenguaje', verb: 'Redactando', action: 'Redacta la propuesta y su motivo con las evidencias', result: `Propuesta: bloquear la venta de ${a.count} envases, retirarlos a la cámara de merma y abrir incidencia urgente de frío`, ms: 6400, set: { volume: `${a.count} envases · ${a.holds.length} canales` } },
            { lane: 'cal', node: 'apr', system: 'Agentic Platform', verb: 'Evaluando', action: `Pide la aprobación de ${H.W.approver} antes de escribir en TPV, SAP y ServiceNow`, result: 'Esperando la decisión de Calidad', tone: 'warn', ms: 60, wait: 1500, set: { result: 'Propuesta enviada a Calidad' }, milestone: 'prop', audit: { action: 'Propuesta de bloqueo de venta enviada a aprobación', detail: `${a.count} envases en ${a.items.length} tramos de MR-3 · aprueba ${H.W.approver}` } }
          ];
        },
        p2: (H) => {
          const sc = H.sc;
          const ids = H.ids;
          return [
            { lane: 'cal', system: 'TPV tiendas', verb: 'Aplicando', action: `Bloquea la venta en las cajas de T-027 de las ${sc.items.reduce((s, x) => s + REFS[x.id].length, 0)} referencias expuestas`, result: `${ids.blq} · el TPV rechaza la lectura con el aviso «Producto retirado por Calidad»`, tone: 'ok', ms: 2000, milestone: 'blq', audit: { action: 'Venta bloqueada en TPV', detail: `${ids.blq} · TPV de T-027 · ${sc.count} envases en ${sc.items.length} tramos` } },
            { lane: 'cal', system: 'SAP S/4 Retail', verb: 'Aplicando', action: 'Retira las referencias de los pedidos en línea y del stock disponible', result: `${sc.holds.map((h) => h.id).join(', ')} sin esas referencias · stock en «bloqueado por calidad»`, tone: 'ok', ms: 1900, set: { result: `${ids.blq} aplicado · ${sc.holds.length} canales sin producto expuesto` }, milestone: 'sap', audit: { action: 'Stock bloqueado en SAP', detail: `SAP S/4 Retail · ${sc.count} envases · ${sc.holds.map((h) => h.id).join(', ')}` } },
            { lane: 'tie', system: 'Microsoft Teams', verb: 'Aplicando', action: `Asigna a ${ROLE.store_manager} la tarea de retirada antes de abrir`, result: `${ids.tar} · retirar ${sc.count} envases a la cámara de merma y reponer desde CF-1 antes de las 08:45`, tone: 'ok', ms: 1600, set: { volume: '1 tarea de tienda' }, milestone: 'tar', audit: { action: 'Tarea de retirada asignada', detail: `${ids.tar} · Microsoft Teams · ${ROLE.store_manager} · antes de las 08:45` } },
            { lane: 'tie', system: 'SAP S/4 Retail', verb: 'Aplicando', action: 'Prepara la merma por rotura de cadena de frío y el pedido urgente de reposición', result: `Merma de ${H.fmt.eur(sc.value)} pendiente de confirmar al pesar · reposición en el reparto de las 11:00`, tone: 'ok', ms: 1800, set: { volume: '1 tarea · 1 merma · 1 reposición', result: `${ids.tar} asignada · reposición a las 11:00` } },
            { lane: 'man', system: 'ServiceNow', verb: 'Aplicando', action: 'Abre la incidencia urgente al frigorista con la curva y el consumo del ventilador', result: `${ids.ot} · prioridad 1 · cambio del motor del ventilador VF-2 · llegada 08:15`, tone: 'ok', ms: 1700, set: { volume: '1 incidencia de prioridad 1' }, milestone: 'ot', audit: { action: 'Incidencia de frío abierta', detail: `${ids.ot} · ServiceNow · mural MR-3 de T-027 · prioridad 1` } },
            { lane: 'cal', system: 'SAP S/4 Retail', verb: 'Aplicando', action: 'Registra la acción correctiva APPCC con la curva y las referencias retiradas', result: `${ids.nc} abierta (APPCC-TIE-01)`, tone: 'ok', ms: 1500, set: { volume: '1 acción correctiva' }, milestone: 'nc', audit: { action: 'Acción correctiva APPCC registrada', detail: `${ids.nc} · excursión de temperatura en MR-3 de T-027` } },
            { lane: 'cal', system: 'Modelo de lenguaje', verb: 'Redactando', action: 'Redacta el registro de acción correctiva (desviación, producto, medidas y verificación)', result: 'Registro APPCC listo para la revisión de Calidad', ms: 6900, set: { volume: '1 acción correctiva en borrador' }, milestone: 'd8', audit: { action: 'Registro de acción correctiva redactado', detail: `${ids.nc} · pendiente de revisión de Calidad` } },
            { lane: 'tie', system: 'Microsoft Teams', verb: 'Enviando', action: `Avisa a ${ROLE.store_manager} y a ${ROLE.store_ops}`, result: `Aviso publicado en el canal «${TEAMS}»`, tone: 'ok', ms: 900, wait: 1600, set: { volume: '1 tarea · 1 merma · 1 aviso', result: `${ids.tar} asignada · tienda avisada` }, milestone: 'teams', audit: { action: 'Aviso enviado por Microsoft Teams', detail: `${ROLE.store_manager} y ${ROLE.store_ops} · canal «${TEAMS}»` } }
          ];
        }
      },
      kpis: (H, held) => [
        { label: 'Envases en MR-3 durante la excursión', value: H.all.count, sub: `${UNITS.length} referencias · ${H.all.items.length} tramos · ${H.fmt.eur(H.all.value)} a PVP`, icon: 'box' },
        { label: 'Primera venta posible', value: H.first.time, sub: `${H.first.id} · ${H.first.where}${held ? ' · bloqueada' : ''}`, icon: 'barcode' }
      ],
      scope: {
        icon: 'box',
        unit: ['envase', 'envases'],
        item_noun: ['tramo', 'tramos'],
        qty_unit: null,
        per_square: 8,
        items: [
          { id: 'MR3-T1', title: 'Yogures Moncayo naturales y de sabores', sub: '4 referencias', group: 'Tramo 1', group_short: 'Tramo 1', count: 96, value: 62.4, hold: 'TPV-T027',
            elsewhere: [{ loc: 'Cámara CF-1', count: 144, note: 'yogures · 3,6 °C · en rango' }],
            gone: [{ id: 'TPV-0928', date: '2026-09-28', time: '21:30', count: 38, to: 'Vendidos el 28/09 hasta el cierre, antes de la excursión' }] },
          { id: 'MR3-T2', title: 'Yogures griegos y bífidus Moncayo', sub: '3 referencias', group: 'Tramo 2', group_short: 'Tramo 2', count: 64, value: 89.6, hold: 'CC-0929-114' },
          { id: 'MR3-T3', title: 'Postres lácteos Moncayo', sub: 'natillas, flan, arroz con leche y cuajada', group: 'Tramo 3', group_short: 'Tramo 3', count: 58, value: 92.8, hold: 'TPV-T027',
            elsewhere: [{ loc: 'Cámara CF-1', count: 60, note: 'postres · 3,6 °C · en rango' }] },
          { id: 'MR3-T4', title: 'Leche fresca y nata Moncayo', sub: '3 referencias', group: 'Tramo 4', group_short: 'Tramo 4', count: 42, value: 63, hold: 'CC-0929-114',
            elsewhere: [{ loc: 'Reparto 06:30', count: 72, note: 'leche fresca · camión desde Plaza a 2,8 °C' }],
            gone: [{ id: 'TPV-0928', date: '2026-09-28', time: '21:30', count: 21, to: 'Vendidos el 28/09 hasta el cierre, antes de la excursión' }] },
          { id: 'MR3-T5', title: 'Quesos frescos y requesón Moncayo', sub: '3 referencias', group: 'Tramo 5', group_short: 'Tramo 5', count: 34, value: 71.4, hold: 'CC-0929-121' },
          { id: 'MR3-T6', title: 'Masas frescas y zumo exprimido Moncayo', sub: '2 referencias', group: 'Tramo 6', group_short: 'Tramo 6', count: 24, value: 52.8, hold: 'TPV-T027' }
        ],
        holds: {
          'TPV-T027': { date: '2026-09-29', time: '09:00', where: 'Apertura · cajas 1–6', label: 'Venta en tienda' },
          'CC-0929-114': { date: '2026-09-29', time: '10:30', where: 'Pedido en línea · recogida en tienda', label: 'Pedido en línea' },
          'CC-0929-121': { date: '2026-09-29', time: '12:00', where: 'Pedido en línea · recogida en tienda', label: 'Pedido en línea' }
        },
        units: UNITS,
        csv_name: 'mural-mr3-t027-excursion',
        csv_cols: [
          { label: 'Tramo', key: 'item' },
          { label: 'EAN', key: 'ean', text: true },
          { label: 'Producto', key: 'product' },
          { label: 'Lote', key: 'lot' },
          { label: 'Caducidad', key: 'bb' },
          { label: 'Envases', key: 'count' }
        ],
        labels: {
          items_title: 'Productos y ventas afectados',
          items_systems: 'SAP S/4 Retail y TPV de tiendas',
          items_where: 'mural MR-3,',
          item_col: 'Tramo',
          at_col: 'Envases',
          group_col: 'Tramo',
          hold_col: 'Primera venta',
          else_col: 'Fuera del mural',
          else_none: 'Sin stock',
          gone_verb: 'vendidos',
          exposed: 'Expuesto',
          blocked: 'Venta bloqueada',
          unblocked: 'Sin bloqueo',
          block_noun: 'bloqueo',
          block_verb: 'Bloquear',
          hold_verb: 'Bloquear',
          held: 'Bloqueados',
          holds_label: 'Canales de venta con producto expuesto',
          holds_first: 'el primero',
          scope_main: 'Envases en el mural MR-3 durante la excursión',
          else_scope: 'Mismas referencias fuera del mural',
          else_decision: 'En rango',
          map_title: 'Ubicación de los productos',
          map_sub: 'SAP S/4 Retail · planograma de T-027',
          zone_title: 'MR-3 · mural de lácteos por tramo',
          zone_sub: '6 tramos',
          else_title: 'Mismas referencias fuera del mural',
          else_sub: 'no estuvieron en MR-3 · reponen el lineal',
          gone_title: 'Vendidos antes de la excursión',
          legend_exposed: 'Expuesto a la excursión',
          legend_else: 'En rango, fuera del mural',
          csv_button: 'Descargar referencias (CSV)',
          value_label: 'a PVP',
          report_scope: 'Alcance del bloqueo de venta'
        }
      },
      text: {
        proposal_title: 'propuesta de bloqueo de venta',
        stop_without: 'proponer bloqueo de venta',
        activates: 'el bloqueo de venta',
        no_proposal: 'sin propuesta de bloqueo',
        idle_log: 'La ejecución se detiene en la aprobación: nada se bloquea en los TPV ni en SAP sin la decisión de Calidad.',
        approve_action: 'Aprueba el bloqueo de venta y la retirada',
        scope_short: (H) => `bloquear la venta de ${H.pl(H.sc.count)} de ${H.fmt.plural(H.sc.items.length, 'tramo', 'tramos')}, retirarlos antes de abrir y avisar al frigorista`,
        audit_approved: 'Bloqueo de venta aprobado',
        audit_approved_detail: (H) => `${H.ids.blq} · ${H.sc.count} envases en ${H.sc.items.length} tramos de MR-3 · ${H.sc.holds.length} canales de venta${H.sc.out.length ? ` · alcance editado (sin ${H.sc.out.map((l) => l.id).join(', ')})` : ''}`,
        outcome_approved: (H) => `Bloqueo de venta ${H.ids.blq} aprobado · ${H.sc.count} envases`,
        audit_rejected: 'Bloqueo de venta rechazado',
        outcome_rejected: 'Bloqueo rechazado · sin acciones aplicadas',
        toast_done: (H) => `${H.ids.blq} aplicado · ${H.ids.tar} asignada · ${H.ids.ot} abierta`,
        presenter_applying: 'Tras la aprobación: bloqueo en los TPV, stock bloqueado en SAP, tarea de retirada a la tienda, incidencia al frigorista y aviso por Teams.',
        reject_nothing: 'ni bloqueo en los TPV, ni stock bloqueado en SAP, ni tarea a la tienda, ni incidencia al frigorista',
        edit_intro: 'APPCC-TIE-01 pide retirar todo el refrigerado que ha estado más de 2 h por encima de 5 °C.'
      },
      approval: {
        id: 'blq-mr3-t027',
        approve_label: 'Aprobar bloqueo de venta',
        policy: 'APPCC-TIE-01 · PR-CAL-010 · solo Calidad decide excepciones',
        title: (H) => `Bloqueo de venta · ${H.sc.count} envases del mural MR-3`,
        summary: (H) => `Motivo: aire del mural por encima de ${H.fv(H.C.threshold)} durante ${H.C.above} min (${H.span}), más de los ${H.C.minutes} min que fija ${H.W.backup ? 'APPCC-TIE-01' : 'el workflow'}${H.critMin ? `, y ${H.critMin} min por encima de ${H.fv(H.crit)}: excursión crítica` : ''}. Se bloquea la venta del producto expuesto y se retira a la cámara de merma antes de abrir la tienda.`,
        effects: (H) => [
          `TPV de T-027: bloqueo de venta de ${H.sc.count} envases (${H.sc.items.length} tramos)`,
          `SAP S/4 Retail: stock bloqueado y ${H.sc.holds.length} canales de venta sin producto expuesto`,
          `Microsoft Teams: tarea de retirada a ${ROLE.store_manager} antes de las 08:45`,
          'ServiceNow: incidencia urgente al frigorista de guardia',
          'SAP S/4 Retail: acción correctiva APPCC con registro en borrador'
        ],
        applied: (H) => [
          `TPV de T-027: ${H.ids.blq} · ${H.sc.count} envases bloqueados`,
          `SAP S/4 Retail: stock bloqueado · ${H.ids.nc} con registro en borrador`,
          `Microsoft Teams: ${H.ids.tar} asignada a ${ROLE.store_manager}`,
          `ServiceNow: ${H.ids.ot} · prioridad 1`,
          `Microsoft Teams: aviso en «${TEAMS}»`
        ]
      },
      result: {
        title: (H) => `Venta bloqueada (${H.ids.blq}), retirada asignada e incidencia ${H.ids.ot} abierta`,
        stats: (H) => [
          { label: 'Envases con venta bloqueada', value: H.sc.count, tone: 'crit' },
          { label: 'Canales de venta protegidos', value: H.sc.holds.length },
          { label: 'Tramos retirados', value: H.sc.items.length },
          { label: 'Envases para reponer', value: H.sc.elseTotal, tone: 'warn' }
        ],
        tiles: (H) => [
          {
            icon: 'lock', tone: 'crit', title: `Bloqueo de venta ${H.ids.blq}`, systems: ['TPV tiendas', 'SAP S/4 Retail'],
            kv: [
              ['Estado', App.chip('blocked')],
              ['Alcance', `${H.pl(H.sc.count)} · ${H.fmt.plural(H.sc.items.length, 'tramo', 'tramos')}`],
              ['Valor a PVP', H.fmt.eur(H.sc.value)],
              ['Canales', H.sc.holds.map((h) => h.id).join(', ')],
              ['Decide excepciones', `${ROLE.quality} (APPCC-TIE-01)`]
            ],
            next: 'Destino según APPCC-TIE-01: más de 2 h por encima de 5 °C → merma y destrucción; no se reetiqueta ni se rebaja.',
            buttons: [{ action: 'csv', label: 'Referencias bloqueadas (CSV)' }]
          },
          {
            icon: 'building', title: `Retirada ${H.ids.tar} e incidencia ${H.ids.ot}`, systems: ['Microsoft Teams', 'ServiceNow'], chip: ['running', 'Antes de abrir'],
            kv: [
              ['Tarea', `Retirar ${H.sc.count} envases a la cámara de merma antes de las 08:45`],
              ['Reposición', `Desde la cámara CF-1 y el reparto de las 06:30 (${H.sc.elseTotal} envases)`],
              ['Incidencia', `${H.ids.ot} · cambio del motor del ventilador VF-2`],
              ['Frigorista', 'Llegada prevista a las 08:15'],
              ['Mural', 'Tapado con el cartel «En mantenimiento» hasta recuperar 3 °C']
            ]
          },
          {
            icon: 'clipboard', title: `Acción correctiva ${H.ids.nc}`, systems: ['SAP S/4 Retail'], chip: ['draft', 'En borrador'],
            items: AC(H),
            buttons: [{ action: 'report-doc', icon: 'printer', label: 'Descargar registro APPCC (PDF)' }]
          },
          {
            icon: 'send', title: 'Aviso a la tienda', systems: ['Microsoft Teams'], note: H.run.endAt ? `enviado a las ${H.fmt.time(H.run.endAt)}` : '',
            message: {
              from: 'Agentic Platform · agente Tienda', channel: `canal «${TEAMS}»`, at: H.run.endAt ? H.fmt.time(H.run.endAt) : '',
              paras: [
                { to: ROLE.store_manager, text: `Antes de abrir, retira del mural MR-3 lo siguiente (venta ya bloqueada en caja, ${H.ids.blq}, aprobado por ${H.decision.by}):` },
                { to: ROLE.store_ops, text: `Incidencia ${H.ids.ot} al frigorista, llegada 08:15. Reposición desde CF-1; pedido urgente en el reparto de las 11:00. Detalle en ${H.ids.nc}.` }
              ],
              list: H.sc.items.map((l) => `${l.group}: ${l.title} · ${H.pl(l.count)}`)
            }
          }
        ]
      },
      doc: {
        code: 'REG-APPCC-TIE-01-14',
        lane: 'cal',
        heading: 'Registro de acción correctiva',
        col_d: 'Ap.',
        title: (H) => `Acción correctiva APPCC · ${H.ids.nc}`,
        subtitle: 'Excursión de temperatura en el mural MR-3 de la tienda T-027 · borrador para revisión',
        filename: (H) => `accion-correctiva-${H.ids.nc}`,
        meta: (H) => [['Acción correctiva', H.ids.nc], ['Bloqueo de venta', H.ids.blq], ['Incidencia de frío', H.ids.ot]],
        items: (H) => AC(H),
        reviewer: ROLE.quality,
        approver: ROLE.store_ops,
        note: 'Borrador generado a partir de las evidencias de la ejecución. La causa es una hipótesis hasta que Mantenimiento de frío cierre la incidencia. Conservar este registro según el plan APPCC de tienda.'
      },
      report: {
        noun: 'informe de incidencia',
        code: 'REG-CAL-010-22',
        title: 'Informe de incidencia · mural MR-3 de T-027',
        subtitle: 'Excursión de temperatura en tienda',
        filename: 'informe-incidencia-t027-mr3',
        site_label: 'Tienda',
        site: 'T-027 Huesca Centro',
        description: (H) => `El 29/09/2026 a las 05:50 la plataforma de sensores de frío emitió la alarma ALM-T027-0550 en el mural de lácteos MR-3 de la tienda T-027 Huesca Centro (consigna 3 °C). El aire de retorno (sonda TS-T027-MR3) estuvo ${H.C.above} min por encima de ${H.fv(H.C.threshold)} (${H.span}), con un pico de 9,8 °C a las 05:30 y ${H.critMin} min por encima de ${H.fv(H.crit)}. En el mural había ${H.all.count} envases de ${UNITS.length} referencias de marca Moncayo. La tienda estaba cerrada y no se vendió nada expuesto.`,
        criteria: 'APPCC-TIE-01 (producto refrigerado más de 2 h por encima de 5 °C: retirada y destrucción como merma) y PR-CAL-010 (bloqueo de venta en TPV y registro de la incidencia; solo Calidad decide excepciones). Reglamento (CE) 852/2004 y Real Decreto 1021/2022.',
        actions: (H) => [
          `TPV de T-027 · ${H.ids.blq}: venta bloqueada de ${H.sc.count} envases en ${H.sc.items.length} tramos (${H.fmt.eur(H.sc.value)} a PVP).`,
          `SAP S/4 Retail: stock en «bloqueado por calidad»; referencias retiradas de ${H.sc.holds.map((h) => `${h.id} (${h.time})`).join(', ')}.`,
          `Microsoft Teams · ${H.ids.tar}: retirada a la cámara de merma antes de las 08:45 y reposición desde CF-1.`,
          `ServiceNow · ${H.ids.ot}: incidencia de prioridad 1 al frigorista de guardia (ventilador VF-2).`,
          `SAP S/4 Retail · ${H.ids.nc}: acción correctiva APPCC con registro en borrador (REG-APPCC-TIE-01-14).`,
          `Microsoft Teams: aviso a ${ROLE.store_manager} y a ${ROLE.store_ops} en «${TEAMS}».`
        ],
        pending: () => [
          'Confirmar la retirada física y pesar la merma antes de abrir (foto del contenedor en la tarea).',
          'Tras la reparación, verificar que el mural recupera 3 °C en 60 min antes de reponer.',
          'Revisar por qué el aviso de nivel 1 de las 03:55 no generó llamada a la tienda ni al frigorista.',
          `Excepciones al destino del producto: solo ${ROLE.quality} (PR-CAL-010).`
        ],
        reviewer: ROLE.quality,
        final_step: 'Cierre de la merma',
        final_role: ROLE.store_ops,
        note: 'Documento sujeto a la revisión de Calidad; no sustituye el registro físico de la retirada en tienda.'
      },
      not_applied: (H) => [
        { sys: 'TPV tiendas', text: `Sin bloqueo de venta: los ${H.all.count} envases se podrán vender al abrir` },
        { sys: 'SAP S/4 Retail', text: 'Stock disponible y pedidos en línea sin cambios' },
        { sys: 'Microsoft Teams', text: 'Sin tarea de retirada ni aviso a la tienda' },
        { sys: 'ServiceNow', text: 'Sin incidencia al frigorista' }
      ],
      compare: [
        { k: 'Personas que intervienen', today: '3–4: central de alarmas, encargada, Calidad y frigorista', now: 'Calidad revisa y decide; la tienda y el frigorista reciben la tarea con los datos' },
        { k: 'Sistemas que se consultan a mano', today: '4–5: sensores, SAP, TPV, ServiceNow y teléfono', now: 'Ninguno: los agentes consultan 5 sistemas y cada dato queda en el registro' },
        { k: 'Pasos', today: '10–12 pasos manuales; muchas veces se detecta al abrir la tienda', steps: true },
        { k: 'Tiempo hasta bloquear la venta y avisar', today: '1–3 h (y con riesgo de vender producto expuesto)', measured: true },
        { k: 'Evidencia para la auditoría', today: 'Hoja de temperaturas en papel y correos', now: 'Informe REG-CAL-010-22, registro APPCC y registro de auditoría de la ejecución' }
      ],
      presenter: {
        intro: () => 'Alarma de las 05:50 en la tienda T-027 Huesca Centro: el mural de lácteos MR-3 está a 9,4 °C con un límite de 5 °C desde las 03:55, con pico de 9,8. Dentro hay 318 envases de marca Moncayo y la tienda abre a las 09:00.',
        agents: 'Cinco agentes, cada uno con su sistema: sensores de frío para la curva; SAP y TPV para referencias y ventas; TPV y SAP para el bloqueo; Teams para la tienda; ServiceNow para el frigorista.',
        waiting: (H) => [
          `Los ${H.sc.elseTotal} envases de las mismas referencias en la cámara CF-1 y en el reparto no estuvieron en el mural: sirven para reponer. Todavía no se ha bloqueado nada en los TPV.`,
          'Se puede editar el alcance (quitar un tramo, con motivo) o rechazar: si se rechaza, no se aplica nada y queda en auditoría.'
        ],
        rejected: ['Rechazado: no hay bloqueo en caja, ni tarea a la tienda, ni incidencia al frigorista. El motivo queda en el registro de auditoría.', 'La decisión es siempre de Calidad; se puede volver a ejecutar cuando se quiera.'],
        done: (H) => [
          `Aplicado tras la aprobación: ${H.ids.blq} en los TPV, stock bloqueado en SAP, ${H.ids.tar} a la encargada y ${H.ids.ot} al frigorista, con el registro APPCC en borrador.`,
          'El informe sale como documento controlado: código, revisión, aprobaciones y registro de la ejecución, listo para una inspección de Sanidad o una auditoría IFS.'
        ],
        next: { done: 'Abrir «Descargar informe de incidencia» y después pasar a la reclamación (flecha derecha).', no_trigger: 'Ir a «De palabras a workflow», dejar 120 min y volver a ejecutar.' }
      }
    }
  });

  /* Registro de acción correctiva APPCC propuesto por el agente de Calidad. */
  function AC(H) {
    const sc = H.sc;
    return [
      { d: 'A1', t: 'Desviación', text: `Mural MR-3 de T-027 ${H.C.above} min por encima de 5 °C (${H.span}); pico de 9,8 °C a las 05:30.`, owner: ROLE.quality_shift, due: '2026-09-29' },
      { d: 'A2', t: 'Producto afectado', text: `${sc.count} envases de ${sc.items.length} tramos (${H.fmt.eur(sc.value)} a PVP); detalle por EAN y lote en el anexo CSV.`, owner: ROLE.quality_shift, due: '2026-09-29' },
      { d: 'A3', t: 'Medida inmediata', text: `${H.ids.blq}: venta bloqueada en TPV; ${H.ids.tar}: retirada a la cámara de merma antes de las 08:45.`, owner: ROLE.store_manager, due: '2026-09-29' },
      { d: 'A4', t: 'Destino del producto', text: 'Merma y destrucción (más de 2 h por encima de 5 °C). Sin reetiquetado ni rebaja.', owner: ROLE.quality, due: '2026-09-29' },
      { d: 'A5', t: 'Causa (hipótesis)', text: 'Motor del ventilador VF-2 del evaporador parado desde las 03:40; evaporador escarchado.', owner: ROLE.maintenance, due: '2026-09-29' },
      { d: 'A6', t: 'Corrección del equipo', text: `${H.ids.ot}: cambio del motor del ventilador y desescarche manual.`, owner: ROLE.maintenance, due: '2026-09-29' },
      { d: 'A7', t: 'Verificación', text: 'El mural recupera 3 °C en menos de 60 min antes de reponer; lectura registrada.', owner: ROLE.store_manager, due: '2026-09-29' },
      { d: 'A8', t: 'Prevención', text: 'Llamada automática al frigorista con el aviso de nivel 1 en horario de cierre; revisar IT-TIE-014.', owner: ROLE.quality, due: '2026-10-16' }
    ];
  }
})();
