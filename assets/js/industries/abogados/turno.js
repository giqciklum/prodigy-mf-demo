/* Mora & Jordano · resumen del día del despacho (escena «turno»). Datos sintéticos de demostración (MFM). */
agenticPack('abogados', {
  turno: (function () {
    'use strict';
    /* La serie empieza a las 06:00 (minuto 360) y avanza en tramos de 5 minutos. */
    const hhmm = (i) => `${String(Math.floor((360 + i * 5) / 60)).padStart(2, '0')}:${String((360 + i * 5) % 60).padStart(2, '0')}`;
    /* Notificaciones LexNET recibidas y aún sin asignar a un letrado (cola acumulada), de 06:00 a 08:55. */
    const QUEUE = [2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4,
      5, 6, 7, 8, 9, 10,
      12, 15, 17, 19, 21, 23, 25, 26, 27, 26, 24, 23];
    const AGENT = 'Resumen del día del despacho';

    const items = [
      { code: 'PRC-2026-0412', name: 'Demanda PO 1184/2026 · Aceites Sierra Subbética, S.L.', tag: 'Alarma', area: 'Procesal · Juzgado de Primera Instancia nº 7 de Málaga', metric: 'estado de aceptación del encargo', reading: 'Bloqueado', baseline: 'Aceptado en 24 h', limits: 'conflicto de intereses o letrado ausente = crítico', status: 'critical',
        note: 'Notificación LexNET de las 08:12: demanda de juicio ordinario con 20 días hábiles para contestar (vence el 27-10-2026). El despacho asesoró en 2025 a la parte demandante (posible conflicto, art. 12 del Código Deontológico) y el letrado asignado está de vacaciones.' },
      { code: 'LEX-COLA', name: 'Buzón LexNET del despacho', tag: 'Plazo procesal', area: 'Secretaría procesal · notificaciones', metric: 'notificaciones sin asignar a letrado', reading: '23', baseline: '≤ 5', limits: 'aviso > 10 · crítico > 20', status: 'critical',
        note: '41 notificaciones recibidas desde las 07:30; 9 son de letrados ausentes y siguen sin reasignar. Si no se accede en 3 días hábiles se tienen por notificadas (art. 162 LEC) y el plazo empieza a correr igualmente.' },
      { code: 'PLZ-5D', name: 'Plazos procesales próximos', area: 'Procesal y Civil · agenda de plazos', metric: 'plazos que vencen en ≤ 5 días hábiles', reading: '11', baseline: '≤ 6', limits: 'aviso > 8 · crítico > 15', status: 'warning',
        note: 'Incluye un recurso de apelación (20 días, art. 458 LEC) que vence el 02-10-2026 y dos escritos de impugnación de tasación de costas. Tres sin borrador en iManage.' },
      { code: 'AEAT-200', name: 'Campaña del Impuesto sobre Sociedades', area: 'Fiscal y Tributario · Sede AEAT', metric: 'modelos 200 sin cerrar', reading: '37 de 112', baseline: '≤ 25 a 26 días del vencimiento', limits: 'aviso > 25 · crítico > 50', status: 'warning',
        note: 'El modelo 200 de los ejercicios naturales vence el 25-10-2026. En paralelo, el primer pago fraccionado del modelo 202 se presenta del 1 al 20 de octubre (64 clientes).' },
      { code: 'PBC-DD', name: 'Prevención del blanqueo (Ley 10/2010)', area: 'Cumplimiento · diligencia debida', metric: 'expedientes con diligencia debida incompleta', reading: '6', baseline: '0', limits: 'aviso > 0 · crítico > 10', status: 'warning',
        note: 'Faltan la identificación del titular real (art. 4) en 4 sociedades y la acreditación del origen de fondos en 2 operaciones inmobiliarias. No se puede ejecutar el encargo hasta completarla (art. 7.3).' },
      { code: 'HRS-SIN', name: 'Horas sin imputar · semana 39', area: 'Dirección · control de tiempos', metric: 'horas trabajadas sin imputar a expediente', reading: '214 h', baseline: '≤ 80 h', limits: 'aviso > 120 · crítico > 300 h', status: 'warning',
        note: 'Mercantil concentra 96 h; 22 h son del asunto de Grupo Hostelero Costa del Sol, el de la reclamación REC-2026-0057 por la minuta F-2026-0938.' },
      { code: 'CONF-CHK', name: 'Comprobaciones de conflicto ordinarias', area: 'Aceptación de encargos', metric: 'altas de cliente pendientes de comprobar', reading: '3', baseline: '≤ 5', limits: 'aviso > 5 · crítico > 10', status: null, note: '' },
      { code: 'FAC-PTE', name: 'Facturación pendiente de emitir', area: 'Atención al cliente y facturación', metric: 'importe de minutas listas sin emitir', reading: '48.200 €', baseline: '≤ 60.000 €', limits: 'aviso > 60.000 · crítico > 120.000 €', status: null, note: '' },
      { code: 'COBRO', name: 'Cobro de minutas', area: 'Atención al cliente y facturación', metric: 'facturas vencidas a más de 60 días', reading: '6,1 %', baseline: '≤ 8 %', limits: 'aviso > 8 · crítico > 15 %', status: null, note: '' },
      { code: 'LEXNET', name: 'Plataforma LexNET', area: 'Sistemas · comunicaciones con juzgados', metric: 'disponibilidad (24 h)', reading: '100 %', baseline: '≥ 99,5 %', limits: 'aviso < 99,5 · crítico < 98 %', status: null, note: '' },
      { code: 'IMANAGE', name: 'iManage Work', area: 'Sistemas · gestión documental', metric: 'disponibilidad (24 h)', reading: '99,9 %', baseline: '≥ 99,5 %', limits: 'aviso < 99,5 · crítico < 98 %', status: null, note: '' },
      { code: 'AEAT-CERT', name: 'Certificado de colaborador social', area: 'Fiscal y Tributario · Sede AEAT', metric: 'días hasta la caducidad', reading: '214 días', baseline: '≥ 60 días', limits: 'aviso < 60 · crítico < 15 días', status: null, note: '' },
      { code: 'SIGN', name: 'Firmas electrónicas pendientes', area: 'Signaturit · hojas de encargo y poderes', metric: 'documentos sin firmar a más de 5 días', reading: '4', baseline: '≤ 6', limits: 'aviso > 6 · crítico > 12', status: null, note: '' },
      { code: 'COR-SEN', name: 'Sede Córdoba · señalamientos', area: 'Sede Córdoba · agenda de sala', metric: 'señalamientos de hoy con letrado y toga confirmados', reading: '3 de 3', baseline: '100 %', limits: 'aviso < 100 % · crítico: sin letrado', status: null, note: '' }
    ];

    const news = [
      { id: 'TAR-26-3101', equipment: 'PRC-2026-0412', priority: 'Urgente · plazo', tone: 'crit', owner: 'Socio responsable de Procesal',
        action: 'Bloquear la aceptación del encargo hasta resolver el posible conflicto con el demandante (art. 12 del Código Deontológico; POL-CON-002), reasignar el asunto y validar el cómputo del plazo (vence el 27-10-2026). Aceptar el encargo o comunicarlo al cliente requiere la aprobación del Socio director.' },
      { id: 'TAR-26-3102', equipment: 'LEX-COLA', priority: 'Urgente · plazo', tone: 'crit', owner: 'Secretaría procesal',
        action: 'Asignar las 23 notificaciones pendientes; reasignar hoy las 9 de letrados ausentes y anotar cada plazo en la agenda del despacho (PRO-PLZ-001).' },
      { id: 'TAR-26-3103', equipment: 'PLZ-5D', priority: 'Alta', tone: 'warn', owner: 'Socio responsable de Procesal',
        action: 'Revisar los 11 plazos que vencen en 5 días hábiles; priorizar el recurso de apelación del 02-10-2026 y los 3 escritos sin borrador en iManage.' },
      { id: 'TAR-26-3104', equipment: 'PBC-DD', priority: 'Media', tone: 'warn', owner: 'Responsable de Cumplimiento (PBC y RGPD)',
        action: 'Completar la diligencia debida de los 6 expedientes (titular real y origen de fondos) antes de ejecutar los encargos (Ley 10/2010, arts. 3, 4 y 7.3; MAN-PBC-003).' }
    ];
    const updates = [
      { id: 'TAR-26-2987', equipment: 'AEAT-200', priority: 'Alta (propuesta)', tone: 'warn', owner: 'Socia responsable de Fiscal y Tributario',
        action: 'Se añade la situación de hoy (37 modelos 200 sin cerrar a 26 días del vencimiento y 64 pagos fraccionados del modelo 202) a la tarea abierta de la campaña (CAL-TRI-006) y se propone subir la prioridad.' },
      { id: 'TAR-26-3045', equipment: 'HRS-SIN', priority: 'Sin cambios', tone: 'warn', owner: 'Atención al cliente y facturación',
        action: 'Se añade la lectura de hoy (214 h sin imputar) al recordatorio semanal abierto. No se crea una tarea duplicada.' }
    ];

    return {
      title: 'Despacho de Málaga · resumen del día',
      nav: 'Resumen del día',
      clockLabel: 'Hora del despacho',
      decider: 'Socio director',
      kpis: [
        { label: 'Notificaciones LexNET recibidas hoy', value: 41, sub: 'PO 1184/2026 con posible conflicto de intereses · 08:12', icon: 'mail', tone: 'crit', href: '#alarma' },
        { label: 'Días hábiles para contestar · PO 1184/2026', value: 20, sub: 'Vence el 27-10-2026 · letrado asignado de vacaciones', icon: 'calendar', href: '#alarma' },
        { label: 'Reclamaciones de cliente abiertas', value: 1, sub: 'REC-2026-0057 · minuta F-2026-0938 · 18.400 €', icon: 'euro', href: '#reclamacion' },
        { label: 'Indicadores con alerta', value: '6 de 14', sub: '2 críticos · 4 avisos · lecturas de las 09:00', icon: 'gauge', action: 'scroll-parte' }
      ],
      map: {
        title: 'Mapa del despacho · áreas y sedes',
        sub: 'Plazos, colas y vencimientos a las 09:00 · pulsa un elemento para ver su ficha',
        icon: 'building',
        readonly: 'Agentic Platform lee LexNET, el Gestor de expedientes, iManage y la Sede AEAT; no presenta escritos, no acepta encargos ni escribe a clientes sin aprobación',
        zones: [
          { id: 'sec', title: 'Secretaría', sub: 'Entrada y agenda', items: [
            { code: 'LEX-COLA', name: 'Buzón LexNET', reading: '23 sin asignar', status: 'crit', note: '41 notificaciones desde las 07:30; 9 de letrados ausentes sin reasignar. Riesgo de que corran plazos sin letrado responsable.', kv: [['Recibidas hoy', '41'], ['Asignadas', '18'], ['De letrados ausentes', '9']] },
            { code: 'LEXNET', name: 'LexNET', reading: '100 %', status: 'ok' },
            { code: 'IMANAGE', name: 'iManage Work', reading: '99,9 %', status: 'ok', kv: [['Documentos abiertos hoy', '1.214']] },
            { code: 'SIGN', name: 'Signaturit', reading: '4 pendientes', status: 'ok' }
          ] },
          { id: 'pro', title: 'Procesal', sub: 'Litigación y plazos', items: [
            { code: 'PRC-2026-0412', name: 'PO 1184/2026 · Aceites Sierra Subbética', reading: 'Bloqueado', status: 'crit', tags: ['PO 1184/2026'], go: 'alarma', goLabel: 'Abrir la alarma',
              note: 'Demanda de juicio ordinario contra el cliente. El despacho asesoró en 2025 a la demandante: posible conflicto de intereses. Agentic Platform propone bloquear la aceptación, reasignar, calcular el plazo y avisar al cliente con aprobación del Socio director.',
              kv: [['Juzgado', 'Primera Instancia nº 7 de Málaga'], ['Notificada', '29-09-2026 08:12'], ['Vence la contestación', '27-10-2026'], ['Letrado asignado', 'De vacaciones']] },
            { code: 'PLZ-5D', name: 'Plazos ≤ 5 días hábiles', reading: '11 plazos', status: 'warn', kv: [['Sin borrador', '3'], ['El más próximo', 'Apelación · 02-10-2026']] },
            { code: 'SEN-MLG', name: 'Señalamientos en Málaga', reading: '5 hoy', status: null, note: 'Vistas y audiencias previas de hoy en la Ciudad de la Justicia de Málaga; todas con letrado confirmado.', kv: [['Audiencias previas', '2'], ['Juicios verbales', '3']] }
          ] },
          { id: 'fis', title: 'Fiscal y Tributario', sub: 'Sede AEAT', items: [
            { code: 'AEAT-200', name: 'Modelo 200 · Sociedades', reading: '37 sin cerrar', status: 'warn', note: 'Vence el 25-10-2026. Faltan cuentas anuales formuladas de 9 clientes.', kv: [['Clientes', '112'], ['Presentados', '41'], ['Modelo 202 de octubre', '64 clientes']] },
            { code: 'AEAT-CERT', name: 'Certificado de colaborador social', reading: '214 días', status: 'ok' },
            { code: 'AEAT-NOT', name: 'Notificaciones electrónicas AEAT', reading: '7 nuevas', status: null, note: 'Requerimientos y propuestas de liquidación en la Dirección Electrónica Habilitada única de clientes apoderados; plazo de acceso de 10 días naturales.', kv: [['Requerimientos', '5'], ['Propuestas de liquidación', '2']] }
          ] },
          { id: 'mer', title: 'Mercantil', sub: 'Societario y M&A', items: [
            { code: 'HRS-SIN', name: 'Horas sin imputar', reading: '214 h', status: 'warn', kv: [['De Mercantil', '96 h'], ['Asunto Costa del Sol', '22 h']] },
            { code: 'REC-2026-0057', name: 'Reclamación de honorarios', reading: '1 abierta', status: null, tags: ['F-2026-0938'], go: 'reclamacion', goLabel: 'Abrir la reclamación', note: 'Grupo Hostelero Costa del Sol, S.L. discute la minuta F-2026-0938 (18.400 €) frente a la hoja de encargo y se queja de falta de información sobre el asunto.', kv: [['Plazo interno de respuesta', '20/10/2026'], ['Expediente del asunto', 'MER-2026-0219'], ['Área', 'Mercantil']] },
            { code: 'FAC-PTE', name: 'Minutas sin emitir', reading: '48.200 €', status: 'ok' }
          ] },
          { id: 'civ', title: 'Civil y Cumplimiento', sub: 'Civil · PBC · RGPD', items: [
            { code: 'PBC-DD', name: 'Diligencia debida PBC', reading: '6 incompletos', status: 'warn', note: 'Titular real sin identificar en 4 sociedades y origen de fondos sin acreditar en 2 compraventas.', kv: [['Norma', 'Ley 10/2010'], ['Bloqueo de ejecución', 'Sí, art. 7.3']] },
            { code: 'CONF-CHK', name: 'Conflictos ordinarios', reading: '3 pendientes', status: 'ok' },
            { code: 'RGPD-2609-03', name: 'Simulacro de brecha RGPD', reading: 'Programado', status: null, tags: ['RGPD-2609-03'], go: 'retirada', goLabel: 'Abrir el simulacro', note: 'Simulacro de hoy: informe de due diligence de Promociones Guadalhorce, S.A. enviado a un destinatario equivocado. Notificación a la AEPD en 72 h (RGPD, art. 33; PRO-RGPD-005).', kv: [['Expediente', 'RGPD-2609-03'], ['Responsable', 'Delegado de Protección de Datos']] },
            { code: 'COBRO', name: 'Cobro de minutas', reading: '6,1 % vencido', status: 'ok' }
          ] },
          { id: 'cor', title: 'Sede Córdoba', sub: 'Av. Gran Capitán', items: [
            { code: 'COR-SEN', name: 'Señalamientos', reading: '3 de 3', status: 'ok', kv: [['Juzgados', 'Primera Instancia nº 3 y nº 5 de Córdoba']] },
            { code: 'COR-AGE', name: 'Agenda de clientes', reading: '6 reuniones', status: null, note: 'Reuniones de planificación fiscal de cierre y una firma de pacto de socios de empresa familiar (Signaturit).', kv: [['Presenciales', '4'], ['Por Teams', '2']] }
          ] }
        ]
      },
      inbox: {
        alarm: {
          icon: 'scale',
          title: 'PO 1184/2026 · demanda contra Aceites Sierra Subbética con posible conflicto',
          meta: ['Notificación LexNET 08:12 · PRC-2026-0412'],
          systems: ['LexNET'],
          body: 'Juzgado de Primera Instancia nº 7 de Málaga: 20 días hábiles para contestar, hasta el 27-10-2026. El despacho asesoró en 2025 a la demandante (art. 12 del Código Deontológico) y el letrado asignado está de vacaciones.'
        },
        complaint: {
          icon: 'mail',
          title: 'Reclamación REC-2026-0057 · minuta de honorarios F-2026-0938',
          meta: ['28/09 10:41', 'Grupo Hostelero Costa del Sol, S.L.', 'Área Mercantil'],
          body: 'Considera que la minuta de 18.400 € supera lo pactado en la hoja de encargo y se queja de no recibir información sobre el avance del asunto. Expediente',
          trace: 'REC-2026-0057',
          after: 'Plazo interno de respuesta hasta el 20/10/2026; el acuse de recibo se envía hoy.',
          due: 'Acuse hoy',
          goLabel: 'Abrir reclamación'
        }
      },
      chart: {
        title: 'Buzón LexNET · notificaciones sin asignar',
        sub: 'Cola acumulada en tramos de 5 min · ahora 23 (08:55)',
        icon: 'mail',
        tabLabel: 'Cola LexNET',
        chart: {
          series: QUEUE.map((v, i) => ({ time: hhmm(i), value: v })),
          unit: '',
          threshold: { value: 10, label: 'Aviso 10', legend: 'Umbral de aviso 10 · 60 min por encima' },
          critical: { value: 20, label: 'Crítico 20', legend: 'Crítico 20 · 40 min por encima' },
          peak: { x: '08:40', y: 27, label: '27 · 08:40' },
          yTicks: [0, 10, 20, 30],
          xTicks: ['06:00', '06:30', '07:00', '07:30', '08:00', '08:30'],
          annotations: [{ x: '08:10', label: 'PO 1184/2026 08:12' }],
          bands: [
            { from: '07:30', to: '08:00', label: 'Primeras remesas', tone: 'warn' },
            { from: '08:00', to: '08:55', label: 'Remesa de los juzgados de Málaga' }
          ],
          seriesLabel: 'Notificaciones sin asignar',
          shadeLabel: 'Por encima del aviso 08:00–08:55'
        },
        events: [
          { time: '06:00', text: 'Quedan 2 notificaciones del lunes sin asignar (tasaciones de costas)', tone: 'brand', tag: 'LexNET' },
          { time: '07:30', end: '08:00', text: 'Primeras notificaciones del día: diligencias de ordenación y decretos de juzgados de Málaga y Córdoba', tone: 'warn', tag: 'LexNET' },
          { time: '08:00', text: 'La cola supera el umbral de aviso de 10 notificaciones sin asignar', tone: 'warn', tag: 'LEX-COLA' },
          { time: '08:12', text: 'Notificación de la demanda PO 1184/2026 contra Aceites Sierra Subbética, S.L. (Primera Instancia nº 7 de Málaga)', tone: 'crit', tag: 'PRC-2026-0412' },
          { time: '08:14', text: 'El Gestor de expedientes detecta que el despacho asesoró en 2025 a la demandante: posible conflicto de intereses', tone: 'crit', tag: 'Conflictos' },
          { time: '08:15', text: 'La letrada asignada figura de vacaciones hasta el 13-10-2026 en el calendario de Outlook', tone: 'warn', tag: 'Outlook' },
          { time: '08:20', text: 'Supera el nivel crítico de 20 notificaciones sin asignar', tone: 'crit', tag: 'LEX-COLA' },
          { time: '08:40', text: 'Máximo de 27 notificaciones sin asignar', tone: 'crit', tag: 'LEX-COLA' },
          { time: '08:45', text: 'Secretaría procesal empieza a repartir; 9 notificaciones de letrados ausentes quedan sin destinatario', tone: 'brand', tag: 'Secretaría' }
        ],
        cause: 'Hipótesis a confirmar por Secretaría procesal: los martes llega la remesa acumulada de los juzgados de Málaga y esta semana coinciden tres letrados de vacaciones cuyos asuntos no tienen sustituto asignado en el Gestor de expedientes. Las notificaciones de sus expedientes, entre ellas la demanda PO 1184/2026, entran sin destinatario y la cola no baja.',
        system: 'LexNET',
        footer: 'Cola recalculada cada 5 min con el buzón LexNET y las asignaciones del Gestor de expedientes'
      },
      parte: {
        agent: AGENT,
        title: 'Resumen del día del despacho',
        sub: 'Lecturas de las 09:00 · 14 indicadores de plazos, colas y vencimientos · umbrales del despacho',
        colItem: 'Indicador',
        systems: ['LexNET', 'Gestor de expedientes'],
        inboxTitle: 'Resumen del día del despacho · lecturas de las 09:00',
        inboxCount: '14 indicadores',
        inboxPending: '2 críticos (demanda PO 1184/2026 con posible conflicto y buzón LexNET) y 4 avisos pendientes de revisar.',
        items,
        news,
        updates,
        steps: [
          { agent: AGENT, system: 'Gestor de expedientes', action: 'Lee los 14 indicadores de las 09:00 (plazos, colas, vencimientos, PBC, horas y facturación)', result: '14 indicadores recibidos, sin huecos', ms: 560 },
          { agent: AGENT, system: 'LexNET', action: 'Consulta el buzón del despacho y las notificaciones recibidas desde las 07:30', result: '41 notificaciones; 23 sin asignar, 9 de letrados ausentes', ms: 640, tone: 'crit' },
          { agent: AGENT, system: 'Gestor de expedientes', action: 'Identifica el expediente de cada notificación y busca partes contrarias en el histórico de clientes', result: 'PO 1184/2026 → PRC-2026-0412; la demandante fue cliente del despacho en 2025 (posible conflicto)', ms: 710, tone: 'crit' },
          { agent: AGENT, system: 'Outlook', action: 'Cruza los letrados asignados con el calendario de ausencias', result: '3 letrados de vacaciones; el de PRC-2026-0412 vuelve el 13-10-2026', ms: 380, tone: 'warn' },
          { agent: AGENT, system: 'Agentic Platform', action: 'Compara cada indicador con los umbrales del despacho (14 indicadores)', result: '2 críticos · 4 avisos · 8 sin incidencias', ms: 60, tone: 'crit' },
          { agent: AGENT, system: 'Agentic Platform', action: 'Calcula los plazos procesales en días hábiles (art. 133 LEC; agosto inhábil, festivos nacionales, autonómicos y locales de Málaga)', result: 'Contestación de PO 1184/2026: 27-10-2026; 11 plazos vencen en ≤ 5 días hábiles', ms: 120, tone: 'warn' },
          { agent: AGENT, system: 'Sede AEAT', action: 'Revisa el estado de la campaña del Impuesto sobre Sociedades y del pago fraccionado de octubre', result: '37 modelos 200 sin cerrar (vence el 25-10-2026); 64 modelos 202 del 1 al 20 de octubre', ms: 520, tone: 'warn' },
          { agent: AGENT, system: 'Gestor de expedientes', action: 'Cruza las horas sin imputar con las reclamaciones de cliente abiertas', result: 'REC-2026-0057: 22 h del asunto de Grupo Hostelero Costa del Sol sin imputar', ms: 360, tone: 'warn' },
          { agent: AGENT, system: 'Gestor de expedientes', action: 'Busca tareas abiertas de los indicadores con alerta', result: 'TAR-26-2987 (campaña de Sociedades) y TAR-26-3045 (horas sin imputar) ya abiertas', ms: 330 },
          { agent: AGENT, system: 'Modelo de lenguaje', action: 'Redacta la acción recomendada de cada alerta (6 llamadas)', result: '6 borradores, cada uno con su protocolo de referencia (PRO-PLZ-001, POL-CON-002, MAN-PBC-003, CAL-TRI-006)', ms: 5400 },
          { agent: AGENT, system: 'Gestor de expedientes', action: 'Crea TAR-26-3101 para PRC-2026-0412 · urgente', result: 'Creada y asignada al Socio responsable de Procesal; aceptación del encargo bloqueada', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'Gestor de expedientes', action: 'Crea TAR-26-3102 para el buzón LexNET · urgente', result: 'Creada y asignada a Secretaría procesal', ms: 230, tone: 'ok' },
          { agent: AGENT, system: 'Gestor de expedientes', action: 'Crea TAR-26-3103 para los plazos de 5 días · alta', result: 'Creada y asignada al Socio responsable de Procesal', ms: 220, tone: 'ok' },
          { agent: AGENT, system: 'Gestor de expedientes', action: 'Crea TAR-26-3104 para la diligencia debida PBC · media', result: 'Creada y asignada a Cumplimiento', ms: 220, tone: 'ok' },
          { agent: AGENT, system: 'Gestor de expedientes', action: 'Actualiza TAR-26-2987 (campaña de Sociedades) con la situación de hoy', result: 'Lectura añadida · prioridad alta propuesta · sin tarea duplicada', ms: 200 },
          { agent: AGENT, system: 'Gestor de expedientes', action: 'Actualiza TAR-26-3045 (horas sin imputar) con la lectura de hoy', result: 'Lectura añadida · sin tarea duplicada', ms: 200 },
          { agent: AGENT, system: 'Microsoft Teams', action: 'Publica el resumen en el canal «Dirección · resumen del día»', result: 'Enviado: 2 críticos, 4 avisos y 4 tareas', ms: 380, tone: 'ok' }
        ],
        stats: [
          { label: 'Indicadores revisados', value: 14 },
          { label: 'Tareas creadas', value: 4, tone: 'ok' },
          { label: 'Tareas actualizadas, sin duplicar', value: 2 },
          { label: 'Notificaciones por reasignar', value: 9, tone: 'crit' }
        ],
        relation: {
          title: 'Posible relación con la reclamación REC-2026-0057',
          body: 'Las 22 horas sin imputar del asunto de Grupo Hostelero Costa del Sol son de la misma semana que la minuta F-2026-0938 (18.400 €) que discute el cliente. Si se imputan tarde, el detalle de horas que acompaña a la minuta no cuadrará con el Gestor de expedientes.',
          more: 'Conviene cerrar la imputación antes de responder y contrastar las horas con la hoja de encargo HE-2026-0219 (POL-HON-004). A confirmar por el Socio responsable de Mercantil y Atención al cliente y facturación.',
          plain: 'Las 22 horas sin imputar del asunto de Grupo Hostelero Costa del Sol son de la misma semana que la minuta F-2026-0938 (18.400 €) de la reclamación REC-2026-0057. Conviene cerrar la imputación antes de responder y contrastar las horas con la hoja de encargo. A confirmar por el Socio responsable de Mercantil y Atención al cliente y facturación.',
          go: 'reclamacion',
          goLabel: 'Abrir la reclamación'
        },
        policy: 'Política aplicada: las tareas internas del Gestor de expedientes se crean sin aprobación previa; aceptar o rechazar un encargo, presentar escritos por LexNET, presentar modelos en la Sede AEAT o comunicarse con un cliente requiere la aprobación del letrado responsable o del Socio director (POL-CON-002 y PRO-PLZ-001).',
        channel: 'Dirección · resumen del día',
        resultSummary: '4 tareas creadas en el Gestor de expedientes, 2 tareas existentes actualizadas y resumen publicado en Microsoft Teams.',
        auditRequest: 'Despacho de Málaga · lecturas de las 09:00 · 14 indicadores',
        auditNew: 'Tarea creada en el Gestor de expedientes',
        auditUpdate: 'Tarea actualizada en el Gestor de expedientes',
        reportTitle: 'Resumen del día del despacho · Mora & Jordano',
        reportCode: 'RD-MJ-20260929',
        reportMeta: [['Sedes', 'Málaga (Calle Linaje) y Córdoba (Av. Gran Capitán)'], ['Jornada', 'Martes 29-09-2026'], ['Indicadores revisados', '14'], ['Críticos · avisos', '2 · 4']],
        reportSummary: 'De 14 indicadores revisados, 2 están en estado crítico y 4 en aviso. Esta mañana ha llegado por LexNET la demanda PO 1184/2026 contra Aceites Sierra Subbética, S.L., con posible conflicto de intereses y el letrado asignado de vacaciones, y el buzón acumula 23 notificaciones sin asignar. Se han creado 4 tareas en el Gestor de expedientes y se han actualizado 2 tareas existentes, sin duplicarlas.',
        signatures: [{ role: 'Socio director', note: 'Revisado' }, { role: 'Socio responsable de Procesal', note: 'Recibido' }]
      },
      presenter: {
        say: [
          'Así empieza el día el Socio director: lo que pide una decisión, en una sola bandeja.',
          'Los datos llegan de sus sistemas: notificaciones de LexNET, expedientes y horas del Gestor de expedientes, documentos de iManage, la Sede AEAT y las agendas de Outlook. Aquí son sintéticos, pero coherentes entre sí.',
          'El mapa resume el despacho por áreas y sedes: gris lo normal, color lo que pide atención. La demanda PO 1184/2026 está en rojo; al pulsarla se ven el juzgado, el plazo y lo que propone Agentic Platform.',
          'Tres asuntos: la demanda contra Aceites Sierra Subbética con posible conflicto de intereses, la reclamación de honorarios de Grupo Hostelero Costa del Sol y el resumen del día con 2 críticos.'
        ],
        sayBefore: ['Generar el resumen del día: revisa 14 indicadores, no duplica tareas abiertas y crea las nuevas. Fijaos en el tiempo.'],
        sayAfter: [
          'Relación que encuentra Agentic Platform: las horas sin imputar de esta semana son del asunto cuya minuta reclama Grupo Hostelero Costa del Sol. Nadie ha tenido que cruzar a mano el control de tiempos con las reclamaciones.',
          'Y no duplica: dos tareas ya abiertas se actualizan en lugar de abrir tareas nuevas.'
        ],
        next: 'Pulsar «Generar parte diario» y comentar el registro mientras se ejecuta.',
        nextAfter: 'Ir a «De palabras a workflow» (flecha derecha) para convertir el protocolo de notificaciones LexNET en el workflow wf-notificacion-lexnet.'
      }
    };
  })()
});
