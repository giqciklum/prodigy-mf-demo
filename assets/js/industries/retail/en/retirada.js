/*
 * Mercados Moncayo · mock recall of lot L26214 of Tomate frito Moncayo 400 g (own brand), English.
 * 4,800 jars received at the Plaza distribution centre → 4,320 shipped to 41 stores and 480 at the DC → 1,920
 * sold and 2,400 on shelf → 612 loyalty customers bought the lot. Notification of the Aragón and La Rioja
 * authorities, AESAN and the manufacturer. Same stores and figures as CN_DATA.trace['L26214'].
 * Synthetic demo data (MFM).
 */
(function () {
  'use strict';

  const LOT = 'L26214';
  /* [store, name, province, shipped, sold, on shelf, loyalty customers] */
  const STORES = [
    ['T-001', 'Zaragoza Centro', 'Zaragoza', 84, 29, 55, 8], ['T-003', 'Zaragoza Actur', 'Zaragoza', 120, 66, 54, 20],
    ['T-004', 'Zaragoza Las Fuentes', 'Zaragoza', 108, 39, 69, 12], ['T-006', 'Zaragoza San José', 'Zaragoza', 84, 27, 57, 9],
    ['T-008', 'Zaragoza Torrero', 'Zaragoza', 156, 80, 76, 26], ['T-011', 'Zaragoza Delicias', 'Zaragoza', 108, 72, 36, 23],
    ['T-012', 'Zaragoza Valdespartera', 'Zaragoza', 108, 53, 55, 17], ['T-013', 'Zaragoza Oliver', 'Zaragoza', 108, 61, 47, 20],
    ['T-014', 'Calatayud', 'Zaragoza', 108, 55, 53, 18], ['T-016', 'Ejea de los Caballeros', 'Zaragoza', 84, 33, 51, 11],
    ['T-017', 'Tarazona', 'Zaragoza', 84, 29, 55, 9], ['T-018', 'Caspe', 'Zaragoza', 120, 55, 65, 18],
    ['T-019', 'Utebo', 'Zaragoza', 72, 20, 52, 6], ['T-020', 'Cuarte de Huerva', 'Zaragoza', 96, 52, 44, 17],
    ['T-022', 'La Almunia de Doña Godina', 'Zaragoza', 120, 62, 58, 20], ['T-023', 'Alagón', 'Zaragoza', 132, 51, 81, 16],
    ['T-024', 'Borja', 'Zaragoza', 96, 50, 46, 16], ['T-025', 'Zuera', 'Zaragoza', 72, 20, 52, 6],
    ['T-027', 'Huesca Centro', 'Huesca', 84, 39, 45, 12], ['T-028', 'Huesca Santo Domingo', 'Huesca', 132, 73, 59, 23],
    ['T-030', 'Barbastro', 'Huesca', 120, 52, 68, 17], ['T-031', 'Monzón', 'Huesca', 108, 51, 57, 16],
    ['T-032', 'Fraga', 'Huesca', 108, 46, 62, 15], ['T-033', 'Jaca', 'Huesca', 84, 43, 41, 14],
    ['T-034', 'Sabiñánigo', 'Huesca', 96, 38, 58, 12], ['T-036', 'Binéfar', 'Huesca', 132, 72, 60, 23],
    ['T-038', 'Teruel Centro', 'Teruel', 72, 41, 31, 13], ['T-039', 'Teruel Ensanche', 'Teruel', 84, 34, 50, 11],
    ['T-040', 'Alcañiz', 'Teruel', 120, 62, 58, 20], ['T-041', 'Andorra', 'Teruel', 120, 52, 68, 17],
    ['T-043', 'Calamocha', 'Teruel', 72, 25, 47, 8], ['T-044', 'Logroño Cascajos', 'La Rioja', 96, 29, 67, 9],
    ['T-045', 'Logroño Centro', 'La Rioja', 144, 44, 100, 14], ['T-046', 'Logroño El Arco', 'La Rioja', 108, 56, 52, 18],
    ['T-047', 'Calahorra', 'La Rioja', 72, 23, 49, 7], ['T-048', 'Haro', 'La Rioja', 120, 47, 73, 15],
    ['T-050', 'Arnedo', 'La Rioja', 144, 64, 80, 20], ['T-051', 'Alfaro', 'La Rioja', 96, 38, 58, 12],
    ['T-052', 'Nájera', 'La Rioja', 144, 61, 83, 20], ['T-053', 'Santo Domingo de la Calzada', 'La Rioja', 72, 23, 49, 7],
    ['T-055', 'Lardero', 'La Rioja', 132, 53, 79, 17]
  ].map(([id, name, prov, served, sold, shelf, fid]) => ({ id, name, prov, served, sold, shelf, fid }));
  const UNSYNC = ['T-033', 'T-048', 'T-052'];
  const REPO = ['T-003', 'T-008', 'T-028', 'T-045']; /* today's 10:30 replenishment wave with 96 jars from the DC */

  const n0 = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const sum = (a, f) => a.reduce((s, x) => s + f(x), 0);
  const list = (a) => (a.length < 2 ? (a[0] || '') : `${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}`);
  const PROVS = ['Zaragoza', 'Huesca', 'Teruel', 'La Rioja'];
  const prov = PROVS.map((p) => { const s = STORES.filter((x) => x.prov === p); return { p, n: s.length, served: sum(s, (x) => x.served), sold: sum(s, (x) => x.sold), shelf: sum(s, (x) => x.shelf), fid: sum(s, (x) => x.fid) }; });
  const T = { served: sum(STORES, (x) => x.served), sold: sum(STORES, (x) => x.sold), shelf: sum(STORES, (x) => x.shelf), fid: sum(STORES, (x) => x.fid) };

  /* 612 loyalty customers (reproducible): 1,047 jars bought with a card */
  let seed = 26214;
  const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
  const INI = 'ABCDEGIJLMNOPRSTV';
  const LOYAL_UNITS = 1047;
  const loyal = [];
  let socio = 4100215;
  const APP = 'App notification';
  STORES.forEach((s) => {
    for (let i = 0; i < s.fid; i += 1) {
      socio += 1 + Math.floor(rnd() * 211);
      const r = rnd();
      const chan = r < 0.938 ? APP : r < 0.98 ? 'SMS' : 'Email';
      loyal.push({ socio: `Member ${socio}`, ini: `${INI[Math.floor(rnd() * INI.length)]}. ${INI[Math.floor(rnd() * INI.length)]}. ${INI[Math.floor(rnd() * INI.length)]}.`, store: `${s.id} ${s.name}`, prov: s.prov, units: 1, day: 6 + Math.floor(rnd() * 53), chan });
    }
  });
  for (let r = LOYAL_UNITS - loyal.length; r > 0;) { const c = loyal[Math.floor(rnd() * loyal.length)]; if (c.units < 4) { c.units += 1; r -= 1; } }
  const dayText = (d) => { const dt = new Date(Date.UTC(2026, 7, d)); return `${String(dt.getUTCDate()).padStart(2, '0')}/${String(dt.getUTCMonth() + 1).padStart(2, '0')}`; };
  loyal.forEach((c) => { c.last = `Last purchase ${dayText(c.day)}`; c.action = 'Recall notice and refund without receipt'; });
  const appN = loyal.filter((c) => c.chan === APP).length;
  const smsN = loyal.filter((c) => c.chan === 'SMS').length;
  const mailN = loyal.length - appN - smsN;

  /* ---------------------------------------------------------------- Notices */

  const LANG = 'Spanish (shown in English)';
  const LANG_META = 'Notice in Spanish';
  const sig = 'Yours faithfully,\nQuality · Mercados Moncayo\nPlaza distribution centre (Zaragoza)';
  const items = [
    {
      id: 'tiendas', label: '41 stores holding the lot', icon: 'building', notify: true,
      channel: 'Urgent ServiceNow task + Teams notice to the store manager',
      meta: ['Zaragoza 18 · Huesca 8 · Teruel 5 · La Rioja 10', `${n0(T.shelf)} jars on shelf`, LANG_META],
      body: `Remove the ${n0(T.shelf)} jars of the lot from the shelf and the store stockroom, block their sale at the POS, put up the recall notice and accept returns without a receipt. ${list(UNSYNC)} have had their POS out of sync since yesterday: manual block at the till.`,
      refs: `${LOT} · EAN 8437012300414`, qtyText: `${n0(T.shelf)} jars`, action: 'Removal from shelf and POS block',
      notice: {
        lang: LANG,
        headers: { From: 'Quality · Mercados Moncayo', To: 'Managers of 41 stores (ServiceNow and Teams)', Subject: `[MOCK RECALL] URGENT RECALL · Tomate frito Moncayo 400 g · lot ${LOT}` },
        subject: `[MOCK RECALL] URGENT RECALL · Tomate frito Moncayo 400 g · lot ${LOT}`,
        body: [
          'To: store manager',
          `Product: Tomate frito Moncayo 400 g (glass jar) · EAN 8437012300414\nLot: ${LOT} · best before 08/2028 (printed on the lid)\nOther lots of the same product: may continue to be sold.`,
          'What to do now (within 2 h):\n1. Remove all jars of the lot from the shelf and the store stockroom and place them in the blocked-product cage, labelled “RECALL · DO NOT SELL”.\n2. Check that the POS blocks the lot when scanned; if your POS is not synchronised, tell the tills so it is not sold.\n3. Put up the recall notice next to the shelf and at the entrance.\n4. Accept returns of the product, with or without a receipt, and refund the price.\n5. Record the units removed in the ServiceNow task.',
          'Reason: mock recall (PR-CAL-010). In a real recall, this section states the hazard (possible presence of glass fragments) and the instructions for consumers.',
          sig
        ].join('\n\n'),
        highlights: [LOT]
      }
    },
    {
      id: 'fidelizacion', label: '612 loyalty customers who bought the lot', icon: 'users', notify: true,
      channel: 'App notification + SMS + email',
      meta: [`${n0(appN)} by app · ${smsN} by SMS · ${mailN} by email`, '1,047 jars bought with a card', LANG_META],
      body: 'Personal notice to every member who bought the lot: do not consume, return for a refund at any store without a receipt. The CRM identifies the store and purchase date for each one.',
      refs: LOT, qtyText: '1,047 jars', action: 'Personal recall notice',
      notice: {
        lang: LANG,
        headers: { From: 'Mercados Moncayo', To: '612 members (CRM Fidelización)', Subject: `[MOCK RECALL] Important notice about a product you bought: Tomate frito Moncayo 400 g, lot ${LOT}` },
        subject: `[MOCK RECALL] Important notice about a product you bought: Tomate frito Moncayo 400 g, lot ${LOT}`,
        body: [
          'App notification and SMS:\n[MOCK RECALL] Mercados Moncayo: we are recalling Tomate frito Moncayo 400 g, lot L26214, which you bought on {date}. Please do not consume it. We will refund you at any store, no receipt needed.',
          'Email:\nHello {name},\n\nAccording to your Moncayo card, on {date} you bought Tomate frito Moncayo 400 g from lot L26214 at {store} (you will find it printed on the lid, with best before 08/2028).',
          'As a precaution, we are recalling this lot. Please do not consume it and return it to any of our stores: we will refund the price even if you do not have the receipt. Other lots of this product are not affected.',
          'Reason: mock recall (PR-CAL-010). In a real recall, this section states the hazard and what to do if the product has already been consumed.',
          'Thank you for your trust,\nMercados Moncayo · Consumer Care'
        ].join('\n\n'),
        highlights: [LOT]
      }
    },
    {
      id: 'consumidores', label: 'Consumers without a card', icon: 'user', notify: true,
      channel: 'In-store notice + website and social media',
      meta: ['873 jars sold to unidentified buyers', 'Public notice', LANG_META],
      body: 'Recall notice on the Mercados Moncayo website and social media and a notice in the 41 stores; wording agreed with the health authority.',
      refs: LOT, qtyText: '873 jars', action: 'Public recall notice',
      notice: {
        lang: LANG,
        headers: { From: 'Mercados Moncayo · Communications', To: 'Website, social media and in-store notice', Subject: `[MOCK RECALL] Recall of Tomate frito Moncayo 400 g, lot ${LOT}` },
        subject: `[MOCK RECALL] Recall of Tomate frito Moncayo 400 g, lot ${LOT}`,
        body: `PRODUCT RECALL NOTICE\n\nProduct: Tomate frito Moncayo (tomato sauce) · 400 g glass jar\nLot: ${LOT} · best before 08/2028\nEAN: 8437012300414\nSold in Mercados Moncayo stores in Zaragoza, Huesca, Teruel and La Rioja since 06/08/2026.\n\nIf you have this product, do not consume it. Return it to any Mercados Moncayo store and we will refund the price, even without a receipt. Other lots are not affected.\n\nReason: mock recall. In a real recall, the wording is agreed with the health authority and states the hazard.\n\nMercados Moncayo · Consumer Care`,
        highlights: [LOT]
      }
    },
    {
      id: 'aragon', label: 'Government of Aragón · Directorate-General for Public Health', icon: 'shield', notify: true,
      channel: 'Official email + alerts hotline (the authority notifies it via SCIRI)',
      meta: ['31 stores in Aragón', 'Competent authority', LANG_META],
      body: 'Notification of the recall (Regulation (EC) No 178/2002, Art. 19) with distribution by store, units sold and on shelf, and the actions taken; the regional authority forwards it to the rapid alert network (SCIRI).',
      refs: `${LOT} · RGSEAA 21.004512/Z`, qtyText: '3,192 jars shipped', action: 'Notification to the health authority',
      notice: {
        lang: LANG,
        headers: { From: 'Quality · Mercados Moncayo', To: 'Government of Aragón · Directorate-General for Public Health · Food alerts', Subject: `[MOCK RECALL] Recall notification · Tomate frito Moncayo 400 g · lot ${LOT}` },
        subject: `[MOCK RECALL] Recall notification · Tomate frito Moncayo 400 g · lot ${LOT}`,
        body: [
          'Dear Sir or Madam,',
          `In accordance with Article 19 of Regulation (EC) No 178/2002, we hereby notify you that we have started the recall of the product Tomate frito Moncayo 400 g (glass jar, EAN 8437012300414), lot ${LOT}, best before 08/2028, manufactured on 02/08/2026 by Conservas del Jalón, S.L. (Épila, RGSEAA 21.004512/Z) for our own brand.`,
          'Reason: a consumer complaint about a glass fragment in a jar (ATC-2026-0412, store T-011 Zaragoza Delicias). Investigation in progress with the manufacturer.',
          `Distribution in Aragón: 31 stores (Zaragoza 18, Huesca 8 and Teruel 5) · ${n0(prov[0].served + prov[1].served + prov[2].served)} jars shipped · ${n0(prov[0].sold + prov[1].sold + prov[2].sold)} sold · ${n0(prov[0].shelf + prov[1].shelf + prov[2].shelf)} on shelf. A list by store is attached.`,
          'Measures: removal from shelf and sales block at the POS, block on 480 jars at the distribution centre, notice to 612 loyalty customers and public notice in store and online.',
          'Reason: mock recall. Sample notification; in a real recall the authority’s form is used.',
          sig
        ].join('\n\n'),
        highlights: [LOT]
      }
    },
    {
      id: 'rioja', label: 'Government of La Rioja · Directorate-General for Public Health', icon: 'shield', notify: true,
      channel: 'Official email + alerts hotline (the authority notifies it via SCIRI)',
      meta: ['10 stores in La Rioja', 'Competent authority', LANG_META],
      body: `Same notification with the distribution in La Rioja: ${n0(prov[3].served)} jars shipped, ${n0(prov[3].sold)} sold and ${n0(prov[3].shelf)} on shelf.`,
      refs: LOT, qtyText: `${n0(prov[3].served)} jars shipped`, action: 'Notification to the health authority',
      notice: {
        lang: LANG,
        headers: { From: 'Quality · Mercados Moncayo', To: 'Government of La Rioja · Directorate-General for Public Health · Food alerts', Subject: `[MOCK RECALL] Recall notification · Tomate frito Moncayo 400 g · lot ${LOT}` },
        subject: `[MOCK RECALL] Recall notification · Tomate frito Moncayo 400 g · lot ${LOT}`,
        body: [
          'Dear Sir or Madam,',
          `In accordance with Article 19 of Regulation (EC) No 178/2002, we hereby notify you of the recall of lot ${LOT} of Tomate frito Moncayo 400 g (EAN 8437012300414), manufactured by Conservas del Jalón, S.L. (RGSEAA 21.004512/Z), owing to the possible presence of glass fragments.`,
          `Distribution in La Rioja: 10 stores · ${n0(prov[3].served)} jars shipped · ${n0(prov[3].sold)} sold · ${n0(prov[3].shelf)} on shelf. A list by store is attached. The main notification has been sent to the Aragón authority, where the distribution centre and the manufacturer are located.`,
          'Reason: mock recall. Sample notification.',
          sig
        ].join('\n\n'),
        highlights: [LOT]
      }
    },
    {
      id: 'aesan', label: 'AESAN · rapid alert network (SCIRI)', icon: 'globe', notify: true,
      channel: 'Email to the alert network (copy for information)',
      meta: ['Spanish Agency for Food Safety and Nutrition', 'The official notification is made by the regions', LANG_META],
      body: 'Copy for information of the notification to the regional authorities, so the alert network has the full distribution from the outset.',
      refs: LOT, qtyText: '4,800 jars', action: 'Copy for information to the alert network',
      notice: {
        lang: LANG,
        headers: { From: 'Quality · Mercados Moncayo', To: 'AESAN · Food alert network (SCIRI)', Subject: `[MOCK RECALL] Copy for information · recall of lot ${LOT} · Tomate frito Moncayo 400 g` },
        subject: `[MOCK RECALL] Copy for information · recall of lot ${LOT} · Tomate frito Moncayo 400 g`,
        body: `Please find attached a copy of the recall notification sent today to the health authorities of Aragón and La Rioja: lot ${LOT} of Tomate frito Moncayo 400 g (EAN 8437012300414), manufacturer Conservas del Jalón, S.L. (RGSEAA 21.004512/Z), possible presence of glass fragments. 4,800 jars received, 4,320 shipped to 41 stores in Aragón and La Rioja; no distribution outside these regions.\n\nReason: mock recall. Sample notification.\n\n${sig}`,
        highlights: [LOT]
      }
    },
    {
      id: 'fabricante', label: 'Conservas del Jalón, S.L. (manufacturer)', icon: 'factory', notify: true,
      channel: 'Supplier portal + call to their quality manager',
      meta: ['Épila (Zaragoza) · RGSEAA 21.004512/Z', 'Own-brand supplier', LANG_META],
      body: 'Recall of the lot, glass investigation (X-ray and in-line breakages on 02/08) and scope of lots L26215 to L26217 filled with the same TAR-2607-55 jars; 8D within 10 working days.',
      refs: `${LOT} · TAR-2607-55 · TOM-2607-18`, qtyText: '4,800 jars', action: 'Recall and 8D investigation',
      notice: {
        lang: LANG,
        headers: { From: 'Supplier Quality · Mercados Moncayo', To: 'Quality · Conservas del Jalón, S.L.', Subject: `[MOCK RECALL] Recall of lot ${LOT} · glass investigation · 8D request` },
        subject: `[MOCK RECALL] Recall of lot ${LOT} · glass investigation · 8D request`,
        body: [
          'Dear Quality team,',
          `We are starting the recall of your lot ${LOT} of Tomate frito Moncayo 400 g (OF CJ-26-0802-2, manufactured on 02/08/2026) following a consumer complaint about a glass fragment (ATC-2026-0412).`,
          'Please send us the preliminary investigation within 48 h:\n1. Jar breakage log for line 2 on 02/08 and the clean-down procedure applied.\n2. X-ray inspector rejects and verifications during the lot.\n3. Status of lots L26215, L26216 and L26217, filled with the same TAR-2607-55 jars from Vidriera del Ebro.\nAnd the 8D report within 10 working days (PR-PRO-006).',
          'We are keeping the complained-about jar and the fragment for analysis.',
          'Reason: mock recall. Sample message.',
          'Kind regards,\nSupplier Quality · Mercados Moncayo'
        ].join('\n\n'),
        highlights: [LOT, 'TAR-2607-55']
      }
    }
  ];

  /* ---------------------------------------------------------------- Genealogy */

  const nodes = [
    { id: 'TAR', stage: 'mp', kicker: 'Packaging', title: 'TAR-2607-55', mono: true, lot: 'TAR-2607-55', sub: '400 g glass jars', meta: 'Vidriera del Ebro · also in L26215–L26217', alert: 'Possible source of the glass', reveal: 1 },
    { id: 'TOM', stage: 'mp', kicker: 'Raw material', title: 'TOM-2607-18', mono: true, lot: 'TOM-2607-18', sub: 'Concentrated crushed tomato', meta: 'Agrícola Vega del Jalón · tanker', reveal: 1 },
    { id: 'L', stage: 'lote', kicker: 'Lot', title: LOT, mono: true, lot: LOT, sub: 'Tomate frito Moncayo 400 g', meta: 'Conservas del Jalón · 02/08 · OF CJ-26-0802-2', reveal: 1 },
    { id: 'R', stage: 'plat', kicker: 'Goods-in', title: 'REC-PLZ-26-08-0311', mono: true, sub: '05/08 07:20 · 4,800 jars', meta: '10 pallets · 14 broken, removed at the dock', reveal: 2 },
    { id: 'P', stage: 'plat', kicker: 'Distribution centre', title: '480 in P-12-04-2', sub: 'Not blocked', meta: '96 allocated to the 10:30 wave', alert: 'Hold the replenishment', alertTone: true, tone: 'planned', reveal: 2 }
  ];
  prov.forEach((p, i) => nodes.push({ id: `S${i}`, stage: 'tie', kicker: 'Stores', title: `${p.p} · ${p.n} stores`, sub: `${n0(p.served)} jars shipped`, meta: `${n0(p.sold)} sold · ${n0(p.shelf)} on shelf`, alert: p.p === 'Zaragoza' ? 'Includes T-011 (complaint)' : '', tone: 'shipped', reveal: 3 }));
  nodes.push(
    { id: 'V', stage: 'ven', kicker: 'Sales', title: `${n0(T.sold)} sold`, sub: `${n0(LOYAL_UNITS)} with a card · ${n0(T.sold - LOYAL_UNITS)} unidentified`, meta: 'Store POS', reveal: 4 },
    { id: 'LIN', stage: 'ven', kicker: 'In store', title: `${n0(T.shelf)} on shelf`, sub: 'Shelf and store stockroom', meta: `${UNSYNC.length} stores with POS out of sync`, alert: 'Remove and block at POS', tone: 'planned', reveal: 4 },
    { id: 'C1', stage: 'avi', kicker: 'Notice', title: '612 loyalty customers', sub: 'App, SMS and email', meta: 'Personal notice', tone: 'customer', reveal: 5 },
    { id: 'C2', stage: 'avi', kicker: 'Notice', title: 'Consumers without a card', sub: 'In-store notice, website and social media', meta: 'Public notice', tone: 'customer', reveal: 5 },
    { id: 'C3', stage: 'avi', kicker: 'Notice', title: 'Health authorities', sub: 'Aragón and La Rioja · AESAN', meta: 'Regulation (EC) No 178/2002', tone: 'customer', reveal: 5 },
    { id: 'C4', stage: 'avi', kicker: 'Notice', title: 'Conservas del Jalón', sub: 'Manufacturer', meta: 'Investigation and 8D', tone: 'customer', reveal: 5 }
  );
  const edges = [['TAR', 'L'], ['TOM', 'L'], ['L', 'R'], ['R', 'P']].concat(prov.map((p, i) => ['R', `S${i}`])).concat(prov.map((p, i) => [`S${i}`, 'V'])).concat(prov.map((p, i) => [`S${i}`, 'LIN']));
  edges.push(['V', 'C1'], ['V', 'C2'], ['LIN', 'C3'], ['P', 'C3'], ['L', 'C4']);

  /* ---------------------------------------------------------------- Tables */

  const storeRows = STORES.map((s) => ({
    store: s.id, name: s.name, prov: s.prov, served: s.served, sold: s.sold, shelf: s.shelf, fid: s.fid,
    estado: s.id === 'T-011' ? { status: 'critical', label: 'Complaint store' } : UNSYNC.includes(s.id) ? { status: 'warning', label: 'POS not synchronised' } : { status: 'pending', label: 'On shelf' },
    accion: UNSYNC.includes(s.id) ? 'Remove from shelf · manual block at the till' : REPO.includes(s.id) ? 'Remove from shelf · reject today’s replenishment' : 'Remove from shelf and block at POS'
  }));

  const locRows = [
    { ref: LOT, tag: true, where: 'DC · P-12-04-2', whereSub: '384 free · 96 allocated to today’s 10:30 replenishment wave', n: 1, qty: 480, action: 'Block in the WMS and hold the 10:30 wave', tone: 'crit' }
  ].concat(prov.map((p) => ({ ref: LOT, tag: true, where: `${p.p} stores`, whereSub: `${p.n} stores · ${n0(p.sold)} sold · ${p.fid} loyalty customers`, n: p.n, qty: p.shelf, action: 'Remove from shelf and block at POS', tone: 'warn' }))).concat([
    { ref: LOT, tag: true, where: 'Sold with a loyalty card', whereSub: '612 customers identified in the CRM', n: null, qty: LOYAL_UNITS, action: 'Personal notice and refund without receipt', tone: '' },
    { ref: LOT, tag: true, where: 'Sold to unidentified buyers', whereSub: 'Sales without a card', n: null, qty: T.sold - LOYAL_UNITS, action: 'Public notice in store, online and on social media', tone: '' }
  ]);

  const scope = {
    headline: 'Tomate frito Moncayo 400 g · EAN 8437012300414 · Conservas del Jalón, S.L. · manufactured on 02/08/2026',
    previewSide: '41 stores · 4,800 jars',
    startNode: 'L',
    stages: [
      { id: 'mp', label: 'Origin', icon: 'leaf' },
      { id: 'lote', label: 'Lot', icon: 'layers' },
      { id: 'plat', label: 'Distribution centre', icon: 'warehouse' },
      { id: 'tie', label: 'Stores', icon: 'building', count: 41 },
      { id: 'ven', label: 'Sales and shelf', icon: 'barcode' },
      { id: 'avi', label: 'Notices', icon: 'mail' }
    ],
    nodes,
    edges,
    systems: ['SAP S/4 Retail', 'WMS Manhattan', 'TPV tiendas', 'CRM Fidelización'],
    genSub: '1 goods receipt · 41 stores · 1,920 sold · 612 loyalty customers',
    steps: [
      { agent: 'trace', system: 'SAP S/4 Retail', action: 'Locates the starting point', result: 'Tomate frito Moncayo 400 g · EAN 8437012300414 · Conservas del Jalón, S.L. · manufactured on 02/08/2026', ms: 180, reveal: 0, mark: 'Starting point located' },
      { agent: 'trace', system: 'SAP S/4 Retail', action: 'Backwards: manufacturer, raw materials and packaging', result: 'Conservas del Jalón (RGSEAA 21.004512/Z) · OF CJ-26-0802-2 · tomato TOM-2607-18 · jars TAR-2607-55 (Vidriera del Ebro)', ms: 430, reveal: 1, mark: 'Backward trace complete' },
      { agent: 'trace', system: 'WMS Manhattan', action: 'DC goods-in and locations', result: 'REC-PLZ-26-08-0311 (05/08) · 10 pallets · 480 jars in P-12-04-2 not blocked · 96 allocated to today’s 10:30 wave', ms: 520, tone: 'warn', reveal: 2 },
      { agent: 'trace', system: 'WMS Manhattan', action: 'Shipments to stores', result: '4,320 jars to 41 stores: Zaragoza 18, Huesca 8, Teruel 5 and La Rioja 10', ms: 610, reveal: 3, mark: 'Stores identified' },
      { agent: 'trace', system: 'TPV tiendas', action: 'Sales and stock by store', result: `1,920 sold · 2,400 on shelf · ${list(UNSYNC)} with POS out of sync since yesterday`, ms: 680, tone: 'warn', reveal: 4, mark: 'Sales and shelf stock by store' },
      { agent: 'trace', system: 'CRM Fidelización', action: 'Buyers identified by loyalty card', result: `612 customers bought 1,047 jars · ${n0(appN)} with the app · ${smsN} SMS only · ${mailN} email only`, ms: 470, reveal: 5, mark: 'Loyalty customers identified' },
      { agent: 'trace', system: 'SAP S/4 Retail', action: 'Other lots with the same packaging or raw material', result: 'TAR-2607-55 also in L26215, L26216 and L26217; TOM-2607-18 in L26213 and L26215: out of scope until the manufacturer confirms the source of the glass', ms: 390, tone: 'warn' },
      { agent: 'bal', system: 'WMS Manhattan', action: 'Lot movements at the DC and in stores', result: '4,800 received · 4,320 shipped · 480 at the DC · 0 store write-offs recorded', ms: 410 },
      { agent: 'bal', system: 'Agentic Platform', action: 'Unit reconciliation: received, shipped, sold and on shelf', result: 'Reconciled 100.0 % · 0 jars unaccounted for · 41 of 41 stores located', ms: 90, tone: 'ok', mark: 'Unit reconciliation closed' },
      { agent: 'rec', system: 'ServiceNow', action: 'Opens the recall incident and one task per store', result: 'INC-RET-2026-0031 in draft · 41 store tasks not released', ms: 360 },
      { agent: 'rec', system: 'Outlook', action: 'Prepares the notices without sending them', result: '7 drafts: stores, 612 customers, public notice, Aragón, La Rioja, AESAN and manufacturer', ms: 640, mark: 'Record and notices prepared' }
    ],
    located: { label: 'Units located', value: '4,800 of 4,800', sub: '41 stores · 2,400 on shelf · 480 at the DC', icon: 'box', short: '4,800 of 4,800 jars located (1,920 sold, 2,400 on shelf in 41 stores and 480 at the DC)' },
    kpiNotify: { label: 'Recipients to notify', value: 7, sub: '41 stores · 612 customers · 2 regions · AESAN' },
    balance: {
      title: 'Unit balance',
      kpiLabel: 'Unit balance reconciled',
      sub: 'Jars in the lot from goods-in to consumer · movements in WMS Manhattan, sales at the POS, buyers in the CRM',
      head: 'Distribution centre',
      headSide: '3 flows · 41 stores',
      labels: { in: 'Received at the DC', losses: 'Write-offs recorded', out: 'Shipped to stores', stock: 'At the DC' },
      detailTitle: 'Detail by flow',
      criterio: 'Rule: any unexplained difference is shown as is, not spread across lines. The 14 jars broken at goods-in were removed at the dock and never booked into stock; every movement cites the system that records it.',
      reportText: 'Goods-in and shipments in WMS Manhattan; sales and stock by store at the POS; identified buyers in the loyalty CRM; product and supplier master data in SAP S/4 Retail.',
      flows: [
        {
          key: 'PLAT', seg: 'Distribution centre', main: true, unit: 'jars', colLabel: 'Jars',
          title: `Goods receipt REC-PLZ-26-08-0311 → lot ${LOT}`,
          inLabel: 'Received · REC-PLZ-26-08-0311', inSub: '05/08/2026 07:20 · 10 pallets of 480 · Conservas del Jalón', inStage: 'WMS', inQty: 4800,
          phases: [],
          outs: prov.map((p) => ({ label: `Shipped to ${p.p} stores`, sub: `${p.n} stores`, stage: 'WMS', qty: p.served })).concat([
            { label: 'At the DC · P-12-04-2', sub: '384 free · 96 allocated to the 10:30 wave', stage: 'WMS', qty: 480, kind: 'stock' }
          ])
        },
        {
          key: 'TIE', seg: 'Stores', unit: 'jars', colLabel: 'Jars',
          title: 'Jars shipped to 41 stores → sales and shelf',
          inLabel: 'Shipped to stores', inSub: '41 stores in Aragón and La Rioja', inStage: 'WMS', inQty: T.served,
          phases: [{ title: 'Store write-offs (breakages and out-of-date)', stages: [['TPV', 'No write-offs recorded for this lot', 0]] }],
          outs: [
            { label: 'Sold', sub: 'POS sales from 06/08 to 28/09', stage: 'TPV', qty: T.sold },
            { label: 'On shelf and in store stockroom', sub: 'POS stock at yesterday’s close', stage: 'TPV', qty: T.shelf, kind: 'stock' }
          ]
        },
        {
          key: 'VEN', seg: 'Sales', unit: 'jars', colLabel: 'Jars',
          title: 'Jars sold → buyers',
          inLabel: 'Sold', inSub: '41 stores', inStage: 'TPV', inQty: T.sold,
          phases: [],
          outs: [
            { label: 'Bought with a loyalty card', sub: '612 customers identified', stage: 'CRM', qty: LOYAL_UNITS },
            { label: 'Bought by unidentified buyers', sub: 'Public notice', stage: 'TPV', qty: T.sold - LOYAL_UNITS }
          ]
        }
      ],
      product: {
        title: 'Distribution by province',
        side: '4,320 shipped · 1,920 sold · 2,400 on shelf',
        cols: [
          { label: 'Province', key: 'p', strong: true, sub: 'nTxt' },
          { label: 'Shipped', key: 'served', num: true },
          { label: 'Sold', key: 'sold', num: true },
          { label: 'On shelf', key: 'shelf', num: true },
          { label: 'Loyalty cust.', key: 'fid', num: true },
          { label: 'Located', key: 'located', num: true, ok: true }
        ],
        rows: prov.map((p) => Object.assign({}, p, { nTxt: `${p.n} stores`, located: '100.0 %' }))
      }
    },
    units: {
      title: 'Stores and units',
      sub: '41 stores · 4,320 jars shipped · WMS Manhattan, POS and loyalty CRM',
      icon: 'building',
      csvLabel: 'Stores (CSV)',
      csvName: 'stores',
      byLoc: { label: 'By location', refLabel: 'Lot', whereLabel: 'Location', nLabel: 'Stores', qtyLabel: 'Jars', rows: locRows },
      list: {
        label: 'Stores',
        cols: [
          { label: 'Store', key: 'store', mono: true, sub: 'name' },
          { label: 'Province', key: 'prov' },
          { label: 'Shipped', key: 'served', num: true },
          { label: 'Sold', key: 'sold', num: true },
          { label: 'On shelf', key: 'shelf', num: true },
          { label: 'Loyalty cust.', key: 'fid', num: true },
          { label: 'Status', key: 'estado', chip: true },
          { label: 'Action in a real recall', key: 'accion' }
        ],
        rows: storeRows
      },
      extra: {
        id: 'socios',
        label: 'Loyalty customers',
        note: '612 members who bought the lot, with the store, the jars and the notification channel (pseudonymised data).',
        cols: [
          { label: 'Member', key: 'socio', mono: true, sub: 'ini' },
          { label: 'Store', key: 'store', sub: 'prov' },
          { label: 'Jars', key: 'units', num: true, sub: 'last' },
          { label: 'Notification channel', key: 'chan' },
          { label: 'Action in a real recall', key: 'action' }
        ],
        rows: loyal
      }
    },
    customers: {
      title: 'Recipients to notify',
      sub: '41 stores · 612 loyalty customers · public notice · 2 regional authorities · AESAN · manufacturer',
      items,
      holdsTitle: 'Actions at the DC and in stores',
      holdsIcon: 'warehouse',
      holds: [
        { icon: 'warehouse', tone: 'crit', title: 'Hold the 10:30 replenishment wave', meta: ['today at 10:30', '96 jars from P-12-04-2', list(REPO)], body: 'In a real recall, the DC manager blocks location P-12-04-2 in the WMS: the 480 jars stay put and the wave is rescheduled with another lot.' },
        { icon: 'barcode', tone: 'warn', title: `Manual till block at ${list(UNSYNC)}`, meta: ['POS out of sync since yesterday', `${STORES.filter((s) => UNSYNC.includes(s.id)).reduce((a, s) => a + s.shelf, 0)} jars on shelf`], body: 'The lot-level sales block does not reach these tills until they synchronise: the store manager removes the product and alerts the tills. Full store list in the “Stores” tab and the CSV.' }
      ]
    },
    approval: {
      titlePrefix: 'Lot recall and mock-recall notices',
      scope: [
        { label: 'Stores that would remove the lot', value: '41 stores · 2,400 jars on shelf', status: 'pending', chip: '41' },
        { label: 'Loyalty customers', value: '612 customers · 1,047 jars (app, SMS and email)', status: 'pending', chip: '612' },
        { label: 'Distribution centre', value: '480 jars in P-12-04-2 · 10:30 wave', status: 'evaluate', chip: 'No block in a mock recall' },
        { label: 'Authorities', value: 'Aragón and La Rioja (SCIRI) · copy to AESAN' },
        { label: 'Manufacturer', value: 'Conservas del Jalón · investigation and 8D' }
      ],
      effects: [
        'Outlook and CRM Fidelización: 7 notices saved as drafts marked MOCK RECALL; no notification is sent',
        'ServiceNow: incident INC-RET-2026-0031 and 41 store tasks in draft, not released',
        'WMS Manhattan and POS: unchanged; a mock recall blocks neither stock nor sales',
        'Record {code} approved with the time taken for each activity'
      ]
    },
    report: {
      objeto: 'Mock recall starting from {label}. Traceability is checked backwards (manufacturer, raw material and packaging) and forwards (distribution centre, 41 stores, sales, shelf stock and loyalty customers), with the unit balance.',
      noAction: 'The exercise blocks neither stock nor sales and sends no notices.',
      results: [
        '41 stores would remove 2,400 jars from the shelf; 612 loyalty customers would receive a personal notice and 873 jars sold to unidentified buyers require a public notice.',
        'The 480 jars at the DC would be blocked and the 10:30 replenishment wave held; 3 stores with POS out of sync need a manual block at the till.',
        'Notification to the Aragón and La Rioja authorities (Art. 19 of Regulation (EC) No 178/2002) with a copy to AESAN.'
      ],
      back: {
        cols: [{ label: 'Stage', key: 'etapa' }, { label: 'Reference', key: 'ref', mono: true }, { label: 'Date', key: 'fecha' }, { label: 'Detail', key: 'det' }],
        rows: [
          { etapa: 'Packaging', ref: 'TAR-2607-55', fecha: '24/07/2026', det: 'Vidriera del Ebro, S.A. · 400 g jars, TO 66 finish · also in L26215–L26217' },
          { etapa: 'Raw material', ref: 'TOM-2607-18', fecha: '30/07/2026', det: 'Concentrated crushed tomato · Agrícola Vega del Jalón · by tanker' },
          { etapa: 'Manufacture', ref: 'OF CJ-26-0802-2', fecha: '02/08/2026', det: 'Conservas del Jalón (Épila) · line 2 · hot filling, sterilisation and X-ray inspection' },
          { etapa: 'Lot', ref: LOT, fecha: '02/08/2026', det: 'Tomate frito Moncayo 400 g · EAN 8437012300414 · best before 08/2028' },
          { etapa: 'Goods-in', ref: 'REC-PLZ-26-08-0311', fecha: '05/08/2026 07:20', det: '10 pallets of 480 jars · 14 broken jars removed at the dock' }
        ]
      },
      fwd: {
        cols: [{ label: 'Store', key: 'store', mono: true }, { label: 'Name', key: 'name' }, { label: 'Province', key: 'prov' }, { label: 'Shipped', key: 'served', num: true }, { label: 'Sold', key: 'sold', num: true }, { label: 'On shelf', key: 'shelf', num: true }, { label: 'Loyalty cust.', key: 'fid', num: true }],
        rows: storeRows
      },
      conclusion: 'Conclusion: the information needed to recall the lot is obtained in full and reconciles jar by jar, from the distribution centre to the consumer. Proposed improvements: force POS synchronisation before a sales block and agree a recall notification template with the authorities.',
      note: 'Mock recall: no stock has been blocked in the WMS, no sale blocked at the POS and no notice sent. Synthetic demo data.'
    },
    audit: { back: 'Conservas del Jalón · OF CJ-26-0802-2 · TOM-2607-18 · TAR-2607-55', fwd: '41 stores · 1,920 sold · 2,400 on shelf · 612 loyalty customers · 480 at the DC' },
    say: [
      'The actionable part: 2,400 jars would come off the shelves of 41 stores, the 480 at the DC would be blocked and the 10:30 wave held; three stores with POS out of sync need a manual block.',
      'Each recipient gets their notice through their own channel: tasks for the stores, app and SMS for 612 members, a public notice, notification to Aragón and La Rioja with a copy to AESAN, and an 8D for the manufacturer. In a mock recall nothing is sent. Quality decides.'
    ]
  };

  agenticPackEn('retail', {
    retirada: {
      title: 'Mock recall',
      nav: 'Mock recall',
      section: 'Calidad',
      desc: 'Traceability and recall exercise for an own-brand lot: backward and forward genealogy, from raw material to the distribution centre, each store and each loyalty customer, unit balance and recipients to notify, starting from a lot or a goods receipt.',
      place: 'Plaza distribution centre',
      approver: 'Head of Quality',
      regPrefix: 'SR-2026-',
      agents: { trace: 'Traceability', bal: 'Unit balance', rec: 'Record and notices' },
      targetText: 'Illustrative target: 4 h',
      todayEstimate: '3–6 h',
      timerRef: 'Demo target: 4 h',
      packLabel: 'Download recall pack',
      setup: { title: 'Starting point', sub: 'A product lot or a goods receipt at the distribution centre' },
      modes: {
        lote: { label: 'Lot', noun: 'the lot', field: 'Lot code', icon: 'layers', format: 'L26214', where: 'SAP S/4 Retail and WMS Manhattan' },
        recepcion: { label: 'Goods receipt', noun: 'the goods receipt', field: 'Goods receipt code', icon: 'warehouse', format: 'REC-PLZ-26-08-0311', where: 'WMS Manhattan' }
      },
      entries: [
        { mode: 'lote', code: LOT, scope: 'l26214', label: `Lot ${LOT}`, option: 'Tomate frito Moncayo 400 g · Conservas del Jalón' },
        { mode: 'recepcion', code: 'REC-PLZ-26-08-0311', scope: 'l26214', label: 'Goods receipt REC-PLZ-26-08-0311', option: '05/08/2026 · 10 pallets · Conservas del Jalón', headline: `Goods receipt of 05/08/2026 at the Plaza distribution centre · 10 pallets of lot ${LOT} from Conservas del Jalón`, startNode: 'R', startResult: `Goods receipt of 05/08/2026 · 10 pallets of Tomate frito Moncayo 400 g, lot ${LOT} → the whole lot is traced` }
      ],
      examples: [
        { mode: 'lote', code: LOT, label: `Lot ${LOT}` },
        { mode: 'recepcion', code: 'REC-PLZ-26-08-0311', label: 'Goods receipt REC-PLZ-26-08-0311' }
      ],
      reference: {
        title: 'Audit reference',
        sub: 'Exercise target; Quality confirms the requirements of its certifications and the health authority',
        items: [
          ['Regulation (EC) No 178/2002', 'Arts. 18 and 19: one step back, one step forward traceability; if a food is unsafe, the operator withdraws it, informs the competent authority and, if it has reached the consumer, informs them.'],
          ['SCIRI and AESAN', 'The regional authority forwards the alert to the Spanish food rapid alert network (SCIRI) and, where appropriate, to the European RASFF network.'],
          ['IFS Logistics v3 and IFS Food', 'Traceability and recall test at least once a year. Illustrative target for the exercise: 4 hours.']
        ],
        note: 'A mock recall blocks neither stock nor sales and sends no notices: it measures whether the information is obtained in full, reconciles and is on time.'
      },
      legend: { planned: 'Hold or remove', click: 'Click a lot to see its full trace' },
      notice: { title: 'Mock recall', approved: 'Saved as a draft marked MOCK RECALL: no notification is sent.' },
      approval: { policy: 'PR-CAL-010 · removing a lot from the shelf or blocking its sale requires Quality approval', approveLabel: 'Approve and close mock recall', rejectPlaceholder: 'For example: the public notice wording has not yet been agreed with the health authority' },
      clock: { title: 'Stopwatch against audit target', sub: 'Simulation timings; not system performance measurements' },
      report: { subtitle: 'Record of the traceability and recall exercise · Regulation (EC) No 178/2002 · IFS Logistics', approvedText: 'Notices saved as drafts marked MOCK RECALL; none has been sent and no sale has been blocked.' },
      compare: {
        rows: [
          { k: 'People involved', today: '4–5: Quality, DC, area managers, Consumer Care and Communications', agentic: '1: {approver} reviews and approves' },
          { k: 'Systems consulted', today: '5–6 opened by hand: SAP, WMS, POS reports, CRM, spreadsheets and email', agentic: '6 connectors queried by the agents: SAP S/4 Retail, WMS Manhattan, POS, loyalty CRM, ServiceNow and Outlook' },
          { k: 'Steps', today: '15–20 queries, per-store extracts and member lists', agentic: '{steps} automatic steps and 1 approval' },
          { k: 'Unit balance', today: 'Spreadsheet with receipts, shipments and sales', agentic: 'Calculated by flow: {reconciled} reconciled' }
        ]
      },
      presenter: {
        idle: [
          'Mock recall of the tomato sauce lot with the glass: from raw material to every store and every member.',
          'Choose the starting point: lot L26214 or the goods receipt at the distribution centre.',
          'Agentic Platform works through SAP, the WMS, the POS and the CRM: DC, 41 stores, sales, shelf stock and the 612 loyalty customers, and reconciles the 4,800 jars.'
        ],
        nextIdle: 'Click “Start exercise” with lot L26214 (or choose “Goods receipt REC-PLZ-26-08-0311”).',
        nextRun: 'Click “View notification” for the 612 customers or the Government of Aragón, then “Approve and close mock recall”.',
        nextDone: '“Download recall pack”: store CSV and printable record. Then “Customer questionnaire” (right arrow).'
      },
      scopes: { l26214: scope }
    }
  });
})();
