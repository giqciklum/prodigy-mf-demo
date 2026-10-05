/* Mora & Jordano · alarma con aprobación: notificación LexNET de demanda contra un cliente (PRC-2026-0412),
 * con posible conflicto de intereses y el asociado asignado de vacaciones. Datos sintéticos de demostración (MFM):
 * personas, clientes y expedientes son ficticios. Las funciones reciben el contexto H de la escena
 * (W workflow, C condición evaluada, sc alcance vigente, ids generados al aprobar, fmt, fv, pl…). */
(function () {
  'use strict';

  /* Horas de despacho (08:00–20:00) que lleva la notificación sin revisión ni letrado efectivo, cada 5 min.
   * El traslado del procurador entró en LexNET el lunes 28/09 a las 17:52: a las 08:00 del martes ya suma 2,1 h. */
  const OFFSET = 128; /* minutos de despacho del lunes: 17:52 → 20:00 */
  const mins = (t) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
  const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  const SERIES = [];
  for (let m = mins('08:00'); m <= mins('11:00'); m += 5) {
    SERIES.push({ time: hhmm(m), value: Math.round(((OFFSET + m - mins('08:00')) / 60) * 10) / 10 });
  }

  /* Carpetas afectadas por la barrera de información (126 documentos, 181 h imputadas). */
  const SEG = [
    { id: 'PRC-2026-0412', title: 'Demanda y documentos notificados', sub: 'PO 1184/2026 · JPI nº 7 de Málaga · encargo sin aceptar', group: 'Nuevo encargo (defensa)', group_short: 'N', count: 14, qty: 2, hold: 'PLZ-1027' },
    { id: 'MER-2025-0219', title: 'Contrato de suministro de aceite a granel', sub: 'Asesoramiento a Almazara Hojiblanca del Genil, S.A. · 2025', group: 'Demandante · asunto 2025', group_short: 'A', count: 38, qty: 96, hold: 'CFL-0930' },
    { id: 'MER-2025-0241', title: 'Negociación del acuerdo de distribución', sub: 'Almazara Hojiblanca del Genil, S.A. · cerrado en nov. 2025', group: 'Demandante · asunto 2025', group_short: 'B', count: 21, qty: 58, hold: 'CFL-0930' },
    { id: 'COM-2025-0219', title: 'Correos y notas internas del equipo 2025', sub: 'Outlook y Teams archivados en iManage', group: 'Comunicaciones 2025', group_short: 'C', count: 47, qty: 22, hold: 'CFL-0930' },
    { id: 'FAC-2025-0219', title: 'Hoja de encargo y minutas de 2025', sub: 'Facturas F-2025-0611 y F-2025-0874', group: 'Honorarios 2025', group_short: 'D', count: 6, qty: 3, hold: 'CFL-0930' }
  ];
  /* Documentos de iManage, con numeración y fechas deterministas. */
  const KINDS = {
    'PRC-2026-0412': ['Demanda de juicio ordinario', 'Documento de la demanda', 'Diligencia de emplazamiento', 'Poder para pleitos'],
    'MER-2025-0219': ['Borrador de contrato', 'Informe jurídico', 'Nota de reunión', 'Anexo de precios', 'Versión firmada'],
    'MER-2025-0241': ['Borrador de acuerdo', 'Hoja de condiciones', 'Nota de negociación', 'Informe de riesgos'],
    'COM-2025-0219': ['Correo electrónico', 'Nota interna', 'Mensaje de Teams archivado'],
    'FAC-2025-0219': ['Hoja de encargo', 'Minuta de honorarios', 'Detalle de horas']
  };
  const UNITS = [];
  let seed = 11842026;
  const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
  let docNo = 4471203;
  SEG.forEach((s) => {
    const kinds = KINDS[s.id];
    const year = s.id === 'PRC-2026-0412' ? 2026 : 2025;
    for (let i = 0; i < s.count; i += 1) {
      docNo += 1 + Math.floor(rnd() * 37);
      const month = year === 2026 ? 9 : 2 + Math.floor(rnd() * 9);
      const day = year === 2026 ? 28 : 1 + Math.floor(rnd() * 27);
      UNITS.push({ item: s.id, doc: `MJ-${docNo}.${1 + Math.floor(rnd() * 3)}`, kind: kinds[i % kinds.length], date: `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`, hold: s.hold });
    }
  });

  const ROLE = {
    decider: 'Socio director', procesal: 'Socio responsable de Procesal', procesal_staff: 'Asociado sénior de Procesal',
    absent: 'Asociada de Procesal de la sede de Córdoba', mercantil: 'Socio responsable de Mercantil',
    compliance: 'Responsable de Cumplimiento (PBC y RGPD)', client_care: 'Atención al cliente y facturación', it: 'Sistemas y seguridad de la información'
  };
  const TEAMS = 'Procesal · plazos y notificaciones';
  const CLIENT = 'Aceites Sierra Subbética, S.L.';
  const PLAINTIFF = 'Almazara Hojiblanca del Genil, S.A.';
  const hours = (sc) => sc.items.reduce((s, x) => s + x.qty, 0);
  const old = (sc) => sc.items.filter((x) => x.id !== 'PRC-2026-0412');

  agenticPack('abogados', {
    alarma: {
      nav: 'Alarma LexNET PRC-2026-0412',
      title: 'Alarma LexNET PRC-2026-0412 en ejecución',
      icon: 'scale',
      page_title: 'PRC-2026-0412 · demanda notificada por LexNET sin letrado ni control de conflictos',
      alarm_id: 'ALM-LEX-1025',
      alarm_time: '10:25',
      source_system: 'LexNET',
      asset: 'Notificación LexNET · PO 1184/2026',
      location: 'Sede de Málaga · Procesal',
      excursion_noun: 'notificación sin atender',
      workflow_topic: 'notificaciones de LexNET',
      policy_ref: 'PRO-PLZ-001',
      procedures: 'PRO-PLZ-001 · POL-CON-002 · POL-HON-004',
      decider_short: 'Socio director',
      decider_of: 'del Socio director',
      approval_node: 'Aprobación del Socio director',
      measure: { short: 'horas sin revisar ni asignar', col: 'Horas sin atender', unit: 'h', dec: 1, icon: 'clock' },
      setpoint: 2,
      setpoint_label: 'objetivo de revisión',
      limit: 4,
      critical: 5,
      min_minutes: 30,
      interval_min: 5,
      series: SERIES,
      peak: 5.1,
      peak_time: '11:00',
      current: 5.1,
      current_time: '11:00',
      current_note: 'sigue sin letrado efectivo y con el conflicto sin resolver',
      chart: {
        title: 'Notificación PO 1184/2026 · horas de despacho sin atender',
        sub: 'Objetivo 2 h · límite 4 h (PRO-PLZ-001) · ahora 5,1 h (11:00)',
        tab: 'Horas sin atender',
        series_label: 'Horas de despacho sin revisión ni letrado efectivo (Gestor de expedientes)',
        yTicks: [0, 1, 2, 3, 4, 5, 6],
        xTicks: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00']
      },
      event_kv: [
        ['Notificación', 'LexNET · traslado del procurador del 28/09/2026 a las 17:52 · entra en el Gestor a las 08:12'],
        ['Procedimiento', 'Juicio ordinario 1184/2026 · Juzgado de Primera Instancia nº 7 de Málaga · reclamación de 412.680 € por incumplimiento de contrato de suministro'],
        ['Partes', `Demandada: ${CLIENT} (cliente) · Demandante: ${PLAINTIFF}`],
        ['Plazo', 'Contestación en 20 días hábiles (art. 404 LEC): vence el 27/10/2026 · día de gracia hasta las 15:00 del 28/10 (art. 135.5 LEC)']
      ],
      events: [
        { time: '08:00', end: '08:40', text: 'La notificación espera en la bandeja de Secretaría procesal desde el lunes a las 17:52 (fuera del horario de la secretaría)', ref: 'LEX-0928-1752', tone: 'warn', band: 'Sin revisar', bandTone: 'warn' },
        { time: '08:12', text: 'El Gestor de expedientes registra la notificación y abre el expediente PRC-2026-0412 en estado «pendiente de aceptación»', equipment: 'Gestor de expedientes', tone: 'brand' },
        { time: '08:40', end: '11:00', text: `Reparto automático a la ${ROLE.absent}: respuesta de ausencia, de vacaciones hasta el 13/10 y sin sustituto designado`, tone: 'crit', band: 'Asignada a una letrada ausente' },
        { time: '09:05', text: `El control de conflictos encuentra a ${PLAINTIFF} como cliente del área Mercantil en 2025 (MER-2025-0219 y MER-2025-0241)`, ref: 'POL-CON-002', tone: 'crit' },
        { time: '09:55', text: 'La notificación supera las 4 h de despacho sin revisión, límite de PRO-PLZ-001', ref: 'PRO-PLZ-001', tone: 'warn' },
        { time: '10:25', text: 'Alarma ALM-LEX-1025: más de 30 min por encima del límite, sin letrado efectivo y con un posible conflicto de intereses', ref: 'ALM-LEX-1025', tone: 'crit' },
        { time: '10:40', text: `El director financiero de ${CLIENT} pregunta por correo si el despacho ha recibido la demanda`, equipment: 'Outlook', tone: 'brand' },
        { time: '10:55', text: 'Supera las 5 h sin atender: nivel crítico, aviso al socio según PRO-PLZ-001', ref: 'PRO-PLZ-001', tone: 'crit' }
      ],
      probable_cause: 'La notificación entró el lunes por la tarde, fuera del horario de la secretaría procesal, y el reparto automático la asignó por carga de trabajo a una asociada que está de vacaciones, sin comprobar el calendario de ausencias. Además, el control de conflictos de POL-CON-002 solo se lanza al aceptar el encargo, no al recibir la notificación: el despacho asesoró en 2025 a la demandante en el mismo contrato de suministro que ahora se discute, con riesgo de usar información confidencial de una antigua cliente (art. 12 del Código Deontológico de la Abogacía). A confirmar por el comité de conflictos.',
      backup: { id: 'wf-notificacion-lexnet-respaldo', name: 'Notificación de LexNET sin atender', version: 'v1', threshold: 4, minutes: 30, critical: 5, approver: ROLE.decider },
      untouched: 'el Gestor de expedientes, iManage, Outlook ni Teams',
      apply_systems: 'iManage, Gestor de expedientes, Outlook y Microsoft Teams',
      llm_cost_usd: 0.07,
      ids: [
        { key: 'bar', prefix: 'BAR-2026-', start: 31, label: 'Barrera de información' },
        { key: 'cfl', prefix: 'CFL-2026-', start: 118, label: 'Expediente de conflicto' },
        { key: 'plz', prefix: 'PLZ-2026-', start: 2291, label: 'Plazo en agenda' },
        { key: 'com', prefix: 'COM-CLI-2026-', start: 640, label: 'Comunicación al cliente' }
      ],
      block_id_key: 'bar',
      proposer: 'enc',
      lanes: [
        { id: 'mon', name: 'Monitor de notificaciones', short: 'Monitor', icon: 'inbox', systems: ['LexNET', 'Gestor de expedientes'], idle: 'Confirma que la notificación sigue sin atender', gsub: 'confirma la notificación', gsys: ['LexNET', 'Gestor'] },
        { id: 'traz', name: 'Conflictos y documentos', short: 'Conflictos', icon: 'git-branch', systems: ['Gestor de expedientes', 'iManage', 'Outlook'], idle: 'Identifica el expediente, comprueba conflictos y calcula el plazo', gsub: 'expediente, conflictos y plazo', gsys: ['Gestor', 'iManage', 'Outlook'] },
        { id: 'enc', phase: 2, name: 'Aceptación del encargo', short: 'Encargo', icon: 'scale', systems: ['Gestor de expedientes', 'iManage', 'Aranzadi'], idle: 'Prepara la barrera, la reasignación y pide la aprobación', gsub: 'barrera y reasignación', gsys: ['Gestor', 'iManage'] },
        { id: 'plz', phase: 2, name: 'Plazos', icon: 'calendar', systems: ['Gestor de expedientes', 'Outlook'], idle: 'Anota el plazo y las alertas en la agenda', gsub: 'plazo y alertas', gsys: ['Gestor', 'Outlook'] },
        { id: 'cli', phase: 2, name: 'Cliente', icon: 'users', systems: ['Outlook', 'Microsoft Teams'], idle: 'Comunica la situación al cliente y avisa al equipo', gsub: 'comunicación y aviso', gsys: ['Outlook', 'Teams'] }
      ],
      steps: {
        p1: (H) => {
          const a = H.all;
          return [
            { lane: 'mon', system: 'LexNET', verb: 'Consultando', action: 'Lee el buzón de LexNET del despacho y el acuse de la notificación del PO 1184/2026', result: 'Traslado del procurador del 28/09 a las 17:52 · demanda y 13 documentos · efectos del 28/09', ms: 1600, set: { volume: '1 notificación · 14 documentos' } },
            { lane: 'mon', system: 'Agentic Platform', eval: true, ms: 90 },
            { lane: 'mon', system: 'Gestor de expedientes', verb: 'Consultando', action: 'Comprueba quién la tiene asignada y si alguien la ha revisado', result: `Asignada a las 08:40 a la ${ROLE.absent}, de vacaciones hasta el 13/10 · nadie la ha abierto`, tone: 'warn', ms: 1400, set: { volume: `${SERIES.length} lecturas · 1 notificación`, result: `Sin atender: ${H.C.above} min por encima de ${H.fv(H.C.threshold)}` } },
            { lane: 'traz', system: 'Gestor de expedientes', verb: 'Consultando', action: 'Identifica el expediente, el cliente y las partes', result: `PRC-2026-0412 · ${CLIENT} (demandada) · demandante ${PLAINTIFF}`, ms: 1900, set: { volume: '1 expediente · 2 partes' } },
            { lane: 'traz', system: 'Gestor de expedientes', verb: 'Consultando', action: 'Busca las partes en clientes, contrarios y asuntos de los últimos 5 años (POL-CON-002)', result: `Coincidencia: el despacho asesoró a la demandante en 2025 en el mismo contrato de suministro (MER-2025-0219 y MER-2025-0241)`, tone: 'warn', ms: 2400, set: { volume: '1 expediente · 2 asuntos de 2025' }, reveal: 'lots' },
            { lane: 'traz', system: 'iManage', verb: 'Consultando', action: 'Localiza los documentos de los asuntos de 2025 y quién tuvo acceso', result: `${a.count} documentos en ${a.items.length} carpetas · ${H.fmt.num(hours(a))} h imputadas · 7 profesionales con acceso, 2 de ellos en el equipo previsto para la defensa`, ms: 2600, set: { volume: `${a.count} documentos · ${a.items.length} carpetas` } },
            { lane: 'traz', system: 'Outlook', verb: 'Consultando', action: 'Busca copias de esos asuntos fuera de iManage', result: `${a.elseTotal} elementos en buzones y en Teams · ${H.goneTotal} documentos entregados a la demandante al cerrar en 2025`, ms: 1800, reveal: 'map' },
            { lane: 'traz', system: 'Gestor de expedientes', verb: 'Calculando', action: 'Calcula el plazo de contestación con el calendario procesal (agosto inhábil, festivos nacionales, de Andalucía y locales de Málaga)', result: '20 días hábiles del 29/09 al 27/10 (excluye fines de semana y el 12/10) · día de gracia hasta las 15:00 del 28/10', tone: 'warn', ms: 1500, set: { volume: `${a.count} documentos · ${a.holds.length} hitos`, result: `Primer hito: ${H.first.id}, ${H.holdWhen(H.first)}` }, milestone: 'traz', audit: { action: 'Expediente, conflicto y plazo identificados', detail: `PRC-2026-0412 · posible conflicto con ${PLAINTIFF} (cliente en 2025) · ${a.count} documentos afectados · contestación hasta el 27/10/2026` } },
            { lane: 'enc', node: 'apr', system: 'Procedimientos', verb: 'Analizando', action: 'Aplica POL-CON-002, PRO-PLZ-001 y el art. 12 del Código Deontológico de la Abogacía', result: 'No aceptar el encargo sin decisión del Socio director; barrera de información sobre los asuntos de 2025 y equipo de defensa sin relación con ellos', ms: 1300 },
            { lane: 'enc', node: 'apr', system: 'Aranzadi', verb: 'Consultando', action: 'Busca doctrina deontológica sobre defensa frente a un antiguo cliente en asunto relacionado', result: '4 resoluciones de comisiones deontológicas: el riesgo está en el uso de información confidencial, no en el mero paso del tiempo', ms: 2100 },
            { lane: 'enc', node: 'apr', system: 'Modelo de lenguaje', verb: 'Redactando', action: 'Redacta la propuesta y su motivo con las evidencias', result: `Propuesta: barrera sobre ${a.count} documentos, encargo en suspenso hasta el comité, reasignación al ${ROLE.procesal_staff}, plazo en agenda y comunicación al cliente`, ms: 6400, set: { volume: `${a.count} documentos · 1 encargo` } },
            { lane: 'enc', node: 'apr', system: 'Agentic Platform', verb: 'Evaluando', action: `Pide la aprobación del ${H.W.approver} antes de escribir en iManage y el Gestor y de comunicar nada al cliente`, result: 'Esperando la decisión del Socio director', tone: 'warn', ms: 60, wait: 1500, set: { result: 'Propuesta enviada al Socio director' }, milestone: 'prop', audit: { action: 'Propuesta de barrera, reasignación y comunicación enviada a aprobación', detail: `PRC-2026-0412 · ${a.count} documentos · aprueba ${H.W.approver} (POL-CON-002)` } }
          ];
        },
        p2: (H) => {
          const sc = H.sc;
          const ids = H.ids;
          return [
            { lane: 'enc', system: 'iManage', verb: 'Aplicando', action: `Crea la barrera de información sobre ${sc.count} documentos: solo el Socio director y Cumplimiento pueden abrirlos`, result: `${ids.bar} activa · los 7 profesionales del equipo de 2025 quedan fuera del expediente PRC-2026-0412`, tone: 'ok', ms: 2100, milestone: 'bar', audit: { action: 'Barrera de información activada', detail: `${ids.bar} · iManage · ${sc.count} documentos en ${sc.items.length} carpetas` } },
            { lane: 'enc', system: 'Gestor de expedientes', verb: 'Aplicando', action: 'Mantiene PRC-2026-0412 «pendiente de aceptación» y abre el expediente de conflicto para el comité', result: `${ids.cfl} · comité de conflictos el 30/09 a las 10:00 · sin hoja de encargo hasta su decisión (POL-HON-004)`, tone: 'ok', ms: 1700, set: { result: `${ids.bar} activa · ${ids.cfl} abierto` }, milestone: 'cfl', audit: { action: 'Expediente de conflicto abierto', detail: `${ids.cfl} · Gestor de expedientes · encargo PRC-2026-0412 en suspenso` } },
            { lane: 'enc', system: 'Gestor de expedientes', verb: 'Aplicando', action: `Reasigna la notificación al ${ROLE.procesal_staff}, sin relación con los asuntos de 2025`, result: `Letrado efectivo asignado · supervisa el ${ROLE.procesal} · la ${ROLE.absent} sale del reparto hasta el 13/10`, tone: 'ok', ms: 1200, milestone: 'reas', audit: { action: 'Notificación reasignada', detail: `PRC-2026-0412 · ${ROLE.procesal_staff} · supervisión del ${ROLE.procesal}` } },
            { lane: 'plz', system: 'Gestor de expedientes', verb: 'Aplicando', action: 'Anota el plazo de contestación con alertas a 10, 5 y 2 días hábiles', result: `${ids.plz} · vence el 27/10/2026 · día de gracia hasta las 15:00 del 28/10`, tone: 'ok', ms: 1500, set: { volume: '1 plazo · 3 alertas' }, milestone: 'plz', audit: { action: 'Plazo procesal anotado', detail: `${ids.plz} · contestación PO 1184/2026 · 27/10/2026 · PRO-PLZ-001` } },
            { lane: 'plz', system: 'Outlook', verb: 'Aplicando', action: 'Bloquea en la agenda el comité de conflictos y las fechas de trabajo del escrito', result: 'Comité 30/09 10:00 · borrador de contestación 19/10 · revisión del socio 23/10', tone: 'ok', ms: 1100, set: { volume: '1 plazo · 3 alertas · 3 citas', result: `${ids.plz} en agenda` }, milestone: 'agenda', audit: { action: 'Agenda actualizada', detail: `Outlook · ${ROLE.decider}, ${ROLE.procesal} y ${ROLE.procesal_staff}` } },
            { lane: 'cli', system: 'Modelo de lenguaje', verb: 'Redactando', action: 'Redacta la comunicación al cliente y el plan de actuación del encargo', result: 'Correo al cliente con el plazo y los próximos pasos · plan A1–A8 en borrador', ms: 6800, milestone: 'plan', audit: { action: 'Plan de actuación redactado', detail: `${ids.cfl} · A1–A8 · comunicación al cliente revisada por el ${ROLE.decider}` } },
            { lane: 'cli', system: 'Outlook', verb: 'Enviando', action: `Envía la comunicación al director financiero de ${CLIENT}`, result: `${ids.com} · enviada y archivada en iManage dentro de PRC-2026-0412`, tone: 'ok', ms: 1300, set: { volume: '1 comunicación al cliente' }, milestone: 'com', audit: { action: 'Cliente informado', detail: `${ids.com} · Outlook · ${CLIENT} · sin datos de la antigua cliente` } },
            { lane: 'cli', system: 'Microsoft Teams', verb: 'Enviando', action: `Avisa al ${ROLE.procesal}, al ${ROLE.procesal_staff} y a ${ROLE.compliance}`, result: `Aviso publicado en el canal «${TEAMS}»`, tone: 'ok', ms: 900, wait: 1600, set: { volume: '1 comunicación · 1 aviso interno', result: `${ids.com} enviada · equipo avisado` }, milestone: 'teams', audit: { action: 'Aviso enviado por Microsoft Teams', detail: `${ROLE.procesal}, ${ROLE.procesal_staff} y ${ROLE.compliance} · canal «${TEAMS}»` } }
          ];
        }
      },
      kpis: (H, held) => [
        { label: 'Documentos afectados por el conflicto', value: H.all.count, sub: `${H.fmt.num(hours(H.all))} h imputadas · ${old(H.all).length} carpetas de 2025 y la demanda`, icon: 'file-text' },
        { label: 'Primer hito del encargo', value: H.holdWhen(H.first), sub: `${H.first.id} · ${H.pl(H.holdCount(H.all, H.first))}${held ? ' · anotado' : ''} · contestación hasta el 27/10`, icon: 'calendar' }
      ],
      scope: {
        icon: 'file-text',
        unit: ['documento', 'documentos'],
        item_noun: ['carpeta', 'carpetas'],
        qty_unit: 'h',
        per_square: 2,
        items: SEG.map((s, i) => Object.assign({}, s, i === 1 ? {
          elsewhere: [{ loc: 'Teams · canal Mercantil', count: 9, note: 'borradores compartidos en 2025, sin archivar en iManage' }],
          gone: [{ id: 'ENT-2025-1104', date: '2025-11-04', time: '12:30', count: 12, to: 'Entregados a la demandante al cerrar el asunto (copia en su poder)' }]
        } : i === 3 ? {
          elsewhere: [{ loc: 'Buzones de Outlook', count: 23, note: 'correos de 2025 fuera de iManage en buzones personales' }]
        } : i === 4 ? {
          gone: [{ id: 'ENT-2025-1128', date: '2025-11-28', time: '09:15', count: 4, to: 'Minutas remitidas a la demandante (originales en su poder)' }]
        } : {})),
        holds: {
          'CFL-0930': { date: '2026-09-30', time: '10:00', where: 'Comité de conflictos · decisión según POL-CON-002', label: 'Comité' },
          'PLZ-1027': { date: '2026-10-27', time: '23:59', where: 'Vence la contestación (art. 404 LEC) · gracia hasta las 15:00 del 28/10', label: 'Plazo' }
        },
        units: UNITS,
        csv_name: 'documentos-barrera-prc-2026-0412',
        csv_cols: [
          { label: 'Carpeta', key: 'item' },
          { label: 'Documento (iManage)', key: 'doc', text: true },
          { label: 'Tipo', key: 'kind' },
          { label: 'Fecha', key: 'date', text: true },
          { label: 'Hito', key: 'hold' }
        ],
        labels: {
          items_title: 'Documentos afectados por el posible conflicto',
          items_systems: 'Gestor de expedientes, iManage y Outlook',
          items_where: 'notificación sin atender',
          item_col: 'Carpeta',
          at_col: 'Documentos',
          group_col: 'Asunto',
          hold_col: 'Hito',
          else_col: 'Copias fuera de iManage',
          else_none: 'Ninguna',
          gone_verb: 'entregados',
          exposed: 'Accesible',
          blocked: 'Tras la barrera',
          unblocked: 'Sin barrera',
          block_noun: 'barrera de información',
          block_verb: 'Aislar',
          hold_verb: 'Anotar',
          held: 'Anotados',
          holds_label: 'Hitos que condicionan el encargo',
          holds_first: 'el primero',
          scope_main: 'Documentos de la demanda y de los asuntos de 2025 de la demandante',
          else_scope: 'Copias fuera de iManage',
          else_decision: 'Revisar',
          map_title: 'Documentos por carpeta',
          map_sub: 'iManage · PRC-2026-0412 y asuntos de 2025',
          zone_title: 'Documentos a aislar por carpeta',
          zone_sub: '5 carpetas',
          else_title: 'Copias fuera de iManage',
          else_sub: 'a revisar por Sistemas, sin barrera',
          gone_title: 'Documentos entregados antes de la alarma',
          legend_exposed: 'Documento accesible',
          legend_else: 'A revisar',
          csv_button: 'Descargar documentos (CSV)',
          value_label: '',
          report_scope: 'Alcance de la barrera de información'
        }
      },
      text: {
        proposal_title: 'propuesta de barrera, reasignación y comunicación al cliente',
        stop_without: 'proponer barrera ni comunicación al cliente',
        activates: 'la barrera ni la comunicación al cliente',
        no_proposal: 'sin propuesta sobre el encargo',
        idle_log: 'La ejecución se detiene en la aprobación: nada se escribe en iManage ni en el Gestor, y nada se comunica al cliente, sin la decisión del Socio director.',
        approve_action: 'Aprueba la barrera, la reasignación y la comunicación al cliente',
        scope_short: (H) => `barrera sobre ${H.pl(H.sc.count)}, encargo en suspenso hasta el comité, reasignación al ${ROLE.procesal_staff} y comunicación a ${CLIENT}`,
        audit_approved: 'Barrera, reasignación y comunicación aprobadas',
        audit_approved_detail: (H) => `${H.ids.bar} · ${H.ids.cfl} · ${H.sc.count} documentos en ${H.sc.items.length} carpetas · plazo ${H.ids.plz}${H.sc.out.length ? ` · alcance editado (sin ${H.sc.out.map((l) => l.id).join(', ')})` : ''}`,
        outcome_approved: (H) => `Barrera ${H.ids.bar} aprobada · ${H.sc.count} documentos`,
        audit_rejected: 'Barrera, reasignación y comunicación rechazadas',
        outcome_rejected: 'Propuesta rechazada · sin acciones aplicadas',
        toast_done: (H) => `${H.ids.bar} activa · plazo ${H.ids.plz} anotado · cliente informado (${H.ids.com})`,
        presenter_applying: 'Tras la aprobación: barrera en iManage, encargo en suspenso y reasignación en el Gestor, plazo en agenda y comunicación al cliente.',
        reject_nothing: 'ni barrera en iManage, ni reasignación o plazo en el Gestor, ni comunicación al cliente, ni aviso al equipo',
        edit_intro: 'POL-CON-002 pide aislar todos los documentos de los asuntos relacionados con la antigua cliente.'
      },
      approval: {
        id: 'bar-prc-2026-0412',
        approve_label: 'Aprobar barrera y comunicación',
        policy: 'POL-CON-002 · PRO-PLZ-001 · art. 12 del Código Deontológico',
        title: (H) => `Barrera de información sobre ${H.sc.count} documentos y comunicación al cliente`,
        summary: (H) => `Motivo: la notificación del PO 1184/2026 lleva más de ${H.fv(H.C.threshold)} de despacho sin revisar ni asignar durante ${H.C.above} min (${H.span}), más de los ${H.C.minutes} min que fija ${H.W.backup ? 'PRO-PLZ-001' : 'el workflow'}${H.critMin ? `, y ${H.critMin} min por encima de ${H.fv(H.crit)}: nivel crítico` : ''}. Además, el despacho asesoró en 2025 a la demandante en el mismo contrato. Se aíslan los documentos, el encargo queda en suspenso hasta el comité, se reasigna a un letrado sin relación con 2025 y se informa al cliente del plazo.`,
        extra_scope: (H) => [{ label: 'Encargo PRC-2026-0412 en suspenso hasta el comité de conflictos (POL-CON-002)', value: '30/09 10:00', status: 'warn', chip: H.decision && H.decision.status === 'approved' ? 'En suspenso' : 'Suspender' }],
        effects: (H) => [
          `iManage: barrera de información sobre ${H.sc.count} documentos`,
          `Gestor de expedientes: encargo en suspenso, expediente de conflicto y reasignación al ${ROLE.procesal_staff}`,
          'Gestor de expedientes y Outlook: plazo de contestación hasta el 27/10/2026 con alertas',
          `Outlook: comunicación al director financiero de ${CLIENT}`,
          `Microsoft Teams: aviso al ${ROLE.procesal} y a ${ROLE.compliance}`
        ],
        applied: (H) => [
          `iManage: ${H.ids.bar} activa`,
          `Gestor de expedientes: ${H.ids.cfl} y reasignación al ${ROLE.procesal_staff}`,
          `Gestor de expedientes: ${H.ids.plz} · vence el 27/10/2026`,
          `Outlook: ${H.ids.com} enviada a ${CLIENT}`,
          `Microsoft Teams: aviso en «${TEAMS}»`
        ]
      },
      result: {
        title: (H) => `Barrera ${H.ids.bar} activa, plazo ${H.ids.plz} anotado y cliente informado`,
        stats: (H) => [
          { label: 'Documentos tras la barrera', value: H.sc.count, tone: 'crit' },
          { label: 'Días hábiles para contestar', value: 20 },
          { label: 'Profesionales excluidos', value: 7 },
          { label: 'Copias a revisar', value: H.sc.elseTotal, tone: 'warn' }
        ],
        tiles: (H) => [
          {
            icon: 'lock', tone: 'crit', title: `Barrera ${H.ids.bar} y expediente ${H.ids.cfl}`, systems: ['iManage', 'Gestor de expedientes'],
            kv: [
              ['Estado', App.chip('blocked')],
              ['Barrera', 'Solo el Socio director y Cumplimiento abren los documentos de 2025 · 7 profesionales excluidos'],
              ['Documentos', `${H.pl(H.sc.count)} · ${H.fmt.plural(H.sc.items.length, 'carpeta', 'carpetas')}`],
              ['Horas imputadas', `${H.fmt.num(hours(H.sc))} h`],
              ['Decide', `${ROLE.decider}, con el comité de conflictos (POL-CON-002)`]
            ],
            next: 'Siguiente paso según POL-CON-002: el comité del 30/09 decide si se acepta el encargo con la barrera o se declina y se ayuda al cliente a buscar otro despacho a tiempo.',
            buttons: [{ action: 'csv', label: 'Documentos tras la barrera (CSV)' }]
          },
          {
            icon: 'calendar', title: `Plazo ${H.ids.plz} y reasignación`, systems: ['Gestor de expedientes', 'Outlook'], chip: ['running', 'En curso'],
            kv: [
              ['Vencimiento', '27/10/2026 · día de gracia hasta las 15:00 del 28/10 (art. 135.5 LEC)'],
              ['Cómputo', '20 días hábiles desde el 29/09 · excluye fines de semana y el 12/10'],
              ['Alertas', '13/10, 20/10 y 23/10 (10, 5 y 2 días hábiles)'],
              ['Hitos', H.sc.holds.map((h) => `${h.id} (${H.holdWhen(h)})`).join(', ')],
              ['Letrado', `${ROLE.procesal_staff} · supervisa el ${ROLE.procesal}`]
            ]
          },
          {
            icon: 'clipboard', title: `Plan de actuación ${H.ids.cfl}`, systems: ['Gestor de expedientes', 'iManage'], chip: ['draft', 'Borrador'],
            items: PLAN(H),
            buttons: [{ action: 'report-doc', icon: 'printer', label: 'Descargar plan de actuación (PDF)' }]
          },
          {
            icon: 'send', title: 'Comunicación al cliente', systems: ['Outlook'], note: H.run.endAt ? `enviada a las ${H.fmt.time(H.run.endAt)}` : '',
            message: {
              icon: 'mail', from: 'Mora & Jordano', channel: `Correo al director financiero de ${CLIENT}`, at: H.run.endAt ? H.fmt.time(H.run.endAt) : '',
              paras: [
                { text: 'Hemos recibido la demanda de juicio ordinario 1184/2026 del Juzgado de Primera Instancia nº 7 de Málaga. El plazo para contestar vence el 27 de octubre y ya está anotado y controlado; no tiene que hacer nada por ahora.' },
                { text: 'Antes de aceptar formalmente la defensa estamos completando nuestro control interno de conflictos de intereses. Le confirmaremos la decisión mañana, 30 de septiembre, antes de las 14:00, con margen suficiente en cualquier caso para preparar la contestación. Mientras tanto, le pedimos que conserve toda la documentación del contrato de suministro.' }
              ]
            }
          }
        ]
      },
      doc: {
        code: 'REG-CON-002-04',
        lane: 'enc',
        heading: 'Acciones A1–A8',
        col_d: 'A',
        title: (H) => `Plan de actuación del encargo · ${H.ids.cfl}`,
        subtitle: 'PRC-2026-0412 · demanda notificada con posible conflicto de intereses · borrador para revisión',
        filename: (H) => `plan-actuacion-${H.ids.cfl}`,
        meta: (H) => [['Expediente de conflicto', H.ids.cfl], ['Barrera de información', H.ids.bar], ['Plazo en agenda', H.ids.plz]],
        items: (H) => PLAN(H),
        reviewer: ROLE.procesal,
        approver: ROLE.decider,
        note: 'Borrador generado a partir de las evidencias de la ejecución. La valoración del conflicto es preliminar: la decide el comité de conflictos con el Socio director. Las fechas objetivo son una propuesta del agente.'
      },
      report: {
        noun: 'informe de incidencia',
        code: 'INF-PLZ-2026-014',
        title: 'Informe de incidencia · notificación PO 1184/2026',
        subtitle: 'Notificación sin atender con posible conflicto de intereses',
        filename: 'informe-incidencia-prc-2026-0412',
        site_label: 'Sede',
        site: 'Sede de Málaga (Calle Linaje 3) · Procesal',
        description: (H) => `El 29/09/2026 a las 10:25 se emitió la alarma ALM-LEX-1025 sobre la notificación de LexNET del juicio ordinario 1184/2026 (JPI nº 7 de Málaga) contra ${CLIENT}. El traslado del procurador entró el 28/09 a las 17:52 y la notificación estuvo ${H.C.above} min por encima de ${H.fv(H.C.threshold)} de despacho sin revisar ni asignar (${H.span}), con ${H.critMin} min por encima de ${H.fv(H.crit)}. El reparto la asignó a una asociada de vacaciones y el control de conflictos detectó que el despacho asesoró en 2025 a la demandante, ${PLAINTIFF}. Se identificaron ${H.all.count} documentos afectados en ${H.all.items.length} carpetas (${H.fmt.num(hours(H.all))} h imputadas).`,
        criteria: 'PRO-PLZ-001 (revisar y asignar toda notificación de LexNET en menos de 4 h de despacho; aviso al socio por encima de 5 h; cómputo de días hábiles según los arts. 130–136 LEC, con agosto inhábil) y POL-CON-002 (control de conflictos antes de aceptar un encargo; barrera de información y decisión del Socio director cuando se actúa frente a un antiguo cliente), en aplicación del art. 12 del Código Deontológico de la Abogacía Española y del Estatuto General de la Abogacía (RD 135/2021).',
        actions: (H) => [
          `iManage · ${H.ids.bar}: barrera de información sobre ${H.sc.count} documentos en ${H.sc.items.length} carpetas; 7 profesionales excluidos.`,
          `Gestor de expedientes · ${H.ids.cfl}: encargo PRC-2026-0412 en suspenso hasta el comité de conflictos del 30/09 a las 10:00.`,
          `Gestor de expedientes: notificación reasignada al ${ROLE.procesal_staff}, con supervisión del ${ROLE.procesal}.`,
          `Gestor de expedientes y Outlook · ${H.ids.plz}: contestación hasta el 27/10/2026 (día de gracia hasta las 15:00 del 28/10), con alertas a 10, 5 y 2 días hábiles; hitos ${H.sc.holds.map((h) => `${h.id} (${H.holdWhen(h)})`).join(', ')}.`,
          `Outlook · ${H.ids.com}: comunicación al cliente; Microsoft Teams: aviso en «${TEAMS}».`
        ],
        pending: () => [
          'Comité de conflictos del 30/09: aceptar el encargo con barrera o declinarlo y facilitar el cambio de despacho sin perjuicio del plazo.',
          'Si se acepta: hoja de encargo firmada por Signaturit (POL-HON-004) y diligencia debida del cliente al día (MAN-PBC-003).',
          'Revisar con Sistemas las 32 copias fuera de iManage y archivarlas tras la barrera.',
          `Corregir el reparto automático para que consulte el calendario de ausencias y lance el control de conflictos al recibir la notificación: ${ROLE.it}.`
        ],
        reviewer: ROLE.compliance,
        final_step: 'Decisión sobre la aceptación del encargo',
        final_role: ROLE.decider,
        note: 'Documento interno sujeto a secreto profesional; no se comparte con el cliente ni con terceros.'
      },
      not_applied: (H) => [
        { sys: 'iManage', text: `Sin barrera: los ${H.all.count} documentos siguen accesibles para el equipo de 2025` },
        { sys: 'Gestor de expedientes', text: 'La notificación sigue asignada a una asociada ausente; sin expediente de conflicto ni plazo anotado' },
        { sys: 'Outlook', text: 'Sin comunicación al cliente ni citas en la agenda' },
        { sys: 'Microsoft Teams', text: 'Sin aviso interno' }
      ],
      compare: [
        { k: 'Personas que intervienen', today: '4–5: secretaría procesal, asociado, socio de Procesal, Cumplimiento y Socio director', now: 'El Socio director revisa y decide; Procesal y el cliente reciben el resultado con los datos' },
        { k: 'Sistemas que se consultan a mano', today: '5: LexNET, Gestor de expedientes, iManage, Outlook y calendario de ausencias', now: 'Ninguno: los agentes consultan 5 sistemas y cada dato queda en el registro' },
        { k: 'Pasos', today: '10–14 pasos manuales, con esperas entre secretaría y letrados', steps: true },
        { k: 'Tiempo hasta tener letrado, plazo y control de conflictos', today: '1–2 días (aquí, más de 5 h de despacho sin que nadie la abriera)', measured: true },
        { k: 'Evidencia para la auditoría', today: 'Repartida entre correos, el Gestor y notas sueltas del comité', now: 'Informe INF-PLZ-2026-014, plan de actuación y registro de auditoría de la ejecución' }
      ],
      presenter: {
        intro: () => 'Alarma de las 10:25: la demanda del juicio ordinario 1184/2026 contra Aceites Sierra Subbética entró por LexNET el lunes a las 17:52 y lleva más de 4 h de despacho sin que nadie la revise. La asignaron a una asociada de vacaciones y, además, el despacho asesoró en 2025 a la demandante. El plazo de contestación vence el 27 de octubre.',
        agents: 'Cinco agentes, cada uno con su sistema: LexNET y el Gestor para la notificación; Gestor, iManage y Outlook para conflictos, documentos y plazo; iManage y el Gestor para la barrera y la reasignación; Outlook y Teams para el cliente y el equipo.',
        waiting: (H) => [
          `Las ${H.sc.elseTotal} copias fuera de iManage quedan «a revisar»: no entran en la barrera. Todavía no se ha escrito nada en iManage ni en el Gestor, ni se ha dicho nada al cliente.`,
          'Se puede editar el alcance (quitar una carpeta, con motivo) o rechazar: si se rechaza, no se aplica nada y queda en auditoría.'
        ],
        rejected: ['Rechazado: no hay barrera, reasignación, plazo anotado ni comunicación al cliente. El motivo queda en el registro de auditoría.', 'Aceptar un encargo y hablar con el cliente es siempre decisión del Socio director; se puede volver a ejecutar cuando se quiera.'],
        done: (H) => [
          `Aplicado tras la aprobación: ${H.ids.bar} en iManage sobre ${H.sc.count} documentos, encargo en suspenso con ${H.ids.cfl}, notificación reasignada, plazo ${H.ids.plz} hasta el 27/10 y cliente informado.`,
          'El informe de incidencia sale como documento controlado, con el cómputo del plazo y el registro de la ejecución, listo para el comité de conflictos.'
        ],
        next: { done: 'Abrir «Descargar informe de incidencia» y después pasar a la reclamación (flecha derecha).', no_trigger: 'Ir a «De palabras a workflow», dejar 4 h y 30 min y volver a ejecutar.' }
      }
    }
  });

  /* Plan de actuación propuesto por el agente de Aceptación del encargo. */
  function PLAN(H) {
    const sc = H.sc;
    return [
      { d: 'A1', t: 'Barrera', text: `${H.ids.bar} activa en iManage sobre ${sc.count} documentos; el equipo de 2025 queda fuera de PRC-2026-0412.`, owner: ROLE.compliance, due: '2026-09-29' },
      { d: 'A2', t: 'Comité de conflictos', text: `Analizar el riesgo de uso de información confidencial de ${PLAINTIFF} (art. 12 del Código Deontológico) y decidir sobre la aceptación.`, owner: ROLE.decider, due: '2026-09-30' },
      { d: 'A3', t: 'Cliente', text: `Confirmar a ${CLIENT} la decisión antes de las 14:00 del 30/09; si se declina, entregar la documentación y el cómputo del plazo al nuevo despacho.`, owner: ROLE.procesal, due: '2026-09-30' },
      { d: 'A4', t: 'Hoja de encargo', text: 'Si se acepta, hoja de encargo con presupuesto de honorarios firmada por Signaturit (POL-HON-004).', owner: ROLE.client_care, due: '2026-10-01' },
      { d: 'A5', t: 'Diligencia debida', text: 'Comprobar que la diligencia debida y el titular real del cliente están al día (MAN-PBC-003, Ley 10/2010).', owner: ROLE.compliance, due: '2026-10-01' },
      { d: 'A6', t: 'Contestación', text: `Borrador de contestación el 19/10 y revisión del socio el 23/10; vence el 27/10 (${H.ids.plz}).`, owner: ROLE.procesal_staff, due: '2026-10-23' },
      { d: 'A7', t: 'Copias', text: `Revisar con Sistemas las ${sc.elseTotal} copias fuera de iManage y archivarlas tras la barrera.`, owner: ROLE.it, due: '2026-10-02' },
      { d: 'A8', t: 'Prevención', text: 'Reparto automático que consulte el calendario de ausencias y control de conflictos al recibir cada notificación de LexNET.', owner: ROLE.it, due: '2026-10-16' }
    ];
  }
})();
