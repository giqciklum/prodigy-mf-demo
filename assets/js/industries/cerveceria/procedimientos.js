/* Cervecera Bardenas · consulta de procedimientos con citas. Documentos ficticios, coherentes con HISTORIAS.md. */
agenticPack('cerveceria', {
  procedimientos: {
    section: 'Calidad',
    nav: 'Procedimientos',
    title: 'Preguntar a los procedimientos',
    agent: 'Procedimientos',
    system: 'Gestor documental',
    source: 'Gestor documental de Calidad · documentos controlados',
    indexed_at: '2026-09-29T06:00',
    doc_org: 'Cervecera Bardenas · Calidad',
    ui: {
      page_title: 'Consulta de procedimientos de Calidad',
      intro_title: 'Pregunta sobre los procedimientos de la fábrica de Arguedas',
      intro_text: 'APPCC, fermentación, retirada, vidrio y limpieza CIP. Cada frase de la respuesta cita el documento y el apartado de donde sale. Si ningún documento indexado lo recoge, la consulta lo indica y no responde.',
      placeholder: 'Escribe una pregunta sobre los procedimientos de la fábrica',
      context_title: 'Aplicado a la fábrica de Arguedas hoy',
      permission: 'Calidad y Elaboración · Arguedas',
      asker_initials: 'TC',
      asker_role: 'Técnico de Calidad de turno',
      route_to: 'Responsable de Calidad'
    },
    report: { title: 'Consulta de procedimientos de Calidad', code_prefix: 'CON-PROC', filename: 'consulta-procedimientos', scope_label: 'Fábrica', scope: 'Arguedas' },
    presenter: {
      say: [
        'Consulta de los procedimientos de la fábrica: la respuesta sale solo de los documentos controlados, y cada frase lleva su cita al documento y al apartado.',
        'Hay seis documentos indexados: el plan APPCC, control de fermentación, retirada de producto, vidrio y cuerpos extraños, limpieza CIP y la especificación de Bardenas Lager. Aquí son sintéticos; en el piloto, los suyos vigentes.'
      ],
      say_empty: 'Sirve en auditorías BRCGS o IFS, para formar a operadores de bodega y envasado y para contestar a un cliente o a un importador con la referencia exacta.',
      say_answered: 'Al pulsar una cita se abre el documento con el pasaje exacto resaltado. Y la respuesta se cruza con lo que pasa hoy: el fermentador FV-12, los barriles oxidados del lote L2608-K14 o su simulacro de retirada.',
      say_none: 'Cuando no hay fuente lo dice y no inventa: ni respuesta ni cita. Si el tema está en un documento que no está indexado, lo nombra (PR-COM-001) y permite derivar la pregunta a Calidad.',
      next_empty: 'Pulsar «¿Qué hay que hacer si un fermentador supera su temperatura límite?» y después la cita 1 para ver el pasaje resaltado.',
      next_answered: 'Escribir una pregunta sin fuente, por ejemplo «¿Qué tiene que llevar la etiqueta para el Reino Unido?», y pulsar «Preguntar».',
      next_done: 'Pasar a la siguiente escena con la flecha derecha.'
    },

    docs: [
      {
        code: 'APPCC-01',
        title: 'Plan APPCC de la fábrica de Arguedas',
        short: 'Plan APPCC',
        type: 'Plan APPCC',
        version: '9',
        date: '2026-02-05',
        owner: 'Equipo APPCC',
        summary: 'Tres PCC (pasteurización en túnel, pasteurización flash de barril e inspección de botella vacía); gluten declarado en todas las referencias; reclamaciones acusadas en 24 h y respondidas en 48 h.',
        sections: [
          { id: '1', heading: '1. Alcance', text: [
            'Analiza los peligros y define los controles de la elaboración y el envasado de Bardenas Lager, Bardenas Tostada y Bardenas Sin en la fábrica de Arguedas, desde la recepción de malta, lúpulo, agua y CO₂ hasta la expedición de botella, lata y barril.'
          ] },
          { id: '2', heading: '2. Equipo APPCC', text: [
            'Lo forman el Responsable de Calidad (coordinador), el Maestro cervecero, el Jefe de mantenimiento, el Responsable de envasado y el Responsable de logística.',
            'El plan se revisa cada año y con cada cambio de proceso, de producto o de envase.'
          ] },
          { id: '3', heading: '3. Puntos de control crítico', list: [
            'PCC-1 · Pasteurización en túnel (botella y lata): entre 15 y 25 unidades de pasteurización (UP); por debajo de 15 UP, el producto se retiene y se repasteuriza o se destruye.',
            'PCC-2 · Pasteurización flash (barril): 20 UP como mínimo a 72 °C; si el registro baja del mínimo, el pasteurizador desvía automáticamente la cerveza al tanque de retorno.',
            'PCC-3 · Inspección de botella vacía (EBI): rechazo de botellas con fragmentos de vidrio o cuerpos extraños, verificada con botellas testigo al inicio de cada turno y cada 2 h, según PR-ENV-002.'
          ] },
          { id: '4', heading: '4. Peligros controlados por prerrequisitos', list: [
            'Micotoxinas y plaguicidas en la malta: certificado de análisis de cada lote del proveedor y plan analítico anual.',
            'Alérgenos: la cebada malteada contiene gluten, que se declara en la etiqueta de todas las referencias; Bardenas Sin también contiene gluten.',
            'Restos de productos de limpieza: verificación del aclarado final del CIP por conductividad, según PR-LIM-001.',
            'Vidrio: política de vidrio y registro de roturas, según PR-ENV-002.'
          ] },
          { id: '5', heading: '5. Peligros de calidad', text: [
            'La oxidación (sabor a cartón), el diacetilo y la contaminación por levaduras salvajes no son peligros para la salud: se controlan como parámetros de calidad en la especificación de producto (ET-PT-001) y con PR-FER-003.'
          ] },
          { id: '6', heading: '6. Reclamaciones de clientes', text: [
            'Toda reclamación de cliente se acusa en 24 h y se responde en 48 h con la contención aplicada; la causa se comunica solo cuando hay evidencia.',
            'Las reclamaciones de seguridad alimentaria (cuerpos extraños, envase roto o síntomas) se comunican en el día al Responsable de Calidad, que valora la retirada según PR-CAL-006.',
            'Las reclamaciones de calidad sensorial se investigan con el análisis en LIMS LabWare de las muestras retenidas del mismo lote.'
          ] },
          { id: '7', heading: '7. Verificación', text: [
            'El equipo APPCC verifica el plan cada año con la revisión de los registros de PCC, las reclamaciones, los análisis y las auditorías.'
          ] },
          { id: '8', heading: '8. Referencias', refs: true, list: [
            'Reglamento (CE) 852/2004, relativo a la higiene de los productos alimenticios.',
            'Codex Alimentarius CXC 1-1969, Principios generales de higiene de los alimentos (rev. 2022).',
            'Real Decreto 678/2016, norma de calidad de la cerveza.'
          ] }
        ]
      },
      {
        code: 'PR-FER-003',
        title: 'Control de fermentación y guarda',
        short: 'Control de fermentación',
        type: 'Procedimiento',
        version: '5',
        date: '2026-02-24',
        owner: 'Elaboración',
        summary: 'Lager a 12 °C con límite de 13,5 °C. Más de 2 h por encima del límite: retención del lote hasta la decisión del Maestro cervecero; por encima de 15 °C, desviación crítica con diacetilo y acetaldehído en LIMS cada 12 h.',
        sections: [
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Controlar la temperatura y la evolución de la fermentación y de la guarda en los fermentadores cilindrocónicos FV-01 a FV-16, para obtener el perfil de cada cerveza y evitar defectos.'
          ] },
          { id: '2', heading: '2. Consignas por producto', list: [
            'Bardenas Lager: fermentación principal a 12 °C, con límite de 13,5 °C; reposo de diacetilo a 14 °C al llegar al 80 % de atenuación; guarda a −1 °C.',
            'Bardenas Tostada: fermentación a 13 °C, con límite de 14,5 °C.',
            'Bardenas Sin: fermentación a 10 °C con levadura de baja atenuación, con límite de 11,5 °C.'
          ] },
          { id: '3', heading: '3. Vigilancia', list: [
            'SCADA bodega registra la temperatura de cada fermentador cada minuto y regula las camisas de glicol con la válvula VG de cada tanque.',
            'El extracto (°Plato) y el pH se miden cada 24 h y se registran en Brewmaxx.',
            'SCADA bodega da alarma cuando la temperatura supera el límite del producto.'
          ] },
          { id: '4', heading: '4. Desviaciones de temperatura', text: [
            'Por encima del límite durante 2 h o menos: Mantenimiento corrige la refrigeración y el lote sigue su curso, con la desviación anotada en Brewmaxx.',
            'Por encima del límite durante más de 2 h: retención del lote en Brewmaxx y en SAP, sin trasiego ni filtración hasta la decisión del Maestro cervecero.',
            'Por encima de 15 °C en una Lager, la desviación es crítica: además de la retención, se analizan en LIMS LabWare el diacetilo y el acetaldehído cada 12 h y se cata el lote antes de cualquier trasiego.'
          ] },
          { id: '5', heading: '5. Criterios de liberación del lote', list: [
            'Diacetilo total (VDK) por debajo de 0,10 mg/l antes de bajar a guarda.',
            'Acetaldehído por debajo de 10 mg/l.',
            'Cata conforme del panel interno, con al menos tres catadores entrenados.',
            'Si el lote no cumple tras alargar el reposo, el Maestro cervecero decide mezclarlo dentro de los límites de la especificación, reclasificarlo o destruirlo.'
          ] },
          { id: '6', heading: '6. Responsabilidades', list: [
            'Maestro cervecero: decide la retención, el reposo adicional y el destino del lote.',
            'Calidad: toma las muestras y valida los análisis del LIMS.',
            'Jefe de mantenimiento: repara la refrigeración con prioridad urgente.',
            'Jefa de producción: reprograma el trasiego, la filtración y el envasado afectados.'
          ] },
          { id: '7', heading: '7. Registros', list: [
            'Curvas de temperatura: SCADA bodega.',
            'Retenciones y decisiones: Brewmaxx y SAP.',
            'Análisis: LIMS LabWare.'
          ] }
        ]
      },
      {
        code: 'PR-CAL-006',
        title: 'Retirada de producto',
        short: 'Retirada de producto',
        type: 'Procedimiento',
        version: '4',
        date: '2026-01-15',
        owner: 'Calidad',
        summary: 'Comité de crisis en 1 h; trazabilidad completa del lote en 4 h; bloqueo inmediato en SAP y WMS, aviso a clientes y recogida en 48 h; notificación inmediata a la autoridad sanitaria si es de seguridad.',
        sections: [
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Retirar del mercado, y si es necesario recuperar, un producto que no es seguro o que incumple de forma grave su especificación, con trazabilidad completa y en el menor tiempo posible. Aplica a botella, lata y barril.'
          ] },
          { id: '2', heading: '2. Decisión', text: [
            'Decide la retirada el Comité de crisis (Jefa de producción, Responsable de Calidad, Maestro cervecero y Responsable de logística), convocado en 1 h desde que se conoce el problema.',
            'Retirada de seguridad: el producto puede dañar la salud. Retirada de calidad: defecto grave sin riesgo para la salud, como la oxidación o una carbonatación anómala.'
          ] },
          { id: '3', heading: '3. Trazabilidad', list: [
            'Hacia atrás: lote de envasado → tanque de guarda → fermentador → cocimiento → lotes de malta, lúpulo, levadura, agua y CO₂ (Brewmaxx y SAP).',
            'Hacia delante: palés y barriles por cliente (WMS Mecalux y SAP).',
            'Los barriles se siguen por número de barril y lote de llenado; los barriles vacíos devueltos se registran al volver.',
            'Objetivo: trazabilidad completa del lote en 4 h desde la decisión.'
          ] },
          { id: '4', heading: '4. Ejecución', list: [
            'Bloqueo inmediato del stock del lote en SAP y en WMS Mecalux.',
            'Aviso a cada cliente en 2 h por teléfono y por escrito, con la instrucción de inmovilizar el producto.',
            'Recogida en un plazo de 48 h y registro de las unidades recuperadas.',
            'Los distribuidores avisan a sus clientes de hostelería y confirman las unidades localizadas.'
          ] },
          { id: '5', heading: '5. Autoridades', text: [
            'Si la retirada es de seguridad, se notifica de inmediato al Instituto de Salud Pública y Laboral de Navarra, que la traslada a la red de alerta SCIRI de AESAN.'
          ] },
          { id: '6', heading: '6. Cierre', text: [
            'El Responsable de Calidad cierra la retirada con el balance de unidades: envasadas, expedidas, en almacén, recuperadas y destruidas, con las diferencias justificadas.',
            'Se hace un simulacro de retirada al año, alternando botella, lata y barril.',
            'La comunicación pública, si procede, se prepara según PR-COM-001 (Comunicación de crisis).'
          ] },
          { id: '7', heading: '7. Referencias', refs: true, list: [
            'Reglamento (CE) 178/2002, artículos 18 y 19.',
            'APPCC-01 · Plan APPCC de la fábrica de Arguedas.'
          ] }
        ]
      },
      {
        code: 'PR-ENV-002',
        title: 'Gestión de vidrio y cuerpos extraños',
        short: 'Vidrio y cuerpos extraños',
        type: 'Procedimiento',
        version: '6',
        date: '2026-05-11',
        owner: 'Envasado',
        summary: 'Rotura en la llenadora: parar, eliminar las botellas del grifo afectado y de los 5 anteriores y posteriores, limpiar sin aire comprimido y purgar el grifo. EBI verificada con botellas testigo cada 2 h.',
        sections: [
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Evitar que fragmentos de vidrio u otros cuerpos extraños lleguen al producto en la línea de botella, y controlar el vidrio y los plásticos duros en toda la fábrica.'
          ] },
          { id: '2', heading: '2. Registro de vidrio', text: [
            'Todo el vidrio y el plástico duro de las zonas de producción (mirillas, lámparas y pantallas) figura en el registro de vidrio y se revisa cada mes.',
            'Las lámparas de las zonas con producto expuesto llevan protección antirrotura.'
          ] },
          { id: '3', heading: '3. Rotura en la llenadora', list: [
            'Parar la llenadora y la transportadora de entrada.',
            'Retirar y destruir las botellas del grifo afectado y de los 5 grifos anteriores y posteriores, y todas las botellas abiertas en un radio de 2 m.',
            'Limpiar con agua a presión el grifo y la estrella, y aspirar el vidrio; no usar aire comprimido.',
            'Purgar el grifo afectado con tres llenados en vacío antes de reanudar.',
            'Anotar la rotura en el registro de roturas con la hora, el grifo y las botellas eliminadas, y obtener la autorización de reanudación del jefe de turno.'
          ] },
          { id: '4', heading: '4. Inspección de botella vacía', list: [
            'La inspectora de botella vacía (EBI) rechaza botellas con fragmentos, suciedad o defectos de boca.',
            'Se verifica al inicio de cada turno y cada 2 h con un juego de botellas testigo: todas deben ser rechazadas.',
            'Si una verificación falla, se retiene el producto envasado desde la última verificación correcta y se inspecciona.'
          ] },
          { id: '5', heading: '5. Rotura de vidrio en otras zonas', text: [
            'Si se rompe vidrio en una zona de producción, se acota el área, se retira el producto expuesto, se limpia y Calidad revisa la zona antes de reanudar.'
          ] },
          { id: '6', heading: '6. Registros', list: [
            'Registro de vidrio y de roturas: Brewmaxx.',
            'Verificaciones de la EBI: hoja de PCC firmada por el operador y revisada por Calidad.'
          ] }
        ]
      },
      {
        code: 'PR-LIM-001',
        title: 'Limpieza CIP de bodega y envasado',
        short: 'Limpieza CIP',
        type: 'Procedimiento',
        version: '7',
        date: '2026-04-06',
        owner: 'Elaboración',
        summary: 'Sosa al 2 % a 80 °C, ácido al 1 % y ácido peracético a 150 ppm; aclarado final verificado por conductividad y ATP semanal en la llenadora (límite 150 RLU).',
        sections: [
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Limpiar y desinfectar en circuito cerrado (CIP) fermentadores, tanques de guarda, conducciones, filtros y llenadoras.'
          ] },
          { id: '2', heading: '2. Secuencia', list: [
            'Preaclarado con agua hasta que salga limpia.',
            'Sosa cáustica al 2 % a 80 °C durante 30 min.',
            'Aclarado intermedio con agua.',
            'Ácido nítrico-fosfórico al 1 % a 20 °C durante 20 min.',
            'Aclarado final con agua.',
            'Desinfección con ácido peracético a 150 ppm durante 15 min.'
          ] },
          { id: '3', heading: '3. Tanques con CO₂', text: [
            'En los tanques con atmósfera de CO₂, el CO₂ se purga con aire antes de la fase de sosa, porque la sosa lo absorbe y puede provocar la depresión y el colapso del tanque.',
            'Como alternativa, los tanques se limpian solo con ácido en atmósfera de CO₂, alternando con un ciclo de sosa cada cinco limpiezas.'
          ] },
          { id: '4', heading: '4. Frecuencias', list: [
            'Fermentadores y tanques de guarda: tras cada vaciado.',
            'Conducciones de mosto: tras cada cocimiento.',
            'Llenadoras de botella y de barril: al final de cada producción y como mínimo cada 24 h.'
          ] },
          { id: '5', heading: '5. Verificación', list: [
            'SCADA bodega registra la concentración y la temperatura de cada fase; si no se alcanzan, el ciclo no es válido y se repite.',
            'Aclarado final con una conductividad igual a la del agua de red, con una diferencia de 50 µS/cm como máximo.',
            'Hisopos de ATP en puntos críticos de la llenadora cada semana, con un límite de 150 RLU, y microbiología del agua del último aclarado.'
          ] },
          { id: '6', heading: '6. Seguridad', text: [
            'La sosa y el ácido se manipulan con gafas, pantalla facial y guantes; los tanques no se abren durante el ciclo.',
            'Antes de entrar en un tanque se consigna y se mide la concentración de CO₂ y de oxígeno.'
          ] },
          { id: '7', heading: '7. Registros', list: [
            'Ciclos CIP: SCADA bodega y Brewmaxx.',
            'Resultados de ATP y microbiología: LIMS LabWare.'
          ] }
        ]
      },
      {
        code: 'ET-PT-001',
        title: 'Especificación de producto terminado · Bardenas Lager',
        short: 'Especificación · Bardenas Lager',
        type: 'Especificación',
        version: '4',
        date: '2026-03-02',
        owner: 'Calidad',
        summary: 'Lager de 4,8 % vol con gluten; VDK < 0,10 mg/l; oxígeno disuelto en barril ≤ 50 ppb al llenado; consumo preferente de 6 meses en barril; lote L<aa><mm>-<línea><nº>.',
        sections: [
          { id: '1', heading: '1. Producto', text: [
            'Cerveza rubia de baja fermentación tipo Lager, filtrada y pasteurizada. Formatos: botella de 33 cl, lata de 33 cl y barril de 30 l.'
          ] },
          { id: '2', heading: '2. Ingredientes y alérgenos', text: [
            'Ingredientes: agua, malta de cebada, maíz y lúpulo.',
            'Alérgenos: contiene gluten (cebada). No es apta para personas celíacas.'
          ] },
          { id: '3', heading: '3. Parámetros analíticos', list: [
            'Grado alcohólico: 4,8 % vol (± 0,3).',
            'Extracto original: 11,5 °Plato.',
            'Amargor: 20 IBU (± 3).',
            'Color: 8 EBC (± 2).',
            'Diacetilo total (VDK): por debajo de 0,10 mg/l.',
            'Oxígeno total en envase (TPO): 150 ppb como máximo en botella y lata; oxígeno disuelto en barril: 50 ppb como máximo al llenado.',
            'CO₂: 5,0 g/l (± 0,2).'
          ] },
          { id: '4', heading: '4. Vida útil y conservación', text: [
            'Consumo preferente: botella y lata, 12 meses; barril, 6 meses.',
            'Conservar en lugar fresco y protegido de la luz; los barriles, entre 4 y 20 °C. Un barril pinchado se consume en 30 días.'
          ] },
          { id: '5', heading: '5. Oxidación', text: [
            'La oxidación da sabor a cartón o a papel mojado y aparece antes con temperaturas altas de almacenamiento y con oxígeno alto en el llenado.',
            'Ante una sospecha, se analizan en LIMS LabWare las muestras retenidas del lote: oxígeno disuelto de llenado, trans-2-nonenal y cata.'
          ] },
          { id: '6', heading: '6. Código de lote', text: [
            'Formato L<aa><mm>-<línea><nº>. Ejemplo: L2608-K14 es el lote 14 de la línea de barriles (K) de agosto de 2026.'
          ] },
          { id: '7', heading: '7. Muestras retenidas', text: [
            'Se guardan tres envases de cada lote hasta seis meses después de su consumo preferente.'
          ] }
        ]
      }
    ],

    unindexed: {
      'PR-COM-001': { title: 'Comunicación de crisis', mentionedIn: { doc: 'PR-CAL-006', sec: '6', quote: 'según PR-COM-001 (Comunicación de crisis)' } }
    },

    suggested: ['fermentacion', 'oxidacion', 'retirada', 'rotura-vidrio', 'cip', 'gluten'],

    intents: [
      {
        id: 'fermentacion', icon: 'thermometer', topic: 'Fermentación · desviación de temperatura', scope: 'all',
        q: '¿Qué hay que hacer si un fermentador supera su temperatura límite?',
        anchors: ['fermentador', 'fermentadores', 'fermentación', 'temperatura', 'glicol', 'fv-12'],
        terms: ['supera', 'sube', 'límite', 'alarma', 'hacer', 'calienta', 'retener', 'retención', 'lote', 'grados', 'horas'],
        min: 3,
        blocks: [
          { t: 'Si está por encima del límite 2 h o menos, Mantenimiento corrige la refrigeración y el lote sigue, anotando la desviación en Brewmaxx.', c: [['PR-FER-003', 4, 'Por encima del límite durante 2 h o menos: Mantenimiento corrige la refrigeración y el lote sigue su curso']] },
          { t: 'Si pasa de 2 h, el lote se retiene en Brewmaxx y SAP, sin trasiego ni filtración hasta que decida el Maestro cervecero.', c: [['PR-FER-003', 4, 'Por encima del límite durante más de 2 h: retención del lote en Brewmaxx y en SAP, sin trasiego ni filtración hasta la decisión del Maestro cervecero.']] },
          { t: 'En una Lager, por encima de 15 °C la desviación es crítica: diacetilo y acetaldehído en LIMS cada 12 h y cata antes de cualquier trasiego.', c: [['PR-FER-003', 4, 'Por encima de 15 °C en una Lager, la desviación es crítica: además de la retención, se analizan en LIMS LabWare el diacetilo y el acetaldehído cada 12 h y se cata el lote antes de cualquier trasiego.']] },
          { t: 'La consigna de Bardenas Lager es 12 °C, con límite de 13,5 °C.', c: [['PR-FER-003', 2, 'Bardenas Lager: fermentación principal a 12 °C, con límite de 13,5 °C']] }
        ],
        context: {
          systems: ['SCADA bodega', 'Brewmaxx (MES)', 'LIMS LabWare'],
          text: 'FV-12 (Bardenas Lager, lote de mosto L2609-FV12, 480 hl, día 3): 16,8 °C desde las 02:30 por fallo de la válvula de glicol VG-12, con pico de 17,1 °C a las 05:20. Más de 2 h por encima de 13,5 °C y por encima de 15 °C: desviación crítica según el apartado 4.',
          outcome: 'alarma',
          go: 'alarma', goLabel: 'Abrir alarma FV-12'
        },
        followups: ['liberacion', 'fermentacion-quien']
      },
      {
        id: 'liberacion', icon: 'flask', topic: 'Fermentación · liberación del lote', scope: 'all',
        q: '¿Qué análisis hacen falta para liberar un lote retenido en fermentación?',
        anchors: ['diacetilo', 'vdk', 'acetaldehído', 'liberar', 'liberación', 'cata'],
        terms: ['análisis', 'lote', 'retenido', 'fermentación', 'mg/l', 'criterios', 'guarda', 'destino'],
        min: 3,
        blocks: [
          { list: [
            { t: 'Diacetilo total (VDK) por debajo de 0,10 mg/l antes de bajar a guarda.', c: [['PR-FER-003', 5, 'Diacetilo total (VDK) por debajo de 0,10 mg/l antes de bajar a guarda.']] },
            { t: 'Acetaldehído por debajo de 10 mg/l.', c: [['PR-FER-003', 5, 'Acetaldehído por debajo de 10 mg/l.']] },
            { t: 'Cata conforme del panel interno, con al menos tres catadores entrenados.', c: [['PR-FER-003', 5, 'Cata conforme del panel interno, con al menos tres catadores entrenados.']] }
          ] },
          { t: 'Si no cumple tras alargar el reposo, el Maestro cervecero decide mezclarlo dentro de especificación, reclasificarlo o destruirlo.', c: [['PR-FER-003', 5, 'Si el lote no cumple tras alargar el reposo, el Maestro cervecero decide mezclarlo dentro de los límites de la especificación, reclasificarlo o destruirlo.']] }
        ],
        context: {
          systems: ['LIMS LabWare', 'Brewmaxx (MES)'],
          text: 'El lote L2609-FV12 del FV-12 queda retenido: Calidad toma muestras para diacetilo y acetaldehído en LIMS cada 12 h.',
          outcome: 'alarma',
          go: 'alarma', goLabel: 'Abrir alarma FV-12'
        },
        followups: ['fermentacion', 'fermentacion-quien']
      },
      {
        id: 'fermentacion-quien', icon: 'users', topic: 'Fermentación · responsabilidades', scope: 'all',
        q: '¿Quién hace qué en una desviación de fermentación?',
        anchors: ['responsable', 'responsables', 'responsabilidades', 'quién hace', 'maestro cervecero'],
        terms: ['fermentación', 'desviación', 'fermentador', 'quién', 'decide', 'aprueba', 'trasiego'],
        min: 4,
        blocks: [
          { list: [
            { t: 'Maestro cervecero: decide la retención, el reposo adicional y el destino del lote.', c: [['PR-FER-003', 6, 'Maestro cervecero: decide la retención, el reposo adicional y el destino del lote.']] },
            { t: 'Calidad: toma las muestras y valida los análisis del LIMS.', c: [['PR-FER-003', 6, 'Calidad: toma las muestras y valida los análisis del LIMS.']] },
            { t: 'Jefe de mantenimiento: repara la refrigeración con prioridad urgente.', c: [['PR-FER-003', 6, 'Jefe de mantenimiento: repara la refrigeración con prioridad urgente.']] },
            { t: 'Jefa de producción: reprograma el trasiego, la filtración y el envasado afectados.', c: [['PR-FER-003', 6, 'Jefa de producción: reprograma el trasiego, la filtración y el envasado afectados.']] }
          ] }
        ],
        context: {
          systems: ['SCADA bodega', 'GMAO Maximo', 'Microsoft Teams'],
          text: 'En el FV-12 de hoy, Mantenimiento tiene que reparar la válvula de glicol VG-12 y Producción reprogramar el trasiego; la aprobación es del Maestro cervecero.',
          go: 'alarma', goLabel: 'Abrir alarma FV-12'
        },
        followups: ['fermentacion', 'liberacion']
      },
      {
        id: 'oxidacion', icon: 'alert-circle', topic: 'Calidad sensorial · oxidación', scope: 'all',
        q: '¿Qué hacemos si un cliente reclama barriles con sabor a cartón?',
        anchors: ['cartón', 'oxidación', 'oxidada', 'oxidado', 'oxidados', 'papel mojado', 'sabor'],
        terms: ['cliente', 'reclama', 'reclamación', 'barril', 'barriles', 'hacemos', 'análisis', 'lote', 'bares'],
        min: 2,
        blocks: [
          { t: 'Se acusa en 24 h y se responde en 48 h con la contención aplicada; la causa solo se comunica con evidencia.', c: [['APPCC-01', 6, 'Toda reclamación de cliente se acusa en 24 h y se responde en 48 h con la contención aplicada; la causa se comunica solo cuando hay evidencia.']] },
          { t: 'La oxidación no es un peligro para la salud: es un parámetro de calidad.', c: [['APPCC-01', 5, 'La oxidación (sabor a cartón), el diacetilo y la contaminación por levaduras salvajes no son peligros para la salud']] },
          { t: 'Se analizan en LIMS las muestras retenidas del lote: oxígeno disuelto de llenado, trans-2-nonenal y cata.', c: [['ET-PT-001', 5, 'Ante una sospecha, se analizan en LIMS LabWare las muestras retenidas del lote: oxígeno disuelto de llenado, trans-2-nonenal y cata.']] },
          { t: 'El barril admite 50 ppb de oxígeno disuelto como máximo al llenado; el almacenamiento caliente adelanta la oxidación.', c: [['ET-PT-001', 3, 'oxígeno disuelto en barril: 50 ppb como máximo al llenado'], ['ET-PT-001', 5, 'aparece antes con temperaturas altas de almacenamiento y con oxígeno alto en el llenado']] },
          { t: 'Si el defecto es grave, el Comité de crisis puede decidir una retirada de calidad.', c: [['PR-CAL-006', 2, 'Retirada de calidad: defecto grave sin riesgo para la salud, como la oxidación o una carbonatación anómala.']] }
        ],
        context: {
          systems: ['Outlook', 'LIMS LabWare', 'WMS Mecalux'],
          text: 'Distribuciones Hosteleras Ribera, S.L. reclama barriles de 30 l de Bardenas Lager con sabor a cartón en tres bares: lote L2608-K14, envasado el 18/08/2026. Respuesta en 48 h.',
          outcome: 'reclamacion',
          lot: 'L2608-K14',
          go: 'reclamacion', goLabel: 'Abrir reclamación L2608-K14'
        },
        followups: ['retirada', 'barril']
      },
      {
        id: 'barril', icon: 'box', topic: 'Especificación · barril', scope: 'all',
        q: '¿Cuál es la vida útil de un barril y cómo se conserva?',
        anchors: ['vida útil', 'consumo preferente', 'conservar', 'conserva', 'conservación', 'pinchado'],
        terms: ['barril', 'barriles', 'meses', 'días', 'temperatura', 'lager', 'botella', 'lata'],
        min: 2,
        blocks: [
          { t: 'Consumo preferente de 6 meses en barril y de 12 meses en botella y lata.', c: [['ET-PT-001', 4, 'Consumo preferente: botella y lata, 12 meses; barril, 6 meses.']] },
          { t: 'Los barriles se conservan entre 4 y 20 °C, protegidos de la luz, y un barril pinchado se consume en 30 días.', c: [['ET-PT-001', 4, 'los barriles, entre 4 y 20 °C. Un barril pinchado se consume en 30 días.']] }
        ],
        followups: ['oxidacion', 'lote']
      },
      {
        id: 'retirada', icon: 'truck', topic: 'Retirada de producto', scope: 'all',
        q: '¿Cómo se organiza una retirada de producto y en qué plazos?',
        anchors: ['retirada', 'retiradas', 'retirar', 'recall', 'recuperar', 'simulacro'],
        terms: ['plazo', 'plazos', 'cómo', 'organiza', 'clientes', 'lote', 'horas', 'comité', 'decide'],
        min: 2,
        blocks: [
          { t: 'La decide el Comité de crisis, convocado en 1 h desde que se conoce el problema.', c: [['PR-CAL-006', 2, 'Decide la retirada el Comité de crisis (Jefa de producción, Responsable de Calidad, Maestro cervecero y Responsable de logística), convocado en 1 h desde que se conoce el problema.']] },
          { t: 'Objetivo: trazabilidad completa del lote en 4 h, hacia atrás hasta las materias primas y hacia delante por cliente y número de barril.', c: [['PR-CAL-006', 3, 'Objetivo: trazabilidad completa del lote en 4 h desde la decisión.'], ['PR-CAL-006', 3, 'Los barriles se siguen por número de barril y lote de llenado']] },
          { list: [
            { t: 'Bloqueo inmediato del stock en SAP y WMS Mecalux.', c: [['PR-CAL-006', 4, 'Bloqueo inmediato del stock del lote en SAP y en WMS Mecalux.']] },
            { t: 'Aviso a cada cliente en 2 h con la instrucción de inmovilizar el producto; los distribuidores avisan a su hostelería.', c: [['PR-CAL-006', 4, 'Aviso a cada cliente en 2 h por teléfono y por escrito, con la instrucción de inmovilizar el producto.'], ['PR-CAL-006', 4, 'Los distribuidores avisan a sus clientes de hostelería y confirman las unidades localizadas.']] },
            { t: 'Recogida en 48 h.', c: [['PR-CAL-006', 4, 'Recogida en un plazo de 48 h y registro de las unidades recuperadas.']] }
          ] },
          { t: 'Se cierra con el balance de unidades, con las diferencias justificadas.', c: [['PR-CAL-006', 6, 'El Responsable de Calidad cierra la retirada con el balance de unidades: envasadas, expedidas, en almacén, recuperadas y destruidas, con las diferencias justificadas.']] }
        ],
        context: {
          systems: ['Brewmaxx (MES)', 'SAP S/4HANA', 'WMS Mecalux'],
          text: 'Simulacro con el lote de barril L2608-K14: 1.040 barriles llenados, 912 expedidos a 14 clientes, 96 en almacén y 32 retenidos por calidad; materias primas MAL-2607-05, LUP-2606-11 y CO2-2608-02. Objetivo: 4 h.',
          lot: 'L2608-K14',
          go: 'retirada', goLabel: 'Abrir simulacro L2608-K14'
        },
        followups: ['autoridades', 'comunicacion']
      },
      {
        id: 'autoridades', icon: 'building', topic: 'Retirada · autoridades', scope: 'all',
        q: '¿A quién se notifica una retirada de seguridad?',
        anchors: ['autoridad', 'autoridades', 'notifica', 'notificar', 'aesan', 'sciri', 'salud pública'],
        terms: ['retirada', 'seguridad', 'quién', 'avisar', 'inmediato'],
        min: 2,
        blocks: [
          { t: 'De inmediato al Instituto de Salud Pública y Laboral de Navarra, que la traslada a la red de alerta SCIRI de AESAN.', c: [['PR-CAL-006', 5, 'Si la retirada es de seguridad, se notifica de inmediato al Instituto de Salud Pública y Laboral de Navarra, que la traslada a la red de alerta SCIRI de AESAN.']] },
          { t: 'Una retirada por oxidación es de calidad, no de seguridad.', c: [['PR-CAL-006', 2, 'Retirada de calidad: defecto grave sin riesgo para la salud, como la oxidación o una carbonatación anómala.']] }
        ],
        followups: ['retirada']
      },
      {
        id: 'comunicacion', icon: 'globe', topic: 'Retirada · comunicación pública', scope: 'all', kind: 'partial',
        q: '¿Cómo se comunica públicamente una retirada?',
        anchors: ['comunicación pública', 'comunica públicamente', 'nota de prensa', 'prensa', 'medios', 'redes sociales', 'comunicado'],
        terms: ['retirada', 'cómo', 'público', 'consumidores'],
        min: 2,
        blocks: [
          { t: 'Si procede, la comunicación pública se prepara según PR-COM-001.', c: [['PR-CAL-006', 6, 'La comunicación pública, si procede, se prepara según PR-COM-001 (Comunicación de crisis).']] }
        ],
        note: 'PR-COM-001 (Comunicación de crisis) no está entre los documentos indexados: quién la redacta, quién la aprueba y por qué canales sale no se puede detallar desde esta consulta.',
        followups: ['retirada']
      },
      {
        id: 'rotura-vidrio', icon: 'alert-triangle', topic: 'Vidrio · rotura en la llenadora', scope: 'all',
        q: '¿Qué hay que hacer si se rompe una botella en la llenadora?',
        anchors: ['rotura', 'rompe', 'roto', 'botella', 'botellas', 'llenadora', 'vidrio', 'cristal'],
        terms: ['hacer', 'grifo', 'grifos', 'limpiar', 'parar', 'retirar', 'reanudar'],
        min: 3,
        blocks: [
          { list: [
            { t: 'Parar la llenadora y la transportadora de entrada.', c: [['PR-ENV-002', 3, 'Parar la llenadora y la transportadora de entrada.']] },
            { t: 'Destruir las botellas del grifo afectado y de los 5 anteriores y posteriores, y las abiertas en 2 m.', c: [['PR-ENV-002', 3, 'Retirar y destruir las botellas del grifo afectado y de los 5 grifos anteriores y posteriores, y todas las botellas abiertas en un radio de 2 m.']] },
            { t: 'Limpiar grifo y estrella con agua a presión y aspirar; nunca con aire comprimido.', c: [['PR-ENV-002', 3, 'Limpiar con agua a presión el grifo y la estrella, y aspirar el vidrio; no usar aire comprimido.']] },
            { t: 'Purgar el grifo con tres llenados en vacío.', c: [['PR-ENV-002', 3, 'Purgar el grifo afectado con tres llenados en vacío antes de reanudar.']] },
            { t: 'Anotar la rotura y reanudar solo con la autorización del jefe de turno.', c: [['PR-ENV-002', 3, 'Anotar la rotura en el registro de roturas con la hora, el grifo y las botellas eliminadas, y obtener la autorización de reanudación del jefe de turno.']] }
          ] }
        ],
        followups: ['ebi', 'pcc']
      },
      {
        id: 'ebi', icon: 'eye', topic: 'Vidrio · inspección de botella vacía', scope: 'all',
        q: '¿Cada cuánto se verifica la inspectora de botella vacía?',
        anchors: ['inspectora', 'ebi', 'botella vacía', 'botellas testigo', 'testigo'],
        terms: ['cada cuánto', 'verifica', 'verificar', 'verificación', 'frecuencia', 'falla', 'turno'],
        min: 2,
        blocks: [
          { t: 'Al inicio de cada turno y cada 2 h, con un juego de botellas testigo que deben ser rechazadas todas.', c: [['PR-ENV-002', 4, 'Se verifica al inicio de cada turno y cada 2 h con un juego de botellas testigo: todas deben ser rechazadas.']] },
          { t: 'Si falla, se retiene lo envasado desde la última verificación correcta y se inspecciona.', c: [['PR-ENV-002', 4, 'Si una verificación falla, se retiene el producto envasado desde la última verificación correcta y se inspecciona.']] },
          { t: 'Es el PCC-3 del plan APPCC.', c: [['APPCC-01', 3, 'PCC-3 · Inspección de botella vacía (EBI)']] }
        ],
        followups: ['rotura-vidrio', 'pcc']
      },
      {
        id: 'pcc', icon: 'shield-check', topic: 'APPCC · puntos de control crítico', scope: 'all',
        q: '¿Cuáles son los puntos de control crítico de la fábrica?',
        anchors: ['pcc', 'puntos de control crítico', 'punto de control crítico', 'appcc', 'pasteurización', 'up'],
        terms: ['cuáles', 'fábrica', 'límites', 'críticos', 'barril', 'botella'],
        min: 2,
        blocks: [
          { list: [
            { t: 'PCC-1, pasteurización en túnel de botella y lata: de 15 a 25 UP; por debajo de 15 UP, retención.', c: [['APPCC-01', 3, 'PCC-1 · Pasteurización en túnel (botella y lata): entre 15 y 25 unidades de pasteurización (UP); por debajo de 15 UP, el producto se retiene y se repasteuriza o se destruye.']] },
            { t: 'PCC-2, pasteurización flash de barril: 20 UP como mínimo a 72 °C, con desvío automático si baja.', c: [['APPCC-01', 3, 'PCC-2 · Pasteurización flash (barril): 20 UP como mínimo a 72 °C; si el registro baja del mínimo, el pasteurizador desvía automáticamente la cerveza al tanque de retorno.']] },
            { t: 'PCC-3, inspección de botella vacía, verificada con botellas testigo cada 2 h.', c: [['APPCC-01', 3, 'PCC-3 · Inspección de botella vacía (EBI): rechazo de botellas con fragmentos de vidrio o cuerpos extraños, verificada con botellas testigo al inicio de cada turno y cada 2 h, según PR-ENV-002.']] }
          ] },
          { t: 'El equipo APPCC verifica el plan cada año.', c: [['APPCC-01', 7, 'El equipo APPCC verifica el plan cada año con la revisión de los registros de PCC, las reclamaciones, los análisis y las auditorías.']] }
        ],
        followups: ['gluten', 'ebi']
      },
      {
        id: 'gluten', icon: 'leaf', topic: 'Alérgenos · gluten', scope: 'all',
        q: '¿Nuestras cervezas contienen gluten?',
        anchors: ['gluten', 'alérgeno', 'alérgenos', 'celíaco', 'celíacos', 'celíacas', 'cebada'],
        terms: ['cerveza', 'cervezas', 'contienen', 'lleva', 'apta', 'sin', 'etiqueta'],
        min: 2,
        blocks: [
          { t: 'Sí: la cebada malteada contiene gluten, que se declara en la etiqueta de todas las referencias, también en Bardenas Sin.', c: [['APPCC-01', 4, 'Alérgenos: la cebada malteada contiene gluten, que se declara en la etiqueta de todas las referencias; Bardenas Sin también contiene gluten.']] },
          { t: 'Bardenas Lager no es apta para personas celíacas.', c: [['ET-PT-001', 2, 'Alérgenos: contiene gluten (cebada). No es apta para personas celíacas.']] }
        ],
        context: {
          systems: ['SAP S/4HANA'],
          text: 'Northgate Beverages Ltd pregunta por el gluten en su cuestionario de homologación: la respuesta es esta, con la referencia a APPCC-01 y ET-PT-001.',
          go: 'cuestionario', goLabel: 'Abrir cuestionario de Northgate'
        },
        followups: ['pcc', 'lote']
      },
      {
        id: 'cip', icon: 'droplet', topic: 'Limpieza CIP', scope: 'all',
        q: '¿Cuál es la secuencia de limpieza CIP de un fermentador?',
        anchors: ['cip', 'limpieza', 'limpia', 'sosa', 'ácido', 'peracético', 'desinfección'],
        terms: ['secuencia', 'fermentador', 'tanque', 'pasos', 'temperatura', 'concentración', 'cómo'],
        min: 2,
        blocks: [
          { list: [
            { t: 'Preaclarado con agua.', c: [['PR-LIM-001', 2, 'Preaclarado con agua hasta que salga limpia.']] },
            { t: 'Sosa cáustica al 2 % a 80 °C durante 30 min.', c: [['PR-LIM-001', 2, 'Sosa cáustica al 2 % a 80 °C durante 30 min.']] },
            { t: 'Aclarado y ácido nítrico-fosfórico al 1 % a 20 °C durante 20 min.', c: [['PR-LIM-001', 2, 'Ácido nítrico-fosfórico al 1 % a 20 °C durante 20 min.']] },
            { t: 'Aclarado final y desinfección con ácido peracético a 150 ppm durante 15 min.', c: [['PR-LIM-001', 2, 'Desinfección con ácido peracético a 150 ppm durante 15 min.']] }
          ] },
          { t: 'En un tanque con CO₂, se purga el CO₂ con aire antes de la sosa para evitar que el tanque colapse.', c: [['PR-LIM-001', 3, 'el CO₂ se purga con aire antes de la fase de sosa, porque la sosa lo absorbe y puede provocar la depresión y el colapso del tanque']] },
          { t: 'Los fermentadores se limpian tras cada vaciado.', c: [['PR-LIM-001', 4, 'Fermentadores y tanques de guarda: tras cada vaciado.']] }
        ],
        followups: ['cip-verificacion']
      },
      {
        id: 'cip-verificacion', icon: 'check-circle', topic: 'Limpieza CIP · verificación', scope: 'all',
        q: '¿Cómo se verifica que una limpieza CIP es correcta?',
        anchors: ['verifica', 'verificación', 'conductividad', 'atp', 'rlu', 'aclarado'],
        terms: ['cip', 'limpieza', 'correcta', 'válido', 'llenadora', 'límite'],
        min: 3,
        blocks: [
          { t: 'SCADA bodega registra concentración y temperatura de cada fase; si no se alcanzan, el ciclo se repite.', c: [['PR-LIM-001', 5, 'SCADA bodega registra la concentración y la temperatura de cada fase; si no se alcanzan, el ciclo no es válido y se repite.']] },
          { t: 'El aclarado final debe tener la conductividad del agua de red, con 50 µS/cm de diferencia como máximo.', c: [['PR-LIM-001', 5, 'Aclarado final con una conductividad igual a la del agua de red, con una diferencia de 50 µS/cm como máximo.']] },
          { t: 'Cada semana, hisopos de ATP en la llenadora con límite de 150 RLU y microbiología del último aclarado.', c: [['PR-LIM-001', 5, 'Hisopos de ATP en puntos críticos de la llenadora cada semana, con un límite de 150 RLU, y microbiología del agua del último aclarado.']] }
        ],
        followups: ['cip']
      },
      {
        id: 'lote', icon: 'barcode', topic: 'Código de lote', scope: 'all',
        q: '¿Cómo se lee el código de lote de un barril?',
        anchors: ['código de lote', 'formato de lote', 'l2608', 'l2608-k14'],
        terms: ['lote', 'código', 'leer', 'lee', 'significa', 'barril', 'línea'],
        min: 2,
        blocks: [
          { t: 'Formato L<aa><mm>-<línea><nº>: L2608-K14 es el lote 14 de la línea de barriles (K) de agosto de 2026.', c: [['ET-PT-001', 6, 'Formato L<aa><mm>-<línea><nº>. Ejemplo: L2608-K14 es el lote 14 de la línea de barriles (K) de agosto de 2026.']] },
          { t: 'De cada lote se guardan tres envases hasta seis meses después de su consumo preferente.', c: [['ET-PT-001', 7, 'Se guardan tres envases de cada lote hasta seis meses después de su consumo preferente.']] }
        ],
        context: {
          systems: ['Brewmaxx (MES)', 'SAP S/4HANA', 'WMS Mecalux'],
          text: 'Traza completa del lote del ejemplo, que es el de la reclamación y el simulacro de hoy:',
          lot: 'L2608-K14'
        },
        followups: ['retirada', 'barril']
      }
    ],

    gaps: [
      { id: 'etiquetado-uk', topic: 'Etiquetado para el Reino Unido', anchors: ['reino unido', 'uk', 'ukca', 'etiquetado británico', 'etiqueta para el reino unido', 'unidades de alcohol', 'importador'],
        reason: 'Ningún documento indexado trata el etiquetado para el Reino Unido (unidades de alcohol, dirección del importador, advertencias).' },
      { id: 'certificados', topic: 'Certificaciones y auditorías', anchors: ['brcgs', 'brc', 'ifs', 'certificado', 'certificados', 'certificación', 'auditoría externa'],
        reason: 'Los certificados y los informes de auditoría no están entre los documentos indexados.' },
      { id: 'sostenibilidad', topic: 'Sostenibilidad y envases', anchors: ['sostenibilidad', 'huella', 'carbono', 'emisiones', 'reciclaje', 'reciclable', 'agua por litro', 'sddr', 'retornable'],
        reason: 'Ningún documento indexado trata la sostenibilidad, la huella de carbono ni el reciclaje de envases.' },
      { id: 'crisis', topic: 'Comunicación de crisis', anchors: ['portavoz', 'rueda de prensa', 'pr-com-001', 'gabinete de crisis'],
        reason: 'Ningún documento indexado describe la comunicación de crisis con medios y redes sociales.', related: 'PR-COM-001' },
      { id: 'precio', topic: 'Precios y condiciones comerciales', anchors: ['precio', 'precios', 'cuesta', 'coste', 'tarifa', 'descuento', 'rappel', 'euros'],
        reason: 'Precios y condiciones comerciales no forman parte de los procedimientos de Calidad indexados.' },
      { id: 'personal', topic: 'Condiciones laborales', anchors: ['vacaciones', 'nómina', 'salario', 'sueldo', 'convenio', 'contrato', 'horario'],
        reason: 'Las condiciones laborales no forman parte de los procedimientos de Calidad indexados.' }
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
})('cerveceria');
