/* Cervecera Bardenas · «How Agentic Platform fits»: architecture, demo vs pilot, hours calculator and FAQ (English).
 * Fictitious company; synthetic demo data (MFM). */
agenticPackEn('cerveceria', {
  plataforma: {
    nav: 'How it fits at Bardenas',
    title: 'How it fits at Cervecera Bardenas',
    actor: 'quality',
    site: { kind: 'Brewery', name: 'Arguedas Brewery', realm: 'Quality · Arguedas' },
    pageMeta: [
      { icon: 'factory', text: 'Arguedas Brewery' },
      { icon: 'server', text: 'Installed on your infrastructure' },
      { icon: 'user-check', text: 'Human approval before writing' }
    ],
    kpis: [
      { label: 'Proposed pilot', value: '6–8', unit: 'weeks', sub: '1 use case · Arguedas · Quality realm', icon: 'calendar' },
      { label: 'Systems connected in the pilot', value: '1–2', unit: 'read-only', sub: 'Via API or database replica', icon: 'database' },
      { label: 'Pilot users', value: '5–10', sub: 'SSO with Microsoft Entra ID', icon: 'users' }
    ],
    arch: {
      title: 'Reference architecture at the Arguedas brewery',
      sso: 'SSO sign-in · Microsoft Entra ID',
      ssoShort: 'Microsoft Entra ID SSO',
      console: 'Web console and alerts in Microsoft Teams',
      consoleShort: 'Web console and Teams'
    },
    deploy: {
      cpd: { seg: 'Own data centre', label: 'Own data centre · virtual machine with Docker Compose', zone: 'Cervecera Bardenas data centre · VM with Docker Compose', text: 'A virtual machine in your Arguedas data centre with Docker Compose: application, Postgres database and Qdrant vector store.' },
      k8s: { seg: 'Kubernetes', label: 'Kubernetes · Helm', zone: 'Cervecera Bardenas Kubernetes cluster · Helm', text: 'Deployed with Helm on your Kubernetes cluster: application, Postgres database and Qdrant vector store.' },
      cloud: { seg: 'Own cloud', label: 'Cervecera Bardenas cloud (Azure, AWS or GCP)', zone: 'Cervecera Bardenas cloud subscription (Azure, AWS or GCP)', text: 'The same installation in your cloud subscription, in the region you choose (EU).' }
    },
    llm: {
      azure: { seg: 'Azure OpenAI', name: 'Azure OpenAI', local: false, place: 'EU region, under the Cervecera Bardenas contract', exit: 'Only the text of each request leaves your network', note: 'Connected through the Agentic Platform LiteLLM gateway; confirmed in weeks 1–2.' },
      gemini: { seg: 'Gemini', name: 'Google Gemini', local: false, place: 'With the account and region Cervecera Bardenas contracts', exit: 'Only the text of each request leaves your network', note: 'Provider included as standard in the Agentic Platform model catalogue.' },
      local: { seg: 'Local model', name: 'Local model', local: true, place: 'GPU server in your data centre (Ollama, LM Studio or llama.cpp)', exit: 'Inference runs inside your network', note: 'Quality and speed are sized to your server. IT also reviews the connector and telemetry flows.' }
    },
    people: ['brewmaster', 'quality', 'quality_shift', 'maintenance', 'logistics', 'customer_service'],
    peopleShort: ['Head Brewer', 'Quality', 'Shift Quality', 'Maintenance', 'Logistics', 'Customer Service'],
    modules: [
      { icon: 'workflow', title: 'Workflows (Routines)', text: 'Visual editor, versions and dry run' },
      { icon: 'cpu', title: 'Brewery agents', text: 'Cellar, quality, traceability, recall, complaints and daily report', agents: true },
      { icon: 'user-check', title: 'Human approval', text: 'Nothing is written to a system without its owner', approval: true },
      { icon: 'book-open', title: 'Procedures with citations', text: 'Every answer links its source; with no source, it says so' },
      { icon: 'history', title: 'Audit log', text: 'Append-only and exportable' },
      { icon: 'key', title: 'Permissions by role and realm', text: 'Each area of the brewery sees its own' },
      { icon: 'gauge', title: 'Cost per request', text: 'Estimate in USD and budget per realm' },
      { icon: 'shield', title: 'Model gateway', text: 'Masks personal data before the model', gateway: true }
    ],
    tiles: [
      { name: 'SAP S/4HANA', icon: 'database', text: 'Reads batches, orders and dispatches. Proposes the hold in QM.', write: true },
      { name: 'Brewmaxx (MES)', icon: 'factory', text: 'Reads brews, fermentations, racking and packaging.', write: false },
      { name: 'SCADA bodega', icon: 'activity', text: 'Reads temperatures, pressures and alarms. Does not act on valves or set points.', write: false },
      { name: 'LIMS LabWare', icon: 'flask', text: 'Reads analyses. Prepares analysis requests.', write: true },
      { name: 'WMS Mecalux', icon: 'warehouse', text: 'Reads kegs, pallets and dispatches. Proposes blocking stock.', write: true },
      { name: 'GMAO Maximo', icon: 'wrench', text: 'Reads equipment history. Prepares work orders.', write: true },
      { name: 'Microsoft 365', icon: 'mail', text: 'Alerts in Teams and drafts in Outlook. Sending to the customer is approved.', write: true }
    ],
    decisions: {
      deploy: ['It does not depend on MFM cloud services. Your IT team or a managed service runs it. The cellar control network is not opened up: the SCADA is read from the industrial DMZ.'],
      llm: 'The model is changed through configuration, without touching the workflows; OpenAI or AWS Bedrock in the EU are also supported.',
      access: [
        'SSO with Microsoft Entra ID (OIDC) or SAML 2.0. Permissions by role and by realm: the «Quality · Arguedas» realm only sees its own procedures and data.',
        'The gateway masks personal data (customer and haulier contacts) before calling the model. Beer recipes and specifications do not leave your network: the agent cites the document, it does not send it.'
      ],
      hitl: 'Holding a batch in SAP QM, blocking kegs in Mecalux, requesting analyses in LabWare, opening a work order in Maximo or sending an email to a customer requires approval from the person responsible. Rejecting applies nothing and is logged with the reason.',
      limits: [
        'It does not replace SAP S/4HANA, Brewmaxx, LIMS LabWare, WMS Mecalux or GMAO Maximo.',
        'It does not act on cellar control: the SCADA is read-only; it does not open valves or change set points.',
        'It does not release batches or decide on a recall: the Head Brewer and Quality decide (PR-CAL-006).',
        'It does not assign tasks or assess people: it works with vessels, batches, equipment and documents.'
      ]
    },
    faqTitle: 'Common questions from IT, Quality and Management',
    faqSub: 'Short answers for the conversation with the technical team',
    faq: [
      { topic: 'Integration', q: 'Where is it installed?', a: 'On a virtual machine in your data centre with Docker Compose, on Kubernetes with Helm, or in your cloud subscription. It does not depend on MFM cloud services.' },
      { topic: 'Integration', q: 'Are there connectors for SAP, Brewmaxx, LabWare or the SCADA?', a: 'Not out of the box. In the pilot they are built for 1–2 systems, via API (SAP OData, LabWare REST) or a read-only database replica; the SCADA via its historian or OPC UA in read mode. Reading Postgres databases already works.' },
      { topic: 'Security', q: 'Does it touch cellar control?', a: 'No. The SCADA is read from the industrial DMZ, with IEC 62443 segmentation; Agentic Platform does not write to PLCs or change set points or valves. Any intervention is carried out by Production and Maintenance.' },
      { topic: 'Security', q: 'How do users sign in?', a: 'With Microsoft Entra ID SSO (OIDC) or SAML 2.0. Permissions go by role and by realm (area). Connector service accounts are read-only.' },
      { topic: 'Data', q: 'What data leaves our network?', a: 'With a local model, inference runs inside your network. With an external one, only the text of each request leaves, without full recipes or specifications; the provider contract is reviewed (no training on your data and EU region). Connector, telemetry and masking flows are validated with IT.' },
      { topic: 'Data', q: 'Does it help with the traceability required by food law?', a: 'It helps you comply: Regulation (EC) No 178/2002 requires one step back and one step forward traceability, and the agent does it in minutes with data from SAP, Brewmaxx and Mecalux. The official record stays in your systems; Agentic Platform prepares the trace and the draft notification to the authority, which Quality approves.' },
      { topic: 'Language model', q: 'Which language model does it use, and can it be changed?', a: 'Whichever you choose: Azure OpenAI, Gemini, OpenAI, AWS Bedrock in the EU or a local model. The Agentic Platform catalogue lets you pin a model per realm and change it through configuration, without touching the workflows.' },
      { topic: 'Language model', q: 'What if the model gets it wrong?', a: 'Every answer cites its source (procedure, SCADA reading, LIMS analysis) and, if it cannot find one, it says so. No action is applied without approval. In the pilot, accuracy is measured against 20–30 historical cases.' },
      { topic: 'Integration', q: 'How many users does it support?', a: 'Concurrency is sized and verified with load tests. Each realm has limits on requests per minute, tokens per day and budget.' },
      { topic: 'Cost', q: 'How much does each query cost?', a: 'Agentic Platform measures the cost of each request in USD by realm, user and use case, with a daily and monthly budget. A fermentation vessel alarm costs cents in model usage; the real cost is measured in the pilot.' },
      { topic: 'Cost', q: 'Licence and price?', a: 'These are set out in the commercial proposal (SOW).' },
      { topic: 'Integration', q: 'What language does it work in?', a: 'The chat and agents work in Spanish; replies to customers and importers go out in their own language (for example, in English for Northgate Beverages). The Agentic Platform admin console is in English.' }
    ],
    seen: [
      { scene: 'turno', label: 'Shift summary', icon: 'activity', title: 'Night shift report', text: 'Brewhouse, cellar, packaging and warehouse at Arguedas; the agent prepares the daily equipment report and leaves it for review.', agents: ['Shift agent'], approver: 'decider', outcome: 'parte' },
      { scene: 'workflow', label: 'From words to workflow', icon: 'workflow', title: 'Written procedure → published workflow', text: 'Fermentation control (PR-FER-003) becomes a workflow with a trigger, steps, approval and a dry run.', agents: ['Workflow generator'], approver: 'brewmaster' },
      { scene: 'alarma', label: 'FV-12 alarm', icon: 'thermometer', title: 'Fermentation vessel FV-12 off set point', text: '16.8 °C against 12 °C due to glycol valve VG-12: batch L2609-FV12 (480 hl) on hold, diacetyl and acetaldehyde requested from the LIMS, work order raised and racking rescheduled.', agents: ['Maintenance', 'Quality', 'Production'], approver: 'brewmaster', outcome: 'alarma' },
      { scene: 'reclamacion', label: 'L2608-K14 complaint', icon: 'mail', title: 'Kegs with oxidised flavour', text: 'Email from Distribuciones Hosteleras Ribera: complaint record, trace of keg batch L2608-K14, analysis of retained samples and reply within 48 h.', agents: ['Customer Service', 'Quality'], approver: 'quality', outcome: 'reclamacion' },
      { scene: 'retirada', label: 'L2608-K14 recall', icon: 'git-branch', title: 'Batch recall drill', text: '1,040 kegs → 912 dispatched to 14 customers, 96 in warehouse and 32 on hold, with source malt, hops and CO₂, traced against the 4 h target.', agents: ['Traceability', 'Logistics'], approver: 'quality', outcome: 'retirada' },
      { scene: 'cuestionario', label: 'Northgate Beverages approval', icon: 'list-checks', title: 'Questionnaire from a British importer', text: 'Answers with cited evidence (HACCP, gluten, glass policy, traceability, UK labelling) and gaps flagged for Quality.', agents: ['Questionnaires'], approver: 'quality', outcome: 'cuestionario' },
      { scene: 'procedimientos', label: 'Procedures', icon: 'book-open', title: 'Questions with citations', text: 'HACCP, fermentation, recall, glass and CIP: every answer links to the section of the current procedure and, if there is no source, says so.', agents: ['Procedures'] }
    ],
    honesty: [
      { aspect: 'Console, workflows (Routines) and editor', demo: 'This console, in the browser, with the workflows published in the session', pilot: 'Agentic Platform installed on your infrastructure; Routines with visual editor, versions and dry run', origin: 'serie' },
      { aspect: 'Workflow from a written procedure', demo: 'Generator simulated in the browser, with three templates', pilot: 'Integrated into Agentic Platform and validated with your procedures; each workflow is reviewed before publishing', origin: 'demo' },
      { aspect: 'Cervecera Bardenas agents', demo: 'Cellar, quality, traceability, recall, complaints and daily report, on synthetic data', pilot: 'Those for the chosen use case, adapted to your data and procedures', origin: 'demo' },
      { aspect: 'Connectors (SAP S/4HANA, Brewmaxx, cellar SCADA, LIMS LabWare, WMS Mecalux and GMAO Maximo)', demo: 'Simulated in the browser', pilot: 'Reading from 1–2 systems via API or a read-only database replica. There are no out-of-the-box connectors for SAP, Brewmaxx, LabWare or the SCADA', origin: 'piloto' },
      { aspect: 'Alarm trigger', demo: 'On opening the FV-12 fermentation vessel alarm', pilot: 'Webhook from the SCADA or its historian, or periodic polling (cron): Agentic Platform has no agent scheduler of its own', origin: 'piloto' },
      { aspect: 'Language model', demo: 'No calls: the answers are prepared in advance', pilot: 'The one Cervecera Bardenas chooses (Azure OpenAI, Gemini or local), through the Agentic Platform gateway', origin: 'serie' },
      { aspect: 'Human approval', demo: 'Approval cards; rejecting applies nothing', pilot: 'The same, with SSO and role-based permissions. Nothing is written to SAP in the pilot: drafts and tickets approved by a person', origin: 'serie' },
      { aspect: 'Procedures with citations', demo: '5 synthetic documents (APPCC-01, PR-FER-003, PR-CAL-006, PR-ENV-002 and PR-LIM-001)', pilot: 'Your current procedures, with permissions by realm; target ≥90% correct citations', origin: 'serie' },
      { aspect: 'Audit log', demo: 'For this session, stored in the browser and exportable to JSON or CSV', pilot: 'In the Agentic Platform database, append-only, with each person\'s SSO identity; exportable to CSV', origin: 'serie' },
      { aspect: 'Cost per request', demo: 'Estimate shown at the end of each run', pilot: 'Measured per request in USD, by realm and by use case, with a daily and monthly budget', origin: 'serie' },
      { aspect: 'Data and actions', demo: 'Synthetic and internally consistent, prepared by MFM; actions never leave the browser', pilot: 'Your data in read mode and 20–30 historical cases, anonymised if needed', origin: 'datos' }
    ],
    writes: 'None in SAP during the pilot: drafts and tickets approved by a person',
    cases: {
      A: {
        label: 'Use case A', short: 'Use case A · Customer complaint', title: 'Customer complaint: trace, analysis and reply',
        systems: ['LIMS LabWare', 'SAP S/4HANA', 'WMS Mecalux'], systemsText: 'LIMS LabWare, SAP S/4HANA and WMS Mecalux',
        trigger: 'Incoming email in the Quality or Customer Service mailbox (Outlook)',
        output: 'Complaint record, batch trace, analysis of retained samples, draft non-conformance and reply in the customer\'s language, for approval',
        scene: 'reclamacion', sceneLabel: 'L2608-K14 complaint',
        accuracy: '≥90% of 30 historical complaints correctly extracted (batch, format, defect, customer and deadline)',
        accuracyHow: 'Comparison with the Quality complaints register'
      },
      B: {
        label: 'Use case B', short: 'Use case B · Cellar deviation', title: 'Fermentation deviation: batch, hold with approval and work order',
        systems: ['SCADA bodega', 'Brewmaxx (MES)', 'LIMS LabWare'], systemsText: 'cellar SCADA temperatures, Brewmaxx and LIMS LabWare',
        trigger: 'Cellar SCADA alarm via webhook or periodic polling (cron)',
        output: 'Affected batch and vessel, hold and analysis proposal for approval, draft work order and Teams alert',
        scene: 'alarma', sceneLabel: 'FV-12 alarm',
        accuracy: '100% of affected batches and vessels identified in 20 historical deviations',
        accuracyHow: 'Comparison with the Brewmaxx records for each deviation'
      }
    },
    phases: [
      { from: 1, to: 2, title: 'Access, installation and baseline', detail: 'Read access, installation and measurement of current timings', result: 'Criteria signed off and baseline measured' },
      { from: 3, to: 5, title: 'Connectors, agents and workflow', detail: 'Tests with 20–30 historical cases', result: 'Accuracy measured on historical cases' },
      { from: 6, to: 7, title: 'Parallel running', detail: 'Real cases, with the current process as a fallback', result: 'Quality acceptance of the drafts' },
      { from: 8, to: 8, title: 'Evaluation and decision', detail: 'Criteria measured and final report', result: 'Final report and decision' }
    ],
    criteria: [
      { name: 'Time', target: 'Trace and draft in under 15 min', how: 'Timed against the baseline from weeks 1–2' },
      { name: 'Usefulness', target: 'Quality accepts the draft with minor edits in ≥70% of cases', how: 'Quality reviews each draft' },
      { name: 'Citations', target: '≥90% of 50 reference questions with the correct citation', how: 'Evaluation tool included in Agentic Platform' },
      { name: 'Control', target: 'No action without approval; 100% in the audit log', how: 'Review of the exported log' },
      { name: 'Cost', target: 'Model cost per case measured and within the realm budget', how: 'Cost report by realm (USD, estimate)' }
    ],
    gives: {
      client: ['Quality lead and IT contact', 'Read access to 1–2 systems', '20–30 historical cases, anonymised if needed', 'Current procedures (HACCP, PR)', '2–3 h a week from Quality and the cellar'],
      mfm: ['Installation on your infrastructure', 'Read connectors', 'Agents and workflow for the use case', 'User training', 'Final report with the measured criteria']
    },
    pilot: {
      sub: 'One use case, one brewery (Arguedas), one realm (Quality) and 5–10 users, on your infrastructure and with your model',
      after: 'After the pilot: batch release with LIMS analyses, or brewing and packaging planning for the summer 2027 season.',
      nextTitle: 'Next step: 2-hour workshop with Quality, the cellar and IT',
      nextBody: 'To choose the use case, confirm read access and set the baseline the pilot will be measured against.'
    },
    calc: {
      fteHours: 1736,
      note: 'Hours of repetitive work that Quality, the cellar, Maintenance and shift managers can put towards other tasks.',
      rows: [
        { id: 'reclamacion', label: 'Customer complaint: trace, analysis and reply', who: 'Quality and Customer Service', scene: 'reclamacion', seen: 'L2608-K14 complaint', n: 8, before: 180, after: 45, basis: 'Distributors, on-trade and importers' },
        { id: 'desviacion', label: 'Cellar process deviation: batch, hold and work order', who: 'Shift Quality and Head Brewer', scene: 'alarma', seen: 'FV-12 alarm', n: 6, before: 120, after: 15, basis: 'Fermentation vessels, lagering and filtration' },
        { id: 'traza', label: 'Batch trace or recall drill', who: 'Quality and logistics', scene: 'retirada', seen: 'L2608-K14 recall', n: 2, before: 240, after: 25, basis: 'Raw materials → batch → customers' },
        { id: 'cuestionario', label: 'Customer or importer approval', who: 'Quality', scene: 'cuestionario', seen: 'Approval questionnaire', n: 3, before: 360, after: 90, basis: 'With cited evidence' },
        { id: 'consultas', label: 'Procedure lookups (HACCP, CIP, fermentation)', who: 'Cellar, packaging and Quality', scene: 'procedimientos', seen: 'Procedures', n: 120, before: 8, after: 2, basis: 'Searching folders and the document management system' },
        { id: 'parte', label: 'Shift and equipment report', who: 'Shift managers', scene: 'turno', seen: 'Shift summary', n: 66, before: 25, after: 8, basis: '3 shifts × 22 days' }
      ]
    },
    auditEmpty: 'Generate the shift report, publish a workflow or approve the hold on batch L2609-FV12: each step will appear here with its time, actor and view.',
    auditPilot: 'The log lives in the Agentic Platform database, identifies each person by their SSO, can be filtered by person, action and date and is exported to CSV. In this demo it lives in this browser and is cleared with «Reset demo».',
    proposal: {
      code: 'PIL-ARG-2026-01',
      filename: 'agentic-pilot-proposal-bardenas-arguedas',
      objective: 'To measure, with a real use case and signed-off criteria, how much Quality and cellar time Agentic Platform frees up and how accurately, without changing SAP S/4HANA, Brewmaxx, the cellar SCADA, LIMS LabWare, WMS Mecalux or GMAO Maximo. Agentic Platform reads from those systems, reasons with the procedures and makes proposals; a person approves before anything is written.',
      signatures: [{ role: 'quality', note: 'Agrees with the scope and criteria' }, { role: 'brewmaster', note: 'Agrees with the cellar use case' }, { role: 'IT · Cervecera Bardenas', note: 'Agrees with the access and deployment' }]
    },
    presenter: {
      arquitectura: [
        'Agentic Platform replaces nothing: it sits on top of SAP, Brewmaxx, LabWare, Mecalux and Maximo. It reads, reasons with your procedures and makes proposals; before writing to a system, a person approves.',
        'It is installed on your infrastructure, with your Microsoft Entra ID SSO and the model you choose. With a local model, inference stays inside your network; IT validates the other flows.',
        'The dashed amber lines are the only writes, and always after approval. The cellar SCADA is read-only: no valves or set points are touched.'
      ],
      piloto: [
        'This is what you have seen today: seven brewery use cases, each with its agents and its approver. Click any of them to go back to it.',
        'To be upfront: today\'s data is synthetic and the demo does not call any model. The SAP, Brewmaxx and SCADA connectors are built in the pilot, in read mode.',
        '6–8 week pilot: one use case, Arguedas, the Quality realm, 5–10 users. The acceptance criteria are signed off in week 1 and measured in week 8.'
      ],
      horas: [
        'Ask how many complaints, cellar deviations or approvals they handle a month and type them in: the calculator is theirs.',
        '«With Agentic Platform» includes a person\'s review and approval. These are hours of repetitive work that Quality and the cellar can put towards other tasks.',
        'These are assumptions to talk through: the real baseline is measured in weeks 1–2 of the pilot.'
      ],
      registro: [
        'Everything we have done today is here: {n}, by people and agents, with time, actor and view.',
        'Filter by «Decisions»: every approval and every rejection, with its reason. Nothing can be edited or deleted from the console; it is exported to JSON or CSV.',
        'To close: we propose a 2-hour workshop with Quality, the cellar and IT to choose the use case and set the baseline.'
      ],
      next: {
        arquitectura: 'Click «Local model» to show that the model moves inside their network; then the «Demo and pilot» tab.',
        piloto: 'Choose use case A or B with them and open the «Hours calculator» tab.',
        horas: 'Type in their cases per month and open «Audit log» to close.',
        registro: 'Click «Download pilot proposal (PDF)» and propose a date for the 2-hour workshop.'
      }
    },
    tour: [
      'Agentic Platform sits on top of SAP, Brewmaxx, LabWare, Mecalux and Maximo: it reads, prepares proposals and a person approves before anything is written.',
      'With a local model, inference moves inside your infrastructure; the other flows are validated with IT.',
      'Today\'s use cases, from fermentation vessel FV-12 to the recall of batch L2608-K14, and what is standard and what is built in the pilot.',
      '6–8 week pilot: one use case, the Arguedas brewery, the Quality realm and acceptance criteria signed off in week 1.',
      'Hours freed up with editable assumptions; the real baseline is measured in the pilot.',
      'Everything done in the session is kept in the audit log: human decisions, agent steps and export.'
    ]
  }
});
