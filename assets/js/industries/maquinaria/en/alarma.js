/* Hidromec Ebro · alarm with approval: spindle vibration on machining centre MC-04 (English).
 * Fictitious company; synthetic demonstration data (MFM). The functions receive the scene context H
 * (W workflow, C evaluated condition, sc current scope, ids generated on approval, fmt, fv, pl…). */
(function () {
  'use strict';

  /* Spindle RMS vibration (VS-MC04-01), one reading every 4 min. */
  const V = [
    ['03:20', 2.3], ['03:24', 2.4], ['03:28', 2.2], ['03:32', 2.6], ['03:36', 3.8], ['03:40', 4.7], ['03:44', 4.9],
    ['03:48', 5.0], ['03:52', 5.2], ['03:56', 5.3], ['04:00', 5.5], ['04:04', 5.6], ['04:08', 5.8], ['04:12', 5.9],
    ['04:16', 6.0], ['04:20', 6.2], ['04:24', 6.3], ['04:28', 6.4], ['04:32', 6.6], ['04:36', 6.7], ['04:40', 6.8],
    ['04:44', 6.9], ['04:48', 7.0], ['04:52', 7.3], ['04:56', 7.4], ['05:00', 7.6], ['05:04', 7.7], ['05:08', 7.9],
    ['05:12', 8.0], ['05:16', 8.1], ['05:20', 8.2], ['05:24', 8.3], ['05:28', 8.3], ['05:32', 8.4], ['05:36', 8.1],
    ['05:40', 7.9], ['05:44', 7.9], ['05:48', 7.8], ['05:52', 0.6], ['05:56', 0.4], ['06:00', 0.4], ['06:04', 0.4],
    ['06:08', 0.3], ['06:12', 0.4], ['06:16', 0.4], ['06:20', 0.4]
  ].map(([time, value]) => ({ time, value }));

  /* 42 cylinder heads from the 03:40–05:52 window (serial no. 55–96 of batch CUL-2609-118), by container. */
  const CONT = [
    { id: 'CUL-118-C1', from: 55, to: 65, start: 3 * 60 + 40, loc: 'WIP store AI-2 · slot 14' },
    { id: 'CUL-118-C2', from: 66, to: 76, start: 4 * 60 + 18, loc: 'Washer LV-01' },
    { id: 'CUL-118-C3', from: 77, to: 86, start: 4 * 60 + 56, loc: 'CMM-01 metrology queue' },
    { id: 'CUL-118-C4', from: 87, to: 96, start: 5 * 60 + 24, loc: 'MC-04 outfeed' }
  ];
  const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  const UNITS = [];
  CONT.forEach((c) => {
    for (let n = c.from; n <= c.to; n += 1) {
      UNITS.push({ item: c.id, serial: `CUL250-26-118-${String(n).padStart(3, '0')}`, n, time: hhmm(c.start + (n - c.from) * 3 + 2), loc: c.loc, of: '4100872' });
    }
  });

  const COST = 412;
  const ROLE = {
    maintenance: 'Maintenance manager', quality: 'Quality manager', quality_shift: 'Shift quality technician',
    production: 'Production manager', decider: 'Plant manager'
  };
  const TEAMS = 'Maintenance · Zaragoza plant';

  agenticPackEn('maquinaria', {
    alarma: {
      nav: 'MC-04 alarm',
      title: 'MC-04 alarm in progress',
      icon: 'activity',
      page_title: 'MC-04 centre · spindle vibration',
      alarm_id: 'ALM-MC04-0550',
      alarm_time: '05:50',
      source_system: 'IIoT Vibración',
      asset: 'MC-04',
      location: 'Zaragoza plant · Machining bay',
      excursion_noun: 'anomaly',
      workflow_topic: 'vibration monitoring',
      policy_ref: 'PR-MAN-011',
      procedures: 'PR-MAN-011 · PR-CAL-004 · PR-SEG-002',
      decider_short: 'Maintenance',
      approval_node: 'Maintenance approval',
      measure: { short: 'spindle vibration', col: 'RMS vibration', unit: 'mm/s', dec: 1, icon: 'activity' },
      setpoint: 2.3,
      setpoint_label: 'baseline',
      limit: 4.5,
      critical: 7.1,
      min_minutes: 30,
      interval_min: 4,
      series: V,
      peak: 8.4,
      peak_time: '05:32',
      current: 0.4,
      current_time: '06:20',
      current_note: 'spindle stopped since 05:52 (feed hold)',
      chart: {
        title: 'MC-04 centre · spindle vibration',
        sub: 'Baseline 2.3 mm/s · now 0.4 mm/s (06:20), spindle stopped',
        tab: 'Vibration',
        series_label: 'RMS vibration (VS-MC04-01)',
        yTicks: [0, 2, 4, 6, 8, 10],
        xTicks: ['03:30', '04:00', '04:30', '05:00', '05:30', '06:00']
      },
      event_kv: [
        ['Machine', 'MC-04 · DMG Mori DMU 65 monoBLOCK · machining bay'],
        ['Sensor', 'VS-MC04-01 · accelerometer on the spindle head · RMS 10–1,000 Hz, one reading every 4 min'],
        ['Part on the machine', 'CUL-250 cylinder head · batch CUL-2609-118 · OF 4100872, operation 30'],
        ['Equipment', '18,000 rpm HSK-A63 spindle · angular contact front bearing']
      ],
      events: [
        { time: '03:36', text: 'Tool change T12 (Ø80 face mill) in the cylinder head cycle', equipment: 'MC-04', tone: 'brand' },
        { time: '03:40', end: '05:52', text: 'IIoT Vibración level 1 warning: above 4.5 mm/s (ISO 10816-3 zone D); the machine keeps cutting', ref: 'AV-MC04-0340', tone: 'warn', band: '42 cylinder heads under high vibration', bandTone: 'warn' },
        { time: '03:44', text: 'The night operator acknowledges the warning on the HMI and continues the cycle', equipment: 'HMI MC-04', tone: 'warn' },
        { time: '04:52', text: 'Vibration exceeds 7.1 mm/s, the PR-MAN-011 stop limit', tone: 'crit', ref: 'PR-MAN-011' },
        { time: '05:04', end: '05:52', text: 'Front bearing temperature above 55 °C (61 °C at 05:32)', equipment: 'Spindle', tone: 'warn', band: 'Front bearing > 55 °C' },
        { time: '05:32', text: 'Peak of 8.4 mm/s; the spectrum shows the outer race defect frequency (BPFO)', equipment: 'VS-MC04-01', tone: 'crit' },
        { time: '05:50', text: 'Alarm ALM-MC04-0550: 60 consecutive min above 7.1 mm/s', ref: 'ALM-MC04-0550', tone: 'crit' },
        { time: '05:52', text: 'The operator puts MC-04 into feed hold; spindle stopped', equipment: 'MC-04', tone: 'ok' }
      ],
      probable_cause: 'Wear or loss of preload in the front spindle bearing: the outer race defect frequency (BPFO) has appeared in the spectrum since 03:40 and the bearing reached 61 °C. The T12 cutter change at 03:36 may have added imbalance. To be confirmed by Maintenance with spectral analysis, an axial play test and an inspection of the HSK taper.',
      backup: { id: 'wf-vibracion-respaldo', name: 'Abnormal vibration on machining centres', version: 'v1', threshold: 4.5, minutes: 30, critical: 7.1, approver: ROLE.maintenance },
      untouched: 'SAP QM, Maximo, SAP PP or Teams',
      apply_systems: 'SAP QM, Opcenter, Maximo, SAP PP and Teams',
      llm_cost_usd: 0.05,
      ids: [
        { key: 'blq', prefix: 'QM-2026-', start: 3318, label: 'Quality block' },
        { key: 'ot', prefix: 'OT-2026-', start: 58213, label: 'Work order' },
        { key: 'nc', prefix: 'NC-2026-', start: 214, label: 'Non-conformance' }
      ],
      block_id_key: 'blq',
      proposer: 'cal',
      lanes: [
        { id: 'mon', name: 'Condition monitor', short: 'Monitor', icon: 'activity', systems: ['IIoT Vibración'], idle: 'Confirms the anomaly with the sensor readings', gsub: 'confirms the anomaly', gsys: ['IIoT Vibración'] },
        { id: 'traz', name: 'Part traceability', short: 'Traceability', icon: 'git-branch', systems: ['MES Opcenter', 'SAP S/4HANA'], idle: 'Locates parts, batch and orders', gsub: 'parts, batch and orders', gsys: ['Opcenter', 'SAP'] },
        { id: 'cal', phase: 2, name: 'Quality', icon: 'lock', systems: ['SAP QM', 'MES Opcenter'], idle: 'Prepares the block and requests approval', gsub: 'QM block, metrology and 8D', gsys: ['SAP QM', 'Opcenter'] },
        { id: 'man', phase: 2, name: 'Maintenance', icon: 'wrench', systems: ['GMAO Maximo', 'Microsoft Teams'], idle: 'Opens the shutdown work order and alerts the technician', gsub: 'work order, LOTO and alert', gsys: ['Maximo', 'Teams'] },
        { id: 'pla', phase: 2, name: 'Planning', icon: 'calendar', systems: ['SAP S/4HANA', 'MES Opcenter'], idle: 'Reassigns the production order to another centre', gsub: 'reassigns the order to MC-02', gsys: ['SAP PP', 'Opcenter'] }
      ],
      steps: {
        p1: (H) => {
          const a = H.all;
          return [
            { lane: 'mon', system: 'IIoT Vibración', verb: 'Querying', action: 'Reads sensor VS-MC04-01 from 03:20 to 06:20, one reading every 4 min', result: `${V.length} readings, no gaps · now 0.4 mm/s (06:20), spindle stopped since 05:52`, ms: 1850, set: { volume: `${V.length} vibration readings` } },
            { lane: 'mon', system: 'Agentic Platform', eval: true, ms: 90 },
            { lane: 'mon', system: 'IIoT Vibración', verb: 'Querying', action: 'Cross-checks the anomaly against the spectrum and the front bearing temperature', result: 'Outer race defect frequency (BPFO) marked since 03:40 and bearing at 61 °C: hypothesis for Maintenance', tone: 'warn', ms: 1400, set: { volume: `${V.length} readings · spectrum · temperature`, result: `Anomaly confirmed: ${H.C.above} min above · peak 8.4 mm/s` } },
            { lane: 'traz', system: 'MES Opcenter', verb: 'Querying', action: `Lists the parts machined on MC-04 between ${H.C.start} and ${H.C.end}`, result: `${a.count} serialised cylinder heads in ${a.items.length} containers`, ms: 2100, set: { volume: `${a.count} serial numbers` } },
            { lane: 'traz', system: 'SAP S/4HANA', verb: 'Querying', action: 'Resolves batch, order and material for each serial number', result: `Batch CUL-2609-118 · OF 4100872 (operation 30) · ${H.fmt.eur(a.value)} at standard cost`, ms: 2400, set: { volume: `${a.count} cylinder heads · 1 batch · 1 production order` }, reveal: 'lots' },
            { lane: 'traz', system: 'MES Opcenter', verb: 'Querying', action: 'Looks for parts from the same batch outside the anomaly window', result: `${a.elseTotal} cylinder heads machined before 03:40 in AI-2 and CMM-01, to be assessed · ${H.goneTotal} had already left before the alarm`, ms: 1700, reveal: 'map' },
            { lane: 'traz', system: 'SAP S/4HANA', verb: 'Querying', action: 'Checks the orders and shipments that consume those cylinder heads', result: `${a.holds.length} orders and shipments; the first, ${H.first.id}, at ${H.first.time} on ${H.first.where.toLowerCase()}`, tone: 'warn', ms: 2200, set: { volume: `${a.count} cylinder heads · ${a.holds.length} orders and shipments`, result: `First affected operation at ${H.first.time}` }, milestone: 'traz', audit: { action: 'Parts and orders identified', detail: `${a.count} cylinder heads from batch CUL-2609-118 in ${a.items.length} containers · ${a.holds.length} downstream orders and shipments · ${a.elseTotal} cylinder heads from the same batch to be assessed` } },
            { lane: 'cal', node: 'apr', system: 'Procedimientos', verb: 'Analysing', action: 'Applies PR-MAN-011 and PR-CAL-004 to this anomaly', result: 'Stop and inspect the spindle; block the parts from the window and measure 100% on the CMM; only Quality releases', ms: 1300 },
            { lane: 'cal', node: 'apr', system: 'Modelo de lenguaje', verb: 'Drafting', action: 'Drafts the proposal and its rationale with the evidence', result: `Proposal: block ${a.count} cylinder heads, hold ${a.holds.length} orders and shipments, spindle shutdown work order and move OF 4100872 to MC-02`, ms: 6800, set: { volume: `${a.count} cylinder heads · ${a.holds.length} orders` } },
            { lane: 'cal', node: 'apr', system: 'Agentic Platform', verb: 'Evaluating', action: `Requests approval from the ${H.W.approver} before writing to SAP QM, Maximo and SAP PP`, result: 'Awaiting the Maintenance decision', tone: 'warn', ms: 60, wait: 1500, set: { result: 'Proposal sent to Maintenance' }, milestone: 'prop', audit: { action: 'Block and shutdown proposal sent for approval', detail: `${a.count} cylinder heads in ${a.items.length} containers · shutdown work order · OF 4100872 to MC-02 · approver: ${H.W.approver}` } }
          ];
        },
        p2: (H) => {
          const sc = H.sc;
          const ids = H.ids;
          return [
            { lane: 'cal', system: 'SAP QM', verb: 'Applying', action: `Records the quality block on ${sc.count} cylinder heads from batch CUL-2609-118`, result: `${ids.blq} · ${sc.count} serial numbers in “blocked” status`, tone: 'ok', ms: 2300, milestone: 'blq', audit: { action: 'Quality block applied', detail: `${ids.blq} · SAP QM · ${sc.count} cylinder heads in ${sc.items.length} containers` } },
            { lane: 'cal', system: 'MES Opcenter', verb: 'Applying', action: `Holds ${sc.holds.length} orders and shipments and creates the 100% inspection on CMM-01`, result: `${sc.holds.map((h) => h.id).join(', ')} on hold · metrology plan for ${sc.count} cylinder heads`, tone: 'ok', ms: 2000, set: { result: `${ids.blq} applied · ${sc.holds.length} orders and shipments on hold` }, milestone: 'mes', audit: { action: 'Cylinder heads held in the MES', detail: `MES Opcenter · ${sc.count} cylinder heads · ${sc.holds.map((h) => h.id).join(', ')} · 100% inspection on CMM-01` } },
            { lane: 'man', system: 'GMAO Maximo', verb: 'Applying', action: 'Opens the priority 1 corrective work order for the MC-04 spindle', result: `${ids.ot} · LOTO lockout (PR-SEG-002), spectral analysis, axial play and bearings`, tone: 'ok', ms: 1900, set: { volume: '1 priority 1 work order' }, milestone: 'ot', audit: { action: 'Work order opened', detail: `${ids.ot} · GMAO Maximo · MC-04 spindle · priority 1` } },
            { lane: 'pla', system: 'SAP S/4HANA', verb: 'Applying', action: 'Reassigns operation 30 of OF 4100872 to MC-02 (DMU 65, same CNC program)', result: 'OF 4100872: 64 outstanding cylinder heads move to MC-02 from 07:30', tone: 'ok', ms: 2100, set: { volume: '1 production order reassigned' }, milestone: 'pp', audit: { action: 'Production order reassigned', detail: 'SAP PP · OF 4100872, operation 30 · from MC-04 to MC-02 from 07:30' } },
            { lane: 'pla', system: 'MES Opcenter', verb: 'Applying', action: 'Reschedules assembly for OF 4100903 with released cylinder heads from batch CUL-2609-104', result: '08:00 cylinder assembly without delay · 22 cylinder heads from stock', tone: 'ok', ms: 1700, set: { volume: '1 production order reassigned · 1 assembly rescheduled', result: 'OF 4100872 on MC-02 · assembly without delay' } },
            { lane: 'cal', system: 'SAP QM', verb: 'Applying', action: 'Raises the non-conformance with the curve, the spectrum and the serial numbers', result: `${ids.nc} raised (PR-CAL-004)`, tone: 'ok', ms: 1800, set: { volume: '1 non-conformance' }, milestone: 'nc', audit: { action: 'Non-conformance raised', detail: `${ids.nc} · SAP QM · cylinder heads machined under excessive vibration on MC-04` } },
            { lane: 'cal', system: 'Modelo de lenguaje', verb: 'Drafting', action: 'Drafts the 8D (D1–D8) with owners by role', result: '8D draft ready for Quality review', ms: 7600, set: { volume: '1 non-conformance · draft 8D' }, milestone: 'd8', audit: { action: '8D draft written', detail: `${ids.nc} · D1–D8 · pending Quality review` } },
            { lane: 'man', system: 'Microsoft Teams', verb: 'Sending', action: `Alerts the on-call maintenance technician, the ${ROLE.production} and the ${ROLE.quality}`, result: `Alert posted to the “${TEAMS}” channel`, tone: 'ok', ms: 900, wait: 1600, set: { volume: '1 work order · 1 alert', result: `${ids.ot} opened · team alerted` }, milestone: 'teams', audit: { action: 'Alert sent via Microsoft Teams', detail: `On-call technician, ${ROLE.production} and ${ROLE.quality} · “${TEAMS}” channel` } }
          ];
        }
      },
      kpis: (H, held) => [
        { label: 'Cylinder heads machined during the anomaly', value: H.all.count, sub: `${H.all.items.length} containers · batch CUL-2609-118 · OF 4100872`, icon: 'box' },
        { label: 'First affected operation', value: H.first.time, sub: `${H.first.id} · ${H.first.where} · ${H.pl(H.holdCount(H.all, H.first))}${held ? ' · on hold' : ''}`, icon: 'calendar' }
      ],
      scope: {
        icon: 'box',
        unit: ['cylinder head', 'cylinder heads'],
        item_noun: ['container', 'containers'],
        qty_unit: null,
        per_square: 1,
        items: [
          {
            id: 'CUL-118-C1', trace: 'CUL-2609-118', title: 'CUL-250 cylinder heads no. 55–65', sub: 'machined 03:40–04:14', group: 'WIP store AI-2', group_short: 'C1', count: 11, value: 11 * COST, hold: 'OF-4100903', channel: 'cylinder assembly',
            elsewhere: [
              { loc: 'AI-2', count: 18, note: 'no. 37–54 · before 03:40 · to be sample-measured' },
              { loc: 'CMM-01', count: 6, note: 'no. 31–36 · in metrology · conforming' }
            ],
            gone: [
              { id: 'MON-2609-41', date: '2026-09-28', time: '22:10', count: 18, lot: 'CUL-2609-118', to: 'no. 1–18 · CIL-250 cylinder assembly · OF 4100889' },
              { id: 'ENT-26-0911', date: '2026-09-29', time: '01:30', count: 12, lot: 'CUL-2609-118', to: 'no. 19–30 · spare parts for after-sales' }
            ]
          },
          { id: 'CUL-118-C2', trace: 'CUL-2609-118', title: 'CUL-250 cylinder heads no. 66–76', sub: 'machined 04:18–04:52', group: 'Washer LV-01', group_short: 'C2', count: 11, value: 11 * COST, hold: 'OF-4100903', channel: 'cylinder assembly' },
          { id: 'CUL-118-C3', trace: 'CUL-2609-118', title: 'CUL-250 cylinder heads no. 77–86', sub: 'machined 04:56–05:24', group: 'CMM-01 metrology queue', group_short: 'C3', count: 10, value: 10 * COST, hold: 'OF-4100911', channel: 'cylinder assembly' },
          { id: 'CUL-118-C4', trace: 'CUL-2609-118', title: 'CUL-250 cylinder heads no. 87–96', sub: 'machined 05:24–05:52', group: 'MC-04 outfeed', group_short: 'C4', count: 10, value: 10 * COST, hold: 'ENT-26-0918', channel: 'after-sales spare parts' }
        ],
        holds: {
          'OF-4100903': { date: '2026-09-29', time: '08:00', where: 'Assembly line M2', label: 'CIL-250 cylinder assembly' },
          'OF-4100911': { date: '2026-09-29', time: '14:00', where: 'Assembly line M2', label: 'CIL-250 cylinder assembly' },
          'ENT-26-0918': { date: '2026-09-30', time: '09:00', where: 'Dispatch · dock 2', label: 'Spare parts shipment to after-sales' }
        },
        units: UNITS,
        csv_name: 'cylinder-heads-mc04-anomaly',
        csv_cols: [
          { label: 'Container', key: 'item' },
          { label: 'Serial number', key: 'serial', text: true },
          { label: 'Machined at', key: 'time' },
          { label: 'Production order', key: 'of' },
          { label: 'Location', key: 'loc' },
          { label: 'Next operation', value: (r, it) => it.hold }
        ],
        labels: {
          items_title: 'Affected cylinder heads and orders',
          items_systems: 'MES Opcenter and SAP S/4HANA',
          items_where: 'machined on MC-04',
          item_col: 'Container',
          at_col: 'Cylinder heads',
          group_col: 'Location',
          hold_col: 'Next operation',
          else_col: 'Outside the window',
          else_none: 'No parts',
          gone_verb: 'left',
          exposed: 'Suspect',
          blocked: 'Blocked',
          unblocked: 'Not blocked',
          block_noun: 'block',
          block_verb: 'Block',
          hold_verb: 'Hold',
          held: 'On hold',
          holds_label: 'Downstream orders and shipments',
          holds_first: 'the first',
          scope_main: 'Cylinder heads machined on MC-04 during the anomaly',
          else_scope: 'Same batch before 03:40',
          else_decision: 'Sampling',
          map_title: 'Location of the cylinder heads',
          map_sub: 'MES Opcenter · Zaragoza plant',
          zone_title: 'Anomaly window (03:40–05:52) by container',
          zone_sub: '4 containers',
          else_title: 'Same batch outside the window',
          else_sub: 'machined before 03:40 · to be assessed',
          gone_title: 'Batch departures before the alarm',
          legend_exposed: 'Machined during the anomaly',
          legend_else: 'To be assessed by sampling',
          csv_button: 'Download serial numbers (CSV)',
          value_label: 'at standard cost',
          report_scope: 'Scope of the block'
        }
      },
      text: {
        proposal_title: 'block and shutdown proposal',
        stop_without: 'proposing a block or a shutdown',
        activates: 'the block or the shutdown',
        no_proposal: 'no block proposal',
        idle_log: 'The run stops at the approval: nothing is written to SAP QM, Maximo or SAP PP without the Maintenance manager’s decision.',
        approve_action: 'Approves the block and the shutdown',
        scope_short: (H) => `block ${H.pl(H.sc.count)} in ${H.fmt.plural(H.sc.items.length, 'container', 'containers')}, stop the spindle and move OF 4100872 to MC-02`,
        audit_approved: 'Block and shutdown approved',
        audit_approved_detail: (H) => `${H.ids.blq} · ${H.sc.count} cylinder heads in ${H.sc.items.length} containers · ${H.sc.holds.length} orders and shipments on hold · shutdown work order · OF 4100872 to MC-02${H.sc.out.length ? ` · scope edited (without ${H.sc.out.map((l) => l.id).join(', ')})` : ''}`,
        outcome_approved: (H) => `Block ${H.ids.blq} approved · ${H.sc.count} cylinder heads`,
        audit_rejected: 'Block and shutdown rejected',
        outcome_rejected: 'Block rejected · no actions applied',
        toast_done: (H) => `${H.ids.blq} applied · ${H.ids.ot} opened · OF 4100872 on MC-02`,
        presenter_applying: 'After approval: block in SAP QM, hold in Opcenter, work order in Maximo, production order to MC-02 and alert via Teams.',
        reject_nothing: 'no block in SAP QM, no work order in Maximo, no planning change and no Teams alert',
        edit_intro: 'PR-CAL-004 requires every part machined during the anomaly to be blocked.'
      },
      approval: {
        id: 'blq-mc04',
        approve_label: 'Approve block and shutdown',
        policy: 'PR-MAN-011 · PR-CAL-004 · only Quality releases',
        title: (H) => `Block of ${H.sc.count} cylinder heads and shutdown of MC-04`,
        summary: (H) => `Reason: spindle vibration above ${H.fv(H.C.threshold)} for ${H.C.above} min (${H.span}), more than the ${H.C.minutes} min set by ${H.W.backup ? 'PR-MAN-011' : 'the workflow'}${H.critMin ? `, and ${H.critMin} min above ${H.fv(H.crit)}: shutdown zone` : ''}. The cylinder heads machined in the window are blocked until they are 100% measured, and the spindle is inspected before production resumes.`,
        effects: (H) => [
          `SAP QM: quality block on ${H.sc.count} cylinder heads (${H.sc.items.length} containers)`,
          `MES Opcenter: ${H.sc.holds.length} orders and shipments on hold and 100% inspection on CMM-01`,
          'GMAO Maximo: priority 1 corrective work order with LOTO lockout',
          'SAP PP: OF 4100872 moves to MC-02',
          `Microsoft Teams: alert to the on-call technician, the ${ROLE.production} and the ${ROLE.quality}`
        ],
        applied: (H) => [
          `SAP QM: ${H.ids.blq} · ${H.sc.count} cylinder heads blocked · ${H.ids.nc} with draft 8D`,
          `MES Opcenter: ${H.sc.holds.map((h) => h.id).join(', ')} on hold · 100% inspection created`,
          `GMAO Maximo: ${H.ids.ot} · priority 1`,
          'SAP PP: OF 4100872 reassigned to MC-02 from 07:30',
          `Microsoft Teams: alert in “${TEAMS}”`
        ]
      },
      result: {
        title: (H) => `Block ${H.ids.blq} applied, ${H.ids.ot} opened and production order on MC-02`,
        stats: (H) => [
          { label: 'Cylinder heads blocked', value: H.sc.count, tone: 'crit' },
          { label: 'Orders and shipments on hold', value: H.sc.holds.length },
          { label: 'Containers blocked', value: H.sc.items.length },
          { label: 'Cylinder heads to assess by sampling', value: H.sc.elseTotal, tone: 'warn' }
        ],
        tiles: (H) => [
          {
            icon: 'lock', tone: 'crit', title: `Block ${H.ids.blq}`, systems: ['SAP QM', 'MES Opcenter'],
            kv: [
              ['Status', App.chip('blocked')],
              ['Scope', `${H.pl(H.sc.count)} · ${H.fmt.plural(H.sc.items.length, 'container', 'containers')}`],
              ['Value at standard cost', H.fmt.eur(H.sc.value)],
              ['On hold', H.sc.holds.map((h) => h.id).join(', ')],
              ['Released by', `${ROLE.quality} (PR-CAL-004)`]
            ],
            next: 'Next step under PR-CAL-004: measure the cylinder heads 100% on CMM-01 (sealing face flatness, seal housing diameter and Ra roughness).',
            buttons: [{ action: 'csv', label: 'Blocked serial numbers (CSV)' }]
          },
          {
            icon: 'wrench', title: `Work order ${H.ids.ot}`, systems: ['GMAO Maximo', 'SAP S/4HANA'], chip: ['running', 'Priority 1'],
            kv: [
              ['Asset', 'MC-04 · HSK-A63 spindle'],
              ['Type', 'Corrective · machine shutdown'],
              ['Tasks', 'LOTO lockout, spectral analysis, axial play, bearings and HSK taper'],
              ['Assigned to', 'On-call maintenance technician'],
              ['Production', 'OF 4100872 reassigned to MC-02 from 07:30']
            ],
            next: 'MC-04 does not resume production until the work order is closed with a vibration reading below 2.8 mm/s (zone B).'
          },
          {
            icon: 'clipboard', title: `Non-conformance ${H.ids.nc}`, systems: ['SAP QM'], chip: ['draft', 'Draft 8D'],
            items: A8D(H),
            buttons: [{ action: 'report-doc', icon: 'printer', label: 'Download draft 8D (PDF)' }]
          },
          {
            icon: 'send', title: 'Team alert', systems: ['Microsoft Teams'], note: H.run.endAt ? `sent at ${H.fmt.time(H.run.endAt)}` : '',
            message: {
              from: 'Agentic Platform · Maintenance agent', channel: `“${TEAMS}” channel`, at: H.run.endAt ? H.fmt.time(H.run.endAt) : '',
              paras: [
                { to: 'On-call technician', text: `${H.ids.ot}, priority 1, on MC-04, approved by ${H.decision.by}. Lock out per PR-SEG-002 and inspect the front spindle bearing (BPFO in the spectrum, 61 °C at 05:32).` },
                { to: ROLE.production, text: 'OF 4100872 moves to MC-02 from 07:30; the 08:00 assembly goes ahead with cylinder heads from batch CUL-2609-104.' },
                { to: ROLE.quality, text: `${H.ids.blq}: ${H.sc.count} cylinder heads blocked; on hold: ${H.sc.holds.map((h) => `${h.id} (${H.holdWhen(h)})`).join(', ')}. Details in ${H.ids.nc}.` }
              ]
            }
          }
        ]
      },
      doc: {
        code: 'REG-CAL-008-11',
        lane: 'cal',
        heading: 'Disciplines D1–D8',
        title: (H) => `8D report · ${H.ids.nc}`,
        subtitle: 'Non-conformance for machining under excessive spindle vibration on MC-04 · draft for review',
        filename: (H) => `draft-8d-${H.ids.nc}`,
        meta: (H) => [['Non-conformance', H.ids.nc], ['Related block', H.ids.blq], ['Work order', H.ids.ot]],
        items: (H) => A8D(H),
        reviewer: ROLE.quality,
        approver: ROLE.decider,
        note: 'Draft generated from the evidence gathered during the run. Target dates are a proposal: the 8D team confirms them. The root cause remains a hypothesis until Maintenance closes the work order with the bearing analysis.'
      },
      report: {
        noun: 'incident report',
        code: 'REG-MAN-011-04',
        title: 'Incident report · MC-04 centre',
        subtitle: 'Excessive spindle vibration',
        filename: 'incident-report-mc04',
        site_label: 'Plant',
        site: 'Zaragoza plant (PLAZA)',
        description: (H) => `On 29/09/2026 at ${'05:50'} IIoT Vibración raised alarm ALM-MC04-0550 on machining centre MC-04 (DMG Mori DMU 65). Spindle vibration (sensor VS-MC04-01) stayed above ${H.fv(H.C.threshold)} for ${H.C.above} min (${H.span}), with a peak of 8.4 mm/s at 05:32 and ${H.critMin} min above ${H.fv(H.crit)}. ${H.all.count} CUL-250 cylinder heads from batch CUL-2609-118 (OF 4100872) were machined in the window. The operator put the machine into feed hold at 05:52.`,
        criteria: 'PR-MAN-011 (stop and inspect the spindle if vibration exceeds 4.5 mm/s for more than 30 min; immediate stop above 7.1 mm/s) and PR-CAL-004 (block in SAP QM the parts produced during the anomaly; only Quality releases).',
        actions: (H) => [
          `SAP QM · ${H.ids.blq}: quality block on ${H.sc.count} cylinder heads in ${H.sc.items.length} containers (${H.fmt.eur(H.sc.value)} at standard cost).`,
          `MES Opcenter: on hold ${H.sc.holds.map((h) => `${h.id} (${H.holdWhen(h)}, ${h.where})`).join(', ')}; 100% inspection on CMM-01.`,
          `GMAO Maximo · ${H.ids.ot}: priority 1 corrective work order with LOTO lockout (PR-SEG-002).`,
          'SAP PP: operation 30 of OF 4100872 reassigned to MC-02; assembly for OF 4100903 rescheduled with cylinder heads from batch CUL-2609-104.',
          `SAP QM · ${H.ids.nc}: non-conformance raised with draft 8D (REG-CAL-008-11).`,
          `Microsoft Teams: alert to the on-call technician, the ${ROLE.production} and the ${ROLE.quality} in “${TEAMS}”.`
        ],
        pending: () => [
          'Measure the blocked cylinder heads 100% on CMM-01 and decide by serial number: release, rework or scrap (PR-CAL-004).',
          'Sample 5 cylinder heads from the same batch machined before 03:40 (AI-2) to rule out earlier degradation.',
          'Close the work order with the bearing report and a vibration reading in zone B before MC-04 resumes production.',
          `Release of the cylinder heads: only the ${ROLE.quality} (PR-CAL-004).`
        ],
        reviewer: ROLE.quality,
        final_step: 'Disposition of the cylinder heads',
        final_role: ROLE.quality,
        note: 'Document subject to Quality and Maintenance review; it does not replace the disposition decision for the parts.'
      },
      not_applied: (H) => [
        { sys: 'SAP QM', text: 'No quality block or non-conformance' },
        { sys: 'MES Opcenter', text: `No cylinder heads on hold; the ${H.all.holds.length} orders and shipments remain scheduled` },
        { sys: 'GMAO Maximo', text: 'No work order' },
        { sys: 'SAP S/4HANA', text: 'OF 4100872 remains assigned to MC-04' },
        { sys: 'Microsoft Teams', text: 'No team alert' }
      ],
      compare: [
        { k: 'People involved', today: '3–4: operator, Maintenance, Quality and Planning', now: 'Maintenance reviews and decides; Quality and Planning receive the outcome with the data' },
        { k: 'Systems checked by hand', today: '5–6: IIoT, Opcenter, SAP QM, SAP PP, Maximo and the phone', now: 'None: the agents query 6 systems and every data point goes into the log' },
        { k: 'Steps', today: '10–12 manual steps, with waits between shifts', steps: true },
        { k: 'Time to stop, block and replan', today: '1–3 h (tonight, 2 h 12 min of anomaly without action)', measured: true },
        { k: 'Audit evidence', today: 'Scattered across the HMI, emails and spreadsheets', now: 'Report REG-MAN-011-04, draft 8D and the run’s audit log' }
      ],
      presenter: {
        intro: () => '05:50 alarm on MC-04: the spindle has been vibrating at 7.8 mm/s since 03:40, with a peak of 8.4 at 05:32. 42 cylinder heads from batch CUL-2609-118 came off the machine in the window; the first order that consumes them starts at 08:00.',
        agents: 'Five agents, each with its own system: IIoT for the vibration; Opcenter and SAP for parts and orders; SAP QM for the block; Maximo for the work order; SAP PP to move the production order to MC-02.',
        waiting: (H) => [
          `The ${H.sc.elseTotal} cylinder heads from the same batch machined before 03:40 are marked “to be assessed”: sampling, not blocking. Nothing has been written to SAP QM, Maximo or SAP PP yet.`,
          'You can edit the scope (remove a container, with a reason) or reject: if rejected, nothing is applied and it is recorded in the audit log.'
        ],
        rejected: ['Rejected: nothing has been blocked, and there is no work order or planning change. The reason is recorded in the audit log.', 'The decision always rests with Maintenance; it can be run again at any time.'],
        done: (H) => [
          `Applied after approval: ${H.ids.blq} in SAP QM with ${H.sc.count} cylinder heads, ${H.ids.ot} in Maximo, OF 4100872 on MC-02 and ${H.ids.nc} with the draft 8D.`,
          'The incident report comes out as a controlled document: code, revision, approvals and run log, ready for an ISO 9001 audit.'
        ],
        next: { done: 'Open “Download incident report” and then move on to the complaint (right arrow).', no_trigger: 'Go to “From words to workflow”, set 30 min and run it again.' }
      }
    }
  });

  /* 8D proposed by the Quality agent. */
  function A8D(H) {
    const sc = H.sc;
    return [
      { d: 'D1', t: 'Team', text: `Leader: ${ROLE.quality}. Team: ${ROLE.maintenance}, ${ROLE.production}, ${ROLE.quality_shift} and the machining CNC programmer.`, owner: ROLE.quality, due: '2026-09-29' },
      { d: 'D2', t: 'Problem description', text: `On 29/09/2026 the MC-04 spindle vibration exceeded 4.5 mm/s for ${H.C.above} min (${H.span}), with a peak of 8.4 mm/s at 05:32 and ${H.critMin} min above ${H.fv(H.crit)}. ${H.all.count} CUL-250 cylinder heads from batch CUL-2609-118 (OF 4100872) were machined. The 03:40 warning was acknowledged on the HMI without stopping the machine.`, owner: ROLE.quality, due: '2026-09-29' },
      { d: 'D3', t: 'Containment', text: `${H.ids.blq}: ${sc.count} cylinder heads blocked in SAP QM and ${sc.holds.length} orders and shipments on hold. 100% measurement on CMM-01. MC-04 stopped under ${H.ids.ot}; OF 4100872 on MC-02.`, owner: ROLE.quality_shift, due: '2026-09-29' },
      { d: 'D4', t: 'Root cause (hypothesis)', text: 'Front spindle bearing with an outer race defect (BPFO) and possible imbalance after the T12 cutter change. Non-detection cause: the level 1 warning does not require a stop on the night shift.', owner: ROLE.maintenance, due: '2026-10-01' },
      { d: 'D5', t: 'Proposed corrective actions', text: 'Replace the spindle bearings and check the balancing of T12; turn a level 1 warning sustained for 30 min into an automatic feed hold.', owner: ROLE.maintenance, due: '2026-10-06' },
      { d: 'D6', t: 'Implementation and verification', text: 'Measure vibration after the repair (target < 2.8 mm/s, zone B) and check 5 trial cylinder heads on the CMM before releasing the machine.', owner: ROLE.maintenance, due: '2026-10-08' },
      { d: 'D7', t: 'Prevention', text: 'Extend the automatic vibration stop to MC-01, MC-02 and MC-03 and update PR-MAN-011 and IT-MEC-021 (spindle change).', owner: ROLE.quality, due: '2026-10-16' },
      { d: 'D8', t: 'Closure', text: `Close ${H.ids.nc} after verifying effectiveness and record the disposition of the ${sc.count} cylinder heads by serial number.`, owner: ROLE.quality, due: '2026-10-30' }
    ];
  }
})();
