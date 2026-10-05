/* Mercados Moncayo · From words to workflow (English). Fictitious company; synthetic demonstration data (MFM).
 * Same structure as ../workflow.js. Schema in the header of assets/js/scenes/workflow.js. Regex on folded text (lower case, no accents). */
agenticPackEn('retail', {
  workflow: {
    space: 'Quality · Stores and distribution centre',
    author: 'quality',
    authorNoun: 'Quality',
    alarmMatch: 'cold chain|multideck|cadena de fr[ií]o|mural',
    approverRoles: ['quality', 'quality_shift', 'supplier_quality', 'customer_service'],
    feminineRoles: ['decider'],
    noArticleRoles: ['maintenance', 'customer_service', 'supplier_quality'],
    defaultPolicy: 'APPCC-TIE-01',
    approverRule: {
      policy: 'APPCC-TIE-01',
      text: 'only Quality approves sales blocks',
      note: 'Reassigned: APPCC-TIE-01 reserves sales blocks for Quality'
    },
    triggerExamples: '“When the temperature of a multideck exceeds…” or “Every day at 06:30…”',
    rolePatterns: [
      ['quality_shift', '\\b(?:on-call )?quality technician(?: on call)?\\b'],
      ['quality', '\\bhead of quality\\b|\\bquality manager\\b'],
      ['store_ops', '\\barea (?:store )?manager\\b'],
      ['maintenance', '\\brefrigeration maintenance\\b'],
      ['logistics', '\\bdistribution cent(?:re|er) manager\\b'],
      ['customer_service', '\\bconsumer care\\b'],
      ['supplier_quality', '\\bsupplier quality\\b'],
      ['decider', '\\bdirector of operations\\b|\\boperations director\\b']
    ],
    outOfScope: [
      {
        id: 'finanzas',
        re: '\\b(?:buy\\w*|bought|sell\\w*|sold|invest\\w*|trad(?:e|es|ing))\\b[^.;]{0,50}\\b(?:shares?|stocks?|equities|bitcoins?|crypto\\w*|currenc(?:y|ies)|forex|investment funds?)\\b|\\bbank transfers?\\b|\\b(?:transfer|wire) (?:money|funds)\\b',
        title: 'Financial transaction',
        body: 'The text asks to buy or sell shares or to move money. No agent in the Quality · Stores and distribution centre space trades on markets or makes payments, and Agentic Platform does not create steps that no enabled agent can perform.'
      },
      {
        id: 'personas',
        re: '\\b(?:evaluat\\w*|assess\\w*|scor\\w*|rate|rank\\w*|monitor\\w*|track\\w*|measure|sanction\\w*|dismiss\\w*|fire)\\b[^.;]{0,40}\\b(?:workers?|cashiers?|shelf[- ]stackers?|employees?|staff|workforce|personnel|people|colleagues)\\b',
        title: 'Assessment of people',
        body: 'The text asks to assess, monitor or score people. Workflows in this space work on refrigeration equipment, products, batches and quality documents; they do not rate anyone’s performance.'
      },
      {
        id: 'precios',
        re: '\\b(?:chang\\w*|modif\\w*|adjust\\w*|lower\\w*|cut\\w*|reduc\\w*|rais\\w*|increas\\w*|discount\\w*|mark\\w* down)\\b[^.;]{0,30}\\b(?:prices?|rrp|promotions?|offers?)\\b',
        title: 'Price change',
        body: 'The text asks to change prices or promotions. Prices are set by Commercial in SAP S/4 Retail through its own process; workflows in this space only block the sale of a product for food safety reasons, after approval by Quality.'
      }
    ],
    idle: [
      ['bell', 'brand', 'Trigger', 'An alarm from the refrigeration sensors, a complaint from the loyalty app or a set time.'],
      ['cpu', '', 'Steps and systems', 'Which agent performs each step and which system it reads or updates: SAP, WMS Manhattan, tills, CRM or ServiceNow.'],
      ['user-check', 'warn', 'Human approval', 'Who decides before a sale is blocked or a consumer is answered, under APPCC-TIE-01 and PR-ATC-002.'],
      ['file-text', '', 'Outputs', 'Sales blocks, store tasks, work orders, case files and reports produced by the workflow.']
    ],
    idleNote: 'Each element is linked to the sentence it comes from and checked against the store HACCP plan and the Quality procedures before the draft is saved.',
    presenter: {
      idle: [
        'This is how Quality writes a procedure: in plain English, as in its HACCP plan. Nothing to draw, nothing to program.',
        'Agentic Platform turns it into a platform workflow: trigger, agents in order, human approval and outputs, each linked to its sentence.',
        'To be clear: text-to-workflow generation is simulated here and its integration into Agentic Platform is validated in the pilot; workflows (Routines), the editor, approval and auditing are standard.'
      ],
      outOfScopeExample: 'Cut the price of yoghurts that expire tomorrow in every store'
    },

    templates: {
      alarma: {
        label: 'Cold chain',
        icon: 'thermometer',
        refs: 'APPCC-TIE-01 and PR-CAL-010',
        text: 'When the temperature of a refrigerated multideck in a store exceeds 5 °C for more than 2 hours, confirm the reading from the refrigeration sensors and classify the excursion under APPCC-TIE-01. Locate the products and batches in the multideck, with their units and use-by dates. Propose blocking sales of the exposed product at the tills, which must be approved by the Head of Quality before it is applied. If the temperature exceeds 8 °C, treat it as a critical cold chain break. After approval of the block, create the task for the store team to remove the product and transfer it to the cold room, open an urgent work order for Refrigeration Maintenance and notify the Area Store Manager via Teams.'
      },
      reclamacion: {
        label: 'Complaint',
        icon: 'mail',
        refs: 'PR-ATC-002 and PR-PRO-006',
        text: 'When a consumer sends a complaint through the loyalty app about a foreign body in an own-brand product, log it in the loyalty CRM (product, batch, store, till receipt and response deadline) and send the acknowledgement of receipt within 24 h. Trace the batch backwards (manufacturer, receipt at the distribution centre and goods-in checks) and forwards (stores supplied and till sales). Ask the own-brand manufacturer for its root cause analysis and the reference sample of the batch. Prepare the investigation file under PR-ATC-002, with similar complaints from the last 12 months, and the reply to the consumer. The reply is approved by the Head of Quality before it is sent; the reply to the consumer is sent within 48 h.'
      },
      parte: {
        label: 'Daily report',
        icon: 'clipboard',
        refs: 'APPCC-TIE-01 and IT-TIE-014',
        text: 'Every day at 06:30, review the sensor and equipment readings for the 64 stores (multidecks, cold rooms, chest freezers, bread ovens and scales) and compare them with the store HACCP limits. For each item of equipment at warning or critical level, open a ticket in ServiceNow with the recommended action, without duplicating orders that are already open. If a multideck has been above its limit for more than 2 hours, propose blocking sales of the exposed product, which must be approved by the Head of Quality. Post the summary of the report in the Store Operations Teams channel.'
      }
    },

    catalog: {
      cold_monitor: {
        agent: 'Store refrigeration monitor', icon: 'thermometer', systems: ['Sensores de frío'],
        what: 'Reads the equipment temperature series, confirms the excursion and classifies it',
        name: 'Cold chain break', verb: 'check the refrigeration', token: 'cadena-frio',
        keywords: ['\\btemperatures?\\b', '\\bcold chain\\b', '\\bexcursions?\\b', '\\brefrigerated (?:multidecks?|cabinets?|display\\w*)', '\\bdegrees\\b'],
        strong: ['\\bconfirm\\w*', '\\bclassif\\w*', '\\bmonitor(?:s|ing)?\\b']
      },
      store_trace: {
        agent: 'Traceability', icon: 'git-branch', systems: ['SAP S/4 Retail', 'WMS Manhattan', 'TPV tiendas'],
        what: 'Locates products, batches, stores and sales, backwards and forwards',
        name: 'Batch traceability', verb: 'trace batches', token: 'traza',
        keywords: ['\\btraceab\\w*', '\\btrac(?:e|es|ed|ing)\\b', ['\\bbatch(?:es)?\\b', '\\b(?:block\\w*|quarantin\\w*)\\s+(?:\\w+\\s+){0,2}$'], '\\b(?:locat|identif)\\w*\\s+(?:the\\s+|all\\s+)?(?:products|batches|items|units|references)\\b', '\\b(?:backwards?|forwards?)\\b'],
        strong: ['\\btrac(?:e|es|ing)\\b', '\\btraceab\\w*', '\\blocat\\w*', '\\bidentif\\w*']
      },
      sale_block: {
        agent: 'Sales block', icon: 'lock', systems: ['TPV tiendas', 'SAP S/4 Retail'], hitl: true, restricted: true, gateVerb: 'applying the sales block',
        what: 'Proposes the sales block at the tills and only applies it after approval',
        name: 'Sales block', verb: 'block the sale', token: 'bloqueo',
        keywords: ['\\bblock\\w*', '\\bwithdraw\\w* from sale\\b', '\\bquarantin\\w*'],
        strong: ['\\bblock\\w*', '\\bwithdraw\\w* from sale\\b', '\\bquarantin\\w*']
      },
      store_task: {
        agent: 'Store tasks', icon: 'clipboard', systems: ['ServiceNow', 'Microsoft Teams'],
        what: 'Creates the task for the store team and follows it up until closed',
        name: 'Store task', verb: 'create the store task', token: 'tarea',
        keywords: ['\\btasks?\\b', '\\btransfer\\w*'],
        strong: ['\\btasks?\\b', '\\btransfer\\w*']
      },
      cold_maintenance: {
        agent: 'Refrigeration maintenance', icon: 'wrench', systems: ['ServiceNow'],
        what: 'Opens the work order for the refrigeration technician with the equipment and the symptom',
        name: 'Refrigeration work order', verb: 'open the work order', token: 'ot-frio',
        keywords: ['\\bwork orders?\\b', '\\brefrigeration technician\\b'],
        strong: ['\\bwork orders?\\b', '\\brefrigeration technician\\b']
      },
      incident: {
        agent: 'Quality incidents', icon: 'clipboard', systems: ['ServiceNow', 'Microsoft Teams'],
        what: 'Opens the quality incident or case file and sends the notifications',
        name: 'Quality incident', verb: 'open an incident', token: 'incidencia',
        keywords: ['\\bincidents?\\b', '\\bnon-?conformit\\w*', '\\b(?:investigation|case) files?\\b', '\\bnotif(?:y|ies)\\b', '\\b(?:post|publish)\\w* the summary\\b'],
        strong: ['\\bnon-?conformit\\w*', '\\b(?:investigation|case) file\\b', '\\bincidents?\\b', '\\b(?:post|publish)\\w* the summary\\b', '\\bnotif(?:y|ies)\\b']
      },
      complaint_intake: {
        agent: 'Complaint intake', icon: 'mail', systems: ['CRM Fidelización', 'Outlook'],
        what: 'Logs the complaint and extracts product, batch, store, receipt and deadline',
        name: 'Consumer complaint', verb: 'log the complaint', token: 'reclamacion',
        keywords: ['\\bcomplain\\w*'],
        strong: ['\\blog\\b', '\\bregister\\w*', '\\brecord\\b', '\\bextract\\b']
      },
      supplier_claim: {
        agent: 'Supplier quality', icon: 'factory', systems: ['Outlook', 'SAP S/4 Retail'],
        what: 'Asks the own-brand manufacturer for its root cause analysis and the reference sample',
        name: 'Claim to the manufacturer', verb: 'claim against the manufacturer', token: 'fabricante',
        keywords: ['\\bask the (?:own-brand )?manufacturer\\b', '\\bown-brand manufacturer\\b', '\\bsupplier quality\\b'],
        strong: ['\\bask the (?:own-brand )?manufacturer\\b', '\\bown-brand manufacturer\\b']
      },
      notifier: {
        agent: 'Consumer reply', icon: 'send', systems: ['CRM Fidelización', 'Outlook'], hitl: true, gateVerb: 'sending the reply',
        what: 'Drafts the reply to the consumer and sends it once approved',
        name: 'Consumer reply', verb: 'reply to the consumer', token: 'respuesta',
        keywords: ['\\b(?:reply|response|answer) to the (?:consumer|customer)\\b', '\\b(?:reply to|respond to|answer) the (?:consumer|customer)\\b'],
        strong: ['\\b(?:reply|response|answer) to the (?:consumer|customer)\\b', '\\b(?:reply to|respond to|answer) the (?:consumer|customer)\\b']
      },
      store_monitor: {
        agent: 'Store daily report', icon: 'activity', systems: ['Sensores de frío', 'TPV tiendas', 'ServiceNow'], multi: 2,
        what: 'Compares the store readings with the HACCP plan and opens tickets without duplicating orders',
        name: 'Store daily report', verb: 'run the store report', token: 'parte-tiendas',
        keywords: ['\\bdaily report\\b', '\\b(?:sensor|equipment) readings\\b', '\\breadings (?:of|from|for) (?:the )?(?:sensors|equipment)\\b', '\\btickets? in servicenow\\b'],
        strong: ['\\breview\\w*', '\\breadings\\b', '\\btickets? in servicenow\\b']
      }
    },

    domains: {
      alarma: {
        first: 'cold_monitor',
        slug: 'wf-cadena-frio-tienda',
        name: 'Cold chain in store multidecks',
        approver: 'quality',
        approverOptions: ['quality', 'quality_shift'],
        policy: 'APPCC-TIE-01',
        go: 'alarma',
        goLabel: 'Test it with the T-027 alarm',
        next: 'The next refrigeration sensor alarm runs it. The one from multideck MR-3 at T-027 at 05:50 is still open.',
        trigger: {
          system: 'Sensores de frío', type: 'temperatura', icon: 'thermometer', badges: ['Sensores de frío'],
          label: 'Multideck temperature > {threshold}', sub: 'for more than {minutes}',
          entry: 'Refrigeration sensor alarm received by webhook',
          full: 'Multideck temperature > {threshold} for more than {minutes}'
        },
        steps: {
          cold_monitor: { sub: 'Critical > {critical}', what: 'Reads the multideck temperature series, confirms the excursion and classifies it under APPCC-TIE-01 (critical above {critical})' },
          store_trace: { sub: 'Products and batches', what: 'Products, batches, units and use-by dates in the multideck, with their stock at the tills and in SAP' },
          sale_block: { sub: 'After approval', what: 'Proposes blocking sales of the exposed product at the tills; it is applied at the tills and in SAP only after approval', outputs: [{ icon: 'lock', text: 'Sales block at the tills on the exposed product, after approval' }] },
          store_task: { sub: 'Removal and transfer', what: 'Creates the task for the store team to remove the product from the multideck and transfer it to the cold room', outputs: [{ icon: 'clipboard', text: 'Removal and cold-room transfer task for the store' }] },
          cold_maintenance: { sub: 'Urgent work order', what: 'Opens the urgent work order for Refrigeration Maintenance with the multideck, the symptom and the temperature series', outputs: [{ icon: 'wrench', text: 'Urgent work order for Refrigeration Maintenance' }] },
          incident: { sub: 'Teams notification', systems: ['Microsoft Teams'], what: 'Notifies {al:notify} via Teams with the store, the multideck, the blocked units and the work order', outputs: [{ icon: 'message-square', text: 'Teams notification to {al:notify}' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Refrigeration incident report (PDF) with the audit trail' }],
        params: [
          { key: 'threshold', label: 'Multideck limit', name: 'Multideck limit', type: 'number', unit: '°C', min: 0, max: 12, step: 0.5, value: 5, ref: 'APPCC-TIE-01', hint: 'APPCC-TIE-01: chilled products at 5 °C maximum', below: 'critical', extract: { from: 'trigger', re: '(\\d{1,2}(?:[.,]\\d)?)\\s*(?:degrees(?:\\s+(?:celsius|c))?|c)\\b' } },
          { key: 'minutes', label: 'For more than', name: 'Time above the limit', type: 'number', unit: 'min', min: 1, max: 480, step: 5, value: 120, integer: true, ref: 'APPCC-TIE-01', hint: 'APPCC-TIE-01: 2 h (120 min)', extract: { kind: 'minutes' } },
          { key: 'critical', label: 'Critical break', name: 'Critical break', type: 'number', unit: '°C', min: 1, max: 20, step: 0.5, value: 8, above: 'threshold', ref: 'APPCC-TIE-01', hint: 'APPCC-TIE-01: 8 °C', hl: 'Critical', extract: { from: 'sentence', near: '\\bcritic\\w*', re: '(\\d{1,2}(?:[.,]\\d)?)\\s*(?:degrees(?:\\s+(?:celsius|c))?|c)\\b' } },
          { key: 'approver', label: 'Approves the block', ref: 'APPCC-TIE-01', hint: 'APPCC-TIE-01: only Quality blocks and releases' },
          { key: 'notify', label: 'Notify', name: 'Notification', type: 'role', value: 'store_ops', options: ['store_ops', 'logistics', 'decider'], ref: 'Policy', hint: 'Via Microsoft Teams, to restock the shelf', extract: { kind: 'role', cap: 'incident' } }
        ],
        check: { id: 'umbral', ref: 'APPCC-TIE-01', keys: ['threshold', 'minutes'], label: 'Limit and time', describe: '{threshold} for more than {minutes}', extra: 'critical above {critical}', action: 'Checks the limit against APPCC-TIE-01' },
        scenarios: [
          'a refrigerated multideck in a store exceeds {threshold} for more than {minutes}',
          'a temperature alarm goes off on a multideck, a cold room or a freezer in a store (e.g. MR-3 at T-027 Huesca Centro)',
          'the store manager reports that a multideck is losing cold',
          'a decision is needed on which chilled products can still be sold after a cold chain break'
        ],
        testUtterance: 'Alarm: multideck MR-3 at T-027 has been reading 9.4 °C for more than two hours',
        matchGroups: [
          { re: '\\bmultidecks?\\b|\\bcold rooms?\\b|\\bfreezers?\\b|\\bmr-\\d\\b|\\bt-\\d{3}\\b|\\bstores?\\b|\\bcabinets?\\b', w: 0.3, label: 'multideck' },
          { re: '\\btemperature\\w*|\\bdegrees\\b|\\d\\s*c\\b|\\bcold\\b', w: 0.3, label: 'temperature' },
          { re: '\\balarm\\w*|\\bexcursion\\w*|\\bexceed\\w*|\\breading\\b|\\blos(?:es|ing)\\b|\\brising\\b', w: 0.25, label: 'alarm' },
          { re: '\\bmoncayo\\b', w: 0.07, label: 'Mercados Moncayo' }
        ],
        config: {
          cold_monitor: [['limit_c', '{=threshold}'], ['minutes_above', '{=minutes}'], ['critical_c', '{=critical}'], ['equipment', 'Store refrigerated multidecks']],
          sale_block: [['approver', '{approver}'], ['policy', 'APPCC-TIE-01'], ['scope', 'Product exposed above the limit']],
          store_task: [['task', 'Remove from the multideck and transfer to the cold room']],
          cold_maintenance: [['priority', 'Urgent'], ['assigned_to', 'Refrigeration Maintenance']],
          incident: [['notify', '{notify}'], ['channel', 'Microsoft Teams']]
        },
        say: {
          draft: [
            'Every sentence is linked to what it understood: the trigger comes from “exceeds {threshold} for more than {minutes}”.',
            'Each step says which system it touches: refrigeration sensors for the temperature; SAP, WMS and tills for products and batches; tills for the sales block; ServiceNow for the task and the work order.',
            'The sales block is not applied without approval from {del:approver}: APPCC-TIE-01 requires it, and the workflow enforces it even if the text did not say so.'
          ],
          published: ['From now on, a refrigeration sensor alarm triggers it automatically. Let’s see it with this morning’s real alarm: multideck MR-3 at T-027, 05:50.']
        }
      },
      reclamacion: {
        first: 'complaint_intake',
        slug: 'wf-reclamacion-consumidor',
        name: 'Consumer complaint about a foreign body',
        approver: 'quality',
        approverOptions: ['quality', 'supplier_quality', 'customer_service'],
        policy: 'PR-ATC-002',
        go: 'reclamacion',
        goLabel: 'Test it with the batch L26214 complaint',
        next: 'The next complaint from the app runs it. Javier Lasheras’s (fried tomato, batch L26214) is awaiting a reply.',
        trigger: {
          system: 'CRM Fidelización', type: 'reclamacion', icon: 'mail', badges: ['CRM Fidelización'],
          label: 'Complaint from the loyalty app', sub: 'foreign body in an own-brand product',
          entry: 'Loyalty app form (CRM)',
          full: 'Consumer complaint about a foreign body in an own-brand product'
        },
        steps: {
          complaint_intake: { sub: 'Acknowledgement within {ack}', what: 'Logs the complaint in the loyalty CRM, extracts product, batch, store and till receipt, and sends the acknowledgement of receipt within {ack}', outputs: [{ icon: 'clipboard', text: 'Complaint logged in the CRM with the extracted data' }] },
          store_trace: { sub: 'Batch trace', what: 'Traces the batch: manufacturer, receipt at the distribution centre and goods-in checks; stores supplied and till sales', outputs: [{ icon: 'git-branch', text: 'Batch trace with stores supplied and units sold' }] },
          supplier_claim: { sub: 'To the manufacturer', what: 'Asks the own-brand manufacturer for its root cause analysis and the reference sample of the batch (PR-PRO-006)', outputs: [{ icon: 'factory', text: 'Root cause analysis request to the manufacturer' }] },
          incident: { sub: 'Investigation file', systems: ['ServiceNow', 'Procedimientos'], what: 'Prepares the investigation file (PR-ATC-002) with similar complaints from the last {months}', outputs: [{ icon: 'file-text', text: 'Investigation file (PR-ATC-002)' }] },
          notifier: { sub: 'Within {answer}, after approval', what: 'Drafts the reply to the consumer; it is sent through the app and by email only after approval, within {answer} at most', outputs: [{ icon: 'send', text: 'Reply to the consumer within {answer}, after approval' }] }
        },
        params: [
          { key: 'ack', label: 'Acknowledgement of receipt', name: 'Acknowledgement of receipt', type: 'number', unit: 'h', min: 1, max: 72, step: 1, value: 24, integer: true, ref: 'PR-ATC-002', hint: 'PR-ATC-002: 24 h', extract: { from: 'text', re: '\\backnowledge?ment\\b[^.;]{0,40}?(\\d{1,3})\\s*(?:h|hours?)\\b' } },
          { key: 'answer', label: 'Reply to the consumer', name: 'Reply deadline', type: 'number', unit: 'h', min: 1, max: 240, step: 1, value: 48, integer: true, ref: 'PR-ATC-002', hint: 'PR-ATC-002: 48 h', hl: 'Deadline', extract: { from: 'text', re: '\\b(?:reply|response) to the consumer\\b[^.;]{0,40}?(\\d{1,3})\\s*(?:h|hours?)\\b' } },
          { key: 'months', label: 'Complaint history', name: 'Complaint history', type: 'number', unit: 'months', min: 1, max: 36, step: 1, value: 12, integer: true, ref: 'Policy', hint: 'History from the loyalty CRM', hl: 'History', extract: { from: 'text', re: '(\\d{1,2})\\s*months\\b' } },
          { key: 'approver', label: 'Approves the reply', ref: 'PR-ATC-002', hint: 'Before anything is sent to the consumer' }
        ],
        check: { id: 'plazos', ref: 'PR-ATC-002', keys: ['ack', 'answer'], label: 'Deadlines', describe: 'acknowledgement within {ack} and reply within {answer}', action: 'Checks the deadlines against PR-ATC-002' },
        scenarios: [
          'a consumer sends a complaint from the app about a foreign body in an own-brand product',
          'a customer complains about a Moncayo product and the batch needs investigating with the manufacturer',
          'an investigation file needs to be opened from a consumer complaint'
        ],
        testUtterance: 'A customer is complaining about a piece of glass in a jar of Moncayo fried tomato',
        matchGroups: [
          { re: '\\bcomplain\\w*', w: 0.35, label: 'complaint' },
          { re: '\\bcustomers?\\b|\\bconsumers?\\b', w: 0.2, label: 'consumer' },
          { re: '\\bglass\\b|\\bforeign bod\\w*|\\bplastic\\w*|\\bmetal\\w*|\\bhairs?\\b|\\binsects?\\b|\\bdefect\\w*', w: 0.25, label: 'foreign body' },
          { re: '\\bown[- ]brand\\b|\\bmoncayo\\b|\\bbatch(?:es)?\\b|\\bjars?\\b', w: 0.12, label: 'own brand' }
        ],
        config: {
          complaint_intake: [['ack_hours', '{=ack}'], ['system', 'CRM Fidelización']],
          supplier_claim: [['procedure', 'PR-PRO-006'], ['requests', 'Root cause analysis and reference sample']],
          incident: [['template', 'Investigation file PR-ATC-002'], ['history_months', '{=months}']],
          notifier: [['deadline_hours', '{=answer}'], ['channel', 'Loyalty app and email'], ['approver', '{approver}']]
        },
        say: {
          draft: [
            'Every sentence of the text is linked to what it understood: the complaint from the app triggers the workflow and the deadlines come from the text itself.',
            'The own-brand manufacturer is brought into the process: it is asked for its root cause analysis and the reference sample.',
            'Nothing goes to the consumer without approval from {del:approver}: PR-ATC-002 requires it.'
          ],
          published: ['The next complaint from the app runs it automatically. Let’s see it with Javier Lasheras’s.']
        }
      },
      parte: {
        first: 'store_monitor',
        slug: 'wf-parte-diario-tiendas',
        name: 'Daily store equipment report',
        approver: 'quality',
        approverOptions: ['quality', 'quality_shift'],
        policy: 'APPCC-TIE-01',
        go: 'turno',
        goLabel: 'See the shift daily report',
        next: 'It runs every day at {time}.',
        trigger: {
          system: 'Scheduled', type: 'programado', icon: 'clock', badges: [],
          label: 'Every day at {time}', sub: 'Scheduled',
          entry: 'Daily server schedule · {time}'
        },
        steps: {
          store_monitor: { sub: '64 stores', what: 'Reads the sensors and equipment of the 64 stores, compares them with the store HACCP limits and opens tickets in ServiceNow without duplicating open orders', outputs: [{ icon: 'ticket', text: 'Tickets in ServiceNow, without duplicating open orders' }] },
          sale_block: { sub: 'If a multideck goes over', gateVerb: 'blocking the sale', what: 'If a multideck has been above its limit for more than 2 h, proposes blocking sales of the exposed product (APPCC-TIE-01)', outputs: [{ icon: 'lock', text: 'Sales block on the exposed product, after approval' }] },
          incident: { sub: 'Summary in Teams', systems: ['Microsoft Teams'], what: 'Posts the report summary in the “Store Operations” channel', outputs: [{ icon: 'message-square', text: 'Summary in the “Store Operations” Teams channel' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Daily store equipment report (PDF)' }],
        params: [
          { key: 'time', label: 'Report time', name: 'Report time', type: 'time', value: '06:30', ref: 'Policy', hint: 'Before the stores open', extract: { kind: 'time' } },
          { key: 'approver', label: 'Approves the block', ref: 'APPCC-TIE-01', hint: 'APPCC-TIE-01 · IT-TIE-014' }
        ],
        staticChecks: [
          { id: 'appcc', text: 'Store HACCP limits: chilled ≤ 5 °C, frozen ≤ −18 °C (APPCC-TIE-01)', stream: { action: 'Checks the report against APPCC-TIE-01', result: 'Chilled ≤ 5 °C · frozen ≤ −18 °C · sales block after 2 h out of limits' } }
        ],
        rules: [{ key: 'noDuplicate', re: '\\bwithout duplicating\\b', label: 'Rule', check: 'Tickets without duplicating the open ServiceNow orders' }],
        scenarios: [
          'it is {time} and the daily report on store equipment is due',
          'the user asks for the daily store report',
          'the user asks which stores have equipment causing problems today'
        ],
        testUtterance: 'Run the daily report for the store equipment',
        matchGroups: [
          { re: '\\breport\\b', w: 0.35, label: 'report' },
          { re: '\\bstores?\\b|\\bequipment\\b|\\bmultidecks\\b', w: 0.3, label: 'stores' },
          { re: '\\bdaily\\b|\\btoday\\b|\\bshift\\b', w: 0.15, label: 'daily' },
          { re: '\\bmoncayo\\b|\\b64 stores\\b', w: 0.1, label: 'Mercados Moncayo' }
        ],
        config: {
          store_monitor: [['time', '{time}'], ['stores', 64], ['equipment', 'Multidecks, cold rooms, freezers, ovens and scales'], ['tickets', 'ServiceNow, without duplicating open orders']],
          sale_block: [['approver', '{approver}'], ['policy', 'APPCC-TIE-01']],
          incident: [['channel', 'Microsoft Teams · Store Operations']]
        },
        say: {
          draft: [
            'The report is scheduled: every day at {time}, before the stores open.',
            'It opens tickets only for items without an open order, and it does not block a sale without approval from {del:approver}.'
          ],
          published: ['Tomorrow at {time} it runs on its own; today’s is in the shift summary.']
        }
      }
    }
  }
});
