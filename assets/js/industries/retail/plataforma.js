/* Mercados Moncayo · «Cómo encaja Agentic Platform»: arquitectura, demo frente a piloto, calculadora de horas y preguntas.
 * Empresa ficticia; datos sintéticos de demostración (MFM). */
agenticPack('retail', {
  plataforma: {
    nav: 'Cómo encaja en Moncayo',
    title: 'Cómo encaja en Mercados Moncayo',
    actor: 'quality',
    site: { kind: 'Centro', name: 'Plataforma de Plaza y 64 tiendas', realm: 'Calidad · Plataforma y tiendas' },
    pageMeta: [
      { icon: 'warehouse', text: 'Plataforma de Plaza · 64 tiendas' },
      { icon: 'server', text: 'Instalación en su infraestructura' },
      { icon: 'user-check', text: 'Aprobación humana antes de escribir' }
    ],
    kpis: [
      { label: 'Piloto propuesto', value: '6–8', unit: 'semanas', sub: '1 caso · plataforma y 10 tiendas · realm de Calidad', icon: 'calendar' },
      { label: 'Sistemas conectados en el piloto', value: '1–2', unit: 'solo lectura', sub: 'Por API o réplica de base de datos', icon: 'database' },
      { label: 'Usuarios del piloto', value: '5–10', sub: 'SSO con Microsoft Entra ID', icon: 'users' }
    ],
    arch: {
      title: 'Arquitectura de referencia en la plataforma y las tiendas',
      sso: 'Acceso con SSO · Microsoft Entra ID',
      ssoShort: 'SSO de Microsoft Entra ID',
      console: 'Consola web, avisos en Teams y tableta de tienda',
      consoleShort: 'Consola web y Teams'
    },
    deploy: {
      cpd: { seg: 'CPD propio', label: 'CPD propio · máquina virtual con Docker Compose', zone: 'CPD de Mercados Moncayo · VM con Docker Compose', text: 'Una máquina virtual en su CPD con Docker Compose: aplicación, base de datos Postgres y almacén vectorial Qdrant.' },
      k8s: { seg: 'Kubernetes', label: 'Kubernetes · Helm', zone: 'Clúster Kubernetes de Mercados Moncayo · Helm', text: 'Despliegue con Helm en su clúster Kubernetes: aplicación, base de datos Postgres y almacén vectorial Qdrant.' },
      cloud: { seg: 'Nube propia', label: 'Nube de Mercados Moncayo (Azure, AWS o GCP)', zone: 'Suscripción en la nube de Mercados Moncayo (Azure, AWS o GCP)', text: 'La misma instalación en su suscripción de nube, en la región que elijan (UE).' }
    },
    llm: {
      azure: { seg: 'Azure OpenAI', name: 'Azure OpenAI', local: false, place: 'Región UE, con el contrato de Mercados Moncayo', exit: 'Sale de su red solo el texto de cada petición', note: 'Conexión por la pasarela LiteLLM de Agentic Platform; se confirma en las semanas 1–2.' },
      gemini: { seg: 'Gemini', name: 'Google Gemini', local: false, place: 'Con la cuenta y la región que contrate Mercados Moncayo', exit: 'Sale de su red solo el texto de cada petición', note: 'Proveedor incluido de serie en el catálogo de modelos de Agentic Platform.' },
      local: { seg: 'Modelo local', name: 'Modelo local', local: true, place: 'Servidor con GPU en su CPD (Ollama, LM Studio o llama.cpp)', exit: 'La inferencia se ejecuta dentro de su red', note: 'La calidad y la velocidad se dimensionan con su servidor. Sistemas revisa también los flujos de conectores y telemetría.' }
    },
    people: ['quality', 'quality_shift', 'store_ops', 'maintenance', 'logistics', 'customer_service', 'supplier_quality'],
    peopleShort: ['Calidad', 'Calidad de guardia', 'Jefes de zona', 'Frío', 'Plataforma', 'Consumidor', 'Proveedores'],
    modules: [
      { icon: 'workflow', title: 'Workflows (Routines)', text: 'Editor visual, versiones y prueba en seco' },
      { icon: 'cpu', title: 'Agentes de tienda y plataforma', text: 'Cadena de frío, alertas, retiradas, consumidores y proveedores', agents: true },
      { icon: 'user-check', title: 'Aprobación humana', text: 'Nada se escribe en un sistema sin su responsable', approval: true },
      { icon: 'book-open', title: 'Procedimientos con citas', text: 'Cada respuesta enlaza su fuente; sin fuente, lo dice' },
      { icon: 'history', title: 'Registro de auditoría', text: 'De solo añadir y exportable' },
      { icon: 'key', title: 'Permisos por rol y realm', text: 'Cada zona, tienda o departamento ve lo suyo' },
      { icon: 'gauge', title: 'Coste por petición', text: 'Estimación en USD y presupuesto por realm' },
      { icon: 'shield', title: 'Pasarela de modelos', text: 'Enmascara datos de consumidores antes del modelo', gateway: true }
    ],
    tiles: [
      { name: 'SAP S/4 Retail', icon: 'database', text: 'Lee artículos, lotes, pedidos y stock por tienda. Propone el bloqueo de venta.', write: true },
      { name: 'WMS Manhattan', icon: 'warehouse', text: 'Lee stock, ubicaciones y expediciones a tienda. Propone inmovilizar stock.', write: true },
      { name: 'Sensores de frío', icon: 'thermometer', text: 'Lee temperaturas de murales y cámaras. No actúa sobre los equipos.', write: false },
      { name: 'TPV tiendas', icon: 'barcode', text: 'Lee ventas por tienda, ticket y lote.', write: false },
      { name: 'CRM Fidelización', icon: 'users', text: 'Lee compras de socios. Prepara avisos y respuestas al consumidor.', write: true },
      { name: 'ServiceNow', icon: 'ticket', text: 'Prepara OT de frío y tareas de tienda.', write: true },
      { name: 'Microsoft 365', icon: 'mail', text: 'Avisos en Teams y borradores en Outlook. El envío se aprueba.', write: true }
    ],
    decisions: {
      deploy: ['No depende de servicios de MFM en la nube. Lo opera su equipo de Sistemas o un servicio gestionado; las tiendas lo usan desde el navegador o la tableta de tienda, sin instalar nada.'],
      llm: 'Se cambia de modelo por configuración, sin tocar los workflows; también admite OpenAI o AWS Bedrock en la UE.',
      access: [
        'SSO con Microsoft Entra ID (OIDC) o SAML 2.0. Permisos por rol y por realm: un jefe de zona ve sus tiendas; Calidad ve la plataforma y toda la red.',
        'Los datos de socios de fidelización son personales (RGPD): la pasarela enmascara nombre, teléfono y correo antes de llamar al modelo; el aviso a los 612 clientes del lote se prepara con su base legal y lo aprueba Calidad.'
      ],
      hitl: 'Bloquear la venta de un lote en SAP y TPV, inmovilizar stock en Manhattan, enviar una tarea de retirada a tienda, abrir una OT de frío o escribir a un consumidor requiere la aprobación de su responsable. Rechazar no aplica nada y queda registrado con el motivo.',
      limits: [
        'No sustituye SAP S/4 Retail, WMS Manhattan, el TPV, el CRM ni ServiceNow.',
        'No actúa sobre los equipos de frío: los sensores solo se leen.',
        'No decide una retirada ni la comunicación a AESAN y a la comunidad autónoma: lo decide Calidad (PR-CAL-010).',
        'No evalúa a personas ni a tiendas: trabaja con productos, lotes, equipos y documentos.'
      ]
    },
    faqTitle: 'Preguntas habituales de Sistemas, Calidad y Dirección',
    faqSub: 'Respuestas cortas para la conversación con el equipo técnico',
    faq: [
      { topic: 'Integración', q: '¿Dónde se instala?', a: 'En una máquina virtual de su CPD con Docker Compose o en Kubernetes con Helm, o en su suscripción de nube. No depende de servicios de MFM en la nube.' },
      { topic: 'Integración', q: '¿Hay conectores de SAP, Manhattan o el TPV?', a: 'No de serie. En el piloto se construyen para 1–2 sistemas, por API (OData de SAP, REST de Manhattan) o réplica de base de datos de solo lectura; los sensores de frío suelen exponer API o MQTT. La lectura de bases de datos Postgres ya funciona.' },
      { topic: 'Integración', q: '¿Cómo lo usan las tiendas?', a: 'Desde el navegador de la tableta o el PC de tienda, o con avisos en Teams. La tarea de retirada llega con el lineal, las unidades y el procedimiento citado; el encargado la confirma y queda registrada.' },
      { topic: 'Seguridad', q: '¿Cómo entran los usuarios?', a: 'Con SSO de Microsoft Entra ID (OIDC) o SAML 2.0. Los permisos van por rol y por realm (zona, tienda o departamento). Las cuentas de servicio de los conectores son de solo lectura.' },
      { topic: 'Datos', q: '¿Qué datos salen de nuestra red?', a: 'Con un modelo local, la inferencia se ejecuta en su red. Con uno externo, sale solo el texto de cada petición, sin datos de socios en claro; se revisa el contrato del proveedor (sin entrenamiento con sus datos y región UE). Los flujos de conectores, telemetría y enmascarado se validan con Sistemas.' },
      { topic: 'Datos', q: '¿Y el RGPD con los datos de fidelización?', a: 'Mercados Moncayo es responsable; MFM, encargado del tratamiento con contrato (art. 28). Avisar a quien compró un lote retirado se apoya en la protección de la salud del consumidor; antes de usar datos reales se revisa con el DPO. Minimización: el agente solo pide los campos que necesita.' },
      { topic: 'Modelo de lenguaje', q: '¿Qué modelo de lenguaje usa y se puede cambiar?', a: 'El que elijan: Azure OpenAI, Gemini, OpenAI, AWS Bedrock en la UE o un modelo local. El catálogo de Agentic Platform permite fijar un modelo por realm y cambiarlo por configuración, sin tocar los workflows.' },
      { topic: 'Modelo de lenguaje', q: '¿Y si el modelo se equivoca?', a: 'Cada respuesta cita su fuente (procedimiento APPCC, lectura del sensor, movimiento de stock) y, si no la encuentra, lo dice. Ninguna acción se aplica sin aprobación. En el piloto se mide la exactitud con 20–30 casos históricos.' },
      { topic: 'Integración', q: '¿Cuántos usuarios soporta?', a: 'La concurrencia se dimensiona y se verifica con pruebas de carga: en una red de 64 tiendas, con picos de uso al abrir. Cada realm tiene límites de peticiones por minuto, de tokens al día y de presupuesto.' },
      { topic: 'Coste', q: '¿Cuánto cuesta cada consulta?', a: 'Agentic Platform mide el coste de cada petición en USD por realm, usuario y caso, con presupuesto diario y mensual. Una alarma de frío son céntimos de modelo; el coste real se mide en el piloto.' },
      { topic: 'Coste', q: '¿Licencia y precio?', a: 'Se concretan en la propuesta comercial (SOW).' },
      { topic: 'Integración', q: '¿En qué idioma trabaja?', a: 'El chat y los agentes, en español; las respuestas a consumidores y proveedores, en su idioma. La consola de administración de Agentic Platform está en inglés.' }
    ],
    seen: [
      { scene: 'turno', label: 'Resumen del turno', icon: 'activity', title: 'Resumen del turno de noche', text: 'Plataforma de Plaza y 64 tiendas: recepción, preparación, expediciones y frío; el agente prepara el parte y lo deja para revisar.', agents: ['Agente del turno'], approver: 'decider', outcome: 'parte' },
      { scene: 'workflow', label: 'De palabras a workflow', icon: 'workflow', title: 'Procedimiento escrito → workflow publicado', text: 'El APPCC de cadena de frío en tienda (APPCC-TIE-01) se convierte en un workflow con disparo, pasos, aprobación y prueba en seco.', agents: ['Generador de workflows'], approver: 'quality' },
      { scene: 'alarma', label: 'Alarma T-027', icon: 'thermometer', title: 'Mural de lácteos de Huesca Centro', text: 'MR-3 a 9,4 °C frente a 5 °C desde las 03:55: 318 unidades revisadas, bloqueo de venta de lo expuesto más de 2 h, tarea de retirada y OT de frío.', agents: ['Tienda', 'Frío', 'Calidad'], approver: 'quality', outcome: 'alarma' },
      { scene: 'reclamacion', label: 'Reclamación L26214', icon: 'mail', title: 'Vidrio en tomate frito Moncayo', text: 'Mensaje de la app de Javier Lasheras: ficha, traza del lote L26214, aviso a Conservas del Jalón y respuesta al consumidor en 48 h.', agents: ['Atención al consumidor', 'Calidad'], approver: 'quality', outcome: 'reclamacion' },
      { scene: 'retirada', label: 'Retirada L26214', icon: 'git-branch', title: 'Simulacro de retirada del lote', text: '4.800 unidades → 41 tiendas → 1.920 vendidas y 612 socios avisables, trazados en minutos frente al objetivo de 4 h; borrador para AESAN.', agents: ['Trazabilidad', 'Tiendas', 'Fidelización'], approver: 'quality', outcome: 'retirada' },
      { scene: 'cuestionario', label: 'Preauditoría IFS Logistics', icon: 'list-checks', title: 'IFS Logistics v3 de la plataforma', text: 'Respuestas con evidencias citadas (APPCC, temperaturas, trazabilidad, plagas, food defense) y huecos marcados para Calidad.', agents: ['Cuestionarios'], approver: 'quality', outcome: 'cuestionario' },
      { scene: 'procedimientos', label: 'Procedimientos', icon: 'book-open', title: 'Preguntas con citas', text: 'APPCC de tienda, alertas, reclamaciones y proveedores de marca propia: cada respuesta enlaza el apartado vigente y, si no hay fuente, lo dice.', agents: ['Procedimientos'] }
    ],
    honesty: [
      { aspect: 'Consola, workflows (Routines) y editor', demo: 'Esta consola, en el navegador, con los workflows publicados en la sesión', pilot: 'Agentic Platform instalado en su infraestructura; Routines con editor visual, versiones y prueba en seco', origin: 'serie' },
      { aspect: 'Workflow a partir de un procedimiento escrito', demo: 'Generador simulado en el navegador, con tres plantillas', pilot: 'Se integra en Agentic Platform y se valida con sus procedimientos; cada workflow se revisa antes de publicarlo', origin: 'demo' },
      { aspect: 'Agentes de Mercados Moncayo', demo: 'Cadena de frío, alertas, retiradas, consumidores, proveedores y parte del turno, sobre datos sintéticos', pilot: 'Los del caso elegido, adaptados a sus datos y procedimientos', origin: 'demo' },
      { aspect: 'Conectores (SAP S/4 Retail, WMS Manhattan, Sensores de frío, TPV de tiendas, CRM Fidelización y ServiceNow)', demo: 'Simulados en el navegador', pilot: 'Lectura de 1–2 sistemas por API o réplica de base de datos de solo lectura. No hay conectores de serie para SAP, Manhattan ni el TPV', origin: 'piloto' },
      { aspect: 'Disparo por alarma', demo: 'Al abrir la alarma del mural MR-3 de T-027', pilot: 'Webhook desde la plataforma de sensores o consulta periódica (cron): Agentic Platform no tiene planificador propio de agentes', origin: 'piloto' },
      { aspect: 'Modelo de lenguaje', demo: 'Ninguna llamada: las respuestas están preparadas', pilot: 'El que elija Mercados Moncayo (Azure OpenAI, Gemini o local), a través de la pasarela de Agentic Platform', origin: 'serie' },
      { aspect: 'Aprobación humana', demo: 'Tarjetas de aprobación; rechazar no aplica nada', pilot: 'Igual, con SSO y permisos por rol. En el piloto no se escribe en SAP ni en el TPV: borradores y tareas que aprueba una persona', origin: 'serie' },
      { aspect: 'Procedimientos con citas', demo: '5 documentos sintéticos (APPCC-TIE-01, PR-CAL-010, PR-ATC-002, PR-PRO-006 e IT-TIE-014)', pilot: 'Sus procedimientos vigentes, con permisos por realm; objetivo ≥90 % de citas correctas', origin: 'serie' },
      { aspect: 'Registro de auditoría', demo: 'De esta sesión, guardado en el navegador y exportable a JSON o CSV', pilot: 'En la base de datos de Agentic Platform, de solo añadir, con la identidad SSO de cada persona; exportable a CSV', origin: 'serie' },
      { aspect: 'Coste por petición', demo: 'Estimación mostrada al final de las ejecuciones', pilot: 'Medido por petición en USD, por realm y por caso, con presupuesto diario y mensual', origin: 'serie' },
      { aspect: 'Datos y acciones', demo: 'Sintéticos y coherentes entre sí, preparados por MFM; las acciones no salen del navegador', pilot: 'Sus datos en modo lectura y 20–30 casos históricos, anonimizados si hace falta', origin: 'datos' }
    ],
    writes: 'Ninguna en SAP ni en el TPV durante el piloto: borradores y tareas que aprueba una persona',
    cases: {
      A: {
        label: 'Caso A', short: 'Caso A · Reclamación de consumidor', title: 'Reclamación de consumidor: ficha, traza del lote y respuesta',
        systems: ['CRM Fidelización', 'SAP S/4 Retail', 'WMS Manhattan'], systemsText: 'CRM Fidelización, SAP S/4 Retail y WMS Manhattan',
        trigger: 'Mensaje entrante desde la app de fidelización, el formulario web o el buzón de atención al consumidor',
        output: 'Ficha de la reclamación, traza del lote, aviso al fabricante de la marca propia y borrador de respuesta al consumidor, para aprobar',
        scene: 'reclamacion', sceneLabel: 'Reclamación del lote L26214',
        accuracy: '≥90 % de 30 reclamaciones históricas bien extraídas (producto, lote, tienda, defecto y plazo)',
        accuracyHow: 'Comparación con el registro de Atención al consumidor'
      },
      B: {
        label: 'Caso B', short: 'Caso B · Alarma de frío en tienda', title: 'Alarma de frío en tienda: productos, bloqueo de venta y OT',
        systems: ['Sensores de frío', 'TPV tiendas', 'ServiceNow'], systemsText: 'temperaturas de los sensores de frío, ventas del TPV y ServiceNow',
        trigger: 'Alarma de la plataforma de sensores por webhook o consulta periódica (cron)',
        output: 'Productos y unidades expuestos, propuesta de bloqueo de venta para aprobar, tarea de retirada a tienda, borrador de OT de frío y aviso en Teams',
        scene: 'alarma', sceneLabel: 'Alarma T-027 · MR-3',
        accuracy: '100 % de las referencias expuestas identificadas en 20 episodios históricos',
        accuracyHow: 'Comparación con el stock por lineal y las ventas del TPV de cada episodio'
      }
    },
    phases: [
      { from: 1, to: 2, title: 'Accesos, instalación y línea base', detail: 'Accesos de lectura, instalación, elección de 10 tiendas piloto y medición del tiempo actual', result: 'Criterios firmados y línea base medida' },
      { from: 3, to: 5, title: 'Conectores, agentes y workflow', detail: 'Pruebas con 20–30 casos históricos', result: 'Exactitud medida con casos históricos' },
      { from: 6, to: 7, title: 'Uso en paralelo', detail: 'Casos reales en las tiendas piloto, con el proceso actual como respaldo', result: 'Aceptación de los borradores por Calidad' },
      { from: 8, to: 8, title: 'Evaluación y decisión', detail: 'Criterios medidos e informe final', result: 'Informe final y decisión' }
    ],
    criteria: [
      { name: 'Tiempo', target: 'Traza y borrador en menos de 15 min; tarea a tienda en menos de 10 min desde la alarma', how: 'Cronometrado frente a la línea base de las semanas 1–2' },
      { name: 'Utilidad', target: 'Calidad acepta el borrador con ediciones menores en ≥70 % de los casos', how: 'Revisión de cada borrador por Calidad' },
      { name: 'Citas', target: '≥90 % de 50 preguntas de referencia con la cita correcta', how: 'Herramienta de evaluación incluida en Agentic Platform' },
      { name: 'Control', target: 'Ninguna acción sin aprobación; el 100 % en el registro de auditoría', how: 'Revisión del registro exportado' },
      { name: 'Coste', target: 'Coste del modelo por caso medido y dentro del presupuesto del realm', how: 'Informe de coste por realm (USD, estimación)' }
    ],
    gives: {
      client: ['Responsable en Calidad y contacto de Sistemas', 'Accesos de lectura a 1–2 sistemas', '10 tiendas piloto y sus jefes de zona', '20–30 casos históricos, anonimizados si hace falta', 'Procedimientos APPCC vigentes', '2–3 h a la semana de Calidad'],
      mfm: ['Instalación en su infraestructura', 'Conectores de lectura', 'Agentes y workflow del caso', 'Formación de Calidad y de las tiendas piloto', 'Informe final con los criterios medidos']
    },
    pilot: {
      sub: 'Un caso, la plataforma y 10 tiendas, un realm (Calidad) y 5–10 usuarios, en su infraestructura y con su modelo',
      after: 'Después del piloto: alarmas de frío en las 64 tiendas, o gestión de alertas y homologación de proveedores de marca propia.',
      nextTitle: 'Siguiente paso: taller de 2 horas con Calidad, Operaciones de tienda y Sistemas',
      nextBody: 'Para elegir el caso y las tiendas piloto, confirmar los accesos de lectura y fijar la línea base con la que se medirá el piloto.'
    },
    calc: {
      fteHours: 1784,
      note: 'Horas de trabajo repetitivo que Calidad, Atención al consumidor, los jefes de zona y la plataforma pueden dedicar a otras tareas.',
      rows: [
        { id: 'reclamacion', label: 'Reclamación de consumidor', who: 'Atención al consumidor y Calidad', scene: 'reclamacion', seen: 'Reclamación L26214', n: 120, before: 40, after: 10, basis: 'Ficha, traza del lote, aviso al proveedor y respuesta' },
        { id: 'frio', label: 'Alarma de frío en tienda: productos, bloqueo y OT', who: 'Calidad de guardia y jefes de zona', scene: 'alarma', seen: 'Alarma T-027', n: 45, before: 45, after: 10, basis: '64 tiendas; murales y cámaras' },
        { id: 'retirada', label: 'Alerta o retirada de lote (incluidos simulacros)', who: 'Calidad y plataforma', scene: 'retirada', seen: 'Retirada L26214', n: 3, before: 360, after: 45, basis: 'Plataforma → tiendas → ventas → socios' },
        { id: 'cuestionario', label: 'Auditorías y cuestionarios (IFS, proveedores)', who: 'Calidad', scene: 'cuestionario', seen: 'Preauditoría IFS', n: 3, before: 480, after: 120, basis: 'Con evidencias citadas' },
        { id: 'consultas', label: 'Consultas de tienda a procedimientos APPCC', who: 'Encargados de tienda', scene: 'procedimientos', seen: 'Procedimientos', n: 300, before: 8, after: 2, basis: 'Llamadas y correos a Calidad' },
        { id: 'parte', label: 'Resumen del turno de plataforma y tiendas', who: 'Jefes de turno', scene: 'turno', seen: 'Resumen del turno', n: 44, before: 30, after: 8, basis: '2 turnos × 22 días' }
      ]
    },
    auditEmpty: 'Genera el resumen del turno, publica un workflow o aprueba el bloqueo de venta de T-027: cada paso aparecerá aquí con su hora, su actor y su vista.',
    auditPilot: 'El registro vive en la base de datos de Agentic Platform, identifica a cada persona por su SSO, se filtra por persona, acción, tienda y fecha y se exporta a CSV. En esta demo vive en este navegador y se borra con «Reiniciar demo».',
    proposal: {
      code: 'PIL-PLZ-2026-01',
      filename: 'propuesta-piloto-agentic-mercados-moncayo',
      objective: 'Medir, con un caso real y criterios firmados, cuánto tiempo de Calidad y de las tiendas libera Agentic Platform y con qué exactitud, sin cambiar SAP S/4 Retail, WMS Manhattan, los sensores de frío, el TPV, el CRM de fidelización ni ServiceNow. Agentic Platform lee de esos sistemas, razona con los procedimientos APPCC y propone; una persona aprueba antes de escribir.',
      signatures: [{ role: 'quality', note: 'Conforme con el alcance y los criterios' }, { role: 'Sistemas · Mercados Moncayo', note: 'Conforme con los accesos y el despliegue' }]
    },
    presenter: {
      arquitectura: [
        'Agentic Platform no sustituye nada: va encima de SAP Retail, Manhattan, el TPV, el CRM y ServiceNow. Lee, razona con vuestros procedimientos APPCC y propone; antes de escribir en un sistema, aprueba una persona.',
        'Se instala en vuestra infraestructura, con vuestro SSO de Microsoft Entra ID y el modelo que elijáis. Con un modelo local, la inferencia queda en vuestra red; Sistemas valida los demás flujos.',
        'Las líneas discontinuas en ámbar son las únicas escrituras, y siempre tras aprobación. Los sensores de frío solo se leen: no se tocan los equipos.'
      ],
      piloto: [
        'Esto es lo que habéis visto hoy: siete casos de la plataforma y las tiendas, cada uno con sus agentes y su aprobador. Pulsad cualquiera para volver a él.',
        'Lo honesto: los datos de hoy son sintéticos y la demo no llama a ningún modelo. Los conectores de SAP, Manhattan o el TPV se construyen en el piloto, en modo lectura.',
        'Piloto de 6–8 semanas: un caso, la plataforma y 10 tiendas, realm de Calidad, 5–10 usuarios. Los criterios se firman en la semana 1 y se miden en la 8.'
      ],
      horas: [
        'Preguntad cuántas reclamaciones, alarmas de frío o alertas de proveedor tienen al mes y escribidlo: la calculadora es suya.',
        '«Con Agentic Platform» incluye la revisión y la aprobación de una persona. Son horas de trabajo repetitivo que Calidad y las tiendas pueden dedicar a otras tareas.',
        'Son supuestos para conversar: la línea base real se mide en las semanas 1–2 del piloto.'
      ],
      registro: [
        'Todo lo que hemos hecho hoy está aquí: {n}, de personas y de agentes, con hora, actor y vista.',
        'Filtrad por «Decisiones»: cada aprobación y cada rechazo, con su motivo. Nada se edita ni se borra desde la consola; se exporta a JSON o CSV.',
        'Cierre: proponemos un taller de 2 horas con Calidad, Operaciones de tienda y Sistemas para elegir el caso y fijar la línea base.'
      ],
      next: {
        arquitectura: 'Pulsar «Modelo local» para enseñar que el modelo entra en su red; después, pestaña «Demo y piloto».',
        piloto: 'Elegir con ellos el caso A o B y abrir la pestaña «Calculadora de horas».',
        horas: 'Escribir sus casos al mes y abrir «Registro de auditoría» para cerrar.',
        registro: 'Pulsar «Descargar propuesta de piloto (PDF)» y proponer fecha para el taller de 2 horas.'
      }
    },
    tour: [
      'Agentic Platform va encima de SAP Retail, Manhattan, el TPV, el CRM y ServiceNow: lee, prepara propuestas y una persona aprueba antes de escribir.',
      'Con un modelo local, la inferencia entra en su infraestructura; los demás flujos se validan con Sistemas.',
      'Los casos de hoy, del mural de T-027 a la retirada del lote L26214, y qué es de serie y qué se construye en el piloto.',
      'Piloto de 6–8 semanas: un caso, la plataforma y 10 tiendas, realm de Calidad y criterios de aceptación firmados en la semana 1.',
      'Horas liberadas con supuestos editables; la línea base real se mide en el piloto.',
      'Todo lo hecho en la sesión queda en el registro de auditoría: decisiones humanas, pasos de los agentes y exportación.'
    ]
  }
});
