/* Mora & Jordano · complaint REC-2026-0057 (fee complaint and lack of information about the matter). English version.
 * Fictitious clients, people and matters; synthetic demo data (MFM). */
agenticPackEn('abogados', {
  reclamacion: {
    code: 'REC-2026-0057',
    nav: 'Complaint REC-2026-0057',
    title: 'Complaint REC-2026-0057',
    agent: 'Client complaints and fees',
    analyze_label: 'Analyse complaint',
    nc: 'R-2026-0041',
    form: { code: 'REG-CLI-004-02', rev: '3' },
    received: { date: '2026-09-28', time: '10:41' },
    due: '2026-10-20',
    holidays: ['2026-10-12'],
    customer_line: 'Grupo Hostelero Costa del Sol, S.L. · fee note F-2026-0938 (Corporate)',
    due_line: 'Fee note due on 15/10/2026 · internal reply by 20/10/2026',
    cust_name: 'Elena Navas Corredera',
    cust_addr: 'elena.navas@grupocostadelsol.example',
    own_name: 'Client Care and Billing · Mora & Jordano',
    own_addr: 'atencion.clientes@morajordano.example',
    mail_domain: 'morajordano.example',
    mail_sub: 'elena.navas@grupocostadelsol.example · mailbox atencion.clientes@morajordano.example · English',
    mail_title: 'Client’s email',
    mail_tab_label: 'Client’s email',
    attachments: ['F-2026-0938_minuta.pdf', 'HE-2026-0219_hoja_de_encargo_firmada.pdf'],
    email_text: [
      'From: Elena Navas Corredera <elena.navas@grupocostadelsol.example>',
      'To: Client Care · Mora & Jordano <atencion.clientes@morajordano.example>',
      'Date: Mon, 28 Sep 2026 10:41',
      'Subject: Formal complaint - Fee note F-2026-0938 and lack of information on the Hotel Bahía de Nerja acquisition',
      '',
      'Good morning,',
      '',
      'I am writing as Finance Director of Grupo Hostelero Costa del Sol, S.L. to file a formal complaint about fee note F-2026-0938, dated 15 September 2026, for the acquisition of 100 % of Hotel Bahía de Nerja, S.L.',
      '',
      'The fee note comes to 18,400 € plus VAT (22,264 € in total). The engagement letter we signed on 12 March 2026 estimated fees of 12,500 € plus VAT for the due diligence and the negotiation of the purchase agreement. In other words, we are being billed almost 50 % more than expected and nobody warned us at any point that the budget would be exceeded. The engagement letter itself says that any deviation above 10 % would be communicated to us in writing before billing.',
      '',
      'Moreover, the fee note has no breakdown: it only says “Professional fees matter MER-2026-0219” plus 60 € of disbursements. We do not know how many hours were spent or on what.',
      '',
      'Nor are we happy with the information we receive. Since the agreement was signed on 24 July we have had no report on the closing of the deal. I wrote on 28 August and again on 7 September to ask about the approval of the transfer of the tourist licence, which is the pending condition for closing, and I have had no reply. Our CEO asks me every week and I do not know what to tell him.',
      '',
      'We ask you:',
      '- for a detailed breakdown of the hours billed, with dates, professionals and tasks;',
      '- to bring the fee note into line with the engagement letter or justify the difference in writing; in the meantime, we will not pay the invoice, which is due on 15 October;',
      '- for a report on the current status of the deal and when closing is expected;',
      '- for a meeting with the partner in charge of the matter.',
      '',
      'We have been working with the firm since 2019 and have always been satisfied, which is why this situation surprises us so much.',
      '',
      'I look forward to your reply at this address or on 600 000 573.',
      '',
      'Kind regards,',
      '',
      'Elena Navas Corredera',
      'Finance Director',
      'Grupo Hostelero Costa del Sol, S.L.',
      'Marbella (Málaga)'
    ].join('\n'),
    mail_extra: {
      label: 'Email of 04/06 (scope extension)',
      note: 'Email found by Agentic Platform in the matter folder in iManage. It uses it to check who asked for the scope extension and whether the cost was communicated.',
      headers: { From: 'CEO · Grupo Hostelero Costa del Sol <cd@grupocostadelsol.example>', Subject: 'RE: Due diligence Hotel Bahía de Nerja - planning and licence', Date: 'Thu, 4 Jun 2026 18:22' },
      text: [
        'From: CEO (Grupo Hostelero Costa del Sol)',
        'To: Senior Associate, Corporate (Mora & Jordano) · CC: Head of Corporate and Commercial (partner)',
        '',
        'Hi,',
        'After today’s visit to the hotel we are worried about the planning status of the terrace extension and the 2019 annex. Please include in the due diligence the planning review and the review of the tourist licence (entry in the Andalusian Tourism Register and four-star category). We need it before signing.',
        'Thanks.',
        '',
        '--- Reply (5 Jun 2026 09:10) ---',
        'From: Senior Associate, Corporate',
        'Good morning. Fine, we will add it to the due diligence and send it to you with the final report at the end of June. Best regards.',
        '',
        'iManage folder MER-2026-0219 / Correspondence · no addendum to the engagement letter and no cost estimate in the Engagement folder.'
      ].join('\n'),
      highlights: [
        { text: 'Please include in the due diligence the planning review and the review of the tourist licence', label: 'Client’s request', tone: 'ok' },
        { text: 'we will add it to the due diligence', label: 'No cost', tone: 'crit' },
        { text: 'no addendum to the engagement letter and no cost estimate', label: 'No addendum', tone: 'warn' }
      ]
    },
    highlights: [
      { text: 'fee note F-2026-0938', label: 'Invoice', tone: 'brand' },
      { text: 'acquisition of 100 % of Hotel Bahía de Nerja, S.L.', label: 'Matter', tone: 'brand' },
      { text: '18,400 € plus VAT (22,264 € in total)', label: 'Amount', tone: 'crit' },
      { text: '12,500 € plus VAT', label: 'Estimate', tone: 'brand' },
      { text: 'nobody warned us at any point that the budget would be exceeded', label: 'No warning', tone: 'crit' },
      { text: 'any deviation above 10 % would be communicated to us in writing before billing', label: 'Clause 6', tone: 'warn' },
      { text: 'the fee note has no breakdown', label: 'No breakdown', tone: 'crit' },
      { text: 'I wrote on 28 August and again on 7 September', label: 'No reply', tone: 'crit' },
      { text: 'approval of the transfer of the tourist licence', label: 'Pending condition' },
      { text: 'for a detailed breakdown of the hours billed', label: 'Request' },
      { text: 'we will not pay the invoice, which is due on 15 October', label: 'Urgency', tone: 'warn' },
      { text: 'a meeting with the partner in charge of the matter', label: 'Meeting' },
      { text: 'We have been working with the firm since 2019', label: 'Client since 2019', tone: 'ok' }
    ],
    run: {
      title: '“Client fee complaint” workflow',
      sub: 'Triggered when a complaint reaches the client care mailbox · PR-CLI-004 and POL-HON-004',
      graph_title: 'Client complaint workflow',
      idle_footer: 'Reads the email, extracts and validates the data, matches the fee note against the engagement letter and the hours logged, reviews the matter’s communications and prepares the complaint file, the credit note and the reply. Nothing goes out without the Managing Partner’s approval.',
      nodes: [
        { id: 'correo', kind: 'trigger', label: 'Client email', sub: 'Client care mailbox', systems: ['Outlook'], icon: 'mail' },
        { id: 'extraccion', label: 'Extraction and validation', systems: ['Modelo de lenguaje', 'Gestor de expedientes'], icon: 'search' },
        { id: 'traza', label: 'Engagement, hours and communications', systems: ['Signaturit', 'Gestor de expedientes', 'iManage', 'Microsoft Teams'], icon: 'git-branch' },
        { id: 'historico', label: 'History, policy and reply', systems: ['Gestor de expedientes', 'Procedimientos'], icon: 'clipboard' },
        { id: 'aprobacion', kind: 'approval', label: 'Managing Partner approval', sub: 'Firm management' },
        { id: 'salida', kind: 'output', label: 'Credit note, reply and meeting', systems: ['Outlook', 'Gestor de expedientes', 'Microsoft Teams'], icon: 'send' }
      ],
      edges: [['correo', 'extraccion'], ['extraccion', 'traza'], ['traza', 'historico'], ['historico', 'aprobacion'], { from: 'aprobacion', to: 'salida', label: 'approved' }],
      graph_at: { 0: { correo: 'done', extraccion: 'active' }, 2: { extraccion: 'done', traza: 'active' }, 8: { traza: 'done', historico: 'active' }, 13: { historico: 'done', aprobacion: 'waiting' } },
      stats: [
        { label: 'Fee note F-2026-0938 · taxable base against an estimate of 12,500 €', value: '18,400 €' },
        { label: 'Deviation from the engagement letter · no written warning', value: '+47 %', tone: 'warn' },
        { label: 'Similar complaints · REC-2026-0031', value: 2, tone: 'warn' },
        { label: 'Working days left to reply · due 20/10/2026', due: true }
      ]
    },
    steps: [
      { system: 'Outlook', action: 'Reads the email from elena.navas@grupocostadelsol.example in the atencion.clientes@morajordano.example mailbox (28/09/2026 10:41)', result: 'Formal complaint about fees and lack of information · 2 attachments (fee note F-2026-0938 and signed engagement letter)', ms: 310 },
      { system: 'Modelo de lenguaje', action: 'Extracts the complaint data', result: 'Fee note F-2026-0938 · 18,400 € + VAT against an estimate of 12,500 € · no breakdown · no deviation warning · 2 emails unanswered (28/08 and 07/09) · asks for a breakdown, an adjustment, a status report and a meeting · withholds payment (due 15/10)', ms: 2800 },
      { system: 'Gestor de expedientes', action: 'Identifies the sender, the client and the matter', result: 'Grupo Hostelero Costa del Sol, S.L., client since 2019, 6 active matters · the sender is the registered billing contact · matter MER-2026-0219 (Corporate) · responsible: Head of Corporate and Commercial (partner)', ms: 420, tone: 'ok' },
      { system: 'Signaturit', action: 'Retrieves the signed engagement letter', result: 'HE-2026-0219 signed on 12/03/2026 · scope: legal due diligence (corporate, employment and tax) and SPA negotiation · estimate 12,500 € + VAT · 220 €/h partner and 150 €/h associate · clause 6: any deviation > 10 % is communicated in writing before billing · internal meetings not billable', ms: 360 },
      { system: 'Gestor de expedientes', action: 'Matches the time entries for MER-2026-0219 against the engagement letter', result: '105 h logged (18,340 € + 60 € of disbursements) · within scope: 76 h, 13,360 € (+6.9 %, within the margin) · out of scope: 26 h of planning and tourist licence due diligence (4,320 €) · 3 h of partner “internal coordination” billed (660 €)', ms: 610, tone: 'warn' },
      { system: 'iManage', action: 'Searches the matter folder for the extension request and the addendum', result: 'CEO’s email of 04/06/2026 asking for the planning and tourist licence review · associate’s reply of 05/06 with no cost estimate · no addendum in the Engagement folder', ms: 480, tone: 'warn' },
      { system: 'iManage', action: 'Checks the deliverables and the status reports sent', result: 'Due diligence report v3 (30/06) with planning annex · SPA signed on 24/07 · last status report sent to the client: 18/06/2026 · none since signing', ms: 440, tone: 'warn' },
      { system: 'Microsoft Teams', action: 'Reviews the matter channel and the client’s communications', result: 'Client’s emails of 28/08 and 07/09 forwarded to the MER-2026-0219 channel, unassigned (associate on holiday from 17/08 to 04/09) · unanswered for 21 and 15 working days · transfer application filed with the Andalusian Tourism Register on 09/09', ms: 390, tone: 'warn' },
      { system: 'Gestor de expedientes', action: 'Status of the fee note and the client’s payment history', result: 'F-2026-0938 issued on 15/09, due on 15/10, unpaid · 14 earlier invoices paid on time, including F-2026-0871 (Tax)', ms: 350, tone: 'ok' },
      { system: 'Gestor de expedientes', action: 'Searches for similar complaints in the last 12 months', result: '6 closed complaints · 2 similar: REC-2026-0031 and REC-2025-0118 (extra work requested by the client with no addendum or deviation warning)', ms: 520, tone: 'warn' },
      { system: 'Procedimientos', action: 'Checks PR-CLI-004, POL-HON-004 and the professional conduct rules', result: 'Reply within 15 working days (PR-CLI-004): by 20/10/2026 · duty to keep the client informed (Estatuto General de la Abogacía, RD 135/2021, and Código Deontológico) · Ley 44/2006 does not apply: the client is a company', ms: 370 },
      { system: 'Modelo de lenguaje', action: 'Drafts the complaint file (F1–F8) and the fee analysis with owners by role and dates', result: 'Full file · proposed adjustment: 660 € of non-billable hours and 25 % of the uncommunicated extension (1,080 €) · the organisational cause stays a hypothesis', ms: 5100 },
      { system: 'Gestor de expedientes', action: 'Prepares the credit note and suspends the due date in draft', result: 'R-2026-0041 in draft: credit of 1,740 € + VAT (2,105.40 €) against F-2026-0938 · new amount 16,660 € + VAT · not issued', ms: 300, tone: 'ok' },
      { system: 'Modelo de lenguaje', action: 'Drafts the reply to the client and the analysis for the approver', result: 'Draft ready: apology, reference REC-2026-0057, breakdown attached, credit note, deal status and meeting proposed for 06/10 · pending approval', ms: 3000, tone: 'warn' }
    ],
    lot: {
      code: 'MER-2026-0219',
      noun: 'matter',
      label: 'Matter (Gestor de expedientes)',
      fix_title: 'the billed matter',
      systems: 'the Gestor de expedientes and iManage',
      systems_short: 'Gestor and iManage',
      fix_text: 'If the client has quoted the wrong matter, type the correct one. Agentic Platform looks it up in the Gestor de expedientes and checks that it belongs to Grupo Hostelero Costa del Sol and is billed in fee note F-2026-0938 before changing anything.',
      same_body: 'It exists in the Gestor de expedientes (Corporate · acquisition of Hotel Bahía de Nerja, S.L.) and is the matter billed in fee note F-2026-0938. No changes.',
      unknown_hint: 'If the code is doubtful, compare it with the description on the fee note the client attached.',
      mismatch_body: 'The code exists in the systems, but it is not billed in fee note F-2026-0938: the record is not changed.',
      known: {
        'PRC-2026-0412': { kind: 'mismatch', title: 'PRC-2026-0412 is a Litigation matter for another client', body: 'It exists in the Gestor de expedientes: claim against Aceites Sierra Subbética, S.L. (PO 1184/2026). It has nothing to do with Grupo Hostelero Costa del Sol or the fee note in dispute. The record is not changed.' },
        'F-2026-0871': { kind: 'mismatch', title: 'F-2026-0871 is another invoice for the same client, already paid', body: 'Fee note from the Tax department (corporate income tax planning), paid on time. The complaint concerns F-2026-0938 for matter MER-2026-0219. The record is not changed.' }
      }
    },
    sheet: {
      sub: 'Data extracted from the email and checked in the Gestor de expedientes, Signaturit and iManage',
      empty_text: 'Agentic Platform will extract the fee note, the matter, the amounts, the dates and the requests from the email, and check them against the engagement letter, the time entries and the matter’s communications before preparing the complaint file, the credit note and the reply.',
      rows: [
        { k: 'Reference', v: 'REC-2026-0057', code: true, sub: 'Complaint file · client care register' },
        { k: 'Client', v: 'Grupo Hostelero Costa del Sol, S.L.', ok: 'Identified in the Gestor de expedientes · client since 2019 · 6 active matters' },
        { k: 'Fee note', v: '18,400 € + VAT (22,264 €) ·', trace: 'F-2026-0938', ok: 'Issued on 15/09/2026 · due on 15/10 · unpaid · no breakdown of hours' },
        { k: 'Matter', lot: true, ok: 'Corporate · acquisition of 100 % of Hotel Bahía de Nerja, S.L. · Head of Corporate and Commercial (partner)' },
        { k: 'Engagement letter', v: 'HE-2026-0219 · 12,500 € + VAT estimated', ok: 'Signed on Signaturit on 12/03/2026 · clause 6: written warning if the deviation exceeds 10 %' },
        { k: 'Hours logged', v: '105 h · 18,340 € + 60 € of disbursements', sub: 'Within scope 76 h (13,360 €) · extension 26 h (4,320 €) · internal coordination 3 h (660 €)' },
        { k: 'Extension', v: 'Planning and tourist licence due diligence', sub: 'Requested by the CEO on 04/06 · accepted with no cost estimate or addendum' },
        { k: 'Evidence', v: 'Signed engagement letter · email of 04/06 · time entries · matter channel in Teams' },
        { k: 'Communication', v: 'Last status report: 18/06/2026 ·', trace: 'MER-2026-0219', sub: 'Emails of 28/08 and 07/09 unanswered · hypothesis: left unassigned while the associate was on holiday' },
        { k: 'Matter status', v: 'SPA signed on 24/07 · closing pending transfer of the licence', sub: 'Application filed with the Andalusian Tourism Register on 09/09' },
        { k: 'Deadlines', v: 'Fee note due 15/10 · reply by 20/10/2026', due: true, sub: 'PR-CLI-004: 15 working days (12/10 national holiday)' },
        { k: 'Record', v: 'R-2026-0041', code: true, sub: 'Credit note in the Gestor de expedientes (draft, not issued)' }
      ]
    },
    requests: {
      title: 'What the client asks for',
      items: [
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Detailed breakdown of the hours billed', meta: ['F3 · Annex B · 105 h by date, professional and task'], quote: 'for a detailed breakdown of the hours billed, with dates, professionals and tasks', side: { pending: { status: 'waiting', label: 'Pending approval' }, approved: { status: 'sent', label: 'Sent' }, rejected: { status: 'rejected', label: 'Not sent' } } },
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Adjust the fee note or justify the difference', meta: ['F3 · credit note R-2026-0041 · 1,740 € + VAT', 'Due date suspended meanwhile'], quote: 'to bring the fee note into line with the engagement letter or justify the difference in writing', side: { pending: { status: 'pending', label: 'Proposed' }, approved: { status: 'ok', label: 'Credit note issued' }, rejected: { status: 'rejected', label: 'No adjustment' } } },
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Report on the deal status and closing', meta: ['Reply to the client · REC-2026-0057'], quote: 'for a report on the current status of the deal and when closing is expected', side: { pending: { status: 'waiting', label: 'Pending approval' }, approved: { status: 'sent', label: 'Sent' }, rejected: { status: 'rejected', label: 'Not sent' } } },
        { icon: 'clock', tone: 'warn', title: 'Meeting with the partner in charge', meta: ['F6 · Head of Corporate and Commercial (partner)'], quote: 'for a meeting with the partner in charge of the matter', side: { status: 'review', label: 'Proposed 06/10' } },
        { icon: 'calendar', tone: 'warn', title: 'Formal reply within the deadline', meta: ['F6 · resolution of the complaint file'], quote: 'I look forward to your reply', side: { status: 'pending', label: 'By 20/10' } }
      ]
    },
    trace: {
      title: 'Trace of engagement MER-2026-0219 and fee note F-2026-0938',
      sub: 'Signaturit · Gestor de expedientes · iManage · Microsoft Teams · from the engagement letter to the fee note',
      button_code: 'REC-2026-0057',
      button_label: 'Full file · REC-2026-0057',
      back_title: 'Backwards · from the engagement to the complaint',
      back: [
        { time: '12/03', title: 'Engagement letter signed', text: 'HE-2026-0219 on Signaturit · legal due diligence and SPA negotiation · 12,500 € + VAT estimated · clause 6 deviation warning', tone: 'brand', ref: 'HE-2026-0219' },
        { time: '04/06', timeSub: '18:22', title: 'Extension requested by the client', text: 'The CEO asks for the planning and tourist licence review · the associate accepts it on 05/06 with no cost estimate', tone: 'warn', ref: 'MER-2026-0219', chip: { status: 'open', label: 'No addendum' } },
        { time: '24/07', title: 'SPA signed', text: 'Purchase agreement signed · closing subject to transfer of the tourist licence · last status report: 18/06', tone: 'brand', ref: 'iManage' },
        { time: '28/08', timeSub: '12:05', title: 'Client query left unanswered', route: ['Outlook', 'Teams', 'Unassigned'], route_mark: 'Unassigned', text: 'Forwarded to the matter channel while the associate was on holiday · repeated on 07/09, also unanswered', tone: 'crit' },
        { time: '15/09', title: 'Fee note issued', text: '18,400 € + VAT · no breakdown · no prior warning of the 47 % deviation', tone: 'crit', ref: 'F-2026-0938' },
        { time: '28/09', timeSub: '10:41', title: 'Formal complaint', text: 'Email from the Finance Director with the fee note and the engagement letter · payment withheld', tone: 'brand', ref: 'REC-2026-0057' }
      ],
      fwd_title: 'Forwards · items on the fee note',
      fwd_cols: { id: 'Item', qty: 'Amount (€)', when: 'Hours', status: 'Status' },
      fwd: [
        { id: 'Item 1', dest: 'Legal due diligence', sub: '12 h partner · 36 h associate', qty: '8,040', when: '48 h', status: { status: 'ok', label: 'As per engagement letter' } },
        { id: 'Item 2', dest: 'SPA negotiation and signing', sub: '10 h partner · 12 h associate', qty: '4,000', when: '22 h', status: { status: 'ok', label: 'As per engagement letter' } },
        { id: 'Item 3', dest: 'Additional SPA rounds', sub: '6 h partner', qty: '1,320', when: '6 h', status: { status: 'ok', label: 'Within the 10 % margin' } },
        { id: 'Item 4', dest: 'Planning and licence due diligence', sub: 'extension of 04/06 · no addendum', qty: '4,320', when: '26 h', status: { pending: { status: 'pending', label: '25 % discount proposed' }, approved: { status: 'ok', label: 'Billed with 25 % discount' }, rejected: { status: 'warn', label: 'Billed unadjusted' } } },
        { id: 'Item 5', dest: 'Internal coordination', sub: 'not billable under the letter', qty: '660', when: '3 h', status: { pending: { status: 'pending', label: 'Credit proposed' }, approved: { status: 'ok', label: 'Credited' }, rejected: { status: 'warn', label: 'On the fee note' } } },
        { id: 'R-2026-0041', dest: 'Credit note', sub: 'against F-2026-0938', qty: '−1,740', when: '—', status: { pending: { status: 'draft', label: 'Draft' }, approved: { status: 'sent', label: 'Issued' }, rejected: { status: 'draft', label: 'Draft' } } }
      ],
      fwd_note: '105 h · 18,340 € of fees plus 60 € of disbursements (Companies Register and Land Registry extracts) · the credit note brings the fee note down to 16,660 € + VAT (20,158.60 €).',
      hypothesis: {
        title: 'Cause hypothesis · to be confirmed by the Head of Corporate and Commercial',
        icon: 'scale',
        paras: [
          'The deviation does not come from wrongly logged hours but from a scope extension requested by the client itself on 04/06, accepted by email without estimating its cost or signing an addendum, contrary to clause 6 of the engagement letter and POL-HON-004.',
          'For: the work within scope (76 h, 13,360 €) stays within the 10 % margin and the extension is documented in due diligence report v3. To be clarified: whether the cost was mentioned verbally at the meeting of 10/06, which is not recorded in the Gestor or in iManage.',
          'The lack of information has a likely organisational cause: the client’s queries reached the matter channel while the associate was on holiday and nobody had them assigned. Confirming this is not needed to answer the complaint: the deviation was not communicated in writing and the client received no reports after June.'
        ]
      }
    },
    history: {
      sub: 'Gestor de expedientes · closed client complaints · last 12 months',
      col_id: 'Complaint',
      col_product: 'Department and matter',
      col_cause: 'Resolution',
      rows: [
        { id: 'REC-2026-0031', date: '2026-05-14', product: 'Corporate · capital increase', lot: 'MER-2025-0388', description: 'Fee note 35 % above the estimate', category: 'Extension without addendum', customer_label: 'company', root_cause: 'Extra work requested by email with no addendum or deviation warning · 20 % of the extension credited', nc: 'R-2026-0017', status: 'closed', similar: true },
        { id: 'REC-2025-0118', date: '2025-11-06', product: 'Tax · corporate income tax inspection', lot: 'FIS-2025-0204', description: 'Unforeseen fees for the submissions stage', category: 'Extension without addendum', customer_label: 'company', root_cause: 'Stage not included in the letter; undocumented verbal warning · addendum signed afterwards and 15 % discount', nc: 'R-2025-0062', status: 'closed', similar: true },
        { id: 'REC-2026-0044', date: '2026-07-21', product: 'Litigation · debt claim', lot: 'PRC-2025-0977', description: 'No information about a hearing date', category: 'Communication', customer_label: 'company', root_cause: 'LexNET notification passed on to the client 4 days late · automatic alert enabled', nc: 'REC-2026-0044', status: 'closed', similar: false },
        { id: 'REC-2026-0049', date: '2026-08-27', product: 'Corporate · shareholders’ agreement', lot: 'MER-2026-0102', description: 'Wrong tax ID on the invoice', category: 'Billing error', customer_label: 'company', root_cause: 'Outdated tax data in the Gestor · credit note within 1 day', nc: 'R-2026-0033', status: 'closed', similar: false },
        { id: 'REC-2026-0012', date: '2026-02-10', product: 'Civil · inheritance', lot: 'CIV-2025-0611', description: 'Advance on fees not settled', category: 'Advance on fees', customer_label: 'individual', root_cause: 'Advance applied without a detailed statement · statement sent and balance refunded', nc: 'R-2026-0005', status: 'closed', similar: false },
        { id: 'REC-2025-0097', date: '2025-10-02', product: 'Tax · form 720', lot: 'FIS-2025-0150', description: 'Late delivery of the draft', category: 'Deadlines', customer_label: 'individual', root_cause: 'Client documentation incomplete · shared delivery calendar', nc: 'REC-2025-0097', status: 'closed', similar: false }
      ],
      note: {
        title: 'Same pattern as REC-2026-0031 and REC-2025-0118',
        body: 'Extra work requested by the client and accepted with no addendum or written warning of the deviation. In both cases the work was recognised, a discount was applied to the uncommunicated part (20 % and 15 %) and the client stayed with the firm. REC-2026-0044 is different: there the problem was a LexNET notification passed on late. In F7 the file proposes an automatic deviation alert in the Gestor de expedientes.'
      }
    },
    plan: {
      title: 'File REC-2026-0057 · fee analysis and proposed adjustment',
      sub: 'PR-CLI-004 · adjustment and breakdown this week; formal reply by 20/10/2026',
      col_label: 'Phase',
      containment_status: { pending: { text: 'Pending approval', tone: 'warn' }, approved: { text: 'Applied', tone: 'ok' }, rejected: { text: 'Not applied', tone: 'neutral' } },
      rows: [
        { d: 'F1', title: 'Admission and team', owner: ['Client Care and Billing'], date: '2026-09-29', status: { text: 'Complete', tone: 'ok' }, lead: 'Complaint admitted: filed in writing by the client’s billing contact, identified in the Gestor de expedientes, about an unpaid fee note.', items: ['Client Care and Billing: handling, breakdown and credit note', 'Head of Corporate and Commercial (partner): review of the hours and of the deal status', 'Managing Partner: decision on the adjustment and approval of the reply', 'Compliance Officer: review of the professional conduct criterion and the engagement letter'], note: 'Contact: Elena Navas Corredera, Finance Director (elena.navas@grupocostadelsol.example · 600 000 573).' },
        { d: 'F2', title: 'Facts', owner: ['Client Care and Billing'], date: '2026-09-29', status: { text: 'Complete', tone: 'ok' }, lead: 'Fee note F-2026-0938 for 18,400 € + VAT for matter MER-2026-0219, against an estimate of 12,500 € + VAT in engagement letter HE-2026-0219. The deviation (+47 %) was not communicated in writing and the fee note has no breakdown.', items: ['105 h logged: 76 h within scope (13,360 €, +6.9 %), 26 h of extension (4,320 €) and 3 h of internal coordination (660 €)', 'Extension requested by the CEO on 04/06 and accepted on 05/06 with no cost estimate or addendum', 'Last status report on 18/06; client emails of 28/08 and 07/09 unanswered', 'SPA signed on 24/07; closing pending transfer of the tourist licence (applied for on 09/09)'] },
        { d: 'F3', title: 'Immediate measures', owner: ['Client Care and Billing', 'Head of Corporate and Commercial (partner)'], date: '2026-09-30', containment: true, items: ['Send the full breakdown of the 105 h by date, professional and task (Annex B)', 'Issue credit note R-2026-0041: credit of 660 € of internal coordination (not billable) and of 25 % of the uncommunicated extension (1,080 €); total 1,740 € + VAT', 'Suspend the due date of F-2026-0938 and set the new one at 30 days from the credit note', 'Send the client a report on the deal status and assign a back-up contact on the matter'] },
        { d: 'F4', title: 'Fee analysis', owner: ['Head of Corporate and Commercial (partner)', 'Compliance Officer (AML and GDPR)'], date: '2026-10-01', status: { text: 'Proposed', tone: 'warn' }, lead: 'The work within scope is within the 10 % margin of the engagement letter. The extension is real work requested by the client in writing, but clause 6 was breached because its cost was neither estimated nor communicated. Internal coordination hours are not billable.', items: ['Billing of the agreed scope (13,360 €) and the disbursements (60 €) is maintained', 'The extension (4,320 €) is recognised with a 25 % discount for the missing warning, in line with REC-2026-0031 and REC-2025-0118', 'Cause hypothesis, to be confirmed: extension accepted by email without going through the responsible partner, and queries unassigned during the holidays'] },
        { d: 'F5', title: 'Collection', owner: ['Client Care and Billing'], date: '2026-10-30', status: { text: 'Planned', tone: 'info' }, items: ['Follow up collection of 16,660 € + VAT after the credit note', 'If the client does not accept the adjustment, escalate to the Managing Partner before any claim for the amount'] },
        { d: 'F6', title: 'Meeting and formal reply', owner: ['Head of Corporate and Commercial (partner)', 'Managing Partner'], date: '2026-10-06', status: { text: 'Planned', tone: 'info' }, items: ['Meeting with the client on 06/10 at 10:00 (Málaga or Microsoft Teams)', 'Reasoned formal reply by 20/10, with information about the Client Service of the Ilustre Colegio de Abogados de Málaga (Málaga Bar Association) if she disagrees'] },
        { d: 'F7', title: 'Prevention', owner: ['Managing Partner', 'IT and Information Security'], date: '2026-10-16', status: { text: 'Planned', tone: 'info' }, items: ['Automatic alert in the Gestor de expedientes when hours exceed 90 % of the engagement letter estimate', 'Mandatory addendum on Signaturit for any scope extension (POL-HON-004): three identical complaints in a year', 'Fortnightly status report to clients on M&A deals and a back-up assigned during holidays'] },
        { d: 'F8', title: 'Closure and record', owner: ['Client Care and Billing'], date: '2026-10-23', status: { text: 'Planned', tone: 'info' }, items: ['Closure of the complaint file in the Gestor with the evidence and filing in iManage', 'Inclusion in the firm’s annual quality and client complaints report'] }
      ]
    },
    reply: {
      to_label: 'to the client',
      subject: 'RE: Formal complaint - Fee note F-2026-0938 and lack of information on the Hotel Bahía de Nerja acquisition - Ref. REC-2026-0057',
      sub: 'To elena.navas@grupocostadelsol.example · in English',
      tab_label: 'Will be sent',
      text: [
        'Dear Ms Navas,',
        '',
        'We have received your email of 28 September 2026 about fee note F-2026-0938 for the acquisition of Hotel Bahía de Nerja, S.L. and about the information you have received during the deal. Thank you for setting it out so clearly, and please accept our apologies: you are right on two important points.',
        '',
        'The reference for your complaint is REC-2026-0057.',
        '',
        'Regarding the fee note, we have reviewed every hour logged; please find attached the breakdown by date, professional and task:',
        '- The work included in the engagement letter (due diligence and negotiation of the agreement) comes to 13,360 € plus VAT, within the 10 % margin on the estimate.',
        '- The difference comes mainly from the planning and tourist licence review you asked us for on 4 June (4,320 € plus VAT). This work was carried out and delivered with the due diligence report, but we did not send you a written estimate of its cost, as the engagement letter requires. We are therefore applying a 25 % discount to that part.',
        '- 3 hours of internal coordination, which are not billable, were included by mistake. We are removing them.',
        '',
        'We will issue a credit note for 1,740 € plus VAT. The fee note will come to 16,660 € plus VAT (20,158.60 €) and the due date moves to 30 days from the date of the credit note, so you do not need to pay the invoice on 15 October.',
        '',
        'Regarding the status of the deal: the agreement was signed on 24 July and closing depends on the transfer of the tourist licence. The application was filed with the Andalusian Tourism Register on 9 September and is awaiting a decision. As soon as we receive it, we will propose a closing date. We are sorry we did not answer your emails of 28 August and 7 September; from today the matter has a back-up contact and we will send you a status report every fortnight until closing.',
        '',
        'The partner in charge of the matter proposes meeting on Tuesday 6 October at 10:00, at our Málaga office or by video call, whichever suits you best. If another date works better for you, please let us know.',
        '',
        'We will send you our formal reply by 20 October 2026. If you do not agree with it, you may contact the Client Service of the Ilustre Colegio de Abogados de Málaga.',
        '',
        'Thank you once again for your trust since 2019. We remain at your disposal.',
        '',
        'Yours sincerely,',
        '',
        'Managing Partner',
        'Mora & Jordano Abogados',
        'atencion.clientes@morajordano.example'
      ].join('\n'),
      highlights: [
        { text: 'REC-2026-0057', label: 'Reference', tone: 'brand' },
        { text: 'credit note for 1,740 € plus VAT', label: 'Adjustment', tone: 'brand' },
        { text: 'you do not need to pay the invoice on 15 October', label: 'Due date', tone: 'brand' },
        { text: 'by 20 October 2026', label: 'Commitment', tone: 'brand' }
      ],
      llm_instructions: [
        'Formal, warm and professional tone, from a law firm to the Finance Director of a corporate client it has worked with since 2019 (salutation “Dear Ms Navas,”). Clearly acknowledge what the firm did wrong without blaming any named team member or the client.',
        'Acknowledge the email of 28 September 2026 about fee note F-2026-0938 for the acquisition of Hotel Bahía de Nerja, S.L., apologise and give the reference REC-2026-0057.',
        'Explain the breakdown (attached): engagement letter work 13,360 € + VAT within the 10 % margin; planning and tourist licence review requested on 4 June (4,320 € + VAT), carried out but without a written cost estimate, with a 25 % discount; 3 hours of internal coordination billed by mistake, which are removed.',
        'Confirm the credit note for 1,740 € + VAT, the new amount of 16,660 € + VAT (20,158.60 €) and that the due date moves to 30 days from the credit note, so they do not need to pay on 15 October.',
        'Report the status: SPA signed on 24 July, closing pending the transfer of the tourist licence applied for at the Andalusian Tourism Register on 9 September; apologise for not answering the emails of 28 August and 7 September; back-up contact and fortnightly status report until closing.',
        'Propose a meeting with the partner in charge on Tuesday 6 October at 10:00 at the Málaga office or by video call, and the formal reply by 20 October 2026, with the option to contact the Client Service of the Ilustre Colegio de Abogados de Málaga if she disagrees.',
        'Do not reveal internal data (the associate’s holidays, Teams channels, other clients’ complaints, individual rates beyond the attached breakdown) and do not quote internal codes other than REC-2026-0057 and F-2026-0938. Respect professional secrecy: do not mention the client’s other matters.',
        'Signature: Managing Partner · Mora & Jordano Abogados · atencion.clientes@morajordano.example'
      ],
      criterion: 'Drafting criterion: acknowledges the missing warning and information, explains the adjustment with figures and deadlines and proposes the meeting; does not reveal internal data about the team or other clients. Consistent with the duty to inform the client under the Código Deontológico and with the engagement letter.',
      control: {
        label: 'Fee analysis for the approver',
        note: 'Internal analysis that accompanies the approval; it is not sent to the client.',
        edited_note: 'The analysis matches the Agentic Platform draft; the edited version includes the Managing Partner’s changes to the text being sent.',
        subject: 'Internal analysis · REC-2026-0057 · R-2026-0041',
        text: [
          '1. Real hours? Yes: 105 h with daily entries in the Gestor and deliverables in iManage. No duplicated hours or hours logged to another matter.',
          '2. Within the engagement? 76 h (13,360 €) yes, +6.9 % on the estimate, within the clause 6 margin. 26 h (4,320 €) are an extension requested in writing by the client on 04/06.',
          '3. Was the engagement letter complied with? No: the deviation exceeded 10 % and was not communicated in writing before billing; in addition, 3 h of internal coordination (660 €) were billed, which are expressly excluded.',
          '4. Proposed adjustment: credit of 660 € and a 25 % discount on the extension (1,080 €) · credit note R-2026-0041 for 1,740 € + VAT · new amount 16,660 € + VAT. Precedents: REC-2026-0031 (20 %) and REC-2025-0118 (15 %).',
          '5. Client information: no report since 18/06 and two emails unanswered. A back-up is assigned and a fortnightly report set up. Ley 44/2006 does not apply (corporate client).',
          '',
          'What is approved: sending the reply and the breakdown, issuing credit note R-2026-0041, suspending the 15/10 due date and proposing the meeting on 06/10.',
          'Risk if not approved this week: the client withholds payment, the complaint may reach the Málaga Bar Association and a seven-year relationship with six active matters suffers.'
        ].join('\n')
      }
    },
    approval: {
      title: 'Reply to Grupo Hostelero Costa del Sol, credit note and meeting',
      approver: 'Managing Partner',
      policy: 'PR-CLI-004 · POL-HON-004 · Código Deontológico',
      summary: {
        pending: 'Agentic Platform has prepared the reply to the client, the breakdown of hours, credit note R-2026-0041 (1,740 € + VAT), the suspension of the due date and the meeting proposal. Nothing is sent or issued until the Managing Partner approves it.',
        approved: 'The Managing Partner has approved the proposal. Agentic Platform has sent the reply with the breakdown, issued credit note R-2026-0041, suspended the due date of F-2026-0938 and sent the invitation to the meeting on 06/10.',
        rejected: 'The Managing Partner has rejected the proposal: the reply has not been sent, the credit note has not been issued and the due date is unchanged.'
      },
      scope: [
        { label: 'Reply and breakdown to the client', state: { pending: { status: 'pending', chip: 'Send' }, approved: { status: 'sent', chip: 'Sent' }, rejected: { status: 'rejected', chip: 'Not sent' } } },
        { label: 'Credit note', value: 'R-2026-0041 · 1,740 € + VAT', state: { pending: { status: 'pending', chip: 'Issue' }, approved: { status: 'ok', chip: 'Issued' }, rejected: { status: 'rejected', chip: 'Not issued' } } },
        { label: 'Due date of F-2026-0938', value: 'Suspended · 30 days from the credit note', state: { pending: { status: 'pending', chip: 'Suspend' }, approved: { status: 'ok', chip: 'Suspended' }, rejected: { status: 'hold', chip: '15/10/2026' } } },
        { label: 'Meeting with the partner in charge', value: '06/10/2026 10:00 · Málaga or Teams', state: { pending: { status: 'pending', chip: 'Invite' }, approved: { status: 'sent', chip: 'Invited' }, rejected: { status: 'draft', chip: 'Draft' } } },
        { label: 'Automatic deviation alert', value: 'Gestor de expedientes · 90 % of the estimate', state: { status: 'evaluate', chip: 'With IT (F7)' } }
      ],
      effects: [
        'Outlook: reply and breakdown sent from atencion.clientes@morajordano.example',
        'Gestor de expedientes: credit note R-2026-0041 issued against F-2026-0938 (credit of 1,740 € + VAT)',
        'Gestor de expedientes: due date of F-2026-0938 suspended and back-up assigned on MER-2026-0219',
        'Microsoft Teams and Outlook: invitation to the meeting on 06/10 at 10:00',
        'Gestor de expedientes: complaint file REC-2026-0057 in progress · copy in iManage'
      ],
      approve_label: 'Approve, issue and send',
      next_step: 'Next step: meeting with the client on 06/10, confirm the cause with the Head of Corporate and Commercial and send the formal reply by 20/10/2026.',
      toast_approved: 'Reply sent to Grupo Hostelero Costa del Sol · credit note R-2026-0041 issued',
      reject_text: 'The reply is not sent, the credit note is not issued and the due date is not suspended. The reason is kept in the audit log. Remember that the fee note is due on 15/10 and the client has said she will not pay it.',
      reject_placeholder: 'For example: talk to the Head of Corporate and Commercial first about the discount on the extension',
      reject_audit: 'nothing is sent or issued',
      toast_rejected: 'Proposal rejected: nothing has been sent and no credit note has been issued'
    },
    compare: {
      rows: [
        { k: 'People involved', hoy: '3–4: billing, partner in charge, associate and Managing Partner', pro_strong: '1', pro: ': the Managing Partner reviews, corrects if needed and approves' },
        { k: 'Systems to open', hoy: '5: Outlook, Gestor de expedientes, Signaturit, iManage and Teams', pro_strong: '1', pro: ': this console; Agentic Platform queries all 5' }
      ],
      steps_today: '10–14 searches, hour reconciliations and drafts by hand',
      time_label: 'Analysis, file and reply',
      time_today: '3–5 h spread over several days; the reply often goes out close to the deadline',
      footer: 'Proposed acceptance criterion for the pilot: analysis of hours against the engagement letter and draft reply in under 15 minutes, 100 % of complaints answered on time and the Managing Partner accepts the draft with minor edits in at least 70 % of cases.'
    },
    audit: {
      requested: { action: 'Complaint analysis requested', detail: 'REC-2026-0057 · email from elena.navas@grupocostadelsol.example of 28/09/2026 10:41' },
      analyzed: { action: 'Complaint analysed', detail: 'REC-2026-0057 · fee note F-2026-0938 · 105 h · 18,400 € + VAT' },
      after_analysis: [
        { action: 'Credit note prepared in draft', detail: 'R-2026-0041 · Gestor de expedientes · credit of 1,740 € + VAT · not issued' },
        { action: 'Complaint file and fee analysis prepared', detail: 'REC-2026-0057 · F1–F8 · adjustment of 660 € + 25 % of the extension' },
        { action: 'Reply to the client drafted', detail: 'REC-2026-0057 · English · version 1 · pending approval' }
      ],
      approved: { action: 'Reply approved and sent', detail: 'REC-2026-0057 · to elena.navas@grupocostadelsol.example' },
      after_approval: [
        { action: 'Credit note issued', detail: 'Gestor de expedientes · R-2026-0041 · 1,740 € + VAT against F-2026-0938' },
        { action: 'Due date suspended', detail: 'F-2026-0938 · new due date 30 days from the credit note' },
        { action: 'Meeting scheduled', detail: 'Outlook and Microsoft Teams · 06/10/2026 10:00 · Head of Corporate and Commercial (partner)' },
        { action: 'File updated', detail: 'Gestor de expedientes · REC-2026-0057 in progress · back-up assigned on MER-2026-0219' }
      ]
    },
    outcome_label: 'Credit note R-2026-0041 and reply sent · REC-2026-0057 in progress',
    toast_analyzed: 'Complaint analysed · file, credit note and reply in draft',
    status_chips: { idle: 'Open · not analysed', pending: 'Awaiting Managing Partner approval', approved: 'Adjusted and answered · file in progress', rejected: 'Proposal rejected' },
    report: {
      button: 'Download complaint file',
      title: 'Complaint file REC-2026-0057',
      subtitle: 'Fees and client information · fee note F-2026-0938 (18,400 € + VAT) · matter MER-2026-0219 · analysis of hours against the engagement letter and proposed adjustment',
      filename: 'expediente-REC-2026-0057',
      meta: [['Office', 'Málaga · Calle Linaje'], ['Complaint', 'REC-2026-0057 · 28/09/2026 10:41'], ['Fee note', 'F-2026-0938 · MER-2026-0219'], ['Reply', 'by 20/10/2026']],
      state: { pending: 'Draft · pending approval', approved: 'Credit note issued · F4 under review', rejected: 'Draft · proposal rejected' },
      summary: [
        'Complaint from Grupo Hostelero Costa del Sol, S.L. (contact: its Finance Director) about fee note F-2026-0938, for 18,400 € + VAT, for matter MER-2026-0219 (acquisition of 100 % of Hotel Bahía de Nerja, S.L.), against the 12,500 € + VAT estimated in engagement letter HE-2026-0219, and about the lack of information on the deal since the SPA was signed.',
        'The work within scope (76 h, 13,360 €) is within the 10 % margin. The deviation comes from an extension requested by the client on 04/06 (26 h, 4,320 €) accepted with no estimate or addendum, and from 3 h of non-billable internal coordination (660 €). A credit note for 1,740 € + VAT and suspension of the due date are proposed.',
        'Cause hypothesis, to be confirmed by the Head of Corporate and Commercial: extension accepted by email without going through the responsible partner, and client queries left unassigned during the associate’s holidays.'
      ],
      trace_heading: 'Annex A · Trace of the engagement and the fee note',
      trace_rows: [
        { etapa: 'Engagement letter', fecha: '12/03/2026', detalle: 'Signed on Signaturit · 12,500 € + VAT estimated · clause 6 deviation warning', ref: 'HE-2026-0219' },
        { etapa: 'Extension', fecha: '04/06/2026 18:22', detalle: 'The CEO asks for the planning and tourist licence review', ref: 'MER-2026-0219' },
        { etapa: 'Acceptance', fecha: '05/06/2026 09:10', detalle: 'The associate accepts it by email with no cost estimate or addendum', ref: 'iManage' },
        { etapa: 'Report', fecha: '18/06/2026', detalle: 'Last status report sent to the client', ref: 'iManage' },
        { etapa: 'Signing', fecha: '24/07/2026', detalle: 'SPA signed · closing pending transfer of the licence', ref: 'iManage' },
        { etapa: 'Queries', fecha: '28/08 and 07/09/2026', detalle: 'Client emails forwarded to the matter channel, unassigned', ref: 'Teams' },
        { etapa: 'Fee note', fecha: '15/09/2026', detalle: '18,400 € + VAT with no breakdown · due 15/10', ref: 'F-2026-0938' },
        { etapa: 'Complaint', fecha: '28/09/2026 10:41', detalle: 'Email from the Finance Director with the fee note and the engagement letter', ref: 'REC-2026-0057' }
      ],
      units: {
        heading: 'Annex B · Time entries for matter MER-2026-0219 (sample)',
        cols: [{ label: 'Date', key: 'fecha' }, { label: 'Task', key: 'comercio' }, { label: 'Professional · hours', key: 'canal' }, { label: 'Amount (€)', key: 'importe', num: true }, { label: 'Item', key: 'aut', mono: true }, { label: 'Status', key: 'estado', status: true }],
        rows: [
          { fecha: '23/03/2026', comercio: 'Corporate and contract review of the target company', canal: 'Associate · 6.0 h', importe: '900.00', aut: 'P1', estado: 'Compliant' },
          { fecha: '14/04/2026', comercio: 'Employment due diligence: workforce and hospitality collective agreement', canal: 'Associate · 5.5 h', importe: '825.00', aut: 'P1', estado: 'Compliant' },
          { fecha: '12/06/2026', comercio: 'Planning review of the terrace and the 2019 annex', canal: 'Associate · 7.0 h', importe: '1,050.00', aut: 'P4', estado: 'Extension without addendum', estado_after: '25 % discount' },
          { fecha: '17/06/2026', comercio: 'Tourist licence: registration and category in the Tourism Register', canal: 'Partner · 2.5 h', importe: '550.00', aut: 'P4', estado: 'Extension without addendum', estado_after: '25 % discount' },
          { fecha: '08/07/2026', comercio: 'SPA negotiation with the sellers', canal: 'Partner · 3.0 h', importe: '660.00', aut: 'P2', estado: 'Compliant' },
          { fecha: '15/07/2026', comercio: 'New SPA round: deferred price and guarantee', canal: 'Partner · 2.0 h', importe: '440.00', aut: 'P3', estado: 'Compliant' },
          { fecha: '20/07/2026', comercio: 'Internal team coordination before signing', canal: 'Partner · 1.5 h', importe: '330.00', aut: 'P5', estado: 'Not billable', estado_after: 'Credited' },
          { fecha: '23/07/2026', comercio: 'Internal coordination and allocation of closing tasks', canal: 'Partner · 1.5 h', importe: '330.00', aut: 'P5', estado: 'Not billable', estado_after: 'Credited' }
        ]
      },
      history_heading: 'Annex C · Closed client complaints (12 months)',
      approvals: [
        { paso: 'File, fee analysis and reply', rol: 'Agentic Platform · agent Client complaints and fees', kind: 'agent' },
        { paso: 'Reply, credit note and suspension of the due date (F3)', rol: 'Managing Partner', kind: 'reply' },
        { paso: 'Review of the professional conduct criterion (F4)', rol: 'Compliance Officer (AML and GDPR)', kind: 'pending' },
        { paso: 'Formal reply (F6)', rol: 'Managing Partner', kind: 'pending' }
      ],
      second_signer: { role: 'Head of Corporate and Commercial (partner)', note: 'Confirmation of the hours and the cause · pending' }
    },
    presenter: {
      running: 'While it runs: point at the Gestor de expedientes line (105 h: 76 within scope, 26 of extension and 3 of internal coordination) and the iManage line (the client asked for the extension on 04/06, but nobody estimated its cost). If needed, “Speed up”.',
      idle: [
        'An email from the Finance Director of a long-standing client: a fee note of 18,400 € against an estimate of 12,500 €, with no breakdown and no warning. On top of that, two emails unanswered since August. She says she will not pay on 15 October.',
        'This is the complaint no partner wants to answer in the heat of the moment. In production, Agentic Platform analyses it as soon as it reaches the client care mailbox. Here we launch it by hand to see what it checks.'
      ],
      pending: [
        'What is highlighted in the email is what Agentic Platform has extracted. Every item is checked: the client and the matter in the Gestor, the engagement letter in Signaturit, the deliverables in iManage.',
        'The key fact: the agreed work is within the margin. The deviation is an extension the client itself asked for, but it was accepted by email without estimating the cost, against clause 6 of the engagement letter.',
        'And a clear mistake: 3 hours of internal coordination billed, which the letter excludes. They are credited without discussion.',
        'History: two identical complaints in a year, settled with a discount on the part not warned about. The file proposes an automatic deviation alert in the Gestor.',
        'The reply acknowledges what went wrong, explains the adjustment with figures and proposes the meeting. Nothing goes out, not even the credit note, until the Managing Partner approves it.'
      ],
      approved: [
        'Approved: reply and breakdown sent, credit note for 1,740 € issued, due date suspended and meeting scheduled for 6 October. Everything is in the audit log.',
        'The comparison below: today, 3–4 people and 5 systems, and the reply usually goes out close to the deadline; here, one review and one approval on the same day.',
        'The file can be downloaded as a controlled document, with the analysis of hours, the trace of the engagement and the approvals.'
      ],
      next: {
        idle: 'Press “Analyse complaint” and read out two lines of the log: Gestor de expedientes (breakdown of the 105 h) and iManage (extension without addendum).',
        pending: 'Press “Review and approve” (at the top) or scroll down to the reply and press “Approve, issue and send”. Optional: “Correct” the matter with a non-existent one to show that it does not make up data.',
        approved: 'Press “Download complaint file” and show the fee analysis. Then move on to “Drill” for data breach RGPD-2609-03.'
      }
    }
  }
});
