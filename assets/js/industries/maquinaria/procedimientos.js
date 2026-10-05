/* Hidromec Ebro · consulta de procedimientos con citas. Documentos ficticios, coherentes con HISTORIAS.md. */
agenticPack('maquinaria', {
  procedimientos: {
    section: 'Calidad',
    nav: 'Procedimientos',
    title: 'Preguntar a los procedimientos',
    agent: 'Procedimientos',
    system: 'PLM Windchill',
    source: 'PLM Windchill · documentos controlados del sistema de gestión',
    indexed_at: '2026-09-29T06:00',
    doc_org: 'Hidromec Ebro · Sistema de gestión',
    ui: {
      page_title: 'Consulta de procedimientos de planta',
      intro_title: 'Pregunta sobre los procedimientos de la planta de Zaragoza',
      intro_text: 'Mantenimiento, calidad, seguridad y posventa. Cada frase de la respuesta cita el documento y el apartado de donde sale. Si ningún documento indexado lo recoge, la consulta lo indica y no responde.',
      placeholder: 'Escribe una pregunta sobre los procedimientos de la planta',
      context_title: 'Aplicado a la planta de Zaragoza hoy',
      permission: 'Calidad y Mantenimiento · PLAZA',
      asker_initials: 'TC',
      asker_role: 'Técnico de Calidad de turno',
      route_to: 'Responsable de Calidad'
    },
    report: { title: 'Consulta de procedimientos de planta', code_prefix: 'CON-PROC', filename: 'consulta-procedimientos', scope_label: 'Planta', scope: 'Zaragoza (PLAZA)' },
    presenter: {
      say: [
        'Consulta de los procedimientos de la planta: la respuesta sale solo de los documentos controlados en PLM Windchill, y cada frase lleva su cita al documento y al apartado.',
        'Hay seis documentos indexados: vigilancia de vibraciones, cambio de husillo, no conformidades, metodología 8D, consignación LOTO y campañas de campo. Aquí son sintéticos; en el piloto, los suyos vigentes.'
      ],
      say_empty: 'Sirve en auditorías de cliente e ISO 9001, para formar a operadores y técnicos nuevos y para contestar a un cliente con la referencia exacta.',
      say_answered: 'Al pulsar una cita se abre el documento con el pasaje exacto resaltado. Y la respuesta se cruza con lo que pasa hoy en planta: la vibración de MC-04, la reclamación de la PH-250 o la campaña de las juntas JNT-2607-031.',
      say_none: 'Cuando no hay fuente lo dice y no inventa: ni respuesta ni cita. Si el tema está en un documento que no está indexado, lo nombra (PR-COM-002) y permite derivar la pregunta a Calidad.',
      next_empty: 'Pulsar «¿Qué hay que hacer si la vibración de un husillo entra en zona D?» y después la cita 1 para ver el pasaje resaltado.',
      next_answered: 'Escribir una pregunta sin fuente, por ejemplo «¿Cada cuánto se calibran los pies de rey?», y pulsar «Preguntar».',
      next_done: 'Pasar a la siguiente escena con la flecha derecha.'
    },

    docs: [
      {
        code: 'PR-MAN-011',
        title: 'Vigilancia de vibraciones en máquinas-herramienta',
        short: 'Vigilancia de vibraciones',
        type: 'Procedimiento',
        version: '3',
        date: '2026-02-16',
        owner: 'Mantenimiento',
        summary: 'Vibración del husillo en zona D (más de 4,5 mm/s RMS, ISO 10816-3) durante más de 30 min (avería crítica desde 7,1 mm/s): parada de la máquina, OT en GMAO Maximo, bloqueo en SAP QM de las piezas mecanizadas en la ventana de exposición y metrología al 100 %.',
        sections: [
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Detectar a tiempo el deterioro de husillos y rodamientos de las máquinas-herramienta de la planta de Zaragoza mediante la vigilancia continua de vibraciones, para evitar averías y piezas fuera de tolerancia.',
            'Aplica a los centros de mecanizado MC-01 a MC-06 y a los tornos TR-01 a TR-03, todos con sensores de vibración en el cabezal conectados a IIoT Vibración.'
          ] },
          { id: '2', heading: '2. Definiciones', list: [
            'Velocidad de vibración: valor eficaz (RMS) en mm/s, en la banda de 10 a 1.000 Hz, medido en el alojamiento del rodamiento delantero del husillo.',
            'Zonas de severidad según ISO 10816-3 (máquinas del grupo 2, montaje rígido): zona A hasta 1,4 mm/s; zona B hasta 2,8 mm/s; zona C hasta 4,5 mm/s; zona D por encima de 4,5 mm/s.',
            'Línea base: valor medio de la máquina en las cuatro semanas posteriores a su última revisión de husillo.',
            'Ventana de exposición: periodo desde que la vibración supera 4,5 mm/s hasta que la máquina se para.'
          ] },
          { id: '3', heading: '3. Responsabilidades', list: [
            'Jefe de mantenimiento: valora la alarma, decide la parada y aprueba la orden de trabajo en GMAO Maximo.',
            'Técnico de Calidad de turno: bloquea en SAP QM las piezas mecanizadas en la ventana de exposición y lanza su control metrológico.',
            'Jefe de producción: reasigna las órdenes de fabricación de la máquina parada a otra con capacidad y programa compatible.',
            'Operador de la máquina: no rearma la máquina tras una parada por vibración sin autorización de Mantenimiento.'
          ] },
          { id: '4', heading: '4. Criterios de actuación', text: [
            'Zona C (de 2,8 a 4,5 mm/s) mantenida durante más de 2 h: aviso a Mantenimiento por Microsoft Teams y revisión en el siguiente cambio de turno; la máquina sigue produciendo.',
            'Zona D (por encima de 4,5 mm/s) durante más de 30 min seguidos: la máquina se para en cuanto termine la pieza en curso y no se rearma hasta la intervención de Mantenimiento.',
            'Un pico por encima de 7,1 mm/s es avería crítica y obliga a parar de inmediato, sin terminar la pieza en curso.',
            'Un aumento de más del 50 % sobre la línea base en una semana, aunque no salga de la zona B, se trata como zona C.'
          ] },
          { id: '5', heading: '5. Producto mecanizado en zona D', text: [
            'Todas las piezas mecanizadas en la ventana de exposición se bloquean en SAP QM como no conformidad potencial según PR-CAL-004, aunque la inspección en proceso haya sido correcta.',
            'Esas piezas pasan control metrológico al 100 % en la máquina de medir por coordenadas (MMC): cotas funcionales, planitud de las caras de junta y rugosidad de los alojamientos.',
            'Las piezas de seguridad (culatas, vástagos y bloques de válvulas) solo se liberan con informe MMC conforme firmado por Calidad.'
          ] },
          { id: '6', heading: '6. Registro y comunicación', list: [
            'IIoT Vibración registra una lectura por minuto y abre la alarma con inicio, pico, fin y minutos en zona D.',
            'La orden de trabajo en GMAO Maximo recoge la causa, las piezas sustituidas y la vibración tras la intervención.',
            'El bloqueo de piezas se registra en SAP QM con la referencia de la alarma y la orden de fabricación.',
            'Las alarmas repetidas en una misma máquina se analizan en la revisión mensual de fiabilidad.'
          ] },
          { id: '7', heading: '7. Referencias', refs: true, list: [
            'ISO 10816-3:2009 · Vibración mecánica. Evaluación de la vibración de una máquina mediante medidas en partes no rotativas.',
            'IT-MEC-021 · Cambio de husillo y rodamientos en centros de mecanizado.',
            'PR-CAL-004 · Gestión de no conformidades y bloqueo de producto.'
          ] }
        ]
      },
      {
        code: 'IT-MEC-021',
        title: 'Cambio de husillo y rodamientos en centros de mecanizado',
        short: 'Cambio de husillo',
        type: 'Instrucción técnica',
        version: '2',
        date: '2025-11-04',
        owner: 'Mantenimiento',
        summary: 'Diagnóstico, sustitución del husillo o de sus rodamientos en los DMU 65, rodaje escalonado y verificación (excentricidad ≤ 2 µm, vibración en vacío < 1,8 mm/s, pieza patrón conforme en MMC).',
        sections: [
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Describir la sustitución del husillo electromecánico (electromandrino) o de sus rodamientos en los centros de mecanizado de cinco ejes DMG Mori DMU 65 (MC-03, MC-04 y MC-05) y la verificación antes de volver a producir.'
          ] },
          { id: '2', heading: '2. Seguridad previa', text: [
            'La máquina se consigna según PR-SEG-002 antes de cualquier desmontaje: energía eléctrica, neumática, hidráulica del amarre y circuito de refrigeración del husillo.',
            'El husillo pesa 68 kg: se manipula con el útil de elevación UT-21 y la grúa pórtico, nunca a mano.'
          ] },
          { id: '3', heading: '3. Diagnóstico', list: [
            'Espectro de vibración en IIoT Vibración: frecuencias de defecto de pista exterior (BPFO) e interior (BPFI) del rodamiento delantero.',
            'Temperatura del husillo a 12.000 rpm en vacío: más de 15 °C por encima de la línea base indica precarga o lubricación defectuosa.',
            'Juego radial en punta de husillo con comparador: más de 3 µm obliga a sustituir.',
            'Si el diagnóstico apunta solo a rodamientos y el husillo tiene menos de 20.000 h, se cambian los rodamientos; si no, se sustituye el husillo completo por uno de intercambio.'
          ] },
          { id: '4', heading: '4. Sustitución', list: [
            'Desmontar el husillo siguiendo la secuencia del fabricante y guardar las piezas de ajuste identificadas.',
            'Montar el husillo de intercambio o los rodamientos nuevos de la misma referencia y clase de precisión (P4).',
            'Apretar los tornillos de la brida a 35 Nm en cruz, en dos pasadas.',
            'Registrar en la orden de trabajo los números de serie del husillo retirado y del montado.'
          ] },
          { id: '5', heading: '5. Rodaje y verificación', text: [
            'Rodaje escalonado de 30 min: 3.000, 6.000, 9.000 y 12.000 rpm, con parada si la temperatura sube más de 2 °C por minuto.',
            'Verificación final: excentricidad en punta de husillo de 2 µm como máximo y vibración en vacío a 12.000 rpm por debajo de 1,8 mm/s.',
            'Se mecaniza una pieza patrón que se mide en la MMC; la máquina solo vuelve a producción con la pieza patrón conforme y la firma del Jefe de mantenimiento en la orden de trabajo.'
          ] },
          { id: '6', heading: '6. Registros', list: [
            'Orden de trabajo en GMAO Maximo con diagnóstico, piezas, pares de apriete y resultados de verificación.',
            'Nueva línea base de vibración en IIoT Vibración, calculada en las cuatro semanas siguientes.',
            'Informe MMC de la pieza patrón en SAP QM.'
          ] },
          { id: '7', heading: '7. Historial de revisiones', text: [
            'Rev. 2 (04/11/2025): se añade la pieza patrón medida en MMC como condición para volver a producción.'
          ] }
        ]
      },
      {
        code: 'PR-CAL-004',
        title: 'Gestión de no conformidades y bloqueo de producto',
        short: 'No conformidades y bloqueo',
        type: 'Procedimiento',
        version: '7',
        date: '2026-01-12',
        owner: 'Calidad',
        summary: 'Toda no conformidad se registra en SAP QM y el producto queda bloqueado; aprueba el bloqueo el Técnico de Calidad de turno y solo el Responsable de Calidad libera. Sin concesiones en no conformidades críticas.',
        sections: [
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Asegurar que ninguna pieza, conjunto o equipo con una desviación sale de la planta de Zaragoza sin una decisión documentada de Calidad. Aplica a materias primas, componentes comprados, piezas mecanizadas, conjuntos montados y equipos terminados.'
          ] },
          { id: '2', heading: '2. Responsabilidades', list: [
            'Cualquier responsable de sección puede proponer un bloqueo al detectar una desviación.',
            'El Técnico de Calidad de turno aprueba el bloqueo y define su alcance (piezas, lotes, números de serie y ubicaciones).',
            'Solo el Responsable de Calidad puede liberar producto bloqueado o aprobar una concesión.'
          ] },
          { id: '3', heading: '3. Registro y bloqueo', text: [
            'Toda no conformidad se registra en SAP QM como aviso de calidad, con el material, el lote o número de serie, la cantidad, la descripción del defecto y la referencia de origen (inspección, alarma de máquina, reclamación o proveedor).',
            'El producto bloqueado se identifica con etiqueta roja y se traslada a la zona de cuarentena; SAP no permite consumir ni expedir un lote con bloqueo de calidad.'
          ] },
          { id: '4', heading: '4. Clasificación', list: [
            'Crítica: afecta a una pieza de seguridad o a la función de contención de presión; toda pieza de seguridad con no conformidad se trata como crítica.',
            'Mayor: fuera de tolerancia en una cota funcional, sin efecto en la seguridad.',
            'Menor: defecto estético o documental, sin efecto en la función.'
          ] },
          { id: '5', heading: '5. Decisión de empleo', text: [
            'La decisión de empleo se registra en SAP QM y puede ser: liberar, retrabajar, aceptar por concesión, devolver al proveedor o achatarrar.',
            'La liberación exige evidencia documentada: resultados de inspección o de metrología, análisis de causa si procede y conclusión firmada.',
            'Las concesiones no se admiten en no conformidades críticas.',
            'Ningún producto se libera por defecto ni por vencimiento de plazo.'
          ] },
          { id: '6', heading: '6. Equipos ya entregados', text: [
            'Si la no conformidad afecta a equipos ya entregados, el Responsable de Calidad valora una campaña de campo según PR-POS-005 y lo comunica al Responsable de posventa.'
          ] },
          { id: '7', heading: '7. Acciones correctivas', text: [
            'Las no conformidades críticas y mayores, y las que se repiten tres veces en tres meses, abren un análisis de causa raíz con la metodología 8D (PR-CAL-008).'
          ] },
          { id: '8', heading: '8. Registros', list: [
            'Avisos de calidad, bloqueos y decisiones de empleo: SAP QM.',
            'Informes de metrología: SAP QM, adjuntos al aviso de calidad.',
            'Análisis 8D: PR-CAL-008.'
          ] }
        ]
      },
      {
        code: 'PR-CAL-008',
        title: 'Metodología 8D para reclamaciones y no conformidades',
        short: 'Metodología 8D',
        type: 'Procedimiento',
        version: '4',
        date: '2026-03-23',
        owner: 'Calidad',
        summary: 'Acuse de recibo en 24 h, contención en 48 h e informe 8D en 10 días laborables (salvo plazo pactado con el cliente). Al proveedor se le exige su propio 8D.',
        sections: [
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Resolver de forma estructurada las reclamaciones de cliente y las no conformidades críticas o repetitivas, y comunicar al cliente la causa raíz y las acciones con evidencia.',
            'Aplica también a los proveedores: ante un defecto de un componente comprado, se exige al proveedor su propio informe 8D.'
          ] },
          { id: '2', heading: '2. Plazos', list: [
            'Acuse de recibo al cliente: 24 h desde la recepción de la reclamación.',
            'Contención (D3): 48 h para bloquear el stock sospechoso en planta y en el almacén de recambios.',
            'Informe 8D completo: 10 días laborables, salvo plazo distinto pactado con el cliente.',
            'Proveedor: informe 8D en 10 días laborables desde la reclamación de Hidromec Ebro.'
          ] },
          { id: '3', heading: '3. Las ocho disciplinas', text: [
            'El informe 8D se prepara en SAP QM y sigue ocho pasos:'
          ], list: [
            'D1 · Equipo: Calidad, Ingeniería de producto, Producción y Posventa; Compras si interviene un proveedor.',
            'D2 · Descripción del problema: qué, dónde, cuándo y cuántos, con el número de serie del equipo.',
            'D3 · Contención: stock bloqueado en planta, recambios y equipos en campo afectados.',
            'D4 · Causa raíz de aparición y de no detección, con Ishikawa y 5 porqués, confirmada con evidencia.',
            'D5 · Acciones correctivas elegidas y su validación.',
            'D6 · Implantación y verificación de la eficacia con datos a 90 días.',
            'D7 · Prevención: actualización del AMFE, del plan de control, de procedimientos o de la formación.',
            'D8 · Cierre, reconocimiento del equipo y comunicación al cliente.'
          ] },
          { id: '4', heading: '4. Investigación de fugas hidráulicas', text: [
            'En una reclamación por fuga de aceite, la investigación revisa como mínimo:'
          ], list: [
            'Trazabilidad del equipo por número de serie: lotes de juntas, latiguillos y racores montados (PLM Windchill y SAP).',
            'Registros de la prueba de presión en banco del equipo: presión, tiempo de mantenimiento y caída admisible.',
            'Certificados del lote de juntas del proveedor y resultados de la inspección de recepción.',
            'Reclamaciones similares de los últimos 24 meses con el mismo componente o proveedor.'
          ] },
          { id: '5', heading: '5. Comunicación al cliente', text: [
            'La respuesta al cliente la aprueba el Responsable de Calidad antes de enviarla.',
            'Una causa solo se comunica como confirmada cuando hay evidencia; hasta entonces se presenta como hipótesis en investigación.'
          ] },
          { id: '6', heading: '6. Historial de revisiones', text: [
            'Rev. 4 (23/03/2026): se añade la revisión de los certificados de lote del proveedor en las reclamaciones por fuga hidráulica.'
          ] }
        ]
      },
      {
        code: 'PR-SEG-002',
        title: 'Consignación de energías (LOTO)',
        short: 'Consignación LOTO',
        type: 'Procedimiento',
        version: '5',
        date: '2025-10-08',
        owner: 'Prevención de riesgos laborales',
        summary: 'Siete pasos de consignación con candado y tarjeta personales; en equipos hidráulicos, acumuladores a 0 bar y cilindros calzados antes de intervenir.',
        sections: [
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Garantizar que ninguna máquina o instalación puede ponerse en marcha ni liberar energía mientras se interviene en ella.',
            'Aplica a todo el personal propio y de contratas que haga mantenimiento, limpieza, cambio de utillaje o desatascos con acceso a zonas de peligro.'
          ] },
          { id: '2', heading: '2. Responsabilidades', list: [
            'Cada persona que interviene coloca su propio candado y su tarjeta: nadie consigna por otro.',
            'El Jefe de mantenimiento autoriza las consignaciones de grupo y custodia la caja de consignación.',
            'Contratas: consignan bajo la supervisión de un técnico de Mantenimiento de Hidromec Ebro.'
          ] },
          { id: '3', heading: '3. Secuencia de consignación', list: [
            'Preparar: identificar todas las fuentes de energía con la ficha de consignación de la máquina.',
            'Avisar al operador y a los afectados de la parada.',
            'Parar la máquina con el mando normal.',
            'Aislar cada fuente: seccionador eléctrico, válvula neumática, grupo hidráulico y refrigeración.',
            'Bloquear con candado personal y tarjeta en cada punto de aislamiento.',
            'Disipar las energías residuales: purgar acumuladores hidráulicos, descargar el aire y bajar o calzar las cargas suspendidas.',
            'Verificar la energía cero intentando el arranque y midiendo ausencia de tensión y de presión.'
          ] },
          { id: '4', heading: '4. Energía hidráulica', text: [
            'En prensas y grupos hidráulicos, la presión residual de los acumuladores debe ser 0 bar en el manómetro antes de abrir cualquier circuito; la purga se hace por la válvula de descarga, nunca aflojando racores.',
            'Los cilindros con carga se bloquean mecánicamente con calzos o pasadores de seguridad, porque una válvula cerrada no evita el descenso por fugas internas.'
          ] },
          { id: '5', heading: '5. Retirada de la consignación', text: [
            'Cada persona retira solo su propio candado al terminar.',
            'Si una persona no está presente para retirar su candado, solo el Jefe de mantenimiento puede retirarlo, tras comprobar que esa persona ha salido de la planta y que la máquina está segura, y lo deja registrado.'
          ] },
          { id: '6', heading: '6. Formación y registros', list: [
            'Formación inicial y reciclaje cada 2 años, registrada en el expediente de cada persona.',
            'Fichas de consignación de cada máquina en GMAO Maximo, revisadas en cada modificación de la máquina.',
            'Las consignaciones de grupo se anotan en el libro de consignaciones.'
          ] },
          { id: '7', heading: '7. Referencias', refs: true, list: [
            'Real Decreto 1215/1997, disposiciones mínimas para la utilización de los equipos de trabajo.',
            'Ley 31/1995 de Prevención de Riesgos Laborales.',
            'ISO 14118:2017 · Seguridad de las máquinas. Prevención de una puesta en marcha intempestiva.'
          ] }
        ]
      },
      {
        code: 'PR-POS-005',
        title: 'Campañas de campo',
        short: 'Campañas de campo',
        type: 'Procedimiento',
        version: '3',
        date: '2026-05-18',
        owner: 'Posventa',
        summary: 'Alcance de la campaña por trazabilidad (lote de componente → montaje → n.º de serie → cliente) en 4 h; aviso a clientes en 24 h si es de seguridad; cierre con el 95 % de equipos intervenidos.',
        sections: [
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Organizar la revisión, sustitución o modificación de equipos ya entregados cuando se detecta un defecto que puede afectar a su seguridad, a su funcionamiento o al cumplimiento del marcado CE.',
            'Aplica a las prensas PH-160, PH-250 y PH-400 y a los grupos hidráulicos GH-30 y GH-55, en garantía o fuera de ella.'
          ] },
          { id: '2', heading: '2. Decisión de la campaña', text: [
            'Propone la campaña el Responsable de Calidad a la vista de la investigación (PR-CAL-008); la aprueba el Jefe de planta junto con el Responsable de posventa.',
            'Se clasifica como campaña de seguridad si el defecto puede causar daño a personas; en caso contrario, como campaña de fiabilidad.'
          ] },
          { id: '3', heading: '3. Identificación de equipos', text: [
            'El alcance se calcula por trazabilidad: lote del componente → lotes de montaje → números de serie → clientes (genealogía de SAP y MES Opcenter, PLM Windchill y Salesforce Service).',
            'Objetivo: lista completa de equipos afectados y de sus clientes en 4 h desde la aprobación de la campaña.',
            'El stock del lote de componente en almacén y en recambios se bloquea en SAP QM en el mismo plazo.'
          ] },
          { id: '4', heading: '4. Comunicación a clientes', list: [
            'Campaña de seguridad: aviso a cada cliente en 24 h por teléfono y por escrito, con la instrucción de dejar de usar el equipo si el riesgo lo exige.',
            'Campaña de fiabilidad: aviso por escrito en 5 días laborables, con la fecha propuesta de intervención.',
            'Si el equipo lo vendió un distribuidor, se avisa al distribuidor y se le pide la identificación del usuario final.',
            'Los avisos se registran como casos en Salesforce Service, uno por número de serie.'
          ] },
          { id: '5', heading: '5. Autoridades', text: [
            'Si la campaña es de seguridad, el Responsable de Calidad informa a las autoridades de vigilancia del mercado según PR-COM-002 (Comunicación con autoridades de vigilancia del mercado).'
          ] },
          { id: '6', heading: '6. Ejecución y cierre', text: [
            'Cada intervención se registra en el caso de Salesforce Service con el número de serie, las piezas sustituidas y la prueba funcional.',
            'La campaña se cierra cuando se ha intervenido al menos el 95 % de los equipos y el resto está localizado con justificación; el avance se reporta cada semana al Jefe de planta.'
          ] },
          { id: '7', heading: '7. Referencias', refs: true, list: [
            'Reglamento (UE) 2023/1230 relativo a las máquinas, aplicable desde el 20/01/2027.',
            'Directiva 2006/42/CE de máquinas, vigente hasta el 19/01/2027.',
            'Reglamento (UE) 2019/1020 relativo a la vigilancia del mercado.',
            'PR-CAL-008 · Metodología 8D.'
          ] }
        ]
      }
    ],

    unindexed: {
      'PR-COM-002': { title: 'Comunicación con autoridades de vigilancia del mercado', mentionedIn: { doc: 'PR-POS-005', sec: '5', quote: 'según PR-COM-002 (Comunicación con autoridades de vigilancia del mercado)' } }
    },

    suggested: ['vibracion', 'piezas-zona-d', 'plazos-8d', 'loto', 'campana', 'liberar'],

    intents: [
      {
        id: 'vibracion', icon: 'activity', topic: 'Vibraciones · actuación en zona D', scope: 'local',
        q: '¿Qué hay que hacer si la vibración de un husillo entra en zona D?',
        anchors: ['vibración', 'vibraciones', 'zona d', 'husillo', 'mm/s', 'rms'],
        terms: ['supera', 'sube', 'alarma', 'parar', 'parada', 'actuar', 'hacer', 'límite', '4,5', 'máquina', 'centro'],
        min: 3,
        blocks: [
          { t: 'Si la vibración supera 4,5 mm/s (zona D) durante más de 30 min seguidos, la máquina se para en cuanto termine la pieza en curso y no se rearma hasta la intervención de Mantenimiento.', c: [['PR-MAN-011', 4, 'Zona D (por encima de 4,5 mm/s) durante más de 30 min seguidos: la máquina se para en cuanto termine la pieza en curso']] },
          { t: 'Un pico por encima de 7,1 mm/s es avería crítica: se para de inmediato, sin terminar la pieza.', c: [['PR-MAN-011', 4, 'Un pico por encima de 7,1 mm/s es avería crítica y obliga a parar de inmediato, sin terminar la pieza en curso.']] },
          { t: 'Las piezas mecanizadas en la ventana de exposición se bloquean en SAP QM, aunque la inspección en proceso haya sido correcta, y pasan metrología al 100 % en la MMC.', c: [['PR-MAN-011', 5, 'Todas las piezas mecanizadas en la ventana de exposición se bloquean en SAP QM como no conformidad potencial según PR-CAL-004'], ['PR-MAN-011', 5, 'Esas piezas pasan control metrológico al 100 % en la máquina de medir por coordenadas (MMC)']] },
          { t: 'El Jefe de mantenimiento decide la parada y aprueba la orden de trabajo en GMAO Maximo; el Jefe de producción reasigna las órdenes de fabricación a otra máquina.', c: [['PR-MAN-011', 3, 'Jefe de mantenimiento: valora la alarma, decide la parada y aprueba la orden de trabajo en GMAO Maximo.'], ['PR-MAN-011', 3, 'Jefe de producción: reasigna las órdenes de fabricación de la máquina parada a otra con capacidad y programa compatible.']] }
        ],
        context: {
          systems: ['IIoT Vibración', 'GMAO Maximo', 'SAP S/4HANA'],
          text: 'Alarma de hoy en MC-04 (DMG Mori DMU 65): 7,8 mm/s RMS desde las 03:40, con pico de 8,4 mm/s a las 05:32. Más de 2 h en zona D y un pico por encima de 7,1 mm/s: por el apartado 4 es avería crítica y corresponde parada inmediata. En la ventana se mecanizaron 42 culatas del lote CUL-2609-118 (OF 4100872), que quedan para bloqueo y metrología al 100 %.',
          outcome: 'alarma',
          go: 'alarma', goLabel: 'Abrir alarma MC-04'
        },
        followups: ['piezas-zona-d', 'cambio-husillo']
      },
      {
        id: 'piezas-zona-d', icon: 'layers', topic: 'Vibraciones · piezas mecanizadas en zona D', scope: 'local',
        q: '¿Qué se hace con las piezas mecanizadas con el husillo en zona D?',
        anchors: ['piezas', 'culatas', 'mecanizadas', 'mecanizado', 'ventana de exposición', 'metrología', 'mmc'],
        terms: ['zona', 'vibración', 'husillo', 'bloquear', 'bloqueo', 'liberar', 'medir', 'control', 'seguridad', 'hago', 'hacer'],
        min: 2,
        blocks: [
          { t: 'Se bloquean todas en SAP QM como no conformidad potencial, aunque la inspección en proceso haya sido correcta.', c: [['PR-MAN-011', 5, 'Todas las piezas mecanizadas en la ventana de exposición se bloquean en SAP QM como no conformidad potencial según PR-CAL-004, aunque la inspección en proceso haya sido correcta.']] },
          { list: [
            { t: 'Pasan control metrológico al 100 % en la MMC: cotas funcionales, planitud de las caras de junta y rugosidad de los alojamientos.', c: [['PR-MAN-011', 5, 'cotas funcionales, planitud de las caras de junta y rugosidad de los alojamientos']] },
            { t: 'Las piezas de seguridad, como las culatas, solo se liberan con informe MMC conforme firmado por Calidad.', c: [['PR-MAN-011', 5, 'Las piezas de seguridad (culatas, vástagos y bloques de válvulas) solo se liberan con informe MMC conforme firmado por Calidad.']] },
            { t: 'Una no conformidad en una pieza de seguridad es crítica y no admite concesión.', c: [['PR-CAL-004', 4, 'toda pieza de seguridad con no conformidad se trata como crítica'], ['PR-CAL-004', 5, 'Las concesiones no se admiten en no conformidades críticas.']] }
          ] }
        ],
        context: {
          systems: ['SAP S/4HANA', 'MES Opcenter'],
          text: 'Las 42 culatas de cilindro del lote CUL-2609-118 (OF 4100872) se mecanizaron en MC-04 entre las 03:40 y la parada. Son piezas de seguridad: solo se liberan con informe MMC conforme.',
          outcome: 'alarma',
          go: 'alarma', goLabel: 'Abrir alarma MC-04'
        },
        followups: ['liberar', 'clasificacion']
      },
      {
        id: 'zonas', icon: 'gauge', topic: 'Vibraciones · zonas de severidad', scope: 'local',
        q: '¿Cuáles son los límites de vibración de las zonas A, B, C y D?',
        anchors: ['zonas', 'zona a', 'zona b', 'zona c', 'severidad', 'iso 10816', '10816', 'límites de vibración'],
        terms: ['límite', 'límites', 'vibración', 'mm/s', 'valores', 'aviso', 'cuáles'],
        min: 3,
        blocks: [
          { t: 'Según ISO 10816-3 para máquinas del grupo 2 con montaje rígido: zona A hasta 1,4 mm/s, B hasta 2,8 mm/s, C hasta 4,5 mm/s y D por encima de 4,5 mm/s.', c: [['PR-MAN-011', 2, 'zona A hasta 1,4 mm/s; zona B hasta 2,8 mm/s; zona C hasta 4,5 mm/s; zona D por encima de 4,5 mm/s.']] },
          { t: 'En zona C durante más de 2 h se avisa a Mantenimiento por Microsoft Teams y se revisa en el siguiente cambio de turno, sin parar la máquina.', c: [['PR-MAN-011', 4, 'Zona C (de 2,8 a 4,5 mm/s) mantenida durante más de 2 h: aviso a Mantenimiento por Microsoft Teams y revisión en el siguiente cambio de turno; la máquina sigue produciendo.']] },
          { t: 'Una subida de más del 50 % sobre la línea base en una semana se trata como zona C aunque siga en zona B.', c: [['PR-MAN-011', 4, 'Un aumento de más del 50 % sobre la línea base en una semana, aunque no salga de la zona B, se trata como zona C.']] }
        ],
        followups: ['vibracion']
      },
      {
        id: 'cambio-husillo', icon: 'wrench', topic: 'Husillo · cambio y verificación', scope: 'local',
        q: '¿Cómo se verifica un centro de mecanizado después de cambiar el husillo?',
        anchors: ['cambiar el husillo', 'cambio de husillo', 'rodaje', 'electromandrino', 'rodamientos', 'pieza patrón', 'excentricidad'],
        terms: ['husillo', 'verifica', 'verificar', 'verificación', 'después', 'tras', 'producción', 'volver', 'cambio', 'cambiar'],
        min: 3,
        blocks: [
          { t: 'Primero, un rodaje escalonado de 30 min a 3.000, 6.000, 9.000 y 12.000 rpm, parando si la temperatura sube más de 2 °C por minuto.', c: [['IT-MEC-021', 5, 'Rodaje escalonado de 30 min: 3.000, 6.000, 9.000 y 12.000 rpm, con parada si la temperatura sube más de 2 °C por minuto.']] },
          { t: 'La verificación final exige una excentricidad en punta de 2 µm como máximo y una vibración en vacío a 12.000 rpm por debajo de 1,8 mm/s.', c: [['IT-MEC-021', 5, 'Verificación final: excentricidad en punta de husillo de 2 µm como máximo y vibración en vacío a 12.000 rpm por debajo de 1,8 mm/s.']] },
          { t: 'La máquina vuelve a producción solo con una pieza patrón conforme en la MMC y la firma del Jefe de mantenimiento en la orden de trabajo.', c: [['IT-MEC-021', 5, 'la máquina solo vuelve a producción con la pieza patrón conforme y la firma del Jefe de mantenimiento en la orden de trabajo']] },
          { t: 'Antes de desmontar, la máquina se consigna según PR-SEG-002.', c: [['IT-MEC-021', 2, 'La máquina se consigna según PR-SEG-002 antes de cualquier desmontaje']] }
        ],
        context: {
          systems: ['GMAO Maximo', 'IIoT Vibración'],
          text: 'MC-04 es uno de los tres DMU 65 a los que aplica la instrucción. Tras la intervención por la alarma de hoy, la nueva línea base se calcula en las cuatro semanas siguientes.',
          go: 'alarma', goLabel: 'Abrir alarma MC-04'
        },
        followups: ['diagnostico', 'loto']
      },
      {
        id: 'diagnostico', icon: 'search', topic: 'Husillo · diagnóstico', scope: 'local',
        q: '¿Cuándo se cambian solo los rodamientos y cuándo el husillo completo?',
        anchors: ['rodamientos', 'rodamiento', 'husillo completo', 'bpfo', 'bpfi', 'juego radial', 'diagnóstico'],
        terms: ['cambian', 'cambiar', 'sustituir', 'solo', 'completo', 'cuándo', 'horas', 'husillo'],
        min: 3,
        blocks: [
          { t: 'Si el diagnóstico apunta solo a rodamientos y el husillo tiene menos de 20.000 h, se cambian los rodamientos; si no, se sustituye el husillo completo por uno de intercambio.', c: [['IT-MEC-021', 3, 'Si el diagnóstico apunta solo a rodamientos y el husillo tiene menos de 20.000 h, se cambian los rodamientos; si no, se sustituye el husillo completo por uno de intercambio.']] },
          { list: [
            { t: 'Un juego radial en punta de más de 3 µm obliga a sustituir.', c: [['IT-MEC-021', 3, 'Juego radial en punta de husillo con comparador: más de 3 µm obliga a sustituir.']] },
            { t: 'Una temperatura en vacío a 12.000 rpm más de 15 °C por encima de la línea base indica precarga o lubricación defectuosa.', c: [['IT-MEC-021', 3, 'más de 15 °C por encima de la línea base indica precarga o lubricación defectuosa']] }
          ] }
        ],
        followups: ['cambio-husillo']
      },
      {
        id: 'apriete', icon: 'wrench', topic: 'Husillo · montaje', scope: 'local',
        q: '¿A qué par se aprietan los tornillos de la brida del husillo?',
        anchors: ['par de apriete', 'apriete', 'apretar', 'aprietan', 'brida', 'tornillos', 'nm'],
        terms: ['husillo', 'par', 'montaje', 'cruz', 'rodamientos', 'precisión'],
        min: 3,
        blocks: [
          { t: 'A 35 Nm, en cruz y en dos pasadas.', c: [['IT-MEC-021', 4, 'Apretar los tornillos de la brida a 35 Nm en cruz, en dos pasadas.']] },
          { t: 'Los rodamientos nuevos deben ser de la misma referencia y clase de precisión (P4), y los números de serie del husillo retirado y del montado se anotan en la orden de trabajo.', c: [['IT-MEC-021', 4, 'Montar el husillo de intercambio o los rodamientos nuevos de la misma referencia y clase de precisión (P4).'], ['IT-MEC-021', 4, 'Registrar en la orden de trabajo los números de serie del husillo retirado y del montado.']] },
          { t: 'El husillo pesa 68 kg y se manipula con el útil UT-21 y la grúa pórtico.', c: [['IT-MEC-021', 2, 'El husillo pesa 68 kg: se manipula con el útil de elevación UT-21 y la grúa pórtico, nunca a mano.']] }
        ],
        followups: ['cambio-husillo']
      },
      {
        id: 'clasificacion', icon: 'list-checks', topic: 'No conformidades · clasificación', scope: 'local',
        q: '¿Cómo se clasifica una no conformidad?',
        anchors: ['no conformidad', 'no conformidades', 'crítica', 'mayor', 'menor', 'clasifica', 'clasificación'],
        terms: ['clasifica', 'clasificar', 'tipos', 'gravedad', 'pieza', 'defecto'],
        min: 3,
        blocks: [
          { list: [
            { t: 'Crítica: afecta a una pieza de seguridad o a la contención de presión.', c: [['PR-CAL-004', 4, 'Crítica: afecta a una pieza de seguridad o a la función de contención de presión']] },
            { t: 'Mayor: fuera de tolerancia en una cota funcional, sin efecto en la seguridad.', c: [['PR-CAL-004', 4, 'Mayor: fuera de tolerancia en una cota funcional, sin efecto en la seguridad.']] },
            { t: 'Menor: defecto estético o documental, sin efecto en la función.', c: [['PR-CAL-004', 4, 'Menor: defecto estético o documental, sin efecto en la función.']] }
          ] },
          { t: 'Las críticas y mayores, y las que se repiten tres veces en tres meses, abren un análisis 8D.', c: [['PR-CAL-004', 7, 'Las no conformidades críticas y mayores, y las que se repiten tres veces en tres meses, abren un análisis de causa raíz con la metodología 8D (PR-CAL-008).']] }
        ],
        followups: ['liberar', 'contenido-8d']
      },
      {
        id: 'liberar', icon: 'unlock', topic: 'Bloqueo y liberación de producto', scope: 'local',
        q: '¿Quién puede liberar una pieza bloqueada?',
        anchors: ['liberar', 'liberación', 'libera', 'desbloquear', 'decisión de empleo', 'concesión'],
        terms: ['quién', 'pieza', 'piezas', 'lote', 'bloqueada', 'bloqueado', 'bloqueo', 'producto', 'firma', 'puede'],
        min: 3,
        blocks: [
          { t: 'Solo el Responsable de Calidad, que también es el único que puede aprobar una concesión.', c: [['PR-CAL-004', 2, 'Solo el Responsable de Calidad puede liberar producto bloqueado o aprobar una concesión.']] },
          { t: 'La decisión de empleo se registra en SAP QM: liberar, retrabajar, aceptar por concesión, devolver al proveedor o achatarrar.', c: [['PR-CAL-004', 5, 'La decisión de empleo se registra en SAP QM y puede ser: liberar, retrabajar, aceptar por concesión, devolver al proveedor o achatarrar.']] },
          { t: 'Liberar exige evidencia documentada: resultados de inspección o metrología, análisis de causa si procede y conclusión firmada.', c: [['PR-CAL-004', 5, 'La liberación exige evidencia documentada: resultados de inspección o de metrología, análisis de causa si procede y conclusión firmada.']] },
          { t: 'Nada se libera por defecto ni por vencimiento de plazo.', c: [['PR-CAL-004', 5, 'Ningún producto se libera por defecto ni por vencimiento de plazo.']] }
        ],
        followups: ['bloqueo', 'clasificacion']
      },
      {
        id: 'bloqueo', icon: 'lock', topic: 'Bloqueo de producto · registro', scope: 'local',
        q: '¿Quién aprueba un bloqueo y dónde se registra?',
        anchors: ['bloqueo', 'bloquear', 'cuarentena', 'etiqueta roja', 'aviso de calidad'],
        terms: ['quién', 'aprueba', 'registra', 'registro', 'dónde', 'propone', 'sap', 'alcance'],
        min: 4,
        blocks: [
          { t: 'Cualquier responsable de sección puede proponerlo; lo aprueba el Técnico de Calidad de turno, que define su alcance.', c: [['PR-CAL-004', 2, 'Cualquier responsable de sección puede proponer un bloqueo al detectar una desviación.'], ['PR-CAL-004', 2, 'El Técnico de Calidad de turno aprueba el bloqueo y define su alcance (piezas, lotes, números de serie y ubicaciones).']] },
          { t: 'Se registra en SAP QM como aviso de calidad, con material, lote o número de serie, cantidad, defecto y origen.', c: [['PR-CAL-004', 3, 'Toda no conformidad se registra en SAP QM como aviso de calidad']] },
          { t: 'El producto lleva etiqueta roja y va a cuarentena; SAP no deja consumir ni expedir un lote bloqueado.', c: [['PR-CAL-004', 3, 'El producto bloqueado se identifica con etiqueta roja y se traslada a la zona de cuarentena; SAP no permite consumir ni expedir un lote con bloqueo de calidad.']] }
        ],
        followups: ['liberar']
      },
      {
        id: 'plazos-8d', icon: 'mail', topic: 'Reclamaciones · plazos del 8D', scope: 'all',
        q: '¿Qué plazos tenemos para responder a una reclamación de cliente?',
        anchors: ['reclamación', 'reclamaciones', 'queja', '8d'],
        terms: ['plazo', 'plazos', 'responder', 'contestar', 'acuse', 'días', 'horas', 'cuándo', 'tenemos', 'cliente', 'gestiona'],
        min: 3,
        blocks: [
          { list: [
            { t: 'Acuse de recibo en 24 h desde la recepción.', c: [['PR-CAL-008', 2, 'Acuse de recibo al cliente: 24 h desde la recepción de la reclamación.']] },
            { t: 'Contención en 48 h: bloquear el stock sospechoso en planta y en el almacén de recambios.', c: [['PR-CAL-008', 2, 'Contención (D3): 48 h para bloquear el stock sospechoso en planta y en el almacén de recambios.']] },
            { t: 'Informe 8D completo en 10 días laborables, salvo plazo distinto pactado con el cliente.', c: [['PR-CAL-008', 2, 'Informe 8D completo: 10 días laborables, salvo plazo distinto pactado con el cliente.']] }
          ] },
          { t: 'La respuesta la aprueba el Responsable de Calidad antes de enviarla.', c: [['PR-CAL-008', 5, 'La respuesta al cliente la aprueba el Responsable de Calidad antes de enviarla.']] }
        ],
        context: {
          systems: ['Outlook', 'Salesforce Service'],
          text: 'Reclamación de Prensas y Servicios del Norte, S.L. por la fuga de aceite en la PH-250 n.º de serie PH250-26-0412, entregada el 04/08/2026: acuse en 24 h y 8D en 10 días laborables.',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Abrir reclamación PH-250'
        },
        followups: ['fuga', 'contenido-8d']
      },
      {
        id: 'contenido-8d', icon: 'list-checks', topic: 'Metodología 8D · contenido', scope: 'all',
        q: '¿Qué debe incluir un informe 8D?',
        anchors: ['8d', 'ocho disciplinas', 'd1', 'd4', 'd8', 'ishikawa', '5 porqués'],
        terms: ['informe', 'incluir', 'incluye', 'pasos', 'contenido', 'estructura', 'disciplinas', 'plantilla'],
        min: 2,
        blocks: [
          { intro: { t: 'El informe 8D se prepara en SAP QM y sigue ocho pasos:', c: [['PR-CAL-008', 3, 'El informe 8D se prepara en SAP QM y sigue ocho pasos:']] }, list: [
            'D1 · Equipo: Calidad, Ingeniería de producto, Producción y Posventa; Compras si interviene un proveedor.',
            'D2 · Descripción del problema con el número de serie del equipo.',
            'D3 · Contención en planta, recambios y equipos en campo.',
            'D4 · Causa raíz de aparición y de no detección, con Ishikawa y 5 porqués, confirmada con evidencia.',
            'D5 · Acciones correctivas y su validación.',
            'D6 · Implantación y verificación de la eficacia con datos a 90 días.',
            'D7 · Prevención: AMFE, plan de control, procedimientos o formación.',
            'D8 · Cierre y comunicación al cliente.'
          ] },
          { t: 'Una causa solo se comunica como confirmada cuando hay evidencia; hasta entonces es una hipótesis en investigación.', c: [['PR-CAL-008', 5, 'Una causa solo se comunica como confirmada cuando hay evidencia; hasta entonces se presenta como hipótesis en investigación.']] }
        ],
        followups: ['plazos-8d', 'proveedor']
      },
      {
        id: 'fuga', icon: 'droplet', topic: 'Reclamaciones · fugas hidráulicas', scope: 'all',
        q: '¿Qué hay que revisar en una reclamación por fuga de aceite?',
        anchors: ['fuga', 'fugas', 'aceite', 'junta', 'juntas', 'estanqueidad'],
        terms: ['reclamación', 'revisar', 'investiga', 'investigar', 'investigación', 'prensa', 'cliente', 'hidráulica'],
        min: 3,
        blocks: [
          { intro: { t: 'La investigación revisa como mínimo:', c: [['PR-CAL-008', 4, 'En una reclamación por fuga de aceite, la investigación revisa como mínimo:']] }, list: [
            { t: 'La trazabilidad del equipo por número de serie: lotes de juntas, latiguillos y racores montados.', c: [['PR-CAL-008', 4, 'Trazabilidad del equipo por número de serie: lotes de juntas, latiguillos y racores montados (PLM Windchill y SAP).']] },
            { t: 'Los registros de la prueba de presión en banco del equipo.', c: [['PR-CAL-008', 4, 'Registros de la prueba de presión en banco del equipo: presión, tiempo de mantenimiento y caída admisible.']] },
            { t: 'Los certificados del lote de juntas del proveedor y la inspección de recepción.', c: [['PR-CAL-008', 4, 'Certificados del lote de juntas del proveedor y resultados de la inspección de recepción.']] },
            { t: 'Las reclamaciones similares de los últimos 24 meses con el mismo componente o proveedor.', c: [['PR-CAL-008', 4, 'Reclamaciones similares de los últimos 24 meses con el mismo componente o proveedor.']] }
          ] }
        ],
        context: {
          systems: ['PLM Windchill', 'SAP S/4HANA'],
          text: 'En la PH250-26-0412 la junta del cilindro principal es del lote JNT-2607-031 de Sellados Ibéricos, S.A.: hay que pedir el certificado del lote y revisar su inspección de recepción.',
          outcome: 'reclamacion',
          lot: 'JNT-2607-031',
          go: 'reclamacion', goLabel: 'Abrir reclamación PH-250'
        },
        followups: ['proveedor', 'campana']
      },
      {
        id: 'proveedor', icon: 'users', topic: 'Metodología 8D · proveedores', scope: 'all',
        q: '¿Hay que pedir un 8D al proveedor de un componente defectuoso?',
        anchors: ['proveedor', 'proveedores', 'componente comprado', 'sellados ibéricos'],
        terms: ['8d', 'pedir', 'exigir', 'informe', 'defectuoso', 'componente', 'plazo'],
        min: 3,
        blocks: [
          { t: 'Sí: ante un defecto de un componente comprado se exige al proveedor su propio informe 8D.', c: [['PR-CAL-008', 1, 'ante un defecto de un componente comprado, se exige al proveedor su propio informe 8D']] },
          { t: 'El proveedor tiene 10 días laborables desde la reclamación de Hidromec Ebro.', c: [['PR-CAL-008', 2, 'Proveedor: informe 8D en 10 días laborables desde la reclamación de Hidromec Ebro.']] },
          { t: 'Si interviene un proveedor, Compras entra en el equipo del 8D.', c: [['PR-CAL-008', 3, 'Compras si interviene un proveedor']] }
        ],
        followups: ['fuga']
      },
      {
        id: 'loto', icon: 'lock', topic: 'Seguridad · consignación LOTO', scope: 'all',
        q: '¿Cuáles son los pasos de la consignación LOTO?',
        anchors: ['loto', 'consignación', 'consignar', 'candado', 'candados', 'energía cero'],
        terms: ['pasos', 'secuencia', 'cómo', 'máquina', 'bloquear', 'tarjeta', 'intervenir', 'mantenimiento'],
        min: 2,
        blocks: [
          { list: [
            { t: 'Preparar: identificar todas las fuentes de energía con la ficha de consignación de la máquina.', c: [['PR-SEG-002', 3, 'Preparar: identificar todas las fuentes de energía con la ficha de consignación de la máquina.']] },
            { t: 'Avisar a los afectados y parar la máquina con el mando normal.', c: [['PR-SEG-002', 3, 'Avisar al operador y a los afectados de la parada.'], ['PR-SEG-002', 3, 'Parar la máquina con el mando normal.']] },
            { t: 'Aislar cada fuente y bloquearla con candado personal y tarjeta.', c: [['PR-SEG-002', 3, 'Aislar cada fuente: seccionador eléctrico, válvula neumática, grupo hidráulico y refrigeración.'], ['PR-SEG-002', 3, 'Bloquear con candado personal y tarjeta en cada punto de aislamiento.']] },
            { t: 'Disipar las energías residuales y verificar la energía cero intentando el arranque.', c: [['PR-SEG-002', 3, 'Disipar las energías residuales: purgar acumuladores hidráulicos, descargar el aire y bajar o calzar las cargas suspendidas.'], ['PR-SEG-002', 3, 'Verificar la energía cero intentando el arranque y midiendo ausencia de tensión y de presión.']] }
          ] },
          { t: 'Cada persona coloca su propio candado: nadie consigna por otro.', c: [['PR-SEG-002', 2, 'Cada persona que interviene coloca su propio candado y su tarjeta: nadie consigna por otro.']] }
        ],
        followups: ['hidraulica', 'candado-olvidado']
      },
      {
        id: 'hidraulica', icon: 'gauge', topic: 'Seguridad · energía hidráulica', scope: 'all',
        q: '¿Cómo se consigna una prensa hidráulica con acumuladores?',
        anchors: ['acumulador', 'acumuladores', 'presión residual', 'calzos', 'pasadores', 'prensa hidráulica'],
        terms: ['consigna', 'consignar', 'prensa', 'prensas', 'purga', 'purgar', 'cilindro', 'bar', 'hidráulica'],
        min: 3,
        blocks: [
          { t: 'Antes de abrir cualquier circuito, el manómetro de los acumuladores debe marcar 0 bar; la purga se hace por la válvula de descarga, nunca aflojando racores.', c: [['PR-SEG-002', 4, 'la presión residual de los acumuladores debe ser 0 bar en el manómetro antes de abrir cualquier circuito; la purga se hace por la válvula de descarga, nunca aflojando racores']] },
          { t: 'Los cilindros con carga se bloquean con calzos o pasadores, porque una válvula cerrada no evita el descenso por fugas internas.', c: [['PR-SEG-002', 4, 'Los cilindros con carga se bloquean mecánicamente con calzos o pasadores de seguridad, porque una válvula cerrada no evita el descenso por fugas internas.']] }
        ],
        followups: ['loto']
      },
      {
        id: 'candado-olvidado', icon: 'key', topic: 'Seguridad · retirada de candados', scope: 'all',
        q: '¿Qué pasa si alguien se va y deja su candado puesto?',
        anchors: ['candado', 'candados', 'retirar', 'retirada de la consignación'],
        terms: ['deja', 'olvida', 'puesto', 'presente', 'quién', 'quitar', 'retira', 'ausente'],
        min: 3,
        blocks: [
          { t: 'Cada persona retira solo su propio candado.', c: [['PR-SEG-002', 5, 'Cada persona retira solo su propio candado al terminar.']] },
          { t: 'Si no está presente, solo el Jefe de mantenimiento puede retirarlo, tras comprobar que ha salido de la planta y que la máquina está segura, y lo deja registrado.', c: [['PR-SEG-002', 5, 'solo el Jefe de mantenimiento puede retirarlo, tras comprobar que esa persona ha salido de la planta y que la máquina está segura, y lo deja registrado']] }
        ],
        followups: ['loto']
      },
      {
        id: 'campana', icon: 'truck', topic: 'Posventa · campañas de campo', scope: 'all',
        q: '¿Cómo se organiza una campaña de campo?',
        anchors: ['campaña', 'campañas', 'campaña de campo', 'equipos en campo', 'retirada', 'recall'],
        terms: ['organiza', 'cómo', 'equipos', 'clientes', 'aviso', 'avisar', 'plazo', 'identificar', 'serie'],
        min: 2,
        blocks: [
          { t: 'La propone el Responsable de Calidad y la aprueban el Jefe de planta y el Responsable de posventa.', c: [['PR-POS-005', 2, 'Propone la campaña el Responsable de Calidad a la vista de la investigación (PR-CAL-008); la aprueba el Jefe de planta junto con el Responsable de posventa.']] },
          { t: 'El alcance sale por trazabilidad, del lote del componente al cliente, con la lista completa en 4 h; en ese plazo se bloquea también el stock del lote.', c: [['PR-POS-005', 3, 'El alcance se calcula por trazabilidad: lote del componente → lotes de montaje → números de serie → clientes'], ['PR-POS-005', 3, 'Objetivo: lista completa de equipos afectados y de sus clientes en 4 h desde la aprobación de la campaña.'], ['PR-POS-005', 3, 'El stock del lote de componente en almacén y en recambios se bloquea en SAP QM en el mismo plazo.']] },
          { t: 'Si es de seguridad, cada cliente se avisa en 24 h; si es de fiabilidad, en 5 días laborables. Con distribuidor, se le pide el usuario final.', c: [['PR-POS-005', 4, 'Campaña de seguridad: aviso a cada cliente en 24 h por teléfono y por escrito'], ['PR-POS-005', 4, 'Campaña de fiabilidad: aviso por escrito en 5 días laborables'], ['PR-POS-005', 4, 'Si el equipo lo vendió un distribuidor, se avisa al distribuidor y se le pide la identificación del usuario final.']] },
          { t: 'Se cierra con al menos el 95 % de los equipos intervenidos.', c: [['PR-POS-005', 6, 'La campaña se cierra cuando se ha intervenido al menos el 95 % de los equipos']] }
        ],
        context: {
          systems: ['SAP S/4HANA', 'PLM Windchill', 'Salesforce Service'],
          text: 'Simulacro con el lote de juntas JNT-2607-031: 1.104 juntas montadas en 3 lotes de montaje, 23 equipos en campo (17 PH-250 y 6 GH-55) en 11 clientes de España, Portugal y Francia. Objetivo del apartado 3: lista completa en 4 h.',
          lot: 'JNT-2607-031',
          go: 'retirada', goLabel: 'Abrir simulacro JNT-2607-031'
        },
        followups: ['autoridades', 'liberar']
      },
      {
        id: 'autoridades', icon: 'building', topic: 'Campañas de campo · autoridades', scope: 'all', kind: 'partial',
        q: '¿Hay que avisar a la autoridad en una campaña de seguridad?',
        anchors: ['autoridad', 'autoridades', 'vigilancia del mercado', 'ministerio', 'notificar'],
        terms: ['avisar', 'campaña', 'seguridad', 'informar', 'comunicar', 'cómo', 'plazo'],
        min: 3,
        blocks: [
          { t: 'Sí: en una campaña de seguridad, el Responsable de Calidad informa a las autoridades de vigilancia del mercado según PR-COM-002.', c: [['PR-POS-005', 5, 'Si la campaña es de seguridad, el Responsable de Calidad informa a las autoridades de vigilancia del mercado según PR-COM-002']] }
        ],
        note: 'PR-COM-002 (Comunicación con autoridades de vigilancia del mercado) no está entre los documentos indexados: el canal, el plazo y el contenido de la comunicación no se pueden detallar desde esta consulta.',
        followups: ['campana']
      }
    ],

    gaps: [
      { id: 'calibracion', topic: 'Calibración de equipos de medida', anchors: ['calibración', 'calibrar', 'calibran', 'pie de rey', 'pies de rey', 'micrómetro', 'micrómetros', 'galgas', 'msa', 'r&r'],
        reason: 'Ningún documento indexado describe la calibración ni el análisis del sistema de medida (MSA) de los equipos de inspección.' },
      { id: 'notificacion', topic: 'Comunicación a autoridades', anchors: ['plazo para notificar', 'formulario', 'safety gate', 'rapex', 'pr-com-002'],
        reason: 'Ningún documento indexado describe cómo se comunica una campaña a las autoridades de vigilancia del mercado.', related: 'PR-COM-002' },
      { id: 'certificados', topic: 'Certificaciones y auditorías', anchors: ['iso 9001', 'iatf', '16949', 'certificado', 'certificados', 'certificación', 'auditoría', 'auditorías', 'ppap'],
        reason: 'Los certificados del sistema de gestión, los PPAP y los informes de auditoría no están entre los documentos indexados.' },
      { id: 'medioambiente', topic: 'Medio ambiente y sostenibilidad', anchors: ['iso 14001', 'medio ambiente', 'medioambiental', 'residuos', 'taladrina', 'huella', 'carbono', 'emisiones', 'esg'],
        reason: 'Ningún documento indexado trata la gestión ambiental, los residuos (taladrinas, aceites) ni la huella de carbono.' },
      { id: 'precio', topic: 'Precios y costes', anchors: ['precio', 'precios', 'cuesta', 'coste', 'costes', 'tarifa', 'euros', 'presupuesto', 'garantía comercial'],
        reason: 'Precios, costes y condiciones comerciales no forman parte de los procedimientos indexados.' },
      { id: 'personal', topic: 'Condiciones laborales', anchors: ['vacaciones', 'nómina', 'salario', 'sueldo', 'convenio', 'contrato', 'horario', 'turnos de noche'],
        reason: 'Las condiciones laborales no forman parte de los procedimientos indexados.' }
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
})('maquinaria');
