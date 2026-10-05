/*
 * Mora & Jordano · traceability drill (English): personal data breach RGPD-2609-03.
 * Email sent by mistake on 28/09/2026 at 18:47 (Outlook autocomplete) to an external recipient
 * (Asesoría Morales Benalmádena) with the due diligence report on Promociones Guadalhorce, S.A.:
 * 3 iManage attachments (1 encrypted PDF and 2 unencrypted XLSX) and 1 link to the data room (no access) →
 * matters MER-2026-0233 and PRC-2025-0871 → 318 mentions, 255 unique natural persons → 173 at high risk to be
 * informed → notification to the AEPD within 72 h (GDPR art. 33), communication to data subjects (art. 34), client,
 * wrong recipient and insurer. Protocol PRO-RGPD-005. Synthetic demo data (MFM).
 */
(function () {
  'use strict';

  const CODE = 'RGPD-2609-03';
  const DOCNO = 'MJ-MER-0233-0152';
  const CLIENT = 'Promociones Guadalhorce, S.A.';
  const WRONG = 'Asesoría Morales Benalmádena, S.L.';
  const DEADLINE = '02/10/2026 at 08:05';

  /* Data subject categories: [key, document, iManage reference, category, situation, persons, personal fields exposed] */
  const CATS = [
    { k: 'A', doc: 'Employment annex', ref: 'MJ-MER-0233-0152 v2', product: 'Employee · health data', rel: 'emp', enc: 'Unencrypted (XLSX)', data: 'DNI (ID number), salary, IBAN, sick leave', own: true, sit: 'salud', n: 17, ops: 153 },
    { k: 'B', doc: 'Employment annex', ref: 'MJ-MER-0233-0152 v2', product: 'Employee · financial data', rel: 'emp', enc: 'Unencrypted (XLSX)', data: 'DNI (ID number), salary, IBAN, seniority', own: true, sit: 'economicos', n: 125, ops: 875 },
    { k: 'C', doc: 'Litigation annex', ref: 'MJ-MER-0233-0157 v1', product: 'Claimant homebuyer · named', rel: 'comp', enc: 'Unencrypted (XLSX)', data: 'Name, home, proceedings, amount claimed', own: false, sit: 'litigio', n: 31, ops: 186 },
    { k: 'D', doc: 'Due diligence report', ref: 'MJ-MER-0233-0148 v3', product: 'Claimant homebuyer · report only', rel: 'comp', enc: 'AES-256 encrypted', data: 'Name, home, amount claimed', own: false, sit: 'cifrado', n: 27, ops: 108 },
    { k: 'E', doc: 'Due diligence report', ref: 'MJ-MER-0233-0148 v3', product: 'Director or attorney-in-fact', rel: 'adm', enc: 'AES-256 encrypted', data: 'Name, DNI, position, shareholding', own: true, sit: 'cifrado', n: 9, ops: 45 },
    { k: 'F', doc: 'Data room (link)', ref: 'iManage Share · DR-GUAD', product: 'Supplier or landlord contact', rel: 'prov', enc: 'Link with authentication', data: 'Name, position, email, signature', own: false, sit: 'noabierto', n: 46, ops: 138 }
  ];
  const SIT = {
    salud: { label: 'High risk · special category (health)', chip: { status: 'crit', label: 'High risk · health' }, action: 'Individual communication (GDPR art. 34) and notification to the AEPD' },
    economicos: { label: 'High risk · DNI and IBAN', chip: { status: 'crit', label: 'High risk' }, action: 'Individual communication (art. 34) with an identity-theft warning' },
    litigio: { label: 'High risk · litigation data and amounts', chip: { status: 'pending', label: 'Inform via their lawyer' }, action: 'Communication through their lawyer' },
    cifrado: { label: 'Protected by encryption', chip: { status: 'neutral', label: 'Protected (encrypted)' }, action: 'None: encrypted and password not sent (art. 34.3.a)' },
    noabierto: { label: 'Not exposed', chip: { status: 'info', label: 'Not exposed' }, action: 'None: link requires authentication and was never accessed' }
  };
  const REL = {
    emp: { prefix: 'Employee no.', base: 1012 },
    comp: { prefix: 'Party to', base: 0 },
    adm: { prefix: 'Management', base: 0 },
    prov: { prefix: 'Contract', base: 0 }
  };
  const PROCS = ['PO 412/2025 · Court of First Instance no. 3, Málaga', 'PO 977/2025 · Court of First Instance no. 3, Málaga'];
  const ADM = ['Director', 'Chief executive (consejera delegada)', 'Non-director secretary', 'Joint attorney-in-fact', 'Sole attorney-in-fact'];
  const PROV = ['Building contractor', 'Office landlord', 'Aggregates supplier', 'Architecture studio', 'Engineering firm', 'Maintenance'];

  /* Reproducible generator (the 255 data subjects always come out the same) */
  let seed = 260903;
  const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
  const pick = (a) => a[Math.floor(rnd() * a.length)];
  const pad = (n, w) => String(n).padStart(w, '0');
  const n0 = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const INI = 'ABCDEGIJLMNOPRSTV';

  const cards = [];
  let seq = 0;
  let empSeq = REL.emp.base;
  CATS.forEach((c) => {
    const base = Math.floor(c.ops / c.n);
    const opsArr = Array(c.n).fill(base);
    for (let r = c.ops - base * c.n; r > 0; r -= 1) opsArr[Math.floor(rnd() * c.n)] += 1;
    for (let i = 0; i < c.n; i += 1) {
      seq += 1;
      let client;
      if (c.rel === 'emp') { empSeq += 1 + Math.floor(rnd() * 4); client = `Employee no. ${empSeq} · joined ${2008 + Math.floor(rnd() * 18)}`; }
      else if (c.rel === 'comp') client = `Claimant · ${pick(PROCS)}`;
      else if (c.rel === 'adm') client = pick(ADM);
      else client = `${pick(PROV)} · contract in the data room`;
      cards.push({
        cat: c.k,
        pan: `INT-${pad(seq, 4)}`,
        product: c.product,
        issuer: c.doc,
        bin: c.ref,
        holder: `${pick(INI)}. ${pick(INI)}. ${pick(INI)}.`,
        client,
        ops: opsArr[i],
        last: `Data: ${c.data}`,
        amount: c.enc,
        state: SIT[c.sit].chip,
        action: SIT[c.sit].action,
        own: c.own,
        sit: c.sit
      });
    }
  });

  const sample = [];
  CATS.forEach((c) => { const list = cards.filter((x) => x.cat === c.k); sample.push(...list.slice(0, c.sit === 'economicos' ? 12 : c.n > 20 ? 8 : 4)); });

  const countBy = (pred) => cards.filter(pred).length;
  const opsBy = (pred) => cards.filter(pred).reduce((s, x) => s + x.ops, 0);

  /* ---------------------------------------------------------------- Notices */

  const SIG = 'Yours sincerely,\nData Protection Officer · Mora & Jordano\nCalle Linaje 3 · Málaga';
  const items = [
    {
      id: 'empleados', label: `Employees of ${CLIENT}`, icon: 'users', notify: true,
      channel: 'Letter and email (coordinated with the client’s HR department)',
      meta: ['142 people · 17 with health data', 'One single communication per person', 'Notice in Spanish'],
      body: 'The employment annex (unencrypted XLSX) contained the DNI, salary, IBAN and seniority of 142 employees, and temporary incapacity sick leave for 17 of them (special category, GDPR art. 9). Those 17 receive a single communication covering both types of data.',
      refs: 'MJ-MER-0233-0152 v2', qtyText: '142 data subjects', action: 'Breach communication (GDPR art. 34)',
      notice: {
        lang: 'Spanish',
        headers: { From: 'Mora & Jordano · Data Protection Officer', To: '142 employees (letter and email via the client’s HR)', Subject: '[DRILL] Information about an incident affecting your personal data' },
        subject: '[DRILL] Information about an incident affecting your personal data',
        body: [
          'Dear {name},',
          'We wish to inform you that on 28 September 2026, due to an error when sending an email, a working document prepared by Mora & Jordano for your company reached an unauthorised external recipient. The document contained your identification data (name and DNI), your salary, your seniority and the account number (IBAN) into which your salary is paid{; and, where applicable, information about temporary incapacity sick leave}.',
          'Possible consequences: misuse of your DNI or IBAN to impersonate you or to set up unauthorised direct debits.',
          'What we have done: the recipient alerted us the following morning and has confirmed in writing that the email and its attachments have been deleted; we have notified the incident to the Agencia Española de Protección de Datos (Spanish Data Protection Agency) and strengthened our sending controls.',
          'What we recommend: check your bank transactions over the coming weeks and return any direct debit you do not recognise (you have 8 weeks to do so). Be wary of calls or emails asking for your details on behalf of your company or your bank.',
          'If you have any questions, you can write to our Data Protection Officer (dpd@{firm domain}) quoting reference RGPD-2609-03.',
          'Reason: data breach drill (PRO-RGPD-005). In a real case the communication is sent without undue delay and in clear and plain language (GDPR art. 34.2).',
          SIG
        ].join('\n\n'),
        highlights: [CODE, '28 September 2026']
      }
    },
    {
      id: 'compradores', label: 'Claimant homebuyers (through their lawyer)', icon: 'scale', notify: true,
      channel: 'Letter to each opposing lawyer via LexNET or professional email',
      meta: ['31 people · 3 law firms', 'PO 412/2025 and PO 977/2025', 'Notice in Spanish'],
      body: 'The litigation annex (unencrypted XLSX) identified 31 claimant homebuyers with their home, proceedings and amount claimed. They are represented by counsel: under the code of conduct they are not contacted directly, but through their lawyer.',
      refs: 'MJ-MER-0233-0157 v1 · PRC-2025-0871', qtyText: '31 data subjects', action: 'Breach communication via their lawyer (art. 34)',
      notice: {
        lang: 'Spanish',
        headers: { From: 'Mora & Jordano · Partner in charge of Litigation', To: 'Claimants’ lawyers (3 law firms)', Subject: '[DRILL] Notice of a personal data incident · PO 412/2025 and PO 977/2025' },
        subject: '[DRILL] Notice of a personal data incident · PO 412/2025 and PO 977/2025',
        body: [
          'Dear colleague,',
          'As counsel for the claimants in ordinary proceedings 412/2025 and 977/2025 before Court of First Instance no. 3 of Málaga, we inform you, so that you may pass it on to your clients, of a security incident affecting their personal data.',
          'On 28/09/2026 a working document of this firm containing your clients’ names, the affected home, the proceedings number and the amount claimed was sent by mistake to an external recipient, who has deleted it and confirmed so in writing. It did not include DNI, bank or health data.',
          'We have notified the incident to the Agencia Española de Protección de Datos (internal reference RGPD-2609-03). We enclose the list of your affected clients and remain at your disposal.',
          'Reason: data breach drill (PRO-RGPD-005). Sample message.',
          'Kind regards,\nPartner in charge of Litigation · Mora & Jordano'
        ].join('\n\n'),
        highlights: [CODE, 'PO 412/2025']
      }
    },
    {
      id: 'cliente', label: `${CLIENT} (client)`, icon: 'building', notify: true,
      channel: 'Call from the partner in charge + encrypted email',
      meta: ['MER-2026-0233 · PRC-2025-0871', 'Professional secrecy affected', 'Notice in Spanish'],
      body: 'The client is informed of the mistaken sending of its due diligence report, of the employee and litigation data exposed and of the measures taken, so that it can assess its own obligations as controller of its workforce’s data.',
      refs: 'MER-2026-0233 · PRC-2025-0871', qtyText: '1 client', action: 'Information to the client and coordination with HR',
      notice: {
        lang: 'Spanish',
        headers: { From: 'Mora & Jordano · Partner in charge of Corporate', To: `Chief executive · ${CLIENT}`, Subject: '[DRILL] Confidentiality incident in matter MER-2026-0233' },
        subject: '[DRILL] Confidentiality incident in matter MER-2026-0233',
        body: [
          'Dear Chief Executive,',
          'As we told you by phone, on 28/09/2026 at 18:47 an email with the company’s vendor due diligence report and two annexes was sent by mistake to an external recipient (Asesoría Morales Benalmádena, S.L.) instead of to the buyer’s advisers.',
          'Scope: the report was encrypted and the password was not sent to that recipient; the employment and litigation annexes were not encrypted (142 employees, 17 of them with sick leave data, and 31 claimant homebuyers). The data room link requires authentication and has not been accessed.',
          'Measures: the recipient has confirmed the deletion with a signed statement; we will notify the AEPD before 02/10/2026 at 08:05 and will communicate the incident to the employees, coordinating with your HR department, and to the homebuyers through their lawyers.',
          'We suggest meeting today to review the communication to your staff and the transaction timetable.',
          'Reason: data breach drill. In a real case this message is sent encrypted and after the partner’s call.',
          'Kind regards,\nPartner in charge of Corporate · Mora & Jordano'
        ].join('\n\n'),
        highlights: ['MER-2026-0233', '02/10/2026 at 08:05']
      }
    },
    {
      id: 'destinatario', label: `${WRONG} (wrong recipient)`, icon: 'user-check', notify: true,
      channel: 'Email + deletion statement for signature in Signaturit',
      meta: ['1 external mailbox · Benalmádena', 'Alerted us on 29/09 at 08:05', 'Notice in Spanish'],
      body: 'Request to delete the email and its attachments (including from the deleted items folder and local copies), an undertaking not to use or disclose them and a signed statement via e-signature.',
      refs: 'Email of 28/09 · 18:47', qtyText: '3 attachments', action: 'Deletion and signed statement (Signaturit)',
      notice: {
        lang: 'Spanish',
        headers: { From: 'Mora & Jordano · Head of Compliance', To: `J. Morales · ${WRONG}`, Subject: '[DRILL] Email received by mistake: request for deletion' },
        subject: '[DRILL] Email received by mistake: request for deletion',
        body: [
          'Dear Mr Morales,',
          'Thank you for letting us know this morning that you had received by mistake our email of 28/09/2026 at 18:47 (“Guadalhorce · DD report and annexes”). It contains confidential information subject to professional secrecy and personal data of third parties.',
          'We ask you to: 1. delete the email and its three attachments from your inbox, deleted items and any local or cloud copy; 2. not use, forward or disclose them to anyone; and 3. sign the statement we are sending you via Signaturit confirming the above.',
          'Reason: data breach drill (PRO-RGPD-005). Sample message.',
          'Yours sincerely,\nHead of Compliance · Mora & Jordano'
        ].join('\n\n'),
        highlights: ['28/09/2026 at 18:47']
      }
    },
    {
      id: 'aepd', label: 'Agencia Española de Protección de Datos (AEPD)', icon: 'lock', notify: true,
      channel: 'AEPD e-office · breach notification form',
      meta: ['Confidentiality breach', `Deadline: 72 h · until ${DEADLINE}`, 'Notice in Spanish'],
      body: 'Draft notification (GDPR art. 33) with the nature of the breach, the categories and number of data subjects and records, the likely consequences and the measures. The DPO advises and the Managing partner decides.',
      refs: CODE, qtyText: '255 data subjects', action: 'Breach notification (GDPR art. 33)',
      notice: {
        lang: 'Spanish',
        headers: { From: 'Mora & Jordano · Data Protection Officer', To: 'AEPD · personal data breach notification', Subject: `[DRILL] Personal data breach notification · ${CODE}` },
        subject: `[DRILL] Personal data breach notification · ${CODE}`,
        body: [
          'Draft (main fields of the form):',
          `Controller: Mora & Jordano · internal reference ${CODE}\nDate of the breach: 28/09/2026 18:47 · awareness: 29/09/2026 08:05 · notification within 72 h\nNature: confidentiality · email sent by mistake (autocomplete) to an identified external recipient.\nData categories: identification (name, DNI), financial (salary, IBAN), health data (sick leave, GDPR art. 9) and civil litigation data.\nData subjects: 255 natural persons in 318 mentions; 173 at high risk (142 employees of the client and 31 claimant homebuyers); 36 in an encrypted document and 46 in a link never accessed.\nLikely consequences: identity theft, unauthorised charges and loss of confidentiality of court proceedings.\nMeasures: signed deletion statement from the recipient, communication to high-risk data subjects, review of autocomplete and a data loss prevention rule in Outlook.`,
          'Reason: drill. The notification is filed by the DPO after the Managing partner’s decision.',
          SIG
        ].join('\n\n'),
        highlights: [CODE, '72 h']
      }
    },
    {
      id: 'aseguradora', label: 'Professional indemnity insurer', icon: 'shield', notify: true,
      channel: 'Email to the insurance broker + claim notification',
      meta: ['Professional indemnity and cyber policy', 'Notification of circumstances', 'Notice in Spanish'],
      body: 'Precautionary notification of a circumstance that could give rise to a claim (loss of confidentiality and possible penalty), within the period set by the policy.',
      refs: `${CODE} · MER-2026-0233`, qtyText: '1 policy', action: 'Notification of circumstances to the insurer',
      notice: {
        lang: 'Spanish',
        headers: { From: 'Mora & Jordano · Firm management', To: 'Insurance broker · professional indemnity and cyber', Subject: `[DRILL] Notification of circumstances · ${CODE}` },
        subject: `[DRILL] Notification of circumstances · ${CODE}`,
        body: [
          'Good morning,',
          `For the purposes of the professional indemnity and cyber policy, we notify a circumstance that could give rise to a claim: a due diligence report and two annexes containing personal data of 255 people were sent by mistake to an external recipient (matter ${CODE}). The recipient has confirmed the deletion and the AEPD will be notified within the deadline.`,
          'Reason: data breach drill. Sample message.',
          'Kind regards,\nFirm management · Mora & Jordano'
        ].join('\n\n'),
        highlights: [CODE]
      }
    },
    {
      id: 'registro', label: 'Data subjects without high risk (internal register)', icon: 'clipboard', notify: false, chip: 'Document without informing',
      channel: 'Internal breach register (GDPR art. 33.5)',
      meta: ['82 people', '36 in encrypted document · 46 in link never accessed', 'No individual communication'],
      body: 'Homebuyers who appear only in the encrypted report, directors and supplier contacts in the data room. The register records why the breach does not need to be communicated to them (encryption and no access).',
      refs: 'MJ-MER-0233-0148 v3 · iManage Share', qtyText: '82 data subjects', action: 'Entry in the breach register',
      notice: {
        lang: 'Spanish',
        headers: { From: 'Agentic Platform · Record and notices agent', To: 'Internal breach register · Compliance', Subject: `[DRILL] Entry ${CODE} · data subjects not informed` },
        subject: `[DRILL] Entry ${CODE} · data subjects not informed`,
        body: 'Entry (draft):\n36 data subjects (27 homebuyers and 9 directors) appear only in report MJ-MER-0233-0148 v3, encrypted with AES-256; the password was sent through another channel to the correct recipient only → GDPR art. 34.3.a.\n46 supplier and landlord contacts appear in contracts in the data room, reachable through a link that requires authentication; the iManage Share access log shows no access by the recipient → no exposure.\n\nReason: drill. The entry is validated by the DPO.',
        highlights: ['art. 34.3.a']
      }
    },
    {
      id: 'sistemas', label: 'IT and information security (internal)', icon: 'server', notify: false, chip: 'Internal measure',
      channel: 'Ticket to IT + Microsoft Teams alert',
      meta: ['Outlook and iManage', 'Corrective measures', 'Notice in Spanish'],
      body: 'Revoke the iManage Share link that was sent, delete the associate’s autocomplete entry, enable confirmation for external recipients with attachments and a data loss prevention rule for spreadsheets with DNI or IBAN.',
      refs: 'DR-GUAD · Outlook', qtyText: '4 measures', action: 'Technical corrective measures',
      notice: {
        lang: 'Spanish',
        headers: { From: 'Mora & Jordano · Head of Compliance', To: 'IT and information security', Subject: `[DRILL] Corrective measures · breach ${CODE}` },
        subject: `[DRILL] Corrective measures · breach ${CODE}`,
        body: [
          'Hi,',
          `For breach ${CODE} please: 1. revoke the iManage Share link to data room DR-GUAD sent on 28/09 and keep the access log; 2. delete the autocomplete entry for J. Morales in the sending associate’s mailbox; 3. enable mandatory confirmation when sending attachments to external domains; 4. create a data loss prevention rule that blocks unencrypted spreadsheets containing DNI or IBAN.`,
          'Reason: data breach drill. Sample message.',
          'Thanks,\nCompliance · Mora & Jordano'
        ].join('\n\n'),
        highlights: [CODE, 'DR-GUAD']
      }
    }
  ];

  /* ---------------------------------------------------------------- Genealogy */

  const nodes = [
    { id: 'X', stage: 'exp', kicker: 'Matter', title: CODE, mono: true, lot: CODE, sub: 'Confidentiality breach', meta: `AEPD until ${DEADLINE}`, reveal: 0 },
    { id: 'COR', stage: 'cor', kicker: 'Sending', title: 'Email of 28/09 · 18:47', sub: 'Outlook · Corporate associate', meta: '3 attachments and 1 link', alert: 'Recall failed', reveal: 1 },
    { id: 'REC', stage: 'cor', kicker: 'Recipient', title: 'Asesoría Morales Benalmádena', sub: 'Wrong recipient · autocomplete', meta: 'Alerted us on 29/09 at 08:05', reveal: 1 },
    { id: 'DOC1', stage: 'doc', kicker: 'Document', title: 'Due diligence report', sub: 'PDF · MJ-MER-0233-0148 v3', meta: 'AES-256 encrypted', tone: 'stock', reveal: 2 },
    { id: 'DOC2', stage: 'doc', kicker: 'Document', title: 'Employment annex', sub: `XLSX · ${DOCNO} v2`, meta: 'Unencrypted', alert: 'Health data', reveal: 2 },
    { id: 'DOC3', stage: 'doc', kicker: 'Document', title: 'Litigation annex', sub: 'XLSX · MJ-MER-0233-0157 v1', meta: 'Unencrypted', reveal: 2 },
    { id: 'DOC4', stage: 'doc', kicker: 'Link', title: 'Data room DR-GUAD', sub: 'iManage Share · with authentication', meta: '0 accesses by the recipient', tone: 'stock', reveal: 2 },
    { id: 'M1', stage: 'asu', kicker: 'Matter', title: 'MER-2026-0233', mono: true, sub: 'Vendor due diligence · sale of the company', meta: CLIENT, reveal: 3 },
    { id: 'M2', stage: 'asu', kicker: 'Matter', title: 'PRC-2025-0871', mono: true, sub: 'Defence in PO 412/2025 and 977/2025', meta: 'Court of First Instance no. 3, Málaga', reveal: 3 },
    { id: 'I1', stage: 'int', kicker: 'Data subjects', title: '142 employees', sub: 'Employment annex', meta: `${n0(opsBy((x) => x.issuer === 'Employment annex'))} personal fields`, reveal: 4 },
    { id: 'I2', stage: 'int', kicker: 'Data subjects', title: '58 homebuyers', sub: '31 in the annex · 27 in the report only', meta: `${n0(opsBy((x) => x.cat === 'C' || x.cat === 'D'))} personal fields`, reveal: 4 },
    { id: 'I3', stage: 'int', kicker: 'Data subjects', title: '9 directors', sub: 'Due diligence report', meta: '45 personal fields', reveal: 4 },
    { id: 'I4', stage: 'int', kicker: 'Data subjects', title: '46 contacts', sub: 'Suppliers and landlords', meta: '138 personal fields', reveal: 4 },
    { id: 'S1', stage: 'sit', kicker: 'Risk', title: '173 high risk', sub: '17 health · 125 DNI and IBAN · 31 litigation', meta: 'Inform without undue delay (art. 34)', alert: 'Inform', alertTone: true, tone: 'planned', reveal: 5 },
    { id: 'S2', stage: 'sit', kicker: 'Risk', title: '36 protected', sub: '27 homebuyers · 9 directors', meta: 'Encrypted document', tone: 'stock', reveal: 5 },
    { id: 'S3', stage: 'sit', kicker: 'Risk', title: '46 not exposed', sub: 'Link never accessed', meta: 'iManage Share log', tone: 'stock', reveal: 5 },
    { id: 'S4', stage: 'sit', kicker: 'External copy', title: '3 attachments in an outside mailbox', sub: 'Deletion pending signature', meta: 'Statement in Signaturit', alert: 'Today', alertTone: true, tone: 'planned', reveal: 5 },
    { id: 'D1', stage: 'dst', kicker: 'Recipient', title: 'Employees', sub: '142 people', meta: 'Letter and email via HR', tone: 'customer', reveal: 6 },
    { id: 'D2', stage: 'dst', kicker: 'Recipient', title: 'Homebuyers', sub: '31 people · 3 lawyers', meta: 'Through their lawyer', tone: 'customer', reveal: 6 },
    { id: 'D3', stage: 'dst', kicker: 'Recipient', title: 'Client', sub: CLIENT, meta: 'Call and encrypted email', tone: 'customer', reveal: 6 },
    { id: 'D4', stage: 'dst', kicker: 'Recipient', title: 'Wrong recipient', sub: 'Deletion and statement', meta: 'Signaturit', tone: 'customer', reveal: 6 },
    { id: 'D5', stage: 'dst', kicker: 'Recipient', title: 'AEPD', sub: 'GDPR art. 33', meta: `Until ${DEADLINE}`, tone: 'customer', reveal: 6 },
    { id: 'D6', stage: 'dst', kicker: 'Recipient', title: 'PI insurer', sub: 'Notification of circumstances', meta: 'Insurance broker', tone: 'customer', reveal: 6 }
  ];
  const edges = [['X', 'COR'], ['COR', 'REC'], ['COR', 'DOC1'], ['COR', 'DOC2'], ['COR', 'DOC3'], ['COR', 'DOC4'],
    ['DOC1', 'M1'], ['DOC2', 'M1'], ['DOC3', 'M1'], ['DOC3', 'M2'], ['DOC4', 'M1'],
    ['M1', 'I1'], ['M1', 'I2'], ['M2', 'I2'], ['M1', 'I3'], ['M1', 'I4'],
    ['I1', 'S1'], ['I2', 'S1'], ['I2', 'S2'], ['I3', 'S2'], ['I4', 'S3'], ['REC', 'S4'],
    ['S1', 'D1'], ['S1', 'D2'], ['M1', 'D3'], ['S4', 'D4'], ['S1', 'D5'], ['S2', 'D5'], ['X', 'D6']];

  /* ---------------------------------------------------------------- Tables */

  const locRow = (ref, k, where, whereSub, action, tone) => {
    const c = CATS.find((x) => x.k === k);
    return { ref, where, whereSub, n: c.n, qty: c.ops, action, tone };
  };
  const locRows = [
    locRow('MJ-MER-0233-0152 v2', 'A', 'Employees · health data', 'Sick leave in the unencrypted employment annex (GDPR art. 9)', 'Individual communication and notification to the AEPD', 'crit'),
    locRow('MJ-MER-0233-0152 v2', 'B', 'Employees · DNI, salary and IBAN', 'Unencrypted employment annex', 'Individual communication with an identity-theft warning', 'crit'),
    locRow('MJ-MER-0233-0157 v1', 'C', 'Claimant homebuyers · named', 'Unencrypted litigation annex · PO 412/2025 and 977/2025', 'Communication through their lawyer', 'warn'),
    locRow('MJ-MER-0233-0148 v3', 'D', 'Homebuyers · report only', 'Encrypted report; password not sent to the recipient', 'None: entry in the breach register', ''),
    locRow('MJ-MER-0233-0148 v3', 'E', 'Directors and attorneys-in-fact', 'Encrypted report · data also in the Registro Mercantil (Companies Register)', 'None: entry in the breach register', ''),
    locRow('iManage Share', 'F', 'Supplier and landlord contacts', 'Data room DR-GUAD · link with authentication, 0 accesses', 'None: revoke the link', '')
  ];

  const cardCols = [
    { label: 'Data subject', key: 'pan', mono: true, sub: 'product' },
    { label: 'Document', key: 'issuer', sub: 'bin' },
    { label: 'Person', key: 'holder', sub: 'client' },
    { label: 'Fields exposed', key: 'ops', num: true, sub: 'last' },
    { label: 'Protection', key: 'amount' },
    { label: 'Risk', key: 'state', chip: true },
    { label: 'Action in a real case', key: 'action' }
  ];

  const issuerRows = [
    { iss: 'Employment annex', bin: `${DOCNO} v2 · unencrypted XLSX`, cards: 142, ops: 159, active: countBy((x) => x.issuer === 'Employment annex'), done: 0, action: '142 to inform' },
    { iss: 'Litigation annex', bin: 'MJ-MER-0233-0157 v1 · unencrypted XLSX', cards: 31, ops: 31, active: countBy((x) => x.cat === 'C'), done: 0, action: '31 to inform via their lawyer' },
    { iss: 'Due diligence report', bin: 'MJ-MER-0233-0148 v3 · encrypted PDF', cards: 36, ops: 82, active: 0, done: 36, action: 'Protected by encryption' },
    { iss: 'Data room (link)', bin: 'iManage Share · DR-GUAD', cards: 46, ops: 46, active: 0, done: 46, action: 'No access by the recipient' }
  ].map((r) => Object.assign(r, { diff: 0, located: '100.0%' }));

  const scope = {
    headline: `Email sent by mistake on 28/09/2026 at 18:47 · due diligence report on ${CLIENT} · 255 data subjects`,
    previewSide: '1 email · 4 items · 255 data subjects',
    startNode: 'X',
    stages: [
      { id: 'exp', label: 'Matter', icon: 'clipboard' },
      { id: 'cor', label: 'Sending', icon: 'mail' },
      { id: 'doc', label: 'Documents', icon: 'file-text', count: '4' },
      { id: 'asu', label: 'Matters', icon: 'scale' },
      { id: 'int', label: 'Data subjects', icon: 'users', count: '255' },
      { id: 'sit', label: 'Risk', icon: 'shield' },
      { id: 'dst', label: 'Notices', icon: 'send' }
    ],
    nodes,
    edges,
    systems: ['Gestor de expedientes', 'Outlook', 'iManage', 'Signaturit'],
    genSub: '1 email · 4 documents · 2 matters · 255 data subjects · 8 recipients',
    steps: [
      { agent: 'trace', system: 'Gestor de expedientes', action: 'Locates the starting point', result: `Matter ${CODE} opened by Compliance on 29/09 at 08:11, after the recipient’s alert at 08:05 · AEPD deadline ${DEADLINE}`, ms: 220, reveal: 0, mark: 'Starting point located' },
      { agent: 'trace', system: 'Outlook', action: 'Backwards: message and recipient trace', result: 'Sent on 28/09 at 18:47 by a Corporate associate · autocomplete picked “J. Morales (Asesoría Morales Benalmádena)” instead of “J. Morales (buyer’s advisers)” · 3 attachments and 1 link · recall failed (external mailbox)', ms: 460, tone: 'warn', reveal: 1, mark: 'Sending and recipient identified' },
      { agent: 'trace', system: 'iManage', action: 'Documents sent, version, encryption and access', result: 'MJ-MER-0233-0148 v3 (AES-256 encrypted PDF; password sent through another channel to the correct recipient only) · MJ-MER-0233-0152 v2 and MJ-MER-0233-0157 v1 (unencrypted XLSX) · authenticated link to DR-GUAD: 0 accesses', ms: 610, tone: 'warn', reveal: 2, mark: 'Documents and encryption checked' },
      { agent: 'trace', system: 'Gestor de expedientes', action: 'Matters and client for each document', result: `MER-2026-0233 (vendor due diligence on ${CLIENT}) · the litigation annex comes from PRC-2025-0871 (defence in PO 412/2025 and PO 977/2025, Court of First Instance no. 3, Málaga) · information covered by professional secrecy`, ms: 380, reveal: 3, mark: 'Matters and client identified' },
      { agent: 'trace', system: 'iManage', action: 'Personal data in each document', result: '318 mentions of people · 255 unique natural persons · 17 with health data (sick leave) · 142 with DNI and IBAN', ms: 720, reveal: 4, mark: 'Data subjects identified' },
      { agent: 'trace', system: 'Agentic Platform', action: 'Risk per data subject (AEPD breach guide criteria)', result: '173 at high risk to inform (17 health, 125 DNI and IBAN, 31 litigation) · 36 protected by encryption · 46 not exposed', ms: 430, tone: 'warn', reveal: 5, mark: 'Risk assessed per data subject' },
      { agent: 'trace', system: 'Gestor de expedientes', action: 'Recipients, channel and contact details', result: '142 employees via the client’s HR · 31 homebuyers represented by 3 law firms (contact through their lawyer) · contacts for the client, the wrong recipient and the insurance broker verified', ms: 540, reveal: 6, mark: 'Recipients identified' },
      { agent: 'bal', system: 'iManage', action: 'Cleaning of mentions', result: '63 excluded (31 homebuyers repeated in the report and the annex, 17 employees repeated in the payroll and sick-leave sheets, 15 legal entities) · 255 unique persons', ms: 320 },
      { agent: 'bal', system: 'Agentic Platform', action: 'Reconciliation of data subjects by document and risk', result: 'Reconciled 100.0% · 0 data subjects unassigned · 255 of 255 classified', ms: 90, tone: 'ok', mark: 'Data subject reconciliation closed' },
      { agent: 'rec', system: 'Gestor de expedientes', action: 'Records the breach in the internal register (GDPR art. 33.5)', result: `${CODE} updated with the timeline, the documents and the risk assessment · decision pending from the Managing partner with the DPO’s report`, ms: 360 },
      { agent: 'rec', system: 'Signaturit', action: 'Prepares the recipient’s deletion statement', result: `Signature request in draft for J. Morales (${WRONG}) · not sent`, ms: 280 },
      { agent: 'rec', system: 'Outlook', action: 'Prepares the notices without sending', result: '8 drafts: employees, homebuyers (via their lawyer), client, wrong recipient, AEPD, insurer, internal register and IT', ms: 760, mark: 'Record and notices prepared' }
    ],
    located: { label: 'Data subjects classified', value: '255 of 255', sub: '173 at high risk to inform · 82 not informed', icon: 'users', short: '255 of 255 data subjects classified by document and risk (173 at high risk to inform)' },
    kpiNotify: { label: 'Recipients to notify', value: 6, sub: '142 employees · 31 homebuyers · client · recipient · AEPD · insurer' },
    balance: {
      title: 'Data subject and document reconciliation',
      kpiLabel: 'Data subject reconciliation',
      sub: 'Natural persons in the documents sent · documents in iManage, matters in the Gestor de expedientes',
      head: 'Data subjects of the breach',
      headSide: '3 flows · 255 data subjects · 318 mentions',
      labels: { in: 'Data subjects in the documents', losses: 'Excluded', out: 'High risk', stock: 'Not high risk' },
      detailTitle: 'Detail by flow',
      criterio: 'Criterion: each person is assigned to a single document and risk level, the one with the greatest exposure; any unassigned difference is shown as is, not spread out. Each exclusion cites the system that records it.',
      reportText: 'Message and recipient in Outlook; documents, versions, encryption and access log in iManage; matters, client and contacts in the Gestor de expedientes (matter management system); risk according to the AEPD breach guide criteria.',
      flows: [
        {
          key: 'INT', seg: 'Data subjects', main: true, unit: 'data subjects', colLabel: 'Data subjects',
          title: 'Data subjects in the documents → risk',
          inLabel: 'Unique natural persons', inSub: 'Email of 28/09/2026 18:47 · 3 attachments and 1 link', inStage: 'iManage', inQty: 255,
          phases: [],
          outs: [
            { label: 'High risk · health data', sub: 'Employment annex · 17 employees', stage: 'iManage', qty: 17 },
            { label: 'High risk · DNI, salary and IBAN', sub: 'Employment annex · 125 employees', stage: 'iManage', qty: 125 },
            { label: 'High risk · litigation data', sub: 'Litigation annex · inform via their lawyer', stage: 'Gestor', qty: 31 },
            { label: 'Protected by encryption', sub: 'Due diligence report · AES-256', stage: 'iManage', qty: 36, kind: 'stock' },
            { label: 'Not exposed', sub: 'Data room · 0 accesses', stage: 'iManage', qty: 46, kind: 'stock' }
          ]
        },
        {
          key: 'MEN', seg: 'Mentions', unit: 'mentions', colLabel: 'Mentions',
          title: 'Mentions of people → unique natural persons',
          inLabel: 'Mentions in the documents', inSub: '4 items · 2 matters', inStage: 'iManage', inQty: 318,
          phases: [{ title: 'Cleaning of mentions', stages: [
            ['iManage', 'Homebuyers repeated in the report and the litigation annex', 31],
            ['iManage', 'Employees repeated in the payroll and sick-leave sheets', 17],
            ['Gestor', 'Legal entities (not personal data)', 15]
          ] }],
          outs: [
            { label: 'Unique natural persons', sub: '142 employees · 58 homebuyers · 9 directors · 46 contacts', stage: 'iManage', qty: 255 }
          ]
        },
        {
          key: 'DOC', seg: 'Documents', unit: 'items', colLabel: 'Items',
          title: 'Email items → exposure',
          inLabel: 'Attachments and links sent', inSub: 'Email of 28/09/2026 18:47', inStage: 'Outlook', inQty: 4,
          phases: [],
          outs: [
            { label: 'Unencrypted attachments', sub: 'Employment annex and litigation annex', stage: 'iManage', qty: 2 },
            { label: 'Encrypted attachment', sub: 'Due diligence report · password not sent', stage: 'iManage', qty: 1, kind: 'stock' },
            { label: 'Link never accessed', sub: 'Data room DR-GUAD', stage: 'iManage', qty: 1, kind: 'stock' }
          ]
        }
      ],
      product: {
        title: 'Data subjects by document',
        side: '255 data subjects · 318 mentions',
        cols: [
          { label: 'Document', key: 'iss', sub: 'bin' },
          { label: 'Data subjects', key: 'cards', num: true },
          { label: 'Mentions', key: 'ops', num: true },
          { label: 'High risk', key: 'active', num: true, sub: 'action' },
          { label: 'Difference', key: 'diff', num: true },
          { label: 'Classified', key: 'located', num: true, ok: true }
        ],
        rows: issuerRows
      }
    },
    units: {
      title: 'Data subjects of the breach',
      sub: '255 data subjects · representative sample on screen · CSV with all of them · pseudonymised data (no name or DNI)',
      icon: 'users',
      csvLabel: 'Data subjects (CSV)',
      csvName: 'data-subjects',
      byLoc: { label: 'By risk', refLabel: 'Document', whereLabel: 'Category', nLabel: 'Data subjects', qtyLabel: 'Fields exposed', actionLabel: 'Action in a real case', rows: locRows },
      list: { label: 'Data subjects', count: 255, note: `Sample of ${sample.length} of 255 data subjects (from each category); the CSV includes all 255, pseudonymised.`, cols: cardCols, rows: sample },
      csvRows: cards
    },
    customers: {
      title: 'Data subjects and bodies to notify',
      sub: '6 recipients with a notice · 2 internal entries · 2 actions with a deadline',
      items,
      holdsTitle: 'Actions with a deadline',
      holdsIcon: 'clock',
      holds: [
        { icon: 'edit', tone: 'crit', title: 'Obtain the recipient’s deletion statement today', meta: ['today', 'Signaturit', WRONG], body: 'In a real case, the signed confirmation that the email and its attachments have been deleted is the measure that most reduces the risk, and it is included in the notification to the AEPD.' },
        { icon: 'lock', tone: 'warn', title: 'Notify the breach to the AEPD', meta: [`until ${DEADLINE}`, '72 h from awareness', 'Data Protection Officer'], body: 'If the information is not complete, the notification is still filed within the deadline and completed in phases (GDPR art. 33.4).' }
      ]
    },
    approval: {
      titlePrefix: 'Notification, communications and drill closure',
      scope: [
        { label: 'Data subjects to inform', value: '142 employees (via HR) · 31 homebuyers (via their lawyer)', status: 'pending', chip: '173' },
        { label: 'Notification to the AEPD', value: `E-office · until ${DEADLINE}`, status: 'evaluate', chip: 'Not filed in a drill' },
        { label: 'Client', value: `${CLIENT} · MER-2026-0233 and PRC-2025-0871` },
        { label: 'Wrong recipient', value: `${WRONG} · deletion and statement in Signaturit` },
        { label: 'Others', value: 'Professional indemnity insurer · internal breach register · IT measures' }
      ],
      effects: [
        'Outlook and Signaturit: {n} notices saved as drafts marked DRILL; no email, letter or signature request is sent',
        'AEPD e-office: no notification is filed; the draft stays in the matter',
        'iManage: no changes; in a drill the link is not revoked and no document is locked',
        'Record {code} approved with the timing of each activity'
      ]
    },
    report: {
      objeto: 'Personal data breach drill with {label} as the starting point. It checks backward traceability (email, sender, recipient and documents) and forward traceability (matters, client, data subjects, risk and recipients of the communications), with the reconciliation of data subjects and mentions.',
      noAction: 'The exercise does not notify the AEPD, send communications or modify documents.',
      results: [
        '173 data subjects at high risk would receive the art. 34 communication: 142 employees of the client (17 with health data) and 31 claimant homebuyers through their lawyer.',
        '82 data subjects do not need to be informed (36 in an encrypted document and 46 in a link never accessed), with the justification in the internal breach register.',
        `Notification to the AEPD ready to be filed before ${DEADLINE} (72 h from awareness of the breach).`
      ],
      back: {
        cols: [{ label: 'Stage', key: 'etapa' }, { label: 'Reference', key: 'ref', mono: true }, { label: 'Date', key: 'fecha' }, { label: 'Detail', key: 'det' }],
        rows: [
          { etapa: 'Matter', ref: CODE, fecha: '29/09/2026 08:11', det: 'Opened by Compliance after the wrong recipient’s alert (08:05)' },
          { etapa: 'Email', ref: 'Outlook · 18:47', fecha: '28/09/2026', det: 'Sent by a Corporate associate · autocomplete · recall failed on an external mailbox' },
          { etapa: 'Recipient', ref: 'J. Morales', fecha: '29/09/2026 08:05', det: `${WRONG} · unrelated to the matter · alerted us by email` },
          { etapa: 'Documents', ref: 'MJ-MER-0233-0148/0152/0157', fecha: '22–28/09/2026', det: 'Encrypted PDF report (v3), employment annex XLSX (v2) and litigation annex XLSX (v1) unencrypted · link to DR-GUAD never accessed' },
          { etapa: 'Matters', ref: 'MER-2026-0233', fecha: 'Opened 06/2026', det: `Vendor due diligence on ${CLIENT} · litigation annex taken from PRC-2025-0871` }
        ]
      },
      fwd: {
        cols: [{ label: 'Document', key: 'ref', mono: true }, { label: 'Category', key: 'where' }, { label: 'Data subjects', key: 'n', num: true }, { label: 'Fields', key: 'qty', num: true }, { label: 'Action', key: 'action' }],
        rows: locRows
      },
      conclusion: 'Conclusion: the information needed to notify the breach and inform the data subjects is obtained in full, reconciles person by person and within the 72 h. Proposed improvements: encrypt annexes containing personal data by default when they leave iManage, and require confirmation when sending attachments to external domains.',
      note: 'Drill: the AEPD has not been notified, no communication or signature request has been sent and no document has been modified. Data subjects pseudonymised; synthetic demo data.'
    },
    audit: { back: 'email of 28/09 18:47 · wrong recipient · 4 items sent', fwd: '2 matters · 255 data subjects · 173 at high risk · 6 recipients to notify' },
    say: [
      'What is actionable: 173 people at high risk, 17 of them with health data, and a notification to the AEPD due on Friday 2 October at 08:05.',
      'Each notice goes through its own channel: to the employees via the client’s HR, to the homebuyers through their lawyer, the deletion statement via Signaturit and the AEPD form. In a drill nothing is sent. The Managing partner decides with the DPO’s report.'
    ]
  };

  agenticPackEn('abogados', {
    retirada: {
      title: 'Data breach drill',
      nav: 'Traceability drill',
      section: 'Calidad',
      desc: 'Traceability exercise for a personal data breach: from the email sent by mistake to each document, matter, client and data subject, with the data subject reconciliation, the notification to the AEPD within 72 h and the communications to data subjects, client, recipient and insurer, starting from a GDPR matter or an iManage document.',
      place: 'Málaga office · Calle Linaje',
      approver: 'Managing partner',
      regPrefix: 'SB-2026-',
      agents: { trace: 'Traceability', bal: 'Reconciliation', rec: 'Record and notices' },
      targetText: 'Illustrative target: 4 h',
      todayEstimate: '1–2 days',
      timerRef: 'Demo target: 4 h',
      packLabel: 'Download matter pack',
      setup: { title: 'Starting point', sub: 'A data breach matter or an iManage document number' },
      modes: {
        expediente: { label: 'Matter', noun: 'the matter', field: 'GDPR matter code', icon: 'clipboard', format: 'RGPD-2609-03', where: 'Gestor de expedientes' },
        documento: { label: 'Document', noun: 'the document', field: 'Document number (iManage)', icon: 'file-text', format: DOCNO, where: 'iManage' }
      },
      entries: [
        { mode: 'expediente', code: CODE, scope: 'brecha', label: `Matter ${CODE}`, option: `Breach · misdirected email · DD on ${CLIENT}` },
        { mode: 'documento', code: DOCNO, scope: 'brecha', label: `Document ${DOCNO}`, option: 'Employment annex · MER-2026-0233', headline: `Employment annex of the due diligence on ${CLIENT} · unencrypted XLSX · sent by mistake in matter ${CODE}`, startNode: 'DOC2', startResult: `Document ${DOCNO} v2 (employment annex, unencrypted XLSX) · sent by mistake on 28/09 at 18:47 · matter ${CODE} → tracing the rest of the sending` }
      ],
      examples: [
        { mode: 'expediente', code: CODE, label: `Matter ${CODE}` },
        { mode: 'documento', code: DOCNO, label: `Document ${DOCNO}` }
      ],
      reference: {
        title: 'Reference framework',
        sub: 'Exercise target; the DPO and Compliance confirm the applicable requirements (PRO-RGPD-005)',
        items: [
          ['GDPR art. 33', 'Regulation (EU) 2016/679 (RGPD in Spanish): the controller notifies the breach to the supervisory authority (AEPD) without undue delay and, where feasible, no later than 72 h after becoming aware of it, unless it is unlikely to result in a risk; every breach is documented in the internal register (art. 33.5).'],
          ['GDPR art. 34', 'If the breach is likely to result in a high risk to rights and freedoms, it is communicated to the data subjects without undue delay and in clear and plain language; this is not required if the data were protected, for example encrypted (art. 34.3.a). LOPDGDD (Ley Orgánica 3/2018, the Spanish data protection act) and the AEPD guide on breach management and notification.'],
          ['Professional secrecy', 'Estatuto General de la Abogacía Española (RD 135/2021, the Spanish Bar statute) and Código Deontológico de la Abogacía (code of conduct): the firm preserves the confidentiality of client information, informs the client of the incident and does not contact directly an opposing party represented by a lawyer.']
        ],
        note: 'A drill does not notify the AEPD or send communications: it measures whether the information is obtained in full, reconciles and arrives in time.'
      },
      legend: { planned: 'Action with a deadline', click: 'Click the matter to see its full trace' },
      notice: { title: 'Data breach drill', approved: 'Saved as a draft marked DRILL: no email, letter, notification or signature request is sent.' },
      approval: { policy: 'PRO-RGPD-005 · the notification to the AEPD and the communications to data subjects and the client are approved by the Managing partner with the DPO’s report', approveLabel: 'Approve and close drill', rejectPlaceholder: 'For example: the communication to the staff still needs reviewing with the client' },
      clock: { title: 'Stopwatch against the target', sub: 'Simulation times; not performance measurements of the systems' },
      report: { subtitle: 'Record of the personal data breach exercise · GDPR arts. 33 and 34 · LOPDGDD', approvedText: 'Notices saved as drafts marked DRILL; the AEPD has not been notified and no communication has been sent.' },
      compare: {
        rows: [
          { k: 'People involved', today: '4–5: Compliance, DPO, IT, Corporate and Litigation partners and Client Care', agentic: '1: {approver} reviews and approves' },
          { k: 'Systems checked', today: '5–6 opened by hand: Outlook, iManage, Gestor de expedientes, spreadsheets, email and Signaturit', agentic: '4 connectors queried by the agents: Gestor de expedientes, Outlook, iManage and Signaturit' },
          { k: 'Steps', today: 'Reviewing each attachment by hand, counting people, cross-checking duplicates and drafting notices', agentic: '{steps} automatic steps and 1 approval' },
          { k: 'Reconciliation', today: 'Spreadsheet with the count of data subjects per document', agentic: 'Calculated by document and risk: {reconciled} reconciled' }
        ]
      },
      presenter: {
        idle: [
          'Data breach drill: in a law firm, traceability runs from the email sent by mistake to every document, matter and data subject.',
          'Choose the starting point: matter RGPD-2609-03 or the document number in iManage.',
          'Agentic Platform goes through the Gestor de expedientes, Outlook and iManage: recipient, attachments, encryption, access, matters, people and the risk for each one, and reconciles the 255 data subjects well within the 72 h deadline.'
        ],
        nextIdle: 'Click "Start drill" with matter RGPD-2609-03 (or choose "Document MJ-MER-0233-0152").',
        nextRun: 'Click "View notice" for the employees or the AEPD, then "Approve and close drill".',
        nextDone: '"Download matter pack": CSV with the 255 data subjects and a printable record. Then "Customer questionnaire" (right arrow).'
      },
      scopes: { brecha: scope }
    }
  });
})();
