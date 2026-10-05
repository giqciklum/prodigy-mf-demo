/* Mercados Moncayo · shift summary («turno» scene), English. Synthetic demo data (MFM). */
agenticPackEn('retail', {
  turno: (function () {
    'use strict';
    const hhmm = (i) => `${String(Math.floor((i * 5) / 60)).padStart(2, '0')}:${String((i * 5) % 60).padStart(2, '0')}`;
    /* Air temperature of multideck MR-3 at T-027 (probe TS-T027-MR3), every 5 min from 00:00 to 05:50. */
    const AIR = [3.2, 3.0, 3.2, 3.2, 3.2, 3.2, 3.2, 3.2, 3.1, 3.2, 3.2, 3.2, 3.7, 4.3, 4.3, 4.2, 4.2, 3.8, 3.3, 3.3, 3.3, 3.3, 3.2, 3.2,
      3.3, 3.3, 3.3, 3.3, 3.3, 3.2, 3.3, 3.2, 3.2, 3.2, 3.3, 3.3, 3.2, 3.2, 3.4, 3.5, 3.8, 4.0, 4.2, 4.3, 4.6, 4.7, 4.8, 5.1,
      5.3, 5.6, 5.8, 6.2, 6.4, 6.6, 7.0, 7.2, 7.4, 7.8, 8.1, 8.3, 8.5, 8.7, 9.0, 9.1, 9.4, 9.6, 9.8, 9.7, 9.5, 9.4, 9.4];
    const AGENT = 'Daily operations report';

    const items = [
      { code: 'T027-MR3', name: 'Dairy multideck MR-3 · T-027 Huesca Centro', tag: 'HACCP', area: 'Stores · Huesca area', metric: 'multideck air temperature', reading: '9.4 °C', baseline: '3.0 °C', limits: 'warning > 5 · critical > 8 °C', status: 'critical',
        note: 'Above 5 °C since 03:55 owing to an evaporator fan failure; peak of 9.8 °C at 05:30. 318 chilled units inside.' },
      { code: 'REC-VID', name: 'Goods-in at the DC · glass breakages', tag: 'Foreign bodies', area: 'Plaza distribution centre · goods-in docks', metric: 'glass containers broken at goods-in (7 days)', reading: '0.42 %', baseline: '0.05 %', limits: 'warning > 0.1 · critical > 0.3 %', status: 'critical',
        note: 'Three Conservas del Jalón pallets with broken jars this week (tomato sauce and other sauces). At goods-in of lot L26214 on 05/08, 14 broken jars had already been recorded on one pallet.' },
      { code: 'T014-CF', name: 'Fresh produce cold room · T-014 Calatayud', area: 'Stores · Zaragoza province', metric: 'cold room air temperature', reading: '4.6 °C', baseline: '2.0 °C', limits: 'warning > 4 · critical > 6 °C', status: 'warning',
        note: 'The cold room door was left ajar after the 05:10 delivery; the store manager closed it at 05:48 and the temperature is falling.' },
      { code: 'MUE-EXP', name: 'DC dispatch docks', area: 'Plaza distribution centre', metric: 'pallets awaiting loading at 06:00', reading: '46', baseline: '≤ 20', limits: 'warning > 25 · critical > 60', status: 'warning',
        note: 'The Huesca route (7 stores) is leaving 50 min late because a driver is off sick; store T-027 receives its delivery at 08:40.' },
      { code: 'TPV', name: 'Store POS', area: 'Store systems', metric: 'stores with at least one POS offline', reading: '3 of 64', baseline: '0', limits: 'warning ≥ 2 · critical ≥ 6', status: 'warning',
        note: 'T-033, T-048 and T-052 have not synchronised prices since closing; incident INC0031490 open for the store server certificate.' },
      { code: 'SNS', name: 'Cold-chain sensor probes', area: 'Store systems', metric: 'probes not communicating', reading: '5 of 1,284', baseline: '≤ 2', limits: 'warning > 3 · critical > 10', status: 'warning',
        note: 'Five probes at T-019 and T-044 with no data since Sunday’s power cut; incident INC0031497 open.' },
      { code: 'T027-CL', name: 'Dairy cold room · T-027 Huesca Centro', area: 'Stores · Huesca area', metric: 'cold room air temperature', reading: '2.9 °C', baseline: '3.0 °C', limits: 'warning > 5 · critical > 8 °C', status: null, note: '' },
      { code: 'T011-MR', name: 'Refrigerated multidecks · T-011 Zaragoza Delicias', area: 'Stores · Zaragoza city', metric: 'average multideck temperature', reading: '3.1 °C', baseline: '3.0 °C', limits: 'warning > 5 · critical > 8 °C', status: null, note: '' },
      { code: 'CF-1', name: 'DC chilled store CF-1', area: 'Plaza distribution centre', metric: 'air temperature', reading: '2.8 °C', baseline: '2.5 °C', limits: 'warning > 4 · critical > 6 °C', status: null, note: '' },
      { code: 'CC-1', name: 'DC frozen store CC-1', area: 'Plaza distribution centre', metric: 'air temperature', reading: '−22.4 °C', baseline: '−22.0 °C', limits: 'warning > −18 · critical > −15 °C', status: null, note: '' },
      { code: 'FLOTA', name: 'Refrigerated fleet on the road', area: 'Transport', metric: 'maximum temperature recorded in the trailer', reading: '3.4 °C', baseline: '≤ 4 °C', limits: 'warning > 5 · critical > 7 °C', status: null, note: '' },
      { code: 'WMS-PCK', name: 'Order picking (WMS Manhattan)', area: 'Plaza distribution centre', metric: 'lines picked without error', reading: '99.7 %', baseline: '≥ 99.5 %', limits: 'warning < 99.5 · critical < 99 %', status: null, note: '' },
      { code: 'VTA', name: 'Yesterday’s sales across the 64 stores', area: 'Commercial', metric: 'variance against forecast', reading: '−1.2 %', baseline: '± 3 %', limits: 'warning ± 5 · critical ± 10 %', status: null, note: '' },
      { code: 'ROT', name: 'On-shelf availability gaps', area: 'Stores · all', metric: 'lines out of stock at opening (forecast)', reading: '0.8 %', baseline: '≤ 1.5 %', limits: 'warning > 2 · critical > 4 %', status: null, note: '' }
    ];

    const news = [
      { id: 'INC0031522', equipment: 'T027-MR3', priority: 'Urgent · HACCP', tone: 'crit', owner: 'Refrigeration Maintenance (Frío Industrial Oscense)',
        action: 'Replace the MR-3 evaporator fan motor before opening (09:00). Removing the product, moving it to the cold room and blocking its sale at the POS requires Quality approval (APPCC-TIE-01).' },
      { id: 'INC-PRO-2026-0059', equipment: 'REC-VID', priority: 'High · supplier', tone: 'crit', owner: 'Supplier Quality',
        action: 'Raise a supplier incident with Conservas del Jalón for repeated glass breakages (0.42 % in 7 days; 3 pallets). Request their root-cause analysis of palletisation and in-line glass control (PR-PRO-006).' },
      { id: 'INC0031523', equipment: 'T014-CF', priority: 'Medium', tone: 'warn', owner: 'Area Store Manager',
        action: 'Review with T-014 how the fresh produce cold room is closed after deliveries and check at 08:00 that it is back below 4 °C. If it does not drop, alert Refrigeration Maintenance.' },
      { id: 'TASK0012870', equipment: 'MUE-EXP', priority: 'Medium', tone: 'warn', owner: 'Distribution Centre Manager',
        action: 'Reassign a driver from the Teruel route to the Huesca route and notify the 7 stores of the delay; prioritise loading the T-027 order for the chilled replenishment.' }
    ];
    const updates = [
      { id: 'INC0031490', equipment: 'TPV', priority: 'High (proposed)', tone: 'warn', owner: 'Store Systems',
        action: 'Today’s three stores (T-033, T-048 and T-052) are added to the open certificate incident and a priority increase is proposed: without synchronising they do not receive sales blocks.' },
      { id: 'INC0031497', equipment: 'SNS', priority: 'No change', tone: 'warn', owner: 'Refrigeration Maintenance',
        action: 'Today’s reading (5 probes with no data) is added to the open power-cut incident. No duplicate incident is created.' }
    ];

    return {
      title: 'Plaza distribution centre and stores · morning shift',
      nav: 'Shift summary',
      clockLabel: 'Distribution centre time',
      decider: 'Operations',
      kpis: [
        { label: 'Units exposed in multideck MR-3', value: 318, sub: 'T-027 Huesca Centro · yoghurts, desserts and fresh dairy', icon: 'thermometer', tone: 'crit', href: '#alarma' },
        { label: 'Minutes above 5 °C', value: 115, sub: 'Since 03:55 · peak of 9.8 °C at 05:30', icon: 'clock', href: '#alarma' },
        { label: 'Consumer complaints', value: 1, sub: 'ATC-2026-0412 · reply due by 30/09 21:37', icon: 'mail', href: '#reclamacion' },
        { label: 'Items with alerts', value: '6 of 14', sub: '2 critical · 4 warnings · 06:00 readings', icon: 'gauge', action: 'scroll-parte' }
      ],
      map: {
        title: 'Operations map · distribution centre and 64 stores',
        sub: 'Readings from the 06:00 report and the cold-chain sensors at 05:50 · click an item to see its details',
        icon: 'warehouse',
        readonly: 'Agentic Platform reads the cold-chain sensors, WMS Manhattan, SAP S/4 Retail and store POS; it does not change set points or block sales without approval',
        zones: [
          { id: 'rec', title: 'Goods-in', sub: 'Plaza distribution centre', items: [
            { code: 'REC-VID', name: 'Glass control', reading: '0.42 % breakages', status: 'crit', tags: ['L26214'], go: 'reclamacion', goLabel: 'Open the complaint',
              note: 'Conservas del Jalón has three pallets with broken jars this week. It is the manufacturer of the tomato sauce in complaint ATC-2026-0412.', kv: [['Supplier', 'Conservas del Jalón, S.L.'], ['Pallets with breakages (7 days)', '3 of 41'], ['Lot L26214', '14 broken jars at goods-in on 05/08']] },
            { code: 'MUE-REC', name: 'Goods-in docks', reading: '18 lorries', status: null, kv: [['Expected today', '18 suppliers'], ['First unloading', '05:30']] }
          ] },
          { id: 'pla', title: 'Warehouse', sub: 'WMS Manhattan', items: [
            { code: 'CF-1', name: 'Chilled', reading: '2.8 °C', status: 'ok', kv: [['Pallets', '1,140'], ['Set point', '2.5 °C']] },
            { code: 'CC-1', name: 'Frozen', reading: '−22.4 °C', status: 'ok', kv: [['Pallets', '860']] },
            { code: 'SECO', name: 'Ambient and canned goods', reading: '480 jars L26214', status: null, tags: ['L26214'], go: 'retirada', goLabel: 'Mock recall', note: '480 jars of Tomate frito Moncayo 400 g (tomato sauce) from lot L26214 remain in location P-12-04-2.', kv: [['Location', 'P-12-04-2'], ['Status', 'Available to ship']] },
            { code: 'WMS-PCK', name: 'Picking', reading: '99.7 %', status: 'ok' }
          ] },
          { id: 'exp', title: 'Dispatch', sub: 'Store routes', items: [
            { code: 'MUE-EXP', name: 'Dispatch docks', reading: '46 pallets', status: 'warn', note: 'Huesca route running 50 min late because a driver is off sick.', kv: [['Routes today', '12'], ['Delayed route', 'Huesca · 7 stores']] },
            { code: 'FLOTA', name: 'Refrigerated fleet', reading: '3.4 °C max.', status: 'ok', kv: [['Lorries on the road', '9']] }
          ] },
          { id: 'hu', title: 'Huesca stores', sub: '9 stores', items: [
            { code: 'T027-MR3', name: 'T-027 · multideck MR-3', reading: '9.4 °C', status: 'crit', go: 'alarma', goLabel: 'Open the alarm',
              note: 'Evaporator fan stopped since 03:10. Agentic Platform proposes removing the product to the cold room, an urgent work order and blocking at the POS anything exposed for more than 2 h.',
              kv: [['Units inside', '318'], ['Above 5 °C', 'since 03:55'], ['Peak', '9.8 °C at 05:30'], ['Store opening', '09:00']] },
            { code: 'T027-CL', name: 'T-027 · cold room', reading: '2.9 °C', status: 'ok', note: 'Space for about 400 packs: proposed destination for the transfer.', kv: [['Free capacity', '≈ 1.2 m³']] },
            { code: 'T031', name: 'T-031 Monzón', reading: '3.0 °C', status: 'ok' }
          ] },
          { id: 'zg', title: 'Zaragoza stores', sub: '38 stores', items: [
            { code: 'T011-MR', name: 'T-011 Delicias', reading: '3.1 °C', status: 'ok', tags: ['L26214'], go: 'reclamacion', goLabel: 'Open the complaint', note: 'Store where the jar in complaint ATC-2026-0412 was bought.', kv: [['L26214 on shelf', '36 jars']] },
            { code: 'T014-CF', name: 'T-014 Calatayud', reading: '4.6 °C', status: 'warn', kv: [['Door', 'closed at 05:48']] },
            { code: 'TPV', name: 'Store POS', reading: '3 offline', status: 'warn', kv: [['Incident', 'INC0031490']] },
            { code: 'SNS', name: 'Cold-chain probes', reading: '5 with no data', status: 'warn', kv: [['Incident', 'INC0031497']] }
          ] }
        ]
      },
      inbox: {
        alarm: {
          icon: 'thermometer',
          title: 'T-027 Huesca Centro · dairy multideck MR-3',
          meta: ['Alarm 05:50 · ALM-T027-0550'],
          systems: ['Sensores de frío'],
          body: '9.4 °C against the 5 °C limit since 03:55 owing to an evaporator fan failure; peak of 9.8 °C at 05:30. There are 318 chilled units inside; the store opens at 09:00.'
        },
        complaint: {
          icon: 'mail',
          title: 'Complaint ATC-2026-0412 · glass in tomato sauce',
          meta: ['28/09 21:37', 'Javier Lasheras', 'Loyalty app'],
          body: 'Glass fragment in a jar of Tomate frito Moncayo 400 g bought at T-011 Zaragoza Delicias. Lot',
          trace: 'L26214',
          after: 'Manufacturer: Conservas del Jalón, S.L. Reply to the consumer within 48 h.',
          due: 'Due 30/09 21:37',
          goLabel: 'Open complaint'
        }
      },
      chart: {
        title: 'T-027 · multideck MR-3 temperature',
        sub: 'Huesca Centro dairy multideck · set point 3 °C · now 9.4 °C (05:50)',
        icon: 'thermometer',
        tabLabel: 'Temperature',
        chart: {
          series: AIR.map((v, i) => ({ time: hhmm(i), value: v })),
          unit: '°C',
          threshold: { value: 5, label: 'Limit 5 °C', legend: 'Limit 5 °C · 115 min above' },
          critical: { value: 8, label: 'Critical 8 °C', legend: 'Critical 8 °C · 60 min above' },
          peak: { x: '05:30', y: 9.8 },
          last: false,
          yTicks: [0, 2, 4, 6, 8, 10, 12],
          xTicks: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
          annotations: [{ x: '03:10', label: 'Fan stopped 03:10' }],
          bands: [
            { from: '01:00', to: '01:20', label: 'Defrost' },
            { from: '03:10', to: '05:50', label: 'Evaporator fan drawing no current', tone: 'warn' }
          ],
          seriesLabel: 'Multideck air (TS-T027-MR3)',
          shadeLabel: 'Above the limit 03:55–05:50'
        },
        events: [
          { time: '01:00', end: '01:20', text: 'Scheduled defrost of multideck MR-3 (rises to 4.3 °C, within normal range)', tone: 'brand', tag: 'MR-3' },
          { time: '03:10', text: 'The evaporator fan stops drawing current (0 A): probable motor failure', tone: 'warn', tag: 'EV-MR3' },
          { time: '03:55', text: 'Temperature exceeds 5 °C: cold-chain sensors alert the alarm receiving centre (store closed)', tone: 'crit', tag: 'TS-T027-MR3' },
          { time: '04:20', text: 'The alarm centre calls the T-027 store manager; no answer (off shift)', tone: 'warn', tag: 'Alarm centre' },
          { time: '04:50', text: 'Exceeds the 8 °C critical level', tone: 'crit', tag: 'TS-T027-MR3' },
          { time: '05:30', text: 'Peak of 9.8 °C', tone: 'crit', tag: 'TS-T027-MR3' },
          { time: '05:50', text: 'Alarm ALM-T027-0550: 115 min above 5 °C; escalated to the Head of Quality', tone: 'crit', tag: 'ALM-T027-0550' }
        ],
        cause: 'Hypothesis to be confirmed by Refrigeration Maintenance: failure of the MR-3 evaporator fan motor (0 A since 03:10). The compressor is still running, but without air circulation the multideck loses cooling; the lowered night blind slowed the rise.',
        system: 'Sensores de frío',
        footer: 'Reading every 5 min'
      },
      parte: {
        agent: AGENT,
        title: 'Daily operations report',
        sub: '06:00 readings · 14 items across the distribution centre and stores · HACCP and service thresholds',
        colItem: 'Item',
        systems: ['Sensores de frío', 'WMS Manhattan'],
        inboxTitle: 'Daily operations report · 06:00 readings',
        inboxCount: '14 items',
        inboxPending: '2 critical (multideck MR-3 at T-027 and glass breakages at goods-in) and 4 warnings awaiting review.',
        items,
        news,
        updates,
        steps: [
          { agent: AGENT, system: 'Sensores de frío', action: 'Reads the 1,284 multideck and cold room probes across the 64 stores and the distribution centre', result: '1,279 readings received; 5 probes with no data (T-019 and T-044)', ms: 680 },
          { agent: AGENT, system: 'WMS Manhattan', action: 'Checks goods-in, picking and the DC dispatch docks', result: '46 pallets awaiting loading; 3 pallets with broken jars in 7 days', ms: 520, tone: 'warn' },
          { agent: AGENT, system: 'TPV tiendas', action: 'Reviews POS status and yesterday’s sales', result: '3 stores with POS offline; sales −1.2 % against forecast', ms: 410 },
          { agent: AGENT, system: 'Agentic Platform', action: 'Compares each reading with its HACCP and service thresholds (12 indicators)', result: '2 critical · 4 warnings · 8 with no issues', ms: 60, tone: 'crit' },
          { agent: AGENT, system: 'SAP S/4 Retail', action: 'Lists the range in multideck MR-3 at T-027 with its lots', result: '318 units across 12 lines (yoghurts, desserts, fresh milk, cream and butter)', ms: 450, tone: 'crit' },
          { agent: AGENT, system: 'SAP S/4 Retail', action: 'Cross-checks glass breakages against suppliers and lots', result: 'Conservas del Jalón: 3 pallets this week; lot L26214 already had 14 broken jars at goods-in on 05/08', ms: 430, tone: 'warn' },
          { agent: AGENT, system: 'CRM Fidelización', action: 'Cross-checks the alerts against open consumer complaints', result: 'ATC-2026-0412: glass in Tomate frito Moncayo 400 g, lot L26214', ms: 360, tone: 'warn' },
          { agent: AGENT, system: 'ServiceNow', action: 'Searches for open incidents on the items with alerts', result: 'INC0031490 (POS) and INC0031497 (probes) already open', ms: 420 },
          { agent: AGENT, system: 'Modelo de lenguaje', action: 'Drafts the recommended action for each alert (6 calls)', result: '6 drafts, each with its reference procedure (APPCC-TIE-01, PR-PRO-006, PR-CAL-010)', ms: 5700 },
          { agent: AGENT, system: 'ServiceNow', action: 'Creates INC0031522 for multideck MR-3 at T-027 · urgent priority', result: 'Created and assigned to Refrigeration Maintenance (Frío Industrial Oscense)', ms: 250, tone: 'ok' },
          { agent: AGENT, system: 'ServiceNow', action: 'Creates INC-PRO-2026-0059 for Conservas del Jalón · high priority', result: 'Created and assigned to Supplier Quality', ms: 260, tone: 'ok' },
          { agent: AGENT, system: 'ServiceNow', action: 'Creates INC0031523 for the T-014 cold room · medium priority', result: 'Created and assigned to the Area Store Manager', ms: 220, tone: 'ok' },
          { agent: AGENT, system: 'ServiceNow', action: 'Creates TASK0012870 for the dispatch docks · medium priority', result: 'Created and assigned to the Distribution Centre Manager', ms: 220, tone: 'ok' },
          { agent: AGENT, system: 'ServiceNow', action: 'Updates INC0031490 (POS) with today’s stores', result: 'Reading added · high priority proposed · no duplicate incident', ms: 200 },
          { agent: AGENT, system: 'ServiceNow', action: 'Updates INC0031497 (probes) with today’s reading', result: 'Reading added · no duplicate incident', ms: 200 },
          { agent: AGENT, system: 'Microsoft Teams', action: 'Posts the summary in the “Operations · DC and stores” channel', result: 'Sent: 2 critical, 4 warnings and 4 tickets', ms: 390, tone: 'ok' }
        ],
        stats: [
          { label: 'Items reviewed', value: 14 },
          { label: 'Tickets created', value: 4, tone: 'ok' },
          { label: 'Incidents updated, not duplicated', value: 2 },
          { label: 'Units to remove from the multideck', value: 318, tone: 'crit' }
        ],
        relation: {
          title: 'Possible link with complaint ATC-2026-0412',
          body: 'Glass breakages from Conservas del Jalón keep recurring at DC goods-in: three pallets this week and a rate of 0.42 % (benchmark 0.05 %). Lot L26214 of Tomate frito Moncayo 400 g, the subject of Javier Lasheras’s complaint about a glass fragment, had already arrived on 05/08 with 14 broken jars on one pallet, and the manufacturer reported a breakage on its filler during that same lot (INC-PRO-2026-0049).',
          more: 'A broken jar on the pallet can scatter fragments onto intact jars. PR-CAL-010 requires a recall of the lot to be assessed (4,320 jars shipped to 41 stores). To be confirmed by Quality.',
          plain: 'Repeated glass breakages from Conservas del Jalón at goods-in (3 pallets this week, 0.42 %; benchmark 0.05 %). Lot L26214 in complaint ATC-2026-0412 had already arrived on 05/08 with 14 broken jars on one pallet, and the manufacturer reported a breakage on its filler during that lot (INC-PRO-2026-0049). PR-CAL-010 requires a recall of the lot to be assessed (4,320 jars in 41 stores). To be confirmed by Quality.',
          go: 'reclamacion',
          goLabel: 'Open the complaint'
        },
        policy: 'Policy applied: ServiceNow incidents are created without prior approval; removing product from the shelf, blocking its sale at the POS or starting a lot recall requires approval from the Head of Quality (APPCC-TIE-01, PR-CAL-010).',
        channel: 'Operations · DC and stores',
        resultSummary: '4 incidents and tasks created in ServiceNow, 2 existing incidents updated and summary posted in Microsoft Teams.',
        auditRequest: 'Plaza distribution centre and 64 stores · 06:00 readings · 14 items',
        auditNew: 'Ticket created in ServiceNow',
        auditUpdate: 'Incident updated in ServiceNow',
        reportTitle: 'Daily operations report · Plaza distribution centre and stores',
        reportCode: 'PD-PLZ-20260929',
        reportMeta: [['Site', 'Plaza distribution centre · 64 stores'], ['Shift', 'Morning'], ['Items reviewed', '14'], ['Critical · warnings', '2 · 4']],
        reportSummary: 'Of 14 items reviewed, 2 are critical and 4 are at warning level. Dairy multideck MR-3 at T-027 Huesca Centro has been above 5 °C since 03:55 owing to an evaporator fan failure, with 318 units inside. Glass breakages from Conservas del Jalón, manufacturer of lot L26214 in complaint ATC-2026-0412, keep recurring at DC goods-in. 4 incidents and tasks have been created and 2 existing ones updated, without duplicating them.',
        signatures: [{ role: 'Director of Operations', note: 'Reviewed' }, { role: 'Head of Quality', note: 'Received' }]
      },
      presenter: {
        say: [
          'This is how the Director of Operations at Mercados Moncayo starts the shift: everything that needs a decision, in a single inbox.',
          'The data comes from their systems: temperatures from the cold-chain sensors, pallets from WMS Manhattan, lots and range from SAP, sales from the POS and complaints from the CRM. Here they are synthetic, but consistent with each other.',
          'The map sums up the distribution centre and the stores at a glance: grey is normal, colour is what needs attention. Multideck MR-3 in Huesca is red; click it to see what is inside and what Agentic Platform proposes.',
          'Three issues: the T-027 dairy multideck alarm at 05:50 (318 units, the store opens at 09:00), the complaint about glass in Moncayo tomato sauce and the report with 2 critical items.'
        ],
        sayBefore: ['Generate daily report: it reviews 14 items, does not duplicate open incidents and creates the tickets. Watch the time.'],
        sayAfter: [
          'The link Agentic Platform finds: the manufacturer of the tomato sauce in the complaint keeps having glass breakages at goods-in, and the same lot already arrived with broken jars. Nobody had to cross-check the WMS, SAP and the CRM.',
          'And no duplicates: two incidents that were already open are updated instead of opening new tickets.'
        ],
        next: 'Click “Generate daily report” and talk through the log while it runs.',
        nextAfter: 'Go to “From words to workflow” (right arrow) to build the response to the multideck alarm from the written procedure.'
      }
    };
  })()
});
