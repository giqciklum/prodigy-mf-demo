/* Mora & Jordano · approval alarm (English): LexNET notice of a lawsuit against a client (PRC-2026-0412),
 * with a possible conflict of interest and the assigned associate on holiday. Synthetic demo data (MFM):
 * people, clients and matters are fictitious. The functions receive the scene context H
 * (W workflow, C evaluated condition, sc current scope, ids generated on approval, fmt, fv, pl…). */
(function () {
  'use strict';

  /* Office hours (08:00–20:00) the notice has spent without review or an effective lawyer, every 5 min.
   * The court agent’s (procurador’s) transfer reached LexNET on Monday 28/09 at 17:52: by 08:00 on Tuesday it already counts 2.1 h. */
  const OFFSET = 128; /* office minutes on Monday: 17:52 → 20:00 */
  const mins = (t) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
  const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  const SERIES = [];
  for (let m = mins('08:00'); m <= mins('11:00'); m += 5) {
    SERIES.push({ time: hhmm(m), value: Math.round(((OFFSET + m - mins('08:00')) / 60) * 10) / 10 });
  }

  /* Folders covered by the information barrier (126 documents, 181 h recorded). */
  const SEG = [
    { id: 'PRC-2026-0412', title: 'Statement of claim and served documents', sub: 'PO 1184/2026 · Court of First Instance no. 7 of Málaga · engagement not yet accepted', group: 'New engagement (defence)', group_short: 'N', count: 14, qty: 2, hold: 'PLZ-1027' },
    { id: 'MER-2025-0219', title: 'Bulk olive oil supply agreement', sub: 'Advice to Almazara Hojiblanca del Genil, S.A. · 2025', group: 'Claimant · 2025 matter', group_short: 'A', count: 38, qty: 96, hold: 'CFL-0930' },
    { id: 'MER-2025-0241', title: 'Negotiation of the distribution agreement', sub: 'Almazara Hojiblanca del Genil, S.A. · closed in Nov. 2025', group: 'Claimant · 2025 matter', group_short: 'B', count: 21, qty: 58, hold: 'CFL-0930' },
    { id: 'COM-2025-0219', title: 'Emails and internal notes of the 2025 team', sub: 'Outlook and Teams archived in iManage', group: '2025 communications', group_short: 'C', count: 47, qty: 22, hold: 'CFL-0930' },
    { id: 'FAC-2025-0219', title: '2025 engagement letter and fee notes', sub: 'Invoices F-2025-0611 and F-2025-0874', group: '2025 fees', group_short: 'D', count: 6, qty: 3, hold: 'CFL-0930' }
  ];
  /* iManage documents, with deterministic numbering and dates. */
  const KINDS = {
    'PRC-2026-0412': ['Ordinary claim (juicio ordinario)', 'Exhibit to the claim', 'Summons record', 'Power of attorney for litigation'],
    'MER-2025-0219': ['Draft agreement', 'Legal opinion', 'Meeting note', 'Price schedule', 'Signed version'],
    'MER-2025-0241': ['Draft agreement', 'Term sheet', 'Negotiation note', 'Risk report'],
    'COM-2025-0219': ['Email', 'Internal note', 'Archived Teams message'],
    'FAC-2025-0219': ['Engagement letter', 'Fee note', 'Time detail']
  };
  const UNITS = [];
  let seed = 11842026;
  const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
  let docNo = 4471203;
  SEG.forEach((s) => {
    const kinds = KINDS[s.id];
    const year = s.id === 'PRC-2026-0412' ? 2026 : 2025;
    for (let i = 0; i < s.count; i += 1) {
      docNo += 1 + Math.floor(rnd() * 37);
      const month = year === 2026 ? 9 : 2 + Math.floor(rnd() * 9);
      const day = year === 2026 ? 28 : 1 + Math.floor(rnd() * 27);
      UNITS.push({ item: s.id, doc: `MJ-${docNo}.${1 + Math.floor(rnd() * 3)}`, kind: kinds[i % kinds.length], date: `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`, hold: s.hold });
    }
  });

  const ROLE = {
    decider: 'Managing Partner', procesal: 'Head of Litigation (partner)', procesal_staff: 'Senior Associate, Litigation',
    absent: 'Litigation Associate at the Córdoba office', mercantil: 'Head of Corporate and Commercial (partner)',
    compliance: 'Compliance Officer (AML and GDPR)', client_care: 'Client Care and Billing', it: 'IT and Information Security'
  };
  const TEAMS = 'Litigation · deadlines and notices';
  const CLIENT = 'Aceites Sierra Subbética, S.L.';
  const PLAINTIFF = 'Almazara Hojiblanca del Genil, S.A.';
  const hours = (sc) => sc.items.reduce((s, x) => s + x.qty, 0);
  const old = (sc) => sc.items.filter((x) => x.id !== 'PRC-2026-0412');

  agenticPackEn('abogados', {
    alarma: {
      nav: 'LexNET alarm PRC-2026-0412',
      title: 'LexNET alarm PRC-2026-0412 in progress',
      icon: 'scale',
      page_title: 'PRC-2026-0412 · lawsuit served via LexNET with no lawyer and no conflict check',
      alarm_id: 'ALM-LEX-1025',
      alarm_time: '10:25',
      source_system: 'LexNET',
      asset: 'LexNET notice · PO 1184/2026',
      location: 'Málaga office · Litigation',
      excursion_noun: 'unattended notice',
      workflow_topic: 'LexNET notices',
      policy_ref: 'PRO-PLZ-001',
      procedures: 'PRO-PLZ-001 · POL-CON-002 · POL-HON-004',
      decider_short: 'Managing Partner',
      decider_of: 'of the Managing Partner',
      approval_node: 'Managing Partner approval',
      measure: { short: 'hours without review or assignment', col: 'Hours unattended', unit: 'h', dec: 1, icon: 'clock' },
      setpoint: 2,
      setpoint_label: 'review target',
      limit: 4,
      critical: 5,
      min_minutes: 30,
      interval_min: 5,
      series: SERIES,
      peak: 5.1,
      peak_time: '11:00',
      current: 5.1,
      current_time: '11:00',
      current_note: 'still no effective lawyer and the conflict unresolved',
      chart: {
        title: 'Notice PO 1184/2026 · office hours unattended',
        sub: 'Target 2 h · limit 4 h (PRO-PLZ-001) · now 5.1 h (11:00)',
        tab: 'Hours unattended',
        series_label: 'Office hours without review or an effective lawyer (Gestor de expedientes)',
        yTicks: [0, 1, 2, 3, 4, 5, 6],
        xTicks: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00']
      },
      event_kv: [
        ['Notice', 'LexNET · transfer from the court agent (procurador) on 28/09/2026 at 17:52 · entered the matter manager at 08:12'],
        ['Proceedings', 'Ordinary proceedings (juicio ordinario) 1184/2026 · Court of First Instance no. 7 of Málaga · claim for 412,680 € for breach of a supply agreement'],
        ['Parties', `Defendant: ${CLIENT} (client) · Claimant: ${PLAINTIFF}`],
        ['Deadline', 'Defence within 20 business days (art. 404 LEC, Civil Procedure Act): due 27/10/2026 · grace day until 15:00 on 28/10 (art. 135.5 LEC)']
      ],
      events: [
        { time: '08:00', end: '08:40', text: 'The notice has been waiting in the litigation secretariat inbox since Monday at 17:52 (after secretariat hours)', ref: 'LEX-0928-1752', tone: 'warn', band: 'Not reviewed', bandTone: 'warn' },
        { time: '08:12', text: 'The matter manager registers the notice and opens matter PRC-2026-0412 as “pending acceptance”', equipment: 'Gestor de expedientes', tone: 'brand' },
        { time: '08:40', end: '11:00', text: `Automatic allocation to the ${ROLE.absent}: out-of-office reply, on holiday until 13/10 with no designated substitute`, tone: 'crit', band: 'Assigned to an absent lawyer' },
        { time: '09:05', text: `The conflict check finds ${PLAINTIFF} as a client of the Corporate area in 2025 (MER-2025-0219 and MER-2025-0241)`, ref: 'POL-CON-002', tone: 'crit' },
        { time: '09:55', text: 'The notice exceeds 4 office hours without review, the PRO-PLZ-001 limit', ref: 'PRO-PLZ-001', tone: 'warn' },
        { time: '10:25', text: 'Alarm ALM-LEX-1025: more than 30 min above the limit, with no effective lawyer and a possible conflict of interest', ref: 'ALM-LEX-1025', tone: 'crit' },
        { time: '10:40', text: `The CFO of ${CLIENT} emails to ask whether the firm has received the lawsuit`, equipment: 'Outlook', tone: 'brand' },
        { time: '10:55', text: 'Exceeds 5 h unattended: critical level, partner alert under PRO-PLZ-001', ref: 'PRO-PLZ-001', tone: 'crit' }
      ],
      probable_cause: 'The notice arrived on Monday afternoon, after litigation secretariat hours, and the automatic allocation assigned it by workload to an associate who is on holiday, without checking the absence calendar. In addition, the POL-CON-002 conflict check only runs when an engagement is accepted, not when a notice arrives: in 2025 the firm advised the claimant on the very supply agreement now in dispute, with a risk of using a former client’s confidential information (art. 12 of the Spanish Bar Code of Conduct). To be confirmed by the conflicts committee.',
      backup: { id: 'wf-notificacion-lexnet-respaldo', name: 'Unattended LexNET notice', version: 'v1', threshold: 4, minutes: 30, critical: 5, approver: ROLE.decider },
      untouched: 'the matter manager, iManage, Outlook or Teams',
      apply_systems: 'iManage, Gestor de expedientes, Outlook and Microsoft Teams',
      llm_cost_usd: 0.07,
      ids: [
        { key: 'bar', prefix: 'BAR-2026-', start: 31, label: 'Information barrier' },
        { key: 'cfl', prefix: 'CFL-2026-', start: 118, label: 'Conflict file' },
        { key: 'plz', prefix: 'PLZ-2026-', start: 2291, label: 'Deadline in diary' },
        { key: 'com', prefix: 'COM-CLI-2026-', start: 640, label: 'Client communication' }
      ],
      block_id_key: 'bar',
      proposer: 'enc',
      lanes: [
        { id: 'mon', name: 'Notice monitor', short: 'Monitor', icon: 'inbox', systems: ['LexNET', 'Gestor de expedientes'], idle: 'Confirms the notice is still unattended', gsub: 'confirms the notice', gsys: ['LexNET', 'Gestor'] },
        { id: 'traz', name: 'Conflicts and documents', short: 'Conflicts', icon: 'git-branch', systems: ['Gestor de expedientes', 'iManage', 'Outlook'], idle: 'Identifies the matter, checks conflicts and computes the deadline', gsub: 'matter, conflicts and deadline', gsys: ['Gestor', 'iManage', 'Outlook'] },
        { id: 'enc', phase: 2, name: 'Engagement acceptance', short: 'Engagement', icon: 'scale', systems: ['Gestor de expedientes', 'iManage', 'Aranzadi'], idle: 'Prepares the barrier and reassignment and requests approval', gsub: 'barrier and reassignment', gsys: ['Gestor', 'iManage'] },
        { id: 'plz', phase: 2, name: 'Deadlines', icon: 'calendar', systems: ['Gestor de expedientes', 'Outlook'], idle: 'Records the deadline and alerts in the diary', gsub: 'deadline and alerts', gsys: ['Gestor', 'Outlook'] },
        { id: 'cli', phase: 2, name: 'Client', icon: 'users', systems: ['Outlook', 'Microsoft Teams'], idle: 'Informs the client and alerts the team', gsub: 'communication and alert', gsys: ['Outlook', 'Teams'] }
      ],
      steps: {
        p1: (H) => {
          const a = H.all;
          return [
            { lane: 'mon', system: 'LexNET', verb: 'Querying', action: 'Reads the firm’s LexNET inbox and the receipt for the PO 1184/2026 notice', result: 'Court agent transfer of 28/09 at 17:52 · claim and 13 documents · effective 28/09', ms: 1600, set: { volume: '1 notice · 14 documents' } },
            { lane: 'mon', system: 'Agentic Platform', eval: true, ms: 90 },
            { lane: 'mon', system: 'Gestor de expedientes', verb: 'Querying', action: 'Checks who it is assigned to and whether anyone has reviewed it', result: `Assigned at 08:40 to the ${ROLE.absent}, on holiday until 13/10 · nobody has opened it`, tone: 'warn', ms: 1400, set: { volume: `${SERIES.length} readings · 1 notice`, result: `Unattended: ${H.C.above} min above ${H.fv(H.C.threshold)}` } },
            { lane: 'traz', system: 'Gestor de expedientes', verb: 'Querying', action: 'Identifies the matter, the client and the parties', result: `PRC-2026-0412 · ${CLIENT} (defendant) · claimant ${PLAINTIFF}`, ms: 1900, set: { volume: '1 matter · 2 parties' } },
            { lane: 'traz', system: 'Gestor de expedientes', verb: 'Querying', action: 'Searches the parties among clients, opponents and matters of the last 5 years (POL-CON-002)', result: 'Match: in 2025 the firm advised the claimant on the same supply agreement (MER-2025-0219 and MER-2025-0241)', tone: 'warn', ms: 2400, set: { volume: '1 matter · 2 matters from 2025' }, reveal: 'lots' },
            { lane: 'traz', system: 'iManage', verb: 'Querying', action: 'Locates the documents of the 2025 matters and who had access', result: `${a.count} documents in ${a.items.length} folders · ${H.fmt.num(hours(a))} h recorded · 7 professionals with access, 2 of them on the planned defence team`, ms: 2600, set: { volume: `${a.count} documents · ${a.items.length} folders` } },
            { lane: 'traz', system: 'Outlook', verb: 'Querying', action: 'Looks for copies of those matters outside iManage', result: `${a.elseTotal} items in mailboxes and Teams · ${H.goneTotal} documents handed to the claimant on closing in 2025`, ms: 1800, reveal: 'map' },
            { lane: 'traz', system: 'Gestor de expedientes', verb: 'Calculating', action: 'Computes the defence deadline with the court calendar (August non-business, national, Andalusian and Málaga local holidays)', result: '20 business days from 29/09 to 27/10 (excludes weekends and 12/10) · grace day until 15:00 on 28/10', tone: 'warn', ms: 1500, set: { volume: `${a.count} documents · ${a.holds.length} milestones`, result: `First milestone: ${H.first.id}, ${H.holdWhen(H.first)}` }, milestone: 'traz', audit: { action: 'Matter, conflict and deadline identified', detail: `PRC-2026-0412 · possible conflict with ${PLAINTIFF} (client in 2025) · ${a.count} documents affected · defence due 27/10/2026` } },
            { lane: 'enc', node: 'apr', system: 'Procedimientos', verb: 'Analysing', action: 'Applies POL-CON-002, PRO-PLZ-001 and art. 12 of the Spanish Bar Code of Conduct', result: 'Do not accept the engagement without a Managing Partner decision; information barrier over the 2025 matters and a defence team unrelated to them', ms: 1300 },
            { lane: 'enc', node: 'apr', system: 'Aranzadi', verb: 'Querying', action: 'Searches ethics guidance on acting against a former client in a related matter', result: '4 bar ethics committee rulings: the risk lies in the use of confidential information, not merely in the passage of time', ms: 2100 },
            { lane: 'enc', node: 'apr', system: 'Modelo de lenguaje', verb: 'Drafting', action: 'Drafts the proposal and its rationale with the evidence', result: `Proposal: barrier over ${a.count} documents, engagement on hold until the committee, reassignment to the ${ROLE.procesal_staff}, deadline in the diary and client communication`, ms: 6400, set: { volume: `${a.count} documents · 1 engagement` } },
            { lane: 'enc', node: 'apr', system: 'Agentic Platform', verb: 'Evaluating', action: `Requests approval from the ${H.W.approver} before writing to iManage and the matter manager and before telling the client anything`, result: 'Waiting for the Managing Partner’s decision', tone: 'warn', ms: 60, wait: 1500, set: { result: 'Proposal sent to the Managing Partner' }, milestone: 'prop', audit: { action: 'Barrier, reassignment and communication proposal sent for approval', detail: `PRC-2026-0412 · ${a.count} documents · approver ${H.W.approver} (POL-CON-002)` } }
          ];
        },
        p2: (H) => {
          const sc = H.sc;
          const ids = H.ids;
          return [
            { lane: 'enc', system: 'iManage', verb: 'Applying', action: `Creates the information barrier over ${sc.count} documents: only the Managing Partner and Compliance can open them`, result: `${ids.bar} active · the 7 professionals of the 2025 team are excluded from matter PRC-2026-0412`, tone: 'ok', ms: 2100, milestone: 'bar', audit: { action: 'Information barrier activated', detail: `${ids.bar} · iManage · ${sc.count} documents in ${sc.items.length} folders` } },
            { lane: 'enc', system: 'Gestor de expedientes', verb: 'Applying', action: 'Keeps PRC-2026-0412 “pending acceptance” and opens the conflict file for the committee', result: `${ids.cfl} · conflicts committee on 30/09 at 10:00 · no engagement letter until it decides (POL-HON-004)`, tone: 'ok', ms: 1700, set: { result: `${ids.bar} active · ${ids.cfl} open` }, milestone: 'cfl', audit: { action: 'Conflict file opened', detail: `${ids.cfl} · Gestor de expedientes · engagement PRC-2026-0412 on hold` } },
            { lane: 'enc', system: 'Gestor de expedientes', verb: 'Applying', action: `Reassigns the notice to the ${ROLE.procesal_staff}, unrelated to the 2025 matters`, result: `Effective lawyer assigned · supervised by the ${ROLE.procesal} · the ${ROLE.absent} is removed from allocation until 13/10`, tone: 'ok', ms: 1200, milestone: 'reas', audit: { action: 'Notice reassigned', detail: `PRC-2026-0412 · ${ROLE.procesal_staff} · supervised by the ${ROLE.procesal}` } },
            { lane: 'plz', system: 'Gestor de expedientes', verb: 'Applying', action: 'Records the defence deadline with alerts at 10, 5 and 2 business days', result: `${ids.plz} · due 27/10/2026 · grace day until 15:00 on 28/10`, tone: 'ok', ms: 1500, set: { volume: '1 deadline · 3 alerts' }, milestone: 'plz', audit: { action: 'Procedural deadline recorded', detail: `${ids.plz} · defence PO 1184/2026 · 27/10/2026 · PRO-PLZ-001` } },
            { lane: 'plz', system: 'Outlook', verb: 'Applying', action: 'Blocks the conflicts committee and the drafting dates in the diary', result: 'Committee 30/09 10:00 · draft defence 19/10 · partner review 23/10', tone: 'ok', ms: 1100, set: { volume: '1 deadline · 3 alerts · 3 appointments', result: `${ids.plz} in the diary` }, milestone: 'agenda', audit: { action: 'Diary updated', detail: `Outlook · ${ROLE.decider}, ${ROLE.procesal} and ${ROLE.procesal_staff}` } },
            { lane: 'cli', system: 'Modelo de lenguaje', verb: 'Drafting', action: 'Drafts the client communication and the engagement action plan', result: 'Email to the client with the deadline and next steps · plan A1–A8 in draft', ms: 6800, milestone: 'plan', audit: { action: 'Action plan drafted', detail: `${ids.cfl} · A1–A8 · client communication reviewed by the ${ROLE.decider}` } },
            { lane: 'cli', system: 'Outlook', verb: 'Sending', action: `Sends the communication to the CFO of ${CLIENT}`, result: `${ids.com} · sent and filed in iManage under PRC-2026-0412`, tone: 'ok', ms: 1300, set: { volume: '1 client communication' }, milestone: 'com', audit: { action: 'Client informed', detail: `${ids.com} · Outlook · ${CLIENT} · no data about the former client` } },
            { lane: 'cli', system: 'Microsoft Teams', verb: 'Sending', action: `Alerts the ${ROLE.procesal}, the ${ROLE.procesal_staff} and the ${ROLE.compliance}`, result: `Alert posted in the “${TEAMS}” channel`, tone: 'ok', ms: 900, wait: 1600, set: { volume: '1 communication · 1 internal alert', result: `${ids.com} sent · team alerted` }, milestone: 'teams', audit: { action: 'Alert sent via Microsoft Teams', detail: `${ROLE.procesal}, ${ROLE.procesal_staff} and ${ROLE.compliance} · “${TEAMS}” channel` } }
          ];
        }
      },
      kpis: (H, held) => [
        { label: 'Documents affected by the conflict', value: H.all.count, sub: `${H.fmt.num(hours(H.all))} h recorded · ${old(H.all).length} folders from 2025 plus the claim`, icon: 'file-text' },
        { label: 'First engagement milestone', value: H.holdWhen(H.first), sub: `${H.first.id} · ${H.pl(H.holdCount(H.all, H.first))}${held ? ' · recorded' : ''} · defence due 27/10`, icon: 'calendar' }
      ],
      scope: {
        icon: 'file-text',
        unit: ['document', 'documents'],
        item_noun: ['folder', 'folders'],
        qty_unit: 'h',
        per_square: 2,
        items: SEG.map((s, i) => Object.assign({}, s, i === 1 ? {
          elsewhere: [{ loc: 'Teams · Corporate channel', count: 9, note: 'drafts shared in 2025, not filed in iManage' }],
          gone: [{ id: 'ENT-2025-1104', date: '2025-11-04', time: '12:30', count: 12, to: 'Handed to the claimant on closing the matter (copy in their possession)' }]
        } : i === 3 ? {
          elsewhere: [{ loc: 'Outlook mailboxes', count: 23, note: '2025 emails outside iManage in personal mailboxes' }]
        } : i === 4 ? {
          gone: [{ id: 'ENT-2025-1128', date: '2025-11-28', time: '09:15', count: 4, to: 'Fee notes sent to the claimant (originals in their possession)' }]
        } : {})),
        holds: {
          'CFL-0930': { date: '2026-09-30', time: '10:00', where: 'Conflicts committee · decision under POL-CON-002', label: 'Committee' },
          'PLZ-1027': { date: '2026-10-27', time: '23:59', where: 'Defence due (art. 404 LEC) · grace until 15:00 on 28/10', label: 'Deadline' }
        },
        units: UNITS,
        csv_name: 'documents-barrier-prc-2026-0412',
        csv_cols: [
          { label: 'Folder', key: 'item' },
          { label: 'Document (iManage)', key: 'doc', text: true },
          { label: 'Type', key: 'kind' },
          { label: 'Date', key: 'date', text: true },
          { label: 'Milestone', key: 'hold' }
        ],
        labels: {
          items_title: 'Documents affected by the possible conflict',
          items_systems: 'Gestor de expedientes, iManage and Outlook',
          items_where: 'notice unattended',
          item_col: 'Folder',
          at_col: 'Documents',
          group_col: 'Matter',
          hold_col: 'Milestone',
          else_col: 'Copies outside iManage',
          else_none: 'None',
          gone_verb: 'handed over',
          exposed: 'Accessible',
          blocked: 'Behind the barrier',
          unblocked: 'No barrier',
          block_noun: 'information barrier',
          block_verb: 'Isolate',
          hold_verb: 'Record',
          held: 'Recorded',
          holds_label: 'Milestones that condition the engagement',
          holds_first: 'the first',
          scope_main: 'Documents of the claim and of the claimant’s 2025 matters',
          else_scope: 'Copies outside iManage',
          else_decision: 'Review',
          map_title: 'Documents by folder',
          map_sub: 'iManage · PRC-2026-0412 and 2025 matters',
          zone_title: 'Documents to isolate by folder',
          zone_sub: '5 folders',
          else_title: 'Copies outside iManage',
          else_sub: 'for IT to review, no barrier',
          gone_title: 'Documents handed over before the alarm',
          legend_exposed: 'Accessible document',
          legend_else: 'To review',
          csv_button: 'Download documents (CSV)',
          value_label: '',
          report_scope: 'Scope of the information barrier'
        }
      },
      text: {
        proposal_title: 'barrier, reassignment and client communication proposal',
        stop_without: 'proposing a barrier or a client communication',
        activates: 'the barrier or the client communication',
        no_proposal: 'no proposal on the engagement',
        idle_log: 'The run stops at the approval: nothing is written to iManage or the matter manager, and nothing is said to the client, without the Managing Partner’s decision.',
        approve_action: 'Approves the barrier, the reassignment and the client communication',
        scope_short: (H) => `barrier over ${H.pl(H.sc.count)}, engagement on hold until the committee, reassignment to the ${ROLE.procesal_staff} and communication to ${CLIENT}`,
        audit_approved: 'Barrier, reassignment and communication approved',
        audit_approved_detail: (H) => `${H.ids.bar} · ${H.ids.cfl} · ${H.sc.count} documents in ${H.sc.items.length} folders · deadline ${H.ids.plz}${H.sc.out.length ? ` · scope edited (without ${H.sc.out.map((l) => l.id).join(', ')})` : ''}`,
        outcome_approved: (H) => `Barrier ${H.ids.bar} approved · ${H.sc.count} documents`,
        audit_rejected: 'Barrier, reassignment and communication rejected',
        outcome_rejected: 'Proposal rejected · no actions applied',
        toast_done: (H) => `${H.ids.bar} active · deadline ${H.ids.plz} recorded · client informed (${H.ids.com})`,
        presenter_applying: 'After approval: barrier in iManage, engagement on hold and reassignment in the matter manager, deadline in the diary and client communication.',
        reject_nothing: 'no barrier in iManage, no reassignment or deadline in the matter manager, no client communication and no team alert',
        edit_intro: 'POL-CON-002 requires isolating every document of the matters related to the former client.'
      },
      approval: {
        id: 'bar-prc-2026-0412',
        approve_label: 'Approve barrier and communication',
        policy: 'POL-CON-002 · PRO-PLZ-001 · art. 12 of the Bar Code of Conduct',
        title: (H) => `Information barrier over ${H.sc.count} documents and client communication`,
        summary: (H) => `Reason: the PO 1184/2026 notice has been more than ${H.fv(H.C.threshold)} of office time without review or assignment for ${H.C.above} min (${H.span}), longer than the ${H.C.minutes} min set by ${H.W.backup ? 'PRO-PLZ-001' : 'the workflow'}${H.critMin ? `, and ${H.critMin} min above ${H.fv(H.crit)}: critical level` : ''}. In addition, in 2025 the firm advised the claimant on the same agreement. The documents are isolated, the engagement is put on hold until the committee, the matter is reassigned to a lawyer unrelated to 2025 and the client is informed of the deadline.`,
        extra_scope: (H) => [{ label: 'Engagement PRC-2026-0412 on hold until the conflicts committee (POL-CON-002)', value: '30/09 10:00', status: 'warn', chip: H.decision && H.decision.status === 'approved' ? 'On hold' : 'Put on hold' }],
        effects: (H) => [
          `iManage: information barrier over ${H.sc.count} documents`,
          `Gestor de expedientes: engagement on hold, conflict file and reassignment to the ${ROLE.procesal_staff}`,
          'Gestor de expedientes and Outlook: defence deadline 27/10/2026 with alerts',
          `Outlook: communication to the CFO of ${CLIENT}`,
          `Microsoft Teams: alert to the ${ROLE.procesal} and the ${ROLE.compliance}`
        ],
        applied: (H) => [
          `iManage: ${H.ids.bar} active`,
          `Gestor de expedientes: ${H.ids.cfl} and reassignment to the ${ROLE.procesal_staff}`,
          `Gestor de expedientes: ${H.ids.plz} · due 27/10/2026`,
          `Outlook: ${H.ids.com} sent to ${CLIENT}`,
          `Microsoft Teams: alert in “${TEAMS}”`
        ]
      },
      result: {
        title: (H) => `Barrier ${H.ids.bar} active, deadline ${H.ids.plz} recorded and client informed`,
        stats: (H) => [
          { label: 'Documents behind the barrier', value: H.sc.count, tone: 'crit' },
          { label: 'Business days to file the defence', value: 20 },
          { label: 'Professionals excluded', value: 7 },
          { label: 'Copies to review', value: H.sc.elseTotal, tone: 'warn' }
        ],
        tiles: (H) => [
          {
            icon: 'lock', tone: 'crit', title: `Barrier ${H.ids.bar} and file ${H.ids.cfl}`, systems: ['iManage', 'Gestor de expedientes'],
            kv: [
              ['Status', App.chip('blocked')],
              ['Barrier', 'Only the Managing Partner and Compliance can open the 2025 documents · 7 professionals excluded'],
              ['Documents', `${H.pl(H.sc.count)} · ${H.fmt.plural(H.sc.items.length, 'folder', 'folders')}`],
              ['Hours recorded', `${H.fmt.num(hours(H.sc))} h`],
              ['Decides', `${ROLE.decider}, with the conflicts committee (POL-CON-002)`]
            ],
            next: 'Next step under POL-CON-002: the 30/09 committee decides whether to accept the engagement with the barrier or decline it and help the client find another firm in time.',
            buttons: [{ action: 'csv', label: 'Documents behind the barrier (CSV)' }]
          },
          {
            icon: 'calendar', title: `Deadline ${H.ids.plz} and reassignment`, systems: ['Gestor de expedientes', 'Outlook'], chip: ['running', 'In progress'],
            kv: [
              ['Due date', '27/10/2026 · grace day until 15:00 on 28/10 (art. 135.5 LEC)'],
              ['Computation', '20 business days from 29/09 · excludes weekends and 12/10'],
              ['Alerts', '13/10, 20/10 and 23/10 (10, 5 and 2 business days)'],
              ['Milestones', H.sc.holds.map((h) => `${h.id} (${H.holdWhen(h)})`).join(', ')],
              ['Lawyer', `${ROLE.procesal_staff} · supervised by the ${ROLE.procesal}`]
            ]
          },
          {
            icon: 'clipboard', title: `Action plan ${H.ids.cfl}`, systems: ['Gestor de expedientes', 'iManage'], chip: ['draft', 'Draft'],
            items: PLAN(H),
            buttons: [{ action: 'report-doc', icon: 'printer', label: 'Download action plan (PDF)' }]
          },
          {
            icon: 'send', title: 'Client communication', systems: ['Outlook'], note: H.run.endAt ? `sent at ${H.fmt.time(H.run.endAt)}` : '',
            message: {
              icon: 'mail', from: 'Mora & Jordano', channel: `Email to the CFO of ${CLIENT}`, at: H.run.endAt ? H.fmt.time(H.run.endAt) : '',
              paras: [
                { text: 'We have received the ordinary claim 1184/2026 from Court of First Instance no. 7 of Málaga. The deadline to file the defence is 27 October and it is already recorded and monitored; there is nothing you need to do for now.' },
                { text: 'Before formally accepting the defence we are completing our internal conflict-of-interest check. We will confirm our decision tomorrow, 30 September, before 14:00, leaving ample time in any case to prepare the defence. In the meantime, please keep all documentation relating to the supply agreement.' }
              ]
            }
          }
        ]
      },
      doc: {
        code: 'REG-CON-002-04',
        lane: 'enc',
        heading: 'Actions A1–A8',
        col_d: 'A',
        title: (H) => `Engagement action plan · ${H.ids.cfl}`,
        subtitle: 'PRC-2026-0412 · lawsuit served with a possible conflict of interest · draft for review',
        filename: (H) => `action-plan-${H.ids.cfl}`,
        meta: (H) => [['Conflict file', H.ids.cfl], ['Information barrier', H.ids.bar], ['Deadline in diary', H.ids.plz]],
        items: (H) => PLAN(H),
        reviewer: ROLE.procesal,
        approver: ROLE.decider,
        note: 'Draft generated from the evidence of the run. The conflict assessment is preliminary: the conflicts committee decides with the Managing Partner. Target dates are the agent’s proposal.'
      },
      report: {
        noun: 'incident report',
        code: 'INF-PLZ-2026-014',
        title: 'Incident report · notice PO 1184/2026',
        subtitle: 'Unattended notice with a possible conflict of interest',
        filename: 'incident-report-prc-2026-0412',
        site_label: 'Office',
        site: 'Málaga office (Calle Linaje 3) · Litigation',
        description: (H) => `On 29/09/2026 at 10:25 alarm ALM-LEX-1025 was raised on the LexNET notice of ordinary proceedings 1184/2026 (Court of First Instance no. 7 of Málaga) against ${CLIENT}. The court agent’s transfer arrived on 28/09 at 17:52 and the notice spent ${H.C.above} min above ${H.fv(H.C.threshold)} of office time without review or assignment (${H.span}), with ${H.critMin} min above ${H.fv(H.crit)}. The allocation assigned it to an associate on holiday and the conflict check found that in 2025 the firm advised the claimant, ${PLAINTIFF}. ${H.all.count} affected documents were identified in ${H.all.items.length} folders (${H.fmt.num(hours(H.all))} h recorded).`,
        criteria: 'PRO-PLZ-001 (review and assign every LexNET notice within 4 office hours; partner alert above 5 h; business-day computation under arts. 130–136 LEC, with August non-business) and POL-CON-002 (conflict check before accepting an engagement; information barrier and Managing Partner decision when acting against a former client), applying art. 12 of the Spanish Bar Code of Conduct (Código Deontológico de la Abogacía Española) and the General Statute of the Legal Profession (RD 135/2021).',
        actions: (H) => [
          `iManage · ${H.ids.bar}: information barrier over ${H.sc.count} documents in ${H.sc.items.length} folders; 7 professionals excluded.`,
          `Gestor de expedientes · ${H.ids.cfl}: engagement PRC-2026-0412 on hold until the conflicts committee on 30/09 at 10:00.`,
          `Gestor de expedientes: notice reassigned to the ${ROLE.procesal_staff}, supervised by the ${ROLE.procesal}.`,
          `Gestor de expedientes and Outlook · ${H.ids.plz}: defence due 27/10/2026 (grace day until 15:00 on 28/10), with alerts at 10, 5 and 2 business days; milestones ${H.sc.holds.map((h) => `${h.id} (${H.holdWhen(h)})`).join(', ')}.`,
          `Outlook · ${H.ids.com}: client communication; Microsoft Teams: alert in “${TEAMS}”.`
        ],
        pending: () => [
          '30/09 conflicts committee: accept the engagement with a barrier, or decline it and help with the change of firm without prejudicing the deadline.',
          'If accepted: engagement letter signed via Signaturit (POL-HON-004) and client due diligence up to date (MAN-PBC-003).',
          'Review with IT the 32 copies outside iManage and file them behind the barrier.',
          `Fix the automatic allocation so it checks the absence calendar and runs the conflict check when a notice arrives: ${ROLE.it}.`
        ],
        reviewer: ROLE.compliance,
        final_step: 'Decision on accepting the engagement',
        final_role: ROLE.decider,
        note: 'Internal document subject to professional secrecy; not shared with the client or third parties.'
      },
      not_applied: (H) => [
        { sys: 'iManage', text: `No barrier: the ${H.all.count} documents remain accessible to the 2025 team` },
        { sys: 'Gestor de expedientes', text: 'The notice is still assigned to an absent associate; no conflict file and no deadline recorded' },
        { sys: 'Outlook', text: 'No client communication and no diary appointments' },
        { sys: 'Microsoft Teams', text: 'No internal alert' }
      ],
      compare: [
        { k: 'People involved', today: '4–5: litigation secretariat, associate, Litigation partner, Compliance and Managing Partner', now: 'The Managing Partner reviews and decides; Litigation and the client receive the outcome with the data' },
        { k: 'Systems checked by hand', today: '5: LexNET, matter manager, iManage, Outlook and absence calendar', now: 'None: the agents query 5 systems and every data point is logged' },
        { k: 'Steps', today: '10–14 manual steps, with waits between secretariat and lawyers', steps: true },
        { k: 'Time to have a lawyer, a deadline and a conflict check', today: '1–2 days (here, more than 5 office hours without anyone opening it)', measured: true },
        { k: 'Audit evidence', today: 'Scattered across emails, the matter manager and loose committee notes', now: 'Report INF-PLZ-2026-014, action plan and the run’s audit log' }
      ],
      presenter: {
        intro: () => 'Alarm at 10:25: the ordinary claim 1184/2026 against Aceites Sierra Subbética arrived via LexNET on Monday at 17:52 and has gone more than 4 office hours without anyone reviewing it. It was assigned to an associate on holiday and, on top of that, the firm advised the claimant in 2025. The defence is due on 27 October.',
        agents: 'Five agents, each with its own system: LexNET and the matter manager for the notice; matter manager, iManage and Outlook for conflicts, documents and deadline; iManage and the matter manager for the barrier and reassignment; Outlook and Teams for the client and the team.',
        waiting: (H) => [
          `The ${H.sc.elseTotal} copies outside iManage stay “to review”: they are not behind the barrier. Nothing has been written to iManage or the matter manager yet, and nothing has been said to the client.`,
          'You can edit the scope (remove a folder, with a reason) or reject: if rejected, nothing is applied and it is logged in the audit trail.'
        ],
        rejected: ['Rejected: no barrier, reassignment, recorded deadline or client communication. The reason is logged in the audit trail.', 'Accepting an engagement and speaking to the client is always the Managing Partner’s decision; it can be run again at any time.'],
        done: (H) => [
          `Applied after approval: ${H.ids.bar} in iManage over ${H.sc.count} documents, engagement on hold with ${H.ids.cfl}, notice reassigned, deadline ${H.ids.plz} until 27/10 and client informed.`,
          'The incident report comes out as a controlled document, with the deadline computation and the run log, ready for the conflicts committee.'
        ],
        next: { done: 'Open “Download incident report” and then move on to the complaint (right arrow).', no_trigger: 'Go to “From words to workflow”, set 4 h and 30 min and run it again.' }
      }
    }
  });

  /* Action plan proposed by the Engagement acceptance agent. */
  function PLAN(H) {
    const sc = H.sc;
    return [
      { d: 'A1', t: 'Barrier', text: `${H.ids.bar} active in iManage over ${sc.count} documents; the 2025 team is excluded from PRC-2026-0412.`, owner: ROLE.compliance, due: '2026-09-29' },
      { d: 'A2', t: 'Conflicts committee', text: `Assess the risk of using confidential information of ${PLAINTIFF} (art. 12 of the Bar Code of Conduct) and decide on acceptance.`, owner: ROLE.decider, due: '2026-09-30' },
      { d: 'A3', t: 'Client', text: `Confirm the decision to ${CLIENT} before 14:00 on 30/09; if declined, hand the documents and the deadline computation to the new firm.`, owner: ROLE.procesal, due: '2026-09-30' },
      { d: 'A4', t: 'Engagement letter', text: 'If accepted, engagement letter with a fee estimate signed via Signaturit (POL-HON-004).', owner: ROLE.client_care, due: '2026-10-01' },
      { d: 'A5', t: 'Due diligence', text: 'Check that the client’s due diligence and beneficial owner are up to date (MAN-PBC-003, Ley 10/2010 on AML).', owner: ROLE.compliance, due: '2026-10-01' },
      { d: 'A6', t: 'Defence', text: `Draft defence on 19/10 and partner review on 23/10; due 27/10 (${H.ids.plz}).`, owner: ROLE.procesal_staff, due: '2026-10-23' },
      { d: 'A7', t: 'Copies', text: `Review with IT the ${sc.elseTotal} copies outside iManage and file them behind the barrier.`, owner: ROLE.it, due: '2026-10-02' },
      { d: 'A8', t: 'Prevention', text: 'Automatic allocation that checks the absence calendar, and a conflict check on every incoming LexNET notice.', owner: ROLE.it, due: '2026-10-16' }
    ];
  }
})();
