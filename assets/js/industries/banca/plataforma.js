/* Banco Cierzo · «Cómo encaja Agentic Platform»: arquitectura, demo frente a piloto, calculadora de horas, preguntas y
 * cumplimiento (DORA, EBA outsourcing, RGPD, secreto bancario). Entidad ficticia; datos sintéticos (MFM). */
agenticPack('banca', {
  plataforma: {
    nav: 'Cómo encaja en Banco Cierzo',
    title: 'Cómo encaja en Banco Cierzo',
    actor: 'decider',
    site: { kind: 'Centro', name: 'Centro de Operaciones (Madrid)', realm: 'Operaciones · Fraude y SAC' },
    pageMeta: [
      { icon: 'building', text: 'Centro de Operaciones · Madrid' },
      { icon: 'server', text: 'Instalación en la infraestructura del banco' },
      { icon: 'scale', text: 'DORA, EBA, RGPD y secreto bancario' },
      { icon: 'user-check', text: 'Aprobación humana antes de escribir' }
    ],
    kpis: [
      { label: 'Piloto propuesto', value: '6–8', unit: 'semanas', sub: '1 caso · Centro de Operaciones · 1 realm', icon: 'calendar' },
      { label: 'Sistemas conectados en el piloto', value: '1–2', unit: 'solo lectura', sub: 'Réplica o API de consulta; nunca el core en escritura', icon: 'database' },
      { label: 'Usuarios del piloto', value: '5–10', sub: 'SSO con Microsoft Entra ID y MFA', icon: 'users' }
    ],
    arch: {
      title: 'Arquitectura de referencia en el Centro de Operaciones',
      sso: 'Acceso con SSO y MFA · Microsoft Entra ID',
      ssoShort: 'SSO de Microsoft Entra ID con MFA',
      console: 'Consola web y avisos en Microsoft Teams',
      consoleShort: 'Consola web y Teams'
    },
    deploy: {
      cpd: { seg: 'CPD propio', label: 'CPD propio · máquina virtual con Docker Compose', zone: 'CPD de Banco Cierzo · VM con Docker Compose', text: 'Una máquina virtual en el CPD del banco, en la red de servicios internos, con Docker Compose: aplicación, base de datos Postgres y almacén vectorial Qdrant.' },
      k8s: { seg: 'OpenShift / Kubernetes', label: 'OpenShift o Kubernetes · Helm', zone: 'Clúster OpenShift de Banco Cierzo · Helm', text: 'Despliegue con Helm en su plataforma de contenedores (OpenShift o Kubernetes), con los controles de imagen y secretos del banco.' },
      cloud: { seg: 'Nube privada', label: 'Nube del banco (Azure, AWS o GCP), región UE', zone: 'Suscripción en la nube de Banco Cierzo · región UE', text: 'La misma instalación en la suscripción de nube del banco, en región UE, con sus claves (BYOK) y su registro de proveedores TIC.' }
    },
    llm: {
      azure: { seg: 'Azure OpenAI', name: 'Azure OpenAI', local: false, place: 'Región UE (Data Zone EU), con el contrato de Banco Cierzo', exit: 'Sale de su red solo el texto seudonimizado de cada petición', note: 'Conexión por la pasarela LiteLLM de Agentic Platform; sin entrenamiento con sus datos. Se confirma con Riesgo tecnológico en las semanas 1–2.' },
      gemini: { seg: 'Gemini', name: 'Google Gemini (Vertex AI)', local: false, place: 'Región UE de Vertex AI, con la cuenta que contrate Banco Cierzo', exit: 'Sale de su red solo el texto seudonimizado de cada petición', note: 'Proveedor incluido de serie en el catálogo de modelos de Agentic Platform.' },
      local: { seg: 'Modelo local', name: 'Modelo local', local: true, place: 'Servidor con GPU en el CPD del banco (Ollama, LM Studio o llama.cpp)', exit: 'La inferencia se ejecuta dentro de su red', note: 'Evita un nuevo proveedor TIC para el modelo. La calidad y la velocidad se dimensionan con su servidor.' }
    },
    people: ['fraud', 'fraud_shift', 'cards', 'customer_service', 'compliance', 'it_risk'],
    peopleShort: ['Prevención del fraude', 'Analista de turno', 'Medios de pago', 'SAC', 'Cumplimiento', 'Riesgo tecnológico'],
    modules: [
      { icon: 'workflow', title: 'Workflows (Routines)', text: 'Editor visual, versiones y prueba en seco' },
      { icon: 'cpu', title: 'Agentes de operaciones', text: 'Fraude, medios de pago, SAC, expedientes y DORA', agents: true },
      { icon: 'user-check', title: 'Aprobación humana', text: 'Nada se escribe en un sistema sin su responsable', approval: true },
      { icon: 'book-open', title: 'Políticas con citas', text: 'Cada respuesta enlaza su fuente; sin fuente, lo dice' },
      { icon: 'history', title: 'Registro de auditoría', text: 'De solo añadir, exportable para Auditoría interna' },
      { icon: 'key', title: 'Permisos por rol y realm', text: 'Cada área ve solo sus datos y políticas' },
      { icon: 'gauge', title: 'Coste por petición', text: 'Estimación en USD y presupuesto por realm' },
      { icon: 'shield', title: 'Pasarela de modelos', text: 'Enmascara PAN, IBAN, DNI y nombres antes del modelo', gateway: true }
    ],
    tiles: [
      { name: 'Core bancario T24', icon: 'database', text: 'Lee clientes, cuentas, tarjetas y movimientos. Nunca escribe en el core.', write: false },
      { name: 'Falcon Fraud', icon: 'shield', text: 'Lee alertas y puntuaciones. Propone reglas de bloqueo preventivo.', write: true },
      { name: 'Redsys', icon: 'globe', text: 'Lee operaciones autorizadas, comercios y terminales.', write: false },
      { name: 'Salesforce FSC', icon: 'users', text: 'Lee el expediente del cliente. Prepara el caso del SAC y la respuesta.', write: true },
      { name: 'ServiceNow', icon: 'ticket', text: 'Prepara incidencias y tareas de reemisión de tarjetas.', write: true },
      { name: 'GRC Archer', icon: 'scale', text: 'Lee controles y riesgos. Prepara el registro del incidente DORA.', write: true },
      { name: 'Microsoft 365', icon: 'mail', text: 'Avisos en Teams y borradores en Outlook. El envío al cliente se aprueba.', write: true }
    ],
    decisions: {
      deploy: ['No depende de servicios de MFM en la nube. Lo opera su equipo de Sistemas o un servicio gestionado, y entra en el registro de información de proveedores TIC del banco (DORA, art. 28).'],
      llm: 'Se cambia de modelo por configuración, sin tocar los workflows. El proveedor del modelo es un tercero TIC: se evalúa con Riesgo tecnológico y Cumplimiento antes de usarlo con datos reales.',
      access: [
        'SSO con Microsoft Entra ID (OIDC) o SAML 2.0, con MFA. Permisos por rol y por realm: el realm de Fraude no ve los expedientes del SAC y viceversa; cada consulta queda registrada con la identidad de la persona.',
        'La pasarela seudonimiza antes de llamar al modelo: el PAN nunca sale completo (PCI DSS 4.0), y nombres, DNI/NIE e IBAN se sustituyen por marcadores. Los patrones propios del banco se añaden en el piloto.'
      ],
      hitl: 'Activar una regla en Falcon, pedir la reemisión de tarjetas, abonar provisionalmente un cargo, registrar un incidente en Archer o escribir a un cliente requiere la aprobación de su responsable. Rechazar no aplica nada y queda registrado con el motivo.',
      cost: 'El presupuesto por realm permite separar el gasto de Fraude, SAC y Cumplimiento a efectos de imputación interna.',
      limits: [
        'No sustituye el core T24, Falcon Fraud, Redsys, Salesforce FSC ni Archer.',
        'No autoriza ni deniega operaciones en tiempo real: la autorización sigue en Redsys y Falcon.',
        'No resuelve reclamaciones ni decide abonos: lo decide el SAC (PR-SAC-001), y el cliente conserva la vía del Banco de España.',
        'No hace scoring de crédito ni decisiones automatizadas sobre clientes (RGPD art. 22; AI Act, anexo III).',
        'No notifica a supervisores sin aprobación: prepara el borrador para Riesgo tecnológico.'
      ]
    },
    faqTitle: 'Preguntas habituales de Sistemas, Cumplimiento y Riesgos',
    faqSub: 'Respuestas cortas para la conversación con Sistemas, Cumplimiento, Riesgo tecnológico y el DPO',
    faq: [
      { topic: 'Cumplimiento', q: '¿Cómo encaja con DORA?', a: 'Agentic Platform es un servicio TIC de un tercero (MFM) y el proveedor del modelo es otro. Ambos entran en el registro de información (art. 28), con contrato que recoge las cláusulas del art. 30 (ubicación de datos, niveles de servicio, auditoría, cooperación con el supervisor y estrategia de salida). Agentic Platform, además, ayuda a cumplir DORA: prepara el borrador de notificación inicial de incidente grave (4 h tras la clasificación y 24 h desde la detección) para que Riesgo tecnológico lo revise.' },
      { topic: 'Cumplimiento', q: '¿Es una externalización según las directrices de la EBA?', a: 'Se evalúa con las Directrices EBA/GL/2019/02 sobre externalización. En el piloto, con datos anonimizados y sin decisiones automáticas, no apoya una función esencial o importante. Si en producción se considera esencial (por ejemplo, en Fraude), se aplica lo que piden: análisis previo de riesgos, notificación al Banco de España, derechos de acceso y auditoría, y plan de salida probado. Instalarlo en la infraestructura del banco reduce el perímetro externalizado.' },
      { topic: 'Cumplimiento', q: '¿Y el RGPD?', a: 'El banco es responsable del tratamiento; MFM, encargado (art. 28) con contrato y lista de subencargados, incluido el proveedor del modelo. Antes de usar datos reales se hace la evaluación de impacto (art. 35) con el DPO. Minimización: el agente solo pide los campos que necesita y la pasarela seudonimiza; los datos se tratan en la UE, sin transferencias internacionales. No hay decisiones basadas únicamente en tratamiento automatizado (art. 22): siempre decide una persona.' },
      { topic: 'Cumplimiento', q: '¿Cómo se respeta el secreto bancario?', a: 'El deber de reserva de la información de clientes (art. 83 de la Ley 10/2014) se mantiene: los datos no salen de la infraestructura del banco salvo el texto seudonimizado que ve el modelo, el proveedor no puede usarlo para entrenar, y los permisos por realm impiden que un área consulte clientes que no le corresponden. Cada acceso queda en el registro de auditoría.' },
      { topic: 'Cumplimiento', q: '¿Afecta el Reglamento de IA (AI Act)?', a: 'Los casos de la demo (fraude, reclamaciones, expedientes, cuestionarios) no figuran en el anexo III; el scoring de crédito sí, y queda fuera del alcance. Se cumplen las obligaciones de transparencia: las personas saben que trabajan con un asistente de IA y los borradores lo indican.' },
      { topic: 'Seguridad', q: '¿Qué pasa con los datos de tarjeta (PCI DSS)?', a: 'Agentic Platform no almacena el PAN completo: los conectores leen el PAN truncado o el token, y la pasarela enmascara cualquier número de tarjeta antes del modelo. El entorno de Agentic Platform queda fuera del entorno de datos de titulares (CDE).' },
      { topic: 'Seguridad', q: '¿Cómo entran los usuarios?', a: 'Con SSO de Microsoft Entra ID (OIDC) o SAML 2.0 y MFA. Los permisos van por rol y por realm (área). Las cuentas de servicio de los conectores son de solo lectura y sus secretos van en el almacén de secretos del banco.' },
      { topic: 'Datos', q: '¿Qué datos salen de nuestra red?', a: 'Con un modelo local, ninguno. Con uno externo, solo el texto seudonimizado de cada petición, a una región UE y sin retención para entrenamiento. Los flujos de conectores, telemetría y enmascarado se validan con Sistemas y Seguridad antes del piloto.' },
      { topic: 'Modelo de lenguaje', q: '¿Qué modelo de lenguaje usa y se puede cambiar?', a: 'El que elija el banco: Azure OpenAI, Gemini en Vertex AI, AWS Bedrock en la UE o un modelo local. Se fija por realm y se cambia por configuración, sin tocar los workflows; así la estrategia de salida de DORA también cubre el modelo.' },
      { topic: 'Modelo de lenguaje', q: '¿Y si el modelo se equivoca?', a: 'Cada respuesta cita su fuente (política, operación, expediente) y, si no la encuentra, lo dice. Ninguna acción se aplica sin aprobación. En el piloto se mide la exactitud con casos históricos antes de usarlo en real.' },
      { topic: 'Integración', q: '¿Hay conectores de T24, Falcon o Redsys?', a: 'No de serie. En el piloto se construyen para 1–2 sistemas en modo lectura, por API de consulta o réplica de base de datos; nunca se escribe en el core. Las escrituras (regla en Falcon, caso en Salesforce, ticket en ServiceNow) llegan después y siempre con aprobación.' },
      { topic: 'Integración', q: '¿Dónde se instala?', a: 'En una máquina virtual de su CPD, en OpenShift o Kubernetes con Helm, o en su suscripción de nube en región UE. No depende de servicios de MFM en la nube.' },
      { topic: 'Coste', q: '¿Cuánto cuesta cada consulta?', a: 'Agentic Platform mide el coste de cada petición en USD por realm, usuario y caso, con presupuesto diario y mensual y aviso al 80 %. Una reclamación son céntimos de modelo; el coste real se mide en el piloto.' },
      { topic: 'Coste', q: '¿Licencia y precio?', a: 'Se concretan en la propuesta comercial (SOW), con las cláusulas contractuales que exige DORA.' }
    ],
    seen: [
      { scene: 'turno', label: 'Resumen del turno', icon: 'activity', title: 'Resumen del turno de noche', text: 'Canales, autorización, fraude y SAC del Centro de Operaciones; el agente prepara el parte del turno y lo deja para revisar.', agents: ['Agente del turno'], approver: 'decider', outcome: 'parte' },
      { scene: 'workflow', label: 'De palabras a workflow', icon: 'workflow', title: 'Política escrita → workflow publicado', text: 'La política de prevención del fraude en tarjetas (POL-FRA-003) se convierte en un workflow con disparo, pasos, aprobación y prueba en seco.', agents: ['Generador de workflows'], approver: 'fraud' },
      { scene: 'alarma', label: 'Alerta BIN 454812', icon: 'shield', title: 'Pico de fraude en el BIN 454812', text: 'Fraude en compras sin tarjeta presente al 2,9 % frente al 0,3 %: 186 operaciones por 41.230 €; regla preventiva en Falcon, reemisión de 214 tarjetas y aviso a clientes.', agents: ['Fraude', 'Medios de pago', 'Clientes'], approver: 'fraud', outcome: 'alarma' },
      { scene: 'reclamacion', label: 'Reclamación de cargos', icon: 'mail', title: 'Tres cargos no reconocidos', text: 'Lucía Ferrer Gil no reconoce 612,40 € de TIENDAONLINE-ELEC: ficha, operaciones, propuesta de abono provisional (PSD2) y respuesta en plazo de 15 días hábiles.', agents: ['SAC', 'Fraude'], approver: 'customer_service', outcome: 'reclamacion' },
      { scene: 'retirada', label: 'Expediente CPP-2609-07', icon: 'git-branch', title: 'Punto común de compromiso', text: 'TPV 3 de Gasolinera Ronda Norte: 1.284 tarjetas, 1.107 propias y 177 de otros emisores; bloqueo, reemisión y aviso, con el borrador de notificación DORA.', agents: ['Fraude', 'Medios de pago', 'DORA'], approver: 'fraud', outcome: 'retirada' },
      { scene: 'cuestionario', label: 'Wolfsberg CBDDQ de Nordbank', icon: 'list-checks', title: 'Diligencia debida de un corresponsal', text: 'El CBDDQ v1.4 respondido con evidencias citadas del manual de PBC/FT, sanciones, KYC y PEP; los huecos quedan marcados para Cumplimiento.', agents: ['Cuestionarios'], approver: 'compliance', outcome: 'cuestionario' },
      { scene: 'procedimientos', label: 'Políticas y procedimientos', icon: 'book-open', title: 'Preguntas con citas', text: 'Fraude, SAC, reemisión, DORA y PBC/FT: cada respuesta enlaza el apartado vigente y, si no hay fuente, lo dice.', agents: ['Procedimientos'] }
    ],
    honesty: [
      { aspect: 'Consola, workflows (Routines) y editor', demo: 'Esta consola, en el navegador, con los workflows publicados en la sesión', pilot: 'Agentic Platform instalado en la infraestructura del banco; Routines con editor visual, versiones y prueba en seco', origin: 'serie' },
      { aspect: 'Workflow a partir de una política escrita', demo: 'Generador simulado en el navegador, con tres plantillas', pilot: 'Se integra en Agentic Platform y se valida con sus políticas; cada workflow lo revisa el área responsable antes de publicarlo', origin: 'demo' },
      { aspect: 'Agentes de Banco Cierzo', demo: 'Fraude, medios de pago, SAC, expedientes, DORA y parte del turno, sobre datos sintéticos', pilot: 'Los del caso elegido, adaptados a sus datos y políticas', origin: 'demo' },
      { aspect: 'Conectores (Core bancario T24, Falcon Fraud, Redsys, Salesforce FSC, ServiceNow y GRC Archer)', demo: 'Simulados en el navegador', pilot: 'Lectura de 1–2 sistemas por API de consulta o réplica de solo lectura. No hay conectores de serie para T24, Falcon ni Redsys', origin: 'piloto' },
      { aspect: 'Disparo por alerta', demo: 'Al abrir la alerta del BIN 454812', pilot: 'Webhook desde Falcon o consulta periódica (cron): Agentic Platform no tiene planificador propio de agentes', origin: 'piloto' },
      { aspect: 'Modelo de lenguaje', demo: 'Ninguna llamada: las respuestas están preparadas', pilot: 'El que elija el banco (Azure OpenAI, Gemini o local), a través de la pasarela de Agentic Platform y evaluado como proveedor TIC', origin: 'serie' },
      { aspect: 'Aprobación humana', demo: 'Tarjetas de aprobación; rechazar no aplica nada', pilot: 'Igual, con SSO, MFA y permisos por rol. En el piloto no se escribe en ningún sistema: borradores que aprueba una persona', origin: 'serie' },
      { aspect: 'Políticas con citas', demo: '5 documentos sintéticos (POL-FRA-003, PR-SAC-001, PR-TAR-007, PR-DORA-002 y MAN-PBC-001)', pilot: 'Sus políticas y procedimientos vigentes, con permisos por realm; objetivo ≥95 % de citas correctas', origin: 'serie' },
      { aspect: 'Registro de auditoría', demo: 'De esta sesión, guardado en el navegador y exportable a JSON o CSV', pilot: 'En la base de datos de Agentic Platform, de solo añadir, con la identidad SSO de cada persona; exportable para Auditoría interna', origin: 'serie' },
      { aspect: 'Coste por petición', demo: 'Estimación mostrada al final de las ejecuciones', pilot: 'Medido por petición en USD, por realm y por caso, con presupuesto diario y mensual', origin: 'serie' },
      { aspect: 'Cumplimiento (DORA, EBA, RGPD)', demo: 'Explicado en las preguntas frecuentes', pilot: 'Registro de información del proveedor, evaluación de impacto con el DPO y análisis de externalización antes de usar datos reales', origin: 'piloto' },
      { aspect: 'Datos y acciones', demo: 'Sintéticos y coherentes entre sí, preparados por MFM; las acciones no salen del navegador', pilot: 'Sus datos en modo lectura y 20–30 casos históricos anonimizados', origin: 'datos' }
    ],
    writes: 'Ninguna en el core ni en Falcon durante el piloto: borradores que aprueba una persona',
    cases: {
      A: {
        label: 'Caso A', short: 'Caso A · Reclamación de cargos', title: 'Reclamación por cargos no reconocidos: ficha, propuesta de abono y respuesta',
        systems: ['Salesforce FSC', 'Core bancario T24', 'Redsys'], systemsText: 'Salesforce FSC, Core bancario T24 y Redsys',
        trigger: 'Reclamación entrante en el SAC (formulario web, app o correo)',
        output: 'Ficha de la reclamación, operaciones y comercio, propuesta de abono provisional antes del fin del día hábil siguiente (PSD2) y borrador de respuesta, para aprobar',
        scene: 'reclamacion', sceneLabel: 'Reclamación de Lucía Ferrer Gil',
        accuracy: '≥95 % de 30 reclamaciones históricas bien clasificadas (tipo, operaciones, importes y plazo)',
        accuracyHow: 'Comparación con el expediente cerrado en Salesforce FSC'
      },
      B: {
        label: 'Caso B', short: 'Caso B · Alerta de fraude', title: 'Alerta de fraude por BIN o comercio: tarjetas, regla preventiva y aviso',
        systems: ['Falcon Fraud', 'Redsys'], systemsText: 'alertas de Falcon Fraud y operaciones de Redsys',
        trigger: 'Alerta de Falcon (umbral de fraude por BIN o comercio) por webhook o consulta periódica (cron)',
        output: 'Operaciones y tarjetas afectadas, propuesta de regla preventiva y de reemisión para aprobar, borrador de aviso a clientes y aviso en Teams',
        scene: 'alarma', sceneLabel: 'Alerta BIN 454812',
        accuracy: '100 % de las tarjetas afectadas identificadas en 20 episodios históricos',
        accuracyHow: 'Comparación con los casos confirmados en Falcon Fraud'
      }
    },
    phases: [
      { from: 1, to: 2, title: 'Accesos, evaluación y línea base', detail: 'Accesos de lectura, registro del proveedor TIC, evaluación de impacto con el DPO, instalación y medición del tiempo actual', result: 'Criterios firmados y línea base medida' },
      { from: 3, to: 5, title: 'Conectores, agentes y workflow', detail: 'Pruebas con 20–30 casos históricos anonimizados', result: 'Exactitud medida con casos históricos' },
      { from: 6, to: 7, title: 'Uso en paralelo', detail: 'Casos reales, con el proceso actual como respaldo', result: 'Aceptación de los borradores por el área' },
      { from: 8, to: 8, title: 'Evaluación y decisión', detail: 'Criterios medidos e informe final para el comité', result: 'Informe final y decisión' }
    ],
    criteria: [
      { name: 'Tiempo', target: 'Ficha y borrador en menos de 10 min', how: 'Cronometrado frente a la línea base de las semanas 1–2' },
      { name: 'Utilidad', target: 'El área acepta el borrador con ediciones menores en ≥70 % de los casos', how: 'Revisión de cada borrador por el responsable' },
      { name: 'Citas', target: '≥95 % de 50 preguntas de referencia con la cita correcta', how: 'Herramienta de evaluación incluida en Agentic Platform' },
      { name: 'Control', target: 'Ninguna acción sin aprobación; el 100 % en el registro de auditoría', how: 'Revisión del registro exportado por Auditoría interna' },
      { name: 'Privacidad', target: 'Ningún PAN completo, IBAN ni DNI en claro en las peticiones al modelo', how: 'Muestreo de peticiones de la pasarela por Seguridad' },
      { name: 'Coste', target: 'Coste del modelo por caso medido y dentro del presupuesto del realm', how: 'Informe de coste por realm (USD, estimación)' }
    ],
    gives: {
      client: ['Responsable de negocio y contactos de Sistemas, Seguridad y DPO', 'Accesos de lectura a 1–2 sistemas', '20–30 casos históricos anonimizados', 'Políticas y procedimientos vigentes', 'Evaluación del proveedor TIC y de impacto (RGPD)', '2–3 h a la semana del área'],
      mfm: ['Instalación en su infraestructura', 'Conectores de lectura', 'Agentes y workflow del caso', 'Documentación para el registro DORA y la evaluación de impacto', 'Formación de los usuarios', 'Informe final con los criterios medidos']
    },
    pilot: {
      sub: 'Un caso, el Centro de Operaciones, un realm y 5–10 usuarios, en la infraestructura del banco y con su modelo',
      after: 'Después del piloto: borradores de notificación de incidentes DORA con Archer, o respuesta a cuestionarios de diligencia debida de corresponsales.',
      nextTitle: 'Siguiente paso: taller de 2 horas con Operaciones, Cumplimiento, Riesgo tecnológico y Sistemas',
      nextBody: 'Para elegir el caso, revisar el encaje DORA y RGPD, confirmar los accesos de lectura y fijar la línea base con la que se medirá el piloto.'
    },
    calc: {
      fteHours: 1680,
      note: 'Horas de trabajo repetitivo que el SAC, Fraude, Medios de pago y Cumplimiento pueden dedicar a casos complejos y a atender clientes.',
      rows: [
        { id: 'reclamacion', label: 'Reclamación por cargos no reconocidos', who: 'SAC', scene: 'reclamacion', seen: 'Reclamación de cargos', n: 350, before: 35, after: 10, basis: 'Ficha, operaciones y borrador de respuesta' },
        { id: 'alerta', label: 'Alerta de fraude por BIN o comercio', who: 'Prevención del fraude', scene: 'alarma', seen: 'Alerta BIN 454812', n: 12, before: 120, after: 20, basis: 'Análisis, propuesta de regla y aviso' },
        { id: 'cpp', label: 'Expediente de punto común de compromiso', who: 'Fraude y Medios de pago', scene: 'retirada', seen: 'Expediente CPP-2609-07', n: 2, before: 600, after: 90, basis: 'Comercio → tarjetas → clientes, con reemisión' },
        { id: 'cuestionario', label: 'Cuestionario de diligencia debida (CBDDQ, KYC de corresponsal)', who: 'Cumplimiento y corresponsales', scene: 'cuestionario', seen: 'Wolfsberg CBDDQ', n: 4, before: 600, after: 150, basis: 'Con evidencias citadas del manual de PBC/FT' },
        { id: 'consultas', label: 'Consultas a políticas y procedimientos', who: 'SAC, Fraude y Operaciones', scene: 'procedimientos', seen: 'Políticas', n: 400, before: 8, after: 2, basis: 'Búsqueda en la intranet normativa' },
        { id: 'parte', label: 'Resumen del turno del Centro de Operaciones', who: 'Jefes de turno', scene: 'turno', seen: 'Resumen del turno', n: 66, before: 30, after: 8, basis: '3 turnos × 22 días' }
      ]
    },
    auditEmpty: 'Genera el resumen del turno, publica un workflow o aprueba la regla preventiva del BIN 454812: cada paso aparecerá aquí con su hora, su actor y su vista.',
    auditPilot: 'El registro vive en la base de datos de Agentic Platform, identifica a cada persona por su SSO, se filtra por persona, acción y fecha y se exporta a CSV para Auditoría interna y el supervisor. En esta demo vive en este navegador y se borra con «Reiniciar demo».',
    proposal: {
      code: 'PIL-COP-2026-01',
      filename: 'propuesta-piloto-agentic-banco-cierzo',
      objective: 'Medir, con un caso real y criterios firmados, cuánto tiempo de Operaciones libera Agentic Platform y con qué exactitud, sin cambiar el core T24, Falcon Fraud, Redsys, Salesforce FSC, ServiceNow ni GRC Archer, y dentro del marco de DORA, las directrices de la EBA, el RGPD y el secreto bancario. Agentic Platform lee de esos sistemas, razona con las políticas del banco y propone; una persona aprueba antes de escribir.',
      extraArch: [['Seudonimización', 'PAN, IBAN, DNI/NIE y nombres enmascarados antes del modelo']],
      compliance: [
        ['DORA', 'Alta del proveedor en el registro de información (art. 28) y contrato con las cláusulas del art. 30; estrategia de salida, incluido el cambio de modelo'],
        ['EBA/GL/2019/02', 'Análisis de externalización: en el piloto no apoya una función esencial o importante; se reevalúa antes de producción'],
        ['RGPD', 'MFM como encargado (art. 28); evaluación de impacto (art. 35) con el DPO; datos en la UE; sin decisiones automatizadas (art. 22)'],
        ['Secreto bancario', 'Deber de reserva (art. 83 de la Ley 10/2014): datos en la infraestructura del banco, permisos por realm y registro de cada acceso'],
        ['PCI DSS 4.0', 'Sin PAN completo en Agentic Platform ni en el modelo; fuera del entorno de datos de titulares']
      ],
      signatures: [{ role: 'decider', note: 'Conforme con el alcance y los criterios' }, { role: 'compliance', note: 'Conforme con el encaje normativo' }, { role: 'it_risk', note: 'Conforme con el proveedor TIC y el despliegue' }]
    },
    presenter: {
      arquitectura: [
        'Agentic Platform no sustituye nada: va encima de T24, Falcon, Redsys, Salesforce y Archer. Lee, razona con vuestras políticas y propone; antes de escribir en un sistema, aprueba una persona.',
        'Se instala en la infraestructura del banco, con vuestro SSO y MFA y el modelo que elijáis. Con un modelo local, la inferencia queda en vuestra red y no hay un proveedor TIC más.',
        'El core T24 solo se lee. Las líneas discontinuas en ámbar son las únicas escrituras, y siempre tras aprobación. Abrid las preguntas de cumplimiento: DORA, EBA, RGPD y secreto bancario.'
      ],
      piloto: [
        'Esto es lo que habéis visto hoy: siete casos del Centro de Operaciones, cada uno con sus agentes y su aprobador. Pulsad cualquiera para volver a él.',
        'Lo honesto: los datos de hoy son sintéticos y la demo no llama a ningún modelo. Los conectores de T24, Falcon o Redsys se construyen en el piloto, en modo lectura, después del registro del proveedor y la evaluación de impacto.',
        'Piloto de 6–8 semanas: un caso, un realm, 5–10 usuarios. Los criterios, incluida la privacidad, se firman en la semana 1 y se miden en la 8.'
      ],
      horas: [
        'Preguntad cuántas reclamaciones de cargos, alertas de fraude o cuestionarios de corresponsales tienen al mes y escribidlo: la calculadora es suya.',
        '«Con Agentic Platform» incluye la revisión y la aprobación de una persona. Son horas de trabajo repetitivo que el SAC y Fraude pueden dedicar a casos complejos.',
        'Son supuestos para conversar: la línea base real se mide en las semanas 1–2 del piloto.'
      ],
      registro: [
        'Todo lo que hemos hecho hoy está aquí: {n}, de personas y de agentes, con hora, actor y vista.',
        'Filtrad por «Decisiones»: cada aprobación y cada rechazo, con su motivo. Nada se edita ni se borra; se exporta para Auditoría interna.',
        'Cierre: proponemos un taller de 2 horas con Operaciones, Cumplimiento, Riesgo tecnológico y Sistemas.'
      ],
      next: {
        arquitectura: 'Pulsar «Modelo local» y abrir «¿Cómo encaja con DORA?»; después, pestaña «Demo y piloto».',
        piloto: 'Elegir con ellos el caso A o B y abrir la pestaña «Calculadora de horas».',
        horas: 'Escribir sus volúmenes al mes y abrir «Registro de auditoría» para cerrar.',
        registro: 'Pulsar «Descargar propuesta de piloto (PDF)» y proponer fecha para el taller de 2 horas.'
      }
    },
    tour: [
      'Agentic Platform va encima de T24, Falcon, Redsys, Salesforce y Archer: lee, prepara propuestas y una persona aprueba antes de escribir. El core solo se lee.',
      'Con un modelo local, la inferencia entra en la infraestructura del banco; con uno externo, sale solo texto seudonimizado a la UE.',
      'Los casos de hoy, de la alerta del BIN 454812 al expediente CPP-2609-07, y qué es de serie y qué se construye en el piloto.',
      'Piloto de 6–8 semanas: un caso, un realm, criterios firmados en la semana 1 y el encaje DORA y RGPD resuelto antes de tocar datos reales.',
      'Horas liberadas con supuestos editables; la línea base real se mide en el piloto.',
      'Todo lo hecho en la sesión queda en el registro de auditoría: decisiones humanas, pasos de los agentes y exportación.'
    ]
  }
});
