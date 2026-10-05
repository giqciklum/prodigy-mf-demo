/* Mercados Moncayo · procedure Q&A with citations (English). Fictitious documents, consistent with HISTORIAS.md. */
agenticPackEn('retail', {
  procedimientos: {
    section: 'Calidad',
    nav: 'Procedures',
    title: 'Ask the procedures',
    agent: 'Procedures',
    system: 'ServiceNow',
    source: 'ServiceNow · Quality document management',
    indexed_at: '2026-09-29T06:00',
    doc_org: 'Mercados Moncayo · Quality',
    ui: {
      page_title: 'Quality procedure search',
      intro_title: 'Ask about the Quality procedures for stores and the distribution centre',
      intro_text: 'Cold chain, alerts and recalls, complaints and own brand. Every sentence of the answer cites the document and the section it comes from. If no indexed document covers it, the search says so and does not answer.',
      placeholder: 'Type a question about the Quality procedures',
      context_title: 'Applied to stores and the distribution centre today',
      permission: 'Quality · stores and distribution centre',
      asker_initials: 'QT',
      asker_role: 'On-call Quality Technician',
      route_to: 'Head of Quality'
    },
    report: { title: 'Quality procedure search', code_prefix: 'CON-PROC', filename: 'procedure-search', scope_label: 'Scope', scope: 'Plaza distribution centre and 64 stores' },
    presenter: {
      say: [
        'Search of the Quality procedures: the answer comes only from the controlled documents, and every sentence carries its citation to the document and section.',
        'Six documents are indexed: in-store cold chain, alerts and recalls, consumer complaints, approval of own-brand suppliers, cleaning of multideck chillers and the specification sheet for Tomate frito Moncayo. Here they are synthetic; in the pilot, your own current versions.'
      ],
      say_empty: 'It helps a store manager act correctly at six in the morning, prepare the IFS audit and answer a consumer with the exact reference.',
      say_answered: 'Clicking a citation opens the document with the exact passage highlighted. And the answer is cross-checked with what is happening today: multideck MR-3 at Huesca Centro, the tomato sauce complaint or the mock recall of lot L26214.',
      say_none: 'When there is no source it says so and invents nothing: no answer and no citation. If the topic is in a document that is not indexed, it names it (PR-CAL-011) and lets you route the question to Quality.',
      next_empty: 'Click “What must be done if a chilled multideck goes above 5 °C?” and then citation 1 to see the highlighted passage.',
      next_answered: 'Type a question with no source, for example “How often are the rodent bait stations checked?”, and click “Ask”.',
      next_done: 'Move on to the next scene with the right arrow.'
    },

    docs: [
      {
        code: 'APPCC-TIE-01',
        title: 'In-store cold chain',
        short: 'In-store cold chain',
        type: 'HACCP plan',
        version: '5',
        date: '2026-05-04',
        owner: 'Quality',
        summary: 'Chilled products at 5 °C maximum. Above 5 °C for more than 2 h: sale blocked at the POS and removal from the shelf; above 8 °C, critical break and destruction. Approved by the Head of Quality.',
        sections: [
          { id: '1', heading: '1. Purpose and scope', text: [
            'Maintain the temperature of chilled and frozen products from receipt at the store until sale, and act when a refrigeration unit fails.',
            'Applies to the 64 Mercados Moncayo stores: multideck chillers, display cabinets, freezer islands and cold rooms.'
          ] },
          { id: '2', heading: '2. Maximum temperatures', list: [
            'Dairy products, desserts, packaged meat and fish and chilled ready meals: 5 °C maximum in the product.',
            'Fresh-cut fruit and vegetables: 4 °C maximum.',
            'Frozen products: −18 °C, with a tolerance of 3 °C during restocking and defrosting.',
            'Store cold rooms: chilled between 0 and 4 °C; frozen at −20 °C or below.'
          ] },
          { id: '3', heading: '3. Monitoring', list: [
            'Each multideck and each cold room has probes connected to Sensores de frío, with a reading every 5 min and an alarm to the store and to the Refrigeration Control Centre.',
            'The store manager checks and signs the temperature log at opening and closing.',
            'Alarms outside opening hours are handled by the Refrigeration Control Centre, which alerts the on-call manager and Refrigeration Maintenance.'
          ] },
          { id: '4', heading: '4. Action criteria', text: [
            'Product above 5 °C for 2 h or less: it is moved to the store cold room and may return to sale once the multideck has recovered, recording this in the temperature log.',
            'Product above 5 °C for more than 2 h: sale of the exposed items is blocked at the POS and they are removed from the shelf; the Head of Quality decides what happens to them.',
            'Above 8 °C at any time, the cold chain break is critical: the exposed product is not sold and is destroyed, except whole fruit and vegetables.',
            'Frozen products above −15 °C: they are treated as thawed and are neither refrozen nor sold.'
          ] },
          { id: '5', heading: '5. Responsibilities', list: [
            'Store manager: moves the product, removes what was exposed and records the incident.',
            'Refrigeration Maintenance: attends the breakdown with urgent priority (4 h) if product is exposed and records the intervention in ServiceNow.',
            'Head of Quality: approves the sales block and decides what happens to the product.',
            'Area Store Manager: restocks the range if the removal leaves the shelf empty.'
          ] },
          { id: '6', heading: '6. Records', list: [
            'The Sensores de frío alarm is linked to the ServiceNow work order.',
            'Sales blocks: SAP S/4 Retail and the store POS, with the alarm reference.',
            'Cold chain losses: recorded in SAP with the reason “cold chain”.'
          ] },
          { id: '7', heading: '7. References', refs: true, list: [
            'Regulation (EC) No 852/2004 on the hygiene of foodstuffs.',
            'Real Decreto 1021/2022 (Spanish hygiene requirements for retail trade).'
          ] }
        ]
      },
      {
        code: 'PR-CAL-010',
        title: 'Management of food alerts and product recalls',
        short: 'Alerts and recalls',
        type: 'Procedure',
        version: '6',
        date: '2026-01-26',
        owner: 'Quality',
        summary: 'Crisis committee within 1 h; sale blocked at every POS within 1 h and physical withdrawal within 4 h of the decision; immediate notification to the health authority and notice to loyalty customers.',
        sections: [
          { id: '1', heading: '1. Purpose and scope', text: [
            'Withdraw from sale, and if necessary recall from consumers, a product that is not safe, as quickly as possible and with full traceability.',
            'Applies to all products in the distribution centre and the stores, and in particular to the “Moncayo” own brand.'
          ] },
          { id: '2', heading: '2. Origin of an alert', list: [
            'Alert from the health authority (AESAN’s SCIRI network or the regional authority).',
            'Notice from the supplier or manufacturer.',
            'Consumer complaints or in-house test results indicating a risk.'
          ] },
          { id: '3', heading: '3. Decision', text: [
            'The recall decision is taken by the Crisis Committee (Head of Quality, Director of Operations and Distribution Centre Manager), convened within 1 h of the risk becoming known.',
            'If the product is already in consumers’ hands, the withdrawal is accompanied by a recall: notice to consumers and a refund at any store, without a receipt.'
          ] },
          { id: '4', heading: '4. Deadlines', list: [
            'Sales block at every store POS: 1 h from the decision.',
            'Physical removal from the shelf and from the distribution centre: 4 h from the decision, with confirmation from each store.',
            'Notification to the regional health authority and to AESAN: immediate, as soon as it is known that the product may not be safe.'
          ] },
          { id: '5', heading: '5. Traceability', list: [
            'Receipts of the lot at the distribution centre: WMS Manhattan.',
            'Shipments to stores and stock per store: SAP S/4 Retail.',
            'Units sold per store: store POS.',
            'Customers who bought the lot with their loyalty card: CRM Fidelización.'
          ] },
          { id: '6', heading: '6. Communication to consumers', list: [
            'Notice in every store that received the lot, for at least 15 days.',
            'App and email notice to the loyalty customers who bought the lot.',
            'Public notice on the website if the authority requires it or if the risk is serious; its text is prepared under PR-CAL-011 (Crisis communication).'
          ] },
          { id: '7', heading: '7. Closure', text: [
            'The Head of Quality closes the recall with the unit reconciliation: received, sold, withdrawn, returned and destroyed; any difference must be justified.',
            'A mock recall is carried out once a year with an own-brand product.'
          ] },
          { id: '8', heading: '8. References', refs: true, list: [
            'Regulation (EC) No 178/2002, Article 19.',
            'Real Decreto 1021/2022.'
          ] }
        ]
      },
      {
        code: 'PR-ATC-002',
        title: 'Consumer complaints',
        short: 'Consumer complaints',
        type: 'Procedure',
        version: '4',
        date: '2026-03-02',
        owner: 'Consumer Care',
        summary: 'Acknowledgement within 24 h and response to the consumer within 48 h. Foreign body in an own-brand product: object collected within 48 h, preventive block of the lot assessed the same day and investigation by the manufacturer.',
        sections: [
          { id: '1', heading: '1. Purpose and scope', text: [
            'Handle consumer complaints received in store, through the loyalty app, by phone, by email or on the official complaint form.'
          ] },
          { id: '2', heading: '2. Deadlines', list: [
            'Acknowledgement to the consumer: 24 h.',
            'Response to the consumer: 48 h, even if the investigation is still open; the final response is sent when it is closed.',
            'Official complaint form: written response within the legal deadline of the regional authority, which Consumer Care tracks in ServiceNow.'
          ] },
          { id: '3', heading: '3. Classification', text: [
            'Food safety: foreign bodies (glass, metal or hard plastic), undeclared allergens, symptoms of illness or spoiled product. Escalated to the Head of Quality within 2 h.',
            'Commercial quality: taste, appearance, weight or packaging, with no health risk.'
          ] },
          { id: '4', heading: '4. Foreign bodies', text: [
            'The consumer is asked to keep the object and the packaging, and they are collected from their home or from the store within 48 h.',
            'With glass or another hard foreign body in an own-brand product, the Head of Quality assesses the same day a preventive block on sales of the lot and asks the manufacturer for its investigation under PR-PRO-006.',
            'The investigation reviews at least:'
          ], list: [
            'Lot traceability: receipt at the distribution centre, stores that received it and units sold.',
            'Complaints about the same lot or the same product in the last 12 months.',
            'Manufacturer’s report: glass control, breakages recorded on the line and X-ray detection on the production date.',
            'Analysis of the object at an external laboratory when the manufacturer and Quality disagree on its origin.'
          ] },
          { id: '5', heading: '5. Response to the consumer', text: [
            'The response is personal and in plain language, and does not attribute the cause until there is evidence.',
            'A refund or replacement of the product may be offered; compensation of more than 50 € is approved by the Head of Quality.'
          ] },
          { id: '6', heading: '6. Records', list: [
            'Case in ServiceNow, linked to the customer in CRM Fidelización.',
            'Monthly indicator of complaints per million units sold, by own-brand supplier.'
          ] }
        ]
      },
      {
        code: 'PR-PRO-006',
        title: 'Approval and monitoring of own-brand suppliers',
        short: 'Own-brand suppliers',
        type: 'Procedure',
        version: '3',
        date: '2025-11-20',
        owner: 'Supplier Quality',
        summary: 'Valid IFS Food or BRCGS certificate, initial audit of at least 85 points, signed specification and foreign body control; the manufacturer sends its preliminary investigation within 48 h and the 8D within 10 working days.',
        sections: [
          { id: '1', heading: '1. Purpose and scope', text: [
            'Ensure that the manufacturers of the “Moncayo” own brand make products that are safe and comply with the agreed specification.'
          ] },
          { id: '2', heading: '2. Approval requirements', list: [
            'Valid IFS Food or BRCGS Food Safety certification, at higher level or grade A or AA.',
            'Initial Supplier Quality audit at the factory, with a score of at least 85 points out of 100.',
            'Signed product specification (FT-MP sheet) with physical, chemical and microbiological limits.',
            'HACCP plan and foreign body control plan for the line.'
          ] },
          { id: '3', heading: '3. Glass packaging', list: [
            'Glass policy with a breakage log and a line cleaning procedure after a breakage.',
            'Inspection of empty containers and final X-ray inspection, or equivalent inspection, for all products packed in glass.',
            'Verification of the X-ray equipment with glass test pieces at the start of the shift and every 4 h.'
          ] },
          { id: '4', heading: '4. Monitoring', list: [
            'Annual Supplier Quality audit; every three years, unannounced.',
            'Product analysis at an external laboratory according to the annual plan.',
            'Indicator of complaints per million units sold; above 5, an action plan from the supplier.'
          ] },
          { id: '5', heading: '5. Incidents', text: [
            'The manufacturer informs Mercados Moncayo within 24 h of any incident that may affect the safety of product already delivered.',
            'For a safety complaint, the manufacturer sends its preliminary investigation within 48 h and its complete 8D report within 10 working days.'
          ] },
          { id: '6', heading: '6. Suspension', text: [
            'A supplier whose certification has been withdrawn, with a critical nonconformity in an audit or with a recall attributable to its manufacturing has its approval suspended: no new orders are placed until its action plan is closed.'
          ] }
        ]
      },
      {
        code: 'IT-TIE-014',
        title: 'Cleaning and disinfection of multideck chillers',
        short: 'Multideck cleaning',
        type: 'Work instruction',
        version: '2',
        date: '2026-02-09',
        owner: 'Store Operations',
        summary: 'Daily cleaning of shelves and fronts, weekly deep clean and monthly evaporator clean; product may not be out of refrigeration for more than 30 min and is only restocked once the air is below 4 °C.',
        sections: [
          { id: '1', heading: '1. Purpose and scope', text: [
            'Clean and disinfect chilled multidecks without breaking the product’s cold chain. Applies to multidecks, display cabinets and islands in all stores.'
          ] },
          { id: '2', heading: '2. Frequencies', list: [
            'Shelves, fronts and night blinds: daily cleaning, at closing.',
            'Deep clean of the multideck (shelves, back panels, return grilles and drain): weekly.',
            'Evaporator coil and fan check: monthly, by Refrigeration Maintenance.'
          ] },
          { id: '3', heading: '3. Preparation', text: [
            'Before the deep clean, the product is moved to the store cold room in closed trolleys; it may not be out of refrigeration for more than 30 min.',
            'The multideck is switched off and left open for 15 min to defrost; ice is never scraped off with metal objects.'
          ] },
          { id: '4', heading: '4. Cleaning and disinfection', list: [
            'Remove residues with lukewarm water, at 40 °C maximum, and neutral detergent.',
            'Rinse and apply the approved disinfectant (quaternary ammonium) with the contact time in its data sheet, of at least 5 min.',
            'Rinse with drinking water if the data sheet requires it and dry with single-use paper.',
            'Clean the drain and pour in 1 l of water with disinfectant to prevent odours.'
          ] },
          { id: '5', heading: '5. Start-up', text: [
            'The multideck is switched on and the product is only restocked once the air temperature falls below 4 °C; this is recorded in the temperature log.'
          ] },
          { id: '6', heading: '6. Verification', text: [
            'The manager visually checks the cleaning and signs the cleaning log.',
            'Quality verifies cleaning every quarter with ATP swabs, with a limit of 150 RLU.'
          ] }
        ]
      },
      {
        code: 'FT-MP-0412',
        title: 'Product specification sheet · Tomate frito Moncayo 400 g',
        short: 'Specification · Tomate frito 400 g',
        type: 'Specification sheet',
        version: '3',
        date: '2026-04-14',
        owner: 'Supplier Quality',
        summary: 'Fried tomato sauce in a 400 g glass jar, made by Conservas del Jalón: zero tolerance for glass, metal and hard plastic; best before 24 months; lot L<yy><Julian day>.',
        sections: [
          { id: '1', heading: '1. Product', text: [
            'Fried tomato sauce packed in a 400 g glass jar with a twist-off lid and sterilised. “Moncayo” own brand. Manufacturer: Conservas del Jalón, S.L.'
          ] },
          { id: '2', heading: '2. Ingredients and allergens', text: [
            'Ingredients: tomato (86 %), sunflower oil, sugar, salt, modified maize starch and onion.',
            'Allergens: contains none of the 14 allergens requiring mandatory declaration under Regulation (EU) No 1169/2011.'
          ] },
          { id: '3', heading: '3. Specification', list: [
            'Foreign bodies (glass, metal and hard plastic): absent, zero tolerance.',
            'Soluble solids: 14 to 18 °Brix.',
            'pH: 4.4 maximum.',
            'Net weight: 400 g, with the metrological control of Real Decreto 1801/2008.'
          ] },
          { id: '4', heading: '4. Storage and shelf life', text: [
            'Best before: 24 months from manufacture.',
            'Once opened, keep refrigerated and consume within 5 days.'
          ] },
          { id: '5', heading: '5. Lot code', text: [
            'Format L<yy><Julian day>. Example: L26214 is the lot made on day 214 of 2026, that is, 02/08/2026.'
          ] },
          { id: '6', heading: '6. Packaging and palletisation', list: [
            'Trays of 12 jars; 160 trays per pallet (1,920 jars).',
            'GS1-128 pallet label with SSCC, GTIN, lot and best-before date.'
          ] }
        ]
      }
    ],

    unindexed: {
      'PR-CAL-011': { title: 'Crisis communication', mentionedIn: { doc: 'PR-CAL-010', sec: '6', quote: 'under PR-CAL-011 (Crisis communication)' } }
    },

    suggested: ['frio', 'vidrio', 'retirada', 'plazos-atc', 'limpieza', 'homologacion'],

    intents: [
      {
        id: 'frio', icon: 'thermometer', topic: 'Cold chain · action on a breakdown', scope: 'all',
        q: 'What must be done if a chilled multideck goes above 5 °C?',
        anchors: ['multideck', 'multidecks', 'chiller', 'chillers', 'chilled', 'fridge', 'cold chain', 'temperature', 'display cabinet'],
        terms: ['above', 'exceeds', 'rises', 'breakdown', 'fails', 'alarm', 'done', 'do', 'product', 'block', 'remove', 'degrees', 'hours', 'yoghurts', 'dairy'],
        min: 3,
        blocks: [
          { t: 'If the product has been above 5 °C for 2 h or less, it is taken to the store cold room and may return to sale once the multideck has recovered.', c: [['APPCC-TIE-01', 4, 'Product above 5 °C for 2 h or less: it is moved to the store cold room and may return to sale once the multideck has recovered']] },
          { t: 'If more than 2 h have passed, its sale is blocked at the POS and it is removed from the shelf; the Head of Quality decides what happens to it.', c: [['APPCC-TIE-01', 4, 'Product above 5 °C for more than 2 h: sale of the exposed items is blocked at the POS and they are removed from the shelf; the Head of Quality decides what happens to them.']] },
          { t: 'Above 8 °C at any time the break is critical: the product is not sold and is destroyed.', c: [['APPCC-TIE-01', 4, 'Above 8 °C at any time, the cold chain break is critical: the exposed product is not sold and is destroyed']] },
          { t: 'Refrigeration Maintenance attends the breakdown within 4 h if product is exposed.', c: [['APPCC-TIE-01', 5, 'Refrigeration Maintenance: attends the breakdown with urgent priority (4 h) if product is exposed and records the intervention in ServiceNow.']] }
        ],
        context: {
          systems: ['Sensores de frío', 'TPV tiendas', 'ServiceNow'],
          text: 'T-027 Huesca Centro: dairy multideck MR-3 has been at 9.4 °C since 03:55 due to an evaporator fan failure, with a peak of 9.8 °C. More than 2 h above 5 °C and above 8 °C: critical break for the 318 chilled units on display.',
          outcome: 'alarma',
          go: 'alarma', goLabel: 'Open T-027 alarm'
        },
        followups: ['frio-responsables', 'temperaturas']
      },
      {
        id: 'temperaturas', icon: 'snowflake', topic: 'Cold chain · maximum temperatures', scope: 'all',
        q: 'What temperature must chilled and frozen products be kept at?',
        anchors: ['maximum temperature', 'maximum temperatures', 'frozen', 'fresh-cut', 'fresh cut', 'cold rooms', 'what temperature'],
        terms: ['temperature', 'chilled', 'must', 'kept', 'degrees', 'maximum', 'tolerance'],
        min: 3,
        blocks: [
          { list: [
            { t: 'Dairy products, desserts, packaged meat and fish and ready meals: 5 °C maximum in the product.', c: [['APPCC-TIE-01', 2, 'Dairy products, desserts, packaged meat and fish and chilled ready meals: 5 °C maximum in the product.']] },
            { t: 'Fresh-cut produce: 4 °C.', c: [['APPCC-TIE-01', 2, 'Fresh-cut fruit and vegetables: 4 °C maximum.']] },
            { t: 'Frozen products: −18 °C, with 3 °C tolerance during restocking and defrosting.', c: [['APPCC-TIE-01', 2, 'Frozen products: −18 °C, with a tolerance of 3 °C during restocking and defrosting.']] },
            { t: 'Cold rooms: 0 to 4 °C for chilled and −20 °C or below for frozen.', c: [['APPCC-TIE-01', 2, 'Store cold rooms: chilled between 0 and 4 °C; frozen at −20 °C or below.']] }
          ] },
          { t: 'A frozen product that goes above −15 °C is treated as thawed and is not sold.', c: [['APPCC-TIE-01', 4, 'Frozen products above −15 °C: they are treated as thawed and are neither refrozen nor sold.']] }
        ],
        followups: ['frio']
      },
      {
        id: 'frio-responsables', icon: 'users', topic: 'Cold chain · responsibilities', scope: 'all',
        q: 'Who does what when a store’s refrigeration fails?',
        anchors: ['responsible', 'responsibilities', 'who does', 'control centre', 'store manager'],
        terms: ['refrigeration', 'fails', 'failure', 'breakdown', 'multideck', 'store', 'who', 'decides', 'approves', 'night'],
        min: 4,
        blocks: [
          { list: [
            { t: 'Store manager: moves the product, removes what was exposed and records the incident.', c: [['APPCC-TIE-01', 5, 'Store manager: moves the product, removes what was exposed and records the incident.']] },
            { t: 'Refrigeration Maintenance: urgent breakdown within 4 h if product is exposed, recorded in ServiceNow.', c: [['APPCC-TIE-01', 5, 'Refrigeration Maintenance: attends the breakdown with urgent priority (4 h) if product is exposed and records the intervention in ServiceNow.']] },
            { t: 'Head of Quality: approves the sales block and decides what happens to the product.', c: [['APPCC-TIE-01', 5, 'Head of Quality: approves the sales block and decides what happens to the product.']] },
            { t: 'Area Store Manager: restocks the range if the shelf is left empty.', c: [['APPCC-TIE-01', 5, 'Area Store Manager: restocks the range if the removal leaves the shelf empty.']] }
          ] },
          { t: 'When the store is closed, the Refrigeration Control Centre handles the alarm and alerts the on-call manager and Maintenance.', c: [['APPCC-TIE-01', 3, 'Alarms outside opening hours are handled by the Refrigeration Control Centre, which alerts the on-call manager and Refrigeration Maintenance.']] }
        ],
        context: {
          systems: ['Sensores de frío', 'ServiceNow', 'Microsoft Teams'],
          text: 'The MR-3 alarm at T-027 went off at 03:55, with the store closed: the Refrigeration Control Centre handles it. The evaporator fan is the probable cause, to be confirmed by Refrigeration Maintenance.',
          go: 'alarma', goLabel: 'Open T-027 alarm'
        },
        followups: ['frio', 'evaporador']
      },
      {
        id: 'vidrio', icon: 'alert-triangle', topic: 'Complaints · foreign bodies', scope: 'all',
        q: 'What do we do if a consumer finds glass in an own-brand product?',
        anchors: ['glass', 'foreign body', 'foreign bodies', 'foreign object', 'metal', 'hard plastic', 'object'],
        terms: ['consumer', 'customer', 'finds', 'found', 'own brand', 'own-brand', 'product', 'jar', 'do', 'complaint', 'investigate', 'lot'],
        min: 3,
        blocks: [
          { t: 'It is a food safety complaint: it is escalated to the Head of Quality within 2 h.', c: [['PR-ATC-002', 3, 'Food safety: foreign bodies (glass, metal or hard plastic), undeclared allergens, symptoms of illness or spoiled product. Escalated to the Head of Quality within 2 h.']] },
          { t: 'The consumer is asked to keep the object and the packaging, and they are collected within 48 h.', c: [['PR-ATC-002', 4, 'The consumer is asked to keep the object and the packaging, and they are collected from their home or from the store within 48 h.']] },
          { t: 'The Head of Quality assesses the same day a preventive block on sales of the lot and asks the manufacturer for its investigation.', c: [['PR-ATC-002', 4, 'the Head of Quality assesses the same day a preventive block on sales of the lot and asks the manufacturer for its investigation under PR-PRO-006']] },
          { intro: { t: 'The investigation reviews at least:', c: [['PR-ATC-002', 4, 'The investigation reviews at least:']] }, list: [
            { t: 'Lot traceability and complaints about the same product in 12 months.', c: [['PR-ATC-002', 4, 'Lot traceability: receipt at the distribution centre, stores that received it and units sold.'], ['PR-ATC-002', 4, 'Complaints about the same lot or the same product in the last 12 months.']] },
            { t: 'The manufacturer’s report on glass control, line breakages and X-ray on the production date.', c: [['PR-ATC-002', 4, 'Manufacturer’s report: glass control, breakages recorded on the line and X-ray detection on the production date.']] }
          ] },
          { t: 'The tomato sauce specification sheet allows no glass: zero tolerance.', c: [['FT-MP-0412', 3, 'Foreign bodies (glass, metal and hard plastic): absent, zero tolerance.']] }
        ],
        context: {
          systems: ['CRM Fidelización', 'ServiceNow', 'SAP S/4 Retail'],
          text: 'Javier Lasheras has written through the app: a glass fragment in a jar of Tomate frito Moncayo 400 g, lot L26214, bought at T-011 Zaragoza Delicias. Manufacturer: Conservas del Jalón, S.L. Response to the consumer within 48 h.',
          outcome: 'reclamacion',
          lot: 'L26214',
          go: 'reclamacion', goLabel: 'Open L26214 complaint'
        },
        followups: ['plazos-atc', 'proveedor-incidente']
      },
      {
        id: 'plazos-atc', icon: 'mail', topic: 'Complaints · deadlines', scope: 'all',
        q: 'What deadlines do we have to respond to a consumer complaint?',
        anchors: ['complaint', 'complaints', 'claim', 'complaint form'],
        terms: ['deadline', 'deadlines', 'respond', 'reply', 'answer', 'acknowledgement', 'hours', 'when', 'consumer', 'time'],
        min: 3,
        blocks: [
          { list: [
            { t: 'Acknowledgement within 24 h.', c: [['PR-ATC-002', 2, 'Acknowledgement to the consumer: 24 h.']] },
            { t: 'Response within 48 h, even if the investigation is still open; the final one is sent when it is closed.', c: [['PR-ATC-002', 2, 'Response to the consumer: 48 h, even if the investigation is still open; the final response is sent when it is closed.']] },
            { t: 'Official complaint form: in writing, within the regional authority’s legal deadline.', c: [['PR-ATC-002', 2, 'Official complaint form: written response within the legal deadline of the regional authority']] }
          ] },
          { t: 'The response does not attribute the cause until there is evidence.', c: [['PR-ATC-002', 5, 'The response is personal and in plain language, and does not attribute the cause until there is evidence.']] }
        ],
        context: {
          systems: ['CRM Fidelización', 'ServiceNow'],
          text: 'Javier Lasheras’s complaint (glass in lot L26214) came in through the loyalty app: response to the consumer within 48 h.',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Open L26214 complaint'
        },
        followups: ['compensacion', 'vidrio']
      },
      {
        id: 'compensacion', icon: 'euro', topic: 'Complaints · compensation', scope: 'all',
        q: 'What compensation can be offered to the consumer?',
        anchors: ['compensation', 'compensate', 'refund', 'replacement', 'money back'],
        terms: ['offer', 'offered', 'consumer', 'approves', 'amount', 'customer'],
        min: 2,
        blocks: [
          { t: 'A refund or replacement of the product; if the compensation exceeds 50 €, it is approved by the Head of Quality.', c: [['PR-ATC-002', 5, 'A refund or replacement of the product may be offered; compensation of more than 50 € is approved by the Head of Quality.']] },
          { t: 'In a recall, the amount is refunded at any store without a receipt.', c: [['PR-CAL-010', 3, 'a refund at any store, without a receipt']] }
        ],
        followups: ['plazos-atc']
      },
      {
        id: 'retirada', icon: 'truck', topic: 'Alerts and recalls · deadlines', scope: 'all',
        q: 'How is a product recall carried out and within what deadlines?',
        anchors: ['recall', 'recalls', 'withdrawal', 'withdraw', 'alert', 'alerts', 'mock recall'],
        terms: ['deadline', 'deadlines', 'how', 'stores', 'pos', 'lot', 'hours', 'decides', 'committee', 'carried'],
        min: 2,
        blocks: [
          { t: 'It is decided by the Crisis Committee, convened within 1 h of the risk becoming known.', c: [['PR-CAL-010', 3, 'The recall decision is taken by the Crisis Committee (Head of Quality, Director of Operations and Distribution Centre Manager), convened within 1 h of the risk becoming known.']] },
          { list: [
            { t: 'Sales block at every POS within 1 h of the decision.', c: [['PR-CAL-010', 4, 'Sales block at every store POS: 1 h from the decision.']] },
            { t: 'Physical removal from the shelf and the distribution centre within 4 h, with confirmation from each store.', c: [['PR-CAL-010', 4, 'Physical removal from the shelf and from the distribution centre: 4 h from the decision, with confirmation from each store.']] },
            { t: 'Immediate notification to the regional authority and to AESAN.', c: [['PR-CAL-010', 4, 'Notification to the regional health authority and to AESAN: immediate']] }
          ] },
          { t: 'If product has already been sold, consumers are notified: a notice for 15 days in the stores and an app notice to the loyalty customers who bought it.', c: [['PR-CAL-010', 6, 'Notice in every store that received the lot, for at least 15 days.'], ['PR-CAL-010', 6, 'App and email notice to the loyalty customers who bought the lot.']] },
          { t: 'It is closed with the unit reconciliation, with any difference justified.', c: [['PR-CAL-010', 7, 'The Head of Quality closes the recall with the unit reconciliation: received, sold, withdrawn, returned and destroyed; any difference must be justified.']] }
        ],
        context: {
          systems: ['WMS Manhattan', 'SAP S/4 Retail', 'TPV tiendas', 'CRM Fidelización'],
          text: 'Mock recall with lot L26214: 4,800 jars received at the distribution centre, 4,320 delivered to 41 stores and 480 in the distribution centre; 1,920 sold and 2,400 on shelf; 612 loyalty customers bought it. Target in section 4: withdrawal within 4 h.',
          lot: 'L26214',
          go: 'retirada', goLabel: 'Open L26214 mock recall'
        },
        followups: ['trazabilidad', 'nota-publica']
      },
      {
        id: 'trazabilidad', icon: 'git-branch', topic: 'Alerts and recalls · traceability', scope: 'all',
        q: 'Which systems does the traceability of a lot come from?',
        anchors: ['traceability', 'trace', 'traced', 'systems'],
        terms: ['lot', 'come', 'systems', 'stores', 'sold', 'customers', 'where'],
        min: 3,
        blocks: [
          { list: [
            { t: 'Receipts at the distribution centre: WMS Manhattan.', c: [['PR-CAL-010', 5, 'Receipts of the lot at the distribution centre: WMS Manhattan.']] },
            { t: 'Shipments and stock per store: SAP S/4 Retail.', c: [['PR-CAL-010', 5, 'Shipments to stores and stock per store: SAP S/4 Retail.']] },
            { t: 'Units sold: store POS.', c: [['PR-CAL-010', 5, 'Units sold per store: store POS.']] },
            { t: 'Customers who bought it with a loyalty card: CRM Fidelización.', c: [['PR-CAL-010', 5, 'Customers who bought the lot with their loyalty card: CRM Fidelización.']] }
          ] }
        ],
        context: {
          systems: ['WMS Manhattan', 'SAP S/4 Retail', 'TPV tiendas', 'CRM Fidelización'],
          text: 'Full trace of the mock recall lot, from the distribution centre to the loyalty customers:',
          lot: 'L26214'
        },
        followups: ['retirada', 'lote']
      },
      {
        id: 'nota-publica', icon: 'globe', topic: 'Alerts and recalls · public communication', scope: 'all', kind: 'partial',
        q: 'When is a recall notice published on the website?',
        anchors: ['public notice', 'website', 'web', 'press', 'media', 'press release', 'crisis communication'],
        terms: ['published', 'publish', 'recall', 'when', 'text', 'risk'],
        min: 2,
        blocks: [
          { t: 'If the authority requires it or if the risk is serious; the text is prepared under PR-CAL-011.', c: [['PR-CAL-010', 6, 'Public notice on the website if the authority requires it or if the risk is serious; its text is prepared under PR-CAL-011 (Crisis communication).']] }
        ],
        note: 'PR-CAL-011 (Crisis communication) is not among the indexed documents: who drafts and approves the notice and what it contains cannot be detailed from this search.',
        followups: ['retirada']
      },
      {
        id: 'homologacion', icon: 'shield-check', topic: 'Own-brand suppliers · approval', scope: 'all',
        q: 'What is required to approve an own-brand supplier?',
        anchors: ['approve a supplier', 'supplier approval', 'approval', 'approved supplier', 'supplier', 'suppliers', 'manufacturer'],
        terms: ['required', 'requirements', 'own brand', 'own-brand', 'certification', 'audit', 'ifs', 'brcgs', 'approve'],
        min: 3,
        blocks: [
          { list: [
            { t: 'Valid IFS Food or BRCGS certification, at higher level or grade A or AA.', c: [['PR-PRO-006', 2, 'Valid IFS Food or BRCGS Food Safety certification, at higher level or grade A or AA.']] },
            { t: 'Initial audit at the factory with at least 85 points out of 100.', c: [['PR-PRO-006', 2, 'Initial Supplier Quality audit at the factory, with a score of at least 85 points out of 100.']] },
            { t: 'Signed specification with physical, chemical and microbiological limits.', c: [['PR-PRO-006', 2, 'Signed product specification (FT-MP sheet) with physical, chemical and microbiological limits.']] },
            { t: 'HACCP plan and foreign body control plan for the line.', c: [['PR-PRO-006', 2, 'HACCP plan and foreign body control plan for the line.']] }
          ] },
          { t: 'If it packs in glass, also: glass policy, breakage log and X-ray verified with test pieces at the start of the shift and every 4 h.', c: [['PR-PRO-006', 3, 'Glass policy with a breakage log and a line cleaning procedure after a breakage.'], ['PR-PRO-006', 3, 'Verification of the X-ray equipment with glass test pieces at the start of the shift and every 4 h.']] }
        ],
        followups: ['proveedor-incidente', 'suspension']
      },
      {
        id: 'proveedor-incidente', icon: 'clock', topic: 'Own-brand suppliers · incidents', scope: 'all',
        q: 'Within what deadline must the manufacturer respond to a safety complaint?',
        anchors: ['manufacturer', 'supplier', 'conservas del jalon', 'preliminary investigation', '8d'],
        terms: ['deadline', 'respond', 'complaint', 'safety', 'report', 'hours', 'days'],
        min: 3,
        blocks: [
          { t: 'Preliminary investigation within 48 h and complete 8D report within 10 working days.', c: [['PR-PRO-006', 5, 'For a safety complaint, the manufacturer sends its preliminary investigation within 48 h and its complete 8D report within 10 working days.']] },
          { t: 'It must also report within 24 h any incident affecting product already delivered.', c: [['PR-PRO-006', 5, 'The manufacturer informs Mercados Moncayo within 24 h of any incident that may affect the safety of product already delivered.']] }
        ],
        context: {
          systems: ['ServiceNow'],
          text: 'For the glass in lot L26214, Conservas del Jalón, S.L. must send its preliminary investigation within 48 h and the 8D within 10 working days.',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Open L26214 complaint'
        },
        followups: ['suspension', 'vidrio']
      },
      {
        id: 'suspension', icon: 'x-circle', topic: 'Own-brand suppliers · suspension', scope: 'all',
        q: 'When is a supplier’s approval suspended?',
        anchors: ['suspended', 'suspension', 'suspend', 'delisted'],
        terms: ['approval', 'supplier', 'when', 'orders', 'certification'],
        min: 2,
        blocks: [
          { t: 'When its certification has been withdrawn, with a critical nonconformity in an audit or with a recall attributable to its manufacturing; no new orders are placed until the action plan is closed.', c: [['PR-PRO-006', 6, 'A supplier whose certification has been withdrawn, with a critical nonconformity in an audit or with a recall attributable to its manufacturing has its approval suspended']] },
          { t: 'With more than 5 complaints per million units sold, it must present an action plan.', c: [['PR-PRO-006', 4, 'Indicator of complaints per million units sold; above 5, an action plan from the supplier.']] }
        ],
        followups: ['homologacion']
      },
      {
        id: 'limpieza', icon: 'droplet', topic: 'Multideck cleaning', scope: 'all',
        q: 'How is a multideck cleaned without breaking the cold chain?',
        anchors: ['cleaned', 'clean', 'cleaning', 'disinfection', 'disinfect', 'defrost', 'water', 'detergent', 'quaternary ammonium'],
        terms: ['multideck', 'multidecks', 'cold chain', 'product', 'how', 'minutes', 'frequency', 'often'],
        min: 2,
        blocks: [
          { t: 'The product is first taken to the cold room in closed trolleys and may not be out of refrigeration for more than 30 min.', c: [['IT-TIE-014', 3, 'the product is moved to the store cold room in closed trolleys; it may not be out of refrigeration for more than 30 min']] },
          { t: 'It is cleaned with water at 40 °C maximum and neutral detergent, and disinfected with quaternary ammonium for at least 5 min.', c: [['IT-TIE-014', 4, 'Remove residues with lukewarm water, at 40 °C maximum, and neutral detergent.'], ['IT-TIE-014', 4, 'Rinse and apply the approved disinfectant (quaternary ammonium) with the contact time in its data sheet, of at least 5 min.']] },
          { t: 'It is only restocked once the air in the multideck falls below 4 °C.', c: [['IT-TIE-014', 5, 'the product is only restocked once the air temperature falls below 4 °C']] },
          { list: [
            { t: 'Shelves, fronts and night blinds: daily.', c: [['IT-TIE-014', 2, 'Shelves, fronts and night blinds: daily cleaning, at closing.']] },
            { t: 'Deep clean: every week.', c: [['IT-TIE-014', 2, 'Deep clean of the multideck (shelves, back panels, return grilles and drain): weekly.']] },
            { t: 'Evaporator and fans: every month, by Refrigeration Maintenance.', c: [['IT-TIE-014', 2, 'Evaporator coil and fan check: monthly, by Refrigeration Maintenance.']] }
          ] }
        ],
        followups: ['evaporador', 'frio']
      },
      {
        id: 'evaporador', icon: 'fan', topic: 'Multidecks · evaporator and fans', scope: 'all',
        q: 'How often are the evaporator fans of the multidecks checked?',
        anchors: ['evaporator', 'fan', 'fans', 'coil'],
        terms: ['how often', 'checked', 'check', 'inspection', 'multideck', 'multidecks', 'maintenance', 'frequency'],
        min: 2,
        blocks: [
          { t: 'Every month: Refrigeration Maintenance cleans the evaporator coil and checks the fans.', c: [['IT-TIE-014', 2, 'Evaporator coil and fan check: monthly, by Refrigeration Maintenance.']] }
        ],
        context: {
          systems: ['ServiceNow', 'Sensores de frío'],
          text: 'The probable cause of the MR-3 alarm at T-027 is the evaporator fan failure: it is worth checking in ServiceNow the date of its last monthly check.',
          go: 'alarma', goLabel: 'Open T-027 alarm'
        },
        followups: ['limpieza']
      },
      {
        id: 'lote', icon: 'barcode', topic: 'Lot code · tomato sauce', scope: 'all',
        q: 'How is the lot code on the tomato sauce read?',
        anchors: ['lot code', 'batch code', 'julian day', 'julian', 'l26214', 'lot format'],
        terms: ['lot', 'code', 'read', 'means', 'mean', 'date', 'tomato'],
        min: 2,
        blocks: [
          { t: 'Format L<yy><Julian day>: L26214 is the lot made on day 214 of 2026, 02/08/2026.', c: [['FT-MP-0412', 5, 'Format L<yy><Julian day>. Example: L26214 is the lot made on day 214 of 2026, that is, 02/08/2026.']] },
          { t: 'Best before 24 months from manufacture.', c: [['FT-MP-0412', 4, 'Best before: 24 months from manufacture.']] }
        ],
        context: {
          systems: ['WMS Manhattan', 'SAP S/4 Retail'],
          text: 'Trace of the example lot, which is the one in today’s complaint and mock recall:',
          lot: 'L26214'
        },
        followups: ['ficha', 'trazabilidad']
      },
      {
        id: 'ficha', icon: 'file-text', topic: 'Specification sheet · tomato sauce', scope: 'all',
        q: 'What does the specification sheet for Tomate frito Moncayo say?',
        anchors: ['specification sheet', 'specification', 'spec', 'tomate frito', 'tomato sauce', 'allergens', 'ingredients', 'brix'],
        terms: ['say', 'says', 'contains', 'contain', 'tolerance', 'ph', 'weight'],
        min: 2,
        blocks: [
          { intro: { t: 'Fried tomato sauce in a 400 g glass jar, sterilised, made by Conservas del Jalón, S.L.', c: [['FT-MP-0412', 1, 'Fried tomato sauce packed in a 400 g glass jar with a twist-off lid and sterilised.']] }, list: [
            { t: 'Glass, metal and hard plastic: zero tolerance.', c: [['FT-MP-0412', 3, 'Foreign bodies (glass, metal and hard plastic): absent, zero tolerance.']] },
            { t: 'None of the 14 allergens requiring mandatory declaration.', c: [['FT-MP-0412', 2, 'Allergens: contains none of the 14 allergens requiring mandatory declaration under Regulation (EU) No 1169/2011.']] },
            { t: '14 to 18 °Brix and pH of 4.4 maximum.', c: [['FT-MP-0412', 3, 'Soluble solids: 14 to 18 °Brix.'], ['FT-MP-0412', 3, 'pH: 4.4 maximum.']] },
            { t: 'Once opened, refrigerate and consume within 5 days.', c: [['FT-MP-0412', 4, 'Once opened, keep refrigerated and consume within 5 days.']] }
          ] }
        ],
        followups: ['lote', 'vidrio']
      }
    ],

    gaps: [
      { id: 'plagas', topic: 'Pest control', anchors: ['pests', 'pest', 'rodent', 'rodents', 'bait', 'baits', 'cockroaches', 'insects', 'fumigation', 'rats', 'mice'],
        reason: 'No indexed document describes the pest control plan for the distribution centre or the stores.' },
      { id: 'food-defense', topic: 'Food defence', anchors: ['food defense', 'food defence', 'sabotage', 'intrusion', 'vulnerability', 'food fraud'],
        reason: 'No indexed document covers food defence or vulnerability to fraud.' },
      { id: 'crisis', topic: 'Crisis communication', anchors: ['spokesperson', 'press conference', 'pr-cal-011', 'crisis team', 'social media'],
        reason: 'No indexed document describes crisis communication with the media and social networks.', related: 'PR-CAL-011' },
      { id: 'precio', topic: 'Prices and promotions', anchors: ['price', 'prices', 'promotion', 'promotions', 'offers', 'discount', 'cost', 'margin', 'charge for'],
        reason: 'Prices, promotions and margins are not part of the indexed Quality procedures.' },
      { id: 'transporte', topic: 'Transport to stores', anchors: ['lorry', 'lorries', 'truck', 'trucks', 'transport', 'haulier', 'carrier', 'route', 'routes', 'delivery'],
        reason: 'No indexed document describes transport conditions from the distribution centre to the stores.' },
      { id: 'personal', topic: 'Working conditions', anchors: ['holidays', 'holiday', 'payroll', 'salary', 'wage', 'collective agreement', 'contract', 'working hours', 'cashier', 'cashiers'],
        reason: 'Working conditions are not part of the indexed Quality procedures.' }
    ]
  }
});

/* Canonical summary by code (CN_DATA.procedures): filled in without overwriting what other files may have set. */
(function (id) {
  'use strict';
  const pack = window.AGENTIC_INDUSTRIES_EN[id];
  const procs = pack.procedures = pack.procedures || {};
  pack.procedimientos.docs.forEach((d) => {
    const cur = procs[d.code] = procs[d.code] || {};
    if (!cur.title) cur.title = d.title;
    if (!cur.summary) cur.summary = d.summary;
    if (!cur.version) cur.version = d.version;
  });
})('retail');
