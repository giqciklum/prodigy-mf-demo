/* Mora & Jordano · «Cómo encaja Agentic Platform»: arquitectura, demo frente a piloto, calculadora de horas, preguntas y
 * cumplimiento (secreto profesional, Código Deontológico, RGPD y LOPDGDD, Ley 10/2010, datos en la UE). Datos sintéticos de demostración (MFM). */
agenticPack('abogados', {
  plataforma: {
    nav: 'Cómo encaja en Mora & Jordano',
    title: 'Cómo encaja en Mora & Jordano',
    actor: 'decider',
    site: { kind: 'Sede', name: 'Sede de Málaga (Calle Linaje)', realm: 'Procesal · Fiscal y Tributario' },
    pageMeta: [
      { icon: 'building', text: 'Sede de Málaga y Sede de Córdoba' },
      { icon: 'server', text: 'Instalación en la infraestructura del despacho, datos en la UE' },
      { icon: 'scale', text: 'Secreto profesional, Código Deontológico, RGPD y Ley 10/2010' },
      { icon: 'user-check', text: 'El letrado aprueba antes de presentar o comunicar' }
    ],
    kpis: [
      { label: 'Piloto propuesto', value: '6–8', unit: 'semanas', sub: '1 caso · Sede de Málaga · 1 realm', icon: 'calendar' },
      { label: 'Sistemas conectados en el piloto', value: '2–3', unit: 'solo lectura', sub: 'Gestor de expedientes, iManage y avisos de LexNET; nunca se presenta nada', icon: 'database' },
      { label: 'Usuarios del piloto', value: '5–10', sub: 'Socios y asociados · SSO de Microsoft Entra ID con MFA', icon: 'users' }
    ],
    arch: {
      title: 'Arquitectura de referencia en Mora & Jordano',
      sso: 'Acceso con SSO y MFA · Microsoft Entra ID (Microsoft 365 del despacho)',
      ssoShort: 'SSO de Microsoft Entra ID con MFA',
      console: 'Consola web y avisos en Microsoft Teams',
      consoleShort: 'Consola web y Teams'
    },
    deploy: {
      cpd: { seg: 'Servidor propio', label: 'Servidor del despacho · máquina virtual con Docker Compose', zone: 'Servidor de la Sede de Málaga · VM con Docker Compose', text: 'Una máquina virtual en el servidor del despacho (o en el alojamiento dedicado de su proveedor en España), en la red interna, con Docker Compose: aplicación, base de datos Postgres y almacén vectorial Qdrant.' },
      k8s: { seg: 'Hosting gestionado', label: 'Proveedor de hosting en España · Kubernetes con Helm', zone: 'Clúster gestionado en España · Helm', text: 'Despliegue con Helm en un clúster Kubernetes gestionado por su proveedor de sistemas, en un centro de datos en España, con contrato de encargado del tratamiento y deber de secreto.' },
      cloud: { seg: 'Nube del despacho', label: 'Suscripción Azure del despacho, región España Central', zone: 'Suscripción Azure de Mora & Jordano · región UE (Madrid)', text: 'La misma instalación en la suscripción de Azure vinculada a su Microsoft 365, en la región España Central (Madrid), con sus propias claves (BYOK) y sin transferencias fuera de la UE.' }
    },
    llm: {
      azure: { seg: 'Azure OpenAI', name: 'Azure OpenAI', local: false, place: 'Región UE (Data Zone EU), con el contrato de Mora & Jordano', exit: 'Sale de su red solo el texto seudonimizado de cada petición', note: 'Conexión por la pasarela LiteLLM de Agentic Platform; sin entrenamiento con sus datos ni revisión humana del proveedor. Se confirma con el DPO en las semanas 1–2.' },
      gemini: { seg: 'Gemini', name: 'Google Gemini (Vertex AI)', local: false, place: 'Región UE de Vertex AI, con la cuenta que contrate Mora & Jordano', exit: 'Sale de su red solo el texto seudonimizado de cada petición', note: 'Proveedor incluido de serie en el catálogo de modelos de Agentic Platform.' },
      local: { seg: 'Modelo local', name: 'Modelo local', local: true, place: 'Servidor con GPU en la Sede de Málaga (Ollama, LM Studio o llama.cpp)', exit: 'La inferencia se ejecuta dentro de su red', note: 'Ningún tercero ve texto de los expedientes: la opción más sencilla de justificar ante el secreto profesional. La calidad y la velocidad se dimensionan con su servidor.' }
    },
    people: ['procesal', 'procesal_staff', 'fiscal', 'mercantil', 'compliance', 'it'],
    peopleShort: ['Procesal', 'Asociado de Procesal', 'Fiscal y Tributario', 'Mercantil', 'Cumplimiento y DPO', 'Sistemas'],
    modules: [
      { icon: 'workflow', title: 'Workflows (Routines)', text: 'Editor visual, versiones y prueba en seco' },
      { icon: 'cpu', title: 'Agentes por área', text: 'Procesal, Fiscal, Mercantil, Civil y Cumplimiento', agents: true },
      { icon: 'user-check', title: 'Aprobación del letrado', text: 'Ningún escrito, presentación ni comunicación sin su responsable', approval: true },
      { icon: 'book-open', title: 'Manual y normativa con citas', text: 'Cada respuesta enlaza su fuente (manual, Aranzadi, expediente); sin fuente, lo dice' },
      { icon: 'history', title: 'Registro de auditoría', text: 'De solo añadir, por expediente y persona, exportable' },
      { icon: 'key', title: 'Permisos y barreras éticas', text: 'Cada área ve sus expedientes; quien tiene conflicto no ve el asunto' },
      { icon: 'gauge', title: 'Coste por petición', text: 'Estimación en USD, presupuesto por área e imputación por expediente' },
      { icon: 'shield', title: 'Pasarela de modelos', text: 'Enmascara nombres, DNI/NIE, NIF, IBAN y n.º de procedimiento antes del modelo', gateway: true }
    ],
    tiles: [
      { name: 'LexNET', icon: 'mail', text: 'Lee notificaciones y acuses vía Gestor de expedientes o avisos. Nunca presenta escritos: lo hace el letrado con su certificado.', write: false },
      { name: 'Sede AEAT', icon: 'globe', text: 'Lee notificaciones (DEHú) y el estado de los modelos. Prepara borradores del 200 y el 202; presenta el profesional apoderado.', write: false },
      { name: 'Gestor de expedientes', icon: 'database', text: 'Lee expedientes, partes, plazos y horas. Anota plazos, tareas y la consulta de conflictos.', write: true },
      { name: 'iManage', icon: 'file-text', text: 'Lee escritos, hojas de encargo y due diligence. Guarda borradores en el espacio del expediente.', write: true },
      { name: 'Aranzadi', icon: 'book-open', text: 'Consulta legislación y jurisprudencia para citar la fuente exacta. Solo lectura.', write: false },
      { name: 'Signaturit', icon: 'edit', text: 'Prepara el envío de la hoja de encargo a firma. El envío al cliente se aprueba.', write: true },
      { name: 'Microsoft 365', icon: 'message-square', text: 'Avisos en Teams y borradores en Outlook. Toda comunicación al cliente se aprueba.', write: true }
    ],
    decisions: {
      deploy: ['No depende de servicios de MFM en la nube. Lo opera Sistemas del despacho o su proveedor de confianza; MFM firma el contrato de encargado del tratamiento (art. 28 RGPD) con un compromiso expreso de confidencialidad sobre la información amparada por el secreto profesional.'],
      llm: 'Se cambia de modelo por configuración, sin tocar los workflows. El proveedor del modelo es un subencargado: se evalúa con el DPO y Cumplimiento antes de usarlo con datos reales de clientes.',
      access: [
        'SSO con Microsoft Entra ID (OIDC) o SAML 2.0, con MFA. Permisos por rol y por realm (área), y barreras éticas por expediente: si el sistema de conflictos marca a un profesional, ese profesional no ve el asunto ni sus documentos. Cada consulta queda registrada con la identidad de la persona.',
        'La pasarela seudonimiza antes de llamar al modelo: nombres de clientes y contrarias, DNI/NIE, NIF, IBAN, domicilios y números de procedimiento se sustituyen por marcadores y se restituyen al volver. Los patrones propios del despacho se añaden en el piloto.'
      ],
      hitl: 'Presentar un escrito por LexNET, aceptar un encargo, enviar una hoja de encargo o una minuta, escribir a un cliente, presentar un modelo ante la AEAT o notificar una brecha a la AEPD requiere la aprobación del letrado o socio responsable. Rechazar no aplica nada y queda registrado con el motivo.',
      cost: 'El presupuesto por realm separa el gasto de Procesal, Fiscal, Mercantil y Cumplimiento, y el coste puede imputarse al expediente para la rentabilidad por asunto.',
      limits: [
        'No sustituye LexNET, la Sede de la AEAT, el Gestor de expedientes, iManage ni Aranzadi.',
        'No firma ni presenta escritos o modelos: la firma y la presentación siguen siendo del letrado o del profesional apoderado, con su certificado.',
        'No asesora al cliente por su cuenta: prepara borradores que revisa y firma un abogado, que mantiene la responsabilidad profesional.',
        'No decide conflictos de intereses ni la aceptación de encargos: lo decide el socio (art. 12 del Código Deontológico; POL-CON-002).',
        'No comunica al SEPBLAC ni notifica a la AEPD sin aprobación: prepara el borrador para Cumplimiento y el DPO.'
      ]
    },
    faqTitle: 'Preguntas habituales de socios, Cumplimiento y Sistemas',
    faqSub: 'Respuestas cortas para la conversación con los socios, Cumplimiento, el DPO y Sistemas',
    faq: [
      { topic: 'Deontología', q: '¿Cómo se respeta el secreto profesional?', a: 'El secreto profesional (art. 542.3 LOPJ, art. 21 del Estatuto General de la Abogacía y art. 5 del Código Deontológico) se mantiene: los expedientes no salen de la infraestructura del despacho salvo el texto seudonimizado que ve el modelo, el proveedor no puede usarlo para entrenar ni revisarlo, y con un modelo local no sale nada. MFM y el proveedor del modelo firman compromisos de confidencialidad, los permisos y las barreras éticas limitan quién ve cada asunto y cada acceso queda registrado.' },
      { topic: 'Deontología', q: '¿Quién responde de lo que redacta el agente?', a: 'El abogado que lo revisa y lo firma, como con el trabajo de un asociado. Agentic Platform prepara borradores con sus fuentes citadas; nada se presenta ni se envía sin aprobación, y el borrador indica que se ha preparado con un asistente de IA.' },
      { topic: 'Cumplimiento', q: '¿Y el RGPD y la LOPDGDD?', a: 'El despacho es responsable del tratamiento; MFM, encargado (art. 28 RGPD) con contrato y lista de subencargados, incluido el proveedor del modelo. Antes de usar datos reales se hace la evaluación de impacto (art. 35) con el DPO, porque hay datos de interesados que no son clientes (contrarias, testigos) y, a veces, categorías especiales. Minimización: el agente solo pide los campos que necesita y la pasarela seudonimiza. No hay decisiones basadas únicamente en tratamiento automatizado (art. 22).' },
      { topic: 'Datos', q: '¿Los datos se quedan en la UE?', a: 'Sí. La instalación vive en su servidor, en un centro de datos en España o en Azure España Central; el modelo externo se contrata en región UE (Data Zone EU o Vertex AI UE) sin retención para entrenamiento, y con un modelo local la inferencia no sale de la sede. No hay transferencias internacionales del capítulo V del RGPD.' },
      { topic: 'Cumplimiento', q: '¿Encaja con la prevención del blanqueo (Ley 10/2010)?', a: 'Sí, y ayuda: el agente de Cumplimiento comprueba si un expediente sujeto (operaciones societarias, inmobiliarias o de gestión de fondos) tiene completa la diligencia debida, la identificación del titular real y la conservación documental de 10 años, y avisa de lo que falta. La comunicación de operaciones sospechosas al SEPBLAC la decide y la firma el representante ante el SEPBLAC; el agente nunca alerta al cliente (art. 24).' },
      { topic: 'Cumplimiento', q: '¿Afecta el Reglamento de IA (AI Act)?', a: 'El anexo III incluye la IA usada por autoridades judiciales para interpretar hechos y Derecho; el uso interno de un despacho para plazos, borradores y cuestionarios no figura en él. Se cumplen las obligaciones de transparencia y de alfabetización en IA (art. 4): la formación de los usuarios forma parte del piloto, y la política interna de uso de IA generativa (POL-IA-007) fija qué datos pueden usarse y quién revisa.' },
      { topic: 'Seguridad', q: '¿Qué certificaciones de seguridad tiene?', a: 'Agentic Platform se instala en su infraestructura y hereda sus controles; aporta SSO, MFA, permisos por rol, cifrado en tránsito y registro de auditoría de solo añadir. Para cuestionarios como el de Banca Mediterránea (ISO 27001, ENS) MFM entrega la documentación de controles y de subencargados.' },
      { topic: 'Seguridad', q: '¿Cómo entran los usuarios?', a: 'Con el SSO de Microsoft Entra ID de su Microsoft 365 (OIDC) o SAML 2.0, y MFA. Los permisos van por rol, por realm (área) y por expediente. Las cuentas de servicio de los conectores son de solo lectura y sus secretos van en el almacén de secretos del despacho.' },
      { topic: 'Modelo de lenguaje', q: '¿Qué modelo usa y se puede cambiar?', a: 'El que elija el despacho: Azure OpenAI, Gemini en Vertex AI, AWS Bedrock en la UE o un modelo local. Se fija por realm y se cambia por configuración, sin tocar los workflows; Fiscal puede usar uno y Procesal otro.' },
      { topic: 'Modelo de lenguaje', q: '¿Y si el modelo se equivoca o se inventa una sentencia?', a: 'Solo cita lo que encuentra en sus fuentes (manual del despacho, iManage, Aranzadi) y enlaza el documento exacto; si no lo encuentra, lo dice. El cómputo de plazos lo hace una regla determinista (días hábiles, agosto inhábil, festivos de Málaga y Córdoba), no el modelo. En el piloto se mide la exactitud con expedientes cerrados.' },
      { topic: 'Integración', q: '¿Hay conector de LexNET o de la Sede de la AEAT?', a: 'No de serie, y LexNET no ofrece una API pública para terceros. En el piloto se leen las notificaciones a través del Gestor de expedientes que ya las sincroniza o de los avisos por correo, y la Sede de la AEAT por las notificaciones de DEHú. La presentación de escritos y modelos sigue siendo manual, con el certificado del profesional.' },
      { topic: 'Integración', q: '¿Dónde se instala?', a: 'En una máquina virtual de su servidor, en un clúster gestionado en España o en su suscripción de Azure en España Central. No depende de servicios de MFM en la nube.' },
      { topic: 'Coste', q: '¿Cuánto cuesta cada consulta?', a: 'Agentic Platform mide el coste de cada petición en USD por realm, usuario y expediente, con presupuesto diario y mensual y aviso al 80 %. Una notificación de LexNET son céntimos de modelo; el coste real se mide en el piloto.' },
      { topic: 'Coste', q: '¿Licencia y precio?', a: 'Se concretan en la propuesta comercial (SOW), junto con el contrato de encargado del tratamiento y el compromiso de confidencialidad.' }
    ],
    seen: [
      { scene: 'turno', label: 'Resumen del día', icon: 'activity', title: 'Resumen del día del despacho', text: 'Notificaciones de LexNET, plazos que vencen, modelo 200 del 25 de octubre, conflictos, horas sin imputar y PBC; el agente prepara la agenda de la mañana del Socio director.', agents: ['Agente del día'], approver: 'decider', outcome: 'parte' },
      { scene: 'workflow', label: 'De palabras a workflow', icon: 'workflow', title: 'Protocolo de plazos (PRO-PLZ-001) → workflow publicado', text: '«Cuando llegue una notificación de LexNET…» se convierte en un workflow con disparo, expediente, cómputo de plazo, conflictos, aviso en Teams y aviso al socio si vence en menos de 5 días (wf-notificacion-lexnet).', agents: ['Generador de workflows'], approver: 'procesal' },
      { scene: 'alarma', label: 'Notificación PO 1184/2026', icon: 'scale', title: 'Demanda contra Aceites Sierra Subbética', text: 'LexNET a las 08:12: juicio ordinario en el JPI nº 7 de Málaga, contestación hasta el 27-10-2026; posible conflicto (art. 12 CD) y asociado de vacaciones. Encargo bloqueado, reasignación y aviso al cliente.', agents: ['Procesal', 'Conflictos', 'Clientes'], approver: 'decider', outcome: 'alarma' },
      { scene: 'reclamacion', label: 'Queja REC-2026-0057', icon: 'mail', title: 'Minuta discutida por Grupo Hostelero Costa del Sol', text: 'Factura F-2026-0938 de 18.400 € frente a la hoja de encargo: análisis de horas imputadas, falta de información al cliente y borrador de respuesta en 15 días.', agents: ['Atención al cliente', 'Mercantil'], approver: 'mercantil', outcome: 'reclamacion' },
      { scene: 'retirada', label: 'Simulacro RGPD-2609-03', icon: 'lock', title: 'Correo enviado a un destinatario equivocado', text: 'Due diligence de Promociones Guadalhorce: documentos de iManage, expedientes, clientes e interesados afectados, cifrado y borradores de notificación a la AEPD (72 h) y a los interesados.', agents: ['Protección de datos', 'Trazabilidad'], approver: 'dpo', outcome: 'retirada' },
      { scene: 'cuestionario', label: 'Homologación de Banca Mediterránea', icon: 'list-checks', title: 'Entrada en el panel de despachos', text: 'Seguro de RC profesional, ISO 27001/ENS, conflictos, PBC/FT, RGPD, continuidad, tarifas e IA generativa: respuestas con evidencias citadas y huecos marcados para Cumplimiento.', agents: ['Cuestionarios'], approver: 'compliance', outcome: 'cuestionario' },
      { scene: 'procedimientos', label: 'Manual del despacho', icon: 'book-open', title: 'Preguntas con citas', text: 'Plazos procesales, conflictos, blanqueo, honorarios, RGPD y calendario tributario: cada respuesta enlaza el apartado vigente y, si no hay fuente, lo dice.', agents: ['Procedimientos'] }
    ],
    honesty: [
      { aspect: 'Consola, workflows (Routines) y editor', demo: 'Esta consola, en el navegador, con los workflows publicados en la sesión', pilot: 'Agentic Platform instalado en la infraestructura del despacho; Routines con editor visual, versiones y prueba en seco', origin: 'serie' },
      { aspect: 'Workflow a partir de un protocolo escrito', demo: 'Generador simulado en el navegador, con tres plantillas', pilot: 'Se integra en Agentic Platform y se valida con sus protocolos; cada workflow lo revisa el socio del área antes de publicarlo', origin: 'demo' },
      { aspect: 'Agentes de Mora & Jordano', demo: 'Procesal, conflictos, Fiscal, Mercantil, protección de datos, cuestionarios y resumen del día, sobre datos sintéticos', pilot: 'Los del caso elegido, adaptados a sus expedientes, protocolos y plantillas', origin: 'demo' },
      { aspect: 'Conectores (LexNET, Sede AEAT, Gestor de expedientes, iManage, Aranzadi y Signaturit)', demo: 'Simulados en el navegador', pilot: 'Lectura de 2–3 sistemas: Gestor de expedientes, iManage y avisos de LexNET. No hay conector de serie para LexNET ni para la Sede de la AEAT', origin: 'piloto' },
      { aspect: 'Disparo por notificación', demo: 'Al abrir la notificación del PO 1184/2026', pilot: 'Webhook del Gestor de expedientes o consulta periódica (cron) de los avisos: Agentic Platform no tiene planificador propio de agentes', origin: 'piloto' },
      { aspect: 'Modelo de lenguaje', demo: 'Ninguna llamada: las respuestas están preparadas', pilot: 'El que elija el despacho (Azure OpenAI, Gemini o local), a través de la pasarela de Agentic Platform y evaluado como subencargado', origin: 'serie' },
      { aspect: 'Aprobación del letrado', demo: 'Tarjetas de aprobación; rechazar no aplica nada', pilot: 'Igual, con SSO, MFA y permisos por rol. En el piloto no se presenta ni se envía nada: borradores que aprueba el letrado responsable', origin: 'serie' },
      { aspect: 'Manual con citas', demo: '7 documentos sintéticos del manual interno (PRO-PLZ-001, POL-CON-002, MAN-PBC-003, POL-HON-004, PRO-RGPD-005, CAL-TRI-006 y POL-IA-007)', pilot: 'Su manual y sus plantillas vigentes, con permisos por realm; objetivo ≥95 % de citas correctas', origin: 'serie' },
      { aspect: 'Registro de auditoría', demo: 'De esta sesión, guardado en el navegador y exportable a JSON o CSV', pilot: 'En la base de datos de Agentic Platform, de solo añadir, con la identidad SSO de cada persona y el expediente; exportable', origin: 'serie' },
      { aspect: 'Coste por petición', demo: 'Estimación mostrada al final de las ejecuciones', pilot: 'Medido por petición en USD, por realm y por expediente, con presupuesto diario y mensual', origin: 'serie' },
      { aspect: 'Cumplimiento (secreto profesional, RGPD, Ley 10/2010)', demo: 'Explicado en las preguntas frecuentes', pilot: 'Contrato de encargado con confidencialidad, evaluación de impacto con el DPO y revisión deontológica antes de usar datos reales', origin: 'piloto' },
      { aspect: 'Datos y acciones', demo: 'Sintéticos y coherentes entre sí, preparados por MFM; las acciones no salen del navegador', pilot: 'Sus datos en modo lectura y 20–30 expedientes cerrados y anonimizados', origin: 'datos' }
    ],
    writes: 'Ninguna en LexNET ni en la Sede de la AEAT durante el piloto: borradores que aprueba el letrado responsable',
    cases: {
      A: {
        label: 'Caso A', short: 'Caso A · Notificación de LexNET', title: 'Notificación de LexNET: expediente, plazo, conflictos y aviso al letrado',
        systems: ['LexNET', 'Gestor de expedientes', 'iManage'], systemsText: 'avisos de LexNET, Gestor de expedientes e iManage',
        trigger: 'Notificación nueva de LexNET sincronizada en el Gestor de expedientes (webhook o consulta periódica)',
        output: 'Expediente identificado, plazo calculado en días hábiles, consulta de conflictos, aviso en Teams al letrado y anotación en la agenda; aviso al socio si vence en menos de 5 días',
        scene: 'alarma', sceneLabel: 'Notificación PO 1184/2026',
        accuracy: '100 % de los plazos bien calculados y ≥95 % de 30 notificaciones históricas asignadas al expediente correcto',
        accuracyHow: 'Comparación con la agenda y los expedientes cerrados del Gestor de expedientes'
      },
      B: {
        label: 'Caso B', short: 'Caso B · Queja de honorarios', title: 'Queja de un cliente por honorarios: horas, hoja de encargo y respuesta',
        systems: ['Gestor de expedientes', 'iManage', 'Outlook'], systemsText: 'Gestor de expedientes (horas y facturas), iManage (hojas de encargo) y Outlook',
        trigger: 'Queja entrante por correo o formulario, registrada por Atención al cliente',
        output: 'Ficha de la queja, horas imputadas frente a la hoja de encargo, cronología de comunicaciones y borrador de respuesta en el plazo interno de 15 días, para aprobar',
        scene: 'reclamacion', sceneLabel: 'Queja REC-2026-0057',
        accuracy: '≥95 % de 20 quejas históricas con horas, conceptos e importes bien conciliados',
        accuracyHow: 'Comparación con la resolución archivada de cada queja'
      }
    },
    phases: [
      { from: 1, to: 2, title: 'Accesos, evaluación y línea base', detail: 'Accesos de lectura, contrato de encargado, evaluación de impacto con el DPO, revisión deontológica, instalación y medición del tiempo actual', result: 'Criterios firmados y línea base medida' },
      { from: 3, to: 5, title: 'Conectores, agentes y workflow', detail: 'Pruebas con 20–30 expedientes cerrados y anonimizados', result: 'Exactitud medida con expedientes históricos' },
      { from: 6, to: 7, title: 'Uso en paralelo', detail: 'Expedientes reales, con el control de plazos actual como respaldo', result: 'Aceptación de los borradores por los letrados' },
      { from: 8, to: 8, title: 'Evaluación y decisión', detail: 'Criterios medidos e informe final para la junta de socios', result: 'Informe final y decisión' }
    ],
    criteria: [
      { name: 'Tiempo', target: 'Ficha y borrador en menos de 10 min', how: 'Cronometrado frente a la línea base de las semanas 1–2' },
      { name: 'Utilidad', target: 'El letrado acepta el borrador con ediciones menores en ≥70 % de los casos', how: 'Revisión de cada borrador por el letrado responsable' },
      { name: 'Citas', target: '≥95 % de 50 preguntas de referencia con la cita correcta', how: 'Herramienta de evaluación incluida en Agentic Platform' },
      { name: 'Control', target: 'Nada presentado ni enviado sin aprobación; el 100 % en el registro de auditoría', how: 'Revisión del registro exportado por Cumplimiento' },
      { name: 'Secreto profesional', target: 'Ningún nombre, DNI/NIE, NIF ni número de procedimiento en claro en las peticiones al modelo', how: 'Muestreo de peticiones de la pasarela por el DPO y Sistemas' },
      { name: 'Coste', target: 'Coste del modelo por expediente medido y dentro del presupuesto del realm', how: 'Informe de coste por realm (USD, estimación)' }
    ],
    gives: {
      client: ['Socio responsable y contactos de Sistemas, Cumplimiento y DPO', 'Accesos de lectura al Gestor de expedientes, iManage y avisos de LexNET', '20–30 expedientes cerrados y anonimizados', 'Manual interno, protocolos y plantillas vigentes', 'Evaluación de impacto (RGPD) y revisión deontológica', '2–3 h a la semana de los letrados del área'],
      mfm: ['Instalación en su infraestructura', 'Conectores de lectura', 'Agentes y workflow del caso', 'Contrato de encargado, confidencialidad y documentación para la evaluación de impacto', 'Formación de los usuarios (alfabetización en IA)', 'Informe final con los criterios medidos']
    },
    pilot: {
      sub: 'Un caso, la Sede de Málaga, un realm y 5–10 usuarios, en la infraestructura del despacho, con datos en la UE y con su modelo',
      after: 'Después del piloto: calendario tributario y borradores de los modelos 200 y 202 para Fiscal, o diligencia debida de PBC (Ley 10/2010) en la apertura de expedientes.',
      nextTitle: 'Siguiente paso: taller de 2 horas con los socios de Procesal y Fiscal, Cumplimiento, el DPO y Sistemas',
      nextBody: 'Para elegir el caso, revisar el encaje con el secreto profesional y el RGPD, confirmar los accesos de lectura y fijar la línea base con la que se medirá el piloto.'
    },
    calc: {
      fteHours: 1680,
      note: 'Horas de trabajo repetitivo que socios, asociados, Cumplimiento y Atención al cliente pueden dedicar a estrategia, a escritos complejos y a atender clientes.',
      rows: [
        { id: 'notificacion', label: 'Notificación de LexNET: expediente, plazo y conflictos', who: 'Procesal y Secretaría', scene: 'alarma', seen: 'Notificación PO 1184/2026', n: 420, before: 15, after: 4, basis: 'Identificar expediente, calcular plazo, anotar y avisar' },
        { id: 'queja', label: 'Queja de cliente por honorarios o información', who: 'Atención al cliente y socio del área', scene: 'reclamacion', seen: 'Queja REC-2026-0057', n: 3, before: 240, after: 60, basis: 'Horas imputadas, hoja de encargo y borrador de respuesta' },
        { id: 'brecha', label: 'Incidente de datos personales (RGPD art. 33)', who: 'DPO y Cumplimiento', scene: 'retirada', seen: 'Simulacro RGPD-2609-03', n: 1, before: 720, after: 120, basis: 'Documentos → expedientes → interesados, con borradores de notificación' },
        { id: 'cuestionario', label: 'Cuestionario de homologación de un cliente corporativo', who: 'Cumplimiento y Dirección', scene: 'cuestionario', seen: 'Homologación de Banca Mediterránea', n: 2, before: 480, after: 120, basis: 'Con evidencias citadas de políticas y certificados' },
        { id: 'consultas', label: 'Consultas al manual interno y protocolos', who: 'Todos los profesionales', scene: 'procedimientos', seen: 'Manual del despacho', n: 300, before: 10, after: 2, basis: 'Búsqueda en la intranet y en iManage' },
        { id: 'resumen', label: 'Resumen del día del despacho', who: 'Socio director y Secretaría', scene: 'turno', seen: 'Resumen del día', n: 22, before: 45, after: 10, basis: '1 resumen × 22 días hábiles' }
      ]
    },
    auditEmpty: 'Genera el resumen del día, publica un workflow o decide sobre la notificación del PO 1184/2026: cada paso aparecerá aquí con su hora, su actor y su vista.',
    auditPilot: 'El registro vive en la base de datos de Agentic Platform, identifica a cada persona por su SSO y cada acción por su expediente, se filtra por persona, acción y fecha y se exporta a CSV para Cumplimiento, el DPO o una auditoría del cliente. En esta demo vive en este navegador y se borra con «Reiniciar demo».',
    proposal: {
      code: 'PIL-MJ-2026-01',
      filename: 'propuesta-piloto-agentic-mora-jordano',
      objective: 'Medir, con un caso real y criterios firmados, cuánto tiempo de los letrados libera Agentic Platform y con qué exactitud, sin cambiar LexNET, la Sede de la AEAT, el Gestor de expedientes, iManage ni Aranzadi, y dentro del marco del secreto profesional, el Código Deontológico, el RGPD y la LOPDGDD y la Ley 10/2010. Agentic Platform lee de esos sistemas, razona con el manual del despacho y propone; el letrado responsable aprueba antes de presentar o comunicar.',
      extraArch: [['Seudonimización', 'Nombres de clientes y contrarias, DNI/NIE, NIF, IBAN y n.º de procedimiento enmascarados antes del modelo']],
      compliance: [
        ['Secreto profesional', 'Art. 542.3 LOPJ, art. 21 EGA (RD 135/2021) y art. 5 del Código Deontológico: datos en la infraestructura del despacho, confidencialidad de MFM y del proveedor, barreras éticas y registro de cada acceso'],
        ['Código Deontológico', 'Conflictos de intereses (art. 12) y aceptación de encargos los decide el socio; el abogado revisa y firma todo lo que sale del despacho'],
        ['RGPD y LOPDGDD', 'MFM como encargado (art. 28); evaluación de impacto (art. 35) con el DPO; datos en la UE; sin decisiones automatizadas (art. 22)'],
        ['Ley 10/2010', 'Diligencia debida y titular real comprobados por el agente; la comunicación al SEPBLAC la decide el representante; conservación de 10 años'],
        ['Reglamento de IA', 'Uso fuera del anexo III; transparencia en los borradores, formación de los usuarios (art. 4) y política interna POL-IA-007']
      ],
      signatures: [{ role: 'decider', note: 'Conforme con el alcance y los criterios' }, { role: 'compliance', note: 'Conforme con el encaje deontológico y normativo' }, { role: 'it', note: 'Conforme con el despliegue y la seguridad' }]
    },
    presenter: {
      arquitectura: [
        'Agentic Platform no sustituye nada: va encima de LexNET, la Sede de la AEAT, el Gestor de expedientes, iManage y Aranzadi. Lee, razona con vuestro manual y propone; antes de presentar un escrito o escribir a un cliente, aprueba el letrado.',
        'Se instala en la infraestructura del despacho, con vuestro SSO de Microsoft 365 y MFA y el modelo que elijáis, siempre en la UE. Con un modelo local, ningún texto de los expedientes sale de la sede.',
        'LexNET y la AEAT solo se leen: la presentación sigue siendo vuestra, con vuestro certificado. Las líneas discontinuas en ámbar son las únicas escrituras, y siempre tras aprobación. Abrid las preguntas sobre secreto profesional y RGPD.'
      ],
      piloto: [
        'Esto es lo que habéis visto hoy: siete casos del despacho, cada uno con sus agentes y su aprobador. Pulsad cualquiera para volver a él.',
        'Lo honesto: los datos de hoy son sintéticos y la demo no llama a ningún modelo. LexNET no tiene API pública: en el piloto se lee a través de vuestro Gestor de expedientes, después del contrato de encargado y la evaluación de impacto.',
        'Piloto de 6–8 semanas: un caso, un realm, 5–10 usuarios. Los criterios, incluido el de secreto profesional, se firman en la semana 1 y se miden en la 8.'
      ],
      horas: [
        'Preguntad cuántas notificaciones de LexNET, quejas de honorarios o cuestionarios de homologación tienen al mes y escribidlo: la calculadora es suya.',
        '«Con Agentic Platform» incluye la revisión y la aprobación del letrado. Son horas de trabajo repetitivo que socios y asociados pueden dedicar a estrategia y a clientes.',
        'Son supuestos para conversar: la línea base real se mide en las semanas 1–2 del piloto.'
      ],
      registro: [
        'Todo lo que hemos hecho hoy está aquí: {n}, de personas y de agentes, con hora, actor y vista.',
        'Filtrad por «Decisiones»: cada aprobación y cada rechazo, con su motivo. Nada se edita ni se borra; se exporta para Cumplimiento, el DPO o la auditoría de un cliente.',
        'Cierre: proponemos un taller de 2 horas con los socios de Procesal y Fiscal, Cumplimiento, el DPO y Sistemas.'
      ],
      next: {
        arquitectura: 'Pulsar «Modelo local» y abrir «¿Cómo se respeta el secreto profesional?»; después, pestaña «Demo y piloto».',
        piloto: 'Elegir con ellos el caso A o B y abrir la pestaña «Calculadora de horas».',
        horas: 'Escribir sus volúmenes al mes y abrir «Registro de auditoría» para cerrar.',
        registro: 'Pulsar «Descargar propuesta de piloto (PDF)» y proponer fecha para el taller de 2 horas.'
      }
    },
    tour: [
      'Agentic Platform va encima de LexNET, la Sede de la AEAT, el Gestor de expedientes, iManage y Aranzadi: lee, prepara borradores y el letrado aprueba antes de presentar o comunicar.',
      'Con un modelo local, ningún texto de los expedientes sale de la sede; con uno externo, sale solo texto seudonimizado a una región UE, sin entrenamiento.',
      'Los casos de hoy, de la notificación del PO 1184/2026 al simulacro RGPD-2609-03, y qué es de serie y qué se construye en el piloto.',
      'Piloto de 6–8 semanas: un caso, un realm, criterios firmados en la semana 1 y el encaje con el secreto profesional y el RGPD resuelto antes de tocar datos reales.',
      'Horas liberadas con supuestos editables; la línea base real se mide en el piloto.',
      'Todo lo hecho en la sesión queda en el registro de auditoría: decisiones de los letrados, pasos de los agentes y exportación.'
    ]
  }
});
