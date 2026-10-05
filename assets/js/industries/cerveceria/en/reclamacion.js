/* Cervecera Bardenas · complaint REC-2026-0093 (Bardenas Lager kegs with oxidised taste, lot L2608-K14).
 * Fictional company, customers and persons; synthetic demonstration data (MFM). */
agenticPackEn('cerveceria', {
  reclamacion: {
    code: 'REC-2026-0093',
    nav: 'Complaint REC-2026-0093',
    title: 'Complaint REC-2026-0093',
    agent: 'Customer Complaints',
    nc: 'NC-2026-0141',
    form: { code: 'REG-CAL-006-03', rev: '3' },
    received: { date: '2026-09-28', time: '12:06' },
    due: '2026-09-30',
    holidays: ['2026-10-12'],
    customer_line: 'Distribuciones Hosteleras Ribera (Tudela) · 3 bars',
    due_line: 'Answer by 30/09 at 12:06 · 8D by 13/10/2026',
    cust_name: 'Marisa Garbayo · Distribuciones Hosteleras Ribera',
    cust_addr: 'calidad@dhribera.example',
    own_name: 'Quality · Cervecera Bardenas',
    own_addr: 'calidad@cerveceriabardenas.example',
    mail_domain: 'cerveceriabardenas.example',
    mail_sub: 'calidad@dhribera.example · quality@cerveceriabardenas.example mailbox · Spanish',
    mail_tab_label: 'Distributor Email',
    attachments: ['bar_notices_INC-DHR-26-047.pdf', 'keg_label_photo_K14.jpg', 'warehouse_tasting_report_DHR.pdf'],
    email_text: [
      'From: Marisa Garbayo · Distribuciones Hosteleras Ribera <calidad@dhribera.example>',
      'To: Quality · Cervecera Bardenas <calidad@cerveceriabardenas.example>',
      'Date: Mon, 28 Sep 2026 12:06',
      'Subject: Complaint - Bardenas Lager 30 l keg - cardboard taste - lot L2608-K14 - Ref. INC-DHR-26-047',
      '',
      'Good morning:',
      '',
      'We are writing because in the past week three of our hospitality customers have returned 30-litre kegs of Bardenas Lager due to poor taste. All are from the same lot, L2608-K14, best-before 18/02/2027, which we purchased in the shipment of 20/08 (delivery note ALB-26-08-2211, 168 kegs).',
      '',
      'The bars are:',
      '- Bar Plaza de los Fueros (Tudela): keg tapped 24/09; customers said the beer "tasted like cardboard" and they changed it the same day.',
      '- Asador Ribera Alta (Cintruénigo): keg tapped 25/09, stale and flat taste.',
      '- Cafetería Estación (Castejón): keg tapped 27/09, same problem; they asked us not to serve them more from that lot.',
      '',
      'Our quality technician tasted an unopened keg from the same lot from our warehouse today and it also has that cardboard or wet paper taste, although softer. There are no problems with foam or turbidity, and the pressure and temperature of the tap equipment in all three bars are correct (we checked them in June). In our warehouse the kegs are in a chamber at 8 °C.',
      '',
      'From lot L2608-K14 we have served 124 kegs to 37 bars and we have 44 left in the warehouse, which we have separated. We enclose the notices from the three bars, a photo of the label of a keg and our technician\'s tasting report.',
      '',
      'We ask you:',
      '- a response and your reference within 48 hours, as our agreement states;',
      '- that you replace the 3 returned kegs and the 44 we have separated with beer from another lot, and that you collect the ones from lot L2608-K14;',
      '- payment for the affected kegs and shipping;',
      '- to tell us what happened and whether the rest of the kegs from that lot that our bars have are okay, because it is festival season and we cannot have our customers without beer.',
      '',
      'Best regards,',
      '',
      'Marisa Garbayo',
      'Quality Manager',
      'Distribuciones Hosteleras Ribera, S.L. · Tudela',
      'Tel. 948 000 093'
    ].join('\n'),
    mail_extra: {
      label: 'Distributor tasting report',
      note: 'Tasting report attached by the distributor (PDF converted to text). Agentic Platform uses it to compare the defect with the tasting of the retained sample.',
      headers: { From: 'Distribuciones Hosteleras Ribera · Quality', Subject: 'Tasting Report · INC-DHR-26-047 · unopened keg from lot L2608-K14', Date: 'Mon, 28 Sep 2026 09:30' },
      text: [
        'TASTING REPORT · Distribuciones Hosteleras Ribera, S.L.',
        '',
        'Product: Bardenas Lager · 30 l KeyKeg',
        'Lot: L2608-K14 · best-before 18/02/2027',
        'Sample origin: Tudela warehouse, chamber 2 (8 °C), unopened keg',
        'Tasting date and time: 28/09/2026 09:30 · taster: quality technician (trained in sensory analysis)',
        '',
        'Appearance: bright, golden colour, white and persistent foam. Compliant.',
        'Aroma: note of wet paper or cardboard, medium intensity; flat hops.',
        'Taste: cardboard and some honey; flat bitterness; short finish.',
        'Carbonation: correct.',
        '',
        'Comparison: Bardenas Lager keg from lot L2609-K03 (different lot, same chamber): compliant, no cardboard notes.',
        '',
        'Conclusion: oxidation defect consistent with bar complaints. Lot L2608-K14 (44 kegs) set aside pending manufacturer instructions.'
      ].join('\n'),
      highlights: [
        { text: 'note of wet paper or cardboard, medium intensity', label: 'Defect', tone: 'crit' },
        { text: 'chamber 2 (8 °C)', label: 'Storage', tone: 'ok' },
        { text: 'from lot L2609-K03 (different lot, same chamber): compliant', label: 'Control', tone: 'ok' }
      ]
    },
    highlights: [
      { text: '30 litre Bardenas Lager', label: 'Product', tone: 'brand' },
      { text: 'L2608-K14', label: 'Lot', tone: 'brand' },
      { text: '18/02/2027', label: 'Best-before', tone: 'brand' },
      { text: 'ALB-26-08-2211, 168 kegs', label: 'Delivery Note', tone: 'brand' },
      { text: '"tasted like cardboard"', label: 'Defect', tone: 'crit' },
      { text: 'Bar Plaza de los Fueros (Tudela)', label: 'Bar 1' },
      { text: 'Asador Ribiera Alta (Cintruénigo)', label: 'Bar 2' },
      { text: 'Cafetería Estación (Castejón)', label: 'Bar 3' },
      { text: 'unopened keg from the same lot from our warehouse also has that taste', label: 'Sealed keg', tone: 'crit' },
      { text: 'In our warehouse the kegs are in a chamber at 8 °C', label: 'Storage', tone: 'ok' },
      { text: 'we have served 124 kegs to 37 bars and we have 44 left in the warehouse', label: 'Customer Stock', tone: 'warn' },
      { text: 'within 48 hours', label: 'Deadline' },
      { text: 'INC-DHR-26-047', label: 'Customer Ref' }
    ],
    run: {
      title: 'Workflow "Customer Complaint"',
      sub: 'Launched when a complaint enters the Quality mailbox · PR-CAL-006 and APPCC-01',
      graph_title: 'Customer Complaint Workflow',
      idle_footer: 'Read the email, extract and validate data, trace the keg lot to the beer and raw materials and prepare the 8D and response. Nothing goes out without Quality approval.',
      nodes: [
        { id: 'correo', kind: 'trigger', label: 'Customer Email', sub: 'Quality Mailbox', systems: ['Outlook'], icon: 'mail' },
        { id: 'extraccion', label: 'Extraction and Validation', systems: ['Language Model', 'SAP S/4HANA'], icon: 'search' },
        { id: 'traza', label: 'Lot Traceability', systems: ['SAP S/4HANA', 'Brewmaxx (MES)', 'LIMS LabWare', 'WMS Mecalux', 'GMAO Maximo'], icon: 'git-branch' },
        { id: 'historico', label: 'History, 8D and Response', systems: ['SAP S/4HANA', 'Procedures'], icon: 'clipboard' },
        { id: 'aprobacion', kind: 'approval', label: 'Quality Approval', sub: 'Quality Manager' },
        { id: 'salida', kind: 'output', label: 'Response and Containment', systems: ['Outlook', 'WMS Mecalux', 'SAP S/4HANA'], icon: 'send' }
      ],
      edges: [['correo', 'extraccion'], ['extraccion', 'traza'], ['traza', 'historico'], ['historico', 'aprobacion'], { from: 'aprobacion', to: 'salida', label: 'approved' }],
      graph_at: { 0: { correo: 'done', extraccion: 'active' }, 2: { extraccion: 'done', traza: 'active' }, 9: { traza: 'done', historico: 'active' }, 14: { historico: 'done', aprobacion: 'waiting' } },
      stats: [
        { label: 'Kegs from lot · 912 shipped to 14 customers, 96 in CB-03 and 32 held', value: '1,040' },
        { label: 'Dissolved O₂ at filling in LLB-1 · specification ≤ 50 ppb', value: '64 ppb', tone: 'warn' },
        { label: 'Similar complaints · REC-2025-0217', value: 2, tone: 'warn' },
        { label: 'Working days to respond · due 30/09/2026 12:06', due: true }
      ]
    },
    steps: [
      { system: 'Outlook', action: 'Read email from calidad@dhribera.example in quality@cerveceriabardenas.example mailbox (28/09/2026 12:06)', result: 'Customer complaint in Spanish · 3 attachments (bar notices, label photo and tasting report)', ms: 320 },
      { system: 'Language Model', action: 'Extract complaint data', result: 'Bardenas Lager 30 l keg · lot L2608-K14 · cardboard taste (oxidation) in 3 bars and unopened keg · 124 kegs in 37 bars and 44 in warehouse · ref. INC-DHR-26-047 · answer within 48 hours', ms: 2900 },
      { system: 'SAP S/4HANA', action: 'Validate customer, lot and shipment', result: 'Distribuciones Hosteleras Ribera, S.L. (Tudela) · lot L2608-K14 of Bardenas Lager in 30 l keg · 168 kegs shipped 20/08/2026 with ALB-26-08-2211 · matches email', ms: 410, tone: 'ok' },
      { system: 'Brewmaxx (MES)', action: 'Beer brewing for the lot', result: 'Fermentation lot L2607-FV05: 4 brewings on 21/07 (malt MAL-2607-05, hops LUP-2606-11) · fermentation at 12 °C and storage at 0 °C · filtration to BBT-2 on 14/08 with O₂ of 22 ppb', ms: 380, tone: 'ok' },
      { system: 'Brewmaxx (MES)', action: 'Keg packaging on 18/08/2026', result: 'LLB-1 · order OE-2608-118 · 1,040 kegs with CO₂ CO2-2608-02 · average dissolved O₂ 64 ppb (specification ≤ 50 ppb), head 3 at 91 ppb', ms: 350, tone: 'warn' },
      { system: 'LIMS LabWare', action: 'Release and testing of the lot', result: 'Released with deviation DES-2026-0077 (O₂ out of specification, tasting compliant on 18/08) · retained sample tasting on 28/09: cardboard (trans-2-nonenal) 3 out of 5 · microbiology compliant', ms: 520, tone: 'warn' },
      { system: 'LIMS LabWare', action: 'Compare with bottle from same beer', result: 'L2608-B21 (same beer L2607-FV05, bottle line LB-1): O₂ 35 ppb and tasting on 28/09 compliant · points to keg filling, not the beer', ms: 430, tone: 'ok' },
      { system: 'GMAO Maximo', action: 'Orders on keg filler LLB-1', result: 'OT-2026-05210 · preventive of seals and purge valve of LLB-1 heads, scheduled 15/08 and postponed to 06/10 · today\'s reading: 78 ppb on head 3 (NC-2026-0142)', ms: 460, tone: 'warn' },
      { system: 'WMS Mecalux', action: 'Where is the rest of the lot', result: '1,040 kegs: 912 shipped to 14 customers between 20/08 and 02/09 · 96 in chamber CB-03, not blocked · 32 held by Quality (RET-Q)', ms: 390 },
      { system: 'SAP S/4HANA', action: 'Lot customers and other complaints', result: '14 customers in Navarre, Rioja and Aragon · Distribuciones Hosteleras Ribera is the largest (168 kegs) · no other complaints from the lot so far', ms: 540, tone: 'ok' },
      { system: 'SAP S/4HANA', action: 'Search for similar complaints in last 12 months', result: '6 complaints with NC · 2 similar: REC-2025-0217 (oxidised taste in keg, high O₂ in LLB-1) and REC-2026-0041', ms: 380, tone: 'warn' },
      { system: 'Procedures', action: 'Consult PR-CAL-006, APPCC-01 and PR-ENV-002', result: 'Oxidation is a quality defect, not a health hazard (APPCC-01) · PR-CAL-006: commercial withdrawal to evaluate · response in 48 hours and 8D in 10 working days: by 13/10/2026', ms: 360 },
      { system: 'Language Model', action: 'Draft 8D (D1–D8) with responsibilities by role and dates', result: 'Complete draft · relationship with filling O₂ remains as hypothesis to confirm with returned keg analysis', ms: 5200 },
      { system: 'SAP S/4HANA', action: 'Register non-conformity and link to complaint', result: 'NC-2026-0141 open in draft (Q2 notice) · linked to REC-2026-0093, DES-2026-0077 and NC-2026-0142', ms: 300, tone: 'ok' },
      { system: 'Language Model', action: 'Draft response to distributor and summary for approver', result: 'Draft ready: acknowledgement, reference NC-2026-0141, replacement tomorrow from different lot, collection, payment and 8D date · pending approval', ms: 3100, tone: 'warn' }
    ],
    lot: {
      code: 'L2608-K14',
      noun: 'lot',
      label: 'Lot Code',
      systems: 'SAP S/4HANA, Brewmaxx and WMS Mecalux',
      systems_short: 'SAP and Brewmaxx',
      fix_text: 'If the distributor copied the lot incorrectly, write the correct one. Agentic Platform searches it in SAP and Brewmaxx and verifies it is Bardenas Lager in keg and that it was shipped to this customer before changing anything.',
      same_body: 'Exists in SAP: Bardenas Lager in 30 l keg, packaged 18/08/2026 in LLB-1; 168 kegs shipped to Distribuciones Hosteleras Ribera. No changes.',
      unknown_hint: 'If the code is uncertain, compare it with the keg label photo the distributor attaches.',
      mismatch_body: 'The code exists in the systems, but it is not a keg lot shipped to this customer: the form is not changed.',
      known: {
        'L2607-FV05': { kind: 'mismatch', title: 'L2607-FV05 is the fermentation lot, not the keg lot', body: 'It is the beer used to fill L2608-K14 (and also bottle L2608-B21). The complaint is registered by the keg lot on the label. The form is not changed.' },
        'L2608-B21': { kind: 'same-product', title: 'L2608-B21 is the same beer in bottle', body: 'Exists in SAP: Bardenas Lager in 33 cl bottle from the same fermentation, with compliant tasting. The distributor complains about kegs: to change the lot, confirm with them (label photo). The form is not changed.' },
        'L2609-K03': { kind: 'mismatch', title: 'L2609-K03 is the lot the distributor uses as control', body: 'Exists in SAP and its tasting is compliant per the distributor. It is not the lot being complained about. The form is not changed.' }
      }
    },
    sheet: {
      sub: 'Data extracted from email and verified in SAP, Brewmaxx and LIMS',
      empty_text: 'Agentic Platform will extract from the email the product, lot, defect, bars, customer stock and deadline, and verify them in SAP and Brewmaxx before preparing the 8D and response.',
      rows: [
        { k: 'Reference', v: 'INC-DHR-26-047', code: true, sub: 'Distributor reference · complaint REC-2026-0093' },
        { k: 'Customer', v: 'Distribuciones Hosteleras Ribera, S.L. (Tudela)', sub: 'Hospitality distributor · affected bars in Tudela, Cintruénigo and Castejón' },
        { k: 'Product', v: 'Bardenas Lager · 30 l KeyKeg', ok: 'Matches lot in SAP' },
        { k: 'Lot', lot: true, ok: 'Exists in SAP · packaged 18/08/2026 in LLB-1 · beer L2607-FV05' },
        { k: 'Best-before', v: '18/02/2027', ok: 'Matches SAP' },
        { k: 'Shipment', v: 'ALB-26-08-2211 · 20/08/2026 · 168 kegs', ok: 'Matches SAP and WMS Mecalux' },
        { k: 'Defect', v: 'Cardboard or wet paper taste (oxidation)', sub: 'In 3 bars and unopened keg in distributor warehouse · no foam or turbidity problems' },
        { k: 'Risk', v: 'Quality defect, no health risk', sub: 'APPCC-01 · lot microbiology compliant' },
        { k: 'Customer Stock', v: '124 kegs in 37 bars · 44 set aside in warehouse (8 °C)' },
        { k: 'Evidence', v: 'Notices from 3 bars · label photo · tasting report with control from different lot' },
        { k: 'Deadlines', v: 'Answer by 30/09 at 12:06 · 8D by 13/10/2026', due: true, sub: '48 hours per customer agreement · 8D in 10 working days (12/10 holiday) · PR-CAL-006' },
        { k: 'Register', v: 'NC-2026-0141', code: true, sub: 'Non-conformity in SAP QM, linked to complaint and DES-2026-0077' }
      ]
    },
    requests: {
      items: [
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Response and reference within 48 hours', meta: ['Response to distributor · NC-2026-0141'], quote: 'a response and your reference within 48 hours', side: { pending: { status: 'waiting', label: 'Awaiting approval' }, approved: { status: 'sent', label: 'Sent' }, rejected: { status: 'rejected', label: 'Not sent' } } },
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Replace 47 kegs from different lot and collect K14 kegs', meta: ['D3 · replacement with L2609-K03 on 30/09'], quote: 'that you replace the 3 returned kegs and the 44 we have separated with beer from another lot', side: { pending: { status: 'pending', label: 'Proposed' }, approved: { status: 'ok', label: 'Route scheduled 30/09' }, rejected: { status: 'rejected', label: 'Not scheduled' } } },
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Payment for kegs and shipping', meta: ['SAP SD · payment for 47 kegs and shipping'], quote: 'payment for the affected kegs and shipping', side: { pending: { status: 'pending', label: 'Proposed' }, approved: { status: 'ok', label: 'Payment issued' }, rejected: { status: 'rejected', label: 'Not issued' } } },
        { icon: 'clock', tone: 'warn', title: 'What happened and are the rest of the lot kegs okay?', meta: ['D4 · D3: 124 kegs in 37 bars'], quote: 'to tell us what happened and whether the rest of the kegs from that lot that our bars have are okay', side: { status: 'review', label: 'Hypothesis' } },
        { icon: 'calendar', tone: 'warn', title: '8D Report', meta: ['PR-CAL-006 · 10 working days'], quote: 'because it is festival season and we cannot have our customers without beer', side: { status: 'pending', label: 'By 13/10' } }
      ]
    },
    trace: {
      title: 'Lot L2608-K14 Traceability',
      sub: 'SAP S/4HANA · Brewmaxx · LIMS LabWare · WMS Mecalux · GMAO Maximo · backward and forward',
      button_code: 'L2608-K14',
      button_label: 'Full Traceability · 1,040 kegs',
      back: [
        { time: '21/07', title: 'Brewing and Fermentation · L2607-FV05', text: '4 brewings of 120 hl · malt MAL-2607-05 · hops LUP-2606-11 · fermentation at 12 °C and storage at 0 °C', tone: 'brand', ref: 'L2607-FV05' },
        { time: '14/08', title: 'Filtration to BBT-2', text: 'Dissolved O₂ in tank 22 ppb · compliant', tone: 'ok', ref: 'BBT-2' },
        { time: '15/08', title: 'Maintenance · preventive of LLB-1 postponed', text: 'Seals and purge valve of keg filler heads: scheduled 15/08, postponed to 06/10.', tone: 'warn', ref: 'OT-2026-05210', chip: { status: 'open', label: 'Postponed' } },
        { time: '18/08', timeSub: '06:00', title: 'Keg Packaging · route', route: ['BBT-2', 'LLB-1', 'Head 3', 'Palletised', 'CB-03'], route_mark: 'Head 3', text: 'Order OE-2608-118 · 1,040 kegs · CO₂ CO2-2608-02 · average O₂ 64 ppb (≤ 50), head 3 at 91 ppb', tone: 'warn' },
        { time: '18/08', timeSub: '15:30', title: 'Release with Deviation', text: 'Tasting compliant · O₂ out of specification · released by Quality', tone: 'warn', ref: 'DES-2026-0077' },
        { time: '20/08', title: 'Shipment to Distribuciones Hosteleras Ribera', text: '168 kegs to Tudela', tone: 'brand', ref: 'ALB-26-08-2211' },
        { time: '28/09', title: 'Retained Sample Tasting', text: 'Cardboard notes (trans-2-nonenal) intensity 3 out of 5 · bottle L2608-B21 from same beer, compliant', tone: 'crit', ref: 'LIMS' }
      ],
      fwd_title: 'Forward · kegs from lot',
      fwd_cols: { id: 'Destination', qty: 'Kegs', when: 'Date', status: 'Status' },
      fwd: [
        { id: 'DHR · bars', dest: 'Distribuciones Hosteleras Ribera', sub: '37 bars (3 with complaints)', qty: 124, when: '20/08/2026', status: { status: 'evaluate', label: 'Monitor in bars' } },
        { id: 'DHR · warehouse', dest: 'Tudela Warehouse', sub: 'set aside by customer', qty: 44, when: '20/08/2026', status: { pending: { status: 'pending', label: 'Replacement proposed' }, approved: { status: 'ok', label: 'Collection on 30/09' }, rejected: { status: 'warn', label: 'Set aside' } } },
        { id: '13 customers', dest: 'Other Customers', sub: 'Navarre, Rioja and Aragon', qty: 744, when: '20/08–02/09', status: { status: 'evaluate', label: 'To evaluate (PR-CAL-006)' } },
        { id: 'CB-03', dest: 'Keg Chamber', sub: 'available for shipment', qty: 96, when: 'In stock', status: { pending: { status: 'pending', label: 'Block proposed' }, approved: { status: 'hold', label: 'Blocked' }, rejected: { status: 'pending', label: 'Not blocked' } } },
        { id: 'RET-Q', dest: 'Held by Quality', sub: 'O₂ control', qty: 32, when: 'In stock', status: { status: 'hold', label: 'Held' } }
      ],
      fwd_note: '1,040 kegs filled (312 hl) = 912 shipped to 14 customers + 96 in CB-03 + 32 held · best-before 18/02/2027.',
      hypothesis: {
        title: 'Probable Cause Hypothesis · to be confirmed by Quality and Brewmaster',
        icon: 'flask',
        paras: [
          'The lot was filled on 18/08 with average dissolved oxygen of 64 ppb (specification ≤ 50 ppb) and head 3 of LLB-1 reached 91 ppb; it was released with deviation DES-2026-0077 because tasting that day was compliant. With that oxygen, oxidation (cardboard taste from trans-2-nonenal) appears after a few weeks.',
          'In favour: the retained sample from the lot already tastes like cardboard; the bottle from same beer (L2608-B21, 35 ppb) is fine; the preventive of LLB-1 heads has been postponed since 15/08 and today head 3 reads 78 ppb again. To clarify: whether it affects only kegs from head 3 or the whole lot, and the storage in the bars.',
          'Confirmed with O₂ analysis and tasting of returned kegs and a CB-03 sample by head. Until then, cause is not communicated to the customer and commercial withdrawal of the lot is evaluated per PR-CAL-006.'
        ]
      }
    },
    history: {
      sub: 'SAP QM · last 12 months',
      rows: [
        { id: 'REC-2025-0217', date: '2025-10-14', product: 'Bardenas Lager 30 l keg', lot: 'L2509-K07', description: 'Oxidised taste in kegs from distributor', category: 'Taste', customer_label: 'Bebidas Ebro Distribución', root_cause: 'High O₂ in LLB-1 from worn purge valve seal', nc: 'NC-2025-0188', status: 'closed', similar: true },
        { id: 'REC-2026-0041', date: '2026-04-22', product: 'Bardenas Roasted 20 l keg', lot: 'L2604-K02', description: 'Flat and stale taste', category: 'Taste', customer_label: 'Grupo Bares Plaza', root_cause: 'Kegs stored in sun in customer patio for weeks', nc: 'NC-2026-0064', status: 'closed', similar: true },
        { id: 'REC-2026-0077', date: '2026-07-30', product: 'Bardenas Sin 33 cl bottle', lot: 'L2607-B09', description: 'Bottles with low fill level', category: 'Packaging', customer_label: 'Comercial Rioja Baja', root_cause: 'Fill valve adjustment on bottle filler', nc: 'NC-2026-0119', status: 'closed', similar: false },
        { id: 'REC-2026-0058', date: '2026-06-03', product: 'Bardenas Lager 33 cl bottle', lot: 'L2605-B14', description: 'Glass fragment in bottle neck', category: 'Foreign Body', customer_label: 'Hotel Tres Reyes', root_cause: 'Chipped bottle in transport from glass supplier; empty bottle inspector adjusted', nc: 'NC-2026-0091', status: 'closed', similar: false },
        { id: 'REC-2026-0012', date: '2026-01-19', product: 'Bardenas Lager 30 l keg', lot: 'L2601-K05', description: 'Excess foam on tap', category: 'Service', customer_label: 'Cervecería El Tubo', root_cause: 'Tap equipment pressure poorly regulated', nc: 'NC-2026-0015', status: 'closed', similar: false },
        { id: 'REC-2025-0233', date: '2025-11-05', product: 'Bardenas Roasted 33 cl bottle', lot: 'L2510-B03', description: 'Label without lot code', category: 'Labelling', customer_label: 'Northgate Beverages (UK)', root_cause: 'Filler lot encoder failure', nc: 'NC-2025-0201', status: 'closed', similar: false }
      ],
      note: {
        title: 'Same cause type as REC-2025-0217',
        body: 'In October 2025, oxidised taste in keg was due to a worn seal on the purge valve of LLB-1 that allowed oxygen into filling. If the hypothesis is confirmed, it would be the second time in a year from the same filler: the 8D proposes in D7 not to release keg lots with O₂ above specification and not to postpone preventive maintenance on heads.'
      }
    },
    plan: {
      title: 'Draft 8D · NC-2026-0141',
      sub: 'PR-CAL-006 · to distributor by 13/10/2026 with D1–D5; D6–D8 in follow-up',
      col_label: 'Discipline',
      containment_status: { pending: { text: 'Awaiting approval', tone: 'warn' }, approved: { text: 'Applied', tone: 'ok' }, rejected: { text: 'Not applied', tone: 'neutral' } },
      rows: [
        { d: 'D1', title: 'Team', owner: ['Quality Manager'], date: '2026-09-29', status: { text: 'Proposed', tone: 'draft' }, lead: 'Leader: Quality Manager.', items: ['On-duty Quality Technician: O₂ analysis and tasting of returned kegs and warehouse', 'Brewmaster: sensory and packaging process evaluation', 'Maintenance Manager: LLB-1, head 3 and OT-2026-05210', 'Logistics Manager: replacement, collection and block in CB-03', 'Customer Service: contact with distributor and bars'], note: 'External contact: Marisa Garbayo (Distribuciones Hosteleras Ribera).' },
        { d: 'D2', title: 'Problem Description', owner: ['On-duty Quality Technician'], date: '2026-09-29', status: { text: 'Complete', tone: 'ok' }, lead: 'Cardboard taste (oxidation) in 30 l kegs of Bardenas Lager from lot L2608-K14 in three bars of Distribuciones Hosteleras Ribera and unopened keg from warehouse. No health risk.', items: ['Lot L2608-K14, best-before 18/02/2027, packaged 18/08/2026 in LLB-1 with beer L2607-FV05: 1,040 kegs (312 hl)', 'Kegs tapped 24, 25 and 27/09; complaint received 28/09/2026 at 12:06', 'Retained sample with cardboard 3 out of 5; bottle from same beer compliant', 'Evidence: notices from bars, label photo and tasting report with control keg'] },
        { d: 'D3', title: 'Containment', owner: ['Quality Manager', 'Logistics Manager'], date: '2026-09-30', containment: true, items: ['Block in WMS Mecalux and SAP QM the 96 kegs from lot in CB-03', 'Replace on 30/09 the 3 returned kegs and 44 set aside by distributor with Bardenas Lager from lot L2609-K03 and collect kegs from lot L2608-K14', 'Payment for 47 kegs and shipping to distributor', 'Analyse O₂ and taste collected kegs and CB-03 sample from each head', 'Evaluate with Brewmaster commercial withdrawal of 744 kegs to other 13 customers and 124 kegs in bars from Ribera (PR-CAL-006)'] },
        { d: 'D4', title: 'Root Cause', owner: ['Quality Manager', 'Brewmaster'], date: '2026-10-02', status: { text: 'Hypothesis', tone: 'warn' }, lead: 'Main hypothesis, to confirm: oxygen entry during filling from head 3 of LLB-1 (91 ppb on 18/08; 78 ppb today), with preventive maintenance of seals and purge valve postponed (OT-2026-05210).', items: ['In favour: lot average O₂ 64 ppb vs ≤ 50; retained sample with cardboard; bottle from same beer compliant; same cause as REC-2025-0217', 'To clarify: whether all kegs from lot are affected or only those from head 3; storage in bars', 'Verification: O₂ and tasting by head in returned kegs and CB-03, seal and valve inspection and 5-why analysis'] },
        { d: 'D5', title: 'Corrective Actions', owner: ['Maintenance Manager'], date: '2026-10-02', status: { text: 'Scheduled', tone: 'info' }, items: ['Advance OT-2026-05210: change seals and purge valve of head 3 of LLB-1', 'Do not fill kegs from head 3 until O₂ verified ≤ 50 ppb in 3 consecutive fills'] },
        { d: 'D6', title: 'Implementation and Effectiveness', owner: ['On-duty Quality Technician'], date: '2026-10-16', status: { text: 'Scheduled', tone: 'info' }, items: ['O₂ ≤ 50 ppb on all LLB-1 heads for 10 consecutive shifts', 'Tasting at 4 weeks of 3 keg lots with no cardboard notes'] },
        { d: 'D7', title: 'Recurrence Prevention', owner: ['Quality Manager'], date: '2026-10-23', status: { text: 'Scheduled', tone: 'info' }, items: ['Review PR-CAL-006: do not release keg lots with O₂ above specification even if tasting is compliant (oxidation appears weeks later)', 'Do not allow preventive maintenance of LLB-1 heads to be postponed more than 15 days (second time in a year)', 'Automatic alert when a head exceeds 50 ppb in two consecutive fills'] },
        { d: 'D8', title: 'Closure and Recognition', owner: ['Quality Manager'], date: '2026-10-30', status: { text: 'Scheduled', tone: 'info' }, items: ['Final report to Distribuciones Hosteleras Ribiera and closure of NC-2026-0141 with effectiveness evidence', 'Team recognition'] }
      ]
    },
    reply: {
      to_label: 'to distributor',
      subject: 'RE: Complaint - Bardenas Lager 30 l keg - cardboard taste - lot L2608-K14 - Ref. INC-DHR-26-047 - Ref. Bardenas NC-2026-0141',
      sub: 'To calidad@dhribera.example · in Spanish',
      tab_label: 'Sending',
      text: [
        'Hello, Marisa:',
        '',
        'Thank you for your email of 28 September and for the tasting report, which helps us a lot. We confirm receipt of complaint INC-DHR-26-047 for cardboard taste in 30 l kegs of Bardenas Lager from lot L2608-K14. We apologise for the inconvenience to you and your hospitality customers.',
        '',
        'Our reference is NC-2026-0141. It is a quality taste defect that poses no health risk.',
        '',
        'What we have done and what we will do:',
        '- We have blocked in our warehouse the kegs from that lot that had not yet been dispatched.',
        '- Tomorrow, 30 September, our Ribera route truck will bring you 47 kegs of Bardenas Lager from another lot to replace the 3 returned and 44 you have set aside, and will collect the kegs from lot L2608-K14. If a different time suits you better, let us know today.',
        '- We will issue payment for the 47 kegs and shipping as soon as we collect them.',
        '- We will test the kegs we collect in our laboratory.',
        '',
        'Regarding the kegs from the lot your bars have: if any bar notices the same taste, please tell us and we will replace it within 24 hours. We will confirm in the coming days whether it is advisable to replace the rest preventively.',
        '',
        'We will send you the 8D report with root cause and corrective and preventive actions by 13 October 2026 at the latest.',
        '',
        'Best regards,',
        '',
        'Quality Department',
        'Cervecera Bardenas, S.A. · Arguedas Brewery',
        'calidad@cerveceriabardenas.example'
      ].join('\n'),
      highlights: [
        { text: 'NC-2026-0141', label: 'Reference', tone: 'brand' },
        { text: 'poses no health risk', label: 'Risk', tone: 'brand' },
        { text: 'We have blocked in our warehouse the kegs from that lot', label: 'Containment', tone: 'brand' },
        { text: 'will bring you 47 kegs of Bardenas Lager from another lot', label: 'Replacement', tone: 'brand' },
        { text: 'by 13 October 2026 at the latest', label: 'Commitment', tone: 'brand' }
      ],
      criterion: 'Writing criterion: confirms SAP and WMS facts, clarifies no health risk and commits replacement, payment and dates; does not anticipate cause (O₂ filling relationship not confirmed) or announce lot withdrawal.',
      control: {
        label: 'Summary for Approver',
        note: 'Internal summary accompanying approval; not sent to distributor.',
        edited_note: 'Summary corresponds to Agentic Platform draft; edited version includes Quality changes to sending text.',
        subject: 'Internal Summary · REC-2026-0093 · NC-2026-0141',
        text: [
          'What is approved:',
          '1. Send response to distributor (due 30/09 at 12:06).',
          '2. Block in WMS Mecalux and SAP QM of 96 kegs from lot L2608-K14 in CB-03 (today available for shipment).',
          '3. Replacement order of 47 kegs from lot L2609-K03 on Ribiera route of 30/09 and collection of K14 kegs.',
          '4. Payment of 47 kegs and shipping to Distribuciones Hosteleras Ribiera.',
          '',
          'What the response does NOT say, on purpose:',
          '- Does not give a cause: filling O₂ (64 ppb, released with DES-2026-0077) is the main hypothesis, need to analyse kegs.',
          '- Does not announce withdrawal: commercial withdrawal of 868 kegs in customers is evaluated with Brewmaster (PR-CAL-006) in "Mock Withdrawal".',
          '',
          'Risk if not approved today: fails 48-hour agreement deadline and 96 kegs in CB-03 may leave on this week\'s routes (Ribiera festivals).'
        ].join('\n')
      }
    },
    approval: {
      title: 'Response to Distribuciones Hosteleras Ribiera and Containment',
      approver: 'Quality Manager',
      policy: 'PR-CAL-006 · APPCC-01',
      summary: {
        pending: 'Agentic Platform has prepared the response for calidad@dhribera.example, replacement and collection of 47 kegs, payment and blocking of lot kegs remaining in factory. Nothing is sent or blocked until Quality approves.',
        approved: 'Quality has approved the response and containment. Agentic Platform has sent the email to the distributor, blocked 96 kegs in CB-03, created replacement and payment and updated NC-2026-0141.',
        rejected: 'Quality has rejected the proposal: response not sent, no kegs blocked, replacement not scheduled.'
      },
      scope: [
        { label: 'Response to Distributor', state: { pending: { status: 'pending', chip: 'Send' }, approved: { status: 'sent', chip: 'Sent' }, rejected: { status: 'rejected', chip: 'Not Sent' } } },
        { label: 'Kegs in CB-03', value: '96 kegs · L2608-K14', state: { pending: { status: 'pending', chip: 'Block' }, approved: { status: 'hold', chip: 'Blocked' }, rejected: { status: 'rejected', chip: 'Not Blocked' } } },
        { label: 'Replacement and Collection', value: '47 kegs · L2609-K03 · 30/09', state: { pending: { status: 'pending', chip: 'Schedule' }, approved: { status: 'ok', chip: 'Scheduled' }, rejected: { status: 'rejected', chip: 'Not Scheduled' } } },
        { label: 'Payment to Distributor', value: '47 kegs and shipping', state: { pending: { status: 'pending', chip: 'Issue' }, approved: { status: 'ok', chip: 'Issued' }, rejected: { status: 'rejected', chip: 'Not Issued' } } },
        { label: 'Kegs in Other Customers', value: '868 kegs · 14 customers', state: { status: 'evaluate', chip: 'Per PR-CAL-006' } }
      ],
      effects: [
        'Outlook: response sent from calidad@cerveceriabardenas.example',
        'WMS Mecalux and SAP QM: quality block of 96 kegs from lot L2608-K14 in CB-03',
        'SAP S/4HANA (SD): replacement order for 47 kegs, collection order and payment to distributor',
        'SAP S/4HANA (QM): NC-2026-0141 moves to "In Progress" with response attached'
      ],
      next_step: 'Next step: analyse O₂ and taste collected kegs on 30/09 (D4), evaluate commercial withdrawal with Brewmaster and send 8D by 13/10/2026.',
      toast_approved: 'Response sent to Distribuciones Hosteleras Ribiera · 96 kegs blocked and replacement scheduled',
      reject_text: 'Response not sent, no kegs blocked, replacement not scheduled. Reason remains in audit log.',
      reject_placeholder: 'For example: wait for Brewmaster tasting before responding',
      reject_audit: 'nothing is sent or blocked',
      toast_rejected: 'Response rejected: nothing sent and no kegs blocked'
    },
    compare: {
      rows: [
        { k: 'People involved', hoy: '4: Quality, Brewmaster, Logistics and Customer Service', pro_strong: '1', pro: ': Quality reviews, corrects if needed and approves' },
        { k: 'Systems to open', hoy: '6: Outlook, SAP, Brewmaxx, LIMS, WMS and Maximo', pro_strong: '1', pro: ': this console; Agentic Platform consults all 6' }
      ],
      steps_today: '12–15 searches, cross-checks and manual drafting',
      time_label: 'Traceability, draft 8D and response',
      time_today: '2–5 hours of work, spread over 1–2 days',
      footer: 'Proposed acceptance criterion for pilot: traceability and draft in under 15 minutes, 100% of responses within 48 hours and Quality accepts draft with minor edits in at least 70% of cases.'
    },
    audit: {
      requested: { action: 'Complaint analysis requested', detail: 'REC-2026-0093 · email from calidad@dhribera.example of 28/09/2026 12:06' },
      analyzed: { action: 'Complaint Analysed', detail: 'REC-2026-0093 · lot L2608-K14 · Bardenas Lager 30 l keg' },
      after_analysis: [
        { action: 'Non-conformity recorded in draft', detail: 'NC-2026-0141 · SAP QM · linked to REC-2026-0093, DES-2026-0077 and NC-2026-0142' },
        { action: 'Draft 8D prepared', detail: 'NC-2026-0141 · D1–D8 · Filling O₂ as hypothesis' },
        { action: 'Response to customer drafted', detail: 'REC-2026-0093 · Spanish · version 1 · awaiting approval' }
      ],
      approved: { action: 'Response approved and sent', detail: 'REC-2026-0093 · to calidad@dhribera.example · NC-2026-0141' },
      after_approval: [
        { action: 'Quality block applied', detail: 'WMS Mecalux and SAP QM · 96 kegs from lot L2608-K14 in CB-03' },
        { action: 'Replacement and collection scheduled', detail: 'SAP SD · 47 kegs from lot L2609-K03 · Ribiera route 30/09' },
        { action: 'Payment issued', detail: 'SAP SD · 47 kegs and shipping · Distribuciones Hosteleras Ribiera' },
        { action: 'Non-conformity updated', detail: 'NC-2026-0141 · In Progress · response attached' }
      ]
    },
    outcome_label: 'Response sent · NC-2026-0141 in progress',
    toast_analyzed: 'Complaint Analysed · 8D and response in draft',
    report: {
      button: 'Download 8D Report',
      title: '8D Report · complaint REC-2026-0093',
      subtitle: 'Cardboard taste (oxidation) in Bardenas Lager 30 l keg · lot L2608-K14 · Distribuciones Hosteleras Ribiera',
      filename: '8D-report-NC-2026-0141-REC-2026-0093',
      meta: [['Brewery', 'Arguedas'], ['Complaint', 'REC-2026-0093 · 28/09/2026 · customer ref INC-DHR-26-047'], ['Lot', 'L2608-K14 · LLB-1 · 18/08/2026'], ['Report to Customer', 'by 13/10/2026']],
      state: { pending: 'Draft · awaiting approval', approved: 'Approved for sending · D4 open', rejected: 'Draft · response rejected' },
      summary: [
        'Complaint from Distribuciones Hosteleras Ribiera, S.L. (Tudela): cardboard taste (oxidation) in 30 l kegs of Bardenas Lager from lot L2608-K14 in three bars and unopened keg from warehouse. Quality defect, no health risk.',
        'Lot packaged 18/08/2026 in LLB-1 with beer from fermentation lot L2607-FV05: 1,040 kegs, of which 912 were shipped to 14 customers, 96 remain in CB-03 and 32 are held.',
        'Probable cause hypothesis, pending confirmation with returned keg analysis: oxygen entry during filling from head 3 of LLB-1 (average O₂ 64 ppb, head 3 at 91 ppb; released with DES-2026-0077), with preventive maintenance of heads postponed.'
      ],
      trace_heading: 'Annex A · Lot Traceability',
      trace_rows: [
        { etapa: 'Malt', fecha: '14/07/2026', detalle: 'Pilsen Malt MAL-2607-05 (Maltas de Castilla) in silo 2', ref: 'MAL-2607-05' },
        { etapa: 'Brewing and Fermentation', fecha: '21/07/2026', detalle: '4 brewings of 120 hl to FV-05 · hops LUP-2606-11 · 12 °C and storage at 0 °C', ref: 'L2607-FV05' },
        { etapa: 'Filtration', fecha: '14/08/2026', detalle: 'Filtration and stabilisation to BBT-2 · O₂ 22 ppb', ref: 'BBT-2' },
        { etapa: 'Maintenance', fecha: '15/08/2026', detalle: 'Preventive of seals and purge valve of LLB-1 heads postponed to 06/10', ref: 'OT-2026-05210' },
        { etapa: 'Packaging', fecha: '18/08/2026 06:00', detalle: 'LLB-1 · 1,040 kegs · CO₂ CO2-2608-02 · average O₂ 64 ppb, head 3 at 91 ppb', ref: 'OE-2608-118' },
        { etapa: 'Release', fecha: '18/08/2026 15:30', detalle: 'Released with deviation: O₂ out of specification, tasting compliant', ref: 'DES-2026-0077' },
        { etapa: 'Shipment', fecha: '20/08/2026', detalle: '168 kegs to Distribuciones Hosteleras Ribiera (Tudela)', ref: 'ALB-26-08-2211' },
        { etapa: 'Complaint', fecha: '28/09/2026 12:06', detalle: 'Cardboard taste in 3 bars and unopened keg', ref: 'REC-2026-0093' },
        { etapa: 'Analysis', fecha: '28/09/2026', detalle: 'Retained sample with cardboard 3/5 · bottle L2608-B21 compliant', ref: 'LIMS' }
      ],
      units: {
        heading: 'Annex B · Kegs from lot L2608-K14 by Destination',
        cols: [{ label: 'Destination', key: 'dest' }, { label: 'Location', key: 'loc' }, { label: 'Kegs', key: 'n', num: true }, { label: 'Delivery Note', key: 'ref', mono: true }, { label: 'Status', key: 'estado', status: true }],
        rows: [
          { dest: 'Distribuciones Hosteleras Ribera, S.L.', loc: 'Tudela', n: 168, ref: 'ALB-26-08-2211', estado: 'Complaint · 44 set aside', estado_after: 'Complaint · 47 in replacement' },
          { dest: 'Bebidas Ebro Distribución, S.L.', loc: 'Zaragoza', n: 142, ref: 'ALB-26-08-2214', estado: 'Shipped' },
          { dest: 'Distribuciones Cierzo Hospitality, S.A.', loc: 'Pamplona', n: 96, ref: 'ALB-26-08-2230', estado: 'Shipped' },
          { dest: 'Comercial Rioja Baja, S.L.', loc: 'Calahorra', n: 74, ref: 'ALB-26-08-2233', estado: 'Shipped' },
          { dest: 'Bebidas Bardenas Logroño, S.L.', loc: 'Logroño', n: 66, ref: 'ALB-26-08-2290', estado: 'Shipped' },
          { dest: 'Club Deportivo Arenas', loc: 'Logroño', n: 60, ref: 'ALB-26-08-2302', estado: 'Shipped' },
          { dest: 'Moncayo Hospitality Distribution, S.L.', loc: 'Tarazona', n: 58, ref: 'ALB-26-08-2305', estado: 'Shipped' },
          { dest: 'Grupo Bares Plaza, S.L.', loc: 'Zaragoza', n: 52, ref: 'ALB-26-08-2318', estado: 'Shipped' },
          { dest: 'Distribuciones Arga, S.L.', loc: 'Estella', n: 48, ref: 'ALB-26-08-2340', estado: 'Shipped' },
          { dest: 'Tudelana Beverage Distribution, S.L.', loc: 'Tudela', n: 40, ref: 'ALB-26-08-2342', estado: 'Shipped' },
          { dest: 'Catering Navarro, S.L.', loc: 'Pamplona', n: 36, ref: 'ALB-26-08-2361', estado: 'Shipped' },
          { dest: 'Cervecería El Tubo', loc: 'Zaragoza', n: 30, ref: 'ALB-26-08-2398', estado: 'Shipped' },
          { dest: 'Restaurantes La Ribera, S.L.', loc: 'Tudela', n: 24, ref: 'ALB-26-09-0012', estado: 'Shipped' },
          { dest: 'Hotel Tres Reyes', loc: 'Pamplona', n: 18, ref: 'ALB-26-09-0031', estado: 'Shipped' },
          { dest: 'Keg Chamber CB-03', loc: 'Arguedas', n: 96, ref: 'WMS', estado: 'Available', estado_after: 'Blocked' },
          { dest: 'Held by Quality RET-Q', loc: 'Arguedas', n: 32, ref: 'WMS', estado: 'Held' }
        ]
      },
      history_heading: 'Annex C · Previous Complaints (12 months)',
      approvals: [
        { paso: 'Draft 8D and Response', rol: 'Agentic Platform · Customer Complaints Agent', kind: 'agent' },
        { paso: 'Response to Customer and Containment (D3)', rol: 'Quality Manager', kind: 'reply' },
        { paso: 'Root Cause Confirmation (D4)', rol: 'Quality Manager · Brewmaster', kind: 'pending' },
        { paso: '8D Closure (D8)', rol: 'Quality Manager', kind: 'pending' }
      ],
      second_signer: { role: 'Brewmaster', note: 'Sensory evaluation and commercial withdrawal assessment (D3–D4) · pending' }
    },
    presenter: {
      running: 'While running: point out the Brewmaxx line (64 ppb O₂ at filling, head 3 at 91) and LIMS (bottle from same beer is fine). If needed, "Accelerate".',
      idle: [
        'Email from Distribuciones Hosteleras Ribiera, our largest distributor in La Ribiera: three bars have returned kegs of Bardenas Lager for cardboard taste, all from lot L2608-K14. It arrived yesterday at 12:06 and their agreement asks for response in 48 hours.',
        'In production, Agentic Platform analyses it as soon as it enters the Quality mailbox. Here we launch it manually to see what it does and what systems it consults.'
      ],
      pending: [
        'The highlighted text in the email is what Agentic Platform extracted. Each data point is verified in SAP: the lot exists, it is keg Lager and 168 kegs were shipped to them on 20/08.',
        'The traceability: from malt and fermentation to filling in LLB-1 and to 14 customers. 912 kegs out, 96 in our chamber not blocked and 32 held.',
        'The data that changes the investigation: the lot was filled with 64 ppb oxygen, above specification, and released with deviation because tasting was good. The bottle from same beer is fine. It\'s a hypothesis, not the cause.',
        'History: the same thing happened in October 2025 from a seal on the same filler. The 8D proposes not to release keg with high O₂ and not to postpone preventive maintenance.',
        'The response clarifies no health risk, commits replacement, collection and payment, and does not anticipate cause or announce withdrawal. Nothing goes out until Quality approves.'
      ],
      approved: [
        'Approved: response sent, 96 kegs blocked, replacement and collection of 47 kegs tomorrow and payment issued. Everything stays in the audit log.',
        'The comparison below: today, 4 people and 6 systems for hours; here, one review and approval within 48 hours.',
        'The 8D report downloads as a controlled document: code, revision, status, approvals and page number.'
      ],
      next: {
        pending: 'Click "Review and Approve" (above) or scroll to the response and click "Approve and Send". Optional: "Fix" the lot with a non-existent one to show it doesn\'t invent data.',
        approved: 'Click "Download 8D Report" and show the document header. Then move to "Mock Withdrawal" for lot L2608-K14.'
      }
    }
  }
});
