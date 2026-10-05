/* Hidromec Ebro · traceability records (component batches, assembly batches, serial numbers and production
 * batches), English. App.traceModal reads them from CN_DATA.trace[code]. Synthetic demonstration data (MFM). */
agenticPackEn('maquinaria', {
  trace: (function () {
    'use strict';

    /* Units assembled with seals from batch JNT-2607-031: [serial, model, assembly, customer, country, delivery, end customer] */
    const FLEET = [
      ['PH250-26-0405', 'PH-250', 'MON-2607-22', 'Prensas y Servicios del Norte, S.L.', 'ES', '03/08/2026', 'Talleres Arratia (Igorre)'],
      ['PH250-26-0407', 'PH-250', 'MON-2607-22', 'Estampaciones Riojanas, S.A.', 'ES', '05/08/2026', ''],
      ['PH250-26-0408', 'PH-250', 'MON-2607-22', 'Forjas del Cinca, S.L.', 'ES', '06/08/2026', ''],
      ['PH250-26-0410', 'PH-250', 'MON-2607-22', 'Metalomecânica do Ave, Lda.', 'PT', '10/08/2026', ''],
      ['PH250-26-0412', 'PH-250', 'MON-2607-22', 'Prensas y Servicios del Norte, S.L.', 'ES', '04/08/2026', 'Estampaciones Nervión (Basauri)'],
      ['PH250-26-0413', 'PH-250', 'MON-2607-22', 'Metalúrgica Vallès, S.A.', 'ES', '07/08/2026', ''],
      ['PH250-26-0415', 'PH-250', 'MON-2607-22', 'Prensados Levante, S.L.', 'ES', '11/08/2026', ''],
      ['PH250-26-0416', 'PH-250', 'MON-2607-22', 'Emboutissage Garonne SAS', 'FR', '14/08/2026', ''],
      ['GH55-26-0131', 'GH-55', 'MON-2607-22', 'Forjas del Cinca, S.L.', 'ES', '06/08/2026', ''],
      ['GH55-26-0132', 'GH-55', 'MON-2607-22', 'Composites Navarra, S.L.', 'ES', '05/08/2026', ''],
      ['PH250-26-0441', 'PH-250', 'MON-2608-03', 'Prensas y Servicios del Norte, S.L.', 'ES', '18/08/2026', 'Calderería Zorroza (Bilbao)'],
      ['PH250-26-0442', 'PH-250', 'MON-2608-03', 'Estampaciones Riojanas, S.A.', 'ES', '19/08/2026', ''],
      ['PH250-26-0444', 'PH-250', 'MON-2608-03', 'Forjas del Cinca, S.L.', 'ES', '20/08/2026', ''],
      ['PH250-26-0446', 'PH-250', 'MON-2608-03', 'Metalúrgica Vallès, S.A.', 'ES', '24/08/2026', ''],
      ['PH250-26-0447', 'PH-250', 'MON-2608-03', 'Composites Navarra, S.L.', 'ES', '25/08/2026', ''],
      ['PH250-26-0449', 'PH-250', 'MON-2608-03', 'Hidráulica Castellana, S.L.', 'ES', '27/08/2026', 'Troquelados Duero (Valladolid)'],
      ['PH250-26-0450', 'PH-250', 'MON-2608-03', 'Estamparia Lusitana, S.A.', 'PT', '01/09/2026', ''],
      ['GH55-26-0140', 'GH-55', 'MON-2608-03', 'Composites Navarra, S.L.', 'ES', '25/08/2026', ''],
      ['GH55-26-0141', 'GH-55', 'MON-2608-03', 'Hidráulica Castellana, S.L.', 'ES', '27/08/2026', 'Plásticos Pisuerga (Palencia)'],
      ['PH250-26-0472', 'PH-250', 'MON-2608-11', 'Prensados Levante, S.L.', 'ES', '03/09/2026', ''],
      ['PH250-26-0474', 'PH-250', 'MON-2608-11', 'Metalomecânica do Ave, Lda.', 'PT', '08/09/2026', ''],
      ['GH55-26-0147', 'GH-55', 'MON-2608-11', 'Estamparia Lusitana, S.A.', 'PT', '01/09/2026', ''],
      ['GH55-26-0148', 'GH-55', 'MON-2608-11', 'Presses Rhône-Alpes SARL', 'FR', '09/09/2026', ''],
      ['PH250-26-0476', 'PH-250', 'MON-2608-11', 'At the plant · finished goods store', '—', '', ''],
      ['PH250-26-0477', 'PH-250', 'MON-2608-11', 'At the plant · finished goods store', '—', '', ''],
      ['PH250-26-0478', 'PH-250', 'MON-2608-11', 'At the plant · finished goods store', '—', '', '']
    ];
    const SEALS = { 'PH-250': 48, 'GH-55': 24 };
    const COUNTRY = { ES: 'Spain', PT: 'Portugal', FR: 'France', '—': '—' };
    const unitRow = (f) => ({
      serial: f[0], model: f[1], mon: f[2], seals: SEALS[f[1]],
      client: f[3], final: f[6] || (f[4] === '—' ? '' : 'Own use'), country: COUNTRY[f[4]],
      delivered: f[5] || '—',
      status: f[0] === 'PH250-26-0412' ? { status: 'critical', label: 'Leak reported' }
        : (f[0] === 'PH250-26-0476' || f[0] === 'PH250-26-0478') ? { status: 'hold', label: 'On hold · weeping on BP-1' }
          : f[4] === '—' ? { status: 'hold', label: 'On hold at the plant' } : { status: 'shipped', label: 'In the field' }
    });
    const UNIT_COLS = [
      { key: 'serial', label: 'Serial no.', mono: true, sub: 'model' },
      { key: 'mon', label: 'Assembly batch', mono: true },
      { key: 'seals', label: 'Seals from the batch' },
      { key: 'client', label: 'Customer', sub: 'final' },
      { key: 'country', label: 'Country', sub: 'delivered' },
      { key: 'status', label: 'Status', chip: true }
    ];
    const fleetOf = (mon) => FLEET.filter((f) => f[2] === mon).map(unitRow);

    function monRecord(code, o) {
      const rows = fleetOf(code);
      const ph = rows.filter((r) => r.model === 'PH-250').length;
      const gh = rows.filter((r) => r.model === 'GH-55').length;
      const seals = rows.reduce((s, r) => s + r.seals, 0);
      return {
        kind: 'Assembly batch',
        title: `Assembly batch ${code}`,
        summary: [['Line', 'LM-2 (presses) and LM-1 (power units)'], ['Assembly', o.dates], ['Units', `${ph} PH-250 · ${gh} GH-55`], ['JNT-2607-031 seals', `${seals.toLocaleString('en-GB')} (48 per PH-250 · 24 per GH-55)`], ['In the field', `${o.field} units`], ['Tests', o.tests], ['Seal batch', 'JNT-2607-031'], ['Owner', 'Production manager']],
        back: [
          { when: '2026-07-21', stage: 'Seal batch received', detail: 'JNT-2607-031 · Sellados Ibéricos, S.A. · 1,200 seals · sampling inspection conforming (hardness 92 Shore A)', ref: 'JNT-2607-031', tone: 'brand' },
          { when: o.kitting, stage: 'Kitting', detail: `${seals.toLocaleString('en-GB')} seals issued from store C-14-03 to the line`, ref: o.kitRef },
          { when: o.start, stage: 'Cylinder and power unit assembly', detail: o.assembly, ref: code },
          { when: o.test, stage: 'Final hydraulic test', detail: o.tests, ref: o.testRef, tone: o.testTone || 'ok' }
        ],
        forward: {
          title: `${rows.length} units assembled`,
          cols: UNIT_COLS,
          rows,
          note: { title: 'Dispatch', body: o.note, icon: 'truck' }
        },
        quality: o.quality,
        notes: o.notes || []
      };
    }

    const jnt = {
      kind: 'Component batch',
      title: 'Seal batch JNT-2607-031',
      summary: [
        ['Component', 'KJ-80 hydraulic seal kit (PU/NBR) · ref. 7710-0480'],
        ['Supplier', 'Sellados Ibéricos, S.A. · supplier batch SI-26-1187'],
        ['Received', '1,200 seals · 21/07/2026'],
        ['Balance', '1,104 fitted · 72 in stock · 24 scrapped'],
        ['Units', '26 assembled · 23 in the field (17 PH-250 and 6 GH-55)'],
        ['Customers', '11 in Spain, Portugal and France'],
        ['In stock', '72 seals · location C-14-03'],
        ['Campaign target', 'Customers notified within 4 h']
      ],
      back: [
        { when: '2026-07-14', stage: 'Manufactured at the supplier', detail: 'Sellados Ibéricos moulds batch SI-26-1187 (92 Shore A polyurethane, NBR lip). 3.1 material certificate attached.', ref: 'SI-26-1187' },
        { when: '2026-07-21 08:40', stage: 'Goods receipt in Zaragoza', detail: 'Purchase order 4500391022 · 1,200 seals in 10 boxes · delivery note SI-AL-26-5521', ref: 'EM 5000812744', tone: 'brand' },
        { when: '2026-07-21 11:15', stage: 'Incoming inspection (SAP QM)', detail: 'ISO 2859-1 sampling, level II (80 seals): dimensions and hardness conforming. 24 seals scrapped for flash on the lip.', ref: 'QM batch 010000488173', tone: 'warn' },
        { when: '2026-07-22', stage: 'Released to stock', detail: '1,176 seals to location C-14-03', ref: 'C-14-03', tone: 'ok' },
        { when: '2026-07-27', stage: 'Consumed in assembly', detail: 'First consumption in assembly batch MON-2607-22', ref: 'MON-2607-22' }
      ],
      forward: {
        title: 'Batch consumption (mass balance)',
        cols: [
          { key: 'dest', label: 'Destination', mono: true, sub: 'what' },
          { key: 'date', label: 'Date' },
          { key: 'qty', label: 'Seals' },
          { key: 'equip', label: 'Units' },
          { key: 'status', label: 'Status', chip: true }
        ],
        rows: [
          { dest: 'MON-2607-22', what: 'Assembly LM-2 / LM-1', date: '27–31/07/2026', qty: '432', equip: '8 PH-250 · 2 GH-55', status: { status: 'shipped', label: '10 in the field' } },
          { dest: 'MON-2608-03', what: 'Assembly LM-2 / LM-1', date: '03–07/08/2026', qty: '384', equip: '7 PH-250 · 2 GH-55', status: { status: 'shipped', label: '9 in the field' } },
          { dest: 'MON-2608-11', what: 'Assembly LM-2 / LM-1', date: '11–14/08/2026', qty: '288', equip: '5 PH-250 · 2 GH-55', status: { status: 'warning', label: '4 in the field · 3 at the plant' } },
          { dest: 'C-14-03', what: 'Component store', date: 'Today', qty: '72', equip: '—', status: { status: 'pending', label: 'Not blocked' } },
          { dest: 'Scrap', what: 'Incoming inspection', date: '21/07/2026', qty: '24', equip: '—', status: { status: 'closed', label: 'Scrapped' } }
        ],
        note: { title: 'Balance closed', body: '1,200 received = 1,104 fitted + 72 in stock + 24 scrapped. Difference: 0 seals.', icon: 'scale' }
      },
      units: { label: 'Units', cols: UNIT_COLS, rows: FLEET.map(unitRow) },
      quality: [
        'Supplier 3.1 certificate: PU 92 ± 3 Shore A, elongation at break 480%.',
        'Incoming inspection: 80 seals sampled, 0 out of dimensional tolerance; 24 scrapped for visible flash.',
        'Final test of the 26 units: all conforming when leaving the plant (1.25 × nominal pressure, 30 min without leaks).',
        'Retest on 28/09 of the 3 PH-250 presses from MON-2608-11 at the plant: weeping on 2 (PH250-26-0476 and PH250-26-0478).',
        'Approved supplier since 2019; last process audit on 12/03/2026 (no major non-conformances).'
      ],
      notes: [
        { title: 'Two signals from the same batch', body: 'Leak reported on PH250-26-0412 (REC-2026-0187) and weeping on two presses at the plant. PR-POS-005 requires a field campaign covering the 23 units to be assessed within 4 h.', tone: 'crit', icon: 'alert-triangle' },
        { title: 'Seals not yet blocked', body: 'The 72 seals in C-14-03 are still available for assembly: blocking them in SAP QM requires approval from Quality.', tone: 'warn', icon: 'lock' }
      ]
    };

    const ph = {
      kind: 'Serial number',
      title: 'PH-250 press · serial no. PH250-26-0412',
      summary: [
        ['Model', 'PH-250 hydraulic press (250 t) · CE marked'],
        ['Assembly batch', 'MON-2607-22 · line LM-2'],
        ['Main cylinder seals', 'JNT-2607-031 (Sellados Ibéricos)'],
        ['Customer', 'Prensas y Servicios del Norte, S.L. (Bilbao)'],
        ['End customer', 'Estampaciones Nervión, S.L. (Basauri)'],
        ['Delivery', '04/08/2026 · 24-month warranty'],
        ['Final test', '31/07/2026 · BP-1 · conforming'],
        ['Complaint', 'REC-2026-0187 · NC-2026-0233']
      ],
      back: [
        { when: '2026-07-21', stage: 'Seals received', detail: 'Batch JNT-2607-031 from Sellados Ibéricos (1,200 seals)', ref: 'JNT-2607-031' },
        { when: '2026-07-24', stage: 'Main cylinder machining', detail: 'CIL-250 barrel machined on MC-02 and honed; rod ground on RECT-01 (Ra 0.2 µm)', ref: 'OF 4100731' },
        { when: '2026-07-29', stage: 'Assembly', detail: 'Main cylinder, cushion and ejector on LM-2 with 48 seals from batch JNT-2607-031; cap tightening torque conforming', ref: 'MON-2607-22' },
        { when: '2026-07-31 10:20', stage: 'Final hydraulic test', detail: 'Bench BP-1 · 1.25 × nominal pressure (312 bar) for 30 min · no leaks or weeping', ref: 'PRB-26-07-0918', tone: 'ok' },
        { when: '2026-08-03 14:00', stage: 'Dispatch', detail: 'Abnormal load transport to Bilbao · delivery note 80041977', ref: '80041977' },
        { when: '2026-08-04', stage: 'Delivery and commissioning', detail: 'Installed at Estampaciones Nervión by the distributor’s service team', ref: 'Record PEM-26-0388', tone: 'ok' },
        { when: '2026-09-28 17:42', stage: 'Complaint', detail: 'Oil leak from the main cylinder rod after about 400 operating hours', ref: 'REC-2026-0187', tone: 'crit' }
      ],
      forward: {
        title: 'Service and after-sales',
        cols: [
          { key: 'date', label: 'Date' },
          { key: 'event', label: 'Event' },
          { key: 'ref', label: 'Reference', mono: true },
          { key: 'status', label: 'Status', chip: true }
        ],
        rows: [
          { date: '04/08/2026', event: 'Commissioning and operator training', ref: 'PEM-26-0388', status: 'done' },
          { date: '15/09/2026', event: '250 h service (return filter change)', ref: 'SRV-26-1402', status: 'done' },
          { date: '28/09/2026', event: 'Complaint for oil leak', ref: 'REC-2026-0187', status: 'open' },
          { date: '28/09/2026', event: 'Customer non-conformance', ref: 'NC-2026-0233', status: 'open' }
        ],
        note: { title: 'Other presses from the same batch at the distributor', body: 'Prensas y Servicios del Norte has two other presses with JNT-2607-031 seals: PH250-26-0405 (Talleres Arratia) and PH250-26-0441 (Calderería Zorroza).', icon: 'users' }
      },
      quality: [
        'Final test conforming on 31/07/2026 (PRB-26-07-0918): 312 bar, 30 min, pressure drop 0 bar.',
        'Oil cleanliness at dispatch: ISO 4406 16/14/11.',
        'CE technical file and declaration of conformity DC-PH250-26-0412 (Machinery Directive 2006/42/EC; Regulation (EU) 2023/1230 from 2027).',
        '250 h service on 15/09/2026 with no leaks recorded.'
      ],
      notes: [
        { title: 'Response deadlines', body: 'Acknowledgement within 24 h (before 29/09 17:42) and 8D report before 13/10/2026 (PR-CAL-008).', tone: 'warn', icon: 'clock' }
      ]
    };

    const cul = {
      kind: 'Production batch',
      title: 'Cylinder head batch CUL-2609-118',
      summary: [
        ['Part', 'CUL-80 cylinder head · GGG-50 ductile iron'],
        ['Production order', 'OF 4100872 · 120 cylinder heads'],
        ['Machine', 'MC-04 (DMG Mori DMU 65)'],
        ['Machined', '84 (42 before 03:40 · 42 between 03:40 and 05:50)'],
        ['Outstanding', '36 cylinder heads (proposal: move to MC-02)'],
        ['Destination', 'PH-160 and PH-250 cylinders · October assembly'],
        ['Casting', 'FM-26-3310 · Fundiciones del Moncayo'],
        ['Alarm', 'ALM-MC04-0550 · 05:50']
      ],
      back: [
        { when: '2026-09-22', stage: 'Castings received', detail: '120 raw castings from Fundiciones del Moncayo, batch FM-26-3310, with 3.1 certificate', ref: 'FM-26-3310' },
        { when: '2026-09-28 16:00', stage: 'Production order released', detail: 'OF 4100872 released in SAP PP and sequenced in MES Opcenter for MC-04', ref: 'OF 4100872' },
        { when: '2026-09-29 01:30', stage: 'Machining started', detail: 'First-off part conforming on CMM-1 (program CUL80-OP20)', ref: 'CMM-1', tone: 'ok' },
        { when: '2026-09-29 03:40', stage: 'Vibration in zone D', detail: 'The MC-04 spindle exceeds 4.5 mm/s RMS; the machine keeps producing', ref: 'VS-MC04-01', tone: 'warn' },
        { when: '2026-09-29 05:50', stage: 'Alarm escalated', detail: '7.8 mm/s RMS; 42 cylinder heads machined in the window', ref: 'ALM-MC04-0550', tone: 'crit' }
      ],
      forward: {
        title: 'Status of the parts',
        cols: [
          { key: 'range', label: 'Parts', mono: true },
          { key: 'window', label: 'Machining' },
          { key: 'qty', label: 'Quantity' },
          { key: 'where', label: 'Location' },
          { key: 'status', label: 'Status', chip: true }
        ],
        rows: [
          { range: '001–042', window: '01:30–03:40 · MC-04 within range', qty: '42', where: 'WIP rack E-07', status: { status: 'ok', label: 'Conforming (1-in-10 sampling)' } },
          { range: '043–084', window: '03:40–05:50 · high vibration', qty: '42', where: 'MC-04 outfeed', status: { status: 'evaluate', label: 'For 100% metrology' } },
          { range: '085–120', window: 'Not machined', qty: '36', where: 'Raw · next to MC-04', status: { status: 'pending', label: 'Reassign to MC-02' } }
        ],
        note: { title: 'No cylinder head has left the bay', body: 'All 84 machined cylinder heads are still in bay 1; none has been consumed in assembly.', icon: 'box' }
      },
      units: {
        label: 'Cylinder heads in the window',
        cols: [
          { key: 'sn', label: 'Part', mono: true },
          { key: 'time', label: 'Machining finished' },
          { key: 'rms', label: 'Spindle RMS' },
          { key: 'status', label: 'Status', chip: true }
        ],
        rows: Array.from({ length: 42 }, (_, i) => {
          const min = 220 + Math.round(i * 130 / 42) + 3;
          const rms = (4.6 + (i / 41) * 3.4).toFixed(1);
          return { sn: `CUL-2609-118-${String(43 + i).padStart(3, '0')}`, time: `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`, rms: `${rms} mm/s`, status: { status: 'evaluate', label: 'For metrology' } };
        })
      },
      quality: [
        'CUL-80 control plan: 1-in-10 sampling on CMM-1 (sealing face flatness ≤ 0.02 mm, Ra ≤ 1.6 µm).',
        'Parts 010, 020, 030 and 040 measured: conforming.',
        'Part 050 (04:14) measured: flatness 0.018 mm, at the upper limit; Ra 1.5 µm.',
        'Spindle vibration degrades the roughness and flatness of the sealing face: PR-CAL-004 requires 100% metrology of everything machined in zone D.'
      ],
      notes: [
        { title: 'Proposed block', body: 'Block parts 043–084 in SAP QM until their 100% metrology on CMM-1. Requires approval from the Maintenance manager or Quality.', tone: 'crit', icon: 'lock' }
      ]
    };

    return {
      'JNT-2607-031': jnt,
      'PH250-26-0412': ph,
      'CUL-2609-118': cul,
      'MON-2607-22': monRecord('MON-2607-22', {
        dates: '27–31/07/2026', field: 10, kitting: '2026-07-27 06:30', kitRef: 'RES 0081277', start: '2026-07-27',
        assembly: '8 PH-250 presses and 2 GH-55 power units; main cylinder, cushion and ejector seals from batch JNT-2607-031', test: '2026-07-31',
        tests: '10 tests on BP-1 and BP-2 · all conforming', testRef: 'PRB-26-07-0911…0920',
        note: 'The 10 units were delivered between 03/08 and 14/08/2026 to 8 customers in Spain, Portugal and France.',
        quality: ['Final test conforming on all 10 units.', 'Cap tightening torque recorded in MES Opcenter (100% conforming).', 'PH250-26-0412, from this batch, is the press in the complaint (REC-2026-0187).'],
        notes: [{ title: 'Includes the press in the complaint', body: 'PH250-26-0412 (Prensas y Servicios del Norte → Estampaciones Nervión).', tone: 'warn', icon: 'alert-triangle' }]
      }),
      'MON-2608-03': monRecord('MON-2608-03', {
        dates: '03–07/08/2026', field: 9, kitting: '2026-08-03 06:30', kitRef: 'RES 0081402', start: '2026-08-03',
        assembly: '7 PH-250 presses and 2 GH-55 power units with seals from batch JNT-2607-031', test: '2026-08-10',
        tests: '9 tests on BP-1 and BP-2 · all conforming', testRef: 'PRB-26-08-0104…0112',
        note: 'The 9 units were delivered between 18/08 and 01/09/2026 to 7 customers in Spain and Portugal.',
        quality: ['Final test conforming on all 9 units.', 'No field complaints to date.']
      }),
      'MON-2608-11': monRecord('MON-2608-11', {
        dates: '11–14/08/2026', field: 4, kitting: '2026-08-11 06:30', kitRef: 'RES 0081530', start: '2026-08-11',
        assembly: '5 PH-250 presses and 2 GH-55 power units with seals from batch JNT-2607-031', test: '2026-09-28',
        tests: 'Pre-shipment retest of the 3 PH-250 presses at the plant: weeping on 2', testRef: 'PRB-26-09-0477…0479', testTone: 'crit',
        note: '4 units delivered between 01/09 and 09/09/2026; 3 PH-250 presses are still in the finished goods store.',
        quality: ['August final test conforming on all 7 units.', 'Retest on 28/09: PH250-26-0476 and PH250-26-0478 weeping at the rod; PH250-26-0477 conforming.', 'Proposed non-conformance NC-2026-0234.'],
        notes: [{ title: 'Weeping on the bench', body: 'Two presses from this batch weep in the retest: same seal as the press in the complaint.', tone: 'crit', icon: 'droplet' }]
      })
    };
  })()
});
