/* Cervecera Bardenas · traceability records (keg batches, fermentation batches and raw materials), English.
 * Read by App.traceModal from CN_DATA.trace[code]. Synthetic demo data (MFM). */
agenticPackEn('cerveceria', {
  trace: (function () {
    'use strict';

    /* Customers of batch L2608-K14: [customer, type, town, kegs, dispatch date, delivery note] */
    const CLIENTS = [
      ['Distribuciones Hosteleras Ribera, S.L.', 'Distributor', 'Tudela', 168, '20/08/2026', 'ALB-26-08-2211'],
      ['Bebidas Ebro Distribución, S.L.', 'Distributor', 'Zaragoza', 142, '20/08/2026', 'ALB-26-08-2214'],
      ['Distribuciones Cierzo Hostelería, S.A.', 'Distributor', 'Pamplona', 96, '21/08/2026', 'ALB-26-08-2230'],
      ['Comercial Rioja Baja, S.L.', 'Distributor', 'Calahorra', 74, '21/08/2026', 'ALB-26-08-2233'],
      ['Bebidas Bardenas Logroño, S.L.', 'Distributor', 'Logroño', 66, '24/08/2026', 'ALB-26-08-2290'],
      ['Club Deportivo Arenas', 'Events', 'Logroño', 60, '25/08/2026', 'ALB-26-08-2302'],
      ['Hostelería Moncayo Distribución, S.L.', 'Distributor', 'Tarazona', 58, '25/08/2026', 'ALB-26-08-2305'],
      ['Grupo Bares Plaza, S.L.', 'On-trade (chain)', 'Zaragoza', 52, '26/08/2026', 'ALB-26-08-2318'],
      ['Distribuciones Arga, S.L.', 'Distributor', 'Estella', 48, '27/08/2026', 'ALB-26-08-2340'],
      ['Distribuidora Tudelana de Bebidas, S.L.', 'Distributor', 'Tudela', 40, '27/08/2026', 'ALB-26-08-2342'],
      ['Catering Navarro, S.L.', 'Catering', 'Pamplona', 36, '28/08/2026', 'ALB-26-08-2361'],
      ['Cervecería El Tubo', 'On-trade', 'Zaragoza', 30, '31/08/2026', 'ALB-26-08-2398'],
      ['Restaurantes La Ribera, S.L.', 'On-trade', 'Tudela', 24, '01/09/2026', 'ALB-26-09-0012'],
      ['Hotel Tres Reyes', 'On-trade', 'Pamplona', 18, '02/09/2026', 'ALB-26-09-0031']
    ];
    const fmtN = (n) => n.toLocaleString('en-GB');
    const clientRows = CLIENTS.map((c) => ({
      client: c[0], type: `${c[1]} · ${c[2]}`, kegs: fmtN(c[3]), hl: fmtN(c[3] * 0.3).replace(/^(\d+)$/, '$1'), date: c[4], ref: c[5],
      status: /Ribera/.test(c[0]) && /Hosteleras/.test(c[0]) ? { status: 'critical', label: 'Complaint REC-2026-0093' } : { status: 'shipped', label: 'Dispatched' }
    }));

    const k14 = {
      kind: 'Keg batch',
      title: 'Batch L2608-K14 · Bardenas Lager in 30 l kegs',
      summary: [
        ['Product', 'Bardenas Lager · 30 l stainless steel KeyKeg'],
        ['Packaged', '18/08/2026 · keg filler LLB-1'],
        ['Beer', 'Fermentation batch L2607-FV05 (bright beer tank BBT-2)'],
        ['Kegs', '1,040 filled (312 hl)'],
        ['Destination', '912 dispatched to 14 customers · 96 in warehouse · 32 on hold'],
        ['Best before', '18/02/2027'],
        ['Dissolved O₂ at filling', '64 ppb (specification ≤ 50) · released under deviation'],
        ['Raw materials', 'Malt MAL-2607-05 · hops LUP-2606-11 · CO₂ CO2-2608-02']
      ],
      back: [
        { when: '2026-07-14', stage: 'Malt', detail: 'Pilsner malt from lot MAL-2607-05 (Maltas de Castilla) in silo 2', ref: 'MAL-2607-05' },
        { when: '2026-07-21', stage: 'Brewing and fermentation', detail: '4 brews of 120 hl to FV-05; hops LUP-2606-11; fermented at 12 °C and lagered at 0 °C', ref: 'L2607-FV05' },
        { when: '2026-08-14', stage: 'Filtration', detail: 'Filtration and stabilisation to BBT-2; dissolved O₂ in tank 22 ppb', ref: 'BBT-2', tone: 'ok' },
        { when: '2026-08-18 06:00', stage: 'Keg filling', detail: 'LLB-1 fills 1,040 kegs with CO₂ from lot CO2-2608-02; average O₂ of 64 ppb (filling head 3 at 91 ppb)', ref: 'OE-2608-118', tone: 'warn' },
        { when: '2026-08-18 15:30', stage: 'Released under deviation', detail: 'Quality releases the batch under deviation DES-2026-0077 (O₂ out of specification, tasting conforming)', ref: 'DES-2026-0077', tone: 'warn' },
        { when: '2026-08-20', stage: 'First dispatches', detail: 'Distribuciones Hosteleras Ribera and Bebidas Ebro Distribución', ref: 'ALB-26-08-2211' },
        { when: '2026-09-28 12:06', stage: 'Complaint', detail: 'Cardboard (oxidised) flavour in kegs served in three bars', ref: 'REC-2026-0093', tone: 'crit' }
      ],
      forward: {
        title: 'Batch reconciliation (1,040 kegs)',
        cols: [
          { key: 'dest', label: 'Destination', mono: true, sub: 'what' },
          { key: 'kegs', label: 'Kegs' },
          { key: 'hl', label: 'Hectolitres' },
          { key: 'status', label: 'Status', chip: true }
        ],
        rows: [
          { dest: '14 customers', what: 'Distributors and on-trade · 20/08 to 02/09', kegs: '912', hl: '273.6', status: 'shipped' },
          { dest: 'CB-03', what: 'Keg cold store · WMS Mecalux', kegs: '96', hl: '28.8', status: { status: 'pending', label: 'Not blocked' } },
          { dest: 'RET-Q', what: 'On quality hold (O₂ check)', kegs: '32', hl: '9.6', status: 'hold' }
        ],
        note: { title: 'Reconciliation closed', body: '1,040 filled = 912 dispatched + 96 in warehouse + 32 on hold. Difference: 0 kegs (312 hl).', icon: 'scale' }
      },
      units: {
        label: 'Customers',
        cols: [
          { key: 'client', label: 'Customer', sub: 'type' },
          { key: 'kegs', label: 'Kegs' },
          { key: 'date', label: 'Dispatch', sub: 'ref' },
          { key: 'status', label: 'Status', chip: true }
        ],
        rows: clientRows
      },
      quality: [
        'Finished product analysis (LIMS): alcohol 5.2% ABV, bitterness 22 IBU, colour 9 EBC, CO₂ 5.0 g/l.',
        'Dissolved O₂ at filling: 64 ppb on average (specification ≤ 50 ppb); filling head 3 at 91 ppb.',
        'Release tasting on 18/08: conforming. Tasting of retained sample on 28/09: cardboard notes (trans-2-nonenal) at intensity 3 out of 5.',
        'Microbiology conforming (no lactic acid bacteria or wild yeast).',
        'Declared shelf life: 6 months in keg below 20 °C.'
      ],
      notes: [
        { title: 'Probable cause: oxygen pick-up at packaging', body: 'High dissolved oxygen at filling speeds up oxidation and cardboard flavour within a few weeks. PR-CAL-006 requires assessing a recall of the batch within 4 h.', tone: 'crit', icon: 'alert-triangle' },
        { title: 'Kegs in warehouse not blocked', body: 'The 96 kegs in CB-03 are still available for dispatch: blocking them requires Quality approval.', tone: 'warn', icon: 'lock' }
      ]
    };

    const fv05 = {
      kind: 'Fermentation batch',
      title: 'Batch L2607-FV05 · Bardenas Lager',
      summary: [
        ['Volume', '480 hl · 4 brews (C-2607-041 to C-2607-044)'],
        ['Fermentation', 'FV-05 · 21/07 to 31/07/2026 · 12 °C'],
        ['Lagering', '31/07 to 14/08/2026 · 0 °C'],
        ['Destination', '312 hl to keg (L2608-K14) · 158 hl to bottle (L2608-B21) · 10 hl of losses']
      ],
      back: [
        { when: '2026-07-21', stage: 'Brews', detail: 'Malt MAL-2607-05 (7,680 kg) and hops LUP-2606-11 (24 kg)', ref: 'C-2607-041…044' },
        { when: '2026-07-21', stage: 'Pitching', detail: 'Lager yeast W-34/70, generation 5', ref: 'LEV-26-07-05' },
        { when: '2026-07-31', stage: 'End of fermentation', detail: 'Diacetyl 42 µg/l (limit 80) · apparent extract 2.1 °P', ref: 'LIMS', tone: 'ok' },
        { when: '2026-08-14', stage: 'Filtration', detail: 'To BBT-2 · O₂ 22 ppb', ref: 'BBT-2', tone: 'ok' }
      ],
      forward: {
        title: 'Packaged batches',
        cols: [
          { key: 'lot', label: 'Batch', mono: true, sub: 'what' },
          { key: 'date', label: 'Packaged' },
          { key: 'hl', label: 'Hectolitres' },
          { key: 'status', label: 'Status', chip: true }
        ],
        rows: [
          { lot: 'L2608-K14', what: '30 l keg · 1,040 kegs', date: '18/08/2026', hl: '312', status: { status: 'critical', label: 'Complaint' } },
          { lot: 'L2608-B21', what: '33 cl bottle · 47,880 bottles', date: '19/08/2026', hl: '158', status: 'ok' },
          { lot: 'Losses', what: 'Filtration and tank bottoms', date: '—', hl: '10', status: 'closed' }
        ],
        note: { title: 'The bottles from the same batch are fine', body: 'L2608-B21 (same beer, different line) has O₂ of 35 ppb and a conforming tasting: this points to keg filling, not to the beer.', icon: 'info' }
      },
      quality: ['Diacetyl at racking: 42 µg/l.', 'Acetaldehyde: 6 mg/l.', 'Bottle L2608-B21: O₂ 35 ppb, tasting on 28/09 conforming.'],
      notes: []
    };

    const fv12 = {
      kind: 'Fermentation batch',
      title: 'Batch L2609-FV12 · Bardenas Lager (fermenting)',
      summary: [
        ['Volume', '480 hl · 4 brews (C-2609-061 to C-2609-064)'],
        ['Fermentation vessel', 'FV-12 · pitched on 26/09/2026 · day 3'],
        ['Set point', '12 °C · limit 13.5 °C · critical 15 °C'],
        ['Now', '16.8 °C (05:50) · peak 17.1 °C at 05:20'],
        ['Cause', 'Glycol valve VG-12 not opening since 23:40'],
        ['Planned racking', '06/10/2026 to BBT-4'],
        ['Raw materials', 'Malt MAL-2609-02 · hops LUP-2606-11'],
        ['Alarm', 'ALM-FV12-0550 · 05:50']
      ],
      back: [
        { when: '2026-09-26', stage: 'Brews', detail: 'Malt MAL-2609-02 and hops LUP-2606-11; wort at 11.8 °P', ref: 'C-2609-061…064' },
        { when: '2026-09-26 18:00', stage: 'Pitching', detail: 'Lager yeast W-34/70, generation 3', ref: 'LEV-26-09-03' },
        { when: '2026-09-28 23:40', stage: 'Valve failure', detail: 'VG-12 does not confirm opening', ref: 'VG-12', tone: 'warn' },
        { when: '2026-09-29 02:30', stage: 'Above the limit', detail: '13.5 °C; warning alarm acknowledged', ref: 'SCADA bodega', tone: 'crit' },
        { when: '2026-09-29 05:50', stage: 'Alarm escalated', detail: '16.8 °C; escalated to the Head Brewer', ref: 'ALM-FV12-0550', tone: 'crit' }
      ],
      forward: {
        title: 'Proposed analyses (LIMS LabWare)',
        cols: [
          { key: 'test', label: 'Analysis' },
          { key: 'limit', label: 'Limit at racking' },
          { key: 'when', label: 'When' },
          { key: 'status', label: 'Status', chip: true }
        ],
        rows: [
          { test: 'Total diacetyl', limit: '≤ 80 µg/l', when: 'Today and at racking', status: 'pending' },
          { test: 'Acetaldehyde', limit: '≤ 10 mg/l', when: 'Today and at racking', status: 'pending' },
          { test: 'Esters (isoamyl acetate)', limit: '≤ 2.0 mg/l', when: 'At racking', status: 'pending' },
          { test: 'Apparent extract and pH', limit: 'Fermentation curve', when: 'Every 12 h', status: 'pending' },
          { test: 'Triangle test against FV-11', limit: 'No significant difference', when: 'At racking', status: 'pending' }
        ],
        note: { title: 'Proposed hold', body: 'Hold the batch in SAP until the LIMS result and consider a longer maturation (diacetyl reabsorption). Requires the Head Brewer\'s approval.', icon: 'lock' }
      },
      quality: ['Day 3: apparent extract 7.4 °P (normal curve at 12 °C: 8.0 °P); fermentation has sped up.', 'No diacetyl analysis yet today.'],
      notes: [{ title: 'Flavour profile risk', body: 'Above 15 °C for more than 2 h the yeast produces more diacetyl, acetaldehyde and esters (PR-FER-003).', tone: 'crit', icon: 'flask' }]
    };

    function rawRecord(o) {
      return {
        kind: o.kind,
        title: o.title,
        summary: o.summary,
        back: o.back,
        forward: {
          title: 'Fermentation batches that use it',
          cols: [
            { key: 'lot', label: 'Batch', mono: true, sub: 'what' },
            { key: 'date', label: 'Date' },
            { key: 'qty', label: 'Quantity' },
            { key: 'status', label: 'Status', chip: true }
          ],
          rows: o.rows,
          note: o.note
        },
        quality: o.quality,
        notes: o.notes || []
      };
    }

    const mal = rawRecord({
      kind: 'Raw material', title: 'Lot MAL-2607-05 · Pilsner malt',
      summary: [['Supplier', 'Maltas de Castilla, S.A. · supplier lot MC-26-1904'], ['Received', '14/07/2026 · 120 t in bulk'], ['Used', '82.3 t in 9 fermentation batches'], ['In silo 2', '37.7 t']],
      back: [
        { when: '2026-07-10', stage: 'Malting', detail: 'Two-row barley from the 2026 harvest (Castile and León)', ref: 'MC-26-1904' },
        { when: '2026-07-14', stage: 'Goods in', detail: 'Moisture 4.2%, extract 81.5%, mycotoxins (DON) < 200 µg/kg', ref: 'LIMS RM-26-0712', tone: 'ok' }
      ],
      rows: [
        { lot: 'L2607-FV03', what: 'Bardenas Lager', date: '17/07/2026', qty: '7,680 kg', status: 'ok' },
        { lot: 'L2607-FV05', what: 'Bardenas Lager → L2608-K14 and L2608-B21', date: '21/07/2026', qty: '7,680 kg', status: { status: 'warning', label: 'Keg complaint' } },
        { lot: 'L2607-FV07', what: 'Bardenas Tostada', date: '23/07/2026', qty: '9,100 kg', status: 'ok' },
        { lot: 'L2607-FV09', what: 'Bardenas Lager', date: '27/07/2026', qty: '7,680 kg', status: 'ok' },
        { lot: '5 more batches', what: 'Lager, Tostada and Sin', date: '29/07 to 12/08/2026', qty: '50,160 kg', status: 'ok' }
      ],
      note: { title: 'Unrelated to the oxidation', body: 'The other batches brewed with this malt have no complaints and no cardboard notes at tasting.', icon: 'info' },
      quality: ['Supplier certificate of analysis conforming.', 'Approved supplier (BRCGS).']
    });
    const lup = rawRecord({
      kind: 'Raw material', title: 'Lot LUP-2606-11 · T90 hop pellets',
      summary: [['Variety', 'Nugget · T90 pellets · alpha acids 12.8%'], ['Supplier', 'Lúpulos del Órbigo, S. Coop. (León)'], ['Received', '11/06/2026 · 400 kg in N₂-flushed vacuum bags'], ['Used', '288 kg in 12 batches']],
      back: [
        { when: '2025-09-15', stage: 'Harvest', detail: '2025 harvest, pelletised in November', ref: 'LO-25-NUG-07' },
        { when: '2026-06-11', stage: 'Goods in', detail: 'Cold store at 2 °C · alpha acids 12.8% · HSI 0.28', ref: 'LIMS RM-26-0605', tone: 'ok' }
      ],
      rows: [
        { lot: 'L2607-FV05', what: 'Bardenas Lager → L2608-K14', date: '21/07/2026', qty: '24 kg', status: { status: 'warning', label: 'Keg complaint' } },
        { lot: 'L2609-FV12', what: 'Bardenas Lager (fermenting)', date: '26/09/2026', qty: '24 kg', status: { status: 'critical', label: 'FV-12 alarm' } },
        { lot: '10 more batches', what: 'Lager and Tostada', date: '12/06 to 22/09/2026', qty: '240 kg', status: 'ok' }
      ],
      note: { title: 'Vacuum packed', body: 'HSI 0.28 (hop storage index): fresh hops, no oxidation of their own.', icon: 'info' },
      quality: ['Pesticide residue certificate conforming (Regulation (EC) No 396/2005).']
    });
    const co2 = rawRecord({
      kind: 'Raw material', title: 'Lot CO2-2608-02 · food-grade CO₂',
      summary: [['Origin', 'CO₂ recovered from fermentation (in-house plant)'], ['Purity', '99.99% (specification ≥ 99.98%, EIGA/ISBT)'], ['Produced', '01/08 to 20/08/2026 · 42 t'], ['Use', 'Counter-pressure and purging on LLB-1 and LB-1']],
      back: [
        { when: '2026-08-01', stage: 'Recovery', detail: 'Scrubbing, activated carbon filter and liquefaction into a 50 t tank', ref: 'CO2-REC' },
        { when: '2026-08-02', stage: 'Purity analysis', detail: '99.99% · O₂ < 10 ppm · no odour or taste', ref: 'LIMS GAS-26-0802', tone: 'ok' }
      ],
      rows: [
        { lot: 'L2608-K14', what: 'Keg · LLB-1', date: '18/08/2026', qty: '1,040 kegs', status: { status: 'warning', label: 'Keg complaint' } },
        { lot: 'L2608-B21', what: 'Bottle · LB-1', date: '19/08/2026', qty: '47,880 bottles', status: 'ok' },
        { lot: '14 more batches', what: 'Keg and bottle', date: '02/08 to 20/08/2026', qty: '—', status: 'ok' }
      ],
      note: { title: 'The CO₂ does not explain the O₂', body: 'Purity conforming throughout the lot; the high oxygen on LLB-1 points to the purge on filling head 3, not to the gas.', icon: 'info' },
      quality: ['Daily purity between 99.98% and 99.99%.']
    });

    return {
      'L2608-K14': k14,
      'L2607-FV05': fv05,
      'L2609-FV12': fv12,
      'MAL-2607-05': mal,
      'LUP-2606-11': lup,
      'CO2-2608-02': co2
    };
  })()
});
