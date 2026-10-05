/* Mercados Moncayo · “How Agentic Platform fits”: architecture, demo versus pilot, hours calculator and FAQs (English).
 * Fictitious company; synthetic demo data (MFM). */
agenticPackEn('retail', {
  plataforma: {
    nav: 'How it fits Moncayo',
    title: 'How it fits Mercados Moncayo',
    actor: 'quality',
    site: { kind: 'Site', name: 'Plaza distribution centre and 64 stores', realm: 'Quality · DC and stores' },
    pageMeta: [
      { icon: 'warehouse', text: 'Plaza distribution centre · 64 stores' },
      { icon: 'server', text: 'Installed on your infrastructure' },
      { icon: 'user-check', text: 'Human approval before any write' }
    ],
    kpis: [
      { label: 'Proposed pilot', value: '6–8', unit: 'weeks', sub: '1 use case · DC and 10 stores · Quality realm', icon: 'calendar' },
      { label: 'Systems connected in the pilot', value: '1–2', unit: 'read-only', sub: 'Via API or database replica', icon: 'database' },
      { label: 'Pilot users', value: '5–10', sub: 'SSO with Microsoft Entra ID', icon: 'users' }
    ],
    arch: {
      title: 'Reference architecture for the distribution centre and stores',
      sso: 'SSO sign-in · Microsoft Entra ID',
      ssoShort: 'Microsoft Entra ID SSO',
      console: 'Web console, Teams notifications and in-store tablet',
      consoleShort: 'Web console and Teams'
    },
    deploy: {
      cpd: { seg: 'Own data centre', label: 'Own data centre · virtual machine with Docker Compose', zone: 'Mercados Moncayo data centre · VM with Docker Compose', text: 'A virtual machine in your data centre with Docker Compose: application, Postgres database and Qdrant vector store.' },
      k8s: { seg: 'Kubernetes', label: 'Kubernetes · Helm', zone: 'Mercados Moncayo Kubernetes cluster · Helm', text: 'Helm deployment on your Kubernetes cluster: application, Postgres database and Qdrant vector store.' },
      cloud: { seg: 'Own cloud', label: 'Mercados Moncayo cloud (Azure, AWS or GCP)', zone: 'Mercados Moncayo cloud subscription (Azure, AWS or GCP)', text: 'The same installation in your cloud subscription, in the region of your choice (EU).' }
    },
    llm: {
      azure: { seg: 'Azure OpenAI', name: 'Azure OpenAI', local: false, place: 'EU region, under the Mercados Moncayo contract', exit: 'Only the text of each request leaves your network', note: 'Connected through the Agentic Platform LiteLLM gateway; confirmed in weeks 1–2.' },
      gemini: { seg: 'Gemini', name: 'Google Gemini', local: false, place: 'With the account and region Mercados Moncayo contracts', exit: 'Only the text of each request leaves your network', note: 'Provider included as standard in the Agentic Platform model catalogue.' },
      local: { seg: 'Local model', name: 'Local model', local: true, place: 'GPU server in your data centre (Ollama, LM Studio or llama.cpp)', exit: 'Inference runs inside your network', note: 'Quality and speed depend on how your server is sized. IT also reviews the connector and telemetry flows.' }
    },
    people: ['quality', 'quality_shift', 'store_ops', 'maintenance', 'logistics', 'customer_service', 'supplier_quality'],
    peopleShort: ['Quality', 'On-call Quality', 'Area managers', 'Refrigeration', 'DC', 'Consumer', 'Suppliers'],
    modules: [
      { icon: 'workflow', title: 'Workflows (Routines)', text: 'Visual editor, versions and dry run' },
      { icon: 'cpu', title: 'Store and DC agents', text: 'Cold chain, alerts, recalls, consumers and suppliers', agents: true },
      { icon: 'user-check', title: 'Human approval', text: 'Nothing is written to a system without its owner', approval: true },
      { icon: 'book-open', title: 'Procedures with citations', text: 'Every answer links its source; with no source, it says so' },
      { icon: 'history', title: 'Audit log', text: 'Append-only and exportable' },
      { icon: 'key', title: 'Permissions by role and realm', text: 'Each area, store or department sees its own data' },
      { icon: 'gauge', title: 'Cost per request', text: 'USD estimate and budget per realm' },
      { icon: 'shield', title: 'Model gateway', text: 'Masks consumer data before it reaches the model', gateway: true }
    ],
    tiles: [
      { name: 'SAP S/4 Retail', icon: 'database', text: 'Reads articles, lots, orders and stock by store. Proposes sales blocks.', write: true },
      { name: 'WMS Manhattan', icon: 'warehouse', text: 'Reads stock, locations and shipments to stores. Proposes stock holds.', write: true },
      { name: 'Sensores de frío', icon: 'thermometer', text: 'Reads multideck and cold room temperatures. Does not act on the equipment.', write: false },
      { name: 'TPV tiendas', icon: 'barcode', text: 'Reads sales by store, receipt and lot.', write: false },
      { name: 'CRM Fidelización', icon: 'users', text: 'Reads member purchases. Prepares notices and replies to consumers.', write: true },
      { name: 'ServiceNow', icon: 'ticket', text: 'Prepares refrigeration work orders and store tasks.', write: true },
      { name: 'Microsoft 365', icon: 'mail', text: 'Teams notifications and Outlook drafts. Sending is approved.', write: true }
    ],
    decisions: {
      deploy: ['No dependency on MFM cloud services. Run by your IT team or a managed service; stores use it from the browser or the in-store tablet, with nothing to install.'],
      llm: 'The model is changed through configuration, without touching the workflows; OpenAI or AWS Bedrock in the EU are also supported.',
      access: [
        'SSO with Microsoft Entra ID (OIDC) or SAML 2.0. Permissions by role and realm: an area manager sees their stores; Quality sees the DC and the whole network.',
        'Loyalty member data is personal data (GDPR): the gateway masks name, phone number and email before calling the model; the notice to the 612 customers of the lot is prepared with its legal basis and approved by Quality.'
      ],
      hitl: 'Blocking the sale of a lot in SAP and the POS, holding stock in Manhattan, sending a removal task to a store, opening a refrigeration work order or writing to a consumer requires approval from its owner. Rejecting applies nothing and is logged with the reason.',
      limits: [
        'It does not replace SAP S/4 Retail, WMS Manhattan, the POS, the CRM or ServiceNow.',
        'It does not act on refrigeration equipment: sensors are read-only.',
        'It does not decide a recall or the notification to AESAN and the regional authority: Quality decides (PR-CAL-010).',
        'It does not assess people or stores: it works with products, lots, equipment and documents.'
      ]
    },
    faqTitle: 'Common questions from IT, Quality and Management',
    faqSub: 'Short answers for the conversation with the technical team',
    faq: [
      { topic: 'Integration', q: 'Where is it installed?', a: 'On a virtual machine in your data centre with Docker Compose, on Kubernetes with Helm, or in your cloud subscription. No dependency on MFM cloud services.' },
      { topic: 'Integration', q: 'Are there connectors for SAP, Manhattan or the POS?', a: 'Not out of the box. In the pilot they are built for 1–2 systems, via API (SAP OData, Manhattan REST) or a read-only database replica; cold-chain sensors usually expose an API or MQTT. Reading Postgres databases already works.' },
      { topic: 'Integration', q: 'How do the stores use it?', a: 'From the browser on the in-store tablet or PC, or through Teams notifications. The removal task arrives with the shelf, the units and the cited procedure; the store manager confirms it and it is logged.' },
      { topic: 'Security', q: 'How do users sign in?', a: 'With Microsoft Entra ID SSO (OIDC) or SAML 2.0. Permissions are by role and realm (area, store or department). Connector service accounts are read-only.' },
      { topic: 'Data', q: 'What data leaves our network?', a: 'With a local model, inference runs inside your network. With an external one, only the text of each request leaves, with no member data in clear; the provider contract is reviewed (no training on your data, EU region). Connector, telemetry and masking flows are validated with IT.' },
      { topic: 'Data', q: 'What about GDPR and loyalty data?', a: 'Mercados Moncayo is the controller; MFM is a processor under contract (Art. 28). Notifying people who bought a recalled lot rests on protecting consumer health; before real data is used it is reviewed with the DPO. Data minimisation: the agent only requests the fields it needs.' },
      { topic: 'Language model', q: 'Which language model does it use and can it be changed?', a: 'Whichever you choose: Azure OpenAI, Gemini, OpenAI, AWS Bedrock in the EU or a local model. The Agentic Platform catalogue lets you pin a model per realm and change it through configuration, without touching the workflows.' },
      { topic: 'Language model', q: 'What if the model gets it wrong?', a: 'Every answer cites its source (HACCP procedure, sensor reading, stock movement) and, if it cannot find one, says so. No action is applied without approval. In the pilot, accuracy is measured with 20–30 historical cases.' },
      { topic: 'Integration', q: 'How many users can it support?', a: 'Concurrency is sized and verified with load tests: for a 64-store network, with usage peaks at opening time. Each realm has limits on requests per minute, tokens per day and budget.' },
      { topic: 'Cost', q: 'How much does each query cost?', a: 'Agentic Platform measures the cost of each request in USD by realm, user and use case, with daily and monthly budgets. A refrigeration alarm costs cents in model usage; the real cost is measured in the pilot.' },
      { topic: 'Cost', q: 'Licence and price?', a: 'Set out in the commercial proposal (SOW).' },
      { topic: 'Integration', q: 'What language does it work in?', a: 'Chat and agents in Spanish; replies to consumers and suppliers in their own language. The Agentic Platform administration console is in English.' }
    ],
    seen: [
      { scene: 'turno', label: 'Shift summary', icon: 'activity', title: 'Night shift summary', text: 'Plaza distribution centre and 64 stores: goods-in, picking, dispatch and refrigeration; the agent prepares the report and leaves it for review.', agents: ['Shift agent'], approver: 'decider', outcome: 'parte' },
      { scene: 'workflow', label: 'From words to workflow', icon: 'workflow', title: 'Written procedure → published workflow', text: 'The in-store cold chain HACCP procedure (APPCC-TIE-01) becomes a workflow with trigger, steps, approval and dry run.', agents: ['Workflow generator'], approver: 'quality' },
      { scene: 'alarma', label: 'T-027 alarm', icon: 'thermometer', title: 'Huesca Centro dairy multideck', text: 'MR-3 at 9.4 °C against 5 °C since 03:55: 318 units reviewed, sales block on anything exposed for more than 2 h, removal task and refrigeration work order.', agents: ['Store', 'Refrigeration', 'Quality'], approver: 'quality', outcome: 'alarma' },
      { scene: 'reclamacion', label: 'L26214 complaint', icon: 'mail', title: 'Glass in Moncayo tomato sauce', text: 'App message from Javier Lasheras: case record, trace of lot L26214, notice to Conservas del Jalón and reply to the consumer within 48 h.', agents: ['Consumer Care', 'Quality'], approver: 'quality', outcome: 'reclamacion' },
      { scene: 'retirada', label: 'L26214 recall', icon: 'git-branch', title: 'Mock recall of the lot', text: '4,800 units → 41 stores → 1,920 sold and 612 members who can be notified, traced in minutes against the 4 h target; draft for AESAN.', agents: ['Traceability', 'Stores', 'Loyalty'], approver: 'quality', outcome: 'retirada' },
      { scene: 'cuestionario', label: 'IFS Logistics pre-audit', icon: 'list-checks', title: 'IFS Logistics v3 for the DC', text: 'Answers with cited evidence (HACCP, temperatures, traceability, pest control, food defence) and gaps flagged for Quality.', agents: ['Questionnaires'], approver: 'quality', outcome: 'cuestionario' },
      { scene: 'procedimientos', label: 'Procedures', icon: 'book-open', title: 'Questions with citations', text: 'Store HACCP, alerts, complaints and own-brand suppliers: every answer links the current section and, if there is no source, says so.', agents: ['Procedures'] }
    ],
    honesty: [
      { aspect: 'Console, workflows (Routines) and editor', demo: 'This console, in the browser, with the workflows published during the session', pilot: 'Agentic Platform installed on your infrastructure; Routines with visual editor, versions and dry run', origin: 'serie' },
      { aspect: 'Workflow from a written procedure', demo: 'Generator simulated in the browser, with three templates', pilot: 'Integrated into Agentic Platform and validated with your procedures; each workflow is reviewed before it is published', origin: 'demo' },
      { aspect: 'Mercados Moncayo agents', demo: 'Cold chain, alerts, recalls, consumers, suppliers and shift report, on synthetic data', pilot: 'Those for the chosen use case, adapted to your data and procedures', origin: 'demo' },
      { aspect: 'Connectors (SAP S/4 Retail, WMS Manhattan, cold-chain sensors, store POS, loyalty CRM and ServiceNow)', demo: 'Simulated in the browser', pilot: 'Read access to 1–2 systems via API or read-only database replica. There are no out-of-the-box connectors for SAP, Manhattan or the POS', origin: 'piloto' },
      { aspect: 'Alarm trigger', demo: 'When the alarm for multideck MR-3 at T-027 is opened', pilot: 'Webhook from the sensor platform or periodic polling (cron): Agentic Platform has no agent scheduler of its own', origin: 'piloto' },
      { aspect: 'Language model', demo: 'No calls: the answers are pre-prepared', pilot: 'Whichever Mercados Moncayo chooses (Azure OpenAI, Gemini or local), via the Agentic Platform gateway', origin: 'serie' },
      { aspect: 'Human approval', demo: 'Approval cards; rejecting applies nothing', pilot: 'The same, with SSO and role-based permissions. In the pilot nothing is written to SAP or the POS: drafts and tasks approved by a person', origin: 'serie' },
      { aspect: 'Procedures with citations', demo: '5 synthetic documents (APPCC-TIE-01, PR-CAL-010, PR-ATC-002, PR-PRO-006 and IT-TIE-014)', pilot: 'Your current procedures, with permissions by realm; target ≥90 % correct citations', origin: 'serie' },
      { aspect: 'Audit log', demo: 'For this session, stored in the browser and exportable to JSON or CSV', pilot: 'In the Agentic Platform database, append-only, with each person’s SSO identity; exportable to CSV', origin: 'serie' },
      { aspect: 'Cost per request', demo: 'Estimate shown at the end of each run', pilot: 'Measured per request in USD, by realm and use case, with daily and monthly budgets', origin: 'serie' },
      { aspect: 'Data and actions', demo: 'Synthetic and mutually consistent, prepared by MFM; actions never leave the browser', pilot: 'Your data in read-only mode and 20–30 historical cases, anonymised if needed', origin: 'datos' }
    ],
    writes: 'None to SAP or the POS during the pilot: drafts and tasks approved by a person',
    cases: {
      A: {
        label: 'Use case A', short: 'Use case A · Consumer complaint', title: 'Consumer complaint: case record, lot trace and reply',
        systems: ['CRM Fidelización', 'SAP S/4 Retail', 'WMS Manhattan'], systemsText: 'loyalty CRM, SAP S/4 Retail and WMS Manhattan',
        trigger: 'Incoming message from the loyalty app, the web form or the consumer care mailbox',
        output: 'Complaint record, lot trace, notice to the own-brand manufacturer and draft reply to the consumer, for approval',
        scene: 'reclamacion', sceneLabel: 'Complaint about lot L26214',
        accuracy: '≥90 % of 30 historical complaints correctly extracted (product, lot, store, defect and deadline)',
        accuracyHow: 'Comparison with the Consumer Care log'
      },
      B: {
        label: 'Use case B', short: 'Use case B · In-store refrigeration alarm', title: 'In-store refrigeration alarm: products, sales block and work order',
        systems: ['Sensores de frío', 'TPV tiendas', 'ServiceNow'], systemsText: 'cold-chain sensor temperatures, POS sales and ServiceNow',
        trigger: 'Alarm from the sensor platform via webhook or periodic polling (cron)',
        output: 'Exposed products and units, sales block proposal for approval, removal task for the store, draft refrigeration work order and Teams notice',
        scene: 'alarma', sceneLabel: 'T-027 alarm · MR-3',
        accuracy: '100 % of exposed lines identified in 20 historical episodes',
        accuracyHow: 'Comparison with shelf stock and POS sales for each episode'
      }
    },
    phases: [
      { from: 1, to: 2, title: 'Access, installation and baseline', detail: 'Read access, installation, choice of 10 pilot stores and measurement of current time', result: 'Criteria signed off and baseline measured' },
      { from: 3, to: 5, title: 'Connectors, agents and workflow', detail: 'Tests with 20–30 historical cases', result: 'Accuracy measured with historical cases' },
      { from: 6, to: 7, title: 'Parallel running', detail: 'Real cases in the pilot stores, with the current process as fallback', result: 'Quality acceptance of the drafts' },
      { from: 8, to: 8, title: 'Evaluation and decision', detail: 'Criteria measured and final report', result: 'Final report and decision' }
    ],
    criteria: [
      { name: 'Time', target: 'Trace and draft in under 15 min; store task in under 10 min from the alarm', how: 'Timed against the weeks 1–2 baseline' },
      { name: 'Usefulness', target: 'Quality accepts the draft with minor edits in ≥70 % of cases', how: 'Quality review of each draft' },
      { name: 'Citations', target: '≥90 % of 50 benchmark questions with the correct citation', how: 'Evaluation tool included in Agentic Platform' },
      { name: 'Control', target: 'No action without approval; 100 % in the audit log', how: 'Review of the exported log' },
      { name: 'Cost', target: 'Model cost per case measured and within the realm budget', how: 'Cost report per realm (USD, estimate)' }
    ],
    gives: {
      client: ['Owner in Quality and an IT contact', 'Read access to 1–2 systems', '10 pilot stores and their area managers', '20–30 historical cases, anonymised if needed', 'Current HACCP procedures', '2–3 h a week from Quality'],
      mfm: ['Installation on your infrastructure', 'Read connectors', 'Agents and workflow for the use case', 'Training for Quality and the pilot stores', 'Final report with the measured criteria']
    },
    pilot: {
      sub: 'One use case, the DC and 10 stores, one realm (Quality) and 5–10 users, on your infrastructure and with your model',
      after: 'After the pilot: refrigeration alarms across all 64 stores, or alert management and own-brand supplier approval.',
      nextTitle: 'Next step: 2-hour workshop with Quality, Store Operations and IT',
      nextBody: 'To choose the use case and the pilot stores, confirm read access and set the baseline against which the pilot will be measured.'
    },
    calc: {
      fteHours: 1784,
      note: 'Hours of repetitive work that Quality, Consumer Care, area managers and the DC can spend on other tasks.',
      rows: [
        { id: 'reclamacion', label: 'Consumer complaint', who: 'Consumer Care and Quality', scene: 'reclamacion', seen: 'L26214 complaint', n: 120, before: 40, after: 10, basis: 'Case record, lot trace, supplier notice and reply' },
        { id: 'frio', label: 'In-store refrigeration alarm: products, block and work order', who: 'On-call Quality and area managers', scene: 'alarma', seen: 'T-027 alarm', n: 45, before: 45, after: 10, basis: '64 stores; multidecks and cold rooms' },
        { id: 'retirada', label: 'Lot alert or recall (including mock recalls)', who: 'Quality and DC', scene: 'retirada', seen: 'L26214 recall', n: 3, before: 360, after: 45, basis: 'DC → stores → sales → members' },
        { id: 'cuestionario', label: 'Audits and questionnaires (IFS, suppliers)', who: 'Quality', scene: 'cuestionario', seen: 'IFS pre-audit', n: 3, before: 480, after: 120, basis: 'With cited evidence' },
        { id: 'consultas', label: 'Store queries about HACCP procedures', who: 'Store managers', scene: 'procedimientos', seen: 'Procedures', n: 300, before: 8, after: 2, basis: 'Calls and emails to Quality' },
        { id: 'parte', label: 'DC and store shift summary', who: 'Shift managers', scene: 'turno', seen: 'Shift summary', n: 44, before: 30, after: 8, basis: '2 shifts × 22 days' }
      ]
    },
    auditEmpty: 'Generate the shift summary, publish a workflow or approve the T-027 sales block: each step will appear here with its time, actor and view.',
    auditPilot: 'The log lives in the Agentic Platform database, identifies each person by their SSO, can be filtered by person, action, store and date, and is exported to CSV. In this demo it lives in this browser and is cleared with “Reset demo”.',
    proposal: {
      code: 'PIL-PLZ-2026-01',
      filename: 'agentic-pilot-proposal-mercados-moncayo',
      objective: 'To measure, with a real use case and signed-off criteria, how much Quality and store time Agentic Platform frees up and how accurately, without changing SAP S/4 Retail, WMS Manhattan, the cold-chain sensors, the POS, the loyalty CRM or ServiceNow. Agentic Platform reads from those systems, reasons with the HACCP procedures and proposes; a person approves before anything is written.',
      signatures: [{ role: 'quality', note: 'Agrees with the scope and criteria' }, { role: 'IT · Mercados Moncayo', note: 'Agrees with the access and deployment' }]
    },
    presenter: {
      arquitectura: [
        'Agentic Platform replaces nothing: it sits on top of SAP Retail, Manhattan, the POS, the CRM and ServiceNow. It reads, reasons with your HACCP procedures and proposes; before writing to a system, a person approves.',
        'It is installed on your infrastructure, with your Microsoft Entra ID SSO and the model you choose. With a local model, inference stays in your network; IT validates the other flows.',
        'The dashed amber lines are the only writes, and always after approval. The cold-chain sensors are read-only: the equipment is never touched.'
      ],
      piloto: [
        'This is what you have seen today: seven use cases across the DC and the stores, each with its agents and its approver. Click any of them to go back to it.',
        'To be candid: today’s data is synthetic and the demo does not call any model. Connectors for SAP, Manhattan or the POS are built during the pilot, in read-only mode.',
        '6–8 week pilot: one use case, the DC and 10 stores, Quality realm, 5–10 users. The criteria are signed off in week 1 and measured in week 8.'
      ],
      horas: [
        'Ask how many complaints, refrigeration alarms or supplier alerts they have a month and enter them: the calculator is theirs.',
        '“With Agentic Platform” includes a person’s review and approval. These are hours of repetitive work that Quality and the stores can spend on other tasks.',
        'These are assumptions to frame the conversation: the real baseline is measured in weeks 1–2 of the pilot.'
      ],
      registro: [
        'Everything we did today is here: {n}, by people and agents, with time, actor and view.',
        'Filter by “Decisions”: every approval and every rejection, with its reason. Nothing is edited or deleted from the console; it is exported to JSON or CSV.',
        'To close: we propose a 2-hour workshop with Quality, Store Operations and IT to choose the use case and set the baseline.'
      ],
      next: {
        arquitectura: 'Click “Local model” to show the model moving inside their network; then the “Demo and pilot” tab.',
        piloto: 'Choose use case A or B with them and open the “Time savings calculator” tab.',
        horas: 'Enter their cases per month and open “Audit log” to close.',
        registro: 'Click “Download pilot proposal (PDF)” and propose a date for the 2-hour workshop.'
      }
    },
    tour: [
      'Agentic Platform sits on top of SAP Retail, Manhattan, the POS, the CRM and ServiceNow: it reads, prepares proposals and a person approves before anything is written.',
      'With a local model, inference runs on your infrastructure; the other flows are validated with IT.',
      'Today’s use cases, from the T-027 multideck to the recall of lot L26214, and what is standard and what is built in the pilot.',
      '6–8 week pilot: one use case, the DC and 10 stores, Quality realm and acceptance criteria signed off in week 1.',
      'Hours freed up, with editable assumptions; the real baseline is measured in the pilot.',
      'Everything done in the session is kept in the audit log: human decisions, agent steps and export.'
    ]
  }
});
