/* Hidromec Ebro · resumen del turno (escena «turno»). Datos sintéticos de demostración (MFM). */
agenticPack('maquinaria', {
  turno: (function () {
    'use strict';
    const hhmm = (i) => `${String(Math.floor((i * 5) / 60)).padStart(2, '0')}:${String((i * 5) % 60).padStart(2, '0')}`;
    /* RMS medio del husillo de MC-04 cada 5 min, de 00:00 a 05:50 (sensor VS-MC04-01). */
    const RMS = [2.1, 2.3, 2.2, 2.2, 2.3, 2.2, 2.2, 2.3, 2.3, 2.2, 2.3, 2.3, 2.3, 2.2, 0.6, 0.6, 0.5, 0.6, 2.3, 2.3, 2.4, 2.4, 2.3, 2.3,
      2.4, 2.4, 2.4, 2.4, 2.5, 2.5, 2.4, 2.5, 2.8, 2.8, 3.0, 3.1, 3.3, 3.5, 3.7, 3.8, 4.0, 4.2, 4.2, 4.3, 4.6, 4.8, 4.9, 5.0,
      5.3, 5.3, 5.6, 5.7, 5.9, 6.1, 6.2, 6.3, 6.5, 6.7, 6.9, 7.0, 7.2, 7.4, 7.6, 7.7, 7.9, 8.0, 8.2, 8.1, 8.0, 7.9, 7.8];
    const AGENT = 'Parte diario de planta';
    const ROLE = { maint: 'Jefe de mantenimiento', quality: 'Responsable de Calidad', prod: 'Jefe de producción', qshift: 'Técnico de Calidad de turno' };

    const items = [
      { code: 'MC-04', name: 'Centro de mecanizado MC-04 (DMG Mori DMU 65)', tag: 'Equipo crítico', area: 'Mecanizado · nave 1', metric: 'vibración del husillo', reading: '7,8 mm/s RMS', baseline: '2,3 mm/s RMS', limits: 'aviso > 4,5 · crítico > 7,1 mm/s', status: 'critical',
        note: 'Por encima de 4,5 mm/s (ISO 10816-3, zona D) desde las 03:40; pico de 8,4 mm/s a las 05:32. Ha mecanizado 42 culatas del lote CUL-2609-118 en esa ventana.' },
      { code: 'BP-1', name: 'Banco de pruebas hidráulicas BP-1', tag: 'Control final', area: 'Banco de pruebas · nave 3', metric: 'pruebas con fuga o rezume', reading: '2 de 16', baseline: '0 de 16 (≤ 0,5 %)', limits: 'aviso ≥ 1 · crítico ≥ 2 pruebas', status: 'critical',
        note: 'Rezume en el vástago del cilindro principal de PH250-26-0476 y PH250-26-0478 en la re-prueba previa a expedición (1,25 × presión nominal). Ambas llevan juntas del lote JNT-2607-031 (montaje MON-2608-11).' },
      { code: 'RECT-01', name: 'Rectificadora cilíndrica RECT-01 (Studer S33)', area: 'Mecanizado · nave 1', metric: 'temperatura del refrigerante', reading: '27,4 °C', baseline: '22,0 °C', limits: 'aviso > 25 · crítico > 30 °C', status: 'warning',
        note: 'El enfriador del refrigerante no alcanza la consigna: riesgo de deriva dimensional en los vástagos (tolerancia h6). Limpiar el intercambiador.' },
      { code: 'CP-1', name: 'Cabina de pintura CP-1', area: 'Pintura y expedición', metric: 'humedad relativa en cabina', reading: '76 %', baseline: '55 %', limits: 'aviso > 70 · crítico > 85 %', status: 'warning',
        note: 'Humedad alta por la deshumectadora en modo manual desde el turno de noche: riesgo de defectos de curado en la imprimación epoxi.' },
      { code: 'COMP-1', name: 'Compresor de aire COMP-1 (Atlas Copco GA 75)', area: 'Servicios generales', metric: 'punto de rocío a presión', reading: '+8 °C', baseline: '+3 °C', limits: 'aviso > +6 · crítico > +10 °C', status: 'warning',
        note: 'El secador frigorífico rinde por debajo de lo normal; ya hay una orden abierta (OT-2026-31688) por el purgador de condensados.' },
      { code: 'LM-2', name: 'Línea de montaje de cilindros LM-2', area: 'Montaje · nave 2', metric: 'aprietes fuera de tolerancia', reading: '1,6 %', baseline: '0,4 %', limits: 'aviso > 1 · crítico > 3 %', status: 'warning',
        note: 'La atornilladora de la tapa del cilindro (puesto 4) da aprietes bajos de forma intermitente; orden abierta OT-2026-31702 para la calibración del transductor.' },
      { code: 'MC-02', name: 'Centro de mecanizado MC-02 (DMG Mori DMU 65)', area: 'Mecanizado · nave 1', metric: 'vibración del husillo', reading: '2,0 mm/s RMS', baseline: '2,1 mm/s RMS', limits: 'aviso > 4,5 · crítico > 7,1 mm/s', status: null,
        note: '' },
      { code: 'MC-01', name: 'Centro de mecanizado MC-01 (Mazak Variaxis i-700)', area: 'Mecanizado · nave 1', metric: 'vibración del husillo', reading: '1,8 mm/s RMS', baseline: '1,9 mm/s RMS', limits: 'aviso > 4,5 · crítico > 7,1 mm/s', status: null, note: '' },
      { code: 'MC-03', name: 'Centro de mecanizado MC-03 (Mazak Variaxis i-700)', area: 'Mecanizado · nave 1', metric: 'vibración del husillo', reading: '2,4 mm/s RMS', baseline: '2,2 mm/s RMS', limits: 'aviso > 4,5 · crítico > 7,1 mm/s', status: null, note: '' },
      { code: 'TOR-01', name: 'Torno CNC TOR-01 (Okuma LB3000)', area: 'Mecanizado · nave 1', metric: 'vibración del cabezal', reading: '1,6 mm/s RMS', baseline: '1,7 mm/s RMS', limits: 'aviso > 4,5 · crítico > 7,1 mm/s', status: null, note: '' },
      { code: 'CMM-1', name: 'Máquina de medir por coordenadas CMM-1', area: 'Metrología', metric: 'desviación de la pieza patrón', reading: '1,2 µm', baseline: '≤ 2,0 µm', limits: 'aviso > 2,5 · crítico > 4 µm', status: null, note: '' },
      { code: 'BP-2', name: 'Banco de pruebas hidráulicas BP-2', area: 'Banco de pruebas · nave 3', metric: 'pruebas con fuga o rezume', reading: '0 de 11', baseline: '0 de 11 (≤ 0,5 %)', limits: 'aviso ≥ 1 · crítico ≥ 2 pruebas', status: null, note: '' },
      { code: 'LM-1', name: 'Línea de montaje de grupos hidráulicos LM-1', area: 'Montaje · nave 2', metric: 'aprietes fuera de tolerancia', reading: '0,3 %', baseline: '0,4 %', limits: 'aviso > 1 · crítico > 3 %', status: null, note: '' },
      { code: 'CH-1', name: 'Central hidráulica de pruebas CH-1', area: 'Banco de pruebas · nave 3', metric: 'limpieza del aceite (ISO 4406)', reading: '17/15/12', baseline: '≤ 18/16/13', limits: 'aviso > 19/17/14 · crítico > 20/18/15', status: null, note: '' }
    ];

    const news = [
      { id: 'OT-2026-31851', equipment: 'MC-04', priority: 'Urgente · parada', tone: 'crit', owner: `${ROLE.maint} y Mantenimiento mecánico`,
        action: 'Parar MC-04 al terminar la pieza en curso y revisar los rodamientos del husillo (análisis espectral; BPFO dominante). Consignar la máquina según PR-SEG-002. La parada requiere aprobación (alarma ALM-MC04-0550).' },
      { id: 'NC-2026-0234', equipment: 'BP-1', priority: 'Alta · calidad', tone: 'crit', owner: `${ROLE.quality} y Compras · calidad de proveedor`,
        action: 'Abrir no conformidad por rezume en 2 de 3 PH-250 de MON-2608-11 con juntas JNT-2607-031. Retener las 72 juntas del lote que quedan en almacén y pedir a Sellados Ibéricos el certificado de material y la dureza Shore del lote.' },
      { id: 'OT-2026-31852', equipment: 'RECT-01', priority: 'Media', tone: 'warn', owner: 'Mantenimiento mecánico',
        action: 'Limpiar el intercambiador del enfriador de refrigerante de RECT-01 (27,4 °C; consigna 22 °C) y verificar en CMM-1 el primer vástago tras la intervención.' },
      { id: 'OT-2026-31853', equipment: 'CP-1', priority: 'Media', tone: 'warn', owner: 'Mantenimiento eléctrico',
        action: 'Devolver la deshumectadora de CP-1 a modo automático y revisar la sonda de humedad (76 %; máximo de proceso 70 %). Pintura no carga piezas hasta bajar del 70 %.' }
    ];
    const updates = [
      { id: 'OT-2026-31688', equipment: 'COMP-1', priority: 'Alta (propuesta)', tone: 'warn', owner: 'Mantenimiento de servicios',
        action: 'Se añade la lectura de hoy (punto de rocío +8 °C) a la orden abierta del purgador del secador. Se propone subir la prioridad: el aire húmedo llega a los cilindros de las amarras de MC-01 a MC-04.' },
      { id: 'OT-2026-31702', equipment: 'LM-2', priority: 'Sin cambios', tone: 'warn', owner: 'Mantenimiento eléctrico',
        action: 'Se añade la tasa de hoy (1,6 % de aprietes bajos en el puesto 4) a la orden abierta de calibración del transductor. No se crea una orden duplicada.' }
    ];

    return {
      title: 'Planta de Zaragoza · turno de mañana',
      nav: 'Resumen del turno',
      clockLabel: 'Hora de planta',
      decider: 'la jefatura de planta',
      kpis: [
        { label: 'Culatas mecanizadas con vibración alta', value: 42, sub: 'Lote CUL-2609-118 · OF 4100872 · MC-04', icon: 'box', tone: 'crit', href: '#alarma' },
        { label: 'Minutos por encima del límite', value: 130, sub: 'MC-04 desde las 03:40 · pico 8,4 mm/s a las 05:32', icon: 'activity', href: '#alarma' },
        { label: 'Reclamaciones abiertas', value: 1, sub: 'REC-2026-0187 · fuga en PH-250 · acuse antes de las 17:42 de hoy', icon: 'mail', href: '#reclamacion' },
        { label: 'Equipos con alerta', value: '6 de 14', sub: '2 críticos · 4 avisos · lecturas de las 06:00', icon: 'gauge', action: 'scroll-parte' }
      ],
      map: {
        title: 'Mapa de la planta · Zaragoza',
        sub: 'Lecturas del parte de las 06:00 y de IIoT Vibración a las 05:50 · pulsa un elemento para ver su ficha',
        icon: 'factory',
        readonly: 'Agentic Platform lee IIoT Vibración, MES Opcenter, SAP S/4HANA y GMAO Maximo; no actúa sobre los CNC ni sobre los bancos de prueba',
        zones: [
          { id: 'mec', title: 'Mecanizado', sub: 'Nave 1 · 6 máquinas', items: [
            { code: 'MC-04', name: 'DMU 65 · culatas', reading: '7,8 mm/s', status: 'crit', tags: ['CUL-2609-118'], go: 'alarma', goLabel: 'Abrir la alarma',
              note: 'Vibración del husillo en zona D (ISO 10816-3) desde las 03:40. Agentic Platform propone parar la máquina, bloquear las 42 culatas en SAP QM y pasar la OF 4100872 a MC-02.',
              kv: [['Orden de fabricación', 'OF 4100872 · lote CUL-2609-118'], ['Piezas en la ventana', '42 culatas (03:40–05:50)'], ['Pico', '8,4 mm/s RMS a las 05:32'], ['Horas del husillo', '11.840 h desde la última reparación']] },
            { code: 'MC-02', name: 'DMU 65 · bridas', reading: '2,0 mm/s', status: 'ok', note: 'Gemela de MC-04 (mismo programa CNC y utillaje). Capacidad libre a partir de las 08:00.', kv: [['OF en curso', 'OF 4100869 · bridas BR-80 (termina 07:55)'], ['Disponibilidad', '94 % esta semana']] },
            { code: 'MC-01', name: 'Variaxis · cuerpos', reading: '1,8 mm/s', status: 'ok', kv: [['OF en curso', 'OF 4100866 · cuerpos de válvula']] },
            { code: 'MC-03', name: 'Variaxis · tapas', reading: '2,4 mm/s', status: 'ok', kv: [['OF en curso', 'OF 4100870 · tapas de cilindro']] },
            { code: 'TOR-01', name: 'Torno · vástagos', reading: '1,6 mm/s', status: 'ok', kv: [['OF en curso', 'OF 4100868 · vástagos Ø 80']] },
            { code: 'RECT-01', name: 'Rectificadora', reading: '27,4 °C', status: 'warn', note: 'Refrigerante 5,4 °C por encima de la consigna: riesgo de deriva dimensional en vástagos h6.', kv: [['Consigna', '22,0 °C'], ['Propuesta', 'OT de limpieza del intercambiador']] }
          ] },
          { id: 'mon', title: 'Montaje', sub: 'Nave 2', items: [
            { code: 'LM-2', name: 'Cilindros · prensas', reading: '1,6 % NOK', status: 'warn', note: 'Aprietes bajos intermitentes en el puesto 4; orden abierta OT-2026-31702.', kv: [['Orden abierta', 'OT-2026-31702 (calibración)'], ['Referencia', '0,4 %']] },
            { code: 'LM-1', name: 'Grupos hidráulicos', reading: '0,3 % NOK', status: 'ok', kv: [['En montaje', 'GH-30 y GH-55 · lote MON-2609-27']] },
            { code: 'ALM-C', name: 'Almacén de componentes', reading: null, status: null, tags: ['JNT-2607-031'], note: 'Quedan 72 juntas del lote JNT-2607-031 (Sellados Ibéricos) en la ubicación C-14-03.', go: 'retirada', goLabel: 'Simulacro de campaña', kv: [['Juntas JNT-2607-031', '72 en almacén'], ['Proveedor', 'Sellados Ibéricos, S.A.']] }
          ] },
          { id: 'bp', title: 'Pruebas y metrología', sub: 'Nave 3', items: [
            { code: 'BP-1', name: 'Banco de prensas', reading: '2 rezumes', status: 'crit', tags: ['JNT-2607-031'], note: 'Rezume en el vástago del cilindro principal de dos PH-250 de MON-2608-11. Mismo lote de juntas que la prensa de la reclamación.', go: 'reclamacion', goLabel: 'Abrir la reclamación', kv: [['Pruebas ayer', '16 (2 con rezume)'], ['Presión de prueba', '1,25 × nominal · 30 min'], ['Lote de juntas', 'JNT-2607-031']] },
            { code: 'BP-2', name: 'Banco de grupos', reading: '0 fugas', status: 'ok', kv: [['Pruebas ayer', '11 sin incidencias']] },
            { code: 'CH-1', name: 'Central de pruebas', reading: '17/15/12', status: 'ok', kv: [['Limpieza ISO 4406', '≤ 18/16/13']] },
            { code: 'CMM-1', name: 'Metrología CMM', reading: '1,2 µm', status: 'ok', note: 'Libre a partir de las 07:00 para la metrología al 100 % de las 42 culatas que propone la alarma.', kv: [['Pieza patrón', '1,2 µm de desviación'], ['Capacidad', '≈ 6 culatas por hora']] }
          ] },
          { id: 'exp', title: 'Pintura y expedición', sub: 'Producto terminado', items: [
            { code: 'CP-1', name: 'Cabina de pintura', reading: '76 % HR', status: 'warn', note: 'Deshumectadora en modo manual desde el turno de noche.', kv: [['Máximo de proceso', '70 % HR']] },
            { code: 'EXP', name: 'Muelles de expedición', reading: '3 cargas hoy', status: null, kv: [['10:30', '2 PH-160 · Portugal'], ['13:00', '1 PH-400 · Francia'], ['17:30', '4 GH-55 · Navarra']] },
            { code: 'PT', name: 'Almacén de producto terminado', reading: '9 equipos', status: null, tags: ['MON-2608-11'], note: 'Incluye las 3 PH-250 de MON-2608-11 aún en planta (2 con rezume en BP-1).', kv: [['PH-250 retenidas', '3 (MON-2608-11)']] }
          ] },
          { id: 'srv', title: 'Servicios', sub: 'Aire y energía', items: [
            { code: 'COMP-1', name: 'Compresor de aire', reading: '+8 °C PR', status: 'warn', note: 'Punto de rocío alto; orden abierta OT-2026-31688 del purgador del secador.', kv: [['Orden abierta', 'OT-2026-31688'], ['Referencia', '+3 °C']] },
            { code: 'TR-1', name: 'Centro de transformación', reading: '61 % carga', status: null, kv: [['Potencia', '1.000 kVA']] }
          ] }
        ]
      },
      inbox: {
        alarm: {
          icon: 'activity',
          title: 'MC-04 · vibración del husillo',
          meta: ['Alarma 05:50 · ALM-MC04-0550'],
          systems: ['IIoT Vibración'],
          body: '7,8 mm/s RMS frente al límite de 4,5 mm/s (ISO 10816-3) desde las 03:40; pico de 8,4 mm/s a las 05:32. En la ventana se mecanizaron 42 culatas del lote CUL-2609-118 (OF 4100872).'
        },
        complaint: {
          icon: 'mail',
          title: 'Reclamación REC-2026-0187 · fuga de aceite en prensa PH-250',
          meta: ['28/09 17:42', 'Prensas y Servicios del Norte, S.L.', 'Ref. INC-PSN-0931'],
          body: 'Fuga de aceite por el cilindro principal de la prensa',
          trace: 'PH250-26-0412',
          after: 'entregada el 04/08/2026 a su cliente final. Junta del lote JNT-2607-031 (Sellados Ibéricos). Acuse en 24 h e informe 8D antes del 13/10/2026.',
          due: 'Acuse hoy 17:42',
          goLabel: 'Abrir reclamación'
        }
      },
      chart: {
        title: 'MC-04 · vibración del husillo',
        sub: 'DMG Mori DMU 65 · sensor VS-MC04-01 · ahora 7,8 mm/s RMS (05:50)',
        icon: 'activity',
        tabLabel: 'Vibración',
        chart: {
          series: RMS.map((v, i) => ({ time: hhmm(i), value: v })),
          unit: 'mm/s',
          threshold: { value: 4.5, label: 'Límite 4,5 mm/s', legend: 'Límite 4,5 mm/s (ISO 10816-3) · 130 min por encima' },
          critical: { value: 7.1, label: 'Crítico 7,1 mm/s', legend: 'Crítico 7,1 mm/s · 50 min por encima' },
          peak: { x: '05:32', y: 8.4, label: '8,4 mm/s · 05:32' },
          yTicks: [0, 2, 4, 6, 8, 10],
          xTicks: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
          annotations: [{ x: '03:40', label: 'Aviso 03:40' }],
          bands: [
            { from: '01:10', to: '01:30', label: 'Cambio de serie', tone: 'warn' },
            { from: '01:30', to: '05:50', label: 'OF 4100872' }
          ],
          seriesLabel: 'RMS del husillo (VS-MC04-01)',
          shadeLabel: 'Por encima del límite 03:40–05:50'
        },
        events: [
          { time: '01:10', end: '01:30', text: 'Fin de la OF 4100861 (bridas) y cambio de serie a culatas de cilindro', tone: 'brand', tag: 'MC-04' },
          { time: '01:30', text: 'Inicio del lote CUL-2609-118 (OF 4100872, 120 culatas): primera pieza conforme en CMM-1', tone: 'ok', tag: 'CMM-1' },
          { time: '02:35', text: 'IIoT Vibración detecta tendencia al alza en la banda de 1 a 3 kHz del husillo', tone: 'warn', tag: 'VS-MC04-01' },
          { time: '03:40', text: 'Vibración por encima de 4,5 mm/s RMS (zona D): aviso en el panel del operador del turno de noche', tone: 'crit', tag: 'MC-04' },
          { time: '04:10', text: 'Cambio de herramienta T12 (fresa de planear Ø 63): la vibración no baja', tone: 'warn', tag: 'MC-04' },
          { time: '05:00', text: 'Supera el nivel crítico de 7,1 mm/s RMS', tone: 'crit', tag: 'MC-04' },
          { time: '05:32', text: 'Pico instantáneo de 8,4 mm/s RMS', tone: 'crit', tag: 'VS-MC04-01' },
          { time: '05:50', text: 'Alarma ALM-MC04-0550: 130 min por encima del límite; se escala al Jefe de mantenimiento', tone: 'crit', tag: 'ALM-MC04-0550' }
        ],
        cause: 'Hipótesis a confirmar por Mantenimiento: deterioro del rodamiento delantero del husillo. En el espectro domina la frecuencia de defecto de pista exterior (BPFO) y el husillo lleva 11.840 h desde su última reparación. El cambio de herramienta de las 04:10 no redujo la vibración, lo que descarta un desequilibrio de la herramienta.',
        system: 'IIoT Vibración',
        footer: 'RMS medio cada 5 min · el pico de 8,4 mm/s es instantáneo'
      },
      parte: {
        agent: AGENT,
        title: 'Parte diario de equipos',
        sub: 'Lecturas de las 06:00 · 14 equipos de la Planta de Zaragoza · umbrales de planta',
        colItem: 'Equipo',
        systems: ['MES Opcenter', 'IIoT Vibración'],
        inboxTitle: 'Parte diario de equipos · lecturas de las 06:00',
        inboxCount: '14 equipos',
        inboxPending: '2 críticos (MC-04 y el banco de pruebas BP-1) y 4 avisos pendientes de revisar.',
        items,
        news,
        updates,
        steps: [
          { agent: AGENT, system: 'MES Opcenter', action: 'Lee las lecturas de las 06:00 de 14 equipos (mecanizado, montaje, pruebas, pintura y servicios)', result: '14 lecturas recibidas, sin huecos', ms: 610 },
          { agent: AGENT, system: 'IIoT Vibración', action: 'Consulta la vibración de husillos y cabezales (MC-01 a MC-04 y TOR-01) de las últimas 6 h', result: 'MC-04 a 7,8 mm/s RMS (zona D desde las 03:40); el resto entre 1,6 y 2,4 mm/s', ms: 540, tone: 'crit' },
          { agent: AGENT, system: 'Agentic Platform', action: 'Compara cada lectura con sus umbrales de planta (8 indicadores)', result: '2 críticos · 4 avisos · 8 sin incidencias', ms: 60, tone: 'crit' },
          { agent: AGENT, system: 'MES Opcenter', action: 'Cruza la ventana de vibración de MC-04 con las órdenes de fabricación', result: 'OF 4100872: 42 culatas del lote CUL-2609-118 mecanizadas entre las 03:40 y las 05:50', ms: 420, tone: 'warn' },
          { agent: AGENT, system: 'SAP S/4HANA', action: 'Revisa los resultados de prueba de BP-1 y BP-2 en QM', result: 'BP-1: rezume en PH250-26-0476 y PH250-26-0478 (MON-2608-11)', ms: 380, tone: 'crit' },
          { agent: AGENT, system: 'PLM Windchill', action: 'Abre la lista de materiales de las dos prensas con rezume', result: 'Juntas del cilindro principal del lote JNT-2607-031 · Sellados Ibéricos, S.A.', ms: 330 },
          { agent: AGENT, system: 'Salesforce Service', action: 'Cruza las alertas con los casos de posventa abiertos', result: 'Fuga de aceite en PH250-26-0412 (REC-2026-0187, Prensas y Servicios del Norte): mismo lote de juntas', ms: 360, tone: 'warn' },
          { agent: AGENT, system: 'GMAO Maximo', action: 'Busca órdenes abiertas de los equipos con alerta', result: 'OT-2026-31688 (COMP-1) y OT-2026-31702 (LM-2) ya abiertas', ms: 450 },
          { agent: AGENT, system: 'Modelo de lenguaje', action: 'Redacta la acción recomendada de cada alerta (6 llamadas)', result: '6 borradores, cada uno con su procedimiento de referencia (PR-MAN-011, PR-CAL-004, PR-SEG-002)', ms: 5800 },
          { agent: AGENT, system: 'GMAO Maximo', action: 'Crea OT-2026-31851 para MC-04 · prioridad urgente · parada', result: 'Creada y asignada al Jefe de mantenimiento (la parada queda pendiente de aprobación)', ms: 260, tone: 'ok' },
          { agent: AGENT, system: 'SAP S/4HANA', action: 'Abre la no conformidad NC-2026-0234 para BP-1 · prioridad alta', result: 'Creada y asignada a Calidad y a Compras · calidad de proveedor', ms: 290, tone: 'ok' },
          { agent: AGENT, system: 'GMAO Maximo', action: 'Crea OT-2026-31852 para RECT-01 · prioridad media', result: 'Creada y asignada a Mantenimiento mecánico', ms: 230, tone: 'ok' },
          { agent: AGENT, system: 'GMAO Maximo', action: 'Crea OT-2026-31853 para CP-1 · prioridad media', result: 'Creada y asignada a Mantenimiento eléctrico', ms: 230, tone: 'ok' },
          { agent: AGENT, system: 'GMAO Maximo', action: 'Actualiza OT-2026-31688 (secador de COMP-1) con la lectura de hoy', result: 'Lectura añadida · prioridad alta propuesta · sin orden duplicada', ms: 210 },
          { agent: AGENT, system: 'GMAO Maximo', action: 'Actualiza OT-2026-31702 (atornilladora de LM-2) con la tasa de hoy', result: 'Lectura añadida · sin orden duplicada', ms: 210 },
          { agent: AGENT, system: 'Microsoft Teams', action: 'Publica el resumen en el canal «Mantenimiento · Planta de Zaragoza»', result: 'Enviado: 2 críticos, 4 avisos y 4 tickets', ms: 400, tone: 'ok' }
        ],
        stats: [
          { label: 'Equipos revisados', value: 14 },
          { label: 'Tickets creados', value: 4, tone: 'ok' },
          { label: 'Órdenes actualizadas, sin duplicar', value: 2 },
          { label: 'Culatas a metrología al 100 %', value: 42, tone: 'crit' }
        ],
        relation: {
          title: 'Posible relación con la reclamación REC-2026-0187',
          body: 'El banco BP-1 ha encontrado rezume en el cilindro principal de dos PH-250 del montaje MON-2608-11 (PH250-26-0476 y PH250-26-0478). Según PLM Windchill, ambas llevan juntas del lote JNT-2607-031 de Sellados Ibéricos, el mismo lote que la prensa PH250-26-0412, cuya fuga de aceite reclama el distribuidor desde Bilbao.',
          more: 'Con 23 equipos del lote en campo, PR-POS-005 pide valorar una campaña de campo. A confirmar por Calidad y Posventa.',
          plain: 'BP-1 encontró rezume en dos PH-250 de MON-2608-11 (PH250-26-0476 y PH250-26-0478) con juntas del lote JNT-2607-031, el mismo de la prensa PH250-26-0412 reclamada por Prensas y Servicios del Norte. Con 23 equipos del lote en campo, PR-POS-005 pide valorar una campaña. A confirmar por Calidad y Posventa.',
          go: 'reclamacion',
          goLabel: 'Abrir la reclamación'
        },
        policy: 'Política aplicada: las órdenes de mantenimiento y las no conformidades se crean sin aprobación previa; parar una máquina, bloquear piezas en SAP QM o reasignar una orden de fabricación requiere la aprobación del Jefe de mantenimiento o de Calidad (PR-CAL-004).',
        channel: 'Mantenimiento · Planta de Zaragoza',
        resultSummary: '3 órdenes creadas en GMAO Maximo, 1 no conformidad en SAP QM, 2 órdenes existentes actualizadas y resumen publicado en Microsoft Teams.',
        auditRequest: 'Planta de Zaragoza · lecturas de las 06:00 · 14 equipos',
        auditNew: 'Ticket creado',
        auditUpdate: 'Orden de mantenimiento actualizada',
        reportTitle: 'Parte diario de equipos · Planta de Zaragoza',
        reportCode: 'PD-PLAZA-20260929',
        reportMeta: [['Planta', 'Zaragoza (PLAZA)'], ['Turno', 'Mañana'], ['Equipos revisados', '14'], ['Críticos · avisos', '2 · 4']],
        reportSummary: 'De 14 equipos revisados, 2 están en estado crítico y 4 en aviso. El centro de mecanizado MC-04 vibra en zona D desde las 03:40 y ha mecanizado 42 culatas del lote CUL-2609-118 en esa ventana. El banco BP-1 ha detectado rezume en dos PH-250 con juntas del lote JNT-2607-031. Se han creado 3 órdenes de mantenimiento y 1 no conformidad, y se han actualizado 2 órdenes existentes, sin duplicarlas.',
        signatures: [{ role: 'Jefe de planta', note: 'Revisado' }, { role: 'Jefe de mantenimiento', note: 'Recibido' }]
      },
      presenter: {
        say: [
          'Así empieza el turno el Jefe de planta en Zaragoza: lo que pide una decisión, en una sola bandeja.',
          'Los datos llegan de sus sistemas: vibraciones de IIoT, órdenes de Opcenter, lotes y calidad de SAP, órdenes de Maximo y casos de Salesforce. Aquí son sintéticos, pero coherentes entre sí.',
          'El mapa resume la planta de un vistazo: gris lo normal, color lo que pide atención. MC-04 está en rojo; al pulsarlo se ve la orden de fabricación y las 42 culatas afectadas.',
          'Tres asuntos: la vibración de MC-04 de las 05:50 (42 culatas del lote CUL-2609-118), la fuga de aceite de una PH-250 que reclama un distribuidor de Bilbao y el parte con 2 críticos.'
        ],
        sayBefore: ['Generar parte diario: revisa 14 equipos, no duplica órdenes abiertas y crea los tickets. Fijaos en el tiempo.'],
        sayAfter: [
          'Relación que encuentra Agentic Platform: las dos prensas con rezume en el banco BP-1 llevan juntas del mismo lote que la prensa reclamada. Nadie ha tenido que cruzar SAP, Windchill y Salesforce.',
          'Y no duplica: dos órdenes ya abiertas se actualizan en lugar de abrir tickets nuevos.'
        ],
        next: 'Pulsar «Generar parte diario» y comentar el registro mientras se ejecuta.',
        nextAfter: 'Ir a «De palabras a workflow» (flecha derecha) para crear la respuesta a la alarma de MC-04 a partir del procedimiento escrito.'
      }
    };
  })()
});
