/* Banco Cierzo · shift summary (scene «turno»), English. Synthetic demo data (MFM). */
agenticPackEn('banca', {
  turno: (function () {
    'use strict';
    const hhmm = (i) => `${String(Math.floor((i * 5) / 60)).padStart(2, '0')}:${String((i * 5) % 60).padStart(2, '0')}`;
    /* Card-not-present fraud rate on BIN 454812 (30-min rolling window), from 00:00 to 05:50. */
    const RATE = [0.32, 0.34, 0.29, 0.32, 0.28, 0.31, 0.29, 0.29, 0.29, 0.32, 0.33, 0.27, 0.33, 0.27, 0.29, 0.27, 0.27, 0.34, 0.28, 0.31,
      0.27, 0.3, 0.31, 0.27, 0.33, 0.31, 0.48, 0.58, 0.68, 0.77, 0.83, 0.94, 1.06, 1.11, 1.2, 1.34, 1.41, 1.54, 1.62, 1.73, 1.79, 1.93,
      2.04, 2.08, 2.22, 2.25, 2.38, 2.43, 2.6, 2.67, 2.79, 2.81, 2.97, 3.01, 3.17, 3.23, 3.33, 3.39, 3.41, 3.6, 3.44, 3.44, 3.43, 3.36,
      3.3, 3.22, 3.12, 3.06, 3.06, 2.93, 2.9];
    const AGENT = 'Daily operations report';

    const items = [
      { code: 'FAL-454812', name: 'Card-not-present fraud · BIN 454812', tag: 'Alarm', area: 'Fraud prevention · Tarjeta Cierzo Débito', metric: 'CNP fraud rate (30 min)', reading: '2.9%', baseline: '0.3%', limits: 'warning > 1 · critical > 2%', status: 'critical',
        note: '186 suspicious transactions totalling 41,230 € since 02:10; peak of 3.6% at 04:55. Pattern of 1 € test charges followed by purchases at electronics merchants.' },
      { code: 'ACS-3DS', name: '3DS authentication server (ACS)', tag: 'Critical service', area: 'Authorisation · strong customer authentication (SCA)', metric: 'expired authentications', reading: '6.8%', baseline: '0.8%', limits: 'warning > 3 · critical > 5%', status: 'critical',
        note: 'Since 01:50 SMS OTP delivery has been taking more than 60 s. More merchants are applying exemptions without SCA, which has made the attack on BIN 454812 easier. Assess the DORA classification.' },
      { code: 'SAC-COLA', name: 'SAC complaints queue', area: 'Customer Service Department', metric: 'cases due in less than 48 h', reading: '14', baseline: '≤ 5', limits: 'warning > 8 · critical > 20', status: 'warning',
        note: 'Includes SAC-2026-04187 (unrecognised charges): the provisional refund must be decided today, before the end of the business day.' },
      { code: 'CB-RED', name: 'Visa and Mastercard chargebacks', area: 'Payments · disputes', metric: 'chargebacks to file with < 5 days left', reading: '38', baseline: '≤ 10', limits: 'warning > 20 · critical > 60', status: 'warning',
        note: 'Built up by case CPP-2609-07: 31 disputes on cards from the common point of purchase still to be documented.' },
      { code: 'ATM-RED', name: 'ATM network', area: 'Channels · self-service', metric: 'ATMs out of service', reading: '27 of 612', baseline: '≤ 12 (2%)', limits: 'warning > 3% · critical > 8%', status: 'warning',
        note: 'Incident INC0218790 open for the weekend dispenser software update (19 ATMs in Aragon).' },
      { code: 'COB-T24', name: 'T24 core close of business (COB)', area: 'Core banking', metric: 'end-of-day close delay', reading: '+42 min', baseline: '0 min', limits: 'warning > 30 · critical > 90 min', status: 'warning',
        note: 'The close finished at 03:12 (planned 02:30) because of the volume of the Redsys settlement; incident INC0218811 open.' },
      { code: 'AUT-EMI', name: 'Issuer authorisation host', area: 'Authorisation', metric: 'average response time', reading: '182 ms', baseline: '170 ms', limits: 'warning > 250 · critical > 400 ms', status: null, note: '' },
      { code: 'RSY-LNK', name: 'Redsys link', area: 'Authorisation', metric: 'availability (24 h)', reading: '100%', baseline: '≥ 99.95%', limits: 'warning < 99.95 · critical < 99.5%', status: null, note: '' },
      { code: 'HSM-1', name: 'Hardware security modules (HSM)', area: 'Authorisation', metric: 'PIN verification latency', reading: '4 ms', baseline: '4 ms', limits: 'warning > 10 · critical > 25 ms', status: null, note: '' },
      { code: 'FAL-GLB', name: 'Card fraud · other BINs', area: 'Fraud prevention', metric: 'CNP fraud rate (24 h)', reading: '0.05%', baseline: '0.06%', limits: 'warning > 0.2 · critical > 0.5%', status: null, note: '' },
      { code: 'WEB', name: 'Online banking', area: 'Digital channels', metric: 'availability (24 h)', reading: '99.98%', baseline: '≥ 99.9%', limits: 'warning < 99.9 · critical < 99.5%', status: null, note: '' },
      { code: 'APP', name: 'Banco Cierzo app', area: 'Digital channels', metric: 'login errors', reading: '0.4%', baseline: '0.5%', limits: 'warning > 1.5 · critical > 3%', status: null, note: '' },
      { code: 'BIZUM', name: 'Bizum', area: 'Instant payments', metric: 'transactions rejected for technical errors', reading: '0.6%', baseline: '0.7%', limits: 'warning > 2 · critical > 5%', status: null, note: '' },
      { code: 'PERS', name: 'Card personalisation', area: 'Payments · external provider', metric: 'free reissue capacity (24 h)', reading: '2,400 cards', baseline: '≥ 1,500 cards', limits: 'warning < 1,000 · critical < 300', status: null, note: '' }
    ];

    const news = [
      { id: 'INC0218841', equipment: 'FAL-454812', priority: 'P1 · fraud', tone: 'crit', owner: 'Head of Fraud Prevention',
        action: 'Review the 186 transactions on BIN 454812 and the proposed preventive rule in Falcon (high-risk e-commerce). Blocking cards or activating the rule requires approval (POL-FRA-003).' },
      { id: 'INC0218842', equipment: 'ACS-3DS', priority: 'P1 · service', tone: 'crit', owner: 'ICT Risk (DORA) and the ACS provider',
        action: 'Escalate the SMS OTP delay to the ACS provider (6.8% of authentications expired). Classify the incident under the DORA RTS: if it is a major ICT-related incident, the initial notification is due within 4 h (PR-DORA-002).' },
      { id: 'TASK0094410', equipment: 'SAC-COLA', priority: 'High', tone: 'warn', owner: 'Customer Service Department (SAC)',
        action: 'Allocate the 14 cases due in less than 48 h; prioritise SAC-2026-04187 (provisional refund before the end of the business day, PSD2 Art. 73).' },
      { id: 'TASK0094411', equipment: 'CB-RED', priority: 'Medium', tone: 'warn', owner: 'Head of Payments and Cards',
        action: 'Document and file the 38 chargebacks with less than 5 days left (31 from case CPP-2609-07).' }
    ];
    const updates = [
      { id: 'INC0218790', equipment: 'ATM-RED', priority: 'High (proposed)', tone: 'warn', owner: 'Channels · self-service',
        action: 'Today\'s reading (27 ATMs out of service, 19 in Aragon) is added to the open dispenser software incident and a higher priority is proposed.' },
      { id: 'INC0218811', equipment: 'COB-T24', priority: 'Unchanged', tone: 'warn', owner: 'Core banking · operations',
        action: 'Today\'s delay (+42 min) is added to the open close-of-business incident. No duplicate incident is created.' }
    ];

    return {
      title: 'Operations Centre · morning shift',
      nav: 'Shift summary',
      clockLabel: 'Centre time',
      decider: 'Operations',
      kpis: [
        { label: 'Suspicious transactions · BIN 454812', value: 186, sub: '41,230 € since 02:10 · peak of 3.6% at 04:55', icon: 'shield', tone: 'crit', href: '#alarma' },
        { label: 'Cards proposed for reissue', value: 214, sub: 'Tarjeta Cierzo Débito · preventive block pending', icon: 'key', href: '#alarma' },
        { label: 'Complaints due today', value: 1, sub: 'SAC-2026-04187 · provisional refund today', icon: 'mail', href: '#reclamacion' },
        { label: 'Services with alerts', value: '6 of 14', sub: '2 critical · 4 warnings · 06:00 readings', icon: 'gauge', action: 'scroll-parte' }
      ],
      map: {
        title: 'Operations map · Operations Centre',
        sub: 'Indicators from the 06:00 report and from Falcon Fraud at 05:50 · click an item to see its details',
        icon: 'building',
        readonly: 'Agentic Platform reads Falcon Fraud, Core bancario T24, Redsys and ServiceNow; it does not block cards or change rules without approval',
        zones: [
          { id: 'can', title: 'Channels', sub: 'Customers and merchants', items: [
            { code: 'WEB', name: 'Online banking', reading: '99.98%', status: 'ok', kv: [['Sessions (24 h)', '412,300']] },
            { code: 'APP', name: 'Banco Cierzo app', reading: '0.4% errors', status: 'ok', kv: [['Active users (24 h)', '286,900']] },
            { code: 'ATM-RED', name: 'ATMs', reading: '27 down', status: 'warn', note: '19 ATMs in Aragon out of service after the dispenser update; incident INC0218790 open.', kv: [['Estate', '612 ATMs'], ['Incident', 'INC0218790']] },
            { code: 'BIZUM', name: 'Bizum', reading: '0.6% rejected', status: 'ok' },
            { code: 'ECOM', name: 'E-commerce', reading: '38,410 purchases', status: null, tags: ['TIENDAONLINE-ELEC'], note: 'CNP purchases with Cierzo cards tonight (00:00–05:50). Eight merchants account for the 186 suspicious transactions.', kv: [['With SCA', '71%'], ['With TRA or low-value exemption', '29%']] }
          ] },
          { id: 'aut', title: 'Authorisation', sub: 'Issuer', items: [
            { code: 'RSY-LNK', name: 'Redsys link', reading: '100%', status: 'ok' },
            { code: 'AUT-EMI', name: 'Issuer authorisation host', reading: '182 ms', status: 'ok', kv: [['Authorisations (24 h)', '1.92 million']] },
            { code: 'ACS-3DS', name: '3DS ACS · SCA', reading: '6.8% expired', status: 'crit', note: 'SMS OTPs have been arriving late since 01:50: more expired authentications and more merchants falling back on exemptions.', kv: [['Start', '01:50'], ['Provider', 'External ACS (SaaS)'], ['DORA', 'Classification pending']] },
            { code: 'HSM-1', name: 'HSM', reading: '4 ms', status: 'ok' }
          ] },
          { id: 'fra', title: 'Fraud prevention', sub: 'Falcon Fraud', items: [
            { code: 'FAL-454812', name: 'BIN 454812 · Debit', reading: '2.9%', status: 'crit', tags: ['454812'], go: 'alarma', goLabel: 'Open the alarm',
              note: 'Card-testing attack followed by electronics purchases. Agentic Platform proposes a preventive rule in Falcon, reissuing 214 cards and notifying customers by SMS and in the app.',
              kv: [['Suspicious transactions', '186 · 41,230 €'], ['Since', '02:10'], ['Peak', '3.6% at 04:55'], ['Cards affected', '214']] },
            { code: 'FAL-GLB', name: 'Other BINs', reading: '0.05%', status: 'ok' },
            { code: 'FAL-Q', name: 'Alert queue', reading: '243 alerts', status: null, note: 'Falcon alerts awaiting review by the analyst on shift; 151 are from BIN 454812.', kv: [['Night analysts', '2'], ['From BIN 454812', '151']] },
            { code: 'CPP', name: 'Common points of purchase', reading: '1 open', status: null, tags: ['CPP-2609-07'], go: 'retirada', goLabel: 'Case drill', note: 'Case CPP-2609-07: POS terminal 3 at Gasolinera Ronda Norte (10–22/09). 61 of the cards attacked tonight were used there.', kv: [['Cards exposed', '1,284'], ['Issued by Banco Cierzo', '1,107']] }
          ] },
          { id: 'sac', title: 'Customer service', sub: 'SAC and disputes', items: [
            { code: 'SAC-COLA', name: 'SAC complaints', reading: '14 due', status: 'warn', tags: ['SAC-2026-04187'], go: 'reclamacion', goLabel: 'Open the complaint', note: '14 cases are due in less than 48 h; one of them, SAC-2026-04187, needs a decision on the provisional refund today.', kv: [['Open cases', '312'], ['Response deadline', '15 business days']] },
            { code: 'CB-RED', name: 'Chargebacks', reading: '38 to file', status: 'warn', kv: [['From CPP-2609-07', '31']] },
            { code: 'CC', name: 'Contact centre', reading: '41 s wait', status: null, kv: [['Calls from 00:00 to 06:00', '386'], ['About card fraud', '57']] }
          ] },
          { id: 'mdp', title: 'Payments', sub: 'Core and cards', items: [
            { code: 'COB-T24', name: 'T24 close', reading: '+42 min', status: 'warn', kv: [['Close finished', '03:12 (planned 02:30)'], ['Incident', 'INC0218811']] },
            { code: 'PERS', name: 'Personalisation', reading: '2,400 free', status: 'ok', note: 'Enough capacity to reissue the 214 cards within 24 h.', kv: [['Delivery', 'Express delivery in 48 h']] }
          ] }
        ]
      },
      inbox: {
        alarm: {
          icon: 'shield',
          title: 'BIN 454812 · card-not-present fraud spike',
          meta: ['Alarm 05:50 · ALM-FRA-0550'],
          systems: ['Falcon Fraud'],
          body: 'CNP fraud rate of 2.9% against the usual 0.3% since 02:10: 186 suspicious transactions totalling 41,230 € and 214 cards affected. Peak of 3.6% at 04:55.'
        },
        complaint: {
          icon: 'mail',
          title: 'Complaint SAC-2026-04187 · three unrecognised charges',
          meta: ['28/09 09:14', 'Lucía Ferrer Gil', 'Card ····7731'],
          body: 'Does not recognise three charges from TIENDAONLINE-ELEC dated 26/09/2026 totalling 612.40 €. Case',
          trace: 'SAC-2026-04187',
          after: 'The provisional refund must be decided by the end of the next business day; final reply due by 20/10/2026.',
          due: 'Refund today',
          goLabel: 'Open complaint'
        }
      },
      chart: {
        title: 'BIN 454812 · card-not-present fraud rate',
        sub: 'Tarjeta Cierzo Débito · 30-min rolling window · now 2.9% (05:50)',
        icon: 'shield',
        tabLabel: 'Fraud rate',
        chart: {
          series: RATE.map((v, i) => ({ time: hhmm(i), value: v })),
          unit: '%',
          threshold: { value: 1, label: 'Warning 1%', legend: 'Warning threshold 1% · 190 min above' },
          critical: { value: 2, label: 'Critical 2%', legend: 'Critical 2% · 140 min above' },
          peak: { x: '04:55', y: 3.6, label: '3.6% · 04:55' },
          yTicks: [0, 1, 2, 3, 4],
          xTicks: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
          annotations: [{ x: '02:10', label: 'Start 02:10' }],
          bands: [
            { from: '02:10', to: '02:50', label: '1 € test charges', tone: 'warn' },
            { from: '02:50', to: '05:50', label: 'Electronics purchases' }
          ],
          seriesLabel: 'CNP fraud on BIN 454812',
          shadeLabel: 'Above warning 02:40–05:50'
        },
        events: [
          { time: '01:50', text: 'The 3DS ACS starts receiving SMS OTPs with delays of more than 60 s', tone: 'warn', tag: 'ACS-3DS' },
          { time: '02:10', end: '02:50', text: 'Micro-payments of 0.50 to 1.00 € at subscription and donation merchants with cards from BIN 454812 (card testing)', tone: 'warn', tag: 'BIN 454812' },
          { time: '02:25', text: 'Falcon scores twelve transactions above 850; the alerts enter the night queue', tone: 'brand', tag: 'Falcon' },
          { time: '02:40', text: 'The CNP fraud rate on the BIN exceeds 1%', tone: 'crit', tag: 'BIN 454812' },
          { time: '02:50', text: 'Purchases of 150 to 400 € begin at electronics and gift-card merchants, under the acquirer\'s low-risk exemption', tone: 'crit', tag: 'TIENDAONLINE-ELEC' },
          { time: '03:30', text: 'Exceeds the 2% critical level', tone: 'crit', tag: 'BIN 454812' },
          { time: '04:10', text: 'The analyst on shift manually blocks 31 cards with confirmed transactions', tone: 'brand', tag: 'Falcon' },
          { time: '04:55', text: 'Peak of 3.6%', tone: 'crit', tag: 'BIN 454812' },
          { time: '05:50', text: 'Alarm ALM-FRA-0550: 186 suspicious transactions totalling 41,230 €; escalated to the Head of Fraud Prevention', tone: 'crit', tag: 'ALM-FRA-0550' }
        ],
        cause: 'Hypothesis for Fraud Prevention to confirm: enumeration attack on BIN 454812 (numbers and expiry dates tested with micro-payments) followed by purchases at merchants applying the acquirer transaction risk analysis exemption, without SCA. The ACS OTP delay since 01:50 pushed more merchants to use exemptions. 61 of the cards used tonight went through POS terminal 3 at Gasolinera Ronda Norte between 10 and 22/09 (CPP-2609-07).',
        system: 'Falcon Fraud',
        footer: 'Rate recalculated every 5 min over the CNP purchases of the last 30 min'
      },
      parte: {
        agent: AGENT,
        title: 'Daily operations report',
        sub: '06:00 indicators · 14 Operations Centre services · service thresholds',
        colItem: 'Service',
        systems: ['Falcon Fraud', 'ServiceNow'],
        inboxTitle: 'Daily operations report · 06:00 indicators',
        inboxCount: '14 services',
        inboxPending: '2 critical (fraud on BIN 454812 and the 3DS ACS) and 4 warnings pending review.',
        items,
        news,
        updates,
        steps: [
          { agent: AGENT, system: 'ServiceNow', action: 'Reads the 06:00 indicators of 14 services (channels, authorisation, fraud, SAC and payments)', result: '14 indicators received, no gaps', ms: 590 },
          { agent: AGENT, system: 'Falcon Fraud', action: 'Checks the fraud rate by BIN and the overnight alert queue', result: 'BIN 454812 at 2.9% (186 transactions, 41,230 €); other BINs at 0.05%', ms: 620, tone: 'crit' },
          { agent: AGENT, system: 'Redsys', action: 'Reviews 3DS authentication and the exemptions applied by acquirers', result: '6.8% of authentications expired since 01:50; 29% of purchases under an exemption', ms: 480, tone: 'crit' },
          { agent: AGENT, system: 'Agentic Platform', action: 'Compares each indicator with its service thresholds (12 indicators)', result: '2 critical · 4 warnings · 8 with no issues', ms: 60, tone: 'crit' },
          { agent: AGENT, system: 'Core bancario T24', action: 'Groups the 214 affected cards by customer and checks their status', result: '214 active cards of 209 customers; 31 already blocked manually at 04:10', ms: 440 },
          { agent: AGENT, system: 'Falcon Fraud', action: 'Cross-checks the attacked cards against open common point of purchase cases', result: '61 cards went through POS terminal 3 at Gasolinera Ronda Norte (CPP-2609-07)', ms: 410, tone: 'warn' },
          { agent: AGENT, system: 'Salesforce FSC', action: 'Cross-checks the merchants in the attack against open SAC complaints', result: 'SAC-2026-04187: charges from TIENDAONLINE-ELEC, one of tonight\'s merchants', ms: 370, tone: 'warn' },
          { agent: AGENT, system: 'GRC Archer', action: 'Applies the DORA incident classification criteria to the 3DS ACS', result: 'Possible major incident: customers affected > 10% of the service for more than 2 h. To be confirmed', ms: 520, tone: 'warn' },
          { agent: AGENT, system: 'ServiceNow', action: 'Looks for open incidents on the services with alerts', result: 'INC0218790 (ATMs) and INC0218811 (T24 close) already open', ms: 430 },
          { agent: AGENT, system: 'Modelo de lenguaje', action: 'Drafts the recommended action for each alert (6 calls)', result: '6 drafts, each with its reference policy (POL-FRA-003, PR-DORA-002, PR-SAC-001)', ms: 5600 },
          { agent: AGENT, system: 'ServiceNow', action: 'Creates INC0218841 for FAL-454812 · priority P1', result: 'Created and assigned to the Head of Fraud Prevention', ms: 250, tone: 'ok' },
          { agent: AGENT, system: 'ServiceNow', action: 'Creates INC0218842 for ACS-3DS · priority P1', result: 'Created and assigned to ICT Risk (DORA)', ms: 250, tone: 'ok' },
          { agent: AGENT, system: 'ServiceNow', action: 'Creates TASK0094410 for the SAC queue · high priority', result: 'Created and assigned to the SAC', ms: 220, tone: 'ok' },
          { agent: AGENT, system: 'ServiceNow', action: 'Creates TASK0094411 for the chargebacks · medium priority', result: 'Created and assigned to Payments', ms: 220, tone: 'ok' },
          { agent: AGENT, system: 'ServiceNow', action: 'Updates INC0218790 (ATMs) with today\'s reading', result: 'Reading added · high priority proposed · no duplicate incident', ms: 200 },
          { agent: AGENT, system: 'ServiceNow', action: 'Updates INC0218811 (T24 close) with today\'s delay', result: 'Reading added · no duplicate incident', ms: 200 },
          { agent: AGENT, system: 'Microsoft Teams', action: 'Posts the summary in the "Operations · morning shift" channel', result: 'Sent: 2 critical, 4 warnings and 4 tickets', ms: 390, tone: 'ok' }
        ],
        stats: [
          { label: 'Services reviewed', value: 14 },
          { label: 'Tickets created', value: 4, tone: 'ok' },
          { label: 'Incidents updated, not duplicated', value: 2 },
          { label: 'Cards to reissue (proposed)', value: 214, tone: 'crit' }
        ],
        relation: {
          title: 'Possible link with complaint SAC-2026-04187',
          body: 'TIENDAONLINE-ELEC, the merchant behind the three charges Lucía Ferrer Gil does not recognise (26/09/2026, 612.40 €), accounts for 23 of tonight\'s 186 suspicious transactions on BIN 454812, the same BIN as her card. In addition, 61 of the attacked cards went through common point of purchase CPP-2609-07.',
          more: 'This strengthens the fraud hypothesis and supports the provisional refund (PSD2, Art. 73). To be confirmed by Fraud Prevention and the SAC.',
          plain: 'TIENDAONLINE-ELEC, the merchant behind the charges in SAC-2026-04187 (Lucía Ferrer Gil, 612.40 €), accounts for 23 of tonight\'s 186 suspicious transactions on BIN 454812, the same BIN as her card. 61 attacked cards went through common point of purchase CPP-2609-07. Supports the provisional refund (PSD2, Art. 73). To be confirmed by Fraud Prevention and the SAC.',
          go: 'reclamacion',
          goLabel: 'Open the complaint'
        },
        policy: 'Policy applied: ServiceNow incidents and tasks are created without prior approval; blocking cards, activating Falcon rules, reissuing or notifying a DORA incident requires approval from the Head of Fraud Prevention or ICT Risk (POL-FRA-003, PR-DORA-002).',
        channel: 'Operations · morning shift',
        resultSummary: '2 incidents and 2 tasks created in ServiceNow, 2 existing incidents updated and summary posted in Microsoft Teams.',
        auditRequest: 'Operations Centre · 06:00 indicators · 14 services',
        auditNew: 'Ticket created in ServiceNow',
        auditUpdate: 'Incident updated in ServiceNow',
        reportTitle: 'Daily operations report · Operations Centre',
        reportCode: 'PD-COP-20260929',
        reportMeta: [['Centre', 'Operations Centre · Madrid'], ['Shift', 'Morning'], ['Services reviewed', '14'], ['Critical · warnings', '2 · 4']],
        reportSummary: 'Of 14 services reviewed, 2 are critical and 4 are on warning. BIN 454812 has been under a card-testing and card-not-present purchase attack since 02:10 (186 transactions, 41,230 €), helped by the OTP delay on the 3DS ACS. 2 incidents and 2 tasks have been created in ServiceNow and 2 existing incidents have been updated, without duplicating them.',
        signatures: [{ role: 'Head of Operations', note: 'Reviewed' }, { role: 'Head of Fraud Prevention', note: 'Received' }]
      },
      presenter: {
        say: [
          'This is how the Head of Operations starts the shift: everything that needs a decision, in a single inbox.',
          'The data comes from their own systems: Falcon alerts, Redsys authorisations, customers and cards from the T24 core, Salesforce complaints and ServiceNow incidents. Here it is synthetic, but consistent across the board.',
          'The map sums up operations at a glance: grey is normal, colour needs attention. BIN 454812 is red; click it to see the transactions, the amount and what Agentic Platform proposes.',
          'Three matters: the 05:50 fraud spike on BIN 454812 (186 transactions, 41,230 €), Lucía Ferrer\'s complaint, which needs a provisional refund decision today, and the report with 2 critical items.'
        ],
        sayBefore: ['Generate daily report: it reviews 14 services, does not duplicate open incidents and creates the tickets. Watch the time it takes.'],
        sayAfter: [
          'The link Agentic Platform finds: the merchant in Lucía Ferrer\'s complaint shows up in tonight\'s attack, and 61 attacked cards went through the petrol station\'s common point of purchase. Nobody had to cross-check Falcon, T24 and Salesforce.',
          'And no duplicates: two incidents already open are updated instead of opening new tickets.'
        ],
        next: 'Click "Generate daily report" and talk through the log while it runs.',
        nextAfter: 'Go to "From words to workflow" (right arrow) to build the response to the fraud spike from the written policy.'
      }
    };
  })()
});
