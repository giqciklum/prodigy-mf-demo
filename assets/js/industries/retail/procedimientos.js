/* Mercados Moncayo · consulta de procedimientos con citas. Documentos ficticios, coherentes con HISTORIAS.md. */
agenticPack('retail', {
  procedimientos: {
    section: 'Calidad',
    nav: 'Procedimientos',
    title: 'Preguntar a los procedimientos',
    agent: 'Procedimientos',
    system: 'ServiceNow',
    source: 'ServiceNow · gestor documental de Calidad',
    indexed_at: '2026-09-29T06:00',
    doc_org: 'Mercados Moncayo · Calidad',
    ui: {
      page_title: 'Consulta de procedimientos de Calidad',
      intro_title: 'Pregunta sobre los procedimientos de Calidad de tiendas y plataforma',
      intro_text: 'Cadena de frío, alertas y retiradas, reclamaciones y marca propia. Cada frase de la respuesta cita el documento y el apartado de donde sale. Si ningún documento indexado lo recoge, la consulta lo indica y no responde.',
      placeholder: 'Escribe una pregunta sobre los procedimientos de Calidad',
      context_title: 'Aplicado a tiendas y plataforma hoy',
      permission: 'Calidad · tiendas y plataforma',
      asker_initials: 'TC',
      asker_role: 'Técnico de Calidad de guardia',
      route_to: 'Responsable de Calidad'
    },
    report: { title: 'Consulta de procedimientos de Calidad', code_prefix: 'CON-PROC', filename: 'consulta-procedimientos', scope_label: 'Ámbito', scope: 'Plataforma de Plaza y 64 tiendas' },
    presenter: {
      say: [
        'Consulta de los procedimientos de Calidad: la respuesta sale solo de los documentos controlados, y cada frase lleva su cita al documento y al apartado.',
        'Hay seis documentos indexados: cadena de frío en tienda, alertas y retiradas, reclamaciones de consumidores, homologación de proveedores de marca propia, limpieza de murales y la ficha técnica del tomate frito Moncayo. Aquí son sintéticos; en el piloto, los suyos vigentes.'
      ],
      say_empty: 'Sirve para que un encargado de tienda actúe bien a las seis de la mañana, para preparar la auditoría IFS y para contestar a un consumidor con la referencia exacta.',
      say_answered: 'Al pulsar una cita se abre el documento con el pasaje exacto resaltado. Y la respuesta se cruza con lo que pasa hoy: el mural MR-3 de Huesca Centro, la reclamación del tomate frito o el simulacro del lote L26214.',
      say_none: 'Cuando no hay fuente lo dice y no inventa: ni respuesta ni cita. Si el tema está en un documento que no está indexado, lo nombra (PR-CAL-011) y permite derivar la pregunta a Calidad.',
      next_empty: 'Pulsar «¿Qué hay que hacer si un mural de refrigerados supera 5 °C?» y después la cita 1 para ver el pasaje resaltado.',
      next_answered: 'Escribir una pregunta sin fuente, por ejemplo «¿Cada cuánto se revisan los cebos de roedores?», y pulsar «Preguntar».',
      next_done: 'Pasar a la siguiente escena con la flecha derecha.'
    },

    docs: [
      {
        code: 'APPCC-TIE-01',
        title: 'Cadena de frío en tienda',
        short: 'Cadena de frío en tienda',
        type: 'Plan APPCC',
        version: '5',
        date: '2026-05-04',
        owner: 'Calidad',
        summary: 'Refrigerados a 5 °C como máximo. Más de 5 °C durante más de 2 h: bloqueo de venta en TPV y retirada del lineal; por encima de 8 °C, rotura crítica y destrucción. Aprueba el Responsable de Calidad.',
        sections: [
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Mantener la temperatura de los productos refrigerados y congelados desde su recepción en tienda hasta su venta, y actuar cuando falla un equipo de frío.',
            'Aplica a las 64 tiendas de Mercados Moncayo: murales, vitrinas, islas de congelado y cámaras.'
          ] },
          { id: '2', heading: '2. Temperaturas máximas', list: [
            'Lácteos, postres, carne y pescado envasados y platos preparados refrigerados: 5 °C como máximo en el producto.',
            'Frutas y verduras de cuarta gama: 4 °C como máximo.',
            'Congelados: −18 °C, con una tolerancia de 3 °C durante la reposición y el desescarche.',
            'Cámaras de tienda: refrigeración entre 0 y 4 °C; congelación a −20 °C o menos.'
          ] },
          { id: '3', heading: '3. Vigilancia', list: [
            'Cada mural y cada cámara tienen sondas conectadas a Sensores de frío, con lectura cada 5 min y alarma a la tienda y a la Central de frío.',
            'El encargado de tienda revisa y firma la hoja de temperaturas al abrir y al cerrar.',
            'Las alarmas fuera del horario de apertura las atiende la Central de frío, que avisa al encargado de guardia y a Mantenimiento de frío.'
          ] },
          { id: '4', heading: '4. Criterios de actuación', text: [
            'Producto por encima de 5 °C durante 2 h o menos: se traslada a la cámara de la tienda y puede volver a la venta cuando el mural se recupere, anotándolo en la hoja de temperaturas.',
            'Producto por encima de 5 °C durante más de 2 h: bloqueo de venta en el TPV de las referencias expuestas y retirada del lineal; el Responsable de Calidad decide su destino.',
            'Por encima de 8 °C en cualquier momento, la rotura de la cadena de frío es crítica: el producto expuesto no se vende y se destruye, salvo frutas y verduras enteras.',
            'Congelados por encima de −15 °C: se tratan como descongelados y no se vuelven a congelar ni a vender.'
          ] },
          { id: '5', heading: '5. Responsabilidades', list: [
            'Encargado de tienda: traslada el producto, retira lo expuesto y anota la incidencia.',
            'Mantenimiento de frío: atiende la avería con prioridad urgente (4 h) si hay producto expuesto y registra la intervención en ServiceNow.',
            'Responsable de Calidad: aprueba el bloqueo de venta y decide el destino del producto.',
            'Jefe de zona de tiendas: repone el surtido si la retirada deja el lineal vacío.'
          ] },
          { id: '6', heading: '6. Registro', list: [
            'La alarma de Sensores de frío queda asociada a la orden de trabajo de ServiceNow.',
            'Bloqueos de venta: SAP S/4 Retail y TPV de tiendas, con la referencia de la alarma.',
            'Mermas por rotura de frío: registro en SAP con el motivo «cadena de frío».'
          ] },
          { id: '7', heading: '7. Referencias', refs: true, list: [
            'Reglamento (CE) 852/2004, relativo a la higiene de los productos alimenticios.',
            'Real Decreto 1021/2022, requisitos de higiene en el comercio al por menor.'
          ] }
        ]
      },
      {
        code: 'PR-CAL-010',
        title: 'Gestión de alertas alimentarias y retiradas de producto',
        short: 'Alertas y retiradas',
        type: 'Procedimiento',
        version: '6',
        date: '2026-01-26',
        owner: 'Calidad',
        summary: 'Comité de crisis en 1 h; bloqueo de venta en todos los TPV en 1 h y retirada física en 4 h desde la decisión; notificación inmediata a la autoridad sanitaria y aviso a clientes de fidelización.',
        sections: [
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Retirar de la venta, y si es necesario recuperar de los consumidores, un producto que no es seguro, en el menor tiempo posible y con trazabilidad completa.',
            'Aplica a todos los productos de la plataforma y las tiendas, y en especial a la marca propia «Moncayo».'
          ] },
          { id: '2', heading: '2. Origen de una alerta', list: [
            'Alerta de la autoridad sanitaria (red SCIRI de AESAN o comunidad autónoma).',
            'Comunicación del proveedor o del fabricante.',
            'Reclamaciones de consumidores o resultados analíticos propios que indiquen un riesgo.'
          ] },
          { id: '3', heading: '3. Decisión', text: [
            'La decisión de retirada la toma el Comité de crisis (Responsable de Calidad, Directora de Operaciones y Jefe de plataforma), convocado en 1 h desde que se conoce el riesgo.',
            'Si el producto ya está en manos de consumidores, la retirada se acompaña de recuperación: aviso a los consumidores y devolución del importe en cualquier tienda, sin ticket.'
          ] },
          { id: '4', heading: '4. Plazos', list: [
            'Bloqueo de venta en todos los TPV de tiendas: 1 h desde la decisión.',
            'Retirada física del lineal y de la plataforma: 4 h desde la decisión, con la confirmación de cada tienda.',
            'Notificación a la autoridad sanitaria de la comunidad autónoma y a AESAN: inmediata, en cuanto se sabe que el producto puede no ser seguro.'
          ] },
          { id: '5', heading: '5. Trazabilidad', list: [
            'Recepciones del lote en la plataforma: WMS Manhattan.',
            'Envíos a tiendas y stock por tienda: SAP S/4 Retail.',
            'Unidades vendidas por tienda: TPV de tiendas.',
            'Clientes que compraron el lote con la tarjeta de fidelización: CRM Fidelización.'
          ] },
          { id: '6', heading: '6. Comunicación a consumidores', list: [
            'Cartel en todas las tiendas que recibieron el lote, durante al menos 15 días.',
            'Aviso por la app y por correo a los clientes de fidelización que compraron el lote.',
            'Nota pública en la web si la autoridad lo requiere o si el riesgo es grave; su texto se prepara según PR-CAL-011 (Comunicación de crisis).'
          ] },
          { id: '7', heading: '7. Cierre', text: [
            'El Responsable de Calidad cierra la retirada con el balance de unidades: recibidas, vendidas, retiradas, devueltas y destruidas; toda diferencia debe estar justificada.',
            'Se hace un simulacro de retirada al año con un producto de marca propia.'
          ] },
          { id: '8', heading: '8. Referencias', refs: true, list: [
            'Reglamento (CE) 178/2002, artículo 19.',
            'Real Decreto 1021/2022.'
          ] }
        ]
      },
      {
        code: 'PR-ATC-002',
        title: 'Reclamaciones de consumidores',
        short: 'Reclamaciones de consumidores',
        type: 'Procedimiento',
        version: '4',
        date: '2026-03-02',
        owner: 'Atención al consumidor',
        summary: 'Acuse de recibo en 24 h y respuesta al consumidor en 48 h. Cuerpo extraño en marca propia: recogida del objeto en 48 h, valoración del bloqueo preventivo del lote en el día e investigación del fabricante.',
        sections: [
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Atender las reclamaciones de consumidores recibidas en tienda, por la app de fidelización, por teléfono, por correo o en hoja oficial de reclamaciones.'
          ] },
          { id: '2', heading: '2. Plazos', list: [
            'Acuse de recibo al consumidor: 24 h.',
            'Respuesta al consumidor: 48 h, aunque la investigación siga abierta; la respuesta final se envía al cerrarla.',
            'Hoja oficial de reclamaciones: respuesta por escrito dentro del plazo legal de la comunidad autónoma, que Atención al consumidor controla en ServiceNow.'
          ] },
          { id: '3', heading: '3. Clasificación', text: [
            'Seguridad alimentaria: cuerpos extraños (vidrio, metal o plástico duro), alérgenos no declarados, síntomas de enfermedad o producto alterado. Se escala al Responsable de Calidad en 2 h.',
            'Calidad comercial: sabor, aspecto, peso o envase, sin riesgo para la salud.'
          ] },
          { id: '4', heading: '4. Cuerpos extraños', text: [
            'Se pide al consumidor que conserve el objeto y el envase, y se recogen en su domicilio o en la tienda en un plazo de 48 h.',
            'Con vidrio u otro cuerpo extraño duro en un producto de marca propia, el Responsable de Calidad valora en el día el bloqueo preventivo de la venta del lote y pide al fabricante su investigación según PR-PRO-006.',
            'La investigación revisa como mínimo:'
          ], list: [
            'Trazabilidad del lote: recepción en plataforma, tiendas que lo recibieron y unidades vendidas.',
            'Reclamaciones del mismo lote o del mismo producto en los últimos 12 meses.',
            'Informe del fabricante: control de vidrio, roturas registradas en la línea y detección por rayos X en la fecha de fabricación.',
            'Análisis del objeto en un laboratorio externo cuando el fabricante y Calidad no coinciden en su origen.'
          ] },
          { id: '5', heading: '5. Respuesta al consumidor', text: [
            'La respuesta es personal y en lenguaje claro, y no atribuye la causa hasta que haya evidencia.',
            'Se puede ofrecer el reembolso o la reposición del producto; las compensaciones de más de 50 € las aprueba el Responsable de Calidad.'
          ] },
          { id: '6', heading: '6. Registros', list: [
            'Expediente en ServiceNow, vinculado al cliente en CRM Fidelización.',
            'Indicador mensual de reclamaciones por millón de unidades vendidas, por proveedor de marca propia.'
          ] }
        ]
      },
      {
        code: 'PR-PRO-006',
        title: 'Homologación y seguimiento de proveedores de marca propia',
        short: 'Proveedores de marca propia',
        type: 'Procedimiento',
        version: '3',
        date: '2025-11-20',
        owner: 'Calidad de proveedores',
        summary: 'IFS Food o BRCGS en vigor, auditoría inicial de al menos 85 puntos, especificación firmada y control de cuerpos extraños; el fabricante envía su investigación preliminar en 48 h y el 8D en 10 días hábiles.',
        sections: [
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Asegurar que los fabricantes de la marca propia «Moncayo» elaboran productos seguros y conformes con la especificación acordada.'
          ] },
          { id: '2', heading: '2. Requisitos de homologación', list: [
            'Certificación IFS Food o BRCGS Food Safety en vigor, con nivel superior o grado A o AA.',
            'Auditoría inicial de Calidad de proveedores en la fábrica, con un resultado de al menos 85 puntos sobre 100.',
            'Especificación de producto firmada (ficha FT-MP) con límites físicos, químicos y microbiológicos.',
            'Plan APPCC y plan de control de cuerpos extraños de la línea.'
          ] },
          { id: '3', heading: '3. Envases de vidrio', list: [
            'Política de vidrio con registro de roturas y procedimiento de limpieza de la línea tras una rotura.',
            'Inspección de envases vacíos y control final por rayos X, o inspección equivalente, en todos los productos envasados en vidrio.',
            'Verificación del equipo de rayos X con patrones de vidrio al inicio del turno y cada 4 h.'
          ] },
          { id: '4', heading: '4. Seguimiento', list: [
            'Auditoría anual de Calidad de proveedores; cada tres años, no anunciada.',
            'Análisis del producto en laboratorio externo según el plan anual.',
            'Indicador de reclamaciones por millón de unidades vendidas; por encima de 5, plan de acción del proveedor.'
          ] },
          { id: '5', heading: '5. Incidentes', text: [
            'El fabricante comunica a Mercados Moncayo en 24 h cualquier incidente que pueda afectar a la seguridad del producto ya entregado.',
            'Ante una reclamación de seguridad, el fabricante envía su investigación preliminar en 48 h y su informe 8D completo en 10 días hábiles.'
          ] },
          { id: '6', heading: '6. Suspensión', text: [
            'Un proveedor con la certificación retirada, con una no conformidad crítica en auditoría o con una retirada atribuible a su fabricación queda en homologación suspendida: no se le hacen pedidos nuevos hasta cerrar su plan de acción.'
          ] }
        ]
      },
      {
        code: 'IT-TIE-014',
        title: 'Limpieza y desinfección de murales frigoríficos',
        short: 'Limpieza de murales',
        type: 'Instrucción técnica',
        version: '2',
        date: '2026-02-09',
        owner: 'Operaciones de tienda',
        summary: 'Limpieza diaria de bandejas y frentes, a fondo semanal y del evaporador mensual; el producto no puede estar más de 30 min fuera de frío y solo se repone con el aire por debajo de 4 °C.',
        sections: [
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Limpiar y desinfectar los murales de refrigerados sin romper la cadena de frío del producto. Aplica a los murales, vitrinas e islas de todas las tiendas.'
          ] },
          { id: '2', heading: '2. Frecuencias', list: [
            'Bandejas, frentes y cortinas: limpieza diaria, al cierre.',
            'Limpieza a fondo del mural (bandejas, fondos, rejillas de retorno y desagüe): semanal.',
            'Batería del evaporador y comprobación de los ventiladores: mensual, por Mantenimiento de frío.'
          ] },
          { id: '3', heading: '3. Preparación', text: [
            'Antes de la limpieza a fondo, el producto se traslada a la cámara de la tienda en carros cerrados; no puede estar fuera de frío más de 30 min.',
            'El mural se apaga y se deja abierto 15 min para el desescarche; nunca se rasca el hielo con objetos metálicos.'
          ] },
          { id: '4', heading: '4. Limpieza y desinfección', list: [
            'Retirar los restos con agua tibia, a 40 °C como máximo, y detergente neutro.',
            'Aclarar y aplicar el desinfectante autorizado (amonio cuaternario) con el tiempo de contacto de su ficha, de al menos 5 min.',
            'Aclarar con agua potable si la ficha lo exige y secar con papel de un solo uso.',
            'Limpiar el desagüe y verter 1 l de agua con desinfectante para evitar olores.'
          ] },
          { id: '5', heading: '5. Puesta en marcha', text: [
            'El mural se enciende y el producto solo se repone cuando la temperatura de aire baja de 4 °C; se anota en la hoja de temperaturas.'
          ] },
          { id: '6', heading: '6. Verificación', text: [
            'El encargado revisa visualmente la limpieza y firma la hoja de limpieza.',
            'Calidad verifica la limpieza cada trimestre con hisopos de ATP, con un límite de 150 RLU.'
          ] }
        ]
      },
      {
        code: 'FT-MP-0412',
        title: 'Ficha técnica de producto · Tomate frito Moncayo 400 g',
        short: 'Ficha técnica · Tomate frito 400 g',
        type: 'Ficha técnica',
        version: '3',
        date: '2026-04-14',
        owner: 'Calidad de proveedores',
        summary: 'Tomate frito en tarro de vidrio de 400 g, fabricado por Conservas del Jalón: tolerancia cero de vidrio, metal y plástico duro; consumo preferente 24 meses; lote L<aa><día juliano>.',
        sections: [
          { id: '1', heading: '1. Producto', text: [
            'Tomate frito envasado en tarro de vidrio de 400 g con tapa twist-off y esterilizado. Marca propia «Moncayo». Fabricante: Conservas del Jalón, S.L.'
          ] },
          { id: '2', heading: '2. Ingredientes y alérgenos', text: [
            'Ingredientes: tomate (86 %), aceite de girasol, azúcar, sal, almidón modificado de maíz y cebolla.',
            'Alérgenos: no contiene ninguno de los 14 alérgenos de declaración obligatoria del Reglamento (UE) 1169/2011.'
          ] },
          { id: '3', heading: '3. Especificación', list: [
            'Cuerpos extraños (vidrio, metal y plástico duro): ausencia, tolerancia cero.',
            'Residuo seco soluble: de 14 a 18 °Brix.',
            'pH: 4,4 como máximo.',
            'Peso neto: 400 g, con el control metrológico del Real Decreto 1801/2008.'
          ] },
          { id: '4', heading: '4. Conservación y vida útil', text: [
            'Consumo preferente: 24 meses desde la fabricación.',
            'Una vez abierto, conservar en el frigorífico y consumir en 5 días.'
          ] },
          { id: '5', heading: '5. Código de lote', text: [
            'Formato L<aa><día juliano>. Ejemplo: L26214 es el lote fabricado el día 214 de 2026, es decir, el 02/08/2026.'
          ] },
          { id: '6', heading: '6. Envase y paletización', list: [
            'Bandejas de 12 tarros; 160 bandejas por palé (1.920 tarros).',
            'Etiqueta de palé GS1-128 con SSCC, GTIN, lote y consumo preferente.'
          ] }
        ]
      }
    ],

    unindexed: {
      'PR-CAL-011': { title: 'Comunicación de crisis', mentionedIn: { doc: 'PR-CAL-010', sec: '6', quote: 'según PR-CAL-011 (Comunicación de crisis)' } }
    },

    suggested: ['frio', 'vidrio', 'retirada', 'plazos-atc', 'limpieza', 'homologacion'],

    intents: [
      {
        id: 'frio', icon: 'thermometer', topic: 'Cadena de frío · actuación ante una avería', scope: 'all',
        q: '¿Qué hay que hacer si un mural de refrigerados supera 5 °C?',
        anchors: ['mural', 'murales', 'refrigerados', 'cadena de frío', 'temperatura', 'frío', 'vitrina'],
        terms: ['supera', 'sube', 'avería', 'alarma', 'hacer', 'producto', 'bloqueo', 'retirar', 'grados', 'horas', 'yogures', 'lácteos'],
        min: 3,
        blocks: [
          { t: 'Si el producto ha estado por encima de 5 °C 2 h o menos, se lleva a la cámara de la tienda y puede volver a la venta cuando el mural se recupere.', c: [['APPCC-TIE-01', 4, 'Producto por encima de 5 °C durante 2 h o menos: se traslada a la cámara de la tienda y puede volver a la venta cuando el mural se recupere']] },
          { t: 'Si han pasado más de 2 h, se bloquea su venta en el TPV y se retira del lineal; el Responsable de Calidad decide el destino.', c: [['APPCC-TIE-01', 4, 'Producto por encima de 5 °C durante más de 2 h: bloqueo de venta en el TPV de las referencias expuestas y retirada del lineal; el Responsable de Calidad decide su destino.']] },
          { t: 'Por encima de 8 °C en cualquier momento la rotura es crítica: el producto no se vende y se destruye.', c: [['APPCC-TIE-01', 4, 'Por encima de 8 °C en cualquier momento, la rotura de la cadena de frío es crítica: el producto expuesto no se vende y se destruye']] },
          { t: 'Mantenimiento de frío atiende la avería en 4 h si hay producto expuesto.', c: [['APPCC-TIE-01', 5, 'Mantenimiento de frío: atiende la avería con prioridad urgente (4 h) si hay producto expuesto y registra la intervención en ServiceNow.']] }
        ],
        context: {
          systems: ['Sensores de frío', 'TPV tiendas', 'ServiceNow'],
          text: 'T-027 Huesca Centro: el mural de lácteos MR-3 está a 9,4 °C desde las 03:55 por un fallo del ventilador del evaporador, con pico de 9,8 °C. Más de 2 h por encima de 5 °C y por encima de 8 °C: rotura crítica para las 318 unidades de refrigerados expuestas.',
          outcome: 'alarma',
          go: 'alarma', goLabel: 'Abrir alarma T-027'
        },
        followups: ['frio-responsables', 'temperaturas']
      },
      {
        id: 'temperaturas', icon: 'snowflake', topic: 'Cadena de frío · temperaturas máximas', scope: 'all',
        q: '¿A qué temperatura deben estar los refrigerados y los congelados?',
        anchors: ['temperatura máxima', 'temperaturas máximas', 'congelados', 'cuarta gama', 'cámaras', 'qué temperatura'],
        terms: ['temperatura', 'refrigerados', 'deben', 'estar', 'grados', 'máximo', 'tolerancia'],
        min: 3,
        blocks: [
          { list: [
            { t: 'Lácteos, postres, carne y pescado envasados y platos preparados: 5 °C como máximo en el producto.', c: [['APPCC-TIE-01', 2, 'Lácteos, postres, carne y pescado envasados y platos preparados refrigerados: 5 °C como máximo en el producto.']] },
            { t: 'Cuarta gama: 4 °C.', c: [['APPCC-TIE-01', 2, 'Frutas y verduras de cuarta gama: 4 °C como máximo.']] },
            { t: 'Congelados: −18 °C, con 3 °C de tolerancia en reposición y desescarche.', c: [['APPCC-TIE-01', 2, 'Congelados: −18 °C, con una tolerancia de 3 °C durante la reposición y el desescarche.']] },
            { t: 'Cámaras: de 0 a 4 °C en refrigeración y −20 °C o menos en congelación.', c: [['APPCC-TIE-01', 2, 'Cámaras de tienda: refrigeración entre 0 y 4 °C; congelación a −20 °C o menos.']] }
          ] },
          { t: 'Un congelado que pasa de −15 °C se trata como descongelado y no se vende.', c: [['APPCC-TIE-01', 4, 'Congelados por encima de −15 °C: se tratan como descongelados y no se vuelven a congelar ni a vender.']] }
        ],
        followups: ['frio']
      },
      {
        id: 'frio-responsables', icon: 'users', topic: 'Cadena de frío · responsabilidades', scope: 'all',
        q: '¿Quién hace qué cuando falla el frío de una tienda?',
        anchors: ['responsable', 'responsables', 'responsabilidades', 'quién hace', 'central de frío', 'encargado'],
        terms: ['frío', 'falla', 'avería', 'mural', 'tienda', 'quién', 'decide', 'aprueba', 'noche'],
        min: 4,
        blocks: [
          { list: [
            { t: 'Encargado de tienda: traslada el producto, retira lo expuesto y anota la incidencia.', c: [['APPCC-TIE-01', 5, 'Encargado de tienda: traslada el producto, retira lo expuesto y anota la incidencia.']] },
            { t: 'Mantenimiento de frío: avería urgente en 4 h si hay producto expuesto, registrada en ServiceNow.', c: [['APPCC-TIE-01', 5, 'Mantenimiento de frío: atiende la avería con prioridad urgente (4 h) si hay producto expuesto y registra la intervención en ServiceNow.']] },
            { t: 'Responsable de Calidad: aprueba el bloqueo de venta y decide el destino del producto.', c: [['APPCC-TIE-01', 5, 'Responsable de Calidad: aprueba el bloqueo de venta y decide el destino del producto.']] },
            { t: 'Jefe de zona: repone el surtido si el lineal queda vacío.', c: [['APPCC-TIE-01', 5, 'Jefe de zona de tiendas: repone el surtido si la retirada deja el lineal vacío.']] }
          ] },
          { t: 'Con la tienda cerrada, la Central de frío atiende la alarma y avisa al encargado de guardia y a Mantenimiento.', c: [['APPCC-TIE-01', 3, 'Las alarmas fuera del horario de apertura las atiende la Central de frío, que avisa al encargado de guardia y a Mantenimiento de frío.']] }
        ],
        context: {
          systems: ['Sensores de frío', 'ServiceNow', 'Microsoft Teams'],
          text: 'La alarma de MR-3 en T-027 saltó a las 03:55, con la tienda cerrada: la atiende la Central de frío. El ventilador del evaporador es la causa probable que debe confirmar Mantenimiento de frío.',
          go: 'alarma', goLabel: 'Abrir alarma T-027'
        },
        followups: ['frio', 'evaporador']
      },
      {
        id: 'vidrio', icon: 'alert-triangle', topic: 'Reclamaciones · cuerpos extraños', scope: 'all',
        q: '¿Qué hacemos si un consumidor encuentra vidrio en un producto de marca propia?',
        anchors: ['vidrio', 'cristal', 'cuerpo extraño', 'cuerpos extraños', 'metal', 'plástico duro', 'objeto'],
        terms: ['consumidor', 'encuentra', 'marca propia', 'producto', 'tarro', 'hacemos', 'reclamación', 'investiga', 'lote'],
        min: 3,
        blocks: [
          { t: 'Es una reclamación de seguridad alimentaria: se escala al Responsable de Calidad en 2 h.', c: [['PR-ATC-002', 3, 'Seguridad alimentaria: cuerpos extraños (vidrio, metal o plástico duro), alérgenos no declarados, síntomas de enfermedad o producto alterado. Se escala al Responsable de Calidad en 2 h.']] },
          { t: 'Se pide al consumidor que guarde el objeto y el envase, y se recogen en 48 h.', c: [['PR-ATC-002', 4, 'Se pide al consumidor que conserve el objeto y el envase, y se recogen en su domicilio o en la tienda en un plazo de 48 h.']] },
          { t: 'El Responsable de Calidad valora en el día el bloqueo preventivo de la venta del lote y pide al fabricante su investigación.', c: [['PR-ATC-002', 4, 'el Responsable de Calidad valora en el día el bloqueo preventivo de la venta del lote y pide al fabricante su investigación según PR-PRO-006']] },
          { intro: { t: 'La investigación revisa como mínimo:', c: [['PR-ATC-002', 4, 'La investigación revisa como mínimo:']] }, list: [
            { t: 'La trazabilidad del lote y las reclamaciones del mismo producto en 12 meses.', c: [['PR-ATC-002', 4, 'Trazabilidad del lote: recepción en plataforma, tiendas que lo recibieron y unidades vendidas.'], ['PR-ATC-002', 4, 'Reclamaciones del mismo lote o del mismo producto en los últimos 12 meses.']] },
            { t: 'El informe del fabricante sobre control de vidrio, roturas en la línea y rayos X en la fecha de fabricación.', c: [['PR-ATC-002', 4, 'Informe del fabricante: control de vidrio, roturas registradas en la línea y detección por rayos X en la fecha de fabricación.']] }
          ] },
          { t: 'La ficha técnica del tomate frito no admite vidrio: tolerancia cero.', c: [['FT-MP-0412', 3, 'Cuerpos extraños (vidrio, metal y plástico duro): ausencia, tolerancia cero.']] }
        ],
        context: {
          systems: ['CRM Fidelización', 'ServiceNow', 'SAP S/4 Retail'],
          text: 'Javier Lasheras ha escrito desde la app: fragmento de vidrio en un tarro de Tomate frito Moncayo 400 g, lote L26214, comprado en T-011 Zaragoza Delicias. Fabricante: Conservas del Jalón, S.L. Respuesta al consumidor en 48 h.',
          outcome: 'reclamacion',
          lot: 'L26214',
          go: 'reclamacion', goLabel: 'Abrir reclamación L26214'
        },
        followups: ['plazos-atc', 'proveedor-incidente']
      },
      {
        id: 'plazos-atc', icon: 'mail', topic: 'Reclamaciones · plazos', scope: 'all',
        q: '¿Qué plazos tenemos para responder a la reclamación de un consumidor?',
        anchors: ['reclamación', 'reclamaciones', 'queja', 'quejas', 'hoja de reclamaciones'],
        terms: ['plazo', 'plazos', 'responder', 'contestar', 'acuse', 'horas', 'cuándo', 'tenemos', 'consumidor'],
        min: 3,
        blocks: [
          { list: [
            { t: 'Acuse de recibo en 24 h.', c: [['PR-ATC-002', 2, 'Acuse de recibo al consumidor: 24 h.']] },
            { t: 'Respuesta en 48 h, aunque la investigación siga abierta; la final se envía al cerrarla.', c: [['PR-ATC-002', 2, 'Respuesta al consumidor: 48 h, aunque la investigación siga abierta; la respuesta final se envía al cerrarla.']] },
            { t: 'Hoja oficial de reclamaciones: por escrito, dentro del plazo legal de la comunidad autónoma.', c: [['PR-ATC-002', 2, 'Hoja oficial de reclamaciones: respuesta por escrito dentro del plazo legal de la comunidad autónoma']] }
          ] },
          { t: 'La respuesta no atribuye la causa hasta que haya evidencia.', c: [['PR-ATC-002', 5, 'La respuesta es personal y en lenguaje claro, y no atribuye la causa hasta que haya evidencia.']] }
        ],
        context: {
          systems: ['CRM Fidelización', 'ServiceNow'],
          text: 'La reclamación de Javier Lasheras (vidrio en el lote L26214) llegó por la app de fidelización: respuesta al consumidor en 48 h.',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Abrir reclamación L26214'
        },
        followups: ['compensacion', 'vidrio']
      },
      {
        id: 'compensacion', icon: 'euro', topic: 'Reclamaciones · compensación', scope: 'all',
        q: '¿Qué compensación se puede ofrecer al consumidor?',
        anchors: ['compensación', 'compensaciones', 'reembolso', 'reposición', 'devolver el dinero'],
        terms: ['ofrecer', 'consumidor', 'aprueba', 'importe', 'cliente'],
        min: 2,
        blocks: [
          { t: 'El reembolso o la reposición del producto; si la compensación supera 50 €, la aprueba el Responsable de Calidad.', c: [['PR-ATC-002', 5, 'Se puede ofrecer el reembolso o la reposición del producto; las compensaciones de más de 50 € las aprueba el Responsable de Calidad.']] },
          { t: 'En una retirada, el importe se devuelve en cualquier tienda sin ticket.', c: [['PR-CAL-010', 3, 'devolución del importe en cualquier tienda, sin ticket']] }
        ],
        followups: ['plazos-atc']
      },
      {
        id: 'retirada', icon: 'truck', topic: 'Alertas y retiradas · plazos', scope: 'all',
        q: '¿Cómo se hace una retirada de producto y en qué plazos?',
        anchors: ['retirada', 'retiradas', 'retirar', 'recall', 'alerta', 'alertas', 'recuperación'],
        terms: ['plazo', 'plazos', 'cómo', 'tiendas', 'tpv', 'lote', 'horas', 'decide', 'comité'],
        min: 2,
        blocks: [
          { t: 'La decide el Comité de crisis, convocado en 1 h desde que se conoce el riesgo.', c: [['PR-CAL-010', 3, 'La decisión de retirada la toma el Comité de crisis (Responsable de Calidad, Directora de Operaciones y Jefe de plataforma), convocado en 1 h desde que se conoce el riesgo.']] },
          { list: [
            { t: 'Bloqueo de venta en todos los TPV en 1 h desde la decisión.', c: [['PR-CAL-010', 4, 'Bloqueo de venta en todos los TPV de tiendas: 1 h desde la decisión.']] },
            { t: 'Retirada física del lineal y de la plataforma en 4 h, con confirmación de cada tienda.', c: [['PR-CAL-010', 4, 'Retirada física del lineal y de la plataforma: 4 h desde la decisión, con la confirmación de cada tienda.']] },
            { t: 'Notificación inmediata a la comunidad autónoma y a AESAN.', c: [['PR-CAL-010', 4, 'Notificación a la autoridad sanitaria de la comunidad autónoma y a AESAN: inmediata']] }
          ] },
          { t: 'Si ya hay producto vendido, se avisa a los consumidores: cartel 15 días en las tiendas y aviso por la app a los clientes de fidelización que lo compraron.', c: [['PR-CAL-010', 6, 'Cartel en todas las tiendas que recibieron el lote, durante al menos 15 días.'], ['PR-CAL-010', 6, 'Aviso por la app y por correo a los clientes de fidelización que compraron el lote.']] },
          { t: 'Se cierra con el balance de unidades, con toda diferencia justificada.', c: [['PR-CAL-010', 7, 'El Responsable de Calidad cierra la retirada con el balance de unidades: recibidas, vendidas, retiradas, devueltas y destruidas; toda diferencia debe estar justificada.']] }
        ],
        context: {
          systems: ['WMS Manhattan', 'SAP S/4 Retail', 'TPV tiendas', 'CRM Fidelización'],
          text: 'Simulacro con el lote L26214: 4.800 tarros recibidos en plataforma, 4.320 servidos a 41 tiendas y 480 en plataforma; 1.920 vendidos y 2.400 en lineal; 612 clientes de fidelización lo compraron. Objetivo del apartado 4: retirada en 4 h.',
          lot: 'L26214',
          go: 'retirada', goLabel: 'Abrir simulacro L26214'
        },
        followups: ['trazabilidad', 'nota-publica']
      },
      {
        id: 'trazabilidad', icon: 'git-branch', topic: 'Alertas y retiradas · trazabilidad', scope: 'all',
        q: '¿De qué sistemas sale la trazabilidad de un lote?',
        anchors: ['trazabilidad', 'trazar', 'traza', 'sistemas'],
        terms: ['lote', 'sale', 'sistemas', 'tiendas', 'vendidas', 'clientes', 'dónde'],
        min: 3,
        blocks: [
          { list: [
            { t: 'Recepciones en plataforma: WMS Manhattan.', c: [['PR-CAL-010', 5, 'Recepciones del lote en la plataforma: WMS Manhattan.']] },
            { t: 'Envíos y stock por tienda: SAP S/4 Retail.', c: [['PR-CAL-010', 5, 'Envíos a tiendas y stock por tienda: SAP S/4 Retail.']] },
            { t: 'Unidades vendidas: TPV de tiendas.', c: [['PR-CAL-010', 5, 'Unidades vendidas por tienda: TPV de tiendas.']] },
            { t: 'Clientes que lo compraron con tarjeta de fidelización: CRM Fidelización.', c: [['PR-CAL-010', 5, 'Clientes que compraron el lote con la tarjeta de fidelización: CRM Fidelización.']] }
          ] }
        ],
        context: {
          systems: ['WMS Manhattan', 'SAP S/4 Retail', 'TPV tiendas', 'CRM Fidelización'],
          text: 'Traza completa del lote del simulacro, de la plataforma a los clientes de fidelización:',
          lot: 'L26214'
        },
        followups: ['retirada', 'lote']
      },
      {
        id: 'nota-publica', icon: 'globe', topic: 'Alertas y retiradas · comunicación pública', scope: 'all', kind: 'partial',
        q: '¿Cuándo se publica una nota de retirada en la web?',
        anchors: ['nota pública', 'web', 'prensa', 'medios', 'comunicado', 'comunicación de crisis'],
        terms: ['publica', 'retirada', 'cuándo', 'texto', 'riesgo'],
        min: 2,
        blocks: [
          { t: 'Si la autoridad lo requiere o si el riesgo es grave; el texto se prepara según PR-CAL-011.', c: [['PR-CAL-010', 6, 'Nota pública en la web si la autoridad lo requiere o si el riesgo es grave; su texto se prepara según PR-CAL-011 (Comunicación de crisis).']] }
        ],
        note: 'PR-CAL-011 (Comunicación de crisis) no está entre los documentos indexados: quién redacta, quién aprueba y el contenido de la nota no se pueden detallar desde esta consulta.',
        followups: ['retirada']
      },
      {
        id: 'homologacion', icon: 'shield-check', topic: 'Proveedores de marca propia · homologación', scope: 'all',
        q: '¿Qué se exige para homologar un proveedor de marca propia?',
        anchors: ['homologar', 'homologación', 'homologado', 'proveedor', 'proveedores', 'fabricante'],
        terms: ['exige', 'requisitos', 'marca propia', 'certificación', 'auditoría', 'ifs', 'brcgs'],
        min: 3,
        blocks: [
          { list: [
            { t: 'Certificación IFS Food o BRCGS en vigor, con nivel superior o grado A o AA.', c: [['PR-PRO-006', 2, 'Certificación IFS Food o BRCGS Food Safety en vigor, con nivel superior o grado A o AA.']] },
            { t: 'Auditoría inicial en la fábrica con al menos 85 puntos sobre 100.', c: [['PR-PRO-006', 2, 'Auditoría inicial de Calidad de proveedores en la fábrica, con un resultado de al menos 85 puntos sobre 100.']] },
            { t: 'Especificación firmada con límites físicos, químicos y microbiológicos.', c: [['PR-PRO-006', 2, 'Especificación de producto firmada (ficha FT-MP) con límites físicos, químicos y microbiológicos.']] },
            { t: 'Plan APPCC y plan de control de cuerpos extraños de la línea.', c: [['PR-PRO-006', 2, 'Plan APPCC y plan de control de cuerpos extraños de la línea.']] }
          ] },
          { t: 'Si envasa en vidrio, además: política de vidrio, registro de roturas y rayos X verificado con patrones al inicio del turno y cada 4 h.', c: [['PR-PRO-006', 3, 'Política de vidrio con registro de roturas y procedimiento de limpieza de la línea tras una rotura.'], ['PR-PRO-006', 3, 'Verificación del equipo de rayos X con patrones de vidrio al inicio del turno y cada 4 h.']] }
        ],
        followups: ['proveedor-incidente', 'suspension']
      },
      {
        id: 'proveedor-incidente', icon: 'clock', topic: 'Proveedores de marca propia · incidentes', scope: 'all',
        q: '¿En qué plazo debe responder el fabricante a una reclamación de seguridad?',
        anchors: ['fabricante', 'proveedor', 'conservas del jalón', 'investigación preliminar', '8d'],
        terms: ['plazo', 'responder', 'reclamación', 'seguridad', 'informe', 'horas', 'días'],
        min: 3,
        blocks: [
          { t: 'Investigación preliminar en 48 h e informe 8D completo en 10 días hábiles.', c: [['PR-PRO-006', 5, 'Ante una reclamación de seguridad, el fabricante envía su investigación preliminar en 48 h y su informe 8D completo en 10 días hábiles.']] },
          { t: 'Además, debe comunicar en 24 h cualquier incidente que afecte a producto ya entregado.', c: [['PR-PRO-006', 5, 'El fabricante comunica a Mercados Moncayo en 24 h cualquier incidente que pueda afectar a la seguridad del producto ya entregado.']] }
        ],
        context: {
          systems: ['ServiceNow'],
          text: 'Para el vidrio del lote L26214, Conservas del Jalón, S.L. debe enviar su investigación preliminar en 48 h y el 8D en 10 días hábiles.',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Abrir reclamación L26214'
        },
        followups: ['suspension', 'vidrio']
      },
      {
        id: 'suspension', icon: 'x-circle', topic: 'Proveedores de marca propia · suspensión', scope: 'all',
        q: '¿Cuándo se suspende la homologación de un proveedor?',
        anchors: ['suspende', 'suspensión', 'suspendida', 'suspender'],
        terms: ['homologación', 'proveedor', 'cuándo', 'pedidos', 'certificación'],
        min: 2,
        blocks: [
          { t: 'Con la certificación retirada, con una no conformidad crítica en auditoría o con una retirada atribuible a su fabricación; no se le hacen pedidos nuevos hasta cerrar el plan de acción.', c: [['PR-PRO-006', 6, 'Un proveedor con la certificación retirada, con una no conformidad crítica en auditoría o con una retirada atribuible a su fabricación queda en homologación suspendida']] },
          { t: 'Con más de 5 reclamaciones por millón de unidades vendidas, debe presentar un plan de acción.', c: [['PR-PRO-006', 4, 'Indicador de reclamaciones por millón de unidades vendidas; por encima de 5, plan de acción del proveedor.']] }
        ],
        followups: ['homologacion']
      },
      {
        id: 'limpieza', icon: 'droplet', topic: 'Limpieza de murales', scope: 'all',
        q: '¿Cómo se limpia un mural sin romper la cadena de frío?',
        anchors: ['limpia', 'limpieza', 'limpiar', 'desinfección', 'desinfectar', 'desescarche', 'agua', 'detergente', 'amonio cuaternario'],
        terms: ['mural', 'murales', 'cadena de frío', 'producto', 'cómo', 'minutos', 'frecuencia'],
        min: 2,
        blocks: [
          { t: 'El producto se lleva antes a la cámara en carros cerrados y no puede estar más de 30 min fuera de frío.', c: [['IT-TIE-014', 3, 'el producto se traslada a la cámara de la tienda en carros cerrados; no puede estar fuera de frío más de 30 min']] },
          { t: 'Se limpia con agua a 40 °C como máximo y detergente neutro, y se desinfecta con amonio cuaternario al menos 5 min.', c: [['IT-TIE-014', 4, 'Retirar los restos con agua tibia, a 40 °C como máximo, y detergente neutro.'], ['IT-TIE-014', 4, 'Aclarar y aplicar el desinfectante autorizado (amonio cuaternario) con el tiempo de contacto de su ficha, de al menos 5 min.']] },
          { t: 'Solo se repone cuando el aire del mural baja de 4 °C.', c: [['IT-TIE-014', 5, 'el producto solo se repone cuando la temperatura de aire baja de 4 °C']] },
          { list: [
            { t: 'Bandejas, frentes y cortinas: a diario.', c: [['IT-TIE-014', 2, 'Bandejas, frentes y cortinas: limpieza diaria, al cierre.']] },
            { t: 'A fondo: cada semana.', c: [['IT-TIE-014', 2, 'Limpieza a fondo del mural (bandejas, fondos, rejillas de retorno y desagüe): semanal.']] },
            { t: 'Evaporador y ventiladores: cada mes, por Mantenimiento de frío.', c: [['IT-TIE-014', 2, 'Batería del evaporador y comprobación de los ventiladores: mensual, por Mantenimiento de frío.']] }
          ] }
        ],
        followups: ['evaporador', 'frio']
      },
      {
        id: 'evaporador', icon: 'fan', topic: 'Murales · evaporador y ventiladores', scope: 'all',
        q: '¿Cada cuánto se revisan los ventiladores del evaporador de los murales?',
        anchors: ['evaporador', 'ventilador', 'ventiladores', 'batería'],
        terms: ['cada cuánto', 'revisan', 'revisión', 'mural', 'murales', 'mantenimiento', 'frecuencia'],
        min: 2,
        blocks: [
          { t: 'Cada mes: Mantenimiento de frío limpia la batería del evaporador y comprueba los ventiladores.', c: [['IT-TIE-014', 2, 'Batería del evaporador y comprobación de los ventiladores: mensual, por Mantenimiento de frío.']] }
        ],
        context: {
          systems: ['ServiceNow', 'Sensores de frío'],
          text: 'La causa probable de la alarma de MR-3 en T-027 es el fallo del ventilador del evaporador: conviene revisar en ServiceNow la fecha de su última revisión mensual.',
          go: 'alarma', goLabel: 'Abrir alarma T-027'
        },
        followups: ['limpieza']
      },
      {
        id: 'lote', icon: 'barcode', topic: 'Código de lote · tomate frito', scope: 'all',
        q: '¿Cómo se lee el código de lote del tomate frito?',
        anchors: ['código de lote', 'día juliano', 'juliano', 'l26214', 'formato de lote'],
        terms: ['lote', 'código', 'leer', 'lee', 'significa', 'fecha', 'tomate'],
        min: 2,
        blocks: [
          { t: 'Formato L<aa><día juliano>: L26214 es el lote fabricado el día 214 de 2026, el 02/08/2026.', c: [['FT-MP-0412', 5, 'Formato L<aa><día juliano>. Ejemplo: L26214 es el lote fabricado el día 214 de 2026, es decir, el 02/08/2026.']] },
          { t: 'Consumo preferente de 24 meses desde la fabricación.', c: [['FT-MP-0412', 4, 'Consumo preferente: 24 meses desde la fabricación.']] }
        ],
        context: {
          systems: ['WMS Manhattan', 'SAP S/4 Retail'],
          text: 'Traza del lote del ejemplo, que es el de la reclamación y el simulacro de hoy:',
          lot: 'L26214'
        },
        followups: ['ficha', 'trazabilidad']
      },
      {
        id: 'ficha', icon: 'file-text', topic: 'Ficha técnica · tomate frito', scope: 'all',
        q: '¿Qué dice la ficha técnica del tomate frito Moncayo?',
        anchors: ['ficha técnica', 'ficha', 'especificación', 'tomate frito', 'alérgenos', 'ingredientes', 'brix'],
        terms: ['tomate', 'dice', 'contiene', 'lleva', 'tolerancia', 'ph', 'peso'],
        min: 2,
        blocks: [
          { intro: { t: 'Tomate frito en tarro de vidrio de 400 g, esterilizado, fabricado por Conservas del Jalón, S.L.', c: [['FT-MP-0412', 1, 'Tomate frito envasado en tarro de vidrio de 400 g con tapa twist-off y esterilizado.']] }, list: [
            { t: 'Vidrio, metal y plástico duro: tolerancia cero.', c: [['FT-MP-0412', 3, 'Cuerpos extraños (vidrio, metal y plástico duro): ausencia, tolerancia cero.']] },
            { t: 'Sin ninguno de los 14 alérgenos de declaración obligatoria.', c: [['FT-MP-0412', 2, 'Alérgenos: no contiene ninguno de los 14 alérgenos de declaración obligatoria del Reglamento (UE) 1169/2011.']] },
            { t: 'De 14 a 18 °Brix y pH de 4,4 como máximo.', c: [['FT-MP-0412', 3, 'Residuo seco soluble: de 14 a 18 °Brix.'], ['FT-MP-0412', 3, 'pH: 4,4 como máximo.']] },
            { t: 'Una vez abierto, al frigorífico y consumir en 5 días.', c: [['FT-MP-0412', 4, 'Una vez abierto, conservar en el frigorífico y consumir en 5 días.']] }
          ] }
        ],
        followups: ['lote', 'vidrio']
      }
    ],

    gaps: [
      { id: 'plagas', topic: 'Control de plagas', anchors: ['plagas', 'plaga', 'roedores', 'cebos', 'cucarachas', 'insectos', 'desinsectación', 'desratización'],
        reason: 'Ningún documento indexado describe el plan de control de plagas de la plataforma ni de las tiendas.' },
      { id: 'food-defense', topic: 'Defensa alimentaria', anchors: ['food defense', 'defensa alimentaria', 'sabotaje', 'intrusión', 'vulnerabilidad', 'fraude alimentario'],
        reason: 'Ningún documento indexado trata la defensa alimentaria ni la vulnerabilidad al fraude.' },
      { id: 'crisis', topic: 'Comunicación de crisis', anchors: ['portavoz', 'rueda de prensa', 'pr-cal-011', 'gabinete de crisis', 'redes sociales'],
        reason: 'Ningún documento indexado describe la comunicación de crisis con medios y redes sociales.', related: 'PR-CAL-011' },
      { id: 'precio', topic: 'Precios y promociones', anchors: ['precio', 'precios', 'promoción', 'promociones', 'oferta', 'cuesta', 'margen', 'cobra'],
        reason: 'Precios, promociones y márgenes no forman parte de los procedimientos de Calidad indexados.' },
      { id: 'transporte', topic: 'Transporte a tiendas', anchors: ['camión', 'camiones', 'transporte', 'transportista', 'ruta', 'rutas', 'reparto'],
        reason: 'Ningún documento indexado describe las condiciones de transporte de la plataforma a las tiendas.' },
      { id: 'personal', topic: 'Condiciones laborales', anchors: ['vacaciones', 'nómina', 'salario', 'sueldo', 'convenio', 'contrato', 'horario', 'cajero', 'cajera'],
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
})('retail');
