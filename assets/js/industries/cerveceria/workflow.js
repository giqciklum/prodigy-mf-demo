/* Cervecera Bardenas · De palabras a workflow. Empresa ficticia; datos sintéticos de demostración (MFM).
 * Esquema documentado en la cabecera de assets/js/scenes/workflow.js. Regex sobre texto plegado (minúsculas, sin tildes). */
agenticPack('cerveceria', {
  workflow: {
    space: 'Calidad y Producción · Arguedas',
    author: 'quality',
    authorNoun: 'Calidad',
    alarmMatch: 'fermentador|fermentaci[oó]n',
    approverRoles: ['brewmaster', 'quality', 'quality_shift', 'customer_service'],
    feminineRoles: ['decider'],
    defaultPolicy: 'APPCC-01',
    approverRule: {
      policy: 'PR-FER-003',
      text: 'solo el Maestro cervecero y Calidad retienen lotes',
      note: 'Reasignada: PR-FER-003 reserva las retenciones al Maestro cervecero y a Calidad'
    },
    triggerExamples: '«Cuando la temperatura de un fermentador supere…» o «Cada día a las 06:00…»',
    rolePatterns: [
      ['quality_shift', '\\btecnico de calidad(?: de turno)?\\b'],
      ['quality', '\\bresponsable de calidad\\b'],
      ['brewmaster', '\\bmaestro cervecero\\b'],
      ['maintenance', '\\bjefe de mantenimiento\\b'],
      ['decider', '\\bjef[ae] de produccion\\b'],
      ['logistics', '\\bresponsable de logistica\\b'],
      ['customer_service', '\\batencion al cliente\\b(?! una)'],
      ['customer_quality', '\\bcalidad del cliente\\b']
    ],
    outOfScope: [
      {
        id: 'finanzas',
        re: '\\b(?:compr(?:a|ar|e|en|as)|vend(?:e|er|a|an)|invert(?:ir)?|inviert(?:e|a|an))\\b[^.;]{0,50}\\b(?:acciones (?:de|en)\\b|bolsa|bitcoins?|criptomonedas?|divisas|fondos de inversion|futuros de cebada)|\\btransferencias? bancarias?\\b|\\btransferir dinero\\b',
        title: 'Operación financiera',
        body: 'El texto pide comprar o vender acciones, futuros o mover dinero. Ningún agente del espacio Calidad y Producción · Arguedas opera en mercados ni hace pagos, y Agentic Platform no crea pasos que no correspondan a un agente habilitado.'
      },
      {
        id: 'personas',
        re: '\\b(?:evalu\\w*|puntu\\w*|vigil\\w*|control\\w*|medir|mida|sancion\\w*|despid\\w*|rank\\w*)\\b[^.;]{0,40}\\b(?:trabajador\\w*|operari\\w*|emplead\\w*|plantilla|personal|personas|cerveceros)\\b',
        title: 'Evaluación de personas',
        body: 'El texto pide evaluar, vigilar o puntuar a personas. Los workflows de este espacio trabajan sobre depósitos, lotes, análisis y documentos de calidad; no valoran el desempeño de nadie.'
      },
      {
        id: 'control',
        re: '\\b(?:cambi\\w*|modific\\w*|ajust\\w*|baj(?:ar|e|a)|sub(?:ir|e|a))\\b[^.;]{0,30}\\b(?:consignas?|setpoints?|recetas?)\\b|\\b(?:parar|pare|paren|arrancar|arranque|apagar|apague|encender|encienda|abrir la valvula|cerrar la valvula)\\b[^.;]{0,25}\\b(?:llenador\\w*|pasteurizador\\w*|fermentador\\w*|filtro\\w*|compresor\\w*|glicol)\\b',
        title: 'Actuación sobre el control de planta',
        body: 'El texto pide cambiar consignas o recetas, o actuar sobre válvulas y equipos. Agentic Platform lee el SCADA de bodega y Brewmaxx, pero no escribe en el control de planta: esos cambios los hace el personal de bodega desde su sistema.'
      }
    ],
    idle: [
      ['bell', 'brand', 'Disparador', 'Una alarma del SCADA de bodega, un correo en el buzón de Atención al cliente o una hora fija.'],
      ['cpu', '', 'Pasos y sistemas', 'Qué agente hace cada paso y qué sistema consulta o actualiza: SAP, Brewmaxx, LIMS, Maximo o Teams.'],
      ['user-check', 'warn', 'Aprobación humana', 'Quién decide antes de retener, analizar o responder, según PR-FER-003 y APPCC-01.'],
      ['file-text', '', 'Salidas', 'Retenciones de lote, análisis, órdenes de trabajo, informes y avisos que deja el workflow.']
    ],
    idleNote: 'Cada elemento queda enlazado con la frase del texto de la que sale y se contrasta con el APPCC y los procedimientos de bodega antes de guardar el borrador.',
    presenter: {
      idle: [
        'Así escribe Calidad un procedimiento: en castellano, como en su APPCC. No hay que dibujar ni programar nada.',
        'Agentic Platform lo convierte en un workflow de la plataforma: disparador, agentes en orden, aprobación humana y salidas, cada uno enlazado a su frase.',
        'Honestidad: el generador desde texto se simula aquí y su integración en Agentic Platform se valida en el piloto; los workflows (Routines), el editor, la aprobación y la auditoría son de serie.'
      ],
      outOfScopeExample: 'Baja la consigna de todos los fermentadores un grado cuando suba la temperatura'
    },

    templates: {
      alarma: {
        label: 'Fermentación',
        icon: 'thermometer',
        refs: 'PR-FER-003 y APPCC-01',
        text: 'Cuando la temperatura de un fermentador de la bodega supere 13,5 °C durante más de 2 horas, confirmar la lectura en el SCADA de bodega y clasificar la desviación según PR-FER-003. Localizar el lote de mosto del fermentador, su receta, su día de fermentación y los trasiegos planificados. Proponer la retención de calidad del lote en SAP y los análisis de diacetilo y acetaldehído en LIMS LabWare, que debe aprobar el Maestro cervecero antes de aplicarse. Si la temperatura supera 15 °C, tratarla como desviación crítica. Una vez aprobada la retención, abrir una orden de trabajo en GMAO Maximo para la válvula de glicol. Reprogramar el trasiego del lote en Brewmaxx y comunicárselo por Teams a la Jefa de producción.'
      },
      reclamacion: {
        label: 'Reclamación',
        icon: 'mail',
        refs: 'APPCC-01 y PR-CAL-006',
        text: 'Cuando llegue al buzón de Atención al cliente una reclamación de un cliente de hostelería o un distribuidor por sabor anómalo, turbidez o cuerpo extraño, registrarla en SAP (cliente, producto, lote de barril o de botella, defecto y plazo de respuesta) y enviar el acuse de recibo en 24 h. Trazar el lote hacia atrás (cocimiento, fermentador, filtración, envasado, malta, lúpulo y CO₂) y hacia delante (palés, expediciones y clientes). Programar en LIMS LabWare el análisis de la contramuestra del lote (oxígeno disuelto, diacetilo y cata del panel). Preparar el informe de investigación según PR-CAL-006, con las reclamaciones similares de los últimos 12 meses, y la respuesta al cliente. La respuesta la aprueba el Responsable de Calidad antes de enviarla; la respuesta al cliente se envía en 48 h.'
      },
      parte: {
        label: 'Parte diario',
        icon: 'clipboard',
        refs: 'APPCC-01 y PR-ENV-002',
        text: 'Cada día a las 06:00, revisar las lecturas de los equipos de la fábrica en Brewmaxx, el SCADA de bodega y GMAO Maximo (sala de cocimiento, fermentadores, filtro, pasteurizador túnel, llenadoras de botella y barril, e inspector de botellas vacías) y compararlas con los umbrales de fábrica. Para cada equipo en aviso o crítico, abrir un aviso de mantenimiento en GMAO Maximo con la acción recomendada, sin duplicar las órdenes que ya estén abiertas. Si el inspector de botellas vacías (PCC de vidrio) tiene la verificación vencida, proponer la retención del producto envasado desde la última verificación correcta, que debe aprobar el Responsable de Calidad. Publicar el resumen del parte en el canal de Teams de Producción.'
      }
    },

    catalog: {
      ferment_monitor: {
        agent: 'Monitor de bodega', icon: 'thermometer', systems: ['SCADA bodega', 'Brewmaxx (MES)'],
        what: 'Lee la serie de temperatura del fermentador, confirma la desviación y la clasifica',
        name: 'Desviación de fermentación', verb: 'revisar la fermentación', token: 'fermentacion',
        keywords: ['\\btemperaturas?\\b', '\\bgrados\\b', '\\bdesviacion de (?:la )?fermentacion\\b'],
        strong: ['\\bconfirm\\w*', '\\bclasific\\w*', '\\bvigil\\w*']
      },
      lot_trace: {
        agent: 'Trazabilidad', icon: 'git-branch', systems: ['SAP S/4HANA', 'Brewmaxx (MES)', 'WMS Mecalux'],
        what: 'Localiza lotes de mosto, materias primas, envasado y expediciones, hacia atrás y hacia delante',
        name: 'Trazabilidad de lotes', verb: 'trazar lotes', token: 'traza',
        keywords: ['\\btrazab\\w*', '\\btraz(?:a|ar|alo|ala|alos|alas|ado|ados|ada|adas)\\b', ['\\blotes?\\b', '\\b(?:bloque\\w*|reten\\w*|retien\\w*|inmoviliz\\w*)\\s+(?:\\w+\\s+){0,2}$'], '\\b(?:localiz|identific)\\w*\\s+(?:el\\s+|los\\s+|las\\s+)?(?:lotes?|barriles|palets?|pales|expediciones)\\b', '\\bhacia (?:atras|delante)\\b'],
        strong: ['\\btraz(?:a|ar|alo|ala|alos|alas)\\b', '\\btrazab\\w*', '\\blocaliz\\w*', '\\bidentific\\w*']
      },
      quality_hold: {
        agent: 'Retención de calidad', icon: 'lock', systems: ['SAP S/4HANA', 'Brewmaxx (MES)'], hitl: true, restricted: true, gateVerb: 'aplicar la retención',
        what: 'Propone la retención del lote o del producto envasado y solo la aplica tras la aprobación',
        name: 'Retención de lote', verb: 'retener', token: 'retencion',
        keywords: ['\\bbloque\\w*', '\\breten\\w*', '\\bretien\\w*', '\\bcuarentena\\b', '\\binmoviliz\\w*'],
        strong: ['\\bbloque\\w*', '\\breten\\w*', '\\bretien\\w*', '\\binmoviliz\\w*', '\\bcuarentena\\b']
      },
      lab_analysis: {
        agent: 'Laboratorio', icon: 'flask', systems: ['LIMS LabWare'],
        what: 'Programa los análisis en LIMS y recoge los resultados',
        name: 'Análisis de laboratorio', verb: 'analizar', token: 'analisis',
        keywords: ['\\bdiacetilo\\b', '\\bacetaldehido\\b', '\\banalisis de (?:la )?contramuestra\\b'],
        strong: ['\\banalisis de (?:la )?contramuestra\\b', '\\bdiacetilo\\b']
      },
      maintenance_order: {
        agent: 'Mantenimiento', icon: 'wrench', systems: ['GMAO Maximo'],
        what: 'Abre la orden de trabajo en Maximo con el equipo, el síntoma y la acción recomendada',
        name: 'Orden de mantenimiento', verb: 'abrir la orden de trabajo', token: 'ot',
        keywords: ['\\borden(?:es)? de trabajo\\b', '\\bvalvula de glicol\\b'],
        strong: ['\\borden(?:es)? de trabajo\\b']
      },
      incident: {
        agent: 'Incidencias', icon: 'clipboard', systems: ['SAP S/4HANA', 'Microsoft Teams'],
        what: 'Abre la no conformidad o el informe de investigación y envía los avisos',
        name: 'Incidencia de calidad', verb: 'abrir incidencia', token: 'incidencia',
        keywords: ['\\bincidencias?\\b', '\\bno conformidad(?:es)?\\b', '\\binforme\\b', '\\bavis(?:ar|e|a|en)\\b', '\\bpublic\\w* el resumen\\b'],
        strong: ['\\bno conformidad\\b', '\\binforme\\b', '\\bincidencias?\\b', '\\bpublic\\w* el resumen\\b', '\\bavis(?:ar|e|a|en)\\b']
      },
      production_plan: {
        agent: 'Planificación de bodega', icon: 'calendar', systems: ['Brewmaxx (MES)', 'SAP S/4HANA'],
        what: 'Reprograma trasiegos, filtraciones y envasados del lote afectado',
        name: 'Replanificación de bodega', verb: 'reprogramar el trasiego', token: 'replanifica',
        keywords: ['\\breprogram\\w*', '\\breplanific\\w*'],
        strong: ['\\breprogram\\w*', '\\breplanific\\w*']
      },
      complaint_intake: {
        agent: 'Entrada de reclamaciones', icon: 'mail', systems: ['Outlook', 'SAP S/4HANA'],
        what: 'Registra la reclamación y extrae cliente, producto, lote, defecto y plazo',
        name: 'Reclamación de cliente', verb: 'registrar la reclamación', token: 'reclamacion',
        keywords: ['\\breclam\\w*', '\\bquej\\w*'],
        strong: ['\\bregistr\\w*', '\\bextraer\\b', '\\bdar de alta\\b']
      },
      notifier: {
        agent: 'Respuesta al cliente', icon: 'send', systems: ['Outlook'], hitl: true, gateVerb: 'enviar la respuesta',
        what: 'Redacta la respuesta al cliente y la envía tras aprobarla',
        name: 'Respuesta al cliente', verb: 'responder al cliente', token: 'respuesta',
        keywords: ['\\brespuesta al cliente\\b', '\\bresponder al cliente\\b', '\\bcontestar al cliente\\b'],
        strong: ['\\brespuesta al cliente\\b', '\\bresponder al cliente\\b', '\\bcontestar al cliente\\b']
      },
      plant_monitor: {
        agent: 'Parte diario de fábrica', icon: 'activity', systems: ['Brewmaxx (MES)', 'SCADA bodega', 'GMAO Maximo'], multi: 2,
        what: 'Compara las lecturas con los umbrales de fábrica y abre avisos sin duplicar órdenes',
        name: 'Parte diario de fábrica', verb: 'hacer el parte de fábrica', token: 'parte-fabrica',
        keywords: ['\\bparte diario\\b', '\\blecturas de (?:los |las )?(?:equipos|maquinas)\\b', '\\bavisos? de mantenimiento\\b'],
        strong: ['\\brevis(?:ar|a|e)\\b', '\\blecturas\\b', '\\bavisos? de mantenimiento\\b']
      }
    },

    domains: {
      alarma: {
        first: 'ferment_monitor',
        slug: 'wf-temperatura-fermentador',
        name: 'Desviación de temperatura en fermentador',
        approver: 'brewmaster',
        approverOptions: ['brewmaster', 'quality', 'quality_shift'],
        policy: 'PR-FER-003',
        go: 'alarma',
        goLabel: 'Probarlo con la alarma del FV-12',
        next: 'La próxima alarma del SCADA de bodega lo ejecuta. La del FV-12 de las 05:50 sigue abierta.',
        trigger: {
          system: 'SCADA bodega', type: 'temperatura', icon: 'thermometer', badges: ['SCADA bodega'],
          label: 'Temperatura del fermentador > {threshold}', sub: 'más de {minutes}',
          entry: 'Alarma del SCADA de bodega recibida por webhook',
          full: 'Temperatura de un fermentador > {threshold} durante más de {minutes}'
        },
        steps: {
          ferment_monitor: { sub: 'Crítica > {critical}', what: 'Lee la serie de temperatura del fermentador y la apertura de la válvula de glicol, confirma la desviación y la clasifica según PR-FER-003 (crítica por encima de {critical})' },
          lot_trace: { sub: 'Lote de mosto', what: 'Lote de mosto del fermentador, receta, día de fermentación, volumen y trasiegos planificados en Brewmaxx' },
          quality_hold: { sub: 'Tras aprobar', what: 'Propone la retención de calidad del lote en SAP; se aplica solo tras la aprobación', outputs: [{ icon: 'lock', text: 'Lote retenido en SAP S/4HANA, tras aprobar' }] },
          lab_analysis: { sub: 'Diacetilo y acetaldehído', what: 'Programa en LIMS LabWare los análisis de diacetilo (VDK) y acetaldehído del lote', outputs: [{ icon: 'flask', text: 'Análisis de diacetilo y acetaldehído programados en LIMS' }] },
          maintenance_order: { sub: 'Válvula de glicol', what: 'Abre la orden de trabajo en Maximo para revisar la válvula de glicol del fermentador', outputs: [{ icon: 'wrench', text: 'Orden de trabajo en GMAO Maximo para la válvula de glicol' }] },
          production_plan: { sub: 'Trasiego y aviso', systems: ['Brewmaxx (MES)', 'Microsoft Teams'], what: 'Reprograma en Brewmaxx el trasiego del lote hasta tener los resultados de laboratorio y lo comunica por Teams {al:notify}', outputs: [{ icon: 'calendar', text: 'Trasiego reprogramado en Brewmaxx' }, { icon: 'message-square', text: 'Aviso por Teams {al:notify}' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Informe de desviación (PDF) con el registro de auditoría' }],
        params: [
          { key: 'threshold', label: 'Límite del fermentador', name: 'Límite del fermentador', type: 'number', unit: '°C', min: 4, max: 25, step: 0.5, value: 13.5, ref: 'PR-FER-003', hint: 'PR-FER-003: 13,5 °C (consigna lager 12 °C)', below: 'critical', extract: { from: 'trigger', re: '(\\d{1,2}(?:[.,]\\d)?)\\s*(?:grados(?:\\s+centigrados)?|c)\\b' } },
          { key: 'minutes', label: 'Durante más de', name: 'Tiempo por encima del límite', type: 'number', unit: 'min', min: 1, max: 480, step: 5, value: 120, integer: true, ref: 'PR-FER-003', hint: 'PR-FER-003: 2 h (120 min)', extract: { kind: 'minutes' } },
          { key: 'critical', label: 'Desviación crítica', name: 'Desviación crítica', type: 'number', unit: '°C', min: 5, max: 30, step: 0.5, value: 15, above: 'threshold', ref: 'PR-FER-003', hint: 'PR-FER-003: 15 °C', hl: 'Crítico', extract: { from: 'sentence', near: '\\bcritic\\w*', re: '(\\d{1,2}(?:[.,]\\d)?)\\s*(?:grados(?:\\s+centigrados)?|c)\\b' } },
          { key: 'approver', label: 'Aprueba la retención', ref: 'PR-FER-003', hint: 'PR-FER-003: decide el Maestro cervecero' },
          { key: 'notify', label: 'Aviso a', name: 'Aviso', type: 'role', value: 'decider', options: ['decider', 'maintenance', 'logistics'], ref: 'Política', hint: 'Por Microsoft Teams, para replanificar la bodega', extract: { kind: 'role', cap: 'production_plan' } }
        ],
        check: { id: 'umbral', ref: 'PR-FER-003', keys: ['threshold', 'minutes'], label: 'Límite y tiempo', describe: '{threshold} durante más de {minutes}', extra: 'crítica por encima de {critical}', action: 'Contrasta el límite con PR-FER-003' },
        scenarios: [
          'la temperatura de un fermentador supera {threshold} durante más de {minutes}',
          'salta una alarma de temperatura en un fermentador o un tanque de guarda (p. ej. el FV-12 de Arguedas)',
          'el bodeguero informa de que un fermentador no enfría',
          'hay que decidir qué hacer con un lote de mosto tras una desviación de fermentación'
        ],
        testUtterance: 'Alarma: el FV-12 marca 16,8 °C desde hace más de tres horas',
        matchGroups: [
          { re: '\\bfermentador\\w*|\\bfv-\\d+\\b|\\bbodega\\b|\\btanques?\\b|\\bdepositos?\\b', w: 0.3, label: 'fermentador' },
          { re: '\\btemperatura\\w*|\\bgrados\\b|\\d\\s*c\\b|\\bglicol\\b|\\benfria\\w*', w: 0.3, label: 'temperatura' },
          { re: '\\balarma\\w*|\\bdesviacion\\w*|\\bsupera\\w*|\\bmarca\\b|\\bsube\\b|\\bsubido\\b', w: 0.25, label: 'alarma' },
          { re: '\\barguedas\\b|\\bbardenas\\b', w: 0.07, label: 'Arguedas' }
        ],
        config: {
          ferment_monitor: [['limite_c', '{=threshold}'], ['minutos_por_encima', '{=minutes}'], ['critico_c', '{=critical}'], ['equipos', 'Fermentadores y tanques de guarda']],
          quality_hold: [['aprobador', '{approver}'], ['politica', 'PR-FER-003']],
          lab_analysis: [['analisis', 'Diacetilo (VDK) · acetaldehído'], ['sistema', 'LIMS LabWare']],
          maintenance_order: [['ambito', 'Válvula de glicol del fermentador']],
          production_plan: [['accion', 'Reprogramar trasiego hasta resultados de LIMS'], ['aviso_a', '{notify}'], ['canal', 'Microsoft Teams']]
        },
        say: {
          draft: [
            'Cada frase está enlazada con lo que ha entendido: el disparador sale de «supere {threshold} durante más de {minutes}».',
            'Cada paso dice qué sistema toca: el SCADA para la temperatura; SAP y Brewmaxx para el lote; LIMS para los análisis; Maximo para la válvula de glicol.',
            'La retención no se aplica sin la aprobación del {approver}: lo exige PR-FER-003 y el workflow lo respeta aunque el texto no lo dijera.'
          ],
          published: ['Desde ahora, una alarma del SCADA de bodega lo dispara sola. Lo vemos con la alarma real de esta mañana: FV-12, 05:50.']
        }
      },
      reclamacion: {
        first: 'complaint_intake',
        slug: 'wf-reclamacion-cliente',
        name: 'Reclamación de cliente por defecto de producto',
        approver: 'quality',
        approverOptions: ['quality', 'brewmaster', 'customer_service'],
        policy: 'PR-CAL-006',
        go: 'reclamacion',
        goLabel: 'Probarlo con la reclamación del lote L2608-K14',
        next: 'El próximo correo de reclamación lo ejecuta. La de Distribuciones Hosteleras Ribera (lote L2608-K14) está pendiente de respuesta.',
        trigger: {
          system: 'Outlook', type: 'correo', icon: 'mail', badges: ['Outlook'],
          label: 'Reclamación en el buzón de Atención al cliente', sub: 'sabor, turbidez o cuerpo extraño',
          entry: 'Buzón de Atención al cliente en Outlook',
          full: 'Reclamación de cliente por sabor anómalo, turbidez o cuerpo extraño'
        },
        steps: {
          complaint_intake: { sub: 'Acuse en {ack}', what: 'Registra la reclamación en SAP, extrae cliente, producto, lote de barril o de botella y defecto, y envía el acuse de recibo en {ack}', outputs: [{ icon: 'clipboard', text: 'Reclamación registrada en SAP con sus datos extraídos' }] },
          lot_trace: { sub: 'Traza completa', what: 'Traza el lote: cocimiento, fermentador, filtración, envasado y materias primas; palés, expediciones y clientes', outputs: [{ icon: 'git-branch', text: 'Traza del lote con materias primas y clientes servidos' }] },
          lab_analysis: { sub: 'Contramuestra', what: 'Programa en LIMS el análisis de la contramuestra del lote: oxígeno disuelto, diacetilo y cata del panel', outputs: [{ icon: 'flask', text: 'Análisis de la contramuestra programado en LIMS' }] },
          incident: { sub: 'Informe', systems: ['SAP S/4HANA', 'Procedimientos'], what: 'Prepara el informe de investigación (PR-CAL-006) con las reclamaciones similares de los últimos {months}', outputs: [{ icon: 'file-text', text: 'Informe de investigación (PR-CAL-006)' }] },
          notifier: { sub: 'En {answer}, tras aprobar', what: 'Redacta la respuesta al cliente; se envía por Outlook solo después de aprobarla, en {answer} como máximo', outputs: [{ icon: 'send', text: 'Respuesta al cliente en {answer}, tras la aprobación' }] }
        },
        params: [
          { key: 'ack', label: 'Acuse de recibo', name: 'Acuse de recibo', type: 'number', unit: 'h', min: 1, max: 72, step: 1, value: 24, integer: true, ref: 'APPCC-01', hint: 'APPCC-01: 24 h', extract: { from: 'text', re: '\\bacuse de recibo\\b[^.;]{0,40}?(\\d{1,3})\\s*(?:h|horas)\\b' } },
          { key: 'answer', label: 'Respuesta al cliente', name: 'Plazo de respuesta', type: 'number', unit: 'h', min: 1, max: 240, step: 1, value: 48, integer: true, ref: 'Política', hint: 'Política de atención al cliente: 48 h', hl: 'Plazo', extract: { from: 'text', re: '\\brespuesta al cliente\\b[^.;]{0,40}?(\\d{1,3})\\s*(?:h|horas)\\b' } },
          { key: 'months', label: 'Histórico de reclamaciones', name: 'Histórico de reclamaciones', type: 'number', unit: 'meses', min: 1, max: 36, step: 1, value: 12, integer: true, ref: 'Política', hint: 'Histórico de SAP y LIMS', hl: 'Histórico', extract: { from: 'text', re: '(\\d{1,2})\\s*meses\\b' } },
          { key: 'approver', label: 'Aprueba la respuesta', ref: 'PR-CAL-006', hint: 'Antes de enviar nada al cliente' }
        ],
        check: { id: 'plazos', ref: 'la política de atención al cliente', keys: ['ack', 'answer'], label: 'Plazos', describe: 'acuse en {ack} y respuesta en {answer}', action: 'Contrasta los plazos con la política de atención al cliente' },
        scenarios: [
          'llega al buzón de Atención al cliente la reclamación de un bar o un distribuidor por sabor anómalo, turbidez o cuerpo extraño',
          'un cliente de hostelería se queja de unos barriles y hay que investigar el lote',
          'hay que abrir un informe de investigación a partir de una reclamación de cliente'
        ],
        testUtterance: 'Un distribuidor reclama barriles de Bardenas Lager con sabor a cartón',
        matchGroups: [
          { re: '\\breclam\\w*|\\bquej\\w*', w: 0.35, label: 'reclamación' },
          { re: '\\bclient[ea]s?\\b|\\bdistribuidor\\w*|\\bbar(?:es)?\\b|\\bhosteleria\\b', w: 0.2, label: 'cliente' },
          { re: '\\bsabor\\w*|\\bcarton\\b|\\boxida\\w*|\\bturbi\\w*|\\bcuerpos? extran\\w*|\\bvidrio\\b', w: 0.25, label: 'defecto' },
          { re: '\\blotes?\\b|\\bbarril\\w*|\\bbotellas?\\b|\\blager\\b|\\btostada\\b', w: 0.12, label: 'lote' }
        ],
        config: {
          complaint_intake: [['acuse_horas', '{=ack}'], ['sistema', 'SAP S/4HANA']],
          lab_analysis: [['analisis', 'Oxígeno disuelto · diacetilo · cata del panel']],
          incident: [['plantilla', 'Informe de investigación · PR-CAL-006'], ['historico_meses', '{=months}']],
          notifier: [['plazo_horas', '{=answer}'], ['aprobador', '{approver}']]
        },
        say: {
          draft: [
            'Cada frase del texto está enlazada con lo que ha entendido: el correo del cliente dispara el workflow y los plazos salen del propio texto.',
            'La traza llega a la malta, el lúpulo y el CO₂ del lote, y el laboratorio analiza la contramuestra antes de responder.',
            'Nada sale hacia el cliente sin la aprobación del {approver}.'
          ],
          published: ['El próximo correo de reclamación lo ejecuta solo. Lo vemos con la de Distribuciones Hosteleras Ribera.']
        }
      },
      parte: {
        first: 'plant_monitor',
        slug: 'wf-parte-diario-fabrica',
        name: 'Parte diario de equipos · Arguedas',
        approver: 'quality',
        approverOptions: ['quality', 'quality_shift', 'brewmaster'],
        policy: 'PR-ENV-002',
        go: 'turno',
        goLabel: 'Ver el parte diario del turno',
        next: 'Se ejecuta cada día a las {time}.',
        trigger: {
          system: 'Programado', type: 'programado', icon: 'clock', badges: [],
          label: 'Cada día a las {time}', sub: 'Programado',
          entry: 'Programación diaria del servidor · {time}'
        },
        steps: {
          plant_monitor: { sub: 'Equipos de fábrica', what: 'Lee los equipos en Brewmaxx, el SCADA de bodega y Maximo, los compara con los umbrales de fábrica y abre avisos sin duplicar órdenes abiertas', outputs: [{ icon: 'ticket', text: 'Avisos de mantenimiento en GMAO Maximo, sin duplicar órdenes abiertas' }] },
          quality_hold: { sub: 'Si falla el PCC de vidrio', gateVerb: 'retener producto', what: 'Si el inspector de botellas vacías (PCC de vidrio) tiene la verificación vencida, propone retener el producto envasado desde la última verificación correcta (PR-ENV-002)', outputs: [{ icon: 'lock', text: 'Retención del producto envasado si falla el PCC de vidrio, tras aprobar' }] },
          incident: { sub: 'Resumen en Teams', systems: ['Microsoft Teams'], what: 'Publica el resumen del parte en el canal «Producción · Arguedas»', outputs: [{ icon: 'message-square', text: 'Resumen en el canal de Teams «Producción · Arguedas»' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Parte diario de equipos (PDF)' }],
        params: [
          { key: 'time', label: 'Hora del parte', name: 'Hora del parte', type: 'time', value: '06:00', ref: 'Política', hint: 'Lecturas de Brewmaxx y el SCADA de bodega', extract: { kind: 'time' } },
          { key: 'approver', label: 'Aprueba la retención', ref: 'PR-ENV-002', hint: 'PR-ENV-002 · APPCC-01' }
        ],
        staticChecks: [
          { id: 'pcc', text: 'Inspector de botellas vacías como PCC de vidrio: verificación con botellas patrón al inicio de cada turno (PR-ENV-002)', stream: { action: 'Contrasta el parte con APPCC-01 y PR-ENV-002', result: 'Inspector de botellas vacías es PCC: verificación con patrones al inicio de cada turno' } }
        ],
        rules: [{ key: 'noDuplicate', re: '\\bsin duplicar\\b', label: 'Regla', check: 'Avisos sin duplicar las órdenes abiertas de GMAO Maximo' }],
        scenarios: [
          'son las {time} y toca el parte diario de los equipos de la fábrica de Arguedas',
          'el usuario pide el parte diario de los equipos de la fábrica',
          'el usuario pregunta qué equipos de bodega o envasado están dando problemas hoy'
        ],
        testUtterance: 'Haz el parte diario de la fábrica de Arguedas',
        matchGroups: [
          { re: '\\bparte\\b', w: 0.35, label: 'parte' },
          { re: '\\bequipos?\\b|\\bfabrica\\b|\\blineas?\\b|\\bbodega\\b|\\benvasado\\b', w: 0.3, label: 'equipos' },
          { re: '\\bdiario\\b|\\bhoy\\b|\\bturno\\b', w: 0.15, label: 'diario' },
          { re: '\\barguedas\\b|\\bbardenas\\b', w: 0.1, label: 'Arguedas' }
        ],
        config: {
          plant_monitor: [['hora', '{time}'], ['equipos', 'Cocimiento, fermentadores, filtro, pasteurizador, llenadoras e inspector de botellas'], ['avisos', 'GMAO Maximo, sin duplicar órdenes abiertas']],
          quality_hold: [['aprobador', '{approver}'], ['politica', 'PR-ENV-002 · APPCC-01']],
          incident: [['canal', 'Microsoft Teams · Producción · Arguedas']]
        },
        say: {
          draft: [
            'El parte es programado: cada día a las {time}, sin que nadie lo pida.',
            'Abre avisos solo para lo que no tenga ya una orden abierta, y retiene producto solo con la aprobación del {approver}.'
          ],
          published: ['Mañana a las {time} lo ejecuta solo; el de hoy está en el resumen del turno.']
        }
      }
    }
  }
});
