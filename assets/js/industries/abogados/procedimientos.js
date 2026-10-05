/* Mora & Jordano · consulta del manual interno del despacho con citas. Datos sintéticos de demostración (MFM). */
agenticPack('abogados', {
  procedimientos: {
    section: 'Calidad',
    nav: 'Procedimientos',
    title: 'Preguntar a los procedimientos',
    agent: 'Procedimientos',
    system: 'iManage',
    source: 'iManage · manual interno vigente del despacho',
    indexed_at: '2026-09-29T06:00',
    doc_org: 'Mora & Jordano · Cumplimiento y calidad',
    ui: {
      page_title: 'Consulta del manual interno',
      intro_title: 'Pregunta sobre los protocolos y políticas internas del despacho',
      intro_text: 'Plazos procesales y LexNET, conflictos de intereses, prevención del blanqueo, honorarios, protección de datos y calendario tributario. Cada frase de la respuesta cita el documento y el apartado de donde sale. Si ningún documento indexado lo recoge, la consulta lo indica y no responde.',
      placeholder: 'Escribe una pregunta sobre el manual interno',
      context_title: 'Aplicado al despacho hoy',
      permission: 'Todas las áreas · Málaga y Córdoba',
      asker_initials: 'AS',
      asker_role: 'Asociado sénior de Procesal',
      route_to: 'Cumplimiento (PBC y RGPD)'
    },
    report: { title: 'Consulta del manual interno', code_prefix: 'CON-MAN', filename: 'consulta-manual-interno', scope_label: 'Despacho', scope: 'Mora & Jordano · Málaga y Córdoba' },
    presenter: {
      say: [
        'Consulta del manual interno del despacho: la respuesta sale solo de los protocolos y políticas vigentes guardados en iManage, y cada frase lleva su cita al documento y al apartado.',
        'Hay seis documentos indexados: control de plazos procesales, conflictos de intereses y aceptación de encargos, prevención del blanqueo, honorarios y hoja de encargo, protección de datos y brechas, y calendario tributario. Aquí son sintéticos; en el piloto, los suyos vigentes y con permisos por área.'
      ],
      say_empty: 'Sirve para que un asociado recién incorporado calcule bien un plazo o abra un expediente sin saltarse el control de conflictos, para preparar una auditoría de un cliente corporativo y para contestar a un cliente con la referencia exacta de la política.',
      say_answered: 'Al pulsar una cita se abre el documento con el pasaje exacto resaltado. Y la respuesta se cruza con lo que pasa hoy: la demanda contra Aceites Sierra Subbética (PO 1184/2026), la queja de Grupo Hostelero Costa del Sol o el simulacro RGPD-2609-03.',
      say_none: 'Cuando no hay fuente lo dice y no inventa: ni respuesta ni cita. Si el tema está en un documento que no está indexado, lo nombra (POL-IA-007) y permite derivar la pregunta a Cumplimiento.',
      next_empty: 'Pulsar «¿Cómo se computa un plazo procesal?» y después la cita 1 para ver el pasaje resaltado.',
      next_answered: 'Escribir una pregunta sin fuente, por ejemplo «¿Cuántos días de teletrabajo tenemos?», y pulsar «Preguntar».',
      next_done: 'Pasar a la siguiente escena con la flecha derecha.'
    },

    docs: [
      {
        code: 'PRO-PLZ-001',
        title: 'Protocolo de control de plazos procesales y notificaciones LexNET',
        short: 'Control de plazos procesales',
        type: 'Protocolo',
        version: '9',
        date: '2026-01-12',
        owner: 'Socio responsable de Procesal',
        summary: 'Toda notificación LexNET se registra el mismo día con doble cómputo del plazo. Días hábiles, agosto inhábil, festivos de Málaga y Córdoba; vencimiento interno 3 días hábiles antes del legal; aviso al socio si vence en menos de 5 días hábiles.',
        sections: [
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Garantizar que ningún plazo procesal del despacho se pierde, desde la recepción de la notificación hasta la presentación del escrito, y dejar constancia de cada paso en el Gestor de expedientes.',
            'Aplica a todos los procedimientos judiciales en que intervienen letrados de Mora & Jordano en las sedes de Málaga y Córdoba, en todos los órdenes jurisdiccionales.'
          ] },
          { id: '2', heading: '2. Responsabilidades', list: [
            'Secretaría procesal: descarga a diario las notificaciones de LexNET recibidas por los procuradores, las vincula al expediente y hace el primer cómputo del plazo.',
            'Letrado responsable del expediente: hace el segundo cómputo, confirma el vencimiento y prepara el escrito.',
            'Socio responsable del área: supervisa los plazos que vencen en menos de 5 días hábiles y designa sustituto si el letrado responsable está ausente.',
            'Sistemas: vigila la disponibilidad de LexNET y comunica cualquier incidencia del servicio a Secretaría procesal en el momento.'
          ] },
          { id: '3', heading: '3. Recepción de notificaciones LexNET', text: [
            'Las notificaciones de LexNET se descargan y registran el mismo día de su recepción, como muy tarde a las 10:00 si llegan antes de esa hora y antes de las 18:00 en otro caso.',
            'Los actos de comunicación recibidos por el procurador se tienen por realizados el día hábil siguiente a su recepción (art. 151.2 LEC); si el destinatario no accede en tres días hábiles, la notificación se entiende efectuada (art. 162.2 LEC).',
            'Cada notificación se vincula al expediente del Gestor de expedientes y el documento se guarda en iManage con su justificante de recepción.'
          ] },
          { id: '4', heading: '4. Cómputo de plazos', text: [
            'Los plazos procesales se computan desde el día siguiente a aquel en que se tiene por hecha la notificación y se excluyen los días inhábiles: sábados, domingos, festivos nacionales, autonómicos y locales del partido judicial, y los días 24 y 31 de diciembre (arts. 133 LEC y 182 LOPJ).',
            'Agosto es inhábil para las actuaciones judiciales, salvo las declaradas urgentes por la ley (art. 130.2 LEC); en el orden penal, agosto es hábil para la instrucción.',
            'Los plazos señalados por meses o años se computan de fecha a fecha; si el último día es inhábil, el plazo se prorroga al siguiente hábil (art. 133.3 y 4 LEC).',
            'Todo plazo lo calculan dos personas de forma independiente (Secretaría procesal y letrado responsable); si los cómputos no coinciden, se toma el más corto hasta que lo resuelva el socio del área.',
            'Festivos locales que se cargan en el calendario del Gestor de expedientes: Málaga, 19 de agosto y 8 de septiembre; Córdoba, 8 de septiembre y 24 de octubre.'
          ] },
          { id: '5', heading: '5. Vencimiento interno y alertas', list: [
            'Cada plazo se registra con dos fechas: el vencimiento legal y un vencimiento interno 3 días hábiles antes, que es la fecha de trabajo del equipo.',
            'Si el plazo vence en menos de 5 días hábiles, el Gestor de expedientes avisa al socio responsable del área además del letrado responsable.',
            'Si el letrado responsable está de vacaciones o de baja, Secretaría procesal lo comunica al socio del área el mismo día para reasignar el expediente.'
          ] },
          { id: '6', heading: '6. Presentación de escritos', text: [
            'Los escritos sujetos a plazo pueden presentarse hasta las 15:00 del día hábil siguiente al del vencimiento (art. 135.5 LEC), pero el despacho no usa ese margen salvo autorización expresa del socio del área.',
            'Si LexNET no está disponible el último día, se conserva la captura del aviso de incidencia del servicio y se presenta en cuanto se restablezca, dejando constancia en el expediente.',
            'El justificante de presentación de LexNET se guarda en iManage y cierra el plazo en el Gestor de expedientes.'
          ] },
          { id: '7', heading: '7. Registros', list: [
            'Plazos, cómputos, alertas y cierres: Gestor de expedientes.',
            'Notificaciones, escritos y justificantes: iManage.',
            'Incidencias de LexNET: registro de Sistemas.'
          ] },
          { id: '8', heading: '8. Referencias', refs: true, list: [
            'Ley 1/2000, de Enjuiciamiento Civil, artículos 130 a 136, 151 y 162.',
            'Ley Orgánica 6/1985, del Poder Judicial, artículo 182.',
            'Real Decreto 1065/2015, sobre comunicaciones electrónicas en la Administración de Justicia (LexNET).'
          ] }
        ]
      },
      {
        code: 'POL-CON-002',
        title: 'Política de conflictos de intereses y aceptación de encargos',
        short: 'Conflictos y aceptación de encargos',
        type: 'Política',
        version: '5',
        date: '2026-03-02',
        owner: 'Socio director',
        summary: 'Ningún encargo se acepta sin búsqueda de conflictos en el Gestor de expedientes (partes, contrarias y grupos, últimos 10 años). Conflicto potencial: decide el Socio director con informe de Cumplimiento; si no se resuelve, se informa al cliente a tiempo para que designe otro letrado.',
        sections: [
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Evitar que el despacho defienda intereses contrapuestos o use información confidencial de un cliente en perjuicio de otro, conforme al artículo 12 del Código Deontológico de la Abogacía Española.',
            'Aplica a todos los encargos nuevos, a las ampliaciones de encargo y a la incorporación de nuevas partes a un expediente abierto, en todas las áreas y sedes.'
          ] },
          { id: '2', heading: '2. Búsqueda de conflictos', list: [
            'Antes de aceptar un encargo se busca en el Gestor de expedientes al cliente, a la parte contraria y a sus sociedades del grupo, administradores y socios relevantes.',
            'La búsqueda cubre los expedientes abiertos y los cerrados en los últimos 10 años, incluidas las consultas que no llegaron a encargo.',
            'El resultado se clasifica como sin conflicto, conflicto potencial o conflicto, y queda registrado en el expediente.'
          ] },
          { id: '3', heading: '3. Conflicto potencial y conflicto', text: [
            'Ante un conflicto potencial, el letrado no acepta el encargo ni hace ninguna actuación: lo comunica a Cumplimiento, que emite informe en 24 h, y decide el Socio director.',
            'El despacho no asesora ni defiende a dos clientes con intereses contrapuestos en el mismo asunto o en asuntos conexos.',
            'Contra un antiguo cliente solo se acepta un encargo si no hay riesgo de usar información obtenida en el encargo anterior ni de quebrar el secreto profesional; lo decide el Socio director con informe de Cumplimiento.',
            'Si el conflicto no se resuelve, se informa por escrito al cliente de que el despacho no puede aceptar el encargo, con tiempo suficiente para que designe otro letrado antes de que venza ningún plazo.'
          ] },
          { id: '4', heading: '4. Aceptación del encargo', list: [
            'Búsqueda de conflictos sin conflicto, o conflicto potencial resuelto por el Socio director.',
            'Diligencia debida de prevención del blanqueo completa cuando el encargo está sujeto a la Ley 10/2010, según MAN-PBC-003.',
            'Hoja de encargo firmada por el cliente según POL-HON-004.',
            'La aceptación y la primera comunicación al cliente las aprueba el socio del área; los encargos con conflicto potencial, el Socio director.'
          ] },
          { id: '5', heading: '5. Barreras de información', text: [
            'Cuando el Socio director autoriza un encargo con conflicto potencial resuelto, el expediente se restringe en iManage y en el Gestor de expedientes a los profesionales asignados, y se registra quién accede.'
          ] },
          { id: '6', heading: '6. Registros', list: [
            'Búsquedas, resultados e informes de Cumplimiento: Gestor de expedientes.',
            'Barreras de información y accesos: iManage.'
          ] },
          { id: '7', heading: '7. Referencias', refs: true, list: [
            'Código Deontológico de la Abogacía Española, artículos 5 (secreto profesional) y 12 (conflicto de intereses).',
            'Real Decreto 135/2021, por el que se aprueba el Estatuto General de la Abogacía Española.'
          ] }
        ]
      },
      {
        code: 'MAN-PBC-003',
        title: 'Manual de prevención del blanqueo de capitales y de la financiación del terrorismo',
        short: 'Manual de PBC/FT',
        type: 'Manual',
        version: '7',
        date: '2026-05-18',
        owner: 'Responsable de Cumplimiento (PBC y RGPD)',
        summary: 'Encargos sujetos a la Ley 10/2010 (operaciones inmobiliarias, sociedades, fondos), diligencia debida antes de actuar (identificación, titular real > 25 %), reforzada para PEP y países de alto riesgo, comunicación al SEPBLAC sin revelarlo al cliente y conservación 10 años.',
        sections: [
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Recoger las medidas de Mora & Jordano para prevenir el blanqueo de capitales y la financiación del terrorismo, según la Ley 10/2010 y su Reglamento, aprobado por el Real Decreto 304/2014.',
            'El despacho es sujeto obligado cuando participa en la compraventa de inmuebles o empresas, la gestión de fondos o valores del cliente, la apertura o gestión de cuentas, la creación, gestión o dirección de sociedades o fideicomisos, o actúa por cuenta del cliente en operaciones financieras o inmobiliarias (art. 2.1.ñ Ley 10/2010).',
            'No están sujetos a comunicación la defensa en un procedimiento judicial ni el asesoramiento sobre la posición jurídica del cliente, salvo que el letrado sepa que el cliente busca asesoramiento para blanquear (art. 22 Ley 10/2010).'
          ] },
          { id: '2', heading: '2. Órganos de control', list: [
            'Representante ante el SEPBLAC y órgano de control interno: el Responsable de Cumplimiento (PBC y RGPD).',
            'Comité de PBC: Socio director, Responsable de Cumplimiento y socio del área afectada; se reúne cada trimestre y cuando hay una operación en examen.'
          ] },
          { id: '3', heading: '3. Diligencia debida', list: [
            'Identificación formal del cliente con documento fehaciente antes de iniciar cualquier actuación en un encargo sujeto.',
            'Identificación del titular real cuando el cliente es una persona jurídica: quien posee o controla más del 25 % del capital o de los derechos de voto, consultando el Registro de Titularidades Reales y el Registro Mercantil.',
            'Propósito e índole del encargo y, cuando el perfil lo requiera, origen de los fondos.',
            'Mientras la diligencia debida no está completa en el Gestor de expedientes, no se hace ninguna actuación sujeta ni se emite factura.',
            'Actualización de la documentación según el riesgo: cada año en riesgo alto, cada 3 años en medio y cada 5 años en bajo.'
          ] },
          { id: '4', heading: '4. Diligencia reforzada', list: [
            'Personas con responsabilidad pública (PEP), sus familiares y allegados: aprobación del encargo por el Socio director y el Responsable de Cumplimiento, y comprobación del origen del patrimonio y de los fondos.',
            'Clientes, fondos u operaciones vinculados a países de alto riesgo identificados por el GAFI o la Comisión Europea.',
            'Estructuras societarias complejas o sin justificación económica aparente, y pagos en efectivo o desde terceros no vinculados.'
          ] },
          { id: '5', heading: '5. Examen especial y comunicación', text: [
            'Cualquier profesional que detecte un indicio lo comunica al Responsable de Cumplimiento por el canal interno, sin informar al cliente.',
            'El Responsable de Cumplimiento hace el examen especial y, si hay indicio o certeza de blanqueo, lo comunica al SEPBLAC sin dilación, previa reunión del Comité de PBC.',
            'Está prohibido revelar al cliente o a terceros que se ha comunicado una operación o que se está examinando (art. 24 Ley 10/2010).',
            'Mientras se examina, el letrado se abstiene de ejecutar la operación sospechosa.'
          ] },
          { id: '6', heading: '6. Conservación, formación y revisión', text: [
            'La documentación de diligencia debida y de las operaciones se conserva 10 años desde el fin de la relación de negocio o desde la operación.',
            'Todos los profesionales reciben formación anual en PBC/FT, que se acredita en el expediente personal.',
            'Un experto externo revisa cada año el sistema de PBC/FT del despacho y su informe se presenta al Comité de PBC.'
          ] },
          { id: '7', heading: '7. Referencias', refs: true, list: [
            'Ley 10/2010, de prevención del blanqueo de capitales y de la financiación del terrorismo.',
            'Real Decreto 304/2014, por el que se aprueba su Reglamento.',
            'Directiva (UE) 2015/849 y Reglamento (UE) 2024/1624.'
          ] }
        ]
      },
      {
        code: 'POL-HON-004',
        title: 'Política de honorarios, hoja de encargo y facturación',
        short: 'Honorarios y hoja de encargo',
        type: 'Política',
        version: '6',
        date: '2026-02-23',
        owner: 'Atención al cliente y facturación',
        summary: 'Hoja de encargo firmada antes de empezar, con alcance, honorarios y presupuesto. Desviación de más del 10 %: comunicación previa por escrito y aceptación del cliente. Informe de avance mensual. Quejas sobre minutas: acuse en 48 h y respuesta en 15 días.',
        sections: [
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Fijar cómo se pactan, informan y facturan los honorarios del despacho para que el cliente conozca de antemano su coste y no reciba minutas que no esperaba.',
            'Aplica a todos los encargos profesionales de Mora & Jordano, con independencia del área y de la sede.'
          ] },
          { id: '2', heading: '2. Hoja de encargo', list: [
            'Ningún trabajo empieza sin hoja de encargo firmada por el cliente, por Signaturit o en papel, salvo actuaciones urgentes autorizadas por el socio del área, que se formalizan en 5 días hábiles.',
            'La hoja de encargo recoge: identificación del cliente, alcance del encargo y lo que queda fuera, profesionales asignados, forma de cálculo de los honorarios, presupuesto estimado, provisión de fondos, gastos y suplidos, e impuestos aplicables.',
            'Cuando el cliente es consumidor, la hoja incluye además la información previa exigida por la normativa de consumidores y el derecho a pedir presupuesto cerrado.'
          ] },
          { id: '3', heading: '3. Cálculo de los honorarios', list: [
            'Por horas: tarifa horaria por categoría profesional publicada en la hoja de encargo, con imputación en el Gestor de expedientes en fracciones de 15 min.',
            'Precio cerrado: importe fijo por fase o por asunto, con los supuestos que lo modifican descritos en la hoja de encargo.',
            'Mixto: precio cerrado más un componente variable vinculado al resultado, que nunca puede ser el único honorario.'
          ] },
          { id: '4', heading: '4. Desviaciones del presupuesto', text: [
            'Si los honorarios previstos van a superar en más de un 10 % el presupuesto de la hoja de encargo, el letrado responsable lo comunica por escrito al cliente antes de seguir, con el motivo y la nueva estimación.',
            'El exceso solo se factura si el cliente lo acepta por escrito; si no lo acepta, se factura hasta el presupuesto y el socio del área decide si se continúa con el encargo.'
          ] },
          { id: '5', heading: '5. Información al cliente', list: [
            'En los encargos de más de tres meses, el letrado responsable envía al cliente un informe de avance mensual con las actuaciones hechas, los próximos pasos y las horas acumuladas frente al presupuesto.',
            'Cada minuta va acompañada del detalle de actuaciones y horas por profesional cuando los honorarios se calculan por horas.'
          ] },
          { id: '6', heading: '6. Quejas sobre honorarios', text: [
            'Las quejas sobre minutas las registra Atención al cliente y facturación, que envía acuse de recibo en 48 h y suspende la reclamación de pago de la factura discutida mientras se tramita.',
            'La respuesta motivada se envía en 15 días desde la recepción, con el análisis de las horas imputadas frente a la hoja de encargo; la aprueba el socio del área y, si propone un abono, el Socio director.',
            'Si el cliente no está conforme, se le informa de que puede pedir el dictamen del Colegio de Abogados sobre los honorarios.'
          ] },
          { id: '7', heading: '7. Registros', list: [
            'Hojas de encargo firmadas: Signaturit e iManage.',
            'Horas, presupuestos, facturas y quejas: Gestor de expedientes.'
          ] },
          { id: '8', heading: '8. Referencias', refs: true, list: [
            'Real Decreto 135/2021, por el que se aprueba el Estatuto General de la Abogacía Española.',
            'Código Deontológico de la Abogacía Española, artículos 13 y 15.',
            'Real Decreto Legislativo 1/2007, texto refundido de la Ley General para la Defensa de los Consumidores y Usuarios.'
          ] }
        ]
      },
      {
        code: 'PRO-RGPD-005',
        title: 'Protocolo de protección de datos y gestión de brechas de seguridad',
        short: 'Protección de datos y brechas',
        type: 'Protocolo',
        version: '4',
        date: '2026-04-07',
        owner: 'Delegado de Protección de Datos',
        summary: 'Toda sospecha de brecha se comunica al DPD en 1 h. Notificación a la AEPD en 72 h desde el conocimiento salvo riesgo improbable; a los interesados sin dilación si hay alto riesgo, salvo que los datos estuvieran cifrados. Registro interno de todas las brechas.',
        sections: [
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Proteger los datos personales que el despacho trata como responsable y como encargado, y responder a las brechas de seguridad en los plazos del RGPD, preservando el secreto profesional.',
            'Aplica a todos los profesionales, sistemas (iManage, Gestor de expedientes, Outlook, Microsoft Teams) y proveedores del despacho.'
          ] },
          { id: '2', heading: '2. Medidas básicas', list: [
            'Los documentos de clientes se envían por correo solo cifrados o mediante enlace seguro de iManage, y el remitente comprueba el destinatario antes de enviar.',
            'El correo externo con adjuntos de expedientes pasa por la regla de prevención de fuga de datos de Outlook, que pide confirmación si el dominio del destinatario no consta en el expediente.',
            'Los datos de clientes se alojan en centros de datos de la Unión Europea; cualquier proveedor que trate datos firma contrato de encargado del tratamiento (art. 28 RGPD).'
          ] },
          { id: '3', heading: '3. Detección y comunicación interna', text: [
            'Cualquier profesional que detecte o sospeche una brecha lo comunica al Delegado de Protección de Datos y a Sistemas en 1 h, por Teams o por teléfono, sin esperar a confirmarla.',
            'El DPD abre el expediente de brecha, fija la hora de conocimiento y coordina con Sistemas la contención: retirada del envío, revocación de enlaces o accesos y bloqueo de cuentas.'
          ] },
          { id: '4', heading: '4. Evaluación y notificación a la AEPD', text: [
            'El DPD evalúa la brecha: tipo de datos, categorías especiales o datos sujetos a secreto profesional, número de interesados, si los datos estaban cifrados y la posibilidad de identificar a las personas.',
            'Si es probable un riesgo para los derechos de las personas, la brecha se notifica a la AEPD en 72 h desde que se tuvo conocimiento; si se notifica más tarde, se explican los motivos del retraso (art. 33 RGPD).',
            'La notificación la prepara el DPD y la aprueba el Socio director antes del envío por la sede electrónica de la AEPD.'
          ] },
          { id: '5', heading: '5. Comunicación a los interesados y a los clientes', list: [
            'Si la brecha supone un alto riesgo, se comunica a los interesados sin dilación indebida, en lenguaje claro y con las medidas recomendadas (art. 34 RGPD).',
            'No es necesaria la comunicación a los interesados si los datos estaban cifrados de forma que resulten ininteligibles para quien acceda a ellos.',
            'Cuando el despacho actúa como encargado o los datos afectan a un expediente, se informa al cliente sin dilación indebida, y la comunicación la aprueba el Socio director.'
          ] },
          { id: '6', heading: '6. Herramientas de inteligencia artificial', text: [
            'Los datos de clientes solo pueden introducirse en herramientas de IA generativa autorizadas por el despacho y en las condiciones de POL-IA-007 (Política de uso de IA generativa con datos de clientes).'
          ] },
          { id: '7', heading: '7. Registros', list: [
            'Todas las brechas, se notifiquen o no, se anotan en el registro interno de brechas con los hechos, los efectos y las medidas adoptadas (art. 33.5 RGPD).',
            'Expediente de la brecha, evaluación y notificaciones: Gestor de expedientes.',
            'Documentos afectados y accesos: iManage.'
          ] },
          { id: '8', heading: '8. Referencias', refs: true, list: [
            'Reglamento (UE) 2016/679, General de Protección de Datos, artículos 28, 32, 33 y 34.',
            'Ley Orgánica 3/2018, de Protección de Datos Personales y garantía de los derechos digitales.',
            'Guía de la AEPD para la gestión y notificación de brechas de datos personales.'
          ] }
        ]
      },
      {
        code: 'CAL-TRI-006',
        title: 'Calendario tributario y procedimiento de presentación de modelos',
        short: 'Calendario tributario',
        type: 'Procedimiento',
        version: '12',
        date: '2026-01-08',
        owner: 'Socia responsable de Fiscal y Tributario',
        summary: 'Plazos de los modelos 200, 202, 303, 390 y 720. Borrador aprobado por el cliente por Signaturit y presentación en la Sede AEAT como muy tarde 3 días hábiles antes del vencimiento; justificante archivado en iManage.',
        sections: [
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Asegurar que las declaraciones tributarias que el despacho presenta por cuenta de sus clientes se preparan, aprueban y presentan en plazo en la Sede electrónica de la AEAT.',
            'Aplica a los clientes con encargo de cumplimiento tributario del área de Fiscal y Tributario en Málaga y Córdoba.'
          ] },
          { id: '2', heading: '2. Plazos de los principales modelos', list: [
            'Modelo 200 (Impuesto sobre Sociedades): en los 25 días naturales siguientes a los seis meses posteriores a la conclusión del período impositivo; para los ejercicios que coinciden con el año natural, del 1 al 25 de julio, y para los cerrados el 31 de marzo, hasta el 25 de octubre.',
            'Modelo 202 (pagos fraccionados del Impuesto sobre Sociedades): del 1 al 20 de abril, de octubre y de diciembre.',
            'Modelo 303 (IVA, autoliquidación trimestral): del 1 al 20 de abril, julio y octubre, y del 1 al 30 de enero el cuarto trimestre.',
            'Modelo 390 (IVA, resumen anual): del 1 al 30 de enero.',
            'Modelo 720 (bienes y derechos en el extranjero): del 1 de enero al 31 de marzo, cuando el valor de algún bloque de bienes supera 50.000 €; en años siguientes, solo si ese valor aumenta en más de 20.000 €.'
          ] },
          { id: '3', heading: '3. Preparación y aprobación', list: [
            'El área de Fiscal y Tributario pide al cliente la documentación 20 días naturales antes del vencimiento.',
            'El borrador de la declaración lo revisa un segundo profesional del área distinto de quien lo preparó.',
            'El cliente aprueba el borrador por Signaturit; sin aprobación firmada no se presenta ninguna declaración.'
          ] },
          { id: '4', heading: '4. Presentación', text: [
            'Las declaraciones se presentan en la Sede electrónica de la AEAT, como colaborador social o con el certificado de representación del cliente, como muy tarde 3 días hábiles antes del vencimiento.',
            'Cuando la declaración sale a ingresar y se domicilia, la orden de domiciliación se da como muy tarde cinco días naturales antes del fin del plazo.',
            'Si la Sede AEAT no está disponible el último día, se guarda la captura del error y se presenta en cuanto se restablezca, avisando a la socia responsable de Fiscal y Tributario.'
          ] },
          { id: '5', heading: '5. Registros', list: [
            'Calendario por cliente y alertas de vencimiento: Gestor de expedientes.',
            'Borradores aprobados y justificantes de presentación: iManage.'
          ] },
          { id: '6', heading: '6. Referencias', refs: true, list: [
            'Ley 27/2014, del Impuesto sobre Sociedades, artículos 40 y 124.',
            'Ley 37/1992, del Impuesto sobre el Valor Añadido, y Orden HAC/3625/2003 (modelos 303 y 390).',
            'Disposición adicional decimoctava de la Ley 58/2003, General Tributaria (modelo 720).'
          ] }
        ]
      }
    ],

    unindexed: {
      'POL-IA-007': { title: 'Política de uso de IA generativa con datos de clientes', mentionedIn: { doc: 'PRO-RGPD-005', sec: '6', quote: 'en las condiciones de POL-IA-007 (Política de uso de IA generativa con datos de clientes)' } }
    },

    suggested: ['plazo-computo', 'conflicto', 'diligencia-debida', 'desviacion', 'brecha', 'modelo-200'],

    intents: [
      {
        id: 'plazo-computo', icon: 'calendar', topic: 'Plazos procesales · cómputo', scope: 'all',
        q: '¿Cómo se computa un plazo procesal?',
        anchors: ['plazo procesal', 'plazos procesales', 'cómputo', 'computa', 'computar', 'días hábiles', 'vence', 'vencimiento'],
        terms: ['plazo', 'plazos', 'cómo', 'cuenta', 'contar', 'días', 'hábiles', 'inhábiles', 'festivos', 'contestación', 'demanda'],
        min: 3,
        blocks: [
          { t: 'Desde el día siguiente a aquel en que se tiene por hecha la notificación, excluyendo sábados, domingos, festivos nacionales, autonómicos y locales, y los días 24 y 31 de diciembre.', c: [['PRO-PLZ-001', 4, 'Los plazos procesales se computan desde el día siguiente a aquel en que se tiene por hecha la notificación y se excluyen los días inhábiles: sábados, domingos, festivos nacionales, autonómicos y locales del partido judicial, y los días 24 y 31 de diciembre (arts. 133 LEC y 182 LOPJ).']] },
          { t: 'Agosto es inhábil, salvo para las actuaciones urgentes.', c: [['PRO-PLZ-001', 4, 'Agosto es inhábil para las actuaciones judiciales, salvo las declaradas urgentes por la ley (art. 130.2 LEC)']] },
          { t: 'Lo calculan dos personas de forma independiente; si no coinciden, se toma el cómputo más corto hasta que decida el socio del área.', c: [['PRO-PLZ-001', 4, 'Todo plazo lo calculan dos personas de forma independiente (Secretaría procesal y letrado responsable); si los cómputos no coinciden, se toma el más corto hasta que lo resuelva el socio del área.']] },
          { t: 'Se registra con el vencimiento legal y un vencimiento interno 3 días hábiles antes.', c: [['PRO-PLZ-001', 5, 'Cada plazo se registra con dos fechas: el vencimiento legal y un vencimiento interno 3 días hábiles antes, que es la fecha de trabajo del equipo.']] }
        ],
        context: {
          systems: ['LexNET', 'Gestor de expedientes'],
          text: 'Demanda de juicio ordinario contra Aceites Sierra Subbética, S.L. (Juzgado de Primera Instancia nº 7 de Málaga, PO 1184/2026), notificada por LexNET a las 08:12: plazo de contestación de 20 días hábiles con vencimiento el 27-10-2026. El asociado asignado está de vacaciones y hay un posible conflicto de intereses (expediente PRC-2026-0412).',
          outcome: 'alarma',
          go: 'alarma', goLabel: 'Abrir alarma PO 1184/2026'
        },
        followups: ['agosto', 'presentacion']
      },
      {
        id: 'agosto', icon: 'clock', topic: 'Plazos procesales · agosto y festivos', scope: 'all',
        q: '¿Es hábil agosto para los plazos procesales?',
        anchors: ['agosto', 'festivo', 'festivos', 'inhábil', 'inhábiles', '24 de diciembre', '31 de diciembre'],
        terms: ['hábil', 'plazo', 'plazos', 'penal', 'urgente', 'málaga', 'córdoba', 'local', 'locales', 'cuenta'],
        min: 3,
        blocks: [
          { t: 'No: agosto es inhábil para las actuaciones judiciales, salvo las urgentes; en el orden penal es hábil para la instrucción.', c: [['PRO-PLZ-001', 4, 'Agosto es inhábil para las actuaciones judiciales, salvo las declaradas urgentes por la ley (art. 130.2 LEC); en el orden penal, agosto es hábil para la instrucción.']] },
          { t: 'Tampoco cuentan el 24 y el 31 de diciembre ni los festivos locales del partido judicial: en Málaga, el 19 de agosto y el 8 de septiembre; en Córdoba, el 8 de septiembre y el 24 de octubre.', c: [['PRO-PLZ-001', 4, 'y los días 24 y 31 de diciembre'], ['PRO-PLZ-001', 4, 'Festivos locales que se cargan en el calendario del Gestor de expedientes: Málaga, 19 de agosto y 8 de septiembre; Córdoba, 8 de septiembre y 24 de octubre.']] },
          { t: 'Los plazos por meses se cuentan de fecha a fecha y, si el último día es inhábil, pasan al siguiente hábil.', c: [['PRO-PLZ-001', 4, 'Los plazos señalados por meses o años se computan de fecha a fecha; si el último día es inhábil, el plazo se prorroga al siguiente hábil (art. 133.3 y 4 LEC).']] }
        ],
        followups: ['plazo-computo']
      },
      {
        id: 'lexnet', icon: 'mail', topic: 'Plazos procesales · notificaciones LexNET', scope: 'all',
        q: '¿Cuándo se entiende hecha una notificación de LexNET?',
        anchors: ['lexnet', 'notificación', 'notificaciones', 'acto de comunicación', 'actos de comunicación', 'procurador'],
        terms: ['cuándo', 'entiende', 'hecha', 'realizada', 'recibe', 'recepción', 'accede', 'días', 'registrar', 'descargar'],
        min: 3,
        blocks: [
          { t: 'El día hábil siguiente a su recepción por el procurador; si nadie accede en tres días hábiles, se entiende efectuada.', c: [['PRO-PLZ-001', 3, 'Los actos de comunicación recibidos por el procurador se tienen por realizados el día hábil siguiente a su recepción (art. 151.2 LEC); si el destinatario no accede en tres días hábiles, la notificación se entiende efectuada (art. 162.2 LEC).']] },
          { t: 'Secretaría procesal la descarga y registra el mismo día, la vincula al expediente y hace el primer cómputo del plazo.', c: [['PRO-PLZ-001', 3, 'Las notificaciones de LexNET se descargan y registran el mismo día de su recepción'], ['PRO-PLZ-001', 2, 'Secretaría procesal: descarga a diario las notificaciones de LexNET recibidas por los procuradores, las vincula al expediente y hace el primer cómputo del plazo.']] },
          { t: 'Si vence en menos de 5 días hábiles, se avisa también al socio del área.', c: [['PRO-PLZ-001', 5, 'Si el plazo vence en menos de 5 días hábiles, el Gestor de expedientes avisa al socio responsable del área además del letrado responsable.']] }
        ],
        context: {
          systems: ['LexNET', 'Gestor de expedientes', 'Microsoft Teams'],
          text: 'Este protocolo es el que se ha convertido en workflow: al llegar una notificación de LexNET, identificar el expediente, calcular el plazo, comprobar conflictos, avisar al letrado por Teams y, si vence en menos de 5 días, al socio.',
          go: 'workflow', goLabel: 'Abrir el workflow de LexNET'
        },
        followups: ['plazo-computo', 'vacaciones']
      },
      {
        id: 'presentacion', icon: 'send', topic: 'Plazos procesales · presentación de escritos', scope: 'all',
        q: '¿Hasta qué hora se puede presentar un escrito el último día?',
        anchors: ['presentar', 'presentación', 'escrito', 'escritos', '15:00', 'día de gracia'],
        terms: ['hora', 'último', 'día', 'plazo', 'vencimiento', 'lexnet', 'caído', 'disponible', 'justificante'],
        min: 3,
        blocks: [
          { t: 'Hasta las 15:00 del día hábil siguiente al vencimiento, pero el despacho no usa ese margen sin autorización expresa del socio del área.', c: [['PRO-PLZ-001', 6, 'Los escritos sujetos a plazo pueden presentarse hasta las 15:00 del día hábil siguiente al del vencimiento (art. 135.5 LEC), pero el despacho no usa ese margen salvo autorización expresa del socio del área.']] },
          { t: 'Si LexNET no funciona el último día, se guarda la captura del aviso de incidencia y se presenta en cuanto se restablezca.', c: [['PRO-PLZ-001', 6, 'Si LexNET no está disponible el último día, se conserva la captura del aviso de incidencia del servicio y se presenta en cuanto se restablezca, dejando constancia en el expediente.']] },
          { t: 'El justificante de LexNET se archiva en iManage y cierra el plazo.', c: [['PRO-PLZ-001', 6, 'El justificante de presentación de LexNET se guarda en iManage y cierra el plazo en el Gestor de expedientes.']] }
        ],
        followups: ['plazo-computo', 'lexnet']
      },
      {
        id: 'vacaciones', icon: 'users', topic: 'Plazos procesales · ausencia del letrado', scope: 'all',
        q: '¿Qué pasa con un plazo si el letrado responsable está de vacaciones?',
        anchors: ['vacaciones', 'ausente', 'ausencia', 'baja', 'sustituto', 'reasignar', 'reasignación'],
        terms: ['letrado', 'responsable', 'plazo', 'expediente', 'socio', 'pasa', 'quién'],
        min: 3,
        blocks: [
          { t: 'Secretaría procesal lo comunica al socio del área el mismo día para reasignar el expediente.', c: [['PRO-PLZ-001', 5, 'Si el letrado responsable está de vacaciones o de baja, Secretaría procesal lo comunica al socio del área el mismo día para reasignar el expediente.']] },
          { t: 'El socio responsable del área designa al sustituto y supervisa los plazos que vencen en menos de 5 días hábiles.', c: [['PRO-PLZ-001', 2, 'Socio responsable del área: supervisa los plazos que vencen en menos de 5 días hábiles y designa sustituto si el letrado responsable está ausente.']] }
        ],
        context: {
          systems: ['Gestor de expedientes', 'Microsoft Teams'],
          text: 'PO 1184/2026 (Aceites Sierra Subbética): el asociado asignado está de vacaciones; el agente propone reasignar el expediente PRC-2026-0412 en cuanto se resuelva el posible conflicto.',
          outcome: 'alarma',
          go: 'alarma', goLabel: 'Abrir alarma PO 1184/2026'
        },
        followups: ['plazo-computo', 'conflicto']
      },
      {
        id: 'conflicto', icon: 'scale', topic: 'Conflictos de intereses · conflicto potencial', scope: 'all',
        q: '¿Qué hacemos si detectamos un posible conflicto de intereses?',
        anchors: ['conflicto de intereses', 'conflictos de intereses', 'conflicto', 'conflictos', 'intereses contrapuestos'],
        terms: ['posible', 'potencial', 'detectamos', 'hacemos', 'encargo', 'aceptar', 'cliente', 'decide', 'cumplimiento'],
        min: 3,
        blocks: [
          { t: 'No se acepta el encargo ni se hace ninguna actuación: se comunica a Cumplimiento, que informa en 24 h, y decide el Socio director.', c: [['POL-CON-002', 3, 'Ante un conflicto potencial, el letrado no acepta el encargo ni hace ninguna actuación: lo comunica a Cumplimiento, que emite informe en 24 h, y decide el Socio director.']] },
          { t: 'El despacho nunca defiende a dos clientes con intereses contrapuestos en el mismo asunto o en asuntos conexos.', c: [['POL-CON-002', 3, 'El despacho no asesora ni defiende a dos clientes con intereses contrapuestos en el mismo asunto o en asuntos conexos.']] },
          { t: 'Si el conflicto no se resuelve, se informa por escrito al cliente con tiempo para que designe otro letrado antes de que venza ningún plazo.', c: [['POL-CON-002', 3, 'Si el conflicto no se resuelve, se informa por escrito al cliente de que el despacho no puede aceptar el encargo, con tiempo suficiente para que designe otro letrado antes de que venza ningún plazo.']] },
          { t: 'Si se autoriza, el expediente queda restringido en iManage y en el Gestor de expedientes a los profesionales asignados.', c: [['POL-CON-002', 5, 'el expediente se restringe en iManage y en el Gestor de expedientes a los profesionales asignados, y se registra quién accede']] }
        ],
        context: {
          systems: ['Gestor de expedientes', 'LexNET'],
          text: 'PO 1184/2026 contra Aceites Sierra Subbética, S.L.: el despacho asesoró en 2025 a la parte demandante. Conflicto potencial según el artículo 12 del Código Deontológico; el agente bloquea la aceptación del encargo hasta que decida el Socio director.',
          outcome: 'alarma',
          go: 'alarma', goLabel: 'Abrir alarma PO 1184/2026'
        },
        followups: ['antiguo-cliente', 'apertura']
      },
      {
        id: 'antiguo-cliente', icon: 'user-check', topic: 'Conflictos de intereses · antiguos clientes', scope: 'all',
        q: '¿Podemos actuar contra un antiguo cliente?',
        anchors: ['antiguo cliente', 'antiguos clientes', 'excliente', 'cliente anterior', 'contra un cliente'],
        terms: ['actuar', 'podemos', 'contra', 'demandar', 'información', 'secreto', 'encargo', 'anterior'],
        min: 2,
        blocks: [
          { t: 'Solo si no hay riesgo de usar información obtenida en el encargo anterior ni de quebrar el secreto profesional; lo decide el Socio director con informe de Cumplimiento.', c: [['POL-CON-002', 3, 'Contra un antiguo cliente solo se acepta un encargo si no hay riesgo de usar información obtenida en el encargo anterior ni de quebrar el secreto profesional; lo decide el Socio director con informe de Cumplimiento.']] },
          { t: 'La búsqueda de conflictos cubre los expedientes cerrados en los últimos 10 años, incluidas las consultas que no llegaron a encargo.', c: [['POL-CON-002', 2, 'La búsqueda cubre los expedientes abiertos y los cerrados en los últimos 10 años, incluidas las consultas que no llegaron a encargo.']] }
        ],
        followups: ['conflicto']
      },
      {
        id: 'apertura', icon: 'clipboard', topic: 'Aceptación de encargos · apertura de expediente', scope: 'all',
        q: '¿Qué hace falta para abrir un expediente nuevo?',
        anchors: ['abrir un expediente', 'expediente nuevo', 'nuevo expediente', 'apertura', 'aceptar un encargo', 'aceptación', 'encargo nuevo', 'nuevo cliente'],
        terms: ['hace falta', 'requisitos', 'abrir', 'expediente', 'encargo', 'aprueba', 'necesita'],
        min: 2,
        blocks: [
          { list: [
            { t: 'Búsqueda de conflictos sin conflicto, o conflicto potencial resuelto por el Socio director.', c: [['POL-CON-002', 4, 'Búsqueda de conflictos sin conflicto, o conflicto potencial resuelto por el Socio director.']] },
            { t: 'Diligencia debida de prevención del blanqueo completa si el encargo está sujeto a la Ley 10/2010.', c: [['POL-CON-002', 4, 'Diligencia debida de prevención del blanqueo completa cuando el encargo está sujeto a la Ley 10/2010, según MAN-PBC-003.']] },
            { t: 'Hoja de encargo firmada por el cliente.', c: [['POL-CON-002', 4, 'Hoja de encargo firmada por el cliente según POL-HON-004.']] }
          ] },
          { t: 'Aprueba la aceptación y la primera comunicación al cliente el socio del área, o el Socio director si hubo conflicto potencial.', c: [['POL-CON-002', 4, 'La aceptación y la primera comunicación al cliente las aprueba el socio del área; los encargos con conflicto potencial, el Socio director.']] }
        ],
        followups: ['conflicto', 'diligencia-debida', 'hoja-encargo']
      },
      {
        id: 'diligencia-debida', icon: 'shield-check', topic: 'PBC/FT · diligencia debida', scope: 'all',
        q: '¿Qué diligencia debida hay que hacer a un cliente nuevo?',
        anchors: ['diligencia debida', 'kyc', 'titular real', 'identificación', 'blanqueo', 'pbc'],
        terms: ['cliente', 'nuevo', 'sociedad', 'documento', '25', 'capital', 'factura', 'actuación', 'hacer'],
        min: 2,
        blocks: [
          { t: 'Identificación formal con documento fehaciente antes de cualquier actuación en un encargo sujeto.', c: [['MAN-PBC-003', 3, 'Identificación formal del cliente con documento fehaciente antes de iniciar cualquier actuación en un encargo sujeto.']] },
          { t: 'Si es una sociedad, identificación del titular real (más del 25 % del capital o de los votos) con el Registro de Titularidades Reales y el Registro Mercantil.', c: [['MAN-PBC-003', 3, 'Identificación del titular real cuando el cliente es una persona jurídica: quien posee o controla más del 25 % del capital o de los derechos de voto, consultando el Registro de Titularidades Reales y el Registro Mercantil.']] },
          { t: 'Propósito del encargo y, si el perfil lo pide, origen de los fondos.', c: [['MAN-PBC-003', 3, 'Propósito e índole del encargo y, cuando el perfil lo requiera, origen de los fondos.']] },
          { t: 'Hasta que esté completa, no se hace ninguna actuación sujeta ni se factura.', c: [['MAN-PBC-003', 3, 'Mientras la diligencia debida no está completa en el Gestor de expedientes, no se hace ninguna actuación sujeta ni se emite factura.']] }
        ],
        context: {
          systems: ['Gestor de expedientes'],
          text: 'El resumen del día marca expedientes de PBC con la diligencia debida incompleta: hasta completarla no se puede actuar ni facturar en ellos.',
          go: 'turno', goLabel: 'Abrir el resumen del día'
        },
        followups: ['pbc-ambito', 'pep', 'sospechosa']
      },
      {
        id: 'pbc-ambito', icon: 'book-open', topic: 'PBC/FT · encargos sujetos', scope: 'all',
        q: '¿Cuándo está sujeto el despacho a la Ley 10/2010?',
        anchors: ['ley 10/2010', 'sujeto obligado', 'sujeto', 'sujetos', 'encargos sujetos'],
        terms: ['cuándo', 'despacho', 'abogado', 'compraventa', 'inmuebles', 'sociedades', 'defensa', 'judicial', 'asesoramiento'],
        min: 2,
        blocks: [
          { t: 'Cuando participa en la compraventa de inmuebles o empresas, gestiona fondos, valores o cuentas del cliente, crea o gestiona sociedades o fideicomisos, o actúa por su cuenta en operaciones financieras o inmobiliarias.', c: [['MAN-PBC-003', 1, 'El despacho es sujeto obligado cuando participa en la compraventa de inmuebles o empresas, la gestión de fondos o valores del cliente, la apertura o gestión de cuentas, la creación, gestión o dirección de sociedades o fideicomisos, o actúa por cuenta del cliente en operaciones financieras o inmobiliarias (art. 2.1.ñ Ley 10/2010).']] },
          { t: 'La defensa en juicio y el asesoramiento sobre la posición jurídica del cliente no están sujetos a comunicación, salvo que se sepa que busca asesoramiento para blanquear.', c: [['MAN-PBC-003', 1, 'No están sujetos a comunicación la defensa en un procedimiento judicial ni el asesoramiento sobre la posición jurídica del cliente, salvo que el letrado sepa que el cliente busca asesoramiento para blanquear (art. 22 Ley 10/2010).']] }
        ],
        followups: ['diligencia-debida', 'sospechosa']
      },
      {
        id: 'pep', icon: 'user', topic: 'PBC/FT · diligencia reforzada', scope: 'all',
        q: '¿Qué diligencia se aplica a una persona con responsabilidad pública?',
        anchors: ['pep', 'peps', 'responsabilidad pública', 'diligencia reforzada', 'alto riesgo', 'familiares y allegados'],
        terms: ['diligencia', 'aplica', 'cliente', 'aprobación', 'patrimonio', 'fondos', 'país', 'países', 'efectivo'],
        min: 2,
        blocks: [
          { t: 'Diligencia reforzada: aprueban el encargo el Socio director y el Responsable de Cumplimiento, y se comprueba el origen del patrimonio y de los fondos; también para familiares y allegados.', c: [['MAN-PBC-003', 4, 'Personas con responsabilidad pública (PEP), sus familiares y allegados: aprobación del encargo por el Socio director y el Responsable de Cumplimiento, y comprobación del origen del patrimonio y de los fondos.']] },
          { t: 'También se refuerza con países de alto riesgo, estructuras societarias sin justificación aparente y pagos en efectivo o desde terceros.', c: [['MAN-PBC-003', 4, 'Clientes, fondos u operaciones vinculados a países de alto riesgo identificados por el GAFI o la Comisión Europea.'], ['MAN-PBC-003', 4, 'Estructuras societarias complejas o sin justificación económica aparente, y pagos en efectivo o desde terceros no vinculados.']] }
        ],
        followups: ['diligencia-debida', 'sospechosa']
      },
      {
        id: 'sospechosa', icon: 'search', topic: 'PBC/FT · operaciones sospechosas', scope: 'all',
        q: '¿Qué hago si sospecho que un cliente blanquea capitales?',
        anchors: ['blanquea', 'blanqueo', 'sospechosa', 'sospechosas', 'sospecho', 'sepblac', 'examen especial', 'indicio'],
        terms: ['cliente', 'operación', 'comunicar', 'avisar', 'decir', 'hago', 'revelar', 'capitales'],
        min: 2,
        blocks: [
          { t: 'Comunicarlo al Responsable de Cumplimiento por el canal interno, sin informar al cliente, y abstenerse de ejecutar la operación mientras se examina.', c: [['MAN-PBC-003', 5, 'Cualquier profesional que detecte un indicio lo comunica al Responsable de Cumplimiento por el canal interno, sin informar al cliente.'], ['MAN-PBC-003', 5, 'Mientras se examina, el letrado se abstiene de ejecutar la operación sospechosa.']] },
          { t: 'Cumplimiento hace el examen especial y, si hay indicio o certeza, lo comunica al SEPBLAC sin dilación, tras reunir al Comité de PBC.', c: [['MAN-PBC-003', 5, 'El Responsable de Cumplimiento hace el examen especial y, si hay indicio o certeza de blanqueo, lo comunica al SEPBLAC sin dilación, previa reunión del Comité de PBC.']] },
          { t: 'Está prohibido revelar al cliente o a terceros que se ha comunicado o se está examinando.', c: [['MAN-PBC-003', 5, 'Está prohibido revelar al cliente o a terceros que se ha comunicado una operación o que se está examinando (art. 24 Ley 10/2010).']] },
          { t: 'La documentación se conserva 10 años.', c: [['MAN-PBC-003', 6, 'La documentación de diligencia debida y de las operaciones se conserva 10 años desde el fin de la relación de negocio o desde la operación.']] }
        ],
        followups: ['pbc-ambito', 'pep']
      },
      {
        id: 'hoja-encargo', icon: 'file-text', topic: 'Honorarios · hoja de encargo', scope: 'all',
        q: '¿Qué debe incluir la hoja de encargo?',
        anchors: ['hoja de encargo', 'hojas de encargo', 'encargo profesional', 'presupuesto', 'provisión de fondos'],
        terms: ['incluir', 'contenido', 'firmar', 'firma', 'cliente', 'honorarios', 'alcance', 'consumidor', 'debe'],
        min: 2,
        blocks: [
          { t: 'Identificación del cliente, alcance del encargo y lo que queda fuera, profesionales asignados, cálculo de los honorarios, presupuesto, provisión de fondos, gastos y suplidos, e impuestos.', c: [['POL-HON-004', 2, 'La hoja de encargo recoge: identificación del cliente, alcance del encargo y lo que queda fuera, profesionales asignados, forma de cálculo de los honorarios, presupuesto estimado, provisión de fondos, gastos y suplidos, e impuestos aplicables.']] },
          { t: 'Se firma antes de empezar, por Signaturit o en papel; las actuaciones urgentes autorizadas se formalizan en 5 días hábiles.', c: [['POL-HON-004', 2, 'Ningún trabajo empieza sin hoja de encargo firmada por el cliente, por Signaturit o en papel, salvo actuaciones urgentes autorizadas por el socio del área, que se formalizan en 5 días hábiles.']] },
          { t: 'Si el cliente es consumidor, incluye la información previa de la normativa de consumidores y el derecho a pedir presupuesto cerrado.', c: [['POL-HON-004', 2, 'Cuando el cliente es consumidor, la hoja incluye además la información previa exigida por la normativa de consumidores y el derecho a pedir presupuesto cerrado.']] }
        ],
        followups: ['desviacion', 'apertura']
      },
      {
        id: 'desviacion', icon: 'euro', topic: 'Honorarios · desviaciones del presupuesto', scope: 'all',
        q: '¿Qué pasa si los honorarios superan el presupuesto de la hoja de encargo?',
        anchors: ['superan el presupuesto', 'desviación', 'desviaciones', 'exceso', 'minuta', 'minutas', 'honorarios'],
        terms: ['presupuesto', 'superan', 'supera', 'factura', 'facturar', 'cliente', 'acepta', '10', 'informe', 'avance', 'horas'],
        min: 3,
        blocks: [
          { t: 'Si van a superar el presupuesto en más de un 10 %, el letrado lo comunica por escrito al cliente antes de seguir, con el motivo y la nueva estimación.', c: [['POL-HON-004', 4, 'Si los honorarios previstos van a superar en más de un 10 % el presupuesto de la hoja de encargo, el letrado responsable lo comunica por escrito al cliente antes de seguir, con el motivo y la nueva estimación.']] },
          { t: 'El exceso solo se factura si el cliente lo acepta por escrito; si no, se factura hasta el presupuesto.', c: [['POL-HON-004', 4, 'El exceso solo se factura si el cliente lo acepta por escrito; si no lo acepta, se factura hasta el presupuesto y el socio del área decide si se continúa con el encargo.']] },
          { t: 'En encargos de más de tres meses, el cliente recibe un informe de avance mensual con las horas acumuladas frente al presupuesto.', c: [['POL-HON-004', 5, 'En los encargos de más de tres meses, el letrado responsable envía al cliente un informe de avance mensual con las actuaciones hechas, los próximos pasos y las horas acumuladas frente al presupuesto.']] }
        ],
        context: {
          systems: ['Gestor de expedientes', 'Outlook'],
          text: 'Grupo Hostelero Costa del Sol, S.L. reclama la factura F-2026-0938 del área Mercantil (18.400 €), que considera superior a la hoja de encargo, y se queja de falta de información sobre el avance del asunto (expediente REC-2026-0057).',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Abrir queja de Grupo Hostelero'
        },
        followups: ['queja-minuta', 'hoja-encargo']
      },
      {
        id: 'queja-minuta', icon: 'message-square', topic: 'Honorarios · quejas sobre minutas', scope: 'all',
        q: '¿Qué plazo tenemos para responder a una queja sobre honorarios?',
        anchors: ['queja', 'quejas', 'reclamación', 'reclamaciones', 'queja sobre honorarios', 'impugna'],
        terms: ['plazo', 'responder', 'contestar', 'acuse', 'días', 'minuta', 'factura', 'honorarios', 'colegio', 'abono'],
        min: 3,
        blocks: [
          { list: [
            { t: 'Acuse de recibo en 48 h, y se suspende la reclamación de pago de la factura discutida.', c: [['POL-HON-004', 6, 'Las quejas sobre minutas las registra Atención al cliente y facturación, que envía acuse de recibo en 48 h y suspende la reclamación de pago de la factura discutida mientras se tramita.']] },
            { t: 'Respuesta motivada en 15 días desde la recepción, con el análisis de las horas imputadas frente a la hoja de encargo.', c: [['POL-HON-004', 6, 'La respuesta motivada se envía en 15 días desde la recepción, con el análisis de las horas imputadas frente a la hoja de encargo']] }
          ] },
          { t: 'La aprueba el socio del área y, si propone un abono, el Socio director; si el cliente no está conforme, puede pedir el dictamen del Colegio de Abogados.', c: [['POL-HON-004', 6, 'la aprueba el socio del área y, si propone un abono, el Socio director'], ['POL-HON-004', 6, 'Si el cliente no está conforme, se le informa de que puede pedir el dictamen del Colegio de Abogados sobre los honorarios.']] }
        ],
        context: {
          systems: ['Gestor de expedientes', 'Outlook'],
          text: 'Queja de Grupo Hostelero Costa del Sol sobre la factura F-2026-0938 (18.400 €): respuesta motivada en 15 días, con el análisis de horas imputadas del área Mercantil.',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Abrir queja de Grupo Hostelero'
        },
        followups: ['desviacion']
      },
      {
        id: 'brecha', icon: 'shield', topic: 'Protección de datos · notificación de brechas', scope: 'all',
        q: '¿En qué plazo hay que notificar una brecha de datos a la AEPD?',
        anchors: ['brecha', 'brechas', 'aepd', 'violación de seguridad', 'notificar', 'fuga de datos'],
        terms: ['plazo', 'horas', '72', 'datos', 'personales', 'notificación', 'correo', 'destinatario', 'equivocado'],
        min: 2,
        blocks: [
          { t: 'En 72 h desde que se tuvo conocimiento, si es probable un riesgo para los derechos de las personas; si se notifica más tarde, se explican los motivos del retraso.', c: [['PRO-RGPD-005', 4, 'Si es probable un riesgo para los derechos de las personas, la brecha se notifica a la AEPD en 72 h desde que se tuvo conocimiento; si se notifica más tarde, se explican los motivos del retraso (art. 33 RGPD).']] },
          { t: 'Quien la detecte avisa al DPD y a Sistemas en 1 h, sin esperar a confirmarla.', c: [['PRO-RGPD-005', 3, 'Cualquier profesional que detecte o sospeche una brecha lo comunica al Delegado de Protección de Datos y a Sistemas en 1 h, por Teams o por teléfono, sin esperar a confirmarla.']] },
          { t: 'La notificación la prepara el DPD y la aprueba el Socio director.', c: [['PRO-RGPD-005', 4, 'La notificación la prepara el DPD y la aprueba el Socio director antes del envío por la sede electrónica de la AEPD.']] },
          { t: 'Toda brecha, se notifique o no, va al registro interno de brechas.', c: [['PRO-RGPD-005', 7, 'Todas las brechas, se notifiquen o no, se anotan en el registro interno de brechas con los hechos, los efectos y las medidas adoptadas (art. 33.5 RGPD).']] }
        ],
        context: {
          systems: ['iManage', 'Outlook', 'Gestor de expedientes'],
          text: 'Simulacro RGPD-2609-03: un correo con el informe de due diligence de Promociones Guadalhorce, S.A. se envió a un destinatario equivocado. El reloj de 72 h para la AEPD corre desde la hora de conocimiento.',
          lot: 'RGPD-2609-03',
          go: 'retirada', goLabel: 'Abrir simulacro RGPD-2609-03'
        },
        followups: ['brecha-interesados', 'envio-correo']
      },
      {
        id: 'brecha-interesados', icon: 'users', topic: 'Protección de datos · comunicación a interesados', scope: 'all',
        q: '¿Cuándo hay que avisar a los interesados de una brecha?',
        anchors: ['interesados', 'afectados', 'avisar', 'comunicar', 'alto riesgo', 'cifrado', 'cifrados'],
        terms: ['brecha', 'cuándo', 'cliente', 'clientes', 'datos', 'riesgo', 'encargado'],
        min: 3,
        blocks: [
          { t: 'Si la brecha supone un alto riesgo, sin dilación indebida, en lenguaje claro y con las medidas recomendadas.', c: [['PRO-RGPD-005', 5, 'Si la brecha supone un alto riesgo, se comunica a los interesados sin dilación indebida, en lenguaje claro y con las medidas recomendadas (art. 34 RGPD).']] },
          { t: 'No hace falta si los datos estaban cifrados y resultan ininteligibles para quien accede.', c: [['PRO-RGPD-005', 5, 'No es necesaria la comunicación a los interesados si los datos estaban cifrados de forma que resulten ininteligibles para quien acceda a ellos.']] },
          { t: 'Si afecta a un expediente o el despacho actúa como encargado, se informa al cliente sin dilación, con la aprobación del Socio director.', c: [['PRO-RGPD-005', 5, 'Cuando el despacho actúa como encargado o los datos afectan a un expediente, se informa al cliente sin dilación indebida, y la comunicación la aprueba el Socio director.']] }
        ],
        followups: ['brecha']
      },
      {
        id: 'envio-correo', icon: 'lock', topic: 'Protección de datos · envío de documentos', scope: 'all',
        q: '¿Cómo se envían por correo los documentos de un cliente?',
        anchors: ['enviar documentos', 'envían', 'enviar', 'correo', 'adjuntos', 'enlace seguro', 'cifrado'],
        terms: ['documentos', 'cliente', 'cómo', 'destinatario', 'outlook', 'externo', 'imanage'],
        min: 3,
        blocks: [
          { t: 'Solo cifrados o mediante enlace seguro de iManage, comprobando el destinatario antes de enviar.', c: [['PRO-RGPD-005', 2, 'Los documentos de clientes se envían por correo solo cifrados o mediante enlace seguro de iManage, y el remitente comprueba el destinatario antes de enviar.']] },
          { t: 'Outlook pide confirmación si el dominio del destinatario no consta en el expediente.', c: [['PRO-RGPD-005', 2, 'El correo externo con adjuntos de expedientes pasa por la regla de prevención de fuga de datos de Outlook, que pide confirmación si el dominio del destinatario no consta en el expediente.']] },
          { t: 'Si un envío sale mal, Sistemas lo retira y revoca enlaces o accesos como contención.', c: [['PRO-RGPD-005', 3, 'coordina con Sistemas la contención: retirada del envío, revocación de enlaces o accesos y bloqueo de cuentas']] }
        ],
        context: {
          systems: ['Outlook', 'iManage'],
          text: 'En el simulacro RGPD-2609-03, lo primero que se comprueba es si el informe de Promociones Guadalhorce iba cifrado: de eso depende avisar o no a los interesados.',
          lot: 'RGPD-2609-03',
          go: 'retirada', goLabel: 'Abrir simulacro RGPD-2609-03'
        },
        followups: ['brecha', 'brecha-interesados']
      },
      {
        id: 'modelo-200', icon: 'calendar', topic: 'Calendario tributario · Impuesto sobre Sociedades', scope: 'all',
        q: '¿Cuándo vence el modelo 200 del Impuesto sobre Sociedades?',
        anchors: ['modelo 200', '200', 'impuesto sobre sociedades', 'sociedades', 'is'],
        terms: ['vence', 'plazo', 'cuándo', 'presentar', 'ejercicio', 'octubre', 'julio', 'declaración'],
        min: 3,
        blocks: [
          { t: 'En los 25 días naturales siguientes a los seis meses posteriores al cierre del ejercicio: del 1 al 25 de julio si coincide con el año natural, y hasta el 25 de octubre si el ejercicio cerró el 31 de marzo.', c: [['CAL-TRI-006', 2, 'Modelo 200 (Impuesto sobre Sociedades): en los 25 días naturales siguientes a los seis meses posteriores a la conclusión del período impositivo; para los ejercicios que coinciden con el año natural, del 1 al 25 de julio, y para los cerrados el 31 de marzo, hasta el 25 de octubre.']] },
          { t: 'El despacho lo presenta como muy tarde 3 días hábiles antes del vencimiento, con el borrador aprobado por el cliente en Signaturit.', c: [['CAL-TRI-006', 4, 'como muy tarde 3 días hábiles antes del vencimiento'], ['CAL-TRI-006', 3, 'El cliente aprueba el borrador por Signaturit; sin aprobación firmada no se presenta ninguna declaración.']] },
          { t: 'Si sale a ingresar y se domicilia, la orden se da como muy tarde cinco días naturales antes del fin del plazo.', c: [['CAL-TRI-006', 4, 'Cuando la declaración sale a ingresar y se domicilia, la orden de domiciliación se da como muy tarde cinco días naturales antes del fin del plazo.']] }
        ],
        context: {
          systems: ['Sede AEAT', 'Gestor de expedientes', 'Signaturit'],
          text: 'Clientes con ejercicio cerrado el 31 de marzo: el modelo 200 vence el 25 de octubre, y en octubre toca además el pago fraccionado del modelo 202 (del 1 al 20). Ambos aparecen en el resumen del día.',
          go: 'turno', goLabel: 'Abrir el resumen del día'
        },
        followups: ['modelos-iva', 'modelo-720']
      },
      {
        id: 'modelos-iva', icon: 'list-checks', topic: 'Calendario tributario · 202, 303 y 390', scope: 'all',
        q: '¿Cuándo se presentan los modelos 202, 303 y 390?',
        anchors: ['modelo 202', 'modelo 303', 'modelo 390', '202', '303', '390', 'iva', 'pago fraccionado', 'pagos fraccionados'],
        terms: ['cuándo', 'presentan', 'plazo', 'trimestre', 'trimestral', 'anual', 'resumen', 'abril', 'octubre', 'enero'],
        min: 2,
        blocks: [
          { list: [
            { t: 'Modelo 202: del 1 al 20 de abril, de octubre y de diciembre.', c: [['CAL-TRI-006', 2, 'Modelo 202 (pagos fraccionados del Impuesto sobre Sociedades): del 1 al 20 de abril, de octubre y de diciembre.']] },
            { t: 'Modelo 303: del 1 al 20 de abril, julio y octubre, y del 1 al 30 de enero el cuarto trimestre.', c: [['CAL-TRI-006', 2, 'Modelo 303 (IVA, autoliquidación trimestral): del 1 al 20 de abril, julio y octubre, y del 1 al 30 de enero el cuarto trimestre.']] },
            { t: 'Modelo 390: del 1 al 30 de enero.', c: [['CAL-TRI-006', 2, 'Modelo 390 (IVA, resumen anual): del 1 al 30 de enero.']] }
          ] },
          { t: 'La documentación se pide al cliente 20 días naturales antes y un segundo profesional revisa el borrador.', c: [['CAL-TRI-006', 3, 'El área de Fiscal y Tributario pide al cliente la documentación 20 días naturales antes del vencimiento.'], ['CAL-TRI-006', 3, 'El borrador de la declaración lo revisa un segundo profesional del área distinto de quien lo preparó.']] }
        ],
        followups: ['modelo-200']
      },
      {
        id: 'modelo-720', icon: 'globe', topic: 'Calendario tributario · bienes en el extranjero', scope: 'all',
        q: '¿Quién tiene que presentar el modelo 720?',
        anchors: ['modelo 720', '720', 'bienes en el extranjero', 'extranjero'],
        terms: ['quién', 'presentar', 'plazo', 'bloque', 'valor', 'cuentas', 'aumenta', 'obligado'],
        min: 2,
        blocks: [
          { t: 'Quien tenga algún bloque de bienes o derechos en el extranjero por valor superior a 50.000 €; se presenta del 1 de enero al 31 de marzo.', c: [['CAL-TRI-006', 2, 'Modelo 720 (bienes y derechos en el extranjero): del 1 de enero al 31 de marzo, cuando el valor de algún bloque de bienes supera 50.000 €']] },
          { t: 'En los años siguientes, solo si ese valor aumenta en más de 20.000 €.', c: [['CAL-TRI-006', 2, 'en años siguientes, solo si ese valor aumenta en más de 20.000 €']] }
        ],
        followups: ['modelo-200']
      },
      {
        id: 'ia-generativa', icon: 'cpu', topic: 'IA generativa · datos de clientes', scope: 'all', kind: 'partial',
        q: '¿Se pueden usar herramientas de IA generativa con documentos de clientes?',
        anchors: ['ia generativa', 'inteligencia artificial', 'chatgpt', 'copilot', 'ia', 'pol-ia-007'],
        terms: ['usar', 'herramientas', 'documentos', 'clientes', 'datos', 'pueden', 'autorizadas'],
        min: 2,
        blocks: [
          { t: 'Solo en herramientas autorizadas por el despacho y en las condiciones de POL-IA-007.', c: [['PRO-RGPD-005', 6, 'Los datos de clientes solo pueden introducirse en herramientas de IA generativa autorizadas por el despacho y en las condiciones de POL-IA-007 (Política de uso de IA generativa con datos de clientes).']] },
          { t: 'Como cualquier proveedor que trate datos, debe alojarlos en la Unión Europea y firmar contrato de encargado del tratamiento.', c: [['PRO-RGPD-005', 2, 'Los datos de clientes se alojan en centros de datos de la Unión Europea; cualquier proveedor que trate datos firma contrato de encargado del tratamiento (art. 28 RGPD).']] }
        ],
        note: 'POL-IA-007 (Política de uso de IA generativa con datos de clientes) no está entre los documentos indexados: qué herramientas están autorizadas y en qué condiciones no se puede detallar desde esta consulta.',
        context: {
          systems: ['iManage'],
          text: 'El cuestionario de homologación de Banca Mediterránea pregunta por el uso de IA generativa con datos de clientes: la respuesta completa necesita POL-IA-007.',
          go: 'cuestionario', goLabel: 'Abrir cuestionario de Banca Mediterránea'
        },
        followups: ['envio-correo', 'brecha']
      }
    ],

    gaps: [
      { id: 'jurisprudencia', topic: 'Jurisprudencia y doctrina', anchors: ['jurisprudencia', 'sentencia', 'sentencias', 'supremo', 'doctrina', 'aranzadi'],
        reason: 'La jurisprudencia y la doctrina se consultan en Aranzadi; no forman parte del manual interno indexado.' },
      { id: 'tarifas', topic: 'Tarifas horarias', anchors: ['tarifa horaria', 'tarifas horarias', 'cuánto cobramos', 'precio hora', 'euros la hora'],
        reason: 'Las tarifas horarias vigentes por categoría no están entre los documentos indexados; la política de honorarios solo dice que se publican en la hoja de encargo.' },
      { id: 'laboral', topic: 'Condiciones laborales', anchors: ['teletrabajo', 'nómina', 'salario', 'convenio', 'horario', 'días libres', 'permisos'],
        reason: 'Las condiciones laborales del personal del despacho no forman parte del manual interno indexado.' },
      { id: 'ia-detalle', topic: 'Política de IA generativa', anchors: ['herramientas autorizadas', 'qué herramientas', 'pol-ia-007', 'chatgpt'],
        reason: 'Ningún documento indexado detalla qué herramientas de IA generativa están autorizadas ni en qué condiciones.', related: 'POL-IA-007' },
      { id: 'penal', topic: 'Procedimiento penal', anchors: ['querella', 'atestado', 'instrucción penal', 'juicio rápido', 'detenido', 'guardia'],
        reason: 'Ningún documento indexado describe la actuación en guardias ni en procedimientos penales, más allá del cómputo de agosto.' },
      { id: 'seguro', topic: 'Seguro de responsabilidad civil', anchors: ['seguro', 'responsabilidad civil', 'póliza', 'aseguradora', 'siniestro'],
        reason: 'La póliza de responsabilidad civil profesional y la comunicación de siniestros no están entre los documentos indexados.' }
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
})('abogados');
