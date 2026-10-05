/*
 * Mercados Moncayo · simulacro de retirada del lote L26214 de Tomate frito Moncayo 400 g (marca propia).
 * 4.800 tarros recibidos en la Plataforma de Plaza → 4.320 servidos a 41 tiendas y 480 en plataforma → 1.920
 * vendidos y 2.400 en lineal → 612 clientes de fidelización compraron el lote. Aviso a las autoridades de Aragón
 * y La Rioja, a AESAN y al fabricante. Mismas tiendas y cifras que CN_DATA.trace['L26214'].
 * Datos sintéticos de demostración (MFM).
 */
(function () {
  'use strict';

  const LOT = 'L26214';
  /* [tienda, nombre, provincia, servidas, vendidas, en lineal, clientes de fidelización] */
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
  const REPO = ['T-003', 'T-008', 'T-028', 'T-045']; /* ola de reposición de hoy 10:30 con 96 tarros de plataforma */

  const n0 = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const sum = (a, f) => a.reduce((s, x) => s + f(x), 0);
  const list = (a) => (a.length < 2 ? (a[0] || '') : `${a.slice(0, -1).join(', ')} y ${a[a.length - 1]}`);
  const PROVS = ['Zaragoza', 'Huesca', 'Teruel', 'La Rioja'];
  const prov = PROVS.map((p) => { const s = STORES.filter((x) => x.prov === p); return { p, n: s.length, served: sum(s, (x) => x.served), sold: sum(s, (x) => x.sold), shelf: sum(s, (x) => x.shelf), fid: sum(s, (x) => x.fid) }; });
  const T = { served: sum(STORES, (x) => x.served), sold: sum(STORES, (x) => x.sold), shelf: sum(STORES, (x) => x.shelf), fid: sum(STORES, (x) => x.fid) };

  /* 612 clientes de fidelización (reproducible): 1.047 tarros comprados con tarjeta */
  let seed = 26214;
  const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
  const INI = 'ABCDEGIJLMNOPRSTV';
  const LOYAL_UNITS = 1047;
  const loyal = [];
  let socio = 4100215;
  STORES.forEach((s) => {
    for (let i = 0; i < s.fid; i += 1) {
      socio += 1 + Math.floor(rnd() * 211);
      const r = rnd();
      const chan = r < 0.938 ? 'Notificación en la app' : r < 0.98 ? 'SMS' : 'Correo';
      loyal.push({ socio: `Socio ${socio}`, ini: `${INI[Math.floor(rnd() * INI.length)]}. ${INI[Math.floor(rnd() * INI.length)]}. ${INI[Math.floor(rnd() * INI.length)]}.`, store: `${s.id} ${s.name}`, prov: s.prov, units: 1, day: 6 + Math.floor(rnd() * 53), chan });
    }
  });
  for (let r = LOYAL_UNITS - loyal.length; r > 0;) { const c = loyal[Math.floor(rnd() * loyal.length)]; if (c.units < 4) { c.units += 1; r -= 1; } }
  const dayText = (d) => { const dt = new Date(Date.UTC(2026, 7, d)); return `${String(dt.getUTCDate()).padStart(2, '0')}/${String(dt.getUTCMonth() + 1).padStart(2, '0')}`; };
  loyal.forEach((c) => { c.last = `Última compra ${dayText(c.day)}`; c.action = 'Aviso de retirada y reembolso sin ticket'; });
  const appN = loyal.filter((c) => c.chan === 'Notificación en la app').length;
  const smsN = loyal.filter((c) => c.chan === 'SMS').length;
  const mailN = loyal.length - appN - smsN;

  /* ---------------------------------------------------------------- Avisos */

  const sig = 'Atentamente,\nCalidad · Mercados Moncayo\nPlataforma de Plaza (Zaragoza)';
  const items = [
    {
      id: 'tiendas', label: '41 tiendas con el lote', icon: 'building', notify: true,
      channel: 'Tarea urgente en ServiceNow + aviso en Teams al encargado',
      meta: ['Zaragoza 18 · Huesca 8 · Teruel 5 · La Rioja 10', `${n0(T.shelf)} tarros en lineal`, 'Aviso en español'],
      body: `Retirar del lineal y del almacén de tienda los ${n0(T.shelf)} tarros del lote, bloquear su venta en TPV, colocar el cartel de retirada y aceptar devoluciones sin ticket. ${list(UNSYNC)} tienen el TPV sin sincronizar desde ayer: bloqueo manual en caja.`,
      refs: `${LOT} · EAN 8437012300414`, qtyText: `${n0(T.shelf)} tarros`, action: 'Retirada del lineal y bloqueo en TPV',
      notice: {
        lang: 'Español',
        headers: { From: 'Calidad · Mercados Moncayo', To: 'Encargados de 41 tiendas (ServiceNow y Teams)', Subject: `[SIMULACRO] RETIRADA URGENTE · Tomate frito Moncayo 400 g · lote ${LOT}` },
        subject: `[SIMULACRO] RETIRADA URGENTE · Tomate frito Moncayo 400 g · lote ${LOT}`,
        body: [
          'Para: encargado de tienda',
          `Producto: Tomate frito Moncayo 400 g (tarro de vidrio) · EAN 8437012300414\nLote: ${LOT} · consumo preferente 08/2028 (impreso en la tapa)\nOtros lotes del mismo producto: se pueden seguir vendiendo.`,
          'Qué hacer ahora (antes de 2 h):\n1. Retira del lineal y del almacén de tienda todos los tarros del lote y guárdalos en la jaula de producto bloqueado, con la etiqueta «RETIRADA · NO VENDER».\n2. Comprueba que el TPV bloquea el lote al escanearlo; si tu TPV no está sincronizado, avisa en caja para no venderlo.\n3. Coloca el cartel de retirada junto al lineal y en la entrada.\n4. Acepta la devolución del producto, con o sin ticket, y reembolsa el importe.\n5. Registra en la tarea de ServiceNow las unidades retiradas.',
          'Motivo: simulacro de retirada (PR-CAL-010). En una retirada real, aquí se indica el peligro (posible presencia de fragmentos de vidrio) y las instrucciones para el consumidor.',
          sig
        ].join('\n\n'),
        highlights: [LOT]
      }
    },
    {
      id: 'fidelizacion', label: '612 clientes de fidelización que compraron el lote', icon: 'users', notify: true,
      channel: 'Notificación en la app + SMS + correo',
      meta: [`${n0(appN)} por app · ${smsN} por SMS · ${mailN} por correo`, '1.047 tarros comprados con tarjeta', 'Aviso en español'],
      body: 'Aviso personal a cada socio que compró el lote: no consumir, devolución y reembolso en cualquier tienda sin ticket. El CRM identifica la tienda y la fecha de compra de cada uno.',
      refs: LOT, qtyText: '1.047 tarros', action: 'Aviso personal de retirada',
      notice: {
        lang: 'Español',
        headers: { From: 'Mercados Moncayo', To: '612 socios (CRM Fidelización)', Subject: `[SIMULACRO] Aviso importante sobre un producto que compraste: Tomate frito Moncayo 400 g, lote ${LOT}` },
        subject: `[SIMULACRO] Aviso importante sobre un producto que compraste: Tomate frito Moncayo 400 g, lote ${LOT}`,
        body: [
          'Notificación en la app y SMS:\n[SIMULACRO] Mercados Moncayo: retiramos el Tomate frito Moncayo 400 g, lote L26214, que compraste el {fecha}. No lo consumas. Te devolvemos el importe en cualquier tienda, sin ticket.',
          'Correo:\nHola, {nombre}:\n\nSegún tu tarjeta Moncayo, el {fecha} compraste en {tienda} Tomate frito Moncayo 400 g del lote L26214 (lo verás impreso en la tapa, con consumo preferente 08/2028).',
          'Por precaución, estamos retirando este lote. Te pedimos que no lo consumas y que lo devuelvas en cualquiera de nuestras tiendas: te reembolsaremos el importe aunque no tengas el ticket. Los demás lotes de este producto no están afectados.',
          'Motivo: simulacro de retirada (PR-CAL-010). En una retirada real, aquí se indica el peligro y qué hacer si ya se ha consumido.',
          'Gracias por tu confianza,\nMercados Moncayo · Atención al consumidor'
        ].join('\n\n'),
        highlights: [LOT]
      }
    },
    {
      id: 'consumidores', label: 'Consumidores sin tarjeta', icon: 'user', notify: true,
      channel: 'Cartel en tienda + web y redes sociales',
      meta: ['873 tarros vendidos sin identificar', 'Aviso público', 'Aviso en español'],
      body: 'Nota de retirada en la web y las redes de Mercados Moncayo y cartel en las 41 tiendas; texto acordado con la autoridad sanitaria.',
      refs: LOT, qtyText: '873 tarros', action: 'Aviso público de retirada',
      notice: {
        lang: 'Español',
        headers: { From: 'Mercados Moncayo · Comunicación', To: 'Web, redes sociales y cartel de tienda', Subject: `[SIMULACRO] Retirada de Tomate frito Moncayo 400 g, lote ${LOT}` },
        subject: `[SIMULACRO] Retirada de Tomate frito Moncayo 400 g, lote ${LOT}`,
        body: `AVISO DE RETIRADA\n\nProducto: Tomate frito Moncayo · tarro de vidrio de 400 g\nLote: ${LOT} · consumo preferente 08/2028\nEAN: 8437012300414\nVendido en tiendas Mercados Moncayo de Zaragoza, Huesca, Teruel y La Rioja desde el 06/08/2026.\n\nSi tienes este producto, no lo consumas. Devuélvelo en cualquier tienda Mercados Moncayo y te reembolsaremos el importe, aunque no tengas el ticket. Los demás lotes no están afectados.\n\nMotivo: simulacro de retirada. En una retirada real, el texto se acuerda con la autoridad sanitaria e indica el peligro.\n\nMercados Moncayo · Atención al consumidor`,
        highlights: [LOT]
      }
    },
    {
      id: 'aragon', label: 'Gobierno de Aragón · Dirección General de Salud Pública', icon: 'shield', notify: true,
      channel: 'Correo oficial + teléfono de alertas (la autoridad lo notifica en SCIRI)',
      meta: ['31 tiendas en Aragón', 'Autoridad competente', 'Aviso en español'],
      body: 'Comunicación de la retirada (Reglamento (CE) 178/2002, art. 19) con la distribución por tienda, las unidades vendidas y en lineal y las acciones; la autoridad autonómica la traslada a la red de alerta (SCIRI).',
      refs: `${LOT} · RGSEAA 21.004512/Z`, qtyText: '3.192 tarros servidos', action: 'Comunicación a la autoridad sanitaria',
      notice: {
        lang: 'Español',
        headers: { From: 'Calidad · Mercados Moncayo', To: 'Gobierno de Aragón · Dirección General de Salud Pública · Alertas alimentarias', Subject: `[SIMULACRO] Comunicación de retirada · Tomate frito Moncayo 400 g · lote ${LOT}` },
        subject: `[SIMULACRO] Comunicación de retirada · Tomate frito Moncayo 400 g · lote ${LOT}`,
        body: [
          'Señores:',
          `Conforme al artículo 19 del Reglamento (CE) 178/2002, les comunicamos el inicio de la retirada del producto Tomate frito Moncayo 400 g (tarro de vidrio, EAN 8437012300414), lote ${LOT}, consumo preferente 08/2028, fabricado el 02/08/2026 por Conservas del Jalón, S.L. (Épila, RGSEAA 21.004512/Z) para nuestra marca propia.`,
          'Motivo: reclamación de un consumidor por un fragmento de vidrio en un tarro (ATC-2026-0412, tienda T-011 Zaragoza Delicias). Investigación en curso con el fabricante.',
          `Distribución en Aragón: 31 tiendas (Zaragoza 18, Huesca 8 y Teruel 5) · ${n0(prov[0].served + prov[1].served + prov[2].served)} tarros servidos · ${n0(prov[0].sold + prov[1].sold + prov[2].sold)} vendidos · ${n0(prov[0].shelf + prov[1].shelf + prov[2].shelf)} en lineal. Se adjunta la relación por tienda.`,
          'Medidas: retirada del lineal y bloqueo de venta en TPV, bloqueo de 480 tarros en la plataforma, aviso a 612 clientes de fidelización y aviso público en tienda y web.',
          'Motivo: simulacro de retirada. Comunicación de ejemplo; en una retirada real se usa el formulario de la autoridad.',
          sig
        ].join('\n\n'),
        highlights: [LOT]
      }
    },
    {
      id: 'rioja', label: 'Gobierno de La Rioja · Dirección General de Salud Pública', icon: 'shield', notify: true,
      channel: 'Correo oficial + teléfono de alertas (la autoridad lo notifica en SCIRI)',
      meta: ['10 tiendas en La Rioja', 'Autoridad competente', 'Aviso en español'],
      body: `Misma comunicación con la distribución en La Rioja: ${n0(prov[3].served)} tarros servidos, ${n0(prov[3].sold)} vendidos y ${n0(prov[3].shelf)} en lineal.`,
      refs: LOT, qtyText: `${n0(prov[3].served)} tarros servidos`, action: 'Comunicación a la autoridad sanitaria',
      notice: {
        lang: 'Español',
        headers: { From: 'Calidad · Mercados Moncayo', To: 'Gobierno de La Rioja · Dirección General de Salud Pública · Alertas alimentarias', Subject: `[SIMULACRO] Comunicación de retirada · Tomate frito Moncayo 400 g · lote ${LOT}` },
        subject: `[SIMULACRO] Comunicación de retirada · Tomate frito Moncayo 400 g · lote ${LOT}`,
        body: [
          'Señores:',
          `Conforme al artículo 19 del Reglamento (CE) 178/2002, les comunicamos la retirada del lote ${LOT} de Tomate frito Moncayo 400 g (EAN 8437012300414), fabricado por Conservas del Jalón, S.L. (RGSEAA 21.004512/Z), por la posible presencia de fragmentos de vidrio.`,
          `Distribución en La Rioja: 10 tiendas · ${n0(prov[3].served)} tarros servidos · ${n0(prov[3].sold)} vendidos · ${n0(prov[3].shelf)} en lineal. Se adjunta la relación por tienda. La comunicación principal se ha dirigido a la autoridad de Aragón, donde se encuentran la plataforma y el fabricante.`,
          'Motivo: simulacro de retirada. Comunicación de ejemplo.',
          sig
        ].join('\n\n'),
        highlights: [LOT]
      }
    },
    {
      id: 'aesan', label: 'AESAN · red de alerta (SCIRI)', icon: 'globe', notify: true,
      channel: 'Correo a la red de alerta (copia informativa)',
      meta: ['Agencia Española de Seguridad Alimentaria y Nutrición', 'La notificación oficial la cursan las comunidades', 'Aviso en español'],
      body: 'Copia informativa de la comunicación a las autoridades autonómicas, para que la red de alerta disponga de la distribución completa desde el primer momento.',
      refs: LOT, qtyText: '4.800 tarros', action: 'Copia informativa a la red de alerta',
      notice: {
        lang: 'Español',
        headers: { From: 'Calidad · Mercados Moncayo', To: 'AESAN · Red de alerta alimentaria (SCIRI)', Subject: `[SIMULACRO] Copia informativa · retirada del lote ${LOT} · Tomate frito Moncayo 400 g` },
        subject: `[SIMULACRO] Copia informativa · retirada del lote ${LOT} · Tomate frito Moncayo 400 g`,
        body: `Adjuntamos copia de la comunicación de retirada remitida hoy a las autoridades sanitarias de Aragón y La Rioja: lote ${LOT} de Tomate frito Moncayo 400 g (EAN 8437012300414), fabricante Conservas del Jalón, S.L. (RGSEAA 21.004512/Z), posible presencia de fragmentos de vidrio. 4.800 tarros recibidos, 4.320 servidos a 41 tiendas de Aragón y La Rioja; sin distribución fuera de estas comunidades.\n\nMotivo: simulacro de retirada. Comunicación de ejemplo.\n\n${sig}`,
        highlights: [LOT]
      }
    },
    {
      id: 'fabricante', label: 'Conservas del Jalón, S.L. (fabricante)', icon: 'factory', notify: true,
      channel: 'Portal de proveedores + llamada a su responsable de calidad',
      meta: ['Épila (Zaragoza) · RGSEAA 21.004512/Z', 'Proveedor de marca propia', 'Aviso en español'],
      body: 'Retirada del lote, investigación del vidrio (rayos X y roturas en línea del 02/08) y alcance de los lotes L26215 a L26217 envasados con los mismos tarros TAR-2607-55; 8D en 10 días hábiles.',
      refs: `${LOT} · TAR-2607-55 · TOM-2607-18`, qtyText: '4.800 tarros', action: 'Retirada e investigación con 8D',
      notice: {
        lang: 'Español',
        headers: { From: 'Calidad de proveedores · Mercados Moncayo', To: 'Calidad · Conservas del Jalón, S.L.', Subject: `[SIMULACRO] Retirada del lote ${LOT} · investigación por vidrio · solicitud de 8D` },
        subject: `[SIMULACRO] Retirada del lote ${LOT} · investigación por vidrio · solicitud de 8D`,
        body: [
          'Estimado equipo de Calidad:',
          `Iniciamos la retirada de vuestro lote ${LOT} de Tomate frito Moncayo 400 g (OF CJ-26-0802-2, fabricado el 02/08/2026) por una reclamación de consumidor con un fragmento de vidrio (ATC-2026-0412).`,
          'Os pedimos en 48 h la investigación preliminar:\n1. Registro de roturas de tarros en la línea 2 el 02/08 y procedimiento de limpieza aplicado.\n2. Rechazos y verificaciones del inspector de rayos X durante el lote.\n3. Estado de los lotes L26215, L26216 y L26217, envasados con los mismos tarros TAR-2607-55 de Vidriera del Ebro.\nY el informe 8D en 10 días hábiles (PR-PRO-006).',
          'Conservamos el tarro reclamado y el fragmento para su análisis.',
          'Motivo: simulacro de retirada. Mensaje de ejemplo.',
          'Atentamente,\nCalidad de proveedores · Mercados Moncayo'
        ].join('\n\n'),
        highlights: [LOT, 'TAR-2607-55']
      }
    }
  ];

  /* ---------------------------------------------------------------- Genealogía */

  const nodes = [
    { id: 'TAR', stage: 'mp', kicker: 'Envase', title: 'TAR-2607-55', mono: true, lot: 'TAR-2607-55', sub: 'Tarros de vidrio 400 g', meta: 'Vidriera del Ebro · también en L26215–L26217', alert: 'Origen posible del vidrio', reveal: 1 },
    { id: 'TOM', stage: 'mp', kicker: 'Materia prima', title: 'TOM-2607-18', mono: true, lot: 'TOM-2607-18', sub: 'Tomate triturado concentrado', meta: 'Agrícola Vega del Jalón · cisterna', reveal: 1 },
    { id: 'L', stage: 'lote', kicker: 'Lote', title: LOT, mono: true, lot: LOT, sub: 'Tomate frito Moncayo 400 g', meta: 'Conservas del Jalón · 02/08 · OF CJ-26-0802-2', reveal: 1 },
    { id: 'R', stage: 'plat', kicker: 'Recepción', title: 'REC-PLZ-26-08-0311', mono: true, sub: '05/08 07:20 · 4.800 tarros', meta: '10 palés · 14 rotos retirados en muelle', reveal: 2 },
    { id: 'P', stage: 'plat', kicker: 'Plataforma', title: '480 en P-12-04-2', sub: 'Sin bloquear', meta: '96 reservados para la ola de las 10:30', alert: 'Retener la reposición', alertTone: true, tone: 'planned', reveal: 2 }
  ];
  prov.forEach((p, i) => nodes.push({ id: `S${i}`, stage: 'tie', kicker: 'Tiendas', title: `${p.p} · ${p.n} tiendas`, sub: `${n0(p.served)} tarros servidos`, meta: `${n0(p.sold)} vendidos · ${n0(p.shelf)} en lineal`, alert: p.p === 'Zaragoza' ? 'Incluye T-011 (reclamación)' : '', tone: 'shipped', reveal: 3 }));
  nodes.push(
    { id: 'V', stage: 'ven', kicker: 'Ventas', title: `${n0(T.sold)} vendidos`, sub: `${n0(LOYAL_UNITS)} con tarjeta · ${n0(T.sold - LOYAL_UNITS)} sin identificar`, meta: 'TPV de tiendas', reveal: 4 },
    { id: 'LIN', stage: 'ven', kicker: 'En tienda', title: `${n0(T.shelf)} en lineal`, sub: 'Lineal y almacén de tienda', meta: `${UNSYNC.length} tiendas con TPV sin sincronizar`, alert: 'Retirar y bloquear en TPV', tone: 'planned', reveal: 4 },
    { id: 'C1', stage: 'avi', kicker: 'Aviso', title: '612 clientes de fidelización', sub: 'App, SMS y correo', meta: 'Aviso personal', tone: 'customer', reveal: 5 },
    { id: 'C2', stage: 'avi', kicker: 'Aviso', title: 'Consumidores sin tarjeta', sub: 'Cartel, web y redes', meta: 'Aviso público', tone: 'customer', reveal: 5 },
    { id: 'C3', stage: 'avi', kicker: 'Aviso', title: 'Autoridades sanitarias', sub: 'Aragón y La Rioja · AESAN', meta: 'Reglamento (CE) 178/2002', tone: 'customer', reveal: 5 },
    { id: 'C4', stage: 'avi', kicker: 'Aviso', title: 'Conservas del Jalón', sub: 'Fabricante', meta: 'Investigación y 8D', tone: 'customer', reveal: 5 }
  );
  const edges = [['TAR', 'L'], ['TOM', 'L'], ['L', 'R'], ['R', 'P']].concat(prov.map((p, i) => ['R', `S${i}`])).concat(prov.map((p, i) => [`S${i}`, 'V'])).concat(prov.map((p, i) => [`S${i}`, 'LIN']));
  edges.push(['V', 'C1'], ['V', 'C2'], ['LIN', 'C3'], ['P', 'C3'], ['L', 'C4']);

  /* ---------------------------------------------------------------- Tablas */

  const storeRows = STORES.map((s) => ({
    store: s.id, name: s.name, prov: s.prov, served: s.served, sold: s.sold, shelf: s.shelf, fid: s.fid,
    estado: s.id === 'T-011' ? { status: 'critical', label: 'Tienda de la reclamación' } : UNSYNC.includes(s.id) ? { status: 'warning', label: 'TPV sin sincronizar' } : { status: 'pending', label: 'En lineal' },
    accion: UNSYNC.includes(s.id) ? 'Retirar del lineal · bloqueo manual en caja' : REPO.includes(s.id) ? 'Retirar del lineal · rechazar la reposición de hoy' : 'Retirar del lineal y bloquear en TPV'
  }));

  const locRows = [
    { ref: LOT, tag: true, where: 'Plataforma · P-12-04-2', whereSub: '384 libres · 96 reservados para la ola de reposición de hoy 10:30', n: 1, qty: 480, action: 'Bloquear en WMS y retener la ola de las 10:30', tone: 'crit' }
  ].concat(prov.map((p) => ({ ref: LOT, tag: true, where: `Tiendas de ${p.p}`, whereSub: `${p.n} tiendas · ${n0(p.sold)} vendidos · ${p.fid} clientes de fidelización`, n: p.n, qty: p.shelf, action: 'Retirar del lineal y bloquear en TPV', tone: 'warn' }))).concat([
    { ref: LOT, tag: true, where: 'Vendidos con tarjeta de fidelización', whereSub: '612 clientes identificados en el CRM', n: null, qty: LOYAL_UNITS, action: 'Aviso personal y reembolso sin ticket', tone: '' },
    { ref: LOT, tag: true, where: 'Vendidos sin identificar', whereSub: 'Ventas sin tarjeta', n: null, qty: T.sold - LOYAL_UNITS, action: 'Aviso público en tienda, web y redes', tone: '' }
  ]);

  const scope = {
    headline: 'Tomate frito Moncayo 400 g · EAN 8437012300414 · Conservas del Jalón, S.L. · fabricado el 02/08/2026',
    previewSide: '41 tiendas · 4.800 tarros',
    startNode: 'L',
    stages: [
      { id: 'mp', label: 'Origen', icon: 'leaf' },
      { id: 'lote', label: 'Lote', icon: 'layers' },
      { id: 'plat', label: 'Plataforma', icon: 'warehouse' },
      { id: 'tie', label: 'Tiendas', icon: 'building', count: 41 },
      { id: 'ven', label: 'Ventas y lineal', icon: 'barcode' },
      { id: 'avi', label: 'Avisos', icon: 'mail' }
    ],
    nodes,
    edges,
    systems: ['SAP S/4 Retail', 'WMS Manhattan', 'TPV tiendas', 'CRM Fidelización'],
    genSub: '1 recepción · 41 tiendas · 1.920 vendidos · 612 clientes de fidelización',
    steps: [
      { agent: 'trace', system: 'SAP S/4 Retail', action: 'Localiza el punto de partida', result: 'Tomate frito Moncayo 400 g · EAN 8437012300414 · Conservas del Jalón, S.L. · fabricado el 02/08/2026', ms: 180, reveal: 0, mark: 'Punto de partida localizado' },
      { agent: 'trace', system: 'SAP S/4 Retail', action: 'Hacia atrás: fabricante, materias primas y envase', result: 'Conservas del Jalón (RGSEAA 21.004512/Z) · OF CJ-26-0802-2 · tomate TOM-2607-18 · tarros TAR-2607-55 (Vidriera del Ebro)', ms: 430, reveal: 1, mark: 'Traza hacia atrás completa' },
      { agent: 'trace', system: 'WMS Manhattan', action: 'Recepción en plataforma y ubicaciones', result: 'REC-PLZ-26-08-0311 (05/08) · 10 palés · 480 tarros en P-12-04-2 sin bloquear · 96 reservados para la ola de hoy 10:30', ms: 520, tone: 'warn', reveal: 2 },
      { agent: 'trace', system: 'WMS Manhattan', action: 'Expediciones a tiendas', result: '4.320 tarros a 41 tiendas: Zaragoza 18, Huesca 8, Teruel 5 y La Rioja 10', ms: 610, reveal: 3, mark: 'Tiendas identificadas' },
      { agent: 'trace', system: 'TPV tiendas', action: 'Ventas y existencias por tienda', result: `1.920 vendidos · 2.400 en lineal · ${list(UNSYNC)} con el TPV sin sincronizar desde ayer`, ms: 680, tone: 'warn', reveal: 4, mark: 'Ventas y lineal por tienda' },
      { agent: 'trace', system: 'CRM Fidelización', action: 'Compradores identificados con tarjeta', result: `612 clientes compraron 1.047 tarros · ${n0(appN)} con app · ${smsN} solo SMS · ${mailN} solo correo`, ms: 470, reveal: 5, mark: 'Clientes de fidelización identificados' },
      { agent: 'trace', system: 'SAP S/4 Retail', action: 'Otros lotes con el mismo envase o materia prima', result: 'TAR-2607-55 también en L26215, L26216 y L26217; TOM-2607-18 en L26213 y L26215: fuera del alcance hasta que el fabricante confirme el origen del vidrio', ms: 390, tone: 'warn' },
      { agent: 'bal', system: 'WMS Manhattan', action: 'Movimientos del lote en plataforma y tiendas', result: '4.800 recibidos · 4.320 servidos · 480 en plataforma · 0 mermas registradas en tienda', ms: 410 },
      { agent: 'bal', system: 'Agentic Platform', action: 'Cuadre de unidades: recibido, servido, vendido y en lineal', result: 'Conciliado 100,0 % · 0 tarros sin justificar · 41 de 41 tiendas localizadas', ms: 90, tone: 'ok', mark: 'Cuadre de unidades cerrado' },
      { agent: 'rec', system: 'ServiceNow', action: 'Abre la incidencia de retirada y una tarea por tienda', result: 'INC-RET-2026-0031 en borrador · 41 tareas de tienda sin liberar', ms: 360 },
      { agent: 'rec', system: 'Outlook', action: 'Prepara los avisos sin enviar', result: '7 borradores: tiendas, 612 clientes, aviso público, Aragón, La Rioja, AESAN y fabricante', ms: 640, mark: 'Registro y avisos preparados' }
    ],
    located: { label: 'Unidades localizadas', value: '4.800 de 4.800', sub: '41 tiendas · 2.400 en lineal · 480 en plataforma', icon: 'box', short: '4.800 de 4.800 tarros localizados (1.920 vendidos, 2.400 en lineal de 41 tiendas y 480 en plataforma)' },
    kpiNotify: { label: 'Destinatarios a notificar', value: 7, sub: '41 tiendas · 612 clientes · 2 comunidades · AESAN' },
    balance: {
      title: 'Balance de unidades',
      kpiLabel: 'Balance de unidades conciliado',
      sub: 'Tarros del lote de la recepción al consumidor · movimientos en WMS Manhattan, ventas en TPV, compradores en CRM',
      head: 'Plataforma',
      headSide: '3 flujos · 41 tiendas',
      labels: { in: 'Recibido en plataforma', losses: 'Mermas registradas', out: 'Servido a tiendas', stock: 'En plataforma' },
      detailTitle: 'Detalle por flujo',
      criterio: 'Criterio: la diferencia sin justificar se muestra tal cual, no se reparte. Los 14 tarros rotos en recepción se retiraron en muelle y no se dieron de alta; cada movimiento cita el sistema que lo registra.',
      reportText: 'Recepción y expediciones en WMS Manhattan; ventas y existencias por tienda en los TPV; compradores identificados en el CRM de fidelización; maestro de producto y proveedor en SAP S/4 Retail.',
      flows: [
        {
          key: 'PLAT', seg: 'Plataforma', main: true, unit: 'tarros', colLabel: 'Tarros',
          title: `Recepción REC-PLZ-26-08-0311 → lote ${LOT}`,
          inLabel: 'Recibido · REC-PLZ-26-08-0311', inSub: '05/08/2026 07:20 · 10 palés de 480 · Conservas del Jalón', inStage: 'WMS', inQty: 4800,
          phases: [],
          outs: prov.map((p) => ({ label: `Servido a tiendas de ${p.p}`, sub: `${p.n} tiendas`, stage: 'WMS', qty: p.served })).concat([
            { label: 'En plataforma · P-12-04-2', sub: '384 libres · 96 reservados para la ola de las 10:30', stage: 'WMS', qty: 480, kind: 'stock' }
          ])
        },
        {
          key: 'TIE', seg: 'Tiendas', unit: 'tarros', colLabel: 'Tarros',
          title: 'Tarros servidos a 41 tiendas → ventas y lineal',
          inLabel: 'Servido a tiendas', inSub: '41 tiendas de Aragón y La Rioja', inStage: 'WMS', inQty: T.served,
          phases: [{ title: 'Mermas de tienda (roturas y caducados)', stages: [['TPV', 'Sin mermas registradas para este lote', 0]] }],
          outs: [
            { label: 'Vendidos', sub: 'Ventas en TPV del 06/08 al 28/09', stage: 'TPV', qty: T.sold },
            { label: 'En lineal y almacén de tienda', sub: 'Existencias en TPV a cierre de ayer', stage: 'TPV', qty: T.shelf, kind: 'stock' }
          ]
        },
        {
          key: 'VEN', seg: 'Ventas', unit: 'tarros', colLabel: 'Tarros',
          title: 'Tarros vendidos → compradores',
          inLabel: 'Vendidos', inSub: '41 tiendas', inStage: 'TPV', inQty: T.sold,
          phases: [],
          outs: [
            { label: 'Comprados con tarjeta de fidelización', sub: '612 clientes identificados', stage: 'CRM', qty: LOYAL_UNITS },
            { label: 'Comprados sin identificar', sub: 'Aviso público', stage: 'TPV', qty: T.sold - LOYAL_UNITS }
          ]
        }
      ],
      product: {
        title: 'Distribución por provincia',
        side: '4.320 servidos · 1.920 vendidos · 2.400 en lineal',
        cols: [
          { label: 'Provincia', key: 'p', strong: true, sub: 'nTxt' },
          { label: 'Servidos', key: 'served', num: true },
          { label: 'Vendidos', key: 'sold', num: true },
          { label: 'En lineal', key: 'shelf', num: true },
          { label: 'Clientes fidel.', key: 'fid', num: true },
          { label: 'Localizado', key: 'located', num: true, ok: true }
        ],
        rows: prov.map((p) => Object.assign({}, p, { nTxt: `${p.n} tiendas`, located: '100,0 %' }))
      }
    },
    units: {
      title: 'Tiendas y unidades',
      sub: '41 tiendas · 4.320 tarros servidos · WMS Manhattan, TPV y CRM Fidelización',
      icon: 'building',
      csvLabel: 'Tiendas (CSV)',
      csvName: 'tiendas',
      byLoc: { label: 'Por ubicación', refLabel: 'Lote', whereLabel: 'Ubicación', nLabel: 'Tiendas', qtyLabel: 'Tarros', rows: locRows },
      list: {
        label: 'Tiendas',
        cols: [
          { label: 'Tienda', key: 'store', mono: true, sub: 'name' },
          { label: 'Provincia', key: 'prov' },
          { label: 'Servidos', key: 'served', num: true },
          { label: 'Vendidos', key: 'sold', num: true },
          { label: 'En lineal', key: 'shelf', num: true },
          { label: 'Clientes fidel.', key: 'fid', num: true },
          { label: 'Estado', key: 'estado', chip: true },
          { label: 'Acción en una retirada real', key: 'accion' }
        ],
        rows: storeRows
      },
      extra: {
        id: 'socios',
        label: 'Clientes de fidelización',
        note: '612 socios que compraron el lote, con la tienda, los tarros y el canal de aviso (datos seudonimizados).',
        cols: [
          { label: 'Socio', key: 'socio', mono: true, sub: 'ini' },
          { label: 'Tienda', key: 'store', sub: 'prov' },
          { label: 'Tarros', key: 'units', num: true, sub: 'last' },
          { label: 'Canal de aviso', key: 'chan' },
          { label: 'Acción en una retirada real', key: 'action' }
        ],
        rows: loyal
      }
    },
    customers: {
      title: 'Destinatarios a notificar',
      sub: '41 tiendas · 612 clientes de fidelización · aviso público · 2 comunidades autónomas · AESAN · fabricante',
      items,
      holdsTitle: 'Acciones en plataforma y tiendas',
      holdsIcon: 'warehouse',
      holds: [
        { icon: 'warehouse', tone: 'crit', title: 'Retener la ola de reposición de las 10:30', meta: ['hoy a las 10:30', '96 tarros de P-12-04-2', list(REPO)], body: 'En una retirada real, el jefe de plataforma bloquea la ubicación P-12-04-2 en el WMS: los 480 tarros no salen y la ola se reprograma con otro lote.' },
        { icon: 'barcode', tone: 'warn', title: `Bloqueo manual en caja en ${list(UNSYNC)}`, meta: ['TPV sin sincronizar desde ayer', `${STORES.filter((s) => UNSYNC.includes(s.id)).reduce((a, s) => a + s.shelf, 0)} tarros en lineal`], body: 'El bloqueo de venta por lote no llega a estas cajas hasta que sincronicen: el encargado retira el producto y avisa en caja. Tiendas completas en la pestaña «Tiendas» y en el CSV.' }
      ]
    },
    approval: {
      titlePrefix: 'Retirada del lote y avisos del simulacro',
      scope: [
        { label: 'Tiendas que retirarían el lote', value: '41 tiendas · 2.400 tarros en lineal', status: 'pending', chip: '41' },
        { label: 'Clientes de fidelización', value: '612 clientes · 1.047 tarros (app, SMS y correo)', status: 'pending', chip: '612' },
        { label: 'Plataforma', value: '480 tarros en P-12-04-2 · ola de las 10:30', status: 'evaluate', chip: 'Sin bloqueo en simulacro' },
        { label: 'Autoridades', value: 'Aragón y La Rioja (SCIRI) · copia a AESAN' },
        { label: 'Fabricante', value: 'Conservas del Jalón · investigación y 8D' }
      ],
      effects: [
        'Outlook y CRM Fidelización: 7 avisos guardados como borrador con la marca SIMULACRO; no se envía ninguna notificación',
        'ServiceNow: incidencia INC-RET-2026-0031 y 41 tareas de tienda en borrador, sin liberar',
        'WMS Manhattan y TPV: sin cambios; en un simulacro no se bloquea stock ni la venta',
        'Registro {code} aprobado con los tiempos de cada actividad'
      ]
    },
    report: {
      objeto: 'Simulacro de retirada con punto de partida en {label}. Se comprueba la trazabilidad hacia atrás (fabricante, materia prima y envase) y hacia delante (plataforma, 41 tiendas, ventas, existencias en lineal y clientes de fidelización), con el balance de unidades.',
      noAction: 'El ejercicio no bloquea existencias ni la venta y no envía avisos.',
      results: [
        '41 tiendas retirarían 2.400 tarros del lineal; 612 clientes de fidelización recibirían un aviso personal y 873 tarros vendidos sin identificar requieren aviso público.',
        'Los 480 tarros de plataforma se bloquearían y la ola de reposición de las 10:30 se retendría; 3 tiendas con el TPV sin sincronizar necesitan bloqueo manual en caja.',
        'Comunicación a las autoridades de Aragón y La Rioja (art. 19 del Reglamento (CE) 178/2002) con copia a AESAN.'
      ],
      back: {
        cols: [{ label: 'Etapa', key: 'etapa' }, { label: 'Referencia', key: 'ref', mono: true }, { label: 'Fecha', key: 'fecha' }, { label: 'Detalle', key: 'det' }],
        rows: [
          { etapa: 'Envase', ref: 'TAR-2607-55', fecha: '24/07/2026', det: 'Vidriera del Ebro, S.A. · tarros de 400 g, boca TO 66 · también en L26215–L26217' },
          { etapa: 'Materia prima', ref: 'TOM-2607-18', fecha: '30/07/2026', det: 'Tomate triturado concentrado · Agrícola Vega del Jalón · en cisterna' },
          { etapa: 'Fabricación', ref: 'OF CJ-26-0802-2', fecha: '02/08/2026', det: 'Conservas del Jalón (Épila) · línea 2 · llenado en caliente, esterilización e inspección por rayos X' },
          { etapa: 'Lote', ref: LOT, fecha: '02/08/2026', det: 'Tomate frito Moncayo 400 g · EAN 8437012300414 · consumo preferente 08/2028' },
          { etapa: 'Recepción', ref: 'REC-PLZ-26-08-0311', fecha: '05/08/2026 07:20', det: '10 palés de 480 tarros · 14 tarros rotos retirados en muelle' }
        ]
      },
      fwd: {
        cols: [{ label: 'Tienda', key: 'store', mono: true }, { label: 'Nombre', key: 'name' }, { label: 'Provincia', key: 'prov' }, { label: 'Servidos', key: 'served', num: true }, { label: 'Vendidos', key: 'sold', num: true }, { label: 'En lineal', key: 'shelf', num: true }, { label: 'Clientes fidel.', key: 'fid', num: true }],
        rows: storeRows
      },
      conclusion: 'Conclusión: la información necesaria para retirar el lote se obtiene completa y cuadra tarro a tarro, de la plataforma al consumidor. Acciones de mejora propuestas: forzar la sincronización de los TPV antes de un bloqueo de venta y acordar con las autoridades una plantilla de comunicación de retirada.',
      note: 'Simulacro: no se ha bloqueado stock en el WMS ni la venta en TPV y no se ha enviado ningún aviso. Datos sintéticos de demostración.'
    },
    audit: { back: 'Conservas del Jalón · OF CJ-26-0802-2 · TOM-2607-18 · TAR-2607-55', fwd: '41 tiendas · 1.920 vendidos · 2.400 en lineal · 612 clientes de fidelización · 480 en plataforma' },
    say: [
      'Lo accionable: 2.400 tarros saldrían del lineal de 41 tiendas, los 480 de plataforma se bloquearían y la ola de las 10:30 se retendría; tres tiendas con el TPV sin sincronizar necesitan bloqueo manual.',
      'Cada destinatario recibe su aviso por su canal: tareas a las tiendas, app y SMS a 612 socios, aviso público, comunicación a Aragón y La Rioja con copia a AESAN y 8D al fabricante. En un simulacro no se envía nada. Decide Calidad.'
    ]
  };

  agenticPack('retail', {
    retirada: {
      title: 'Simulacro de retirada',
      nav: 'Simulacro de retirada',
      section: 'Calidad',
      desc: 'Ejercicio de trazabilidad y retirada de un lote de marca propia: genealogía hacia atrás y hacia delante, de la materia prima a la plataforma, cada tienda y cada cliente de fidelización, balance de unidades y destinatarios a notificar, a partir de un lote o de un albarán de recepción.',
      place: 'Plataforma de Plaza',
      approver: 'Responsable de Calidad',
      regPrefix: 'SR-2026-',
      agents: { trace: 'Trazabilidad', bal: 'Balance de unidades', rec: 'Registro y avisos' },
      targetText: 'Objetivo ilustrativo: 4 h',
      todayEstimate: '3–6 h',
      timerRef: 'Objetivo demo: 4 h',
      packLabel: 'Descargar paquete de retirada',
      setup: { title: 'Punto de partida', sub: 'Un lote de producto o un albarán de recepción en plataforma' },
      modes: {
        lote: { label: 'Lote', noun: 'el lote', field: 'Código de lote', icon: 'layers', format: 'L26214', where: 'SAP S/4 Retail y WMS Manhattan' },
        recepcion: { label: 'Recepción', noun: 'la recepción', field: 'Código de recepción', icon: 'warehouse', format: 'REC-PLZ-26-08-0311', where: 'WMS Manhattan' }
      },
      entries: [
        { mode: 'lote', code: LOT, scope: 'l26214', label: `Lote ${LOT}`, option: 'Tomate frito Moncayo 400 g · Conservas del Jalón' },
        { mode: 'recepcion', code: 'REC-PLZ-26-08-0311', scope: 'l26214', label: 'Recepción REC-PLZ-26-08-0311', option: '05/08/2026 · 10 palés · Conservas del Jalón', headline: `Recepción del 05/08/2026 en la Plataforma de Plaza · 10 palés del lote ${LOT} de Conservas del Jalón`, startNode: 'R', startResult: `Recepción del 05/08/2026 · 10 palés de Tomate frito Moncayo 400 g, lote ${LOT} → se traza el lote completo` }
      ],
      examples: [
        { mode: 'lote', code: LOT, label: `Lote ${LOT}` },
        { mode: 'recepcion', code: 'REC-PLZ-26-08-0311', label: 'Recepción REC-PLZ-26-08-0311' }
      ],
      reference: {
        title: 'Referencia de auditoría',
        sub: 'Objetivo del ejercicio; Calidad confirma los requisitos de sus certificaciones y de la autoridad sanitaria',
        items: [
          ['Reglamento (CE) 178/2002', 'Art. 18 y 19: trazabilidad un paso atrás y un paso adelante; si un alimento no es seguro, el operador lo retira, informa a la autoridad competente y, si ha llegado al consumidor, le informa.'],
          ['SCIRI y AESAN', 'La autoridad autonómica traslada la alerta a la red de alerta alimentaria (SCIRI) y, si procede, a la red europea RASFF.'],
          ['IFS Logistics v3 e IFS Food', 'Prueba de trazabilidad y retirada al menos una vez al año. Objetivo ilustrativo del ejercicio: 4 horas.']
        ],
        note: 'Un simulacro no bloquea stock ni la venta y no envía avisos: se mide si la información se obtiene completa, cuadra y a tiempo.'
      },
      legend: { planned: 'Retener o retirar', click: 'Pulsa un lote para ver su traza completa' },
      notice: { title: 'Simulacro de retirada', approved: 'Guardado como borrador con la marca SIMULACRO: no se envía ninguna notificación.' },
      approval: { policy: 'PR-CAL-010 · retirar un lote del lineal o bloquear su venta requiere la aprobación de Calidad', approveLabel: 'Aprobar y cerrar simulacro', rejectPlaceholder: 'Por ejemplo: falta acordar el texto del aviso público con la autoridad sanitaria' },
      clock: { title: 'Cronómetro frente a auditoría', sub: 'Tiempos de la simulación; no son medidas de rendimiento de los sistemas' },
      report: { subtitle: 'Registro del ejercicio de trazabilidad y retirada · Reglamento (CE) 178/2002 · IFS Logistics', approvedText: 'Avisos guardados como borrador con la marca SIMULACRO; no se ha enviado ninguno ni se ha bloqueado la venta.' },
      compare: {
        rows: [
          { k: 'Personas implicadas', today: '4–5: Calidad, plataforma, jefes de zona, Atención al consumidor y Comunicación', agentic: '1: {approver} revisa y aprueba' },
          { k: 'Sistemas consultados', today: '5–6 abiertos a mano: SAP, WMS, informes de TPV, CRM, hojas de cálculo y correo', agentic: '6 conectores consultados por los agentes: SAP S/4 Retail, WMS Manhattan, TPV, CRM Fidelización, ServiceNow y Outlook' },
          { k: 'Pasos', today: '15–20 consultas, extracciones por tienda y listados de socios', agentic: '{steps} pasos automáticos y 1 aprobación' },
          { k: 'Balance de unidades', today: 'Hoja de cálculo con recepciones, servicios y ventas', agentic: 'Calculado por flujo: {reconciled} conciliado' }
        ]
      },
      presenter: {
        idle: [
          'Simulacro de retirada del lote del tomate frito con el vidrio: de la materia prima a cada tienda y cada socio.',
          'Se elige el punto de partida: el lote L26214 o la recepción en plataforma.',
          'Agentic Platform recorre SAP, el WMS, los TPV y el CRM: plataforma, 41 tiendas, ventas, lineal y los 612 clientes de fidelización, y cuadra los 4.800 tarros.'
        ],
        nextIdle: 'Pulsar «Iniciar simulacro» con el lote L26214 (o elegir «Recepción REC-PLZ-26-08-0311»).',
        nextRun: 'Pulsar «Ver aviso» de los 612 clientes o del Gobierno de Aragón y después «Aprobar y cerrar simulacro».',
        nextDone: '«Descargar paquete de retirada»: CSV de tiendas y registro imprimible. Después, «Cuestionario de cliente» (flecha derecha).'
      },
      scopes: { l26214: scope }
    }
  });
})();
