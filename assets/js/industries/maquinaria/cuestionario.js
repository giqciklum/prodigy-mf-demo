/* Hidromec Ebro · cuestionario de auditoría de proveedor de Vehículos Industriales Arga. Datos sintéticos (MFM). */
agenticPack('maquinaria', {
  cuestionario: {
    agent: 'Cuestionarios de cliente',
    lang: 'es',
    default_sel: 'D2',
    reviewer: 'Responsable de Calidad',
    assignee: 'Dirección de Operaciones',
    assignee_short: 'Dirección de Operaciones',
    team: 'Calidad',
    assign_due: '2026-10-06',
    responder: 'Hidromec Ebro, S.L. (Planta de Zaragoza)',
    site: 'Planta de Zaragoza (PLAZA)',
    site_label: 'Planta',
    page_title: 'Auditoría de proveedor · Vehículos Industriales Arga',
    report_title: 'Respuesta a cuestionario de auditoría de proveedor',
    discard_placeholder: 'Por ejemplo: se responde con el certificado adjunto',
    save_system: 'SAP S/4HANA',
    qn: {
      code: 'CUE-2026-027',
      title: 'Cuestionario de autoevaluación de proveedor SQA-07 (2026)',
      customer: 'Vehículos Industriales Arga',
      via: 'Calidad de Proveedores de Arga',
      received: '2026-09-28T11:40',
      due: '2026-10-09',
      file: 'Arga_SQA-07_Autoevaluacion_proveedor_2026.xlsx',
      scope: 'grupos hidráulicos GH-30 y GH-55 suministrados para los volquetes y grúas de carga de Arga',
      scope_short: 'GH-30 · GH-55',
      scope_label: '2 referencias en serie (GH-30 y GH-55)'
    },
    email: {
      mailbox: 'buzón de Calidad',
      headers: {
        From: 'Calidad de Proveedores, Vehículos Industriales Arga <sqa@arga-vi.example>',
        To: 'Calidad, Hidromec Ebro <calidad@hidromec-ebro.example>',
        Date: 'lun, 28 sep 2026 11:40',
        Subject: 'SQA-07 · Autoevaluación de proveedor 2026 previa a la auditoría in situ · respuesta antes del 9 de octubre'
      },
      text: 'Buenos días:\n\nDentro del plan anual de evaluación de proveedores, os enviamos el cuestionario de autoevaluación SQA-07 previo a la auditoría in situ prevista para noviembre. Aplica a los grupos hidráulicos GH-30 y GH-55 que suministráis para nuestros volquetes y grúas de carga.\n\nSon 15 preguntas en cinco bloques: sistema de gestión, producto y conformidad, proceso y medición, trazabilidad e incidencias, y continuidad y sostenibilidad.\n\nPara cada respuesta indicad el procedimiento, registro o certificado que la respalda. Las respuestas sin evidencia se puntúan como no conformes en la evaluación.\n\nNecesitamos el cuestionario cumplimentado antes del viernes 9 de octubre de 2026.\n\nUn saludo,\n\nCalidad de Proveedores\nVehículos Industriales Arga',
      highlights: [
        { text: 'grupos hidráulicos GH-30 y GH-55', label: 'Producto', tone: 'brand' },
        { text: '15 preguntas', label: 'Preguntas', tone: 'brand' },
        { text: 'indicad el procedimiento, registro o certificado que la respalda', label: 'Requisito' },
        { text: 'Las respuestas sin evidencia se puntúan como no conformes', label: 'Criterio' },
        { text: 'viernes 9 de octubre de 2026', label: 'Plazo' }
      ]
    },
    sections: [
      { id: 'A', es: 'Sistema de gestión y certificaciones' },
      { id: 'B', es: 'Producto y conformidad' },
      { id: 'C', es: 'Control de proceso y medición' },
      { id: 'D', es: 'Trazabilidad e incidencias' },
      { id: 'E', es: 'Continuidad y sostenibilidad' }
    ],
    kpi: { label: 'Auditorías en 2025', value: 20, sub: '14 internas y 6 de cliente · 0 no conformidades mayores · revisión por la dirección 2025', icon: 'shield-check' },
    sources_sub: 'Manual, procedimientos, certificados e informe de revisión',
    identify_result: 'Vehículos Industriales Arga · GH-30 y GH-55 · auditoría in situ en noviembre',
    search_scope: 'manual de calidad, procedimientos, certificados e informe de revisión por la dirección',
    lookups: [
      { system: 'PLM Windchill', action: 'Lee el expediente técnico, el PPAP y el cumplimiento de materiales del GH-55', result: 'ET-GH55 rev. 4 · PPAP nivel 3 aprobado el 03/03/2025 · 0 SVHC > 0,1 %', ms: 540 },
      { system: 'GMAO Maximo', action: 'Consulta el estado del plan de calibración', result: '412 equipos · 409 en vigor · 3 vencidos y bloqueados', ms: 380 },
      { system: 'MES Opcenter', action: 'Lee el SPC de las características especiales y el banco de pruebas BP-02', result: 'Cpk 1,58 y 1,71 · 64 GH-55 ensayados al 100 % en septiembre', ms: 520 },
      { system: 'SAP S/4HANA', action: 'Reconstruye la genealogía de un número de serie expedido a Arga', result: 'GH55-26-0187: bomba, bloque de válvulas y juntas por lote · albarán 80045127', ms: 460 },
      { system: 'Salesforce Service', action: 'Busca reclamaciones y campañas abiertas', result: '1 reclamación abierta: fuga de aceite en PH-250 (juntas JNT-2607-031)', ms: 360, tone: 'warn' },
      { system: 'IIoT Vibración', action: 'Cruza las referencias del cuestionario con las alarmas de hoy', result: 'MC-04 en alarma desde las 03:40 · 42 culatas del lote CUL-2609-118', ms: 340, tone: 'warn' }
    ],
    compare: {
      people: '2–3: Calidad, Ingeniería de producto y, según la pregunta, Mantenimiento o Compras',
      systems: '6–8: correo, Excel del cliente, SAP, Windchill, Maximo, Opcenter, carpeta de certificados y procedimientos',
      steps: 'Buscar la evidencia de cada pregunta, copiar respuestas de autoevaluaciones anteriores, pedir datos a Ingeniería y Mantenimiento y montar el Excel',
      time: '4–6 h de trabajo de Calidad, repartidas en 3–4 días'
    },
    presenter: {
      before: [
        'Cada OEM trae su autoevaluación antes de auditar. En 2025 la planta recibió 6 auditorías de cliente y 14 internas: es trabajo de fondo que se come horas de Calidad.',
        'Esta llega de Vehículos Industriales Arga: {total} preguntas sobre los grupos GH-30 y GH-55, y la regla es dura: lo que no tenga evidencia puntúa como no conforme.',
        'Al pulsar, Agentic Platform busca en el manual, los procedimientos y los certificados, y en los registros de Windchill, Maximo, Opcenter, SAP y Salesforce, y redacta cada respuesta con su fuente.'
      ],
      during: [
        '{drafted} de {total} con borrador y cita, con documento y apartado; cada cita se comprueba contra el texto de la fuente. {flagged} quedan sin responder: continuidad de negocio, huella de carbono y TISAX. Sin documento, no se inventa nada.',
        'D2: además de responder, avisa de que hay una reclamación abierta por fuga en una PH-250 con juntas del lote JNT-2607-031, que también va en 6 GH-55 en campo. Hoy eso depende de que alguien se acuerde.',
        'C2: cruza la pregunta de control de proceso con la alarma de esta mañana en MC-04. El cuestionario no vive aislado del resto de la planta.',
        'Nada sale sin aprobación: en bloque solo las de confianza alta; IATF y trazabilidad se revisan una a una.'
      ],
      next_during: 'Enseñar D2 (citas y aviso de la reclamación) y E3 (sin evidencia). Después «Aprobar las {alta} de confianza alta», aprobar {media_ids} una a una y «Asignar las {flagged} sin fuente».'
    },
    sources: {
      'CERT-9001': {
        type: 'doc', kind: 'Certificado', code: 'CERT-ISO9001', title: 'Certificado ISO 9001:2015 · Hidromec Ebro, S.L.', system: 'Procedimientos',
        org: 'Entidad de certificación acreditada por ENAC · certificado n.º ES-QM-24-0381', date: '2024-03-14',
        sections: [
          { id: 'alc', heading: 'Alcance', text: 'Diseño, fabricación, ensayo y servicio posventa de prensas hidráulicas y grupos hidráulicos. Centro: Planta de Zaragoza (PLAZA).' },
          { id: 'vig', heading: 'Vigencia', text: 'Emitido el 14/03/2024; válido hasta el 13/03/2027. Auditoría de seguimiento del 11/03/2026 superada sin no conformidades mayores.' }
        ]
      },
      'CERT-14001': {
        type: 'doc', kind: 'Certificado', code: 'CERT-ISO14001', title: 'Certificado ISO 14001:2015 · Hidromec Ebro, S.L.', system: 'Procedimientos',
        org: 'Entidad de certificación acreditada por ENAC · certificado n.º ES-EM-24-0382', date: '2024-03-14',
        sections: [
          { id: 'alc', heading: 'Alcance', text: 'Fabricación de prensas y grupos hidráulicos en la Planta de Zaragoza.' },
          { id: 'vig', heading: 'Vigencia', text: 'Emitido el 14/03/2024; válido hasta el 13/03/2027.' }
        ]
      },
      'MAN-CAL-001': {
        type: 'doc', kind: 'Manual', code: 'MAN-CAL-001', title: 'Manual del sistema de gestión de calidad', system: 'Procedimientos', version: '9', date: '2026-01-15', owner: 'Responsable de Calidad',
        org: 'Hidromec Ebro · Calidad',
        sections: [
          { id: '2', heading: '2. Alcance y certificaciones', page: 4, text: 'El sistema está certificado según ISO 9001:2015 y el sistema ambiental según ISO 14001:2015. La organización no está certificada en IATF 16949; aplica sus herramientas básicas a los clientes de automoción y vehículo industrial.' },
          { id: '5', heading: '5. Planificación de la calidad', page: 7, text: 'Para productos nuevos o modificados se aplican APQP, AMFE de diseño y de proceso, plan de control, MSA, SPC y PPAP según el manual AIAG (4.ª edición).' },
          { id: '6', heading: '6. Requisitos específicos de cliente', page: 8, text: 'Los requisitos específicos de cada cliente (CSR) se registran en SAP S/4HANA y se revisan en cada oferta y en cada cambio de revisión del cliente.' }
        ]
      },
      'PR-CAL-012': {
        type: 'doc', kind: 'Procedimiento', code: 'PR-CAL-012', title: 'Auditorías internas', system: 'Procedimientos', version: '5', date: '2025-06-02', owner: 'Responsable de Calidad',
        sections: [
          { id: '4', heading: '4. Programa de auditorías', page: 2, text: 'El programa anual cubre todos los procesos del sistema; cada línea de fabricación recibe al menos una auditoría de proceso al año, con cuestionario basado en VDA 6.3.' },
          { id: '6', heading: '6. Auditores', page: 3, text: 'Los auditores internos están cualificados y no auditan su propio trabajo.' }
        ]
      },
      'INF-RD-2025': {
        type: 'doc', kind: 'Informe', code: 'INF-RD-2025', title: 'Informe de revisión por la dirección 2025', system: 'Procedimientos', date: '2026-02-20', owner: 'Dirección General',
        sections: [
          { id: '3', heading: '3. Auditorías', page: 4, text: 'En 2025 se realizaron 14 auditorías internas (sistema, proceso y producto) y 6 auditorías de cliente, con 9 no conformidades menores, todas cerradas dentro de plazo, y ninguna mayor.' },
          { id: '4', heading: '4. Indicadores de cliente', page: 5, text: 'Entregas a tiempo: 96,8 %. Calidad de suministro: 182 ppm. Reclamaciones de cliente en 2025: 12, todas con 8D cerrado.' },
          { id: '7', heading: '7. Medio ambiente', page: 9, text: 'Consumo eléctrico 2025: 4.210 MWh, el 38 % de origen renovable con garantía de origen. No se ha calculado todavía la huella de carbono de producto.' }
        ]
      },
      'PR-ING-003': {
        type: 'doc', kind: 'Procedimiento', code: 'PR-ING-003', title: 'Marcado CE y expediente técnico', system: 'Procedimientos', version: '4', date: '2026-03-10', owner: 'Responsable de Ingeniería de producto',
        sections: [
          { id: '3', heading: '3. Clasificación del producto', page: 2, text: 'Las prensas PH se comercializan como máquinas, con declaración UE de conformidad y marcado CE. Los grupos hidráulicos GH se suministran como cuasi máquinas, con declaración de incorporación (anexo II.1.B de la Directiva 2006/42/CE) e instrucciones de montaje (anexo VI).' },
          { id: '5', heading: '5. Expediente técnico', page: 3, text: 'El expediente técnico de cada modelo se conserva en PLM Windchill durante al menos 10 años desde la fabricación de la última unidad.' },
          { id: '8', heading: '8. Reglamento (UE) 2023/1230', page: 5, text: 'El plan de adaptación al Reglamento (UE) 2023/1230, aplicable desde el 20/01/2027, incluye la revisión de los expedientes técnicos, las instrucciones en formato digital y la nueva declaración de incorporación; seguimiento trimestral en el comité de producto.' }
        ]
      },
      'PR-CAL-015': {
        type: 'doc', kind: 'Procedimiento', code: 'PR-CAL-015', title: 'Control de equipos de inspección, medición y ensayo', system: 'Procedimientos', version: '6', date: '2025-11-04', owner: 'Responsable de Calidad',
        sections: [
          { id: '4', heading: '4. Calibración', page: 2, text: 'Los equipos de medición se calibran en laboratorios acreditados por ENAC según ISO/IEC 17025, con trazabilidad a patrones nacionales, y con la periodicidad del plan de calibración en GMAO Maximo.' },
          { id: '6', heading: '6. Equipo fuera de tolerancia', page: 3, text: 'Un equipo vencido o fuera de tolerancia se bloquea en Maximo y se evalúa el producto medido desde la última calibración correcta.' },
          { id: '7', heading: '7. Análisis del sistema de medición', page: 4, text: 'Criterio de R&R: hasta el 10 % aceptable; del 10 % al 30 %, aceptable condicionado a la aprobación de Calidad; por encima del 30 %, no aceptable.' }
        ]
      },
      'PR-CAL-004': {
        type: 'doc', kind: 'Procedimiento', code: 'PR-CAL-004', title: 'No conformidades', system: 'Procedimientos', owner: 'Responsable de Calidad',
        sections: [
          { id: '4', heading: '4. Tratamiento', page: 2, text: 'Toda no conformidad se registra en SAP S/4HANA (QM), con contención inmediata del producto sospechoso y decisión de destino por Calidad.' }
        ]
      },
      'PR-CAL-008': {
        type: 'doc', kind: 'Procedimiento', code: 'PR-CAL-008', title: 'Metodología 8D', system: 'Procedimientos', owner: 'Responsable de Calidad',
        sections: [
          { id: '3', heading: '3. Plazos', page: 2, text: 'Acuse de recibo al cliente en 24 h, acciones de contención (D3) en 48 h e informe 8D completo en 10 días laborables, salvo plazo distinto pactado con el cliente.' },
          { id: '5', heading: '5. Causa raíz y eficacia', page: 3, text: 'La causa raíz se analiza con 5 porqués e Ishikawa, separando causa de ocurrencia y de no detección, y se verifica la eficacia de las acciones a los 90 días.' }
        ]
      },
      'PR-POS-005': {
        type: 'doc', kind: 'Procedimiento', code: 'PR-POS-005', title: 'Campañas de campo', system: 'Procedimientos', owner: 'Responsable de posventa',
        sections: [
          { id: '4', heading: '4. Alcance de una campaña', page: 2, text: 'El alcance se determina por número de serie a partir de la genealogía de SAP S/4HANA y MES Opcenter: lote de componente, equipos montados, clientes y países. Objetivo: identificar todos los equipos y clientes afectados en 4 h.' }
        ]
      },
      'PR-ING-007': {
        type: 'doc', kind: 'Procedimiento', code: 'PR-ING-007', title: 'Gestión de cambios de producto y proceso', system: 'Procedimientos', version: '3', owner: 'Responsable de Ingeniería de producto',
        sections: [
          { id: '3', heading: '3. Cambios que requieren aprobación del cliente', page: 2, text: 'Los cambios de diseño, de proceso, de lugar de fabricación o de proveedor de un componente con característica especial se notifican al cliente antes de implantarse y no se expiden hasta la aprobación del PPAP correspondiente.' },
          { id: '4', heading: '4. Registro', page: 3, text: 'Cada cambio se gestiona como orden de cambio (ECN) en PLM Windchill, con análisis de impacto en AMFE y plan de control.' }
        ]
      },
      'WCH-ET-GH55': {
        type: 'record', kind: 'Expediente técnico', code: 'ET-GH55', title: 'Grupo hidráulico GH-55 · expediente técnico (rev. 4)', system: 'PLM Windchill',
        org: 'PLM Windchill · expedientes técnicos',
        sections: [
          { id: 'normas', heading: 'Normas aplicadas', list: ['UNE-EN ISO 4413:2011 · Transmisiones hidráulicas. Reglas generales y requisitos de seguridad', 'UNE-EN ISO 12100:2012 · Evaluación y reducción del riesgo', 'UNE-EN 60204-1:2019 · Equipo eléctrico de las máquinas', 'UNE-EN ISO 13849-1:2016 · Partes del sistema de mando relativas a la seguridad (PL c en la descarga de emergencia)'] },
          { id: 'doc', heading: 'Documentación de entrega', text: 'Declaración de incorporación DI-GH55-2026 e instrucciones de montaje IM-GH55 rev. 3 en español, inglés y francés.' }
        ]
      },
      'WCH-PPAP': {
        type: 'record', kind: 'PPAP', code: 'PPAP-GH55-C', title: 'GH-55 · PPAP nivel 3 para Vehículos Industriales Arga', system: 'PLM Windchill',
        org: 'PLM Windchill · aprobaciones de pieza',
        sections: [
          { id: 'env', heading: 'Presentación', text: 'PPAP nivel 3 del GH-55 (revisión C) presentado a Vehículos Industriales Arga el 12/02/2025; PSW aprobado el 03/03/2025.' },
          { id: 'cont', heading: 'Elementos incluidos', list: ['Registros de diseño y cambios de ingeniería', 'AMFE de diseño y AMFE de proceso', 'Diagrama de flujo y plan de control', 'Estudio R&R del calibre de asiento de válvula: 8,4 %', 'Capacidad inicial: Ppk 1,92 en el diámetro de asiento de válvula', 'Resultados dimensionales, de materiales y de ensayo funcional'] }
        ]
      },
      'WCH-CMP': {
        type: 'record', kind: 'Cumplimiento de materiales', code: 'CMP-GH55', title: 'GH-55 · cumplimiento REACH y RoHS', system: 'PLM Windchill',
        org: 'PLM Windchill · cumplimiento de materiales',
        sections: [
          { id: 'reach', heading: 'REACH', text: 'Lista de materiales revisada frente a la lista de candidatas de la ECHA (actualización de junio de 2026): ningún artículo contiene sustancias SVHC por encima del 0,1 % en peso.' },
          { id: 'scip', heading: 'SCIP', text: 'No procede notificación a la base de datos SCIP: no hay SVHC por encima del umbral.' },
          { id: 'rohs', heading: 'RoHS', text: 'El cuadro eléctrico del GH-55 cumple la Directiva 2011/65/UE; declaraciones de los proveedores de componentes electrónicos archivadas.' }
        ]
      },
      'MAX-CAL': {
        type: 'record', kind: 'Plan de calibración', code: 'Plan de calibración 2026', title: 'Equipos de medición · estado de calibración', system: 'GMAO Maximo',
        org: 'GMAO Maximo · calibraciones',
        sections: [
          { id: 'est', heading: 'Estado a 29/09/2026', list: ['412 equipos en el plan de calibración', '409 con calibración en vigor', '3 vencidos, bloqueados y retirados de uso hasta su calibración', '0 equipos usados con calibración vencida en los últimos 12 meses'] }
        ]
      },
      'MAX-REP': {
        type: 'record', kind: 'Repuestos críticos', code: 'Repuestos críticos', title: 'Centros de mecanizado · repuestos críticos', system: 'GMAO Maximo',
        org: 'GMAO Maximo · almacén de repuestos',
        sections: [
          { id: 'rep', heading: 'Repuestos críticos', text: 'Husillo de reserva para DMU 65 en almacén; tiempo estimado de sustitución: 36 h.' }
        ]
      },
      'OPC-SPC': {
        type: 'record', kind: 'Control estadístico', code: 'SPC · GH-55', title: 'GH-55 · control estadístico de características especiales', system: 'MES Opcenter',
        org: 'MES Opcenter · SPC',
        sections: [
          { id: 'cc', heading: 'Características especiales', list: ['Diámetro de asiento de la válvula de descarga (CC) · Cpk 1,58 en las últimas 125 piezas', 'Par de apriete de la brida de la bomba (SC) · Cpk 1,71 en las últimas 125 piezas', 'Presión de tarado de la válvula de seguridad (CC) · control al 100 % en banco de pruebas'] },
          { id: 'reg', heading: 'Regla de reacción', text: 'Punto fuera de límites de control: parada, contención del lote y aviso a Calidad en Opcenter.' }
        ]
      },
      'OPC-BP': {
        type: 'record', kind: 'Ensayo final', code: 'BP-02', title: 'Banco de pruebas BP-02 · ensayo final de grupos hidráulicos', system: 'MES Opcenter',
        org: 'MES Opcenter · banco de pruebas',
        sections: [
          { id: 'prot', heading: 'Protocolo de ensayo', list: ['Tarado de la válvula de seguridad a la presión nominal ±3 %', 'Estanqueidad a 1,1 veces la presión máxima de trabajo durante 10 min, sin fugas', 'Caudal, presión, ruido y temperatura de aceite registrados por número de serie', 'Limpieza del aceite: código ISO 4406 18/16/13 o mejor'] },
          { id: 'res', heading: 'Resultados de septiembre de 2026', text: 'GH-55: 64 unidades ensayadas al 100 %; 63 conformes a la primera y 1 retrabajada (fuga en racor) y conforme en el segundo ensayo.' }
        ]
      },
      'SAP-SERIE': {
        type: 'record', kind: 'Genealogía de número de serie', code: 'GH55-26-0187', title: 'Grupo hidráulico GH55-26-0187 · genealogía', system: 'SAP S/4HANA',
        org: 'SAP S/4HANA · genealogía de número de serie',
        sections: [
          { id: 'gen', heading: 'Componentes', text: 'GH55-26-0187: bomba de engranajes del lote BMB-2607-044, bloque de válvulas del lote BLQ-2607-019, juntas del lote JNT-2606-017 y montaje MON-2608-05.' },
          { id: 'exp', heading: 'Ensayo y expedición', text: 'Ensayo final en BP-02 el 12/08/2026; expedido a Vehículos Industriales Arga el 14/08/2026 con el albarán 80045127.' }
        ]
      },
      'SF-RCL': {
        type: 'record', kind: 'Reclamaciones', code: 'Reclamaciones 12 meses', title: 'Reclamaciones de cliente · últimos 12 meses', system: 'Salesforce Service',
        org: 'Salesforce Service · casos de cliente',
        sections: [
          { id: 'res', heading: 'Resumen', text: '11 reclamaciones de cliente en los últimos 12 meses: 10 cerradas con 8D y verificación de eficacia; 1 abierta (fuga de aceite en una PH-250 de Prensas y Servicios del Norte).' },
          { id: 'arga', heading: 'Vehículos Industriales Arga', text: 'Reclamaciones de Vehículos Industriales Arga en los últimos 12 meses: 1 (conector del presostato mal orientado), con 8D cerrado el 21/11/2025.' }
        ]
      }
    },
    questions: [
      {
        id: 'A1', ref: 'SQA-07 1.1', sec: 'A', topic: 'Certificaciones del sistema de gestión', conf: 'alta',
        qEs: 'Indique las certificaciones de sistema de gestión vigentes (ISO 9001, ISO 14001, IATF 16949 u otras) del centro que suministra, con alcance y fecha de caducidad.',
        es: 'La Planta de Zaragoza está certificada en ISO 9001:2015 para el diseño, la fabricación, el ensayo y el servicio posventa de prensas y grupos hidráulicos [1]; el certificado es válido hasta el 13/03/2027 y la auditoría de seguimiento del 11/03/2026 se superó sin no conformidades mayores [2]. El sistema ambiental está certificado en ISO 14001:2015, también con validez hasta el 13/03/2027 [3]. La organización no está certificada en IATF 16949 [4]. Se adjuntan copias de ambos certificados.',
        cites: [
          { src: 'CERT-9001', q: 'Diseño, fabricación, ensayo y servicio posventa de prensas hidráulicas y grupos hidráulicos' },
          { src: 'CERT-9001', q: 'válido hasta el 13/03/2027. Auditoría de seguimiento del 11/03/2026 superada sin no conformidades mayores' },
          { src: 'CERT-14001', q: 'Emitido el 14/03/2024; válido hasta el 13/03/2027.' },
          { src: 'MAN-CAL-001', q: 'La organización no está certificada en IATF 16949' }
        ]
      },
      {
        id: 'A2', ref: 'SQA-07 1.2', sec: 'A', topic: 'IATF 16949 y herramientas básicas', conf: 'media',
        qEs: 'Si no está certificado en IATF 16949, ¿aplica las herramientas básicas (APQP, AMFE, plan de control, MSA, SPC, PPAP) y los requisitos específicos de cliente? ¿Tiene fecha prevista de certificación?',
        es: 'Sí. Aunque no estamos certificados en IATF 16949, para productos nuevos o modificados aplicamos APQP, AMFE de diseño y de proceso, plan de control, MSA, SPC y PPAP según el manual AIAG (4.ª edición) [1]. Los requisitos específicos de cada cliente se registran en SAP S/4HANA y se revisan en cada oferta y en cada cambio de revisión [2]. El GH-55 que suministramos a Arga tiene PPAP nivel 3 aprobado (PSW del 03/03/2025) [3].',
        cites: [
          { src: 'MAN-CAL-001', q: 'se aplican APQP, AMFE de diseño y de proceso, plan de control, MSA, SPC y PPAP según el manual AIAG (4.ª edición)' },
          { src: 'MAN-CAL-001', q: 'Los requisitos específicos de cada cliente (CSR) se registran en SAP S/4HANA y se revisan en cada oferta y en cada cambio de revisión del cliente' },
          { src: 'WCH-PPAP', q: 'PSW aprobado el 03/03/2025' }
        ],
        gap: 'El cliente pregunta por la fecha prevista de certificación IATF 16949 y no hay análisis de brechas ni decisión de Dirección en las fuentes indexadas. Confírmalo con Dirección antes de enviar o indica que no hay fecha prevista.'
      },
      {
        id: 'A3', ref: 'SQA-07 1.3', sec: 'A', topic: 'Auditorías internas y de proceso', conf: 'alta',
        qEs: 'Describa su programa de auditorías internas (sistema, proceso y producto). ¿Cuántas auditorías y no conformidades tuvo el último año?',
        es: 'El programa anual cubre todos los procesos del sistema y cada línea de fabricación recibe al menos una auditoría de proceso al año, con cuestionario basado en VDA 6.3 [1]; los auditores están cualificados y no auditan su propio trabajo [2]. En 2025 se hicieron 14 auditorías internas y 6 de cliente, con 9 no conformidades menores, todas cerradas en plazo, y ninguna mayor [3].',
        cites: [
          { src: 'PR-CAL-012', q: 'cada línea de fabricación recibe al menos una auditoría de proceso al año, con cuestionario basado en VDA 6.3' },
          { src: 'PR-CAL-012', q: 'Los auditores internos están cualificados y no auditan su propio trabajo.' },
          { src: 'INF-RD-2025', q: 'En 2025 se realizaron 14 auditorías internas (sistema, proceso y producto) y 6 auditorías de cliente, con 9 no conformidades menores, todas cerradas dentro de plazo, y ninguna mayor.' }
        ]
      },
      {
        id: 'B1', ref: 'SQA-07 2.1', sec: 'B', topic: 'Marcado CE y Reglamento (UE) 2023/1230', conf: 'alta',
        qEs: '¿Con qué estatus legal se suministran los grupos hidráulicos (máquina o cuasi máquina) y qué documentación acompaña cada entrega? ¿Cómo se preparan para el Reglamento (UE) 2023/1230 de máquinas?',
        es: 'Los grupos hidráulicos GH se suministran como cuasi máquinas, con declaración de incorporación (anexo II.1.B de la Directiva 2006/42/CE) e instrucciones de montaje (anexo VI) [1]. Para el GH-55 se entregan la declaración DI-GH55-2026 y las instrucciones IM-GH55 rev. 3 en español, inglés y francés [2], y el expediente técnico se conserva en PLM Windchill al menos 10 años desde la última unidad fabricada [3]. El plan de adaptación al Reglamento (UE) 2023/1230, aplicable desde el 20/01/2027, revisa expedientes, instrucciones digitales y la nueva declaración de incorporación, con seguimiento trimestral [4].',
        cites: [
          { src: 'PR-ING-003', q: 'Los grupos hidráulicos GH se suministran como cuasi máquinas, con declaración de incorporación (anexo II.1.B de la Directiva 2006/42/CE) e instrucciones de montaje (anexo VI)' },
          { src: 'WCH-ET-GH55', q: 'Declaración de incorporación DI-GH55-2026 e instrucciones de montaje IM-GH55 rev. 3 en español, inglés y francés.' },
          { src: 'PR-ING-003', q: 'El expediente técnico de cada modelo se conserva en PLM Windchill durante al menos 10 años desde la fabricación de la última unidad.' },
          { src: 'PR-ING-003', q: 'El plan de adaptación al Reglamento (UE) 2023/1230, aplicable desde el 20/01/2027, incluye la revisión de los expedientes técnicos, las instrucciones en formato digital y la nueva declaración de incorporación' }
        ]
      },
      {
        id: 'B2', ref: 'SQA-07 2.2', sec: 'B', topic: 'PPAP nivel 3', conf: 'alta',
        qEs: '¿Puede presentar PPAP nivel 3 de las referencias suministradas? Indique la fecha de aprobación vigente y los estudios de capacidad y de sistema de medición incluidos.',
        es: 'Sí. El PPAP nivel 3 del GH-55 (revisión C) se presentó a Vehículos Industriales Arga el 12/02/2025 y el PSW se aprobó el 03/03/2025 [1]. Incluye AMFE de diseño y de proceso, diagrama de flujo y plan de control [2], un estudio R&R del calibre de asiento de válvula del 8,4 % [3] y una capacidad inicial Ppk de 1,92 en el diámetro de asiento de válvula [4]. Los PPAP se elaboran según el manual AIAG (4.ª edición) [5].',
        cites: [
          { src: 'WCH-PPAP', q: 'PPAP nivel 3 del GH-55 (revisión C) presentado a Vehículos Industriales Arga el 12/02/2025; PSW aprobado el 03/03/2025.' },
          { src: 'WCH-PPAP', q: 'Diagrama de flujo y plan de control' },
          { src: 'WCH-PPAP', q: 'Estudio R&R del calibre de asiento de válvula: 8,4 %' },
          { src: 'WCH-PPAP', q: 'Capacidad inicial: Ppk 1,92 en el diámetro de asiento de válvula' },
          { src: 'MAN-CAL-001', q: 'PPAP según el manual AIAG (4.ª edición)' }
        ],
        note: { tone: 'brand', icon: 'info', title: 'Solo el GH-55 tiene PPAP en Windchill', text: 'Windchill guarda el PPAP del GH-55; el del GH-30 no aparece en los registros consultados. Si Arga lo pide para las dos referencias, Calidad debe confirmar si el GH-30 entró con aprobación anterior al PPAP.' }
      },
      {
        id: 'B3', ref: 'SQA-07 2.3', sec: 'B', topic: 'REACH, SCIP y RoHS', conf: 'alta',
        qEs: '¿Contienen sus productos sustancias de la lista de candidatas (SVHC) de REACH por encima del 0,1 % en peso? ¿Han notificado a SCIP? ¿Cumplen RoHS los componentes eléctricos?',
        es: 'No. La lista de materiales del GH-55 se ha revisado frente a la lista de candidatas de la ECHA (actualización de junio de 2026) y ningún artículo contiene SVHC por encima del 0,1 % en peso [1], por lo que no procede notificar a SCIP [2]. El cuadro eléctrico cumple la Directiva 2011/65/UE (RoHS) y las declaraciones de los proveedores de componentes electrónicos están archivadas [3].',
        cites: [
          { src: 'WCH-CMP', q: 'ningún artículo contiene sustancias SVHC por encima del 0,1 % en peso' },
          { src: 'WCH-CMP', q: 'No procede notificación a la base de datos SCIP' },
          { src: 'WCH-CMP', q: 'El cuadro eléctrico del GH-55 cumple la Directiva 2011/65/UE; declaraciones de los proveedores de componentes electrónicos archivadas.' }
        ]
      },
      {
        id: 'C1', ref: 'SQA-07 3.1', sec: 'C', topic: 'Calibración de equipos de medida', conf: 'alta',
        qEs: '¿Cómo garantiza la calibración y la trazabilidad metrológica de los equipos de medición? ¿Qué hace si un equipo resulta fuera de tolerancia?',
        es: 'Los equipos se calibran en laboratorios acreditados por ENAC según ISO/IEC 17025, con trazabilidad a patrones nacionales y la periodicidad del plan en GMAO Maximo [1]. Hoy hay 412 equipos en el plan [2], 409 con calibración en vigor [3] y 3 vencidos, bloqueados y retirados de uso [4]. Si un equipo está vencido o fuera de tolerancia se bloquea y se evalúa el producto medido desde la última calibración correcta [5].',
        cites: [
          { src: 'PR-CAL-015', q: 'Los equipos de medición se calibran en laboratorios acreditados por ENAC según ISO/IEC 17025, con trazabilidad a patrones nacionales' },
          { src: 'MAX-CAL', q: '412 equipos en el plan de calibración' },
          { src: 'MAX-CAL', q: '409 con calibración en vigor' },
          { src: 'MAX-CAL', q: '3 vencidos, bloqueados y retirados de uso hasta su calibración' },
          { src: 'PR-CAL-015', q: 'Un equipo vencido o fuera de tolerancia se bloquea en Maximo y se evalúa el producto medido desde la última calibración correcta.' }
        ]
      },
      {
        id: 'C2', ref: 'SQA-07 3.2', sec: 'C', topic: 'SPC y análisis del sistema de medición', conf: 'alta',
        qEs: '¿Cómo controla las características especiales (CC/SC)? Indique la capacidad actual y el criterio de aceptación de los estudios R&R.',
        es: 'Las características especiales del GH-55 se controlan con SPC en MES Opcenter: el diámetro de asiento de la válvula de descarga tiene un Cpk de 1,58 [1] y el par de apriete de la brida de la bomba un Cpk de 1,71 [2], y la presión de tarado de la válvula de seguridad se controla al 100 % en banco [3]. Un punto fuera de límites supone parada, contención del lote y aviso a Calidad [4]. En los R&R aceptamos hasta el 10 %; entre el 10 % y el 30 % solo con aprobación de Calidad [5].',
        cites: [
          { src: 'OPC-SPC', q: 'Diámetro de asiento de la válvula de descarga (CC) · Cpk 1,58 en las últimas 125 piezas' },
          { src: 'OPC-SPC', q: 'Par de apriete de la brida de la bomba (SC) · Cpk 1,71 en las últimas 125 piezas' },
          { src: 'OPC-SPC', q: 'Presión de tarado de la válvula de seguridad (CC) · control al 100 % en banco de pruebas' },
          { src: 'OPC-SPC', q: 'Punto fuera de límites de control: parada, contención del lote y aviso a Calidad en Opcenter.' },
          { src: 'PR-CAL-015', q: 'Criterio de R&R: hasta el 10 % aceptable; del 10 % al 30 %, aceptable condicionado a la aprobación de Calidad' }
        ],
        note: {
          tone: 'warn', icon: 'activity', title: 'Alarma de hoy en el centro de mecanizado MC-04',
          text: 'Desde las 03:40 el husillo de MC-04 vibra a 7,8 mm/s RMS (límite 4,5 mm/s, ISO 10816-3 zona D) y en esa ventana se mecanizaron 42 culatas del lote [[lot:CUL-2609-118]]. No son componentes del GH-30 ni del GH-55; la respuesta describe el sistema de control, no el caso de hoy.',
          outcome: 'alarma', with: { approved: 'En la alarma: {label}.', any: 'En la alarma se ha rechazado la propuesta del agente.' },
          without: 'La decisión sobre esas piezas se toma en la escena de la alarma.',
          go: 'alarma', goLabel: 'Abrir la alarma'
        }
      },
      {
        id: 'C3', ref: 'SQA-07 3.3', sec: 'C', topic: 'Ensayo final al 100 %', conf: 'alta',
        qEs: '¿Se ensaya cada unidad antes de su expedición? Describa los parámetros del ensayo, el criterio de aceptación y cómo se registran los resultados.',
        es: 'Sí. Cada grupo hidráulico se ensaya en el banco BP-02: tarado de la válvula de seguridad a la presión nominal ±3 % [1], estanqueidad a 1,1 veces la presión máxima de trabajo durante 10 min sin fugas [2] y limpieza del aceite con código ISO 4406 18/16/13 o mejor [3]. Caudal, presión, ruido y temperatura del aceite se registran por número de serie [4]. En septiembre de 2026 se ensayaron 64 GH-55 al 100 %: 63 conformes a la primera y 1 retrabajada y conforme en el segundo ensayo [5]. El diseño aplica UNE-EN ISO 4413 [6].',
        cites: [
          { src: 'OPC-BP', q: 'Tarado de la válvula de seguridad a la presión nominal ±3 %' },
          { src: 'OPC-BP', q: 'Estanqueidad a 1,1 veces la presión máxima de trabajo durante 10 min, sin fugas' },
          { src: 'OPC-BP', q: 'Limpieza del aceite: código ISO 4406 18/16/13 o mejor' },
          { src: 'OPC-BP', q: 'Caudal, presión, ruido y temperatura de aceite registrados por número de serie' },
          { src: 'OPC-BP', q: 'GH-55: 64 unidades ensayadas al 100 %; 63 conformes a la primera y 1 retrabajada (fuga en racor) y conforme en el segundo ensayo.' },
          { src: 'WCH-ET-GH55', q: 'UNE-EN ISO 4413:2011 · Transmisiones hidráulicas. Reglas generales y requisitos de seguridad' }
        ]
      },
      {
        id: 'D1', ref: 'SQA-07 4.1', sec: 'D', topic: 'Trazabilidad por número de serie', conf: 'media',
        qEs: '¿Pueden trazar cada unidad por número de serie hasta los lotes de sus componentes y, en sentido inverso, de un lote de componente a las unidades y clientes afectados? Indique el tiempo objetivo y el resultado del último simulacro.',
        es: 'Sí. Cada unidad queda vinculada en SAP S/4HANA a los lotes de sus componentes; por ejemplo, el GH55-26-0187 lleva bomba del lote BMB-2607-044, bloque de válvulas del lote BLQ-2607-019 y juntas del lote JNT-2606-017 [1], y se ensayó el 12/08/2026 y se expidió a Arga el 14/08/2026 con el albarán 80045127 [2]. En sentido inverso, el alcance de una campaña se determina por número de serie desde la genealogía de SAP y Opcenter, con el objetivo de identificar todos los equipos y clientes afectados en 4 h [3].',
        cites: [
          { src: 'SAP-SERIE', q: 'GH55-26-0187: bomba de engranajes del lote BMB-2607-044, bloque de válvulas del lote BLQ-2607-019, juntas del lote JNT-2606-017' },
          { src: 'SAP-SERIE', q: 'Ensayo final en BP-02 el 12/08/2026; expedido a Vehículos Industriales Arga el 14/08/2026 con el albarán 80045127.' },
          { src: 'PR-POS-005', q: 'Objetivo: identificar todos los equipos y clientes afectados en 4 h.' }
        ],
        gap: 'La fecha y el resultado del último simulacro de campaña de campo no están en las fuentes indexadas.',
        gapGo: 'retirada', gapGoLabel: 'Hacer un simulacro ahora', gapOutcome: 'retirada',
        gapOutcomeText: 'En esta sesión ya hay un simulacro: {label}. Añádelo a la respuesta si procede.'
      },
      {
        id: 'D2', ref: 'SQA-07 4.2', sec: 'D', topic: 'No conformidades y 8D', conf: 'alta',
        qEs: 'Describa el tratamiento de no conformidades y reclamaciones: plazos de respuesta, método de análisis de causa raíz y verificación de eficacia. ¿Cuántas reclamaciones de Arga tuvo en los últimos 12 meses?',
        es: 'Toda no conformidad se registra en SAP S/4HANA (QM), con contención inmediata del producto sospechoso y decisión de destino por Calidad [1]. Ante una reclamación hacemos acuse en 24 h, contención (D3) en 48 h e informe 8D completo en 10 días laborables, salvo otro plazo pactado [2]. La causa raíz se analiza con 5 porqués e Ishikawa, separando ocurrencia y no detección, y la eficacia se verifica a los 90 días [3]. En los últimos 12 meses hemos recibido 1 reclamación de Arga, con 8D cerrado el 21/11/2025 [4].',
        cites: [
          { src: 'PR-CAL-004', q: 'Toda no conformidad se registra en SAP S/4HANA (QM), con contención inmediata del producto sospechoso y decisión de destino por Calidad.' },
          { src: 'PR-CAL-008', q: 'Acuse de recibo al cliente en 24 h, acciones de contención (D3) en 48 h e informe 8D completo en 10 días laborables' },
          { src: 'PR-CAL-008', q: 'La causa raíz se analiza con 5 porqués e Ishikawa, separando causa de ocurrencia y de no detección, y se verifica la eficacia de las acciones a los 90 días.' },
          { src: 'SF-RCL', q: 'Reclamaciones de Vehículos Industriales Arga en los últimos 12 meses: 1 (conector del presostato mal orientado), con 8D cerrado el 21/11/2025.' }
        ],
        note: {
          tone: 'warn', icon: 'link', title: 'Reclamación abierta {rec_code} · componente común',
          text: 'Prensas y Servicios del Norte tiene abierta una reclamación por fuga de aceite en la PH-250 n.º de serie PH250-26-0412; la junta del cilindro es del lote [[lot:JNT-2607-031]] de Sellados Ibéricos, que también va montado en 6 GH-55 en campo. Según la genealogía, ninguno de esos 6 equipos se expidió a Arga; revisad que esta respuesta sea coherente con el informe 8D antes de enviarla.',
          outcome: 'reclamacion', tone_done: 'brand', with: { any: 'Estado de la reclamación: {label}.' },
          go: 'reclamacion', goLabel: 'Abrir la reclamación'
        }
      },
      {
        id: 'D3', ref: 'SQA-07 4.3', sec: 'D', topic: 'Gestión de cambios (PCN)', conf: 'alta',
        qEs: '¿Notifican al cliente los cambios de producto, proceso, lugar de fabricación o proveedor antes de implantarlos? ¿Cómo se gestionan?',
        es: 'Sí. Los cambios de diseño, de proceso, de lugar de fabricación o de proveedor de un componente con característica especial se notifican al cliente antes de implantarse y no se expiden hasta la aprobación del PPAP correspondiente [1]. Cada cambio se gestiona como orden de cambio (ECN) en PLM Windchill, con análisis de impacto en AMFE y plan de control [2].',
        cites: [
          { src: 'PR-ING-007', q: 'Los cambios de diseño, de proceso, de lugar de fabricación o de proveedor de un componente con característica especial se notifican al cliente antes de implantarse y no se expiden hasta la aprobación del PPAP correspondiente.' },
          { src: 'PR-ING-007', q: 'Cada cambio se gestiona como orden de cambio (ECN) en PLM Windchill, con análisis de impacto en AMFE y plan de control.' }
        ]
      },
      {
        id: 'E1', ref: 'SQA-07 5.1', sec: 'E', topic: 'Plan de continuidad de negocio', conf: 'none',
        qEs: '¿Dispone de un plan de continuidad de negocio que cubra la pérdida de máquinas críticas, proveedores únicos y sistemas? Indique el plazo de recuperación comprometido y la fecha de la última prueba.',
        flag: {
          reason: 'Ninguno de los {doc_count} documentos indexados describe un plan de continuidad de negocio ni un análisis de impacto (BIA).',
          partial: [
            { src: 'MAX-REP', q: 'Husillo de reserva para DMU 65 en almacén; tiempo estimado de sustitución: 36 h.', why: 'Cubre una parte del riesgo de máquina; no es un plan de continuidad ni fija un plazo de recuperación para el suministro.' }
          ],
          missing: ['Plan de continuidad de negocio y análisis de impacto (BIA)', 'Fuentes alternativas de componentes críticos (bombas, bloques de válvulas, juntas)', 'Plazo de recuperación (RTO) comprometido para el suministro a Arga', 'Fecha y resultado de la última prueba del plan']
        }
      },
      {
        id: 'E2', ref: 'SQA-07 5.2', sec: 'E', topic: 'Huella de carbono', conf: 'none',
        qEs: 'Indique sus emisiones de gases de efecto invernadero de alcance 1, 2 y 3, la huella de carbono de los productos suministrados y sus objetivos de reducción.',
        flag: {
          reason: 'Solo hay evidencia indirecta: el informe de revisión por la dirección indica que la huella de carbono de producto no se ha calculado y ningún documento recoge un inventario de emisiones.',
          partial: [
            { src: 'INF-RD-2025', q: 'Consumo eléctrico 2025: 4.210 MWh, el 38 % de origen renovable con garantía de origen.', why: 'Es un dato de energía, no un inventario de emisiones de alcance 1, 2 y 3.' },
            { src: 'CERT-14001', q: 'Fabricación de prensas y grupos hidráulicos en la Planta de Zaragoza.', why: 'ISO 14001 no exige calcular la huella de carbono.' }
          ],
          missing: ['Inventario de emisiones de alcance 1, 2 y 3 (GHG Protocol)', 'Huella de carbono de producto del GH-30 y del GH-55 (ISO 14067)', 'Objetivos de reducción y su validación (por ejemplo, SBTi)']
        }
      },
      {
        id: 'E3', ref: 'SQA-07 5.3', sec: 'E', topic: 'Seguridad de la información (TISAX)', conf: 'none',
        qEs: '¿Dispone de una evaluación TISAX vigente? Indique el nivel de evaluación, la etiqueta y cómo protege los planos y datos que le facilita Arga.',
        flag: {
          reason: 'Ninguno de los {doc_count} documentos indexados trata la seguridad de la información ni una evaluación TISAX.',
          context: 'Arga intercambiará planos de chasis a través del portal de proveedores, por eso lo pregunta. Agentic Platform no supone que exista una evaluación ni describe medidas que no estén documentadas.',
          partial: [],
          missing: ['Evaluación TISAX: nivel (AL2 o AL3), etiqueta y fecha de caducidad', 'Política de seguridad de la información', 'Medidas de protección de los planos de cliente en PLM Windchill']
        }
      }
    ]
  }
});
