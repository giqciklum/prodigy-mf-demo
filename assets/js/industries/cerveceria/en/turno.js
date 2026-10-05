/* Cervecera Bardenas · shift summary (scene «turno»), English. Synthetic demo data (MFM). */
agenticPackEn('cerveceria', {
  turno: (function () {
    'use strict';
    const hhmm = (i) => `${String(Math.floor((i * 5) / 60)).padStart(2, '0')}:${String((i * 5) % 60).padStart(2, '0')}`;
    /* Temperature of the fermenting wort in FV-12 (probe TT-FV12-02, mid zone), every 5 min from 00:00 to 05:50. */
    const TEMP = [12.2, 12.2, 12.3, 12.3, 12.4, 12.4, 12.4, 12.5, 12.6, 12.6, 12.6, 12.7, 12.7, 12.8, 12.8, 12.8, 12.9, 12.9, 13.0, 13.0,
      13.1, 13.1, 13.2, 13.2, 13.2, 13.3, 13.3, 13.4, 13.4, 13.4, 13.6, 13.6, 13.7, 13.9, 13.9, 14.0, 14.1, 14.2, 14.3, 14.5, 14.5,
      14.7, 14.8, 14.9, 15.1, 15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 15.7, 15.8, 15.9, 16.0, 16.2, 16.3, 16.4, 16.5, 16.6, 16.7, 16.8,
      16.9, 17.0, 17.1, 17.0, 17.0, 16.9, 16.8, 16.8, 16.8];
    const AGENT = 'Daily brewery report';

    const items = [
      { code: 'FV-12', name: 'Fermentation vessel FV-12 · Bardenas Lager', tag: 'Quality CCP', area: 'Fermentation cellar', metric: 'fermentation temperature', reading: '16.8 °C', baseline: '12.0 °C', limits: 'warning > 13.5 · critical > 15 °C', status: 'critical',
        note: 'Batch L2609-FV12 (480 hl, day 3). Above 13.5 °C since 02:30 because glycol valve VG-12 is stuck; peak of 17.1 °C at 05:20.' },
      { code: 'LLB-1', name: 'Keg filler LLB-1', tag: 'Oxidation', area: 'Packaging · kegs', metric: 'dissolved oxygen in keg', reading: '78 ppb', baseline: '≤ 50 ppb', limits: 'warning > 50 · critical > 70 ppb', status: 'critical',
        note: 'High O₂ in yesterday\'s kegs (filling head 3). On 18/08, when LLB-1 filled batch L2608-K14, the record already showed 64 ppb.' },
      { code: 'GLY-1', name: 'Glycol plant GLY-1', area: 'Utilities · refrigeration', metric: 'glycol supply temperature', reading: '−2.1 °C', baseline: '−4.0 °C', limits: 'warning > −3 · critical > −1 °C', status: 'warning',
        note: 'Compressor 2 is down for maintenance and the cooling load from the cellar in high krausen is heavy; not directly related to VG-12.' },
      { code: 'IBV', name: 'Empty bottle inspector IBV-1', tag: 'Glass', area: 'Packaging · bottle line LB-1', metric: 'rejected bottles', reading: '1.9%', baseline: '0.6%', limits: 'warning > 1.2 · critical > 3%', status: 'warning',
        note: 'More rejects for chipped finishes from glass lot VID-2609-03; PR-ENV-002 requires checking for breakage at the depalletiser.' },
      { code: 'LB-1', name: 'Bottle line LB-1', area: 'Packaging · bottles', metric: 'night shift OEE', reading: '71%', baseline: '82%', limits: 'warning < 75 · critical < 60%', status: 'warning',
        note: 'Labeller micro-stops; work order OT-2026-4517 is open for worn glue pads.' },
      { code: 'CO2-REC', name: 'CO₂ recovery', area: 'Utilities · CO₂', metric: 'purity of recovered CO₂', reading: '99.93%', baseline: '≥ 99.98%', limits: 'warning < 99.98 · critical < 99.9%', status: 'warning',
        note: 'Activated carbon filter saturated; work order OT-2026-4533 is open. Meanwhile the filler runs on purchased CO₂ (lot CO2-2609-01).' },
      { code: 'FV-10', name: 'Fermentation vessel FV-10 · Bardenas Tostada', area: 'Fermentation cellar', metric: 'fermentation temperature', reading: '13.9 °C', baseline: '14.0 °C', limits: 'warning ± 1.5 · critical ± 3 °C', status: null, note: '' },
      { code: 'FV-11', name: 'Fermentation vessel FV-11 · Bardenas Lager', area: 'Fermentation cellar', metric: 'fermentation temperature', reading: '12.1 °C', baseline: '12.0 °C', limits: 'warning > 13.5 · critical > 15 °C', status: null, note: '' },
      { code: 'FV-14', name: 'Fermentation vessel FV-14 · Bardenas Sin', area: 'Fermentation cellar', metric: 'lagering temperature', reading: '0.4 °C', baseline: '0.0 °C', limits: 'warning > 2 · critical > 4 °C', status: null, note: '' },
      { code: 'BBT-3', name: 'Bright beer tank BBT-3', area: 'Filtration cellar', metric: 'dissolved oxygen', reading: '28 ppb', baseline: '≤ 40 ppb', limits: 'warning > 40 · critical > 60 ppb', status: null, note: '' },
      { code: 'SC-1', name: 'Brewhouse', area: 'Brewing', metric: 'brewhouse yield', reading: '97.8%', baseline: '≥ 97%', limits: 'warning < 96 · critical < 94%', status: null, note: '' },
      { code: 'PAST-1', name: 'Tunnel pasteuriser PAST-1', area: 'Packaging · bottles', metric: 'pasteurisation units', reading: '18 PU', baseline: '15–25 PU', limits: 'warning < 15 or > 30 · critical < 12', status: null, note: '' },
      { code: 'CIP-1', name: 'Cellar CIP station', area: 'Cleaning', metric: 'caustic concentration', reading: '2.1%', baseline: '2.0%', limits: 'warning < 1.8 · critical < 1.5%', status: null, note: '' },
      { code: 'WMS-BAR', name: 'Keg cold store (WMS Mecalux)', area: 'Warehouse and dispatch', metric: 'cold store temperature', reading: '4.2 °C', baseline: '4.0 °C', limits: 'warning > 7 · critical > 10 °C', status: null, note: '' }
    ];

    const news = [
      { id: 'OT-2026-4588', equipment: 'FV-12', priority: 'Urgent · quality', tone: 'crit', owner: 'Maintenance Manager',
        action: 'Inspect and replace the actuator of glycol valve VG-12 (command 100%, position 0%). Meanwhile, keep the manual bypass open. Holding batch L2609-FV12 and requesting diacetyl and acetaldehyde from the LIMS requires the Head Brewer\'s approval (PR-FER-003).' },
      { id: 'NC-2026-0142', equipment: 'LLB-1', priority: 'High · quality', tone: 'crit', owner: 'Quality Manager and Packaging Maintenance',
        action: 'Raise a non-conformance for high dissolved O₂ on LLB-1 (78 ppb; maximum 50). Check the CO₂ purge and the seals on filling head 3 before filling kegs today, and measure O₂ in 5 kegs per head.' },
      { id: 'OT-2026-4589', equipment: 'GLY-1', priority: 'Medium', tone: 'warn', owner: 'Refrigeration Maintenance',
        action: 'Bring forward the return to service of compressor 2 at the glycol plant (supply −2.1 °C; set point −4.0 °C) while the cellar is in high krausen.' },
      { id: 'OT-2026-4590', equipment: 'IBV', priority: 'Medium', tone: 'warn', owner: 'Packaging Manager',
        action: 'Check the depalletiser and the LB-1 guides for chipped finishes on glass lot VID-2609-03 (1.9% rejects) and log the glass incident as per PR-ENV-002.' }
    ];
    const updates = [
      { id: 'OT-2026-4517', equipment: 'LB-1', priority: 'Unchanged', tone: 'warn', owner: 'Packaging Maintenance',
        action: 'Last night\'s OEE (71%) is added to the open order for the labeller glue pads. No duplicate order is created.' },
      { id: 'OT-2026-4533', equipment: 'CO2-REC', priority: 'High (proposed)', tone: 'warn', owner: 'Utilities Maintenance',
        action: 'Today\'s purity (99.93%) is added to the open order for the activated carbon filter and a higher priority is proposed: recovered CO₂ cannot be used on the filler.' }
    ];

    return {
      title: 'Arguedas Brewery · morning shift',
      nav: 'Shift summary',
      clockLabel: 'Brewery time',
      decider: 'Production',
      kpis: [
        { label: 'Wort fermenting in FV-12', value: 480, unit: 'hl', sub: 'Batch L2609-FV12 · Bardenas Lager · day 3', icon: 'flask', tone: 'crit', href: '#alarma' },
        { label: 'Minutes above 13.5 °C', value: 200, sub: 'Since 02:30 · peak of 17.1 °C at 05:20', icon: 'thermometer', href: '#alarma' },
        { label: 'Open complaints', value: 1, sub: 'REC-2026-0093 · reply due by 30/09 12:06', icon: 'mail', href: '#reclamacion' },
        { label: 'Equipment on alert', value: '6 of 14', sub: '2 critical · 4 warnings · 06:00 readings', icon: 'gauge', action: 'scroll-parte' }
      ],
      map: {
        title: 'Brewery map · Arguedas',
        sub: 'Readings from the 06:00 report and the cellar SCADA at 05:50 · click an item to see its details',
        icon: 'factory',
        readonly: 'Agentic Platform reads the cellar SCADA, Brewmaxx, LIMS LabWare and WMS Mecalux; it does not act on valves or set points',
        zones: [
          { id: 'coc', title: 'Brewing', sub: 'Brewhouse', items: [
            { code: 'SC-1', name: 'Brewhouse', reading: '97.8%', status: 'ok', kv: [['Brews yesterday', '6 × 120 hl'], ['Next', 'C-2609-071 · 07:30']] },
            { code: 'MOL-1', name: 'Malt mill', reading: null, status: null, tags: ['MAL-2607-05'], note: 'Silo 2 holds Pilsner malt from lot MAL-2607-05.', kv: [['Silo 2', 'MAL-2607-05 · 38 t']] },
            { code: 'CIP-1', name: 'Cellar CIP', reading: '2.1% NaOH', status: 'ok' }
          ] },
          { id: 'bod', title: 'Cellar', sub: 'Fermentation and lagering', items: [
            { code: 'FV-12', name: 'Lager · day 3', reading: '16.8 °C', status: 'crit', tags: ['L2609-FV12'], go: 'alarma', goLabel: 'Open the alarm',
              note: 'Glycol valve VG-12 stuck closed. Agentic Platform proposes a work order for the valve, holding the batch with diacetyl and acetaldehyde analyses, and rescheduling the racking.',
              kv: [['Batch', 'L2609-FV12 · 480 hl'], ['Above 13.5 °C', 'since 02:30'], ['Peak', '17.1 °C at 05:20'], ['Planned racking', '06/10/2026']] },
            { code: 'FV-10', name: 'Tostada', reading: '13.9 °C', status: 'ok' },
            { code: 'FV-11', name: 'Lager · day 6', reading: '12.1 °C', status: 'ok', note: 'Twin of FV-12 on the same glycol loop: rules out a general fault in the loop.' },
            { code: 'FV-14', name: 'Sin · lagering', reading: '0.4 °C', status: 'ok' },
            { code: 'BBT-3', name: 'Bright beer tank', reading: '28 ppb O₂', status: 'ok', kv: [['Contents', 'Bardenas Lager L2609-FV06 · 410 hl']] }
          ] },
          { id: 'env', title: 'Packaging', sub: 'Bottle and keg', items: [
            { code: 'LLB-1', name: 'Keg filler', reading: '78 ppb O₂', status: 'crit', tags: ['L2608-K14'], go: 'reclamacion', goLabel: 'Open the complaint', note: 'High O₂ on filling head 3. LLB-1 filled batch L2608-K14, the one with the oxidised-tasting kegs.', kv: [['Specification', '≤ 50 ppb'], ['18/08 · L2608-K14', '64 ppb']] },
            { code: 'IBV', name: 'Empty bottle inspector', reading: '1.9% rejects', status: 'warn' },
            { code: 'LB-1', name: 'Bottle line', reading: '71% OEE', status: 'warn', kv: [['Open order', 'OT-2026-4517']] },
            { code: 'PAST-1', name: 'Pasteuriser', reading: '18 PU', status: 'ok' }
          ] },
          { id: 'alm', title: 'Warehouse', sub: 'WMS Mecalux', items: [
            { code: 'WMS-BAR', name: 'Keg cold store', reading: '4.2 °C', status: 'ok', tags: ['L2608-K14'], go: 'retirada', goLabel: 'Recall drill', note: '96 kegs from batch L2608-K14 remain in the warehouse and 32 are on quality hold.', kv: [['L2608-K14 in warehouse', '96 kegs'], ['On hold', '32 kegs']] },
            { code: 'EXP', name: 'Loading bays', reading: '5 loads today', status: null, kv: [['First load', '08:00 · Pamplona']] }
          ] },
          { id: 'srv', title: 'Utilities', sub: 'Refrigeration, CO₂ and steam', items: [
            { code: 'GLY-1', name: 'Glycol plant', reading: '−2.1 °C', status: 'warn', kv: [['Compressor 2', 'Under maintenance']] },
            { code: 'CO2-REC', name: 'CO₂ recovery', reading: '99.93%', status: 'warn', kv: [['Open order', 'OT-2026-4533']] },
            { code: 'CAL-V', name: 'Steam boiler', reading: '9.6 bar', status: null }
          ] }
        ]
      },
      inbox: {
        alarm: {
          icon: 'thermometer',
          title: 'FV-12 · fermentation temperature off set point',
          meta: ['Alarm 05:50 · ALM-FV12-0550'],
          systems: ['SCADA bodega'],
          body: '16.8 °C against a set point of 12 °C (limit 13.5 °C) since 02:30 due to a fault on glycol valve VG-12; peak of 17.1 °C at 05:20. Batch L2609-FV12 of Bardenas Lager, 480 hl, day 3 of fermentation.'
        },
        complaint: {
          icon: 'mail',
          title: 'Complaint REC-2026-0093 · kegs with oxidised flavour',
          meta: ['28/09 12:06', 'Distribuciones Hosteleras Ribera, S.L.', 'Three bars'],
          body: '30 l kegs of Bardenas Lager with a cardboard (oxidised) flavour in three bars. Batch',
          trace: 'L2608-K14',
          after: 'packaged on 18/08/2026. Reply within 48 h.',
          due: 'Due 30/09 12:06',
          goLabel: 'Open complaint'
        }
      },
      chart: {
        title: 'FV-12 · fermentation temperature',
        sub: 'Bardenas Lager · batch L2609-FV12 · set point 12 °C · now 16.8 °C (05:50)',
        icon: 'thermometer',
        tabLabel: 'Temperature',
        chart: {
          series: TEMP.map((v, i) => ({ time: hhmm(i), value: v })),
          unit: '°C',
          threshold: { value: 13.5, label: 'Limit 13.5 °C', legend: 'Limit 13.5 °C · 200 min above' },
          critical: { value: 15, label: 'Critical 15 °C', legend: 'Critical 15 °C · 130 min above' },
          peak: { x: '05:20', y: 17.1 },
          last: false,
          yTicks: [10, 12, 14, 16, 18],
          xTicks: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
          annotations: [{ x: '02:30', label: 'Limit 02:30' }],
          bands: [
            { from: '05:25', to: '05:50', label: 'Manual bypass' }
          ],
          seriesLabel: 'Wort in FV-12 (TT-FV12-02)',
          shadeLabel: 'Above the limit 02:30–05:50'
        },
        events: [
          { time: '23:40', text: 'Glycol valve VG-12 does not confirm opening (command 100%, position 0%); SCADA only logs it as an event', tone: 'warn', tag: 'VG-12' },
          { time: '00:00', text: 'FV-12 at 12.2 °C and rising about 0.5 °C/h: day 3, high krausen', tone: 'brand', tag: 'FV-12' },
          { time: '02:30', text: 'Exceeds 13.5 °C: SCADA warning alarm, acknowledged by the cellar operator', tone: 'crit', tag: 'FV-12' },
          { time: '02:45', text: 'The operator forces VG-12 from SCADA with no response and notes it for the shift handover', tone: 'warn', tag: 'VG-12' },
          { time: '03:40', text: 'Exceeds the critical level of 15 °C', tone: 'crit', tag: 'FV-12' },
          { time: '05:20', text: 'Peak of 17.1 °C', tone: 'crit', tag: 'TT-FV12-02' },
          { time: '05:25', text: 'The operator manually opens the FV-12 glycol bypass: the temperature starts to fall', tone: 'ok', tag: 'VG-12' },
          { time: '05:50', text: 'Alarm ALM-FV12-0550: 200 min above the limit; escalated to the Head Brewer', tone: 'crit', tag: 'ALM-FV12-0550' }
        ],
        cause: 'Hypothesis to be confirmed by Maintenance: the pneumatic actuator of glycol valve VG-12 is stuck closed (command 100%, position 0% since 23:40). On day 3 the yeast gives off peak fermentation heat and, without cooling, the temperature rises. FV-11, on the same loop, is on set point, which rules out a general glycol fault. Quality risk: high diacetyl and acetaldehyde and esters off profile.',
        system: 'SCADA bodega',
        footer: 'Reading every 5 min'
      },
      parte: {
        agent: AGENT,
        title: 'Daily equipment report',
        sub: '06:00 readings · 14 items of equipment at Arguedas Brewery · process thresholds',
        colItem: 'Equipment',
        systems: ['Brewmaxx (MES)', 'SCADA bodega'],
        inboxTitle: 'Daily equipment report · 06:00 readings',
        inboxCount: '14 items of equipment',
        inboxPending: '2 critical (FV-12 and keg filler LLB-1) and 4 warnings pending review.',
        items,
        news,
        updates,
        steps: [
          { agent: AGENT, system: 'Brewmaxx (MES)', action: 'Reads the 06:00 readings for 14 items of equipment (brewhouse, cellar, packaging, warehouse and utilities)', result: '14 readings received, no gaps', ms: 600 },
          { agent: AGENT, system: 'SCADA bodega', action: 'Queries fermentation vessel temperatures, glycol valves and the refrigeration plant', result: 'FV-12 at 16.8 °C with VG-12 not opening since 23:40; FV-11 on set point', ms: 540, tone: 'crit' },
          { agent: AGENT, system: 'Agentic Platform', action: 'Compares each reading with its process thresholds (11 indicators)', result: '2 critical · 4 warnings · 8 with no issues', ms: 60, tone: 'crit' },
          { agent: AGENT, system: 'LIMS LabWare', action: 'Reviews packaging analyses from the last 24 h', result: 'LLB-1: dissolved O₂ of 78 ppb on filling head 3 (specification ≤ 50 ppb)', ms: 450, tone: 'crit' },
          { agent: AGENT, system: 'LIMS LabWare', action: 'Looks up LLB-1 O₂ history for keg batches with complaints', result: 'L2608-K14 (18/08): 64 ppb, out of specification, released under deviation', ms: 470, tone: 'warn' },
          { agent: AGENT, system: 'SAP S/4HANA', action: 'Cross-checks the alerts against open customer complaints', result: 'REC-2026-0093: oxidised flavour in kegs from batch L2608-K14', ms: 360, tone: 'warn' },
          { agent: AGENT, system: 'WMS Mecalux', action: 'Locates the stock of batch L2608-K14', result: '96 kegs in the keg cold store and 32 on quality hold', ms: 330 },
          { agent: AGENT, system: 'GMAO Maximo', action: 'Looks for open orders on the equipment on alert', result: 'OT-2026-4517 (LB-1) and OT-2026-4533 (CO₂) already open', ms: 440 },
          { agent: AGENT, system: 'Modelo de lenguaje', action: 'Drafts the recommended action for each alert (6 calls)', result: '6 drafts, each with its reference procedure (PR-FER-003, PR-ENV-002, APPCC-01)', ms: 5700 },
          { agent: AGENT, system: 'GMAO Maximo', action: 'Creates OT-2026-4588 for FV-12 (valve VG-12) · urgent priority', result: 'Created and assigned to the Maintenance Manager', ms: 250, tone: 'ok' },
          { agent: AGENT, system: 'SAP S/4HANA', action: 'Raises non-conformance NC-2026-0142 for LLB-1 · high priority', result: 'Created and assigned to Quality and Packaging Maintenance', ms: 280, tone: 'ok' },
          { agent: AGENT, system: 'GMAO Maximo', action: 'Creates OT-2026-4589 for GLY-1 · medium priority', result: 'Created and assigned to Refrigeration Maintenance', ms: 220, tone: 'ok' },
          { agent: AGENT, system: 'GMAO Maximo', action: 'Creates OT-2026-4590 for IBV-1 · medium priority', result: 'Created and assigned to the Packaging Manager', ms: 220, tone: 'ok' },
          { agent: AGENT, system: 'GMAO Maximo', action: 'Updates OT-2026-4517 (LB-1 labeller) with last night\'s OEE', result: 'Reading added · no duplicate order', ms: 200 },
          { agent: AGENT, system: 'GMAO Maximo', action: 'Updates OT-2026-4533 (CO₂ filter) with today\'s purity', result: 'Reading added · high priority proposed · no duplicate order', ms: 200 },
          { agent: AGENT, system: 'Microsoft Teams', action: 'Posts the summary to the «Production · Arguedas» channel', result: 'Sent: 2 critical, 4 warnings and 4 tickets', ms: 390, tone: 'ok' }
        ],
        stats: [
          { label: 'Equipment reviewed', value: 14 },
          { label: 'Tickets created', value: 4, tone: 'ok' },
          { label: 'Orders updated, not duplicated', value: 2 },
          { label: 'Hectolitres to hold (proposed)', value: 480, tone: 'crit' }
        ],
        relation: {
          title: 'Possible link to complaint REC-2026-0093',
          body: 'Keg filler LLB-1 is reading 78 ppb of dissolved oxygen on filling head 3 today (specification ≤ 50 ppb). Batch L2608-K14, the one with the cardboard-tasting kegs that Distribuciones Hosteleras Ribera is complaining about, was filled on LLB-1 on 18/08/2026 and its LIMS record already showed 64 ppb: it was released under deviation.',
          more: 'Oxygen pick-up at packaging is the most common cause of cardboard flavour (trans-2-nonenal). PR-CAL-006 requires assessing a recall of the batch (912 kegs at 14 customers). To be confirmed by Quality.',
          plain: 'LLB-1 is reading 78 ppb of O₂ today (specification ≤ 50 ppb). Batch L2608-K14 from complaint REC-2026-0093 was filled on LLB-1 on 18/08/2026 at 64 ppb and released under deviation. Oxygen pick-up at packaging is the most common cause of cardboard flavour. PR-CAL-006 requires assessing a recall of the batch (912 kegs at 14 customers). To be confirmed by Quality.',
          go: 'reclamacion',
          goLabel: 'Open the complaint'
        },
        policy: 'Policy applied: maintenance work orders and non-conformances are created without prior approval; holding a batch, changing the racking plan or recalling product requires approval from the Head Brewer or Quality (PR-FER-003, PR-CAL-006).',
        channel: 'Production · Arguedas',
        resultSummary: '3 work orders created in GMAO Maximo, 1 non-conformance in SAP, 2 existing orders updated and a summary posted to Microsoft Teams.',
        auditRequest: 'Arguedas Brewery · 06:00 readings · 14 items of equipment',
        auditNew: 'Ticket created',
        auditUpdate: 'Maintenance work order updated',
        reportTitle: 'Daily equipment report · Arguedas Brewery',
        reportCode: 'PD-ARG-20260929',
        reportMeta: [['Brewery', 'Arguedas (Navarre)'], ['Shift', 'Morning'], ['Equipment reviewed', '14'], ['Critical · warnings', '2 · 4']],
        reportSummary: 'Of 14 items of equipment reviewed, 2 are critical and 4 are on warning. Fermentation vessel FV-12 (batch L2609-FV12, 480 hl) has been above 13.5 °C since 02:30 because glycol valve VG-12 is stuck. Keg filler LLB-1 shows high dissolved oxygen, the same defect recorded when filling batch L2608-K14 from complaint REC-2026-0093. 3 maintenance work orders and 1 non-conformance have been created, and 2 existing orders have been updated rather than duplicated.',
        signatures: [{ role: 'Production Manager', note: 'Reviewed' }, { role: 'Head Brewer', note: 'Received' }]
      },
      presenter: {
        say: [
          'This is how the Production Manager starts the shift in Arguedas: everything that needs a decision, in a single inbox.',
          'The data comes from her systems: temperatures from the cellar SCADA, batches from Brewmaxx and SAP, analyses from the LIMS, kegs from the WMS and orders from Maximo. Here it is synthetic, but consistent throughout.',
          'The map sums up the brewery at a glance: grey is normal, colour needs attention. FV-12 is red; click it to see the batch, the glycol valve and what Agentic Platform proposes.',
          'Three items: the FV-12 temperature at 05:50 (480 hl of Bardenas Lager on day 3), the complaint about oxidised-tasting kegs and the report with 2 critical items.'
        ],
        sayBefore: ['Generate daily report: it reviews 14 items of equipment, does not duplicate open orders and creates the tickets. Watch the time it takes.'],
        sayAfter: [
          'The link Agentic Platform finds: the keg filler is picking up too much oxygen, and the batch under complaint was filled there at 64 ppb. Nobody had to cross-check the LIMS, SAP and the WMS.',
          'And no duplicates: two orders already open are updated instead of opening new tickets.'
        ],
        next: 'Click «Generate daily report» and talk through the log while it runs.',
        nextAfter: 'Go to «From words to workflow» (right arrow) to build the response to the FV-12 alarm from the written procedure.'
      }
    };
  })()
});
