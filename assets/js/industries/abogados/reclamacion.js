/* Mora & Jordano · reclamación REC-2026-0057 (queja de honorarios y de información sobre el asunto).
 * Clientes, personas y expedientes ficticios; datos sintéticos de demostración (MFM). */
agenticPack('abogados', {
  reclamacion: {
    code: 'REC-2026-0057',
    nav: 'Reclamación REC-2026-0057',
    title: 'Reclamación REC-2026-0057',
    agent: 'Quejas de clientes y honorarios',
    analyze_label: 'Analizar reclamación',
    nc: 'R-2026-0041',
    form: { code: 'REG-CLI-004-02', rev: '3' },
    received: { date: '2026-09-28', time: '10:41' },
    due: '2026-10-20',
    holidays: ['2026-10-12'],
    customer_line: 'Grupo Hostelero Costa del Sol, S.L. · minuta F-2026-0938 (Mercantil)',
    due_line: 'Vencimiento de la minuta el 15/10/2026 · respuesta interna antes del 20/10/2026',
    cust_name: 'Elena Navas Corredera',
    cust_addr: 'elena.navas@grupocostadelsol.example',
    own_name: 'Atención al cliente y facturación · Mora & Jordano',
    own_addr: 'atencion.clientes@morajordano.example',
    mail_domain: 'morajordano.example',
    mail_sub: 'elena.navas@grupocostadelsol.example · buzón atencion.clientes@morajordano.example · español',
    mail_title: 'Correo de la clienta',
    mail_tab_label: 'Correo de la clienta',
    attachments: ['F-2026-0938_minuta.pdf', 'HE-2026-0219_hoja_de_encargo_firmada.pdf'],
    email_text: [
      'From: Elena Navas Corredera <elena.navas@grupocostadelsol.example>',
      'To: Atención al cliente · Mora & Jordano <atencion.clientes@morajordano.example>',
      'Date: lun, 28 sep 2026 10:41',
      'Subject: Queja formal - Minuta F-2026-0938 y falta de información sobre la compra del Hotel Bahía de Nerja',
      '',
      'Buenos días:',
      '',
      'Les escribo como directora financiera de Grupo Hostelero Costa del Sol, S.L. para presentar una queja formal por la minuta F-2026-0938, de 15 de septiembre de 2026, correspondiente al asunto de la compra del 100 % de Hotel Bahía de Nerja, S.L.',
      '',
      'La minuta asciende a 18.400 € más IVA (22.264 € en total). En la hoja de encargo que firmamos el 12 de marzo de 2026 se estimaban unos honorarios de 12.500 € más IVA por la due diligence y la negociación del contrato de compraventa. Es decir, se nos factura casi un 50 % más de lo previsto y nadie nos avisó en ningún momento de que el presupuesto se iba a superar. La propia hoja de encargo dice que cualquier desviación superior al 10 % se nos comunicaría por escrito antes de facturar.',
      '',
      'Además, la minuta no viene desglosada: solo indica «Honorarios profesionales asunto MER-2026-0219» y unos suplidos de 60 €. No sabemos qué horas se han dedicado ni a qué.',
      '',
      'Tampoco estamos contentos con la información que recibimos. Desde la firma del contrato, el 24 de julio, no hemos tenido ningún informe sobre el cierre de la operación. Escribí el 28 de agosto y otra vez el 7 de septiembre para preguntar por la autorización del cambio de titularidad de la licencia turística, que es la condición pendiente para cerrar, y no he recibido respuesta. Nuestro consejero delegado me pregunta cada semana y no sé qué decirle.',
      '',
      'Les pido:',
      '- el desglose detallado de las horas facturadas, con fechas, profesionales y tareas;',
      '- que ajusten la minuta a lo pactado en la hoja de encargo o que nos justifiquen por escrito la diferencia; mientras tanto, no vamos a pagar la factura, que vence el 15 de octubre;',
      '- un informe del estado actual de la operación y de cuándo se prevé el cierre;',
      '- una reunión con el socio responsable del asunto.',
      '',
      'Llevamos trabajando con el despacho desde 2019 y siempre hemos estado satisfechos, por eso nos sorprende especialmente esta situación.',
      '',
      'Quedo a la espera de su respuesta en esta dirección o en el teléfono 600 000 573.',
      '',
      'Atentamente,',
      '',
      'Elena Navas Corredera',
      'Directora financiera',
      'Grupo Hostelero Costa del Sol, S.L.',
      'Marbella (Málaga)'
    ].join('\n'),
    mail_extra: {
      label: 'Correo del 04/06 (ampliación del encargo)',
      note: 'Correo localizado por Agentic Platform en la carpeta del expediente en iManage. Lo usa para comprobar quién pidió la ampliación del alcance y si se informó del coste.',
      headers: { From: 'Consejero delegado · Grupo Hostelero Costa del Sol <cd@grupocostadelsol.example>', Subject: 'RE: Due diligence Hotel Bahía de Nerja - urbanismo y licencia', Date: 'jue, 4 jun 2026 18:22' },
      text: [
        'De: Consejero delegado (Grupo Hostelero Costa del Sol)',
        'Para: Asociado sénior de Mercantil (Mora & Jordano) · CC: Socio responsable de Mercantil',
        '',
        'Hola:',
        'Después de la visita de hoy al hotel nos preocupa la situación urbanística de la ampliación de la terraza y del anexo de 2019. Os pido que incluyáis en la due diligence la revisión urbanística y la de la licencia turística (inscripción en el Registro de Turismo de Andalucía y categoría de cuatro estrellas). Lo necesitamos antes de firmar.',
        'Gracias.',
        '',
        '--- Respuesta (5 jun 2026 09:10) ---',
        'De: Asociado sénior de Mercantil',
        'Buenos días. Perfecto, lo incorporamos a la due diligence y os lo enviamos con el informe final a finales de junio. Un saludo.',
        '',
        'Carpeta iManage MER-2026-0219 / Correspondencia · sin adenda a la hoja de encargo ni estimación de coste en la carpeta Encargo.'
      ].join('\n'),
      highlights: [
        { text: 'Os pido que incluyáis en la due diligence la revisión urbanística y la de la licencia turística', label: 'Petición del cliente', tone: 'ok' },
        { text: 'lo incorporamos a la due diligence', label: 'Sin coste', tone: 'crit' },
        { text: 'sin adenda a la hoja de encargo ni estimación de coste', label: 'Sin adenda', tone: 'warn' }
      ]
    },
    highlights: [
      { text: 'minuta F-2026-0938', label: 'Factura', tone: 'brand' },
      { text: 'compra del 100 % de Hotel Bahía de Nerja, S.L.', label: 'Asunto', tone: 'brand' },
      { text: '18.400 € más IVA (22.264 € en total)', label: 'Importe', tone: 'crit' },
      { text: '12.500 € más IVA', label: 'Estimación', tone: 'brand' },
      { text: 'nadie nos avisó en ningún momento de que el presupuesto se iba a superar', label: 'Sin aviso', tone: 'crit' },
      { text: 'cualquier desviación superior al 10 % se nos comunicaría por escrito antes de facturar', label: 'Cláusula 6', tone: 'warn' },
      { text: 'la minuta no viene desglosada', label: 'Sin desglose', tone: 'crit' },
      { text: 'Escribí el 28 de agosto y otra vez el 7 de septiembre', label: 'Sin respuesta', tone: 'crit' },
      { text: 'autorización del cambio de titularidad de la licencia turística', label: 'Condición pendiente' },
      { text: 'el desglose detallado de las horas facturadas', label: 'Petición' },
      { text: 'no vamos a pagar la factura, que vence el 15 de octubre', label: 'Urgencia', tone: 'warn' },
      { text: 'una reunión con el socio responsable del asunto', label: 'Reunión' },
      { text: 'Llevamos trabajando con el despacho desde 2019', label: 'Cliente desde 2019', tone: 'ok' }
    ],
    run: {
      title: 'Workflow «Queja de cliente sobre honorarios»',
      sub: 'Se lanza al entrar una queja en el buzón de atención al cliente · PR-CLI-004 y POL-HON-004',
      graph_title: 'Workflow de queja de cliente',
      idle_footer: 'Lee el correo, extrae y valida los datos, cruza la minuta con la hoja de encargo y las horas imputadas, revisa las comunicaciones del expediente y prepara el expediente de queja, la rectificativa y la respuesta. Nada sale sin la aprobación del Socio director.',
      nodes: [
        { id: 'correo', kind: 'trigger', label: 'Correo de cliente', sub: 'Buzón de atención al cliente', systems: ['Outlook'], icon: 'mail' },
        { id: 'extraccion', label: 'Extracción y validación', systems: ['Modelo de lenguaje', 'Gestor de expedientes'], icon: 'search' },
        { id: 'traza', label: 'Encargo, horas y comunicaciones', systems: ['Signaturit', 'Gestor de expedientes', 'iManage', 'Microsoft Teams'], icon: 'git-branch' },
        { id: 'historico', label: 'Histórico, política y respuesta', systems: ['Gestor de expedientes', 'Procedimientos'], icon: 'clipboard' },
        { id: 'aprobacion', kind: 'approval', label: 'Aprobación del Socio director', sub: 'Dirección del despacho' },
        { id: 'salida', kind: 'output', label: 'Rectificativa, respuesta y reunión', systems: ['Outlook', 'Gestor de expedientes', 'Microsoft Teams'], icon: 'send' }
      ],
      edges: [['correo', 'extraccion'], ['extraccion', 'traza'], ['traza', 'historico'], ['historico', 'aprobacion'], { from: 'aprobacion', to: 'salida', label: 'aprobado' }],
      graph_at: { 0: { correo: 'done', extraccion: 'active' }, 2: { extraccion: 'done', traza: 'active' }, 8: { traza: 'done', historico: 'active' }, 13: { historico: 'done', aprobacion: 'waiting' } },
      stats: [
        { label: 'Minuta F-2026-0938 · base imponible frente a 12.500 € estimados', value: '18.400 €' },
        { label: 'Desviación sobre la hoja de encargo · sin aviso por escrito', value: '+47 %', tone: 'warn' },
        { label: 'Quejas parecidas · REC-2026-0031', value: 2, tone: 'warn' },
        { label: 'Días hábiles para la respuesta · vence el 20/10/2026', due: true }
      ]
    },
    steps: [
      { system: 'Outlook', action: 'Lee el correo de elena.navas@grupocostadelsol.example en el buzón atencion.clientes@morajordano.example (28/09/2026 10:41)', result: 'Queja formal por honorarios y por falta de información · 2 adjuntos (minuta F-2026-0938 y hoja de encargo firmada)', ms: 310 },
      { system: 'Modelo de lenguaje', action: 'Extrae los datos de la queja', result: 'Minuta F-2026-0938 · 18.400 € + IVA frente a 12.500 € estimados · sin desglose · sin aviso de desviación · 2 correos sin respuesta (28/08 y 07/09) · pide desglose, ajuste, informe de situación y reunión · retiene el pago (vence 15/10)', ms: 2800 },
      { system: 'Gestor de expedientes', action: 'Identifica a la clienta, el cliente y el expediente', result: 'Grupo Hostelero Costa del Sol, S.L., cliente desde 2019, 6 expedientes activos · la remitente es la interlocutora de facturación registrada · expediente MER-2026-0219 (Mercantil) · responsable: Socio responsable de Mercantil', ms: 420, tone: 'ok' },
      { system: 'Signaturit', action: 'Recupera la hoja de encargo firmada', result: 'HE-2026-0219 firmada el 12/03/2026 · alcance: due diligence legal (mercantil, laboral y fiscal) y negociación del SPA · estimación 12.500 € + IVA · 220 €/h socio y 150 €/h asociado · cláusula 6: desviación > 10 % se comunica por escrito antes de facturar · reuniones internas no facturables', ms: 360 },
      { system: 'Gestor de expedientes', action: 'Cruza los partes de horas de MER-2026-0219 con la hoja de encargo', result: '105 h imputadas (18.340 € + 60 € de suplidos) · dentro del alcance: 76 h, 13.360 € (+6,9 %, dentro del margen) · fuera del alcance: 26 h de due diligence urbanística y licencia turística (4.320 €) · 3 h de «coordinación interna» del socio facturadas (660 €)', ms: 610, tone: 'warn' },
      { system: 'iManage', action: 'Busca en la carpeta del expediente la petición de ampliación y la adenda', result: 'Correo del consejero delegado del 04/06/2026 pidiendo la revisión urbanística y de la licencia turística · respuesta del asociado del 05/06 sin estimación de coste · ninguna adenda en la carpeta Encargo', ms: 480, tone: 'warn' },
      { system: 'iManage', action: 'Comprueba los entregables y los informes de situación enviados', result: 'Informe de due diligence v3 (30/06) con anexo urbanístico · SPA firmado el 24/07 · último informe de situación enviado al cliente: 18/06/2026 · ninguno desde la firma', ms: 440, tone: 'warn' },
      { system: 'Microsoft Teams', action: 'Revisa el canal del expediente y las comunicaciones del cliente', result: 'Correos de la clienta del 28/08 y 07/09 reenviados al canal MER-2026-0219 sin asignar (asociado de vacaciones del 17/08 al 04/09) · sin respuesta en 21 y 15 días hábiles · solicitud de cambio de titularidad presentada en el Registro de Turismo de Andalucía el 09/09', ms: 390, tone: 'warn' },
      { system: 'Gestor de expedientes', action: 'Estado de la minuta y del historial de pagos del cliente', result: 'F-2026-0938 emitida el 15/09, vence el 15/10, pendiente de cobro · 14 facturas anteriores pagadas en plazo, incluida F-2026-0871 (Fiscal)', ms: 350, tone: 'ok' },
      { system: 'Gestor de expedientes', action: 'Busca quejas parecidas en los últimos 12 meses', result: '6 quejas cerradas · 2 parecidas: REC-2026-0031 y REC-2025-0118 (trabajo adicional pedido por el cliente sin adenda ni aviso de desviación)', ms: 520, tone: 'warn' },
      { system: 'Procedimientos', action: 'Consulta PR-CLI-004, POL-HON-004 y la normativa deontológica', result: 'Respuesta en 15 días hábiles (PR-CLI-004): antes del 20/10/2026 · deber de información al cliente (Estatuto General de la Abogacía, RD 135/2021, y Código Deontológico) · Ley 44/2006 no aplica: el cliente es una empresa', ms: 370 },
      { system: 'Modelo de lenguaje', action: 'Redacta el expediente de queja (F1–F8) y el análisis de honorarios con responsables por rol y fechas', result: 'Expediente completo · ajuste propuesto: 660 € de horas no facturables y 25 % de la ampliación no comunicada (1.080 €) · la causa organizativa queda como hipótesis', ms: 5100 },
      { system: 'Gestor de expedientes', action: 'Prepara la factura rectificativa y suspende el vencimiento en borrador', result: 'R-2026-0041 en borrador: abono de 1.740 € + IVA (2.105,40 €) sobre F-2026-0938 · nuevo importe 16.660 € + IVA · no emitida', ms: 300, tone: 'ok' },
      { system: 'Modelo de lenguaje', action: 'Redacta la respuesta a la clienta y el análisis para quien aprueba', result: 'Borrador listo: disculpa, referencia REC-2026-0057, desglose adjunto, rectificativa, estado de la operación y propuesta de reunión el 06/10 · pendiente de aprobación', ms: 3000, tone: 'warn' }
    ],
    lot: {
      code: 'MER-2026-0219',
      noun: 'expediente',
      label: 'Expediente (Gestor de expedientes)',
      fix_title: 'el expediente facturado',
      systems: 'el Gestor de expedientes e iManage',
      systems_short: 'Gestor e iManage',
      fix_text: 'Si la clienta ha citado mal el expediente, escribe el correcto. Agentic Platform lo busca en el Gestor de expedientes y comprueba que es de Grupo Hostelero Costa del Sol y que está facturado en la minuta F-2026-0938 antes de cambiar nada.',
      same_body: 'Existe en el Gestor de expedientes (Mercantil · compra de Hotel Bahía de Nerja, S.L.) y es el facturado en la minuta F-2026-0938. Sin cambios.',
      unknown_hint: 'Si el código es dudoso, compáralo con el concepto de la minuta que adjunta la clienta.',
      mismatch_body: 'El código existe en los sistemas, pero no está facturado en la minuta F-2026-0938: no se cambia la ficha.',
      known: {
        'PRC-2026-0412': { kind: 'mismatch', title: 'PRC-2026-0412 es un expediente de Procesal de otro cliente', body: 'Existe en el Gestor de expedientes: demanda contra Aceites Sierra Subbética, S.L. (PO 1184/2026). No tiene relación con Grupo Hostelero Costa del Sol ni con la minuta reclamada. No se cambia la ficha.' },
        'F-2026-0871': { kind: 'mismatch', title: 'F-2026-0871 es otra factura del mismo cliente, ya pagada', body: 'Minuta del área de Fiscal y Tributario (planificación del Impuesto sobre Sociedades), pagada en plazo. La queja se refiere a F-2026-0938 del expediente MER-2026-0219. No se cambia la ficha.' }
      }
    },
    sheet: {
      sub: 'Datos extraídos del correo y comprobados en el Gestor de expedientes, Signaturit e iManage',
      empty_text: 'Agentic Platform extraerá del correo la minuta, el expediente, los importes, las fechas y las peticiones, y los comprobará con la hoja de encargo, los partes de horas y las comunicaciones del expediente antes de preparar el expediente de queja, la rectificativa y la respuesta.',
      rows: [
        { k: 'Referencia', v: 'REC-2026-0057', code: true, sub: 'Expediente de queja · registro de atención al cliente' },
        { k: 'Cliente', v: 'Grupo Hostelero Costa del Sol, S.L.', ok: 'Identificado en el Gestor de expedientes · cliente desde 2019 · 6 expedientes activos' },
        { k: 'Minuta', v: '18.400 € + IVA (22.264 €) ·', trace: 'F-2026-0938', ok: 'Emitida el 15/09/2026 · vence el 15/10 · pendiente de cobro · sin desglose de horas' },
        { k: 'Expediente', lot: true, ok: 'Mercantil · compra del 100 % de Hotel Bahía de Nerja, S.L. · Socio responsable de Mercantil' },
        { k: 'Hoja de encargo', v: 'HE-2026-0219 · 12.500 € + IVA estimados', ok: 'Firmada en Signaturit el 12/03/2026 · cláusula 6: aviso por escrito si la desviación supera el 10 %' },
        { k: 'Horas imputadas', v: '105 h · 18.340 € + 60 € de suplidos', sub: 'Dentro del alcance 76 h (13.360 €) · ampliación 26 h (4.320 €) · coordinación interna 3 h (660 €)' },
        { k: 'Ampliación', v: 'Due diligence urbanística y de licencia turística', sub: 'Pedida por el consejero delegado el 04/06 · aceptada sin estimación de coste ni adenda' },
        { k: 'Evidencias', v: 'Hoja de encargo firmada · correo del 04/06 · partes de horas · canal de Teams del expediente' },
        { k: 'Comunicación', v: 'Último informe de situación: 18/06/2026 ·', trace: 'MER-2026-0219', sub: 'Correos del 28/08 y del 07/09 sin respuesta · hipótesis: quedaron sin asignar durante las vacaciones del asociado' },
        { k: 'Estado del asunto', v: 'SPA firmado el 24/07 · cierre pendiente del cambio de titularidad de la licencia', sub: 'Solicitud presentada en el Registro de Turismo de Andalucía el 09/09' },
        { k: 'Plazos', v: 'Vencimiento de la minuta 15/10 · respuesta antes del 20/10/2026', due: true, sub: 'PR-CLI-004: 15 días hábiles (12/10 festivo nacional)' },
        { k: 'Registro', v: 'R-2026-0041', code: true, sub: 'Factura rectificativa en el Gestor de expedientes (borrador, no emitida)' }
      ]
    },
    requests: {
      title: 'Lo que pide la clienta',
      items: [
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Desglose detallado de las horas facturadas', meta: ['F3 · Anexo B · 105 h por fecha, profesional y tarea'], quote: 'el desglose detallado de las horas facturadas, con fechas, profesionales y tareas', side: { pending: { status: 'waiting', label: 'Pendiente de aprobación' }, approved: { status: 'sent', label: 'Enviado' }, rejected: { status: 'rejected', label: 'No enviado' } } },
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Ajustar la minuta o justificar la diferencia', meta: ['F3 · rectificativa R-2026-0041 · 1.740 € + IVA', 'Vencimiento suspendido mientras tanto'], quote: 'que ajusten la minuta a lo pactado en la hoja de encargo o que nos justifiquen por escrito la diferencia', side: { pending: { status: 'pending', label: 'Propuesto' }, approved: { status: 'ok', label: 'Rectificativa emitida' }, rejected: { status: 'rejected', label: 'Sin ajuste' } } },
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Informe del estado de la operación y del cierre', meta: ['Respuesta a la clienta · REC-2026-0057'], quote: 'un informe del estado actual de la operación y de cuándo se prevé el cierre', side: { pending: { status: 'waiting', label: 'Pendiente de aprobación' }, approved: { status: 'sent', label: 'Enviado' }, rejected: { status: 'rejected', label: 'No enviado' } } },
        { icon: 'clock', tone: 'warn', title: 'Reunión con el socio responsable', meta: ['F6 · Socio responsable de Mercantil'], quote: 'una reunión con el socio responsable del asunto', side: { status: 'review', label: 'Propuesta 06/10' } },
        { icon: 'calendar', tone: 'warn', title: 'Respuesta formal dentro de plazo', meta: ['F6 · resolución del expediente de queja'], quote: 'Quedo a la espera de su respuesta', side: { status: 'pending', label: 'Antes del 20/10' } }
      ]
    },
    trace: {
      title: 'Traza del encargo MER-2026-0219 y de la minuta F-2026-0938',
      sub: 'Signaturit · Gestor de expedientes · iManage · Microsoft Teams · de la hoja de encargo a la minuta',
      button_code: 'REC-2026-0057',
      button_label: 'Expediente completo · REC-2026-0057',
      back_title: 'Hacia atrás · del encargo a la queja',
      back: [
        { time: '12/03', title: 'Hoja de encargo firmada', text: 'HE-2026-0219 en Signaturit · due diligence legal y negociación del SPA · 12.500 € + IVA estimados · cláusula 6 de aviso de desviación', tone: 'brand', ref: 'HE-2026-0219' },
        { time: '04/06', timeSub: '18:22', title: 'Ampliación pedida por el cliente', text: 'El consejero delegado pide la revisión urbanística y de la licencia turística · el asociado la acepta el 05/06 sin estimación de coste', tone: 'warn', ref: 'MER-2026-0219', chip: { status: 'open', label: 'Sin adenda' } },
        { time: '24/07', title: 'Firma del SPA', text: 'Contrato de compraventa firmado · cierre sujeto al cambio de titularidad de la licencia turística · último informe de situación: 18/06', tone: 'brand', ref: 'iManage' },
        { time: '28/08', timeSub: '12:05', title: 'Consulta de la clienta sin respuesta', route: ['Outlook', 'Teams', 'Sin asignar'], route_mark: 'Sin asignar', text: 'Reenviada al canal del expediente durante las vacaciones del asociado · se repite el 07/09, también sin respuesta', tone: 'crit' },
        { time: '15/09', title: 'Minuta emitida', text: '18.400 € + IVA · sin desglose · sin aviso previo de la desviación del 47 %', tone: 'crit', ref: 'F-2026-0938' },
        { time: '28/09', timeSub: '10:41', title: 'Queja formal', text: 'Correo de la directora financiera con la minuta y la hoja de encargo · retiene el pago', tone: 'brand', ref: 'REC-2026-0057' }
      ],
      fwd_title: 'Hacia delante · partidas de la minuta',
      fwd_cols: { id: 'Partida', qty: 'Importe (€)', when: 'Horas', status: 'Estado' },
      fwd: [
        { id: 'Partida 1', dest: 'Due diligence legal', sub: '12 h socio · 36 h asociado', qty: '8.040', when: '48 h', status: { status: 'ok', label: 'Conforme a la hoja' } },
        { id: 'Partida 2', dest: 'Negociación del SPA y firma', sub: '10 h socio · 12 h asociado', qty: '4.000', when: '22 h', status: { status: 'ok', label: 'Conforme a la hoja' } },
        { id: 'Partida 3', dest: 'Rondas adicionales del SPA', sub: '6 h socio', qty: '1.320', when: '6 h', status: { status: 'ok', label: 'Dentro del margen del 10 %' } },
        { id: 'Partida 4', dest: 'Due diligence urbanística y licencia', sub: 'ampliación del 04/06 · sin adenda', qty: '4.320', when: '26 h', status: { pending: { status: 'pending', label: 'Descuento del 25 % propuesto' }, approved: { status: 'ok', label: 'Facturada con 25 % de descuento' }, rejected: { status: 'warn', label: 'Facturada sin ajuste' } } },
        { id: 'Partida 5', dest: 'Coordinación interna', sub: 'no facturable según la hoja', qty: '660', when: '3 h', status: { pending: { status: 'pending', label: 'Abono propuesto' }, approved: { status: 'ok', label: 'Abonada' }, rejected: { status: 'warn', label: 'En la minuta' } } },
        { id: 'R-2026-0041', dest: 'Factura rectificativa', sub: 'sobre F-2026-0938', qty: '−1.740', when: '—', status: { pending: { status: 'draft', label: 'Borrador' }, approved: { status: 'sent', label: 'Emitida' }, rejected: { status: 'draft', label: 'Borrador' } } }
      ],
      fwd_note: '105 h · 18.340 € de honorarios más 60 € de suplidos (notas del Registro Mercantil y de la Propiedad) · la rectificativa deja la minuta en 16.660 € + IVA (20.158,60 €).',
      hypothesis: {
        title: 'Hipótesis de causa · a confirmar por el Socio responsable de Mercantil',
        icon: 'scale',
        paras: [
          'La desviación no viene de horas mal imputadas, sino de una ampliación del alcance que pidió el propio cliente el 04/06 y que se aceptó por correo sin estimar su coste ni firmar una adenda, en contra de la cláusula 6 de la hoja de encargo y de POL-HON-004.',
          'A favor: el trabajo dentro del alcance (76 h, 13.360 €) queda dentro del margen del 10 % y la ampliación está documentada en el informe de due diligence v3. Por aclarar: si hubo algún aviso verbal del coste en la reunión del 10/06, que no consta en el Gestor ni en iManage.',
          'La falta de información tiene una causa organizativa probable: las consultas de la clienta llegaron al canal del expediente mientras el asociado estaba de vacaciones y nadie las tenía asignadas. Para responder a la queja no hace falta confirmarlo: la desviación no se comunicó por escrito y la clienta no recibió informes desde junio.'
        ]
      }
    },
    history: {
      sub: 'Gestor de expedientes · quejas de clientes cerradas · últimos 12 meses',
      col_id: 'Queja',
      col_product: 'Área y expediente',
      col_cause: 'Resolución',
      rows: [
        { id: 'REC-2026-0031', date: '2026-05-14', product: 'Mercantil · ampliación de capital', lot: 'MER-2025-0388', description: 'Minuta un 35 % superior a la estimación', category: 'Ampliación sin adenda', customer_label: 'empresa', root_cause: 'Trabajo adicional pedido por correo sin adenda ni aviso de desviación · abono del 20 % de la ampliación', nc: 'R-2026-0017', status: 'cerrada', similar: true },
        { id: 'REC-2025-0118', date: '2025-11-06', product: 'Fiscal · inspección del Impuesto sobre Sociedades', lot: 'FIS-2025-0204', description: 'Honorarios de la fase de alegaciones no previstos', category: 'Ampliación sin adenda', customer_label: 'empresa', root_cause: 'Fase no incluida en la hoja; aviso verbal no documentado · adenda firmada a posteriori y descuento del 15 %', nc: 'R-2025-0062', status: 'cerrada', similar: true },
        { id: 'REC-2026-0044', date: '2026-07-21', product: 'Procesal · reclamación de cantidad', lot: 'PRC-2025-0977', description: 'Falta de información sobre un señalamiento', category: 'Comunicación', customer_label: 'empresa', root_cause: 'Notificación LexNET trasladada al cliente con 4 días de retraso · aviso automático activado', nc: 'REC-2026-0044', status: 'cerrada', similar: false },
        { id: 'REC-2026-0049', date: '2026-08-27', product: 'Mercantil · pacto de socios', lot: 'MER-2026-0102', description: 'Error en el NIF de la factura', category: 'Error de facturación', customer_label: 'empresa', root_cause: 'Dato fiscal desactualizado en el Gestor · rectificativa en 1 día', nc: 'R-2026-0033', status: 'cerrada', similar: false },
        { id: 'REC-2026-0012', date: '2026-02-10', product: 'Civil · herencia', lot: 'CIV-2025-0611', description: 'Provisión de fondos sin liquidar', category: 'Provisión de fondos', customer_label: 'particular', root_cause: 'Provisión aplicada sin liquidación detallada · liquidación enviada y saldo devuelto', nc: 'R-2026-0005', status: 'cerrada', similar: false },
        { id: 'REC-2025-0097', date: '2025-10-02', product: 'Fiscal · modelo 720', lot: 'FIS-2025-0150', description: 'Retraso en la entrega del borrador', category: 'Plazos', customer_label: 'particular', root_cause: 'Documentación del cliente incompleta · calendario compartido de entregas', nc: 'REC-2025-0097', status: 'cerrada', similar: false }
      ],
      note: {
        title: 'Mismo patrón que REC-2026-0031 y REC-2025-0118',
        body: 'Trabajo adicional pedido por el cliente y aceptado sin adenda ni aviso por escrito de la desviación. En los dos casos se reconoció el trabajo, se aplicó un descuento sobre la parte no comunicada (20 % y 15 %) y el cliente siguió con el despacho. REC-2026-0044 es distinto: allí el problema fue el traslado tardío de una notificación de LexNET. El expediente propone en F7 un aviso automático de desviación en el Gestor de expedientes.'
      }
    },
    plan: {
      title: 'Expediente REC-2026-0057 · análisis de honorarios y propuesta de ajuste',
      sub: 'PR-CLI-004 · ajuste y desglose esta semana; respuesta formal antes del 20/10/2026',
      col_label: 'Fase',
      containment_status: { pending: { text: 'Pendiente de aprobación', tone: 'warn' }, approved: { text: 'Aplicada', tone: 'ok' }, rejected: { text: 'No aplicada', tone: 'neutral' } },
      rows: [
        { d: 'F1', title: 'Admisión y equipo', owner: ['Atención al cliente y facturación'], date: '2026-09-29', status: { text: 'Completo', tone: 'ok' }, lead: 'Queja admitida: presentada por escrito por la interlocutora de facturación del cliente, identificada en el Gestor de expedientes, sobre una minuta pendiente de cobro.', items: ['Atención al cliente y facturación: tramitación, desglose y rectificativa', 'Socio responsable de Mercantil: revisión de las horas y del estado de la operación', 'Socio director: decisión sobre el ajuste y aprobación de la respuesta', 'Responsable de Cumplimiento: revisión del criterio deontológico y de la hoja de encargo'], note: 'Interlocutora: Elena Navas Corredera, directora financiera (elena.navas@grupocostadelsol.example · 600 000 573).' },
        { d: 'F2', title: 'Hechos', owner: ['Atención al cliente y facturación'], date: '2026-09-29', status: { text: 'Completo', tone: 'ok' }, lead: 'Minuta F-2026-0938 de 18.400 € + IVA por el expediente MER-2026-0219, frente a una estimación de 12.500 € + IVA en la hoja de encargo HE-2026-0219. La desviación (+47 %) no se comunicó por escrito y la minuta no incluye desglose.', items: ['105 h imputadas: 76 h dentro del alcance (13.360 €, +6,9 %), 26 h de ampliación (4.320 €) y 3 h de coordinación interna (660 €)', 'Ampliación pedida por el consejero delegado el 04/06 y aceptada el 05/06 sin estimación de coste ni adenda', 'Último informe de situación el 18/06; correos de la clienta del 28/08 y del 07/09 sin respuesta', 'SPA firmado el 24/07; cierre pendiente del cambio de titularidad de la licencia turística (solicitado el 09/09)'] },
        { d: 'F3', title: 'Medidas inmediatas', owner: ['Atención al cliente y facturación', 'Socio responsable de Mercantil'], date: '2026-09-30', containment: true, items: ['Enviar el desglose completo de las 105 h por fecha, profesional y tarea (Anexo B)', 'Emitir la rectificativa R-2026-0041: abono de 660 € de coordinación interna (no facturable) y de un 25 % de la ampliación no comunicada (1.080 €); total 1.740 € + IVA', 'Suspender el vencimiento de F-2026-0938 y fijar el nuevo a 30 días desde la rectificativa', 'Enviar a la clienta un informe del estado de la operación y asignar un interlocutor suplente en el expediente'] },
        { d: 'F4', title: 'Análisis de honorarios', owner: ['Socio responsable de Mercantil', 'Responsable de Cumplimiento (PBC y RGPD)'], date: '2026-10-01', status: { text: 'Propuesto', tone: 'warn' }, lead: 'El trabajo dentro del alcance está dentro del margen del 10 % de la hoja de encargo. La ampliación es trabajo real pedido por el cliente por escrito, pero se incumplió la cláusula 6 al no estimar ni comunicar su coste. Las horas de coordinación interna no son facturables.', items: ['Se mantiene la facturación del alcance pactado (13.360 €) y de los suplidos (60 €)', 'Se reconoce la ampliación (4.320 €) con un descuento del 25 % por no haber avisado, en línea con REC-2026-0031 y REC-2025-0118', 'Hipótesis de causa, a confirmar: ampliación aceptada por correo sin pasar por el Socio responsable y consultas sin asignar durante las vacaciones'] },
        { d: 'F5', title: 'Cobro', owner: ['Atención al cliente y facturación'], date: '2026-10-30', status: { text: 'Planificado', tone: 'info' }, items: ['Seguimiento del cobro de 16.660 € + IVA tras la rectificativa', 'Si la clienta no acepta el ajuste, escalar al Socio director antes de cualquier reclamación del importe'] },
        { d: 'F6', title: 'Reunión y respuesta formal', owner: ['Socio responsable de Mercantil', 'Socio director'], date: '2026-10-06', status: { text: 'Planificado', tone: 'info' }, items: ['Reunión con la clienta el 06/10 a las 10:00 (Málaga o Microsoft Teams)', 'Respuesta formal motivada antes del 20/10, con información sobre el Servicio de Atención al Cliente del Ilustre Colegio de Abogados de Málaga si no está conforme'] },
        { d: 'F7', title: 'Prevención', owner: ['Socio director', 'Sistemas y seguridad de la información'], date: '2026-10-16', status: { text: 'Planificado', tone: 'info' }, items: ['Aviso automático en el Gestor de expedientes cuando las horas superen el 90 % de la estimación de la hoja de encargo', 'Adenda obligatoria en Signaturit para toda ampliación de alcance (POL-HON-004): tres quejas iguales en un año', 'Informe de situación quincenal a clientes en operaciones de M&A y suplente asignado en vacaciones'] },
        { d: 'F8', title: 'Cierre y registro', owner: ['Atención al cliente y facturación'], date: '2026-10-23', status: { text: 'Planificado', tone: 'info' }, items: ['Cierre del expediente de queja en el Gestor con la evidencia y archivo en iManage', 'Inclusión en el informe anual de calidad y quejas de clientes del despacho'] }
      ]
    },
    reply: {
      to_label: 'a la clienta',
      subject: 'RE: Queja formal - Minuta F-2026-0938 y falta de información sobre la compra del Hotel Bahía de Nerja - Ref. REC-2026-0057',
      sub: 'Para elena.navas@grupocostadelsol.example · en español',
      tab_label: 'Se envía',
      text: [
        'Estimada Sra. Navas:',
        '',
        'Hemos recibido su correo del 28 de septiembre de 2026 sobre la minuta F-2026-0938 del asunto de compra de Hotel Bahía de Nerja, S.L. y sobre la información que han recibido durante la operación. Le agradecemos que nos lo haya trasladado con tanta claridad y le pedimos disculpas: tiene razón en dos cuestiones importantes.',
        '',
        'La referencia de su queja es REC-2026-0057.',
        '',
        'Sobre la minuta, hemos revisado una a una las horas imputadas, que le adjuntamos desglosadas por fecha, profesional y tarea:',
        '- El trabajo incluido en la hoja de encargo (due diligence y negociación del contrato) asciende a 13.360 € más IVA, dentro del margen del 10 % sobre la estimación.',
        '- La diferencia procede sobre todo de la revisión urbanística y de la licencia turística que nos pidieron el 4 de junio (4.320 € más IVA). Es un trabajo realizado y entregado con el informe de due diligence, pero no les enviamos la estimación de su coste por escrito, como prevé la hoja de encargo. Por ello aplicamos un descuento del 25 % sobre esa parte.',
        '- Se incluyeron por error 3 horas de coordinación interna que no son facturables. Las retiramos.',
        '',
        'Emitiremos una factura rectificativa con un abono de 1.740 € más IVA. El importe de la minuta queda en 16.660 € más IVA (20.158,60 €) y el vencimiento pasa a 30 días desde la fecha de la rectificativa, por lo que no deben atender la factura el 15 de octubre.',
        '',
        'Sobre el estado de la operación: el contrato se firmó el 24 de julio y el cierre depende del cambio de titularidad de la licencia turística. La solicitud se presentó en el Registro de Turismo de Andalucía el 9 de septiembre y está pendiente de resolución. En cuanto la recibamos, les propondremos la fecha de cierre. Lamentamos no haber contestado a sus correos del 28 de agosto y del 7 de septiembre; desde hoy el expediente tiene un interlocutor suplente y les enviaremos un informe de situación cada quince días hasta el cierre.',
        '',
        'El socio responsable del asunto le propone reunirse el martes 6 de octubre a las 10:00, en nuestra sede de Málaga o por videoconferencia, lo que les resulte más cómodo. Si les viene mejor otra fecha, díganos cuál.',
        '',
        'Le enviaremos nuestra respuesta formal antes del 20 de octubre de 2026. Si no estuviera conforme con ella, puede dirigirse al Servicio de Atención al Cliente del Ilustre Colegio de Abogados de Málaga.',
        '',
        'Agradecemos de nuevo su confianza desde 2019. Quedamos a su disposición.',
        '',
        'Atentamente,',
        '',
        'Socio director',
        'Mora & Jordano Abogados',
        'atencion.clientes@morajordano.example'
      ].join('\n'),
      highlights: [
        { text: 'REC-2026-0057', label: 'Referencia', tone: 'brand' },
        { text: 'abono de 1.740 € más IVA', label: 'Ajuste', tone: 'brand' },
        { text: 'no deben atender la factura el 15 de octubre', label: 'Vencimiento', tone: 'brand' },
        { text: 'antes del 20 de octubre de 2026', label: 'Compromiso', tone: 'brand' }
      ],
      llm_instructions: [
        'Tono formal, cercano y profesional, de un despacho de abogados a la directora financiera de un cliente empresa con el que trabaja desde 2019 (tratamiento de usted; saludo «Estimada Sra. Navas:»). Reconoce con claridad lo que el despacho hizo mal sin culpar a nadie del equipo con nombre ni al cliente.',
        'Acusa recibo del correo del 28 de septiembre de 2026 sobre la minuta F-2026-0938 del asunto de compra de Hotel Bahía de Nerja, S.L., pide disculpas y da la referencia REC-2026-0057.',
        'Explica el desglose (adjunto): trabajo de la hoja de encargo 13.360 € + IVA dentro del margen del 10 %; revisión urbanística y de licencia turística pedida el 4 de junio (4.320 € + IVA), realizada pero sin estimación de coste por escrito, con un descuento del 25 %; 3 horas de coordinación interna facturadas por error que se retiran.',
        'Confirma la factura rectificativa con un abono de 1.740 € + IVA, el nuevo importe de 16.660 € + IVA (20.158,60 €) y que el vencimiento pasa a 30 días desde la rectificativa, por lo que no deben pagar el 15 de octubre.',
        'Informa del estado: SPA firmado el 24 de julio, cierre pendiente del cambio de titularidad de la licencia turística solicitado en el Registro de Turismo de Andalucía el 9 de septiembre; disculpa por no contestar los correos del 28 de agosto y del 7 de septiembre; interlocutor suplente e informe de situación quincenal hasta el cierre.',
        'Propón reunión con el socio responsable el martes 6 de octubre a las 10:00 en la sede de Málaga o por videoconferencia, y la respuesta formal antes del 20 de octubre de 2026, con la posibilidad de acudir al Servicio de Atención al Cliente del Ilustre Colegio de Abogados de Málaga si no está conforme.',
        'No reveles datos internos (vacaciones del asociado, canales de Teams, quejas de otros clientes, tarifas por persona más allá del desglose adjunto) ni cites códigos internos distintos de REC-2026-0057 y F-2026-0938. Respeta el secreto profesional: no menciones otros asuntos del cliente.',
        'Firma: Socio director · Mora & Jordano Abogados · atencion.clientes@morajordano.example'
      ],
      criterion: 'Criterio de redacción: reconoce la falta de aviso y de información, explica el ajuste con cifras y plazos y propone la reunión; no revela datos internos del equipo ni de otros clientes. Coherente con el deber de información al cliente del Código Deontológico y con la hoja de encargo.',
      control: {
        label: 'Análisis de honorarios para quien aprueba',
        note: 'Análisis interno que acompaña a la aprobación; no se envía a la clienta.',
        edited_note: 'El análisis corresponde al borrador de Agentic Platform; la versión editada incluye cambios del Socio director en el texto que se envía.',
        subject: 'Análisis interno · REC-2026-0057 · R-2026-0041',
        text: [
          '1. ¿Horas reales? Sí: 105 h con parte diario en el Gestor y entregables en iManage. No hay horas duplicadas ni imputadas a otro expediente.',
          '2. ¿Dentro del encargo? 76 h (13.360 €) sí, +6,9 % sobre la estimación, dentro del margen de la cláusula 6. 26 h (4.320 €) son una ampliación pedida por escrito por el cliente el 04/06.',
          '3. ¿Se cumplió la hoja de encargo? No: la desviación superó el 10 % y no se comunicó por escrito antes de facturar; además se facturaron 3 h de coordinación interna (660 €), excluidas expresamente.',
          '4. Ajuste propuesto: abono de 660 € y descuento del 25 % de la ampliación (1.080 €) · rectificativa R-2026-0041 de 1.740 € + IVA · nuevo importe 16.660 € + IVA. Precedentes: REC-2026-0031 (20 %) y REC-2025-0118 (15 %).',
          '5. Información al cliente: sin informe desde el 18/06 y dos correos sin respuesta. Se asigna suplente e informe quincenal. La Ley 44/2006 no aplica (cliente empresa).',
          '',
          'Qué se aprueba: envío de la respuesta y del desglose, emisión de la rectificativa R-2026-0041, suspensión del vencimiento del 15/10 y propuesta de reunión el 06/10.',
          'Riesgo si no se aprueba esta semana: el cliente retiene el pago, la queja puede llegar al Colegio de Abogados de Málaga y se resiente una relación de siete años con seis expedientes activos.'
        ].join('\n')
      }
    },
    approval: {
      title: 'Respuesta a Grupo Hostelero Costa del Sol, rectificativa y reunión',
      approver: 'Socio director',
      policy: 'PR-CLI-004 · POL-HON-004 · Código Deontológico',
      summary: {
        pending: 'Agentic Platform ha preparado la respuesta a la clienta, el desglose de horas, la factura rectificativa R-2026-0041 (1.740 € + IVA), la suspensión del vencimiento y la propuesta de reunión. No se envía ni se emite nada hasta que el Socio director lo apruebe.',
        approved: 'El Socio director ha aprobado la propuesta. Agentic Platform ha enviado la respuesta con el desglose, ha emitido la rectificativa R-2026-0041, ha suspendido el vencimiento de F-2026-0938 y ha enviado la convocatoria de la reunión del 06/10.',
        rejected: 'El Socio director ha rechazado la propuesta: no se ha enviado la respuesta, ni se ha emitido la rectificativa, ni se ha tocado el vencimiento.'
      },
      scope: [
        { label: 'Respuesta y desglose a la clienta', state: { pending: { status: 'pending', chip: 'Enviar' }, approved: { status: 'sent', chip: 'Enviada' }, rejected: { status: 'rejected', chip: 'No enviada' } } },
        { label: 'Factura rectificativa', value: 'R-2026-0041 · 1.740 € + IVA', state: { pending: { status: 'pending', chip: 'Emitir' }, approved: { status: 'ok', chip: 'Emitida' }, rejected: { status: 'rejected', chip: 'No emitida' } } },
        { label: 'Vencimiento de F-2026-0938', value: 'Suspendido · 30 días desde la rectificativa', state: { pending: { status: 'pending', chip: 'Suspender' }, approved: { status: 'ok', chip: 'Suspendido' }, rejected: { status: 'hold', chip: '15/10/2026' } } },
        { label: 'Reunión con el socio responsable', value: '06/10/2026 10:00 · Málaga o Teams', state: { pending: { status: 'pending', chip: 'Convocar' }, approved: { status: 'sent', chip: 'Convocada' }, rejected: { status: 'draft', chip: 'Borrador' } } },
        { label: 'Aviso automático de desviación', value: 'Gestor de expedientes · 90 % de la estimación', state: { status: 'evaluate', chip: 'Con Sistemas (F7)' } }
      ],
      effects: [
        'Outlook: respuesta y desglose enviados desde atencion.clientes@morajordano.example',
        'Gestor de expedientes: rectificativa R-2026-0041 emitida sobre F-2026-0938 (abono de 1.740 € + IVA)',
        'Gestor de expedientes: vencimiento de F-2026-0938 suspendido y suplente asignado en MER-2026-0219',
        'Microsoft Teams y Outlook: convocatoria de la reunión del 06/10 a las 10:00',
        'Gestor de expedientes: expediente de queja REC-2026-0057 en curso · copia en iManage'
      ],
      approve_label: 'Aprobar, emitir y enviar',
      next_step: 'Siguiente paso: reunión con la clienta el 06/10, confirmar la causa con el Socio responsable de Mercantil y enviar la respuesta formal antes del 20/10/2026.',
      toast_approved: 'Respuesta enviada a Grupo Hostelero Costa del Sol · rectificativa R-2026-0041 emitida',
      reject_text: 'No se envía la respuesta, ni se emite la rectificativa, ni se suspende el vencimiento. El motivo queda en el registro de auditoría. Recuerda que la minuta vence el 15/10 y la clienta ha anunciado que no la pagará.',
      reject_placeholder: 'Por ejemplo: hablar antes con el Socio responsable de Mercantil sobre el descuento de la ampliación',
      reject_audit: 'no se envía ni se emite nada',
      toast_rejected: 'Propuesta rechazada: no se ha enviado nada ni se ha emitido ninguna rectificativa'
    },
    compare: {
      rows: [
        { k: 'Personas que intervienen', hoy: '3–4: facturación, socio responsable, asociado y Socio director', pro_strong: '1', pro: ': el Socio director revisa, corrige si hace falta y aprueba' },
        { k: 'Sistemas que hay que abrir', hoy: '5: Outlook, Gestor de expedientes, Signaturit, iManage y Teams', pro_strong: '1', pro: ': esta consola; Agentic Platform consulta los 5' }
      ],
      steps_today: '10–14 búsquedas, cruces de horas y redacciones a mano',
      time_label: 'Análisis, expediente y respuesta',
      time_today: '3–5 h repartidas en varios días; a menudo la respuesta sale cerca del plazo',
      footer: 'Criterio de aceptación propuesto para el piloto: análisis de horas frente a la hoja de encargo y borrador de respuesta en menos de 15 minutos, el 100 % de las quejas respondidas dentro de plazo y el Socio director acepta el borrador con ediciones menores en al menos el 70 % de los casos.'
    },
    audit: {
      requested: { action: 'Análisis de queja solicitado', detail: 'REC-2026-0057 · correo de elena.navas@grupocostadelsol.example del 28/09/2026 10:41' },
      analyzed: { action: 'Queja analizada', detail: 'REC-2026-0057 · minuta F-2026-0938 · 105 h · 18.400 € + IVA' },
      after_analysis: [
        { action: 'Rectificativa preparada en borrador', detail: 'R-2026-0041 · Gestor de expedientes · abono de 1.740 € + IVA · no emitida' },
        { action: 'Expediente de queja y análisis de honorarios preparados', detail: 'REC-2026-0057 · F1–F8 · ajuste de 660 € + 25 % de la ampliación' },
        { action: 'Respuesta a la clienta redactada', detail: 'REC-2026-0057 · español · versión 1 · pendiente de aprobación' }
      ],
      approved: { action: 'Respuesta aprobada y enviada', detail: 'REC-2026-0057 · a elena.navas@grupocostadelsol.example' },
      after_approval: [
        { action: 'Factura rectificativa emitida', detail: 'Gestor de expedientes · R-2026-0041 · 1.740 € + IVA sobre F-2026-0938' },
        { action: 'Vencimiento suspendido', detail: 'F-2026-0938 · nuevo vencimiento a 30 días desde la rectificativa' },
        { action: 'Reunión convocada', detail: 'Outlook y Microsoft Teams · 06/10/2026 10:00 · Socio responsable de Mercantil' },
        { action: 'Expediente actualizado', detail: 'Gestor de expedientes · REC-2026-0057 en curso · suplente asignado en MER-2026-0219' }
      ]
    },
    outcome_label: 'Rectificativa R-2026-0041 y respuesta enviadas · REC-2026-0057 en curso',
    toast_analyzed: 'Queja analizada · expediente, rectificativa y respuesta en borrador',
    status_chips: { idle: 'Abierta · sin analizar', pending: 'Esperando aprobación del Socio director', approved: 'Ajustada y respondida · expediente en curso', rejected: 'Propuesta rechazada' },
    report: {
      button: 'Descargar expediente de queja',
      title: 'Expediente de queja REC-2026-0057',
      subtitle: 'Honorarios e información al cliente · minuta F-2026-0938 (18.400 € + IVA) · expediente MER-2026-0219 · análisis de horas frente a la hoja de encargo y propuesta de ajuste',
      filename: 'expediente-REC-2026-0057',
      meta: [['Sede', 'Málaga · Calle Linaje'], ['Queja', 'REC-2026-0057 · 28/09/2026 10:41'], ['Minuta', 'F-2026-0938 · MER-2026-0219'], ['Respuesta', 'antes del 20/10/2026']],
      state: { pending: 'Borrador · pendiente de aprobación', approved: 'Rectificativa emitida · F4 en revisión', rejected: 'Borrador · propuesta rechazada' },
      summary: [
        'Queja de Grupo Hostelero Costa del Sol, S.L. (interlocutora: su directora financiera) por la minuta F-2026-0938, de 18.400 € + IVA, del expediente MER-2026-0219 (compra del 100 % de Hotel Bahía de Nerja, S.L.), frente a los 12.500 € + IVA estimados en la hoja de encargo HE-2026-0219, y por falta de información sobre la operación desde la firma del SPA.',
        'El trabajo dentro del alcance (76 h, 13.360 €) está dentro del margen del 10 %. La desviación procede de una ampliación pedida por el cliente el 04/06 (26 h, 4.320 €) aceptada sin estimación ni adenda, y de 3 h de coordinación interna no facturables (660 €). Se propone una rectificativa de 1.740 € + IVA y la suspensión del vencimiento.',
        'Hipótesis de causa, a confirmar por el Socio responsable de Mercantil: ampliación aceptada por correo sin pasar por el responsable y consultas de la clienta sin asignar durante las vacaciones del asociado.'
      ],
      trace_heading: 'Anexo A · Traza del encargo y de la minuta',
      trace_rows: [
        { etapa: 'Hoja de encargo', fecha: '12/03/2026', detalle: 'Firmada en Signaturit · 12.500 € + IVA estimados · cláusula 6 de aviso de desviación', ref: 'HE-2026-0219' },
        { etapa: 'Ampliación', fecha: '04/06/2026 18:22', detalle: 'El consejero delegado pide la revisión urbanística y de la licencia turística', ref: 'MER-2026-0219' },
        { etapa: 'Aceptación', fecha: '05/06/2026 09:10', detalle: 'El asociado la acepta por correo sin estimación de coste ni adenda', ref: 'iManage' },
        { etapa: 'Informe', fecha: '18/06/2026', detalle: 'Último informe de situación enviado al cliente', ref: 'iManage' },
        { etapa: 'Firma', fecha: '24/07/2026', detalle: 'SPA firmado · cierre pendiente del cambio de titularidad de la licencia', ref: 'iManage' },
        { etapa: 'Consultas', fecha: '28/08 y 07/09/2026', detalle: 'Correos de la clienta reenviados al canal del expediente sin asignar', ref: 'Teams' },
        { etapa: 'Minuta', fecha: '15/09/2026', detalle: '18.400 € + IVA sin desglose · vence el 15/10', ref: 'F-2026-0938' },
        { etapa: 'Queja', fecha: '28/09/2026 10:41', detalle: 'Correo de la directora financiera con la minuta y la hoja de encargo', ref: 'REC-2026-0057' }
      ],
      units: {
        heading: 'Anexo B · Partes de horas del expediente MER-2026-0219 (muestra)',
        cols: [{ label: 'Fecha', key: 'fecha' }, { label: 'Tarea', key: 'comercio' }, { label: 'Profesional · horas', key: 'canal' }, { label: 'Importe (€)', key: 'importe', num: true }, { label: 'Partida', key: 'aut', mono: true }, { label: 'Estado', key: 'estado', status: true }],
        rows: [
          { fecha: '23/03/2026', comercio: 'Revisión societaria y de contratos de la sociedad objetivo', canal: 'Asociado · 6,0 h', importe: '900,00', aut: 'P1', estado: 'Conforme' },
          { fecha: '14/04/2026', comercio: 'Due diligence laboral: plantilla y convenio de hostelería', canal: 'Asociado · 5,5 h', importe: '825,00', aut: 'P1', estado: 'Conforme' },
          { fecha: '12/06/2026', comercio: 'Revisión urbanística de la terraza y del anexo de 2019', canal: 'Asociado · 7,0 h', importe: '1.050,00', aut: 'P4', estado: 'Ampliación sin adenda', estado_after: 'Descuento del 25 %' },
          { fecha: '17/06/2026', comercio: 'Licencia turística: inscripción y categoría en el Registro de Turismo', canal: 'Socio · 2,5 h', importe: '550,00', aut: 'P4', estado: 'Ampliación sin adenda', estado_after: 'Descuento del 25 %' },
          { fecha: '08/07/2026', comercio: 'Negociación del SPA con los vendedores', canal: 'Socio · 3,0 h', importe: '660,00', aut: 'P2', estado: 'Conforme' },
          { fecha: '15/07/2026', comercio: 'Nueva ronda del SPA: precio aplazado y garantía', canal: 'Socio · 2,0 h', importe: '440,00', aut: 'P3', estado: 'Conforme' },
          { fecha: '20/07/2026', comercio: 'Coordinación interna del equipo antes de la firma', canal: 'Socio · 1,5 h', importe: '330,00', aut: 'P5', estado: 'No facturable', estado_after: 'Abonada' },
          { fecha: '23/07/2026', comercio: 'Coordinación interna y reparto de tareas de cierre', canal: 'Socio · 1,5 h', importe: '330,00', aut: 'P5', estado: 'No facturable', estado_after: 'Abonada' }
        ]
      },
      history_heading: 'Anexo C · Quejas de clientes cerradas (12 meses)',
      approvals: [
        { paso: 'Expediente, análisis de honorarios y respuesta', rol: 'Agentic Platform · agente Quejas de clientes y honorarios', kind: 'agent' },
        { paso: 'Respuesta, rectificativa y suspensión del vencimiento (F3)', rol: 'Socio director', kind: 'reply' },
        { paso: 'Revisión del criterio deontológico (F4)', rol: 'Responsable de Cumplimiento (PBC y RGPD)', kind: 'pending' },
        { paso: 'Respuesta formal (F6)', rol: 'Socio director', kind: 'pending' }
      ],
      second_signer: { role: 'Socio responsable de Mercantil', note: 'Confirmación de las horas y de la causa · pendiente' }
    },
    presenter: {
      running: 'Mientras corre: señalar la línea del Gestor de expedientes (105 h: 76 dentro del alcance, 26 de ampliación y 3 de coordinación interna) y la de iManage (la ampliación la pidió el cliente el 04/06, pero nadie estimó su coste). Si hace falta, «Acelerar».',
      idle: [
        'Correo de la directora financiera de un cliente de siempre: una minuta de 18.400 € frente a 12.500 € estimados, sin desglose y sin aviso. Además, dos correos sin respuesta desde agosto. Anuncia que no paga el 15 de octubre.',
        'Es la queja que ningún socio quiere contestar en caliente. En producción, Agentic Platform la analiza en cuanto entra en el buzón de atención al cliente. Aquí la lanzamos a mano para ver qué consulta.'
      ],
      pending: [
        'Lo resaltado en el correo es lo que Agentic Platform ha extraído. Cada dato se comprueba: el cliente y el expediente en el Gestor, la hoja de encargo en Signaturit, los entregables en iManage.',
        'El dato clave: el trabajo pactado está dentro del margen. La desviación es una ampliación que pidió el propio cliente, pero que se aceptó por correo sin estimar el coste, contra la cláusula 6 de la hoja de encargo.',
        'Y un error claro: 3 horas de coordinación interna facturadas, que la hoja excluye. Se abonan sin discusión.',
        'Histórico: dos quejas iguales en un año, resueltas con un descuento sobre la parte no avisada. El expediente propone un aviso automático de desviación en el Gestor.',
        'La respuesta reconoce lo que se hizo mal, explica el ajuste con cifras y propone la reunión. No sale nada, ni la rectificativa, hasta que el Socio director lo aprueba.'
      ],
      approved: [
        'Aprobada: respuesta y desglose enviados, rectificativa de 1.740 € emitida, vencimiento suspendido y reunión convocada para el 6 de octubre. Todo queda en el registro de auditoría.',
        'La comparación de abajo: hoy, 3–4 personas y 5 sistemas, y la respuesta suele salir cerca del plazo; aquí, una revisión y una aprobación el mismo día.',
        'El expediente se descarga como documento controlado, con el análisis de horas, la traza del encargo y las aprobaciones.'
      ],
      next: {
        idle: 'Pulsar «Analizar reclamación» y leer en voz alta dos líneas del registro: Gestor de expedientes (desglose de las 105 h) e iManage (ampliación sin adenda).',
        pending: 'Pulsar «Revisar y aprobar» (arriba) o bajar hasta la respuesta y pulsar «Aprobar, emitir y enviar». Opcional: «Corregir» el expediente con uno inexistente para enseñar que no inventa datos.',
        approved: 'Pulsar «Descargar expediente de queja» y enseñar el análisis de honorarios. Después, pasar a «Simulacro» para la brecha de datos RGPD-2609-03.'
      }
    }
  }
});
