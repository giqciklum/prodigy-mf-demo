/* Mora & Jordano · registros de trazabilidad por expediente (procesal, mercantil, factura, reclamación y brecha RGPD).
 * Los lee App.traceModal desde CN_DATA.trace[código]. Datos personales de interesados siempre seudonimizados.
 * Datos sintéticos de demostración (MFM). */
agenticPack('abogados', {
  trace: (function () {
    'use strict';

    const DOC_COLS = [
      { key: 'doc', label: 'Documento', mono: true, sub: 'what' },
      { key: 'matter', label: 'Expediente', sub: 'client' },
      { key: 'last', label: 'Último acceso', sub: 'who' },
      { key: 'status', label: 'Estado', chip: true }
    ];
    const doc = (d, what, matter, client, last, who, status) => ({ doc: d, what, matter, client, last, who, status });

    /* ---------------------------------------------------------------- Expediente procesal PRC-2026-0412 */

    const prc = {
      kind: 'Expediente procesal',
      title: 'Expediente PRC-2026-0412 · PO 1184/2026 · Aceites Sierra Subbética, S.L.',
      summary: [
        ['Cliente', 'Aceites Sierra Subbética, S.L. · cliente desde 2019 (Fiscal y Mercantil)'],
        ['Procedimiento', 'Juicio ordinario 1184/2026 · reclamación de cantidad'],
        ['Órgano', 'Juzgado de Primera Instancia nº 7 de Málaga'],
        ['Posición', 'Demandado'],
        ['Notificación', 'LexNET · 29-09-2026 08:12'],
        ['Plazo', 'Contestación en 20 días hábiles · vence el 27-10-2026'],
        ['Conflicto', 'Posible: el despacho asesoró en 2025 a la demandante (art. 12 del Código Deontológico)'],
        ['Estado', 'Aceptación del encargo bloqueada · pendiente del Socio director']
      ],
      back: [
        { when: '2025-03-14', stage: 'Asesoramiento a la demandante', detail: 'Almazara Hojiblanca del Genil, S.A., hoy demandante, fue cliente en 2025 (MER-2025-0219 y MER-2025-0241)', ref: 'Gestor de expedientes', tone: 'warn' },
        { when: '2026-07-21', stage: 'Requerimiento previo', detail: 'El cliente reenvía un burofax de la demandante reclamando una cantidad por suministro de aceite; se archiva sin abrir expediente', ref: 'Outlook' },
        { when: '2026-09-29 08:12', stage: 'Notificación de la demanda', detail: 'Decreto de admisión, demanda y documentos por LexNET; acceso registrado a las 08:12', ref: 'LexNET', tone: 'crit' },
        { when: '2026-09-29 08:13', stage: 'Alta del expediente', detail: 'Se abre PRC-2026-0412 y se asigna al letrado habitual del cliente', ref: 'PRC-2026-0412', tone: 'brand' },
        { when: '2026-09-29 08:14', stage: 'Conflicto detectado', detail: 'La búsqueda de partes contrarias encuentra a la demandante como cliente del despacho en 2025', ref: 'POL-CON-002', tone: 'crit' },
        { when: '2026-09-29 08:15', stage: 'Letrado ausente', detail: 'La letrada asignada figura de vacaciones hasta el 13-10-2026', ref: 'Outlook', tone: 'warn' },
        { when: '2026-09-29 09:00', stage: 'Alarma escalada', detail: 'Tarea TAR-26-3101: aceptación bloqueada hasta la decisión del Socio director', ref: 'TAR-26-3101', tone: 'crit' }
      ],
      forward: {
        title: 'Plazos y acciones del expediente',
        cols: [
          { key: 'step', label: 'Acción' },
          { key: 'owner', label: 'Responsable' },
          { key: 'due', label: 'Plazo' },
          { key: 'status', label: 'Estado', chip: true }
        ],
        rows: [
          { step: 'Resolver el posible conflicto de intereses', owner: 'Socio director', due: '30-09-2026', status: 'waiting' },
          { step: 'Reasignar a un letrado disponible de Procesal', owner: 'Socio responsable de Procesal', due: '30-09-2026', status: 'pending' },
          { step: 'Comunicar al cliente la demanda y el plazo', owner: 'Socio responsable de Procesal', due: '30-09-2026', status: 'waiting' },
          { step: 'Hoja de encargo y provisión de fondos (Signaturit)', owner: 'Atención al cliente y facturación', due: '02-10-2026', status: 'pending' },
          { step: 'Revisión de la diligencia debida PBC del cliente', owner: 'Responsable de Cumplimiento (PBC y RGPD)', due: '02-10-2026', status: 'pending' },
          { step: 'Contestación a la demanda por LexNET', owner: 'Letrado asignado', due: '27-10-2026', status: 'pending' }
        ],
        note: { title: 'Propuesta de Agentic Platform', body: 'Bloquear la aceptación hasta resolver el conflicto (POL-CON-002), reasignar el asunto, anotar el plazo en la agenda con avisos a 10, 5 y 2 días hábiles (PRO-PLZ-001) y preparar la comunicación al cliente. Aceptar el encargo y escribir al cliente requiere la aprobación del Socio director.', icon: 'scale' }
      },
      units: { label: 'Documentos (iManage)', cols: DOC_COLS, rows: [
        doc('IMN-2026-118402', 'Decreto de admisión a trámite', 'PRC-2026-0412', 'Aceites Sierra Subbética', '29/09 08:13', 'Gestor de expedientes', { status: 'done', label: 'Archivado' }),
        doc('IMN-2026-118403', 'Escrito de demanda (38 págs.)', 'PRC-2026-0412', 'Aceites Sierra Subbética', '29/09 08:13', 'Gestor de expedientes', { status: 'done', label: 'Archivado' }),
        doc('IMN-2026-118404', 'Documentos 1 a 14 de la demanda', 'PRC-2026-0412', 'Aceites Sierra Subbética', '29/09 08:13', 'Gestor de expedientes', { status: 'done', label: 'Archivado' }),
        doc('IMN-2026-118405', 'Justificante de acceso LexNET', 'PRC-2026-0412', 'Aceites Sierra Subbética', '29/09 08:13', 'LexNET', { status: 'done', label: 'Archivado' }),
        doc('IMN-2026-118411', 'Informe de conflicto de intereses', 'PRC-2026-0412', 'Aceites Sierra Subbética', '29/09 08:14', 'Agentic Platform', { status: 'review', label: 'Pendiente de decisión' }),
        doc('IMN-2026-118412', 'Cálculo del plazo de contestación', 'PRC-2026-0412', 'Aceites Sierra Subbética', '29/09 08:16', 'Agentic Platform', { status: 'review', label: 'Pendiente de validar' }),
        doc('IMN-2026-074120', 'Burofax de la demandante (21/07)', 'Sin expediente', 'Aceites Sierra Subbética', '29/09 08:20', 'Agentic Platform', { status: 'pending', label: 'Pendiente de vincular' })
      ] },
      quality: [
        'Cómputo en días hábiles desde el día siguiente a la notificación (arts. 133 y 151 LEC); sábados, domingos, festivos y agosto son inhábiles (art. 130.2 LEC).',
        'Festivo nacional del 12 de octubre excluido; sin festivos locales de Málaga en el periodo.',
        'El traslado del procurador entró en LexNET el 28-09-2026 a las 17:52 y el Gestor de expedientes lo registró a las 08:12; el plazo corre desde el 29-09-2026 (12-10 festivo) y vence el 27-10-2026, con día de gracia hasta las 15:00 del 28-10 (art. 135.5 LEC).',
        'La comprobación de conflictos cubre clientes, partes contrarias y sociedades vinculadas de los últimos 10 años (POL-CON-002).'
      ],
      notes: [
        { title: 'Posible conflicto de intereses', body: 'El despacho no puede defender al cliente frente a quien fue su cliente si existe riesgo de usar información confidencial obtenida en el asunto de 2025 (art. 12 del Código Deontológico). Decide el Socio director.', tone: 'crit', icon: 'alert-triangle' },
        { title: 'Letrado de vacaciones', body: 'La letrada asignada vuelve el 13-10-2026: sin reasignación se perderían 10 de los 20 días hábiles del plazo de contestación.', tone: 'warn', icon: 'clock' }
      ]
    };

    /* ---------------------------------------------------------------- Asunto mercantil MER-2026-0219 */

    const mer = {
      kind: 'Expediente mercantil',
      title: 'Expediente MER-2026-0219 · compra del 100 % de Hotel Bahía de Nerja, S.L.',
      summary: [
        ['Cliente', 'Grupo Hostelero Costa del Sol, S.L.'],
        ['Asunto', 'Adquisición del 100 % de las participaciones de Hotel Bahía de Nerja, S.L.'],
        ['Hoja de encargo', 'HE-2026-0219 · firmada en Signaturit el 12/03/2026'],
        ['Presupuesto', '12.500 € + IVA (due diligence legal, contrato de compraventa y cierre)'],
        ['Ampliación', 'Due diligence urbanística y de licencia turística pedida el 04/06 · sin adenda firmada'],
        ['Contrato de compraventa', 'Firmado el 24/07/2026'],
        ['Cierre', 'Pendiente de condición suspensiva: transmisión de la licencia turística'],
        ['Reclamación abierta', 'REC-2026-0057 (minuta F-2026-0938)']
      ],
      back: [
        { when: '2026-03-12', stage: 'Hoja de encargo', detail: 'HE-2026-0219 firmada por el cliente en Signaturit; presupuesto de 12.500 € + IVA', ref: 'HE-2026-0219', tone: 'brand' },
        { when: '2026-04-20', stage: 'Due diligence legal', detail: 'Informe de due diligence societaria, laboral y contractual entregado al cliente', ref: 'iManage' },
        { when: '2026-06-04', stage: 'Ampliación del alcance', detail: 'El cliente pide por correo revisar la situación urbanística y la licencia turística del hotel; se trabaja sin adenda a la hoja de encargo', ref: 'Outlook', tone: 'warn' },
        { when: '2026-07-24', stage: 'Firma del contrato', detail: 'Contrato de compraventa de participaciones firmado; cierre sujeto a la transmisión de la licencia turística', ref: 'Signaturit' },
        { when: '2026-09-15', stage: 'Minuta', detail: 'Factura F-2026-0938 por 18.400 € + IVA (105 h imputadas)', ref: 'F-2026-0938', tone: 'warn' },
        { when: '2026-09-28 10:41', stage: 'Reclamación del cliente', detail: 'El cliente discute la minuta frente al presupuesto y se queja de falta de información', ref: 'REC-2026-0057', tone: 'crit' }
      ],
      forward: {
        title: 'Facturación del asunto',
        cols: [
          { key: 'concept', label: 'Concepto' },
          { key: 'hours', label: 'Horas' },
          { key: 'amount', label: 'Importe' },
          { key: 'basis', label: 'Base contractual' },
          { key: 'status', label: 'Estado', chip: true }
        ],
        rows: [
          { concept: 'Due diligence legal', hours: '41 h', amount: '7.175 €', basis: 'HE-2026-0219', status: 'done' },
          { concept: 'Contrato de compraventa y negociación', hours: '38 h', amount: '6.650 €', basis: 'HE-2026-0219', status: 'done' },
          { concept: 'Due diligence urbanística y licencia turística', hours: '26 h', amount: '4.575 €', basis: 'Correo del 04/06 · sin adenda', status: { status: 'review', label: 'Discutido' } },
          { concept: 'Cierre y condición suspensiva', hours: '—', amount: '—', basis: 'HE-2026-0219', status: 'pending' }
        ],
        note: { title: 'Balance', body: '18.400 € facturados (105 h a 175 €/h) = 13.825 € del alcance pactado, que ya supera en 1.325 € el presupuesto de 12.500 €, + 4.575 € de la ampliación sin adenda.', icon: 'euro' }
      },
      quality: [
        'Política de honorarios (POL-HON-004): toda ampliación del alcance exige adenda firmada o confirmación escrita del presupuesto antes de facturarla.',
        'El Estatuto General de la Abogacía (RD 135/2021) obliga a informar al cliente del coste previsible y de su evolución.',
        'Sin informes de situación enviados al cliente entre el 24/07 y el 15/09.'
      ],
      notes: [
        { title: 'Ampliación sin adenda', body: 'La due diligence urbanística se encargó por correo el 04/06, pero no se firmó adenda ni se actualizó el presupuesto: es el punto débil de la minuta.', tone: 'warn', icon: 'file-text' }
      ]
    };

    /* ---------------------------------------------------------------- Factura F-2026-0938 */

    const fac = {
      kind: 'Factura',
      title: 'Factura F-2026-0938 · Grupo Hostelero Costa del Sol, S.L.',
      summary: [
        ['Fecha', '15/09/2026'],
        ['Base imponible', '18.400 €'],
        ['IVA (21 %)', '3.864 €'],
        ['Total', '22.264 €'],
        ['Vencimiento', '15/10/2026 · pendiente de cobro'],
        ['Horas imputadas', '105 h'],
        ['Expediente', 'MER-2026-0219'],
        ['Propuesta', 'Borrador de factura rectificativa R-2026-0041 por 1.740 € + IVA']
      ],
      back: [
        { when: '2026-03-12', stage: 'Presupuesto', detail: '12.500 € + IVA en la hoja de encargo HE-2026-0219', ref: 'HE-2026-0219' },
        { when: '2026-09-12', stage: 'Prefactura', detail: 'El Socio responsable de Mercantil valida la prefactura de 105 h sin descuento', ref: 'Gestor de expedientes' },
        { when: '2026-09-15', stage: 'Emisión', detail: 'Factura emitida y enviada por correo al cliente', ref: 'F-2026-0938', tone: 'brand' },
        { when: '2026-09-28 10:41', stage: 'Reclamación', detail: 'El cliente la considera superior a lo pactado', ref: 'REC-2026-0057', tone: 'crit' },
        { when: '2026-09-29', stage: 'Rectificativa en borrador', detail: 'Borrador R-2026-0041 por 1.740 € + IVA, pendiente de aprobación', ref: 'R-2026-0041', tone: 'warn' }
      ],
      forward: {
        title: 'Cobro y regularización',
        cols: [
          { key: 'step', label: 'Paso' },
          { key: 'owner', label: 'Responsable' },
          { key: 'due', label: 'Plazo' },
          { key: 'status', label: 'Estado', chip: true }
        ],
        rows: [
          { step: 'Suspender la reclamación de cobro mientras se resuelve la queja', owner: 'Atención al cliente y facturación', due: '29/09/2026', status: 'done' },
          { step: 'Aprobar o descartar la rectificativa R-2026-0041', owner: 'Socio responsable de Mercantil', due: '13/10/2026', status: 'waiting' },
          { step: 'Vencimiento de la factura', owner: 'Cliente', due: '15/10/2026', status: 'pending' }
        ],
        note: { title: 'Antecedente', body: 'La factura anterior al mismo cliente, F-2026-0871 (área Fiscal), se cobró sin incidencias.', icon: 'history' }
      },
      units: { label: 'Imputaciones de horas', cols: [
        { key: 'block', label: 'Bloque', sub: 'period' },
        { key: 'who', label: 'Perfil' },
        { key: 'hours', label: 'Horas' },
        { key: 'status', label: 'Estado', chip: true }
      ], rows: [
        { block: 'Due diligence legal', period: 'marzo-abril', who: 'Asociados de Mercantil', hours: '41 h', status: 'done' },
        { block: 'Negociación y contrato', period: 'mayo-julio', who: 'Socio y asociado sénior', hours: '38 h', status: 'done' },
        { block: 'Urbanismo y licencia turística', period: 'junio-julio', who: 'Asociado de Mercantil y Civil', hours: '26 h', status: { status: 'review', label: 'Fuera del presupuesto' } },
        { block: 'Semana 39 sin imputar', period: '21-27/09', who: 'Asociados de Mercantil', hours: '22 h', status: { status: 'pending', label: 'Sin imputar' } }
      ] },
      quality: [
        'Las 105 h facturadas coinciden con las imputadas en el Gestor de expedientes hasta el 12/09.',
        'Las 22 h de la semana 39 no están facturadas y deben imputarse antes de responder a la reclamación.'
      ],
      notes: [
        { title: 'Reclamaciones parecidas', body: 'REC-2026-0031 y REC-2025-0118 también nacieron de ampliaciones de alcance sin adenda.', tone: 'warn', icon: 'search' }
      ]
    };

    /* ---------------------------------------------------------------- Reclamación REC-2026-0057 */

    const rec = {
      kind: 'Expediente de reclamación',
      title: 'Expediente REC-2026-0057 · reclamación de honorarios',
      summary: [
        ['Cliente', 'Grupo Hostelero Costa del Sol, S.L. · cliente desde 2021'],
        ['Motivo', 'Minuta superior a la hoja de encargo y falta de información sobre el asunto'],
        ['Factura', 'F-2026-0938 · 18.400 € + IVA'],
        ['Asunto', 'MER-2026-0219 · compra de Hotel Bahía de Nerja, S.L.'],
        ['Recibida', '28/09/2026 10:41 · correo al Socio responsable de Mercantil'],
        ['Respuesta interna', 'Antes del 20/10/2026'],
        ['Marco', 'RD 135/2021 · Código Deontológico · POL-HON-004 · hoja de encargo'],
        ['Estado', 'Abierta · cobro suspendido']
      ],
      back: [
        { when: '2026-03-12', stage: 'Hoja de encargo', detail: 'Presupuesto de 12.500 € + IVA', ref: 'HE-2026-0219' },
        { when: '2026-06-04', stage: 'Ampliación sin adenda', detail: 'Due diligence urbanística y de licencia turística pedida por correo', ref: 'MER-2026-0219', tone: 'warn' },
        { when: '2026-09-15', stage: 'Minuta', detail: 'F-2026-0938 por 18.400 € + IVA', ref: 'F-2026-0938', tone: 'warn' },
        { when: '2026-09-28 10:41', stage: 'Reclamación', detail: 'El cliente discute el importe y pide un informe del estado del cierre', ref: 'REC-2026-0057', tone: 'crit' },
        { when: '2026-09-29 09:00', stage: 'Relación detectada', detail: '22 h del asunto sin imputar en la semana 39', ref: 'HRS-SIN', tone: 'warn' }
      ],
      forward: {
        title: 'Pasos del expediente',
        cols: [
          { key: 'step', label: 'Paso' },
          { key: 'owner', label: 'Responsable' },
          { key: 'due', label: 'Plazo' },
          { key: 'status', label: 'Estado', chip: true }
        ],
        rows: [
          { step: 'Acuse de recibo al cliente', owner: 'Atención al cliente y facturación', due: '29/09/2026', status: 'pending' },
          { step: 'Análisis de horas frente a la hoja de encargo', owner: 'Socio responsable de Mercantil', due: '06/10/2026', status: 'pending' },
          { step: 'Informe de situación del cierre al cliente', owner: 'Socio responsable de Mercantil', due: '06/10/2026', status: 'pending' },
          { step: 'Decisión sobre la rectificativa R-2026-0041', owner: 'Socio director', due: '13/10/2026', status: 'waiting' },
          { step: 'Respuesta definitiva', owner: 'Socio responsable de Mercantil', due: '20/10/2026', status: 'pending' }
        ],
        note: { title: 'Comunicación al cliente', body: 'Toda respuesta al cliente requiere la aprobación del Socio director.', icon: 'send' }
      },
      quality: [
        'Reclamaciones de honorarios en 2026: 3 (REC-2026-0031, REC-2026-0057 y una del área Civil); 2 por ampliaciones sin adenda.',
        'Si el cliente actuara como consumidor se aplicaría la Ley 44/2006; aquí es una sociedad mercantil.'
      ],
      notes: [
        { title: 'Antecedente', body: 'REC-2025-0118 se cerró con una rectificativa del 10 % tras una ampliación de alcance sin adenda.', tone: 'warn', icon: 'history' }
      ]
    };

    /* ---------------------------------------------------------------- Simulacro de brecha RGPD-2609-03 */

    const rgpd = {
      kind: 'Expediente de brecha de datos',
      title: 'Expediente RGPD-2609-03 · simulacro de envío a destinatario equivocado',
      summary: [
        ['Tipo', 'Simulacro · brecha de confidencialidad por correo electrónico'],
        ['Documentos', 'Due diligence de Promociones Guadalhorce, S.A.: informe PDF y 2 anexos XLSX (iManage)'],
        ['Envío', '28/09/2026 18:47 · Outlook · Asesoría Morales Benalmádena, por autocompletado'],
        ['Detección', '29/09/2026 08:05 · aviso del propio destinatario erróneo'],
        ['Cifrado', 'Informe PDF cifrado (AES-256); los 2 anexos XLSX sin cifrar'],
        ['Interesados', '255 personas físicas únicas · 173 con riesgo alto'],
        ['Plazo AEPD', '72 h desde la detección · hasta el 02/10/2026 08:05 (RGPD, art. 33)'],
        ['Responsable', 'Delegado de Protección de Datos · PRO-RGPD-005']
      ],
      back: [
        { when: '2026-09-22', stage: 'Informe archivado', detail: 'Informe de due diligence (v3) cifrado en iManage', ref: 'MJ-MER-0233-0148' },
        { when: '2026-09-28 18:47', stage: 'Envío erróneo', detail: 'Correo con 3 adjuntos y un enlace a la sala de datos a un destinatario externo de nombre parecido', ref: 'Outlook', tone: 'crit' },
        { when: '2026-09-28 18:50', stage: 'Intento de retirada', detail: 'Recuperación del mensaje fallida: el destinatario es de otro dominio', ref: 'Outlook', tone: 'warn' },
        { when: '2026-09-29 08:05', stage: 'Detección', detail: 'El destinatario erróneo avisa por correo de que lo ha recibido', ref: 'RGPD-2609-03', tone: 'crit' },
        { when: '2026-09-29 08:11', stage: 'Apertura del expediente', detail: 'Cumplimiento registra la brecha y arranca el plazo de 72 h', ref: 'PRO-RGPD-005', tone: 'brand' }
      ],
      forward: {
        title: 'Afectados y comunicaciones',
        cols: [
          { key: 'group', label: 'Afectado', sub: 'what' },
          { key: 'count', label: 'Personas' },
          { key: 'data', label: 'Datos expuestos' },
          { key: 'action', label: 'Acción' },
          { key: 'status', label: 'Estado', chip: true }
        ],
        rows: [
          { group: 'Promociones Guadalhorce, S.A.', what: 'Cliente', count: '—', data: 'Información confidencial y secreto profesional', action: 'Aviso al cliente', status: 'waiting' },
          { group: 'Empleados del cliente', what: 'Anexo laboral sin cifrar', count: '142', data: 'DNI, salario, IBAN; bajas por IT de 17', action: 'Comunicación (art. 34)', status: 'pending' },
          { group: 'Compradores reclamantes', what: 'Anexo de litigios sin cifrar', count: '31', data: 'Nombre, vivienda, procedimiento y cuantía', action: 'Comunicación (art. 34)', status: 'pending' },
          { group: 'Resto de interesados', what: 'Solo en el informe cifrado', count: '82', data: 'Protegidos por cifrado', action: 'Sin comunicación (art. 34.3.a)', status: 'ok' },
          { group: 'Destinatario equivocado', what: 'Tercero', count: '1', data: '—', action: 'Solicitud de borrado y certificado', status: 'pending' },
          { group: 'AEPD', what: 'Autoridad de control', count: '—', data: '—', action: 'Notificación en 72 h (art. 33)', status: 'pending' }
        ],
        note: { title: 'Propuesta de Agentic Platform', body: 'Notificar a la AEPD y comunicar a los 173 interesados con riesgo alto, cuyos datos iban en los anexos sin cifrar. Enviar las comunicaciones requiere la aprobación del Delegado de Protección de Datos y del Socio director.', icon: 'shield' }
      },
      units: { label: 'Documentos afectados (iManage)', cols: DOC_COLS, rows: [
        doc('MJ-MER-0233-0148', 'Informe de due diligence (v3, PDF cifrado)', 'MER-2026-0233', 'Promociones Guadalhorce', '22/09 17:30', 'Asociado de Mercantil', { status: 'review', label: 'Enviado · cifrado' }),
        doc('MJ-MER-0233-0152', 'Anexo laboral (v2, XLSX)', 'MER-2026-0233', 'Promociones Guadalhorce', '25/09 13:12', 'Asociado de Mercantil', { status: 'critical', label: 'Enviado sin cifrar' }),
        doc('MJ-MER-0233-0157', 'Anexo de litigios (v1, XLSX)', 'PRC-2025-0871', 'Promociones Guadalhorce', '28/09 12:40', 'Asociado de Mercantil', { status: 'critical', label: 'Enviado sin cifrar' }),
        doc('DR-GUAD', 'Enlace a la sala de datos', 'MER-2026-0233', 'Promociones Guadalhorce', '28/09 18:47', 'Outlook', { status: 'ok', label: 'Sin accesos' })
      ] },
      quality: [
        'Simulacro: ningún dato ha salido realmente del despacho.',
        'Notificación a la AEPD en 72 h salvo que sea improbable que la brecha suponga un riesgo (RGPD, art. 33); comunicación a los interesados si el riesgo es alto (art. 34).',
        'Los anexos XLSX no iban cifrados; la política exige contraseña en adjuntos con datos personales de terceros (PRO-RGPD-005).',
        'El secreto profesional (art. 542.3 LOPJ) obliga además a informar al cliente.'
      ],
      notes: [
        { title: 'Plazo de 72 horas', body: 'La notificación a la AEPD vence el 02/10/2026 a las 08:05.', tone: 'crit', icon: 'clock' },
        { title: 'Medida correctora propuesta', body: 'Desactivar el autocompletado de direcciones externas en Outlook y exigir cifrado en todos los adjuntos de iManage marcados como confidenciales.', tone: 'warn', icon: 'lock' }
      ]
    };

    return {
      'PRC-2026-0412': prc,
      'PO 1184/2026': prc,
      '1184/2026': prc,
      'MER-2026-0219': mer,
      'HE-2026-0219': mer,
      'F-2026-0938': fac,
      'R-2026-0041': fac,
      'REC-2026-0057': rec,
      'RGPD-2609-03': rgpd,
      'MJ-MER-0233-0148': rgpd,
      'MER-2026-0233': rgpd
    };
  })()
});
