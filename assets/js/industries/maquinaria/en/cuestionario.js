/* Hidromec Ebro · supplier audit questionnaire from Vehículos Industriales Arga (English). Synthetic data (MFM). */
agenticPackEn('maquinaria', {
  cuestionario: {
    agent: 'Customer questionnaires',
    lang: 'en',
    default_sel: 'D2',
    reviewer: 'Head of Quality',
    assignee: 'Operations Management',
    assignee_short: 'Operations Management',
    team: 'Quality',
    assign_due: '2026-10-06',
    responder: 'Hidromec Ebro, S.L. (Zaragoza Plant)',
    site: 'Zaragoza Plant (PLAZA)',
    site_label: 'Plant',
    page_title: 'Supplier audit · Vehículos Industriales Arga',
    report_title: 'Response to supplier audit questionnaire',
    discard_placeholder: 'For example: answered with the attached certificate',
    save_system: 'SAP S/4HANA',
    qn: {
      code: 'CUE-2026-027',
      title: 'Supplier Self-Assessment Questionnaire SQA-07 (2026)',
      customer: 'Vehículos Industriales Arga',
      via: 'Arga Supplier Quality',
      received: '2026-09-28T11:40',
      due: '2026-10-09',
      file: 'Arga_SQA-07_Autoevaluacion_proveedor_2026.xlsx',
      scope: 'GH-30 and GH-55 hydraulic power units supplied for Arga tipper bodies and loader cranes',
      scope_short: 'GH-30 · GH-55',
      scope_label: '2 series part numbers (GH-30 and GH-55)'
    },
    email: {
      mailbox: 'Quality mailbox',
      headers: {
        From: 'Supplier Quality, Vehículos Industriales Arga <sqa@arga-vi.example>',
        To: 'Quality, Hidromec Ebro <calidad@hidromec-ebro.example>',
        Date: 'Mon, 28 Sep 2026 11:40',
        Subject: 'SQA-07 · 2026 supplier self-assessment ahead of the on-site audit · reply by 9 October'
      },
      text: 'Good morning,\n\nAs part of our annual supplier evaluation plan, please find attached the SQA-07 self-assessment questionnaire ahead of the on-site audit planned for November. It covers the GH-30 and GH-55 hydraulic power units you supply for our tipper bodies and loader cranes.\n\nThere are 15 questions in five sections: management system, product and compliance, process and measurement, traceability and incidents, and continuity and sustainability.\n\nFor each answer, state the procedure, record or certificate that supports it. Answers without evidence are scored as non-compliant in the evaluation.\n\nWe need the completed questionnaire by Friday 9 October 2026.\n\nBest regards,\n\nSupplier Quality\nVehículos Industriales Arga',
      highlights: [
        { text: 'GH-30 and GH-55 hydraulic power units', label: 'Product', tone: 'brand' },
        { text: '15 questions', label: 'Questions', tone: 'brand' },
        { text: 'state the procedure, record or certificate that supports it', label: 'Requirement' },
        { text: 'Answers without evidence are scored as non-compliant', label: 'Criterion' },
        { text: 'Friday 9 October 2026', label: 'Deadline' }
      ]
    },
    sections: [
      { id: 'A', en: 'Management system and certifications' },
      { id: 'B', en: 'Product and compliance' },
      { id: 'C', en: 'Process control and measurement' },
      { id: 'D', en: 'Traceability and incidents' },
      { id: 'E', en: 'Continuity and sustainability' }
    ],
    kpi: { label: 'Audits in 2025', value: 20, sub: '14 internal and 6 customer audits · 0 major non-conformities · 2025 management review', icon: 'shield-check' },
    sources_sub: 'Manual, procedures, certificates and management review report',
    identify_result: 'Vehículos Industriales Arga · GH-30 and GH-55 · on-site audit in November',
    search_scope: 'quality manual, procedures, certificates and management review report',
    lookups: [
      { system: 'PLM Windchill', action: 'Reads the GH-55 technical file, PPAP and material compliance', result: 'ET-GH55 rev. 4 · PPAP level 3 approved on 03/03/2025 · 0 SVHC > 0.1%', ms: 540 },
      { system: 'GMAO Maximo', action: 'Checks the status of the calibration plan', result: '412 instruments · 409 in date · 3 overdue and locked out', ms: 380 },
      { system: 'MES Opcenter', action: 'Reads SPC for special characteristics and test bench BP-02', result: 'Cpk 1.58 and 1.71 · 64 GH-55 units 100% tested in September', ms: 520 },
      { system: 'SAP S/4HANA', action: 'Rebuilds the genealogy of a serial number shipped to Arga', result: 'GH55-26-0187: pump, valve block and seals by lot · delivery note 80045127', ms: 460 },
      { system: 'Salesforce Service', action: 'Looks for open complaints and field campaigns', result: '1 open complaint: oil leak on a PH-250 (seals JNT-2607-031)', ms: 360, tone: 'warn' },
      { system: 'IIoT Vibración', action: 'Cross-checks the questionnaire part numbers with today’s alarms', result: 'MC-04 in alarm since 03:40 · 42 cylinder heads from lot CUL-2609-118', ms: 340, tone: 'warn' }
    ],
    compare: {
      people: '2–3: Quality, Product Engineering and, depending on the question, Maintenance or Purchasing',
      systems: '6–8: email, the customer’s Excel file, SAP, Windchill, Maximo, Opcenter, certificate folder and procedures',
      steps: 'Find the evidence for each question, copy answers from previous self-assessments, ask Engineering and Maintenance for data and build the Excel file',
      time: '4–6 h of Quality work, spread over 3–4 days'
    },
    presenter: {
      before: [
        'Every OEM sends its self-assessment before auditing. In 2025 the plant had 6 customer audits and 14 internal ones: background work that eats up Quality’s hours.',
        'This one comes from Vehículos Industriales Arga: {total} questions on the GH-30 and GH-55 units, and the rule is strict: anything without evidence is scored as non-compliant.',
        'When you press the button, Agentic Platform searches the manual, procedures and certificates, plus the records in Windchill, Maximo, Opcenter, SAP and Salesforce, and drafts each answer with its source.'
      ],
      during: [
        '{drafted} of {total} have a cited draft, with document and section; every citation is checked against the source text. {flagged} are left unanswered: business continuity, carbon footprint and TISAX. No document, nothing invented.',
        'D2: besides answering, it flags an open complaint for a leak on a PH-250 with seals from lot JNT-2607-031, which is also fitted on 6 GH-55 units in the field. Today that depends on someone remembering.',
        'C2: it cross-checks the process control question with this morning’s alarm on MC-04. The questionnaire does not live in isolation from the rest of the plant.',
        'Nothing goes out without approval: bulk approval only for high-confidence answers; IATF and traceability are reviewed one by one.'
      ],
      next_during: 'Show D2 (citations and complaint warning) and E3 (no evidence). Then “Approve the {alta} high-confidence answers”, approve {media_ids} one by one and “Assign the {flagged} without a source”.'
    },
    sources: {
      'CERT-9001': {
        type: 'doc', kind: 'Certificate', code: 'CERT-ISO9001', title: 'ISO 9001:2015 certificate · Hidromec Ebro, S.L.', system: 'Procedimientos',
        org: 'ENAC-accredited certification body · certificate no. ES-QM-24-0381', date: '2024-03-14',
        sections: [
          { id: 'alc', heading: 'Scope', text: 'Design, manufacture, testing and after-sales service of hydraulic presses and hydraulic power units. Site: Zaragoza Plant (PLAZA).' },
          { id: 'vig', heading: 'Validity', text: 'Issued on 14/03/2024; valid until 13/03/2027. Surveillance audit of 11/03/2026 passed with no major non-conformities.' }
        ]
      },
      'CERT-14001': {
        type: 'doc', kind: 'Certificate', code: 'CERT-ISO14001', title: 'ISO 14001:2015 certificate · Hidromec Ebro, S.L.', system: 'Procedimientos',
        org: 'ENAC-accredited certification body · certificate no. ES-EM-24-0382', date: '2024-03-14',
        sections: [
          { id: 'alc', heading: 'Scope', text: 'Manufacture of hydraulic presses and power units at the Zaragoza Plant.' },
          { id: 'vig', heading: 'Validity', text: 'Issued on 14/03/2024; valid until 13/03/2027.' }
        ]
      },
      'MAN-CAL-001': {
        type: 'doc', kind: 'Manual', code: 'MAN-CAL-001', title: 'Quality management system manual', system: 'Procedimientos', version: '9', date: '2026-01-15', owner: 'Head of Quality',
        org: 'Hidromec Ebro · Quality',
        sections: [
          { id: '2', heading: '2. Scope and certifications', page: 4, text: 'The quality management system is certified to ISO 9001:2015 and the environmental management system to ISO 14001:2015. The organisation is not certified to IATF 16949; it applies the core tools for automotive and commercial vehicle customers.' },
          { id: '5', heading: '5. Quality planning', page: 7, text: 'For new or modified products, APQP, design and process FMEA, control plan, MSA, SPC and PPAP are applied in accordance with the AIAG manual (4th edition).' },
          { id: '6', heading: '6. Customer-specific requirements', page: 8, text: 'Each customer’s specific requirements (CSR) are recorded in SAP S/4HANA and reviewed at every quotation and every customer revision change.' }
        ]
      },
      'PR-CAL-012': {
        type: 'doc', kind: 'Procedure', code: 'PR-CAL-012', title: 'Internal audits', system: 'Procedimientos', version: '5', date: '2025-06-02', owner: 'Head of Quality',
        sections: [
          { id: '4', heading: '4. Audit programme', page: 2, text: 'The annual programme covers every process in the system; each production line receives at least one process audit a year, using a questionnaire based on VDA 6.3.' },
          { id: '6', heading: '6. Auditors', page: 3, text: 'Internal auditors are qualified and do not audit their own work.' }
        ]
      },
      'INF-RD-2025': {
        type: 'doc', kind: 'Report', code: 'INF-RD-2025', title: '2025 management review report', system: 'Procedimientos', date: '2026-02-20', owner: 'General Management',
        sections: [
          { id: '3', heading: '3. Audits', page: 4, text: 'In 2025, 14 internal audits (system, process and product) and 6 customer audits were carried out, with 9 minor non-conformities, all closed on time, and no major ones.' },
          { id: '4', heading: '4. Customer indicators', page: 5, text: 'On-time delivery: 96.8%. Supply quality: 182 ppm. Customer complaints in 2025: 12, all with a closed 8D.' },
          { id: '7', heading: '7. Environment', page: 9, text: 'Electricity consumption in 2025: 4,210 MWh, 38% from renewable sources with guarantees of origin. The product carbon footprint has not yet been calculated.' }
        ]
      },
      'PR-ING-003': {
        type: 'doc', kind: 'Procedure', code: 'PR-ING-003', title: 'CE marking and technical file', system: 'Procedimientos', version: '4', date: '2026-03-10', owner: 'Head of Product Engineering',
        sections: [
          { id: '3', heading: '3. Product classification', page: 2, text: 'PH presses are placed on the market as machinery, with an EU declaration of conformity and CE marking. GH hydraulic power units are supplied as partly completed machinery, with a declaration of incorporation (Annex II.1.B of Directive 2006/42/EC) and assembly instructions (Annex VI).' },
          { id: '5', heading: '5. Technical file', page: 3, text: 'The technical file for each model is kept in PLM Windchill for at least 10 years after the last unit is manufactured.' },
          { id: '8', heading: '8. Regulation (EU) 2023/1230', page: 5, text: 'The transition plan for Regulation (EU) 2023/1230, applicable from 20/01/2027, covers the review of technical files, instructions in digital format and the new declaration of incorporation; it is followed up quarterly by the product committee.' }
        ]
      },
      'PR-CAL-015': {
        type: 'doc', kind: 'Procedure', code: 'PR-CAL-015', title: 'Control of inspection, measuring and test equipment', system: 'Procedimientos', version: '6', date: '2025-11-04', owner: 'Head of Quality',
        sections: [
          { id: '4', heading: '4. Calibration', page: 2, text: 'Measuring equipment is calibrated by ENAC-accredited laboratories to ISO/IEC 17025, with traceability to national standards, at the intervals set in the calibration plan in GMAO Maximo.' },
          { id: '6', heading: '6. Out-of-tolerance equipment', page: 3, text: 'Overdue or out-of-tolerance equipment is locked out in Maximo and the product measured since the last good calibration is assessed.' },
          { id: '7', heading: '7. Measurement system analysis', page: 4, text: 'R&R criterion: up to 10% acceptable; from 10% to 30%, acceptable subject to Quality approval; above 30%, not acceptable.' }
        ]
      },
      'PR-CAL-004': {
        type: 'doc', kind: 'Procedure', code: 'PR-CAL-004', title: 'Non-conformities', system: 'Procedimientos', owner: 'Head of Quality',
        sections: [
          { id: '4', heading: '4. Handling', page: 2, text: 'Every non-conformity is recorded in SAP S/4HANA (QM), with immediate containment of suspect product and a disposition decision by Quality.' }
        ]
      },
      'PR-CAL-008': {
        type: 'doc', kind: 'Procedure', code: 'PR-CAL-008', title: '8D methodology', system: 'Procedimientos', owner: 'Head of Quality',
        sections: [
          { id: '3', heading: '3. Deadlines', page: 2, text: 'Acknowledgement to the customer within 24 h, containment actions (D3) within 48 h and a complete 8D report within 10 working days, unless a different deadline is agreed with the customer.' },
          { id: '5', heading: '5. Root cause and effectiveness', page: 3, text: 'Root cause is analysed with 5 Whys and Ishikawa, separating occurrence and non-detection causes, and the effectiveness of the actions is verified after 90 days.' }
        ]
      },
      'PR-POS-005': {
        type: 'doc', kind: 'Procedure', code: 'PR-POS-005', title: 'Field campaigns', system: 'Procedimientos', owner: 'Head of After-Sales',
        sections: [
          { id: '4', heading: '4. Scope of a campaign', page: 2, text: 'The scope is determined by serial number from the genealogy in SAP S/4HANA and MES Opcenter: component lot, units fitted, customers and countries. Target: identify all affected units and customers within 4 h.' }
        ]
      },
      'PR-ING-007': {
        type: 'doc', kind: 'Procedure', code: 'PR-ING-007', title: 'Product and process change management', system: 'Procedimientos', version: '3', owner: 'Head of Product Engineering',
        sections: [
          { id: '3', heading: '3. Changes requiring customer approval', page: 2, text: 'Changes to design, process, manufacturing location or the supplier of a component with a special characteristic are notified to the customer before implementation and are not shipped until the corresponding PPAP is approved.' },
          { id: '4', heading: '4. Records', page: 3, text: 'Each change is managed as an engineering change notice (ECN) in PLM Windchill, with an impact analysis on the FMEA and control plan.' }
        ]
      },
      'WCH-ET-GH55': {
        type: 'record', kind: 'Technical file', code: 'ET-GH55', title: 'GH-55 hydraulic power unit · technical file (rev. 4)', system: 'PLM Windchill',
        org: 'PLM Windchill · technical files',
        sections: [
          { id: 'normas', heading: 'Standards applied', list: ['UNE-EN ISO 4413:2011 · Hydraulic fluid power. General rules and safety requirements', 'UNE-EN ISO 12100:2012 · Risk assessment and risk reduction', 'UNE-EN 60204-1:2019 · Electrical equipment of machines', 'UNE-EN ISO 13849-1:2016 · Safety-related parts of control systems (PL c on the emergency pressure release)'] },
          { id: 'doc', heading: 'Delivery documentation', text: 'Declaration of incorporation DI-GH55-2026 and assembly instructions IM-GH55 rev. 3 in Spanish, English and French.' }
        ]
      },
      'WCH-PPAP': {
        type: 'record', kind: 'PPAP', code: 'PPAP-GH55-C', title: 'GH-55 · PPAP level 3 for Vehículos Industriales Arga', system: 'PLM Windchill',
        org: 'PLM Windchill · part approvals',
        sections: [
          { id: 'env', heading: 'Submission', text: 'PPAP level 3 for the GH-55 (revision C) submitted to Vehículos Industriales Arga on 12/02/2025; PSW approved on 03/03/2025.' },
          { id: 'cont', heading: 'Elements included', list: ['Design records and engineering changes', 'Design FMEA and process FMEA', 'Process flow diagram and control plan', 'R&R study of the valve seat gauge: 8.4%', 'Initial capability: Ppk 1.92 on the valve seat diameter', 'Dimensional, material and functional test results'] }
        ]
      },
      'WCH-CMP': {
        type: 'record', kind: 'Material compliance', code: 'CMP-GH55', title: 'GH-55 · REACH and RoHS compliance', system: 'PLM Windchill',
        org: 'PLM Windchill · material compliance',
        sections: [
          { id: 'reach', heading: 'REACH', text: 'Bill of materials checked against the ECHA Candidate List (June 2026 update): no article contains SVHCs above 0.1% by weight.' },
          { id: 'scip', heading: 'SCIP', text: 'No notification to the SCIP database is required: there are no SVHCs above the threshold.' },
          { id: 'rohs', heading: 'RoHS', text: 'The GH-55 electrical cabinet complies with Directive 2011/65/EU; declarations from the electronic component suppliers are on file.' }
        ]
      },
      'MAX-CAL': {
        type: 'record', kind: 'Calibration plan', code: 'Calibration plan 2026', title: 'Measuring equipment · calibration status', system: 'GMAO Maximo',
        org: 'GMAO Maximo · calibrations',
        sections: [
          { id: 'est', heading: 'Status at 29/09/2026', list: ['412 instruments in the calibration plan', '409 with valid calibration', '3 overdue, locked out and withdrawn from use until calibrated', '0 instruments used with an overdue calibration in the last 12 months'] }
        ]
      },
      'MAX-REP': {
        type: 'record', kind: 'Critical spares', code: 'Critical spares', title: 'Machining centres · critical spare parts', system: 'GMAO Maximo',
        org: 'GMAO Maximo · spare parts store',
        sections: [
          { id: 'rep', heading: 'Critical spares', text: 'Spare spindle for the DMU 65 in stock; estimated replacement time: 36 h.' }
        ]
      },
      'OPC-SPC': {
        type: 'record', kind: 'Statistical process control', code: 'SPC · GH-55', title: 'GH-55 · statistical control of special characteristics', system: 'MES Opcenter',
        org: 'MES Opcenter · SPC',
        sections: [
          { id: 'cc', heading: 'Special characteristics', list: ['Relief valve seat diameter (CC) · Cpk 1.58 over the last 125 parts', 'Pump flange tightening torque (SC) · Cpk 1.71 over the last 125 parts', 'Safety valve set pressure (CC) · 100% checked on the test bench'] },
          { id: 'reg', heading: 'Reaction rule', text: 'Point outside the control limits: stop, contain the lot and alert Quality in Opcenter.' }
        ]
      },
      'OPC-BP': {
        type: 'record', kind: 'End-of-line test', code: 'BP-02', title: 'Test bench BP-02 · end-of-line test of hydraulic power units', system: 'MES Opcenter',
        org: 'MES Opcenter · test bench',
        sections: [
          { id: 'prot', heading: 'Test protocol', list: ['Safety valve set to nominal pressure ±3%', 'Leak test at 1.1 times the maximum working pressure for 10 min, with no leaks', 'Flow, pressure, noise and oil temperature recorded by serial number', 'Oil cleanliness: ISO 4406 code 18/16/13 or better'] },
          { id: 'res', heading: 'September 2026 results', text: 'GH-55: 64 units 100% tested; 63 right first time and 1 reworked (leaking fitting) and compliant at the second test.' }
        ]
      },
      'SAP-SERIE': {
        type: 'record', kind: 'Serial number genealogy', code: 'GH55-26-0187', title: 'Hydraulic power unit GH55-26-0187 · genealogy', system: 'SAP S/4HANA',
        org: 'SAP S/4HANA · serial number genealogy',
        sections: [
          { id: 'gen', heading: 'Components', text: 'GH55-26-0187: gear pump from lot BMB-2607-044, valve block from lot BLQ-2607-019, seals from lot JNT-2606-017 and assembly MON-2608-05.' },
          { id: 'exp', heading: 'Test and shipment', text: 'End-of-line test on BP-02 on 12/08/2026; shipped to Vehículos Industriales Arga on 14/08/2026 with delivery note 80045127.' }
        ]
      },
      'SF-RCL': {
        type: 'record', kind: 'Complaints', code: 'Complaints 12 months', title: 'Customer complaints · last 12 months', system: 'Salesforce Service',
        org: 'Salesforce Service · customer cases',
        sections: [
          { id: 'res', heading: 'Summary', text: '11 customer complaints in the last 12 months: 10 closed with an 8D and effectiveness check; 1 open (oil leak on a PH-250 at Prensas y Servicios del Norte).' },
          { id: 'arga', heading: 'Vehículos Industriales Arga', text: 'Complaints from Vehículos Industriales Arga in the last 12 months: 1 (pressure switch connector wrongly oriented), with the 8D closed on 21/11/2025.' }
        ]
      }
    },
    questions: [
      {
        id: 'A1', ref: 'SQA-07 1.1', sec: 'A', topic: 'Management system certifications', conf: 'alta',
        qEn: 'List the current management system certifications (ISO 9001, ISO 14001, IATF 16949 or others) of the supplying site, with scope and expiry date.',
        en: 'The Zaragoza Plant is certified to ISO 9001:2015 for the design, manufacture, testing and after-sales service of hydraulic presses and power units [1]; the certificate is valid until 13/03/2027 and the surveillance audit of 11/03/2026 was passed with no major non-conformities [2]. The environmental management system is certified to ISO 14001:2015, also valid until 13/03/2027 [3]. The organisation is not certified to IATF 16949 [4]. Copies of both certificates are attached.',
        cites: [
          { src: 'CERT-9001', q: 'Design, manufacture, testing and after-sales service of hydraulic presses and hydraulic power units' },
          { src: 'CERT-9001', q: 'valid until 13/03/2027. Surveillance audit of 11/03/2026 passed with no major non-conformities' },
          { src: 'CERT-14001', q: 'Issued on 14/03/2024; valid until 13/03/2027.' },
          { src: 'MAN-CAL-001', q: 'The organisation is not certified to IATF 16949' }
        ]
      },
      {
        id: 'A2', ref: 'SQA-07 1.2', sec: 'A', topic: 'IATF 16949 and core tools', conf: 'media',
        qEn: 'If you are not certified to IATF 16949, do you apply the core tools (APQP, FMEA, control plan, MSA, SPC, PPAP) and customer-specific requirements? Do you have a target certification date?',
        en: 'Yes. Although we are not certified to IATF 16949, for new or modified products we apply APQP, design and process FMEA, control plan, MSA, SPC and PPAP in accordance with the AIAG manual (4th edition) [1]. Each customer’s specific requirements are recorded in SAP S/4HANA and reviewed at every quotation and every revision change [2]. The GH-55 we supply to Arga has an approved PPAP level 3 (PSW of 03/03/2025) [3].',
        cites: [
          { src: 'MAN-CAL-001', q: 'APQP, design and process FMEA, control plan, MSA, SPC and PPAP are applied in accordance with the AIAG manual (4th edition)' },
          { src: 'MAN-CAL-001', q: 'Each customer’s specific requirements (CSR) are recorded in SAP S/4HANA and reviewed at every quotation and every customer revision change' },
          { src: 'WCH-PPAP', q: 'PSW approved on 03/03/2025' }
        ],
        gap: 'The customer asks for the target IATF 16949 certification date, and there is no gap analysis or management decision in the indexed sources. Confirm it with Management before sending, or state that there is no target date.'
      },
      {
        id: 'A3', ref: 'SQA-07 1.3', sec: 'A', topic: 'Internal and process audits', conf: 'alta',
        qEn: 'Describe your internal audit programme (system, process and product). How many audits and non-conformities did you have last year?',
        en: 'The annual programme covers every process in the system and each production line receives at least one process audit a year, using a questionnaire based on VDA 6.3 [1]; auditors are qualified and do not audit their own work [2]. In 2025 there were 14 internal audits and 6 customer audits, with 9 minor non-conformities, all closed on time, and no major ones [3].',
        cites: [
          { src: 'PR-CAL-012', q: 'each production line receives at least one process audit a year, using a questionnaire based on VDA 6.3' },
          { src: 'PR-CAL-012', q: 'Internal auditors are qualified and do not audit their own work.' },
          { src: 'INF-RD-2025', q: 'In 2025, 14 internal audits (system, process and product) and 6 customer audits were carried out, with 9 minor non-conformities, all closed on time, and no major ones.' }
        ]
      },
      {
        id: 'B1', ref: 'SQA-07 2.1', sec: 'B', topic: 'CE marking and Regulation (EU) 2023/1230', conf: 'alta',
        qEn: 'Under what legal status are the hydraulic power units supplied (machinery or partly completed machinery), and what documentation accompanies each delivery? How are you preparing for the Machinery Regulation (EU) 2023/1230?',
        en: 'GH hydraulic power units are supplied as partly completed machinery, with a declaration of incorporation (Annex II.1.B of Directive 2006/42/EC) and assembly instructions (Annex VI) [1]. For the GH-55 we supply declaration DI-GH55-2026 and instructions IM-GH55 rev. 3 in Spanish, English and French [2], and the technical file is kept in PLM Windchill for at least 10 years after the last unit is manufactured [3]. The transition plan for Regulation (EU) 2023/1230, applicable from 20/01/2027, reviews technical files, digital instructions and the new declaration of incorporation, with quarterly follow-up [4].',
        cites: [
          { src: 'PR-ING-003', q: 'GH hydraulic power units are supplied as partly completed machinery, with a declaration of incorporation (Annex II.1.B of Directive 2006/42/EC) and assembly instructions (Annex VI)' },
          { src: 'WCH-ET-GH55', q: 'Declaration of incorporation DI-GH55-2026 and assembly instructions IM-GH55 rev. 3 in Spanish, English and French.' },
          { src: 'PR-ING-003', q: 'The technical file for each model is kept in PLM Windchill for at least 10 years after the last unit is manufactured.' },
          { src: 'PR-ING-003', q: 'The transition plan for Regulation (EU) 2023/1230, applicable from 20/01/2027, covers the review of technical files, instructions in digital format and the new declaration of incorporation' }
        ]
      },
      {
        id: 'B2', ref: 'SQA-07 2.2', sec: 'B', topic: 'PPAP level 3', conf: 'alta',
        qEn: 'Can you submit a level 3 PPAP for the part numbers supplied? State the current approval date and the capability and measurement system studies included.',
        en: 'Yes. The level 3 PPAP for the GH-55 (revision C) was submitted to Vehículos Industriales Arga on 12/02/2025 and the PSW was approved on 03/03/2025 [1]. It includes design and process FMEA, the process flow diagram and control plan [2], an R&R study of the valve seat gauge of 8.4% [3] and an initial capability Ppk of 1.92 on the valve seat diameter [4]. PPAPs are prepared in accordance with the AIAG manual (4th edition) [5].',
        cites: [
          { src: 'WCH-PPAP', q: 'PPAP level 3 for the GH-55 (revision C) submitted to Vehículos Industriales Arga on 12/02/2025; PSW approved on 03/03/2025.' },
          { src: 'WCH-PPAP', q: 'Process flow diagram and control plan' },
          { src: 'WCH-PPAP', q: 'R&R study of the valve seat gauge: 8.4%' },
          { src: 'WCH-PPAP', q: 'Initial capability: Ppk 1.92 on the valve seat diameter' },
          { src: 'MAN-CAL-001', q: 'PPAP are applied in accordance with the AIAG manual (4th edition)' }
        ],
        note: { tone: 'brand', icon: 'info', title: 'Only the GH-55 has a PPAP in Windchill', text: 'Windchill holds the GH-55 PPAP; the GH-30 PPAP does not appear in the records consulted. If Arga asks for both part numbers, Quality must confirm whether the GH-30 was approved before PPAP was required.' }
      },
      {
        id: 'B3', ref: 'SQA-07 2.3', sec: 'B', topic: 'REACH, SCIP and RoHS', conf: 'alta',
        qEn: 'Do your products contain substances on the REACH Candidate List (SVHC) above 0.1% by weight? Have you notified SCIP? Do the electrical components comply with RoHS?',
        en: 'No. The GH-55 bill of materials has been checked against the ECHA Candidate List (June 2026 update) and no article contains SVHCs above 0.1% by weight [1], so no SCIP notification is required [2]. The electrical cabinet complies with Directive 2011/65/EU (RoHS) and the declarations from the electronic component suppliers are on file [3].',
        cites: [
          { src: 'WCH-CMP', q: 'no article contains SVHCs above 0.1% by weight' },
          { src: 'WCH-CMP', q: 'No notification to the SCIP database is required' },
          { src: 'WCH-CMP', q: 'The GH-55 electrical cabinet complies with Directive 2011/65/EU; declarations from the electronic component suppliers are on file.' }
        ]
      },
      {
        id: 'C1', ref: 'SQA-07 3.1', sec: 'C', topic: 'Calibration of measuring equipment', conf: 'alta',
        qEn: 'How do you ensure the calibration and metrological traceability of measuring equipment? What do you do if an instrument is found out of tolerance?',
        en: 'Instruments are calibrated by ENAC-accredited laboratories to ISO/IEC 17025, with traceability to national standards and at the intervals of the plan in GMAO Maximo [1]. There are currently 412 instruments in the plan [2], 409 with valid calibration [3] and 3 overdue, locked out and withdrawn from use [4]. If an instrument is overdue or out of tolerance it is locked out and the product measured since the last good calibration is assessed [5].',
        cites: [
          { src: 'PR-CAL-015', q: 'Measuring equipment is calibrated by ENAC-accredited laboratories to ISO/IEC 17025, with traceability to national standards' },
          { src: 'MAX-CAL', q: '412 instruments in the calibration plan' },
          { src: 'MAX-CAL', q: '409 with valid calibration' },
          { src: 'MAX-CAL', q: '3 overdue, locked out and withdrawn from use until calibrated' },
          { src: 'PR-CAL-015', q: 'Overdue or out-of-tolerance equipment is locked out in Maximo and the product measured since the last good calibration is assessed.' }
        ]
      },
      {
        id: 'C2', ref: 'SQA-07 3.2', sec: 'C', topic: 'SPC and measurement system analysis', conf: 'alta',
        qEn: 'How do you control special characteristics (CC/SC)? State the current capability and the acceptance criterion for R&R studies.',
        en: 'The special characteristics of the GH-55 are controlled with SPC in MES Opcenter: the relief valve seat diameter has a Cpk of 1.58 [1] and the pump flange tightening torque a Cpk of 1.71 [2], and the safety valve set pressure is 100% checked on the test bench [3]. A point outside the limits means stopping, containing the lot and alerting Quality [4]. For R&R we accept up to 10%; between 10% and 30% only with Quality approval [5].',
        cites: [
          { src: 'OPC-SPC', q: 'Relief valve seat diameter (CC) · Cpk 1.58 over the last 125 parts' },
          { src: 'OPC-SPC', q: 'Pump flange tightening torque (SC) · Cpk 1.71 over the last 125 parts' },
          { src: 'OPC-SPC', q: 'Safety valve set pressure (CC) · 100% checked on the test bench' },
          { src: 'OPC-SPC', q: 'Point outside the control limits: stop, contain the lot and alert Quality in Opcenter.' },
          { src: 'PR-CAL-015', q: 'R&R criterion: up to 10% acceptable; from 10% to 30%, acceptable subject to Quality approval' }
        ],
        note: {
          tone: 'warn', icon: 'activity', title: 'Today’s alarm on machining centre MC-04',
          text: 'Since 03:40 the MC-04 spindle has been vibrating at 7.8 mm/s RMS (limit 4.5 mm/s, ISO 10816-3 zone D), and 42 cylinder heads from lot [[lot:CUL-2609-118]] were machined in that window. They are not GH-30 or GH-55 components; the answer describes the control system, not today’s case.',
          outcome: 'alarma', with: { approved: 'In the alarm: {label}.', any: 'In the alarm, the agent’s proposal was rejected.' },
          without: 'The decision on those parts is taken in the alarm scene.',
          go: 'alarma', goLabel: 'Open the alarm'
        }
      },
      {
        id: 'C3', ref: 'SQA-07 3.3', sec: 'C', topic: '100% end-of-line test', conf: 'alta',
        qEn: 'Is every unit tested before shipment? Describe the test parameters, the acceptance criterion and how results are recorded.',
        en: 'Yes. Every hydraulic power unit is tested on bench BP-02: safety valve set to nominal pressure ±3% [1], leak test at 1.1 times the maximum working pressure for 10 min with no leaks [2] and oil cleanliness to ISO 4406 code 18/16/13 or better [3]. Flow, pressure, noise and oil temperature are recorded by serial number [4]. In September 2026, 64 GH-55 units were 100% tested: 63 right first time and 1 reworked and compliant at the second test [5]. The design applies UNE-EN ISO 4413 [6].',
        cites: [
          { src: 'OPC-BP', q: 'Safety valve set to nominal pressure ±3%' },
          { src: 'OPC-BP', q: 'Leak test at 1.1 times the maximum working pressure for 10 min, with no leaks' },
          { src: 'OPC-BP', q: 'Oil cleanliness: ISO 4406 code 18/16/13 or better' },
          { src: 'OPC-BP', q: 'Flow, pressure, noise and oil temperature recorded by serial number' },
          { src: 'OPC-BP', q: 'GH-55: 64 units 100% tested; 63 right first time and 1 reworked (leaking fitting) and compliant at the second test.' },
          { src: 'WCH-ET-GH55', q: 'UNE-EN ISO 4413:2011 · Hydraulic fluid power. General rules and safety requirements' }
        ]
      },
      {
        id: 'D1', ref: 'SQA-07 4.1', sec: 'D', topic: 'Serial number traceability', conf: 'media',
        qEn: 'Can you trace each unit by serial number to its component lots and, conversely, from a component lot to the affected units and customers? State the target time and the result of the last mock exercise.',
        en: 'Yes. Each unit is linked in SAP S/4HANA to its component lots; for example, GH55-26-0187 has a pump from lot BMB-2607-044, a valve block from lot BLQ-2607-019 and seals from lot JNT-2606-017 [1], and it was tested on 12/08/2026 and shipped to Arga on 14/08/2026 with delivery note 80045127 [2]. Conversely, the scope of a campaign is determined by serial number from the SAP and Opcenter genealogy, with the target of identifying all affected units and customers within 4 h [3].',
        cites: [
          { src: 'SAP-SERIE', q: 'GH55-26-0187: gear pump from lot BMB-2607-044, valve block from lot BLQ-2607-019, seals from lot JNT-2606-017' },
          { src: 'SAP-SERIE', q: 'End-of-line test on BP-02 on 12/08/2026; shipped to Vehículos Industriales Arga on 14/08/2026 with delivery note 80045127.' },
          { src: 'PR-POS-005', q: 'Target: identify all affected units and customers within 4 h.' }
        ],
        gap: 'The date and result of the last mock field campaign are not in the indexed sources.',
        gapGo: 'retirada', gapGoLabel: 'Run a mock exercise now', gapOutcome: 'retirada',
        gapOutcomeText: 'There is already a mock exercise in this session: {label}. Add it to the answer if appropriate.'
      },
      {
        id: 'D2', ref: 'SQA-07 4.2', sec: 'D', topic: 'Non-conformities and 8D', conf: 'alta',
        qEn: 'Describe how non-conformities and complaints are handled: response times, root cause analysis method and effectiveness verification. How many complaints from Arga did you have in the last 12 months?',
        en: 'Every non-conformity is recorded in SAP S/4HANA (QM), with immediate containment of suspect product and a disposition decision by Quality [1]. For a complaint we send an acknowledgement within 24 h, containment (D3) within 48 h and a complete 8D report within 10 working days, unless another deadline is agreed [2]. Root cause is analysed with 5 Whys and Ishikawa, separating occurrence and non-detection, and effectiveness is verified after 90 days [3]. In the last 12 months we have received 1 complaint from Arga, with the 8D closed on 21/11/2025 [4].',
        cites: [
          { src: 'PR-CAL-004', q: 'Every non-conformity is recorded in SAP S/4HANA (QM), with immediate containment of suspect product and a disposition decision by Quality.' },
          { src: 'PR-CAL-008', q: 'Acknowledgement to the customer within 24 h, containment actions (D3) within 48 h and a complete 8D report within 10 working days' },
          { src: 'PR-CAL-008', q: 'Root cause is analysed with 5 Whys and Ishikawa, separating occurrence and non-detection causes, and the effectiveness of the actions is verified after 90 days.' },
          { src: 'SF-RCL', q: 'Complaints from Vehículos Industriales Arga in the last 12 months: 1 (pressure switch connector wrongly oriented), with the 8D closed on 21/11/2025.' }
        ],
        note: {
          tone: 'warn', icon: 'link', title: 'Open complaint {rec_code} · shared component',
          text: 'Prensas y Servicios del Norte has an open complaint about an oil leak on PH-250 serial number PH250-26-0412; the cylinder seal is from lot [[lot:JNT-2607-031]] from Sellados Ibéricos, which is also fitted on 6 GH-55 units in the field. According to the genealogy, none of those 6 units was shipped to Arga; check that this answer is consistent with the 8D report before sending it.',
          outcome: 'reclamacion', tone_done: 'brand', with: { any: 'Complaint status: {label}.' },
          go: 'reclamacion', goLabel: 'Open the complaint'
        }
      },
      {
        id: 'D3', ref: 'SQA-07 4.3', sec: 'D', topic: 'Change management (PCN)', conf: 'alta',
        qEn: 'Do you notify the customer of changes to product, process, manufacturing location or supplier before implementing them? How are they managed?',
        en: 'Yes. Changes to design, process, manufacturing location or the supplier of a component with a special characteristic are notified to the customer before implementation and are not shipped until the corresponding PPAP is approved [1]. Each change is managed as an engineering change notice (ECN) in PLM Windchill, with an impact analysis on the FMEA and control plan [2].',
        cites: [
          { src: 'PR-ING-007', q: 'Changes to design, process, manufacturing location or the supplier of a component with a special characteristic are notified to the customer before implementation and are not shipped until the corresponding PPAP is approved.' },
          { src: 'PR-ING-007', q: 'Each change is managed as an engineering change notice (ECN) in PLM Windchill, with an impact analysis on the FMEA and control plan.' }
        ]
      },
      {
        id: 'E1', ref: 'SQA-07 5.1', sec: 'E', topic: 'Business continuity plan', conf: 'none',
        qEn: 'Do you have a business continuity plan covering the loss of critical machines, single-source suppliers and systems? State the committed recovery time and the date of the last test.',
        flag: {
          reason: 'None of the {doc_count} indexed documents describes a business continuity plan or a business impact analysis (BIA).',
          partial: [
            { src: 'MAX-REP', q: 'Spare spindle for the DMU 65 in stock; estimated replacement time: 36 h.', why: 'It covers part of the machine risk; it is not a continuity plan and does not set a recovery time for supply.' }
          ],
          missing: ['Business continuity plan and business impact analysis (BIA)', 'Alternative sources for critical components (pumps, valve blocks, seals)', 'Committed recovery time objective (RTO) for supply to Arga', 'Date and result of the last test of the plan']
        }
      },
      {
        id: 'E2', ref: 'SQA-07 5.2', sec: 'E', topic: 'Carbon footprint', conf: 'none',
        qEn: 'State your scope 1, 2 and 3 greenhouse gas emissions, the carbon footprint of the products supplied and your reduction targets.',
        flag: {
          reason: 'There is only indirect evidence: the management review report states that the product carbon footprint has not been calculated, and no document contains an emissions inventory.',
          partial: [
            { src: 'INF-RD-2025', q: 'Electricity consumption in 2025: 4,210 MWh, 38% from renewable sources with guarantees of origin.', why: 'This is an energy figure, not a scope 1, 2 and 3 emissions inventory.' },
            { src: 'CERT-14001', q: 'Manufacture of hydraulic presses and power units at the Zaragoza Plant.', why: 'ISO 14001 does not require a carbon footprint calculation.' }
          ],
          missing: ['Scope 1, 2 and 3 emissions inventory (GHG Protocol)', 'Product carbon footprint of the GH-30 and GH-55 (ISO 14067)', 'Reduction targets and their validation (for example, SBTi)']
        }
      },
      {
        id: 'E3', ref: 'SQA-07 5.3', sec: 'E', topic: 'Information security (TISAX)', conf: 'none',
        qEn: 'Do you hold a current TISAX assessment? State the assessment level, the label and how you protect the drawings and data provided by Arga.',
        flag: {
          reason: 'None of the {doc_count} indexed documents covers information security or a TISAX assessment.',
          context: 'Arga will exchange chassis drawings through its supplier portal, which is why it asks. Agentic Platform does not assume an assessment exists or describe measures that are not documented.',
          partial: [],
          missing: ['TISAX assessment: level (AL2 or AL3), label and expiry date', 'Information security policy', 'Measures to protect customer drawings in PLM Windchill']
        }
      }
    ]
  }
});
