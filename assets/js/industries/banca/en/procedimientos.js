/* Banco Cierzo · procedure Q&A with citations (English). Fictitious documents, consistent with HISTORIAS.md. */
agenticPackEn('banca', {
  procedimientos: {
    section: 'Calidad',
    nav: 'Procedures',
    title: 'Ask the procedures',
    agent: 'Procedures',
    system: 'GRC Archer',
    source: 'GRC Archer · current internal policies',
    indexed_at: '2026-09-29T06:00',
    doc_org: 'Banco Cierzo · Internal policies',
    ui: {
      page_title: 'Internal policy search',
      intro_title: 'Ask about the policies and procedures of the Operations Centre',
      intro_text: 'Fraud, customer service, cards, DORA and AML/CFT. Every sentence of the answer cites the document and the section it comes from. If no indexed document covers it, the search says so and does not answer.',
      placeholder: 'Type a question about the internal policies',
      context_title: 'Applied to the Operations Centre today',
      permission: 'Operations and Compliance · Madrid',
      asker_initials: 'FA',
      asker_role: 'Fraud analyst on shift',
      route_to: 'Compliance'
    },
    report: { title: 'Internal policy search', code_prefix: 'CON-NORM', filename: 'policy-search', scope_label: 'Centre', scope: 'Operations Centre · Madrid' },
    presenter: {
      say: [
        'Search of the bank’s internal policies: the answer comes only from the current policies and procedures in GRC Archer, and every sentence carries its citation to the document and section.',
        'Five documents are indexed: the card fraud policy, customer complaints (SAC), card blocking and reissue, DORA incident reporting and the AML/CFT manual. Here they are synthetic; in the pilot, your own current versions with permissions by area.'
      ],
      say_empty: 'It helps a new analyst act with sound judgement at six in the morning, prepare Banco de España inspections and answer a correspondent bank with the exact reference.',
      say_answered: 'Clicking a citation opens the document with the exact passage highlighted. And the answer is cross-checked with what is happening today: the fraud spike on BIN 454812, Lucía Ferrer’s complaint or case CPP-2609-07.',
      say_none: 'When there is no source it says so and invents nothing: no answer and no citation. If the topic is in a document that is not indexed, it names it (PR-SEG-014) and lets you route the question to Compliance.',
      next_empty: 'Click “When is a preventive fraud rule activated on a BIN?” and then citation 1 to see the highlighted passage.',
      next_answered: 'Type a question with no source, for example “What is the interest rate on the fixed-rate mortgage?”, and click “Ask”.',
      next_done: 'Move on to the next scene with the right arrow.'
    },

    docs: [
      {
        code: 'POL-FRA-003',
        title: 'Card fraud prevention policy',
        short: 'Card fraud prevention',
        type: 'Policy',
        version: '6',
        date: '2026-04-21',
        owner: 'Fraud Prevention',
        summary: 'CNP fraud rate of a BIN above 1 % for more than 30 min: preventive rule in Falcon Fraud (72 h maximum, reviewed every 24 h). Above 2.5 %: critical episode. Approved by the Head of Fraud Prevention.',
        sections: [
          { id: '1', heading: '1. Purpose and scope', text: [
            'Set out how fraud on debit and credit cards issued by Banco Cierzo is detected, contained and resolved, to protect customers and comply with payment services regulations.',
            'Applies to all card transactions authorised by Banco Cierzo through Redsys and the Visa and Mastercard networks, both card-present and card-not-present (CNP).'
          ] },
          { id: '2', heading: '2. Definitions', list: [
            'Fraud rate of a BIN: transactions with a high fraud score in Falcon Fraud or confirmed as fraud, over the total transactions of the BIN, in 30-minute windows.',
            'Card-not-present (CNP) transaction: remote purchase, online or by phone.',
            'Preventive rule: a Falcon Fraud rule that declines, or requests strong authentication for, a segment of transactions for a limited time.',
            'Common point of purchase (CPP): merchant or terminal where a significant number of the defrauded cards were used before the fraud.'
          ] },
          { id: '3', heading: '3. Responsibilities', list: [
            'Head of Fraud Prevention: approves preventive rules and their withdrawal, and decides on mass card reissue.',
            'Fraud analyst on shift: monitors Falcon Fraud alerts, proposes rules and contacts the affected customers.',
            'Head of Payments and Cards: carries out blocks and reissues under PR-TAR-007.',
            'ICT Risk: assesses whether the episode must be reported under PR-DORA-002.'
          ] },
          { id: '4', heading: '4. Action thresholds', text: [
            'CNP fraud rate of a BIN above 1 % for more than 30 min: the fraud analyst on shift proposes a preventive rule in Falcon Fraud for the BIN’s high-risk e-commerce.',
            'Above 2.5 % the episode is critical: in addition to the rule, the Head of Fraud Prevention and ICT Risk are alerted immediately, and reissuing the affected cards is assessed.',
            'The usual rate of a debit BIN is between 0.2 % and 0.4 %; any value above twice its 90-day average is reviewed during the shift.'
          ] },
          { id: '5', heading: '5. Preventive rules', text: [
            'A preventive rule is proposed by the fraud analyst on shift and approved by the Head of Fraud Prevention before it is activated; outside office hours, by the manager on call.',
            'Every preventive rule lasts 72 h at most and is reviewed every 24 h against its false positive rate; if it declines more than 5 % of legitimate transactions, it is adjusted.',
            'Rules are limited to the affected segment (BIN, channel, country or merchant category): an entire BIN is not blocked except in the case of mass card-present fraud.'
          ] },
          { id: '6', heading: '6. Communication with customers', list: [
            'Each card with suspicious transactions receives an SMS and an in-app notification so that the customer can confirm or reject the transactions.',
            'If the customer does not recognise a transaction, the card is blocked and reissued under PR-TAR-007, and the complaint follows PR-SAC-001.',
            'Banco Cierzo never asks for passwords, one-time codes or the card PIN by SMS or by phone, and every notice reminds customers of this.'
          ] },
          { id: '7', heading: '7. Records', list: [
            'Alerts, rules, approvals and results: Falcon Fraud.',
            'Episode case file and decisions: GRC Archer.',
            'Customer contacts: Salesforce FSC.'
          ] },
          { id: '8', heading: '8. References', refs: true, list: [
            'Directive (EU) 2015/2366 (PSD2) and Real Decreto-ley 19/2018 (Spanish Payment Services Act).',
            'Commission Delegated Regulation (EU) 2018/389 on strong customer authentication.',
            'PCI DSS v4.0.1.'
          ] }
        ]
      },
      {
        code: 'PR-SAC-001',
        title: 'Handling customer complaints and claims',
        short: 'Customer complaints',
        type: 'Procedure',
        version: '8',
        date: '2026-02-02',
        owner: 'Customer Service Department (SAC)',
        summary: 'Acknowledgement within 24 h; payment services complaints resolved within 15 business days; unauthorised transaction: provisional refund before the end of the following business day.',
        sections: [
          { id: '1', heading: '1. Purpose and scope', text: [
            'Handle and resolve the complaints and claims of Banco Cierzo customers within the legal deadlines and keep a record of every step. Applies to all channels: branches, digital banking, phone and mail.'
          ] },
          { id: '2', heading: '2. Deadlines', list: [
            'Acknowledgement to the customer: 24 h from receipt.',
            'Complaints about payment services (cards, transfers and direct debits): resolution within 15 business days; in exceptional situations, up to 35 business days, informing the customer of the reason for the delay.',
            'Other complaints and claims: resolution within one month.'
          ] },
          { id: '3', heading: '3. Unauthorised transactions', text: [
            'If the customer does not recognise a card transaction, the amount is provisionally refunded before the end of the business day following notification, unless there are reasonable grounds to suspect fraud by the customer, which are reported in writing to the Banco de España.',
            'The customer is liable for a maximum of 50 € of the losses prior to notification, except in the case of fraud or gross negligence on their part; they are not liable for anything if the transaction did not require strong authentication.',
            'The customer has 13 months from the debit date to report an unauthorised transaction.',
            'The investigation reviews the authentication used (3-D Secure, contactless or PIN), the device and IP address, the card history and whether the merchant is linked to a common point of purchase.'
          ] },
          { id: '4', heading: '4. Chargeback', text: [
            'If the transaction was made at a merchant of another institution, Payments and Cards initiates the chargeback through the Visa or Mastercard network within the network’s deadline, without this delaying the refund to the customer.'
          ] },
          { id: '5', heading: '5. Resolution and response', text: [
            'The response is in writing, reasoned and in plain language; if it is unfavourable, it informs the customer of the right to complain to the Banco de España Complaints Service.',
            'It is approved by the head of the SAC before it is sent.'
          ] },
          { id: '6', heading: '6. Records', list: [
            'Case in Salesforce FSC with the dates of receipt, acknowledgement, provisional refund and response.',
            'Annual SAC report to the Board of Directors.'
          ] },
          { id: '7', heading: '7. References', refs: true, list: [
            'Orden ECO/734/2004 (Spanish order on customer service departments and services).',
            'Orden ECE/1263/2019 (Spanish order on transparency and information for payment services).',
            'Real Decreto-ley 19/2018, articles 43 to 46.'
          ] }
        ]
      },
      {
        code: 'PR-TAR-007',
        title: 'Card blocking and reissue',
        short: 'Blocking and reissue',
        type: 'Procedure',
        version: '4',
        date: '2026-03-10',
        owner: 'Payments and Cards',
        summary: 'Temporary, permanent or channel block; reissue with new PAN, expiry date and CVV. For a common point of purchase, enhanced monitoring the same day and reissue within 10 business days.',
        sections: [
          { id: '1', heading: '1. Purpose and scope', text: [
            'Block and replace compromised or defrauded cards with the least impact on the customer. Applies to all Banco Cierzo debit, credit and prepaid cards.'
          ] },
          { id: '2', heading: '2. Types of block', list: [
            'Temporary block: activated by the customer from the app or by the bank in case of suspicion; it can be undone.',
            'Permanent block: defrauded, stolen or compromised card; it cannot be undone and requires reissue.',
            'Channel block: declines only e-commerce, use abroad or ATM withdrawals.'
          ] },
          { id: '3', heading: '3. Individual reissue', text: [
            'The new card has a different number (PAN), expiry date and CVV; it is sent to the customer’s address within 5 business days and the digital card is available in the app the same day.',
            'Direct debits and subscriptions charged to the card are updated through the Visa and Mastercard updater services when the merchant participates.'
          ] },
          { id: '4', heading: '4. Mass compromise (CPP)', text: [
            'For a common point of purchase:'
          ], list: [
            'Fraud identifies the cards used at the merchant or terminal during the compromise window (Redsys and Core bancario T24).',
            'Banco Cierzo cards are placed under enhanced monitoring in Falcon Fraud the same day and reissued within a maximum of 10 business days, starting with those that already have suspicious transactions.',
            'Cards from other issuers are reported to the Visa and Mastercard networks so that they can alert their issuers.',
            'The compromise is notified to the merchant’s acquiring bank so that it can initiate the forensic investigation under PR-SEG-014 (Management of PCI DSS card data compromises).'
          ] },
          { id: '5', heading: '5. Communication to the customer', list: [
            'SMS and in-app notification on the day of the block, with the reason and the expected date of the new card.',
            'Reissue due to compromise or fraud is free of charge for the customer.'
          ] },
          { id: '6', heading: '6. Records', list: [
            'Blocks and reissues: Core bancario T24, with the reason and the fraud case reference.',
            'Communications to the networks: Redsys, with acknowledgement from Visa and Mastercard.'
          ] }
        ]
      },
      {
        code: 'PR-DORA-002',
        title: 'Classification and reporting of major ICT-related incidents',
        short: 'Incident reporting (DORA)',
        type: 'Procedure',
        version: '2',
        date: '2025-12-18',
        owner: 'ICT Risk',
        summary: 'Initial notification to the Banco de España within 4 h of classification as major (no later than 24 h after becoming aware), intermediate report within 72 h and final report within one month.',
        sections: [
          { id: '1', heading: '1. Purpose and scope', text: [
            'Classify ICT-related incidents and report major ones to the Banco de España within the deadlines of Regulation (EU) 2022/2554 (DORA).',
            'Also applies to payment-related operational or security incidents affecting Banco Cierzo’s payment services.'
          ] },
          { id: '2', heading: '2. Classification', text: [
            'An incident is major when it affects critical services and meets the criteria of Commission Delegated Regulation (EU) 2024/1772: clients and counterparts affected, duration, geographical spread, data losses, criticality of services and economic impact.',
            'Incidents involving malicious unauthorised access to network and information systems are always treated as candidates for major.',
            'Fraud with cards compromised at a third-party merchant is not in itself an ICT incident of the bank; it is classified if there are signs that the bank’s own systems or those of an ICT provider are affected.'
          ] },
          { id: '3', heading: '3. Reporting deadlines', list: [
            'Initial notification: within 4 h of classification as major and never later than 24 h after becoming aware of the incident.',
            'Intermediate report: within 72 h of the initial notification.',
            'Final report: within one month of the last intermediate report.'
          ] },
          { id: '4', heading: '4. Responsibilities', list: [
            'ICT Risk (DORA) classifies the incident and prepares the notifications.',
            'The Head of Operations approves the initial notification; outside office hours, the executive on call.',
            'Compliance reviews the notifications before they are sent.'
          ] },
          { id: '5', heading: '5. Communication to customers', text: [
            'If the incident affects the financial interests of customers, they are informed without undue delay of the measures taken to mitigate it.'
          ] },
          { id: '6', heading: '6. Records', list: [
            'Register of ICT incidents and notifications: GRC Archer.',
            'Technical incident management: ServiceNow.'
          ] },
          { id: '7', heading: '7. References', refs: true, list: [
            'Regulation (EU) 2022/2554 on digital operational resilience for the financial sector (DORA).',
            'Commission Delegated Regulation (EU) 2024/1772, incident classification criteria.',
            'Commission Delegated Regulation (EU) 2025/301, content and time limits of notifications.'
          ] }
        ]
      },
      {
        code: 'MAN-PBC-001',
        title: 'Anti-money laundering and counter-terrorist financing manual',
        short: 'AML/CFT manual',
        type: 'Manual',
        version: '11',
        date: '2026-06-15',
        owner: 'Compliance',
        summary: 'Customer due diligence and enhanced due diligence (PEPs, correspondents, high-risk countries), special review and reporting to SEPBLAC without tipping off the customer, sanctions screening and 10-year retention.',
        sections: [
          { id: '1', heading: '1. Purpose and scope', text: [
            'Set out Banco Cierzo’s policies and procedures to prevent money laundering and terrorist financing, under Ley 10/2010 (Spanish AML/CFT Act) and its implementing regulation, approved by Real Decreto 304/2014.'
          ] },
          { id: '2', heading: '2. Control bodies', list: [
            'Internal Control Body (OCI): meets monthly, approves the policies and decides on reports to SEPBLAC.',
            'Representative before SEPBLAC: the Chief Compliance Officer.',
            'AML/CFT Technical Unit: carries out the special review of suspicious transactions.'
          ] },
          { id: '3', heading: '3. Customer due diligence', list: [
            'Formal identification with a reliable document before entering into the business relationship.',
            'Identification of the beneficial owner when the customer is a legal entity: whoever owns or controls more than 25 % of the capital or voting rights.',
            'Purpose and nature of the business relationship, and source of funds when the profile requires it.',
            'Ongoing monitoring of the relationship and updating of documentation according to risk: every year for high risk, every 3 years for medium and every 5 years for low.'
          ] },
          { id: '4', heading: '4. Enhanced due diligence', list: [
            'Politically exposed persons (PEPs), their family members and close associates: approval of the relationship by Compliance and by a senior manager, and verification of the source of wealth.',
            'Cross-border correspondent banking: correspondent questionnaire, assessment of its AML/CFT controls and authorisation by the OCI; no relationships are maintained with shell banks.',
            'High-risk countries identified by the FATF or by the European Commission.'
          ] },
          { id: '5', heading: '5. Special review and reporting', text: [
            'Any employee who detects an indication reports the transaction to the Technical Unit through the internal channel, without informing the customer.',
            'The Technical Unit carries out the special review and, if there is an indication or certainty of money laundering, the representative reports it to SEPBLAC without delay.',
            'It is forbidden to disclose to the customer or to third parties that a transaction has been reported or is being reviewed.'
          ] },
          { id: '6', heading: '6. Financial sanctions', list: [
            'All customers and transfers are screened against the UN, EU and OFAC sanctions lists before the transaction is executed.',
            'A confirmed match freezes the funds and is reported to SEPBLAC and to the Directorate-General of the Treasury.'
          ] },
          { id: '7', heading: '7. Retention, training and review', text: [
            'Due diligence and transaction documentation is retained for 10 years from the end of the business relationship or from the transaction.',
            'All employees receive annual AML/CFT training; those in at-risk positions also receive specific training.',
            'Internal audit and an external expert review the AML/CFT system every year.'
          ] }
        ]
      }
    ],

    unindexed: {
      'PR-SEG-014': { title: 'Management of PCI DSS card data compromises', mentionedIn: { doc: 'PR-TAR-007', sec: '4', quote: 'under PR-SEG-014 (Management of PCI DSS card data compromises)' } }
    },

    suggested: ['fraude-umbral', 'no-reconocido', 'plazos-sac', 'cpp', 'dora', 'pep'],

    intents: [
      {
        id: 'fraude-umbral', icon: 'alert-triangle', topic: 'Card fraud · thresholds', scope: 'all',
        q: 'When is a preventive fraud rule activated on a BIN?',
        anchors: ['preventive rule', 'preventive rules', 'bin', 'fraud rate', 'threshold', 'thresholds', 'falcon'],
        terms: ['activated', 'activate', 'when', 'fraud', 'spike', 'peak', 'rises', 'exceeds', 'cnp', 'card', 'cards', 'critical'],
        min: 3,
        blocks: [
          { t: 'When the card-not-present fraud rate of a BIN exceeds 1 % for more than 30 min: the fraud analyst on shift proposes a rule for the BIN’s high-risk e-commerce.', c: [['POL-FRA-003', 4, 'CNP fraud rate of a BIN above 1 % for more than 30 min: the fraud analyst on shift proposes a preventive rule in Falcon Fraud for the BIN’s high-risk e-commerce.']] },
          { t: 'Above 2.5 % the episode is critical: the Head of Fraud Prevention and ICT Risk are alerted immediately, and reissuing the affected cards is assessed.', c: [['POL-FRA-003', 4, 'Above 2.5 % the episode is critical: in addition to the rule, the Head of Fraud Prevention and ICT Risk are alerted immediately, and reissuing the affected cards is assessed.']] },
          { t: 'The rule is approved by the Head of Fraud Prevention before it is activated.', c: [['POL-FRA-003', 5, 'A preventive rule is proposed by the fraud analyst on shift and approved by the Head of Fraud Prevention before it is activated']] },
          { t: 'Customers with suspicious transactions receive an SMS and an in-app notification to confirm or reject them.', c: [['POL-FRA-003', 6, 'Each card with suspicious transactions receives an SMS and an in-app notification so that the customer can confirm or reject the transactions.']] }
        ],
        context: {
          systems: ['Falcon Fraud', 'Redsys'],
          text: 'BIN 454812 (Tarjeta Cierzo Débito): CNP fraud rate of 2.9 % since 02:10, against the usual 0.3 %, with 186 suspicious transactions totalling 41,230 € and a peak at 04:55. It exceeds 2.5 %: critical episode under section 4.',
          outcome: 'alarma',
          go: 'alarma', goLabel: 'Open BIN 454812 alarm'
        },
        followups: ['reglas-duracion', 'reemision']
      },
      {
        id: 'reglas-duracion', icon: 'clock', topic: 'Card fraud · rule duration', scope: 'all',
        q: 'How long can a preventive rule stay active?',
        anchors: ['preventive rule', 'preventive rules', 'false positives', 'false positive', '72 h', 'rule'],
        terms: ['long', 'last', 'lasts', 'duration', 'active', 'reviewed', 'maximum', 'withdraw', 'withdrawal', 'segment', 'bin'],
        min: 4,
        blocks: [
          { t: '72 h at most, with a review every 24 h of its false positive rate; if it declines more than 5 % of legitimate transactions, it is adjusted.', c: [['POL-FRA-003', 5, 'Every preventive rule lasts 72 h at most and is reviewed every 24 h against its false positive rate; if it declines more than 5 % of legitimate transactions, it is adjusted.']] },
          { t: 'It is limited to the affected segment: an entire BIN is not blocked except in the case of mass card-present fraud.', c: [['POL-FRA-003', 5, 'an entire BIN is not blocked except in the case of mass card-present fraud']] },
          { t: 'Its withdrawal is also approved by the Head of Fraud Prevention.', c: [['POL-FRA-003', 3, 'Head of Fraud Prevention: approves preventive rules and their withdrawal, and decides on mass card reissue.']] }
        ],
        followups: ['fraude-umbral']
      },
      {
        id: 'no-reconocido', icon: 'euro', topic: 'Unauthorised transactions · refund', scope: 'all',
        q: 'What do we do if a customer does not recognise charges on their card?',
        anchors: ['not recognise', 'does not recognise', 'doesn t recognise', 'not recognize', 'unrecognised', 'unauthorised', 'unauthorized', 'refund', 'charges', 'charge', 'did not make', 'didn t make', 'not mine'],
        terms: ['customer', 'card', 'do', 'purchases', 'purchase', 'deadline', 'amount', 'provisional', 'investigation', 'complaint'],
        min: 3,
        blocks: [
          { t: 'The amount is provisionally refunded before the end of the business day following notification, unless there is reasonable suspicion of fraud by the customer, which is reported in writing to the Banco de España.', c: [['PR-SAC-001', 3, 'the amount is provisionally refunded before the end of the business day following notification, unless there are reasonable grounds to suspect fraud by the customer, which are reported in writing to the Banco de España']] },
          { t: 'The card is blocked and reissued, and the complaint follows PR-SAC-001.', c: [['POL-FRA-003', 6, 'If the customer does not recognise a transaction, the card is blocked and reissued under PR-TAR-007, and the complaint follows PR-SAC-001.']] },
          { t: 'The investigation reviews the authentication used, the device and IP address, the card history and whether the merchant is linked to a common point of purchase.', c: [['PR-SAC-001', 3, 'The investigation reviews the authentication used (3-D Secure, contactless or PIN), the device and IP address, the card history and whether the merchant is linked to a common point of purchase.']] },
          { t: 'If the merchant belongs to another institution, the chargeback is initiated through the network without delaying the refund to the customer.', c: [['PR-SAC-001', 4, 'Payments and Cards initiates the chargeback through the Visa or Mastercard network within the network’s deadline, without this delaying the refund to the customer']] }
        ],
        context: {
          systems: ['Salesforce FSC', 'Core bancario T24', 'Falcon Fraud'],
          text: 'Lucía Ferrer Gil does not recognise three charges from TIENDAONLINE-ELEC on 26/09/2026 totalling 612.40 €: the provisional refund is decided before the end of the following business day and the SAC response is due within 15 business days.',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Open Lucía Ferrer’s complaint'
        },
        followups: ['responsabilidad', 'plazos-sac']
      },
      {
        id: 'responsabilidad', icon: 'scale', topic: 'Unauthorised transactions · customer liability', scope: 'all',
        q: 'How much is the customer liable for in an unauthorised transaction?',
        anchors: ['50 €', 'liable', 'liability', 'gross negligence', 'excess', '13 months', 'stolen', 'theft', 'customer pays', 'loses'],
        terms: ['customer', 'transaction', 'unauthorised', 'losses', 'much', 'pay', 'deadline', 'report'],
        min: 3,
        blocks: [
          { t: 'A maximum of 50 € of the losses prior to notification, except in the case of fraud or gross negligence on their part.', c: [['PR-SAC-001', 3, 'The customer is liable for a maximum of 50 € of the losses prior to notification, except in the case of fraud or gross negligence on their part']] },
          { t: 'They are not liable for anything if the transaction did not require strong authentication.', c: [['PR-SAC-001', 3, 'they are not liable for anything if the transaction did not require strong authentication']] },
          { t: 'They have 13 months from the debit date to report it.', c: [['PR-SAC-001', 3, 'The customer has 13 months from the debit date to report an unauthorised transaction.']] }
        ],
        followups: ['no-reconocido']
      },
      {
        id: 'plazos-sac', icon: 'mail', topic: 'Complaints · SAC deadlines', scope: 'all',
        q: 'What deadlines do we have to respond to a customer complaint?',
        anchors: ['complaint', 'complaints', 'claim', 'claims', 'sac'],
        terms: ['deadline', 'deadlines', 'respond', 'reply', 'answer', 'acknowledgement', 'days', 'business', 'when', 'resolve', 'time'],
        min: 3,
        blocks: [
          { list: [
            { t: 'Acknowledgement within 24 h.', c: [['PR-SAC-001', 2, 'Acknowledgement to the customer: 24 h from receipt.']] },
            { t: 'Payment services: resolution within 15 business days; exceptionally, up to 35, explaining the reason to the customer.', c: [['PR-SAC-001', 2, 'resolution within 15 business days; in exceptional situations, up to 35 business days, informing the customer of the reason for the delay']] },
            { t: 'Other complaints: one month.', c: [['PR-SAC-001', 2, 'Other complaints and claims: resolution within one month.']] }
          ] },
          { t: 'The response is written and reasoned; if it is unfavourable, it informs of the right to go to the Banco de España Complaints Service. It is approved by the head of the SAC.', c: [['PR-SAC-001', 5, 'if it is unfavourable, it informs the customer of the right to complain to the Banco de España Complaints Service'], ['PR-SAC-001', 5, 'It is approved by the head of the SAC before it is sent.']] }
        ],
        context: {
          systems: ['Salesforce FSC'],
          text: 'Complaint from Lucía Ferrer Gil (three charges from TIENDAONLINE-ELEC, 612.40 €): payment service, 15-business-day deadline.',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Open Lucía Ferrer’s complaint'
        },
        followups: ['no-reconocido', 'responsabilidad']
      },
      {
        id: 'reemision', icon: 'repeat', topic: 'Cards · reissue', scope: 'all',
        q: 'How is a defrauded card reissued?',
        anchors: ['reissue', 'reissued', 'reissuing', 'new card', 'replacement card', 'pan', 'cvv'],
        terms: ['card', 'defrauded', 'compromised', 'how', 'deadline', 'days', 'cost', 'debits'],
        min: 2,
        blocks: [
          { t: 'The defrauded card is blocked permanently, which requires reissue.', c: [['PR-TAR-007', 2, 'Permanent block: defrauded, stolen or compromised card; it cannot be undone and requires reissue.']] },
          { t: 'The new one has a different PAN, expiry date and CVV; it reaches the customer’s address within 5 business days and the digital card is in the app the same day.', c: [['PR-TAR-007', 3, 'The new card has a different number (PAN), expiry date and CVV; it is sent to the customer’s address within 5 business days and the digital card is available in the app the same day.']] },
          { t: 'Direct debits are updated through the Visa and Mastercard services if the merchant participates.', c: [['PR-TAR-007', 3, 'Direct debits and subscriptions charged to the card are updated through the Visa and Mastercard updater services when the merchant participates.']] },
          { t: 'It is free of charge for the customer.', c: [['PR-TAR-007', 5, 'Reissue due to compromise or fraud is free of charge for the customer.']] }
        ],
        context: {
          systems: ['Core bancario T24', 'Falcon Fraud'],
          text: 'In the BIN 454812 spike, the Payments and Cards agent proposes reissuing 214 affected cards.',
          outcome: 'alarma',
          go: 'alarma', goLabel: 'Open BIN 454812 alarm'
        },
        followups: ['tipos-bloqueo', 'cpp']
      },
      {
        id: 'tipos-bloqueo', icon: 'lock', topic: 'Cards · types of block', scope: 'all',
        q: 'What types of card block are there?',
        anchors: ['types of block', 'temporary block', 'permanent block', 'channel block', 'block'],
        terms: ['types', 'card', 'temporary', 'permanent', 'channel', 'undo', 'undone', 'atm', 'abroad'],
        min: 3,
        blocks: [
          { list: [
            { t: 'Temporary: activated by the customer from the app or by the bank in case of suspicion, and it can be undone.', c: [['PR-TAR-007', 2, 'Temporary block: activated by the customer from the app or by the bank in case of suspicion; it can be undone.']] },
            { t: 'Permanent: defrauded, stolen or compromised card; requires reissue.', c: [['PR-TAR-007', 2, 'Permanent block: defrauded, stolen or compromised card; it cannot be undone and requires reissue.']] },
            { t: 'Channel: declines only e-commerce, use abroad or ATMs.', c: [['PR-TAR-007', 2, 'Channel block: declines only e-commerce, use abroad or ATM withdrawals.']] }
          ] }
        ],
        followups: ['reemision']
      },
      {
        id: 'cpp', icon: 'map-pin', topic: 'Cards · common point of purchase', scope: 'all',
        q: 'What is done in the case of a common point of purchase?',
        anchors: ['common point of purchase', 'common point of compromise', 'cpp', 'compromise', 'skimming', 'compromised pos'],
        terms: ['cards', 'merchant', 'terminal', 'reissue', 'other issuers', 'networks', 'done', 'deadline'],
        min: 2,
        blocks: [
          { t: 'Fraud identifies the cards used at the merchant or terminal during the compromise window.', c: [['PR-TAR-007', 4, 'Fraud identifies the cards used at the merchant or terminal during the compromise window (Redsys and Core bancario T24).']] },
          { t: 'Banco Cierzo cards are placed under enhanced monitoring the same day and reissued within 10 business days at most, starting with those that already have suspicious transactions.', c: [['PR-TAR-007', 4, 'Banco Cierzo cards are placed under enhanced monitoring in Falcon Fraud the same day and reissued within a maximum of 10 business days, starting with those that already have suspicious transactions.']] },
          { t: 'Cards from other issuers are reported to Visa and Mastercard so that they can alert their issuers.', c: [['PR-TAR-007', 4, 'Cards from other issuers are reported to the Visa and Mastercard networks so that they can alert their issuers.']] },
          { t: 'The merchant’s acquiring bank is notified so that it can initiate the forensic investigation.', c: [['PR-TAR-007', 4, 'The compromise is notified to the merchant’s acquiring bank so that it can initiate the forensic investigation']] },
          { t: 'A compromise at a third-party merchant is not, on its own, an ICT incident of the bank for DORA purposes.', c: [['PR-DORA-002', 2, 'Fraud with cards compromised at a third-party merchant is not in itself an ICT incident of the bank']] }
        ],
        context: {
          systems: ['Redsys', 'Core bancario T24', 'Falcon Fraud'],
          text: 'Case CPP-2609-07: POS terminal 3 at Gasolinera Ronda Norte (merchant 334512987), from 10 to 22/09/2026. 1,284 cards used there: 1,107 from Banco Cierzo and 177 from other issuers, who are alerted through Visa and Mastercard.',
          lot: 'CPP-2609-07',
          go: 'retirada', goLabel: 'Open case CPP-2609-07'
        },
        followups: ['reemision', 'dora']
      },
      {
        id: 'dora', icon: 'server', topic: 'DORA · incident reporting', scope: 'all',
        q: 'What is the deadline for reporting a major incident under DORA?',
        anchors: ['dora', 'major incident', 'major incidents', 'initial notification', 'ict incident', 'notify', 'reporting'],
        terms: ['deadline', 'deadlines', 'hours', 'banco de espana', 'report', 'intermediate', 'final', 'notification', 'major'],
        min: 2,
        blocks: [
          { list: [
            { t: 'Initial notification within 4 h of classification as major, and never later than 24 h after becoming aware.', c: [['PR-DORA-002', 3, 'Initial notification: within 4 h of classification as major and never later than 24 h after becoming aware of the incident.']] },
            { t: 'Intermediate report within 72 h of the initial notification.', c: [['PR-DORA-002', 3, 'Intermediate report: within 72 h of the initial notification.']] },
            { t: 'Final report within one month of the last intermediate report.', c: [['PR-DORA-002', 3, 'Final report: within one month of the last intermediate report.']] }
          ] },
          { t: 'ICT Risk classifies, the Head of Operations approves the initial notification and Compliance reviews it before it is sent.', c: [['PR-DORA-002', 4, 'ICT Risk (DORA) classifies the incident and prepares the notifications.'], ['PR-DORA-002', 4, 'The Head of Operations approves the initial notification'], ['PR-DORA-002', 4, 'Compliance reviews the notifications before they are sent.']] }
        ],
        followups: ['dora-grave', 'cpp']
      },
      {
        id: 'dora-grave', icon: 'shield', topic: 'DORA · classification', scope: 'all',
        q: 'When is an ICT incident major?',
        anchors: ['major', 'classification', 'classified', 'ict incident', 'criteria', 'malicious'],
        terms: ['incident', 'ict', 'when', 'dora', 'criteria', 'customers', 'clients', 'duration', 'data'],
        min: 4,
        blocks: [
          { t: 'When it affects critical services and meets the criteria of Commission Delegated Regulation (EU) 2024/1772: clients affected, duration, geographical spread, data losses, criticality and economic impact.', c: [['PR-DORA-002', 2, 'An incident is major when it affects critical services and meets the criteria of Commission Delegated Regulation (EU) 2024/1772']] },
          { t: 'Malicious unauthorised access to the systems is always a candidate for major.', c: [['PR-DORA-002', 2, 'Incidents involving malicious unauthorised access to network and information systems are always treated as candidates for major.']] },
          { t: 'If it affects customers’ financial interests, they are informed without undue delay.', c: [['PR-DORA-002', 5, 'If the incident affects the financial interests of customers, they are informed without undue delay']] }
        ],
        followups: ['dora']
      },
      {
        id: 'pep', icon: 'user-check', topic: 'AML/CFT · enhanced due diligence', scope: 'all',
        q: 'What due diligence applies to a politically exposed person?',
        anchors: ['pep', 'peps', 'politically exposed', 'enhanced due diligence', 'close associates'],
        terms: ['diligence', 'applies', 'apply', 'customer', 'approval', 'wealth', 'senior', 'onboarding'],
        min: 2,
        blocks: [
          { t: 'Enhanced due diligence: Compliance and a senior manager approve the relationship and the source of wealth is verified; this also applies to their family members and close associates.', c: [['MAN-PBC-001', 4, 'Politically exposed persons (PEPs), their family members and close associates: approval of the relationship by Compliance and by a senior manager, and verification of the source of wealth.']] },
          { t: 'In addition to standard due diligence: formal identification, beneficial owner, purpose of the relationship and ongoing monitoring.', c: [['MAN-PBC-001', 3, 'Formal identification with a reliable document before entering into the business relationship.'], ['MAN-PBC-001', 3, 'Ongoing monitoring of the relationship and updating of documentation according to risk']] }
        ],
        followups: ['corresponsal', 'examen']
      },
      {
        id: 'corresponsal', icon: 'globe', topic: 'AML/CFT · correspondent banking', scope: 'all',
        q: 'What is required to open a correspondent banking relationship?',
        anchors: ['correspondent', 'correspondents', 'correspondent banking', 'shell bank', 'shell banks', 'cbddq', 'wolfsberg'],
        terms: ['required', 'require', 'open', 'relationship', 'questionnaire', 'authorises', 'authorisation', 'controls'],
        min: 2,
        blocks: [
          { t: 'Correspondent questionnaire, assessment of its AML/CFT controls and authorisation by the Internal Control Body; never with shell banks.', c: [['MAN-PBC-001', 4, 'Cross-border correspondent banking: correspondent questionnaire, assessment of its AML/CFT controls and authorisation by the OCI; no relationships are maintained with shell banks.']] },
          { t: 'Internal audit and an external expert review the AML/CFT system every year.', c: [['MAN-PBC-001', 7, 'Internal audit and an external expert review the AML/CFT system every year.']] }
        ],
        context: {
          systems: ['GRC Archer'],
          text: 'Nordbank AG has sent the Wolfsberg CBDDQ v1.4 questionnaire as a correspondent: its answers on the AML/CFT programme come from this manual.',
          go: 'cuestionario', goLabel: 'Open Nordbank questionnaire'
        },
        followups: ['pep', 'sanciones']
      },
      {
        id: 'examen', icon: 'search', topic: 'AML/CFT · suspicious transactions', scope: 'all',
        q: 'What do I do if I detect a transaction suspected of money laundering?',
        anchors: ['money laundering', 'laundering', 'suspicious', 'suspected', 'sepblac', 'special review', 'indication'],
        terms: ['transaction', 'detect', 'report', 'customer', 'tell', 'inform', 'do'],
        min: 2,
        blocks: [
          { t: 'Report it to the Technical Unit through the internal channel, without informing the customer.', c: [['MAN-PBC-001', 5, 'Any employee who detects an indication reports the transaction to the Technical Unit through the internal channel, without informing the customer.']] },
          { t: 'The Technical Unit carries out the special review and, if there is an indication or certainty, the representative reports it to SEPBLAC without delay.', c: [['MAN-PBC-001', 5, 'The Technical Unit carries out the special review and, if there is an indication or certainty of money laundering, the representative reports it to SEPBLAC without delay.']] },
          { t: 'It is forbidden to disclose to the customer or to third parties that it has been reported or is being reviewed.', c: [['MAN-PBC-001', 5, 'It is forbidden to disclose to the customer or to third parties that a transaction has been reported or is being reviewed.']] }
        ],
        followups: ['conservacion', 'sanciones']
      },
      {
        id: 'sanciones', icon: 'shield-check', topic: 'AML/CFT · financial sanctions', scope: 'all',
        q: 'Which sanctions lists are customers screened against?',
        anchors: ['sanctions', 'lists', 'ofac', 'un', 'freeze', 'frozen', 'freezes'],
        terms: ['screened', 'screen', 'screening', 'customers', 'transfers', 'match', 'lists'],
        min: 2,
        blocks: [
          { t: 'Against the UN, EU and OFAC lists, before each transaction is executed; transfers too.', c: [['MAN-PBC-001', 6, 'All customers and transfers are screened against the UN, EU and OFAC sanctions lists before the transaction is executed.']] },
          { t: 'A confirmed match freezes the funds and is reported to SEPBLAC and to the Directorate-General of the Treasury.', c: [['MAN-PBC-001', 6, 'A confirmed match freezes the funds and is reported to SEPBLAC and to the Directorate-General of the Treasury.']] }
        ],
        followups: ['examen']
      },
      {
        id: 'conservacion', icon: 'history', topic: 'AML/CFT · document retention', scope: 'all',
        q: 'How long is due diligence documentation kept?',
        anchors: ['kept', 'keep', 'retained', 'retention', 'retain', 'due diligence', 'documentation'],
        terms: ['long', 'years', 'documents', 'store', 'kyc', 'how'],
        min: 3,
        blocks: [
          { t: '10 years from the end of the business relationship or from the transaction.', c: [['MAN-PBC-001', 7, 'Due diligence and transaction documentation is retained for 10 years from the end of the business relationship or from the transaction.']] },
          { t: 'While the relationship lasts, the documentation is updated every year for high risk, every 3 years for medium and every 5 for low.', c: [['MAN-PBC-001', 3, 'every year for high risk, every 3 years for medium and every 5 years for low']] }
        ],
        followups: ['pep']
      },
      {
        id: 'pci', icon: 'key', topic: 'Card data compromise · forensics', scope: 'all', kind: 'partial',
        q: 'Who carries out the forensic investigation of a compromised merchant?',
        anchors: ['forensic', 'forensic investigation', 'pci', 'pci dss', 'acquirer', 'acquiring', 'pfi'],
        terms: ['investigation', 'merchant', 'compromised', 'who', 'carries'],
        min: 2,
        blocks: [
          { t: 'The compromise is notified to the merchant’s acquiring bank so that it can initiate the forensic investigation under PR-SEG-014.', c: [['PR-TAR-007', 4, 'The compromise is notified to the merchant’s acquiring bank so that it can initiate the forensic investigation under PR-SEG-014']] }
        ],
        note: 'PR-SEG-014 (Management of PCI DSS card data compromises) is not among the indexed documents: the deadlines and scope of the forensic investigation cannot be detailed from this search.',
        followups: ['cpp']
      }
    ],

    gaps: [
      { id: 'hipoteca', topic: 'Lending products', anchors: ['mortgage', 'mortgages', 'loan', 'loans', 'interest rate', 'euribor', 'apr'],
        reason: 'Loan and mortgage terms are not part of the internal policies indexed for the Operations Centre.' },
      { id: 'comisiones', topic: 'Fees and commissions', anchors: ['commission', 'commissions', 'fee', 'fees', 'tariff', 'price', 'pricing', 'charge for', 'charge me'],
        reason: 'The schedule of fees and commissions is not among the indexed documents.' },
      { id: 'inversion', topic: 'Investment services', anchors: ['mifid', 'investment funds', 'suitability test', 'appropriateness', 'shares', 'stock market', 'stocks'],
        reason: 'No indexed document covers investment services or MiFID tests.' },
      { id: 'forense', topic: 'PCI DSS forensic investigation', anchors: ['forensic deadline', 'forensic report', 'pr-seg-014', 'pfi'],
        reason: 'No indexed document describes the forensic investigation of a card data compromise.', related: 'PR-SEG-014' },
      { id: 'cripto', topic: 'Crypto-assets', anchors: ['crypto', 'crypto-assets', 'cryptoassets', 'cryptocurrency', 'cryptocurrencies', 'bitcoin', 'mica'],
        reason: 'No indexed document covers crypto-assets.' },
      { id: 'personal', topic: 'Working conditions', anchors: ['holidays', 'holiday', 'payroll', 'salary', 'collective agreement', 'remote working', 'working from home', 'working hours'],
        reason: 'Working conditions are not part of the indexed internal policies.' }
    ]
  }
});

/* Canonical summary by code (CN_DATA.procedures): filled in without overwriting what other files may have set. */
(function (id) {
  'use strict';
  const pack = window.AGENTIC_INDUSTRIES_EN[id];
  const procs = pack.procedures = pack.procedures || {};
  pack.procedimientos.docs.forEach((d) => {
    const cur = procs[d.code] = procs[d.code] || {};
    if (!cur.title) cur.title = d.title;
    if (!cur.summary) cur.summary = d.summary;
    if (!cur.version) cur.version = d.version;
  });
})('banca');
