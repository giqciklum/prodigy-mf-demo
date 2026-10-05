/* Hidromec Ebro · From words to workflow (English). Fictitious company; synthetic demonstration data (MFM).
 * Same structure as ../workflow.js. Schema in the header of assets/js/scenes/workflow.js. Regex on folded text (lower case, no accents). */
agenticPackEn('maquinaria', {
  workflow: {
    space: 'Quality and Maintenance · Zaragoza',
    author: 'quality',
    authorNoun: 'Quality',
    alarmMatch: 'vibrat|spindle|vibraci[oó]n|husillo',
    approverRoles: ['maintenance', 'quality', 'quality_shift'],
    defaultPolicy: 'PR-CAL-004',
    approverRule: {
      policy: 'PR-CAL-004',
      text: 'only Quality and Maintenance approve holds on parts',
      note: 'Reassigned: PR-CAL-004 reserves holds for Quality and Maintenance'
    },
    triggerExamples: '“When the spindle vibration exceeds…” or “Every day at 06:00…”',
    rolePatterns: [
      ['quality_shift', '\\b(?:shift )?quality technician(?: on shift)?\\b'],
      ['quality', '\\bquality manager\\b'],
      ['maintenance', '\\bmaintenance manager\\b'],
      ['production', '\\bproduction manager\\b'],
      ['decider', '\\bplant manager\\b'],
      ['after_sales', '\\bafter-sales manager\\b'],
      ['purchasing', '\\bsupplier quality\\b']
    ],
    outOfScope: [
      {
        id: 'finanzas',
        re: '\\b(?:buy\\w*|bought|sell\\w*|sold|invest\\w*|trad(?:e|es|ing))\\b[^.;]{0,50}\\b(?:shares?|stocks?|equities|bitcoins?|crypto\\w*|currenc(?:y|ies)|forex|investment funds?)\\b|\\bbank transfers?\\b|\\b(?:transfer|wire) (?:money|funds)\\b',
        title: 'Financial transaction',
        body: 'The text asks to buy or sell shares or to move money. No agent in the Quality and Maintenance · Zaragoza space trades on markets or makes payments, and Agentic Platform does not create steps that no enabled agent can perform.'
      },
      {
        id: 'personas',
        re: '\\b(?:evaluat\\w*|assess\\w*|scor\\w*|rate|rank\\w*|monitor\\w*|track\\w*|measure|sanction\\w*|dismiss\\w*|fire)\\b[^.;]{0,40}\\b(?:workers?|operators?|employees?|staff|workforce|personnel|people|machinists?|turners?)\\b',
        title: 'Assessment of people',
        body: 'The text asks to assess, monitor or score people. Workflows in this space work on machines, parts, batches, serial numbers and quality documents; they do not rate anyone’s performance.'
      },
      {
        id: 'control',
        re: '\\b(?:chang\\w*|modif\\w*|adjust\\w*|lower\\w*|rais\\w*|increas\\w*|reduc\\w*)\\b[^.;]{0,30}\\b(?:cnc programs?|cnc parameters?|feed rates?|spindle speed|set ?points?|press pressure)\\b|\\b(?:start|restart|stop|shut down|switch (?:on|off)|turn (?:on|off))\\b[^.;]{0,25}\\b(?:machining cent(?:re|er)s?|spindles?|machines?|press(?:es)?|compressors?|robots?)\\b',
        title: 'Action on machine control',
        body: 'The text asks to change CNC programs or parameters, or to start or stop machines. Agentic Platform reads IIoT Vibración and MES Opcenter but does not write to machine control: shop-floor staff make those changes from the CNC or the PLC, with the lockout procedure in PR-SEG-002.'
      }
    ],
    idle: [
      ['bell', 'brand', 'Trigger', 'An IIoT Vibración alarm, an email in the After-sales mailbox or a set time.'],
      ['cpu', '', 'Steps and systems', 'Which agent performs each step and which system it reads or updates: SAP, Opcenter, Windchill, Maximo or Teams.'],
      ['user-check', 'warn', 'Human approval', 'Who decides before anything is held, retained or sent, under PR-CAL-004.'],
      ['file-text', '', 'Outputs', 'Holds, work orders, non-conformities, notifications and reports produced by the workflow.']
    ],
    idleNote: 'Each element is linked to the sentence it comes from and checked against the Quality and Maintenance procedures before the draft is saved.',
    presenter: {
      idle: [
        'This is how Quality writes a procedure: in plain English, as in its procedure manual. Nothing to draw, nothing to program.',
        'Agentic Platform turns it into a platform workflow: trigger, agents in order, human approval and outputs, each linked to its sentence.',
        'To be clear: text-to-workflow generation is simulated here and its integration into Agentic Platform is validated in the pilot; workflows (Routines), the editor, approval and auditing are standard.'
      ],
      outOfScopeExample: 'Buy shares in a steel company when the price of steel falls'
    },

    templates: {
      alarma: {
        label: 'Vibration',
        icon: 'activity',
        refs: 'PR-MAN-011 and PR-CAL-004',
        text: 'When the spindle vibration of a machining centre at the Zaragoza plant exceeds 4.5 mm/s RMS for more than 30 minutes, confirm the trend in IIoT Vibración and classify it by ISO 10816-3 zone. Locate the parts machined on that machine since the excess began, with their production order and batch. Propose a quality hold on those parts in SAP QM for 100 % metrology, which must be approved by the Maintenance manager before it is applied. If the vibration exceeds 7.1 mm/s, treat it as a critical failure. After approval of the hold, open a work order in GMAO Maximo for the machine stoppage and an inspection of the spindle bearings, and notify the Production manager via Teams. Reassign the pending production orders to another equivalent machining centre.'
      },
      reclamacion: {
        label: 'Complaint',
        icon: 'mail',
        refs: 'PR-CAL-004 and PR-CAL-008',
        text: 'When a complaint from a customer or distributor about an oil leak or an equipment failure reaches the After-sales mailbox, log it in Salesforce Service (serial number, model, defect, delivery date and response deadline) and send the acknowledgement of receipt within 24 h. Trace the serial number backwards (component batches, suppliers, assembly and test bench) and forwards (other units built with the same batches). Prepare the draft 8D report under PR-CAL-008, with similar complaints from the last 24 months, and the reply to the customer. The reply is approved by the Quality manager before it is sent; the 8D report is delivered within 10 working days.'
      },
      parte: {
        label: 'Daily report',
        icon: 'clipboard',
        refs: 'PR-MAN-011 and PR-CAL-004',
        text: 'Every day at 06:00, review the equipment readings for the plant in MES Opcenter and IIoT Vibración (machining centres, lathes, grinders, hydraulic test benches and compressors) and compare them with the plant thresholds. For each item of equipment at warning or critical level, open a maintenance notification in GMAO Maximo with the recommended action, without duplicating orders that are already open. If a metrology instrument is overdue for calibration, propose a hold on the parts measured since the last valid calibration, which must be approved by the Quality manager. Post the summary of the report in the Maintenance Teams channel.'
      }
    },

    catalog: {
      vibration_monitor: {
        agent: 'Vibration monitor', icon: 'activity', systems: ['IIoT Vibración', 'MES Opcenter'],
        what: 'Reads the spindle vibration series, confirms the excess and classifies it under ISO 10816-3',
        name: 'Spindle vibration', verb: 'check the vibration', token: 'vibracion',
        keywords: ['(?<!iiot )\\bvibrat\\w*', '\\bmm\\/s\\b', '\\biso 10816\\b'],
        strong: ['\\bconfirm\\w*', '\\bclassif\\w*', '\\bmonitor(?:s|ing)?\\b']
      },
      part_traceability: {
        agent: 'Traceability', icon: 'git-branch', systems: ['SAP S/4HANA', 'MES Opcenter', 'PLM Windchill'],
        what: 'Locates parts, orders, component batches and serial numbers, backwards and forwards',
        name: 'Part traceability', verb: 'trace parts and batches', token: 'traza',
        keywords: ['\\btraceab\\w*', '\\btrac(?:e|es|ed|ing)\\b', ['\\bbatch(?:es)?\\b', '\\b(?:hold\\w*|block\\w*|retain\\w*|quarantin\\w*)\\s+(?:\\w+\\s+){0,2}$'], '\\b(?:locat|identif)\\w*\\s+(?:the\\s+|all\\s+)?(?:parts|batches|units|serial numbers)\\b', '\\b(?:backwards?|forwards?)\\b'],
        strong: ['\\btrac(?:e|es|ing)\\b', '\\btraceab\\w*', '\\blocat\\w*', '\\bidentif\\w*']
      },
      quality_hold: {
        agent: 'Quality hold', icon: 'lock', systems: ['SAP QM', 'MES Opcenter'], hitl: true, restricted: true, gateVerb: 'applying the hold',
        what: 'Proposes the hold or retention of parts and only applies it after approval',
        name: 'Part hold', verb: 'hold', token: 'bloqueo',
        keywords: ['\\bholds?\\b', '\\bblock(?:s|ed|ing)?\\b', '\\bretain\\w*', '\\bretention\\b', '\\bquarantin\\w*'],
        strong: ['\\bholds?\\b', '\\bblock(?:s|ed|ing)?\\b', '\\bretain\\w*', '\\bretention\\b', '\\bquarantin\\w*']
      },
      maintenance_order: {
        agent: 'Maintenance orders', icon: 'wrench', systems: ['GMAO Maximo'],
        what: 'Opens the work order in Maximo with the machine, the symptom and the recommended action',
        name: 'Maintenance order', verb: 'open the work order', token: 'ot',
        keywords: ['\\bwork orders?\\b', '\\bbearings?\\b', '\\bcorrective maintenance\\b'],
        strong: ['\\bwork orders?\\b', '\\bcorrective maintenance\\b']
      },
      quality_incident: {
        agent: 'Incidents', icon: 'clipboard', systems: ['SAP QM', 'Microsoft Teams'],
        what: 'Opens the non-conformity with the draft 8D and sends the notifications',
        name: 'Quality incident', verb: 'open an incident', token: 'incidencia',
        keywords: ['\\bincidents?\\b', '\\bnon-?conformit\\w*', '\\b8d\\b', '\\bnotif(?:y|ies)\\b', '\\b(?:post|publish)\\w* the summary\\b'],
        strong: ['\\bnon-?conformit\\w*', '\\b8d\\b', '\\bincidents?\\b', '\\b(?:post|publish)\\w* the summary\\b', '\\bnotif(?:y|ies)\\b']
      },
      complaint_intake: {
        agent: 'Complaint intake', icon: 'mail', systems: ['Outlook', 'Salesforce Service'],
        what: 'Logs the complaint and extracts serial number, model, defect and deadline',
        name: 'Customer complaint', verb: 'log the complaint', token: 'reclamacion',
        keywords: ['\\bcomplain\\w*'],
        strong: ['\\blog\\b', '\\bregister\\w*', '\\brecord\\b', '\\bextract\\b']
      },
      notifier: {
        agent: 'Customer reply', icon: 'send', systems: ['Outlook'], hitl: true, gateVerb: 'sending the reply',
        what: 'Drafts the reply to the customer and sends it once approved',
        name: 'Customer reply', verb: 'reply to the customer', token: 'respuesta',
        keywords: ['\\b(?:reply|response|answer) to the customer\\b', '\\b(?:reply to|respond to|answer) the customer\\b'],
        strong: ['\\b(?:reply|response|answer) to the customer\\b', '\\b(?:reply to|respond to|answer) the customer\\b']
      },
      plant_monitor: {
        agent: 'Plant daily report', icon: 'activity', systems: ['MES Opcenter', 'IIoT Vibración', 'GMAO Maximo'], multi: 2,
        what: 'Compares readings with the plant thresholds and opens notifications without duplicating orders',
        name: 'Plant daily report', verb: 'run the plant report', token: 'parte-planta',
        keywords: ['\\bdaily report\\b', '\\bequipment readings\\b', '\\breadings (?:of|from|for) (?:the )?(?:equipment|machines)\\b', '\\bmaintenance notifications?\\b'],
        strong: ['\\breview\\w*', '\\breadings\\b', '\\bmaintenance notifications?\\b']
      },
      production_planner: {
        agent: 'Planning', icon: 'calendar', systems: ['SAP S/4HANA', 'MES Opcenter'],
        what: 'Reassigns production orders to another equivalent machine according to capacity',
        name: 'Order rescheduling', verb: 'reassign orders', token: 'replanifica',
        keywords: ['\\breassign\\w*', '\\breschedul\\w*', '\\breplan\\w*'],
        strong: ['\\breassign\\w*', '\\breschedul\\w*', '\\breplan\\w*']
      }
    },

    domains: {
      alarma: {
        first: 'vibration_monitor',
        slug: 'wf-vibracion-husillo',
        name: 'Spindle vibration out of limits',
        approver: 'maintenance',
        approverOptions: ['maintenance', 'quality', 'quality_shift'],
        policy: 'PR-CAL-004',
        go: 'alarma',
        goLabel: 'Test it with the MC-04 alarm',
        next: 'The next IIoT vibration alarm runs it. The MC-04 alarm from 05:50 is still open.',
        trigger: {
          system: 'IIoT Vibración', type: 'vibracion', icon: 'activity', badges: ['IIoT Vibración'],
          label: 'Spindle vibration > {threshold}', sub: 'for more than {minutes}',
          entry: 'IIoT Vibración alarm received by webhook',
          full: 'Spindle vibration > {threshold} for more than {minutes}'
        },
        steps: {
          vibration_monitor: { sub: 'Critical > {critical}', what: 'Reads the spindle RMS vibration series, confirms the excess and classifies it under ISO 10816-3 (critical above {critical})' },
          part_traceability: { sub: 'Parts and orders', what: 'Parts machined on the machine since the excess began, with their production order, batch and serial number' },
          quality_hold: { sub: 'After approval', what: 'Proposes a quality hold on the exposed parts for 100 % metrology; it is applied in SAP QM and Opcenter only after approval', outputs: [{ icon: 'lock', text: 'Parts held in SAP QM for 100 % metrology, after approval' }] },
          maintenance_order: { sub: 'Work order and stoppage', what: 'Opens the work order in Maximo for the stoppage and an inspection of the spindle bearings', outputs: [{ icon: 'wrench', text: 'Work order in GMAO Maximo to inspect the bearings' }] },
          quality_incident: { sub: 'Teams notification', systems: ['Microsoft Teams'], what: 'Notifies {al:notify} via Teams with the stopped machine, the parts on hold and the work order', outputs: [{ icon: 'message-square', text: 'Teams notification to {al:notify}' }] },
          production_planner: { sub: 'Reassigns the orders', what: 'Reassigns the pending production orders to another equivalent machining centre with spare capacity', outputs: [{ icon: 'calendar', text: 'Production orders reassigned in Opcenter' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Incident report (PDF) with the audit trail' }],
        params: [
          { key: 'threshold', label: 'Vibration limit', name: 'Vibration limit', type: 'number', unit: 'mm/s', min: 1, max: 11, step: 0.1, value: 4.5, ref: 'PR-MAN-011', hint: 'PR-MAN-011: 4.5 mm/s RMS (ISO 10816-3, zone D)', below: 'critical', extract: { from: 'trigger', re: '(\\d{1,2}(?:[.,]\\d{1,2})?)\\s*mm\\s*\\/\\s*s\\b' } },
          { key: 'minutes', label: 'For more than', name: 'Time above the limit', type: 'number', unit: 'min', min: 1, max: 240, step: 1, value: 30, integer: true, ref: 'PR-MAN-011', hint: 'PR-MAN-011: 30 min', extract: { kind: 'minutes' } },
          { key: 'critical', label: 'Critical failure', name: 'Critical failure', type: 'number', unit: 'mm/s', min: 2, max: 20, step: 0.1, value: 7.1, above: 'threshold', ref: 'PR-MAN-011', hint: 'PR-MAN-011: 7.1 mm/s', hl: 'Critical', extract: { from: 'sentence', near: '\\bcritic\\w*', re: '(\\d{1,2}(?:[.,]\\d{1,2})?)\\s*mm\\s*\\/\\s*s\\b' } },
          { key: 'approver', label: 'Approves the hold', ref: 'PR-CAL-004', hint: 'PR-CAL-004: Quality or Maintenance hold and release' },
          { key: 'notify', label: 'Notify', name: 'Notification', type: 'role', value: 'production', options: ['production', 'quality_shift', 'decider'], ref: 'Policy', hint: 'Via Microsoft Teams, to reschedule the machine', extract: { kind: 'role', cap: 'quality_incident' } }
        ],
        check: { id: 'umbral', ref: 'PR-MAN-011', keys: ['threshold', 'minutes'], label: 'Limit and time', describe: '{threshold} for more than {minutes}', extra: 'critical above {critical}', action: 'Checks the limit against PR-MAN-011 and ISO 10816-3' },
        scenarios: [
          'the spindle vibration of a machining centre exceeds {threshold} for more than {minutes}',
          'a vibration alarm goes off on a machining centre or a lathe (e.g. MC-04 in Zaragoza)',
          'the user reports that a spindle is noisy or vibrating more than usual',
          'the parts machined during a vibration excess need to be assessed'
        ],
        testUtterance: 'Alarm: the MC-04 spindle has been reading 7.8 mm/s for 40 minutes',
        matchGroups: [
          { re: '\\bspindles?\\b|\\bmc-\\d{2}\\b|\\bmachining cent(?:re|er)s?\\b|\\blathes?\\b|\\bmachines?\\b', w: 0.3, label: 'machine' },
          { re: '\\bvibrat\\w*|\\bmm\\/s\\b|\\brms\\b|\\bnois\\w*', w: 0.3, label: 'vibration' },
          { re: '\\balarm\\w*|\\bexceed\\w*|\\breading\\b|\\breads\\b|\\brising\\b|\\bexcess\\w*', w: 0.25, label: 'alarm' },
          { re: '\\bzaragoza\\b|\\bplaza\\b', w: 0.07, label: 'Zaragoza' }
        ],
        config: {
          vibration_monitor: [['limit_rms_mm_s', '{=threshold}'], ['minutes_above', '{=minutes}'], ['critical_rms_mm_s', '{=critical}'], ['standard', 'ISO 10816-3']],
          quality_hold: [['approver', '{approver}'], ['policy', 'PR-CAL-004'], ['inspection', '100 % metrology']],
          maintenance_order: [['type', 'Urgent corrective'], ['scope', 'Spindle bearings']],
          quality_incident: [['notify', '{notify}'], ['channel', 'Microsoft Teams']],
          production_planner: [['action', 'Reassign production orders to an equivalent machining centre']]
        },
        say: {
          draft: [
            'Every sentence is linked to what it understood: the trigger comes from “exceeds {threshold} for more than {minutes}”.',
            'Each step says which system it touches: IIoT Vibración for the spindle; SAP, Opcenter and Windchill for parts and batches; SAP QM for the hold; Maximo for the work order.',
            'The hold is not applied without approval from {del:approver}: PR-CAL-004 requires it, and the workflow enforces it even if the text did not say so.'
          ],
          published: ['From now on, an IIoT vibration alarm triggers it automatically. Let’s see it with this morning’s real alarm: MC-04, 05:50.']
        }
      },
      reclamacion: {
        first: 'complaint_intake',
        slug: 'wf-reclamacion-cliente',
        name: 'Customer complaint about an equipment failure',
        approver: 'quality',
        approverOptions: ['quality', 'after_sales'],
        policy: 'PR-CAL-008',
        go: 'reclamacion',
        goLabel: 'Test it with the PH-250 complaint',
        next: 'The next complaint email runs it. The one from Prensas y Servicios del Norte (PH250-26-0412) is awaiting a reply.',
        trigger: {
          system: 'Outlook', type: 'correo', icon: 'mail', badges: ['Outlook'],
          label: 'Complaint in the After-sales mailbox', sub: 'leak or equipment failure',
          entry: 'After-sales mailbox in Outlook',
          full: 'Customer complaint in the After-sales mailbox about a leak or equipment failure'
        },
        steps: {
          complaint_intake: { sub: 'Acknowledgement within {ack}', what: 'Logs the complaint in Salesforce Service, extracts serial number, model, defect and deadline, and sends the acknowledgement of receipt within {ack}', outputs: [{ icon: 'clipboard', text: 'Case in Salesforce Service with the extracted data' }] },
          part_traceability: { sub: 'Serial number trace', what: 'Traces the serial number: component batches, suppliers, assembly and test bench; other units built with the same batches', outputs: [{ icon: 'git-branch', text: 'Unit trace with component batches and sister units' }] },
          quality_incident: { sub: '8D within {days}', systems: ['SAP QM', 'Procedimientos'], what: 'Prepares the draft 8D report (PR-CAL-008) with similar complaints from the last {months}', outputs: [{ icon: 'file-text', text: 'Draft 8D report (PR-CAL-008), due within {days}' }] },
          notifier: { sub: 'After approval', what: 'Drafts the reply to the customer; it is sent through Outlook only after approval', outputs: [{ icon: 'send', text: 'Reply to the customer, sent after approval' }] }
        },
        params: [
          { key: 'ack', label: 'Acknowledgement of receipt', name: 'Acknowledgement of receipt', type: 'number', unit: 'h', min: 1, max: 72, step: 1, value: 24, integer: true, ref: 'PR-CAL-008', hint: 'PR-CAL-008: 24 h', extract: { from: 'text', re: '\\backnowledge?ment\\b[^.;]{0,40}?(\\d{1,3})\\s*(?:h|hours?)\\b' } },
          { key: 'days', label: '8D report', name: '8D deadline', type: 'number', unit: 'days', unitLong: 'working days', min: 1, max: 30, step: 1, value: 10, integer: true, ref: 'PR-CAL-008', hint: 'PR-CAL-008: 10 working days', hl: '8D deadline', extract: { from: 'text', re: '(\\d{1,2})\\s*(?:working|business) days\\b' } },
          { key: 'months', label: 'Complaint history', name: 'Complaint history', type: 'number', unit: 'months', min: 1, max: 60, step: 1, value: 24, integer: true, ref: 'Policy', hint: 'History from Salesforce Service and SAP QM', hl: 'History', extract: { from: 'text', re: '(\\d{1,2})\\s*months\\b' } },
          { key: 'approver', label: 'Approves the reply', ref: 'PR-CAL-008', hint: 'Before anything is sent to the customer' }
        ],
        check: { id: 'plazos', ref: 'PR-CAL-008', keys: ['ack', 'days'], label: 'Deadlines', describe: 'acknowledgement within {ack} and 8D report within {days}', action: 'Checks the deadlines against PR-CAL-008' },
        scenarios: [
          'a complaint from a customer or distributor about a leak or an equipment failure reaches the After-sales mailbox',
          'a customer complains about a press or a hydraulic power unit and the serial number needs investigating',
          'an 8D needs to be opened from a customer complaint'
        ],
        testUtterance: 'We have received a complaint from a distributor about an oil leak on a PH-250 press',
        matchGroups: [
          { re: '\\bcomplain\\w*', w: 0.35, label: 'complaint' },
          { re: '\\bcustomers?\\b|\\bdistributors?\\b', w: 0.2, label: 'customer' },
          { re: '\\bleak\\w*|\\boil\\b|\\bbreak\\w*|\\bfail\\w*|\\bnois\\w*|\\bdefect\\w*|\\bfault\\w*', w: 0.25, label: 'defect' },
          { re: '\\bpress(?:es)?\\b|\\bph-\\d|\\bgh-\\d|\\bserial number\\b|\\bhydraulic power unit\\b', w: 0.12, label: 'equipment' }
        ],
        config: {
          complaint_intake: [['ack_hours', '{=ack}'], ['system', 'Salesforce Service']],
          quality_incident: [['template', '8D · PR-CAL-008'], ['deadline_working_days', '{=days}'], ['history_months', '{=months}']],
          notifier: [['language', 'the customer’s'], ['approver', '{approver}']]
        },
        say: {
          draft: [
            'Every sentence of the text is linked to what it understood: the After-sales email triggers the workflow, and the deadlines come from the text itself.',
            'The trace goes from the serial number to the component batches and, from there, to other units built with the same batches.',
            'Nothing goes to the customer without approval from {del:approver}: PR-CAL-008 requires it.'
          ],
          published: ['The next complaint email runs it automatically. Let’s see it with the one from Prensas y Servicios del Norte.']
        }
      },
      parte: {
        first: 'plant_monitor',
        slug: 'wf-parte-diario-planta',
        name: 'Daily equipment report · Zaragoza',
        approver: 'quality',
        approverOptions: ['quality', 'quality_shift'],
        policy: 'PR-CAL-004',
        go: 'turno',
        goLabel: 'See the shift daily report',
        next: 'It runs every day at {time}.',
        trigger: {
          system: 'Scheduled', type: 'programado', icon: 'clock', badges: [],
          label: 'Every day at {time}', sub: 'Scheduled',
          entry: 'Daily server schedule · {time}'
        },
        steps: {
          plant_monitor: { sub: 'Plant equipment', what: 'Reads the equipment in Opcenter and IIoT Vibración, compares it with the PR-MAN-011 thresholds and opens notifications in Maximo without duplicating open orders', outputs: [{ icon: 'ticket', text: 'Maintenance notifications in GMAO Maximo, without duplicating open orders' }] },
          quality_hold: { sub: 'If a calibration fails', gateVerb: 'holding parts', what: 'If a metrology instrument is overdue for calibration, proposes holding the parts measured since the last valid calibration (PR-CAL-004)', outputs: [{ icon: 'lock', text: 'Hold on the measured parts if a calibration fails, after approval' }] },
          quality_incident: { sub: 'Summary in Teams', systems: ['Microsoft Teams'], what: 'Posts the report summary in the “Maintenance · Zaragoza” channel', outputs: [{ icon: 'message-square', text: 'Summary in the “Maintenance · Zaragoza” Teams channel' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Daily equipment report (PDF)' }],
        params: [
          { key: 'time', label: 'Report time', name: 'Report time', type: 'time', value: '06:00', ref: 'Policy', hint: 'Readings from Opcenter and IIoT Vibración', extract: { kind: 'time' } },
          { key: 'approver', label: 'Approves the hold', ref: 'PR-CAL-004', hint: 'PR-CAL-004 · PR-MAN-011' }
        ],
        staticChecks: [
          { id: 'vibraciones', text: 'Vibration thresholds under PR-MAN-011: warning at 2.8 mm/s and limit at 4.5 mm/s (ISO 10816-3)', stream: { action: 'Checks the report against PR-MAN-011', result: 'Zone C from 2.8 mm/s · zone D from 4.5 mm/s · metrology instruments with valid calibration' } }
        ],
        rules: [{ key: 'noDuplicate', re: '\\bwithout duplicating\\b', label: 'Rule', check: 'Notifications without duplicating the open GMAO Maximo orders' }],
        scenarios: [
          'it is {time} and the daily equipment report for the Zaragoza plant is due',
          'the user asks for the daily equipment report for the plant',
          'the user asks which machines in the plant are causing problems today'
        ],
        testUtterance: 'Run the daily report for the Zaragoza plant',
        matchGroups: [
          { re: '\\breport\\b', w: 0.35, label: 'report' },
          { re: '\\bequipment\\b|\\bplant\\b|\\bmachines?\\b|\\blines?\\b', w: 0.3, label: 'equipment' },
          { re: '\\bdaily\\b|\\btoday\\b|\\bshift\\b', w: 0.15, label: 'daily' },
          { re: '\\bzaragoza\\b|\\bplaza\\b', w: 0.1, label: 'Zaragoza' }
        ],
        config: {
          plant_monitor: [['time', '{time}'], ['equipment', 'Machining centres, lathes, grinders, test benches and compressors'], ['thresholds', 'PR-MAN-011'], ['notifications', 'GMAO Maximo, without duplicating open orders']],
          quality_hold: [['approver', '{approver}'], ['policy', 'PR-CAL-004']],
          quality_incident: [['channel', 'Microsoft Teams · Maintenance · Zaragoza']]
        },
        say: {
          draft: [
            'The report is scheduled: every day at {time}, without anyone asking for it.',
            'It opens notifications in Maximo only for items without an open order, and holds parts only with approval from {del:approver}.'
          ],
          published: ['Tomorrow at {time} it runs on its own; today’s is in the shift summary.']
        }
      }
    }
  }
});
