/* Mora & Jordano · firm’s daily summary (scene «turno»), English. Synthetic demo data (MFM). */
agenticPackEn('abogados', {
  turno: (function () {
    'use strict';
    /* The series starts at 06:00 (minute 360) and moves in 5-minute slots. */
    const hhmm = (i) => `${String(Math.floor((360 + i * 5) / 60)).padStart(2, '0')}:${String((360 + i * 5) % 60).padStart(2, '0')}`;
    /* LexNET notifications received and not yet assigned to a lawyer (cumulative queue), from 06:00 to 08:55. */
    const QUEUE = [2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4,
      5, 6, 7, 8, 9, 10,
      12, 15, 17, 19, 21, 23, 25, 26, 27, 26, 24, 23];
    const AGENT = 'Firm’s daily summary';

    const items = [
      { code: 'PRC-2026-0412', name: 'Claim PO 1184/2026 · Aceites Sierra Subbética, S.L.', tag: 'Alarm', area: 'Litigation · Court of First Instance no. 7 of Málaga', metric: 'engagement acceptance status', reading: 'Blocked', baseline: 'Accepted within 24 h', limits: 'conflict of interest or absent lawyer = critical', status: 'critical',
        note: 'LexNET notification at 08:12: ordinary civil claim (juicio ordinario) with 20 business days to file the defence (due 27-10-2026). The firm advised the claimant in 2025 (possible conflict, Art. 12 of the Spanish Code of Professional Conduct for Lawyers) and the assigned lawyer is on holiday.' },
      { code: 'LEX-COLA', name: 'Firm’s LexNET mailbox', tag: 'Court deadline', area: 'Litigation secretariat · notifications', metric: 'notifications not assigned to a lawyer', reading: '23', baseline: '≤ 5', limits: 'warning > 10 · critical > 20', status: 'critical',
        note: '41 notifications received since 07:30; 9 belong to absent lawyers and are still unassigned. If they are not opened within 3 business days they are deemed served (Art. 162 LEC) and the time limit starts running anyway.' },
      { code: 'PLZ-5D', name: 'Upcoming court deadlines', area: 'Litigation and Civil · deadline diary', metric: 'deadlines due in ≤ 5 business days', reading: '11', baseline: '≤ 6', limits: 'warning > 8 · critical > 15', status: 'warning',
        note: 'Includes an appeal (20 days, Art. 458 LEC) due on 02-10-2026 and two challenges to a bill of costs. Three have no draft in iManage.' },
      { code: 'AEAT-200', name: 'Corporate Income Tax season', area: 'Tax · AEAT e-office', metric: 'Form 200 returns not closed', reading: '37 of 112', baseline: '≤ 25 with 26 days to the deadline', limits: 'warning > 25 · critical > 50', status: 'warning',
        note: 'Form 200 for calendar-year companies is due on 25-10-2026. In parallel, the first Form 202 instalment payment is filed from 1 to 20 October (64 clients).' },
      { code: 'PBC-DD', name: 'Anti-money laundering (Ley 10/2010)', area: 'Compliance · customer due diligence', metric: 'files with incomplete due diligence', reading: '6', baseline: '0', limits: 'warning > 0 · critical > 10', status: 'warning',
        note: 'Beneficial owner not identified (Art. 4) in 4 companies and source of funds not evidenced in 2 real-estate transactions. The engagement cannot be carried out until it is complete (Art. 7.3).' },
      { code: 'HRS-SIN', name: 'Unrecorded hours · week 39', area: 'Management · time control', metric: 'hours worked not recorded to a matter', reading: '214 h', baseline: '≤ 80 h', limits: 'warning > 120 · critical > 300 h', status: 'warning',
        note: 'Corporate accounts for 96 h; 22 h are from the Grupo Hostelero Costa del Sol matter, the one behind complaint REC-2026-0057 about invoice F-2026-0938.' },
      { code: 'CONF-CHK', name: 'Routine conflict checks', area: 'Engagement acceptance', metric: 'new clients pending a check', reading: '3', baseline: '≤ 5', limits: 'warning > 5 · critical > 10', status: null, note: '' },
      { code: 'FAC-PTE', name: 'Billing pending issue', area: 'Client care and billing', metric: 'value of invoices ready but not issued', reading: '48,200 €', baseline: '≤ 60,000 €', limits: 'warning > 60,000 · critical > 120,000 €', status: null, note: '' },
      { code: 'COBRO', name: 'Fee collection', area: 'Client care and billing', metric: 'invoices overdue by more than 60 days', reading: '6.1%', baseline: '≤ 8%', limits: 'warning > 8 · critical > 15%', status: null, note: '' },
      { code: 'LEXNET', name: 'LexNET platform', area: 'Systems · court communications', metric: 'availability (24 h)', reading: '100%', baseline: '≥ 99.5%', limits: 'warning < 99.5 · critical < 98%', status: null, note: '' },
      { code: 'IMANAGE', name: 'iManage Work', area: 'Systems · document management', metric: 'availability (24 h)', reading: '99.9%', baseline: '≥ 99.5%', limits: 'warning < 99.5 · critical < 98%', status: null, note: '' },
      { code: 'AEAT-CERT', name: 'Social collaborator certificate', area: 'Tax · AEAT e-office', metric: 'days until expiry', reading: '214 days', baseline: '≥ 60 days', limits: 'warning < 60 · critical < 15 days', status: null, note: '' },
      { code: 'SIGN', name: 'Pending e-signatures', area: 'Signaturit · engagement letters and powers of attorney', metric: 'documents unsigned for more than 5 days', reading: '4', baseline: '≤ 6', limits: 'warning > 6 · critical > 12', status: null, note: '' },
      { code: 'COR-SEN', name: 'Córdoba office · hearings', area: 'Córdoba office · court diary', metric: 'today’s hearings with lawyer and gown confirmed', reading: '3 of 3', baseline: '100%', limits: 'warning < 100% · critical: no lawyer', status: null, note: '' }
    ];

    const news = [
      { id: 'TAR-26-3101', equipment: 'PRC-2026-0412', priority: 'Urgent · deadline', tone: 'crit', owner: 'Partner, Head of Litigation',
        action: 'Block acceptance of the engagement until the possible conflict with the claimant is resolved (Art. 12 of the Code of Professional Conduct; POL-CON-002), reassign the matter and validate the deadline calculation (due 27-10-2026). Accepting the engagement or informing the client requires approval from the Managing Partner.' },
      { id: 'TAR-26-3102', equipment: 'LEX-COLA', priority: 'Urgent · deadline', tone: 'crit', owner: 'Litigation secretariat',
        action: 'Assign the 23 pending notifications; reassign today the 9 belonging to absent lawyers and enter each deadline in the firm’s diary (PRO-PLZ-001).' },
      { id: 'TAR-26-3103', equipment: 'PLZ-5D', priority: 'High', tone: 'warn', owner: 'Partner, Head of Litigation',
        action: 'Review the 11 deadlines due within 5 business days; prioritise the appeal due on 02-10-2026 and the 3 filings with no draft in iManage.' },
      { id: 'TAR-26-3104', equipment: 'PBC-DD', priority: 'Medium', tone: 'warn', owner: 'Head of Compliance (AML and GDPR)',
        action: 'Complete due diligence on the 6 files (beneficial owner and source of funds) before carrying out the engagements (Ley 10/2010, Arts. 3, 4 and 7.3; MAN-PBC-003).' }
    ];
    const updates = [
      { id: 'TAR-26-2987', equipment: 'AEAT-200', priority: 'High (proposed)', tone: 'warn', owner: 'Partner, Head of Tax',
        action: 'Today’s position (37 Form 200 returns not closed with 26 days to the deadline and 64 Form 202 instalment payments) is added to the open tax-season task (CAL-TRI-006) and a higher priority is proposed.' },
      { id: 'TAR-26-3045', equipment: 'HRS-SIN', priority: 'Unchanged', tone: 'warn', owner: 'Client care and billing',
        action: 'Today’s reading (214 h unrecorded) is added to the open weekly reminder. No duplicate task is created.' }
    ];

    return {
      title: 'Málaga office · daily summary',
      nav: 'Daily summary',
      clockLabel: 'Firm time',
      decider: 'Managing Partner',
      kpis: [
        { label: 'LexNET notifications received today', value: 41, sub: 'PO 1184/2026 with a possible conflict of interest · 08:12', icon: 'mail', tone: 'crit', href: '#alarma' },
        { label: 'Business days to file the defence · PO 1184/2026', value: 20, sub: 'Due 27-10-2026 · assigned lawyer on holiday', icon: 'calendar', href: '#alarma' },
        { label: 'Open client complaints', value: 1, sub: 'REC-2026-0057 · invoice F-2026-0938 · 18,400 €', icon: 'euro', href: '#reclamacion' },
        { label: 'Indicators with alerts', value: '6 of 14', sub: '2 critical · 4 warnings · readings at 09:00', icon: 'gauge', action: 'scroll-parte' }
      ],
      map: {
        title: 'Firm map · practice areas and offices',
        sub: 'Deadlines, queues and filing dates at 09:00 · click an item to see its card',
        icon: 'building',
        readonly: 'Agentic Platform reads LexNET, the matter management system, iManage and the AEAT e-office; it does not file pleadings, accept engagements or write to clients without approval',
        zones: [
          { id: 'sec', title: 'Secretariat', sub: 'Intake and diary', items: [
            { code: 'LEX-COLA', name: 'LexNET mailbox', reading: '23 unassigned', status: 'crit', note: '41 notifications since 07:30; 9 belonging to absent lawyers not reassigned. Risk of time limits running with no responsible lawyer.', kv: [['Received today', '41'], ['Assigned', '18'], ['Belonging to absent lawyers', '9']] },
            { code: 'LEXNET', name: 'LexNET', reading: '100%', status: 'ok' },
            { code: 'IMANAGE', name: 'iManage Work', reading: '99.9%', status: 'ok', kv: [['Documents opened today', '1,214']] },
            { code: 'SIGN', name: 'Signaturit', reading: '4 pending', status: 'ok' }
          ] },
          { id: 'pro', title: 'Litigation', sub: 'Disputes and deadlines', items: [
            { code: 'PRC-2026-0412', name: 'PO 1184/2026 · Aceites Sierra Subbética', reading: 'Blocked', status: 'crit', tags: ['PO 1184/2026'], go: 'alarma', goLabel: 'Open the alarm',
              note: 'Ordinary civil claim against the client. The firm advised the claimant in 2025: possible conflict of interest. Agentic Platform proposes blocking acceptance, reassigning, calculating the deadline and informing the client with the Managing Partner’s approval.',
              kv: [['Court', 'First Instance no. 7 of Málaga'], ['Served', '29-09-2026 08:12'], ['Defence due', '27-10-2026'], ['Assigned lawyer', 'On holiday']] },
            { code: 'PLZ-5D', name: 'Deadlines ≤ 5 business days', reading: '11 deadlines', status: 'warn', kv: [['No draft', '3'], ['Nearest', 'Appeal · 02-10-2026']] },
            { code: 'SEN-MLG', name: 'Hearings in Málaga', reading: '5 today', status: null, note: 'Today’s trials and pre-trial hearings at the Ciudad de la Justicia in Málaga; all with a lawyer confirmed.', kv: [['Pre-trial hearings', '2'], ['Small-claims trials (juicio verbal)', '3']] }
          ] },
          { id: 'fis', title: 'Tax', sub: 'AEAT e-office', items: [
            { code: 'AEAT-200', name: 'Form 200 · Corporate Income Tax', reading: '37 not closed', status: 'warn', note: 'Due 25-10-2026. Approved annual accounts still missing for 9 clients.', kv: [['Clients', '112'], ['Filed', '41'], ['Form 202 in October', '64 clients']] },
            { code: 'AEAT-CERT', name: 'Social collaborator certificate', reading: '214 days', status: 'ok' },
            { code: 'AEAT-NOT', name: 'AEAT electronic notifications', reading: '7 new', status: null, note: 'Information requests and proposed assessments in the single authorised e-address (DEHú) of clients who granted powers; 10 calendar days to access them.', kv: [['Information requests', '5'], ['Proposed assessments', '2']] }
          ] },
          { id: 'mer', title: 'Corporate', sub: 'Company law and M&A', items: [
            { code: 'HRS-SIN', name: 'Unrecorded hours', reading: '214 h', status: 'warn', kv: [['Corporate', '96 h'], ['Costa del Sol matter', '22 h']] },
            { code: 'REC-2026-0057', name: 'Fee complaint', reading: '1 open', status: null, tags: ['F-2026-0938'], go: 'reclamacion', goLabel: 'Open the complaint', note: 'Grupo Hostelero Costa del Sol, S.L. disputes invoice F-2026-0938 (18,400 €) against the engagement letter and complains about a lack of information on the matter.', kv: [['Internal reply due', '20/10/2026'], ['Matter file', 'MER-2026-0219'], ['Area', 'Corporate']] },
            { code: 'FAC-PTE', name: 'Invoices not issued', reading: '48,200 €', status: 'ok' }
          ] },
          { id: 'civ', title: 'Civil and Compliance', sub: 'Civil · AML · GDPR', items: [
            { code: 'PBC-DD', name: 'AML due diligence', reading: '6 incomplete', status: 'warn', note: 'Beneficial owner not identified in 4 companies and source of funds not evidenced in 2 property purchases.', kv: [['Law', 'Ley 10/2010'], ['Engagement on hold', 'Yes, Art. 7.3']] },
            { code: 'CONF-CHK', name: 'Routine conflicts', reading: '3 pending', status: 'ok' },
            { code: 'RGPD-2609-03', name: 'GDPR breach drill', reading: 'Scheduled', status: null, tags: ['RGPD-2609-03'], go: 'retirada', goLabel: 'Open the drill', note: 'Today’s drill: a due diligence report on Promociones Guadalhorce, S.A. sent to the wrong recipient. Notification to the AEPD within 72 h (GDPR, Art. 33; PRO-RGPD-005).', kv: [['File', 'RGPD-2609-03'], ['Owner', 'Data Protection Officer']] },
            { code: 'COBRO', name: 'Fee collection', reading: '6.1% overdue', status: 'ok' }
          ] },
          { id: 'cor', title: 'Córdoba office', sub: 'Av. Gran Capitán', items: [
            { code: 'COR-SEN', name: 'Hearings', reading: '3 of 3', status: 'ok', kv: [['Courts', 'First Instance no. 3 and no. 5 of Córdoba']] },
            { code: 'COR-AGE', name: 'Client diary', reading: '6 meetings', status: null, note: 'Year-end tax planning meetings and the signing of a family-business shareholders’ agreement (Signaturit).', kv: [['In person', '4'], ['On Teams', '2']] }
          ] }
        ]
      },
      inbox: {
        alarm: {
          icon: 'scale',
          title: 'PO 1184/2026 · claim against Aceites Sierra Subbética with a possible conflict',
          meta: ['LexNET notification 08:12 · PRC-2026-0412'],
          systems: ['LexNET'],
          body: 'Court of First Instance no. 7 of Málaga: 20 business days to file the defence, until 27-10-2026. The firm advised the claimant in 2025 (Art. 12 of the Code of Professional Conduct) and the assigned lawyer is on holiday.'
        },
        complaint: {
          icon: 'mail',
          title: 'Complaint REC-2026-0057 · fee invoice F-2026-0938',
          meta: ['28/09 10:41', 'Grupo Hostelero Costa del Sol, S.L.', 'Corporate'],
          body: 'The client considers that the 18,400 € invoice exceeds what was agreed in the engagement letter and complains of receiving no information on the progress of the matter. File',
          trace: 'REC-2026-0057',
          after: 'Internal reply due by 20/10/2026; the acknowledgement of receipt is sent today.',
          due: 'Acknowledge today',
          goLabel: 'Open complaint'
        }
      },
      chart: {
        title: 'LexNET mailbox · unassigned notifications',
        sub: 'Cumulative queue in 5-min slots · now 23 (08:55)',
        icon: 'mail',
        tabLabel: 'LexNET queue',
        chart: {
          series: QUEUE.map((v, i) => ({ time: hhmm(i), value: v })),
          unit: '',
          threshold: { value: 10, label: 'Warning 10', legend: 'Warning threshold 10 · 60 min above' },
          critical: { value: 20, label: 'Critical 20', legend: 'Critical 20 · 40 min above' },
          peak: { x: '08:40', y: 27, label: '27 · 08:40' },
          yTicks: [0, 10, 20, 30],
          xTicks: ['06:00', '06:30', '07:00', '07:30', '08:00', '08:30'],
          annotations: [{ x: '08:10', label: 'PO 1184/2026 08:12' }],
          bands: [
            { from: '07:30', to: '08:00', label: 'First batches', tone: 'warn' },
            { from: '08:00', to: '08:55', label: 'Batch from the Málaga courts' }
          ],
          seriesLabel: 'Unassigned notifications',
          shadeLabel: 'Above warning 08:00–08:55'
        },
        events: [
          { time: '06:00', text: '2 notifications from Monday still unassigned (bills of costs)', tone: 'brand', tag: 'LexNET' },
          { time: '07:30', end: '08:00', text: 'First notifications of the day: procedural orders and decrees from courts in Málaga and Córdoba', tone: 'warn', tag: 'LexNET' },
          { time: '08:00', text: 'The queue exceeds the warning threshold of 10 unassigned notifications', tone: 'warn', tag: 'LEX-COLA' },
          { time: '08:12', text: 'Service of claim PO 1184/2026 against Aceites Sierra Subbética, S.L. (First Instance no. 7 of Málaga)', tone: 'crit', tag: 'PRC-2026-0412' },
          { time: '08:14', text: 'The matter management system detects that the firm advised the claimant in 2025: possible conflict of interest', tone: 'crit', tag: 'Conflicts' },
          { time: '08:15', text: 'The assigned lawyer is on holiday until 13-10-2026 according to the Outlook calendar', tone: 'warn', tag: 'Outlook' },
          { time: '08:20', text: 'Exceeds the critical level of 20 unassigned notifications', tone: 'crit', tag: 'LEX-COLA' },
          { time: '08:40', text: 'Maximum of 27 unassigned notifications', tone: 'crit', tag: 'LEX-COLA' },
          { time: '08:45', text: 'The litigation secretariat starts allocating; 9 notifications for absent lawyers are left with no recipient', tone: 'brand', tag: 'Secretariat' }
        ],
        cause: 'Hypothesis to be confirmed by the litigation secretariat: on Tuesdays the accumulated batch from the Málaga courts arrives, and this week three lawyers are on holiday whose matters have no substitute assigned in the matter management system. Notifications on their files, including claim PO 1184/2026, arrive with no recipient and the queue does not go down.',
        system: 'LexNET',
        footer: 'Queue recalculated every 5 min from the LexNET mailbox and the assignments in the matter management system'
      },
      parte: {
        agent: AGENT,
        title: 'Firm’s daily summary',
        sub: 'Readings at 09:00 · 14 indicators on deadlines, queues and filing dates · firm thresholds',
        colItem: 'Indicator',
        systems: ['LexNET', 'Gestor de expedientes'],
        inboxTitle: 'Firm’s daily summary · readings at 09:00',
        inboxCount: '14 indicators',
        inboxPending: '2 critical (claim PO 1184/2026 with a possible conflict and the LexNET mailbox) and 4 warnings to review.',
        items,
        news,
        updates,
        steps: [
          { agent: AGENT, system: 'Gestor de expedientes', action: 'Reads the 14 indicators at 09:00 (deadlines, queues, filing dates, AML, hours and billing)', result: '14 indicators received, no gaps', ms: 560 },
          { agent: AGENT, system: 'LexNET', action: 'Checks the firm’s mailbox and the notifications received since 07:30', result: '41 notifications; 23 unassigned, 9 for absent lawyers', ms: 640, tone: 'crit' },
          { agent: AGENT, system: 'Gestor de expedientes', action: 'Identifies the matter for each notification and searches for opposing parties in the client history', result: 'PO 1184/2026 → PRC-2026-0412; the claimant was a client of the firm in 2025 (possible conflict)', ms: 710, tone: 'crit' },
          { agent: AGENT, system: 'Outlook', action: 'Cross-checks the assigned lawyers against the absence calendar', result: '3 lawyers on holiday; the one on PRC-2026-0412 returns on 13-10-2026', ms: 380, tone: 'warn' },
          { agent: AGENT, system: 'Agentic Platform', action: 'Compares each indicator with the firm’s thresholds (14 indicators)', result: '2 critical · 4 warnings · 8 with no issues', ms: 60, tone: 'crit' },
          { agent: AGENT, system: 'Agentic Platform', action: 'Calculates court deadlines in business days (Art. 133 LEC; August non-working, national, regional and Málaga local holidays)', result: 'Defence in PO 1184/2026: 27-10-2026; 11 deadlines due in ≤ 5 business days', ms: 120, tone: 'warn' },
          { agent: AGENT, system: 'Sede AEAT', action: 'Reviews the status of the Corporate Income Tax season and the October instalment payment', result: '37 Form 200 returns not closed (due 25-10-2026); 64 Form 202 from 1 to 20 October', ms: 520, tone: 'warn' },
          { agent: AGENT, system: 'Gestor de expedientes', action: 'Cross-checks unrecorded hours against open client complaints', result: 'REC-2026-0057: 22 h on the Grupo Hostelero Costa del Sol matter not recorded', ms: 360, tone: 'warn' },
          { agent: AGENT, system: 'Gestor de expedientes', action: 'Looks for open tasks on the indicators with alerts', result: 'TAR-26-2987 (Corporate Income Tax season) and TAR-26-3045 (unrecorded hours) already open', ms: 330 },
          { agent: AGENT, system: 'Language model', action: 'Drafts the recommended action for each alert (6 calls)', result: '6 drafts, each with its reference procedure (PRO-PLZ-001, POL-CON-002, MAN-PBC-003, CAL-TRI-006)', ms: 5400 },
          { agent: AGENT, system: 'Gestor de expedientes', action: 'Creates TAR-26-3101 for PRC-2026-0412 · urgent', result: 'Created and assigned to the Partner, Head of Litigation; engagement acceptance blocked', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'Gestor de expedientes', action: 'Creates TAR-26-3102 for the LexNET mailbox · urgent', result: 'Created and assigned to the litigation secretariat', ms: 230, tone: 'ok' },
          { agent: AGENT, system: 'Gestor de expedientes', action: 'Creates TAR-26-3103 for the 5-day deadlines · high', result: 'Created and assigned to the Partner, Head of Litigation', ms: 220, tone: 'ok' },
          { agent: AGENT, system: 'Gestor de expedientes', action: 'Creates TAR-26-3104 for AML due diligence · medium', result: 'Created and assigned to Compliance', ms: 220, tone: 'ok' },
          { agent: AGENT, system: 'Gestor de expedientes', action: 'Updates TAR-26-2987 (Corporate Income Tax season) with today’s position', result: 'Reading added · high priority proposed · no duplicate task', ms: 200 },
          { agent: AGENT, system: 'Gestor de expedientes', action: 'Updates TAR-26-3045 (unrecorded hours) with today’s reading', result: 'Reading added · no duplicate task', ms: 200 },
          { agent: AGENT, system: 'Microsoft Teams', action: 'Posts the summary to the «Management · daily summary» channel', result: 'Sent: 2 critical, 4 warnings and 4 tasks', ms: 380, tone: 'ok' }
        ],
        stats: [
          { label: 'Indicators reviewed', value: 14 },
          { label: 'Tasks created', value: 4, tone: 'ok' },
          { label: 'Tasks updated, not duplicated', value: 2 },
          { label: 'Notifications to reassign', value: 9, tone: 'crit' }
        ],
        relation: {
          title: 'Possible link with complaint REC-2026-0057',
          body: 'The 22 unrecorded hours on the Grupo Hostelero Costa del Sol matter are from the same week as invoice F-2026-0938 (18,400 €) that the client disputes. If they are recorded late, the time breakdown that accompanies the invoice will not match the matter management system.',
          more: 'Time recording should be closed before replying, and the hours checked against engagement letter HE-2026-0219 (POL-HON-004). To be confirmed by the Partner, Head of Corporate and Client care and billing.',
          plain: 'The 22 unrecorded hours on the Grupo Hostelero Costa del Sol matter are from the same week as invoice F-2026-0938 (18,400 €) in complaint REC-2026-0057. Time recording should be closed before replying, and the hours checked against the engagement letter. To be confirmed by the Partner, Head of Corporate and Client care and billing.',
          go: 'reclamacion',
          goLabel: 'Open the complaint'
        },
        policy: 'Policy applied: internal tasks in the matter management system are created without prior approval; accepting or declining an engagement, filing pleadings via LexNET, filing returns on the AEAT e-office or communicating with a client requires approval from the responsible lawyer or the Managing Partner (POL-CON-002 and PRO-PLZ-001).',
        channel: 'Management · daily summary',
        resultSummary: '4 tasks created in the matter management system, 2 existing tasks updated and summary posted to Microsoft Teams.',
        auditRequest: 'Málaga office · readings at 09:00 · 14 indicators',
        auditNew: 'Task created in the matter management system',
        auditUpdate: 'Task updated in the matter management system',
        reportTitle: 'Firm’s daily summary · Mora & Jordano',
        reportCode: 'RD-MJ-20260929',
        reportMeta: [['Offices', 'Málaga (Calle Linaje) and Córdoba (Av. Gran Capitán)'], ['Day', 'Tuesday 29-09-2026'], ['Indicators reviewed', '14'], ['Critical · warnings', '2 · 4']],
        reportSummary: 'Of 14 indicators reviewed, 2 are critical and 4 are on warning. This morning claim PO 1184/2026 against Aceites Sierra Subbética, S.L. arrived via LexNET, with a possible conflict of interest and the assigned lawyer on holiday, and the mailbox holds 23 unassigned notifications. 4 tasks have been created in the matter management system and 2 existing tasks have been updated, without duplicating them.',
        signatures: [{ role: 'Managing Partner', note: 'Reviewed' }, { role: 'Partner, Head of Litigation', note: 'Received' }]
      },
      presenter: {
        say: [
          'This is how the Managing Partner starts the day: everything that needs a decision, in a single inbox.',
          'The data comes from the firm’s systems: LexNET notifications, matters and hours from the matter management system, iManage documents, the AEAT e-office and Outlook calendars. Here it is synthetic, but consistent throughout.',
          'The map summarises the firm by practice area and office: grey is normal, colour is what needs attention. Claim PO 1184/2026 is red; click it to see the court, the deadline and what Agentic Platform proposes.',
          'Three items: the claim against Aceites Sierra Subbética with a possible conflict of interest, the fee complaint from Grupo Hostelero Costa del Sol, and the daily summary with 2 critical indicators.'
        ],
        sayBefore: ['Generate the daily summary: it reviews 14 indicators, does not duplicate open tasks and creates the new ones. Watch the time it takes.'],
        sayAfter: [
          'A link Agentic Platform finds: this week’s unrecorded hours belong to the matter whose invoice Grupo Hostelero Costa del Sol is disputing. Nobody had to cross-check time control against complaints by hand.',
          'And no duplicates: two tasks already open are updated instead of opening new ones.'
        ],
        next: 'Click «Generate daily report» and talk through the log while it runs.',
        nextAfter: 'Go to «From words to workflow» (right arrow) to turn the LexNET notification procedure into workflow wf-notificacion-lexnet.'
      }
    };
  })()
});
