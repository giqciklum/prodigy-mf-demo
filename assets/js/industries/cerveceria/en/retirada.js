/*
 * Cervecera Bardenas · recall drill for keg batch L2608-K14 (Bardenas Lager, 30 l keg), English.
 * Backwards: malt MAL-2607-05, hops LUP-2606-11, CO₂ CO2-2608-02 → fermentation batch L2607-FV05 → BBT-2.
 * Forwards: 1,040 kegs filled on LLB-1 on 18/08/2026 → 912 dispatched to 14 customers, 96 in cold store CB-03
 * and 32 on quality hold (RET-Q). Same customers, delivery notes and references as CN_DATA.trace and complaint
 * REC-2026-0093. Synthetic demo data (MFM).
 */
(function () {
  'use strict';

  const LOT = 'L2608-K14';
  const PER_PALLET = 8;
  const L_PER_KEG = 30;

  /* Customers of the batch (same as CN_DATA.trace): [id, customer, type, town, region, kegs, dispatch, delivery note, contact] */
  const CUSTOMERS = [
    ['dhr', 'Distribuciones Hosteleras Ribera, S.L.', 'Distributor', 'Tudela', 'Navarre', 168, '2026-08-20', 'ALB-26-08-2211', 'Marisa Garbayo · Quality'],
    ['bed', 'Bebidas Ebro Distribución, S.L.', 'Distributor', 'Zaragoza', 'Aragon', 142, '2026-08-20', 'ALB-26-08-2214', 'Quality and purchasing'],
    ['dch', 'Distribuciones Cierzo Hostelería, S.A.', 'Distributor', 'Pamplona', 'Navarre', 96, '2026-08-21', 'ALB-26-08-2230', 'Warehouse management'],
    ['crb', 'Comercial Rioja Baja, S.L.', 'Distributor', 'Calahorra', 'La Rioja', 74, '2026-08-21', 'ALB-26-08-2233', 'Management'],
    ['bbl', 'Bebidas Bardenas Logroño, S.L.', 'Distributor', 'Logroño', 'La Rioja', 66, '2026-08-24', 'ALB-26-08-2290', 'Quality'],
    ['cda', 'Club Deportivo Arenas', 'Events', 'Logroño', 'La Rioja', 60, '2026-08-25', 'ALB-26-08-2302', 'Hospitality manager'],
    ['hmd', 'Hostelería Moncayo Distribución, S.L.', 'Distributor', 'Tarazona', 'Aragon', 58, '2026-08-25', 'ALB-26-08-2305', 'Warehouse'],
    ['gbp', 'Grupo Bares Plaza, S.L.', 'On-trade (chain)', 'Zaragoza', 'Aragon', 52, '2026-08-26', 'ALB-26-08-2318', 'Purchasing and operations'],
    ['dar', 'Distribuciones Arga, S.L.', 'Distributor', 'Estella', 'Navarre', 48, '2026-08-27', 'ALB-26-08-2340', 'Management'],
    ['dtb', 'Distribuidora Tudelana de Bebidas, S.L.', 'Distributor', 'Tudela', 'Navarre', 40, '2026-08-27', 'ALB-26-08-2342', 'Warehouse'],
    ['cnv', 'Catering Navarro, S.L.', 'Catering', 'Pamplona', 'Navarre', 36, '2026-08-28', 'ALB-26-08-2361', 'Head chef'],
    ['ett', 'Cervecería El Tubo', 'On-trade', 'Zaragoza', 'Aragon', 30, '2026-08-31', 'ALB-26-08-2398', 'Manager'],
    ['rlr', 'Restaurantes La Ribera, S.L.', 'On-trade', 'Tudela', 'Navarre', 24, '2026-09-01', 'ALB-26-09-0012', 'Management'],
    ['htr', 'Hotel Tres Reyes', 'On-trade', 'Pamplona', 'Navarre', 18, '2026-09-02', 'ALB-26-09-0031', 'Food and beverage management']
  ].map(([id, label, kind, city, region, kegs, date, alb, contact]) => ({ id, label, kind, city, region, kegs, date, alb, contact, dist: kind === 'Distributor' }));
  const CUST = {};
  CUSTOMERS.forEach((c) => { CUST[c.id] = c; });

  /* Today's order served from CB-03 with kegs from the batch */
  const PLANNED = { cust: 'gbp', kegs: 24, order: 'PV-26-09-1187', ship: 'EXP-26-09-0412', when: 'today at 12:00', dock: 'bay 1' };
  const STOCK_FREE = 72;
  const HELD = 32;

  const fmtD = (iso) => (iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}` : '');
  const dm = (iso) => (iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}` : '');
  const n0 = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const hl = (kegs) => (kegs * L_PER_KEG / 100).toFixed(1).replace(/\.0$/, '');
  const plural = (n, a, b) => `${n0(n)} ${n === 1 ? a : b}`;
  const list = (a) => (a.length < 2 ? (a[0] || '') : `${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}`);
  const sum = (a, f) => a.reduce((s, x) => s + f(x), 0);
  const SHIPPED = sum(CUSTOMERS, (c) => c.kegs);
  const FILLED = SHIPPED + STOCK_FREE + PLANNED.kegs + HELD;
  const REGIONS = ['Navarre', 'Aragon', 'La Rioja'];

  /* ---------------------------------------------------------------- Pallets (SSCC) */

  const sscc = (seq) => {
    const body = `38437099026${String(seq).padStart(6, '0')}`;
    let s = 0;
    for (let i = 0; i < body.length; i += 1) s += Number(body[body.length - 1 - i]) * (i % 2 === 0 ? 3 : 1);
    return `${body}${(10 - (s % 10)) % 10}`;
  };
  const PALLETS = [];
  let seq = 104210;
  let minute = 6 * 60 + 4;
  function addPallets(kegs, info) {
    let left = kegs;
    while (left > 0) {
      const k = Math.min(PER_PALLET, left);
      left -= k;
      const hh = String(Math.floor(minute / 60)).padStart(2, '0');
      const mm = String(minute % 60).padStart(2, '0');
      PALLETS.push(Object.assign({ sscc: sscc(seq), kegs: k, filled: `18/08 ${hh}:${mm}` }, info));
      seq += 1;
      minute += 4;
    }
  }
  CUSTOMERS.forEach((c) => addPallets(c.kegs, { status: 'exp', cust: c.id, where: `${c.label}`, whereSub: `${c.city} · ${c.region}`, ship: c.alb, date: fmtD(c.date) }));
  addPallets(PLANNED.kegs, { status: 'plan', cust: PLANNED.cust, where: 'Cold store CB-03 · reserved', whereSub: `${PLANNED.order} · ${PLANNED.ship} · ${PLANNED.when}`, ship: PLANNED.ship, date: 'Due today 12:00' });
  addPallets(STOCK_FREE, { status: 'stock', where: 'Keg cold store CB-03', whereSub: 'WMS Mecalux · available for dispatch', ship: '—', date: '—' });
  addPallets(HELD, { status: 'held', where: 'Hold area RET-Q', whereSub: 'On quality hold · O₂ check (DES-2026-0077)', ship: '—', date: '—' });

  const palletChip = (p) => (p.cust === 'dhr' ? { status: 'critical', label: 'Complaint REC-2026-0093' } : p.status === 'exp' ? { status: 'shipped', label: 'Dispatched' } : p.status === 'plan' ? { status: 'pending', label: 'Today\'s dispatch' } : p.status === 'stock' ? { status: 'pending', label: 'Not blocked' } : { status: 'hold', label: 'On hold' });
  const palletAction = (p) => (p.status === 'exp' ? (CUST[p.cust].dist ? 'Notify the distributor, withdraw from its bars and collect' : 'Notify the customer, stop serving and collect') : p.status === 'plan' ? `Hold ${PLANNED.ship} and serve from another batch` : p.status === 'stock' ? 'Block in WMS Mecalux and SAP (blocked stock)' : 'Keep on hold and analyse O₂ and tasting');
  const palletRows = PALLETS.map((p) => ({
    sscc: p.sscc,
    filled: p.filled,
    kegs: p.kegs,
    hl: hl(p.kegs),
    where: p.where,
    whereSub: p.whereSub,
    ship: p.ship,
    date: p.date,
    estado: palletChip(p),
    accion: palletAction(p)
  }));

  /* ---------------------------------------------------------------- Notices */

  function noticeOf(c) {
    const planned = c.id === PLANNED.cust;
    const subj = `[DRILL] Recall of batch ${LOT} · Bardenas Lager 30 l keg · ${plural(c.kegs, 'keg', 'kegs')}`;
    const parts = [
      `Dear ${c.label} team (${c.contact.toLowerCase()}),`,
      'We are writing to inform you of the voluntary market withdrawal of the following Cervecera Bardenas batch:',
      [
        'Product: Bardenas Lager · 30 l KeyKeg',
        `Batch: ${LOT} · packaged on 18/08/2026 · best before 18/02/2027`,
        `Supplied: ${plural(c.kegs, 'keg', 'kegs')} (${hl(c.kegs)} hl) · delivery note ${c.alb} of ${fmtD(c.date)}`
      ].join('\n'),
      'Reason: quality defect (cardboard flavour due to oxidation). There is no health risk.',
      c.dist
        ? 'Please stop serving the batch, pass this notice on to the outlets you have supplied with kegs from the batch and set those kegs aside untapped. Our delivery route will collect them and replace them with beer from another batch within 48 h, crediting the kegs and the carriage.'
        : 'Please do not tap any unopened kegs from the batch and set them aside. Our delivery route will collect them and replace them with beer from another batch within 48 h, crediting the kegs.'
    ];
    if (c.id === 'dhr') parts.push('This notice also responds to your complaint INC-DHR-26-047 (our reference REC-2026-0093): it covers the 124 kegs served to your 37 bars and the 44 set aside in your warehouse.');
    if (planned) parts.push(`Your order ${PLANNED.order}, due to leave ${PLANNED.when}, will be served with kegs from another batch: the ${PLANNED.kegs} kegs from batch ${LOT} reserved for it are being held at our premises.`);
    parts.push('Reason for sending: recall drill (procedure PR-CAL-006). In a real recall, the final instructions agreed by Quality would be given here.');
    parts.push('Kind regards,\nQuality · Cervecera Bardenas\nArguedas Brewery');
    return {
      lang: 'English',
      headers: { From: 'Quality, Cervecera Bardenas', To: `${c.contact.split(' · ').pop()} · ${c.label}`, Subject: subj },
      subject: subj,
      body: parts.join('\n\n'),
      highlights: [LOT, c.alb].concat(planned ? [PLANNED.ship] : [])
    };
  }

  const items = CUSTOMERS.map((c) => {
    const pals = PALLETS.filter((p) => p.cust === c.id && p.status === 'exp').length;
    const body = [`${plural(c.kegs, 'keg', 'kegs')} (${hl(c.kegs)} hl, ${plural(pals, 'pallet', 'pallets')}) dispatched on ${dm(c.date)} with ${c.alb}.`];
    if (c.dist) body.push('Distributor: passes the notice on to its bars.');
    if (c.id === 'dhr') body.push('Complaint REC-2026-0093: 124 kegs in 37 bars and 44 set aside in its warehouse.');
    if (c.id === PLANNED.cust) body.push(`Order ${PLANNED.order}: ${PLANNED.kegs} kegs from the batch reserved for ${PLANNED.ship}, ${PLANNED.when}: hold.`);
    return {
      id: c.id,
      label: c.label,
      icon: c.dist ? 'truck' : 'building',
      notify: true,
      channel: c.dist ? 'Email + call from the sales rep' : 'Email + call from the sales rep (direct customer)',
      meta: [`${c.city} · ${c.region}`, c.kind, 'Notice in English'],
      body: body.join(' '),
      notice: noticeOf(c),
      refs: `${c.alb}${c.id === PLANNED.cust ? ` · ${PLANNED.ship}` : ''}`,
      qtyText: plural(c.kegs, 'keg', 'kegs'),
      action: `Withdrawal and replacement${c.dist ? ' (including its bars)' : ''}${c.id === PLANNED.cust ? ' and hold on today\'s order' : ''}`
    };
  });
  items.push({
    id: 'mantenimiento',
    label: 'Maintenance · keg filler LLB-1',
    icon: 'wrench',
    notify: false,
    chip: 'Internal',
    channel: 'Work order in GMAO Maximo + notice in Teams',
    meta: ['Arguedas Brewery', 'OT-2026-05210 postponed to 06/10', 'NC-2026-0142'],
    body: 'Bring forward the preventive maintenance of the seals and purge valve on the LLB-1 filling heads and measure the O₂ of each head before the next keg run.',
    refs: 'OT-2026-05210 · NC-2026-0142',
    qtyText: '1 filler',
    action: 'Bring forward LLB-1 preventive maintenance'
  });
  items.push({
    id: 'autoridad',
    label: 'Instituto de Salud Pública y Laboral de Navarra',
    icon: 'shield',
    notify: false,
    chip: 'Only if there is a risk',
    channel: 'Official food alert email',
    meta: ['Competent authority for the brewery', 'APPCC-01'],
    body: 'Oxidation is a quality defect with no health risk: the withdrawal is commercial and voluntary. The authority would only be notified if the analyses pointed to a health risk (Regulation (EC) No 178/2002, Article 19).',
    refs: LOT,
    qtyText: plural(FILLED, 'keg', 'kegs'),
    action: 'Assess notification (not required for now)'
  });

  /* ---------------------------------------------------------------- Genealogy */

  const WAVES = [
    { id: 'X1', label: '20–21/08', from: '2026-08-20', to: '2026-08-21' },
    { id: 'X2', label: '24–28/08', from: '2026-08-24', to: '2026-08-28' },
    { id: 'X3', label: '31/08–02/09', from: '2026-08-31', to: '2026-09-02' }
  ];
  const waveOf = (c) => WAVES.find((w) => c.date >= w.from && c.date <= w.to);
  const waveCust = (w) => CUSTOMERS.filter((c) => waveOf(c) === w);
  const nodes = [
    { id: 'MAL', stage: 'mp', kicker: 'Malt', title: 'MAL-2607-05', mono: true, lot: 'MAL-2607-05', sub: 'Pilsner malt · Maltas de Castilla', meta: '7,680 kg in this batch', reveal: 1 },
    { id: 'LUP', stage: 'mp', kicker: 'Hops', title: 'LUP-2606-11', mono: true, lot: 'LUP-2606-11', sub: 'Nugget T90 · Lúpulos del Órbigo', meta: '24 kg in this batch', reveal: 1 },
    { id: 'CO2', stage: 'mp', kicker: 'CO₂', title: 'CO2-2608-02', mono: true, lot: 'CO2-2608-02', sub: 'Recovered from fermentation', meta: 'Purity 99.99%', reveal: 1 },
    { id: 'FV', stage: 'fer', kicker: 'Fermentation', title: 'L2607-FV05', mono: true, lot: 'L2607-FV05', sub: '480 hl · FV-05 · 21/07', meta: 'Filtered to BBT-2 on 14/08 · O₂ 22 ppb', reveal: 1 },
    { id: 'B21', stage: 'fer', kicker: 'Same beer', title: 'L2608-B21', mono: true, sub: '33 cl bottle · 158 hl', meta: 'O₂ 35 ppb · tasting conforming', tone: 'customer', reveal: 2 },
    { id: 'K', stage: 'env', kicker: 'Keg batch', title: LOT, mono: true, lot: LOT, sub: `${n0(FILLED)} kegs · LLB-1 · 18/08`, meta: 'Average O₂ 64 ppb · DES-2026-0077', alert: 'Filling head 3 at 91 ppb', alertTone: true, reveal: 2 },
    { id: 'XP', stage: 'alm', kicker: 'Dispatched', title: `${n0(SHIPPED)} kegs`, sub: `${CUSTOMERS.length} customers · ${n0(PALLETS.filter((p) => p.status === 'exp').length)} pallets`, meta: '20/08 to 02/09', tone: 'shipped', reveal: 3 },
    { id: 'CB', stage: 'alm', kicker: 'Cold store CB-03', title: `${STOCK_FREE + PLANNED.kegs} in warehouse`, sub: `${PLANNED.kegs} reserved for ${PLANNED.ship}`, meta: `${PLANNED.when} · ${PLANNED.dock}`, alert: 'Hold the dispatch', alertTone: true, tone: 'planned', reveal: 3 },
    { id: 'RQ', stage: 'alm', kicker: 'On hold', title: `${HELD} in RET-Q`, sub: 'On quality hold', meta: 'O₂ check at filling', tone: 'stock', reveal: 3 }
  ];
  WAVES.forEach((w) => {
    const cs = waveCust(w);
    nodes.push({ id: w.id, stage: 'exp', kicker: 'Dispatches', title: w.label, sub: `${plural(cs.length, 'customer', 'customers')} · ${n0(sum(cs, (c) => c.kegs))} kegs`, meta: list(Array.from(new Set(cs.map((c) => c.region)))), alert: w.id === 'X1' ? 'Includes the complaint' : '', tone: 'shipped', reveal: 4 });
  });
  CUSTOMERS.forEach((c) => nodes.push({ id: `C:${c.id}`, stage: 'cli', kicker: c.kind, title: c.label.replace(/, S\.[LA]\.$/, ''), sub: `${c.city} · ${plural(c.kegs, 'keg', 'kegs')}`, tone: 'customer', reveal: 5 }));
  const edges = [['MAL', 'FV'], ['LUP', 'FV'], ['FV', 'K'], ['FV', 'B21'], ['CO2', 'K'], ['K', 'XP'], ['K', 'CB'], ['K', 'RQ']];
  WAVES.forEach((w) => { edges.push(['XP', w.id]); waveCust(w).forEach((c) => edges.push([w.id, `C:${c.id}`])); });
  edges.push(['CB', `C:${PLANNED.cust}`]);

  /* ---------------------------------------------------------------- Tables */

  const shipRows = CUSTOMERS.map((c) => ({ alb: c.alb, cliente: c.label, sub: `${c.kind} · ${c.city}`, date: fmtD(c.date), kegs: c.kegs, hl: hl(c.kegs), located: '100.0%' }));
  const locRows = [
    { ref: LOT, tag: true, where: `Cold store CB-03 · ${PLANNED.ship}`, whereSub: `${PLANNED.order} · ${CUST[PLANNED.cust].label} · ${PLANNED.when}`, n: PLANNED.kegs / PER_PALLET, qty: PLANNED.kegs, action: `Hold ${PLANNED.ship} and serve from another batch`, tone: 'crit' },
    { ref: LOT, tag: true, where: 'Keg cold store CB-03', whereSub: 'WMS Mecalux · available for dispatch', n: STOCK_FREE / PER_PALLET, qty: STOCK_FREE, action: 'Block in WMS Mecalux and SAP', tone: 'warn' },
    { ref: LOT, tag: true, where: 'Hold area RET-Q', whereSub: 'On quality hold · DES-2026-0077', n: HELD / PER_PALLET, qty: HELD, action: 'Keep on hold and analyse', tone: '' }
  ].concat(REGIONS.map((r) => {
    const cs = CUSTOMERS.filter((c) => c.region === r);
    return { ref: LOT, tag: true, where: `At customers · ${r}`, whereSub: `${plural(cs.length, 'customer', 'customers')} · ${list(Array.from(new Set(cs.map((c) => c.city))))}`, n: PALLETS.filter((p) => p.status === 'exp' && cs.some((c) => c.id === p.cust)).length, qty: sum(cs, (c) => c.kegs), action: 'Notice, withdrawal and replacement from another batch', tone: 'warn' };
  }));

  const distN = CUSTOMERS.filter((c) => c.dist).length;
  const regionText = list(REGIONS.map((r) => `${CUSTOMERS.filter((c) => c.region === r).length} in ${r}`));

  const scope = {
    headline: `Bardenas Lager · 30 l KeyKeg · ${n0(FILLED)} kegs filled on LLB-1 on 18/08/2026`,
    previewSide: `${CUSTOMERS.length} customers · ${n0(FILLED)} kegs`,
    startNode: 'K',
    stages: [
      { id: 'mp', label: 'Raw materials', icon: 'leaf' },
      { id: 'fer', label: 'Fermentation', icon: 'flask' },
      { id: 'env', label: 'Packaging', icon: 'droplet' },
      { id: 'alm', label: 'Warehouse', icon: 'warehouse' },
      { id: 'exp', label: 'Dispatches', icon: 'truck' },
      { id: 'cli', label: 'Customers', icon: 'building', count: CUSTOMERS.length }
    ],
    nodes,
    edges,
    systems: ['SAP S/4HANA', 'Brewmaxx (MES)', 'LIMS LabWare', 'WMS Mecalux'],
    genSub: `3 raw materials · 1 fermentation · ${n0(FILLED)} kegs · ${CUSTOMERS.length} customers`,
    steps: [
      { agent: 'trace', system: 'SAP S/4HANA', action: 'Locates the starting point', result: `Bardenas Lager 30 l keg · batch ${LOT} · packaged on 18/08/2026 · best before 18/02/2027`, ms: 190, reveal: 0, mark: 'Starting point located' },
      { agent: 'trace', system: 'Brewmaxx (MES)', action: 'Backwards: packaging, filtration and fermentation', result: 'OE-2608-118 on LLB-1 · beer from BBT-2 (filtered on 14/08) · fermentation batch L2607-FV05, 4 brews on 21/07', ms: 460, reveal: 1 },
      { agent: 'trace', system: 'SAP S/4HANA', action: 'Backwards: raw materials and suppliers', result: 'Malt MAL-2607-05 (Maltas de Castilla) · hops LUP-2606-11 (Lúpulos del Órbigo) · CO₂ CO2-2608-02 from in-house recovery · yeast LEV-26-07-05', ms: 520, reveal: 1, mark: 'Backward trace complete' },
      { agent: 'trace', system: 'LIMS LabWare', action: 'Batch release and analyses', result: 'Released under DES-2026-0077 (average O₂ 64 ppb, ≤ 50) · retained sample tasting on 28/09: cardboard 3 out of 5 · bottle L2608-B21 of the same beer, conforming', ms: 430, tone: 'warn', reveal: 2 },
      { agent: 'trace', system: 'WMS Mecalux', action: 'Batch pallets by SSCC and location', result: `${n0(PALLETS.length)} pallets · ${n0(SHIPPED)} kegs dispatched · ${STOCK_FREE + PLANNED.kegs} in CB-03 (not blocked) · ${HELD} in RET-Q`, ms: 560, reveal: 3, mark: 'Pallets located by SSCC' },
      { agent: 'trace', system: 'SAP S/4HANA', action: 'Open orders with kegs from the batch', result: `${PLANNED.order} from ${CUST[PLANNED.cust].label}: ${PLANNED.kegs} kegs reserved on ${PLANNED.ship}, ${PLANNED.when}`, ms: 380, tone: 'warn', reveal: 3 },
      { agent: 'trace', system: 'SAP S/4HANA', action: 'Dispatches and customers', result: `${CUSTOMERS.length} customers (${regionText}) · ${CUSTOMERS.length} delivery notes from 20/08 to 02/09 · ${distN} on-trade distributors`, ms: 590, reveal: 4, mark: 'Dispatches identified' },
      { agent: 'trace', system: 'SAP S/4HANA', action: 'Quality contacts and open complaints', result: `${CUSTOMERS.length} contacts verified · complaint REC-2026-0093 from Distribuciones Hosteleras Ribera (124 kegs in 37 bars and 44 in its warehouse)`, ms: 480, reveal: 5, mark: 'Customers and contacts identified' },
      { agent: 'bal', system: 'Brewmaxx (MES)', action: 'Fermentation volume and losses', result: '480 hl from L2607-FV05 → 312 hl to keg, 158 hl to bottle and 10 hl of tank bottoms and filtration', ms: 420 },
      { agent: 'bal', system: 'Agentic Platform', action: 'Batch reconciliation: filled vs dispatched, in warehouse and on hold', result: `Reconciled 100.0% · 0 kegs unaccounted for · ${n0(FILLED)} of ${n0(FILLED)} located`, ms: 95, tone: 'ok', mark: 'Batch reconciliation closed' },
      { agent: 'rec', system: 'SAP S/4HANA', action: 'Opens the recall record with one notice per customer', result: `Recall in draft · ${CUSTOMERS.length} collection and replacement orders not released`, ms: 360 },
      { agent: 'rec', system: 'Outlook', action: 'Prepares the notices without sending them', result: `${CUSTOMERS.length} customer notices pending approval · maintenance work order proposed`, ms: 720, mark: 'Record and notices prepared' }
    ],
    located: { label: 'Kegs located', value: `${n0(FILLED)} of ${n0(FILLED)}`, sub: `${n0(SHIPPED)} dispatched · ${STOCK_FREE + PLANNED.kegs} in warehouse · ${HELD} on hold`, icon: 'pallet', short: `${n0(FILLED)} of ${n0(FILLED)} kegs located (${n0(SHIPPED)} at ${CUSTOMERS.length} customers, ${STOCK_FREE + PLANNED.kegs} in CB-03 and ${HELD} on hold)` },
    kpiNotify: { label: 'Customers to notify', value: CUSTOMERS.length, sub: `1 dispatch to hold · ${PLANNED.when}` },
    balance: {
      title: 'Mass balance',
      kpiLabel: 'Mass balance reconciled',
      sub: 'Batch kegs from filling to customer and fermentation volume · Brewmaxx, WMS Mecalux and SAP',
      head: 'Keg batch',
      headSide: `${CUSTOMERS.length} dispatches · 1 fermentation`,
      labels: { in: 'Filled', losses: 'Recorded losses', out: 'Dispatched to customers', stock: 'In warehouse and on hold' },
      detailTitle: 'Detail by flow',
      criterio: 'Rule: any unexplained difference is shown as it is, not spread out. Each keg is counted by the pallet (SSCC) holding it in WMS Mecalux; each dispatch, by its delivery note in SAP.',
      reportText: 'Filling and volume declared in Brewmaxx (MES); pallets by SSCC in WMS Mecalux; dispatches and orders in SAP S/4HANA; release in LIMS LabWare.',
      flows: [
        {
          key: 'K14', seg: 'Kegs', main: true, unit: 'kegs', colLabel: 'Kegs',
          title: `Batch ${LOT} → customers, warehouse and hold`,
          inLabel: 'Filling · OE-2608-118', inSub: '18/08/2026 06:00–14:30 · LLB-1 · CO₂ CO2-2608-02', inStage: 'Brewmaxx', inQty: FILLED,
          phases: [{ title: 'Filling, weight check and palletising · no rejected kegs declared', date: '2026-08-18', stages: [] }],
          outsTitle: 'Outputs',
          outs: CUSTOMERS.map((c) => ({ label: c.label, sub: `${c.alb} · ${dm(c.date)} · ${c.city}`, stage: 'SAP SD', qty: c.kegs })).concat([
            { label: `Reserved for ${PLANNED.ship}`, sub: `CB-03 · ${PLANNED.order} · ${PLANNED.when}`, stage: 'WMS', qty: PLANNED.kegs, kind: 'stock' },
            { label: 'Keg cold store CB-03', sub: 'Available for dispatch (not blocked)', stage: 'WMS', qty: STOCK_FREE, kind: 'stock' },
            { label: 'On quality hold · RET-Q', sub: 'O₂ check · DES-2026-0077', stage: 'SAP QM', qty: HELD, kind: 'stock' }
          ])
        },
        {
          key: 'FV05', seg: 'Fermentation', unit: 'hl', colLabel: 'Hectolitres',
          title: 'Fermentation batch L2607-FV05 → packaging',
          inLabel: 'Fermented beer · L2607-FV05', inSub: '4 brews of 120 hl · FV-05 · 21/07 to 14/08', inStage: 'Brewmaxx', inQty: 480,
          phases: [{ title: 'Filtration and stabilisation to BBT-2', date: '2026-08-14', stages: [['Brewmaxx', 'Tank bottoms and filtration', 10]] }],
          outs: [
            { label: `Keg · ${LOT}`, sub: `${n0(FILLED)} 30 l kegs · LLB-1 · 18/08`, stage: 'Brewmaxx', qty: 312 },
            { label: 'Bottle · L2608-B21', sub: '47,880 33 cl bottles · LB-1 · 19/08', stage: 'Brewmaxx', qty: 158 }
          ]
        }
      ],
      product: {
        title: 'Batch dispatches',
        side: `${CUSTOMERS.length} delivery notes · ${n0(SHIPPED)} kegs · ${hl(SHIPPED)} hl`,
        cols: [
          { label: 'Delivery note', key: 'alb', mono: true },
          { label: 'Customer', key: 'cliente', sub: 'sub' },
          { label: 'Date', key: 'date' },
          { label: 'Kegs', key: 'kegs', num: true },
          { label: 'Hectolitres', key: 'hl', num: true },
          { label: 'Located', key: 'located', num: true, ok: true }
        ],
        rows: shipRows
      }
    },
    units: {
      title: 'Pallets and locations',
      sub: `${n0(PALLETS.length)} pallets (SSCC) · ${n0(FILLED)} kegs · WMS Mecalux and SAP S/4HANA`,
      icon: 'pallet',
      csvLabel: 'Batch pallets (CSV)',
      csvName: 'pallets',
      csvCols: [
        { label: 'SSCC', key: 'sscc' }, { label: 'Filled', key: 'filled' }, { label: 'Kegs', key: 'kegs' }, { label: 'Hectolitres', key: 'hl' },
        { label: 'Location or customer', key: 'where' }, { label: 'Detail', key: 'whereSub' }, { label: 'Dispatch', key: 'ship' }, { label: 'Date', key: 'date' },
        { label: 'Status', key: 'estado' }, { label: 'Action in a real recall', key: 'accion' }
      ],
      byLoc: { label: 'By location', refLabel: 'Batch', whereLabel: 'Location', nLabel: 'Pallets', qtyLabel: 'Kegs', actionLabel: 'Action in a real recall', rows: locRows },
      list: {
        label: 'Pallets (SSCC)',
        cols: [
          { label: 'SSCC', key: 'sscc', mono: true, sub: 'filled' },
          { label: 'Kegs', key: 'kegs', num: true },
          { label: 'Hectolitres', key: 'hl', num: true },
          { label: 'Location or customer', key: 'where', sub: 'whereSub' },
          { label: 'Dispatch', key: 'ship', mono: true, sub: 'date' },
          { label: 'Status', key: 'estado', chip: true },
          { label: 'Action in a real recall', key: 'accion' }
        ],
        rows: palletRows
      }
    },
    customers: {
      title: 'Customers to notify',
      sub: `${CUSTOMERS.length} customers with ${n0(SHIPPED)} kegs (${regionText}) · 1 order today to hold`,
      items,
      holdsTitle: 'Actions at the brewery',
      holds: [
        { icon: 'truck', tone: 'crit', title: `Hold ${PLANNED.ship} (${PLANNED.when})`, meta: [`${PLANNED.kegs} kegs from the batch`, PLANNED.order, CUST[PLANNED.cust].label], body: `In a real recall, the Logistics Manager does not load the ${PLANNED.kegs} kegs reserved in CB-03 and serves the order from batch L2609-K03.` },
        { icon: 'lock', tone: 'warn', title: `Block the ${STOCK_FREE} free kegs in CB-03`, meta: ['today', `batch ${LOT}`, 'WMS Mecalux and SAP'], body: 'They are still available for dispatch: in a real recall they are blocked in WMS and SAP. Pallets by SSCC in the «Pallets (SSCC)» tab and in the CSV.' }
      ]
    },
    approval: {
      titlePrefix: 'Drill withdrawal and notices',
      scope: [
        { label: 'Customers with kegs from the batch', value: `${CUSTOMERS.length} customers · ${n0(SHIPPED)} kegs (${hl(SHIPPED)} hl)`, status: 'pending', chip: String(CUSTOMERS.length) },
        { label: 'Today\'s dispatch to hold', value: `${PLANNED.ship} · ${PLANNED.when} · ${PLANNED.kegs} kegs` },
        { label: 'Stock that would be blocked', value: `${STOCK_FREE} kegs in CB-03 · ${HELD} already on hold in RET-Q`, status: 'evaluate', chip: 'Not blocked in a drill' },
        { label: 'Maintenance', value: 'Bring forward OT-2026-05210 on LLB-1 (NC-2026-0142)' }
      ],
      effects: [
        `Outlook: ${CUSTOMERS.length} notices saved as drafts marked DRILL; nothing is sent`,
        `SAP S/4HANA: recall record and ${CUSTOMERS.length} collection and replacement orders in draft, not released`,
        'WMS Mecalux: no changes; a drill does not block stock or hold dispatches',
        'Record {code} approved with the timing of each activity'
      ]
    },
    report: {
      objeto: 'Recall drill starting from {label}. Traceability is checked backwards (packaging, fermentation and raw materials) and forwards (pallets, dispatches and customers), with the batch mass balance.',
      noAction: 'The exercise does not block stock, hold dispatches or send notices.',
      results: [
        `${CUSTOMERS.length} customers in Navarre, La Rioja and Aragon (${distN} distributors, who would pass the notice on to their bars) and 1 dispatch today that would be held.`,
        'Bottle batch L2608-B21 of the same beer has conforming O₂ and tasting: the scope is limited to the keg run of 18/08.',
        'Maintenance would bring forward the preventive maintenance of the LLB-1 filling heads (OT-2026-05210).'
      ],
      back: {
        cols: [{ label: 'Stage', key: 'etapa' }, { label: 'Reference', key: 'ref', mono: true }, { label: 'Date', key: 'fecha' }, { label: 'Detail', key: 'det' }],
        rows: [
          { etapa: 'Malt', ref: 'MAL-2607-05', fecha: '14/07/2026', det: 'Pilsner malt · Maltas de Castilla, S.A. (lot MC-26-1904) · 7,680 kg in this batch' },
          { etapa: 'Hops', ref: 'LUP-2606-11', fecha: '11/06/2026', det: 'Nugget T90 · Lúpulos del Órbigo, S. Coop. · 24 kg in this batch' },
          { etapa: 'Yeast', ref: 'LEV-26-07-05', fecha: '21/07/2026', det: 'Lager W-34/70, generation 5' },
          { etapa: 'Fermentation', ref: 'L2607-FV05', fecha: '21/07/2026', det: '4 brews of 120 hl in FV-05 · fermented at 12 °C and lagered at 0 °C' },
          { etapa: 'Filtration', ref: 'BBT-2', fecha: '14/08/2026', det: 'Dissolved O₂ in tank 22 ppb · conforming' },
          { etapa: 'CO₂', ref: 'CO2-2608-02', fecha: '01–20/08/2026', det: 'Recovered from fermentation · purity 99.99%' },
          { etapa: 'Packaging', ref: 'OE-2608-118', fecha: '18/08/2026 06:00', det: `LLB-1 · ${n0(FILLED)} kegs · average O₂ 64 ppb (filling head 3 at 91 ppb)` },
          { etapa: 'Release', ref: 'DES-2026-0077', fecha: '18/08/2026 15:30', det: 'Released under O₂ deviation · tasting conforming' }
        ]
      },
      fwd: {
        cols: [{ label: 'Delivery note', key: 'alb', mono: true }, { label: 'Customer', key: 'cliente' }, { label: 'Date', key: 'date' }, { label: 'Kegs', key: 'kegs' }, { label: 'Hectolitres', key: 'hl' }],
        rows: shipRows.concat([
          { alb: PLANNED.ship, cliente: `${CUST[PLANNED.cust].label} (today's order, reserved in CB-03)`, date: '29/09/2026', kegs: PLANNED.kegs, hl: hl(PLANNED.kegs) },
          { alb: 'CB-03', cliente: 'Keg cold store (not blocked)', date: '—', kegs: STOCK_FREE, hl: hl(STOCK_FREE) },
          { alb: 'RET-Q', cliente: 'On quality hold', date: '—', kegs: HELD, hl: hl(HELD) }
        ])
      },
      conclusion: 'Conclusion: all the information needed for a recall is obtained in full and the batch reconciles keg by keg. Proposed improvements: ask distributors for the list of bars per batch through the customer portal, and record O₂ by filling head on every pallet.',
      note: 'Drill: no stock has been blocked, no dispatch has been held and no notice has been sent. Synthetic demo data.'
    },
    audit: { back: 'malt MAL-2607-05 · hops LUP-2606-11 · CO₂ CO2-2608-02 · fermentation L2607-FV05', fwd: `${n0(FILLED)} kegs · ${n0(PALLETS.length)} pallets · ${CUSTOMERS.length} customers · 1 dispatch today` },
    say: [
      `What needs action: ${PLANNED.ship} (${PLANNED.when}) would be held and the ${STOCK_FREE} free kegs in CB-03 would be blocked.`,
      'The notices go to the 14 customers with their delivery note and number of kegs; the distributors pass them on to their bars. Nothing is sent in a drill. Quality decides.'
    ]
  };

  agenticPackEn('cerveceria', {
    retirada: {
      title: 'Recall drill',
      nav: 'Traceability drill',
      section: 'Calidad',
      desc: 'Traceability exercise for product recalls: backward and forward genealogy, from raw materials to pallet and customer, mass balance and customers to notify, starting from a batch or a delivery note.',
      place: 'Arguedas Brewery',
      approver: 'Quality Manager',
      regPrefix: 'SR-2026-',
      agents: { trace: 'Traceability', bal: 'Mass balance', rec: 'Recall and notices' },
      targetText: 'Illustrative target: 4 h',
      todayEstimate: '2–5 h',
      timerRef: 'Demo target: 4 h',
      packLabel: 'Download recall pack',
      setup: { title: 'Starting point', sub: 'A finished product batch or a dispatch delivery note' },
      modes: {
        lote: { label: 'Batch', noun: 'the batch', field: 'Batch code', icon: 'layers', format: 'L2608-K14', where: 'SAP S/4HANA and Brewmaxx' },
        albaran: { label: 'Delivery note', noun: 'the delivery note', field: 'Delivery note number', icon: 'truck', format: 'ALB-26-08-2211', where: 'SAP S/4HANA' }
      },
      entries: [
        { mode: 'lote', code: LOT, scope: 'k14', label: `Batch ${LOT}`, option: 'Bardenas Lager · 30 l keg · 18/08/2026' },
        { mode: 'albaran', code: 'ALB-26-08-2211', scope: 'k14', label: 'Delivery note ALB-26-08-2211', option: 'Distribuciones Hosteleras Ribera · 168 kegs', headline: `Delivery note ALB-26-08-2211 to Distribuciones Hosteleras Ribera (complaint REC-2026-0093) · 168 kegs from batch ${LOT} → the whole batch is traced`, startNode: 'X1', startResult: `Dispatch of 20/08/2026 to Distribuciones Hosteleras Ribera (Tudela) · 168 kegs from batch ${LOT} → the whole batch is traced` }
      ],
      examples: [
        { mode: 'lote', code: LOT, label: `Batch ${LOT}` },
        { mode: 'albaran', code: 'ALB-26-08-2211', label: 'Delivery note ALB-26-08-2211' }
      ],
      reference: {
        title: 'Audit reference',
        sub: 'Goal of the exercise; Quality confirms the requirements of its certification and its customers',
        items: [
          ['Regulation (EC) No 178/2002', 'Article 18: one step back and one step forward traceability. Article 19: withdrawal and notification of the authority where there is a health risk.'],
          ['IFS Food / BRCGS', 'Traceability test and mock recall at least once a year, with mass balance. Illustrative target for the exercise: locate the whole batch within 4 hours.'],
          ['PR-CAL-006', 'Internal product recall procedure: Quality decides the scope and approves the notices.']
        ],
        note: 'A drill does not block stock, hold dispatches or send notices: it measures whether the information is obtained in full, reconciles and on time.'
      },
      legend: { planned: 'Today\'s dispatch: hold', click: 'Click a batch to see its full trace' },
      notice: { title: 'Recall drill' },
      approval: { policy: 'PR-CAL-006 · recalling product or holding dispatches requires Quality approval', approveLabel: 'Approve and close drill', rejectPlaceholder: 'For example: a distributor\'s quality contact still needs confirming' },
      clock: { title: 'Stopwatch vs audit target', sub: 'Simulation timings; not performance measurements of the systems' },
      report: { subtitle: 'Record of the traceability and recall exercise · Regulation (EC) No 178/2002 · PR-CAL-006' },
      compare: {
        rows: [
          { k: 'People involved', today: '3–4: Quality, Logistics, Production and Sales', agentic: '1: {approver} reviews and approves' },
          { k: 'Systems queried', today: '5–6 opened by hand: SAP, Brewmaxx, LIMS, WMS, spreadsheets and email', agentic: '5 connectors queried by the agents: SAP S/4HANA, Brewmaxx, LIMS LabWare, WMS Mecalux and Outlook' },
          { k: 'Steps', today: '15–20 queries, matching SSCCs to delivery notes and manual calculations', agentic: '{steps} automatic steps and 1 approval' },
          { k: 'Mass balance', today: 'Spreadsheet with filling, dispatches and stock', agentic: 'Calculated by pallet and delivery note: {reconciled} reconciled' }
        ]
      },
      presenter: {
        idle: [
          'Recall drill with traceability and mass balance; in the pilot, Quality confirms the protocol and we measure the real time.',
          'Choose the starting point: keg batch L2608-K14 or the delivery note of the dispatch under complaint.',
          'Agentic Platform works through SAP, Brewmaxx, LIMS and WMS backwards to the malt, hops and CO₂, and forwards to every pallet and customer, and reconciles the batch keg by keg.'
        ],
        nextIdle: 'Click «Start drill» with batch L2608-K14 (or choose «Delivery note ALB-26-08-2211»).',
        nextRun: 'Click «View notice» for Distribuciones Hosteleras Ribera and then «Approve and close drill».',
        nextDone: '«Download recall pack»: pallet CSV and printable record. Then «Customer questionnaire» (right arrow).'
      },
      scopes: { k14: scope }
    }
  });
})();
