/* Hidromec Ebro · procedure Q&A with citations (English). Fictitious documents, consistent with HISTORIAS.md. */
agenticPackEn('maquinaria', {
  procedimientos: {
    section: 'Calidad',
    nav: 'Procedures',
    title: 'Ask the procedures',
    agent: 'Procedures',
    system: 'PLM Windchill',
    source: 'PLM Windchill · controlled documents of the management system',
    indexed_at: '2026-09-29T06:00',
    doc_org: 'Hidromec Ebro · Management system',
    ui: {
      page_title: 'Plant procedure search',
      intro_title: 'Ask about the procedures of the Zaragoza plant',
      intro_text: 'Maintenance, quality, safety and after-sales. Every sentence of the answer cites the document and the section it comes from. If no indexed document covers it, the search says so and does not answer.',
      placeholder: 'Type a question about the plant procedures',
      context_title: 'Applied to the Zaragoza plant today',
      permission: 'Quality and Maintenance · PLAZA',
      asker_initials: 'QT',
      asker_role: 'Shift Quality Technician',
      route_to: 'Quality Manager'
    },
    report: { title: 'Plant procedure search', code_prefix: 'CON-PROC', filename: 'procedure-search', scope_label: 'Plant', scope: 'Zaragoza (PLAZA)' },
    presenter: {
      say: [
        'Search of the plant procedures: the answer comes only from the controlled documents in PLM Windchill, and every sentence carries its citation to the document and section.',
        'Six documents are indexed: vibration monitoring, spindle replacement, nonconformities, 8D methodology, LOTO lockout and field campaigns. Here they are synthetic; in the pilot, your own current versions.'
      ],
      say_empty: 'Useful in customer and ISO 9001 audits, for training new operators and technicians, and for answering a customer with the exact reference.',
      say_answered: 'Clicking a citation opens the document with the exact passage highlighted. And the answer is cross-checked with what is happening on the shop floor today: the MC-04 vibration, the PH-250 complaint or the campaign for seals JNT-2607-031.',
      say_none: 'When there is no source it says so and invents nothing: no answer and no citation. If the topic is in a document that is not indexed, it names it (PR-COM-002) and lets you route the question to Quality.',
      next_empty: 'Click “What must be done if spindle vibration enters zone D?” and then citation 1 to see the highlighted passage.',
      next_answered: 'Type a question with no source, for example “How often are the vernier callipers calibrated?”, and click “Ask”.',
      next_done: 'Move on to the next scene with the right arrow.'
    },

    docs: [
      {
        code: 'PR-MAN-011',
        title: 'Vibration monitoring of machine tools',
        short: 'Vibration monitoring',
        type: 'Procedure',
        version: '3',
        date: '2026-02-16',
        owner: 'Maintenance',
        summary: 'Spindle vibration in zone D (above 4.5 mm/s RMS, ISO 10816-3) for more than 30 min (critical failure from 7.1 mm/s): machine stop, work order in GMAO Maximo, block in SAP QM of the parts machined in the exposure window and 100 % metrology.',
        sections: [
          { id: '1', heading: '1. Purpose and scope', text: [
            'Detect early the deterioration of spindles and bearings in the machine tools of the Zaragoza plant through continuous vibration monitoring, to prevent breakdowns and out-of-tolerance parts.',
            'Applies to machining centres MC-01 to MC-06 and lathes TR-01 to TR-03, all fitted with vibration sensors on the headstock connected to IIoT Vibración.'
          ] },
          { id: '2', heading: '2. Definitions', list: [
            'Vibration velocity: root mean square (RMS) value in mm/s, in the 10 to 1,000 Hz band, measured at the housing of the spindle front bearing.',
            'Severity zones according to ISO 10816-3 (group 2 machines, rigid mounting): zone A up to 1.4 mm/s; zone B up to 2.8 mm/s; zone C up to 4.5 mm/s; zone D above 4.5 mm/s.',
            'Baseline: mean value of the machine over the four weeks following its last spindle overhaul.',
            'Exposure window: period from the moment vibration exceeds 4.5 mm/s until the machine is stopped.'
          ] },
          { id: '3', heading: '3. Responsibilities', list: [
            'Maintenance Manager: assesses the alarm, decides on the stop and approves the work order in GMAO Maximo.',
            'Shift Quality Technician: blocks in SAP QM the parts machined in the exposure window and launches their metrology inspection.',
            'Production Manager: reassigns the production orders of the stopped machine to another one with capacity and a compatible program.',
            'Machine operator: does not reset the machine after a vibration stop without authorisation from Maintenance.'
          ] },
          { id: '4', heading: '4. Action criteria', text: [
            'Zone C (2.8 to 4.5 mm/s) sustained for more than 2 h: notify Maintenance via Microsoft Teams and inspect at the next shift change; the machine keeps producing.',
            'Zone D (above 4.5 mm/s) for more than 30 consecutive min: the machine is stopped as soon as the current part is finished and is not restarted until Maintenance has intervened.',
            'A peak above 7.1 mm/s is a critical failure and requires an immediate stop, without finishing the current part.',
            'An increase of more than 50 % over the baseline within one week, even if it stays in zone B, is treated as zone C.'
          ] },
          { id: '5', heading: '5. Parts machined in zone D', text: [
            'All parts machined in the exposure window are blocked in SAP QM as a potential nonconformity under PR-CAL-004, even if the in-process inspection was satisfactory.',
            'Those parts undergo 100 % metrology inspection on the coordinate measuring machine (CMM): functional dimensions, flatness of the sealing faces and roughness of the housings.',
            'Safety parts (cylinder heads, piston rods and valve blocks) are only released with a conforming CMM report signed by Quality.'
          ] },
          { id: '6', heading: '6. Records and communication', list: [
            'IIoT Vibración records one reading per minute and opens the alarm with start, peak, end and minutes in zone D.',
            'The work order in GMAO Maximo records the cause, the parts replaced and the vibration after the intervention.',
            'The parts block is recorded in SAP QM with the alarm reference and the production order.',
            'Repeated alarms on the same machine are analysed in the monthly reliability review.'
          ] },
          { id: '7', heading: '7. References', refs: true, list: [
            'ISO 10816-3:2009 · Mechanical vibration. Evaluation of machine vibration by measurements on non-rotating parts.',
            'IT-MEC-021 · Spindle and bearing replacement in machining centres.',
            'PR-CAL-004 · Nonconformity management and product blocking.'
          ] }
        ]
      },
      {
        code: 'IT-MEC-021',
        title: 'Spindle and bearing replacement in machining centres',
        short: 'Spindle replacement',
        type: 'Work instruction',
        version: '2',
        date: '2025-11-04',
        owner: 'Maintenance',
        summary: 'Diagnosis, replacement of the spindle or its bearings on the DMU 65 machines, stepped run-in and verification (runout ≤ 2 µm, no-load vibration < 1.8 mm/s, conforming master part on the CMM).',
        sections: [
          { id: '1', heading: '1. Purpose and scope', text: [
            'Describe the replacement of the motor spindle (electrospindle) or its bearings on the DMG Mori DMU 65 five-axis machining centres (MC-03, MC-04 and MC-05) and the verification before returning to production.'
          ] },
          { id: '2', heading: '2. Prior safety', text: [
            'The machine is locked out under PR-SEG-002 before any disassembly: electrical, pneumatic and clamping hydraulic energy and the spindle cooling circuit.',
            'The spindle weighs 68 kg: it is handled with lifting fixture UT-21 and the gantry crane, never by hand.'
          ] },
          { id: '3', heading: '3. Diagnosis', list: [
            'Vibration spectrum in IIoT Vibración: outer race (BPFO) and inner race (BPFI) defect frequencies of the front bearing.',
            'Spindle temperature at 12,000 rpm with no load: more than 15 °C above the baseline indicates faulty preload or lubrication.',
            'Radial play at the spindle nose measured with a dial indicator: more than 3 µm requires replacement.',
            'If the diagnosis points only to the bearings and the spindle has fewer than 20,000 h, the bearings are replaced; otherwise, the complete spindle is replaced with an exchange unit.'
          ] },
          { id: '4', heading: '4. Replacement', list: [
            'Remove the spindle following the manufacturer’s sequence and keep the adjustment parts identified.',
            'Fit the exchange spindle or new bearings of the same part number and precision class (P4).',
            'Tighten the flange bolts to 35 Nm in a cross pattern, in two passes.',
            'Record in the work order the serial numbers of the removed spindle and the fitted spindle.'
          ] },
          { id: '5', heading: '5. Run-in and verification', text: [
            'Stepped run-in of 30 min: 3,000, 6,000, 9,000 and 12,000 rpm, stopping if the temperature rises by more than 2 °C per minute.',
            'Final verification: runout at the spindle nose of 2 µm maximum and no-load vibration at 12,000 rpm below 1.8 mm/s.',
            'A master part is machined and measured on the CMM; the machine only returns to production with a conforming master part and the Maintenance Manager’s signature on the work order.'
          ] },
          { id: '6', heading: '6. Records', list: [
            'Work order in GMAO Maximo with diagnosis, parts, tightening torques and verification results.',
            'New vibration baseline in IIoT Vibración, calculated over the following four weeks.',
            'CMM report of the master part in SAP QM.'
          ] },
          { id: '7', heading: '7. Revision history', text: [
            'Rev. 2 (04/11/2025): the master part measured on the CMM is added as a condition for returning to production.'
          ] }
        ]
      },
      {
        code: 'PR-CAL-004',
        title: 'Nonconformity management and product blocking',
        short: 'Nonconformities and blocking',
        type: 'Procedure',
        version: '7',
        date: '2026-01-12',
        owner: 'Quality',
        summary: 'Every nonconformity is recorded in SAP QM and the product is blocked; the Shift Quality Technician approves the block and only the Quality Manager releases. No concessions on critical nonconformities.',
        sections: [
          { id: '1', heading: '1. Purpose and scope', text: [
            'Ensure that no part, assembly or machine with a deviation leaves the Zaragoza plant without a documented Quality decision. Applies to raw materials, purchased components, machined parts, assemblies and finished machines.'
          ] },
          { id: '2', heading: '2. Responsibilities', list: [
            'Any section manager may propose a block on detecting a deviation.',
            'The Shift Quality Technician approves the block and defines its scope (parts, lots, serial numbers and locations).',
            'Only the Quality Manager may release blocked product or approve a concession.'
          ] },
          { id: '3', heading: '3. Recording and blocking', text: [
            'Every nonconformity is recorded in SAP QM as a quality notification, with the material, the lot or serial number, the quantity, the defect description and the source reference (inspection, machine alarm, complaint or supplier).',
            'Blocked product is identified with a red tag and moved to the quarantine area; SAP does not allow a lot with a quality block to be consumed or shipped.'
          ] },
          { id: '4', heading: '4. Classification', list: [
            'Critical: affects a safety part or the pressure-containment function; any safety part with a nonconformity is treated as critical.',
            'Major: out of tolerance on a functional dimension, with no effect on safety.',
            'Minor: cosmetic or documentation defect, with no effect on function.'
          ] },
          { id: '5', heading: '5. Usage decision', text: [
            'The usage decision is recorded in SAP QM and may be: release, rework, accept under concession, return to supplier or scrap.',
            'Release requires documented evidence: inspection or metrology results, cause analysis where applicable and a signed conclusion.',
            'Concessions are not permitted on critical nonconformities.',
            'No product is released by default or because a deadline has expired.'
          ] },
          { id: '6', heading: '6. Machines already delivered', text: [
            'If the nonconformity affects machines already delivered, the Quality Manager assesses a field campaign under PR-POS-005 and informs the After-Sales Manager.'
          ] },
          { id: '7', heading: '7. Corrective actions', text: [
            'Critical and major nonconformities, and those that recur three times in three months, trigger a root cause analysis using the 8D methodology (PR-CAL-008).'
          ] },
          { id: '8', heading: '8. Records', list: [
            'Quality notifications, blocks and usage decisions: SAP QM.',
            'Metrology reports: SAP QM, attached to the quality notification.',
            '8D analyses: PR-CAL-008.'
          ] }
        ]
      },
      {
        code: 'PR-CAL-008',
        title: '8D methodology for complaints and nonconformities',
        short: '8D methodology',
        type: 'Procedure',
        version: '4',
        date: '2026-03-23',
        owner: 'Quality',
        summary: 'Acknowledgement within 24 h, containment within 48 h and 8D report within 10 working days (unless another deadline is agreed with the customer). The supplier must provide its own 8D.',
        sections: [
          { id: '1', heading: '1. Purpose and scope', text: [
            'Resolve customer complaints and critical or repeated nonconformities in a structured way, and communicate the root cause and the actions to the customer with evidence.',
            'Also applies to suppliers: for a defect in a purchased component, the supplier is required to provide its own 8D report.'
          ] },
          { id: '2', heading: '2. Deadlines', list: [
            'Acknowledgement to the customer: 24 h from receipt of the complaint.',
            'Containment (D3): 48 h to block suspect stock in the plant and in the spare parts warehouse.',
            'Complete 8D report: 10 working days, unless a different deadline is agreed with the customer.',
            'Supplier: 8D report within 10 working days of the Hidromec Ebro complaint.'
          ] },
          { id: '3', heading: '3. The eight disciplines', text: [
            'The 8D report is prepared in SAP QM and follows eight steps:'
          ], list: [
            'D1 · Team: Quality, Product Engineering, Production and After-Sales; Purchasing if a supplier is involved.',
            'D2 · Problem description: what, where, when and how many, with the serial number of the machine.',
            'D3 · Containment: blocked stock in the plant, spare parts and affected machines in the field.',
            'D4 · Root cause of occurrence and non-detection, with Ishikawa and 5 whys, confirmed with evidence.',
            'D5 · Corrective actions chosen and their validation.',
            'D6 · Implementation and verification of effectiveness with 90-day data.',
            'D7 · Prevention: update of the FMEA, the control plan, procedures or training.',
            'D8 · Closure, team recognition and communication to the customer.'
          ] },
          { id: '4', heading: '4. Investigation of hydraulic leaks', text: [
            'In a complaint about an oil leak, the investigation reviews at least:'
          ], list: [
            'Traceability of the machine by serial number: lots of seals, hoses and fittings installed (PLM Windchill and SAP).',
            'Records of the machine’s bench pressure test: pressure, hold time and allowable drop.',
            'The supplier’s certificates for the seal lot and the results of the incoming inspection.',
            'Similar complaints in the last 24 months involving the same component or supplier.'
          ] },
          { id: '5', heading: '5. Communication to the customer', text: [
            'The response to the customer is approved by the Quality Manager before it is sent.',
            'A cause is only communicated as confirmed when there is evidence; until then it is presented as a hypothesis under investigation.'
          ] },
          { id: '6', heading: '6. Revision history', text: [
            'Rev. 4 (23/03/2026): review of the supplier’s lot certificates added for hydraulic leak complaints.'
          ] }
        ]
      },
      {
        code: 'PR-SEG-002',
        title: 'Energy isolation (LOTO)',
        short: 'LOTO lockout',
        type: 'Procedure',
        version: '5',
        date: '2025-10-08',
        owner: 'Occupational health and safety',
        summary: 'Seven lockout steps with personal padlock and tag; on hydraulic equipment, accumulators at 0 bar and cylinders blocked before working.',
        sections: [
          { id: '1', heading: '1. Purpose and scope', text: [
            'Ensure that no machine or installation can start up or release energy while work is being done on it.',
            'Applies to all in-house and contractor personnel carrying out maintenance, cleaning, tooling changes or clearing jams with access to danger zones.'
          ] },
          { id: '2', heading: '2. Responsibilities', list: [
            'Each person who works on the machine fits their own padlock and tag: nobody locks out on behalf of someone else.',
            'The Maintenance Manager authorises group lockouts and keeps the lockout box.',
            'Contractors: lock out under the supervision of a Hidromec Ebro Maintenance technician.'
          ] },
          { id: '3', heading: '3. Lockout sequence', list: [
            'Prepare: identify all energy sources using the machine’s lockout sheet.',
            'Notify the operator and those affected of the stop.',
            'Stop the machine with the normal control.',
            'Isolate each source: electrical disconnector, pneumatic valve, hydraulic power unit and cooling.',
            'Lock with a personal padlock and tag at each isolation point.',
            'Dissipate residual energy: bleed hydraulic accumulators, vent the air and lower or block suspended loads.',
            'Verify zero energy by attempting a start and checking for absence of voltage and pressure.'
          ] },
          { id: '4', heading: '4. Hydraulic energy', text: [
            'On presses and hydraulic power units, the residual pressure of the accumulators must read 0 bar on the gauge before any circuit is opened; bleeding is done through the relief valve, never by loosening fittings.',
            'Loaded cylinders are blocked mechanically with chocks or safety pins, because a closed valve does not prevent descent due to internal leakage.'
          ] },
          { id: '5', heading: '5. Removing the lockout', text: [
            'Each person removes only their own padlock when finished.',
            'If a person is not present to remove their padlock, only the Maintenance Manager may remove it, after checking that the person has left the plant and that the machine is safe, and records it.'
          ] },
          { id: '6', heading: '6. Training and records', list: [
            'Initial training and refresher every 2 years, recorded in each person’s file.',
            'Lockout sheets for each machine in GMAO Maximo, reviewed whenever the machine is modified.',
            'Group lockouts are entered in the lockout logbook.'
          ] },
          { id: '7', heading: '7. References', refs: true, list: [
            'Real Decreto 1215/1997 (Spanish minimum requirements for the use of work equipment).',
            'Ley 31/1995 (Spanish Occupational Risk Prevention Act).',
            'ISO 14118:2017 · Safety of machinery. Prevention of unexpected start-up.'
          ] }
        ]
      },
      {
        code: 'PR-POS-005',
        title: 'Field campaigns',
        short: 'Field campaigns',
        type: 'Procedure',
        version: '3',
        date: '2026-05-18',
        owner: 'After-sales',
        summary: 'Campaign scope by traceability (component lot → assembly → serial no. → customer) within 4 h; customers notified within 24 h if safety-related; closure with 95 % of machines serviced.',
        sections: [
          { id: '1', heading: '1. Purpose and scope', text: [
            'Organise the inspection, replacement or modification of machines already delivered when a defect is detected that may affect their safety, their operation or compliance with CE marking.',
            'Applies to presses PH-160, PH-250 and PH-400 and to hydraulic power units GH-30 and GH-55, whether in or out of warranty.'
          ] },
          { id: '2', heading: '2. Campaign decision', text: [
            'The campaign is proposed by the Quality Manager in light of the investigation (PR-CAL-008); it is approved by the Plant Manager together with the After-Sales Manager.',
            'It is classified as a safety campaign if the defect may cause harm to people; otherwise, as a reliability campaign.'
          ] },
          { id: '3', heading: '3. Identification of machines', text: [
            'The scope is calculated by traceability: component lot → assembly lots → serial numbers → customers (genealogy from SAP and MES Opcenter, PLM Windchill and Salesforce Service).',
            'Target: complete list of affected machines and their customers within 4 h of campaign approval.',
            'Stock of the component lot in the warehouse and in spare parts is blocked in SAP QM within the same deadline.'
          ] },
          { id: '4', heading: '4. Communication to customers', list: [
            'Safety campaign: each customer notified within 24 h by phone and in writing, with the instruction to stop using the machine if the risk requires it.',
            'Reliability campaign: written notice within 5 working days, with the proposed date of intervention.',
            'If the machine was sold by a distributor, the distributor is notified and asked to identify the end user.',
            'Notices are recorded as cases in Salesforce Service, one per serial number.'
          ] },
          { id: '5', heading: '5. Authorities', text: [
            'If it is a safety campaign, the Quality Manager informs the market surveillance authorities under PR-COM-002 (Communication with market surveillance authorities).'
          ] },
          { id: '6', heading: '6. Execution and closure', text: [
            'Each intervention is recorded in the Salesforce Service case with the serial number, the parts replaced and the functional test.',
            'The campaign is closed when at least 95 % of the machines have been serviced and the rest have been located with justification; progress is reported weekly to the Plant Manager.'
          ] },
          { id: '7', heading: '7. References', refs: true, list: [
            'Regulation (EU) 2023/1230 on machinery, applicable from 20/01/2027.',
            'Machinery Directive 2006/42/EC, in force until 19/01/2027.',
            'Regulation (EU) 2019/1020 on market surveillance.',
            'PR-CAL-008 · 8D methodology.'
          ] }
        ]
      }
    ],

    unindexed: {
      'PR-COM-002': { title: 'Communication with market surveillance authorities', mentionedIn: { doc: 'PR-POS-005', sec: '5', quote: 'under PR-COM-002 (Communication with market surveillance authorities)' } }
    },

    suggested: ['vibracion', 'piezas-zona-d', 'plazos-8d', 'loto', 'campana', 'liberar'],

    intents: [
      {
        id: 'vibracion', icon: 'activity', topic: 'Vibration · action in zone D', scope: 'local',
        q: 'What must be done if spindle vibration enters zone D?',
        anchors: ['vibration', 'vibrations', 'zone d', 'spindle', 'mm/s', 'rms'],
        terms: ['exceeds', 'exceed', 'rises', 'alarm', 'stop', 'stopped', 'act', 'done', 'do', 'limit', '4.5', 'machine', 'centre'],
        min: 3,
        blocks: [
          { t: 'If vibration exceeds 4.5 mm/s (zone D) for more than 30 consecutive min, the machine is stopped as soon as the current part is finished and is not restarted until Maintenance has intervened.', c: [['PR-MAN-011', 4, 'Zone D (above 4.5 mm/s) for more than 30 consecutive min: the machine is stopped as soon as the current part is finished']] },
          { t: 'A peak above 7.1 mm/s is a critical failure: the machine is stopped immediately, without finishing the part.', c: [['PR-MAN-011', 4, 'A peak above 7.1 mm/s is a critical failure and requires an immediate stop, without finishing the current part.']] },
          { t: 'Parts machined in the exposure window are blocked in SAP QM, even if the in-process inspection was satisfactory, and undergo 100 % metrology on the CMM.', c: [['PR-MAN-011', 5, 'All parts machined in the exposure window are blocked in SAP QM as a potential nonconformity under PR-CAL-004'], ['PR-MAN-011', 5, 'Those parts undergo 100 % metrology inspection on the coordinate measuring machine (CMM)']] },
          { t: 'The Maintenance Manager decides on the stop and approves the work order in GMAO Maximo; the Production Manager reassigns the production orders to another machine.', c: [['PR-MAN-011', 3, 'Maintenance Manager: assesses the alarm, decides on the stop and approves the work order in GMAO Maximo.'], ['PR-MAN-011', 3, 'Production Manager: reassigns the production orders of the stopped machine to another one with capacity and a compatible program.']] }
        ],
        context: {
          systems: ['IIoT Vibración', 'GMAO Maximo', 'SAP S/4HANA'],
          text: 'Today’s alarm on MC-04 (DMG Mori DMU 65): 7.8 mm/s RMS since 03:40, with a peak of 8.4 mm/s at 05:32. More than 2 h in zone D and a peak above 7.1 mm/s: under section 4 this is a critical failure and requires an immediate stop. During the window, 42 cylinder heads of lot CUL-2609-118 (PO 4100872) were machined; they are pending block and 100 % metrology.',
          outcome: 'alarma',
          go: 'alarma', goLabel: 'Open MC-04 alarm'
        },
        followups: ['piezas-zona-d', 'cambio-husillo']
      },
      {
        id: 'piezas-zona-d', icon: 'layers', topic: 'Vibration · parts machined in zone D', scope: 'local',
        q: 'What happens to parts machined while the spindle was in zone D?',
        anchors: ['parts', 'cylinder heads', 'parts machined', 'machined parts', 'exposure window', 'metrology', 'cmm'],
        terms: ['zone', 'vibration', 'spindle', 'block', 'blocked', 'release', 'measure', 'inspection', 'safety', 'happens', 'do'],
        min: 2,
        blocks: [
          { t: 'They are all blocked in SAP QM as a potential nonconformity, even if the in-process inspection was satisfactory.', c: [['PR-MAN-011', 5, 'All parts machined in the exposure window are blocked in SAP QM as a potential nonconformity under PR-CAL-004, even if the in-process inspection was satisfactory.']] },
          { list: [
            { t: 'They undergo 100 % metrology inspection on the CMM: functional dimensions, flatness of the sealing faces and roughness of the housings.', c: [['PR-MAN-011', 5, 'functional dimensions, flatness of the sealing faces and roughness of the housings']] },
            { t: 'Safety parts, such as cylinder heads, are only released with a conforming CMM report signed by Quality.', c: [['PR-MAN-011', 5, 'Safety parts (cylinder heads, piston rods and valve blocks) are only released with a conforming CMM report signed by Quality.']] },
            { t: 'A nonconformity on a safety part is critical and does not allow a concession.', c: [['PR-CAL-004', 4, 'any safety part with a nonconformity is treated as critical'], ['PR-CAL-004', 5, 'Concessions are not permitted on critical nonconformities.']] }
          ] }
        ],
        context: {
          systems: ['SAP S/4HANA', 'MES Opcenter'],
          text: 'The 42 cylinder heads of lot CUL-2609-118 (PO 4100872) were machined on MC-04 between 03:40 and the stop. They are safety parts: they are only released with a conforming CMM report.',
          outcome: 'alarma',
          go: 'alarma', goLabel: 'Open MC-04 alarm'
        },
        followups: ['liberar', 'clasificacion']
      },
      {
        id: 'zonas', icon: 'gauge', topic: 'Vibration · severity zones', scope: 'local',
        q: 'What are the vibration limits for zones A, B, C and D?',
        anchors: ['zones', 'zone a', 'zone b', 'zone c', 'severity', 'iso 10816', '10816', 'vibration limits'],
        terms: ['limit', 'limits', 'vibration', 'mm/s', 'values', 'warning', 'which'],
        min: 3,
        blocks: [
          { t: 'Under ISO 10816-3 for group 2 machines with rigid mounting: zone A up to 1.4 mm/s, B up to 2.8 mm/s, C up to 4.5 mm/s and D above 4.5 mm/s.', c: [['PR-MAN-011', 2, 'zone A up to 1.4 mm/s; zone B up to 2.8 mm/s; zone C up to 4.5 mm/s; zone D above 4.5 mm/s.']] },
          { t: 'In zone C for more than 2 h, Maintenance is notified via Microsoft Teams and the machine is inspected at the next shift change, without stopping it.', c: [['PR-MAN-011', 4, 'Zone C (2.8 to 4.5 mm/s) sustained for more than 2 h: notify Maintenance via Microsoft Teams and inspect at the next shift change; the machine keeps producing.']] },
          { t: 'A rise of more than 50 % over the baseline within one week is treated as zone C even if it is still in zone B.', c: [['PR-MAN-011', 4, 'An increase of more than 50 % over the baseline within one week, even if it stays in zone B, is treated as zone C.']] }
        ],
        followups: ['vibracion']
      },
      {
        id: 'cambio-husillo', icon: 'wrench', topic: 'Spindle · replacement and verification', scope: 'local',
        q: 'How is a machining centre verified after replacing the spindle?',
        anchors: ['replacing the spindle', 'spindle replacement', 'run in', 'stepped', 'electrospindle', 'bearings', 'master part', 'runout'],
        terms: ['spindle', 'verified', 'verify', 'verification', 'after', 'production', 'return', 'replace', 'replacing', 'replacement'],
        min: 3,
        blocks: [
          { t: 'First, a stepped run-in of 30 min at 3,000, 6,000, 9,000 and 12,000 rpm, stopping if the temperature rises by more than 2 °C per minute.', c: [['IT-MEC-021', 5, 'Stepped run-in of 30 min: 3,000, 6,000, 9,000 and 12,000 rpm, stopping if the temperature rises by more than 2 °C per minute.']] },
          { t: 'Final verification requires a runout at the nose of 2 µm maximum and no-load vibration at 12,000 rpm below 1.8 mm/s.', c: [['IT-MEC-021', 5, 'Final verification: runout at the spindle nose of 2 µm maximum and no-load vibration at 12,000 rpm below 1.8 mm/s.']] },
          { t: 'The machine only returns to production with a conforming master part on the CMM and the Maintenance Manager’s signature on the work order.', c: [['IT-MEC-021', 5, 'the machine only returns to production with a conforming master part and the Maintenance Manager’s signature on the work order']] },
          { t: 'Before disassembly, the machine is locked out under PR-SEG-002.', c: [['IT-MEC-021', 2, 'The machine is locked out under PR-SEG-002 before any disassembly']] }
        ],
        context: {
          systems: ['GMAO Maximo', 'IIoT Vibración'],
          text: 'MC-04 is one of the three DMU 65 machines covered by the instruction. After the intervention for today’s alarm, the new baseline is calculated over the following four weeks.',
          go: 'alarma', goLabel: 'Open MC-04 alarm'
        },
        followups: ['diagnostico', 'loto']
      },
      {
        id: 'diagnostico', icon: 'search', topic: 'Spindle · diagnosis', scope: 'local',
        q: 'When are only the bearings replaced and when is the whole spindle replaced?',
        anchors: ['bearings', 'bearing', 'whole spindle', 'complete spindle', 'bpfo', 'bpfi', 'radial play', 'diagnosis'],
        terms: ['replaced', 'replace', 'change', 'changed', 'only', 'whole', 'complete', 'when', 'hours', 'spindle'],
        min: 3,
        blocks: [
          { t: 'If the diagnosis points only to the bearings and the spindle has fewer than 20,000 h, the bearings are replaced; otherwise, the complete spindle is replaced with an exchange unit.', c: [['IT-MEC-021', 3, 'If the diagnosis points only to the bearings and the spindle has fewer than 20,000 h, the bearings are replaced; otherwise, the complete spindle is replaced with an exchange unit.']] },
          { list: [
            { t: 'Radial play at the nose of more than 3 µm requires replacement.', c: [['IT-MEC-021', 3, 'Radial play at the spindle nose measured with a dial indicator: more than 3 µm requires replacement.']] },
            { t: 'A no-load temperature at 12,000 rpm more than 15 °C above the baseline indicates faulty preload or lubrication.', c: [['IT-MEC-021', 3, 'more than 15 °C above the baseline indicates faulty preload or lubrication']] }
          ] }
        ],
        followups: ['cambio-husillo']
      },
      {
        id: 'apriete', icon: 'wrench', topic: 'Spindle · assembly', scope: 'local',
        q: 'What torque are the spindle flange bolts tightened to?',
        anchors: ['tightening torque', 'torque', 'tighten', 'tightened', 'flange', 'bolts', 'nm'],
        terms: ['spindle', 'assembly', 'cross', 'pattern', 'bearings', 'precision'],
        min: 3,
        blocks: [
          { t: 'To 35 Nm, in a cross pattern and in two passes.', c: [['IT-MEC-021', 4, 'Tighten the flange bolts to 35 Nm in a cross pattern, in two passes.']] },
          { t: 'New bearings must be of the same part number and precision class (P4), and the serial numbers of the removed and fitted spindles are recorded in the work order.', c: [['IT-MEC-021', 4, 'Fit the exchange spindle or new bearings of the same part number and precision class (P4).'], ['IT-MEC-021', 4, 'Record in the work order the serial numbers of the removed spindle and the fitted spindle.']] },
          { t: 'The spindle weighs 68 kg and is handled with fixture UT-21 and the gantry crane.', c: [['IT-MEC-021', 2, 'The spindle weighs 68 kg: it is handled with lifting fixture UT-21 and the gantry crane, never by hand.']] }
        ],
        followups: ['cambio-husillo']
      },
      {
        id: 'clasificacion', icon: 'list-checks', topic: 'Nonconformities · classification', scope: 'local',
        q: 'How is a nonconformity classified?',
        anchors: ['nonconformity', 'nonconformities', 'non-conformity', 'critical', 'major', 'minor', 'classified', 'classification'],
        terms: ['classify', 'classified', 'types', 'severity', 'part', 'defect'],
        min: 3,
        blocks: [
          { list: [
            { t: 'Critical: affects a safety part or pressure containment.', c: [['PR-CAL-004', 4, 'Critical: affects a safety part or the pressure-containment function']] },
            { t: 'Major: out of tolerance on a functional dimension, with no effect on safety.', c: [['PR-CAL-004', 4, 'Major: out of tolerance on a functional dimension, with no effect on safety.']] },
            { t: 'Minor: cosmetic or documentation defect, with no effect on function.', c: [['PR-CAL-004', 4, 'Minor: cosmetic or documentation defect, with no effect on function.']] }
          ] },
          { t: 'Critical and major ones, and those that recur three times in three months, trigger an 8D analysis.', c: [['PR-CAL-004', 7, 'Critical and major nonconformities, and those that recur three times in three months, trigger a root cause analysis using the 8D methodology (PR-CAL-008).']] }
        ],
        followups: ['liberar', 'contenido-8d']
      },
      {
        id: 'liberar', icon: 'unlock', topic: 'Product blocking and release', scope: 'local',
        q: 'Who can release a blocked part?',
        anchors: ['release', 'released', 'releases', 'unblock', 'usage decision', 'concession'],
        terms: ['who', 'part', 'parts', 'lot', 'blocked', 'block', 'product', 'signature', 'can'],
        min: 3,
        blocks: [
          { t: 'Only the Quality Manager, who is also the only person who can approve a concession.', c: [['PR-CAL-004', 2, 'Only the Quality Manager may release blocked product or approve a concession.']] },
          { t: 'The usage decision is recorded in SAP QM: release, rework, accept under concession, return to supplier or scrap.', c: [['PR-CAL-004', 5, 'The usage decision is recorded in SAP QM and may be: release, rework, accept under concession, return to supplier or scrap.']] },
          { t: 'Release requires documented evidence: inspection or metrology results, cause analysis where applicable and a signed conclusion.', c: [['PR-CAL-004', 5, 'Release requires documented evidence: inspection or metrology results, cause analysis where applicable and a signed conclusion.']] },
          { t: 'Nothing is released by default or because a deadline has expired.', c: [['PR-CAL-004', 5, 'No product is released by default or because a deadline has expired.']] }
        ],
        followups: ['bloqueo', 'clasificacion']
      },
      {
        id: 'bloqueo', icon: 'lock', topic: 'Product blocking · recording', scope: 'local',
        q: 'Who approves a block and where is it recorded?',
        anchors: ['block', 'blocking', 'quarantine', 'red tag', 'quality notification'],
        terms: ['who', 'approves', 'approve', 'recorded', 'record', 'where', 'proposes', 'sap', 'scope'],
        min: 4,
        blocks: [
          { t: 'Any section manager may propose it; it is approved by the Shift Quality Technician, who defines its scope.', c: [['PR-CAL-004', 2, 'Any section manager may propose a block on detecting a deviation.'], ['PR-CAL-004', 2, 'The Shift Quality Technician approves the block and defines its scope (parts, lots, serial numbers and locations).']] },
          { t: 'It is recorded in SAP QM as a quality notification, with material, lot or serial number, quantity, defect and source.', c: [['PR-CAL-004', 3, 'Every nonconformity is recorded in SAP QM as a quality notification']] },
          { t: 'The product gets a red tag and goes to quarantine; SAP does not allow a blocked lot to be consumed or shipped.', c: [['PR-CAL-004', 3, 'Blocked product is identified with a red tag and moved to the quarantine area; SAP does not allow a lot with a quality block to be consumed or shipped.']] }
        ],
        followups: ['liberar']
      },
      {
        id: 'plazos-8d', icon: 'mail', topic: 'Complaints · 8D deadlines', scope: 'all',
        q: 'What deadlines do we have to respond to a customer complaint?',
        anchors: ['complaint', 'complaints', 'claim', '8d'],
        terms: ['deadline', 'deadlines', 'respond', 'reply', 'answer', 'acknowledgement', 'days', 'hours', 'when', 'customer', 'handled', 'time'],
        min: 3,
        blocks: [
          { list: [
            { t: 'Acknowledgement within 24 h of receipt.', c: [['PR-CAL-008', 2, 'Acknowledgement to the customer: 24 h from receipt of the complaint.']] },
            { t: 'Containment within 48 h: block suspect stock in the plant and in the spare parts warehouse.', c: [['PR-CAL-008', 2, 'Containment (D3): 48 h to block suspect stock in the plant and in the spare parts warehouse.']] },
            { t: 'Complete 8D report within 10 working days, unless a different deadline is agreed with the customer.', c: [['PR-CAL-008', 2, 'Complete 8D report: 10 working days, unless a different deadline is agreed with the customer.']] }
          ] },
          { t: 'The response is approved by the Quality Manager before it is sent.', c: [['PR-CAL-008', 5, 'The response to the customer is approved by the Quality Manager before it is sent.']] }
        ],
        context: {
          systems: ['Outlook', 'Salesforce Service'],
          text: 'Complaint from Prensas y Servicios del Norte, S.L. about the oil leak on PH-250 serial no. PH250-26-0412, delivered on 04/08/2026: acknowledgement within 24 h and 8D within 10 working days.',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Open PH-250 complaint'
        },
        followups: ['fuga', 'contenido-8d']
      },
      {
        id: 'contenido-8d', icon: 'list-checks', topic: '8D methodology · content', scope: 'all',
        q: 'What must an 8D report include?',
        anchors: ['8d', 'eight disciplines', 'd1', 'd4', 'd8', 'ishikawa', '5 whys'],
        terms: ['report', 'include', 'includes', 'steps', 'content', 'structure', 'disciplines', 'template'],
        min: 2,
        blocks: [
          { intro: { t: 'The 8D report is prepared in SAP QM and follows eight steps:', c: [['PR-CAL-008', 3, 'The 8D report is prepared in SAP QM and follows eight steps:']] }, list: [
            'D1 · Team: Quality, Product Engineering, Production and After-Sales; Purchasing if a supplier is involved.',
            'D2 · Problem description with the serial number of the machine.',
            'D3 · Containment in the plant, spare parts and machines in the field.',
            'D4 · Root cause of occurrence and non-detection, with Ishikawa and 5 whys, confirmed with evidence.',
            'D5 · Corrective actions and their validation.',
            'D6 · Implementation and verification of effectiveness with 90-day data.',
            'D7 · Prevention: FMEA, control plan, procedures or training.',
            'D8 · Closure and communication to the customer.'
          ] },
          { t: 'A cause is only communicated as confirmed when there is evidence; until then it is a hypothesis under investigation.', c: [['PR-CAL-008', 5, 'A cause is only communicated as confirmed when there is evidence; until then it is presented as a hypothesis under investigation.']] }
        ],
        followups: ['plazos-8d', 'proveedor']
      },
      {
        id: 'fuga', icon: 'droplet', topic: 'Complaints · hydraulic leaks', scope: 'all',
        q: 'What must be reviewed in a complaint about an oil leak?',
        anchors: ['leak', 'leaks', 'leaking', 'oil', 'seal', 'seals', 'tightness'],
        terms: ['complaint', 'review', 'reviewed', 'check', 'investigate', 'investigation', 'press', 'customer', 'hydraulic'],
        min: 3,
        blocks: [
          { intro: { t: 'The investigation reviews at least:', c: [['PR-CAL-008', 4, 'In a complaint about an oil leak, the investigation reviews at least:']] }, list: [
            { t: 'Traceability of the machine by serial number: lots of seals, hoses and fittings installed.', c: [['PR-CAL-008', 4, 'Traceability of the machine by serial number: lots of seals, hoses and fittings installed (PLM Windchill and SAP).']] },
            { t: 'The records of the machine’s bench pressure test.', c: [['PR-CAL-008', 4, 'Records of the machine’s bench pressure test: pressure, hold time and allowable drop.']] },
            { t: 'The supplier’s certificates for the seal lot and the incoming inspection.', c: [['PR-CAL-008', 4, 'The supplier’s certificates for the seal lot and the results of the incoming inspection.']] },
            { t: 'Similar complaints in the last 24 months involving the same component or supplier.', c: [['PR-CAL-008', 4, 'Similar complaints in the last 24 months involving the same component or supplier.']] }
          ] }
        ],
        context: {
          systems: ['PLM Windchill', 'SAP S/4HANA'],
          text: 'On PH250-26-0412 the main cylinder seal is from lot JNT-2607-031 supplied by Sellados Ibéricos, S.A.: the lot certificate must be requested and its incoming inspection reviewed.',
          outcome: 'reclamacion',
          lot: 'JNT-2607-031',
          go: 'reclamacion', goLabel: 'Open PH-250 complaint'
        },
        followups: ['proveedor', 'campana']
      },
      {
        id: 'proveedor', icon: 'users', topic: '8D methodology · suppliers', scope: 'all',
        q: 'Should we ask the supplier of a defective component for an 8D?',
        anchors: ['supplier', 'suppliers', 'purchased component', 'sellados ibericos'],
        terms: ['8d', 'ask', 'request', 'require', 'report', 'defective', 'component', 'deadline'],
        min: 3,
        blocks: [
          { t: 'Yes: for a defect in a purchased component, the supplier is required to provide its own 8D report.', c: [['PR-CAL-008', 1, 'for a defect in a purchased component, the supplier is required to provide its own 8D report']] },
          { t: 'The supplier has 10 working days from the Hidromec Ebro complaint.', c: [['PR-CAL-008', 2, 'Supplier: 8D report within 10 working days of the Hidromec Ebro complaint.']] },
          { t: 'If a supplier is involved, Purchasing joins the 8D team.', c: [['PR-CAL-008', 3, 'Purchasing if a supplier is involved']] }
        ],
        followups: ['fuga']
      },
      {
        id: 'loto', icon: 'lock', topic: 'Safety · LOTO lockout', scope: 'all',
        q: 'What are the steps of LOTO lockout?',
        anchors: ['loto', 'lockout', 'lock out', 'padlock', 'padlocks', 'zero energy', 'tagout'],
        terms: ['steps', 'sequence', 'how', 'machine', 'lock', 'tag', 'work', 'maintenance', 'isolate'],
        min: 2,
        blocks: [
          { list: [
            { t: 'Prepare: identify all energy sources using the machine’s lockout sheet.', c: [['PR-SEG-002', 3, 'Prepare: identify all energy sources using the machine’s lockout sheet.']] },
            { t: 'Notify those affected and stop the machine with the normal control.', c: [['PR-SEG-002', 3, 'Notify the operator and those affected of the stop.'], ['PR-SEG-002', 3, 'Stop the machine with the normal control.']] },
            { t: 'Isolate each source and lock it with a personal padlock and tag.', c: [['PR-SEG-002', 3, 'Isolate each source: electrical disconnector, pneumatic valve, hydraulic power unit and cooling.'], ['PR-SEG-002', 3, 'Lock with a personal padlock and tag at each isolation point.']] },
            { t: 'Dissipate residual energy and verify zero energy by attempting a start.', c: [['PR-SEG-002', 3, 'Dissipate residual energy: bleed hydraulic accumulators, vent the air and lower or block suspended loads.'], ['PR-SEG-002', 3, 'Verify zero energy by attempting a start and checking for absence of voltage and pressure.']] }
          ] },
          { t: 'Each person fits their own padlock: nobody locks out on behalf of someone else.', c: [['PR-SEG-002', 2, 'Each person who works on the machine fits their own padlock and tag: nobody locks out on behalf of someone else.']] }
        ],
        followups: ['hidraulica', 'candado-olvidado']
      },
      {
        id: 'hidraulica', icon: 'gauge', topic: 'Safety · hydraulic energy', scope: 'all',
        q: 'How is a hydraulic press with accumulators locked out?',
        anchors: ['accumulator', 'accumulators', 'residual pressure', 'chocks', 'safety pins', 'hydraulic press'],
        terms: ['locked', 'lock', 'lockout', 'press', 'presses', 'bleed', 'bleeding', 'cylinder', 'bar', 'hydraulic'],
        min: 3,
        blocks: [
          { t: 'Before any circuit is opened, the accumulator gauge must read 0 bar; bleeding is done through the relief valve, never by loosening fittings.', c: [['PR-SEG-002', 4, 'the residual pressure of the accumulators must read 0 bar on the gauge before any circuit is opened; bleeding is done through the relief valve, never by loosening fittings']] },
          { t: 'Loaded cylinders are blocked with chocks or pins, because a closed valve does not prevent descent due to internal leakage.', c: [['PR-SEG-002', 4, 'Loaded cylinders are blocked mechanically with chocks or safety pins, because a closed valve does not prevent descent due to internal leakage.']] }
        ],
        followups: ['loto']
      },
      {
        id: 'candado-olvidado', icon: 'key', topic: 'Safety · removing padlocks', scope: 'all',
        q: 'What happens if someone leaves and forgets to remove their padlock?',
        anchors: ['padlock', 'padlocks', 'remove', 'removing the lockout'],
        terms: ['leaves', 'left', 'forgets', 'forgot', 'present', 'absent', 'who', 'take', 'removes', 'still'],
        min: 3,
        blocks: [
          { t: 'Each person removes only their own padlock.', c: [['PR-SEG-002', 5, 'Each person removes only their own padlock when finished.']] },
          { t: 'If the person is not present, only the Maintenance Manager may remove it, after checking that they have left the plant and that the machine is safe, and records it.', c: [['PR-SEG-002', 5, 'only the Maintenance Manager may remove it, after checking that the person has left the plant and that the machine is safe, and records it']] }
        ],
        followups: ['loto']
      },
      {
        id: 'campana', icon: 'truck', topic: 'After-sales · field campaigns', scope: 'all',
        q: 'How is a field campaign organised?',
        anchors: ['campaign', 'campaigns', 'field campaign', 'machines in the field', 'recall'],
        terms: ['organised', 'organized', 'organise', 'how', 'machines', 'customers', 'notice', 'notify', 'deadline', 'identify', 'serial'],
        min: 2,
        blocks: [
          { t: 'It is proposed by the Quality Manager and approved by the Plant Manager and the After-Sales Manager.', c: [['PR-POS-005', 2, 'The campaign is proposed by the Quality Manager in light of the investigation (PR-CAL-008); it is approved by the Plant Manager together with the After-Sales Manager.']] },
          { t: 'The scope comes from traceability, from the component lot to the customer, with the complete list within 4 h; the lot stock is also blocked within that deadline.', c: [['PR-POS-005', 3, 'The scope is calculated by traceability: component lot → assembly lots → serial numbers → customers'], ['PR-POS-005', 3, 'Target: complete list of affected machines and their customers within 4 h of campaign approval.'], ['PR-POS-005', 3, 'Stock of the component lot in the warehouse and in spare parts is blocked in SAP QM within the same deadline.']] },
          { t: 'If it is safety-related, each customer is notified within 24 h; if it is reliability-related, within 5 working days. With a distributor, they are asked for the end user.', c: [['PR-POS-005', 4, 'Safety campaign: each customer notified within 24 h by phone and in writing'], ['PR-POS-005', 4, 'Reliability campaign: written notice within 5 working days'], ['PR-POS-005', 4, 'If the machine was sold by a distributor, the distributor is notified and asked to identify the end user.']] },
          { t: 'It is closed with at least 95 % of the machines serviced.', c: [['PR-POS-005', 6, 'The campaign is closed when at least 95 % of the machines have been serviced']] }
        ],
        context: {
          systems: ['SAP S/4HANA', 'PLM Windchill', 'Salesforce Service'],
          text: 'Mock recall with seal lot JNT-2607-031: 1,104 seals fitted in 3 assembly lots, 23 machines in the field (17 PH-250 and 6 GH-55) at 11 customers in Spain, Portugal and France. Target in section 3: complete list within 4 h.',
          lot: 'JNT-2607-031',
          go: 'retirada', goLabel: 'Open JNT-2607-031 mock recall'
        },
        followups: ['autoridades', 'liberar']
      },
      {
        id: 'autoridades', icon: 'building', topic: 'Field campaigns · authorities', scope: 'all', kind: 'partial',
        q: 'Do the authorities have to be notified in a safety campaign?',
        anchors: ['authority', 'authorities', 'market surveillance', 'ministry', 'notified', 'notify'],
        terms: ['campaign', 'safety', 'inform', 'report', 'communicate', 'how', 'deadline'],
        min: 3,
        blocks: [
          { t: 'Yes: in a safety campaign, the Quality Manager informs the market surveillance authorities under PR-COM-002.', c: [['PR-POS-005', 5, 'If it is a safety campaign, the Quality Manager informs the market surveillance authorities under PR-COM-002']] }
        ],
        note: 'PR-COM-002 (Communication with market surveillance authorities) is not among the indexed documents: the channel, deadline and content of the communication cannot be detailed from this search.',
        followups: ['campana']
      }
    ],

    gaps: [
      { id: 'calibracion', topic: 'Calibration of measuring equipment', anchors: ['calibration', 'calibrate', 'calibrated', 'vernier', 'callipers', 'calipers', 'micrometer', 'micrometers', 'gauge blocks', 'msa', 'gauge r&r'],
        reason: 'No indexed document describes the calibration or the measurement system analysis (MSA) of the inspection equipment.' },
      { id: 'notificacion', topic: 'Communication with authorities', anchors: ['deadline to notify', 'form', 'safety gate', 'rapex', 'pr-com-002'],
        reason: 'No indexed document describes how a campaign is communicated to the market surveillance authorities.', related: 'PR-COM-002' },
      { id: 'certificados', topic: 'Certifications and audits', anchors: ['iso 9001', 'iatf', '16949', 'certificate', 'certificates', 'certification', 'audit', 'audits', 'ppap'],
        reason: 'The management system certificates, PPAPs and audit reports are not among the indexed documents.' },
      { id: 'medioambiente', topic: 'Environment and sustainability', anchors: ['iso 14001', 'environment', 'environmental', 'waste', 'coolant', 'footprint', 'carbon', 'emissions', 'esg'],
        reason: 'No indexed document covers environmental management, waste (coolants, oils) or the carbon footprint.' },
      { id: 'precio', topic: 'Prices and costs', anchors: ['price', 'prices', 'cost', 'costs', 'tariff', 'euros', 'quote', 'quotation', 'commercial warranty'],
        reason: 'Prices, costs and commercial terms are not part of the indexed procedures.' },
      { id: 'personal', topic: 'Working conditions', anchors: ['holidays', 'holiday', 'payroll', 'salary', 'wage', 'collective agreement', 'contract', 'working hours', 'night shifts'],
        reason: 'Working conditions are not part of the indexed procedures.' }
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
})('maquinaria');
