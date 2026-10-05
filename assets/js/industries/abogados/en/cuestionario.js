/* Mora & Jordano · onboarding questionnaire for the external law firm panel of Banca Mediterránea (fictitious bank), English. Synthetic demo data (MFM). */
agenticPackEn('abogados', {
  cuestionario: {
    agent: 'Customer questionnaires',
    lang: 'en',
    default_sel: 'D1',
    reviewer: 'Head of Compliance (AML and GDPR)',
    assignee: 'Firm management and Compliance',
    assignee_short: 'Management and Compliance',
    team: 'Compliance',
    assign_due: '2026-10-08',
    responder: 'Mora & Jordano Abogados',
    site: 'Mora & Jordano · Málaga and Córdoba offices',
    site_label: 'Firm',
    page_title: 'Law firm panel onboarding · Banca Mediterránea',
    report_title: 'Response to the legal panel onboarding questionnaire',
    ref_label: 'Questionnaire item',
    scope_meta_label: 'Lots',
    discard_placeholder: 'For example: answered with the attached insurance certificate',
    save_system: 'Gestor de expedientes',
    qn: {
      code: 'CUE-2026-051',
      title: 'External law firm onboarding questionnaire · Legal Panel 2027-2029',
      customer: 'Banca Mediterránea, S.A.',
      via: 'Banca Mediterránea · Legal Supplier Management',
      received: '2026-09-28T10:40',
      due: '2026-10-15',
      file: 'BancaMediterranea_Homologacion_Panel_Juridico_2027-2029_Mora_Jordano.xlsx',
      scope: 'onboarding of Mora & Jordano onto Banca Mediterránea’s external law firm panel for 2027-2029, Litigation lot (banking litigation and debt recovery) and Tax lot',
      scope_short: 'Legal Panel 2027-2029 · Litigation and Tax lots',
      scope_label: 'onboarding onto the external law firm panel'
    },
    email: {
      mailbox: 'Compliance mailbox',
      headers: {
        From: 'Legal Supplier Management, Banca Mediterránea <panel.juridico@bancamediterranea.example>',
        To: 'Compliance, Mora & Jordano <cumplimiento@morajordano.example>',
        Date: 'Mon, 28 Sep 2026 10:40 (CEST)',
        Subject: 'Legal Panel 2027-2029 onboarding - supplier questionnaire - reply by 15 October'
      },
      text: 'Dear colleagues,\n\nFurther to our invitation to take part in the onboarding process for our Legal Panel 2027-2029 (Litigation lot and Tax lot), please find attached the external law firm onboarding questionnaire.\n\nThe questionnaire has 15 questions in five sections: firm, organisation and insurance; anti-money laundering; data protection and information security; conflicts of interest, deadlines and continuity; and fees, artificial intelligence and claims.\n\nFor each answer, please state the policy, certificate or record that supports it; answers without evidence will be scored as non-compliant. The questionnaire must be signed by the firm’s compliance officer.\n\nWe need the completed questionnaire by Thursday 15 October 2026; incomplete applications will be excluded from this round.\n\nKind regards,\n\nLegal Supplier Management\nBanca Mediterránea, S.A.',
      highlights: [
        { text: 'Legal Panel 2027-2029', label: 'Onboarding', tone: 'brand' },
        { text: '15 questions', label: 'Questions', tone: 'brand' },
        { text: 'state the policy, certificate or record that supports it', label: 'Requirement' },
        { text: 'signed by the firm’s compliance officer', label: 'Sign-off' },
        { text: 'Thursday 15 October 2026', label: 'Deadline' }
      ]
    },
    sections: [
      { id: 'A', en: 'Firm, organisation and insurance' },
      { id: 'B', en: 'Anti-money laundering (AML/CFT)' },
      { id: 'C', en: 'Data protection and information security' },
      { id: 'D', en: 'Conflicts, deadlines and continuity' },
      { id: 'E', en: 'Fees, AI and claims' }
    ],
    kpi: { label: 'Conflict checks in 2025', value: 1146, sub: '23 conflicts detected · 9 engagements declined', icon: 'scale' },
    sources_sub: 'AML manual, internal policies, certificates and annual report of the firm',
    identify_result: 'Banca Mediterránea · Legal Panel 2027-2029 · 15 onboarding questions',
    search_scope: 'AML manual, conflicts, fees, security and AI policies, deadline and GDPR protocols, certificates and the firm’s annual report',
    lookups: [
      { system: 'Gestor de expedientes', action: 'Checks conflict checks, AML due diligence and deadline control', result: '1,146 conflict checks · 4,812 procedural deadlines with none missed in 2025', ms: 540 },
      { system: 'iManage', action: 'Reads the security configuration and location of the document repository', result: 'AES-256 encryption · hosted in the EU · two-factor authentication on 100% of accounts', ms: 420 },
      { system: 'Signaturit', action: 'Counts the engagement letters signed in 2025', result: '312 engagement letters signed electronically · 100% of invoiced matters', ms: 310 },
      { system: 'LexNET', action: 'Cross-checks the conflicts question with today’s notifications', result: 'PO 1184/2026: claim against Aceites Sierra Subbética; possible conflict with the claimant (PRC-2026-0412)', ms: 300, tone: 'warn' },
      { system: 'Gestor de expedientes', action: 'Cross-checks the incidents question with open matters', result: 'Matter RGPD-2609-03 open: due diligence report sent to the wrong recipient', ms: 280, tone: 'warn' }
    ],
    compare: {
      people: '3–4: Compliance, IT, Administration and the partner who manages the relationship with the bank',
      systems: '7–9: email, the bank’s Excel file, AML manual, internal policies, Gestor de expedientes, iManage, Signaturit, insurance and ISO certificates and the firm’s annual report',
      steps: 'Find the evidence for each question, copy the questionnaire from the last onboarding and update the figures, ask IT and Administration for data and collect certificates from the insurance broker',
      time: '1–2 days of work for Compliance and a partner, spread over a week'
    },
    presenter: {
      before: [
        'Getting onto a bank’s law firm panel means three years of litigation and tax work. If the onboarding questionnaire arrives late or incomplete, the application is out: there is no second round.',
        'This one comes from Banca Mediterránea: {total} questions on insurance, anti-money laundering, data protection, security, conflicts, fees and the use of generative AI with client data.',
        'When you press the button, Agentic Platform searches the AML manual, internal policies, protocols, certificates and the firm’s annual report, plus the records in Gestor de expedientes, iManage, Signaturit and LexNET, and drafts each answer with its source.'
      ],
      during: [
        '{drafted} of {total} have a cited draft; every citation is checked against the source text. {flagged} are left unanswered: cyber insurance, anti-bribery and the internal whistleblowing channel, and professional liability claims. No document, nothing invented.',
        'D1: besides answering on the conflicts policy, it flags this morning’s LexNET notification, with a possible conflict in PO 1184/2026. The answer describes the policy, not the case, but whoever signs needs to know.',
        'D3: the bank asks for the date and outcome of the last data breach drill; the drill for matter RGPD-2609-03 produces it in this same demo.',
        'Nothing goes out without Compliance sign-off: bulk approval only for high-confidence answers; medium-confidence ones are reviewed one by one.'
      ],
      next_during: 'Show D1 (citations and alarm warning) and E3 (no evidence). Then “Approve the {alta} high-confidence answers”, approve {media_ids} one by one and “Assign the {flagged} without a source”.'
    },
    sources: {
      'MAN-PBC-003': {
        type: 'doc', kind: 'Manual', code: 'MAN-PBC-003', title: 'Anti-money laundering and counter-terrorist financing manual', system: 'Procedimientos', version: '7', date: '2026-02-16', owner: 'Head of Compliance (AML and GDPR)',
        org: 'Mora & Jordano · Compliance',
        sections: [
          { id: '2', heading: '2. Regulatory framework', page: 3, text: 'The firm is an obliged entity under Article 2.1.ñ) of Law 10/2010 on the prevention of money laundering and terrorist financing (Spanish AML/CFT Act) when it takes part in transactions on behalf of clients. The manual implements that Law and its Regulation, approved by Royal Decree 304/2014.' },
          { id: '3', heading: '3. Organisation', page: 5, text: 'The Internal Control Body meets quarterly and is chaired by the Managing Partner. The representative before SEPBLAC is the Head of Compliance (AML and GDPR).' },
          { id: '5', heading: '5. Due diligence', page: 8, text: 'No matter is opened without formal identification of the client and its beneficial owner. A beneficial owner is any natural person who owns or controls more than 25% of the capital or voting rights, and the information is checked against the Spanish Central Register of Beneficial Ownership.\n\nHigh-risk clients and politically exposed persons are subject to enhanced due diligence: source of funds and Managing Partner approval.' },
          { id: '6', heading: '6. Suspension of the engagement', page: 10, text: 'If due diligence is not completed, the engagement is suspended and no service is provided.' },
          { id: '8', heading: '8. Reporting', page: 13, text: 'Transactions with signs of money laundering are examined and, where appropriate, reported to SEPBLAC without delay, except when defending the client or advising on the client’s legal position (Article 22 of Law 10/2010).' },
          { id: '9', heading: '9. Record keeping', page: 15, text: 'Due diligence records are kept for 10 years after the business relationship ends.' },
          { id: '11', heading: '11. Training', page: 17, text: 'AML/CFT training is mandatory every year for all the firm’s professionals.' },
          { id: '12', heading: '12. External review', page: 18, text: 'An external expert reviews the internal control procedures every three years (Article 28 of Law 10/2010); the latest report dates from December 2024.' }
        ]
      },
      'POL-CON-002': {
        type: 'doc', kind: 'Policy', code: 'POL-CON-002', title: 'Conflicts of interest and engagement acceptance policy', system: 'Procedimientos', version: '5', date: '2026-01-19', owner: 'Managing Partner',
        sections: [
          { id: '2', heading: '2. Principles', page: 2, text: 'The policy applies Article 12 of the Spanish Code of Professional Conduct for Lawyers (Código Deontológico de la Abogacía Española) and the General Statute of the Spanish Legal Profession (Royal Decree 135/2021).' },
          { id: '3', heading: '3. Prior check', page: 3, text: 'Before accepting an engagement, the client, the opposing party and their group companies are checked in the matter management system against all the firm’s matters of the last ten years. No engagement is accepted without a signed conflict check.' },
          { id: '4', heading: '4. Resolution', page: 4, text: 'If there is a conflict, the engagement is declined or, where the rules allow, accepted with the informed written consent of the affected clients. The decision rests with the Managing Partner.' },
          { id: '5', heading: '5. Information barriers', page: 5, text: 'When a matter is accepted with consent, information barriers are put in place: separate teams and restricted access to the file in iManage.' }
        ]
      },
      'PRO-PLZ-001': {
        type: 'doc', kind: 'Protocol', code: 'PRO-PLZ-001', title: 'Procedural deadline control protocol', system: 'Procedimientos', version: '9', date: '2026-03-02', owner: 'Head of Litigation (partner)',
        sections: [
          { id: '2', heading: '2. Receipt of notifications', page: 2, text: 'LexNET notifications are reviewed every working day before 10:00 and assigned to the matter and the responsible lawyer on the same day.' },
          { id: '3', heading: '3. Calculation', page: 3, text: 'Deadlines are counted in working days under Articles 133 to 136 of the Spanish Civil Procedure Act (LEC), with August excluded and the public holidays of the court’s seat.' },
          { id: '4', heading: '4. Double check', page: 4, text: 'Each deadline is calculated by a member of the litigation secretariat and validated by the responsible lawyer; the matter management system sends reminders 10, 5 and 2 days before it expires.' },
          { id: '6', heading: '6. Absences', page: 6, text: 'Absences of the responsible lawyer are covered by a substitute designated in the matter.' }
        ]
      },
      'PRO-RGPD-005': {
        type: 'doc', kind: 'Protocol', code: 'PRO-RGPD-005', title: 'Data protection and security breach management protocol', system: 'Procedimientos', version: '4', date: '2025-11-24', owner: 'Data Protection Officer',
        sections: [
          { id: '2', heading: '2. Position of the firm', page: 2, text: 'In legal advice and defence, the firm acts as data controller, bound by professional secrecy. Where a client commissions a service that involves processing data on its behalf, a data processing agreement is signed under Article 28 GDPR.' },
          { id: '3', heading: '3. Data Protection Officer', page: 3, text: 'The firm has appointed a Data Protection Officer, notified to the Spanish Data Protection Agency (AEPD).' },
          { id: '6', heading: '6. Security breaches', page: 7, text: 'Every breach is logged and assessed within 24 hours; where it poses a risk to data subjects’ rights it is notified to the AEPD within 72 hours (Article 33 GDPR) and, if the risk is high, to the data subjects (Article 34).' },
          { id: '7', heading: '7. Drills', page: 8, text: 'At least one data breach drill is carried out every year.' }
        ]
      },
      'POL-SEG-006': {
        type: 'doc', kind: 'Policy', code: 'POL-SEG-006', title: 'Information security and business continuity policy', system: 'Procedimientos', version: '6', date: '2026-01-26', owner: 'IT and information security',
        sections: [
          { id: '3', heading: '3. Access control', page: 3, text: 'Access to the firm’s systems requires two-factor authentication. Matter permissions are granted per matter and reviewed every six months.' },
          { id: '4', heading: '4. Encryption', page: 4, text: 'Documents are encrypted at rest and in transit; confidential documents are sent externally through an expiring iManage secure link.' },
          { id: '5', heading: '5. Providers and data location', page: 5, text: 'Technology providers that process client data are approved before they are engaged, sign a data processing agreement and host the data in the European Union.' },
          { id: '8', heading: '8. Business continuity', page: 9, text: 'Backups are taken daily and replicated to a second data centre in the EU. Objectives: recover critical systems (LexNET, Gestor de expedientes and iManage) within 4 hours, with a maximum data loss of 24 hours. The continuity plan is tested once a year.' }
        ]
      },
      'POL-HON-004': {
        type: 'doc', kind: 'Policy', code: 'POL-HON-004', title: 'Fees and engagement letter policy', system: 'Procedimientos', version: '3', date: '2025-12-09', owner: 'Managing Partner',
        sections: [
          { id: '2', heading: '2. Engagement letter', page: 2, text: 'Every matter starts with a signed engagement letter setting out the scope, the team, the fees or how they are calculated, and the advance on costs.' },
          { id: '3', heading: '3. Fee arrangements', page: 3, text: 'Fees are agreed as hourly rates by professional category, as a fixed fee or by procedural stage; rates are reviewed once a year.' },
          { id: '4', heading: '4. Client information', page: 4, text: 'Invoices itemise the work done and, for hourly billing, the hours recorded by each professional. If the budget is expected to be exceeded, the client is informed before work continues.' }
        ]
      },
      'POL-IA-007': {
        type: 'doc', kind: 'Policy', code: 'POL-IA-007', title: 'Generative artificial intelligence use policy', system: 'Procedimientos', version: '2', date: '2026-04-20', owner: 'Managing Partner',
        sections: [
          { id: '2', heading: '2. Authorised tools', page: 2, text: 'Only generative AI tools authorised by the firm may be used with client data, with the data hosted in the EU and never used to train third-party models.' },
          { id: '3', heading: '3. Human review', page: 3, text: 'No document, report or communication generated with AI is sent to a client or a court without review and signature by the responsible lawyer.' },
          { id: '4', heading: '4. Prohibitions', page: 3, text: 'Entering client data into public AI tools or personal accounts is prohibited.' }
        ]
      },
      'CERT-RC-2026': {
        type: 'doc', kind: 'Certificate', code: 'CERT-RC-2026', title: 'Professional indemnity insurance certificate 2026', system: 'Procedimientos', date: '2026-01-02', owner: 'Managing Partner',
        org: 'Firm’s insurance broker · insurer’s certificate',
        sections: [
          { id: '1', heading: 'Policy details', page: 1, text: 'Professional indemnity policy no. RCP-2026-48213, issued by Bética Seguros Profesionales. Insured: the firm and all its lawyers and professionals.' },
          { id: '2', heading: 'Limits and period', page: 1, text: 'Limit of indemnity: €3,000,000 per claim and per year. Deductible: €15,000 per claim. Period: from 01/01/2026 to 31/12/2026, renewed annually.' }
        ]
      },
      'CERT-ISO-27001': {
        type: 'doc', kind: 'Certificate', code: 'CERT-ISO-27001', title: 'ISO/IEC 27001:2022 certificate for the information security management system', system: 'Procedimientos', date: '2025-06-16',
        org: 'Certification body accredited by ENAC',
        sections: [
          { id: '1', heading: 'Scope', page: 1, text: 'Information security management system supporting the legal advice and litigation services provided from the Málaga and Córdoba offices. Certificate no. SGSI-2025-0716, valid until 15/06/2028.' },
          { id: '2', heading: 'Surveillance audit', page: 2, text: '2026 surveillance audit held on 04/06/2026: no major non-conformities and 2 minor non-conformities.' }
        ]
      },
      'MEM-2025': {
        type: 'doc', kind: 'Annual report', code: null, label: 'Firm annual report 2025', title: 'Firm annual report 2025', system: 'Procedimientos', date: '2026-03-31',
        org: 'Mora & Jordano · Firm management',
        sections: [
          { id: '1', heading: '1. The firm', page: 4, text: 'Mora & Jordano provides its services from its main office in Málaga (Calle Linaje 3) and its office in Córdoba (Avenida Gran Capitán 46), with 34 professionals at 31/12/2025.' },
          { id: '2', heading: '2. Practice areas', page: 5, text: 'Practice areas: Tax, Litigation, Civil and Corporate law, with restructuring, insolvency and family business teams.' },
          { id: '3', heading: '3. Bar membership', page: 6, text: 'All the firm’s lawyers are registered as practising members of the Málaga or Córdoba Bar (Ilustre Colegio de Abogados).' }
        ]
      },
      'GEX-CONF': {
        type: 'record', kind: 'Conflicts of interest', code: 'Conflicts 2025', title: 'Conflict of interest checks · activity', system: 'Gestor de expedientes',
        org: 'Gestor de expedientes · engagement acceptance',
        sections: [
          { id: 'act', heading: '2025 activity', text: 'Conflict checks run in 2025: 1,146; conflicts detected: 23; engagements declined due to conflict: 9; engagements accepted with informed written consent and an information barrier: 14.' }
        ]
      },
      'GEX-PBC': {
        type: 'record', kind: 'Due diligence', code: 'AML 2025', title: 'Client due diligence · AML/CFT', system: 'Gestor de expedientes',
        org: 'Gestor de expedientes · client files and AML',
        sections: [
          { id: 'dd', heading: 'Status at 31/08/2026', text: 'Clients with complete due diligence: 1,412 of 1,418; the 6 outstanding engagements are suspended until it is completed.' },
          { id: 'form', heading: '2025 training', text: 'AML/CFT training 2025: 33 of 34 professionals (97%); the remaining person joined in December and is still within the deadline.' }
        ]
      },
      'GEX-PLZ': {
        type: 'record', kind: 'Procedural deadlines', code: 'Deadlines 2025', title: 'Procedural deadline control · activity', system: 'Gestor de expedientes',
        org: 'Gestor de expedientes · litigation calendar',
        sections: [
          { id: 'act', heading: '2025 activity', text: 'LexNET notifications received in 2025: 6,390. Procedural deadlines recorded: 4,812, all double-checked; deadlines missed: 0.' },
          { id: 'dist', heading: 'Deadlines by area in 2025', list: ['Litigation: 3,968 deadlines', 'Tax (appeals and economic-administrative claims): 612 deadlines', 'Corporate and Civil: 232 deadlines'] }
        ]
      },
      'IMAN-SEC': {
        type: 'record', kind: 'Configuration', code: 'iManage · security', title: 'Document repository · security configuration', system: 'iManage',
        org: 'iManage · repository administration',
        sections: [
          { id: 'cfg', heading: 'Current configuration', text: 'AES-256 encryption at rest and TLS 1.2 or higher in transit. Hosting: data centres in Frankfurt and Amsterdam (EU). Accounts with two-factor authentication: 100%.' }
        ]
      },
      'SIG-ENC': {
        type: 'record', kind: 'Engagement letters', code: 'Engagements 2025', title: 'Signed engagement letters', system: 'Signaturit',
        org: 'Signaturit · electronic signature of engagement letters',
        sections: [
          { id: 'f', heading: '2025 activity', text: 'Engagement letters signed electronically in 2025: 312; invoiced matters with a signed engagement letter: 100%.' }
        ]
      }
    },
    questions: [
      {
        id: 'A1', ref: 'BM-PJ §1.1', sec: 'A', topic: 'Firm identification and structure', conf: 'alta',
        qEn: 'Provide the firm’s name, offices, number of professionals and practice areas, and confirm that all lawyers are registered as practising members of a Bar.',
        en: 'Mora & Jordano provides its services from its main office in Málaga (Calle Linaje 3) and its office in Córdoba (Avenida Gran Capitán 46), with 34 professionals at 31 December 2025 [1]. Our practice areas are Tax, Litigation, Civil and Corporate law, with restructuring, insolvency and family business teams [2]. All the firm’s lawyers are registered as practising members of the Málaga or Córdoba Bar [3].',
        cites: [
          { src: 'MEM-2025', q: 'Mora & Jordano provides its services from its main office in Málaga (Calle Linaje 3) and its office in Córdoba (Avenida Gran Capitán 46), with 34 professionals at 31/12/2025.' },
          { src: 'MEM-2025', q: 'Practice areas: Tax, Litigation, Civil and Corporate law, with restructuring, insolvency and family business teams.' },
          { src: 'MEM-2025', q: 'All the firm’s lawyers are registered as practising members of the Málaga or Córdoba Bar' }
        ]
      },
      {
        id: 'A2', ref: 'BM-PJ §1.3', sec: 'A', topic: 'Professional indemnity insurance', conf: 'alta',
        qEn: 'Does the firm hold professional indemnity insurance? State the insurer, the limit per claim and per year, the deductible and the policy period, and confirm who is insured.',
        en: 'Yes. The firm holds professional indemnity policy no. RCP-2026-48213 issued by Bética Seguros Profesionales, covering the firm and all its lawyers and professionals [1]. The limit of indemnity is €3,000,000 per claim and per year, with a deductible of €15,000 per claim, and the policy runs from 1 January to 31 December 2026 with annual renewal [2].',
        cites: [
          { src: 'CERT-RC-2026', q: 'Professional indemnity policy no. RCP-2026-48213, issued by Bética Seguros Profesionales. Insured: the firm and all its lawyers and professionals.' },
          { src: 'CERT-RC-2026', q: 'Limit of indemnity: €3,000,000 per claim and per year. Deductible: €15,000 per claim. Period: from 01/01/2026 to 31/12/2026, renewed annually.' }
        ]
      },
      {
        id: 'A3', ref: 'BM-PJ §1.4', sec: 'A', topic: 'Cyber insurance', conf: 'none',
        qEn: 'Does the firm hold cyber insurance covering data breaches involving client information, including notification costs and third-party liability? State the limit.',
        flag: {
          reason: 'None of the {doc_count} indexed documents is a cyber insurance policy or certificate; the professional indemnity certificate does not mention that cover.',
          context: 'Banks increasingly require this cover from the firms on their panel. Agentic Platform does not answer “No”, nor does it assume the cover is included in the professional indemnity policy: the firm’s insurance broker has to confirm it.',
          partial: [],
          missing: ['Cyber insurance policy or certificate, if any', 'Insured limit and cover (notification, recovery, third-party liability)', 'Broker’s confirmation of whether the professional indemnity policy includes cyber risks']
        }
      },
      {
        id: 'B1', ref: 'BM-PJ §2.1', sec: 'B', topic: 'AML/CFT programme and officer', conf: 'alta',
        qEn: 'Is the firm an obliged entity under Law 10/2010? Describe its AML/CFT governance, including the internal control body and the representative before SEPBLAC, and how suspicious transactions are handled.',
        en: 'Yes. The firm is an obliged entity under Article 2.1.ñ) of Law 10/2010 when it takes part in transactions on behalf of clients, and our manual implements that Law and Royal Decree 304/2014 [1]. The Internal Control Body meets quarterly and is chaired by the Managing Partner, and our representative before SEPBLAC is the Head of Compliance (AML and GDPR) [2]. Transactions with signs of money laundering are examined and, where appropriate, reported to SEPBLAC without delay, except when defending the client or advising on the client’s legal position (Article 22 of Law 10/2010) [3]. Due diligence records are kept for 10 years after the business relationship ends [4].',
        cites: [
          { src: 'MAN-PBC-003', q: 'The firm is an obliged entity under Article 2.1.ñ) of Law 10/2010' },
          { src: 'MAN-PBC-003', q: 'The Internal Control Body meets quarterly and is chaired by the Managing Partner. The representative before SEPBLAC is the Head of Compliance (AML and GDPR).' },
          { src: 'MAN-PBC-003', q: 'Transactions with signs of money laundering are examined and, where appropriate, reported to SEPBLAC without delay, except when defending the client or advising on the client’s legal position (Article 22 of Law 10/2010).' },
          { src: 'MAN-PBC-003', q: 'Due diligence records are kept for 10 years after the business relationship ends.' }
        ]
      },
      {
        id: 'B2', ref: 'BM-PJ §2.2', sec: 'B', topic: 'Due diligence and beneficial ownership', conf: 'alta',
        qEn: 'Describe the firm’s client due diligence (KYC), including beneficial ownership, enhanced measures for high-risk clients and PEPs, and the current status of due diligence across the client base.',
        en: 'No matter is opened without formal identification of the client and its beneficial owner; a beneficial owner is any natural person who owns or controls more than 25% of the capital or voting rights, and the information is checked against the Spanish Central Register of Beneficial Ownership [1]. High-risk clients and politically exposed persons are subject to enhanced due diligence, including source of funds and Managing Partner approval [2]. If due diligence is not completed, the engagement is suspended and no service is provided [3]. At 31 August 2026, 1,412 of 1,418 clients had complete due diligence, and the 6 outstanding engagements are suspended until it is completed [4].',
        cites: [
          { src: 'MAN-PBC-003', q: 'No matter is opened without formal identification of the client and its beneficial owner. A beneficial owner is any natural person who owns or controls more than 25% of the capital or voting rights, and the information is checked against the Spanish Central Register of Beneficial Ownership.' },
          { src: 'MAN-PBC-003', q: 'High-risk clients and politically exposed persons are subject to enhanced due diligence: source of funds and Managing Partner approval.' },
          { src: 'MAN-PBC-003', q: 'If due diligence is not completed, the engagement is suspended and no service is provided.' },
          { src: 'GEX-PBC', q: 'Clients with complete due diligence: 1,412 of 1,418; the 6 outstanding engagements are suspended until it is completed.' }
        ]
      },
      {
        id: 'B3', ref: 'BM-PJ §2.4', sec: 'B', topic: 'Anti-bribery and internal reporting channel', conf: 'none',
        qEn: 'Does the firm have an anti-bribery and corruption policy and an internal whistleblowing channel under Law 2/2023? When were they last reviewed?',
        flag: {
          reason: 'The anti-bribery policy and the internal reporting system are not among the {doc_count} indexed documents.',
          context: 'Law 2/2023 (Spanish Whistleblower Protection Act) requires an internal reporting system for private entities with 50 or more workers; with 34 professionals the firm may not be obliged, but the bank asks anyway. Agentic Platform does not state that one exists or assume a review date.',
          partial: [],
          missing: ['Anti-bribery, gifts and hospitality policy', 'Internal reporting system or whistleblowing channel, if any, and the person responsible', 'Date of the last review of both']
        }
      },
      {
        id: 'C1', ref: 'BM-PJ §3.1', sec: 'C', topic: 'Processing role and DPO', conf: 'alta',
        qEn: 'In what capacity will the firm process the bank’s personal data (controller or processor)? Will it sign a data processing agreement under Article 28 GDPR, and has it appointed a Data Protection Officer?',
        en: 'In legal advice and defence, the firm acts as data controller, bound by professional secrecy; where a client commissions a service that involves processing data on its behalf, we sign a data processing agreement under Article 28 GDPR [1]. The firm has appointed a Data Protection Officer, notified to the Spanish Data Protection Agency (AEPD) [2].',
        cites: [
          { src: 'PRO-RGPD-005', q: 'In legal advice and defence, the firm acts as data controller, bound by professional secrecy. Where a client commissions a service that involves processing data on its behalf, a data processing agreement is signed under Article 28 GDPR.' },
          { src: 'PRO-RGPD-005', q: 'The firm has appointed a Data Protection Officer, notified to the Spanish Data Protection Agency (AEPD).' }
        ]
      },
      {
        id: 'C2', ref: 'BM-PJ §3.3', sec: 'C', topic: 'Security certification and controls', conf: 'alta',
        qEn: 'Is the firm certified under ISO/IEC 27001 or the Spanish National Security Framework (ENS)? State the scope and validity, the result of the last audit, and the main access and encryption controls.',
        en: 'Yes, under ISO/IEC 27001:2022: the certified information security management system supports the legal advice and litigation services provided from our Málaga and Córdoba offices, under certificate no. SGSI-2025-0716, valid until 15 June 2028 [1]. The 2026 surveillance audit, held on 4 June 2026, found no major and 2 minor non-conformities [2]. Access to our systems requires two-factor authentication, and matter permissions are granted per matter and reviewed every six months [3]. Our document repository uses AES-256 encryption at rest and TLS 1.2 or higher in transit [4].',
        cites: [
          { src: 'CERT-ISO-27001', q: 'Information security management system supporting the legal advice and litigation services provided from the Málaga and Córdoba offices. Certificate no. SGSI-2025-0716, valid until 15/06/2028.' },
          { src: 'CERT-ISO-27001', q: '2026 surveillance audit held on 04/06/2026: no major non-conformities and 2 minor non-conformities.' },
          { src: 'POL-SEG-006', q: 'Access to the firm’s systems requires two-factor authentication. Matter permissions are granted per matter and reviewed every six months.' },
          { src: 'IMAN-SEC', q: 'AES-256 encryption at rest and TLS 1.2 or higher in transit.' }
        ]
      },
      {
        id: 'C3', ref: 'BM-PJ §3.5', sec: 'C', topic: 'Subcontracting and data location', conf: 'alta',
        qEn: 'Does the firm use subcontractors or technology providers that process client data? How are they approved, and where is client data hosted?',
        en: 'Technology providers that process client data are approved before they are engaged, sign a data processing agreement and host the data in the European Union [1]. Our document repository is hosted in data centres in Frankfurt and Amsterdam (EU) [2]. Backups are taken daily and replicated to a second data centre in the EU [3].',
        cites: [
          { src: 'POL-SEG-006', q: 'Technology providers that process client data are approved before they are engaged, sign a data processing agreement and host the data in the European Union.' },
          { src: 'IMAN-SEC', q: 'Hosting: data centres in Frankfurt and Amsterdam (EU).' },
          { src: 'POL-SEG-006', q: 'Backups are taken daily and replicated to a second data centre in the EU.' }
        ]
      },
      {
        id: 'D1', ref: 'BM-PJ §4.1', sec: 'D', topic: 'Conflicts of interest', conf: 'alta',
        qEn: 'Describe how the firm identifies and manages conflicts of interest before accepting an engagement, including information barriers. How many conflicts were detected last year and how were they resolved?',
        en: 'Our policy applies Article 12 of the Spanish Code of Professional Conduct for Lawyers and the General Statute of the Spanish Legal Profession [1]. Before accepting an engagement, the client, the opposing party and their group companies are checked in our matter management system against all the firm’s matters of the last ten years, and no engagement is accepted without a signed conflict check [2]. If there is a conflict, the engagement is declined or, where the rules allow, accepted with the informed written consent of the affected clients [3]. In 2025 we ran 1,146 conflict checks and detected 23 conflicts: 9 engagements were declined and 14 were accepted with informed written consent and an information barrier [4].',
        cites: [
          { src: 'POL-CON-002', q: 'The policy applies Article 12 of the Spanish Code of Professional Conduct for Lawyers' },
          { src: 'POL-CON-002', q: 'Before accepting an engagement, the client, the opposing party and their group companies are checked in the matter management system against all the firm’s matters of the last ten years. No engagement is accepted without a signed conflict check.' },
          { src: 'POL-CON-002', q: 'If there is a conflict, the engagement is declined or, where the rules allow, accepted with the informed written consent of the affected clients.' },
          { src: 'GEX-CONF', q: 'Conflict checks run in 2025: 1,146; conflicts detected: 23; engagements declined due to conflict: 9; engagements accepted with informed written consent and an information barrier: 14.' }
        ],
        note: {
          tone: 'warn', icon: 'alert-triangle', title: 'Today’s LexNET notification · PO 1184/2026',
          text: 'At 08:12 a claim in ordinary proceedings against Aceites Sierra Subbética, S.L. arrived via LexNET (Court of First Instance no. 7 of Málaga). The firm advised the claimant in 2025: a possible conflict under Article 12 of the Code of Professional Conduct (matter PRC-2026-0412). The answer describes the policy, not today’s case.',
          outcome: 'alarma', tone_done: 'brand', with: { approved: 'In the alarm: {label}.', any: 'In the alarm, the agent’s proposal was rejected.' },
          without: 'The decision on accepting the engagement is taken in the alarm scene.',
          go: 'alarma', goLabel: 'Open the alarm'
        }
      },
      {
        id: 'D2', ref: 'BM-PJ §4.2', sec: 'D', topic: 'Procedural deadline control', conf: 'alta',
        qEn: 'How does the firm receive court notifications and control procedural deadlines? Describe the controls in place and the results of the last year.',
        en: 'LexNET notifications are reviewed every working day before 10:00 and assigned to the matter and the responsible lawyer on the same day [1]. Deadlines are counted in working days under Articles 133 to 136 of the Spanish Civil Procedure Act (LEC), with August excluded and the public holidays of the court’s seat [2]. Each deadline is calculated by a member of the litigation secretariat and validated by the responsible lawyer, and the matter management system sends reminders 10, 5 and 2 days before it expires [3]. In 2025 we recorded 4,812 procedural deadlines, all double-checked, with no deadline missed [4].',
        cites: [
          { src: 'PRO-PLZ-001', q: 'LexNET notifications are reviewed every working day before 10:00 and assigned to the matter and the responsible lawyer on the same day.' },
          { src: 'PRO-PLZ-001', q: 'Deadlines are counted in working days under Articles 133 to 136 of the Spanish Civil Procedure Act (LEC), with August excluded and the public holidays of the court’s seat.' },
          { src: 'PRO-PLZ-001', q: 'Each deadline is calculated by a member of the litigation secretariat and validated by the responsible lawyer; the matter management system sends reminders 10, 5 and 2 days before it expires.' },
          { src: 'GEX-PLZ', q: 'Procedural deadlines recorded: 4,812, all double-checked; deadlines missed: 0.' }
        ]
      },
      {
        id: 'D3', ref: 'BM-PJ §4.4', sec: 'D', topic: 'Business continuity and data breaches', conf: 'media',
        qEn: 'Describe the firm’s business continuity arrangements and its procedure for personal data breaches. Provide the date and outcome of the last data breach drill.',
        en: 'Our objectives are to recover critical systems (LexNET, Gestor de expedientes and iManage) within 4 hours with a maximum data loss of 24 hours, and the continuity plan is tested once a year [1]. Every breach is logged and assessed within 24 hours; where it poses a risk to data subjects’ rights it is notified to the AEPD within 72 hours (Article 33 GDPR) and, if the risk is high, to the data subjects (Article 34) [2]. At least one data breach drill is carried out every year [3].',
        cites: [
          { src: 'POL-SEG-006', q: 'Objectives: recover critical systems (LexNET, Gestor de expedientes and iManage) within 4 hours, with a maximum data loss of 24 hours. The continuity plan is tested once a year.' },
          { src: 'PRO-RGPD-005', q: 'Every breach is logged and assessed within 24 hours; where it poses a risk to data subjects’ rights it is notified to the AEPD within 72 hours (Article 33 GDPR) and, if the risk is high, to the data subjects (Article 34).' },
          { src: 'PRO-RGPD-005', q: 'At least one data breach drill is carried out every year.' }
        ],
        gap: 'The bank asks for the date and outcome of the last data breach drill, and they are not in the indexed sources.',
        gapGo: 'retirada', gapGoLabel: 'Run the RGPD-2609-03 drill', gapOutcome: 'retirada',
        gapOutcomeText: 'There is already a drill on matter RGPD-2609-03 in this session: {label}. Add it to the answer if appropriate.'
      },
      {
        id: 'E1', ref: 'BM-PJ §5.1', sec: 'E', topic: 'Fees and engagement letter', conf: 'alta',
        qEn: 'Describe the firm’s fee arrangements, how fees are agreed with the client and the level of detail in invoices. Is every matter covered by a signed engagement letter?',
        en: 'Every matter starts with a signed engagement letter setting out the scope, the team, the fees or how they are calculated, and the advance on costs [1]. Fees are agreed as hourly rates by professional category, as a fixed fee or by procedural stage, and rates are reviewed once a year [2]. Invoices itemise the work done and, for hourly billing, the hours recorded by each professional; if the budget is expected to be exceeded, the client is informed before work continues [3]. In 2025 we signed 312 engagement letters electronically, and 100% of invoiced matters had a signed engagement letter [4].',
        cites: [
          { src: 'POL-HON-004', q: 'Every matter starts with a signed engagement letter setting out the scope, the team, the fees or how they are calculated, and the advance on costs.' },
          { src: 'POL-HON-004', q: 'Fees are agreed as hourly rates by professional category, as a fixed fee or by procedural stage; rates are reviewed once a year.' },
          { src: 'POL-HON-004', q: 'Invoices itemise the work done and, for hourly billing, the hours recorded by each professional. If the budget is expected to be exceeded, the client is informed before work continues.' },
          { src: 'SIG-ENC', q: 'Engagement letters signed electronically in 2025: 312; invoiced matters with a signed engagement letter: 100%.' }
        ]
      },
      {
        id: 'E2', ref: 'BM-PJ §5.3', sec: 'E', topic: 'Use of generative AI with client data', conf: 'media',
        qEn: 'Does the firm use generative AI tools with client data? Describe the controls, confirm where data is processed and whether it is used to train models, and list the tools authorised.',
        en: 'Only generative AI tools authorised by the firm may be used with client data, with the data hosted in the EU and never used to train third-party models [1]. No document, report or communication generated with AI is sent to a client or a court without review and signature by the responsible lawyer [2]. Entering client data into public AI tools or personal accounts is prohibited [3].',
        cites: [
          { src: 'POL-IA-007', q: 'Only generative AI tools authorised by the firm may be used with client data, with the data hosted in the EU and never used to train third-party models.' },
          { src: 'POL-IA-007', q: 'No document, report or communication generated with AI is sent to a client or a court without review and signature by the responsible lawyer.' },
          { src: 'POL-IA-007', q: 'Entering client data into public AI tools or personal accounts is prohibited.' }
        ],
        gap: 'The bank asks for the list of authorised tools: the policy does not include it, and the AI tool inventory and its impact assessment are not in the indexed sources.'
      },
      {
        id: 'E3', ref: 'BM-PJ · additional', sec: 'E', topic: 'Claims and disciplinary proceedings', conf: 'none',
        qEn: 'In the last five years, has the firm or any of its lawyers been subject to a professional liability claim, a disciplinary proceeding by a Bar association or a regulatory sanction?',
        flag: {
          reason: 'None of the {doc_count} indexed documents records professional liability claims, Bar disciplinary proceedings or sanctions.',
          context: 'This is the question that weighs most in the onboarding. A “No” without evidence would be a false statement if any claim or proceeding existed: the Managing Partner confirms it with the insurance broker and the Bar associations.',
          partial: [],
          missing: ['List of claims notified under the professional indemnity policy in the last five years and their status', 'Disciplinary proceedings of the Málaga and Córdoba Bar associations, if any', 'Confirmation signed by the Managing Partner']
        }
      }
    ]
  }
});
