/*
 * Cervecera Bardenas · simulacro de retirada del lote de barril L2608-K14 (Bardenas Lager, barril de 30 l).
 * Hacia atrás: malta MAL-2607-05, lúpulo LUP-2606-11, CO₂ CO2-2608-02 → lote de fermentación L2607-FV05 → BBT-2.
 * Hacia delante: 1.040 barriles llenados en LLB-1 el 18/08/2026 → 912 expedidos a 14 clientes, 96 en la cámara CB-03
 * y 32 retenidos por Calidad (RET-Q). Mismos clientes, albaranes y referencias que CN_DATA.trace y la reclamación
 * REC-2026-0093. Datos sintéticos de demostración (MFM).
 */
(function () {
  'use strict';

  const LOT = 'L2608-K14';
  const PER_PALLET = 8;
  const L_PER_KEG = 30;

  /* Clientes del lote (mismos que CN_DATA.trace): [id, cliente, tipo, localidad, comunidad, barriles, expedición, albarán, contacto] */
  const CUSTOMERS = [
    ['dhr', 'Distribuciones Hosteleras Ribera, S.L.', 'Distribuidor', 'Tudela', 'Navarra', 168, '2026-08-20', 'ALB-26-08-2211', 'Marisa Garbayo · Calidad'],
    ['bed', 'Bebidas Ebro Distribución, S.L.', 'Distribuidor', 'Zaragoza', 'Aragón', 142, '2026-08-20', 'ALB-26-08-2214', 'Calidad y compras'],
    ['dch', 'Distribuciones Cierzo Hostelería, S.A.', 'Distribuidor', 'Pamplona', 'Navarra', 96, '2026-08-21', 'ALB-26-08-2230', 'Jefatura de almacén'],
    ['crb', 'Comercial Rioja Baja, S.L.', 'Distribuidor', 'Calahorra', 'La Rioja', 74, '2026-08-21', 'ALB-26-08-2233', 'Gerencia'],
    ['bbl', 'Bebidas Bardenas Logroño, S.L.', 'Distribuidor', 'Logroño', 'La Rioja', 66, '2026-08-24', 'ALB-26-08-2290', 'Calidad'],
    ['cda', 'Club Deportivo Arenas', 'Eventos', 'Logroño', 'La Rioja', 60, '2026-08-25', 'ALB-26-08-2302', 'Responsable de hostelería'],
    ['hmd', 'Hostelería Moncayo Distribución, S.L.', 'Distribuidor', 'Tarazona', 'Aragón', 58, '2026-08-25', 'ALB-26-08-2305', 'Almacén'],
    ['gbp', 'Grupo Bares Plaza, S.L.', 'Hostelería (cadena)', 'Zaragoza', 'Aragón', 52, '2026-08-26', 'ALB-26-08-2318', 'Compras y operaciones'],
    ['dar', 'Distribuciones Arga, S.L.', 'Distribuidor', 'Estella', 'Navarra', 48, '2026-08-27', 'ALB-26-08-2340', 'Gerencia'],
    ['dtb', 'Distribuidora Tudelana de Bebidas, S.L.', 'Distribuidor', 'Tudela', 'Navarra', 40, '2026-08-27', 'ALB-26-08-2342', 'Almacén'],
    ['cnv', 'Catering Navarro, S.L.', 'Catering', 'Pamplona', 'Navarra', 36, '2026-08-28', 'ALB-26-08-2361', 'Jefatura de cocina'],
    ['ett', 'Cervecería El Tubo', 'Hostelería', 'Zaragoza', 'Aragón', 30, '2026-08-31', 'ALB-26-08-2398', 'Encargado'],
    ['rlr', 'Restaurantes La Ribera, S.L.', 'Hostelería', 'Tudela', 'Navarra', 24, '2026-09-01', 'ALB-26-09-0012', 'Dirección'],
    ['htr', 'Hotel Tres Reyes', 'Hostelería', 'Pamplona', 'Navarra', 18, '2026-09-02', 'ALB-26-09-0031', 'Dirección de alimentos y bebidas']
  ].map(([id, label, kind, city, region, kegs, date, alb, contact]) => ({ id, label, kind, city, region, kegs, date, alb, contact, dist: kind === 'Distribuidor' }));
  const CUST = {};
  CUSTOMERS.forEach((c) => { CUST[c.id] = c; });

  /* Pedido de hoy servido desde CB-03 con barriles del lote */
  const PLANNED = { cust: 'gbp', kegs: 24, order: 'PV-26-09-1187', ship: 'EXP-26-09-0412', when: 'hoy a las 12:00', dock: 'muelle 1' };
  const STOCK_FREE = 72;
  const HELD = 32;

  const fmtD = (iso) => (iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}` : '');
  const dm = (iso) => (iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}` : '');
  const n0 = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const hl = (kegs) => (kegs * L_PER_KEG / 100).toFixed(1).replace('.', ',').replace(/,0$/, '');
  const plural = (n, a, b) => `${n0(n)} ${n === 1 ? a : b}`;
  const list = (a) => (a.length < 2 ? (a[0] || '') : `${a.slice(0, -1).join(', ')} y ${a[a.length - 1]}`);
  const sum = (a, f) => a.reduce((s, x) => s + f(x), 0);
  const SHIPPED = sum(CUSTOMERS, (c) => c.kegs);
  const FILLED = SHIPPED + STOCK_FREE + PLANNED.kegs + HELD;
  const REGIONS = ['Navarra', 'Aragón', 'La Rioja'];

  /* ---------------------------------------------------------------- Palés (SSCC) */

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
  addPallets(PLANNED.kegs, { status: 'plan', cust: PLANNED.cust, where: 'Cámara CB-03 · reservado', whereSub: `${PLANNED.order} · ${PLANNED.ship} · ${PLANNED.when}`, ship: PLANNED.ship, date: 'Prevista hoy 12:00' });
  addPallets(STOCK_FREE, { status: 'stock', where: 'Cámara de barriles CB-03', whereSub: 'WMS Mecalux · disponibles para expedir', ship: '—', date: '—' });
  addPallets(HELD, { status: 'held', where: 'Zona de retención RET-Q', whereSub: 'Retenidos por Calidad · control de O₂ (DES-2026-0077)', ship: '—', date: '—' });

  const palletChip = (p) => (p.cust === 'dhr' ? { status: 'critical', label: 'Reclamación REC-2026-0093' } : p.status === 'exp' ? { status: 'shipped', label: 'Expedido' } : p.status === 'plan' ? { status: 'pending', label: 'Expedición de hoy' } : p.status === 'stock' ? { status: 'pending', label: 'Sin bloquear' } : { status: 'hold', label: 'Retenido' });
  const palletAction = (p) => (p.status === 'exp' ? (CUST[p.cust].dist ? 'Aviso al distribuidor, retirada en sus bares y recogida' : 'Aviso al cliente, no servir y recogida') : p.status === 'plan' ? `Retener ${PLANNED.ship} y servir con otro lote` : p.status === 'stock' ? 'Bloquear en WMS Mecalux y SAP (stock bloqueado)' : 'Mantener retenidos y analizar O₂ y cata');
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

  /* ---------------------------------------------------------------- Avisos */

  function noticeOf(c) {
    const planned = c.id === PLANNED.cust;
    const subj = `[SIMULACRO] Retirada del lote ${LOT} · Bardenas Lager barril 30 l · ${plural(c.kegs, 'barril', 'barriles')}`;
    const parts = [
      `Estimado equipo (${c.contact.toLowerCase()}) de ${c.label}:`,
      'Les comunicamos la retirada comercial voluntaria del siguiente lote de Cervecera Bardenas:',
      [
        'Producto: Bardenas Lager · barril KeyKeg de 30 l',
        `Lote: ${LOT} · envasado el 18/08/2026 · consumo preferente 18/02/2027`,
        `Suministro: ${plural(c.kegs, 'barril', 'barriles')} (${hl(c.kegs)} hl) · albarán ${c.alb} del ${fmtD(c.date)}`
      ].join('\n'),
      'Motivo: defecto de calidad (sabor a cartón por oxidación). No hay riesgo para la salud.',
      c.dist
        ? 'Les pedimos que dejen de servir el lote, que trasladen este aviso a los establecimientos a los que han suministrado barriles del lote y que los aparten sin pinchar. Nuestra ruta los recogerá y los repondrá con cerveza de otro lote en un plazo de 48 h, con abono de los barriles y de los portes.'
        : 'Les pedimos que no pinchen los barriles del lote que tengan sin abrir y que los aparten. Nuestra ruta los recogerá y los repondrá con cerveza de otro lote en un plazo de 48 h, con abono de los barriles.'
    ];
    if (c.id === 'dhr') parts.push('Este aviso responde también a su reclamación INC-DHR-26-047 (nuestra referencia REC-2026-0093): incluye los 124 barriles servidos a sus 37 bares y los 44 que tienen apartados en su almacén.');
    if (planned) parts.push(`Su pedido ${PLANNED.order}, con salida prevista ${PLANNED.when}, se servirá con barriles de otro lote: los ${PLANNED.kegs} barriles del lote ${LOT} reservados para él quedan retenidos en nuestras instalaciones.`);
    parts.push('Motivo del envío: simulacro de retirada (procedimiento PR-CAL-006). En una retirada real, aquí se indican las instrucciones definitivas acordadas por Calidad.');
    parts.push('Atentamente,\nCalidad · Cervecera Bardenas\nFábrica de Arguedas');
    return {
      lang: 'Español',
      headers: { From: 'Calidad, Cervecera Bardenas', To: `${c.contact.split(' · ').pop()} · ${c.label}`, Subject: subj },
      subject: subj,
      body: parts.join('\n\n'),
      highlights: [LOT, c.alb].concat(planned ? [PLANNED.ship] : [])
    };
  }

  const items = CUSTOMERS.map((c) => {
    const pals = PALLETS.filter((p) => p.cust === c.id && p.status === 'exp').length;
    const body = [`${plural(c.kegs, 'barril', 'barriles')} (${hl(c.kegs)} hl, ${plural(pals, 'palé', 'palés')}) expedidos el ${dm(c.date)} con ${c.alb}.`];
    if (c.dist) body.push('Distribuidor: traslada el aviso a sus bares.');
    if (c.id === 'dhr') body.push('Reclamación REC-2026-0093: 124 barriles en 37 bares y 44 apartados en su almacén.');
    if (c.id === PLANNED.cust) body.push(`Pedido ${PLANNED.order}: ${PLANNED.kegs} barriles del lote reservados para ${PLANNED.ship}, ${PLANNED.when}: retener.`);
    return {
      id: c.id,
      label: c.label,
      icon: c.dist ? 'truck' : 'building',
      notify: true,
      channel: c.dist ? 'Correo + llamada del comercial' : 'Correo + llamada del comercial (cliente directo)',
      meta: [`${c.city} · ${c.region}`, c.kind, 'Aviso en español'],
      body: body.join(' '),
      notice: noticeOf(c),
      refs: `${c.alb}${c.id === PLANNED.cust ? ` · ${PLANNED.ship}` : ''}`,
      qtyText: plural(c.kegs, 'barril', 'barriles'),
      action: `Retirada y reposición${c.dist ? ' (incluye sus bares)' : ''}${c.id === PLANNED.cust ? ' y retención del pedido de hoy' : ''}`
    };
  });
  items.push({
    id: 'mantenimiento',
    label: 'Mantenimiento · llenadora de barriles LLB-1',
    icon: 'wrench',
    notify: false,
    chip: 'Interno',
    channel: 'Orden de trabajo en GMAO Maximo + aviso en Teams',
    meta: ['Fábrica de Arguedas', 'OT-2026-05210 aplazada al 06/10', 'NC-2026-0142'],
    body: 'Adelantar el preventivo de juntas y válvula de purga de los cabezales de LLB-1 y medir el O₂ de cada cabezal antes del próximo envasado en barril.',
    refs: 'OT-2026-05210 · NC-2026-0142',
    qtyText: '1 llenadora',
    action: 'Adelantar el preventivo de LLB-1'
  });
  items.push({
    id: 'autoridad',
    label: 'Instituto de Salud Pública y Laboral de Navarra',
    icon: 'shield',
    notify: false,
    chip: 'Solo si hay riesgo',
    channel: 'Correo oficial de alertas alimentarias',
    meta: ['Autoridad competente de la fábrica', 'APPCC-01'],
    body: 'La oxidación es un defecto de calidad sin riesgo para la salud: la retirada es comercial y voluntaria. Se comunicaría solo si los análisis indicaran un riesgo sanitario (Reglamento (CE) 178/2002, art. 19).',
    refs: LOT,
    qtyText: plural(FILLED, 'barril', 'barriles'),
    action: 'Valorar comunicación (no procede por ahora)'
  });

  /* ---------------------------------------------------------------- Genealogía */

  const WAVES = [
    { id: 'X1', label: '20–21/08', from: '2026-08-20', to: '2026-08-21' },
    { id: 'X2', label: '24–28/08', from: '2026-08-24', to: '2026-08-28' },
    { id: 'X3', label: '31/08–02/09', from: '2026-08-31', to: '2026-09-02' }
  ];
  const waveOf = (c) => WAVES.find((w) => c.date >= w.from && c.date <= w.to);
  const waveCust = (w) => CUSTOMERS.filter((c) => waveOf(c) === w);
  const nodes = [
    { id: 'MAL', stage: 'mp', kicker: 'Malta', title: 'MAL-2607-05', mono: true, lot: 'MAL-2607-05', sub: 'Malta Pilsen · Maltas de Castilla', meta: '7.680 kg en este lote', reveal: 1 },
    { id: 'LUP', stage: 'mp', kicker: 'Lúpulo', title: 'LUP-2606-11', mono: true, lot: 'LUP-2606-11', sub: 'Nugget T90 · Lúpulos del Órbigo', meta: '24 kg en este lote', reveal: 1 },
    { id: 'CO2', stage: 'mp', kicker: 'CO₂', title: 'CO2-2608-02', mono: true, lot: 'CO2-2608-02', sub: 'Recuperado de fermentación', meta: 'Pureza 99,99 %', reveal: 1 },
    { id: 'FV', stage: 'fer', kicker: 'Fermentación', title: 'L2607-FV05', mono: true, lot: 'L2607-FV05', sub: '480 hl · FV-05 · 21/07', meta: 'Filtrada a BBT-2 el 14/08 · O₂ 22 ppb', reveal: 1 },
    { id: 'B21', stage: 'fer', kicker: 'Misma cerveza', title: 'L2608-B21', mono: true, sub: 'Botella de 33 cl · 158 hl', meta: 'O₂ 35 ppb · cata conforme', tone: 'customer', reveal: 2 },
    { id: 'K', stage: 'env', kicker: 'Lote de barril', title: LOT, mono: true, lot: LOT, sub: `${n0(FILLED)} barriles · LLB-1 · 18/08`, meta: 'O₂ medio 64 ppb · DES-2026-0077', alert: 'Cabezal 3 a 91 ppb', alertTone: true, reveal: 2 },
    { id: 'XP', stage: 'alm', kicker: 'Expedidos', title: `${n0(SHIPPED)} barriles`, sub: `${CUSTOMERS.length} clientes · ${n0(PALLETS.filter((p) => p.status === 'exp').length)} palés`, meta: '20/08 a 02/09', tone: 'shipped', reveal: 3 },
    { id: 'CB', stage: 'alm', kicker: 'Cámara CB-03', title: `${STOCK_FREE + PLANNED.kegs} en almacén`, sub: `${PLANNED.kegs} reservados para ${PLANNED.ship}`, meta: `${PLANNED.when} · ${PLANNED.dock}`, alert: 'Retener la expedición', alertTone: true, tone: 'planned', reveal: 3 },
    { id: 'RQ', stage: 'alm', kicker: 'Retenidos', title: `${HELD} en RET-Q`, sub: 'Retenidos por Calidad', meta: 'Control de O₂ del llenado', tone: 'stock', reveal: 3 }
  ];
  WAVES.forEach((w) => {
    const cs = waveCust(w);
    nodes.push({ id: w.id, stage: 'exp', kicker: 'Expediciones', title: w.label, sub: `${plural(cs.length, 'cliente', 'clientes')} · ${n0(sum(cs, (c) => c.kegs))} barriles`, meta: list(Array.from(new Set(cs.map((c) => c.region)))), alert: w.id === 'X1' ? 'Incluye la reclamación' : '', tone: 'shipped', reveal: 4 });
  });
  CUSTOMERS.forEach((c) => nodes.push({ id: `C:${c.id}`, stage: 'cli', kicker: c.kind, title: c.label.replace(/, S\.[LA]\.$/, ''), sub: `${c.city} · ${plural(c.kegs, 'barril', 'barriles')}`, tone: 'customer', reveal: 5 }));
  const edges = [['MAL', 'FV'], ['LUP', 'FV'], ['FV', 'K'], ['FV', 'B21'], ['CO2', 'K'], ['K', 'XP'], ['K', 'CB'], ['K', 'RQ']];
  WAVES.forEach((w) => { edges.push(['XP', w.id]); waveCust(w).forEach((c) => edges.push([w.id, `C:${c.id}`])); });
  edges.push(['CB', `C:${PLANNED.cust}`]);

  /* ---------------------------------------------------------------- Tablas */

  const shipRows = CUSTOMERS.map((c) => ({ alb: c.alb, cliente: c.label, sub: `${c.kind} · ${c.city}`, date: fmtD(c.date), kegs: c.kegs, hl: hl(c.kegs), located: '100,0 %' }));
  const locRows = [
    { ref: LOT, tag: true, where: `Cámara CB-03 · ${PLANNED.ship}`, whereSub: `${PLANNED.order} · ${CUST[PLANNED.cust].label} · ${PLANNED.when}`, n: PLANNED.kegs / PER_PALLET, qty: PLANNED.kegs, action: `Retener ${PLANNED.ship} y servir con otro lote`, tone: 'crit' },
    { ref: LOT, tag: true, where: 'Cámara de barriles CB-03', whereSub: 'WMS Mecalux · disponibles para expedir', n: STOCK_FREE / PER_PALLET, qty: STOCK_FREE, action: 'Bloquear en WMS Mecalux y SAP', tone: 'warn' },
    { ref: LOT, tag: true, where: 'Zona de retención RET-Q', whereSub: 'Retenidos por Calidad · DES-2026-0077', n: HELD / PER_PALLET, qty: HELD, action: 'Mantener retenidos y analizar', tone: '' }
  ].concat(REGIONS.map((r) => {
    const cs = CUSTOMERS.filter((c) => c.region === r);
    return { ref: LOT, tag: true, where: `En clientes · ${r}`, whereSub: `${plural(cs.length, 'cliente', 'clientes')} · ${list(Array.from(new Set(cs.map((c) => c.city))))}`, n: PALLETS.filter((p) => p.status === 'exp' && cs.some((c) => c.id === p.cust)).length, qty: sum(cs, (c) => c.kegs), action: 'Aviso, retirada y reposición con otro lote', tone: 'warn' };
  }));

  const distN = CUSTOMERS.filter((c) => c.dist).length;
  const regionText = list(REGIONS.map((r) => `${CUSTOMERS.filter((c) => c.region === r).length} en ${r}`));

  const scope = {
    headline: `Bardenas Lager · barril KeyKeg de 30 l · ${n0(FILLED)} barriles llenados en LLB-1 el 18/08/2026`,
    previewSide: `${CUSTOMERS.length} clientes · ${n0(FILLED)} barriles`,
    startNode: 'K',
    stages: [
      { id: 'mp', label: 'Materias primas', icon: 'leaf' },
      { id: 'fer', label: 'Fermentación', icon: 'flask' },
      { id: 'env', label: 'Envasado', icon: 'droplet' },
      { id: 'alm', label: 'Almacén', icon: 'warehouse' },
      { id: 'exp', label: 'Expediciones', icon: 'truck' },
      { id: 'cli', label: 'Clientes', icon: 'building', count: CUSTOMERS.length }
    ],
    nodes,
    edges,
    systems: ['SAP S/4HANA', 'Brewmaxx (MES)', 'LIMS LabWare', 'WMS Mecalux'],
    genSub: `3 materias primas · 1 fermentación · ${n0(FILLED)} barriles · ${CUSTOMERS.length} clientes`,
    steps: [
      { agent: 'trace', system: 'SAP S/4HANA', action: 'Localiza el punto de partida', result: `Bardenas Lager barril 30 l · lote ${LOT} · envasado el 18/08/2026 · consumo preferente 18/02/2027`, ms: 190, reveal: 0, mark: 'Punto de partida localizado' },
      { agent: 'trace', system: 'Brewmaxx (MES)', action: 'Hacia atrás: envasado, filtración y fermentación', result: 'OE-2608-118 en LLB-1 · cerveza de BBT-2 (filtrada el 14/08) · lote de fermentación L2607-FV05, 4 cocimientos del 21/07', ms: 460, reveal: 1 },
      { agent: 'trace', system: 'SAP S/4HANA', action: 'Hacia atrás: materias primas y proveedores', result: 'Malta MAL-2607-05 (Maltas de Castilla) · lúpulo LUP-2606-11 (Lúpulos del Órbigo) · CO₂ CO2-2608-02 de recuperación propia · levadura LEV-26-07-05', ms: 520, reveal: 1, mark: 'Traza hacia atrás completa' },
      { agent: 'trace', system: 'LIMS LabWare', action: 'Liberación y análisis del lote', result: 'Liberado con DES-2026-0077 (O₂ medio 64 ppb, ≤ 50) · cata de retén del 28/09: cartón 3 sobre 5 · botella L2608-B21 de la misma cerveza, conforme', ms: 430, tone: 'warn', reveal: 2 },
      { agent: 'trace', system: 'WMS Mecalux', action: 'Palés del lote por SSCC y ubicación', result: `${n0(PALLETS.length)} palés · ${n0(SHIPPED)} barriles expedidos · ${STOCK_FREE + PLANNED.kegs} en CB-03 (sin bloquear) · ${HELD} en RET-Q`, ms: 560, reveal: 3, mark: 'Palés localizados por SSCC' },
      { agent: 'trace', system: 'SAP S/4HANA', action: 'Pedidos abiertos con barriles del lote', result: `${PLANNED.order} de ${CUST[PLANNED.cust].label}: ${PLANNED.kegs} barriles reservados en ${PLANNED.ship}, ${PLANNED.when}`, ms: 380, tone: 'warn', reveal: 3 },
      { agent: 'trace', system: 'SAP S/4HANA', action: 'Expediciones y clientes', result: `${CUSTOMERS.length} clientes (${regionText}) · ${CUSTOMERS.length} albaranes del 20/08 al 02/09 · ${distN} distribuidores de hostelería`, ms: 590, reveal: 4, mark: 'Expediciones identificadas' },
      { agent: 'trace', system: 'SAP S/4HANA', action: 'Contactos de calidad y reclamaciones abiertas', result: `${CUSTOMERS.length} contactos verificados · reclamación REC-2026-0093 de Distribuciones Hosteleras Ribera (124 barriles en 37 bares y 44 en su almacén)`, ms: 480, reveal: 5, mark: 'Clientes y contactos identificados' },
      { agent: 'bal', system: 'Brewmaxx (MES)', action: 'Volumen de la fermentación y mermas', result: '480 hl de L2607-FV05 → 312 hl a barril, 158 hl a botella y 10 hl de fondos y filtración', ms: 420 },
      { agent: 'bal', system: 'Agentic Platform', action: 'Cuadre del lote: llenado frente a expedido, en almacén y retenido', result: `Conciliado 100,0 % · 0 barriles sin justificar · ${n0(FILLED)} de ${n0(FILLED)} localizados`, ms: 95, tone: 'ok', mark: 'Cuadre del lote cerrado' },
      { agent: 'rec', system: 'SAP S/4HANA', action: 'Abre el registro de retirada con un aviso por cliente', result: `Retirada en borrador · ${CUSTOMERS.length} pedidos de recogida y reposición sin liberar`, ms: 360 },
      { agent: 'rec', system: 'Outlook', action: 'Prepara los avisos sin enviar', result: `${CUSTOMERS.length} avisos a clientes pendientes de aprobación · OT de mantenimiento propuesta`, ms: 720, mark: 'Registro y avisos preparados' }
    ],
    located: { label: 'Barriles localizados', value: `${n0(FILLED)} de ${n0(FILLED)}`, sub: `${n0(SHIPPED)} expedidos · ${STOCK_FREE + PLANNED.kegs} en almacén · ${HELD} retenidos`, icon: 'pallet', short: `${n0(FILLED)} de ${n0(FILLED)} barriles localizados (${n0(SHIPPED)} en ${CUSTOMERS.length} clientes, ${STOCK_FREE + PLANNED.kegs} en CB-03 y ${HELD} retenidos)` },
    kpiNotify: { label: 'Clientes a notificar', value: CUSTOMERS.length, sub: `1 expedición a retener · ${PLANNED.when}` },
    balance: {
      title: 'Balance de masas',
      kpiLabel: 'Balance de masas conciliado',
      sub: 'Barriles del lote del llenado al cliente y volumen de la fermentación · Brewmaxx, WMS Mecalux y SAP',
      head: 'Lote de barril',
      headSide: `${CUSTOMERS.length} expediciones · 1 fermentación`,
      labels: { in: 'Llenado', losses: 'Mermas registradas', out: 'Expedido a clientes', stock: 'En almacén y retenido' },
      detailTitle: 'Detalle por flujo',
      criterio: 'Criterio: la diferencia sin justificar se muestra tal cual, no se reparte. Cada barril se cuenta por el palé (SSCC) que lo contiene en WMS Mecalux; cada expedición, por su albarán en SAP.',
      reportText: 'Llenado y volumen declarados en Brewmaxx (MES); palés por SSCC en WMS Mecalux; expediciones y pedidos en SAP S/4HANA; liberación en LIMS LabWare.',
      flows: [
        {
          key: 'K14', seg: 'Barriles', main: true, unit: 'barriles', colLabel: 'Barriles',
          title: `Lote ${LOT} → clientes, almacén y retención`,
          inLabel: 'Llenado · OE-2608-118', inSub: '18/08/2026 06:00–14:30 · LLB-1 · CO₂ CO2-2608-02', inStage: 'Brewmaxx', inQty: FILLED,
          phases: [{ title: 'Llenado, control de peso y paletizado · sin barriles rechazados declarados', date: '2026-08-18', stages: [] }],
          outsTitle: 'Salidas',
          outs: CUSTOMERS.map((c) => ({ label: c.label, sub: `${c.alb} · ${dm(c.date)} · ${c.city}`, stage: 'SAP SD', qty: c.kegs })).concat([
            { label: `Reservados para ${PLANNED.ship}`, sub: `CB-03 · ${PLANNED.order} · ${PLANNED.when}`, stage: 'WMS', qty: PLANNED.kegs, kind: 'stock' },
            { label: 'Cámara de barriles CB-03', sub: 'Disponibles para expedir (sin bloquear)', stage: 'WMS', qty: STOCK_FREE, kind: 'stock' },
            { label: 'Retenidos por Calidad · RET-Q', sub: 'Control de O₂ · DES-2026-0077', stage: 'SAP QM', qty: HELD, kind: 'stock' }
          ])
        },
        {
          key: 'FV05', seg: 'Fermentación', unit: 'hl', colLabel: 'Hectolitros',
          title: 'Lote de fermentación L2607-FV05 → envasado',
          inLabel: 'Cerveza fermentada · L2607-FV05', inSub: '4 cocimientos de 120 hl · FV-05 · 21/07 a 14/08', inStage: 'Brewmaxx', inQty: 480,
          phases: [{ title: 'Filtración y estabilización a BBT-2', date: '2026-08-14', stages: [['Brewmaxx', 'Fondos de tanque y filtración', 10]] }],
          outs: [
            { label: `Barril · ${LOT}`, sub: `${n0(FILLED)} barriles de 30 l · LLB-1 · 18/08`, stage: 'Brewmaxx', qty: 312 },
            { label: 'Botella · L2608-B21', sub: '47.880 botellas de 33 cl · LB-1 · 19/08', stage: 'Brewmaxx', qty: 158 }
          ]
        }
      ],
      product: {
        title: 'Expediciones del lote',
        side: `${CUSTOMERS.length} albaranes · ${n0(SHIPPED)} barriles · ${hl(SHIPPED)} hl`,
        cols: [
          { label: 'Albarán', key: 'alb', mono: true },
          { label: 'Cliente', key: 'cliente', sub: 'sub' },
          { label: 'Fecha', key: 'date' },
          { label: 'Barriles', key: 'kegs', num: true },
          { label: 'Hectolitros', key: 'hl', num: true },
          { label: 'Localizado', key: 'located', num: true, ok: true }
        ],
        rows: shipRows
      }
    },
    units: {
      title: 'Palés y ubicaciones',
      sub: `${n0(PALLETS.length)} palés (SSCC) · ${n0(FILLED)} barriles · WMS Mecalux y SAP S/4HANA`,
      icon: 'pallet',
      csvLabel: 'Palés del lote (CSV)',
      csvName: 'pales',
      csvCols: [
        { label: 'SSCC', key: 'sscc' }, { label: 'Llenado', key: 'filled' }, { label: 'Barriles', key: 'kegs' }, { label: 'Hectolitros', key: 'hl' },
        { label: 'Ubicación o cliente', key: 'where' }, { label: 'Detalle', key: 'whereSub' }, { label: 'Expedición', key: 'ship' }, { label: 'Fecha', key: 'date' },
        { label: 'Estado', key: 'estado' }, { label: 'Acción en una retirada real', key: 'accion' }
      ],
      byLoc: { label: 'Por ubicación', refLabel: 'Lote', whereLabel: 'Ubicación', nLabel: 'Palés', qtyLabel: 'Barriles', actionLabel: 'Acción en una retirada real', rows: locRows },
      list: {
        label: 'Palés (SSCC)',
        cols: [
          { label: 'SSCC', key: 'sscc', mono: true, sub: 'filled' },
          { label: 'Barriles', key: 'kegs', num: true },
          { label: 'Hectolitros', key: 'hl', num: true },
          { label: 'Ubicación o cliente', key: 'where', sub: 'whereSub' },
          { label: 'Expedición', key: 'ship', mono: true, sub: 'date' },
          { label: 'Estado', key: 'estado', chip: true },
          { label: 'Acción en una retirada real', key: 'accion' }
        ],
        rows: palletRows
      }
    },
    customers: {
      title: 'Clientes a notificar',
      sub: `${CUSTOMERS.length} clientes con ${n0(SHIPPED)} barriles (${regionText}) · 1 pedido de hoy a retener`,
      items,
      holdsTitle: 'Acciones en fábrica',
      holds: [
        { icon: 'truck', tone: 'crit', title: `Retener ${PLANNED.ship} (${PLANNED.when})`, meta: [`${PLANNED.kegs} barriles del lote`, PLANNED.order, CUST[PLANNED.cust].label], body: `En una retirada real, el responsable de logística no carga los ${PLANNED.kegs} barriles reservados en CB-03 y sirve el pedido con el lote L2609-K03.` },
        { icon: 'lock', tone: 'warn', title: `Bloquear los ${STOCK_FREE} barriles libres de CB-03`, meta: ['hoy', `lote ${LOT}`, 'WMS Mecalux y SAP'], body: 'Siguen disponibles para expedir: en una retirada real se bloquean en WMS y SAP. Palés por SSCC en la pestaña «Palés (SSCC)» y en el CSV.' }
      ]
    },
    approval: {
      titlePrefix: 'Retirada y avisos del simulacro',
      scope: [
        { label: 'Clientes con barriles del lote', value: `${CUSTOMERS.length} clientes · ${n0(SHIPPED)} barriles (${hl(SHIPPED)} hl)`, status: 'pending', chip: String(CUSTOMERS.length) },
        { label: 'Expedición de hoy a retener', value: `${PLANNED.ship} · ${PLANNED.when} · ${PLANNED.kegs} barriles` },
        { label: 'Stock que se bloquearía', value: `${STOCK_FREE} barriles en CB-03 · ${HELD} ya retenidos en RET-Q`, status: 'evaluate', chip: 'Sin bloqueo en simulacro' },
        { label: 'Mantenimiento', value: 'Adelantar OT-2026-05210 en LLB-1 (NC-2026-0142)' }
      ],
      effects: [
        `Outlook: ${CUSTOMERS.length} avisos guardados como borrador con la marca SIMULACRO; no se envía nada`,
        `SAP S/4HANA: registro de retirada y ${CUSTOMERS.length} pedidos de recogida y reposición en borrador, sin liberar`,
        'WMS Mecalux: sin cambios; en un simulacro no se bloquea stock ni se retienen expediciones',
        'Registro {code} aprobado con los tiempos de cada actividad'
      ]
    },
    report: {
      objeto: 'Simulacro de retirada con punto de partida en {label}. Se comprueba la trazabilidad hacia atrás (envasado, fermentación y materias primas) y hacia delante (palés, expediciones y clientes), con el balance de masas del lote.',
      noAction: 'El ejercicio no bloquea existencias, no retiene expediciones y no envía avisos.',
      results: [
        `${CUSTOMERS.length} clientes en Navarra, La Rioja y Aragón (${distN} distribuidores, que trasladarían el aviso a sus bares) y 1 expedición de hoy que se retendría.`,
        'La botella L2608-B21 de la misma cerveza tiene O₂ y cata conformes: el alcance se limita al envasado en barril del 18/08.',
        'Mantenimiento adelantaría el preventivo de los cabezales de LLB-1 (OT-2026-05210).'
      ],
      back: {
        cols: [{ label: 'Etapa', key: 'etapa' }, { label: 'Referencia', key: 'ref', mono: true }, { label: 'Fecha', key: 'fecha' }, { label: 'Detalle', key: 'det' }],
        rows: [
          { etapa: 'Malta', ref: 'MAL-2607-05', fecha: '14/07/2026', det: 'Malta Pilsen · Maltas de Castilla, S.A. (lote MC-26-1904) · 7.680 kg en este lote' },
          { etapa: 'Lúpulo', ref: 'LUP-2606-11', fecha: '11/06/2026', det: 'Nugget T90 · Lúpulos del Órbigo, S. Coop. · 24 kg en este lote' },
          { etapa: 'Levadura', ref: 'LEV-26-07-05', fecha: '21/07/2026', det: 'Lager W-34/70, generación 5' },
          { etapa: 'Fermentación', ref: 'L2607-FV05', fecha: '21/07/2026', det: '4 cocimientos de 120 hl en FV-05 · fermentación a 12 °C y guarda a 0 °C' },
          { etapa: 'Filtración', ref: 'BBT-2', fecha: '14/08/2026', det: 'O₂ disuelto en tanque 22 ppb · conforme' },
          { etapa: 'CO₂', ref: 'CO2-2608-02', fecha: '01–20/08/2026', det: 'Recuperado de fermentación · pureza 99,99 %' },
          { etapa: 'Envasado', ref: 'OE-2608-118', fecha: '18/08/2026 06:00', det: `LLB-1 · ${n0(FILLED)} barriles · O₂ medio 64 ppb (cabezal 3 a 91 ppb)` },
          { etapa: 'Liberación', ref: 'DES-2026-0077', fecha: '18/08/2026 15:30', det: 'Liberado con desviación de O₂ · cata conforme' }
        ]
      },
      fwd: {
        cols: [{ label: 'Albarán', key: 'alb', mono: true }, { label: 'Cliente', key: 'cliente' }, { label: 'Fecha', key: 'date' }, { label: 'Barriles', key: 'kegs' }, { label: 'Hectolitros', key: 'hl' }],
        rows: shipRows.concat([
          { alb: PLANNED.ship, cliente: `${CUST[PLANNED.cust].label} (pedido de hoy, reservado en CB-03)`, date: '29/09/2026', kegs: PLANNED.kegs, hl: hl(PLANNED.kegs) },
          { alb: 'CB-03', cliente: 'Cámara de barriles (sin bloquear)', date: '—', kegs: STOCK_FREE, hl: hl(STOCK_FREE) },
          { alb: 'RET-Q', cliente: 'Retenidos por Calidad', date: '—', kegs: HELD, hl: hl(HELD) }
        ])
      },
      conclusion: 'Conclusión: la información necesaria para una retirada se obtiene completa y el lote cuadra barril a barril. Acciones de mejora propuestas: pedir a los distribuidores la lista de bares por lote en el portal de clientes y registrar el O₂ por cabezal en cada palé.',
      note: 'Simulacro: no se ha bloqueado stock, no se ha retenido ninguna expedición y no se ha enviado ningún aviso. Datos sintéticos de demostración.'
    },
    audit: { back: 'malta MAL-2607-05 · lúpulo LUP-2606-11 · CO₂ CO2-2608-02 · fermentación L2607-FV05', fwd: `${n0(FILLED)} barriles · ${n0(PALLETS.length)} palés · ${CUSTOMERS.length} clientes · 1 expedición de hoy` },
    say: [
      `Lo accionable: ${PLANNED.ship} (${PLANNED.when}) se retendría y los ${STOCK_FREE} barriles libres de CB-03 se bloquearían.`,
      'Los avisos van a los 14 clientes con su albarán y número de barriles; los distribuidores los trasladan a sus bares. En un simulacro no se envía nada. Decide Calidad.'
    ]
  };

  agenticPack('cerveceria', {
    retirada: {
      title: 'Simulacro de retirada',
      nav: 'Simulacro de trazabilidad',
      section: 'Calidad',
      desc: 'Ejercicio de trazabilidad para retiradas de producto: genealogía hacia atrás y hacia delante, de las materias primas al palé y al cliente, balance de masas y clientes a notificar, a partir de un lote o de un albarán.',
      place: 'Fábrica de Arguedas',
      approver: 'Responsable de Calidad',
      regPrefix: 'SR-2026-',
      agents: { trace: 'Trazabilidad', bal: 'Balance de masas', rec: 'Retirada y avisos' },
      targetText: 'Objetivo ilustrativo: 4 h',
      todayEstimate: '2–5 h',
      timerRef: 'Objetivo demo: 4 h',
      packLabel: 'Descargar paquete de la retirada',
      setup: { title: 'Punto de partida', sub: 'Un lote de producto terminado o el albarán de una expedición' },
      modes: {
        lote: { label: 'Lote', noun: 'el lote', field: 'Código de lote', icon: 'layers', format: 'L2608-K14', where: 'SAP S/4HANA y Brewmaxx' },
        albaran: { label: 'Albarán', noun: 'el albarán', field: 'Número de albarán', icon: 'truck', format: 'ALB-26-08-2211', where: 'SAP S/4HANA' }
      },
      entries: [
        { mode: 'lote', code: LOT, scope: 'k14', label: `Lote ${LOT}`, option: 'Bardenas Lager · barril de 30 l · 18/08/2026' },
        { mode: 'albaran', code: 'ALB-26-08-2211', scope: 'k14', label: 'Albarán ALB-26-08-2211', option: 'Distribuciones Hosteleras Ribera · 168 barriles', headline: `Albarán ALB-26-08-2211 de Distribuciones Hosteleras Ribera (reclamación REC-2026-0093) · 168 barriles del lote ${LOT} → se traza el lote completo`, startNode: 'X1', startResult: `Expedición del 20/08/2026 a Distribuciones Hosteleras Ribera (Tudela) · 168 barriles del lote ${LOT} → se traza el lote completo` }
      ],
      examples: [
        { mode: 'lote', code: LOT, label: `Lote ${LOT}` },
        { mode: 'albaran', code: 'ALB-26-08-2211', label: 'Albarán ALB-26-08-2211' }
      ],
      reference: {
        title: 'Referencia de auditoría',
        sub: 'Objetivo del ejercicio; Calidad confirma los requisitos de su certificación y de sus clientes',
        items: [
          ['Reglamento (CE) 178/2002', 'Artículo 18: trazabilidad un paso atrás y un paso adelante. Artículo 19: retirada y comunicación a la autoridad si hay riesgo para la salud.'],
          ['IFS Food / BRCGS', 'Prueba de trazabilidad y simulacro de retirada al menos una vez al año, con balance de masas. Objetivo ilustrativo del ejercicio: localizar todo el lote en 4 horas.'],
          ['PR-CAL-006', 'Procedimiento interno de retirada de producto: Calidad decide el alcance y aprueba los avisos.']
        ],
        note: 'Un simulacro no bloquea stock, no retiene expediciones ni envía avisos: se mide si la información se obtiene completa, cuadra y a tiempo.'
      },
      legend: { planned: 'Expedición de hoy: retener', click: 'Pulsa un lote para ver su traza completa' },
      notice: { title: 'Simulacro de retirada' },
      approval: { policy: 'PR-CAL-006 · retirar producto o retener expediciones requiere la aprobación de Calidad', approveLabel: 'Aprobar y cerrar simulacro', rejectPlaceholder: 'Por ejemplo: falta confirmar el contacto de calidad de un distribuidor' },
      clock: { title: 'Cronómetro frente a auditoría', sub: 'Tiempos de la simulación; no son medidas de rendimiento de los sistemas' },
      report: { subtitle: 'Registro del ejercicio de trazabilidad y retirada · Reglamento (CE) 178/2002 · PR-CAL-006' },
      compare: {
        rows: [
          { k: 'Personas implicadas', today: '3–4: Calidad, Logística, Producción y Comercial', agentic: '1: {approver} revisa y aprueba' },
          { k: 'Sistemas consultados', today: '5–6 abiertos a mano: SAP, Brewmaxx, LIMS, WMS, hojas de cálculo y correo', agentic: '5 conectores consultados por los agentes: SAP S/4HANA, Brewmaxx, LIMS LabWare, WMS Mecalux y Outlook' },
          { k: 'Pasos', today: '15–20 consultas, cruces de SSCC con albaranes y cálculos manuales', agentic: '{steps} pasos automáticos y 1 aprobación' },
          { k: 'Balance de masas', today: 'Hoja de cálculo con llenado, expediciones y existencias', agentic: 'Calculado por palé y albarán: {reconciled} conciliado' }
        ]
      },
      presenter: {
        idle: [
          'Simulacro de retirada con trazabilidad y balance de masas; en el piloto Calidad confirma el protocolo y medimos el tiempo real.',
          'Se elige el punto de partida: el lote de barril L2608-K14 o el albarán de la expedición reclamada.',
          'Agentic Platform recorre SAP, Brewmaxx, LIMS y WMS hacia atrás hasta la malta, el lúpulo y el CO₂, y hacia delante hasta cada palé y cliente, y cuadra el lote barril a barril.'
        ],
        nextIdle: 'Pulsar «Iniciar simulacro» con el lote L2608-K14 (o elegir «Albarán ALB-26-08-2211»).',
        nextRun: 'Pulsar «Ver aviso» de Distribuciones Hosteleras Ribera y después «Aprobar y cerrar simulacro».',
        nextDone: '«Descargar paquete de la retirada»: CSV de palés y registro imprimible. Después, «Cuestionario de cliente» (flecha derecha).'
      },
      scopes: { k14: scope }
    }
  });
})();
