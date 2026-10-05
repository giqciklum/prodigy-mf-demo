/* Mercados Moncayo · IFS Logistics v3 pre-audit questionnaire for the Plaza distribution centre (English). Fictitious companies; synthetic data (MFM). */
agenticPackEn('retail', {
  cuestionario: {
    agent: 'Customer questionnaires',
    lang: 'en',
    default_sel: 'B1',
    reviewer: 'Head of Quality',
    assignee: 'Distribution Centre Manager',
    assignee_short: 'the DC Manager',
    team: 'Quality',
    assign_due: '2026-10-09',
    responder: 'Mercados Moncayo, S.A. (Plaza Distribution Centre)',
    site: 'Plaza Distribution Centre (Zaragoza)',
    site_label: 'Site',
    page_title: 'IFS Logistics v3 pre-audit · Plaza Distribution Centre',
    report_title: 'Response to the IFS Logistics pre-audit questionnaire',
    ref_label: 'IFS Logistics chapter',
    scope_meta_label: 'Scope',
    discard_placeholder: 'For example: the evidence will be shown at the on-site audit',
    save_system: 'ServiceNow',
    qn: {
      code: 'CUE-2026-019',
      title: 'IFS Logistics version 3 pre-audit questionnaire',
      customer: 'Certiva Certificación',
      via: 'Certiva Certificación · IFS audit',
      received: '2026-09-28T10:05',
      due: '2026-10-16',
      file: 'Certiva_IFS_Log_v3_Plaza.xlsx',
      scope: 'goods receipt, ambient, chilled and frozen storage, order picking and dispatch to stores at the Plaza Distribution Centre (initial IFS Logistics v3 audit scheduled for 3 and 4 November 2026)',
      scope_short: 'Plaza Distribution Centre · IFS Logistics v3',
      scope_label: 'initial audit on 3 and 4 November'
    },
    email: {
      mailbox: 'Quality mailbox',
      headers: {
        From: 'IFS Programme, Certiva Certificación <ifs@certiva.example>',
        To: 'Quality, Mercados Moncayo <calidad@mercadosmoncayo.example>',
        Date: 'Mon, 28 Sep 2026 10:05',
        Subject: 'Initial IFS Logistics v3 audit · Plaza Distribution Centre · pre-audit questionnaire'
      },
      text: 'Good morning,\n\nWe confirm the initial IFS Logistics version 3 audit of the Plaza Distribution Centre on 3 and 4 November 2026.\n\nTo prepare the audit plan, please find attached the pre-audit questionnaire: 15 questions on the management system and HACCP, temperature control, warehouse operations, traceability and incidents, and product defence and outsourcing.\n\nIn each answer, state the procedure or record that supports it: we will ask for that evidence during the audit. Please return it by Friday 16 October 2026.\n\nBest regards,\n\nIFS Programme\nCertiva Certificación',
      highlights: [
        { text: 'IFS Logistics version 3', label: 'Standard', tone: 'brand' },
        { text: '3 and 4 November 2026', label: 'Audit', tone: 'brand' },
        { text: '15 questions', label: 'Questions', tone: 'brand' },
        { text: 'the procedure or record that supports it', label: 'Requirement' },
        { text: 'Friday 16 October 2026', label: 'Deadline' }
      ]
    },
    sections: [
      { id: 'A', en: 'Management system and HACCP' },
      { id: 'B', en: 'Temperature control' },
      { id: 'C', en: 'Warehouse operations' },
      { id: 'D', en: 'Traceability, incidents and complaints' },
      { id: 'E', en: 'Product defence and outsourcing' }
    ],
    kpi: { label: 'Food safety alerts in 2025', value: 23, sub: '4 with product recall · 1,214 consumer complaints handled', icon: 'shield-check' },
    sources_sub: 'Manual, HACCP plan, distribution centre and alert procedures',
    identify_result: 'Certiva Certificación · IFS Logistics v3 · Plaza Distribution Centre · audit on 03/11/2026',
    search_scope: 'quality manual, HACCP plan, distribution centre, alert and complaint procedures',
    lookups: [
      { system: 'Sensores de frío', action: 'Reads the cold room and dock probes and the truck records', result: '42 probes every 5 min · 1,540 store runs with records downloaded', ms: 480 },
      { system: 'WMS Manhattan', action: 'Checks receipt temperatures and the traceability of a lot', result: '1,862 receipts with temperature recorded · lot L26214 traced', ms: 520 },
      { system: 'ServiceNow', action: 'Checks internal audits, pest control and food safety alerts', result: 'Internal audit of 14/05/2026 · 23 alerts handled in 2025', ms: 420 },
      { system: 'CRM Fidelización', action: 'Looks for open consumer complaints', result: 'Open complaint: glass in Tomate frito Moncayo 400 g, lot L26214', ms: 360, tone: 'warn' },
      { system: 'Sensores de frío', action: 'Cross-checks the questionnaire with today’s alarms', result: 'T-027: display cabinet MR-3 at 9.4 °C since 03:55 (store, outside the IFS scope)', ms: 300, tone: 'warn' }
    ],
    compare: {
      people: '2–3: Quality, DC Manager and, depending on the question, Maintenance or Purchasing',
      systems: '6–8: email, the certification body’s Excel file, SAP, WMS, cold-chain sensors, ServiceNow, CRM and the procedures folder',
      steps: 'Read the standard, find the evidence for each requirement, ask the distribution centre and Maintenance for records and build the Excel file',
      time: '3–5 h of Quality work, spread over 2–3 days'
    },
    presenter: {
      before: [
        'The distribution centre is being certified to IFS Logistics v3 for the first time in November, and the certification body sends its pre-audit questionnaire first: preparing the evidence for each requirement is background work for Quality.',
        'There are {total} questions on HACCP, temperatures, warehouse, traceability and incidents, and product defence. Every answer must come with its procedure or record.',
        'When you press the button, Agentic Platform searches the manual, the HACCP plan and the procedures, plus the records in the cold-chain sensors, the WMS, ServiceNow and the CRM, and drafts each answer with its source.'
      ],
      during: [
        '{drafted} of {total} have a cited draft, with document and section; every citation is checked against the source text. {flagged} are left unanswered: product defence, subcontractors and glass control. No document, nothing invented.',
        'B1: besides answering, it flags the T-027 dairy display cabinet at 9.4 °C overnight. It is a store and outside the audit scope, but the auditor may ask about the procedure.',
        'D3: it cross-checks the complaints question with the open complaint about glass in lot L26214. The questionnaire does not live in isolation from the rest of the operation.',
        'Nothing goes out without approval: bulk approval only for high-confidence answers; cleaning and traceability are reviewed one by one.'
      ],
      next_during: 'Show B1 (citations and alarm warning) and E1 (no evidence). Then “Approve the {alta} high-confidence answers”, approve {media_ids} one by one and “Assign the {flagged} without a source”.'
    },
    sources: {
      'MAN-CAL-002': {
        type: 'doc', kind: 'Manual', code: 'MAN-CAL-002', title: 'Quality and food safety manual · Plaza Distribution Centre', system: 'Procedimientos', version: '4', date: '2026-02-17', owner: 'Head of Quality',
        org: 'Mercados Moncayo · Quality',
        sections: [
          { id: '1', heading: '1. Scope', page: 2, text: 'Goods receipt, ambient, chilled (0 to 4 °C) and frozen (−18 °C or below) storage, order picking and dispatch to the 64 stores of packaged food, fruit and vegetables.' },
          { id: '2', heading: '2. Policy and management commitment', page: 3, text: 'Management reviews the quality and food safety policy and the distribution centre objectives every year; the last review was on 17/02/2026.' },
          { id: '7', heading: '7. Site security', page: 11, text: 'Access to the distribution centre is by personal card; visitors and hauliers are registered at the gatehouse.' }
        ]
      },
      'APPCC-PLA-01': {
        type: 'doc', kind: 'HACCP plan', code: 'APPCC-PLA-01', title: 'HACCP plan for the Plaza Distribution Centre', system: 'Procedimientos', version: '6', date: '2026-03-12', owner: 'HACCP team',
        sections: [
          { id: '4', heading: '4. Critical control points', page: 6, list: ['CCP 1: receipt temperature of chilled goods (product at 4 °C or below) and frozen goods (product at −15 °C or below)', 'CCP 2: storage temperature in chilled and frozen cold rooms', 'CCP 3: loading and transport temperature to stores'] },
          { id: '6', heading: '6. Verification', page: 9, text: 'The HACCP team reviews the plan every year and whenever facilities, products or processes change; last review: 12/03/2026.' }
        ]
      },
      'PR-LOG-003': {
        type: 'doc', kind: 'Procedure', code: 'PR-LOG-003', title: 'Temperature control in the distribution centre and transport', system: 'Procedimientos', version: '5', date: '2026-03-12', owner: 'Head of Quality',
        sections: [
          { id: '3', heading: '3. Cold rooms and docks', page: 2, text: 'Probes record the temperature every 5 minutes; if a cold room exceeds its limit for more than 15 minutes, the alarm goes to the shift manager and Refrigeration Maintenance. Records are kept for 2 years.' },
          { id: '4', heading: '4. Goods receipt', page: 3, text: 'Product temperature is measured with a probe at every receipt of chilled and frozen goods; a pallet outside the limit is rejected or blocked in the WMS until Quality decides.' },
          { id: '5', heading: '5. Transport to stores', page: 4, text: 'Store delivery trucks are multi-temperature, with continuous temperature recording downloaded after every run; the store rejects goods that arrive outside the limit.' }
        ]
      },
      'PR-PLA-005': {
        type: 'doc', kind: 'Procedure', code: 'PR-PLA-005', title: 'Pest control', system: 'Procedimientos', version: '3', owner: 'Distribution Centre Manager',
        sections: [
          { id: '3', heading: '3. Service and frequency', page: 2, text: 'External pest control service provided by a company registered in the ROESB (Spanish official register of biocide service providers), with 9 visits a year and 148 monitoring points (bait stations and flying insect traps) on an up-to-date site plan.' },
          { id: '5', heading: '5. Trends', page: 3, text: 'Quality reviews the catch trend and the service recommendations every quarter.' }
        ]
      },
      'PR-LIM-004': {
        type: 'doc', kind: 'Procedure', code: 'PR-LIM-004', title: 'Distribution centre cleaning plan', system: 'Procedimientos', version: '4', owner: 'Distribution Centre Manager',
        sections: [
          { id: '3', heading: '3. Frequencies', page: 2, text: 'Docks and picking areas, daily; chilled cold rooms, weekly; frozen cold rooms, twice a year with defrosting.' },
          { id: '5', heading: '5. Verification', page: 3, text: 'The supervisor of each area signs off the cleaning carried out and Quality checks it at the monthly good practice inspection.' }
        ]
      },
      'PR-ALM-007': {
        type: 'doc', kind: 'Procedure', code: 'PR-ALM-007', title: 'Damaged goods, spillages and allergens', system: 'Procedimientos', version: '2', owner: 'Distribution Centre Manager',
        sections: [
          { id: '3', heading: '3. Damaged goods', page: 2, text: 'Damaged product is segregated in the non-conforming goods area and the spillage is cleaned up immediately.' },
          { id: '4', heading: '4. Allergens', page: 2, text: 'Spillages of products containing allergens are cleaned up with dedicated equipment, colour-coded yellow, to prevent cross-contact with other products.' }
        ]
      },
      'PR-CAL-013': {
        type: 'doc', kind: 'Procedure', code: 'PR-CAL-013', title: 'Internal audits and inspections', system: 'Procedimientos', version: '3', owner: 'Head of Quality',
        sections: [
          { id: '3', heading: '3. Programme', page: 2, text: 'Full internal audit of the distribution centre against the IFS Logistics protocol at least once a year, plus monthly good practice inspections.' }
        ]
      },
      'PR-CAL-010': {
        type: 'doc', kind: 'Procedure', code: 'PR-CAL-010', title: 'Alert and recall management', system: 'Procedimientos', owner: 'Head of Quality',
        sections: [
          { id: '4', heading: '4. Blocking', page: 2, text: 'When an alert is received, Quality blocks the lot in SAP, the WMS holds the pallets and the POS blocks sales in the stores.' },
          { id: '6', heading: '6. Communication', page: 4, text: 'AESAN (the Spanish Food Safety Agency) and the regional health authority are notified, and loyalty-scheme customers who bought the lot are informed.' },
          { id: '7', heading: '7. Target and mock exercises', page: 5, text: 'Target: complete removal from the shelves within 4 h. At least one traceability and recall mock exercise is carried out every year.' }
        ]
      },
      'PR-ATC-002': {
        type: 'doc', kind: 'Procedure', code: 'PR-ATC-002', title: 'Consumer complaints', system: 'Procedimientos', owner: 'Customer Service',
        sections: [
          { id: '3', heading: '3. Deadlines', page: 2, text: 'Reply to the consumer within 48 h. Complaints involving a health risk (foreign bodies, allergens) are escalated to Quality within 2 h and reported to the manufacturer.' }
        ]
      },
      'SENS-PLA': {
        type: 'record', kind: 'Temperature records', code: 'Plaza Distribution Centre', title: 'Cold rooms and docks · probes and alarms', system: 'Sensores de frío',
        org: 'Cold-chain sensors · distribution centre',
        sections: [
          { id: 'inst', heading: 'Installation', text: '42 probes in cold rooms and docks, recording every 5 minutes.' },
          { id: 'sep', heading: 'September 2026', text: '3 temperature alarms in the distribution centre, all resolved in under 30 minutes with no product affected.' }
        ]
      },
      'SENS-TRANS': {
        type: 'record', kind: 'Transport records', code: 'Store fleet', title: 'Transport to stores · temperature records', system: 'Sensores de frío',
        org: 'Cold-chain sensors · trucks',
        sections: [
          { id: 'sep', heading: 'September 2026', text: 'Store runs: 1,540; temperature records downloaded: 1,540; temperature incidents in transport: 2, resolved by rejection at the store.' }
        ]
      },
      'WMS-REC': {
        type: 'record', kind: 'Goods receipts', code: 'Receipts · September', title: 'Receipts of chilled and frozen goods', system: 'WMS Manhattan',
        org: 'WMS Manhattan · goods receipts',
        sections: [
          { id: 'sep', heading: 'September 2026', text: 'Receipts of chilled and frozen goods: 1,862; with product temperature recorded: 100%; pallets rejected for temperature: 4.' }
        ]
      },
      'WMS-L26214': {
        type: 'record', kind: 'Lot trace', code: 'L26214', title: 'Tomate frito Moncayo 400 g (tomato sauce) · lot L26214', system: 'WMS Manhattan',
        org: 'WMS Manhattan · traceability by lot and SSCC',
        sections: [
          { id: 'traza', heading: 'Movements', text: 'L26214: 4,800 units received from Conservas del Jalón, S.L.; 4,320 delivered to 41 stores; 480 at the distribution centre.' }
        ]
      },
      'SN-CAL': {
        type: 'record', kind: 'Quality records', code: 'DC quality', title: 'Audits, pest control and food safety alerts', system: 'ServiceNow',
        org: 'ServiceNow · Quality',
        sections: [
          { id: 'aud', heading: 'Internal audit', text: 'IFS Logistics internal audit of 14/05/2026: 11 deviations (no KO or major); 9 closed and 2 within deadline.' },
          { id: 'plag', heading: 'Pest control', text: 'Visit of 15/09/2026: no rodent activity; flying insect catches within the threshold.' },
          { id: 'alert', heading: 'Food safety alerts', text: 'Food safety alerts handled in 2025: 23 (RASFF and AESAN), 4 with product recall; all closed.' }
        ]
      },
      'CRM-RCL': {
        type: 'record', kind: 'Complaints', code: 'Complaints 2025', title: 'Consumer complaints', system: 'CRM Fidelización',
        org: 'Loyalty CRM · customer service',
        sections: [
          { id: 'r', heading: '2025', text: 'Consumer complaints in 2025: 1,214; answered within 48 h: 97.6%.' }
        ]
      }
    },
    questions: [
      {
        id: 'A1', ref: 'IFS Log v3 · ch. 1', sec: 'A', topic: 'Scope and management commitment', conf: 'alta',
        qEn: 'Describe the scope of the logistics activities to be audited and how management reviews the quality and product safety policy and objectives.',
        en: 'The scope covers goods receipt, ambient, chilled (0 to 4 °C) and frozen (−18 °C or below) storage, order picking and dispatch to the 64 stores of packaged food, fruit and vegetables [1]. Management reviews the quality and food safety policy and the distribution centre objectives every year; the last review was on 17/02/2026 [2].',
        cites: [
          { src: 'MAN-CAL-002', q: 'Goods receipt, ambient, chilled (0 to 4 °C) and frozen (−18 °C or below) storage, order picking and dispatch to the 64 stores of packaged food, fruit and vegetables.' },
          { src: 'MAN-CAL-002', q: 'Management reviews the quality and food safety policy and the distribution centre objectives every year; the last review was on 17/02/2026.' }
        ]
      },
      {
        id: 'A2', ref: 'IFS Log v3 · ch. 2', sec: 'A', topic: 'HACCP plan', conf: 'alta',
        qEn: 'Do you have a HACCP plan based on Codex Alimentarius principles for the distribution centre activities? List the critical control points and when it was reviewed.',
        en: 'Yes. The distribution centre HACCP plan defines three critical control points: the receipt temperature of chilled goods (product at 4 °C or below) and frozen goods (product at −15 °C or below) [1], the storage temperature in cold rooms [2] and the loading and transport temperature to stores [3]. The HACCP team reviews it every year and whenever anything changes; the last review was on 12/03/2026 [4].',
        cites: [
          { src: 'APPCC-PLA-01', q: 'CCP 1: receipt temperature of chilled goods (product at 4 °C or below) and frozen goods (product at −15 °C or below)' },
          { src: 'APPCC-PLA-01', q: 'CCP 2: storage temperature in chilled and frozen cold rooms' },
          { src: 'APPCC-PLA-01', q: 'CCP 3: loading and transport temperature to stores' },
          { src: 'APPCC-PLA-01', q: 'The HACCP team reviews the plan every year and whenever facilities, products or processes change; last review: 12/03/2026.' }
        ]
      },
      {
        id: 'A3', ref: 'IFS Log v3 · ch. 5', sec: 'A', topic: 'Internal audits', conf: 'alta',
        qEn: 'Do you carry out internal audits covering all requirements of the standard at least once a year? State the date and result of the last one.',
        en: 'Yes. We carry out at least one full internal audit a year against the IFS Logistics protocol, plus monthly good practice inspections [1]. The last one, on 14/05/2026, found 11 deviations, none KO or major; 9 are closed and 2 are within deadline [2].',
        cites: [
          { src: 'PR-CAL-013', q: 'Full internal audit of the distribution centre against the IFS Logistics protocol at least once a year, plus monthly good practice inspections.' },
          { src: 'SN-CAL', q: 'IFS Logistics internal audit of 14/05/2026: 11 deviations (no KO or major); 9 closed and 2 within deadline.' }
        ]
      },
      {
        id: 'B1', ref: 'IFS Log v3 · ch. 4', sec: 'B', topic: 'Storage temperature', conf: 'alta',
        qEn: 'How is the temperature of cold rooms and docks monitored and recorded? What happens when there is a deviation, and how long are records kept?',
        en: 'There are 42 probes in cold rooms and docks recording the temperature every 5 minutes [1]. If a cold room exceeds its limit for more than 15 minutes, the alarm goes to the shift manager and Refrigeration Maintenance, and records are kept for 2 years [2]. In September 2026 there were 3 alarms in the distribution centre, all resolved in under 30 minutes with no product affected [3].',
        cites: [
          { src: 'SENS-PLA', q: '42 probes in cold rooms and docks, recording every 5 minutes.' },
          { src: 'PR-LOG-003', q: 'if a cold room exceeds its limit for more than 15 minutes, the alarm goes to the shift manager and Refrigeration Maintenance. Records are kept for 2 years.' },
          { src: 'SENS-PLA', q: '3 temperature alarms in the distribution centre, all resolved in under 30 minutes with no product affected.' }
        ],
        note: {
          tone: 'warn', icon: 'thermometer', title: 'Today’s alarm at store T-027',
          text: 'Dairy display cabinet MR-3 at store T-027 Huesca Centro has been at 9.4 °C (limit 5 °C) since 03:55 because of an evaporator fan failure, with 318 chilled units inside. It is a store, outside the scope of the distribution centre audit, but the auditor may ask about the cold chain up to the shelf.',
          outcome: 'alarma', tone_done: 'brand', with: { approved: 'In the alarm: {label}.', any: 'In the alarm, the agent’s proposal was rejected.' },
          without: 'The decision on the exposed product is taken in the alarm scene.',
          go: 'alarma', goLabel: 'Open the alarm'
        }
      },
      {
        id: 'B2', ref: 'IFS Log v3 · ch. 4', sec: 'B', topic: 'Control at goods receipt', conf: 'alta',
        qEn: 'Is product temperature checked at the receipt of chilled and frozen goods? What is done with a pallet outside the limit?',
        en: 'Yes. Product temperature is measured with a probe at every receipt of chilled and frozen goods; a pallet outside the limit is rejected or blocked in the WMS until Quality decides [1]. In September 2026 there were 1,862 receipts, 100% with product temperature recorded, and 4 pallets were rejected for temperature [2].',
        cites: [
          { src: 'PR-LOG-003', q: 'Product temperature is measured with a probe at every receipt of chilled and frozen goods; a pallet outside the limit is rejected or blocked in the WMS until Quality decides.' },
          { src: 'WMS-REC', q: 'Receipts of chilled and frozen goods: 1,862; with product temperature recorded: 100%; pallets rejected for temperature: 4.' }
        ]
      },
      {
        id: 'B3', ref: 'IFS Log v3 · ch. 4', sec: 'B', topic: 'Transport to stores', conf: 'alta',
        qEn: 'How is temperature maintained and recorded during transport to the stores?',
        en: 'Store delivery trucks are multi-temperature, with continuous temperature recording downloaded after every run, and the store rejects goods that arrive outside the limit [1]. In September 2026 there were 1,540 runs, all with their records downloaded, and 2 temperature incidents, resolved by rejection at the store [2].',
        cites: [
          { src: 'PR-LOG-003', q: 'Store delivery trucks are multi-temperature, with continuous temperature recording downloaded after every run; the store rejects goods that arrive outside the limit.' },
          { src: 'SENS-TRANS', q: 'Store runs: 1,540; temperature records downloaded: 1,540; temperature incidents in transport: 2, resolved by rejection at the store.' }
        ]
      },
      {
        id: 'C1', ref: 'IFS Log v3 · ch. 4', sec: 'C', topic: 'Pest control', conf: 'alta',
        qEn: 'Describe the pest control programme: provider, frequency, monitoring points and trend analysis.',
        en: 'Pest control is provided by an external company registered in the ROESB, with 9 visits a year and 148 monitoring points (bait stations and flying insect traps) on an up-to-date site plan [1]. Quality reviews the catch trend and the service recommendations every quarter [2]. At the last visit, on 15/09/2026, there was no rodent activity and flying insect catches were within the threshold [3].',
        cites: [
          { src: 'PR-PLA-005', q: 'External pest control service provided by a company registered in the ROESB (Spanish official register of biocide service providers), with 9 visits a year and 148 monitoring points (bait stations and flying insect traps) on an up-to-date site plan.' },
          { src: 'PR-PLA-005', q: 'Quality reviews the catch trend and the service recommendations every quarter.' },
          { src: 'SN-CAL', q: 'Visit of 15/09/2026: no rodent activity; flying insect catches within the threshold.' }
        ]
      },
      {
        id: 'C2', ref: 'IFS Log v3 · ch. 4', sec: 'C', topic: 'Cleaning and verification', conf: 'media',
        qEn: 'Describe the cleaning plan for the premises, how its effectiveness is verified and the results of the last verification.',
        en: 'Docks and picking areas are cleaned daily, chilled cold rooms weekly and frozen cold rooms twice a year with defrosting [1]. The supervisor of each area signs off the cleaning carried out and Quality checks it at the monthly good practice inspection [2].',
        cites: [
          { src: 'PR-LIM-004', q: 'Docks and picking areas, daily; chilled cold rooms, weekly; frozen cold rooms, twice a year with defrosting.' },
          { src: 'PR-LIM-004', q: 'The supervisor of each area signs off the cleaning carried out and Quality checks it at the monthly good practice inspection.' }
        ],
        gap: 'The certification body asks for the results of the last cleaning verification, and they are not in the indexed sources: the records of the monthly inspections were not found.'
      },
      {
        id: 'C3', ref: 'IFS Log v3 · ch. 4', sec: 'C', topic: 'Damaged goods and allergens', conf: 'alta',
        qEn: 'How are damaged goods and spillages handled, particularly for products containing allergens, to prevent cross-contamination?',
        en: 'Damaged product is segregated in the non-conforming goods area and the spillage is cleaned up immediately [1]. Spillages of products containing allergens are cleaned up with dedicated equipment, colour-coded yellow, to prevent cross-contact with other products [2].',
        cites: [
          { src: 'PR-ALM-007', q: 'Damaged product is segregated in the non-conforming goods area and the spillage is cleaned up immediately.' },
          { src: 'PR-ALM-007', q: 'Spillages of products containing allergens are cleaned up with dedicated equipment, colour-coded yellow, to prevent cross-contact with other products.' }
        ]
      },
      {
        id: 'D1', ref: 'IFS Log v3 · ch. 4', sec: 'D', topic: 'Traceability and mock exercise', conf: 'media',
        qEn: 'Can you trace a lot from the supplier to each store? State the target time and the date and result of the last traceability exercise.',
        en: 'Yes. The WMS records each lot by supplier, pallet and destination store; for example, for lot L26214 of Tomate frito Moncayo 400 g, 4,800 units were received from Conservas del Jalón, 4,320 were delivered to 41 stores and 480 remain at the distribution centre [1]. Our target is complete removal from the shelves within 4 h, and we carry out at least one traceability and recall mock exercise a year [2].',
        cites: [
          { src: 'WMS-L26214', q: 'L26214: 4,800 units received from Conservas del Jalón, S.L.; 4,320 delivered to 41 stores; 480 at the distribution centre.' },
          { src: 'PR-CAL-010', q: 'Target: complete removal from the shelves within 4 h. At least one traceability and recall mock exercise is carried out every year.' }
        ],
        gap: 'The date and result of the last traceability exercise are not in the indexed sources.',
        gapGo: 'retirada', gapGoLabel: 'Run a mock exercise now', gapOutcome: 'retirada',
        gapOutcomeText: 'There is already a mock exercise for lot L26214 in this session: {label}. Add it to the answer if appropriate.'
      },
      {
        id: 'D2', ref: 'IFS Log v3 · ch. 5', sec: 'D', topic: 'Incident and recall management', conf: 'alta',
        qEn: 'Describe the procedure for managing incidents, alerts and product recalls, including communication with the authorities. How many alerts did you handle last year?',
        en: 'When an alert is received, Quality blocks the lot in SAP, the WMS holds the pallets and the POS blocks sales in the stores [1]. AESAN and the regional health authority are notified, and loyalty-scheme customers who bought the lot are informed [2]. In 2025 we handled 23 food safety alerts (RASFF and AESAN), 4 of them with product recall, all closed [3].',
        cites: [
          { src: 'PR-CAL-010', q: 'When an alert is received, Quality blocks the lot in SAP, the WMS holds the pallets and the POS blocks sales in the stores.' },
          { src: 'PR-CAL-010', q: 'AESAN (the Spanish Food Safety Agency) and the regional health authority are notified, and loyalty-scheme customers who bought the lot are informed.' },
          { src: 'SN-CAL', q: 'Food safety alerts handled in 2025: 23 (RASFF and AESAN), 4 with product recall; all closed.' }
        ]
      },
      {
        id: 'D3', ref: 'IFS Log v3 · ch. 5', sec: 'D', topic: 'Complaints', conf: 'alta',
        qEn: 'How are complaints recorded and handled, including those involving a product safety risk? State deadlines and indicators.',
        en: 'We reply to the consumer within 48 h; complaints involving a health risk, such as foreign bodies or allergens, are escalated to Quality within 2 h and reported to the manufacturer [1]. In 2025 we received 1,214 consumer complaints and answered 97.6% within 48 h [2].',
        cites: [
          { src: 'PR-ATC-002', q: 'Reply to the consumer within 48 h. Complaints involving a health risk (foreign bodies, allergens) are escalated to Quality within 2 h and reported to the manufacturer.' },
          { src: 'CRM-RCL', q: 'Consumer complaints in 2025: 1,214; answered within 48 h: 97.6%.' }
        ],
        note: {
          tone: 'warn', icon: 'mail', title: 'Open complaint about glass · lot L26214',
          text: 'Javier Lasheras found a glass fragment in a jar of Tomate frito Moncayo 400 g from lot [[lot:L26214]], bought at T-011 Zaragoza Delicias. It is exactly the type of complaint the procedure escalates to Quality within 2 h: the auditor will review it if it is still open in November.',
          outcome: 'reclamacion', tone_done: 'brand', with: { any: 'Complaint status: {label}.' },
          go: 'reclamacion', goLabel: 'Open the complaint'
        }
      },
      {
        id: 'E1', ref: 'IFS Log v3 · ch. 6', sec: 'E', topic: 'Product defence', conf: 'none',
        qEn: 'Do you have a threat assessment and a product defence (food defence) plan for the distribution centre? When was it last reviewed?',
        flag: {
          reason: 'None of the {doc_count} indexed documents contains a threat assessment or a product defence plan.',
          partial: [
            { src: 'MAN-CAL-002', q: 'Access to the distribution centre is by personal card; visitors and hauliers are registered at the gatehouse.', why: 'This is access control; it is not a threat assessment or a defence plan with its review.' }
          ],
          missing: ['Threat assessment for the distribution centre', 'Product defence plan with measures by area', 'Date of the last review and the last test']
        }
      },
      {
        id: 'E2', ref: 'IFS Log v3 · ch. 4', sec: 'E', topic: 'Logistics subcontractors', conf: 'none',
        qEn: 'How are outsourced service providers (transport, cleaning, pest control, external warehouses) selected, approved and evaluated?',
        flag: {
          reason: 'There is only indirect evidence: no indexed document describes the approval or periodic evaluation of logistics subcontractors.',
          partial: [
            { src: 'PR-PLA-005', q: 'External pest control service provided by a company registered in the ROESB', why: 'It covers a single service; hauliers, cleaning and external warehouses are missing.' }
          ],
          missing: ['Procedure for approving and evaluating logistics subcontractors', 'List of approved subcontractors and their last evaluation', 'Temperature and hygiene requirements in transport contracts']
        }
      },
      {
        id: 'E3', ref: 'IFS Log v3 · ch. 4', sec: 'E', topic: 'Glass and brittle plastics', conf: 'none',
        qEn: 'Do you keep a register of glass and brittle plastics on the premises and a procedure for breakages in areas with product?',
        flag: {
          reason: 'The glass and brittle plastics register and the breakage procedure are not among the {doc_count} indexed documents.',
          context: 'The distribution centre handles glass jars (for example, the own-brand tomato sauce) and there is an open complaint about glass: the auditor will pay attention to this requirement.',
          partial: [
            { src: 'PR-ALM-007', q: 'Damaged product is segregated in the non-conforming goods area and the spillage is cleaned up immediately.', why: 'It covers damaged goods, not the inventory of glass and plastics on the premises or the breakage protocol.' }
          ],
          missing: ['Inventory of glass and brittle plastics by area', 'Inspection frequency and records', 'Protocol for a breakage in an area with product']
        }
      }
    ]
  }
});
