/* Mercados Moncayo · complaint ATC-2026-0412 (glass fragment in Tomate frito Moncayo, batch L26214). English version.
 * Fictitious company, suppliers and people; synthetic demo data (MFM). */
agenticPackEn('retail', {
  reclamacion: {
    code: 'ATC-2026-0412',
    nav: 'Complaint ATC-2026-0412',
    title: 'Complaint ATC-2026-0412',
    agent: 'Consumer complaints',
    nc: 'INC-PRO-2026-0058',
    form: { code: 'REG-CAL-010-04', rev: '2' },
    received: { date: '2026-09-28', time: '21:37' },
    due: '2026-09-30',
    customer_line: 'Javier Lasheras (Club Moncayo) · store T-011 Zaragoza Delicias',
    due_line: 'Reply to the consumer by 21:37 on 30/09 · manufacturer’s 8D within 10 days',
    cust_name: 'Javier Lasheras',
    cust_addr: 'javier.lasheras@correo.example',
    own_name: 'Consumer Care · Mercados Moncayo',
    own_addr: 'atencion.consumidor@mercadosmoncayo.example',
    mail_domain: 'mercadosmoncayo.example',
    mail_title: 'Consumer’s message',
    mail_sub: 'Mercados Moncayo app · “Contact us” form · Consumer Care mailbox',
    mail_tab_label: 'App message',
    attachments: ['foto_tarro_etiqueta.jpg', 'foto_fragmento_vidrio.jpg', 'foto_boca_tarro.jpg'],
    email_text: [
      'From: Javier Lasheras (Mercados Moncayo app) <javier.lasheras@correo.example>',
      'To: Consumer Care · Mercados Moncayo <atencion.consumidor@mercadosmoncayo.example>',
      'Date: Mon, 28 Sep 2026 21:37',
      'Subject: [App · Contact us] Product complaint - Glass in Tomate frito Moncayo',
      '',
      'Club Moncayo card: 2601 0000 4418 · Usual store: T-011 Zaragoza Delicias',
      'Reason: Problem with a product · Category: Food safety',
      '',
      'Hello,',
      '',
      'Tonight, while eating macaroni with tomato sauce, I felt something hard and sharp as I chewed and spat it out: it was a piece of clear glass about 5 mm long. The sauce came from a jar of Tomate frito Moncayo 400 g (fried tomato sauce) that I bought on Saturday 26 September at your Delicias store (T-011), using my Club card. I opened the jar today; it was properly sealed and the lid went “pop” when I opened it.',
      '',
      'The label says batch L26214 and best before 08/2028. I am sending you photos of the label, the piece of glass and the rim of the jar, which does not look broken to the naked eye.',
      '',
      'Luckily I did not cut myself and I am fine, but my 6-year-old daughter also ate from that plate and I am quite worried. I am keeping the jar with the rest of the sauce and the piece of glass in a bag.',
      '',
      'I would like you to:',
      '- tell me whether I need to do anything or go to the doctor, because of my daughter;',
      '- come and collect the jar and the glass, or tell me where to take them;',
      '- refund me for the jar;',
      '- tell me whether there are more jars like this, because I have another one in the cupboard and my mother also buys this sauce.',
      '',
      'I look forward to hearing from you soon.',
      '',
      'Javier Lasheras',
      'Tel. 676 000 412'
    ].join('\n'),
    mail_extra: {
      label: 'Till receipt (Loyalty CRM)',
      note: 'Purchase linked to the consumer’s Club card, retrieved from the CRM and the store POS. Agentic Platform uses it to check the purchase, the store and the date.',
      headers: { From: 'POS T-011 Zaragoza Delicias · till 3', Subject: 'Receipt 011-3-260926-0187 · Club Moncayo 2601 0000 4418', Date: 'Sat, 26 Sep 2026 18:52' },
      text: [
        'MERCADOS MONCAYO · T-011 ZARAGOZA DELICIAS',
        'Av. de Madrid, Zaragoza · Tax ID A-00000412',
        '',
        'Receipt 011-3-260926-0187        26/09/2026 18:52',
        'Till 3 · Cashier 0114',
        '',
        'MONCAYO MACARONI 500 G             0.89',
        'TOMATE FRITO MONCAYO 400 G   2 x   1.15    2.30',
        'MONCAYO GRATED CHEESE 150 G        1.79',
        'SEMI-SKIMMED MILK 6 X 1 L          5.34',
        'CANARY BANANAS (1.124 KG)          2.64',
        'BAGUETTE                           0.65',
        '',
        'TOTAL (6 items, 7 units)          13.61 €',
        'Bank card ····0931                13.61 €',
        '',
        'Club Moncayo 2601 0000 4418 · points earned: 13',
        'Tomato sauce batch supplied to the store: L26214 (WMS, shipment 07/08/2026)'
      ].join('\n'),
      highlights: [
        { text: 'TOMATE FRITO MONCAYO 400 G   2 x   1.15', label: 'Product · 2 units', tone: 'brand' },
        { text: '26/09/2026 18:52', label: 'Purchase' },
        { text: 'L26214', label: 'Batch', tone: 'brand' }
      ]
    },
    highlights: [
      { text: 'piece of clear glass about 5 mm long', label: 'Defect', tone: 'crit' },
      { text: 'Tomate frito Moncayo 400 g', label: 'Product', tone: 'brand' },
      { text: 'Saturday 26 September', label: 'Purchase', tone: 'brand' },
      { text: 'Delicias store (T-011)', label: 'Store', tone: 'brand' },
      { text: 'batch L26214', label: 'Batch', tone: 'brand' },
      { text: 'best before 08/2028', label: 'Best before', tone: 'brand' },
      { text: 'the lid went “pop” when I opened it', label: 'Seal intact', tone: 'ok' },
      { text: 'I did not cut myself and I am fine', label: 'No injuries', tone: 'ok' },
      { text: 'my 6-year-old daughter also ate from that plate', label: 'Child exposed', tone: 'warn' },
      { text: 'I am keeping the jar with the rest of the sauce and the piece of glass', label: 'Sample' },
      { text: 'I have another one in the cupboard', label: 'More units', tone: 'warn' }
    ],
    run: {
      title: '“Consumer complaint” workflow',
      sub: 'Triggered when a food-safety message reaches the Consumer Care mailbox · PR-ATC-002',
      graph_title: 'Consumer complaint workflow',
      idle_footer: 'Reads the message, extracts and validates the data, traces the batch from the manufacturer to the stores, and prepares the 8D with the manufacturer and the reply. Nothing goes out or is blocked without Quality’s approval.',
      nodes: [
        { id: 'correo', kind: 'trigger', label: 'App message', sub: 'Consumer Care', systems: ['Outlook'], icon: 'mail' },
        { id: 'extraccion', label: 'Extraction and validation', systems: ['Modelo de lenguaje', 'CRM Fidelización', 'SAP S/4 Retail'], icon: 'search' },
        { id: 'traza', label: 'Batch trace', systems: ['SAP S/4 Retail', 'WMS Manhattan', 'TPV tiendas', 'ServiceNow'], icon: 'git-branch' },
        { id: 'historico', label: 'History, 8D and reply', systems: ['ServiceNow', 'Procedimientos'], icon: 'clipboard' },
        { id: 'aprobacion', kind: 'approval', label: 'Quality approval', sub: 'Quality Manager' },
        { id: 'salida', kind: 'output', label: 'Reply and containment', systems: ['Outlook', 'WMS Manhattan', 'TPV tiendas'], icon: 'send' }
      ],
      edges: [['correo', 'extraccion'], ['extraccion', 'traza'], ['traza', 'historico'], ['historico', 'aprobacion'], { from: 'aprobacion', to: 'salida', label: 'approved' }],
      graph_at: { 0: { correo: 'done', extraccion: 'active' }, 3: { extraccion: 'done', traza: 'active' }, 8: { traza: 'done', historico: 'active' }, 13: { historico: 'done', aprobacion: 'waiting' } },
      stats: [
        { label: 'Units in the batch · 1,920 sold, 2,400 on shelf (41 stores) and 480 at the DC', value: '4,800' },
        { label: 'Jar breakage on the manufacturer’s filler · 02/08', value: 'INC-PRO-2026-0049', tone: 'warn' },
        { label: 'Similar complaints · ATC-2026-0233', value: 2, tone: 'warn' },
        { label: 'Working days left to reply · due 30/09/2026 21:37', due: true }
      ]
    },
    steps: [
      { system: 'Outlook', action: 'Reads the app message in the atencion.consumidor@mercadosmoncayo.example mailbox (28/09/2026 21:37)', result: 'Food-safety complaint · 3 photos · Club Moncayo card 2601 0000 4418', ms: 320 },
      { system: 'Modelo de lenguaje', action: 'Extracts the complaint data', result: 'Tomate frito Moncayo 400 g · batch L26214 · best before 08/2028 · glass fragment of about 5 mm · no injuries · child exposed · bought on 26/09 at T-011 · keeps jar and fragment', ms: 2900 },
      { system: 'CRM Fidelización', action: 'Identifies the consumer and the purchase', result: 'Javier Lasheras, Club member since 2019 · receipt 011-3-260926-0187 of 26/09/2026 18:52 at T-011: 2 jars of Tomate frito Moncayo 400 g · matches the message', ms: 410, tone: 'ok' },
      { system: 'SAP S/4 Retail', action: 'Validates the batch and the product', result: 'L26214: Tomate frito Moncayo 400 g (own brand), made on 02/08/2026 by Conservas del Jalón, S.L. (Épila) · best before 08/2028 · matches the label in the photo', ms: 380, tone: 'ok' },
      { system: 'SAP S/4 Retail', action: 'Manufacturer record and raw materials of the batch', result: 'Conservas del Jalón: approved under PR-PRO-006, IFS Food v8 higher level (12/2025) · tomato concentrate TOM-2607-18 · glass jars TAR-2607-55 · filling line L2 with X-ray glass detector', ms: 350 },
      { system: 'WMS Manhattan', action: 'Receipt and stock of the batch at the DC', result: '4,800 units received on 05/08/2026 (400 cases of 12) with 14 broken jars on pallet 7 (REC-PLZ-26-08-0311) · 4,320 supplied to 41 stores · 480 at the DC (P-12-04-2)', ms: 460, tone: 'warn' },
      { system: 'TPV tiendas', action: 'Sales and stock of the batch by store', result: '1,920 sold and 2,400 on shelf in 41 stores · T-011 Zaragoza Delicias: 120 received, 84 sold, 36 on shelf', ms: 520 },
      { system: 'CRM Fidelización', action: 'Buyers of the batch and other complaints', result: '612 Club customers bought the batch · no other complaints about the batch in the CRM or in stores', ms: 430, tone: 'ok' },
      { system: 'ServiceNow', action: 'Looks for open or recent incidents with the manufacturer', result: 'INC-PRO-2026-0049 (03/08): a jar broke on the manufacturer’s L2 filler on 02/08 at 11:42, during batch L26214 · 96 jars purged · closed · INC-PRO-2026-0059 (this week): 3 pallets from Conservas del Jalón with broken jars at goods receipt', ms: 460, tone: 'warn' },
      { system: 'ServiceNow', action: 'Looks for similar complaints in the last 12 months', result: '6 own-brand complaints with a supplier incident · 2 similar: ATC-2026-0233 (glass in peaches in syrup) and ATC-2025-0871', ms: 540, tone: 'warn' },
      { system: 'Procedimientos', action: 'Checks PR-ATC-002, PR-CAL-010 and PR-PRO-006', result: 'Reply to the consumer within 48 h: by 21:37 on 30/09 · single glass case: precautionary block and analysis; second case or confirmation: recall and notification to AESAN · manufacturer’s 8D within 10 days', ms: 380 },
      { system: 'Modelo de lenguaje', action: 'Drafts the 8D with the manufacturer (D1–D8) with owners by role and dates', result: 'Full draft · the link with the 02/08 breakage stays a hypothesis until the fragment is analysed', ms: 5200 },
      { system: 'ServiceNow', action: 'Records the supplier incident and links it to the complaint', result: 'INC-PRO-2026-0058 opened as a draft · linked to ATC-2026-0412 and INC-PRO-2026-0049', ms: 300, tone: 'ok' },
      { system: 'Modelo de lenguaje', action: 'Drafts the reply to the consumer and the summary for the approver', result: 'Draft ready: health advice, jar collection, refund, precautionary withdrawal at his store and timescale · pending approval', ms: 3100, tone: 'warn' }
    ],
    lot: {
      code: 'L26214',
      noun: 'batch',
      label: 'Batch code',
      systems: 'SAP S/4 Retail and WMS Manhattan',
      systems_short: 'SAP and WMS',
      fix_text: 'If the consumer has copied the batch wrongly, type the correct one. Agentic Platform looks it up in SAP and the WMS and checks that it matches the product in the complaint and was supplied to his store before changing anything.',
      same_body: 'It exists in SAP: Tomate frito Moncayo 400 g from Conservas del Jalón, supplied to T-011 on 07/08/2026. No changes.',
      unknown_hint: 'If the code is doubtful, compare it with the photo of the label attached by the consumer.',
      mismatch_body: 'The code exists in the systems, but it is not a batch of Tomate frito Moncayo 400 g supplied to T-011: the record is not changed.',
      known: {
        'TOM-2607-18': { kind: 'mismatch', title: 'TOM-2607-18 is a raw-material batch of the manufacturer', body: 'It is the tomato concentrate Conservas del Jalón used to make L26214. The complaint is recorded against the finished-product batch printed on the label. The record is not changed.' },
        'TAR-2607-55': { kind: 'mismatch', title: 'TAR-2607-55 is the manufacturer’s glass jar batch', body: 'It is the packaging used to make L26214; it is already linked in the trace. The complaint is recorded against the finished-product batch. The record is not changed.' }
      }
    },
    sheet: {
      sub: 'Data extracted from the message and checked in the CRM, SAP and the POS',
      empty_text: 'Agentic Platform will extract the product, batch, defect, purchase and store from the message, and check them in the CRM, SAP and the POS before preparing the 8D with the manufacturer and the reply.',
      rows: [
        { k: 'Reference', v: 'ATC-2026-0412', code: true, sub: 'Consumer Care case in ServiceNow' },
        { k: 'Consumer', v: 'Javier Lasheras · Club Moncayo 2601 0000 4418', ok: 'Member since 2019 · tel. 676 000 412' },
        { k: 'Product', v: 'Tomate frito Moncayo 400 g (own brand)', ok: 'Matches the batch in SAP and the receipt' },
        { k: 'Batch', lot: true, ok: 'Exists in SAP · made on 02/08/2026 by Conservas del Jalón · supplied to T-011 on 07/08' },
        { k: 'Best before', v: '08/2028', ok: 'Matches SAP' },
        { k: 'Purchase', v: '26/09/2026 18:52 · T-011 Zaragoza Delicias · 2 jars', ok: 'Receipt 011-3-260926-0187 in the POS' },
        { k: 'Defect', v: 'Foreign body: clear glass fragment of about 5 mm', sub: 'Physical hazard: glass in a glass container · jar intact and properly sealed according to the consumer' },
        { k: 'Injuries', v: 'No', sub: '“I did not cut myself and I am fine” · a 6-year-old girl ate from the same plate' },
        { k: 'Evidence', v: '3 photos · jar with remaining product and fragment kept · second jar unopened' },
        { k: 'Manufacturer', v: 'Conservas del Jalón, S.L.', sub: 'Incidents: INC-PRO-2026-0049 (breakage on the filler on 02/08) and INC-PRO-2026-0059 (broken jars at goods receipt this week)' },
        { k: 'Deadline', v: 'Reply by 21:37 on 30/09', due: true, sub: '48 h from receipt · PR-ATC-002' },
        { k: 'Record', v: 'INC-PRO-2026-0058', code: true, sub: 'Supplier incident in ServiceNow, linked to the complaint' }
      ]
    },
    requests: {
      title: 'What the consumer asks for',
      items: [
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Does he need to do anything or see a doctor?', meta: ['Reply to the consumer · Quality’s criteria'], quote: 'tell me whether I need to do anything or go to the doctor, because of my daughter', side: { pending: { status: 'waiting', label: 'Pending approval' }, approved: { status: 'sent', label: 'Answered' }, rejected: { status: 'rejected', label: 'Not sent' } } },
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Collect the jar and the fragment', meta: ['D3 · courier on 01/10 or drop-off at T-011'], quote: 'come and collect the jar and the glass', side: { pending: { status: 'pending', label: 'Proposed' }, approved: { status: 'ok', label: 'Collection on 01/10' }, rejected: { status: 'rejected', label: 'Not scheduled' } } },
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Refund', meta: ['Refund of 2.30 € (2 jars) and a 10 € voucher on the Club card'], quote: 'refund me for the jar', side: { pending: { status: 'pending', label: 'Proposed' }, approved: { status: 'ok', label: 'Refunded' }, rejected: { status: 'rejected', label: 'Not refunded' } } },
        { icon: 'check-circle', tone: 'ok', title: 'Are there more jars like this?', meta: ['D3 · 480 at the DC, 2,400 on shelf, 1,920 sold'], quote: 'tell me whether there are more jars like this', side: { pending: { status: 'ok', label: 'Located' }, approved: { status: 'hold', label: '516 units blocked' }, rejected: { status: 'ok', label: 'Located' } } },
        { icon: 'calendar', tone: 'warn', title: 'A prompt reply', meta: ['PR-ATC-002 · 48 hours'], quote: 'I look forward to hearing from you soon', side: { status: 'pending', label: 'By 30/09 21:37' } }
      ]
    },
    trace: {
      title: 'Trace of batch L26214',
      sub: 'SAP S/4 Retail · WMS Manhattan · TPV tiendas · CRM Fidelización · ServiceNow · backwards and forwards',
      button_code: 'L26214',
      button_label: 'Full trace · 41 stores',
      back: [
        { time: '02/08', timeSub: '11:42', title: 'Manufacturer · jar breakage on filler L2', text: 'Conservas del Jalón reports a jar breaking during batch L26214; stoppage, cleaning and purge of 96 jars under its glass procedure.', tone: 'warn', ref: 'INC-PRO-2026-0049', chip: { status: 'closed', label: 'Closed by the supplier' } },
        { time: '02/08', title: 'Production · batch L26214', text: 'Tomato concentrate TOM-2607-18 · jars TAR-2607-55 · 4,800 units · best before 08/2028', tone: 'brand', ref: 'Conservas del Jalón' },
        { time: '02/08', title: 'Route at the manufacturer', route: ['Jar washing', 'Filler L2', 'Capping', 'X-ray', 'Palletising'], route_mark: 'Filler L2', text: 'X-ray glass detector after capping (records requested from the manufacturer)', tone: 'brand' },
        { time: '05/08', title: 'Receipt at the Plaza DC', text: '400 cases of 12 · 14 broken jars on pallet 7, removed at the dock · rest conforming · location P-12-04-2', tone: 'warn', ref: 'REC-PLZ-26-08-0311' },
        { time: '07/08', title: 'Supply to T-011 Zaragoza Delicias', text: '10 cases (120 units) · route ZGZ-04', tone: 'brand', ref: 'Shipment 011-0807-22' },
        { time: '26/09', timeSub: '18:52', title: 'Consumer purchase', text: '2 jars at T-011 · receipt 011-3-260926-0187 · Club card', tone: 'brand' },
        { time: '28/09', timeSub: '21:37', title: 'Complaint', text: 'Glass fragment of about 5 mm found while eating · no injuries', tone: 'crit', ref: 'ATC-2026-0412' }
      ],
      fwd_title: 'Forwards · where the batch is',
      fwd_cols: { id: 'Destination', qty: 'Units', when: 'Date', status: 'Status' },
      fwd: [
        { id: 'P-12-04-2', dest: 'Plaza DC', sub: '40 cases', qty: 480, when: 'In stock', status: { pending: { status: 'pending', label: 'Block proposed' }, approved: { status: 'hold', label: 'Blocked' }, rejected: { status: 'pending', label: 'Not blocked' } } },
        { id: 'T-011', dest: 'Zaragoza Delicias', sub: 'consumer’s store', qty: 36, when: 'On shelf', status: { pending: { status: 'pending', label: 'POS block proposed' }, approved: { status: 'hold', label: 'Removed from shelf' }, rejected: { status: 'pending', label: 'On sale' } } },
        { id: '40 stores', dest: 'Rest of the network', sub: 'Aragon and La Rioja', qty: 2364, when: 'On shelf', status: { status: 'evaluate', label: 'To assess (PR-CAL-010)' } },
        { id: 'Sold', dest: '41 stores', sub: '612 Club customers', qty: 1920, when: '06/08–28/09', status: { status: 'shipped', label: 'Consumed or in homes' } }
      ],
      fwd_note: '4,800 units received · 4,320 supplied to 41 stores (1,920 sold and 2,400 on shelf) and 480 at the DC · the batch covers sales since 06/08.',
      hypothesis: {
        title: 'Probable cause hypothesis · to be confirmed by Quality and the manufacturer',
        paras: [
          'During production of batch L26214 a jar broke on the manufacturer’s L2 filler (02/08 at 11:42, INC-PRO-2026-0049). Its procedure purged 96 jars, but a fragment may have remained in the filler and fallen into a later jar without the X-ray detector rejecting it.',
          'The packaging is also a suspect: the batch reached the DC with 14 broken jars on one pallet, and this week another 3 pallets from the same manufacturer arrived with broken jars (INC-PRO-2026-0059). A batch of TAR-2607-55 jars more fragile than usual would explain both. Still to clarify: the consumer says his jar was intact and properly sealed, and it is the only glass case among 1,920 units sold.',
          'It will be confirmed by analysing the fragment (type and colour of glass compared with the TAR-2607-55 jars), the manufacturer’s purge and detector records and an inspection of samples from the DC. Until then no cause is communicated to the consumer and a recall of the batch is assessed under PR-CAL-010.'
        ]
      }
    },
    history: {
      sub: 'ServiceNow · own-brand complaints · last 12 months',
      col_product: 'Product and batch',
      rows: [
        { id: 'ATC-2026-0233', date: '2026-06-11', product: 'Melocotón en almíbar Moncayo (peaches in syrup) 420 g', lot: 'M26131', description: 'Glass fragment in the product', category: 'Foreign body · glass', customer_label: 'T-034 Logroño Centro', root_cause: 'Jar breakage on the manufacturer’s capper without sufficient purge · 8D closed and batch recalled', nc: 'INC-PRO-2026-0031', status: 'closed', similar: true },
        { id: 'ATC-2025-0871', date: '2025-11-26', product: 'Garbanzos cocidos Moncayo (cooked chickpeas) 570 g', lot: 'G25298', description: 'Piece of hard plastic', category: 'Foreign body · plastic', customer_label: 'T-019 Huesca Norte', root_cause: 'A part of the manufacturer’s filling hopper broke', nc: 'INC-PRO-2025-0094', status: 'closed', similar: true },
        { id: 'ATC-2026-0318', date: '2026-08-02', product: 'Moncayo natural yoghurt 4 x 125 g', lot: 'Y26208', description: 'Swollen pots', category: 'Quality', customer_label: 'T-027 Huesca Centro', root_cause: 'Cold-chain break in store (faulty multideck chiller)', nc: 'INC-CAL-2026-0071', status: 'closed', similar: false },
        { id: 'ATC-2026-0187', date: '2026-04-15', product: 'Moncayo light tuna 3 x 80 g', lot: 'A26061', description: 'Dented can with a micro-leak', category: 'Packaging', customer_label: 'T-005 Zaragoza Actur', root_cause: 'Impact during handling at the DC', nc: 'INC-CAL-2026-0039', status: 'closed', similar: false },
        { id: 'ATC-2026-0102', date: '2026-02-20', product: 'Moncayo Maria biscuits 800 g', lot: 'GM26022', description: 'Undeclared allergen (soya) on the label', category: 'Labelling', customer_label: 'T-041 Calatayud', root_cause: 'Manufacturer’s recipe change without updating the label · recall and notification to AESAN', nc: 'INC-PRO-2026-0012', status: 'closed', similar: false },
        { id: 'ATC-2025-0799', date: '2025-10-30', product: 'Moncayo extra virgin olive oil 1 l', lot: 'AC25270', description: 'Rancid taste', category: 'Quality', customer_label: 'T-011 Zaragoza Delicias', root_cause: 'Exposure to light on the shelf · product within specification', nc: 'INC-CAL-2025-0102', status: 'closed', similar: false }
      ],
      note: {
        title: 'Same type of cause as ATC-2026-0233',
        body: 'In June, a glass fragment in Moncayo peaches in syrup was caused by a jar breaking on the manufacturer’s capper with an insufficient purge; it ended in a recall of the batch. If the hypothesis is confirmed, this would be the second glass case in own-brand preserves in four months: in D7 the 8D proposes requiring glass-packaging manufacturers to have a validated minimum purge and to send their breakage log within 24 h.'
      }
    },
    plan: {
      title: '8D draft with the manufacturer · INC-PRO-2026-0058',
      sub: 'PR-PRO-006 · Conservas del Jalón delivers D1–D5 by 09/10/2026; D6–D8 as follow-up',
      col_label: 'Discipline',
      containment_status: { pending: { text: 'Pending approval', tone: 'warn' }, approved: { text: 'Applied', tone: 'ok' }, rejected: { text: 'Not applied', tone: 'neutral' } },
      rows: [
        { d: 'D1', title: 'Team', owner: ['Quality Manager'], date: '2026-09-29', status: { text: 'Proposed', tone: 'draft' }, lead: 'Leader: Quality Manager.', items: ['On-call quality technician: investigation and analysis of the fragment', 'Supplier quality: 8D with Conservas del Jalón', 'Consumer Care: contact with the consumer and sample collection', 'DC manager and area store manager: block at P-12-04-2 and at T-011'], note: 'External contact: Quality Manager of Conservas del Jalón, S.L.' },
        { d: 'D2', title: 'Problem description', owner: ['On-call quality technician'], date: '2026-09-29', status: { text: 'Complete', tone: 'ok' }, lead: 'A consumer found a clear glass fragment of about 5 mm while eating Tomate frito Moncayo 400 g from batch L26214, bought on 26/09 at T-011 Zaragoza Delicias. No injuries; a child ate from the same plate.', items: ['Batch L26214, best before 08/2028, made on 02/08/2026 by Conservas del Jalón: 4,800 units', 'Complaint via the app on 28/09/2026 at 21:37', 'Physical hazard: glass in a product packed in glass · jar intact according to the consumer', 'Evidence: 3 photos; jar, remaining product and fragment kept; second jar unopened'] },
        { d: 'D3', title: 'Containment', owner: ['Quality Manager', 'DC manager'], date: '2026-09-29', containment: true, items: ['Block in WMS Manhattan the 480 units of the batch at the DC (P-12-04-2)', 'Block sale of the batch on the T-011 POS and move the 36 units from the shelf to the back store', 'Collect the jar, the fragment and the consumer’s second jar on 01/10 for analysis', 'Ask Conservas del Jalón today for the purge and X-ray detector records of 02/08 and retained samples of the batch', 'If a second case appears or the source is confirmed: recall of the batch and notification to AESAN and the regional authority (PR-CAL-010)'] },
        { d: 'D4', title: 'Root cause', owner: ['Supplier quality', 'Quality Manager'], date: '2026-10-05', status: { text: 'Hypothesis', tone: 'warn' }, lead: 'Main hypothesis, to be confirmed: a fragment from the 02/08 jar breakage on filler L2 (INC-PRO-2026-0049) remained in the equipment after the purge and was not detected by the X-ray check.', items: ['For: breakage recorded during the same batch; 14 broken jars at goods receipt of the batch and another 3 pallets with breakages this week (INC-PRO-2026-0059); same type of cause as ATC-2026-0233', 'Alternative: fragile TAR-2607-55 jars · still to clarify: jar intact and properly sealed; only case among 1,920 units sold', 'Verification: comparison of the fragment with TAR-2607-55 jars in an external laboratory, manufacturer’s records, X-ray inspection of 50 jars from the DC and 5 whys'] },
        { d: 'D5', title: 'Corrective actions', owner: ['Supplier quality'], date: '2026-10-09', status: { text: 'Planned', tone: 'info' }, items: ['The manufacturer extends the purge after a breakage (area and number of jars) and validates it with test-glass trials', 'Check of the X-ray detector sensitivity with 2 mm glass test pieces at the start of each shift'] },
        { d: 'D6', title: 'Implementation and effectiveness', owner: ['On-call quality technician'], date: '2026-10-23', status: { text: 'Planned', tone: 'info' }, items: ['Unannounced audit of the manufacturer’s L2 line with a breakage drill', 'No glass complaints in the next 3 batches of tomato sauce'] },
        { d: 'D7', title: 'Preventing recurrence', owner: ['Quality Manager'], date: '2026-10-30', status: { text: 'Planned', tone: 'info' }, items: ['Require in PR-PRO-006 that manufacturers using glass packaging have a validated minimum purge and send their breakage log within 24 h', 'Automatic alert to Quality when a manufacturer reports a glass breakage in an own-brand batch, before it reaches the DC'] },
        { d: 'D8', title: 'Closure and recognition', owner: ['Quality Manager'], date: '2026-11-06', status: { text: 'Planned', tone: 'info' }, items: ['Closure of INC-PRO-2026-0058 with the effectiveness evidence and final reply to the consumer', 'Team recognition'] }
      ]
    },
    reply: {
      to_label: 'to the consumer',
      subject: 'RE: Product complaint - Glass in Tomate frito Moncayo - Ref. ATC-2026-0412',
      sub: 'To javier.lasheras@correo.example · also in the app · in English',
      tab_label: 'To be sent',
      text: [
        'Hello Javier,',
        '',
        'Thank you for writing to us and for keeping the jar and the fragment. We are very sorry for the scare, and we are glad to hear you are both well. Your complaint reference is ATC-2026-0412.',
        '',
        'About your daughter: if she has had no discomfort, there is nothing you need to do. If over the next few hours she has pain when swallowing, tummy ache or any other discomfort, take her to her paediatrician or call 112 and explain that she may have swallowed a fragment of glass. Please do not eat from the other jar you have in the cupboard.',
        '',
        'What we have done and what we are going to do:',
        '- As a precaution, we have withdrawn that batch (L26214) from sale at your Delicias store and at our distribution centre while we investigate.',
        '- A courier will collect the jar, the fragment and the unopened jar on Thursday 1 October between 9:00 and 14:00. If another day suits you better, or you would rather take them to the store, just reply to this message.',
        '- We have opened an investigation with the manufacturer and will have the fragment analysed in a laboratory.',
        '- We have refunded 2.30 € (both jars) to your Club Moncayo card and added a 10 € voucher for your next shop.',
        '',
        'We will let you know the outcome of the investigation within 15 days at the latest. If your mother has jars from batch L26214, she can return them to any Mercados Moncayo store and we will refund her.',
        '',
        'If you have any questions, you can call us on 900 000 064 (Monday to Saturday, 9:00 to 21:00) quoting your reference.',
        '',
        'Kind regards,',
        '',
        'Consumer Care',
        'Mercados Moncayo',
        'atencion.consumidor@mercadosmoncayo.example'
      ].join('\n'),
      highlights: [
        { text: 'ATC-2026-0412', label: 'Reference', tone: 'brand' },
        { text: 'take her to her paediatrician or call 112', label: 'Health', tone: 'brand' },
        { text: 'we have withdrawn that batch (L26214) from sale', label: 'Containment', tone: 'brand' },
        { text: 'on Thursday 1 October between 9:00 and 14:00', label: 'Collection', tone: 'brand' },
        { text: 'within 15 days at the latest', label: 'Commitment', tone: 'brand' }
      ],
      llm_instructions: [
        'Warm, plain and reassuring tone for a consumer and parent (“Hello Javier,”), without technical jargon. Health comes first.',
        'Thank him for keeping the jar and the fragment, say you are sorry for the scare and give the reference ATC-2026-0412.',
        'Health advice for his 6-year-old daughter: if she has no discomfort, nothing needs to be done; if she has pain when swallowing, tummy ache or any discomfort, take her to her paediatrician or call 112 and explain that she may have swallowed glass. Ask them not to eat from the other jar.',
        'Say that batch L26214 has been withdrawn from sale as a precaution at his Delicias store (T-011) and at our distribution centre while we investigate.',
        'Offer collection by courier of the jar, the fragment and the unopened jar on Thursday 1 October between 9:00 and 14:00, or drop-off at the store; say an investigation has been opened with the manufacturer and the fragment will be analysed in a laboratory.',
        'Confirm the refund of 2.30 € (two jars) on his Club Moncayo card and the 10 € voucher; his mother can return jars from batch L26214 to any store for a refund.',
        'Commit to reporting the outcome within 15 days at the latest; give the phone number 900 000 064 (Monday to Saturday, 9:00 to 21:00).',
        'Do not state a cause or name the manufacturer, do not mention the breakage at the factory, other incidents or other stores, and do not announce a general recall of the batch.',
        'Sign as: Consumer Care · Mercados Moncayo · atencion.consumidor@mercadosmoncayo.example'
      ],
      criterion: 'Drafting criterion: friendly tone, health first; confirms facts, timescales and compensation; does not anticipate the cause (the link with the 02/08 breakage is not confirmed) or mention a general recall of the batch.',
      control: {
        label: 'Summary for the approver',
        note: 'Internal summary that accompanies the approval; it is not sent to the consumer.',
        edited_note: 'The summary refers to Agentic Platform’s draft; the edited version includes Quality’s changes to the text being sent.',
        subject: 'Internal summary · ATC-2026-0412 · INC-PRO-2026-0058',
        text: [
          'What is being approved:',
          '1. Send the reply to the consumer by email and in the app (due at 21:37 on 30/09).',
          '2. Block in WMS Manhattan of the 480 units of batch L26214 at P-12-04-2.',
          '3. Sales block on the T-011 POS and removal of 36 units from the shelf to the back store.',
          '4. Sample collection on 01/10, refund of 2.30 € and 10 € voucher on the Club card (goodwill gesture under PR-ATC-002, up to 15 €).',
          '5. Supplier incident INC-PRO-2026-0058 sent to Conservas del Jalón, requesting the 02/08 records.',
          '',
          'What is deliberately NOT approved here:',
          '- The recall of the batch from the other 40 stores and the notification to AESAN: PR-CAL-010 requires them on a second case or once the source is confirmed. They are prepared in “Recall drill”.',
          '',
          'Risk if not approved today: the 48 h deadline is missed and the batch stays on sale in the consumer’s store.'
        ].join('\n')
      }
    },
    approval: {
      title: 'Reply to Javier Lasheras and containment of batch L26214',
      approver: 'Quality Manager',
      policy: 'PR-ATC-002 · PR-CAL-010',
      summary: {
        pending: 'Agentic Platform has prepared the reply to the consumer, the sample collection, the refund and the block on the batch at the DC and in his store. Nothing is sent or blocked until Quality approves it.',
        approved: 'Quality has approved the reply and the containment. Agentic Platform has sent the reply, blocked the batch at the DC and on the T-011 POS, scheduled the collection and sent the incident to the manufacturer.',
        rejected: 'Quality has rejected the proposal: the reply has not been sent and no unit has been blocked.'
      },
      scope: [
        { label: 'Reply to the consumer', state: { pending: { status: 'pending', chip: 'Send' }, approved: { status: 'sent', chip: 'Sent' }, rejected: { status: 'rejected', chip: 'Not sent' } } },
        { label: 'DC P-12-04-2', value: '480 units · L26214', state: { pending: { status: 'pending', chip: 'Block' }, approved: { status: 'hold', chip: 'Blocked' }, rejected: { status: 'rejected', chip: 'Not blocked' } } },
        { label: 'Store T-011', value: '36 units on shelf', state: { pending: { status: 'pending', chip: 'Block sale' }, approved: { status: 'hold', chip: 'Removed' }, rejected: { status: 'rejected', chip: 'On sale' } } },
        { label: 'Collection and refund', value: '01/10 · 2.30 € + 10 € voucher', state: { pending: { status: 'pending', chip: 'Schedule' }, approved: { status: 'ok', chip: 'Scheduled' }, rejected: { status: 'rejected', chip: 'Not scheduled' } } },
        { label: 'Rest of the network', value: '2,364 units · 40 stores', state: { status: 'evaluate', chip: 'Under PR-CAL-010' } }
      ],
      effects: [
        'Outlook and app: reply sent from atencion.consumidor@mercadosmoncayo.example',
        'WMS Manhattan: quality block on 480 units of batch L26214 at P-12-04-2',
        'TPV tiendas: sales block on the batch at T-011 and shelf-removal task',
        'CRM Fidelización: refund of 2.30 € and 10 € voucher on the Club card',
        'ServiceNow: INC-PRO-2026-0058 sent to Conservas del Jalón and collection scheduled'
      ],
      next_step: 'Next step: analyse the fragment after the 01/10 collection (D4) and decide under PR-CAL-010 whether to recall the batch across the network.',
      toast_approved: 'Reply sent to Javier Lasheras · 516 units of batch L26214 blocked',
      reject_text: 'The reply is not sent and no unit is blocked. The reason is kept in the audit log.',
      reject_placeholder: 'For example: call the consumer first to check on his daughter',
      reject_audit: 'nothing is sent or blocked',
      toast_rejected: 'Reply rejected: nothing has been sent and no unit has been blocked'
    },
    compare: {
      rows: [
        { k: 'People involved', hoy: '4: Consumer Care, Quality, DC and store', pro_strong: '1', pro: ': Quality reviews, corrects if needed and approves' },
        { k: 'Systems to open', hoy: '6: Outlook, CRM, SAP, WMS, POS and ServiceNow', pro_strong: '1', pro: ': this console; Agentic Platform queries all 6' }
      ],
      steps_today: '12–15 manual searches, calls to the store and drafts',
      time_label: 'Trace, draft 8D and reply',
      time_today: '2–4 h of work; the reply usually goes out the next day',
      footer: 'Proposed acceptance criterion for the pilot: trace and draft in under 15 minutes, 100% of replies within 48 h and Quality accepts the draft with minor edits in at least 70% of cases.'
    },
    audit: {
      requested: { action: 'Complaint analysis requested', detail: 'ATC-2026-0412 · app message from javier.lasheras@correo.example of 28/09/2026 21:37' },
      analyzed: { action: 'Complaint analysed', detail: 'ATC-2026-0412 · batch L26214 · Tomate frito Moncayo 400 g' },
      after_analysis: [
        { action: 'Supplier incident recorded as a draft', detail: 'INC-PRO-2026-0058 · ServiceNow · linked to ATC-2026-0412 and INC-PRO-2026-0049' },
        { action: '8D draft prepared', detail: 'INC-PRO-2026-0058 · D1–D8 · 02/08 breakage as a hypothesis' },
        { action: 'Consumer reply drafted', detail: 'ATC-2026-0412 · English · version 1 · pending approval' }
      ],
      approved: { action: 'Reply approved and sent', detail: 'ATC-2026-0412 · to javier.lasheras@correo.example and in the app' },
      after_approval: [
        { action: 'Quality block applied', detail: 'WMS Manhattan · 480 units of batch L26214 at P-12-04-2' },
        { action: 'Sales block applied', detail: 'T-011 POS · batch L26214 · task to remove 36 units from the shelf' },
        { action: 'Refund and voucher applied', detail: 'CRM Fidelización · 2.30 € and 10 € voucher · Club Moncayo 2601 0000 4418' },
        { action: 'Incident sent to the manufacturer', detail: 'ServiceNow · INC-PRO-2026-0058 to Conservas del Jalón · sample collection on 01/10' }
      ]
    },
    outcome_label: 'Reply sent · batch L26214 blocked at the DC and T-011',
    toast_analyzed: 'Complaint analysed · 8D and reply drafted',
    report: {
      button: 'Download 8D report',
      title: '8D report · complaint ATC-2026-0412',
      subtitle: 'Foreign body (glass of about 5 mm) in Tomate frito Moncayo 400 g · batch L26214 · manufacturer Conservas del Jalón, S.L.',
      filename: '8D-report-INC-PRO-2026-0058-ATC-2026-0412',
      meta: [['Site', 'Plaza distribution centre'], ['Complaint', 'ATC-2026-0412 · 28/09/2026 21:37'], ['Batch', 'L26214 · Conservas del Jalón'], ['Manufacturer’s 8D', 'by 09/10/2026']],
      state: { pending: 'Draft · pending approval', approved: 'Containment applied · D4 open', rejected: 'Draft · reply rejected' },
      summary: [
        'Complaint from a Club Moncayo consumer via the app: clear glass fragment of about 5 mm in Tomate frito Moncayo 400 g, batch L26214, bought on 26/09/2026 at T-011 Zaragoza Delicias. No injuries; a child ate from the same plate.',
        'The batch of 4,800 units was made by Conservas del Jalón on 02/08/2026: 1,920 units sold in 41 stores, 2,400 on shelf and 480 at the DC. There are no other complaints about the batch.',
        'Cause hypothesis, to be confirmed by analysing the fragment: a jar breaking on the manufacturer’s L2 filler during the batch (INC-PRO-2026-0049, 02/08 11:42) with an insufficient purge.'
      ],
      trace_heading: 'Annex A · Batch trace',
      trace_rows: [
        { etapa: 'Raw materials', fecha: 'July 2026', detalle: 'Tomato concentrate TOM-2607-18 · glass jars TAR-2607-55', ref: 'Conservas del Jalón' },
        { etapa: 'Production', fecha: '02/08/2026', detalle: '4,800 units on line L2 in Épila · X-ray after capping', ref: 'L26214' },
        { etapa: 'Manufacturer incident', fecha: '02/08/2026 11:42', detalle: 'Jar breakage on filler L2 · 96 jars purged', ref: 'INC-PRO-2026-0049' },
        { etapa: 'Goods receipt', fecha: '05/08/2026', detalle: '400 cases of 12 at the Plaza DC · 14 broken jars on pallet 7 · location P-12-04-2', ref: 'REC-PLZ-26-08-0311' },
        { etapa: 'Distribution', fecha: '06/08–22/09/2026', detalle: '4,320 units supplied to 41 stores', ref: 'WMS' },
        { etapa: 'Store supply', fecha: '07/08/2026', detalle: '120 units to T-011 Zaragoza Delicias', ref: '011-0807-22' },
        { etapa: 'Purchase', fecha: '26/09/2026 18:52', detalle: '2 jars at T-011 · Club card', ref: '011-3-260926-0187' },
        { etapa: 'Complaint', fecha: '28/09/2026 21:37', detalle: 'Glass fragment of about 5 mm', ref: 'ATC-2026-0412' }
      ],
      units: {
        heading: 'Annex B · Units of batch L26214 by destination',
        cols: [{ label: 'Destination', key: 'dest', mono: true }, { label: 'Detail', key: 'det' }, { label: 'Units', key: 'n', num: true }, { label: 'Status', key: 'estado', status: true }],
        rows: [
          { dest: 'P-12-04-2', det: 'Plaza DC', n: 480, estado: 'In stock', estado_after: 'Blocked' },
          { dest: 'T-011', det: 'Zaragoza Delicias · on shelf', n: 36, estado: 'On sale', estado_after: 'Removed from shelf' },
          { dest: 'T-011', det: 'Zaragoza Delicias · sold', n: 84, estado: 'Sold' },
          { dest: '40 stores', det: 'Rest of the network · on shelf', n: 2364, estado: 'On sale · to assess' },
          { dest: '40 stores', det: 'Rest of the network · sold', n: 1836, estado: 'Sold' }
        ]
      },
      history_heading: 'Annex C · Own-brand complaints (12 months)',
      approvals: [
        { paso: '8D and reply drafts', rol: 'Agentic Platform · Consumer complaints agent', kind: 'agent' },
        { paso: 'Consumer reply and containment (D3)', rol: 'Quality Manager', kind: 'reply' },
        { paso: 'Root cause confirmation (D4)', rol: 'Supplier quality', kind: 'pending' },
        { paso: '8D closure (D8)', rol: 'Quality Manager', kind: 'pending' }
      ],
      second_signer: { role: 'Supplier quality', note: 'Manufacturer’s 8D and cause confirmation (D4) · pending' }
    },
    presenter: {
      running: 'While it runs: point out the ServiceNow line (the manufacturer reported a jar breaking during this very batch) and the POS line (where every unit is). If needed, “Speed up”.',
      idle: [
        'Message from a Club member via the app, last night at 21:37: a glass fragment in a jar of our own-brand tomato sauce. He did not cut himself, but his daughter ate from the same plate. The procedure requires a reply within 48 hours.',
        'In production, Agentic Platform analyses it as soon as it reaches the Consumer Care mailbox. Here we launch it by hand to see what it does and which systems it queries.'
      ],
      pending: [
        'What is highlighted is what Agentic Platform has extracted. Each item is checked: the member and the receipt in the CRM, the batch in SAP. Product, store and date all match.',
        'The trace: from the manufacturer to the DC and on to 41 stores. 1,920 units sold, 2,400 on shelf and 480 at the DC; 36 in the consumer’s store.',
        'The finding that changes the investigation: in August the manufacturer reported a jar breaking on the filler during this very batch. It is a hypothesis, not the cause: the fragment will confirm it.',
        'History: in June there was glass in peaches in syrup with the same type of cause. In D7 the 8D proposes requiring validated purges and notice of every breakage within 24 h.',
        'The reply puts health first, confirms facts and compensation, and neither anticipates the cause nor announces a general recall. It does not go out until Quality approves it.'
      ],
      approved: [
        'Approved: reply sent, 516 units blocked at the DC and in the store, collection scheduled and refund on the Club card. Everything is in the audit log.',
        'The comparison below: today, 4 people and 6 systems, with the reply the next day; here, one review and one approval within 48 h.',
        'The 8D report downloads as a controlled document ready to send to the manufacturer.'
      ],
      next: {
        pending: 'Press “Review and approve” (at the top) or scroll down to the reply and press “Approve and send”. Optional: “Correct” the batch with a non-existent one to show that it does not make up data.',
        approved: 'Press “Download 8D report” and show the document header. Then move on to “Recall drill” for batch L26214.'
      }
    }
  }
});
