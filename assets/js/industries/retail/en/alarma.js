/* Mercados Moncayo · alarm with approval: dairy multideck MR-3 at store T-027 above 5 °C (English).
 * Fictitious company; synthetic demo data (MFM). The functions receive the scene context H
 * (W workflow, C evaluated condition, sc current scope, ids generated on approval, fmt, fv, pl…). */
(function () {
  'use strict';

  /* Return-air temperature of the multideck (probe TS-T027-MR3), every 5 min. */
  const KEY = [['03:00', 3.1], ['03:20', 3.3], ['03:40', 4.2], ['03:50', 4.9], ['03:55', 5.3], ['04:30', 6.9], ['04:45', 7.8], ['04:50', 8.1], ['05:20', 9.6], ['05:30', 9.8], ['05:40', 9.6], ['05:50', 9.4], ['06:15', 9.5], ['06:40', 9.6], ['07:00', 9.4]];
  const mins = (t) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
  const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  const SERIES = [];
  for (let m = mins('03:00'); m <= mins('07:00'); m += 5) {
    const i = KEY.findIndex((k) => mins(k[0]) >= m);
    const b = KEY[i];
    const a = KEY[Math.max(0, i - 1)];
    const v = mins(b[0]) === m || i === 0 ? b[1] : a[1] + (b[1] - a[1]) * (m - mins(a[0])) / (mins(b[0]) - mins(a[0]));
    SERIES.push({ time: hhmm(m), value: Math.round(v * 10) / 10 });
  }

  /* Lines in multideck MR-3 by section (318 packs). */
  const REFS = {
    'MR3-T1': [['8437012600114', 'Moncayo natural yoghurt 4 × 125 g', 'Y26258', '2026-10-14', 30], ['8437012600121', 'Moncayo strawberry yoghurt 4 × 125 g', 'Y26258', '2026-10-14', 24], ['8437012600138', 'Moncayo lemon yoghurt 4 × 125 g', 'Y26259', '2026-10-15', 22], ['8437012600145', 'Moncayo sweetened natural yoghurt 4 × 125 g', 'Y26259', '2026-10-15', 20]],
    'MR3-T2': [['8437012600213', 'Moncayo natural Greek yoghurt 4 × 115 g', 'G26255', '2026-10-11', 24], ['8437012600220', 'Moncayo natural bifidus yoghurt 4 × 125 g', 'B26256', '2026-10-12', 22], ['8437012600237', 'Moncayo Greek yoghurt with honey 4 × 115 g', 'G26255', '2026-10-11', 18]],
    'MR3-T3': [['8437012600312', 'Moncayo vanilla custard 4 × 125 g', 'N26254', '2026-10-09', 20], ['8437012600329', 'Moncayo egg flan 4 × 100 g', 'F26253', '2026-10-08', 18], ['8437012600336', 'Moncayo rice pudding 4 × 125 g', 'A26254', '2026-10-09', 12], ['8437012600343', 'Moncayo cuajada (junket) 4 × 125 g', 'C26256', '2026-10-06', 8]],
    'MR3-T4': [['8437012600411', 'Moncayo fresh whole milk 1 l', 'L26270', '2026-10-04', 24], ['8437012600428', 'Moncayo fresh semi-skimmed milk 1 l', 'L26270', '2026-10-04', 12], ['8437012600435', 'Moncayo whipping cream 200 ml', 'NM26249', '2026-10-20', 6]],
    'MR3-T5': [['8437012600510', 'Moncayo Burgos fresh cheese 250 g', 'QB26266', '2026-10-06', 16], ['8437012600527', 'Moncayo ricotta-style requesón 250 g', 'R26265', '2026-10-05', 10], ['8437012600534', 'Moncayo 0 % whipped fresh cheese 500 g', 'QF26261', '2026-10-10', 8]],
    'MR3-T6': [['8437012600619', 'Moncayo fresh puff pastry 275 g', 'H26240', '2026-10-21', 12], ['8437012600626', 'Moncayo freshly squeezed orange juice 1 l', 'Z26271', '2026-10-03', 12]]
  };
  const UNITS = [];
  Object.keys(REFS).forEach((item) => REFS[item].forEach(([ean, product, lot, bb, count]) => UNITS.push({ item, ean, product, lot, bb: bb.split('-').reverse().join('/'), count })));

  const ROLE = {
    quality: 'Head of Quality', quality_shift: 'On-call Quality Technician', store_ops: 'Area Store Manager',
    maintenance: 'Refrigeration Maintenance', store_manager: 'T-027 Store Manager', decider: 'Director of Operations'
  };
  const TEAMS = 'Stores · Huesca area';

  agenticPackEn('retail', {
    alarma: {
      nav: 'T-027 alarm',
      title: 'T-027 alarm in progress',
      icon: 'thermometer',
      page_title: 'Store T-027 · dairy multideck MR-3',
      alarm_id: 'ALM-T027-0550',
      alarm_time: '05:50',
      source_system: 'Sensores de frío',
      asset: 'MR-3 at T-027',
      location: 'T-027 Huesca Centro · sales floor',
      excursion_noun: 'excursion',
      workflow_topic: 'in-store cold chain',
      policy_ref: 'APPCC-TIE-01',
      procedures: 'APPCC-TIE-01 · PR-CAL-010 · IT-TIE-014',
      decider_short: 'Quality',
      approval_node: 'Quality approval',
      measure: { short: 'multideck temperature', col: 'Temperature', unit: '°C', dec: 1, icon: 'thermometer' },
      setpoint: 3,
      setpoint_label: 'set point',
      limit: 5,
      critical: 8,
      min_minutes: 120,
      interval_min: 5,
      series: SERIES,
      peak: 9.8,
      peak_time: '05:30',
      current: 9.4,
      current_time: '07:00',
      current_note: 'evaporator fan stopped; the store opens at 09:00',
      chart: {
        title: 'Multideck MR-3 · air temperature',
        sub: 'Set point 3 °C · now 9.4 °C (07:00)',
        tab: 'Temperature',
        series_label: 'Return air (TS-T027-MR3)',
        yTicks: [0, 2, 4, 6, 8, 10, 12],
        xTicks: ['03:00', '04:00', '05:00', '06:00', '07:00']
      },
      event_kv: [
        ['Multideck', 'MR-3 · dairy and desserts multideck · 6 sections · 318 packs'],
        ['Probe', 'TS-T027-MR3 · return air · reading every 5 min'],
        ['Store', 'T-027 Huesca Centro · closed until 09:00'],
        ['Equipment', 'Evaporator EV-MR3 · fan VF-2 · refrigeration pack CF-T027']
      ],
      events: [
        { time: '03:40', end: '07:00', text: 'Evaporator fan VF-2 stops turning (0 A current draw)', equipment: 'VF-2', tone: 'warn', band: 'Fan VF-2 stopped', bandTone: 'warn' },
        { time: '03:55', text: 'Exceeds 5 °C: level 1 alert to the alarm receiving centre; no staff in the store', ref: 'AV-T027-0355', tone: 'warn' },
        { time: '04:50', text: 'Exceeds 8 °C, the critical limit in APPCC-TIE-01', ref: 'APPCC-TIE-01', tone: 'crit' },
        { time: '05:30', text: 'Return air peaks at 9.8 °C', equipment: 'TS-T027-MR3', tone: 'crit' },
        { time: '05:50', text: 'Alarm ALM-T027-0550: 60 consecutive min above 8 °C', ref: 'ALM-T027-0550', tone: 'crit' },
        { time: '06:05', text: 'The security guard confirms the night blind is down and there is frost on the evaporator', equipment: 'Security', tone: 'brand' },
        { time: '06:40', text: 'The alarm centre calls the on-call refrigeration engineer: expected arrival 08:15', equipment: 'Alarm receiving centre', tone: 'brand' }
      ],
      probable_cause: 'Failure of the fan motor VF-2 on the MR-3 multideck evaporator (0 A since 03:40): with no air circulation the evaporator frosts up and the return air temperature rises. Refrigeration pack CF-T027 and the compressor are running normally. To be confirmed by Refrigeration Maintenance.',
      backup: { id: 'wf-frio-tienda-respaldo', name: 'Cold chain in store multidecks', version: 'v1', threshold: 5, minutes: 120, critical: 8, approver: ROLE.quality },
      untouched: 'POS, SAP, ServiceNow or Teams',
      apply_systems: 'POS, SAP S/4 Retail, ServiceNow and Teams',
      llm_cost_usd: 0.04,
      ids: [
        { key: 'blq', prefix: 'BLV-2026-', start: 731, label: 'Sales block' },
        { key: 'tar', prefix: 'TAR-T027-', start: 312, label: 'Store task' },
        { key: 'ot', prefix: 'INC00', start: 48213, label: 'Refrigeration incident' },
        { key: 'nc', prefix: 'AC-APPCC-2026-', start: 146, label: 'HACCP corrective action' }
      ],
      block_id_key: 'blq',
      proposer: 'cal',
      lanes: [
        { id: 'mon', name: 'Cold-chain monitor', short: 'Monitor', icon: 'thermometer', systems: ['Sensores de frío'], idle: 'Confirms the excursion from the probe readings', gsub: 'confirms the excursion', gsys: ['Sensores de frío'] },
        { id: 'traz', name: 'Product traceability', short: 'Traceability', icon: 'git-branch', systems: ['SAP S/4 Retail', 'TPV tiendas'], idle: 'Finds lines, lots and expected sales', gsub: 'lines, lots and sales', gsys: ['SAP', 'TPV'] },
        { id: 'cal', phase: 2, name: 'Quality', icon: 'lock', systems: ['TPV tiendas', 'SAP S/4 Retail'], idle: 'Prepares the sales block and requests approval', gsub: 'sales block and HACCP', gsys: ['TPV', 'SAP'] },
        { id: 'tie', phase: 2, name: 'Store', icon: 'building', systems: ['Microsoft Teams', 'SAP S/4 Retail'], idle: 'Prepares removal and transfer to the cold room', gsub: 'removal and transfer to cold room', gsys: ['Teams', 'SAP'] },
        { id: 'man', phase: 2, name: 'Refrigeration Maintenance', short: 'Maintenance', icon: 'wrench', systems: ['ServiceNow'], idle: 'Opens the urgent incident for the refrigeration engineer', gsub: 'urgent incident', gsys: ['ServiceNow'] }
      ],
      steps: {
        p1: (H) => {
          const a = H.all;
          return [
            { lane: 'mon', system: 'Sensores de frío', verb: 'Querying', action: 'Reads probe TS-T027-MR3 from 03:00 to 07:00, one reading every 5 min', result: `${SERIES.length} readings, no gaps · now 9.4 °C (07:00)`, ms: 1800, set: { volume: `${SERIES.length} temperature readings` } },
            { lane: 'mon', system: 'Agentic Platform', eval: true, ms: 90 },
            { lane: 'mon', system: 'Sensores de frío', verb: 'Querying', action: 'Cross-checks the excursion against the fan current and refrigeration pack CF-T027', result: 'Fan VF-2 at 0 A since 03:40; pack and compressor running: hypothesis for Refrigeration Maintenance', tone: 'warn', ms: 1400, set: { volume: `${SERIES.length} readings · current draw`, result: `Excursion confirmed: ${H.C.above} min above · peak 9.8 °C` } },
            { lane: 'traz', system: 'SAP S/4 Retail', verb: 'Querying', action: 'Lists the MR-3 planogram range and stock by section', result: `${a.count} packs across ${UNITS.length} lines in ${a.items.length} sections`, ms: 2100, set: { volume: `${UNITS.length} lines` } },
            { lane: 'traz', system: 'SAP S/4 Retail', verb: 'Querying', action: 'Resolves the lot and use-by date of each line', result: `${new Set(UNITS.map((u) => u.lot)).size} Moncayo-brand lots · ${H.fmt.eur(a.value)} at retail price`, ms: 2300, set: { volume: `${a.count} packs · ${UNITS.length} lines` }, reveal: 'lots' },
            { lane: 'traz', system: 'SAP S/4 Retail', verb: 'Querying', action: 'Looks for the same lines outside the multideck', result: `${a.elseTotal} packs in cold room CF-1 and on the 06:30 delivery, within range · ${H.goneTotal} sold before the excursion`, ms: 1700, reveal: 'map' },
            { lane: 'traz', system: 'TPV tiendas', verb: 'Querying', action: 'Checks expected sales and online orders for those lines', result: `${a.holds.length} sales channels; the first, ${H.first.id}, at ${H.first.time}`, tone: 'warn', ms: 1900, set: { volume: `${a.count} packs · ${a.holds.length} channels`, result: `First possible sale at ${H.first.time}` }, milestone: 'traz', audit: { action: 'Products and sales identified', detail: `${a.count} packs across ${UNITS.length} lines in ${a.items.length} MR-3 sections · ${a.holds.length} sales channels · ${a.elseTotal} packs outside the multideck` } },
            { lane: 'cal', node: 'apr', system: 'Procedimientos', verb: 'Analysing', action: 'Applies APPCC-TIE-01 and PR-CAL-010 to this excursion', result: 'Chilled product more than 2 h above 5 °C: block the sale, remove and destroy as waste; only Quality decides exceptions', ms: 1300 },
            { lane: 'cal', node: 'apr', system: 'Modelo de lenguaje', verb: 'Drafting', action: 'Drafts the proposal and its rationale with the evidence', result: `Proposal: block the sale of ${a.count} packs, move them to the waste cold room and open an urgent refrigeration incident`, ms: 6400, set: { volume: `${a.count} packs · ${a.holds.length} channels` } },
            { lane: 'cal', node: 'apr', system: 'Agentic Platform', verb: 'Evaluating', action: `Requests approval from the ${H.W.approver} before writing to the POS, SAP and ServiceNow`, result: 'Awaiting the Quality decision', tone: 'warn', ms: 60, wait: 1500, set: { result: 'Proposal sent to Quality' }, milestone: 'prop', audit: { action: 'Sales block proposal sent for approval', detail: `${a.count} packs in ${a.items.length} MR-3 sections · approver: ${H.W.approver}` } }
          ];
        },
        p2: (H) => {
          const sc = H.sc;
          const ids = H.ids;
          return [
            { lane: 'cal', system: 'TPV tiendas', verb: 'Applying', action: `Blocks the sale at the T-027 tills of the ${sc.items.reduce((s, x) => s + REFS[x.id].length, 0)} exposed lines`, result: `${ids.blq} · the POS rejects the scan with the message “Product withdrawn by Quality”`, tone: 'ok', ms: 2000, milestone: 'blq', audit: { action: 'Sale blocked at the POS', detail: `${ids.blq} · T-027 POS · ${sc.count} packs in ${sc.items.length} sections` } },
            { lane: 'cal', system: 'SAP S/4 Retail', verb: 'Applying', action: 'Removes the lines from online orders and from available stock', result: `${sc.holds.map((h) => h.id).join(', ')} without those lines · stock set to “quality blocked”`, tone: 'ok', ms: 1900, set: { result: `${ids.blq} applied · ${sc.holds.length} channels free of exposed product` }, milestone: 'sap', audit: { action: 'Stock blocked in SAP', detail: `SAP S/4 Retail · ${sc.count} packs · ${sc.holds.map((h) => h.id).join(', ')}` } },
            { lane: 'tie', system: 'Microsoft Teams', verb: 'Applying', action: `Assigns the removal task to the ${ROLE.store_manager} before opening`, result: `${ids.tar} · move ${sc.count} packs to the waste cold room and restock from CF-1 before 08:45`, tone: 'ok', ms: 1600, set: { volume: '1 store task' }, milestone: 'tar', audit: { action: 'Removal task assigned', detail: `${ids.tar} · Microsoft Teams · ${ROLE.store_manager} · before 08:45` } },
            { lane: 'tie', system: 'SAP S/4 Retail', verb: 'Applying', action: 'Prepares the cold-chain-break write-off and the urgent replenishment order', result: `Write-off of ${H.fmt.eur(sc.value)} to be confirmed on weighing · replenishment on the 11:00 delivery`, tone: 'ok', ms: 1800, set: { volume: '1 task · 1 write-off · 1 replenishment', result: `${ids.tar} assigned · replenishment at 11:00` } },
            { lane: 'man', system: 'ServiceNow', verb: 'Applying', action: 'Opens the urgent incident for the refrigeration engineer with the curve and the fan current', result: `${ids.ot} · priority 1 · replace fan motor VF-2 · arrival 08:15`, tone: 'ok', ms: 1700, set: { volume: '1 priority 1 incident' }, milestone: 'ot', audit: { action: 'Refrigeration incident opened', detail: `${ids.ot} · ServiceNow · multideck MR-3 at T-027 · priority 1` } },
            { lane: 'cal', system: 'SAP S/4 Retail', verb: 'Applying', action: 'Records the HACCP corrective action with the curve and the lines removed', result: `${ids.nc} opened (APPCC-TIE-01)`, tone: 'ok', ms: 1500, set: { volume: '1 corrective action' }, milestone: 'nc', audit: { action: 'HACCP corrective action recorded', detail: `${ids.nc} · temperature excursion in MR-3 at T-027` } },
            { lane: 'cal', system: 'Modelo de lenguaje', verb: 'Drafting', action: 'Drafts the corrective action record (deviation, product, measures and verification)', result: 'HACCP record ready for Quality review', ms: 6900, set: { volume: '1 draft corrective action' }, milestone: 'd8', audit: { action: 'Corrective action record drafted', detail: `${ids.nc} · awaiting Quality review` } },
            { lane: 'tie', system: 'Microsoft Teams', verb: 'Sending', action: `Notifies the ${ROLE.store_manager} and the ${ROLE.store_ops}`, result: `Notice posted in the “${TEAMS}” channel`, tone: 'ok', ms: 900, wait: 1600, set: { volume: '1 task · 1 write-off · 1 notice', result: `${ids.tar} assigned · store notified` }, milestone: 'teams', audit: { action: 'Notice sent via Microsoft Teams', detail: `${ROLE.store_manager} and ${ROLE.store_ops} · “${TEAMS}” channel` } }
          ];
        }
      },
      kpis: (H, held) => [
        { label: 'Packs in MR-3 during the excursion', value: H.all.count, sub: `${UNITS.length} lines · ${H.all.items.length} sections · ${H.fmt.eur(H.all.value)} at retail price`, icon: 'box' },
        { label: 'First possible sale', value: H.first.time, sub: `${H.first.id} · ${H.first.where}${held ? ' · blocked' : ''}`, icon: 'barcode' }
      ],
      scope: {
        icon: 'box',
        unit: ['pack', 'packs'],
        item_noun: ['section', 'sections'],
        qty_unit: null,
        per_square: 8,
        items: [
          { id: 'MR3-T1', title: 'Moncayo natural and flavoured yoghurts', sub: '4 lines', group: 'Section 1', group_short: 'Section 1', count: 96, value: 62.4, hold: 'TPV-T027',
            elsewhere: [{ loc: 'Cold room CF-1', count: 144, note: 'yoghurts · 3.6 °C · within range' }],
            gone: [{ id: 'TPV-0928', date: '2026-09-28', time: '21:30', count: 38, to: 'Sold on 28/09 up to closing, before the excursion' }] },
          { id: 'MR3-T2', title: 'Moncayo Greek and bifidus yoghurts', sub: '3 lines', group: 'Section 2', group_short: 'Section 2', count: 64, value: 89.6, hold: 'CC-0929-114' },
          { id: 'MR3-T3', title: 'Moncayo dairy desserts', sub: 'custard, flan, rice pudding and cuajada', group: 'Section 3', group_short: 'Section 3', count: 58, value: 92.8, hold: 'TPV-T027',
            elsewhere: [{ loc: 'Cold room CF-1', count: 60, note: 'desserts · 3.6 °C · within range' }] },
          { id: 'MR3-T4', title: 'Moncayo fresh milk and cream', sub: '3 lines', group: 'Section 4', group_short: 'Section 4', count: 42, value: 63, hold: 'CC-0929-114',
            elsewhere: [{ loc: '06:30 delivery', count: 72, note: 'fresh milk · lorry from Plaza at 2.8 °C' }],
            gone: [{ id: 'TPV-0928', date: '2026-09-28', time: '21:30', count: 21, to: 'Sold on 28/09 up to closing, before the excursion' }] },
          { id: 'MR3-T5', title: 'Moncayo fresh cheeses and requesón', sub: '3 lines', group: 'Section 5', group_short: 'Section 5', count: 34, value: 71.4, hold: 'CC-0929-121' },
          { id: 'MR3-T6', title: 'Moncayo fresh pastry and squeezed juice', sub: '2 lines', group: 'Section 6', group_short: 'Section 6', count: 24, value: 52.8, hold: 'TPV-T027' }
        ],
        holds: {
          'TPV-T027': { date: '2026-09-29', time: '09:00', where: 'Opening · tills 1–6', label: 'In-store sale' },
          'CC-0929-114': { date: '2026-09-29', time: '10:30', where: 'Online order · click and collect', label: 'Online order' },
          'CC-0929-121': { date: '2026-09-29', time: '12:00', where: 'Online order · click and collect', label: 'Online order' }
        },
        units: UNITS,
        csv_name: 'multideck-mr3-t027-excursion',
        csv_cols: [
          { label: 'Section', key: 'item' },
          { label: 'EAN', key: 'ean', text: true },
          { label: 'Product', key: 'product' },
          { label: 'Lot', key: 'lot' },
          { label: 'Use by', key: 'bb' },
          { label: 'Packs', key: 'count' }
        ],
        labels: {
          items_title: 'Products and sales affected',
          items_systems: 'SAP S/4 Retail and store POS',
          items_where: 'multideck MR-3,',
          item_col: 'Section',
          at_col: 'Packs',
          group_col: 'Section',
          hold_col: 'First sale',
          else_col: 'Outside the multideck',
          else_none: 'No stock',
          gone_verb: 'sold',
          exposed: 'Exposed',
          blocked: 'Sale blocked',
          unblocked: 'Not blocked',
          block_noun: 'block',
          block_verb: 'Block',
          hold_verb: 'Block',
          held: 'Blocked',
          holds_label: 'Sales channels with exposed product',
          holds_first: 'the first',
          scope_main: 'Packs in multideck MR-3 during the excursion',
          else_scope: 'Same lines outside the multideck',
          else_decision: 'Within range',
          map_title: 'Product location',
          map_sub: 'SAP S/4 Retail · T-027 planogram',
          zone_title: 'MR-3 · dairy multideck by section',
          zone_sub: '6 sections',
          else_title: 'Same lines outside the multideck',
          else_sub: 'were not in MR-3 · used to restock the shelf',
          gone_title: 'Sold before the excursion',
          legend_exposed: 'Exposed to the excursion',
          legend_else: 'Within range, outside the multideck',
          csv_button: 'Download lines (CSV)',
          value_label: 'at retail price',
          report_scope: 'Scope of the sales block'
        }
      },
      text: {
        proposal_title: 'sales block proposal',
        stop_without: 'proposing a sales block',
        activates: 'the sales block',
        no_proposal: 'no block proposed',
        idle_log: 'The run stops at the approval: nothing is blocked at the POS or in SAP without the Quality decision.',
        approve_action: 'Approves the sales block and removal',
        scope_short: (H) => `block the sale of ${H.pl(H.sc.count)} from ${H.fmt.plural(H.sc.items.length, 'section', 'sections')}, remove them before opening and call the refrigeration engineer`,
        audit_approved: 'Sales block approved',
        audit_approved_detail: (H) => `${H.ids.blq} · ${H.sc.count} packs in ${H.sc.items.length} MR-3 sections · ${H.sc.holds.length} sales channels${H.sc.out.length ? ` · scope edited (excluding ${H.sc.out.map((l) => l.id).join(', ')})` : ''}`,
        outcome_approved: (H) => `Sales block ${H.ids.blq} approved · ${H.sc.count} packs`,
        audit_rejected: 'Sales block rejected',
        outcome_rejected: 'Block rejected · no actions applied',
        toast_done: (H) => `${H.ids.blq} applied · ${H.ids.tar} assigned · ${H.ids.ot} opened`,
        presenter_applying: 'After approval: block at the POS, stock blocked in SAP, removal task for the store, incident for the refrigeration engineer and a Teams notice.',
        reject_nothing: 'no POS block, no stock blocked in SAP, no store task and no incident for the refrigeration engineer',
        edit_intro: 'APPCC-TIE-01 requires all chilled product held above 5 °C for more than 2 h to be removed.'
      },
      approval: {
        id: 'blq-mr3-t027',
        approve_label: 'Approve sales block',
        policy: 'APPCC-TIE-01 · PR-CAL-010 · only Quality decides exceptions',
        title: (H) => `Sales block · ${H.sc.count} packs from multideck MR-3`,
        summary: (H) => `Reason: multideck air above ${H.fv(H.C.threshold)} for ${H.C.above} min (${H.span}), longer than the ${H.C.minutes} min set by ${H.W.backup ? 'APPCC-TIE-01' : 'the workflow'}${H.critMin ? `, and ${H.critMin} min above ${H.fv(H.crit)}: critical excursion` : ''}. The sale of the exposed product is blocked and it is moved to the waste cold room before the store opens.`,
        effects: (H) => [
          `T-027 POS: sales block on ${H.sc.count} packs (${H.sc.items.length} sections)`,
          `SAP S/4 Retail: stock blocked and ${H.sc.holds.length} sales channels free of exposed product`,
          `Microsoft Teams: removal task for the ${ROLE.store_manager} before 08:45`,
          'ServiceNow: urgent incident for the on-call refrigeration engineer',
          'SAP S/4 Retail: HACCP corrective action with draft record'
        ],
        applied: (H) => [
          `T-027 POS: ${H.ids.blq} · ${H.sc.count} packs blocked`,
          `SAP S/4 Retail: stock blocked · ${H.ids.nc} with draft record`,
          `Microsoft Teams: ${H.ids.tar} assigned to the ${ROLE.store_manager}`,
          `ServiceNow: ${H.ids.ot} · priority 1`,
          `Microsoft Teams: notice in “${TEAMS}”`
        ]
      },
      result: {
        title: (H) => `Sale blocked (${H.ids.blq}), removal assigned and incident ${H.ids.ot} opened`,
        stats: (H) => [
          { label: 'Packs with sale blocked', value: H.sc.count, tone: 'crit' },
          { label: 'Sales channels protected', value: H.sc.holds.length },
          { label: 'Sections cleared', value: H.sc.items.length },
          { label: 'Packs available to restock', value: H.sc.elseTotal, tone: 'warn' }
        ],
        tiles: (H) => [
          {
            icon: 'lock', tone: 'crit', title: `Sales block ${H.ids.blq}`, systems: ['TPV tiendas', 'SAP S/4 Retail'],
            kv: [
              ['Status', App.chip('blocked')],
              ['Scope', `${H.pl(H.sc.count)} · ${H.fmt.plural(H.sc.items.length, 'section', 'sections')}`],
              ['Retail value', H.fmt.eur(H.sc.value)],
              ['Channels', H.sc.holds.map((h) => h.id).join(', ')],
              ['Decides exceptions', `${ROLE.quality} (APPCC-TIE-01)`]
            ],
            next: 'Disposition under APPCC-TIE-01: more than 2 h above 5 °C → write-off and destruction; no relabelling or markdown.',
            buttons: [{ action: 'csv', label: 'Blocked lines (CSV)' }]
          },
          {
            icon: 'building', title: `Removal ${H.ids.tar} and incident ${H.ids.ot}`, systems: ['Microsoft Teams', 'ServiceNow'], chip: ['running', 'Before opening'],
            kv: [
              ['Task', `Move ${H.sc.count} packs to the waste cold room before 08:45`],
              ['Restocking', `From cold room CF-1 and the 06:30 delivery (${H.sc.elseTotal} packs)`],
              ['Incident', `${H.ids.ot} · replace fan motor VF-2`],
              ['Refrigeration engineer', 'Expected arrival 08:15'],
              ['Multideck', 'Covered with an “Under maintenance” sign until it is back to 3 °C']
            ]
          },
          {
            icon: 'clipboard', title: `Corrective action ${H.ids.nc}`, systems: ['SAP S/4 Retail'], chip: ['draft', 'Draft'],
            items: AC(H),
            buttons: [{ action: 'report-doc', icon: 'printer', label: 'Download HACCP record (PDF)' }]
          },
          {
            icon: 'send', title: 'Notice to the store', systems: ['Microsoft Teams'], note: H.run.endAt ? `sent at ${H.fmt.time(H.run.endAt)}` : '',
            message: {
              from: 'Agentic Platform · Store agent', channel: `“${TEAMS}” channel`, at: H.run.endAt ? H.fmt.time(H.run.endAt) : '',
              paras: [
                { to: ROLE.store_manager, text: `Before opening, please remove the following from multideck MR-3 (sale already blocked at the tills, ${H.ids.blq}, approved by ${H.decision.by}):` },
                { to: ROLE.store_ops, text: `Incident ${H.ids.ot} raised for the refrigeration engineer, arriving 08:15. Restock from CF-1; urgent order on the 11:00 delivery. Details in ${H.ids.nc}.` }
              ],
              list: H.sc.items.map((l) => `${l.group}: ${l.title} · ${H.pl(l.count)}`)
            }
          }
        ]
      },
      doc: {
        code: 'REG-APPCC-TIE-01-14',
        lane: 'cal',
        heading: 'Corrective action record',
        col_d: 'Item',
        title: (H) => `HACCP corrective action · ${H.ids.nc}`,
        subtitle: 'Temperature excursion in multideck MR-3 at store T-027 · draft for review',
        filename: (H) => `corrective-action-${H.ids.nc}`,
        meta: (H) => [['Corrective action', H.ids.nc], ['Sales block', H.ids.blq], ['Refrigeration incident', H.ids.ot]],
        items: (H) => AC(H),
        reviewer: ROLE.quality,
        approver: ROLE.store_ops,
        note: 'Draft generated from the evidence gathered during the run. The cause remains a hypothesis until Refrigeration Maintenance closes the incident. Keep this record in line with the store HACCP plan.'
      },
      report: {
        noun: 'incident report',
        code: 'REG-CAL-010-22',
        title: 'Incident report · multideck MR-3 at T-027',
        subtitle: 'In-store temperature excursion',
        filename: 'incident-report-t027-mr3',
        site_label: 'Store',
        site: 'T-027 Huesca Centro',
        description: (H) => `On 29/09/2026 at 05:50 the cold-chain sensor platform raised alarm ALM-T027-0550 on dairy multideck MR-3 at store T-027 Huesca Centro (set point 3 °C). The return air (probe TS-T027-MR3) was above ${H.fv(H.C.threshold)} for ${H.C.above} min (${H.span}), peaking at 9.8 °C at 05:30, with ${H.critMin} min above ${H.fv(H.crit)}. The multideck held ${H.all.count} packs across ${UNITS.length} Moncayo-brand lines. The store was closed and no exposed product was sold.`,
        criteria: 'APPCC-TIE-01 (chilled product more than 2 h above 5 °C: removal and destruction as waste) and PR-CAL-010 (sales block at the POS and incident record; only Quality decides exceptions). Regulation (EC) No 852/2004 and Real Decreto 1021/2022 (Spanish food hygiene rules).',
        actions: (H) => [
          `T-027 POS · ${H.ids.blq}: sale blocked for ${H.sc.count} packs in ${H.sc.items.length} sections (${H.fmt.eur(H.sc.value)} at retail price).`,
          `SAP S/4 Retail: stock set to “quality blocked”; lines removed from ${H.sc.holds.map((h) => `${h.id} (${h.time})`).join(', ')}.`,
          `Microsoft Teams · ${H.ids.tar}: removal to the waste cold room before 08:45 and restocking from CF-1.`,
          `ServiceNow · ${H.ids.ot}: priority 1 incident for the on-call refrigeration engineer (fan VF-2).`,
          `SAP S/4 Retail · ${H.ids.nc}: HACCP corrective action with draft record (REG-APPCC-TIE-01-14).`,
          `Microsoft Teams: notice to the ${ROLE.store_manager} and the ${ROLE.store_ops} in “${TEAMS}”.`
        ],
        pending: () => [
          'Confirm the physical removal and weigh the write-off before opening (photo of the waste bin in the task).',
          'After the repair, check that the multideck is back to 3 °C within 60 min before restocking.',
          'Review why the level 1 alert at 03:55 did not trigger a call to the store or the refrigeration engineer.',
          `Exceptions to the product disposition: only the ${ROLE.quality} (PR-CAL-010).`
        ],
        reviewer: ROLE.quality,
        final_step: 'Write-off closure',
        final_role: ROLE.store_ops,
        note: 'Document subject to Quality review; it does not replace the physical in-store removal record.'
      },
      not_applied: (H) => [
        { sys: 'TPV tiendas', text: `No sales block: the ${H.all.count} packs could be sold at opening` },
        { sys: 'SAP S/4 Retail', text: 'Available stock and online orders unchanged' },
        { sys: 'Microsoft Teams', text: 'No removal task and no notice to the store' },
        { sys: 'ServiceNow', text: 'No incident for the refrigeration engineer' }
      ],
      compare: [
        { k: 'People involved', today: '3–4: alarm centre, store manager, Quality and refrigeration engineer', now: 'Quality reviews and decides; the store and the engineer receive the task with the data' },
        { k: 'Systems checked by hand', today: '4–5: sensors, SAP, POS, ServiceNow and phone', now: 'None: the agents query 5 systems and every data point is logged' },
        { k: 'Steps', today: '10–12 manual steps; often only spotted when the store opens', steps: true },
        { k: 'Time to block the sale and notify', today: '1–3 h (with the risk of selling exposed product)', measured: true },
        { k: 'Audit evidence', today: 'Paper temperature log and emails', now: 'Report REG-CAL-010-22, HACCP record and the run’s audit log' }
      ],
      presenter: {
        intro: () => '05:50 alarm at store T-027 Huesca Centro: dairy multideck MR-3 is at 9.4 °C against a 5 °C limit since 03:55, peaking at 9.8. It holds 318 Moncayo-brand packs and the store opens at 09:00.',
        agents: 'Five agents, each with its own system: cold-chain sensors for the curve; SAP and POS for lines and sales; POS and SAP for the block; Teams for the store; ServiceNow for the refrigeration engineer.',
        waiting: (H) => [
          `The ${H.sc.elseTotal} packs of the same lines in cold room CF-1 and on the delivery were not in the multideck: they can be used to restock. Nothing has been blocked at the POS yet.`,
          'You can edit the scope (remove a section, with a reason) or reject: if rejected, nothing is applied and it is logged for audit.'
        ],
        rejected: ['Rejected: no block at the tills, no task for the store and no incident for the refrigeration engineer. The reason is kept in the audit log.', 'The decision always rests with Quality; it can be run again at any time.'],
        done: (H) => [
          `Applied after approval: ${H.ids.blq} at the POS, stock blocked in SAP, ${H.ids.tar} for the store manager and ${H.ids.ot} for the refrigeration engineer, with the HACCP record in draft.`,
          'The report comes out as a controlled document: code, revision, approvals and the run log, ready for a health inspection or an IFS audit.'
        ],
        next: { done: 'Open “Download incident report” and then move on to the complaint (right arrow).', no_trigger: 'Go to “From words to workflow”, set 120 min and run it again.' }
      }
    }
  });

  /* HACCP corrective action record proposed by the Quality agent. */
  function AC(H) {
    const sc = H.sc;
    return [
      { d: 'A1', t: 'Deviation', text: `Multideck MR-3 at T-027 ${H.C.above} min above 5 °C (${H.span}); peak of 9.8 °C at 05:30.`, owner: ROLE.quality_shift, due: '2026-09-29' },
      { d: 'A2', t: 'Product affected', text: `${sc.count} packs from ${sc.items.length} sections (${H.fmt.eur(sc.value)} at retail price); detail by EAN and lot in the CSV annex.`, owner: ROLE.quality_shift, due: '2026-09-29' },
      { d: 'A3', t: 'Immediate action', text: `${H.ids.blq}: sale blocked at the POS; ${H.ids.tar}: removal to the waste cold room before 08:45.`, owner: ROLE.store_manager, due: '2026-09-29' },
      { d: 'A4', t: 'Product disposition', text: 'Write-off and destruction (more than 2 h above 5 °C). No relabelling or markdown.', owner: ROLE.quality, due: '2026-09-29' },
      { d: 'A5', t: 'Cause (hypothesis)', text: 'Evaporator fan motor VF-2 stopped since 03:40; evaporator frosted up.', owner: ROLE.maintenance, due: '2026-09-29' },
      { d: 'A6', t: 'Equipment correction', text: `${H.ids.ot}: replace the fan motor and manual defrost.`, owner: ROLE.maintenance, due: '2026-09-29' },
      { d: 'A7', t: 'Verification', text: 'The multideck is back to 3 °C within 60 min before restocking; reading recorded.', owner: ROLE.store_manager, due: '2026-09-29' },
      { d: 'A8', t: 'Prevention', text: 'Automatic call to the refrigeration engineer on a level 1 alert outside opening hours; review IT-TIE-014.', owner: ROLE.quality, due: '2026-10-16' }
    ];
  }
})();
