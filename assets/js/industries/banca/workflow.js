/* Banco Cierzo · De palabras a workflow. Entidad ficticia; datos sintéticos de demostración (MFM).
 * Esquema documentado en la cabecera de assets/js/scenes/workflow.js. Regex sobre texto plegado (minúsculas, sin tildes). */
agenticPack('banca', {
  workflow: {
    space: 'Operaciones · Madrid',
    author: 'decider',
    authorNoun: 'Operaciones',
    alarmMatch: 'fraude',
    approverRoles: ['fraud', 'fraud_shift', 'cards', 'customer_service', 'compliance'],
    defaultPolicy: 'POL-FRA-003',
    approverRule: {
      policy: 'POL-FRA-003',
      text: 'solo Prevención del Fraude y Medios de Pago aprueban bloqueos de tarjetas',
      note: 'Reasignada: POL-FRA-003 reserva los bloqueos a Prevención del Fraude'
    },
    triggerExamples: '«Cuando la tasa de fraude de un BIN supere…» o «Cada día a las 07:00…»',
    rolePatterns: [
      ['fraud', '\\bresponsable de prevencion del fraude\\b'],
      ['fraud_shift', '\\banalista de fraude(?: de turno)?\\b'],
      ['cards', '\\bresponsable de medios de pago\\b'],
      ['customer_service', '\\bservicio de atencion al cliente\\b|\\bsac\\b(?! una)'],
      ['compliance', '\\bresponsable de cumplimiento(?: normativo)?\\b'],
      ['it_risk', '\\briesgo tecnologico\\b'],
      ['decider', '\\bdirector de operaciones\\b']
    ],
    outOfScope: [
      {
        id: 'finanzas',
        re: '\\b(?:compr(?:a|ar|e|en|as)|vend(?:e|er|a|an)|invert(?:ir)?|inviert(?:e|a|an))\\b[^.;]{0,50}\\b(?:acciones (?:de|en)\\b|bolsa|bitcoins?|criptomonedas?|divisas|fondos de inversion)|\\btransferencias? bancarias?\\b|\\btransferir dinero\\b',
        title: 'Operación financiera',
        body: 'El texto pide comprar o vender activos o mover dinero entre cuentas. Ningún agente del espacio Operaciones · Madrid opera en mercados ni ordena transferencias, y Agentic Platform no crea pasos que no correspondan a un agente habilitado.'
      },
      {
        id: 'personas',
        re: '\\b(?:evalu\\w*|puntu\\w*|vigil\\w*|control\\w*|medir|mida|sancion\\w*|despid\\w*|rank\\w*)\\b[^.;]{0,40}\\b(?:trabajador\\w*|emplead\\w*|gestor\\w*|plantilla|personal|personas|analistas)\\b',
        title: 'Evaluación de personas',
        body: 'El texto pide evaluar, vigilar o puntuar a empleados. Los workflows de este espacio trabajan sobre tarjetas, operaciones, comercios y expedientes; no valoran el desempeño de nadie.'
      },
      {
        id: 'credito',
        re: '\\b(?:conced\\w*|deneg\\w*|ampli\\w*|reduc\\w*|sub(?:ir|e|a)|baj(?:ar|e|a))\\b[^.;]{0,40}\\b(?:prestamos?|hipotecas?|creditos?|limites? de credito|scoring)\\b',
        title: 'Decisión de crédito',
        body: 'El texto pide conceder, denegar o cambiar crédito. Las decisiones de riesgo de crédito siguen el circuito de admisión del banco y no se automatizan en este espacio: Agentic Platform no crea pasos que decidan sobre la solvencia de un cliente.'
      }
    ],
    idle: [
      ['bell', 'brand', 'Disparador', 'Una alerta de Falcon Fraud, un correo en el buzón del SAC o una hora fija.'],
      ['cpu', '', 'Pasos y sistemas', 'Qué agente hace cada paso y qué sistema consulta o actualiza: T24, Falcon, Redsys, Salesforce FSC o ServiceNow.'],
      ['user-check', 'warn', 'Aprobación humana', 'Quién decide antes de bloquear, abonar o responder, según POL-FRA-003 y PR-SAC-001.'],
      ['file-text', '', 'Salidas', 'Reglas de bloqueo, reemisiones, avisos a clientes, expedientes e informes que deja el workflow.']
    ],
    idleNote: 'Cada elemento queda enlazado con la frase del texto de la que sale y se contrasta con las políticas de fraude, SAC y DORA antes de guardar el borrador.',
    presenter: {
      idle: [
        'Así escribe Operaciones un procedimiento: en castellano, como en su política. No hay que dibujar ni programar nada.',
        'Agentic Platform lo convierte en un workflow de la plataforma: disparador, agentes en orden, aprobación humana y salidas, cada uno enlazado a su frase.',
        'Honestidad: el generador desde texto se simula aquí y su integración en Agentic Platform se valida en el piloto; los workflows (Routines), el editor, la aprobación y la auditoría son de serie.'
      ],
      outOfScopeExample: 'Concede un préstamo preaprobado a los clientes que tengan la nómina domiciliada'
    },

    templates: {
      alarma: {
        label: 'Fraude en tarjetas',
        icon: 'shield',
        refs: 'POL-FRA-003 y PR-TAR-007',
        text: 'Cuando la tasa de fraude en compras sin tarjeta presente de un BIN supere el 1 % durante más de 30 minutos, confirmar el pico en Falcon Fraud y clasificarlo por comercio, canal y país. Localizar las operaciones sospechosas, las tarjetas afectadas y sus titulares en el core bancario. Proponer una regla de bloqueo preventivo en Falcon para el comercio electrónico de riesgo alto del BIN, que debe aprobar el Responsable de Prevención del Fraude antes de activarse. Si la tasa supera el 2,5 %, tratar el pico como crítico. Una vez aprobada la regla, solicitar la reemisión de las tarjetas comprometidas, enviar un SMS y una notificación en la app a los clientes afectados y avisar por Teams al Responsable de Medios de Pago.'
      },
      reclamacion: {
        label: 'Reclamación',
        icon: 'mail',
        refs: 'PR-SAC-001 y PR-TAR-007',
        text: 'Cuando llegue al buzón del SAC una reclamación de un cliente que no reconoce cargos con su tarjeta, registrarla en Salesforce FSC (cliente, tarjeta, operaciones, importes y plazo de respuesta) y enviar el acuse de recibo en 24 h. Trazar las operaciones en Redsys y Falcon Fraud hacia atrás (autenticación reforzada, dispositivo y comercio) y hacia delante (otras tarjetas usadas en el mismo comercio). Proponer el abono provisional de los cargos no reconocidos antes del fin del día hábil siguiente, según PSD2. Preparar el expediente del caso según PR-SAC-001, con las reclamaciones similares de los últimos 12 meses, y la respuesta al cliente. El abono y la respuesta los aprueba el Servicio de Atención al Cliente antes de aplicarlos; el expediente se resuelve en 15 días hábiles.'
      },
      parte: {
        label: 'Parte diario',
        icon: 'clipboard',
        refs: 'POL-FRA-003 y PR-DORA-002',
        text: 'Cada día a las 07:00, revisar los indicadores de los canales en Redsys, Falcon Fraud y ServiceNow (tasa de aceptación, denegaciones, fraude por canal, disponibilidad de TPV y cajeros, y caídas de servicio) y compararlos con los umbrales del Centro de Operaciones. Para cada indicador en aviso o crítico, abrir un ticket en ServiceNow con la acción recomendada, sin duplicar los tickets que ya estén abiertos. Si una regla de bloqueo preventivo lleva más de 72 h activa, proponer mantenerla o retirarla, que debe aprobar el Responsable de Prevención del Fraude. Publicar el resumen del parte en el canal de Teams de Operaciones.'
      }
    },

    catalog: {
      fraud_monitor: {
        agent: 'Monitor de fraude', icon: 'shield', systems: ['Falcon Fraud', 'Redsys'],
        what: 'Lee la tasa de fraude por BIN, canal y comercio, confirma el pico y lo clasifica',
        name: 'Pico de fraude', verb: 'revisar el fraude', token: 'fraude',
        keywords: ['\\btasa de fraude\\b', '\\boperaciones sospechosas\\b', '\\bbin\\b', '\\bpico de fraude\\b'],
        strong: ['\\bconfirm\\w*', '\\bclasific\\w*', '\\bvigil\\w*']
      },
      card_trace: {
        agent: 'Trazabilidad de operaciones', icon: 'git-branch', systems: ['Core bancario T24', 'Redsys', 'Falcon Fraud'],
        what: 'Localiza operaciones, tarjetas, comercios y titulares afectados, hacia atrás y hacia delante',
        name: 'Traza de operaciones', verb: 'trazar operaciones', token: 'traza',
        keywords: ['\\btrazab\\w*', '\\btraz(?:a|ar|alo|ala|alos|alas|ado|ados|ada|adas)\\b', '\\b(?:localiz|identific)\\w*\\s+(?:los\\s+|las\\s+)?(?:operaciones|tarjetas|titulares|comercios)\\b', '\\bhacia (?:atras|delante)\\b'],
        strong: ['\\btraz(?:a|ar|alo|ala|alos|alas)\\b', '\\btrazab\\w*', '\\blocaliz\\w*', '\\bidentific\\w*']
      },
      card_block: {
        agent: 'Bloqueo preventivo', icon: 'lock', systems: ['Falcon Fraud', 'Core bancario T24'], hitl: true, restricted: true, gateVerb: 'activar el bloqueo',
        what: 'Propone la regla de bloqueo o el bloqueo de tarjetas y solo lo aplica tras la aprobación',
        name: 'Bloqueo de tarjetas', verb: 'bloquear', token: 'bloqueo',
        keywords: ['\\bbloque\\w*', '\\bcongel\\w* (?:las |la )?tarjetas?\\b'],
        strong: ['\\bbloque\\w*', '\\bcongel\\w*']
      },
      card_reissue: {
        agent: 'Reemisión de tarjetas', icon: 'repeat', systems: ['Core bancario T24'],
        what: 'Solicita la reemisión de las tarjetas comprometidas según PR-TAR-007',
        name: 'Reemisión de tarjetas', verb: 'reemitir tarjetas', token: 'reemision',
        keywords: ['\\breemisi\\w*', '\\breemit\\w*'],
        strong: ['\\breemisi\\w*', '\\breemit\\w*']
      },
      customer_notice: {
        agent: 'Avisos a clientes', icon: 'message-square', systems: ['Salesforce FSC'],
        what: 'Envía SMS y notificación en la app a los clientes afectados',
        name: 'Aviso a clientes', verb: 'avisar a los clientes', token: 'aviso-clientes',
        keywords: ['\\bsms\\b', '\\bnotificacion(?:es)? en la app\\b', '\\bpush\\b'],
        strong: ['\\bsms\\b', '\\bnotificacion(?:es)? en la app\\b']
      },
      incident: {
        agent: 'Incidencias', icon: 'clipboard', systems: ['ServiceNow', 'Microsoft Teams'],
        what: 'Abre el incidente o el expediente, prepara la notificación DORA si aplica y envía los avisos',
        name: 'Incidente operativo', verb: 'abrir el incidente', token: 'incidente',
        keywords: ['\\bincidentes?\\b', '\\bexpedientes?\\b', '\\bdora\\b', '\\binforme\\b', '\\bavis(?:ar|e|a|en)\\b', '\\bpublic\\w* el resumen\\b'],
        strong: ['\\bincidentes?\\b', '\\bexpediente\\b', '\\bdora\\b', '\\bpublic\\w* el resumen\\b', '\\bavis(?:ar|e|a|en)\\b']
      },
      complaint_intake: {
        agent: 'Entrada de reclamaciones', icon: 'mail', systems: ['Outlook', 'Salesforce FSC'],
        what: 'Registra la reclamación y extrae cliente, tarjeta, operaciones, importes y plazo',
        name: 'Reclamación de cliente', verb: 'registrar la reclamación', token: 'reclamacion',
        keywords: ['\\breclam\\w*', '\\bquej\\w*'],
        strong: ['\\bregistr\\w*', '\\bextraer\\b', '\\bdar de alta\\b']
      },
      chargeback: {
        agent: 'Abonos y contracargos', icon: 'euro', systems: ['Core bancario T24', 'Redsys'], hitl: true, gateVerb: 'aplicar el abono provisional',
        what: 'Propone el abono provisional y el contracargo por la red; solo los aplica tras la aprobación',
        name: 'Abono provisional', verb: 'abonar', token: 'abono',
        keywords: ['\\babono provisional\\b', '\\bdevolucion provisional\\b', '\\bcontracargos?\\b'],
        strong: ['\\babono provisional\\b', '\\bdevolucion provisional\\b', '\\bcontracargos?\\b']
      },
      notifier: {
        agent: 'Respuesta al cliente', icon: 'send', systems: ['Outlook', 'Salesforce FSC'], hitl: true, gateVerb: 'enviar la respuesta',
        what: 'Redacta la respuesta al cliente y la envía tras aprobarla',
        name: 'Respuesta al cliente', verb: 'responder al cliente', token: 'respuesta',
        keywords: ['\\brespuesta al cliente\\b', '\\bresponder al cliente\\b', '\\bcontestar al cliente\\b'],
        strong: ['\\brespuesta al cliente\\b', '\\bresponder al cliente\\b', '\\bcontestar al cliente\\b']
      },
      ops_monitor: {
        agent: 'Parte diario de operaciones', icon: 'activity', systems: ['Redsys', 'Falcon Fraud', 'ServiceNow'], multi: 2,
        what: 'Compara los indicadores de los canales con sus umbrales y abre tickets sin duplicar',
        name: 'Parte diario de operaciones', verb: 'hacer el parte de operaciones', token: 'parte-operaciones',
        keywords: ['\\bparte diario\\b', '\\bindicadores de (?:los )?canales\\b', '\\btickets? en servicenow\\b'],
        strong: ['\\brevis(?:ar|a|e)\\b', '\\bindicadores\\b', '\\btickets? en servicenow\\b']
      }
    },

    domains: {
      alarma: {
        first: 'fraud_monitor',
        slug: 'wf-pico-fraude-bin',
        name: 'Pico de fraude en tarjetas de un BIN',
        approver: 'fraud',
        approverOptions: ['fraud', 'fraud_shift', 'cards'],
        policy: 'POL-FRA-003',
        go: 'alarma',
        goLabel: 'Probarlo con la alerta del BIN 454812',
        next: 'La próxima alerta de Falcon Fraud lo ejecuta. La del BIN 454812 de las 05:50 sigue abierta.',
        trigger: {
          system: 'Falcon Fraud', type: 'fraude', icon: 'shield', badges: ['Falcon Fraud'],
          label: 'Fraude CNP de un BIN > {threshold}', sub: 'más de {minutes}',
          entry: 'Alerta de Falcon Fraud recibida por webhook',
          full: 'Tasa de fraude CNP de un BIN > {threshold} durante más de {minutes}'
        },
        steps: {
          fraud_monitor: { sub: 'Crítico > {critical}', what: 'Lee la tasa de fraude sin tarjeta presente del BIN, confirma el pico y lo clasifica por comercio, canal y país (crítico por encima de {critical})' },
          card_trace: { sub: 'Operaciones y tarjetas', what: 'Operaciones sospechosas del BIN, tarjetas afectadas y sus titulares en T24, con los comercios y MCC implicados' },
          card_block: { sub: 'Tras aprobar', what: 'Propone una regla de bloqueo preventivo en Falcon para el comercio electrónico de riesgo alto del BIN; se activa solo tras la aprobación', outputs: [{ icon: 'lock', text: 'Regla de bloqueo preventivo activa en Falcon Fraud, tras aprobar' }] },
          card_reissue: { sub: 'PR-TAR-007', what: 'Solicita en T24 la reemisión de las tarjetas comprometidas, con bloqueo definitivo de las anteriores (PR-TAR-007)', outputs: [{ icon: 'repeat', text: 'Reemisión de las tarjetas comprometidas en T24' }] },
          customer_notice: { sub: 'SMS y app', what: 'Envía un SMS y una notificación en la app a los titulares afectados con el aviso de bloqueo y de la tarjeta nueva', outputs: [{ icon: 'message-square', text: 'SMS y notificación en la app a los clientes afectados' }] },
          incident: { sub: 'Aviso por Teams', systems: ['ServiceNow', 'Microsoft Teams'], what: 'Abre el incidente en ServiceNow y avisa por Teams {al:notify} con el BIN, el importe y la regla activa', outputs: [{ icon: 'message-square', text: 'Incidente en ServiceNow y aviso por Teams {al:notify}' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Informe del episodio de fraude (PDF) con el registro de auditoría' }],
        params: [
          { key: 'threshold', label: 'Tasa de fraude CNP', name: 'Tasa de fraude CNP', type: 'number', unit: '%', min: 0.1, max: 10, step: 0.1, value: 1, ref: 'POL-FRA-003', hint: 'POL-FRA-003: 1 % (habitual 0,3 %)', below: 'critical', extract: { from: 'trigger', re: '(\\d{1,2}(?:[.,]\\d{1,2})?)\\s*%' } },
          { key: 'minutes', label: 'Durante más de', name: 'Tiempo por encima del umbral', type: 'number', unit: 'min', min: 1, max: 240, step: 1, value: 30, integer: true, ref: 'POL-FRA-003', hint: 'POL-FRA-003: 30 min', extract: { kind: 'minutes' } },
          { key: 'critical', label: 'Pico crítico', name: 'Pico crítico', type: 'number', unit: '%', min: 0.2, max: 20, step: 0.1, value: 2.5, above: 'threshold', ref: 'POL-FRA-003', hint: 'POL-FRA-003: 2,5 %', hl: 'Crítico', extract: { from: 'sentence', near: '\\bcritic\\w*', re: '(\\d{1,2}(?:[.,]\\d{1,2})?)\\s*%' } },
          { key: 'approver', label: 'Aprueba el bloqueo', ref: 'POL-FRA-003', hint: 'POL-FRA-003: solo Prevención del Fraude activa reglas de bloqueo' },
          { key: 'notify', label: 'Aviso a', name: 'Aviso', type: 'role', value: 'cards', options: ['cards', 'decider', 'it_risk'], ref: 'Política', hint: 'Por Microsoft Teams, para preparar la reemisión', extract: { kind: 'role', cap: 'incident' } }
        ],
        check: { id: 'umbral', ref: 'POL-FRA-003', keys: ['threshold', 'minutes'], label: 'Umbral y tiempo', describe: '{threshold} durante más de {minutes}', extra: 'crítico por encima de {critical}', action: 'Contrasta el umbral con POL-FRA-003' },
        scenarios: [
          'la tasa de fraude en compras sin tarjeta presente de un BIN supera {threshold} durante más de {minutes}',
          'Falcon Fraud dispara una alerta de pico de fraude en un BIN (p. ej. el 454812 de Tarjeta Cierzo Débito)',
          'el analista de turno informa de muchas operaciones sospechosas con tarjetas de un mismo BIN',
          'hay que decidir si se bloquea el comercio electrónico de riesgo alto de un BIN'
        ],
        testUtterance: 'Alerta: el BIN 454812 marca un 2,9 % de fraude en compras online desde hace 40 minutos',
        matchGroups: [
          { re: '\\bbin\\b|\\btarjetas?\\b|\\b4548\\d{2}\\b', w: 0.3, label: 'tarjetas' },
          { re: '\\bfraude\\w*|\\bsospechos\\w*|\\bcnp\\b', w: 0.3, label: 'fraude' },
          { re: '\\balert\\w*|\\balarma\\w*|\\bpico\\b|\\bsupera\\w*|\\bmarca\\b|\\bsube\\b', w: 0.25, label: 'alerta' },
          { re: '\\bcierzo\\b', w: 0.07, label: 'Banco Cierzo' }
        ],
        config: {
          fraud_monitor: [['umbral_tasa_fraude_pct', '{=threshold}'], ['minutos_por_encima', '{=minutes}'], ['critico_pct', '{=critical}'], ['canal', 'Comercio electrónico (CNP)']],
          card_block: [['aprobador', '{approver}'], ['politica', 'POL-FRA-003'], ['ambito', 'MCC de riesgo alto del BIN']],
          card_reissue: [['procedimiento', 'PR-TAR-007']],
          customer_notice: [['canales', 'SMS · app']],
          incident: [['aviso_a', '{notify}'], ['canal', 'Microsoft Teams']]
        },
        say: {
          draft: [
            'Cada frase está enlazada con lo que ha entendido: el disparador sale de «supere el {threshold} durante más de {minutes}».',
            'Cada paso dice qué sistema toca: Falcon para el pico y la regla, T24 y Redsys para operaciones y tarjetas, Salesforce FSC para avisar a los clientes.',
            'La regla de bloqueo no se activa sin la aprobación del {approver}: lo exige POL-FRA-003 y el workflow lo respeta aunque el texto no lo dijera.'
          ],
          published: ['Desde ahora, una alerta de Falcon Fraud lo dispara sola. Lo vemos con la alerta real de esta mañana: BIN 454812, 05:50.']
        }
      },
      reclamacion: {
        first: 'complaint_intake',
        slug: 'wf-reclamacion-cargos',
        name: 'Reclamación por cargos no reconocidos',
        approver: 'customer_service',
        approverOptions: ['customer_service', 'fraud', 'compliance'],
        policy: 'PR-SAC-001',
        go: 'reclamacion',
        goLabel: 'Probarlo con la reclamación de Lucía Ferrer',
        next: 'La próxima reclamación del SAC lo ejecuta. La de Lucía Ferrer Gil (612,40 €) está pendiente de respuesta.',
        trigger: {
          system: 'Outlook', type: 'correo', icon: 'mail', badges: ['Outlook'],
          label: 'Reclamación en el buzón del SAC', sub: 'cargos no reconocidos',
          entry: 'Buzón del SAC en Outlook y Salesforce FSC',
          full: 'Reclamación de cliente en el SAC por cargos no reconocidos'
        },
        steps: {
          complaint_intake: { sub: 'Acuse en {ack}', what: 'Registra la reclamación en Salesforce FSC, extrae cliente, tarjeta, operaciones e importes, y envía el acuse de recibo en {ack}', outputs: [{ icon: 'clipboard', text: 'Caso en Salesforce FSC con sus datos extraídos' }] },
          card_trace: { sub: 'Operaciones y comercio', what: 'Traza las operaciones en Redsys y Falcon: autenticación reforzada, dispositivo y comercio; otras tarjetas usadas en el mismo comercio', outputs: [{ icon: 'git-branch', text: 'Traza de las operaciones con la autenticación y el comercio' }] },
          chargeback: { sub: 'Tras aprobar', what: 'Propone el abono provisional de los cargos no reconocidos (PSD2) y lo aplica en T24 solo tras la aprobación; prepara el contracargo por la red', outputs: [{ icon: 'euro', text: 'Abono provisional en T24 y contracargo preparado, tras aprobar' }] },
          incident: { sub: 'Resolución en {days}', systems: ['Salesforce FSC', 'Procedimientos'], what: 'Prepara el expediente del caso (PR-SAC-001) con las reclamaciones similares de los últimos {months}', outputs: [{ icon: 'file-text', text: 'Expediente del caso (PR-SAC-001), a resolver en {days}' }] },
          notifier: { sub: 'Tras aprobar', what: 'Redacta la respuesta al cliente; se envía solo después de aprobarla', outputs: [{ icon: 'send', text: 'Respuesta al cliente, enviada tras la aprobación' }] }
        },
        params: [
          { key: 'ack', label: 'Acuse de recibo', name: 'Acuse de recibo', type: 'number', unit: 'h', min: 1, max: 72, step: 1, value: 24, integer: true, ref: 'PR-SAC-001', hint: 'PR-SAC-001: 24 h', extract: { from: 'text', re: '\\bacuse de recibo\\b[^.;]{0,40}?(\\d{1,3})\\s*(?:h|horas)\\b' } },
          { key: 'days', label: 'Resolución', name: 'Plazo de resolución', type: 'number', unit: 'días', unitLong: 'días hábiles', min: 1, max: 30, step: 1, value: 15, integer: true, ref: 'PR-SAC-001', hint: 'PR-SAC-001 y PSD2: 15 días hábiles', hl: 'Plazo', extract: { from: 'text', re: '(\\d{1,2})\\s*dias habiles\\b' } },
          { key: 'months', label: 'Histórico de reclamaciones', name: 'Histórico de reclamaciones', type: 'number', unit: 'meses', min: 1, max: 36, step: 1, value: 12, integer: true, ref: 'Política', hint: 'Histórico de Salesforce FSC', hl: 'Histórico', extract: { from: 'text', re: '(\\d{1,2})\\s*meses\\b' } },
          { key: 'approver', label: 'Aprueba abono y respuesta', ref: 'PR-SAC-001', hint: 'Antes de abonar o enviar nada al cliente' }
        ],
        check: { id: 'plazos', ref: 'PR-SAC-001', keys: ['ack', 'days'], label: 'Plazos', describe: 'acuse en {ack} y resolución en {days}', action: 'Contrasta los plazos con PR-SAC-001 y PSD2' },
        scenarios: [
          'llega al buzón del SAC la reclamación de un cliente que no reconoce cargos con su tarjeta',
          'un cliente se queja de operaciones que no ha hecho y hay que decidir el abono provisional',
          'hay que abrir un expediente del SAC por un cargo no reconocido'
        ],
        testUtterance: 'Una clienta reclama tres cargos con tarjeta que no reconoce de una tienda online',
        matchGroups: [
          { re: '\\breclam\\w*|\\bquej\\w*|\\bno reconoc\\w*', w: 0.35, label: 'reclamación' },
          { re: '\\bclient[ea]s?\\b|\\btitular\\w*', w: 0.2, label: 'cliente' },
          { re: '\\bcargos?\\b|\\boperacion\\w*|\\bcompras?\\b|\\bimportes?\\b', w: 0.25, label: 'cargos' },
          { re: '\\btarjetas?\\b|\\bcomercios?\\b', w: 0.12, label: 'tarjeta' }
        ],
        config: {
          complaint_intake: [['acuse_horas', '{=ack}'], ['sistema', 'Salesforce FSC']],
          chargeback: [['marco', 'PSD2 · fin del día hábil siguiente'], ['aprobador', '{approver}']],
          incident: [['plantilla', 'Expediente PR-SAC-001'], ['plazo_dias_habiles', '{=days}'], ['historico_meses', '{=months}']],
          notifier: [['canal', 'Correo y área de clientes'], ['aprobador', '{approver}']]
        },
        say: {
          draft: [
            'Cada frase está enlazada con lo que ha entendido: el correo al SAC dispara el workflow y los plazos salen del propio texto.',
            'El abono provisional es dinero del cliente: no se aplica sin la aprobación del {approver}, igual que la respuesta.',
            'Los plazos se contrastan con PR-SAC-001 y PSD2; si alguien los alarga, al publicar se pide el motivo.'
          ],
          published: ['La próxima reclamación de cargos no reconocidos lo ejecuta sola. Lo vemos con la de Lucía Ferrer.']
        }
      },
      parte: {
        first: 'ops_monitor',
        slug: 'wf-parte-diario-operaciones',
        name: 'Parte diario de canales · Centro de Operaciones',
        approver: 'fraud',
        approverOptions: ['fraud', 'fraud_shift'],
        policy: 'POL-FRA-003',
        go: 'turno',
        goLabel: 'Ver el parte diario del turno',
        next: 'Se ejecuta cada día a las {time}.',
        trigger: {
          system: 'Programado', type: 'programado', icon: 'clock', badges: [],
          label: 'Cada día a las {time}', sub: 'Programado',
          entry: 'Programación diaria del servidor · {time}'
        },
        steps: {
          ops_monitor: { sub: 'Canales y fraude', what: 'Lee los indicadores de Redsys, Falcon y ServiceNow (aceptación, denegaciones, fraude por canal, TPV y cajeros) y abre tickets en ServiceNow sin duplicar los abiertos', outputs: [{ icon: 'ticket', text: 'Tickets en ServiceNow, sin duplicar los abiertos' }] },
          card_block: { sub: 'Reglas de más de 72 h', gateVerb: 'mantener o retirar la regla', what: 'Si una regla de bloqueo preventivo lleva más de 72 h activa, propone mantenerla o retirarla (POL-FRA-003)', outputs: [{ icon: 'lock', text: 'Reglas de bloqueo revisadas, tras aprobar' }] },
          incident: { sub: 'Resumen en Teams', systems: ['Microsoft Teams'], what: 'Publica el resumen del parte en el canal «Operaciones · Madrid»', outputs: [{ icon: 'message-square', text: 'Resumen en el canal de Teams «Operaciones · Madrid»' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Parte diario de canales (PDF)' }],
        params: [
          { key: 'time', label: 'Hora del parte', name: 'Hora del parte', type: 'time', value: '07:00', ref: 'Política', hint: 'Indicadores de Redsys, Falcon y ServiceNow', extract: { kind: 'time' } },
          { key: 'approver', label: 'Aprueba la revisión de reglas', ref: 'POL-FRA-003', hint: 'POL-FRA-003 · PR-DORA-002' }
        ],
        staticChecks: [
          { id: 'dora', text: 'Incidentes graves de TIC: notificación inicial en 4 h según PR-DORA-002', stream: { action: 'Contrasta el parte con POL-FRA-003 y PR-DORA-002', result: 'Reglas preventivas revisadas cada 72 h · incidentes graves notificados en 4 h' } }
        ],
        rules: [{ key: 'noDuplicate', re: '\\bsin duplicar\\b', label: 'Regla', check: 'Tickets sin duplicar los que ya están abiertos en ServiceNow' }],
        scenarios: [
          'son las {time} y toca el parte diario de los canales del Centro de Operaciones',
          'el usuario pide el parte diario de canales y fraude',
          'el usuario pregunta qué canales están dando problemas hoy'
        ],
        testUtterance: 'Haz el parte diario de los canales del centro de operaciones',
        matchGroups: [
          { re: '\\bparte\\b', w: 0.35, label: 'parte' },
          { re: '\\bcanales\\b|\\bindicadores\\b|\\btpv\\b|\\bcajeros\\b|\\boperaciones\\b', w: 0.3, label: 'canales' },
          { re: '\\bdiario\\b|\\bhoy\\b|\\bturno\\b', w: 0.15, label: 'diario' },
          { re: '\\bcierzo\\b|\\bcentro de operaciones\\b', w: 0.1, label: 'Centro de Operaciones' }
        ],
        config: {
          ops_monitor: [['hora', '{time}'], ['indicadores', 'Aceptación, denegaciones, fraude por canal, TPV y cajeros, caídas de servicio'], ['tickets', 'ServiceNow, sin duplicar los abiertos']],
          card_block: [['aprobador', '{approver}'], ['politica', 'POL-FRA-003'], ['revision', 'Reglas con más de 72 h']],
          incident: [['canal', 'Microsoft Teams · Operaciones · Madrid']]
        },
        say: {
          draft: [
            'El parte es programado: cada día a las {time}, sin que nadie lo pida.',
            'Abre tickets solo para lo que no tenga ya uno abierto, y no toca una regla de bloqueo sin la aprobación del {approver}.'
          ],
          published: ['Mañana a las {time} lo ejecuta solo; el de hoy está en el resumen del turno.']
        }
      }
    }
  }
});
