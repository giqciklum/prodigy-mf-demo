/* Banco Cierzo · Wolfsberg CBDDQ v1.4 solicitado por Nordbank AG (banco corresponsal). Entidades ficticias; datos sintéticos (MFM). */
agenticPack('banca', {
  cuestionario: {
    agent: 'Cuestionarios de cliente',
    lang: 'en',
    default_sel: 'D1',
    reviewer: 'Responsable de Cumplimiento Normativo',
    assignee: 'Unidad de PBC/FT de Cumplimiento',
    assignee_short: 'la Unidad de PBC/FT',
    team: 'Cumplimiento',
    assign_due: '2026-10-08',
    responder: 'Banco Cierzo, S.A.',
    site: 'Banco Cierzo, S.A. · servicios centrales (Madrid)',
    site_label: 'Entidad',
    page_title: 'Wolfsberg CBDDQ · Nordbank AG',
    report_title: 'Respuesta al cuestionario Wolfsberg CBDDQ',
    ref_label: 'Sección CBDDQ',
    scope_meta_label: 'Relación',
    discard_placeholder: 'Por ejemplo: se responde con el informe de experto externo adjunto',
    save_system: 'GRC Archer',
    qn: {
      code: 'CUE-2026-033',
      title: 'Wolfsberg Correspondent Banking Due Diligence Questionnaire (CBDDQ) v1.4',
      customer: 'Nordbank AG',
      via: 'Nordbank AG · Correspondent Banking KYC',
      received: '2026-09-28T09:15',
      due: '2026-10-14',
      file: 'Wolfsberg_CBDDQ_v1.4_Banco_Cierzo_2026.xlsx',
      scope: 'renovación periódica de la relación de corresponsalía en euros y dólares (cuenta loro de Banco Cierzo en Nordbank AG)',
      scope_short: 'Corresponsalía EUR y USD · revisión periódica',
      scope_label: 'renovación de la relación de corresponsalía'
    },
    email: {
      mailbox: 'buzón de Cumplimiento',
      headers: {
        From: 'Correspondent Banking KYC, Nordbank AG <cb-kyc@nordbank.example>',
        To: 'Cumplimiento Normativo, Banco Cierzo <cumplimiento@bancocierzo.example>',
        Date: 'Mon, 28 Sep 2026 09:15 (CET)',
        Subject: 'Periodic KYC review - Wolfsberg CBDDQ v1.4 - response due 14 October 2026'
      },
      text: 'Dear colleagues,\n\nAs part of the periodic KYC review of our correspondent banking relationship (EUR and USD accounts held by Banco Cierzo with Nordbank AG), please complete the attached Wolfsberg CBDDQ v1.4.\n\nFor this cycle we have selected 15 questions from the CBDDQ in five areas: entity, ownership and products; AML, CTF and sanctions programme; KYC, CDD and EDD; monitoring, sanctions and payment transparency; and training, audit and regulatory matters.\n\nPlease answer in English, reference the supporting policy or record for each answer, and have the questionnaire signed off by your Compliance Officer. We need the completed questionnaire by Wednesday 14 October 2026; otherwise the relationship will be escalated for review.\n\nKind regards,\n\nCorrespondent Banking KYC\nNordbank AG',
      highlights: [
        { text: 'Wolfsberg CBDDQ v1.4', label: 'Cuestionario', tone: 'brand' },
        { text: '15 questions', label: 'Preguntas', tone: 'brand' },
        { text: 'reference the supporting policy or record for each answer', label: 'Requisito' },
        { text: 'signed off by your Compliance Officer', label: 'Aprobación' },
        { text: 'Wednesday 14 October 2026', label: 'Plazo' }
      ]
    },
    sections: [
      { id: 'A', es: 'Entidad, propiedad y productos', en: 'Entity, ownership and products' },
      { id: 'B', es: 'Programa de PBC/FT y sanciones', en: 'AML, CTF and sanctions programme' },
      { id: 'C', es: 'KYC y diligencia debida', en: 'KYC, CDD and EDD' },
      { id: 'D', es: 'Seguimiento, sanciones y transparencia', en: 'Monitoring, sanctions and payment transparency' },
      { id: 'E', es: 'Formación, auditoría y supervisión', en: 'Training, audit and regulatory matters' }
    ],
    kpi: { label: 'Comunicaciones al SEPBLAC en 2025', value: 214, sub: '18.420 alertas de PBC/FT revisadas · 1.120 exámenes especiales', icon: 'shield-check' },
    sources_sub: 'Manual de PBC/FT, políticas, autoevaluación y cuentas anuales',
    identify_result: 'Nordbank AG · corresponsalía EUR y USD · 15 preguntas del CBDDQ v1.4',
    search_scope: 'manual de PBC/FT, políticas de sanciones, pagos y fraude, autoevaluación del riesgo y cuentas anuales',
    lookups: [
      { system: 'Core bancario T24', action: 'Consulta la distribución de clientes por riesgo, los PEP y el filtrado de sanciones', result: 'Riesgo alto 1,7 % · 412 PEP aprobados · 1,9 millones de transferencias filtradas en 2025', ms: 560 },
      { system: 'GRC Archer', action: 'Lee alertas, comunicaciones por indicio, formación y hallazgos de auditoría', result: '214 comunicaciones al SEPBLAC · formación 97,8 % · informe AI-2025-14', ms: 520 },
      { system: 'Falcon Fraud', action: 'Lee la configuración de la monitorización de fraude con tarjeta', result: '1.284 reglas activas · puntuación por operación en menos de 100 ms', ms: 340 },
      { system: 'Redsys', action: 'Cruza la pregunta de fraude con los expedientes abiertos', result: 'Expediente CPP-2609-07 abierto: punto común de compromiso en un TPV', ms: 300, tone: 'warn' },
      { system: 'Falcon Fraud', action: 'Cruza la pregunta de seguimiento con las alertas de hoy', result: 'BIN 454812: fraude CNP del 2,9 % desde las 02:10 · 186 operaciones', ms: 280, tone: 'warn' }
    ],
    compare: {
      people: '3–4: Cumplimiento, Auditoría interna, Medios de pago y, según la pregunta, Asesoría Jurídica',
      systems: '7–9: correo, Excel del corresponsal, manual de PBC/FT, T24, Archer, Falcon, cuentas anuales e informes de experto externo',
      steps: 'Buscar la evidencia de cada pregunta, copiar el CBDDQ del año anterior y actualizar cifras, pedir datos a otras áreas y traducir al inglés',
      time: '1–2 días de trabajo de Cumplimiento, repartidos en una semana'
    },
    presenter: {
      before: [
        'Cada corresponsal pide el CBDDQ de Wolfsberg en su revisión periódica. Si no se entrega a tiempo, la relación se escala y puede acabar cerrándose: es trabajo de Cumplimiento que no se puede retrasar.',
        'Este llega de Nordbank AG: {total} preguntas en inglés sobre propiedad, programa de PBC/FT, diligencia debida, sanciones y auditoría. El manual está en español; da igual.',
        'Al pulsar, Agentic Platform busca en el manual de PBC/FT, las políticas, la autoevaluación del riesgo y las cuentas anuales, y en los registros de T24, Archer, Falcon y Redsys, y redacta cada respuesta con su fuente.'
      ],
      during: [
        '{drafted} de {total} con borrador y cita, en inglés y con traducción; cada cita se comprueba contra el texto de la fuente. {flagged} quedan sin responder: activos virtuales, anticorrupción e historial de sanciones regulatorias. Sin documento, no se inventa nada.',
        'D1: además de responder, avisa del pico de fraude en el BIN 454812 de esta madrugada. La respuesta describe el programa, no el incidente, pero quien firma tiene que saberlo.',
        'D3: el corresponsal pide el resultado del último ejercicio ante un punto común de compromiso; el simulacro del expediente CPP-2609-07 lo genera en esta misma demo.',
        'Nada sale sin la firma de Cumplimiento: en bloque solo las de confianza alta; las de confianza media se revisan una a una.'
      ],
      next_during: 'Enseñar D1 (citas y aviso de la alarma) y E3 (sin evidencia). Después «Aprobar las {alta} de confianza alta», aprobar {media_ids} una a una y «Asignar las {flagged} sin fuente».'
    },
    sources: {
      'MAN-PBC-001': {
        type: 'doc', kind: 'Manual', code: 'MAN-PBC-001', title: 'Manual de prevención del blanqueo de capitales y de la financiación del terrorismo', system: 'Procedimientos', version: '12', date: '2026-03-24', owner: 'Responsable de Cumplimiento Normativo',
        org: 'Banco Cierzo · Cumplimiento',
        sections: [
          { id: '2', heading: '2. Marco normativo', page: 3, text: 'El manual desarrolla la Ley 10/2010, de prevención del blanqueo de capitales y de la financiación del terrorismo, y su Reglamento, aprobado por el Real Decreto 304/2014.' },
          { id: '3', heading: '3. Organización', page: 5, text: 'El Órgano de Control Interno (OCI) se reúne mensualmente. El Representante ante el SEPBLAC es el Responsable de Cumplimiento Normativo, con acceso directo al Consejo de Administración.' },
          { id: '4', heading: '4. Prohibiciones', page: 7, text: 'Está prohibido mantener relaciones con bancos pantalla y con entidades que permitan el uso de sus cuentas por bancos pantalla.' },
          { id: '5', heading: '5. Diligencia debida', page: 9, text: 'Cada cliente recibe una calificación de riesgo (bajo, medio o alto) al alta y en cada revisión. Los clientes de riesgo alto reciben diligencia reforzada: origen de los fondos y del patrimonio, aprobación de un directivo y revisión anual.\n\nRevisión periódica: anual para riesgo alto, cada tres años para riesgo medio y cada cinco años para riesgo bajo.' },
          { id: '6', heading: '6. Personas con responsabilidad pública', page: 12, text: 'Los clientes se cotejan con listas de personas con responsabilidad pública al alta y cada noche. Abrir o mantener una relación con un PEP requiere la aprobación del Responsable de Cumplimiento Normativo y acreditar el origen del patrimonio.' },
          { id: '7', heading: '7. Titularidad real', page: 14, text: 'Se identifica a toda persona física que posea o controle más del 25 % del capital o de los derechos de voto; si no existe, se identifica al administrador o directivo principal. La información se contrasta con el Registro Central de Titularidades Reales.' },
          { id: '8', heading: '8. Seguimiento y comunicación', page: 17, text: 'El seguimiento de operaciones combina escenarios automáticos en el core bancario y la revisión de alertas por analistas. Las operaciones sospechosas se comunican al SEPBLAC por indicio sin demora.' },
          { id: '9', heading: '9. Conservación de documentos', page: 19, text: 'Los documentos de diligencia debida y los registros de operaciones se conservan durante 10 años.' },
          { id: '11', heading: '11. Formación', page: 22, text: 'Formación anual obligatoria en PBC/FT para toda la plantilla, con módulos específicos para la red comercial, operaciones y Cumplimiento.' },
          { id: '12', heading: '12. Revisión independiente', page: 24, text: 'Auditoría interna revisa el programa cada año. Un experto externo emite un informe completo cada tres años e informes de seguimiento en los años intermedios (artículo 28 de la Ley 10/2010).' }
        ]
      },
      'POL-SAN-002': {
        type: 'doc', kind: 'Política', code: 'POL-SAN-002', title: 'Política de sanciones financieras internacionales', system: 'Procedimientos', version: '6', date: '2025-12-15', owner: 'Responsable de Cumplimiento Normativo',
        sections: [
          { id: '2', heading: '2. Regímenes aplicados', page: 2, text: 'Se aplican las sanciones de la Unión Europea y de las Naciones Unidas y, por política interna, las de OFAC (Estados Unidos) y OFSI (Reino Unido).' },
          { id: '4', heading: '4. Filtrado', page: 3, text: 'Clientes y transferencias se filtran en tiempo real; las coincidencias se revisan antes de liberar el pago. Las listas se actualizan en un plazo máximo de 24 h desde su publicación.' },
          { id: '5', heading: '5. Financiación de la proliferación', page: 4, text: 'El filtrado incluye a las personas y entidades designadas por financiación de la proliferación de armas de destrucción masiva.' }
        ]
      },
      'PR-PAG-004': {
        type: 'doc', kind: 'Procedimiento', code: 'PR-PAG-004', title: 'Transparencia de pagos e información que acompaña a las transferencias', system: 'Procedimientos', version: '3', date: '2026-01-12', owner: 'Responsable de Medios de Pago',
        sections: [
          { id: '3', heading: '3. Información del ordenante y del beneficiario', page: 2, text: 'Las transferencias incluyen los datos completos del ordenante y del beneficiario exigidos por el Reglamento (UE) 2023/1113; los mensajes entrantes incompletos se retienen y se solicitan los datos a la entidad ordenante.' },
          { id: '4', heading: '4. Formato', page: 3, text: 'Los pagos transfronterizos se cursan por SWIFT en formato ISO 20022 (pacs.008).' }
        ]
      },
      'POL-FRA-003': {
        type: 'doc', kind: 'Política', code: 'POL-FRA-003', title: 'Prevención del fraude en tarjetas', system: 'Procedimientos', owner: 'Responsable de Prevención del Fraude',
        sections: [
          { id: '3', heading: '3. Monitorización', page: 2, text: 'Las operaciones con tarjeta se monitorizan 24x7 en Falcon Fraud, con reglas y modelos de puntuación por operación.' },
          { id: '6', heading: '6. Punto común de compromiso', page: 5, text: 'Ante un punto común de compromiso se bloquean preventivamente las tarjetas expuestas, se reemiten y se avisa a los clientes y a las redes Visa y Mastercard.' }
        ]
      },
      'EBR-2025': {
        type: 'doc', kind: 'Informe', code: 'EBR-2025', title: 'Autoevaluación del riesgo de PBC/FT 2025', system: 'Procedimientos', date: '2026-03-24', owner: 'Responsable de Cumplimiento Normativo',
        sections: [
          { id: '2', heading: '2. Metodología', page: 3, text: 'Riesgo inherente por clientes, productos, canales de distribución y geografías; eficacia de los controles; riesgo residual.' },
          { id: '3', heading: '3. Alcance', page: 4, text: 'Incluye el riesgo de sanciones y de financiación de la proliferación.' },
          { id: '7', heading: '7. Conclusión', page: 21, text: 'Riesgo residual global: medio-bajo. Aprobada por el Consejo de Administración el 24/03/2026.' }
        ]
      },
      'CCAA-2025': {
        type: 'doc', kind: 'Cuentas anuales', code: null, label: 'Cuentas anuales 2025', title: 'Cuentas anuales e informe de gestión 2025', system: 'Procedimientos', date: '2026-04-28',
        org: 'Banco Cierzo, S.A. · cuentas formuladas por el Consejo y auditadas',
        sections: [
          { id: '1', heading: '1. Naturaleza de la entidad', page: 12, text: 'Banco Cierzo, S.A. es una entidad de crédito española, inscrita en el Registro de Entidades del Banco de España con el código 0239, con LEI 9598003HQ0CIERZ0B27. Sus acciones no cotizan en bolsa.' },
          { id: '1b', heading: '1. Supervisión', page: 12, text: 'La entidad está sujeta a la supervisión del Banco de España y, en materia de prevención del blanqueo de capitales, del SEPBLAC.' },
          { id: '19', heading: '19. Patrimonio neto', page: 58, text: 'Accionistas: Fundación Bancaria Cierzo (62 %) y unos 3.100 accionistas minoritarios (38 %); ninguna persona física posee o controla más del 25 %.' }
        ]
      },
      'T24-RISK': {
        type: 'record', kind: 'Cartera de clientes', code: 'Riesgo PBC/FT', title: 'Clientes por nivel de riesgo de PBC/FT', system: 'Core bancario T24',
        org: 'Core bancario T24 · calificación de riesgo de clientes',
        sections: [
          { id: 'dist', heading: 'Distribución a 31/08/2026', list: ['Riesgo bajo: 78,4 % de los clientes', 'Riesgo medio: 19,9 % de los clientes', 'Riesgo alto: 1,7 % de los clientes', 'Revisiones periódicas de riesgo alto vencidas: 0'] },
          { id: 'pep', heading: 'PEP', text: 'Clientes PEP activos: 412, todos con aprobación de Cumplimiento registrada.' }
        ]
      },
      'T24-SAN': {
        type: 'record', kind: 'Filtrado de sanciones', code: 'Filtrado 2025', title: 'Filtrado de sanciones · listas y actividad', system: 'Core bancario T24',
        org: 'Core bancario T24 · filtrado de clientes y pagos',
        sections: [
          { id: 'listas', heading: 'Listas cargadas', text: 'UE (consolidada, actualizada el 28/09/2026), ONU, OFAC SDN y OFSI.' },
          { id: 'act', heading: 'Actividad 2025', text: 'Transferencias filtradas en 2025: 1,9 millones; 3.204 coincidencias revisadas y 7 pagos bloqueados y comunicados.' }
        ]
      },
      'ARCHER-AML': {
        type: 'record', kind: 'Casos de PBC/FT', code: 'PBC/FT 2025', title: 'Alertas, exámenes especiales y comunicaciones', system: 'GRC Archer',
        org: 'GRC Archer · gestión de casos de Cumplimiento',
        sections: [
          { id: 'alert', heading: 'Actividad 2025', text: 'Alertas de seguimiento de PBC/FT en 2025: 18.420; 1.120 escaladas a examen especial y 214 comunicaciones por indicio al SEPBLAC.' }
        ]
      },
      'ARCHER-AUD': {
        type: 'record', kind: 'Hallazgos de auditoría', code: 'AI-2025-14', title: 'Revisión independiente del programa de PBC/FT', system: 'GRC Archer',
        org: 'GRC Archer · auditoría y recomendaciones',
        sections: [
          { id: 'ai', heading: 'Auditoría interna', text: 'Informe AI-2025-14 de Auditoría interna sobre el programa de PBC/FT, emitido el 12/12/2025: 4 recomendaciones de prioridad media.' },
          { id: 'ee', heading: 'Experto externo', text: 'Informe de seguimiento del experto externo correspondiente a 2025, emitido el 30/04/2026.' }
        ]
      },
      'ARCHER-FORM': {
        type: 'record', kind: 'Formación', code: 'Formación 2025', title: 'Formación en PBC/FT · cumplimiento del plan', system: 'GRC Archer',
        org: 'GRC Archer · formación obligatoria',
        sections: [
          { id: 'f', heading: 'Plan 2025', text: 'Formación PBC/FT 2025: 2.946 de 3.012 empleados (97,8 %); los pendientes son bajas de larga duración y nuevas incorporaciones con plazo abierto.' }
        ]
      },
      'FALCON': {
        type: 'record', kind: 'Configuración', code: 'Falcon · tarjetas', title: 'Monitorización de fraude con tarjeta · configuración', system: 'Falcon Fraud',
        org: 'Falcon Fraud · reglas y modelos',
        sections: [
          { id: 'cfg', heading: 'Configuración vigente', text: 'Reglas activas: 1.284. Cada operación con tarjeta se puntúa en menos de 100 ms antes de su autorización.' }
        ]
      }
    },
    questions: [
      {
        id: 'A1', ref: 'CBDDQ §1', sec: 'A', topic: 'Entidad y titularidad', conf: 'alta',
        qEn: 'Provide the full legal name, LEI and registration of the Entity. Is the Entity publicly traded? List any shareholder owning 25% or more and the ultimate beneficial owners.',
        qEs: 'Indique la denominación social, el LEI y el registro de la entidad. ¿Cotiza en bolsa? Indique los accionistas con un 25 % o más y los titulares reales.',
        en: 'Banco Cierzo, S.A. is a Spanish credit institution registered with the Bank of Spain under code 0239, LEI 9598003HQ0CIERZ0B27; its shares are not publicly traded [1]. Its shareholders are Fundación Bancaria Cierzo (62%) and around 3,100 minority shareholders (38%); no natural person owns or controls more than 25% [2].',
        es: 'Banco Cierzo, S.A. es una entidad de crédito española inscrita en el Registro de Entidades del Banco de España con el código 0239, con LEI 9598003HQ0CIERZ0B27; sus acciones no cotizan en bolsa [1]. Sus accionistas son la Fundación Bancaria Cierzo (62 %) y unos 3.100 accionistas minoritarios (38 %); ninguna persona física posee o controla más del 25 % [2].',
        cites: [
          { src: 'CCAA-2025', q: 'Banco Cierzo, S.A. es una entidad de crédito española, inscrita en el Registro de Entidades del Banco de España con el código 0239, con LEI 9598003HQ0CIERZ0B27. Sus acciones no cotizan en bolsa.' },
          { src: 'CCAA-2025', q: 'Accionistas: Fundación Bancaria Cierzo (62 %) y unos 3.100 accionistas minoritarios (38 %); ninguna persona física posee o controla más del 25 %.' }
        ]
      },
      {
        id: 'A2', ref: 'CBDDQ §1', sec: 'A', topic: 'Supervisión y marco normativo', conf: 'alta',
        qEn: 'Name the Entity\'s prudential and AML/CTF regulators and the AML/CTF laws and regulations it is subject to.',
        qEs: 'Indique los supervisores prudencial y de PBC/FT de la entidad y la normativa de PBC/FT que le aplica.',
        en: 'The Entity is supervised by the Bank of Spain and, for anti-money laundering, by SEPBLAC, the Spanish financial intelligence unit [1]. Our AML/CTF programme implements Law 10/2010 on the prevention of money laundering and terrorist financing and its implementing Regulation, Royal Decree 304/2014 [2].',
        es: 'La entidad está supervisada por el Banco de España y, en prevención del blanqueo de capitales, por el SEPBLAC [1]. Nuestro programa de PBC/FT desarrolla la Ley 10/2010, de prevención del blanqueo de capitales y de la financiación del terrorismo, y su Reglamento, aprobado por el Real Decreto 304/2014 [2].',
        cites: [
          { src: 'CCAA-2025', q: 'La entidad está sujeta a la supervisión del Banco de España y, en materia de prevención del blanqueo de capitales, del SEPBLAC.' },
          { src: 'MAN-PBC-001', q: 'El manual desarrolla la Ley 10/2010, de prevención del blanqueo de capitales y de la financiación del terrorismo, y su Reglamento, aprobado por el Real Decreto 304/2014.' }
        ]
      },
      {
        id: 'A3', ref: 'CBDDQ §2', sec: 'A', topic: 'Activos virtuales y productos de riesgo', conf: 'none',
        qEn: 'Does the Entity offer services to virtual asset service providers (VASPs) or hold or transact in virtual assets? If so, describe the controls applied.',
        qEs: '¿Presta la entidad servicios a proveedores de servicios de activos virtuales (VASP) o mantiene u opera con activos virtuales? En su caso, describa los controles.',
        flag: {
          reason: 'Ninguno de los {doc_count} documentos indexados trata los activos virtuales ni la relación con proveedores de servicios de criptoactivos.',
          context: 'Desde el Reglamento (UE) 2023/1114 (MiCA) y el Reglamento (UE) 2023/1113, los corresponsales preguntan siempre por los VASP. Agentic Platform no responde «No» por ausencia de documentos: lo tiene que confirmar Cumplimiento con Negocio.',
          partial: [],
          missing: ['Política sobre clientes proveedores de servicios de criptoactivos (CASP/VASP)', 'Confirmación de si la entidad mantiene u opera con activos virtuales', 'Controles reforzados aplicados, si existen']
        }
      },
      {
        id: 'B1', ref: 'CBDDQ §3', sec: 'B', topic: 'Programa y responsable de PBC/FT', conf: 'alta',
        qEn: 'Does the Entity have a board-approved AML, CTF and sanctions programme? Describe its governance, including the appointed AML compliance officer, and confirm that the Entity does not deal with shell banks.',
        qEs: '¿Tiene la entidad un programa de PBC/FT y sanciones aprobado por el Consejo? Describa su gobierno, incluido el responsable designado, y confirme que no opera con bancos pantalla.',
        en: 'Yes. Our AML/CTF manual implements Spanish AML law [1]. The Internal Control Body (OCI) meets monthly, and the Head of Regulatory Compliance is the designated representative before SEPBLAC, with direct access to the Board of Directors [2]. Relationships with shell banks, and with institutions that allow shell banks to use their accounts, are prohibited [3]. Customer due diligence and transaction records are retained for 10 years [4].',
        es: 'Sí. Nuestro manual de PBC/FT desarrolla la normativa española de prevención del blanqueo [1]. El Órgano de Control Interno (OCI) se reúne cada mes y el Responsable de Cumplimiento Normativo es el Representante ante el SEPBLAC, con acceso directo al Consejo de Administración [2]. Está prohibido mantener relaciones con bancos pantalla y con entidades que permitan el uso de sus cuentas por bancos pantalla [3]. Los documentos de diligencia debida y los registros de operaciones se conservan 10 años [4].',
        cites: [
          { src: 'MAN-PBC-001', q: 'El manual desarrolla la Ley 10/2010' },
          { src: 'MAN-PBC-001', q: 'El Órgano de Control Interno (OCI) se reúne mensualmente. El Representante ante el SEPBLAC es el Responsable de Cumplimiento Normativo, con acceso directo al Consejo de Administración.' },
          { src: 'MAN-PBC-001', q: 'Está prohibido mantener relaciones con bancos pantalla y con entidades que permitan el uso de sus cuentas por bancos pantalla.' },
          { src: 'MAN-PBC-001', q: 'Los documentos de diligencia debida y los registros de operaciones se conservan durante 10 años.' }
        ]
      },
      {
        id: 'B2', ref: 'CBDDQ §6', sec: 'B', topic: 'Autoevaluación del riesgo', conf: 'alta',
        qEn: 'Has the Entity completed an enterprise-wide AML, CTF and sanctions risk assessment in the last 12 months? Describe its scope and methodology and state when it was approved.',
        qEs: '¿Ha completado la entidad una autoevaluación global del riesgo de PBC/FT y sanciones en los últimos 12 meses? Describa su alcance y metodología e indique cuándo se aprobó.',
        en: 'Yes. The 2025 risk assessment measures inherent risk by customers, products, delivery channels and geographies, the effectiveness of controls and residual risk [1]. It covers sanctions and proliferation financing risk [2]. Overall residual risk was rated medium-low, and the assessment was approved by the Board of Directors on 24 March 2026 [3].',
        es: 'Sí. La autoevaluación de 2025 mide el riesgo inherente por clientes, productos, canales de distribución y geografías, la eficacia de los controles y el riesgo residual [1]. Incluye el riesgo de sanciones y de financiación de la proliferación [2]. El riesgo residual global es medio-bajo y la aprobó el Consejo de Administración el 24/03/2026 [3].',
        cites: [
          { src: 'EBR-2025', q: 'Riesgo inherente por clientes, productos, canales de distribución y geografías; eficacia de los controles; riesgo residual.' },
          { src: 'EBR-2025', q: 'Incluye el riesgo de sanciones y de financiación de la proliferación.' },
          { src: 'EBR-2025', q: 'Riesgo residual global: medio-bajo. Aprobada por el Consejo de Administración el 24/03/2026.' }
        ]
      },
      {
        id: 'B3', ref: 'CBDDQ §4', sec: 'B', topic: 'Anticorrupción y soborno', conf: 'none',
        qEn: 'Does the Entity have a documented anti-bribery and corruption (ABC) policy and programme, including a risk assessment and training? When was it last reviewed?',
        qEs: '¿Tiene la entidad una política y un programa anticorrupción y antisoborno documentados, con evaluación de riesgos y formación? ¿Cuándo se revisaron por última vez?',
        flag: {
          reason: 'La política anticorrupción y el modelo de prevención de delitos no están entre los {doc_count} documentos indexados.',
          context: 'El artículo 31 bis del Código Penal hace que las entidades españolas suelan tener un modelo de prevención de delitos que cubre el cohecho y la corrupción entre particulares. Debería existir en Cumplimiento penal; Agentic Platform no describe su contenido ni supone una fecha de revisión.',
          partial: [],
          missing: ['Política anticorrupción y antisoborno', 'Evaluación del riesgo de corrupción y fecha de la última revisión', 'Formación específica y su cobertura']
        }
      },
      {
        id: 'C1', ref: 'CBDDQ §7', sec: 'C', topic: 'Diligencia debida y reforzada', conf: 'alta',
        qEn: 'Does the Entity risk-rate all customers? Describe the enhanced due diligence applied to high-risk customers and the periodic review frequency for each risk level.',
        qEs: '¿Califica la entidad el riesgo de todos sus clientes? Describa la diligencia reforzada aplicada a los clientes de riesgo alto y la frecuencia de revisión periódica por nivel de riesgo.',
        en: 'Yes. Every customer is risk-rated (low, medium or high) at onboarding and at each review; high-risk customers are subject to enhanced due diligence, including source of funds and source of wealth, senior management approval and an annual review [1]. Periodic reviews are annual for high risk, every three years for medium risk and every five years for low risk [2]. At 31 August 2026, 1.7% of customers were rated high risk [3], with no overdue high-risk reviews [4].',
        es: 'Sí. Cada cliente recibe una calificación de riesgo (bajo, medio o alto) al alta y en cada revisión; los de riesgo alto reciben diligencia reforzada, con origen de los fondos y del patrimonio, aprobación de un directivo y revisión anual [1]. La revisión periódica es anual para riesgo alto, trienal para riesgo medio y quinquenal para riesgo bajo [2]. A 31/08/2026, el 1,7 % de los clientes tenía riesgo alto [3] y no había revisiones de riesgo alto vencidas [4].',
        cites: [
          { src: 'MAN-PBC-001', q: 'Los clientes de riesgo alto reciben diligencia reforzada: origen de los fondos y del patrimonio, aprobación de un directivo y revisión anual.' },
          { src: 'MAN-PBC-001', q: 'Revisión periódica: anual para riesgo alto, cada tres años para riesgo medio y cada cinco años para riesgo bajo.' },
          { src: 'T24-RISK', q: 'Riesgo alto: 1,7 % de los clientes' },
          { src: 'T24-RISK', q: 'Revisiones periódicas de riesgo alto vencidas: 0' }
        ]
      },
      {
        id: 'C2', ref: 'CBDDQ §7', sec: 'C', topic: 'Personas con responsabilidad pública', conf: 'alta',
        qEn: 'How does the Entity identify politically exposed persons (PEPs), and who approves PEP relationships?',
        qEs: '¿Cómo identifica la entidad a las personas con responsabilidad pública (PEP) y quién aprueba las relaciones con ellas?',
        en: 'Customers are screened against PEP lists at onboarding and nightly thereafter. Opening or maintaining a PEP relationship requires approval by the Head of Regulatory Compliance and evidence of source of wealth [1]. The Entity currently has 412 active PEP customers, all with Compliance approval on record [2].',
        es: 'Los clientes se cotejan con listas de PEP al alta y cada noche. Abrir o mantener una relación con un PEP requiere la aprobación del Responsable de Cumplimiento Normativo y acreditar el origen del patrimonio [1]. La entidad tiene 412 clientes PEP activos, todos con aprobación de Cumplimiento registrada [2].',
        cites: [
          { src: 'MAN-PBC-001', q: 'Los clientes se cotejan con listas de personas con responsabilidad pública al alta y cada noche. Abrir o mantener una relación con un PEP requiere la aprobación del Responsable de Cumplimiento Normativo y acreditar el origen del patrimonio.' },
          { src: 'T24-RISK', q: 'Clientes PEP activos: 412, todos con aprobación de Cumplimiento registrada.' }
        ]
      },
      {
        id: 'C3', ref: 'CBDDQ §7', sec: 'C', topic: 'Titularidad real', conf: 'alta',
        qEn: 'At what ownership threshold does the Entity identify and verify beneficial owners, and how is the information verified?',
        qEs: '¿A partir de qué porcentaje identifica y verifica la entidad a los titulares reales y cómo verifica la información?',
        en: 'We identify every natural person who owns or controls more than 25% of the capital or voting rights; where there is none, we identify the senior managing official. The information is checked against the Spanish Central Register of Beneficial Ownership [1].',
        es: 'Identificamos a toda persona física que posea o controle más del 25 % del capital o de los derechos de voto; si no existe, al administrador o directivo principal. La información se contrasta con el Registro Central de Titularidades Reales [1].',
        cites: [
          { src: 'MAN-PBC-001', q: 'Se identifica a toda persona física que posea o controle más del 25 % del capital o de los derechos de voto; si no existe, se identifica al administrador o directivo principal. La información se contrasta con el Registro Central de Titularidades Reales.' }
        ]
      },
      {
        id: 'D1', ref: 'CBDDQ §8', sec: 'D', topic: 'Seguimiento y comunicación de operaciones', conf: 'alta',
        qEn: 'Describe the Entity\'s transaction monitoring (automated and manual) and suspicious activity reporting. Provide the volume of alerts and reports filed in the last year.',
        qEs: 'Describa el seguimiento de operaciones (automático y manual) y la comunicación de operaciones sospechosas. Indique el volumen de alertas y comunicaciones del último año.',
        en: 'Transaction monitoring combines automated scenarios in our core banking system with analyst review of alerts, and suspicious transactions are reported to SEPBLAC without delay [1]. In 2025 we reviewed 18,420 AML alerts, escalated 1,120 to special examination and filed 214 suspicious activity reports with SEPBLAC [2].',
        es: 'El seguimiento combina escenarios automáticos en el core bancario y la revisión de alertas por analistas, y las operaciones sospechosas se comunican al SEPBLAC por indicio sin demora [1]. En 2025 revisamos 18.420 alertas, escalamos 1.120 a examen especial y presentamos 214 comunicaciones por indicio al SEPBLAC [2].',
        cites: [
          { src: 'MAN-PBC-001', q: 'El seguimiento de operaciones combina escenarios automáticos en el core bancario y la revisión de alertas por analistas. Las operaciones sospechosas se comunican al SEPBLAC por indicio sin demora.' },
          { src: 'ARCHER-AML', q: 'Alertas de seguimiento de PBC/FT en 2025: 18.420; 1.120 escaladas a examen especial y 214 comunicaciones por indicio al SEPBLAC.' }
        ],
        note: {
          tone: 'warn', icon: 'activity', title: 'Alarma de fraude de hoy · BIN 454812',
          text: 'Desde las 02:10 la tasa de fraude en compras sin tarjeta presente del BIN 454812 (Tarjeta Cierzo Débito) es del 2,9 % frente al 0,3 % habitual: 186 operaciones sospechosas por 41.230 €. La respuesta describe el programa de seguimiento, no el incidente de hoy.',
          outcome: 'alarma', tone_done: 'brand', with: { approved: 'En la alarma: {label}.', any: 'En la alarma se ha rechazado la propuesta del agente.' },
          without: 'La decisión sobre el bloqueo preventivo se toma en la escena de la alarma.',
          go: 'alarma', goLabel: 'Abrir la alarma'
        }
      },
      {
        id: 'D2', ref: 'CBDDQ §10', sec: 'D', topic: 'Filtrado de sanciones', conf: 'alta',
        qEn: 'Which sanctions lists does the Entity screen against? Are customers and payments screened in real time, and how quickly are list updates applied?',
        qEs: '¿Con qué listas de sanciones filtra la entidad? ¿Se filtran clientes y pagos en tiempo real y en cuánto tiempo se aplican las actualizaciones?',
        en: 'We apply EU and UN sanctions and, as a matter of internal policy, OFAC (US) and OFSI (UK) sanctions [1]. Customers and payments are screened in real time, potential matches are reviewed before the payment is released, and list updates are applied within 24 hours of publication [2]. Screening also covers proliferation financing designations [3]. In 2025 we screened 1.9 million transfers, reviewed 3,204 potential matches and blocked and reported 7 payments [4].',
        es: 'Aplicamos las sanciones de la UE y de la ONU y, por política interna, las de OFAC (Estados Unidos) y OFSI (Reino Unido) [1]. Clientes y transferencias se filtran en tiempo real, las coincidencias se revisan antes de liberar el pago y las listas se actualizan en un máximo de 24 h desde su publicación [2]. El filtrado incluye a los designados por financiación de la proliferación [3]. En 2025 filtramos 1,9 millones de transferencias, revisamos 3.204 coincidencias y bloqueamos y comunicamos 7 pagos [4].',
        cites: [
          { src: 'POL-SAN-002', q: 'Se aplican las sanciones de la Unión Europea y de las Naciones Unidas y, por política interna, las de OFAC (Estados Unidos) y OFSI (Reino Unido).' },
          { src: 'POL-SAN-002', q: 'Clientes y transferencias se filtran en tiempo real; las coincidencias se revisan antes de liberar el pago. Las listas se actualizan en un plazo máximo de 24 h desde su publicación.' },
          { src: 'POL-SAN-002', q: 'El filtrado incluye a las personas y entidades designadas por financiación de la proliferación de armas de destrucción masiva.' },
          { src: 'T24-SAN', q: 'Transferencias filtradas en 2025: 1,9 millones; 3.204 coincidencias revisadas y 7 pagos bloqueados y comunicados.' }
        ]
      },
      {
        id: 'D3', ref: 'CBDDQ §14', sec: 'D', topic: 'Riesgo de fraude', conf: 'media',
        qEn: 'Does the Entity have policies and controls to detect and respond to fraud, including card compromise events? Provide the date and outcome of the last test of your response.',
        qEs: '¿Tiene la entidad políticas y controles para detectar el fraude y responder a él, incluidos los compromisos de tarjetas? Indique la fecha y el resultado de la última prueba de la respuesta.',
        en: 'Yes. Card transactions are monitored 24x7 in our fraud platform using rules and transaction scoring models [1]; 1,284 rules are active and every card transaction is scored in under 100 ms before authorisation [2]. When a common point of compromise is identified, exposed cards are blocked pre-emptively and reissued, and customers and the Visa and Mastercard networks are notified [3].',
        es: 'Sí. Las operaciones con tarjeta se monitorizan 24x7 en Falcon Fraud con reglas y modelos de puntuación por operación [1]; hay 1.284 reglas activas y cada operación se puntúa en menos de 100 ms antes de autorizarse [2]. Ante un punto común de compromiso se bloquean preventivamente las tarjetas expuestas, se reemiten y se avisa a los clientes y a las redes Visa y Mastercard [3].',
        cites: [
          { src: 'POL-FRA-003', q: 'Las operaciones con tarjeta se monitorizan 24x7 en Falcon Fraud, con reglas y modelos de puntuación por operación.' },
          { src: 'FALCON', q: 'Reglas activas: 1.284. Cada operación con tarjeta se puntúa en menos de 100 ms antes de su autorización.' },
          { src: 'POL-FRA-003', q: 'Ante un punto común de compromiso se bloquean preventivamente las tarjetas expuestas, se reemiten y se avisa a los clientes y a las redes Visa y Mastercard.' }
        ],
        gap: 'El corresponsal pide la fecha y el resultado de la última prueba de respuesta ante un compromiso de tarjetas, y no están en las fuentes indexadas.',
        gapGo: 'retirada', gapGoLabel: 'Ejecutar el simulacro CPP-2609-07', gapOutcome: 'retirada',
        gapOutcomeText: 'En esta sesión ya hay un ejercicio sobre el expediente CPP-2609-07: {label}. Añádelo a la respuesta si procede.'
      },
      {
        id: 'E1', ref: 'CBDDQ §11', sec: 'E', topic: 'Formación', conf: 'alta',
        qEn: 'Is AML, CTF and sanctions training mandatory for all employees? How often is it delivered, is it tailored by role, and what was the completion rate last year?',
        qEs: '¿Es obligatoria la formación en PBC/FT y sanciones para toda la plantilla? ¿Con qué frecuencia se imparte, se adapta por función y qué cobertura tuvo el último año?',
        en: 'Yes. AML/CTF training is mandatory every year for all staff, with specific modules for the branch network, operations and Compliance [1]. In 2025, 2,946 of 3,012 employees (97.8%) completed it; the remainder are on long-term leave or are new joiners still within their deadline [2].',
        es: 'Sí. La formación en PBC/FT es anual y obligatoria para toda la plantilla, con módulos específicos para la red comercial, operaciones y Cumplimiento [1]. En 2025 la completaron 2.946 de 3.012 empleados (97,8 %); los pendientes son bajas de larga duración y nuevas incorporaciones con plazo abierto [2].',
        cites: [
          { src: 'MAN-PBC-001', q: 'Formación anual obligatoria en PBC/FT para toda la plantilla, con módulos específicos para la red comercial, operaciones y Cumplimiento.' },
          { src: 'ARCHER-FORM', q: 'Formación PBC/FT 2025: 2.946 de 3.012 empleados (97,8 %); los pendientes son bajas de larga duración y nuevas incorporaciones con plazo abierto.' }
        ]
      },
      {
        id: 'E2', ref: 'CBDDQ §13', sec: 'E', topic: 'Auditoría y experto externo', conf: 'media',
        qEn: 'Is the AML, CTF and sanctions programme subject to independent testing? Give the date of the last internal audit and external review, and confirm whether any findings remain open.',
        qEs: '¿Se somete el programa de PBC/FT y sanciones a revisión independiente? Indique la fecha de la última auditoría interna y de la última revisión externa, y si quedan hallazgos abiertos.',
        en: 'Yes. Internal Audit reviews the programme every year, and an external expert issues a full report every three years with follow-up reports in the intervening years, as required by Article 28 of Law 10/2010 [1]. The last internal audit report, AI-2025-14, was issued on 12 December 2025 with 4 medium-priority recommendations [2], and the external expert\'s 2025 follow-up report was issued on 30 April 2026 [3].',
        es: 'Sí. Auditoría interna revisa el programa cada año y un experto externo emite un informe completo cada tres años e informes de seguimiento en los años intermedios, como exige el artículo 28 de la Ley 10/2010 [1]. El último informe de Auditoría interna, AI-2025-14, se emitió el 12/12/2025 con 4 recomendaciones de prioridad media [2], y el informe de seguimiento del experto externo de 2025 se emitió el 30/04/2026 [3].',
        cites: [
          { src: 'MAN-PBC-001', q: 'Auditoría interna revisa el programa cada año. Un experto externo emite un informe completo cada tres años e informes de seguimiento en los años intermedios (artículo 28 de la Ley 10/2010).' },
          { src: 'ARCHER-AUD', q: 'Informe AI-2025-14 de Auditoría interna sobre el programa de PBC/FT, emitido el 12/12/2025: 4 recomendaciones de prioridad media.' },
          { src: 'ARCHER-AUD', q: 'Informe de seguimiento del experto externo correspondiente a 2025, emitido el 30/04/2026.' }
        ],
        gap: 'El corresponsal pregunta si quedan hallazgos abiertos: el estado de las 4 recomendaciones del informe AI-2025-14 y las conclusiones del experto externo no están en las fuentes indexadas.'
      },
      {
        id: 'E3', ref: 'Nordbank · adicional', sec: 'E', topic: 'Actuaciones de supervisores', conf: 'none',
        qEn: 'In the last five years, has the Entity been subject to any regulatory enforcement action, fine or investigation related to AML, CTF or sanctions?',
        qEs: 'En los últimos cinco años, ¿ha sido la entidad objeto de algún expediente sancionador, multa o investigación en materia de PBC/FT o sanciones?',
        flag: {
          reason: 'Ninguno de los {doc_count} documentos indexados recoge expedientes sancionadores, requerimientos ni investigaciones de supervisores.',
          context: 'Es la pregunta que más pesa en la evaluación del corresponsal. Una respuesta «No» sin evidencia sería una declaración falsa si existiera un expediente: la confirma Cumplimiento con Asesoría Jurídica.',
          partial: [],
          missing: ['Relación de requerimientos y expedientes del SEPBLAC y del Banco de España de los últimos cinco años', 'Sanciones o multas impuestas y su estado', 'Confirmación firmada por Asesoría Jurídica']
        }
      }
    ]
  }
});
