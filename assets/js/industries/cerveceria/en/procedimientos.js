/* Cerveceria Bardenas · procedure query with citations. Fictional documents, consistent with HISTORIAS.md. */
agenticPackEn('cerveceria', {
  procedimientos: {
    section: 'Calidad',
    nav: 'Procedures',
    title: 'Ask the procedures',
    agent: 'Procedures',
    system: 'Document management system',
    source: 'Quality document management · controlled documents',
    indexed_at: '2026-09-29T06:00',
    doc_org: 'Cerveceria Bardenas · Quality',
    ui: {
      page_title: 'Quality procedures consultation',
      intro_title: 'Ask about the procedures at the Arguedas factory',
      intro_text: 'HACCP, fermentation, product withdrawal, glass and CIP cleaning. Each sentence in the answer cites the document and section it comes from. If no indexed document covers it, the query indicates so and does not answer.',
      placeholder: 'Ask a question about the factory procedures',
      context_title: 'Applied to the Arguedas factory today',
      permission: 'Quality and Production · Arguedas',
      asker_initials: 'TC',
      asker_role: 'Shift Quality Technician',
      route_to: 'Quality Manager'
    },
    report: { title: 'Quality procedures consultation', code_prefix: 'CON-PROC', filename: 'procedures-consultation', scope_label: 'Factory', scope: 'Arguedas' },
    presenter: {
      say: [
        'Factory procedures consultation: the answer comes only from controlled documents, and each sentence carries its citation to the document and section.',
        'There are six indexed documents: the HACCP plan, fermentation control, product withdrawal, glass and foreign objects, CIP cleaning and the Bardenas Lager specification. These are synthetic versions; in the pilot, the actual current ones.'
      ],
      say_empty: 'Useful in BRCGS or IFS audits, for training warehouse and bottling operators, and for answering customers or importers with exact references.',
      say_answered: 'Clicking a citation opens the document with the exact passage highlighted. And the answer is cross-referenced with what happens today: fermenter FV-12, oxidized barrels from batch L2608-K14 or its withdrawal simulation.',
      say_none: 'When there is no source it says so and does not invent: neither answer nor citation. If the topic is in an unindexed document, it names it (PR-COM-001) and allows escalation to Quality.',
      next_empty: 'Click "What should you do if a fermenter exceeds its temperature limit?" and then citation 1 to see the highlighted passage.',
      next_answered: 'Write a question without a source, for example "What must the label for the United Kingdom carry?", and click "Ask".',
      next_done: 'Move to the next scene with the right arrow.'
    },

    docs: [
      {
        code: 'APPCC-01',
        title: 'HACCP plan for the Arguedas factory',
        short: 'HACCP plan',
        type: 'HACCP plan',
        version: '9',
        date: '2026-02-05',
        owner: 'HACCP team',
        summary: 'Three CCPs (tunnel pasteurization, flash barrel pasteurization and empty bottle inspection); gluten declared in all references; complaints acknowledged in 24 h and answered in 48 h.',
        sections: [
          { id: '1', heading: '1. Scope', text: ['Analyzes hazards and defines controls for the production and packaging of Bardenas Lager, Bardenas Tostada and Bardenas Sin at the Arguedas factory, from receipt of malt, hops, water and CO₂ through shipment of bottles, cans and barrels.'] },
          { id: '2', heading: '2. HACCP team', text: ['Comprises the Quality Manager (coordinator), the Master Brewer, the Maintenance Manager, the Packaging Manager and the Logistics Manager.', 'The plan is reviewed annually and with each change in process, product or packaging.'] },
          { id: '3', heading: '3. Critical control points', list: ['CCP-1 · Tunnel pasteurization (bottle and can): between 15 and 25 pasteurization units (PU); below 15 PU, product is held and re-pasteurized or destroyed.', 'CCP-2 · Flash pasteurization (barrel): 20 PU minimum at 72 °C; if the reading drops below minimum, the pasteurizer automatically diverts the beer to the return tank.', 'CCP-3 · Empty bottle inspection (EBI): rejection of bottles with glass fragments or foreign objects, verified with test bottles at the start of each shift and every 2 h, per PR-ENV-002.'] },
          { id: '4', heading: '4. Hazards controlled by prerequisites', list: ['Mycotoxins and pesticides in malt: analysis certificate for each supplier batch and annual analysis plan.', 'Allergens: malted barley contains gluten, declared on the label of all references; Bardenas Sin also contains gluten.', 'Cleaning product residues: verification of CIP final rinse by conductivity, per PR-LIM-001.', 'Glass: glass policy and breakage log, per PR-ENV-002.'] },
          { id: '5', heading: '5. Quality hazards', text: ['Oxidation (cardboard flavor), diacetyl and wild yeast contamination are not food safety hazards: they are controlled as quality parameters in the product specification (ET-PT-001) and with PR-FER-003.'] },
          { id: '6', heading: '6. Customer complaints', text: ['Every customer complaint is acknowledged in 24 h and answered in 48 h with the containment applied; the cause is communicated only when there is evidence.', 'Food safety complaints (foreign objects, broken packaging or symptoms) are communicated the same day to the Quality Manager, who assesses withdrawal per PR-CAL-006.', 'Sensory quality complaints are investigated with LIMS LabWare analysis of retained samples from the same batch.'] },
          { id: '7', heading: '7. Verification', text: ['The HACCP team verifies the plan annually by reviewing CCP records, complaints, analyses and audits.'] },
          { id: '8', heading: '8. References', refs: true, list: ['Regulation (EC) 852/2004, on hygiene of foodstuffs.', 'Codex Alimentarius CXC 1-1969, General principles of food hygiene (rev. 2022).', 'Royal Decree 678/2016, beer quality standard.'] }
        ]
      },
      {
        code: 'PR-FER-003',
        title: 'Fermentation and storage control',
        short: 'Fermentation control',
        type: 'Procedure',
        version: '5',
        date: '2026-02-24',
        owner: 'Production',
        summary: 'Lager at 12 °C with 13.5 °C limit. More than 2 h above limit: batch hold pending Master Brewer decision; above 15 °C, critical deviation with diacetyl and acetaldehyde in LIMS every 12 h.',
        sections: [
          { id: '1', heading: '1. Purpose and scope', text: ['Control temperature and fermentation evolution in cylindroconical fermenters FV-01 to FV-16 to obtain each beer profile and avoid defects.'] },
          { id: '2', heading: '2. Setpoints by product', list: ['Bardenas Lager: main fermentation at 12 °C, with 13.5 °C limit; diacetyl rest at 14 °C when reaching 80% attenuation; storage at −1 °C.', 'Bardenas Tostada: fermentation at 13 °C, with 14.5 °C limit.', 'Bardenas Sin: fermentation at 10 °C with low-attenuation yeast, with 11.5 °C limit.'] },
          { id: '3', heading: '3. Monitoring', list: ['SCADA warehouse records each fermenter temperature every minute and regulates glycol jackets via VG valve on each tank.', 'Extract (°Plato) and pH are measured every 24 h and logged in Brewmaxx.', 'SCADA warehouse alarms when temperature exceeds the product limit.'] },
          { id: '4', heading: '4. Temperature deviations', text: ['Above limit for 2 h or less: Maintenance corrects cooling and batch continues, with deviation noted in Brewmaxx.', 'Above limit for more than 2 h: batch hold in Brewmaxx and SAP, no racking or filtration until Master Brewer decision.', 'Above 15 °C in a Lager, the deviation is critical: in addition to hold, LIMS LabWare analyzes diacetyl and acetaldehyde every 12 h and batch is tasted before any racking.'] },
          { id: '5', heading: '5. Batch release criteria', list: ['Total diacetyl (VDK) below 0.10 mg/l before moving to storage.', 'Acetaldehyde below 10 mg/l.', 'Sensory panel approval with at least three trained tasters.', 'If batch fails after extended rest, Master Brewer decides to blend within specification limits, reclassify or destroy.'] },
          { id: '6', heading: '6. Responsibilities', list: ['Master Brewer: decides hold, additional rest and batch fate.', 'Quality: takes samples and validates LIMS analyses.', 'Maintenance Manager: repairs cooling with urgent priority.', 'Production Supervisor: reschedules racking, filtration and packaging affected.'] },
          { id: '7', heading: '7. Records', list: ['Temperature curves: SCADA warehouse.', 'Holds and decisions: Brewmaxx and SAP.', 'Analyses: LIMS LabWare.'] }
        ]
      },
      {
        code: 'PR-CAL-006',
        title: 'Product withdrawal',
        short: 'Product withdrawal',
        type: 'Procedure',
        version: '4',
        date: '2026-01-15',
        owner: 'Quality',
        summary: 'Crisis committee in 1 h; complete batch traceability in 4 h; immediate block in SAP and WMS, customer notice and collection in 48 h; immediate authority notification if food safety.',
        sections: [
          { id: '1', heading: '1. Purpose and scope', text: ['Remove from the market and, if necessary, recover a product that is unsafe or seriously fails to meet its specification, with complete traceability and in minimum time. Applies to bottles, cans and barrels.'] },
          { id: '2', heading: '2. Decision', text: ['Withdrawal is decided by the Crisis Committee (Production Supervisor, Quality Manager, Master Brewer and Logistics Manager), convened within 1 h of learning of the problem.', 'Safety withdrawal: product may harm health. Quality withdrawal: serious defect without health risk, such as oxidation or abnormal carbonation.'] },
          { id: '3', heading: '3. Traceability', list: ['Backward: packaging batch → storage tank → fermenter → wort boil → batches of malt, hops, yeast, water and CO₂ (Brewmaxx and SAP).', 'Forward: pallets and barrels per customer (WMS Mecalux and SAP).', 'Barrels are tracked by barrel number and filling batch; returned empty barrels are logged on return.', 'Objective: complete batch traceability in 4 h from decision.'] },
          { id: '4', heading: '4. Execution', list: ['Immediate stock block in SAP and WMS Mecalux.', 'Notice to each customer within 2 h by phone and in writing, with instructions to immobilize the product.', 'Collection within 48 h and logging of recovered units.', 'Distributors notify their hospitality customers and confirm located units.'] },
          { id: '5', heading: '5. Authorities', text: ['If withdrawal is for safety, immediately notify the Navarra Public Health and Labor Institute, which relays it to AESAN\'s SCIRI alert network.'] },
          { id: '6', heading: '6. Closure', text: ['Quality Manager closes the withdrawal with unit balance: packaged, shipped, in warehouse, recovered and destroyed, with differences justified.', 'A withdrawal simulation is conducted annually, alternating bottle, can and barrel.', 'Public communication, if appropriate, is prepared per PR-COM-001 (Crisis communication).'] },
          { id: '7', heading: '7. References', refs: true, list: ['Regulation (EC) 178/2002, Articles 18 and 19.', 'APPCC-01 · HACCP plan for the Arguedas factory.'] }
        ]
      },
      {
        code: 'PR-ENV-002',
        title: 'Glass and foreign object management',
        short: 'Glass and foreign objects',
        type: 'Procedure',
        version: '6',
        date: '2026-05-11',
        owner: 'Packaging',
        summary: 'Breakage at the filler: stop, remove bottles from affected nozzle and 5 before and after, clean without compressed air and purge the nozzle. EBI verified with test bottles every 2 h.',
        sections: [
          { id: '1', heading: '1. Purpose and scope', text: ['Prevent glass fragments or other foreign objects from reaching product in the bottle line, and control glass and hard plastics throughout the factory.'] },
          { id: '2', heading: '2. Glass register', text: ['All glass and hard plastic in production areas (sight glasses, lamps and screens) is recorded in the glass register and reviewed monthly.', 'Lamps in areas with exposed product have impact protection.'] },
          { id: '3', heading: '3. Breakage at the filler', list: ['Stop the filler and input conveyor.', 'Remove and destroy bottles from the affected nozzle and 5 nozzles before and after, and all open bottles in a 2 m radius.', 'Clean nozzle and star with water pressure and vacuum glass; do not use compressed air.', 'Purge the affected nozzle with three empty fills before resuming.', 'Record the breakage in the breakage log with time, nozzle and bottles discarded, and obtain authorization to resume from the shift leader.'] },
          { id: '4', heading: '4. Empty bottle inspection', list: ['The empty bottle inspector (EBI) rejects bottles with fragments, dirt or mouth defects.', 'Verified at the start of each shift and every 2 h with a set of test bottles: all must be rejected.', 'If verification fails, product packaged since the last correct verification is held and inspected.'] },
          { id: '5', heading: '5. Glass breakage in other areas', text: ['If glass breaks in a production area, the area is cordoned, exposed product is removed, area is cleaned and Quality reviews before resuming.'] },
          { id: '6', heading: '6. Records', list: ['Glass and breakage register: Brewmaxx.', 'EBI verifications: CCP sheet signed by operator and reviewed by Quality.'] }
        ]
      },
      {
        code: 'PR-LIM-001',
        title: 'CIP cleaning of warehouse and packaging',
        short: 'CIP cleaning',
        type: 'Procedure',
        version: '7',
        date: '2026-04-06',
        owner: 'Production',
        summary: '2% caustic soda at 80 °C, 1% acid and peracetic acid at 150 ppm; final rinse verified by conductivity and weekly ATP at filler (150 RLU limit).',
        sections: [
          { id: '1', heading: '1. Purpose and scope', text: ['Clean and disinfect in closed circuit (CIP) fermenters, storage tanks, pipes, filters and fillers.'] },
          { id: '2', heading: '2. Sequence', list: ['Pre-rinse with water until clean.', 'Caustic soda 2% at 80 °C for 30 min.', 'Intermediate rinse with water.', 'Nitric-phosphoric acid 1% at 20 °C for 20 min.', 'Final rinse with water.', 'Disinfection with peracetic acid 150 ppm for 15 min.'] },
          { id: '3', heading: '3. Tanks with CO₂', text: ['In CO₂-filled tanks, CO₂ is purged with air before the caustic phase, because caustic absorbs it and can cause tank depression and collapse.', 'Alternatively, tanks are cleaned with acid only in CO₂ atmosphere, alternating with one caustic cycle every five cleanings.'] },
          { id: '4', heading: '4. Frequencies', list: ['Fermenters and storage tanks: after each emptying.', 'Wort pipes: after each boil.', 'Bottle and barrel fillers: at end of each production and minimum every 24 h.'] },
          { id: '5', heading: '5. Verification', list: ['SCADA warehouse logs concentration and temperature of each phase; if not reached, cycle is invalid and repeated.', 'Final rinse with conductivity equal to mains water, with 50 µS/cm maximum difference.', 'ATP swabs at filler critical points each week, 150 RLU limit, and microbiology of final rinse water.'] },
          { id: '6', heading: '6. Safety', text: ['Caustic and acid are handled with glasses, face shield and gloves; tanks are not opened during the cycle.', 'Before entering a tank, it is locked and CO₂ and oxygen concentration is measured.'] },
          { id: '7', heading: '7. Records', list: ['CIP cycles: SCADA warehouse and Brewmaxx.', 'ATP and microbiology results: LIMS LabWare.'] }
        ]
      },
      {
        code: 'ET-PT-001',
        title: 'Specification of finished product · Bardenas Lager',
        short: 'Specification · Bardenas Lager',
        type: 'Specification',
        version: '4',
        date: '2026-03-02',
        owner: 'Quality',
        summary: 'Lager 4.8% vol with gluten; VDK < 0.10 mg/l; dissolved oxygen in barrel ≤ 50 ppb at filling; shelf life 6 months in barrel; batch L<yy><mm>-<line><no>.',
        sections: [
          { id: '1', heading: '1. Product', text: ['Blonde low-fermentation beer Lager type, filtered and pasteurized. Formats: 33 cl bottle, 33 cl can and 30 l barrel.'] },
          { id: '2', heading: '2. Ingredients and allergens', text: ['Ingredients: water, barley and corn malt, hops.', 'Allergens: contains gluten (barley). Not suitable for people with celiac disease.'] },
          { id: '3', heading: '3. Analytical parameters', list: ['Alcohol content: 4.8% vol (± 0.3).', 'Original gravity: 11.5 °Plato.', 'Bitterness: 20 IBU (± 3).', 'Color: 8 EBC (± 2).', 'Total diacetyl (VDK): below 0.10 mg/l.', 'Total oxygen in packaging (TPO): 150 ppb maximum in bottle and can; dissolved oxygen in barrel: 50 ppb maximum at filling.', 'CO₂: 5.0 g/l (± 0.2).'] },
          { id: '4', heading: '4. Shelf life and storage', text: ['Shelf life: bottle and can, 12 months; barrel, 6 months.', 'Store in a cool place protected from light; barrels, between 4 and 20 °C. A tapped barrel is consumed within 30 days.'] },
          { id: '5', heading: '5. Oxidation', text: ['Oxidation gives cardboard or wet paper flavor and appears sooner with high storage temperatures and high filling oxygen.', 'If suspected, retained samples of the batch are analyzed in LIMS LabWare: filling dissolved oxygen, trans-2-nonenal and sensory panel.'] },
          { id: '6', heading: '6. Batch code', text: ['Format L<yy><mm>-<line><no>. Example: L2608-K14 is batch 14 from the barrel line (K) of August 2026.'] },
          { id: '7', heading: '7. Retained samples', text: ['Three units of each batch are kept for six months after its shelf-life date.'] }
        ]
      }
    ],

    unindexed: {
      'PR-COM-001': { title: 'Crisis communication', mentionedIn: { doc: 'PR-CAL-006', sec: '6', quote: 'per PR-COM-001 (Crisis communication)' } }
    },

    suggested: ['fermentacion', 'oxidacion', 'retirada', 'rotura-vidrio', 'cip', 'gluten'],

    intents: [
      { id: 'fermentacion', icon: 'thermometer', topic: 'Fermentation · temperature deviation', scope: 'all', q: 'What should you do if a fermenter exceeds its temperature limit?', anchors: ['fermenter', 'fermenters', 'fermentation', 'temperature', 'glycol', 'fv-12'], terms: ['exceeds', 'rises', 'limit', 'alarm', 'do', 'heats', 'hold', 'hold', 'batch', 'degrees', 'hours'], min: 3, blocks: [{ t: 'If above limit for 2 h or less, Maintenance corrects cooling and batch continues, noting the deviation in Brewmaxx.', c: [['PR-FER-003', 4, 'Above limit for 2 h or less: Maintenance corrects cooling and batch continues, with deviation noted in Brewmaxx']] }, { t: 'If above limit for more than 2 h, batch is held in Brewmaxx and SAP, no racking or filtration until Master Brewer decides.', c: [['PR-FER-003', 4, 'Above limit for more than 2 h: batch hold in Brewmaxx and SAP, no racking or filtration until Master Brewer decision.']] }, { t: 'In a Lager, above 15 °C the deviation is critical: diacetyl and acetaldehyde in LIMS every 12 h and sensory panel before any racking.', c: [['PR-FER-003', 4, 'Above 15 °C in a Lager, the deviation is critical: in addition to hold, LIMS LabWare analyzes diacetyl and acetaldehyde every 12 h and batch is tasted before any racking.']] }, { t: 'Bardenas Lager setpoint is 12 °C, with 13.5 °C limit.', c: [['PR-FER-003', 2, 'Bardenas Lager: main fermentation at 12 °C, with 13.5 °C limit']] }], context: { systems: ['SCADA warehouse', 'Brewmaxx (MES)', 'LIMS LabWare'], text: 'FV-12 (Bardenas Lager, wort batch L2609-FV12, 480 hl, day 3): 16.8 °C since 02:30 due to glycol valve VG-12 failure, peak 17.1 °C at 05:20. More than 2 h above 13.5 °C and above 15 °C: critical deviation per section 4.', outcome: 'alarm', go: 'alarm', goLabel: 'Open FV-12 alarm' }, followups: ['liberacion', 'fermentacion-quien'] },
      { id: 'liberacion', icon: 'flask', topic: 'Fermentation · batch release', scope: 'all', q: 'What analyses are needed to release a batch held in fermentation?', anchors: ['diacetyl', 'vdk', 'acetaldehyde', 'release', 'release', 'sensory panel'], terms: ['analysis', 'batch', 'held', 'fermentation', 'mg/l', 'criteria', 'storage', 'fate'], min: 3, blocks: [{ list: [{ t: 'Total diacetyl (VDK) below 0.10 mg/l before moving to storage.', c: [['PR-FER-003', 5, 'Total diacetyl (VDK) below 0.10 mg/l before moving to storage.']] }, { t: 'Acetaldehyde below 10 mg/l.', c: [['PR-FER-003', 5, 'Acetaldehyde below 10 mg/l.']] }, { t: 'Sensory panel approval with at least three trained tasters.', c: [['PR-FER-003', 5, 'Sensory panel approval with at least three trained tasters.']] }] }, { t: 'If batch fails after extended rest, Master Brewer decides to blend within specification, reclassify or destroy.', c: [['PR-FER-003', 5, 'If batch fails after extended rest, Master Brewer decides to blend within specification limits, reclassify or destroy.']] }], context: { systems: ['LIMS LabWare', 'Brewmaxx (MES)'], text: 'Batch L2609-FV12 from FV-12 is held: Quality takes samples for diacetyl and acetaldehyde in LIMS every 12 h.', outcome: 'alarm', go: 'alarm', goLabel: 'Open FV-12 alarm' }, followups: ['fermentacion', 'fermentacion-quien'] },
      { id: 'fermentacion-quien', icon: 'users', topic: 'Fermentation · responsibilities', scope: 'all', q: 'Who does what in a fermentation deviation?', anchors: ['responsible', 'responsibilities', 'responsibilities', 'who does', 'master brewer'], terms: ['fermentation', 'deviation', 'fermenter', 'who', 'decides', 'approves', 'racking'], min: 4, blocks: [{ list: [{ t: 'Master Brewer: decides hold, additional rest and batch fate.', c: [['PR-FER-003', 6, 'Master Brewer: decides hold, additional rest and batch fate.']] }, { t: 'Quality: takes samples and validates LIMS analyses.', c: [['PR-FER-003', 6, 'Quality: takes samples and validates LIMS analyses.']] }, { t: 'Maintenance Manager: repairs cooling with urgent priority.', c: [['PR-FER-003', 6, 'Maintenance Manager: repairs cooling with urgent priority.']] }, { t: 'Production Supervisor: reschedules racking, filtration and packaging affected.', c: [['PR-FER-003', 6, 'Production Supervisor: reschedules racking, filtration and packaging affected.']] }] }], context: { systems: ['SCADA warehouse', 'CMMS Maximo', 'Microsoft Teams'], text: 'At today\'s FV-12, Maintenance must repair glycol valve VG-12 and Production reschedule racking; approval is from Master Brewer.', go: 'alarm', goLabel: 'Open FV-12 alarm' }, followups: ['fermentacion', 'liberacion'] },
      { id: 'oxidacion', icon: 'alert-circle', topic: 'Sensory quality · oxidation', scope: 'all', q: 'What do we do if a customer complains about barrels with cardboard flavor?', anchors: ['cardboard', 'oxidation', 'oxidized', 'oxidized', 'oxidized', 'wet paper', 'flavor'], terms: ['customer', 'complains', 'complaint', 'barrel', 'barrels', 'do', 'analysis', 'batch', 'bars'], min: 2, blocks: [{ t: 'Acknowledged in 24 h and answered in 48 h with containment applied; cause communicated only with evidence.', c: [['APPCC-01', 6, 'Every customer complaint is acknowledged in 24 h and answered in 48 h with the containment applied; the cause is communicated only when there is evidence.']] }, { t: 'Oxidation is not a food safety hazard: it is a quality parameter.', c: [['APPCC-01', 5, 'Oxidation (cardboard flavor), diacetyl and wild yeast contamination are not food safety hazards']] }, { t: 'Retained batch samples are analyzed in LIMS: filling dissolved oxygen, trans-2-nonenal and sensory panel.', c: [['ET-PT-001', 5, 'If suspected, retained samples of the batch are analyzed in LIMS LabWare: filling dissolved oxygen, trans-2-nonenal and sensory panel.']] }, { t: 'Barrel allows 50 ppb dissolved oxygen maximum at filling; warm storage speeds oxidation.', c: [['ET-PT-001', 3, 'dissolved oxygen in barrel: 50 ppb maximum at filling'], ['ET-PT-001', 5, 'appears sooner with high storage temperatures and high filling oxygen']] }, { t: 'If defect is severe, Crisis Committee may decide a quality withdrawal.', c: [['PR-CAL-006', 2, 'Quality withdrawal: serious defect without health risk, such as oxidation or abnormal carbonation.']] }], context: { systems: ['Outlook', 'LIMS LabWare', 'WMS Mecalux'], text: 'Distribuciones Hosteleras Ribera, S.L. complains about 30 l barrels of Bardenas Lager with cardboard flavor in three bars: batch L2608-K14, packaged 18/08/2026. Answer in 48 h.', outcome: 'complaint', lot: 'L2608-K14', go: 'complaint', goLabel: 'Open complaint L2608-K14' }, followups: ['retirada', 'barril'] },
      { id: 'barril', icon: 'box', topic: 'Specification · barrel', scope: 'all', q: 'What is the shelf life of a barrel and how is it stored?', anchors: ['shelf life', 'shelf life', 'store', 'stores', 'storage', 'tapped'], terms: ['barrel', 'barrels', 'months', 'days', 'temperature', 'lager', 'bottle', 'can'], min: 2, blocks: [{ t: 'Shelf life of 6 months in barrel and 12 months in bottle and can.', c: [['ET-PT-001', 4, 'Shelf life: bottle and can, 12 months; barrel, 6 months.']] }, { t: 'Barrels are stored between 4 and 20 °C, protected from light, and a tapped barrel is consumed within 30 days.', c: [['ET-PT-001', 4, 'barrels, between 4 and 20 °C. A tapped barrel is consumed within 30 days.']] }], followups: ['oxidacion', 'lote'] },
      { id: 'retirada', icon: 'truck', topic: 'Product withdrawal', scope: 'all', q: 'How is a product withdrawal organized and what are the timelines?', anchors: ['withdrawal', 'withdrawals', 'withdraw', 'recall', 'recover', 'simulation'], terms: ['timeline', 'timelines', 'how', 'organizes', 'customers', 'batch', 'hours', 'committee', 'decides'], min: 2, blocks: [{ t: 'Decided by Crisis Committee, convened within 1 h of learning of the problem.', c: [['PR-CAL-006', 2, 'Withdrawal is decided by the Crisis Committee (Production Supervisor, Quality Manager, Master Brewer and Logistics Manager), convened within 1 h of learning of the problem.']] }, { t: 'Objective: complete batch traceability in 4 h, backward to raw materials and forward by customer and barrel number.', c: [['PR-CAL-006', 3, 'Objective: complete batch traceability in 4 h from decision.'], ['PR-CAL-006', 3, 'Barrels are tracked by barrel number and filling batch']] }, { list: [{ t: 'Immediate stock block in SAP and WMS Mecalux.', c: [['PR-CAL-006', 4, 'Immediate stock block in SAP and WMS Mecalux.']] }, { t: 'Notice to each customer within 2 h with instruction to immobilize product; distributors notify their hospitality customers.', c: [['PR-CAL-006', 4, 'Notice to each customer within 2 h by phone and in writing, with instructions to immobilize the product.'], ['PR-CAL-006', 4, 'Distributors notify their hospitality customers and confirm located units.']] }, { t: 'Collection within 48 h.', c: [['PR-CAL-006', 4, 'Collection within 48 h and logging of recovered units.']] }] }, { t: 'Closed with unit balance, with differences justified.', c: [['PR-CAL-006', 6, 'Quality Manager closes the withdrawal with unit balance: packaged, shipped, in warehouse, recovered and destroyed, with differences justified.']] }], context: { systems: ['Brewmaxx (MES)', 'SAP S/4HANA', 'WMS Mecalux'], text: 'Simulation with barrel batch L2608-K14: 1,040 barrels filled, 912 shipped to 14 customers, 96 in warehouse and 32 held for quality; raw materials MAL-2607-05, LUP-2606-11 and CO2-2608-02. Target: 4 h.', lot: 'L2608-K14', go: 'withdrawal', goLabel: 'Open L2608-K14 simulation' }, followups: ['autoridades', 'comunicacion'] },
      { id: 'autoridades', icon: 'building', topic: 'Withdrawal · authorities', scope: 'all', q: 'Who is notified of a safety withdrawal?', anchors: ['authority', 'authorities', 'notifies', 'notify', 'aesan', 'sciri', 'public health'], terms: ['withdrawal', 'safety', 'who', 'notify', 'immediate'], min: 2, blocks: [{ t: 'Immediately to the Navarra Public Health and Labor Institute, which relays to AESAN\'s SCIRI alert network.', c: [['PR-CAL-006', 5, 'If withdrawal is for safety, immediately notify the Navarra Public Health and Labor Institute, which relays it to AESAN\'s SCIRI alert network.']] }, { t: 'An oxidation withdrawal is for quality, not safety.', c: [['PR-CAL-006', 2, 'Quality withdrawal: serious defect without health risk, such as oxidation or abnormal carbonation.']] }], followups: ['retirada'] },
      { id: 'comunicacion', icon: 'globe', topic: 'Withdrawal · public communication', scope: 'all', kind: 'partial', q: 'How is a withdrawal communicated to the public?', anchors: ['public communication', 'communicates publicly', 'press release', 'press', 'media', 'social media', 'announcement'], terms: ['withdrawal', 'how', 'public', 'consumers'], min: 2, blocks: [{ t: 'If appropriate, public communication is prepared per PR-COM-001.', c: [['PR-CAL-006', 6, 'Public communication, if appropriate, is prepared per PR-COM-001 (Crisis communication).']] }], note: 'PR-COM-001 (Crisis communication) is not among indexed documents: who drafts, who approves and what channels it goes through cannot be detailed from this query.', followups: ['retirada'] },
      { id: 'rotura-vidrio', icon: 'alert-triangle', topic: 'Glass · breakage at filler', scope: 'all', q: 'What should you do if a bottle breaks at the filler?', anchors: ['breakage', 'breaks', 'broken', 'bottle', 'bottles', 'filler', 'glass', 'crystal'], terms: ['do', 'nozzle', 'nozzles', 'clean', 'stop', 'remove', 'resume'], min: 3, blocks: [{ list: [{ t: 'Stop the filler and input conveyor.', c: [['PR-ENV-002', 3, 'Stop the filler and input conveyor.']] }, { t: 'Destroy bottles from affected nozzle and 5 before and after, and open bottles within 2 m.', c: [['PR-ENV-002', 3, 'Remove and destroy bottles from the affected nozzle and 5 nozzles before and after, and all open bottles in a 2 m radius.']] }, { t: 'Clean nozzle and star with water pressure and vacuum; never compressed air.', c: [['PR-ENV-002', 3, 'Clean nozzle and star with water pressure and vacuum glass; do not use compressed air.']] }, { t: 'Purge nozzle with three empty fills.', c: [['PR-ENV-002', 3, 'Purge the affected nozzle with three empty fills before resuming.']] }, { t: 'Record breakage and resume only with shift leader authorization.', c: [['PR-ENV-002', 3, 'Record the breakage in the breakage log with time, nozzle and bottles discarded, and obtain authorization to resume from the shift leader.']] }] }], followups: ['ebi', 'pcc'] },
      { id: 'ebi', icon: 'eye', topic: 'Glass · empty bottle inspection', scope: 'all', q: 'How often is the empty bottle inspector verified?', anchors: ['inspector', 'ebi', 'empty bottle', 'test bottles', 'test'], terms: ['how often', 'verifies', 'verify', 'verification', 'frequency', 'fails', 'shift'], min: 2, blocks: [{ t: 'At the start of each shift and every 2 h, with test bottles that must all be rejected.', c: [['PR-ENV-002', 4, 'Verified at the start of each shift and every 2 h with a set of test bottles: all must be rejected.']] }, { t: 'If verification fails, product packaged since last correct verification is held and inspected.', c: [['PR-ENV-002', 4, 'If verification fails, product packaged since the last correct verification is held and inspected.']] }, { t: 'It is CCP-3 of the HACCP plan.', c: [['APPCC-01', 3, 'CCP-3 · Empty bottle inspection (EBI)']] }], followups: ['rotura-vidrio', 'pcc'] },
      { id: 'pcc', icon: 'shield-check', topic: 'HACCP · critical control points', scope: 'all', q: 'What are the critical control points at the factory?', anchors: ['ccp', 'critical control points', 'critical control point', 'haccp', 'pasteurization', 'pu'], terms: ['which', 'factory', 'limits', 'critical', 'barrel', 'bottle'], min: 2, blocks: [{ list: [{ t: 'CCP-1, tunnel pasteurization of bottle and can: 15 to 25 PU; below 15 PU, hold.', c: [['APPCC-01', 3, 'CCP-1 · Tunnel pasteurization (bottle and can): between 15 and 25 pasteurization units (PU); below 15 PU, product is held and re-pasteurized or destroyed.']] }, { t: 'CCP-2, flash barrel pasteurization: 20 PU minimum at 72 °C, automatic diversion if drops.', c: [['APPCC-01', 3, 'CCP-2 · Flash pasteurization (barrel): 20 PU minimum at 72 °C; if the reading drops below minimum, the pasteurizer automatically diverts the beer to the return tank.']] }, { t: 'CCP-3, empty bottle inspection, verified with test bottles every 2 h.', c: [['APPCC-01', 3, 'CCP-3 · Empty bottle inspection (EBI): rejection of bottles with glass fragments or foreign objects, verified with test bottles at the start of each shift and every 2 h, per PR-ENV-002.']] }] }, { t: 'HACCP team verifies the plan annually.', c: [['APPCC-01', 7, 'The HACCP team verifies the plan annually by reviewing CCP records, complaints, analyses and audits.']] }], followups: ['gluten', 'ebi'] },
      { id: 'gluten', icon: 'leaf', topic: 'Allergens · gluten', scope: 'all', q: 'Do our beers contain gluten?', anchors: ['gluten', 'allergen', 'allergens', 'celiac', 'celiac', 'celiac', 'barley'], terms: ['beer', 'beers', 'contain', 'carries', 'suitable', 'without', 'label'], min: 2, blocks: [{ t: 'Yes: malted barley contains gluten, declared on the label of all references, also Bardenas Sin.', c: [['APPCC-01', 4, 'Allergens: malted barley contains gluten, declared on the label of all references; Bardenas Sin also contains gluten.']] }, { t: 'Bardenas Lager is not suitable for people with celiac disease.', c: [['ET-PT-001', 2, 'Allergens: contains gluten (barley). Not suitable for people with celiac disease.']] }], context: { systems: ['SAP S/4HANA'], text: 'Northgate Beverages Ltd asks about gluten in their qualification questionnaire: the answer is this, with reference to APPCC-01 and ET-PT-001.', go: 'questionnaire', goLabel: 'Open Northgate questionnaire' }, followups: ['pcc', 'lote'] },
      { id: 'cip', icon: 'droplet', topic: 'CIP cleaning', scope: 'all', q: 'What is the CIP cleaning sequence for a fermenter?', anchors: ['cip', 'cleaning', 'cleans', 'caustic', 'acid', 'peracetic', 'disinfection'], terms: ['sequence', 'fermenter', 'tank', 'steps', 'temperature', 'concentration', 'how'], min: 2, blocks: [{ list: [{ t: 'Pre-rinse with water.', c: [['PR-LIM-001', 2, 'Pre-rinse with water until clean.']] }, { t: 'Caustic soda 2% at 80 °C for 30 min.', c: [['PR-LIM-001', 2, 'Caustic soda 2% at 80 °C for 30 min.']] }, { t: 'Rinse and nitric-phosphoric acid 1% at 20 °C for 20 min.', c: [['PR-LIM-001', 2, 'Nitric-phosphoric acid 1% at 20 °C for 20 min.']] }, { t: 'Final rinse and disinfection with peracetic acid 150 ppm for 15 min.', c: [['PR-LIM-001', 2, 'Disinfection with peracetic acid 150 ppm for 15 min.']] }] }, { t: 'In a CO₂-filled tank, purge CO₂ with air before caustic to prevent tank collapse.', c: [['PR-LIM-001', 3, 'CO₂ is purged with air before the caustic phase, because caustic absorbs it and can cause tank depression and collapse']] }, { t: 'Fermenters are cleaned after each emptying.', c: [['PR-LIM-001', 4, 'Fermenters and storage tanks: after each emptying.']] }], followups: ['cip-verificacion'] },
      { id: 'cip-verificacion', icon: 'check-circle', topic: 'CIP cleaning · verification', scope: 'all', q: 'How is it verified that CIP cleaning is correct?', anchors: ['verifies', 'verification', 'conductivity', 'atp', 'rlu', 'rinse'], terms: ['cip', 'cleaning', 'correct', 'valid', 'filler', 'limit'], min: 3, blocks: [{ t: 'SCADA warehouse logs concentration and temperature of each phase; if not reached, cycle is repeated.', c: [['PR-LIM-001', 5, 'SCADA warehouse logs concentration and temperature of each phase; if not reached, cycle is invalid and repeated.']] }, { t: 'Final rinse must have mains water conductivity, with 50 µS/cm maximum difference.', c: [['PR-LIM-001', 5, 'Final rinse with conductivity equal to mains water, with 50 µS/cm maximum difference.']] }, { t: 'Weekly, ATP swabs at filler with 150 RLU limit and microbiology of final rinse water.', c: [['PR-LIM-001', 5, 'ATP swabs at filler critical points each week, 150 RLU limit, and microbiology of final rinse water.']] }], followups: ['cip'] },
      { id: 'lote', icon: 'barcode', topic: 'Batch code', scope: 'all', q: 'How do you read a barrel batch code?', anchors: ['batch code', 'batch format', 'l2608', 'l2608-k14'], terms: ['batch', 'code', 'read', 'reads', 'means', 'barrel', 'line'], min: 2, blocks: [{ t: 'Format L<yy><mm>-<line><no>: L2608-K14 is batch 14 from barrel line (K) of August 2026.', c: [['ET-PT-001', 6, 'Format L<yy><mm>-<line><no>. Example: L2608-K14 is batch 14 from the barrel line (K) of August 2026.']] }, { t: 'Three units of each batch are kept for six months after shelf-life date.', c: [['ET-PT-001', 7, 'Three units of each batch are kept for six months after its shelf-life date.']] }], context: { systems: ['Brewmaxx (MES)', 'SAP S/4HANA', 'WMS Mecalux'], text: 'Complete traceability of the example batch, which is the one from today\'s complaint and simulation:', lot: 'L2608-K14' }, followups: ['retirada', 'barril'] }
    ],

    gaps: [
      { id: 'etiquetado-uk', topic: 'United Kingdom labeling', anchors: ['united kingdom', 'uk', 'ukca', 'british labeling', 'uk label', 'alcohol units', 'importer'], reason: 'No indexed document covers United Kingdom labeling (alcohol units, importer address, warnings).' },
      { id: 'certificados', topic: 'Certifications and audits', anchors: ['brcgs', 'brc', 'ifs', 'certificate', 'certificates', 'certification', 'external audit'], reason: 'Certificates and audit reports are not among indexed documents.' },
      { id: 'sostenibilidad', topic: 'Sustainability and packaging', anchors: ['sustainability', 'footprint', 'carbon', 'emissions', 'recycling', 'recyclable', 'water per liter', 'sddr', 'returnable'], reason: 'No indexed document covers sustainability, carbon footprint or packaging recycling.' },
      { id: 'crisis', topic: 'Crisis communication', anchors: ['spokesperson', 'press conference', 'pr-com-001', 'crisis cabinet'], reason: 'No indexed document describes crisis communication with media and social media.', related: 'PR-COM-001' },
      { id: 'precio', topic: 'Prices and commercial terms', anchors: ['price', 'prices', 'costs', 'cost', 'tariff', 'discount', 'rebate', 'euros'], reason: 'Prices and commercial terms are not part of indexed Quality procedures.' },
      { id: 'personal', topic: 'Working conditions', anchors: ['vacation', 'payroll', 'salary', 'salary', 'agreement', 'contract', 'hours'], reason: 'Working conditions are not part of indexed Quality procedures.' }
    ]
  }
});

/* Canonical summary by code (CN_DATA.procedures): completed without overwriting what other files set. */
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
