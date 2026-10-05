/* Cervecera Bardenas · resumen del turno (escena «turno»). Datos sintéticos de demostración (MFM). */
agenticPack('cerveceria', {
  turno: (function () {
    'use strict';
    const hhmm = (i) => `${String(Math.floor((i * 5) / 60)).padStart(2, '0')}:${String((i * 5) % 60).padStart(2, '0')}`;
    /* Temperatura del mosto en fermentación de FV-12 (sonda TT-FV12-02, zona media), cada 5 min de 00:00 a 05:50. */
    const TEMP = [12.2, 12.2, 12.3, 12.3, 12.4, 12.4, 12.4, 12.5, 12.6, 12.6, 12.6, 12.7, 12.7, 12.8, 12.8, 12.8, 12.9, 12.9, 13.0, 13.0,
      13.1, 13.1, 13.2, 13.2, 13.2, 13.3, 13.3, 13.4, 13.4, 13.4, 13.6, 13.6, 13.7, 13.9, 13.9, 14.0, 14.1, 14.2, 14.3, 14.5, 14.5,
      14.7, 14.8, 14.9, 15.1, 15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 15.7, 15.8, 15.9, 16.0, 16.2, 16.3, 16.4, 16.5, 16.6, 16.7, 16.8,
      16.9, 17.0, 17.1, 17.0, 17.0, 16.9, 16.8, 16.8, 16.8];
    const AGENT = 'Parte diario de fábrica';

    const items = [
      { code: 'FV-12', name: 'Fermentador FV-12 · Bardenas Lager', tag: 'PCC calidad', area: 'Bodega de fermentación', metric: 'temperatura de fermentación', reading: '16,8 °C', baseline: '12,0 °C', limits: 'aviso > 13,5 · crítico > 15 °C', status: 'critical',
        note: 'Lote L2609-FV12 (480 hl, día 3). Por encima de 13,5 °C desde las 02:30 por la válvula de glicol VG-12 bloqueada; pico de 17,1 °C a las 05:20.' },
      { code: 'LLB-1', name: 'Llenadora de barriles LLB-1', tag: 'Oxidación', area: 'Envasado · barril', metric: 'oxígeno disuelto en el barril', reading: '78 ppb', baseline: '≤ 50 ppb', limits: 'aviso > 50 · crítico > 70 ppb', status: 'critical',
        note: 'O₂ alto en los barriles de ayer (cabezal 3). En el registro del 18/08, cuando LLB-1 llenó el lote L2608-K14, ya marcó 64 ppb.' },
      { code: 'GLY-1', name: 'Planta de glicol GLY-1', area: 'Servicios · frío', metric: 'temperatura de impulsión del glicol', reading: '−2,1 °C', baseline: '−4,0 °C', limits: 'aviso > −3 · crítico > −1 °C', status: 'warning',
        note: 'El compresor 2 está en mantenimiento y la carga de la bodega en fermentación tumultuosa es alta; sin relación directa con VG-12.' },
      { code: 'IBV', name: 'Inspector de botellas vacías IBV-1', tag: 'Vidrio', area: 'Envasado · línea de botella LB-1', metric: 'botellas rechazadas', reading: '1,9 %', baseline: '0,6 %', limits: 'aviso > 1,2 · crítico > 3 %', status: 'warning',
        note: 'Más rechazos por desconchados en la boca del lote de vidrio VID-2609-03; PR-ENV-002 pide revisar la rotura en el despaletizador.' },
      { code: 'LB-1', name: 'Línea de botella LB-1', area: 'Envasado · botella', metric: 'OEE del turno de noche', reading: '71 %', baseline: '82 %', limits: 'aviso < 75 · crítico < 60 %', status: 'warning',
        note: 'Microparos de la etiquetadora; orden abierta OT-2026-4517 por el desgaste de los tampones de cola.' },
      { code: 'CO2-REC', name: 'Recuperación de CO₂', area: 'Servicios · CO₂', metric: 'pureza del CO₂ recuperado', reading: '99,93 %', baseline: '≥ 99,98 %', limits: 'aviso < 99,98 · crítico < 99,9 %', status: 'warning',
        note: 'Filtro de carbón activo saturado; orden abierta OT-2026-4533. Mientras tanto, la llenadora usa CO₂ comprado (lote CO2-2609-01).' },
      { code: 'FV-10', name: 'Fermentador FV-10 · Bardenas Tostada', area: 'Bodega de fermentación', metric: 'temperatura de fermentación', reading: '13,9 °C', baseline: '14,0 °C', limits: 'aviso ± 1,5 · crítico ± 3 °C', status: null, note: '' },
      { code: 'FV-11', name: 'Fermentador FV-11 · Bardenas Lager', area: 'Bodega de fermentación', metric: 'temperatura de fermentación', reading: '12,1 °C', baseline: '12,0 °C', limits: 'aviso > 13,5 · crítico > 15 °C', status: null, note: '' },
      { code: 'FV-14', name: 'Fermentador FV-14 · Bardenas Sin', area: 'Bodega de fermentación', metric: 'temperatura de guarda', reading: '0,4 °C', baseline: '0,0 °C', limits: 'aviso > 2 · crítico > 4 °C', status: null, note: '' },
      { code: 'BBT-3', name: 'Tanque de gobierno BBT-3', area: 'Bodega de filtración', metric: 'oxígeno disuelto', reading: '28 ppb', baseline: '≤ 40 ppb', limits: 'aviso > 40 · crítico > 60 ppb', status: null, note: '' },
      { code: 'SC-1', name: 'Sala de cocción', area: 'Cocimiento', metric: 'rendimiento del cocimiento', reading: '97,8 %', baseline: '≥ 97 %', limits: 'aviso < 96 · crítico < 94 %', status: null, note: '' },
      { code: 'PAST-1', name: 'Pasteurizador túnel PAST-1', area: 'Envasado · botella', metric: 'unidades de pasteurización', reading: '18 UP', baseline: '15–25 UP', limits: 'aviso < 15 o > 30 · crítico < 12', status: null, note: '' },
      { code: 'CIP-1', name: 'Estación CIP de bodega', area: 'Limpieza', metric: 'concentración de sosa', reading: '2,1 %', baseline: '2,0 %', limits: 'aviso < 1,8 · crítico < 1,5 %', status: null, note: '' },
      { code: 'WMS-BAR', name: 'Cámara de barriles (WMS Mecalux)', area: 'Almacén y expedición', metric: 'temperatura de la cámara', reading: '4,2 °C', baseline: '4,0 °C', limits: 'aviso > 7 · crítico > 10 °C', status: null, note: '' }
    ];

    const news = [
      { id: 'OT-2026-4588', equipment: 'FV-12', priority: 'Urgente · calidad', tone: 'crit', owner: 'Jefe de mantenimiento',
        action: 'Revisar y sustituir el actuador de la válvula de glicol VG-12 (orden 100 %, posición 0 %). Mientras, mantener el bypass manual. Retener el lote L2609-FV12 y pedir diacetilo y acetaldehído al LIMS requiere la aprobación del Maestro cervecero (PR-FER-003).' },
      { id: 'NC-2026-0142', equipment: 'LLB-1', priority: 'Alta · calidad', tone: 'crit', owner: 'Responsable de Calidad y Mantenimiento de envasado',
        action: 'Abrir no conformidad por O₂ disuelto alto en LLB-1 (78 ppb; máximo 50). Revisar la purga de CO₂ y las juntas del cabezal 3 antes de llenar barriles hoy y medir O₂ en 5 barriles por cabezal.' },
      { id: 'OT-2026-4589', equipment: 'GLY-1', priority: 'Media', tone: 'warn', owner: 'Mantenimiento de frío',
        action: 'Adelantar la vuelta a servicio del compresor 2 de la planta de glicol (impulsión −2,1 °C; consigna −4,0 °C) mientras la bodega está en fermentación tumultuosa.' },
      { id: 'OT-2026-4590', equipment: 'IBV', priority: 'Media', tone: 'warn', owner: 'Jefe de envasado',
        action: 'Revisar el despaletizador y las guías de LB-1 por desconchados del vidrio VID-2609-03 (1,9 % de rechazo) y registrar la incidencia de vidrio según PR-ENV-002.' }
    ];
    const updates = [
      { id: 'OT-2026-4517', equipment: 'LB-1', priority: 'Sin cambios', tone: 'warn', owner: 'Mantenimiento de envasado',
        action: 'Se añade el OEE de anoche (71 %) a la orden abierta de los tampones de la etiquetadora. No se crea una orden duplicada.' },
      { id: 'OT-2026-4533', equipment: 'CO2-REC', priority: 'Alta (propuesta)', tone: 'warn', owner: 'Mantenimiento de servicios',
        action: 'Se añade la pureza de hoy (99,93 %) a la orden abierta del filtro de carbón activo y se propone subir la prioridad: el CO₂ recuperado no puede usarse en la llenadora.' }
    ];

    return {
      title: 'Fábrica de Arguedas · turno de mañana',
      nav: 'Resumen del turno',
      clockLabel: 'Hora de fábrica',
      decider: 'Producción',
      kpis: [
        { label: 'Mosto en fermentación en FV-12', value: 480, unit: 'hl', sub: 'Lote L2609-FV12 · Bardenas Lager · día 3', icon: 'flask', tone: 'crit', href: '#alarma' },
        { label: 'Minutos por encima de 13,5 °C', value: 200, sub: 'Desde las 02:30 · pico de 17,1 °C a las 05:20', icon: 'thermometer', href: '#alarma' },
        { label: 'Reclamaciones abiertas', value: 1, sub: 'REC-2026-0093 · respuesta antes del 30/09 12:06', icon: 'mail', href: '#reclamacion' },
        { label: 'Equipos con alerta', value: '6 de 14', sub: '2 críticos · 4 avisos · lecturas de las 06:00', icon: 'gauge', action: 'scroll-parte' }
      ],
      map: {
        title: 'Mapa de la fábrica · Arguedas',
        sub: 'Lecturas del parte de las 06:00 y del SCADA de bodega a las 05:50 · pulsa un elemento para ver su ficha',
        icon: 'factory',
        readonly: 'Agentic Platform lee el SCADA de bodega, Brewmaxx, LIMS LabWare y WMS Mecalux; no actúa sobre válvulas ni consignas',
        zones: [
          { id: 'coc', title: 'Cocimiento', sub: 'Sala de cocción', items: [
            { code: 'SC-1', name: 'Sala de cocción', reading: '97,8 %', status: 'ok', kv: [['Cocimientos ayer', '6 × 120 hl'], ['Próximo', 'C-2609-071 · 07:30']] },
            { code: 'MOL-1', name: 'Molino de malta', reading: null, status: null, tags: ['MAL-2607-05'], note: 'Silo 2 con malta Pilsen del lote MAL-2607-05.', kv: [['Silo 2', 'MAL-2607-05 · 38 t']] },
            { code: 'CIP-1', name: 'CIP de bodega', reading: '2,1 % NaOH', status: 'ok' }
          ] },
          { id: 'bod', title: 'Bodega', sub: 'Fermentación y guarda', items: [
            { code: 'FV-12', name: 'Lager · día 3', reading: '16,8 °C', status: 'crit', tags: ['L2609-FV12'], go: 'alarma', goLabel: 'Abrir la alarma',
              note: 'Válvula de glicol VG-12 bloqueada en cerrado. Agentic Platform propone OT de la válvula, retener el lote con análisis de diacetilo y acetaldehído, y reprogramar el trasiego.',
              kv: [['Lote', 'L2609-FV12 · 480 hl'], ['Por encima de 13,5 °C', 'desde las 02:30'], ['Pico', '17,1 °C a las 05:20'], ['Trasiego previsto', '06/10/2026']] },
            { code: 'FV-10', name: 'Tostada', reading: '13,9 °C', status: 'ok' },
            { code: 'FV-11', name: 'Lager · día 6', reading: '12,1 °C', status: 'ok', note: 'Gemelo de FV-12 en el mismo circuito de glicol: descarta un fallo general del circuito.' },
            { code: 'FV-14', name: 'Sin · guarda', reading: '0,4 °C', status: 'ok' },
            { code: 'BBT-3', name: 'Tanque de gobierno', reading: '28 ppb O₂', status: 'ok', kv: [['Contenido', 'Bardenas Lager L2609-FV06 · 410 hl']] }
          ] },
          { id: 'env', title: 'Envasado', sub: 'Botella y barril', items: [
            { code: 'LLB-1', name: 'Llenadora de barriles', reading: '78 ppb O₂', status: 'crit', tags: ['L2608-K14'], go: 'reclamacion', goLabel: 'Abrir la reclamación', note: 'O₂ alto en el cabezal 3. LLB-1 llenó el lote L2608-K14, el de los barriles con sabor oxidado.', kv: [['Especificación', '≤ 50 ppb'], ['18/08 · L2608-K14', '64 ppb']] },
            { code: 'IBV', name: 'Inspector de vacías', reading: '1,9 % rechazo', status: 'warn' },
            { code: 'LB-1', name: 'Línea de botella', reading: '71 % OEE', status: 'warn', kv: [['Orden abierta', 'OT-2026-4517']] },
            { code: 'PAST-1', name: 'Pasteurizador', reading: '18 UP', status: 'ok' }
          ] },
          { id: 'alm', title: 'Almacén', sub: 'WMS Mecalux', items: [
            { code: 'WMS-BAR', name: 'Cámara de barriles', reading: '4,2 °C', status: 'ok', tags: ['L2608-K14'], go: 'retirada', goLabel: 'Simulacro de retirada', note: 'Quedan 96 barriles del lote L2608-K14 en almacén y 32 retenidos por calidad.', kv: [['L2608-K14 en almacén', '96 barriles'], ['Retenidos', '32 barriles']] },
            { code: 'EXP', name: 'Muelles', reading: '5 cargas hoy', status: null, kv: [['Primera carga', '08:00 · Pamplona']] }
          ] },
          { id: 'srv', title: 'Servicios', sub: 'Frío, CO₂ y vapor', items: [
            { code: 'GLY-1', name: 'Planta de glicol', reading: '−2,1 °C', status: 'warn', kv: [['Compresor 2', 'En mantenimiento']] },
            { code: 'CO2-REC', name: 'Recuperación de CO₂', reading: '99,93 %', status: 'warn', kv: [['Orden abierta', 'OT-2026-4533']] },
            { code: 'CAL-V', name: 'Caldera de vapor', reading: '9,6 bar', status: null }
          ] }
        ]
      },
      inbox: {
        alarm: {
          icon: 'thermometer',
          title: 'FV-12 · temperatura de fermentación fuera de consigna',
          meta: ['Alarma 05:50 · ALM-FV12-0550'],
          systems: ['SCADA bodega'],
          body: '16,8 °C frente a la consigna de 12 °C (límite 13,5 °C) desde las 02:30 por fallo de la válvula de glicol VG-12; pico de 17,1 °C a las 05:20. Lote L2609-FV12 de Bardenas Lager, 480 hl, día 3 de fermentación.'
        },
        complaint: {
          icon: 'mail',
          title: 'Reclamación REC-2026-0093 · barriles con sabor oxidado',
          meta: ['28/09 12:06', 'Distribuciones Hosteleras Ribera, S.L.', 'Tres bares'],
          body: 'Barriles de 30 l de Bardenas Lager con sabor a cartón (oxidación) en tres bares. Lote',
          trace: 'L2608-K14',
          after: 'envasado el 18/08/2026. Respuesta en 48 h.',
          due: 'Vence el 30/09 12:06',
          goLabel: 'Abrir reclamación'
        }
      },
      chart: {
        title: 'FV-12 · temperatura de fermentación',
        sub: 'Bardenas Lager · lote L2609-FV12 · consigna 12 °C · ahora 16,8 °C (05:50)',
        icon: 'thermometer',
        tabLabel: 'Temperatura',
        chart: {
          series: TEMP.map((v, i) => ({ time: hhmm(i), value: v })),
          unit: '°C',
          threshold: { value: 13.5, label: 'Límite 13,5 °C', legend: 'Límite 13,5 °C · 200 min por encima' },
          critical: { value: 15, label: 'Crítico 15 °C', legend: 'Crítico 15 °C · 130 min por encima' },
          peak: { x: '05:20', y: 17.1 },
          last: false,
          yTicks: [10, 12, 14, 16, 18],
          xTicks: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
          annotations: [{ x: '02:30', label: 'Límite 02:30' }],
          bands: [
            { from: '05:25', to: '05:50', label: 'Bypass manual' }
          ],
          seriesLabel: 'Mosto en FV-12 (TT-FV12-02)',
          shadeLabel: 'Por encima del límite 02:30–05:50'
        },
        events: [
          { time: '23:40', text: 'La válvula de glicol VG-12 no confirma la apertura (orden 100 %, posición 0 %); el SCADA solo lo registra como evento', tone: 'warn', tag: 'VG-12' },
          { time: '00:00', text: 'FV-12 a 12,2 °C y subiendo unos 0,5 °C/h: día 3, fermentación tumultuosa', tone: 'brand', tag: 'FV-12' },
          { time: '02:30', text: 'Supera 13,5 °C: alarma de aviso del SCADA, reconocida por el operador de bodega', tone: 'crit', tag: 'FV-12' },
          { time: '02:45', text: 'El operador fuerza VG-12 desde el SCADA sin respuesta y lo anota para el relevo', tone: 'warn', tag: 'VG-12' },
          { time: '03:40', text: 'Supera el nivel crítico de 15 °C', tone: 'crit', tag: 'FV-12' },
          { time: '05:20', text: 'Pico de 17,1 °C', tone: 'crit', tag: 'TT-FV12-02' },
          { time: '05:25', text: 'El operador abre a mano el bypass de glicol de FV-12: la temperatura empieza a bajar', tone: 'ok', tag: 'VG-12' },
          { time: '05:50', text: 'Alarma ALM-FV12-0550: 200 min por encima del límite; se escala al Maestro cervecero', tone: 'crit', tag: 'ALM-FV12-0550' }
        ],
        cause: 'Hipótesis a confirmar por Mantenimiento: actuador neumático de la válvula de glicol VG-12 bloqueado en cerrado (orden 100 %, posición 0 % desde las 23:40). En el día 3 la levadura genera el máximo calor de fermentación y, sin refrigeración, la temperatura sube. FV-11, en el mismo circuito, está en consigna, lo que descarta un fallo general del glicol. Riesgo de calidad: diacetilo y acetaldehído altos y ésteres fuera de perfil.',
        system: 'SCADA bodega',
        footer: 'Lectura cada 5 min'
      },
      parte: {
        agent: AGENT,
        title: 'Parte diario de equipos',
        sub: 'Lecturas de las 06:00 · 14 equipos de la Fábrica de Arguedas · umbrales de proceso',
        colItem: 'Equipo',
        systems: ['Brewmaxx (MES)', 'SCADA bodega'],
        inboxTitle: 'Parte diario de equipos · lecturas de las 06:00',
        inboxCount: '14 equipos',
        inboxPending: '2 críticos (FV-12 y la llenadora de barriles LLB-1) y 4 avisos pendientes de revisar.',
        items,
        news,
        updates,
        steps: [
          { agent: AGENT, system: 'Brewmaxx (MES)', action: 'Lee las lecturas de las 06:00 de 14 equipos (cocimiento, bodega, envasado, almacén y servicios)', result: '14 lecturas recibidas, sin huecos', ms: 600 },
          { agent: AGENT, system: 'SCADA bodega', action: 'Consulta temperaturas de fermentadores, válvulas de glicol y planta de frío', result: 'FV-12 a 16,8 °C con VG-12 sin abrir desde las 23:40; FV-11 en consigna', ms: 540, tone: 'crit' },
          { agent: AGENT, system: 'Agentic Platform', action: 'Compara cada lectura con sus umbrales de proceso (11 indicadores)', result: '2 críticos · 4 avisos · 8 sin incidencias', ms: 60, tone: 'crit' },
          { agent: AGENT, system: 'LIMS LabWare', action: 'Revisa los análisis de envasado de las últimas 24 h', result: 'LLB-1: O₂ disuelto de 78 ppb en el cabezal 3 (especificación ≤ 50 ppb)', ms: 450, tone: 'crit' },
          { agent: AGENT, system: 'LIMS LabWare', action: 'Busca el histórico de O₂ de LLB-1 en los lotes de barril con reclamación', result: 'L2608-K14 (18/08): 64 ppb, fuera de especificación, liberado con desviación', ms: 470, tone: 'warn' },
          { agent: AGENT, system: 'SAP S/4HANA', action: 'Cruza las alertas con las reclamaciones de clientes abiertas', result: 'REC-2026-0093: sabor oxidado en barriles del lote L2608-K14', ms: 360, tone: 'warn' },
          { agent: AGENT, system: 'WMS Mecalux', action: 'Localiza el stock del lote L2608-K14', result: '96 barriles en la cámara de barriles y 32 retenidos por calidad', ms: 330 },
          { agent: AGENT, system: 'GMAO Maximo', action: 'Busca órdenes abiertas de los equipos con alerta', result: 'OT-2026-4517 (LB-1) y OT-2026-4533 (CO₂) ya abiertas', ms: 440 },
          { agent: AGENT, system: 'Modelo de lenguaje', action: 'Redacta la acción recomendada de cada alerta (6 llamadas)', result: '6 borradores, cada uno con su procedimiento de referencia (PR-FER-003, PR-ENV-002, APPCC-01)', ms: 5700 },
          { agent: AGENT, system: 'GMAO Maximo', action: 'Crea OT-2026-4588 para FV-12 (válvula VG-12) · prioridad urgente', result: 'Creada y asignada al Jefe de mantenimiento', ms: 250, tone: 'ok' },
          { agent: AGENT, system: 'SAP S/4HANA', action: 'Abre la no conformidad NC-2026-0142 para LLB-1 · prioridad alta', result: 'Creada y asignada a Calidad y a Mantenimiento de envasado', ms: 280, tone: 'ok' },
          { agent: AGENT, system: 'GMAO Maximo', action: 'Crea OT-2026-4589 para GLY-1 · prioridad media', result: 'Creada y asignada a Mantenimiento de frío', ms: 220, tone: 'ok' },
          { agent: AGENT, system: 'GMAO Maximo', action: 'Crea OT-2026-4590 para IBV-1 · prioridad media', result: 'Creada y asignada al Jefe de envasado', ms: 220, tone: 'ok' },
          { agent: AGENT, system: 'GMAO Maximo', action: 'Actualiza OT-2026-4517 (etiquetadora de LB-1) con el OEE de anoche', result: 'Lectura añadida · sin orden duplicada', ms: 200 },
          { agent: AGENT, system: 'GMAO Maximo', action: 'Actualiza OT-2026-4533 (filtro de CO₂) con la pureza de hoy', result: 'Lectura añadida · prioridad alta propuesta · sin orden duplicada', ms: 200 },
          { agent: AGENT, system: 'Microsoft Teams', action: 'Publica el resumen en el canal «Producción · Arguedas»', result: 'Enviado: 2 críticos, 4 avisos y 4 tickets', ms: 390, tone: 'ok' }
        ],
        stats: [
          { label: 'Equipos revisados', value: 14 },
          { label: 'Tickets creados', value: 4, tone: 'ok' },
          { label: 'Órdenes actualizadas, sin duplicar', value: 2 },
          { label: 'Hectolitros a retener (propuesta)', value: 480, tone: 'crit' }
        ],
        relation: {
          title: 'Posible relación con la reclamación REC-2026-0093',
          body: 'La llenadora de barriles LLB-1 da hoy 78 ppb de oxígeno disuelto en el cabezal 3 (especificación ≤ 50 ppb). El lote L2608-K14, el de los barriles con sabor a cartón que reclama Distribuciones Hosteleras Ribera, se llenó en LLB-1 el 18/08/2026 y su registro en el LIMS ya marcaba 64 ppb: se liberó con desviación.',
          more: 'El oxígeno en el envasado es la causa más común del sabor a cartón (trans-2-nonenal). PR-CAL-006 pide valorar la retirada del lote (912 barriles en 14 clientes). A confirmar por Calidad.',
          plain: 'LLB-1 da hoy 78 ppb de O₂ (especificación ≤ 50 ppb). El lote L2608-K14 de la reclamación REC-2026-0093 se llenó en LLB-1 el 18/08/2026 con 64 ppb y se liberó con desviación. El oxígeno en el envasado es la causa más común del sabor a cartón. PR-CAL-006 pide valorar la retirada del lote (912 barriles en 14 clientes). A confirmar por Calidad.',
          go: 'reclamacion',
          goLabel: 'Abrir la reclamación'
        },
        policy: 'Política aplicada: las órdenes de mantenimiento y las no conformidades se crean sin aprobación previa; retener un lote, cambiar el plan de trasiego o retirar producto requiere la aprobación del Maestro cervecero o de Calidad (PR-FER-003, PR-CAL-006).',
        channel: 'Producción · Arguedas',
        resultSummary: '3 órdenes creadas en GMAO Maximo, 1 no conformidad en SAP, 2 órdenes existentes actualizadas y resumen publicado en Microsoft Teams.',
        auditRequest: 'Fábrica de Arguedas · lecturas de las 06:00 · 14 equipos',
        auditNew: 'Ticket creado',
        auditUpdate: 'Orden de mantenimiento actualizada',
        reportTitle: 'Parte diario de equipos · Fábrica de Arguedas',
        reportCode: 'PD-ARG-20260929',
        reportMeta: [['Fábrica', 'Arguedas (Navarra)'], ['Turno', 'Mañana'], ['Equipos revisados', '14'], ['Críticos · avisos', '2 · 4']],
        reportSummary: 'De 14 equipos revisados, 2 están en estado crítico y 4 en aviso. El fermentador FV-12 (lote L2609-FV12, 480 hl) supera 13,5 °C desde las 02:30 por la válvula de glicol VG-12 bloqueada. La llenadora de barriles LLB-1 da oxígeno disuelto alto, el mismo defecto registrado al llenar el lote L2608-K14 de la reclamación REC-2026-0093. Se han creado 3 órdenes de mantenimiento y 1 no conformidad, y se han actualizado 2 órdenes existentes, sin duplicarlas.',
        signatures: [{ role: 'Jefa de producción', note: 'Revisado' }, { role: 'Maestro cervecero', note: 'Recibido' }]
      },
      presenter: {
        say: [
          'Así empieza el turno la Jefa de producción en Arguedas: lo que pide una decisión, en una sola bandeja.',
          'Los datos llegan de sus sistemas: temperaturas del SCADA de bodega, lotes de Brewmaxx y SAP, análisis del LIMS, barriles del WMS y órdenes de Maximo. Aquí son sintéticos, pero coherentes entre sí.',
          'El mapa resume la fábrica de un vistazo: gris lo normal, color lo que pide atención. FV-12 está en rojo; al pulsarlo se ve el lote, la válvula de glicol y lo que propone Agentic Platform.',
          'Tres asuntos: la temperatura de FV-12 de las 05:50 (480 hl de Bardenas Lager en día 3), la reclamación de barriles con sabor oxidado y el parte con 2 críticos.'
        ],
        sayBefore: ['Generar parte diario: revisa 14 equipos, no duplica órdenes abiertas y crea los tickets. Fijaos en el tiempo.'],
        sayAfter: [
          'Relación que encuentra Agentic Platform: la llenadora de barriles mete oxígeno de más, y el lote reclamado se llenó allí con 64 ppb. Nadie ha tenido que cruzar el LIMS, SAP y el WMS.',
          'Y no duplica: dos órdenes ya abiertas se actualizan en lugar de abrir tickets nuevos.'
        ],
        next: 'Pulsar «Generar parte diario» y comentar el registro mientras se ejecuta.',
        nextAfter: 'Ir a «De palabras a workflow» (flecha derecha) para crear la respuesta a la alarma de FV-12 a partir del procedimiento escrito.'
      }
    };
  })()
});
