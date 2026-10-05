/* Cervecera Bardenas · «Cómo encaja Agentic Platform»: arquitectura, demo frente a piloto, calculadora de horas y preguntas.
 * Empresa ficticia; datos sintéticos de demostración (MFM). */
agenticPack('cerveceria', {
  plataforma: {
    nav: 'Cómo encaja en Bardenas',
    title: 'Cómo encaja en Cervecera Bardenas',
    actor: 'quality',
    site: { kind: 'Fábrica', name: 'Fábrica de Arguedas', realm: 'Calidad · Arguedas' },
    pageMeta: [
      { icon: 'factory', text: 'Fábrica de Arguedas' },
      { icon: 'server', text: 'Instalación en su infraestructura' },
      { icon: 'user-check', text: 'Aprobación humana antes de escribir' }
    ],
    kpis: [
      { label: 'Piloto propuesto', value: '6–8', unit: 'semanas', sub: '1 caso · Arguedas · realm de Calidad', icon: 'calendar' },
      { label: 'Sistemas conectados en el piloto', value: '1–2', unit: 'solo lectura', sub: 'Por API o réplica de base de datos', icon: 'database' },
      { label: 'Usuarios del piloto', value: '5–10', sub: 'SSO con Microsoft Entra ID', icon: 'users' }
    ],
    arch: {
      title: 'Arquitectura de referencia en la fábrica de Arguedas',
      sso: 'Acceso con SSO · Microsoft Entra ID',
      ssoShort: 'SSO de Microsoft Entra ID',
      console: 'Consola web y avisos en Microsoft Teams',
      consoleShort: 'Consola web y Teams'
    },
    deploy: {
      cpd: { seg: 'CPD propio', label: 'CPD propio · máquina virtual con Docker Compose', zone: 'CPD de Cervecera Bardenas · VM con Docker Compose', text: 'Una máquina virtual en su CPD de Arguedas con Docker Compose: aplicación, base de datos Postgres y almacén vectorial Qdrant.' },
      k8s: { seg: 'Kubernetes', label: 'Kubernetes · Helm', zone: 'Clúster Kubernetes de Cervecera Bardenas · Helm', text: 'Despliegue con Helm en su clúster Kubernetes: aplicación, base de datos Postgres y almacén vectorial Qdrant.' },
      cloud: { seg: 'Nube propia', label: 'Nube de Cervecera Bardenas (Azure, AWS o GCP)', zone: 'Suscripción en la nube de Cervecera Bardenas (Azure, AWS o GCP)', text: 'La misma instalación en su suscripción de nube, en la región que elijan (UE).' }
    },
    llm: {
      azure: { seg: 'Azure OpenAI', name: 'Azure OpenAI', local: false, place: 'Región UE, con el contrato de Cervecera Bardenas', exit: 'Sale de su red solo el texto de cada petición', note: 'Conexión por la pasarela LiteLLM de Agentic Platform; se confirma en las semanas 1–2.' },
      gemini: { seg: 'Gemini', name: 'Google Gemini', local: false, place: 'Con la cuenta y la región que contrate Cervecera Bardenas', exit: 'Sale de su red solo el texto de cada petición', note: 'Proveedor incluido de serie en el catálogo de modelos de Agentic Platform.' },
      local: { seg: 'Modelo local', name: 'Modelo local', local: true, place: 'Servidor con GPU en su CPD (Ollama, LM Studio o llama.cpp)', exit: 'La inferencia se ejecuta dentro de su red', note: 'La calidad y la velocidad se dimensionan con su servidor. Sistemas revisa también los flujos de conectores y telemetría.' }
    },
    people: ['brewmaster', 'quality', 'quality_shift', 'maintenance', 'logistics', 'customer_service'],
    peopleShort: ['Maestro cervecero', 'Calidad', 'Calidad de turno', 'Mantenimiento', 'Logística', 'Atención al cliente'],
    modules: [
      { icon: 'workflow', title: 'Workflows (Routines)', text: 'Editor visual, versiones y prueba en seco' },
      { icon: 'cpu', title: 'Agentes de fábrica', text: 'Bodega, calidad, trazabilidad, retirada, reclamaciones y parte diario', agents: true },
      { icon: 'user-check', title: 'Aprobación humana', text: 'Nada se escribe en un sistema sin su responsable', approval: true },
      { icon: 'book-open', title: 'Procedimientos con citas', text: 'Cada respuesta enlaza su fuente; sin fuente, lo dice' },
      { icon: 'history', title: 'Registro de auditoría', text: 'De solo añadir y exportable' },
      { icon: 'key', title: 'Permisos por rol y realm', text: 'Cada área de la fábrica ve lo suyo' },
      { icon: 'gauge', title: 'Coste por petición', text: 'Estimación en USD y presupuesto por realm' },
      { icon: 'shield', title: 'Pasarela de modelos', text: 'Enmascara datos personales antes del modelo', gateway: true }
    ],
    tiles: [
      { name: 'SAP S/4HANA', icon: 'database', text: 'Lee lotes, pedidos y expediciones. Propone la retención en QM.', write: true },
      { name: 'Brewmaxx (MES)', icon: 'factory', text: 'Lee cocimientos, fermentaciones, trasiegos y envasado.', write: false },
      { name: 'SCADA bodega', icon: 'activity', text: 'Lee temperaturas, presiones y alarmas. No actúa sobre válvulas ni consignas.', write: false },
      { name: 'LIMS LabWare', icon: 'flask', text: 'Lee análisis. Prepara peticiones de análisis.', write: true },
      { name: 'WMS Mecalux', icon: 'warehouse', text: 'Lee barriles, palés y expediciones. Propone inmovilizar stock.', write: true },
      { name: 'GMAO Maximo', icon: 'wrench', text: 'Lee el historial de equipos. Prepara órdenes de trabajo.', write: true },
      { name: 'Microsoft 365', icon: 'mail', text: 'Avisos en Teams y borradores en Outlook. El envío al cliente se aprueba.', write: true }
    ],
    decisions: {
      deploy: ['No depende de servicios de MFM en la nube. Lo opera su equipo de Sistemas o un servicio gestionado. La red de control de bodega no se abre: el SCADA se lee desde la DMZ industrial.'],
      llm: 'Se cambia de modelo por configuración, sin tocar los workflows; también admite OpenAI o AWS Bedrock en la UE.',
      access: [
        'SSO con Microsoft Entra ID (OIDC) o SAML 2.0. Permisos por rol y por realm: el realm «Calidad · Arguedas» solo ve sus procedimientos y sus datos.',
        'La pasarela enmascara datos personales (contactos de clientes y transportistas) antes de llamar al modelo. Las recetas y especificaciones de cerveza no salen de su red: el agente cita el documento, no lo envía.'
      ],
      hitl: 'Retener un lote en SAP QM, inmovilizar barriles en Mecalux, pedir análisis en LabWare, abrir una OT en Maximo o enviar un correo al cliente requiere la aprobación de su responsable. Rechazar no aplica nada y queda registrado con el motivo.',
      limits: [
        'No sustituye SAP S/4HANA, Brewmaxx, LIMS LabWare, WMS Mecalux ni GMAO Maximo.',
        'No actúa sobre el control de bodega: el SCADA solo se lee; no abre válvulas ni cambia consignas.',
        'No libera lotes ni decide una retirada: lo deciden el Maestro cervecero y Calidad (PR-CAL-006).',
        'No asigna tareas ni evalúa a personas: trabaja con depósitos, lotes, equipos y documentos.'
      ]
    },
    faqTitle: 'Preguntas habituales de Sistemas, Calidad y Dirección',
    faqSub: 'Respuestas cortas para la conversación con el equipo técnico',
    faq: [
      { topic: 'Integración', q: '¿Dónde se instala?', a: 'En una máquina virtual de su CPD con Docker Compose o en Kubernetes con Helm, o en su suscripción de nube. No depende de servicios de MFM en la nube.' },
      { topic: 'Integración', q: '¿Hay conectores de SAP, Brewmaxx, LabWare o el SCADA?', a: 'No de serie. En el piloto se construyen para 1–2 sistemas, por API (OData de SAP, REST de LabWare) o réplica de base de datos de solo lectura; el SCADA, a través de su historian u OPC UA en modo lectura. La lectura de bases de datos Postgres ya funciona.' },
      { topic: 'Seguridad', q: '¿Toca el control de bodega?', a: 'No. El SCADA se lee desde la DMZ industrial, con la segmentación de IEC 62443; Agentic Platform no escribe en PLC ni cambia consignas o válvulas. Cualquier actuación la hacen Producción y Mantenimiento.' },
      { topic: 'Seguridad', q: '¿Cómo entran los usuarios?', a: 'Con SSO de Microsoft Entra ID (OIDC) o SAML 2.0. Los permisos van por rol y por realm (área). Las cuentas de servicio de los conectores son de solo lectura.' },
      { topic: 'Datos', q: '¿Qué datos salen de nuestra red?', a: 'Con un modelo local, la inferencia se ejecuta en su red. Con uno externo, sale solo el texto de cada petición, sin recetas ni especificaciones completas; se revisa el contrato del proveedor (sin entrenamiento con sus datos y región UE). Los flujos de conectores, telemetría y enmascarado se validan con Sistemas.' },
      { topic: 'Datos', q: '¿Sirve para la trazabilidad que exige la normativa alimentaria?', a: 'Ayuda a cumplirla: el Reglamento (CE) 178/2002 exige trazar un paso atrás y un paso adelante, y el agente lo hace en minutos con los datos de SAP, Brewmaxx y Mecalux. El registro oficial sigue en sus sistemas; Agentic Platform prepara la traza y el borrador de comunicación a la autoridad, que aprueba Calidad.' },
      { topic: 'Modelo de lenguaje', q: '¿Qué modelo de lenguaje usa y se puede cambiar?', a: 'El que elijan: Azure OpenAI, Gemini, OpenAI, AWS Bedrock en la UE o un modelo local. El catálogo de Agentic Platform permite fijar un modelo por realm y cambiarlo por configuración, sin tocar los workflows.' },
      { topic: 'Modelo de lenguaje', q: '¿Y si el modelo se equivoca?', a: 'Cada respuesta cita su fuente (procedimiento, lectura del SCADA, análisis del LIMS) y, si no la encuentra, lo dice. Ninguna acción se aplica sin aprobación. En el piloto se mide la exactitud con 20–30 casos históricos.' },
      { topic: 'Integración', q: '¿Cuántos usuarios soporta?', a: 'La concurrencia se dimensiona y se verifica con pruebas de carga. Cada realm tiene límites de peticiones por minuto, de tokens al día y de presupuesto.' },
      { topic: 'Coste', q: '¿Cuánto cuesta cada consulta?', a: 'Agentic Platform mide el coste de cada petición en USD por realm, usuario y caso, con presupuesto diario y mensual. Una alarma de fermentador son céntimos de modelo; el coste real se mide en el piloto.' },
      { topic: 'Coste', q: '¿Licencia y precio?', a: 'Se concretan en la propuesta comercial (SOW).' },
      { topic: 'Integración', q: '¿En qué idioma trabaja?', a: 'El chat y los agentes, en español; las respuestas a clientes e importadores, en su idioma (por ejemplo, en inglés para Northgate Beverages). La consola de administración de Agentic Platform está en inglés.' }
    ],
    seen: [
      { scene: 'turno', label: 'Resumen del turno', icon: 'activity', title: 'Parte del turno de noche', text: 'Cocimiento, bodega, envasado y almacén de Arguedas; el agente prepara el parte diario de equipos y lo deja para revisar.', agents: ['Agente del turno'], approver: 'decider', outcome: 'parte' },
      { scene: 'workflow', label: 'De palabras a workflow', icon: 'workflow', title: 'Procedimiento escrito → workflow publicado', text: 'El control de fermentación (PR-FER-003) se convierte en un workflow con disparo, pasos, aprobación y prueba en seco.', agents: ['Generador de workflows'], approver: 'brewmaster' },
      { scene: 'alarma', label: 'Alarma FV-12', icon: 'thermometer', title: 'Fermentador FV-12 fuera de consigna', text: '16,8 °C frente a 12 °C por la válvula de glicol VG-12: lote L2609-FV12 (480 hl) retenido, diacetilo y acetaldehído pedidos al LIMS, OT y trasiego reprogramado.', agents: ['Mantenimiento', 'Calidad', 'Producción'], approver: 'brewmaster', outcome: 'alarma' },
      { scene: 'reclamacion', label: 'Reclamación L2608-K14', icon: 'mail', title: 'Barriles con sabor oxidado', text: 'Correo de Distribuciones Hosteleras Ribera: ficha, traza del lote de barril L2608-K14, análisis de retenidas y respuesta en 48 h.', agents: ['Atención al cliente', 'Calidad'], approver: 'quality', outcome: 'reclamacion' },
      { scene: 'retirada', label: 'Retirada L2608-K14', icon: 'git-branch', title: 'Simulacro de retirada del lote', text: '1.040 barriles → 912 expedidos a 14 clientes, 96 en almacén y 32 retenidos, con malta, lúpulo y CO₂ de origen, trazados frente al objetivo de 4 h.', agents: ['Trazabilidad', 'Logística'], approver: 'quality', outcome: 'retirada' },
      { scene: 'cuestionario', label: 'Homologación de Northgate Beverages', icon: 'list-checks', title: 'Cuestionario de un importador británico', text: 'Respuestas con evidencias citadas (APPCC, gluten, política de vidrio, trazabilidad, etiquetado UK) y huecos marcados para Calidad.', agents: ['Cuestionarios'], approver: 'quality', outcome: 'cuestionario' },
      { scene: 'procedimientos', label: 'Procedimientos', icon: 'book-open', title: 'Preguntas con citas', text: 'APPCC, fermentación, retirada, vidrio y CIP: cada respuesta enlaza el apartado del procedimiento vigente y, si no hay fuente, lo dice.', agents: ['Procedimientos'] }
    ],
    honesty: [
      { aspect: 'Consola, workflows (Routines) y editor', demo: 'Esta consola, en el navegador, con los workflows publicados en la sesión', pilot: 'Agentic Platform instalado en su infraestructura; Routines con editor visual, versiones y prueba en seco', origin: 'serie' },
      { aspect: 'Workflow a partir de un procedimiento escrito', demo: 'Generador simulado en el navegador, con tres plantillas', pilot: 'Se integra en Agentic Platform y se valida con sus procedimientos; cada workflow se revisa antes de publicarlo', origin: 'demo' },
      { aspect: 'Agentes de Cervecera Bardenas', demo: 'Bodega, calidad, trazabilidad, retirada, reclamaciones y parte diario, sobre datos sintéticos', pilot: 'Los del caso elegido, adaptados a sus datos y procedimientos', origin: 'demo' },
      { aspect: 'Conectores (SAP S/4HANA, Brewmaxx, SCADA bodega, LIMS LabWare, WMS Mecalux y GMAO Maximo)', demo: 'Simulados en el navegador', pilot: 'Lectura de 1–2 sistemas por API o réplica de base de datos de solo lectura. No hay conectores de serie para SAP, Brewmaxx, LabWare ni el SCADA', origin: 'piloto' },
      { aspect: 'Disparo por alarma', demo: 'Al abrir la alarma del fermentador FV-12', pilot: 'Webhook desde el SCADA o su historian, o consulta periódica (cron): Agentic Platform no tiene planificador propio de agentes', origin: 'piloto' },
      { aspect: 'Modelo de lenguaje', demo: 'Ninguna llamada: las respuestas están preparadas', pilot: 'El que elija Cervecera Bardenas (Azure OpenAI, Gemini o local), a través de la pasarela de Agentic Platform', origin: 'serie' },
      { aspect: 'Aprobación humana', demo: 'Tarjetas de aprobación; rechazar no aplica nada', pilot: 'Igual, con SSO y permisos por rol. En el piloto no se escribe en SAP: borradores y tickets que aprueba una persona', origin: 'serie' },
      { aspect: 'Procedimientos con citas', demo: '5 documentos sintéticos (APPCC-01, PR-FER-003, PR-CAL-006, PR-ENV-002 y PR-LIM-001)', pilot: 'Sus procedimientos vigentes, con permisos por realm; objetivo ≥90 % de citas correctas', origin: 'serie' },
      { aspect: 'Registro de auditoría', demo: 'De esta sesión, guardado en el navegador y exportable a JSON o CSV', pilot: 'En la base de datos de Agentic Platform, de solo añadir, con la identidad SSO de cada persona; exportable a CSV', origin: 'serie' },
      { aspect: 'Coste por petición', demo: 'Estimación mostrada al final de las ejecuciones', pilot: 'Medido por petición en USD, por realm y por caso, con presupuesto diario y mensual', origin: 'serie' },
      { aspect: 'Datos y acciones', demo: 'Sintéticos y coherentes entre sí, preparados por MFM; las acciones no salen del navegador', pilot: 'Sus datos en modo lectura y 20–30 casos históricos, anonimizados si hace falta', origin: 'datos' }
    ],
    writes: 'Ninguna en SAP durante el piloto: borradores y tickets que aprueba una persona',
    cases: {
      A: {
        label: 'Caso A', short: 'Caso A · Reclamación de cliente', title: 'Reclamación de cliente: traza, análisis y respuesta',
        systems: ['LIMS LabWare', 'SAP S/4HANA', 'WMS Mecalux'], systemsText: 'LIMS LabWare, SAP S/4HANA y WMS Mecalux',
        trigger: 'Correo entrante en el buzón de Calidad o de Atención al cliente (Outlook)',
        output: 'Ficha de la reclamación, traza del lote, análisis de las muestras retenidas, borrador de no conformidad y respuesta en el idioma del cliente, para aprobar',
        scene: 'reclamacion', sceneLabel: 'Reclamación L2608-K14',
        accuracy: '≥90 % de 30 reclamaciones históricas bien extraídas (lote, formato, defecto, cliente y plazo)',
        accuracyHow: 'Comparación con el registro de reclamaciones de Calidad'
      },
      B: {
        label: 'Caso B', short: 'Caso B · Desviación en bodega', title: 'Desviación de fermentación: lote, retención con aprobación y OT',
        systems: ['SCADA bodega', 'Brewmaxx (MES)', 'LIMS LabWare'], systemsText: 'temperaturas del SCADA de bodega, Brewmaxx y LIMS LabWare',
        trigger: 'Alarma del SCADA de bodega por webhook o consulta periódica (cron)',
        output: 'Lote y depósito afectados, propuesta de retención y de análisis para aprobar, borrador de OT y aviso en Teams',
        scene: 'alarma', sceneLabel: 'Alarma FV-12',
        accuracy: '100 % de los lotes y depósitos afectados identificados en 20 desviaciones históricas',
        accuracyHow: 'Comparación con los registros de Brewmaxx de cada desviación'
      }
    },
    phases: [
      { from: 1, to: 2, title: 'Accesos, instalación y línea base', detail: 'Accesos de lectura, instalación y medición del tiempo actual', result: 'Criterios firmados y línea base medida' },
      { from: 3, to: 5, title: 'Conectores, agentes y workflow', detail: 'Pruebas con 20–30 casos históricos', result: 'Exactitud medida con casos históricos' },
      { from: 6, to: 7, title: 'Uso en paralelo', detail: 'Casos reales, con el proceso actual como respaldo', result: 'Aceptación de los borradores por Calidad' },
      { from: 8, to: 8, title: 'Evaluación y decisión', detail: 'Criterios medidos e informe final', result: 'Informe final y decisión' }
    ],
    criteria: [
      { name: 'Tiempo', target: 'Traza y borrador en menos de 15 min', how: 'Cronometrado frente a la línea base de las semanas 1–2' },
      { name: 'Utilidad', target: 'Calidad acepta el borrador con ediciones menores en ≥70 % de los casos', how: 'Revisión de cada borrador por Calidad' },
      { name: 'Citas', target: '≥90 % de 50 preguntas de referencia con la cita correcta', how: 'Herramienta de evaluación incluida en Agentic Platform' },
      { name: 'Control', target: 'Ninguna acción sin aprobación; el 100 % en el registro de auditoría', how: 'Revisión del registro exportado' },
      { name: 'Coste', target: 'Coste del modelo por caso medido y dentro del presupuesto del realm', how: 'Informe de coste por realm (USD, estimación)' }
    ],
    gives: {
      client: ['Responsable en Calidad y contacto de Sistemas', 'Accesos de lectura a 1–2 sistemas', '20–30 casos históricos, anonimizados si hace falta', 'Procedimientos vigentes (APPCC, PR)', '2–3 h a la semana de Calidad y bodega'],
      mfm: ['Instalación en su infraestructura', 'Conectores de lectura', 'Agentes y workflow del caso', 'Formación de los usuarios', 'Informe final con los criterios medidos']
    },
    pilot: {
      sub: 'Un caso, una fábrica (Arguedas), un realm (Calidad) y 5–10 usuarios, en su infraestructura y con su modelo',
      after: 'Después del piloto: liberación de lotes con los análisis del LIMS, o planificación de cocimientos y envasado para la campaña de verano de 2027.',
      nextTitle: 'Siguiente paso: taller de 2 horas con Calidad, bodega y Sistemas',
      nextBody: 'Para elegir el caso, confirmar los accesos de lectura y fijar la línea base con la que se medirá el piloto.'
    },
    calc: {
      fteHours: 1736,
      note: 'Horas de trabajo repetitivo que Calidad, bodega, Mantenimiento y los jefes de turno pueden dedicar a otras tareas.',
      rows: [
        { id: 'reclamacion', label: 'Reclamación de cliente: traza, análisis y respuesta', who: 'Calidad y Atención al cliente', scene: 'reclamacion', seen: 'Reclamación L2608-K14', n: 8, before: 180, after: 45, basis: 'Distribuidores, hostelería e importadores' },
        { id: 'desviacion', label: 'Desviación de proceso en bodega: lote, retención y OT', who: 'Calidad de turno y Maestro cervecero', scene: 'alarma', seen: 'Alarma FV-12', n: 6, before: 120, after: 15, basis: 'Fermentadores, guarda y filtración' },
        { id: 'traza', label: 'Traza de lote o simulacro de retirada', who: 'Calidad y logística', scene: 'retirada', seen: 'Retirada L2608-K14', n: 2, before: 240, after: 25, basis: 'Materias primas → lote → clientes' },
        { id: 'cuestionario', label: 'Homologación de cliente o importador', who: 'Calidad', scene: 'cuestionario', seen: 'Cuestionario de homologación', n: 3, before: 360, after: 90, basis: 'Con evidencias citadas' },
        { id: 'consultas', label: 'Consultas a procedimientos (APPCC, CIP, fermentación)', who: 'Bodega, envasado y Calidad', scene: 'procedimientos', seen: 'Procedimientos', n: 120, before: 8, after: 2, basis: 'Búsqueda en carpetas y en el sistema documental' },
        { id: 'parte', label: 'Parte del turno y de equipos', who: 'Jefes de turno', scene: 'turno', seen: 'Resumen del turno', n: 66, before: 25, after: 8, basis: '3 turnos × 22 días' }
      ]
    },
    auditEmpty: 'Genera el parte del turno, publica un workflow o aprueba la retención del lote L2609-FV12: cada paso aparecerá aquí con su hora, su actor y su vista.',
    auditPilot: 'El registro vive en la base de datos de Agentic Platform, identifica a cada persona por su SSO, se filtra por persona, acción y fecha y se exporta a CSV. En esta demo vive en este navegador y se borra con «Reiniciar demo».',
    proposal: {
      code: 'PIL-ARG-2026-01',
      filename: 'propuesta-piloto-agentic-bardenas-arguedas',
      objective: 'Medir, con un caso real y criterios firmados, cuánto tiempo de Calidad y bodega libera Agentic Platform y con qué exactitud, sin cambiar SAP S/4HANA, Brewmaxx, el SCADA de bodega, LIMS LabWare, WMS Mecalux ni GMAO Maximo. Agentic Platform lee de esos sistemas, razona con los procedimientos y propone; una persona aprueba antes de escribir.',
      signatures: [{ role: 'quality', note: 'Conforme con el alcance y los criterios' }, { role: 'brewmaster', note: 'Conforme con el caso de bodega' }, { role: 'Sistemas · Cervecera Bardenas', note: 'Conforme con los accesos y el despliegue' }]
    },
    presenter: {
      arquitectura: [
        'Agentic Platform no sustituye nada: va encima de SAP, Brewmaxx, LabWare, Mecalux y Maximo. Lee, razona con vuestros procedimientos y propone; antes de escribir en un sistema, aprueba una persona.',
        'Se instala en vuestra infraestructura, con vuestro SSO de Microsoft Entra ID y el modelo que elijáis. Con un modelo local, la inferencia queda en vuestra red; Sistemas valida los demás flujos.',
        'Las líneas discontinuas en ámbar son las únicas escrituras, y siempre tras aprobación. El SCADA de bodega solo se lee: no se tocan válvulas ni consignas.'
      ],
      piloto: [
        'Esto es lo que habéis visto hoy: siete casos de la fábrica, cada uno con sus agentes y su aprobador. Pulsad cualquiera para volver a él.',
        'Lo honesto: los datos de hoy son sintéticos y la demo no llama a ningún modelo. Los conectores de SAP, Brewmaxx o el SCADA se construyen en el piloto, en modo lectura.',
        'Piloto de 6–8 semanas: un caso, Arguedas, realm de Calidad, 5–10 usuarios. Los criterios de aceptación se firman en la semana 1 y se miden en la 8.'
      ],
      horas: [
        'Preguntad cuántas reclamaciones, desviaciones de bodega o homologaciones tienen al mes y escribidlo: la calculadora es suya.',
        '«Con Agentic Platform» incluye la revisión y la aprobación de una persona. Son horas de trabajo repetitivo que Calidad y bodega pueden dedicar a otras tareas.',
        'Son supuestos para conversar: la línea base real se mide en las semanas 1–2 del piloto.'
      ],
      registro: [
        'Todo lo que hemos hecho hoy está aquí: {n}, de personas y de agentes, con hora, actor y vista.',
        'Filtrad por «Decisiones»: cada aprobación y cada rechazo, con su motivo. Nada se edita ni se borra desde la consola; se exporta a JSON o CSV.',
        'Cierre: proponemos un taller de 2 horas con Calidad, bodega y Sistemas para elegir el caso y fijar la línea base.'
      ],
      next: {
        arquitectura: 'Pulsar «Modelo local» para enseñar que el modelo entra en su red; después, pestaña «Demo y piloto».',
        piloto: 'Elegir con ellos el caso A o B y abrir la pestaña «Calculadora de horas».',
        horas: 'Escribir sus casos al mes y abrir «Registro de auditoría» para cerrar.',
        registro: 'Pulsar «Descargar propuesta de piloto (PDF)» y proponer fecha para el taller de 2 horas.'
      }
    },
    tour: [
      'Agentic Platform va encima de SAP, Brewmaxx, LabWare, Mecalux y Maximo: lee, prepara propuestas y una persona aprueba antes de escribir.',
      'Con un modelo local, la inferencia entra en su infraestructura; los demás flujos se validan con Sistemas.',
      'Los casos de hoy, del fermentador FV-12 a la retirada del lote L2608-K14, y qué es de serie y qué se construye en el piloto.',
      'Piloto de 6–8 semanas: un caso, la fábrica de Arguedas, realm de Calidad y criterios de aceptación firmados en la semana 1.',
      'Horas liberadas con supuestos editables; la línea base real se mide en el piloto.',
      'Todo lo hecho en la sesión queda en el registro de auditoría: decisiones humanas, pasos de los agentes y exportación.'
    ]
  }
});
