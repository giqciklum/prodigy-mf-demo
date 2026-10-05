/* Hidromec Ebro · De palabras a workflow. Empresa ficticia; datos sintéticos de demostración (MFM).
 * Esquema documentado en la cabecera de assets/js/scenes/workflow.js. Regex sobre texto plegado (minúsculas, sin tildes). */
agenticPack('maquinaria', {
  workflow: {
    space: 'Calidad y Mantenimiento · Zaragoza',
    author: 'quality',
    authorNoun: 'Calidad',
    alarmMatch: 'vibraci[oó]n|husillo',
    approverRoles: ['maintenance', 'quality', 'quality_shift'],
    defaultPolicy: 'PR-CAL-004',
    approverRule: {
      policy: 'PR-CAL-004',
      text: 'solo Calidad y Mantenimiento aprueban bloqueos de piezas',
      note: 'Reasignada: PR-CAL-004 reserva los bloqueos a Calidad y Mantenimiento'
    },
    triggerExamples: '«Cuando la vibración del husillo supere…» o «Cada día a las 06:00…»',
    rolePatterns: [
      ['quality_shift', '\\btecnico de calidad(?: de turno)?\\b'],
      ['quality', '\\bresponsable de calidad\\b'],
      ['maintenance', '\\bjefe de mantenimiento\\b'],
      ['production', '\\bjefe de produccion\\b'],
      ['decider', '\\bjefe de planta\\b'],
      ['after_sales', '\\bresponsable de posventa\\b'],
      ['purchasing', '\\bcalidad de proveedor\\b']
    ],
    outOfScope: [
      {
        id: 'finanzas',
        re: '\\b(?:compr(?:a|ar|e|en|as)|vend(?:e|er|a|an)|invert(?:ir)?|inviert(?:e|a|an))\\b[^.;]{0,50}\\b(?:acciones (?:de|en)\\b|bolsa|bitcoins?|criptomonedas?|divisas|fondos de inversion)|\\btransferencias? bancarias?\\b|\\btransferir dinero\\b',
        title: 'Operación financiera',
        body: 'El texto pide comprar o vender acciones o mover dinero. Ningún agente del espacio Calidad y Mantenimiento · Zaragoza opera en mercados ni hace pagos, y Agentic Platform no crea pasos que no correspondan a un agente habilitado.'
      },
      {
        id: 'personas',
        re: '\\b(?:evalu\\w*|puntu\\w*|vigil\\w*|control\\w*|medir|mida|sancion\\w*|despid\\w*|rank\\w*)\\b[^.;]{0,40}\\b(?:trabajador\\w*|operari\\w*|emplead\\w*|plantilla|personal|personas|tornero\\w*)\\b',
        title: 'Evaluación de personas',
        body: 'El texto pide evaluar, vigilar o puntuar a personas. Los workflows de este espacio trabajan sobre máquinas, piezas, lotes, números de serie y documentos de calidad; no valoran el desempeño de nadie.'
      },
      {
        id: 'control',
        re: '\\b(?:cambi\\w*|modific\\w*|ajust\\w*|baj(?:ar|e|a)|sub(?:ir|e|a))\\b[^.;]{0,30}\\b(?:programas? (?:del )?cnc|parametros del cnc|avances?|velocidad del husillo|consignas?|presion de la prensa)\\b|\\b(?:arrancar|arranque|apagar|apague|encender|encienda)\\b[^.;]{0,25}\\b(?:centros? de mecanizado|husillos?|maquinas?|prensas?|compresor\\w*|robots?)\\b',
        title: 'Actuación sobre el control de las máquinas',
        body: 'El texto pide cambiar programas o parámetros del CNC, o arrancar y apagar máquinas. Agentic Platform lee IIoT Vibración y MES Opcenter, pero no escribe en el control de las máquinas: esos cambios los hace el personal de planta desde el CNC o el PLC, con la consignación de PR-SEG-002.'
      }
    ],
    idle: [
      ['bell', 'brand', 'Disparador', 'Una alarma de IIoT Vibración, un correo en el buzón de Posventa o una hora fija.'],
      ['cpu', '', 'Pasos y sistemas', 'Qué agente hace cada paso y qué sistema consulta o actualiza: SAP, Opcenter, Windchill, Maximo o Teams.'],
      ['user-check', 'warn', 'Aprobación humana', 'Quién decide antes de bloquear, retener o enviar, según PR-CAL-004.'],
      ['file-text', '', 'Salidas', 'Bloqueos, órdenes de trabajo, no conformidades, avisos e informes que deja el workflow.']
    ],
    idleNote: 'Cada elemento queda enlazado con la frase del texto de la que sale y se contrasta con los procedimientos de Calidad y Mantenimiento antes de guardar el borrador.',
    presenter: {
      idle: [
        'Así escribe Calidad un procedimiento: en castellano, como en su PR. No hay que dibujar ni programar nada.',
        'Agentic Platform lo convierte en un workflow de la plataforma: disparador, agentes en orden, aprobación humana y salidas, cada uno enlazado a su frase.',
        'Honestidad: el generador desde texto se simula aquí y su integración en Agentic Platform se valida en el piloto; los workflows (Routines), el editor, la aprobación y la auditoría son de serie.'
      ],
      outOfScopeExample: 'Compra acciones de una siderúrgica cuando baje el precio del acero'
    },

    templates: {
      alarma: {
        label: 'Vibración',
        icon: 'activity',
        refs: 'PR-MAN-011 y PR-CAL-004',
        text: 'Cuando la vibración del husillo de un centro de mecanizado de la planta de Zaragoza supere 4,5 mm/s RMS durante más de 30 minutos, confirmar la tendencia en IIoT Vibración y clasificarla según la zona de ISO 10816-3. Localizar las piezas mecanizadas en esa máquina desde el inicio del exceso, con su orden de fabricación y su lote. Proponer el bloqueo de calidad de esas piezas en SAP QM para metrología al 100 %, que debe aprobar el Jefe de mantenimiento antes de aplicarse. Si la vibración supera 7,1 mm/s, tratarla como avería crítica. Una vez aprobado el bloqueo, abrir una orden de trabajo en GMAO Maximo para la parada y la revisión de los rodamientos del husillo y avisar por Teams al Jefe de producción. Reasignar las órdenes de fabricación pendientes a otro centro de mecanizado equivalente.'
      },
      reclamacion: {
        label: 'Reclamación',
        icon: 'mail',
        refs: 'PR-CAL-004 y PR-CAL-008',
        text: 'Cuando llegue al buzón de Posventa una reclamación de un cliente o distribuidor por fuga de aceite o fallo de un equipo, registrarla en Salesforce Service (número de serie, modelo, defecto, fecha de entrega y plazo de respuesta) y enviar el acuse de recibo en 24 h. Trazar el número de serie hacia atrás (lotes de componentes, proveedores, montaje y banco de pruebas) y hacia delante (otros equipos montados con los mismos lotes). Preparar el borrador del informe 8D según PR-CAL-008, con las reclamaciones similares de los últimos 24 meses, y la respuesta al cliente. La respuesta la aprueba el Responsable de Calidad antes de enviarla; el informe 8D se entrega en 10 días laborables.'
      },
      parte: {
        label: 'Parte diario',
        icon: 'clipboard',
        refs: 'PR-MAN-011 y PR-CAL-004',
        text: 'Cada día a las 06:00, revisar las lecturas de los equipos de la planta en MES Opcenter e IIoT Vibración (centros de mecanizado, tornos, rectificadoras, bancos de pruebas hidráulicos y compresores) y compararlas con los umbrales de planta. Para cada equipo en aviso o crítico, abrir un aviso de mantenimiento en GMAO Maximo con la acción recomendada, sin duplicar las órdenes que ya estén abiertas. Si un equipo de metrología tiene la calibración vencida, proponer la retención de las piezas medidas desde la última calibración correcta, que debe aprobar el Responsable de Calidad. Publicar el resumen del parte en el canal de Teams de Mantenimiento.'
      }
    },

    catalog: {
      vibration_monitor: {
        agent: 'Monitor de vibraciones', icon: 'activity', systems: ['IIoT Vibración', 'MES Opcenter'],
        what: 'Lee la serie de vibración del husillo, confirma el exceso y lo clasifica según ISO 10816-3',
        name: 'Vibración del husillo', verb: 'revisar la vibración', token: 'vibracion',
        keywords: ['(?<!iiot )\\bvibraci\\w*', '\\bmm\\/s\\b', '\\biso 10816\\b'],
        strong: ['\\bconfirm\\w*', '\\bclasific\\w*', '\\bvigil\\w*']
      },
      part_traceability: {
        agent: 'Trazabilidad', icon: 'git-branch', systems: ['SAP S/4HANA', 'MES Opcenter', 'PLM Windchill'],
        what: 'Localiza piezas, órdenes, lotes de componente y números de serie, hacia atrás y hacia delante',
        name: 'Trazabilidad de piezas', verb: 'trazar piezas y lotes', token: 'traza',
        keywords: ['\\btrazab\\w*', '\\btraz(?:a|ar|alo|ala|alos|alas|ado|ados|ada|adas)\\b', ['\\blotes?\\b', '\\b(?:bloque\\w*|reten\\w*|retien\\w*|inmoviliz\\w*)\\s+(?:\\w+\\s+){0,2}$'], '\\b(?:localiz|identific)\\w*\\s+(?:los\\s+|las\\s+)?(?:piezas|lotes|equipos|numeros de serie)\\b', '\\bhacia (?:atras|delante)\\b'],
        strong: ['\\btraz(?:a|ar|alo|ala|alos|alas)\\b', '\\btrazab\\w*', '\\blocaliz\\w*', '\\bidentific\\w*']
      },
      quality_hold: {
        agent: 'Bloqueo de calidad', icon: 'lock', systems: ['SAP QM', 'MES Opcenter'], hitl: true, restricted: true, gateVerb: 'aplicar el bloqueo',
        what: 'Propone el bloqueo o la retención de piezas y solo lo aplica tras la aprobación',
        name: 'Bloqueo de piezas', verb: 'bloquear', token: 'bloqueo',
        keywords: ['\\bbloque\\w*', '\\breten\\w*', '\\bretien\\w*', '\\bcuarentena\\b', '\\binmoviliz\\w*'],
        strong: ['\\bbloque\\w*', '\\breten\\w*', '\\bretien\\w*', '\\binmoviliz\\w*', '\\bcuarentena\\b']
      },
      maintenance_order: {
        agent: 'Órdenes de mantenimiento', icon: 'wrench', systems: ['GMAO Maximo'],
        what: 'Abre la orden de trabajo en Maximo con la máquina, el síntoma y la acción recomendada',
        name: 'Orden de mantenimiento', verb: 'abrir la orden de trabajo', token: 'ot',
        keywords: ['\\borden(?:es)? de trabajo\\b', '\\brodamientos?\\b', '\\bmantenimiento correctivo\\b'],
        strong: ['\\borden(?:es)? de trabajo\\b', '\\bmantenimiento correctivo\\b']
      },
      quality_incident: {
        agent: 'Incidencias', icon: 'clipboard', systems: ['SAP QM', 'Microsoft Teams'],
        what: 'Abre la no conformidad con el borrador del 8D y envía los avisos',
        name: 'Incidencia de calidad', verb: 'abrir incidencia', token: 'incidencia',
        keywords: ['\\bincidencias?\\b', '\\bno conformidad(?:es)?\\b', '\\b8d\\b', '\\binforme\\b', '\\bavis(?:ar|e|a|en)\\b', '\\bnotific(?:ar|a|e|en)\\b', '\\bpublic\\w* el resumen\\b'],
        strong: ['\\bno conformidad\\b', '\\b8d\\b', '\\bincidencias?\\b', '\\bpublic\\w* el resumen\\b', '\\bavis(?:ar|e|a|en)\\b']
      },
      complaint_intake: {
        agent: 'Entrada de reclamaciones', icon: 'mail', systems: ['Outlook', 'Salesforce Service'],
        what: 'Registra la reclamación y extrae número de serie, modelo, defecto y plazo',
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
        agent: 'Parte diario de planta', icon: 'activity', systems: ['MES Opcenter', 'IIoT Vibración', 'GMAO Maximo'], multi: 2,
        what: 'Compara las lecturas con los umbrales de planta y abre avisos sin duplicar órdenes',
        name: 'Parte diario de planta', verb: 'hacer el parte de planta', token: 'parte-planta',
        keywords: ['\\bparte diario\\b', '\\blecturas de (?:los |las )?(?:equipos|maquinas)\\b', '\\bavisos? de mantenimiento\\b'],
        strong: ['\\brevis(?:ar|a|e)\\b', '\\blecturas\\b', '\\bavisos? de mantenimiento\\b']
      },
      production_planner: {
        agent: 'Planificación', icon: 'calendar', systems: ['SAP S/4HANA', 'MES Opcenter'],
        what: 'Reasigna órdenes de fabricación a otra máquina equivalente según capacidad',
        name: 'Replanificación de órdenes', verb: 'reasignar órdenes', token: 'replanifica',
        keywords: ['\\breasign\\w*', '\\breprogram\\w*', '\\breplanific\\w*'],
        strong: ['\\breasign\\w*', '\\breprogram\\w*', '\\breplanific\\w*']
      }
    },

    domains: {
      alarma: {
        first: 'vibration_monitor',
        slug: 'wf-vibracion-husillo',
        name: 'Vibración del husillo fuera de límite',
        approver: 'maintenance',
        approverOptions: ['maintenance', 'quality', 'quality_shift'],
        policy: 'PR-CAL-004',
        go: 'alarma',
        goLabel: 'Probarlo con la alarma del MC-04',
        next: 'La próxima alarma de vibración de IIoT lo ejecuta. La del MC-04 de las 05:50 sigue abierta.',
        trigger: {
          system: 'IIoT Vibración', type: 'vibracion', icon: 'activity', badges: ['IIoT Vibración'],
          label: 'Vibración del husillo > {threshold}', sub: 'más de {minutes}',
          entry: 'Alarma de IIoT Vibración recibida por webhook',
          full: 'Vibración del husillo > {threshold} durante más de {minutes}'
        },
        steps: {
          vibration_monitor: { sub: 'Crítica > {critical}', what: 'Lee la serie de vibración RMS del husillo, confirma el exceso y lo clasifica según ISO 10816-3 (crítica por encima de {critical})' },
          part_traceability: { sub: 'Piezas y órdenes', what: 'Piezas mecanizadas en la máquina desde el inicio del exceso, con su orden de fabricación, su lote y su número de serie' },
          quality_hold: { sub: 'Tras aprobar', what: 'Propone el bloqueo de calidad de las piezas expuestas para metrología al 100 %; se aplica en SAP QM y Opcenter solo tras la aprobación', outputs: [{ icon: 'lock', text: 'Piezas bloqueadas en SAP QM para metrología al 100 %, tras aprobar' }] },
          maintenance_order: { sub: 'OT y parada', what: 'Abre la orden de trabajo en Maximo para la parada y la revisión de los rodamientos del husillo', outputs: [{ icon: 'wrench', text: 'Orden de trabajo en GMAO Maximo para revisar los rodamientos' }] },
          quality_incident: { sub: 'Aviso por Teams', systems: ['Microsoft Teams'], what: 'Avisa por Teams {al:notify} con la máquina parada, las piezas bloqueadas y la orden de trabajo', outputs: [{ icon: 'message-square', text: 'Aviso por Teams {al:notify}' }] },
          production_planner: { sub: 'Reasigna la OF', what: 'Reasigna las órdenes de fabricación pendientes a otro centro de mecanizado equivalente con capacidad libre', outputs: [{ icon: 'calendar', text: 'Órdenes de fabricación reasignadas en Opcenter' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Informe de incidencia (PDF) con el registro de auditoría' }],
        params: [
          { key: 'threshold', label: 'Límite de vibración', name: 'Límite de vibración', type: 'number', unit: 'mm/s', min: 1, max: 11, step: 0.1, value: 4.5, ref: 'PR-MAN-011', hint: 'PR-MAN-011: 4,5 mm/s RMS (ISO 10816-3, zona D)', below: 'critical', extract: { from: 'trigger', re: '(\\d{1,2}(?:[.,]\\d{1,2})?)\\s*mm\\s*\\/\\s*s\\b' } },
          { key: 'minutes', label: 'Durante más de', name: 'Tiempo por encima del límite', type: 'number', unit: 'min', min: 1, max: 240, step: 1, value: 30, integer: true, ref: 'PR-MAN-011', hint: 'PR-MAN-011: 30 min', extract: { kind: 'minutes' } },
          { key: 'critical', label: 'Avería crítica', name: 'Avería crítica', type: 'number', unit: 'mm/s', min: 2, max: 20, step: 0.1, value: 7.1, above: 'threshold', ref: 'PR-MAN-011', hint: 'PR-MAN-011: 7,1 mm/s', hl: 'Crítico', extract: { from: 'sentence', near: '\\bcritic\\w*', re: '(\\d{1,2}(?:[.,]\\d{1,2})?)\\s*mm\\s*\\/\\s*s\\b' } },
          { key: 'approver', label: 'Aprueba el bloqueo', ref: 'PR-CAL-004', hint: 'PR-CAL-004: Calidad o Mantenimiento bloquean y liberan' },
          { key: 'notify', label: 'Aviso a', name: 'Aviso', type: 'role', value: 'production', options: ['production', 'quality_shift', 'decider'], ref: 'Política', hint: 'Por Microsoft Teams, para replanificar la máquina', extract: { kind: 'role', cap: 'quality_incident' } }
        ],
        check: { id: 'umbral', ref: 'PR-MAN-011', keys: ['threshold', 'minutes'], label: 'Límite y tiempo', describe: '{threshold} durante más de {minutes}', extra: 'crítica por encima de {critical}', action: 'Contrasta el límite con PR-MAN-011 e ISO 10816-3' },
        scenarios: [
          'la vibración del husillo de un centro de mecanizado supera {threshold} durante más de {minutes}',
          'salta una alarma de vibración en un centro de mecanizado o en un torno (p. ej. el MC-04 de Zaragoza)',
          'el usuario informa de que un husillo hace ruido o vibra más de lo normal',
          'hay que evaluar las piezas mecanizadas durante un exceso de vibración'
        ],
        testUtterance: 'Alarma: el husillo del MC-04 marca 7,8 mm/s desde hace 40 minutos',
        matchGroups: [
          { re: '\\bhusillos?\\b|\\bmc-\\d{2}\\b|\\bcentros? de mecanizado\\b|\\btornos?\\b|\\bmaquinas?\\b', w: 0.3, label: 'máquina' },
          { re: '\\bvibra\\w*|\\bmm\\/s\\b|\\brms\\b|\\bruido\\w*', w: 0.3, label: 'vibración' },
          { re: '\\balarma\\w*|\\bsupera\\w*|\\bmarca\\b|\\bsube\\b|\\bsubido\\b|\\bexceso\\b', w: 0.25, label: 'alarma' },
          { re: '\\bzaragoza\\b|\\bplaza\\b', w: 0.07, label: 'Zaragoza' }
        ],
        config: {
          vibration_monitor: [['limite_rms_mm_s', '{=threshold}'], ['minutos_por_encima', '{=minutes}'], ['critico_rms_mm_s', '{=critical}'], ['norma', 'ISO 10816-3']],
          quality_hold: [['aprobador', '{approver}'], ['politica', 'PR-CAL-004'], ['inspeccion', 'Metrología 100 %']],
          maintenance_order: [['tipo', 'Correctivo urgente'], ['ambito', 'Rodamientos del husillo']],
          quality_incident: [['aviso_a', '{notify}'], ['canal', 'Microsoft Teams']],
          production_planner: [['accion', 'Reasignar OF a centro equivalente']]
        },
        say: {
          draft: [
            'Cada frase está enlazada con lo que ha entendido: el disparador sale de «supere {threshold} durante más de {minutes}».',
            'Cada paso dice qué sistema toca: IIoT Vibración para el husillo; SAP, Opcenter y Windchill para piezas y lotes; SAP QM para el bloqueo; Maximo para la orden de trabajo.',
            'El bloqueo no se aplica sin la aprobación del {approver}: lo exige PR-CAL-004 y el workflow lo respeta aunque el texto no lo dijera.'
          ],
          published: ['Desde ahora, una alarma de vibración de IIoT lo dispara sola. Lo vemos con la alarma real de esta mañana: MC-04, 05:50.']
        }
      },
      reclamacion: {
        first: 'complaint_intake',
        slug: 'wf-reclamacion-cliente',
        name: 'Reclamación de cliente por fallo de equipo',
        approver: 'quality',
        approverOptions: ['quality', 'after_sales'],
        policy: 'PR-CAL-008',
        go: 'reclamacion',
        goLabel: 'Probarlo con la reclamación de la PH-250',
        next: 'El próximo correo de reclamación lo ejecuta. La de Prensas y Servicios del Norte (PH250-26-0412) está pendiente de respuesta.',
        trigger: {
          system: 'Outlook', type: 'correo', icon: 'mail', badges: ['Outlook'],
          label: 'Reclamación en el buzón de Posventa', sub: 'fuga o fallo de equipo',
          entry: 'Buzón de Posventa en Outlook',
          full: 'Reclamación de cliente en el buzón de Posventa por fuga o fallo de equipo'
        },
        steps: {
          complaint_intake: { sub: 'Acuse en {ack}', what: 'Registra la reclamación en Salesforce Service, extrae número de serie, modelo, defecto y plazo, y envía el acuse de recibo en {ack}', outputs: [{ icon: 'clipboard', text: 'Caso en Salesforce Service con sus datos extraídos' }] },
          part_traceability: { sub: 'Traza del n.º de serie', what: 'Traza el número de serie: lotes de componentes, proveedores, montaje y banco de pruebas; otros equipos con los mismos lotes', outputs: [{ icon: 'git-branch', text: 'Traza del equipo con lotes de componentes y equipos hermanos' }] },
          quality_incident: { sub: '8D en {days}', systems: ['SAP QM', 'Procedimientos'], what: 'Prepara el borrador del informe 8D (PR-CAL-008) con las reclamaciones similares de los últimos {months}', outputs: [{ icon: 'file-text', text: 'Borrador del informe 8D (PR-CAL-008), a entregar en {days}' }] },
          notifier: { sub: 'Tras aprobar', what: 'Redacta la respuesta al cliente; se envía por Outlook solo después de aprobarla', outputs: [{ icon: 'send', text: 'Respuesta al cliente, enviada tras la aprobación' }] }
        },
        params: [
          { key: 'ack', label: 'Acuse de recibo', name: 'Acuse de recibo', type: 'number', unit: 'h', min: 1, max: 72, step: 1, value: 24, integer: true, ref: 'PR-CAL-008', hint: 'PR-CAL-008: 24 h', extract: { from: 'text', re: '\\bacuse de recibo\\b[^.;]{0,40}?(\\d{1,3})\\s*(?:h|horas)\\b' } },
          { key: 'days', label: 'Informe 8D', name: 'Plazo del 8D', type: 'number', unit: 'días', unitLong: 'días laborables', min: 1, max: 30, step: 1, value: 10, integer: true, ref: 'PR-CAL-008', hint: 'PR-CAL-008: 10 días laborables', hl: 'Plazo del 8D', extract: { from: 'text', re: '(\\d{1,2})\\s*dias (?:laborables|habiles)\\b' } },
          { key: 'months', label: 'Histórico de reclamaciones', name: 'Histórico de reclamaciones', type: 'number', unit: 'meses', min: 1, max: 60, step: 1, value: 24, integer: true, ref: 'Política', hint: 'Histórico de Salesforce Service y SAP QM', hl: 'Histórico', extract: { from: 'text', re: '(\\d{1,2})\\s*meses\\b' } },
          { key: 'approver', label: 'Aprueba la respuesta', ref: 'PR-CAL-008', hint: 'Antes de enviar nada al cliente' }
        ],
        check: { id: 'plazos', ref: 'PR-CAL-008', keys: ['ack', 'days'], label: 'Plazos', describe: 'acuse en {ack} e informe 8D en {days}', action: 'Contrasta los plazos con PR-CAL-008' },
        scenarios: [
          'llega al buzón de Posventa la reclamación de un cliente o distribuidor por una fuga o un fallo de un equipo',
          'un cliente se queja de una prensa o de un grupo hidráulico y hay que investigar el número de serie',
          'hay que abrir un 8D a partir de una reclamación de cliente'
        ],
        testUtterance: 'Nos ha llegado una reclamación de un distribuidor por una fuga de aceite en una prensa PH-250',
        matchGroups: [
          { re: '\\breclam\\w*|\\bquej\\w*', w: 0.35, label: 'reclamación' },
          { re: '\\bclientes?\\b|\\bdistribuidor\\w*', w: 0.2, label: 'cliente' },
          { re: '\\bfugas?\\b|\\baceite\\b|\\brotura\\w*|\\bfallo\\w*|\\bruido\\w*|\\bdefecto\\w*|\\baveria\\w*', w: 0.25, label: 'defecto' },
          { re: '\\bprensas?\\b|\\bph-\\d|\\bgh-\\d|\\bnumero de serie\\b|\\bgrupo hidraulico\\b', w: 0.12, label: 'equipo' }
        ],
        config: {
          complaint_intake: [['acuse_horas', '{=ack}'], ['sistema', 'Salesforce Service']],
          quality_incident: [['plantilla', '8D · PR-CAL-008'], ['plazo_dias_laborables', '{=days}'], ['historico_meses', '{=months}']],
          notifier: [['idioma', 'el del cliente'], ['aprobador', '{approver}']]
        },
        say: {
          draft: [
            'Cada frase del texto está enlazada con lo que ha entendido: el correo de Posventa dispara el workflow, y los plazos salen del propio texto.',
            'La traza va del número de serie a los lotes de componentes y, de ahí, a otros equipos montados con los mismos lotes.',
            'Nada sale hacia el cliente sin la aprobación del {approver}: lo exige PR-CAL-008.'
          ],
          published: ['El próximo correo de reclamación lo ejecuta solo. Lo vemos con la de Prensas y Servicios del Norte.']
        }
      },
      parte: {
        first: 'plant_monitor',
        slug: 'wf-parte-diario-planta',
        name: 'Parte diario de equipos · Zaragoza',
        approver: 'quality',
        approverOptions: ['quality', 'quality_shift'],
        policy: 'PR-CAL-004',
        go: 'turno',
        goLabel: 'Ver el parte diario del turno',
        next: 'Se ejecuta cada día a las {time}.',
        trigger: {
          system: 'Programado', type: 'programado', icon: 'clock', badges: [],
          label: 'Cada día a las {time}', sub: 'Programado',
          entry: 'Programación diaria del servidor · {time}'
        },
        steps: {
          plant_monitor: { sub: 'Equipos de planta', what: 'Lee los equipos en Opcenter e IIoT Vibración, los compara con los umbrales de PR-MAN-011 y abre avisos en Maximo sin duplicar órdenes abiertas', outputs: [{ icon: 'ticket', text: 'Avisos de mantenimiento en GMAO Maximo, sin duplicar órdenes abiertas' }] },
          quality_hold: { sub: 'Si falla la calibración', gateVerb: 'retener piezas', what: 'Si un equipo de metrología tiene la calibración vencida, propone retener las piezas medidas desde la última calibración correcta (PR-CAL-004)', outputs: [{ icon: 'lock', text: 'Retención de las piezas medidas si falla una calibración, tras aprobar' }] },
          quality_incident: { sub: 'Resumen en Teams', systems: ['Microsoft Teams'], what: 'Publica el resumen del parte en el canal «Mantenimiento · Zaragoza»', outputs: [{ icon: 'message-square', text: 'Resumen en el canal de Teams «Mantenimiento · Zaragoza»' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Parte diario de equipos (PDF)' }],
        params: [
          { key: 'time', label: 'Hora del parte', name: 'Hora del parte', type: 'time', value: '06:00', ref: 'Política', hint: 'Lecturas de Opcenter e IIoT Vibración', extract: { kind: 'time' } },
          { key: 'approver', label: 'Aprueba la retención', ref: 'PR-CAL-004', hint: 'PR-CAL-004 · PR-MAN-011' }
        ],
        staticChecks: [
          { id: 'vibraciones', text: 'Umbrales de vibración según PR-MAN-011: aviso a 2,8 mm/s y límite a 4,5 mm/s (ISO 10816-3)', stream: { action: 'Contrasta el parte con PR-MAN-011', result: 'Zona C desde 2,8 mm/s · zona D desde 4,5 mm/s · equipos de metrología con calibración vigente' } }
        ],
        rules: [{ key: 'noDuplicate', re: '\\bsin duplicar\\b', label: 'Regla', check: 'Avisos sin duplicar las órdenes abiertas de GMAO Maximo' }],
        scenarios: [
          'son las {time} y toca el parte diario de los equipos de la planta de Zaragoza',
          'el usuario pide el parte diario de los equipos de la planta',
          'el usuario pregunta qué máquinas de la planta están dando problemas hoy'
        ],
        testUtterance: 'Haz el parte diario de la planta de Zaragoza',
        matchGroups: [
          { re: '\\bparte\\b', w: 0.35, label: 'parte' },
          { re: '\\bequipos?\\b|\\bplanta\\b|\\bmaquinas?\\b|\\blineas?\\b', w: 0.3, label: 'equipos' },
          { re: '\\bdiario\\b|\\bhoy\\b|\\bturno\\b', w: 0.15, label: 'diario' },
          { re: '\\bzaragoza\\b|\\bplaza\\b', w: 0.1, label: 'Zaragoza' }
        ],
        config: {
          plant_monitor: [['hora', '{time}'], ['equipos', 'Centros de mecanizado, tornos, rectificadoras, bancos de pruebas y compresores'], ['umbrales', 'PR-MAN-011'], ['avisos', 'GMAO Maximo, sin duplicar órdenes abiertas']],
          quality_hold: [['aprobador', '{approver}'], ['politica', 'PR-CAL-004']],
          quality_incident: [['canal', 'Microsoft Teams · Mantenimiento · Zaragoza']]
        },
        say: {
          draft: [
            'El parte es programado: cada día a las {time}, sin que nadie lo pida.',
            'Abre avisos en Maximo solo para lo que no tenga ya una orden abierta, y retiene piezas solo con aprobación del {approver}.'
          ],
          published: ['Mañana a las {time} lo ejecuta solo; el de hoy está en el resumen del turno.']
        }
      }
    }
  }
});
