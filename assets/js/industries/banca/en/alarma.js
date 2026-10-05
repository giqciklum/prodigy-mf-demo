/* Banco Cierzo · approval alarm (English): card-not-present fraud spike on BIN 454812.
 * Fictitious bank; synthetic demo data (MFM). The functions receive the scene context H
 * (W workflow, C evaluated condition, sc current scope, ids generated on approval, fmt, fv, pl…). */
(function () {
  'use strict';

  /* CNP fraud rate of the BIN (% of transactions with a confirmed fraud score), every 5 min. */
  const KEY = [['02:00', 0.3], ['02:05', 0.4], ['02:10', 1.1], ['02:40', 1.6], ['03:20', 2.2], ['03:50', 2.7], ['04:30', 3.2], ['04:50', 3.5], ['04:55', 3.6], ['05:00', 3.4], ['05:20', 3.2], ['05:40', 3.0], ['05:50', 2.9], ['06:30', 2.5], ['07:00', 2.2]];
  const mins = (t) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
  const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  const SERIES = [];
  for (let m = mins('02:00'); m <= mins('07:00'); m += 5) {
    const i = KEY.findIndex((k) => mins(k[0]) >= m);
    const b = KEY[i];
    const a = KEY[Math.max(0, i - 1)];
    const v = mins(b[0]) === m || i === 0 ? b[1] : a[1] + (b[1] - a[1]) * (m - mins(a[0])) / (mins(b[0]) - mins(a[0]));
    SERIES.push({ time: hhmm(m), value: Math.round(v * 10) / 10 });
  }

  /* Merchant segments of the 186 suspicious transactions (214 cards, 209 customers, 41,230 €). */
  const SEG = [
    { id: 'SEG-A', title: 'High-risk online electronics', sub: '71 transactions · MCC 5732', group: 'E-commerce', group_short: 'A', count: 78, ops: 71, qty: 18940, clients: 76, hold: 'CMP-0929-1' },
    { id: 'SEG-B', title: 'Gift cards and top-ups', sub: '47 transactions · MCC 5815 and 6540', group: 'Digital goods', group_short: 'B', count: 52, ops: 47, qty: 9870, clients: 51, hold: 'CMP-0929-1' },
    { id: 'SEG-C', title: 'Crypto-assets and wallets', sub: '29 transactions · MCC 6051', group: 'Quasi-cash', group_short: 'C', count: 34, ops: 29, qty: 6150, clients: 33, hold: 'CMP-0929-2' },
    { id: 'SEG-D', title: 'Online gambling and betting', sub: '24 transactions · MCC 7995', group: 'Gambling', group_short: 'D', count: 28, ops: 24, qty: 3480, clients: 27, hold: 'CMP-0929-2' },
    { id: 'SEG-E', title: 'Card testing and first purchases', sub: '15 transactions · merchants with weak 3DS', group: 'Other', group_short: 'E', count: 22, ops: 15, qty: 2790, clients: 22, hold: 'CMP-0930-1' }
  ];
  /* Cards (masked PAN), with a deterministic split of transactions and amounts. */
  const UNITS = [];
  let seed = 454812;
  const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
  SEG.forEach((s) => {
    const w = Array.from({ length: s.count }, () => 0.4 + rnd());
    const tw = w.reduce((x, y) => x + y, 0);
    let opsLeft = s.ops;
    let eurLeft = s.qty;
    for (let i = 0; i < s.count; i += 1) {
      const last = i === s.count - 1;
      const ops = last ? opsLeft : Math.min(opsLeft, i < s.ops ? 1 : 0);
      const eur = last ? Math.round(eurLeft * 100) / 100 : Math.round((s.qty * w[i] / tw) * 100) / 100;
      opsLeft -= ops;
      eurLeft -= eur;
      UNITS.push({ item: s.id, pan: `454812******${String(Math.floor(1000 + rnd() * 8999))}`, client: `CLI-${String(4100000 + Math.floor(rnd() * 899999))}`, ops, eur: eur.toFixed(2), hold: s.hold });
    }
  });

  const ROLE = {
    fraud: 'Head of Fraud Prevention', fraud_shift: 'Fraud analyst on shift', cards: 'Head of Payments and Cards',
    sac: 'Customer Service Department (SAC)', compliance: 'Chief Compliance Officer', it_risk: 'ICT Risk (DORA)', decider: 'Head of Operations'
  };
  const TEAMS = 'Fraud and Payments · on call';
  const clients = (sc) => sc.items.reduce((s, x) => s + x.clients, 0);
  const ops = (sc) => sc.items.reduce((s, x) => s + x.ops, 0);

  agenticPackEn('banca', {
    alarma: {
      nav: 'BIN 454812 alarm',
      title: 'BIN 454812 alarm in progress',
      icon: 'shield',
      page_title: 'BIN 454812 · card-not-present fraud spike',
      alarm_id: 'ALM-FRA-0550',
      alarm_time: '05:50',
      source_system: 'Falcon Fraud',
      asset: 'BIN 454812',
      location: 'Operations Centre · Madrid',
      excursion_noun: 'anomaly',
      workflow_topic: 'card fraud prevention',
      policy_ref: 'POL-FRA-003',
      procedures: 'POL-FRA-003 · PR-TAR-007 · PR-DORA-002',
      decider_short: 'Fraud Prevention',
      approval_node: 'Fraud approval',
      measure: { short: 'CNP fraud rate', col: 'Fraud rate', unit: '%', dec: 1, icon: 'shield' },
      setpoint: 0.3,
      setpoint_label: 'usual rate',
      limit: 1,
      critical: 2.5,
      min_minutes: 30,
      interval_min: 5,
      series: SERIES,
      peak: 3.6,
      peak_time: '04:55',
      current: 2.2,
      current_time: '07:00',
      current_note: 'attack ongoing (14 attempts in the last 10 min)',
      chart: {
        title: 'BIN 454812 · card-not-present fraud rate',
        sub: 'Usual 0.3% · now 2.2% (07:00), attack ongoing',
        tab: 'Fraud rate',
        series_label: 'CNP fraud rate of the BIN (Falcon)',
        yTicks: [0, 1, 2, 3, 4],
        xTicks: ['02:00', '03:00', '04:00', '05:00', '06:00', '07:00']
      },
      event_kv: [
        ['BIN', '454812 · Tarjeta Cierzo Débito (Visa) · 61,420 active cards'],
        ['Channel', 'E-commerce, card not present (CNP)'],
        ['Detection', 'Falcon Fraud · per-transaction score and BIN rate every 5 min'],
        ['Exposure', '186 suspicious transactions · 41,230 € · 214 cards of 209 customers']
      ],
      events: [
        { time: '02:10', end: '03:40', text: 'Rate exceeds 1%: burst of 1–2 € charges (card testing) at merchants with weak authentication', ref: 'FAL-AV-0210', tone: 'warn', band: 'Card testing (micro-charges)', bandTone: 'warn' },
        { time: '02:35', text: 'Falcon opens 12 individual cases; one analyst on shift is covering the night queue', equipment: 'Falcon Fraud', tone: 'warn' },
        { time: '03:40', end: '05:50', text: 'High-value purchases of electronics, gift cards and crypto-assets using the low-risk SCA exemption', tone: 'crit', band: 'High-value purchases' },
        { time: '03:50', text: 'Rate exceeds 2.5%, the critical threshold in POL-FRA-003', ref: 'POL-FRA-003', tone: 'crit' },
        { time: '04:55', text: 'Peak of 3.6%: 73 suspicious transactions in the last hour', equipment: 'BIN 454812', tone: 'crit' },
        { time: '05:50', text: 'BIN alert ALM-FRA-0550: rate still at 2.9%; 186 suspicious transactions totalling 41,230 €', ref: 'ALM-FRA-0550', tone: 'crit' },
        { time: '06:10', text: 'Visa reports the same pattern at other Spanish issuers (network alert)', ref: 'VAA-0929-114', tone: 'brand' }
      ],
      probable_cause: 'BIN enumeration attack: card numbers are generated from the BIN and validated with 1–2 € charges at merchants with weak authentication; the valid cards are then used for high-value purchases that exploit the low-risk SCA exemption. Fraud Prevention to confirm whether there is also a common point of compromise.',
      backup: { id: 'wf-fraude-bin-respaldo', name: 'Fraud spike by BIN', version: 'v1', threshold: 1, minutes: 30, critical: 2.5, approver: ROLE.fraud },
      untouched: 'Falcon, T24, Redsys, Salesforce or Teams',
      apply_systems: 'Falcon, T24, Redsys, Salesforce FSC and Teams',
      llm_cost_usd: 0.06,
      ids: [
        { key: 'rule', prefix: 'FAL-R-2026-', start: 118, label: 'Falcon rule' },
        { key: 'blq', prefix: 'BLQ-TAR-2026-', start: 2207, label: 'Card block' },
        { key: 'reem', prefix: 'REE-2026-', start: 4471, label: 'Reissue order' },
        { key: 'exp', prefix: 'EXF-2026-', start: 902, label: 'Fraud case' }
      ],
      block_id_key: 'blq',
      proposer: 'fra',
      lanes: [
        { id: 'mon', name: 'Fraud monitor', short: 'Monitor', icon: 'activity', systems: ['Falcon Fraud'], idle: 'Confirms the anomaly against the BIN rate', gsub: 'confirms the anomaly', gsys: ['Falcon'] },
        { id: 'traz', name: 'Transaction analysis', short: 'Analysis', icon: 'git-branch', systems: ['Falcon Fraud', 'Core bancario T24', 'Redsys'], idle: 'Groups transactions, cards and customers', gsub: 'transactions, cards and customers', gsys: ['Falcon', 'T24', 'Redsys'] },
        { id: 'fra', phase: 2, name: 'Fraud', icon: 'shield', systems: ['Falcon Fraud', 'Core bancario T24'], idle: 'Prepares the rule and the block and requests approval', gsub: 'preventive rule and block', gsys: ['Falcon', 'T24'] },
        { id: 'pag', phase: 2, name: 'Payments', icon: 'repeat', systems: ['Core bancario T24', 'Redsys'], idle: 'Prepares reissue and chargebacks', gsub: 'reissue and chargebacks', gsys: ['T24', 'Redsys'] },
        { id: 'cli', phase: 2, name: 'Customers', icon: 'users', systems: ['Salesforce FSC', 'Microsoft Teams'], idle: 'Notifies cardholders by SMS and in the app', gsub: 'SMS, app and case', gsys: ['Salesforce', 'Teams'] }
      ],
      steps: {
        p1: (H) => {
          const a = H.all;
          return [
            { lane: 'mon', system: 'Falcon Fraud', verb: 'Querying', action: 'Reads the CNP fraud rate of BIN 454812 from 02:00 to 07:00, one reading every 5 min', result: `${SERIES.length} readings, no gaps · now 2.2% (07:00), attack ongoing`, ms: 1700, set: { volume: `${SERIES.length} rate readings` } },
            { lane: 'mon', system: 'Agentic Platform', eval: true, ms: 90 },
            { lane: 'mon', system: 'Falcon Fraud', verb: 'Querying', action: 'Cross-checks the anomaly with score reasons and merchants', result: 'Enumeration pattern: 1–2 € charges followed by high-value purchases using the SCA exemption: hypothesis for Fraud Prevention', tone: 'warn', ms: 1500, set: { volume: `${SERIES.length} readings · score reasons`, result: `Anomaly confirmed: ${H.C.above} min above · peak 3.6%` } },
            { lane: 'traz', system: 'Falcon Fraud', verb: 'Querying', action: 'Lists the suspicious transactions on the BIN since 02:10', result: `${ops(a)} transactions · ${H.fmt.eur(a.qty)} · ${a.count} cards`, ms: 2300, set: { volume: `${ops(a)} transactions` } },
            { lane: 'traz', system: 'Core bancario T24', verb: 'Querying', action: 'Resolves cardholder, product and status of each card', result: `${a.count} cards of ${clients(a)} customers in ${a.items.length} merchant segments`, ms: 2600, set: { volume: `${ops(a)} transactions · ${a.count} cards` }, reveal: 'lots' },
            { lane: 'traz', system: 'Falcon Fraud', verb: 'Querying', action: 'Looks for the same pattern on cards with no confirmed charge', result: `${a.elseTotal} cards to monitor · ${H.goneTotal} attempts already declined by Falcon before the alarm`, ms: 1800, reveal: 'map' },
            { lane: 'traz', system: 'Redsys', verb: 'Querying', action: 'Checks which transactions are pending clearing', result: `${a.holds.length} clearing sessions; the first, ${H.first.id}, at ${H.first.time}`, tone: 'warn', ms: 2000, set: { volume: `${ops(a)} transactions · ${a.count} cards · ${a.holds.length} sessions`, result: `First clearing at ${H.first.time}` }, milestone: 'traz', audit: { action: 'Transactions, cards and customers identified', detail: `${ops(a)} transactions totalling ${H.fmt.eur(a.qty)} · ${a.count} cards of ${clients(a)} customers · ${a.holds.length} clearing sessions` } },
            { lane: 'fra', node: 'apr', system: 'Procedimientos', verb: 'Analysing', action: 'Applies POL-FRA-003 and PR-TAR-007 to this anomaly', result: 'Preventive rule on the BIN, block and reissue of compromised cards, chargeback and cardholder notification', ms: 1300 },
            { lane: 'fra', node: 'apr', system: 'Modelo de lenguaje', verb: 'Drafting', action: 'Drafts the proposal and its rationale with the evidence', result: `Proposal: Falcon rule, block and reissue of ${a.count} cards, chargeback of ${ops(a)} transactions and notice to ${clients(a)} customers`, ms: 6600, set: { volume: `${a.count} cards · ${ops(a)} transactions` } },
            { lane: 'fra', node: 'apr', system: 'Agentic Platform', verb: 'Evaluating', action: `Requests approval from the ${H.W.approver} before writing to Falcon, T24 and Redsys`, result: 'Awaiting the Fraud Prevention decision', tone: 'warn', ms: 60, wait: 1500, set: { result: 'Proposal sent to Fraud Prevention' }, milestone: 'prop', audit: { action: 'Block and reissue proposal sent for approval', detail: `Preventive rule on BIN 454812 · ${a.count} cards · approver: ${H.W.approver}` } }
          ];
        },
        p2: (H) => {
          const sc = H.sc;
          const ids = H.ids;
          return [
            { lane: 'fra', system: 'Falcon Fraud', verb: 'Applying', action: 'Activates the preventive rule: declines CNP purchases at high-risk MCCs on BIN 454812 unless strong 3DS authentication is used', result: `${ids.rule} active · mandatory review at 72 h`, tone: 'ok', ms: 1900, milestone: 'rule', audit: { action: 'Preventive rule activated', detail: `${ids.rule} · Falcon Fraud · BIN 454812 · CNP at high-risk MCCs without strong 3DS` } },
            { lane: 'fra', system: 'Core bancario T24', verb: 'Applying', action: `Blocks the ${sc.count} compromised cards with reason "fraud"`, result: `${ids.blq} · ${sc.count} cards blocked; replacement cards do not inherit the block`, tone: 'ok', ms: 2400, set: { result: `${ids.rule} active · ${sc.count} cards blocked` }, milestone: 'blq', audit: { action: 'Cards blocked', detail: `${ids.blq} · T24 · ${sc.count} cards in ${sc.items.length} segments` } },
            { lane: 'pag', system: 'Core bancario T24', verb: 'Applying', action: `Orders the reissue of the ${sc.count} cards with a new number and express delivery`, result: `${ids.reem} · delivery in 48–72 h · virtual card in the app from today`, tone: 'ok', ms: 2100, set: { volume: `${sc.count} cards to reissue` }, milestone: 'reem', audit: { action: 'Reissue ordered', detail: `${ids.reem} · ${sc.count} cards · express delivery` } },
            { lane: 'pag', system: 'Redsys', verb: 'Applying', action: `Flags ${ops(sc)} transactions for chargeback (Visa 10.4, card-absent fraud)`, result: `Flagged in ${sc.holds.map((h) => h.id).join(', ')}`, tone: 'ok', ms: 1800, set: { volume: `${sc.count} cards · ${ops(sc)} chargebacks`, result: `${ids.reem} · ${ops(sc)} chargebacks flagged` }, milestone: 'cb', audit: { action: 'Transactions flagged for chargeback', detail: `Redsys · ${ops(sc)} transactions · ${H.fmt.eur(sc.qty)} · ${sc.holds.map((h) => h.id).join(', ')}` } },
            { lane: 'cli', system: 'Salesforce FSC', verb: 'Applying', action: 'Opens the fraud case with a provisional refund for each cardholder', result: `${ids.exp} · ${clients(sc)} customers · provisional refund by the end of the next business day (PSD2)`, tone: 'ok', ms: 1700, set: { volume: '1 case' }, milestone: 'exp', audit: { action: 'Fraud case opened', detail: `${ids.exp} · Salesforce FSC · ${clients(sc)} customers` } },
            { lane: 'cli', system: 'Salesforce FSC', verb: 'Sending', action: 'Sends an SMS and an in-app notification to the cardholders', result: `${clients(sc)} SMS and ${Math.round(clients(sc) * 0.94)} in-app notifications`, tone: 'ok', ms: 1500, set: { volume: `1 case · ${clients(sc)} notices` }, milestone: 'sms', audit: { action: 'Customers notified', detail: `Salesforce FSC · ${clients(sc)} SMS and in-app notifications` } },
            { lane: 'cli', system: 'Modelo de lenguaje', verb: 'Drafting', action: 'Drafts the response plan and the DORA assessment of the incident', result: 'Plan R1–R8 in draft · operational incident, not major under DORA', ms: 7200, milestone: 'plan', audit: { action: 'Response plan drafted', detail: `${ids.exp} · R1–R8 · DORA assessment: not major` } },
            { lane: 'cli', system: 'Microsoft Teams', verb: 'Sending', action: `Notifies the SAC, the ${ROLE.cards} and ${ROLE.it_risk}`, result: `Notice posted in the "${TEAMS}" channel`, tone: 'ok', ms: 900, wait: 1600, set: { volume: `1 case · ${clients(sc)} notices · 1 internal notice`, result: `${ids.exp} opened · customers notified` }, milestone: 'teams', audit: { action: 'Notice sent via Microsoft Teams', detail: `SAC, ${ROLE.cards} and ${ROLE.it_risk} · "${TEAMS}" channel` } }
          ];
        }
      },
      kpis: (H, held) => [
        { label: 'Suspicious transactions', value: ops(H.all), sub: `${H.fmt.eur(H.all.qty)} · ${H.all.count} cards · since 02:10`, icon: 'euro' },
        { label: 'First clearing affected', value: H.first.time, sub: `${H.first.id} · ${H.pl(H.holdCount(H.all, H.first))}${held ? ' · flagged' : ''}`, icon: 'calendar' }
      ],
      scope: {
        icon: 'ticket',
        unit: ['card', 'cards'],
        item_noun: ['segment', 'segments'],
        qty_unit: '€',
        per_square: 5,
        items: SEG.map((s, i) => Object.assign({}, s, i === 0 ? {
          elsewhere: [{ loc: 'BIN 454813', count: 41, note: 'Tarjeta Cierzo Crédito · same merchants · no charge' }]
        } : i === 4 ? {
          elsewhere: [{ loc: 'Monitoring', count: 312, note: 'cards on the BIN with a declined attempt · no charge' }],
          gone: [
            { id: 'FAL-DEN-01', date: '2026-09-29', time: '02:10', count: 64, to: 'Attempts declined by the Falcon score; no charge' },
            { id: 'FAL-DEN-02', date: '2026-09-29', time: '04:00', count: 32, to: 'Attempts declined by failed 3DS; no charge' }
          ]
        } : {})),
        holds: {
          'CMP-0929-1': { date: '2026-09-29', time: '08:00', where: 'Visa · clearing session 1', label: 'Clearing' },
          'CMP-0929-2': { date: '2026-09-29', time: '14:00', where: 'Visa · clearing session 2', label: 'Clearing' },
          'CMP-0930-1': { date: '2026-09-30', time: '08:00', where: 'Visa · clearing session 1', label: 'Clearing' }
        },
        units: UNITS,
        csv_name: 'bin-454812-fraud-cards',
        csv_cols: [
          { label: 'Segment', key: 'item' },
          { label: 'Card (masked PAN)', key: 'pan', text: true },
          { label: 'Customer', key: 'client' },
          { label: 'Transactions', key: 'ops' },
          { label: 'Amount (€)', key: 'eur' },
          { label: 'Clearing', key: 'hold' }
        ],
        labels: {
          items_title: 'Affected cards and transactions',
          items_systems: 'Falcon Fraud, T24 and Redsys',
          items_where: 'CNP transactions on BIN 454812,',
          item_col: 'Segment',
          at_col: 'Cards',
          group_col: 'Merchant type',
          hold_col: 'Clearing',
          else_col: 'Same pattern',
          else_none: 'None',
          gone_verb: 'declined',
          exposed: 'Compromised',
          blocked: 'Blocked',
          unblocked: 'Not blocked',
          block_noun: 'block',
          block_verb: 'Block',
          hold_verb: 'Flag',
          held: 'Flagged',
          holds_label: 'Clearing sessions with transactions to dispute',
          holds_first: 'the first',
          scope_main: 'Cards with suspicious transactions since 02:10',
          else_scope: 'Same pattern, no charge',
          else_decision: 'Monitor',
          map_title: 'Cards by merchant segment',
          map_sub: 'Falcon Fraud · BIN 454812',
          zone_title: 'Compromised cards by segment',
          zone_sub: '5 merchant segments',
          else_title: 'Same pattern, no confirmed charge',
          else_sub: 'to monitor, not blocked',
          gone_title: 'Attempts declined before the alarm',
          legend_exposed: 'Compromised card',
          legend_else: 'To monitor',
          csv_button: 'Download cards (CSV)',
          value_label: '',
          report_scope: 'Scope of the block and reissue'
        }
      },
      text: {
        proposal_title: 'block and reissue proposal',
        stop_without: 'proposing a rule or a block',
        activates: 'the rule or the block',
        no_proposal: 'no block proposal',
        idle_log: 'The run stops at the approval: nothing is written to Falcon, T24 or Redsys without the Fraud Prevention decision.',
        approve_action: 'Approves the rule, the block and the reissue',
        scope_short: (H) => `Falcon rule, block and reissue ${H.pl(H.sc.count)} and flag ${ops(H.sc)} transactions for chargeback`,
        audit_approved: 'Block and reissue approved',
        audit_approved_detail: (H) => `${H.ids.rule} · ${H.ids.blq} · ${H.sc.count} cards of ${clients(H.sc)} customers · ${ops(H.sc)} transactions for chargeback${H.sc.out.length ? ` · scope edited (without ${H.sc.out.map((l) => l.id).join(', ')})` : ''}`,
        outcome_approved: (H) => `Block ${H.ids.blq} approved · ${H.sc.count} cards`,
        audit_rejected: 'Block and reissue rejected',
        outcome_rejected: 'Block rejected · no actions applied',
        toast_done: (H) => `${H.ids.rule} active · ${H.sc.count} cards blocked · ${clients(H.sc)} customers notified`,
        presenter_applying: 'After approval: rule in Falcon, block and reissue in T24, chargebacks in Redsys and notice to customers.',
        reject_nothing: 'no rule in Falcon, no block or reissue in T24, no chargebacks in Redsys and no notice to customers',
        edit_intro: 'POL-FRA-003 requires blocking every card with confirmed suspicious transactions.'
      },
      approval: {
        id: 'blq-bin-454812',
        approve_label: 'Approve block and reissue',
        policy: 'POL-FRA-003 · PR-TAR-007 · PSD2',
        title: (H) => `Preventive rule and block of ${H.sc.count} cards`,
        summary: (H) => `Reason: CNP fraud rate on BIN 454812 above ${H.fv(H.C.threshold)} for ${H.C.above} min (${H.span}), longer than the ${H.C.minutes} min set by ${H.W.backup ? 'POL-FRA-003' : 'the workflow'}${H.critMin ? `, and ${H.critMin} min above ${H.fv(H.crit)}: active attack` : ''}. The compromised cards are blocked and reissued, their transactions disputed and the cardholders notified.`,
        extra_scope: (H) => [{ label: 'Preventive rule on the BIN (CNP at high-risk MCCs without strong 3DS)', value: '72 h', status: 'warn', chip: H.decision && H.decision.status === 'approved' ? 'Active' : 'Activate' }],
        effects: (H) => [
          'Falcon Fraud: preventive rule on BIN 454812 for 72 h',
          `Core bancario T24: block and reissue of ${H.sc.count} cards`,
          `Redsys: ${ops(H.sc)} transactions flagged for chargeback (Visa 10.4)`,
          `Salesforce FSC: case with provisional refund and SMS to ${clients(H.sc)} customers`,
          `Microsoft Teams: notice to the SAC, the ${ROLE.cards} and ${ROLE.it_risk}`
        ],
        applied: (H) => [
          `Falcon Fraud: ${H.ids.rule} active`,
          `Core bancario T24: ${H.ids.blq} (${H.sc.count} cards) and ${H.ids.reem}`,
          `Redsys: ${ops(H.sc)} transactions flagged in ${H.sc.holds.map((h) => h.id).join(', ')}`,
          `Salesforce FSC: ${H.ids.exp} · ${clients(H.sc)} customers notified`,
          `Microsoft Teams: notice in "${TEAMS}"`
        ]
      },
      result: {
        title: (H) => `Rule ${H.ids.rule} active, ${H.sc.count} cards blocked and ${H.ids.exp} opened`,
        stats: (H) => [
          { label: 'Cards blocked and reissued', value: H.sc.count, tone: 'crit' },
          { label: 'Transactions for chargeback', value: ops(H.sc) },
          { label: 'Customers notified', value: clients(H.sc) },
          { label: 'Cards to monitor', value: H.sc.elseTotal, tone: 'warn' }
        ],
        tiles: (H) => [
          {
            icon: 'lock', tone: 'crit', title: `Rule ${H.ids.rule} and block ${H.ids.blq}`, systems: ['Falcon Fraud', 'Core bancario T24'],
            kv: [
              ['Status', App.chip('blocked')],
              ['Rule', 'Declines CNP at high-risk MCCs on BIN 454812 without strong 3DS · 72 h'],
              ['Cards', `${H.pl(H.sc.count)} · ${H.fmt.plural(H.sc.items.length, 'segment', 'segments')}`],
              ['Exposed amount', H.fmt.eur(H.sc.qty)],
              ['Reviewer', `${ROLE.fraud} (POL-FRA-003)`]
            ],
            next: 'Next step under POL-FRA-003: review the BIN rate after 2 h and decide whether to keep or relax the rule.',
            buttons: [{ action: 'csv', label: 'Blocked cards (CSV)' }]
          },
          {
            icon: 'repeat', title: `Reissue ${H.ids.reem} and chargebacks`, systems: ['Core bancario T24', 'Redsys'], chip: ['running', 'In progress'],
            kv: [
              ['Reissue', `${H.pl(H.sc.count)} with a new number · express delivery`],
              ['Virtual card', 'Available in the app from today'],
              ['Chargebacks', `${ops(H.sc)} transactions · Visa 10.4`],
              ['Clearing', H.sc.holds.map((h) => `${h.id} (${H.holdWhen(h)})`).join(', ')],
              ['Owner', ROLE.cards]
            ]
          },
          {
            icon: 'clipboard', title: `Response plan ${H.ids.exp}`, systems: ['Salesforce FSC', 'GRC Archer'], chip: ['draft', 'Draft'],
            items: PLAN(H),
            buttons: [{ action: 'report-doc', icon: 'printer', label: 'Download response plan (PDF)' }]
          },
          {
            icon: 'send', title: 'Notice to cardholders', systems: ['Salesforce FSC'], note: H.run.endAt ? `sent at ${H.fmt.time(H.run.endAt)}` : '',
            message: {
              icon: 'message-square', from: 'Banco Cierzo', channel: `SMS to ${clients(H.sc)} customers`, at: H.run.endAt ? H.fmt.time(H.run.endAt) : '',
              paras: [
                { text: 'Banco Cierzo: we have blocked your card ending ****** because of purchases that do not look like yours. You do not need to do anything: we are sending you a new one and you can already use the virtual card in the app.' },
                { text: 'Check your transactions in the app; unrecognised charges are refunded provisionally. We will never ask you for passwords or codes by SMS or over the phone.' }
              ]
            }
          }
        ]
      },
      doc: {
        code: 'REG-FRA-003-07',
        lane: 'cli',
        heading: 'Actions R1–R8',
        col_d: 'R',
        title: (H) => `Response plan · ${H.ids.exp}`,
        subtitle: 'Fraud incident on BIN 454812 · draft for review',
        filename: (H) => `response-plan-${H.ids.exp}`,
        meta: (H) => [['Case', H.ids.exp], ['Falcon rule', H.ids.rule], ['Card block', H.ids.blq]],
        items: (H) => PLAN(H),
        reviewer: ROLE.fraud,
        approver: ROLE.compliance,
        note: 'Draft generated from the evidence of the run. The DORA assessment is preliminary: ICT Risk confirms it. Target dates are a proposal by the agent.'
      },
      report: {
        noun: 'incident report',
        code: 'INF-FRA-2026-031',
        title: 'Incident report · BIN 454812',
        subtitle: 'Card-not-present fraud spike',
        filename: 'incident-report-bin-454812',
        site_label: 'Centre',
        site: 'Operations Centre (Madrid)',
        description: (H) => `On 29/09/2026 at 05:50 Falcon Fraud raised alert ALM-FRA-0550 on BIN 454812 (Tarjeta Cierzo Débito). The card-not-present fraud rate stayed above ${H.fv(H.C.threshold)} for ${H.C.above} min (${H.span}), against the usual 0.3%, with a peak of 3.6% at 04:55, 2.9% at the time of the alert and ${H.critMin} min above ${H.fv(H.crit)}. ${ops(H.all)} suspicious transactions totalling ${H.fmt.eur(H.all.qty)} were identified on ${H.all.count} cards of ${clients(H.all)} customers.`,
        criteria: 'POL-FRA-003 (preventive rule and block of compromised cards if the CNP fraud rate of a BIN exceeds 1% for more than 30 min) and PR-TAR-007 (block and reissue with a new number; cardholder notification). Provisional refund under PSD2 (Real Decreto-ley 19/2018, the Spanish transposition of PSD2).',
        actions: (H) => [
          `Falcon Fraud · ${H.ids.rule}: preventive rule on BIN 454812 (CNP at high-risk MCCs without strong 3DS) for 72 h.`,
          `Core bancario T24 · ${H.ids.blq}: ${H.sc.count} cards blocked; ${H.ids.reem}: express reissue with a new number.`,
          `Redsys: ${ops(H.sc)} transactions (${H.fmt.eur(H.sc.qty)}) flagged for Visa 10.4 chargeback in ${H.sc.holds.map((h) => `${h.id} (${H.holdWhen(h)})`).join(', ')}.`,
          `Salesforce FSC · ${H.ids.exp}: case with provisional refund; SMS and in-app notice to ${clients(H.sc)} customers.`,
          `Microsoft Teams: notice to the SAC, the ${ROLE.cards} and ${ROLE.it_risk} in "${TEAMS}".`
        ],
        pending: () => [
          'Review the BIN rate after 2 h and 24 h; keep or relax the preventive rule.',
          'Analyse whether there is a common point of compromise and, if confirmed, open a CPP case.',
          'Confirm the DORA assessment with ICT Risk and record the incident in GRC Archer.',
          `Closure of the case and the chargebacks: ${ROLE.fraud}.`
        ],
        reviewer: ROLE.compliance,
        final_step: 'Closure of chargebacks and refunds',
        final_role: ROLE.cards,
        note: 'Document subject to review by Regulatory Compliance; it does not replace the individual resolution of each complaint.'
      },
      not_applied: (H) => [
        { sys: 'Falcon Fraud', text: 'No preventive rule on the BIN' },
        { sys: 'Core bancario T24', text: `No card blocked or reissued; all ${H.all.count} remain active` },
        { sys: 'Redsys', text: `No chargebacks; the ${H.all.holds.length} clearing sessions proceed as normal` },
        { sys: 'Salesforce FSC', text: 'No case and no notice to customers' },
        { sys: 'Microsoft Teams', text: 'No internal notice' }
      ],
      compare: [
        { k: 'People involved', today: '3–4: fraud analyst, Payments, SAC and the on-call manager', now: 'Fraud Prevention reviews and decides; Payments and SAC receive the outcome with the data' },
        { k: 'Systems checked by hand', today: '5–6: Falcon, T24, Redsys, Salesforce, GRC and email', now: 'None: the agents query 5 systems and every data point is logged' },
        { k: 'Steps', today: '12–15 manual steps, with waits until the morning shift', steps: true },
        { k: 'Time to block and notify', today: '2–4 h (tonight, more than three and a half hours of attack before the alert)', measured: true },
        { k: 'Audit evidence', today: 'Scattered across Falcon cases, emails and spreadsheets', now: 'Report INF-FRA-2026-031, response plan and audit log of the run' }
      ],
      presenter: {
        intro: () => '05:50 alert on BIN 454812: the card-not-present fraud rate went from the usual 0.3% to a peak of 3.6% at 04:55 and was still at 2.9% at 05:50. That is 186 transactions totalling 41,230 € on 214 cards; the first clearing runs at 08:00.',
        agents: 'Five agents, each with its own system: Falcon for the rate and the transactions; T24 and Redsys for cards and clearing; Falcon and T24 for the rule and the block; Salesforce and Teams for customers and the notice.',
        waiting: (H) => [
          `The ${H.sc.elseTotal} cards with the same pattern but no charge are left "to monitor": they are not blocked. Nothing has been written to Falcon, T24 or Redsys yet.`,
          'You can edit the scope (remove a segment, giving a reason) or reject: if rejected, nothing is applied and it stays in the audit log.'
        ],
        rejected: ['Rejected: no rule, block, reissue or notice. The reason is kept in the audit log.', 'The decision always belongs to Fraud Prevention; the run can be repeated at any time.'],
        done: (H) => [
          `Applied after approval: ${H.ids.rule} in Falcon, ${H.sc.count} cards blocked and reissued, ${ops(H.sc)} chargebacks flagged and ${clients(H.sc)} customers notified by SMS.`,
          'The incident report comes out as a controlled document, with the preliminary DORA assessment and the run log, ready for Compliance and internal audit.'
        ],
        next: { done: 'Open "Download incident report" and then move on to the complaint (right arrow).', no_trigger: 'Go to "From words to workflow", set 30 min and run it again.' }
      }
    }
  });

  /* Response plan proposed by the Customers agent. */
  function PLAN(H) {
    const sc = H.sc;
    return [
      { d: 'R1', t: 'Containment', text: `${H.ids.rule} active in Falcon and ${sc.count} cards blocked (${H.ids.blq}).`, owner: ROLE.fraud_shift, due: '2026-09-29' },
      { d: 'R2', t: 'Customers', text: `SMS and in-app notice to ${clients(sc)} customers; provisional refund by the end of the next business day.`, owner: ROLE.sac, due: '2026-09-30' },
      { d: 'R3', t: 'Reissue', text: `${H.ids.reem}: ${sc.count} cards with a new number and express delivery; virtual card from today.`, owner: ROLE.cards, due: '2026-10-02' },
      { d: 'R4', t: 'Chargebacks', text: `${ops(sc)} transactions flagged with Visa 10.4; dispute follow-up with each acquirer.`, owner: ROLE.cards, due: '2026-10-15' },
      { d: 'R5', t: 'Root-cause analysis', text: 'Check whether the cards share a common point of compromise or whether this is pure BIN enumeration.', owner: ROLE.fraud, due: '2026-10-01' },
      { d: 'R6', t: 'DORA assessment', text: 'Preliminary: operational incident, not major (no service disruption or loss of own data). Record it in GRC Archer.', owner: ROLE.it_risk, due: '2026-09-30' },
      { d: 'R7', t: 'Prevention', text: 'Require strong 3DS for high-risk MCCs on all debit BINs and limit consecutive 1–2 € charges.', owner: ROLE.fraud, due: '2026-10-16' },
      { d: 'R8', t: 'Closure', text: `Close ${H.ids.exp} once the chargebacks and final refunds are resolved.`, owner: ROLE.compliance, due: '2026-11-30' }
    ];
  }
})();
