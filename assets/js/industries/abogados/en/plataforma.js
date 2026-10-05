/* Mora & Jordano · "How Agentic Platform fits" (English): architecture, demo versus pilot, hours calculator, FAQ and
 * compliance (professional secrecy, Code of Ethics, GDPR and LOPDGDD, Ley 10/2010, EU data residency). Synthetic demo data (MFM). */
agenticPackEn('abogados', {
  plataforma: {
    nav: 'How it fits at Mora & Jordano',
    title: 'How it fits at Mora & Jordano',
    actor: 'decider',
    site: { kind: 'Office', name: 'Málaga office (Calle Linaje)', realm: 'Litigation · Tax' },
    pageMeta: [
      { icon: 'building', text: 'Málaga office and Córdoba office' },
      { icon: 'server', text: 'Installed on the firm’s infrastructure, data in the EU' },
      { icon: 'scale', text: 'Professional secrecy, Code of Ethics, GDPR and Ley 10/2010' },
      { icon: 'user-check', text: 'The lawyer approves before filing or communicating' }
    ],
    kpis: [
      { label: 'Proposed pilot', value: '6–8', unit: 'weeks', sub: '1 use case · Málaga office · 1 realm', icon: 'calendar' },
      { label: 'Systems connected in the pilot', value: '2–3', unit: 'read-only', sub: 'Gestor de expedientes, iManage and LexNET notices; nothing is ever filed', icon: 'database' },
      { label: 'Pilot users', value: '5–10', sub: 'Partners and associates · Microsoft Entra ID SSO with MFA', icon: 'users' }
    ],
    arch: {
      title: 'Reference architecture at Mora & Jordano',
      sso: 'SSO and MFA access · Microsoft Entra ID (the firm’s Microsoft 365)',
      ssoShort: 'Microsoft Entra ID SSO with MFA',
      console: 'Web console and notices in Microsoft Teams',
      consoleShort: 'Web console and Teams'
    },
    deploy: {
      cpd: { seg: 'Own server', label: 'The firm’s server · virtual machine with Docker Compose', zone: 'Málaga office server · VM with Docker Compose', text: 'A virtual machine on the firm’s server (or on dedicated hosting from its provider in Spain), on the internal network, with Docker Compose: application, Postgres database and Qdrant vector store.' },
      k8s: { seg: 'Managed hosting', label: 'Hosting provider in Spain · Kubernetes with Helm', zone: 'Managed cluster in Spain · Helm', text: 'Deployed with Helm on a Kubernetes cluster run by your IT provider, in a data centre in Spain, under a data processing agreement with a duty of confidentiality.' },
      cloud: { seg: 'The firm’s cloud', label: 'The firm’s Azure subscription, Spain Central region', zone: 'Mora & Jordano Azure subscription · EU region (Madrid)', text: 'The same installation in the Azure subscription linked to your Microsoft 365, in the Spain Central region (Madrid), with your own keys (BYOK) and no transfers outside the EU.' }
    },
    llm: {
      azure: { seg: 'Azure OpenAI', name: 'Azure OpenAI', local: false, place: 'EU region (Data Zone EU), under Mora & Jordano’s contract', exit: 'Only the pseudonymised text of each request leaves your network', note: 'Connected through the Agentic Platform LiteLLM gateway; no training on your data and no human review by the provider. Confirmed with the DPO in weeks 1–2.' },
      gemini: { seg: 'Gemini', name: 'Google Gemini (Vertex AI)', local: false, place: 'Vertex AI EU region, with the account Mora & Jordano contracts', exit: 'Only the pseudonymised text of each request leaves your network', note: 'Provider included as standard in the Agentic Platform model catalogue.' },
      local: { seg: 'Local model', name: 'Local model', local: true, place: 'GPU server at the Málaga office (Ollama, LM Studio or llama.cpp)', exit: 'Inference runs inside your network', note: 'No third party sees any matter text: the easiest option to justify under professional secrecy. Quality and speed depend on the sizing of your server.' }
    },
    people: ['procesal', 'procesal_staff', 'fiscal', 'mercantil', 'compliance', 'it'],
    peopleShort: ['Litigation', 'Litigation associate', 'Tax', 'Corporate', 'Compliance and DPO', 'IT'],
    modules: [
      { icon: 'workflow', title: 'Workflows (Routines)', text: 'Visual editor, versions and dry run' },
      { icon: 'cpu', title: 'Practice-area agents', text: 'Litigation, Tax, Corporate, Civil and Compliance', agents: true },
      { icon: 'user-check', title: 'Lawyer approval', text: 'No court filing, tax filing or client communication without its owner', approval: true },
      { icon: 'book-open', title: 'Manual and law with citations', text: 'Every answer links its source (manual, Aranzadi, matter); with no source, it says so' },
      { icon: 'history', title: 'Audit log', text: 'Append-only, by matter and person, exportable' },
      { icon: 'key', title: 'Permissions and ethical walls', text: 'Each area sees its matters; anyone conflicted cannot see the matter' },
      { icon: 'gauge', title: 'Cost per request', text: 'USD estimate, budget per area and allocation per matter' },
      { icon: 'shield', title: 'Model gateway', text: 'Masks names, DNI/NIE, NIF, IBAN and case numbers before the model', gateway: true }
    ],
    tiles: [
      { name: 'LexNET', icon: 'mail', text: 'Reads notifications and receipts via the Gestor de expedientes or notices. Never files pleadings: the lawyer does, with their certificate.', write: false },
      { name: 'Sede AEAT', icon: 'globe', text: 'Reads notifications (DEHú) and the status of tax forms. Prepares drafts of forms 200 and 202; the authorised professional files them.', write: false },
      { name: 'Gestor de expedientes', icon: 'database', text: 'Reads matters, parties, deadlines and hours. Records deadlines, tasks and the conflict check.', write: true },
      { name: 'iManage', icon: 'file-text', text: 'Reads pleadings, engagement letters and due diligence. Saves drafts in the matter workspace.', write: true },
      { name: 'Aranzadi', icon: 'book-open', text: 'Looks up legislation and case law to cite the exact source. Read-only.', write: false },
      { name: 'Signaturit', icon: 'edit', text: 'Prepares the engagement letter for e-signature. Sending it to the client requires approval.', write: true },
      { name: 'Microsoft 365', icon: 'message-square', text: 'Notices in Teams and drafts in Outlook. Every client communication requires approval.', write: true }
    ],
    decisions: {
      deploy: ['It does not depend on MFM cloud services. The firm’s IT team or its trusted provider runs it; MFM signs the data processing agreement (GDPR Art. 28) with an express confidentiality undertaking covering information protected by professional secrecy.'],
      llm: 'The model is changed through configuration, without touching the workflows. The model provider is a sub-processor: it is assessed with the DPO and Compliance before being used with real client data.',
      access: [
        'SSO with Microsoft Entra ID (OIDC) or SAML 2.0, with MFA. Permissions by role and by realm (practice area), plus ethical walls per matter: if the conflicts system flags a professional, that person cannot see the matter or its documents. Every query is logged with the person’s identity.',
        'The gateway pseudonymises before calling the model: names of clients and opposing parties, DNI/NIE (Spanish ID numbers), NIF (tax IDs), IBANs, addresses and case numbers are replaced with placeholders and restored on the way back. The firm’s own patterns are added during the pilot.'
      ],
      hitl: 'Filing a pleading through LexNET, accepting an engagement, sending an engagement letter or a fee note, writing to a client, filing a tax form with the AEAT or notifying a breach to the AEPD requires approval from the responsible lawyer or partner. Rejecting applies nothing and is logged with the reason.',
      cost: 'The per-realm budget separates Litigation, Tax, Corporate and Compliance spend, and the cost can be allocated to the matter for per-matter profitability.',
      limits: [
        'It does not replace LexNET, the AEAT e-office (Sede AEAT), the Gestor de expedientes, iManage or Aranzadi.',
        'It does not sign or file pleadings or tax forms: signing and filing stay with the lawyer or the authorised professional, using their certificate.',
        'It does not advise clients on its own: it prepares drafts that a lawyer reviews and signs, and who keeps professional responsibility.',
        'It does not decide conflicts of interest or whether to accept engagements: the partner decides (Art. 12 of the Code of Ethics; POL-CON-002).',
        'It does not report to SEPBLAC or notify the AEPD without approval: it prepares the draft for Compliance and the DPO.'
      ]
    },
    faqTitle: 'Common questions from partners, Compliance and IT',
    faqSub: 'Short answers for the conversation with the partners, Compliance, the DPO and IT',
    faq: [
      { topic: 'Ethics', q: 'How is professional secrecy respected?', a: 'Professional secrecy (Art. 542.3 LOPJ, the Judiciary Act; Art. 21 of the General Statute of the Legal Profession; and Art. 5 of the Code of Ethics) is preserved: matters do not leave the firm’s infrastructure except for the pseudonymised text the model sees, the provider cannot use it for training or review it, and with a local model nothing leaves at all. MFM and the model provider sign confidentiality undertakings, permissions and ethical walls limit who sees each matter, and every access is logged.' },
      { topic: 'Ethics', q: 'Who is responsible for what the agent drafts?', a: 'The lawyer who reviews and signs it, just as with an associate’s work. Agentic Platform prepares drafts with their sources cited; nothing is filed or sent without approval, and the draft states that it was prepared with an AI assistant.' },
      { topic: 'Compliance', q: 'And the GDPR and the LOPDGDD?', a: 'The firm is the controller; MFM is the processor (GDPR Art. 28) under contract and with a list of sub-processors, including the model provider. Before using real data, a data protection impact assessment (Art. 35) is carried out with the DPO, because there is data about people who are not clients (opposing parties, witnesses) and sometimes special categories. Data minimisation: the agent only requests the fields it needs and the gateway pseudonymises. There are no decisions based solely on automated processing (Art. 22).' },
      { topic: 'Data', q: 'Does the data stay in the EU?', a: 'Yes. The installation lives on your server, in a data centre in Spain or in Azure Spain Central; the external model is contracted in an EU region (Data Zone EU or Vertex AI EU) with no retention for training, and with a local model inference never leaves the office. There are no international transfers under Chapter V of the GDPR.' },
      { topic: 'Compliance', q: 'Does it fit with anti-money laundering rules (Ley 10/2010)?', a: 'Yes, and it helps: the Compliance agent checks whether a matter in scope (corporate, real estate or fund management transactions) has complete customer due diligence, beneficial owner identification and 10-year record keeping, and flags what is missing. Reporting suspicious transactions to SEPBLAC (the Spanish FIU) is decided and signed by the firm’s SEPBLAC representative; the agent never tips off the client (Art. 24).' },
      { topic: 'Compliance', q: 'Does the AI Act apply?', a: 'Annex III covers AI used by judicial authorities to interpret facts and law; a firm’s internal use for deadlines, drafts and questionnaires is not listed. The transparency and AI literacy obligations (Art. 4) are met: user training is part of the pilot, and the internal generative AI policy (POL-IA-007) sets which data may be used and who reviews.' },
      { topic: 'Security', q: 'What security certifications does it have?', a: 'Agentic Platform is installed on your infrastructure and inherits its controls; it adds SSO, MFA, role-based permissions, encryption in transit and an append-only audit log. For questionnaires such as Banca Mediterránea’s (ISO 27001, ENS, the Spanish National Security Framework) MFM provides the controls and sub-processor documentation.' },
      { topic: 'Security', q: 'How do users sign in?', a: 'With the Microsoft Entra ID SSO of your Microsoft 365 (OIDC) or SAML 2.0, and MFA. Permissions are by role, by realm (practice area) and by matter. The connectors’ service accounts are read-only and their secrets live in the firm’s secrets vault.' },
      { topic: 'Language model', q: 'Which model does it use, and can it be changed?', a: 'Whichever the firm chooses: Azure OpenAI, Gemini on Vertex AI, AWS Bedrock in the EU or a local model. It is set per realm and changed through configuration, without touching the workflows; Tax can use one and Litigation another.' },
      { topic: 'Language model', q: 'What if the model gets it wrong or invents a judgment?', a: 'It only cites what it finds in its sources (the firm’s manual, iManage, Aranzadi) and links the exact document; if it cannot find it, it says so. Deadlines are calculated by a deterministic rule (business days, August non-working, Málaga and Córdoba public holidays), not by the model. In the pilot, accuracy is measured against closed matters.' },
      { topic: 'Integration', q: 'Is there a connector for LexNET or the Sede AEAT?', a: 'Not as standard, and LexNET offers no public API for third parties. In the pilot, notifications are read through the Gestor de expedientes that already syncs them or from the email notices, and the Sede AEAT through DEHú notifications. Filing pleadings and tax forms stays manual, with the professional’s certificate.' },
      { topic: 'Integration', q: 'Where is it installed?', a: 'On a virtual machine on your server, on a managed cluster in Spain or in your Azure subscription in Spain Central. It does not depend on MFM cloud services.' },
      { topic: 'Cost', q: 'How much does each query cost?', a: 'Agentic Platform measures the cost of each request in USD by realm, user and matter, with a daily and monthly budget and an alert at 80%. A LexNET notification costs cents in model usage; the real cost is measured in the pilot.' },
      { topic: 'Cost', q: 'Licence and price?', a: 'They are set out in the commercial proposal (SOW), together with the data processing agreement and the confidentiality undertaking.' }
    ],
    seen: [
      { scene: 'turno', label: 'Daily summary', icon: 'activity', title: 'The firm’s daily summary', text: 'LexNET notifications, upcoming deadlines, form 200 due on 25 October, conflicts, unrecorded hours and AML; the agent prepares the Managing Partner’s morning agenda.', agents: ['Daily agent'], approver: 'decider', outcome: 'parte' },
      { scene: 'workflow', label: 'From words to workflow', icon: 'workflow', title: 'Deadlines protocol (PRO-PLZ-001) → published workflow', text: '"When a LexNET notification arrives…" becomes a workflow with a trigger, matter, deadline calculation, conflict check, Teams notice and a notice to the partner if it falls due in under 5 days (wf-notificacion-lexnet).', agents: ['Workflow generator'], approver: 'procesal' },
      { scene: 'alarma', label: 'Notification PO 1184/2026', icon: 'scale', title: 'Claim against Aceites Sierra Subbética', text: 'LexNET at 08:12: ordinary proceedings at Court of First Instance no. 7 of Málaga, defence due by 27-10-2026; possible conflict (Art. 12 of the Code of Ethics) and associate on holiday. Engagement blocked, reassignment and notice to the client.', agents: ['Litigation', 'Conflicts', 'Clients'], approver: 'decider', outcome: 'alarma' },
      { scene: 'reclamacion', label: 'Complaint REC-2026-0057', icon: 'mail', title: 'Fee note disputed by Grupo Hostelero Costa del Sol', text: 'Invoice F-2026-0938 for 18,400 € against the engagement letter: analysis of recorded hours, lack of client updates and a draft reply within 15 days.', agents: ['Client care', 'Corporate'], approver: 'mercantil', outcome: 'reclamacion' },
      { scene: 'retirada', label: 'Drill RGPD-2609-03', icon: 'lock', title: 'Email sent to the wrong recipient', text: 'Promociones Guadalhorce due diligence: affected iManage documents, matters, clients and data subjects, encryption, and draft notifications to the AEPD (72 h) and to the data subjects.', agents: ['Data protection', 'Traceability'], approver: 'dpo', outcome: 'retirada' },
      { scene: 'cuestionario', label: 'Banca Mediterránea onboarding', icon: 'list-checks', title: 'Joining the law firm panel', text: 'Professional indemnity insurance, ISO 27001/ENS, conflicts, AML/CFT, GDPR, continuity, rates and generative AI: answers with cited evidence and gaps flagged for Compliance.', agents: ['Questionnaires'], approver: 'compliance', outcome: 'cuestionario' },
      { scene: 'procedimientos', label: 'Firm manual', icon: 'book-open', title: 'Questions with citations', text: 'Court deadlines, conflicts, money laundering, fees, GDPR and the tax calendar: every answer links the section in force and, if there is no source, says so.', agents: ['Procedures'] }
    ],
    honesty: [
      { aspect: 'Console, workflows (Routines) and editor', demo: 'This console, in the browser, with the workflows published in the session', pilot: 'Agentic Platform installed on the firm’s infrastructure; Routines with visual editor, versions and dry run', origin: 'serie' },
      { aspect: 'Workflow from a written protocol', demo: 'Simulated generator in the browser, with three templates', pilot: 'Integrated into Agentic Platform and validated with your protocols; each workflow is reviewed by the area partner before publishing', origin: 'demo' },
      { aspect: 'Mora & Jordano agents', demo: 'Litigation, conflicts, Tax, Corporate, data protection, questionnaires and daily summary, on synthetic data', pilot: 'Those for the chosen use case, adapted to your matters, protocols and templates', origin: 'demo' },
      { aspect: 'Connectors (LexNET, Sede AEAT, Gestor de expedientes, iManage, Aranzadi and Signaturit)', demo: 'Simulated in the browser', pilot: 'Read access to 2–3 systems: Gestor de expedientes, iManage and LexNET notices. There is no standard connector for LexNET or the Sede AEAT', origin: 'piloto' },
      { aspect: 'Notification trigger', demo: 'When the PO 1184/2026 notification is opened', pilot: 'Webhook from the Gestor de expedientes or periodic polling (cron) of the notices: Agentic Platform has no agent scheduler of its own', origin: 'piloto' },
      { aspect: 'Language model', demo: 'No calls: the answers are pre-prepared', pilot: 'Whichever the firm chooses (Azure OpenAI, Gemini or local), through the Agentic Platform gateway and assessed as a sub-processor', origin: 'serie' },
      { aspect: 'Lawyer approval', demo: 'Approval cards; rejecting applies nothing', pilot: 'The same, with SSO, MFA and role-based permissions. In the pilot nothing is filed or sent: drafts approved by the responsible lawyer', origin: 'serie' },
      { aspect: 'Manual with citations', demo: '7 synthetic internal manual documents (PRO-PLZ-001, POL-CON-002, MAN-PBC-003, POL-HON-004, PRO-RGPD-005, CAL-TRI-006 and POL-IA-007)', pilot: 'Your manual and templates in force, with per-realm permissions; target ≥95% correct citations', origin: 'serie' },
      { aspect: 'Audit log', demo: 'For this session, stored in the browser and exportable to JSON or CSV', pilot: 'In the Agentic Platform database, append-only, with each person’s SSO identity and the matter; exportable', origin: 'serie' },
      { aspect: 'Cost per request', demo: 'Estimate shown at the end of each run', pilot: 'Measured per request in USD, by realm and by matter, with daily and monthly budgets', origin: 'serie' },
      { aspect: 'Compliance (professional secrecy, GDPR, Ley 10/2010)', demo: 'Explained in the FAQ', pilot: 'Data processing agreement with confidentiality, impact assessment with the DPO and an ethics review before using real data', origin: 'piloto' },
      { aspect: 'Data and actions', demo: 'Synthetic and mutually consistent, prepared by MFM; actions never leave the browser', pilot: 'Your data in read mode and 20–30 closed, anonymised matters', origin: 'datos' }
    ],
    writes: 'None to LexNET or the Sede AEAT during the pilot: drafts approved by the responsible lawyer',
    cases: {
      A: {
        label: 'Use case A', short: 'Case A · LexNET notification', title: 'LexNET notification: matter, deadline, conflicts and notice to the lawyer',
        systems: ['LexNET', 'Gestor de expedientes', 'iManage'], systemsText: 'LexNET notices, Gestor de expedientes and iManage',
        trigger: 'New LexNET notification synced into the Gestor de expedientes (webhook or periodic polling)',
        output: 'Matter identified, deadline calculated in business days, conflict check, Teams notice to the lawyer and diary entry; notice to the partner if it falls due in under 5 days',
        scene: 'alarma', sceneLabel: 'Notification PO 1184/2026',
        accuracy: '100% of deadlines correctly calculated and ≥95% of 30 historical notifications assigned to the right matter',
        accuracyHow: 'Comparison with the diary and closed matters in the Gestor de expedientes'
      },
      B: {
        label: 'Use case B', short: 'Case B · Fee complaint', title: 'Client complaint about fees: hours, engagement letter and reply',
        systems: ['Gestor de expedientes', 'iManage', 'Outlook'], systemsText: 'Gestor de expedientes (hours and invoices), iManage (engagement letters) and Outlook',
        trigger: 'Complaint received by email or form, logged by Client Care',
        output: 'Complaint summary, recorded hours against the engagement letter, timeline of communications and a draft reply within the internal 15-day deadline, for approval',
        scene: 'reclamacion', sceneLabel: 'Complaint REC-2026-0057',
        accuracy: '≥95% of 20 historical complaints with hours, items and amounts correctly reconciled',
        accuracyHow: 'Comparison with the archived resolution of each complaint'
      }
    },
    phases: [
      { from: 1, to: 2, title: 'Access, assessment and baseline', detail: 'Read access, data processing agreement, impact assessment with the DPO, ethics review, installation and measurement of current time', result: 'Signed criteria and measured baseline' },
      { from: 3, to: 5, title: 'Connectors, agents and workflow', detail: 'Tests with 20–30 closed, anonymised matters', result: 'Accuracy measured against historical matters' },
      { from: 6, to: 7, title: 'Parallel use', detail: 'Live matters, with the current deadline control as backup', result: 'Lawyers’ acceptance of the drafts' },
      { from: 8, to: 8, title: 'Evaluation and decision', detail: 'Measured criteria and final report for the partners’ meeting', result: 'Final report and decision' }
    ],
    criteria: [
      { name: 'Time', target: 'Summary and draft in under 10 min', how: 'Timed against the baseline from weeks 1–2' },
      { name: 'Usefulness', target: 'The lawyer accepts the draft with minor edits in ≥70% of cases', how: 'Review of each draft by the responsible lawyer' },
      { name: 'Citations', target: '≥95% of 50 reference questions with the correct citation', how: 'Evaluation tool included in Agentic Platform' },
      { name: 'Control', target: 'Nothing filed or sent without approval; 100% in the audit log', how: 'Review of the exported log by Compliance' },
      { name: 'Professional secrecy', target: 'No names, DNI/NIE, NIF or case numbers in clear text in requests to the model', how: 'Sampling of gateway requests by the DPO and IT' },
      { name: 'Cost', target: 'Model cost per matter measured and within the realm budget', how: 'Cost report per realm (USD, estimate)' }
    ],
    gives: {
      client: ['Responsible partner and contacts in IT, Compliance and the DPO', 'Read access to the Gestor de expedientes, iManage and LexNET notices', '20–30 closed, anonymised matters', 'Internal manual, protocols and templates in force', 'Impact assessment (GDPR) and ethics review', '2–3 h a week from the area’s lawyers'],
      mfm: ['Installation on your infrastructure', 'Read connectors', 'Agents and workflow for the use case', 'Data processing agreement, confidentiality and documentation for the impact assessment', 'User training (AI literacy)', 'Final report with the measured criteria']
    },
    pilot: {
      sub: 'One use case, the Málaga office, one realm and 5–10 users, on the firm’s infrastructure, with data in the EU and with your model',
      after: 'After the pilot: the tax calendar and drafts of forms 200 and 202 for Tax, or AML due diligence (Ley 10/2010) when opening matters.',
      nextTitle: 'Next step: 2-hour workshop with the Litigation and Tax partners, Compliance, the DPO and IT',
      nextBody: 'To choose the use case, review the fit with professional secrecy and the GDPR, confirm read access and set the baseline the pilot will be measured against.'
    },
    calc: {
      fteHours: 1680,
      note: 'Hours of repetitive work that partners, associates, Compliance and Client Care can devote to strategy, complex pleadings and clients.',
      rows: [
        { id: 'notificacion', label: 'LexNET notification: matter, deadline and conflicts', who: 'Litigation and Secretariat', scene: 'alarma', seen: 'Notification PO 1184/2026', n: 420, before: 15, after: 4, basis: 'Identify matter, calculate deadline, record and notify' },
        { id: 'queja', label: 'Client complaint about fees or updates', who: 'Client Care and area partner', scene: 'reclamacion', seen: 'Complaint REC-2026-0057', n: 3, before: 240, after: 60, basis: 'Recorded hours, engagement letter and draft reply' },
        { id: 'brecha', label: 'Personal data incident (GDPR Art. 33)', who: 'DPO and Compliance', scene: 'retirada', seen: 'Drill RGPD-2609-03', n: 1, before: 720, after: 120, basis: 'Documents → matters → data subjects, with draft notifications' },
        { id: 'cuestionario', label: 'Corporate client onboarding questionnaire', who: 'Compliance and Management', scene: 'cuestionario', seen: 'Banca Mediterránea onboarding', n: 2, before: 480, after: 120, basis: 'With cited evidence from policies and certificates' },
        { id: 'consultas', label: 'Questions on the internal manual and protocols', who: 'All professionals', scene: 'procedimientos', seen: 'Firm manual', n: 300, before: 10, after: 2, basis: 'Searching the intranet and iManage' },
        { id: 'resumen', label: 'The firm’s daily summary', who: 'Managing Partner and Secretariat', scene: 'turno', seen: 'Daily summary', n: 22, before: 45, after: 10, basis: '1 summary × 22 business days' }
      ]
    },
    auditEmpty: 'Generate the daily summary, publish a workflow or decide on the PO 1184/2026 notification: each step will appear here with its time, actor and view.',
    auditPilot: 'The log lives in the Agentic Platform database, identifies each person by their SSO and each action by its matter, can be filtered by person, action and date, and is exported to CSV for Compliance, the DPO or a client audit. In this demo it lives in this browser and is cleared with "Reset demo".',
    proposal: {
      code: 'PIL-MJ-2026-01',
      filename: 'agentic-pilot-proposal-mora-jordano',
      objective: 'To measure, with a real use case and signed criteria, how much lawyer time Agentic Platform frees up and how accurately, without changing LexNET, the Sede AEAT, the Gestor de expedientes, iManage or Aranzadi, and within the framework of professional secrecy, the Code of Ethics, the GDPR and the LOPDGDD, and Ley 10/2010. Agentic Platform reads from those systems, reasons with the firm’s manual and proposes; the responsible lawyer approves before filing or communicating.',
      extraArch: [['Pseudonymisation', 'Names of clients and opposing parties, DNI/NIE, NIF, IBAN and case numbers masked before the model']],
      compliance: [
        ['Professional secrecy', 'Art. 542.3 LOPJ, Art. 21 EGA (RD 135/2021) and Art. 5 of the Code of Ethics: data on the firm’s infrastructure, confidentiality from MFM and the provider, ethical walls and a log of every access'],
        ['Code of Ethics', 'Conflicts of interest (Art. 12) and acceptance of engagements are decided by the partner; a lawyer reviews and signs everything that leaves the firm'],
        ['GDPR and LOPDGDD', 'MFM as processor (Art. 28); impact assessment (Art. 35) with the DPO; data in the EU; no automated decisions (Art. 22)'],
        ['Ley 10/2010', 'Due diligence and beneficial ownership checked by the agent; reporting to SEPBLAC decided by the representative; 10-year record keeping'],
        ['AI Act', 'Use outside Annex III; transparency in drafts, user training (Art. 4) and internal policy POL-IA-007']
      ],
      signatures: [{ role: 'decider', note: 'Agrees with the scope and criteria' }, { role: 'compliance', note: 'Agrees with the ethical and regulatory fit' }, { role: 'it', note: 'Agrees with the deployment and security' }]
    },
    presenter: {
      arquitectura: [
        'Agentic Platform replaces nothing: it sits on top of LexNET, the Sede AEAT, the Gestor de expedientes, iManage and Aranzadi. It reads, reasons with your manual and proposes; before a pleading is filed or a client is written to, the lawyer approves.',
        'It is installed on the firm’s infrastructure, with your Microsoft 365 SSO and MFA and the model you choose, always in the EU. With a local model, no matter text leaves the office.',
        'LexNET and the AEAT are read-only: filing stays with you, with your certificate. The dashed amber lines are the only writes, and always after approval. Open the questions on professional secrecy and the GDPR.'
      ],
      piloto: [
        'This is what you have seen today: seven cases from the firm, each with its agents and its approver. Click any of them to go back to it.',
        'The honest part: today’s data is synthetic and the demo calls no model. LexNET has no public API: in the pilot it is read through your Gestor de expedientes, after the data processing agreement and the impact assessment.',
        'A 6–8 week pilot: one use case, one realm, 5–10 users. The criteria, including professional secrecy, are signed in week 1 and measured in week 8.'
      ],
      horas: [
        'Ask how many LexNET notifications, fee complaints or onboarding questionnaires they handle each month and type them in: the calculator is theirs.',
        '"With Agentic Platform" includes the lawyer’s review and approval. These are hours of repetitive work that partners and associates can devote to strategy and clients.',
        'These are assumptions for discussion: the real baseline is measured in weeks 1–2 of the pilot.'
      ],
      registro: [
        'Everything we have done today is here: {n}, from people and agents, with time, actor and view.',
        'Filter by "Decisions": every approval and every rejection, with its reason. Nothing is edited or deleted; it is exported for Compliance, the DPO or a client audit.',
        'Close: we propose a 2-hour workshop with the Litigation and Tax partners, Compliance, the DPO and IT.'
      ],
      next: {
        arquitectura: 'Click "Local model" and open "How is professional secrecy respected?"; then the "Demo and pilot" tab.',
        piloto: 'Choose use case A or B with them and open the "Hours calculator" tab.',
        horas: 'Type in their monthly volumes and open "Audit log" to close.',
        registro: 'Click "Download pilot proposal (PDF)" and propose a date for the 2-hour workshop.'
      }
    },
    tour: [
      'Agentic Platform sits on top of LexNET, the Sede AEAT, the Gestor de expedientes, iManage and Aranzadi: it reads, prepares drafts and the lawyer approves before filing or communicating.',
      'With a local model, no matter text leaves the office; with an external one, only pseudonymised text goes to an EU region, with no training.',
      'Today’s cases, from the PO 1184/2026 notification to the RGPD-2609-03 drill, and what is standard and what is built in the pilot.',
      'A 6–8 week pilot: one use case, one realm, criteria signed in week 1 and the fit with professional secrecy and the GDPR settled before touching real data.',
      'Hours freed up with editable assumptions; the real baseline is measured in the pilot.',
      'Everything done in the session stays in the audit log: lawyers’ decisions, agent steps and export.'
    ]
  }
});
