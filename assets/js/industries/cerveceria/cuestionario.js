/* Cervecera Bardenas · cuestionario de homologación de Northgate Beverages Ltd (importador británico). Empresas ficticias; datos sintéticos (MFM). */
agenticPack('cerveceria', {
  cuestionario: {
    agent: 'Cuestionarios de cliente',
    lang: 'en',
    default_sel: 'B1',
    reviewer: 'Responsable de Calidad',
    assignee: 'Calidad del cliente',
    assignee_short: 'Calidad del cliente',
    team: 'Calidad',
    assign_due: '2026-10-07',
    responder: 'Cervecera Bardenas, S.A. (Fábrica de Arguedas)',
    site: 'Fábrica de Arguedas (Navarra)',
    site_label: 'Fábrica',
    page_title: 'Homologación de proveedor · Northgate Beverages',
    report_title: 'Respuesta a cuestionario de homologación de proveedor',
    ref_label: 'Referencia del cliente',
    scope_meta_label: 'Productos',
    discard_placeholder: 'Por ejemplo: se responde con el certificado IFS adjunto',
    save_system: 'SAP S/4HANA',
    qn: {
      code: 'CUE-2026-044',
      title: 'Supplier Approval Questionnaire SAQ-3 (beer and cider)',
      customer: 'Northgate Beverages Ltd',
      via: 'Northgate Beverages Ltd · Technical',
      received: '2026-09-28T08:30',
      due: '2026-10-09',
      file: 'Northgate_SAQ-3_Supplier_Approval_Cervecera_Bardenas.xlsx',
      scope: 'Bardenas Lager (botella de 33 cl y barril de 30 l) y Bardenas Sin (lata de 33 cl) para importación y distribución en el Reino Unido',
      scope_short: 'Bardenas Lager 33 cl y 30 l · Bardenas Sin 33 cl',
      scope_label: '2 cervezas en 3 formatos para el Reino Unido'
    },
    email: {
      mailbox: 'buzón de Calidad',
      headers: {
        From: 'Technical Team, Northgate Beverages Ltd <technical@northgate-bev.example>',
        To: 'Calidad, Cervecera Bardenas <calidad@cerveceriabardenas.example>',
        Date: 'Mon, 28 Sep 2026 07:30 (UK time)',
        Subject: 'Supplier approval - SAQ-3 questionnaire - Bardenas Lager and Bardenas Sin - due 9 October'
      },
      text: 'Dear Quality Team,\n\nFollowing our commercial agreement, we need to complete supplier approval before the first shipment to the UK. Please find attached our Supplier Approval Questionnaire SAQ-3 for:\n- Bardenas Lager 33cl bottle and 30L keg\n- Bardenas Sin 33cl can\n\nThe questionnaire has 15 questions in five sections: certification and HACCP, product safety, process control, traceability and incidents, and packaging, labelling and sustainability.\n\nPlease answer every question in English and reference the procedure, record or certificate that supports each answer. We need the completed questionnaire by Friday 9 October 2026 so that the products can be listed in November.\n\nKind regards,\n\nTechnical Team\nNorthgate Beverages Ltd',
      highlights: [
        { text: 'Bardenas Lager 33cl bottle and 30L keg', label: 'Producto', tone: 'brand' },
        { text: 'Bardenas Sin 33cl can', label: 'Producto', tone: 'brand' },
        { text: '15 questions', label: 'Preguntas', tone: 'brand' },
        { text: 'reference the procedure, record or certificate that supports each answer', label: 'Requisito' },
        { text: 'Friday 9 October 2026', label: 'Plazo' }
      ]
    },
    sections: [
      { id: 'A', es: 'Certificación y APPCC', en: 'Certification and HACCP' },
      { id: 'B', es: 'Seguridad del producto', en: 'Product safety' },
      { id: 'C', es: 'Control del proceso', en: 'Process control' },
      { id: 'D', es: 'Trazabilidad e incidencias', en: 'Traceability and incidents' },
      { id: 'E', es: 'Envase, etiquetado y sostenibilidad', en: 'Packaging, labelling and sustainability' }
    ],
    kpi: { label: 'Auditoría IFS Food 2026', value: '97,4 %', sub: 'Nivel superior · auditoría no anunciada del 10/06/2026 · certificado hasta el 21/07/2027', icon: 'shield-check' },
    sources_sub: 'Certificado, plan APPCC, procedimientos y especificaciones',
    identify_result: 'Northgate Beverages Ltd · Bardenas Lager (33 cl y 30 l) y Bardenas Sin (33 cl) · Reino Unido',
    search_scope: 'certificado IFS, plan APPCC, procedimientos de fermentación, envasado, liberación, reclamaciones y retirada, y especificaciones de producto y etiquetado',
    lookups: [
      { system: 'Brewmaxx (MES)', action: 'Lee las unidades de pasteurización y las verificaciones del inspector de botellas', result: '100 % de los lotes entre 15 y 25 UP · verificaciones de la EBI-1 conformes', ms: 520 },
      { system: 'LIMS LabWare', action: 'Revisa la liberación de lotes de septiembre', result: '46 lotes liberados con análisis completos · 1 retenido (L2608-K14)', ms: 460 },
      { system: 'SAP S/4HANA', action: 'Reconstruye la traza de un lote de barril y busca reclamaciones', result: 'L2608-K14: malta, lúpulo y CO₂ por lote · 1 reclamación abierta', ms: 480, tone: 'warn' },
      { system: 'WMS Mecalux', action: 'Lee los palés y las expediciones del lote', result: '1.040 barriles: 912 expedidos a 14 clientes, 96 en almacén, 32 retenidos', ms: 380 },
      { system: 'SCADA bodega', action: 'Cruza el cuestionario con las alarmas de hoy', result: 'FV-12 a 16,8 °C (consigna 12 °C) desde las 02:30 · lote L2609-FV12', ms: 320, tone: 'warn' }
    ],
    compare: {
      people: '2–3: Calidad, Envasado y, según la pregunta, Compras de envases o Logística',
      systems: '6–8: correo, Excel del cliente, SAP, Brewmaxx, LIMS, WMS, carpeta de certificados y especificaciones',
      steps: 'Buscar la evidencia de cada pregunta, traducir procedimientos al inglés, pedir datos a Envasado y Compras y montar el Excel',
      time: '3–5 h de trabajo de Calidad, repartidas en 2–3 días'
    },
    presenter: {
      before: [
        'Antes del primer envío al Reino Unido, Northgate Beverages tiene que homologar la fábrica. Su cuestionario decide si la cerveza entra en los lineales en noviembre.',
        'Son {total} preguntas en inglés sobre certificación, vidrio, gluten, pasteurización, trazabilidad y etiquetado británico. Los procedimientos están en español; da igual.',
        'Al pulsar, Agentic Platform busca en el certificado IFS, el plan APPCC, los procedimientos y las especificaciones, y en los registros de Brewmaxx, LIMS, SAP, el WMS y el SCADA de bodega, y redacta cada respuesta con su fuente.'
      ],
      during: [
        '{drafted} de {total} con borrador y cita, en inglés y con traducción; cada cita se comprueba contra el texto de la fuente. {flagged} quedan sin responder: cultura de seguridad alimentaria, materiales en contacto y datos de envase para el EPR británico. Sin documento, no se inventa nada.',
        'B1: la política de vidrio responde con el procedimiento y con las verificaciones de la inspectora de botellas de este mes.',
        'C2 y D2: cruza el cuestionario con la alarma del FV-12 de esta madrugada y con la reclamación abierta por barriles oxidados. El cuestionario no vive aislado del resto de la fábrica.',
        'Nada sale sin aprobación: en bloque solo las de confianza alta; trazabilidad y etiquetado británico se revisan una a una.'
      ],
      next_during: 'Enseñar B1 (citas) y D2 (aviso de la reclamación), y E2 (sin evidencia). Después «Aprobar las {alta} de confianza alta», aprobar {media_ids} una a una y «Asignar las {flagged} sin fuente».'
    },
    sources: {
      'CERT-IFS': {
        type: 'doc', kind: 'Certificado', code: 'CERT-IFS-FOOD-8', title: 'Certificado IFS Food versión 8 · Fábrica de Arguedas', system: 'Procedimientos',
        org: 'Entidad de certificación acreditada por ENAC · certificado n.º IFS-26-7731', date: '2026-07-22',
        sections: [
          { id: 'alc', heading: 'Alcance', text: 'Elaboración y envasado en botella, lata y barril de cerveza y cerveza sin alcohol.' },
          { id: 'res', heading: 'Resultado', text: 'Nivel superior, con una puntuación del 97,4 %, en la auditoría no anunciada del 10/06/2026. Certificado válido hasta el 21/07/2027.' }
        ]
      },
      'APPCC-01': {
        type: 'doc', kind: 'Plan APPCC', code: 'APPCC-01', title: 'Plan APPCC', system: 'Procedimientos', version: '11', date: '2026-02-05', owner: 'Equipo APPCC',
        sections: [
          { id: '4', heading: '4. Puntos de control crítico', page: 8, list: ['PCC 1: pasteurización en túnel de botellas y latas, entre 15 y 25 unidades de pasteurización (UP)', 'PCC 2: pasteurización flash de la cerveza para barril, 20 UP como mínimo', 'PCC 3: inspección automática de botellas vacías, con rechazo de las que tengan cuerpos extraños o defectos'] },
          { id: '7', heading: '7. Revisión', page: 14, text: 'El equipo APPCC revisa el plan cada año y ante cualquier cambio de producto o de proceso; última revisión: 05/02/2026.' }
        ]
      },
      'PR-ENV-002': {
        type: 'doc', kind: 'Procedimiento', code: 'PR-ENV-002', title: 'Gestión de vidrio y cuerpos extraños', system: 'Procedimientos', version: '7', owner: 'Responsable de Calidad',
        sections: [
          { id: '3', heading: '3. Registro de vidrio', page: 2, text: 'Registro de vidrio y plásticos quebradizos de toda la fábrica, con inspección mensual de su estado.' },
          { id: '5', heading: '5. Rotura en la llenadora', page: 4, text: 'Ante una rotura de botella en la llenadora: parada, limpieza con aspiración y aclarado de la zona y de las válvulas afectadas, y destrucción de las botellas del grifo afectado y de los 5 grifos anteriores y posteriores durante 3 vueltas de la llenadora.' },
          { id: '6', heading: '6. Inspección', page: 5, text: 'La inspectora de botellas vacías EBI-1 se verifica con botellas testigo al inicio de cada turno y cada 2 h; el inspector de botellas llenas controla nivel, tapón y partículas en el fondo.' }
        ]
      },
      'PR-FER-003': {
        type: 'doc', kind: 'Procedimiento', code: 'PR-FER-003', title: 'Control de fermentación', system: 'Procedimientos', owner: 'Maestro cervecero',
        sections: [
          { id: '4', heading: '4. Consignas', page: 3, text: 'Bardenas Lager: consigna de fermentación de 12 °C y límite de 13,5 °C, con control continuo desde el SCADA de bodega.' },
          { id: '6', heading: '6. Desviaciones', page: 5, text: 'Si la temperatura supera el límite más de 2 h, el lote queda retenido y se analizan diacetilo y acetaldehído en LIMS antes del trasiego. Por encima de 15 °C la desviación es crítica.' }
        ]
      },
      'PR-CAL-002': {
        type: 'doc', kind: 'Procedimiento', code: 'PR-CAL-002', title: 'Liberación de producto terminado', system: 'Procedimientos', version: '5', owner: 'Responsable de Calidad',
        sections: [
          { id: '3', heading: '3. Liberación positiva', page: 2, text: 'Ningún lote se expide sin resultados conformes en LIMS: alcohol, extracto, CO₂, oxígeno disuelto, turbidez y microbiología.' }
        ]
      },
      'PR-CAL-006': {
        type: 'doc', kind: 'Procedimiento', code: 'PR-CAL-006', title: 'Retirada de producto', system: 'Procedimientos', owner: 'Responsable de Calidad',
        sections: [
          { id: '4', heading: '4. Comunicación', page: 3, text: 'Los clientes afectados reciben el aviso en las 2 h siguientes a la decisión de retirada; se notifica a la AESAN y a la autoridad sanitaria de Navarra.' },
          { id: '7', heading: '7. Objetivo y simulacros', page: 5, text: 'Objetivo: localizar todo el producto de un lote en 4 h. Se hace al menos un simulacro de retirada al año.' }
        ]
      },
      'PR-CAL-007': {
        type: 'doc', kind: 'Procedimiento', code: 'PR-CAL-007', title: 'Reclamaciones de clientes', system: 'Procedimientos', version: '4', owner: 'Responsable de Calidad',
        sections: [
          { id: '3', heading: '3. Plazos', page: 2, text: 'Respuesta inicial en 48 h e informe de investigación en 10 días hábiles; las reclamaciones de seguridad alimentaria se comunican a Calidad de inmediato.' },
          { id: '5', heading: '5. Análisis', page: 3, text: 'Se analiza la muestra retenida del lote en LIMS y se registran la causa raíz y las acciones correctivas.' }
        ]
      },
      'ET-PT-001': {
        type: 'doc', kind: 'Especificación de producto', code: 'ET-PT-001', title: 'Especificación de producto terminado · Bardenas Lager', system: 'Procedimientos', owner: 'Responsable de Calidad',
        sections: [
          { id: '2', heading: '2. Composición', page: 1, text: 'Ingredientes: agua, malta de cebada, maíz y lúpulo. Graduación alcohólica: 4,8 % vol.' },
          { id: '3', heading: '3. Alérgenos', page: 1, text: 'Contiene cebada, cereal con gluten. No se declara «sin gluten».' }
        ]
      },
      'ET-PT-003': {
        type: 'doc', kind: 'Especificación de producto', code: 'ET-PT-003', title: 'Especificación de producto terminado · Bardenas Sin', system: 'Procedimientos', owner: 'Responsable de Calidad',
        sections: [
          { id: '2', heading: '2. Composición', page: 1, text: 'Ingredientes: agua, malta de cebada, lúpulo y aroma natural. Graduación alcohólica: 0,05 % vol. como máximo.' },
          { id: '3', heading: '3. Alérgenos', page: 1, text: 'Contiene cebada, cereal con gluten.' }
        ]
      },
      'ET-ETQ-UK': {
        type: 'doc', kind: 'Especificación de etiquetado', code: 'ET-ETQ-UK', title: 'Especificación de etiquetado para el Reino Unido', system: 'Procedimientos', version: '1', date: '2026-09-10', owner: 'Responsable de Calidad',
        sections: [
          { id: '2', heading: '2. Información obligatoria', page: 1, text: 'Etiquetas en inglés con denominación, grado alcohólico, lista de ingredientes con la cebada destacada, lote y consumo preferente.' },
          { id: '3', heading: '3. Bardenas Sin', page: 2, text: 'Se denomina «alcohol free», término admitido en el Reino Unido para bebidas de 0,05 % vol. como máximo.' }
        ]
      },
      'BMX-ENV': {
        type: 'record', kind: 'Registros de envasado', code: 'Envasado · septiembre', title: 'Pasteurización e inspección de botellas · septiembre de 2026', system: 'Brewmaxx (MES)',
        org: 'Brewmaxx · registros de línea',
        sections: [
          { id: 'up', heading: 'Pasteurización', text: 'Túnel TP-1: unidades de pasteurización calculadas por zona y registradas por lote; el 100 % de los lotes de septiembre, entre 15 y 25 UP.' },
          { id: 'ibv', heading: 'Inspectora de botellas vacías', text: 'EBI-1: 176 verificaciones con botellas testigo en septiembre, todas conformes.' },
          { id: 'rot', heading: 'Roturas en la llenadora', text: 'Roturas en la llenadora en septiembre: 6, todas con el protocolo de limpieza y descarte registrado.' }
        ]
      },
      'LIMS-LIB': {
        type: 'record', kind: 'Liberación de lotes', code: 'Liberación · septiembre', title: 'Lotes analizados y liberados · septiembre de 2026', system: 'LIMS LabWare',
        org: 'LIMS LabWare · liberación de producto',
        sections: [
          { id: 'lib', heading: 'Septiembre de 2026', text: 'Lotes de envasado liberados: 46, todos con análisis completos antes de la expedición. Lotes retenidos por Calidad: 1 (L2608-K14, 32 barriles).' }
        ]
      },
      'SAP-K14': {
        type: 'record', kind: 'Registro de lote', code: 'L2608-K14', title: 'Lote L2608-K14 · barril de 30 l de Bardenas Lager', system: 'SAP S/4HANA',
        org: 'SAP S/4HANA · lote y materias primas',
        sections: [
          { id: 'mp', heading: 'Materias primas', text: 'Envasado el 18/08/2026; malta MAL-2607-05, lúpulo LUP-2606-11 y CO₂ CO2-2608-02.' }
        ]
      },
      'WMS-K14': {
        type: 'record', kind: 'Traza hacia delante', code: 'L2608-K14', title: 'Lote L2608-K14 · barriles y expediciones', system: 'WMS Mecalux',
        org: 'WMS Mecalux · palés y expediciones',
        sections: [
          { id: 'fwd', heading: 'Barriles', text: '1.040 barriles llenados: 912 expedidos a 14 clientes, 96 en almacén y 32 retenidos por Calidad.' }
        ]
      },
      'SAP-RCL': {
        type: 'record', kind: 'Reclamaciones', code: 'Reclamaciones 12 meses', title: 'Reclamaciones de clientes · últimos 12 meses', system: 'SAP S/4HANA',
        org: 'SAP S/4HANA · notificaciones de calidad',
        sections: [
          { id: 'r', heading: 'Resumen', text: 'Reclamaciones de clientes en los últimos 12 meses: 37, de ellas 36 cerradas con causa raíz; ninguna por vidrio.' }
        ]
      }
    },
    questions: [
      {
        id: 'A1', ref: 'SAQ-3 1.1', sec: 'A', topic: 'Certificación GFSI', conf: 'alta',
        qEn: 'Is the manufacturing site certified to a GFSI-recognised standard (BRCGS or IFS)? Please give the grade or level, the date of the last audit and the certificate expiry date.',
        qEs: '¿Está la fábrica certificada con una norma reconocida por GFSI (BRCGS o IFS)? Indique el grado o nivel, la fecha de la última auditoría y la caducidad del certificado.',
        en: 'Yes. Our Arguedas brewery is certified to IFS Food version 8 for the brewing and packaging of beer and alcohol-free beer in bottles, cans and kegs [1]. We achieved Higher Level with a score of 97.4% at an unannounced audit on 10 June 2026, and the certificate is valid until 21 July 2027 [2]. A copy of the certificate is attached.',
        es: 'Sí. La fábrica de Arguedas está certificada en IFS Food versión 8 para la elaboración y el envasado en botella, lata y barril de cerveza y cerveza sin alcohol [1]. Obtuvimos el nivel superior, con un 97,4 %, en la auditoría no anunciada del 10/06/2026, y el certificado es válido hasta el 21/07/2027 [2]. Se adjunta copia.',
        cites: [
          { src: 'CERT-IFS', q: 'Elaboración y envasado en botella, lata y barril de cerveza y cerveza sin alcohol.' },
          { src: 'CERT-IFS', q: 'Nivel superior, con una puntuación del 97,4 %, en la auditoría no anunciada del 10/06/2026. Certificado válido hasta el 21/07/2027.' }
        ]
      },
      {
        id: 'A2', ref: 'SAQ-3 1.2', sec: 'A', topic: 'Plan APPCC y PCC', conf: 'alta',
        qEn: 'Please list the critical control points in your HACCP plan for the products supplied and state when the plan was last reviewed.',
        qEs: 'Indique los puntos de control crítico de su plan APPCC para los productos suministrados y cuándo se revisó el plan por última vez.',
        en: 'Our HACCP plan has three critical control points: tunnel pasteurisation of bottles and cans at 15 to 25 pasteurisation units (PU) [1], flash pasteurisation of keg beer at a minimum of 20 PU [2], and automatic inspection of empty bottles, rejecting any with foreign bodies or defects [3]. The HACCP team reviews the plan annually and whenever a product or process changes; it was last reviewed on 5 February 2026 [4].',
        es: 'Nuestro plan APPCC tiene tres puntos de control crítico: la pasteurización en túnel de botellas y latas, entre 15 y 25 unidades de pasteurización (UP) [1]; la pasteurización flash de la cerveza para barril, con 20 UP como mínimo [2], y la inspección automática de botellas vacías, que rechaza las que tienen cuerpos extraños o defectos [3]. El equipo APPCC lo revisa cada año y ante cualquier cambio; la última revisión es del 05/02/2026 [4].',
        cites: [
          { src: 'APPCC-01', q: 'PCC 1: pasteurización en túnel de botellas y latas, entre 15 y 25 unidades de pasteurización (UP)' },
          { src: 'APPCC-01', q: 'PCC 2: pasteurización flash de la cerveza para barril, 20 UP como mínimo' },
          { src: 'APPCC-01', q: 'PCC 3: inspección automática de botellas vacías, con rechazo de las que tengan cuerpos extraños o defectos' },
          { src: 'APPCC-01', q: 'El equipo APPCC revisa el plan cada año y ante cualquier cambio de producto o de proceso; última revisión: 05/02/2026.' }
        ]
      },
      {
        id: 'A3', ref: 'SAQ-3 1.3', sec: 'A', topic: 'Cultura de seguridad alimentaria', conf: 'none',
        qEn: 'Describe your food safety culture plan: how it is measured, the objectives set and the results of the last assessment.',
        qEs: 'Describa su plan de cultura de seguridad alimentaria: cómo se mide, qué objetivos tiene y el resultado de la última evaluación.',
        flag: {
          reason: 'Ninguno de los {doc_count} documentos indexados describe el plan de cultura de seguridad alimentaria ni su evaluación.',
          context: 'IFS Food versión 8 exige un plan de cultura de seguridad alimentaria con objetivos y medición, así que debería existir en Calidad. Agentic Platform no describe su contenido ni supone resultados.',
          partial: [],
          missing: ['Plan de cultura de seguridad alimentaria con objetivos', 'Método de medición (encuesta, indicadores)', 'Resultado de la última evaluación y acciones']
        }
      },
      {
        id: 'B1', ref: 'SAQ-3 2.1', sec: 'B', topic: 'Política de vidrio', conf: 'alta',
        qEn: 'Describe your glass and brittle plastics policy, including the procedure for a bottle breakage on the filler and how empty bottle inspection is verified.',
        qEs: 'Describa su política de vidrio y plásticos quebradizos, incluido el procedimiento ante una rotura de botella en la llenadora y cómo se verifica la inspección de botellas vacías.',
        en: 'We keep a glass and brittle plastics register for the whole brewery, inspected monthly [1]. If a bottle breaks on the filler, the line stops, the area and affected filling valves are vacuumed and rinsed, and the bottles from the affected filling valve and the 5 valves before and after it are destroyed for 3 rotations of the filler [2]; all 6 breakages in September 2026 were recorded with this protocol [3]. The empty bottle inspector (EBI) is verified with test bottles at the start of every shift and every 2 hours [4], and all 176 verifications in September were compliant [5].',
        es: 'Mantenemos un registro de vidrio y plásticos quebradizos de toda la fábrica con inspección mensual [1]. Ante una rotura de botella en la llenadora se para la línea, se aspiran y aclaran la zona y las válvulas afectadas y se destruyen las botellas del grifo afectado y de los 5 grifos anteriores y posteriores durante 3 vueltas [2]; las 6 roturas de septiembre de 2026 tienen registrado este protocolo [3]. La inspectora de botellas vacías (EBI) se verifica con botellas testigo al inicio de cada turno y cada 2 h [4] y las 176 verificaciones de septiembre fueron conformes [5].',
        cites: [
          { src: 'PR-ENV-002', q: 'Registro de vidrio y plásticos quebradizos de toda la fábrica, con inspección mensual de su estado.' },
          { src: 'PR-ENV-002', q: 'destrucción de las botellas del grifo afectado y de los 5 grifos anteriores y posteriores durante 3 vueltas de la llenadora' },
          { src: 'BMX-ENV', q: 'Roturas en la llenadora en septiembre: 6, todas con el protocolo de limpieza y descarte registrado.' },
          { src: 'PR-ENV-002', q: 'La inspectora de botellas vacías EBI-1 se verifica con botellas testigo al inicio de cada turno y cada 2 h' },
          { src: 'BMX-ENV', q: 'EBI-1: 176 verificaciones con botellas testigo en septiembre, todas conformes.' }
        ]
      },
      {
        id: 'B2', ref: 'SAQ-3 2.2', sec: 'B', topic: 'Cuerpos extraños en producto envasado', conf: 'alta',
        qEn: 'What controls detect foreign bodies in filled product, and have you received any glass-related complaints in the last 12 months?',
        qEs: '¿Qué controles detectan cuerpos extraños en el producto envasado? ¿Ha recibido reclamaciones relacionadas con vidrio en los últimos 12 meses?',
        en: 'The full bottle inspector checks fill level, closure and particles at the bottom of each bottle [1]. In the last 12 months we received 37 customer complaints, 36 of them closed with root cause, and none related to glass [2].',
        es: 'El inspector de botellas llenas controla el nivel, el tapón y las partículas en el fondo de cada botella [1]. En los últimos 12 meses recibimos 37 reclamaciones de clientes, 36 cerradas con causa raíz y ninguna por vidrio [2].',
        cites: [
          { src: 'PR-ENV-002', q: 'el inspector de botellas llenas controla nivel, tapón y partículas en el fondo' },
          { src: 'SAP-RCL', q: 'Reclamaciones de clientes en los últimos 12 meses: 37, de ellas 36 cerradas con causa raíz; ninguna por vidrio.' }
        ]
      },
      {
        id: 'B3', ref: 'SAQ-3 2.3', sec: 'B', topic: 'Alérgenos y gluten', conf: 'alta',
        qEn: 'Do the products contain any of the 14 allergens regulated under UK food information law? Are any gluten-free claims made?',
        qEs: '¿Contienen los productos alguno de los 14 alérgenos regulados por la normativa británica de información alimentaria? ¿Se declara alguno «sin gluten»?',
        en: 'Yes. Bardenas Lager is made from water, barley malt, maize and hops [1] and Bardenas Sin from water, barley malt, hops and natural flavouring [2]. Both contain barley, a cereal containing gluten [3][4], which is emphasised in the ingredients list on the UK labels [5]. No gluten-free claim is made [3].',
        es: 'Sí. Bardenas Lager lleva agua, malta de cebada, maíz y lúpulo [1] y Bardenas Sin, agua, malta de cebada, lúpulo y aroma natural [2]. Ambas contienen cebada, cereal con gluten [3][4], que se destaca en la lista de ingredientes de las etiquetas británicas [5]. No se declara ninguna «sin gluten» [3].',
        cites: [
          { src: 'ET-PT-001', q: 'Ingredientes: agua, malta de cebada, maíz y lúpulo.' },
          { src: 'ET-PT-003', q: 'Ingredientes: agua, malta de cebada, lúpulo y aroma natural.' },
          { src: 'ET-PT-001', q: 'Contiene cebada, cereal con gluten. No se declara «sin gluten».' },
          { src: 'ET-PT-003', q: 'Contiene cebada, cereal con gluten.' },
          { src: 'ET-ETQ-UK', q: 'lista de ingredientes con la cebada destacada' }
        ]
      },
      {
        id: 'C1', ref: 'SAQ-3 3.1', sec: 'C', topic: 'Pasteurización', conf: 'alta',
        qEn: 'How is pasteurisation controlled and recorded for bottles, cans and kegs?',
        qEs: '¿Cómo se controla y registra la pasteurización de botellas, latas y barriles?',
        en: 'Bottles and cans are tunnel pasteurised at 15 to 25 PU, and keg beer is flash pasteurised at a minimum of 20 PU; both are critical control points [1][2]. In the tunnel pasteuriser, pasteurisation units are calculated by zone and recorded for every lot, and all lots in September 2026 were within 15 to 25 PU [3].',
        es: 'Las botellas y latas se pasteurizan en túnel entre 15 y 25 UP y la cerveza para barril, con pasteurización flash de 20 UP como mínimo; ambos son puntos de control crítico [1][2]. En el túnel, las unidades de pasteurización se calculan por zona y se registran por lote, y todos los lotes de septiembre de 2026 estuvieron entre 15 y 25 UP [3].',
        cites: [
          { src: 'APPCC-01', q: 'PCC 1: pasteurización en túnel de botellas y latas, entre 15 y 25 unidades de pasteurización (UP)' },
          { src: 'APPCC-01', q: 'PCC 2: pasteurización flash de la cerveza para barril, 20 UP como mínimo' },
          { src: 'BMX-ENV', q: 'Túnel TP-1: unidades de pasteurización calculadas por zona y registradas por lote; el 100 % de los lotes de septiembre, entre 15 y 25 UP.' }
        ]
      },
      {
        id: 'C2', ref: 'SAQ-3 3.2', sec: 'C', topic: 'Control de fermentación', conf: 'alta',
        qEn: 'How are fermentation temperatures controlled, and what happens to a batch if a deviation occurs?',
        qEs: '¿Cómo se controla la temperatura de fermentación y qué ocurre con un lote si hay una desviación?',
        en: 'Bardenas Lager ferments at a set point of 12 °C with a limit of 13.5 °C, under continuous control from the cellar SCADA system [1]. If the temperature exceeds the limit for more than two hours, the batch is held and diacetyl and acetaldehyde are tested in the laboratory before transfer; a deviation above 15 °C is classed as critical [2].',
        es: 'Bardenas Lager fermenta con una consigna de 12 °C y un límite de 13,5 °C, con control continuo desde el SCADA de bodega [1]. Si la temperatura supera el límite más de 2 h, el lote queda retenido y se analizan diacetilo y acetaldehído en LIMS antes del trasiego; por encima de 15 °C la desviación es crítica [2].',
        cites: [
          { src: 'PR-FER-003', q: 'Bardenas Lager: consigna de fermentación de 12 °C y límite de 13,5 °C, con control continuo desde el SCADA de bodega.' },
          { src: 'PR-FER-003', q: 'Si la temperatura supera el límite más de 2 h, el lote queda retenido y se analizan diacetilo y acetaldehído en LIMS antes del trasiego. Por encima de 15 °C la desviación es crítica.' }
        ],
        note: {
          tone: 'warn', icon: 'thermometer', title: 'Alarma de hoy en el fermentador FV-12',
          text: 'El FV-12 (Bardenas Lager, lote de mosto L2609-FV12, 480 hl, día 3 de fermentación) está a 16,8 °C desde las 02:30 por un fallo de la válvula de glicol VG-12, con un pico de 17,1 °C. La respuesta describe el procedimiento, no el caso de hoy.',
          outcome: 'alarma', tone_done: 'brand', with: { approved: 'En la alarma: {label}.', any: 'En la alarma se ha rechazado la propuesta del agente.' },
          without: 'La retención del lote se decide en la escena de la alarma.',
          go: 'alarma', goLabel: 'Abrir la alarma'
        }
      },
      {
        id: 'C3', ref: 'SAQ-3 3.3', sec: 'C', topic: 'Liberación positiva', conf: 'alta',
        qEn: 'Is finished product released only after laboratory results are approved? Which parameters are tested before release?',
        qEs: '¿Se libera el producto terminado solo tras aprobar los resultados de laboratorio? ¿Qué parámetros se analizan antes de liberar?',
        en: 'Yes. No lot is dispatched without compliant laboratory results for alcohol, extract, CO2, dissolved oxygen, haze and microbiology [1]. In September 2026, 46 packaging lots were released, all with complete analyses before dispatch, and one lot was held by Quality [2].',
        es: 'Sí. Ningún lote se expide sin resultados conformes en LIMS de alcohol, extracto, CO₂, oxígeno disuelto, turbidez y microbiología [1]. En septiembre de 2026 se liberaron 46 lotes de envasado, todos con análisis completos antes de la expedición, y Calidad retuvo uno [2].',
        cites: [
          { src: 'PR-CAL-002', q: 'Ningún lote se expide sin resultados conformes en LIMS: alcohol, extracto, CO₂, oxígeno disuelto, turbidez y microbiología.' },
          { src: 'LIMS-LIB', q: 'Lotes de envasado liberados: 46, todos con análisis completos antes de la expedición. Lotes retenidos por Calidad: 1' }
        ]
      },
      {
        id: 'D1', ref: 'SAQ-3 4.1', sec: 'D', topic: 'Trazabilidad y simulacro de retirada', conf: 'media',
        qEn: 'Can you trace a finished lot back to its raw materials and forward to customers? State your target time and the date and result of your last mock recall.',
        qEs: '¿Pueden trazar un lote terminado hacia atrás hasta sus materias primas y hacia delante hasta los clientes? Indique el objetivo de tiempo y la fecha y el resultado del último simulacro de retirada.',
        en: 'Yes. For example, keg lot L2608-K14, filled on 18 August 2026, traces back to malt lot MAL-2607-05, hop lot LUP-2606-11 and CO2 lot CO2-2608-02 [1], and forward to 1,040 kegs: 912 shipped to 14 customers, 96 in stock and 32 held by Quality [2]. Our target is to locate all product from a lot within 4 hours, and we run at least one mock recall a year [3].',
        es: 'Sí. Por ejemplo, el lote de barril L2608-K14, envasado el 18/08/2026, se traza hacia atrás hasta la malta MAL-2607-05, el lúpulo LUP-2606-11 y el CO₂ CO2-2608-02 [1], y hacia delante hasta 1.040 barriles: 912 expedidos a 14 clientes, 96 en almacén y 32 retenidos por Calidad [2]. Nuestro objetivo es localizar todo el producto de un lote en 4 h y hacemos al menos un simulacro al año [3].',
        cites: [
          { src: 'SAP-K14', q: 'Envasado el 18/08/2026; malta MAL-2607-05, lúpulo LUP-2606-11 y CO₂ CO2-2608-02.' },
          { src: 'WMS-K14', q: '1.040 barriles llenados: 912 expedidos a 14 clientes, 96 en almacén y 32 retenidos por Calidad.' },
          { src: 'PR-CAL-006', q: 'Objetivo: localizar todo el producto de un lote en 4 h. Se hace al menos un simulacro de retirada al año.' }
        ],
        gap: 'La fecha y el resultado del último simulacro de retirada no están en las fuentes indexadas.',
        gapGo: 'retirada', gapGoLabel: 'Hacer un simulacro ahora', gapOutcome: 'retirada',
        gapOutcomeText: 'En esta sesión ya hay un simulacro del lote L2608-K14: {label}. Añádelo a la respuesta si procede.'
      },
      {
        id: 'D2', ref: 'SAQ-3 4.2', sec: 'D', topic: 'Gestión de reclamaciones', conf: 'alta',
        qEn: 'Describe your customer complaint handling process, including response times and how root cause is investigated.',
        qEs: 'Describa el proceso de gestión de reclamaciones de clientes, con los plazos de respuesta y cómo se investiga la causa raíz.',
        en: 'We send an initial response within 48 hours and an investigation report within 10 working days; food safety complaints are escalated to Quality immediately [1]. The retained sample of the lot is analysed in the laboratory, and the root cause and corrective actions are recorded [2].',
        es: 'Damos una respuesta inicial en 48 h y un informe de investigación en 10 días hábiles; las reclamaciones de seguridad alimentaria se comunican a Calidad de inmediato [1]. Se analiza la muestra retenida del lote en LIMS y se registran la causa raíz y las acciones correctivas [2].',
        cites: [
          { src: 'PR-CAL-007', q: 'Respuesta inicial en 48 h e informe de investigación en 10 días hábiles; las reclamaciones de seguridad alimentaria se comunican a Calidad de inmediato.' },
          { src: 'PR-CAL-007', q: 'Se analiza la muestra retenida del lote en LIMS y se registran la causa raíz y las acciones correctivas.' }
        ],
        note: {
          tone: 'warn', icon: 'mail', title: 'Reclamación abierta {rec_code} · barriles oxidados',
          text: 'Distribuciones Hosteleras Ribera informa de barriles de 30 l de Bardenas Lager con sabor a cartón (oxidación) en tres bares, del lote [[lot:L2608-K14]]. Es el mismo formato que pide Northgate: revisad que la respuesta sea coherente con la investigación antes de enviarla.',
          outcome: 'reclamacion', tone_done: 'brand', with: { any: 'Estado de la reclamación: {label}.' },
          go: 'reclamacion', goLabel: 'Abrir la reclamación'
        }
      },
      {
        id: 'D3', ref: 'SAQ-3 4.3', sec: 'D', topic: 'Retirada de producto', conf: 'alta',
        qEn: 'If a product recall is required, how and how quickly will you notify customers such as Northgate, and which authorities are notified?',
        qEs: 'Si fuera necesaria una retirada, ¿cómo y en cuánto tiempo avisarían a clientes como Northgate y a qué autoridades se notifica?',
        en: 'Affected customers are notified within 2 hours of the recall decision, and the Spanish Food Safety Agency (AESAN) and the health authority of Navarre are informed [1]. Our target is to locate all product from the affected lot within 4 hours [2].',
        es: 'Los clientes afectados reciben el aviso en las 2 h siguientes a la decisión de retirada y se notifica a la AESAN y a la autoridad sanitaria de Navarra [1]. Nuestro objetivo es localizar todo el producto del lote en 4 h [2].',
        cites: [
          { src: 'PR-CAL-006', q: 'Los clientes afectados reciben el aviso en las 2 h siguientes a la decisión de retirada; se notifica a la AESAN y a la autoridad sanitaria de Navarra.' },
          { src: 'PR-CAL-006', q: 'Objetivo: localizar todo el producto de un lote en 4 h.' }
        ]
      },
      {
        id: 'E1', ref: 'SAQ-3 5.1', sec: 'E', topic: 'Etiquetado para el Reino Unido', conf: 'media',
        qEn: 'Confirm that the labels comply with UK food labelling requirements, including the alcohol-free descriptor and the name and address of the UK importer.',
        qEs: 'Confirme que las etiquetas cumplen la normativa británica de etiquetado, incluida la denominación «alcohol free» y el nombre y la dirección del importador en el Reino Unido.',
        en: 'UK labels are in English and show the product name, alcoholic strength, the ingredients list with barley emphasised, lot and best-before date [1]. Bardenas Sin is described as "alcohol free", a term permitted in the UK for drinks of no more than 0.05% ABV [2], and its specification sets a maximum of 0.05% ABV [3].',
        es: 'Las etiquetas para el Reino Unido están en inglés con denominación, grado alcohólico, lista de ingredientes con la cebada destacada, lote y consumo preferente [1]. Bardenas Sin se denomina «alcohol free», término admitido en el Reino Unido para bebidas de 0,05 % vol. como máximo [2], y su especificación fija ese máximo [3].',
        cites: [
          { src: 'ET-ETQ-UK', q: 'Etiquetas en inglés con denominación, grado alcohólico, lista de ingredientes con la cebada destacada, lote y consumo preferente.' },
          { src: 'ET-ETQ-UK', q: 'Se denomina «alcohol free», término admitido en el Reino Unido para bebidas de 0,05 % vol. como máximo.' },
          { src: 'ET-PT-003', q: 'Graduación alcohólica: 0,05 % vol. como máximo.' }
        ],
        gap: 'La especificación de etiquetado no incluye el nombre y la dirección de Northgate como importador en el Reino Unido ni la aprobación de los diseños por el cliente. Confírmalo con Northgate antes de enviar.'
      },
      {
        id: 'E2', ref: 'SAQ-3 5.2', sec: 'E', topic: 'Materiales en contacto', conf: 'none',
        qEn: 'Please provide declarations of compliance for all food contact packaging (bottles, cans and can coatings, crowns, kegs), including the status of bisphenol A in can coatings.',
        qEs: 'Aporte las declaraciones de conformidad de todos los envases en contacto con el producto (botellas, latas y barnices, tapones corona, barriles), incluida la situación del bisfenol A en los barnices de lata.',
        flag: {
          reason: 'Las declaraciones de conformidad de los proveedores de envases no están entre los {doc_count} documentos indexados.',
          context: 'El Reglamento (UE) 2024/3190 prohíbe el bisfenol A en materiales en contacto con alimentos, con periodos transitorios; por eso Northgate pregunta por los barnices interiores de las latas. Agentic Platform no supone el estado de cada proveedor.',
          partial: [],
          missing: ['Declaraciones de conformidad (Reglamento (CE) 1935/2004 y Reglamento (UE) 10/2011) de latas, barnices, tapones corona y juntas', 'Confirmación de barnices sin bisfenol A', 'Fecha de vigencia de cada declaración']
        }
      },
      {
        id: 'E3', ref: 'SAQ-3 5.3', sec: 'E', topic: 'Datos de envase para el EPR británico', conf: 'none',
        qEn: 'For UK extended producer responsibility for packaging (pEPR), please provide the weight and material of each packaging component and its recycled content.',
        qEs: 'Para la responsabilidad ampliada del productor de envases del Reino Unido (pEPR), indique el peso y el material de cada componente del envase y su contenido reciclado.',
        flag: {
          reason: 'Ninguno de los {doc_count} documentos indexados recoge pesos, materiales ni contenido reciclado de los envases.',
          context: 'Northgate, como importador, es el productor obligado en el Reino Unido y necesita estos datos para declarar. Los tiene Compras de envases; Agentic Platform no los estima.',
          partial: [],
          missing: ['Peso y material de botella, lata, tapón, etiqueta y embalaje secundario y terciario', 'Contenido reciclado del vidrio y del aluminio', 'Datos por formato: botella de 33 cl, lata de 33 cl y barril de 30 l']
        }
      }
    ]
  }
});
