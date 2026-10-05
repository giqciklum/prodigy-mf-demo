/* Banco Cierzo · resumen del turno (escena «turno»). Datos sintéticos de demostración (MFM). */
agenticPack('banca', {
  turno: (function () {
    'use strict';
    const hhmm = (i) => `${String(Math.floor((i * 5) / 60)).padStart(2, '0')}:${String((i * 5) % 60).padStart(2, '0')}`;
    /* Tasa de fraude en compras sin tarjeta presente del BIN 454812 (ventana móvil de 30 min), de 00:00 a 05:50. */
    const RATE = [0.32, 0.34, 0.29, 0.32, 0.28, 0.31, 0.29, 0.29, 0.29, 0.32, 0.33, 0.27, 0.33, 0.27, 0.29, 0.27, 0.27, 0.34, 0.28, 0.31,
      0.27, 0.3, 0.31, 0.27, 0.33, 0.31, 0.48, 0.58, 0.68, 0.77, 0.83, 0.94, 1.06, 1.11, 1.2, 1.34, 1.41, 1.54, 1.62, 1.73, 1.79, 1.93,
      2.04, 2.08, 2.22, 2.25, 2.38, 2.43, 2.6, 2.67, 2.79, 2.81, 2.97, 3.01, 3.17, 3.23, 3.33, 3.39, 3.41, 3.6, 3.44, 3.44, 3.43, 3.36,
      3.3, 3.22, 3.12, 3.06, 3.06, 2.93, 2.9];
    const AGENT = 'Parte diario de operaciones';

    const items = [
      { code: 'FAL-454812', name: 'Fraude sin tarjeta presente · BIN 454812', tag: 'Alarma', area: 'Prevención del fraude · Tarjeta Cierzo Débito', metric: 'tasa de fraude CNP (30 min)', reading: '2,9 %', baseline: '0,3 %', limits: 'aviso > 1 · crítico > 2 %', status: 'critical',
        note: '186 operaciones sospechosas por 41.230 € desde las 02:10; pico del 3,6 % a las 04:55. Patrón de pruebas de 1 € seguido de compras en comercios de electrónica.' },
      { code: 'ACS-3DS', name: 'Servidor de autenticación 3DS (ACS)', tag: 'Servicio esencial', area: 'Autorización · autenticación reforzada (SCA)', metric: 'autenticaciones caducadas', reading: '6,8 %', baseline: '0,8 %', limits: 'aviso > 3 · crítico > 5 %', status: 'critical',
        note: 'Desde las 01:50 el envío de OTP por SMS tarda más de 60 s. Más comercios aplican exenciones sin SCA, lo que ha facilitado el ataque al BIN 454812. Valorar la clasificación DORA.' },
      { code: 'SAC-COLA', name: 'Cola de reclamaciones del SAC', area: 'Servicio de Atención al Cliente', metric: 'expedientes que vencen en menos de 48 h', reading: '14', baseline: '≤ 5', limits: 'aviso > 8 · crítico > 20', status: 'warning',
        note: 'Incluye SAC-2026-04187 (cargos no reconocidos): la devolución provisional se decide hoy antes del fin del día hábil.' },
      { code: 'CB-RED', name: 'Retrocesiones Visa y Mastercard', area: 'Medios de pago · disputas', metric: 'retrocesiones por presentar con plazo < 5 días', reading: '38', baseline: '≤ 10', limits: 'aviso > 20 · crítico > 60', status: 'warning',
        note: 'Acumuladas por el expediente CPP-2609-07: 31 disputas de tarjetas del punto común pendientes de documentar.' },
      { code: 'ATM-RED', name: 'Red de cajeros', area: 'Canales · autoservicio', metric: 'cajeros fuera de servicio', reading: '27 de 612', baseline: '≤ 12 (2 %)', limits: 'aviso > 3 % · crítico > 8 %', status: 'warning',
        note: 'Incidencia abierta INC0218790 por la actualización del software de dispensador del fin de semana (19 cajeros en Aragón).' },
      { code: 'COB-T24', name: 'Cierre nocturno del core T24 (COB)', area: 'Core bancario', metric: 'retraso del cierre de día', reading: '+42 min', baseline: '0 min', limits: 'aviso > 30 · crítico > 90 min', status: 'warning',
        note: 'El cierre terminó a las 03:12 (previsto 02:30) por el volumen de la liquidación de Redsys; incidencia abierta INC0218811.' },
      { code: 'AUT-EMI', name: 'Autorizador emisor', area: 'Autorización', metric: 'tiempo medio de respuesta', reading: '182 ms', baseline: '170 ms', limits: 'aviso > 250 · crítico > 400 ms', status: null, note: '' },
      { code: 'RSY-LNK', name: 'Enlace con Redsys', area: 'Autorización', metric: 'disponibilidad (24 h)', reading: '100 %', baseline: '≥ 99,95 %', limits: 'aviso < 99,95 · crítico < 99,5 %', status: null, note: '' },
      { code: 'HSM-1', name: 'Módulos de seguridad (HSM)', area: 'Autorización', metric: 'latencia de verificación de PIN', reading: '4 ms', baseline: '4 ms', limits: 'aviso > 10 · crítico > 25 ms', status: null, note: '' },
      { code: 'FAL-GLB', name: 'Fraude en tarjetas · resto de BIN', area: 'Prevención del fraude', metric: 'tasa de fraude CNP (24 h)', reading: '0,05 %', baseline: '0,06 %', limits: 'aviso > 0,2 · crítico > 0,5 %', status: null, note: '' },
      { code: 'WEB', name: 'Banca online', area: 'Canales digitales', metric: 'disponibilidad (24 h)', reading: '99,98 %', baseline: '≥ 99,9 %', limits: 'aviso < 99,9 · crítico < 99,5 %', status: null, note: '' },
      { code: 'APP', name: 'App Banco Cierzo', area: 'Canales digitales', metric: 'errores de inicio de sesión', reading: '0,4 %', baseline: '0,5 %', limits: 'aviso > 1,5 · crítico > 3 %', status: null, note: '' },
      { code: 'BIZUM', name: 'Bizum', area: 'Pagos inmediatos', metric: 'operaciones rechazadas por error técnico', reading: '0,6 %', baseline: '0,7 %', limits: 'aviso > 2 · crítico > 5 %', status: null, note: '' },
      { code: 'PERS', name: 'Personalización de tarjetas', area: 'Medios de pago · proveedor externo', metric: 'capacidad libre de reemisión (24 h)', reading: '2.400 tarjetas', baseline: '≥ 1.500 tarjetas', limits: 'aviso < 1.000 · crítico < 300', status: null, note: '' }
    ];

    const news = [
      { id: 'INC0218841', equipment: 'FAL-454812', priority: 'P1 · fraude', tone: 'crit', owner: 'Responsable de Prevención del Fraude',
        action: 'Revisar las 186 operaciones del BIN 454812 y la regla preventiva propuesta en Falcon (comercio electrónico de riesgo alto). Bloquear tarjetas o activar la regla requiere aprobación (POL-FRA-003).' },
      { id: 'INC0218842', equipment: 'ACS-3DS', priority: 'P1 · servicio', tone: 'crit', owner: 'Riesgo tecnológico (DORA) y proveedor del ACS',
        action: 'Escalar al proveedor del ACS el retraso de las OTP por SMS (6,8 % de autenticaciones caducadas). Clasificar el incidente según el RTS de DORA: si es grave, notificación inicial en 4 h (PR-DORA-002).' },
      { id: 'TASK0094410', equipment: 'SAC-COLA', priority: 'Alta', tone: 'warn', owner: 'Servicio de Atención al Cliente (SAC)',
        action: 'Repartir los 14 expedientes que vencen en menos de 48 h; priorizar SAC-2026-04187 (devolución provisional antes del fin del día hábil, PSD2 art. 73).' },
      { id: 'TASK0094411', equipment: 'CB-RED', priority: 'Media', tone: 'warn', owner: 'Responsable de Medios de Pago',
        action: 'Documentar y presentar las 38 retrocesiones con plazo inferior a 5 días (31 del expediente CPP-2609-07).' }
    ];
    const updates = [
      { id: 'INC0218790', equipment: 'ATM-RED', priority: 'Alta (propuesta)', tone: 'warn', owner: 'Canales · autoservicio',
        action: 'Se añade la lectura de hoy (27 cajeros fuera de servicio, 19 en Aragón) a la incidencia abierta del software de dispensador y se propone subir la prioridad.' },
      { id: 'INC0218811', equipment: 'COB-T24', priority: 'Sin cambios', tone: 'warn', owner: 'Core bancario · explotación',
        action: 'Se añade el retraso de hoy (+42 min) a la incidencia abierta del cierre nocturno. No se crea una incidencia duplicada.' }
    ];

    return {
      title: 'Centro de Operaciones · turno de mañana',
      nav: 'Resumen del turno',
      clockLabel: 'Hora del centro',
      decider: 'Operaciones',
      kpis: [
        { label: 'Operaciones sospechosas · BIN 454812', value: 186, sub: '41.230 € desde las 02:10 · pico del 3,6 % a las 04:55', icon: 'shield', tone: 'crit', href: '#alarma' },
        { label: 'Tarjetas propuestas para reemisión', value: 214, sub: 'Tarjeta Cierzo Débito · bloqueo preventivo pendiente', icon: 'key', href: '#alarma' },
        { label: 'Reclamaciones con plazo hoy', value: 1, sub: 'SAC-2026-04187 · devolución provisional hoy', icon: 'mail', href: '#reclamacion' },
        { label: 'Servicios con alerta', value: '6 de 14', sub: '2 críticos · 4 avisos · lecturas de las 06:00', icon: 'gauge', action: 'scroll-parte' }
      ],
      map: {
        title: 'Mapa de operaciones · Centro de Operaciones',
        sub: 'Indicadores del parte de las 06:00 y de Falcon Fraud a las 05:50 · pulsa un elemento para ver su ficha',
        icon: 'building',
        readonly: 'Agentic Platform lee Falcon Fraud, Core bancario T24, Redsys y ServiceNow; no bloquea tarjetas ni cambia reglas sin aprobación',
        zones: [
          { id: 'can', title: 'Canales', sub: 'Clientes y comercios', items: [
            { code: 'WEB', name: 'Banca online', reading: '99,98 %', status: 'ok', kv: [['Sesiones (24 h)', '412.300']] },
            { code: 'APP', name: 'App Banco Cierzo', reading: '0,4 % errores', status: 'ok', kv: [['Usuarios activos (24 h)', '286.900']] },
            { code: 'ATM-RED', name: 'Cajeros', reading: '27 fuera', status: 'warn', note: '19 cajeros de Aragón fuera de servicio tras la actualización del dispensador; incidencia INC0218790 abierta.', kv: [['Parque', '612 cajeros'], ['Incidencia', 'INC0218790']] },
            { code: 'BIZUM', name: 'Bizum', reading: '0,6 % rechazos', status: 'ok' },
            { code: 'ECOM', name: 'Comercio electrónico', reading: '38.410 compras', status: null, tags: ['TIENDAONLINE-ELEC'], note: 'Compras CNP con tarjetas Cierzo esta noche (00:00–05:50). Ocho comercios concentran las 186 operaciones sospechosas.', kv: [['Con SCA', '71 %'], ['Con exención TRA o bajo importe', '29 %']] }
          ] },
          { id: 'aut', title: 'Autorización', sub: 'Emisor', items: [
            { code: 'RSY-LNK', name: 'Enlace Redsys', reading: '100 %', status: 'ok' },
            { code: 'AUT-EMI', name: 'Autorizador emisor', reading: '182 ms', status: 'ok', kv: [['Autorizaciones (24 h)', '1,92 millones']] },
            { code: 'ACS-3DS', name: 'ACS 3DS · SCA', reading: '6,8 % caducadas', status: 'crit', note: 'Las OTP por SMS llegan tarde desde las 01:50: más autenticaciones caducadas y más comercios que tiran de exención.', kv: [['Inicio', '01:50'], ['Proveedor', 'ACS externo (SaaS)'], ['DORA', 'Clasificación pendiente']] },
            { code: 'HSM-1', name: 'HSM', reading: '4 ms', status: 'ok' }
          ] },
          { id: 'fra', title: 'Prevención del fraude', sub: 'Falcon Fraud', items: [
            { code: 'FAL-454812', name: 'BIN 454812 · Débito', reading: '2,9 %', status: 'crit', tags: ['454812'], go: 'alarma', goLabel: 'Abrir la alarma',
              note: 'Ataque de prueba de tarjetas seguido de compras en electrónica. Agentic Platform propone una regla preventiva en Falcon, reemitir 214 tarjetas y avisar a los clientes por SMS y en la app.',
              kv: [['Operaciones sospechosas', '186 · 41.230 €'], ['Desde', '02:10'], ['Pico', '3,6 % a las 04:55'], ['Tarjetas afectadas', '214']] },
            { code: 'FAL-GLB', name: 'Resto de BIN', reading: '0,05 %', status: 'ok' },
            { code: 'FAL-Q', name: 'Cola de alertas', reading: '243 alertas', status: null, note: 'Alertas de Falcon pendientes de revisar por el analista de turno; 151 son del BIN 454812.', kv: [['Analistas de noche', '2'], ['Del BIN 454812', '151']] },
            { code: 'CPP', name: 'Puntos comunes', reading: '1 abierto', status: null, tags: ['CPP-2609-07'], go: 'retirada', goLabel: 'Simulacro del expediente', note: 'Expediente CPP-2609-07: TPV 3 de Gasolinera Ronda Norte (10–22/09). 61 de las tarjetas atacadas esta noche pasaron por allí.', kv: [['Tarjetas expuestas', '1.284'], ['De Banco Cierzo', '1.107']] }
          ] },
          { id: 'sac', title: 'Atención al cliente', sub: 'SAC y disputas', items: [
            { code: 'SAC-COLA', name: 'Reclamaciones SAC', reading: '14 vencen', status: 'warn', tags: ['SAC-2026-04187'], go: 'reclamacion', goLabel: 'Abrir la reclamación', note: '14 expedientes vencen en menos de 48 h; uno de ellos, SAC-2026-04187, pide decidir hoy la devolución provisional.', kv: [['Expedientes abiertos', '312'], ['Plazo de respuesta', '15 días hábiles']] },
            { code: 'CB-RED', name: 'Retrocesiones', reading: '38 por presentar', status: 'warn', kv: [['Del CPP-2609-07', '31']] },
            { code: 'CC', name: 'Contact center', reading: '41 s espera', status: null, kv: [['Llamadas de 00:00 a 06:00', '386'], ['Por fraude en tarjeta', '57']] }
          ] },
          { id: 'mdp', title: 'Medios de pago', sub: 'Core y tarjetas', items: [
            { code: 'COB-T24', name: 'Cierre T24', reading: '+42 min', status: 'warn', kv: [['Fin del cierre', '03:12 (previsto 02:30)'], ['Incidencia', 'INC0218811']] },
            { code: 'PERS', name: 'Personalización', reading: '2.400 libres', status: 'ok', note: 'Capacidad suficiente para reemitir las 214 tarjetas en 24 h.', kv: [['Entrega', 'Envío urgente en 48 h']] }
          ] }
        ]
      },
      inbox: {
        alarm: {
          icon: 'shield',
          title: 'BIN 454812 · pico de fraude sin tarjeta presente',
          meta: ['Alarma 05:50 · ALM-FRA-0550'],
          systems: ['Falcon Fraud'],
          body: 'Tasa de fraude CNP del 2,9 % frente al 0,3 % habitual desde las 02:10: 186 operaciones sospechosas por 41.230 € y 214 tarjetas afectadas. Pico del 3,6 % a las 04:55.'
        },
        complaint: {
          icon: 'mail',
          title: 'Reclamación SAC-2026-04187 · tres cargos no reconocidos',
          meta: ['28/09 09:14', 'Lucía Ferrer Gil', 'Tarjeta ····7731'],
          body: 'No reconoce tres cargos de TIENDAONLINE-ELEC del 26/09/2026 por 612,40 € en total. Expediente',
          trace: 'SAC-2026-04187',
          after: 'La devolución provisional se decide antes del fin del día hábil siguiente; respuesta definitiva antes del 20/10/2026.',
          due: 'Devolución hoy',
          goLabel: 'Abrir reclamación'
        }
      },
      chart: {
        title: 'BIN 454812 · tasa de fraude sin tarjeta presente',
        sub: 'Tarjeta Cierzo Débito · ventana móvil de 30 min · ahora 2,9 % (05:50)',
        icon: 'shield',
        tabLabel: 'Tasa de fraude',
        chart: {
          series: RATE.map((v, i) => ({ time: hhmm(i), value: v })),
          unit: '%',
          threshold: { value: 1, label: 'Aviso 1 %', legend: 'Umbral de aviso 1 % · 190 min por encima' },
          critical: { value: 2, label: 'Crítico 2 %', legend: 'Crítico 2 % · 140 min por encima' },
          peak: { x: '04:55', y: 3.6, label: '3,6 % · 04:55' },
          yTicks: [0, 1, 2, 3, 4],
          xTicks: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
          annotations: [{ x: '02:10', label: 'Inicio 02:10' }],
          bands: [
            { from: '02:10', to: '02:50', label: 'Pruebas de 1 €', tone: 'warn' },
            { from: '02:50', to: '05:50', label: 'Compras en electrónica' }
          ],
          seriesLabel: 'Fraude CNP del BIN 454812',
          shadeLabel: 'Por encima del aviso 02:40–05:50'
        },
        events: [
          { time: '01:50', text: 'El ACS de 3DS empieza a recibir las OTP por SMS con más de 60 s de retraso', tone: 'warn', tag: 'ACS-3DS' },
          { time: '02:10', end: '02:50', text: 'Micropagos de 0,50 a 1,00 € en comercios de suscripciones y donaciones con tarjetas del BIN 454812 (prueba de tarjetas)', tone: 'warn', tag: 'BIN 454812' },
          { time: '02:25', text: 'Falcon puntúa por encima de 850 doce operaciones; las alertas entran en la cola nocturna', tone: 'brand', tag: 'Falcon' },
          { time: '02:40', text: 'La tasa de fraude CNP del BIN supera el 1 %', tone: 'crit', tag: 'BIN 454812' },
          { time: '02:50', text: 'Empiezan compras de 150 a 400 € en comercios de electrónica y tarjetas regalo, con exención de bajo riesgo del adquirente', tone: 'crit', tag: 'TIENDAONLINE-ELEC' },
          { time: '03:30', text: 'Supera el nivel crítico del 2 %', tone: 'crit', tag: 'BIN 454812' },
          { time: '04:10', text: 'El analista de turno bloquea a mano 31 tarjetas con operaciones confirmadas', tone: 'brand', tag: 'Falcon' },
          { time: '04:55', text: 'Pico del 3,6 %', tone: 'crit', tag: 'BIN 454812' },
          { time: '05:50', text: 'Alarma ALM-FRA-0550: 186 operaciones sospechosas por 41.230 €; se escala al Responsable de Prevención del Fraude', tone: 'crit', tag: 'ALM-FRA-0550' }
        ],
        cause: 'Hipótesis a confirmar por Prevención del Fraude: ataque de enumeración sobre el BIN 454812 (números y caducidades probados con micropagos) seguido de compras en comercios que aplican la exención de análisis de riesgo del adquirente, sin SCA. El retraso de las OTP del ACS desde las 01:50 empujó a más comercios a usar exenciones. 61 de las tarjetas usadas esta noche pasaron entre el 10 y el 22/09 por el TPV 3 de Gasolinera Ronda Norte (CPP-2609-07).',
        system: 'Falcon Fraud',
        footer: 'Tasa recalculada cada 5 min sobre las compras CNP de los últimos 30 min'
      },
      parte: {
        agent: AGENT,
        title: 'Parte diario de operaciones',
        sub: 'Indicadores de las 06:00 · 14 servicios del Centro de Operaciones · umbrales de servicio',
        colItem: 'Servicio',
        systems: ['Falcon Fraud', 'ServiceNow'],
        inboxTitle: 'Parte diario de operaciones · indicadores de las 06:00',
        inboxCount: '14 servicios',
        inboxPending: '2 críticos (fraude en el BIN 454812 y el ACS de 3DS) y 4 avisos pendientes de revisar.',
        items,
        news,
        updates,
        steps: [
          { agent: AGENT, system: 'ServiceNow', action: 'Lee los indicadores de las 06:00 de 14 servicios (canales, autorización, fraude, SAC y medios de pago)', result: '14 indicadores recibidos, sin huecos', ms: 590 },
          { agent: AGENT, system: 'Falcon Fraud', action: 'Consulta la tasa de fraude por BIN y la cola de alertas de la noche', result: 'BIN 454812 al 2,9 % (186 operaciones, 41.230 €); resto de BIN al 0,05 %', ms: 620, tone: 'crit' },
          { agent: AGENT, system: 'Redsys', action: 'Revisa la autenticación 3DS y las exenciones aplicadas por los adquirentes', result: '6,8 % de autenticaciones caducadas desde las 01:50; 29 % de compras con exención', ms: 480, tone: 'crit' },
          { agent: AGENT, system: 'Agentic Platform', action: 'Compara cada indicador con sus umbrales de servicio (12 indicadores)', result: '2 críticos · 4 avisos · 8 sin incidencias', ms: 60, tone: 'crit' },
          { agent: AGENT, system: 'Core bancario T24', action: 'Agrupa por cliente las 214 tarjetas afectadas y comprueba su estado', result: '214 tarjetas activas de 209 clientes; 31 ya bloqueadas a mano a las 04:10', ms: 440 },
          { agent: AGENT, system: 'Falcon Fraud', action: 'Cruza las tarjetas atacadas con los expedientes de punto común abiertos', result: '61 tarjetas pasaron por el TPV 3 de Gasolinera Ronda Norte (CPP-2609-07)', ms: 410, tone: 'warn' },
          { agent: AGENT, system: 'Salesforce FSC', action: 'Cruza los comercios del ataque con las reclamaciones abiertas del SAC', result: 'SAC-2026-04187: cargos de TIENDAONLINE-ELEC, uno de los comercios de esta noche', ms: 370, tone: 'warn' },
          { agent: AGENT, system: 'GRC Archer', action: 'Aplica los criterios de clasificación de incidentes de DORA al ACS de 3DS', result: 'Posible incidente grave: clientes afectados > 10 % del servicio durante más de 2 h. A confirmar', ms: 520, tone: 'warn' },
          { agent: AGENT, system: 'ServiceNow', action: 'Busca incidencias abiertas de los servicios con alerta', result: 'INC0218790 (cajeros) e INC0218811 (cierre T24) ya abiertas', ms: 430 },
          { agent: AGENT, system: 'Modelo de lenguaje', action: 'Redacta la acción recomendada de cada alerta (6 llamadas)', result: '6 borradores, cada uno con su política de referencia (POL-FRA-003, PR-DORA-002, PR-SAC-001)', ms: 5600 },
          { agent: AGENT, system: 'ServiceNow', action: 'Crea INC0218841 para FAL-454812 · prioridad P1', result: 'Creada y asignada al Responsable de Prevención del Fraude', ms: 250, tone: 'ok' },
          { agent: AGENT, system: 'ServiceNow', action: 'Crea INC0218842 para ACS-3DS · prioridad P1', result: 'Creada y asignada a Riesgo tecnológico (DORA)', ms: 250, tone: 'ok' },
          { agent: AGENT, system: 'ServiceNow', action: 'Crea TASK0094410 para la cola del SAC · prioridad alta', result: 'Creada y asignada al SAC', ms: 220, tone: 'ok' },
          { agent: AGENT, system: 'ServiceNow', action: 'Crea TASK0094411 para las retrocesiones · prioridad media', result: 'Creada y asignada a Medios de pago', ms: 220, tone: 'ok' },
          { agent: AGENT, system: 'ServiceNow', action: 'Actualiza INC0218790 (cajeros) con la lectura de hoy', result: 'Lectura añadida · prioridad alta propuesta · sin incidencia duplicada', ms: 200 },
          { agent: AGENT, system: 'ServiceNow', action: 'Actualiza INC0218811 (cierre T24) con el retraso de hoy', result: 'Lectura añadida · sin incidencia duplicada', ms: 200 },
          { agent: AGENT, system: 'Microsoft Teams', action: 'Publica el resumen en el canal «Operaciones · turno de mañana»', result: 'Enviado: 2 críticos, 4 avisos y 4 tickets', ms: 390, tone: 'ok' }
        ],
        stats: [
          { label: 'Servicios revisados', value: 14 },
          { label: 'Tickets creados', value: 4, tone: 'ok' },
          { label: 'Incidencias actualizadas, sin duplicar', value: 2 },
          { label: 'Tarjetas a reemitir (propuesta)', value: 214, tone: 'crit' }
        ],
        relation: {
          title: 'Posible relación con la reclamación SAC-2026-04187',
          body: 'TIENDAONLINE-ELEC, el comercio de los tres cargos que no reconoce Lucía Ferrer Gil (26/09/2026, 612,40 €), concentra 23 de las 186 operaciones sospechosas de esta noche en el BIN 454812, el mismo de su tarjeta. Además, 61 de las tarjetas atacadas pasaron por el punto común CPP-2609-07.',
          more: 'Refuerza la hipótesis de fraude y apoya la devolución provisional (PSD2, art. 73). A confirmar por Prevención del Fraude y el SAC.',
          plain: 'TIENDAONLINE-ELEC, el comercio de los cargos de SAC-2026-04187 (Lucía Ferrer Gil, 612,40 €), concentra 23 de las 186 operaciones sospechosas de esta noche en el BIN 454812, el mismo de su tarjeta. 61 tarjetas atacadas pasaron por el punto común CPP-2609-07. Apoya la devolución provisional (PSD2, art. 73). A confirmar por Prevención del Fraude y el SAC.',
          go: 'reclamacion',
          goLabel: 'Abrir la reclamación'
        },
        policy: 'Política aplicada: las incidencias y tareas de ServiceNow se crean sin aprobación previa; bloquear tarjetas, activar reglas en Falcon, reemitir o notificar un incidente DORA requiere la aprobación del Responsable de Prevención del Fraude o de Riesgo tecnológico (POL-FRA-003, PR-DORA-002).',
        channel: 'Operaciones · turno de mañana',
        resultSummary: '2 incidencias y 2 tareas creadas en ServiceNow, 2 incidencias existentes actualizadas y resumen publicado en Microsoft Teams.',
        auditRequest: 'Centro de Operaciones · indicadores de las 06:00 · 14 servicios',
        auditNew: 'Ticket creado en ServiceNow',
        auditUpdate: 'Incidencia actualizada en ServiceNow',
        reportTitle: 'Parte diario de operaciones · Centro de Operaciones',
        reportCode: 'PD-COP-20260929',
        reportMeta: [['Centro', 'Centro de Operaciones · Madrid'], ['Turno', 'Mañana'], ['Servicios revisados', '14'], ['Críticos · avisos', '2 · 4']],
        reportSummary: 'De 14 servicios revisados, 2 están en estado crítico y 4 en aviso. El BIN 454812 sufre un ataque de prueba de tarjetas y compras sin tarjeta presente desde las 02:10 (186 operaciones, 41.230 €), favorecido por el retraso de las OTP del ACS de 3DS. Se han creado 2 incidencias y 2 tareas en ServiceNow y se han actualizado 2 incidencias existentes, sin duplicarlas.',
        signatures: [{ role: 'Director de Operaciones', note: 'Revisado' }, { role: 'Responsable de Prevención del Fraude', note: 'Recibido' }]
      },
      presenter: {
        say: [
          'Así empieza el turno el Director de Operaciones: lo que pide una decisión, en una sola bandeja.',
          'Los datos llegan de sus sistemas: alertas de Falcon, autorizaciones de Redsys, clientes y tarjetas del core T24, reclamaciones de Salesforce e incidencias de ServiceNow. Aquí son sintéticos, pero coherentes entre sí.',
          'El mapa resume la operación de un vistazo: gris lo normal, color lo que pide atención. El BIN 454812 está en rojo; al pulsarlo se ven las operaciones, el importe y lo que propone Agentic Platform.',
          'Tres asuntos: el pico de fraude del BIN 454812 de las 05:50 (186 operaciones, 41.230 €), la reclamación de Lucía Ferrer, que pide decidir hoy la devolución provisional, y el parte con 2 críticos.'
        ],
        sayBefore: ['Generar parte diario: revisa 14 servicios, no duplica incidencias abiertas y crea los tickets. Fijaos en el tiempo.'],
        sayAfter: [
          'Relación que encuentra Agentic Platform: el comercio de la reclamación de Lucía Ferrer aparece en el ataque de esta noche, y 61 tarjetas atacadas pasaron por el punto común de la gasolinera. Nadie ha tenido que cruzar Falcon, T24 y Salesforce.',
          'Y no duplica: dos incidencias ya abiertas se actualizan en lugar de abrir tickets nuevos.'
        ],
        next: 'Pulsar «Generar parte diario» y comentar el registro mientras se ejecuta.',
        nextAfter: 'Ir a «De palabras a workflow» (flecha derecha) para crear la respuesta al pico de fraude a partir de la política escrita.'
      }
    };
  })()
});
