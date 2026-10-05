/* Banco Cierzo · consulta de procedimientos con citas. Documentos ficticios, coherentes con HISTORIAS.md. */
agenticPack('banca', {
  procedimientos: {
    section: 'Calidad',
    nav: 'Procedimientos',
    title: 'Preguntar a los procedimientos',
    agent: 'Procedimientos',
    system: 'GRC Archer',
    source: 'GRC Archer · normativa interna vigente',
    indexed_at: '2026-09-29T06:00',
    doc_org: 'Banco Cierzo · Normativa interna',
    ui: {
      page_title: 'Consulta de normativa interna',
      intro_title: 'Pregunta sobre las políticas y procedimientos del Centro de Operaciones',
      intro_text: 'Fraude, atención al cliente, tarjetas, DORA y PBC/FT. Cada frase de la respuesta cita el documento y el apartado de donde sale. Si ningún documento indexado lo recoge, la consulta lo indica y no responde.',
      placeholder: 'Escribe una pregunta sobre la normativa interna',
      context_title: 'Aplicado al Centro de Operaciones hoy',
      permission: 'Operaciones y Cumplimiento · Madrid',
      asker_initials: 'AF',
      asker_role: 'Analista de fraude de turno',
      route_to: 'Cumplimiento Normativo'
    },
    report: { title: 'Consulta de normativa interna', code_prefix: 'CON-NORM', filename: 'consulta-normativa', scope_label: 'Centro', scope: 'Centro de Operaciones · Madrid' },
    presenter: {
      say: [
        'Consulta de la normativa interna del banco: la respuesta sale solo de las políticas y procedimientos vigentes en GRC Archer, y cada frase lleva su cita al documento y al apartado.',
        'Hay cinco documentos indexados: la política de fraude en tarjetas, reclamaciones del SAC, bloqueo y reemisión, notificación de incidentes DORA y el manual de PBC/FT. Aquí son sintéticos; en el piloto, los suyos vigentes y con permisos por área.'
      ],
      say_empty: 'Sirve para que un analista nuevo actúe con criterio a las seis de la mañana, para preparar inspecciones del Banco de España y para contestar a un corresponsal con la referencia exacta.',
      say_answered: 'Al pulsar una cita se abre el documento con el pasaje exacto resaltado. Y la respuesta se cruza con lo que pasa hoy: el pico de fraude del BIN 454812, la reclamación de Lucía Ferrer o el expediente CPP-2609-07.',
      say_none: 'Cuando no hay fuente lo dice y no inventa: ni respuesta ni cita. Si el tema está en un documento que no está indexado, lo nombra (PR-SEG-014) y permite derivar la pregunta a Cumplimiento.',
      next_empty: 'Pulsar «¿Cuándo se activa una regla preventiva de fraude en un BIN?» y después la cita 1 para ver el pasaje resaltado.',
      next_answered: 'Escribir una pregunta sin fuente, por ejemplo «¿Qué tipo de interés tiene la hipoteca fija?», y pulsar «Preguntar».',
      next_done: 'Pasar a la siguiente escena con la flecha derecha.'
    },

    docs: [
      {
        code: 'POL-FRA-003',
        title: 'Política de prevención del fraude en tarjetas',
        short: 'Prevención del fraude en tarjetas',
        type: 'Política',
        version: '6',
        date: '2026-04-21',
        owner: 'Prevención del Fraude',
        summary: 'Tasa de fraude CNP de un BIN por encima del 1 % durante más de 30 min: regla preventiva en Falcon Fraud (máximo 72 h, revisión cada 24 h). Por encima del 2,5 %: episodio crítico. Aprueba el Responsable de Prevención del Fraude.',
        sections: [
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Establecer cómo se detecta, contiene y resuelve el fraude en las tarjetas de débito y crédito emitidas por Banco Cierzo, para proteger a los clientes y cumplir la normativa de servicios de pago.',
            'Aplica a todas las operaciones con tarjeta autorizadas por Banco Cierzo a través de Redsys y de las redes Visa y Mastercard, presenciales y sin tarjeta presente (CNP).'
          ] },
          { id: '2', heading: '2. Definiciones', list: [
            'Tasa de fraude de un BIN: operaciones con puntuación de fraude alta en Falcon Fraud o confirmadas como fraude, sobre el total de operaciones del BIN, en ventanas de 30 min.',
            'Operación sin tarjeta presente (CNP): compra a distancia, por internet o por teléfono.',
            'Regla preventiva: regla de Falcon Fraud que deniega o pide autenticación reforzada para un segmento de operaciones durante un tiempo limitado.',
            'Punto común de compromiso (CPP): comercio o terminal donde se usaron, antes del fraude, un número significativo de las tarjetas defraudadas.'
          ] },
          { id: '3', heading: '3. Responsabilidades', list: [
            'Responsable de Prevención del Fraude: aprueba las reglas preventivas y su retirada, y decide la reemisión masiva de tarjetas.',
            'Analista de fraude de turno: vigila las alertas de Falcon Fraud, propone las reglas y contacta con los clientes afectados.',
            'Responsable de Medios de Pago: ejecuta los bloqueos y las reemisiones según PR-TAR-007.',
            'Riesgo tecnológico: valora si el episodio debe notificarse según PR-DORA-002.'
          ] },
          { id: '4', heading: '4. Umbrales de actuación', text: [
            'Tasa de fraude CNP de un BIN por encima del 1 % durante más de 30 min: el Analista de fraude de turno propone una regla preventiva en Falcon Fraud para el comercio electrónico de riesgo alto del BIN.',
            'Por encima del 2,5 % el episodio es crítico: además de la regla, se avisa de inmediato al Responsable de Prevención del Fraude y a Riesgo tecnológico, y se valora la reemisión de las tarjetas afectadas.',
            'La tasa habitual de un BIN de débito está entre el 0,2 % y el 0,4 %; cualquier valor por encima del doble de su media de 90 días se revisa en el turno.'
          ] },
          { id: '5', heading: '5. Reglas preventivas', text: [
            'Una regla preventiva la propone el Analista de fraude de turno y la aprueba el Responsable de Prevención del Fraude antes de activarla; fuera de horario, el responsable de guardia.',
            'Toda regla preventiva dura como máximo 72 h y se revisa cada 24 h con su tasa de falsos positivos; si deniega más de un 5 % de operaciones legítimas, se ajusta.',
            'Las reglas se limitan al segmento afectado (BIN, canal, país o categoría de comercio): no se bloquea un BIN completo salvo fraude masivo presencial.'
          ] },
          { id: '6', heading: '6. Comunicación con clientes', list: [
            'Cada tarjeta con operaciones sospechosas recibe un SMS y una notificación en la app para que el cliente confirme o rechace las operaciones.',
            'Si el cliente no reconoce una operación, la tarjeta se bloquea y se reemite según PR-TAR-007, y la reclamación sigue PR-SAC-001.',
            'Banco Cierzo nunca pide por SMS ni por teléfono claves, códigos de un solo uso ni el PIN de la tarjeta, y así se recuerda en cada aviso.'
          ] },
          { id: '7', heading: '7. Registros', list: [
            'Alertas, reglas, aprobaciones y resultados: Falcon Fraud.',
            'Expediente del episodio y decisiones: GRC Archer.',
            'Contactos con clientes: Salesforce FSC.'
          ] },
          { id: '8', heading: '8. Referencias', refs: true, list: [
            'Directiva (UE) 2015/2366 (PSD2) y Real Decreto-ley 19/2018, de servicios de pago.',
            'Reglamento Delegado (UE) 2018/389, de autenticación reforzada de clientes.',
            'PCI DSS v4.0.1.'
          ] }
        ]
      },
      {
        code: 'PR-SAC-001',
        title: 'Atención de quejas y reclamaciones de clientes',
        short: 'Reclamaciones de clientes',
        type: 'Procedimiento',
        version: '8',
        date: '2026-02-02',
        owner: 'Servicio de Atención al Cliente',
        summary: 'Acuse de recibo en 24 h; reclamaciones de servicios de pago resueltas en 15 días hábiles; operación no autorizada: devolución provisional antes del fin del día hábil siguiente.',
        sections: [
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Atender y resolver las quejas y reclamaciones de los clientes de Banco Cierzo en los plazos legales y dejar constancia de cada paso. Aplica a todos los canales: oficinas, banca digital, teléfono y correo.'
          ] },
          { id: '2', heading: '2. Plazos', list: [
            'Acuse de recibo al cliente: 24 h desde la recepción.',
            'Reclamaciones sobre servicios de pago (tarjetas, transferencias y recibos): resolución en 15 días hábiles; en situaciones excepcionales, hasta 35 días hábiles, informando al cliente del motivo del retraso.',
            'Resto de quejas y reclamaciones: resolución en un mes.'
          ] },
          { id: '3', heading: '3. Operaciones no autorizadas', text: [
            'Si el cliente no reconoce una operación con tarjeta, se le devuelve provisionalmente su importe antes del fin del día hábil siguiente a la comunicación, salvo que haya motivos razonables para sospechar fraude del propio cliente, que se comunican por escrito al Banco de España.',
            'El cliente responde como máximo de 50 € de las pérdidas anteriores a la comunicación, salvo fraude o negligencia grave por su parte; no responde de nada si la operación no exigió autenticación reforzada.',
            'El cliente dispone de 13 meses desde el cargo para comunicar una operación no autorizada.',
            'La investigación revisa la autenticación usada (3-D Secure, sin contacto o PIN), el dispositivo y la IP, el historial de la tarjeta y si el comercio está vinculado a un punto común de compromiso.'
          ] },
          { id: '4', heading: '4. Contracargo', text: [
            'Si la operación se hizo en un comercio de otra entidad, Medios de Pago inicia el contracargo por la red Visa o Mastercard en el plazo de la red, sin que eso retrase la devolución al cliente.'
          ] },
          { id: '5', heading: '5. Resolución y respuesta', text: [
            'La respuesta es por escrito, motivada y en lenguaje claro; si es desfavorable, informa del derecho a reclamar ante el Servicio de Reclamaciones del Banco de España.',
            'La aprueba el responsable del SAC antes de enviarla.'
          ] },
          { id: '6', heading: '6. Registros', list: [
            'Expediente en Salesforce FSC con las fechas de recepción, acuse, devolución provisional y respuesta.',
            'Informe anual del SAC al Consejo de Administración.'
          ] },
          { id: '7', heading: '7. Referencias', refs: true, list: [
            'Orden ECO/734/2004, sobre los departamentos y servicios de atención al cliente.',
            'Orden ECE/1263/2019, de transparencia e información de los servicios de pago.',
            'Real Decreto-ley 19/2018, artículos 43 a 46.'
          ] }
        ]
      },
      {
        code: 'PR-TAR-007',
        title: 'Bloqueo y reemisión de tarjetas',
        short: 'Bloqueo y reemisión',
        type: 'Procedimiento',
        version: '4',
        date: '2026-03-10',
        owner: 'Medios de Pago',
        summary: 'Bloqueo temporal, definitivo o de canal; reemisión con PAN, caducidad y CVV nuevos. En un punto común de compromiso, vigilancia reforzada el mismo día y reemisión en 10 días hábiles.',
        sections: [
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Bloquear y sustituir las tarjetas comprometidas o defraudadas con el menor impacto para el cliente. Aplica a todas las tarjetas de débito, crédito y prepago de Banco Cierzo.'
          ] },
          { id: '2', heading: '2. Tipos de bloqueo', list: [
            'Bloqueo temporal: lo activa el cliente desde la app o el banco ante una sospecha; se puede deshacer.',
            'Bloqueo definitivo: tarjeta defraudada, robada o comprometida; no se puede deshacer y obliga a reemitir.',
            'Bloqueo de canal: deniega solo el comercio electrónico, el uso en el extranjero o la retirada en cajeros.'
          ] },
          { id: '3', heading: '3. Reemisión individual', text: [
            'La tarjeta nueva tiene distinto número (PAN), fecha de caducidad y CVV; se envía al domicilio del cliente en 5 días hábiles y la tarjeta digital queda disponible en la app el mismo día.',
            'Los recibos y suscripciones domiciliados en la tarjeta se actualizan a través de los servicios de actualización de Visa y Mastercard cuando el comercio está adherido.'
          ] },
          { id: '4', heading: '4. Compromiso masivo (CPP)', text: [
            'Ante un punto común de compromiso:'
          ], list: [
            'Fraude identifica las tarjetas usadas en el comercio o terminal durante la ventana de compromiso (Redsys y Core bancario T24).',
            'Las tarjetas de Banco Cierzo pasan a vigilancia reforzada en Falcon Fraud el mismo día y se reemiten en un plazo máximo de 10 días hábiles, empezando por las que ya tienen operaciones sospechosas.',
            'Las tarjetas de otros emisores se comunican a las redes Visa y Mastercard para que avisen a sus emisores.',
            'Se notifica el compromiso a la entidad adquirente del comercio para que inicie la investigación forense según PR-SEG-014 (Gestión de compromisos de datos de tarjeta PCI DSS).'
          ] },
          { id: '5', heading: '5. Comunicación al cliente', list: [
            'SMS y notificación en la app el día del bloqueo, con el motivo y la fecha prevista de la tarjeta nueva.',
            'La reemisión por compromiso o fraude no tiene coste para el cliente.'
          ] },
          { id: '6', heading: '6. Registros', list: [
            'Bloqueos y reemisiones: Core bancario T24, con el motivo y la referencia del expediente de fraude.',
            'Comunicaciones a las redes: Redsys, con acuse de Visa y Mastercard.'
          ] }
        ]
      },
      {
        code: 'PR-DORA-002',
        title: 'Clasificación y notificación de incidentes TIC graves',
        short: 'Notificación de incidentes (DORA)',
        type: 'Procedimiento',
        version: '2',
        date: '2025-12-18',
        owner: 'Riesgo tecnológico',
        summary: 'Notificación inicial al Banco de España en 4 h desde la clasificación como grave (máximo 24 h desde el conocimiento), informe intermedio en 72 h e informe final en un mes.',
        sections: [
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Clasificar los incidentes relacionados con las TIC y notificar los graves al Banco de España en los plazos del Reglamento (UE) 2022/2554 (DORA).',
            'Aplica también a los incidentes operativos o de seguridad relacionados con los pagos que afecten a los servicios de pago de Banco Cierzo.'
          ] },
          { id: '2', heading: '2. Clasificación', text: [
            'Un incidente es grave cuando afecta a servicios críticos y cumple los criterios del Reglamento Delegado (UE) 2024/1772: clientes y contrapartes afectados, duración, extensión geográfica, pérdida de datos, criticidad de los servicios e impacto económico.',
            'Los incidentes con acceso malicioso no autorizado a los sistemas de red y de información se tratan siempre como candidatos a grave.',
            'El fraude con tarjetas comprometidas en un comercio ajeno no es en sí un incidente TIC del banco; se clasifica si hay indicios de afectación a sistemas propios o de un proveedor TIC.'
          ] },
          { id: '3', heading: '3. Plazos de notificación', list: [
            'Notificación inicial: en 4 h desde la clasificación como grave y nunca más tarde de 24 h desde que se tuvo conocimiento del incidente.',
            'Informe intermedio: en 72 h desde la notificación inicial.',
            'Informe final: en un mes desde el último informe intermedio.'
          ] },
          { id: '4', heading: '4. Responsabilidades', list: [
            'Riesgo tecnológico (DORA) clasifica el incidente y prepara las notificaciones.',
            'El Director de Operaciones aprueba la notificación inicial; fuera de horario, el directivo de guardia.',
            'Cumplimiento Normativo revisa las notificaciones antes del envío.'
          ] },
          { id: '5', heading: '5. Comunicación a clientes', text: [
            'Si el incidente afecta a los intereses financieros de los clientes, se les informa sin demora indebida de las medidas adoptadas para mitigarlo.'
          ] },
          { id: '6', heading: '6. Registros', list: [
            'Registro de incidentes TIC y notificaciones: GRC Archer.',
            'Gestión técnica del incidente: ServiceNow.'
          ] },
          { id: '7', heading: '7. Referencias', refs: true, list: [
            'Reglamento (UE) 2022/2554, sobre la resiliencia operativa digital del sector financiero (DORA).',
            'Reglamento Delegado (UE) 2024/1772, criterios de clasificación de incidentes.',
            'Reglamento Delegado (UE) 2025/301, contenido y plazos de las notificaciones.'
          ] }
        ]
      },
      {
        code: 'MAN-PBC-001',
        title: 'Manual de prevención del blanqueo de capitales y de la financiación del terrorismo',
        short: 'Manual de PBC/FT',
        type: 'Manual',
        version: '11',
        date: '2026-06-15',
        owner: 'Cumplimiento Normativo',
        summary: 'Diligencia debida y reforzada (PEP, corresponsales, países de alto riesgo), examen especial y comunicación al SEPBLAC sin revelarlo al cliente, filtrado de sanciones y conservación 10 años.',
        sections: [
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Recoger las políticas y procedimientos de Banco Cierzo para prevenir el blanqueo de capitales y la financiación del terrorismo, según la Ley 10/2010 y su Reglamento, aprobado por el Real Decreto 304/2014.'
          ] },
          { id: '2', heading: '2. Órganos de control', list: [
            'Órgano de Control Interno (OCI): se reúne cada mes, aprueba las políticas y decide sobre las comunicaciones al SEPBLAC.',
            'Representante ante el SEPBLAC: el Responsable de Cumplimiento Normativo.',
            'Unidad Técnica de PBC/FT: hace el examen especial de las operaciones sospechosas.'
          ] },
          { id: '3', heading: '3. Diligencia debida', list: [
            'Identificación formal con documento fehaciente antes de iniciar la relación de negocio.',
            'Identificación del titular real cuando el cliente es una persona jurídica: quien posee o controla más del 25 % del capital o de los derechos de voto.',
            'Propósito e índole de la relación de negocio, y origen de los fondos cuando el perfil lo requiera.',
            'Seguimiento continuo de la relación y actualización de la documentación según el riesgo: cada año en riesgo alto, cada 3 años en medio y cada 5 años en bajo.'
          ] },
          { id: '4', heading: '4. Diligencia reforzada', list: [
            'Personas con responsabilidad pública (PEP), sus familiares y allegados: aprobación de la relación por Cumplimiento Normativo y por un directivo, y comprobación del origen del patrimonio.',
            'Banca corresponsal transfronteriza: cuestionario del corresponsal, valoración de sus controles de PBC/FT y autorización del OCI; no se mantienen relaciones con bancos pantalla.',
            'Países de alto riesgo identificados por el GAFI o por la Comisión Europea.'
          ] },
          { id: '5', heading: '5. Examen especial y comunicación', text: [
            'Cualquier empleado que detecte un indicio comunica la operación a la Unidad Técnica por el canal interno, sin informar al cliente.',
            'La Unidad Técnica hace el examen especial y, si hay indicio o certeza de blanqueo, el representante lo comunica al SEPBLAC sin dilación.',
            'Está prohibido revelar al cliente o a terceros que se ha comunicado una operación o que se está examinando.'
          ] },
          { id: '6', heading: '6. Sanciones financieras', list: [
            'Todos los clientes y las transferencias se filtran contra las listas de sanciones de la ONU, la UE y la OFAC antes de ejecutar la operación.',
            'Una coincidencia confirmada congela los fondos y se comunica al SEPBLAC y a la Dirección General del Tesoro.'
          ] },
          { id: '7', heading: '7. Conservación, formación y revisión', text: [
            'La documentación de diligencia debida y de las operaciones se conserva 10 años desde el fin de la relación de negocio o desde la operación.',
            'Todos los empleados reciben formación anual en PBC/FT; los de puestos de riesgo, además, formación específica.',
            'Auditoría interna y un experto externo revisan cada año el sistema de PBC/FT.'
          ] }
        ]
      }
    ],

    unindexed: {
      'PR-SEG-014': { title: 'Gestión de compromisos de datos de tarjeta PCI DSS', mentionedIn: { doc: 'PR-TAR-007', sec: '4', quote: 'según PR-SEG-014 (Gestión de compromisos de datos de tarjeta PCI DSS)' } }
    },

    suggested: ['fraude-umbral', 'no-reconocido', 'plazos-sac', 'cpp', 'dora', 'pep'],

    intents: [
      {
        id: 'fraude-umbral', icon: 'alert-triangle', topic: 'Fraude en tarjetas · umbrales', scope: 'all',
        q: '¿Cuándo se activa una regla preventiva de fraude en un BIN?',
        anchors: ['regla preventiva', 'reglas preventivas', 'bin', 'tasa de fraude', 'umbral', 'umbrales', 'falcon'],
        terms: ['activa', 'activar', 'cuándo', 'fraude', 'pico', 'sube', 'supera', 'cnp', 'tarjeta', 'tarjetas', 'crítico'],
        min: 3,
        blocks: [
          { t: 'Cuando la tasa de fraude sin tarjeta presente de un BIN supera el 1 % durante más de 30 min: el Analista de fraude de turno propone una regla para el comercio electrónico de riesgo alto del BIN.', c: [['POL-FRA-003', 4, 'Tasa de fraude CNP de un BIN por encima del 1 % durante más de 30 min: el Analista de fraude de turno propone una regla preventiva en Falcon Fraud para el comercio electrónico de riesgo alto del BIN.']] },
          { t: 'Por encima del 2,5 % el episodio es crítico: aviso inmediato al Responsable de Prevención del Fraude y a Riesgo tecnológico, y se valora reemitir las tarjetas afectadas.', c: [['POL-FRA-003', 4, 'Por encima del 2,5 % el episodio es crítico: además de la regla, se avisa de inmediato al Responsable de Prevención del Fraude y a Riesgo tecnológico, y se valora la reemisión de las tarjetas afectadas.']] },
          { t: 'La regla la aprueba el Responsable de Prevención del Fraude antes de activarla.', c: [['POL-FRA-003', 5, 'Una regla preventiva la propone el Analista de fraude de turno y la aprueba el Responsable de Prevención del Fraude antes de activarla']] },
          { t: 'Los clientes con operaciones sospechosas reciben un SMS y una notificación en la app para confirmarlas o rechazarlas.', c: [['POL-FRA-003', 6, 'Cada tarjeta con operaciones sospechosas recibe un SMS y una notificación en la app para que el cliente confirme o rechace las operaciones.']] }
        ],
        context: {
          systems: ['Falcon Fraud', 'Redsys'],
          text: 'BIN 454812 (Tarjeta Cierzo Débito): tasa de fraude CNP del 2,9 % desde las 02:10, frente al 0,3 % habitual, con 186 operaciones sospechosas por 41.230 € y pico a las 04:55. Supera el 2,5 %: episodio crítico según el apartado 4.',
          outcome: 'alarma',
          go: 'alarma', goLabel: 'Abrir alarma BIN 454812'
        },
        followups: ['reglas-duracion', 'reemision']
      },
      {
        id: 'reglas-duracion', icon: 'clock', topic: 'Fraude en tarjetas · duración de las reglas', scope: 'all',
        q: '¿Cuánto tiempo puede estar activa una regla preventiva?',
        anchors: ['regla preventiva', 'reglas preventivas', 'falsos positivos', '72 h', 'regla'],
        terms: ['tiempo', 'dura', 'duración', 'activa', 'revisa', 'máximo', 'cuánto', 'retirar', 'segmento', 'bin'],
        min: 4,
        blocks: [
          { t: 'Como máximo 72 h, con una revisión cada 24 h de su tasa de falsos positivos; si deniega más de un 5 % de operaciones legítimas, se ajusta.', c: [['POL-FRA-003', 5, 'Toda regla preventiva dura como máximo 72 h y se revisa cada 24 h con su tasa de falsos positivos; si deniega más de un 5 % de operaciones legítimas, se ajusta.']] },
          { t: 'Se limita al segmento afectado: no se bloquea un BIN completo salvo fraude masivo presencial.', c: [['POL-FRA-003', 5, 'no se bloquea un BIN completo salvo fraude masivo presencial']] },
          { t: 'Su retirada también la aprueba el Responsable de Prevención del Fraude.', c: [['POL-FRA-003', 3, 'Responsable de Prevención del Fraude: aprueba las reglas preventivas y su retirada, y decide la reemisión masiva de tarjetas.']] }
        ],
        followups: ['fraude-umbral']
      },
      {
        id: 'no-reconocido', icon: 'euro', topic: 'Operaciones no autorizadas · devolución', scope: 'all',
        q: '¿Qué hacemos si un cliente no reconoce cargos con su tarjeta?',
        anchors: ['no reconoce', 'no reconocidos', 'no autorizada', 'no autorizadas', 'devolución', 'devolver', 'cargos', 'cargo'],
        terms: ['cliente', 'tarjeta', 'hacemos', 'plazo', 'importe', 'provisional', 'investigación', 'reclamación'],
        min: 3,
        blocks: [
          { t: 'Se le devuelve provisionalmente el importe antes del fin del día hábil siguiente a la comunicación, salvo sospecha razonable de fraude del propio cliente, que se comunica por escrito al Banco de España.', c: [['PR-SAC-001', 3, 'se le devuelve provisionalmente su importe antes del fin del día hábil siguiente a la comunicación, salvo que haya motivos razonables para sospechar fraude del propio cliente, que se comunican por escrito al Banco de España']] },
          { t: 'La tarjeta se bloquea y se reemite, y la reclamación sigue PR-SAC-001.', c: [['POL-FRA-003', 6, 'Si el cliente no reconoce una operación, la tarjeta se bloquea y se reemite según PR-TAR-007, y la reclamación sigue PR-SAC-001.']] },
          { t: 'La investigación revisa la autenticación usada, el dispositivo y la IP, el historial de la tarjeta y si el comercio está ligado a un punto común de compromiso.', c: [['PR-SAC-001', 3, 'La investigación revisa la autenticación usada (3-D Secure, sin contacto o PIN), el dispositivo y la IP, el historial de la tarjeta y si el comercio está vinculado a un punto común de compromiso.']] },
          { t: 'Si el comercio es de otra entidad, se inicia el contracargo por la red sin retrasar la devolución al cliente.', c: [['PR-SAC-001', 4, 'Medios de Pago inicia el contracargo por la red Visa o Mastercard en el plazo de la red, sin que eso retrase la devolución al cliente']] }
        ],
        context: {
          systems: ['Salesforce FSC', 'Core bancario T24', 'Falcon Fraud'],
          text: 'Lucía Ferrer Gil no reconoce tres cargos de TIENDAONLINE-ELEC del 26/09/2026 por 612,40 € en total: la devolución provisional se decide antes del fin del día hábil siguiente y la respuesta del SAC vence en 15 días hábiles.',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Abrir reclamación de Lucía Ferrer'
        },
        followups: ['responsabilidad', 'plazos-sac']
      },
      {
        id: 'responsabilidad', icon: 'scale', topic: 'Operaciones no autorizadas · responsabilidad del cliente', scope: 'all',
        q: '¿De cuánto responde el cliente en una operación no autorizada?',
        anchors: ['50 €', 'franquicia', 'negligencia grave', 'responde', 'responsabilidad del cliente', '13 meses', 'roban', 'robo', 'robada', 'paga el cliente', 'pierde'],
        terms: ['cliente', 'operación', 'no autorizada', 'pérdidas', 'cuánto', 'paga', 'plazo', 'comunicar'],
        min: 3,
        blocks: [
          { t: 'Como máximo de 50 € de las pérdidas anteriores a la comunicación, salvo fraude o negligencia grave por su parte.', c: [['PR-SAC-001', 3, 'El cliente responde como máximo de 50 € de las pérdidas anteriores a la comunicación, salvo fraude o negligencia grave por su parte']] },
          { t: 'No responde de nada si la operación no exigió autenticación reforzada.', c: [['PR-SAC-001', 3, 'no responde de nada si la operación no exigió autenticación reforzada']] },
          { t: 'Tiene 13 meses desde el cargo para comunicarla.', c: [['PR-SAC-001', 3, 'El cliente dispone de 13 meses desde el cargo para comunicar una operación no autorizada.']] }
        ],
        followups: ['no-reconocido']
      },
      {
        id: 'plazos-sac', icon: 'mail', topic: 'Reclamaciones · plazos del SAC', scope: 'all',
        q: '¿Qué plazos tenemos para responder a una reclamación de cliente?',
        anchors: ['reclamación', 'reclamaciones', 'queja', 'quejas', 'sac'],
        terms: ['plazo', 'plazos', 'responder', 'contestar', 'acuse', 'días', 'hábiles', 'cuándo', 'tenemos', 'resolver'],
        min: 3,
        blocks: [
          { list: [
            { t: 'Acuse de recibo en 24 h.', c: [['PR-SAC-001', 2, 'Acuse de recibo al cliente: 24 h desde la recepción.']] },
            { t: 'Servicios de pago: resolución en 15 días hábiles; excepcionalmente, hasta 35, explicando al cliente el motivo.', c: [['PR-SAC-001', 2, 'resolución en 15 días hábiles; en situaciones excepcionales, hasta 35 días hábiles, informando al cliente del motivo del retraso']] },
            { t: 'Resto de reclamaciones: un mes.', c: [['PR-SAC-001', 2, 'Resto de quejas y reclamaciones: resolución en un mes.']] }
          ] },
          { t: 'La respuesta es escrita y motivada; si es desfavorable, informa del derecho a acudir al Servicio de Reclamaciones del Banco de España. La aprueba el responsable del SAC.', c: [['PR-SAC-001', 5, 'si es desfavorable, informa del derecho a reclamar ante el Servicio de Reclamaciones del Banco de España'], ['PR-SAC-001', 5, 'La aprueba el responsable del SAC antes de enviarla.']] }
        ],
        context: {
          systems: ['Salesforce FSC'],
          text: 'Reclamación de Lucía Ferrer Gil (tres cargos de TIENDAONLINE-ELEC, 612,40 €): servicio de pago, plazo de 15 días hábiles.',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Abrir reclamación de Lucía Ferrer'
        },
        followups: ['no-reconocido', 'responsabilidad']
      },
      {
        id: 'reemision', icon: 'repeat', topic: 'Tarjetas · reemisión', scope: 'all',
        q: '¿Cómo se reemite una tarjeta defraudada?',
        anchors: ['reemisión', 'reemite', 'reemitir', 'tarjeta nueva', 'pan', 'cvv'],
        terms: ['tarjeta', 'defraudada', 'comprometida', 'cómo', 'plazo', 'días', 'coste', 'recibos'],
        min: 2,
        blocks: [
          { t: 'La tarjeta defraudada se bloquea de forma definitiva, lo que obliga a reemitir.', c: [['PR-TAR-007', 2, 'Bloqueo definitivo: tarjeta defraudada, robada o comprometida; no se puede deshacer y obliga a reemitir.']] },
          { t: 'La nueva tiene otro PAN, caducidad y CVV; llega al domicilio en 5 días hábiles y la digital está en la app el mismo día.', c: [['PR-TAR-007', 3, 'La tarjeta nueva tiene distinto número (PAN), fecha de caducidad y CVV; se envía al domicilio del cliente en 5 días hábiles y la tarjeta digital queda disponible en la app el mismo día.']] },
          { t: 'Los recibos domiciliados se actualizan por los servicios de Visa y Mastercard si el comercio está adherido.', c: [['PR-TAR-007', 3, 'Los recibos y suscripciones domiciliados en la tarjeta se actualizan a través de los servicios de actualización de Visa y Mastercard cuando el comercio está adherido.']] },
          { t: 'No tiene coste para el cliente.', c: [['PR-TAR-007', 5, 'La reemisión por compromiso o fraude no tiene coste para el cliente.']] }
        ],
        context: {
          systems: ['Core bancario T24', 'Falcon Fraud'],
          text: 'En el pico del BIN 454812 la propuesta del agente de Medios de pago es reemitir 214 tarjetas afectadas.',
          outcome: 'alarma',
          go: 'alarma', goLabel: 'Abrir alarma BIN 454812'
        },
        followups: ['tipos-bloqueo', 'cpp']
      },
      {
        id: 'tipos-bloqueo', icon: 'lock', topic: 'Tarjetas · tipos de bloqueo', scope: 'all',
        q: '¿Qué tipos de bloqueo de tarjeta hay?',
        anchors: ['tipos de bloqueo', 'bloqueo temporal', 'bloqueo definitivo', 'bloqueo de canal', 'bloqueo'],
        terms: ['tipos', 'tarjeta', 'temporal', 'definitivo', 'canal', 'deshacer', 'cajeros', 'extranjero'],
        min: 3,
        blocks: [
          { list: [
            { t: 'Temporal: lo activa el cliente desde la app o el banco ante una sospecha, y se puede deshacer.', c: [['PR-TAR-007', 2, 'Bloqueo temporal: lo activa el cliente desde la app o el banco ante una sospecha; se puede deshacer.']] },
            { t: 'Definitivo: tarjeta defraudada, robada o comprometida; obliga a reemitir.', c: [['PR-TAR-007', 2, 'Bloqueo definitivo: tarjeta defraudada, robada o comprometida; no se puede deshacer y obliga a reemitir.']] },
            { t: 'De canal: deniega solo el comercio electrónico, el extranjero o los cajeros.', c: [['PR-TAR-007', 2, 'Bloqueo de canal: deniega solo el comercio electrónico, el uso en el extranjero o la retirada en cajeros.']] }
          ] }
        ],
        followups: ['reemision']
      },
      {
        id: 'cpp', icon: 'map-pin', topic: 'Tarjetas · punto común de compromiso', scope: 'all',
        q: '¿Qué se hace ante un punto común de compromiso?',
        anchors: ['punto común de compromiso', 'cpp', 'compromiso', 'skimming', 'tpv comprometido'],
        terms: ['tarjetas', 'comercio', 'terminal', 'reemitir', 'otros emisores', 'redes', 'hace', 'plazo'],
        min: 2,
        blocks: [
          { t: 'Fraude identifica las tarjetas usadas en el comercio o terminal durante la ventana de compromiso.', c: [['PR-TAR-007', 4, 'Fraude identifica las tarjetas usadas en el comercio o terminal durante la ventana de compromiso (Redsys y Core bancario T24).']] },
          { t: 'Las de Banco Cierzo pasan a vigilancia reforzada el mismo día y se reemiten en 10 días hábiles como máximo, empezando por las que ya tienen operaciones sospechosas.', c: [['PR-TAR-007', 4, 'Las tarjetas de Banco Cierzo pasan a vigilancia reforzada en Falcon Fraud el mismo día y se reemiten en un plazo máximo de 10 días hábiles, empezando por las que ya tienen operaciones sospechosas.']] },
          { t: 'Las de otros emisores se comunican a Visa y Mastercard para que avisen a sus emisores.', c: [['PR-TAR-007', 4, 'Las tarjetas de otros emisores se comunican a las redes Visa y Mastercard para que avisen a sus emisores.']] },
          { t: 'Se avisa a la entidad adquirente del comercio para que inicie la investigación forense.', c: [['PR-TAR-007', 4, 'Se notifica el compromiso a la entidad adquirente del comercio para que inicie la investigación forense']] },
          { t: 'Un compromiso en un comercio ajeno no es por sí solo un incidente TIC del banco a efectos de DORA.', c: [['PR-DORA-002', 2, 'El fraude con tarjetas comprometidas en un comercio ajeno no es en sí un incidente TIC del banco']] }
        ],
        context: {
          systems: ['Redsys', 'Core bancario T24', 'Falcon Fraud'],
          text: 'Expediente CPP-2609-07: TPV 3 de Gasolinera Ronda Norte (comercio 334512987), del 10 al 22/09/2026. 1.284 tarjetas usadas allí: 1.107 de Banco Cierzo y 177 de otros emisores, que se avisan por Visa y Mastercard.',
          lot: 'CPP-2609-07',
          go: 'retirada', goLabel: 'Abrir expediente CPP-2609-07'
        },
        followups: ['reemision', 'dora']
      },
      {
        id: 'dora', icon: 'server', topic: 'DORA · notificación de incidentes', scope: 'all',
        q: '¿En qué plazo hay que notificar un incidente grave según DORA?',
        anchors: ['dora', 'incidente grave', 'incidentes graves', 'notificación inicial', 'incidente tic', 'notificar'],
        terms: ['plazo', 'plazos', 'horas', 'banco de españa', 'informe', 'intermedio', 'final', 'notificar', 'grave'],
        min: 2,
        blocks: [
          { list: [
            { t: 'Notificación inicial en 4 h desde que se clasifica como grave, y nunca más tarde de 24 h desde que se conoció.', c: [['PR-DORA-002', 3, 'Notificación inicial: en 4 h desde la clasificación como grave y nunca más tarde de 24 h desde que se tuvo conocimiento del incidente.']] },
            { t: 'Informe intermedio en 72 h desde la notificación inicial.', c: [['PR-DORA-002', 3, 'Informe intermedio: en 72 h desde la notificación inicial.']] },
            { t: 'Informe final en un mes desde el último informe intermedio.', c: [['PR-DORA-002', 3, 'Informe final: en un mes desde el último informe intermedio.']] }
          ] },
          { t: 'Clasifica Riesgo tecnológico, aprueba la notificación inicial el Director de Operaciones y Cumplimiento Normativo la revisa antes del envío.', c: [['PR-DORA-002', 4, 'Riesgo tecnológico (DORA) clasifica el incidente y prepara las notificaciones.'], ['PR-DORA-002', 4, 'El Director de Operaciones aprueba la notificación inicial'], ['PR-DORA-002', 4, 'Cumplimiento Normativo revisa las notificaciones antes del envío.']] }
        ],
        followups: ['dora-grave', 'cpp']
      },
      {
        id: 'dora-grave', icon: 'shield', topic: 'DORA · clasificación', scope: 'all',
        q: '¿Cuándo es grave un incidente TIC?',
        anchors: ['grave', 'clasificación', 'clasifica', 'incidente tic', 'criterios'],
        terms: ['incidente', 'tic', 'cuándo', 'dora', 'criterios', 'clientes', 'duración', 'datos'],
        min: 4,
        blocks: [
          { t: 'Cuando afecta a servicios críticos y cumple los criterios del Reglamento Delegado (UE) 2024/1772: clientes afectados, duración, extensión geográfica, pérdida de datos, criticidad e impacto económico.', c: [['PR-DORA-002', 2, 'Un incidente es grave cuando afecta a servicios críticos y cumple los criterios del Reglamento Delegado (UE) 2024/1772']] },
          { t: 'Un acceso malicioso no autorizado a los sistemas siempre es candidato a grave.', c: [['PR-DORA-002', 2, 'Los incidentes con acceso malicioso no autorizado a los sistemas de red y de información se tratan siempre como candidatos a grave.']] },
          { t: 'Si afecta a los intereses financieros de los clientes, se les informa sin demora indebida.', c: [['PR-DORA-002', 5, 'Si el incidente afecta a los intereses financieros de los clientes, se les informa sin demora indebida']] }
        ],
        followups: ['dora']
      },
      {
        id: 'pep', icon: 'user-check', topic: 'PBC/FT · diligencia reforzada', scope: 'all',
        q: '¿Qué diligencia se aplica a una persona con responsabilidad pública?',
        anchors: ['pep', 'peps', 'responsabilidad pública', 'diligencia reforzada', 'familiares y allegados'],
        terms: ['diligencia', 'aplica', 'cliente', 'autorización', 'patrimonio', 'directivo', 'alta'],
        min: 2,
        blocks: [
          { t: 'Diligencia reforzada: Cumplimiento Normativo y un directivo aprueban la relación y se comprueba el origen del patrimonio; también para sus familiares y allegados.', c: [['MAN-PBC-001', 4, 'Personas con responsabilidad pública (PEP), sus familiares y allegados: aprobación de la relación por Cumplimiento Normativo y por un directivo, y comprobación del origen del patrimonio.']] },
          { t: 'Además de la diligencia normal: identificación formal, titular real, propósito de la relación y seguimiento continuo.', c: [['MAN-PBC-001', 3, 'Identificación formal con documento fehaciente antes de iniciar la relación de negocio.'], ['MAN-PBC-001', 3, 'Seguimiento continuo de la relación y actualización de la documentación según el riesgo']] }
        ],
        followups: ['corresponsal', 'examen']
      },
      {
        id: 'corresponsal', icon: 'globe', topic: 'PBC/FT · banca corresponsal', scope: 'all',
        q: '¿Qué se exige para abrir una relación de banca corresponsal?',
        anchors: ['corresponsal', 'corresponsales', 'banca corresponsal', 'banco pantalla', 'cbddq', 'wolfsberg'],
        terms: ['exige', 'abrir', 'relación', 'cuestionario', 'autoriza', 'controles'],
        min: 2,
        blocks: [
          { t: 'Cuestionario del corresponsal, valoración de sus controles de PBC/FT y autorización del Órgano de Control Interno; nunca con bancos pantalla.', c: [['MAN-PBC-001', 4, 'Banca corresponsal transfronteriza: cuestionario del corresponsal, valoración de sus controles de PBC/FT y autorización del OCI; no se mantienen relaciones con bancos pantalla.']] },
          { t: 'Auditoría interna y un experto externo revisan cada año el sistema de PBC/FT.', c: [['MAN-PBC-001', 7, 'Auditoría interna y un experto externo revisan cada año el sistema de PBC/FT.']] }
        ],
        context: {
          systems: ['GRC Archer'],
          text: 'Nordbank AG ha enviado el cuestionario Wolfsberg CBDDQ v1.4 como corresponsal: sus respuestas sobre el programa de PBC/FT salen de este manual.',
          go: 'cuestionario', goLabel: 'Abrir cuestionario de Nordbank'
        },
        followups: ['pep', 'sanciones']
      },
      {
        id: 'examen', icon: 'search', topic: 'PBC/FT · operaciones sospechosas', scope: 'all',
        q: '¿Qué hago si detecto una operación sospechosa de blanqueo?',
        anchors: ['blanqueo', 'sospechosa', 'sospechosas', 'sepblac', 'examen especial', 'indicio'],
        terms: ['operación', 'detecto', 'comunicar', 'cliente', 'avisar', 'decir', 'hago'],
        min: 2,
        blocks: [
          { t: 'Comunicarla a la Unidad Técnica por el canal interno, sin informar al cliente.', c: [['MAN-PBC-001', 5, 'Cualquier empleado que detecte un indicio comunica la operación a la Unidad Técnica por el canal interno, sin informar al cliente.']] },
          { t: 'La Unidad Técnica hace el examen especial y, si hay indicio o certeza, el representante lo comunica al SEPBLAC sin dilación.', c: [['MAN-PBC-001', 5, 'La Unidad Técnica hace el examen especial y, si hay indicio o certeza de blanqueo, el representante lo comunica al SEPBLAC sin dilación.']] },
          { t: 'Está prohibido revelar al cliente o a terceros que se ha comunicado o se está examinando.', c: [['MAN-PBC-001', 5, 'Está prohibido revelar al cliente o a terceros que se ha comunicado una operación o que se está examinando.']] }
        ],
        followups: ['conservacion', 'sanciones']
      },
      {
        id: 'sanciones', icon: 'shield-check', topic: 'PBC/FT · sanciones financieras', scope: 'all',
        q: '¿Contra qué listas de sanciones se filtran los clientes?',
        anchors: ['sanciones', 'listas', 'ofac', 'onu', 'congelación', 'congela'],
        terms: ['filtran', 'filtrar', 'clientes', 'transferencias', 'coincidencia', 'listas'],
        min: 2,
        blocks: [
          { t: 'Contra las listas de la ONU, la UE y la OFAC, antes de ejecutar cada operación; también las transferencias.', c: [['MAN-PBC-001', 6, 'Todos los clientes y las transferencias se filtran contra las listas de sanciones de la ONU, la UE y la OFAC antes de ejecutar la operación.']] },
          { t: 'Una coincidencia confirmada congela los fondos y se comunica al SEPBLAC y a la Dirección General del Tesoro.', c: [['MAN-PBC-001', 6, 'Una coincidencia confirmada congela los fondos y se comunica al SEPBLAC y a la Dirección General del Tesoro.']] }
        ],
        followups: ['examen']
      },
      {
        id: 'conservacion', icon: 'history', topic: 'PBC/FT · conservación documental', scope: 'all',
        q: '¿Cuánto tiempo se conserva la documentación de diligencia debida?',
        anchors: ['conserva', 'conservación', 'conservar', 'diligencia debida', 'documentación'],
        terms: ['tiempo', 'años', 'cuánto', 'documentos', 'guardar', 'kyc'],
        min: 3,
        blocks: [
          { t: '10 años desde el fin de la relación de negocio o desde la operación.', c: [['MAN-PBC-001', 7, 'La documentación de diligencia debida y de las operaciones se conserva 10 años desde el fin de la relación de negocio o desde la operación.']] },
          { t: 'Mientras dura la relación, la documentación se actualiza cada año en riesgo alto, cada 3 años en medio y cada 5 en bajo.', c: [['MAN-PBC-001', 3, 'cada año en riesgo alto, cada 3 años en medio y cada 5 años en bajo']] }
        ],
        followups: ['pep']
      },
      {
        id: 'pci', icon: 'key', topic: 'Compromiso de datos de tarjeta · forense', scope: 'all', kind: 'partial',
        q: '¿Quién hace la investigación forense de un comercio comprometido?',
        anchors: ['forense', 'investigación forense', 'pci', 'pci dss', 'adquirente', 'pfi'],
        terms: ['investigación', 'comercio', 'comprometido', 'quién', 'hace'],
        min: 2,
        blocks: [
          { t: 'Se notifica el compromiso a la entidad adquirente del comercio para que inicie la investigación forense según PR-SEG-014.', c: [['PR-TAR-007', 4, 'Se notifica el compromiso a la entidad adquirente del comercio para que inicie la investigación forense según PR-SEG-014']] }
        ],
        note: 'PR-SEG-014 (Gestión de compromisos de datos de tarjeta PCI DSS) no está entre los documentos indexados: los plazos y el alcance de la investigación forense no se pueden detallar desde esta consulta.',
        followups: ['cpp']
      }
    ],

    gaps: [
      { id: 'hipoteca', topic: 'Productos de activo', anchors: ['hipoteca', 'hipotecas', 'préstamo', 'préstamos', 'tipo de interés', 'euríbor', 'tae', 'tin'],
        reason: 'Las condiciones de préstamos e hipotecas no forman parte de la normativa interna indexada para el Centro de Operaciones.' },
      { id: 'comisiones', topic: 'Tarifas y comisiones', anchors: ['comisión', 'comisiones', 'tarifa', 'tarifas', 'precio', 'cuesta', 'coste'],
        reason: 'El folleto de tarifas y comisiones no está entre los documentos indexados.' },
      { id: 'inversion', topic: 'Servicios de inversión', anchors: ['mifid', 'fondos de inversión', 'test de idoneidad', 'conveniencia', 'acciones', 'bolsa'],
        reason: 'Ningún documento indexado trata los servicios de inversión ni los test MiFID.' },
      { id: 'forense', topic: 'Investigación forense PCI DSS', anchors: ['plazo forense', 'informe forense', 'pr-seg-014', 'pfi'],
        reason: 'Ningún documento indexado describe la investigación forense de un compromiso de datos de tarjeta.', related: 'PR-SEG-014' },
      { id: 'cripto', topic: 'Criptoactivos', anchors: ['cripto', 'criptoactivos', 'criptomonedas', 'bitcoin', 'mica'],
        reason: 'Ningún documento indexado trata los criptoactivos.' },
      { id: 'personal', topic: 'Condiciones laborales', anchors: ['vacaciones', 'nómina', 'salario', 'convenio', 'teletrabajo', 'horario'],
        reason: 'Las condiciones laborales no forman parte de la normativa interna indexada.' }
    ]
  }
});

/* Resumen canónico por código (CN_DATA.procedures): se completa sin pisar lo que ya hayan puesto otros ficheros. */
(function (id) {
  'use strict';
  const pack = window.AGENTIC_INDUSTRIES[id];
  const procs = pack.procedures = pack.procedures || {};
  pack.procedimientos.docs.forEach((d) => {
    const cur = procs[d.code] = procs[d.code] || {};
    if (!cur.title) cur.title = d.title;
    if (!cur.summary) cur.summary = d.summary;
    if (!cur.version) cur.version = d.version;
  });
})('banca');
