/* Hidromec Ebro · "How Agentic Platform fits": architecture, demo versus pilot, hours calculator and questions (English).
 * Fictitious company; synthetic demonstration data (MFM). */
agenticPackEn('maquinaria', {
  plataforma: {
    nav: 'How it fits at Hidromec',
    title: 'How it fits at Hidromec Ebro',
    actor: 'quality',
    site: { kind: 'Plant', name: 'Zaragoza plant (PLAZA)', realm: 'Quality · Zaragoza' },
    pageMeta: [
      { icon: 'factory', text: 'Zaragoza plant (PLAZA)' },
      { icon: 'server', text: 'Installed on your infrastructure' },
      { icon: 'user-check', text: 'Human approval before writing' }
    ],
    kpis: [
      { label: 'Proposed pilot', value: '6–8', unit: 'weeks', sub: '1 use case · Zaragoza · Quality realm', icon: 'calendar' },
      { label: 'Systems connected in the pilot', value: '1–2', unit: 'read-only', sub: 'Via API or database replica', icon: 'database' },
      { label: 'Pilot users', value: '5–10', sub: 'SSO with Microsoft Entra ID', icon: 'users' }
    ],
    arch: {
      title: 'Reference architecture at the Zaragoza plant',
      sso: 'SSO sign-in · Microsoft Entra ID',
      ssoShort: 'Microsoft Entra ID SSO',
      console: 'Web console and alerts in Microsoft Teams',
      consoleShort: 'Web console and Teams'
    },
    deploy: {
      cpd: { seg: 'Own data centre', label: 'Own data centre · virtual machine with Docker Compose', zone: 'Hidromec Ebro data centre · VM with Docker Compose', text: 'A virtual machine in your Zaragoza data centre with Docker Compose: application, Postgres database and Qdrant vector store.' },
      k8s: { seg: 'Kubernetes', label: 'Kubernetes · Helm', zone: 'Hidromec Ebro Kubernetes cluster · Helm', text: 'Deployed with Helm on your Kubernetes cluster: application, Postgres database and Qdrant vector store.' },
      cloud: { seg: 'Own cloud', label: 'Hidromec Ebro cloud (Azure, AWS or GCP)', zone: 'Hidromec Ebro cloud subscription (Azure, AWS or GCP)', text: 'The same installation in your cloud subscription, in the region of your choice (EU).' }
    },
    llm: {
      azure: { seg: 'Azure OpenAI', name: 'Azure OpenAI', local: false, place: 'EU region, under the Hidromec Ebro contract', exit: 'Only the text of each request leaves your network', note: 'Connected through the Agentic Platform LiteLLM gateway; confirmed in weeks 1–2.' },
      gemini: { seg: 'Gemini', name: 'Google Gemini', local: false, place: 'With the account and region Hidromec Ebro contracts', exit: 'Only the text of each request leaves your network', note: 'Provider included as standard in the Agentic Platform model catalogue.' },
      local: { seg: 'Local model', name: 'Local model', local: true, place: 'GPU server in your data centre (Ollama, LM Studio or llama.cpp)', exit: 'Inference runs inside your network', note: 'Quality and speed are sized to your server. IT also reviews the connector and telemetry flows.' }
    },
    people: ['quality', 'quality_shift', 'maintenance', 'production', 'after_sales', 'purchasing'],
    peopleShort: ['Quality', 'Shift quality', 'Maintenance', 'Production', 'After-sales', 'Purchasing'],
    modules: [
      { icon: 'workflow', title: 'Workflows (Routines)', text: 'Visual editor, versions and dry run' },
      { icon: 'cpu', title: 'Plant agents', text: 'Maintenance, quality, planning, after-sales and 8D', agents: true },
      { icon: 'user-check', title: 'Human approval', text: 'Nothing is written to a system without its owner', approval: true },
      { icon: 'book-open', title: 'Procedures with citations', text: 'Every answer links its source; with no source, it says so' },
      { icon: 'history', title: 'Audit log', text: 'Append-only and exportable' },
      { icon: 'key', title: 'Permissions by role and realm', text: 'Each plant or department sees its own' },
      { icon: 'gauge', title: 'Cost per request', text: 'USD estimate and budget per realm' },
      { icon: 'shield', title: 'Model gateway', text: 'Masks personal data before the model', gateway: true }
    ],
    tiles: [
      { name: 'SAP S/4HANA', icon: 'database', text: 'Reads orders, batches, serial numbers and purchase orders. Proposes the QM block.', write: true },
      { name: 'MES Opcenter', icon: 'factory', text: 'Reads production orders and parts by machine and shift.', write: false },
      { name: 'IIoT Vibración', icon: 'activity', text: 'Reads spindle vibration and its alarms. Does not act on the machines.', write: false },
      { name: 'GMAO Maximo', icon: 'wrench', text: 'Reads asset history. Prepares work orders.', write: true },
      { name: 'PLM Windchill', icon: 'layers', text: 'Reads bills of materials, drawings and revisions.', write: false },
      { name: 'Salesforce Service', icon: 'users', text: 'Reads cases and installed units. Prepares the case and the reply.', write: true },
      { name: 'Microsoft 365', icon: 'mail', text: 'Alerts in Teams and drafts in Outlook. Sending to the customer is approved.', write: true }
    ],
    decisions: {
      deploy: ['It does not depend on MFM cloud services. Your IT team or a managed service runs it. The plant (OT) network is not opened up: the IIoT is read from the industrial DMZ.'],
      llm: 'The model is switched by configuration, without touching the workflows; OpenAI or AWS Bedrock in the EU are also supported.',
      access: [
        'SSO with Microsoft Entra ID (OIDC) or SAML 2.0. Permissions by role and by realm: the “Quality · Zaragoza” realm only sees its own procedures and data.',
        'The gateway masks personal data (customer and technician contact names) before calling the model; Windchill drawings never leave your network: the agent cites the revision, it does not send the drawing.'
      ],
      hitl: 'Blocking parts in SAP QM, opening a work order in Maximo, reassigning a production order or sending an email to the customer requires approval from its owner. Rejecting applies nothing and is recorded with the reason.',
      limits: [
        'It does not replace SAP S/4HANA, MES Opcenter, GMAO Maximo, PLM Windchill or Salesforce Service.',
        'It does not act on the machines or the CNC: the vibration IIoT is read-only.',
        'It does not release parts or decide on a field campaign: Quality decides (PR-CAL-004 and PR-POS-005).',
        'It does not assign tasks or assess people: it works with machines, orders, batches and documents.'
      ]
    },
    faqTitle: 'Common questions from IT, Quality and Management',
    faqSub: 'Short answers for the conversation with the technical team',
    faq: [
      { topic: 'Integration', q: 'Where is it installed?', a: 'On a virtual machine in your data centre with Docker Compose, on Kubernetes with Helm, or in your cloud subscription. It does not depend on MFM cloud services.' },
      { topic: 'Security', q: 'How do users sign in?', a: 'With Microsoft Entra ID SSO (OIDC) or SAML 2.0. Permissions are by role and by realm (plant or department). The connectors’ service accounts are read-only.' },
      { topic: 'Security', q: 'Does it touch the plant network or the machines?', a: 'No. The vibration IIoT is read from the industrial DMZ, with IEC 62443 zone and conduit segmentation; Agentic Platform does not write to PLCs, CNCs or SCADA. Any shutdown is decided and carried out by Maintenance.' },
      { topic: 'Data', q: 'What data leaves our network?', a: 'With a local model, inference runs inside your network. With an external one, only the text of each request leaves, with no drawings or CAD files; the provider’s contract is reviewed (no training on your data and an EU region). The connector, telemetry and masking flows are validated with IT.' },
      { topic: 'Data', q: 'Who owns the data and the agents?', a: 'Hidromec Ebro. The data, the indexed procedures and the workflows live in your database and can be exported. MFM receives no copy unless agreed for support.' },
      { topic: 'Language model', q: 'Which language model does it use, and can it be changed?', a: 'Whichever you choose: Azure OpenAI, Gemini, OpenAI, AWS Bedrock in the EU or a local model. The Agentic Platform catalogue lets you pin a model per realm and change it by configuration, without touching the workflows.' },
      { topic: 'Language model', q: 'What if the model gets it wrong?', a: 'Every answer cites its source (procedure, order, sensor reading) and, if it cannot find one, says so. No action is applied without approval. In the pilot, accuracy is measured on 20–30 historical cases before live use.' },
      { topic: 'Integration', q: 'Are there connectors for SAP, Opcenter, Maximo or Windchill?', a: 'Not as standard. In the pilot they are built for 1–2 systems, via API (SAP OData, Maximo and Windchill REST) or a read-only database replica; reading Postgres databases already works.' },
      { topic: 'Integration', q: 'How many users does it support?', a: 'Concurrency is sized and verified with load tests. Each realm has limits on requests per minute, tokens per day and budget.' },
      { topic: 'Cost', q: 'How much does each query cost?', a: 'Agentic Platform measures the cost of each request in USD by realm, user and use case, with a daily and monthly budget. A case like the MC-04 alarm costs cents in model usage; the real cost is measured in the pilot.' },
      { topic: 'Cost', q: 'Licence and price?', a: 'Set out in the commercial proposal (SOW).' },
      { topic: 'Integration', q: 'What language does it work in?', a: 'The chat and the agents work in Spanish; replies to customers go out in their own language (the 11 customers in the campaign are in Spain, Portugal and France). The Agentic Platform administration console is in English.' }
    ],
    seen: [
      { scene: 'turno', label: 'Shift summary', icon: 'activity', title: 'Night shift report', text: 'Status of machining, assembly, test bench and dispatch; the agent prepares the daily machine report and leaves it for review.', agents: ['Shift agent'], approver: 'production', outcome: 'parte' },
      { scene: 'workflow', label: 'From words to workflow', icon: 'workflow', title: 'Written procedure → published workflow', text: 'The vibration monitoring procedure (PR-MAN-011) becomes a workflow with trigger, steps, approval and dry run.', agents: ['Workflow generator'], approver: 'maintenance' },
      { scene: 'alarma', label: 'MC-04 alarm', icon: 'activity', title: 'MC-04 spindle vibration', text: '7.8 mm/s RMS against 4.5 (ISO 10816-3, zone D): 42 cylinder heads from batch CUL-2609-118 blocked in QM, a work order in Maximo and OF 4100872 reassigned to MC-02.', agents: ['Maintenance', 'Quality', 'Planning'], approver: 'maintenance', outcome: 'alarma' },
      { scene: 'reclamacion', label: 'Complaint PH250-26-0412', icon: 'mail', title: 'Oil leak on a PH-250', text: 'Email from Prensas y Servicios del Norte: case sheet, trace from the serial number to seal batch JNT-2607-031, draft 8D and acknowledgement within 24 h.', agents: ['After-sales', 'Quality'], approver: 'quality', outcome: 'reclamacion' },
      { scene: 'retirada', label: 'Campaign JNT-2607-031', icon: 'git-branch', title: 'Field campaign drill', text: '1,200 seals → 3 assembly batches → 23 units at 11 customers in Spain, Portugal and France, traced in minutes against the 4 h target.', agents: ['Traceability', 'After-sales'], approver: 'quality', outcome: 'retirada' },
      { scene: 'cuestionario', label: 'Vehículos Industriales Arga questionnaire', icon: 'list-checks', title: 'OEM supplier audit', text: 'Answers with cited evidence (ISO 9001, CE marking, Regulation (EU) 2023/1230, PPAP level 3) and gaps flagged for Quality, such as IATF 16949.', agents: ['Questionnaires'], approver: 'quality', outcome: 'cuestionario' },
      { scene: 'procedimientos', label: 'Procedures', icon: 'book-open', title: 'Questions with citations', text: 'Maintenance, 8D, LOTO and field campaigns: every answer links the section of the current procedure and, if there is no source, says so.', agents: ['Procedures'] }
    ],
    honesty: [
      { aspect: 'Console, workflows (Routines) and editor', demo: 'This console, in the browser, with the workflows published during the session', pilot: 'Agentic Platform installed on your infrastructure; Routines with visual editor, versions and dry run', origin: 'serie' },
      { aspect: 'Workflow from a written procedure', demo: 'Simulated generator in the browser, with three templates', pilot: 'Integrated into Agentic Platform and validated with your procedures; every workflow is reviewed before it is published', origin: 'demo' },
      { aspect: 'Hidromec Ebro agents', demo: 'Maintenance, quality, planning, traceability, after-sales and daily report, on synthetic data', pilot: 'Those for the chosen use case, adapted to your data and procedures', origin: 'demo' },
      { aspect: 'Connectors (SAP S/4HANA, MES Opcenter, IIoT Vibración, GMAO Maximo, PLM Windchill and Salesforce Service)', demo: 'Simulated in the browser', pilot: 'Reading 1–2 systems via API or read-only database replica. There are no standard connectors for SAP, Opcenter, Maximo or Windchill', origin: 'piloto' },
      { aspect: 'Alarm trigger', demo: 'When the MC-04 vibration alarm is opened', pilot: 'Webhook from the IIoT platform or periodic polling (cron): Agentic Platform has no agent scheduler of its own', origin: 'piloto' },
      { aspect: 'Language model', demo: 'No calls: the answers are prepared', pilot: 'Whichever Hidromec Ebro chooses (Azure OpenAI, Gemini or local), through the Agentic Platform gateway', origin: 'serie' },
      { aspect: 'Human approval', demo: 'Approval cards; rejecting applies nothing', pilot: 'The same, with SSO and permissions by role. Nothing is written to SAP in the pilot: drafts and tickets approved by a person', origin: 'serie' },
      { aspect: 'Procedures with citations', demo: '6 synthetic documents (PR-MAN-011, IT-MEC-021, PR-CAL-004, PR-CAL-008, PR-SEG-002 and PR-POS-005)', pilot: 'Your current procedures and work instructions, with permissions by realm; target ≥90% correct citations', origin: 'serie' },
      { aspect: 'Audit log', demo: 'For this session, stored in the browser and exportable to JSON or CSV', pilot: 'In the Agentic Platform database, append-only, with each person’s SSO identity; exportable to CSV', origin: 'serie' },
      { aspect: 'Cost per request', demo: 'Estimate shown at the end of each run', pilot: 'Measured per request in USD, by realm and use case, with a daily and monthly budget', origin: 'serie' },
      { aspect: 'Data and actions', demo: 'Synthetic and consistent throughout, prepared by MFM; the actions never leave the browser', pilot: 'Your data in read-only mode and 20–30 historical cases, anonymised if necessary', origin: 'datos' }
    ],
    writes: 'None in SAP during the pilot: drafts and tickets approved by a person',
    cases: {
      A: {
        label: 'Use case A', short: 'Use case A · Customer complaint', title: 'Customer complaint: 8D and reply',
        systems: ['Salesforce Service', 'SAP S/4HANA', 'PLM Windchill'], systemsText: 'Salesforce Service, SAP S/4HANA and PLM Windchill',
        trigger: 'Incoming email in the after-sales mailbox (Outlook) or a new case in Salesforce Service',
        output: 'Complaint sheet, trace from the serial number to the component batch, draft 8D (D1–D4) and acknowledgement in the customer’s language, for approval',
        scene: 'reclamacion', sceneLabel: 'Complaint PH250-26-0412',
        accuracy: '≥90% of 30 historical complaints correctly extracted (serial number, model, defect, component and deadline)',
        accuracyHow: 'Comparison with the cases closed in Salesforce Service'
      },
      B: {
        label: 'Use case B', short: 'Use case B · Vibration alarm', title: 'Vibration alarm: parts, block with approval and work order',
        systems: ['IIoT Vibración', 'MES Opcenter', 'GMAO Maximo'], systemsText: 'IIoT Vibración, MES Opcenter and GMAO Maximo',
        trigger: 'Alarm from the IIoT platform via webhook or periodic polling (cron)',
        output: 'Parts machined in the alarm window, block proposal for approval, draft work order and alert in Teams',
        scene: 'alarma', sceneLabel: 'MC-04 alarm',
        accuracy: '100% of the affected parts identified in 20 historical vibration episodes',
        accuracyHow: 'Comparison with the operations recorded in MES Opcenter for each episode'
      }
    },
    phases: [
      { from: 1, to: 2, title: 'Access, installation and baseline', detail: 'Read access, installation and measurement of the current time', result: 'Criteria signed off and baseline measured' },
      { from: 3, to: 5, title: 'Connectors, agents and workflow', detail: 'Tests with 20–30 historical cases', result: 'Accuracy measured on historical cases' },
      { from: 6, to: 7, title: 'Parallel running', detail: 'Real cases, with the current process as a fallback', result: 'Quality acceptance of the drafts' },
      { from: 8, to: 8, title: 'Evaluation and decision', detail: 'Criteria measured and final report', result: 'Final report and decision' }
    ],
    criteria: [
      { name: 'Time', target: 'Trace and draft in under 15 min', how: 'Timed against the baseline from weeks 1–2' },
      { name: 'Usefulness', target: 'Quality accepts the draft with minor edits in ≥70% of cases', how: 'Quality reviews every draft' },
      { name: 'Citations', target: '≥90% of 50 reference questions with the correct citation', how: 'Evaluation tool included in Agentic Platform' },
      { name: 'Control', target: 'No action without approval; 100% in the audit log', how: 'Review of the exported log' },
      { name: 'Cost', target: 'Model cost per case measured and within the realm budget', how: 'Cost report by realm (USD, estimate)' }
    ],
    gives: {
      client: ['Quality lead and IT contact', 'Read access to 1–2 systems', '20–30 historical cases, anonymised if necessary', 'Current procedures and work instructions', '2–3 h a week from Quality and Maintenance'],
      mfm: ['Installation on your infrastructure', 'Read connectors', 'Agents and workflow for the use case', 'User training', 'Final report with the measured criteria']
    },
    pilot: {
      sub: 'One use case, one plant (Zaragoza), one realm (Quality) and 5–10 users, on your infrastructure and with your model',
      after: 'After the pilot: predictive maintenance using the vibration trend of the 14 machining centres, or PPAP preparation for new part numbers with Windchill.',
      nextTitle: 'Next step: 2-hour workshop with Quality, Maintenance and IT',
      nextBody: 'To choose the use case, confirm the read access and set the baseline against which the pilot will be measured.'
    },
    calc: {
      fteHours: 1736,
      note: 'Hours of repetitive work that Quality, Maintenance, after-sales and the shift supervisors can spend on other tasks.',
      rows: [
        { id: 'reclamacion', label: 'Customer complaint: trace, 8D and reply', who: 'Quality and after-sales', scene: 'reclamacion', seen: 'Complaint PH250-26-0412', n: 6, before: 240, after: 60, basis: 'Case sheet, serial number trace and 8D D1–D4' },
        { id: 'alarma', label: 'Machine alarm: parts, block and work order', who: 'Maintenance and shift Quality', scene: 'alarma', seen: 'MC-04 alarm', n: 5, before: 120, after: 15, basis: 'IIoT × Opcenter cross-check, QM block and work order in Maximo' },
        { id: 'cuestionario', label: 'Supplier audit questionnaire', who: 'Quality', scene: 'cuestionario', seen: 'Customer questionnaire', n: 2, before: 480, after: 120, basis: 'OEMs and distributors; with cited evidence' },
        { id: 'traza', label: 'Serial number trace or field campaign', who: 'Quality and after-sales', scene: 'retirada', seen: 'Campaign drill', n: 2, before: 360, after: 30, basis: 'Component batch → units → customers' },
        { id: 'consultas', label: 'Questions on procedures and work instructions', who: 'Maintenance, assembly and Quality', scene: 'procedimientos', seen: 'Procedures', n: 80, before: 12, after: 3, basis: 'Searching folders and Windchill' },
        { id: 'parte', label: 'Shift and machine report', who: 'Shift supervisors', scene: 'turno', seen: 'Shift summary', n: 66, before: 25, after: 8, basis: '3 shifts × 22 days' }
      ]
    },
    auditEmpty: 'Generate the shift report, publish a workflow or approve the MC-04 block: each step will appear here with its time, actor and view.',
    auditPilot: 'The log lives in the Agentic Platform database, identifies each person by their SSO, can be filtered by person, action and date, and exports to CSV. In this demo it lives in this browser and is cleared with “Reset demo”.',
    proposal: {
      code: 'PIL-PLAZA-2026-01',
      filename: 'agentic-pilot-proposal-hidromec-zaragoza',
      objective: 'To measure, with a real use case and signed-off criteria, how much Quality, Maintenance and after-sales time Agentic Platform frees up and how accurately, without changing SAP S/4HANA, MES Opcenter, IIoT Vibración, GMAO Maximo, PLM Windchill or Salesforce Service. Agentic Platform reads from those systems, reasons with the procedures and proposes; a person approves before anything is written.',
      signatures: [{ role: 'quality', note: 'Agrees with the scope and criteria' }, { role: 'IT · Hidromec Ebro', note: 'Agrees with the access and deployment' }]
    },
    presenter: {
      arquitectura: [
        'Agentic Platform replaces nothing: it sits on top of SAP, Opcenter, Maximo, Windchill and Salesforce. It reads, reasons with your procedures and proposes; before writing to a system, a person approves.',
        'It is installed on your infrastructure, with your Microsoft Entra ID SSO and the model you choose. With a local model, inference stays in your network; IT validates the other flows.',
        'The dashed amber lines are the only writes, and always after approval. The vibration IIoT is read-only: neither the CNC nor the plant network is touched.'
      ],
      piloto: [
        'This is what you have seen today: seven plant use cases, each with its agents and its approver. Click any of them to go back to it.',
        'To be honest: today’s data is synthetic and the demo does not call any model. Standard in Agentic Platform: Routines, human approval, audit, citations and cost per request. The SAP, Opcenter or Maximo connectors are built in the pilot, in read-only mode.',
        '6–8 week pilot: one use case, Zaragoza, Quality realm, 5–10 users. The acceptance criteria are signed off in week 1 and measured in week 8.'
      ],
      horas: [
        'Ask how many complaints, machine alarms or OEM questionnaires they handle per month and type them in: the calculator is theirs.',
        '“With Agentic Platform” includes a person’s review and approval. These are hours of repetitive work that Quality and Maintenance can spend on other tasks.',
        'These are assumptions to discuss: the real baseline is measured in weeks 1–2 of the pilot.'
      ],
      registro: [
        'Everything we have done today is here: {n}, by people and by agents, with time, actor and view.',
        'Filter by “Decisions”: every approval and every rejection, with its reason. Nothing is edited or deleted from the console; it exports to JSON or CSV.',
        'To close: we propose a 2-hour workshop with Quality, Maintenance and IT to choose the use case and set the baseline.'
      ],
      next: {
        arquitectura: 'Click “Local model” to show that the model comes inside their network; then the “Demo and pilot” tab.',
        piloto: 'Choose use case A or B with them and open the “Hours calculator” tab.',
        horas: 'Enter their monthly cases and open “Audit log” to close.',
        registro: 'Click “Download pilot proposal (PDF)” and propose a date for the 2-hour workshop.'
      }
    },
    tour: [
      'Agentic Platform sits on top of SAP, Opcenter, Maximo, Windchill and Salesforce: it reads, prepares proposals and a person approves before anything is written.',
      'With a local model, inference runs inside your infrastructure; the other flows are validated with IT.',
      'Today’s use cases, from the MC-04 alarm to the JNT-2607-031 seal campaign, and what is standard versus what is built in the pilot.',
      '6–8 week pilot: one use case, the Zaragoza plant, Quality realm and acceptance criteria signed off in week 1.',
      'Hours freed up with editable assumptions; the real baseline is measured in the pilot.',
      'Everything done in the session stays in the audit log: human decisions, agent steps and export.'
    ]
  }
});
