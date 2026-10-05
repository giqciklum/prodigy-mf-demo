/* Banco Cierzo · complaint SAC-2026-04187 (three unrecognised card payments). English version.
 * Fictitious bank, customers and people; synthetic demo data (MFM). */
agenticPackEn('banca', {
  reclamacion: {
    code: 'SAC-2026-04187',
    nav: 'Complaint SAC-2026-04187',
    title: 'Complaint SAC-2026-04187',
    agent: 'Customer complaints',
    analyze_label: 'Analyse complaint',
    nc: 'DSP-2026-11842',
    form: { code: 'REG-SAC-001-03', rev: '5' },
    received: { date: '2026-09-28', time: '09:14' },
    due: '2026-10-20',
    holidays: ['2026-10-12'],
    customer_line: 'Lucía Ferrer Gil · Cierzo Débito card ····7731',
    due_line: 'Provisional refund today (PSD2) · reply by 20/10/2026',
    cust_name: 'Lucía Ferrer Gil',
    cust_addr: 'lucia.ferrer.gil@correo.example',
    own_name: 'Customer Service · Banco Cierzo',
    own_addr: 'atencion.cliente@bancocierzo.example',
    mail_domain: 'bancocierzo.example',
    mail_sub: 'lucia.ferrer.gil@correo.example · mailbox atencion.cliente@bancocierzo.example · English',
    mail_title: 'Customer’s email',
    mail_tab_label: 'Customer’s email',
    attachments: ['captura_movimientos_app.png', 'denuncia_policia_27-09-2026.pdf'],
    email_text: [
      'From: Lucía Ferrer Gil <lucia.ferrer.gil@correo.example>',
      'To: Customer Service · Banco Cierzo <atencion.cliente@bancocierzo.example>',
      'Date: Mon, 28 Sep 2026 09:14',
      'Subject: Complaint - Unrecognised payments on my debit card ending 7731',
      '',
      'Good morning,',
      '',
      'I am writing to make a formal complaint because three payments that I neither made nor authorised appear on my Cierzo Débito card ending in 7731, linked to my salary account.',
      '',
      'The payments were made on the night of Saturday 26 September 2026, all at a merchant shown as “TIENDAONLINE-ELEC”:',
      '- 189.90 € at 22:14',
      '- 204.60 € at 22:31',
      '- 217.90 € at 22:47',
      'In total, 612.40 €.',
      '',
      'I have not bought anything from that shop and I do not know it. That night I was at home and I have the card with me, in my purse; I have not lost it or lent it to anyone. Nor did I receive any text message with a code or any notification in the app to confirm the purchases, which always happens when I buy online.',
      '',
      'I noticed on Sunday 27 in the morning, when I saw the payment notifications in the app. I blocked the card in the app at 10:05 and then called the customer service line, where I was told the card was blocked and that I should send the complaint in writing. That same day I reported it at the Policía Nacional station in Moratalaz; I attach a copy of the police report and a screenshot of the transactions.',
      '',
      'The only thing I can think of is that a couple of weeks ago, on 14 September, I paid with this card at the Gasolinera Ronda Norte petrol station and the card terminal made me repeat the transaction twice. I do not know whether that has anything to do with it.',
      '',
      'I ask you:',
      '- to refund the 612.40 € as soon as possible, because my mortgage payment is debited on 1 October and with these charges my balance will not cover it;',
      '- to cancel this card permanently and send me a new one;',
      '- to confirm in writing that you have received this complaint and give me a reference number;',
      '- to explain how my card details could have been used and what you will do to stop it happening again.',
      '',
      'I look forward to your reply at this email address or on 600 000 418.',
      '',
      'Yours faithfully,',
      '',
      'Lucía Ferrer Gil',
      'DNI (national ID) 0000418-T',
      'Madrid'
    ].join('\n'),
    mail_extra: {
      label: 'Call to Customer Service (transcript)',
      note: 'Transcript of Sunday’s call, stored in Salesforce FSC. Agentic Platform uses it to cross-check the time of the block and what the customer was told.',
      headers: { From: 'Salesforce FSC · inbound call 900 000 112', Subject: 'Call 27/09/2026 10:12 · Lucía Ferrer Gil · 6 min 40 s · agent SAC-T-031', Date: 'Sun, 27 Sep 2026 10:12' },
      text: [
        'Agent: Banco Cierzo, good morning, Marta speaking. How can I help you?',
        'Customer: Hello, good morning. I have three payments on my debit card that are not mine, from last night, from an online shop.',
        'Agent: I am sorry to hear that. To identify you, could you confirm your DNI and date of birth? … Thank you, Ms Ferrer. I can see the card ending in 7731. Do you have the card with you?',
        'Customer: Yes, I have it here. I blocked it myself in the app a moment ago.',
        'Agent: That is right, I can see a temporary block from the app at 10:05. I can see three transactions at TIENDAONLINE-ELEC for 189.90, 204.60 and 217.90 euros. Did you receive a code by text message or any confirmation in the app for these purchases?',
        'Customer: No, nothing. That is why it seems strange to me.',
        'Agent: All right. The card stays blocked. To start the refund we need your complaint in writing; you can send it to atencion.cliente@bancocierzo.example. I would also recommend reporting it to the police.',
        'Customer: OK. How long will it take to get my money back?',
        'Agent: As soon as we receive the complaint, the team will review it. I cannot give you a date right now.',
        'Customer: It is just that my mortgage goes out on the 1st.',
        'Agent: I will note that in the case. Anything else? … Thank you for calling.',
        '',
        'Salesforce case: 00418772 · reason “Unrecognised transactions” · status: awaiting written complaint.'
      ].join('\n'),
      highlights: [
        { text: 'temporary block from the app at 10:05', label: 'Block', tone: 'ok' },
        { text: 'No, nothing.', label: 'No SCA', tone: 'crit' },
        { text: 'I cannot give you a date right now.', label: 'No deadline', tone: 'warn' }
      ]
    },
    highlights: [
      { text: 'Cierzo Débito card ending in 7731', label: 'Card', tone: 'brand' },
      { text: 'night of Saturday 26 September 2026', label: 'Date', tone: 'brand' },
      { text: '“TIENDAONLINE-ELEC”', label: 'Merchant', tone: 'brand' },
      { text: '189.90 € at 22:14', label: 'Payment 1', tone: 'crit' },
      { text: '204.60 € at 22:31', label: 'Payment 2', tone: 'crit' },
      { text: '217.90 € at 22:47', label: 'Payment 3', tone: 'crit' },
      { text: '612.40 €', label: 'Total', tone: 'crit' },
      { text: 'I have the card with me, in my purse', label: 'Possession', tone: 'ok' },
      { text: 'Nor did I receive any text message with a code or any notification in the app', label: 'No SCA' },
      { text: 'I blocked the card in the app at 10:05', label: 'Block', tone: 'ok' },
      { text: 'I reported it', label: 'Police report' },
      { text: 'Gasolinera Ronda Norte', label: 'Possible source', tone: 'warn' },
      { text: 'my mortgage payment is debited on 1 October', label: 'Urgency', tone: 'warn' }
    ],
    run: {
      title: '“Unrecognised transactions complaint” workflow',
      sub: 'Triggered when a complaint reaches the Customer Service mailbox · PR-SAC-001 and POL-FRA-003',
      graph_title: 'Customer complaint workflow',
      idle_footer: 'Reads the email, extracts and validates the data, traces the payments and the card, analyses liability under PSD2 and prepares the case file, the provisional refund and the reply. Nothing goes out without Customer Service approval.',
      nodes: [
        { id: 'correo', kind: 'trigger', label: 'Customer email', sub: 'Customer Service mailbox', systems: ['Outlook'], icon: 'mail' },
        { id: 'extraccion', label: 'Extraction and validation', systems: ['Modelo de lenguaje', 'Salesforce FSC'], icon: 'search' },
        { id: 'traza', label: 'Payment and card trace', systems: ['Core bancario T24', 'Redsys', 'Falcon Fraud', 'ServiceNow'], icon: 'git-branch' },
        { id: 'historico', label: 'History, PSD2 and reply', systems: ['Salesforce FSC', 'Procedimientos'], icon: 'clipboard' },
        { id: 'aprobacion', kind: 'approval', label: 'Customer Service approval', sub: 'Customer Service' },
        { id: 'salida', kind: 'output', label: 'Refund, reply and dispute', systems: ['Outlook', 'Core bancario T24', 'Redsys'], icon: 'send' }
      ],
      edges: [['correo', 'extraccion'], ['extraccion', 'traza'], ['traza', 'historico'], ['historico', 'aprobacion'], { from: 'aprobacion', to: 'salida', label: 'approved' }],
      graph_at: { 0: { correo: 'done', extraccion: 'active' }, 2: { extraccion: 'done', traza: 'active' }, 8: { traza: 'done', historico: 'active' }, 13: { historico: 'done', aprobacion: 'waiting' } },
      stats: [
        { label: 'Unrecognised amount · 3 payments at TIENDAONLINE-ELEC', value: '612.40 €' },
        { label: 'Strong customer authentication · acquirer’s low-risk exemption', value: 'No SCA', tone: 'warn' },
        { label: 'Similar complaints · SAC-2026-03021', value: 2, tone: 'warn' },
        { label: 'Working days left to reply · due 20/10/2026', due: true }
      ]
    },
    steps: [
      { system: 'Outlook', action: 'Reads the email from lucia.ferrer.gil@correo.example in the atencion.cliente@bancocierzo.example mailbox (28/09/2026 09:14)', result: 'Complaint about unrecognised transactions · 2 attachments (transaction screenshot and police report)', ms: 320 },
      { system: 'Modelo de lenguaje', action: 'Extracts the complaint data', result: 'Card ····7731 · 3 payments at TIENDAONLINE-ELEC on 26/09 (189.90 + 204.60 + 217.90 = 612.40 €) · card in her possession · no text message or app notification · blocked on 27/09 at 10:05 · police report filed', ms: 2900 },
      { system: 'Salesforce FSC', action: 'Identifies the customer and the earlier call', result: 'Lucía Ferrer Gil, customer since 2014, salary account · email matches the one on file · case 00418772 from the call of 27/09 10:12 linked', ms: 410, tone: 'ok' },
      { system: 'Core bancario T24', action: 'Card, payments and account balance', result: 'Cierzo Débito ····7731 (BIN 454812) · temporary block from the app on 27/09 10:05 · 3 payments posted on 28/09 · balance 341.18 € · mortgage payment of 812.35 € on 01/10', ms: 380, tone: 'warn' },
      { system: 'Redsys', action: 'Detail of the three authorisations', result: 'Card-not-present (CNP) purchase · acquirer Pagos del Ebro, EP · MCC 5732 · transaction risk analysis (TRA) exemption requested by the acquirer: no strong authentication · ECI 07', ms: 350, tone: 'warn' },
      { system: 'Falcon Fraud', action: 'Risk score and context of the night', result: 'Scores 612, 744 and 801 (blocking threshold 850) · device and IP never seen for this customer · TIENDAONLINE-ELEC accounts for 23 of tonight’s 186 suspicious transactions on BIN 454812 (to be confirmed)', ms: 520, tone: 'warn' },
      { system: 'Core bancario T24', action: 'Usual card use over the last 90 days', result: '118 recognised transactions, 9 online, all with SCA passed in the app · none at TIENDAONLINE-ELEC · 14/09/2026: Gasolinera Ronda Norte, POS 3, 52.30 € (repeated transaction)', ms: 430 },
      { system: 'ServiceNow', action: 'Looks for open incidents affecting the card', result: 'CPP-2609-07 · common point of compromise at POS 3 of Gasolinera Ronda Norte (10–22/09) · card ····7731 is among Banco Cierzo’s 1,107 affected cards', ms: 460, tone: 'warn' },
      { system: 'Redsys', action: 'Status of disputes and chargebacks on the payments', result: 'No open disputes · Visa fraud chargeback window (reason 10.4): 120 days from 28/09 · liability lies with the acquirer as it applied the exemption', ms: 390, tone: 'ok' },
      { system: 'Salesforce FSC', action: 'Looks for similar complaints in the last 12 months', result: '6 card complaints resolved · 2 similar: SAC-2026-03021 and SAC-2026-03902 (CNP purchases without SCA due to an acquirer exemption, refunded)', ms: 540, tone: 'warn' },
      { system: 'Procedimientos', action: 'Checks PR-SAC-001, POL-FRA-003 and PR-TAR-007', result: 'Art. 45 RDL 19/2018: refund by the end of the following business day (today, 29/09) · art. 46: without SCA the customer bears no losses · reply within 15 business days (Orden ECE/1263/2019): by 20/10/2026', ms: 380 },
      { system: 'Modelo de lenguaje', action: 'Drafts the Customer Service case file and the PSD2 analysis (F1–F8) with owners by role and dates', result: 'Full case file · provisional refund proposed · the link with CPP-2609-07 stays a hypothesis', ms: 5200 },
      { system: 'Redsys', action: 'Prepares the dispute with the acquirer', result: 'DSP-2026-11842 as a draft: Visa chargeback 10.4 for 612.40 € to Pagos del Ebro, EP · not submitted', ms: 300, tone: 'ok' },
      { system: 'Modelo de lenguaje', action: 'Drafts the reply to the customer and the analysis for the approver', result: 'Draft ready: acknowledgement, reference SAC-2026-04187, provisional refund today value-dated 26/09, card replacement and reply deadline · pending approval', ms: 3100, tone: 'warn' }
    ],
    lot: {
      code: 'TIENDAONLINE-ELEC',
      noun: 'merchant',
      label: 'Merchant (name in Redsys)',
      fix_title: 'the merchant of the payments',
      systems: 'Redsys and the T24 core banking system',
      systems_short: 'Redsys and T24',
      fix_text: 'If the customer has misspelt the merchant’s name, type the correct one. Agentic Platform looks it up in Redsys and checks that it has payments on card ····7731 on the disputed dates before changing anything.',
      same_body: 'It exists in Redsys (acquirer Pagos del Ebro, EP; MCC 5732) and has the three disputed payments on card ····7731. No changes.',
      unknown_hint: 'If the name is doubtful, compare it with the transaction screenshot attached by the customer.',
      mismatch_body: 'The code exists in the systems, but it has no disputed payments on card ····7731: the record is not changed.',
      known: {
        'CPP-2609-07': { kind: 'mismatch', title: 'CPP-2609-07 is the point-of-compromise case, not a merchant that charged the card', body: 'It exists in ServiceNow: common point of compromise at POS 3 of Gasolinera Ronda Norte. It is linked to the complaint as a hypothesis for the source, but the disputed payments are from TIENDAONLINE-ELEC. The record is not changed.' },
        '334512987': { kind: 'mismatch', title: '334512987 is Gasolinera Ronda Norte, not the merchant of the payments', body: 'The customer paid there on 14/09 (52.30 €, recognised transaction). It is the possible point of compromise in CPP-2609-07, not the merchant of the disputed payments. The record is not changed.' }
      }
    },
    sheet: {
      sub: 'Data extracted from the email and checked in Salesforce FSC, T24 and Redsys',
      empty_text: 'Agentic Platform will extract the card, payments, merchant, amounts and dates from the email, and check them in the core banking system and Redsys before preparing the case file, the PSD2 analysis and the reply.',
      rows: [
        { k: 'Reference', v: 'SAC-2026-04187', code: true, sub: 'Customer Service case file · linked to case 00418772 from the call of 27/09' },
        { k: 'Customer', v: 'Lucía Ferrer Gil', ok: 'Identified in Salesforce FSC · customer since 2014 · email on file' },
        { k: 'Card', v: 'Cierzo Débito ····7731 · BIN', trace: '454812', ok: 'Salary account in T24 · temporary block from the app on 27/09 at 10:05' },
        { k: 'Merchant', lot: true, ok: 'Exists in Redsys · acquirer Pagos del Ebro, EP · MCC 5732 (electronics)' },
        { k: 'Payments', v: '189.90 € (22:14) · 204.60 € (22:31) · 217.90 € (22:47) · total 612.40 €', ok: 'Match T24: authorised on 26/09, posted on 28/09' },
        { k: 'Authentication', v: 'No strong customer authentication (SCA)', sub: 'Transaction risk analysis (TRA) exemption requested by the acquirer · ECI 07' },
        { k: 'Card in her possession', v: 'Yes', sub: '“I have the card with me, in my purse” · card-not-present purchase' },
        { k: 'Evidence', v: 'Police report of 27/09 · transaction screenshot · recorded call' },
        { k: 'Possible source', v: 'Gasolinera Ronda Norte, 14/09 ·', trace: 'CPP-2609-07', sub: 'Hypothesis: common point of compromise opened by Fraud' },
        { k: 'Balance', v: '341.18 € · mortgage payment of 812.35 € on 01/10', sub: 'Without the refund, the payment would bounce' },
        { k: 'Deadlines', v: 'Provisional refund today, 29/09 · reply by 20/10/2026', due: true, sub: 'Art. 45 RDL 19/2018 · 15 business days (Orden ECE/1263/2019; 12/10 is a public holiday)' },
        { k: 'Record', v: 'DSP-2026-11842', code: true, sub: 'Dispute with the acquirer in Redsys (draft, not submitted)' }
      ]
    },
    requests: {
      title: 'What the customer asks for',
      items: [
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Refund of the 612.40 € as soon as possible', meta: ['F3 · provisional refund value-dated 26/09'], quote: 'to refund the 612.40 € as soon as possible', side: { pending: { status: 'waiting', label: 'Pending approval' }, approved: { status: 'ok', label: 'Refunded today' }, rejected: { status: 'rejected', label: 'Not refunded' } } },
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Cancel the card and send a new one', meta: ['F3 · PR-TAR-007 · permanent block and replacement'], quote: 'to cancel this card permanently and send me a new one', side: { pending: { status: 'pending', label: 'Proposed' }, approved: { status: 'ok', label: 'Replaced' }, rejected: { status: 'rejected', label: 'Not replaced' } } },
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Written acknowledgement and reference number', meta: ['Reply to the customer · SAC-2026-04187'], quote: 'to confirm in writing that you have received this complaint and give me a reference number', side: { pending: { status: 'waiting', label: 'Pending approval' }, approved: { status: 'sent', label: 'Sent' }, rejected: { status: 'rejected', label: 'Not sent' } } },
        { icon: 'clock', tone: 'warn', title: 'How the details were used and what will be done', meta: ['F4 and F7 · CPP-2609-07 as a hypothesis'], quote: 'to explain how my card details could have been used', side: { status: 'review', label: 'Hypothesis' } },
        { icon: 'calendar', tone: 'warn', title: 'Final reply within 15 business days', meta: ['F6 · resolution of the case'], quote: 'I look forward to your reply', side: { status: 'pending', label: 'By 20/10' } }
      ]
    },
    trace: {
      title: 'Trace of the payments and card ····7731',
      sub: 'Core bancario T24 · Redsys · Falcon Fraud · ServiceNow · from the possible source to the payments and the account',
      button_code: 'SAC-2026-04187',
      button_label: 'Full case file · SAC-2026-04187',
      back_title: 'Backwards · from the card to the payments',
      back: [
        { time: '14/09', title: 'Use at the possible point of compromise', text: 'Gasolinera Ronda Norte (merchant 334512987), POS 3 · 52.30 € · transaction repeated twice · recognised by the customer', tone: 'warn', ref: 'CPP-2609-07', chip: { status: 'open', label: 'Case open' } },
        { time: '26/09', timeSub: '22:14', title: 'Payment 1 · TIENDAONLINE-ELEC', text: '189.90 € · CNP · acquirer TRA exemption, no SCA · Falcon 612', tone: 'crit', ref: 'Auth. 418204' },
        { time: '26/09', timeSub: '22:31', title: 'Payment 2 · TIENDAONLINE-ELEC', text: '204.60 € · CNP · no SCA · Falcon 744 · same device', tone: 'crit', ref: 'Auth. 418731' },
        { time: '26/09', timeSub: '22:47', title: 'Payment 3 · TIENDAONLINE-ELEC', text: '217.90 € · CNP · no SCA · Falcon 801 (threshold 850)', tone: 'crit', ref: 'Auth. 419112' },
        { time: '27/09', timeSub: '10:05', title: 'Temporary block from the app', route: ['App', 'T24', 'Redsys'], route_mark: 'App', text: 'The customer blocks the card and calls Customer Service at 10:12 (case 00418772)', tone: 'ok' },
        { time: '28/09', timeSub: '09:14', title: 'Written complaint', text: 'Email to Customer Service with the police report · payments posted to the salary account that day', tone: 'brand', ref: 'SAC-2026-04187' }
      ],
      fwd_title: 'Forwards · payments, account and card',
      fwd_cols: { id: 'Item', qty: 'Amount (€)', when: 'Date', status: 'Status' },
      fwd: [
        { id: 'Auth. 418204', dest: 'TIENDAONLINE-ELEC', sub: 'Pagos del Ebro, EP', qty: '189.90', when: '26/09 22:14', status: { pending: { status: 'pending', label: 'Refund proposed' }, approved: { status: 'ok', label: 'Refunded' }, rejected: { status: 'warn', label: 'In account' } } },
        { id: 'Auth. 418731', dest: 'TIENDAONLINE-ELEC', sub: 'Pagos del Ebro, EP', qty: '204.60', when: '26/09 22:31', status: { pending: { status: 'pending', label: 'Refund proposed' }, approved: { status: 'ok', label: 'Refunded' }, rejected: { status: 'warn', label: 'In account' } } },
        { id: 'Auth. 419112', dest: 'TIENDAONLINE-ELEC', sub: 'Pagos del Ebro, EP', qty: '217.90', when: '26/09 22:47', status: { pending: { status: 'pending', label: 'Refund proposed' }, approved: { status: 'ok', label: 'Refunded' }, rejected: { status: 'warn', label: 'In account' } } },
        { id: 'DSP-2026-11842', dest: 'Visa chargeback 10.4', sub: 'to the acquirer', qty: '612.40', when: 'Draft', status: { pending: { status: 'draft', label: 'Draft' }, approved: { status: 'sent', label: 'Submitted' }, rejected: { status: 'draft', label: 'Draft' } } },
        { id: '····7731', dest: 'Cierzo Débito', sub: 'BIN 454812', qty: '—', when: '27/09 10:05', status: { pending: { status: 'hold', label: 'Temporary block' }, approved: { status: 'blocked', label: 'Cancelled · replaced' }, rejected: { status: 'hold', label: 'Temporary block' } } },
        { id: 'Mortgage payment', dest: 'Salary account', sub: 'balance 341.18 €', qty: '812.35', when: '01/10/2026', status: { pending: { status: 'warn', label: 'Insufficient balance' }, approved: { status: 'ok', label: 'Covered' }, rejected: { status: 'warn', label: 'Insufficient balance' } } }
      ],
      fwd_note: '3 payments · 612.40 € · authorised on 26/09 and posted on 28/09 · the provisional refund is value-dated 26/09 so the customer loses no interest and incurs no overdraft.',
      hypothesis: {
        title: 'Source hypothesis · to be confirmed by Fraud Prevention',
        icon: 'shield',
        paras: [
          'Card ····7731 was used on 14/09/2026 at POS 3 of Gasolinera Ronda Norte, within the period of common point of compromise CPP-2609-07 (10–22/09), and the terminal repeated the transaction. The card details may have been copied there and later used for a card-not-present purchase.',
          'For: device and IP never seen for this customer, three purchases in a row within 33 minutes at an electronics merchant, and the same merchant accounts for 23 of tonight’s 186 suspicious transactions on BIN 454812. Still to clarify: whether POS 3 is the source will be confirmed by the case’s forensic investigation.',
          'The complaint does not depend on confirming the source: without strong authentication, the customer bears no losses (art. 46 RDL 19/2018) and there is no indication of fraud on her part. That is why a refund today, with no excess, is proposed.'
        ]
      }
    },
    history: {
      sub: 'Salesforce FSC · resolved card complaints · last 12 months',
      col_id: 'Case file',
      col_product: 'Card and merchant',
      col_cause: 'Resolution',
      rows: [
        { id: 'SAC-2026-03021', date: '2026-07-12', product: 'Cierzo Débito ····2290', lot: 'MEGAOFERTAS-TECH', description: '3 unrecognised CNP purchases (498.70 €)', category: 'CNP without SCA', customer_label: 'retail customer', root_cause: 'Acquirer TRA exemption without SCA · final refund and chargeback won', nc: 'DSP-2026-07316', status: 'closed', similar: true },
        { id: 'SAC-2026-03902', date: '2026-09-03', product: 'Cierzo Crédito ····5148', lot: 'GADGETS-EXPRESS', description: '2 unrecognised CNP purchases (379.00 €)', category: 'CNP without SCA', customer_label: 'retail customer', root_cause: 'TRA exemption · refund within 1 business day · chargeback in progress', nc: 'DSP-2026-10287', status: 'final refund', similar: true },
        { id: 'SAC-2026-03544', date: '2026-08-09', product: 'Cierzo Débito ····0675', lot: 'PASARELA-VIAJES', description: 'Unrecognised purchase of 1,240 €', category: 'CNP with SCA', customer_label: 'retail customer', root_cause: 'SCA passed with a code the customer gave out on a fake call (vishing) · gross negligence · rejected', nc: 'SAC-2026-03544', status: 'closed', similar: false },
        { id: 'SAC-2026-02210', date: '2026-05-18', product: 'Cierzo Débito ····8812', lot: 'SUPERMERCADOS-ARGA', description: 'Duplicate charge on an in-store purchase', category: 'Settlement error', customer_label: 'retail customer', root_cause: 'Acquirer presented the transaction twice · refund within 2 days', nc: 'DSP-2026-04102', status: 'closed', similar: false },
        { id: 'SAC-2026-01455', date: '2026-04-02', product: 'Cierzo Crédito ····3391', lot: 'HOTEL-LISBOA-CENTRO', description: 'Unexpected currency conversion fee', category: 'Fees', customer_label: 'retail customer', root_cause: 'Dynamic currency conversion accepted at the terminal · information clarified', nc: 'SAC-2026-01455', status: 'closed', similar: false },
        { id: 'SAC-2025-08817', date: '2025-11-21', product: 'Cierzo Débito ····4407', lot: 'ATM ATM-0712', description: 'Unrecognised ATM withdrawal (300 €)', category: 'Magnetic stripe skimming', customer_label: 'retail customer', root_cause: 'Skimming at another bank’s ATM · refund and replacement', nc: 'DSP-2025-14420', status: 'closed', similar: false }
      ],
      note: {
        title: 'Same pattern as SAC-2026-03021 and SAC-2026-03902',
        body: 'Card-not-present purchases at electronics merchants, with the low-risk exemption requested by the acquirer and no strong authentication. In both cases the refund was made within one business day and the chargeback to the acquirer succeeded or is in progress. SAC-2026-03544 is different: there the customer passed SCA with a code she gave out on a fake call. In F7 the case file proposes reviewing the exemptions accepted for MCC 5732 with Fraud.'
      }
    },
    plan: {
      title: 'Case file SAC-2026-04187 · PSD2 analysis and refund proposal',
      sub: 'PR-SAC-001 · provisional refund today; final reply by 20/10/2026',
      col_label: 'Phase',
      containment_status: { pending: { text: 'Pending approval', tone: 'warn' }, approved: { text: 'Applied', tone: 'ok' }, rejected: { text: 'Not applied', tone: 'neutral' } },
      rows: [
        { d: 'F1', title: 'Admission and team', owner: ['Customer Service (SAC)'], date: '2026-09-29', status: { text: 'Complete', tone: 'ok' }, lead: 'Complaint admitted: submitted in writing by the cardholder, identified and within the 13-month period of art. 43 RDL 19/2018.', items: ['Customer Service (SAC): handling and reply', 'Fraud analyst on duty: analysis of the transactions and link with CPP-2609-07', 'Head of Payments: card replacement and chargeback', 'Head of Compliance: review of the PSD2 criteria'], note: 'Contact: Lucía Ferrer Gil (lucia.ferrer.gil@correo.example · 600 000 418).' },
        { d: 'F2', title: 'Facts', owner: ['Customer Service (SAC)'], date: '2026-09-29', status: { text: 'Complete', tone: 'ok' }, lead: 'Three card-not-present purchases at TIENDAONLINE-ELEC on 26/09/2026 between 22:14 and 22:47 (612.40 €) with Cierzo Débito card ····7731, which the customer still has. She does not recognise the transactions.', items: ['Authorisations 418204, 418731 and 419112 · acquirer Pagos del Ebro, EP · MCC 5732', 'No strong authentication: low-risk exemption requested by the acquirer (ECI 07)', 'Temporary block from the app on 27/09 at 10:05; call to Customer Service at 10:12; police report on 27/09', 'Current balance 341.18 € and mortgage payment of 812.35 € on 01/10'] },
        { d: 'F3', title: 'Immediate measures', owner: ['Customer Service (SAC)', 'Head of Payments'], date: '2026-09-29', containment: true, items: ['Provisional refund of 612.40 € today, value-dated 26/09/2026 (art. 45 RDL 19/2018: by the end of the business day following the complaint)', 'Permanent cancellation of card ····7731 and replacement with a new number (PR-TAR-007); virtual card in the app until the physical one arrives', 'Submit Visa chargeback reason 10.4 for 612.40 € to Pagos del Ebro, EP (DSP-2026-11842)', 'Keep the refund even if the chargeback fails: the bank is liable to the customer'] },
        { d: 'F4', title: 'PSD2 analysis', owner: ['Head of Compliance', 'Fraud analyst on duty'], date: '2026-09-30', status: { text: 'Proposed', tone: 'warn' }, lead: 'Unauthorised transactions: the customer did not consent to them and no strong authentication was applied. Under art. 46 RDL 19/2018, without SCA the customer would only be liable if she had acted fraudulently: there is no indication of that. Applicable excess: 0 €.', items: ['No gross negligence: she kept the card, gave out no codes, and blocked the card and reported it as soon as she noticed', 'The TRA exemption was requested by the acquirer: liability towards the bank lies with the acquirer (basis for the chargeback)', 'Source hypothesis, to be confirmed: data compromise at POS 3 of Gasolinera Ronda Norte (CPP-2609-07)'] },
        { d: 'F5', title: 'Recovery', owner: ['Head of Payments'], date: '2026-10-06', status: { text: 'Planned', tone: 'info' }, items: ['Follow up chargeback DSP-2026-11842 (acquirer response within 30 days)', 'If the acquirer provides evidence of authentication, review the case before any reversal of the refund'] },
        { d: 'F6', title: 'Resolution and final reply', owner: ['Customer Service (SAC)'], date: '2026-10-20', status: { text: 'Planned', tone: 'info' }, items: ['Reasoned reply to the customer: final refund and measures taken', 'Information on her right to refer the matter to the Banco de España Market Conduct and Claims Department if she disagrees'] },
        { d: 'F7', title: 'Prevention', owner: ['Head of Fraud Prevention'], date: '2026-10-09', status: { text: 'Planned', tone: 'info' }, items: ['Add TIENDAONLINE-ELEC and BIN 454812 to the preventive Falcon rule (tonight’s alert)', 'Review with the acquirers the TRA exemptions accepted for MCC 5732: three identical complaints in three months', 'Close CPP-2609-07 with the replacement of the 1,107 affected cards'] },
        { d: 'F8', title: 'Closure and record', owner: ['Customer Service (SAC)'], date: '2026-10-23', status: { text: 'Planned', tone: 'info' }, items: ['Closure of the case in Salesforce FSC with the evidence, and record in GRC Archer for the Customer Service annual report', 'Reporting of the fraud in the half-yearly payment fraud statistics to the Banco de España'] }
      ]
    },
    reply: {
      to_label: 'to the customer',
      subject: 'RE: Complaint - Unrecognised payments on my debit card ending 7731 - Ref. SAC-2026-04187',
      sub: 'To lucia.ferrer.gil@correo.example · in English',
      tab_label: 'To be sent',
      text: [
        'Dear Ms Ferrer,',
        '',
        'We have received your complaint of 28 September 2026 about three payments you do not recognise on your Cierzo Débito card ending in 7731, made on 26 September at the merchant TIENDAONLINE-ELEC for a total of 612.40 €. We are sorry for the inconvenience this situation is causing you.',
        '',
        'The reference for your complaint is SAC-2026-04187. Please quote it in any correspondence about this matter.',
        '',
        'We would like to inform you of the following:',
        '- Today, 29 September, we have credited the 612.40 € to your account on a provisional basis, value-dated 26 September, so that it does not cost you anything or affect the payment of your bills.',
        '- Your card ending in 7731 has been permanently cancelled. We will send a new card, with a different number, to your home address within 5 to 7 business days. In the meantime, you have a virtual card in the Banco Cierzo app for your purchases.',
        '- We have taken the matter up with the merchant’s bank to clarify the transactions.',
        '',
        'We are looking into how your card details were obtained. We will send you our final reply by 20 October 2026. Should the investigation conclude that the transactions were authorised by you, we would explain our reasons to you before making any adjustment to the refund.',
        '',
        'If you do not receive a reply within that period, or you disagree with it, you may refer the matter to the Banco de España Market Conduct and Claims Department.',
        '',
        'Please remember that Banco Cierzo will never ask you by phone, text message or email for your passwords or for the codes you receive to confirm transactions.',
        '',
        'Yours sincerely,',
        '',
        'Customer Service',
        'Banco Cierzo, S.A.',
        'atencion.cliente@bancocierzo.example'
      ].join('\n'),
      highlights: [
        { text: 'SAC-2026-04187', label: 'Reference', tone: 'brand' },
        { text: 'we have credited the 612.40 € to your account on a provisional basis, value-dated 26 September', label: 'Refund', tone: 'brand' },
        { text: 'has been permanently cancelled', label: 'Card', tone: 'brand' },
        { text: 'by 20 October 2026', label: 'Commitment', tone: 'brand' }
      ],
      llm_instructions: [
        'Formal, courteous and clear tone, as a bank writing to a retail customer (“Dear Ms Ferrer,”), following the Banco de España’s plain-language good practice. Show empathy without admitting fault or blaming the customer.',
        'Acknowledge the complaint of 28 September 2026 about the three payments at TIENDAONLINE-ELEC on 26 September (612.40 € in total) and give the reference SAC-2026-04187, asking her to quote it.',
        'Confirm the provisional credit of 612.40 € today, 29 September, value-dated 26 September, so it costs her nothing and her bills are covered.',
        'Confirm that card ending 7731 has been permanently cancelled, that a new card with a different number will reach her home in 5 to 7 business days and that she has a virtual card in the app in the meantime; say the bank has taken the matter up with the merchant’s bank.',
        'Say the bank is looking into how the card details were obtained and will send its final reply by 20 October 2026; if the investigation concluded that she authorised the transactions, the bank would explain its reasons before any adjustment of the refund.',
        'Include her right to refer the matter to the Banco de España Market Conduct and Claims Department if she gets no reply in time or disagrees, and a reminder that the bank never asks for passwords or confirmation codes by phone, text message or email.',
        'Do not reveal details of the investigation (the point of compromise, the petrol station, other affected customers, fraud scores, the chargeback or the acquirer) and do not cite internal codes other than SAC-2026-04187.',
        'Sign as: Customer Service · Banco Cierzo, S.A. · atencion.cliente@bancocierzo.example'
      ],
      criterion: 'Drafting criterion: confirms the refund, the cancellation and the legal deadlines; does not reveal details of the investigation (the point of compromise or other affected customers) or blame the customer. Plain language in line with Banco de España good practice.',
      control: {
        label: 'PSD2 analysis for the approver',
        note: 'Internal analysis that accompanies the approval; it is not sent to the customer.',
        edited_note: 'The analysis refers to Agentic Platform’s draft; the edited version includes Customer Service’s changes to the text being sent.',
        subject: 'Internal analysis · SAC-2026-04187 · DSP-2026-11842',
        text: [
          '1. Authorised transactions? There is no record of consent: the customer does not recognise them, still has the card and there was no SCA (TRA exemption requested by the acquirer, ECI 07).',
          '2. Indications of fraud by the customer? No: device and IP never seen before, no previous relationship with the merchant, block and report within 12 h, police report filed. No suspicion needs to be reported to the Banco de España.',
          '3. Liability (art. 46 RDL 19/2018): without SCA, the customer only bears losses if she acts fraudulently. The 50 € excess does not apply. Amount to refund: 612.40 €.',
          '4. Deadline (art. 45): refund by the end of the business day following the complaint of 28/09, i.e. today 29/09. Value date: 26/09 (debit date).',
          '5. Recovery: Visa chargeback 10.4 to Pagos del Ebro, EP, liable for having applied the exemption. The refund to the customer does not depend on the outcome.',
          '',
          'What is being approved: sending the reply, provisional refund of 612.40 € value-dated 26/09, cancellation and replacement of card ····7731 and submission of chargeback DSP-2026-11842.',
          'Risk if not approved today: breach of art. 45 and the 812.35 € mortgage payment bouncing on 01/10 (balance 341.18 €).'
        ].join('\n')
      }
    },
    approval: {
      title: 'Reply to Lucía Ferrer Gil, provisional refund and card replacement',
      approver: 'Customer Service (SAC)',
      policy: 'PR-SAC-001 · POL-FRA-003 · PR-TAR-007',
      summary: {
        pending: 'Agentic Platform has prepared the reply to the customer, the provisional refund of 612.40 € value-dated 26/09, the card replacement and the chargeback to the acquirer. Nothing is sent or credited until Customer Service approves it.',
        approved: 'Customer Service has approved the proposal. Agentic Platform has sent the reply, credited 612.40 € in T24, cancelled and replaced card ····7731 and submitted chargeback DSP-2026-11842 in Redsys.',
        rejected: 'Customer Service has rejected the proposal: the reply has not been sent, nothing has been credited and the card has not been replaced.'
      },
      scope: [
        { label: 'Reply to the customer', state: { pending: { status: 'pending', chip: 'Send' }, approved: { status: 'sent', chip: 'Sent' }, rejected: { status: 'rejected', chip: 'Not sent' } } },
        { label: 'Provisional refund', value: '612.40 € · value-dated 26/09', state: { pending: { status: 'pending', chip: 'Credit' }, approved: { status: 'ok', chip: 'Credited' }, rejected: { status: 'rejected', chip: 'Not credited' } } },
        { label: 'Card ····7731', value: 'Cancellation and replacement', state: { pending: { status: 'pending', chip: 'Replace' }, approved: { status: 'ok', chip: 'Replaced' }, rejected: { status: 'hold', chip: 'Temporary block' } } },
        { label: 'Visa chargeback 10.4', value: 'DSP-2026-11842 · Pagos del Ebro', state: { pending: { status: 'pending', chip: 'Submit' }, approved: { status: 'sent', chip: 'Submitted' }, rejected: { status: 'draft', chip: 'Draft' } } },
        { label: 'Preventive rule in Falcon', value: 'TIENDAONLINE-ELEC · BIN 454812', state: { status: 'evaluate', chip: 'With the Fraud alert' } }
      ],
      effects: [
        'Outlook: reply sent from atencion.cliente@bancocierzo.example',
        'Core bancario T24: credit of 612.40 € to the salary account, value-dated 26/09/2026',
        'Core bancario T24 and Redsys: card ····7731 cancelled and replacement ordered with a new number',
        'Redsys: chargeback DSP-2026-11842 submitted to Pagos del Ebro, EP',
        'Salesforce FSC: case file SAC-2026-04187 in progress and case 00418772 closed'
      ],
      approve_label: 'Approve, refund and send',
      next_step: 'Next step: confirm the source with Fraud (CPP-2609-07), follow up the chargeback and send the final reply by 20/10/2026.',
      toast_approved: 'Reply sent to Lucía Ferrer Gil · 612.40 € refunded and card replaced',
      reject_text: 'The reply is not sent, nothing is credited and the card is not replaced. The reason is kept in the audit log. Remember that the art. 45 deadline expires today.',
      reject_placeholder: 'For example: ask Fraud to confirm the absence of SCA before refunding',
      reject_audit: 'nothing is sent or credited',
      toast_rejected: 'Proposal rejected: nothing has been sent and no amount has been credited'
    },
    compare: {
      rows: [
        { k: 'People involved', hoy: '3–4: Customer Service, Fraud, Payments and Compliance', pro_strong: '1', pro: ': Customer Service reviews, corrects if needed and approves' },
        { k: 'Systems to open', hoy: '6: Outlook, Salesforce FSC, T24, Redsys, Falcon and ServiceNow', pro_strong: '1', pro: ': this console; Agentic Platform queries all 6' }
      ],
      steps_today: '12–15 manual queries, cross-checks and drafts',
      time_label: 'Analysis, case file and reply',
      time_today: '2–4 h of work; the refund is often delayed to the next day',
      footer: 'Proposed acceptance criterion for the pilot: case file and refund proposal in under 15 minutes, 100% of refunds within the art. 45 deadline and Customer Service accepts the draft with minor edits in at least 70% of cases.'
    },
    audit: {
      requested: { action: 'Complaint analysis requested', detail: 'SAC-2026-04187 · email from lucia.ferrer.gil@correo.example of 28/09/2026 09:14' },
      analyzed: { action: 'Complaint analysed', detail: 'SAC-2026-04187 · card ····7731 · 3 payments · 612.40 €' },
      after_analysis: [
        { action: 'Dispute prepared as a draft', detail: 'DSP-2026-11842 · Redsys · Visa chargeback 10.4 · not submitted' },
        { action: 'Customer Service case file and PSD2 analysis prepared', detail: 'SAC-2026-04187 · F1–F8 · excess 0 € · provisional refund proposed' },
        { action: 'Customer reply drafted', detail: 'SAC-2026-04187 · English · version 1 · pending approval' }
      ],
      approved: { action: 'Reply approved and sent', detail: 'SAC-2026-04187 · to lucia.ferrer.gil@correo.example' },
      after_approval: [
        { action: 'Provisional refund applied', detail: 'Core bancario T24 · 612.40 € · value-dated 26/09/2026 · Lucía Ferrer Gil’s salary account' },
        { action: 'Card cancelled and replaced', detail: 'T24 and Redsys · ····7731 cancelled · replacement with a new number · virtual card active' },
        { action: 'Chargeback submitted', detail: 'Redsys · DSP-2026-11842 · Visa 10.4 · 612.40 € to Pagos del Ebro, EP' },
        { action: 'Case file updated', detail: 'Salesforce FSC · SAC-2026-04187 in progress · case 00418772 closed' }
      ]
    },
    outcome_label: 'Refund of 612.40 € and reply sent · SAC-2026-04187 in progress',
    toast_analyzed: 'Complaint analysed · case file, refund and reply drafted',
    status_chips: { idle: 'Open · not analysed', pending: 'Awaiting Customer Service approval', approved: 'Refunded and answered · case in progress', rejected: 'Proposal rejected' },
    report: {
      button: 'Download case file',
      title: 'Complaint case file SAC-2026-04187',
      subtitle: 'Unrecognised card transactions · 3 payments at TIENDAONLINE-ELEC (612.40 €) · Cierzo Débito card ····7731 · PSD2 analysis and refund proposal',
      filename: 'case-file-SAC-2026-04187',
      meta: [['Centre', 'Operations Centre · Madrid'], ['Complaint', 'SAC-2026-04187 · 28/09/2026 09:14'], ['Card', 'Cierzo Débito ····7731 (BIN 454812)'], ['Reply', 'by 20/10/2026']],
      state: { pending: 'Draft · pending approval', approved: 'Provisional refund applied · F4 under review', rejected: 'Draft · proposal rejected' },
      summary: [
        'Complaint from customer Lucía Ferrer Gil about three card-not-present purchases she does not recognise, made on 26/09/2026 between 22:14 and 22:47 at TIENDAONLINE-ELEC (acquirer Pagos del Ebro, EP; MCC 5732) for a total of 612.40 €. The customer still has the card, blocked it in the app on 27/09 at 10:05 and filed a police report.',
        'The transactions were authorised without strong authentication, under the low-risk exemption requested by the acquirer. Under art. 46 RDL 19/2018, the customer bears no losses unless she acted fraudulently, of which there is no indication. A provisional refund today (art. 45) value-dated 26/09 and a chargeback to the acquirer are proposed.',
        'Source hypothesis, to be confirmed by Fraud Prevention: data compromise at POS 3 of Gasolinera Ronda Norte (case CPP-2609-07), where the customer paid on 14/09/2026.'
      ],
      trace_heading: 'Annex A · Card and payment trace',
      trace_rows: [
        { etapa: 'Card use', fecha: '14/09/2026', detalle: 'Gasolinera Ronda Norte, POS 3 · 52.30 € · repeated transaction · recognised', ref: 'CPP-2609-07' },
        { etapa: 'Authorisation', fecha: '26/09/2026 22:14', detalle: 'TIENDAONLINE-ELEC · 189.90 € · CNP · TRA exemption, no SCA · Falcon 612', ref: 'Auth. 418204' },
        { etapa: 'Authorisation', fecha: '26/09/2026 22:31', detalle: 'TIENDAONLINE-ELEC · 204.60 € · CNP · no SCA · Falcon 744', ref: 'Auth. 418731' },
        { etapa: 'Authorisation', fecha: '26/09/2026 22:47', detalle: 'TIENDAONLINE-ELEC · 217.90 € · CNP · no SCA · Falcon 801', ref: 'Auth. 419112' },
        { etapa: 'Block', fecha: '27/09/2026 10:05', detalle: 'Temporary block from the app by the customer', ref: '····7731' },
        { etapa: 'Call', fecha: '27/09/2026 10:12', detalle: 'Call to Customer Service · told to complain in writing', ref: '00418772' },
        { etapa: 'Posting', fecha: '28/09/2026', detalle: 'The three payments are posted to the salary account', ref: 'T24' },
        { etapa: 'Complaint', fecha: '28/09/2026 09:14', detalle: 'Email to Customer Service with the police report and transaction screenshot', ref: 'SAC-2026-04187' }
      ],
      units: {
        heading: 'Annex B · Transactions on card ····7731 (14/09–27/09/2026)',
        cols: [{ label: 'Date', key: 'fecha' }, { label: 'Merchant', key: 'comercio' }, { label: 'Channel', key: 'canal' }, { label: 'Amount (€)', key: 'importe', num: true }, { label: 'Authorisation', key: 'aut', mono: true }, { label: 'Status', key: 'estado', status: true }],
        rows: [
          { fecha: '14/09/2026 08:41', comercio: 'Gasolinera Ronda Norte (POS 3)', canal: 'In person · chip', importe: '52.30', aut: '402117', estado: 'Recognised' },
          { fecha: '16/09/2026 19:02', comercio: 'Supermercados Arga · Moratalaz', canal: 'In person · contactless', importe: '64.85', aut: '404590', estado: 'Recognised' },
          { fecha: '19/09/2026 13:20', comercio: 'Farmacia Vinateros', canal: 'In person · contactless', importe: '18.40', aut: '407233', estado: 'Recognised' },
          { fecha: '21/09/2026 21:05', comercio: 'Streaming platform', canal: 'Online · SCA in the app', importe: '13.99', aut: '409871', estado: 'Recognised' },
          { fecha: '24/09/2026 09:37', comercio: 'Metro de Madrid', canal: 'In person · contactless', importe: '12.20', aut: '413006', estado: 'Recognised' },
          { fecha: '26/09/2026 22:14', comercio: 'TIENDAONLINE-ELEC', canal: 'Online · no SCA (TRA)', importe: '189.90', aut: '418204', estado: 'Not recognised', estado_after: 'Refunded' },
          { fecha: '26/09/2026 22:31', comercio: 'TIENDAONLINE-ELEC', canal: 'Online · no SCA (TRA)', importe: '204.60', aut: '418731', estado: 'Not recognised', estado_after: 'Refunded' },
          { fecha: '26/09/2026 22:47', comercio: 'TIENDAONLINE-ELEC', canal: 'Online · no SCA (TRA)', importe: '217.90', aut: '419112', estado: 'Not recognised', estado_after: 'Refunded' }
        ]
      },
      history_heading: 'Annex C · Resolved card complaints (12 months)',
      approvals: [
        { paso: 'Case file, PSD2 analysis and reply', rol: 'Agentic Platform · Customer complaints agent', kind: 'agent' },
        { paso: 'Reply, provisional refund and replacement (F3)', rol: 'Customer Service (SAC)', kind: 'reply' },
        { paso: 'Review of the PSD2 criteria (F4)', rol: 'Head of Compliance', kind: 'pending' },
        { paso: 'Final resolution (F6)', rol: 'Customer Service (SAC)', kind: 'pending' }
      ],
      second_signer: { role: 'Head of Fraud Prevention', note: 'Confirmation of the source (CPP-2609-07) · pending' }
    },
    presenter: {
      running: 'While it runs: point out the Redsys line (acquirer exemption, no SCA) and the ServiceNow line (the card is in point of compromise CPP-2609-07). If needed, “Speed up”.',
      idle: [
        'Email from a customer, Lucía Ferrer Gil: three payments totalling 612.40 € that she does not recognise, at an online shop, on Saturday night. She has the card, blocked it on Sunday and her mortgage goes out on 1 October.',
        'PSD2 requires the amount to be refunded by the end of the following business day: today. In production, Agentic Platform analyses it as soon as it reaches the Customer Service mailbox. Here we launch it by hand to see what it queries.'
      ],
      pending: [
        'What is highlighted in the email is what Agentic Platform has extracted. Each item is checked: the customer in Salesforce, the card and payments in T24, the authorisations in Redsys.',
        'The key finding for the refund: the three purchases were authorised without strong authentication, because the acquirer requested the low-risk exemption. Without SCA, the customer bears no losses: zero excess.',
        'The finding that changes the investigation: on 14/09 the card was used at the petrol station of point of compromise CPP-2609-07, the one Fraud has opened. It is a hypothesis about the source; it is not needed to make the refund.',
        'History: two identical complaints in three months, refunded and charged back to the acquirer. The case file proposes reviewing those exemptions with Fraud.',
        'The reply confirms the refund, the cancellation and the legal deadlines, and reveals nothing about the investigation. Nothing goes out, not even the refund, until Customer Service approves it.'
      ],
      approved: [
        'Approved: reply sent, 612.40 € refunded value-dated 26/09, card replaced and chargeback submitted. The mortgage payment is covered. Everything is in the audit log.',
        'The comparison below: today, 3–4 departments and 6 systems, and the refund often goes out the next day; here, one review and one approval within the deadline.',
        'The case file downloads as a controlled document, with the PSD2 analysis, the transaction trace and the approvals.'
      ],
      next: {
        idle: 'Press “Analyse complaint” and read out two lines of the log: Redsys (no SCA) and ServiceNow (point of compromise).',
        pending: 'Press “Review and approve” (at the top) or scroll down to the reply and press “Approve, refund and send”. Optional: “Correct” the merchant with a non-existent one to show that it does not make up data.',
        approved: 'Press “Download case file” and show the PSD2 analysis. Then move on to “Drill” for point of compromise CPP-2609-07.'
      }
    }
  }
});
