/* Banco Cierzo · reclamación SAC-2026-04187 (tres cargos con tarjeta no reconocidos).
 * Entidad, clientes y personas ficticios; datos sintéticos de demostración (MFM). */
agenticPack('banca', {
  reclamacion: {
    code: 'SAC-2026-04187',
    nav: 'Reclamación SAC-2026-04187',
    title: 'Reclamación SAC-2026-04187',
    agent: 'Reclamaciones de clientes',
    analyze_label: 'Analizar reclamación',
    nc: 'DSP-2026-11842',
    form: { code: 'REG-SAC-001-03', rev: '5' },
    received: { date: '2026-09-28', time: '09:14' },
    due: '2026-10-20',
    holidays: ['2026-10-12'],
    customer_line: 'Lucía Ferrer Gil · tarjeta Cierzo Débito ····7731',
    due_line: 'Abono provisional hoy (PSD2) · respuesta antes del 20/10/2026',
    cust_name: 'Lucía Ferrer Gil',
    cust_addr: 'lucia.ferrer.gil@correo.example',
    own_name: 'Servicio de Atención al Cliente · Banco Cierzo',
    own_addr: 'atencion.cliente@bancocierzo.example',
    mail_domain: 'bancocierzo.example',
    mail_sub: 'lucia.ferrer.gil@correo.example · buzón atencion.cliente@bancocierzo.example · español',
    mail_title: 'Correo de la clienta',
    mail_tab_label: 'Correo de la clienta',
    attachments: ['captura_movimientos_app.png', 'denuncia_policia_27-09-2026.pdf'],
    email_text: [
      'From: Lucía Ferrer Gil <lucia.ferrer.gil@correo.example>',
      'To: Atención al Cliente · Banco Cierzo <atencion.cliente@bancocierzo.example>',
      'Date: lun, 28 sep 2026 09:14',
      'Subject: Reclamación - Cargos no reconocidos en mi tarjeta de débito terminada en 7731',
      '',
      'Buenos días:',
      '',
      'Me dirijo a ustedes para presentar una reclamación formal porque en mi tarjeta de débito Cierzo Débito terminada en 7731, asociada a mi cuenta nómina, aparecen tres cargos que no he hecho ni he autorizado.',
      '',
      'Los cargos son del sábado 26 de septiembre de 2026 por la noche, todos en un comercio que aparece como «TIENDAONLINE-ELEC»:',
      '- 189,90 € a las 22:14',
      '- 204,60 € a las 22:31',
      '- 217,90 € a las 22:47',
      'En total, 612,40 €.',
      '',
      'Yo no he comprado nada en esa tienda ni la conozco. Esa noche estaba en casa y la tarjeta la tengo yo, en mi cartera; no la he perdido ni se la he dejado a nadie. Tampoco recibí ningún SMS con código ni ningún aviso en la aplicación para confirmar las compras, cosa que sí me pasa siempre que compro por internet.',
      '',
      'Me di cuenta el domingo 27 por la mañana, al ver las notificaciones de los cargos en la aplicación. Bloqueé la tarjeta desde la aplicación a las 10:05 y a continuación llamé al teléfono de atención al cliente, donde me dijeron que la tarjeta quedaba bloqueada y que enviara la reclamación por escrito. Ese mismo día presenté denuncia en la comisaría de Policía Nacional de Moratalaz; adjunto la copia de la denuncia y una captura de los movimientos.',
      '',
      'Lo único que se me ocurre es que hace un par de semanas, el 14 de septiembre, pagué con esta tarjeta en la Gasolinera Ronda Norte y el datáfono me hizo repetir la operación dos veces. No sé si tiene algo que ver.',
      '',
      'Les pido:',
      '- que me devuelvan los 612,40 € cuanto antes, porque el 1 de octubre me cargan el recibo de la hipoteca y con estos cargos no me llega el saldo;',
      '- que anulen definitivamente esta tarjeta y me envíen una nueva;',
      '- que me confirmen por escrito que han recibido esta reclamación y me den un número de referencia;',
      '- que me expliquen cómo han podido usar los datos de mi tarjeta y qué van a hacer para que no vuelva a pasar.',
      '',
      'Quedo a la espera de su respuesta en esta misma dirección de correo o en el teléfono 600 000 418.',
      '',
      'Atentamente,',
      '',
      'Lucía Ferrer Gil',
      'DNI 0000418-T',
      'Madrid'
    ].join('\n'),
    mail_extra: {
      label: 'Llamada al SAC (transcripción)',
      note: 'Transcripción de la llamada del domingo, guardada en Salesforce FSC. Agentic Platform la usa para contrastar la hora del bloqueo y lo que se le dijo a la clienta.',
      headers: { From: 'Salesforce FSC · llamada entrante 900 000 112', Subject: 'Llamada 27/09/2026 10:12 · Lucía Ferrer Gil · 6 min 40 s · agente SAC-T-031', Date: 'dom, 27 sep 2026 10:12' },
      text: [
        'Agente: Banco Cierzo, buenos días, le atiende Marta. ¿En qué puedo ayudarle?',
        'Clienta: Hola, buenos días. Tengo tres cargos en la tarjeta de débito que no son míos, de anoche, de una tienda de internet.',
        'Agente: Lo siento. Para identificarla, ¿me confirma su DNI y la fecha de nacimiento? … Gracias, señora Ferrer. Veo la tarjeta terminada en 7731. ¿Tiene la tarjeta en su poder?',
        'Clienta: Sí, la tengo aquí. La he bloqueado yo desde la aplicación hace un momento.',
        'Agente: Correcto, me consta un bloqueo temporal desde la aplicación a las 10:05. Veo tres operaciones en TIENDAONLINE-ELEC de 189,90, 204,60 y 217,90 euros. ¿Ha recibido algún código por SMS o alguna confirmación en la app para estas compras?',
        'Clienta: No, nada. Por eso me extraña.',
        'Agente: De acuerdo. La tarjeta se queda bloqueada. Para iniciar la devolución necesitamos su reclamación por escrito; puede enviarla a atencion.cliente@bancocierzo.example. Le recomiendo también poner una denuncia.',
        'Clienta: Vale. ¿Cuánto tardan en devolverme el dinero?',
        'Agente: En cuanto recibamos la reclamación, el equipo la revisa. No le puedo dar una fecha ahora mismo.',
        'Clienta: Es que el día 1 me pasan la hipoteca.',
        'Agente: Lo anoto en el caso. ¿Algo más? … Gracias por llamar.',
        '',
        'Caso Salesforce: 00418772 · motivo «Operaciones no reconocidas» · estado: pendiente de reclamación escrita.'
      ].join('\n'),
      highlights: [
        { text: 'bloqueo temporal desde la aplicación a las 10:05', label: 'Bloqueo', tone: 'ok' },
        { text: 'No, nada.', label: 'Sin SCA', tone: 'crit' },
        { text: 'No le puedo dar una fecha ahora mismo.', label: 'Sin plazo', tone: 'warn' }
      ]
    },
    highlights: [
      { text: 'Cierzo Débito terminada en 7731', label: 'Tarjeta', tone: 'brand' },
      { text: 'sábado 26 de septiembre de 2026 por la noche', label: 'Fecha', tone: 'brand' },
      { text: '«TIENDAONLINE-ELEC»', label: 'Comercio', tone: 'brand' },
      { text: '189,90 € a las 22:14', label: 'Cargo 1', tone: 'crit' },
      { text: '204,60 € a las 22:31', label: 'Cargo 2', tone: 'crit' },
      { text: '217,90 € a las 22:47', label: 'Cargo 3', tone: 'crit' },
      { text: '612,40 €', label: 'Total', tone: 'crit' },
      { text: 'la tarjeta la tengo yo, en mi cartera', label: 'Posesión', tone: 'ok' },
      { text: 'Tampoco recibí ningún SMS con código ni ningún aviso en la aplicación', label: 'Sin SCA' },
      { text: 'Bloqueé la tarjeta desde la aplicación a las 10:05', label: 'Bloqueo', tone: 'ok' },
      { text: 'presenté denuncia', label: 'Denuncia' },
      { text: 'Gasolinera Ronda Norte', label: 'Posible origen', tone: 'warn' },
      { text: 'el 1 de octubre me cargan el recibo de la hipoteca', label: 'Urgencia', tone: 'warn' }
    ],
    run: {
      title: 'Workflow «Reclamación por operaciones no reconocidas»',
      sub: 'Se lanza al entrar una reclamación en el buzón del SAC · PR-SAC-001 y POL-FRA-003',
      graph_title: 'Workflow de reclamación de cliente',
      idle_footer: 'Lee el correo, extrae y valida los datos, traza los cargos y la tarjeta, analiza la responsabilidad según PSD2 y prepara el expediente, el abono provisional y la respuesta. Nada sale sin la aprobación del SAC.',
      nodes: [
        { id: 'correo', kind: 'trigger', label: 'Correo de cliente', sub: 'Buzón del SAC', systems: ['Outlook'], icon: 'mail' },
        { id: 'extraccion', label: 'Extracción y validación', systems: ['Modelo de lenguaje', 'Salesforce FSC'], icon: 'search' },
        { id: 'traza', label: 'Traza de cargos y tarjeta', systems: ['Core bancario T24', 'Redsys', 'Falcon Fraud', 'ServiceNow'], icon: 'git-branch' },
        { id: 'historico', label: 'Histórico, PSD2 y respuesta', systems: ['Salesforce FSC', 'Procedimientos'], icon: 'clipboard' },
        { id: 'aprobacion', kind: 'approval', label: 'Aprobación del SAC', sub: 'Atención al Cliente' },
        { id: 'salida', kind: 'output', label: 'Abono, respuesta y disputa', systems: ['Outlook', 'Core bancario T24', 'Redsys'], icon: 'send' }
      ],
      edges: [['correo', 'extraccion'], ['extraccion', 'traza'], ['traza', 'historico'], ['historico', 'aprobacion'], { from: 'aprobacion', to: 'salida', label: 'aprobado' }],
      graph_at: { 0: { correo: 'done', extraccion: 'active' }, 2: { extraccion: 'done', traza: 'active' }, 8: { traza: 'done', historico: 'active' }, 13: { historico: 'done', aprobacion: 'waiting' } },
      stats: [
        { label: 'Importe no reconocido · 3 cargos en TIENDAONLINE-ELEC', value: '612,40 €' },
        { label: 'Autenticación reforzada · exención de bajo riesgo del adquirente', value: 'Sin SCA', tone: 'warn' },
        { label: 'Reclamaciones parecidas · SAC-2026-03021', value: 2, tone: 'warn' },
        { label: 'Días hábiles para la respuesta · vence el 20/10/2026', due: true }
      ]
    },
    steps: [
      { system: 'Outlook', action: 'Lee el correo de lucia.ferrer.gil@correo.example en el buzón atencion.cliente@bancocierzo.example (28/09/2026 09:14)', result: 'Reclamación por operaciones no reconocidas · 2 adjuntos (captura de movimientos y denuncia policial)', ms: 320 },
      { system: 'Modelo de lenguaje', action: 'Extrae los datos de la reclamación', result: 'Tarjeta ····7731 · 3 cargos en TIENDAONLINE-ELEC el 26/09 (189,90 + 204,60 + 217,90 = 612,40 €) · tarjeta en su poder · sin SMS ni aviso en la app · bloqueo el 27/09 a las 10:05 · denuncia presentada', ms: 2900 },
      { system: 'Salesforce FSC', action: 'Identifica a la clienta y la llamada previa', result: 'Lucía Ferrer Gil, clienta desde 2014, cuenta nómina · el correo coincide con el registrado · caso 00418772 de la llamada del 27/09 10:12 vinculado', ms: 410, tone: 'ok' },
      { system: 'Core bancario T24', action: 'Tarjeta, cargos y saldo de la cuenta', result: 'Cierzo Débito ····7731 (BIN 454812) · bloqueo temporal desde la app el 27/09 10:05 · 3 cargos contabilizados el 28/09 · saldo 341,18 € · recibo de hipoteca de 812,35 € el 01/10', ms: 380, tone: 'warn' },
      { system: 'Redsys', action: 'Detalle de las tres autorizaciones', result: 'Compra sin tarjeta presente (CNP) · adquirente Pagos del Ebro, EP · MCC 5732 · exención de bajo riesgo (TRA) solicitada por el adquirente: sin autenticación reforzada · ECI 07', ms: 350, tone: 'warn' },
      { system: 'Falcon Fraud', action: 'Puntuación de riesgo y contexto de la noche', result: 'Puntuaciones 612, 744 y 801 (umbral de bloqueo 850) · dispositivo e IP nunca vistos en la clienta · TIENDAONLINE-ELEC concentra 23 de las 186 operaciones sospechosas de esta noche en el BIN 454812 (a confirmar)', ms: 520, tone: 'warn' },
      { system: 'Core bancario T24', action: 'Uso habitual de la tarjeta en los últimos 90 días', result: '118 operaciones reconocidas, 9 en internet, todas con SCA superada en la app · ninguna en TIENDAONLINE-ELEC · 14/09/2026: Gasolinera Ronda Norte, TPV 3, 52,30 € (operación repetida)', ms: 430 },
      { system: 'ServiceNow', action: 'Busca incidentes abiertos que afecten a la tarjeta', result: 'CPP-2609-07 · punto común de compromiso en el TPV 3 de Gasolinera Ronda Norte (10–22/09) · la tarjeta ····7731 está entre las 1.107 de Banco Cierzo', ms: 460, tone: 'warn' },
      { system: 'Redsys', action: 'Estado de disputas y contracargos de los cargos', result: 'Sin disputas abiertas · plazo de contracargo Visa por fraude (motivo 10.4): 120 días desde el 28/09 · responsabilidad del adquirente al haber aplicado la exención', ms: 390, tone: 'ok' },
      { system: 'Salesforce FSC', action: 'Busca reclamaciones parecidas en los últimos 12 meses', result: '6 reclamaciones de tarjeta resueltas · 2 parecidas: SAC-2026-03021 y SAC-2026-03902 (compras CNP sin SCA por exención del adquirente, abonadas)', ms: 540, tone: 'warn' },
      { system: 'Procedimientos', action: 'Consulta PR-SAC-001, POL-FRA-003 y PR-TAR-007', result: 'Art. 45 RDL 19/2018: devolución antes del fin del día hábil siguiente (hoy, 29/09) · art. 46: sin SCA la clienta no soporta pérdidas · respuesta en 15 días hábiles (Orden ECE/1263/2019): antes del 20/10/2026', ms: 380 },
      { system: 'Modelo de lenguaje', action: 'Redacta el expediente SAC y el análisis PSD2 (F1–F8) con responsables por rol y fechas', result: 'Expediente completo · abono provisional propuesto · la relación con CPP-2609-07 queda como hipótesis', ms: 5200 },
      { system: 'Redsys', action: 'Prepara la disputa con el adquirente', result: 'DSP-2026-11842 en borrador: contracargo Visa 10.4 por 612,40 € a Pagos del Ebro, EP · no enviado', ms: 300, tone: 'ok' },
      { system: 'Modelo de lenguaje', action: 'Redacta la respuesta a la clienta y el análisis para quien aprueba', result: 'Borrador listo: acuse, referencia SAC-2026-04187, abono provisional hoy con fecha valor 26/09, reemisión de la tarjeta y plazo de respuesta · pendiente de aprobación', ms: 3100, tone: 'warn' }
    ],
    lot: {
      code: 'TIENDAONLINE-ELEC',
      noun: 'comercio',
      label: 'Comercio (nombre en Redsys)',
      fix_title: 'el comercio de los cargos',
      systems: 'Redsys y el core bancario T24',
      systems_short: 'Redsys y T24',
      fix_text: 'Si la clienta ha escrito mal el nombre del comercio, escribe el correcto. Agentic Platform lo busca en Redsys y comprueba que tiene cargos en la tarjeta ····7731 en las fechas reclamadas antes de cambiar nada.',
      same_body: 'Existe en Redsys (adquirente Pagos del Ebro, EP; MCC 5732) y tiene los tres cargos reclamados en la tarjeta ····7731. Sin cambios.',
      unknown_hint: 'Si el nombre es dudoso, compáralo con la captura de movimientos que adjunta la clienta.',
      mismatch_body: 'El código existe en los sistemas, pero no tiene cargos reclamados en la tarjeta ····7731: no se cambia la ficha.',
      known: {
        'CPP-2609-07': { kind: 'mismatch', title: 'CPP-2609-07 es el expediente del punto de compromiso, no un comercio de cargo', body: 'Existe en ServiceNow: punto común de compromiso en el TPV 3 de Gasolinera Ronda Norte. Está vinculado a la reclamación como hipótesis de origen, pero los cargos reclamados son de TIENDAONLINE-ELEC. No se cambia la ficha.' },
        '334512987': { kind: 'mismatch', title: '334512987 es Gasolinera Ronda Norte, no el comercio de los cargos', body: 'La clienta pagó allí el 14/09 (52,30 €, operación reconocida). Es el posible punto de compromiso de CPP-2609-07, no el comercio de los cargos reclamados. No se cambia la ficha.' }
      }
    },
    sheet: {
      sub: 'Datos extraídos del correo y comprobados en Salesforce FSC, T24 y Redsys',
      empty_text: 'Agentic Platform extraerá del correo la tarjeta, los cargos, el comercio, los importes y las fechas, y los comprobará en el core bancario y en Redsys antes de preparar el expediente, el análisis PSD2 y la respuesta.',
      rows: [
        { k: 'Referencia', v: 'SAC-2026-04187', code: true, sub: 'Expediente del SAC · vinculado al caso 00418772 de la llamada del 27/09' },
        { k: 'Clienta', v: 'Lucía Ferrer Gil', ok: 'Identificada en Salesforce FSC · clienta desde 2014 · correo registrado' },
        { k: 'Tarjeta', v: 'Cierzo Débito ····7731 · BIN', trace: '454812', ok: 'Cuenta nómina en T24 · bloqueo temporal desde la app el 27/09 a las 10:05' },
        { k: 'Comercio', lot: true, ok: 'Existe en Redsys · adquirente Pagos del Ebro, EP · MCC 5732 (electrónica)' },
        { k: 'Cargos', v: '189,90 € (22:14) · 204,60 € (22:31) · 217,90 € (22:47) · total 612,40 €', ok: 'Coinciden con T24: autorizados el 26/09, contabilizados el 28/09' },
        { k: 'Autenticación', v: 'Sin autenticación reforzada (SCA)', sub: 'Exención de bajo riesgo (TRA) solicitada por el adquirente · ECI 07' },
        { k: 'Tarjeta en su poder', v: 'Sí', sub: '«la tarjeta la tengo yo, en mi cartera» · compra sin tarjeta presente' },
        { k: 'Evidencias', v: 'Denuncia policial del 27/09 · captura de movimientos · llamada grabada' },
        { k: 'Posible origen', v: 'Gasolinera Ronda Norte, 14/09 ·', trace: 'CPP-2609-07', sub: 'Hipótesis: punto común de compromiso abierto por Fraude' },
        { k: 'Saldo', v: '341,18 € · recibo de hipoteca de 812,35 € el 01/10', sub: 'Sin el abono, el recibo resultaría impagado' },
        { k: 'Plazos', v: 'Abono provisional hoy, 29/09 · respuesta antes del 20/10/2026', due: true, sub: 'Art. 45 RDL 19/2018 · 15 días hábiles (Orden ECE/1263/2019; 12/10 festivo)' },
        { k: 'Registro', v: 'DSP-2026-11842', code: true, sub: 'Disputa con el adquirente en Redsys (borrador, no enviada)' }
      ]
    },
    requests: {
      title: 'Lo que pide la clienta',
      items: [
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Devolución de los 612,40 € cuanto antes', meta: ['F3 · abono provisional con fecha valor 26/09'], quote: 'que me devuelvan los 612,40 € cuanto antes', side: { pending: { status: 'waiting', label: 'Pendiente de aprobación' }, approved: { status: 'ok', label: 'Abonado hoy' }, rejected: { status: 'rejected', label: 'No abonado' } } },
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Anular la tarjeta y enviar una nueva', meta: ['F3 · PR-TAR-007 · bloqueo definitivo y reemisión'], quote: 'que anulen definitivamente esta tarjeta y me envíen una nueva', side: { pending: { status: 'pending', label: 'Propuesto' }, approved: { status: 'ok', label: 'Reemitida' }, rejected: { status: 'rejected', label: 'No reemitida' } } },
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Acuse por escrito y número de referencia', meta: ['Respuesta a la clienta · SAC-2026-04187'], quote: 'que me confirmen por escrito que han recibido esta reclamación y me den un número de referencia', side: { pending: { status: 'waiting', label: 'Pendiente de aprobación' }, approved: { status: 'sent', label: 'Enviado' }, rejected: { status: 'rejected', label: 'No enviado' } } },
        { icon: 'clock', tone: 'warn', title: 'Cómo se usaron los datos y qué se hará', meta: ['F4 y F7 · CPP-2609-07 como hipótesis'], quote: 'que me expliquen cómo han podido usar los datos de mi tarjeta', side: { status: 'review', label: 'Hipótesis' } },
        { icon: 'calendar', tone: 'warn', title: 'Respuesta definitiva en 15 días hábiles', meta: ['F6 · resolución del expediente'], quote: 'Quedo a la espera de su respuesta', side: { status: 'pending', label: 'Antes del 20/10' } }
      ]
    },
    trace: {
      title: 'Traza de los cargos y de la tarjeta ····7731',
      sub: 'Core bancario T24 · Redsys · Falcon Fraud · ServiceNow · del posible origen a los cargos y a la cuenta',
      button_code: 'SAC-2026-04187',
      button_label: 'Expediente completo · SAC-2026-04187',
      back_title: 'Hacia atrás · de la tarjeta a los cargos',
      back: [
        { time: '14/09', title: 'Uso en el posible punto de compromiso', text: 'Gasolinera Ronda Norte (comercio 334512987), TPV 3 · 52,30 € · operación repetida dos veces · reconocida por la clienta', tone: 'warn', ref: 'CPP-2609-07', chip: { status: 'open', label: 'Expediente abierto' } },
        { time: '26/09', timeSub: '22:14', title: 'Cargo 1 · TIENDAONLINE-ELEC', text: '189,90 € · CNP · exención TRA del adquirente, sin SCA · Falcon 612', tone: 'crit', ref: 'Aut. 418204' },
        { time: '26/09', timeSub: '22:31', title: 'Cargo 2 · TIENDAONLINE-ELEC', text: '204,60 € · CNP · sin SCA · Falcon 744 · mismo dispositivo', tone: 'crit', ref: 'Aut. 418731' },
        { time: '26/09', timeSub: '22:47', title: 'Cargo 3 · TIENDAONLINE-ELEC', text: '217,90 € · CNP · sin SCA · Falcon 801 (umbral 850)', tone: 'crit', ref: 'Aut. 419112' },
        { time: '27/09', timeSub: '10:05', title: 'Bloqueo temporal desde la app', route: ['App', 'T24', 'Redsys'], route_mark: 'App', text: 'La clienta bloquea la tarjeta y llama al SAC a las 10:12 (caso 00418772)', tone: 'ok' },
        { time: '28/09', timeSub: '09:14', title: 'Reclamación por escrito', text: 'Correo al SAC con denuncia policial · cargos contabilizados ese día en la cuenta nómina', tone: 'brand', ref: 'SAC-2026-04187' }
      ],
      fwd_title: 'Hacia delante · cargos, cuenta y tarjeta',
      fwd_cols: { id: 'Elemento', qty: 'Importe (€)', when: 'Fecha', status: 'Estado' },
      fwd: [
        { id: 'Aut. 418204', dest: 'TIENDAONLINE-ELEC', sub: 'Pagos del Ebro, EP', qty: '189,90', when: '26/09 22:14', status: { pending: { status: 'pending', label: 'Abono propuesto' }, approved: { status: 'ok', label: 'Abonado' }, rejected: { status: 'warn', label: 'En cuenta' } } },
        { id: 'Aut. 418731', dest: 'TIENDAONLINE-ELEC', sub: 'Pagos del Ebro, EP', qty: '204,60', when: '26/09 22:31', status: { pending: { status: 'pending', label: 'Abono propuesto' }, approved: { status: 'ok', label: 'Abonado' }, rejected: { status: 'warn', label: 'En cuenta' } } },
        { id: 'Aut. 419112', dest: 'TIENDAONLINE-ELEC', sub: 'Pagos del Ebro, EP', qty: '217,90', when: '26/09 22:47', status: { pending: { status: 'pending', label: 'Abono propuesto' }, approved: { status: 'ok', label: 'Abonado' }, rejected: { status: 'warn', label: 'En cuenta' } } },
        { id: 'DSP-2026-11842', dest: 'Contracargo Visa 10.4', sub: 'al adquirente', qty: '612,40', when: 'Borrador', status: { pending: { status: 'draft', label: 'Borrador' }, approved: { status: 'sent', label: 'Presentado' }, rejected: { status: 'draft', label: 'Borrador' } } },
        { id: '····7731', dest: 'Cierzo Débito', sub: 'BIN 454812', qty: '—', when: '27/09 10:05', status: { pending: { status: 'hold', label: 'Bloqueo temporal' }, approved: { status: 'blocked', label: 'Anulada · reemitida' }, rejected: { status: 'hold', label: 'Bloqueo temporal' } } },
        { id: 'Recibo hipoteca', dest: 'Cuenta nómina', sub: 'saldo 341,18 €', qty: '812,35', when: '01/10/2026', status: { pending: { status: 'warn', label: 'Saldo insuficiente' }, approved: { status: 'ok', label: 'Cubierto' }, rejected: { status: 'warn', label: 'Saldo insuficiente' } } }
      ],
      fwd_note: '3 cargos · 612,40 € · autorizados el 26/09 y contabilizados el 28/09 · el abono provisional se hace con fecha valor 26/09 para que la clienta no pierda intereses ni sufra descubiertos.',
      hypothesis: {
        title: 'Hipótesis de origen · a confirmar por Prevención del Fraude',
        icon: 'shield',
        paras: [
          'La tarjeta ····7731 se usó el 14/09/2026 en el TPV 3 de Gasolinera Ronda Norte, dentro del periodo del punto común de compromiso CPP-2609-07 (10–22/09), y el datáfono repitió la operación. Los datos pudieron copiarse allí y usarse después en una compra sin tarjeta presente.',
          'A favor: dispositivo e IP nunca vistos en la clienta, tres compras seguidas en 33 minutos en un comercio de electrónica y el mismo comercio concentra 23 de las 186 operaciones sospechosas de esta noche en el BIN 454812. Por aclarar: que el TPV 3 sea el origen lo confirma la investigación forense del expediente.',
          'Para la reclamación no hace falta confirmar el origen: sin autenticación reforzada, la clienta no soporta pérdidas (art. 46 RDL 19/2018) y no hay indicios de fraude por su parte. Por eso se propone el abono hoy, sin franquicia.'
        ]
      }
    },
    history: {
      sub: 'Salesforce FSC · reclamaciones de tarjeta resueltas · últimos 12 meses',
      col_id: 'Expediente',
      col_product: 'Tarjeta y comercio',
      col_cause: 'Resolución',
      rows: [
        { id: 'SAC-2026-03021', date: '2026-07-12', product: 'Cierzo Débito ····2290', lot: 'MEGAOFERTAS-TECH', description: '3 compras CNP no reconocidas (498,70 €)', category: 'CNP sin SCA', customer_label: 'particular', root_cause: 'Exención TRA del adquirente sin SCA · abono definitivo y contracargo ganado', nc: 'DSP-2026-07316', status: 'cerrada', similar: true },
        { id: 'SAC-2026-03902', date: '2026-09-03', product: 'Cierzo Crédito ····5148', lot: 'GADGETS-EXPRESS', description: '2 compras CNP no reconocidas (379,00 €)', category: 'CNP sin SCA', customer_label: 'particular', root_cause: 'Exención TRA · abono en 1 día hábil · contracargo en curso', nc: 'DSP-2026-10287', status: 'abono definitivo', similar: true },
        { id: 'SAC-2026-03544', date: '2026-08-09', product: 'Cierzo Débito ····0675', lot: 'PASARELA-VIAJES', description: 'Compra de 1.240 € no reconocida', category: 'CNP con SCA', customer_label: 'particular', root_cause: 'SCA superada con código facilitado por la clienta en una llamada falsa (vishing) · negligencia grave · desestimada', nc: 'SAC-2026-03544', status: 'cerrada', similar: false },
        { id: 'SAC-2026-02210', date: '2026-05-18', product: 'Cierzo Débito ····8812', lot: 'SUPERMERCADOS-ARGA', description: 'Cargo duplicado en compra presencial', category: 'Error de liquidación', customer_label: 'particular', root_cause: 'Doble presentación del adquirente · abono en 2 días', nc: 'DSP-2026-04102', status: 'cerrada', similar: false },
        { id: 'SAC-2026-01455', date: '2026-04-02', product: 'Cierzo Crédito ····3391', lot: 'HOTEL-LISBOA-CENTRO', description: 'Comisión de cambio de divisa no esperada', category: 'Comisiones', customer_label: 'particular', root_cause: 'Conversión dinámica de divisa aceptada en el TPV · información aclarada', nc: 'SAC-2026-01455', status: 'cerrada', similar: false },
        { id: 'SAC-2025-08817', date: '2025-11-21', product: 'Cierzo Débito ····4407', lot: 'Cajero ATM-0712', description: 'Retirada en cajero no reconocida (300 €)', category: 'Copia de banda', customer_label: 'particular', root_cause: 'Skimming en un cajero de otra entidad · abono y reemisión', nc: 'DSP-2025-14420', status: 'cerrada', similar: false }
      ],
      note: {
        title: 'Mismo patrón que SAC-2026-03021 y SAC-2026-03902',
        body: 'Compras sin tarjeta presente en comercios de electrónica, con la exención de bajo riesgo pedida por el adquirente y sin autenticación reforzada. En los dos casos se abonó en un día hábil y el contracargo al adquirente prosperó o está en curso. SAC-2026-03544 es distinto: allí la clienta superó la SCA con un código que facilitó en una llamada falsa. El expediente propone en F7 revisar con Fraude las exenciones aceptadas para MCC 5732.'
      }
    },
    plan: {
      title: 'Expediente SAC-2026-04187 · análisis PSD2 y propuesta de abono',
      sub: 'PR-SAC-001 · abono provisional hoy; respuesta definitiva antes del 20/10/2026',
      col_label: 'Fase',
      containment_status: { pending: { text: 'Pendiente de aprobación', tone: 'warn' }, approved: { text: 'Aplicada', tone: 'ok' }, rejected: { text: 'No aplicada', tone: 'neutral' } },
      rows: [
        { d: 'F1', title: 'Admisión y equipo', owner: ['Servicio de Atención al Cliente (SAC)'], date: '2026-09-29', status: { text: 'Completo', tone: 'ok' }, lead: 'Reclamación admitida: presentada por escrito por la titular, identificada y dentro del plazo de 13 meses del art. 43 RDL 19/2018.', items: ['Servicio de Atención al Cliente (SAC): tramitación y respuesta', 'Analista de fraude de turno: análisis de las operaciones y vínculo con CPP-2609-07', 'Responsable de Medios de Pago: reemisión de la tarjeta y contracargo', 'Responsable de Cumplimiento Normativo: revisión del criterio PSD2'], note: 'Interlocutora: Lucía Ferrer Gil (lucia.ferrer.gil@correo.example · 600 000 418).' },
        { d: 'F2', title: 'Hechos', owner: ['Servicio de Atención al Cliente (SAC)'], date: '2026-09-29', status: { text: 'Completo', tone: 'ok' }, lead: 'Tres compras sin tarjeta presente en TIENDAONLINE-ELEC el 26/09/2026 entre las 22:14 y las 22:47 (612,40 €) con la tarjeta Cierzo Débito ····7731, que la clienta conserva. No reconoce las operaciones.', items: ['Autorizaciones 418204, 418731 y 419112 · adquirente Pagos del Ebro, EP · MCC 5732', 'Sin autenticación reforzada: exención de bajo riesgo solicitada por el adquirente (ECI 07)', 'Bloqueo temporal desde la app el 27/09 a las 10:05; llamada al SAC a las 10:12; denuncia el 27/09', 'Saldo actual 341,18 € y recibo de hipoteca de 812,35 € el 01/10'] },
        { d: 'F3', title: 'Medidas inmediatas', owner: ['Servicio de Atención al Cliente (SAC)', 'Responsable de Medios de Pago'], date: '2026-09-29', containment: true, items: ['Abono provisional de 612,40 € hoy, con fecha valor 26/09/2026 (art. 45 RDL 19/2018: antes del fin del día hábil siguiente a la reclamación)', 'Anulación definitiva de la tarjeta ····7731 y reemisión con número nuevo (PR-TAR-007); tarjeta virtual en la app mientras llega la física', 'Presentar el contracargo Visa motivo 10.4 por 612,40 € a Pagos del Ebro, EP (DSP-2026-11842)', 'Mantener el abono aunque el contracargo no prospere: la responsabilidad ante la clienta es del banco'] },
        { d: 'F4', title: 'Análisis PSD2', owner: ['Responsable de Cumplimiento Normativo', 'Analista de fraude de turno'], date: '2026-09-30', status: { text: 'Propuesto', tone: 'warn' }, lead: 'Operaciones no autorizadas: la clienta no las consintió y no se aplicó autenticación reforzada. Según el art. 46 RDL 19/2018, sin SCA la clienta solo respondería si hubiera actuado de forma fraudulenta: no hay indicios. Franquicia aplicable: 0 €.', items: ['No hay negligencia grave: conservaba la tarjeta, no facilitó códigos y bloqueó la tarjeta y avisó en cuanto lo vio', 'La exención TRA la pidió el adquirente: la responsabilidad frente al banco recae en el adquirente (base del contracargo)', 'Hipótesis de origen, a confirmar: compromiso de datos en el TPV 3 de Gasolinera Ronda Norte (CPP-2609-07)'] },
        { d: 'F5', title: 'Recuperación', owner: ['Responsable de Medios de Pago'], date: '2026-10-06', status: { text: 'Planificado', tone: 'info' }, items: ['Seguimiento del contracargo DSP-2026-11842 (respuesta del adquirente en 30 días)', 'Si el adquirente presenta pruebas de autenticación, revisar el caso antes de cualquier retrocesión del abono'] },
        { d: 'F6', title: 'Resolución y respuesta definitiva', owner: ['Servicio de Atención al Cliente (SAC)'], date: '2026-10-20', status: { text: 'Planificado', tone: 'info' }, items: ['Respuesta motivada a la clienta: abono definitivo y medidas adoptadas', 'Información de su derecho a acudir al Departamento de Conducta de Mercado y Reclamaciones del Banco de España si no está de acuerdo'] },
        { d: 'F7', title: 'Prevención', owner: ['Responsable de Prevención del Fraude'], date: '2026-10-09', status: { text: 'Planificado', tone: 'info' }, items: ['Incluir TIENDAONLINE-ELEC y el BIN 454812 en la regla preventiva de Falcon (alarma de esta noche)', 'Revisar con los adquirentes las exenciones TRA aceptadas para MCC 5732: tres reclamaciones iguales en tres meses', 'Cerrar CPP-2609-07 con la reemisión de las 1.107 tarjetas afectadas'] },
        { d: 'F8', title: 'Cierre y registro', owner: ['Servicio de Atención al Cliente (SAC)'], date: '2026-10-23', status: { text: 'Planificado', tone: 'info' }, items: ['Cierre del expediente en Salesforce FSC con la evidencia y registro en GRC Archer para el informe anual del SAC', 'Comunicación del fraude en la estadística semestral de fraude en pagos al Banco de España'] }
      ]
    },
    reply: {
      to_label: 'a la clienta',
      subject: 'RE: Reclamación - Cargos no reconocidos en mi tarjeta de débito terminada en 7731 - Ref. SAC-2026-04187',
      sub: 'Para lucia.ferrer.gil@correo.example · en español',
      tab_label: 'Se envía',
      text: [
        'Estimada Sra. Ferrer:',
        '',
        'Hemos recibido su reclamación del 28 de septiembre de 2026 sobre tres cargos que no reconoce en su tarjeta Cierzo Débito terminada en 7731, realizados el 26 de septiembre en el comercio TIENDAONLINE-ELEC por un total de 612,40 €. Lamentamos las molestias que esta situación le está causando.',
        '',
        'La referencia de su reclamación es SAC-2026-04187. Le rogamos que la indique en cualquier comunicación sobre este asunto.',
        '',
        'Le informamos de lo siguiente:',
        '- Hoy, 29 de septiembre, le hemos abonado en su cuenta los 612,40 € de forma provisional, con fecha valor 26 de septiembre, de modo que no le supongan ningún coste ni afecten al pago de sus recibos.',
        '- Su tarjeta terminada en 7731 ha quedado anulada definitivamente. Le enviaremos una nueva tarjeta, con otro número, a su domicilio en un plazo de 5 a 7 días hábiles. Mientras tanto, dispone de una tarjeta virtual en la aplicación de Banco Cierzo para sus compras.',
        '- Hemos iniciado las gestiones con la entidad del comercio para aclarar las operaciones.',
        '',
        'Estamos analizando cómo se obtuvieron los datos de su tarjeta. Le enviaremos nuestra respuesta definitiva antes del 20 de octubre de 2026. Si la investigación concluyera que las operaciones fueron autorizadas por usted, se lo comunicaríamos de forma motivada antes de realizar cualquier ajuste del abono.',
        '',
        'Si en ese plazo no recibe respuesta o no está de acuerdo con ella, puede dirigirse al Departamento de Conducta de Mercado y Reclamaciones del Banco de España.',
        '',
        'Le recordamos que Banco Cierzo nunca le pedirá por teléfono, SMS o correo electrónico sus claves ni los códigos que recibe para confirmar operaciones.',
        '',
        'Atentamente,',
        '',
        'Servicio de Atención al Cliente',
        'Banco Cierzo, S.A.',
        'atencion.cliente@bancocierzo.example'
      ].join('\n'),
      highlights: [
        { text: 'SAC-2026-04187', label: 'Referencia', tone: 'brand' },
        { text: 'le hemos abonado en su cuenta los 612,40 € de forma provisional, con fecha valor 26 de septiembre', label: 'Abono', tone: 'brand' },
        { text: 'ha quedado anulada definitivamente', label: 'Tarjeta', tone: 'brand' },
        { text: 'antes del 20 de octubre de 2026', label: 'Compromiso', tone: 'brand' }
      ],
      llm_instructions: [
        'Tono formal, cortés y claro, de un banco a una clienta particular (tratamiento de usted; saludo «Estimada Sra. Ferrer:»), con lenguaje claro según las buenas prácticas del Banco de España. Muestra empatía sin reconocer culpa ni culpar a la clienta.',
        'Acusa recibo de la reclamación del 28 de septiembre de 2026 por los tres cargos en TIENDAONLINE-ELEC del 26 de septiembre (612,40 € en total) y da la referencia SAC-2026-04187, pidiendo que la indique.',
        'Confirma el abono provisional de 612,40 € hoy, 29 de septiembre, con fecha valor 26 de septiembre, para que no le suponga coste y cubra sus recibos.',
        'Confirma que la tarjeta terminada en 7731 queda anulada definitivamente, que recibirá una nueva con otro número en su domicilio en 5 a 7 días hábiles y que mientras tanto tiene una tarjeta virtual en la aplicación; di que se han iniciado gestiones con la entidad del comercio.',
        'Di que se está analizando cómo se obtuvieron los datos y que la respuesta definitiva llegará antes del 20 de octubre de 2026; si la investigación concluyera que las operaciones las autorizó ella, se le comunicaría de forma motivada antes de ajustar el abono.',
        'Incluye su derecho a acudir al Departamento de Conducta de Mercado y Reclamaciones del Banco de España si no recibe respuesta en plazo o no está de acuerdo, y el recordatorio de que el banco nunca pide claves ni códigos por teléfono, SMS o correo.',
        'No reveles datos de la investigación (el punto de compromiso, la gasolinera, otros clientes afectados, puntuaciones de fraude, el contracargo ni el adquirente) ni cites códigos internos distintos de SAC-2026-04187.',
        'Firma: Servicio de Atención al Cliente · Banco Cierzo, S.A. · atencion.cliente@bancocierzo.example'
      ],
      criterion: 'Criterio de redacción: confirma el abono, la anulación y los plazos legales; no revela datos de la investigación (el punto de compromiso ni otros clientes afectados) ni atribuye culpa a la clienta. Lenguaje claro según las buenas prácticas del Banco de España.',
      control: {
        label: 'Análisis PSD2 para quien aprueba',
        note: 'Análisis interno que acompaña a la aprobación; no se envía a la clienta.',
        edited_note: 'El análisis corresponde al borrador de Agentic Platform; la versión editada incluye cambios del SAC en el texto que se envía.',
        subject: 'Análisis interno · SAC-2026-04187 · DSP-2026-11842',
        text: [
          '1. ¿Operaciones autorizadas? No consta consentimiento: la clienta no las reconoce, conserva la tarjeta y no hubo SCA (exención TRA pedida por el adquirente, ECI 07).',
          '2. ¿Indicios de fraude de la clienta? No: dispositivo e IP nunca vistos, sin relación previa con el comercio, bloqueo y aviso en menos de 12 h, denuncia presentada. No procede comunicar sospecha al Banco de España.',
          '3. Responsabilidad (art. 46 RDL 19/2018): sin SCA, la clienta solo soporta pérdidas si actúa de forma fraudulenta. Franquicia de 50 €: no aplica. Importe a abonar: 612,40 €.',
          '4. Plazo (art. 45): devolución antes del fin del día hábil siguiente a la reclamación del 28/09, es decir, hoy 29/09. Fecha valor: 26/09 (fecha del adeudo).',
          '5. Recuperación: contracargo Visa 10.4 a Pagos del Ebro, EP, responsable por haber aplicado la exención. El abono a la clienta no depende del resultado.',
          '',
          'Qué se aprueba: envío de la respuesta, abono provisional de 612,40 € con fecha valor 26/09, anulación y reemisión de la tarjeta ····7731 y presentación del contracargo DSP-2026-11842.',
          'Riesgo si no se aprueba hoy: incumplimiento del art. 45 y recibo de hipoteca de 812,35 € impagado el 01/10 (saldo 341,18 €).'
        ].join('\n')
      }
    },
    approval: {
      title: 'Respuesta a Lucía Ferrer Gil, abono provisional y reemisión',
      approver: 'Servicio de Atención al Cliente (SAC)',
      policy: 'PR-SAC-001 · POL-FRA-003 · PR-TAR-007',
      summary: {
        pending: 'Agentic Platform ha preparado la respuesta a la clienta, el abono provisional de 612,40 € con fecha valor 26/09, la reemisión de la tarjeta y el contracargo al adquirente. No se envía ni se abona nada hasta que el SAC lo apruebe.',
        approved: 'El SAC ha aprobado la propuesta. Agentic Platform ha enviado la respuesta, ha abonado 612,40 € en T24, ha anulado y reemitido la tarjeta ····7731 y ha presentado el contracargo DSP-2026-11842 en Redsys.',
        rejected: 'El SAC ha rechazado la propuesta: no se ha enviado la respuesta, ni se ha abonado nada, ni se ha reemitido la tarjeta.'
      },
      scope: [
        { label: 'Respuesta a la clienta', state: { pending: { status: 'pending', chip: 'Enviar' }, approved: { status: 'sent', chip: 'Enviada' }, rejected: { status: 'rejected', chip: 'No enviada' } } },
        { label: 'Abono provisional', value: '612,40 € · fecha valor 26/09', state: { pending: { status: 'pending', chip: 'Abonar' }, approved: { status: 'ok', chip: 'Abonado' }, rejected: { status: 'rejected', chip: 'No abonado' } } },
        { label: 'Tarjeta ····7731', value: 'Anulación y reemisión', state: { pending: { status: 'pending', chip: 'Reemitir' }, approved: { status: 'ok', chip: 'Reemitida' }, rejected: { status: 'hold', chip: 'Bloqueo temporal' } } },
        { label: 'Contracargo Visa 10.4', value: 'DSP-2026-11842 · Pagos del Ebro', state: { pending: { status: 'pending', chip: 'Presentar' }, approved: { status: 'sent', chip: 'Presentado' }, rejected: { status: 'draft', chip: 'Borrador' } } },
        { label: 'Regla preventiva en Falcon', value: 'TIENDAONLINE-ELEC · BIN 454812', state: { status: 'evaluate', chip: 'Con la alarma de Fraude' } }
      ],
      effects: [
        'Outlook: respuesta enviada desde atencion.cliente@bancocierzo.example',
        'Core bancario T24: abono de 612,40 € en la cuenta nómina con fecha valor 26/09/2026',
        'Core bancario T24 y Redsys: tarjeta ····7731 anulada y pedido de reemisión con número nuevo',
        'Redsys: contracargo DSP-2026-11842 presentado a Pagos del Ebro, EP',
        'Salesforce FSC: expediente SAC-2026-04187 en curso y caso 00418772 cerrado'
      ],
      approve_label: 'Aprobar, abonar y enviar',
      next_step: 'Siguiente paso: confirmar el origen con Fraude (CPP-2609-07), seguir el contracargo y enviar la respuesta definitiva antes del 20/10/2026.',
      toast_approved: 'Respuesta enviada a Lucía Ferrer Gil · 612,40 € abonados y tarjeta reemitida',
      reject_text: 'No se envía la respuesta, ni se abona nada, ni se reemite la tarjeta. El motivo queda en el registro de auditoría. Recuerda que el plazo del art. 45 vence hoy.',
      reject_placeholder: 'Por ejemplo: pedir a Fraude que confirme la ausencia de SCA antes de abonar',
      reject_audit: 'no se envía ni se abona nada',
      toast_rejected: 'Propuesta rechazada: no se ha enviado nada ni se ha abonado ningún importe'
    },
    compare: {
      rows: [
        { k: 'Personas que intervienen', hoy: '3–4: SAC, Fraude, Medios de Pago y Cumplimiento', pro_strong: '1', pro: ': el SAC revisa, corrige si hace falta y aprueba' },
        { k: 'Sistemas que hay que abrir', hoy: '6: Outlook, Salesforce FSC, T24, Redsys, Falcon y ServiceNow', pro_strong: '1', pro: ': esta consola; Agentic Platform consulta los 6' }
      ],
      steps_today: '12–15 consultas, cruces y redacciones a mano',
      time_label: 'Análisis, expediente y respuesta',
      time_today: '2–4 h de trabajo; a menudo el abono se retrasa al día siguiente',
      footer: 'Criterio de aceptación propuesto para el piloto: expediente y propuesta de abono en menos de 15 minutos, el 100 % de los abonos dentro del plazo del art. 45 y el SAC acepta el borrador con ediciones menores en al menos el 70 % de los casos.'
    },
    audit: {
      requested: { action: 'Análisis de reclamación solicitado', detail: 'SAC-2026-04187 · correo de lucia.ferrer.gil@correo.example del 28/09/2026 09:14' },
      analyzed: { action: 'Reclamación analizada', detail: 'SAC-2026-04187 · tarjeta ····7731 · 3 cargos · 612,40 €' },
      after_analysis: [
        { action: 'Disputa preparada en borrador', detail: 'DSP-2026-11842 · Redsys · contracargo Visa 10.4 · no enviada' },
        { action: 'Expediente SAC y análisis PSD2 preparados', detail: 'SAC-2026-04187 · F1–F8 · franquicia 0 € · abono provisional propuesto' },
        { action: 'Respuesta a la clienta redactada', detail: 'SAC-2026-04187 · español · versión 1 · pendiente de aprobación' }
      ],
      approved: { action: 'Respuesta aprobada y enviada', detail: 'SAC-2026-04187 · a lucia.ferrer.gil@correo.example' },
      after_approval: [
        { action: 'Abono provisional aplicado', detail: 'Core bancario T24 · 612,40 € · fecha valor 26/09/2026 · cuenta nómina de Lucía Ferrer Gil' },
        { action: 'Tarjeta anulada y reemitida', detail: 'T24 y Redsys · ····7731 anulada · reemisión con número nuevo · tarjeta virtual activa' },
        { action: 'Contracargo presentado', detail: 'Redsys · DSP-2026-11842 · Visa 10.4 · 612,40 € a Pagos del Ebro, EP' },
        { action: 'Expediente actualizado', detail: 'Salesforce FSC · SAC-2026-04187 en curso · caso 00418772 cerrado' }
      ]
    },
    outcome_label: 'Abono de 612,40 € y respuesta enviados · SAC-2026-04187 en curso',
    toast_analyzed: 'Reclamación analizada · expediente, abono y respuesta en borrador',
    status_chips: { idle: 'Abierta · sin analizar', pending: 'Esperando aprobación del SAC', approved: 'Abonada y respondida · expediente en curso', rejected: 'Propuesta rechazada' },
    report: {
      button: 'Descargar expediente SAC',
      title: 'Expediente de reclamación SAC-2026-04187',
      subtitle: 'Operaciones con tarjeta no reconocidas · 3 cargos en TIENDAONLINE-ELEC (612,40 €) · tarjeta Cierzo Débito ····7731 · análisis PSD2 y propuesta de abono',
      filename: 'expediente-SAC-2026-04187',
      meta: [['Centro', 'Centro de Operaciones · Madrid'], ['Reclamación', 'SAC-2026-04187 · 28/09/2026 09:14'], ['Tarjeta', 'Cierzo Débito ····7731 (BIN 454812)'], ['Respuesta', 'antes del 20/10/2026']],
      state: { pending: 'Borrador · pendiente de aprobación', approved: 'Abono provisional aplicado · F4 en revisión', rejected: 'Borrador · propuesta rechazada' },
      summary: [
        'Reclamación de la clienta Lucía Ferrer Gil por tres compras sin tarjeta presente que no reconoce, realizadas el 26/09/2026 entre las 22:14 y las 22:47 en TIENDAONLINE-ELEC (adquirente Pagos del Ebro, EP; MCC 5732) por un total de 612,40 €. La clienta conserva la tarjeta, la bloqueó desde la app el 27/09 a las 10:05 y presentó denuncia.',
        'Las operaciones se autorizaron sin autenticación reforzada, con la exención de bajo riesgo solicitada por el adquirente. Según el art. 46 RDL 19/2018, la clienta no soporta pérdidas salvo actuación fraudulenta, de la que no hay indicios. Se propone abono provisional hoy (art. 45) con fecha valor 26/09 y contracargo al adquirente.',
        'Hipótesis de origen, a confirmar por Prevención del Fraude: compromiso de datos en el TPV 3 de Gasolinera Ronda Norte (expediente CPP-2609-07), donde la clienta pagó el 14/09/2026.'
      ],
      trace_heading: 'Anexo A · Traza de la tarjeta y de los cargos',
      trace_rows: [
        { etapa: 'Uso de la tarjeta', fecha: '14/09/2026', detalle: 'Gasolinera Ronda Norte, TPV 3 · 52,30 € · operación repetida · reconocida', ref: 'CPP-2609-07' },
        { etapa: 'Autorización', fecha: '26/09/2026 22:14', detalle: 'TIENDAONLINE-ELEC · 189,90 € · CNP · exención TRA, sin SCA · Falcon 612', ref: 'Aut. 418204' },
        { etapa: 'Autorización', fecha: '26/09/2026 22:31', detalle: 'TIENDAONLINE-ELEC · 204,60 € · CNP · sin SCA · Falcon 744', ref: 'Aut. 418731' },
        { etapa: 'Autorización', fecha: '26/09/2026 22:47', detalle: 'TIENDAONLINE-ELEC · 217,90 € · CNP · sin SCA · Falcon 801', ref: 'Aut. 419112' },
        { etapa: 'Bloqueo', fecha: '27/09/2026 10:05', detalle: 'Bloqueo temporal desde la app por la clienta', ref: '····7731' },
        { etapa: 'Llamada', fecha: '27/09/2026 10:12', detalle: 'Llamada al SAC · se indica reclamar por escrito', ref: '00418772' },
        { etapa: 'Contabilización', fecha: '28/09/2026', detalle: 'Los tres cargos se contabilizan en la cuenta nómina', ref: 'T24' },
        { etapa: 'Reclamación', fecha: '28/09/2026 09:14', detalle: 'Correo al SAC con denuncia y captura de movimientos', ref: 'SAC-2026-04187' }
      ],
      units: {
        heading: 'Anexo B · Operaciones de la tarjeta ····7731 (14/09–27/09/2026)',
        cols: [{ label: 'Fecha', key: 'fecha' }, { label: 'Comercio', key: 'comercio' }, { label: 'Canal', key: 'canal' }, { label: 'Importe (€)', key: 'importe', num: true }, { label: 'Autorización', key: 'aut', mono: true }, { label: 'Estado', key: 'estado', status: true }],
        rows: [
          { fecha: '14/09/2026 08:41', comercio: 'Gasolinera Ronda Norte (TPV 3)', canal: 'Presencial · chip', importe: '52,30', aut: '402117', estado: 'Reconocida' },
          { fecha: '16/09/2026 19:02', comercio: 'Supermercados Arga · Moratalaz', canal: 'Presencial · sin contacto', importe: '64,85', aut: '404590', estado: 'Reconocida' },
          { fecha: '19/09/2026 13:20', comercio: 'Farmacia Vinateros', canal: 'Presencial · sin contacto', importe: '18,40', aut: '407233', estado: 'Reconocida' },
          { fecha: '21/09/2026 21:05', comercio: 'Plataforma de streaming', canal: 'Internet · SCA en la app', importe: '13,99', aut: '409871', estado: 'Reconocida' },
          { fecha: '24/09/2026 09:37', comercio: 'Metro de Madrid', canal: 'Presencial · sin contacto', importe: '12,20', aut: '413006', estado: 'Reconocida' },
          { fecha: '26/09/2026 22:14', comercio: 'TIENDAONLINE-ELEC', canal: 'Internet · sin SCA (TRA)', importe: '189,90', aut: '418204', estado: 'No reconocida', estado_after: 'Abonada' },
          { fecha: '26/09/2026 22:31', comercio: 'TIENDAONLINE-ELEC', canal: 'Internet · sin SCA (TRA)', importe: '204,60', aut: '418731', estado: 'No reconocida', estado_after: 'Abonada' },
          { fecha: '26/09/2026 22:47', comercio: 'TIENDAONLINE-ELEC', canal: 'Internet · sin SCA (TRA)', importe: '217,90', aut: '419112', estado: 'No reconocida', estado_after: 'Abonada' }
        ]
      },
      history_heading: 'Anexo C · Reclamaciones de tarjeta resueltas (12 meses)',
      approvals: [
        { paso: 'Expediente, análisis PSD2 y respuesta', rol: 'Agentic Platform · agente Reclamaciones de clientes', kind: 'agent' },
        { paso: 'Respuesta, abono provisional y reemisión (F3)', rol: 'Servicio de Atención al Cliente (SAC)', kind: 'reply' },
        { paso: 'Revisión del criterio PSD2 (F4)', rol: 'Responsable de Cumplimiento Normativo', kind: 'pending' },
        { paso: 'Resolución definitiva (F6)', rol: 'Servicio de Atención al Cliente (SAC)', kind: 'pending' }
      ],
      second_signer: { role: 'Responsable de Prevención del Fraude', note: 'Confirmación del origen (CPP-2609-07) · pendiente' }
    },
    presenter: {
      running: 'Mientras corre: señalar la línea de Redsys (exención del adquirente, sin SCA) y la de ServiceNow (la tarjeta está en el punto de compromiso CPP-2609-07). Si hace falta, «Acelerar».',
      idle: [
        'Correo de una clienta, Lucía Ferrer Gil: tres cargos de 612,40 € en total que no reconoce, en una tienda online, el sábado por la noche. Tiene la tarjeta, la bloqueó el domingo y el 1 de octubre le pasan la hipoteca.',
        'PSD2 obliga a devolver el importe antes del fin del día hábil siguiente: hoy. En producción, Agentic Platform lo analiza en cuanto entra en el buzón del SAC. Aquí lo lanzamos a mano para ver qué consulta.'
      ],
      pending: [
        'Lo resaltado en el correo es lo que Agentic Platform ha extraído. Cada dato se comprueba: la clienta en Salesforce, la tarjeta y los cargos en T24, las autorizaciones en Redsys.',
        'El dato clave para el abono: las tres compras se autorizaron sin autenticación reforzada, porque el adquirente pidió la exención de bajo riesgo. Sin SCA, la clienta no soporta pérdidas: franquicia cero.',
        'El dato que cambia la investigación: la tarjeta pasó el 14/09 por la gasolinera del punto de compromiso CPP-2609-07, el que ha abierto Fraude. Es una hipótesis de origen, no hace falta para abonar.',
        'Histórico: dos reclamaciones iguales en tres meses, abonadas y con contracargo al adquirente. El expediente propone revisar esas exenciones con Fraude.',
        'La respuesta confirma abono, anulación y plazos legales y no revela datos de la investigación. No sale nada, ni el abono, hasta que el SAC lo aprueba.'
      ],
      approved: [
        'Aprobada: respuesta enviada, 612,40 € abonados con fecha valor 26/09, tarjeta reemitida y contracargo presentado. El recibo de la hipoteca queda cubierto. Todo queda en el registro de auditoría.',
        'La comparación de abajo: hoy, 3–4 áreas y 6 sistemas, y a menudo el abono sale al día siguiente; aquí, una revisión y una aprobación dentro de plazo.',
        'El expediente se descarga como documento controlado, con el análisis PSD2, la traza de las operaciones y las aprobaciones.'
      ],
      next: {
        idle: 'Pulsar «Analizar reclamación» y leer en voz alta dos líneas del registro: Redsys (sin SCA) y ServiceNow (punto de compromiso).',
        pending: 'Pulsar «Revisar y aprobar» (arriba) o bajar hasta la respuesta y pulsar «Aprobar, abonar y enviar». Opcional: «Corregir» el comercio con uno inexistente para enseñar que no inventa datos.',
        approved: 'Pulsar «Descargar expediente SAC» y enseñar el análisis PSD2. Después, pasar a «Simulacro» para el punto de compromiso CPP-2609-07.'
      }
    }
  }
});
