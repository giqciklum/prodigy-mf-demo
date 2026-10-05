/*
 * Banco Cierzo · traceability drill (English): common point of compromise CPP-2609-07.
 * POS terminal 3 at Gasolinera Ronda Norte (merchant 334512987, acquirer Banco Cierzo) between 10 and 22/09/2026 →
 * 3,912 transactions (3,844 settled) with 1,284 cards: 1,107 issued by Banco Cierzo and 177 by other issuers
 * (121 Visa and 56 Mastercard) → block, reissue and notices to customers, card schemes, merchant and supervisors.
 * Framework: PCI DSS, PSD2 and DORA. Synthetic demo data (MFM).
 */
(function () {
  'use strict';

  const CODE = 'CPP-2609-07';
  const MERCHANT = '334512987';

  /* Card categories: [key, BIN, brand, product, issuer, situation, cards, settled transactions] */
  const CATS = [
    { k: 'A', bin: '454812', brand: 'Visa', product: 'Cierzo Débito (Visa)', issuer: 'Banco Cierzo', own: true, sit: 'reemision', n: 214, ops: 690 },
    { k: 'B', bin: '454812', brand: 'Visa', product: 'Cierzo Débito (Visa)', issuer: 'Banco Cierzo', own: true, sit: 'fraude', n: 16, ops: 49 },
    { k: 'C', bin: '454812', brand: 'Visa', product: 'Cierzo Débito (Visa)', issuer: 'Banco Cierzo', own: true, sit: 'cancelada', n: 19, ops: 52 },
    { k: 'D', bin: '454812', brand: 'Visa', product: 'Cierzo Débito (Visa)', issuer: 'Banco Cierzo', own: true, sit: 'activa', n: 549, ops: 1640 },
    { k: 'E', bin: '522174', brand: 'Mastercard', product: 'Cierzo Crédito (Mastercard)', issuer: 'Banco Cierzo', own: true, sit: 'fraude', n: 8, ops: 27 },
    { k: 'F', bin: '522174', brand: 'Mastercard', product: 'Cierzo Crédito (Mastercard)', issuer: 'Banco Cierzo', own: true, sit: 'cancelada', n: 12, ops: 35 },
    { k: 'G', bin: '522174', brand: 'Mastercard', product: 'Cierzo Crédito (Mastercard)', issuer: 'Banco Cierzo', own: true, sit: 'activa', n: 289, ops: 825 },
    { k: 'H', bin: null, brand: 'Visa', product: 'Visa from another issuer', issuer: null, own: false, sit: 'red', n: 121, ops: 372 },
    { k: 'I', bin: null, brand: 'Mastercard', product: 'Mastercard from another issuer', issuer: null, own: false, sit: 'red', n: 56, ops: 154 }
  ];
  const SIT = {
    reemision: { label: 'Being reissued after today\'s alarm', chip: { status: 'info', label: 'Being reissued' }, action: 'None: blocked and being reissued since 06:10' },
    fraude: { label: 'Previously blocked for fraud', chip: { status: 'neutral', label: 'Blocked (fraud)' }, action: 'None: already blocked and reissued' },
    cancelada: { label: 'Cancelled or expired', chip: { status: 'neutral', label: 'Cancelled' }, action: 'None: cannot be used' },
    activa: { label: 'Active', chip: { status: 'crit', label: 'Active · exposed' }, action: 'Preventive block, reissue and cardholder notice' },
    red: { label: 'From another issuer', chip: { status: 'pending', label: 'Alert to the scheme' }, action: 'Alert to the scheme (Visa CAMS or Mastercard ADC)' }
  };
  const OTHER_ISSUERS = {
    Visa: [['Banco Atlántico Digital', '431907'], ['Caja Rural del Somontano', '459210'], ['Banco Mediterráneo Unido', '476103'], ['Neobanco Europa (Lithuania)', '426684'], ['Banca Alpina (Italy)', '453987'], ['Banco Ribera del Duero', '491742']],
    Mastercard: [['Banco Atlántico Digital', '535412'], ['Financiera Cántabra', '548803'], ['Neobanco Europa (Lithuania)', '523391'], ['Banque du Midi (France)', '512776']]
  };

  /* Reproducible generator (the 1,284 cards always come out the same) */
  let seed = 260907;
  const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
  const pick = (a) => a[Math.floor(rnd() * a.length)];
  const pad = (n, w) => String(n).padStart(w, '0');
  const n0 = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const eur = (v) => `${n0(Math.floor(v))}.${pad(Math.round((v % 1) * 100) % 100, 2)} €`;
  const INI = 'ABCDEGIJLMNOPRSTV';
  const DAYS = ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'];

  const cards = [];
  let clientSeq = 4180233;
  CATS.forEach((c) => {
    const opsArr = Array(c.n).fill(1);
    for (let r = c.ops - c.n; r > 0; r -= 1) opsArr[Math.floor(rnd() * c.n)] += 1;
    for (let i = 0; i < c.n; i += 1) {
      const iss = c.own ? [c.issuer, c.bin] : pick(OTHER_ISSUERS[c.brand]);
      const bin = iss[1];
      const last4 = pad(Math.floor(rnd() * 10000), 4);
      const ops = opsArr[i];
      let amount = 0;
      for (let j = 0; j < ops; j += 1) amount += 18 + rnd() * 72;
      clientSeq += 1 + Math.floor(rnd() * 37);
      const day = pick(DAYS);
      cards.push({
        cat: c.k,
        pan: `${bin.slice(0, 4)} ${bin.slice(4, 6)}•• •••• ${last4}`,
        product: c.product,
        issuer: iss[0],
        bin: `BIN ${bin}`,
        holder: c.own ? `${pick(INI)}. ${pick(INI)}. ${pick(INI)}.` : 'Cardholder of another issuer',
        client: c.own ? `Customer ${clientSeq}` : 'Not a customer',
        ops,
        last: `Last: ${day}/09 ${pad(6 + Math.floor(rnd() * 16), 2)}:${pad(Math.floor(rnd() * 60), 2)}`,
        amount: eur(amount),
        state: SIT[c.sit].chip,
        action: SIT[c.sit].action,
        own: c.own,
        sit: c.sit
      });
    }
  });
  /* 37 customers hold both an active debit and credit card: 838 active cards → 801 cardholders */
  const actD = cards.filter((x) => x.cat === 'D');
  cards.filter((x) => x.cat === 'G').slice(0, 37).forEach((x, i) => { x.client = actD[i * 13].client; x.holder = actD[i * 13].holder; });

  const sample = [];
  CATS.forEach((c) => { const list = cards.filter((x) => x.cat === c.k); sample.push(...list.slice(0, c.sit === 'activa' ? 12 : c.n > 100 ? 8 : 4)); });

  const countBy = (pred) => cards.filter(pred).length;
  const opsBy = (pred) => cards.filter(pred).reduce((s, x) => s + x.ops, 0);

  /* ---------------------------------------------------------------- Notices */

  const items = [
    {
      id: 'titulares', label: 'Holders of active cards', icon: 'users', notify: true,
      channel: 'SMS + in-app notification + email',
      meta: ['801 customers · 838 cards', '774 with an active app · 27 SMS only', 'Notice in Spanish'],
      body: 'Preventive block and free reissue of 549 Cierzo Débito (BIN 454812) and 289 Cierzo Crédito (BIN 522174) cards. 37 customers hold both cards: they receive a single notice.',
      refs: 'BIN 454812 · BIN 522174', qtyText: '838 cards', action: 'Block and reissue notice (PSD2)',
      notice: {
        lang: 'Spanish',
        headers: { From: 'Banco Cierzo · Security', To: '801 cardholders (Salesforce FSC · service campaign)', Subject: '[DRILL] We have replaced your card for security reasons' },
        subject: '[DRILL] We have replaced your card for security reasons',
        body: [
          'SMS (157 characters):\n[DRILL] Banco Cierzo: for your security we have blocked your card ****{last 4} and are sending you a new one free of charge. We will never ask for passwords by SMS or phone.',
          'In-app notification:\nYour card ending {last 4} was used at a merchant where a risk of card copying has been detected. We have blocked it and the new one will arrive in 3–5 business days. You can keep paying with your phone from today using the virtual card.',
          'Email:\nHello {name},\n\nYour {product} card ending {last 4} was used between 10 and 22 September at a merchant where a risk of card data copying has been detected. As a precaution, we have blocked it and are sending you a new one free of charge, with a different number.\n\nWhat you need to do: nothing. If you see any charge you do not recognise in your transactions, tell us from the app (Cards › I don\'t recognise a charge) and we will review it. Remember that Banco Cierzo will never ask you for passwords, codes or your PIN by phone, SMS or email.',
          'Reason: common point of compromise drill (PR-TAR-007). In a real case the user is informed without undue delay (PSD2) and told what measures to take to mitigate the risk.',
          'Kind regards,\nBanco Cierzo'
        ].join('\n\n'),
        highlights: ['22 September']
      }
    },
    {
      id: 'avisados', label: 'Customers notified by today\'s alarm', icon: 'user-check', notify: false, chip: 'Follow-up notice',
      channel: 'In-app notification',
      meta: ['209 customers · 214 cards', 'BIN 454812 alarm · 05:50', 'Notice in Spanish'],
      body: 'Their cards have been blocked and in reissue since 06:10. The origin (common point of compromise) is explained to them without repeating the block notice.',
      refs: 'BIN 454812', qtyText: '214 cards', action: 'Follow-up notice in the app',
      notice: {
        lang: 'Spanish',
        headers: { From: 'Banco Cierzo · Security', To: '209 customers (in-app notification)', Subject: '[DRILL] More information about your card replacement' },
        subject: '[DRILL] More information about your card replacement',
        body: 'This morning we told you that we had blocked your Cierzo Débito card ending {last 4}. We have identified the origin: it was used between 10 and 22 September at a merchant with a risk of card data copying. You do not need to do anything else: the new card is on its way and the unrecognised charges are being reviewed.\n\nReason: common point of compromise drill. Sample message.',
        highlights: []
      }
    },
    {
      id: 'visa', label: 'Visa Europe · Compromised Account Management System (CAMS)', icon: 'globe', notify: true,
      channel: 'Visa Online (CAMS) + email to the risk manager',
      meta: ['121 cards from 6 issuers', 'Acquirer: Banco Cierzo', 'Notice in English'],
      body: 'As the merchant\'s acquirer, Banco Cierzo reports the exposed accounts of other issuers to Visa so that each issuer can decide whether to block them; the PFI is engaged within 10 business days.',
      refs: `${MERCHANT} · POS 3`, qtyText: '121 cards', action: 'CAMS alert with the encrypted PAN file',
      notice: {
        lang: 'English',
        headers: { From: 'Banco Cierzo · Acquiring Risk', To: 'Visa Europe · Risk Management (CAMS)', Subject: `[MOCK] Account compromise event · merchant ${MERCHANT} · 121 Visa accounts` },
        subject: `[MOCK] Account compromise event · merchant ${MERCHANT} · 121 Visa accounts`,
        body: [
          'Dear Visa Risk Management team,',
          `Banco Cierzo, as acquirer, reports a suspected account data compromise at the following merchant:\nMerchant: Gasolinera Ronda Norte (MCC 5541, service stations) · MID ${MERCHANT}\nTerminal: TID 00000003 (POS 3, card reader suspected of tampering)\nExposure window: 10/09/2026 – 22/09/2026\nCommon point of purchase case: ${CODE}`,
          'Accounts at risk issued by other Visa issuers: 121 (6 issuers). The PAN list is uploaded to CAMS as an encrypted file; Banco Cierzo-issued accounts (798 Visa) are being handled internally.',
          'The terminal will be removed from service today and logs preserved for the PCI Forensic Investigator (PFI). We will confirm the PFI engagement within 10 business days.',
          'Reason: mock compromise exercise (PR-TAR-007). In a real event this message includes the incident reference and the PFI contact.',
          'Kind regards,\nAcquiring Risk · Banco Cierzo'
        ].join('\n\n'),
        highlights: [CODE, MERCHANT]
      }
    },
    {
      id: 'mastercard', label: 'Mastercard · Account Data Compromise (ADC)', icon: 'globe', notify: true,
      channel: 'Mastercard Connect (Safety Net / ADC) + email',
      meta: ['56 cards from 3 issuers', 'Acquirer: Banco Cierzo', 'Notice in English'],
      body: 'Notification of the ADC event with the exposure window and the encrypted PAN file; the 309 Cierzo Crédito cards (BIN 522174) are handled internally.',
      refs: `${MERCHANT} · POS 3`, qtyText: '56 cards', action: 'ADC notification with the encrypted PAN file',
      notice: {
        lang: 'English',
        headers: { From: 'Banco Cierzo · Acquiring Risk', To: 'Mastercard · Account Data Compromise team', Subject: `[MOCK] ADC event notification · MID ${MERCHANT} · 56 accounts` },
        subject: `[MOCK] ADC event notification · MID ${MERCHANT} · 56 accounts`,
        body: [
          'Dear Mastercard ADC team,',
          `We notify a suspected account data compromise event at merchant Gasolinera Ronda Norte (MID ${MERCHANT}, terminal 00000003) during 10/09/2026 – 22/09/2026 (case ${CODE}).`,
          'At-risk accounts issued by other Mastercard issuers: 56 (3 issuers), uploaded via Mastercard Connect as an encrypted file. Banco Cierzo-issued accounts (309) are being blocked and reissued internally.',
          'Reason: mock compromise exercise (PR-TAR-007). In a real event this message includes the incident reference and the forensic investigation plan.',
          'Kind regards,\nAcquiring Risk · Banco Cierzo'
        ].join('\n\n'),
        highlights: [CODE, MERCHANT]
      }
    },
    {
      id: 'comercio', label: 'Gasolinera Ronda Norte (merchant)', icon: 'building', notify: true,
      channel: 'Recorded-delivery letter + call from the merchant relationship manager',
      meta: [`Merchant ${MERCHANT} · Zaragoza`, 'Acquiring customer', 'Notice in Spanish'],
      body: 'PCI DSS requirement: take POS terminal 3 out of service, do not tamper with it, keep the CCTV footage of the till area from 10 to 22/09 and cooperate with the forensic investigation (PFI).',
      refs: 'POS 3 · terminal 00000003', qtyText: '1 terminal', action: 'PCI DSS requirement and removal of POS 3',
      notice: {
        lang: 'Spanish',
        headers: { From: 'Banco Cierzo · Acquiring', To: 'Management · Gasolinera Ronda Norte', Subject: `[DRILL] Security requirement · merchant ${MERCHANT} · POS 3` },
        subject: `[DRILL] Security requirement · merchant ${MERCHANT} · POS 3`,
        body: [
          'Dear customer,',
          `We have found that several cards used at your POS 3 terminal (terminal 00000003) between 10 and 22/09/2026 were later used fraudulently (case ${CODE}). To protect your customers and your business, we ask you to:`,
          '1. Take POS 3 out of service today and not tamper with it or unplug it until the Redsys technician collects it and installs a new one.\n2. Keep the CCTV footage of the till area from 10 to 22/09.\n3. Give access to the PCI forensic investigator (PFI) we will appoint in the coming days.',
          'Your relationship manager will call you today to arrange the replacement free of charge. The other terminals remain in operation.',
          'Reason: common point of compromise drill. In a real case, this section gives the incident reference and the obligations under the acquiring agreement.',
          'Yours faithfully,\nAcquiring · Banco Cierzo'
        ].join('\n\n'),
        highlights: [CODE, 'POS 3']
      }
    },
    {
      id: 'redsys', label: 'Redsys (processor)', icon: 'server', notify: true,
      channel: 'ServiceNow (ticket to the processor) + email',
      meta: ['Terminal 00000003', 'Deactivation and replacement today', 'Notice in Spanish'],
      body: 'Immediate deactivation of the terminal, replacement with a new one, preservation of the transaction logs and firmware for the PFI, and extraction of the 3,912 transactions in the window.',
      refs: 'Terminal 00000003', qtyText: '3,912 transactions', action: 'Terminal deactivation and evidence preservation',
      notice: {
        lang: 'Spanish',
        headers: { From: 'Banco Cierzo · Payments and Cards', To: 'Redsys · Member support', Subject: `[DRILL] Urgent deactivation of terminal 00000003 · merchant ${MERCHANT}` },
        subject: `[DRILL] Urgent deactivation of terminal 00000003 · merchant ${MERCHANT}`,
        body: [
          'Good morning,',
          `We request the urgent deactivation of terminal 00000003 at merchant ${MERCHANT} (Gasolinera Ronda Norte) on suspicion of reader tampering (case ${CODE}), its replacement today and the preservation of the device, the firmware and the transaction logs from 01/09 to 29/09 for the PCI forensic investigation.`,
          'We also ask you to extract the terminal\'s 3,912 transactions between 10 and 22/09 in the usual format for cross-checking with the card schemes.',
          'Reason: common point of compromise drill. Sample message.',
          'Kind regards,\nPayments and Cards · Banco Cierzo'
        ].join('\n\n'),
        highlights: [CODE, '00000003']
      }
    },
    {
      id: 'bde', label: 'Banco de España · DORA notification', icon: 'shield', notify: true,
      channel: 'Banco de España incident reporting platform',
      meta: ['Major ICT-related incident (if classified as such)', 'Initial notification within 4 h', 'Notice in Spanish'],
      body: 'Draft initial notification using the DORA technical standards template: customers and cards affected, estimated economic impact (41,230 € in suspicious transactions) and measures taken. ICT Risk validates the classification.',
      refs: 'INC-2026-0412', qtyText: '1,107 own cards', action: 'DORA initial notification (if classified as major)',
      notice: {
        lang: 'Spanish',
        headers: { From: 'Banco Cierzo · ICT Risk (DORA)', To: 'Banco de España · incident reporting', Subject: '[DRILL] Initial incident notification · INC-2026-0412' },
        subject: '[DRILL] Initial incident notification · INC-2026-0412',
        body: [
          'Initial notification (draft · main template fields):',
          `Internal reference: INC-2026-0412 · case ${CODE}\nDetection: 29/09/2026 05:50 (BIN 454812 fraud alarm) · classification: pending validation by ICT Risk\nDescription: common point of compromise at a terminal of a merchant acquired by the bank; exposure of card data (PAN and magnetic stripe) of 1,107 own cards and 177 cards from other issuers.\nImpact: 186 suspicious transactions totalling 41,230 € on 152 cards; no impact on the bank's internal systems.\nMeasures: preventive block and reissue of 838 cards, preventive rule on the BIN, terminal deactivation and alerts to the card schemes.`,
          'Follow-up deadlines: intermediate report within 72 h and final report within one month of the initial notification.',
          'Reason: drill. ICT Risk decides on the major-incident classification and the submission.',
          'ICT Risk (DORA) · Banco Cierzo'
        ].join('\n\n'),
        highlights: [CODE, 'INC-2026-0412']
      }
    },
    {
      id: 'aepd', label: 'Agencia Española de Protección de Datos (Spanish Data Protection Agency)', icon: 'lock', notify: false, chip: 'Assess with the DPO',
      channel: 'AEPD e-office (if applicable)',
      meta: ['Personal data breach', 'Deadline: 72 h (GDPR Art. 33)', 'Notice in Spanish'],
      body: 'The data protection officer assesses whether the exposure of customers\' card data is notifiable; Agentic Platform prepares the draft with the number of data subjects and the measures.',
      refs: 'INC-2026-0412', qtyText: '801 data subjects', action: 'DPO assessment and, if applicable, notification',
      notice: {
        lang: 'Spanish',
        headers: { From: 'Banco Cierzo · Data Protection Officer', To: 'AEPD · breach notification', Subject: '[DRILL] Personal data breach notification · INC-2026-0412' },
        subject: '[DRILL] Personal data breach notification · INC-2026-0412',
        body: 'Draft (main form fields):\nNature: confidentiality · card data captured at a terminal of a third-party merchant.\nCategories of data subjects: customers who are cardholders · 801 people (838 active cards) and 209 already notified.\nLikely consequences: fraudulent use of the cards; mitigated by blocking and reissuing.\nMeasures: preventive block, free reissue, notice to data subjects and preventive fraud rule.\n\nReason: drill. The DPO decides whether to notify.',
        highlights: ['INC-2026-0412']
      }
    }
  ];

  /* ---------------------------------------------------------------- Genealogy */

  const nodes = [
    { id: 'X', stage: 'exp', kicker: 'Case', title: CODE, mono: true, lot: CODE, sub: 'Common point of compromise', meta: 'Falcon Fraud · 152 cards with fraud', reveal: 0 },
    { id: 'COM', stage: 'com', kicker: 'Merchant', title: 'Gasolinera Ronda Norte', sub: `Merchant ${MERCHANT} · Zaragoza`, meta: 'MCC 5541 · acquirer Banco Cierzo', reveal: 1 },
    { id: 'TPV', stage: 'tpv', kicker: 'Terminal', title: 'POS 3', sub: 'Terminal 00000003 · Redsys', meta: 'Reader suspected of tampering', alert: 'Still in service', reveal: 1 },
    { id: 'VEN', stage: 'ven', kicker: 'Window', title: '10/09 → 22/09', sub: '3,912 transactions · 3,844 settled', meta: '1,284 distinct cards', reveal: 2 },
    { id: 'T1', stage: 'tar', kicker: 'Cards', title: '798 Cierzo Débito', sub: 'BIN 454812 · Visa', meta: `${n0(opsBy((x) => x.bin === 'BIN 454812'))} transactions`, reveal: 3 },
    { id: 'T2', stage: 'tar', kicker: 'Cards', title: '309 Cierzo Crédito', sub: 'BIN 522174 · Mastercard', meta: `${n0(opsBy((x) => x.bin === 'BIN 522174'))} transactions`, reveal: 3 },
    { id: 'T3', stage: 'tar', kicker: 'Cards', title: '121 Visa', sub: '6 other issuers', meta: '372 transactions', reveal: 3 },
    { id: 'T4', stage: 'tar', kicker: 'Cards', title: '56 Mastercard', sub: '4 other issuers', meta: '154 transactions', reveal: 3 },
    { id: 'S1', stage: 'sit', kicker: 'Situation', title: '838 active', sub: '549 debit · 289 credit', meta: 'Preventive block and reissue', alert: 'Block today', alertTone: true, tone: 'planned', reveal: 4 },
    { id: 'S2', stage: 'sit', kicker: 'Situation', title: '214 being reissued', sub: 'BIN 454812 alarm', meta: 'Blocked at 06:10', tone: 'shipped', reveal: 4 },
    { id: 'S3', stage: 'sit', kicker: 'Situation', title: '55 out of use', sub: '24 blocked for fraud', meta: '31 cancelled or expired', tone: 'stock', reveal: 4 },
    { id: 'S4', stage: 'sit', kicker: 'Situation', title: '177 from other issuers', sub: 'Each issuer decides', meta: 'Alert to the scheme', tone: 'stock', reveal: 4 },
    { id: 'D1', stage: 'dst', kicker: 'Recipient', title: 'Cardholders', sub: '801 customers', meta: 'SMS, app and email', tone: 'customer', reveal: 5 },
    { id: 'D2', stage: 'dst', kicker: 'Recipient', title: 'Customers already notified', sub: '209 customers', meta: 'Follow-up notice', tone: 'customer', reveal: 5 },
    { id: 'D3', stage: 'dst', kicker: 'Recipient', title: 'Visa · CAMS', sub: '121 accounts', meta: 'Encrypted file', tone: 'customer', reveal: 5 },
    { id: 'D4', stage: 'dst', kicker: 'Recipient', title: 'Mastercard · ADC', sub: '56 accounts', meta: 'Encrypted file', tone: 'customer', reveal: 5 },
    { id: 'D5', stage: 'dst', kicker: 'Recipient', title: 'Merchant and Redsys', sub: 'Deactivation of POS 3', meta: 'PCI DSS requirement', tone: 'customer', reveal: 5 },
    { id: 'D6', stage: 'dst', kicker: 'Recipient', title: 'Banco de España and AEPD', sub: 'DORA · GDPR', meta: 'If classified or applicable', tone: 'customer', reveal: 5 }
  ];
  const edges = [['X', 'COM'], ['COM', 'TPV'], ['TPV', 'VEN'], ['VEN', 'T1'], ['VEN', 'T2'], ['VEN', 'T3'], ['VEN', 'T4'],
    ['T1', 'S1'], ['T2', 'S1'], ['T1', 'S2'], ['T1', 'S3'], ['T2', 'S3'], ['T3', 'S4'], ['T4', 'S4'],
    ['S1', 'D1'], ['S2', 'D2'], ['S4', 'D3'], ['S4', 'D4'], ['TPV', 'D5'], ['S1', 'D6'], ['S2', 'D6']];

  /* ---------------------------------------------------------------- Tables */

  const locRow = (ref, k, where, whereSub, action, tone) => {
    const c = CATS.find((x) => x.k === k);
    return { ref, where, whereSub, n: c.n, qty: c.ops, action, tone };
  };
  const locRows = [
    locRow('BIN 454812', 'D', 'Cierzo Débito · active', 'Exposed and operational', 'Preventive block, reissue and cardholder notice', 'crit'),
    locRow('BIN 522174', 'G', 'Cierzo Crédito · active', 'Exposed and operational · 37 holders with debit and credit', 'Preventive block, reissue and cardholder notice', 'crit'),
    locRow('BIN 454812', 'A', 'Cierzo Débito · being reissued', 'Blocked today at 06:10 by the BIN alarm', 'Follow-up notice in the app', 'warn'),
    locRow('BIN 454812', 'B', 'Cierzo Débito · blocked for fraud', 'Before the drill', 'None', ''),
    locRow('BIN 522174', 'E', 'Cierzo Crédito · blocked for fraud', 'Before the drill', 'None', ''),
    locRow('BIN 454812', 'C', 'Cierzo Débito · cancelled or expired', 'Cannot be used', 'None', ''),
    locRow('BIN 522174', 'F', 'Cierzo Crédito · cancelled or expired', 'Cannot be used', 'None', ''),
    locRow('Visa', 'H', 'Other Visa issuers', '6 issuers (Spain, Lithuania and Italy)', 'CAMS alert to Visa', 'warn'),
    locRow('Mastercard', 'I', 'Other Mastercard issuers', '4 issuers (Spain, Lithuania and France)', 'ADC notification to Mastercard', 'warn')
  ];

  const cardCols = [
    { label: 'Card', key: 'pan', mono: true, sub: 'product' },
    { label: 'Issuer', key: 'issuer', sub: 'bin' },
    { label: 'Cardholder', key: 'holder', sub: 'client' },
    { label: 'Transactions', key: 'ops', num: true, sub: 'last' },
    { label: 'Amount at POS 3', key: 'amount', num: true },
    { label: 'Situation', key: 'state', chip: true },
    { label: 'Action in a real case', key: 'action' }
  ];

  const issuerRows = [
    { iss: 'Banco Cierzo · Cierzo Débito', bin: 'BIN 454812 · Visa', cards: 798, ops: opsBy((x) => x.bin === 'BIN 454812'), active: countBy((x) => x.cat === 'D'), done: 249, action: '549 to block and reissue' },
    { iss: 'Banco Cierzo · Cierzo Crédito', bin: 'BIN 522174 · Mastercard', cards: 309, ops: opsBy((x) => x.bin === 'BIN 522174'), active: countBy((x) => x.cat === 'G'), done: 20, action: '289 to block and reissue' },
    { iss: 'Other Visa issuers', bin: '6 issuers', cards: 121, ops: 372, active: 121, done: 0, action: 'CAMS alert' },
    { iss: 'Other Mastercard issuers', bin: '4 issuers', cards: 56, ops: 154, active: 56, done: 0, action: 'ADC notification' }
  ].map((r) => Object.assign(r, { diff: 0, located: '100.0%' }));

  const scope = {
    headline: `POS terminal 3 at Gasolinera Ronda Norte (merchant ${MERCHANT}) · window 10 to 22/09/2026 · 1,284 cards`,
    previewSide: '1 terminal · 1,284 cards',
    startNode: 'X',
    stages: [
      { id: 'exp', label: 'Case', icon: 'clipboard' },
      { id: 'com', label: 'Merchant', icon: 'building' },
      { id: 'tpv', label: 'Terminal', icon: 'barcode' },
      { id: 'ven', label: 'Window', icon: 'calendar' },
      { id: 'tar', label: 'Cards', icon: 'key', count: '1,284' },
      { id: 'sit', label: 'Situation', icon: 'shield' },
      { id: 'dst', label: 'Notices', icon: 'mail' }
    ],
    nodes,
    edges,
    systems: ['Falcon Fraud', 'Redsys', 'Core bancario T24', 'Salesforce FSC'],
    genSub: '1 terminal · 3,912 transactions · 1,284 cards · 8 recipients',
    steps: [
      { agent: 'trace', system: 'Falcon Fraud', action: 'Locates the starting point', result: 'Case CPP-2609-07 · common point of purchase analysis: 152 cards with confirmed fraud share POS terminal 3 at Gasolinera Ronda Norte', ms: 210, reveal: 0, mark: 'Starting point located' },
      { agent: 'trace', system: 'Redsys', action: 'Backwards: merchant, terminal and compromise window', result: `Merchant ${MERCHANT} (MCC 5541) · terminal 00000003 · first common purchase on 10/09, last on 22/09 · the terminal is still in service`, ms: 480, tone: 'warn', reveal: 1, mark: 'Merchant and terminal identified' },
      { agent: 'trace', system: 'Redsys', action: 'Terminal transactions in the window', result: '3,912 transactions (3,844 settled) · 1,284 distinct cards', ms: 690, reveal: 2, mark: 'Window transactions extracted' },
      { agent: 'trace', system: 'Core bancario T24', action: 'Issuer of each card by BIN', result: '1,107 issued by Banco Cierzo (798 BIN 454812 and 309 BIN 522174) · 177 by other issuers (121 Visa and 56 Mastercard)', ms: 520, reveal: 3 },
      { agent: 'trace', system: 'Core bancario T24', action: 'Situation of the Banco Cierzo cards', result: '838 active · 214 already being reissued after today\'s alarm · 24 blocked for fraud · 31 cancelled or expired', ms: 640, tone: 'warn', reveal: 4, mark: 'Cards classified by situation' },
      { agent: 'trace', system: 'Salesforce FSC', action: 'Cardholders, preferred channel and verified contact details', result: '801 customers with 838 active cards · 774 with an active app · 801 with a verified mobile · 37 with debit and credit', ms: 560, reveal: 5, mark: 'Cardholders and recipients identified' },
      { agent: 'trace', system: 'Falcon Fraud', action: 'Subsequent fraud on the common point cards', result: '186 suspicious transactions totalling 41,230 € on 152 cards, all from BIN 454812 (05:50 alarm)', ms: 380, tone: 'warn' },
      { agent: 'bal', system: 'Redsys', action: 'Cleansing of the window transactions', result: '68 excluded (46 voided the same day and 22 incomplete pre-authorisations) · 3,844 settled', ms: 330 },
      { agent: 'bal', system: 'Agentic Platform', action: 'Reconciliation of cards by issuer and situation', result: '100.0% reconciled · 0 unassigned cards · 1,284 of 1,284 cards classified', ms: 90, tone: 'ok', mark: 'Card reconciliation closed' },
      { agent: 'rec', system: 'GRC Archer', action: 'Opens the incident and the DORA classification assessment', result: 'INC-2026-0412 in draft · classification pending validation by ICT Risk', ms: 410 },
      { agent: 'rec', system: 'Outlook', action: 'Prepares the notices without sending them', result: '8 drafts: cardholders (SMS, app and email), customers already notified, Visa, Mastercard, merchant, Redsys, Banco de España and AEPD', ms: 780, mark: 'Record and notices prepared' }
    ],
    located: { label: 'Cards classified', value: '1,284 of 1,284', sub: '838 to block and reissue · 177 from other issuers', icon: 'key', short: '1,284 of 1,284 cards classified by issuer and situation (838 Banco Cierzo cards to block and reissue)' },
    kpiNotify: { label: 'Recipients to notify', value: 6, sub: '801 cardholders · 2 schemes · merchant · Redsys · Banco de España' },
    balance: {
      title: 'Card and transaction reconciliation',
      kpiLabel: 'Card reconciliation complete',
      sub: 'Cards and transactions at the common point · transactions in Redsys, issuer and situation in T24',
      head: 'Common point cards',
      headSide: '3 flows · 1,284 cards · 3,912 transactions',
      labels: { in: 'Cards at the common point', losses: 'Excluded', out: 'Issued by Banco Cierzo', stock: 'From other issuers' },
      detailTitle: 'Detail by flow',
      criterio: 'Criterion: each card is assigned to a single issuer and a single situation; any unassigned difference is shown as is, not spread. Each exclusion cites the system that records it.',
      reportText: 'Terminal transactions in Redsys; issuer by BIN and situation of each own card in the T24 core banking system; subsequent fraud in Falcon Fraud; cardholders and channels in Salesforce FSC.',
      flows: [
        {
          key: 'TAR', seg: 'Cards', main: true, unit: 'cards', colLabel: 'Cards',
          title: 'Cards used at POS 3 → issuer',
          inLabel: 'Distinct cards · POS 3', inSub: `10–22/09/2026 · merchant ${MERCHANT} · terminal 00000003`, inStage: 'Redsys', inQty: 1284,
          phases: [],
          outs: [
            { label: 'Banco Cierzo · Cierzo Débito', sub: 'BIN 454812 · Visa', stage: 'T24', qty: 798 },
            { label: 'Banco Cierzo · Cierzo Crédito', sub: 'BIN 522174 · Mastercard', stage: 'T24', qty: 309 },
            { label: 'Other Visa issuers', sub: '6 issuers · CAMS alert', stage: 'Redsys', qty: 121, kind: 'stock' },
            { label: 'Other Mastercard issuers', sub: '4 issuers · ADC notification', stage: 'Redsys', qty: 56, kind: 'stock' }
          ]
        },
        {
          key: 'CIE', seg: 'Banco Cierzo', unit: 'cards', colLabel: 'Cards',
          title: 'Banco Cierzo cards → situation',
          inLabel: 'Own cards', inSub: '798 debit and 309 credit', inStage: 'T24', inQty: 1107,
          phases: [{ title: 'Already neutralised before the drill', stages: [
            ['Falcon', 'Being reissued after the BIN 454812 alarm (today 06:10)', 214],
            ['T24', 'Blocked for fraud before the drill', 24],
            ['T24', 'Cancelled or expired', 31]
          ] }],
          outs: [
            { label: 'Active · Cierzo Débito', sub: 'BIN 454812 · block and reissue', stage: 'T24', qty: 549 },
            { label: 'Active · Cierzo Crédito', sub: 'BIN 522174 · block and reissue', stage: 'T24', qty: 289 }
          ]
        },
        {
          key: 'OPS', seg: 'Transactions', unit: 'transactions', colLabel: 'Transactions',
          title: 'POS 3 transactions in the window → issuer',
          inLabel: 'Captured transactions', inSub: '10–22/09/2026 · terminal 00000003', inStage: 'Redsys', inQty: 3912,
          phases: [{ title: 'Cleansing of the extract', stages: [
            ['Redsys', 'Voided the same day (not settled)', 46],
            ['Redsys', 'Incomplete pre-authorisations', 22]
          ] }],
          outs: [
            { label: 'Settled with a Banco Cierzo card', sub: '1,107 cards', stage: 'T24', qty: 3318 },
            { label: 'Settled with a Visa from another issuer', sub: '121 cards', stage: 'Redsys', qty: 372 },
            { label: 'Settled with a Mastercard from another issuer', sub: '56 cards', stage: 'Redsys', qty: 154 }
          ]
        }
      ],
      product: {
        title: 'Cards by issuer',
        side: '1,284 cards · 3,844 settled transactions',
        cols: [
          { label: 'Issuer', key: 'iss', sub: 'bin' },
          { label: 'Cards', key: 'cards', num: true },
          { label: 'Transactions', key: 'ops', num: true },
          { label: 'Exposed', key: 'active', num: true, sub: 'action' },
          { label: 'Difference', key: 'diff', num: true },
          { label: 'Classified', key: 'located', num: true, ok: true }
        ],
        rows: issuerRows
      }
    },
    units: {
      title: 'Common point cards',
      sub: '1,284 cards · representative sample on screen · CSV with all of them · masked PAN (PCI DSS)',
      icon: 'key',
      csvLabel: 'Cards (CSV)',
      csvName: 'cards',
      byLoc: { label: 'By situation', refLabel: 'BIN or scheme', whereLabel: 'Situation', nLabel: 'Cards', qtyLabel: 'Transactions', actionLabel: 'Action in a real case', rows: locRows },
      list: { label: 'Cards', count: 1284, note: `Sample of ${sample.length} of 1,284 cards (from each situation); the CSV includes all 1,284 with masked PAN.`, cols: cardCols, rows: sample },
      csvRows: cards
    },
    customers: {
      title: 'Customers and organisations to notify',
      sub: '6 recipients with a notice · 2 to assess · 2 actions due today',
      items,
      holdsTitle: 'Actions due today',
      holdsIcon: 'clock',
      holds: [
        { icon: 'barcode', tone: 'crit', title: 'Deactivate POS 3 in Redsys', meta: ['today', `terminal 00000003 · merchant ${MERCHANT}`, 'Gasolinera Ronda Norte'], body: 'In a real case, the terminal stops operating today: it is still in service and every purchase exposes one more card. Redsys replaces it and preserves the device for the PFI.' },
        { icon: 'repeat', tone: 'warn', title: 'Include 838 cards in the 14:00 embossing file', meta: ['today at 14:00', '549 debit · 289 credit', 'Payments and Cards'], body: 'The reissue goes into the daily file to the card personalisation bureau; the cards arrive in 3–5 business days and the virtual card is activated in the app from today.' }
      ]
    },
    approval: {
      titlePrefix: 'Drill block, reissue and notices',
      scope: [
        { label: 'Cardholders to notify', value: '801 customers · 838 cards (SMS, app and email)', status: 'pending', chip: '801' },
        { label: 'Cards to block and reissue', value: '549 Cierzo Débito · 289 Cierzo Crédito', status: 'evaluate', chip: 'No block in a drill' },
        { label: 'Card schemes', value: 'Visa CAMS · 121 accounts · Mastercard ADC · 56 accounts' },
        { label: 'Merchant and terminal', value: 'Gasolinera Ronda Norte · deactivation of POS 3 (00000003)' },
        { label: 'Supervisors', value: 'Banco de España (DORA, if classified) · AEPD (if applicable)' }
      ],
      effects: [
        'Outlook and Salesforce FSC: 8 notices saved as drafts marked DRILL; no SMS, notification or email is sent',
        'Core bancario T24 and Falcon Fraud: no changes; in a drill no card is blocked or reissued',
        'GRC Archer: incident INC-2026-0412 in draft with the DORA assessment',
        'Record {code} approved with the timings of each activity'
      ]
    },
    report: {
      objeto: 'Common point of compromise drill starting from {label}. It checks backward traceability (merchant, terminal and exposure window) and forward traceability (transactions, cards, issuers, cardholders and notice recipients), with the card and transaction reconciliation.',
      noAction: 'The exercise does not block or reissue cards and does not send notices.',
      results: [
        '801 cardholders with 838 active cards to block and reissue; 209 customers already notified by today\'s alarm would receive a follow-up notice.',
        '177 cards from other issuers would be reported to Visa (CAMS, 121) and Mastercard (ADC, 56); POS 3 is still in service and would be deactivated today.',
        'DORA initial notification prepared in case ICT Risk classifies the incident as major (4 h from classification).'
      ],
      back: {
        cols: [{ label: 'Stage', key: 'etapa' }, { label: 'Reference', key: 'ref', mono: true }, { label: 'Date', key: 'fecha' }, { label: 'Detail', key: 'det' }],
        rows: [
          { etapa: 'Case', ref: CODE, fecha: '28/09/2026', det: 'Common point of purchase analysis in Falcon Fraud: 152 cards with confirmed fraud and one common purchase' },
          { etapa: 'Merchant', ref: MERCHANT, fecha: 'Onboarded 2019', det: 'Gasolinera Ronda Norte · Zaragoza · MCC 5541 · acquirer Banco Cierzo · PCI DSS SAQ B-IP' },
          { etapa: 'Terminal', ref: '00000003', fecha: 'Installed 03/2024', det: 'POS 3 · chip, magnetic stripe and contactless reader · suspected reader tampering' },
          { etapa: 'Window', ref: '10/09–22/09', fecha: '13 days', det: '3,912 transactions captured · 3,844 settled · 1,284 distinct cards' },
          { etapa: 'Subsequent fraud', ref: 'BIN 454812', fecha: '29/09/2026 02:10–05:50', det: '186 suspicious card-not-present transactions totalling 41,230 € on 152 cards' }
        ]
      },
      fwd: {
        cols: [{ label: 'BIN or scheme', key: 'ref', mono: true }, { label: 'Situation', key: 'where' }, { label: 'Cards', key: 'n', num: true }, { label: 'Transactions', key: 'qty', num: true }, { label: 'Action', key: 'action' }],
        rows: locRows
      },
      conclusion: 'Conclusion: the information needed to act on a common point of compromise is obtained in full and reconciles card by card. Proposed improvement actions: automate the terminal deactivation in Redsys from the case and review the card schemes\' risk contacts.',
      note: 'Drill: no card has been blocked or reissued, the terminal has not been deactivated and no notice has been sent. Masked PAN; synthetic demo data.'
    },
    audit: { back: `merchant ${MERCHANT} · terminal 00000003 · window 10–22/09`, fwd: '1,284 cards · 3,844 settled transactions · 801 cardholders · 177 cards from other issuers' },
    say: [
      'What needs action: 838 active cards would be blocked and reissued today, and POS 3, which is still in service, would be deactivated in Redsys.',
      'Notices go out through each recipient\'s channel: SMS and app for cardholders, CAMS and ADC for the schemes, a PCI requirement for the merchant and the DORA draft for the Banco de España. In a drill nothing is sent. Fraud Prevention decides.'
    ]
  };

  agenticPackEn('banca', {
    retirada: {
      title: 'Common point of compromise drill',
      nav: 'Traceability drill',
      section: 'Calidad',
      desc: 'Traceability exercise for a common point of compromise: from the merchant and the terminal to each transaction, card, issuer and cardholder, with the card and transaction reconciliation and the notices to customers, card schemes, merchant and supervisors, starting from a case or a merchant.',
      place: 'Operations Centre · Madrid',
      approver: 'Head of Fraud Prevention',
      regPrefix: 'SR-2026-',
      agents: { trace: 'Traceability', bal: 'Reconciliation', rec: 'Record and notices' },
      targetText: 'Illustrative target: 4 h',
      todayEstimate: '4–8 h',
      timerRef: 'Demo target: 4 h',
      packLabel: 'Download case pack',
      setup: { title: 'Starting point', sub: 'A common point of compromise case or a merchant code' },
      modes: {
        expediente: { label: 'Case', noun: 'the case', field: 'Case code', icon: 'clipboard', format: 'CPP-2609-07', where: 'Falcon Fraud' },
        comercio: { label: 'Merchant', noun: 'the merchant', field: 'Merchant code (FUC)', icon: 'building', format: '334512987', where: 'Redsys' }
      },
      entries: [
        { mode: 'expediente', code: CODE, scope: 'cpp', label: `Case ${CODE}`, option: 'Common point · Gasolinera Ronda Norte · POS 3' },
        { mode: 'comercio', code: MERCHANT, scope: 'cpp', label: `Merchant ${MERCHANT}`, option: 'Gasolinera Ronda Norte · Zaragoza', headline: `Gasolinera Ronda Norte · Zaragoza · MCC 5541 · case ${CODE} open on its POS 3`, startNode: 'COM', startResult: `Gasolinera Ronda Norte (MCC 5541) · case ${CODE} open on its POS 3 → tracing the compromise window` }
      ],
      examples: [
        { mode: 'expediente', code: CODE, label: `Case ${CODE}` },
        { mode: 'comercio', code: MERCHANT, label: `Merchant ${MERCHANT}` }
      ],
      reference: {
        title: 'Reference framework',
        sub: 'Exercise target; Compliance and ICT Risk confirm the applicable requirements',
        items: [
          ['PCI DSS v4.0.1', 'When a common point of compromise is identified, the acquirer activates its response plan, preserves the evidence for the PCI Forensic Investigator (PFI) and reports the exposed accounts to the card schemes (Visa CAMS, Mastercard ADC).'],
          ['PSD2', 'Directive (EU) 2015/2366 (Real Decreto-ley 19/2018, the Spanish transposition): if an incident affects the financial interests of users, they are informed without undue delay of the measures they can take to mitigate it.'],
          ['DORA', 'Regulation (EU) 2022/2554: if the incident is classified as a major ICT-related incident, initial notification within 4 h of classification (no later than 24 h from detection), intermediate report within 72 h and final report within one month.']
        ],
        note: 'A drill does not block cards or send notices: it measures whether the information is obtained in full, reconciles and arrives in time.'
      },
      legend: { planned: 'Action due today', click: 'Click the case to see its full trace' },
      notice: { title: 'Common point of compromise drill', approved: 'Saved as a draft marked DRILL: no SMS, notification or email is sent.' },
      approval: { policy: 'POL-FRA-003 and PR-TAR-007 · preventive blocking and mass reissue require Fraud Prevention approval', approveLabel: 'Approve and close drill', rejectPlaceholder: 'For example: the DORA classification still needs validating with ICT Risk' },
      clock: { title: 'Stopwatch against the target', sub: 'Simulation times; not performance measurements of the systems' },
      report: { subtitle: 'Record of the common point of compromise exercise · PCI DSS · PSD2 · DORA', approvedText: 'Notices saved as drafts marked DRILL; none has been sent and no card has been blocked.' },
      compare: {
        rows: [
          { k: 'People involved', today: '4–5: Fraud, Payments and Cards, Acquiring, Customer Service and ICT Risk', agentic: '1: {approver} reviews and approves' },
          { k: 'Systems checked', today: '6–7 opened by hand: Falcon, Redsys, T24, Salesforce, Archer, spreadsheets and email', agentic: '6 connectors queried by the agents: Falcon Fraud, Redsys, T24, Salesforce FSC, GRC Archer and Outlook' },
          { k: 'Steps', today: '15–20 queries, PAN cross-checks by BIN and files for the card schemes', agentic: '{steps} automatic steps and 1 approval' },
          { k: 'Reconciliation', today: 'Spreadsheet with Redsys and T24 extracts', agentic: 'Calculated by issuer and situation: {reconciled} reconciled' }
        ]
      },
      presenter: {
        idle: [
          'Common point of compromise drill: in banking, traceability runs from the merchant to every card and cardholder.',
          'Choose the starting point: case CPP-2609-07 or the merchant code.',
          'Agentic Platform goes through Falcon, Redsys, T24 and Salesforce: terminal, window, transactions, issuer by BIN, situation of each card and each cardholder\'s channel, and reconciles the 1,284 cards.'
        ],
        nextIdle: 'Click "Start drill" with case CPP-2609-07 (or choose "Merchant 334512987").',
        nextRun: 'Click "View notice" for the cardholders or Visa, then "Approve and close drill".',
        nextDone: '"Download case pack": CSV with the 1,284 cards and a printable record. Then "Customer questionnaire" (right arrow).'
      },
      scopes: { cpp: scope }
    }
  });
})();
