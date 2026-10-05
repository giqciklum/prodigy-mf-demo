/* Cervecera Bardenas · registros de trazabilidad (lotes de barril, de fermentación y de materias primas).
 * Los lee App.traceModal desde CN_DATA.trace[código]. Datos sintéticos de demostración (MFM). */
agenticPack('cerveceria', {
  trace: (function () {
    'use strict';

    /* Clientes del lote L2608-K14: [cliente, tipo, localidad, barriles, fecha de expedición, albarán] */
    const CLIENTS = [
      ['Distribuciones Hosteleras Ribera, S.L.', 'Distribuidor', 'Tudela', 168, '20/08/2026', 'ALB-26-08-2211'],
      ['Bebidas Ebro Distribución, S.L.', 'Distribuidor', 'Zaragoza', 142, '20/08/2026', 'ALB-26-08-2214'],
      ['Distribuciones Cierzo Hostelería, S.A.', 'Distribuidor', 'Pamplona', 96, '21/08/2026', 'ALB-26-08-2230'],
      ['Comercial Rioja Baja, S.L.', 'Distribuidor', 'Calahorra', 74, '21/08/2026', 'ALB-26-08-2233'],
      ['Bebidas Bardenas Logroño, S.L.', 'Distribuidor', 'Logroño', 66, '24/08/2026', 'ALB-26-08-2290'],
      ['Club Deportivo Arenas', 'Eventos', 'Logroño', 60, '25/08/2026', 'ALB-26-08-2302'],
      ['Hostelería Moncayo Distribución, S.L.', 'Distribuidor', 'Tarazona', 58, '25/08/2026', 'ALB-26-08-2305'],
      ['Grupo Bares Plaza, S.L.', 'Hostelería (cadena)', 'Zaragoza', 52, '26/08/2026', 'ALB-26-08-2318'],
      ['Distribuciones Arga, S.L.', 'Distribuidor', 'Estella', 48, '27/08/2026', 'ALB-26-08-2340'],
      ['Distribuidora Tudelana de Bebidas, S.L.', 'Distribuidor', 'Tudela', 40, '27/08/2026', 'ALB-26-08-2342'],
      ['Catering Navarro, S.L.', 'Catering', 'Pamplona', 36, '28/08/2026', 'ALB-26-08-2361'],
      ['Cervecería El Tubo', 'Hostelería', 'Zaragoza', 30, '31/08/2026', 'ALB-26-08-2398'],
      ['Restaurantes La Ribera, S.L.', 'Hostelería', 'Tudela', 24, '01/09/2026', 'ALB-26-09-0012'],
      ['Hotel Tres Reyes', 'Hostelería', 'Pamplona', 18, '02/09/2026', 'ALB-26-09-0031']
    ];
    const fmtN = (n) => n.toLocaleString('es-ES');
    const clientRows = CLIENTS.map((c) => ({
      client: c[0], type: `${c[1]} · ${c[2]}`, kegs: fmtN(c[3]), hl: fmtN(c[3] * 0.3).replace(/^(\d+)$/, '$1'), date: c[4], ref: c[5],
      status: /Ribera/.test(c[0]) && /Hosteleras/.test(c[0]) ? { status: 'critical', label: 'Reclamación REC-2026-0093' } : { status: 'shipped', label: 'Expedido' }
    }));

    const k14 = {
      kind: 'Lote de barril',
      title: 'Lote L2608-K14 · Bardenas Lager en barril de 30 l',
      summary: [
        ['Producto', 'Bardenas Lager · barril KeyKeg de acero de 30 l'],
        ['Envasado', '18/08/2026 · llenadora de barriles LLB-1'],
        ['Cerveza', 'Lote de fermentación L2607-FV05 (tanque de gobierno BBT-2)'],
        ['Barriles', '1.040 llenados (312 hl)'],
        ['Destino', '912 expedidos a 14 clientes · 96 en almacén · 32 retenidos'],
        ['Consumo preferente', '18/02/2027'],
        ['O₂ disuelto al llenar', '64 ppb (especificación ≤ 50) · liberado con desviación'],
        ['Materias primas', 'Malta MAL-2607-05 · lúpulo LUP-2606-11 · CO₂ CO2-2608-02']
      ],
      back: [
        { when: '2026-07-14', stage: 'Malta', detail: 'Malta Pilsen del lote MAL-2607-05 (Maltas de Castilla) en el silo 2', ref: 'MAL-2607-05' },
        { when: '2026-07-21', stage: 'Cocimiento y fermentación', detail: '4 cocimientos de 120 hl a FV-05; lúpulo LUP-2606-11; fermentación a 12 °C y guarda a 0 °C', ref: 'L2607-FV05' },
        { when: '2026-08-14', stage: 'Filtración', detail: 'Filtración y estabilización a BBT-2; O₂ disuelto en tanque 22 ppb', ref: 'BBT-2', tone: 'ok' },
        { when: '2026-08-18 06:00', stage: 'Envasado en barril', detail: 'LLB-1 llena 1.040 barriles con CO₂ del lote CO2-2608-02; O₂ medio de 64 ppb (cabezal 3 a 91 ppb)', ref: 'OE-2608-118', tone: 'warn' },
        { when: '2026-08-18 15:30', stage: 'Liberación con desviación', detail: 'Calidad libera el lote con la desviación DES-2026-0077 (O₂ fuera de especificación, cata conforme)', ref: 'DES-2026-0077', tone: 'warn' },
        { when: '2026-08-20', stage: 'Primeras expediciones', detail: 'Distribuciones Hosteleras Ribera y Bebidas Ebro Distribución', ref: 'ALB-26-08-2211' },
        { when: '2026-09-28 12:06', stage: 'Reclamación', detail: 'Sabor a cartón (oxidación) en barriles servidos en tres bares', ref: 'REC-2026-0093', tone: 'crit' }
      ],
      forward: {
        title: 'Balance del lote (1.040 barriles)',
        cols: [
          { key: 'dest', label: 'Destino', mono: true, sub: 'what' },
          { key: 'kegs', label: 'Barriles' },
          { key: 'hl', label: 'Hectolitros' },
          { key: 'status', label: 'Estado', chip: true }
        ],
        rows: [
          { dest: '14 clientes', what: 'Distribuidores y hostelería · 20/08 a 02/09', kegs: '912', hl: '273,6', status: 'shipped' },
          { dest: 'CB-03', what: 'Cámara de barriles · WMS Mecalux', kegs: '96', hl: '28,8', status: { status: 'pending', label: 'Sin bloquear' } },
          { dest: 'RET-Q', what: 'Retenidos por Calidad (control de O₂)', kegs: '32', hl: '9,6', status: 'hold' }
        ],
        note: { title: 'Balance cerrado', body: '1.040 llenados = 912 expedidos + 96 en almacén + 32 retenidos. Diferencia: 0 barriles (312 hl).', icon: 'scale' }
      },
      units: {
        label: 'Clientes',
        cols: [
          { key: 'client', label: 'Cliente', sub: 'type' },
          { key: 'kegs', label: 'Barriles' },
          { key: 'date', label: 'Expedición', sub: 'ref' },
          { key: 'status', label: 'Estado', chip: true }
        ],
        rows: clientRows
      },
      quality: [
        'Análisis de producto terminado (LIMS): alcohol 5,2 % vol, amargor 22 IBU, color 9 EBC, CO₂ 5,0 g/l.',
        'O₂ disuelto al llenar: 64 ppb de media (especificación ≤ 50 ppb); cabezal 3 a 91 ppb.',
        'Cata de liberación del 18/08: conforme. Cata de muestra de retén del 28/09: notas de cartón (trans-2-nonenal) de intensidad 3 sobre 5.',
        'Microbiología conforme (sin bacterias lácticas ni levaduras salvajes).',
        'Vida útil declarada: 6 meses en barril a temperatura inferior a 20 °C.'
      ],
      notes: [
        { title: 'Causa probable: oxígeno en el envasado', body: 'El oxígeno disuelto alto en el llenado acelera la oxidación y el sabor a cartón en pocas semanas. PR-CAL-006 pide valorar la retirada del lote en 4 h.', tone: 'crit', icon: 'alert-triangle' },
        { title: 'Barriles en almacén sin bloquear', body: 'Los 96 barriles de CB-03 siguen disponibles para expedir: bloquearlos requiere la aprobación de Calidad.', tone: 'warn', icon: 'lock' }
      ]
    };

    const fv05 = {
      kind: 'Lote de fermentación',
      title: 'Lote L2607-FV05 · Bardenas Lager',
      summary: [
        ['Volumen', '480 hl · 4 cocimientos (C-2607-041 a C-2607-044)'],
        ['Fermentación', 'FV-05 · 21/07 a 31/07/2026 · 12 °C'],
        ['Guarda', '31/07 a 14/08/2026 · 0 °C'],
        ['Destino', '312 hl a barril (L2608-K14) · 158 hl a botella (L2608-B21) · 10 hl de mermas']
      ],
      back: [
        { when: '2026-07-21', stage: 'Cocimientos', detail: 'Malta MAL-2607-05 (7.680 kg) y lúpulo LUP-2606-11 (24 kg)', ref: 'C-2607-041…044' },
        { when: '2026-07-21', stage: 'Siembra', detail: 'Levadura lager W-34/70, generación 5', ref: 'LEV-26-07-05' },
        { when: '2026-07-31', stage: 'Fin de fermentación', detail: 'Diacetilo 42 µg/l (límite 80) · extracto aparente 2,1 °P', ref: 'LIMS', tone: 'ok' },
        { when: '2026-08-14', stage: 'Filtración', detail: 'A BBT-2 · O₂ 22 ppb', ref: 'BBT-2', tone: 'ok' }
      ],
      forward: {
        title: 'Lotes envasados',
        cols: [
          { key: 'lot', label: 'Lote', mono: true, sub: 'what' },
          { key: 'date', label: 'Envasado' },
          { key: 'hl', label: 'Hectolitros' },
          { key: 'status', label: 'Estado', chip: true }
        ],
        rows: [
          { lot: 'L2608-K14', what: 'Barril de 30 l · 1.040 barriles', date: '18/08/2026', hl: '312', status: { status: 'critical', label: 'Reclamación' } },
          { lot: 'L2608-B21', what: 'Botella de 33 cl · 47.880 botellas', date: '19/08/2026', hl: '158', status: 'ok' },
          { lot: 'Mermas', what: 'Filtración y fondos de tanque', date: '—', hl: '10', status: 'closed' }
        ],
        note: { title: 'La botella del mismo lote está bien', body: 'L2608-B21 (misma cerveza, otra línea) tiene O₂ de 35 ppb y cata conforme: apunta al llenado en barril, no a la cerveza.', icon: 'info' }
      },
      quality: ['Diacetilo al trasiego: 42 µg/l.', 'Acetaldehído: 6 mg/l.', 'Botella L2608-B21: O₂ 35 ppb, cata del 28/09 conforme.'],
      notes: []
    };

    const fv12 = {
      kind: 'Lote de fermentación',
      title: 'Lote L2609-FV12 · Bardenas Lager (en fermentación)',
      summary: [
        ['Volumen', '480 hl · 4 cocimientos (C-2609-061 a C-2609-064)'],
        ['Fermentador', 'FV-12 · siembra el 26/09/2026 · día 3'],
        ['Consigna', '12 °C · límite 13,5 °C · crítico 15 °C'],
        ['Ahora', '16,8 °C (05:50) · pico 17,1 °C a las 05:20'],
        ['Causa', 'Válvula de glicol VG-12 sin abrir desde las 23:40'],
        ['Trasiego previsto', '06/10/2026 a BBT-4'],
        ['Materias primas', 'Malta MAL-2609-02 · lúpulo LUP-2606-11'],
        ['Alarma', 'ALM-FV12-0550 · 05:50']
      ],
      back: [
        { when: '2026-09-26', stage: 'Cocimientos', detail: 'Malta MAL-2609-02 y lúpulo LUP-2606-11; mosto a 11,8 °P', ref: 'C-2609-061…064' },
        { when: '2026-09-26 18:00', stage: 'Siembra', detail: 'Levadura lager W-34/70, generación 3', ref: 'LEV-26-09-03' },
        { when: '2026-09-28 23:40', stage: 'Fallo de la válvula', detail: 'VG-12 no confirma la apertura', ref: 'VG-12', tone: 'warn' },
        { when: '2026-09-29 02:30', stage: 'Por encima del límite', detail: '13,5 °C; alarma de aviso reconocida', ref: 'SCADA bodega', tone: 'crit' },
        { when: '2026-09-29 05:50', stage: 'Alarma escalada', detail: '16,8 °C; se escala al Maestro cervecero', ref: 'ALM-FV12-0550', tone: 'crit' }
      ],
      forward: {
        title: 'Análisis propuestos (LIMS LabWare)',
        cols: [
          { key: 'test', label: 'Análisis' },
          { key: 'limit', label: 'Límite al trasiego' },
          { key: 'when', label: 'Cuándo' },
          { key: 'status', label: 'Estado', chip: true }
        ],
        rows: [
          { test: 'Diacetilo total', limit: '≤ 80 µg/l', when: 'Hoy y al trasiego', status: 'pending' },
          { test: 'Acetaldehído', limit: '≤ 10 mg/l', when: 'Hoy y al trasiego', status: 'pending' },
          { test: 'Ésteres (acetato de isoamilo)', limit: '≤ 2,0 mg/l', when: 'Al trasiego', status: 'pending' },
          { test: 'Extracto aparente y pH', limit: 'Curva de fermentación', when: 'Cada 12 h', status: 'pending' },
          { test: 'Cata triangular frente a FV-11', limit: 'Sin diferencia significativa', when: 'Al trasiego', status: 'pending' }
        ],
        note: { title: 'Retención propuesta', body: 'Retener el lote en SAP hasta el resultado del LIMS y valorar una guarda más larga (reabsorción del diacetilo). Requiere la aprobación del Maestro cervecero.', icon: 'lock' }
      },
      quality: ['Día 3: extracto aparente 7,4 °P (curva normal a 12 °C: 8,0 °P), la fermentación se ha acelerado.', 'Sin análisis de diacetilo todavía hoy.'],
      notes: [{ title: 'Riesgo de perfil', body: 'Por encima de 15 °C durante más de 2 h la levadura produce más diacetilo, acetaldehído y ésteres (PR-FER-003).', tone: 'crit', icon: 'flask' }]
    };

    function rawRecord(o) {
      return {
        kind: o.kind,
        title: o.title,
        summary: o.summary,
        back: o.back,
        forward: {
          title: 'Lotes de fermentación que la usan',
          cols: [
            { key: 'lot', label: 'Lote', mono: true, sub: 'what' },
            { key: 'date', label: 'Fecha' },
            { key: 'qty', label: 'Cantidad' },
            { key: 'status', label: 'Estado', chip: true }
          ],
          rows: o.rows,
          note: o.note
        },
        quality: o.quality,
        notes: o.notes || []
      };
    }

    const mal = rawRecord({
      kind: 'Materia prima', title: 'Lote MAL-2607-05 · malta Pilsen',
      summary: [['Proveedor', 'Maltas de Castilla, S.A. · lote proveedor MC-26-1904'], ['Recibido', '14/07/2026 · 120 t a granel'], ['Consumido', '82,3 t en 9 lotes de fermentación'], ['En silo 2', '37,7 t']],
      back: [
        { when: '2026-07-10', stage: 'Malteado', detail: 'Cebada de dos carreras de la cosecha 2026 (Castilla y León)', ref: 'MC-26-1904' },
        { when: '2026-07-14', stage: 'Recepción', detail: 'Humedad 4,2 %, extracto 81,5 %, micotoxinas (DON) < 200 µg/kg', ref: 'LIMS RM-26-0712', tone: 'ok' }
      ],
      rows: [
        { lot: 'L2607-FV03', what: 'Bardenas Lager', date: '17/07/2026', qty: '7.680 kg', status: 'ok' },
        { lot: 'L2607-FV05', what: 'Bardenas Lager → L2608-K14 y L2608-B21', date: '21/07/2026', qty: '7.680 kg', status: { status: 'warning', label: 'Barril reclamado' } },
        { lot: 'L2607-FV07', what: 'Bardenas Tostada', date: '23/07/2026', qty: '9.100 kg', status: 'ok' },
        { lot: 'L2607-FV09', what: 'Bardenas Lager', date: '27/07/2026', qty: '7.680 kg', status: 'ok' },
        { lot: '5 lotes más', what: 'Lager, Tostada y Sin', date: '29/07 a 12/08/2026', qty: '50.160 kg', status: 'ok' }
      ],
      note: { title: 'Sin relación con la oxidación', body: 'Los otros lotes elaborados con esta malta no tienen reclamaciones ni notas de cartón en cata.', icon: 'info' },
      quality: ['Certificado de análisis del proveedor conforme.', 'Proveedor homologado (BRCGS).']
    });
    const lup = rawRecord({
      kind: 'Materia prima', title: 'Lote LUP-2606-11 · lúpulo en pellets T90',
      summary: [['Variedad', 'Nugget · pellets T90 · alfa-ácidos 12,8 %'], ['Proveedor', 'Lúpulos del Órbigo, S. Coop. (León)'], ['Recibido', '11/06/2026 · 400 kg en bolsas al vacío con N₂'], ['Consumido', '288 kg en 12 lotes']],
      back: [
        { when: '2025-09-15', stage: 'Cosecha', detail: 'Cosecha 2025, peletizado en noviembre', ref: 'LO-25-NUG-07' },
        { when: '2026-06-11', stage: 'Recepción', detail: 'Almacén frío a 2 °C · alfa-ácidos 12,8 % · HSI 0,28', ref: 'LIMS RM-26-0605', tone: 'ok' }
      ],
      rows: [
        { lot: 'L2607-FV05', what: 'Bardenas Lager → L2608-K14', date: '21/07/2026', qty: '24 kg', status: { status: 'warning', label: 'Barril reclamado' } },
        { lot: 'L2609-FV12', what: 'Bardenas Lager (en fermentación)', date: '26/09/2026', qty: '24 kg', status: { status: 'critical', label: 'Alarma FV-12' } },
        { lot: '10 lotes más', what: 'Lager y Tostada', date: '12/06 a 22/09/2026', qty: '240 kg', status: 'ok' }
      ],
      note: { title: 'Envasado al vacío', body: 'HSI 0,28 (índice de almacenamiento): lúpulo fresco, sin oxidación propia.', icon: 'info' },
      quality: ['Certificado de residuos fitosanitarios conforme (Reglamento (CE) 396/2005).']
    });
    const co2 = rawRecord({
      kind: 'Materia prima', title: 'Lote CO2-2608-02 · CO₂ de calidad alimentaria',
      summary: [['Origen', 'CO₂ recuperado de fermentación (planta propia)'], ['Pureza', '99,99 % (especificación ≥ 99,98 %, EIGA/ISBT)'], ['Producido', '01/08 a 20/08/2026 · 42 t'], ['Uso', 'Contrapresión y purga en LLB-1 y LB-1']],
      back: [
        { when: '2026-08-01', stage: 'Recuperación', detail: 'Lavado, filtro de carbón activo y licuado a tanque de 50 t', ref: 'CO2-REC' },
        { when: '2026-08-02', stage: 'Análisis de pureza', detail: '99,99 % · O₂ < 10 ppm · sin olor ni sabor', ref: 'LIMS GAS-26-0802', tone: 'ok' }
      ],
      rows: [
        { lot: 'L2608-K14', what: 'Barril · LLB-1', date: '18/08/2026', qty: '1.040 barriles', status: { status: 'warning', label: 'Barril reclamado' } },
        { lot: 'L2608-B21', what: 'Botella · LB-1', date: '19/08/2026', qty: '47.880 botellas', status: 'ok' },
        { lot: '14 lotes más', what: 'Barril y botella', date: '02/08 a 20/08/2026', qty: '—', status: 'ok' }
      ],
      note: { title: 'El CO₂ no explica el O₂', body: 'Pureza conforme durante todo el lote; el oxígeno alto de LLB-1 apunta a la purga del cabezal 3, no al gas.', icon: 'info' },
      quality: ['Pureza diaria entre 99,98 % y 99,99 %.']
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
