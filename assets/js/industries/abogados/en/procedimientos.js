/* Mora & Jordano · Q&A over the firm’s internal manual with citations (English). Synthetic demo data (MFM). */
agenticPackEn('abogados', {
  procedimientos: {
    section: 'Calidad',
    nav: 'Procedures',
    title: 'Ask the procedures',
    agent: 'Procedures',
    system: 'iManage',
    source: 'iManage · the firm’s current internal manual',
    indexed_at: '2026-09-29T06:00',
    doc_org: 'Mora & Jordano · Compliance and quality',
    ui: {
      page_title: 'Internal manual search',
      intro_title: 'Ask about the firm’s internal protocols and policies',
      intro_text: 'Procedural deadlines and LexNET, conflicts of interest, anti-money laundering, fees, data protection and the tax calendar. Every sentence of the answer cites the document and the section it comes from. If no indexed document covers it, the search says so and does not answer.',
      placeholder: 'Type a question about the internal manual',
      context_title: 'Applied to the firm today',
      permission: 'All practice areas · Málaga and Córdoba',
      asker_initials: 'SA',
      asker_role: 'Senior Associate, Litigation',
      route_to: 'Compliance (AML and GDPR)'
    },
    report: { title: 'Internal manual search', code_prefix: 'CON-MAN', filename: 'internal-manual-search', scope_label: 'Firm', scope: 'Mora & Jordano · Málaga and Córdoba' },
    presenter: {
      say: [
        'Search of the firm’s internal manual: the answer comes only from the current protocols and policies stored in iManage, and every sentence carries its citation to the document and section.',
        'Six documents are indexed: procedural deadline control, conflicts of interest and engagement acceptance, anti-money laundering, fees and engagement letters, data protection and breaches, and the tax calendar. Here they are synthetic; in the pilot, your own current versions with permissions by practice area.'
      ],
      say_empty: 'It helps a newly joined associate compute a deadline correctly or open a matter without skipping the conflict check, prepare an audit by a corporate client and answer a client with the exact policy reference.',
      say_answered: 'Clicking a citation opens the document with the exact passage highlighted. And the answer is cross-checked with what is happening today: the claim against Aceites Sierra Subbética (PO 1184/2026), the complaint from Grupo Hostelero Costa del Sol or drill RGPD-2609-03.',
      say_none: 'When there is no source it says so and invents nothing: no answer and no citation. If the topic is in a document that is not indexed, it names it (POL-IA-007) and lets you route the question to Compliance.',
      next_empty: 'Click “How is a procedural deadline computed?” and then citation 1 to see the highlighted passage.',
      next_answered: 'Type a question with no source, for example “How many remote working days do we get?”, and click “Ask”.',
      next_done: 'Move on to the next scene with the right arrow.'
    },

    docs: [
      {
        code: 'PRO-PLZ-001',
        title: 'Procedural deadline control and LexNET notification protocol',
        short: 'Procedural deadline control',
        type: 'Protocol',
        version: '9',
        date: '2026-01-12',
        owner: 'Litigation Partner',
        summary: 'Every LexNET notification is logged the same day with a double computation of the deadline. Business days, August non-working, Málaga and Córdoba local holidays; internal due date 3 business days before the legal one; the partner is alerted if it expires in under 5 business days.',
        sections: [
          { id: '1', heading: '1. Purpose and scope', text: [
            'Ensure that no procedural deadline of the firm is missed, from receipt of the notification to the filing of the brief, and record every step in the matter management system (Gestor de expedientes).',
            'It applies to all court proceedings in which Mora & Jordano lawyers act from the Málaga and Córdoba offices, in every jurisdiction.'
          ] },
          { id: '2', heading: '2. Responsibilities', list: [
            'Litigation secretariat: downloads every day the LexNET notifications received by the court agents (procuradores), links them to the matter and makes the first computation of the deadline.',
            'Responsible lawyer for the matter: makes the second computation, confirms the due date and prepares the brief.',
            'Practice area partner: supervises deadlines expiring in less than 5 business days and appoints a substitute if the responsible lawyer is absent.',
            'IT: monitors LexNET availability and reports any service incident to the Litigation secretariat immediately.'
          ] },
          { id: '3', heading: '3. Receipt of LexNET notifications', text: [
            'LexNET notifications are downloaded and logged on the day they are received, by 10:00 at the latest if they arrive before that time and before 18:00 otherwise.',
            'Communications received by the court agent are deemed served on the business day following receipt (art. 151.2 LEC, Civil Procedure Act); if the addressee does not access them within three business days, the notification is deemed made (art. 162.2 LEC).',
            'Each notification is linked to the matter in the Gestor de expedientes and the document is saved in iManage with its receipt.'
          ] },
          { id: '4', heading: '4. Computation of deadlines', text: [
            'Procedural deadlines run from the day after the notification is deemed served and exclude non-working days: Saturdays, Sundays, national, regional and local holidays of the judicial district, and 24 and 31 December (arts. 133 LEC and 182 LOPJ).',
            'August is non-working for court proceedings, except those the law declares urgent (art. 130.2 LEC); in criminal proceedings, August is a working month for the investigation phase.',
            'Deadlines set in months or years run from date to date; if the last day is a non-working day, the deadline is extended to the next business day (art. 133.3 and 4 LEC).',
            'Every deadline is computed independently by two people (Litigation secretariat and responsible lawyer); if the computations differ, the shorter one applies until the area partner settles it.',
            'Local holidays loaded into the Gestor de expedientes calendar: Málaga, 19 August and 8 September; Córdoba, 8 September and 24 October.'
          ] },
          { id: '5', heading: '5. Internal due date and alerts', list: [
            'Each deadline is logged with two dates: the legal due date and an internal due date 3 business days earlier, which is the team’s working date.',
            'If the deadline expires in less than 5 business days, the Gestor de expedientes alerts the practice area partner as well as the responsible lawyer.',
            'If the responsible lawyer is on holiday or on leave, the Litigation secretariat informs the area partner the same day so the matter can be reassigned.'
          ] },
          { id: '6', heading: '6. Filing of briefs', text: [
            'Time-limited briefs may be filed until 15:00 on the business day after the due date (art. 135.5 LEC), but the firm does not use that margin without the express authorisation of the area partner.',
            'If LexNET is unavailable on the last day, a screenshot of the service incident notice is kept and the brief is filed as soon as the service is restored, recording it in the matter.',
            'The LexNET filing receipt is saved in iManage and closes the deadline in the Gestor de expedientes.'
          ] },
          { id: '7', heading: '7. Records', list: [
            'Deadlines, computations, alerts and closures: Gestor de expedientes.',
            'Notifications, briefs and receipts: iManage.',
            'LexNET incidents: IT log.'
          ] },
          { id: '8', heading: '8. References', refs: true, list: [
            'Ley 1/2000, de Enjuiciamiento Civil (Civil Procedure Act), articles 130 to 136, 151 and 162.',
            'Ley Orgánica 6/1985, del Poder Judicial (Judiciary Act), article 182.',
            'Real Decreto 1065/2015, on electronic communications in the Administration of Justice (LexNET).'
          ] }
        ]
      },
      {
        code: 'POL-CON-002',
        title: 'Conflicts of interest and engagement acceptance policy',
        short: 'Conflicts and engagement acceptance',
        type: 'Policy',
        version: '5',
        date: '2026-03-02',
        owner: 'Managing Partner',
        summary: 'No engagement is accepted without a conflict search in the Gestor de expedientes (parties, opponents and groups, last 10 years). Potential conflict: the Managing Partner decides on a Compliance report; if unresolved, the client is told in time to appoint another lawyer.',
        sections: [
          { id: '1', heading: '1. Purpose and scope', text: [
            'Prevent the firm from defending opposing interests or using one client’s confidential information to another’s detriment, in accordance with article 12 of the Spanish Bar Code of Conduct (Código Deontológico de la Abogacía Española).',
            'It applies to all new engagements, extensions of engagements and the addition of new parties to an open matter, in every practice area and office.'
          ] },
          { id: '2', heading: '2. Conflict search', list: [
            'Before accepting an engagement, the Gestor de expedientes is searched for the client, the opposing party and their group companies, directors and relevant shareholders.',
            'The search covers open matters and those closed in the last 10 years, including enquiries that never became an engagement.',
            'The result is classified as no conflict, potential conflict or conflict, and is recorded in the matter.'
          ] },
          { id: '3', heading: '3. Potential conflict and conflict', text: [
            'In the event of a potential conflict, the lawyer neither accepts the engagement nor takes any step: they report it to Compliance, which issues a report within 24 h, and the Managing Partner decides.',
            'The firm does not advise or defend two clients with opposing interests in the same or related matters.',
            'An engagement against a former client is only accepted if there is no risk of using information obtained in the earlier engagement or of breaching professional secrecy; the Managing Partner decides on a Compliance report.',
            'If the conflict is not resolved, the client is told in writing that the firm cannot accept the engagement, with enough time to appoint another lawyer before any deadline expires.'
          ] },
          { id: '4', heading: '4. Acceptance of the engagement', list: [
            'Conflict search with no conflict, or potential conflict resolved by the Managing Partner.',
            'Anti-money laundering due diligence completed when the engagement is subject to Ley 10/2010, under MAN-PBC-003.',
            'Engagement letter signed by the client under POL-HON-004.',
            'Acceptance and the first communication to the client are approved by the area partner; engagements with a potential conflict, by the Managing Partner.'
          ] },
          { id: '5', heading: '5. Information barriers', text: [
            'When the Managing Partner authorises an engagement with a resolved potential conflict, the matter is restricted in iManage and in the Gestor de expedientes to the assigned professionals, and every access is logged.'
          ] },
          { id: '6', heading: '6. Records', list: [
            'Searches, results and Compliance reports: Gestor de expedientes.',
            'Information barriers and accesses: iManage.'
          ] },
          { id: '7', heading: '7. References', refs: true, list: [
            'Código Deontológico de la Abogacía Española (Spanish Bar Code of Conduct), articles 5 (professional secrecy) and 12 (conflict of interest).',
            'Real Decreto 135/2021, approving the General Statute of the Spanish Legal Profession.'
          ] }
        ]
      },
      {
        code: 'MAN-PBC-003',
        title: 'Anti-money laundering and counter-terrorist financing manual',
        short: 'AML/CFT manual',
        type: 'Manual',
        version: '7',
        date: '2026-05-18',
        owner: 'Head of Compliance (AML and GDPR)',
        summary: 'Engagements subject to Ley 10/2010 (real estate, companies, funds), due diligence before acting (identification, beneficial owner > 25 %), enhanced for PEPs and high-risk countries, reporting to SEPBLAC without tipping off the client, and 10-year retention.',
        sections: [
          { id: '1', heading: '1. Purpose and scope', text: [
            'Set out Mora & Jordano’s measures to prevent money laundering and terrorist financing, under Ley 10/2010 (Spanish AML/CFT Act) and its Regulation, approved by Real Decreto 304/2014.',
            'The firm is an obliged entity when it takes part in the purchase or sale of real estate or businesses, the management of client funds or securities, the opening or management of accounts, the creation, management or direction of companies or trusts, or acts on the client’s behalf in financial or real estate transactions (art. 2.1.ñ Ley 10/2010).',
            'Defending a client in court proceedings and advising on the client’s legal position are not subject to reporting, unless the lawyer knows the client is seeking advice in order to launder money (art. 22 Ley 10/2010).'
          ] },
          { id: '2', heading: '2. Control bodies', list: [
            'Representative before SEPBLAC (the Spanish financial intelligence unit) and internal control body: the Head of Compliance (AML and GDPR).',
            'AML Committee: Managing Partner, Head of Compliance and the partner of the area concerned; it meets every quarter and whenever a transaction is under review.'
          ] },
          { id: '3', heading: '3. Due diligence', list: [
            'Formal identification of the client with a reliable document before any step is taken in an engagement subject to the Act.',
            'Identification of the beneficial owner when the client is a legal entity: whoever owns or controls more than 25 % of the capital or voting rights, checking the Beneficial Ownership Register and the Companies Register.',
            'Purpose and nature of the engagement and, where the profile requires it, source of funds.',
            'Until due diligence is complete in the Gestor de expedientes, no step subject to the Act is taken and no invoice is issued.',
            'Documentation is updated according to risk: every year for high risk, every 3 years for medium and every 5 years for low.'
          ] },
          { id: '4', heading: '4. Enhanced due diligence', list: [
            'Politically exposed persons (PEPs), their family members and close associates: approval of the engagement by the Managing Partner and the Head of Compliance, and verification of the source of wealth and funds.',
            'Clients, funds or transactions linked to high-risk countries identified by the FATF or the European Commission.',
            'Complex corporate structures or ones with no apparent economic rationale, and payments in cash or from unrelated third parties.'
          ] },
          { id: '5', heading: '5. Special review and reporting', text: [
            'Any professional who detects an indicator reports it to the Head of Compliance through the internal channel, without informing the client.',
            'The Head of Compliance carries out the special review and, if there is an indication or certainty of money laundering, reports it to SEPBLAC without delay, after a meeting of the AML Committee.',
            'It is forbidden to disclose to the client or to third parties that a transaction has been reported or is under review (art. 24 Ley 10/2010).',
            'While the review is under way, the lawyer refrains from executing the suspicious transaction.'
          ] },
          { id: '6', heading: '6. Retention, training and review', text: [
            'Due diligence and transaction records are kept for 10 years from the end of the business relationship or from the transaction.',
            'All professionals receive annual AML/CFT training, which is recorded in their personnel file.',
            'An external expert reviews the firm’s AML/CFT system every year and the report is presented to the AML Committee.'
          ] },
          { id: '7', heading: '7. References', refs: true, list: [
            'Ley 10/2010, on the prevention of money laundering and terrorist financing.',
            'Real Decreto 304/2014, approving its Regulation.',
            'Directive (EU) 2015/849 and Regulation (EU) 2024/1624.'
          ] }
        ]
      },
      {
        code: 'POL-HON-004',
        title: 'Fees, engagement letter and billing policy',
        short: 'Fees and engagement letter',
        type: 'Policy',
        version: '6',
        date: '2026-02-23',
        owner: 'Client Care and Billing',
        summary: 'Engagement letter signed before work starts, with scope, fees and estimate. Overrun of more than 10 %: prior written notice and client acceptance. Monthly progress report. Fee complaints: acknowledgement within 48 h and reply within 15 days.',
        sections: [
          { id: '1', heading: '1. Purpose and scope', text: [
            'Set how the firm’s fees are agreed, reported and billed so that clients know the cost in advance and do not receive bills they did not expect.',
            'It applies to all professional engagements of Mora & Jordano, regardless of practice area or office.'
          ] },
          { id: '2', heading: '2. Engagement letter', list: [
            'No work starts without an engagement letter signed by the client, via Signaturit or on paper, except urgent steps authorised by the area partner, which are formalised within 5 business days.',
            'The engagement letter sets out: client identification, scope of the engagement and what is excluded, assigned professionals, how fees are calculated, estimated budget, retainer, expenses and disbursements, and applicable taxes.',
            'When the client is a consumer, the letter also includes the prior information required by consumer law and the right to request a fixed quote.'
          ] },
          { id: '3', heading: '3. Fee calculation', list: [
            'Hourly: hourly rate by professional category set out in the engagement letter, with time recorded in the Gestor de expedientes in 15 min units.',
            'Fixed fee: a fixed amount per phase or per matter, with the circumstances that change it described in the engagement letter.',
            'Mixed: fixed fee plus a variable component linked to the outcome, which can never be the only fee.'
          ] },
          { id: '4', heading: '4. Budget overruns', text: [
            'If expected fees are going to exceed the engagement letter budget by more than 10 %, the responsible lawyer informs the client in writing before continuing, with the reason and the new estimate.',
            'The excess is only billed if the client accepts it in writing; if not, billing stops at the budget and the area partner decides whether to continue with the engagement.'
          ] },
          { id: '5', heading: '5. Client information', list: [
            'In engagements lasting more than three months, the responsible lawyer sends the client a monthly progress report with the work done, next steps and hours accumulated against the budget.',
            'Each bill comes with a breakdown of work and hours per professional when fees are calculated by the hour.'
          ] },
          { id: '6', heading: '6. Fee complaints', text: [
            'Complaints about bills are logged by Client Care and Billing, which sends an acknowledgement within 48 h and suspends collection of the disputed invoice while the complaint is handled.',
            'A reasoned reply is sent within 15 days of receipt, with an analysis of the hours recorded against the engagement letter; it is approved by the area partner and, if it proposes a credit, by the Managing Partner.',
            'If the client disagrees, they are told they may ask the Bar Association for an opinion on the fees.'
          ] },
          { id: '7', heading: '7. Records', list: [
            'Signed engagement letters: Signaturit and iManage.',
            'Hours, budgets, invoices and complaints: Gestor de expedientes.'
          ] },
          { id: '8', heading: '8. References', refs: true, list: [
            'Real Decreto 135/2021, approving the General Statute of the Spanish Legal Profession.',
            'Código Deontológico de la Abogacía Española (Spanish Bar Code of Conduct), articles 13 and 15.',
            'Real Decreto Legislativo 1/2007, consolidated text of the General Consumer Protection Act.'
          ] }
        ]
      },
      {
        code: 'PRO-RGPD-005',
        title: 'Data protection and security breach management protocol',
        short: 'Data protection and breaches',
        type: 'Protocol',
        version: '4',
        date: '2026-04-07',
        owner: 'Data Protection Officer',
        summary: 'Any suspected breach is reported to the DPO within 1 h. Notification to the AEPD within 72 h of becoming aware unless the risk is unlikely; to data subjects without undue delay if the risk is high, unless the data were encrypted. Internal log of every breach.',
        sections: [
          { id: '1', heading: '1. Purpose and scope', text: [
            'Protect the personal data the firm processes as controller and as processor, and respond to security breaches within the GDPR deadlines, preserving professional secrecy.',
            'It applies to all professionals, systems (iManage, Gestor de expedientes, Outlook, Microsoft Teams) and suppliers of the firm.'
          ] },
          { id: '2', heading: '2. Basic measures', list: [
            'Client documents are only sent by email encrypted or through a secure iManage link, and the sender checks the recipient before sending.',
            'External email with matter attachments goes through the Outlook data loss prevention rule, which asks for confirmation if the recipient’s domain is not recorded in the matter.',
            'Client data are hosted in data centres in the European Union; any supplier processing data signs a data processing agreement (art. 28 GDPR).'
          ] },
          { id: '3', heading: '3. Detection and internal reporting', text: [
            'Any professional who detects or suspects a breach reports it to the Data Protection Officer and IT within 1 h, by Teams or by phone, without waiting to confirm it.',
            'The DPO opens the breach file, sets the time of awareness and coordinates containment with IT: recall of the message, revocation of links or access and account lockout.'
          ] },
          { id: '4', heading: '4. Assessment and notification to the AEPD', text: [
            'The DPO assesses the breach: type of data, special categories or data covered by professional secrecy, number of data subjects, whether the data were encrypted and whether individuals can be identified.',
            'If a risk to individuals’ rights is likely, the breach is notified to the AEPD (Spanish Data Protection Agency) within 72 h of becoming aware of it; if notified later, the reasons for the delay are given (art. 33 GDPR).',
            'The notification is prepared by the DPO and approved by the Managing Partner before it is sent through the AEPD electronic office.'
          ] },
          { id: '5', heading: '5. Communication to data subjects and clients', list: [
            'If the breach poses a high risk, it is communicated to data subjects without undue delay, in plain language and with the recommended measures (art. 34 GDPR).',
            'Communication to data subjects is not required if the data were encrypted so as to be unintelligible to anyone who accesses them.',
            'When the firm acts as processor or the data relate to a matter, the client is informed without undue delay, and the communication is approved by the Managing Partner.'
          ] },
          { id: '6', heading: '6. Artificial intelligence tools', text: [
            'Client data may only be entered into generative AI tools authorised by the firm and under the conditions of POL-IA-007 (Policy on the use of generative AI with client data).'
          ] },
          { id: '7', heading: '7. Records', list: [
            'Every breach, whether notified or not, is entered in the internal breach log with the facts, effects and measures taken (art. 33.5 GDPR).',
            'Breach file, assessment and notifications: Gestor de expedientes.',
            'Affected documents and accesses: iManage.'
          ] },
          { id: '8', heading: '8. References', refs: true, list: [
            'Regulation (EU) 2016/679, General Data Protection Regulation, articles 28, 32, 33 and 34.',
            'Ley Orgánica 3/2018, on the Protection of Personal Data and guarantee of digital rights (LOPDGDD).',
            'AEPD guide on the management and notification of personal data breaches.'
          ] }
        ]
      },
      {
        code: 'CAL-TRI-006',
        title: 'Tax calendar and return filing procedure',
        short: 'Tax calendar',
        type: 'Procedure',
        version: '12',
        date: '2026-01-08',
        owner: 'Tax Partner',
        summary: 'Deadlines for forms 200, 202, 303, 390 and 720. Draft approved by the client via Signaturit and filed at the AEAT e-office at least 3 business days before the deadline; receipt archived in iManage.',
        sections: [
          { id: '1', heading: '1. Purpose and scope', text: [
            'Ensure that the tax returns the firm files on behalf of its clients are prepared, approved and filed on time at the AEAT (Spanish Tax Agency) electronic office.',
            'It applies to clients with a tax compliance engagement with the Tax practice in Málaga and Córdoba.'
          ] },
          { id: '2', heading: '2. Deadlines for the main forms', list: [
            'Form 200 (Corporate Income Tax): within the 25 calendar days following the six months after the end of the tax period; for financial years matching the calendar year, from 1 to 25 July, and for those ending on 31 March, until 25 October.',
            'Form 202 (Corporate Income Tax instalment payments): from 1 to 20 April, October and December.',
            'Form 303 (VAT, quarterly return): from 1 to 20 April, July and October, and from 1 to 30 January for the fourth quarter.',
            'Form 390 (VAT, annual summary): from 1 to 30 January.',
            'Form 720 (assets and rights abroad): from 1 January to 31 March, when the value of any block of assets exceeds 50,000 €; in following years, only if that value increases by more than 20,000 €.'
          ] },
          { id: '3', heading: '3. Preparation and approval', list: [
            'The Tax practice requests the documentation from the client 20 calendar days before the deadline.',
            'The draft return is reviewed by a second professional of the practice, different from the one who prepared it.',
            'The client approves the draft via Signaturit; no return is filed without signed approval.'
          ] },
          { id: '4', heading: '4. Filing', text: [
            'Returns are filed at the AEAT electronic office, as a registered tax intermediary (colaborador social) or with the client’s power of representation, at least 3 business days before the deadline.',
            'When the return shows an amount payable by direct debit, the direct debit order is given at least five calendar days before the end of the period.',
            'If the Sede AEAT is unavailable on the last day, a screenshot of the error is kept and the return is filed as soon as the service is restored, informing the Tax Partner.'
          ] },
          { id: '5', heading: '5. Records', list: [
            'Calendar per client and due date alerts: Gestor de expedientes.',
            'Approved drafts and filing receipts: iManage.'
          ] },
          { id: '6', heading: '6. References', refs: true, list: [
            'Ley 27/2014, del Impuesto sobre Sociedades (Corporate Income Tax Act), articles 40 and 124.',
            'Ley 37/1992, del Impuesto sobre el Valor Añadido (VAT Act), and Orden HAC/3625/2003 (forms 303 and 390).',
            'Eighteenth additional provision of Ley 58/2003, General Tributaria (General Tax Act) (form 720).'
          ] }
        ]
      }
    ],

    unindexed: {
      'POL-IA-007': { title: 'Policy on the use of generative AI with client data', mentionedIn: { doc: 'PRO-RGPD-005', sec: '6', quote: 'under the conditions of POL-IA-007 (Policy on the use of generative AI with client data)' } }
    },

    suggested: ['plazo-computo', 'conflicto', 'diligencia-debida', 'desviacion', 'brecha', 'modelo-200'],

    intents: [
      {
        id: 'plazo-computo', icon: 'calendar', topic: 'Procedural deadlines · computation', scope: 'all',
        q: 'How is a procedural deadline computed?',
        anchors: ['procedural deadline', 'procedural deadlines', 'computed', 'compute', 'computation', 'business days', 'expires', 'due date'],
        terms: ['deadline', 'deadlines', 'how', 'count', 'counted', 'days', 'working', 'non-working', 'holidays', 'defence', 'claim'],
        min: 3,
        blocks: [
          { t: 'From the day after the notification is deemed served, excluding Saturdays, Sundays, national, regional and local holidays, and 24 and 31 December.', c: [['PRO-PLZ-001', 4, 'Procedural deadlines run from the day after the notification is deemed served and exclude non-working days: Saturdays, Sundays, national, regional and local holidays of the judicial district, and 24 and 31 December (arts. 133 LEC and 182 LOPJ).']] },
          { t: 'August is non-working, except for urgent proceedings.', c: [['PRO-PLZ-001', 4, 'August is non-working for court proceedings, except those the law declares urgent (art. 130.2 LEC)']] },
          { t: 'Two people compute it independently; if they differ, the shorter computation applies until the area partner decides.', c: [['PRO-PLZ-001', 4, 'Every deadline is computed independently by two people (Litigation secretariat and responsible lawyer); if the computations differ, the shorter one applies until the area partner settles it.']] },
          { t: 'It is logged with the legal due date and an internal due date 3 business days earlier.', c: [['PRO-PLZ-001', 5, 'Each deadline is logged with two dates: the legal due date and an internal due date 3 business days earlier, which is the team’s working date.']] }
        ],
        context: {
          systems: ['LexNET', 'Gestor de expedientes'],
          text: 'Ordinary claim against Aceites Sierra Subbética, S.L. (Court of First Instance no. 7 of Málaga, PO 1184/2026), served via LexNET at 08:12: 20 business days to file the defence, due on 27-10-2026. The assigned associate is on holiday and there is a possible conflict of interest (matter PRC-2026-0412).',
          outcome: 'alarma',
          go: 'alarma', goLabel: 'Open PO 1184/2026 alarm'
        },
        followups: ['agosto', 'presentacion']
      },
      {
        id: 'agosto', icon: 'clock', topic: 'Procedural deadlines · August and holidays', scope: 'all',
        q: 'Does August count for procedural deadlines?',
        anchors: ['august', 'holiday', 'holidays', 'non-working', '24 december', '31 december'],
        terms: ['count', 'working', 'deadline', 'deadlines', 'criminal', 'urgent', 'málaga', 'córdoba', 'local'],
        min: 3,
        blocks: [
          { t: 'No: August is non-working for court proceedings, except urgent ones; in criminal proceedings it is a working month for the investigation phase.', c: [['PRO-PLZ-001', 4, 'August is non-working for court proceedings, except those the law declares urgent (art. 130.2 LEC); in criminal proceedings, August is a working month for the investigation phase.']] },
          { t: '24 and 31 December and the local holidays of the judicial district do not count either: in Málaga, 19 August and 8 September; in Córdoba, 8 September and 24 October.', c: [['PRO-PLZ-001', 4, 'and 24 and 31 December'], ['PRO-PLZ-001', 4, 'Local holidays loaded into the Gestor de expedientes calendar: Málaga, 19 August and 8 September; Córdoba, 8 September and 24 October.']] },
          { t: 'Deadlines in months run from date to date and, if the last day is non-working, move to the next business day.', c: [['PRO-PLZ-001', 4, 'Deadlines set in months or years run from date to date; if the last day is a non-working day, the deadline is extended to the next business day (art. 133.3 and 4 LEC).']] }
        ],
        followups: ['plazo-computo']
      },
      {
        id: 'lexnet', icon: 'mail', topic: 'Procedural deadlines · LexNET notifications', scope: 'all',
        q: 'When is a LexNET notification deemed served?',
        anchors: ['lexnet', 'notification', 'notifications', 'communication', 'communications', 'court agent', 'procurador'],
        terms: ['when', 'deemed', 'served', 'made', 'received', 'receipt', 'access', 'days', 'log', 'download'],
        min: 3,
        blocks: [
          { t: 'On the business day after the court agent receives it; if nobody accesses it within three business days, it is deemed made.', c: [['PRO-PLZ-001', 3, 'Communications received by the court agent are deemed served on the business day following receipt (art. 151.2 LEC, Civil Procedure Act); if the addressee does not access them within three business days, the notification is deemed made (art. 162.2 LEC).']] },
          { t: 'The Litigation secretariat downloads and logs it the same day, links it to the matter and makes the first computation of the deadline.', c: [['PRO-PLZ-001', 3, 'LexNET notifications are downloaded and logged on the day they are received'], ['PRO-PLZ-001', 2, 'Litigation secretariat: downloads every day the LexNET notifications received by the court agents (procuradores), links them to the matter and makes the first computation of the deadline.']] },
          { t: 'If it expires in less than 5 business days, the area partner is alerted too.', c: [['PRO-PLZ-001', 5, 'If the deadline expires in less than 5 business days, the Gestor de expedientes alerts the practice area partner as well as the responsible lawyer.']] }
        ],
        context: {
          systems: ['LexNET', 'Gestor de expedientes', 'Microsoft Teams'],
          text: 'This protocol is the one turned into a workflow: when a LexNET notification arrives, identify the matter, compute the deadline, check conflicts, alert the lawyer on Teams and, if it expires in under 5 days, the partner.',
          go: 'workflow', goLabel: 'Open the LexNET workflow'
        },
        followups: ['plazo-computo', 'vacaciones']
      },
      {
        id: 'presentacion', icon: 'send', topic: 'Procedural deadlines · filing briefs', scope: 'all',
        q: 'Until what time can a brief be filed on the last day?',
        anchors: ['file', 'filed', 'filing', 'brief', 'briefs', '15:00', 'grace day'],
        terms: ['time', 'last', 'day', 'deadline', 'due', 'lexnet', 'down', 'unavailable', 'receipt'],
        min: 3,
        blocks: [
          { t: 'Until 15:00 on the business day after the due date, but the firm does not use that margin without the express authorisation of the area partner.', c: [['PRO-PLZ-001', 6, 'Time-limited briefs may be filed until 15:00 on the business day after the due date (art. 135.5 LEC), but the firm does not use that margin without the express authorisation of the area partner.']] },
          { t: 'If LexNET is down on the last day, a screenshot of the incident notice is kept and the brief is filed as soon as it is restored.', c: [['PRO-PLZ-001', 6, 'If LexNET is unavailable on the last day, a screenshot of the service incident notice is kept and the brief is filed as soon as the service is restored, recording it in the matter.']] },
          { t: 'The LexNET receipt is archived in iManage and closes the deadline.', c: [['PRO-PLZ-001', 6, 'The LexNET filing receipt is saved in iManage and closes the deadline in the Gestor de expedientes.']] }
        ],
        followups: ['plazo-computo', 'lexnet']
      },
      {
        id: 'vacaciones', icon: 'users', topic: 'Procedural deadlines · lawyer absent', scope: 'all',
        q: 'What happens to a deadline if the responsible lawyer is on holiday?',
        anchors: ['on holiday', 'vacation', 'absent', 'absence', 'on leave', 'substitute', 'reassign', 'reassigned'],
        terms: ['lawyer', 'responsible', 'deadline', 'matter', 'partner', 'happens', 'who'],
        min: 3,
        blocks: [
          { t: 'The Litigation secretariat informs the area partner the same day so the matter can be reassigned.', c: [['PRO-PLZ-001', 5, 'If the responsible lawyer is on holiday or on leave, the Litigation secretariat informs the area partner the same day so the matter can be reassigned.']] },
          { t: 'The practice area partner appoints the substitute and supervises deadlines expiring in less than 5 business days.', c: [['PRO-PLZ-001', 2, 'Practice area partner: supervises deadlines expiring in less than 5 business days and appoints a substitute if the responsible lawyer is absent.']] }
        ],
        context: {
          systems: ['Gestor de expedientes', 'Microsoft Teams'],
          text: 'PO 1184/2026 (Aceites Sierra Subbética): the assigned associate is on holiday; the agent proposes reassigning matter PRC-2026-0412 as soon as the possible conflict is resolved.',
          outcome: 'alarma',
          go: 'alarma', goLabel: 'Open PO 1184/2026 alarm'
        },
        followups: ['plazo-computo', 'conflicto']
      },
      {
        id: 'conflicto', icon: 'scale', topic: 'Conflicts of interest · potential conflict', scope: 'all',
        q: 'What do we do if we detect a possible conflict of interest?',
        anchors: ['conflict of interest', 'conflicts of interest', 'conflict', 'conflicts', 'opposing interests'],
        terms: ['possible', 'potential', 'detect', 'do', 'engagement', 'accept', 'client', 'decides', 'compliance'],
        min: 3,
        blocks: [
          { t: 'The engagement is not accepted and no step is taken: it is reported to Compliance, which reports within 24 h, and the Managing Partner decides.', c: [['POL-CON-002', 3, 'In the event of a potential conflict, the lawyer neither accepts the engagement nor takes any step: they report it to Compliance, which issues a report within 24 h, and the Managing Partner decides.']] },
          { t: 'The firm never defends two clients with opposing interests in the same or related matters.', c: [['POL-CON-002', 3, 'The firm does not advise or defend two clients with opposing interests in the same or related matters.']] },
          { t: 'If the conflict is not resolved, the client is told in writing in time to appoint another lawyer before any deadline expires.', c: [['POL-CON-002', 3, 'If the conflict is not resolved, the client is told in writing that the firm cannot accept the engagement, with enough time to appoint another lawyer before any deadline expires.']] },
          { t: 'If authorised, the matter is restricted in iManage and the Gestor de expedientes to the assigned professionals.', c: [['POL-CON-002', 5, 'the matter is restricted in iManage and in the Gestor de expedientes to the assigned professionals, and every access is logged']] }
        ],
        context: {
          systems: ['Gestor de expedientes', 'LexNET'],
          text: 'PO 1184/2026 against Aceites Sierra Subbética, S.L.: the firm advised the claimant in 2025. Potential conflict under article 12 of the Bar Code of Conduct; the agent blocks acceptance of the engagement until the Managing Partner decides.',
          outcome: 'alarma',
          go: 'alarma', goLabel: 'Open PO 1184/2026 alarm'
        },
        followups: ['antiguo-cliente', 'apertura']
      },
      {
        id: 'antiguo-cliente', icon: 'user-check', topic: 'Conflicts of interest · former clients', scope: 'all',
        q: 'Can we act against a former client?',
        anchors: ['former client', 'former clients', 'ex-client', 'previous client', 'against a client'],
        terms: ['act', 'can', 'against', 'sue', 'information', 'secrecy', 'engagement', 'earlier'],
        min: 2,
        blocks: [
          { t: 'Only if there is no risk of using information obtained in the earlier engagement or of breaching professional secrecy; the Managing Partner decides on a Compliance report.', c: [['POL-CON-002', 3, 'An engagement against a former client is only accepted if there is no risk of using information obtained in the earlier engagement or of breaching professional secrecy; the Managing Partner decides on a Compliance report.']] },
          { t: 'The conflict search covers matters closed in the last 10 years, including enquiries that never became an engagement.', c: [['POL-CON-002', 2, 'The search covers open matters and those closed in the last 10 years, including enquiries that never became an engagement.']] }
        ],
        followups: ['conflicto']
      },
      {
        id: 'apertura', icon: 'clipboard', topic: 'Engagement acceptance · opening a matter', scope: 'all',
        q: 'What is needed to open a new matter?',
        anchors: ['open a matter', 'new matter', 'opening', 'accept an engagement', 'acceptance', 'new engagement', 'new client'],
        terms: ['needed', 'requirements', 'open', 'matter', 'engagement', 'approves', 'need'],
        min: 2,
        blocks: [
          { list: [
            { t: 'Conflict search with no conflict, or potential conflict resolved by the Managing Partner.', c: [['POL-CON-002', 4, 'Conflict search with no conflict, or potential conflict resolved by the Managing Partner.']] },
            { t: 'Anti-money laundering due diligence completed if the engagement is subject to Ley 10/2010.', c: [['POL-CON-002', 4, 'Anti-money laundering due diligence completed when the engagement is subject to Ley 10/2010, under MAN-PBC-003.']] },
            { t: 'Engagement letter signed by the client.', c: [['POL-CON-002', 4, 'Engagement letter signed by the client under POL-HON-004.']] }
          ] },
          { t: 'Acceptance and the first communication to the client are approved by the area partner, or by the Managing Partner if there was a potential conflict.', c: [['POL-CON-002', 4, 'Acceptance and the first communication to the client are approved by the area partner; engagements with a potential conflict, by the Managing Partner.']] }
        ],
        followups: ['conflicto', 'diligencia-debida', 'hoja-encargo']
      },
      {
        id: 'diligencia-debida', icon: 'shield-check', topic: 'AML/CFT · due diligence', scope: 'all',
        q: 'What due diligence must be done on a new client?',
        anchors: ['due diligence', 'kyc', 'beneficial owner', 'identification', 'money laundering', 'aml'],
        terms: ['client', 'new', 'company', 'document', '25', 'capital', 'invoice', 'step', 'done'],
        min: 2,
        blocks: [
          { t: 'Formal identification with a reliable document before any step in an engagement subject to the Act.', c: [['MAN-PBC-003', 3, 'Formal identification of the client with a reliable document before any step is taken in an engagement subject to the Act.']] },
          { t: 'If it is a company, identification of the beneficial owner (more than 25 % of capital or votes) using the Beneficial Ownership Register and the Companies Register.', c: [['MAN-PBC-003', 3, 'Identification of the beneficial owner when the client is a legal entity: whoever owns or controls more than 25 % of the capital or voting rights, checking the Beneficial Ownership Register and the Companies Register.']] },
          { t: 'Purpose of the engagement and, if the profile requires it, source of funds.', c: [['MAN-PBC-003', 3, 'Purpose and nature of the engagement and, where the profile requires it, source of funds.']] },
          { t: 'Until it is complete, no step subject to the Act is taken and nothing is billed.', c: [['MAN-PBC-003', 3, 'Until due diligence is complete in the Gestor de expedientes, no step subject to the Act is taken and no invoice is issued.']] }
        ],
        context: {
          systems: ['Gestor de expedientes'],
          text: 'The daily summary flags AML matters with incomplete due diligence: until it is completed, no work can be done or billed on them.',
          go: 'turno', goLabel: 'Open the daily summary'
        },
        followups: ['pbc-ambito', 'pep', 'sospechosa']
      },
      {
        id: 'pbc-ambito', icon: 'book-open', topic: 'AML/CFT · engagements subject to the Act', scope: 'all',
        q: 'When is the firm subject to Ley 10/2010?',
        anchors: ['ley 10/2010', 'obliged entity', 'subject', 'engagements subject', 'aml act'],
        terms: ['when', 'firm', 'lawyer', 'purchase', 'real estate', 'companies', 'defence', 'court', 'advice'],
        min: 2,
        blocks: [
          { t: 'When it takes part in the purchase or sale of real estate or businesses, manages client funds, securities or accounts, creates or manages companies or trusts, or acts on the client’s behalf in financial or real estate transactions.', c: [['MAN-PBC-003', 1, 'The firm is an obliged entity when it takes part in the purchase or sale of real estate or businesses, the management of client funds or securities, the opening or management of accounts, the creation, management or direction of companies or trusts, or acts on the client’s behalf in financial or real estate transactions (art. 2.1.ñ Ley 10/2010).']] },
          { t: 'Court defence and advice on the client’s legal position are not subject to reporting, unless the lawyer knows the client seeks advice to launder money.', c: [['MAN-PBC-003', 1, 'Defending a client in court proceedings and advising on the client’s legal position are not subject to reporting, unless the lawyer knows the client is seeking advice in order to launder money (art. 22 Ley 10/2010).']] }
        ],
        followups: ['diligencia-debida', 'sospechosa']
      },
      {
        id: 'pep', icon: 'user', topic: 'AML/CFT · enhanced due diligence', scope: 'all',
        q: 'What due diligence applies to a politically exposed person?',
        anchors: ['pep', 'peps', 'politically exposed', 'enhanced due diligence', 'high risk', 'family members'],
        terms: ['diligence', 'applies', 'client', 'approval', 'wealth', 'funds', 'country', 'countries', 'cash'],
        min: 2,
        blocks: [
          { t: 'Enhanced due diligence: the Managing Partner and the Head of Compliance approve the engagement, and the source of wealth and funds is verified; also for family members and close associates.', c: [['MAN-PBC-003', 4, 'Politically exposed persons (PEPs), their family members and close associates: approval of the engagement by the Managing Partner and the Head of Compliance, and verification of the source of wealth and funds.']] },
          { t: 'It is also enhanced for high-risk countries, corporate structures with no apparent rationale and payments in cash or from third parties.', c: [['MAN-PBC-003', 4, 'Clients, funds or transactions linked to high-risk countries identified by the FATF or the European Commission.'], ['MAN-PBC-003', 4, 'Complex corporate structures or ones with no apparent economic rationale, and payments in cash or from unrelated third parties.']] }
        ],
        followups: ['diligencia-debida', 'sospechosa']
      },
      {
        id: 'sospechosa', icon: 'search', topic: 'AML/CFT · suspicious transactions', scope: 'all',
        q: 'What do I do if I suspect a client is laundering money?',
        anchors: ['laundering', 'launder', 'suspicious', 'suspect', 'sepblac', 'special review', 'indicator'],
        terms: ['client', 'transaction', 'report', 'tell', 'disclose', 'do', 'money'],
        min: 2,
        blocks: [
          { t: 'Report it to the Head of Compliance through the internal channel, without informing the client, and refrain from executing the transaction while it is reviewed.', c: [['MAN-PBC-003', 5, 'Any professional who detects an indicator reports it to the Head of Compliance through the internal channel, without informing the client.'], ['MAN-PBC-003', 5, 'While the review is under way, the lawyer refrains from executing the suspicious transaction.']] },
          { t: 'Compliance carries out the special review and, if there is an indication or certainty, reports it to SEPBLAC without delay, after convening the AML Committee.', c: [['MAN-PBC-003', 5, 'The Head of Compliance carries out the special review and, if there is an indication or certainty of money laundering, reports it to SEPBLAC without delay, after a meeting of the AML Committee.']] },
          { t: 'It is forbidden to disclose to the client or third parties that it has been reported or is under review.', c: [['MAN-PBC-003', 5, 'It is forbidden to disclose to the client or to third parties that a transaction has been reported or is under review (art. 24 Ley 10/2010).']] },
          { t: 'Records are kept for 10 years.', c: [['MAN-PBC-003', 6, 'Due diligence and transaction records are kept for 10 years from the end of the business relationship or from the transaction.']] }
        ],
        followups: ['pbc-ambito', 'pep']
      },
      {
        id: 'hoja-encargo', icon: 'file-text', topic: 'Fees · engagement letter', scope: 'all',
        q: 'What must the engagement letter include?',
        anchors: ['engagement letter', 'engagement letters', 'letter of engagement', 'budget', 'retainer'],
        terms: ['include', 'content', 'sign', 'signed', 'client', 'fees', 'scope', 'consumer', 'must'],
        min: 2,
        blocks: [
          { t: 'Client identification, scope of the engagement and what is excluded, assigned professionals, fee calculation, budget, retainer, expenses and disbursements, and taxes.', c: [['POL-HON-004', 2, 'The engagement letter sets out: client identification, scope of the engagement and what is excluded, assigned professionals, how fees are calculated, estimated budget, retainer, expenses and disbursements, and applicable taxes.']] },
          { t: 'It is signed before work starts, via Signaturit or on paper; authorised urgent steps are formalised within 5 business days.', c: [['POL-HON-004', 2, 'No work starts without an engagement letter signed by the client, via Signaturit or on paper, except urgent steps authorised by the area partner, which are formalised within 5 business days.']] },
          { t: 'If the client is a consumer, it includes the prior information required by consumer law and the right to request a fixed quote.', c: [['POL-HON-004', 2, 'When the client is a consumer, the letter also includes the prior information required by consumer law and the right to request a fixed quote.']] }
        ],
        followups: ['desviacion', 'apertura']
      },
      {
        id: 'desviacion', icon: 'euro', topic: 'Fees · budget overruns', scope: 'all',
        q: 'What happens if fees exceed the engagement letter budget?',
        anchors: ['exceed the budget', 'overrun', 'overruns', 'excess', 'bill', 'bills', 'fees'],
        terms: ['budget', 'exceed', 'exceeds', 'invoice', 'billed', 'client', 'accepts', '10', 'report', 'progress', 'hours'],
        min: 3,
        blocks: [
          { t: 'If they are going to exceed the budget by more than 10 %, the lawyer informs the client in writing before continuing, with the reason and the new estimate.', c: [['POL-HON-004', 4, 'If expected fees are going to exceed the engagement letter budget by more than 10 %, the responsible lawyer informs the client in writing before continuing, with the reason and the new estimate.']] },
          { t: 'The excess is only billed if the client accepts it in writing; otherwise billing stops at the budget.', c: [['POL-HON-004', 4, 'The excess is only billed if the client accepts it in writing; if not, billing stops at the budget and the area partner decides whether to continue with the engagement.']] },
          { t: 'In engagements of more than three months, the client receives a monthly progress report with hours accumulated against the budget.', c: [['POL-HON-004', 5, 'In engagements lasting more than three months, the responsible lawyer sends the client a monthly progress report with the work done, next steps and hours accumulated against the budget.']] }
        ],
        context: {
          systems: ['Gestor de expedientes', 'Outlook'],
          text: 'Grupo Hostelero Costa del Sol, S.L. disputes invoice F-2026-0938 from the Corporate practice (18,400 €), which it considers higher than the engagement letter, and complains of a lack of information on the progress of the matter (matter REC-2026-0057).',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Open Grupo Hostelero complaint'
        },
        followups: ['queja-minuta', 'hoja-encargo']
      },
      {
        id: 'queja-minuta', icon: 'message-square', topic: 'Fees · complaints about bills', scope: 'all',
        q: 'How long do we have to reply to a complaint about fees?',
        anchors: ['complaint', 'complaints', 'complaint about fees', 'disputes', 'dispute'],
        terms: ['long', 'reply', 'answer', 'acknowledgement', 'days', 'bill', 'invoice', 'fees', 'bar association', 'credit'],
        min: 3,
        blocks: [
          { list: [
            { t: 'Acknowledgement within 48 h, and collection of the disputed invoice is suspended.', c: [['POL-HON-004', 6, 'Complaints about bills are logged by Client Care and Billing, which sends an acknowledgement within 48 h and suspends collection of the disputed invoice while the complaint is handled.']] },
            { t: 'Reasoned reply within 15 days of receipt, with an analysis of the hours recorded against the engagement letter.', c: [['POL-HON-004', 6, 'A reasoned reply is sent within 15 days of receipt, with an analysis of the hours recorded against the engagement letter']] }
          ] },
          { t: 'It is approved by the area partner and, if it proposes a credit, by the Managing Partner; if the client disagrees, they may ask the Bar Association for an opinion.', c: [['POL-HON-004', 6, 'it is approved by the area partner and, if it proposes a credit, by the Managing Partner'], ['POL-HON-004', 6, 'If the client disagrees, they are told they may ask the Bar Association for an opinion on the fees.']] }
        ],
        context: {
          systems: ['Gestor de expedientes', 'Outlook'],
          text: 'Complaint from Grupo Hostelero Costa del Sol about invoice F-2026-0938 (18,400 €): reasoned reply within 15 days, with the analysis of the Corporate practice’s recorded hours.',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Open Grupo Hostelero complaint'
        },
        followups: ['desviacion']
      },
      {
        id: 'brecha', icon: 'shield', topic: 'Data protection · breach notification', scope: 'all',
        q: 'Within what deadline must a data breach be notified to the AEPD?',
        anchors: ['breach', 'breaches', 'aepd', 'security incident', 'notify', 'data leak'],
        terms: ['deadline', 'hours', '72', 'data', 'personal', 'notification', 'email', 'recipient', 'wrong'],
        min: 2,
        blocks: [
          { t: 'Within 72 h of becoming aware, if a risk to individuals’ rights is likely; if notified later, the reasons for the delay are given.', c: [['PRO-RGPD-005', 4, 'If a risk to individuals’ rights is likely, the breach is notified to the AEPD (Spanish Data Protection Agency) within 72 h of becoming aware of it; if notified later, the reasons for the delay are given (art. 33 GDPR).']] },
          { t: 'Whoever detects it alerts the DPO and IT within 1 h, without waiting to confirm it.', c: [['PRO-RGPD-005', 3, 'Any professional who detects or suspects a breach reports it to the Data Protection Officer and IT within 1 h, by Teams or by phone, without waiting to confirm it.']] },
          { t: 'The notification is prepared by the DPO and approved by the Managing Partner.', c: [['PRO-RGPD-005', 4, 'The notification is prepared by the DPO and approved by the Managing Partner before it is sent through the AEPD electronic office.']] },
          { t: 'Every breach, notified or not, goes into the internal breach log.', c: [['PRO-RGPD-005', 7, 'Every breach, whether notified or not, is entered in the internal breach log with the facts, effects and measures taken (art. 33.5 GDPR).']] }
        ],
        context: {
          systems: ['iManage', 'Outlook', 'Gestor de expedientes'],
          text: 'Drill RGPD-2609-03: an email with the due diligence report on Promociones Guadalhorce, S.A. was sent to the wrong recipient. The 72 h clock for the AEPD runs from the time of awareness.',
          lot: 'RGPD-2609-03',
          go: 'retirada', goLabel: 'Open drill RGPD-2609-03'
        },
        followups: ['brecha-interesados', 'envio-correo']
      },
      {
        id: 'brecha-interesados', icon: 'users', topic: 'Data protection · communication to data subjects', scope: 'all',
        q: 'When must data subjects be told about a breach?',
        anchors: ['data subjects', 'affected', 'tell', 'inform', 'high risk', 'encrypted', 'encryption'],
        terms: ['breach', 'when', 'client', 'clients', 'data', 'risk', 'processor'],
        min: 3,
        blocks: [
          { t: 'If the breach poses a high risk, without undue delay, in plain language and with the recommended measures.', c: [['PRO-RGPD-005', 5, 'If the breach poses a high risk, it is communicated to data subjects without undue delay, in plain language and with the recommended measures (art. 34 GDPR).']] },
          { t: 'It is not needed if the data were encrypted and unintelligible to whoever accesses them.', c: [['PRO-RGPD-005', 5, 'Communication to data subjects is not required if the data were encrypted so as to be unintelligible to anyone who accesses them.']] },
          { t: 'If it affects a matter or the firm acts as processor, the client is informed without undue delay, with the Managing Partner’s approval.', c: [['PRO-RGPD-005', 5, 'When the firm acts as processor or the data relate to a matter, the client is informed without undue delay, and the communication is approved by the Managing Partner.']] }
        ],
        followups: ['brecha']
      },
      {
        id: 'envio-correo', icon: 'lock', topic: 'Data protection · sending documents', scope: 'all',
        q: 'How are a client’s documents sent by email?',
        anchors: ['send documents', 'sent', 'send', 'email', 'attachments', 'secure link', 'encrypted'],
        terms: ['documents', 'client', 'how', 'recipient', 'outlook', 'external', 'imanage'],
        min: 3,
        blocks: [
          { t: 'Only encrypted or through a secure iManage link, checking the recipient before sending.', c: [['PRO-RGPD-005', 2, 'Client documents are only sent by email encrypted or through a secure iManage link, and the sender checks the recipient before sending.']] },
          { t: 'Outlook asks for confirmation if the recipient’s domain is not recorded in the matter.', c: [['PRO-RGPD-005', 2, 'External email with matter attachments goes through the Outlook data loss prevention rule, which asks for confirmation if the recipient’s domain is not recorded in the matter.']] },
          { t: 'If a message goes wrong, IT recalls it and revokes links or access as containment.', c: [['PRO-RGPD-005', 3, 'coordinates containment with IT: recall of the message, revocation of links or access and account lockout']] }
        ],
        context: {
          systems: ['Outlook', 'iManage'],
          text: 'In drill RGPD-2609-03, the first thing checked is whether the Promociones Guadalhorce report was encrypted: that decides whether data subjects must be told.',
          lot: 'RGPD-2609-03',
          go: 'retirada', goLabel: 'Open drill RGPD-2609-03'
        },
        followups: ['brecha', 'brecha-interesados']
      },
      {
        id: 'modelo-200', icon: 'calendar', topic: 'Tax calendar · Corporate Income Tax', scope: 'all',
        q: 'When is Corporate Income Tax form 200 due?',
        anchors: ['form 200', '200', 'corporate income tax', 'corporate tax', 'cit'],
        terms: ['due', 'deadline', 'when', 'file', 'financial year', 'october', 'july', 'return'],
        min: 3,
        blocks: [
          { t: 'Within the 25 calendar days following the six months after the year end: from 1 to 25 July if it matches the calendar year, and until 25 October if the year ended on 31 March.', c: [['CAL-TRI-006', 2, 'Form 200 (Corporate Income Tax): within the 25 calendar days following the six months after the end of the tax period; for financial years matching the calendar year, from 1 to 25 July, and for those ending on 31 March, until 25 October.']] },
          { t: 'The firm files it at least 3 business days before the deadline, with the draft approved by the client via Signaturit.', c: [['CAL-TRI-006', 4, 'at least 3 business days before the deadline'], ['CAL-TRI-006', 3, 'The client approves the draft via Signaturit; no return is filed without signed approval.']] },
          { t: 'If an amount is payable by direct debit, the order is given at least five calendar days before the end of the period.', c: [['CAL-TRI-006', 4, 'When the return shows an amount payable by direct debit, the direct debit order is given at least five calendar days before the end of the period.']] }
        ],
        context: {
          systems: ['Sede AEAT', 'Gestor de expedientes', 'Signaturit'],
          text: 'Clients whose financial year ended on 31 March: form 200 is due on 25 October, and October also brings the form 202 instalment payment (1 to 20). Both appear in the daily summary.',
          go: 'turno', goLabel: 'Open the daily summary'
        },
        followups: ['modelos-iva', 'modelo-720']
      },
      {
        id: 'modelos-iva', icon: 'list-checks', topic: 'Tax calendar · 202, 303 and 390', scope: 'all',
        q: 'When are forms 202, 303 and 390 filed?',
        anchors: ['form 202', 'form 303', 'form 390', '202', '303', '390', 'vat', 'instalment', 'instalments'],
        terms: ['when', 'filed', 'deadline', 'quarter', 'quarterly', 'annual', 'summary', 'april', 'october', 'january'],
        min: 2,
        blocks: [
          { list: [
            { t: 'Form 202: from 1 to 20 April, October and December.', c: [['CAL-TRI-006', 2, 'Form 202 (Corporate Income Tax instalment payments): from 1 to 20 April, October and December.']] },
            { t: 'Form 303: from 1 to 20 April, July and October, and from 1 to 30 January for the fourth quarter.', c: [['CAL-TRI-006', 2, 'Form 303 (VAT, quarterly return): from 1 to 20 April, July and October, and from 1 to 30 January for the fourth quarter.']] },
            { t: 'Form 390: from 1 to 30 January.', c: [['CAL-TRI-006', 2, 'Form 390 (VAT, annual summary): from 1 to 30 January.']] }
          ] },
          { t: 'Documentation is requested from the client 20 calendar days in advance and a second professional reviews the draft.', c: [['CAL-TRI-006', 3, 'The Tax practice requests the documentation from the client 20 calendar days before the deadline.'], ['CAL-TRI-006', 3, 'The draft return is reviewed by a second professional of the practice, different from the one who prepared it.']] }
        ],
        followups: ['modelo-200']
      },
      {
        id: 'modelo-720', icon: 'globe', topic: 'Tax calendar · assets abroad', scope: 'all',
        q: 'Who has to file form 720?',
        anchors: ['form 720', '720', 'assets abroad', 'abroad'],
        terms: ['who', 'file', 'deadline', 'block', 'value', 'accounts', 'increases', 'obliged'],
        min: 2,
        blocks: [
          { t: 'Anyone holding a block of assets or rights abroad worth more than 50,000 €; it is filed from 1 January to 31 March.', c: [['CAL-TRI-006', 2, 'Form 720 (assets and rights abroad): from 1 January to 31 March, when the value of any block of assets exceeds 50,000 €']] },
          { t: 'In following years, only if that value increases by more than 20,000 €.', c: [['CAL-TRI-006', 2, 'in following years, only if that value increases by more than 20,000 €']] }
        ],
        followups: ['modelo-200']
      },
      {
        id: 'ia-generativa', icon: 'cpu', topic: 'Generative AI · client data', scope: 'all', kind: 'partial',
        q: 'Can generative AI tools be used with client documents?',
        anchors: ['generative ai', 'artificial intelligence', 'chatgpt', 'copilot', 'ai', 'pol-ia-007'],
        terms: ['use', 'used', 'tools', 'documents', 'clients', 'data', 'can', 'authorised'],
        min: 2,
        blocks: [
          { t: 'Only in tools authorised by the firm and under the conditions of POL-IA-007.', c: [['PRO-RGPD-005', 6, 'Client data may only be entered into generative AI tools authorised by the firm and under the conditions of POL-IA-007 (Policy on the use of generative AI with client data).']] },
          { t: 'Like any supplier processing data, the tool must host it in the European Union and sign a data processing agreement.', c: [['PRO-RGPD-005', 2, 'Client data are hosted in data centres in the European Union; any supplier processing data signs a data processing agreement (art. 28 GDPR).']] }
        ],
        note: 'POL-IA-007 (Policy on the use of generative AI with client data) is not among the indexed documents: which tools are authorised and under what conditions cannot be detailed from this search.',
        context: {
          systems: ['iManage'],
          text: 'Banca Mediterránea’s panel onboarding questionnaire asks about the use of generative AI with client data: a full answer needs POL-IA-007.',
          go: 'cuestionario', goLabel: 'Open Banca Mediterránea questionnaire'
        },
        followups: ['envio-correo', 'brecha']
      }
    ],

    gaps: [
      { id: 'jurisprudencia', topic: 'Case law and legal doctrine', anchors: ['case law', 'judgment', 'judgments', 'supreme court', 'doctrine', 'aranzadi', 'precedent'],
        reason: 'Case law and legal doctrine are consulted in Aranzadi; they are not part of the indexed internal manual.' },
      { id: 'tarifas', topic: 'Hourly rates', anchors: ['hourly rate', 'hourly rates', 'how much do we charge', 'rate per hour', 'per hour'],
        reason: 'The current hourly rates by category are not among the indexed documents; the fees policy only says they are set out in the engagement letter.' },
      { id: 'laboral', topic: 'Working conditions', anchors: ['remote working', 'working from home', 'payroll', 'salary', 'collective agreement', 'working hours', 'days off'],
        reason: 'Working conditions for the firm’s staff are not part of the indexed internal manual.' },
      { id: 'ia-detalle', topic: 'Generative AI policy', anchors: ['authorised tools', 'which tools', 'pol-ia-007', 'chatgpt'],
        reason: 'No indexed document details which generative AI tools are authorised or under what conditions.', related: 'POL-IA-007' },
      { id: 'penal', topic: 'Criminal proceedings', anchors: ['criminal complaint', 'police report', 'criminal investigation', 'speedy trial', 'detainee', 'duty roster'],
        reason: 'No indexed document describes on-call duty or criminal proceedings, beyond how August is counted.' },
      { id: 'seguro', topic: 'Professional indemnity insurance', anchors: ['insurance', 'professional indemnity', 'policy number', 'insurer', 'claim notification'],
        reason: 'The professional indemnity insurance policy and claims notification are not among the indexed documents.' }
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
})('abogados');
