/* Mercados Moncayo · registros de trazabilidad (lotes de marca propia, materias primas del fabricante y mural
 * refrigerado de la alarma). Los lee App.traceModal desde CN_DATA.trace[código]. Datos sintéticos de demostración (MFM). */
agenticPack('retail', {
  trace: (function () {
    'use strict';

    /* Tiendas que recibieron el lote L26214: [tienda, nombre, provincia, servidas, vendidas, en lineal, clientes de fidelización] */
    const STORES = [
      ["T-001","Zaragoza Centro","Zaragoza",84,29,55,8],
      ["T-003","Zaragoza Actur","Zaragoza",120,66,54,20],
      ["T-004","Zaragoza Las Fuentes","Zaragoza",108,39,69,12],
      ["T-006","Zaragoza San José","Zaragoza",84,27,57,9],
      ["T-008","Zaragoza Torrero","Zaragoza",156,80,76,26],
      ["T-011","Zaragoza Delicias","Zaragoza",108,72,36,23],
      ["T-012","Zaragoza Valdespartera","Zaragoza",108,53,55,17],
      ["T-013","Zaragoza Oliver","Zaragoza",108,61,47,20],
      ["T-014","Calatayud","Zaragoza",108,55,53,18],
      ["T-016","Ejea de los Caballeros","Zaragoza",84,33,51,11],
      ["T-017","Tarazona","Zaragoza",84,29,55,9],
      ["T-018","Caspe","Zaragoza",120,55,65,18],
      ["T-019","Utebo","Zaragoza",72,20,52,6],
      ["T-020","Cuarte de Huerva","Zaragoza",96,52,44,17],
      ["T-022","La Almunia de Doña Godina","Zaragoza",120,62,58,20],
      ["T-023","Alagón","Zaragoza",132,51,81,16],
      ["T-024","Borja","Zaragoza",96,50,46,16],
      ["T-025","Zuera","Zaragoza",72,20,52,6],
      ["T-027","Huesca Centro","Huesca",84,39,45,12],
      ["T-028","Huesca Santo Domingo","Huesca",132,73,59,23],
      ["T-030","Barbastro","Huesca",120,52,68,17],
      ["T-031","Monzón","Huesca",108,51,57,16],
      ["T-032","Fraga","Huesca",108,46,62,15],
      ["T-033","Jaca","Huesca",84,43,41,14],
      ["T-034","Sabiñánigo","Huesca",96,38,58,12],
      ["T-036","Binéfar","Huesca",132,72,60,23],
      ["T-038","Teruel Centro","Teruel",72,41,31,13],
      ["T-039","Teruel Ensanche","Teruel",84,34,50,11],
      ["T-040","Alcañiz","Teruel",120,62,58,20],
      ["T-041","Andorra","Teruel",120,52,68,17],
      ["T-043","Calamocha","Teruel",72,25,47,8],
      ["T-044","Logroño Cascajos","La Rioja",96,29,67,9],
      ["T-045","Logroño Centro","La Rioja",144,44,100,14],
      ["T-046","Logroño El Arco","La Rioja",108,56,52,18],
      ["T-047","Calahorra","La Rioja",72,23,49,7],
      ["T-048","Haro","La Rioja",120,47,73,15],
      ["T-050","Arnedo","La Rioja",144,64,80,20],
      ["T-051","Alfaro","La Rioja",96,38,58,12],
      ["T-052","Nájera","La Rioja",144,61,83,20],
      ["T-053","Santo Domingo de la Calzada","La Rioja",72,23,49,7],
      ["T-055","Lardero","La Rioja",132,53,79,17]

    ];
    const fmtN = (n) => n.toLocaleString('es-ES');
    const storeRows = STORES.map((s) => ({
      store: s[0], name: s[1], prov: s[2], served: fmtN(s[3]), sold: fmtN(s[4]), shelf: fmtN(s[5]), fid: fmtN(s[6]),
      status: s[0] === 'T-011' ? { status: 'critical', label: 'Tienda de la reclamación' } : (['T-033', 'T-048', 'T-052'].includes(s[0]) ? { status: 'warning', label: 'TPV sin sincronizar' } : { status: 'pending', label: 'En lineal' })
    }));
    const byProv = {};
    STORES.forEach((s) => { const p = byProv[s[2]] || (byProv[s[2]] = { prov: s[2], n: 0, served: 0, sold: 0, shelf: 0, fid: 0 }); p.n += 1; p.served += s[3]; p.sold += s[4]; p.shelf += s[5]; p.fid += s[6]; });
    const provRows = Object.values(byProv).map((p) => ({ dest: p.prov, what: `${p.n} tiendas`, served: fmtN(p.served), sold: fmtN(p.sold), shelf: fmtN(p.shelf), fid: fmtN(p.fid), status: 'pending' }))
      .concat([{ dest: 'P-12-04-2', what: 'Plataforma de Plaza', served: '480 en almacén', sold: '—', shelf: '—', fid: '—', status: { status: 'pending', label: 'Sin bloquear' } }]);

    const lot = {
      kind: 'Lote de marca propia',
      title: 'Lote L26214 · Tomate frito Moncayo 400 g',
      summary: [
        ['Producto', 'Tomate frito Moncayo · tarro de vidrio de 400 g · EAN 8437012300414'],
        ['Fabricante', 'Conservas del Jalón, S.L. (Épila) · RGSEAA 21.004512/Z'],
        ['Fabricado', '02/08/2026 · consumo preferente 08/2028'],
        ['Recibidas en plataforma', '4.800 tarros · 05/08/2026'],
        ['Servidas', '4.320 a 41 tiendas · 480 en plataforma'],
        ['En tienda', '1.920 vendidas · 2.400 en lineal'],
        ['Clientes de fidelización', '612 compraron el lote'],
        ['Materias primas', 'Tomate TOM-2607-18 · tarros TAR-2607-55']
      ],
      back: [
        { when: '2026-07-24', stage: 'Tarros del lote TAR-2607-55', detail: 'Vidriera del Ebro, S.A. entrega 60.000 tarros de 400 g a Conservas del Jalón', ref: 'TAR-2607-55' },
        { when: '2026-07-30', stage: 'Tomate del lote TOM-2607-18', detail: 'Tomate triturado concentrado de la cooperativa Agrícola Vega del Jalón', ref: 'TOM-2607-18' },
        { when: '2026-08-02', stage: 'Fabricación y envasado', detail: 'Línea 2 de Conservas del Jalón: llenado en caliente, esterilización y control de vidrio en línea (inspección por rayos X)', ref: 'OF CJ-26-0802-2' },
        { when: '2026-08-02 11:42', stage: 'Rotura en la llenadora del fabricante', detail: 'Rotura de un tarro en la llenadora L2 durante el lote; el fabricante purga 96 tarros según su procedimiento de vidrio', ref: 'Conservas del Jalón', tone: 'warn' },
        { when: '2026-08-03', stage: 'Aviso del fabricante', detail: 'Conservas del Jalón comunica la rotura y la purga a Calidad de proveedores', ref: 'INC-PRO-2026-0049', tone: 'warn' },
        { when: '2026-08-05 07:20', stage: 'Recepción en plataforma', detail: '10 palés de 480 tarros · 14 tarros rotos en el palé 7, retirados en muelle y anotados en el registro de recepción', ref: 'REC-PLZ-26-08-0311', tone: 'warn' },
        { when: '2026-08-06', stage: 'Primeras expediciones', detail: 'Reposición a tiendas por WMS Manhattan, rutas de Zaragoza y La Rioja', ref: 'WMS' },
        { when: '2026-09-26 18:52', stage: 'Compra del consumidor', detail: 'Javier Lasheras compra 2 tarros en T-011 Zaragoza Delicias con su tarjeta de fidelización', ref: 'Ticket 011-3-260926-0187' },
        { when: '2026-09-28 21:37', stage: 'Reclamación', detail: 'Fragmento de vidrio en el tarro, comunicado desde la app de fidelización', ref: 'ATC-2026-0412', tone: 'crit' }
      ],
      forward: {
        title: 'Reparto del lote (balance de unidades)',
        cols: [
          { key: 'dest', label: 'Destino', mono: true, sub: 'what' },
          { key: 'served', label: 'Servidas' },
          { key: 'sold', label: 'Vendidas' },
          { key: 'shelf', label: 'En lineal' },
          { key: 'fid', label: 'Clientes fidel.' },
          { key: 'status', label: 'Estado', chip: true }
        ],
        rows: provRows,
        note: { title: 'Balance cerrado', body: '4.800 recibidas = 4.320 servidas a 41 tiendas + 480 en plataforma. De las servidas, 1.920 vendidas y 2.400 en lineal. Diferencia: 0 tarros (los 14 rotos en recepción no se dieron de alta).', icon: 'scale' }
      },
      units: {
        label: 'Tiendas',
        cols: [
          { key: 'store', label: 'Tienda', mono: true, sub: 'name' },
          { key: 'prov', label: 'Provincia' },
          { key: 'served', label: 'Servidas' },
          { key: 'sold', label: 'Vendidas' },
          { key: 'shelf', label: 'En lineal' },
          { key: 'fid', label: 'Clientes fidel.' },
          { key: 'status', label: 'Estado', chip: true }
        ],
        rows: storeRows
      },
      quality: [
        'Ficha técnica homologada (PR-PRO-006): control de vidrio en línea por rayos X y detector de metales en el fabricante.',
        'Certificado de esterilización del lote conforme (F0 registrado por el fabricante).',
        'Fabricante: rotura de un tarro en la llenadora L2 el 02/08 a las 11:42 y purga de 96 tarros (INC-PRO-2026-0049).',
        'Recepción en plataforma: 14 tarros rotos en el palé 7 (0,29 % del lote), retirados en muelle.',
        'Sin otras reclamaciones de consumidor de este lote hasta el 28/09.',
        'Alérgenos: no contiene; etiquetado conforme al Reglamento (UE) 1169/2011.'
      ],
      notes: [
        { title: 'Vidrio en un producto de marca propia', body: 'PR-CAL-010: valorar la retirada del lote en 4 h, aviso a AESAN (red de alerta SCIRI) y a las autoridades sanitarias de Aragón y La Rioja, y aviso a los 612 clientes de fidelización.', tone: 'crit', icon: 'alert-triangle' },
        { title: 'Plataforma sin bloquear', body: 'Los 480 tarros de P-12-04-2 siguen disponibles para servir: bloquearlos requiere la aprobación de la Responsable de Calidad.', tone: 'warn', icon: 'lock' }
      ]
    };

    const tom = {
      kind: 'Materia prima del fabricante',
      title: 'Lote TOM-2607-18 · tomate triturado concentrado',
      summary: [
        ['Materia prima', 'Tomate triturado concentrado 28–30 °Brix'],
        ['Origen', 'Agrícola Vega del Jalón, S. Coop. (Zaragoza)'],
        ['Recibido por el fabricante', '30/07/2026 · 18.400 kg en 2 cisternas'],
        ['Usado en', 'Lotes de tomate frito L26213, L26214 y L26215']
      ],
      back: [
        { when: '2026-07-27', stage: 'Cosecha y procesado', detail: 'Tomate de industria de la vega del Jalón, triturado y concentrado en la cooperativa', ref: 'AVJ-26-2207' },
        { when: '2026-07-30', stage: 'Recepción en Conservas del Jalón', detail: 'Análisis de recepción conforme (°Brix, pH, Bostwick, mohos Howard)', ref: 'TOM-2607-18', tone: 'ok' }
      ],
      forward: {
        title: 'Lotes de producto terminado',
        cols: [
          { key: 'lot', label: 'Lote', mono: true, sub: 'what' },
          { key: 'date', label: 'Fabricado' },
          { key: 'units', label: 'Tarros' },
          { key: 'client', label: 'Cliente' },
          { key: 'status', label: 'Estado', chip: true }
        ],
        rows: [
          { lot: 'L26213', what: 'Tomate frito Moncayo 400 g', date: '01/08/2026', units: '4.800', client: 'Mercados Moncayo', status: 'ok' },
          { lot: 'L26214', what: 'Tomate frito Moncayo 400 g', date: '02/08/2026', units: '4.800', client: 'Mercados Moncayo', status: { status: 'critical', label: 'Reclamación ATC-2026-0412' } },
          { lot: 'L26215', what: 'Tomate frito Moncayo 400 g', date: '03/08/2026', units: '4.800', client: 'Mercados Moncayo', status: 'ok' }
        ],
        note: { title: 'Sin relación con el vidrio', body: 'El tomate llega en cisterna: no es fuente posible de vidrio. Se incluye para completar la traza del lote.', icon: 'info' }
      },
      quality: ['°Brix 28,6 · pH 4,2 · consistencia Bostwick 5,1 cm · mohos Howard 22 % de campos positivos (límite 40 %).'],
      notes: []
    };

    const tar = {
      kind: 'Material de envase del fabricante',
      title: 'Lote TAR-2607-55 · tarros de vidrio de 400 g',
      summary: [
        ['Envase', 'Tarro de vidrio de 400 g · boca TO 66 · vidrio sódico-cálcico'],
        ['Proveedor', 'Vidriera del Ebro, S.A.'],
        ['Recibido por el fabricante', '24/07/2026 · 60.000 tarros en 25 palés'],
        ['Usado en', 'L26214 a L26217 (Moncayo) y 2 lotes de otras marcas']
      ],
      back: [
        { when: '2026-07-20', stage: 'Fabricación del vidrio', detail: 'Horno 2 de Vidriera del Ebro, molde 400-TO66-B', ref: 'VE-26-2007-H2' },
        { when: '2026-07-24', stage: 'Recepción en Conservas del Jalón', detail: 'Inspección por muestreo: sin defectos críticos (inclusiones, grietas, rebabas internas)', ref: 'TAR-2607-55', tone: 'ok' }
      ],
      forward: {
        title: 'Lotes envasados con estos tarros',
        cols: [
          { key: 'lot', label: 'Lote', mono: true, sub: 'what' },
          { key: 'date', label: 'Envasado' },
          { key: 'units', label: 'Tarros' },
          { key: 'status', label: 'Estado', chip: true }
        ],
        rows: [
          { lot: 'L26214', what: 'Tomate frito Moncayo 400 g', date: '02/08/2026', units: '4.800', status: { status: 'critical', label: 'Reclamación' } },
          { lot: 'L26215', what: 'Tomate frito Moncayo 400 g', date: '03/08/2026', units: '4.800', status: 'ok' },
          { lot: 'L26216', what: 'Salsa de tomate con albahaca Moncayo 400 g', date: '04/08/2026', units: '3.600', status: 'ok' },
          { lot: 'L26217', what: 'Pisto Moncayo 400 g', date: '05/08/2026', units: '3.600', status: 'ok' },
          { lot: 'Otras marcas', what: '2 lotes de clientes del fabricante', date: '06–08/08/2026', units: '18.200', status: 'info' }
        ],
        note: { title: 'A confirmar con el fabricante', body: 'Pedir a Conservas del Jalón el registro de roturas en línea y los rechazos del inspector de rayos X del 02/08 para L26214.', icon: 'search' }
      },
      quality: ['Inspección de recepción del fabricante conforme.', 'Sin reclamaciones previas por vidrio en otros lotes de este envase.'],
      notes: []
    };

    /* Producto del mural MR-3 de T-027 durante la alarma (318 unidades). */
    const MURAL = [
      ['Yogur natural Moncayo 4 × 125 g', 'L26268', '15/10/2026', 48],
      ['Leche fresca entera Moncayo 1 l', 'L26270', '04/10/2026', 40],
      ['Yogur griego Moncayo 4 × 115 g', 'L26271', '18/10/2026', 36],
      ['Natillas Moncayo 4 × 125 g', 'L26259', '12/10/2026', 30],
      ['Bífidus natural Moncayo 4 × 125 g', 'L26264', '14/10/2026', 30],
      ['Flan de huevo Moncayo 4 × 100 g', 'L26262', '11/10/2026', 24],
      ['Arroz con leche Moncayo 4 × 125 g', 'L26266', '13/10/2026', 24],
      ['Queso fresco batido Moncayo 500 g', 'L26258', '16/10/2026', 22],
      ['Kéfir natural Moncayo 500 g', 'L26265', '20/10/2026', 18],
      ['Nata para montar Moncayo 200 ml', 'L26244', '28/11/2026', 18],
      ['Cuajada Moncayo 4 × 150 g', 'L26261', '09/10/2026', 16],
      ['Mantequilla Moncayo 250 g', 'L26231', '15/01/2027', 12]
    ];
    const mural = {
      kind: 'Mural refrigerado',
      title: 'Mural de lácteos MR-3 · T-027 Huesca Centro',
      summary: [
        ['Equipo', 'Mural abierto de 3,75 m con cortina nocturna · evaporador EV-MR3'],
        ['Consigna', '3 °C · límite 5 °C · crítico 8 °C (APPCC-TIE-01)'],
        ['Alarma', 'ALM-T027-0550 · por encima de 5 °C desde las 03:55'],
        ['Pico', '9,8 °C a las 05:30 · ahora 9,4 °C'],
        ['Unidades dentro', '318 de 12 referencias'],
        ['Causa probable', 'Motor del ventilador del evaporador (0 A desde las 03:10)'],
        ['Tienda', 'Abre a las 09:00 · encargado desde las 07:00'],
        ['Mantenimiento', 'Frío Industrial Oscense · contrato 24 h']
      ],
      back: [
        { when: '2026-09-28 21:30', stage: 'Cierre de la tienda', detail: 'Cortina nocturna bajada; mural a 3,1 °C', ref: 'T-027' },
        { when: '2026-09-29 01:00', stage: 'Desescarche programado', detail: 'Sube a 4,3 °C y vuelve a consigna a las 01:30', ref: 'EV-MR3' },
        { when: '2026-09-29 03:10', stage: 'Fallo del ventilador', detail: 'El ventilador del evaporador deja de consumir', ref: 'EV-MR3', tone: 'warn' },
        { when: '2026-09-29 03:55', stage: 'Por encima de 5 °C', detail: 'Aviso a la central de alarmas; tienda cerrada', ref: 'TS-T027-MR3', tone: 'crit' },
        { when: '2026-09-29 05:50', stage: 'Alarma escalada', detail: '115 min por encima del límite; se escala a Calidad', ref: 'ALM-T027-0550', tone: 'crit' }
      ],
      forward: {
        title: 'Destino propuesto del producto',
        cols: [
          { key: 'group', label: 'Grupo' },
          { key: 'units', label: 'Unidades' },
          { key: 'action', label: 'Acción' },
          { key: 'status', label: 'Estado', chip: true }
        ],
        rows: [
          { group: 'Todo el mural (expuesto > 2 h por encima de 5 °C a las 05:55)', units: '318', action: 'Retirar, trasladar a la cámara T027-CL y bloquear la venta en TPV', status: 'pending' },
          { group: 'Leche fresca, postres lácteos y queso fresco', units: '156', action: 'Destrucción propuesta (> 8 °C durante 60 min)', status: 'evaluate' },
          { group: 'Yogures, bífidus y kéfir', units: '132', action: 'Evaluación de Calidad (producto fermentado)', status: 'evaluate' },
          { group: 'Nata y mantequilla', units: '30', action: 'Evaluación de Calidad', status: 'evaluate' }
        ],
        note: { title: 'Requiere aprobación', body: 'Bloquear la venta en TPV y decidir el destino del producto requiere la aprobación de la Responsable de Calidad.', icon: 'lock' }
      },
      units: {
        label: 'Producto en el mural',
        cols: [
          { key: 'product', label: 'Referencia', sub: 'lot' },
          { key: 'cad', label: 'Caducidad' },
          { key: 'units', label: 'Unidades' },
          { key: 'status', label: 'Estado', chip: true }
        ],
        rows: MURAL.map((m) => ({ product: m[0], lot: `Lote ${m[1]}`, cad: m[2], units: String(m[3]), status: 'hold' }))
      },
      quality: [
        'APPCC-TIE-01: producto refrigerado por encima de 5 °C más de 2 h, o por encima de 8 °C, se retira de la venta y lo evalúa Calidad.',
        'Las 318 unidades suman 156 de leche, postres y queso fresco, 132 de fermentados y 30 de nata y mantequilla.',
        'Última verificación de la sonda TS-T027-MR3: 02/09/2026, conforme (± 0,3 °C).'
      ],
      notes: [
        { title: 'Antes de la apertura', body: 'La tienda abre a las 09:00: el bloqueo en TPV debe estar activo antes, aunque el producto ya esté retirado.', tone: 'warn', icon: 'clock' }
      ]
    };

    return {
      L26214: lot,
      'TOM-2607-18': tom,
      'TAR-2607-55': tar,
      'MR-3': mural,
      'T-027-MR-3': mural,
      'T027-MR3': mural,
      'ALM-T027-0550': mural
    };
  })()
});
