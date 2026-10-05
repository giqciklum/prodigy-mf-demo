/* Mercados Moncayo · traceability records (own-brand lots, manufacturer raw materials and the refrigerated
 * multideck in the alarm), English. Read by App.traceModal from CN_DATA.trace[code]. Synthetic demo data (MFM). */
agenticPackEn('retail', {
  trace: (function () {
    'use strict';

    /* Stores that received lot L26214: [store, name, province, shipped, sold, on shelf, loyalty customers] */
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
    const fmtN = (n) => n.toLocaleString('en-GB');
    const storeRows = STORES.map((s) => ({
      store: s[0], name: s[1], prov: s[2], served: fmtN(s[3]), sold: fmtN(s[4]), shelf: fmtN(s[5]), fid: fmtN(s[6]),
      status: s[0] === 'T-011' ? { status: 'critical', label: 'Complaint store' } : (['T-033', 'T-048', 'T-052'].includes(s[0]) ? { status: 'warning', label: 'POS not synchronised' } : { status: 'pending', label: 'On shelf' })
    }));
    const byProv = {};
    STORES.forEach((s) => { const p = byProv[s[2]] || (byProv[s[2]] = { prov: s[2], n: 0, served: 0, sold: 0, shelf: 0, fid: 0 }); p.n += 1; p.served += s[3]; p.sold += s[4]; p.shelf += s[5]; p.fid += s[6]; });
    const provRows = Object.values(byProv).map((p) => ({ dest: p.prov, what: `${p.n} stores`, served: fmtN(p.served), sold: fmtN(p.sold), shelf: fmtN(p.shelf), fid: fmtN(p.fid), status: 'pending' }))
      .concat([{ dest: 'P-12-04-2', what: 'Plaza distribution centre', served: '480 in the warehouse', sold: '—', shelf: '—', fid: '—', status: { status: 'pending', label: 'Not blocked' } }]);

    const lot = {
      kind: 'Own-brand lot',
      title: 'Lot L26214 · Tomate frito Moncayo 400 g',
      summary: [
        ['Product', 'Tomate frito Moncayo (tomato sauce) · 400 g glass jar · EAN 8437012300414'],
        ['Manufacturer', 'Conservas del Jalón, S.L. (Épila) · RGSEAA 21.004512/Z'],
        ['Manufactured', '02/08/2026 · best before 08/2028'],
        ['Received at the DC', '4,800 jars · 05/08/2026'],
        ['Shipped', '4,320 to 41 stores · 480 at the DC'],
        ['In store', '1,920 sold · 2,400 on shelf'],
        ['Loyalty customers', '612 bought the lot'],
        ['Raw materials', 'Tomato TOM-2607-18 · jars TAR-2607-55']
      ],
      back: [
        { when: '2026-07-24', stage: 'Jars from lot TAR-2607-55', detail: 'Vidriera del Ebro, S.A. delivers 60,000 400 g jars to Conservas del Jalón', ref: 'TAR-2607-55' },
        { when: '2026-07-30', stage: 'Tomato from lot TOM-2607-18', detail: 'Concentrated crushed tomato from the Agrícola Vega del Jalón cooperative', ref: 'TOM-2607-18' },
        { when: '2026-08-02', stage: 'Manufacture and filling', detail: 'Conservas del Jalón line 2: hot filling, sterilisation and in-line glass control (X-ray inspection)', ref: 'OF CJ-26-0802-2' },
        { when: '2026-08-02 11:42', stage: 'Breakage on the manufacturer’s filler', detail: 'A jar breaks on filler L2 during the lot; the manufacturer purges 96 jars under its glass procedure', ref: 'Conservas del Jalón', tone: 'warn' },
        { when: '2026-08-03', stage: 'Manufacturer notification', detail: 'Conservas del Jalón reports the breakage and the purge to Supplier Quality', ref: 'INC-PRO-2026-0049', tone: 'warn' },
        { when: '2026-08-05 07:20', stage: 'Goods-in at the DC', detail: '10 pallets of 480 jars · 14 broken jars on pallet 7, removed at the dock and recorded in the goods-in log', ref: 'REC-PLZ-26-08-0311', tone: 'warn' },
        { when: '2026-08-06', stage: 'First shipments', detail: 'Store replenishment via WMS Manhattan, Zaragoza and La Rioja routes', ref: 'WMS' },
        { when: '2026-09-26 18:52', stage: 'Consumer purchase', detail: 'Javier Lasheras buys 2 jars at T-011 Zaragoza Delicias with his loyalty card', ref: 'Receipt 011-3-260926-0187' },
        { when: '2026-09-28 21:37', stage: 'Complaint', detail: 'Glass fragment in the jar, reported via the loyalty app', ref: 'ATC-2026-0412', tone: 'crit' }
      ],
      forward: {
        title: 'Lot distribution (unit balance)',
        cols: [
          { key: 'dest', label: 'Destination', mono: true, sub: 'what' },
          { key: 'served', label: 'Shipped' },
          { key: 'sold', label: 'Sold' },
          { key: 'shelf', label: 'On shelf' },
          { key: 'fid', label: 'Loyalty cust.' },
          { key: 'status', label: 'Status', chip: true }
        ],
        rows: provRows,
        note: { title: 'Balance closed', body: '4,800 received = 4,320 shipped to 41 stores + 480 at the DC. Of those shipped, 1,920 sold and 2,400 on shelf. Difference: 0 jars (the 14 broken at goods-in were never booked into stock).', icon: 'scale' }
      },
      units: {
        label: 'Stores',
        cols: [
          { key: 'store', label: 'Store', mono: true, sub: 'name' },
          { key: 'prov', label: 'Province' },
          { key: 'served', label: 'Shipped' },
          { key: 'sold', label: 'Sold' },
          { key: 'shelf', label: 'On shelf' },
          { key: 'fid', label: 'Loyalty cust.' },
          { key: 'status', label: 'Status', chip: true }
        ],
        rows: storeRows
      },
      quality: [
        'Approved product specification (PR-PRO-006): in-line X-ray glass inspection and metal detection at the manufacturer.',
        'Lot sterilisation certificate compliant (F0 recorded by the manufacturer).',
        'Manufacturer: a jar broke on filler L2 on 02/08 at 11:42 and 96 jars were purged (INC-PRO-2026-0049).',
        'Goods-in at the DC: 14 broken jars on pallet 7 (0.29 % of the lot), removed at the dock.',
        'No other consumer complaints for this lot up to 28/09.',
        'Allergens: none; labelling compliant with Regulation (EU) No 1169/2011.'
      ],
      notes: [
        { title: 'Glass in an own-brand product', body: 'PR-CAL-010: assess recall of the lot within 4 h, notify AESAN (SCIRI rapid alert network) and the health authorities of Aragón and La Rioja, and notify the 612 loyalty customers.', tone: 'crit', icon: 'alert-triangle' },
        { title: 'DC stock not blocked', body: 'The 480 jars in P-12-04-2 are still available to ship: blocking them requires approval from the Head of Quality.', tone: 'warn', icon: 'lock' }
      ]
    };

    const tom = {
      kind: 'Manufacturer raw material',
      title: 'Lot TOM-2607-18 · concentrated crushed tomato',
      summary: [
        ['Raw material', 'Concentrated crushed tomato 28–30 °Brix'],
        ['Origin', 'Agrícola Vega del Jalón, S. Coop. (Zaragoza)'],
        ['Received by the manufacturer', '30/07/2026 · 18,400 kg in 2 tankers'],
        ['Used in', 'Tomato sauce lots L26213, L26214 and L26215']
      ],
      back: [
        { when: '2026-07-27', stage: 'Harvest and processing', detail: 'Processing tomatoes from the Jalón valley, crushed and concentrated at the cooperative', ref: 'AVJ-26-2207' },
        { when: '2026-07-30', stage: 'Received at Conservas del Jalón', detail: 'Intake analysis compliant (°Brix, pH, Bostwick, Howard mould count)', ref: 'TOM-2607-18', tone: 'ok' }
      ],
      forward: {
        title: 'Finished product lots',
        cols: [
          { key: 'lot', label: 'Lot', mono: true, sub: 'what' },
          { key: 'date', label: 'Manufactured' },
          { key: 'units', label: 'Jars' },
          { key: 'client', label: 'Customer' },
          { key: 'status', label: 'Status', chip: true }
        ],
        rows: [
          { lot: 'L26213', what: 'Tomate frito Moncayo 400 g', date: '01/08/2026', units: '4,800', client: 'Mercados Moncayo', status: 'ok' },
          { lot: 'L26214', what: 'Tomate frito Moncayo 400 g', date: '02/08/2026', units: '4,800', client: 'Mercados Moncayo', status: { status: 'critical', label: 'Complaint ATC-2026-0412' } },
          { lot: 'L26215', what: 'Tomate frito Moncayo 400 g', date: '03/08/2026', units: '4,800', client: 'Mercados Moncayo', status: 'ok' }
        ],
        note: { title: 'Unrelated to the glass', body: 'The tomato arrives by tanker: it cannot be a source of glass. It is included to complete the lot trace.', icon: 'info' }
      },
      quality: ['°Brix 28.6 · pH 4.2 · Bostwick consistency 5.1 cm · Howard mould count 22 % positive fields (limit 40 %).'],
      notes: []
    };

    const tar = {
      kind: 'Manufacturer packaging material',
      title: 'Lot TAR-2607-55 · 400 g glass jars',
      summary: [
        ['Container', '400 g glass jar · TO 66 finish · soda-lime glass'],
        ['Supplier', 'Vidriera del Ebro, S.A.'],
        ['Received by the manufacturer', '24/07/2026 · 60,000 jars on 25 pallets'],
        ['Used in', 'L26214 to L26217 (Moncayo) and 2 lots for other brands']
      ],
      back: [
        { when: '2026-07-20', stage: 'Glass manufacture', detail: 'Vidriera del Ebro furnace 2, mould 400-TO66-B', ref: 'VE-26-2007-H2' },
        { when: '2026-07-24', stage: 'Received at Conservas del Jalón', detail: 'Sampling inspection: no critical defects (inclusions, cracks, internal flash)', ref: 'TAR-2607-55', tone: 'ok' }
      ],
      forward: {
        title: 'Lots filled with these jars',
        cols: [
          { key: 'lot', label: 'Lot', mono: true, sub: 'what' },
          { key: 'date', label: 'Filled' },
          { key: 'units', label: 'Jars' },
          { key: 'status', label: 'Status', chip: true }
        ],
        rows: [
          { lot: 'L26214', what: 'Tomate frito Moncayo 400 g', date: '02/08/2026', units: '4,800', status: { status: 'critical', label: 'Complaint' } },
          { lot: 'L26215', what: 'Tomate frito Moncayo 400 g', date: '03/08/2026', units: '4,800', status: 'ok' },
          { lot: 'L26216', what: 'Moncayo tomato and basil sauce 400 g', date: '04/08/2026', units: '3,600', status: 'ok' },
          { lot: 'L26217', what: 'Pisto Moncayo 400 g (vegetable ratatouille)', date: '05/08/2026', units: '3,600', status: 'ok' },
          { lot: 'Other brands', what: '2 lots for other customers of the manufacturer', date: '06–08/08/2026', units: '18,200', status: 'info' }
        ],
        note: { title: 'To be confirmed with the manufacturer', body: 'Ask Conservas del Jalón for the in-line breakage log and the X-ray inspector rejects from 02/08 for L26214.', icon: 'search' }
      },
      quality: ['Manufacturer’s intake inspection compliant.', 'No previous glass complaints in other lots using this container.'],
      notes: []
    };

    /* Product in multideck MR-3 at T-027 during the alarm (318 units). */
    const MURAL = [
      ['Moncayo natural yoghurt 4 × 125 g', 'L26268', '15/10/2026', 48],
      ['Moncayo fresh whole milk 1 l', 'L26270', '04/10/2026', 40],
      ['Moncayo Greek yoghurt 4 × 115 g', 'L26271', '18/10/2026', 36],
      ['Moncayo custard 4 × 125 g', 'L26259', '12/10/2026', 30],
      ['Moncayo natural bifidus yoghurt 4 × 125 g', 'L26264', '14/10/2026', 30],
      ['Moncayo egg flan 4 × 100 g', 'L26262', '11/10/2026', 24],
      ['Moncayo rice pudding 4 × 125 g', 'L26266', '13/10/2026', 24],
      ['Moncayo whipped fresh cheese 500 g', 'L26258', '16/10/2026', 22],
      ['Moncayo natural kefir 500 g', 'L26265', '20/10/2026', 18],
      ['Moncayo whipping cream 200 ml', 'L26244', '28/11/2026', 18],
      ['Moncayo cuajada (junket) 4 × 150 g', 'L26261', '09/10/2026', 16],
      ['Moncayo butter 250 g', 'L26231', '15/01/2027', 12]
    ];
    const mural = {
      kind: 'Refrigerated multideck',
      title: 'Dairy multideck MR-3 · T-027 Huesca Centro',
      summary: [
        ['Equipment', '3.75 m open multideck with night blind · evaporator EV-MR3'],
        ['Set point', '3 °C · limit 5 °C · critical 8 °C (APPCC-TIE-01)'],
        ['Alarm', 'ALM-T027-0550 · above 5 °C since 03:55'],
        ['Peak', '9.8 °C at 05:30 · now 9.4 °C'],
        ['Units inside', '318 across 12 lines'],
        ['Probable cause', 'Evaporator fan motor (0 A since 03:10)'],
        ['Store', 'Opens at 09:00 · manager on site from 07:00'],
        ['Maintenance', 'Frío Industrial Oscense · 24 h contract']
      ],
      back: [
        { when: '2026-09-28 21:30', stage: 'Store closing', detail: 'Night blind lowered; multideck at 3.1 °C', ref: 'T-027' },
        { when: '2026-09-29 01:00', stage: 'Scheduled defrost', detail: 'Rises to 4.3 °C and returns to set point at 01:30', ref: 'EV-MR3' },
        { when: '2026-09-29 03:10', stage: 'Fan failure', detail: 'The evaporator fan stops drawing current', ref: 'EV-MR3', tone: 'warn' },
        { when: '2026-09-29 03:55', stage: 'Above 5 °C', detail: 'Alert to the alarm receiving centre; store closed', ref: 'TS-T027-MR3', tone: 'crit' },
        { when: '2026-09-29 05:50', stage: 'Alarm escalated', detail: '115 min above the limit; escalated to Quality', ref: 'ALM-T027-0550', tone: 'crit' }
      ],
      forward: {
        title: 'Proposed product disposition',
        cols: [
          { key: 'group', label: 'Group' },
          { key: 'units', label: 'Units' },
          { key: 'action', label: 'Action' },
          { key: 'status', label: 'Status', chip: true }
        ],
        rows: [
          { group: 'Whole multideck (exposed > 2 h above 5 °C at 05:55)', units: '318', action: 'Remove, move to cold room T027-CL and block sale at the POS', status: 'pending' },
          { group: 'Fresh milk, dairy desserts and fresh cheese', units: '156', action: 'Destruction proposed (> 8 °C for 60 min)', status: 'evaluate' },
          { group: 'Yoghurts, bifidus and kefir', units: '132', action: 'Quality assessment (fermented product)', status: 'evaluate' },
          { group: 'Cream and butter', units: '30', action: 'Quality assessment', status: 'evaluate' }
        ],
        note: { title: 'Approval required', body: 'Blocking the sale at the POS and deciding the product disposition requires approval from the Head of Quality.', icon: 'lock' }
      },
      units: {
        label: 'Product in the multideck',
        cols: [
          { key: 'product', label: 'Line', sub: 'lot' },
          { key: 'cad', label: 'Use by' },
          { key: 'units', label: 'Units' },
          { key: 'status', label: 'Status', chip: true }
        ],
        rows: MURAL.map((m) => ({ product: m[0], lot: `Lot ${m[1]}`, cad: m[2], units: String(m[3]), status: 'hold' }))
      },
      quality: [
        'APPCC-TIE-01: chilled product held above 5 °C for more than 2 h, or above 8 °C, is withdrawn from sale and assessed by Quality.',
        'The 318 units comprise 156 of milk, desserts and fresh cheese, 132 fermented products and 30 of cream and butter.',
        'Last verification of probe TS-T027-MR3: 02/09/2026, compliant (± 0.3 °C).'
      ],
      notes: [
        { title: 'Before opening', body: 'The store opens at 09:00: the POS block must be active beforehand, even if the product has already been removed.', tone: 'warn', icon: 'clock' }
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
