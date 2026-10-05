/* Hidromec Ebro · complaint REC-2026-0187 (oil leak on PH-250 press s/n PH250-26-0412). English version.
 * Fictitious company, customers and people; synthetic demo data (MFM). */
agenticPackEn('maquinaria', {
  reclamacion: {
    code: 'REC-2026-0187',
    nav: 'Complaint REC-2026-0187',
    title: 'Complaint REC-2026-0187',
    section: 'Calidad',
    agent: 'Customer complaints',
    nc: 'NC-2026-0233',
    form: { code: 'REG-CAL-008-01', rev: '4' },
    received: { date: '2026-09-28', time: '17:42' },
    due: '2026-10-13',
    holidays: ['2026-10-12'],
    customer_line: 'Prensas y Servicios del Norte (distributor) · Estampaciones Nervión',
    due_line: 'Acknowledge by 17:42 on 29/09 · 8D by 13/10/2026',
    cust_name: 'Iñaki Goikoetxea · Technical service, Prensas y Servicios del Norte',
    cust_addr: 'sat@psnorte.example',
    own_name: 'Quality · Hidromec Ebro',
    own_addr: 'calidad@hidromec-ebro.example',
    mail_domain: 'hidromec-ebro.example',
    mail_sub: 'sat@psnorte.example · mailbox calidad@hidromec-ebro.example · English',
    mail_tab_label: 'Distributor’s email',
    attachments: ['PH250-26-0412_fuga_vastago_1.jpg', 'PH250-26-0412_fuga_vastago_2.jpg', 'PH250-26-0412_placa.jpg', 'parte_intervencion_PSN-0931.pdf'],
    email_text: [
      'From: Iñaki Goikoetxea · Technical service, Prensas y Servicios del Norte <sat@psnorte.example>',
      'To: Quality · Hidromec Ebro <calidad@hidromec-ebro.example>',
      'Date: Mon, 28 Sep 2026 17:42',
      'Subject: Warranty claim - Oil leak on main cylinder - PH-250 press s/n PH250-26-0412 - Ref. INC-PSN-0931',
      '',
      'Good afternoon,',
      '',
      'We are writing to open a warranty claim for a hydraulic press we bought from you in July and delivered to our customer at the beginning of August. Please treat it as a priority, as the customer’s press is at a standstill.',
      '',
      'Equipment: PH-250 hydraulic press (250 t), serial number PH250-26-0412',
      'Order: our purchase order PC-PSN-26-0388',
      'Delivery date to the end customer: 04/08/2026',
      'End customer: Estampaciones Nervión, S.L. (Basauri, Bizkaia)',
      'Operating hours according to the press counter: 412 h',
      'Our reference: INC-PSN-0931',
      '',
      'On Thursday 24/09/2026 the customer’s maintenance manager found an oil leak at the rod of the main cylinder, in the head area, during a deep-drawing cycle at about 230 bar. At first it was only seepage, but by Friday it was losing roughly half a litre of oil per shift (HLP 46 oil). Our technician was on site today: he cleaned the area, checked that it is not a fitting or the pipework and confirms that the leak comes from between the rod and the main cylinder seal. He could not see any scoring on the rod with the naked eye. The customer has stopped the press for safety reasons and because of the risk of oil on the floor. There has been no accident and no injury to anyone.',
      '',
      'Attached are three photos (leak and rating plate) and our technician’s service report.',
      '',
      'As the press is under warranty and the customer has a stamping line at a standstill, we ask you:',
      '- to confirm receipt and give us your complaint reference within 24 hours;',
      '- to send one of your technicians, or the spare seal kit so that we can replace the seals ourselves, within 48 hours;',
      '- to send the 8D report with the root cause and corrective actions within 10 working days, as set out in our quality agreement;',
      '- to tell us whether other presses could be affected: we have another PH-250 sold in August (serial number PH250-26-0441, at Calderería Zorroza) and we do not want the same thing to happen to it.',
      '',
      'I am also forwarding below the email the customer sent us.',
      '',
      'Kind regards,',
      '',
      'Iñaki Goikoetxea',
      'Technical Service Manager',
      'Prensas y Servicios del Norte, S.L. · Bilbao',
      'Tel. 944 000 318'
    ].join('\n'),
    mail_extra: {
      label: 'End customer’s email (forwarded)',
      note: 'Original message from Estampaciones Nervión, forwarded by the distributor below its own email. Agentic Platform uses it to cross-check dates and symptoms.',
      headers: { From: 'Maintenance · Estampaciones Nervión <mantenimiento@estampaciones-nervion.example>', To: 'sat@psnorte.example', Date: 'Fri, 25 Sep 2026 08:12', Subject: 'New PH-250 press losing oil' },
      text: [
        'Hi Iñaki,',
        '',
        'The PH-250 press you installed for us in August (the one at station 3, serial number PH250-26-0412) is losing oil from the big cylinder, at the top, where the rod comes out. We saw it yesterday afternoon, on the afternoon shift, while we were running the 4 mm bracket part number; this morning the drip tray had quite a lot of oil in it and we topped up the tank with about 2 litres.',
        '',
        'It works at about 230 bar and does about 1,900 strokes per shift. We have not touched it or changed anything since commissioning. You did the 250-hour service yourselves on 15/09.',
        '',
        'We are going to stop it today at midday until you come. Please send someone as soon as possible, because that press produces an order for an automotive customer.',
        '',
        'Thanks,',
        'Xabier Etxebarria',
        'Maintenance Manager · Estampaciones Nervión, S.L.'
      ].join('\n'),
      highlights: [
        { text: 'is losing oil from the big cylinder', label: 'Symptom', tone: 'crit' },
        { text: 'about 230 bar', label: 'Pressure' },
        { text: 'You did the 250-hour service yourselves on 15/09', label: 'Service', tone: 'ok' }
      ]
    },
    highlights: [
      { text: 'PH-250 hydraulic press (250 t), serial number PH250-26-0412', label: 'Equipment and s/n', tone: 'brand' },
      { text: '04/08/2026', label: 'Delivery', tone: 'brand' },
      { text: 'Estampaciones Nervión, S.L. (Basauri, Bizkaia)', label: 'End customer' },
      { text: '412 h', label: 'Hours', tone: 'brand' },
      { text: 'INC-PSN-0931', label: 'Customer ref.' },
      { text: 'oil leak at the rod of the main cylinder', label: 'Defect', tone: 'crit' },
      { text: 'about 230 bar', label: 'Working pressure' },
      { text: 'between the rod and the main cylinder seal', label: 'Source', tone: 'crit' },
      { text: 'There has been no accident and no injury to anyone', label: 'No injuries', tone: 'ok' },
      { text: 'within 24 hours', label: 'Acknowledgement deadline' },
      { text: 'within 48 hours', label: 'Technician deadline' },
      { text: 'within 10 working days', label: '8D deadline' },
      { text: 'PH250-26-0441', label: 'Other press' }
    ],
    run: {
      title: '“Customer complaint” workflow',
      sub: 'Triggered when a complaint reaches the Quality mailbox · PR-CAL-004 and PR-CAL-008',
      graph_title: 'Customer complaint workflow',
      idle_footer: 'Reads the email, extracts and validates the data, traces the serial number and the seal batch, and prepares the 8D and the reply. Nothing goes out without Quality’s approval.',
      nodes: [
        { id: 'correo', kind: 'trigger', label: 'Customer email', sub: 'Quality mailbox', systems: ['Outlook'], icon: 'mail' },
        { id: 'extraccion', label: 'Extraction and validation', systems: ['Modelo de lenguaje', 'Salesforce Service'], icon: 'search' },
        { id: 'traza', label: 'Equipment and batch trace', systems: ['PLM Windchill', 'SAP S/4HANA', 'MES Opcenter', 'GMAO Maximo'], icon: 'git-branch' },
        { id: 'historico', label: 'History, 8D and reply', systems: ['Salesforce Service', 'Procedimientos'], icon: 'clipboard' },
        { id: 'aprobacion', kind: 'approval', label: 'Quality approval', sub: 'Quality Manager' },
        { id: 'salida', kind: 'output', label: 'Reply and containment', systems: ['Outlook', 'SAP S/4HANA', 'Salesforce Service'], icon: 'send' }
      ],
      edges: [['correo', 'extraccion'], ['extraccion', 'traza'], ['traza', 'historico'], ['historico', 'aprobacion'], { from: 'aprobacion', to: 'salida', label: 'approved' }],
      graph_at: { 0: { correo: 'done', extraccion: 'active' }, 2: { extraccion: 'done', traza: 'active' }, 10: { traza: 'done', historico: 'active' }, 15: { historico: 'done', aprobacion: 'waiting' } },
      stats: [
        { label: 'Units in the field with seals from the batch · 17 PH-250 and 6 GH-55', value: 23 },
        { label: 'PH-250s at the plant seeping in the 28/09 retest · BP-1', value: '2 of 3', tone: 'warn' },
        { label: 'Similar complaints · REC-2025-0311', value: 2, tone: 'warn' },
        { label: 'Working days left for the 8D · due 13/10/2026', due: true }
      ]
    },
    steps: [
      { system: 'Outlook', action: 'Reads the email from sat@psnorte.example in the calidad@hidromec-ebro.example mailbox (28/09/2026 17:42)', result: 'Warranty claim · 4 attachments (3 photos and the technician’s report) · end customer’s email forwarded', ms: 320 },
      { system: 'Modelo de lenguaje', action: 'Extracts the complaint data', result: 'PH-250 s/n PH250-26-0412 · leak between rod and main cylinder seal at 230 bar · 412 h · no injuries · ref. INC-PSN-0931 · acknowledgement 24 h, technician 48 h, 8D in 10 working days', ms: 2900 },
      { system: 'Salesforce Service', action: 'Validates the serial number and the warranty', result: 'Asset PH250-26-0412: PH-250, sold to Prensas y Servicios del Norte, installed at Estampaciones Nervión on 04/08/2026 · 24-month warranty in force · 250 h service on 15/09 (SRV-26-1402) with no findings', ms: 410, tone: 'ok' },
      { system: 'PLM Windchill', action: 'As-built configuration of the unit', result: 'PH-250 rev. C · main cylinder CIL-250 · seal kit KJ-80 (ref. 7710-0480) from batch JNT-2607-031 (Sellados Ibéricos, S.A.; supplier batch SI-26-1187) · 48 seals per press', ms: 380 },
      { system: 'SAP S/4HANA', action: 'Goods receipt and inspection of batch JNT-2607-031', result: '21/07/2026 · 1,200 seals · ISO 2859-1 level II sampling (80 seals): dimensions and hardness conforming (92 Shore A) · 24 scrapped for flash on the lip (2.0%; usual rate 0.3%)', ms: 350, tone: 'warn' },
      { system: 'MES Opcenter', action: 'Assembly MON-2607-22 and cylinder records', result: 'Line LM-2, 29/07/2026 · main cylinder, cushion and ejector with 48 seals from the batch · cover tightening torque recorded and conforming', ms: 520 },
      { system: 'MES Opcenter', action: 'Final test on test bench BP-1 on 31/07/2026', result: 'PRB-26-07-0918 · 1.25 × nominal pressure (312 bar) for 30 min · no leak or seepage · conforming', ms: 430, tone: 'ok' },
      { system: 'MES Opcenter', action: 'Retest on BP-1 of the PH-250s from the same batch still at the plant', result: '28/09/2026 · MON-2608-11: seepage at the main cylinder rod of PH250-26-0476 and PH250-26-0478; PH250-26-0477 conforming · held by production', ms: 460, tone: 'warn' },
      { system: 'GMAO Maximo', action: 'Looks for open work orders on the stations and tools of the routing', result: 'No open work orders on LM-2 or BP-1 · seal insertion tool UT-JC-250 checked on 15/07/2026', ms: 380, tone: 'ok' },
      { system: 'SAP S/4HANA', action: 'Where the rest of the seal batch is', result: '1,200 received: 1,104 fitted in MON-2607-22, MON-2608-03 and MON-2608-11 · 72 in the component store (C-14-03), not blocked · 24 scrapped at goods receipt', ms: 390 },
      { system: 'Salesforce Service', action: 'Units in the field with seals from the batch', result: '23 units (17 PH-250 and 6 GH-55) at 11 customers in Spain, Portugal and France · 3 PH-250s from MON-2608-11 still at the plant · PH250-26-0441 (Calderería Zorroza) included', ms: 540, tone: 'warn' },
      { system: 'Salesforce Service', action: 'Looks for similar complaints in the last 12 months', result: '6 complaints with an 8D or NC · 2 similar: REC-2025-0311 (leak at the main cylinder seal, Sellados Ibéricos batch) and REC-2026-0121', ms: 380, tone: 'warn' },
      { system: 'Procedimientos', action: 'Checks PR-CAL-004, PR-CAL-008 and PR-POS-005', result: 'Acknowledgement within 24 h · 8D within 10 working days: by 13/10/2026 (12/10 is a public holiday) · PR-POS-005: field campaign if the cause affects more units', ms: 360 },
      { system: 'Modelo de lenguaje', action: 'Drafts the 8D (D1–D8) with owners by role and dates', result: 'Full draft · the link with batch JNT-2607-031 stays a hypothesis until the removed seal is examined', ms: 5200 },
      { system: 'SAP S/4HANA', action: 'Records the non-conformance and links it to the complaint', result: 'NC-2026-0233 (Q2 quality notification) opened as a draft · linked to REC-2026-0187 and to the Salesforce case', ms: 300, tone: 'ok' },
      { system: 'Modelo de lenguaje', action: 'Drafts the reply to the distributor and the summary for the approver', result: 'Draft ready: acknowledgement, reference NC-2026-0233, seal kit and technician within 48 h, 8D date · pending approval', ms: 3100, tone: 'warn' }
    ],
    lot: {
      code: 'PH250-26-0412',
      noun: 'serial number',
      label: 'Serial number',
      fix_title: 'the complaint’s serial number',
      systems: 'Salesforce Service and PLM Windchill',
      systems_short: 'Salesforce and Windchill',
      fix_text: 'If the distributor has copied the serial number wrongly, type the correct one. Agentic Platform looks it up in the installed base and checks that it matches the unit and the customer of the complaint before changing anything.',
      same_body: 'It exists in the installed base: PH-250 delivered on 04/08/2026 to Prensas y Servicios del Norte (end customer Estampaciones Nervión). No changes.',
      unknown_hint: 'If the number is doubtful, ask the distributor for a photo of the rating plate (one is already attached).',
      mismatch_body: 'The code exists in the systems, but it is not the serial number of the press in the complaint: the record is not changed.',
      known: {
        'PH250-26-0441': { kind: 'same-product', title: 'PH250-26-0441 is another PH-250 from the same distributor', body: 'It is the second press mentioned in the email (it also has seals from batch JNT-2607-031), but it is not the one losing oil. To change the serial number of an open complaint, confirm it with the distributor. The record is not changed.' },
        'JNT-2607-031': { kind: 'mismatch', title: 'JNT-2607-031 is the seal batch, not the serial number', body: 'It exists in SAP: KJ-80 seal kit from Sellados Ibéricos, received on 21/07/2026. The complaint is recorded against the unit’s serial number; the batch is already linked in the trace. The record is not changed.' }
      }
    },
    sheet: {
      sub: 'Data extracted from the email and checked in Salesforce, Windchill and SAP',
      empty_text: 'Agentic Platform will extract the unit, serial number, defect, hours, reference and deadlines from the email, and check them against the installed base before preparing the 8D and the reply.',
      rows: [
        { k: 'Reference', v: 'INC-PSN-0931', code: true, sub: 'Distributor’s reference · case REC-2026-0187 in Salesforce Service' },
        { k: 'Customer', v: 'Prensas y Servicios del Norte, S.L. (distributor, Bilbao)', sub: 'End customer: Estampaciones Nervión, S.L. (Basauri) · station 3' },
        { k: 'Equipment', v: 'PH-250 hydraulic press (250 t) · rev. C', ok: 'Matches the installed base and the attached rating plate' },
        { k: 'Serial number', lot: true, ok: 'Exists in Salesforce · assembled in MON-2607-22 (LM-2, 29/07/2026) · test bench BP-1 on 31/07/2026' },
        { k: 'Seal batch', v: 'KJ-80 kit · Sellados Ibéricos, S.A.', trace: 'JNT-2607-031', sub: 'As-built configuration in PLM Windchill · supplier batch SI-26-1187' },
        { k: 'Defect', v: 'Oil leak between the rod and the main cylinder seal', sub: 'About 0.5 l of HLP 46 per shift at 230 bar · no visible scoring on the rod' },
        { k: 'Injuries', v: 'No', sub: '“There has been no accident and no injury to anyone” · press stopped by the customer' },
        { k: 'Usage', v: '412 h · about 1,900 strokes per shift', ok: '250 h service on 15/09/2026 (SRV-26-1402) with no leak noted' },
        { k: 'Warranty', v: 'In force until 04/08/2028 (24 months)', ok: 'Distribution agreement PSN-2024-03' },
        { k: 'Evidence', v: '3 photos · technician’s service report · end customer’s email' },
        { k: 'Deadlines', v: 'Acknowledge by 17:42 on 29/09 · 8D by 13/10/2026', due: true, sub: '10 working days from receipt (12/10 is a public holiday) · PR-CAL-008' },
        { k: 'Record', v: 'NC-2026-0233', code: true, sub: 'Non-conformance (Q2 notification) in SAP, linked to the complaint' }
      ]
    },
    requests: {
      items: [
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Acknowledgement and reference within 24 hours', meta: ['Reply to the distributor · NC-2026-0233'], quote: 'to confirm receipt and give us your complaint reference within 24 hours', side: { pending: { status: 'waiting', label: 'Pending approval' }, approved: { status: 'sent', label: 'Sent' }, rejected: { status: 'rejected', label: 'Not sent' } } },
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Technician or seal kit within 48 hours', meta: ['D3 · KJ-80 kit from another batch · after-sales technician'], quote: 'to send one of your technicians, or the spare seal kit so that we can replace the seals ourselves, within 48 hours', side: { pending: { status: 'pending', label: 'Proposed' }, approved: { status: 'ok', label: 'Kit and visit on 30/09' }, rejected: { status: 'rejected', label: 'Not applied' } } },
        { icon: 'clock', tone: 'warn', title: '8D report with root cause and corrective actions', meta: ['D4, D5 and D7 of the 8D'], quote: 'to send the 8D report with the root cause and corrective actions within 10 working days', side: { status: 'review', label: 'Hypothesis' } },
        { icon: 'check-circle', tone: 'ok', title: 'Could other presses be affected?', meta: ['D3 · 23 units in the field, 3 PH-250s at the plant (2 seeping) and 72 seals in stock'], quote: 'to tell us whether other presses could be affected', side: { pending: { status: 'ok', label: 'Located' }, approved: { status: 'hold', label: '3 presses and 72 seals blocked' }, rejected: { status: 'ok', label: 'Located' } } },
        { icon: 'calendar', tone: 'warn', title: '8D deadline: 10 working days', meta: ['8D submission (D1–D5) · follow-up D6–D8'], quote: 'as set out in our quality agreement', side: { status: 'pending', label: 'By 13/10' } }
      ]
    },
    trace: {
      title: 'Trace of press PH250-26-0412 and seal batch JNT-2607-031',
      sub: 'Salesforce Service · PLM Windchill · SAP S/4HANA · MES Opcenter · GMAO Maximo · backwards and forwards',
      button_code: 'JNT-2607-031',
      button_label: 'Full batch trace · 1,200 seals',
      back: [
        { time: '14/07', title: 'Manufacture at the supplier', text: 'Sellados Ibéricos moulds batch SI-26-1187 (92 Shore A polyurethane, NBR lip) · 3.1 material certificate', tone: 'brand', ref: 'SI-26-1187' },
        { time: '21/07', title: 'Goods receipt and inspection · batch JNT-2607-031', text: '1,200 KJ-80 kits · ISO 2859-1 level II sampling (80 seals): dimensions and hardness conforming · 24 scrapped for flash on the lip (2.0%)', tone: 'warn', ref: 'QM lot 010000488173', chip: { status: 'warn', label: 'Flash 2.0%' } },
        { time: '29/07', title: 'Cylinder assembly · MON-2607-22', text: 'Line LM-2 · main cylinder, cushion and ejector with 48 seals from the batch · cover torque conforming', tone: 'brand', ref: 'PO 4100731' },
        { time: '31/07', timeSub: '10:20', title: 'Routing and final test', route: ['MC-02', 'RECT-01', 'LM-2', 'BP-1', 'EXP'], route_mark: 'LM-2', text: 'BP-1: 312 bar (1.25 × nominal) for 30 min, no leak or seepage · PRB-26-07-0918', tone: 'ok' },
        { time: '04/08', title: 'Shipment and commissioning', text: 'Shipped on 03/08 (delivery note 80041977) · installed at Estampaciones Nervión (Basauri) on 04/08 · 250 h service on 15/09', tone: 'brand', ref: 'Report PEM-26-0388' },
        { time: '24/09', title: 'Field failure', text: 'Leak at the main cylinder rod at 412 h · press stopped on 25/09', tone: 'crit', ref: 'INC-PSN-0931' },
        { time: '28/09', title: 'Retest at the plant · MON-2608-11', text: 'Seepage at the rod of PH250-26-0476 and PH250-26-0478, with seals from the same batch; PH250-26-0477 conforming', tone: 'warn', ref: 'BP-1', chip: { status: 'hold', label: 'Held' } }
      ],
      fwd_title: 'Forwards · seals from batch JNT-2607-031',
      fwd_cols: { id: 'Destination', qty: 'Seals', when: 'Date', status: 'Status' },
      fwd: [
        { id: 'MON-2607-22', trace: true, dest: '8 PH-250 and 2 GH-55', sub: 'incl. PH250-26-0412', qty: 432, when: '27–31/07/2026', status: { status: 'shipped', label: '10 in the field' } },
        { id: 'MON-2608-03', trace: true, dest: '7 PH-250 and 2 GH-55', sub: 'incl. PH250-26-0441', qty: 384, when: '03–07/08/2026', status: { status: 'shipped', label: '9 in the field' } },
        { id: 'MON-2608-11', trace: true, dest: '2 PH-250 and 2 GH-55', sub: 'in the field', qty: 192, when: '11–14/08/2026', status: { status: 'shipped', label: '4 in the field' } },
        { id: 'MON-2608-11', trace: true, dest: '3 PH-250 at the plant', sub: '2 seeping', qty: 144, when: 'At the plant', status: { pending: { status: 'pending', label: 'QM block proposed' }, approved: { status: 'hold', label: 'Blocked in QM' }, rejected: { status: 'warn', label: 'Held without QM' } } },
        { id: 'C-14-03', dest: 'Component store', sub: 'available for assembly', qty: 72, when: 'In stock', status: { pending: { status: 'pending', label: 'Block proposed' }, approved: { status: 'hold', label: 'Blocked' }, rejected: { status: 'pending', label: 'Not blocked' } } },
        { id: 'DESECHO', dest: 'Goods-receipt inspection', sub: 'flash on the lip', qty: 24, when: '21/07/2026', status: { status: 'closed', label: 'Scrapped' } }
      ],
      fwd_note: '1,200 seals received · 1,104 fitted in 23 units in the field (17 PH-250 and 6 GH-55, 11 customers) and 3 PH-250s at the plant · each PH-250 has 48 seals from the batch and each GH-55, 24.',
      hypothesis: {
        title: 'Probable cause hypothesis · to be confirmed by Quality',
        paras: [
          'Main hypothesis: a moulding defect on the seal lip in batch JNT-2607-031. At goods receipt 24 seals were scrapped for flash on the lip (2.0%, against the usual 0.3%) and the 28/09 retest found seepage on 2 of the 3 PH-250s from the same batch still at the plant. REC-2025-0311 was also a Sellados Ibéricos seal.',
          'Still to clarify: goods-receipt sampling found dimensions and hardness conforming (92 Shore A) and the press passed the final test at 312 bar without seepage. Assembly damage cannot be ruled out, as in REC-2026-0121, although the technician sees no scoring on the rod and the cover torque is recorded as conforming.',
          'It will be confirmed by examining the removed seal (lip, hardness and dimensions), a sample of the 72 seals in stock and the supplier’s response on batch SI-26-1187. Until then no cause is communicated to the customer and no field campaign is launched (PR-POS-005).'
        ]
      }
    },
    history: {
      sub: 'Salesforce Service and SAP QM · last 12 months',
      col_product: 'Unit and s/n',
      rows: [
        { id: 'REC-2025-0311', date: '2025-11-14', product: 'PH-250 press', lot: 'PH250-25-0388 · JNT-2509-014', description: 'Oil leak at the main cylinder seal at 600 h', category: 'Hydraulic leak', customer_label: 'Talleres Mecánicos Arlanzón', root_cause: 'Seal batch with hardness out of tolerance (82 Shore A) · supplier Sellados Ibéricos', nc: '8D-2025-021', status: 'closed', similar: true },
        { id: 'REC-2026-0121', date: '2026-05-20', product: 'GH-55 hydraulic power unit', lot: 'GH55-26-0063 · JNT-2604-007', description: 'Leak at the rod seal of the clamping cylinder', category: 'Hydraulic leak', customer_label: 'Prensas y Servicios del Norte', root_cause: 'Rod scored during assembly by an unprotected clamp', nc: 'NC-2026-0149', status: 'closed', similar: true },
        { id: 'REC-2026-0163', date: '2026-07-09', product: 'GH-30 hydraulic power unit', lot: 'GH30-26-0112', description: 'Oil overheating in summer', category: 'Performance', customer_label: 'Forjas del Cinca', root_cause: 'Heat exchanger undersized for the customer’s cycle', nc: 'NC-2026-0188', status: 'closed', similar: false },
        { id: 'REC-2026-0142', date: '2026-06-18', product: 'PH-160 press', lot: 'PH160-26-0217', description: 'Drip at a fitting on the hydraulic unit', category: 'Hydraulic leak', customer_label: 'Metalúrgica Tudelana', root_cause: 'Insufficient tightening torque when the fitting was assembled', nc: 'NC-2026-0171', status: 'closed', similar: false },
        { id: 'REC-2026-0098', date: '2026-04-22', product: 'GH-55 hydraulic power unit', lot: 'GH55-26-0041', description: 'Pump noise and vibration', category: 'Noise', customer_label: 'Hierros Moncayo', root_cause: 'Cavitation due to a clogged suction filter (customer maintenance)', nc: 'NC-2026-0117', status: 'closed', similar: false },
        { id: 'REC-2026-0055', date: '2026-03-03', product: 'PH-400 press', lot: 'PH400-26-0009', description: 'Guarding dented on delivery', category: 'Transport', customer_label: 'Estampaciones Lusitanas (Porto)', root_cause: 'No chocks on the carrier’s lorry', nc: 'NC-2026-0072', status: 'closed', similar: false }
      ],
      note: {
        title: 'Two seal leaks in the last year',
        body: 'REC-2025-0311 (14/11/2025) was a seal from the same supplier with hardness out of tolerance; REC-2026-0121 (20/05/2026), a seal damaged during assembly. Both causes remain open as hypotheses in this complaint. In D7 the 8D proposes a goods-receipt hardness check for Sellados Ibéricos and a plan to replace assembly tools by number of cycles.'
      }
    },
    plan: {
      title: '8D draft · NC-2026-0233',
      sub: 'PR-CAL-008 · to the distributor by 13/10/2026 with D1–D5; D6–D8 as follow-up',
      col_label: 'Discipline',
      containment_status: { pending: { text: 'Pending approval', tone: 'warn' }, approved: { text: 'Applied', tone: 'ok' }, rejected: { text: 'Not applied', tone: 'neutral' } },
      rows: [
        { d: 'D1', title: 'Team', owner: ['Quality Manager'], date: '2026-09-29', status: { text: 'Proposed', tone: 'draft' }, lead: 'Leader: Quality Manager.', items: ['Quality technician on shift: investigation and analysis of the removed seal', 'After-sales manager: contact with the distributor, kit and technical visit', 'Production manager: line LM-2, assembly batches and retests on BP-1', 'Purchasing · supplier quality: Sellados Ibéricos and batch SI-26-1187'], note: 'External contact: Iñaki Goikoetxea (Prensas y Servicios del Norte).' },
        { d: 'D2', title: 'Problem description', owner: ['Quality technician on shift'], date: '2026-09-29', status: { text: 'Complete', tone: 'ok' }, lead: 'Oil leak between the rod and the main cylinder seal of PH-250 press s/n PH250-26-0412 after 412 operating hours, working at 230 bar. No injuries; press stopped by the end customer.', items: ['Assembled in MON-2607-22 (LM-2, 29/07/2026) with 48 KJ-80 seals from batch JNT-2607-031; final test on BP-1 conforming on 31/07 (312 bar, 30 min)', 'Delivered on 04/08/2026 to Estampaciones Nervión (Basauri) via Prensas y Servicios del Norte · 250 h service on 15/09 with nothing noted', 'Detected on 24/09/2026; complaint received on 28/09/2026 at 17:42', 'Same batch: seepage on 2 of the 3 PH-250s still at the plant (retest on 28/09)', 'Evidence: 3 photos, service report and end customer’s email; seal still to be removed'] },
        { d: 'D3', title: 'Containment', owner: ['Quality Manager', 'After-sales manager'], date: '2026-09-30', containment: true, items: ['Send a KJ-80 kit from another batch (JNT-2609-006, 100% inspected) and an after-sales technician on 30/09 to replace the seal and recover the removed one', 'Block in SAP QM the 72 seals from the batch in C-14-03 so that no more are fitted', 'Block in SAP QM the 3 PH-250s from MON-2608-11 (PH250-26-0476/0477/0478), currently held only by production', 'Precautionary notice to the 11 customers with units from the batch to watch for cylinder leaks (no campaign until the cause is confirmed)'] },
        { d: 'D4', title: 'Root cause', owner: ['Quality Manager', 'Purchasing · supplier quality'], date: '2026-10-05', status: { text: 'Hypothesis', tone: 'warn' }, lead: 'Main hypothesis, to be confirmed: moulding defect on the lip of the seals in batch JNT-2607-031 (supplier batch SI-26-1187).', items: ['For: 24 seals scrapped at goods receipt for flash on the lip (2.0% against 0.3%); seepage on 2 of 3 presses from the same batch; REC-2025-0311 with the same supplier', 'Still to clarify: dimensions and hardness conforming in the sample (92 Shore A) and final test without seepage; assembly damage not ruled out (REC-2026-0121)', 'Verification: analysis of the removed seal and of 13 seals from stock (lip, hardness, dimensions), supplier’s report on SI-26-1187 and 5 whys'] },
        { d: 'D5', title: 'Corrective actions', owner: ['Purchasing · supplier quality', 'Production manager'], date: '2026-10-07', status: { text: 'Planned', tone: 'info' }, items: ['Complaint to the supplier and return of the batch seals remaining at the plant', 'Replace the seals of the 3 held PH-250s and repeat the test on BP-1', 'If the cause is confirmed in the batch: field campaign under PR-POS-005 for the 23 units in the field'] },
        { d: 'D6', title: 'Implementation and effectiveness', owner: ['Quality technician on shift'], date: '2026-10-21', status: { text: 'Planned', tone: 'info' }, items: ['The 3 PH-250s with new seals pass BP-1 without seepage (1.25 × nominal, 30 min)', 'No new leaks on the 23 units in the field for 90 days (tracked in Salesforce)'] },
        { d: 'D7', title: 'Preventing recurrence', owner: ['Quality Manager'], date: '2026-10-30', status: { text: 'Planned', tone: 'info' }, items: ['Automatic batch block in SAP QM when goods-receipt scrap exceeds 1% (today the rest of the batch is released)', 'Tightened goods-receipt inspection for Sellados Ibéricos for 6 months: 100% lip check with a magnifier and hardness per batch (two complaints involving their seals in one year)', '10-minute retest on BP-1 24 h after the final test for cylinders of 250 t or more'] },
        { d: 'D8', title: 'Closure and recognition', owner: ['Quality Manager'], date: '2026-11-06', status: { text: 'Planned', tone: 'info' }, items: ['Final report to Prensas y Servicios del Norte and closure of NC-2026-0233 with the effectiveness evidence', 'Team recognition'] }
      ]
    },
    reply: {
      to_label: 'to the distributor',
      subject: 'RE: Warranty claim - Oil leak on main cylinder - PH-250 press s/n PH250-26-0412 - Ref. INC-PSN-0931 - Hidromec ref. NC-2026-0233',
      sub: 'To sat@psnorte.example · in English',
      tab_label: 'To be sent',
      text: [
        'Good morning Iñaki,',
        '',
        'Thank you for your email of 28 September 2026. We confirm receipt of complaint INC-PSN-0931 regarding the oil leak on the main cylinder of the PH-250 press, serial number PH250-26-0412, installed at Estampaciones Nervión. We are sorry for the inconvenience and for your customer’s line stoppage, and we note that nobody has been injured.',
        '',
        'Our reference is NC-2026-0233. The complaint is being handled under warranty in line with our non-conformance procedure and will be documented in an 8D report.',
        '',
        'What we know from our records:',
        '- The press was assembled at our Zaragoza plant on 29/07/2026, passed the final bench test at 312 bar for 30 minutes on 31/07/2026 and was delivered on 04/08/2026. The 250-hour service on 15/09/2026 recorded no leaks.',
        '- We have identified the batch of the cylinder seals and the other units and seals from the same batch. The seals and presses from that batch still at our plant are blocked while we investigate.',
        '',
        'Next steps:',
        '- Tomorrow, 30/09/2026, we will send you a seal kit from a 100% inspected batch, and a technician from our after-sales service will go to Estampaciones Nervión to replace the seal together with your technician. Please confirm what time he can access the site.',
        '- We will take the removed seal for analysis in our laboratory; please do not discard it if you replace it before then.',
        '- We will send you the 8D report, with the root cause and the corrective and preventive actions, no later than 13 October 2026.',
        '- Regarding PH250-26-0441: it has seals from the same batch. While we investigate, please ask your customer to watch for any oil around the rod area and to let us know immediately if they see any. If the investigation makes it advisable, we will propose a preventive inspection.',
        '',
        'Kind regards,',
        '',
        'Quality Department',
        'Hidromec Ebro, S.L. · Zaragoza plant',
        'calidad@hidromec-ebro.example'
      ].join('\n'),
      highlights: [
        { text: 'NC-2026-0233', label: 'Reference', tone: 'brand' },
        { text: 'are blocked while we investigate', label: 'Containment', tone: 'brand' },
        { text: 'a technician from our after-sales service will go to Estampaciones Nervión', label: 'Technician 48 h', tone: 'brand' },
        { text: 'no later than 13 October 2026', label: 'Commitment', tone: 'brand' }
      ],
      llm_instructions: [
        'Professional, friendly tone, as between business partners: you are writing to a distributor’s technical service manager (first name, “Good morning Iñaki,”). No unnecessary jargon.',
        'Confirm receipt and give our reference NC-2026-0233; restate the serial number PH250-26-0412 and the distributor’s reference INC-PSN-0931.',
        'State only facts verified in our records (assembly on 29/07/2026, final bench test at 312 bar for 30 minutes on 31/07/2026, delivery on 04/08/2026, 250-hour service on 15/09/2026 with no leaks) and that the seals and presses from the same batch still at our plant are blocked while we investigate.',
        'Commit to sending a seal kit from a 100% inspected batch and an after-sales technician on 30/09/2026; ask what time he can access the site and ask them to keep the removed seal for our laboratory.',
        'Commit to the 8D report no later than 13 October 2026.',
        'About PH250-26-0441: it has seals from the same batch; ask the customer to watch for oil around the rod and report it immediately. Do not announce a field campaign or a recall.',
        'Do not state a cause (the seal batch is only a hypothesis), do not mention the seepage found on presses at our plant, other customers, the supplier or internal codes other than NC-2026-0233.',
        'Sign as: Quality Department · Hidromec Ebro, S.L. · Zaragoza plant · calidad@hidromec-ebro.example'
      ],
      criterion: 'Drafting criterion: confirms facts from Salesforce, SAP and Opcenter and commits to dates; does not anticipate the cause (the link with the seal batch is not confirmed) or mention a field campaign.',
      control: {
        label: 'Summary for the approver',
        note: 'Internal summary that accompanies the approval; it is not sent to the distributor.',
        edited_note: 'The summary refers to Agentic Platform’s draft; the edited version includes Quality’s changes to the text being sent.',
        subject: 'Internal summary · REC-2026-0187 · NC-2026-0233',
        text: [
          'What is being approved:',
          '1. Send the reply to the distributor (acknowledgement within the 24 h requested: due today at 17:42).',
          '2. SAP QM block of the 72 seals from batch JNT-2607-031 in C-14-03 (currently still available for assembly).',
          '3. SAP QM block of the 3 PH-250s from MON-2608-11 (2 seeping in the 28/09 retest), currently held only by production.',
          '4. Dispatch of the KJ-80 kit from batch JNT-2609-006 and after-sales visit on 30/09 (service order in Salesforce).',
          '',
          'What the reply deliberately does NOT say:',
          '- It gives no cause: the seal batch is the main hypothesis, but the removed seal has yet to be analysed.',
          '- It does not mention a field campaign: PR-POS-005 requires one only if the cause affects more units; it is assessed in “Recall drill”.',
          '- It does not mention the seepage on the presses at the plant: that is internal information until the analysis is available.',
          '',
          'Risk if not approved today: the 24 h acknowledgement in the quality agreement with the distributor is missed and the seals in stock could be fitted in this week’s production order.'
        ].join('\n')
      }
    },
    approval: {
      title: 'Reply to Prensas y Servicios del Norte and containment',
      approver: 'Quality Manager',
      policy: 'PR-CAL-004 · PR-CAL-008',
      summary: {
        pending: 'Agentic Platform has prepared the reply to sat@psnorte.example, the kit dispatch and technical visit, and the block on the seals and presses from the batch still at the plant. Nothing is sent or blocked until Quality approves it.',
        approved: 'Quality has approved the reply and the containment. Agentic Platform has sent the email to the distributor, blocked seals and presses in SAP QM, created the service order and updated NC-2026-0233.',
        rejected: 'Quality has rejected the proposal: the reply has not been sent, the kit has not been dispatched and nothing has been blocked.'
      },
      scope: [
        { label: 'Reply to the distributor', state: { pending: { status: 'pending', chip: 'Send' }, approved: { status: 'sent', chip: 'Sent' }, rejected: { status: 'rejected', chip: 'Not sent' } } },
        { label: 'Seals in C-14-03', value: '72 seals · batch JNT-2607-031', state: { pending: { status: 'pending', chip: 'Block' }, approved: { status: 'hold', chip: 'Blocked' }, rejected: { status: 'rejected', chip: 'Not blocked' } } },
        { label: 'PH-250s at the plant', value: '3 presses · MON-2608-11', state: { pending: { status: 'pending', chip: 'Block' }, approved: { status: 'hold', chip: 'Blocked' }, rejected: { status: 'rejected', chip: 'No QM block' } } },
        { label: 'Kit and technical visit', value: 'JNT-2609-006 · 30/09', state: { pending: { status: 'pending', chip: 'Schedule' }, approved: { status: 'ok', chip: 'Scheduled' }, rejected: { status: 'rejected', chip: 'Not scheduled' } } },
        { label: 'Units in the field', value: '23 units · 11 customers', state: { status: 'evaluate', chip: 'Precautionary notice' } }
      ],
      effects: [
        'Outlook: reply sent from calidad@hidromec-ebro.example',
        'SAP S/4HANA (QM): quality block on 72 seals from batch JNT-2607-031 and on 3 PH-250s from MON-2608-11',
        'Salesforce Service: after-sales service order for 30/09 and case REC-2026-0187 in progress',
        'SAP S/4HANA: NC-2026-0233 moves to “In progress” with the reply attached'
      ],
      next_step: 'Next step: analyse the removed seal on 30/09 (D4), assess the batch campaign and send the 8D by 13/10/2026.',
      toast_approved: 'Reply sent to Prensas y Servicios del Norte · 72 seals and 3 presses blocked',
      reject_text: 'The reply is not sent, the kit is not dispatched and nothing is blocked. The reason is kept in the audit log.',
      reject_placeholder: 'For example: wait for after-sales to confirm the visit before replying',
      reject_audit: 'nothing is sent or blocked',
      toast_rejected: 'Reply rejected: nothing has been sent and no seal has been blocked'
    },
    compare: {
      rows: [
        { k: 'People involved', hoy: '4–5: Quality, after-sales, production, maintenance and purchasing', pro_strong: '1', pro: ': Quality reviews, corrects if needed and approves' },
        { k: 'Systems to open', hoy: '6: Outlook, Salesforce, Windchill, SAP, Opcenter and Maximo', pro_strong: '1', pro: ': this console; Agentic Platform queries all 6' }
      ],
      steps_today: '15–20 manual searches, cross-checks and drafts',
      time_label: 'Trace, draft 8D and reply',
      time_today: '3–6 h of work, spread over 1–2 days',
      footer: 'Proposed acceptance criterion for the pilot: trace and draft in under 15 minutes, and Quality accepts the draft with minor edits in at least 70% of cases.'
    },
    audit: {
      requested: { action: 'Complaint analysis requested', detail: 'REC-2026-0187 · email from sat@psnorte.example of 28/09/2026 17:42' },
      analyzed: { action: 'Complaint analysed', detail: 'REC-2026-0187 · PH250-26-0412 · batch JNT-2607-031' },
      after_analysis: [
        { action: 'Non-conformance recorded as a draft', detail: 'NC-2026-0233 · SAP QM (Q2 notification) · linked to REC-2026-0187' },
        { action: '8D draft prepared', detail: 'NC-2026-0233 · D1–D8 · seal batch as a hypothesis to be confirmed' },
        { action: 'Customer reply drafted', detail: 'REC-2026-0187 · English · version 1 · pending approval' }
      ],
      approved: { action: 'Reply approved and sent', detail: 'REC-2026-0187 · to sat@psnorte.example · NC-2026-0233' },
      after_approval: [
        { action: 'Quality block applied', detail: 'SAP QM · 72 seals from batch JNT-2607-031 in C-14-03' },
        { action: 'Quality block applied', detail: 'SAP QM · PH250-26-0476, PH250-26-0477 and PH250-26-0478 (MON-2608-11)' },
        { action: 'Service order created', detail: 'Salesforce Service · KJ-80 kit (batch JNT-2609-006) and visit to Estampaciones Nervión on 30/09' },
        { action: 'Non-conformance updated', detail: 'NC-2026-0233 · In progress · reply attached' }
      ]
    },
    outcome_label: 'Reply sent · NC-2026-0233 in progress',
    toast_analyzed: 'Complaint analysed · 8D and reply drafted',
    status_chips: { approved: 'Reply sent · 8D in progress' },
    report: {
      button: 'Download 8D report',
      title: '8D report · complaint REC-2026-0187',
      subtitle: 'Oil leak on the main cylinder of PH-250 press s/n PH250-26-0412 · seal batch JNT-2607-031 · Prensas y Servicios del Norte, Estampaciones Nervión',
      filename: '8D-report-NC-2026-0233-REC-2026-0187',
      meta: [['Plant', 'Zaragoza (PLAZA)'], ['Complaint', 'REC-2026-0187 · 28/09/2026 · customer ref. INC-PSN-0931'], ['Unit', 'PH-250 · PH250-26-0412'], ['Report to the customer', 'by 13/10/2026']],
      state: { pending: 'Draft · pending approval', approved: 'Approved for sending · D4 open', rejected: 'Draft · reply rejected' },
      summary: [
        'Warranty claim from Prensas y Servicios del Norte, S.L. (distributor, Bilbao): oil leak between the rod and the main cylinder seal of PH-250 press s/n PH250-26-0412, installed at Estampaciones Nervión (Basauri), at 412 h. No injuries.',
        'The press was assembled on 29/07/2026 with 48 KJ-80 seals from batch JNT-2607-031 (Sellados Ibéricos, supplier batch SI-26-1187). Of the batch, 1,104 seals are fitted in 23 units in the field and 3 PH-250s at the plant, 72 remain in stock and 24 were scrapped at goods receipt for flash on the lip.',
        'Cause hypothesis, to be confirmed with the removed seal: moulding defect on the lip of the seals in the batch. The 28/09 retest found seepage on 2 of the 3 PH-250s from the same batch still at the plant.'
      ],
      trace_heading: 'Annex A · Unit and batch trace',
      trace_rows: [
        { etapa: 'Supplier', fecha: '14/07/2026', detalle: 'Sellados Ibéricos moulds batch SI-26-1187 (PU 92 Shore A, NBR lip) · 3.1 certificate', ref: 'SI-26-1187' },
        { etapa: 'Goods receipt', fecha: '21/07/2026', detalle: '1,200 KJ-80 kits · ISO 2859-1 level II sampling (80) conforming · 24 scrapped for flash on the lip', ref: 'JNT-2607-031' },
        { etapa: 'Machining', fecha: '24/07/2026', detalle: 'CIL-250 barrel on MC-02, honed · rod ground on RECT-01 (Ra 0.2 µm)', ref: 'PO 4100731' },
        { etapa: 'Assembly', fecha: '29/07/2026', detalle: 'Main cylinder, cushion and ejector on LM-2 with 48 seals from the batch · cover torque conforming', ref: 'MON-2607-22' },
        { etapa: 'Test', fecha: '31/07/2026 10:20', detalle: 'Test bench BP-1 · 312 bar (1.25 × nominal) 30 min · no leak or seepage', ref: 'PRB-26-07-0918' },
        { etapa: 'Shipment', fecha: '03/08/2026 14:00', detalle: 'Special transport to Bilbao', ref: '80041977' },
        { etapa: 'Commissioning', fecha: '04/08/2026', detalle: 'Installed at Estampaciones Nervión (Basauri) by the distributor’s technical service', ref: 'PEM-26-0388' },
        { etapa: 'Service', fecha: '15/09/2026', detalle: '250 h service (return filter change) with no leak noted', ref: 'SRV-26-1402' },
        { etapa: 'Failure', fecha: '24/09/2026', detalle: 'Leak at the main cylinder rod at 412 h and 230 bar', ref: 'INC-PSN-0931' },
        { etapa: 'Retest', fecha: '28/09/2026', detalle: 'Seepage on PH250-26-0476 and PH250-26-0478 (same seal batch); PH250-26-0477 conforming', ref: 'MON-2608-11' }
      ],
      units: {
        heading: 'Annex B · Seals from batch JNT-2607-031 by destination',
        cols: [{ label: 'Destination', key: 'dest', mono: true }, { label: 'Units', key: 'eq' }, { label: 'Seals', key: 'n', num: true }, { label: 'Date', key: 'fecha' }, { label: 'Status', key: 'estado', status: true }],
        rows: [
          { dest: 'MON-2607-22', eq: '8 PH-250 and 2 GH-55 (incl. PH250-26-0412)', n: 432, fecha: '27–31/07/2026', estado: 'In the field' },
          { dest: 'MON-2608-03', eq: '7 PH-250 and 2 GH-55 (incl. PH250-26-0441)', n: 384, fecha: '03–07/08/2026', estado: 'In the field' },
          { dest: 'MON-2608-11', eq: '2 PH-250 and 2 GH-55', n: 192, fecha: '11–14/08/2026', estado: 'In the field' },
          { dest: 'MON-2608-11', eq: 'PH250-26-0476/0477/0478 (2 seeping)', n: 144, fecha: '11–14/08/2026', estado: 'Held by production', estado_after: 'Blocked in QM' },
          { dest: 'C-14-03', eq: '—', n: 72, fecha: '22/07/2026', estado: 'In stock', estado_after: 'Blocked in QM' },
          { dest: 'Scrap', eq: '—', n: 24, fecha: '21/07/2026', estado: 'Scrapped at goods receipt' }
        ]
      },
      history_heading: 'Annex C · Previous complaints (12 months)',
      approvals: [
        { paso: '8D and reply drafts', rol: 'Agentic Platform · Customer complaints agent', kind: 'agent' },
        { paso: 'Customer reply and containment (D3)', rol: 'Quality Manager', kind: 'reply' },
        { paso: 'Root cause confirmation (D4)', rol: 'Quality Manager · Purchasing', kind: 'pending' },
        { paso: '8D closure (D8)', rol: 'Quality Manager', kind: 'pending' }
      ],
      second_signer: { role: 'After-sales manager', note: 'Technical visit and recovery of the seal (D3) · pending' }
    },
    presenter: {
      running: 'While it runs: point out the SAP line (24 seals from the batch scrapped for flash at goods receipt), the Opcenter retest (seepage on 2 presses from the same batch) and the Salesforce line (two seal leaks in a year). If needed, “Speed up”.',
      idle: [
        'Email from Prensas y Servicios del Norte, a distributor in Bilbao: a PH-250 delivered in August is losing oil from the main cylinder and their customer’s press is at a standstill. It arrived yesterday at 17:42 with two deadlines: acknowledgement within 24 hours and an 8D within 10 working days.',
        'In production, Agentic Platform analyses it as soon as it reaches the Quality mailbox. Here we launch it by hand to see what it does and which systems it queries.'
      ],
      pending: [
        'What is highlighted in the email is what Agentic Platform has extracted. The serial number is checked against the Salesforce installed base: it exists, it is under warranty and the rating plate matches.',
        'The trace: from the serial number to the as-built configuration in Windchill, from there to seal batch JNT-2607-031 and forwards to the 23 units in the field with seals from the same batch, plus 3 presses and 72 seals still at the plant.',
        'The finding that changes the investigation: at goods receipt 2% of the seals were scrapped for flash on the lip, and yesterday’s retest found seepage on 2 of the 3 presses from the same batch still at the plant. It is a hypothesis, not the cause: the seal has yet to be analysed.',
        'History: in November there was another leak with seals from the same supplier. In D7 the 8D proposes blocking a batch automatically when goods-receipt scrap exceeds 1%.',
        'The reply confirms facts and dates, sends a technician within 48 hours and neither anticipates the cause nor mentions a campaign. It does not go out until Quality approves it.'
      ],
      approved: [
        'Approved: reply sent, 72 seals and 3 presses blocked in SAP QM, technical visit scheduled and NC-2026-0233 in progress. Everything is in the audit log.',
        'The comparison below: today, 4–5 people and 6 systems over several hours; here, one review and one approval. The “today” figure is measured in the pilot, not made up.',
        'The 8D report downloads as a controlled document: code, revision, status, approvals and page numbers.'
      ],
      next: {
        pending: 'Press “Review and approve” (at the top) or scroll down to the reply and press “Approve and send”. Optional: “Correct” the serial number with a non-existent one to show that it does not make up data.',
        approved: 'Press “Download 8D report” and show the document header. Then move on to “Traceability drill” for the campaign on batch JNT-2607-031.'
      }
    }
  }
});
