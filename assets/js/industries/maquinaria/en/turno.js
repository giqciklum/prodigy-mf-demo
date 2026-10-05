/* Hidromec Ebro · shift summary («turno» scene), English. Synthetic demonstration data (MFM). */
agenticPackEn('maquinaria', {
  turno: (function () {
    'use strict';
    const hhmm = (i) => `${String(Math.floor((i * 5) / 60)).padStart(2, '0')}:${String((i * 5) % 60).padStart(2, '0')}`;
    /* Mean spindle RMS on MC-04 every 5 min, from 00:00 to 05:50 (sensor VS-MC04-01). */
    const RMS = [2.1, 2.3, 2.2, 2.2, 2.3, 2.2, 2.2, 2.3, 2.3, 2.2, 2.3, 2.3, 2.3, 2.2, 0.6, 0.6, 0.5, 0.6, 2.3, 2.3, 2.4, 2.4, 2.3, 2.3,
      2.4, 2.4, 2.4, 2.4, 2.5, 2.5, 2.4, 2.5, 2.8, 2.8, 3.0, 3.1, 3.3, 3.5, 3.7, 3.8, 4.0, 4.2, 4.2, 4.3, 4.6, 4.8, 4.9, 5.0,
      5.3, 5.3, 5.6, 5.7, 5.9, 6.1, 6.2, 6.3, 6.5, 6.7, 6.9, 7.0, 7.2, 7.4, 7.6, 7.7, 7.9, 8.0, 8.2, 8.1, 8.0, 7.9, 7.8];
    const AGENT = 'Daily plant report';
    const ROLE = { maint: 'Maintenance manager', quality: 'Quality manager', prod: 'Production manager', qshift: 'Shift quality technician' };

    const items = [
      { code: 'MC-04', name: 'MC-04 machining centre (DMG Mori DMU 65)', tag: 'Critical asset', area: 'Machining · bay 1', metric: 'spindle vibration', reading: '7.8 mm/s RMS', baseline: '2.3 mm/s RMS', limits: 'warning > 4.5 · critical > 7.1 mm/s', status: 'critical',
        note: 'Above 4.5 mm/s (ISO 10816-3, zone D) since 03:40; peak of 8.4 mm/s at 05:32. It machined 42 cylinder heads from batch CUL-2609-118 in that window.' },
      { code: 'BP-1', name: 'BP-1 hydraulic test bench', tag: 'Final inspection', area: 'Test bench · bay 3', metric: 'tests with leaks or weeping', reading: '2 of 16', baseline: '0 of 16 (≤ 0.5%)', limits: 'warning ≥ 1 · critical ≥ 2 tests', status: 'critical',
        note: 'Weeping at the main cylinder rod of PH250-26-0476 and PH250-26-0478 in the pre-shipment retest (1.25 × nominal pressure). Both carry seals from batch JNT-2607-031 (assembly MON-2608-11).' },
      { code: 'RECT-01', name: 'RECT-01 cylindrical grinder (Studer S33)', area: 'Machining · bay 1', metric: 'coolant temperature', reading: '27.4 °C', baseline: '22.0 °C', limits: 'warning > 25 · critical > 30 °C', status: 'warning',
        note: 'The coolant chiller cannot reach its set point: risk of dimensional drift on the piston rods (h6 tolerance). Clean the heat exchanger.' },
      { code: 'CP-1', name: 'CP-1 paint booth', area: 'Painting and dispatch', metric: 'relative humidity in the booth', reading: '76%', baseline: '55%', limits: 'warning > 70 · critical > 85%', status: 'warning',
        note: 'High humidity because the dehumidifier has been in manual mode since the night shift: risk of curing defects in the epoxy primer.' },
      { code: 'COMP-1', name: 'COMP-1 air compressor (Atlas Copco GA 75)', area: 'General services', metric: 'pressure dew point', reading: '+8 °C', baseline: '+3 °C', limits: 'warning > +6 · critical > +10 °C', status: 'warning',
        note: 'The refrigeration dryer is underperforming; there is already an open work order (OT-2026-31688) for the condensate drain.' },
      { code: 'LM-2', name: 'LM-2 cylinder assembly line', area: 'Assembly · bay 2', metric: 'out-of-tolerance tightenings', reading: '1.6%', baseline: '0.4%', limits: 'warning > 1 · critical > 3%', status: 'warning',
        note: 'The cylinder cap nutrunner (station 4) intermittently gives low torques; open work order OT-2026-31702 to calibrate the transducer.' },
      { code: 'MC-02', name: 'MC-02 machining centre (DMG Mori DMU 65)', area: 'Machining · bay 1', metric: 'spindle vibration', reading: '2.0 mm/s RMS', baseline: '2.1 mm/s RMS', limits: 'warning > 4.5 · critical > 7.1 mm/s', status: null,
        note: '' },
      { code: 'MC-01', name: 'MC-01 machining centre (Mazak Variaxis i-700)', area: 'Machining · bay 1', metric: 'spindle vibration', reading: '1.8 mm/s RMS', baseline: '1.9 mm/s RMS', limits: 'warning > 4.5 · critical > 7.1 mm/s', status: null, note: '' },
      { code: 'MC-03', name: 'MC-03 machining centre (Mazak Variaxis i-700)', area: 'Machining · bay 1', metric: 'spindle vibration', reading: '2.4 mm/s RMS', baseline: '2.2 mm/s RMS', limits: 'warning > 4.5 · critical > 7.1 mm/s', status: null, note: '' },
      { code: 'TOR-01', name: 'TOR-01 CNC lathe (Okuma LB3000)', area: 'Machining · bay 1', metric: 'headstock vibration', reading: '1.6 mm/s RMS', baseline: '1.7 mm/s RMS', limits: 'warning > 4.5 · critical > 7.1 mm/s', status: null, note: '' },
      { code: 'CMM-1', name: 'CMM-1 coordinate measuring machine', area: 'Metrology', metric: 'reference part deviation', reading: '1.2 µm', baseline: '≤ 2.0 µm', limits: 'warning > 2.5 · critical > 4 µm', status: null, note: '' },
      { code: 'BP-2', name: 'BP-2 hydraulic test bench', area: 'Test bench · bay 3', metric: 'tests with leaks or weeping', reading: '0 of 11', baseline: '0 of 11 (≤ 0.5%)', limits: 'warning ≥ 1 · critical ≥ 2 tests', status: null, note: '' },
      { code: 'LM-1', name: 'LM-1 hydraulic power unit assembly line', area: 'Assembly · bay 2', metric: 'out-of-tolerance tightenings', reading: '0.3%', baseline: '0.4%', limits: 'warning > 1 · critical > 3%', status: null, note: '' },
      { code: 'CH-1', name: 'CH-1 test hydraulic power unit', area: 'Test bench · bay 3', metric: 'oil cleanliness (ISO 4406)', reading: '17/15/12', baseline: '≤ 18/16/13', limits: 'warning > 19/17/14 · critical > 20/18/15', status: null, note: '' }
    ];

    const news = [
      { id: 'OT-2026-31851', equipment: 'MC-04', priority: 'Urgent · shutdown', tone: 'crit', owner: `${ROLE.maint} and Mechanical maintenance`,
        action: 'Stop MC-04 once the current part is finished and inspect the spindle bearings (spectral analysis; BPFO dominant). Lock out the machine per PR-SEG-002. The shutdown requires approval (alarm ALM-MC04-0550).' },
      { id: 'NC-2026-0234', equipment: 'BP-1', priority: 'High · quality', tone: 'crit', owner: `${ROLE.quality} and Purchasing · supplier quality`,
        action: 'Raise a non-conformance for weeping on 2 of 3 PH-250 presses from MON-2608-11 with JNT-2607-031 seals. Quarantine the 72 seals from the batch still in stock and ask Sellados Ibéricos for the batch material certificate and Shore hardness.' },
      { id: 'OT-2026-31852', equipment: 'RECT-01', priority: 'Medium', tone: 'warn', owner: 'Mechanical maintenance',
        action: 'Clean the coolant chiller heat exchanger on RECT-01 (27.4 °C; set point 22 °C) and check the first rod on CMM-1 after the job.' },
      { id: 'OT-2026-31853', equipment: 'CP-1', priority: 'Medium', tone: 'warn', owner: 'Electrical maintenance',
        action: 'Return the CP-1 dehumidifier to automatic mode and check the humidity probe (76%; process maximum 70%). Painting does not load parts until it drops below 70%.' }
    ];
    const updates = [
      { id: 'OT-2026-31688', equipment: 'COMP-1', priority: 'High (proposed)', tone: 'warn', owner: 'Utilities maintenance',
        action: 'Today’s reading (dew point +8 °C) is added to the open work order for the dryer drain. Raising the priority is proposed: the moist air reaches the clamping cylinders on MC-01 to MC-04.' },
      { id: 'OT-2026-31702', equipment: 'LM-2', priority: 'Unchanged', tone: 'warn', owner: 'Electrical maintenance',
        action: 'Today’s rate (1.6% low torques at station 4) is added to the open transducer calibration order. No duplicate order is created.' }
    ];

    return {
      title: 'Zaragoza plant · morning shift',
      nav: 'Shift summary',
      clockLabel: 'Plant time',
      decider: 'the plant manager',
      kpis: [
        { label: 'Cylinder heads machined under high vibration', value: 42, sub: 'Batch CUL-2609-118 · OF 4100872 · MC-04', icon: 'box', tone: 'crit', href: '#alarma' },
        { label: 'Minutes above the limit', value: 130, sub: 'MC-04 since 03:40 · peak 8.4 mm/s at 05:32', icon: 'activity', href: '#alarma' },
        { label: 'Open complaints', value: 1, sub: 'REC-2026-0187 · leak on PH-250 · acknowledge before 17:42 today', icon: 'mail', href: '#reclamacion' },
        { label: 'Assets with alerts', value: '6 of 14', sub: '2 critical · 4 warnings · 06:00 readings', icon: 'gauge', action: 'scroll-parte' }
      ],
      map: {
        title: 'Plant map · Zaragoza',
        sub: '06:00 report readings and IIoT Vibración at 05:50 · click an item to see its details',
        icon: 'factory',
        readonly: 'Agentic Platform reads IIoT Vibración, MES Opcenter, SAP S/4HANA and GMAO Maximo; it does not act on the CNCs or the test benches',
        zones: [
          { id: 'mec', title: 'Machining', sub: 'Bay 1 · 6 machines', items: [
            { code: 'MC-04', name: 'DMU 65 · cylinder heads', reading: '7.8 mm/s', status: 'crit', tags: ['CUL-2609-118'], go: 'alarma', goLabel: 'Open the alarm',
              note: 'Spindle vibration in zone D (ISO 10816-3) since 03:40. Agentic Platform proposes stopping the machine, blocking the 42 cylinder heads in SAP QM and moving OF 4100872 to MC-02.',
              kv: [['Production order', 'OF 4100872 · batch CUL-2609-118'], ['Parts in the window', '42 cylinder heads (03:40–05:50)'], ['Peak', '8.4 mm/s RMS at 05:32'], ['Spindle hours', '11,840 h since the last repair']] },
            { code: 'MC-02', name: 'DMU 65 · flanges', reading: '2.0 mm/s', status: 'ok', note: 'Twin of MC-04 (same CNC program and fixtures). Spare capacity from 08:00.', kv: [['Current order', 'OF 4100869 · BR-80 flanges (ends 07:55)'], ['Availability', '94% this week']] },
            { code: 'MC-01', name: 'Variaxis · bodies', reading: '1.8 mm/s', status: 'ok', kv: [['Current order', 'OF 4100866 · valve bodies']] },
            { code: 'MC-03', name: 'Variaxis · caps', reading: '2.4 mm/s', status: 'ok', kv: [['Current order', 'OF 4100870 · cylinder caps']] },
            { code: 'TOR-01', name: 'Lathe · rods', reading: '1.6 mm/s', status: 'ok', kv: [['Current order', 'OF 4100868 · Ø 80 rods']] },
            { code: 'RECT-01', name: 'Grinder', reading: '27.4 °C', status: 'warn', note: 'Coolant 5.4 °C above set point: risk of dimensional drift on h6 rods.', kv: [['Set point', '22.0 °C'], ['Proposal', 'Work order to clean the heat exchanger']] }
          ] },
          { id: 'mon', title: 'Assembly', sub: 'Bay 2', items: [
            { code: 'LM-2', name: 'Cylinders · presses', reading: '1.6% NOK', status: 'warn', note: 'Intermittent low torques at station 4; open work order OT-2026-31702.', kv: [['Open order', 'OT-2026-31702 (calibration)'], ['Baseline', '0.4%']] },
            { code: 'LM-1', name: 'Hydraulic power units', reading: '0.3% NOK', status: 'ok', kv: [['In assembly', 'GH-30 and GH-55 · batch MON-2609-27']] },
            { code: 'ALM-C', name: 'Component store', reading: null, status: null, tags: ['JNT-2607-031'], note: '72 seals from batch JNT-2607-031 (Sellados Ibéricos) remain at location C-14-03.', go: 'retirada', goLabel: 'Field campaign drill', kv: [['JNT-2607-031 seals', '72 in stock'], ['Supplier', 'Sellados Ibéricos, S.A.']] }
          ] },
          { id: 'bp', title: 'Testing and metrology', sub: 'Bay 3', items: [
            { code: 'BP-1', name: 'Press test bench', reading: '2 weeping', status: 'crit', tags: ['JNT-2607-031'], note: 'Weeping at the main cylinder rod of two PH-250 presses from MON-2608-11. Same seal batch as the press in the complaint.', go: 'reclamacion', goLabel: 'Open the complaint', kv: [['Tests yesterday', '16 (2 with weeping)'], ['Test pressure', '1.25 × nominal · 30 min'], ['Seal batch', 'JNT-2607-031']] },
            { code: 'BP-2', name: 'Power unit bench', reading: '0 leaks', status: 'ok', kv: [['Tests yesterday', '11 without incidents']] },
            { code: 'CH-1', name: 'Test power unit', reading: '17/15/12', status: 'ok', kv: [['ISO 4406 cleanliness', '≤ 18/16/13']] },
            { code: 'CMM-1', name: 'CMM metrology', reading: '1.2 µm', status: 'ok', note: 'Free from 07:00 for the 100% metrology of the 42 cylinder heads proposed by the alarm.', kv: [['Reference part', '1.2 µm deviation'], ['Capacity', '≈ 6 cylinder heads per hour']] }
          ] },
          { id: 'exp', title: 'Painting and dispatch', sub: 'Finished goods', items: [
            { code: 'CP-1', name: 'Paint booth', reading: '76% RH', status: 'warn', note: 'Dehumidifier in manual mode since the night shift.', kv: [['Process maximum', '70% RH']] },
            { code: 'EXP', name: 'Dispatch docks', reading: '3 loads today', status: null, kv: [['10:30', '2 PH-160 · Portugal'], ['13:00', '1 PH-400 · France'], ['17:30', '4 GH-55 · Navarre']] },
            { code: 'PT', name: 'Finished goods store', reading: '9 units', status: null, tags: ['MON-2608-11'], note: 'Includes the 3 PH-250 presses from MON-2608-11 still at the plant (2 weeping on BP-1).', kv: [['PH-250 on hold', '3 (MON-2608-11)']] }
          ] },
          { id: 'srv', title: 'Utilities', sub: 'Air and power', items: [
            { code: 'COMP-1', name: 'Air compressor', reading: '+8 °C DP', status: 'warn', note: 'High dew point; open work order OT-2026-31688 for the dryer drain.', kv: [['Open order', 'OT-2026-31688'], ['Baseline', '+3 °C']] },
            { code: 'TR-1', name: 'Transformer substation', reading: '61% load', status: null, kv: [['Rating', '1,000 kVA']] }
          ] }
        ]
      },
      inbox: {
        alarm: {
          icon: 'activity',
          title: 'MC-04 · spindle vibration',
          meta: ['Alarm 05:50 · ALM-MC04-0550'],
          systems: ['IIoT Vibración'],
          body: '7.8 mm/s RMS against the 4.5 mm/s limit (ISO 10816-3) since 03:40; peak of 8.4 mm/s at 05:32. 42 cylinder heads from batch CUL-2609-118 (OF 4100872) were machined in the window.'
        },
        complaint: {
          icon: 'mail',
          title: 'Complaint REC-2026-0187 · oil leak on PH-250 press',
          meta: ['28/09 17:42', 'Prensas y Servicios del Norte, S.L.', 'Ref. INC-PSN-0931'],
          body: 'Oil leak from the main cylinder of press',
          trace: 'PH250-26-0412',
          after: 'delivered to its end customer on 04/08/2026. Seal from batch JNT-2607-031 (Sellados Ibéricos). Acknowledgement within 24 h and 8D report before 13/10/2026.',
          due: 'Acknowledge today 17:42',
          goLabel: 'Open complaint'
        }
      },
      chart: {
        title: 'MC-04 · spindle vibration',
        sub: 'DMG Mori DMU 65 · sensor VS-MC04-01 · now 7.8 mm/s RMS (05:50)',
        icon: 'activity',
        tabLabel: 'Vibration',
        chart: {
          series: RMS.map((v, i) => ({ time: hhmm(i), value: v })),
          unit: 'mm/s',
          threshold: { value: 4.5, label: 'Limit 4.5 mm/s', legend: 'Limit 4.5 mm/s (ISO 10816-3) · 130 min above' },
          critical: { value: 7.1, label: 'Critical 7.1 mm/s', legend: 'Critical 7.1 mm/s · 50 min above' },
          peak: { x: '05:32', y: 8.4, label: '8.4 mm/s · 05:32' },
          yTicks: [0, 2, 4, 6, 8, 10],
          xTicks: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
          annotations: [{ x: '03:40', label: 'Warning 03:40' }],
          bands: [
            { from: '01:10', to: '01:30', label: 'Changeover', tone: 'warn' },
            { from: '01:30', to: '05:50', label: 'OF 4100872' }
          ],
          seriesLabel: 'Spindle RMS (VS-MC04-01)',
          shadeLabel: 'Above the limit 03:40–05:50'
        },
        events: [
          { time: '01:10', end: '01:30', text: 'End of OF 4100861 (flanges) and changeover to cylinder heads', tone: 'brand', tag: 'MC-04' },
          { time: '01:30', text: 'Start of batch CUL-2609-118 (OF 4100872, 120 cylinder heads): first-off part conforming on CMM-1', tone: 'ok', tag: 'CMM-1' },
          { time: '02:35', text: 'IIoT Vibración detects a rising trend in the spindle’s 1–3 kHz band', tone: 'warn', tag: 'VS-MC04-01' },
          { time: '03:40', text: 'Vibration above 4.5 mm/s RMS (zone D): warning on the night-shift operator panel', tone: 'crit', tag: 'MC-04' },
          { time: '04:10', text: 'Tool change T12 (Ø 63 face mill): vibration does not drop', tone: 'warn', tag: 'MC-04' },
          { time: '05:00', text: 'Exceeds the 7.1 mm/s RMS critical level', tone: 'crit', tag: 'MC-04' },
          { time: '05:32', text: 'Instantaneous peak of 8.4 mm/s RMS', tone: 'crit', tag: 'VS-MC04-01' },
          { time: '05:50', text: 'Alarm ALM-MC04-0550: 130 min above the limit; escalated to the Maintenance manager', tone: 'crit', tag: 'ALM-MC04-0550' }
        ],
        cause: 'Hypothesis for Maintenance to confirm: wear of the front spindle bearing. The spectrum is dominated by the ball pass frequency of the outer race (BPFO) and the spindle has run 11,840 h since its last repair. The 04:10 tool change did not reduce the vibration, which rules out tool imbalance.',
        system: 'IIoT Vibración',
        footer: 'Mean RMS every 5 min · the 8.4 mm/s peak is instantaneous'
      },
      parte: {
        agent: AGENT,
        title: 'Daily equipment report',
        sub: '06:00 readings · 14 assets at the Zaragoza plant · plant thresholds',
        colItem: 'Asset',
        systems: ['MES Opcenter', 'IIoT Vibración'],
        inboxTitle: 'Daily equipment report · 06:00 readings',
        inboxCount: '14 assets',
        inboxPending: '2 critical (MC-04 and test bench BP-1) and 4 warnings awaiting review.',
        items,
        news,
        updates,
        steps: [
          { agent: AGENT, system: 'MES Opcenter', action: 'Reads the 06:00 readings for 14 assets (machining, assembly, testing, painting and utilities)', result: '14 readings received, no gaps', ms: 610 },
          { agent: AGENT, system: 'IIoT Vibración', action: 'Queries spindle and headstock vibration (MC-01 to MC-04 and TOR-01) over the last 6 h', result: 'MC-04 at 7.8 mm/s RMS (zone D since 03:40); the rest between 1.6 and 2.4 mm/s', ms: 540, tone: 'crit' },
          { agent: AGENT, system: 'Agentic Platform', action: 'Compares each reading with its plant thresholds (8 indicators)', result: '2 critical · 4 warnings · 8 without incidents', ms: 60, tone: 'crit' },
          { agent: AGENT, system: 'MES Opcenter', action: 'Cross-checks the MC-04 vibration window against the production orders', result: 'OF 4100872: 42 cylinder heads from batch CUL-2609-118 machined between 03:40 and 05:50', ms: 420, tone: 'warn' },
          { agent: AGENT, system: 'SAP S/4HANA', action: 'Reviews the BP-1 and BP-2 test results in QM', result: 'BP-1: weeping on PH250-26-0476 and PH250-26-0478 (MON-2608-11)', ms: 380, tone: 'crit' },
          { agent: AGENT, system: 'PLM Windchill', action: 'Opens the bill of materials of the two weeping presses', result: 'Main cylinder seals from batch JNT-2607-031 · Sellados Ibéricos, S.A.', ms: 330 },
          { agent: AGENT, system: 'Salesforce Service', action: 'Cross-checks the alerts against open after-sales cases', result: 'Oil leak on PH250-26-0412 (REC-2026-0187, Prensas y Servicios del Norte): same seal batch', ms: 360, tone: 'warn' },
          { agent: AGENT, system: 'GMAO Maximo', action: 'Looks for open orders on the assets with alerts', result: 'OT-2026-31688 (COMP-1) and OT-2026-31702 (LM-2) already open', ms: 450 },
          { agent: AGENT, system: 'Modelo de lenguaje', action: 'Drafts the recommended action for each alert (6 calls)', result: '6 drafts, each with its reference procedure (PR-MAN-011, PR-CAL-004, PR-SEG-002)', ms: 5800 },
          { agent: AGENT, system: 'GMAO Maximo', action: 'Creates OT-2026-31851 for MC-04 · urgent priority · shutdown', result: 'Created and assigned to the Maintenance manager (the shutdown is pending approval)', ms: 260, tone: 'ok' },
          { agent: AGENT, system: 'SAP S/4HANA', action: 'Raises non-conformance NC-2026-0234 for BP-1 · high priority', result: 'Created and assigned to Quality and to Purchasing · supplier quality', ms: 290, tone: 'ok' },
          { agent: AGENT, system: 'GMAO Maximo', action: 'Creates OT-2026-31852 for RECT-01 · medium priority', result: 'Created and assigned to Mechanical maintenance', ms: 230, tone: 'ok' },
          { agent: AGENT, system: 'GMAO Maximo', action: 'Creates OT-2026-31853 for CP-1 · medium priority', result: 'Created and assigned to Electrical maintenance', ms: 230, tone: 'ok' },
          { agent: AGENT, system: 'GMAO Maximo', action: 'Updates OT-2026-31688 (COMP-1 dryer) with today’s reading', result: 'Reading added · high priority proposed · no duplicate order', ms: 210 },
          { agent: AGENT, system: 'GMAO Maximo', action: 'Updates OT-2026-31702 (LM-2 nutrunner) with today’s rate', result: 'Reading added · no duplicate order', ms: 210 },
          { agent: AGENT, system: 'Microsoft Teams', action: 'Posts the summary to the “Maintenance · Zaragoza plant” channel', result: 'Sent: 2 critical, 4 warnings and 4 tickets', ms: 400, tone: 'ok' }
        ],
        stats: [
          { label: 'Assets reviewed', value: 14 },
          { label: 'Tickets created', value: 4, tone: 'ok' },
          { label: 'Orders updated, not duplicated', value: 2 },
          { label: 'Cylinder heads for 100% metrology', value: 42, tone: 'crit' }
        ],
        relation: {
          title: 'Possible link to complaint REC-2026-0187',
          body: 'Bench BP-1 has found weeping at the main cylinder of two PH-250 presses from assembly MON-2608-11 (PH250-26-0476 and PH250-26-0478). According to PLM Windchill, both carry seals from batch JNT-2607-031 from Sellados Ibéricos, the same batch as press PH250-26-0412, whose oil leak the distributor in Bilbao is complaining about.',
          more: 'With 23 units from the batch in the field, PR-POS-005 requires a field campaign to be assessed. To be confirmed by Quality and After-sales.',
          plain: 'BP-1 found weeping on two PH-250 presses from MON-2608-11 (PH250-26-0476 and PH250-26-0478) with seals from batch JNT-2607-031, the same as press PH250-26-0412 in the complaint from Prensas y Servicios del Norte. With 23 units from the batch in the field, PR-POS-005 requires a campaign to be assessed. To be confirmed by Quality and After-sales.',
          go: 'reclamacion',
          goLabel: 'Open the complaint'
        },
        policy: 'Policy applied: maintenance work orders and non-conformances are created without prior approval; stopping a machine, blocking parts in SAP QM or reassigning a production order requires approval from the Maintenance manager or Quality (PR-CAL-004).',
        channel: 'Maintenance · Zaragoza plant',
        resultSummary: '3 work orders created in GMAO Maximo, 1 non-conformance in SAP QM, 2 existing orders updated and summary posted in Microsoft Teams.',
        auditRequest: 'Zaragoza plant · 06:00 readings · 14 assets',
        auditNew: 'Ticket created',
        auditUpdate: 'Maintenance work order updated',
        reportTitle: 'Daily equipment report · Zaragoza plant',
        reportCode: 'PD-PLAZA-20260929',
        reportMeta: [['Plant', 'Zaragoza (PLAZA)'], ['Shift', 'Morning'], ['Assets reviewed', '14'], ['Critical · warnings', '2 · 4']],
        reportSummary: 'Of the 14 assets reviewed, 2 are critical and 4 are in warning. Machining centre MC-04 has been vibrating in zone D since 03:40 and machined 42 cylinder heads from batch CUL-2609-118 in that window. Bench BP-1 has detected weeping on two PH-250 presses with seals from batch JNT-2607-031. 3 maintenance work orders and 1 non-conformance have been created, and 2 existing orders have been updated rather than duplicated.',
        signatures: [{ role: 'Plant manager', note: 'Reviewed' }, { role: 'Maintenance manager', note: 'Received' }]
      },
      presenter: {
        say: [
          'This is how the plant manager in Zaragoza starts the shift: everything that needs a decision, in a single inbox.',
          'The data comes from their systems: vibration from IIoT, orders from Opcenter, batches and quality from SAP, work orders from Maximo and cases from Salesforce. Here it is synthetic, but consistent throughout.',
          'The map summarises the plant at a glance: grey is normal, colour is what needs attention. MC-04 is red; click it to see the production order and the 42 affected cylinder heads.',
          'Three issues: the MC-04 vibration at 05:50 (42 cylinder heads from batch CUL-2609-118), the oil leak on a PH-250 reported by a distributor in Bilbao, and the report with 2 critical items.'
        ],
        sayBefore: ['Generate daily report: it reviews 14 assets, does not duplicate open orders and creates the tickets. Watch the timing.'],
        sayAfter: [
          'The link Agentic Platform finds: the two weeping presses on bench BP-1 carry seals from the same batch as the press in the complaint. Nobody had to cross-check SAP, Windchill and Salesforce.',
          'And no duplicates: two orders that were already open are updated instead of opening new tickets.'
        ],
        next: 'Click “Generate daily report” and talk through the log while it runs.',
        nextAfter: 'Go to “From words to workflow” (right arrow) to build the response to the MC-04 alarm from the written procedure.'
      }
    };
  })()
});
