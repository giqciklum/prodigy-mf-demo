/* Banco Cierzo · "How Agentic Platform fits" (English): architecture, demo versus pilot, hours calculator, FAQ and
 * compliance (DORA, EBA outsourcing, GDPR, banking secrecy). Fictitious bank; synthetic data (MFM). */
agenticPackEn('banca', {
  plataforma: {
    nav: 'How it fits at Banco Cierzo',
    title: 'How it fits at Banco Cierzo',
    actor: 'decider',
    site: { kind: 'Centre', name: 'Operations Centre (Madrid)', realm: 'Operations · Fraud and SAC' },
    pageMeta: [
      { icon: 'building', text: 'Operations Centre · Madrid' },
      { icon: 'server', text: 'Installed on the bank\'s infrastructure' },
      { icon: 'scale', text: 'DORA, EBA, GDPR and banking secrecy' },
      { icon: 'user-check', text: 'Human approval before writing' }
    ],
    kpis: [
      { label: 'Proposed pilot', value: '6–8', unit: 'weeks', sub: '1 use case · Operations Centre · 1 realm', icon: 'calendar' },
      { label: 'Systems connected in the pilot', value: '1–2', unit: 'read-only', sub: 'Replica or query API; never write access to the core', icon: 'database' },
      { label: 'Pilot users', value: '5–10', sub: 'SSO with Microsoft Entra ID and MFA', icon: 'users' }
    ],
    arch: {
      title: 'Reference architecture at the Operations Centre',
      sso: 'SSO and MFA access · Microsoft Entra ID',
      ssoShort: 'Microsoft Entra ID SSO with MFA',
      console: 'Web console and notices in Microsoft Teams',
      consoleShort: 'Web console and Teams'
    },
    deploy: {
      cpd: { seg: 'Own data centre', label: 'Own data centre · virtual machine with Docker Compose', zone: 'Banco Cierzo data centre · VM with Docker Compose', text: 'A virtual machine in the bank\'s data centre, on the internal services network, with Docker Compose: application, Postgres database and Qdrant vector store.' },
      k8s: { seg: 'OpenShift / Kubernetes', label: 'OpenShift or Kubernetes · Helm', zone: 'Banco Cierzo OpenShift cluster · Helm', text: 'Deployed with Helm on your container platform (OpenShift or Kubernetes), with the bank\'s image and secrets controls.' },
      cloud: { seg: 'Private cloud', label: 'The bank\'s cloud (Azure, AWS or GCP), EU region', zone: 'Banco Cierzo cloud subscription · EU region', text: 'The same installation in the bank\'s cloud subscription, in an EU region, with its own keys (BYOK) and its register of ICT third-party providers.' }
    },
    llm: {
      azure: { seg: 'Azure OpenAI', name: 'Azure OpenAI', local: false, place: 'EU region (Data Zone EU), under Banco Cierzo\'s contract', exit: 'Only the pseudonymised text of each request leaves your network', note: 'Connected through the Agentic Platform LiteLLM gateway; no training on your data. Confirmed with ICT Risk in weeks 1–2.' },
      gemini: { seg: 'Gemini', name: 'Google Gemini (Vertex AI)', local: false, place: 'Vertex AI EU region, with the account Banco Cierzo contracts', exit: 'Only the pseudonymised text of each request leaves your network', note: 'Provider included as standard in the Agentic Platform model catalogue.' },
      local: { seg: 'Local model', name: 'Local model', local: true, place: 'GPU server in the bank\'s data centre (Ollama, LM Studio or llama.cpp)', exit: 'Inference runs inside your network', note: 'Avoids adding a new ICT third-party provider for the model. Quality and speed depend on the sizing of your server.' }
    },
    people: ['fraud', 'fraud_shift', 'cards', 'customer_service', 'compliance', 'it_risk'],
    peopleShort: ['Fraud prevention', 'Shift analyst', 'Payments and cards', 'SAC', 'Compliance', 'ICT risk'],
    modules: [
      { icon: 'workflow', title: 'Workflows (Routines)', text: 'Visual editor, versions and dry run' },
      { icon: 'cpu', title: 'Operations agents', text: 'Fraud, payments, SAC, cases and DORA', agents: true },
      { icon: 'user-check', title: 'Human approval', text: 'Nothing is written to a system without its owner', approval: true },
      { icon: 'book-open', title: 'Policies with citations', text: 'Every answer links its source; with no source, it says so' },
      { icon: 'history', title: 'Audit log', text: 'Append-only, exportable for Internal Audit' },
      { icon: 'key', title: 'Permissions by role and realm', text: 'Each area sees only its own data and policies' },
      { icon: 'gauge', title: 'Cost per request', text: 'USD estimate and budget per realm' },
      { icon: 'shield', title: 'Model gateway', text: 'Masks PAN, IBAN, national ID and names before the model', gateway: true }
    ],
    tiles: [
      { name: 'Core bancario T24', icon: 'database', text: 'Reads customers, accounts, cards and transactions. Never writes to the core.', write: false },
      { name: 'Falcon Fraud', icon: 'shield', text: 'Reads alerts and scores. Proposes preventive blocking rules.', write: true },
      { name: 'Redsys', icon: 'globe', text: 'Reads authorised transactions, merchants and terminals.', write: false },
      { name: 'Salesforce FSC', icon: 'users', text: 'Reads the customer record. Prepares the SAC case and the reply.', write: true },
      { name: 'ServiceNow', icon: 'ticket', text: 'Prepares incidents and card reissue tasks.', write: true },
      { name: 'GRC Archer', icon: 'scale', text: 'Reads controls and risks. Prepares the DORA incident record.', write: true },
      { name: 'Microsoft 365', icon: 'mail', text: 'Notices in Teams and drafts in Outlook. Sending to the customer requires approval.', write: true }
    ],
    decisions: {
      deploy: ['It does not depend on MFM cloud services. Your Systems team or a managed service runs it, and it goes into the bank\'s register of information on ICT third-party providers (DORA, Art. 28).'],
      llm: 'The model is changed through configuration, without touching the workflows. The model provider is an ICT third party: it is assessed with ICT Risk and Compliance before being used with real data.',
      access: [
        'SSO with Microsoft Entra ID (OIDC) or SAML 2.0, with MFA. Permissions by role and by realm: the Fraud realm cannot see SAC cases and vice versa; every query is logged with the person\'s identity.',
        'The gateway pseudonymises before calling the model: the PAN never leaves in full (PCI DSS 4.0), and names, DNI/NIE (Spanish ID numbers) and IBANs are replaced with placeholders. The bank\'s own patterns are added during the pilot.'
      ],
      hitl: 'Activating a rule in Falcon, requesting a card reissue, provisionally refunding a charge, recording an incident in Archer or writing to a customer requires approval from the owner. Rejecting applies nothing and is logged with the reason.',
      cost: 'The per-realm budget makes it possible to separate Fraud, SAC and Compliance spend for internal chargeback.',
      limits: [
        'It does not replace the T24 core, Falcon Fraud, Redsys, Salesforce FSC or Archer.',
        'It does not authorise or decline transactions in real time: authorisation stays in Redsys and Falcon.',
        'It does not resolve complaints or decide refunds: the SAC decides (PR-SAC-001), and the customer keeps the right to escalate to the Banco de España.',
        'It does not do credit scoring or automated decisions about customers (GDPR Art. 22; AI Act, Annex III).',
        'It does not notify supervisors without approval: it prepares the draft for ICT Risk.'
      ]
    },
    faqTitle: 'Common questions from Systems, Compliance and Risk',
    faqSub: 'Short answers for the conversation with Systems, Compliance, ICT Risk and the DPO',
    faq: [
      { topic: 'Compliance', q: 'How does it fit with DORA?', a: 'Agentic Platform is an ICT service from a third party (MFM) and the model provider is another. Both go into the register of information (Art. 28), with a contract that includes the Art. 30 clauses (data location, service levels, audit, cooperation with the supervisor and exit strategy). Agentic Platform also helps with DORA compliance: it prepares the draft initial notification of a major incident (4 h after classification and 24 h from detection) for ICT Risk to review.' },
      { topic: 'Compliance', q: 'Is it outsourcing under the EBA guidelines?', a: 'It is assessed against the EBA Guidelines on outsourcing arrangements (EBA/GL/2019/02). In the pilot, with anonymised data and no automated decisions, it does not support a critical or important function. If in production it is deemed critical (for example, in Fraud), their requirements apply: prior risk assessment, notification to the Banco de España, access and audit rights, and a tested exit plan. Installing it on the bank\'s infrastructure reduces the outsourced perimeter.' },
      { topic: 'Compliance', q: 'And the GDPR?', a: 'The bank is the controller; MFM is the processor (Art. 28) under contract and with a list of sub-processors, including the model provider. Before using real data, a data protection impact assessment (Art. 35) is carried out with the DPO. Data minimisation: the agent only requests the fields it needs and the gateway pseudonymises; data is processed in the EU, with no international transfers. There are no decisions based solely on automated processing (Art. 22): a person always decides.' },
      { topic: 'Compliance', q: 'How is banking secrecy respected?', a: 'The duty of confidentiality over customer information (Art. 83 of Ley 10/2014, the Spanish Act on the regulation, supervision and solvency of credit institutions) is preserved: data does not leave the bank\'s infrastructure except for the pseudonymised text the model sees, the provider cannot use it for training, and per-realm permissions stop an area from querying customers it is not responsible for. Every access is recorded in the audit log.' },
      { topic: 'Compliance', q: 'Does the AI Act apply?', a: 'The use cases in the demo (fraud, complaints, cases, questionnaires) are not listed in Annex III; credit scoring is, and it is out of scope. The transparency obligations are met: people know they are working with an AI assistant and the drafts say so.' },
      { topic: 'Security', q: 'What about card data (PCI DSS)?', a: 'Agentic Platform does not store the full PAN: the connectors read the truncated PAN or the token, and the gateway masks any card number before the model. The Agentic Platform environment stays outside the cardholder data environment (CDE).' },
      { topic: 'Security', q: 'How do users sign in?', a: 'With Microsoft Entra ID SSO (OIDC) or SAML 2.0 and MFA. Permissions are by role and by realm (area). The connectors\' service accounts are read-only and their secrets live in the bank\'s secrets vault.' },
      { topic: 'Data', q: 'What data leaves our network?', a: 'With a local model, none. With an external one, only the pseudonymised text of each request, to an EU region and with no retention for training. Connector, telemetry and masking flows are validated with Systems and Security before the pilot.' },
      { topic: 'Language model', q: 'Which language model does it use, and can it be changed?', a: 'Whichever the bank chooses: Azure OpenAI, Gemini on Vertex AI, AWS Bedrock in the EU or a local model. It is set per realm and changed through configuration, without touching the workflows; that way the DORA exit strategy also covers the model.' },
      { topic: 'Language model', q: 'What if the model gets it wrong?', a: 'Every answer cites its source (policy, transaction, case) and, if it cannot find one, it says so. No action is applied without approval. In the pilot, accuracy is measured against historical cases before live use.' },
      { topic: 'Integration', q: 'Are there connectors for T24, Falcon or Redsys?', a: 'Not as standard. In the pilot they are built for 1–2 systems in read mode, via a query API or a database replica; nothing is ever written to the core. Writes (rule in Falcon, case in Salesforce, ticket in ServiceNow) come later and always with approval.' },
      { topic: 'Integration', q: 'Where is it installed?', a: 'On a virtual machine in your data centre, on OpenShift or Kubernetes with Helm, or in your cloud subscription in an EU region. It does not depend on MFM cloud services.' },
      { topic: 'Cost', q: 'How much does each query cost?', a: 'Agentic Platform measures the cost of each request in USD by realm, user and use case, with a daily and monthly budget and an alert at 80%. A complaint costs cents in model usage; the real cost is measured in the pilot.' },
      { topic: 'Cost', q: 'Licence and price?', a: 'They are set out in the commercial proposal (SOW), with the contractual clauses DORA requires.' }
    ],
    seen: [
      { scene: 'turno', label: 'Shift summary', icon: 'activity', title: 'Night shift summary', text: 'Channels, authorisation, fraud and SAC at the Operations Centre; the agent prepares the shift report and leaves it for review.', agents: ['Shift agent'], approver: 'decider', outcome: 'parte' },
      { scene: 'workflow', label: 'From words to workflow', icon: 'workflow', title: 'Written policy → published workflow', text: 'The card fraud prevention policy (POL-FRA-003) is turned into a workflow with a trigger, steps, approval and a dry run.', agents: ['Workflow generator'], approver: 'fraud' },
      { scene: 'alarma', label: 'BIN 454812 alert', icon: 'shield', title: 'Fraud spike on BIN 454812', text: 'Card-not-present fraud at 2.9% against 0.3%: 186 transactions totalling 41,230 €; preventive rule in Falcon, reissue of 214 cards and notice to customers.', agents: ['Fraud', 'Payments', 'Customers'], approver: 'fraud', outcome: 'alarma' },
      { scene: 'reclamacion', label: 'Charges complaint', icon: 'mail', title: 'Three unrecognised charges', text: 'Lucía Ferrer Gil does not recognise 612.40 € from TIENDAONLINE-ELEC: case summary, transactions, provisional refund proposal (PSD2) and a reply within the 15-business-day deadline.', agents: ['SAC', 'Fraud'], approver: 'customer_service', outcome: 'reclamacion' },
      { scene: 'retirada', label: 'Case CPP-2609-07', icon: 'git-branch', title: 'Common point of compromise', text: 'POS terminal 3 at Gasolinera Ronda Norte: 1,284 cards, 1,107 own and 177 from other issuers; block, reissue and notices, with the draft DORA notification.', agents: ['Fraud', 'Payments', 'DORA'], approver: 'fraud', outcome: 'retirada' },
      { scene: 'cuestionario', label: 'Nordbank Wolfsberg CBDDQ', icon: 'list-checks', title: 'Correspondent due diligence', text: 'The CBDDQ v1.4 answered with evidence cited from the AML/CFT manual, sanctions, KYC and PEPs; gaps are flagged for Compliance.', agents: ['Questionnaires'], approver: 'compliance', outcome: 'cuestionario' },
      { scene: 'procedimientos', label: 'Policies and procedures', icon: 'book-open', title: 'Questions with citations', text: 'Fraud, SAC, reissue, DORA and AML/CFT: every answer links the section in force and, if there is no source, says so.', agents: ['Procedures'] }
    ],
    honesty: [
      { aspect: 'Console, workflows (Routines) and editor', demo: 'This console, in the browser, with the workflows published in the session', pilot: 'Agentic Platform installed on the bank\'s infrastructure; Routines with visual editor, versions and dry run', origin: 'serie' },
      { aspect: 'Workflow from a written policy', demo: 'Simulated generator in the browser, with three templates', pilot: 'Integrated into Agentic Platform and validated with your policies; each workflow is reviewed by the owning area before publishing', origin: 'demo' },
      { aspect: 'Banco Cierzo agents', demo: 'Fraud, payments, SAC, cases, DORA and shift report, on synthetic data', pilot: 'Those for the chosen use case, adapted to your data and policies', origin: 'demo' },
      { aspect: 'Connectors (Core bancario T24, Falcon Fraud, Redsys, Salesforce FSC, ServiceNow and GRC Archer)', demo: 'Simulated in the browser', pilot: 'Read access to 1–2 systems via query API or read-only replica. There are no standard connectors for T24, Falcon or Redsys', origin: 'piloto' },
      { aspect: 'Alert trigger', demo: 'When the BIN 454812 alert is opened', pilot: 'Webhook from Falcon or periodic polling (cron): Agentic Platform has no agent scheduler of its own', origin: 'piloto' },
      { aspect: 'Language model', demo: 'No calls: the answers are pre-prepared', pilot: 'Whichever the bank chooses (Azure OpenAI, Gemini or local), through the Agentic Platform gateway and assessed as an ICT provider', origin: 'serie' },
      { aspect: 'Human approval', demo: 'Approval cards; rejecting applies nothing', pilot: 'The same, with SSO, MFA and role-based permissions. In the pilot nothing is written to any system: drafts approved by a person', origin: 'serie' },
      { aspect: 'Policies with citations', demo: '5 synthetic documents (POL-FRA-003, PR-SAC-001, PR-TAR-007, PR-DORA-002 and MAN-PBC-001)', pilot: 'Your policies and procedures in force, with per-realm permissions; target ≥95% correct citations', origin: 'serie' },
      { aspect: 'Audit log', demo: 'For this session, stored in the browser and exportable to JSON or CSV', pilot: 'In the Agentic Platform database, append-only, with each person\'s SSO identity; exportable for Internal Audit', origin: 'serie' },
      { aspect: 'Cost per request', demo: 'Estimate shown at the end of each run', pilot: 'Measured per request in USD, by realm and by use case, with daily and monthly budgets', origin: 'serie' },
      { aspect: 'Compliance (DORA, EBA, GDPR)', demo: 'Explained in the FAQ', pilot: 'Provider entry in the register of information, impact assessment with the DPO and outsourcing analysis before using real data', origin: 'piloto' },
      { aspect: 'Data and actions', demo: 'Synthetic and mutually consistent, prepared by MFM; actions never leave the browser', pilot: 'Your data in read mode and 20–30 anonymised historical cases', origin: 'datos' }
    ],
    writes: 'None to the core or to Falcon during the pilot: drafts approved by a person',
    cases: {
      A: {
        label: 'Use case A', short: 'Case A · Charges complaint', title: 'Complaint about unrecognised charges: case summary, refund proposal and reply',
        systems: ['Salesforce FSC', 'Core bancario T24', 'Redsys'], systemsText: 'Salesforce FSC, Core bancario T24 and Redsys',
        trigger: 'Incoming complaint to the SAC (web form, app or email)',
        output: 'Complaint summary, transactions and merchant, provisional refund proposal by the end of the next business day (PSD2) and draft reply, for approval',
        scene: 'reclamacion', sceneLabel: 'Lucía Ferrer Gil\'s complaint',
        accuracy: '≥95% of 30 historical complaints classified correctly (type, transactions, amounts and deadline)',
        accuracyHow: 'Compared with the closed case in Salesforce FSC'
      },
      B: {
        label: 'Use case B', short: 'Case B · Fraud alert', title: 'Fraud alert by BIN or merchant: cards, preventive rule and notice',
        systems: ['Falcon Fraud', 'Redsys'], systemsText: 'Falcon Fraud alerts and Redsys transactions',
        trigger: 'Falcon alert (fraud threshold by BIN or merchant) via webhook or periodic polling (cron)',
        output: 'Affected transactions and cards, preventive rule and reissue proposal for approval, draft customer notice and notice in Teams',
        scene: 'alarma', sceneLabel: 'BIN 454812 alert',
        accuracy: '100% of affected cards identified in 20 historical episodes',
        accuracyHow: 'Compared with the confirmed cases in Falcon Fraud'
      }
    },
    phases: [
      { from: 1, to: 2, title: 'Access, assessment and baseline', detail: 'Read access, ICT provider registration, impact assessment with the DPO, installation and measurement of current times', result: 'Criteria signed off and baseline measured' },
      { from: 3, to: 5, title: 'Connectors, agents and workflow', detail: 'Tests with 20–30 anonymised historical cases', result: 'Accuracy measured on historical cases' },
      { from: 6, to: 7, title: 'Parallel run', detail: 'Live cases, with the current process as a fallback', result: 'Draft acceptance by the business area' },
      { from: 8, to: 8, title: 'Evaluation and decision', detail: 'Measured criteria and final report for the committee', result: 'Final report and decision' }
    ],
    criteria: [
      { name: 'Time', target: 'Case summary and draft in under 10 min', how: 'Timed against the weeks 1–2 baseline' },
      { name: 'Usefulness', target: 'The area accepts the draft with minor edits in ≥70% of cases', how: 'Each draft reviewed by the owner' },
      { name: 'Citations', target: '≥95% of 50 reference questions with the correct citation', how: 'Evaluation tool included in Agentic Platform' },
      { name: 'Control', target: 'No action without approval; 100% in the audit log', how: 'Review of the exported log by Internal Audit' },
      { name: 'Privacy', target: 'No full PAN, IBAN or national ID in clear text in requests to the model', how: 'Sampling of gateway requests by Security' },
      { name: 'Cost', target: 'Model cost per case measured and within the realm budget', how: 'Cost report by realm (USD, estimate)' }
    ],
    gives: {
      client: ['Business owner and contacts in Systems, Security and the DPO', 'Read access to 1–2 systems', '20–30 anonymised historical cases', 'Policies and procedures in force', 'ICT provider and impact (GDPR) assessments', '2–3 h a week from the business area'],
      mfm: ['Installation on your infrastructure', 'Read connectors', 'Agents and workflow for the use case', 'Documentation for the DORA register and the impact assessment', 'User training', 'Final report with the measured criteria']
    },
    pilot: {
      sub: 'One use case, the Operations Centre, one realm and 5–10 users, on the bank\'s infrastructure and with its model',
      after: 'After the pilot: draft DORA incident notifications with Archer, or answers to correspondent due diligence questionnaires.',
      nextTitle: 'Next step: 2-hour workshop with Operations, Compliance, ICT Risk and Systems',
      nextBody: 'To choose the use case, review the DORA and GDPR fit, confirm read access and set the baseline the pilot will be measured against.'
    },
    calc: {
      fteHours: 1680,
      note: 'Hours of repetitive work that the SAC, Fraud, Payments and Compliance can devote to complex cases and to serving customers.',
      rows: [
        { id: 'reclamacion', label: 'Complaint about unrecognised charges', who: 'SAC', scene: 'reclamacion', seen: 'Charges complaint', n: 350, before: 35, after: 10, basis: 'Case summary, transactions and draft reply' },
        { id: 'alerta', label: 'Fraud alert by BIN or merchant', who: 'Fraud prevention', scene: 'alarma', seen: 'BIN 454812 alert', n: 12, before: 120, after: 20, basis: 'Analysis, rule proposal and notice' },
        { id: 'cpp', label: 'Common point of compromise case', who: 'Fraud and Payments', scene: 'retirada', seen: 'Case CPP-2609-07', n: 2, before: 600, after: 90, basis: 'Merchant → cards → customers, with reissue' },
        { id: 'cuestionario', label: 'Due diligence questionnaire (CBDDQ, correspondent KYC)', who: 'Compliance and correspondent banking', scene: 'cuestionario', seen: 'Wolfsberg CBDDQ', n: 4, before: 600, after: 150, basis: 'With evidence cited from the AML/CFT manual' },
        { id: 'consultas', label: 'Questions on policies and procedures', who: 'SAC, Fraud and Operations', scene: 'procedimientos', seen: 'Policies', n: 400, before: 8, after: 2, basis: 'Search in the policy intranet' },
        { id: 'parte', label: 'Operations Centre shift summary', who: 'Shift supervisors', scene: 'turno', seen: 'Shift summary', n: 66, before: 30, after: 8, basis: '3 shifts × 22 days' }
      ]
    },
    auditEmpty: 'Generate the shift summary, publish a workflow or approve the preventive rule for BIN 454812: each step will appear here with its time, actor and view.',
    auditPilot: 'The log lives in the Agentic Platform database, identifies each person by their SSO, can be filtered by person, action and date, and is exported to CSV for Internal Audit and the supervisor. In this demo it lives in this browser and is cleared with "Reset demo".',
    proposal: {
      code: 'PIL-COP-2026-01',
      filename: 'agentic-pilot-proposal-banco-cierzo',
      objective: 'To measure, with a real use case and signed-off criteria, how much Operations time Agentic Platform frees up and with what accuracy, without changing the T24 core, Falcon Fraud, Redsys, Salesforce FSC, ServiceNow or GRC Archer, and within the framework of DORA, the EBA guidelines, the GDPR and banking secrecy. Agentic Platform reads from those systems, reasons with the bank\'s policies and proposes; a person approves before anything is written.',
      extraArch: [['Pseudonymisation', 'PAN, IBAN, DNI/NIE and names masked before the model']],
      compliance: [
        ['DORA', 'Provider entered in the register of information (Art. 28) and contract with the Art. 30 clauses; exit strategy, including a change of model'],
        ['EBA/GL/2019/02', 'Outsourcing analysis: in the pilot it does not support a critical or important function; reassessed before production'],
        ['GDPR', 'MFM as processor (Art. 28); impact assessment (Art. 35) with the DPO; data in the EU; no automated decisions (Art. 22)'],
        ['Banking secrecy', 'Duty of confidentiality (Art. 83 of Ley 10/2014): data on the bank\'s infrastructure, per-realm permissions and a log of every access'],
        ['PCI DSS 4.0', 'No full PAN in Agentic Platform or in the model; outside the cardholder data environment']
      ],
      signatures: [{ role: 'decider', note: 'Agrees with the scope and criteria' }, { role: 'compliance', note: 'Agrees with the regulatory fit' }, { role: 'it_risk', note: 'Agrees with the ICT provider and the deployment' }]
    },
    presenter: {
      arquitectura: [
        'Agentic Platform replaces nothing: it sits on top of T24, Falcon, Redsys, Salesforce and Archer. It reads, reasons with your policies and proposes; before writing to a system, a person approves.',
        'It is installed on the bank\'s infrastructure, with your SSO and MFA and the model you choose. With a local model, inference stays in your network and there is no additional ICT provider.',
        'The T24 core is read-only. The dashed amber lines are the only writes, and always after approval. Open the compliance questions: DORA, EBA, GDPR and banking secrecy.'
      ],
      piloto: [
        'This is what you have seen today: seven Operations Centre use cases, each with its agents and its approver. Click any of them to go back to it.',
        'To be honest: today\'s data is synthetic and the demo does not call any model. The T24, Falcon or Redsys connectors are built in the pilot, in read mode, after the provider registration and the impact assessment.',
        '6–8 week pilot: one use case, one realm, 5–10 users. The criteria, including privacy, are signed off in week 1 and measured in week 8.'
      ],
      horas: [
        'Ask how many charge complaints, fraud alerts or correspondent questionnaires they handle a month and enter them: the calculator is theirs.',
        '"With Agentic Platform" includes review and approval by a person. These are hours of repetitive work that the SAC and Fraud can devote to complex cases.',
        'These are assumptions for discussion: the real baseline is measured in weeks 1–2 of the pilot.'
      ],
      registro: [
        'Everything we have done today is here: {n}, by people and by agents, with time, actor and view.',
        'Filter by "Decisions": every approval and every rejection, with its reason. Nothing is edited or deleted; it is exported for Internal Audit.',
        'Close: we propose a 2-hour workshop with Operations, Compliance, ICT Risk and Systems.'
      ],
      next: {
        arquitectura: 'Click "Local model" and open "How does it fit with DORA?"; then the "Demo and pilot" tab.',
        piloto: 'Choose use case A or B with them and open the "Hours calculator" tab.',
        horas: 'Enter their monthly volumes and open "Audit log" to close.',
        registro: 'Click "Download pilot proposal (PDF)" and propose a date for the 2-hour workshop.'
      }
    },
    tour: [
      'Agentic Platform sits on top of T24, Falcon, Redsys, Salesforce and Archer: it reads, prepares proposals and a person approves before anything is written. The core is read-only.',
      'With a local model, inference runs inside the bank\'s infrastructure; with an external one, only pseudonymised text leaves, to the EU.',
      'Today\'s use cases, from the BIN 454812 alert to case CPP-2609-07, and what is standard and what is built in the pilot.',
      '6–8 week pilot: one use case, one realm, criteria signed off in week 1 and the DORA and GDPR fit resolved before touching real data.',
      'Hours freed up with editable assumptions; the real baseline is measured in the pilot.',
      'Everything done in the session is kept in the audit log: human decisions, agent steps and export.'
    ]
  }
});
