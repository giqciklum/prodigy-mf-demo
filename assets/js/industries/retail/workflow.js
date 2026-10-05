/* Mercados Moncayo · De palabras a workflow. Empresa ficticia; datos sintéticos de demostración (MFM).
 * Esquema documentado en la cabecera de assets/js/scenes/workflow.js. Regex sobre texto plegado (minúsculas, sin tildes). */
agenticPack('retail', {
  workflow: {
    space: 'Calidad · Tiendas y plataforma',
    author: 'quality',
    authorNoun: 'Calidad',
    alarmMatch: 'cadena de fr[ií]o|mural',
    approverRoles: ['quality', 'quality_shift', 'supplier_quality', 'customer_service'],
    feminineRoles: ['decider'],
    defaultPolicy: 'APPCC-TIE-01',
    approverRule: {
      policy: 'APPCC-TIE-01',
      text: 'solo Calidad aprueba bloqueos de venta',
      note: 'Reasignada: APPCC-TIE-01 reserva los bloqueos de venta a Calidad'
    },
    triggerExamples: '«Cuando la temperatura de un mural supere…» o «Cada día a las 06:30…»',
    rolePatterns: [
      ['quality_shift', '\\btecnico de calidad(?: de guardia)?\\b'],
      ['quality', '\\bresponsable de calidad\\b'],
      ['store_ops', '\\bjefe de zona(?: de tiendas)?\\b'],
      ['maintenance', '\\bmantenimiento de frio\\b'],
      ['logistics', '\\bjefe de plataforma\\b'],
      ['customer_service', '\\batencion al consumidor\\b'],
      ['supplier_quality', '\\bcalidad de proveedores\\b'],
      ['decider', '\\bdirectora de operaciones\\b']
    ],
    outOfScope: [
      {
        id: 'finanzas',
        re: '\\b(?:compr(?:a|ar|e|en|as)|vend(?:e|er|a|an)|invert(?:ir)?|inviert(?:e|a|an))\\b[^.;]{0,50}\\b(?:acciones (?:de|en)\\b|bolsa|bitcoins?|criptomonedas?|divisas|fondos de inversion)|\\btransferencias? bancarias?\\b|\\btransferir dinero\\b',
        title: 'Operación financiera',
        body: 'El texto pide comprar o vender acciones o mover dinero. Ningún agente del espacio Calidad · Tiendas y plataforma opera en mercados ni hace pagos, y Agentic Platform no crea pasos que no correspondan a un agente habilitado.'
      },
      {
        id: 'personas',
        re: '\\b(?:evalu\\w*|puntu\\w*|vigil\\w*|control\\w*|medir|mida|sancion\\w*|despid\\w*|rank\\w*)\\b[^.;]{0,40}\\b(?:trabajador\\w*|cajer\\w*|reponedor\\w*|emplead\\w*|plantilla|personal|personas)\\b',
        title: 'Evaluación de personas',
        body: 'El texto pide evaluar, vigilar o puntuar a personas. Los workflows de este espacio trabajan sobre equipos de frío, productos, lotes y documentos de calidad; no valoran el desempeño de nadie.'
      },
      {
        id: 'precios',
        re: '\\b(?:cambi\\w*|modific\\w*|ajust\\w*|baj(?:ar|e|a)|sub(?:ir|e|a)|rebaj\\w*)\\b[^.;]{0,30}\\b(?:precios?|pvp|promociones?)\\b',
        title: 'Cambio de precios',
        body: 'El texto pide cambiar precios o promociones. Los precios los decide Comercial en SAP S/4 Retail con su propio circuito; los workflows de este espacio solo bloquean la venta de un producto por seguridad alimentaria, tras la aprobación de Calidad.'
      }
    ],
    idle: [
      ['bell', 'brand', 'Disparador', 'Una alarma de los sensores de frío, una reclamación desde la app de fidelización o una hora fija.'],
      ['cpu', '', 'Pasos y sistemas', 'Qué agente hace cada paso y qué sistema consulta o actualiza: SAP, WMS Manhattan, TPV, CRM o ServiceNow.'],
      ['user-check', 'warn', 'Aprobación humana', 'Quién decide antes de bloquear la venta o responder al consumidor, según APPCC-TIE-01 y PR-ATC-002.'],
      ['file-text', '', 'Salidas', 'Bloqueos de venta, tareas de tienda, órdenes de trabajo, expedientes e informes que deja el workflow.']
    ],
    idleNote: 'Cada elemento queda enlazado con la frase del texto de la que sale y se contrasta con el APPCC de tienda y los procedimientos de Calidad antes de guardar el borrador.',
    presenter: {
      idle: [
        'Así escribe Calidad un procedimiento: en castellano, como en su APPCC. No hay que dibujar ni programar nada.',
        'Agentic Platform lo convierte en un workflow de la plataforma: disparador, agentes en orden, aprobación humana y salidas, cada uno enlazado a su frase.',
        'Honestidad: el generador desde texto se simula aquí y su integración en Agentic Platform se valida en el piloto; los workflows (Routines), el editor, la aprobación y la auditoría son de serie.'
      ],
      outOfScopeExample: 'Baja el precio de los yogures que caduquen mañana en todas las tiendas'
    },

    templates: {
      alarma: {
        label: 'Cadena de frío',
        icon: 'thermometer',
        refs: 'APPCC-TIE-01 y PR-CAL-010',
        text: 'Cuando la temperatura de un mural refrigerado de una tienda supere 5 °C durante más de 2 horas, confirmar la lectura en los sensores de frío y clasificar la excursión según APPCC-TIE-01. Localizar las referencias y lotes que hay en el mural, con sus unidades y su fecha de caducidad. Proponer el bloqueo de venta en TPV del producto expuesto, que debe aprobar el Responsable de Calidad antes de aplicarse. Si la temperatura supera 8 °C, tratarla como rotura crítica de la cadena de frío. Una vez aprobado el bloqueo, crear la tarea de retirada y traslado a cámara para el equipo de tienda, abrir una orden de trabajo urgente a Mantenimiento de frío y avisar por Teams al Jefe de zona de tiendas.'
      },
      reclamacion: {
        label: 'Reclamación',
        icon: 'mail',
        refs: 'PR-ATC-002 y PR-PRO-006',
        text: 'Cuando un consumidor envíe una reclamación desde la app de fidelización por un cuerpo extraño en un producto de marca propia, registrarla en el CRM de fidelización (producto, lote, tienda, ticket de compra y plazo de respuesta) y enviar el acuse de recibo en 24 h. Trazar el lote hacia atrás (fabricante, recepción en plataforma y controles de entrada) y hacia delante (tiendas servidas y ventas en TPV). Pedir al fabricante de la marca propia su análisis de causa y la contramuestra del lote. Preparar el expediente de investigación según PR-ATC-002, con las reclamaciones similares de los últimos 12 meses, y la respuesta al consumidor. La respuesta la aprueba el Responsable de Calidad antes de enviarla; la respuesta al consumidor se envía en 48 h.'
      },
      parte: {
        label: 'Parte diario',
        icon: 'clipboard',
        refs: 'APPCC-TIE-01 e IT-TIE-014',
        text: 'Cada día a las 06:30, revisar las lecturas de los sensores y de los equipos de las 64 tiendas (murales, cámaras, arcones de congelado, hornos de pan y balanzas) y compararlas con los límites del APPCC de tienda. Para cada equipo en aviso o crítico, abrir un ticket en ServiceNow con la acción recomendada, sin duplicar las órdenes que ya estén abiertas. Si un mural ha estado por encima de su límite más de 2 horas, proponer el bloqueo de venta del producto expuesto, que debe aprobar el Responsable de Calidad. Publicar el resumen del parte en el canal de Teams de Operaciones de tienda.'
      }
    },

    catalog: {
      cold_monitor: {
        agent: 'Monitor de frío en tienda', icon: 'thermometer', systems: ['Sensores de frío'],
        what: 'Lee la serie de temperatura del equipo, confirma la excursión y la clasifica',
        name: 'Rotura de la cadena de frío', verb: 'revisar el frío', token: 'cadena-frio',
        keywords: ['\\btemperaturas?\\b', '\\bcadena de frio\\b', '\\bexcursion(?:es)?\\b', '\\bmural(?:es)? refrigerad\\w*', '\\bgrados\\b'],
        strong: ['\\bconfirm\\w*', '\\bclasific\\w*', '\\bvigil\\w*']
      },
      store_trace: {
        agent: 'Trazabilidad', icon: 'git-branch', systems: ['SAP S/4 Retail', 'WMS Manhattan', 'TPV tiendas'],
        what: 'Localiza referencias, lotes, tiendas y ventas, hacia atrás y hacia delante',
        name: 'Trazabilidad de lotes', verb: 'trazar lotes', token: 'traza',
        keywords: ['\\btrazab\\w*', '\\btraz(?:a|ar|alo|ala|alos|alas|ado|ados|ada|adas)\\b', ['\\blotes?\\b', '\\b(?:bloque\\w*|inmoviliz\\w*)\\s+(?:\\w+\\s+){0,2}$'], '\\b(?:localiz|identific)\\w*\\s+(?:los\\s+|las\\s+)?(?:referencias|lotes|productos|unidades)\\b', '\\bhacia (?:atras|delante)\\b'],
        strong: ['\\btraz(?:a|ar|alo|ala|alos|alas)\\b', '\\btrazab\\w*', '\\blocaliz\\w*', '\\bidentific\\w*']
      },
      sale_block: {
        agent: 'Bloqueo de venta', icon: 'lock', systems: ['TPV tiendas', 'SAP S/4 Retail'], hitl: true, restricted: true, gateVerb: 'aplicar el bloqueo de venta',
        what: 'Propone el bloqueo de venta en TPV y solo lo aplica tras la aprobación',
        name: 'Bloqueo de venta', verb: 'bloquear la venta', token: 'bloqueo',
        keywords: ['\\bbloque\\w*', '\\bretir\\w* de la venta\\b', '\\binmoviliz\\w*'],
        strong: ['\\bbloque\\w*', '\\bretir\\w* de la venta\\b', '\\binmoviliz\\w*']
      },
      store_task: {
        agent: 'Tareas de tienda', icon: 'clipboard', systems: ['ServiceNow', 'Microsoft Teams'],
        what: 'Crea la tarea para el equipo de tienda y sigue su cierre',
        name: 'Tarea de tienda', verb: 'crear la tarea de tienda', token: 'tarea',
        keywords: ['\\btareas?\\b', '\\btraslad\\w*'],
        strong: ['\\btareas?\\b', '\\btraslad\\w*']
      },
      cold_maintenance: {
        agent: 'Mantenimiento de frío', icon: 'wrench', systems: ['ServiceNow'],
        what: 'Abre la orden de trabajo para el técnico de frío con el equipo y el síntoma',
        name: 'Orden de mantenimiento de frío', verb: 'abrir la orden de trabajo', token: 'ot-frio',
        keywords: ['\\borden(?:es)? de trabajo\\b', '\\btecnico de frio\\b'],
        strong: ['\\borden(?:es)? de trabajo\\b', '\\btecnico de frio\\b']
      },
      incident: {
        agent: 'Incidencias de calidad', icon: 'clipboard', systems: ['ServiceNow', 'Microsoft Teams'],
        what: 'Abre la incidencia o el expediente de calidad y envía los avisos',
        name: 'Incidencia de calidad', verb: 'abrir incidencia', token: 'incidencia',
        keywords: ['\\bincidencias?\\b', '\\bno conformidad(?:es)?\\b', '\\bexpedientes?\\b', '\\binforme\\b', '\\bavis(?:ar|e|a|en)\\b', '\\bpublic\\w* el resumen\\b'],
        strong: ['\\bno conformidad\\b', '\\bexpediente\\b', '\\bincidencias?\\b', '\\bpublic\\w* el resumen\\b', '\\bavis(?:ar|e|a|en)\\b']
      },
      complaint_intake: {
        agent: 'Entrada de reclamaciones', icon: 'mail', systems: ['CRM Fidelización', 'Outlook'],
        what: 'Registra la reclamación y extrae producto, lote, tienda, ticket y plazo',
        name: 'Reclamación de consumidor', verb: 'registrar la reclamación', token: 'reclamacion',
        keywords: ['\\breclam\\w*', '\\bquej\\w*'],
        strong: ['\\bregistr\\w*', '\\bextraer\\b', '\\bdar de alta\\b']
      },
      supplier_claim: {
        agent: 'Calidad de proveedor', icon: 'factory', systems: ['Outlook', 'SAP S/4 Retail'],
        what: 'Pide al fabricante de la marca propia su análisis de causa y la contramuestra',
        name: 'Reclamación al fabricante', verb: 'reclamar al fabricante', token: 'fabricante',
        keywords: ['\\bpedir al fabricante\\b', '\\bfabricante de la marca propia\\b', '\\bcalidad de proveedores\\b'],
        strong: ['\\bpedir al fabricante\\b', '\\bfabricante de la marca propia\\b']
      },
      notifier: {
        agent: 'Respuesta al consumidor', icon: 'send', systems: ['CRM Fidelización', 'Outlook'], hitl: true, gateVerb: 'enviar la respuesta',
        what: 'Redacta la respuesta al consumidor y la envía tras aprobarla',
        name: 'Respuesta al consumidor', verb: 'responder al consumidor', token: 'respuesta',
        keywords: ['\\brespuesta al (?:consumidor|cliente)\\b', '\\bresponder al (?:consumidor|cliente)\\b'],
        strong: ['\\brespuesta al (?:consumidor|cliente)\\b', '\\bresponder al (?:consumidor|cliente)\\b']
      },
      store_monitor: {
        agent: 'Parte diario de tiendas', icon: 'activity', systems: ['Sensores de frío', 'TPV tiendas', 'ServiceNow'], multi: 2,
        what: 'Compara las lecturas de las tiendas con el APPCC y abre tickets sin duplicar órdenes',
        name: 'Parte diario de tiendas', verb: 'hacer el parte de tiendas', token: 'parte-tiendas',
        keywords: ['\\bparte diario\\b', '\\blecturas de (?:los |las )?(?:sensores|equipos)\\b', '\\btickets? en servicenow\\b'],
        strong: ['\\brevis(?:ar|a|e)\\b', '\\blecturas\\b', '\\btickets? en servicenow\\b']
      }
    },

    domains: {
      alarma: {
        first: 'cold_monitor',
        slug: 'wf-cadena-frio-tienda',
        name: 'Cadena de frío en murales de tienda',
        approver: 'quality',
        approverOptions: ['quality', 'quality_shift'],
        policy: 'APPCC-TIE-01',
        go: 'alarma',
        goLabel: 'Probarlo con la alarma de la T-027',
        next: 'La próxima alarma de los sensores de frío lo ejecuta. La del mural MR-3 de la T-027 de las 05:50 sigue abierta.',
        trigger: {
          system: 'Sensores de frío', type: 'temperatura', icon: 'thermometer', badges: ['Sensores de frío'],
          label: 'Temperatura del mural > {threshold}', sub: 'más de {minutes}',
          entry: 'Alarma de los sensores de frío recibida por webhook',
          full: 'Temperatura de un mural > {threshold} durante más de {minutes}'
        },
        steps: {
          cold_monitor: { sub: 'Crítica > {critical}', what: 'Lee la serie de temperatura del mural, confirma la excursión y la clasifica según APPCC-TIE-01 (crítica por encima de {critical})' },
          store_trace: { sub: 'Referencias y lotes', what: 'Referencias, lotes, unidades y caducidades que hay en el mural, con su stock en TPV y en SAP' },
          sale_block: { sub: 'Tras aprobar', what: 'Propone el bloqueo de venta en TPV del producto expuesto; se aplica en TPV y SAP solo tras la aprobación', outputs: [{ icon: 'lock', text: 'Bloqueo de venta en TPV del producto expuesto, tras aprobar' }] },
          store_task: { sub: 'Retirada y traslado', what: 'Crea la tarea de retirada del mural y traslado a cámara para el equipo de tienda', outputs: [{ icon: 'clipboard', text: 'Tarea de retirada y traslado a cámara para la tienda' }] },
          cold_maintenance: { sub: 'OT urgente', what: 'Abre la orden de trabajo urgente a Mantenimiento de frío con el mural, el síntoma y la serie de temperatura', outputs: [{ icon: 'wrench', text: 'Orden de trabajo urgente a Mantenimiento de frío' }] },
          incident: { sub: 'Aviso por Teams', systems: ['Microsoft Teams'], what: 'Avisa por Teams {al:notify} con la tienda, el mural, las unidades bloqueadas y la orden de trabajo', outputs: [{ icon: 'message-square', text: 'Aviso por Teams {al:notify}' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Informe de incidencia de frío (PDF) con el registro de auditoría' }],
        params: [
          { key: 'threshold', label: 'Límite del mural', name: 'Límite del mural', type: 'number', unit: '°C', min: 0, max: 12, step: 0.5, value: 5, ref: 'APPCC-TIE-01', hint: 'APPCC-TIE-01: refrigerados a 5 °C como máximo', below: 'critical', extract: { from: 'trigger', re: '(\\d{1,2}(?:[.,]\\d)?)\\s*(?:grados(?:\\s+centigrados)?|c)\\b' } },
          { key: 'minutes', label: 'Durante más de', name: 'Tiempo por encima del límite', type: 'number', unit: 'min', min: 1, max: 480, step: 5, value: 120, integer: true, ref: 'APPCC-TIE-01', hint: 'APPCC-TIE-01: 2 h (120 min)', extract: { kind: 'minutes' } },
          { key: 'critical', label: 'Rotura crítica', name: 'Rotura crítica', type: 'number', unit: '°C', min: 1, max: 20, step: 0.5, value: 8, above: 'threshold', ref: 'APPCC-TIE-01', hint: 'APPCC-TIE-01: 8 °C', hl: 'Crítico', extract: { from: 'sentence', near: '\\bcritic\\w*', re: '(\\d{1,2}(?:[.,]\\d)?)\\s*(?:grados(?:\\s+centigrados)?|c)\\b' } },
          { key: 'approver', label: 'Aprueba el bloqueo', ref: 'APPCC-TIE-01', hint: 'APPCC-TIE-01: solo Calidad bloquea y libera' },
          { key: 'notify', label: 'Aviso a', name: 'Aviso', type: 'role', value: 'store_ops', options: ['store_ops', 'logistics', 'decider'], ref: 'Política', hint: 'Por Microsoft Teams, para reponer el lineal', extract: { kind: 'role', cap: 'incident' } }
        ],
        check: { id: 'umbral', ref: 'APPCC-TIE-01', keys: ['threshold', 'minutes'], label: 'Límite y tiempo', describe: '{threshold} durante más de {minutes}', extra: 'crítica por encima de {critical}', action: 'Contrasta el límite con APPCC-TIE-01' },
        scenarios: [
          'un mural refrigerado de una tienda supera {threshold} durante más de {minutes}',
          'salta una alarma de temperatura en un mural, una cámara o un arcón de una tienda (p. ej. el MR-3 de la T-027 Huesca Centro)',
          'el encargado de tienda informa de que un mural pierde frío',
          'hay que decidir qué producto refrigerado se puede seguir vendiendo tras una rotura de la cadena de frío'
        ],
        testUtterance: 'Alarma: el mural MR-3 de la T-027 marca 9,4 °C desde hace más de dos horas',
        matchGroups: [
          { re: '\\bmural\\w*|\\bcamaras?\\b|\\barcon\\w*|\\bmr-\\d\\b|\\bt-\\d{3}\\b|\\btiendas?\\b', w: 0.3, label: 'mural' },
          { re: '\\btemperatura\\w*|\\bgrados\\b|\\d\\s*c\\b|\\bfrio\\b', w: 0.3, label: 'temperatura' },
          { re: '\\balarma\\w*|\\bexcursion\\w*|\\bsupera\\w*|\\bmarca\\b|\\bpierd\\w*|\\bsube\\b|\\bsubido\\b', w: 0.25, label: 'alarma' },
          { re: '\\bmoncayo\\b', w: 0.07, label: 'Mercados Moncayo' }
        ],
        config: {
          cold_monitor: [['limite_c', '{=threshold}'], ['minutos_por_encima', '{=minutes}'], ['critico_c', '{=critical}'], ['equipos', 'Murales refrigerados de tienda']],
          sale_block: [['aprobador', '{approver}'], ['politica', 'APPCC-TIE-01'], ['ambito', 'Producto expuesto por encima del límite']],
          store_task: [['tarea', 'Retirada del mural y traslado a cámara']],
          cold_maintenance: [['prioridad', 'Urgente'], ['destino', 'Mantenimiento de frío']],
          incident: [['aviso_a', '{notify}'], ['canal', 'Microsoft Teams']]
        },
        say: {
          draft: [
            'Cada frase está enlazada con lo que ha entendido: el disparador sale de «supere {threshold} durante más de {minutes}».',
            'Cada paso dice qué sistema toca: sensores de frío para la temperatura; SAP, WMS y TPV para referencias y lotes; TPV para el bloqueo de venta; ServiceNow para la tarea y la orden de trabajo.',
            'El bloqueo de venta no se aplica sin la aprobación del {approver}: lo exige APPCC-TIE-01 y el workflow lo respeta aunque el texto no lo dijera.'
          ],
          published: ['Desde ahora, una alarma de los sensores de frío lo dispara sola. Lo vemos con la alarma real de esta mañana: mural MR-3 de la T-027, 05:50.']
        }
      },
      reclamacion: {
        first: 'complaint_intake',
        slug: 'wf-reclamacion-consumidor',
        name: 'Reclamación de consumidor por cuerpo extraño',
        approver: 'quality',
        approverOptions: ['quality', 'supplier_quality', 'customer_service'],
        policy: 'PR-ATC-002',
        go: 'reclamacion',
        goLabel: 'Probarlo con la reclamación del lote L26214',
        next: 'La próxima reclamación desde la app lo ejecuta. La de Javier Lasheras (tomate frito, lote L26214) está pendiente de respuesta.',
        trigger: {
          system: 'CRM Fidelización', type: 'reclamacion', icon: 'mail', badges: ['CRM Fidelización'],
          label: 'Reclamación desde la app de fidelización', sub: 'cuerpo extraño en marca propia',
          entry: 'Formulario de la app de fidelización (CRM)',
          full: 'Reclamación de consumidor por cuerpo extraño en un producto de marca propia'
        },
        steps: {
          complaint_intake: { sub: 'Acuse en {ack}', what: 'Registra la reclamación en el CRM de fidelización, extrae producto, lote, tienda y ticket de compra, y envía el acuse de recibo en {ack}', outputs: [{ icon: 'clipboard', text: 'Reclamación registrada en el CRM con sus datos extraídos' }] },
          store_trace: { sub: 'Traza del lote', what: 'Traza el lote: fabricante, recepción en plataforma y controles de entrada; tiendas servidas y ventas en TPV', outputs: [{ icon: 'git-branch', text: 'Traza del lote con tiendas servidas y unidades vendidas' }] },
          supplier_claim: { sub: 'Al fabricante', what: 'Pide al fabricante de la marca propia su análisis de causa y la contramuestra del lote (PR-PRO-006)', outputs: [{ icon: 'factory', text: 'Solicitud de análisis de causa al fabricante' }] },
          incident: { sub: 'Expediente', systems: ['ServiceNow', 'Procedimientos'], what: 'Prepara el expediente de investigación (PR-ATC-002) con las reclamaciones similares de los últimos {months}', outputs: [{ icon: 'file-text', text: 'Expediente de investigación (PR-ATC-002)' }] },
          notifier: { sub: 'En {answer}, tras aprobar', what: 'Redacta la respuesta al consumidor; se envía por la app y por correo solo después de aprobarla, en {answer} como máximo', outputs: [{ icon: 'send', text: 'Respuesta al consumidor en {answer}, tras la aprobación' }] }
        },
        params: [
          { key: 'ack', label: 'Acuse de recibo', name: 'Acuse de recibo', type: 'number', unit: 'h', min: 1, max: 72, step: 1, value: 24, integer: true, ref: 'PR-ATC-002', hint: 'PR-ATC-002: 24 h', extract: { from: 'text', re: '\\bacuse de recibo\\b[^.;]{0,40}?(\\d{1,3})\\s*(?:h|horas)\\b' } },
          { key: 'answer', label: 'Respuesta al consumidor', name: 'Plazo de respuesta', type: 'number', unit: 'h', min: 1, max: 240, step: 1, value: 48, integer: true, ref: 'PR-ATC-002', hint: 'PR-ATC-002: 48 h', hl: 'Plazo', extract: { from: 'text', re: '\\brespuesta al consumidor\\b[^.;]{0,40}?(\\d{1,3})\\s*(?:h|horas)\\b' } },
          { key: 'months', label: 'Histórico de reclamaciones', name: 'Histórico de reclamaciones', type: 'number', unit: 'meses', min: 1, max: 36, step: 1, value: 12, integer: true, ref: 'Política', hint: 'Histórico del CRM de fidelización', hl: 'Histórico', extract: { from: 'text', re: '(\\d{1,2})\\s*meses\\b' } },
          { key: 'approver', label: 'Aprueba la respuesta', ref: 'PR-ATC-002', hint: 'Antes de enviar nada al consumidor' }
        ],
        check: { id: 'plazos', ref: 'PR-ATC-002', keys: ['ack', 'answer'], label: 'Plazos', describe: 'acuse en {ack} y respuesta en {answer}', action: 'Contrasta los plazos con PR-ATC-002' },
        scenarios: [
          'un consumidor envía desde la app una reclamación por un cuerpo extraño en un producto de marca propia',
          'un cliente se queja de un producto Moncayo y hay que investigar el lote con el fabricante',
          'hay que abrir un expediente de investigación a partir de una reclamación de consumidor'
        ],
        testUtterance: 'Un cliente reclama por un trozo de vidrio en un tarro de tomate frito Moncayo',
        matchGroups: [
          { re: '\\breclam\\w*|\\bquej\\w*', w: 0.35, label: 'reclamación' },
          { re: '\\bclient[ea]s?\\b|\\bconsumidor\\w*', w: 0.2, label: 'consumidor' },
          { re: '\\bvidrio\\b|\\bcristal\\b|\\bcuerpos? extran\\w*|\\bplastico\\w*|\\bmetal\\w*|\\bpelo\\b|\\binsecto\\w*|\\bdefecto\\w*', w: 0.25, label: 'cuerpo extraño' },
          { re: '\\bmarca propia\\b|\\bmoncayo\\b|\\blotes?\\b|\\btarro\\w*', w: 0.12, label: 'marca propia' }
        ],
        config: {
          complaint_intake: [['acuse_horas', '{=ack}'], ['sistema', 'CRM Fidelización']],
          supplier_claim: [['procedimiento', 'PR-PRO-006'], ['solicita', 'Análisis de causa y contramuestra']],
          incident: [['plantilla', 'Expediente PR-ATC-002'], ['historico_meses', '{=months}']],
          notifier: [['plazo_horas', '{=answer}'], ['canal', 'App de fidelización y correo'], ['aprobador', '{approver}']]
        },
        say: {
          draft: [
            'Cada frase del texto está enlazada con lo que ha entendido: la reclamación desde la app dispara el workflow y los plazos salen del propio texto.',
            'El fabricante de la marca propia entra en el circuito: se le pide el análisis de causa y la contramuestra.',
            'Nada sale hacia el consumidor sin la aprobación del {approver}: lo exige PR-ATC-002.'
          ],
          published: ['La próxima reclamación desde la app lo ejecuta sola. Lo vemos con la de Javier Lasheras.']
        }
      },
      parte: {
        first: 'store_monitor',
        slug: 'wf-parte-diario-tiendas',
        name: 'Parte diario de equipos de tienda',
        approver: 'quality',
        approverOptions: ['quality', 'quality_shift'],
        policy: 'APPCC-TIE-01',
        go: 'turno',
        goLabel: 'Ver el parte diario del turno',
        next: 'Se ejecuta cada día a las {time}.',
        trigger: {
          system: 'Programado', type: 'programado', icon: 'clock', badges: [],
          label: 'Cada día a las {time}', sub: 'Programado',
          entry: 'Programación diaria del servidor · {time}'
        },
        steps: {
          store_monitor: { sub: '64 tiendas', what: 'Lee los sensores y equipos de las 64 tiendas, los compara con los límites del APPCC de tienda y abre tickets en ServiceNow sin duplicar órdenes abiertas', outputs: [{ icon: 'ticket', text: 'Tickets en ServiceNow, sin duplicar órdenes abiertas' }] },
          sale_block: { sub: 'Si un mural se pasa', gateVerb: 'bloquear la venta', what: 'Si un mural ha estado por encima de su límite más de 2 h, propone el bloqueo de venta del producto expuesto (APPCC-TIE-01)', outputs: [{ icon: 'lock', text: 'Bloqueo de venta del producto expuesto, tras aprobar' }] },
          incident: { sub: 'Resumen en Teams', systems: ['Microsoft Teams'], what: 'Publica el resumen del parte en el canal «Operaciones de tienda»', outputs: [{ icon: 'message-square', text: 'Resumen en el canal de Teams «Operaciones de tienda»' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Parte diario de equipos de tienda (PDF)' }],
        params: [
          { key: 'time', label: 'Hora del parte', name: 'Hora del parte', type: 'time', value: '06:30', ref: 'Política', hint: 'Antes de la apertura de las tiendas', extract: { kind: 'time' } },
          { key: 'approver', label: 'Aprueba el bloqueo', ref: 'APPCC-TIE-01', hint: 'APPCC-TIE-01 · IT-TIE-014' }
        ],
        staticChecks: [
          { id: 'appcc', text: 'Límites del APPCC de tienda: refrigerados ≤ 5 °C, congelados ≤ −18 °C (APPCC-TIE-01)', stream: { action: 'Contrasta el parte con APPCC-TIE-01', result: 'Refrigerados ≤ 5 °C · congelados ≤ −18 °C · bloqueo de venta tras 2 h fuera de límite' } }
        ],
        rules: [{ key: 'noDuplicate', re: '\\bsin duplicar\\b', label: 'Regla', check: 'Tickets sin duplicar las órdenes abiertas de ServiceNow' }],
        scenarios: [
          'son las {time} y toca el parte diario de los equipos de las tiendas',
          'el usuario pide el parte diario de las tiendas',
          'el usuario pregunta qué tiendas tienen equipos dando problemas hoy'
        ],
        testUtterance: 'Haz el parte diario de los equipos de las tiendas',
        matchGroups: [
          { re: '\\bparte\\b', w: 0.35, label: 'parte' },
          { re: '\\btiendas?\\b|\\bequipos?\\b|\\bmurales\\b', w: 0.3, label: 'tiendas' },
          { re: '\\bdiario\\b|\\bhoy\\b|\\bturno\\b', w: 0.15, label: 'diario' },
          { re: '\\bmoncayo\\b|\\b64 tiendas\\b', w: 0.1, label: 'Mercados Moncayo' }
        ],
        config: {
          store_monitor: [['hora', '{time}'], ['tiendas', 64], ['equipos', 'Murales, cámaras, arcones, hornos y balanzas'], ['tickets', 'ServiceNow, sin duplicar órdenes abiertas']],
          sale_block: [['aprobador', '{approver}'], ['politica', 'APPCC-TIE-01']],
          incident: [['canal', 'Microsoft Teams · Operaciones de tienda']]
        },
        say: {
          draft: [
            'El parte es programado: cada día a las {time}, antes de abrir las tiendas.',
            'Abre tickets solo para lo que no tenga ya una orden abierta, y no bloquea la venta sin la aprobación del {approver}.'
          ],
          published: ['Mañana a las {time} lo ejecuta solo; el de hoy está en el resumen del turno.']
        }
      }
    }
  }
});
