/* Mercados Moncayo · resumen del turno (escena «turno»). Datos sintéticos de demostración (MFM). */
agenticPack('retail', {
  turno: (function () {
    'use strict';
    const hhmm = (i) => `${String(Math.floor((i * 5) / 60)).padStart(2, '0')}:${String((i * 5) % 60).padStart(2, '0')}`;
    /* Temperatura de aire del mural MR-3 de T-027 (sonda TS-T027-MR3), cada 5 min de 00:00 a 05:50. */
    const AIR = [3.2, 3.0, 3.2, 3.2, 3.2, 3.2, 3.2, 3.2, 3.1, 3.2, 3.2, 3.2, 3.7, 4.3, 4.3, 4.2, 4.2, 3.8, 3.3, 3.3, 3.3, 3.3, 3.2, 3.2,
      3.3, 3.3, 3.3, 3.3, 3.3, 3.2, 3.3, 3.2, 3.2, 3.2, 3.3, 3.3, 3.2, 3.2, 3.4, 3.5, 3.8, 4.0, 4.2, 4.3, 4.6, 4.7, 4.8, 5.1,
      5.3, 5.6, 5.8, 6.2, 6.4, 6.6, 7.0, 7.2, 7.4, 7.8, 8.1, 8.3, 8.5, 8.7, 9.0, 9.1, 9.4, 9.6, 9.8, 9.7, 9.5, 9.4, 9.4];
    const AGENT = 'Parte diario de operaciones';

    const items = [
      { code: 'T027-MR3', name: 'Mural de lácteos MR-3 · T-027 Huesca Centro', tag: 'APPCC', area: 'Tiendas · zona Huesca', metric: 'temperatura de aire del mural', reading: '9,4 °C', baseline: '3,0 °C', limits: 'aviso > 5 · crítico > 8 °C', status: 'critical',
        note: 'Por encima de 5 °C desde las 03:55 por fallo del ventilador del evaporador; pico de 9,8 °C a las 05:30. 318 unidades de refrigerados dentro.' },
      { code: 'REC-VID', name: 'Recepción en plataforma · roturas de vidrio', tag: 'Cuerpos extraños', area: 'Plataforma de Plaza · muelles de recepción', metric: 'envases de vidrio rotos en recepción (7 días)', reading: '0,42 %', baseline: '0,05 %', limits: 'aviso > 0,1 · crítico > 0,3 %', status: 'critical',
        note: 'Tres palés de Conservas del Jalón con tarros rotos esta semana (tomate frito y salsas). En la recepción del lote L26214, el 05/08, ya se anotaron 14 tarros rotos en un palé.' },
      { code: 'T014-CF', name: 'Cámara de frescos · T-014 Calatayud', area: 'Tiendas · zona Zaragoza provincia', metric: 'temperatura de aire de la cámara', reading: '4,6 °C', baseline: '2,0 °C', limits: 'aviso > 4 · crítico > 6 °C', status: 'warning',
        note: 'La puerta de la cámara quedó mal cerrada tras la descarga de las 05:10; el encargado la ha cerrado a las 05:48 y la temperatura baja.' },
      { code: 'MUE-EXP', name: 'Muelles de expedición de la plataforma', area: 'Plataforma de Plaza', metric: 'palés pendientes de cargar a las 06:00', reading: '46', baseline: '≤ 20', limits: 'aviso > 25 · crítico > 60', status: 'warning',
        note: 'La ruta de Huesca (7 tiendas) sale con 50 min de retraso por la baja de un conductor; la tienda T-027 recibe a las 08:40.' },
      { code: 'TPV', name: 'TPV de tiendas', area: 'Sistemas de tienda', metric: 'tiendas con algún TPV fuera de línea', reading: '3 de 64', baseline: '0', limits: 'aviso ≥ 2 · crítico ≥ 6', status: 'warning',
        note: 'T-033, T-048 y T-052 sin sincronizar precios desde el cierre; incidencia abierta INC0031490 por el certificado del servidor de tienda.' },
      { code: 'SNS', name: 'Sondas de los Sensores de frío', area: 'Sistemas de tienda', metric: 'sondas sin comunicación', reading: '5 de 1.284', baseline: '≤ 2', limits: 'aviso > 3 · crítico > 10', status: 'warning',
        note: 'Cinco sondas de T-019 y T-044 sin dato desde el corte de luz del domingo; incidencia abierta INC0031497.' },
      { code: 'T027-CL', name: 'Cámara de lácteos · T-027 Huesca Centro', area: 'Tiendas · zona Huesca', metric: 'temperatura de aire de la cámara', reading: '2,9 °C', baseline: '3,0 °C', limits: 'aviso > 5 · crítico > 8 °C', status: null, note: '' },
      { code: 'T011-MR', name: 'Murales refrigerados · T-011 Zaragoza Delicias', area: 'Tiendas · Zaragoza capital', metric: 'temperatura media de los murales', reading: '3,1 °C', baseline: '3,0 °C', limits: 'aviso > 5 · crítico > 8 °C', status: null, note: '' },
      { code: 'CF-1', name: 'Cámara de refrigerados CF-1 de la plataforma', area: 'Plataforma de Plaza', metric: 'temperatura de aire', reading: '2,8 °C', baseline: '2,5 °C', limits: 'aviso > 4 · crítico > 6 °C', status: null, note: '' },
      { code: 'CC-1', name: 'Cámara de congelados CC-1 de la plataforma', area: 'Plataforma de Plaza', metric: 'temperatura de aire', reading: '−22,4 °C', baseline: '−22,0 °C', limits: 'aviso > −18 · crítico > −15 °C', status: null, note: '' },
      { code: 'FLOTA', name: 'Flota frigorífica en ruta', area: 'Transporte', metric: 'temperatura máxima registrada en caja', reading: '3,4 °C', baseline: '≤ 4 °C', limits: 'aviso > 5 · crítico > 7 °C', status: null, note: '' },
      { code: 'WMS-PCK', name: 'Preparación de pedidos (WMS Manhattan)', area: 'Plataforma de Plaza', metric: 'líneas preparadas sin error', reading: '99,7 %', baseline: '≥ 99,5 %', limits: 'aviso < 99,5 · crítico < 99 %', status: null, note: '' },
      { code: 'VTA', name: 'Ventas de ayer en las 64 tiendas', area: 'Comercial', metric: 'desviación sobre la previsión', reading: '−1,2 %', baseline: '± 3 %', limits: 'aviso ± 5 · crítico ± 10 %', status: null, note: '' },
      { code: 'ROT', name: 'Roturas de stock en lineal', area: 'Tiendas · todas', metric: 'referencias sin stock a la apertura (previsión)', reading: '0,8 %', baseline: '≤ 1,5 %', limits: 'aviso > 2 · crítico > 4 %', status: null, note: '' }
    ];

    const news = [
      { id: 'INC0031522', equipment: 'T027-MR3', priority: 'Urgente · APPCC', tone: 'crit', owner: 'Mantenimiento de frío (Frío Industrial Oscense)',
        action: 'Cambiar el motor del ventilador del evaporador de MR-3 antes de la apertura (09:00). Retirar y trasladar el producto a la cámara, y bloquear su venta en TPV, requiere la aprobación de Calidad (APPCC-TIE-01).' },
      { id: 'INC-PRO-2026-0059', equipment: 'REC-VID', priority: 'Alta · proveedor', tone: 'crit', owner: 'Calidad de proveedores',
        action: 'Abrir incidencia a Conservas del Jalón por roturas de vidrio repetidas (0,42 % en 7 días; 3 palés). Pedir su análisis de causas del paletizado y del control de vidrio en línea (PR-PRO-006).' },
      { id: 'INC0031523', equipment: 'T014-CF', priority: 'Media', tone: 'warn', owner: 'Jefe de zona de tiendas',
        action: 'Revisar con T-014 el cierre de la cámara de frescos tras la descarga y verificar a las 08:00 que vuelve por debajo de 4 °C. Si no baja, aviso a Mantenimiento de frío.' },
      { id: 'TASK0012870', equipment: 'MUE-EXP', priority: 'Media', tone: 'warn', owner: 'Jefe de plataforma',
        action: 'Reasignar un conductor de la ruta de Teruel a la de Huesca y avisar a las 7 tiendas del retraso; priorizar la carga del pedido de T-027 por la reposición de refrigerados.' }
    ];
    const updates = [
      { id: 'INC0031490', equipment: 'TPV', priority: 'Alta (propuesta)', tone: 'warn', owner: 'Sistemas de tienda',
        action: 'Se añaden las tres tiendas de hoy (T-033, T-048 y T-052) a la incidencia abierta del certificado y se propone subir la prioridad: sin sincronizar no reciben bloqueos de venta.' },
      { id: 'INC0031497', equipment: 'SNS', priority: 'Sin cambios', tone: 'warn', owner: 'Mantenimiento de frío',
        action: 'Se añade la lectura de hoy (5 sondas sin dato) a la incidencia abierta del corte de luz. No se crea una incidencia duplicada.' }
    ];

    return {
      title: 'Plataforma de Plaza y tiendas · turno de mañana',
      nav: 'Resumen del turno',
      clockLabel: 'Hora de la plataforma',
      decider: 'Operaciones',
      kpis: [
        { label: 'Unidades expuestas en el mural MR-3', value: 318, sub: 'T-027 Huesca Centro · yogures, postres y frescos', icon: 'thermometer', tone: 'crit', href: '#alarma' },
        { label: 'Minutos por encima de 5 °C', value: 115, sub: 'Desde las 03:55 · pico de 9,8 °C a las 05:30', icon: 'clock', href: '#alarma' },
        { label: 'Reclamaciones de consumidor', value: 1, sub: 'ATC-2026-0412 · respuesta antes del 30/09 21:37', icon: 'mail', href: '#reclamacion' },
        { label: 'Elementos con alerta', value: '6 de 14', sub: '2 críticos · 4 avisos · lecturas de las 06:00', icon: 'gauge', action: 'scroll-parte' }
      ],
      map: {
        title: 'Mapa de la operación · plataforma y 64 tiendas',
        sub: 'Lecturas del parte de las 06:00 y de los Sensores de frío a las 05:50 · pulsa un elemento para ver su ficha',
        icon: 'warehouse',
        readonly: 'Agentic Platform lee Sensores de frío, WMS Manhattan, SAP S/4 Retail y TPV de tiendas; no cambia consignas ni bloquea ventas sin aprobación',
        zones: [
          { id: 'rec', title: 'Recepción', sub: 'Plataforma de Plaza', items: [
            { code: 'REC-VID', name: 'Control de vidrio', reading: '0,42 % roturas', status: 'crit', tags: ['L26214'], go: 'reclamacion', goLabel: 'Abrir la reclamación',
              note: 'Conservas del Jalón acumula tres palés con tarros rotos esta semana. Es el fabricante del tomate frito de la reclamación ATC-2026-0412.', kv: [['Proveedor', 'Conservas del Jalón, S.L.'], ['Palés con roturas (7 días)', '3 de 41'], ['Lote L26214', '14 tarros rotos en la recepción del 05/08']] },
            { code: 'MUE-REC', name: 'Muelles de recepción', reading: '18 camiones', status: null, kv: [['Previstos hoy', '18 proveedores'], ['Primera descarga', '05:30']] }
          ] },
          { id: 'pla', title: 'Almacén', sub: 'WMS Manhattan', items: [
            { code: 'CF-1', name: 'Refrigerados', reading: '2,8 °C', status: 'ok', kv: [['Palés', '1.140'], ['Consigna', '2,5 °C']] },
            { code: 'CC-1', name: 'Congelados', reading: '−22,4 °C', status: 'ok', kv: [['Palés', '860']] },
            { code: 'SECO', name: 'Seco y conservas', reading: '480 tarros L26214', status: null, tags: ['L26214'], go: 'retirada', goLabel: 'Simulacro de retirada', note: 'Quedan 480 tarros de Tomate frito Moncayo 400 g del lote L26214 en la ubicación P-12-04-2.', kv: [['Ubicación', 'P-12-04-2'], ['Estado', 'Disponible para servir']] },
            { code: 'WMS-PCK', name: 'Preparación', reading: '99,7 %', status: 'ok' }
          ] },
          { id: 'exp', title: 'Expedición', sub: 'Rutas a tienda', items: [
            { code: 'MUE-EXP', name: 'Muelles de expedición', reading: '46 palés', status: 'warn', note: 'Ruta de Huesca con 50 min de retraso por la baja de un conductor.', kv: [['Rutas hoy', '12'], ['Ruta con retraso', 'Huesca · 7 tiendas']] },
            { code: 'FLOTA', name: 'Flota frigorífica', reading: '3,4 °C máx.', status: 'ok', kv: [['Camiones en ruta', '9']] }
          ] },
          { id: 'hu', title: 'Tiendas Huesca', sub: '9 tiendas', items: [
            { code: 'T027-MR3', name: 'T-027 · mural MR-3', reading: '9,4 °C', status: 'crit', go: 'alarma', goLabel: 'Abrir la alarma',
              note: 'Ventilador del evaporador parado desde las 03:10. Agentic Platform propone retirar y trasladar el producto a la cámara, OT urgente y bloquear en TPV lo expuesto más de 2 h.',
              kv: [['Unidades dentro', '318'], ['Por encima de 5 °C', 'desde las 03:55'], ['Pico', '9,8 °C a las 05:30'], ['Apertura de la tienda', '09:00']] },
            { code: 'T027-CL', name: 'T-027 · cámara', reading: '2,9 °C', status: 'ok', note: 'Hueco para unos 400 envases: destino propuesto del traslado.', kv: [['Capacidad libre', '≈ 1,2 m³']] },
            { code: 'T031', name: 'T-031 Monzón', reading: '3,0 °C', status: 'ok' }
          ] },
          { id: 'zg', title: 'Tiendas Zaragoza', sub: '38 tiendas', items: [
            { code: 'T011-MR', name: 'T-011 Delicias', reading: '3,1 °C', status: 'ok', tags: ['L26214'], go: 'reclamacion', goLabel: 'Abrir la reclamación', note: 'Tienda donde se compró el tarro de la reclamación ATC-2026-0412.', kv: [['L26214 en lineal', '36 tarros']] },
            { code: 'T014-CF', name: 'T-014 Calatayud', reading: '4,6 °C', status: 'warn', kv: [['Puerta', 'cerrada a las 05:48']] },
            { code: 'TPV', name: 'TPV de tiendas', reading: '3 fuera de línea', status: 'warn', kv: [['Incidencia', 'INC0031490']] },
            { code: 'SNS', name: 'Sondas de frío', reading: '5 sin dato', status: 'warn', kv: [['Incidencia', 'INC0031497']] }
          ] }
        ]
      },
      inbox: {
        alarm: {
          icon: 'thermometer',
          title: 'T-027 Huesca Centro · mural de lácteos MR-3',
          meta: ['Alarma 05:50 · ALM-T027-0550'],
          systems: ['Sensores de frío'],
          body: '9,4 °C frente al límite de 5 °C desde las 03:55 por fallo del ventilador del evaporador; pico de 9,8 °C a las 05:30. Dentro hay 318 unidades de refrigerados; la tienda abre a las 09:00.'
        },
        complaint: {
          icon: 'mail',
          title: 'Reclamación ATC-2026-0412 · vidrio en tomate frito',
          meta: ['28/09 21:37', 'Javier Lasheras', 'App de fidelización'],
          body: 'Fragmento de vidrio en un tarro de Tomate frito Moncayo 400 g comprado en T-011 Zaragoza Delicias. Lote',
          trace: 'L26214',
          after: 'Fabricante: Conservas del Jalón, S.L. Respuesta al consumidor en 48 h.',
          due: 'Vence el 30/09 21:37',
          goLabel: 'Abrir reclamación'
        }
      },
      chart: {
        title: 'T-027 · temperatura del mural MR-3',
        sub: 'Mural de lácteos de Huesca Centro · consigna 3 °C · ahora 9,4 °C (05:50)',
        icon: 'thermometer',
        tabLabel: 'Temperatura',
        chart: {
          series: AIR.map((v, i) => ({ time: hhmm(i), value: v })),
          unit: '°C',
          threshold: { value: 5, label: 'Límite 5 °C', legend: 'Límite 5 °C · 115 min por encima' },
          critical: { value: 8, label: 'Crítico 8 °C', legend: 'Crítico 8 °C · 60 min por encima' },
          peak: { x: '05:30', y: 9.8 },
          last: false,
          yTicks: [0, 2, 4, 6, 8, 10, 12],
          xTicks: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
          annotations: [{ x: '03:10', label: 'Ventilador parado 03:10' }],
          bands: [
            { from: '01:00', to: '01:20', label: 'Desescarche' },
            { from: '03:10', to: '05:50', label: 'Ventilador del evaporador sin consumo', tone: 'warn' }
          ],
          seriesLabel: 'Aire del mural (TS-T027-MR3)',
          shadeLabel: 'Por encima del límite 03:55–05:50'
        },
        events: [
          { time: '01:00', end: '01:20', text: 'Desescarche programado del mural MR-3 (sube a 4,3 °C, dentro de lo normal)', tone: 'brand', tag: 'MR-3' },
          { time: '03:10', text: 'El ventilador del evaporador deja de consumir (0 A): fallo probable del motor', tone: 'warn', tag: 'EV-MR3' },
          { time: '03:55', text: 'La temperatura supera 5 °C: aviso de los Sensores de frío a la central de alarmas (tienda cerrada)', tone: 'crit', tag: 'TS-T027-MR3' },
          { time: '04:20', text: 'La central llama al encargado de T-027; no contesta (fuera de turno)', tone: 'warn', tag: 'Central' },
          { time: '04:50', text: 'Supera el nivel crítico de 8 °C', tone: 'crit', tag: 'TS-T027-MR3' },
          { time: '05:30', text: 'Pico de 9,8 °C', tone: 'crit', tag: 'TS-T027-MR3' },
          { time: '05:50', text: 'Alarma ALM-T027-0550: 115 min por encima de 5 °C; se escala a la Responsable de Calidad', tone: 'crit', tag: 'ALM-T027-0550' }
        ],
        cause: 'Hipótesis a confirmar por Mantenimiento de frío: fallo del motor del ventilador del evaporador de MR-3 (consumo 0 A desde las 03:10). El compresor sigue funcionando, pero sin circulación de aire el mural pierde frío; la cortina nocturna bajada frenó la subida.',
        system: 'Sensores de frío',
        footer: 'Lectura cada 5 min'
      },
      parte: {
        agent: AGENT,
        title: 'Parte diario de operaciones',
        sub: 'Lecturas de las 06:00 · 14 elementos de la plataforma y las tiendas · umbrales APPCC y de servicio',
        colItem: 'Elemento',
        systems: ['Sensores de frío', 'WMS Manhattan'],
        inboxTitle: 'Parte diario de operaciones · lecturas de las 06:00',
        inboxCount: '14 elementos',
        inboxPending: '2 críticos (el mural MR-3 de T-027 y las roturas de vidrio en recepción) y 4 avisos pendientes de revisar.',
        items,
        news,
        updates,
        steps: [
          { agent: AGENT, system: 'Sensores de frío', action: 'Lee las 1.284 sondas de murales y cámaras de las 64 tiendas y de la plataforma', result: '1.279 lecturas recibidas; 5 sondas sin dato (T-019 y T-044)', ms: 680 },
          { agent: AGENT, system: 'WMS Manhattan', action: 'Consulta recepción, preparación y muelles de expedición de la plataforma', result: '46 palés pendientes de cargar; 3 palés con tarros rotos en 7 días', ms: 520, tone: 'warn' },
          { agent: AGENT, system: 'TPV tiendas', action: 'Revisa el estado de los TPV y las ventas de ayer', result: '3 tiendas con TPV fuera de línea; ventas −1,2 % sobre la previsión', ms: 410 },
          { agent: AGENT, system: 'Agentic Platform', action: 'Compara cada lectura con sus umbrales APPCC y de servicio (12 indicadores)', result: '2 críticos · 4 avisos · 8 sin incidencias', ms: 60, tone: 'crit' },
          { agent: AGENT, system: 'SAP S/4 Retail', action: 'Lista el surtido del mural MR-3 de T-027 con sus lotes', result: '318 unidades de 12 referencias (yogures, postres, leche fresca, nata y mantequilla)', ms: 450, tone: 'crit' },
          { agent: AGENT, system: 'SAP S/4 Retail', action: 'Cruza las roturas de vidrio con proveedores y lotes', result: 'Conservas del Jalón: 3 palés esta semana; en L26214 ya hubo 14 tarros rotos en la recepción del 05/08', ms: 430, tone: 'warn' },
          { agent: AGENT, system: 'CRM Fidelización', action: 'Cruza las alertas con las reclamaciones abiertas de consumidores', result: 'ATC-2026-0412: vidrio en Tomate frito Moncayo 400 g, lote L26214', ms: 360, tone: 'warn' },
          { agent: AGENT, system: 'ServiceNow', action: 'Busca incidencias abiertas de los elementos con alerta', result: 'INC0031490 (TPV) e INC0031497 (sondas) ya abiertas', ms: 420 },
          { agent: AGENT, system: 'Modelo de lenguaje', action: 'Redacta la acción recomendada de cada alerta (6 llamadas)', result: '6 borradores, cada uno con su procedimiento de referencia (APPCC-TIE-01, PR-PRO-006, PR-CAL-010)', ms: 5700 },
          { agent: AGENT, system: 'ServiceNow', action: 'Crea INC0031522 para el mural MR-3 de T-027 · prioridad urgente', result: 'Creada y asignada a Mantenimiento de frío (Frío Industrial Oscense)', ms: 250, tone: 'ok' },
          { agent: AGENT, system: 'ServiceNow', action: 'Crea INC-PRO-2026-0059 para Conservas del Jalón · prioridad alta', result: 'Creada y asignada a Calidad de proveedores', ms: 260, tone: 'ok' },
          { agent: AGENT, system: 'ServiceNow', action: 'Crea INC0031523 para la cámara de T-014 · prioridad media', result: 'Creada y asignada al Jefe de zona de tiendas', ms: 220, tone: 'ok' },
          { agent: AGENT, system: 'ServiceNow', action: 'Crea TASK0012870 para los muelles de expedición · prioridad media', result: 'Creada y asignada al Jefe de plataforma', ms: 220, tone: 'ok' },
          { agent: AGENT, system: 'ServiceNow', action: 'Actualiza INC0031490 (TPV) con las tiendas de hoy', result: 'Lectura añadida · prioridad alta propuesta · sin incidencia duplicada', ms: 200 },
          { agent: AGENT, system: 'ServiceNow', action: 'Actualiza INC0031497 (sondas) con la lectura de hoy', result: 'Lectura añadida · sin incidencia duplicada', ms: 200 },
          { agent: AGENT, system: 'Microsoft Teams', action: 'Publica el resumen en el canal «Operaciones · Plataforma y tiendas»', result: 'Enviado: 2 críticos, 4 avisos y 4 tickets', ms: 390, tone: 'ok' }
        ],
        stats: [
          { label: 'Elementos revisados', value: 14 },
          { label: 'Tickets creados', value: 4, tone: 'ok' },
          { label: 'Incidencias actualizadas, sin duplicar', value: 2 },
          { label: 'Unidades a retirar del mural', value: 318, tone: 'crit' }
        ],
        relation: {
          title: 'Posible relación con la reclamación ATC-2026-0412',
          body: 'En la recepción de la plataforma se repiten las roturas de vidrio de Conservas del Jalón: tres palés esta semana y una tasa del 0,42 % (referencia 0,05 %). El lote L26214 del Tomate frito Moncayo 400 g, el de la reclamación de Javier Lasheras por un fragmento de vidrio, ya llegó el 05/08 con 14 tarros rotos en un palé, y el fabricante notificó una rotura en su llenadora durante ese mismo lote (INC-PRO-2026-0049).',
          more: 'Un tarro roto en el palé puede proyectar fragmentos sobre tarros sanos. PR-CAL-010 pide valorar la retirada del lote (4.320 tarros servidos a 41 tiendas). A confirmar por Calidad.',
          plain: 'Roturas de vidrio repetidas de Conservas del Jalón en la recepción (3 palés esta semana, 0,42 %; referencia 0,05 %). El lote L26214 de la reclamación ATC-2026-0412 ya llegó el 05/08 con 14 tarros rotos en un palé y el fabricante notificó una rotura en su llenadora durante ese lote (INC-PRO-2026-0049). PR-CAL-010 pide valorar la retirada del lote (4.320 tarros en 41 tiendas). A confirmar por Calidad.',
          go: 'reclamacion',
          goLabel: 'Abrir la reclamación'
        },
        policy: 'Política aplicada: las incidencias de ServiceNow se crean sin aprobación previa; retirar producto del lineal, bloquear su venta en TPV o iniciar una retirada de lote requiere la aprobación de la Responsable de Calidad (APPCC-TIE-01, PR-CAL-010).',
        channel: 'Operaciones · Plataforma y tiendas',
        resultSummary: '4 incidencias y tareas creadas en ServiceNow, 2 incidencias existentes actualizadas y resumen publicado en Microsoft Teams.',
        auditRequest: 'Plataforma de Plaza y 64 tiendas · lecturas de las 06:00 · 14 elementos',
        auditNew: 'Ticket creado en ServiceNow',
        auditUpdate: 'Incidencia actualizada en ServiceNow',
        reportTitle: 'Parte diario de operaciones · Plataforma de Plaza y tiendas',
        reportCode: 'PD-PLZ-20260929',
        reportMeta: [['Centro', 'Plataforma de Plaza · 64 tiendas'], ['Turno', 'Mañana'], ['Elementos revisados', '14'], ['Críticos · avisos', '2 · 4']],
        reportSummary: 'De 14 elementos revisados, 2 están en estado crítico y 4 en aviso. El mural de lácteos MR-3 de T-027 Huesca Centro supera 5 °C desde las 03:55 por fallo del ventilador del evaporador, con 318 unidades dentro. En la recepción de la plataforma se repiten las roturas de vidrio de Conservas del Jalón, fabricante del lote L26214 de la reclamación ATC-2026-0412. Se han creado 4 incidencias y tareas y se han actualizado 2 existentes, sin duplicarlas.',
        signatures: [{ role: 'Directora de Operaciones', note: 'Revisado' }, { role: 'Responsable de Calidad', note: 'Recibido' }]
      },
      presenter: {
        say: [
          'Así empieza el turno la Directora de Operaciones de Mercados Moncayo: lo que pide una decisión, en una sola bandeja.',
          'Los datos llegan de sus sistemas: temperaturas de los Sensores de frío, palés del WMS Manhattan, lotes y surtido de SAP, ventas de los TPV y reclamaciones del CRM. Aquí son sintéticos, pero coherentes entre sí.',
          'El mapa resume la plataforma y las tiendas de un vistazo: gris lo normal, color lo que pide atención. El mural MR-3 de Huesca está en rojo; al pulsarlo se ve qué hay dentro y qué propone Agentic Platform.',
          'Tres asuntos: el mural de lácteos de T-027 de las 05:50 (318 unidades, la tienda abre a las 09:00), la reclamación de vidrio en tomate frito Moncayo y el parte con 2 críticos.'
        ],
        sayBefore: ['Generar parte diario: revisa 14 elementos, no duplica incidencias abiertas y crea los tickets. Fijaos en el tiempo.'],
        sayAfter: [
          'Relación que encuentra Agentic Platform: el fabricante del tomate frito de la reclamación acumula roturas de vidrio en la recepción, y el mismo lote ya llegó con tarros rotos. Nadie ha tenido que cruzar el WMS, SAP y el CRM.',
          'Y no duplica: dos incidencias ya abiertas se actualizan en lugar de abrir tickets nuevos.'
        ],
        next: 'Pulsar «Generar parte diario» y comentar el registro mientras se ejecuta.',
        nextAfter: 'Ir a «De palabras a workflow» (flecha derecha) para crear la respuesta a la alarma del mural a partir del procedimiento escrito.'
      }
    };
  })()
});
