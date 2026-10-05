/* Hidromec Ebro · reclamación REC-2026-0187 (fuga de aceite en la prensa PH-250 n.º PH250-26-0412).
 * Empresa, clientes y personas ficticios; datos sintéticos de demostración (MFM). */
agenticPack('maquinaria', {
  reclamacion: {
    code: 'REC-2026-0187',
    nav: 'Reclamación REC-2026-0187',
    title: 'Reclamación REC-2026-0187',
    section: 'Calidad',
    agent: 'Reclamaciones de cliente',
    nc: 'NC-2026-0233',
    form: { code: 'REG-CAL-008-01', rev: '4' },
    received: { date: '2026-09-28', time: '17:42' },
    due: '2026-10-13',
    holidays: ['2026-10-12'],
    customer_line: 'Prensas y Servicios del Norte (distribuidor) · Estampaciones Nervión',
    due_line: 'Acuse antes de las 17:42 del 29/09 · 8D antes del 13/10/2026',
    cust_name: 'Iñaki Goikoetxea · Servicio técnico, Prensas y Servicios del Norte',
    cust_addr: 'sat@psnorte.example',
    own_name: 'Calidad · Hidromec Ebro',
    own_addr: 'calidad@hidromec-ebro.example',
    mail_domain: 'hidromec-ebro.example',
    mail_sub: 'sat@psnorte.example · buzón calidad@hidromec-ebro.example · español',
    mail_tab_label: 'Correo del distribuidor',
    attachments: ['PH250-26-0412_fuga_vastago_1.jpg', 'PH250-26-0412_fuga_vastago_2.jpg', 'PH250-26-0412_placa.jpg', 'parte_intervencion_PSN-0931.pdf'],
    email_text: [
      'From: Iñaki Goikoetxea · Servicio técnico, Prensas y Servicios del Norte <sat@psnorte.example>',
      'To: Calidad · Hidromec Ebro <calidad@hidromec-ebro.example>',
      'Date: lun, 28 sep 2026 17:42',
      'Subject: Reclamación garantía - Fuga de aceite en cilindro principal - Prensa PH-250 n.º serie PH250-26-0412 - Ref. INC-PSN-0931',
      '',
      'Buenas tardes:',
      '',
      'Os escribimos para abrir una reclamación en garantía sobre una prensa hidráulica que os compramos en julio y que entregamos a nuestro cliente a primeros de agosto. Os pedimos que la tratéis con prioridad porque el cliente tiene la prensa parada.',
      '',
      'Equipo: prensa hidráulica PH-250 (250 t), número de serie PH250-26-0412',
      'Pedido: nuestro pedido de compra PC-PSN-26-0388',
      'Fecha de entrega al cliente final: 04/08/2026',
      'Cliente final: Estampaciones Nervión, S.L. (Basauri, Bizkaia)',
      'Horas de funcionamiento según el contador de la prensa: 412 h',
      'Nuestra referencia: INC-PSN-0931',
      '',
      'El jueves 24/09/2026 el jefe de mantenimiento del cliente detectó una fuga de aceite por el vástago del cilindro principal, en la zona del cabezal, durante un ciclo de embutición a unos 230 bar. Al principio era un rezume, pero el viernes ya perdía aproximadamente medio litro de aceite por turno (aceite HLP 46). Nuestro técnico estuvo hoy en sus instalaciones: ha limpiado la zona, ha comprobado que no es un racor ni la tubería y confirma que la fuga sale entre el vástago y la junta del cilindro principal. No ha visto rayas en el vástago a simple vista. El cliente ha parado la prensa por seguridad y por el riesgo de aceite en el suelo. No ha habido ningún accidente ni daños a personas.',
      '',
      'Os adjuntamos tres fotos (fuga y placa de características) y el parte de intervención de nuestro técnico.',
      '',
      'Como la prensa está en garantía y el cliente tiene una línea de estampación parada, os pedimos:',
      '- que nos confirméis la recepción y nos deis vuestra referencia de reclamación en 24 horas;',
      '- un técnico vuestro o el kit de juntas de repuesto para cambiarlas nosotros en un plazo de 48 horas;',
      '- el informe 8D con la causa raíz y las acciones correctivas en un plazo de 10 días laborables, como dice nuestro acuerdo de calidad;',
      '- que nos digáis si puede afectar a otras prensas: tenemos otra PH-250 vendida en agosto (n.º de serie PH250-26-0441, en Calderería Zorroza) y no queremos que le pase lo mismo.',
      '',
      'Os reenvío también, debajo, el correo que nos mandó el cliente.',
      '',
      'Un saludo,',
      '',
      'Iñaki Goikoetxea',
      'Responsable del servicio técnico',
      'Prensas y Servicios del Norte, S.L. · Bilbao',
      'Tel. 944 000 318'
    ].join('\n'),
    mail_extra: {
      label: 'Correo del cliente final (reenviado)',
      note: 'Mensaje original de Estampaciones Nervión que el distribuidor reenvía debajo de su correo. Agentic Platform lo usa para contrastar fechas y síntomas.',
      headers: { From: 'Mantenimiento · Estampaciones Nervión <mantenimiento@estampaciones-nervion.example>', To: 'sat@psnorte.example', Date: 'vie, 25 sep 2026 08:12', Subject: 'Prensa nueva PH-250 perdiendo aceite' },
      text: [
        'Hola, Iñaki:',
        '',
        'La prensa PH-250 que nos instalasteis en agosto (la del puesto 3, n.º de serie PH250-26-0412) pierde aceite por el cilindro grande, por arriba, donde sale el vástago. Lo vimos ayer por la tarde, en el turno de tarde, mientras hacíamos la referencia de soportes de 4 mm; hoy por la mañana la bandeja tenía bastante aceite y hemos rellenado el depósito con unos 2 litros.',
        '',
        'Trabaja a unos 230 bar y hace unos 1.900 golpes por turno. No la hemos tocado ni hemos cambiado nada desde la puesta en marcha. La revisión de las 250 horas la hicisteis vosotros el 15/09.',
        '',
        'La vamos a parar hoy al mediodía hasta que vengáis. Mandad a alguien cuanto antes, por favor, porque esa prensa saca el pedido de un cliente de automoción.',
        '',
        'Gracias,',
        'Xabier Etxebarria',
        'Jefe de mantenimiento · Estampaciones Nervión, S.L.'
      ].join('\n'),
      highlights: [
        { text: 'pierde aceite por el cilindro grande', label: 'Síntoma', tone: 'crit' },
        { text: 'unos 230 bar', label: 'Presión' },
        { text: 'La revisión de las 250 horas la hicisteis vosotros el 15/09', label: 'Revisión', tone: 'ok' }
      ]
    },
    highlights: [
      { text: 'PH-250 (250 t), número de serie PH250-26-0412', label: 'Equipo y n.º de serie', tone: 'brand' },
      { text: '04/08/2026', label: 'Entrega', tone: 'brand' },
      { text: 'Estampaciones Nervión, S.L. (Basauri, Bizkaia)', label: 'Cliente final' },
      { text: '412 h', label: 'Horas', tone: 'brand' },
      { text: 'INC-PSN-0931', label: 'Ref. cliente' },
      { text: 'fuga de aceite por el vástago del cilindro principal', label: 'Defecto', tone: 'crit' },
      { text: 'unos 230 bar', label: 'Presión de trabajo' },
      { text: 'entre el vástago y la junta del cilindro principal', label: 'Origen', tone: 'crit' },
      { text: 'No ha habido ningún accidente ni daños a personas', label: 'Sin daños', tone: 'ok' },
      { text: 'en 24 horas', label: 'Plazo acuse' },
      { text: 'en un plazo de 48 horas', label: 'Plazo técnico' },
      { text: 'en un plazo de 10 días laborables', label: 'Plazo 8D' },
      { text: 'PH250-26-0441', label: 'Otra prensa' }
    ],
    run: {
      title: 'Workflow «Reclamación de cliente»',
      sub: 'Se lanza al entrar una reclamación en el buzón de Calidad · PR-CAL-004 y PR-CAL-008',
      graph_title: 'Workflow de reclamación de cliente',
      idle_footer: 'Lee el correo, extrae y valida los datos, traza el número de serie y el lote de juntas y prepara el 8D y la respuesta. Nada sale sin la aprobación de Calidad.',
      nodes: [
        { id: 'correo', kind: 'trigger', label: 'Correo de cliente', sub: 'Buzón de Calidad', systems: ['Outlook'], icon: 'mail' },
        { id: 'extraccion', label: 'Extracción y validación', systems: ['Modelo de lenguaje', 'Salesforce Service'], icon: 'search' },
        { id: 'traza', label: 'Traza del equipo y del lote', systems: ['PLM Windchill', 'SAP S/4HANA', 'MES Opcenter', 'GMAO Maximo'], icon: 'git-branch' },
        { id: 'historico', label: 'Histórico, 8D y respuesta', systems: ['Salesforce Service', 'Procedimientos'], icon: 'clipboard' },
        { id: 'aprobacion', kind: 'approval', label: 'Aprobación de Calidad', sub: 'Responsable de Calidad' },
        { id: 'salida', kind: 'output', label: 'Respuesta y contención', systems: ['Outlook', 'SAP S/4HANA', 'Salesforce Service'], icon: 'send' }
      ],
      edges: [['correo', 'extraccion'], ['extraccion', 'traza'], ['traza', 'historico'], ['historico', 'aprobacion'], { from: 'aprobacion', to: 'salida', label: 'aprobado' }],
      graph_at: { 0: { correo: 'done', extraccion: 'active' }, 2: { extraccion: 'done', traza: 'active' }, 10: { traza: 'done', historico: 'active' }, 15: { historico: 'done', aprobacion: 'waiting' } },
      stats: [
        { label: 'Equipos en campo con juntas del lote · 17 PH-250 y 6 GH-55', value: 23 },
        { label: 'PH-250 en planta con rezume en la re-prueba del 28/09 · BP-1', value: '2 de 3', tone: 'warn' },
        { label: 'Reclamaciones parecidas · REC-2025-0311', value: 2, tone: 'warn' },
        { label: 'Días hábiles para el 8D · vence el 13/10/2026', due: true }
      ]
    },
    steps: [
      { system: 'Outlook', action: 'Lee el correo de sat@psnorte.example en el buzón calidad@hidromec-ebro.example (28/09/2026 17:42)', result: 'Reclamación en garantía en español · 4 adjuntos (3 fotos y el parte del técnico) · correo del cliente final reenviado', ms: 320 },
      { system: 'Modelo de lenguaje', action: 'Extrae los datos de la reclamación', result: 'PH-250 n.º PH250-26-0412 · fuga entre vástago y junta del cilindro principal a 230 bar · 412 h · sin daños personales · ref. INC-PSN-0931 · acuse 24 h, técnico 48 h, 8D en 10 días laborables', ms: 2900 },
      { system: 'Salesforce Service', action: 'Valida el número de serie y la garantía', result: 'Activo PH250-26-0412: PH-250, vendido a Prensas y Servicios del Norte, instalado en Estampaciones Nervión el 04/08/2026 · garantía de 24 meses en vigor · revisión de 250 h el 15/09 (SRV-26-1402) sin incidencias', ms: 410, tone: 'ok' },
      { system: 'PLM Windchill', action: 'Configuración as-built del equipo', result: 'PH-250 rev. C · cilindro principal CIL-250 · kit de juntas KJ-80 (ref. 7710-0480) del lote JNT-2607-031 (Sellados Ibéricos, S.A.; lote proveedor SI-26-1187) · 48 juntas por prensa', ms: 380 },
      { system: 'SAP S/4HANA', action: 'Recepción e inspección del lote JNT-2607-031', result: '21/07/2026 · 1.200 juntas · muestreo ISO 2859-1 nivel II (80 juntas): dimensiones y dureza conformes (92 Shore A) · 24 desechadas por rebaba en el labio (2,0 %; habitual 0,3 %)', ms: 350, tone: 'warn' },
      { system: 'MES Opcenter', action: 'Montaje MON-2607-22 y registros del cilindro', result: 'Línea LM-2, 29/07/2026 · cilindro principal, cojín y extractor con 48 juntas del lote · par de apriete de la tapa registrado y conforme', ms: 520 },
      { system: 'MES Opcenter', action: 'Prueba final en banco BP-1 del 31/07/2026', result: 'PRB-26-07-0918 · 1,25 × presión nominal (312 bar) durante 30 min · sin fuga ni rezume · conforme', ms: 430, tone: 'ok' },
      { system: 'MES Opcenter', action: 'Re-prueba en BP-1 de las PH-250 del mismo lote que siguen en planta', result: '28/09/2026 · MON-2608-11: rezume en el vástago del cilindro principal de PH250-26-0476 y PH250-26-0478; PH250-26-0477 conforme · retenidas por producción', ms: 460, tone: 'warn' },
      { system: 'GMAO Maximo', action: 'Busca órdenes abiertas en los puestos y útiles de la ruta', result: 'Sin órdenes abiertas en LM-2 ni en BP-1 · útil de inserción de juntas UT-JC-250 revisado el 15/07/2026', ms: 380, tone: 'ok' },
      { system: 'SAP S/4HANA', action: 'Dónde está el resto del lote de juntas', result: '1.200 recibidas: 1.104 montadas en MON-2607-22, MON-2608-03 y MON-2608-11 · 72 en el almacén de componentes (C-14-03), sin bloquear · 24 desechadas en recepción', ms: 390 },
      { system: 'Salesforce Service', action: 'Equipos en campo con juntas del lote', result: '23 equipos (17 PH-250 y 6 GH-55) en 11 clientes de España, Portugal y Francia · 3 PH-250 de MON-2608-11 aún en planta · PH250-26-0441 (Calderería Zorroza) incluida', ms: 540, tone: 'warn' },
      { system: 'Salesforce Service', action: 'Busca reclamaciones parecidas en los últimos 12 meses', result: '6 reclamaciones con 8D o NC · 2 parecidas: REC-2025-0311 (fuga en junta del cilindro principal, lote de Sellados Ibéricos) y REC-2026-0121', ms: 380, tone: 'warn' },
      { system: 'Procedimientos', action: 'Consulta PR-CAL-004, PR-CAL-008 y PR-POS-005', result: 'Acuse en 24 h · 8D en 10 días laborables: antes del 13/10/2026 (12/10 festivo) · PR-POS-005: campaña de campo si la causa afecta a más equipos', ms: 360 },
      { system: 'Modelo de lenguaje', action: 'Redacta el borrador 8D (D1–D8) con responsables por rol y fechas', result: 'Borrador completo · la relación con el lote JNT-2607-031 queda como hipótesis por confirmar con la junta desmontada', ms: 5200 },
      { system: 'SAP S/4HANA', action: 'Registra la no conformidad y la vincula a la reclamación', result: 'NC-2026-0233 (aviso de calidad Q2) abierta en borrador · vinculada a REC-2026-0187 y al caso de Salesforce', ms: 300, tone: 'ok' },
      { system: 'Modelo de lenguaje', action: 'Redacta la respuesta al distribuidor y el resumen para quien aprueba', result: 'Borrador listo: acuse, referencia NC-2026-0233, envío del kit de juntas y técnico en 48 h, fecha del 8D · pendiente de aprobación', ms: 3100, tone: 'warn' }
    ],
    lot: {
      code: 'PH250-26-0412',
      noun: 'número de serie',
      label: 'Número de serie',
      fix_title: 'el número de serie de la reclamación',
      systems: 'Salesforce Service y PLM Windchill',
      systems_short: 'Salesforce y Windchill',
      fix_text: 'Si el distribuidor ha copiado mal el número de serie, escribe el correcto. Agentic Platform lo busca en la base instalada y comprueba que corresponde al equipo y al cliente de la reclamación antes de cambiar nada.',
      same_body: 'Existe en la base instalada: PH-250 entregada el 04/08/2026 a Prensas y Servicios del Norte (cliente final Estampaciones Nervión). Sin cambios.',
      unknown_hint: 'Si el número es dudoso, pide al distribuidor una foto de la placa de características (ya hay una adjunta).',
      mismatch_body: 'El código existe en los sistemas, pero no es el número de serie de la prensa reclamada: no se cambia la ficha.',
      known: {
        'PH250-26-0441': { kind: 'same-product', title: 'PH250-26-0441 es otra PH-250 del mismo distribuidor', body: 'Es la segunda prensa que cita el correo (también lleva juntas del lote JNT-2607-031), pero no es la que pierde aceite. Para cambiar el número de serie de una reclamación abierta, confírmalo con el distribuidor. No se cambia la ficha.' },
        'JNT-2607-031': { kind: 'mismatch', title: 'JNT-2607-031 es el lote de juntas, no el número de serie', body: 'Existe en SAP: kit de juntas KJ-80 de Sellados Ibéricos, recibido el 21/07/2026. La reclamación se registra por el número de serie del equipo; el lote ya está vinculado en la traza. No se cambia la ficha.' }
      }
    },
    sheet: {
      sub: 'Datos extraídos del correo y comprobados en Salesforce, Windchill y SAP',
      empty_text: 'Agentic Platform extraerá del correo el equipo, el número de serie, el defecto, las horas, la referencia y los plazos, y los comprobará en la base instalada antes de preparar el 8D y la respuesta.',
      rows: [
        { k: 'Referencia', v: 'INC-PSN-0931', code: true, sub: 'Referencia del distribuidor · caso REC-2026-0187 en Salesforce Service' },
        { k: 'Cliente', v: 'Prensas y Servicios del Norte, S.L. (distribuidor, Bilbao)', sub: 'Cliente final: Estampaciones Nervión, S.L. (Basauri) · puesto 3' },
        { k: 'Equipo', v: 'Prensa hidráulica PH-250 (250 t) · rev. C', ok: 'Coincide con la base instalada y con la placa adjunta' },
        { k: 'Número de serie', lot: true, ok: 'Existe en Salesforce · montada en MON-2607-22 (LM-2, 29/07/2026) · banco BP-1 el 31/07/2026' },
        { k: 'Lote de la junta', v: 'Kit KJ-80 · Sellados Ibéricos, S.A.', trace: 'JNT-2607-031', sub: 'Configuración as-built en PLM Windchill · lote proveedor SI-26-1187' },
        { k: 'Defecto', v: 'Fuga de aceite entre el vástago y la junta del cilindro principal', sub: 'Unos 0,5 l de HLP 46 por turno a 230 bar · vástago sin rayas visibles' },
        { k: 'Daños', v: 'No', sub: '«No ha habido ningún accidente ni daños a personas» · prensa parada por el cliente' },
        { k: 'Uso', v: '412 h · unos 1.900 golpes por turno', ok: 'Revisión de 250 h el 15/09/2026 (SRV-26-1402) sin anotaciones de fuga' },
        { k: 'Garantía', v: 'En vigor hasta el 04/08/2028 (24 meses)', ok: 'Contrato de distribución PSN-2024-03' },
        { k: 'Evidencias', v: '3 fotos · parte de intervención del técnico · correo del cliente final' },
        { k: 'Plazos', v: 'Acuse antes de las 17:42 del 29/09 · 8D antes del 13/10/2026', due: true, sub: '10 días laborables desde la recepción (12/10 festivo) · PR-CAL-008' },
        { k: 'Registro', v: 'NC-2026-0233', code: true, sub: 'No conformidad (aviso Q2) en SAP, vinculada a la reclamación' }
      ]
    },
    requests: {
      items: [
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Acuse de recibo y referencia en 24 horas', meta: ['Respuesta al distribuidor · NC-2026-0233'], quote: 'que nos confirméis la recepción y nos deis vuestra referencia de reclamación en 24 horas', side: { pending: { status: 'waiting', label: 'Pendiente de aprobación' }, approved: { status: 'sent', label: 'Enviado' }, rejected: { status: 'rejected', label: 'No enviado' } } },
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Técnico o kit de juntas en 48 horas', meta: ['D3 · kit KJ-80 de otro lote · técnico de posventa'], quote: 'un técnico vuestro o el kit de juntas de repuesto para cambiarlas nosotros en un plazo de 48 horas', side: { pending: { status: 'pending', label: 'Propuesto' }, approved: { status: 'ok', label: 'Kit y visita el 30/09' }, rejected: { status: 'rejected', label: 'No aplicado' } } },
        { icon: 'clock', tone: 'warn', title: 'Informe 8D con causa raíz y acciones correctivas', meta: ['D4, D5 y D7 del 8D'], quote: 'el informe 8D con la causa raíz y las acciones correctivas en un plazo de 10 días laborables', side: { status: 'review', label: 'Hipótesis' } },
        { icon: 'check-circle', tone: 'ok', title: '¿Puede afectar a otras prensas?', meta: ['D3 · 23 equipos en campo, 3 PH-250 en planta (2 con rezume) y 72 juntas en almacén'], quote: 'que nos digáis si puede afectar a otras prensas', side: { pending: { status: 'ok', label: 'Localizados' }, approved: { status: 'hold', label: '3 prensas y 72 juntas bloqueadas' }, rejected: { status: 'ok', label: 'Localizados' } } },
        { icon: 'calendar', tone: 'warn', title: 'Plazo del 8D: 10 días laborables', meta: ['Envío del 8D (D1–D5) · seguimiento D6–D8'], quote: 'como dice nuestro acuerdo de calidad', side: { status: 'pending', label: 'Antes del 13/10' } }
      ]
    },
    trace: {
      title: 'Traza de la prensa PH250-26-0412 y del lote de juntas JNT-2607-031',
      sub: 'Salesforce Service · PLM Windchill · SAP S/4HANA · MES Opcenter · GMAO Maximo · hacia atrás y hacia delante',
      button_code: 'JNT-2607-031',
      button_label: 'Traza completa del lote · 1.200 juntas',
      back: [
        { time: '14/07', title: 'Fabricación en el proveedor', text: 'Sellados Ibéricos moldea el lote SI-26-1187 (poliuretano 92 Shore A, labio de NBR) · certificado de material 3.1', tone: 'brand', ref: 'SI-26-1187' },
        { time: '21/07', title: 'Recepción e inspección · lote JNT-2607-031', text: '1.200 kits KJ-80 · muestreo ISO 2859-1 nivel II (80 juntas): dimensiones y dureza conformes · 24 desechadas por rebaba en el labio (2,0 %)', tone: 'warn', ref: 'Lote QM 010000488173', chip: { status: 'warn', label: 'Rebaba 2,0 %' } },
        { time: '29/07', title: 'Montaje del cilindro · MON-2607-22', text: 'Línea LM-2 · cilindro principal, cojín y extractor con 48 juntas del lote · par de apriete de la tapa conforme', tone: 'brand', ref: 'OF 4100731' },
        { time: '31/07', timeSub: '10:20', title: 'Ruta y prueba final', route: ['MC-02', 'RECT-01', 'LM-2', 'BP-1', 'EXP'], route_mark: 'LM-2', text: 'BP-1: 312 bar (1,25 × nominal) durante 30 min, sin fuga ni rezume · PRB-26-07-0918', tone: 'ok' },
        { time: '04/08', title: 'Expedición y puesta en marcha', text: 'Expedida el 03/08 (albarán 80041977) · instalada en Estampaciones Nervión (Basauri) el 04/08 · revisión de 250 h el 15/09', tone: 'brand', ref: 'Acta PEM-26-0388' },
        { time: '24/09', title: 'Fallo en campo', text: 'Fuga por el vástago del cilindro principal a 412 h · prensa parada el 25/09', tone: 'crit', ref: 'INC-PSN-0931' },
        { time: '28/09', title: 'Re-prueba en planta · MON-2608-11', text: 'Rezume en el vástago de PH250-26-0476 y PH250-26-0478, con juntas del mismo lote; PH250-26-0477 conforme', tone: 'warn', ref: 'BP-1', chip: { status: 'hold', label: 'Retenidas' } }
      ],
      fwd_title: 'Hacia delante · juntas del lote JNT-2607-031',
      fwd_cols: { id: 'Destino', qty: 'Juntas', when: 'Fecha', status: 'Estado' },
      fwd: [
        { id: 'MON-2607-22', trace: true, dest: '8 PH-250 y 2 GH-55', sub: 'incl. PH250-26-0412', qty: 432, when: '27–31/07/2026', status: { status: 'shipped', label: '10 en campo' } },
        { id: 'MON-2608-03', trace: true, dest: '7 PH-250 y 2 GH-55', sub: 'incl. PH250-26-0441', qty: 384, when: '03–07/08/2026', status: { status: 'shipped', label: '9 en campo' } },
        { id: 'MON-2608-11', trace: true, dest: '2 PH-250 y 2 GH-55', sub: 'en campo', qty: 192, when: '11–14/08/2026', status: { status: 'shipped', label: '4 en campo' } },
        { id: 'MON-2608-11', trace: true, dest: '3 PH-250 en planta', sub: '2 con rezume', qty: 144, when: 'En planta', status: { pending: { status: 'pending', label: 'Bloqueo QM propuesto' }, approved: { status: 'hold', label: 'Bloqueadas en QM' }, rejected: { status: 'warn', label: 'Retenidas sin QM' } } },
        { id: 'C-14-03', dest: 'Almacén de componentes', sub: 'disponibles para montaje', qty: 72, when: 'En stock', status: { pending: { status: 'pending', label: 'Bloqueo propuesto' }, approved: { status: 'hold', label: 'Bloqueadas' }, rejected: { status: 'pending', label: 'Sin bloquear' } } },
        { id: 'DESECHO', dest: 'Inspección de recepción', sub: 'rebaba en el labio', qty: 24, when: '21/07/2026', status: { status: 'closed', label: 'Desechadas' } }
      ],
      fwd_note: '1.200 juntas recibidas · 1.104 montadas en 23 equipos en campo (17 PH-250 y 6 GH-55, 11 clientes) y 3 PH-250 en planta · cada PH-250 lleva 48 juntas del lote y cada GH-55, 24.',
      hypothesis: {
        title: 'Hipótesis de causa probable · a confirmar por Calidad',
        paras: [
          'Hipótesis principal: un defecto de moldeo del lote JNT-2607-031 en el labio de la junta. En la recepción se desecharon 24 juntas por rebaba en el labio (2,0 %, frente al 0,3 % habitual) y la re-prueba del 28/09 encontró rezume en 2 de las 3 PH-250 del mismo lote que siguen en planta. REC-2025-0311 fue también una junta de Sellados Ibéricos.',
          'Por aclarar: el muestreo de recepción dio dimensiones y dureza conformes (92 Shore A) y la prensa pasó la prueba final a 312 bar sin rezume. No se descarta un daño en el montaje, como en REC-2026-0121, aunque el técnico no ve rayas en el vástago y el par de la tapa está registrado conforme.',
          'Se confirma con el análisis de la junta desmontada (labio, dureza y dimensiones), una muestra de las 72 juntas del almacén y la respuesta del proveedor sobre el lote SI-26-1187. Hasta entonces no se comunica una causa al cliente ni se lanza una campaña de campo (PR-POS-005).'
        ]
      }
    },
    history: {
      sub: 'Salesforce Service y SAP QM · últimos 12 meses',
      col_product: 'Equipo y n.º de serie',
      rows: [
        { id: 'REC-2025-0311', date: '2025-11-14', product: 'Prensa PH-250', lot: 'PH250-25-0388 · JNT-2509-014', description: 'Fuga de aceite en la junta del cilindro principal a 600 h', category: 'Fuga hidráulica', customer_label: 'Talleres Mecánicos Arlanzón', root_cause: 'Lote de juntas con dureza fuera de tolerancia (82 Shore A) · proveedor Sellados Ibéricos', nc: '8D-2025-021', status: 'cerrado', similar: true },
        { id: 'REC-2026-0121', date: '2026-05-20', product: 'Grupo hidráulico GH-55', lot: 'GH55-26-0063 · JNT-2604-007', description: 'Fuga por la junta del vástago del cilindro de cierre', category: 'Fuga hidráulica', customer_label: 'Prensas y Servicios del Norte', root_cause: 'Vástago rayado en el montaje por una mordaza sin protección', nc: 'NC-2026-0149', status: 'cerrada', similar: true },
        { id: 'REC-2026-0163', date: '2026-07-09', product: 'Grupo hidráulico GH-30', lot: 'GH30-26-0112', description: 'Sobretemperatura del aceite en verano', category: 'Rendimiento', customer_label: 'Forjas del Cinca', root_cause: 'Intercambiador de calor infradimensionado para el ciclo del cliente', nc: 'NC-2026-0188', status: 'cerrada', similar: false },
        { id: 'REC-2026-0142', date: '2026-06-18', product: 'Prensa PH-160', lot: 'PH160-26-0217', description: 'Goteo en un racor de la central hidráulica', category: 'Fuga hidráulica', customer_label: 'Metalúrgica Tudelana', root_cause: 'Par de apriete insuficiente en el montaje del racor', nc: 'NC-2026-0171', status: 'cerrada', similar: false },
        { id: 'REC-2026-0098', date: '2026-04-22', product: 'Grupo hidráulico GH-55', lot: 'GH55-26-0041', description: 'Ruido y vibración en la bomba', category: 'Ruido', customer_label: 'Hierros Moncayo', root_cause: 'Cavitación por filtro de aspiración obstruido (mantenimiento del cliente)', nc: 'NC-2026-0117', status: 'cerrada', similar: false },
        { id: 'REC-2026-0055', date: '2026-03-03', product: 'Prensa PH-400', lot: 'PH400-26-0009', description: 'Carenado golpeado en la entrega', category: 'Transporte', customer_label: 'Estampaciones Lusitanas (Oporto)', root_cause: 'Falta de calzos en el camión del transportista', nc: 'NC-2026-0072', status: 'cerrada', similar: false }
      ],
      note: {
        title: 'Dos fugas por junta en el último año',
        body: 'REC-2025-0311 (14/11/2025) fue una junta del mismo proveedor con dureza fuera de tolerancia; REC-2026-0121 (20/05/2026), una junta dañada en montaje. Las dos causas siguen abiertas como hipótesis en esta reclamación. El 8D propone en D7 control de dureza en recepción para Sellados Ibéricos y un plan de sustitución de útiles de montaje por número de ciclos.'
      }
    },
    plan: {
      title: 'Borrador 8D · NC-2026-0233',
      sub: 'PR-CAL-008 · al distribuidor antes del 13/10/2026 con D1–D5; D6–D8 en seguimiento',
      col_label: 'Disciplina',
      containment_status: { pending: { text: 'Pendiente de aprobación', tone: 'warn' }, approved: { text: 'Aplicada', tone: 'ok' }, rejected: { text: 'No aplicada', tone: 'neutral' } },
      rows: [
        { d: 'D1', title: 'Equipo', owner: ['Responsable de Calidad'], date: '2026-09-29', status: { text: 'Propuesto', tone: 'draft' }, lead: 'Líder: Responsable de Calidad.', items: ['Técnico de Calidad de turno: investigación y análisis de la junta desmontada', 'Responsable de posventa: contacto con el distribuidor, kit y visita técnica', 'Jefe de producción: línea LM-2, lotes de montaje y re-pruebas en BP-1', 'Compras · calidad de proveedor: Sellados Ibéricos y lote SI-26-1187'], note: 'Contacto externo: Iñaki Goikoetxea (Prensas y Servicios del Norte).' },
        { d: 'D2', title: 'Descripción del problema', owner: ['Técnico de Calidad de turno'], date: '2026-09-29', status: { text: 'Completo', tone: 'ok' }, lead: 'Fuga de aceite entre el vástago y la junta del cilindro principal de la prensa PH-250 n.º PH250-26-0412 a las 412 h de funcionamiento, trabajando a 230 bar. Sin daños personales; prensa parada por el cliente final.', items: ['Montada en MON-2607-22 (LM-2, 29/07/2026) con 48 juntas KJ-80 del lote JNT-2607-031; prueba final en BP-1 conforme el 31/07 (312 bar, 30 min)', 'Entregada el 04/08/2026 a Estampaciones Nervión (Basauri) vía Prensas y Servicios del Norte · revisión de 250 h el 15/09 sin anotaciones', 'Detectada el 24/09/2026; reclamación recibida el 28/09/2026 a las 17:42', 'Mismo lote: rezume en 2 de las 3 PH-250 que siguen en planta (re-prueba del 28/09)', 'Evidencias: 3 fotos, parte de intervención y correo del cliente final; junta pendiente de desmontar'] },
        { d: 'D3', title: 'Contención', owner: ['Responsable de Calidad', 'Responsable de posventa'], date: '2026-09-30', containment: true, items: ['Enviar un kit KJ-80 de otro lote (JNT-2609-006, inspeccionado al 100 %) y un técnico de posventa el 30/09 para cambiar la junta y recuperar la desmontada', 'Bloquear en SAP QM las 72 juntas del lote en C-14-03 para que no se monten más', 'Bloquear en SAP QM las 3 PH-250 de MON-2608-11 (PH250-26-0476/0477/0478), hoy retenidas solo por producción', 'Aviso preventivo a los 11 clientes con equipos del lote para vigilar fugas en el cilindro (sin campaña hasta confirmar la causa)'] },
        { d: 'D4', title: 'Causa raíz', owner: ['Responsable de Calidad', 'Compras · calidad de proveedor'], date: '2026-10-05', status: { text: 'Hipótesis', tone: 'warn' }, lead: 'Hipótesis principal, a confirmar: defecto de moldeo en el labio de las juntas del lote JNT-2607-031 (lote proveedor SI-26-1187).', items: ['A favor: 24 juntas desechadas en recepción por rebaba en el labio (2,0 % frente al 0,3 %); rezume en 2 de 3 prensas del mismo lote; REC-2025-0311 con el mismo proveedor', 'Por aclarar: dimensiones y dureza conformes en el muestreo (92 Shore A) y prueba final sin rezume; daño en montaje no descartado (REC-2026-0121)', 'Verificación: análisis de la junta desmontada y de 13 juntas del almacén (labio, dureza, dimensiones), informe del proveedor sobre SI-26-1187 y 5 porqués'] },
        { d: 'D5', title: 'Acciones correctivas', owner: ['Compras · calidad de proveedor', 'Jefe de producción'], date: '2026-10-07', status: { text: 'Planificado', tone: 'info' }, items: ['Reclamación al proveedor y devolución de las juntas del lote que queden en planta', 'Cambiar las juntas de las 3 PH-250 retenidas y repetir la prueba en BP-1', 'Si se confirma la causa en el lote: campaña de campo según PR-POS-005 para los 23 equipos en campo'] },
        { d: 'D6', title: 'Implantación y eficacia', owner: ['Técnico de Calidad de turno'], date: '2026-10-21', status: { text: 'Planificado', tone: 'info' }, items: ['Las 3 PH-250 con juntas nuevas superan BP-1 sin rezume (1,25 × nominal, 30 min)', 'Sin nuevas fugas en los 23 equipos en campo durante 90 días (seguimiento en Salesforce)'] },
        { d: 'D7', title: 'Prevención de la recurrencia', owner: ['Responsable de Calidad'], date: '2026-10-30', status: { text: 'Planificado', tone: 'info' }, items: ['Bloqueo automático del lote en SAP QM cuando el desecho en recepción supere el 1 % (hoy se libera el resto del lote)', 'Inspección reforzada de recepción para Sellados Ibéricos durante 6 meses: labio al 100 % con lupa y dureza por lote (dos reclamaciones con sus juntas en un año)', 'Re-prueba de 10 min en BP-1 a las 24 h de la prueba final para cilindros de 250 t o más'] },
        { d: 'D8', title: 'Cierre y reconocimiento', owner: ['Responsable de Calidad'], date: '2026-11-06', status: { text: 'Planificado', tone: 'info' }, items: ['Informe final a Prensas y Servicios del Norte y cierre de NC-2026-0233 con la evidencia de eficacia', 'Reconocimiento al equipo'] }
      ]
    },
    reply: {
      to_label: 'al distribuidor',
      subject: 'RE: Reclamación garantía - Fuga de aceite en cilindro principal - Prensa PH-250 n.º serie PH250-26-0412 - Ref. INC-PSN-0931 - Ref. Hidromec NC-2026-0233',
      sub: 'Para sat@psnorte.example · en español',
      tab_label: 'Se envía',
      text: [
        'Buenos días, Iñaki:',
        '',
        'Gracias por vuestro correo del 28 de septiembre de 2026. Confirmamos la recepción de la reclamación INC-PSN-0931 por la fuga de aceite en el cilindro principal de la prensa PH-250 con número de serie PH250-26-0412, instalada en Estampaciones Nervión. Sentimos las molestias y la parada de la línea de vuestro cliente, y tomamos nota de que no ha habido daños a personas.',
        '',
        'Nuestra referencia es NC-2026-0233. La reclamación se gestiona en garantía según nuestro procedimiento de no conformidades y se documentará en un informe 8D.',
        '',
        'Lo que sabemos por nuestros registros:',
        '- La prensa se montó en nuestra planta de Zaragoza el 29/07/2026, superó la prueba final en banco a 312 bar durante 30 minutos el 31/07/2026 y se entregó el 04/08/2026. La revisión de las 250 horas del 15/09/2026 no registró fugas.',
        '- Hemos localizado el lote de las juntas del cilindro y el resto de equipos y juntas del mismo lote. Las juntas y las prensas del lote que siguen en nuestra planta quedan bloqueadas mientras investigamos.',
        '',
        'Próximos pasos:',
        '- Mañana, 30/09/2026, os enviamos un kit de juntas de un lote inspeccionado al 100 % y un técnico de nuestro servicio de posventa irá a Estampaciones Nervión para cambiar la junta junto a vuestro técnico. Por favor, confirmadnos a qué hora puede entrar.',
        '- Nos llevaremos la junta desmontada para analizarla en nuestro laboratorio; os rogamos que no la deis por desechada si la cambiáis antes.',
        '- Os enviaremos el informe 8D, con la causa raíz y las acciones correctivas y preventivas, a más tardar el 13 de octubre de 2026.',
        '- Sobre la PH250-26-0441: lleva juntas del mismo lote. Mientras investigamos, os pedimos que vuestro cliente vigile si aparece aceite en la zona del vástago y que nos aviséis de inmediato si lo ve. Si la investigación lo aconseja, os propondremos una revisión preventiva.',
        '',
        'Un saludo,',
        '',
        'Departamento de Calidad',
        'Hidromec Ebro, S.L. · Planta de Zaragoza',
        'calidad@hidromec-ebro.example'
      ].join('\n'),
      highlights: [
        { text: 'NC-2026-0233', label: 'Referencia', tone: 'brand' },
        { text: 'quedan bloqueadas mientras investigamos', label: 'Contención', tone: 'brand' },
        { text: 'un técnico de nuestro servicio de posventa irá a Estampaciones Nervión', label: 'Técnico 48 h', tone: 'brand' },
        { text: 'a más tardar el 13 de octubre de 2026', label: 'Compromiso', tone: 'brand' }
      ],
      llm_instructions: [
        'Tono profesional y cercano, entre socios de negocio: escribes al responsable del servicio técnico de un distribuidor (de tú en plural: «os», «vuestro»; saludo «Buenos días, Iñaki:»). Sin tecnicismos innecesarios.',
        'Confirma la recepción y da nuestra referencia NC-2026-0233; recuerda el número de serie PH250-26-0412 y la referencia del distribuidor INC-PSN-0931.',
        'Cuenta solo hechos comprobados en nuestros registros (montaje el 29/07/2026, prueba final en banco a 312 bar durante 30 minutos el 31/07/2026, entrega el 04/08/2026, revisión de las 250 horas el 15/09/2026 sin fugas) y que las juntas y prensas del mismo lote que siguen en nuestra planta quedan bloqueadas mientras investigamos.',
        'Compromete el envío de un kit de juntas de un lote inspeccionado al 100 % y la visita de un técnico de posventa el 30/09/2026; pide la hora de acceso y que guarden la junta desmontada para nuestro laboratorio.',
        'Compromete el informe 8D a más tardar el 13 de octubre de 2026.',
        'Sobre la PH250-26-0441: lleva juntas del mismo lote; pide que el cliente vigile si aparece aceite en el vástago y que avise de inmediato. No anuncies una campaña de campo ni una retirada.',
        'No adelantes la causa (el lote de juntas es solo una hipótesis), no menciones el rezume de las prensas en planta, otros clientes, el proveedor ni códigos internos distintos de NC-2026-0233.',
        'Firma: Departamento de Calidad · Hidromec Ebro, S.L. · Planta de Zaragoza · calidad@hidromec-ebro.example'
      ],
      criterion: 'Criterio de redacción: confirma hechos de Salesforce, SAP y Opcenter y compromete fechas; no adelanta la causa (la relación con el lote de juntas no está confirmada) ni habla de campaña de campo.',
      control: {
        label: 'Resumen para quien aprueba',
        note: 'Resumen interno que acompaña a la aprobación; no se envía al distribuidor.',
        edited_note: 'El resumen corresponde al borrador de Agentic Platform; la versión editada incluye cambios de Calidad en el texto que se envía.',
        subject: 'Resumen interno · REC-2026-0187 · NC-2026-0233',
        text: [
          'Qué se aprueba:',
          '1. Enviar la respuesta al distribuidor (acuse dentro de las 24 h que pide: vence hoy a las 17:42).',
          '2. Bloqueo en SAP QM de las 72 juntas del lote JNT-2607-031 en C-14-03 (hoy siguen disponibles para montaje).',
          '3. Bloqueo en SAP QM de las 3 PH-250 de MON-2608-11 (2 con rezume en la re-prueba del 28/09), hoy retenidas solo por producción.',
          '4. Envío del kit KJ-80 del lote JNT-2609-006 y visita de posventa el 30/09 (orden de servicio en Salesforce).',
          '',
          'Lo que la respuesta NO dice, a propósito:',
          '- No da una causa: el lote de juntas es la hipótesis principal, pero falta analizar la junta desmontada.',
          '- No habla de campaña de campo: PR-POS-005 la exige solo si la causa afecta a más equipos; se valora en «Simulacro de retirada».',
          '- No menciona el rezume de las prensas en planta: es información interna hasta tener el análisis.',
          '',
          'Riesgo si no se aprueba hoy: se incumple el acuse de 24 h del acuerdo de calidad con el distribuidor y las juntas del almacén pueden montarse en la OF de esta semana.'
        ].join('\n')
      }
    },
    approval: {
      title: 'Respuesta a Prensas y Servicios del Norte y contención',
      approver: 'Responsable de Calidad',
      policy: 'PR-CAL-004 · PR-CAL-008',
      summary: {
        pending: 'Agentic Platform ha preparado la respuesta para sat@psnorte.example, el envío del kit y la visita técnica, y el bloqueo de las juntas y prensas del lote que siguen en planta. No se envía ni se bloquea nada hasta que Calidad lo apruebe.',
        approved: 'Calidad ha aprobado la respuesta y la contención. Agentic Platform ha enviado el correo al distribuidor, ha bloqueado juntas y prensas en SAP QM, ha creado la orden de servicio y ha actualizado NC-2026-0233.',
        rejected: 'Calidad ha rechazado la propuesta: no se ha enviado la respuesta, ni el kit, ni se ha bloqueado nada.'
      },
      scope: [
        { label: 'Respuesta al distribuidor', state: { pending: { status: 'pending', chip: 'Enviar' }, approved: { status: 'sent', chip: 'Enviada' }, rejected: { status: 'rejected', chip: 'No enviada' } } },
        { label: 'Juntas en C-14-03', value: '72 juntas · lote JNT-2607-031', state: { pending: { status: 'pending', chip: 'Bloquear' }, approved: { status: 'hold', chip: 'Bloqueadas' }, rejected: { status: 'rejected', chip: 'Sin bloquear' } } },
        { label: 'PH-250 en planta', value: '3 prensas · MON-2608-11', state: { pending: { status: 'pending', chip: 'Bloquear' }, approved: { status: 'hold', chip: 'Bloqueadas' }, rejected: { status: 'rejected', chip: 'Sin bloqueo QM' } } },
        { label: 'Kit y visita técnica', value: 'JNT-2609-006 · 30/09', state: { pending: { status: 'pending', chip: 'Programar' }, approved: { status: 'ok', chip: 'Programada' }, rejected: { status: 'rejected', chip: 'No programada' } } },
        { label: 'Equipos en campo', value: '23 equipos · 11 clientes', state: { status: 'evaluate', chip: 'Aviso preventivo' } }
      ],
      effects: [
        'Outlook: respuesta enviada desde calidad@hidromec-ebro.example',
        'SAP S/4HANA (QM): bloqueo de calidad de 72 juntas del lote JNT-2607-031 y de 3 PH-250 de MON-2608-11',
        'Salesforce Service: orden de servicio de posventa para el 30/09 y caso REC-2026-0187 en curso',
        'SAP S/4HANA: NC-2026-0233 pasa a «En curso» con la respuesta adjunta'
      ],
      next_step: 'Siguiente paso: analizar la junta desmontada el 30/09 (D4), valorar la campaña del lote y enviar el 8D antes del 13/10/2026.',
      toast_approved: 'Respuesta enviada a Prensas y Servicios del Norte · 72 juntas y 3 prensas bloqueadas',
      reject_text: 'No se envía la respuesta, ni el kit, ni se bloquea nada. El motivo queda en el registro de auditoría.',
      reject_placeholder: 'Por ejemplo: esperar a que posventa confirme la visita antes de responder',
      reject_audit: 'no se envía ni se bloquea nada',
      toast_rejected: 'Respuesta rechazada: no se ha enviado nada ni se ha bloqueado ninguna junta'
    },
    compare: {
      rows: [
        { k: 'Personas que intervienen', hoy: '4–5: Calidad, posventa, producción, mantenimiento y compras', pro_strong: '1', pro: ': Calidad revisa, corrige si hace falta y aprueba' },
        { k: 'Sistemas que hay que abrir', hoy: '6: Outlook, Salesforce, Windchill, SAP, Opcenter y Maximo', pro_strong: '1', pro: ': esta consola; Agentic Platform consulta los 6' }
      ],
      steps_today: '15–20 búsquedas, cruces y redacciones a mano',
      time_label: 'Traza, 8D en borrador y respuesta',
      time_today: '3–6 h de trabajo, repartidas en 1–2 días',
      footer: 'Criterio de aceptación propuesto para el piloto: traza y borrador en menos de 15 minutos, y Calidad acepta el borrador con ediciones menores en al menos el 70 % de los casos.'
    },
    audit: {
      requested: { action: 'Análisis de reclamación solicitado', detail: 'REC-2026-0187 · correo de sat@psnorte.example del 28/09/2026 17:42' },
      analyzed: { action: 'Reclamación analizada', detail: 'REC-2026-0187 · PH250-26-0412 · lote JNT-2607-031' },
      after_analysis: [
        { action: 'No conformidad registrada en borrador', detail: 'NC-2026-0233 · SAP QM (aviso Q2) · vinculada a REC-2026-0187' },
        { action: 'Borrador 8D preparado', detail: 'NC-2026-0233 · D1–D8 · lote de juntas como hipótesis por confirmar' },
        { action: 'Respuesta al cliente redactada', detail: 'REC-2026-0187 · español · versión 1 · pendiente de aprobación' }
      ],
      approved: { action: 'Respuesta aprobada y enviada', detail: 'REC-2026-0187 · a sat@psnorte.example · NC-2026-0233' },
      after_approval: [
        { action: 'Bloqueo de calidad aplicado', detail: 'SAP QM · 72 juntas del lote JNT-2607-031 en C-14-03' },
        { action: 'Bloqueo de calidad aplicado', detail: 'SAP QM · PH250-26-0476, PH250-26-0477 y PH250-26-0478 (MON-2608-11)' },
        { action: 'Orden de servicio creada', detail: 'Salesforce Service · kit KJ-80 (lote JNT-2609-006) y visita a Estampaciones Nervión el 30/09' },
        { action: 'No conformidad actualizada', detail: 'NC-2026-0233 · En curso · respuesta adjunta' }
      ]
    },
    outcome_label: 'Respuesta enviada · NC-2026-0233 en curso',
    toast_analyzed: 'Reclamación analizada · 8D y respuesta en borrador',
    status_chips: { approved: 'Respuesta enviada · 8D en curso' },
    report: {
      button: 'Descargar informe 8D',
      title: 'Informe 8D · reclamación REC-2026-0187',
      subtitle: 'Fuga de aceite en el cilindro principal de la prensa PH-250 n.º PH250-26-0412 · lote de juntas JNT-2607-031 · Prensas y Servicios del Norte, Estampaciones Nervión',
      filename: 'informe-8D-NC-2026-0233-REC-2026-0187',
      meta: [['Planta', 'Zaragoza (PLAZA)'], ['Reclamación', 'REC-2026-0187 · 28/09/2026 · ref. cliente INC-PSN-0931'], ['Equipo', 'PH-250 · PH250-26-0412'], ['Informe al cliente', 'antes del 13/10/2026']],
      state: { pending: 'Borrador · pendiente de aprobación', approved: 'Aprobado para envío · D4 abierta', rejected: 'Borrador · respuesta rechazada' },
      summary: [
        'Reclamación en garantía de Prensas y Servicios del Norte, S.L. (distribuidor, Bilbao): fuga de aceite entre el vástago y la junta del cilindro principal de la prensa PH-250 n.º PH250-26-0412, instalada en Estampaciones Nervión (Basauri), a las 412 h. Sin daños personales.',
        'La prensa se montó el 29/07/2026 con 48 juntas KJ-80 del lote JNT-2607-031 (Sellados Ibéricos, lote proveedor SI-26-1187). Del lote, 1.104 juntas están montadas en 23 equipos en campo y 3 PH-250 en planta, 72 siguen en almacén y 24 se desecharon en recepción por rebaba en el labio.',
        'Hipótesis de causa, pendiente de confirmar con la junta desmontada: defecto de moldeo en el labio de las juntas del lote. La re-prueba del 28/09 encontró rezume en 2 de las 3 PH-250 del mismo lote que siguen en planta.'
      ],
      trace_heading: 'Anexo A · Traza del equipo y del lote',
      trace_rows: [
        { etapa: 'Proveedor', fecha: '14/07/2026', detalle: 'Sellados Ibéricos moldea el lote SI-26-1187 (PU 92 Shore A, labio de NBR) · certificado 3.1', ref: 'SI-26-1187' },
        { etapa: 'Recepción', fecha: '21/07/2026', detalle: '1.200 kits KJ-80 · muestreo ISO 2859-1 nivel II (80) conforme · 24 desechadas por rebaba en el labio', ref: 'JNT-2607-031' },
        { etapa: 'Mecanizado', fecha: '24/07/2026', detalle: 'Camisa CIL-250 en MC-02 y bruñida · vástago rectificado en RECT-01 (Ra 0,2 µm)', ref: 'OF 4100731' },
        { etapa: 'Montaje', fecha: '29/07/2026', detalle: 'Cilindro principal, cojín y extractor en LM-2 con 48 juntas del lote · par de la tapa conforme', ref: 'MON-2607-22' },
        { etapa: 'Prueba', fecha: '31/07/2026 10:20', detalle: 'Banco BP-1 · 312 bar (1,25 × nominal) 30 min · sin fuga ni rezume', ref: 'PRB-26-07-0918' },
        { etapa: 'Expedición', fecha: '03/08/2026 14:00', detalle: 'Transporte especial a Bilbao', ref: '80041977' },
        { etapa: 'Puesta en marcha', fecha: '04/08/2026', detalle: 'Instalada en Estampaciones Nervión (Basauri) por el servicio técnico del distribuidor', ref: 'PEM-26-0388' },
        { etapa: 'Revisión', fecha: '15/09/2026', detalle: 'Revisión de 250 h (cambio de filtro de retorno) sin anotaciones de fuga', ref: 'SRV-26-1402' },
        { etapa: 'Fallo', fecha: '24/09/2026', detalle: 'Fuga por el vástago del cilindro principal a 412 h y 230 bar', ref: 'INC-PSN-0931' },
        { etapa: 'Re-prueba', fecha: '28/09/2026', detalle: 'Rezume en PH250-26-0476 y PH250-26-0478 (mismo lote de juntas); PH250-26-0477 conforme', ref: 'MON-2608-11' }
      ],
      units: {
        heading: 'Anexo B · Juntas del lote JNT-2607-031 por destino',
        cols: [{ label: 'Destino', key: 'dest', mono: true }, { label: 'Equipos', key: 'eq' }, { label: 'Juntas', key: 'n', num: true }, { label: 'Fecha', key: 'fecha' }, { label: 'Estado', key: 'estado', status: true }],
        rows: [
          { dest: 'MON-2607-22', eq: '8 PH-250 y 2 GH-55 (incl. PH250-26-0412)', n: 432, fecha: '27–31/07/2026', estado: 'En campo' },
          { dest: 'MON-2608-03', eq: '7 PH-250 y 2 GH-55 (incl. PH250-26-0441)', n: 384, fecha: '03–07/08/2026', estado: 'En campo' },
          { dest: 'MON-2608-11', eq: '2 PH-250 y 2 GH-55', n: 192, fecha: '11–14/08/2026', estado: 'En campo' },
          { dest: 'MON-2608-11', eq: 'PH250-26-0476/0477/0478 (2 con rezume)', n: 144, fecha: '11–14/08/2026', estado: 'Retenidas por producción', estado_after: 'Bloqueadas en QM' },
          { dest: 'C-14-03', eq: '—', n: 72, fecha: '22/07/2026', estado: 'En almacén', estado_after: 'Bloqueadas en QM' },
          { dest: 'Desecho', eq: '—', n: 24, fecha: '21/07/2026', estado: 'Desechadas en recepción' }
        ]
      },
      history_heading: 'Anexo C · Reclamaciones anteriores (12 meses)',
      approvals: [
        { paso: 'Borradores 8D y respuesta', rol: 'Agentic Platform · agente Reclamaciones de cliente', kind: 'agent' },
        { paso: 'Respuesta al cliente y contención (D3)', rol: 'Responsable de Calidad', kind: 'reply' },
        { paso: 'Confirmación de la causa raíz (D4)', rol: 'Responsable de Calidad · Compras', kind: 'pending' },
        { paso: 'Cierre del 8D (D8)', rol: 'Responsable de Calidad', kind: 'pending' }
      ],
      second_signer: { role: 'Responsable de posventa', note: 'Visita técnica y recuperación de la junta (D3) · pendiente' }
    },
    presenter: {
      running: 'Mientras corre: señalar la línea de SAP (24 juntas del lote desechadas por rebaba en recepción), la re-prueba de Opcenter (rezume en 2 prensas del mismo lote) y la de Salesforce (dos fugas por junta en un año). Si hace falta, «Acelerar».',
      idle: [
        'Correo de Prensas y Servicios del Norte, distribuidor de Bilbao: una PH-250 entregada en agosto pierde aceite por el cilindro principal y su cliente tiene la prensa parada. Llegó ayer a las 17:42 con dos plazos: acuse en 24 horas y 8D en 10 días laborables.',
        'En producción, Agentic Platform lo analiza en cuanto entra en el buzón de Calidad. Aquí lo lanzamos a mano para ver qué hace y qué sistemas consulta.'
      ],
      pending: [
        'Lo resaltado en el correo es lo que Agentic Platform ha extraído. El número de serie se comprueba en la base instalada de Salesforce: existe, está en garantía y la placa coincide.',
        'La traza: del número de serie a la configuración as-built de Windchill, de ahí al lote de juntas JNT-2607-031 y hacia delante a los 23 equipos en campo con juntas del mismo lote, más 3 prensas y 72 juntas aún en planta.',
        'El dato que cambia la investigación: en la recepción del lote se desechó un 2 % de juntas por rebaba en el labio, y la re-prueba de ayer encontró rezume en 2 de las 3 prensas del mismo lote que siguen en planta. Es una hipótesis, no la causa: falta analizar la junta.',
        'Histórico: en noviembre hubo otra fuga con juntas del mismo proveedor. El 8D propone en D7 bloquear automáticamente un lote cuando el desecho en recepción pase del 1 %.',
        'La respuesta confirma hechos y fechas, manda técnico en 48 horas y no adelanta la causa ni habla de campaña. No sale hasta que Calidad la aprueba.'
      ],
      approved: [
        'Aprobada: respuesta enviada, 72 juntas y 3 prensas bloqueadas en SAP QM, visita técnica programada y NC-2026-0233 en curso. Todo queda en el registro de auditoría.',
        'La comparación de abajo: hoy, 4–5 personas y 6 sistemas durante horas; aquí, una revisión y una aprobación. La cifra de «hoy» la medimos en el piloto, no la inventamos.',
        'El informe 8D se descarga como documento controlado: código, revisión, estado, aprobaciones y número de página.'
      ],
      next: {
        pending: 'Pulsar «Revisar y aprobar» (arriba) o bajar hasta la respuesta y pulsar «Aprobar y enviar». Opcional: «Corregir» el número de serie con uno inexistente para enseñar que no inventa datos.',
        approved: 'Pulsar «Descargar informe 8D» y enseñar la cabecera del documento. Después, pasar a «Simulacro de trazabilidad» para la campaña del lote JNT-2607-031.'
      }
    }
  }
});
