/* Cervecera Bardenas · From words to workflow (English). Fictitious company; synthetic demonstration data (MFM).
 * Same structure as ../workflow.js. Schema in the header of assets/js/scenes/workflow.js. Regex on folded text (lower case, no accents). */
agenticPackEn('cerveceria', {
  workflow: {
    space: 'Quality and Production · Arguedas',
    author: 'quality',
    authorNoun: 'Quality',
    alarmMatch: 'ferment|fermentador|fermentaci[oó]n',
    approverRoles: ['brewmaster', 'quality', 'quality_shift', 'customer_service'],
    feminineRoles: ['decider'],
    noArticleRoles: ['customer_service', 'customer_quality'],
    defaultPolicy: 'APPCC-01',
    approverRule: {
      policy: 'PR-FER-003',
      text: 'only the Head Brewer and Quality hold batches',
      note: 'Reassigned: PR-FER-003 reserves holds for the Head Brewer and Quality'
    },
    triggerExamples: '“When the temperature of a fermentation vessel exceeds…” or “Every day at 06:00…”',
    rolePatterns: [
      ['quality_shift', '\\b(?:shift )?quality technician(?: on shift)?\\b'],
      ['quality', '\\bquality manager\\b|\\bhead of quality\\b'],
      ['brewmaster', '\\bhead brewer\\b|\\bbrewmaster\\b'],
      ['maintenance', '\\bmaintenance manager\\b'],
      ['decider', '\\bproduction manager\\b'],
      ['logistics', '\\blogistics manager\\b'],
      ['customer_service', '\\bcustomer service\\b(?! mailbox)'],
      ['customer_quality', '\\bcustomer quality\\b']
    ],
    outOfScope: [
      {
        id: 'finanzas',
        re: '\\b(?:buy\\w*|bought|sell\\w*|sold|invest\\w*|trad(?:e|es|ing))\\b[^.;]{0,50}\\b(?:shares?|stocks?|equities|bitcoins?|crypto\\w*|currenc(?:y|ies)|forex|investment funds?|barley futures)\\b|\\bbank transfers?\\b|\\b(?:transfer|wire) (?:money|funds)\\b',
        title: 'Financial transaction',
        body: 'The text asks to buy or sell shares or futures, or to move money. No agent in the Quality and Production · Arguedas space trades on markets or makes payments, and Agentic Platform does not create steps that no enabled agent can perform.'
      },
      {
        id: 'personas',
        re: '\\b(?:evaluat\\w*|assess\\w*|scor\\w*|rate|rank\\w*|monitor\\w*|track\\w*|measure|sanction\\w*|dismiss\\w*|fire)\\b[^.;]{0,40}\\b(?:workers?|operators?|employees?|staff|workforce|personnel|people|brewers)\\b',
        title: 'Assessment of people',
        body: 'The text asks to assess, monitor or score people. Workflows in this space work on tanks, batches, analyses and quality documents; they do not rate anyone’s performance.'
      },
      {
        id: 'control',
        re: '\\b(?:chang\\w*|modif\\w*|adjust\\w*|lower\\w*|rais\\w*|increas\\w*|reduc\\w*)\\b[^.;]{0,30}\\b(?:set ?points?|recipes?)\\b|\\b(?:stop|start|restart|shut down|switch (?:on|off)|turn (?:on|off)|open the valve|close the valve)\\b[^.;]{0,25}\\b(?:fillers?|pasteuri[sz]ers?|fermentation vessels?|fermenters?|filters?|compressors?|glycol)\\b',
        title: 'Action on plant control',
        body: 'The text asks to change setpoints or recipes, or to operate valves and equipment. Agentic Platform reads the cellar SCADA and Brewmaxx but does not write to plant control: cellar staff make those changes from their own system.'
      }
    ],
    idle: [
      ['bell', 'brand', 'Trigger', 'A cellar SCADA alarm, an email in the Customer Service mailbox or a set time.'],
      ['cpu', '', 'Steps and systems', 'Which agent performs each step and which system it reads or updates: SAP, Brewmaxx, LIMS, Maximo or Teams.'],
      ['user-check', 'warn', 'Human approval', 'Who decides before anything is held, analysed or answered, under PR-FER-003 and APPCC-01.'],
      ['file-text', '', 'Outputs', 'Batch holds, analyses, work orders, reports and notifications produced by the workflow.']
    ],
    idleNote: 'Each element is linked to the sentence it comes from and checked against the HACCP plan and the cellar procedures before the draft is saved.',
    presenter: {
      idle: [
        'This is how Quality writes a procedure: in plain English, as in its HACCP plan. Nothing to draw, nothing to program.',
        'Agentic Platform turns it into a platform workflow: trigger, agents in order, human approval and outputs, each linked to its sentence.',
        'To be clear: text-to-workflow generation is simulated here and its integration into Agentic Platform is validated in the pilot; workflows (Routines), the editor, approval and auditing are standard.'
      ],
      outOfScopeExample: 'Lower the setpoint of all the fermentation vessels by one degree when the temperature rises'
    },

    templates: {
      alarma: {
        label: 'Fermentation',
        icon: 'thermometer',
        refs: 'PR-FER-003 and APPCC-01',
        text: 'When the temperature of a fermentation vessel in the cellar exceeds 13.5 °C for more than 2 hours, confirm the reading in the cellar SCADA and classify the deviation under PR-FER-003. Locate the wort batch in the vessel, its recipe, its day of fermentation and the planned transfers. Propose a quality hold on the batch in SAP and diacetyl and acetaldehyde analyses in LIMS LabWare, which must be approved by the Head Brewer before it is applied. If the temperature exceeds 15 °C, treat it as a critical deviation. After approval of the hold, open a work order in GMAO Maximo for the glycol valve. Reschedule the batch transfer in Brewmaxx and let the Production Manager know via Teams.'
      },
      reclamacion: {
        label: 'Complaint',
        icon: 'mail',
        refs: 'APPCC-01 and PR-CAL-006',
        text: 'When a complaint from a hospitality customer or a distributor about an off-flavour, haze or a foreign body reaches the Customer Service mailbox, log it in SAP (customer, product, keg or bottle batch, defect and response deadline) and send the acknowledgement of receipt within 24 h. Trace the batch backwards (brew, fermentation vessel, filtration, packaging, malt, hops and CO₂) and forwards (pallets, shipments and customers). Schedule the analysis of the batch reference sample in LIMS LabWare (dissolved oxygen, diacetyl and panel tasting). Prepare the investigation report under PR-CAL-006, with similar complaints from the last 12 months, and the reply to the customer. The reply is approved by the Quality Manager before it is sent; the reply to the customer is sent within 48 h.'
      },
      parte: {
        label: 'Daily report',
        icon: 'clipboard',
        refs: 'APPCC-01 and PR-ENV-002',
        text: 'Every day at 06:00, review the equipment readings for the brewery in Brewmaxx, the cellar SCADA and GMAO Maximo (brewhouse, fermentation vessels, filter, tunnel pasteuriser, bottle and keg fillers, and empty bottle inspector) and compare them with the brewery thresholds. For each item of equipment at warning or critical level, open a maintenance notification in GMAO Maximo with the recommended action, without duplicating orders that are already open. If the empty bottle inspector (glass CCP) is overdue for verification, propose a hold on the product packed since the last valid verification, which must be approved by the Quality Manager. Post the summary of the report in the Production Teams channel.'
      }
    },

    catalog: {
      ferment_monitor: {
        agent: 'Cellar monitor', icon: 'thermometer', systems: ['SCADA bodega', 'Brewmaxx (MES)'],
        what: 'Reads the vessel temperature series, confirms the deviation and classifies it',
        name: 'Fermentation deviation', verb: 'check the fermentation', token: 'fermentacion',
        keywords: ['\\btemperatures?\\b', '\\bdegrees\\b', '\\bfermentation deviation\\b'],
        strong: ['\\bconfirm\\w*', '\\bclassif\\w*', '\\bmonitor(?:s|ing)?\\b']
      },
      lot_trace: {
        agent: 'Traceability', icon: 'git-branch', systems: ['SAP S/4HANA', 'Brewmaxx (MES)', 'WMS Mecalux'],
        what: 'Locates wort batches, raw materials, packaging and shipments, backwards and forwards',
        name: 'Batch traceability', verb: 'trace batches', token: 'traza',
        keywords: ['\\btraceab\\w*', '\\btrac(?:e|es|ed|ing)\\b', ['\\bbatch(?:es)?\\b', '\\b(?:hold\\w*|block\\w*|retain\\w*|quarantin\\w*)\\s+(?:\\w+\\s+){0,2}$'], '\\b(?:locat|identif)\\w*\\s+(?:the\\s+|all\\s+)?(?:wort\\s+)?(?:batch(?:es)?|kegs|pallets|shipments)\\b', '\\b(?:backwards?|forwards?)\\b'],
        strong: ['\\btrac(?:e|es|ing)\\b', '\\btraceab\\w*', '\\blocat\\w*', '\\bidentif\\w*']
      },
      quality_hold: {
        agent: 'Quality hold', icon: 'lock', systems: ['SAP S/4HANA', 'Brewmaxx (MES)'], hitl: true, restricted: true, gateVerb: 'applying the hold',
        what: 'Proposes holding the batch or the packed product and only applies it after approval',
        name: 'Batch hold', verb: 'hold', token: 'retencion',
        keywords: ['\\bholds?\\b', '\\bblock(?:s|ed|ing)?\\b', '\\bretain\\w*', '\\bretention\\b', '\\bquarantin\\w*'],
        strong: ['\\bholds?\\b', '\\bblock(?:s|ed|ing)?\\b', '\\bretain\\w*', '\\bretention\\b', '\\bquarantin\\w*']
      },
      lab_analysis: {
        agent: 'Laboratory', icon: 'flask', systems: ['LIMS LabWare'],
        what: 'Schedules the analyses in LIMS and collects the results',
        name: 'Laboratory analysis', verb: 'analyse', token: 'analisis',
        keywords: ['\\bdiacetyl\\b', '\\bacetaldehyde\\b', '\\banalys[ie]s of the (?:batch )?reference sample\\b'],
        strong: ['\\banalys[ie]s of the (?:batch )?reference sample\\b', '\\bdiacetyl\\b']
      },
      maintenance_order: {
        agent: 'Maintenance', icon: 'wrench', systems: ['GMAO Maximo'],
        what: 'Opens the work order in Maximo with the equipment, the symptom and the recommended action',
        name: 'Maintenance order', verb: 'open the work order', token: 'ot',
        keywords: ['\\bwork orders?\\b', '\\bglycol valve\\b'],
        strong: ['\\bwork orders?\\b']
      },
      incident: {
        agent: 'Incidents', icon: 'clipboard', systems: ['SAP S/4HANA', 'Microsoft Teams'],
        what: 'Opens the non-conformity or the investigation report and sends the notifications',
        name: 'Quality incident', verb: 'open an incident', token: 'incidencia',
        keywords: ['\\bincidents?\\b', '\\bnon-?conformit\\w*', '\\binvestigation report\\b', '\\bnotif(?:y|ies)\\b', '\\b(?:post|publish)\\w* the summary\\b'],
        strong: ['\\bnon-?conformit\\w*', '\\binvestigation report\\b', '\\bincidents?\\b', '\\b(?:post|publish)\\w* the summary\\b', '\\bnotif(?:y|ies)\\b']
      },
      production_plan: {
        agent: 'Cellar planning', icon: 'calendar', systems: ['Brewmaxx (MES)', 'SAP S/4HANA'],
        what: 'Reschedules transfers, filtrations and packaging runs for the affected batch',
        name: 'Cellar rescheduling', verb: 'reschedule the transfer', token: 'replanifica',
        keywords: ['\\breschedul\\w*', '\\breplan\\w*'],
        strong: ['\\breschedul\\w*', '\\breplan\\w*']
      },
      complaint_intake: {
        agent: 'Complaint intake', icon: 'mail', systems: ['Outlook', 'SAP S/4HANA'],
        what: 'Logs the complaint and extracts customer, product, batch, defect and deadline',
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
        agent: 'Brewery daily report', icon: 'activity', systems: ['Brewmaxx (MES)', 'SCADA bodega', 'GMAO Maximo'], multi: 2,
        what: 'Compares readings with the brewery thresholds and opens notifications without duplicating orders',
        name: 'Brewery daily report', verb: 'run the brewery report', token: 'parte-fabrica',
        keywords: ['\\bdaily report\\b', '\\bequipment readings\\b', '\\breadings (?:of|from|for) (?:the )?(?:equipment|machines)\\b', '\\bmaintenance notifications?\\b'],
        strong: ['\\breview\\w*', '\\breadings\\b', '\\bmaintenance notifications?\\b']
      }
    },

    domains: {
      alarma: {
        first: 'ferment_monitor',
        slug: 'wf-temperatura-fermentador',
        name: 'Fermentation vessel temperature deviation',
        approver: 'brewmaster',
        approverOptions: ['brewmaster', 'quality', 'quality_shift'],
        policy: 'PR-FER-003',
        go: 'alarma',
        goLabel: 'Test it with the FV-12 alarm',
        next: 'The next cellar SCADA alarm runs it. The FV-12 alarm from 05:50 is still open.',
        trigger: {
          system: 'SCADA bodega', type: 'temperatura', icon: 'thermometer', badges: ['SCADA bodega'],
          label: 'Fermentation vessel temperature > {threshold}', sub: 'for more than {minutes}',
          entry: 'Cellar SCADA alarm received by webhook',
          full: 'Fermentation vessel temperature > {threshold} for more than {minutes}'
        },
        steps: {
          ferment_monitor: { sub: 'Critical > {critical}', what: 'Reads the vessel temperature series and the glycol valve opening, confirms the deviation and classifies it under PR-FER-003 (critical above {critical})' },
          lot_trace: { sub: 'Wort batch', what: 'Wort batch in the vessel, recipe, day of fermentation, volume and transfers planned in Brewmaxx' },
          quality_hold: { sub: 'After approval', what: 'Proposes a quality hold on the batch in SAP; it is applied only after approval', outputs: [{ icon: 'lock', text: 'Batch on hold in SAP S/4HANA, after approval' }] },
          lab_analysis: { sub: 'Diacetyl and acetaldehyde', what: 'Schedules diacetyl (VDK) and acetaldehyde analyses for the batch in LIMS LabWare', outputs: [{ icon: 'flask', text: 'Diacetyl and acetaldehyde analyses scheduled in LIMS' }] },
          maintenance_order: { sub: 'Glycol valve', what: 'Opens the work order in Maximo to inspect the vessel’s glycol valve', outputs: [{ icon: 'wrench', text: 'Work order in GMAO Maximo for the glycol valve' }] },
          production_plan: { sub: 'Transfer and notification', systems: ['Brewmaxx (MES)', 'Microsoft Teams'], what: 'Reschedules the batch transfer in Brewmaxx until the laboratory results are in and lets {al:notify} know via Teams', outputs: [{ icon: 'calendar', text: 'Transfer rescheduled in Brewmaxx' }, { icon: 'message-square', text: 'Teams notification to {al:notify}' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Deviation report (PDF) with the audit trail' }],
        params: [
          { key: 'threshold', label: 'Vessel limit', name: 'Vessel limit', type: 'number', unit: '°C', min: 4, max: 25, step: 0.5, value: 13.5, ref: 'PR-FER-003', hint: 'PR-FER-003: 13.5 °C (lager setpoint 12 °C)', below: 'critical', extract: { from: 'trigger', re: '(\\d{1,2}(?:[.,]\\d)?)\\s*(?:degrees(?:\\s+(?:celsius|c))?|c)\\b' } },
          { key: 'minutes', label: 'For more than', name: 'Time above the limit', type: 'number', unit: 'min', min: 1, max: 480, step: 5, value: 120, integer: true, ref: 'PR-FER-003', hint: 'PR-FER-003: 2 h (120 min)', extract: { kind: 'minutes' } },
          { key: 'critical', label: 'Critical deviation', name: 'Critical deviation', type: 'number', unit: '°C', min: 5, max: 30, step: 0.5, value: 15, above: 'threshold', ref: 'PR-FER-003', hint: 'PR-FER-003: 15 °C', hl: 'Critical', extract: { from: 'sentence', near: '\\bcritic\\w*', re: '(\\d{1,2}(?:[.,]\\d)?)\\s*(?:degrees(?:\\s+(?:celsius|c))?|c)\\b' } },
          { key: 'approver', label: 'Approves the hold', ref: 'PR-FER-003', hint: 'PR-FER-003: the Head Brewer decides' },
          { key: 'notify', label: 'Notify', name: 'Notification', type: 'role', value: 'decider', options: ['decider', 'maintenance', 'logistics'], ref: 'Policy', hint: 'Via Microsoft Teams, to replan the cellar', extract: { kind: 'role', cap: 'production_plan' } }
        ],
        check: { id: 'umbral', ref: 'PR-FER-003', keys: ['threshold', 'minutes'], label: 'Limit and time', describe: '{threshold} for more than {minutes}', extra: 'critical above {critical}', action: 'Checks the limit against PR-FER-003' },
        scenarios: [
          'the temperature of a fermentation vessel exceeds {threshold} for more than {minutes}',
          'a temperature alarm goes off on a fermentation vessel or a lagering tank (e.g. FV-12 in Arguedas)',
          'the cellar operator reports that a fermentation vessel is not cooling',
          'a decision is needed on what to do with a wort batch after a fermentation deviation'
        ],
        testUtterance: 'Alarm: FV-12 has been reading 16.8 °C for more than three hours',
        matchGroups: [
          { re: '\\bfermentation vessels?\\b|\\bfermenters?\\b|\\bfv-\\d+\\b|\\bcellar\\b|\\btanks?\\b|\\bvessels?\\b', w: 0.3, label: 'vessel' },
          { re: '\\btemperature\\w*|\\bdegrees\\b|\\d\\s*c\\b|\\bglycol\\b|\\bcool\\w*', w: 0.3, label: 'temperature' },
          { re: '\\balarm\\w*|\\bdeviation\\w*|\\bexceed\\w*|\\breading\\b|\\brising\\b', w: 0.25, label: 'alarm' },
          { re: '\\barguedas\\b|\\bbardenas\\b', w: 0.07, label: 'Arguedas' }
        ],
        config: {
          ferment_monitor: [['limit_c', '{=threshold}'], ['minutes_above', '{=minutes}'], ['critical_c', '{=critical}'], ['equipment', 'Fermentation vessels and lagering tanks']],
          quality_hold: [['approver', '{approver}'], ['policy', 'PR-FER-003']],
          lab_analysis: [['analyses', 'Diacetyl (VDK) · acetaldehyde'], ['system', 'LIMS LabWare']],
          maintenance_order: [['scope', 'Vessel glycol valve']],
          production_plan: [['action', 'Reschedule transfer until LIMS results are in'], ['notify', '{notify}'], ['channel', 'Microsoft Teams']]
        },
        say: {
          draft: [
            'Every sentence is linked to what it understood: the trigger comes from “exceeds {threshold} for more than {minutes}”.',
            'Each step says which system it touches: the SCADA for the temperature; SAP and Brewmaxx for the batch; LIMS for the analyses; Maximo for the glycol valve.',
            'The hold is not applied without approval from {del:approver}: PR-FER-003 requires it, and the workflow enforces it even if the text did not say so.'
          ],
          published: ['From now on, a cellar SCADA alarm triggers it automatically. Let’s see it with this morning’s real alarm: FV-12, 05:50.']
        }
      },
      reclamacion: {
        first: 'complaint_intake',
        slug: 'wf-reclamacion-cliente',
        name: 'Customer complaint about a product defect',
        approver: 'quality',
        approverOptions: ['quality', 'brewmaster', 'customer_service'],
        policy: 'PR-CAL-006',
        go: 'reclamacion',
        goLabel: 'Test it with the batch L2608-K14 complaint',
        next: 'The next complaint email runs it. The one from Distribuciones Hosteleras Ribera (batch L2608-K14) is awaiting a reply.',
        trigger: {
          system: 'Outlook', type: 'correo', icon: 'mail', badges: ['Outlook'],
          label: 'Complaint in the Customer Service mailbox', sub: 'off-flavour, haze or foreign body',
          entry: 'Customer Service mailbox in Outlook',
          full: 'Customer complaint about an off-flavour, haze or a foreign body'
        },
        steps: {
          complaint_intake: { sub: 'Acknowledgement within {ack}', what: 'Logs the complaint in SAP, extracts customer, product, keg or bottle batch and defect, and sends the acknowledgement of receipt within {ack}', outputs: [{ icon: 'clipboard', text: 'Complaint logged in SAP with the extracted data' }] },
          lot_trace: { sub: 'Full trace', what: 'Traces the batch: brew, fermentation vessel, filtration, packaging and raw materials; pallets, shipments and customers', outputs: [{ icon: 'git-branch', text: 'Batch trace with raw materials and customers supplied' }] },
          lab_analysis: { sub: 'Reference sample', what: 'Schedules the analysis of the batch reference sample in LIMS: dissolved oxygen, diacetyl and panel tasting', outputs: [{ icon: 'flask', text: 'Reference sample analysis scheduled in LIMS' }] },
          incident: { sub: 'Report', systems: ['SAP S/4HANA', 'Procedimientos'], what: 'Prepares the investigation report (PR-CAL-006) with similar complaints from the last {months}', outputs: [{ icon: 'file-text', text: 'Investigation report (PR-CAL-006)' }] },
          notifier: { sub: 'Within {answer}, after approval', what: 'Drafts the reply to the customer; it is sent through Outlook only after approval, within {answer} at most', outputs: [{ icon: 'send', text: 'Reply to the customer within {answer}, after approval' }] }
        },
        params: [
          { key: 'ack', label: 'Acknowledgement of receipt', name: 'Acknowledgement of receipt', type: 'number', unit: 'h', min: 1, max: 72, step: 1, value: 24, integer: true, ref: 'APPCC-01', hint: 'APPCC-01: 24 h', extract: { from: 'text', re: '\\backnowledge?ment\\b[^.;]{0,40}?(\\d{1,3})\\s*(?:h|hours?)\\b' } },
          { key: 'answer', label: 'Reply to the customer', name: 'Reply deadline', type: 'number', unit: 'h', min: 1, max: 240, step: 1, value: 48, integer: true, ref: 'Policy', hint: 'Customer service policy: 48 h', hl: 'Deadline', extract: { from: 'text', re: '\\b(?:reply|response) to the customer\\b[^.;]{0,40}?(\\d{1,3})\\s*(?:h|hours?)\\b' } },
          { key: 'months', label: 'Complaint history', name: 'Complaint history', type: 'number', unit: 'months', min: 1, max: 36, step: 1, value: 12, integer: true, ref: 'Policy', hint: 'History from SAP and LIMS', hl: 'History', extract: { from: 'text', re: '(\\d{1,2})\\s*months\\b' } },
          { key: 'approver', label: 'Approves the reply', ref: 'PR-CAL-006', hint: 'Before anything is sent to the customer' }
        ],
        check: { id: 'plazos', ref: 'the customer service policy', keys: ['ack', 'answer'], label: 'Deadlines', describe: 'acknowledgement within {ack} and reply within {answer}', action: 'Checks the deadlines against the customer service policy' },
        scenarios: [
          'a complaint from a bar or a distributor about an off-flavour, haze or a foreign body reaches the Customer Service mailbox',
          'a hospitality customer complains about some kegs and the batch needs investigating',
          'an investigation report needs to be opened from a customer complaint'
        ],
        testUtterance: 'A distributor is complaining about kegs of Bardenas Lager that taste of cardboard',
        matchGroups: [
          { re: '\\bcomplain\\w*', w: 0.35, label: 'complaint' },
          { re: '\\bcustomers?\\b|\\bdistributors?\\b|\\bbars?\\b|\\bpubs?\\b|\\bhospitality\\b', w: 0.2, label: 'customer' },
          { re: '\\bflavou?r\\w*|\\btaste\\w*|\\bcardboard\\b|\\boxidi[sz]\\w*|\\bhaz[ey]\\b|\\bforeign bod\\w*|\\bglass\\b', w: 0.25, label: 'defect' },
          { re: '\\bbatch(?:es)?\\b|\\bkegs?\\b|\\bbottles?\\b|\\blager\\b|\\bamber\\b', w: 0.12, label: 'batch' }
        ],
        config: {
          complaint_intake: [['ack_hours', '{=ack}'], ['system', 'SAP S/4HANA']],
          lab_analysis: [['analyses', 'Dissolved oxygen · diacetyl · panel tasting']],
          incident: [['template', 'Investigation report · PR-CAL-006'], ['history_months', '{=months}']],
          notifier: [['deadline_hours', '{=answer}'], ['approver', '{approver}']]
        },
        say: {
          draft: [
            'Every sentence of the text is linked to what it understood: the customer’s email triggers the workflow and the deadlines come from the text itself.',
            'The trace reaches the malt, hops and CO₂ of the batch, and the laboratory analyses the reference sample before anyone replies.',
            'Nothing goes to the customer without approval from {del:approver}.'
          ],
          published: ['The next complaint email runs it automatically. Let’s see it with the one from Distribuciones Hosteleras Ribera.']
        }
      },
      parte: {
        first: 'plant_monitor',
        slug: 'wf-parte-diario-fabrica',
        name: 'Daily equipment report · Arguedas',
        approver: 'quality',
        approverOptions: ['quality', 'quality_shift', 'brewmaster'],
        policy: 'PR-ENV-002',
        go: 'turno',
        goLabel: 'See the shift daily report',
        next: 'It runs every day at {time}.',
        trigger: {
          system: 'Scheduled', type: 'programado', icon: 'clock', badges: [],
          label: 'Every day at {time}', sub: 'Scheduled',
          entry: 'Daily server schedule · {time}'
        },
        steps: {
          plant_monitor: { sub: 'Brewery equipment', what: 'Reads the equipment in Brewmaxx, the cellar SCADA and Maximo, compares it with the brewery thresholds and opens notifications without duplicating open orders', outputs: [{ icon: 'ticket', text: 'Maintenance notifications in GMAO Maximo, without duplicating open orders' }] },
          quality_hold: { sub: 'If the glass CCP fails', gateVerb: 'holding product', what: 'If the empty bottle inspector (glass CCP) is overdue for verification, proposes holding the product packed since the last valid verification (PR-ENV-002)', outputs: [{ icon: 'lock', text: 'Hold on the packed product if the glass CCP fails, after approval' }] },
          incident: { sub: 'Summary in Teams', systems: ['Microsoft Teams'], what: 'Posts the report summary in the “Production · Arguedas” channel', outputs: [{ icon: 'message-square', text: 'Summary in the “Production · Arguedas” Teams channel' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Daily equipment report (PDF)' }],
        params: [
          { key: 'time', label: 'Report time', name: 'Report time', type: 'time', value: '06:00', ref: 'Policy', hint: 'Readings from Brewmaxx and the cellar SCADA', extract: { kind: 'time' } },
          { key: 'approver', label: 'Approves the hold', ref: 'PR-ENV-002', hint: 'PR-ENV-002 · APPCC-01' }
        ],
        staticChecks: [
          { id: 'pcc', text: 'Empty bottle inspector as glass CCP: verification with test bottles at the start of each shift (PR-ENV-002)', stream: { action: 'Checks the report against APPCC-01 and PR-ENV-002', result: 'Empty bottle inspector is a CCP: verification with test bottles at the start of each shift' } }
        ],
        rules: [{ key: 'noDuplicate', re: '\\bwithout duplicating\\b', label: 'Rule', check: 'Notifications without duplicating the open GMAO Maximo orders' }],
        scenarios: [
          'it is {time} and the daily equipment report for the Arguedas brewery is due',
          'the user asks for the daily equipment report for the brewery',
          'the user asks which cellar or packaging equipment is causing problems today'
        ],
        testUtterance: 'Run the daily report for the Arguedas brewery',
        matchGroups: [
          { re: '\\breport\\b', w: 0.35, label: 'report' },
          { re: '\\bequipment\\b|\\bbrewery\\b|\\blines?\\b|\\bcellar\\b|\\bpackaging\\b', w: 0.3, label: 'equipment' },
          { re: '\\bdaily\\b|\\btoday\\b|\\bshift\\b', w: 0.15, label: 'daily' },
          { re: '\\barguedas\\b|\\bbardenas\\b', w: 0.1, label: 'Arguedas' }
        ],
        config: {
          plant_monitor: [['time', '{time}'], ['equipment', 'Brewhouse, fermentation vessels, filter, pasteuriser, fillers and bottle inspector'], ['notifications', 'GMAO Maximo, without duplicating open orders']],
          quality_hold: [['approver', '{approver}'], ['policy', 'PR-ENV-002 · APPCC-01']],
          incident: [['channel', 'Microsoft Teams · Production · Arguedas']]
        },
        say: {
          draft: [
            'The report is scheduled: every day at {time}, without anyone asking for it.',
            'It opens notifications only for items without an open order, and holds product only with approval from {del:approver}.'
          ],
          published: ['Tomorrow at {time} it runs on its own; today’s is in the shift summary.']
        }
      }
    }
  }
});
