/* Banco Cierzo · From words to workflow (English). Fictitious bank; synthetic demonstration data (MFM).
 * Same structure as ../workflow.js. Schema in the header of assets/js/scenes/workflow.js. Regex on folded text (lower case, no accents). */
agenticPackEn('banca', {
  workflow: {
    space: 'Operations · Madrid',
    author: 'decider',
    authorNoun: 'Operations',
    alarmMatch: 'fraud|fraude',
    approverRoles: ['fraud', 'fraud_shift', 'cards', 'customer_service', 'compliance'],
    noArticleRoles: ['it_risk'],
    defaultPolicy: 'POL-FRA-003',
    approverRule: {
      policy: 'POL-FRA-003',
      text: 'only Fraud Prevention and Payments and Cards approve card blocks',
      note: 'Reassigned: POL-FRA-003 reserves blocks for Fraud Prevention'
    },
    triggerExamples: '“When the fraud rate for a BIN exceeds…” or “Every day at 07:00…”',
    rolePatterns: [
      ['fraud', '\\bhead of fraud prevention\\b|\\bfraud prevention manager\\b'],
      ['fraud_shift', '\\bfraud analyst(?: on shift)?\\b|\\bshift fraud analyst\\b'],
      ['cards', '\\bhead of payments(?: and cards)?\\b|\\bpayments and cards manager\\b'],
      ['customer_service', '\\bcustomer service(?: department)?\\b'],
      ['compliance', '\\b(?:chief )?compliance officer\\b|\\bhead of compliance\\b'],
      ['it_risk', '\\bict risk\\b'],
      ['decider', '\\bhead of operations\\b|\\boperations director\\b']
    ],
    outOfScope: [
      {
        id: 'finanzas',
        re: '\\b(?:buy\\w*|bought|sell\\w*|sold|invest\\w*|trad(?:e|es|ing))\\b[^.;]{0,50}\\b(?:shares?|stocks?|equities|bitcoins?|crypto\\w*|currenc(?:y|ies)|forex|investment funds?)\\b|\\bbank transfers?\\b|\\b(?:transfer|wire) (?:money|funds)\\b',
        title: 'Financial transaction',
        body: 'The text asks to buy or sell assets or to move money between accounts. No agent in the Operations · Madrid space trades on markets or orders transfers, and Agentic Platform does not create steps that no enabled agent can perform.'
      },
      {
        id: 'personas',
        re: '\\b(?:evaluat\\w*|assess\\w*|scor\\w*|rate|rank\\w*|monitor\\w*|track\\w*|measure|sanction\\w*|dismiss\\w*|fire)\\b[^.;]{0,40}\\b(?:workers?|employees?|relationship managers?|account managers?|staff|workforce|personnel|people|analysts)\\b',
        title: 'Assessment of people',
        body: 'The text asks to assess, monitor or score employees. Workflows in this space work on cards, transactions, merchants and case files; they do not rate anyone’s performance.'
      },
      {
        id: 'credito',
        re: '\\b(?:grant\\w*|approve|deny\\w*|declin\\w*|extend\\w*|increas\\w*|reduc\\w*|rais\\w*|lower\\w*)\\b[^.;]{0,40}\\b(?:loans?|mortgages?|credits?|credit limits?|credit scor\\w*|scoring)\\b',
        title: 'Credit decision',
        body: 'The text asks to grant, deny or change credit. Credit risk decisions follow the bank’s credit approval process and are not automated in this space: Agentic Platform does not create steps that decide on a customer’s creditworthiness.'
      }
    ],
    idle: [
      ['bell', 'brand', 'Trigger', 'A Falcon Fraud alert, an email in the SAC mailbox or a set time.'],
      ['cpu', '', 'Steps and systems', 'Which agent performs each step and which system it reads or updates: T24, Falcon, Redsys, Salesforce FSC or ServiceNow.'],
      ['user-check', 'warn', 'Human approval', 'Who decides before anything is blocked, credited or answered, under POL-FRA-003 and PR-SAC-001.'],
      ['file-text', '', 'Outputs', 'Blocking rules, reissues, customer notifications, case files and reports produced by the workflow.']
    ],
    idleNote: 'Each element is linked to the sentence it comes from and checked against the fraud, SAC and DORA policies before the draft is saved.',
    presenter: {
      idle: [
        'This is how Operations writes a procedure: in plain English, as in its policy. Nothing to draw, nothing to program.',
        'Agentic Platform turns it into a platform workflow: trigger, agents in order, human approval and outputs, each linked to its sentence.',
        'To be clear: text-to-workflow generation is simulated here and its integration into Agentic Platform is validated in the pilot; workflows (Routines), the editor, approval and auditing are standard.'
      ],
      outOfScopeExample: 'Grant a pre-approved loan to customers whose salary is paid into their account'
    },

    templates: {
      alarma: {
        label: 'Card fraud',
        icon: 'shield',
        refs: 'POL-FRA-003 and PR-TAR-007',
        text: 'When the card-not-present fraud rate for a BIN exceeds 1 % for more than 30 minutes, confirm the spike in Falcon Fraud and classify it by merchant, channel and country. Locate the suspicious transactions, the affected cards and their holders in the core banking system. Propose a preventive blocking rule in Falcon for high-risk e-commerce on the BIN, which must be approved by the Head of Fraud Prevention before it is activated. If the rate exceeds 2.5 %, treat the spike as critical. After approval of the rule, request reissue of the compromised cards, send an SMS and an in-app notification to the affected customers and notify the Head of Payments and Cards via Teams.'
      },
      reclamacion: {
        label: 'Complaint',
        icon: 'mail',
        refs: 'PR-SAC-001 and PR-TAR-007',
        text: 'When a complaint from a customer who does not recognise charges on their card reaches the SAC mailbox, log it in Salesforce FSC (customer, card, transactions, amounts and response deadline) and send the acknowledgement of receipt within 24 h. Trace the transactions in Redsys and Falcon Fraud backwards (strong customer authentication, device and merchant) and forwards (other cards used at the same merchant). Propose a provisional credit for the unrecognised charges before the end of the next business day, as PSD2 requires. Prepare the case file under PR-SAC-001, with similar complaints from the last 12 months, and the reply to the customer. The credit and the reply are approved by the Customer Service Department before they are applied; the case is resolved within 15 business days.'
      },
      parte: {
        label: 'Daily report',
        icon: 'clipboard',
        refs: 'POL-FRA-003 and PR-DORA-002',
        text: 'Every day at 07:00, review the channel indicators in Redsys, Falcon Fraud and ServiceNow (acceptance rate, declines, fraud by channel, POS and ATM availability, and service outages) and compare them with the Operations Centre thresholds. For each indicator at warning or critical level, open a ticket in ServiceNow with the recommended action, without duplicating tickets that are already open. If a preventive blocking rule has been active for more than 72 h, propose keeping it or withdrawing it, which must be approved by the Head of Fraud Prevention. Post the summary of the report in the Operations Teams channel.'
      }
    },

    catalog: {
      fraud_monitor: {
        agent: 'Fraud monitor', icon: 'shield', systems: ['Falcon Fraud', 'Redsys'],
        what: 'Reads the fraud rate by BIN, channel and merchant, confirms the spike and classifies it',
        name: 'Fraud spike', verb: 'check the fraud', token: 'fraude',
        keywords: ['\\bfraud rate\\b', '\\bsuspicious transactions\\b', '\\bbin\\b', '\\bfraud spike\\b'],
        strong: ['\\bconfirm\\w*', '\\bclassif\\w*', '\\bmonitor(?:s|ing)?\\b']
      },
      card_trace: {
        agent: 'Transaction traceability', icon: 'git-branch', systems: ['Core bancario T24', 'Redsys', 'Falcon Fraud'],
        what: 'Locates the affected transactions, cards, merchants and holders, backwards and forwards',
        name: 'Transaction trace', verb: 'trace transactions', token: 'traza',
        keywords: ['\\btraceab\\w*', '\\btrac(?:e|es|ed|ing)\\b', '\\b(?:locat|identif)\\w*\\s+(?:the\\s+|all\\s+)?(?:suspicious\\s+)?(?:transactions|cards|holders|cardholders|merchants)\\b', '\\b(?:backwards?|forwards?)\\b'],
        strong: ['\\btrac(?:e|es|ing)\\b', '\\btraceab\\w*', '\\blocat\\w*', '\\bidentif\\w*']
      },
      card_block: {
        agent: 'Preventive block', icon: 'lock', systems: ['Falcon Fraud', 'Core bancario T24'], hitl: true, restricted: true, gateVerb: 'activating the block',
        what: 'Proposes the blocking rule or the card block and only applies it after approval',
        name: 'Card block', verb: 'block', token: 'bloqueo',
        keywords: ['\\bblock\\w*', '\\bfreez\\w* (?:the )?cards?\\b'],
        strong: ['\\bblock\\w*', '\\bfreez\\w*']
      },
      card_reissue: {
        agent: 'Card reissue', icon: 'repeat', systems: ['Core bancario T24'],
        what: 'Requests reissue of the compromised cards under PR-TAR-007',
        name: 'Card reissue', verb: 'reissue cards', token: 'reemision',
        keywords: ['\\bre-?issu\\w*'],
        strong: ['\\bre-?issu\\w*']
      },
      customer_notice: {
        agent: 'Customer notifications', icon: 'message-square', systems: ['Salesforce FSC'],
        what: 'Sends an SMS and an in-app notification to the affected customers',
        name: 'Customer notification', verb: 'notify the customers', token: 'aviso-clientes',
        keywords: ['\\bsms\\b', '\\bin-app notifications?\\b', '\\bpush notifications?\\b'],
        strong: ['\\bsms\\b', '\\bin-app notifications?\\b']
      },
      incident: {
        agent: 'Incidents', icon: 'clipboard', systems: ['ServiceNow', 'Microsoft Teams'],
        what: 'Opens the incident or the case file, prepares the DORA notification if applicable and sends the notifications',
        name: 'Operational incident', verb: 'open the incident', token: 'incidente',
        keywords: ['\\bincidents?\\b', '\\bcase files?\\b', '\\bdora\\b', '\\bnotif(?:y|ies)\\b', '\\b(?:post|publish)\\w* the summary\\b'],
        strong: ['\\bincidents?\\b', '\\bcase file\\b', '\\bdora\\b', '\\b(?:post|publish)\\w* the summary\\b', '\\bnotif(?:y|ies)\\b']
      },
      complaint_intake: {
        agent: 'Complaint intake', icon: 'mail', systems: ['Outlook', 'Salesforce FSC'],
        what: 'Logs the complaint and extracts customer, card, transactions, amounts and deadline',
        name: 'Customer complaint', verb: 'log the complaint', token: 'reclamacion',
        keywords: ['\\bcomplain\\w*'],
        strong: ['\\blog\\b', '\\bregister\\w*', '\\brecord\\b', '\\bextract\\b']
      },
      chargeback: {
        agent: 'Credits and chargebacks', icon: 'euro', systems: ['Core bancario T24', 'Redsys'], hitl: true, gateVerb: 'applying the provisional credit',
        what: 'Proposes the provisional credit and the chargeback through the card scheme; applies them only after approval',
        name: 'Provisional credit', verb: 'credit', token: 'abono',
        keywords: ['\\b(?:provisional|temporary) (?:credit|refund)\\b', '\\bchargebacks?\\b'],
        strong: ['\\b(?:provisional|temporary) (?:credit|refund)\\b', '\\bchargebacks?\\b']
      },
      notifier: {
        agent: 'Customer reply', icon: 'send', systems: ['Outlook', 'Salesforce FSC'], hitl: true, gateVerb: 'sending the reply',
        what: 'Drafts the reply to the customer and sends it once approved',
        name: 'Customer reply', verb: 'reply to the customer', token: 'respuesta',
        keywords: ['\\b(?:reply|response|answer) to the customer\\b', '\\b(?:reply to|respond to|answer) the customer\\b'],
        strong: ['\\b(?:reply|response|answer) to the customer\\b', '\\b(?:reply to|respond to|answer) the customer\\b']
      },
      ops_monitor: {
        agent: 'Operations daily report', icon: 'activity', systems: ['Redsys', 'Falcon Fraud', 'ServiceNow'], multi: 2,
        what: 'Compares the channel indicators with their thresholds and opens tickets without duplicates',
        name: 'Operations daily report', verb: 'run the operations report', token: 'parte-operaciones',
        keywords: ['\\bdaily report\\b', '\\bchannel indicators\\b', '\\bindicators (?:for|of) (?:the )?channels\\b', '\\btickets? in servicenow\\b'],
        strong: ['\\breview\\w*', '\\bindicators\\b', '\\btickets? in servicenow\\b']
      }
    },

    domains: {
      alarma: {
        first: 'fraud_monitor',
        slug: 'wf-pico-fraude-bin',
        name: 'Card fraud spike on a BIN',
        approver: 'fraud',
        approverOptions: ['fraud', 'fraud_shift', 'cards'],
        policy: 'POL-FRA-003',
        go: 'alarma',
        goLabel: 'Test it with the BIN 454812 alert',
        next: 'The next Falcon Fraud alert runs it. The BIN 454812 alert from 05:50 is still open.',
        trigger: {
          system: 'Falcon Fraud', type: 'fraude', icon: 'shield', badges: ['Falcon Fraud'],
          label: 'CNP fraud on a BIN > {threshold}', sub: 'for more than {minutes}',
          entry: 'Falcon Fraud alert received by webhook',
          full: 'CNP fraud rate on a BIN > {threshold} for more than {minutes}'
        },
        steps: {
          fraud_monitor: { sub: 'Critical > {critical}', what: 'Reads the card-not-present fraud rate for the BIN, confirms the spike and classifies it by merchant, channel and country (critical above {critical})' },
          card_trace: { sub: 'Transactions and cards', what: 'Suspicious transactions on the BIN, affected cards and their holders in T24, with the merchants and MCCs involved' },
          card_block: { sub: 'After approval', what: 'Proposes a preventive blocking rule in Falcon for high-risk e-commerce on the BIN; it is activated only after approval', outputs: [{ icon: 'lock', text: 'Preventive blocking rule active in Falcon Fraud, after approval' }] },
          card_reissue: { sub: 'PR-TAR-007', what: 'Requests reissue of the compromised cards in T24, with permanent blocking of the old ones (PR-TAR-007)', outputs: [{ icon: 'repeat', text: 'Reissue of the compromised cards in T24' }] },
          customer_notice: { sub: 'SMS and app', what: 'Sends an SMS and an in-app notification to the affected cardholders about the block and the new card', outputs: [{ icon: 'message-square', text: 'SMS and in-app notification to the affected customers' }] },
          incident: { sub: 'Teams notification', systems: ['ServiceNow', 'Microsoft Teams'], what: 'Opens the incident in ServiceNow and notifies {al:notify} via Teams with the BIN, the amount and the active rule', outputs: [{ icon: 'message-square', text: 'Incident in ServiceNow and Teams notification to {al:notify}' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Fraud episode report (PDF) with the audit trail' }],
        params: [
          { key: 'threshold', label: 'CNP fraud rate', name: 'CNP fraud rate', type: 'number', unit: '%', min: 0.1, max: 10, step: 0.1, value: 1, ref: 'POL-FRA-003', hint: 'POL-FRA-003: 1 % (usual 0.3 %)', below: 'critical', extract: { from: 'trigger', re: '(\\d{1,2}(?:[.,]\\d{1,2})?)\\s*%' } },
          { key: 'minutes', label: 'For more than', name: 'Time above the threshold', type: 'number', unit: 'min', min: 1, max: 240, step: 1, value: 30, integer: true, ref: 'POL-FRA-003', hint: 'POL-FRA-003: 30 min', extract: { kind: 'minutes' } },
          { key: 'critical', label: 'Critical spike', name: 'Critical spike', type: 'number', unit: '%', min: 0.2, max: 20, step: 0.1, value: 2.5, above: 'threshold', ref: 'POL-FRA-003', hint: 'POL-FRA-003: 2.5 %', hl: 'Critical', extract: { from: 'sentence', near: '\\bcritic\\w*', re: '(\\d{1,2}(?:[.,]\\d{1,2})?)\\s*%' } },
          { key: 'approver', label: 'Approves the block', ref: 'POL-FRA-003', hint: 'POL-FRA-003: only Fraud Prevention activates blocking rules' },
          { key: 'notify', label: 'Notify', name: 'Notification', type: 'role', value: 'cards', options: ['cards', 'decider', 'it_risk'], ref: 'Policy', hint: 'Via Microsoft Teams, to prepare the reissue', extract: { kind: 'role', cap: 'incident' } }
        ],
        check: { id: 'umbral', ref: 'POL-FRA-003', keys: ['threshold', 'minutes'], label: 'Threshold and time', describe: '{threshold} for more than {minutes}', extra: 'critical above {critical}', action: 'Checks the threshold against POL-FRA-003' },
        scenarios: [
          'the card-not-present fraud rate for a BIN exceeds {threshold} for more than {minutes}',
          'Falcon Fraud raises a fraud spike alert on a BIN (e.g. 454812, Tarjeta Cierzo Débito)',
          'the analyst on shift reports many suspicious transactions on cards from the same BIN',
          'a decision is needed on whether to block high-risk e-commerce on a BIN'
        ],
        testUtterance: 'Alert: BIN 454812 has been showing 2.9 % fraud on online purchases for 40 minutes',
        matchGroups: [
          { re: '\\bbin\\b|\\bcards?\\b|\\b4548\\d{2}\\b', w: 0.3, label: 'cards' },
          { re: '\\bfraud\\w*|\\bsuspicious\\b|\\bcnp\\b', w: 0.3, label: 'fraud' },
          { re: '\\balert\\w*|\\balarm\\w*|\\bspike\\w*|\\bexceed\\w*|\\bshowing\\b|\\bshows\\b|\\brising\\b', w: 0.25, label: 'alert' },
          { re: '\\bcierzo\\b', w: 0.07, label: 'Banco Cierzo' }
        ],
        config: {
          fraud_monitor: [['fraud_rate_threshold_pct', '{=threshold}'], ['minutes_above', '{=minutes}'], ['critical_pct', '{=critical}'], ['channel', 'E-commerce (CNP)']],
          card_block: [['approver', '{approver}'], ['policy', 'POL-FRA-003'], ['scope', 'High-risk MCCs on the BIN']],
          card_reissue: [['procedure', 'PR-TAR-007']],
          customer_notice: [['channels', 'SMS · app']],
          incident: [['notify', '{notify}'], ['channel', 'Microsoft Teams']]
        },
        say: {
          draft: [
            'Every sentence is linked to what it understood: the trigger comes from “exceeds {threshold} for more than {minutes}”.',
            'Each step says which system it touches: Falcon for the spike and the rule, T24 and Redsys for transactions and cards, Salesforce FSC to notify customers.',
            'The blocking rule is not activated without approval from {del:approver}: POL-FRA-003 requires it, and the workflow enforces it even if the text did not say so.'
          ],
          published: ['From now on, a Falcon Fraud alert triggers it automatically. Let’s see it with this morning’s real alert: BIN 454812, 05:50.']
        }
      },
      reclamacion: {
        first: 'complaint_intake',
        slug: 'wf-reclamacion-cargos',
        name: 'Complaint about unrecognised charges',
        approver: 'customer_service',
        approverOptions: ['customer_service', 'fraud', 'compliance'],
        policy: 'PR-SAC-001',
        go: 'reclamacion',
        goLabel: 'Test it with Lucía Ferrer’s complaint',
        next: 'The next SAC complaint runs it. Lucía Ferrer Gil’s (612.40 €) is awaiting a reply.',
        trigger: {
          system: 'Outlook', type: 'correo', icon: 'mail', badges: ['Outlook'],
          label: 'Complaint in the SAC mailbox', sub: 'unrecognised charges',
          entry: 'SAC mailbox in Outlook and Salesforce FSC',
          full: 'Customer complaint to the SAC about unrecognised charges'
        },
        steps: {
          complaint_intake: { sub: 'Acknowledgement within {ack}', what: 'Logs the complaint in Salesforce FSC, extracts customer, card, transactions and amounts, and sends the acknowledgement of receipt within {ack}', outputs: [{ icon: 'clipboard', text: 'Case in Salesforce FSC with the extracted data' }] },
          card_trace: { sub: 'Transactions and merchant', what: 'Traces the transactions in Redsys and Falcon: strong customer authentication, device and merchant; other cards used at the same merchant', outputs: [{ icon: 'git-branch', text: 'Transaction trace with authentication and merchant' }] },
          chargeback: { sub: 'After approval', what: 'Proposes the provisional credit for the unrecognised charges (PSD2) and applies it in T24 only after approval; prepares the chargeback through the card scheme', outputs: [{ icon: 'euro', text: 'Provisional credit in T24 and chargeback prepared, after approval' }] },
          incident: { sub: 'Resolution within {days}', systems: ['Salesforce FSC', 'Procedimientos'], what: 'Prepares the case file (PR-SAC-001) with similar complaints from the last {months}', outputs: [{ icon: 'file-text', text: 'Case file (PR-SAC-001), to be resolved within {days}' }] },
          notifier: { sub: 'After approval', what: 'Drafts the reply to the customer; it is sent only after approval', outputs: [{ icon: 'send', text: 'Reply to the customer, sent after approval' }] }
        },
        params: [
          { key: 'ack', label: 'Acknowledgement of receipt', name: 'Acknowledgement of receipt', type: 'number', unit: 'h', min: 1, max: 72, step: 1, value: 24, integer: true, ref: 'PR-SAC-001', hint: 'PR-SAC-001: 24 h', extract: { from: 'text', re: '\\backnowledge?ment\\b[^.;]{0,40}?(\\d{1,3})\\s*(?:h|hours?)\\b' } },
          { key: 'days', label: 'Resolution', name: 'Resolution deadline', type: 'number', unit: 'days', unitLong: 'business days', min: 1, max: 30, step: 1, value: 15, integer: true, ref: 'PR-SAC-001', hint: 'PR-SAC-001 and PSD2: 15 business days', hl: 'Deadline', extract: { from: 'text', re: '(\\d{1,2})\\s*(?:business|working) days\\b' } },
          { key: 'months', label: 'Complaint history', name: 'Complaint history', type: 'number', unit: 'months', min: 1, max: 36, step: 1, value: 12, integer: true, ref: 'Policy', hint: 'History from Salesforce FSC', hl: 'History', extract: { from: 'text', re: '(\\d{1,2})\\s*months\\b' } },
          { key: 'approver', label: 'Approves credit and reply', ref: 'PR-SAC-001', hint: 'Before crediting or sending anything to the customer' }
        ],
        check: { id: 'plazos', ref: 'PR-SAC-001', keys: ['ack', 'days'], label: 'Deadlines', describe: 'acknowledgement within {ack} and resolution within {days}', action: 'Checks the deadlines against PR-SAC-001 and PSD2' },
        scenarios: [
          'a complaint from a customer who does not recognise charges on their card reaches the SAC mailbox',
          'a customer complains about transactions they did not make and a decision on a provisional credit is needed',
          'an SAC case file needs to be opened for an unrecognised charge'
        ],
        testUtterance: 'A customer is complaining about three card charges from an online shop that she does not recognise',
        matchGroups: [
          { re: '\\bcomplain\\w*|\\bdisput\\w*|\\bnot recogni[sz]\\w*|\\bunrecogni[sz]\\w*', w: 0.35, label: 'complaint' },
          { re: '\\bcustomers?\\b|\\bcardholders?\\b|\\bholders?\\b', w: 0.2, label: 'customer' },
          { re: '\\bcharges?\\b|\\btransactions?\\b|\\bpurchases?\\b|\\bamounts?\\b', w: 0.25, label: 'charges' },
          { re: '\\bcards?\\b|\\bmerchants?\\b|\\bshops?\\b', w: 0.12, label: 'card' }
        ],
        config: {
          complaint_intake: [['ack_hours', '{=ack}'], ['system', 'Salesforce FSC']],
          chargeback: [['framework', 'PSD2 · end of the next business day'], ['approver', '{approver}']],
          incident: [['template', 'Case file PR-SAC-001'], ['deadline_business_days', '{=days}'], ['history_months', '{=months}']],
          notifier: [['channel', 'Email and customer area'], ['approver', '{approver}']]
        },
        say: {
          draft: [
            'Every sentence of the text is linked to what it understood: the email to the SAC triggers the workflow and the deadlines come from the text itself.',
            'The provisional credit is the customer’s money: it is not applied without approval from {del:approver}, and neither is the reply.',
            'The deadlines are checked against PR-SAC-001 and PSD2; if someone extends them, a reason is requested on publishing.'
          ],
          published: ['The next complaint about unrecognised charges runs it automatically. Let’s see it with Lucía Ferrer’s.']
        }
      },
      parte: {
        first: 'ops_monitor',
        slug: 'wf-parte-diario-operaciones',
        name: 'Daily channel report · Operations Centre',
        approver: 'fraud',
        approverOptions: ['fraud', 'fraud_shift'],
        policy: 'POL-FRA-003',
        go: 'turno',
        goLabel: 'See the shift daily report',
        next: 'It runs every day at {time}.',
        trigger: {
          system: 'Scheduled', type: 'programado', icon: 'clock', badges: [],
          label: 'Every day at {time}', sub: 'Scheduled',
          entry: 'Daily server schedule · {time}'
        },
        steps: {
          ops_monitor: { sub: 'Channels and fraud', what: 'Reads the Redsys, Falcon and ServiceNow indicators (acceptance, declines, fraud by channel, POS and ATMs) and opens tickets in ServiceNow without duplicating open ones', outputs: [{ icon: 'ticket', text: 'Tickets in ServiceNow, without duplicating open ones' }] },
          card_block: { sub: 'Rules older than 72 h', gateVerb: 'keeping or withdrawing the rule', what: 'If a preventive blocking rule has been active for more than 72 h, proposes keeping it or withdrawing it (POL-FRA-003)', outputs: [{ icon: 'lock', text: 'Blocking rules reviewed, after approval' }] },
          incident: { sub: 'Summary in Teams', systems: ['Microsoft Teams'], what: 'Posts the report summary in the “Operations · Madrid” channel', outputs: [{ icon: 'message-square', text: 'Summary in the “Operations · Madrid” Teams channel' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Daily channel report (PDF)' }],
        params: [
          { key: 'time', label: 'Report time', name: 'Report time', type: 'time', value: '07:00', ref: 'Policy', hint: 'Indicators from Redsys, Falcon and ServiceNow', extract: { kind: 'time' } },
          { key: 'approver', label: 'Approves the rule review', ref: 'POL-FRA-003', hint: 'POL-FRA-003 · PR-DORA-002' }
        ],
        staticChecks: [
          { id: 'dora', text: 'Major ICT-related incidents: initial notification within 4 h under PR-DORA-002', stream: { action: 'Checks the report against POL-FRA-003 and PR-DORA-002', result: 'Preventive rules reviewed every 72 h · major incidents notified within 4 h' } }
        ],
        rules: [{ key: 'noDuplicate', re: '\\bwithout duplicating\\b', label: 'Rule', check: 'Tickets without duplicating those already open in ServiceNow' }],
        scenarios: [
          'it is {time} and the daily channel report for the Operations Centre is due',
          'the user asks for the daily channel and fraud report',
          'the user asks which channels are causing problems today'
        ],
        testUtterance: 'Run the daily report for the Operations Centre channels',
        matchGroups: [
          { re: '\\breport\\b', w: 0.35, label: 'report' },
          { re: '\\bchannels\\b|\\bindicators\\b|\\bpos\\b|\\batms?\\b|\\boperations\\b', w: 0.3, label: 'channels' },
          { re: '\\bdaily\\b|\\btoday\\b|\\bshift\\b', w: 0.15, label: 'daily' },
          { re: '\\bcierzo\\b|\\boperations cent(?:re|er)\\b', w: 0.1, label: 'Operations Centre' }
        ],
        config: {
          ops_monitor: [['time', '{time}'], ['indicators', 'Acceptance, declines, fraud by channel, POS and ATMs, service outages'], ['tickets', 'ServiceNow, without duplicating open ones']],
          card_block: [['approver', '{approver}'], ['policy', 'POL-FRA-003'], ['review', 'Rules older than 72 h']],
          incident: [['channel', 'Microsoft Teams · Operations · Madrid']]
        },
        say: {
          draft: [
            'The report is scheduled: every day at {time}, without anyone asking for it.',
            'It opens tickets only for items without an open one, and it does not touch a blocking rule without approval from {del:approver}.'
          ],
          published: ['Tomorrow at {time} it runs on its own; today’s is in the shift summary.']
        }
      }
    }
  }
});
