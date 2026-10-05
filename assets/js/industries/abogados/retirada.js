/*
 * Mora & Jordano · simulacro de trazabilidad: brecha de datos personales RGPD-2609-03.
 * Correo enviado por error el 28/09/2026 a las 18:47 (autocompletado de Outlook) a un destinatario externo
 * (Asesoría Morales Benalmádena) con el informe de due diligence de Promociones Guadalhorce, S.A.:
 * 3 adjuntos de iManage (1 PDF cifrado y 2 XLSX sin cifrar) y 1 enlace a la sala de datos (sin accesos) →
 * expedientes MER-2026-0233 y PRC-2025-0871 → 318 menciones, 255 personas físicas únicas → 173 con riesgo alto a
 * comunicar → notificación a la AEPD en 72 h (RGPD art. 33), comunicación a interesados (art. 34), cliente,
 * destinatario erróneo y aseguradora. Protocolo PRO-RGPD-005. Datos sintéticos de demostración (MFM).
 */
(function () {
  'use strict';

  const CODE = 'RGPD-2609-03';
  const DOCNO = 'MJ-MER-0233-0152';
  const CLIENT = 'Promociones Guadalhorce, S.A.';
  const WRONG = 'Asesoría Morales Benalmádena, S.L.';
  const DEADLINE = '02/10/2026 a las 08:05';

  /* Categorías de interesados: [clave, documento, referencia iManage, categoría, situación, personas, campos personales expuestos] */
  const CATS = [
    { k: 'A', doc: 'Anexo laboral', ref: 'MJ-MER-0233-0152 v2', product: 'Empleado · datos de salud', rel: 'emp', enc: 'Sin cifrar (XLSX)', data: 'DNI, salario, IBAN, bajas por IT', own: true, sit: 'salud', n: 17, ops: 153 },
    { k: 'B', doc: 'Anexo laboral', ref: 'MJ-MER-0233-0152 v2', product: 'Empleado · datos económicos', rel: 'emp', enc: 'Sin cifrar (XLSX)', data: 'DNI, salario, IBAN, antigüedad', own: true, sit: 'economicos', n: 125, ops: 875 },
    { k: 'C', doc: 'Anexo de litigios', ref: 'MJ-MER-0233-0157 v1', product: 'Comprador reclamante · nominativo', rel: 'comp', enc: 'Sin cifrar (XLSX)', data: 'Nombre, vivienda, procedimiento, cuantía', own: false, sit: 'litigio', n: 31, ops: 186 },
    { k: 'D', doc: 'Informe de due diligence', ref: 'MJ-MER-0233-0148 v3', product: 'Comprador reclamante · solo en el informe', rel: 'comp', enc: 'Cifrado AES-256', data: 'Nombre, vivienda, cuantía', own: false, sit: 'cifrado', n: 27, ops: 108 },
    { k: 'E', doc: 'Informe de due diligence', ref: 'MJ-MER-0233-0148 v3', product: 'Administrador o apoderado', rel: 'adm', enc: 'Cifrado AES-256', data: 'Nombre, DNI, cargo, participación', own: true, sit: 'cifrado', n: 9, ops: 45 },
    { k: 'F', doc: 'Sala de datos (enlace)', ref: 'iManage Share · DR-GUAD', product: 'Contacto de proveedor o arrendador', rel: 'prov', enc: 'Enlace con autenticación', data: 'Nombre, cargo, correo, firma', own: false, sit: 'noabierto', n: 46, ops: 138 }
  ];
  const SIT = {
    salud: { label: 'Riesgo alto · categoría especial (salud)', chip: { status: 'crit', label: 'Riesgo alto · salud' }, action: 'Comunicación individual (art. 34 RGPD) y notificación a la AEPD' },
    economicos: { label: 'Riesgo alto · DNI e IBAN', chip: { status: 'crit', label: 'Riesgo alto' }, action: 'Comunicación individual (art. 34) con aviso de posible suplantación' },
    litigio: { label: 'Riesgo alto · datos de litigios y cuantías', chip: { status: 'pending', label: 'Comunicar vía letrado' }, action: 'Comunicación a través de su letrado' },
    cifrado: { label: 'Protegido por cifrado', chip: { status: 'neutral', label: 'Protegido (cifrado)' }, action: 'Ninguna: cifrado y contraseña no enviada (art. 34.3.a)' },
    noabierto: { label: 'No expuesto', chip: { status: 'info', label: 'No expuesto' }, action: 'Ninguna: enlace con autenticación y sin accesos' }
  };
  const REL = {
    emp: { prefix: 'Empleado nº', base: 1012 },
    comp: { prefix: 'Parte en el PO', base: 0 },
    adm: { prefix: 'Administración', base: 0 },
    prov: { prefix: 'Contrato', base: 0 }
  };
  const PROCS = ['PO 412/2025 · JPI nº 3 de Málaga', 'PO 977/2025 · JPI nº 3 de Málaga'];
  const ADM = ['Consejero', 'Consejera delegada', 'Secretario no consejero', 'Apoderado mancomunado', 'Apoderada solidaria'];
  const PROV = ['Constructora', 'Arrendador de oficinas', 'Proveedor de áridos', 'Estudio de arquitectura', 'Ingeniería', 'Mantenimiento'];

  /* Generador reproducible (los 255 interesados salen siempre iguales) */
  let seed = 260903;
  const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
  const pick = (a) => a[Math.floor(rnd() * a.length)];
  const pad = (n, w) => String(n).padStart(w, '0');
  const n0 = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const INI = 'ABCDEGIJLMNOPRSTV';

  const cards = [];
  let seq = 0;
  let empSeq = REL.emp.base;
  CATS.forEach((c) => {
    const base = Math.floor(c.ops / c.n);
    const opsArr = Array(c.n).fill(base);
    for (let r = c.ops - base * c.n; r > 0; r -= 1) opsArr[Math.floor(rnd() * c.n)] += 1;
    for (let i = 0; i < c.n; i += 1) {
      seq += 1;
      let client;
      if (c.rel === 'emp') { empSeq += 1 + Math.floor(rnd() * 4); client = `Empleado nº ${empSeq} · alta ${2008 + Math.floor(rnd() * 18)}`; }
      else if (c.rel === 'comp') client = `Demandante · ${pick(PROCS)}`;
      else if (c.rel === 'adm') client = pick(ADM);
      else client = `${pick(PROV)} · contrato en la sala de datos`;
      cards.push({
        cat: c.k,
        pan: `INT-${pad(seq, 4)}`,
        product: c.product,
        issuer: c.doc,
        bin: c.ref,
        holder: `${pick(INI)}. ${pick(INI)}. ${pick(INI)}.`,
        client,
        ops: opsArr[i],
        last: `Datos: ${c.data}`,
        amount: c.enc,
        state: SIT[c.sit].chip,
        action: SIT[c.sit].action,
        own: c.own,
        sit: c.sit
      });
    }
  });

  const sample = [];
  CATS.forEach((c) => { const list = cards.filter((x) => x.cat === c.k); sample.push(...list.slice(0, c.sit === 'economicos' ? 12 : c.n > 20 ? 8 : 4)); });

  const countBy = (pred) => cards.filter(pred).length;
  const opsBy = (pred) => cards.filter(pred).reduce((s, x) => s + x.ops, 0);

  /* ---------------------------------------------------------------- Avisos */

  const SIG = 'Atentamente,\nDelegado de Protección de Datos · Mora & Jordano\nCalle Linaje 3 · Málaga';
  const items = [
    {
      id: 'empleados', label: `Empleados de ${CLIENT}`, icon: 'users', notify: true,
      channel: 'Carta y correo electrónico (coordinado con RR. HH. del cliente)',
      meta: ['142 personas · 17 con datos de salud', 'Una sola comunicación por persona', 'Aviso en español'],
      body: 'El anexo laboral (XLSX sin cifrar) incluía DNI, salario, IBAN y antigüedad de 142 empleados, y bajas por incapacidad temporal de 17 de ellos (categoría especial, art. 9 RGPD). Los 17 reciben una única comunicación que cubre ambos tipos de datos.',
      refs: 'MJ-MER-0233-0152 v2', qtyText: '142 interesados', action: 'Comunicación de la brecha (RGPD art. 34)',
      notice: {
        lang: 'Español',
        headers: { From: 'Mora & Jordano · Delegado de Protección de Datos', To: '142 empleados (carta y correo vía RR. HH. del cliente)', Subject: '[SIMULACRO] Información sobre un incidente que afecta a sus datos personales' },
        subject: '[SIMULACRO] Información sobre un incidente que afecta a sus datos personales',
        body: [
          'Estimado/a {nombre}:',
          'Le informamos de que el 28 de septiembre de 2026, por un error en el envío de un correo electrónico, un documento de trabajo elaborado por Mora & Jordano para su empresa llegó a un destinatario externo no autorizado. El documento contenía sus datos identificativos (nombre y DNI), su salario, su antigüedad y el número de cuenta (IBAN) en el que cobra la nómina{; y, en su caso, información sobre bajas por incapacidad temporal}.',
          'Consecuencias posibles: uso indebido de su DNI o de su IBAN para suplantar su identidad o domiciliar cargos no autorizados.',
          'Qué hemos hecho: el destinatario nos avisó a la mañana siguiente y ha confirmado por escrito la eliminación del correo y sus adjuntos; hemos notificado el incidente a la Agencia Española de Protección de Datos y reforzado los controles de envío.',
          'Qué le recomendamos: revise sus movimientos bancarios en las próximas semanas y devuelva cualquier recibo que no reconozca (tiene 8 semanas para hacerlo). Desconfíe de llamadas o correos que le pidan datos en nombre de su empresa o de su banco.',
          'Para cualquier duda puede escribir a nuestro Delegado de Protección de Datos (dpd@{dominio del despacho}) indicando la referencia RGPD-2609-03.',
          'Motivo: simulacro de brecha de datos (PRO-RGPD-005). En un caso real la comunicación se envía sin dilación indebida y en lenguaje claro (art. 34.2 RGPD).',
          SIG
        ].join('\n\n'),
        highlights: [CODE, '28 de septiembre de 2026']
      }
    },
    {
      id: 'compradores', label: 'Compradores reclamantes (a través de su letrado)', icon: 'scale', notify: true,
      channel: 'Carta a cada letrado contrario por LexNET o correo profesional',
      meta: ['31 personas · 3 despachos', 'PO 412/2025 y PO 977/2025', 'Aviso en español'],
      body: 'El anexo de litigios (XLSX sin cifrar) identificaba a 31 compradores demandantes con su vivienda, procedimiento y cuantía reclamada. Están asistidos de abogado: por deontología no se les contacta directamente, sino a través de su letrado.',
      refs: 'MJ-MER-0233-0157 v1 · PRC-2025-0871', qtyText: '31 interesados', action: 'Comunicación de la brecha vía letrado (art. 34)',
      notice: {
        lang: 'Español',
        headers: { From: 'Mora & Jordano · Socio responsable de Procesal', To: 'Letrados de la parte demandante (3 despachos)', Subject: '[SIMULACRO] Comunicación de incidente de datos personales · PO 412/2025 y PO 977/2025' },
        subject: '[SIMULACRO] Comunicación de incidente de datos personales · PO 412/2025 y PO 977/2025',
        body: [
          'Estimado/a compañero/a:',
          'Como letrado de la parte demandante en los procedimientos ordinarios 412/2025 y 977/2025 del Juzgado de Primera Instancia nº 3 de Málaga, le comunicamos, para que lo traslade a sus representados, un incidente de seguridad que afecta a sus datos personales.',
          'El 28/09/2026 un documento de trabajo de este despacho con el nombre de sus clientes, la vivienda afectada, el número de procedimiento y la cuantía reclamada se envió por error a un destinatario externo, que lo ha eliminado y lo ha confirmado por escrito. No incluía DNI, datos bancarios ni de salud.',
          'Hemos notificado el incidente a la Agencia Española de Protección de Datos (referencia interna RGPD-2609-03). Le adjuntamos la relación de sus representados afectados y quedamos a su disposición.',
          'Motivo: simulacro de brecha de datos (PRO-RGPD-005). Mensaje de ejemplo.',
          'Un saludo cordial,\nSocio responsable de Procesal · Mora & Jordano'
        ].join('\n\n'),
        highlights: [CODE, 'PO 412/2025']
      }
    },
    {
      id: 'cliente', label: `${CLIENT} (cliente)`, icon: 'building', notify: true,
      channel: 'Llamada del socio responsable + correo cifrado',
      meta: ['MER-2026-0233 · PRC-2025-0871', 'Secreto profesional afectado', 'Aviso en español'],
      body: 'Se informa al cliente del envío erróneo de su informe de due diligence, de los datos de sus empleados y de los litigios expuestos, y de las medidas adoptadas, para que valore sus propias obligaciones como responsable de los datos de su plantilla.',
      refs: 'MER-2026-0233 · PRC-2025-0871', qtyText: '1 cliente', action: 'Información al cliente y coordinación con RR. HH.',
      notice: {
        lang: 'Español',
        headers: { From: 'Mora & Jordano · Socio responsable de Mercantil', To: `Consejera delegada · ${CLIENT}`, Subject: `[SIMULACRO] Incidente de confidencialidad en el expediente MER-2026-0233` },
        subject: '[SIMULACRO] Incidente de confidencialidad en el expediente MER-2026-0233',
        body: [
          'Estimada consejera delegada:',
          'Como le hemos adelantado por teléfono, el 28/09/2026 a las 18:47 un correo con el informe de vendor due diligence de la compañía y dos anexos se envió por error a un destinatario externo (Asesoría Morales Benalmádena, S.L.) en lugar de a los asesores del comprador.',
          'Alcance: el informe iba cifrado y la contraseña no se envió a ese destinatario; los anexos laboral y de litigios no estaban cifrados (142 empleados, 17 de ellos con bajas por IT, y 31 compradores demandantes). El enlace a la sala de datos exige autenticación y no ha tenido accesos.',
          'Medidas: el destinatario ha confirmado la eliminación con una declaración firmada; notificaremos a la AEPD antes del 02/10/2026 a las 08:05 y comunicaremos el incidente a los empleados, coordinándolo con su departamento de RR. HH., y a los compradores a través de sus letrados.',
          'Le proponemos una reunión hoy para revisar la comunicación a la plantilla y el calendario de la operación.',
          'Motivo: simulacro de brecha de datos. En un caso real este mensaje se envía cifrado y tras la llamada del socio.',
          'Un saludo,\nSocio responsable de Mercantil · Mora & Jordano'
        ].join('\n\n'),
        highlights: ['MER-2026-0233', '02/10/2026 a las 08:05']
      }
    },
    {
      id: 'destinatario', label: `${WRONG} (destinatario erróneo)`, icon: 'user-check', notify: true,
      channel: 'Correo + declaración de supresión para firma en Signaturit',
      meta: ['1 buzón externo · Benalmádena', 'Avisó el 29/09 a las 08:05', 'Aviso en español'],
      body: 'Requerimiento de supresión del correo y de sus adjuntos (también de la papelera y de copias locales), compromiso de no uso ni comunicación y declaración responsable firmada electrónicamente.',
      refs: 'Correo del 28/09 · 18:47', qtyText: '3 adjuntos', action: 'Supresión y declaración firmada (Signaturit)',
      notice: {
        lang: 'Español',
        headers: { From: 'Mora & Jordano · Responsable de Cumplimiento', To: `J. Morales · ${WRONG}`, Subject: '[SIMULACRO] Correo recibido por error: solicitud de eliminación' },
        subject: '[SIMULACRO] Correo recibido por error: solicitud de eliminación',
        body: [
          'Estimado Sr. Morales:',
          'Le agradecemos que nos avisara esta mañana de que había recibido por error nuestro correo del 28/09/2026 a las 18:47 («Guadalhorce · informe DD y anexos»). Contiene información confidencial sujeta a secreto profesional y datos personales de terceros.',
          'Le pedimos que: 1. elimine el correo y sus tres adjuntos de la bandeja de entrada, de la papelera y de cualquier copia local o en la nube; 2. no los utilice, reenvíe ni comunique a nadie; y 3. firme la declaración que le enviamos por Signaturit confirmando lo anterior.',
          'Motivo: simulacro de brecha de datos (PRO-RGPD-005). Mensaje de ejemplo.',
          'Atentamente,\nResponsable de Cumplimiento · Mora & Jordano'
        ].join('\n\n'),
        highlights: ['28/09/2026 a las 18:47']
      }
    },
    {
      id: 'aepd', label: 'Agencia Española de Protección de Datos', icon: 'lock', notify: true,
      channel: 'Sede electrónica de la AEPD · formulario de notificación de brechas',
      meta: ['Brecha de confidencialidad', `Plazo: 72 h · hasta el ${DEADLINE}`, 'Aviso en español'],
      body: 'Borrador de la notificación (art. 33 RGPD) con la naturaleza de la brecha, las categorías y el número de interesados y registros, las consecuencias probables y las medidas. El DPD informa y el Socio director decide.',
      refs: CODE, qtyText: '255 interesados', action: 'Notificación de la brecha (RGPD art. 33)',
      notice: {
        lang: 'Español',
        headers: { From: 'Mora & Jordano · Delegado de Protección de Datos', To: 'AEPD · notificación de brechas de datos personales', Subject: `[SIMULACRO] Notificación de brecha de datos personales · ${CODE}` },
        subject: `[SIMULACRO] Notificación de brecha de datos personales · ${CODE}`,
        body: [
          'Borrador (campos principales del formulario):',
          `Responsable: Mora & Jordano · referencia interna ${CODE}\nFecha de la brecha: 28/09/2026 18:47 · conocimiento: 29/09/2026 08:05 · notificación dentro de las 72 h\nNaturaleza: confidencialidad · correo electrónico enviado por error (autocompletado) a un destinatario externo identificado.\nCategorías de datos: identificativos (nombre, DNI), económicos (salario, IBAN), datos de salud (bajas por IT, art. 9 RGPD) y datos de litigios civiles.\nInteresados: 255 personas físicas en 318 menciones; 173 con riesgo alto (142 empleados del cliente y 31 compradores demandantes); 36 en un documento cifrado y 46 en un enlace sin accesos.\nConsecuencias probables: suplantación de identidad, cargos no autorizados y pérdida de confidencialidad de procedimientos judiciales.\nMedidas: declaración firmada de supresión del destinatario, comunicación a los interesados con riesgo alto, revisión del autocompletado y regla de prevención de pérdida de datos en Outlook.`,
          'Motivo: simulacro. La notificación la presenta el DPD tras la decisión del Socio director.',
          SIG
        ].join('\n\n'),
        highlights: [CODE, '72 h']
      }
    },
    {
      id: 'aseguradora', label: 'Aseguradora de responsabilidad civil profesional', icon: 'shield', notify: true,
      channel: 'Correo al corredor de seguros + parte de siniestro',
      meta: ['Póliza de RC profesional y ciberriesgo', 'Comunicación de circunstancia', 'Aviso en español'],
      body: 'Comunicación preventiva de la circunstancia que podría dar lugar a reclamación (pérdida de confidencialidad y posible sanción), en el plazo que marca la póliza.',
      refs: `${CODE} · MER-2026-0233`, qtyText: '1 póliza', action: 'Comunicación de circunstancia a la aseguradora',
      notice: {
        lang: 'Español',
        headers: { From: 'Mora & Jordano · Dirección del despacho', To: 'Corredor de seguros · RC profesional y ciberriesgo', Subject: `[SIMULACRO] Comunicación de circunstancia · ${CODE}` },
        subject: `[SIMULACRO] Comunicación de circunstancia · ${CODE}`,
        body: [
          'Buenos días:',
          `Les comunicamos, a efectos de la póliza de responsabilidad civil profesional y ciberriesgo, una circunstancia que podría dar lugar a reclamación: envío por error de un informe de due diligence y dos anexos con datos personales de 255 personas a un destinatario externo (expediente ${CODE}). El destinatario ha confirmado la eliminación y se notificará a la AEPD dentro de plazo.`,
          'Motivo: simulacro de brecha de datos. Mensaje de ejemplo.',
          'Un saludo,\nDirección del despacho · Mora & Jordano'
        ].join('\n\n'),
        highlights: [CODE]
      }
    },
    {
      id: 'registro', label: 'Interesados sin riesgo alto (registro interno)', icon: 'clipboard', notify: false, chip: 'Documentar sin comunicar',
      channel: 'Registro interno de brechas (art. 33.5 RGPD)',
      meta: ['82 personas', '36 en documento cifrado · 46 en enlace sin accesos', 'Sin comunicación individual'],
      body: 'Compradores que solo figuran en el informe cifrado, administradores y contactos de proveedores de la sala de datos. Se documenta por qué no procede comunicarles la brecha (cifrado y ausencia de acceso).',
      refs: 'MJ-MER-0233-0148 v3 · iManage Share', qtyText: '82 interesados', action: 'Anotación en el registro de brechas',
      notice: {
        lang: 'Español',
        headers: { From: 'Agentic Platform · agente Registro y avisos', To: 'Registro interno de brechas · Cumplimiento', Subject: `[SIMULACRO] Anotación ${CODE} · interesados sin comunicación` },
        subject: `[SIMULACRO] Anotación ${CODE} · interesados sin comunicación`,
        body: 'Anotación (borrador):\n36 interesados (27 compradores y 9 administradores) figuran solo en el informe MJ-MER-0233-0148 v3, cifrado con AES-256; la contraseña se envió por otro canal solo al destinatario correcto → art. 34.3.a RGPD.\n46 contactos de proveedores y arrendadores figuran en contratos de la sala de datos, accesible por un enlace que exige autenticación; el registro de accesos de iManage Share no muestra accesos del destinatario → sin exposición.\n\nMotivo: simulacro. La anotación la valida el DPD.',
        highlights: ['art. 34.3.a']
      }
    },
    {
      id: 'sistemas', label: 'Sistemas y seguridad de la información (interno)', icon: 'server', notify: false, chip: 'Medida interna',
      channel: 'Ticket a Sistemas + aviso por Microsoft Teams',
      meta: ['Outlook e iManage', 'Medidas correctoras', 'Aviso en español'],
      body: 'Revocar el enlace de iManage Share enviado, borrar la entrada de autocompletado del asociado, activar la confirmación de destinatarios externos con adjuntos y una regla de prevención de pérdida de datos para hojas con DNI o IBAN.',
      refs: 'DR-GUAD · Outlook', qtyText: '4 medidas', action: 'Medidas correctoras técnicas',
      notice: {
        lang: 'Español',
        headers: { From: 'Mora & Jordano · Responsable de Cumplimiento', To: 'Sistemas y seguridad de la información', Subject: `[SIMULACRO] Medidas correctoras · brecha ${CODE}` },
        subject: `[SIMULACRO] Medidas correctoras · brecha ${CODE}`,
        body: [
          'Hola:',
          `Por la brecha ${CODE} os pedimos: 1. revocar el enlace de iManage Share a la sala de datos DR-GUAD enviado el 28/09 y conservar el registro de accesos; 2. borrar la entrada de autocompletado de J. Morales en el buzón del asociado remitente; 3. activar la confirmación obligatoria al enviar adjuntos a dominios externos; 4. crear una regla de prevención de pérdida de datos que bloquee hojas de cálculo con DNI o IBAN sin cifrar.`,
          'Motivo: simulacro de brecha de datos. Mensaje de ejemplo.',
          'Gracias,\nCumplimiento · Mora & Jordano'
        ].join('\n\n'),
        highlights: [CODE, 'DR-GUAD']
      }
    }
  ];

  /* ---------------------------------------------------------------- Genealogía */

  const nodes = [
    { id: 'X', stage: 'exp', kicker: 'Expediente', title: CODE, mono: true, lot: CODE, sub: 'Brecha de confidencialidad', meta: `AEPD hasta el ${DEADLINE}`, reveal: 0 },
    { id: 'COR', stage: 'cor', kicker: 'Envío', title: 'Correo del 28/09 · 18:47', sub: 'Outlook · asociado de Mercantil', meta: '3 adjuntos y 1 enlace', alert: 'Recuperación fallida', reveal: 1 },
    { id: 'REC', stage: 'cor', kicker: 'Destinatario', title: 'Asesoría Morales Benalmádena', sub: 'Destinatario erróneo · autocompletado', meta: 'Avisó el 29/09 a las 08:05', reveal: 1 },
    { id: 'DOC1', stage: 'doc', kicker: 'Documento', title: 'Informe de due diligence', sub: 'PDF · MJ-MER-0233-0148 v3', meta: 'Cifrado AES-256', tone: 'stock', reveal: 2 },
    { id: 'DOC2', stage: 'doc', kicker: 'Documento', title: 'Anexo laboral', sub: `XLSX · ${DOCNO} v2`, meta: 'Sin cifrar', alert: 'Datos de salud', reveal: 2 },
    { id: 'DOC3', stage: 'doc', kicker: 'Documento', title: 'Anexo de litigios', sub: 'XLSX · MJ-MER-0233-0157 v1', meta: 'Sin cifrar', reveal: 2 },
    { id: 'DOC4', stage: 'doc', kicker: 'Enlace', title: 'Sala de datos DR-GUAD', sub: 'iManage Share · con autenticación', meta: '0 accesos del destinatario', tone: 'stock', reveal: 2 },
    { id: 'M1', stage: 'asu', kicker: 'Expediente', title: 'MER-2026-0233', mono: true, sub: 'Vendor due diligence · venta de la compañía', meta: CLIENT, reveal: 3 },
    { id: 'M2', stage: 'asu', kicker: 'Expediente', title: 'PRC-2025-0871', mono: true, sub: 'Defensa en PO 412/2025 y 977/2025', meta: 'JPI nº 3 de Málaga', reveal: 3 },
    { id: 'I1', stage: 'int', kicker: 'Interesados', title: '142 empleados', sub: 'Anexo laboral', meta: `${n0(opsBy((x) => x.issuer === 'Anexo laboral'))} campos personales`, reveal: 4 },
    { id: 'I2', stage: 'int', kicker: 'Interesados', title: '58 compradores', sub: '31 en el anexo · 27 solo en el informe', meta: `${n0(opsBy((x) => x.cat === 'C' || x.cat === 'D'))} campos personales`, reveal: 4 },
    { id: 'I3', stage: 'int', kicker: 'Interesados', title: '9 administradores', sub: 'Informe de due diligence', meta: '45 campos personales', reveal: 4 },
    { id: 'I4', stage: 'int', kicker: 'Interesados', title: '46 contactos', sub: 'Proveedores y arrendadores', meta: '138 campos personales', reveal: 4 },
    { id: 'S1', stage: 'sit', kicker: 'Riesgo', title: '173 riesgo alto', sub: '17 salud · 125 DNI e IBAN · 31 litigios', meta: 'Comunicar sin dilación (art. 34)', alert: 'Comunicar', alertTone: true, tone: 'planned', reveal: 5 },
    { id: 'S2', stage: 'sit', kicker: 'Riesgo', title: '36 protegidos', sub: '27 compradores · 9 administradores', meta: 'Documento cifrado', tone: 'stock', reveal: 5 },
    { id: 'S3', stage: 'sit', kicker: 'Riesgo', title: '46 no expuestos', sub: 'Enlace sin accesos', meta: 'Registro de iManage Share', tone: 'stock', reveal: 5 },
    { id: 'S4', stage: 'sit', kicker: 'Copia externa', title: '3 adjuntos en buzón ajeno', sub: 'Supresión pendiente de firma', meta: 'Declaración en Signaturit', alert: 'Hoy', alertTone: true, tone: 'planned', reveal: 5 },
    { id: 'D1', stage: 'dst', kicker: 'Destinatario', title: 'Empleados', sub: '142 personas', meta: 'Carta y correo vía RR. HH.', tone: 'customer', reveal: 6 },
    { id: 'D2', stage: 'dst', kicker: 'Destinatario', title: 'Compradores', sub: '31 personas · 3 letrados', meta: 'A través de su letrado', tone: 'customer', reveal: 6 },
    { id: 'D3', stage: 'dst', kicker: 'Destinatario', title: 'Cliente', sub: CLIENT, meta: 'Llamada y correo cifrado', tone: 'customer', reveal: 6 },
    { id: 'D4', stage: 'dst', kicker: 'Destinatario', title: 'Destinatario erróneo', sub: 'Supresión y declaración', meta: 'Signaturit', tone: 'customer', reveal: 6 },
    { id: 'D5', stage: 'dst', kicker: 'Destinatario', title: 'AEPD', sub: 'RGPD art. 33', meta: `Hasta el ${DEADLINE}`, tone: 'customer', reveal: 6 },
    { id: 'D6', stage: 'dst', kicker: 'Destinatario', title: 'Aseguradora RC', sub: 'Comunicación de circunstancia', meta: 'Corredor de seguros', tone: 'customer', reveal: 6 }
  ];
  const edges = [['X', 'COR'], ['COR', 'REC'], ['COR', 'DOC1'], ['COR', 'DOC2'], ['COR', 'DOC3'], ['COR', 'DOC4'],
    ['DOC1', 'M1'], ['DOC2', 'M1'], ['DOC3', 'M1'], ['DOC3', 'M2'], ['DOC4', 'M1'],
    ['M1', 'I1'], ['M1', 'I2'], ['M2', 'I2'], ['M1', 'I3'], ['M1', 'I4'],
    ['I1', 'S1'], ['I2', 'S1'], ['I2', 'S2'], ['I3', 'S2'], ['I4', 'S3'], ['REC', 'S4'],
    ['S1', 'D1'], ['S1', 'D2'], ['M1', 'D3'], ['S4', 'D4'], ['S1', 'D5'], ['S2', 'D5'], ['X', 'D6']];

  /* ---------------------------------------------------------------- Tablas */

  const locRow = (ref, k, where, whereSub, action, tone) => {
    const c = CATS.find((x) => x.k === k);
    return { ref, where, whereSub, n: c.n, qty: c.ops, action, tone };
  };
  const locRows = [
    locRow('MJ-MER-0233-0152 v2', 'A', 'Empleados · datos de salud', 'Bajas por IT en el anexo laboral sin cifrar (art. 9 RGPD)', 'Comunicación individual y notificación a la AEPD', 'crit'),
    locRow('MJ-MER-0233-0152 v2', 'B', 'Empleados · DNI, salario e IBAN', 'Anexo laboral sin cifrar', 'Comunicación individual con aviso de posible suplantación', 'crit'),
    locRow('MJ-MER-0233-0157 v1', 'C', 'Compradores demandantes · nominativos', 'Anexo de litigios sin cifrar · PO 412/2025 y 977/2025', 'Comunicación a través de su letrado', 'warn'),
    locRow('MJ-MER-0233-0148 v3', 'D', 'Compradores · solo en el informe', 'Informe cifrado; contraseña no enviada al destinatario', 'Ninguna: anotación en el registro de brechas', ''),
    locRow('MJ-MER-0233-0148 v3', 'E', 'Administradores y apoderados', 'Informe cifrado · datos también en el Registro Mercantil', 'Ninguna: anotación en el registro de brechas', ''),
    locRow('iManage Share', 'F', 'Contactos de proveedores y arrendadores', 'Sala de datos DR-GUAD · enlace con autenticación, 0 accesos', 'Ninguna: revocar el enlace', '')
  ];

  const cardCols = [
    { label: 'Interesado', key: 'pan', mono: true, sub: 'product' },
    { label: 'Documento', key: 'issuer', sub: 'bin' },
    { label: 'Persona', key: 'holder', sub: 'client' },
    { label: 'Campos expuestos', key: 'ops', num: true, sub: 'last' },
    { label: 'Protección', key: 'amount' },
    { label: 'Riesgo', key: 'state', chip: true },
    { label: 'Acción en un caso real', key: 'action' }
  ];

  const issuerRows = [
    { iss: 'Anexo laboral', bin: `${DOCNO} v2 · XLSX sin cifrar`, cards: 142, ops: 159, active: countBy((x) => x.issuer === 'Anexo laboral'), done: 0, action: '142 a comunicar' },
    { iss: 'Anexo de litigios', bin: 'MJ-MER-0233-0157 v1 · XLSX sin cifrar', cards: 31, ops: 31, active: countBy((x) => x.cat === 'C'), done: 0, action: '31 a comunicar vía letrado' },
    { iss: 'Informe de due diligence', bin: 'MJ-MER-0233-0148 v3 · PDF cifrado', cards: 36, ops: 82, active: 0, done: 36, action: 'Protegido por cifrado' },
    { iss: 'Sala de datos (enlace)', bin: 'iManage Share · DR-GUAD', cards: 46, ops: 46, active: 0, done: 46, action: 'Sin accesos del destinatario' }
  ].map((r) => Object.assign(r, { diff: 0, located: '100,0 %' }));

  const scope = {
    headline: `Correo enviado por error el 28/09/2026 a las 18:47 · informe de due diligence de ${CLIENT} · 255 interesados`,
    previewSide: '1 correo · 4 elementos · 255 interesados',
    startNode: 'X',
    stages: [
      { id: 'exp', label: 'Expediente', icon: 'clipboard' },
      { id: 'cor', label: 'Envío', icon: 'mail' },
      { id: 'doc', label: 'Documentos', icon: 'file-text', count: '4' },
      { id: 'asu', label: 'Expedientes', icon: 'scale' },
      { id: 'int', label: 'Interesados', icon: 'users', count: '255' },
      { id: 'sit', label: 'Riesgo', icon: 'shield' },
      { id: 'dst', label: 'Avisos', icon: 'send' }
    ],
    nodes,
    edges,
    systems: ['Gestor de expedientes', 'Outlook', 'iManage', 'Signaturit'],
    genSub: '1 correo · 4 documentos · 2 expedientes · 255 interesados · 8 destinatarios',
    steps: [
      { agent: 'trace', system: 'Gestor de expedientes', action: 'Localiza el punto de partida', result: `Expediente ${CODE} abierto por Cumplimiento el 29/09 a las 08:11, tras el aviso del destinatario a las 08:05 · plazo AEPD hasta el ${DEADLINE}`, ms: 220, reveal: 0, mark: 'Punto de partida localizado' },
      { agent: 'trace', system: 'Outlook', action: 'Hacia atrás: rastreo del mensaje y del destinatario', result: 'Enviado el 28/09 a las 18:47 por un asociado de Mercantil · el autocompletado eligió «J. Morales (Asesoría Morales Benalmádena)» en lugar de «J. Morales (asesores del comprador)» · 3 adjuntos y 1 enlace · recuperación fallida (buzón externo)', ms: 460, tone: 'warn', reveal: 1, mark: 'Envío y destinatario identificados' },
      { agent: 'trace', system: 'iManage', action: 'Documentos enviados, versión, cifrado y accesos', result: 'MJ-MER-0233-0148 v3 (PDF cifrado AES-256; contraseña enviada por otro canal solo al destinatario correcto) · MJ-MER-0233-0152 v2 y MJ-MER-0233-0157 v1 (XLSX sin cifrar) · enlace a DR-GUAD con autenticación: 0 accesos', ms: 610, tone: 'warn', reveal: 2, mark: 'Documentos y cifrado comprobados' },
      { agent: 'trace', system: 'Gestor de expedientes', action: 'Expedientes y cliente de cada documento', result: `MER-2026-0233 (vendor due diligence de ${CLIENT}) · el anexo de litigios procede de PRC-2025-0871 (defensa en el PO 412/2025 y el PO 977/2025, JPI nº 3 de Málaga) · información sujeta a secreto profesional`, ms: 380, reveal: 3, mark: 'Expedientes y cliente identificados' },
      { agent: 'trace', system: 'iManage', action: 'Datos personales en cada documento', result: '318 menciones de personas · 255 personas físicas únicas · 17 con datos de salud (bajas por IT) · 142 con DNI e IBAN', ms: 720, reveal: 4, mark: 'Interesados identificados' },
      { agent: 'trace', system: 'Agentic Platform', action: 'Riesgo por interesado (criterios de la guía de brechas de la AEPD)', result: '173 con riesgo alto a comunicar (17 salud, 125 DNI e IBAN, 31 litigios) · 36 protegidos por cifrado · 46 no expuestos', ms: 430, tone: 'warn', reveal: 5, mark: 'Riesgo evaluado por interesado' },
      { agent: 'trace', system: 'Gestor de expedientes', action: 'Destinatarios, canal y datos de contacto', result: '142 empleados vía RR. HH. del cliente · 31 compradores asistidos por 3 despachos (contacto por su letrado) · contacto del cliente, del destinatario erróneo y del corredor de seguros verificados', ms: 540, reveal: 6, mark: 'Destinatarios identificados' },
      { agent: 'bal', system: 'iManage', action: 'Depuración de menciones', result: '63 excluidas (31 compradores repetidos en el informe y en el anexo, 17 empleados repetidos en nómina y bajas, 15 personas jurídicas) · 255 personas únicas', ms: 320 },
      { agent: 'bal', system: 'Agentic Platform', action: 'Cuadre de interesados por documento y riesgo', result: 'Conciliado 100,0 % · 0 interesados sin asignar · 255 de 255 clasificados', ms: 90, tone: 'ok', mark: 'Cuadre de interesados cerrado' },
      { agent: 'rec', system: 'Gestor de expedientes', action: 'Anota la brecha en el registro interno (art. 33.5 RGPD)', result: `${CODE} actualizado con la cronología, los documentos y la evaluación de riesgo · decisión pendiente del Socio director con el informe del DPD`, ms: 360 },
      { agent: 'rec', system: 'Signaturit', action: 'Prepara la declaración de supresión del destinatario', result: `Solicitud de firma en borrador para J. Morales (${WRONG}) · sin enviar`, ms: 280 },
      { agent: 'rec', system: 'Outlook', action: 'Prepara los avisos sin enviar', result: '8 borradores: empleados, compradores (vía letrado), cliente, destinatario erróneo, AEPD, aseguradora, registro interno y Sistemas', ms: 760, mark: 'Registro y avisos preparados' }
    ],
    located: { label: 'Interesados clasificados', value: '255 de 255', sub: '173 con riesgo alto a comunicar · 82 sin comunicación', icon: 'users', short: '255 de 255 interesados clasificados por documento y riesgo (173 con riesgo alto a comunicar)' },
    kpiNotify: { label: 'Destinatarios a notificar', value: 6, sub: '142 empleados · 31 compradores · cliente · destinatario · AEPD · aseguradora' },
    balance: {
      title: 'Cuadre de interesados y documentos',
      kpiLabel: 'Cuadre de interesados conciliado',
      sub: 'Personas físicas de los documentos enviados · documentos en iManage, expedientes en el gestor',
      head: 'Interesados de la brecha',
      headSide: '3 flujos · 255 interesados · 318 menciones',
      labels: { in: 'Interesados en los documentos', losses: 'Excluidas', out: 'Con riesgo alto', stock: 'Sin riesgo alto' },
      detailTitle: 'Detalle por flujo',
      criterio: 'Criterio: cada persona se asigna a un único documento y nivel de riesgo, el de mayor exposición; la diferencia sin asignar se muestra tal cual, no se reparte. Cada exclusión cita el sistema que la registra.',
      reportText: 'Mensaje y destinatario en Outlook; documentos, versiones, cifrado y registro de accesos en iManage; expedientes, cliente y contactos en el Gestor de expedientes; riesgo según los criterios de la guía de brechas de la AEPD.',
      flows: [
        {
          key: 'INT', seg: 'Interesados', main: true, unit: 'interesados', colLabel: 'Interesados',
          title: 'Interesados en los documentos → riesgo',
          inLabel: 'Personas físicas únicas', inSub: 'Correo del 28/09/2026 18:47 · 3 adjuntos y 1 enlace', inStage: 'iManage', inQty: 255,
          phases: [],
          outs: [
            { label: 'Riesgo alto · datos de salud', sub: 'Anexo laboral · 17 empleados', stage: 'iManage', qty: 17 },
            { label: 'Riesgo alto · DNI, salario e IBAN', sub: 'Anexo laboral · 125 empleados', stage: 'iManage', qty: 125 },
            { label: 'Riesgo alto · datos de litigios', sub: 'Anexo de litigios · comunicar vía letrado', stage: 'Gestor', qty: 31 },
            { label: 'Protegidos por cifrado', sub: 'Informe de due diligence · AES-256', stage: 'iManage', qty: 36, kind: 'stock' },
            { label: 'No expuestos', sub: 'Sala de datos · 0 accesos', stage: 'iManage', qty: 46, kind: 'stock' }
          ]
        },
        {
          key: 'MEN', seg: 'Menciones', unit: 'menciones', colLabel: 'Menciones',
          title: 'Menciones de personas → personas físicas únicas',
          inLabel: 'Menciones en los documentos', inSub: '4 elementos · 2 expedientes', inStage: 'iManage', inQty: 318,
          phases: [{ title: 'Depuración de menciones', stages: [
            ['iManage', 'Compradores repetidos en el informe y en el anexo de litigios', 31],
            ['iManage', 'Empleados repetidos en la hoja de nómina y en la de bajas', 17],
            ['Gestor', 'Personas jurídicas (no son datos personales)', 15]
          ] }],
          outs: [
            { label: 'Personas físicas únicas', sub: '142 empleados · 58 compradores · 9 administradores · 46 contactos', stage: 'iManage', qty: 255 }
          ]
        },
        {
          key: 'DOC', seg: 'Documentos', unit: 'elementos', colLabel: 'Elementos',
          title: 'Elementos del correo → exposición',
          inLabel: 'Adjuntos y enlaces enviados', inSub: 'Correo del 28/09/2026 18:47', inStage: 'Outlook', inQty: 4,
          phases: [],
          outs: [
            { label: 'Adjuntos sin cifrar', sub: 'Anexo laboral y anexo de litigios', stage: 'iManage', qty: 2 },
            { label: 'Adjunto cifrado', sub: 'Informe de due diligence · contraseña no enviada', stage: 'iManage', qty: 1, kind: 'stock' },
            { label: 'Enlace sin accesos', sub: 'Sala de datos DR-GUAD', stage: 'iManage', qty: 1, kind: 'stock' }
          ]
        }
      ],
      product: {
        title: 'Interesados por documento',
        side: '255 interesados · 318 menciones',
        cols: [
          { label: 'Documento', key: 'iss', sub: 'bin' },
          { label: 'Interesados', key: 'cards', num: true },
          { label: 'Menciones', key: 'ops', num: true },
          { label: 'Riesgo alto', key: 'active', num: true, sub: 'action' },
          { label: 'Diferencia', key: 'diff', num: true },
          { label: 'Clasificado', key: 'located', num: true, ok: true }
        ],
        rows: issuerRows
      }
    },
    units: {
      title: 'Interesados de la brecha',
      sub: '255 interesados · muestra representativa en pantalla · CSV con todos · datos seudonimizados (sin nombre ni DNI)',
      icon: 'users',
      csvLabel: 'Interesados (CSV)',
      csvName: 'interesados',
      byLoc: { label: 'Por riesgo', refLabel: 'Documento', whereLabel: 'Categoría', nLabel: 'Interesados', qtyLabel: 'Campos expuestos', actionLabel: 'Acción en un caso real', rows: locRows },
      list: { label: 'Interesados', count: 255, note: `Muestra de ${sample.length} de 255 interesados (de cada categoría); el CSV incluye los 255 seudonimizados.`, cols: cardCols, rows: sample },
      csvRows: cards
    },
    customers: {
      title: 'Interesados y entidades a notificar',
      sub: '6 destinatarios con aviso · 2 anotaciones internas · 2 acciones con plazo',
      items,
      holdsTitle: 'Acciones con plazo',
      holdsIcon: 'clock',
      holds: [
        { icon: 'edit', tone: 'crit', title: 'Obtener hoy la declaración de supresión del destinatario', meta: ['hoy', 'Signaturit', WRONG], body: 'En un caso real, la confirmación firmada de que el correo y sus adjuntos se han eliminado es la medida que más reduce el riesgo y se recoge en la notificación a la AEPD.' },
        { icon: 'lock', tone: 'warn', title: 'Notificar la brecha a la AEPD', meta: [`hasta el ${DEADLINE}`, '72 h desde el conocimiento', 'Delegado de Protección de Datos'], body: 'Si la información no está completa, se notifica igualmente dentro de plazo y se completa por fases (art. 33.4 RGPD).' }
      ]
    },
    approval: {
      titlePrefix: 'Notificación, comunicaciones y cierre del simulacro',
      scope: [
        { label: 'Interesados a comunicar', value: '142 empleados (vía RR. HH.) · 31 compradores (vía su letrado)', status: 'pending', chip: '173' },
        { label: 'Notificación a la AEPD', value: `Sede electrónica · hasta el ${DEADLINE}`, status: 'evaluate', chip: 'Sin presentar en simulacro' },
        { label: 'Cliente', value: `${CLIENT} · MER-2026-0233 y PRC-2025-0871` },
        { label: 'Destinatario erróneo', value: `${WRONG} · supresión y declaración en Signaturit` },
        { label: 'Otros', value: 'Aseguradora de RC profesional · registro interno de brechas · medidas de Sistemas' }
      ],
      effects: [
        'Outlook y Signaturit: {n} avisos guardados como borrador con la marca SIMULACRO; no se envía ningún correo, carta ni solicitud de firma',
        'Sede electrónica de la AEPD: no se presenta ninguna notificación; el borrador queda en el expediente',
        'iManage: sin cambios; en un simulacro no se revoca el enlace ni se bloquea ningún documento',
        'Registro {code} aprobado con los tiempos de cada actividad'
      ]
    },
    report: {
      objeto: 'Simulacro de brecha de datos personales con punto de partida en {label}. Se comprueba la trazabilidad hacia atrás (correo, remitente, destinatario y documentos) y hacia delante (expedientes, cliente, interesados, riesgo y destinatarios de las comunicaciones), con el cuadre de interesados y menciones.',
      noAction: 'El ejercicio no notifica a la AEPD, no envía comunicaciones y no modifica documentos.',
      results: [
        '173 interesados con riesgo alto recibirían la comunicación del art. 34: 142 empleados del cliente (17 con datos de salud) y 31 compradores demandantes a través de su letrado.',
        '82 interesados no requieren comunicación (36 en un documento cifrado y 46 en un enlace sin accesos), con su justificación en el registro interno de brechas.',
        `Notificación a la AEPD preparada para presentarse antes del ${DEADLINE} (72 h desde el conocimiento de la brecha).`
      ],
      back: {
        cols: [{ label: 'Etapa', key: 'etapa' }, { label: 'Referencia', key: 'ref', mono: true }, { label: 'Fecha', key: 'fecha' }, { label: 'Detalle', key: 'det' }],
        rows: [
          { etapa: 'Expediente', ref: CODE, fecha: '29/09/2026 08:11', det: 'Abierto por Cumplimiento tras el aviso del destinatario erróneo (08:05)' },
          { etapa: 'Correo', ref: 'Outlook · 18:47', fecha: '28/09/2026', det: 'Enviado por un asociado de Mercantil · autocompletado · recuperación fallida en buzón externo' },
          { etapa: 'Destinatario', ref: 'J. Morales', fecha: '29/09/2026 08:05', det: `${WRONG} · sin relación con el asunto · avisó por correo` },
          { etapa: 'Documentos', ref: 'MJ-MER-0233-0148/0152/0157', fecha: '22–28/09/2026', det: 'Informe PDF cifrado (v3), anexo laboral XLSX (v2) y anexo de litigios XLSX (v1) sin cifrar · enlace a DR-GUAD sin accesos' },
          { etapa: 'Expedientes', ref: 'MER-2026-0233', fecha: 'Abierto 06/2026', det: `Vendor due diligence de ${CLIENT} · anexo de litigios procedente de PRC-2025-0871` }
        ]
      },
      fwd: {
        cols: [{ label: 'Documento', key: 'ref', mono: true }, { label: 'Categoría', key: 'where' }, { label: 'Interesados', key: 'n', num: true }, { label: 'Campos', key: 'qty', num: true }, { label: 'Acción', key: 'action' }],
        rows: locRows
      },
      conclusion: 'Conclusión: la información necesaria para notificar la brecha y comunicarla a los interesados se obtiene completa, cuadra persona a persona y dentro de las 72 h. Acciones de mejora propuestas: cifrar por defecto los anexos con datos personales al salir de iManage y pedir confirmación al enviar adjuntos a dominios externos.',
      note: 'Simulacro: no se ha notificado a la AEPD, no se ha enviado ninguna comunicación ni solicitud de firma y no se ha modificado ningún documento. Interesados seudonimizados; datos sintéticos de demostración.'
    },
    audit: { back: 'correo del 28/09 18:47 · destinatario erróneo · 4 elementos enviados', fwd: '2 expedientes · 255 interesados · 173 con riesgo alto · 6 destinatarios a notificar' },
    say: [
      'Lo accionable: 173 personas con riesgo alto, de ellas 17 con datos de salud, y una notificación a la AEPD que vence el viernes 2 de octubre a las 08:05.',
      'Cada aviso sale por su canal: a los empleados vía RR. HH. del cliente, a los compradores a través de su letrado, la declaración de supresión por Signaturit y el formulario de la AEPD. En un simulacro no se envía nada. Decide el Socio director con el informe del DPD.'
    ]
  };

  agenticPack('abogados', {
    retirada: {
      title: 'Simulacro de brecha de datos',
      nav: 'Simulacro de trazabilidad',
      section: 'Calidad',
      desc: 'Ejercicio de trazabilidad de una brecha de datos personales: del correo enviado por error a cada documento, expediente, cliente e interesado, con el cuadre de interesados y la notificación a la AEPD en 72 h y las comunicaciones a interesados, cliente, destinatario y aseguradora, a partir de un expediente RGPD o de un documento de iManage.',
      place: 'Sede de Málaga · Calle Linaje',
      approver: 'Socio director',
      regPrefix: 'SB-2026-',
      agents: { trace: 'Trazabilidad', bal: 'Cuadre', rec: 'Registro y avisos' },
      targetText: 'Objetivo ilustrativo: 4 h',
      todayEstimate: '1–2 días',
      timerRef: 'Objetivo demo: 4 h',
      packLabel: 'Descargar paquete del expediente',
      setup: { title: 'Punto de partida', sub: 'Un expediente de brecha de datos o el número de un documento de iManage' },
      modes: {
        expediente: { label: 'Expediente', noun: 'el expediente', field: 'Código de expediente RGPD', icon: 'clipboard', format: 'RGPD-2609-03', where: 'Gestor de expedientes' },
        documento: { label: 'Documento', noun: 'el documento', field: 'Número de documento (iManage)', icon: 'file-text', format: DOCNO, where: 'iManage' }
      },
      entries: [
        { mode: 'expediente', code: CODE, scope: 'brecha', label: `Expediente ${CODE}`, option: `Brecha · correo erróneo · DD de ${CLIENT}` },
        { mode: 'documento', code: DOCNO, scope: 'brecha', label: `Documento ${DOCNO}`, option: 'Anexo laboral · MER-2026-0233', headline: `Anexo laboral de la due diligence de ${CLIENT} · XLSX sin cifrar · enviado por error en el expediente ${CODE}`, startNode: 'DOC2', startResult: `Documento ${DOCNO} v2 (anexo laboral, XLSX sin cifrar) · enviado por error el 28/09 a las 18:47 · expediente ${CODE} → se traza el resto del envío` }
      ],
      examples: [
        { mode: 'expediente', code: CODE, label: `Expediente ${CODE}` },
        { mode: 'documento', code: DOCNO, label: `Documento ${DOCNO}` }
      ],
      reference: {
        title: 'Marco de referencia',
        sub: 'Objetivo del ejercicio; el DPD y Cumplimiento confirman los requisitos aplicables (PRO-RGPD-005)',
        items: [
          ['RGPD art. 33', 'Reglamento (UE) 2016/679: el responsable notifica la brecha a la autoridad de control (AEPD) sin dilación indebida y, a más tardar, en 72 h desde que tuvo constancia, salvo que sea improbable que constituya un riesgo; toda brecha se documenta en el registro interno (art. 33.5).'],
          ['RGPD art. 34', 'Si la brecha entraña un alto riesgo para los derechos y libertades, se comunica a los interesados sin dilación y en lenguaje claro; no es necesaria si los datos estaban protegidos, por ejemplo cifrados (art. 34.3.a). LOPDGDD (Ley Orgánica 3/2018) y guía de la AEPD para la gestión y notificación de brechas.'],
          ['Secreto profesional', 'Estatuto General de la Abogacía Española (RD 135/2021) y Código Deontológico de la Abogacía: el despacho preserva la confidencialidad de la información del cliente, le informa del incidente y no contacta directamente con la parte contraria que tiene abogado.']
        ],
        note: 'Un simulacro no notifica a la AEPD ni envía comunicaciones: se mide si la información se obtiene completa, cuadra y a tiempo.'
      },
      legend: { planned: 'Acción con plazo', click: 'Pulsa el expediente para ver su traza completa' },
      notice: { title: 'Simulacro de brecha de datos', approved: 'Guardado como borrador con la marca SIMULACRO: no se envía ningún correo, carta, notificación ni solicitud de firma.' },
      approval: { policy: 'PRO-RGPD-005 · la notificación a la AEPD y las comunicaciones a interesados y al cliente las aprueba el Socio director con el informe del DPD', approveLabel: 'Aprobar y cerrar simulacro', rejectPlaceholder: 'Por ejemplo: falta revisar con el cliente la comunicación a su plantilla' },
      clock: { title: 'Cronómetro frente al objetivo', sub: 'Tiempos de la simulación; no son medidas de rendimiento de los sistemas' },
      report: { subtitle: 'Registro del ejercicio de brecha de datos personales · RGPD arts. 33 y 34 · LOPDGDD', approvedText: 'Avisos guardados como borrador con la marca SIMULACRO; no se ha notificado a la AEPD ni se ha enviado ninguna comunicación.' },
      compare: {
        rows: [
          { k: 'Personas implicadas', today: '4–5: Cumplimiento, DPD, Sistemas, socios de Mercantil y Procesal y Atención al cliente', agentic: '1: {approver} revisa y aprueba' },
          { k: 'Sistemas consultados', today: '5–6 abiertos a mano: Outlook, iManage, Gestor de expedientes, hojas de cálculo, correo y Signaturit', agentic: '4 conectores consultados por los agentes: Gestor de expedientes, Outlook, iManage y Signaturit' },
          { k: 'Pasos', today: 'Revisar a mano cada adjunto, contar personas, cruzar duplicados y redactar avisos', agentic: '{steps} pasos automáticos y 1 aprobación' },
          { k: 'Cuadre', today: 'Hoja de cálculo con el recuento de interesados por documento', agentic: 'Calculado por documento y riesgo: {reconciled} conciliado' }
        ]
      },
      presenter: {
        idle: [
          'Simulacro de brecha de datos: en un despacho, la trazabilidad va del correo enviado por error a cada documento, expediente e interesado.',
          'Se elige el punto de partida: el expediente RGPD-2609-03 o el número del documento en iManage.',
          'Agentic Platform recorre el Gestor de expedientes, Outlook e iManage: destinatario, adjuntos, cifrado, accesos, expedientes, personas y riesgo de cada una, y cuadra los 255 interesados antes del plazo de 72 h.'
        ],
        nextIdle: 'Pulsar «Iniciar simulacro» con el expediente RGPD-2609-03 (o elegir «Documento MJ-MER-0233-0152»).',
        nextRun: 'Pulsar «Ver aviso» de los empleados o de la AEPD y después «Aprobar y cerrar simulacro».',
        nextDone: '«Descargar paquete del expediente»: CSV con los 255 interesados y registro imprimible. Después, «Cuestionario de cliente» (flecha derecha).'
      },
      scopes: { brecha: scope }
    }
  });
})();
