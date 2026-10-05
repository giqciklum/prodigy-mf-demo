/*
 * Banco Cierzo · simulacro de trazabilidad: punto común de compromiso CPP-2609-07.
 * TPV 3 de Gasolinera Ronda Norte (comercio 334512987, adquirente Banco Cierzo) entre el 10 y el 22/09/2026 →
 * 3.912 operaciones (3.844 liquidadas) con 1.284 tarjetas: 1.107 de Banco Cierzo y 177 de otros emisores
 * (121 Visa y 56 Mastercard) → bloqueo, reemisión y avisos a clientes, redes, comercio y supervisores.
 * Marco: PCI DSS, PSD2 y DORA. Datos sintéticos de demostración (MFM).
 */
(function () {
  'use strict';

  const CODE = 'CPP-2609-07';
  const MERCHANT = '334512987';

  /* Categorías de tarjetas: [clave, BIN, marca, producto, emisor, situación, tarjetas, operaciones liquidadas] */
  const CATS = [
    { k: 'A', bin: '454812', brand: 'Visa', product: 'Cierzo Débito (Visa)', issuer: 'Banco Cierzo', own: true, sit: 'reemision', n: 214, ops: 690 },
    { k: 'B', bin: '454812', brand: 'Visa', product: 'Cierzo Débito (Visa)', issuer: 'Banco Cierzo', own: true, sit: 'fraude', n: 16, ops: 49 },
    { k: 'C', bin: '454812', brand: 'Visa', product: 'Cierzo Débito (Visa)', issuer: 'Banco Cierzo', own: true, sit: 'cancelada', n: 19, ops: 52 },
    { k: 'D', bin: '454812', brand: 'Visa', product: 'Cierzo Débito (Visa)', issuer: 'Banco Cierzo', own: true, sit: 'activa', n: 549, ops: 1640 },
    { k: 'E', bin: '522174', brand: 'Mastercard', product: 'Cierzo Crédito (Mastercard)', issuer: 'Banco Cierzo', own: true, sit: 'fraude', n: 8, ops: 27 },
    { k: 'F', bin: '522174', brand: 'Mastercard', product: 'Cierzo Crédito (Mastercard)', issuer: 'Banco Cierzo', own: true, sit: 'cancelada', n: 12, ops: 35 },
    { k: 'G', bin: '522174', brand: 'Mastercard', product: 'Cierzo Crédito (Mastercard)', issuer: 'Banco Cierzo', own: true, sit: 'activa', n: 289, ops: 825 },
    { k: 'H', bin: null, brand: 'Visa', product: 'Visa de otro emisor', issuer: null, own: false, sit: 'red', n: 121, ops: 372 },
    { k: 'I', bin: null, brand: 'Mastercard', product: 'Mastercard de otro emisor', issuer: null, own: false, sit: 'red', n: 56, ops: 154 }
  ];
  const SIT = {
    reemision: { label: 'En reemisión por la alarma de hoy', chip: { status: 'info', label: 'En reemisión' }, action: 'Ninguna: bloqueada y en reemisión desde las 06:10' },
    fraude: { label: 'Bloqueada antes por fraude', chip: { status: 'neutral', label: 'Bloqueada (fraude)' }, action: 'Ninguna: ya bloqueada y reemitida' },
    cancelada: { label: 'Cancelada o caducada', chip: { status: 'neutral', label: 'Cancelada' }, action: 'Ninguna: sin uso posible' },
    activa: { label: 'Activa', chip: { status: 'crit', label: 'Activa · expuesta' }, action: 'Bloqueo preventivo, reemisión y aviso al titular' },
    red: { label: 'De otro emisor', chip: { status: 'pending', label: 'Aviso a la marca' }, action: 'Alerta a la marca (Visa CAMS o Mastercard ADC)' }
  };
  const OTHER_ISSUERS = {
    Visa: [['Banco Atlántico Digital', '431907'], ['Caja Rural del Somontano', '459210'], ['Banco Mediterráneo Unido', '476103'], ['Neobanco Europa (Lituania)', '426684'], ['Banca Alpina (Italia)', '453987'], ['Banco Ribera del Duero', '491742']],
    Mastercard: [['Banco Atlántico Digital', '535412'], ['Financiera Cántabra', '548803'], ['Neobanco Europa (Lituania)', '523391'], ['Banque du Midi (Francia)', '512776']]
  };

  /* Generador reproducible (las 1.284 tarjetas salen siempre iguales) */
  let seed = 260907;
  const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
  const pick = (a) => a[Math.floor(rnd() * a.length)];
  const pad = (n, w) => String(n).padStart(w, '0');
  const n0 = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const eur = (v) => `${n0(Math.floor(v))},${pad(Math.round((v % 1) * 100) % 100, 2)} €`;
  const INI = 'ABCDEGIJLMNOPRSTV';
  const DAYS = ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'];

  const cards = [];
  let clientSeq = 4180233;
  CATS.forEach((c) => {
    const opsArr = Array(c.n).fill(1);
    for (let r = c.ops - c.n; r > 0; r -= 1) opsArr[Math.floor(rnd() * c.n)] += 1;
    for (let i = 0; i < c.n; i += 1) {
      const iss = c.own ? [c.issuer, c.bin] : pick(OTHER_ISSUERS[c.brand]);
      const bin = iss[1];
      const last4 = pad(Math.floor(rnd() * 10000), 4);
      const ops = opsArr[i];
      let amount = 0;
      for (let j = 0; j < ops; j += 1) amount += 18 + rnd() * 72;
      clientSeq += 1 + Math.floor(rnd() * 37);
      const day = pick(DAYS);
      cards.push({
        cat: c.k,
        pan: `${bin.slice(0, 4)} ${bin.slice(4, 6)}•• •••• ${last4}`,
        product: c.product,
        issuer: iss[0],
        bin: `BIN ${bin}`,
        holder: c.own ? `${pick(INI)}. ${pick(INI)}. ${pick(INI)}.` : 'Titular de otro emisor',
        client: c.own ? `Cliente ${clientSeq}` : 'No es cliente',
        ops,
        last: `Última: ${day}/09 ${pad(6 + Math.floor(rnd() * 16), 2)}:${pad(Math.floor(rnd() * 60), 2)}`,
        amount: eur(amount),
        state: SIT[c.sit].chip,
        action: SIT[c.sit].action,
        own: c.own,
        sit: c.sit
      });
    }
  });
  /* 37 clientes tienen débito y crédito activos: 838 tarjetas activas → 801 titulares */
  const actD = cards.filter((x) => x.cat === 'D');
  cards.filter((x) => x.cat === 'G').slice(0, 37).forEach((x, i) => { x.client = actD[i * 13].client; x.holder = actD[i * 13].holder; });

  const sample = [];
  CATS.forEach((c) => { const list = cards.filter((x) => x.cat === c.k); sample.push(...list.slice(0, c.sit === 'activa' ? 12 : c.n > 100 ? 8 : 4)); });

  const countBy = (pred) => cards.filter(pred).length;
  const opsBy = (pred) => cards.filter(pred).reduce((s, x) => s + x.ops, 0);

  /* ---------------------------------------------------------------- Avisos */

  const SIG = 'Atentamente,\nPrevención del Fraude · Banco Cierzo\nCentro de Operaciones · Madrid';
  const items = [
    {
      id: 'titulares', label: 'Titulares de tarjetas activas', icon: 'users', notify: true,
      channel: 'SMS + notificación en la app + correo',
      meta: ['801 clientes · 838 tarjetas', '774 con app activa · 27 solo SMS', 'Aviso en español'],
      body: 'Bloqueo preventivo y reemisión sin coste de 549 Cierzo Débito (BIN 454812) y 289 Cierzo Crédito (BIN 522174). 37 clientes tienen las dos tarjetas: reciben un único aviso.',
      refs: 'BIN 454812 · BIN 522174', qtyText: '838 tarjetas', action: 'Aviso de bloqueo y reemisión (PSD2)',
      notice: {
        lang: 'Español',
        headers: { From: 'Banco Cierzo · Seguridad', To: '801 titulares (Salesforce FSC · campaña de servicio)', Subject: '[SIMULACRO] Hemos sustituido tu tarjeta por seguridad' },
        subject: '[SIMULACRO] Hemos sustituido tu tarjeta por seguridad',
        body: [
          'SMS (157 caracteres):\n[SIMULACRO] Banco Cierzo: por seguridad hemos bloqueado tu tarjeta ****{últimos 4} y te enviamos una nueva gratis. Nunca te pediremos claves por SMS ni teléfono.',
          'Notificación en la app:\nTu tarjeta terminada en {últimos 4} se usó en un comercio donde se ha detectado un riesgo de copia. La hemos bloqueado y la nueva llegará en 3–5 días hábiles. Puedes seguir pagando con el móvil desde hoy con la tarjeta virtual.',
          'Correo:\nHola, {nombre}:\n\nTu tarjeta {producto} terminada en {últimos 4} se utilizó entre el 10 y el 22 de septiembre en un comercio en el que se ha detectado un riesgo de copia de datos. Por precaución, la hemos bloqueado y te enviamos una nueva sin coste, con un número distinto.\n\nQué tienes que hacer: nada. Si ves en tus movimientos algún cargo que no reconoces, avísanos desde la app (Tarjetas › No reconozco un cargo) y lo revisaremos. Recuerda que Banco Cierzo nunca te pedirá claves, códigos ni el PIN por teléfono, SMS o correo.',
          'Motivo: simulacro de punto común de compromiso (PR-TAR-007). En un caso real se informa al usuario sin demora (PSD2) y se indican las medidas para mitigar el riesgo.',
          'Un saludo,\nBanco Cierzo'
        ].join('\n\n'),
        highlights: ['22 de septiembre']
      }
    },
    {
      id: 'avisados', label: 'Clientes avisados por la alarma de hoy', icon: 'user-check', notify: false, chip: 'Aviso complementario',
      channel: 'Notificación en la app',
      meta: ['209 clientes · 214 tarjetas', 'Alarma del BIN 454812 · 05:50', 'Aviso en español'],
      body: 'Sus tarjetas ya están bloqueadas y en reemisión desde las 06:10. Se les explica el origen (punto común de compromiso) sin duplicar el aviso de bloqueo.',
      refs: 'BIN 454812', qtyText: '214 tarjetas', action: 'Aviso complementario en la app',
      notice: {
        lang: 'Español',
        headers: { From: 'Banco Cierzo · Seguridad', To: '209 clientes (notificación en la app)', Subject: '[SIMULACRO] Más información sobre el cambio de tu tarjeta' },
        subject: '[SIMULACRO] Más información sobre el cambio de tu tarjeta',
        body: 'Esta mañana te avisamos de que habíamos bloqueado tu tarjeta Cierzo Débito terminada en {últimos 4}. Hemos identificado el origen: se usó entre el 10 y el 22 de septiembre en un comercio con riesgo de copia de datos. No tienes que hacer nada más: la nueva tarjeta ya está en camino y los cargos no reconocidos se están revisando.\n\nMotivo: simulacro de punto común de compromiso. Mensaje de ejemplo.',
        highlights: []
      }
    },
    {
      id: 'visa', label: 'Visa Europe · Compromised Account Management System (CAMS)', icon: 'globe', notify: true,
      channel: 'Visa Online (CAMS) + correo del gestor de riesgos',
      meta: ['121 tarjetas de 6 emisores', 'Adquirente: Banco Cierzo', 'Aviso en inglés'],
      body: 'Como adquirente del comercio, Banco Cierzo comunica a Visa las cuentas expuestas de otros emisores para que cada emisor decida el bloqueo; el PFI se designa en 10 días hábiles.',
      refs: `${MERCHANT} · TPV 3`, qtyText: '121 tarjetas', action: 'Alerta CAMS con el fichero cifrado de PAN',
      notice: {
        lang: 'Inglés',
        headers: { From: 'Banco Cierzo · Acquiring Risk', To: 'Visa Europe · Risk Management (CAMS)', Subject: `[MOCK] Account compromise event · merchant ${MERCHANT} · 121 Visa accounts` },
        subject: `[MOCK] Account compromise event · merchant ${MERCHANT} · 121 Visa accounts`,
        body: [
          'Dear Visa Risk Management team,',
          `Banco Cierzo, as acquirer, reports a suspected account data compromise at the following merchant:\nMerchant: Gasolinera Ronda Norte (MCC 5541, service stations) · MID ${MERCHANT}\nTerminal: TID 00000003 (POS 3, card reader suspected of tampering)\nExposure window: 10/09/2026 – 22/09/2026\nCommon point of purchase case: ${CODE}`,
          'Accounts at risk issued by other Visa issuers: 121 (6 issuers). The PAN list is uploaded to CAMS as an encrypted file; Banco Cierzo-issued accounts (798 Visa) are being handled internally.',
          'The terminal will be removed from service today and logs preserved for the PCI Forensic Investigator (PFI). We will confirm the PFI engagement within 10 business days.',
          'Reason: mock compromise exercise (PR-TAR-007). In a real event this message includes the incident reference and the PFI contact.',
          'Kind regards,\nAcquiring Risk · Banco Cierzo'
        ].join('\n\n'),
        highlights: [CODE, MERCHANT]
      }
    },
    {
      id: 'mastercard', label: 'Mastercard · Account Data Compromise (ADC)', icon: 'globe', notify: true,
      channel: 'Mastercard Connect (Safety Net / ADC) + correo',
      meta: ['56 tarjetas de 3 emisores', 'Adquirente: Banco Cierzo', 'Aviso en inglés'],
      body: 'Notificación del evento ADC con la ventana de exposición y el fichero cifrado de PAN; las 309 Cierzo Crédito (BIN 522174) se gestionan internamente.',
      refs: `${MERCHANT} · TPV 3`, qtyText: '56 tarjetas', action: 'Notificación ADC con el fichero cifrado de PAN',
      notice: {
        lang: 'Inglés',
        headers: { From: 'Banco Cierzo · Acquiring Risk', To: 'Mastercard · Account Data Compromise team', Subject: `[MOCK] ADC event notification · MID ${MERCHANT} · 56 accounts` },
        subject: `[MOCK] ADC event notification · MID ${MERCHANT} · 56 accounts`,
        body: [
          'Dear Mastercard ADC team,',
          `We notify a suspected account data compromise event at merchant Gasolinera Ronda Norte (MID ${MERCHANT}, terminal 00000003) during 10/09/2026 – 22/09/2026 (case ${CODE}).`,
          'At-risk accounts issued by other Mastercard issuers: 56 (3 issuers), uploaded via Mastercard Connect as an encrypted file. Banco Cierzo-issued accounts (309) are being blocked and reissued internally.',
          'Reason: mock compromise exercise (PR-TAR-007). In a real event this message includes the incident reference and the forensic investigation plan.',
          'Kind regards,\nAcquiring Risk · Banco Cierzo'
        ].join('\n\n'),
        highlights: [CODE, MERCHANT]
      }
    },
    {
      id: 'comercio', label: 'Gasolinera Ronda Norte (comercio)', icon: 'building', notify: true,
      channel: 'Carta certificada + llamada del gestor del comercio',
      meta: [`Comercio ${MERCHANT} · Zaragoza`, 'Cliente de adquirencia', 'Aviso en español'],
      body: 'Requerimiento PCI DSS: retirar del servicio el TPV 3, no manipularlo, conservar las grabaciones de la zona de caja del 10 al 22/09 y colaborar con la investigación forense (PFI).',
      refs: 'TPV 3 · terminal 00000003', qtyText: '1 terminal', action: 'Requerimiento PCI DSS y retirada del TPV 3',
      notice: {
        lang: 'Español',
        headers: { From: 'Banco Cierzo · Adquirencia', To: 'Gerencia · Gasolinera Ronda Norte', Subject: `[SIMULACRO] Requerimiento de seguridad · comercio ${MERCHANT} · TPV 3` },
        subject: `[SIMULACRO] Requerimiento de seguridad · comercio ${MERCHANT} · TPV 3`,
        body: [
          'Estimado cliente:',
          `Hemos detectado que varias tarjetas usadas en su terminal TPV 3 (terminal 00000003) entre el 10 y el 22/09/2026 se han utilizado después de forma fraudulenta (expediente ${CODE}). Para proteger a sus clientes y a su negocio, les pedimos:`,
          '1. Retirar hoy del servicio el TPV 3 y no manipularlo ni desconectarlo de la corriente hasta que lo recoja el técnico de Redsys, que les instalará uno nuevo.\n2. Conservar las grabaciones de vídeo de la zona de caja del 10 al 22/09.\n3. Facilitar el acceso al investigador forense PCI (PFI) que designaremos en los próximos días.',
          'Su gestor les llamará hoy para coordinar la sustitución sin coste. Los demás terminales siguen operativos.',
          'Motivo: simulacro de punto común de compromiso. En un caso real, aquí se indican la referencia del incidente y las obligaciones del contrato de adquirencia.',
          'Atentamente,\nAdquirencia · Banco Cierzo'
        ].join('\n\n'),
        highlights: [CODE, 'TPV 3']
      }
    },
    {
      id: 'redsys', label: 'Redsys (procesador)', icon: 'server', notify: true,
      channel: 'ServiceNow (ticket al procesador) + correo',
      meta: ['Terminal 00000003', 'Baja y sustitución hoy', 'Aviso en español'],
      body: 'Baja inmediata del terminal, sustitución por uno nuevo, preservación de los registros de transacciones y del firmware para el PFI y extracción de las 3.912 operaciones de la ventana.',
      refs: 'Terminal 00000003', qtyText: '3.912 operaciones', action: 'Baja del terminal y preservación de evidencias',
      notice: {
        lang: 'Español',
        headers: { From: 'Banco Cierzo · Medios de Pago', To: 'Redsys · Soporte a entidades', Subject: `[SIMULACRO] Baja urgente del terminal 00000003 · comercio ${MERCHANT}` },
        subject: `[SIMULACRO] Baja urgente del terminal 00000003 · comercio ${MERCHANT}`,
        body: [
          'Buenos días:',
          `Solicitamos la baja urgente del terminal 00000003 del comercio ${MERCHANT} (Gasolinera Ronda Norte) por sospecha de manipulación del lector (expediente ${CODE}), su sustitución hoy y la preservación del equipo, el firmware y los registros de operaciones del 01/09 al 29/09 para la investigación forense PCI.`,
          'Les pedimos también la extracción de las 3.912 operaciones del terminal entre el 10 y el 22/09 en el formato habitual para el cruce con las marcas.',
          'Motivo: simulacro de punto común de compromiso. Mensaje de ejemplo.',
          'Un saludo,\nMedios de Pago · Banco Cierzo'
        ].join('\n\n'),
        highlights: [CODE, '00000003']
      }
    },
    {
      id: 'bde', label: 'Banco de España · notificación DORA', icon: 'shield', notify: true,
      channel: 'Plataforma de notificación de incidentes del Banco de España',
      meta: ['Incidente grave relacionado con las TIC (si se clasifica)', 'Notificación inicial en 4 h', 'Aviso en español'],
      body: 'Borrador de la notificación inicial con la plantilla de las normas técnicas de DORA: clientes y tarjetas afectados, impacto económico estimado (41.230 € en operaciones sospechosas) y medidas adoptadas. Riesgo tecnológico valida la clasificación.',
      refs: 'INC-2026-0412', qtyText: '1.107 tarjetas propias', action: 'Notificación inicial DORA (si se clasifica como grave)',
      notice: {
        lang: 'Español',
        headers: { From: 'Banco Cierzo · Riesgo tecnológico (DORA)', To: 'Banco de España · notificación de incidentes', Subject: '[SIMULACRO] Notificación inicial de incidente · INC-2026-0412' },
        subject: '[SIMULACRO] Notificación inicial de incidente · INC-2026-0412',
        body: [
          'Notificación inicial (borrador · campos principales de la plantilla):',
          `Referencia interna: INC-2026-0412 · expediente ${CODE}\nDetección: 29/09/2026 05:50 (alarma de fraude del BIN 454812) · clasificación: pendiente de validar por Riesgo tecnológico\nDescripción: punto común de compromiso en un terminal de un comercio adquirido por la entidad; exposición de datos de tarjeta (PAN y banda) de 1.107 tarjetas propias y 177 de otros emisores.\nImpacto: 186 operaciones sospechosas por 41.230 € en 152 tarjetas; sin afectación a sistemas internos de la entidad.\nMedidas: bloqueo preventivo y reemisión de 838 tarjetas, regla preventiva en el BIN, baja del terminal y aviso a las marcas.`,
          'Plazos de seguimiento: informe intermedio en 72 h e informe final en un mes desde la notificación inicial.',
          'Motivo: simulacro. La clasificación como incidente grave y el envío los decide Riesgo tecnológico.',
          'Riesgo tecnológico (DORA) · Banco Cierzo'
        ].join('\n\n'),
        highlights: [CODE, 'INC-2026-0412']
      }
    },
    {
      id: 'aepd', label: 'Agencia Española de Protección de Datos', icon: 'lock', notify: false, chip: 'Evaluar con el DPD',
      channel: 'Sede electrónica de la AEPD (si procede)',
      meta: ['Brecha de datos personales', 'Plazo: 72 h (RGPD art. 33)', 'Aviso en español'],
      body: 'El delegado de protección de datos evalúa si la exposición de datos de tarjeta de clientes es notificable; Agentic Platform deja preparado el borrador con el número de interesados y las medidas.',
      refs: 'INC-2026-0412', qtyText: '801 interesados', action: 'Evaluación del DPD y, si procede, notificación',
      notice: {
        lang: 'Español',
        headers: { From: 'Banco Cierzo · Delegado de Protección de Datos', To: 'AEPD · notificación de brechas', Subject: '[SIMULACRO] Notificación de brecha de datos personales · INC-2026-0412' },
        subject: '[SIMULACRO] Notificación de brecha de datos personales · INC-2026-0412',
        body: 'Borrador (campos principales del formulario):\nNaturaleza: confidencialidad · datos de tarjeta capturados en un terminal de un comercio tercero.\nCategorías de interesados: clientes titulares de tarjeta · 801 personas (838 tarjetas activas) y 209 ya avisados.\nConsecuencias probables: uso fraudulento de las tarjetas; mitigado con bloqueo y reemisión.\nMedidas: bloqueo preventivo, reemisión sin coste, aviso a los interesados y regla preventiva de fraude.\n\nMotivo: simulacro. La decisión de notificar la toma el DPD.',
        highlights: ['INC-2026-0412']
      }
    }
  ];

  /* ---------------------------------------------------------------- Genealogía */

  const nodes = [
    { id: 'X', stage: 'exp', kicker: 'Expediente', title: CODE, mono: true, lot: CODE, sub: 'Punto común de compromiso', meta: 'Falcon Fraud · 152 tarjetas con fraude', reveal: 0 },
    { id: 'COM', stage: 'com', kicker: 'Comercio', title: 'Gasolinera Ronda Norte', sub: `Comercio ${MERCHANT} · Zaragoza`, meta: 'MCC 5541 · adquirente Banco Cierzo', reveal: 1 },
    { id: 'TPV', stage: 'tpv', kicker: 'Terminal', title: 'TPV 3', sub: 'Terminal 00000003 · Redsys', meta: 'Lector sospechoso de manipulación', alert: 'Sigue en servicio', reveal: 1 },
    { id: 'VEN', stage: 'ven', kicker: 'Ventana', title: '10/09 → 22/09', sub: '3.912 operaciones · 3.844 liquidadas', meta: '1.284 tarjetas distintas', reveal: 2 },
    { id: 'T1', stage: 'tar', kicker: 'Tarjetas', title: '798 Cierzo Débito', sub: 'BIN 454812 · Visa', meta: `${n0(opsBy((x) => x.bin === 'BIN 454812'))} operaciones`, reveal: 3 },
    { id: 'T2', stage: 'tar', kicker: 'Tarjetas', title: '309 Cierzo Crédito', sub: 'BIN 522174 · Mastercard', meta: `${n0(opsBy((x) => x.bin === 'BIN 522174'))} operaciones`, reveal: 3 },
    { id: 'T3', stage: 'tar', kicker: 'Tarjetas', title: '121 Visa', sub: 'Otros 6 emisores', meta: '372 operaciones', reveal: 3 },
    { id: 'T4', stage: 'tar', kicker: 'Tarjetas', title: '56 Mastercard', sub: 'Otros 4 emisores', meta: '154 operaciones', reveal: 3 },
    { id: 'S1', stage: 'sit', kicker: 'Situación', title: '838 activas', sub: '549 débito · 289 crédito', meta: 'Bloqueo preventivo y reemisión', alert: 'Bloquear hoy', alertTone: true, tone: 'planned', reveal: 4 },
    { id: 'S2', stage: 'sit', kicker: 'Situación', title: '214 en reemisión', sub: 'Alarma del BIN 454812', meta: 'Bloqueadas a las 06:10', tone: 'shipped', reveal: 4 },
    { id: 'S3', stage: 'sit', kicker: 'Situación', title: '55 fuera de uso', sub: '24 bloqueadas por fraude', meta: '31 canceladas o caducadas', tone: 'stock', reveal: 4 },
    { id: 'S4', stage: 'sit', kicker: 'Situación', title: '177 de otros emisores', sub: 'Decide cada emisor', meta: 'Alerta a la marca', tone: 'stock', reveal: 4 },
    { id: 'D1', stage: 'dst', kicker: 'Destinatario', title: 'Titulares', sub: '801 clientes', meta: 'SMS, app y correo', tone: 'customer', reveal: 5 },
    { id: 'D2', stage: 'dst', kicker: 'Destinatario', title: 'Clientes ya avisados', sub: '209 clientes', meta: 'Aviso complementario', tone: 'customer', reveal: 5 },
    { id: 'D3', stage: 'dst', kicker: 'Destinatario', title: 'Visa · CAMS', sub: '121 cuentas', meta: 'Fichero cifrado', tone: 'customer', reveal: 5 },
    { id: 'D4', stage: 'dst', kicker: 'Destinatario', title: 'Mastercard · ADC', sub: '56 cuentas', meta: 'Fichero cifrado', tone: 'customer', reveal: 5 },
    { id: 'D5', stage: 'dst', kicker: 'Destinatario', title: 'Comercio y Redsys', sub: 'Baja del TPV 3', meta: 'Requerimiento PCI DSS', tone: 'customer', reveal: 5 },
    { id: 'D6', stage: 'dst', kicker: 'Destinatario', title: 'Banco de España y AEPD', sub: 'DORA · RGPD', meta: 'Si se clasifica o procede', tone: 'customer', reveal: 5 }
  ];
  const edges = [['X', 'COM'], ['COM', 'TPV'], ['TPV', 'VEN'], ['VEN', 'T1'], ['VEN', 'T2'], ['VEN', 'T3'], ['VEN', 'T4'],
    ['T1', 'S1'], ['T2', 'S1'], ['T1', 'S2'], ['T1', 'S3'], ['T2', 'S3'], ['T3', 'S4'], ['T4', 'S4'],
    ['S1', 'D1'], ['S2', 'D2'], ['S4', 'D3'], ['S4', 'D4'], ['TPV', 'D5'], ['S1', 'D6'], ['S2', 'D6']];

  /* ---------------------------------------------------------------- Tablas */

  const locRow = (ref, k, where, whereSub, action, tone) => {
    const c = CATS.find((x) => x.k === k);
    return { ref, where, whereSub, n: c.n, qty: c.ops, action, tone };
  };
  const locRows = [
    locRow('BIN 454812', 'D', 'Cierzo Débito · activas', 'Expuestas y operativas', 'Bloqueo preventivo, reemisión y aviso al titular', 'crit'),
    locRow('BIN 522174', 'G', 'Cierzo Crédito · activas', 'Expuestas y operativas · 37 titulares con débito y crédito', 'Bloqueo preventivo, reemisión y aviso al titular', 'crit'),
    locRow('BIN 454812', 'A', 'Cierzo Débito · en reemisión', 'Bloqueadas hoy a las 06:10 por la alarma del BIN', 'Aviso complementario en la app', 'warn'),
    locRow('BIN 454812', 'B', 'Cierzo Débito · bloqueadas por fraude', 'Antes del simulacro', 'Ninguna', ''),
    locRow('BIN 522174', 'E', 'Cierzo Crédito · bloqueadas por fraude', 'Antes del simulacro', 'Ninguna', ''),
    locRow('BIN 454812', 'C', 'Cierzo Débito · canceladas o caducadas', 'Sin uso posible', 'Ninguna', ''),
    locRow('BIN 522174', 'F', 'Cierzo Crédito · canceladas o caducadas', 'Sin uso posible', 'Ninguna', ''),
    locRow('Visa', 'H', 'Otros emisores Visa', '6 emisores (España, Lituania e Italia)', 'Alerta CAMS a Visa', 'warn'),
    locRow('Mastercard', 'I', 'Otros emisores Mastercard', '4 emisores (España, Lituania y Francia)', 'Notificación ADC a Mastercard', 'warn')
  ];

  const cardCols = [
    { label: 'Tarjeta', key: 'pan', mono: true, sub: 'product' },
    { label: 'Emisor', key: 'issuer', sub: 'bin' },
    { label: 'Titular', key: 'holder', sub: 'client' },
    { label: 'Operaciones', key: 'ops', num: true, sub: 'last' },
    { label: 'Importe en el TPV 3', key: 'amount', num: true },
    { label: 'Situación', key: 'state', chip: true },
    { label: 'Acción en un caso real', key: 'action' }
  ];

  const issuerRows = [
    { iss: 'Banco Cierzo · Cierzo Débito', bin: 'BIN 454812 · Visa', cards: 798, ops: opsBy((x) => x.bin === 'BIN 454812'), active: countBy((x) => x.cat === 'D'), done: 249, action: '549 a bloquear y reemitir' },
    { iss: 'Banco Cierzo · Cierzo Crédito', bin: 'BIN 522174 · Mastercard', cards: 309, ops: opsBy((x) => x.bin === 'BIN 522174'), active: countBy((x) => x.cat === 'G'), done: 20, action: '289 a bloquear y reemitir' },
    { iss: 'Otros emisores Visa', bin: '6 emisores', cards: 121, ops: 372, active: 121, done: 0, action: 'Alerta CAMS' },
    { iss: 'Otros emisores Mastercard', bin: '4 emisores', cards: 56, ops: 154, active: 56, done: 0, action: 'Notificación ADC' }
  ].map((r) => Object.assign(r, { diff: 0, located: '100,0 %' }));

  const scope = {
    headline: `TPV 3 de Gasolinera Ronda Norte (comercio ${MERCHANT}) · ventana del 10 al 22/09/2026 · 1.284 tarjetas`,
    previewSide: '1 terminal · 1.284 tarjetas',
    startNode: 'X',
    stages: [
      { id: 'exp', label: 'Expediente', icon: 'clipboard' },
      { id: 'com', label: 'Comercio', icon: 'building' },
      { id: 'tpv', label: 'Terminal', icon: 'barcode' },
      { id: 'ven', label: 'Ventana', icon: 'calendar' },
      { id: 'tar', label: 'Tarjetas', icon: 'key', count: '1.284' },
      { id: 'sit', label: 'Situación', icon: 'shield' },
      { id: 'dst', label: 'Avisos', icon: 'mail' }
    ],
    nodes,
    edges,
    systems: ['Falcon Fraud', 'Redsys', 'Core bancario T24', 'Salesforce FSC'],
    genSub: '1 terminal · 3.912 operaciones · 1.284 tarjetas · 8 destinatarios',
    steps: [
      { agent: 'trace', system: 'Falcon Fraud', action: 'Localiza el punto de partida', result: 'Expediente CPP-2609-07 · análisis de punto común: 152 tarjetas con fraude confirmado comparten el TPV 3 de Gasolinera Ronda Norte', ms: 210, reveal: 0, mark: 'Punto de partida localizado' },
      { agent: 'trace', system: 'Redsys', action: 'Hacia atrás: comercio, terminal y ventana de compromiso', result: `Comercio ${MERCHANT} (MCC 5541) · terminal 00000003 · primera compra común el 10/09, última el 22/09 · el terminal sigue en servicio`, ms: 480, tone: 'warn', reveal: 1, mark: 'Comercio y terminal identificados' },
      { agent: 'trace', system: 'Redsys', action: 'Operaciones del terminal en la ventana', result: '3.912 operaciones (3.844 liquidadas) · 1.284 tarjetas distintas', ms: 690, reveal: 2, mark: 'Operaciones de la ventana extraídas' },
      { agent: 'trace', system: 'Core bancario T24', action: 'Emisor de cada tarjeta por BIN', result: '1.107 de Banco Cierzo (798 BIN 454812 y 309 BIN 522174) · 177 de otros emisores (121 Visa y 56 Mastercard)', ms: 520, reveal: 3 },
      { agent: 'trace', system: 'Core bancario T24', action: 'Situación de las tarjetas de Banco Cierzo', result: '838 activas · 214 ya en reemisión por la alarma de hoy · 24 bloqueadas por fraude · 31 canceladas o caducadas', ms: 640, tone: 'warn', reveal: 4, mark: 'Tarjetas clasificadas por situación' },
      { agent: 'trace', system: 'Salesforce FSC', action: 'Titulares, canal preferente y datos de contacto verificados', result: '801 clientes con 838 tarjetas activas · 774 con app activa · 801 con móvil verificado · 37 con débito y crédito', ms: 560, reveal: 5, mark: 'Titulares y destinatarios identificados' },
      { agent: 'trace', system: 'Falcon Fraud', action: 'Fraude posterior en las tarjetas del punto común', result: '186 operaciones sospechosas por 41.230 € en 152 tarjetas, todas del BIN 454812 (alarma de las 05:50)', ms: 380, tone: 'warn' },
      { agent: 'bal', system: 'Redsys', action: 'Depuración de operaciones de la ventana', result: '68 excluidas (46 anuladas el mismo día y 22 preautorizaciones sin completar) · 3.844 liquidadas', ms: 330 },
      { agent: 'bal', system: 'Agentic Platform', action: 'Cuadre de tarjetas por emisor y situación', result: 'Conciliado 100,0 % · 0 tarjetas sin asignar · 1.284 de 1.284 tarjetas clasificadas', ms: 90, tone: 'ok', mark: 'Cuadre de tarjetas cerrado' },
      { agent: 'rec', system: 'GRC Archer', action: 'Abre el incidente y la evaluación de clasificación DORA', result: 'INC-2026-0412 en borrador · clasificación pendiente de validar por Riesgo tecnológico', ms: 410 },
      { agent: 'rec', system: 'Outlook', action: 'Prepara los avisos sin enviar', result: '8 borradores: titulares (SMS, app y correo), clientes ya avisados, Visa, Mastercard, comercio, Redsys, Banco de España y AEPD', ms: 780, mark: 'Registro y avisos preparados' }
    ],
    located: { label: 'Tarjetas clasificadas', value: '1.284 de 1.284', sub: '838 a bloquear y reemitir · 177 de otros emisores', icon: 'key', short: '1.284 de 1.284 tarjetas clasificadas por emisor y situación (838 de Banco Cierzo a bloquear y reemitir)' },
    kpiNotify: { label: 'Destinatarios a notificar', value: 6, sub: '801 titulares · 2 marcas · comercio · Redsys · Banco de España' },
    balance: {
      title: 'Cuadre de tarjetas y operaciones',
      kpiLabel: 'Cuadre de tarjetas conciliado',
      sub: 'Tarjetas y operaciones del punto común · operaciones en Redsys, emisor y situación en T24',
      head: 'Tarjetas del punto común',
      headSide: '3 flujos · 1.284 tarjetas · 3.912 operaciones',
      labels: { in: 'Tarjetas en el punto común', losses: 'Excluidas', out: 'De Banco Cierzo', stock: 'De otros emisores' },
      detailTitle: 'Detalle por flujo',
      criterio: 'Criterio: cada tarjeta se asigna a un único emisor y a una única situación; la diferencia sin asignar se muestra tal cual, no se reparte. Cada exclusión cita el sistema que la registra.',
      reportText: 'Operaciones del terminal en Redsys; emisor por BIN y situación de cada tarjeta propia en el core bancario T24; fraude posterior en Falcon Fraud; titulares y canales en Salesforce FSC.',
      flows: [
        {
          key: 'TAR', seg: 'Tarjetas', main: true, unit: 'tarjetas', colLabel: 'Tarjetas',
          title: 'Tarjetas usadas en el TPV 3 → emisor',
          inLabel: 'Tarjetas distintas · TPV 3', inSub: `10–22/09/2026 · comercio ${MERCHANT} · terminal 00000003`, inStage: 'Redsys', inQty: 1284,
          phases: [],
          outs: [
            { label: 'Banco Cierzo · Cierzo Débito', sub: 'BIN 454812 · Visa', stage: 'T24', qty: 798 },
            { label: 'Banco Cierzo · Cierzo Crédito', sub: 'BIN 522174 · Mastercard', stage: 'T24', qty: 309 },
            { label: 'Otros emisores Visa', sub: '6 emisores · alerta CAMS', stage: 'Redsys', qty: 121, kind: 'stock' },
            { label: 'Otros emisores Mastercard', sub: '4 emisores · notificación ADC', stage: 'Redsys', qty: 56, kind: 'stock' }
          ]
        },
        {
          key: 'CIE', seg: 'Banco Cierzo', unit: 'tarjetas', colLabel: 'Tarjetas',
          title: 'Tarjetas de Banco Cierzo → situación',
          inLabel: 'Tarjetas propias', inSub: '798 débito y 309 crédito', inStage: 'T24', inQty: 1107,
          phases: [{ title: 'Ya neutralizadas antes del simulacro', stages: [
            ['Falcon', 'En reemisión por la alarma del BIN 454812 (hoy 06:10)', 214],
            ['T24', 'Bloqueadas por fraude antes del simulacro', 24],
            ['T24', 'Canceladas o caducadas', 31]
          ] }],
          outs: [
            { label: 'Activas · Cierzo Débito', sub: 'BIN 454812 · bloquear y reemitir', stage: 'T24', qty: 549 },
            { label: 'Activas · Cierzo Crédito', sub: 'BIN 522174 · bloquear y reemitir', stage: 'T24', qty: 289 }
          ]
        },
        {
          key: 'OPS', seg: 'Operaciones', unit: 'operaciones', colLabel: 'Operaciones',
          title: 'Operaciones del TPV 3 en la ventana → emisor',
          inLabel: 'Operaciones capturadas', inSub: '10–22/09/2026 · terminal 00000003', inStage: 'Redsys', inQty: 3912,
          phases: [{ title: 'Depuración de la extracción', stages: [
            ['Redsys', 'Anuladas el mismo día (sin liquidar)', 46],
            ['Redsys', 'Preautorizaciones sin completar', 22]
          ] }],
          outs: [
            { label: 'Liquidadas con tarjeta de Banco Cierzo', sub: '1.107 tarjetas', stage: 'T24', qty: 3318 },
            { label: 'Liquidadas con Visa de otro emisor', sub: '121 tarjetas', stage: 'Redsys', qty: 372 },
            { label: 'Liquidadas con Mastercard de otro emisor', sub: '56 tarjetas', stage: 'Redsys', qty: 154 }
          ]
        }
      ],
      product: {
        title: 'Tarjetas por emisor',
        side: '1.284 tarjetas · 3.844 operaciones liquidadas',
        cols: [
          { label: 'Emisor', key: 'iss', sub: 'bin' },
          { label: 'Tarjetas', key: 'cards', num: true },
          { label: 'Operaciones', key: 'ops', num: true },
          { label: 'Expuestas', key: 'active', num: true, sub: 'action' },
          { label: 'Diferencia', key: 'diff', num: true },
          { label: 'Clasificado', key: 'located', num: true, ok: true }
        ],
        rows: issuerRows
      }
    },
    units: {
      title: 'Tarjetas del punto común',
      sub: '1.284 tarjetas · muestra representativa en pantalla · CSV con todas · PAN enmascarado (PCI DSS)',
      icon: 'key',
      csvLabel: 'Tarjetas (CSV)',
      csvName: 'tarjetas',
      byLoc: { label: 'Por situación', refLabel: 'BIN o marca', whereLabel: 'Situación', nLabel: 'Tarjetas', qtyLabel: 'Operaciones', actionLabel: 'Acción en un caso real', rows: locRows },
      list: { label: 'Tarjetas', count: 1284, note: `Muestra de ${sample.length} de 1.284 tarjetas (de cada situación); el CSV incluye las 1.284 con el PAN enmascarado.`, cols: cardCols, rows: sample },
      csvRows: cards
    },
    customers: {
      title: 'Clientes y entidades a notificar',
      sub: '6 destinatarios con aviso · 2 a evaluar · 2 acciones con plazo hoy',
      items,
      holdsTitle: 'Acciones con plazo hoy',
      holdsIcon: 'clock',
      holds: [
        { icon: 'barcode', tone: 'crit', title: 'Dar de baja el TPV 3 en Redsys', meta: ['hoy', `terminal 00000003 · comercio ${MERCHANT}`, 'Gasolinera Ronda Norte'], body: 'En un caso real, el terminal deja de operar hoy: sigue en servicio y cada compra expone una tarjeta más. Redsys lo sustituye y preserva el equipo para el PFI.' },
        { icon: 'repeat', tone: 'warn', title: 'Incluir 838 tarjetas en el fichero de estampación de las 14:00', meta: ['hoy a las 14:00', '549 débito · 289 crédito', 'Medios de Pago'], body: 'La reemisión entra en el envío diario a la empresa de personalización; las tarjetas llegan en 3–5 días hábiles y la tarjeta virtual se activa en la app desde hoy.' }
      ]
    },
    approval: {
      titlePrefix: 'Bloqueo, reemisión y avisos del simulacro',
      scope: [
        { label: 'Titulares a avisar', value: '801 clientes · 838 tarjetas (SMS, app y correo)', status: 'pending', chip: '801' },
        { label: 'Tarjetas a bloquear y reemitir', value: '549 Cierzo Débito · 289 Cierzo Crédito', status: 'evaluate', chip: 'Sin bloqueo en simulacro' },
        { label: 'Redes', value: 'Visa CAMS · 121 cuentas · Mastercard ADC · 56 cuentas' },
        { label: 'Comercio y terminal', value: `Gasolinera Ronda Norte · baja del TPV 3 (00000003)` },
        { label: 'Supervisores', value: 'Banco de España (DORA, si se clasifica) · AEPD (si procede)' }
      ],
      effects: [
        'Outlook y Salesforce FSC: 8 avisos guardados como borrador con la marca SIMULACRO; no se envía ningún SMS, notificación ni correo',
        'Core bancario T24 y Falcon Fraud: sin cambios; en un simulacro no se bloquea ni se reemite ninguna tarjeta',
        'GRC Archer: incidente INC-2026-0412 en borrador con la evaluación DORA',
        'Registro {code} aprobado con los tiempos de cada actividad'
      ]
    },
    report: {
      objeto: 'Simulacro de punto común de compromiso con punto de partida en {label}. Se comprueba la trazabilidad hacia atrás (comercio, terminal y ventana de exposición) y hacia delante (operaciones, tarjetas, emisores, titulares y destinatarios de los avisos), con el cuadre de tarjetas y operaciones.',
      noAction: 'El ejercicio no bloquea ni reemite tarjetas y no envía avisos.',
      results: [
        '801 titulares con 838 tarjetas activas a bloquear y reemitir; 209 clientes ya avisados por la alarma de hoy recibirían un aviso complementario.',
        '177 tarjetas de otros emisores se comunicarían a Visa (CAMS, 121) y Mastercard (ADC, 56); el TPV 3 sigue en servicio y se daría de baja hoy.',
        'Notificación inicial DORA preparada para el caso de que Riesgo tecnológico clasifique el incidente como grave (4 h desde la clasificación).'
      ],
      back: {
        cols: [{ label: 'Etapa', key: 'etapa' }, { label: 'Referencia', key: 'ref', mono: true }, { label: 'Fecha', key: 'fecha' }, { label: 'Detalle', key: 'det' }],
        rows: [
          { etapa: 'Expediente', ref: CODE, fecha: '28/09/2026', det: 'Análisis de punto común en Falcon Fraud: 152 tarjetas con fraude confirmado y una compra común' },
          { etapa: 'Comercio', ref: MERCHANT, fecha: 'Alta 2019', det: 'Gasolinera Ronda Norte · Zaragoza · MCC 5541 · adquirente Banco Cierzo · PCI DSS SAQ B-IP' },
          { etapa: 'Terminal', ref: '00000003', fecha: 'Instalado 03/2024', det: 'TPV 3 · lector con chip, banda y sin contacto · sospecha de manipulación del lector' },
          { etapa: 'Ventana', ref: '10/09–22/09', fecha: '13 días', det: '3.912 operaciones capturadas · 3.844 liquidadas · 1.284 tarjetas distintas' },
          { etapa: 'Fraude posterior', ref: 'BIN 454812', fecha: '29/09/2026 02:10–05:50', det: '186 operaciones sospechosas sin tarjeta presente por 41.230 € en 152 tarjetas' }
        ]
      },
      fwd: {
        cols: [{ label: 'BIN o marca', key: 'ref', mono: true }, { label: 'Situación', key: 'where' }, { label: 'Tarjetas', key: 'n', num: true }, { label: 'Operaciones', key: 'qty', num: true }, { label: 'Acción', key: 'action' }],
        rows: locRows
      },
      conclusion: 'Conclusión: la información necesaria para actuar sobre un punto común de compromiso se obtiene completa y cuadra tarjeta a tarjeta. Acciones de mejora propuestas: automatizar la baja del terminal en Redsys desde el expediente y revisar el contacto de riesgos de las marcas.',
      note: 'Simulacro: no se ha bloqueado ni reemitido ninguna tarjeta, no se ha dado de baja el terminal y no se ha enviado ningún aviso. PAN enmascarado; datos sintéticos de demostración.'
    },
    audit: { back: `comercio ${MERCHANT} · terminal 00000003 · ventana 10–22/09`, fwd: '1.284 tarjetas · 3.844 operaciones liquidadas · 801 titulares · 177 tarjetas de otros emisores' },
    say: [
      'Lo accionable: 838 tarjetas activas se bloquearían y reemitirían hoy, y el TPV 3, que sigue en servicio, se daría de baja en Redsys.',
      'Los avisos salen por el canal de cada destinatario: SMS y app a los titulares, CAMS y ADC a las marcas, requerimiento PCI al comercio y el borrador DORA para el Banco de España. En un simulacro no se envía nada. Decide Prevención del Fraude.'
    ]
  };

  agenticPack('banca', {
    retirada: {
      title: 'Simulacro de punto común de compromiso',
      nav: 'Simulacro de trazabilidad',
      section: 'Calidad',
      desc: 'Ejercicio de trazabilidad de un punto común de compromiso: del comercio y el terminal a cada operación, tarjeta, emisor y titular, con el cuadre de tarjetas y operaciones y los avisos a clientes, marcas, comercio y supervisores, a partir de un expediente o de un comercio.',
      place: 'Centro de Operaciones · Madrid',
      approver: 'Responsable de Prevención del Fraude',
      regPrefix: 'SR-2026-',
      agents: { trace: 'Trazabilidad', bal: 'Cuadre', rec: 'Registro y avisos' },
      targetText: 'Objetivo ilustrativo: 4 h',
      todayEstimate: '4–8 h',
      timerRef: 'Objetivo demo: 4 h',
      packLabel: 'Descargar paquete del expediente',
      setup: { title: 'Punto de partida', sub: 'Un expediente de punto común de compromiso o el código de un comercio' },
      modes: {
        expediente: { label: 'Expediente', noun: 'el expediente', field: 'Código de expediente', icon: 'clipboard', format: 'CPP-2609-07', where: 'Falcon Fraud' },
        comercio: { label: 'Comercio', noun: 'el comercio', field: 'Código de comercio (FUC)', icon: 'building', format: '334512987', where: 'Redsys' }
      },
      entries: [
        { mode: 'expediente', code: CODE, scope: 'cpp', label: `Expediente ${CODE}`, option: 'Punto común · Gasolinera Ronda Norte · TPV 3' },
        { mode: 'comercio', code: MERCHANT, scope: 'cpp', label: `Comercio ${MERCHANT}`, option: 'Gasolinera Ronda Norte · Zaragoza', headline: `Gasolinera Ronda Norte · Zaragoza · MCC 5541 · expediente ${CODE} abierto sobre su TPV 3`, startNode: 'COM', startResult: `Gasolinera Ronda Norte (MCC 5541) · expediente ${CODE} abierto sobre su TPV 3 → se traza la ventana de compromiso` }
      ],
      examples: [
        { mode: 'expediente', code: CODE, label: `Expediente ${CODE}` },
        { mode: 'comercio', code: MERCHANT, label: `Comercio ${MERCHANT}` }
      ],
      reference: {
        title: 'Marco de referencia',
        sub: 'Objetivo del ejercicio; Cumplimiento y Riesgo tecnológico confirman los requisitos aplicables',
        items: [
          ['PCI DSS v4.0.1', 'Ante un punto común de compromiso, el adquirente activa su plan de respuesta, preserva las evidencias para el investigador forense (PFI) y comunica las cuentas expuestas a las marcas (Visa CAMS, Mastercard ADC).'],
          ['PSD2', 'Directiva (UE) 2015/2366 (Real Decreto-ley 19/2018): si un incidente afecta a los intereses financieros de los usuarios, se les informa sin demora con las medidas para mitigarlo.'],
          ['DORA', 'Reglamento (UE) 2022/2554: si el incidente se clasifica como grave, notificación inicial en 4 h desde la clasificación (máximo 24 h desde la detección), intermedia en 72 h y final en un mes.']
        ],
        note: 'Un simulacro no bloquea tarjetas ni envía avisos: se mide si la información se obtiene completa, cuadra y a tiempo.'
      },
      legend: { planned: 'Acción con plazo hoy', click: 'Pulsa el expediente para ver su traza completa' },
      notice: { title: 'Simulacro de punto común de compromiso', approved: 'Guardado como borrador con la marca SIMULACRO: no se envía ningún SMS, notificación ni correo.' },
      approval: { policy: 'POL-FRA-003 y PR-TAR-007 · el bloqueo preventivo y la reemisión masiva requieren la aprobación de Prevención del Fraude', approveLabel: 'Aprobar y cerrar simulacro', rejectPlaceholder: 'Por ejemplo: falta validar la clasificación DORA con Riesgo tecnológico' },
      clock: { title: 'Cronómetro frente al objetivo', sub: 'Tiempos de la simulación; no son medidas de rendimiento de los sistemas' },
      report: { subtitle: 'Registro del ejercicio de punto común de compromiso · PCI DSS · PSD2 · DORA', approvedText: 'Avisos guardados como borrador con la marca SIMULACRO; no se ha enviado ninguno ni se ha bloqueado ninguna tarjeta.' },
      compare: {
        rows: [
          { k: 'Personas implicadas', today: '4–5: Fraude, Medios de Pago, Adquirencia, Atención al Cliente y Riesgo tecnológico', agentic: '1: {approver} revisa y aprueba' },
          { k: 'Sistemas consultados', today: '6–7 abiertos a mano: Falcon, Redsys, T24, Salesforce, Archer, hojas de cálculo y correo', agentic: '6 conectores consultados por los agentes: Falcon Fraud, Redsys, T24, Salesforce FSC, GRC Archer y Outlook' },
          { k: 'Pasos', today: '15–20 consultas, cruces de PAN por BIN y ficheros para las marcas', agentic: '{steps} pasos automáticos y 1 aprobación' },
          { k: 'Cuadre', today: 'Hoja de cálculo con extracciones de Redsys y T24', agentic: 'Calculado por emisor y situación: {reconciled} conciliado' }
        ]
      },
      presenter: {
        idle: [
          'Simulacro de punto común de compromiso: la trazabilidad de la banca va del comercio a cada tarjeta y titular.',
          'Se elige el punto de partida: el expediente CPP-2609-07 o el código del comercio.',
          'Agentic Platform recorre Falcon, Redsys, T24 y Salesforce: terminal, ventana, operaciones, emisor por BIN, situación de cada tarjeta y canal de cada titular, y cuadra las 1.284 tarjetas.'
        ],
        nextIdle: 'Pulsar «Iniciar simulacro» con el expediente CPP-2609-07 (o elegir «Comercio 334512987»).',
        nextRun: 'Pulsar «Ver aviso» de los titulares o de Visa y después «Aprobar y cerrar simulacro».',
        nextDone: '«Descargar paquete del expediente»: CSV con las 1.284 tarjetas y registro imprimible. Después, «Cuestionario de cliente» (flecha derecha).'
      },
      scopes: { cpp: scope }
    }
  });
})();
