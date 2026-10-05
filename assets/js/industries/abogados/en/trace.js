/* Mora & Jordano · traceability records by file (litigation, corporate, invoice, complaint and GDPR breach), English.
 * Read by App.traceModal from CN_DATA.trace[code]. Data subjects’ personal data always pseudonymised.
 * Synthetic demo data (MFM). */
agenticPackEn('abogados', {
  trace: (function () {
    'use strict';

    const DOC_COLS = [
      { key: 'doc', label: 'Document', mono: true, sub: 'what' },
      { key: 'matter', label: 'File', sub: 'client' },
      { key: 'last', label: 'Last access', sub: 'who' },
      { key: 'status', label: 'Status', chip: true }
    ];
    const doc = (d, what, matter, client, last, who, status) => ({ doc: d, what, matter, client, last, who, status });

    /* ---------------------------------------------------------------- Litigation file PRC-2026-0412 */

    const prc = {
      kind: 'Litigation file',
      title: 'File PRC-2026-0412 · PO 1184/2026 · Aceites Sierra Subbética, S.L.',
      summary: [
        ['Client', 'Aceites Sierra Subbética, S.L. · client since 2019 (Tax and Corporate)'],
        ['Proceedings', 'Ordinary civil proceedings (juicio ordinario) 1184/2026 · debt claim'],
        ['Court', 'Court of First Instance no. 7 of Málaga'],
        ['Position', 'Defendant'],
        ['Service', 'LexNET · 29-09-2026 08:12'],
        ['Time limit', 'Defence within 20 business days · due 27-10-2026'],
        ['Conflict', 'Possible: the firm advised the claimant in 2025 (Art. 12 of the Code of Professional Conduct)'],
        ['Status', 'Engagement acceptance blocked · pending the Managing Partner']
      ],
      back: [
        { when: '2025-03-14', stage: 'Advice to the claimant', detail: 'Almazara Hojiblanca del Genil, S.A., now the claimant, was a client in 2025 (MER-2025-0219 and MER-2025-0241)', ref: 'Gestor de expedientes', tone: 'warn' },
        { when: '2026-07-21', stage: 'Prior demand', detail: 'The client forwards a burofax from the claimant demanding payment for olive oil supplies; filed without opening a matter', ref: 'Outlook' },
        { when: '2026-09-29 08:12', stage: 'Service of the claim', detail: 'Admission decree, statement of claim and documents via LexNET; access recorded at 08:12', ref: 'LexNET', tone: 'crit' },
        { when: '2026-09-29 08:13', stage: 'File opened', detail: 'PRC-2026-0412 is opened and assigned to the client’s usual lawyer', ref: 'PRC-2026-0412', tone: 'brand' },
        { when: '2026-09-29 08:14', stage: 'Conflict detected', detail: 'The opposing-party search finds the claimant as a client of the firm in 2025', ref: 'POL-CON-002', tone: 'crit' },
        { when: '2026-09-29 08:15', stage: 'Lawyer absent', detail: 'The assigned lawyer is on holiday until 13-10-2026', ref: 'Outlook', tone: 'warn' },
        { when: '2026-09-29 09:00', stage: 'Alarm escalated', detail: 'Task TAR-26-3101: acceptance blocked until the Managing Partner decides', ref: 'TAR-26-3101', tone: 'crit' }
      ],
      forward: {
        title: 'Deadlines and actions on the file',
        cols: [
          { key: 'step', label: 'Action' },
          { key: 'owner', label: 'Owner' },
          { key: 'due', label: 'Due' },
          { key: 'status', label: 'Status', chip: true }
        ],
        rows: [
          { step: 'Resolve the possible conflict of interest', owner: 'Managing Partner', due: '30-09-2026', status: 'waiting' },
          { step: 'Reassign to an available Litigation lawyer', owner: 'Partner, Head of Litigation', due: '30-09-2026', status: 'pending' },
          { step: 'Inform the client of the claim and the time limit', owner: 'Partner, Head of Litigation', due: '30-09-2026', status: 'waiting' },
          { step: 'Engagement letter and fee advance (Signaturit)', owner: 'Client care and billing', due: '02-10-2026', status: 'pending' },
          { step: 'Review of the client’s AML due diligence', owner: 'Head of Compliance (AML and GDPR)', due: '02-10-2026', status: 'pending' },
          { step: 'Defence filed via LexNET', owner: 'Assigned lawyer', due: '27-10-2026', status: 'pending' }
        ],
        note: { title: 'Agentic Platform proposal', body: 'Block acceptance until the conflict is resolved (POL-CON-002), reassign the matter, enter the deadline in the diary with reminders at 10, 5 and 2 business days (PRO-PLZ-001) and prepare the communication to the client. Accepting the engagement and writing to the client requires the Managing Partner’s approval.', icon: 'scale' }
      },
      units: { label: 'Documents (iManage)', cols: DOC_COLS, rows: [
        doc('IMN-2026-118402', 'Admission decree', 'PRC-2026-0412', 'Aceites Sierra Subbética', '29/09 08:13', 'Matter management system', { status: 'done', label: 'Filed' }),
        doc('IMN-2026-118403', 'Statement of claim (38 pp.)', 'PRC-2026-0412', 'Aceites Sierra Subbética', '29/09 08:13', 'Matter management system', { status: 'done', label: 'Filed' }),
        doc('IMN-2026-118404', 'Documents 1 to 14 of the claim', 'PRC-2026-0412', 'Aceites Sierra Subbética', '29/09 08:13', 'Matter management system', { status: 'done', label: 'Filed' }),
        doc('IMN-2026-118405', 'LexNET access receipt', 'PRC-2026-0412', 'Aceites Sierra Subbética', '29/09 08:13', 'LexNET', { status: 'done', label: 'Filed' }),
        doc('IMN-2026-118411', 'Conflict of interest report', 'PRC-2026-0412', 'Aceites Sierra Subbética', '29/09 08:14', 'Agentic Platform', { status: 'review', label: 'Awaiting decision' }),
        doc('IMN-2026-118412', 'Calculation of the defence deadline', 'PRC-2026-0412', 'Aceites Sierra Subbética', '29/09 08:16', 'Agentic Platform', { status: 'review', label: 'Awaiting validation' }),
        doc('IMN-2026-074120', 'Claimant’s burofax (21/07)', 'No file', 'Aceites Sierra Subbética', '29/09 08:20', 'Agentic Platform', { status: 'pending', label: 'To be linked' })
      ] },
      quality: [
        'Counted in business days from the day after service (Arts. 133 and 151 LEC); Saturdays, Sundays, public holidays and August are non-working days (Art. 130.2 LEC).',
        'National holiday of 12 October excluded; no Málaga local holidays in the period.',
        'The court agent’s transfer reached LexNET on 28-09-2026 at 17:52 and the matter system logged it at 08:12; the time limit runs from 29-09-2026 (12-10 is a holiday) and ends on 27-10-2026, with a grace day until 15:00 on 28-10 (Art. 135.5 LEC).',
        'The conflict check covers clients, opposing parties and related companies over the last 10 years (POL-CON-002).'
      ],
      notes: [
        { title: 'Possible conflict of interest', body: 'The firm cannot defend the client against a former client if there is a risk of using confidential information obtained in the 2025 matter (Art. 12 of the Code of Professional Conduct). The Managing Partner decides.', tone: 'crit', icon: 'alert-triangle' },
        { title: 'Lawyer on holiday', body: 'The assigned lawyer returns on 13-10-2026: without reassignment, 10 of the 20 business days to file the defence would be lost.', tone: 'warn', icon: 'clock' }
      ]
    };

    /* ---------------------------------------------------------------- Corporate matter MER-2026-0219 */

    const mer = {
      kind: 'Corporate file',
      title: 'File MER-2026-0219 · purchase of 100% of Hotel Bahía de Nerja, S.L.',
      summary: [
        ['Client', 'Grupo Hostelero Costa del Sol, S.L.'],
        ['Matter', 'Acquisition of 100% of the shares in Hotel Bahía de Nerja, S.L.'],
        ['Engagement letter', 'HE-2026-0219 · signed on Signaturit on 12/03/2026'],
        ['Fee estimate', '12,500 € + VAT (legal due diligence, share purchase agreement and closing)'],
        ['Scope extension', 'Planning and tourist licence due diligence requested on 04/06 · no signed addendum'],
        ['Share purchase agreement', 'Signed on 24/07/2026'],
        ['Closing', 'Pending a condition precedent: transfer of the tourist licence'],
        ['Open complaint', 'REC-2026-0057 (invoice F-2026-0938)']
      ],
      back: [
        { when: '2026-03-12', stage: 'Engagement letter', detail: 'HE-2026-0219 signed by the client on Signaturit; estimate of 12,500 € + VAT', ref: 'HE-2026-0219', tone: 'brand' },
        { when: '2026-04-20', stage: 'Legal due diligence', detail: 'Corporate, employment and contractual due diligence report delivered to the client', ref: 'iManage' },
        { when: '2026-06-04', stage: 'Scope extension', detail: 'The client asks by email for a review of the hotel’s planning status and tourist licence; work proceeds without an addendum to the engagement letter', ref: 'Outlook', tone: 'warn' },
        { when: '2026-07-24', stage: 'Agreement signed', detail: 'Share purchase agreement signed; closing subject to transfer of the tourist licence', ref: 'Signaturit' },
        { when: '2026-09-15', stage: 'Invoice', detail: 'Invoice F-2026-0938 for 18,400 € + VAT (105 h recorded)', ref: 'F-2026-0938', tone: 'warn' },
        { when: '2026-09-28 10:41', stage: 'Client complaint', detail: 'The client disputes the invoice against the estimate and complains of a lack of information', ref: 'REC-2026-0057', tone: 'crit' }
      ],
      forward: {
        title: 'Billing on the matter',
        cols: [
          { key: 'concept', label: 'Item' },
          { key: 'hours', label: 'Hours' },
          { key: 'amount', label: 'Amount' },
          { key: 'basis', label: 'Contractual basis' },
          { key: 'status', label: 'Status', chip: true }
        ],
        rows: [
          { concept: 'Legal due diligence', hours: '41 h', amount: '7,175 €', basis: 'HE-2026-0219', status: 'done' },
          { concept: 'Share purchase agreement and negotiation', hours: '38 h', amount: '6,650 €', basis: 'HE-2026-0219', status: 'done' },
          { concept: 'Planning and tourist licence due diligence', hours: '26 h', amount: '4,575 €', basis: 'Email of 04/06 · no addendum', status: { status: 'review', label: 'Disputed' } },
          { concept: 'Closing and condition precedent', hours: '—', amount: '—', basis: 'HE-2026-0219', status: 'pending' }
        ],
        note: { title: 'Balance', body: '18,400 € invoiced (105 h at 175 €/h) = 13,825 € for the agreed scope, already 1,325 € over the 12,500 € estimate, + 4,575 € for the extension with no addendum.', icon: 'euro' }
      },
      quality: [
        'Fee policy (POL-HON-004): any scope extension requires a signed addendum or written confirmation of the estimate before it is invoiced.',
        'The General Statute of the Legal Profession (RD 135/2021) requires the client to be informed of the foreseeable cost and how it evolves.',
        'No status reports sent to the client between 24/07 and 15/09.'
      ],
      notes: [
        { title: 'Extension with no addendum', body: 'The planning due diligence was requested by email on 04/06, but no addendum was signed and the estimate was not updated: this is the weak point of the invoice.', tone: 'warn', icon: 'file-text' }
      ]
    };

    /* ---------------------------------------------------------------- Invoice F-2026-0938 */

    const fac = {
      kind: 'Invoice',
      title: 'Invoice F-2026-0938 · Grupo Hostelero Costa del Sol, S.L.',
      summary: [
        ['Date', '15/09/2026'],
        ['Taxable base', '18,400 €'],
        ['VAT (21%)', '3,864 €'],
        ['Total', '22,264 €'],
        ['Due', '15/10/2026 · unpaid'],
        ['Hours recorded', '105 h'],
        ['File', 'MER-2026-0219'],
        ['Proposal', 'Draft credit note R-2026-0041 for 1,740 € + VAT']
      ],
      back: [
        { when: '2026-03-12', stage: 'Estimate', detail: '12,500 € + VAT in engagement letter HE-2026-0219', ref: 'HE-2026-0219' },
        { when: '2026-09-12', stage: 'Pro forma', detail: 'The Partner, Head of Corporate approves the 105 h pro forma with no discount', ref: 'Gestor de expedientes' },
        { when: '2026-09-15', stage: 'Issue', detail: 'Invoice issued and emailed to the client', ref: 'F-2026-0938', tone: 'brand' },
        { when: '2026-09-28 10:41', stage: 'Complaint', detail: 'The client considers it higher than agreed', ref: 'REC-2026-0057', tone: 'crit' },
        { when: '2026-09-29', stage: 'Draft credit note', detail: 'Draft R-2026-0041 for 1,740 € + VAT, pending approval', ref: 'R-2026-0041', tone: 'warn' }
      ],
      forward: {
        title: 'Collection and adjustment',
        cols: [
          { key: 'step', label: 'Step' },
          { key: 'owner', label: 'Owner' },
          { key: 'due', label: 'Due' },
          { key: 'status', label: 'Status', chip: true }
        ],
        rows: [
          { step: 'Suspend collection while the complaint is resolved', owner: 'Client care and billing', due: '29/09/2026', status: 'done' },
          { step: 'Approve or reject credit note R-2026-0041', owner: 'Partner, Head of Corporate', due: '13/10/2026', status: 'waiting' },
          { step: 'Invoice due date', owner: 'Client', due: '15/10/2026', status: 'pending' }
        ],
        note: { title: 'Background', body: 'The previous invoice to the same client, F-2026-0871 (Tax), was paid without issues.', icon: 'history' }
      },
      units: { label: 'Time entries', cols: [
        { key: 'block', label: 'Block', sub: 'period' },
        { key: 'who', label: 'Profile' },
        { key: 'hours', label: 'Hours' },
        { key: 'status', label: 'Status', chip: true }
      ], rows: [
        { block: 'Legal due diligence', period: 'March-April', who: 'Corporate associates', hours: '41 h', status: 'done' },
        { block: 'Negotiation and agreement', period: 'May-July', who: 'Partner and senior associate', hours: '38 h', status: 'done' },
        { block: 'Planning and tourist licence', period: 'June-July', who: 'Corporate and Civil associate', hours: '26 h', status: { status: 'review', label: 'Outside the estimate' } },
        { block: 'Week 39 unrecorded', period: '21-27/09', who: 'Corporate associates', hours: '22 h', status: { status: 'pending', label: 'Unrecorded' } }
      ] },
      quality: [
        'The 105 h invoiced match the hours recorded in the matter management system up to 12/09.',
        'The 22 h from week 39 are not invoiced and must be recorded before replying to the complaint.'
      ],
      notes: [
        { title: 'Similar complaints', body: 'REC-2026-0031 and REC-2025-0118 also arose from scope extensions with no addendum.', tone: 'warn', icon: 'search' }
      ]
    };

    /* ---------------------------------------------------------------- Complaint REC-2026-0057 */

    const rec = {
      kind: 'Complaint file',
      title: 'File REC-2026-0057 · fee complaint',
      summary: [
        ['Client', 'Grupo Hostelero Costa del Sol, S.L. · client since 2021'],
        ['Reason', 'Invoice higher than the engagement letter and lack of information on the matter'],
        ['Invoice', 'F-2026-0938 · 18,400 € + VAT'],
        ['Matter', 'MER-2026-0219 · purchase of Hotel Bahía de Nerja, S.L.'],
        ['Received', '28/09/2026 10:41 · email to the Partner, Head of Corporate'],
        ['Internal reply', 'By 20/10/2026'],
        ['Framework', 'RD 135/2021 · Code of Professional Conduct · POL-HON-004 · engagement letter'],
        ['Status', 'Open · collection suspended']
      ],
      back: [
        { when: '2026-03-12', stage: 'Engagement letter', detail: 'Estimate of 12,500 € + VAT', ref: 'HE-2026-0219' },
        { when: '2026-06-04', stage: 'Extension with no addendum', detail: 'Planning and tourist licence due diligence requested by email', ref: 'MER-2026-0219', tone: 'warn' },
        { when: '2026-09-15', stage: 'Invoice', detail: 'F-2026-0938 for 18,400 € + VAT', ref: 'F-2026-0938', tone: 'warn' },
        { when: '2026-09-28 10:41', stage: 'Complaint', detail: 'The client disputes the amount and asks for a report on the status of the closing', ref: 'REC-2026-0057', tone: 'crit' },
        { when: '2026-09-29 09:00', stage: 'Link detected', detail: '22 h on the matter unrecorded in week 39', ref: 'HRS-SIN', tone: 'warn' }
      ],
      forward: {
        title: 'Steps in the file',
        cols: [
          { key: 'step', label: 'Step' },
          { key: 'owner', label: 'Owner' },
          { key: 'due', label: 'Due' },
          { key: 'status', label: 'Status', chip: true }
        ],
        rows: [
          { step: 'Acknowledgement of receipt to the client', owner: 'Client care and billing', due: '29/09/2026', status: 'pending' },
          { step: 'Analysis of hours against the engagement letter', owner: 'Partner, Head of Corporate', due: '06/10/2026', status: 'pending' },
          { step: 'Status report on the closing for the client', owner: 'Partner, Head of Corporate', due: '06/10/2026', status: 'pending' },
          { step: 'Decision on credit note R-2026-0041', owner: 'Managing Partner', due: '13/10/2026', status: 'waiting' },
          { step: 'Final reply', owner: 'Partner, Head of Corporate', due: '20/10/2026', status: 'pending' }
        ],
        note: { title: 'Communication with the client', body: 'Every reply to the client requires the Managing Partner’s approval.', icon: 'send' }
      },
      quality: [
        'Fee complaints in 2026: 3 (REC-2026-0031, REC-2026-0057 and one in Civil); 2 due to extensions with no addendum.',
        'If the client were acting as a consumer, Ley 44/2006 (consumer protection) would apply; here it is a trading company.'
      ],
      notes: [
        { title: 'Background', body: 'REC-2025-0118 was closed with a 10% credit note after a scope extension with no addendum.', tone: 'warn', icon: 'history' }
      ]
    };

    /* ---------------------------------------------------------------- Breach drill RGPD-2609-03 */

    const rgpd = {
      kind: 'Data breach file',
      title: 'File RGPD-2609-03 · drill: email sent to the wrong recipient',
      summary: [
        ['Type', 'Drill · confidentiality breach by email'],
        ['Documents', 'Promociones Guadalhorce, S.A. due diligence: PDF report and 2 XLSX annexes (iManage)'],
        ['Sent', '28/09/2026 18:47 · Outlook · Asesoría Morales Benalmádena, via autocomplete'],
        ['Detected', '29/09/2026 08:05 · reported by the wrong recipient'],
        ['Encryption', 'PDF report encrypted (AES-256); the 2 XLSX annexes unencrypted'],
        ['Data subjects', '255 unique individuals · 173 at high risk'],
        ['AEPD deadline', '72 h from detection · until 02/10/2026 08:05 (GDPR, Art. 33)'],
        ['Owner', 'Data Protection Officer · PRO-RGPD-005']
      ],
      back: [
        { when: '2026-09-22', stage: 'Report filed', detail: 'Due diligence report (v3) encrypted in iManage', ref: 'MJ-MER-0233-0148' },
        { when: '2026-09-28 18:47', stage: 'Wrong send', detail: 'Email with 3 attachments and a data room link to an external recipient with a similar name', ref: 'Outlook', tone: 'crit' },
        { when: '2026-09-28 18:50', stage: 'Recall attempt', detail: 'Message recall failed: the recipient is on another domain', ref: 'Outlook', tone: 'warn' },
        { when: '2026-09-29 08:05', stage: 'Detection', detail: 'The wrong recipient emails to say it received the message', ref: 'RGPD-2609-03', tone: 'crit' },
        { when: '2026-09-29 08:11', stage: 'File opened', detail: 'Compliance logs the breach and starts the 72-hour clock', ref: 'PRO-RGPD-005', tone: 'brand' }
      ],
      forward: {
        title: 'Affected parties and communications',
        cols: [
          { key: 'group', label: 'Affected', sub: 'what' },
          { key: 'count', label: 'People' },
          { key: 'data', label: 'Data exposed' },
          { key: 'action', label: 'Action' },
          { key: 'status', label: 'Status', chip: true }
        ],
        rows: [
          { group: 'Promociones Guadalhorce, S.A.', what: 'Client', count: '—', data: 'Confidential information and professional secrecy', action: 'Notify the client', status: 'waiting' },
          { group: 'Client employees', what: 'Unencrypted employment annex', count: '142', data: 'ID, salary, IBAN; sick leave for 17', action: 'Communication (Art. 34)', status: 'pending' },
          { group: 'Claimant buyers', what: 'Unencrypted litigation annex', count: '31', data: 'Name, home, proceedings and amount', action: 'Communication (Art. 34)', status: 'pending' },
          { group: 'Other data subjects', what: 'Only in the encrypted report', count: '82', data: 'Protected by encryption', action: 'No communication (Art. 34.3.a)', status: 'ok' },
          { group: 'Wrong recipient', what: 'Third party', count: '1', data: '—', action: 'Deletion request and certificate', status: 'pending' },
          { group: 'AEPD', what: 'Supervisory authority', count: '—', data: '—', action: 'Notification within 72 h (Art. 33)', status: 'pending' }
        ],
        note: { title: 'Agentic Platform proposal', body: 'Notify the AEPD and the 173 high-risk data subjects whose data was in the unencrypted annexes. Sending the communications requires approval from the Data Protection Officer and the Managing Partner.', icon: 'shield' }
      },
      units: { label: 'Affected documents (iManage)', cols: DOC_COLS, rows: [
        doc('MJ-MER-0233-0148', 'Due diligence report (v3, encrypted PDF)', 'MER-2026-0233', 'Promociones Guadalhorce', '22/09 17:30', 'Corporate associate', { status: 'review', label: 'Sent · encrypted' }),
        doc('MJ-MER-0233-0152', 'Employment annex (v2, XLSX)', 'MER-2026-0233', 'Promociones Guadalhorce', '25/09 13:12', 'Corporate associate', { status: 'critical', label: 'Sent unencrypted' }),
        doc('MJ-MER-0233-0157', 'Litigation annex (v1, XLSX)', 'PRC-2025-0871', 'Promociones Guadalhorce', '28/09 12:40', 'Corporate associate', { status: 'critical', label: 'Sent unencrypted' }),
        doc('DR-GUAD', 'Data room link', 'MER-2026-0233', 'Promociones Guadalhorce', '28/09 18:47', 'Outlook', { status: 'ok', label: 'Never opened' })
      ] },
      quality: [
        'Drill: no data has actually left the firm.',
        'Notify the AEPD within 72 h unless the breach is unlikely to result in a risk (GDPR, Art. 33); communicate to data subjects if the risk is high (Art. 34).',
        'The XLSX annexes were not encrypted; policy requires a password on attachments with third-party personal data (PRO-RGPD-005).',
        'Professional secrecy (Art. 542.3 LOPJ) also requires informing the client.'
      ],
      notes: [
        { title: '72-hour deadline', body: 'Notification to the AEPD is due on 02/10/2026 at 08:05.', tone: 'crit', icon: 'clock' },
        { title: 'Proposed corrective measure', body: 'Disable autocomplete for external addresses in Outlook and require encryption on every iManage attachment marked confidential.', tone: 'warn', icon: 'lock' }
      ]
    };

    return {
      'PRC-2026-0412': prc,
      'PO 1184/2026': prc,
      '1184/2026': prc,
      'MER-2026-0219': mer,
      'HE-2026-0219': mer,
      'F-2026-0938': fac,
      'R-2026-0041': fac,
      'REC-2026-0057': rec,
      'RGPD-2609-03': rgpd,
      'MJ-MER-0233-0148': rgpd,
      'MER-2026-0233': rgpd
    };
  })()
});
