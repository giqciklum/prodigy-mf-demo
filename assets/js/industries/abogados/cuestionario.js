/* Mora & Jordano · cuestionario de homologación para el panel de despachos externos de Banca Mediterránea (banco ficticio). Datos sintéticos de demostración (MFM). */
agenticPack('abogados', {
  cuestionario: {
    agent: 'Cuestionarios de cliente',
    lang: 'es',
    default_sel: 'D1',
    reviewer: 'Responsable de Cumplimiento (PBC y RGPD)',
    assignee: 'Dirección del despacho y Cumplimiento',
    assignee_short: 'Dirección y Cumplimiento',
    team: 'Cumplimiento',
    assign_due: '2026-10-08',
    responder: 'Mora & Jordano Abogados',
    site: 'Mora & Jordano · sedes de Málaga y Córdoba',
    site_label: 'Despacho',
    page_title: 'Homologación de despachos · Banca Mediterránea',
    report_title: 'Respuesta al cuestionario de homologación del panel jurídico',
    ref_label: 'Apartado del cuestionario',
    scope_meta_label: 'Lotes',
    discard_placeholder: 'Por ejemplo: se responde con el certificado de la póliza adjunto',
    save_system: 'Gestor de expedientes',
    qn: {
      code: 'CUE-2026-051',
      title: 'Cuestionario de homologación de despachos externos · Panel jurídico 2027-2029',
      customer: 'Banca Mediterránea, S.A.',
      via: 'Banca Mediterránea · Gestión de Proveedores Jurídicos',
      received: '2026-09-28T10:40',
      due: '2026-10-15',
      file: 'BancaMediterranea_Homologacion_Panel_Juridico_2027-2029_Mora_Jordano.xlsx',
      scope: 'homologación de Mora & Jordano en el panel de despachos externos de Banca Mediterránea para 2027-2029, lotes de Procesal (litigación bancaria y recobro) y de Fiscal y Tributario',
      scope_short: 'Panel jurídico 2027-2029 · lotes Procesal y Fiscal',
      scope_label: 'homologación en el panel de despachos externos'
    },
    email: {
      mailbox: 'buzón de Cumplimiento',
      headers: {
        From: 'Gestión de Proveedores Jurídicos, Banca Mediterránea <panel.juridico@bancamediterranea.example>',
        To: 'Cumplimiento, Mora & Jordano <cumplimiento@morajordano.example>',
        Date: 'Mon, 28 Sep 2026 10:40 (CEST)',
        Subject: 'Homologación Panel Jurídico 2027-2029 - cuestionario de proveedor - respuesta antes del 15 de octubre'
      },
      text: 'Estimados compañeros:\n\nComo continuación de la invitación a participar en la homologación de nuestro Panel Jurídico 2027-2029 (lotes de Procesal y de Fiscal y Tributario), les adjuntamos el cuestionario de homologación de despachos externos.\n\nEl cuestionario tiene 15 preguntas en cinco bloques: despacho, organización y seguros; prevención del blanqueo de capitales; protección de datos y seguridad de la información; conflictos de intereses, plazos y continuidad; y honorarios, inteligencia artificial y reclamaciones.\n\nPara cada respuesta, indiquen la política, el certificado o el registro que la acredita; las respuestas sin evidencia se puntuarán como no conformes. El cuestionario debe ir firmado por el responsable de cumplimiento del despacho.\n\nNecesitamos el cuestionario cumplimentado antes del jueves 15 de octubre de 2026; las candidaturas incompletas quedarán fuera de esta convocatoria.\n\nUn saludo,\n\nGestión de Proveedores Jurídicos\nBanca Mediterránea, S.A.',
      highlights: [
        { text: 'Panel Jurídico 2027-2029', label: 'Homologación', tone: 'brand' },
        { text: '15 preguntas', label: 'Preguntas', tone: 'brand' },
        { text: 'indiquen la política, el certificado o el registro que la acredita', label: 'Requisito' },
        { text: 'firmado por el responsable de cumplimiento del despacho', label: 'Aprobación' },
        { text: 'jueves 15 de octubre de 2026', label: 'Plazo' }
      ]
    },
    sections: [
      { id: 'A', es: 'Despacho, organización y seguros', en: 'Firm, organisation and insurance' },
      { id: 'B', es: 'Prevención del blanqueo (PBC/FT)', en: 'Anti-money laundering (AML/CFT)' },
      { id: 'C', es: 'Protección de datos y seguridad', en: 'Data protection and information security' },
      { id: 'D', es: 'Conflictos, plazos y continuidad', en: 'Conflicts, deadlines and continuity' },
      { id: 'E', es: 'Honorarios, IA y reclamaciones', en: 'Fees, AI and claims' }
    ],
    kpi: { label: 'Comprobaciones de conflictos en 2025', value: 1146, sub: '23 conflictos detectados · 9 encargos no aceptados', icon: 'scale' },
    sources_sub: 'Manual de PBC, políticas internas, certificados y memoria del despacho',
    identify_result: 'Banca Mediterránea · Panel Jurídico 2027-2029 · 15 preguntas de homologación',
    search_scope: 'manual de PBC, políticas de conflictos, honorarios, seguridad e IA, protocolos de plazos y RGPD, certificados y memoria del despacho',
    lookups: [
      { system: 'Gestor de expedientes', action: 'Consulta las comprobaciones de conflictos, la diligencia debida de PBC y el control de plazos', result: '1.146 comprobaciones de conflictos · 4.812 plazos procesales sin vencimientos incumplidos en 2025', ms: 540 },
      { system: 'iManage', action: 'Lee la configuración de seguridad y la ubicación del repositorio documental', result: 'Cifrado AES-256 · alojamiento en la UE · doble factor en el 100 % de las cuentas', ms: 420 },
      { system: 'Signaturit', action: 'Cuenta las hojas de encargo firmadas en 2025', result: '312 hojas de encargo firmadas electrónicamente · 100 % de los asuntos facturados', ms: 310 },
      { system: 'LexNET', action: 'Cruza la pregunta de conflictos con las notificaciones de hoy', result: 'PO 1184/2026: demanda contra Aceites Sierra Subbética; posible conflicto con la parte demandante (PRC-2026-0412)', ms: 300, tone: 'warn' },
      { system: 'Gestor de expedientes', action: 'Cruza la pregunta de incidentes con los expedientes abiertos', result: 'Expediente RGPD-2609-03 abierto: informe de due diligence enviado a un destinatario equivocado', ms: 280, tone: 'warn' }
    ],
    compare: {
      people: '3–4: Cumplimiento, Sistemas, Administración y el socio que lleva la relación con el banco',
      systems: '7–9: correo, el Excel del banco, manual de PBC, políticas internas, Gestor de expedientes, iManage, Signaturit, certificados de seguros e ISO y memoria del despacho',
      steps: 'Buscar la evidencia de cada pregunta, copiar el cuestionario de la última homologación y actualizar cifras, pedir datos a Sistemas y a Administración y recoger certificados de la correduría',
      time: '1–2 días de trabajo de Cumplimiento y de un socio, repartidos en una semana'
    },
    presenter: {
      before: [
        'Entrar en el panel de despachos de un banco son tres años de asuntos de litigación y fiscales. Si el cuestionario de homologación llega tarde o incompleto, la candidatura se queda fuera: no hay segunda vuelta.',
        'Este llega de Banca Mediterránea: {total} preguntas sobre seguros, prevención del blanqueo, protección de datos, seguridad, conflictos, honorarios y uso de IA generativa con datos de clientes.',
        'Al pulsar, Agentic Platform busca en el manual de PBC, las políticas internas, los protocolos, los certificados y la memoria del despacho, y en los registros del Gestor de expedientes, iManage, Signaturit y LexNET, y redacta cada respuesta con su fuente.'
      ],
      during: [
        '{drafted} de {total} con borrador y cita; cada cita se comprueba contra el texto de la fuente. {flagged} quedan sin responder: seguro de ciberriesgos, anticorrupción y canal interno de información, y reclamaciones de responsabilidad profesional. Sin documento, no se inventa nada.',
        'D1: además de responder sobre la política de conflictos, avisa de la notificación LexNET de esta mañana, con un posible conflicto en el PO 1184/2026. La respuesta describe la política, no el caso, pero quien firma tiene que saberlo.',
        'D3: el banco pide la fecha y el resultado del último simulacro de brecha de datos; el simulacro del expediente RGPD-2609-03 lo genera en esta misma demo.',
        'Nada sale sin la firma de Cumplimiento: en bloque solo las de confianza alta; las de confianza media se revisan una a una.'
      ],
      next_during: 'Enseñar D1 (citas y aviso de la alarma) y E3 (sin evidencia). Después «Aprobar las {alta} de confianza alta», aprobar {media_ids} una a una y «Asignar las {flagged} sin fuente».'
    },
    sources: {
      'MAN-PBC-003': {
        type: 'doc', kind: 'Manual', code: 'MAN-PBC-003', title: 'Manual de prevención del blanqueo de capitales y de la financiación del terrorismo', system: 'Procedimientos', version: '7', date: '2026-02-16', owner: 'Responsable de Cumplimiento (PBC y RGPD)',
        org: 'Mora & Jordano · Cumplimiento',
        sections: [
          { id: '2', heading: '2. Marco normativo', page: 3, text: 'El despacho es sujeto obligado conforme al artículo 2.1.ñ) de la Ley 10/2010, de prevención del blanqueo de capitales y de la financiación del terrorismo, cuando participa en operaciones por cuenta de clientes. El manual desarrolla esa ley y su Reglamento, aprobado por el Real Decreto 304/2014.' },
          { id: '3', heading: '3. Organización', page: 5, text: 'El Órgano de Control Interno se reúne trimestralmente y lo preside el Socio director. El representante ante el SEPBLAC es el Responsable de Cumplimiento (PBC y RGPD).' },
          { id: '5', heading: '5. Diligencia debida', page: 8, text: 'No se abre ningún expediente sin identificación formal del cliente y de su titular real. Se considera titular real a toda persona física que posea o controle más del 25 % del capital o de los derechos de voto, y la información se contrasta con el Registro Central de Titularidades Reales.\n\nLos clientes de riesgo alto y las personas con responsabilidad pública reciben diligencia reforzada: origen de los fondos y aprobación del Socio director.' },
          { id: '6', heading: '6. Suspensión del encargo', page: 10, text: 'Si la diligencia debida no se completa, el encargo queda en suspenso y no se presta el servicio.' },
          { id: '8', heading: '8. Comunicación de operaciones', page: 13, text: 'Las operaciones con indicios de blanqueo se examinan y, en su caso, se comunican al SEPBLAC sin demora, salvo en el ejercicio de la defensa o el asesoramiento sobre la posición jurídica del cliente (artículo 22 de la Ley 10/2010).' },
          { id: '9', heading: '9. Conservación de documentos', page: 15, text: 'La documentación de diligencia debida se conserva durante 10 años desde la terminación de la relación de negocio.' },
          { id: '11', heading: '11. Formación', page: 17, text: 'Formación anual obligatoria en PBC/FT para todos los profesionales del despacho.' },
          { id: '12', heading: '12. Examen externo', page: 18, text: 'Un experto externo examina los procedimientos de control interno cada tres años (artículo 28 de la Ley 10/2010); el último informe es de diciembre de 2024.' }
        ]
      },
      'POL-CON-002': {
        type: 'doc', kind: 'Política', code: 'POL-CON-002', title: 'Política de conflictos de intereses y aceptación de encargos', system: 'Procedimientos', version: '5', date: '2026-01-19', owner: 'Socio director',
        sections: [
          { id: '2', heading: '2. Principios', page: 2, text: 'La política aplica el artículo 12 del Código Deontológico de la Abogacía Española y el Estatuto General de la Abogacía Española (Real Decreto 135/2021).' },
          { id: '3', heading: '3. Comprobación previa', page: 3, text: 'Antes de aceptar un encargo se comprueban en el Gestor de expedientes el cliente, la parte contraria y las sociedades de sus grupos frente a todos los asuntos del despacho de los últimos diez años. Ningún encargo se acepta sin la comprobación de conflictos firmada.' },
          { id: '4', heading: '4. Resolución', page: 4, text: 'Si existe conflicto, el encargo no se acepta o, cuando la norma lo permite, se acepta con el consentimiento informado y por escrito de los clientes afectados. La decisión corresponde al Socio director.' },
          { id: '5', heading: '5. Barreras de información', page: 5, text: 'Cuando se acepta un asunto con consentimiento, se establecen barreras de información: equipos separados y acceso restringido al expediente en iManage.' }
        ]
      },
      'PRO-PLZ-001': {
        type: 'doc', kind: 'Protocolo', code: 'PRO-PLZ-001', title: 'Protocolo de control de plazos procesales', system: 'Procedimientos', version: '9', date: '2026-03-02', owner: 'Socio responsable de Procesal',
        sections: [
          { id: '2', heading: '2. Recepción de notificaciones', page: 2, text: 'Las notificaciones de LexNET se revisan cada día hábil antes de las 10:00 y se asignan al expediente y al letrado responsable el mismo día.' },
          { id: '3', heading: '3. Cómputo', page: 3, text: 'Los plazos se computan por días hábiles conforme a los artículos 133 a 136 de la Ley de Enjuiciamiento Civil, con agosto inhábil y los festivos de la sede del órgano judicial.' },
          { id: '4', heading: '4. Doble control', page: 4, text: 'Cada plazo lo calcula un miembro de Secretaría procesal y lo valida el letrado responsable; el Gestor de expedientes avisa a los 10, 5 y 2 días del vencimiento.' },
          { id: '6', heading: '6. Ausencias', page: 6, text: 'Las ausencias del letrado responsable se cubren con un sustituto designado en el expediente.' }
        ]
      },
      'PRO-RGPD-005': {
        type: 'doc', kind: 'Protocolo', code: 'PRO-RGPD-005', title: 'Protocolo de protección de datos y gestión de brechas de seguridad', system: 'Procedimientos', version: '4', date: '2025-11-24', owner: 'Delegado de Protección de Datos',
        sections: [
          { id: '2', heading: '2. Posición del despacho', page: 2, text: 'En el asesoramiento y la defensa jurídica, el despacho actúa como responsable del tratamiento, sujeto al secreto profesional. Cuando un cliente encarga un servicio que implica tratar datos por su cuenta, se firma un contrato de encargado del tratamiento conforme al artículo 28 del RGPD.' },
          { id: '3', heading: '3. Delegado de Protección de Datos', page: 3, text: 'El despacho tiene designado un Delegado de Protección de Datos, comunicado a la Agencia Española de Protección de Datos.' },
          { id: '6', heading: '6. Brechas de seguridad', page: 7, text: 'Toda brecha se registra y se evalúa en un máximo de 24 horas; si supone un riesgo para los derechos de los interesados, se notifica a la AEPD en 72 horas (artículo 33 del RGPD) y, si el riesgo es alto, a los interesados (artículo 34).' },
          { id: '7', heading: '7. Simulacros', page: 8, text: 'Se realiza al menos un simulacro de brecha de datos al año.' }
        ]
      },
      'POL-SEG-006': {
        type: 'doc', kind: 'Política', code: 'POL-SEG-006', title: 'Política de seguridad de la información y continuidad de negocio', system: 'Procedimientos', version: '6', date: '2026-01-26', owner: 'Sistemas y seguridad de la información',
        sections: [
          { id: '3', heading: '3. Control de acceso', page: 3, text: 'El acceso a los sistemas del despacho exige doble factor de autenticación. Los permisos sobre expedientes se conceden por asunto y se revisan cada seis meses.' },
          { id: '4', heading: '4. Cifrado', page: 4, text: 'Los documentos se cifran en reposo y en tránsito; los envíos externos de documentos confidenciales se hacen por enlace seguro de iManage con caducidad.' },
          { id: '5', heading: '5. Proveedores y ubicación de los datos', page: 5, text: 'Los proveedores tecnológicos que tratan datos de clientes se homologan antes de contratarlos, firman un contrato de encargado del tratamiento y alojan los datos en la Unión Europea.' },
          { id: '8', heading: '8. Continuidad de negocio', page: 9, text: 'Las copias de seguridad son diarias y se replican en un segundo centro de datos de la UE. Objetivos: recuperar los sistemas críticos (LexNET, Gestor de expedientes e iManage) en menos de 4 horas, con una pérdida máxima de datos de 24 horas. El plan de continuidad se prueba una vez al año.' }
        ]
      },
      'POL-HON-004': {
        type: 'doc', kind: 'Política', code: 'POL-HON-004', title: 'Política de honorarios y hoja de encargo', system: 'Procedimientos', version: '3', date: '2025-12-09', owner: 'Socio director',
        sections: [
          { id: '2', heading: '2. Hoja de encargo', page: 2, text: 'Todo asunto empieza con una hoja de encargo firmada que fija el objeto, el equipo, los honorarios o su forma de cálculo y la provisión de fondos.' },
          { id: '3', heading: '3. Modalidades', page: 3, text: 'Los honorarios se pactan por tarifa horaria por categoría profesional, por importe cerrado o por fases procesales; las tarifas se revisan una vez al año.' },
          { id: '4', heading: '4. Información al cliente', page: 4, text: 'Las minutas detallan las actuaciones y, en tarifa horaria, las horas imputadas por profesional. Si se prevé superar el presupuesto, se informa al cliente antes de seguir.' }
        ]
      },
      'POL-IA-007': {
        type: 'doc', kind: 'Política', code: 'POL-IA-007', title: 'Política de uso de inteligencia artificial generativa', system: 'Procedimientos', version: '2', date: '2026-04-20', owner: 'Socio director',
        sections: [
          { id: '2', heading: '2. Herramientas autorizadas', page: 2, text: 'Solo pueden usarse con datos de clientes las herramientas de IA generativa autorizadas por el despacho, con datos alojados en la UE y sin uso de los datos para entrenar modelos de terceros.' },
          { id: '3', heading: '3. Revisión humana', page: 3, text: 'Ningún escrito, informe o comunicación generado con IA se envía a un cliente o a un órgano judicial sin la revisión y la firma del letrado responsable.' },
          { id: '4', heading: '4. Prohibiciones', page: 3, text: 'Está prohibido introducir datos de clientes en herramientas de IA de uso público o con cuentas personales.' }
        ]
      },
      'CERT-RC-2026': {
        type: 'doc', kind: 'Certificado', code: 'CERT-RC-2026', title: 'Certificado de seguro de responsabilidad civil profesional 2026', system: 'Procedimientos', date: '2026-01-02', owner: 'Socio director',
        org: 'Correduría del despacho · certificado de la aseguradora',
        sections: [
          { id: '1', heading: 'Datos de la póliza', page: 1, text: 'Póliza de responsabilidad civil profesional n.º RCP-2026-48213, emitida por Bética Seguros Profesionales. Asegurados: el despacho y todos sus abogados y profesionales.' },
          { id: '2', heading: 'Límites y vigencia', page: 1, text: 'Límite de indemnización: 3.000.000 € por siniestro y año. Franquicia: 15.000 € por siniestro. Vigencia: del 01/01/2026 al 31/12/2026, con renovación anual.' }
        ]
      },
      'CERT-ISO-27001': {
        type: 'doc', kind: 'Certificado', code: 'CERT-ISO-27001', title: 'Certificado ISO/IEC 27001:2022 del sistema de gestión de seguridad de la información', system: 'Procedimientos', date: '2025-06-16',
        org: 'Entidad de certificación acreditada por ENAC',
        sections: [
          { id: '1', heading: 'Alcance', page: 1, text: 'Sistema de gestión de seguridad de la información que da soporte a los servicios de asesoramiento jurídico y defensa letrada prestados desde las sedes de Málaga y Córdoba. Certificado n.º SGSI-2025-0716, válido hasta el 15/06/2028.' },
          { id: '2', heading: 'Auditoría de seguimiento', page: 2, text: 'Auditoría de seguimiento de 2026 realizada el 04/06/2026: sin no conformidades mayores y 2 no conformidades menores.' }
        ]
      },
      'MEM-2025': {
        type: 'doc', kind: 'Memoria', code: null, label: 'Memoria del despacho 2025', title: 'Memoria anual del despacho 2025', system: 'Procedimientos', date: '2026-03-31',
        org: 'Mora & Jordano · Dirección del despacho',
        sections: [
          { id: '1', heading: '1. El despacho', page: 4, text: 'Mora & Jordano presta servicios desde su sede principal en Málaga (Calle Linaje 3) y su sede de Córdoba (Avenida Gran Capitán 46), con 34 profesionales a 31/12/2025.' },
          { id: '2', heading: '2. Áreas de práctica', page: 5, text: 'Áreas de práctica: Fiscal y Tributario, Procesal, Civil y Mercantil, con equipos de reestructuraciones, concursal y empresa familiar.' },
          { id: '3', heading: '3. Colegiación', page: 6, text: 'Todos los abogados del despacho están colegiados como ejercientes en el Ilustre Colegio de Abogados de Málaga o en el de Córdoba.' }
        ]
      },
      'GEX-CONF': {
        type: 'record', kind: 'Conflictos de intereses', code: 'Conflictos 2025', title: 'Comprobaciones de conflictos de intereses · actividad', system: 'Gestor de expedientes',
        org: 'Gestor de expedientes · aceptación de encargos',
        sections: [
          { id: 'act', heading: 'Actividad 2025', text: 'Comprobaciones de conflictos realizadas en 2025: 1.146; conflictos detectados: 23; encargos no aceptados por conflicto: 9; encargos aceptados con consentimiento informado por escrito y barrera de información: 14.' }
        ]
      },
      'GEX-PBC': {
        type: 'record', kind: 'Diligencia debida', code: 'PBC 2025', title: 'Diligencia debida de clientes · PBC/FT', system: 'Gestor de expedientes',
        org: 'Gestor de expedientes · fichas de cliente y PBC',
        sections: [
          { id: 'dd', heading: 'Situación a 31/08/2026', text: 'Clientes con diligencia debida completa: 1.412 de 1.418; los 6 pendientes tienen el encargo en suspenso hasta completarla.' },
          { id: 'form', heading: 'Formación 2025', text: 'Formación PBC/FT 2025: 33 de 34 profesionales (97 %); la persona pendiente se incorporó en diciembre y tiene plazo abierto.' }
        ]
      },
      'GEX-PLZ': {
        type: 'record', kind: 'Plazos procesales', code: 'Plazos 2025', title: 'Control de plazos procesales · actividad', system: 'Gestor de expedientes',
        org: 'Gestor de expedientes · agenda procesal',
        sections: [
          { id: 'act', heading: 'Actividad 2025', text: 'Notificaciones de LexNET recibidas en 2025: 6.390. Plazos procesales registrados: 4.812, todos con doble control; plazos vencidos sin actuación: 0.' },
          { id: 'dist', heading: 'Plazos por área en 2025', list: ['Procesal: 3.968 plazos', 'Fiscal y Tributario (recursos y reclamaciones económico-administrativas): 612 plazos', 'Mercantil y Civil: 232 plazos'] }
        ]
      },
      'IMAN-SEC': {
        type: 'record', kind: 'Configuración', code: 'iManage · seguridad', title: 'Repositorio documental · configuración de seguridad', system: 'iManage',
        org: 'iManage · administración del repositorio',
        sections: [
          { id: 'cfg', heading: 'Configuración vigente', text: 'Cifrado AES-256 en reposo y TLS 1.2 o superior en tránsito. Alojamiento: centros de datos en Fráncfort y Ámsterdam (UE). Cuentas con doble factor de autenticación: 100 %.' }
        ]
      },
      'SIG-ENC': {
        type: 'record', kind: 'Hojas de encargo', code: 'Encargos 2025', title: 'Hojas de encargo firmadas', system: 'Signaturit',
        org: 'Signaturit · firma electrónica de hojas de encargo',
        sections: [
          { id: 'f', heading: 'Actividad 2025', text: 'Hojas de encargo firmadas electrónicamente en 2025: 312; asuntos facturados con hoja de encargo firmada: 100 %.' }
        ]
      }
    },
    questions: [
      {
        id: 'A1', ref: 'BM-PJ §1.1', sec: 'A', topic: 'Identificación y estructura del despacho', conf: 'alta',
        qEn: 'Provide the firm’s name, offices, number of professionals and practice areas, and confirm that all lawyers are registered as practising members of a Bar.',
        qEs: 'Indique la denominación del despacho, sus sedes, el número de profesionales y las áreas de práctica, y confirme que todos los abogados están colegiados como ejercientes.',
        en: 'Mora & Jordano provides its services from its main office in Málaga (Calle Linaje 3) and its office in Córdoba (Avenida Gran Capitán 46), with 34 professionals at 31 December 2025 [1]. Our practice areas are Tax, Litigation, Civil and Corporate law, with restructuring, insolvency and family business teams [2]. All the firm’s lawyers are registered as practising members of the Málaga or Córdoba Bar [3].',
        es: 'Mora & Jordano presta servicios desde su sede principal en Málaga (Calle Linaje 3) y su sede de Córdoba (Avenida Gran Capitán 46), con 34 profesionales a 31/12/2025 [1]. Nuestras áreas de práctica son Fiscal y Tributario, Procesal, Civil y Mercantil, con equipos de reestructuraciones, concursal y empresa familiar [2]. Todos los abogados del despacho están colegiados como ejercientes en el Ilustre Colegio de Abogados de Málaga o en el de Córdoba [3].',
        cites: [
          { src: 'MEM-2025', q: 'Mora & Jordano presta servicios desde su sede principal en Málaga (Calle Linaje 3) y su sede de Córdoba (Avenida Gran Capitán 46), con 34 profesionales a 31/12/2025.' },
          { src: 'MEM-2025', q: 'Áreas de práctica: Fiscal y Tributario, Procesal, Civil y Mercantil, con equipos de reestructuraciones, concursal y empresa familiar.' },
          { src: 'MEM-2025', q: 'Todos los abogados del despacho están colegiados como ejercientes en el Ilustre Colegio de Abogados de Málaga o en el de Córdoba.' }
        ]
      },
      {
        id: 'A2', ref: 'BM-PJ §1.3', sec: 'A', topic: 'Seguro de responsabilidad civil profesional', conf: 'alta',
        qEn: 'Does the firm hold professional indemnity insurance? State the insurer, the limit per claim and per year, the deductible and the policy period, and confirm who is insured.',
        qEs: '¿Tiene el despacho un seguro de responsabilidad civil profesional? Indique la aseguradora, el límite por siniestro y año, la franquicia y la vigencia, y quiénes están asegurados.',
        en: 'Yes. The firm holds professional indemnity policy no. RCP-2026-48213 issued by Bética Seguros Profesionales, covering the firm and all its lawyers and professionals [1]. The limit of indemnity is €3,000,000 per claim and per year, with a deductible of €15,000 per claim, and the policy runs from 1 January to 31 December 2026 with annual renewal [2].',
        es: 'Sí. El despacho tiene la póliza de responsabilidad civil profesional n.º RCP-2026-48213, emitida por Bética Seguros Profesionales, que asegura al despacho y a todos sus abogados y profesionales [1]. El límite de indemnización es de 3.000.000 € por siniestro y año, con una franquicia de 15.000 € por siniestro, y la vigencia va del 01/01/2026 al 31/12/2026, con renovación anual [2].',
        cites: [
          { src: 'CERT-RC-2026', q: 'Póliza de responsabilidad civil profesional n.º RCP-2026-48213, emitida por Bética Seguros Profesionales. Asegurados: el despacho y todos sus abogados y profesionales.' },
          { src: 'CERT-RC-2026', q: 'Límite de indemnización: 3.000.000 € por siniestro y año. Franquicia: 15.000 € por siniestro. Vigencia: del 01/01/2026 al 31/12/2026, con renovación anual.' }
        ]
      },
      {
        id: 'A3', ref: 'BM-PJ §1.4', sec: 'A', topic: 'Seguro de ciberriesgos', conf: 'none',
        qEn: 'Does the firm hold cyber insurance covering data breaches involving client information, including notification costs and third-party liability? State the limit.',
        qEs: '¿Tiene el despacho un seguro de ciberriesgos que cubra las brechas de datos de clientes, incluidos los costes de notificación y la responsabilidad frente a terceros? Indique el límite.',
        flag: {
          reason: 'Ninguno de los {doc_count} documentos indexados es una póliza o un certificado de seguro de ciberriesgos; el certificado de responsabilidad civil profesional no menciona esa cobertura.',
          context: 'Los bancos exigen cada vez más esta cobertura a los despachos de su panel. Agentic Platform no responde «No» ni da por incluida la cobertura en la póliza de RC: lo tiene que confirmar la correduría del despacho.',
          partial: [],
          missing: ['Póliza o certificado del seguro de ciberriesgos, si existe', 'Límite asegurado y coberturas (notificación, recuperación, responsabilidad frente a terceros)', 'Confirmación de la correduría sobre si la póliza de RC incluye riesgos cibernéticos']
        }
      },
      {
        id: 'B1', ref: 'BM-PJ §2.1', sec: 'B', topic: 'Programa de PBC/FT y responsable', conf: 'alta',
        qEn: 'Is the firm an obliged entity under Law 10/2010? Describe its AML/CFT governance, including the internal control body and the representative before SEPBLAC, and how suspicious transactions are handled.',
        qEs: '¿Es el despacho sujeto obligado de la Ley 10/2010? Describa su organización de PBC/FT, incluidos el órgano de control interno y el representante ante el SEPBLAC, y cómo trata las operaciones sospechosas.',
        en: 'Yes. The firm is an obliged entity under Article 2.1.ñ) of Law 10/2010 when it takes part in transactions on behalf of clients, and our manual implements that Law and Royal Decree 304/2014 [1]. The Internal Control Body meets quarterly and is chaired by the Managing Partner, and our representative before SEPBLAC is the Head of Compliance (AML and GDPR) [2]. Transactions with signs of money laundering are examined and, where appropriate, reported to SEPBLAC without delay, except when defending the client or advising on the client’s legal position (Article 22 of Law 10/2010) [3]. Due diligence records are kept for 10 years after the business relationship ends [4].',
        es: 'Sí. El despacho es sujeto obligado conforme al artículo 2.1.ñ) de la Ley 10/2010 cuando participa en operaciones por cuenta de clientes, y nuestro manual desarrolla esa ley y el Real Decreto 304/2014 [1]. El Órgano de Control Interno se reúne cada trimestre y lo preside el Socio director; el representante ante el SEPBLAC es el Responsable de Cumplimiento (PBC y RGPD) [2]. Las operaciones con indicios de blanqueo se examinan y, en su caso, se comunican al SEPBLAC sin demora, salvo en el ejercicio de la defensa o del asesoramiento sobre la posición jurídica del cliente (artículo 22 de la Ley 10/2010) [3]. La documentación de diligencia debida se conserva 10 años desde el fin de la relación de negocio [4].',
        cites: [
          { src: 'MAN-PBC-003', q: 'El despacho es sujeto obligado conforme al artículo 2.1.ñ) de la Ley 10/2010' },
          { src: 'MAN-PBC-003', q: 'El Órgano de Control Interno se reúne trimestralmente y lo preside el Socio director. El representante ante el SEPBLAC es el Responsable de Cumplimiento (PBC y RGPD).' },
          { src: 'MAN-PBC-003', q: 'Las operaciones con indicios de blanqueo se examinan y, en su caso, se comunican al SEPBLAC sin demora, salvo en el ejercicio de la defensa o el asesoramiento sobre la posición jurídica del cliente (artículo 22 de la Ley 10/2010).' },
          { src: 'MAN-PBC-003', q: 'La documentación de diligencia debida se conserva durante 10 años desde la terminación de la relación de negocio.' }
        ]
      },
      {
        id: 'B2', ref: 'BM-PJ §2.2', sec: 'B', topic: 'Diligencia debida y titular real', conf: 'alta',
        qEn: 'Describe the firm’s client due diligence (KYC), including beneficial ownership, enhanced measures for high-risk clients and PEPs, and the current status of due diligence across the client base.',
        qEs: 'Describa la diligencia debida de clientes (KYC) del despacho, incluidos el titular real, las medidas reforzadas para clientes de riesgo alto y PEP, y la situación actual de la diligencia debida de su cartera.',
        en: 'No matter is opened without formal identification of the client and its beneficial owner; a beneficial owner is any natural person who owns or controls more than 25% of the capital or voting rights, and the information is checked against the Spanish Central Register of Beneficial Ownership [1]. High-risk clients and politically exposed persons are subject to enhanced due diligence, including source of funds and Managing Partner approval [2]. If due diligence is not completed, the engagement is suspended and no service is provided [3]. At 31 August 2026, 1,412 of 1,418 clients had complete due diligence, and the 6 outstanding engagements are suspended until it is completed [4].',
        es: 'No se abre ningún expediente sin identificación formal del cliente y de su titular real; se considera titular real a toda persona física que posea o controle más del 25 % del capital o de los derechos de voto, y la información se contrasta con el Registro Central de Titularidades Reales [1]. Los clientes de riesgo alto y las personas con responsabilidad pública reciben diligencia reforzada, con origen de los fondos y aprobación del Socio director [2]. Si la diligencia debida no se completa, el encargo queda en suspenso y no se presta el servicio [3]. A 31/08/2026, 1.412 de 1.418 clientes tenían la diligencia debida completa y los 6 pendientes tienen el encargo en suspenso hasta completarla [4].',
        cites: [
          { src: 'MAN-PBC-003', q: 'No se abre ningún expediente sin identificación formal del cliente y de su titular real. Se considera titular real a toda persona física que posea o controle más del 25 % del capital o de los derechos de voto, y la información se contrasta con el Registro Central de Titularidades Reales.' },
          { src: 'MAN-PBC-003', q: 'Los clientes de riesgo alto y las personas con responsabilidad pública reciben diligencia reforzada: origen de los fondos y aprobación del Socio director.' },
          { src: 'MAN-PBC-003', q: 'Si la diligencia debida no se completa, el encargo queda en suspenso y no se presta el servicio.' },
          { src: 'GEX-PBC', q: 'Clientes con diligencia debida completa: 1.412 de 1.418; los 6 pendientes tienen el encargo en suspenso hasta completarla.' }
        ]
      },
      {
        id: 'B3', ref: 'BM-PJ §2.4', sec: 'B', topic: 'Anticorrupción y canal interno de información', conf: 'none',
        qEn: 'Does the firm have an anti-bribery and corruption policy and an internal whistleblowing channel under Law 2/2023? When were they last reviewed?',
        qEs: '¿Tiene el despacho una política anticorrupción y un sistema interno de información conforme a la Ley 2/2023? ¿Cuándo se revisaron por última vez?',
        flag: {
          reason: 'La política anticorrupción y el sistema interno de información no están entre los {doc_count} documentos indexados.',
          context: 'La Ley 2/2023 obliga a tener un sistema interno de información a las entidades privadas con 50 o más trabajadores; con 34 profesionales puede que el despacho no esté obligado, pero el banco lo pregunta igualmente. Agentic Platform no afirma que exista ni supone una fecha de revisión.',
          partial: [],
          missing: ['Política anticorrupción, de regalos y de atenciones', 'Sistema interno de información o canal de denuncias, si existe, y su responsable', 'Fecha de la última revisión de ambos']
        }
      },
      {
        id: 'C1', ref: 'BM-PJ §3.1', sec: 'C', topic: 'Posición en el tratamiento y DPD', conf: 'alta',
        qEn: 'In what capacity will the firm process the bank’s personal data (controller or processor)? Will it sign a data processing agreement under Article 28 GDPR, and has it appointed a Data Protection Officer?',
        qEs: '¿En qué condición tratará el despacho los datos personales del banco (responsable o encargado del tratamiento)? ¿Firmará un contrato conforme al artículo 28 del RGPD? ¿Tiene designado un Delegado de Protección de Datos?',
        en: 'In legal advice and defence, the firm acts as data controller, bound by professional secrecy; where a client commissions a service that involves processing data on its behalf, we sign a data processing agreement under Article 28 GDPR [1]. The firm has appointed a Data Protection Officer, notified to the Spanish Data Protection Agency (AEPD) [2].',
        es: 'En el asesoramiento y la defensa jurídica, el despacho actúa como responsable del tratamiento, sujeto al secreto profesional; cuando un cliente encarga un servicio que implica tratar datos por su cuenta, firmamos un contrato de encargado del tratamiento conforme al artículo 28 del RGPD [1]. El despacho tiene designado un Delegado de Protección de Datos, comunicado a la Agencia Española de Protección de Datos [2].',
        cites: [
          { src: 'PRO-RGPD-005', q: 'En el asesoramiento y la defensa jurídica, el despacho actúa como responsable del tratamiento, sujeto al secreto profesional. Cuando un cliente encarga un servicio que implica tratar datos por su cuenta, se firma un contrato de encargado del tratamiento conforme al artículo 28 del RGPD.' },
          { src: 'PRO-RGPD-005', q: 'El despacho tiene designado un Delegado de Protección de Datos, comunicado a la Agencia Española de Protección de Datos.' }
        ]
      },
      {
        id: 'C2', ref: 'BM-PJ §3.3', sec: 'C', topic: 'Certificación y controles de seguridad', conf: 'alta',
        qEn: 'Is the firm certified under ISO/IEC 27001 or the Spanish National Security Framework (ENS)? State the scope and validity, the result of the last audit, and the main access and encryption controls.',
        qEs: '¿Está el despacho certificado en ISO/IEC 27001 o en el Esquema Nacional de Seguridad (ENS)? Indique el alcance, la vigencia, el resultado de la última auditoría y los principales controles de acceso y cifrado.',
        en: 'Yes, under ISO/IEC 27001:2022: the certified information security management system supports the legal advice and litigation services provided from our Málaga and Córdoba offices, under certificate no. SGSI-2025-0716, valid until 15 June 2028 [1]. The 2026 surveillance audit, held on 4 June 2026, found no major and 2 minor non-conformities [2]. Access to our systems requires two-factor authentication, and matter permissions are granted per matter and reviewed every six months [3]. Our document repository uses AES-256 encryption at rest and TLS 1.2 or higher in transit, and 100% of accounts use two-factor authentication [4].',
        es: 'Sí, en ISO/IEC 27001:2022: el sistema de gestión certificado da soporte a los servicios de asesoramiento jurídico y defensa letrada prestados desde las sedes de Málaga y Córdoba, con el certificado n.º SGSI-2025-0716, válido hasta el 15/06/2028 [1]. La auditoría de seguimiento de 2026, del 04/06/2026, se cerró sin no conformidades mayores y con 2 menores [2]. El acceso a los sistemas exige doble factor de autenticación y los permisos sobre expedientes se conceden por asunto y se revisan cada seis meses [3]. El repositorio documental usa cifrado AES-256 en reposo y TLS 1.2 o superior en tránsito, y el 100 % de las cuentas tiene doble factor [4].',
        cites: [
          { src: 'CERT-ISO-27001', q: 'Sistema de gestión de seguridad de la información que da soporte a los servicios de asesoramiento jurídico y defensa letrada prestados desde las sedes de Málaga y Córdoba. Certificado n.º SGSI-2025-0716, válido hasta el 15/06/2028.' },
          { src: 'CERT-ISO-27001', q: 'Auditoría de seguimiento de 2026 realizada el 04/06/2026: sin no conformidades mayores y 2 no conformidades menores.' },
          { src: 'POL-SEG-006', q: 'El acceso a los sistemas del despacho exige doble factor de autenticación. Los permisos sobre expedientes se conceden por asunto y se revisan cada seis meses.' },
          { src: 'IMAN-SEC', q: 'Cifrado AES-256 en reposo y TLS 1.2 o superior en tránsito.' }
        ]
      },
      {
        id: 'C3', ref: 'BM-PJ §3.5', sec: 'C', topic: 'Subcontratación y ubicación de los datos', conf: 'alta',
        qEn: 'Does the firm use subcontractors or technology providers that process client data? How are they approved, and where is client data hosted?',
        qEs: '¿Utiliza el despacho subcontratistas o proveedores tecnológicos que traten datos de clientes? ¿Cómo se homologan y dónde se alojan los datos de los clientes?',
        en: 'Technology providers that process client data are approved before they are engaged, sign a data processing agreement and host the data in the European Union [1]. Our document repository is hosted in data centres in Frankfurt and Amsterdam (EU) [2]. Backups are taken daily and replicated to a second data centre in the EU [3].',
        es: 'Los proveedores tecnológicos que tratan datos de clientes se homologan antes de contratarlos, firman un contrato de encargado del tratamiento y alojan los datos en la Unión Europea [1]. Nuestro repositorio documental se aloja en centros de datos de Fráncfort y Ámsterdam (UE) [2]. Las copias de seguridad son diarias y se replican en un segundo centro de datos de la UE [3].',
        cites: [
          { src: 'POL-SEG-006', q: 'Los proveedores tecnológicos que tratan datos de clientes se homologan antes de contratarlos, firman un contrato de encargado del tratamiento y alojan los datos en la Unión Europea.' },
          { src: 'IMAN-SEC', q: 'Alojamiento: centros de datos en Fráncfort y Ámsterdam (UE).' },
          { src: 'POL-SEG-006', q: 'Las copias de seguridad son diarias y se replican en un segundo centro de datos de la UE.' }
        ]
      },
      {
        id: 'D1', ref: 'BM-PJ §4.1', sec: 'D', topic: 'Conflictos de intereses', conf: 'alta',
        qEn: 'Describe how the firm identifies and manages conflicts of interest before accepting an engagement, including information barriers. How many conflicts were detected last year and how were they resolved?',
        qEs: 'Describa cómo identifica y gestiona el despacho los conflictos de intereses antes de aceptar un encargo, incluidas las barreras de información. ¿Cuántos conflictos se detectaron el último año y cómo se resolvieron?',
        en: 'Our policy applies Article 12 of the Spanish Code of Professional Conduct for Lawyers and the General Statute of the Spanish Legal Profession [1]. Before accepting an engagement, the client, the opposing party and their group companies are checked in our matter management system against all the firm’s matters of the last ten years, and no engagement is accepted without a signed conflict check [2]. If there is a conflict, the engagement is declined or, where the rules allow, accepted with the informed written consent of the affected clients [3]. In 2025 we ran 1,146 conflict checks and detected 23 conflicts: 9 engagements were declined and 14 were accepted with informed written consent and an information barrier [4].',
        es: 'Nuestra política aplica el artículo 12 del Código Deontológico de la Abogacía Española y el Estatuto General de la Abogacía Española [1]. Antes de aceptar un encargo se comprueban en el Gestor de expedientes el cliente, la parte contraria y las sociedades de sus grupos frente a todos los asuntos del despacho de los últimos diez años, y ningún encargo se acepta sin la comprobación de conflictos firmada [2]. Si existe conflicto, el encargo no se acepta o, cuando la norma lo permite, se acepta con el consentimiento informado y por escrito de los clientes afectados [3]. En 2025 hicimos 1.146 comprobaciones y detectamos 23 conflictos: 9 encargos no se aceptaron y 14 se aceptaron con consentimiento informado por escrito y barrera de información [4].',
        cites: [
          { src: 'POL-CON-002', q: 'La política aplica el artículo 12 del Código Deontológico de la Abogacía Española y el Estatuto General de la Abogacía Española' },
          { src: 'POL-CON-002', q: 'Antes de aceptar un encargo se comprueban en el Gestor de expedientes el cliente, la parte contraria y las sociedades de sus grupos frente a todos los asuntos del despacho de los últimos diez años. Ningún encargo se acepta sin la comprobación de conflictos firmada.' },
          { src: 'POL-CON-002', q: 'Si existe conflicto, el encargo no se acepta o, cuando la norma lo permite, se acepta con el consentimiento informado y por escrito de los clientes afectados.' },
          { src: 'GEX-CONF', q: 'Comprobaciones de conflictos realizadas en 2025: 1.146; conflictos detectados: 23; encargos no aceptados por conflicto: 9; encargos aceptados con consentimiento informado por escrito y barrera de información: 14.' }
        ],
        note: {
          tone: 'warn', icon: 'alert-triangle', title: 'Notificación LexNET de hoy · PO 1184/2026',
          text: 'A las 08:12 ha llegado por LexNET una demanda de juicio ordinario contra Aceites Sierra Subbética, S.L. (Juzgado de Primera Instancia nº 7 de Málaga). El despacho asesoró en 2025 a la parte demandante: posible conflicto del artículo 12 del Código Deontológico (expediente PRC-2026-0412). La respuesta describe la política, no el caso de hoy.',
          outcome: 'alarma', tone_done: 'brand', with: { approved: 'En la alarma: {label}.', any: 'En la alarma se ha rechazado la propuesta del agente.' },
          without: 'La decisión sobre la aceptación del encargo se toma en la escena de la alarma.',
          go: 'alarma', goLabel: 'Abrir la alarma'
        }
      },
      {
        id: 'D2', ref: 'BM-PJ §4.2', sec: 'D', topic: 'Control de plazos procesales', conf: 'alta',
        qEn: 'How does the firm receive court notifications and control procedural deadlines? Describe the controls in place and the results of the last year.',
        qEs: '¿Cómo recibe el despacho las notificaciones judiciales y controla los plazos procesales? Describa los controles y los resultados del último año.',
        en: 'LexNET notifications are reviewed every working day before 10:00 and assigned to the matter and the responsible lawyer on the same day [1]. Deadlines are counted in working days under Articles 133 to 136 of the Spanish Civil Procedure Act (LEC), with August excluded and the public holidays of the court’s seat [2]. Each deadline is calculated by a member of the litigation secretariat and validated by the responsible lawyer, and the matter management system sends reminders 10, 5 and 2 days before it expires [3]. In 2025 we recorded 4,812 procedural deadlines, all double-checked, with no deadline missed [4].',
        es: 'Las notificaciones de LexNET se revisan cada día hábil antes de las 10:00 y se asignan al expediente y al letrado responsable el mismo día [1]. Los plazos se computan por días hábiles conforme a los artículos 133 a 136 de la LEC, con agosto inhábil y los festivos de la sede del órgano judicial [2]. Cada plazo lo calcula un miembro de Secretaría procesal y lo valida el letrado responsable, y el Gestor de expedientes avisa a los 10, 5 y 2 días del vencimiento [3]. En 2025 registramos 4.812 plazos procesales, todos con doble control, y ningún plazo venció sin actuación [4].',
        cites: [
          { src: 'PRO-PLZ-001', q: 'Las notificaciones de LexNET se revisan cada día hábil antes de las 10:00 y se asignan al expediente y al letrado responsable el mismo día.' },
          { src: 'PRO-PLZ-001', q: 'Los plazos se computan por días hábiles conforme a los artículos 133 a 136 de la Ley de Enjuiciamiento Civil, con agosto inhábil y los festivos de la sede del órgano judicial.' },
          { src: 'PRO-PLZ-001', q: 'Cada plazo lo calcula un miembro de Secretaría procesal y lo valida el letrado responsable; el Gestor de expedientes avisa a los 10, 5 y 2 días del vencimiento.' },
          { src: 'GEX-PLZ', q: 'Plazos procesales registrados: 4.812, todos con doble control; plazos vencidos sin actuación: 0.' }
        ]
      },
      {
        id: 'D3', ref: 'BM-PJ §4.4', sec: 'D', topic: 'Continuidad de negocio y brechas de datos', conf: 'media',
        qEn: 'Describe the firm’s business continuity arrangements and its procedure for personal data breaches. Provide the date and outcome of the last data breach drill.',
        qEs: 'Describa la continuidad de negocio del despacho y su procedimiento ante brechas de datos personales. Indique la fecha y el resultado del último simulacro de brecha.',
        en: 'Backups are taken daily and replicated to a second EU data centre; our objectives are to recover critical systems (LexNET, the matter management system and iManage) within 4 hours with a maximum data loss of 24 hours, and the continuity plan is tested once a year [1]. Every breach is logged and assessed within 24 hours; where it poses a risk to data subjects’ rights it is notified to the AEPD within 72 hours (Article 33 GDPR) and, if the risk is high, to the data subjects (Article 34) [2]. At least one data breach drill is carried out every year [3].',
        es: 'Las copias de seguridad son diarias y se replican en un segundo centro de datos de la UE; los objetivos son recuperar los sistemas críticos (LexNET, Gestor de expedientes e iManage) en menos de 4 horas con una pérdida máxima de datos de 24 horas, y el plan de continuidad se prueba una vez al año [1]. Toda brecha se registra y se evalúa en un máximo de 24 horas; si supone un riesgo para los derechos de los interesados, se notifica a la AEPD en 72 horas (artículo 33 del RGPD) y, si el riesgo es alto, a los interesados (artículo 34) [2]. Hacemos al menos un simulacro de brecha de datos al año [3].',
        cites: [
          { src: 'POL-SEG-006', q: 'Objetivos: recuperar los sistemas críticos (LexNET, Gestor de expedientes e iManage) en menos de 4 horas, con una pérdida máxima de datos de 24 horas. El plan de continuidad se prueba una vez al año.' },
          { src: 'PRO-RGPD-005', q: 'Toda brecha se registra y se evalúa en un máximo de 24 horas; si supone un riesgo para los derechos de los interesados, se notifica a la AEPD en 72 horas (artículo 33 del RGPD) y, si el riesgo es alto, a los interesados (artículo 34).' },
          { src: 'PRO-RGPD-005', q: 'Se realiza al menos un simulacro de brecha de datos al año.' }
        ],
        gap: 'El banco pide la fecha y el resultado del último simulacro de brecha de datos, y no están en las fuentes indexadas.',
        gapGo: 'retirada', gapGoLabel: 'Ejecutar el simulacro RGPD-2609-03', gapOutcome: 'retirada',
        gapOutcomeText: 'En esta sesión ya hay un simulacro sobre el expediente RGPD-2609-03: {label}. Añádelo a la respuesta si procede.'
      },
      {
        id: 'E1', ref: 'BM-PJ §5.1', sec: 'E', topic: 'Honorarios y hoja de encargo', conf: 'alta',
        qEn: 'Describe the firm’s fee arrangements, how fees are agreed with the client and the level of detail in invoices. Is every matter covered by a signed engagement letter?',
        qEs: 'Describa las modalidades de honorarios del despacho, cómo se pactan con el cliente y el detalle de las minutas. ¿Tiene cada asunto una hoja de encargo firmada?',
        en: 'Every matter starts with a signed engagement letter setting out the scope, the team, the fees or how they are calculated, and the advance on costs [1]. Fees are agreed as hourly rates by professional category, as a fixed fee or by procedural stage, and rates are reviewed once a year [2]. Invoices itemise the work done and, for hourly billing, the hours recorded by each professional; if the budget is expected to be exceeded, the client is informed before work continues [3]. In 2025 we signed 312 engagement letters electronically, and 100% of invoiced matters had a signed engagement letter [4].',
        es: 'Todo asunto empieza con una hoja de encargo firmada que fija el objeto, el equipo, los honorarios o su forma de cálculo y la provisión de fondos [1]. Los honorarios se pactan por tarifa horaria por categoría profesional, por importe cerrado o por fases procesales, y las tarifas se revisan una vez al año [2]. Las minutas detallan las actuaciones y, en tarifa horaria, las horas imputadas por profesional; si se prevé superar el presupuesto, se informa al cliente antes de seguir [3]. En 2025 firmamos electrónicamente 312 hojas de encargo y el 100 % de los asuntos facturados tenía hoja de encargo firmada [4].',
        cites: [
          { src: 'POL-HON-004', q: 'Todo asunto empieza con una hoja de encargo firmada que fija el objeto, el equipo, los honorarios o su forma de cálculo y la provisión de fondos.' },
          { src: 'POL-HON-004', q: 'Los honorarios se pactan por tarifa horaria por categoría profesional, por importe cerrado o por fases procesales; las tarifas se revisan una vez al año.' },
          { src: 'POL-HON-004', q: 'Las minutas detallan las actuaciones y, en tarifa horaria, las horas imputadas por profesional. Si se prevé superar el presupuesto, se informa al cliente antes de seguir.' },
          { src: 'SIG-ENC', q: 'Hojas de encargo firmadas electrónicamente en 2025: 312; asuntos facturados con hoja de encargo firmada: 100 %.' }
        ]
      },
      {
        id: 'E2', ref: 'BM-PJ §5.3', sec: 'E', topic: 'Uso de IA generativa con datos de clientes', conf: 'media',
        qEn: 'Does the firm use generative AI tools with client data? Describe the controls, confirm where data is processed and whether it is used to train models, and list the tools authorised.',
        qEs: '¿Utiliza el despacho herramientas de IA generativa con datos de clientes? Describa los controles, confirme dónde se tratan los datos y si se usan para entrenar modelos, e indique las herramientas autorizadas.',
        en: 'Only generative AI tools authorised by the firm may be used with client data, with the data hosted in the EU and never used to train third-party models [1]. No document, report or communication generated with AI is sent to a client or a court without review and signature by the responsible lawyer [2]. Entering client data into public AI tools or personal accounts is prohibited [3].',
        es: 'Solo pueden usarse con datos de clientes las herramientas de IA generativa autorizadas por el despacho, con datos alojados en la UE y sin uso de los datos para entrenar modelos de terceros [1]. Ningún escrito, informe o comunicación generado con IA se envía a un cliente o a un órgano judicial sin la revisión y la firma del letrado responsable [2]. Está prohibido introducir datos de clientes en herramientas de IA de uso público o con cuentas personales [3].',
        cites: [
          { src: 'POL-IA-007', q: 'Solo pueden usarse con datos de clientes las herramientas de IA generativa autorizadas por el despacho, con datos alojados en la UE y sin uso de los datos para entrenar modelos de terceros.' },
          { src: 'POL-IA-007', q: 'Ningún escrito, informe o comunicación generado con IA se envía a un cliente o a un órgano judicial sin la revisión y la firma del letrado responsable.' },
          { src: 'POL-IA-007', q: 'Está prohibido introducir datos de clientes en herramientas de IA de uso público o con cuentas personales.' }
        ],
        gap: 'El banco pide la relación de herramientas autorizadas: la política no la incluye y el inventario de herramientas de IA y su evaluación de impacto no están en las fuentes indexadas.'
      },
      {
        id: 'E3', ref: 'BM-PJ · adicional', sec: 'E', topic: 'Reclamaciones y expedientes disciplinarios', conf: 'none',
        qEn: 'In the last five years, has the firm or any of its lawyers been subject to a professional liability claim, a disciplinary proceeding by a Bar association or a regulatory sanction?',
        qEs: 'En los últimos cinco años, ¿ha sido el despacho o alguno de sus abogados objeto de una reclamación de responsabilidad profesional, de un expediente disciplinario colegial o de una sanción administrativa?',
        flag: {
          reason: 'Ninguno de los {doc_count} documentos indexados recoge reclamaciones de responsabilidad profesional, expedientes disciplinarios colegiales ni sanciones.',
          context: 'Es la pregunta que más pesa en la homologación. Una respuesta «No» sin evidencia sería una declaración falsa si existiera una reclamación o un expediente: la confirma el Socio director con la correduría y con los colegios de abogados.',
          partial: [],
          missing: ['Relación de siniestros declarados a la póliza de responsabilidad civil en los últimos cinco años y su estado', 'Expedientes disciplinarios de los Colegios de Abogados de Málaga y Córdoba, si los hay', 'Confirmación firmada por el Socio director']
        }
      }
    ]
  }
});
