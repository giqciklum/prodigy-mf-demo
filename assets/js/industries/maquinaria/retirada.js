/*
 * Hidromec Ebro · simulacro de trazabilidad: campaña de campo por el lote de juntas JNT-2607-031.
 * 1.200 juntas recibidas → 24 desechadas en inspección, 72 en almacén y 1.104 montadas en 3 lotes de montaje
 * (MON-2607-22, MON-2608-03, MON-2608-11) → 26 equipos (20 PH-250 y 6 GH-55): 23 en campo en 11 clientes de
 * España, Portugal y Francia y 3 PH-250 en planta. Mismos equipos que CN_DATA.trace y la reclamación REC-2026-0187.
 * Datos sintéticos de demostración (MFM).
 */
(function () {
  'use strict';

  const LOT = 'JNT-2607-031';
  const PER = { 'PH-250': 48, 'GH-55': 24 };
  const MODEL_NAME = { 'PH-250': 'Prensa hidráulica PH-250', 'GH-55': 'Grupo hidráulico GH-55' };
  const MON = {
    'MON-2607-22': { dates: '27–31/07/2026', line: 'LM-2 (prensas) y LM-1 (grupos)', test: '2026-07-31' },
    'MON-2608-03': { dates: '03–07/08/2026', line: 'LM-2 (prensas) y LM-1 (grupos)', test: '2026-08-10' },
    'MON-2608-11': { dates: '11–14/08/2026', line: 'LM-2 (prensas) y LM-1 (grupos)', test: '2026-08-18' }
  };

  const CUSTOMERS = {
    psn: { label: 'Prensas y Servicios del Norte, S.L.', city: 'Bilbao', country: 'ES', kind: 'Distribuidor', lang: 'es', contact: 'Calidad y servicio técnico', contract: true },
    eri: { label: 'Estampaciones Riojanas, S.A.', city: 'Logroño', country: 'ES', kind: 'Cliente directo · estampación', lang: 'es', contact: 'Mantenimiento', contract: true },
    fci: { label: 'Forjas del Cinca, S.L.', city: 'Monzón (Huesca)', country: 'ES', kind: 'Cliente directo · forja', lang: 'es', contact: 'Mantenimiento', contract: true },
    mva: { label: 'Metalúrgica Vallès, S.A.', city: 'Terrassa (Barcelona)', country: 'ES', kind: 'Cliente directo · metalurgia', lang: 'es', contact: 'Ingeniería de planta', contract: false },
    ple: { label: 'Prensados Levante, S.L.', city: 'Paterna (Valencia)', country: 'ES', kind: 'Cliente directo · estampación', lang: 'es', contact: 'Gerencia', contract: false },
    cna: { label: 'Composites Navarra, S.L.', city: 'Tudela (Navarra)', country: 'ES', kind: 'Cliente directo · composites', lang: 'es', contact: 'Mantenimiento', contract: false },
    hca: { label: 'Hidráulica Castellana, S.L.', city: 'Valladolid', country: 'ES', kind: 'Distribuidor', lang: 'es', contact: 'Servicio técnico', contract: false },
    mav: { label: 'Metalomecânica do Ave, Lda.', city: 'Guimarães', country: 'PT', kind: 'Cliente directo · metalomecánica', lang: 'pt', contact: 'Qualidade', contract: true },
    elu: { label: 'Estamparia Lusitana, S.A.', city: 'Aveiro', country: 'PT', kind: 'Cliente directo · estampación', lang: 'pt', contact: 'Manutenção', contract: false },
    ega: { label: 'Emboutissage Garonne SAS', city: 'Toulouse', country: 'FR', kind: 'Cliente directo · aeronáutica', lang: 'fr', contact: 'Qualité fournisseurs', contract: false },
    pra: { label: 'Presses Rhône-Alpes SARL', city: 'Saint-Étienne', country: 'FR', kind: 'Distribuidor', lang: 'fr', contact: 'Service après-vente', contract: false }
  };
  const COUNTRY = { ES: 'España', PT: 'Portugal', FR: 'Francia' };
  const LANG = { es: 'Español', pt: 'Portugués', fr: 'Francés' };

  /* Equipos montados con el lote (mismos que CN_DATA.trace): [n.º de serie, lote de montaje, estado, cliente, entrega, emplazamiento, albarán] */
  const UNITS = [
    ['PH250-26-0405', 'MON-2607-22', 'campo', 'psn', '2026-08-03', 'Talleres Arratia · Igorre (Bizkaia)', '80041962'],
    ['PH250-26-0407', 'MON-2607-22', 'campo', 'eri', '2026-08-05', 'Logroño', '80041985'],
    ['PH250-26-0408', 'MON-2607-22', 'campo', 'fci', '2026-08-06', 'Monzón (Huesca)', '80041990'],
    ['PH250-26-0410', 'MON-2607-22', 'campo', 'mav', '2026-08-10', 'Guimarães (Portugal)', '80042011'],
    ['PH250-26-0412', 'MON-2607-22', 'campo', 'psn', '2026-08-04', 'Estampaciones Nervión · Basauri (Bizkaia)', '80041977'],
    ['PH250-26-0413', 'MON-2607-22', 'campo', 'mva', '2026-08-07', 'Terrassa (Barcelona)', '80041996'],
    ['PH250-26-0415', 'MON-2607-22', 'campo', 'ple', '2026-08-11', 'Paterna (Valencia)', '80042018'],
    ['PH250-26-0416', 'MON-2607-22', 'campo', 'ega', '2026-08-14', 'Toulouse (Francia)', '80042040'],
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
    ['GH55-26-0148', 'MON-2608-11', 'campo', 'pra', '2026-09-09', 'Saint-Étienne (Francia)', '80042281'],
    ['PH250-26-0476', 'MON-2608-11', 'planta', null, null, 'Almacén de producto terminado ALM-PT · rezume en BP-1 (28/09)', null],
    ['PH250-26-0477', 'MON-2608-11', 'planificado', 'ple', '2026-09-29', 'Muelle 2 · salida hoy 11:00', 'EXP-26-3318'],
    ['PH250-26-0478', 'MON-2608-11', 'planta', null, null, 'Almacén de producto terminado ALM-PT · rezume en BP-1 (28/09)', null]
  ].map(([serial, mon, status, cust, date, place, ship]) => {
    const model = serial.slice(0, 2) === 'PH' ? 'PH-250' : 'GH-55';
    return { serial, mon, model, status, cust, date, place, ship, juntas: PER[model] };
  });

  const fmtD = (iso) => (iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}` : '');
  const dm = (iso) => (iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}` : '');
  const n0 = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const plural = (n, a, b) => `${n0(n)} ${n === 1 ? a : b}`;
  const list = (a) => (a.length < 2 ? (a[0] || '') : `${a.slice(0, -1).join(', ')} y ${a[a.length - 1]}`);
  const sum = (a, f) => a.reduce((s, x) => s + f(x), 0);
  const of = (pred) => UNITS.filter(pred);
  const field = of((u) => u.status === 'campo');
  const planned = of((u) => u.status === 'planificado');

  /* ---------------------------------------------------------------- Avisos por idioma */

  const KIT = 'kit de juntas hidráulicas KJ-80 (PU/NBR, ref. 7710-0480)';
  const T = {
    es: {
      subj: (n) => `[SIMULACRO] Campaña de campo CC-2026-07 · sustitución preventiva de juntas · ${plural(n, 'equipo', 'equipos')}`,
      greet: (c) => `Estimado equipo de ${c.contact.toLowerCase()} de ${c.label}:`,
      intro: 'Les comunicamos una campaña de campo preventiva que afecta a los siguientes equipos suministrados por Hidromec Ebro:',
      item: (u) => [`Equipo: ${MODEL_NAME[u.model]} · n.º de serie ${u.serial}`, `Entregado: ${fmtD(u.date)} (albarán ${u.ship}) · emplazamiento: ${u.place}`, `Componente afectado: ${KIT} del lote ${LOT} · ${u.juntas} juntas por equipo`].join('\n'),
      ask: 'Hasta la intervención, les pedimos que revisen al inicio de cada turno si hay fugas o rezume de aceite en el vástago y la tapa del cilindro principal y que, si los observan, detengan el equipo y lo consignen (bloqueo y etiquetado). Nuestro servicio técnico les llamará en un plazo de 48 h para programar la sustitución de las juntas con un lote verificado, sin coste.',
      planned: (u) => `La entrega de la ${MODEL_NAME[u.model].toLowerCase()} ${u.serial} prevista para hoy a las 11:00 (${u.ship}) queda retenida en nuestras instalaciones hasta sustituir sus juntas y repetir la prueba en banco. Les confirmaremos la nueva fecha.`,
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
      item: (u) => [`Équipement : ${u.model === 'PH-250' ? 'Presse hydraulique PH-250' : 'Groupe hydraulique GH-55'} · n° de série ${u.serial}`, `Livré le ${fmtD(u.date)} (bon de livraison ${u.ship}) · site : ${u.place}`, `Composant concerné : kit de joints hydrauliques KJ-80 (PU/NBR, réf. 7710-0480), lot ${LOT}`].join('\n'),
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
    const body = [`En campo: ${list(byModelText(fu))} (${list(fu.map((u) => u.serial))}), entregados ${list(fu.map((u) => dm(u.date)).filter((d, i, a) => a.indexOf(d) === i))}.`];
    if (finals.length) body.push(`Clientes finales: ${list(finals)}.`);
    if (fu.some((u) => u.serial === 'PH250-26-0412')) body.push('Incluye la prensa de la reclamación REC-2026-0187.');
    pu.forEach((u) => body.push(`Planificado: ${u.serial} en ${u.ship}, hoy a las 11:00: retener.`));
    return {
      id,
      label: c.label,
      icon: 'building',
      notify: true,
      channel: `Correo + llamada del servicio técnico${c.contract ? ' (contrato de mantenimiento)' : ''}`,
      meta: [`${c.city} · ${COUNTRY[c.country]}`, c.kind, `Aviso en ${LANG[c.lang].toLowerCase()}`],
      body: body.join(' '),
      notice: noticeOf(id),
      refs: fu.concat(pu).map((u) => u.serial).join(', '),
      qtyText: plural(fu.length, 'equipo', 'equipos'),
      action: `Campaña de campo (${LANG[c.lang].toLowerCase()})${pu.length ? ' y retención de entrega' : ''}`
    };
  });
  items.push({
    id: 'proveedor',
    label: 'Sellados Ibéricos, S.A. (proveedor del lote)',
    icon: 'factory',
    notify: false,
    chip: 'Reclamar 8D',
    channel: 'Portal de proveedores SAP Ariba + correo',
    meta: ['Rubí (Barcelona) · España', 'Proveedor homologado desde 2019', 'Aviso en español'],
    body: 'Reclamación al proveedor con 8D (PR-CAL-008): bloqueo de su lote SI-26-1187, certificados 3.1 de dureza y dimensional, y muestra de 20 juntas del almacén C-14-03 para ensayo en laboratorio.',
    notice: {
      lang: 'Español',
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
    qtyText: '1.200 juntas',
    action: 'Reclamación 8D al proveedor'
  });

  /* ---------------------------------------------------------------- Genealogía */

  const monUnits = (k) => UNITS.filter((u) => u.mon === k);
  const monSeals = (k) => sum(monUnits(k), (u) => u.juntas);
  const monText = (k) => list(byModelText(monUnits(k)));
  const fieldOfMon = (k) => field.filter((u) => u.mon === k);
  const firstLast = (us) => { const d = us.map((u) => u.date).sort(); return `${dm(d[0])}–${dm(d[d.length - 1])}`; };
  const nodes = [
    { id: 'S', stage: 'prov', kicker: 'Proveedor', title: 'Sellados Ibéricos, S.A.', sub: 'Rubí (Barcelona) · homologado', meta: 'Lote del proveedor SI-26-1187', reveal: 1 },
    { id: 'R', stage: 'rec', kicker: 'Recepción', title: 'EM 5000812744', mono: true, sub: '21/07 08:40 · 1.200 juntas', meta: 'Pedido 4500391022 · albarán SI-AL-26-5521', reveal: 1 },
    { id: 'L', stage: 'lote', kicker: 'Lote de componente', title: LOT, mono: true, lot: LOT, sub: 'Kit de juntas KJ-80 (PU/NBR)', meta: '24 desechadas · 72 en C-14-03', reveal: 1 },
    { id: 'M1', stage: 'mon', kicker: 'Lote de montaje', title: 'MON-2607-22', mono: true, sub: `${monText('MON-2607-22')} · ${monSeals('MON-2607-22')} juntas`, meta: 'LM-2 y LM-1 · 27–31/07', reveal: 2 },
    { id: 'M2', stage: 'mon', kicker: 'Lote de montaje', title: 'MON-2608-03', mono: true, sub: `${monText('MON-2608-03')} · ${monSeals('MON-2608-03')} juntas`, meta: 'LM-2 y LM-1 · 03–07/08', reveal: 2 },
    { id: 'M3', stage: 'mon', kicker: 'Lote de montaje', title: 'MON-2608-11', mono: true, sub: `${monText('MON-2608-11')} · ${monSeals('MON-2608-11')} juntas`, meta: 'LM-2 y LM-1 · 11–14/08', reveal: 2 },
    { id: 'E1', stage: 'eq', kicker: 'Equipos', title: `${fieldOfMon('MON-2607-22').length} en campo`, sub: monText('MON-2607-22'), meta: `Entregados ${firstLast(fieldOfMon('MON-2607-22'))} · incluye PH250-26-0412`, alert: 'Prensa reclamada', tone: 'shipped', reveal: 3 },
    { id: 'E2', stage: 'eq', kicker: 'Equipos', title: `${fieldOfMon('MON-2608-03').length} en campo`, sub: list(byModelText(fieldOfMon('MON-2608-03'))), meta: `Entregados ${firstLast(fieldOfMon('MON-2608-03'))}`, tone: 'shipped', reveal: 3 },
    { id: 'E3', stage: 'eq', kicker: 'Equipos', title: `${fieldOfMon('MON-2608-11').length} en campo`, sub: list(byModelText(fieldOfMon('MON-2608-11'))), meta: `Entregados ${firstLast(fieldOfMon('MON-2608-11'))}`, tone: 'shipped', reveal: 3 },
    { id: 'E3p', stage: 'eq', kicker: 'Equipos', title: '1 planificado', sub: 'PH250-26-0477', meta: 'EXP-26-3318 · hoy 11:00', alertTone: true, alert: 'Retener en muelle 2', tone: 'planned', reveal: 3 },
    { id: 'E3s', stage: 'eq', kicker: 'Equipos', title: '2 retenidos en planta', sub: 'PH250-26-0476 y 0478', meta: 'Rezume en BP-1 (28/09)', alertTone: true, tone: 'stock', reveal: 3 }
  ];
  ORDER.forEach((id) => {
    const c = CUSTOMERS[id];
    const n = field.filter((u) => u.cust === id).length;
    nodes.push({ id: `C:${id}`, stage: 'cli', kicker: 'Cliente', title: c.label, sub: `${c.city} · ${COUNTRY[c.country]}`, meta: plural(n, 'equipo en campo', 'equipos en campo'), tone: 'customer', reveal: 5 });
  });
  const edges = [['S', 'R'], ['R', 'L'], ['L', 'M1'], ['L', 'M2'], ['L', 'M3'], ['M1', 'E1'], ['M2', 'E2'], ['M3', 'E3'], ['M3', 'E3p'], ['M3', 'E3s']];
  const groupOf = (u) => (u.mon === 'MON-2607-22' ? 'E1' : u.mon === 'MON-2608-03' ? 'E2' : 'E3');
  field.forEach((u) => { const g = groupOf(u); if (!edges.some((e) => e[0] === g && e[1] === `C:${u.cust}`)) edges.push([g, `C:${u.cust}`]); });
  edges.push(['E3p', 'C:ple']);

  /* ---------------------------------------------------------------- Tablas */

  const statusChip = (u) => (u.serial === 'PH250-26-0412' ? { status: 'critical', label: 'Fuga reclamada' } : u.status === 'campo' ? { status: 'shipped', label: 'En campo' } : u.status === 'planificado' ? { status: 'pending', label: 'Expedición planificada' } : { status: 'hold', label: 'Retenido · rezume' });
  const unitRows = UNITS.map((u) => ({
    serial: u.serial,
    model: MODEL_NAME[u.model],
    mon: u.mon,
    monDate: MON[u.mon].dates,
    juntas: u.juntas,
    cliente: u.cust ? CUSTOMERS[u.cust].label : 'Hidromec Ebro (planta)',
    pais: u.cust ? COUNTRY[CUSTOMERS[u.cust].country] : 'España',
    place: u.place,
    entrega: u.status === 'campo' ? fmtD(u.date) : u.status === 'planificado' ? 'Prevista hoy 11:00' : '—',
    ship: u.ship ? (u.status === 'campo' ? `Albarán ${u.ship}` : u.ship) : '—',
    estado: statusChip(u),
    accion: u.status === 'campo' ? 'Aviso y sustitución de juntas en campo' : u.status === 'planificado' ? `Retener ${u.ship} y sustituir juntas` : 'Bloquear en SAP QM (NC-2026-0234) y sustituir juntas'
  }));

  const monRows = Object.keys(MON).map((k) => {
    const us = monUnits(k);
    const f = us.filter((u) => u.status === 'campo');
    const p = us.filter((u) => u.status !== 'campo');
    return { lot: k, product: `${monText(k)} · ${MON[k].dates}`, made: us.length, madeSub: `${monSeals(k)} juntas`, field: f.length, fieldSub: plural(new Set(f.map((u) => u.cust)).size, 'cliente', 'clientes'), plant: p.length, plantSub: p.map((u) => u.serial.slice(-4)).join(' · ') || 'Ninguno', diff: 0, located: '100,0 %' };
  });

  const countries = (us) => list(Array.from(new Set(us.map((u) => COUNTRY[CUSTOMERS[u.cust].country]))));
  const nCust = (us) => new Set(us.map((u) => u.cust)).size;
  const locRows = [
    { ref: LOT, tag: true, where: 'Almacén de componentes C-14-03', whereSub: 'Disponibles para montaje · muestra de 20 para laboratorio', n: null, qty: 72, action: 'Bloquear en SAP QM (stock bloqueado)', tone: 'warn' }
  ].concat(Object.keys(MON).map((k) => {
    const f = fieldOfMon(k);
    return { ref: k, where: 'En campo', whereSub: `${plural(nCust(f), 'cliente', 'clientes')} · ${countries(f)}`, n: f.length, qty: sum(f, (u) => u.juntas), action: 'Aviso al cliente y sustitución en campo', tone: 'warn' };
  })).concat([
    { ref: 'MON-2608-11', where: 'Muelle 2 · EXP-26-3318', whereSub: 'PH250-26-0477 · salida hoy 11:00 · Prensados Levante', n: 1, qty: 48, action: 'Retener EXP-26-3318 (hoy 11:00)', tone: 'crit' },
    { ref: 'MON-2608-11', where: 'Almacén de producto terminado ALM-PT', whereSub: 'PH250-26-0476 y PH250-26-0478 · rezume en BP-1', n: 2, qty: 96, action: 'Bloquear en SAP QM (NC-2026-0234) y sustituir juntas', tone: '' }
  ]);

  const places = new Set(field.map((u) => u.place)).size;
  const contracts = Object.keys(CUSTOMERS).filter((k) => CUSTOMERS[k].contract).length;
  const finalsN = field.filter((u) => /·/.test(u.place)).length;
  const flowOfMon = (k) => {
    const us = monUnits(k);
    const f = fieldOfMon(k);
    const outs = [{ label: `${list(byModelText(f))} en campo`, sub: `${plural(nCust(f), 'cliente', 'clientes')} · ${countries(f)}`, stage: 'SAP SD', qty: sum(f, (u) => u.juntas) }];
    us.filter((u) => u.status === 'planificado').forEach((u) => outs.push({ label: `${u.serial} · expedición planificada`, sub: `${u.ship} · hoy 11:00 · muelle 2`, stage: 'SAP SD', qty: u.juntas, kind: 'stock' }));
    const held = us.filter((u) => u.status === 'planta');
    if (held.length) outs.push({ label: `${list(held.map((u) => u.serial))} · retenidas`, sub: 'ALM-PT · rezume en la re-prueba de BP-1', stage: 'SAP QM', qty: sum(held, (u) => u.juntas), kind: 'stock' });
    return {
      key: k, seg: k, unit: 'juntas', colLabel: 'Juntas',
      title: `Lote de montaje ${k} → ${monText(k)}`,
      inLabel: `Consumido · ${k}`, inSub: `${MON[k].line} · ${MON[k].dates}`, inStage: 'Opcenter', inQty: monSeals(k),
      phases: [{ title: 'Montaje y prueba hidráulica final (1,25 × presión nominal, 30 min) · sin mermas declaradas', date: MON[k].test, stages: [] }],
      outs
    };
  };

  const scope = {
    headline: 'Kit de juntas hidráulicas KJ-80 (PU/NBR) · Sellados Ibéricos, S.A. · 1.200 juntas recibidas el 21/07/2026',
    previewSide: '3 lotes de montaje · 26 equipos',
    startNode: 'L',
    stages: [
      { id: 'prov', label: 'Proveedor', icon: 'factory' },
      { id: 'rec', label: 'Recepción', icon: 'inbox' },
      { id: 'lote', label: 'Componente', icon: 'layers' },
      { id: 'mon', label: 'Montaje', icon: 'wrench' },
      { id: 'eq', label: 'Equipos', icon: 'cpu', count: UNITS.length },
      { id: 'cli', label: 'Clientes', icon: 'building' }
    ],
    nodes,
    edges,
    systems: ['SAP S/4HANA', 'MES Opcenter', 'PLM Windchill', 'Salesforce Service'],
    genSub: `1 recepción · 3 lotes de montaje · ${UNITS.length} equipos · 11 clientes`,
    steps: [
      { agent: 'trace', system: 'SAP S/4HANA', action: 'Localiza el punto de partida', result: 'Kit de juntas KJ-80 (ref. 7710-0480) · Sellados Ibéricos, S.A. · 1.200 juntas', ms: 190, reveal: 0, mark: 'Punto de partida localizado' },
      { agent: 'trace', system: 'SAP S/4HANA', action: 'Hacia atrás: proveedor, pedido, recepción e inspección', result: 'Pedido 4500391022 · albarán SI-AL-26-5521 (21/07) · lote del proveedor SI-26-1187 · certificado 3.1 · 24 desechadas por rebaba en el labio', ms: 460, reveal: 1, mark: 'Traza hacia atrás completa' },
      { agent: 'trace', system: 'MES Opcenter', action: 'Consumos del lote en órdenes de montaje', result: `MON-2607-22 (${monSeals('MON-2607-22')} juntas), MON-2608-03 (${monSeals('MON-2608-03')}) y MON-2608-11 (${monSeals('MON-2608-11')})`, ms: 620, reveal: 2, mark: 'Lotes de montaje identificados' },
      { agent: 'trace', system: 'PLM Windchill', action: 'Configuración as-built: dónde se monta la junta', result: 'PH-250: 48 por equipo (cilindro principal, cojín y extractor) · GH-55: 24 por equipo', ms: 380, reveal: 2 },
      { agent: 'trace', system: 'SAP S/4HANA', action: 'Números de serie de los equipos montados', result: `${UNITS.length} equipos: ${list(byModelText(UNITS))} · ${field.length} entregados y 3 en planta`, ms: 540, reveal: 3, mark: 'Equipos localizados por número de serie' },
      { agent: 'trace', system: 'MES Opcenter', action: 'Re-prueba de las prensas del lote que siguen en planta', result: '28/09 en BP-1: rezume en PH250-26-0476 y PH250-26-0478; PH250-26-0477 conforme y reservada para EXP-26-3318', ms: 360, tone: 'warn', reveal: 3 },
      { agent: 'trace', system: 'SAP S/4HANA', action: 'Entregas, clientes y expediciones planificadas', result: `${field.length} equipos entregados a 11 clientes (España, Portugal y Francia) · EXP-26-3318 planificada hoy a las 11:00`, ms: 590, tone: 'warn', reveal: 4 },
      { agent: 'trace', system: 'Salesforce Service', action: 'Base instalada: emplazamiento final, contratos y contactos', result: `${field.length} equipos en ${places} emplazamientos · ${contracts} clientes con contrato de mantenimiento · ${finalsN} equipos en clientes finales de 2 distribuidores`, ms: 480, reveal: 5, mark: 'Clientes y emplazamientos identificados' },
      { agent: 'bal', system: 'SAP S/4HANA', action: 'Existencias, rechazos y consumos del lote', result: '72 juntas en C-14-03 (sin bloquear) · 24 desechadas · 1.104 consumidas en 3 órdenes de montaje', ms: 420 },
      { agent: 'bal', system: 'Agentic Platform', action: 'Cuadre del lote: recibido frente a montado, desechado y en almacén', result: `Conciliado 100,0 % · 0 juntas sin justificar · ${UNITS.length} de ${UNITS.length} equipos localizados`, ms: 95, tone: 'ok', mark: 'Cuadre del lote cerrado' },
      { agent: 'rec', system: 'Salesforce Service', action: 'Abre la campaña de campo CC-2026-07 con una orden de servicio por equipo', result: `Campaña CC-2026-07 en borrador · ${field.length} órdenes de servicio sin liberar`, ms: 360 },
      { agent: 'rec', system: 'Outlook', action: 'Prepara los avisos sin enviar', result: '12 avisos (11 clientes en español, portugués y francés, y el proveedor) pendientes de aprobación', ms: 720, mark: 'Registro y avisos preparados' }
    ],
    located: { label: 'Equipos localizados', value: `${UNITS.length} de ${UNITS.length}`, sub: `${field.length} en campo · 3 en planta · 72 juntas en almacén`, icon: 'cpu', short: `${UNITS.length} de ${UNITS.length} equipos localizados (${field.length} en campo en 11 clientes y 3 en planta) y 72 juntas en almacén` },
    kpiNotify: { label: 'Clientes a notificar', value: 11, sub: '1 expedición a retener · hoy 11:00' },
    balance: {
      title: 'Cuadre del lote',
      kpiLabel: 'Cuadre del lote conciliado',
      sub: 'Juntas del lote de la recepción al equipo · consumos en MES Opcenter, existencias y rechazos en SAP',
      head: 'Lote de componente',
      headSide: '1 recepción · 3 lotes de montaje',
      labels: { in: 'Recibido', losses: 'Desechado en inspección', out: 'Montado en equipos', stock: 'En almacén' },
      detailTitle: 'Detalle por flujo',
      criterio: 'Criterio: la diferencia sin justificar se muestra tal cual, no se reparte. Cada consumo cita la orden de montaje que lo declara en MES Opcenter; cada equipo, su número de serie en SAP.',
      reportText: 'Consumos declarados en MES Opcenter por orden de montaje; existencias y rechazos en SAP S/4HANA (QM); números de serie y entregas en SAP SD; base instalada en Salesforce Service.',
      flows: [
        {
          key: 'REC', seg: 'Recepción', main: true, unit: 'juntas', colLabel: 'Juntas',
          title: `Recepción EM 5000812744 → lote ${LOT}`,
          inLabel: 'Recibido · EM 5000812744', inSub: '21/07/2026 08:40 · Sellados Ibéricos, S.A. · pedido 4500391022', inStage: 'SAP MM', inQty: 1200,
          phases: [{ title: 'Inspección de recepción (SAP QM, muestreo ISO 2859-1 nivel II, 80 juntas)', date: '2026-07-21', stages: [['QM-REC', 'Rebaba en el labio (desechadas)', 24]] }],
          outs: [
            { label: 'Consumo en MON-2607-22', sub: `${monText('MON-2607-22')}`, stage: 'Opcenter', qty: monSeals('MON-2607-22') },
            { label: 'Consumo en MON-2608-03', sub: `${monText('MON-2608-03')}`, stage: 'Opcenter', qty: monSeals('MON-2608-03') },
            { label: 'Consumo en MON-2608-11', sub: `${monText('MON-2608-11')}`, stage: 'Opcenter', qty: monSeals('MON-2608-11') },
            { label: 'Existencias en almacén C-14-03', sub: 'Disponibles para montaje (sin bloquear)', stage: 'SAP WM', qty: 72, kind: 'stock' }
          ]
        },
        flowOfMon('MON-2607-22'),
        flowOfMon('MON-2608-03'),
        flowOfMon('MON-2608-11')
      ],
      product: {
        title: 'Equipos montados con el lote',
        side: `${UNITS.length} equipos · ${field.length} en campo · 3 en planta`,
        cols: [
          { label: 'Lote de montaje', key: 'lot', mono: true, sub: 'product' },
          { label: 'Montados', key: 'made', num: true, sub: 'madeSub' },
          { label: 'En campo', key: 'field', num: true, sub: 'fieldSub' },
          { label: 'En planta', key: 'plant', num: true, sub: 'plantSub' },
          { label: 'Diferencia', key: 'diff', num: true },
          { label: 'Localizado', key: 'located', num: true, ok: true }
        ],
        rows: monRows
      }
    },
    units: {
      title: 'Equipos y números de serie',
      sub: `${UNITS.length} equipos · 1.104 juntas montadas · SAP S/4HANA y Salesforce Service`,
      icon: 'cpu',
      csvLabel: 'Números de serie (CSV)',
      csvName: 'numeros-de-serie',
      byLoc: { label: 'Por ubicación', refLabel: 'Lote', whereLabel: 'Ubicación', nLabel: 'Equipos', qtyLabel: 'Juntas', actionLabel: 'Acción en una campaña real', rows: locRows },
      list: {
        label: 'Números de serie',
        cols: [
          { label: 'N.º de serie', key: 'serial', mono: true, sub: 'model' },
          { label: 'Lote de montaje', key: 'mon', sub: 'monDate' },
          { label: 'Juntas', key: 'juntas', num: true },
          { label: 'Cliente', key: 'cliente', sub: 'pais' },
          { label: 'Emplazamiento', key: 'place' },
          { label: 'Entrega', key: 'entrega', sub: 'ship' },
          { label: 'Estado', key: 'estado', chip: true },
          { label: 'Acción en una campaña real', key: 'accion' }
        ],
        rows: unitRows
      }
    },
    customers: {
      title: 'Clientes a notificar',
      sub: `11 clientes con ${field.length} equipos en campo · proveedor del lote · 1 expedición planificada a retener`,
      items,
      holdsTitle: 'Acciones en planta',
      holds: [
        { icon: 'truck', tone: 'crit', title: 'Retener EXP-26-3318 en muelle 2', meta: ['hoy a las 11:00', '1 PH-250 (PH250-26-0477)', 'Prensados Levante, S.L.'], body: 'En una campaña real, el jefe de expedición no carga la prensa: se sustituyen sus 48 juntas por un lote verificado y se repite la prueba en banco antes de la entrega.' },
        { icon: 'lock', tone: 'warn', title: 'Bloquear las 72 juntas de C-14-03 antes del montaje de las 14:00', meta: ['hoy', `lote ${LOT}`, 'SAP QM'], body: 'Siguen disponibles para montaje: en una campaña real se bloquean en SAP QM y se separa una muestra de 20 para el laboratorio. Números de serie en la pestaña «Números de serie» y en el CSV.' }
      ]
    },
    approval: {
      titlePrefix: 'Campaña de campo y avisos del simulacro',
      scope: [
        { label: 'Clientes con equipos en campo', value: `11 clientes · ${field.length} equipos (${list(byModelText(field))})`, status: 'pending', chip: '11' },
        { label: 'Expediciones planificadas a retener', value: 'EXP-26-3318 · hoy 11:00 · PH250-26-0477' },
        { label: 'Equipos y juntas en planta que se bloquearían', value: '2 PH-250 con rezume · 72 juntas en C-14-03', status: 'evaluate', chip: 'Sin bloqueo en simulacro' },
        { label: 'Proveedor', value: 'Sellados Ibéricos, S.A. · reclamación 8D (lote SI-26-1187)' }
      ],
      effects: [
        'Outlook: 12 avisos guardados como borrador con la marca SIMULACRO (español, portugués y francés); no se envía nada',
        `Salesforce Service: campaña CC-2026-07 y ${field.length} órdenes de servicio en borrador, sin liberar`,
        'SAP QM: sin cambios; en un simulacro no se bloquea stock ni equipos',
        'Registro {code} aprobado con los tiempos de cada actividad'
      ]
    },
    report: {
      objeto: 'Simulacro de campaña de campo con punto de partida en {label}. Se comprueba la trazabilidad hacia atrás (proveedor, pedido, recepción e inspección) y hacia delante (lotes de montaje, números de serie, entregas, clientes y emplazamientos), con el cuadre de juntas del lote.',
      noAction: 'El ejercicio no bloquea existencias, no libera órdenes de servicio y no envía avisos.',
      results: [
        `11 clientes con equipos en campo en España, Portugal y Francia (${finalsN} equipos en clientes finales de 2 distribuidores) y 1 expedición planificada que se retendría.`,
        'Dos prensas del lote en planta rezuman en la re-prueba del 28/09: misma junta que la prensa reclamada (REC-2026-0187).',
        'El proveedor Sellados Ibéricos recibiría una reclamación 8D sobre su lote SI-26-1187.'
      ],
      back: {
        cols: [{ label: 'Etapa', key: 'etapa' }, { label: 'Referencia', key: 'ref', mono: true }, { label: 'Fecha', key: 'fecha' }, { label: 'Detalle', key: 'det' }],
        rows: [
          { etapa: 'Proveedor', ref: 'PRV-10482', fecha: 'Homologado 2019', det: 'Sellados Ibéricos, S.A. · Rubí (Barcelona) · última auditoría de proceso el 12/03/2026' },
          { etapa: 'Lote del proveedor', ref: 'SI-26-1187', fecha: '14/07/2026', det: 'Poliuretano 92 Shore A con labio de NBR · certificado de material 3.1' },
          { etapa: 'Pedido', ref: '4500391022', fecha: '30/06/2026', det: '1.200 juntas del kit KJ-80 (ref. 7710-0480)' },
          { etapa: 'Recepción', ref: 'EM 5000812744', fecha: '21/07/2026 08:40', det: 'Albarán SI-AL-26-5521 · 10 cajas' },
          { etapa: 'Inspección', ref: '010000488173', fecha: '21/07/2026 11:15', det: 'Muestreo ISO 2859-1 nivel II (80 juntas): dimensiones y dureza conformes · 24 desechadas por rebaba en el labio' },
          { etapa: 'Lote', ref: LOT, fecha: '22/07/2026', det: '1.176 juntas liberadas a C-14-03' }
        ]
      },
      fwd: {
        cols: [{ label: 'Lote de montaje', key: 'mon', mono: true }, { label: 'N.º de serie', key: 'serial', mono: true }, { label: 'Cliente', key: 'cliente' }, { label: 'Emplazamiento', key: 'place' }, { label: 'Entrega', key: 'entrega' }, { label: 'Estado', key: 'estado' }],
        rows: unitRows
      },
      conclusion: 'Conclusión: la información necesaria para una campaña de campo se obtiene completa y el lote cuadra junta a junta. Acciones de mejora propuestas: verificar los contactos de los clientes finales de los distribuidores y añadir el lote de componente a la placa de datos digital del equipo.',
      note: 'Simulacro: no se ha bloqueado stock en SAP QM, no se ha liberado ninguna orden de servicio y no se ha enviado ningún aviso. Datos sintéticos de demostración.'
    },
    audit: { back: 'proveedor Sellados Ibéricos · lote SI-26-1187 · recepción EM 5000812744', fwd: `${UNITS.length} equipos · 3 lotes de montaje · 11 clientes · 1 expedición planificada` },
    say: [
      'Lo accionable: EXP-26-3318 (hoy 11:00) se retendría, y las 72 juntas del almacén y las 2 prensas que rezuman se bloquearían.',
      'Los avisos se preparan en el idioma de cada cliente (español, portugués y francés), con el número de serie y el emplazamiento final, y la reclamación 8D al proveedor. En un simulacro no se envía nada. Decide Calidad.'
    ]
  };

  agenticPack('maquinaria', {
    retirada: {
      title: 'Simulacro de campaña de campo',
      nav: 'Simulacro de trazabilidad',
      section: 'Calidad',
      desc: 'Ejercicio de trazabilidad para campañas de campo: genealogía hacia atrás y hacia delante, del lote de componente al número de serie y al cliente, cuadre del lote y clientes a notificar, a partir de un lote de componente o de un número de serie.',
      place: 'Planta de Zaragoza',
      approver: 'Responsable de Calidad',
      regPrefix: 'SR-2026-',
      agents: { trace: 'Trazabilidad', bal: 'Cuadre del lote', rec: 'Campaña y avisos' },
      targetText: 'Objetivo ilustrativo: 4 h',
      todayEstimate: '2–6 h',
      timerRef: 'Objetivo demo: 4 h',
      packLabel: 'Descargar paquete de la campaña',
      setup: { title: 'Punto de partida', sub: 'Un lote de componente o el número de serie de un equipo' },
      modes: {
        lote: { label: 'Lote de componente', noun: 'el lote', field: 'Código de lote de componente', icon: 'layers', format: 'JNT-2607-031', where: 'SAP S/4HANA' },
        serie: { label: 'Número de serie', noun: 'el número de serie', field: 'Número de serie del equipo', icon: 'hash', format: 'PH250-26-0412', where: 'SAP S/4HANA y Salesforce Service' }
      },
      entries: [
        { mode: 'lote', code: LOT, scope: 'jnt', label: `Lote ${LOT}`, option: 'Kit de juntas KJ-80 · Sellados Ibéricos' },
        { mode: 'serie', code: 'PH250-26-0412', scope: 'jnt', label: 'N.º de serie PH250-26-0412', option: 'PH-250 · Prensas y Servicios del Norte → Estampaciones Nervión', headline: `Prensa PH-250 de la reclamación REC-2026-0187 · juntas del cilindro principal del lote ${LOT} → se traza el lote completo`, startNode: 'E1', startResult: `PH-250 entregada el 04/08/2026 (Prensas y Servicios del Norte → Estampaciones Nervión) · juntas del lote ${LOT} → se traza el lote completo` }
      ],
      examples: [
        { mode: 'lote', code: LOT, label: `Lote ${LOT}` },
        { mode: 'serie', code: 'PH250-26-0412', label: 'N.º de serie PH250-26-0412' }
      ],
      reference: {
        title: 'Referencia de auditoría',
        sub: 'Objetivo del ejercicio; Calidad confirma los requisitos de su certificación y de sus clientes',
        items: [
          ['ISO 9001:2015', 'Apartado 8.5.2: identificación y trazabilidad del producto. Objetivo ilustrativo del ejercicio: del lote de componente al cliente en 4 horas.'],
          ['Máquinas', 'Directiva 2006/42/CE (y Reglamento (UE) 2023/1230, aplicable desde el 20/01/2027): si se detecta un riesgo, el fabricante adopta medidas correctoras y, si es grave, informa a la autoridad de vigilancia del mercado.'],
          ['Clientes OEM', 'Campañas de campo con trazabilidad por número de serie y 8D con el proveedor (PR-POS-005 y PR-CAL-008). Calidad valida el protocolo aplicable.']
        ],
        note: 'Un simulacro no bloquea stock, no libera órdenes de servicio ni envía avisos: se mide si la información se obtiene completa, cuadra y a tiempo.'
      },
      legend: { planned: 'Expedición planificada: retener', click: 'Pulsa el lote para ver su traza completa' },
      notice: { title: 'Simulacro de campaña de campo' },
      approval: { policy: 'PR-POS-005 · lanzar una campaña de campo o retener equipos requiere la aprobación de Calidad', approveLabel: 'Aprobar y cerrar simulacro', rejectPlaceholder: 'Por ejemplo: falta confirmar el contacto del cliente final de un distribuidor' },
      clock: { title: 'Cronómetro frente a auditoría', sub: 'Tiempos de la simulación; no son medidas de rendimiento de los sistemas' },
      report: { subtitle: 'Registro del ejercicio de trazabilidad y campaña de campo · ISO 9001 · PR-POS-005' },
      compare: {
        rows: [
          { k: 'Personas implicadas', today: '3–4: Calidad, Posventa, Producción y Logística', agentic: '1: {approver} revisa y aprueba' },
          { k: 'Sistemas consultados', today: '5–6 abiertos a mano: SAP, Opcenter, Windchill, Salesforce, hojas de cálculo y correo', agentic: '5 conectores consultados por los agentes: SAP S/4HANA, MES Opcenter, PLM Windchill, Salesforce Service y Outlook' },
          { k: 'Pasos', today: '15–20 consultas, cruces por número de serie y cálculos manuales', agentic: '{steps} pasos automáticos y 1 aprobación' },
          { k: 'Cuadre del lote', today: 'Hoja de cálculo con consumos, existencias y rechazos', agentic: 'Calculado por orden de montaje: {reconciled} conciliado' }
        ]
      },
      presenter: {
        idle: [
          'Simulacro de campaña de campo con trazabilidad y cuadre del lote; en el piloto Calidad confirma el protocolo y medimos el tiempo real.',
          'Se elige el punto de partida: el lote de juntas JNT-2607-031 o el número de serie de la prensa que perdía aceite.',
          'Agentic Platform recorre SAP, Opcenter, Windchill y Salesforce hacia atrás hasta el proveedor y hacia delante hasta cada número de serie y cliente, y cuadra el lote junta a junta.'
        ],
        nextIdle: 'Pulsar «Iniciar simulacro» con el lote JNT-2607-031 (o elegir «N.º de serie PH250-26-0412»).',
        nextRun: 'Pulsar «Ver aviso» de un cliente portugués o francés y después «Aprobar y cerrar simulacro».',
        nextDone: '«Descargar paquete de la campaña»: CSV de números de serie y registro imprimible. Después, «Cuestionario de cliente» (flecha derecha).'
      },
      scopes: { jnt: scope }
    }
  });
})();
