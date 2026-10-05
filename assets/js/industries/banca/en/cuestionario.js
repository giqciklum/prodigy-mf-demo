/* Banco Cierzo · Wolfsberg CBDDQ v1.4 requested by Nordbank AG (correspondent bank), English. Fictitious entities; synthetic data (MFM). */
agenticPackEn('banca', {
  cuestionario: {
    agent: 'Customer questionnaires',
    lang: 'en',
    default_sel: 'D1',
    reviewer: 'Head of Regulatory Compliance',
    assignee: 'Compliance AML/CFT Unit',
    assignee_short: 'the AML/CFT Unit',
    team: 'Compliance',
    assign_due: '2026-10-08',
    responder: 'Banco Cierzo, S.A.',
    site: 'Banco Cierzo, S.A. · head office (Madrid)',
    site_label: 'Entity',
    page_title: 'Wolfsberg CBDDQ · Nordbank AG',
    report_title: 'Response to the Wolfsberg CBDDQ',
    ref_label: 'CBDDQ section',
    scope_meta_label: 'Relationship',
    discard_placeholder: 'For example: answered with the attached external expert report',
    save_system: 'GRC Archer',
    qn: {
      code: 'CUE-2026-033',
      title: 'Wolfsberg Correspondent Banking Due Diligence Questionnaire (CBDDQ) v1.4',
      customer: 'Nordbank AG',
      via: 'Nordbank AG · Correspondent Banking KYC',
      received: '2026-09-28T09:15',
      due: '2026-10-14',
      file: 'Wolfsberg_CBDDQ_v1.4_Banco_Cierzo_2026.xlsx',
      scope: 'periodic review of the EUR and USD correspondent banking relationship (Banco Cierzo’s loro account with Nordbank AG)',
      scope_short: 'EUR and USD correspondent banking · periodic review',
      scope_label: 'renewal of the correspondent banking relationship'
    },
    email: {
      mailbox: 'Compliance mailbox',
      headers: {
        From: 'Correspondent Banking KYC, Nordbank AG <cb-kyc@nordbank.example>',
        To: 'Regulatory Compliance, Banco Cierzo <cumplimiento@bancocierzo.example>',
        Date: 'Mon, 28 Sep 2026 09:15 (CET)',
        Subject: 'Periodic KYC review - Wolfsberg CBDDQ v1.4 - response due 14 October 2026'
      },
      text: 'Dear colleagues,\n\nAs part of the periodic KYC review of our correspondent banking relationship (EUR and USD accounts held by Banco Cierzo with Nordbank AG), please complete the attached Wolfsberg CBDDQ v1.4.\n\nFor this cycle we have selected 15 questions from the CBDDQ in five areas: entity, ownership and products; AML, CTF and sanctions programme; KYC, CDD and EDD; monitoring, sanctions and payment transparency; and training, audit and regulatory matters.\n\nPlease answer in English, reference the supporting policy or record for each answer, and have the questionnaire signed off by your Compliance Officer. We need the completed questionnaire by Wednesday 14 October 2026; otherwise the relationship will be escalated for review.\n\nKind regards,\n\nCorrespondent Banking KYC\nNordbank AG',
      highlights: [
        { text: 'Wolfsberg CBDDQ v1.4', label: 'Questionnaire', tone: 'brand' },
        { text: '15 questions', label: 'Questions', tone: 'brand' },
        { text: 'reference the supporting policy or record for each answer', label: 'Requirement' },
        { text: 'signed off by your Compliance Officer', label: 'Sign-off' },
        { text: 'Wednesday 14 October 2026', label: 'Deadline' }
      ]
    },
    sections: [
      { id: 'A', en: 'Entity, ownership and products' },
      { id: 'B', en: 'AML, CTF and sanctions programme' },
      { id: 'C', en: 'KYC, CDD and EDD' },
      { id: 'D', en: 'Monitoring, sanctions and payment transparency' },
      { id: 'E', en: 'Training, audit and regulatory matters' }
    ],
    kpi: { label: 'Reports to SEPBLAC in 2025', value: 214, sub: '18,420 AML/CFT alerts reviewed · 1,120 special examinations', icon: 'shield-check' },
    sources_sub: 'AML/CFT manual, policies, risk assessment and annual accounts',
    identify_result: 'Nordbank AG · EUR and USD correspondent banking · 15 questions from the CBDDQ v1.4',
    search_scope: 'AML/CFT manual, sanctions, payments and fraud policies, risk assessment and annual accounts',
    lookups: [
      { system: 'Core bancario T24', action: 'Checks the customer risk distribution, PEPs and sanctions screening', result: 'High risk 1.7% · 412 approved PEPs · 1.9 million transfers screened in 2025', ms: 560 },
      { system: 'GRC Archer', action: 'Reads alerts, suspicious activity reports, training and audit findings', result: '214 reports to SEPBLAC · training 97.8% · report AI-2025-14', ms: 520 },
      { system: 'Falcon Fraud', action: 'Reads the card fraud monitoring configuration', result: '1,284 active rules · each transaction scored in under 100 ms', ms: 340 },
      { system: 'Redsys', action: 'Cross-checks the fraud question with open cases', result: 'Case CPP-2609-07 open: common point of compromise at a POS terminal', ms: 300, tone: 'warn' },
      { system: 'Falcon Fraud', action: 'Cross-checks the monitoring question with today’s alerts', result: 'BIN 454812: 2.9% CNP fraud since 02:10 · 186 transactions', ms: 280, tone: 'warn' }
    ],
    compare: {
      people: '3–4: Compliance, Internal Audit, Payments and, depending on the question, Legal',
      systems: '7–9: email, the correspondent’s Excel file, AML/CFT manual, T24, Archer, Falcon, annual accounts and external expert reports',
      steps: 'Find the evidence for each question, copy last year’s CBDDQ and update the figures, ask other areas for data and translate into English',
      time: '1–2 days of Compliance work, spread over a week'
    },
    presenter: {
      before: [
        'Every correspondent asks for the Wolfsberg CBDDQ at its periodic review. If it is not delivered on time, the relationship is escalated and may end up being closed: this is Compliance work that cannot slip.',
        'This one comes from Nordbank AG: {total} questions on ownership, the AML/CFT programme, due diligence, sanctions and audit.',
        'When you press the button, Agentic Platform searches the AML/CFT manual, the policies, the risk assessment and the annual accounts, plus the records in T24, Archer, Falcon and Redsys, and drafts each answer with its source.'
      ],
      during: [
        '{drafted} of {total} have a cited draft; every citation is checked against the source text. {flagged} are left unanswered: virtual assets, anti-bribery and corruption, and regulatory enforcement history. No document, nothing invented.',
        'D1: besides answering, it flags the fraud spike on BIN 454812 overnight. The answer describes the programme, not the incident, but whoever signs needs to know.',
        'D3: the correspondent asks for the result of the last exercise for a common point of compromise; the drill for case CPP-2609-07 produces it in this same demo.',
        'Nothing goes out without Compliance sign-off: bulk approval only for high-confidence answers; medium-confidence ones are reviewed one by one.'
      ],
      next_during: 'Show D1 (citations and alarm warning) and E3 (no evidence). Then “Approve the {alta} high-confidence answers”, approve {media_ids} one by one and “Assign the {flagged} without a source”.'
    },
    sources: {
      'MAN-PBC-001': {
        type: 'doc', kind: 'Manual', code: 'MAN-PBC-001', title: 'Anti-money laundering and counter-terrorist financing manual', system: 'Procedimientos', version: '12', date: '2026-03-24', owner: 'Head of Regulatory Compliance',
        org: 'Banco Cierzo · Compliance',
        sections: [
          { id: '2', heading: '2. Regulatory framework', page: 3, text: 'The manual implements Law 10/2010 on the prevention of money laundering and terrorist financing (Spanish AML/CFT Act) and its implementing Regulation, approved by Royal Decree 304/2014.' },
          { id: '3', heading: '3. Organisation', page: 5, text: 'The Internal Control Body (OCI) meets monthly. The representative before SEPBLAC is the Head of Regulatory Compliance, with direct access to the Board of Directors.' },
          { id: '4', heading: '4. Prohibitions', page: 7, text: 'Relationships with shell banks, and with institutions that allow shell banks to use their accounts, are prohibited.' },
          { id: '5', heading: '5. Due diligence', page: 9, text: 'Every customer is risk-rated (low, medium or high) at onboarding and at each review. High-risk customers are subject to enhanced due diligence: source of funds and source of wealth, senior management approval and an annual review.\n\nPeriodic review: annual for high risk, every three years for medium risk and every five years for low risk.' },
          { id: '6', heading: '6. Politically exposed persons', page: 12, text: 'Customers are screened against PEP lists at onboarding and nightly thereafter. Opening or maintaining a PEP relationship requires approval by the Head of Regulatory Compliance and evidence of source of wealth.' },
          { id: '7', heading: '7. Beneficial ownership', page: 14, text: 'Every natural person who owns or controls more than 25% of the capital or voting rights is identified; where there is none, the senior managing official is identified. The information is checked against the Spanish Central Register of Beneficial Ownership.' },
          { id: '8', heading: '8. Monitoring and reporting', page: 17, text: 'Transaction monitoring combines automated scenarios in the core banking system with analyst review of alerts. Suspicious transactions are reported to SEPBLAC without delay.' },
          { id: '9', heading: '9. Record keeping', page: 19, text: 'Customer due diligence and transaction records are retained for 10 years.' },
          { id: '11', heading: '11. Training', page: 22, text: 'AML/CTF training is mandatory every year for all staff, with specific modules for the branch network, operations and Compliance.' },
          { id: '12', heading: '12. Independent review', page: 24, text: 'Internal Audit reviews the programme every year. An external expert issues a full report every three years and follow-up reports in the intervening years (Article 28 of Law 10/2010).' }
        ]
      },
      'POL-SAN-002': {
        type: 'doc', kind: 'Policy', code: 'POL-SAN-002', title: 'International financial sanctions policy', system: 'Procedimientos', version: '6', date: '2025-12-15', owner: 'Head of Regulatory Compliance',
        sections: [
          { id: '2', heading: '2. Regimes applied', page: 2, text: 'EU and UN sanctions are applied and, as a matter of internal policy, OFAC (US) and OFSI (UK) sanctions.' },
          { id: '4', heading: '4. Screening', page: 3, text: 'Customers and payments are screened in real time; potential matches are reviewed before the payment is released. List updates are applied within 24 hours of publication.' },
          { id: '5', heading: '5. Proliferation financing', page: 4, text: 'Screening also covers persons and entities designated for financing the proliferation of weapons of mass destruction.' }
        ]
      },
      'PR-PAG-004': {
        type: 'doc', kind: 'Procedure', code: 'PR-PAG-004', title: 'Payment transparency and information accompanying transfers of funds', system: 'Procedimientos', version: '3', date: '2026-01-12', owner: 'Head of Payments',
        sections: [
          { id: '3', heading: '3. Payer and payee information', page: 2, text: 'Transfers include the complete payer and payee information required by Regulation (EU) 2023/1113; incomplete incoming messages are held and the missing information is requested from the payer’s institution.' },
          { id: '4', heading: '4. Format', page: 3, text: 'Cross-border payments are sent via SWIFT in ISO 20022 format (pacs.008).' }
        ]
      },
      'POL-FRA-003': {
        type: 'doc', kind: 'Policy', code: 'POL-FRA-003', title: 'Card fraud prevention', system: 'Procedimientos', owner: 'Head of Fraud Prevention',
        sections: [
          { id: '3', heading: '3. Monitoring', page: 2, text: 'Card transactions are monitored 24x7 in Falcon Fraud using rules and transaction scoring models.' },
          { id: '6', heading: '6. Common point of compromise', page: 5, text: 'When a common point of compromise is identified, exposed cards are blocked pre-emptively and reissued, and customers and the Visa and Mastercard networks are notified.' }
        ]
      },
      'EBR-2025': {
        type: 'doc', kind: 'Report', code: 'EBR-2025', title: '2025 AML/CFT enterprise-wide risk assessment', system: 'Procedimientos', date: '2026-03-24', owner: 'Head of Regulatory Compliance',
        sections: [
          { id: '2', heading: '2. Methodology', page: 3, text: 'Inherent risk by customers, products, delivery channels and geographies; effectiveness of controls; residual risk.' },
          { id: '3', heading: '3. Scope', page: 4, text: 'It covers sanctions and proliferation financing risk.' },
          { id: '7', heading: '7. Conclusion', page: 21, text: 'Overall residual risk: medium-low. Approved by the Board of Directors on 24/03/2026.' }
        ]
      },
      'CCAA-2025': {
        type: 'doc', kind: 'Annual accounts', code: null, label: '2025 annual accounts', title: '2025 annual accounts and management report', system: 'Procedimientos', date: '2026-04-28',
        org: 'Banco Cierzo, S.A. · accounts prepared by the Board and audited',
        sections: [
          { id: '1', heading: '1. Nature of the entity', page: 12, text: 'Banco Cierzo, S.A. is a Spanish credit institution registered with the Bank of Spain under code 0239, LEI 9598003HQ0CIERZ0B27. Its shares are not publicly traded.' },
          { id: '1b', heading: '1. Supervision', page: 12, text: 'The Entity is supervised by the Bank of Spain and, for anti-money laundering, by SEPBLAC, the Spanish financial intelligence unit.' },
          { id: '19', heading: '19. Equity', page: 58, text: 'Shareholders: Fundación Bancaria Cierzo (62%) and around 3,100 minority shareholders (38%); no natural person owns or controls more than 25%.' }
        ]
      },
      'T24-RISK': {
        type: 'record', kind: 'Customer portfolio', code: 'AML/CFT risk', title: 'Customers by AML/CFT risk level', system: 'Core bancario T24',
        org: 'T24 core banking · customer risk rating',
        sections: [
          { id: 'dist', heading: 'Distribution at 31/08/2026', list: ['Low risk: 78.4% of customers', 'Medium risk: 19.9% of customers', 'High risk: 1.7% of customers', 'Overdue high-risk periodic reviews: 0'] },
          { id: 'pep', heading: 'PEPs', text: 'Active PEP customers: 412, all with Compliance approval on record.' }
        ]
      },
      'T24-SAN': {
        type: 'record', kind: 'Sanctions screening', code: 'Screening 2025', title: 'Sanctions screening · lists and activity', system: 'Core bancario T24',
        org: 'T24 core banking · customer and payment screening',
        sections: [
          { id: 'listas', heading: 'Lists loaded', text: 'EU (consolidated list, updated on 28/09/2026), UN, OFAC SDN and OFSI.' },
          { id: 'act', heading: '2025 activity', text: 'Transfers screened in 2025: 1.9 million; 3,204 potential matches reviewed and 7 payments blocked and reported.' }
        ]
      },
      'ARCHER-AML': {
        type: 'record', kind: 'AML/CFT cases', code: 'AML/CFT 2025', title: 'Alerts, special examinations and reports', system: 'GRC Archer',
        org: 'GRC Archer · Compliance case management',
        sections: [
          { id: 'alert', heading: '2025 activity', text: 'AML/CFT monitoring alerts in 2025: 18,420; 1,120 escalated to special examination and 214 suspicious activity reports filed with SEPBLAC.' }
        ]
      },
      'ARCHER-AUD': {
        type: 'record', kind: 'Audit findings', code: 'AI-2025-14', title: 'Independent review of the AML/CFT programme', system: 'GRC Archer',
        org: 'GRC Archer · audit and recommendations',
        sections: [
          { id: 'ai', heading: 'Internal audit', text: 'Internal Audit report AI-2025-14 on the AML/CFT programme, issued on 12/12/2025: 4 medium-priority recommendations.' },
          { id: 'ee', heading: 'External expert', text: 'External expert follow-up report for 2025, issued on 30/04/2026.' }
        ]
      },
      'ARCHER-FORM': {
        type: 'record', kind: 'Training', code: 'Training 2025', title: 'AML/CFT training · plan completion', system: 'GRC Archer',
        org: 'GRC Archer · mandatory training',
        sections: [
          { id: 'f', heading: '2025 plan', text: 'AML/CFT training 2025: 2,946 of 3,012 employees (97.8%); the remainder are on long-term leave or are new joiners still within their deadline.' }
        ]
      },
      'FALCON': {
        type: 'record', kind: 'Configuration', code: 'Falcon · cards', title: 'Card fraud monitoring · configuration', system: 'Falcon Fraud',
        org: 'Falcon Fraud · rules and models',
        sections: [
          { id: 'cfg', heading: 'Current configuration', text: 'Active rules: 1,284. Every card transaction is scored in under 100 ms before authorisation.' }
        ]
      }
    },
    questions: [
      {
        id: 'A1', ref: 'CBDDQ §1', sec: 'A', topic: 'Entity and ownership', conf: 'alta',
        qEn: 'Provide the full legal name, LEI and registration of the Entity. Is the Entity publicly traded? List any shareholder owning 25% or more and the ultimate beneficial owners.',
        en: 'Banco Cierzo, S.A. is a Spanish credit institution registered with the Bank of Spain under code 0239, LEI 9598003HQ0CIERZ0B27; its shares are not publicly traded [1]. Its shareholders are Fundación Bancaria Cierzo (62%) and around 3,100 minority shareholders (38%); no natural person owns or controls more than 25% [2].',
        cites: [
          { src: 'CCAA-2025', q: 'Banco Cierzo, S.A. is a Spanish credit institution registered with the Bank of Spain under code 0239, LEI 9598003HQ0CIERZ0B27. Its shares are not publicly traded.' },
          { src: 'CCAA-2025', q: 'Shareholders: Fundación Bancaria Cierzo (62%) and around 3,100 minority shareholders (38%); no natural person owns or controls more than 25%.' }
        ]
      },
      {
        id: 'A2', ref: 'CBDDQ §1', sec: 'A', topic: 'Supervision and regulatory framework', conf: 'alta',
        qEn: 'Name the Entity\'s prudential and AML/CTF regulators and the AML/CTF laws and regulations it is subject to.',
        en: 'The Entity is supervised by the Bank of Spain and, for anti-money laundering, by SEPBLAC, the Spanish financial intelligence unit [1]. Our AML/CTF programme implements Law 10/2010 on the prevention of money laundering and terrorist financing and its implementing Regulation, Royal Decree 304/2014 [2].',
        cites: [
          { src: 'CCAA-2025', q: 'The Entity is supervised by the Bank of Spain and, for anti-money laundering, by SEPBLAC, the Spanish financial intelligence unit.' },
          { src: 'MAN-PBC-001', q: 'The manual implements Law 10/2010 on the prevention of money laundering and terrorist financing (Spanish AML/CFT Act) and its implementing Regulation, approved by Royal Decree 304/2014.' }
        ]
      },
      {
        id: 'A3', ref: 'CBDDQ §2', sec: 'A', topic: 'Virtual assets and higher-risk products', conf: 'none',
        qEn: 'Does the Entity offer services to virtual asset service providers (VASPs) or hold or transact in virtual assets? If so, describe the controls applied.',
        flag: {
          reason: 'None of the {doc_count} indexed documents deals with virtual assets or relationships with crypto-asset service providers.',
          context: 'Since Regulation (EU) 2023/1114 (MiCA) and Regulation (EU) 2023/1113, correspondents always ask about VASPs. Agentic Platform does not answer “No” because documents are missing: Compliance has to confirm it with the Business.',
          partial: [],
          missing: ['Policy on customers that are crypto-asset service providers (CASP/VASP)', 'Confirmation of whether the Entity holds or transacts in virtual assets', 'Enhanced controls applied, if any']
        }
      },
      {
        id: 'B1', ref: 'CBDDQ §3', sec: 'B', topic: 'AML/CFT programme and officer', conf: 'alta',
        qEn: 'Does the Entity have a board-approved AML, CTF and sanctions programme? Describe its governance, including the appointed AML compliance officer, and confirm that the Entity does not deal with shell banks.',
        en: 'Yes. Our AML/CTF manual implements Spanish AML law [1]. The Internal Control Body (OCI) meets monthly, and the Head of Regulatory Compliance is the designated representative before SEPBLAC, with direct access to the Board of Directors [2]. Relationships with shell banks, and with institutions that allow shell banks to use their accounts, are prohibited [3]. Customer due diligence and transaction records are retained for 10 years [4].',
        cites: [
          { src: 'MAN-PBC-001', q: 'The manual implements Law 10/2010' },
          { src: 'MAN-PBC-001', q: 'The Internal Control Body (OCI) meets monthly. The representative before SEPBLAC is the Head of Regulatory Compliance, with direct access to the Board of Directors.' },
          { src: 'MAN-PBC-001', q: 'Relationships with shell banks, and with institutions that allow shell banks to use their accounts, are prohibited.' },
          { src: 'MAN-PBC-001', q: 'Customer due diligence and transaction records are retained for 10 years.' }
        ]
      },
      {
        id: 'B2', ref: 'CBDDQ §6', sec: 'B', topic: 'Enterprise-wide risk assessment', conf: 'alta',
        qEn: 'Has the Entity completed an enterprise-wide AML, CTF and sanctions risk assessment in the last 12 months? Describe its scope and methodology and state when it was approved.',
        en: 'Yes. The 2025 risk assessment measures inherent risk by customers, products, delivery channels and geographies, the effectiveness of controls and residual risk [1]. It covers sanctions and proliferation financing risk [2]. Overall residual risk was rated medium-low, and the assessment was approved by the Board of Directors on 24 March 2026 [3].',
        cites: [
          { src: 'EBR-2025', q: 'Inherent risk by customers, products, delivery channels and geographies; effectiveness of controls; residual risk.' },
          { src: 'EBR-2025', q: 'It covers sanctions and proliferation financing risk.' },
          { src: 'EBR-2025', q: 'Overall residual risk: medium-low. Approved by the Board of Directors on 24/03/2026.' }
        ]
      },
      {
        id: 'B3', ref: 'CBDDQ §4', sec: 'B', topic: 'Anti-bribery and corruption', conf: 'none',
        qEn: 'Does the Entity have a documented anti-bribery and corruption (ABC) policy and programme, including a risk assessment and training? When was it last reviewed?',
        flag: {
          reason: 'The anti-corruption policy and the criminal compliance model are not among the {doc_count} indexed documents.',
          context: 'Under Article 31 bis of the Spanish Criminal Code, Spanish institutions usually have a crime prevention model covering bribery and private-sector corruption. It should exist within Criminal Compliance; Agentic Platform does not describe its content or assume a review date.',
          partial: [],
          missing: ['Anti-bribery and corruption policy', 'Corruption risk assessment and date of the last review', 'Specific training and its coverage']
        }
      },
      {
        id: 'C1', ref: 'CBDDQ §7', sec: 'C', topic: 'Due diligence and EDD', conf: 'alta',
        qEn: 'Does the Entity risk-rate all customers? Describe the enhanced due diligence applied to high-risk customers and the periodic review frequency for each risk level.',
        en: 'Yes. Every customer is risk-rated (low, medium or high) at onboarding and at each review; high-risk customers are subject to enhanced due diligence, including source of funds and source of wealth, senior management approval and an annual review [1]. Periodic reviews are annual for high risk, every three years for medium risk and every five years for low risk [2]. At 31 August 2026, 1.7% of customers were rated high risk [3], with no overdue high-risk reviews [4].',
        cites: [
          { src: 'MAN-PBC-001', q: 'High-risk customers are subject to enhanced due diligence: source of funds and source of wealth, senior management approval and an annual review.' },
          { src: 'MAN-PBC-001', q: 'Periodic review: annual for high risk, every three years for medium risk and every five years for low risk.' },
          { src: 'T24-RISK', q: 'High risk: 1.7% of customers' },
          { src: 'T24-RISK', q: 'Overdue high-risk periodic reviews: 0' }
        ]
      },
      {
        id: 'C2', ref: 'CBDDQ §7', sec: 'C', topic: 'Politically exposed persons', conf: 'alta',
        qEn: 'How does the Entity identify politically exposed persons (PEPs), and who approves PEP relationships?',
        en: 'Customers are screened against PEP lists at onboarding and nightly thereafter. Opening or maintaining a PEP relationship requires approval by the Head of Regulatory Compliance and evidence of source of wealth [1]. The Entity currently has 412 active PEP customers, all with Compliance approval on record [2].',
        cites: [
          { src: 'MAN-PBC-001', q: 'Customers are screened against PEP lists at onboarding and nightly thereafter. Opening or maintaining a PEP relationship requires approval by the Head of Regulatory Compliance and evidence of source of wealth.' },
          { src: 'T24-RISK', q: 'Active PEP customers: 412, all with Compliance approval on record.' }
        ]
      },
      {
        id: 'C3', ref: 'CBDDQ §7', sec: 'C', topic: 'Beneficial ownership', conf: 'alta',
        qEn: 'At what ownership threshold does the Entity identify and verify beneficial owners, and how is the information verified?',
        en: 'We identify every natural person who owns or controls more than 25% of the capital or voting rights; where there is none, we identify the senior managing official. The information is checked against the Spanish Central Register of Beneficial Ownership [1].',
        cites: [
          { src: 'MAN-PBC-001', q: 'Every natural person who owns or controls more than 25% of the capital or voting rights is identified; where there is none, the senior managing official is identified. The information is checked against the Spanish Central Register of Beneficial Ownership.' }
        ]
      },
      {
        id: 'D1', ref: 'CBDDQ §8', sec: 'D', topic: 'Transaction monitoring and reporting', conf: 'alta',
        qEn: 'Describe the Entity\'s transaction monitoring (automated and manual) and suspicious activity reporting. Provide the volume of alerts and reports filed in the last year.',
        en: 'Transaction monitoring combines automated scenarios in our core banking system with analyst review of alerts, and suspicious transactions are reported to SEPBLAC without delay [1]. In 2025 we reviewed 18,420 AML alerts, escalated 1,120 to special examination and filed 214 suspicious activity reports with SEPBLAC [2].',
        cites: [
          { src: 'MAN-PBC-001', q: 'Transaction monitoring combines automated scenarios in the core banking system with analyst review of alerts. Suspicious transactions are reported to SEPBLAC without delay.' },
          { src: 'ARCHER-AML', q: 'AML/CFT monitoring alerts in 2025: 18,420; 1,120 escalated to special examination and 214 suspicious activity reports filed with SEPBLAC.' }
        ],
        note: {
          tone: 'warn', icon: 'activity', title: 'Today’s fraud alarm · BIN 454812',
          text: 'Since 02:10 the card-not-present fraud rate on BIN 454812 (Tarjeta Cierzo Débito) has been 2.9% against the usual 0.3%: 186 suspicious transactions totalling 41,230 €. The answer describes the monitoring programme, not today’s incident.',
          outcome: 'alarma', tone_done: 'brand', with: { approved: 'In the alarm: {label}.', any: 'In the alarm, the agent’s proposal was rejected.' },
          without: 'The decision on the pre-emptive block is taken in the alarm scene.',
          go: 'alarma', goLabel: 'Open the alarm'
        }
      },
      {
        id: 'D2', ref: 'CBDDQ §10', sec: 'D', topic: 'Sanctions screening', conf: 'alta',
        qEn: 'Which sanctions lists does the Entity screen against? Are customers and payments screened in real time, and how quickly are list updates applied?',
        en: 'We apply EU and UN sanctions and, as a matter of internal policy, OFAC (US) and OFSI (UK) sanctions [1]. Customers and payments are screened in real time, potential matches are reviewed before the payment is released, and list updates are applied within 24 hours of publication [2]. Screening also covers proliferation financing designations [3]. In 2025 we screened 1.9 million transfers, reviewed 3,204 potential matches and blocked and reported 7 payments [4].',
        cites: [
          { src: 'POL-SAN-002', q: 'EU and UN sanctions are applied and, as a matter of internal policy, OFAC (US) and OFSI (UK) sanctions.' },
          { src: 'POL-SAN-002', q: 'Customers and payments are screened in real time; potential matches are reviewed before the payment is released. List updates are applied within 24 hours of publication.' },
          { src: 'POL-SAN-002', q: 'Screening also covers persons and entities designated for financing the proliferation of weapons of mass destruction.' },
          { src: 'T24-SAN', q: 'Transfers screened in 2025: 1.9 million; 3,204 potential matches reviewed and 7 payments blocked and reported.' }
        ]
      },
      {
        id: 'D3', ref: 'CBDDQ §14', sec: 'D', topic: 'Fraud risk', conf: 'media',
        qEn: 'Does the Entity have policies and controls to detect and respond to fraud, including card compromise events? Provide the date and outcome of the last test of your response.',
        en: 'Yes. Card transactions are monitored 24x7 in our fraud platform using rules and transaction scoring models [1]; 1,284 rules are active and every card transaction is scored in under 100 ms before authorisation [2]. When a common point of compromise is identified, exposed cards are blocked pre-emptively and reissued, and customers and the Visa and Mastercard networks are notified [3].',
        cites: [
          { src: 'POL-FRA-003', q: 'Card transactions are monitored 24x7 in Falcon Fraud using rules and transaction scoring models.' },
          { src: 'FALCON', q: 'Active rules: 1,284. Every card transaction is scored in under 100 ms before authorisation.' },
          { src: 'POL-FRA-003', q: 'When a common point of compromise is identified, exposed cards are blocked pre-emptively and reissued, and customers and the Visa and Mastercard networks are notified.' }
        ],
        gap: 'The correspondent asks for the date and outcome of the last test of the response to a card compromise, and they are not in the indexed sources.',
        gapGo: 'retirada', gapGoLabel: 'Run the CPP-2609-07 drill', gapOutcome: 'retirada',
        gapOutcomeText: 'There is already an exercise on case CPP-2609-07 in this session: {label}. Add it to the answer if appropriate.'
      },
      {
        id: 'E1', ref: 'CBDDQ §11', sec: 'E', topic: 'Training', conf: 'alta',
        qEn: 'Is AML, CTF and sanctions training mandatory for all employees? How often is it delivered, is it tailored by role, and what was the completion rate last year?',
        en: 'Yes. AML/CTF training is mandatory every year for all staff, with specific modules for the branch network, operations and Compliance [1]. In 2025, 2,946 of 3,012 employees (97.8%) completed it; the remainder are on long-term leave or are new joiners still within their deadline [2].',
        cites: [
          { src: 'MAN-PBC-001', q: 'AML/CTF training is mandatory every year for all staff, with specific modules for the branch network, operations and Compliance.' },
          { src: 'ARCHER-FORM', q: 'AML/CFT training 2025: 2,946 of 3,012 employees (97.8%); the remainder are on long-term leave or are new joiners still within their deadline.' }
        ]
      },
      {
        id: 'E2', ref: 'CBDDQ §13', sec: 'E', topic: 'Audit and external expert', conf: 'media',
        qEn: 'Is the AML, CTF and sanctions programme subject to independent testing? Give the date of the last internal audit and external review, and confirm whether any findings remain open.',
        en: 'Yes. Internal Audit reviews the programme every year, and an external expert issues a full report every three years with follow-up reports in the intervening years, as required by Article 28 of Law 10/2010 [1]. The last internal audit report, AI-2025-14, was issued on 12 December 2025 with 4 medium-priority recommendations [2], and the external expert\'s 2025 follow-up report was issued on 30 April 2026 [3].',
        cites: [
          { src: 'MAN-PBC-001', q: 'Internal Audit reviews the programme every year. An external expert issues a full report every three years and follow-up reports in the intervening years (Article 28 of Law 10/2010).' },
          { src: 'ARCHER-AUD', q: 'Internal Audit report AI-2025-14 on the AML/CFT programme, issued on 12/12/2025: 4 medium-priority recommendations.' },
          { src: 'ARCHER-AUD', q: 'External expert follow-up report for 2025, issued on 30/04/2026.' }
        ],
        gap: 'The correspondent asks whether any findings remain open: the status of the 4 recommendations in report AI-2025-14 and the external expert’s conclusions are not in the indexed sources.'
      },
      {
        id: 'E3', ref: 'Nordbank · additional', sec: 'E', topic: 'Regulatory enforcement', conf: 'none',
        qEn: 'In the last five years, has the Entity been subject to any regulatory enforcement action, fine or investigation related to AML, CTF or sanctions?',
        flag: {
          reason: 'None of the {doc_count} indexed documents records enforcement proceedings, regulatory requests or supervisory investigations.',
          context: 'This is the question that weighs most in the correspondent’s assessment. A “No” without evidence would be a false statement if any proceedings existed: Compliance confirms it with Legal.',
          partial: [],
          missing: ['List of SEPBLAC and Bank of Spain requests and proceedings in the last five years', 'Sanctions or fines imposed and their status', 'Confirmation signed by Legal']
        }
      }
    ]
  }
});
