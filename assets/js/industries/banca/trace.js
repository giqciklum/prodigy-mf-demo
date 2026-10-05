/* Banco Cierzo · registros de trazabilidad por expediente (BIN, punto común de compromiso, comercio y reclamación).
 * Los lee App.traceModal desde CN_DATA.trace[código]. Números de tarjeta siempre enmascarados (PCI DSS).
 * Datos sintéticos de demostración (MFM). */
agenticPack('banca', {
  trace: (function () {
    'use strict';

    const CARD_COLS = [
      { key: 'pan', label: 'Tarjeta', mono: true, sub: 'product' },
      { key: 'client', label: 'Cliente', sub: 'segment' },
      { key: 'last', label: 'Última operación', sub: 'merchant' },
      { key: 'status', label: 'Estado', chip: true }
    ];

    /* Muestra de tarjetas del BIN 454812 con operaciones sospechosas esta noche. */
    const NIGHT = [
      ['454812······0218', 'Andrés Royo Lacasa', 'Particular', '02:14 · 0,80 €', 'STREAMBOX-SUB', 'blocked'],
      ['454812······1407', 'Marta Sanz Peiró', 'Particular', '02:58 · 349,00 €', 'GADGETMARKET', 'review'],
      ['454812······2290', 'Javier Gil Ostáriz', 'Particular', '03:05 · 312,40 €', 'TIENDAONLINE-ELEC', 'review'],
      ['454812······2716', 'Pilar Artal Fuertes', 'Particular', '03:11 · 360,00 €', 'GIFTCARDS-EU', 'review'],
      ['454812······3054', 'Ignacio Bielsa Mur', 'Autónomo', '03:24 · 329,90 €', 'TECNOFLASH-ES', 'blocked'],
      ['454812······3381', 'Natalia Bescós Gil', 'Particular', '03:31 · 0,50 €', 'DONA-PLUS', 'review'],
      ['454812······3962', 'Raúl Lasheras Abad', 'Particular', '03:47 · 370,00 €', 'PHONEPLANET', 'review'],
      ['454812······4128', 'Carmen Escó Vidal', 'Particular', '03:52 · 357,15 €', 'TIENDAONLINE-ELEC', 'blocked'],
      ['454812······4483', 'Sergio Navarro Gállego', 'Particular', '04:03 · 155,00 €', 'CRYPTO-ONRAMP', 'review'],
      ['454812······5019', 'Elena Pueyo Sancho', 'Particular', '04:16 · 338,30 €', 'GADGETMARKET', 'review'],
      ['454812······5536', 'David Marcén Lorés', 'Autónomo', '04:22 · 0,80 €', 'STREAMBOX-SUB', 'review'],
      ['454812······6102', 'Rosa Aznar Til', 'Particular', '04:37 · 360,00 €', 'GIFTCARDS-EU', 'review'],
      ['454812······6644', 'Luis Calvo Ariño', 'Particular', '04:49 · 333,60 €', 'TECNOFLASH-ES', 'review'],
      ['454812······7190', 'Ana Belén Lobera', 'Particular', '04:55 · 357,15 €', 'TIENDAONLINE-ELEC', 'review'],
      ['454812······7731', 'Lucía Ferrer Gil', 'Particular', '26/09 22:47 · 217,90 €', 'TIENDAONLINE-ELEC', 'review'],
      ['454812······8257', 'Tomás Bergua Pardo', 'Particular', '05:08 · 370,00 €', 'PHONEPLANET', 'review'],
      ['454812······8813', 'Beatriz Cored Sanz', 'Particular', '05:19 · 338,30 €', 'GADGETMARKET', 'review'],
      ['454812······9345', 'Óscar Laguna Ruiz', 'Particular', '05:41 · 0,80 €', 'STREAMBOX-SUB', 'review']
    ];
    const ST = { blocked: { status: 'blocked', label: 'Bloqueada a las 04:10' }, review: { status: 'pending', label: 'Bloqueo y reemisión propuestos' } };
    const nightRows = NIGHT.filter((r) => !/26\/09/.test(r[3])).map((r) => ({ pan: r[0], product: 'Tarjeta Cierzo Débito', client: r[1], segment: r[2], last: r[3], merchant: r[4], status: ST[r[5]] }));

    const MERCHANTS = [
      { m: 'STREAMBOX-SUB', type: 'Suscripciones digitales · IE', mcc: '4899', ops: 38, amount: '30,40 €', phase: 'Prueba de tarjetas', status: { status: 'pending', label: 'Regla propuesta' } },
      { m: 'DONA-PLUS', type: 'Donaciones en línea · NL', mcc: '8398', ops: 26, amount: '20,60 €', phase: 'Prueba de tarjetas', status: { status: 'pending', label: 'Regla propuesta' } },
      { m: 'TIENDAONLINE-ELEC', type: 'Electrónica · ES', mcc: '5732', ops: 23, amount: '8.214,30 €', phase: 'Compras', status: { status: 'pending', label: 'Regla propuesta' } },
      { m: 'GADGETMARKET', type: 'Electrónica · LT', mcc: '5732', ops: 31, amount: '10.486,50 €', phase: 'Compras', status: { status: 'pending', label: 'Regla propuesta' } },
      { m: 'TECNOFLASH-ES', type: 'Electrónica · ES', mcc: '5732', ops: 19, amount: '6.338,20 €', phase: 'Compras', status: { status: 'pending', label: 'Regla propuesta' } },
      { m: 'GIFTCARDS-EU', type: 'Tarjetas regalo · MT', mcc: '5815', ops: 27, amount: '9.720,00 €', phase: 'Compras', status: { status: 'pending', label: 'Regla propuesta' } },
      { m: 'PHONEPLANET', type: 'Telefonía · PL', mcc: '5732', ops: 14, amount: '5.180,00 €', phase: 'Compras', status: { status: 'pending', label: 'Regla propuesta' } },
      { m: 'CRYPTO-ONRAMP', type: 'Compra de criptoactivos · CY', mcc: '6051', ops: 8, amount: '1.240,00 €', phase: 'Compras', status: { status: 'pending', label: 'Regla propuesta' } }
    ];

    const bin = {
      kind: 'BIN',
      title: 'BIN 454812 · Tarjeta Cierzo Débito',
      summary: [
        ['Producto', 'Tarjeta Cierzo Débito · Visa'],
        ['Tarjetas activas', '182.400'],
        ['Operaciones sospechosas', '186 · 41.230 € (02:10–05:50)'],
        ['Tarjetas afectadas', '214 de 209 clientes'],
        ['Comercios implicados', '8 (2 de prueba · 6 de compras)'],
        ['Pico', '3,6 % de fraude CNP a las 04:55'],
        ['Alarma', 'ALM-FRA-0550 · 05:50'],
        ['Punto común relacionado', 'CPP-2609-07 (61 tarjetas)']
      ],
      back: [
        { when: '2026-09-10', stage: 'Inicio de la ventana del punto común', detail: 'Primeras tarjetas usadas en el TPV 3 de Gasolinera Ronda Norte (expediente CPP-2609-07)', ref: 'CPP-2609-07' },
        { when: '2026-09-26 22:14', stage: 'Cargos no reconocidos', detail: 'Tres compras en TIENDAONLINE-ELEC con la tarjeta ····7731 (reclamadas el 28/09)', ref: 'SAC-2026-04187', tone: 'warn' },
        { when: '2026-09-29 01:50', stage: 'Degradación del ACS', detail: 'Las OTP de 3DS por SMS llegan con más de 60 s de retraso', ref: 'INC0218842', tone: 'warn' },
        { when: '2026-09-29 02:10', stage: 'Prueba de tarjetas', detail: '64 micropagos de 0,50 a 1,00 € en STREAMBOX-SUB y DONA-PLUS', ref: 'Falcon', tone: 'warn' },
        { when: '2026-09-29 02:50', stage: 'Compras en electrónica', detail: '122 compras de 150 a 400 € en 6 comercios con exención del adquirente', ref: 'Redsys', tone: 'crit' },
        { when: '2026-09-29 04:10', stage: 'Bloqueo manual', detail: 'El analista de turno bloquea 31 tarjetas con operaciones confirmadas', ref: 'Falcon' },
        { when: '2026-09-29 05:50', stage: 'Alarma escalada', detail: '186 operaciones sospechosas por 41.230 €; tasa del 2,9 % frente al 0,3 % habitual', ref: 'ALM-FRA-0550', tone: 'crit' }
      ],
      forward: {
        title: 'Comercios del ataque (186 operaciones · 41.230 €)',
        cols: [
          { key: 'm', label: 'Comercio', mono: true, sub: 'type' },
          { key: 'mcc', label: 'MCC' },
          { key: 'phase', label: 'Fase' },
          { key: 'ops', label: 'Operaciones' },
          { key: 'amount', label: 'Importe' },
          { key: 'status', label: 'Estado', chip: true }
        ],
        rows: MERCHANTS,
        note: { title: 'Propuesta de Agentic Platform', body: 'Regla preventiva en Falcon para comercio electrónico de riesgo alto en el BIN (MCC 4899, 5732, 5815, 6051 sin SCA), reemisión de 214 tarjetas y aviso a los clientes por SMS y en la app. Requiere la aprobación del Responsable de Prevención del Fraude.', icon: 'shield' }
      },
      units: { label: 'Tarjetas (muestra)', cols: CARD_COLS, rows: nightRows },
      quality: [
        'Fraude CNP habitual del BIN: 0,3 % (media de los últimos 90 días).',
        'Umbrales de la política POL-FRA-003: aviso por encima del 1 %, crítico por encima del 2 % sostenido 30 min.',
        '71 % de las compras de la noche con SCA; las 122 compras sospechosas se hicieron con exención del adquirente (análisis de riesgo o bajo importe).',
        'Muestra de 17 tarjetas de las 214; el listado completo está en Falcon (caso FAL-CASE-26-07713).',
        'Los números de tarjeta se muestran enmascarados (PCI DSS, requisito 3.4).'
      ],
      notes: [
        { title: 'Clienta con reclamación abierta', body: 'La tarjeta ····7731 de Lucía Ferrer Gil (SAC-2026-04187) es de este BIN y está bloqueada desde el 28/09; sus cargos son del comercio TIENDAONLINE-ELEC, que reaparece esta noche.', tone: 'warn', icon: 'user' },
        { title: 'Posible incidente DORA', body: 'El retraso del ACS puede clasificarse como incidente grave: notificación inicial en 4 h (PR-DORA-002).', tone: 'crit', icon: 'alert-triangle' }
      ]
    };

    const cppCards = [
      ['454812······0218', 'Tarjeta Cierzo Débito', 'Andrés Royo Lacasa', '12/09 · 54,20 €', 'Atacada el 29/09'],
      ['454812······1407', 'Tarjeta Cierzo Débito', 'Marta Sanz Peiró', '13/09 · 61,00 €', 'Atacada el 29/09'],
      ['454812······2290', 'Tarjeta Cierzo Débito', 'Javier Gil Ostáriz', '14/09 · 48,75 €', 'Atacada el 29/09'],
      ['454812······3054', 'Tarjeta Cierzo Débito', 'Ignacio Bielsa Mur', '15/09 · 70,10 €', 'Atacada el 29/09'],
      ['454812······3381', 'Tarjeta Cierzo Débito', 'Natalia Bescós Gil', '16/09 · 45,00 €', 'Atacada el 29/09'],
      ['454812······4128', 'Tarjeta Cierzo Débito', 'Carmen Escó Vidal', '17/09 · 66,40 €', 'Atacada el 29/09'],
      ['454812······5160', 'Tarjeta Cierzo Débito', 'Pedro Sesé Allué', '18/09 · 40,00 €', 'Sin fraude'],
      ['489321······2047', 'Tarjeta Cierzo Crédito', 'Mercedes Ciria Bal', '10/09 · 82,30 €', 'Sin fraude'],
      ['489321······3398', 'Tarjeta Cierzo Crédito', 'Fernando Usón Lac', '11/09 · 57,90 €', 'Fraude 24/09 · 420,00 €'],
      ['489321······5512', 'Tarjeta Cierzo Crédito', 'Inés Garcés Pina', '19/09 · 63,15 €', 'Sin fraude'],
      ['489321······6630', 'Tarjeta Cierzo Crédito', 'Alberto Morer Pons', '20/09 · 71,80 €', 'Fraude 27/09 · 312,00 €'],
      ['522814······1176', 'Tarjeta Cierzo Prepago', 'Cristina Laborda Gil', '21/09 · 30,00 €', 'Sin fraude'],
      ['522814······4409', 'Tarjeta Cierzo Prepago', 'Jorge Bescós Asín', '22/09 · 25,00 €', 'Sin fraude'],
      ['4·····(Visa)', 'Otro emisor · red Visa', '—', '10–22/09 · 104 tarjetas', 'Aviso por Visa'],
      ['5·····(Mastercard)', 'Otro emisor · red Mastercard', '—', '10–22/09 · 73 tarjetas', 'Aviso por Mastercard']
    ].map((r) => ({ pan: r[0], product: r[1], client: r[2], segment: '', last: r[3], merchant: 'Gasolinera Ronda Norte · TPV 3', status: /Fraude|Atacada/.test(r[4]) ? { status: 'critical', label: r[4] } : /Aviso/.test(r[4]) ? { status: 'info', label: r[4] } : { status: 'pending', label: 'Bloqueo y reemisión' } }));

    const cpp = {
      kind: 'Expediente de punto común',
      title: 'Expediente CPP-2609-07 · punto común de compromiso',
      summary: [
        ['Comercio', 'Gasolinera Ronda Norte · TPV 3 · n.º 334512987'],
        ['Ventana de compromiso', '10/09/2026 a 22/09/2026'],
        ['Tarjetas expuestas', '1.284 (1.107 de Banco Cierzo · 177 de otros emisores)'],
        ['Fraude confirmado', '38 tarjetas · 14.860 € (hasta el 28/09)'],
        ['Detectado por', 'Falcon Fraud · análisis de punto común (27/09)'],
        ['Atacadas esta noche', '61 tarjetas del BIN 454812'],
        ['Marco', 'PCI DSS · PSD2 · DORA'],
        ['Objetivo', 'Bloqueo, reemisión y aviso a clientes en 4 h']
      ],
      back: [
        { when: '2026-09-10', stage: 'Inicio de la ventana', detail: 'Primera operación de una tarjeta luego defraudada en el TPV 3 (surtidores 5–6)', ref: '334512987' },
        { when: '2026-09-22', stage: 'Fin de la ventana', detail: 'El adquirente sustituye el TPV 3 por avería de lector; se recupera el equipo con un dispositivo de captura en la ranura de banda', ref: 'Adquirente' },
        { when: '2026-09-24', stage: 'Primeros fraudes', detail: 'Compras con tarjeta presente clonada (banda magnética) en Rumanía y Marruecos', ref: 'Falcon', tone: 'warn' },
        { when: '2026-09-27 11:20', stage: 'Detección del punto común', detail: 'Falcon cruza 38 tarjetas defraudadas: todas pasaron por el TPV 3 entre el 10 y el 22/09', ref: 'FAL-CPP-0907', tone: 'crit' },
        { when: '2026-09-28 09:00', stage: 'Apertura del expediente', detail: 'Expediente CPP-2609-07 en GRC Archer; aviso al adquirente y a Visa y Mastercard', ref: 'CPP-2609-07', tone: 'brand' },
        { when: '2026-09-29 05:50', stage: 'Ataque relacionado', detail: '61 tarjetas del punto común aparecen en el ataque al BIN 454812', ref: 'ALM-FRA-0550', tone: 'crit' }
      ],
      forward: {
        title: 'Tarjetas expuestas por producto y acción',
        cols: [
          { key: 'group', label: 'Grupo', mono: true, sub: 'what' },
          { key: 'cards', label: 'Tarjetas' },
          { key: 'fraud', label: 'Con fraude' },
          { key: 'action', label: 'Acción' },
          { key: 'status', label: 'Estado', chip: true }
        ],
        rows: [
          { group: '454812', what: 'Tarjeta Cierzo Débito', cards: '642', fraud: '22', action: 'Bloqueo, reemisión y aviso', status: 'pending' },
          { group: '489321', what: 'Tarjeta Cierzo Crédito', cards: '311', fraud: '14', action: 'Bloqueo, reemisión y aviso', status: 'pending' },
          { group: '522814', what: 'Tarjeta Cierzo Prepago', cards: '154', fraud: '2', action: 'Bloqueo y reemisión', status: 'pending' },
          { group: 'Visa', what: 'Otros emisores', cards: '104', fraud: '—', action: 'Aviso por la red (CAMS)', status: 'pending' },
          { group: 'Mastercard', what: 'Otros emisores', cards: '73', fraud: '—', action: 'Aviso por la red (Safety Net)', status: 'pending' }
        ],
        note: { title: 'Balance del expediente', body: '1.284 tarjetas = 1.107 de Banco Cierzo (642 + 311 + 154) + 177 de otros emisores (104 Visa + 73 Mastercard).', icon: 'scale' }
      },
      units: { label: 'Tarjetas (muestra)', cols: CARD_COLS, rows: cppCards },
      quality: [
        'PCI DSS: el comercio debe aportar un informe forense PFI; el adquirente lo ha solicitado el 28/09.',
        'PSD2: reembolso de operaciones no autorizadas antes del fin del día hábil siguiente salvo sospecha fundada de fraude del cliente.',
        'DORA: el expediente no es un incidente TIC propio; el ACS de 3DS se evalúa aparte (INC0218842).',
        'Los números de tarjeta se muestran enmascarados (PCI DSS, requisito 3.4).'
      ],
      notes: [
        { title: 'Reemisión pendiente de aprobación', body: 'Bloquear y reemitir las 1.107 tarjetas propias requiere la aprobación del Responsable de Medios de Pago (PR-TAR-007).', tone: 'warn', icon: 'lock' }
      ]
    };

    const merchant = {
      kind: 'Comercio',
      title: 'Comercio TIENDAONLINE-ELEC',
      summary: [
        ['Actividad', 'Venta en línea de electrónica de consumo · MCC 5732'],
        ['Adquirente', 'Pagos del Ebro, EP · comercio 0471225'],
        ['País', 'España'],
        ['Compras con tarjetas Cierzo (30 días)', '1.326 · 168.410 €'],
        ['Disputadas (30 días)', '27 · 9.114,60 €'],
        ['Esta noche', '23 operaciones sospechosas · 8.214,30 €'],
        ['SCA', 'Aplica exención de análisis de riesgo del adquirente'],
        ['Reclamación', 'SAC-2026-04187']
      ],
      back: [
        { when: '2025-11-03', stage: 'Alta del comercio', detail: 'Alta en Pagos del Ebro, EP; MCC 5732', ref: '0471225' },
        { when: '2026-09-26 22:14', stage: 'Cargos de la reclamación', detail: 'Tres compras con la tarjeta ····7731 entre las 22:14 y las 22:47 (612,40 €)', ref: 'SAC-2026-04187', tone: 'warn' },
        { when: '2026-09-29 02:50', stage: 'Compras sospechosas', detail: '23 compras con tarjetas del BIN 454812 entre las 02:50 y las 05:41', ref: 'ALM-FRA-0550', tone: 'crit' }
      ],
      forward: {
        title: 'Operaciones disputadas o sospechosas',
        cols: [
          { key: 'when', label: 'Fecha y hora' },
          { key: 'card', label: 'Tarjeta', mono: true },
          { key: 'amount', label: 'Importe' },
          { key: 'sca', label: 'Autenticación' },
          { key: 'status', label: 'Estado', chip: true }
        ],
        rows: [
          { when: '26/09 22:14', card: '454812······7731', amount: '189,90 €', sca: 'Exención TRA del adquirente', status: { status: 'open', label: 'Reclamada' } },
          { when: '26/09 22:31', card: '454812······7731', amount: '204,60 €', sca: 'Exención TRA del adquirente', status: { status: 'open', label: 'Reclamada' } },
          { when: '26/09 22:47', card: '454812······7731', amount: '217,90 €', sca: 'Exención TRA del adquirente', status: { status: 'open', label: 'Reclamada' } },
          { when: '29/09 03:05', card: '454812······2290', amount: '312,40 €', sca: 'Exención TRA del adquirente', status: 'review' },
          { when: '29/09 03:52', card: '454812······4128', amount: '357,15 €', sca: 'Exención TRA del adquirente', status: 'blocked' },
          { when: '29/09 04:55', card: '454812······7190', amount: '357,15 €', sca: 'Exención TRA del adquirente', status: 'review' },
          { when: '29/09 02:50–05:41', card: '20 tarjetas más', amount: '7.187,60 €', sca: 'Exención TRA del adquirente', status: 'review' }
        ],
        note: { title: 'Patrón repetido', body: 'Las compras reclamadas del 26/09 y las de esta noche comparten importe medio (≈ 350 €), franja nocturna y exención del adquirente.', icon: 'search' }
      },
      quality: [
        'Ratio de disputas a 30 días del 2,0 % sobre operaciones con tarjetas Cierzo (umbral de seguimiento de la red: 0,9 %).',
        'Las 23 operaciones de esta noche entran en la regla preventiva propuesta en la alarma.'
      ],
      notes: [
        { title: 'Comunicar al adquirente', body: 'Proponer a Pagos del Ebro, EP que retire la exención TRA al comercio mientras dure el ataque.', tone: 'warn', icon: 'send' }
      ]
    };

    const sac = {
      kind: 'Expediente de reclamación',
      title: 'Expediente SAC-2026-04187 · cargos no reconocidos',
      summary: [
        ['Clienta', 'Lucía Ferrer Gil · particular desde 2014'],
        ['Tarjeta', 'Tarjeta Cierzo Débito ····7731 (BIN 454812)'],
        ['Cargos', '3 en TIENDAONLINE-ELEC · 612,40 €'],
        ['Recibida', '28/09/2026 09:14 · app Banco Cierzo'],
        ['Devolución provisional', 'Decidir antes del fin del 29/09/2026'],
        ['Respuesta del SAC', 'Antes del 20/10/2026 (15 días hábiles)'],
        ['Marco', 'PSD2 (RDL 19/2018, art. 45) · Orden ECE/1263/2019'],
        ['Estado', 'Abierta · tarjeta bloqueada el 28/09']
      ],
      back: [
        { when: '2026-09-26 22:14', stage: 'Primer cargo', detail: '189,90 € en TIENDAONLINE-ELEC sin SCA', ref: 'Redsys', tone: 'warn' },
        { when: '2026-09-26 22:31', stage: 'Segundo cargo', detail: '204,60 € en TIENDAONLINE-ELEC sin SCA', ref: 'Redsys', tone: 'warn' },
        { when: '2026-09-26 22:47', stage: 'Tercer cargo', detail: '217,90 € en TIENDAONLINE-ELEC sin SCA', ref: 'Redsys', tone: 'warn' },
        { when: '2026-09-28 09:14', stage: 'Reclamación', detail: 'La clienta no reconoce los tres cargos; tarjeta ····7731 bloqueada desde la app', ref: 'SAC-2026-04187', tone: 'crit' },
        { when: '2026-09-29 05:50', stage: 'Ataque relacionado', detail: 'El comercio vuelve a aparecer en el ataque al BIN 454812 (23 operaciones)', ref: 'ALM-FRA-0550', tone: 'crit' }
      ],
      forward: {
        title: 'Pasos del expediente',
        cols: [
          { key: 'step', label: 'Paso' },
          { key: 'owner', label: 'Responsable' },
          { key: 'due', label: 'Plazo' },
          { key: 'status', label: 'Estado', chip: true }
        ],
        rows: [
          { step: 'Acuse de recibo a la clienta', owner: 'SAC', due: '28/09/2026', status: 'done' },
          { step: 'Bloqueo de la tarjeta ····7731', owner: 'Clienta (app)', due: '28/09/2026', status: 'done' },
          { step: 'Decisión de devolución provisional (612,40 €)', owner: 'SAC y Prevención del Fraude', due: '29/09/2026', status: 'pending' },
          { step: 'Retrocesión al adquirente (Visa, código 10.4)', owner: 'Medios de pago', due: '26/10/2026', status: 'pending' },
          { step: 'Respuesta definitiva', owner: 'SAC', due: '20/10/2026', status: 'pending' }
        ],
        note: { title: 'Reemisión', body: 'Nueva tarjeta en reemisión urgente (envío en 48 h).', icon: 'key' }
      },
      quality: [
        'Las tres compras se autorizaron sin autenticación reforzada (exención de análisis de riesgo del adquirente): la carga de la prueba de la autenticación recae en el proveedor de servicios de pago.',
        'Sin indicios de fraude de la clienta: dispositivo y ubicación habituales en la app a la hora de los cargos.'
      ],
      notes: [
        { title: 'Plazo de hoy', body: 'PSD2 obliga a devolver antes del fin del día hábil siguiente a la notificación salvo sospecha fundada de fraude, comunicada al Banco de España.', tone: 'warn', icon: 'clock' }
      ]
    };

    return {
      '454812': bin,
      'BIN-454812': bin,
      'BIN 454812': bin,
      'CPP-2609-07': cpp,
      '334512987': cpp,
      'TIENDAONLINE-ELEC': merchant,
      'SAC-2026-04187': sac
    };
  })()
});
