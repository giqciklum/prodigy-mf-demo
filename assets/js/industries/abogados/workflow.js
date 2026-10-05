/* Mora & Jordano · De palabras a workflow. Datos sintéticos de demostración (MFM): personas, clientes y expedientes son ficticios.
 * Esquema documentado en la cabecera de assets/js/scenes/workflow.js. Regex sobre texto plegado (minúsculas, sin tildes). */
agenticPack('abogados', {
  workflow: {
    space: 'Despacho · Málaga',
    author: 'decider',
    authorNoun: 'la Dirección del despacho',
    alarmMatch: 'lexnet|notificaci[oó]n',
    approverRoles: ['decider', 'procesal', 'fiscal', 'mercantil', 'civil', 'compliance', 'client_care'],
    feminineRoles: ['fiscal', 'civil'],
    defaultPolicy: 'POL-CON-002',
    approverRule: {
      policy: 'POL-CON-002',
      text: 'solo el Socio director o el socio responsable de Procesal aceptan encargos con un posible conflicto de intereses',
      note: 'Reasignada: POL-CON-002 reserva la aceptación de encargos con posible conflicto a los socios'
    },
    triggerExamples: '«Cuando llegue una notificación de LexNET…» o «Cada día laborable a las 07:30…»',
    rolePatterns: [
      ['procesal', '\\bsocio responsable de procesal\\b|\\bsocio de procesal\\b'],
      ['procesal_staff', '\\basociad[oa] (?:senior )?de procesal\\b'],
      ['fiscal', '\\bsocia responsable de fiscal(?: y tributario)?\\b|\\bsocia de fiscal\\b'],
      ['mercantil', '\\bsocio responsable de mercantil\\b|\\bsocio de mercantil\\b'],
      ['civil', '\\bsocia responsable de civil\\b|\\bsocia de civil\\b'],
      ['compliance', '\\bresponsable de cumplimiento\\b'],
      ['dpo', '\\bdelegado de proteccion de datos\\b|\\bdpd\\b'],
      ['client_care', '\\batencion al cliente y facturacion\\b'],
      ['it', '\\bsistemas y seguridad\\b'],
      ['decider', '\\bsocio director\\b']
    ],
    outOfScope: [
      {
        id: 'presentacion',
        re: '\\b(?:present\\w*|radic\\w*|interpon\\w*)\\b[^.;]{0,40}\\b(?:escritos?|demandas?|contestacion\\w*|recursos?|declaracion\\w*|autoliquidacion\\w*|modelos? \\d{3})\\b[^.;]{0,40}\\b(?:lexnet|aeat|sede|juzgados?|tribunal\\w*)\\b',
        title: 'Presentación de escritos o declaraciones',
        body: 'El texto pide presentar por sí solo un escrito en LexNET o una declaración en la Sede de la AEAT. En el espacio Despacho · Málaga los agentes preparan borradores, pero ningún escrito ni modelo se presenta sin la revisión y la firma del letrado o del asesor responsable: Agentic Platform no crea pasos que presenten en nombre del despacho.'
      },
      {
        id: 'personas',
        re: '\\b(?:evalu\\w*|puntu\\w*|vigil\\w*|control\\w*|medir|mida|sancion\\w*|despid\\w*|rank\\w*)\\b[^.;]{0,40}\\b(?:trabajador\\w*|emplead\\w*|asociad[oa]s|abogad[oa]s|letrad[oa]s|plantilla|personal|personas|pasantes)\\b',
        title: 'Evaluación de personas',
        body: 'El texto pide evaluar, vigilar o puntuar a abogados o empleados. Los workflows de este espacio trabajan sobre notificaciones, plazos, expedientes y minutas; no valoran el desempeño de nadie.'
      },
      {
        id: 'contrario',
        re: '\\b(?:contact\\w*|escrib\\w*|llam\\w*|envi\\w*|negoci\\w*)\\b[^.;]{0,40}\\b(?:parte contraria|abogad[oa] contrari[oa]|letrad[oa] contrari[oa]|al juez|a la jueza|magistrad[oa]s?)\\b',
        title: 'Comunicación con la parte contraria o el juzgado',
        body: 'El texto pide que un agente se dirija a la parte contraria o al órgano judicial. El Código Deontológico de la Abogacía reserva esas comunicaciones al letrado (con una parte asistida por abogado, solo a través de su letrado), así que Agentic Platform no crea pasos que hablen en nombre del despacho.'
      }
    ],
    idle: [
      ['bell', 'brand', 'Disparador', 'Una notificación de LexNET, un correo en el buzón de atención al cliente o una hora fija.'],
      ['cpu', '', 'Pasos y sistemas', 'Qué agente hace cada paso y qué sistema consulta o actualiza: LexNET, Gestor de expedientes, iManage, Sede AEAT, Outlook o Teams.'],
      ['user-check', 'warn', 'Aprobación humana', 'Quién decide antes de aceptar un encargo, emitir una rectificativa o responder al cliente, según POL-CON-002 y POL-HON-004.'],
      ['file-text', '', 'Salidas', 'Cómputos de plazo, anotaciones en la agenda, avisos a letrados, expedientes y respuestas que deja el workflow.']
    ],
    idleNote: 'Cada elemento queda enlazado con la frase del texto de la que sale y se contrasta con el protocolo de plazos, la política de conflictos y la de honorarios antes de guardar el borrador.',
    presenter: {
      idle: [
        'Así escribe el despacho un procedimiento: en castellano, como en su manual interno. No hay que dibujar ni programar nada.',
        'Agentic Platform lo convierte en un workflow de la plataforma: disparador, agentes en orden, aprobación humana y salidas, cada uno enlazado a su frase.',
        'Honestidad: el generador desde texto se simula aquí y su integración en Agentic Platform se valida en el piloto; los workflows (Routines), el editor, la aprobación y la auditoría son de serie.'
      ],
      outOfScopeExample: 'Cuando venza un plazo, presenta automáticamente el escrito en LexNET sin que lo revise el letrado'
    },

    templates: {
      alarma: {
        label: 'Notificación LexNET',
        icon: 'scale',
        refs: 'PRO-PLZ-001 y POL-CON-002',
        text: 'Cuando llegue una notificación de LexNET, identificar el expediente en el Gestor de expedientes y el escrito notificado en iManage. Calcular el plazo en días hábiles según la LEC, excluyendo agosto y los festivos de Málaga. Comprobar conflictos de intereses con las partes del expediente; si hay un posible conflicto, la aceptación del encargo la aprueba el Socio director antes de seguir. Avisar por Teams al letrado responsable en menos de 30 minutos, y anotar el vencimiento en la agenda del despacho. La notificación debe quedar revisada y asignada en menos de 4 horas; si pasan más de 5 horas sin asignar, tratarla como crítica y avisar al Socio responsable de Procesal.'
      },
      reclamacion: {
        label: 'Queja por minuta',
        icon: 'mail',
        refs: 'POL-HON-004 y RD 135/2021',
        text: 'Cuando llegue al buzón de atención al cliente la queja de un cliente por una minuta de honorarios, registrarla en el Gestor de expedientes (cliente, asunto, factura, importe y hoja de encargo) y enviar el acuse de recibo en 48 horas. Analizar las horas imputadas al asunto frente a la hoja de encargo y las provisiones de fondos, partida por partida. Proponer, si procede, una factura rectificativa o un abono parcial de la minuta. Preparar el expediente de la reclamación según POL-HON-004, con las comunicaciones de avance enviadas al cliente en los últimos 6 meses, y la respuesta al cliente. La rectificativa y la respuesta las aprueba el Socio responsable de Mercantil antes de emitirlas; el expediente se resuelve en 15 días.'
      },
      parte: {
        label: 'Resumen del día',
        icon: 'clipboard',
        refs: 'PRO-PLZ-001 y CAL-TRI-006',
        text: 'Cada día laborable a las 07:30, revisar los plazos procesales y los vencimientos tributarios en LexNET, el Gestor de expedientes y la Sede de la AEAT (notificaciones pendientes, plazos que vencen en la semana, modelos 200, 202 y 303, horas sin imputar y diligencias de PBC incompletas) y compararlos con el protocolo de control de plazos. Para cada plazo en aviso o crítico, asignar una tarea en el Gestor de expedientes al letrado del asunto, sin duplicar las tareas que ya estén abiertas. Si un expediente tiene un conflicto de intereses pendiente desde hace más de 48 h, proponer bloquear o aceptar el encargo, que debe aprobar el Socio director. Publicar el resumen del día en el canal de Teams del despacho.'
      }
    },

    catalog: {
      lexnet_intake: {
        agent: 'Entrada de notificaciones', icon: 'mail', systems: ['LexNET', 'Gestor de expedientes', 'iManage'],
        what: 'Lee la notificación de LexNET, identifica el expediente, las partes y el escrito notificado',
        name: 'Notificación de LexNET', verb: 'registrar la notificación', token: 'lexnet',
        keywords: ['\\bnotificacion(?:es)? (?:de|en|por) lexnet\\b'],
        strong: ['\\bidentific\\w*']
      },
      deadline_calc: {
        agent: 'Cómputo de plazos', icon: 'calendar', systems: ['Gestor de expedientes'],
        what: 'Calcula el vencimiento en días hábiles (arts. 130 a 136 LEC), con agosto y los festivos locales inhábiles',
        name: 'Cómputo del plazo', verb: 'calcular el plazo', token: 'plazo',
        keywords: ['\\bcalcul\\w* (?:el |los )?(?:plazos?|vencimientos?)\\b', '\\bdias habiles\\b', '\\bcomputo\\b'],
        strong: ['\\bcalcul\\w*', '\\bcomput\\w*']
      },
      conflict_check: {
        agent: 'Conflictos y aceptación', icon: 'shield', systems: ['Gestor de expedientes', 'iManage'], hitl: true, restricted: true, gateVerb: 'aceptar el encargo',
        what: 'Cruza las partes con la base de conflictos, bloquea la aceptación y solo acepta el encargo tras la aprobación',
        name: 'Conflicto de intereses', verb: 'comprobar conflictos', token: 'conflictos',
        keywords: ['\\bconflictos? de intereses?\\b', '\\bconflict\\w*'],
        strong: ['\\bcomprob\\w* (?:los )?conflictos\\b', '\\bconflictos? de intereses?\\b']
      },
      lawyer_notice: {
        agent: 'Aviso al letrado', icon: 'message-square', systems: ['Microsoft Teams'],
        what: 'Avisa por Teams al letrado responsable con el expediente, el plazo y el escrito',
        name: 'Aviso al letrado', verb: 'avisar al letrado', token: 'aviso-letrado',
        keywords: ['\\bletrad[oa] responsable\\b', '\\bpor teams\\b'],
        strong: ['\\bletrad[oa] responsable\\b', '\\bavis\\w* por teams\\b']
      },
      agenda: {
        agent: 'Agenda del despacho', icon: 'calendar', systems: ['Outlook', 'Gestor de expedientes'],
        what: 'Anota el vencimiento en la agenda del despacho y del letrado, con recordatorios',
        name: 'Anotación en la agenda', verb: 'anotar en la agenda', token: 'agenda',
        keywords: ['\\bagenda\\b', '\\banot(?:a|ar|e|en|alo|ala)\\b'],
        strong: ['\\banot(?:a|ar|e|en|alo|ala)\\b', '\\bagenda\\b']
      },
      escalation: {
        agent: 'Expedientes y avisos', icon: 'clipboard', systems: ['Gestor de expedientes', 'Microsoft Teams'],
        what: 'Abre o completa el expediente, marca la urgencia y envía los avisos a los socios',
        name: 'Aviso al socio', verb: 'avisar al socio', token: 'aviso-socio',
        keywords: ['\\bavis\\w* (?:al|a la) soci[oa]\\b', '\\btrat\\w* como critic\\w*', '\\bexpediente de la reclamacion\\b', '\\bpublic\\w* el resumen\\b'],
        strong: ['\\bcomo critic\\w*', '\\bavis\\w* (?:al|a la) soci[oa]\\b', '\\bexpediente de la reclamacion\\b', '\\bpublic\\w* el resumen\\b']
      },
      complaint_intake: {
        agent: 'Entrada de quejas', icon: 'mail', systems: ['Outlook', 'Gestor de expedientes'],
        what: 'Registra la queja y extrae cliente, asunto, factura, importe y hoja de encargo',
        name: 'Queja de cliente', verb: 'registrar la queja', token: 'queja',
        keywords: ['\\bquej\\w*', '\\breclamacion(?:es)? de (?:un |una )?client\\w*'],
        strong: ['\\bregistr\\w*', '\\bdar de alta\\b']
      },
      time_review: {
        agent: 'Análisis de horas', icon: 'clock', systems: ['Gestor de expedientes'],
        what: 'Compara las horas imputadas con la hoja de encargo y las provisiones de fondos, partida por partida',
        name: 'Análisis de horas imputadas', verb: 'analizar las horas', token: 'horas',
        keywords: ['\\bhoras imputadas\\b', '\\bhoras (?:facturadas|registradas)\\b'],
        strong: ['\\banaliz\\w*', '\\bhoras imputadas\\b']
      },
      fee_adjust: {
        agent: 'Rectificación de minutas', icon: 'euro', systems: ['Gestor de expedientes'], hitl: true, gateVerb: 'emitir la rectificativa',
        what: 'Propone la factura rectificativa o el abono parcial y solo la emite tras la aprobación',
        name: 'Factura rectificativa', verb: 'rectificar la minuta', token: 'rectificativa',
        keywords: ['\\bfacturas? rectificativas?\\b', '\\babonos? parcial\\w*', '\\brectific\\w* la minuta\\b'],
        strong: ['\\bfacturas? rectificativas?\\b', '\\babonos? parcial\\w*']
      },
      notifier: {
        agent: 'Respuesta al cliente', icon: 'send', systems: ['Outlook', 'Gestor de expedientes'], hitl: true, gateVerb: 'enviar la respuesta',
        what: 'Redacta la respuesta al cliente y la envía tras aprobarla',
        name: 'Respuesta al cliente', verb: 'responder al cliente', token: 'respuesta',
        keywords: ['\\brespuesta al cliente\\b', '\\bresponder al cliente\\b', '\\bcontestar al cliente\\b'],
        strong: ['\\brespuesta al cliente\\b', '\\bresponder al cliente\\b', '\\bcontestar al cliente\\b']
      },
      deadline_monitor: {
        agent: 'Resumen del día del despacho', icon: 'activity', systems: ['LexNET', 'Gestor de expedientes', 'Sede AEAT'], multi: 2,
        what: 'Revisa plazos procesales y vencimientos tributarios frente al protocolo y asigna tareas sin duplicar',
        name: 'Resumen del día del despacho', verb: 'hacer el resumen del día', token: 'resumen-dia',
        keywords: ['\\bplazos procesales\\b', '\\bvencimientos tributarios\\b'],
        strong: ['\\brevis(?:ar|a|e)\\b', '\\basign\\w* una tarea\\b']
      }
    },

    domains: {
      alarma: {
        first: 'lexnet_intake',
        slug: 'wf-notificacion-lexnet',
        name: 'Notificación de LexNET: plazo, conflictos y avisos',
        approver: 'decider',
        approverOptions: ['decider', 'procesal'],
        policy: 'POL-CON-002',
        go: 'alarma',
        goLabel: 'Probarlo con la notificación del PO 1184/2026',
        next: 'La próxima notificación de LexNET lo ejecuta. La del PO 1184/2026 (Aceites Sierra Subbética, S.L.) sigue pendiente de asignar.',
        trigger: {
          system: 'LexNET', type: 'notificación', icon: 'mail', badges: ['LexNET'],
          label: 'Notificación de LexNET recibida', sub: 'revisión en {threshold}',
          entry: 'Buzón de LexNET del despacho, sincronizado con el Gestor de expedientes',
          full: 'Notificación de LexNET, revisada y asignada en menos de {threshold}'
        },
        steps: {
          lexnet_intake: { sub: 'Expediente y escrito', what: 'Lee la notificación de LexNET, identifica el expediente en el Gestor (partes, órgano, procedimiento) y el escrito notificado en iManage', outputs: [{ icon: 'file-text', text: 'Notificación vinculada al expediente y al escrito en iManage' }] },
          deadline_calc: { sub: 'Días hábiles · LEC', what: 'Calcula el vencimiento en días hábiles (arts. 130 a 136 LEC), excluye agosto y los festivos de Málaga y marca urgente lo que vence en menos de 5 días hábiles', outputs: [{ icon: 'calendar', text: 'Cómputo del plazo con la fecha de vencimiento' }] },
          conflict_check: { sub: 'Tras aprobar', what: 'Cruza las partes con la base de conflictos (art. 12 del Código Deontológico); bloquea la aceptación del encargo y solo la registra tras la aprobación', outputs: [{ icon: 'shield', text: 'Conflictos comprobados y encargo aceptado, tras aprobar' }] },
          lawyer_notice: { sub: 'En {minutes}', what: 'Avisa por Teams al letrado responsable en {minutes} con el expediente, el plazo y el escrito; si está ausente, propone un sustituto del área', outputs: [{ icon: 'message-square', text: 'Aviso por Teams al letrado responsable' }] },
          agenda: { sub: 'Vencimiento y recordatorios', what: 'Anota el vencimiento en la agenda del despacho y del letrado, con recordatorios a 5 y 2 días hábiles', outputs: [{ icon: 'calendar', text: 'Vencimiento anotado en la agenda con recordatorios' }] },
          escalation: { sub: 'Crítico > {critical}', systems: ['Gestor de expedientes', 'Microsoft Teams'], what: 'Si la notificación lleva más de {critical} sin asignar, la marca como crítica y avisa por Teams {al:notify}', outputs: [{ icon: 'bell', text: 'Aviso por Teams {al:notify} si pasa a crítica' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Ficha de la notificación en el expediente, con el cómputo del plazo y el registro de auditoría' }],
        params: [
          { key: 'threshold', label: 'Revisión y asignación', name: 'Plazo de revisión de la notificación', type: 'number', unit: 'h', unitLong: 'horas', min: 1, max: 24, step: 1, value: 4, integer: true, below: 'critical', ref: 'PRO-PLZ-001', hint: 'PRO-PLZ-001: 4 horas de despacho desde la entrada en el Gestor', hl: 'Revisión', extract: { from: 'text', re: '\\b(\\d{1,2})\\s*horas?\\b' } },
          { key: 'minutes', label: 'Aviso al letrado', name: 'Aviso al letrado responsable', type: 'number', unit: 'min', min: 5, max: 240, step: 5, value: 30, integer: true, ref: 'PRO-PLZ-001', hint: 'PRO-PLZ-001: 30 min, por Microsoft Teams', extract: { from: 'text', re: '(\\d{1,3})\\s*(?:minutos|min)\\b' } },
          { key: 'critical', label: 'Crítica: sin asignar más de', name: 'Notificación crítica', type: 'number', unit: 'h', unitLong: 'horas', min: 2, max: 48, step: 1, value: 5, integer: true, above: 'threshold', ref: 'PRO-PLZ-001', hint: 'PRO-PLZ-001: más de 5 h sin asignar · aviso al socio', hl: 'Crítico', extract: { from: 'sentence', near: '\\bcritic\\w*', re: '(\\d{1,2})\\s*horas?\\b' } },
          { key: 'approver', label: 'Aprueba la aceptación del encargo', ref: 'POL-CON-002', hint: 'POL-CON-002: con posible conflicto, solo aceptan el Socio director o el socio de Procesal' },
          { key: 'notify', label: 'Aviso a', name: 'Aviso', type: 'role', value: 'procesal', options: ['procesal', 'decider', 'procesal_staff'], ref: 'PRO-PLZ-001', hint: 'Por Microsoft Teams, para reasignar el plazo', extract: { kind: 'role', cap: 'escalation' } }
        ],
        check: { id: 'umbral', ref: 'PRO-PLZ-001', keys: ['threshold', 'minutes'], label: 'Revisión y aviso', describe: 'revisión en {threshold} y aviso al letrado en {minutes}', extra: 'crítica con más de {critical} sin asignar', action: 'Contrasta los tiempos con PRO-PLZ-001' },
        scenarios: [
          'llega una notificación de LexNET y hay que revisarla y asignarla en menos de {threshold}',
          'LexNET notifica una demanda contra un cliente (p. ej. el PO 1184/2026 contra Aceites Sierra Subbética, S.L.)',
          'el procurador traslada un escrito con plazo y hay que calcular el vencimiento',
          'hay que comprobar conflictos de intereses antes de aceptar un encargo que entra por LexNET'
        ],
        testUtterance: 'Ha entrado por LexNET una demanda de juicio ordinario contra Aceites Sierra Subbética con plazo de contestación de 20 días',
        matchGroups: [
          { re: '\\blexnet\\b|\\bnotificaci\\w*|\\bprocurador\\w*', w: 0.3, label: 'LexNET' },
          { re: '\\bdemanda\\w*|\\bescrito\\w*|\\bauto\\b|\\bsentencia\\w*|\\bjuicio\\b|\\brecurso\\w*', w: 0.3, label: 'escrito' },
          { re: '\\bplazos?\\b|\\bvence\\w*|\\bcontestacion\\b|\\bdias\\b', w: 0.25, label: 'plazo' },
          { re: '\\bsubbetica\\b|\\b1184\\b|\\bmora\\b', w: 0.07, label: 'Expediente' }
        ],
        config: {
          lexnet_intake: [['buzon', 'LexNET · Mora & Jordano'], ['revision_horas', '{=threshold}'], ['documentos', 'iManage · carpeta del expediente']],
          deadline_calc: [['computo', 'Días hábiles · arts. 130 a 136 LEC'], ['inhabiles', 'Agosto, sábados, domingos, 24 y 31 de diciembre y festivos de Málaga'], ['urgente_si_vence_en', '5 días hábiles']],
          conflict_check: [['aprobador', '{approver}'], ['politica', 'POL-CON-002'], ['bloqueo', 'Aceptación del encargo hasta resolver el conflicto']],
          lawyer_notice: [['aviso_minutos', '{=minutes}'], ['canal', 'Microsoft Teams'], ['ausencias', 'Sustituto del área']],
          agenda: [['calendario', 'Outlook · agenda del despacho'], ['recordatorios', '5 y 2 días hábiles antes']],
          escalation: [['critica_horas', '{=critical}'], ['aviso_a', '{notify}'], ['canal', 'Microsoft Teams']]
        },
        say: {
          draft: [
            'Cada frase está enlazada con lo que ha entendido: el disparador sale de «Cuando llegue una notificación de LexNET» y los tiempos, de «en menos de {threshold}».',
            'Cada paso dice qué sistema toca: LexNET y el Gestor para el expediente, iManage para el escrito, Teams y Outlook para los avisos y la agenda.',
            'El encargo no se acepta sin la aprobación {del:approver}: lo exige POL-CON-002 y el workflow lo respeta aunque el texto no lo dijera.'
          ],
          published: ['Desde ahora, cada notificación de LexNET lo dispara sola. Lo vemos con la de esta mañana: PO 1184/2026, Juzgado de Primera Instancia nº 7 de Málaga.']
        }
      },
      reclamacion: {
        first: 'complaint_intake',
        slug: 'wf-queja-minuta',
        name: 'Queja de cliente por una minuta de honorarios',
        approver: 'mercantil',
        approverOptions: ['mercantil', 'decider', 'client_care'],
        policy: 'POL-HON-004',
        go: 'reclamacion',
        goLabel: 'Probarlo con la queja de Grupo Hostelero Costa del Sol',
        next: 'La próxima queja por honorarios lo ejecuta. La de Grupo Hostelero Costa del Sol, S.L. (F-2026-0938, 18.400 €) está pendiente de respuesta.',
        trigger: {
          system: 'Outlook', type: 'correo', icon: 'mail', badges: ['Outlook'],
          label: 'Queja en el buzón de atención al cliente', sub: 'minuta de honorarios',
          entry: 'Buzón de atención al cliente en Outlook y Gestor de expedientes',
          full: 'Queja de un cliente por una minuta de honorarios'
        },
        steps: {
          complaint_intake: { sub: 'Acuse en {ack}', what: 'Registra la queja en el Gestor de expedientes, extrae cliente, asunto, factura, importe y hoja de encargo, y envía el acuse de recibo en {ack}', outputs: [{ icon: 'clipboard', text: 'Queja registrada en el Gestor con sus datos extraídos' }] },
          time_review: { sub: 'Horas frente a hoja de encargo', what: 'Compara las horas imputadas al asunto con la hoja de encargo y las provisiones de fondos, partida por partida, y señala las desviaciones', outputs: [{ icon: 'clock', text: 'Análisis de horas imputadas frente a la hoja de encargo' }] },
          fee_adjust: { sub: 'Tras aprobar', what: 'Propone, si procede, una factura rectificativa o un abono parcial de la minuta; solo se emite tras la aprobación', outputs: [{ icon: 'euro', text: 'Factura rectificativa o abono parcial, tras aprobar' }] },
          escalation: { sub: 'Resolución en {days}', systems: ['Gestor de expedientes', 'Procedimientos'], what: 'Prepara el expediente de la reclamación (POL-HON-004) con las comunicaciones de avance de los últimos {months}', outputs: [{ icon: 'file-text', text: 'Expediente de la reclamación (POL-HON-004), a resolver en {days}' }] },
          notifier: { sub: 'Tras aprobar', what: 'Redacta la respuesta al cliente con el detalle de horas y la hoja de encargo; se envía solo después de aprobarla', outputs: [{ icon: 'send', text: 'Respuesta al cliente, enviada tras la aprobación' }] }
        },
        params: [
          { key: 'ack', label: 'Acuse de recibo', name: 'Acuse de recibo', type: 'number', unit: 'h', min: 1, max: 72, step: 1, value: 48, integer: true, ref: 'POL-HON-004', hint: 'POL-HON-004: 48 h', extract: { from: 'text', re: '\\bacuse de recibo\\b[^.;]{0,40}?(\\d{1,3})\\s*(?:h|horas)\\b' } },
          { key: 'days', label: 'Resolución', name: 'Plazo de resolución', type: 'number', unit: 'días', unitLong: 'días', min: 1, max: 30, step: 1, value: 15, integer: true, ref: 'POL-HON-004', hint: 'POL-HON-004: respuesta en 15 días', hl: 'Plazo', extract: { from: 'text', re: '(\\d{1,2})\\s*dias\\b' } },
          { key: 'months', label: 'Comunicaciones de avance', name: 'Histórico de comunicaciones', type: 'number', unit: 'meses', min: 1, max: 36, step: 1, value: 6, integer: true, ref: 'Política', hint: 'Correos y actas del expediente en iManage', hl: 'Histórico', extract: { from: 'text', re: '(\\d{1,2})\\s*meses\\b' } },
          { key: 'approver', label: 'Aprueba rectificativa y respuesta', ref: 'POL-HON-004', hint: 'Antes de emitir una factura o enviar nada al cliente' }
        ],
        check: { id: 'plazos', ref: 'POL-HON-004', keys: ['ack', 'days'], label: 'Plazos', describe: 'acuse en {ack} y resolución en {days}', action: 'Contrasta los plazos con POL-HON-004' },
        scenarios: [
          'llega al buzón de atención al cliente la queja de un cliente por una minuta de honorarios',
          'un cliente considera que la factura supera lo pactado en la hoja de encargo',
          'un cliente se queja de que no le informan del avance de su asunto',
          'hay que decidir si se emite una factura rectificativa o un abono parcial'
        ],
        testUtterance: 'Un cliente se queja de que la minuta de honorarios supera lo pactado en la hoja de encargo',
        matchGroups: [
          { re: '\\bquej\\w*|\\breclam\\w*|\\bdisconform\\w*', w: 0.35, label: 'queja' },
          { re: '\\bclient[ea]s?\\b', w: 0.2, label: 'cliente' },
          { re: '\\bminutas?\\b|\\bhonorarios\\b|\\bfacturas?\\b|\\bimportes?\\b', w: 0.25, label: 'honorarios' },
          { re: '\\bhoja de encargo\\b|\\bhoras\\b|\\bpresupuesto\\b', w: 0.12, label: 'hoja de encargo' }
        ],
        config: {
          complaint_intake: [['acuse_horas', '{=ack}'], ['sistema', 'Gestor de expedientes']],
          time_review: [['fuente', 'Horas imputadas del Gestor'], ['referencia', 'Hoja de encargo firmada en Signaturit']],
          fee_adjust: [['documento', 'Factura rectificativa o abono parcial'], ['aprobador', '{approver}']],
          escalation: [['plantilla', 'Expediente POL-HON-004'], ['plazo_dias', '{=days}'], ['historico_meses', '{=months}']],
          notifier: [['canal', 'Correo electrónico'], ['aprobador', '{approver}']]
        },
        say: {
          draft: [
            'Cada frase está enlazada con lo que ha entendido: el correo al buzón de atención al cliente dispara el workflow y los plazos salen del propio texto.',
            'La rectificativa afecta a la facturación del cliente: no se emite sin la aprobación {del:approver}, igual que la respuesta.',
            'Los plazos se contrastan con POL-HON-004; si alguien los alarga, al publicar se pide el motivo.'
          ],
          published: ['La próxima queja por honorarios lo ejecuta sola. Lo vemos con la de Grupo Hostelero Costa del Sol.']
        }
      },
      parte: {
        first: 'deadline_monitor',
        slug: 'wf-resumen-dia-despacho',
        name: 'Resumen del día del despacho · plazos y vencimientos',
        approver: 'decider',
        approverOptions: ['decider', 'procesal'],
        policy: 'PRO-PLZ-001',
        go: 'turno',
        goLabel: 'Ver el resumen del día',
        next: 'Se ejecuta cada día laborable a las {time}.',
        trigger: {
          system: 'Programado', type: 'programado', icon: 'clock', badges: [],
          label: 'Cada día laborable a las {time}', sub: 'Programado',
          entry: 'Programación diaria del servidor · {time}'
        },
        steps: {
          deadline_monitor: { sub: 'Plazos y vencimientos', what: 'Revisa en LexNET, el Gestor y la Sede AEAT las notificaciones pendientes, los plazos de la semana, los modelos 200, 202 y 303, las horas sin imputar y las diligencias de PBC incompletas, y asigna tareas sin duplicar las abiertas', outputs: [{ icon: 'list-checks', text: 'Tareas en el Gestor de expedientes, sin duplicar las abiertas' }] },
          conflict_check: { sub: 'Conflictos de más de 48 h', gateVerb: 'bloquear o aceptar el encargo', what: 'Si un conflicto de intereses lleva más de 48 h pendiente, propone bloquear o aceptar el encargo (POL-CON-002)', outputs: [{ icon: 'shield', text: 'Conflictos pendientes resueltos, tras aprobar' }] },
          escalation: { sub: 'Resumen en Teams', systems: ['Microsoft Teams'], what: 'Publica el resumen del día en el canal «Despacho · Málaga»', outputs: [{ icon: 'message-square', text: 'Resumen en el canal de Teams «Despacho · Málaga»' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Resumen del día del despacho (PDF)' }],
        params: [
          { key: 'time', label: 'Hora del resumen', name: 'Hora del resumen', type: 'time', value: '07:30', ref: 'PRO-PLZ-001', hint: 'Antes de la primera vista del día', extract: { kind: 'time' } },
          { key: 'approver', label: 'Aprueba bloquear o aceptar encargos', ref: 'POL-CON-002', hint: 'POL-CON-002 · PRO-PLZ-001' }
        ],
        staticChecks: [
          { id: 'tributario', text: 'Calendario tributario (CAL-TRI-006): pago fraccionado 202 del 1 al 20 de octubre; modelo 200 hasta el 25 de octubre', stream: { action: 'Contrasta el resumen con PRO-PLZ-001 y CAL-TRI-006', result: 'Plazos procesales con agosto inhábil · modelos 202 (20-10) y 200 (25-10) incluidos' } }
        ],
        rules: [{ key: 'noDuplicate', re: '\\bsin duplicar\\b', label: 'Regla', check: 'Tareas sin duplicar las que ya están abiertas en el Gestor de expedientes' }],
        scenarios: [
          'son las {time} de un día laborable y toca el resumen del día del despacho',
          'el usuario pide el resumen de plazos procesales y vencimientos tributarios',
          'el usuario pregunta qué plazos vencen esta semana'
        ],
        testUtterance: 'Haz el resumen del día de los plazos y vencimientos del despacho',
        matchGroups: [
          { re: '\\bresumen\\b|\\bagenda\\b', w: 0.35, label: 'resumen' },
          { re: '\\bplazos?\\b|\\bvencimientos?\\b|\\bnotificaciones\\b|\\bmodelos?\\b', w: 0.3, label: 'plazos' },
          { re: '\\bdia\\b|\\bhoy\\b|\\bsemana\\b', w: 0.15, label: 'diario' },
          { re: '\\bdespacho\\b|\\bmora\\b', w: 0.1, label: 'Despacho' }
        ],
        config: {
          deadline_monitor: [['hora', '{time}'], ['revisa', 'Notificaciones LexNET, plazos de la semana, modelos 200, 202 y 303, horas sin imputar, diligencias de PBC (MAN-PBC-003)'], ['tareas', 'Gestor de expedientes, sin duplicar las abiertas']],
          conflict_check: [['aprobador', '{approver}'], ['politica', 'POL-CON-002'], ['revision', 'Conflictos pendientes de más de 48 h']],
          escalation: [['canal', 'Microsoft Teams · Despacho · Málaga']]
        },
        say: {
          draft: [
            'El resumen es programado: cada día laborable a las {time}, sin que nadie lo pida.',
            'Asigna tareas solo para lo que no tenga ya una abierta, y no bloquea ni acepta un encargo sin la aprobación {del:approver}.'
          ],
          published: ['Mañana a las {time} lo ejecuta solo; el de hoy está en el resumen del día.']
        }
      }
    }
  }
});
