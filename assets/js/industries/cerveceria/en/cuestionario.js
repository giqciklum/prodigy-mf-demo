/* Cerveceria Bardenas · Supplier Approval Questionnaire SAQ-3 by Northgate Beverages Ltd (British importer), English. Fictitious entities; synthetic data (MFM). */
agenticPackEn('cerveceria', {
  cuestionario: {
    agent: 'Customer questionnaires',
    lang: 'en',
    default_sel: 'B1',
    reviewer: 'Quality Manager',
    assignee: 'Customer quality',
    assignee_short: 'Customer quality',
    team: 'Calidad',
    assign_due: '2026-10-07',
    responder: 'Cerveceria Bardenas, S.A. (Arguedas brewery)',
    site: 'Arguedas brewery (Navarre)',
    site_label: 'Brewery',
    page_title: 'Supplier Approval · Northgate Beverages',
    report_title: 'Response to supplier approval questionnaire',
    ref_label: 'Customer reference',
    scope_meta_label: 'Products',
    discard_placeholder: 'For example: answered with the attached IFS certificate',
    save_system: 'SAP S/4HANA',
    qn: {
      code: 'CUE-2026-044',
      title: 'Supplier Approval Questionnaire SAQ-3 (beer and cider)',
      customer: 'Northgate Beverages Ltd',
      via: 'Northgate Beverages Ltd · Technical',
      received: '2026-09-28T08:30',
      due: '2026-10-09',
      file: 'Northgate_SAQ-3_Supplier_Approval_Cerveceria_Bardenas.xlsx',
      scope: 'Bardenas Lager (33cl bottle and 30L keg) and Bardenas Sin (33cl can) for import and distribution in the UK',
      scope_short: 'Bardenas Lager 33cl and 30L · Bardenas Sin 33cl',
      scope_label: '2 beers in 3 formats for the UK'
    },
    email: {
      mailbox: 'Quality mailbox',
      headers: {
        From: 'Technical Team, Northgate Beverages Ltd <technical@northgate-bev.example>',
        To: 'Quality, Cerveceria Bardenas <calidad@cerveceriabardenas.example>',
        Date: 'Mon, 28 Sep 2026 07:30 (UK time)',
        Subject: 'Supplier approval - SAQ-3 questionnaire - Bardenas Lager and Bardenas Sin - due 9 October'
      },
      text: 'Dear Quality Team,\n\nFollowing our commercial agreement, we need to complete supplier approval before the first shipment to the UK. Please find attached our Supplier Approval Questionnaire SAQ-3 for:\n- Bardenas Lager 33cl bottle and 30L keg\n- Bardenas Sin 33cl can\n\nThe questionnaire has 15 questions in five sections: certification and HACCP, product safety, process control, traceability and incidents, and packaging, labelling and sustainability.\n\nPlease answer every question in English and reference the procedure, record or certificate that supports each answer. We need the completed questionnaire by Friday 9 October 2026 so that the products can be listed in November.\n\nKind regards,\n\nTechnical Team\nNorthgate Beverages Ltd',
      highlights: [
        { text: 'Bardenas Lager 33cl bottle and 30L keg', label: 'Product', tone: 'brand' },
        { text: 'Bardenas Sin 33cl can', label: 'Product', tone: 'brand' },
        { text: '15 questions', label: 'Questions', tone: 'brand' },
        { text: 'reference the procedure, record or certificate that supports each answer', label: 'Requirement' },
        { text: 'Friday 9 October 2026', label: 'Deadline' }
      ]
    },
    sections: [
      { id: 'A', en: 'Certification and HACCP' },
      { id: 'B', en: 'Product safety' },
      { id: 'C', en: 'Process control' },
      { id: 'D', en: 'Traceability and incidents' },
      { id: 'E', en: 'Packaging, labelling and sustainability' }
    ],
    kpi: { label: 'IFS Food audit 2026', value: '97.4 %', sub: 'Higher level · unannounced audit on 10/06/2026 · certificate valid until 21/07/2027', icon: 'shield-check' },
    sources_sub: 'Certificate, HACCP plan, procedures and specifications',
    identify_result: 'Northgate Beverages Ltd · Bardenas Lager (33cl and 30L) and Bardenas Sin (33cl) · UK',
    search_scope: 'IFS certificate, HACCP plan, fermentation, packaging, release and recall procedures, customer complaint records and product and labelling specifications',
    lookups: [
      { system: 'Brewmaxx (MES)', action: 'Reads pasteurisation units and bottle inspector verifications', result: '100% of lots between 15 and 25 PU · EBI-1 verifications compliant', ms: 520 },
      { system: 'LIMS LabWare', action: 'Reviews lot release for September', result: '46 lots released with full analyses · 1 held (L2608-K14)', ms: 460 },
      { system: 'SAP S/4HANA', action: 'Rebuilds batch traceability and searches for complaints', result: 'L2608-K14: malt, hops and CO2 by lot · 1 open complaint', ms: 480, tone: 'warn' },
      { system: 'WMS Mecalux', action: 'Reads pallets and shipments for the batch', result: '1,040 kegs: 912 shipped to 14 customers, 96 in stock, 32 held', ms: 380 },
      { system: 'SCADA cellar', action: 'Cross-checks the questionnaire with today’s alarms', result: 'FV-12 at 16.8°C (setpoint 12°C) since 02:30 · batch L2609-FV12', ms: 320, tone: 'warn' }
    ],
    compare: {
      people: '2–3: Quality, Packaging and, depending on the question, Procurement or Logistics',
      systems: '6–8: email, customer Excel, SAP, Brewmaxx, LIMS, WMS, certificate and specification folder',
      steps: 'Find evidence for each question, translate procedures into English, request data from Packaging and Procurement, and build the Excel',
      time: '3–5 hours of Quality work, spread over 2–3 days'
    },
    presenter: {
      before: [
        'Before the first shipment to the UK, Northgate Beverages must approve our brewery. Their questionnaire decides whether the beer reaches the shelves in November.',
        '{total} questions in English on certification, glass, gluten, pasteurisation, traceability and UK labelling. The procedures are in Spanish; no problem.',
        'When you press the button, Agentic Platform searches the IFS certificate, the HACCP plan, the procedures and the specifications, and in the records from Brewmaxx, LIMS, SAP, the WMS and the cellar SCADA, and drafts each answer with its source.'
      ],
      during: [
        '{drafted} of {total} with draft and citation, in English and sourced; each citation is checked against the source text. {flagged} remain unanswered: food safety culture, food contact materials and packaging data for the UK EPR. Without a document, nothing is invented.',
        'B1: the glass policy answers with the procedure and with this month’s bottle inspector verifications.',
        'C2 and D2: cross-check the questionnaire with today’s FV-12 alarm and the open complaint about oxidised kegs. The questionnaire does not live isolated from the rest of the brewery.',
        'Nothing goes out without approval: all high-confidence ones in batch; traceability and UK labelling reviewed one by one.'
      ],
      next_during: 'Show B1 (citations) and D2 (complaint alert), and E2 (no evidence). Then "Approve the {alta} high-confidence answers", approve {media_ids} one by one and "Assign the {flagged} with no source".'
    },
    sources: {
      'CERT-IFS': {
        type: 'doc', kind: 'Certificate', code: 'CERT-IFS-FOOD-8', title: 'IFS Food Certificate version 8 · Arguedas brewery', system: 'Procedures',
        org: 'Certification body accredited by ENAC · certificate no. IFS-26-7731', date: '2026-07-22',
        sections: [
          { id: 'alc', heading: 'Scope', text: 'Brewing and packaging in bottle, can and keg of beer and alcohol-free beer.' },
          { id: 'res', heading: 'Result', text: 'Higher level, with a score of 97.4%, at the unannounced audit on 10/06/2026. Certificate valid until 21/07/2027.' }
        ]
      },
      'APPCC-01': {
        type: 'doc', kind: 'HACCP Plan', code: 'APPCC-01', title: 'HACCP Plan', system: 'Procedures', version: '11', date: '2026-02-05', owner: 'HACCP Team',
        sections: [
          { id: '4', heading: '4. Critical control points', page: 8, list: ['CCP 1: tunnel pasteurisation of bottles and cans, between 15 and 25 pasteurisation units (PU)', 'CCP 2: flash pasteurisation of keg beer, 20 PU minimum', 'CCP 3: automatic inspection of empty bottles, with rejection of any with foreign bodies or defects'] },
          { id: '7', heading: '7. Review', page: 14, text: 'The HACCP team reviews the plan annually and whenever a product or process changes; last review: 05/02/2026.' }
        ]
      },
      'PR-ENV-002': {
        type: 'doc', kind: 'Procedure', code: 'PR-ENV-002', title: 'Glass and foreign bodies management', system: 'Procedures', version: '7', owner: 'Quality Manager',
        sections: [
          { id: '3', heading: '3. Glass register', page: 2, text: 'Register of glass and brittle plastics from the whole brewery, with monthly condition inspection.' },
          { id: '5', heading: '5. Breakage on the filler', page: 4, text: 'If a bottle breaks on the filler: line stops, vacuum and rinse the affected area and filling valves, and destroy the bottles from the affected filler valve and the 5 valves before and after it for 3 filler rotations.' },
          { id: '6', heading: '6. Inspection', page: 5, text: 'The EBI-1 empty bottle inspector is verified with test bottles at the start of each shift and every 2 hours; the full bottle inspector checks level, closure and particles at the bottom.' }
        ]
      },
      'PR-FER-003': {
        type: 'doc', kind: 'Procedure', code: 'PR-FER-003', title: 'Fermentation control', system: 'Procedures', owner: 'Head Brewer',
        sections: [
          { id: '4', heading: '4. Setpoints', page: 3, text: 'Bardenas Lager: fermentation setpoint of 12°C and limit of 13.5°C, with continuous control from the cellar SCADA.' },
          { id: '6', heading: '6. Deviations', page: 5, text: 'If temperature exceeds the limit for more than 2 hours, the batch is held and diacetyl and acetaldehyde are tested in LIMS before transfer. Above 15°C the deviation is critical.' }
        ]
      },
      'PR-CAL-002': {
        type: 'doc', kind: 'Procedure', code: 'PR-CAL-002', title: 'Finished product release', system: 'Procedures', version: '5', owner: 'Quality Manager',
        sections: [
          { id: '3', heading: '3. Positive release', page: 2, text: 'No batch is shipped without compliant results in LIMS: alcohol, extract, CO2, dissolved oxygen, haze and microbiology.' }
        ]
      },
      'PR-CAL-006': {
        type: 'doc', kind: 'Procedure', code: 'PR-CAL-006', title: 'Product recall', system: 'Procedures', owner: 'Quality Manager',
        sections: [
          { id: '4', heading: '4. Communication', page: 3, text: 'Affected customers are notified within 2 hours of the recall decision; AESAN and the health authority of Navarre are informed.' },
          { id: '7', heading: '7. Objective and drills', page: 5, text: 'Objective: locate all product from a batch within 4 hours. At least one recall drill is carried out annually.' }
        ]
      },
      'PR-CAL-007': {
        type: 'doc', kind: 'Procedure', code: 'PR-CAL-007', title: 'Customer complaints', system: 'Procedures', version: '4', owner: 'Quality Manager',
        sections: [
          { id: '3', heading: '3. Timescales', page: 2, text: 'Initial response within 48 hours and investigation report within 10 working days; food safety complaints are escalated to Quality immediately.' },
          { id: '5', heading: '5. Analysis', page: 3, text: 'The retained sample from the batch is analysed in LIMS and the root cause and corrective actions are recorded.' }
        ]
      },
      'ET-PT-001': {
        type: 'doc', kind: 'Product specification', code: 'ET-PT-001', title: 'Product specification · Bardenas Lager', system: 'Procedures', owner: 'Quality Manager',
        sections: [
          { id: '2', heading: '2. Composition', page: 1, text: 'Ingredients: water, barley malt, maize and hops. Alcohol by volume: 4.8%.' },
          { id: '3', heading: '3. Allergens', page: 1, text: 'Contains barley, a cereal containing gluten. No "gluten-free" claim.' }
        ]
      },
      'ET-PT-003': {
        type: 'doc', kind: 'Product specification', code: 'ET-PT-003', title: 'Product specification · Bardenas Sin', system: 'Procedures', owner: 'Quality Manager',
        sections: [
          { id: '2', heading: '2. Composition', page: 1, text: 'Ingredients: water, barley malt, hops and natural flavouring. Alcohol by volume: maximum 0.05%.' },
          { id: '3', heading: '3. Allergens', page: 1, text: 'Contains barley, a cereal containing gluten.' }
        ]
      },
      'ET-ETQ-UK': {
        type: 'doc', kind: 'Labelling specification', code: 'ET-ETQ-UK', title: 'UK labelling specification', system: 'Procedures', version: '1', date: '2026-09-10', owner: 'Quality Manager',
        sections: [
          { id: '2', heading: '2. Mandatory information', page: 1, text: 'Labels in English with product name, alcohol strength, ingredients list with barley highlighted, batch and best-before date.' },
          { id: '3', heading: '3. Bardenas Sin', page: 2, text: '"Alcohol free" is permitted in the UK for drinks of maximum 0.05% ABV.' }
        ]
      },
      'BMX-ENV': {
        type: 'record', kind: 'Packaging records', code: 'Packaging · September', title: 'Pasteurisation and bottle inspection · September 2026', system: 'Brewmaxx (MES)',
        org: 'Brewmaxx · line records',
        sections: [
          { id: 'up', heading: 'Pasteurisation', text: 'Tunnel TP-1: pasteurisation units calculated by zone and recorded by batch; 100% of September lots between 15 and 25 PU.' },
          { id: 'ibv', heading: 'Empty bottle inspector', text: 'EBI-1: 176 verifications with test bottles in September, all compliant.' },
          { id: 'rot', heading: 'Filler breakages', text: 'Filler breakages in September: 6, all with cleanup and discard protocol recorded.' }
        ]
      },
      'LIMS-LIB': {
        type: 'record', kind: 'Lot release', code: 'Release · September', title: 'Batches analysed and released · September 2026', system: 'LIMS LabWare',
        org: 'LIMS LabWare · product release',
        sections: [
          { id: 'lib', heading: 'September 2026', text: 'Packaging batches released: 46, all with full analyses before shipment. Batches held by Quality: 1 (L2608-K14, 32 kegs).' }
        ]
      },
      'SAP-K14': {
        type: 'record', kind: 'Batch record', code: 'L2608-K14', title: 'Batch L2608-K14 · 30L keg of Bardenas Lager', system: 'SAP S/4HANA',
        org: 'SAP S/4HANA · batch and raw materials',
        sections: [
          { id: 'mp', heading: 'Raw materials', text: 'Packaged on 18/08/2026; malt MAL-2607-05, hops LUP-2606-11 and CO2 CO2-2608-02.' }
        ]
      },
      'WMS-K14': {
        type: 'record', kind: 'Forward trace', code: 'L2608-K14', title: 'Batch L2608-K14 · kegs and shipments', system: 'WMS Mecalux',
        org: 'WMS Mecalux · pallets and shipments',
        sections: [
          { id: 'fwd', heading: 'Kegs', text: '1,040 kegs packaged: 912 shipped to 14 customers, 96 in stock and 32 held by Quality.' }
        ]
      },
      'SAP-RCL': {
        type: 'record', kind: 'Complaints', code: 'Complaints 12 months', title: 'Customer complaints · last 12 months', system: 'SAP S/4HANA',
        org: 'SAP S/4HANA · quality notifications',
        sections: [
          { id: 'r', heading: 'Summary', text: 'Customer complaints in the last 12 months: 37, of which 36 closed with root cause; none related to glass.' }
        ]
      }
    },
    questions: [
      {
        id: 'A1', ref: 'SAQ-3 1.1', sec: 'A', topic: 'GFSI certification', conf: 'alta',
        qEn: 'Is the manufacturing site certified to a GFSI-recognised standard (BRCGS or IFS)? Please give the grade or level, the date of the last audit and the certificate expiry date.',
        en: 'Yes. Our Arguedas brewery is certified to IFS Food version 8 for the brewing and packaging of beer and alcohol-free beer in bottles, cans and kegs [1]. We achieved Higher level with a score of 97.4% at an unannounced audit on 10 June 2026, and the certificate is valid until 21 July 2027 [2]. A copy of the certificate is attached.',
        cites: [
          { src: 'CERT-IFS', q: 'Brewing and packaging in bottle, can and keg of beer and alcohol-free beer.' },
          { src: 'CERT-IFS', q: 'Higher level, with a score of 97.4%, at the unannounced audit on 10/06/2026. Certificate valid until 21/07/2027.' }
        ]
      },
      {
        id: 'A2', ref: 'SAQ-3 1.2', sec: 'A', topic: 'HACCP and CCP', conf: 'alta',
        qEn: 'Please list the critical control points in your HACCP plan for the products supplied and state when the plan was last reviewed.',
        en: 'Our HACCP plan has three critical control points: tunnel pasteurisation of bottles and cans at 15 to 25 pasteurisation units (PU) [1], flash pasteurisation of keg beer at a minimum of 20 PU [2], and automatic inspection of empty bottles, rejecting any with foreign bodies or defects [3]. The HACCP team reviews the plan annually and whenever a product or process changes; it was last reviewed on 5 February 2026 [4].',
        cites: [
          { src: 'APPCC-01', q: 'CCP 1: tunnel pasteurisation of bottles and cans, between 15 and 25 pasteurisation units (PU)' },
          { src: 'APPCC-01', q: 'CCP 2: flash pasteurisation of keg beer, 20 PU minimum' },
          { src: 'APPCC-01', q: 'CCP 3: automatic inspection of empty bottles, with rejection of any with foreign bodies or defects' },
          { src: 'APPCC-01', q: 'The HACCP team reviews the plan annually and whenever a product or process changes; last review: 05/02/2026.' }
        ]
      },
      {
        id: 'A3', ref: 'SAQ-3 1.3', sec: 'A', topic: 'Food safety culture', conf: 'none',
        qEn: 'Describe your food safety culture plan: how it is measured, the objectives set and the results of the last assessment.',
        flag: {
          reason: 'None of the {doc_count} indexed documents describe the food safety culture plan or its assessment.',
          context: 'IFS Food version 8 requires a food safety culture plan with objectives and measurement, so it should exist in Quality. Agentic Platform does not describe its content or assume results.',
          partial: [],
          missing: ['Food safety culture plan with objectives', 'Measurement method (survey, indicators)', 'Result of the last assessment and actions']
        }
      },
      {
        id: 'B1', ref: 'SAQ-3 2.1', sec: 'B', topic: 'Glass policy', conf: 'alta',
        qEn: 'Describe your glass and brittle plastics policy, including the procedure for a bottle breakage on the filler and how empty bottle inspection is verified.',
        en: 'We keep a glass and brittle plastics register for the whole brewery, inspected monthly [1]. If a bottle breaks on the filler, the line stops, the area and affected filling valves are vacuumed and rinsed, and the bottles from the affected filling valve and the 5 valves before and after it are destroyed for 3 rotations of the filler [2]; all 6 breakages in September 2026 were recorded with this protocol [3]. The empty bottle inspector (EBI) is verified with test bottles at the start of every shift and every 2 hours [4], and all 176 verifications in September were compliant [5].',
        cites: [
          { src: 'PR-ENV-002', q: 'Register of glass and brittle plastics from the whole brewery, with monthly condition inspection.' },
          { src: 'PR-ENV-002', q: 'destroy the bottles from the affected filler valve and the 5 valves before and after it for 3 filler rotations' },
          { src: 'BMX-ENV', q: 'Filler breakages in September: 6, all with cleanup and discard protocol recorded.' },
          { src: 'PR-ENV-002', q: 'The EBI-1 empty bottle inspector is verified with test bottles at the start of each shift and every 2 hours' },
          { src: 'BMX-ENV', q: 'EBI-1: 176 verifications with test bottles in September, all compliant.' }
        ]
      },
      {
        id: 'B2', ref: 'SAQ-3 2.2', sec: 'B', topic: 'Foreign bodies in packaged product', conf: 'alta',
        qEn: 'What controls detect foreign bodies in filled product, and have you received any glass-related complaints in the last 12 months?',
        en: 'The full bottle inspector checks fill level, closure and particles at the bottom of each bottle [1]. In the last 12 months we received 37 customer complaints, 36 of them closed with root cause, and none related to glass [2].',
        cites: [
          { src: 'PR-ENV-002', q: 'the full bottle inspector checks level, closure and particles at the bottom' },
          { src: 'SAP-RCL', q: 'Customer complaints in the last 12 months: 37, of which 36 closed with root cause; none related to glass.' }
        ]
      },
      {
        id: 'B3', ref: 'SAQ-3 2.3', sec: 'B', topic: 'Allergens and gluten', conf: 'alta',
        qEn: 'Do the products contain any of the 14 allergens regulated under UK food information law? Are any gluten-free claims made?',
        en: 'Yes. Bardenas Lager is made from water, barley malt, maize and hops [1] and Bardenas Sin from water, barley malt, hops and natural flavouring [2]. Both contain barley, a cereal containing gluten [3][4], which is emphasised in the ingredients list on the UK labels [5]. No gluten-free claim is made [3].',
        cites: [
          { src: 'ET-PT-001', q: 'Ingredients: water, barley malt, maize and hops.' },
          { src: 'ET-PT-003', q: 'Ingredients: water, barley malt, hops and natural flavouring.' },
          { src: 'ET-PT-001', q: 'Contains barley, a cereal containing gluten. No "gluten-free" claim.' },
          { src: 'ET-PT-003', q: 'Contains barley, a cereal containing gluten.' },
          { src: 'ET-ETQ-UK', q: 'ingredients list with barley highlighted' }
        ]
      },
      {
        id: 'C1', ref: 'SAQ-3 3.1', sec: 'C', topic: 'Pasteurisation', conf: 'alta',
        qEn: 'How is pasteurisation controlled and recorded for bottles, cans and kegs?',
        en: 'Bottles and cans are tunnel pasteurised at 15 to 25 PU, and keg beer is flash pasteurised at a minimum of 20 PU; both are critical control points [1][2]. In the tunnel pasteuriser, pasteurisation units are calculated by zone and recorded for every lot, and all lots in September 2026 were within 15 to 25 PU [3].',
        cites: [
          { src: 'APPCC-01', q: 'CCP 1: tunnel pasteurisation of bottles and cans, between 15 and 25 pasteurisation units (PU)' },
          { src: 'APPCC-01', q: 'CCP 2: flash pasteurisation of keg beer, 20 PU minimum' },
          { src: 'BMX-ENV', q: 'Tunnel TP-1: pasteurisation units calculated by zone and recorded by batch; 100% of September lots between 15 and 25 PU.' }
        ]
      },
      {
        id: 'C2', ref: 'SAQ-3 3.2', sec: 'C', topic: 'Fermentation control', conf: 'alta',
        qEn: 'How are fermentation temperatures controlled, and what happens to a batch if a deviation occurs?',
        en: 'Bardenas Lager ferments at a set point of 12°C with a limit of 13.5°C, under continuous control from the cellar SCADA system [1]. If the temperature exceeds the limit for more than two hours, the batch is held and diacetyl and acetaldehyde are tested in the laboratory before transfer; a deviation above 15°C is classed as critical [2].',
        cites: [
          { src: 'PR-FER-003', q: 'Bardenas Lager: fermentation setpoint of 12°C and limit of 13.5°C, with continuous control from the cellar SCADA.' },
          { src: 'PR-FER-003', q: 'If temperature exceeds the limit for more than 2 hours, the batch is held and diacetyl and acetaldehyde are tested in LIMS before transfer. Above 15°C the deviation is critical.' }
        ],
        note: {
          tone: 'warn', icon: 'thermometer', title: 'Today’s alarm on fermenter FV-12',
          text: 'FV-12 (Bardenas Lager, wort batch L2609-FV12, 480 hl, day 3 of fermentation) is at 16.8°C since 02:30 due to failure of the glycol valve VG-12, with a peak of 17.1°C. The answer describes the procedure, not today’s case.',
          outcome: 'alarma', tone_done: 'brand', with: { approved: 'In the alarm: {label}.', any: 'In the alarm the agent’s proposal was rejected.' },
          without: 'Batch hold is decided in the alarm scene.',
          go: 'alarma', goLabel: 'Open the alarm'
        }
      },
      {
        id: 'C3', ref: 'SAQ-3 3.3', sec: 'C', topic: 'Positive release', conf: 'alta',
        qEn: 'Is finished product released only after laboratory results are approved? Which parameters are tested before release?',
        en: 'Yes. No lot is dispatched without compliant laboratory results for alcohol, extract, CO2, dissolved oxygen, haze and microbiology [1]. In September 2026, 46 packaging lots were released, all with complete analyses before dispatch, and one lot was held by Quality [2].',
        cites: [
          { src: 'PR-CAL-002', q: 'No batch is shipped without compliant results in LIMS: alcohol, extract, CO2, dissolved oxygen, haze and microbiology.' },
          { src: 'LIMS-LIB', q: 'Packaging batches released: 46, all with full analyses before shipment. Batches held by Quality: 1' }
        ]
      },
      {
        id: 'D1', ref: 'SAQ-3 4.1', sec: 'D', topic: 'Traceability and recall drill', conf: 'media',
        qEn: 'Can you trace a finished lot back to its raw materials and forward to customers? State your target time and the date and result of your last mock recall.',
        en: 'Yes. For example, keg lot L2608-K14, filled on 18 August 2026, traces back to malt lot MAL-2607-05, hop lot LUP-2606-11 and CO2 lot CO2-2608-02 [1], and forward to 1,040 kegs: 912 shipped to 14 customers, 96 in stock and 32 held by Quality [2]. Our target is to locate all product from a lot within 4 hours, and we run at least one mock recall a year [3].',
        cites: [
          { src: 'SAP-K14', q: 'Packaged on 18/08/2026; malt MAL-2607-05, hops LUP-2606-11 and CO2 CO2-2608-02.' },
          { src: 'WMS-K14', q: '1,040 kegs packaged: 912 shipped to 14 customers, 96 in stock and 32 held by Quality.' },
          { src: 'PR-CAL-006', q: 'Objective: locate all product from a batch within 4 hours. At least one recall drill is carried out annually.' }
        ],
        gap: 'The date and result of the last recall drill are not in the indexed sources.',
        gapGo: 'retirada', gapGoLabel: 'Run a drill now', gapOutcome: 'retirada',
        gapOutcomeText: 'There is already a recall drill of batch L2608-K14 in this session: {label}. Add it to the answer if appropriate.'
      },
      {
        id: 'D2', ref: 'SAQ-3 4.2', sec: 'D', topic: 'Customer complaint handling', conf: 'alta',
        qEn: 'Describe your customer complaint handling process, including response times and how root cause is investigated.',
        en: 'We send an initial response within 48 hours and an investigation report within 10 working days; food safety complaints are escalated to Quality immediately [1]. The retained sample of the lot is analysed in the laboratory, and the root cause and corrective actions are recorded [2].',
        cites: [
          { src: 'PR-CAL-007', q: 'Initial response within 48 hours and investigation report within 10 working days; food safety complaints are escalated to Quality immediately.' },
          { src: 'PR-CAL-007', q: 'The retained sample from the batch is analysed in LIMS and the root cause and corrective actions are recorded.' }
        ],
        note: {
          tone: 'warn', icon: 'mail', title: 'Open complaint {rec_code} · oxidised kegs',
          text: 'Distribuciones Hosteleras Ribera reports 30L kegs of Bardenas Lager with cardboard flavour (oxidation) in three bars, from batch [[lot:L2608-K14]]. It is the same format that Northgate asks for: check that the answer is consistent with the investigation before sending it.',
          outcome: 'reclamacion', tone_done: 'brand', with: { any: 'Complaint status: {label}.' },
          go: 'reclamacion', goLabel: 'Open the complaint'
        }
      },
      {
        id: 'D3', ref: 'SAQ-3 4.3', sec: 'D', topic: 'Product recall', conf: 'alta',
        qEn: 'If a product recall is required, how and how quickly will you notify customers such as Northgate, and which authorities are notified?',
        en: 'Affected customers are notified within 2 hours of the recall decision, and the Spanish Food Safety Agency (AESAN) and the health authority of Navarre are informed [1]. Our target is to locate all product from the affected lot within 4 hours [2].',
        cites: [
          { src: 'PR-CAL-006', q: 'Affected customers are notified within 2 hours of the recall decision; AESAN and the health authority of Navarre are informed.' },
          { src: 'PR-CAL-006', q: 'Objective: locate all product from a batch within 4 hours.' }
        ]
      },
      {
        id: 'E1', ref: 'SAQ-3 5.1', sec: 'E', topic: 'UK labelling', conf: 'media',
        qEn: 'Confirm that the labels comply with UK food labelling requirements, including the alcohol-free descriptor and the name and address of the UK importer.',
        en: 'UK labels are in English and show the product name, alcoholic strength, the ingredients list with barley emphasised, lot and best-before date [1]. Bardenas Sin is described as "alcohol free", a term permitted in the UK for drinks of no more than 0.05% ABV [2], and its specification sets a maximum of 0.05% ABV [3].',
        cites: [
          { src: 'ET-ETQ-UK', q: 'Labels in English with product name, alcohol strength, ingredients list with barley highlighted, batch and best-before date.' },
          { src: 'ET-ETQ-UK', q: '"Alcohol free" is permitted in the UK for drinks of maximum 0.05% ABV.' },
          { src: 'ET-PT-003', q: 'Alcohol by volume: maximum 0.05%.' }
        ],
        gap: 'The labelling specification does not include Northgate’s name and UK address as importer, nor approval of designs by the customer. Confirm with Northgate before sending.'
      },
      {
        id: 'E2', ref: 'SAQ-3 5.2', sec: 'E', topic: 'Food contact materials', conf: 'none',
        qEn: 'Please provide declarations of compliance for all food contact packaging (bottles, cans and can coatings, crowns, kegs), including the status of bisphenol A in can coatings.',
        flag: {
          reason: 'Declarations of compliance from packaging suppliers are not among the {doc_count} indexed documents.',
          context: 'Regulation (EU) 2024/3190 prohibits bisphenol A in food contact materials, with transition periods; that is why Northgate asks about can coatings. Agentic Platform does not assume each supplier’s status.',
          partial: [],
          missing: ['Compliance declarations (Regulation (EC) 1935/2004 and Regulation (EU) 10/2011) for cans, coatings, crowns and gaskets', 'Confirmation that can coatings are bisphenol A-free', 'Effective date of each declaration']
        }
      },
      {
        id: 'E3', ref: 'SAQ-3 5.3', sec: 'E', topic: 'UK EPR packaging data', conf: 'none',
        qEn: 'For UK extended producer responsibility for packaging (pEPR), please provide the weight and material of each packaging component and its recycled content.',
        flag: {
          reason: 'None of the {doc_count} indexed documents record packaging weights, materials or recycled content.',
          context: 'Northgate, as importer, is the responsible producer in the UK and needs this data for declaration. Packaging Procurement has it; Agentic Platform does not estimate it.',
          partial: [],
          missing: ['Weight and material of bottle, can, crown, label and secondary and tertiary packaging', 'Recycled content of glass and aluminium', 'Data by format: 33cl bottle, 33cl can and 30L keg']
        }
      }
    ]
  }
});
