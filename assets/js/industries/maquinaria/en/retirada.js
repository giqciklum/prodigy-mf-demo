/*
 * Hidromec Ebro · traceability drill: field campaign for seal batch JNT-2607-031 (English).
 * 1,200 seals received → 24 scrapped at inspection, 72 in stock and 1,104 fitted in 3 assembly batches
 * (MON-2607-22, MON-2608-03, MON-2608-11) → 26 units (20 PH-250 and 6 GH-55): 23 in the field at 11 customers in
 * Spain, Portugal and France and 3 PH-250 at the plant. Same units as CN_DATA.trace and complaint REC-2026-0187.
 * The customer notices stay in each customer's language (Spanish, Portuguese or French).
 * Synthetic demonstration data (MFM).
 */
(function () {
  'use strict';

  const LOT = 'JNT-2607-031';
  const PER = { 'PH-250': 48, 'GH-55': 24 };
  const MODEL_NAME = { 'PH-250': 'PH-250 hydraulic press', 'GH-55': 'GH-55 hydraulic power unit' };
  /* Model names for the Spanish-language notices sent to Spanish customers. */
  const MODEL_NAME_ES = { 'PH-250': 'Prensa hidráulica PH-250', 'GH-55': 'Grupo hidráulico GH-55' };
  const MON = {
    'MON-2607-22': { dates: '27–31/07/2026', line: 'LM-2 (presses) and LM-1 (power units)', test: '2026-07-31' },
    'MON-2608-03': { dates: '03–07/08/2026', line: 'LM-2 (presses) and LM-1 (power units)', test: '2026-08-10' },
    'MON-2608-11': { dates: '11–14/08/2026', line: 'LM-2 (presses) and LM-1 (power units)', test: '2026-08-18' }
  };

  const CUSTOMERS = {
    psn: { label: 'Prensas y Servicios del Norte, S.L.', city: 'Bilbao', country: 'ES', kind: 'Distributor', lang: 'es', contact: 'Calidad y servicio técnico', contract: true },
    eri: { label: 'Estampaciones Riojanas, S.A.', city: 'Logroño', country: 'ES', kind: 'Direct customer · stamping', lang: 'es', contact: 'Mantenimiento', contract: true },
    fci: { label: 'Forjas del Cinca, S.L.', city: 'Monzón (Huesca)', country: 'ES', kind: 'Direct customer · forging', lang: 'es', contact: 'Mantenimiento', contract: true },
    mva: { label: 'Metalúrgica Vallès, S.A.', city: 'Terrassa (Barcelona)', country: 'ES', kind: 'Direct customer · metalworking', lang: 'es', contact: 'Ingeniería de planta', contract: false },
    ple: { label: 'Prensados Levante, S.L.', city: 'Paterna (Valencia)', country: 'ES', kind: 'Direct customer · stamping', lang: 'es', contact: 'Gerencia', contract: false },
    cna: { label: 'Composites Navarra, S.L.', city: 'Tudela (Navarra)', country: 'ES', kind: 'Direct customer · composites', lang: 'es', contact: 'Mantenimiento', contract: false },
    hca: { label: 'Hidráulica Castellana, S.L.', city: 'Valladolid', country: 'ES', kind: 'Distributor', lang: 'es', contact: 'Servicio técnico', contract: false },
    mav: { label: 'Metalomecânica do Ave, Lda.', city: 'Guimarães', country: 'PT', kind: 'Direct customer · metal engineering', lang: 'pt', contact: 'Qualidade', contract: true },
    elu: { label: 'Estamparia Lusitana, S.A.', city: 'Aveiro', country: 'PT', kind: 'Direct customer · stamping', lang: 'pt', contact: 'Manutenção', contract: false },
    ega: { label: 'Emboutissage Garonne SAS', city: 'Toulouse', country: 'FR', kind: 'Direct customer · aerospace', lang: 'fr', contact: 'Qualité fournisseurs', contract: false },
    pra: { label: 'Presses Rhône-Alpes SARL', city: 'Saint-Étienne', country: 'FR', kind: 'Distributor', lang: 'fr', contact: 'Service après-vente', contract: false }
  };
  const COUNTRY = { ES: 'Spain', PT: 'Portugal', FR: 'France' };
  const LANG = { es: 'Spanish', pt: 'Portuguese', fr: 'French' };

  /* Units assembled with the batch (same as CN_DATA.trace): [serial no., assembly batch, status, customer, delivery, site, delivery note] */
  const UNITS = [
    ['PH250-26-0405', 'MON-2607-22', 'campo', 'psn', '2026-08-03', 'Talleres Arratia · Igorre (Bizkaia)', '80041962'],
    ['PH250-26-0407', 'MON-2607-22', 'campo', 'eri', '2026-08-05', 'Logroño', '80041985'],
    ['PH250-26-0408', 'MON-2607-22', 'campo', 'fci', '2026-08-06', 'Monzón (Huesca)', '80041990'],
    ['PH250-26-0410', 'MON-2607-22', 'campo', 'mav', '2026-08-10', 'Guimarães (Portugal)', '80042011'],
    ['PH250-26-0412', 'MON-2607-22', 'campo', 'psn', '2026-08-04', 'Estampaciones Nervión · Basauri (Bizkaia)', '80041977'],
    ['PH250-26-0413', 'MON-2607-22', 'campo', 'mva', '2026-08-07', 'Terrassa (Barcelona)', '80041996'],
    ['PH250-26-0415', 'MON-2607-22', 'campo', 'ple', '2026-08-11', 'Paterna (Valencia)', '80042018'],
    ['PH250-26-0416', 'MON-2607-22', 'campo', 'ega', '2026-08-14', 'Toulouse (France)', '80042040'],
    ['GH55-26-0131', 'MON-2607-22', 'campo', 'fci', '2026-08-06', 'Monzón (Huesca)', '80041990'],
    ['GH55-26-0132', 'MON-2607-22', 'campo', 'cna', '2026-08-05', 'Tudela (Navarra)', '80041984'],
    ['PH250-26-0441', 'MON-2608-03', 'campo', 'psn', '2026-08-18', 'Calderería Zorroza · Bilbao', '80042103'],
    ['PH250-26-0442', 'MON-2608-03', 'campo', 'eri', '2026-08-19', 'Logroño', '80042110'],
    ['PH250-26-0444', 'MON-2608-03', 'campo', 'fci', '2026-08-20', 'Monzón (Huesca)', '80042122'],
    ['PH250-26-0446', 'MON-2608-03', 'campo', 'mva', '2026-08-24', 'Terrassa (Barcelona)', '80042151'],
    ['PH250-26-0447', 'MON-2608-03', 'campo', 'cna', '2026-08-25', 'Tudela (Navarra)', '80042160'],
    ['PH250-26-0449', 'MON-2608-03', 'campo', 'hca', '2026-08-27', 'Troquelados Duero · Valladolid', '80042177'],
    ['PH250-26-0450', 'MON-2608-03', 'campo', 'elu', '2026-09-01', 'Aveiro (Portugal)', '80042205'],
    ['GH55-26-0140', 'MON-2608-03', 'campo', 'cna', '2026-08-25', 'Tudela (Navarra)', '80042160'],
    ['GH55-26-0141', 'MON-2608-03', 'campo', 'hca', '2026-08-27', 'Plásticos Pisuerga · Palencia', '80042177'],
    ['PH250-26-0472', 'MON-2608-11', 'campo', 'ple', '2026-09-03', 'Paterna (Valencia)', '80042231'],
    ['PH250-26-0474', 'MON-2608-11', 'campo', 'mav', '2026-09-08', 'Guimarães (Portugal)', '80042268'],
    ['GH55-26-0147', 'MON-2608-11', 'campo', 'elu', '2026-09-01', 'Aveiro (Portugal)', '80042205'],
    ['GH55-26-0148', 'MON-2608-11', 'campo', 'pra', '2026-09-09', 'Saint-Étienne (France)', '80042281'],
    ['PH250-26-0476', 'MON-2608-11', 'planta', null, null, 'Finished goods store ALM-PT · weeping on BP-1 (28/09)', null],
    ['PH250-26-0477', 'MON-2608-11', 'planificado', 'ple', '2026-09-29', 'Dock 2 · leaves today 11:00', 'EXP-26-3318'],
    ['PH250-26-0478', 'MON-2608-11', 'planta', null, null, 'Finished goods store ALM-PT · weeping on BP-1 (28/09)', null]
  ].map(([serial, mon, status, cust, date, place, ship]) => {
    const model = serial.slice(0, 2) === 'PH' ? 'PH-250' : 'GH-55';
    return { serial, mon, model, status, cust, date, place, ship, juntas: PER[model] };
  });

  const fmtD = (iso) => (iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}` : '');
  const dm = (iso) => (iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}` : '');
  const n0 = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const n0es = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const plural = (n, a, b) => `${n0(n)} ${n === 1 ? a : b}`;
  const pluralEs = (n, a, b) => `${n0es(n)} ${n === 1 ? a : b}`;
  const list = (a) => (a.length < 2 ? (a[0] || '') : `${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}`);
  const sum = (a, f) => a.reduce((s, x) => s + f(x), 0);
  const of = (pred) => UNITS.filter(pred);
  const field = of((u) => u.status === 'campo');
  const planned = of((u) => u.status === 'planificado');
  /* Site text for the Spanish-language notices. */
  const placeEs = (p) => p.replace('(France)', '(Francia)');

  /* ---------------------------------------------------------------- Notices by language (customer's own language) */

  const KIT = 'kit de juntas hidráulicas KJ-80 (PU/NBR, ref. 7710-0480)';
  const T = {
    es: {
      subj: (n) => `[SIMULACRO] Campaña de campo CC-2026-07 · sustitución preventiva de juntas · ${pluralEs(n, 'equipo', 'equipos')}`,
      greet: (c) => `Estimado equipo de ${c.contact.toLowerCase()} de ${c.label}:`,
      intro: 'Les comunicamos una campaña de campo preventiva que afecta a los siguientes equipos suministrados por Hidromec Ebro:',
      item: (u) => [`Equipo: ${MODEL_NAME_ES[u.model]} · n.º de serie ${u.serial}`, `Entregado: ${fmtD(u.date)} (albarán ${u.ship}) · emplazamiento: ${placeEs(u.place)}`, `Componente afectado: ${KIT} del lote ${LOT} · ${u.juntas} juntas por equipo`].join('\n'),
      ask: 'Hasta la intervención, les pedimos que revisen al inicio de cada turno si hay fugas o rezume de aceite en el vástago y la tapa del cilindro principal y que, si los observan, detengan el equipo y lo consignen (bloqueo y etiquetado). Nuestro servicio técnico les llamará en un plazo de 48 h para programar la sustitución de las juntas con un lote verificado, sin coste.',
      planned: (u) => `La entrega de la ${MODEL_NAME_ES[u.model].toLowerCase()} ${u.serial} prevista para hoy a las 11:00 (${u.ship}) queda retenida en nuestras instalaciones hasta sustituir sus juntas y repetir la prueba en banco. Les confirmaremos la nueva fecha.`,
      reason: 'Motivo: simulacro de campaña de campo (procedimiento PR-POS-005). En una campaña real, aquí se indican el riesgo, la causa y las instrucciones de seguridad.',
      sign: 'Atentamente,\nPosventa · Hidromec Ebro\nPlanta de Zaragoza'
    },
    pt: {
      subj: (n) => `[SIMULACRO] Campanha de campo CC-2026-07 · substituição preventiva de vedantes · ${n} ${n === 1 ? 'equipamento' : 'equipamentos'}`,
      greet: (c) => `Exma. equipa de ${c.contact} da ${c.label},`,
      intro: 'Informamos de uma campanha de campo preventiva que afeta os seguintes equipamentos fornecidos pela Hidromec Ebro:',
      item: (u) => [`Equipamento: ${u.model === 'PH-250' ? 'Prensa hidráulica PH-250' : 'Grupo hidráulico GH-55'} · n.º de série ${u.serial}`, `Entregue: ${fmtD(u.date)} (guia ${u.ship}) · local: ${u.place}`, `Componente afetado: kit de vedantes hidráulicos KJ-80 (PU/NBR, ref. 7710-0480), lote ${LOT}`].join('\n'),
      ask: 'Até à intervenção, pedimos que verifiquem no início de cada turno se existem fugas de óleo na haste e na tampa do cilindro principal e, caso as detetem, parem o equipamento e o consignem. A nossa assistência técnica entrará em contacto no prazo de 48 h para agendar a substituição dos vedantes, sem custos.',
      reason: 'Motivo: simulacro de campanha de campo (procedimento PR-POS-005). Numa campanha real, esta secção indica o risco, a causa e as instruções de segurança.',
      sign: 'Com os melhores cumprimentos,\nPós-venda · Hidromec Ebro\nFábrica de Saragoça'
    },
    fr: {
      subj: (n) => `[SIMULATION] Campagne terrain CC-2026-07 · remplacement préventif de joints · ${n} ${n === 1 ? 'équipement' : 'équipements'}`,
      greet: (c) => `Madame, Monsieur (service ${c.contact}, ${c.label}),`,
      intro: 'Nous vous informons d’une campagne terrain préventive concernant les équipements suivants fournis par Hidromec Ebro :',
      item: (u) => [`Équipement : ${u.model === 'PH-250' ? 'Presse hydraulique PH-250' : 'Groupe hydraulique GH-55'} · n° de série ${u.serial}`, `Livré le ${fmtD(u.date)} (bon de livraison ${u.ship}) · site : ${u.place.replace('(France)', '')}`, `Composant concerné : kit de joints hydrauliques KJ-80 (PU/NBR, réf. 7710-0480), lot ${LOT}`].join('\n'),
      ask: 'Dans l’attente de l’intervention, merci de contrôler en début de poste l’absence de fuite d’huile sur la tige et le nez du vérin principal et, en cas de fuite, d’arrêter et de consigner la machine. Notre service après-vente vous contactera sous 48 h pour planifier le remplacement des joints, sans frais.',
      reason: 'Motif : simulation de campagne terrain (procédure PR-POS-005). Dans une campagne réelle, cette section précise le risque, la cause et les consignes de sécurité.',
      sign: 'Cordialement,\nService après-vente · Hidromec Ebro\nUsine de Saragosse'
    }
  };

  function noticeOf(id) {
    const c = CUSTOMERS[id];
    const t = T[c.lang];
    const fu = field.filter((u) => u.cust === id);
    const pu = planned.filter((u) => u.cust === id);
    const parts = [t.greet(c)];
    if (fu.length) { parts.push(t.intro); fu.forEach((u) => parts.push(t.item(u))); parts.push(t.ask); }
    if (pu.length && c.lang === 'es') pu.forEach((u) => parts.push(T.es.planned(u)));
    parts.push(t.reason);
    parts.push(t.sign);
    const to = { es: 'Calidad', pt: 'Qualidade', fr: 'Qualité' }[c.lang];
    return {
      lang: LANG[c.lang],
      headers: { From: 'Posventa, Hidromec Ebro', To: `${to} · ${c.label}`, Subject: t.subj(fu.length) },
      subject: t.subj(fu.length),
      body: parts.join('\n\n'),
      highlights: [LOT].concat(fu.concat(pu).map((u) => u.serial))
    };
  }

  const ORDER = Object.keys(CUSTOMERS).sort((a, b) => field.filter((u) => u.cust === b).length - field.filter((u) => u.cust === a).length);
  const byModelText = (us) => ['PH-250', 'GH-55'].map((m) => [m, us.filter((u) => u.model === m).length]).filter((x) => x[1]).map(([m, k]) => `${k} ${m}`);
  const items = ORDER.map((id) => {
    const c = CUSTOMERS[id];
    const fu = field.filter((u) => u.cust === id);
    const pu = planned.filter((u) => u.cust === id);
    const finals = fu.filter((u) => /·/.test(u.place)).map((u) => `${u.place.split(' · ')[0]} (${u.serial})`);
    const body = [`In the field: ${list(byModelText(fu))} (${list(fu.map((u) => u.serial))}), delivered ${list(fu.map((u) => dm(u.date)).filter((d, i, a) => a.indexOf(d) === i))}.`];
    if (finals.length) body.push(`End customers: ${list(finals)}.`);
    if (fu.some((u) => u.serial === 'PH250-26-0412')) body.push('Includes the press from complaint REC-2026-0187.');
    pu.forEach((u) => body.push(`Planned: ${u.serial} on ${u.ship}, today at 11:00: hold.`));
    return {
      id,
      label: c.label,
      icon: 'building',
      notify: true,
      channel: `Email + call from the service team${c.contract ? ' (maintenance contract)' : ''}`,
      meta: [`${c.city} · ${COUNTRY[c.country]}`, c.kind, `Notice in ${LANG[c.lang]}`],
      body: body.join(' '),
      notice: noticeOf(id),
      refs: fu.concat(pu).map((u) => u.serial).join(', '),
      qtyText: plural(fu.length, 'unit', 'units'),
      action: `Field campaign (${LANG[c.lang]})${pu.length ? ' and delivery hold' : ''}`
    };
  });
  items.push({
    id: 'proveedor',
    label: 'Sellados Ibéricos, S.A. (batch supplier)',
    icon: 'factory',
    notify: false,
    chip: 'Request 8D',
    channel: 'SAP Ariba supplier portal + email',
    meta: ['Rubí (Barcelona) · Spain', 'Approved supplier since 2019', 'Notice in Spanish'],
    body: 'Supplier complaint with 8D (PR-CAL-008): block of their batch SI-26-1187, 3.1 hardness and dimensional certificates, and a sample of 20 seals from store C-14-03 for laboratory testing.',
    notice: {
      lang: 'Spanish',
      headers: { From: 'Compras · calidad de proveedor, Hidromec Ebro', To: 'Calidad · Sellados Ibéricos, S.A.', Subject: `[SIMULACRO] Reclamación a proveedor · lote ${LOT} (su lote SI-26-1187) · solicitud de 8D` },
      subject: `[SIMULACRO] Reclamación a proveedor · lote ${LOT} (su lote SI-26-1187) · solicitud de 8D`,
      body: [
        'Estimado equipo de Calidad de Sellados Ibéricos:',
        `Hemos abierto una campaña de campo preventiva por fuga de aceite en el vástago del cilindro principal de una prensa PH-250 (n.º de serie PH250-26-0412, reclamación REC-2026-0187) y rezume en dos prensas en nuestra re-prueba del 28/09. Las juntas montadas son del kit KJ-80 (ref. 7710-0480) de su lote SI-26-1187, recibido el 21/07/2026 como nuestro lote ${LOT} (pedido 4500391022, albarán SI-AL-26-5521).`,
        'Les pedimos:\n1. Contención en 24 h: bloqueo de su lote SI-26-1187 y de cualquier otro lote moldeado con la misma carga de material.\n2. Certificados 3.1 (EN 10204) de dureza Shore A, deformación remanente por compresión y control dimensional del labio.\n3. Informe 8D (PR-CAL-008): D3 en 24 h y D4–D5 en 10 días laborables.',
        'Retenemos 20 juntas del mismo lote para ensayo en nuestro laboratorio; quedan a su disposición si desean un análisis contradictorio.',
        'Motivo: simulacro de campaña de campo. En una reclamación real, aquí se adjuntan las fotografías y el informe de la pieza.',
        'Atentamente,\nCompras · calidad de proveedor\nHidromec Ebro · Planta de Zaragoza'
      ].join('\n\n'),
      highlights: [LOT, 'PH250-26-0412', 'SI-26-1187']
    },
    refs: `${LOT} · SI-26-1187`,
    qtyText: '1,200 seals',
    action: 'Supplier 8D complaint'
  });

  /* ---------------------------------------------------------------- Genealogy */

  const monUnits = (k) => UNITS.filter((u) => u.mon === k);
  const monSeals = (k) => sum(monUnits(k), (u) => u.juntas);
  const monText = (k) => list(byModelText(monUnits(k)));
  const fieldOfMon = (k) => field.filter((u) => u.mon === k);
  const firstLast = (us) => { const d = us.map((u) => u.date).sort(); return `${dm(d[0])}–${dm(d[d.length - 1])}`; };
  const nodes = [
    { id: 'S', stage: 'prov', kicker: 'Supplier', title: 'Sellados Ibéricos, S.A.', sub: 'Rubí (Barcelona) · approved', meta: 'Supplier batch SI-26-1187', reveal: 1 },
    { id: 'R', stage: 'rec', kicker: 'Goods receipt', title: 'EM 5000812744', mono: true, sub: '21/07 08:40 · 1,200 seals', meta: 'PO 4500391022 · delivery note SI-AL-26-5521', reveal: 1 },
    { id: 'L', stage: 'lote', kicker: 'Component batch', title: LOT, mono: true, lot: LOT, sub: 'KJ-80 seal kit (PU/NBR)', meta: '24 scrapped · 72 in C-14-03', reveal: 1 },
    { id: 'M1', stage: 'mon', kicker: 'Assembly batch', title: 'MON-2607-22', mono: true, sub: `${monText('MON-2607-22')} · ${monSeals('MON-2607-22')} seals`, meta: 'LM-2 and LM-1 · 27–31/07', reveal: 2 },
    { id: 'M2', stage: 'mon', kicker: 'Assembly batch', title: 'MON-2608-03', mono: true, sub: `${monText('MON-2608-03')} · ${monSeals('MON-2608-03')} seals`, meta: 'LM-2 and LM-1 · 03–07/08', reveal: 2 },
    { id: 'M3', stage: 'mon', kicker: 'Assembly batch', title: 'MON-2608-11', mono: true, sub: `${monText('MON-2608-11')} · ${monSeals('MON-2608-11')} seals`, meta: 'LM-2 and LM-1 · 11–14/08', reveal: 2 },
    { id: 'E1', stage: 'eq', kicker: 'Units', title: `${fieldOfMon('MON-2607-22').length} in the field`, sub: monText('MON-2607-22'), meta: `Delivered ${firstLast(fieldOfMon('MON-2607-22'))} · includes PH250-26-0412`, alert: 'Press in the complaint', tone: 'shipped', reveal: 3 },
    { id: 'E2', stage: 'eq', kicker: 'Units', title: `${fieldOfMon('MON-2608-03').length} in the field`, sub: list(byModelText(fieldOfMon('MON-2608-03'))), meta: `Delivered ${firstLast(fieldOfMon('MON-2608-03'))}`, tone: 'shipped', reveal: 3 },
    { id: 'E3', stage: 'eq', kicker: 'Units', title: `${fieldOfMon('MON-2608-11').length} in the field`, sub: list(byModelText(fieldOfMon('MON-2608-11'))), meta: `Delivered ${firstLast(fieldOfMon('MON-2608-11'))}`, tone: 'shipped', reveal: 3 },
    { id: 'E3p', stage: 'eq', kicker: 'Units', title: '1 planned', sub: 'PH250-26-0477', meta: 'EXP-26-3318 · today 11:00', alertTone: true, alert: 'Hold at dock 2', tone: 'planned', reveal: 3 },
    { id: 'E3s', stage: 'eq', kicker: 'Units', title: '2 on hold at the plant', sub: 'PH250-26-0476 and 0478', meta: 'Weeping on BP-1 (28/09)', alertTone: true, tone: 'stock', reveal: 3 }
  ];
  ORDER.forEach((id) => {
    const c = CUSTOMERS[id];
    const n = field.filter((u) => u.cust === id).length;
    nodes.push({ id: `C:${id}`, stage: 'cli', kicker: 'Customer', title: c.label, sub: `${c.city} · ${COUNTRY[c.country]}`, meta: plural(n, 'unit in the field', 'units in the field'), tone: 'customer', reveal: 5 });
  });
  const edges = [['S', 'R'], ['R', 'L'], ['L', 'M1'], ['L', 'M2'], ['L', 'M3'], ['M1', 'E1'], ['M2', 'E2'], ['M3', 'E3'], ['M3', 'E3p'], ['M3', 'E3s']];
  const groupOf = (u) => (u.mon === 'MON-2607-22' ? 'E1' : u.mon === 'MON-2608-03' ? 'E2' : 'E3');
  field.forEach((u) => { const g = groupOf(u); if (!edges.some((e) => e[0] === g && e[1] === `C:${u.cust}`)) edges.push([g, `C:${u.cust}`]); });
  edges.push(['E3p', 'C:ple']);

  /* ---------------------------------------------------------------- Tables */

  const statusChip = (u) => (u.serial === 'PH250-26-0412' ? { status: 'critical', label: 'Leak reported' } : u.status === 'campo' ? { status: 'shipped', label: 'In the field' } : u.status === 'planificado' ? { status: 'pending', label: 'Shipment planned' } : { status: 'hold', label: 'On hold · weeping' });
  const unitRows = UNITS.map((u) => ({
    serial: u.serial,
    model: MODEL_NAME[u.model],
    mon: u.mon,
    monDate: MON[u.mon].dates,
    juntas: u.juntas,
    cliente: u.cust ? CUSTOMERS[u.cust].label : 'Hidromec Ebro (plant)',
    pais: u.cust ? COUNTRY[CUSTOMERS[u.cust].country] : 'Spain',
    place: u.place,
    entrega: u.status === 'campo' ? fmtD(u.date) : u.status === 'planificado' ? 'Due today 11:00' : '—',
    ship: u.ship ? (u.status === 'campo' ? `Delivery note ${u.ship}` : u.ship) : '—',
    estado: statusChip(u),
    accion: u.status === 'campo' ? 'Notice and seal replacement in the field' : u.status === 'planificado' ? `Hold ${u.ship} and replace seals` : 'Block in SAP QM (NC-2026-0234) and replace seals'
  }));

  const monRows = Object.keys(MON).map((k) => {
    const us = monUnits(k);
    const f = us.filter((u) => u.status === 'campo');
    const p = us.filter((u) => u.status !== 'campo');
    return { lot: k, product: `${monText(k)} · ${MON[k].dates}`, made: us.length, madeSub: `${monSeals(k)} seals`, field: f.length, fieldSub: plural(new Set(f.map((u) => u.cust)).size, 'customer', 'customers'), plant: p.length, plantSub: p.map((u) => u.serial.slice(-4)).join(' · ') || 'None', diff: 0, located: '100.0%' };
  });

  const countries = (us) => list(Array.from(new Set(us.map((u) => COUNTRY[CUSTOMERS[u.cust].country]))));
  const nCust = (us) => new Set(us.map((u) => u.cust)).size;
  const locRows = [
    { ref: LOT, tag: true, where: 'Component store C-14-03', whereSub: 'Available for assembly · sample of 20 for the laboratory', n: null, qty: 72, action: 'Block in SAP QM (blocked stock)', tone: 'warn' }
  ].concat(Object.keys(MON).map((k) => {
    const f = fieldOfMon(k);
    return { ref: k, where: 'In the field', whereSub: `${plural(nCust(f), 'customer', 'customers')} · ${countries(f)}`, n: f.length, qty: sum(f, (u) => u.juntas), action: 'Customer notice and replacement in the field', tone: 'warn' };
  })).concat([
    { ref: 'MON-2608-11', where: 'Dock 2 · EXP-26-3318', whereSub: 'PH250-26-0477 · leaves today 11:00 · Prensados Levante', n: 1, qty: 48, action: 'Hold EXP-26-3318 (today 11:00)', tone: 'crit' },
    { ref: 'MON-2608-11', where: 'Finished goods store ALM-PT', whereSub: 'PH250-26-0476 and PH250-26-0478 · weeping on BP-1', n: 2, qty: 96, action: 'Block in SAP QM (NC-2026-0234) and replace seals', tone: '' }
  ]);

  const places = new Set(field.map((u) => u.place)).size;
  const contracts = Object.keys(CUSTOMERS).filter((k) => CUSTOMERS[k].contract).length;
  const finalsN = field.filter((u) => /·/.test(u.place)).length;
  const flowOfMon = (k) => {
    const us = monUnits(k);
    const f = fieldOfMon(k);
    const outs = [{ label: `${list(byModelText(f))} in the field`, sub: `${plural(nCust(f), 'customer', 'customers')} · ${countries(f)}`, stage: 'SAP SD', qty: sum(f, (u) => u.juntas) }];
    us.filter((u) => u.status === 'planificado').forEach((u) => outs.push({ label: `${u.serial} · shipment planned`, sub: `${u.ship} · today 11:00 · dock 2`, stage: 'SAP SD', qty: u.juntas, kind: 'stock' }));
    const held = us.filter((u) => u.status === 'planta');
    if (held.length) outs.push({ label: `${list(held.map((u) => u.serial))} · on hold`, sub: 'ALM-PT · weeping in the BP-1 retest', stage: 'SAP QM', qty: sum(held, (u) => u.juntas), kind: 'stock' });
    return {
      key: k, seg: k, unit: 'seals', colLabel: 'Seals',
      title: `Assembly batch ${k} → ${monText(k)}`,
      inLabel: `Consumed · ${k}`, inSub: `${MON[k].line} · ${MON[k].dates}`, inStage: 'Opcenter', inQty: monSeals(k),
      phases: [{ title: 'Assembly and final hydraulic test (1.25 × nominal pressure, 30 min) · no losses declared', date: MON[k].test, stages: [] }],
      outs
    };
  };

  const scope = {
    headline: 'KJ-80 hydraulic seal kit (PU/NBR) · Sellados Ibéricos, S.A. · 1,200 seals received on 21/07/2026',
    previewSide: '3 assembly batches · 26 units',
    startNode: 'L',
    stages: [
      { id: 'prov', label: 'Supplier', icon: 'factory' },
      { id: 'rec', label: 'Goods receipt', icon: 'inbox' },
      { id: 'lote', label: 'Component', icon: 'layers' },
      { id: 'mon', label: 'Assembly', icon: 'wrench' },
      { id: 'eq', label: 'Units', icon: 'cpu', count: UNITS.length },
      { id: 'cli', label: 'Customers', icon: 'building' }
    ],
    nodes,
    edges,
    systems: ['SAP S/4HANA', 'MES Opcenter', 'PLM Windchill', 'Salesforce Service'],
    genSub: `1 goods receipt · 3 assembly batches · ${UNITS.length} units · 11 customers`,
    steps: [
      { agent: 'trace', system: 'SAP S/4HANA', action: 'Locates the starting point', result: 'KJ-80 seal kit (ref. 7710-0480) · Sellados Ibéricos, S.A. · 1,200 seals', ms: 190, reveal: 0, mark: 'Starting point located' },
      { agent: 'trace', system: 'SAP S/4HANA', action: 'Backwards: supplier, purchase order, goods receipt and inspection', result: 'PO 4500391022 · delivery note SI-AL-26-5521 (21/07) · supplier batch SI-26-1187 · 3.1 certificate · 24 scrapped for flash on the lip', ms: 460, reveal: 1, mark: 'Backward trace complete' },
      { agent: 'trace', system: 'MES Opcenter', action: 'Batch consumption in assembly orders', result: `MON-2607-22 (${monSeals('MON-2607-22')} seals), MON-2608-03 (${monSeals('MON-2608-03')}) and MON-2608-11 (${monSeals('MON-2608-11')})`, ms: 620, reveal: 2, mark: 'Assembly batches identified' },
      { agent: 'trace', system: 'PLM Windchill', action: 'As-built configuration: where the seal is fitted', result: 'PH-250: 48 per unit (main cylinder, cushion and ejector) · GH-55: 24 per unit', ms: 380, reveal: 2 },
      { agent: 'trace', system: 'SAP S/4HANA', action: 'Serial numbers of the assembled units', result: `${UNITS.length} units: ${list(byModelText(UNITS))} · ${field.length} delivered and 3 at the plant`, ms: 540, reveal: 3, mark: 'Units located by serial number' },
      { agent: 'trace', system: 'MES Opcenter', action: 'Retest of the batch presses still at the plant', result: '28/09 on BP-1: weeping on PH250-26-0476 and PH250-26-0478; PH250-26-0477 conforming and reserved for EXP-26-3318', ms: 360, tone: 'warn', reveal: 3 },
      { agent: 'trace', system: 'SAP S/4HANA', action: 'Deliveries, customers and planned shipments', result: `${field.length} units delivered to 11 customers (Spain, Portugal and France) · EXP-26-3318 planned today at 11:00`, ms: 590, tone: 'warn', reveal: 4 },
      { agent: 'trace', system: 'Salesforce Service', action: 'Installed base: final site, contracts and contacts', result: `${field.length} units at ${places} sites · ${contracts} customers with a maintenance contract · ${finalsN} units at end customers of 2 distributors`, ms: 480, reveal: 5, mark: 'Customers and sites identified' },
      { agent: 'bal', system: 'SAP S/4HANA', action: 'Batch stock, rejects and consumption', result: '72 seals in C-14-03 (not blocked) · 24 scrapped · 1,104 consumed in 3 assembly orders', ms: 420 },
      { agent: 'bal', system: 'Agentic Platform', action: 'Batch reconciliation: received versus fitted, scrapped and in stock', result: `100.0% reconciled · 0 seals unaccounted for · ${UNITS.length} of ${UNITS.length} units located`, ms: 95, tone: 'ok', mark: 'Batch reconciliation closed' },
      { agent: 'rec', system: 'Salesforce Service', action: 'Opens field campaign CC-2026-07 with one service order per unit', result: `Campaign CC-2026-07 in draft · ${field.length} service orders not released`, ms: 360 },
      { agent: 'rec', system: 'Outlook', action: 'Prepares the notices without sending them', result: '12 notices (11 customers in Spanish, Portuguese and French, plus the supplier) pending approval', ms: 720, mark: 'Record and notices prepared' }
    ],
    located: { label: 'Units located', value: `${UNITS.length} of ${UNITS.length}`, sub: `${field.length} in the field · 3 at the plant · 72 seals in stock`, icon: 'cpu', short: `${UNITS.length} of ${UNITS.length} units located (${field.length} in the field at 11 customers and 3 at the plant) and 72 seals in stock` },
    kpiNotify: { label: 'Customers to notify', value: 11, sub: '1 shipment to hold · today 11:00' },
    balance: {
      title: 'Batch reconciliation',
      kpiLabel: 'Batch reconciliation',
      sub: 'Seals from the batch from goods receipt to unit · consumption in MES Opcenter, stock and rejects in SAP',
      head: 'Component batch',
      headSide: '1 goods receipt · 3 assembly batches',
      labels: { in: 'Received', losses: 'Scrapped at inspection', out: 'Fitted in units', stock: 'In stock' },
      detailTitle: 'Detail by flow',
      criterio: 'Criterion: any unexplained difference is shown as is, not spread. Each consumption cites the assembly order that declares it in MES Opcenter; each unit, its serial number in SAP.',
      reportText: 'Consumption declared in MES Opcenter by assembly order; stock and rejects in SAP S/4HANA (QM); serial numbers and deliveries in SAP SD; installed base in Salesforce Service.',
      flows: [
        {
          key: 'REC', seg: 'Goods receipt', main: true, unit: 'seals', colLabel: 'Seals',
          title: `Goods receipt EM 5000812744 → batch ${LOT}`,
          inLabel: 'Received · EM 5000812744', inSub: '21/07/2026 08:40 · Sellados Ibéricos, S.A. · PO 4500391022', inStage: 'SAP MM', inQty: 1200,
          phases: [{ title: 'Incoming inspection (SAP QM, ISO 2859-1 sampling level II, 80 seals)', date: '2026-07-21', stages: [['QM-REC', 'Flash on the lip (scrapped)', 24]] }],
          outs: [
            { label: 'Consumed in MON-2607-22', sub: `${monText('MON-2607-22')}`, stage: 'Opcenter', qty: monSeals('MON-2607-22') },
            { label: 'Consumed in MON-2608-03', sub: `${monText('MON-2608-03')}`, stage: 'Opcenter', qty: monSeals('MON-2608-03') },
            { label: 'Consumed in MON-2608-11', sub: `${monText('MON-2608-11')}`, stage: 'Opcenter', qty: monSeals('MON-2608-11') },
            { label: 'Stock in store C-14-03', sub: 'Available for assembly (not blocked)', stage: 'SAP WM', qty: 72, kind: 'stock' }
          ]
        },
        flowOfMon('MON-2607-22'),
        flowOfMon('MON-2608-03'),
        flowOfMon('MON-2608-11')
      ],
      product: {
        title: 'Units assembled with the batch',
        side: `${UNITS.length} units · ${field.length} in the field · 3 at the plant`,
        cols: [
          { label: 'Assembly batch', key: 'lot', mono: true, sub: 'product' },
          { label: 'Assembled', key: 'made', num: true, sub: 'madeSub' },
          { label: 'In the field', key: 'field', num: true, sub: 'fieldSub' },
          { label: 'At the plant', key: 'plant', num: true, sub: 'plantSub' },
          { label: 'Difference', key: 'diff', num: true },
          { label: 'Located', key: 'located', num: true, ok: true }
        ],
        rows: monRows
      }
    },
    units: {
      title: 'Units and serial numbers',
      sub: `${UNITS.length} units · 1,104 seals fitted · SAP S/4HANA and Salesforce Service`,
      icon: 'cpu',
      csvLabel: 'Serial numbers (CSV)',
      csvName: 'serial-numbers',
      byLoc: { label: 'By location', refLabel: 'Batch', whereLabel: 'Location', nLabel: 'Units', qtyLabel: 'Seals', actionLabel: 'Action in a real campaign', rows: locRows },
      list: {
        label: 'Serial numbers',
        cols: [
          { label: 'Serial no.', key: 'serial', mono: true, sub: 'model' },
          { label: 'Assembly batch', key: 'mon', sub: 'monDate' },
          { label: 'Seals', key: 'juntas', num: true },
          { label: 'Customer', key: 'cliente', sub: 'pais' },
          { label: 'Site', key: 'place' },
          { label: 'Delivery', key: 'entrega', sub: 'ship' },
          { label: 'Status', key: 'estado', chip: true },
          { label: 'Action in a real campaign', key: 'accion' }
        ],
        rows: unitRows
      }
    },
    customers: {
      title: 'Customers to notify',
      sub: `11 customers with ${field.length} units in the field · batch supplier · 1 planned shipment to hold`,
      items,
      holdsTitle: 'Actions at the plant',
      holds: [
        { icon: 'truck', tone: 'crit', title: 'Hold EXP-26-3318 at dock 2', meta: ['today at 11:00', '1 PH-250 (PH250-26-0477)', 'Prensados Levante, S.L.'], body: 'In a real campaign, the dispatch supervisor does not load the press: its 48 seals are replaced with a verified batch and the bench test is repeated before delivery.' },
        { icon: 'lock', tone: 'warn', title: 'Block the 72 seals in C-14-03 before the 14:00 assembly', meta: ['today', `batch ${LOT}`, 'SAP QM'], body: 'They are still available for assembly: in a real campaign they are blocked in SAP QM and a sample of 20 is set aside for the laboratory. Serial numbers in the “Serial numbers” tab and in the CSV.' }
      ]
    },
    approval: {
      titlePrefix: 'Field campaign and drill notices',
      scope: [
        { label: 'Customers with units in the field', value: `11 customers · ${field.length} units (${list(byModelText(field))})`, status: 'pending', chip: '11' },
        { label: 'Planned shipments to hold', value: 'EXP-26-3318 · today 11:00 · PH250-26-0477' },
        { label: 'Units and seals at the plant that would be blocked', value: '2 weeping PH-250 · 72 seals in C-14-03', status: 'evaluate', chip: 'No block in a drill' },
        { label: 'Supplier', value: 'Sellados Ibéricos, S.A. · 8D complaint (batch SI-26-1187)' }
      ],
      effects: [
        'Outlook: 12 notices saved as drafts marked SIMULACRO (drill) in Spanish, Portuguese and French; nothing is sent',
        `Salesforce Service: campaign CC-2026-07 and ${field.length} service orders in draft, not released`,
        'SAP QM: no changes; a drill does not block stock or units',
        'Record {code} approved with the time taken by each activity'
      ]
    },
    report: {
      objeto: 'Field campaign drill starting from {label}. It checks backward traceability (supplier, purchase order, goods receipt and inspection) and forward traceability (assembly batches, serial numbers, deliveries, customers and sites), with the seal reconciliation for the batch.',
      noAction: 'The exercise does not block stock, does not release service orders and does not send notices.',
      results: [
        `11 customers with units in the field in Spain, Portugal and France (${finalsN} units at end customers of 2 distributors) and 1 planned shipment that would be held.`,
        'Two presses from the batch still at the plant weep in the 28/09 retest: same seal as the press in the complaint (REC-2026-0187).',
        'The supplier Sellados Ibéricos would receive an 8D complaint about its batch SI-26-1187.'
      ],
      back: {
        cols: [{ label: 'Stage', key: 'etapa' }, { label: 'Reference', key: 'ref', mono: true }, { label: 'Date', key: 'fecha' }, { label: 'Detail', key: 'det' }],
        rows: [
          { etapa: 'Supplier', ref: 'PRV-10482', fecha: 'Approved 2019', det: 'Sellados Ibéricos, S.A. · Rubí (Barcelona) · last process audit on 12/03/2026' },
          { etapa: 'Supplier batch', ref: 'SI-26-1187', fecha: '14/07/2026', det: '92 Shore A polyurethane with NBR lip · 3.1 material certificate' },
          { etapa: 'Purchase order', ref: '4500391022', fecha: '30/06/2026', det: '1,200 seals from the KJ-80 kit (ref. 7710-0480)' },
          { etapa: 'Goods receipt', ref: 'EM 5000812744', fecha: '21/07/2026 08:40', det: 'Delivery note SI-AL-26-5521 · 10 boxes' },
          { etapa: 'Inspection', ref: '010000488173', fecha: '21/07/2026 11:15', det: 'ISO 2859-1 sampling, level II (80 seals): dimensions and hardness conforming · 24 scrapped for flash on the lip' },
          { etapa: 'Batch', ref: LOT, fecha: '22/07/2026', det: '1,176 seals released to C-14-03' }
        ]
      },
      fwd: {
        cols: [{ label: 'Assembly batch', key: 'mon', mono: true }, { label: 'Serial no.', key: 'serial', mono: true }, { label: 'Customer', key: 'cliente' }, { label: 'Site', key: 'place' }, { label: 'Delivery', key: 'entrega' }, { label: 'Status', key: 'estado' }],
        rows: unitRows
      },
      conclusion: 'Conclusion: the information needed for a field campaign is obtained in full and the batch reconciles seal by seal. Proposed improvements: verify the contacts of the distributors’ end customers and add the component batch to the unit’s digital nameplate.',
      note: 'Drill: no stock has been blocked in SAP QM, no service order has been released and no notice has been sent. Synthetic demonstration data.'
    },
    audit: { back: 'supplier Sellados Ibéricos · batch SI-26-1187 · goods receipt EM 5000812744', fwd: `${UNITS.length} units · 3 assembly batches · 11 customers · 1 planned shipment` },
    say: [
      'What needs action: EXP-26-3318 (today 11:00) would be held, and the 72 seals in stock and the 2 weeping presses would be blocked.',
      'The notices are prepared in each customer’s language (Spanish, Portuguese and French), with the serial number and the final site, plus the 8D complaint to the supplier. Nothing is sent in a drill. Quality decides.'
    ]
  };

  agenticPackEn('maquinaria', {
    retirada: {
      title: 'Field campaign drill',
      nav: 'Traceability drill',
      section: 'Calidad',
      desc: 'Traceability exercise for field campaigns: backward and forward genealogy, from the component batch to the serial number and the customer, batch reconciliation and customers to notify, starting from a component batch or a serial number.',
      place: 'Zaragoza plant',
      approver: 'Quality manager',
      regPrefix: 'SR-2026-',
      agents: { trace: 'Traceability', bal: 'Batch reconciliation', rec: 'Campaign and notices' },
      targetText: 'Illustrative target: 4 h',
      todayEstimate: '2–6 h',
      timerRef: 'Demo target: 4 h',
      packLabel: 'Download campaign pack',
      setup: { title: 'Starting point', sub: 'A component batch or a unit’s serial number' },
      modes: {
        lote: { label: 'Component batch', noun: 'the batch', field: 'Component batch code', icon: 'layers', format: 'JNT-2607-031', where: 'SAP S/4HANA' },
        serie: { label: 'Serial number', noun: 'the serial number', field: 'Unit serial number', icon: 'hash', format: 'PH250-26-0412', where: 'SAP S/4HANA and Salesforce Service' }
      },
      entries: [
        { mode: 'lote', code: LOT, scope: 'jnt', label: `Batch ${LOT}`, option: 'KJ-80 seal kit · Sellados Ibéricos' },
        { mode: 'serie', code: 'PH250-26-0412', scope: 'jnt', label: 'Serial no. PH250-26-0412', option: 'PH-250 · Prensas y Servicios del Norte → Estampaciones Nervión', headline: `PH-250 press from complaint REC-2026-0187 · main cylinder seals from batch ${LOT} → the whole batch is traced`, startNode: 'E1', startResult: `PH-250 delivered on 04/08/2026 (Prensas y Servicios del Norte → Estampaciones Nervión) · seals from batch ${LOT} → the whole batch is traced` }
      ],
      examples: [
        { mode: 'lote', code: LOT, label: `Batch ${LOT}` },
        { mode: 'serie', code: 'PH250-26-0412', label: 'Serial no. PH250-26-0412' }
      ],
      reference: {
        title: 'Audit reference',
        sub: 'Target of the exercise; Quality confirms the requirements of its certification and its customers',
        items: [
          ['ISO 9001:2015', 'Clause 8.5.2: identification and traceability of the product. Illustrative target of the exercise: from component batch to customer in 4 hours.'],
          ['Machinery', 'Machinery Directive 2006/42/EC (and Regulation (EU) 2023/1230, applicable from 20/01/2027): if a risk is detected, the manufacturer takes corrective measures and, if it is serious, informs the market surveillance authority.'],
          ['OEM customers', 'Field campaigns with traceability by serial number and 8D with the supplier (PR-POS-005 and PR-CAL-008). Quality validates the applicable protocol.']
        ],
        note: 'A drill does not block stock, release service orders or send notices: it measures whether the information is obtained in full, reconciles and arrives on time.'
      },
      legend: { planned: 'Planned shipment: hold', click: 'Click the batch to see its full trace' },
      notice: { title: 'Field campaign drill' },
      approval: { policy: 'PR-POS-005 · launching a field campaign or holding units requires Quality approval', approveLabel: 'Approve and close drill', rejectPlaceholder: 'For example: the contact at a distributor’s end customer still needs confirming' },
      clock: { title: 'Stopwatch against the audit', sub: 'Simulation times; not performance measurements of the systems' },
      report: { subtitle: 'Record of the traceability and field campaign exercise · ISO 9001 · PR-POS-005' },
      compare: {
        rows: [
          { k: 'People involved', today: '3–4: Quality, After-sales, Production and Logistics', agentic: '1: {approver} reviews and approves' },
          { k: 'Systems queried', today: '5–6 opened by hand: SAP, Opcenter, Windchill, Salesforce, spreadsheets and email', agentic: '5 connectors queried by the agents: SAP S/4HANA, MES Opcenter, PLM Windchill, Salesforce Service and Outlook' },
          { k: 'Steps', today: '15–20 queries, cross-checks by serial number and manual calculations', agentic: '{steps} automatic steps and 1 approval' },
          { k: 'Batch reconciliation', today: 'Spreadsheet with consumption, stock and rejects', agentic: 'Calculated by assembly order: {reconciled} reconciled' }
        ]
      },
      presenter: {
        idle: [
          'Field campaign drill with traceability and batch reconciliation; in the pilot, Quality confirms the protocol and we measure the real time.',
          'Choose the starting point: seal batch JNT-2607-031 or the serial number of the press that was leaking oil.',
          'Agentic Platform goes through SAP, Opcenter, Windchill and Salesforce backwards to the supplier and forwards to every serial number and customer, and reconciles the batch seal by seal.'
        ],
        nextIdle: 'Click “Start drill” with batch JNT-2607-031 (or choose “Serial no. PH250-26-0412”).',
        nextRun: 'Click “View notice” for a Portuguese or French customer and then “Approve and close drill”.',
        nextDone: '“Download campaign pack”: serial numbers CSV and printable record. Then “Customer questionnaire” (right arrow).'
      },
      scopes: { jnt: scope }
    }
  });
})();
