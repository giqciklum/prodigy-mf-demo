/* Hidromec Ebro · registros de trazabilidad (lotes de componente, lotes de montaje, números de serie y lotes de
 * fabricación). Los lee App.traceModal desde CN_DATA.trace[código]. Datos sintéticos de demostración (MFM). */
agenticPack('maquinaria', {
  trace: (function () {
    'use strict';

    /* Equipos montados con juntas del lote JNT-2607-031: [serie, modelo, montaje, cliente, país, entrega, cliente final] */
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
      ['PH250-26-0476', 'PH-250', 'MON-2608-11', 'En planta · almacén de producto terminado', '—', '', ''],
      ['PH250-26-0477', 'PH-250', 'MON-2608-11', 'En planta · almacén de producto terminado', '—', '', ''],
      ['PH250-26-0478', 'PH-250', 'MON-2608-11', 'En planta · almacén de producto terminado', '—', '', '']
    ];
    const SEALS = { 'PH-250': 48, 'GH-55': 24 };
    const COUNTRY = { ES: 'España', PT: 'Portugal', FR: 'Francia', '—': '—' };
    const unitRow = (f) => ({
      serial: f[0], model: f[1], mon: f[2], seals: SEALS[f[1]],
      client: f[3], final: f[6] || (f[4] === '—' ? '' : 'Uso propio'), country: COUNTRY[f[4]],
      delivered: f[5] || '—',
      status: f[0] === 'PH250-26-0412' ? { status: 'critical', label: 'Fuga reclamada' }
        : (f[0] === 'PH250-26-0476' || f[0] === 'PH250-26-0478') ? { status: 'hold', label: 'Retenida · rezume en BP-1' }
          : f[4] === '—' ? { status: 'hold', label: 'Retenida en planta' } : { status: 'shipped', label: 'En campo' }
    });
    const UNIT_COLS = [
      { key: 'serial', label: 'N.º de serie', mono: true, sub: 'model' },
      { key: 'mon', label: 'Lote de montaje', mono: true },
      { key: 'seals', label: 'Juntas del lote' },
      { key: 'client', label: 'Cliente', sub: 'final' },
      { key: 'country', label: 'País', sub: 'delivered' },
      { key: 'status', label: 'Estado', chip: true }
    ];
    const fleetOf = (mon) => FLEET.filter((f) => f[2] === mon).map(unitRow);

    function monRecord(code, o) {
      const rows = fleetOf(code);
      const ph = rows.filter((r) => r.model === 'PH-250').length;
      const gh = rows.filter((r) => r.model === 'GH-55').length;
      const seals = rows.reduce((s, r) => s + r.seals, 0);
      return {
        kind: 'Lote de montaje',
        title: `Lote de montaje ${code}`,
        summary: [['Línea', 'LM-2 (prensas) y LM-1 (grupos)'], ['Montaje', o.dates], ['Equipos', `${ph} PH-250 · ${gh} GH-55`], ['Juntas JNT-2607-031', `${seals.toLocaleString('es-ES')} (48 por PH-250 · 24 por GH-55)`], ['En campo', `${o.field} equipos`], ['Pruebas', o.tests], ['Lote de juntas', 'JNT-2607-031'], ['Responsable', 'Jefe de producción']],
        back: [
          { when: '2026-07-21', stage: 'Recepción del lote de juntas', detail: 'JNT-2607-031 · Sellados Ibéricos, S.A. · 1.200 juntas · inspección por muestreo conforme (dureza 92 Shore A)', ref: 'JNT-2607-031', tone: 'brand' },
          { when: o.kitting, stage: 'Preparación de kits', detail: `Salida de ${seals.toLocaleString('es-ES')} juntas del almacén C-14-03 a la línea`, ref: o.kitRef },
          { when: o.start, stage: 'Montaje de cilindros y grupos', detail: o.assembly, ref: code },
          { when: o.test, stage: 'Prueba hidráulica final', detail: o.tests, ref: o.testRef, tone: o.testTone || 'ok' }
        ],
        forward: {
          title: `${rows.length} equipos montados`,
          cols: UNIT_COLS,
          rows,
          note: { title: 'Expedición', body: o.note, icon: 'truck' }
        },
        quality: o.quality,
        notes: o.notes || []
      };
    }

    const jnt = {
      kind: 'Lote de componente',
      title: 'Lote de juntas JNT-2607-031',
      summary: [
        ['Componente', 'Kit de juntas hidráulicas KJ-80 (PU/NBR) · ref. 7710-0480'],
        ['Proveedor', 'Sellados Ibéricos, S.A. · lote proveedor SI-26-1187'],
        ['Recibidas', '1.200 juntas · 21/07/2026'],
        ['Balance', '1.104 montadas · 72 en almacén · 24 desechadas'],
        ['Equipos', '26 montados · 23 en campo (17 PH-250 y 6 GH-55)'],
        ['Clientes', '11 en España, Portugal y Francia'],
        ['En almacén', '72 juntas · ubicación C-14-03'],
        ['Objetivo de campaña', 'Clientes avisados en 4 h']
      ],
      back: [
        { when: '2026-07-14', stage: 'Fabricación en el proveedor', detail: 'Sellados Ibéricos moldea el lote SI-26-1187 (poliuretano 92 Shore A, labio de NBR). Certificado de material 3.1 adjunto.', ref: 'SI-26-1187' },
        { when: '2026-07-21 08:40', stage: 'Recepción en Zaragoza', detail: 'Pedido 4500391022 · 1.200 juntas en 10 cajas · albarán SI-AL-26-5521', ref: 'EM 5000812744', tone: 'brand' },
        { when: '2026-07-21 11:15', stage: 'Inspección de recepción (SAP QM)', detail: 'Muestreo ISO 2859-1 nivel II (80 juntas): dimensiones y dureza conformes. 24 juntas desechadas por rebaba en el labio.', ref: 'Lote QM 010000488173', tone: 'warn' },
        { when: '2026-07-22', stage: 'Liberación a almacén', detail: '1.176 juntas a la ubicación C-14-03', ref: 'C-14-03', tone: 'ok' },
        { when: '2026-07-27', stage: 'Consumo en montaje', detail: 'Primer consumo en el lote de montaje MON-2607-22', ref: 'MON-2607-22' }
      ],
      forward: {
        title: 'Consumo del lote (balance de masas)',
        cols: [
          { key: 'dest', label: 'Destino', mono: true, sub: 'what' },
          { key: 'date', label: 'Fecha' },
          { key: 'qty', label: 'Juntas' },
          { key: 'equip', label: 'Equipos' },
          { key: 'status', label: 'Estado', chip: true }
        ],
        rows: [
          { dest: 'MON-2607-22', what: 'Montaje LM-2 / LM-1', date: '27–31/07/2026', qty: '432', equip: '8 PH-250 · 2 GH-55', status: { status: 'shipped', label: '10 en campo' } },
          { dest: 'MON-2608-03', what: 'Montaje LM-2 / LM-1', date: '03–07/08/2026', qty: '384', equip: '7 PH-250 · 2 GH-55', status: { status: 'shipped', label: '9 en campo' } },
          { dest: 'MON-2608-11', what: 'Montaje LM-2 / LM-1', date: '11–14/08/2026', qty: '288', equip: '5 PH-250 · 2 GH-55', status: { status: 'warning', label: '4 en campo · 3 en planta' } },
          { dest: 'C-14-03', what: 'Almacén de componentes', date: 'Hoy', qty: '72', equip: '—', status: { status: 'pending', label: 'Sin bloquear' } },
          { dest: 'Desecho', what: 'Inspección de recepción', date: '21/07/2026', qty: '24', equip: '—', status: { status: 'closed', label: 'Desechadas' } }
        ],
        note: { title: 'Balance cerrado', body: '1.200 recibidas = 1.104 montadas + 72 en almacén + 24 desechadas. Diferencia: 0 juntas.', icon: 'scale' }
      },
      units: { label: 'Equipos', cols: UNIT_COLS, rows: FLEET.map(unitRow) },
      quality: [
        'Certificado 3.1 del proveedor: PU 92 ± 3 Shore A, alargamiento a rotura 480 %.',
        'Inspección de recepción: 80 juntas muestreadas, 0 fuera de tolerancia dimensional; 24 desechadas por rebaba visible.',
        'Prueba final de los 26 equipos: todos conformes a la salida de planta (1,25 × presión nominal, 30 min sin fuga).',
        'Re-prueba del 28/09 de las 3 PH-250 de MON-2608-11 en planta: rezume en 2 (PH250-26-0476 y PH250-26-0478).',
        'Proveedor homologado desde 2019; última auditoría de proceso el 12/03/2026 (sin no conformidades mayores).'
      ],
      notes: [
        { title: 'Dos señales del mismo lote', body: 'Fuga reclamada en PH250-26-0412 (REC-2026-0187) y rezume en dos prensas en planta. PR-POS-005 pide valorar una campaña de campo de los 23 equipos en 4 h.', tone: 'crit', icon: 'alert-triangle' },
        { title: 'Juntas pendientes de bloquear', body: 'Las 72 juntas de C-14-03 siguen disponibles para montaje: bloquearlas en SAP QM requiere la aprobación de Calidad.', tone: 'warn', icon: 'lock' }
      ]
    };

    const ph = {
      kind: 'Número de serie',
      title: 'Prensa PH-250 · n.º de serie PH250-26-0412',
      summary: [
        ['Modelo', 'Prensa hidráulica PH-250 (250 t) · marcado CE'],
        ['Lote de montaje', 'MON-2607-22 · línea LM-2'],
        ['Juntas del cilindro principal', 'JNT-2607-031 (Sellados Ibéricos)'],
        ['Cliente', 'Prensas y Servicios del Norte, S.L. (Bilbao)'],
        ['Cliente final', 'Estampaciones Nervión, S.L. (Basauri)'],
        ['Entrega', '04/08/2026 · garantía 24 meses'],
        ['Prueba final', '31/07/2026 · BP-1 · conforme'],
        ['Reclamación', 'REC-2026-0187 · NC-2026-0233']
      ],
      back: [
        { when: '2026-07-21', stage: 'Recepción de juntas', detail: 'Lote JNT-2607-031 de Sellados Ibéricos (1.200 juntas)', ref: 'JNT-2607-031' },
        { when: '2026-07-24', stage: 'Mecanizado del cilindro principal', detail: 'Camisa CIL-250 mecanizada en MC-02 y bruñida; vástago rectificado en RECT-01 (Ra 0,2 µm)', ref: 'OF 4100731' },
        { when: '2026-07-29', stage: 'Montaje', detail: 'Cilindro principal, cojín y extractor en LM-2 con 48 juntas del lote JNT-2607-031; par de apriete de la tapa conforme', ref: 'MON-2607-22' },
        { when: '2026-07-31 10:20', stage: 'Prueba hidráulica final', detail: 'Banco BP-1 · 1,25 × presión nominal (312 bar) durante 30 min · sin fuga ni rezume', ref: 'PRB-26-07-0918', tone: 'ok' },
        { when: '2026-08-03 14:00', stage: 'Expedición', detail: 'Transporte especial a Bilbao · albarán 80041977', ref: '80041977' },
        { when: '2026-08-04', stage: 'Entrega y puesta en marcha', detail: 'Instalada en Estampaciones Nervión por el servicio técnico del distribuidor', ref: 'Acta PEM-26-0388', tone: 'ok' },
        { when: '2026-09-28 17:42', stage: 'Reclamación', detail: 'Fuga de aceite por el vástago del cilindro principal tras unas 400 h de funcionamiento', ref: 'REC-2026-0187', tone: 'crit' }
      ],
      forward: {
        title: 'Servicio y posventa',
        cols: [
          { key: 'date', label: 'Fecha' },
          { key: 'event', label: 'Evento' },
          { key: 'ref', label: 'Referencia', mono: true },
          { key: 'status', label: 'Estado', chip: true }
        ],
        rows: [
          { date: '04/08/2026', event: 'Puesta en marcha y formación del operario', ref: 'PEM-26-0388', status: 'done' },
          { date: '15/09/2026', event: 'Revisión de 250 h (cambio de filtro de retorno)', ref: 'SRV-26-1402', status: 'done' },
          { date: '28/09/2026', event: 'Reclamación por fuga de aceite', ref: 'REC-2026-0187', status: 'open' },
          { date: '28/09/2026', event: 'No conformidad de cliente', ref: 'NC-2026-0233', status: 'open' }
        ],
        note: { title: 'Otras prensas del mismo lote en el distribuidor', body: 'Prensas y Servicios del Norte tiene otras dos prensas con juntas JNT-2607-031: PH250-26-0405 (Talleres Arratia) y PH250-26-0441 (Calderería Zorroza).', icon: 'users' }
      },
      quality: [
        'Prueba final conforme el 31/07/2026 (PRB-26-07-0918): 312 bar, 30 min, caída de presión 0 bar.',
        'Limpieza del aceite a la salida: ISO 4406 16/14/11.',
        'Expediente técnico CE y declaración de conformidad DC-PH250-26-0412 (Directiva 2006/42/CE; Reglamento (UE) 2023/1230 a partir de 2027).',
        'Revisión de 250 h del 15/09/2026 sin anotaciones de fuga.'
      ],
      notes: [
        { title: 'Plazos de respuesta', body: 'Acuse en 24 h (antes del 29/09 17:42) e informe 8D antes del 13/10/2026 (PR-CAL-008).', tone: 'warn', icon: 'clock' }
      ]
    };

    const cul = {
      kind: 'Lote de fabricación',
      title: 'Lote de culatas CUL-2609-118',
      summary: [
        ['Pieza', 'Culata de cilindro CUL-80 · fundición nodular GGG-50'],
        ['Orden de fabricación', 'OF 4100872 · 120 culatas'],
        ['Máquina', 'MC-04 (DMG Mori DMU 65)'],
        ['Mecanizadas', '84 (42 antes de las 03:40 · 42 entre 03:40 y 05:50)'],
        ['Pendientes', '36 culatas (propuesta: pasar a MC-02)'],
        ['Destino', 'Cilindros de PH-160 y PH-250 · montaje de octubre'],
        ['Fundición', 'FM-26-3310 · Fundiciones del Moncayo'],
        ['Alarma', 'ALM-MC04-0550 · 05:50']
      ],
      back: [
        { when: '2026-09-22', stage: 'Recepción de la fundición', detail: '120 piezas en bruto de Fundiciones del Moncayo, lote FM-26-3310, con certificado 3.1', ref: 'FM-26-3310' },
        { when: '2026-09-28 16:00', stage: 'Liberación de la OF', detail: 'OF 4100872 liberada en SAP PP y secuenciada en MES Opcenter para MC-04', ref: 'OF 4100872' },
        { when: '2026-09-29 01:30', stage: 'Inicio del mecanizado', detail: 'Primera pieza conforme en CMM-1 (programa CUL80-OP20)', ref: 'CMM-1', tone: 'ok' },
        { when: '2026-09-29 03:40', stage: 'Vibración en zona D', detail: 'El husillo de MC-04 supera 4,5 mm/s RMS; la máquina sigue produciendo', ref: 'VS-MC04-01', tone: 'warn' },
        { when: '2026-09-29 05:50', stage: 'Alarma escalada', detail: '7,8 mm/s RMS; 42 culatas mecanizadas en la ventana', ref: 'ALM-MC04-0550', tone: 'crit' }
      ],
      forward: {
        title: 'Estado de las piezas',
        cols: [
          { key: 'range', label: 'Piezas', mono: true },
          { key: 'window', label: 'Mecanizado' },
          { key: 'qty', label: 'Cantidad' },
          { key: 'where', label: 'Ubicación' },
          { key: 'status', label: 'Estado', chip: true }
        ],
        rows: [
          { range: '001–042', window: '01:30–03:40 · MC-04 en rango', qty: '42', where: 'Estantería de intermedios E-07', status: { status: 'ok', label: 'Conformes (muestreo 1/10)' } },
          { range: '043–084', window: '03:40–05:50 · vibración alta', qty: '42', where: 'Salida de MC-04', status: { status: 'evaluate', label: 'A metrología 100 %' } },
          { range: '085–120', window: 'Sin mecanizar', qty: '36', where: 'Bruto · junto a MC-04', status: { status: 'pending', label: 'Reasignar a MC-02' } }
        ],
        note: { title: 'Ninguna culata ha salido de la nave', body: 'Las 84 culatas mecanizadas siguen en la nave 1; ninguna se ha consumido en montaje.', icon: 'box' }
      },
      units: {
        label: 'Culatas en la ventana',
        cols: [
          { key: 'sn', label: 'Pieza', mono: true },
          { key: 'time', label: 'Fin de mecanizado' },
          { key: 'rms', label: 'RMS husillo' },
          { key: 'status', label: 'Estado', chip: true }
        ],
        rows: Array.from({ length: 42 }, (_, i) => {
          const min = 220 + Math.round(i * 130 / 42) + 3;
          const rms = (4.6 + (i / 41) * 3.4).toFixed(1).replace('.', ',');
          return { sn: `CUL-2609-118-${String(43 + i).padStart(3, '0')}`, time: `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`, rms: `${rms} mm/s`, status: { status: 'evaluate', label: 'A metrología' } };
        })
      },
      quality: [
        'Plan de control CUL-80: muestreo 1 de cada 10 en CMM-1 (planitud de la cara de junta ≤ 0,02 mm, Ra ≤ 1,6 µm).',
        'Piezas 010, 020, 030 y 040 medidas: conformes.',
        'Pieza 050 (04:14) medida: planitud 0,018 mm, en el límite superior; Ra 1,5 µm.',
        'La vibración del husillo degrada la rugosidad y la planitud de la cara de junta: PR-CAL-004 pide metrología al 100 % de lo mecanizado en zona D.'
      ],
      notes: [
        { title: 'Bloqueo propuesto', body: 'Bloquear en SAP QM las piezas 043–084 hasta su metrología al 100 % en CMM-1. Requiere la aprobación del Jefe de mantenimiento o de Calidad.', tone: 'crit', icon: 'lock' }
      ]
    };

    return {
      'JNT-2607-031': jnt,
      'PH250-26-0412': ph,
      'CUL-2609-118': cul,
      'MON-2607-22': monRecord('MON-2607-22', {
        dates: '27–31/07/2026', field: 10, kitting: '2026-07-27 06:30', kitRef: 'RES 0081277', start: '2026-07-27',
        assembly: '8 prensas PH-250 y 2 grupos GH-55; juntas del cilindro principal, cojín y extractor del lote JNT-2607-031', test: '2026-07-31',
        tests: '10 pruebas en BP-1 y BP-2 · todas conformes', testRef: 'PRB-26-07-0911…0920',
        note: 'Los 10 equipos se entregaron entre el 03/08 y el 14/08/2026 a 8 clientes de España, Portugal y Francia.',
        quality: ['Prueba final conforme en los 10 equipos.', 'Par de apriete de tapas registrado en MES Opcenter (100 % conforme).', 'PH250-26-0412, de este lote, es la prensa reclamada (REC-2026-0187).'],
        notes: [{ title: 'Incluye la prensa reclamada', body: 'PH250-26-0412 (Prensas y Servicios del Norte → Estampaciones Nervión).', tone: 'warn', icon: 'alert-triangle' }]
      }),
      'MON-2608-03': monRecord('MON-2608-03', {
        dates: '03–07/08/2026', field: 9, kitting: '2026-08-03 06:30', kitRef: 'RES 0081402', start: '2026-08-03',
        assembly: '7 prensas PH-250 y 2 grupos GH-55 con juntas del lote JNT-2607-031', test: '2026-08-10',
        tests: '9 pruebas en BP-1 y BP-2 · todas conformes', testRef: 'PRB-26-08-0104…0112',
        note: 'Los 9 equipos se entregaron entre el 18/08 y el 01/09/2026 a 7 clientes de España y Portugal.',
        quality: ['Prueba final conforme en los 9 equipos.', 'Sin reclamaciones de campo hasta hoy.']
      }),
      'MON-2608-11': monRecord('MON-2608-11', {
        dates: '11–14/08/2026', field: 4, kitting: '2026-08-11 06:30', kitRef: 'RES 0081530', start: '2026-08-11',
        assembly: '5 prensas PH-250 y 2 grupos GH-55 con juntas del lote JNT-2607-031', test: '2026-09-28',
        tests: 'Re-prueba antes de expedir las 3 PH-250 en planta: rezume en 2', testRef: 'PRB-26-09-0477…0479', testTone: 'crit',
        note: '4 equipos entregados entre el 01/09 y el 09/09/2026; 3 PH-250 siguen en el almacén de producto terminado.',
        quality: ['Prueba final de agosto conforme en los 7 equipos.', 'Re-prueba del 28/09: PH250-26-0476 y PH250-26-0478 con rezume en el vástago; PH250-26-0477 conforme.', 'No conformidad propuesta NC-2026-0234.'],
        notes: [{ title: 'Rezume en banco', body: 'Dos prensas de este lote rezuman en la re-prueba: misma junta que la prensa reclamada.', tone: 'crit', icon: 'droplet' }]
      })
    };
  })()
});
