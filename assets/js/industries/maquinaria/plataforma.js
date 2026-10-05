/* Hidromec Ebro · «Cómo encaja Agentic Platform»: arquitectura, demo frente a piloto, calculadora de horas y preguntas.
 * Empresa ficticia; datos sintéticos de demostración (MFM). */
agenticPack('maquinaria', {
  plataforma: {
    nav: 'Cómo encaja en Hidromec',
    title: 'Cómo encaja en Hidromec Ebro',
    actor: 'quality',
    site: { kind: 'Planta', name: 'Planta de Zaragoza (PLAZA)', realm: 'Calidad · Zaragoza' },
    pageMeta: [
      { icon: 'factory', text: 'Planta de Zaragoza (PLAZA)' },
      { icon: 'server', text: 'Instalación en su infraestructura' },
      { icon: 'user-check', text: 'Aprobación humana antes de escribir' }
    ],
    kpis: [
      { label: 'Piloto propuesto', value: '6–8', unit: 'semanas', sub: '1 caso · Zaragoza · realm de Calidad', icon: 'calendar' },
      { label: 'Sistemas conectados en el piloto', value: '1–2', unit: 'solo lectura', sub: 'Por API o réplica de base de datos', icon: 'database' },
      { label: 'Usuarios del piloto', value: '5–10', sub: 'SSO con Microsoft Entra ID', icon: 'users' }
    ],
    arch: {
      title: 'Arquitectura de referencia en la planta de Zaragoza',
      sso: 'Acceso con SSO · Microsoft Entra ID',
      ssoShort: 'SSO de Microsoft Entra ID',
      console: 'Consola web y avisos en Microsoft Teams',
      consoleShort: 'Consola web y Teams'
    },
    deploy: {
      cpd: { seg: 'CPD propio', label: 'CPD propio · máquina virtual con Docker Compose', zone: 'CPD de Hidromec Ebro · VM con Docker Compose', text: 'Una máquina virtual en su CPD de Zaragoza con Docker Compose: aplicación, base de datos Postgres y almacén vectorial Qdrant.' },
      k8s: { seg: 'Kubernetes', label: 'Kubernetes · Helm', zone: 'Clúster Kubernetes de Hidromec Ebro · Helm', text: 'Despliegue con Helm en su clúster Kubernetes: aplicación, base de datos Postgres y almacén vectorial Qdrant.' },
      cloud: { seg: 'Nube propia', label: 'Nube de Hidromec Ebro (Azure, AWS o GCP)', zone: 'Suscripción en la nube de Hidromec Ebro (Azure, AWS o GCP)', text: 'La misma instalación en su suscripción de nube, en la región que elijan (UE).' }
    },
    llm: {
      azure: { seg: 'Azure OpenAI', name: 'Azure OpenAI', local: false, place: 'Región UE, con el contrato de Hidromec Ebro', exit: 'Sale de su red solo el texto de cada petición', note: 'Conexión por la pasarela LiteLLM de Agentic Platform; se confirma en las semanas 1–2.' },
      gemini: { seg: 'Gemini', name: 'Google Gemini', local: false, place: 'Con la cuenta y la región que contrate Hidromec Ebro', exit: 'Sale de su red solo el texto de cada petición', note: 'Proveedor incluido de serie en el catálogo de modelos de Agentic Platform.' },
      local: { seg: 'Modelo local', name: 'Modelo local', local: true, place: 'Servidor con GPU en su CPD (Ollama, LM Studio o llama.cpp)', exit: 'La inferencia se ejecuta dentro de su red', note: 'La calidad y la velocidad se dimensionan con su servidor. Sistemas revisa también los flujos de conectores y telemetría.' }
    },
    people: ['quality', 'quality_shift', 'maintenance', 'production', 'after_sales', 'purchasing'],
    peopleShort: ['Calidad', 'Calidad de turno', 'Mantenimiento', 'Producción', 'Posventa', 'Compras'],
    modules: [
      { icon: 'workflow', title: 'Workflows (Routines)', text: 'Editor visual, versiones y prueba en seco' },
      { icon: 'cpu', title: 'Agentes de planta', text: 'Mantenimiento, calidad, planificación, posventa y 8D', agents: true },
      { icon: 'user-check', title: 'Aprobación humana', text: 'Nada se escribe en un sistema sin su responsable', approval: true },
      { icon: 'book-open', title: 'Procedimientos con citas', text: 'Cada respuesta enlaza su fuente; sin fuente, lo dice' },
      { icon: 'history', title: 'Registro de auditoría', text: 'De solo añadir y exportable' },
      { icon: 'key', title: 'Permisos por rol y realm', text: 'Cada planta o departamento ve lo suyo' },
      { icon: 'gauge', title: 'Coste por petición', text: 'Estimación en USD y presupuesto por realm' },
      { icon: 'shield', title: 'Pasarela de modelos', text: 'Enmascara datos personales antes del modelo', gateway: true }
    ],
    tiles: [
      { name: 'SAP S/4HANA', icon: 'database', text: 'Lee órdenes, lotes, números de serie y pedidos. Propone el bloqueo en QM.', write: true },
      { name: 'MES Opcenter', icon: 'factory', text: 'Lee órdenes de fabricación y piezas por máquina y turno.', write: false },
      { name: 'IIoT Vibración', icon: 'activity', text: 'Lee la vibración de los husillos y sus alarmas. No actúa sobre las máquinas.', write: false },
      { name: 'GMAO Maximo', icon: 'wrench', text: 'Lee el historial de equipos. Prepara órdenes de trabajo.', write: true },
      { name: 'PLM Windchill', icon: 'layers', text: 'Lee listas de materiales, planos y revisiones.', write: false },
      { name: 'Salesforce Service', icon: 'users', text: 'Lee casos y equipos instalados. Prepara el caso y la respuesta.', write: true },
      { name: 'Microsoft 365', icon: 'mail', text: 'Avisos en Teams y borradores en Outlook. El envío al cliente se aprueba.', write: true }
    ],
    decisions: {
      deploy: ['No depende de servicios de MFM en la nube. Lo opera su equipo de Sistemas o un servicio gestionado. La red de planta (OT) no se abre: el IIoT se lee desde la DMZ industrial.'],
      llm: 'Se cambia de modelo por configuración, sin tocar los workflows; también admite OpenAI o AWS Bedrock en la UE.',
      access: [
        'SSO con Microsoft Entra ID (OIDC) o SAML 2.0. Permisos por rol y por realm: el realm «Calidad · Zaragoza» solo ve sus procedimientos y sus datos.',
        'La pasarela enmascara datos personales (nombres de contacto de clientes y técnicos) antes de llamar al modelo; los planos de Windchill no salen de su red: el agente cita la revisión, no envía el plano.'
      ],
      hitl: 'Bloquear piezas en SAP QM, abrir una OT en Maximo, reasignar una orden de fabricación o enviar un correo al cliente requiere la aprobación de su responsable. Rechazar no aplica nada y queda registrado con el motivo.',
      limits: [
        'No sustituye SAP S/4HANA, MES Opcenter, GMAO Maximo, PLM Windchill ni Salesforce Service.',
        'No actúa sobre las máquinas ni sobre el CNC: el IIoT de vibración solo se lee.',
        'No libera piezas ni decide una campaña de campo: lo decide Calidad (PR-CAL-004 y PR-POS-005).',
        'No asigna tareas ni evalúa a personas: trabaja con máquinas, órdenes, lotes y documentos.'
      ]
    },
    faqTitle: 'Preguntas habituales de Sistemas, Calidad y Dirección',
    faqSub: 'Respuestas cortas para la conversación con el equipo técnico',
    faq: [
      { topic: 'Integración', q: '¿Dónde se instala?', a: 'En una máquina virtual de su CPD con Docker Compose o en Kubernetes con Helm, o en su suscripción de nube. No depende de servicios de MFM en la nube.' },
      { topic: 'Seguridad', q: '¿Cómo entran los usuarios?', a: 'Con SSO de Microsoft Entra ID (OIDC) o SAML 2.0. Los permisos van por rol y por realm (planta o departamento). Las cuentas de servicio de los conectores son de solo lectura.' },
      { topic: 'Seguridad', q: '¿Toca la red de planta o las máquinas?', a: 'No. El IIoT de vibración se lee desde la DMZ industrial, con la segmentación por zonas y conductos de IEC 62443; Agentic Platform no escribe en PLC, CNC ni SCADA. Cualquier parada la decide y la ejecuta Mantenimiento.' },
      { topic: 'Datos', q: '¿Qué datos salen de nuestra red?', a: 'Con un modelo local, la inferencia se ejecuta en su red. Con uno externo, sale solo el texto de cada petición, sin planos ni ficheros CAD; se revisa el contrato del proveedor (sin entrenamiento con sus datos y región UE). Los flujos de conectores, telemetría y enmascarado se validan con Sistemas.' },
      { topic: 'Datos', q: '¿Quién es dueño de los datos y de los agentes?', a: 'Hidromec Ebro. Los datos, los procedimientos indexados y los workflows viven en su base de datos y se exportan. MFM no recibe copia salvo que se acuerde para soporte.' },
      { topic: 'Modelo de lenguaje', q: '¿Qué modelo de lenguaje usa y se puede cambiar?', a: 'El que elijan: Azure OpenAI, Gemini, OpenAI, AWS Bedrock en la UE o un modelo local. El catálogo de Agentic Platform permite fijar un modelo por realm y cambiarlo por configuración, sin tocar los workflows.' },
      { topic: 'Modelo de lenguaje', q: '¿Y si el modelo se equivoca?', a: 'Cada respuesta cita su fuente (procedimiento, orden, lectura del sensor) y, si no la encuentra, lo dice. Ninguna acción se aplica sin aprobación. En el piloto se mide la exactitud con 20–30 casos históricos antes de usarlo en real.' },
      { topic: 'Integración', q: '¿Hay conectores de SAP, Opcenter, Maximo o Windchill?', a: 'No de serie. En el piloto se construyen para 1–2 sistemas, por API (OData de SAP, REST de Maximo y Windchill) o réplica de base de datos de solo lectura; la lectura de bases de datos Postgres ya funciona.' },
      { topic: 'Integración', q: '¿Cuántos usuarios soporta?', a: 'La concurrencia se dimensiona y se verifica con pruebas de carga. Cada realm tiene límites de peticiones por minuto, de tokens al día y de presupuesto.' },
      { topic: 'Coste', q: '¿Cuánto cuesta cada consulta?', a: 'Agentic Platform mide el coste de cada petición en USD por realm, usuario y caso, con presupuesto diario y mensual. Un caso como la alarma del MC-04 son céntimos de modelo; el coste real se mide en el piloto.' },
      { topic: 'Coste', q: '¿Licencia y precio?', a: 'Se concretan en la propuesta comercial (SOW).' },
      { topic: 'Integración', q: '¿En qué idioma trabaja?', a: 'El chat y los agentes, en español; las respuestas al cliente, en su idioma (los 11 clientes de la campaña están en España, Portugal y Francia). La consola de administración de Agentic Platform está en inglés.' }
    ],
    seen: [
      { scene: 'turno', label: 'Resumen del turno', icon: 'activity', title: 'Parte del turno de noche', text: 'Estado de mecanizado, montaje, banco de pruebas y expedición; el agente prepara el parte diario de máquinas y lo deja para revisar.', agents: ['Agente del turno'], approver: 'production', outcome: 'parte' },
      { scene: 'workflow', label: 'De palabras a workflow', icon: 'workflow', title: 'Procedimiento escrito → workflow publicado', text: 'El procedimiento de vigilancia de vibraciones (PR-MAN-011) se convierte en un workflow con disparo, pasos, aprobación y prueba en seco.', agents: ['Generador de workflows'], approver: 'maintenance' },
      { scene: 'alarma', label: 'Alarma MC-04', icon: 'activity', title: 'Vibración del husillo del MC-04', text: '7,8 mm/s RMS frente a 4,5 (ISO 10816-3, zona D): 42 culatas del lote CUL-2609-118 bloqueadas en QM, OT en Maximo y la OF 4100872 reasignada al MC-02.', agents: ['Mantenimiento', 'Calidad', 'Planificación'], approver: 'maintenance', outcome: 'alarma' },
      { scene: 'reclamacion', label: 'Reclamación PH250-26-0412', icon: 'mail', title: 'Fuga de aceite en una PH-250', text: 'Correo de Prensas y Servicios del Norte: ficha, traza del número de serie hasta el lote de juntas JNT-2607-031, borrador de 8D y acuse en 24 h.', agents: ['Posventa', 'Calidad'], approver: 'quality', outcome: 'reclamacion' },
      { scene: 'retirada', label: 'Campaña JNT-2607-031', icon: 'git-branch', title: 'Simulacro de campaña de campo', text: '1.200 juntas → 3 lotes de montaje → 23 equipos en 11 clientes de España, Portugal y Francia, trazados en minutos frente al objetivo de 4 h.', agents: ['Trazabilidad', 'Posventa'], approver: 'quality', outcome: 'retirada' },
      { scene: 'cuestionario', label: 'Cuestionario de Vehículos Industriales Arga', icon: 'list-checks', title: 'Auditoría de proveedor de un OEM', text: 'Respuestas con evidencias citadas (ISO 9001, marcado CE, Reglamento (UE) 2023/1230, PPAP nivel 3) y huecos marcados para Calidad, como IATF 16949.', agents: ['Cuestionarios'], approver: 'quality', outcome: 'cuestionario' },
      { scene: 'procedimientos', label: 'Procedimientos', icon: 'book-open', title: 'Preguntas con citas', text: 'Mantenimiento, 8D, LOTO y campañas de campo: cada respuesta enlaza el apartado del procedimiento vigente y, si no hay fuente, lo dice.', agents: ['Procedimientos'] }
    ],
    honesty: [
      { aspect: 'Consola, workflows (Routines) y editor', demo: 'Esta consola, en el navegador, con los workflows publicados en la sesión', pilot: 'Agentic Platform instalado en su infraestructura; Routines con editor visual, versiones y prueba en seco', origin: 'serie' },
      { aspect: 'Workflow a partir de un procedimiento escrito', demo: 'Generador simulado en el navegador, con tres plantillas', pilot: 'Se integra en Agentic Platform y se valida con sus procedimientos; cada workflow se revisa antes de publicarlo', origin: 'demo' },
      { aspect: 'Agentes de Hidromec Ebro', demo: 'Mantenimiento, calidad, planificación, trazabilidad, posventa y parte diario, sobre datos sintéticos', pilot: 'Los del caso elegido, adaptados a sus datos y procedimientos', origin: 'demo' },
      { aspect: 'Conectores (SAP S/4HANA, MES Opcenter, IIoT Vibración, GMAO Maximo, PLM Windchill y Salesforce Service)', demo: 'Simulados en el navegador', pilot: 'Lectura de 1–2 sistemas por API o réplica de base de datos de solo lectura. No hay conectores de serie para SAP, Opcenter, Maximo ni Windchill', origin: 'piloto' },
      { aspect: 'Disparo por alarma', demo: 'Al abrir la alarma de vibración del MC-04', pilot: 'Webhook desde la plataforma IIoT o consulta periódica (cron): Agentic Platform no tiene planificador propio de agentes', origin: 'piloto' },
      { aspect: 'Modelo de lenguaje', demo: 'Ninguna llamada: las respuestas están preparadas', pilot: 'El que elija Hidromec Ebro (Azure OpenAI, Gemini o local), a través de la pasarela de Agentic Platform', origin: 'serie' },
      { aspect: 'Aprobación humana', demo: 'Tarjetas de aprobación; rechazar no aplica nada', pilot: 'Igual, con SSO y permisos por rol. En el piloto no se escribe en SAP: borradores y tickets que aprueba una persona', origin: 'serie' },
      { aspect: 'Procedimientos con citas', demo: '6 documentos sintéticos (PR-MAN-011, IT-MEC-021, PR-CAL-004, PR-CAL-008, PR-SEG-002 y PR-POS-005)', pilot: 'Sus procedimientos e instrucciones vigentes, con permisos por realm; objetivo ≥90 % de citas correctas', origin: 'serie' },
      { aspect: 'Registro de auditoría', demo: 'De esta sesión, guardado en el navegador y exportable a JSON o CSV', pilot: 'En la base de datos de Agentic Platform, de solo añadir, con la identidad SSO de cada persona; exportable a CSV', origin: 'serie' },
      { aspect: 'Coste por petición', demo: 'Estimación mostrada al final de las ejecuciones', pilot: 'Medido por petición en USD, por realm y por caso, con presupuesto diario y mensual', origin: 'serie' },
      { aspect: 'Datos y acciones', demo: 'Sintéticos y coherentes entre sí, preparados por MFM; las acciones no salen del navegador', pilot: 'Sus datos en modo lectura y 20–30 casos históricos, anonimizados si hace falta', origin: 'datos' }
    ],
    writes: 'Ninguna en SAP durante el piloto: borradores y tickets que aprueba una persona',
    cases: {
      A: {
        label: 'Caso A', short: 'Caso A · Reclamación de cliente', title: 'Reclamación de cliente: 8D y respuesta',
        systems: ['Salesforce Service', 'SAP S/4HANA', 'PLM Windchill'], systemsText: 'Salesforce Service, SAP S/4HANA y PLM Windchill',
        trigger: 'Correo entrante en el buzón de posventa (Outlook) o caso nuevo en Salesforce Service',
        output: 'Ficha de la reclamación, traza del número de serie hasta el lote de componente, borrador de 8D (D1–D4) y acuse en el idioma del cliente, para aprobar',
        scene: 'reclamacion', sceneLabel: 'Reclamación PH250-26-0412',
        accuracy: '≥90 % de 30 reclamaciones históricas bien extraídas (número de serie, modelo, defecto, componente y plazo)',
        accuracyHow: 'Comparación con los casos cerrados en Salesforce Service'
      },
      B: {
        label: 'Caso B', short: 'Caso B · Alarma de vibración', title: 'Alarma de vibración: piezas, bloqueo con aprobación y OT',
        systems: ['IIoT Vibración', 'MES Opcenter', 'GMAO Maximo'], systemsText: 'IIoT Vibración, MES Opcenter y GMAO Maximo',
        trigger: 'Alarma de la plataforma IIoT por webhook o consulta periódica (cron)',
        output: 'Piezas mecanizadas en la ventana de la alarma, propuesta de bloqueo para aprobar, borrador de OT y aviso en Teams',
        scene: 'alarma', sceneLabel: 'Alarma MC-04',
        accuracy: '100 % de las piezas afectadas identificadas en 20 episodios históricos de vibración',
        accuracyHow: 'Comparación con las operaciones registradas en MES Opcenter en cada episodio'
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
      client: ['Responsable en Calidad y contacto de Sistemas', 'Accesos de lectura a 1–2 sistemas', '20–30 casos históricos, anonimizados si hace falta', 'Procedimientos e instrucciones vigentes', '2–3 h a la semana de Calidad y Mantenimiento'],
      mfm: ['Instalación en su infraestructura', 'Conectores de lectura', 'Agentes y workflow del caso', 'Formación de los usuarios', 'Informe final con los criterios medidos']
    },
    pilot: {
      sub: 'Un caso, una planta (Zaragoza), un realm (Calidad) y 5–10 usuarios, en su infraestructura y con su modelo',
      after: 'Después del piloto: mantenimiento predictivo con la tendencia de vibración de los 14 centros de mecanizado, o preparación del PPAP de nuevas referencias con Windchill.',
      nextTitle: 'Siguiente paso: taller de 2 horas con Calidad, Mantenimiento y Sistemas',
      nextBody: 'Para elegir el caso, confirmar los accesos de lectura y fijar la línea base con la que se medirá el piloto.'
    },
    calc: {
      fteHours: 1736,
      note: 'Horas de trabajo repetitivo que Calidad, Mantenimiento, posventa y los jefes de turno pueden dedicar a otras tareas.',
      rows: [
        { id: 'reclamacion', label: 'Reclamación de cliente: traza, 8D y respuesta', who: 'Calidad y posventa', scene: 'reclamacion', seen: 'Reclamación PH250-26-0412', n: 6, before: 240, after: 60, basis: 'Ficha, traza del número de serie y D1–D4 del 8D' },
        { id: 'alarma', label: 'Alarma de máquina: piezas, bloqueo y OT', who: 'Mantenimiento y Calidad de turno', scene: 'alarma', seen: 'Alarma MC-04', n: 5, before: 120, after: 15, basis: 'Cruce IIoT × Opcenter, bloqueo QM y OT en Maximo' },
        { id: 'cuestionario', label: 'Cuestionario de auditoría de proveedor', who: 'Calidad', scene: 'cuestionario', seen: 'Cuestionario de cliente', n: 2, before: 480, after: 120, basis: 'OEM y distribuidores; con evidencias citadas' },
        { id: 'traza', label: 'Traza por número de serie o campaña de campo', who: 'Calidad y posventa', scene: 'retirada', seen: 'Simulacro de campaña', n: 2, before: 360, after: 30, basis: 'Lote de componente → equipos → clientes' },
        { id: 'consultas', label: 'Consultas a procedimientos e instrucciones', who: 'Mantenimiento, montaje y Calidad', scene: 'procedimientos', seen: 'Procedimientos', n: 80, before: 12, after: 3, basis: 'Búsqueda en carpetas y en Windchill' },
        { id: 'parte', label: 'Parte del turno y de máquinas', who: 'Jefes de turno', scene: 'turno', seen: 'Resumen del turno', n: 66, before: 25, after: 8, basis: '3 turnos × 22 días' }
      ]
    },
    auditEmpty: 'Genera el parte del turno, publica un workflow o aprueba el bloqueo del MC-04: cada paso aparecerá aquí con su hora, su actor y su vista.',
    auditPilot: 'El registro vive en la base de datos de Agentic Platform, identifica a cada persona por su SSO, se filtra por persona, acción y fecha y se exporta a CSV. En esta demo vive en este navegador y se borra con «Reiniciar demo».',
    proposal: {
      code: 'PIL-PLAZA-2026-01',
      filename: 'propuesta-piloto-agentic-hidromec-zaragoza',
      objective: 'Medir, con un caso real y criterios firmados, cuánto tiempo de Calidad, Mantenimiento y posventa libera Agentic Platform y con qué exactitud, sin cambiar SAP S/4HANA, MES Opcenter, IIoT Vibración, GMAO Maximo, PLM Windchill ni Salesforce Service. Agentic Platform lee de esos sistemas, razona con los procedimientos y propone; una persona aprueba antes de escribir.',
      signatures: [{ role: 'quality', note: 'Conforme con el alcance y los criterios' }, { role: 'Sistemas · Hidromec Ebro', note: 'Conforme con los accesos y el despliegue' }]
    },
    presenter: {
      arquitectura: [
        'Agentic Platform no sustituye nada: va encima de SAP, Opcenter, Maximo, Windchill y Salesforce. Lee, razona con vuestros procedimientos y propone; antes de escribir en un sistema, aprueba una persona.',
        'Se instala en vuestra infraestructura, con vuestro SSO de Microsoft Entra ID y el modelo que elijáis. Con un modelo local, la inferencia queda en vuestra red; Sistemas valida los demás flujos.',
        'Las líneas discontinuas en ámbar son las únicas escrituras, y siempre tras aprobación. El IIoT de vibración solo se lee: no se toca el CNC ni la red de planta.'
      ],
      piloto: [
        'Esto es lo que habéis visto hoy: siete casos de la planta, cada uno con sus agentes y su aprobador. Pulsad cualquiera para volver a él.',
        'Lo honesto: los datos de hoy son sintéticos y la demo no llama a ningún modelo. De serie en Agentic Platform: Routines, aprobación humana, auditoría, citas y coste por petición. Los conectores de SAP, Opcenter o Maximo se construyen en el piloto, en modo lectura.',
        'Piloto de 6–8 semanas: un caso, Zaragoza, realm de Calidad, 5–10 usuarios. Los criterios de aceptación se firman en la semana 1 y se miden en la 8.'
      ],
      horas: [
        'Preguntad cuántas reclamaciones, alarmas de máquina o cuestionarios de OEM tienen al mes y escribidlo: la calculadora es suya.',
        '«Con Agentic Platform» incluye la revisión y la aprobación de una persona. Son horas de trabajo repetitivo que Calidad y Mantenimiento pueden dedicar a otras tareas.',
        'Son supuestos para conversar: la línea base real se mide en las semanas 1–2 del piloto.'
      ],
      registro: [
        'Todo lo que hemos hecho hoy está aquí: {n}, de personas y de agentes, con hora, actor y vista.',
        'Filtrad por «Decisiones»: cada aprobación y cada rechazo, con su motivo. Nada se edita ni se borra desde la consola; se exporta a JSON o CSV.',
        'Cierre: proponemos un taller de 2 horas con Calidad, Mantenimiento y Sistemas para elegir el caso y fijar la línea base.'
      ],
      next: {
        arquitectura: 'Pulsar «Modelo local» para enseñar que el modelo entra en su red; después, pestaña «Demo y piloto».',
        piloto: 'Elegir con ellos el caso A o B y abrir la pestaña «Calculadora de horas».',
        horas: 'Escribir sus casos al mes y abrir «Registro de auditoría» para cerrar.',
        registro: 'Pulsar «Descargar propuesta de piloto (PDF)» y proponer fecha para el taller de 2 horas.'
      }
    },
    tour: [
      'Agentic Platform va encima de SAP, Opcenter, Maximo, Windchill y Salesforce: lee, prepara propuestas y una persona aprueba antes de escribir.',
      'Con un modelo local, la inferencia entra en su infraestructura; los demás flujos se validan con Sistemas.',
      'Los casos de hoy, de la alarma del MC-04 a la campaña de las juntas JNT-2607-031, y qué es de serie y qué se construye en el piloto.',
      'Piloto de 6–8 semanas: un caso, la planta de Zaragoza, realm de Calidad y criterios de aceptación firmados en la semana 1.',
      'Horas liberadas con supuestos editables; la línea base real se mide en el piloto.',
      'Todo lo hecho en la sesión queda en el registro de auditoría: decisiones humanas, pasos de los agentes y exportación.'
    ]
  }
});
