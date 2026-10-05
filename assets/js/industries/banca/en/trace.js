/* Banco Cierzo · trace records by case (BIN, common point of compromise, merchant and complaint), English.
 * Read by App.traceModal from CN_DATA.trace[code]. Card numbers always masked (PCI DSS).
 * Synthetic demo data (MFM). */
agenticPackEn('banca', {
  trace: (function () {
    'use strict';

    const CARD_COLS = [
      { key: 'pan', label: 'Card', mono: true, sub: 'product' },
      { key: 'client', label: 'Customer', sub: 'segment' },
      { key: 'last', label: 'Last transaction', sub: 'merchant' },
      { key: 'status', label: 'Status', chip: true }
    ];

    /* Sample of BIN 454812 cards with suspicious transactions tonight. */
    const NIGHT = [
      ['454812······0218', 'Andrés Royo Lacasa', 'Retail', '02:14 · 0.80 €', 'STREAMBOX-SUB', 'blocked'],
      ['454812······1407', 'Marta Sanz Peiró', 'Retail', '02:58 · 349.00 €', 'GADGETMARKET', 'review'],
      ['454812······2290', 'Javier Gil Ostáriz', 'Retail', '03:05 · 312.40 €', 'TIENDAONLINE-ELEC', 'review'],
      ['454812······2716', 'Pilar Artal Fuertes', 'Retail', '03:11 · 360.00 €', 'GIFTCARDS-EU', 'review'],
      ['454812······3054', 'Ignacio Bielsa Mur', 'Self-employed', '03:24 · 329.90 €', 'TECNOFLASH-ES', 'blocked'],
      ['454812······3381', 'Natalia Bescós Gil', 'Retail', '03:31 · 0.50 €', 'DONA-PLUS', 'review'],
      ['454812······3962', 'Raúl Lasheras Abad', 'Retail', '03:47 · 370.00 €', 'PHONEPLANET', 'review'],
      ['454812······4128', 'Carmen Escó Vidal', 'Retail', '03:52 · 357.15 €', 'TIENDAONLINE-ELEC', 'blocked'],
      ['454812······4483', 'Sergio Navarro Gállego', 'Retail', '04:03 · 155.00 €', 'CRYPTO-ONRAMP', 'review'],
      ['454812······5019', 'Elena Pueyo Sancho', 'Retail', '04:16 · 338.30 €', 'GADGETMARKET', 'review'],
      ['454812······5536', 'David Marcén Lorés', 'Self-employed', '04:22 · 0.80 €', 'STREAMBOX-SUB', 'review'],
      ['454812······6102', 'Rosa Aznar Til', 'Retail', '04:37 · 360.00 €', 'GIFTCARDS-EU', 'review'],
      ['454812······6644', 'Luis Calvo Ariño', 'Retail', '04:49 · 333.60 €', 'TECNOFLASH-ES', 'review'],
      ['454812······7190', 'Ana Belén Lobera', 'Retail', '04:55 · 357.15 €', 'TIENDAONLINE-ELEC', 'review'],
      ['454812······7731', 'Lucía Ferrer Gil', 'Retail', '26/09 22:47 · 217.90 €', 'TIENDAONLINE-ELEC', 'review'],
      ['454812······8257', 'Tomás Bergua Pardo', 'Retail', '05:08 · 370.00 €', 'PHONEPLANET', 'review'],
      ['454812······8813', 'Beatriz Cored Sanz', 'Retail', '05:19 · 338.30 €', 'GADGETMARKET', 'review'],
      ['454812······9345', 'Óscar Laguna Ruiz', 'Retail', '05:41 · 0.80 €', 'STREAMBOX-SUB', 'review']
    ];
    const ST = { blocked: { status: 'blocked', label: 'Blocked at 04:10' }, review: { status: 'pending', label: 'Block and reissue proposed' } };
    const nightRows = NIGHT.filter((r) => !/26\/09/.test(r[3])).map((r) => ({ pan: r[0], product: 'Tarjeta Cierzo Débito', client: r[1], segment: r[2], last: r[3], merchant: r[4], status: ST[r[5]] }));

    const MERCHANTS = [
      { m: 'STREAMBOX-SUB', type: 'Digital subscriptions · IE', mcc: '4899', ops: 38, amount: '30.40 €', phase: 'Card testing', status: { status: 'pending', label: 'Rule proposed' } },
      { m: 'DONA-PLUS', type: 'Online donations · NL', mcc: '8398', ops: 26, amount: '20.60 €', phase: 'Card testing', status: { status: 'pending', label: 'Rule proposed' } },
      { m: 'TIENDAONLINE-ELEC', type: 'Electronics · ES', mcc: '5732', ops: 23, amount: '8,214.30 €', phase: 'Purchases', status: { status: 'pending', label: 'Rule proposed' } },
      { m: 'GADGETMARKET', type: 'Electronics · LT', mcc: '5732', ops: 31, amount: '10,486.50 €', phase: 'Purchases', status: { status: 'pending', label: 'Rule proposed' } },
      { m: 'TECNOFLASH-ES', type: 'Electronics · ES', mcc: '5732', ops: 19, amount: '6,338.20 €', phase: 'Purchases', status: { status: 'pending', label: 'Rule proposed' } },
      { m: 'GIFTCARDS-EU', type: 'Gift cards · MT', mcc: '5815', ops: 27, amount: '9,720.00 €', phase: 'Purchases', status: { status: 'pending', label: 'Rule proposed' } },
      { m: 'PHONEPLANET', type: 'Mobile phones · PL', mcc: '5732', ops: 14, amount: '5,180.00 €', phase: 'Purchases', status: { status: 'pending', label: 'Rule proposed' } },
      { m: 'CRYPTO-ONRAMP', type: 'Crypto-asset purchases · CY', mcc: '6051', ops: 8, amount: '1,240.00 €', phase: 'Purchases', status: { status: 'pending', label: 'Rule proposed' } }
    ];

    const bin = {
      kind: 'BIN',
      title: 'BIN 454812 · Tarjeta Cierzo Débito',
      summary: [
        ['Product', 'Tarjeta Cierzo Débito · Visa'],
        ['Active cards', '182,400'],
        ['Suspicious transactions', '186 · 41,230 € (02:10–05:50)'],
        ['Cards affected', '214 of 209 customers'],
        ['Merchants involved', '8 (2 for testing · 6 for purchases)'],
        ['Peak', '3.6% CNP fraud at 04:55'],
        ['Alarm', 'ALM-FRA-0550 · 05:50'],
        ['Related common point', 'CPP-2609-07 (61 cards)']
      ],
      back: [
        { when: '2026-09-10', stage: 'Start of the common point window', detail: 'First cards used at POS terminal 3 at Gasolinera Ronda Norte (case CPP-2609-07)', ref: 'CPP-2609-07' },
        { when: '2026-09-26 22:14', stage: 'Unrecognised charges', detail: 'Three purchases at TIENDAONLINE-ELEC with card ····7731 (disputed on 28/09)', ref: 'SAC-2026-04187', tone: 'warn' },
        { when: '2026-09-29 01:50', stage: 'ACS degradation', detail: '3DS SMS OTPs arrive more than 60 s late', ref: 'INC0218842', tone: 'warn' },
        { when: '2026-09-29 02:10', stage: 'Card testing', detail: '64 micro-payments of 0.50 to 1.00 € at STREAMBOX-SUB and DONA-PLUS', ref: 'Falcon', tone: 'warn' },
        { when: '2026-09-29 02:50', stage: 'Electronics purchases', detail: '122 purchases of 150 to 400 € at 6 merchants under the acquirer exemption', ref: 'Redsys', tone: 'crit' },
        { when: '2026-09-29 04:10', stage: 'Manual block', detail: 'The analyst on shift blocks 31 cards with confirmed transactions', ref: 'Falcon' },
        { when: '2026-09-29 05:50', stage: 'Alarm escalated', detail: '186 suspicious transactions totalling 41,230 €; rate of 2.9% against the usual 0.3%', ref: 'ALM-FRA-0550', tone: 'crit' }
      ],
      forward: {
        title: 'Merchants in the attack (186 transactions · 41,230 €)',
        cols: [
          { key: 'm', label: 'Merchant', mono: true, sub: 'type' },
          { key: 'mcc', label: 'MCC' },
          { key: 'phase', label: 'Phase' },
          { key: 'ops', label: 'Transactions' },
          { key: 'amount', label: 'Amount' },
          { key: 'status', label: 'Status', chip: true }
        ],
        rows: MERCHANTS,
        note: { title: 'Agentic Platform proposal', body: 'Preventive rule in Falcon for high-risk e-commerce on the BIN (MCC 4899, 5732, 5815, 6051 without SCA), reissue of 214 cards and notice to customers by SMS and in the app. Requires approval from the Head of Fraud Prevention.', icon: 'shield' }
      },
      units: { label: 'Cards (sample)', cols: CARD_COLS, rows: nightRows },
      quality: [
        'Usual CNP fraud on the BIN: 0.3% (average of the last 90 days).',
        'POL-FRA-003 policy thresholds: warning above 1%, critical above 2% sustained for 30 min.',
        '71% of tonight\'s purchases with SCA; the 122 suspicious purchases were made under an acquirer exemption (transaction risk analysis or low value).',
        'Sample of 17 cards out of 214; the full list is in Falcon (case FAL-CASE-26-07713).',
        'Card numbers are shown masked (PCI DSS, requirement 3.4).'
      ],
      notes: [
        { title: 'Customer with an open complaint', body: 'Lucía Ferrer Gil\'s card ····7731 (SAC-2026-04187) belongs to this BIN and has been blocked since 28/09; her charges are from merchant TIENDAONLINE-ELEC, which reappears tonight.', tone: 'warn', icon: 'user' },
        { title: 'Possible DORA incident', body: 'The ACS delay may be classified as a major ICT-related incident: initial notification within 4 h (PR-DORA-002).', tone: 'crit', icon: 'alert-triangle' }
      ]
    };

    const cppCards = [
      ['454812······0218', 'Tarjeta Cierzo Débito', 'Andrés Royo Lacasa', '12/09 · 54.20 €', 'Attacked on 29/09'],
      ['454812······1407', 'Tarjeta Cierzo Débito', 'Marta Sanz Peiró', '13/09 · 61.00 €', 'Attacked on 29/09'],
      ['454812······2290', 'Tarjeta Cierzo Débito', 'Javier Gil Ostáriz', '14/09 · 48.75 €', 'Attacked on 29/09'],
      ['454812······3054', 'Tarjeta Cierzo Débito', 'Ignacio Bielsa Mur', '15/09 · 70.10 €', 'Attacked on 29/09'],
      ['454812······3381', 'Tarjeta Cierzo Débito', 'Natalia Bescós Gil', '16/09 · 45.00 €', 'Attacked on 29/09'],
      ['454812······4128', 'Tarjeta Cierzo Débito', 'Carmen Escó Vidal', '17/09 · 66.40 €', 'Attacked on 29/09'],
      ['454812······5160', 'Tarjeta Cierzo Débito', 'Pedro Sesé Allué', '18/09 · 40.00 €', 'No fraud'],
      ['489321······2047', 'Tarjeta Cierzo Crédito', 'Mercedes Ciria Bal', '10/09 · 82.30 €', 'No fraud'],
      ['489321······3398', 'Tarjeta Cierzo Crédito', 'Fernando Usón Lac', '11/09 · 57.90 €', 'Fraud 24/09 · 420.00 €'],
      ['489321······5512', 'Tarjeta Cierzo Crédito', 'Inés Garcés Pina', '19/09 · 63.15 €', 'No fraud'],
      ['489321······6630', 'Tarjeta Cierzo Crédito', 'Alberto Morer Pons', '20/09 · 71.80 €', 'Fraud 27/09 · 312.00 €'],
      ['522814······1176', 'Tarjeta Cierzo Prepago', 'Cristina Laborda Gil', '21/09 · 30.00 €', 'No fraud'],
      ['522814······4409', 'Tarjeta Cierzo Prepago', 'Jorge Bescós Asín', '22/09 · 25.00 €', 'No fraud'],
      ['4·····(Visa)', 'Other issuer · Visa network', '—', '10–22/09 · 104 cards', 'Alert via Visa'],
      ['5·····(Mastercard)', 'Other issuer · Mastercard network', '—', '10–22/09 · 73 cards', 'Alert via Mastercard']
    ].map((r) => ({ pan: r[0], product: r[1], client: r[2], segment: '', last: r[3], merchant: 'Gasolinera Ronda Norte · POS 3', status: /^Fraud|Attacked/.test(r[4]) ? { status: 'critical', label: r[4] } : /Alert/.test(r[4]) ? { status: 'info', label: r[4] } : { status: 'pending', label: 'Block and reissue' } }));

    const cpp = {
      kind: 'Common point of compromise case',
      title: 'Case CPP-2609-07 · common point of compromise',
      summary: [
        ['Merchant', 'Gasolinera Ronda Norte · POS terminal 3 · no. 334512987'],
        ['Compromise window', '10/09/2026 to 22/09/2026'],
        ['Cards exposed', '1,284 (1,107 issued by Banco Cierzo · 177 by other issuers)'],
        ['Confirmed fraud', '38 cards · 14,860 € (up to 28/09)'],
        ['Detected by', 'Falcon Fraud · common point of purchase analysis (27/09)'],
        ['Attacked tonight', '61 cards from BIN 454812'],
        ['Framework', 'PCI DSS · PSD2 · DORA'],
        ['Target', 'Block, reissue and notify customers within 4 h']
      ],
      back: [
        { when: '2026-09-10', stage: 'Start of the window', detail: 'First transaction at POS terminal 3 (pumps 5–6) by a card later defrauded', ref: '334512987' },
        { when: '2026-09-22', stage: 'End of the window', detail: 'The acquirer replaces POS terminal 3 after a reader fault; the device is recovered with a skimming device in the magnetic stripe slot', ref: 'Acquirer' },
        { when: '2026-09-24', stage: 'First frauds', detail: 'Card-present purchases with cloned cards (magnetic stripe) in Romania and Morocco', ref: 'Falcon', tone: 'warn' },
        { when: '2026-09-27 11:20', stage: 'Common point detected', detail: 'Falcon cross-checks 38 defrauded cards: all went through POS terminal 3 between 10 and 22/09', ref: 'FAL-CPP-0907', tone: 'crit' },
        { when: '2026-09-28 09:00', stage: 'Case opened', detail: 'Case CPP-2609-07 in GRC Archer; acquirer, Visa and Mastercard notified', ref: 'CPP-2609-07', tone: 'brand' },
        { when: '2026-09-29 05:50', stage: 'Related attack', detail: '61 cards from the common point appear in the attack on BIN 454812', ref: 'ALM-FRA-0550', tone: 'crit' }
      ],
      forward: {
        title: 'Exposed cards by product and action',
        cols: [
          { key: 'group', label: 'Group', mono: true, sub: 'what' },
          { key: 'cards', label: 'Cards' },
          { key: 'fraud', label: 'With fraud' },
          { key: 'action', label: 'Action' },
          { key: 'status', label: 'Status', chip: true }
        ],
        rows: [
          { group: '454812', what: 'Tarjeta Cierzo Débito', cards: '642', fraud: '22', action: 'Block, reissue and notify', status: 'pending' },
          { group: '489321', what: 'Tarjeta Cierzo Crédito', cards: '311', fraud: '14', action: 'Block, reissue and notify', status: 'pending' },
          { group: '522814', what: 'Tarjeta Cierzo Prepago', cards: '154', fraud: '2', action: 'Block and reissue', status: 'pending' },
          { group: 'Visa', what: 'Other issuers', cards: '104', fraud: '—', action: 'Alert via the network (CAMS)', status: 'pending' },
          { group: 'Mastercard', what: 'Other issuers', cards: '73', fraud: '—', action: 'Alert via the network (Safety Net)', status: 'pending' }
        ],
        note: { title: 'Case reconciliation', body: '1,284 cards = 1,107 issued by Banco Cierzo (642 + 311 + 154) + 177 by other issuers (104 Visa + 73 Mastercard).', icon: 'scale' }
      },
      units: { label: 'Cards (sample)', cols: CARD_COLS, rows: cppCards },
      quality: [
        'PCI DSS: the merchant must provide a PFI forensic report; the acquirer requested it on 28/09.',
        'PSD2: refund of unauthorised transactions by the end of the next business day unless there are reasonable grounds to suspect fraud by the customer.',
        'DORA: the case is not an ICT incident of the bank\'s own; the 3DS ACS is assessed separately (INC0218842).',
        'Card numbers are shown masked (PCI DSS, requirement 3.4).'
      ],
      notes: [
        { title: 'Reissue pending approval', body: 'Blocking and reissuing the 1,107 own cards requires approval from the Head of Payments and Cards (PR-TAR-007).', tone: 'warn', icon: 'lock' }
      ]
    };

    const merchant = {
      kind: 'Merchant',
      title: 'Merchant TIENDAONLINE-ELEC',
      summary: [
        ['Business', 'Online sale of consumer electronics · MCC 5732'],
        ['Acquirer', 'Pagos del Ebro, EP · merchant 0471225'],
        ['Country', 'Spain'],
        ['Purchases with Cierzo cards (30 days)', '1,326 · 168,410 €'],
        ['Disputed (30 days)', '27 · 9,114.60 €'],
        ['Tonight', '23 suspicious transactions · 8,214.30 €'],
        ['SCA', 'Applies the acquirer transaction risk analysis exemption'],
        ['Complaint', 'SAC-2026-04187']
      ],
      back: [
        { when: '2025-11-03', stage: 'Merchant onboarded', detail: 'Onboarded with Pagos del Ebro, EP; MCC 5732', ref: '0471225' },
        { when: '2026-09-26 22:14', stage: 'Charges in the complaint', detail: 'Three purchases with card ····7731 between 22:14 and 22:47 (612.40 €)', ref: 'SAC-2026-04187', tone: 'warn' },
        { when: '2026-09-29 02:50', stage: 'Suspicious purchases', detail: '23 purchases with BIN 454812 cards between 02:50 and 05:41', ref: 'ALM-FRA-0550', tone: 'crit' }
      ],
      forward: {
        title: 'Disputed or suspicious transactions',
        cols: [
          { key: 'when', label: 'Date and time' },
          { key: 'card', label: 'Card', mono: true },
          { key: 'amount', label: 'Amount' },
          { key: 'sca', label: 'Authentication' },
          { key: 'status', label: 'Status', chip: true }
        ],
        rows: [
          { when: '26/09 22:14', card: '454812······7731', amount: '189.90 €', sca: 'Acquirer TRA exemption', status: { status: 'open', label: 'Disputed' } },
          { when: '26/09 22:31', card: '454812······7731', amount: '204.60 €', sca: 'Acquirer TRA exemption', status: { status: 'open', label: 'Disputed' } },
          { when: '26/09 22:47', card: '454812······7731', amount: '217.90 €', sca: 'Acquirer TRA exemption', status: { status: 'open', label: 'Disputed' } },
          { when: '29/09 03:05', card: '454812······2290', amount: '312.40 €', sca: 'Acquirer TRA exemption', status: 'review' },
          { when: '29/09 03:52', card: '454812······4128', amount: '357.15 €', sca: 'Acquirer TRA exemption', status: 'blocked' },
          { when: '29/09 04:55', card: '454812······7190', amount: '357.15 €', sca: 'Acquirer TRA exemption', status: 'review' },
          { when: '29/09 02:50–05:41', card: '20 more cards', amount: '7,187.60 €', sca: 'Acquirer TRA exemption', status: 'review' }
        ],
        note: { title: 'Repeated pattern', body: 'The disputed purchases of 26/09 and tonight\'s share the average amount (≈ 350 €), the night-time window and the acquirer exemption.', icon: 'search' }
      },
      quality: [
        '30-day dispute ratio of 2.0% on transactions with Cierzo cards (network monitoring threshold: 0.9%).',
        'Tonight\'s 23 transactions fall within the preventive rule proposed in the alarm.'
      ],
      notes: [
        { title: 'Inform the acquirer', body: 'Propose to Pagos del Ebro, EP that the merchant\'s TRA exemption be withdrawn for as long as the attack lasts.', tone: 'warn', icon: 'send' }
      ]
    };

    const sac = {
      kind: 'Complaint case',
      title: 'Case SAC-2026-04187 · unrecognised charges',
      summary: [
        ['Customer', 'Lucía Ferrer Gil · retail customer since 2014'],
        ['Card', 'Tarjeta Cierzo Débito ····7731 (BIN 454812)'],
        ['Charges', '3 at TIENDAONLINE-ELEC · 612.40 €'],
        ['Received', '28/09/2026 09:14 · Banco Cierzo app'],
        ['Provisional refund', 'Decide before the end of 29/09/2026'],
        ['SAC reply', 'By 20/10/2026 (15 business days)'],
        ['Framework', 'PSD2 (RDL 19/2018, Art. 45) · Orden ECE/1263/2019 (Spanish rules on customer service departments)'],
        ['Status', 'Open · card blocked on 28/09']
      ],
      back: [
        { when: '2026-09-26 22:14', stage: 'First charge', detail: '189.90 € at TIENDAONLINE-ELEC without SCA', ref: 'Redsys', tone: 'warn' },
        { when: '2026-09-26 22:31', stage: 'Second charge', detail: '204.60 € at TIENDAONLINE-ELEC without SCA', ref: 'Redsys', tone: 'warn' },
        { when: '2026-09-26 22:47', stage: 'Third charge', detail: '217.90 € at TIENDAONLINE-ELEC without SCA', ref: 'Redsys', tone: 'warn' },
        { when: '2026-09-28 09:14', stage: 'Complaint', detail: 'The customer does not recognise the three charges; card ····7731 blocked from the app', ref: 'SAC-2026-04187', tone: 'crit' },
        { when: '2026-09-29 05:50', stage: 'Related attack', detail: 'The merchant appears again in the attack on BIN 454812 (23 transactions)', ref: 'ALM-FRA-0550', tone: 'crit' }
      ],
      forward: {
        title: 'Case steps',
        cols: [
          { key: 'step', label: 'Step' },
          { key: 'owner', label: 'Owner' },
          { key: 'due', label: 'Deadline' },
          { key: 'status', label: 'Status', chip: true }
        ],
        rows: [
          { step: 'Acknowledgement to the customer', owner: 'SAC', due: '28/09/2026', status: 'done' },
          { step: 'Block of card ····7731', owner: 'Customer (app)', due: '28/09/2026', status: 'done' },
          { step: 'Provisional refund decision (612.40 €)', owner: 'SAC and Fraud Prevention', due: '29/09/2026', status: 'pending' },
          { step: 'Chargeback to the acquirer (Visa, reason code 10.4)', owner: 'Payments', due: '26/10/2026', status: 'pending' },
          { step: 'Final reply', owner: 'SAC', due: '20/10/2026', status: 'pending' }
        ],
        note: { title: 'Reissue', body: 'New card on express reissue (delivery in 48 h).', icon: 'key' }
      },
      quality: [
        'The three purchases were authorised without strong customer authentication (acquirer transaction risk analysis exemption): the burden of proving authentication lies with the payment service provider.',
        'No sign of fraud by the customer: usual device and location in the app at the time of the charges.'
      ],
      notes: [
        { title: 'Today\'s deadline', body: 'PSD2 requires a refund by the end of the business day following notification unless there are reasonable grounds to suspect fraud, reported to the Banco de España.', tone: 'warn', icon: 'clock' }
      ]
    };

    return {
      '454812': bin,
      'BIN-454812': bin,
      'BIN 454812': bin,
      'CPP-2609-07': cpp,
      '334512987': cpp,
      'TIENDAONLINE-ELEC': merchant,
      'SAC-2026-04187': sac
    };
  })()
});
