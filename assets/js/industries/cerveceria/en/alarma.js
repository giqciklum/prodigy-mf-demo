/* Cervecera Bardenas · alarm with approval: fermentation vessel FV-12 temperature off set point (English).
 * Fictitious company; synthetic demo data (MFM). The functions receive the scene context H
 * (W workflow, C evaluated condition, sc current scope, ids generated on approval, fmt, fv, pl…). */
(function () {
  'use strict';

  /* Temperature of the fermenting wort (probe TT-FV12-02, central zone), every 10 min. */
  const KEY = [['01:00', 12.0], ['01:30', 12.1], ['02:00', 12.2], ['02:20', 13.1], ['02:30', 13.8], ['03:00', 14.6], ['03:30', 15.0], ['03:40', 15.1], ['04:30', 16.4], ['05:10', 17.0], ['05:20', 17.1], ['05:30', 17.0], ['05:50', 16.8], ['06:30', 16.6], ['07:00', 16.5]];
  const mins = (t) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
  const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  const SERIES = [];
  for (let m = mins('01:00'); m <= mins('07:00'); m += 10) {
    const i = KEY.findIndex((k) => mins(k[0]) >= m);
    const b = KEY[i];
    const a = KEY[Math.max(0, i - 1)];
    const v = mins(b[0]) === m || i === 0 ? b[1] : a[1] + (b[1] - a[1]) * (m - mins(a[0])) / (mins(b[0]) - mins(a[0]));
    SERIES.push({ time: hhmm(m), value: Math.round(v * 10) / 10 });
  }

  /* Items of the batch in FV-12: the 4 brews that filled it and the yeast to be cropped from the cone. */
  const UNITS = [
    { item: 'L2609-FV12', part: 'C-2609-41', date: '26/09/2026 06:10', hl: 120, op: '11.6', malt: 'MAL-2609-02', hop: 'LUP-2606-11' },
    { item: 'L2609-FV12', part: 'C-2609-42', date: '26/09/2026 09:40', hl: 120, op: '11.5', malt: 'MAL-2609-02', hop: 'LUP-2606-11' },
    { item: 'L2609-FV12', part: 'C-2609-43', date: '26/09/2026 13:15', hl: 120, op: '11.6', malt: 'MAL-2609-02', hop: 'LUP-2606-11' },
    { item: 'L2609-FV12', part: 'C-2609-44', date: '26/09/2026 16:50', hl: 120, op: '11.5', malt: 'MAL-2609-03', hop: 'LUP-2606-11' },
    { item: 'LEV-2609-12', part: 'W-34/70 · generation 5', date: '26/09/2026 06:30', hl: 14, op: '—', malt: '—', hop: '—' }
  ];

  const ROLE = {
    brewmaster: 'Head Brewer', quality: 'Quality Manager', quality_shift: 'Shift Quality Technician',
    maintenance: 'Maintenance Manager', production: 'Production Manager', cellar: 'Cellar Supervisor'
  };
  const TEAMS = 'Cellar · Arguedas';

  agenticPackEn('cerveceria', {
    alarma: {
      nav: 'FV-12 alarm',
      title: 'FV-12 alarm in progress',
      icon: 'thermometer',
      page_title: 'Fermentation vessel FV-12 · temperature off set point',
      alarm_id: 'ALM-FV12-0550',
      alarm_time: '05:50',
      source_system: 'SCADA bodega',
      asset: 'FV-12',
      location: 'Arguedas Brewery · fermentation cellar',
      excursion_noun: 'excursion',
      workflow_topic: 'fermentation control',
      policy_ref: 'PR-FER-003',
      procedures: 'PR-FER-003 · APPCC-01 · PR-CAL-006',
      decider_short: 'Head Brewer',
      decider_of: 'the Head Brewer\'s',
      approval_node: 'Head Brewer approval',
      measure: { short: 'wort temperature', col: 'Temperature', unit: '°C', dec: 1, icon: 'thermometer' },
      setpoint: 12,
      setpoint_label: 'set point',
      limit: 13.5,
      critical: 15,
      min_minutes: 120,
      interval_min: 10,
      series: SERIES,
      peak: 17.1,
      peak_time: '05:20',
      current: 16.5,
      current_time: '07:00',
      current_note: 'glycol valve VG-12 not opening',
      chart: {
        title: 'Fermentation vessel FV-12 · wort temperature',
        sub: 'Set point 12 °C · now 16.5 °C (07:00)',
        tab: 'Temperature',
        series_label: 'Wort, central zone (TT-FV12-02)',
        yTicks: [10, 12, 14, 16, 18],
        xTicks: ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00']
      },
      event_kv: [
        ['Fermentation vessel', 'FV-12 · 600 hl cylindroconical · cellar 2'],
        ['Batch', 'L2609-FV12 · Bardenas Lager · 480 hl · day 3 of fermentation'],
        ['Probe', 'TT-FV12-02 · central zone · reading every 10 min'],
        ['Equipment', 'Glycol valve VG-12 · upper and lower jackets · glycol loop B']
      ],
      events: [
        { time: '02:20', end: '07:00', text: 'Glycol valve VG-12 does not open: position 0% with 100% demand', equipment: 'VG-12', tone: 'warn', band: 'Valve VG-12 not opening', bandTone: 'warn' },
        { time: '02:30', text: 'Exceeds 13.5 °C: warning in the cellar SCADA; the night operator is busy with the keg line CIP', ref: 'AV-FV12-0230', tone: 'warn' },
        { time: '03:40', text: 'Exceeds 15 °C, the PR-FER-003 critical limit (risk of diacetyl, acetaldehyde and esters off profile)', ref: 'PR-FER-003', tone: 'crit' },
        { time: '05:20', text: 'Peak of 17.1 °C at the height of high krausen', equipment: 'TT-FV12-02', tone: 'crit' },
        { time: '05:50', text: 'Alarm ALM-FV12-0550: 2 h 10 min continuously above 15 °C', ref: 'ALM-FV12-0550', tone: 'crit' },
        { time: '06:10', text: 'The operator confirms valve VG-12 is stuck; the rest of loop B is working', equipment: 'Glycol loop B', tone: 'brand' }
      ],
      probable_cause: 'Glycol valve VG-12 stuck closed (the pneumatic actuator has not responded since 02:20): with no cooling on the jackets, the heat from high krausen on day 3 drives up the wort temperature. Glycol loop B and the other fermentation vessels are working normally. To be confirmed by Maintenance.',
      backup: { id: 'wf-fermentacion-respaldo', name: 'Fermentation temperature off set point', version: 'v1', threshold: 13.5, minutes: 120, critical: 15, approver: ROLE.brewmaster },
      untouched: 'Brewmaxx, SAP, LIMS, Maximo or Teams',
      apply_systems: 'SAP QM, LIMS, Maximo, Brewmaxx and Teams',
      llm_cost_usd: 0.05,
      ids: [
        { key: 'ret', prefix: 'RET-2026-', start: 77, label: 'Quality hold' },
        { key: 'mu', prefix: 'MU-2609-', start: 1188, label: 'LIMS sample' },
        { key: 'ot', prefix: 'OT-2026-', start: 31544, label: 'Work order' },
        { key: 'nc', prefix: 'DES-2026-', start: 41, label: 'Process deviation' }
      ],
      block_id_key: 'ret',
      proposer: 'cal',
      lanes: [
        { id: 'mon', name: 'Cellar monitor', short: 'Monitor', icon: 'thermometer', systems: ['SCADA bodega'], idle: 'Confirms the excursion with the probe readings', gsub: 'confirms the excursion', gsys: ['SCADA bodega'] },
        { id: 'traz', name: 'Batch traceability', short: 'Traceability', icon: 'git-branch', systems: ['Brewmaxx (MES)', 'SAP S/4HANA'], idle: 'Locates the batch, brews and planned operations', gsub: 'batch, brews and plans', gsys: ['Brewmaxx', 'SAP'] },
        { id: 'cal', phase: 2, name: 'Quality', icon: 'flask', systems: ['SAP QM', 'LIMS LabWare'], idle: 'Prepares the hold and requests approval', gsub: 'hold and LIMS analyses', gsys: ['SAP QM', 'LIMS'] },
        { id: 'man', phase: 2, name: 'Maintenance', icon: 'wrench', systems: ['GMAO Maximo', 'Microsoft Teams'], idle: 'Opens the work order for valve VG-12', gsub: 'work order for valve VG-12', gsys: ['Maximo', 'Teams'] },
        { id: 'pro', phase: 2, name: 'Production', icon: 'calendar', systems: ['Brewmaxx (MES)', 'SAP S/4HANA'], idle: 'Reschedules racking and pitching', gsub: 'reschedules racking and pitching', gsys: ['Brewmaxx', 'SAP'] }
      ],
      steps: {
        p1: (H) => {
          const a = H.all;
          return [
            { lane: 'mon', system: 'SCADA bodega', verb: 'Querying', action: 'Reads probe TT-FV12-02 from 01:00 to 07:00, one reading every 10 min', result: `${SERIES.length} readings, no gaps · now 16.5 °C (07:00)`, ms: 1800, set: { volume: `${SERIES.length} temperature readings` } },
            { lane: 'mon', system: 'Agentic Platform', eval: true, ms: 90 },
            { lane: 'mon', system: 'SCADA bodega', verb: 'Querying', action: 'Cross-checks the excursion against the position of valve VG-12 and glycol loop B', result: 'VG-12 at 0% with 100% demand since 02:20; loop B at −4 °C: hypothesis for Maintenance', tone: 'warn', ms: 1400, set: { volume: `${SERIES.length} readings · valve and loop`, result: `Excursion confirmed: ${H.C.above} min above · peak 17.1 °C` } },
            { lane: 'traz', system: 'Brewmaxx (MES)', verb: 'Querying', action: 'Identifies the batch and the brews that filled FV-12', result: `L2609-FV12 · Bardenas Lager · 4 brews (C-2609-41 to 44) · ${H.pl(480)}`, ms: 2000, set: { volume: '1 batch · 4 brews' } },
            { lane: 'traz', system: 'SAP S/4HANA', verb: 'Querying', action: 'Resolves raw materials, yeast and batch cost', result: `Malt MAL-2609-02/03, hops LUP-2606-11, 5th-generation W-34/70 yeast · ${H.fmt.eur(a.value)} at standard cost`, ms: 2400, set: { volume: `${H.pl(a.count)} · ${a.items.length} items` }, reveal: 'lots' },
            { lane: 'traz', system: 'SCADA bodega', verb: 'Querying', action: 'Checks the fermentation vessels on the same glycol loop', result: `FV-11 and FV-14 (${H.pl(a.elseTotal)}) on set point: to be monitored, no hold`, ms: 1600, reveal: 'map' },
            { lane: 'traz', system: 'Brewmaxx (MES)', verb: 'Querying', action: 'Looks up the planned operations that depend on FV-12', result: `${a.holds.length} operations; the first, ${H.first.id}, ${H.holdWhen(H.first).includes('/') ? 'on' : 'at'} ${H.holdWhen(H.first)}`, tone: 'warn', ms: 1900, set: { volume: `${H.pl(a.count)} · ${a.holds.length} operations`, result: `First operation affected: ${H.first.id}` }, milestone: 'traz', audit: { action: 'Batch and operations identified', detail: `L2609-FV12 (480 hl) and yeast LEV-2609-12 (14 hl) · ${a.holds.length} planned operations · FV-11 and FV-14 to be monitored` } },
            { lane: 'cal', node: 'apr', system: 'Procedimientos', verb: 'Analysing', action: 'Applies PR-FER-003 and APPCC-01 to this excursion', result: 'Hold the batch, analyse diacetyl (VDK), acetaldehyde and esters in the LIMS and do not repitch the yeast; the Head Brewer decides', ms: 1300 },
            { lane: 'cal', node: 'apr', system: 'Modelo de lenguaje', verb: 'Drafting', action: 'Drafts the proposal and its rationale with the evidence', result: `Proposal: hold ${H.pl(a.count)} in ${a.items.length} items, urgent LIMS sample, work order for the valve and reschedule ${a.holds.length} operations`, ms: 6500, set: { volume: `${H.pl(a.count)} · ${a.holds.length} operations` } },
            { lane: 'cal', node: 'apr', system: 'Agentic Platform', verb: 'Evaluating', action: `Requests the ${H.W.approver}'s approval before writing to SAP QM, LIMS, Maximo and Brewmaxx`, result: 'Awaiting the Head Brewer\'s decision', tone: 'warn', ms: 60, wait: 1500, set: { result: 'Proposal sent to the Head Brewer' }, milestone: 'prop', audit: { action: 'Hold proposal sent for approval', detail: `L2609-FV12 and LEV-2609-12 · ${H.pl(a.count)} · approver: ${H.W.approver}` } }
          ];
        },
        p2: (H) => {
          const sc = H.sc;
          const ids = H.ids;
          return [
            { lane: 'cal', system: 'SAP QM', verb: 'Applying', action: `Records the quality hold on ${fmtList(sc)}`, result: `${ids.ret} · ${H.pl(sc.count)} with status «on hold»`, tone: 'ok', ms: 2100, milestone: 'ret', audit: { action: 'Quality hold applied', detail: `${ids.ret} · SAP QM · ${fmtList(sc)} · ${H.pl(sc.count)}` } },
            { lane: 'cal', system: 'LIMS LabWare', verb: 'Applying', action: 'Creates the urgent sample: diacetyl (VDK), acetaldehyde, esters, apparent extract and pH', result: `${ids.mu} · sampled at 07:30 · results before 12:00`, tone: 'ok', ms: 1800, set: { result: `${ids.ret} applied · ${ids.mu} in the lab` }, milestone: 'mu', audit: { action: 'Urgent sample created in LIMS', detail: `${ids.mu} · LIMS LabWare · VDK, acetaldehyde, esters, extract and pH` } },
            { lane: 'man', system: 'GMAO Maximo', verb: 'Applying', action: 'Opens a priority 1 corrective work order for valve VG-12', result: `${ids.ot} · check actuator and positioner; temporary cooling via the manual bypass`, tone: 'ok', ms: 1900, set: { volume: '1 priority 1 work order' }, milestone: 'ot', audit: { action: 'Work order opened', detail: `${ids.ot} · GMAO Maximo · glycol valve VG-12 · priority 1` } },
            { lane: 'pro', system: 'Brewmaxx (MES)', verb: 'Applying', action: `Reschedules ${sc.holds.length} planned operations`, result: `${sc.holds.map((h) => h.id).join(', ')} on hold pending the Head Brewer's decision`, tone: 'ok', ms: 2000, set: { volume: `${sc.holds.length} operations rescheduled` }, milestone: 'pro', audit: { action: 'Operations rescheduled', detail: `Brewmaxx · ${sc.holds.map((h) => h.id).join(', ')}` } },
            { lane: 'pro', system: 'SAP S/4HANA', verb: 'Applying', action: 'Assigns propagated yeast from tank YT-02 to the FV-16 pitching', result: 'FV-16 pitched at 14:00 with no delay, using 1st-generation yeast', tone: 'ok', ms: 1600, set: { volume: `${sc.holds.length} operations · 1 pitching reassigned`, result: 'FV-16 pitching on time' } },
            { lane: 'cal', system: 'SAP QM', verb: 'Applying', action: 'Opens the process deviation with the curve, the valve and the batch', result: `${ids.nc} opened (PR-FER-003)`, tone: 'ok', ms: 1500, set: { volume: '1 deviation' }, milestone: 'nc', audit: { action: 'Process deviation opened', detail: `${ids.nc} · SAP QM · FV-12 temperature off set point` } },
            { lane: 'cal', system: 'Modelo de lenguaje', verb: 'Drafting', action: 'Drafts the batch evaluation plan (analyses, tasting and decision criteria)', result: 'Evaluation plan ready for the Head Brewer\'s review', ms: 7100, set: { volume: '1 deviation · draft plan' }, milestone: 'plan', audit: { action: 'Evaluation plan drafted', detail: `${ids.nc} · pending the Head Brewer's review` } },
            { lane: 'man', system: 'Microsoft Teams', verb: 'Sending', action: `Notifies the ${ROLE.cellar}, the ${ROLE.production} and the maintenance technician`, result: `Notice posted to the «${TEAMS}» channel`, tone: 'ok', ms: 900, wait: 1600, set: { volume: '1 work order · 1 notice', result: `${ids.ot} opened · cellar notified` }, milestone: 'teams', audit: { action: 'Notice sent via Microsoft Teams', detail: `${ROLE.cellar}, ${ROLE.production} and maintenance · «${TEAMS}» channel` } }
          ];
        }
      },
      kpis: (H, held) => [
        { label: 'Volume in FV-12 off set point', value: '480 hl', sub: 'L2609-FV12 · Bardenas Lager · day 3 · plus 14 hl of yeast', icon: 'droplet' },
        { label: 'First operation affected', value: H.first.time, sub: `${H.first.id} · ${H.first.where}${held ? ' · rescheduled' : ''}`, icon: 'calendar' }
      ],
      scope: {
        icon: 'droplet',
        unit: ['hl', 'hl'],
        item_noun: ['item', 'items'],
        qty_unit: null,
        per_square: 40,
        items: [
          {
            id: 'L2609-FV12', trace: 'L2609-FV12', title: 'Bardenas Lager · fermenting wort', sub: 'day 3 · brews C-2609-41 to 44', group: 'FV-12 · cellar 2', group_short: 'FV-12', count: 480, value: 27840, hold: 'TRS-2610-03',
            elsewhere: [
              { loc: 'FV-11', count: 480, note: 'L2609-FV11 · 12.1 °C · same glycol loop' },
              { loc: 'FV-14', count: 360, note: 'L2609-FV14 · 12.0 °C · same glycol loop' }
            ]
          },
          { id: 'LEV-2609-12', title: 'Cropped W-34/70 yeast (5th generation)', sub: 'to be cropped from the FV-12 cone', group: 'FV-12 cone', group_short: 'Cone', count: 14, value: 1680, hold: 'SIE-0929-FV16' }
        ],
        holds: {
          'SIE-0929-FV16': { date: '2026-09-29', time: '14:00', where: 'FV-16 pitching · Bardenas Lager', label: 'Pitching' },
          'TRS-2610-03': { date: '2026-10-03', time: '06:00', where: 'Racking to lagering tank TG-07', label: 'Racking' }
        },
        units: UNITS,
        csv_name: 'batch-l2609-fv12-excursion',
        csv_cols: [
          { label: 'Item', key: 'item' },
          { label: 'Brew or crop', key: 'part' },
          { label: 'Date', key: 'date' },
          { label: 'hl', key: 'hl' },
          { label: 'Original gravity (°P)', key: 'op' },
          { label: 'Malt lot', key: 'malt' },
          { label: 'Hop lot', key: 'hop' }
        ],
        labels: {
          items_title: 'Batch and operations affected',
          items_systems: 'Brewmaxx and SAP S/4HANA',
          items_where: 'fermentation vessel FV-12,',
          item_col: 'Item',
          at_col: 'Volume',
          group_col: 'Location',
          hold_col: 'Planned operation',
          else_col: 'Same loop',
          else_none: '—',
          gone_verb: 'racked',
          exposed: 'Off set point',
          blocked: 'On hold',
          unblocked: 'Not on hold',
          block_noun: 'hold',
          block_verb: 'Hold',
          hold_verb: 'Reschedule',
          held: 'Rescheduled',
          holds_label: 'Planned operations',
          holds_first: 'the first',
          scope_main: 'FV-12 batch and yeast during the excursion',
          else_scope: 'Fermentation vessels on the same glycol loop',
          else_decision: 'Monitor',
          map_title: 'Location in the cellar',
          map_sub: 'SCADA bodega · cellar 2',
          zone_title: 'FV-12 · batch and yeast',
          zone_sub: '2 items',
          else_title: 'Fermentation vessels on the same glycol loop',
          else_sub: 'on set point · to be monitored',
          gone_title: 'Racked before the alarm',
          legend_exposed: 'Off set point',
          legend_else: 'To be monitored',
          csv_button: 'Download brews (CSV)',
          value_label: 'at standard cost',
          report_scope: 'Scope of the hold'
        }
      },
      text: {
        proposal_title: 'batch hold proposal',
        stop_without: 'proposing a hold',
        activates: 'the batch hold',
        no_proposal: 'no hold proposal',
        idle_log: 'The run stops at the approval: nothing is written to SAP QM, LIMS, Maximo or Brewmaxx without the Head Brewer\'s decision.',
        approve_action: 'Approves the hold and the batch evaluation',
        scope_short: (H) => `hold ${H.pl(H.sc.count)} (${fmtList(H.sc)}), analyse in the LIMS, repair the valve and reschedule ${H.fmt.plural(H.sc.holds.length, 'operation', 'operations')}`,
        audit_approved: 'Batch hold approved',
        audit_approved_detail: (H) => `${H.ids.ret} · ${fmtList(H.sc)} · ${H.pl(H.sc.count)} · ${H.sc.holds.length} operations rescheduled${H.sc.out.length ? ` · scope edited (without ${H.sc.out.map((l) => l.id).join(', ')})` : ''}`,
        outcome_approved: (H) => `Hold ${H.ids.ret} approved · ${fmtList(H.sc)}`,
        audit_rejected: 'Batch hold rejected',
        outcome_rejected: 'Hold rejected · no actions applied',
        toast_done: (H) => `${H.ids.ret} applied · ${H.ids.mu} in LIMS · ${H.ids.ot} opened`,
        presenter_applying: 'After approval: hold in SAP QM, urgent sample in the LIMS, work order for the valve in Maximo, rescheduling in Brewmaxx and a notice via Teams.',
        reject_nothing: 'no hold in SAP QM, no sample in the LIMS, no work order in Maximo and no changes in Brewmaxx',
        edit_intro: 'PR-FER-003 requires holding the batch and not repitching the yeast from a fermentation vessel that went off set point.'
      },
      approval: {
        id: 'ret-fv12',
        approve_label: 'Approve hold',
        policy: 'PR-FER-003 · APPCC-01 · the Head Brewer decides',
        title: (H) => `Hold on ${fmtList(H.sc)} · ${H.pl(H.sc.count)}`,
        summary: (H) => `Reason: wort in FV-12 above ${H.fv(H.C.threshold)} for ${H.C.above} min (${H.span}), more than the ${H.C.minutes} min set by ${H.W.backup ? 'PR-FER-003' : 'the workflow'}${H.critMin ? `, and ${H.critMin} min above ${H.fv(H.crit)}: risk of diacetyl and acetaldehyde off profile` : ''}. The batch is held pending the LIMS analyses and tasting, and its yeast is not repitched.`,
        effects: (H) => [
          `SAP QM: hold on ${fmtList(H.sc)} (${H.pl(H.sc.count)})`,
          'LIMS LabWare: urgent sample for VDK, acetaldehyde, esters, extract and pH',
          'GMAO Maximo: priority 1 work order for valve VG-12',
          `Brewmaxx: ${H.fmt.plural(H.sc.holds.length, 'operation rescheduled', 'operations rescheduled')}`,
          `Microsoft Teams: notice to the ${ROLE.cellar}, the ${ROLE.production} and maintenance`
        ],
        applied: (H) => [
          `SAP QM: ${H.ids.ret} · ${H.pl(H.sc.count)} on hold · ${H.ids.nc} with evaluation plan`,
          `LIMS LabWare: ${H.ids.mu} · results before 12:00`,
          `GMAO Maximo: ${H.ids.ot} · priority 1`,
          `Brewmaxx: ${H.sc.holds.map((h) => h.id).join(', ')} rescheduled`,
          `Microsoft Teams: notice in «${TEAMS}»`
        ]
      },
      result: {
        title: (H) => `Hold ${H.ids.ret} applied, ${H.ids.mu} in LIMS and ${H.ids.ot} opened`,
        stats: (H) => [
          { label: 'Hectolitres on hold', value: H.sc.count, tone: 'crit' },
          { label: 'Operations rescheduled', value: H.sc.holds.length },
          { label: 'Urgent LIMS analyses', value: 5 },
          { label: 'Hectolitres to monitor', value: H.sc.elseTotal, tone: 'warn' }
        ],
        tiles: (H) => [
          {
            icon: 'lock', tone: 'crit', title: `Hold ${H.ids.ret}`, systems: ['SAP QM', 'LIMS LabWare'],
            kv: [
              ['Status', App.chip('blocked', 'On hold')],
              ['Scope', `${fmtList(H.sc)} · ${H.pl(H.sc.count)}`],
              ['Value at standard cost', H.fmt.eur(H.sc.value)],
              ['Sample', `${H.ids.mu} · VDK, acetaldehyde, esters, extract and pH`],
              ['Decides', `${ROLE.brewmaster} (PR-FER-003)`]
            ],
            next: 'Next step under PR-FER-003: with the LIMS results, decide between an extended diacetyl rest, a controlled blend or discarding the batch.',
            buttons: [{ action: 'csv', label: 'Brews on hold (CSV)' }]
          },
          {
            icon: 'wrench', title: `Work order ${H.ids.ot} and rescheduling`, systems: ['GMAO Maximo', 'Brewmaxx (MES)'], chip: ['running', 'Priority 1'],
            kv: [
              ['Equipment', 'Glycol valve VG-12 · actuator and positioner'],
              ['Temporary', 'Cooling via the manual bypass, checked every 30 min'],
              ['Rescheduled', H.sc.holds.map((h) => `${h.id} (${H.holdWhen(h)})`).join(', ')],
              ['FV-16 pitching', 'With propagated yeast from YT-02, no delay'],
              ['Owner', ROLE.maintenance]
            ],
            next: 'FV-12 returns to automatic control once the valve responds in the open/close test.'
          },
          {
            icon: 'clipboard', title: `Evaluation plan · ${H.ids.nc}`, systems: ['SAP QM', 'LIMS LabWare'], chip: ['draft', 'Draft'],
            items: PLAN(H),
            buttons: [{ action: 'report-doc', icon: 'printer', label: 'Download evaluation plan (PDF)' }]
          },
          {
            icon: 'send', title: 'Notice to the cellar', systems: ['Microsoft Teams'], note: H.run.endAt ? `sent at ${H.fmt.time(H.run.endAt)}` : '',
            message: {
              from: 'Agentic Platform · Maintenance agent', channel: `«${TEAMS}» channel`, at: H.run.endAt ? H.fmt.time(H.run.endAt) : '',
              paras: [
                { to: ROLE.cellar, text: `Hold ${H.ids.ret} on FV-12 approved by the ${H.decision.by}. Keep cooling via the bypass and do not crop the yeast from the cone. Sample ${H.ids.mu} at 07:30.` },
                { to: 'Maintenance', text: `${H.ids.ot}: glycol valve VG-12 not opening since 02:20 (actuator not responding).` },
                { to: ROLE.production, text: `Rescheduled: ${H.sc.holds.map((h) => `${h.id} (${H.holdWhen(h)})`).join(', ')}. FV-16 will be pitched with yeast from YT-02. Details in ${H.ids.nc}.` }
              ]
            }
          }
        ]
      },
      doc: {
        code: 'REG-FER-003-09',
        lane: 'cal',
        heading: 'Batch evaluation plan',
        col_d: 'Step',
        title: (H) => `Evaluation plan · ${H.ids.nc}`,
        subtitle: 'Temperature deviation in fermentation vessel FV-12 (L2609-FV12) · draft for review',
        filename: (H) => `evaluation-plan-${H.ids.nc}`,
        meta: (H) => [['Deviation', H.ids.nc], ['Hold', H.ids.ret], ['LIMS sample', H.ids.mu]],
        items: (H) => PLAN(H),
        reviewer: ROLE.brewmaster,
        approver: ROLE.quality,
        note: 'Draft generated from the evidence gathered during the run. The decision criteria follow PR-FER-003; the Head Brewer decides the batch disposition with the LIMS results and the tasting.'
      },
      report: {
        noun: 'deviation report',
        code: 'REG-FER-003-08',
        title: 'Deviation report · fermentation vessel FV-12',
        subtitle: 'Fermentation temperature off set point',
        filename: 'deviation-report-fv12',
        site_label: 'Brewery',
        site: 'Arguedas Brewery',
        description: (H) => `On 29/09/2026 at 05:50 the cellar SCADA raised alarm ALM-FV12-0550 on fermentation vessel FV-12 (Bardenas Lager, batch L2609-FV12, 480 hl, day 3 of fermentation, set point 12 °C). The wort temperature (probe TT-FV12-02) was above ${H.fv(H.C.threshold)} for ${H.C.above} min (${H.span}), with a peak of 17.1 °C at 05:20 and ${H.critMin} min above ${H.fv(H.crit)}. The immediate cause is glycol valve VG-12, which has not opened since 02:20.`,
        criteria: 'PR-FER-003 (hold the batch and analyse diacetyl and acetaldehyde if the wort exceeds 13.5 °C for more than 2 h; do not repitch the yeast) and APPCC-01 (record the deviation; the Head Brewer decides the product disposition together with Quality).',
        actions: (H) => [
          `SAP QM · ${H.ids.ret}: hold on ${fmtList(H.sc)} (${H.pl(H.sc.count)}; ${H.fmt.eur(H.sc.value)} at standard cost).`,
          `LIMS LabWare · ${H.ids.mu}: urgent sample for VDK, acetaldehyde, esters, apparent extract and pH.`,
          `GMAO Maximo · ${H.ids.ot}: priority 1 work order for valve VG-12; temporary cooling via the bypass.`,
          `Brewmaxx: rescheduled ${H.sc.holds.map((h) => `${h.id} (${H.holdWhen(h)}, ${h.where})`).join(', ')}; FV-16 pitched with yeast from YT-02.`,
          `SAP QM · ${H.ids.nc}: process deviation with a draft evaluation plan (REG-FER-003-09).`,
          `Microsoft Teams: notice to the ${ROLE.cellar}, the ${ROLE.production} and maintenance in «${TEAMS}».`
        ],
        pending: () => [
          'Receive the LIMS results (before 12:00) and run the triangle test with the tasting panel.',
          'If diacetyl exceeds 0.10 mg/l, extend the rest at 14 °C and repeat the analysis every 24 h.',
          'Monitor FV-11 and FV-14 (same glycol loop B) every 30 min until the work order is closed.',
          `Batch disposition: only the ${ROLE.brewmaster} with the ${ROLE.quality} (PR-FER-003).`
        ],
        reviewer: ROLE.quality,
        final_step: 'Batch disposition',
        final_role: ROLE.brewmaster,
        note: 'Document subject to Quality review; it does not replace the batch disposition decision.'
      },
      not_applied: (H) => [
        { sys: 'SAP QM', text: 'No hold and no process deviation' },
        { sys: 'LIMS LabWare', text: 'No urgent sample; only the daily 08:00 sample' },
        { sys: 'GMAO Maximo', text: 'No work order for the valve' },
        { sys: 'Brewmaxx (MES)', text: `The ${H.all.holds.length} operations remain scheduled, including pitching with the FV-12 yeast` },
        { sys: 'Microsoft Teams', text: 'No notice to the cellar' }
      ],
      compare: [
        { k: 'People involved', today: '3–4: cellar operator, Head Brewer, Quality and Maintenance', now: 'The Head Brewer reviews and decides; Quality, Maintenance and Production receive the outcome' },
        { k: 'Systems checked by hand', today: '5–6: SCADA, Brewmaxx, SAP, LIMS, Maximo and the phone', now: 'None: the agents query 6 systems and every data point is logged' },
        { k: 'Steps', today: '10–12 manual steps, with waits until the morning shift', steps: true },
        { k: 'Time to hold, analyse and repair', today: '2–4 h (last night, more than 3 h off set point with no action)', measured: true },
        { k: 'Audit evidence', today: 'Scattered across the SCADA, the cellar logbook and emails', now: 'Report REG-FER-003-08, evaluation plan and audit log of the run' }
      ],
      presenter: {
        intro: () => 'Alarm at 05:50 on fermentation vessel FV-12: the Bardenas Lager wort has been at 16.8 °C against a 12 °C set point since 02:30, peaking at 17.1 at 05:20. That is 480 hl on day 3; the yeast from this tank was due to pitch FV-16 at 14:00.',
        agents: 'Five agents, each with its own system: SCADA for the temperature and the valve; Brewmaxx and SAP for the batch and plans; SAP QM and LIMS for the hold and analyses; Maximo for the work order; Brewmaxx for rescheduling.',
        waiting: (H) => [
          `FV-11 and FV-14 (${H.pl(H.sc.elseTotal)}) share the glycol loop but are on set point: they are monitored, not held. Nothing has been written to SAP QM, LIMS or Brewmaxx yet.`,
          'The scope can be edited (for example, leaving out the yeast, with a reason) or rejected: if rejected, nothing is applied and it is recorded in the audit log.'
        ],
        rejected: ['Rejected: no hold, no urgent sample, no work order and no rescheduling. The reason is recorded in the audit log.', 'The decision always rests with the Head Brewer; it can be run again at any time.'],
        done: (H) => [
          `Applied after approval: ${H.ids.ret} in SAP QM, urgent ${H.ids.mu} in the LIMS, ${H.ids.ot} for the valve in Maximo and ${H.sc.holds.length} operations rescheduled, with the evaluation plan in draft.`,
          'The deviation report comes out as a controlled document, with approvals and the run log, ready for an IFS or BRCGS audit.'
        ],
        next: { done: 'Open «Download deviation report» and then move on to the complaint (right arrow).', no_trigger: 'Go to «From words to workflow», set 120 min and run it again.' }
      }
    }
  });

  function fmtList(sc) {
    const ids = sc.items.map((l) => l.id);
    return ids.length < 2 ? (ids[0] || '') : `${ids.slice(0, -1).join(', ')} and ${ids[ids.length - 1]}`;
  }

  /* Batch evaluation plan proposed by the Quality agent. */
  function PLAN(H) {
    return [
      { d: 'P1', t: 'Containment', text: `${H.ids.ret}: ${fmtList(H.sc)} on hold in SAP QM; do not crop the yeast from the cone.`, owner: ROLE.quality_shift, due: '2026-09-29' },
      { d: 'P2', t: 'Urgent analysis', text: `${H.ids.mu}: total diacetyl (VDK), acetaldehyde, isoamyl acetate, apparent extract and pH.`, owner: ROLE.quality, due: '2026-09-29' },
      { d: 'P3', t: 'Tasting', text: 'Triangle test against the Bardenas Lager reference with the tasting panel (5 tasters).', owner: ROLE.brewmaster, due: '2026-09-29' },
      { d: 'P4', t: 'Process correction', text: 'Bring down to 12 °C gradually (max. 1 °C every 4 h) and consider an extended diacetyl rest.', owner: ROLE.brewmaster, due: '2026-09-30' },
      { d: 'P5', t: 'Decision criteria', text: 'VDK ≤ 0.10 mg/l and tasting conforming: release; above that: rest and re-analyse; off profile after 72 h: controlled blend or discard.', owner: ROLE.brewmaster, due: '2026-10-02' },
      { d: 'P6', t: 'Cause (hypothesis)', text: `Valve VG-12 stuck closed; ${H.ids.ot} checks the actuator and positioner.`, owner: ROLE.maintenance, due: '2026-09-30' },
      { d: 'P7', t: 'Prevention', text: 'Valve position vs demand alarm on every fermentation vessel and an automatic call to the cellar supervisor.', owner: ROLE.maintenance, due: '2026-10-16' },
      { d: 'P8', t: 'Close-out', text: `Close ${H.ids.nc} with the batch disposition and the valve verification.`, owner: ROLE.quality, due: '2026-10-09' }
    ];
  }
})();
