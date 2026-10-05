/* Mercados Moncayo · cuestionario de preauditoría IFS Logistics v3 de la Plataforma de Plaza. Empresas ficticias; datos sintéticos (MFM). */
agenticPack('retail', {
  cuestionario: {
    agent: 'Cuestionarios de cliente',
    lang: 'es',
    default_sel: 'B1',
    reviewer: 'Responsable de Calidad',
    assignee: 'Jefe de plataforma',
    assignee_short: 'Jefe de plataforma',
    team: 'Calidad',
    assign_due: '2026-10-09',
    responder: 'Mercados Moncayo, S.A. (Plataforma de Plaza)',
    site: 'Plataforma de Plaza (Zaragoza)',
    site_label: 'Centro',
    page_title: 'Preauditoría IFS Logistics v3 · Plataforma de Plaza',
    report_title: 'Respuesta al cuestionario de preauditoría IFS Logistics',
    ref_label: 'Capítulo IFS Logistics',
    scope_meta_label: 'Alcance',
    discard_placeholder: 'Por ejemplo: se mostrará la evidencia en la auditoría in situ',
    save_system: 'ServiceNow',
    qn: {
      code: 'CUE-2026-019',
      title: 'Cuestionario de preauditoría IFS Logistics versión 3',
      customer: 'Certiva Certificación',
      via: 'Certiva Certificación · auditoría IFS',
      received: '2026-09-28T10:05',
      due: '2026-10-16',
      file: 'Certiva_IFS_Log_v3_Plaza.xlsx',
      scope: 'recepción, almacenamiento a temperatura ambiente, refrigerada y congelada, preparación y expedición a tiendas de la Plataforma de Plaza (auditoría inicial IFS Logistics v3 prevista los días 3 y 4 de noviembre de 2026)',
      scope_short: 'Plataforma de Plaza · IFS Logistics v3',
      scope_label: 'auditoría inicial del 3 y 4 de noviembre'
    },
    email: {
      mailbox: 'buzón de Calidad',
      headers: {
        From: 'Programa IFS, Certiva Certificación <ifs@certiva.example>',
        To: 'Calidad, Mercados Moncayo <calidad@mercadosmoncayo.example>',
        Date: 'lun, 28 sep 2026 10:05',
        Subject: 'Auditoría inicial IFS Logistics v3 · Plataforma de Plaza · cuestionario de preauditoría'
      },
      text: 'Buenos días:\n\nConfirmamos la auditoría inicial IFS Logistics versión 3 de la Plataforma de Plaza los días 3 y 4 de noviembre de 2026.\n\nPara preparar el plan de auditoría os enviamos el cuestionario de preauditoría: 15 preguntas sobre sistema y APPCC, control de temperaturas, operaciones de almacén, trazabilidad e incidentes, y defensa de producto y subcontratación.\n\nIndicad en cada respuesta el procedimiento o registro que la respalda: en la auditoría pediremos esa evidencia. Os rogamos que nos lo devolváis antes del viernes 16 de octubre de 2026.\n\nUn saludo,\n\nPrograma IFS\nCertiva Certificación',
      highlights: [
        { text: 'IFS Logistics versión 3', label: 'Norma', tone: 'brand' },
        { text: '3 y 4 de noviembre de 2026', label: 'Auditoría', tone: 'brand' },
        { text: '15 preguntas', label: 'Preguntas', tone: 'brand' },
        { text: 'el procedimiento o registro que la respalda', label: 'Requisito' },
        { text: 'viernes 16 de octubre de 2026', label: 'Plazo' }
      ]
    },
    sections: [
      { id: 'A', es: 'Sistema de gestión y APPCC' },
      { id: 'B', es: 'Control de temperaturas' },
      { id: 'C', es: 'Operaciones de almacén' },
      { id: 'D', es: 'Trazabilidad, incidentes y reclamaciones' },
      { id: 'E', es: 'Defensa de producto y subcontratación' }
    ],
    kpi: { label: 'Alertas sanitarias en 2025', value: 23, sub: '4 con retirada de producto · 1.214 reclamaciones de consumidores atendidas', icon: 'shield-check' },
    sources_sub: 'Manual, plan APPCC, procedimientos de plataforma y de alertas',
    identify_result: 'Certiva Certificación · IFS Logistics v3 · Plataforma de Plaza · auditoría el 03/11/2026',
    search_scope: 'manual de calidad, plan APPCC, procedimientos de plataforma, de alertas y de reclamaciones',
    lookups: [
      { system: 'Sensores de frío', action: 'Lee las sondas de cámaras y muelles y los registros de los camiones', result: '42 sondas cada 5 min · 1.540 vueltas a tienda con registro descargado', ms: 480 },
      { system: 'WMS Manhattan', action: 'Revisa las temperaturas de recepción y la trazabilidad de un lote', result: '1.862 recepciones con temperatura registrada · lote L26214 trazado', ms: 520 },
      { system: 'ServiceNow', action: 'Consulta auditorías internas, plagas y alertas sanitarias', result: 'Auditoría interna del 14/05/2026 · 23 alertas gestionadas en 2025', ms: 420 },
      { system: 'CRM Fidelización', action: 'Busca reclamaciones de consumidores abiertas', result: 'Reclamación abierta: vidrio en Tomate frito Moncayo 400 g, lote L26214', ms: 360, tone: 'warn' },
      { system: 'Sensores de frío', action: 'Cruza el cuestionario con las alarmas de hoy', result: 'T-027: mural MR-3 a 9,4 °C desde las 03:55 (tienda, fuera del alcance IFS)', ms: 300, tone: 'warn' }
    ],
    compare: {
      people: '2–3: Calidad, Jefe de plataforma y, según la pregunta, Mantenimiento o Compras',
      systems: '6–8: correo, Excel de la certificadora, SAP, WMS, sensores de frío, ServiceNow, CRM y carpeta de procedimientos',
      steps: 'Leer la norma, buscar la evidencia de cada requisito, pedir registros a la plataforma y a Mantenimiento y montar el Excel',
      time: '3–5 h de trabajo de Calidad, repartidas en 2–3 días'
    },
    presenter: {
      before: [
        'La plataforma se certifica por primera vez en IFS Logistics v3 en noviembre, y la certificadora manda antes su cuestionario de preauditoría: preparar la evidencia de cada requisito es trabajo de fondo de Calidad.',
        'Son {total} preguntas sobre APPCC, temperaturas, almacén, trazabilidad e incidentes, y defensa de producto. Cada respuesta tiene que llevar su procedimiento o su registro.',
        'Al pulsar, Agentic Platform busca en el manual, el plan APPCC y los procedimientos, y en los registros de los sensores de frío, el WMS, ServiceNow y el CRM, y redacta cada respuesta con su fuente.'
      ],
      during: [
        '{drafted} de {total} con borrador y cita, con documento y apartado; cada cita se comprueba contra el texto de la fuente. {flagged} quedan sin responder: defensa de producto, subcontratistas y control de vidrio. Sin documento, no se inventa nada.',
        'B1: además de responder, avisa del mural de lácteos de la T-027 a 9,4 °C esta madrugada. Es una tienda y queda fuera del alcance de la auditoría, pero el auditor puede preguntar por el procedimiento.',
        'D3: cruza la pregunta de reclamaciones con la reclamación abierta por vidrio en el lote L26214. El cuestionario no vive aislado del resto de la operación.',
        'Nada sale sin aprobación: en bloque solo las de confianza alta; limpieza y trazabilidad se revisan una a una.'
      ],
      next_during: 'Enseñar B1 (citas y aviso de la alarma) y E1 (sin evidencia). Después «Aprobar las {alta} de confianza alta», aprobar {media_ids} una a una y «Asignar las {flagged} sin fuente».'
    },
    sources: {
      'MAN-CAL-002': {
        type: 'doc', kind: 'Manual', code: 'MAN-CAL-002', title: 'Manual de calidad y seguridad alimentaria · Plataforma de Plaza', system: 'Procedimientos', version: '4', date: '2026-02-17', owner: 'Responsable de Calidad',
        org: 'Mercados Moncayo · Calidad',
        sections: [
          { id: '1', heading: '1. Alcance', page: 2, text: 'Recepción, almacenamiento a temperatura ambiente, refrigerada (de 0 a 4 °C) y congelada (−18 °C o menos), preparación de pedidos y expedición a las 64 tiendas de productos alimentarios envasados, frutas y hortalizas.' },
          { id: '2', heading: '2. Política y compromiso de la Dirección', page: 3, text: 'La Dirección revisa cada año la política de calidad y seguridad alimentaria y los objetivos de la plataforma; la última revisión es del 17/02/2026.' },
          { id: '7', heading: '7. Seguridad de las instalaciones', page: 11, text: 'El acceso a la plataforma es con tarjeta personal; las visitas y los transportistas se registran en portería.' }
        ]
      },
      'APPCC-PLA-01': {
        type: 'doc', kind: 'Plan APPCC', code: 'APPCC-PLA-01', title: 'Plan APPCC de la Plataforma de Plaza', system: 'Procedimientos', version: '6', date: '2026-03-12', owner: 'Equipo APPCC',
        sections: [
          { id: '4', heading: '4. Puntos de control crítico', page: 6, list: ['PCC 1: temperatura de recepción de refrigerados (producto a 4 °C o menos) y de congelados (producto a −15 °C o menos)', 'PCC 2: temperatura de almacenamiento en cámaras de refrigerados y de congelados', 'PCC 3: temperatura de carga y de transporte a tienda'] },
          { id: '6', heading: '6. Verificación', page: 9, text: 'El equipo APPCC revisa el plan cada año y ante cualquier cambio de instalaciones, productos o procesos; última revisión: 12/03/2026.' }
        ]
      },
      'PR-LOG-003': {
        type: 'doc', kind: 'Procedimiento', code: 'PR-LOG-003', title: 'Control de temperaturas en plataforma y transporte', system: 'Procedimientos', version: '5', date: '2026-03-12', owner: 'Responsable de Calidad',
        sections: [
          { id: '3', heading: '3. Cámaras y muelles', page: 2, text: 'Las sondas registran la temperatura cada 5 minutos; si una cámara supera su límite más de 15 minutos, la alarma llega al jefe de turno y a Mantenimiento de frío. Los registros se conservan 2 años.' },
          { id: '4', heading: '4. Recepción', page: 3, text: 'Se mide con sonda la temperatura de producto en cada recepción de refrigerados y congelados; un palé fuera de límite se rechaza o se bloquea en el WMS hasta la decisión de Calidad.' },
          { id: '5', heading: '5. Transporte a tienda', page: 4, text: 'Los camiones a tienda son multitemperatura, con registro continuo de temperatura que se descarga en cada vuelta; la tienda rechaza la mercancía que llegue fuera de límite.' }
        ]
      },
      'PR-PLA-005': {
        type: 'doc', kind: 'Procedimiento', code: 'PR-PLA-005', title: 'Control de plagas', system: 'Procedimientos', version: '3', owner: 'Jefe de plataforma',
        sections: [
          { id: '3', heading: '3. Servicio y frecuencia', page: 2, text: 'Servicio externo de control de plagas prestado por una empresa inscrita en el ROESB, con 9 visitas al año y 148 puntos de control (cebaderos y trampas de insectos voladores) en plano actualizado.' },
          { id: '5', heading: '5. Tendencias', page: 3, text: 'Calidad revisa cada trimestre la tendencia de capturas y las recomendaciones del servicio.' }
        ]
      },
      'PR-LIM-004': {
        type: 'doc', kind: 'Procedimiento', code: 'PR-LIM-004', title: 'Plan de limpieza de la plataforma', system: 'Procedimientos', version: '4', owner: 'Jefe de plataforma',
        sections: [
          { id: '3', heading: '3. Frecuencias', page: 2, text: 'Muelles y zonas de preparación, a diario; cámaras de refrigerados, cada semana; cámaras de congelados, dos veces al año con desescarche.' },
          { id: '5', heading: '5. Verificación', page: 3, text: 'El encargado de cada zona firma la limpieza realizada y Calidad la comprueba en la inspección mensual de buenas prácticas.' }
        ]
      },
      'PR-ALM-007': {
        type: 'doc', kind: 'Procedimiento', code: 'PR-ALM-007', title: 'Mercancía dañada, derrames y alérgenos', system: 'Procedimientos', version: '2', owner: 'Jefe de plataforma',
        sections: [
          { id: '3', heading: '3. Mercancía dañada', page: 2, text: 'El producto dañado se segrega en la zona de no conformes y el derrame se limpia de inmediato.' },
          { id: '4', heading: '4. Alérgenos', page: 2, text: 'Los derrames de productos con alérgenos se limpian con material exclusivo, identificado en amarillo, para evitar el contacto cruzado con otros productos.' }
        ]
      },
      'PR-CAL-013': {
        type: 'doc', kind: 'Procedimiento', code: 'PR-CAL-013', title: 'Auditorías internas e inspecciones', system: 'Procedimientos', version: '3', owner: 'Responsable de Calidad',
        sections: [
          { id: '3', heading: '3. Programa', page: 2, text: 'Auditoría interna completa de la plataforma con el protocolo IFS Logistics al menos una vez al año, e inspecciones mensuales de buenas prácticas.' }
        ]
      },
      'PR-CAL-010': {
        type: 'doc', kind: 'Procedimiento', code: 'PR-CAL-010', title: 'Gestión de alertas y retiradas', system: 'Procedimientos', owner: 'Responsable de Calidad',
        sections: [
          { id: '4', heading: '4. Bloqueo', page: 2, text: 'Ante una alerta, Calidad bloquea el lote en SAP, el WMS retiene los palés y el TPV bloquea la venta en las tiendas.' },
          { id: '6', heading: '6. Comunicación', page: 4, text: 'Se notifica a la AESAN y a la autoridad sanitaria de la comunidad autónoma, y se avisa a los clientes de fidelización que compraron el lote.' },
          { id: '7', heading: '7. Objetivo y simulacros', page: 5, text: 'Objetivo: retirada completa del lineal en 4 h. Se hace al menos un simulacro de trazabilidad y retirada al año.' }
        ]
      },
      'PR-ATC-002': {
        type: 'doc', kind: 'Procedimiento', code: 'PR-ATC-002', title: 'Reclamaciones de consumidores', system: 'Procedimientos', owner: 'Atención al consumidor',
        sections: [
          { id: '3', heading: '3. Plazos', page: 2, text: 'Respuesta al consumidor en 48 h. Las reclamaciones con riesgo para la salud (cuerpos extraños, alérgenos) se escalan a Calidad en 2 h y se comunican al fabricante.' }
        ]
      },
      'SENS-PLA': {
        type: 'record', kind: 'Registro de temperaturas', code: 'Plataforma de Plaza', title: 'Cámaras y muelles · sondas y alarmas', system: 'Sensores de frío',
        org: 'Sensores de frío · plataforma',
        sections: [
          { id: 'inst', heading: 'Instalación', text: '42 sondas en cámaras y muelles, con registro cada 5 minutos.' },
          { id: 'sep', heading: 'Septiembre de 2026', text: '3 alarmas de temperatura en plataforma, todas resueltas en menos de 30 minutos y sin producto afectado.' }
        ]
      },
      'SENS-TRANS': {
        type: 'record', kind: 'Registro de transporte', code: 'Flota a tienda', title: 'Transporte a tiendas · registros de temperatura', system: 'Sensores de frío',
        org: 'Sensores de frío · camiones',
        sections: [
          { id: 'sep', heading: 'Septiembre de 2026', text: 'Vueltas a tienda: 1.540; registros de temperatura descargados: 1.540; incidencias de temperatura en transporte: 2, resueltas con rechazo en tienda.' }
        ]
      },
      'WMS-REC': {
        type: 'record', kind: 'Recepciones', code: 'Recepción · septiembre', title: 'Recepciones de refrigerados y congelados', system: 'WMS Manhattan',
        org: 'WMS Manhattan · recepciones',
        sections: [
          { id: 'sep', heading: 'Septiembre de 2026', text: 'Recepciones de refrigerados y congelados: 1.862; con temperatura de producto registrada: 100 %; palés rechazados por temperatura: 4.' }
        ]
      },
      'WMS-L26214': {
        type: 'record', kind: 'Traza de lote', code: 'L26214', title: 'Tomate frito Moncayo 400 g · lote L26214', system: 'WMS Manhattan',
        org: 'WMS Manhattan · trazabilidad por lote y SSCC',
        sections: [
          { id: 'traza', heading: 'Movimientos', text: 'L26214: 4.800 unidades recibidas de Conservas del Jalón, S.L.; 4.320 servidas a 41 tiendas; 480 en plataforma.' }
        ]
      },
      'SN-CAL': {
        type: 'record', kind: 'Registros de Calidad', code: 'Calidad plataforma', title: 'Auditorías, plagas y alertas sanitarias', system: 'ServiceNow',
        org: 'ServiceNow · Calidad',
        sections: [
          { id: 'aud', heading: 'Auditoría interna', text: 'Auditoría interna IFS Logistics del 14/05/2026: 11 desviaciones (ninguna KO ni mayor); 9 cerradas y 2 en plazo.' },
          { id: 'plag', heading: 'Control de plagas', text: 'Visita del 15/09/2026: sin actividad de roedores; capturas de insectos voladores dentro del umbral.' },
          { id: 'alert', heading: 'Alertas sanitarias', text: 'Alertas sanitarias gestionadas en 2025: 23 (RASFF y AESAN), 4 con retirada de producto; todas cerradas.' }
        ]
      },
      'CRM-RCL': {
        type: 'record', kind: 'Reclamaciones', code: 'Reclamaciones 2025', title: 'Reclamaciones de consumidores', system: 'CRM Fidelización',
        org: 'CRM Fidelización · atención al consumidor',
        sections: [
          { id: 'r', heading: '2025', text: 'Reclamaciones de consumidores en 2025: 1.214; respondidas en 48 h: 97,6 %.' }
        ]
      }
    },
    questions: [
      {
        id: 'A1', ref: 'IFS Log v3 · cap. 1', sec: 'A', topic: 'Alcance y compromiso de la Dirección', conf: 'alta',
        qEs: 'Describa el alcance de las actividades logísticas que se auditarán y cómo revisa la Dirección la política y los objetivos de calidad y seguridad del producto.',
        es: 'El alcance es la recepción, el almacenamiento a temperatura ambiente, refrigerada (de 0 a 4 °C) y congelada (−18 °C o menos), la preparación de pedidos y la expedición a las 64 tiendas de productos alimentarios envasados, frutas y hortalizas [1]. La Dirección revisa cada año la política de calidad y seguridad alimentaria y los objetivos de la plataforma; la última revisión es del 17/02/2026 [2].',
        cites: [
          { src: 'MAN-CAL-002', q: 'Recepción, almacenamiento a temperatura ambiente, refrigerada (de 0 a 4 °C) y congelada (−18 °C o menos), preparación de pedidos y expedición a las 64 tiendas de productos alimentarios envasados, frutas y hortalizas.' },
          { src: 'MAN-CAL-002', q: 'La Dirección revisa cada año la política de calidad y seguridad alimentaria y los objetivos de la plataforma; la última revisión es del 17/02/2026.' }
        ]
      },
      {
        id: 'A2', ref: 'IFS Log v3 · cap. 2', sec: 'A', topic: 'Plan APPCC', conf: 'alta',
        qEs: '¿Dispone de un plan APPCC basado en los principios del Codex Alimentarius para las actividades de la plataforma? Indique los puntos de control crítico y cuándo se revisó.',
        es: 'Sí. El plan APPCC de la plataforma define tres puntos de control crítico: la temperatura de recepción de refrigerados (producto a 4 °C o menos) y de congelados (producto a −15 °C o menos) [1], la temperatura de almacenamiento en cámaras [2] y la temperatura de carga y de transporte a tienda [3]. El equipo APPCC lo revisa cada año y ante cualquier cambio; la última revisión es del 12/03/2026 [4].',
        cites: [
          { src: 'APPCC-PLA-01', q: 'PCC 1: temperatura de recepción de refrigerados (producto a 4 °C o menos) y de congelados (producto a −15 °C o menos)' },
          { src: 'APPCC-PLA-01', q: 'PCC 2: temperatura de almacenamiento en cámaras de refrigerados y de congelados' },
          { src: 'APPCC-PLA-01', q: 'PCC 3: temperatura de carga y de transporte a tienda' },
          { src: 'APPCC-PLA-01', q: 'El equipo APPCC revisa el plan cada año y ante cualquier cambio de instalaciones, productos o procesos; última revisión: 12/03/2026.' }
        ]
      },
      {
        id: 'A3', ref: 'IFS Log v3 · cap. 5', sec: 'A', topic: 'Auditorías internas', conf: 'alta',
        qEs: '¿Realiza auditorías internas que cubran todos los requisitos de la norma al menos una vez al año? Indique la fecha y el resultado de la última.',
        es: 'Sí. Hacemos al menos una auditoría interna completa al año con el protocolo IFS Logistics, además de inspecciones mensuales de buenas prácticas [1]. La última, del 14/05/2026, detectó 11 desviaciones, ninguna KO ni mayor; 9 están cerradas y 2 en plazo [2].',
        cites: [
          { src: 'PR-CAL-013', q: 'Auditoría interna completa de la plataforma con el protocolo IFS Logistics al menos una vez al año, e inspecciones mensuales de buenas prácticas.' },
          { src: 'SN-CAL', q: 'Auditoría interna IFS Logistics del 14/05/2026: 11 desviaciones (ninguna KO ni mayor); 9 cerradas y 2 en plazo.' }
        ]
      },
      {
        id: 'B1', ref: 'IFS Log v3 · cap. 4', sec: 'B', topic: 'Temperatura de almacenamiento', conf: 'alta',
        qEs: '¿Cómo se vigila y registra la temperatura de cámaras y muelles? ¿Qué ocurre ante una desviación y cuánto tiempo se conservan los registros?',
        es: 'Hay 42 sondas en cámaras y muelles que registran la temperatura cada 5 minutos [1]. Si una cámara supera su límite más de 15 minutos, la alarma llega al jefe de turno y a Mantenimiento de frío, y los registros se conservan 2 años [2]. En septiembre de 2026 hubo 3 alarmas en plataforma, todas resueltas en menos de 30 minutos y sin producto afectado [3].',
        cites: [
          { src: 'SENS-PLA', q: '42 sondas en cámaras y muelles, con registro cada 5 minutos.' },
          { src: 'PR-LOG-003', q: 'si una cámara supera su límite más de 15 minutos, la alarma llega al jefe de turno y a Mantenimiento de frío. Los registros se conservan 2 años.' },
          { src: 'SENS-PLA', q: '3 alarmas de temperatura en plataforma, todas resueltas en menos de 30 minutos y sin producto afectado.' }
        ],
        note: {
          tone: 'warn', icon: 'thermometer', title: 'Alarma de hoy en la tienda T-027',
          text: 'El mural de lácteos MR-3 de la tienda T-027 Huesca Centro está a 9,4 °C (límite 5 °C) desde las 03:55 por un fallo del ventilador del evaporador, con 318 unidades de refrigerados dentro. Es una tienda, fuera del alcance de la auditoría de la plataforma, pero el auditor puede preguntar por la cadena de frío hasta el lineal.',
          outcome: 'alarma', tone_done: 'brand', with: { approved: 'En la alarma: {label}.', any: 'En la alarma se ha rechazado la propuesta del agente.' },
          without: 'La decisión sobre el producto expuesto se toma en la escena de la alarma.',
          go: 'alarma', goLabel: 'Abrir la alarma'
        }
      },
      {
        id: 'B2', ref: 'IFS Log v3 · cap. 4', sec: 'B', topic: 'Control en recepción', conf: 'alta',
        qEs: '¿Se controla la temperatura del producto en la recepción de mercancía refrigerada y congelada? ¿Qué se hace con un palé fuera de límite?',
        es: 'Sí. En cada recepción de refrigerados y congelados se mide con sonda la temperatura de producto; un palé fuera de límite se rechaza o se bloquea en el WMS hasta la decisión de Calidad [1]. En septiembre de 2026 hubo 1.862 recepciones, el 100 % con temperatura de producto registrada, y se rechazaron 4 palés por temperatura [2].',
        cites: [
          { src: 'PR-LOG-003', q: 'Se mide con sonda la temperatura de producto en cada recepción de refrigerados y congelados; un palé fuera de límite se rechaza o se bloquea en el WMS hasta la decisión de Calidad.' },
          { src: 'WMS-REC', q: 'Recepciones de refrigerados y congelados: 1.862; con temperatura de producto registrada: 100 %; palés rechazados por temperatura: 4.' }
        ]
      },
      {
        id: 'B3', ref: 'IFS Log v3 · cap. 4', sec: 'B', topic: 'Transporte a tiendas', conf: 'alta',
        qEs: '¿Cómo se mantiene y se registra la temperatura durante el transporte a las tiendas?',
        es: 'Los camiones a tienda son multitemperatura, con registro continuo de temperatura que se descarga en cada vuelta, y la tienda rechaza la mercancía que llegue fuera de límite [1]. En septiembre de 2026 se hicieron 1.540 vueltas, todas con su registro descargado, y hubo 2 incidencias de temperatura, resueltas con rechazo en tienda [2].',
        cites: [
          { src: 'PR-LOG-003', q: 'Los camiones a tienda son multitemperatura, con registro continuo de temperatura que se descarga en cada vuelta; la tienda rechaza la mercancía que llegue fuera de límite.' },
          { src: 'SENS-TRANS', q: 'Vueltas a tienda: 1.540; registros de temperatura descargados: 1.540; incidencias de temperatura en transporte: 2, resueltas con rechazo en tienda.' }
        ]
      },
      {
        id: 'C1', ref: 'IFS Log v3 · cap. 4', sec: 'C', topic: 'Control de plagas', conf: 'alta',
        qEs: 'Describa el programa de control de plagas: proveedor, frecuencia, puntos de control y análisis de tendencias.',
        es: 'El control de plagas lo presta una empresa externa inscrita en el ROESB, con 9 visitas al año y 148 puntos de control (cebaderos y trampas de insectos voladores) en plano actualizado [1]. Calidad revisa cada trimestre la tendencia de capturas y las recomendaciones del servicio [2]. En la última visita, del 15/09/2026, no hubo actividad de roedores y las capturas de voladores estaban dentro del umbral [3].',
        cites: [
          { src: 'PR-PLA-005', q: 'Servicio externo de control de plagas prestado por una empresa inscrita en el ROESB, con 9 visitas al año y 148 puntos de control (cebaderos y trampas de insectos voladores) en plano actualizado.' },
          { src: 'PR-PLA-005', q: 'Calidad revisa cada trimestre la tendencia de capturas y las recomendaciones del servicio.' },
          { src: 'SN-CAL', q: 'Visita del 15/09/2026: sin actividad de roedores; capturas de insectos voladores dentro del umbral.' }
        ]
      },
      {
        id: 'C2', ref: 'IFS Log v3 · cap. 4', sec: 'C', topic: 'Limpieza y verificación', conf: 'media',
        qEs: 'Describa el plan de limpieza de las instalaciones, cómo se verifica su eficacia y los resultados de la última verificación.',
        es: 'Los muelles y las zonas de preparación se limpian a diario, las cámaras de refrigerados cada semana y las de congelados dos veces al año con desescarche [1]. El encargado de cada zona firma la limpieza realizada y Calidad la comprueba en la inspección mensual de buenas prácticas [2].',
        cites: [
          { src: 'PR-LIM-004', q: 'Muelles y zonas de preparación, a diario; cámaras de refrigerados, cada semana; cámaras de congelados, dos veces al año con desescarche.' },
          { src: 'PR-LIM-004', q: 'El encargado de cada zona firma la limpieza realizada y Calidad la comprueba en la inspección mensual de buenas prácticas.' }
        ],
        gap: 'La certificadora pide los resultados de la última verificación de la limpieza y no están en las fuentes indexadas: los registros de las inspecciones mensuales no se han encontrado.'
      },
      {
        id: 'C3', ref: 'IFS Log v3 · cap. 4', sec: 'C', topic: 'Mercancía dañada y alérgenos', conf: 'alta',
        qEs: '¿Cómo se gestionan la mercancía dañada y los derrames, en particular de productos con alérgenos, para evitar la contaminación cruzada?',
        es: 'El producto dañado se segrega en la zona de no conformes y el derrame se limpia de inmediato [1]. Los derrames de productos con alérgenos se limpian con material exclusivo, identificado en amarillo, para evitar el contacto cruzado con otros productos [2].',
        cites: [
          { src: 'PR-ALM-007', q: 'El producto dañado se segrega en la zona de no conformes y el derrame se limpia de inmediato.' },
          { src: 'PR-ALM-007', q: 'Los derrames de productos con alérgenos se limpian con material exclusivo, identificado en amarillo, para evitar el contacto cruzado con otros productos.' }
        ]
      },
      {
        id: 'D1', ref: 'IFS Log v3 · cap. 4', sec: 'D', topic: 'Trazabilidad y simulacro', conf: 'media',
        qEs: '¿Pueden trazar un lote desde el proveedor hasta cada tienda? Indique el tiempo objetivo y la fecha y el resultado del último simulacro de trazabilidad.',
        es: 'Sí. El WMS registra cada lote por proveedor, palé y tienda de destino; por ejemplo, del lote L26214 de Tomate frito Moncayo 400 g se recibieron 4.800 unidades de Conservas del Jalón, se sirvieron 4.320 a 41 tiendas y quedan 480 en plataforma [1]. Nuestro objetivo es la retirada completa del lineal en 4 h y hacemos al menos un simulacro de trazabilidad y retirada al año [2].',
        cites: [
          { src: 'WMS-L26214', q: 'L26214: 4.800 unidades recibidas de Conservas del Jalón, S.L.; 4.320 servidas a 41 tiendas; 480 en plataforma.' },
          { src: 'PR-CAL-010', q: 'Objetivo: retirada completa del lineal en 4 h. Se hace al menos un simulacro de trazabilidad y retirada al año.' }
        ],
        gap: 'La fecha y el resultado del último simulacro de trazabilidad no están en las fuentes indexadas.',
        gapGo: 'retirada', gapGoLabel: 'Hacer un simulacro ahora', gapOutcome: 'retirada',
        gapOutcomeText: 'En esta sesión ya hay un simulacro del lote L26214: {label}. Añádelo a la respuesta si procede.'
      },
      {
        id: 'D2', ref: 'IFS Log v3 · cap. 5', sec: 'D', topic: 'Gestión de incidentes y retiradas', conf: 'alta',
        qEs: 'Describa el procedimiento de gestión de incidentes, alertas y retiradas de producto, incluida la comunicación a las autoridades. ¿Cuántas alertas gestionó el último año?',
        es: 'Ante una alerta, Calidad bloquea el lote en SAP, el WMS retiene los palés y el TPV bloquea la venta en las tiendas [1]. Se notifica a la AESAN y a la autoridad sanitaria de la comunidad autónoma, y se avisa a los clientes de fidelización que compraron el lote [2]. En 2025 gestionamos 23 alertas sanitarias (RASFF y AESAN), 4 de ellas con retirada de producto, todas cerradas [3].',
        cites: [
          { src: 'PR-CAL-010', q: 'Ante una alerta, Calidad bloquea el lote en SAP, el WMS retiene los palés y el TPV bloquea la venta en las tiendas.' },
          { src: 'PR-CAL-010', q: 'Se notifica a la AESAN y a la autoridad sanitaria de la comunidad autónoma, y se avisa a los clientes de fidelización que compraron el lote.' },
          { src: 'SN-CAL', q: 'Alertas sanitarias gestionadas en 2025: 23 (RASFF y AESAN), 4 con retirada de producto; todas cerradas.' }
        ]
      },
      {
        id: 'D3', ref: 'IFS Log v3 · cap. 5', sec: 'D', topic: 'Reclamaciones', conf: 'alta',
        qEs: '¿Cómo se registran y gestionan las reclamaciones, incluidas las que suponen un riesgo para la seguridad del producto? Indique plazos e indicadores.',
        es: 'Respondemos al consumidor en 48 h; las reclamaciones con riesgo para la salud, como cuerpos extraños o alérgenos, se escalan a Calidad en 2 h y se comunican al fabricante [1]. En 2025 recibimos 1.214 reclamaciones de consumidores y respondimos el 97,6 % en 48 h [2].',
        cites: [
          { src: 'PR-ATC-002', q: 'Respuesta al consumidor en 48 h. Las reclamaciones con riesgo para la salud (cuerpos extraños, alérgenos) se escalan a Calidad en 2 h y se comunican al fabricante.' },
          { src: 'CRM-RCL', q: 'Reclamaciones de consumidores en 2025: 1.214; respondidas en 48 h: 97,6 %.' }
        ],
        note: {
          tone: 'warn', icon: 'mail', title: 'Reclamación abierta por vidrio · lote L26214',
          text: 'Javier Lasheras ha encontrado un fragmento de vidrio en un tarro de Tomate frito Moncayo 400 g del lote [[lot:L26214]], comprado en la T-011 Zaragoza Delicias. Es justo el tipo de reclamación que el procedimiento escala a Calidad en 2 h: el auditor la revisará si sigue abierta en noviembre.',
          outcome: 'reclamacion', tone_done: 'brand', with: { any: 'Estado de la reclamación: {label}.' },
          go: 'reclamacion', goLabel: 'Abrir la reclamación'
        }
      },
      {
        id: 'E1', ref: 'IFS Log v3 · cap. 6', sec: 'E', topic: 'Defensa del producto', conf: 'none',
        qEs: '¿Dispone de una evaluación de amenazas y un plan de defensa del producto (food defense) para la plataforma? ¿Cuándo se revisó por última vez?',
        flag: {
          reason: 'Ninguno de los {doc_count} documentos indexados contiene una evaluación de amenazas ni un plan de defensa del producto.',
          partial: [
            { src: 'MAN-CAL-002', q: 'El acceso a la plataforma es con tarjeta personal; las visitas y los transportistas se registran en portería.', why: 'Es control de accesos; no es una evaluación de amenazas ni un plan de defensa con su revisión.' }
          ],
          missing: ['Evaluación de amenazas de la plataforma', 'Plan de defensa del producto con medidas por zona', 'Fecha de la última revisión y de la última prueba']
        }
      },
      {
        id: 'E2', ref: 'IFS Log v3 · cap. 4', sec: 'E', topic: 'Subcontratistas logísticos', conf: 'none',
        qEs: '¿Cómo se seleccionan, aprueban y evalúan los proveedores de servicios subcontratados (transporte, limpieza, control de plagas, almacenes externos)?',
        flag: {
          reason: 'Solo hay evidencia indirecta: ningún documento indexado describe la homologación ni la evaluación periódica de los subcontratistas logísticos.',
          partial: [
            { src: 'PR-PLA-005', q: 'Servicio externo de control de plagas prestado por una empresa inscrita en el ROESB', why: 'Cubre un solo servicio; faltan los transportistas, la limpieza y los almacenes externos.' }
          ],
          missing: ['Procedimiento de homologación y evaluación de subcontratistas logísticos', 'Lista de subcontratistas aprobados y su última evaluación', 'Requisitos de temperatura e higiene en los contratos de transporte']
        }
      },
      {
        id: 'E3', ref: 'IFS Log v3 · cap. 4', sec: 'E', topic: 'Vidrio y plásticos quebradizos', conf: 'none',
        qEs: '¿Tiene un registro de vidrio y plásticos quebradizos de las instalaciones y un procedimiento ante roturas en zonas con producto?',
        flag: {
          reason: 'El registro de vidrio y plásticos quebradizos y el procedimiento ante roturas no están entre los {doc_count} documentos indexados.',
          context: 'La plataforma mueve tarros de vidrio (por ejemplo, el tomate frito de marca propia) y hay una reclamación abierta por vidrio: el auditor prestará atención a este requisito.',
          partial: [
            { src: 'PR-ALM-007', q: 'El producto dañado se segrega en la zona de no conformes y el derrame se limpia de inmediato.', why: 'Trata la mercancía dañada, no el inventario de vidrio y plásticos de las instalaciones ni el protocolo de rotura.' }
          ],
          missing: ['Inventario de vidrio y plásticos quebradizos por zona', 'Frecuencia de inspección y registros', 'Protocolo ante una rotura en zona con producto']
        }
      }
    ]
  }
});
