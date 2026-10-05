/* Mercados Moncayo · reclamación ATC-2026-0412 (fragmento de vidrio en tomate frito Moncayo, lote L26214).
 * Empresa, proveedores y personas ficticios; datos sintéticos de demostración (MFM). */
agenticPack('retail', {
  reclamacion: {
    code: 'ATC-2026-0412',
    nav: 'Reclamación ATC-2026-0412',
    title: 'Reclamación ATC-2026-0412',
    agent: 'Reclamaciones de consumidores',
    nc: 'INC-PRO-2026-0058',
    form: { code: 'REG-CAL-010-04', rev: '2' },
    received: { date: '2026-09-28', time: '21:37' },
    due: '2026-09-30',
    customer_line: 'Javier Lasheras (Club Moncayo) · tienda T-011 Zaragoza Delicias',
    due_line: 'Respuesta al consumidor antes del 30/09 a las 21:37 · 8D del fabricante en 10 días',
    cust_name: 'Javier Lasheras',
    cust_addr: 'javier.lasheras@correo.example',
    own_name: 'Atención al consumidor · Mercados Moncayo',
    own_addr: 'atencion.consumidor@mercadosmoncayo.example',
    mail_domain: 'mercadosmoncayo.example',
    mail_title: 'Mensaje del consumidor',
    mail_sub: 'App Mercados Moncayo · formulario «Contacta con nosotros» · buzón de Atención al consumidor',
    mail_tab_label: 'Mensaje de la app',
    attachments: ['foto_tarro_etiqueta.jpg', 'foto_fragmento_vidrio.jpg', 'foto_boca_tarro.jpg'],
    email_text: [
      'From: Javier Lasheras (app Mercados Moncayo) <javier.lasheras@correo.example>',
      'To: Atención al consumidor · Mercados Moncayo <atencion.consumidor@mercadosmoncayo.example>',
      'Date: lun, 28 sep 2026 21:37',
      'Subject: [App · Contacta con nosotros] Reclamación de producto - Cristal en tomate frito Moncayo',
      '',
      'Tarjeta Club Moncayo: 2601 0000 4418 · Tienda habitual: T-011 Zaragoza Delicias',
      'Motivo: Problema con un producto · Categoría: Seguridad alimentaria',
      '',
      'Hola:',
      '',
      'Esta noche, cenando macarrones con tomate, he notado algo duro y cortante al masticar y lo he escupido: era un trozo de cristal transparente de unos 5 mm. El tomate era un tarro de Tomate frito Moncayo 400 g que compré el sábado 26 de septiembre en vuestra tienda de Delicias (T-011), con mi tarjeta del Club. El tarro lo abrí hoy mismo; estaba bien cerrado y la tapa hizo «clac» al abrirlo.',
      '',
      'En la etiqueta pone lote L26214 y consumo preferente 08/2028. Os mando fotos de la etiqueta, del trozo de cristal y de la boca del tarro, que a simple vista no parece que esté rota.',
      '',
      'Por suerte no me he cortado y estoy bien, pero mi hija de 6 años también ha comido de ese plato y estoy bastante preocupado. Guardo el tarro con lo que queda de tomate y el trozo de cristal en una bolsa.',
      '',
      'Me gustaría que:',
      '- me digáis si tengo que hacer algo o ir al médico, por la niña;',
      '- vengáis a recoger el tarro y el cristal, o me digáis dónde llevarlos;',
      '- me devolváis el dinero del tarro;',
      '- me digáis si hay más tarros así, porque tengo otro igual en la despensa y mi madre también compra este tomate.',
      '',
      'Espero vuestra respuesta pronto.',
      '',
      'Javier Lasheras',
      'Tel. 676 000 412'
    ].join('\n'),
    mail_extra: {
      label: 'Ticket de compra (CRM Fidelización)',
      note: 'Compra asociada a la tarjeta Club del consumidor, recuperada del CRM y del TPV de la tienda. Agentic Platform la usa para comprobar la compra, la tienda y la fecha.',
      headers: { From: 'TPV T-011 Zaragoza Delicias · caja 3', Subject: 'Ticket 011-3-260926-0187 · Club Moncayo 2601 0000 4418', Date: 'sáb, 26 sep 2026 18:52' },
      text: [
        'MERCADOS MONCAYO · T-011 ZARAGOZA DELICIAS',
        'Av. de Madrid, Zaragoza · NIF A-00000412',
        '',
        'Ticket 011-3-260926-0187        26/09/2026 18:52',
        'Caja 3 · Cajera 0114',
        '',
        'MACARRONES MONCAYO 500 G           0,89',
        'TOMATE FRITO MONCAYO 400 G   2 x   1,15    2,30',
        'QUESO RALLADO MONCAYO 150 G        1,79',
        'LECHE SEMIDESNATADA 6 X 1 L        5,34',
        'PLATANO CANARIAS (1,124 KG)        2,64',
        'PAN BARRA                          0,65',
        '',
        'TOTAL (6 artículos, 7 unidades)   13,61 €',
        'Tarjeta bancaria ····0931         13,61 €',
        '',
        'Club Moncayo 2601 0000 4418 · puntos acumulados: 13',
        'Lote de tomate frito servido a la tienda: L26214 (WMS, envío 07/08/2026)'
      ].join('\n'),
      highlights: [
        { text: 'TOMATE FRITO MONCAYO 400 G   2 x   1,15', label: 'Producto · 2 uds.', tone: 'brand' },
        { text: '26/09/2026 18:52', label: 'Compra' },
        { text: 'L26214', label: 'Lote', tone: 'brand' }
      ]
    },
    highlights: [
      { text: 'trozo de cristal transparente de unos 5 mm', label: 'Defecto', tone: 'crit' },
      { text: 'Tomate frito Moncayo 400 g', label: 'Producto', tone: 'brand' },
      { text: 'sábado 26 de septiembre', label: 'Compra', tone: 'brand' },
      { text: 'Delicias (T-011)', label: 'Tienda', tone: 'brand' },
      { text: 'lote L26214', label: 'Lote', tone: 'brand' },
      { text: 'consumo preferente 08/2028', label: 'Consumo pref.', tone: 'brand' },
      { text: 'la tapa hizo «clac» al abrirlo', label: 'Cierre íntegro', tone: 'ok' },
      { text: 'no me he cortado y estoy bien', label: 'Sin lesiones', tone: 'ok' },
      { text: 'mi hija de 6 años también ha comido de ese plato', label: 'Menor expuesta', tone: 'warn' },
      { text: 'Guardo el tarro con lo que queda de tomate y el trozo de cristal', label: 'Muestra' },
      { text: 'tengo otro igual en la despensa', label: 'Más unidades', tone: 'warn' }
    ],
    run: {
      title: 'Workflow «Reclamación de consumidor»',
      sub: 'Se lanza al entrar un mensaje de seguridad alimentaria en el buzón de Atención al consumidor · PR-ATC-002',
      graph_title: 'Workflow de reclamación de consumidor',
      idle_footer: 'Lee el mensaje, extrae y valida los datos, traza el lote del fabricante a las tiendas y prepara el 8D con el fabricante y la respuesta. Nada sale ni se bloquea sin la aprobación de Calidad.',
      nodes: [
        { id: 'correo', kind: 'trigger', label: 'Mensaje de la app', sub: 'Atención al consumidor', systems: ['Outlook'], icon: 'mail' },
        { id: 'extraccion', label: 'Extracción y validación', systems: ['Modelo de lenguaje', 'CRM Fidelización', 'SAP S/4 Retail'], icon: 'search' },
        { id: 'traza', label: 'Traza del lote', systems: ['SAP S/4 Retail', 'WMS Manhattan', 'TPV tiendas', 'ServiceNow'], icon: 'git-branch' },
        { id: 'historico', label: 'Histórico, 8D y respuesta', systems: ['ServiceNow', 'Procedimientos'], icon: 'clipboard' },
        { id: 'aprobacion', kind: 'approval', label: 'Aprobación de Calidad', sub: 'Responsable de Calidad' },
        { id: 'salida', kind: 'output', label: 'Respuesta y contención', systems: ['Outlook', 'WMS Manhattan', 'TPV tiendas'], icon: 'send' }
      ],
      edges: [['correo', 'extraccion'], ['extraccion', 'traza'], ['traza', 'historico'], ['historico', 'aprobacion'], { from: 'aprobacion', to: 'salida', label: 'aprobado' }],
      graph_at: { 0: { correo: 'done', extraccion: 'active' }, 3: { extraccion: 'done', traza: 'active' }, 8: { traza: 'done', historico: 'active' }, 13: { historico: 'done', aprobacion: 'waiting' } },
      stats: [
        { label: 'Unidades del lote · 1.920 vendidas, 2.400 en lineal (41 tiendas) y 480 en plataforma', value: '4.800' },
        { label: 'Rotura de tarro en la llenadora del fabricante · 02/08', value: 'INC-PRO-2026-0049', tone: 'warn' },
        { label: 'Reclamaciones parecidas · ATC-2026-0233', value: 2, tone: 'warn' },
        { label: 'Días hábiles para responder · vence el 30/09/2026 21:37', due: true }
      ]
    },
    steps: [
      { system: 'Outlook', action: 'Lee el mensaje de la app en el buzón atencion.consumidor@mercadosmoncayo.example (28/09/2026 21:37)', result: 'Reclamación de seguridad alimentaria · 3 fotos · tarjeta Club Moncayo 2601 0000 4418', ms: 320 },
      { system: 'Modelo de lenguaje', action: 'Extrae los datos de la reclamación', result: 'Tomate frito Moncayo 400 g · lote L26214 · consumo preferente 08/2028 · fragmento de vidrio de unos 5 mm · sin lesiones · menor expuesta · compra el 26/09 en T-011 · conserva tarro y fragmento', ms: 2900 },
      { system: 'CRM Fidelización', action: 'Identifica al consumidor y la compra', result: 'Javier Lasheras, socio del Club desde 2019 · ticket 011-3-260926-0187 del 26/09/2026 18:52 en T-011: 2 tarros de Tomate frito Moncayo 400 g · coincide con el mensaje', ms: 410, tone: 'ok' },
      { system: 'SAP S/4 Retail', action: 'Valida el lote y el producto', result: 'L26214: Tomate frito Moncayo 400 g (marca propia), fabricado el 02/08/2026 por Conservas del Jalón, S.L. (Épila) · consumo preferente 08/2028 · coincide con la etiqueta de la foto', ms: 380, tone: 'ok' },
      { system: 'SAP S/4 Retail', action: 'Ficha del fabricante y materias primas del lote', result: 'Conservas del Jalón: homologado PR-PRO-006, IFS Food v8 nivel superior (12/2025) · tomate concentrado TOM-2607-18 · tarros de vidrio TAR-2607-55 · línea de llenado L2 con detector de vidrio por rayos X', ms: 350 },
      { system: 'WMS Manhattan', action: 'Recepción y stock del lote en la plataforma', result: 'Recibidas 4.800 unidades el 05/08/2026 (400 cajas de 12) con 14 tarros rotos en el palé 7 (REC-PLZ-26-08-0311) · 4.320 servidas a 41 tiendas · 480 en plataforma (P-12-04-2)', ms: 460, tone: 'warn' },
      { system: 'TPV tiendas', action: 'Ventas y stock del lote por tienda', result: '1.920 vendidas y 2.400 en lineal en 41 tiendas · T-011 Zaragoza Delicias: 120 recibidas, 84 vendidas, 36 en lineal', ms: 520 },
      { system: 'CRM Fidelización', action: 'Compradores del lote y otras reclamaciones', result: '612 clientes del Club compraron el lote · ninguna otra reclamación del lote en el CRM ni en tiendas', ms: 430, tone: 'ok' },
      { system: 'ServiceNow', action: 'Busca incidencias abiertas o recientes del fabricante', result: 'INC-PRO-2026-0049 (03/08): rotura de un tarro en la llenadora L2 del fabricante el 02/08 a las 11:42, durante el lote L26214 · purga de 96 tarros · cerrada · INC-PRO-2026-0059 (esta semana): 3 palés de Conservas del Jalón con tarros rotos en recepción', ms: 460, tone: 'warn' },
      { system: 'ServiceNow', action: 'Busca reclamaciones parecidas en los últimos 12 meses', result: '6 reclamaciones de marca propia con incidencia a proveedor · 2 parecidas: ATC-2026-0233 (vidrio en melocotón en almíbar) y ATC-2025-0871', ms: 540, tone: 'warn' },
      { system: 'Procedimientos', action: 'Consulta PR-ATC-002, PR-CAL-010 y PR-PRO-006', result: 'Respuesta al consumidor en 48 h: antes del 30/09 a las 21:37 · caso aislado de vidrio: bloqueo preventivo y análisis; segundo caso o confirmación: retirada y aviso a AESAN · 8D del fabricante en 10 días', ms: 380 },
      { system: 'Modelo de lenguaje', action: 'Redacta el borrador 8D con el fabricante (D1–D8) con responsables por rol y fechas', result: 'Borrador completo · la relación con la rotura del 02/08 queda como hipótesis por confirmar con el análisis del fragmento', ms: 5200 },
      { system: 'ServiceNow', action: 'Registra la incidencia al proveedor y la vincula a la reclamación', result: 'INC-PRO-2026-0058 abierta en borrador · vinculada a ATC-2026-0412 e INC-PRO-2026-0049', ms: 300, tone: 'ok' },
      { system: 'Modelo de lenguaje', action: 'Redacta la respuesta al consumidor y el resumen para quien aprueba', result: 'Borrador listo: indicaciones de salud, recogida del tarro, reembolso, retirada preventiva en su tienda y plazo · pendiente de aprobación', ms: 3100, tone: 'warn' }
    ],
    lot: {
      code: 'L26214',
      noun: 'lote',
      label: 'Código de lote',
      systems: 'SAP S/4 Retail y WMS Manhattan',
      systems_short: 'SAP y WMS',
      fix_text: 'Si el consumidor ha copiado mal el lote, escribe el correcto. Agentic Platform lo busca en SAP y en el WMS y comprueba que corresponde al producto reclamado y que se sirvió a su tienda antes de cambiar nada.',
      same_body: 'Existe en SAP: Tomate frito Moncayo 400 g de Conservas del Jalón, servido a T-011 el 07/08/2026. Sin cambios.',
      unknown_hint: 'Si el código es dudoso, compáralo con la foto de la etiqueta que adjunta el consumidor.',
      mismatch_body: 'El código existe en los sistemas, pero no es un lote de Tomate frito Moncayo 400 g servido a T-011: no se cambia la ficha.',
      known: {
        'TOM-2607-18': { kind: 'mismatch', title: 'TOM-2607-18 es un lote de materia prima del fabricante', body: 'Es el tomate concentrado que Conservas del Jalón usó para fabricar L26214. La reclamación se registra por el lote del producto terminado que figura en la etiqueta. No se cambia la ficha.' },
        'TAR-2607-55': { kind: 'mismatch', title: 'TAR-2607-55 es el lote de tarros de vidrio del fabricante', body: 'Es el envase con el que se fabricó L26214; ya está vinculado en la traza. La reclamación se registra por el lote del producto terminado. No se cambia la ficha.' }
      }
    },
    sheet: {
      sub: 'Datos extraídos del mensaje y comprobados en el CRM, SAP y el TPV',
      empty_text: 'Agentic Platform extraerá del mensaje el producto, el lote, el defecto, la compra y la tienda, y los comprobará en el CRM, en SAP y en el TPV antes de preparar el 8D con el fabricante y la respuesta.',
      rows: [
        { k: 'Referencia', v: 'ATC-2026-0412', code: true, sub: 'Caso de Atención al consumidor en ServiceNow' },
        { k: 'Consumidor', v: 'Javier Lasheras · Club Moncayo 2601 0000 4418', ok: 'Socio desde 2019 · tel. 676 000 412' },
        { k: 'Producto', v: 'Tomate frito Moncayo 400 g (marca propia)', ok: 'Coincide con el lote en SAP y con el ticket' },
        { k: 'Lote', lot: true, ok: 'Existe en SAP · fabricado el 02/08/2026 por Conservas del Jalón · servido a T-011 el 07/08' },
        { k: 'Consumo preferente', v: '08/2028', ok: 'Coincide con SAP' },
        { k: 'Compra', v: '26/09/2026 18:52 · T-011 Zaragoza Delicias · 2 tarros', ok: 'Ticket 011-3-260926-0187 en el TPV' },
        { k: 'Defecto', v: 'Cuerpo extraño: fragmento de vidrio transparente de unos 5 mm', sub: 'Peligro físico: vidrio en envase de vidrio · tarro íntegro y bien cerrado según el consumidor' },
        { k: 'Lesiones', v: 'No', sub: '«no me he cortado y estoy bien» · una menor de 6 años comió del mismo plato' },
        { k: 'Evidencias', v: '3 fotos · tarro con resto de producto y fragmento conservados · segundo tarro sin abrir' },
        { k: 'Fabricante', v: 'Conservas del Jalón, S.L.', sub: 'Incidencias: INC-PRO-2026-0049 (rotura en llenadora el 02/08) e INC-PRO-2026-0059 (tarros rotos en recepción esta semana)' },
        { k: 'Plazo', v: 'Respuesta antes del 30/09 a las 21:37', due: true, sub: '48 h desde la recepción · PR-ATC-002' },
        { k: 'Registro', v: 'INC-PRO-2026-0058', code: true, sub: 'Incidencia al proveedor en ServiceNow, vinculada a la reclamación' }
      ]
    },
    requests: {
      title: 'Lo que pide el consumidor',
      items: [
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: '¿Hay que hacer algo o ir al médico?', meta: ['Respuesta al consumidor · criterio de Calidad'], quote: 'me digáis si tengo que hacer algo o ir al médico, por la niña', side: { pending: { status: 'waiting', label: 'Pendiente de aprobación' }, approved: { status: 'sent', label: 'Respondido' }, rejected: { status: 'rejected', label: 'No enviado' } } },
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Recoger el tarro y el fragmento', meta: ['D3 · mensajero el 01/10 o entrega en T-011'], quote: 'vengáis a recoger el tarro y el cristal', side: { pending: { status: 'pending', label: 'Propuesto' }, approved: { status: 'ok', label: 'Recogida el 01/10' }, rejected: { status: 'rejected', label: 'No programada' } } },
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Devolución del dinero', meta: ['Reembolso de 2,30 € (2 tarros) y vale de 10 € en la tarjeta Club'], quote: 'me devolváis el dinero del tarro', side: { pending: { status: 'pending', label: 'Propuesto' }, approved: { status: 'ok', label: 'Abonado' }, rejected: { status: 'rejected', label: 'No abonado' } } },
        { icon: 'check-circle', tone: 'ok', title: '¿Hay más tarros así?', meta: ['D3 · 480 en plataforma, 2.400 en lineal, 1.920 vendidas'], quote: 'me digáis si hay más tarros así', side: { pending: { status: 'ok', label: 'Localizados' }, approved: { status: 'hold', label: '516 unidades bloqueadas' }, rejected: { status: 'ok', label: 'Localizados' } } },
        { icon: 'calendar', tone: 'warn', title: 'Respuesta pronto', meta: ['PR-ATC-002 · 48 horas'], quote: 'Espero vuestra respuesta pronto', side: { status: 'pending', label: 'Antes del 30/09 21:37' } }
      ]
    },
    trace: {
      title: 'Traza del lote L26214',
      sub: 'SAP S/4 Retail · WMS Manhattan · TPV tiendas · CRM Fidelización · ServiceNow · hacia atrás y hacia delante',
      button_code: 'L26214',
      button_label: 'Traza completa · 41 tiendas',
      back: [
        { time: '02/08', timeSub: '11:42', title: 'Fabricante · rotura de tarro en la llenadora L2', text: 'Conservas del Jalón notifica la rotura de un tarro durante el lote L26214; parada, limpieza y purga de 96 tarros según su procedimiento de vidrio.', tone: 'warn', ref: 'INC-PRO-2026-0049', chip: { status: 'closed', label: 'Cerrada por el proveedor' } },
        { time: '02/08', title: 'Fabricación · lote L26214', text: 'Tomate concentrado TOM-2607-18 · tarros TAR-2607-55 · 4.800 unidades · consumo preferente 08/2028', tone: 'brand', ref: 'Conservas del Jalón' },
        { time: '02/08', title: 'Ruta en el fabricante', route: ['Lavado tarros', 'Llenadora L2', 'Cierre', 'Rayos X', 'Paletizado'], route_mark: 'Llenadora L2', text: 'Detector de vidrio por rayos X después del cierre (registros pedidos al fabricante)', tone: 'brand' },
        { time: '05/08', title: 'Recepción en la Plataforma de Plaza', text: '400 cajas de 12 · 14 tarros rotos en el palé 7, retirados en muelle · resto conforme · ubicación P-12-04-2', tone: 'warn', ref: 'REC-PLZ-26-08-0311' },
        { time: '07/08', title: 'Servicio a T-011 Zaragoza Delicias', text: '10 cajas (120 unidades) · ruta ZGZ-04', tone: 'brand', ref: 'Envío 011-0807-22' },
        { time: '26/09', timeSub: '18:52', title: 'Compra del consumidor', text: '2 tarros en T-011 · ticket 011-3-260926-0187 · tarjeta Club', tone: 'brand' },
        { time: '28/09', timeSub: '21:37', title: 'Reclamación', text: 'Fragmento de vidrio de unos 5 mm al consumir · sin lesiones', tone: 'crit', ref: 'ATC-2026-0412' }
      ],
      fwd_title: 'Hacia delante · dónde está el lote',
      fwd_cols: { id: 'Destino', qty: 'Unidades', when: 'Fecha', status: 'Estado' },
      fwd: [
        { id: 'P-12-04-2', dest: 'Plataforma de Plaza', sub: '40 cajas', qty: 480, when: 'En stock', status: { pending: { status: 'pending', label: 'Bloqueo propuesto' }, approved: { status: 'hold', label: 'Bloqueadas' }, rejected: { status: 'pending', label: 'Sin bloquear' } } },
        { id: 'T-011', dest: 'Zaragoza Delicias', sub: 'tienda del consumidor', qty: 36, when: 'En lineal', status: { pending: { status: 'pending', label: 'Bloqueo TPV propuesto' }, approved: { status: 'hold', label: 'Retiradas del lineal' }, rejected: { status: 'pending', label: 'A la venta' } } },
        { id: '40 tiendas', dest: 'Resto de la red', sub: 'Aragón y La Rioja', qty: 2364, when: 'En lineal', status: { status: 'evaluate', label: 'A evaluar (PR-CAL-010)' } },
        { id: 'Vendidas', dest: '41 tiendas', sub: '612 clientes del Club', qty: 1920, when: '06/08–28/09', status: { status: 'shipped', label: 'Consumidas o en hogares' } }
      ],
      fwd_note: '4.800 unidades recibidas · 4.320 servidas a 41 tiendas (1.920 vendidas y 2.400 en lineal) y 480 en plataforma · el lote cubre ventas desde el 06/08.',
      hypothesis: {
        title: 'Hipótesis de causa probable · a confirmar por Calidad y el fabricante',
        paras: [
          'Durante la fabricación del lote L26214 se rompió un tarro en la llenadora L2 del fabricante (02/08 a las 11:42, INC-PRO-2026-0049). Su procedimiento purgó 96 tarros, pero un fragmento pudo quedar en la llenadora y caer en un tarro posterior sin que el detector de rayos X lo rechazara.',
          'Apunta también al envase: el lote llegó a la plataforma con 14 tarros rotos en un palé y esta semana hay otros 3 palés del mismo fabricante con tarros rotos (INC-PRO-2026-0059). Un lote de tarros TAR-2607-55 más frágil de lo normal explicaría las dos cosas. Por aclarar: el consumidor dice que su tarro estaba íntegro y bien cerrado, y es el único caso de vidrio entre 1.920 unidades vendidas.',
          'Se confirma con el análisis del fragmento (tipo y color de vidrio frente a los tarros TAR-2607-55), los registros de la purga y del detector del fabricante y una inspección de muestras de la plataforma. Hasta entonces no se comunica una causa al consumidor y la retirada del lote se valora según PR-CAL-010.'
        ]
      }
    },
    history: {
      sub: 'ServiceNow · reclamaciones de marca propia · últimos 12 meses',
      col_product: 'Producto y lote',
      rows: [
        { id: 'ATC-2026-0233', date: '2026-06-11', product: 'Melocotón en almíbar Moncayo 420 g', lot: 'M26131', description: 'Fragmento de vidrio en el producto', category: 'Cuerpo extraño · vidrio', customer_label: 'T-034 Logroño Centro', root_cause: 'Rotura de tarro en la cerradora del fabricante sin purga suficiente · 8D cerrado y retirada del lote', nc: 'INC-PRO-2026-0031', status: 'cerrada', similar: true },
        { id: 'ATC-2025-0871', date: '2025-11-26', product: 'Garbanzos cocidos Moncayo 570 g', lot: 'G25298', description: 'Trozo de plástico duro', category: 'Cuerpo extraño · plástico', customer_label: 'T-019 Huesca Norte', root_cause: 'Rotura de una pieza de la tolva de llenado del fabricante', nc: 'INC-PRO-2025-0094', status: 'cerrada', similar: true },
        { id: 'ATC-2026-0318', date: '2026-08-02', product: 'Yogur natural Moncayo 4 x 125 g', lot: 'Y26208', description: 'Envases hinchados', category: 'Calidad', customer_label: 'T-027 Huesca Centro', root_cause: 'Rotura de la cadena de frío en tienda (mural averiado)', nc: 'INC-CAL-2026-0071', status: 'cerrada', similar: false },
        { id: 'ATC-2026-0187', date: '2026-04-15', product: 'Atún claro Moncayo 3 x 80 g', lot: 'A26061', description: 'Lata abollada con microfuga', category: 'Envase', customer_label: 'T-005 Zaragoza Actur', root_cause: 'Golpe en la manipulación en plataforma', nc: 'INC-CAL-2026-0039', status: 'cerrada', similar: false },
        { id: 'ATC-2026-0102', date: '2026-02-20', product: 'Galletas María Moncayo 800 g', lot: 'GM26022', description: 'Alérgeno (soja) no declarado en el etiquetado', category: 'Etiquetado', customer_label: 'T-041 Calatayud', root_cause: 'Cambio de receta del fabricante sin actualizar la etiqueta · retirada y aviso a AESAN', nc: 'INC-PRO-2026-0012', status: 'cerrada', similar: false },
        { id: 'ATC-2025-0799', date: '2025-10-30', product: 'Aceite de oliva virgen extra Moncayo 1 l', lot: 'AC25270', description: 'Sabor rancio', category: 'Calidad', customer_label: 'T-011 Zaragoza Delicias', root_cause: 'Exposición a la luz en el lineal · producto dentro de especificación', nc: 'INC-CAL-2025-0102', status: 'cerrada', similar: false }
      ],
      note: {
        title: 'Mismo tipo de causa que ATC-2026-0233',
        body: 'En junio, un fragmento de vidrio en melocotón en almíbar Moncayo se debió a la rotura de un tarro en la cerradora del fabricante con una purga insuficiente; acabó en retirada del lote. Si se confirma la hipótesis, sería el segundo caso de vidrio en conservas de marca propia en cuatro meses: el 8D propone en D7 exigir a los fabricantes de envase de vidrio una purga mínima validada y el envío del registro de roturas en 24 h.'
      }
    },
    plan: {
      title: 'Borrador 8D con el fabricante · INC-PRO-2026-0058',
      sub: 'PR-PRO-006 · Conservas del Jalón entrega D1–D5 antes del 09/10/2026; D6–D8 en seguimiento',
      col_label: 'Disciplina',
      containment_status: { pending: { text: 'Pendiente de aprobación', tone: 'warn' }, approved: { text: 'Aplicada', tone: 'ok' }, rejected: { text: 'No aplicada', tone: 'neutral' } },
      rows: [
        { d: 'D1', title: 'Equipo', owner: ['Responsable de Calidad'], date: '2026-09-29', status: { text: 'Propuesto', tone: 'draft' }, lead: 'Líder: Responsable de Calidad.', items: ['Técnico de Calidad de guardia: investigación y análisis del fragmento', 'Calidad de proveedores: 8D con Conservas del Jalón', 'Atención al consumidor: contacto con el consumidor y recogida de la muestra', 'Jefe de plataforma y Jefe de zona de tiendas: bloqueo en P-12-04-2 y en T-011'], note: 'Contacto externo: responsable de Calidad de Conservas del Jalón, S.L.' },
        { d: 'D2', title: 'Descripción del problema', owner: ['Técnico de Calidad de guardia'], date: '2026-09-29', status: { text: 'Completo', tone: 'ok' }, lead: 'Un consumidor encontró un fragmento de vidrio transparente de unos 5 mm al consumir Tomate frito Moncayo 400 g del lote L26214, comprado el 26/09 en T-011 Zaragoza Delicias. Sin lesiones; una menor comió del mismo plato.', items: ['Lote L26214, consumo preferente 08/2028, fabricado el 02/08/2026 por Conservas del Jalón: 4.800 unidades', 'Reclamación por la app el 28/09/2026 a las 21:37', 'Peligro físico: vidrio en producto envasado en vidrio · tarro íntegro según el consumidor', 'Evidencias: 3 fotos; tarro, resto de producto y fragmento conservados; segundo tarro sin abrir'] },
        { d: 'D3', title: 'Contención', owner: ['Responsable de Calidad', 'Jefe de plataforma'], date: '2026-09-29', containment: true, items: ['Bloquear en WMS Manhattan las 480 unidades del lote en la plataforma (P-12-04-2)', 'Bloquear la venta del lote en el TPV de T-011 y retirar las 36 unidades del lineal a la trastienda', 'Recoger el tarro, el fragmento y el segundo tarro del consumidor el 01/10 para analizarlos', 'Pedir hoy a Conservas del Jalón los registros de la purga y del detector de rayos X del 02/08 y muestras de retención del lote', 'Si aparece un segundo caso o se confirma el origen: retirada del lote y aviso a AESAN y a la comunidad autónoma (PR-CAL-010)'] },
        { d: 'D4', title: 'Causa raíz', owner: ['Calidad de proveedores', 'Responsable de Calidad'], date: '2026-10-05', status: { text: 'Hipótesis', tone: 'warn' }, lead: 'Hipótesis principal, a confirmar: un fragmento de la rotura de tarro del 02/08 en la llenadora L2 (INC-PRO-2026-0049) quedó en el equipo después de la purga y no lo detectó el control de rayos X.', items: ['A favor: rotura registrada durante el mismo lote; 14 tarros rotos en la recepción del lote y otros 3 palés con roturas esta semana (INC-PRO-2026-0059); mismo tipo de causa que ATC-2026-0233', 'Alternativa: tarros TAR-2607-55 frágiles · por aclarar: tarro íntegro y bien cerrado; único caso entre 1.920 unidades vendidas', 'Verificación: comparación del fragmento con los tarros TAR-2607-55 en laboratorio externo, registros del fabricante, inspección de 50 tarros de la plataforma con rayos X y 5 porqués'] },
        { d: 'D5', title: 'Acciones correctivas', owner: ['Calidad de proveedores'], date: '2026-10-09', status: { text: 'Planificado', tone: 'info' }, items: ['El fabricante amplía la purga tras una rotura (zona y número de tarros) y la valida con pruebas de vidrio testigo', 'Verificación de la sensibilidad del detector de rayos X con testigos de vidrio de 2 mm al inicio de cada turno'] },
        { d: 'D6', title: 'Implantación y eficacia', owner: ['Técnico de Calidad de guardia'], date: '2026-10-23', status: { text: 'Planificado', tone: 'info' }, items: ['Auditoría no anunciada a la línea L2 del fabricante con simulacro de rotura', 'Sin reclamaciones de vidrio en los siguientes 3 lotes de tomate frito'] },
        { d: 'D7', title: 'Prevención de la recurrencia', owner: ['Responsable de Calidad'], date: '2026-10-30', status: { text: 'Planificado', tone: 'info' }, items: ['Exigir en PR-PRO-006 a los fabricantes con envase de vidrio una purga mínima validada y el envío del registro de roturas en 24 h', 'Aviso automático a Calidad cuando un fabricante notifique una rotura de vidrio en un lote de marca propia, antes de recibirlo en plataforma'] },
        { d: 'D8', title: 'Cierre y reconocimiento', owner: ['Responsable de Calidad'], date: '2026-11-06', status: { text: 'Planificado', tone: 'info' }, items: ['Cierre de INC-PRO-2026-0058 con la evidencia de eficacia y respuesta final al consumidor', 'Reconocimiento al equipo'] }
      ]
    },
    reply: {
      to_label: 'al consumidor',
      subject: 'RE: Reclamación de producto - Cristal en tomate frito Moncayo - Ref. ATC-2026-0412',
      sub: 'Para javier.lasheras@correo.example · también en la app · en español',
      tab_label: 'Se envía',
      text: [
        'Hola, Javier:',
        '',
        'Gracias por escribirnos y por guardar el tarro y el fragmento. Sentimos mucho el susto, y nos alegra saber que estáis bien. Tu reclamación tiene la referencia ATC-2026-0412.',
        '',
        'Sobre tu hija: si no ha tenido molestias, no hace falta hacer nada. Si en las próximas horas notara dolor al tragar, dolor de tripa o cualquier molestia, llevadla a su pediatra o llamad al 112 e indicad que pudo ingerir un fragmento de vidrio. Por favor, no consumáis el otro tarro que tienes en la despensa.',
        '',
        'Lo que hemos hecho y lo que vamos a hacer:',
        '- Hemos retirado preventivamente de la venta ese lote (L26214) en tu tienda de Delicias y en nuestra plataforma mientras investigamos.',
        '- Un mensajero pasará a recoger el tarro, el fragmento y el tarro sin abrir el jueves 1 de octubre entre las 9:00 y las 14:00. Si te viene mejor otro día, o prefieres llevarlos a la tienda, contesta a este mensaje.',
        '- Hemos abierto una investigación con el fabricante y analizaremos el fragmento en un laboratorio.',
        '- Te hemos devuelto 2,30 € (los dos tarros) en tu tarjeta del Club Moncayo y te hemos añadido un vale de 10 € para tu próxima compra.',
        '',
        'Te contaremos el resultado de la investigación en un plazo máximo de 15 días. Si tu madre tiene tarros con el lote L26214, puede devolverlos en cualquier tienda Mercados Moncayo y le reembolsaremos el importe.',
        '',
        'Para cualquier duda, puedes llamarnos al 900 000 064 (de lunes a sábado, de 9:00 a 21:00) indicando tu referencia.',
        '',
        'Un saludo,',
        '',
        'Atención al consumidor',
        'Mercados Moncayo',
        'atencion.consumidor@mercadosmoncayo.example'
      ].join('\n'),
      highlights: [
        { text: 'ATC-2026-0412', label: 'Referencia', tone: 'brand' },
        { text: 'llevadla a su pediatra o llamad al 112', label: 'Salud', tone: 'brand' },
        { text: 'Hemos retirado preventivamente de la venta ese lote (L26214)', label: 'Contención', tone: 'brand' },
        { text: 'el jueves 1 de octubre entre las 9:00 y las 14:00', label: 'Recogida', tone: 'brand' },
        { text: 'en un plazo máximo de 15 días', label: 'Compromiso', tone: 'brand' }
      ],
      llm_instructions: [
        'Tono cercano, sencillo y tranquilizador para un consumidor y padre (tuteo; saludo «Hola, Javier:»), sin tecnicismos. Primero la salud.',
        'Agradece que guarde el tarro y el fragmento, lamenta el susto y da la referencia ATC-2026-0412.',
        'Indicaciones de salud para su hija de 6 años: si no ha tenido molestias, no hace falta hacer nada; si nota dolor al tragar, dolor de tripa o cualquier molestia, que la lleven a su pediatra o llamen al 112 e indiquen que pudo ingerir vidrio. Pide que no consuman el otro tarro.',
        'Di que se ha retirado preventivamente de la venta el lote L26214 en su tienda de Delicias (T-011) y en nuestra plataforma mientras investigamos.',
        'Ofrece la recogida por mensajero del tarro, el fragmento y el tarro sin abrir el jueves 1 de octubre entre las 9:00 y las 14:00, o entregarlos en la tienda; di que se ha abierto una investigación con el fabricante y que el fragmento se analizará en un laboratorio.',
        'Confirma el reembolso de 2,30 € (dos tarros) en su tarjeta del Club Moncayo y el vale de 10 €; su madre puede devolver tarros del lote L26214 en cualquier tienda y se le reembolsan.',
        'Compromete contarle el resultado en un plazo máximo de 15 días; da el teléfono 900 000 064 (de lunes a sábado, de 9:00 a 21:00).',
        'No afirmes una causa ni nombres al fabricante, no menciones la rotura en fábrica, otras incidencias u otras tiendas, ni anuncies una retirada general del lote.',
        'Firma: Atención al consumidor · Mercados Moncayo · atencion.consumidor@mercadosmoncayo.example'
      ],
      criterion: 'Criterio de redacción: tono cercano, primero la salud; confirma hechos, plazos y compensación; no adelanta la causa (la relación con la rotura del 02/08 no está confirmada) ni habla de retirada general del lote.',
      control: {
        label: 'Resumen para quien aprueba',
        note: 'Resumen interno que acompaña a la aprobación; no se envía al consumidor.',
        edited_note: 'El resumen corresponde al borrador de Agentic Platform; la versión editada incluye cambios de Calidad en el texto que se envía.',
        subject: 'Resumen interno · ATC-2026-0412 · INC-PRO-2026-0058',
        text: [
          'Qué se aprueba:',
          '1. Enviar la respuesta al consumidor por correo y por la app (vence el 30/09 a las 21:37).',
          '2. Bloqueo en WMS Manhattan de las 480 unidades del lote L26214 en P-12-04-2.',
          '3. Bloqueo de venta en el TPV de T-011 y retirada de 36 unidades del lineal a la trastienda.',
          '4. Recogida de la muestra el 01/10, reembolso de 2,30 € y vale de 10 € en la tarjeta Club (gesto comercial PR-ATC-002, hasta 15 €).',
          '5. Envío de la incidencia INC-PRO-2026-0058 a Conservas del Jalón pidiendo los registros del 02/08.',
          '',
          'Lo que NO se aprueba aquí, a propósito:',
          '- La retirada del lote en las 40 tiendas restantes ni el aviso a AESAN: PR-CAL-010 lo exige con un segundo caso o con el origen confirmado. Se prepara en «Simulacro de retirada».',
          '',
          'Riesgo si no se aprueba hoy: se incumple el plazo de 48 h y el lote sigue a la venta en la tienda del consumidor.'
        ].join('\n')
      }
    },
    approval: {
      title: 'Respuesta a Javier Lasheras y contención del lote L26214',
      approver: 'Responsable de Calidad',
      policy: 'PR-ATC-002 · PR-CAL-010',
      summary: {
        pending: 'Agentic Platform ha preparado la respuesta al consumidor, la recogida de la muestra, el reembolso y el bloqueo del lote en la plataforma y en su tienda. No se envía ni se bloquea nada hasta que Calidad lo apruebe.',
        approved: 'Calidad ha aprobado la respuesta y la contención. Agentic Platform ha enviado la respuesta, ha bloqueado el lote en la plataforma y en el TPV de T-011, ha programado la recogida y ha enviado la incidencia al fabricante.',
        rejected: 'Calidad ha rechazado la propuesta: no se ha enviado la respuesta ni se ha bloqueado ninguna unidad.'
      },
      scope: [
        { label: 'Respuesta al consumidor', state: { pending: { status: 'pending', chip: 'Enviar' }, approved: { status: 'sent', chip: 'Enviada' }, rejected: { status: 'rejected', chip: 'No enviada' } } },
        { label: 'Plataforma P-12-04-2', value: '480 unidades · L26214', state: { pending: { status: 'pending', chip: 'Bloquear' }, approved: { status: 'hold', chip: 'Bloqueadas' }, rejected: { status: 'rejected', chip: 'Sin bloquear' } } },
        { label: 'Tienda T-011', value: '36 unidades en lineal', state: { pending: { status: 'pending', chip: 'Bloquear venta' }, approved: { status: 'hold', chip: 'Retiradas' }, rejected: { status: 'rejected', chip: 'A la venta' } } },
        { label: 'Recogida y reembolso', value: '01/10 · 2,30 € + vale de 10 €', state: { pending: { status: 'pending', chip: 'Programar' }, approved: { status: 'ok', chip: 'Programado' }, rejected: { status: 'rejected', chip: 'No programado' } } },
        { label: 'Resto de la red', value: '2.364 unidades · 40 tiendas', state: { status: 'evaluate', chip: 'Según PR-CAL-010' } }
      ],
      effects: [
        'Outlook y app: respuesta enviada desde atencion.consumidor@mercadosmoncayo.example',
        'WMS Manhattan: bloqueo de calidad de 480 unidades del lote L26214 en P-12-04-2',
        'TPV tiendas: bloqueo de venta del lote en T-011 y tarea de retirada del lineal',
        'CRM Fidelización: reembolso de 2,30 € y vale de 10 € en la tarjeta Club',
        'ServiceNow: INC-PRO-2026-0058 enviada a Conservas del Jalón y recogida programada'
      ],
      next_step: 'Siguiente paso: analizar el fragmento tras la recogida del 01/10 (D4) y decidir con PR-CAL-010 si se retira el lote en toda la red.',
      toast_approved: 'Respuesta enviada a Javier Lasheras · 516 unidades del lote L26214 bloqueadas',
      reject_text: 'No se envía la respuesta ni se bloquea ninguna unidad. El motivo queda en el registro de auditoría.',
      reject_placeholder: 'Por ejemplo: llamar antes al consumidor para confirmar el estado de la niña',
      reject_audit: 'no se envía ni se bloquea nada',
      toast_rejected: 'Respuesta rechazada: no se ha enviado nada ni se ha bloqueado ninguna unidad'
    },
    compare: {
      rows: [
        { k: 'Personas que intervienen', hoy: '4: Atención al consumidor, Calidad, plataforma y tienda', pro_strong: '1', pro: ': Calidad revisa, corrige si hace falta y aprueba' },
        { k: 'Sistemas que hay que abrir', hoy: '6: Outlook, CRM, SAP, WMS, TPV y ServiceNow', pro_strong: '1', pro: ': esta consola; Agentic Platform consulta los 6' }
      ],
      steps_today: '12–15 búsquedas, llamadas a la tienda y redacciones a mano',
      time_label: 'Traza, 8D en borrador y respuesta',
      time_today: '2–4 h de trabajo; la respuesta suele salir al día siguiente',
      footer: 'Criterio de aceptación propuesto para el piloto: traza y borrador en menos de 15 minutos, el 100 % de las respuestas dentro de las 48 h y Calidad acepta el borrador con ediciones menores en al menos el 70 % de los casos.'
    },
    audit: {
      requested: { action: 'Análisis de reclamación solicitado', detail: 'ATC-2026-0412 · mensaje de la app de javier.lasheras@correo.example del 28/09/2026 21:37' },
      analyzed: { action: 'Reclamación analizada', detail: 'ATC-2026-0412 · lote L26214 · Tomate frito Moncayo 400 g' },
      after_analysis: [
        { action: 'Incidencia al proveedor registrada en borrador', detail: 'INC-PRO-2026-0058 · ServiceNow · vinculada a ATC-2026-0412 e INC-PRO-2026-0049' },
        { action: 'Borrador 8D preparado', detail: 'INC-PRO-2026-0058 · D1–D8 · rotura del 02/08 como hipótesis' },
        { action: 'Respuesta al consumidor redactada', detail: 'ATC-2026-0412 · español · versión 1 · pendiente de aprobación' }
      ],
      approved: { action: 'Respuesta aprobada y enviada', detail: 'ATC-2026-0412 · a javier.lasheras@correo.example y por la app' },
      after_approval: [
        { action: 'Bloqueo de calidad aplicado', detail: 'WMS Manhattan · 480 unidades del lote L26214 en P-12-04-2' },
        { action: 'Bloqueo de venta aplicado', detail: 'TPV de T-011 · lote L26214 · tarea de retirada de 36 unidades del lineal' },
        { action: 'Reembolso y vale aplicados', detail: 'CRM Fidelización · 2,30 € y vale de 10 € · Club Moncayo 2601 0000 4418' },
        { action: 'Incidencia enviada al fabricante', detail: 'ServiceNow · INC-PRO-2026-0058 a Conservas del Jalón · recogida de la muestra el 01/10' }
      ]
    },
    outcome_label: 'Respuesta enviada · lote L26214 bloqueado en plataforma y T-011',
    toast_analyzed: 'Reclamación analizada · 8D y respuesta en borrador',
    report: {
      button: 'Descargar informe 8D',
      title: 'Informe 8D · reclamación ATC-2026-0412',
      subtitle: 'Cuerpo extraño (vidrio de unos 5 mm) en Tomate frito Moncayo 400 g · lote L26214 · fabricante Conservas del Jalón, S.L.',
      filename: 'informe-8D-INC-PRO-2026-0058-ATC-2026-0412',
      meta: [['Centro', 'Plataforma de Plaza'], ['Reclamación', 'ATC-2026-0412 · 28/09/2026 21:37'], ['Lote', 'L26214 · Conservas del Jalón'], ['8D del fabricante', 'antes del 09/10/2026']],
      state: { pending: 'Borrador · pendiente de aprobación', approved: 'Contención aplicada · D4 abierta', rejected: 'Borrador · respuesta rechazada' },
      summary: [
        'Reclamación de un consumidor del Club Moncayo por la app: fragmento de vidrio transparente de unos 5 mm en Tomate frito Moncayo 400 g, lote L26214, comprado el 26/09/2026 en T-011 Zaragoza Delicias. Sin lesiones; una menor comió del mismo plato.',
        'El lote, de 4.800 unidades, lo fabricó Conservas del Jalón el 02/08/2026: 1.920 unidades vendidas en 41 tiendas, 2.400 en lineal y 480 en plataforma. No hay otras reclamaciones del lote.',
        'Hipótesis de causa, pendiente de confirmar con el análisis del fragmento: rotura de un tarro en la llenadora L2 del fabricante durante el lote (INC-PRO-2026-0049, 02/08 11:42) con una purga insuficiente.'
      ],
      trace_heading: 'Anexo A · Traza del lote',
      trace_rows: [
        { etapa: 'Materias primas', fecha: 'julio de 2026', detalle: 'Tomate concentrado TOM-2607-18 · tarros de vidrio TAR-2607-55', ref: 'Conservas del Jalón' },
        { etapa: 'Fabricación', fecha: '02/08/2026', detalle: '4.800 unidades en la línea L2 de Épila · rayos X tras el cierre', ref: 'L26214' },
        { etapa: 'Incidencia del fabricante', fecha: '02/08/2026 11:42', detalle: 'Rotura de un tarro en la llenadora L2 · purga de 96 tarros', ref: 'INC-PRO-2026-0049' },
        { etapa: 'Recepción', fecha: '05/08/2026', detalle: '400 cajas de 12 en la Plataforma de Plaza · 14 tarros rotos en el palé 7 · ubicación P-12-04-2', ref: 'REC-PLZ-26-08-0311' },
        { etapa: 'Distribución', fecha: '06/08–22/09/2026', detalle: '4.320 unidades servidas a 41 tiendas', ref: 'WMS' },
        { etapa: 'Servicio a tienda', fecha: '07/08/2026', detalle: '120 unidades a T-011 Zaragoza Delicias', ref: '011-0807-22' },
        { etapa: 'Compra', fecha: '26/09/2026 18:52', detalle: '2 tarros en T-011 · tarjeta Club', ref: '011-3-260926-0187' },
        { etapa: 'Reclamación', fecha: '28/09/2026 21:37', detalle: 'Fragmento de vidrio de unos 5 mm', ref: 'ATC-2026-0412' }
      ],
      units: {
        heading: 'Anexo B · Unidades del lote L26214 por destino',
        cols: [{ label: 'Destino', key: 'dest', mono: true }, { label: 'Detalle', key: 'det' }, { label: 'Unidades', key: 'n', num: true }, { label: 'Estado', key: 'estado', status: true }],
        rows: [
          { dest: 'P-12-04-2', det: 'Plataforma de Plaza', n: 480, estado: 'En stock', estado_after: 'Bloqueadas' },
          { dest: 'T-011', det: 'Zaragoza Delicias · en lineal', n: 36, estado: 'A la venta', estado_after: 'Retiradas del lineal' },
          { dest: 'T-011', det: 'Zaragoza Delicias · vendidas', n: 84, estado: 'Vendidas' },
          { dest: '40 tiendas', det: 'Resto de la red · en lineal', n: 2364, estado: 'A la venta · a evaluar' },
          { dest: '40 tiendas', det: 'Resto de la red · vendidas', n: 1836, estado: 'Vendidas' }
        ]
      },
      history_heading: 'Anexo C · Reclamaciones de marca propia (12 meses)',
      approvals: [
        { paso: 'Borradores 8D y respuesta', rol: 'Agentic Platform · agente Reclamaciones de consumidores', kind: 'agent' },
        { paso: 'Respuesta al consumidor y contención (D3)', rol: 'Responsable de Calidad', kind: 'reply' },
        { paso: 'Confirmación de la causa raíz (D4)', rol: 'Calidad de proveedores', kind: 'pending' },
        { paso: 'Cierre del 8D (D8)', rol: 'Responsable de Calidad', kind: 'pending' }
      ],
      second_signer: { role: 'Calidad de proveedores', note: '8D del fabricante y confirmación de causa (D4) · pendiente' }
    },
    presenter: {
      running: 'Mientras corre: señalar la línea de ServiceNow (el fabricante notificó una rotura de tarro durante el mismo lote) y la del TPV (dónde está cada unidad). Si hace falta, «Acelerar».',
      idle: [
        'Mensaje de un socio del Club por la app, anoche a las 21:37: un fragmento de vidrio en un tarro de tomate frito de nuestra marca. No se ha cortado, pero su hija comió del mismo plato. El procedimiento pide responder en 48 horas.',
        'En producción, Agentic Platform lo analiza en cuanto entra en el buzón de Atención al consumidor. Aquí lo lanzamos a mano para ver qué hace y qué sistemas consulta.'
      ],
      pending: [
        'Lo resaltado es lo que Agentic Platform ha extraído. Cada dato se comprueba: el socio y el ticket en el CRM, el lote en SAP. Coinciden producto, tienda y fecha.',
        'La traza: del fabricante a la plataforma y a 41 tiendas. 1.920 unidades vendidas, 2.400 en lineal y 480 en la plataforma; 36 en la tienda del consumidor.',
        'El dato que cambia la investigación: el fabricante notificó en agosto la rotura de un tarro en la llenadora durante este mismo lote. Es una hipótesis, no la causa: se confirma con el fragmento.',
        'Histórico: en junio hubo vidrio en melocotón en almíbar con una causa del mismo tipo. El 8D propone en D7 exigir purgas validadas y aviso en 24 h de cada rotura.',
        'La respuesta pone primero la salud, confirma hechos y compensación, y no adelanta la causa ni anuncia una retirada general. No sale hasta que Calidad la aprueba.'
      ],
      approved: [
        'Aprobada: respuesta enviada, 516 unidades bloqueadas en la plataforma y en la tienda, recogida programada y reembolso en la tarjeta Club. Todo queda en el registro de auditoría.',
        'La comparación de abajo: hoy, 4 personas y 6 sistemas, con la respuesta al día siguiente; aquí, una revisión y una aprobación dentro de las 48 h.',
        'El informe 8D se descarga como documento controlado para enviarlo al fabricante.'
      ],
      next: {
        pending: 'Pulsar «Revisar y aprobar» (arriba) o bajar hasta la respuesta y pulsar «Aprobar y enviar». Opcional: «Corregir» el lote con uno inexistente para enseñar que no inventa datos.',
        approved: 'Pulsar «Descargar informe 8D» y enseñar la cabecera del documento. Después, pasar a «Simulacro de retirada» para el lote L26214.'
      }
    }
  }
});
