/* Cervecera Bardenas · reclamación REC-2026-0093 (barriles de Bardenas Lager con sabor oxidado, lote L2608-K14).
 * Empresa, clientes y personas ficticios; datos sintéticos de demostración (MFM). */
agenticPack('cerveceria', {
  reclamacion: {
    code: 'REC-2026-0093',
    nav: 'Reclamación REC-2026-0093',
    title: 'Reclamación REC-2026-0093',
    agent: 'Reclamaciones de cliente',
    nc: 'NC-2026-0141',
    form: { code: 'REG-CAL-006-03', rev: '3' },
    received: { date: '2026-09-28', time: '12:06' },
    due: '2026-09-30',
    holidays: ['2026-10-12'],
    customer_line: 'Distribuciones Hosteleras Ribera (Tudela) · 3 bares',
    due_line: 'Respuesta antes del 30/09 a las 12:06 · 8D antes del 13/10/2026',
    cust_name: 'Marisa Garbayo · Distribuciones Hosteleras Ribera',
    cust_addr: 'calidad@dhribera.example',
    own_name: 'Calidad · Cervecera Bardenas',
    own_addr: 'calidad@cerveceriabardenas.example',
    mail_domain: 'cerveceriabardenas.example',
    mail_sub: 'calidad@dhribera.example · buzón calidad@cerveceriabardenas.example · español',
    mail_tab_label: 'Correo del distribuidor',
    attachments: ['avisos_bares_INC-DHR-26-047.pdf', 'foto_etiqueta_barril_K14.jpg', 'parte_cata_almacen_DHR.pdf'],
    email_text: [
      'From: Marisa Garbayo · Distribuciones Hosteleras Ribera <calidad@dhribera.example>',
      'To: Calidad · Cervecera Bardenas <calidad@cerveceriabardenas.example>',
      'Date: lun, 28 sep 2026 12:06',
      'Subject: Reclamación - Bardenas Lager barril 30 l - sabor a cartón - lote L2608-K14 - Ref. INC-DHR-26-047',
      '',
      'Buenos días:',
      '',
      'Os escribimos porque en la última semana tres de nuestros clientes de hostelería nos han devuelto barriles de Bardenas Lager de 30 litros por mal sabor. Todos son del mismo lote, L2608-K14, con consumo preferente 18/02/2027, que os compramos en la expedición del 20/08 (albarán ALB-26-08-2211, 168 barriles).',
      '',
      'Los bares son:',
      '- Bar Plaza de los Fueros (Tudela): pinchó el barril el 24/09; los clientes dijeron que la cerveza «sabía a cartón» y lo cambiaron el mismo día.',
      '- Asador Ribera Alta (Cintruénigo): barril pinchado el 25/09, sabor rancio y apagado.',
      '- Cafetería Estación (Castejón): barril pinchado el 27/09, mismo problema; nos han pedido que no les sirvamos más de ese lote.',
      '',
      'Nuestro técnico de calidad ha catado hoy un barril sin abrir del mismo lote de nuestro almacén y también tiene ese sabor a papel o cartón húmedo, aunque más suave. No hay problemas de espuma ni de turbidez, y la presión y la temperatura de los equipos de tiraje de los tres bares están bien (los revisamos nosotros en junio). En nuestro almacén los barriles están en cámara a 8 °C.',
      '',
      'Del lote L2608-K14 hemos servido 124 barriles a 37 bares y nos quedan 44 en el almacén, que hemos apartado. Adjuntamos los avisos de los tres bares, una foto de la etiqueta de un barril y el parte de cata de nuestro técnico.',
      '',
      'Os pedimos:',
      '- respuesta y vuestra referencia en un plazo de 48 horas, como marca nuestro acuerdo;',
      '- que repongáis los 3 barriles devueltos y los 44 que tenemos apartados con cerveza de otro lote, y que recojáis los del lote L2608-K14;',
      '- el abono de los barriles afectados y de los portes;',
      '- que nos digáis qué ha pasado y si el resto de barriles de ese lote que tienen nuestros bares están bien, porque es temporada de fiestas y no podemos tener a los clientes sin cerveza.',
      '',
      'Un saludo,',
      '',
      'Marisa Garbayo',
      'Responsable de calidad',
      'Distribuciones Hosteleras Ribera, S.L. · Tudela',
      'Tel. 948 000 093'
    ].join('\n'),
    mail_extra: {
      label: 'Parte de cata del distribuidor',
      note: 'Parte de cata que adjunta el distribuidor (PDF convertido a texto). Agentic Platform lo usa para contrastar el defecto con la cata de la muestra de retén.',
      headers: { From: 'Distribuciones Hosteleras Ribera · Calidad', Subject: 'Parte de cata · INC-DHR-26-047 · barril sin abrir del lote L2608-K14', Date: 'lun, 28 sep 2026 09:30' },
      text: [
        'PARTE DE CATA · Distribuciones Hosteleras Ribera, S.L.',
        '',
        'Producto: Bardenas Lager · barril KeyKeg 30 l',
        'Lote: L2608-K14 · consumo preferente 18/02/2027',
        'Origen de la muestra: almacén de Tudela, cámara 2 (8 °C), barril sin abrir',
        'Fecha y hora de la cata: 28/09/2026 09:30 · catador: técnico de calidad (formado en análisis sensorial)',
        '',
        'Aspecto: brillante, color dorado, espuma blanca y persistente. Conforme.',
        'Aroma: nota de papel o cartón húmedo, intensidad media; lúpulo apagado.',
        'Sabor: cartón y algo de miel; amargor plano; final corto.',
        'Carbónico: correcto.',
        '',
        'Comparación: barril de Bardenas Lager del lote L2609-K03 (otro lote, misma cámara): conforme, sin notas de cartón.',
        '',
        'Conclusión: defecto de oxidación compatible con las quejas de los bares. Se aparta el lote L2608-K14 (44 barriles) a la espera de instrucciones del fabricante.'
      ].join('\n'),
      highlights: [
        { text: 'nota de papel o cartón húmedo, intensidad media', label: 'Defecto', tone: 'crit' },
        { text: 'cámara 2 (8 °C)', label: 'Almacenamiento', tone: 'ok' },
        { text: 'del lote L2609-K03 (otro lote, misma cámara): conforme', label: 'Testigo', tone: 'ok' }
      ]
    },
    highlights: [
      { text: 'Bardenas Lager de 30 litros', label: 'Producto', tone: 'brand' },
      { text: 'L2608-K14', label: 'Lote', tone: 'brand' },
      { text: '18/02/2027', label: 'Consumo pref.', tone: 'brand' },
      { text: 'ALB-26-08-2211, 168 barriles', label: 'Albarán', tone: 'brand' },
      { text: '«sabía a cartón»', label: 'Defecto', tone: 'crit' },
      { text: 'Bar Plaza de los Fueros (Tudela)', label: 'Bar 1' },
      { text: 'Asador Ribera Alta (Cintruénigo)', label: 'Bar 2' },
      { text: 'Cafetería Estación (Castejón)', label: 'Bar 3' },
      { text: 'un barril sin abrir del mismo lote de nuestro almacén y también tiene ese sabor', label: 'Barril cerrado', tone: 'crit' },
      { text: 'En nuestro almacén los barriles están en cámara a 8 °C', label: 'Almacenamiento', tone: 'ok' },
      { text: 'hemos servido 124 barriles a 37 bares y nos quedan 44 en el almacén', label: 'Stock del cliente', tone: 'warn' },
      { text: 'en un plazo de 48 horas', label: 'Plazo' },
      { text: 'INC-DHR-26-047', label: 'Ref. cliente' }
    ],
    run: {
      title: 'Workflow «Reclamación de cliente»',
      sub: 'Se lanza al entrar una reclamación en el buzón de Calidad · PR-CAL-006 y APPCC-01',
      graph_title: 'Workflow de reclamación de cliente',
      idle_footer: 'Lee el correo, extrae y valida los datos, traza el lote del barril a la cerveza y a las materias primas y prepara el 8D y la respuesta. Nada sale sin la aprobación de Calidad.',
      nodes: [
        { id: 'correo', kind: 'trigger', label: 'Correo de cliente', sub: 'Buzón de Calidad', systems: ['Outlook'], icon: 'mail' },
        { id: 'extraccion', label: 'Extracción y validación', systems: ['Modelo de lenguaje', 'SAP S/4HANA'], icon: 'search' },
        { id: 'traza', label: 'Traza del lote', systems: ['SAP S/4HANA', 'Brewmaxx (MES)', 'LIMS LabWare', 'WMS Mecalux', 'GMAO Maximo'], icon: 'git-branch' },
        { id: 'historico', label: 'Histórico, 8D y respuesta', systems: ['SAP S/4HANA', 'Procedimientos'], icon: 'clipboard' },
        { id: 'aprobacion', kind: 'approval', label: 'Aprobación de Calidad', sub: 'Responsable de Calidad' },
        { id: 'salida', kind: 'output', label: 'Respuesta y contención', systems: ['Outlook', 'WMS Mecalux', 'SAP S/4HANA'], icon: 'send' }
      ],
      edges: [['correo', 'extraccion'], ['extraccion', 'traza'], ['traza', 'historico'], ['historico', 'aprobacion'], { from: 'aprobacion', to: 'salida', label: 'aprobado' }],
      graph_at: { 0: { correo: 'done', extraccion: 'active' }, 2: { extraccion: 'done', traza: 'active' }, 9: { traza: 'done', historico: 'active' }, 14: { historico: 'done', aprobacion: 'waiting' } },
      stats: [
        { label: 'Barriles del lote · 912 expedidos a 14 clientes, 96 en CB-03 y 32 retenidos', value: '1.040' },
        { label: 'O₂ disuelto al llenar en LLB-1 · especificación ≤ 50 ppb', value: '64 ppb', tone: 'warn' },
        { label: 'Reclamaciones parecidas · REC-2025-0217', value: 2, tone: 'warn' },
        { label: 'Días hábiles para responder · vence el 30/09/2026 12:06', due: true }
      ]
    },
    steps: [
      { system: 'Outlook', action: 'Lee el correo de calidad@dhribera.example en el buzón calidad@cerveceriabardenas.example (28/09/2026 12:06)', result: 'Reclamación de cliente en español · 3 adjuntos (avisos de los bares, foto de la etiqueta y parte de cata)', ms: 320 },
      { system: 'Modelo de lenguaje', action: 'Extrae los datos de la reclamación', result: 'Bardenas Lager barril 30 l · lote L2608-K14 · sabor a cartón (oxidación) en 3 bares y en un barril cerrado · 124 barriles en 37 bares y 44 en su almacén · ref. INC-DHR-26-047 · respuesta en 48 h', ms: 2900 },
      { system: 'SAP S/4HANA', action: 'Valida el cliente, el lote y la expedición', result: 'Distribuciones Hosteleras Ribera, S.L. (Tudela) · lote L2608-K14 de Bardenas Lager en barril de 30 l · 168 barriles expedidos el 20/08/2026 con ALB-26-08-2211 · coincide con el correo', ms: 410, tone: 'ok' },
      { system: 'Brewmaxx (MES)', action: 'Elaboración de la cerveza del lote', result: 'Lote de fermentación L2607-FV05: 4 cocimientos el 21/07 (malta MAL-2607-05, lúpulo LUP-2606-11) · fermentación a 12 °C y guarda a 0 °C · filtración a BBT-2 el 14/08 con O₂ de 22 ppb', ms: 380, tone: 'ok' },
      { system: 'Brewmaxx (MES)', action: 'Envasado en barril del 18/08/2026', result: 'LLB-1 · orden OE-2608-118 · 1.040 barriles con CO₂ CO2-2608-02 · O₂ disuelto medio 64 ppb (especificación ≤ 50 ppb), cabezal 3 a 91 ppb', ms: 350, tone: 'warn' },
      { system: 'LIMS LabWare', action: 'Liberación y análisis del lote', result: 'Liberado con la desviación DES-2026-0077 (O₂ fuera de especificación, cata conforme el 18/08) · cata de la muestra de retén el 28/09: cartón (trans-2-nonenal) 3 sobre 5 · microbiología conforme', ms: 520, tone: 'warn' },
      { system: 'LIMS LabWare', action: 'Compara con la botella de la misma cerveza', result: 'L2608-B21 (misma cerveza L2607-FV05, línea de botella LB-1): O₂ 35 ppb y cata del 28/09 conforme · apunta al llenado en barril, no a la cerveza', ms: 430, tone: 'ok' },
      { system: 'GMAO Maximo', action: 'Órdenes en la llenadora de barriles LLB-1', result: 'OT-2026-05210 · preventivo de juntas y válvula de purga de los cabezales de LLB-1, planificado el 15/08 y aplazado al 06/10 · lectura de hoy: 78 ppb en el cabezal 3 (NC-2026-0142)', ms: 460, tone: 'warn' },
      { system: 'WMS Mecalux', action: 'Dónde está el resto del lote', result: '1.040 barriles: 912 expedidos a 14 clientes entre el 20/08 y el 02/09 · 96 en la cámara CB-03, sin bloquear · 32 retenidos por Calidad (RET-Q)', ms: 390 },
      { system: 'SAP S/4HANA', action: 'Clientes del lote y otras reclamaciones', result: '14 clientes en Navarra, La Rioja y Aragón · Distribuciones Hosteleras Ribera es el mayor (168 barriles) · ninguna otra reclamación del lote por ahora', ms: 540, tone: 'ok' },
      { system: 'SAP S/4HANA', action: 'Busca reclamaciones parecidas en los últimos 12 meses', result: '6 reclamaciones con NC · 2 parecidas: REC-2025-0217 (sabor oxidado en barril, O₂ alto en LLB-1) y REC-2026-0041', ms: 380, tone: 'warn' },
      { system: 'Procedimientos', action: 'Consulta PR-CAL-006, APPCC-01 y PR-ENV-002', result: 'La oxidación es un defecto de calidad, no un peligro para la salud (APPCC-01) · PR-CAL-006: retirada comercial voluntaria a valorar · respuesta en 48 h y 8D en 10 días laborables: antes del 13/10/2026', ms: 360 },
      { system: 'Modelo de lenguaje', action: 'Redacta el borrador 8D (D1–D8) con responsables por rol y fechas', result: 'Borrador completo · la relación con el O₂ del llenado queda como hipótesis por confirmar con el análisis de los barriles devueltos', ms: 5200 },
      { system: 'SAP S/4HANA', action: 'Registra la no conformidad y la vincula a la reclamación', result: 'NC-2026-0141 abierta en borrador (aviso Q2) · vinculada a REC-2026-0093, DES-2026-0077 y NC-2026-0142', ms: 300, tone: 'ok' },
      { system: 'Modelo de lenguaje', action: 'Redacta la respuesta al distribuidor y el resumen para quien aprueba', result: 'Borrador listo: acuse, referencia NC-2026-0141, reposición mañana con otro lote, recogida, abono y fecha del 8D · pendiente de aprobación', ms: 3100, tone: 'warn' }
    ],
    lot: {
      code: 'L2608-K14',
      noun: 'lote',
      label: 'Código de lote',
      systems: 'SAP S/4HANA, Brewmaxx y WMS Mecalux',
      systems_short: 'SAP y Brewmaxx',
      fix_text: 'Si el distribuidor ha copiado mal el lote, escribe el correcto. Agentic Platform lo busca en SAP y Brewmaxx y comprueba que es de Bardenas Lager en barril y que se le expidió antes de cambiar nada.',
      same_body: 'Existe en SAP: Bardenas Lager en barril de 30 l, envasado el 18/08/2026 en LLB-1; 168 barriles expedidos a Distribuciones Hosteleras Ribera. Sin cambios.',
      unknown_hint: 'Si el código es dudoso, compáralo con la foto de la etiqueta del barril que adjunta el distribuidor.',
      mismatch_body: 'El código existe en los sistemas, pero no es un lote de barril expedido a este cliente: no se cambia la ficha.',
      known: {
        'L2607-FV05': { kind: 'mismatch', title: 'L2607-FV05 es el lote de fermentación, no el lote del barril', body: 'Es la cerveza con la que se llenó L2608-K14 (y también la botella L2608-B21). La reclamación se registra por el lote del barril que figura en la etiqueta. No se cambia la ficha.' },
        'L2608-B21': { kind: 'same-product', title: 'L2608-B21 es la misma cerveza en botella', body: 'Existe en SAP: Bardenas Lager en botella de 33 cl de la misma fermentación, con cata conforme. El distribuidor reclama barriles: para cambiar el lote, confírmalo con él (foto de la etiqueta). No se cambia la ficha.' },
        'L2609-K03': { kind: 'mismatch', title: 'L2609-K03 es el lote que el distribuidor usa como testigo', body: 'Existe en SAP y su cata es conforme según el propio distribuidor. No es el lote reclamado. No se cambia la ficha.' }
      }
    },
    sheet: {
      sub: 'Datos extraídos del correo y comprobados en SAP, Brewmaxx y LIMS',
      empty_text: 'Agentic Platform extraerá del correo el producto, el lote, el defecto, los bares, el stock del cliente y el plazo, y los comprobará en SAP y Brewmaxx antes de preparar el 8D y la respuesta.',
      rows: [
        { k: 'Referencia', v: 'INC-DHR-26-047', code: true, sub: 'Referencia del distribuidor · reclamación REC-2026-0093' },
        { k: 'Cliente', v: 'Distribuciones Hosteleras Ribera, S.L. (Tudela)', sub: 'Distribuidor de hostelería · bares afectados en Tudela, Cintruénigo y Castejón' },
        { k: 'Producto', v: 'Bardenas Lager · barril KeyKeg de 30 l', ok: 'Coincide con el lote en SAP' },
        { k: 'Lote', lot: true, ok: 'Existe en SAP · envasado el 18/08/2026 en LLB-1 · cerveza L2607-FV05' },
        { k: 'Consumo preferente', v: '18/02/2027', ok: 'Coincide con SAP' },
        { k: 'Expedición', v: 'ALB-26-08-2211 · 20/08/2026 · 168 barriles', ok: 'Coincide con SAP y WMS Mecalux' },
        { k: 'Defecto', v: 'Sabor a cartón o papel húmedo (oxidación)', sub: 'En 3 bares y en un barril cerrado del almacén del cliente · sin problemas de espuma ni turbidez' },
        { k: 'Riesgo', v: 'Defecto de calidad, sin riesgo para la salud', sub: 'APPCC-01 · microbiología del lote conforme' },
        { k: 'Stock del cliente', v: '124 barriles en 37 bares · 44 apartados en su almacén (8 °C)' },
        { k: 'Evidencias', v: 'Avisos de 3 bares · foto de la etiqueta · parte de cata con testigo de otro lote' },
        { k: 'Plazos', v: 'Respuesta antes del 30/09 a las 12:06 · 8D antes del 13/10/2026', due: true, sub: '48 h según el acuerdo con el cliente · 8D en 10 días laborables (12/10 festivo) · PR-CAL-006' },
        { k: 'Registro', v: 'NC-2026-0141', code: true, sub: 'No conformidad en SAP QM, vinculada a la reclamación y a DES-2026-0077' }
      ]
    },
    requests: {
      items: [
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Respuesta y referencia en 48 horas', meta: ['Respuesta al distribuidor · NC-2026-0141'], quote: 'respuesta y vuestra referencia en un plazo de 48 horas', side: { pending: { status: 'waiting', label: 'Pendiente de aprobación' }, approved: { status: 'sent', label: 'Enviado' }, rejected: { status: 'rejected', label: 'No enviado' } } },
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Reponer 47 barriles con otro lote y recoger los del K14', meta: ['D3 · reposición con L2609-K03 el 30/09'], quote: 'que repongáis los 3 barriles devueltos y los 44 que tenemos apartados con cerveza de otro lote', side: { pending: { status: 'pending', label: 'Propuesto' }, approved: { status: 'ok', label: 'Ruta del 30/09' }, rejected: { status: 'rejected', label: 'No programado' } } },
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Abono de los barriles y de los portes', meta: ['SAP SD · abono de 47 barriles y portes'], quote: 'el abono de los barriles afectados y de los portes', side: { pending: { status: 'pending', label: 'Propuesto' }, approved: { status: 'ok', label: 'Abono emitido' }, rejected: { status: 'rejected', label: 'No emitido' } } },
        { icon: 'clock', tone: 'warn', title: '¿Qué ha pasado y está bien el resto del lote?', meta: ['D4 · D3: 124 barriles en 37 bares'], quote: 'que nos digáis qué ha pasado y si el resto de barriles de ese lote que tienen nuestros bares están bien', side: { status: 'review', label: 'Hipótesis' } },
        { icon: 'calendar', tone: 'warn', title: 'Informe 8D', meta: ['PR-CAL-006 · 10 días laborables'], quote: 'no podemos tener a los clientes sin cerveza', side: { status: 'pending', label: 'Antes del 13/10' } }
      ]
    },
    trace: {
      title: 'Traza del lote L2608-K14',
      sub: 'SAP S/4HANA · Brewmaxx · LIMS LabWare · WMS Mecalux · GMAO Maximo · hacia atrás y hacia delante',
      button_code: 'L2608-K14',
      button_label: 'Traza completa · 1.040 barriles',
      back: [
        { time: '21/07', title: 'Cocimiento y fermentación · L2607-FV05', text: '4 cocimientos de 120 hl · malta MAL-2607-05 · lúpulo LUP-2606-11 · fermentación a 12 °C y guarda a 0 °C', tone: 'brand', ref: 'L2607-FV05' },
        { time: '14/08', title: 'Filtración a BBT-2', text: 'O₂ disuelto en tanque 22 ppb · conforme', tone: 'ok', ref: 'BBT-2' },
        { time: '15/08', title: 'Mantenimiento · preventivo de LLB-1 aplazado', text: 'Juntas y válvula de purga de los cabezales de la llenadora de barriles: planificado el 15/08, aplazado al 06/10.', tone: 'warn', ref: 'OT-2026-05210', chip: { status: 'open', label: 'Aplazada' } },
        { time: '18/08', timeSub: '06:00', title: 'Envasado en barril · ruta', route: ['BBT-2', 'LLB-1', 'Cabezal 3', 'Paletizado', 'CB-03'], route_mark: 'Cabezal 3', text: 'Orden OE-2608-118 · 1.040 barriles · CO₂ CO2-2608-02 · O₂ medio 64 ppb (≤ 50), cabezal 3 a 91 ppb', tone: 'warn' },
        { time: '18/08', timeSub: '15:30', title: 'Liberación con desviación', text: 'Cata conforme · O₂ fuera de especificación · liberado por Calidad', tone: 'warn', ref: 'DES-2026-0077' },
        { time: '20/08', title: 'Expedición a Distribuciones Hosteleras Ribera', text: '168 barriles a Tudela', tone: 'brand', ref: 'ALB-26-08-2211' },
        { time: '28/09', title: 'Cata de la muestra de retén', text: 'Notas de cartón (trans-2-nonenal) de intensidad 3 sobre 5 · botella L2608-B21 de la misma cerveza, conforme', tone: 'crit', ref: 'LIMS' }
      ],
      fwd_title: 'Hacia delante · barriles del lote',
      fwd_cols: { id: 'Destino', qty: 'Barriles', when: 'Fecha', status: 'Estado' },
      fwd: [
        { id: 'DHR · bares', dest: 'Distribuciones Hosteleras Ribera', sub: '37 bares (3 con quejas)', qty: 124, when: '20/08/2026', status: { status: 'evaluate', label: 'Vigilar en bares' } },
        { id: 'DHR · almacén', dest: 'Almacén de Tudela', sub: 'apartados por el cliente', qty: 44, when: '20/08/2026', status: { pending: { status: 'pending', label: 'Reposición propuesta' }, approved: { status: 'ok', label: 'Recogida el 30/09' }, rejected: { status: 'warn', label: 'Apartados' } } },
        { id: '13 clientes', dest: 'Resto de clientes', sub: 'Navarra, La Rioja y Aragón', qty: 744, when: '20/08–02/09', status: { status: 'evaluate', label: 'A evaluar (PR-CAL-006)' } },
        { id: 'CB-03', dest: 'Cámara de barriles', sub: 'disponibles para expedir', qty: 96, when: 'En stock', status: { pending: { status: 'pending', label: 'Bloqueo propuesto' }, approved: { status: 'hold', label: 'Bloqueados' }, rejected: { status: 'pending', label: 'Sin bloquear' } } },
        { id: 'RET-Q', dest: 'Retenidos por Calidad', sub: 'control de O₂', qty: 32, when: 'En stock', status: { status: 'hold', label: 'Retenidos' } }
      ],
      fwd_note: '1.040 barriles llenados (312 hl) = 912 expedidos a 14 clientes + 96 en CB-03 + 32 retenidos · consumo preferente 18/02/2027.',
      hypothesis: {
        title: 'Hipótesis de causa probable · a confirmar por Calidad y el Maestro cervecero',
        icon: 'flask',
        paras: [
          'El lote se llenó el 18/08 con 64 ppb de oxígeno disuelto de media (especificación ≤ 50 ppb) y el cabezal 3 de LLB-1 llegó a 91 ppb; se liberó con la desviación DES-2026-0077 porque la cata de ese día era conforme. Con ese oxígeno, la oxidación (sabor a cartón por trans-2-nonenal) aparece a las pocas semanas.',
          'A favor: la muestra de retén del lote ya sabe a cartón; la botella de la misma cerveza (L2608-B21, 35 ppb) está bien; el preventivo de los cabezales de LLB-1 está aplazado desde el 15/08 y hoy el cabezal 3 vuelve a dar 78 ppb. Por aclarar: si afecta solo a los barriles del cabezal 3 o a todo el lote, y el almacenamiento en los bares.',
          'Se confirma con el análisis de O₂ y la cata de los barriles devueltos y de una muestra de CB-03 por cabezal. Hasta entonces no se comunica la causa al cliente y la retirada comercial del lote se valora según PR-CAL-006.'
        ]
      }
    },
    history: {
      sub: 'SAP QM · últimos 12 meses',
      rows: [
        { id: 'REC-2025-0217', date: '2025-10-14', product: 'Bardenas Lager barril 30 l', lot: 'L2509-K07', description: 'Sabor oxidado en barriles de un distribuidor', category: 'Sabor', customer_label: 'Bebidas Ebro Distribución', root_cause: 'O₂ alto en LLB-1 por una junta de la válvula de purga desgastada', nc: 'NC-2025-0188', status: 'cerrada', similar: true },
        { id: 'REC-2026-0041', date: '2026-04-22', product: 'Bardenas Tostada barril 20 l', lot: 'L2604-K02', description: 'Sabor apagado y rancio', category: 'Sabor', customer_label: 'Grupo Bares Plaza', root_cause: 'Barriles almacenados al sol en el patio del cliente durante semanas', nc: 'NC-2026-0064', status: 'cerrada', similar: true },
        { id: 'REC-2026-0077', date: '2026-07-30', product: 'Bardenas Sin botella 33 cl', lot: 'L2607-B09', description: 'Botellas con nivel de llenado bajo', category: 'Envase', customer_label: 'Comercial Rioja Baja', root_cause: 'Ajuste de la válvula de llenado de la llenadora de botellas', nc: 'NC-2026-0119', status: 'cerrada', similar: false },
        { id: 'REC-2026-0058', date: '2026-06-03', product: 'Bardenas Lager botella 33 cl', lot: 'L2605-B14', description: 'Fragmento de vidrio en el cuello de una botella', category: 'Cuerpo extraño', customer_label: 'Hotel Tres Reyes', root_cause: 'Botella astillada en el transporte del proveedor de vidrio; inspector de botellas vacías reajustado', nc: 'NC-2026-0091', status: 'cerrada', similar: false },
        { id: 'REC-2026-0012', date: '2026-01-19', product: 'Bardenas Lager barril 30 l', lot: 'L2601-K05', description: 'Exceso de espuma en el tiraje', category: 'Servicio', customer_label: 'Cervecería El Tubo', root_cause: 'Presión del equipo de tiraje del bar mal regulada', nc: 'NC-2026-0015', status: 'cerrada', similar: false },
        { id: 'REC-2025-0233', date: '2025-11-05', product: 'Bardenas Tostada botella 33 cl', lot: 'L2510-B03', description: 'Etiqueta sin el código de lote', category: 'Etiquetado', customer_label: 'Northgate Beverages (UK)', root_cause: 'Fallo del codificador de la línea de botella', nc: 'NC-2025-0201', status: 'cerrada', similar: false }
      ],
      note: {
        title: 'Mismo tipo de causa que REC-2025-0217',
        body: 'En octubre de 2025, un sabor oxidado en barril se debió a una junta desgastada de la válvula de purga de LLB-1 que dejaba entrar oxígeno en el llenado. Si se confirma la hipótesis, sería la segunda vez en un año por la misma llenadora: el 8D propone en D7 no liberar lotes de barril con O₂ por encima de especificación y no aplazar el preventivo de los cabezales.'
      }
    },
    plan: {
      title: 'Borrador 8D · NC-2026-0141',
      sub: 'PR-CAL-006 · al distribuidor antes del 13/10/2026 con D1–D5; D6–D8 en seguimiento',
      col_label: 'Disciplina',
      containment_status: { pending: { text: 'Pendiente de aprobación', tone: 'warn' }, approved: { text: 'Aplicada', tone: 'ok' }, rejected: { text: 'No aplicada', tone: 'neutral' } },
      rows: [
        { d: 'D1', title: 'Equipo', owner: ['Responsable de Calidad'], date: '2026-09-29', status: { text: 'Propuesto', tone: 'draft' }, lead: 'Líder: Responsable de Calidad.', items: ['Técnico de Calidad de turno: análisis de O₂ y cata de los barriles devueltos y del almacén', 'Maestro cervecero: valoración sensorial y del proceso de envasado', 'Jefe de mantenimiento: LLB-1, cabezal 3 y OT-2026-05210', 'Responsable de logística: reposición, recogida y bloqueo en CB-03', 'Atención al cliente: contacto con el distribuidor y los bares'], note: 'Contacto externo: Marisa Garbayo (Distribuciones Hosteleras Ribera).' },
        { d: 'D2', title: 'Descripción del problema', owner: ['Técnico de Calidad de turno'], date: '2026-09-29', status: { text: 'Completo', tone: 'ok' }, lead: 'Sabor a cartón (oxidación) en barriles de 30 l de Bardenas Lager del lote L2608-K14 en tres bares de Distribuciones Hosteleras Ribera y en un barril cerrado de su almacén. Sin riesgo para la salud.', items: ['Lote L2608-K14, consumo preferente 18/02/2027, envasado el 18/08/2026 en LLB-1 con cerveza L2607-FV05: 1.040 barriles (312 hl)', 'Barriles pinchados el 24, 25 y 27/09; reclamación recibida el 28/09/2026 a las 12:06', 'Muestra de retén con cartón 3 sobre 5; botella de la misma cerveza conforme', 'Evidencias: avisos de los bares, foto de la etiqueta y parte de cata con testigo de otro lote'] },
        { d: 'D3', title: 'Contención', owner: ['Responsable de Calidad', 'Responsable de logística'], date: '2026-09-30', containment: true, items: ['Bloquear en WMS Mecalux y SAP QM los 96 barriles del lote en CB-03', 'Reponer el 30/09 los 3 barriles devueltos y los 44 apartados por el distribuidor con Bardenas Lager del lote L2609-K03 y recoger los del lote L2608-K14', 'Abono de 47 barriles y de los portes al distribuidor', 'Analizar O₂ y catar los barriles recogidos y una muestra de CB-03 de cada cabezal', 'Valorar con el Maestro cervecero la retirada comercial de los 744 barriles de los otros 13 clientes y de los 124 de los bares de Ribera (PR-CAL-006)'] },
        { d: 'D4', title: 'Causa raíz', owner: ['Responsable de Calidad', 'Maestro cervecero'], date: '2026-10-02', status: { text: 'Hipótesis', tone: 'warn' }, lead: 'Hipótesis principal, a confirmar: entrada de oxígeno en el llenado por el cabezal 3 de LLB-1 (91 ppb el 18/08; 78 ppb hoy), con el preventivo de juntas y válvula de purga aplazado (OT-2026-05210).', items: ['A favor: O₂ medio del lote 64 ppb frente a ≤ 50; retén con cartón; botella de la misma cerveza conforme; misma causa que REC-2025-0217', 'Por aclarar: si todos los barriles del lote están afectados o solo los del cabezal 3; almacenamiento en los bares', 'Verificación: O₂ y cata por cabezal en los barriles recogidos y en CB-03, inspección de juntas y válvula de purga y 5 porqués'] },
        { d: 'D5', title: 'Acciones correctivas', owner: ['Jefe de mantenimiento'], date: '2026-10-02', status: { text: 'Planificado', tone: 'info' }, items: ['Adelantar OT-2026-05210: cambio de juntas y de la válvula de purga del cabezal 3 de LLB-1', 'No llenar barriles con el cabezal 3 hasta verificar O₂ ≤ 50 ppb en 3 llenados seguidos'] },
        { d: 'D6', title: 'Implantación y eficacia', owner: ['Técnico de Calidad de turno'], date: '2026-10-16', status: { text: 'Planificado', tone: 'info' }, items: ['O₂ ≤ 50 ppb en todos los cabezales de LLB-1 durante 10 turnos seguidos', 'Cata a las 4 semanas de 3 lotes de barril sin notas de cartón'] },
        { d: 'D7', title: 'Prevención de la recurrencia', owner: ['Responsable de Calidad'], date: '2026-10-23', status: { text: 'Planificado', tone: 'info' }, items: ['Revisar PR-CAL-006: no liberar lotes de barril con O₂ fuera de especificación aunque la cata sea conforme (la oxidación aparece semanas después)', 'No permitir aplazar el preventivo de cabezales de LLB-1 más de 15 días (segunda vez en un año)', 'Aviso automático cuando un cabezal supere 50 ppb en dos llenados seguidos'] },
        { d: 'D8', title: 'Cierre y reconocimiento', owner: ['Responsable de Calidad'], date: '2026-10-30', status: { text: 'Planificado', tone: 'info' }, items: ['Informe final a Distribuciones Hosteleras Ribera y cierre de NC-2026-0141 con la evidencia de eficacia', 'Reconocimiento al equipo'] }
      ]
    },
    reply: {
      to_label: 'al distribuidor',
      subject: 'RE: Reclamación - Bardenas Lager barril 30 l - sabor a cartón - lote L2608-K14 - Ref. INC-DHR-26-047 - Ref. Bardenas NC-2026-0141',
      sub: 'Para calidad@dhribera.example · en español',
      tab_label: 'Se envía',
      text: [
        'Hola, Marisa:',
        '',
        'Gracias por vuestro correo del 28 de septiembre y por el parte de cata, que nos ayuda mucho. Confirmamos la recepción de la reclamación INC-DHR-26-047 por el sabor a cartón en barriles de 30 l de Bardenas Lager del lote L2608-K14. Sentimos las molestias a vosotros y a vuestros clientes de hostelería.',
        '',
        'Nuestra referencia es NC-2026-0141. Se trata de un defecto de calidad del sabor que no supone ningún riesgo para la salud.',
        '',
        'Lo que hemos hecho y lo que vamos a hacer:',
        '- Hemos bloqueado en nuestro almacén los barriles de ese lote que aún no habían salido.',
        '- Mañana, 30 de septiembre, nuestro camión de la ruta de la Ribera os llevará 47 barriles de Bardenas Lager de otro lote para reponer los 3 devueltos y los 44 que tenéis apartados, y recogerá los del lote L2608-K14. Si os viene mejor otro horario, decídnoslo hoy.',
        '- Os emitiremos el abono de los 47 barriles y de los portes en cuanto los recojamos.',
        '- Vamos a analizar en nuestro laboratorio los barriles que recojamos.',
        '',
        'Sobre los barriles del lote que tienen vuestros bares: os pedimos que, si algún bar nota el mismo sabor, nos lo digáis y lo repondremos en 24 horas. Os confirmaremos en los próximos días si conviene sustituir el resto de forma preventiva.',
        '',
        'Os enviaremos el informe 8D con la causa raíz y las acciones correctivas y preventivas a más tardar el 13 de octubre de 2026.',
        '',
        'Un saludo,',
        '',
        'Departamento de Calidad',
        'Cervecera Bardenas, S.A. · Fábrica de Arguedas',
        'calidad@cerveceriabardenas.example'
      ].join('\n'),
      highlights: [
        { text: 'NC-2026-0141', label: 'Referencia', tone: 'brand' },
        { text: 'no supone ningún riesgo para la salud', label: 'Riesgo', tone: 'brand' },
        { text: 'Hemos bloqueado en nuestro almacén los barriles de ese lote', label: 'Contención', tone: 'brand' },
        { text: 'os llevará 47 barriles de Bardenas Lager de otro lote', label: 'Reposición', tone: 'brand' },
        { text: 'a más tardar el 13 de octubre de 2026', label: 'Compromiso', tone: 'brand' }
      ],
      criterion: 'Criterio de redacción: confirma hechos de SAP y WMS, aclara que no hay riesgo para la salud y compromete reposición, abono y fechas; no adelanta la causa (la relación con el O₂ del llenado no está confirmada) ni anuncia una retirada del lote.',
      control: {
        label: 'Resumen para quien aprueba',
        note: 'Resumen interno que acompaña a la aprobación; no se envía al distribuidor.',
        edited_note: 'El resumen corresponde al borrador de Agentic Platform; la versión editada incluye cambios de Calidad en el texto que se envía.',
        subject: 'Resumen interno · REC-2026-0093 · NC-2026-0141',
        text: [
          'Qué se aprueba:',
          '1. Enviar la respuesta al distribuidor (vence el 30/09 a las 12:06).',
          '2. Bloqueo en WMS Mecalux y SAP QM de 96 barriles del lote L2608-K14 en CB-03 (hoy disponibles para expedir).',
          '3. Pedido de reposición de 47 barriles del lote L2609-K03 en la ruta de la Ribera del 30/09 y recogida de los del K14.',
          '4. Abono de 47 barriles y portes a Distribuciones Hosteleras Ribera.',
          '',
          'Lo que la respuesta NO dice, a propósito:',
          '- No da una causa: el O₂ del llenado (64 ppb, liberado con DES-2026-0077) es la hipótesis principal, falta analizar los barriles.',
          '- No anuncia una retirada: la retirada comercial de los 868 barriles en clientes se valora con el Maestro cervecero (PR-CAL-006) en «Simulacro de retirada».',
          '',
          'Riesgo si no se aprueba hoy: se incumple el plazo de 48 h del acuerdo y los 96 barriles de CB-03 pueden salir en las rutas de esta semana (fiestas en la Ribera).'
        ].join('\n')
      }
    },
    approval: {
      title: 'Respuesta a Distribuciones Hosteleras Ribera y contención',
      approver: 'Responsable de Calidad',
      policy: 'PR-CAL-006 · APPCC-01',
      summary: {
        pending: 'Agentic Platform ha preparado la respuesta para calidad@dhribera.example, la reposición y recogida de 47 barriles, el abono y el bloqueo de los barriles del lote que siguen en fábrica. No se envía ni se bloquea nada hasta que Calidad lo apruebe.',
        approved: 'Calidad ha aprobado la respuesta y la contención. Agentic Platform ha enviado el correo al distribuidor, ha bloqueado 96 barriles en CB-03, ha creado la reposición y el abono y ha actualizado NC-2026-0141.',
        rejected: 'Calidad ha rechazado la propuesta: no se ha enviado la respuesta, ni se ha bloqueado ningún barril, ni se ha programado la reposición.'
      },
      scope: [
        { label: 'Respuesta al distribuidor', state: { pending: { status: 'pending', chip: 'Enviar' }, approved: { status: 'sent', chip: 'Enviada' }, rejected: { status: 'rejected', chip: 'No enviada' } } },
        { label: 'Barriles en CB-03', value: '96 barriles · L2608-K14', state: { pending: { status: 'pending', chip: 'Bloquear' }, approved: { status: 'hold', chip: 'Bloqueados' }, rejected: { status: 'rejected', chip: 'Sin bloquear' } } },
        { label: 'Reposición y recogida', value: '47 barriles · L2609-K03 · 30/09', state: { pending: { status: 'pending', chip: 'Programar' }, approved: { status: 'ok', chip: 'Programada' }, rejected: { status: 'rejected', chip: 'No programada' } } },
        { label: 'Abono al distribuidor', value: '47 barriles y portes', state: { pending: { status: 'pending', chip: 'Emitir' }, approved: { status: 'ok', chip: 'Emitido' }, rejected: { status: 'rejected', chip: 'No emitido' } } },
        { label: 'Barriles en otros clientes', value: '868 barriles · 14 clientes', state: { status: 'evaluate', chip: 'Según PR-CAL-006' } }
      ],
      effects: [
        'Outlook: respuesta enviada desde calidad@cerveceriabardenas.example',
        'WMS Mecalux y SAP QM: bloqueo de calidad de 96 barriles del lote L2608-K14 en CB-03',
        'SAP S/4HANA (SD): pedido de reposición de 47 barriles, orden de recogida y abono al distribuidor',
        'SAP S/4HANA (QM): NC-2026-0141 pasa a «En curso» con la respuesta adjunta'
      ],
      next_step: 'Siguiente paso: analizar O₂ y catar los barriles recogidos el 30/09 (D4), valorar la retirada comercial con el Maestro cervecero y enviar el 8D antes del 13/10/2026.',
      toast_approved: 'Respuesta enviada a Distribuciones Hosteleras Ribera · 96 barriles bloqueados y reposición programada',
      reject_text: 'No se envía la respuesta, ni se bloquea ningún barril, ni se programa la reposición. El motivo queda en el registro de auditoría.',
      reject_placeholder: 'Por ejemplo: esperar a la cata del Maestro cervecero antes de responder',
      reject_audit: 'no se envía ni se bloquea nada',
      toast_rejected: 'Respuesta rechazada: no se ha enviado nada ni se ha bloqueado ningún barril'
    },
    compare: {
      rows: [
        { k: 'Personas que intervienen', hoy: '4: Calidad, Maestro cervecero, logística y atención al cliente', pro_strong: '1', pro: ': Calidad revisa, corrige si hace falta y aprueba' },
        { k: 'Sistemas que hay que abrir', hoy: '6: Outlook, SAP, Brewmaxx, LIMS, WMS y Maximo', pro_strong: '1', pro: ': esta consola; Agentic Platform consulta los 6' }
      ],
      steps_today: '12–15 búsquedas, cruces y redacciones a mano',
      time_label: 'Traza, 8D en borrador y respuesta',
      time_today: '2–5 h de trabajo, repartidas en 1–2 días',
      footer: 'Criterio de aceptación propuesto para el piloto: traza y borrador en menos de 15 minutos, el 100 % de las respuestas dentro de las 48 h y Calidad acepta el borrador con ediciones menores en al menos el 70 % de los casos.'
    },
    audit: {
      requested: { action: 'Análisis de reclamación solicitado', detail: 'REC-2026-0093 · correo de calidad@dhribera.example del 28/09/2026 12:06' },
      analyzed: { action: 'Reclamación analizada', detail: 'REC-2026-0093 · lote L2608-K14 · Bardenas Lager barril 30 l' },
      after_analysis: [
        { action: 'No conformidad registrada en borrador', detail: 'NC-2026-0141 · SAP QM · vinculada a REC-2026-0093, DES-2026-0077 y NC-2026-0142' },
        { action: 'Borrador 8D preparado', detail: 'NC-2026-0141 · D1–D8 · O₂ del llenado como hipótesis' },
        { action: 'Respuesta al cliente redactada', detail: 'REC-2026-0093 · español · versión 1 · pendiente de aprobación' }
      ],
      approved: { action: 'Respuesta aprobada y enviada', detail: 'REC-2026-0093 · a calidad@dhribera.example · NC-2026-0141' },
      after_approval: [
        { action: 'Bloqueo de calidad aplicado', detail: 'WMS Mecalux y SAP QM · 96 barriles del lote L2608-K14 en CB-03' },
        { action: 'Reposición y recogida programadas', detail: 'SAP SD · 47 barriles del lote L2609-K03 · ruta de la Ribera del 30/09' },
        { action: 'Abono emitido', detail: 'SAP SD · 47 barriles y portes · Distribuciones Hosteleras Ribera' },
        { action: 'No conformidad actualizada', detail: 'NC-2026-0141 · En curso · respuesta adjunta' }
      ]
    },
    outcome_label: 'Respuesta enviada · NC-2026-0141 en curso',
    toast_analyzed: 'Reclamación analizada · 8D y respuesta en borrador',
    report: {
      button: 'Descargar informe 8D',
      title: 'Informe 8D · reclamación REC-2026-0093',
      subtitle: 'Sabor a cartón (oxidación) en Bardenas Lager barril 30 l · lote L2608-K14 · Distribuciones Hosteleras Ribera',
      filename: 'informe-8D-NC-2026-0141-REC-2026-0093',
      meta: [['Fábrica', 'Arguedas'], ['Reclamación', 'REC-2026-0093 · 28/09/2026 · ref. cliente INC-DHR-26-047'], ['Lote', 'L2608-K14 · LLB-1 · 18/08/2026'], ['Informe al cliente', 'antes del 13/10/2026']],
      state: { pending: 'Borrador · pendiente de aprobación', approved: 'Aprobado para envío · D4 abierta', rejected: 'Borrador · respuesta rechazada' },
      summary: [
        'Reclamación de Distribuciones Hosteleras Ribera, S.L. (Tudela): sabor a cartón (oxidación) en barriles de 30 l de Bardenas Lager del lote L2608-K14 en tres bares y en un barril cerrado de su almacén. Defecto de calidad, sin riesgo para la salud.',
        'El lote se envasó el 18/08/2026 en LLB-1 con cerveza del lote de fermentación L2607-FV05: 1.040 barriles, de los que 912 se expidieron a 14 clientes, 96 siguen en CB-03 y 32 están retenidos.',
        'Hipótesis de causa, pendiente de confirmar con el análisis de los barriles devueltos: entrada de oxígeno en el llenado por el cabezal 3 de LLB-1 (O₂ medio 64 ppb, cabezal 3 a 91 ppb; liberado con DES-2026-0077), con el preventivo de los cabezales aplazado.'
      ],
      trace_heading: 'Anexo A · Traza del lote',
      trace_rows: [
        { etapa: 'Malta', fecha: '14/07/2026', detalle: 'Malta Pilsen MAL-2607-05 (Maltas de Castilla) en el silo 2', ref: 'MAL-2607-05' },
        { etapa: 'Cocimiento y fermentación', fecha: '21/07/2026', detalle: '4 cocimientos de 120 hl a FV-05 · lúpulo LUP-2606-11 · 12 °C y guarda a 0 °C', ref: 'L2607-FV05' },
        { etapa: 'Filtración', fecha: '14/08/2026', detalle: 'Filtración y estabilización a BBT-2 · O₂ 22 ppb', ref: 'BBT-2' },
        { etapa: 'Mantenimiento', fecha: '15/08/2026', detalle: 'Preventivo de juntas y válvula de purga de los cabezales de LLB-1 aplazado al 06/10', ref: 'OT-2026-05210' },
        { etapa: 'Envasado', fecha: '18/08/2026 06:00', detalle: 'LLB-1 · 1.040 barriles · CO₂ CO2-2608-02 · O₂ medio 64 ppb, cabezal 3 a 91 ppb', ref: 'OE-2608-118' },
        { etapa: 'Liberación', fecha: '18/08/2026 15:30', detalle: 'Liberado con desviación: O₂ fuera de especificación, cata conforme', ref: 'DES-2026-0077' },
        { etapa: 'Expedición', fecha: '20/08/2026', detalle: '168 barriles a Distribuciones Hosteleras Ribera (Tudela)', ref: 'ALB-26-08-2211' },
        { etapa: 'Reclamación', fecha: '28/09/2026 12:06', detalle: 'Sabor a cartón en 3 bares y en un barril cerrado', ref: 'REC-2026-0093' },
        { etapa: 'Análisis', fecha: '28/09/2026', detalle: 'Muestra de retén con cartón 3/5 · botella L2608-B21 conforme', ref: 'LIMS' }
      ],
      units: {
        heading: 'Anexo B · Barriles del lote L2608-K14 por destino',
        cols: [{ label: 'Destino', key: 'dest' }, { label: 'Localidad', key: 'loc' }, { label: 'Barriles', key: 'n', num: true }, { label: 'Albarán', key: 'ref', mono: true }, { label: 'Estado', key: 'estado', status: true }],
        rows: [
          { dest: 'Distribuciones Hosteleras Ribera, S.L.', loc: 'Tudela', n: 168, ref: 'ALB-26-08-2211', estado: 'Reclamación · 44 apartados', estado_after: 'Reclamación · 47 en reposición' },
          { dest: 'Bebidas Ebro Distribución, S.L.', loc: 'Zaragoza', n: 142, ref: 'ALB-26-08-2214', estado: 'Expedido' },
          { dest: 'Distribuciones Cierzo Hostelería, S.A.', loc: 'Pamplona', n: 96, ref: 'ALB-26-08-2230', estado: 'Expedido' },
          { dest: 'Comercial Rioja Baja, S.L.', loc: 'Calahorra', n: 74, ref: 'ALB-26-08-2233', estado: 'Expedido' },
          { dest: 'Bebidas Bardenas Logroño, S.L.', loc: 'Logroño', n: 66, ref: 'ALB-26-08-2290', estado: 'Expedido' },
          { dest: 'Club Deportivo Arenas', loc: 'Logroño', n: 60, ref: 'ALB-26-08-2302', estado: 'Expedido' },
          { dest: 'Hostelería Moncayo Distribución, S.L.', loc: 'Tarazona', n: 58, ref: 'ALB-26-08-2305', estado: 'Expedido' },
          { dest: 'Grupo Bares Plaza, S.L.', loc: 'Zaragoza', n: 52, ref: 'ALB-26-08-2318', estado: 'Expedido' },
          { dest: 'Distribuciones Arga, S.L.', loc: 'Estella', n: 48, ref: 'ALB-26-08-2340', estado: 'Expedido' },
          { dest: 'Distribuidora Tudelana de Bebidas, S.L.', loc: 'Tudela', n: 40, ref: 'ALB-26-08-2342', estado: 'Expedido' },
          { dest: 'Catering Navarro, S.L.', loc: 'Pamplona', n: 36, ref: 'ALB-26-08-2361', estado: 'Expedido' },
          { dest: 'Cervecería El Tubo', loc: 'Zaragoza', n: 30, ref: 'ALB-26-08-2398', estado: 'Expedido' },
          { dest: 'Restaurantes La Ribera, S.L.', loc: 'Tudela', n: 24, ref: 'ALB-26-09-0012', estado: 'Expedido' },
          { dest: 'Hotel Tres Reyes', loc: 'Pamplona', n: 18, ref: 'ALB-26-09-0031', estado: 'Expedido' },
          { dest: 'Cámara de barriles CB-03', loc: 'Arguedas', n: 96, ref: 'WMS', estado: 'Disponible', estado_after: 'Bloqueados' },
          { dest: 'Retenidos por Calidad RET-Q', loc: 'Arguedas', n: 32, ref: 'WMS', estado: 'Retenidos' }
        ]
      },
      history_heading: 'Anexo C · Reclamaciones anteriores (12 meses)',
      approvals: [
        { paso: 'Borradores 8D y respuesta', rol: 'Agentic Platform · agente Reclamaciones de cliente', kind: 'agent' },
        { paso: 'Respuesta al cliente y contención (D3)', rol: 'Responsable de Calidad', kind: 'reply' },
        { paso: 'Confirmación de la causa raíz (D4)', rol: 'Responsable de Calidad · Maestro cervecero', kind: 'pending' },
        { paso: 'Cierre del 8D (D8)', rol: 'Responsable de Calidad', kind: 'pending' }
      ],
      second_signer: { role: 'Maestro cervecero', note: 'Valoración sensorial y de la retirada comercial (D3–D4) · pendiente' }
    },
    presenter: {
      running: 'Mientras corre: señalar la línea de Brewmaxx (64 ppb de O₂ al llenar, cabezal 3 a 91) y la de LIMS (la botella de la misma cerveza está bien). Si hace falta, «Acelerar».',
      idle: [
        'Correo de Distribuciones Hosteleras Ribera, nuestro mayor distribuidor de la Ribera: tres bares han devuelto barriles de Bardenas Lager por sabor a cartón, todos del lote L2608-K14. Llegó ayer a las 12:06 y su acuerdo pide respuesta en 48 horas.',
        'En producción, Agentic Platform lo analiza en cuanto entra en el buzón de Calidad. Aquí lo lanzamos a mano para ver qué hace y qué sistemas consulta.'
      ],
      pending: [
        'Lo resaltado en el correo es lo que Agentic Platform ha extraído. Cada dato se comprueba en SAP: el lote existe, es barril de Lager y se le expidieron 168 barriles el 20/08.',
        'La traza: de la malta y la fermentación al llenado en LLB-1 y a los 14 clientes. 912 barriles fuera, 96 en nuestra cámara sin bloquear y 32 retenidos.',
        'El dato que cambia la investigación: el lote se llenó con 64 ppb de oxígeno, por encima de especificación, y se liberó con desviación porque la cata era buena. La botella de la misma cerveza está bien. Es una hipótesis, no la causa.',
        'Histórico: en octubre de 2025 pasó lo mismo por una junta de la misma llenadora. El 8D propone no liberar barril con O₂ alto y no aplazar el preventivo.',
        'La respuesta aclara que no hay riesgo para la salud, compromete reposición, recogida y abono, y no adelanta la causa ni anuncia retirada. No sale hasta que Calidad la aprueba.'
      ],
      approved: [
        'Aprobada: respuesta enviada, 96 barriles bloqueados, reposición y recogida de 47 barriles mañana y abono emitido. Todo queda en el registro de auditoría.',
        'La comparación de abajo: hoy, 4 personas y 6 sistemas durante horas; aquí, una revisión y una aprobación dentro de las 48 h.',
        'El informe 8D se descarga como documento controlado: código, revisión, estado, aprobaciones y número de página.'
      ],
      next: {
        pending: 'Pulsar «Revisar y aprobar» (arriba) o bajar hasta la respuesta y pulsar «Aprobar y enviar». Opcional: «Corregir» el lote con uno inexistente para enseñar que no inventa datos.',
        approved: 'Pulsar «Descargar informe 8D» y enseñar la cabecera del documento. Después, pasar a «Simulacro de retirada» para el lote L2608-K14.'
      }
    }
  }
});
