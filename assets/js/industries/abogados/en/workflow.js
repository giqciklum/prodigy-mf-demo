/* Mora & Jordano · From words to workflow (English). Synthetic demonstration data (MFM): people, clients and matters are fictitious.
 * Same structure as ../workflow.js. Schema in the header of assets/js/scenes/workflow.js. Regex on folded text (lower case, no accents). */
agenticPackEn('abogados', {
  workflow: {
    space: 'Firm · Málaga',
    author: 'decider',
    authorNoun: 'Firm Management',
    alarmMatch: 'lexnet|notification|notificaci[oó]n',
    approverRoles: ['decider', 'procesal', 'fiscal', 'mercantil', 'civil', 'compliance', 'client_care'],
    feminineRoles: ['fiscal', 'civil'],
    noArticleRoles: ['client_care', 'it'],
    defaultPolicy: 'POL-CON-002',
    approverRule: {
      policy: 'POL-CON-002',
      text: 'only the Managing Partner or the Head of Litigation accepts engagements with a possible conflict of interest',
      note: 'Reassigned: POL-CON-002 reserves acceptance of engagements with a possible conflict to the partners'
    },
    triggerExamples: '“When a LexNET notification arrives…” or “Every working day at 07:30…”',
    rolePatterns: [
      ['procesal', '\\bhead of litigation\\b|\\blitigation partner\\b'],
      ['procesal_staff', '\\bsenior associate(?:,)? (?:in )?litigation\\b|\\blitigation associate\\b'],
      ['fiscal', '\\bhead of tax\\b|\\btax partner\\b'],
      ['mercantil', '\\bhead of corporate(?: and commercial)?\\b|\\bcorporate partner\\b'],
      ['civil', '\\bhead of civil(?: law)?\\b|\\bcivil law partner\\b'],
      ['compliance', '\\bcompliance officer\\b'],
      ['dpo', '\\bdata protection officer\\b|\\bdpo\\b'],
      ['client_care', '\\bclient care(?: and billing)?\\b'],
      ['it', '\\binformation security\\b'],
      ['decider', '\\bmanaging partner\\b']
    ],
    outOfScope: [
      {
        id: 'presentacion',
        re: '\\b(?:file|files|filed|filing|submit\\w*|lodg\\w*)\\b[^.;]{0,40}\\b(?:pleadings?|briefs?|claims?|defen[cs]es?|appeals?|statements? of defen[cs]e|tax returns?|returns?|forms? \\d{3})\\b[^.;]{0,40}\\b(?:lexnet|aeat|tax agency|courts?)\\b',
        title: 'Filing pleadings or tax returns',
        body: 'The text asks to file a pleading in LexNET or a tax return with the AEAT (Spanish Tax Agency) on its own. In the Firm · Málaga space, agents prepare drafts, but no pleading or tax form is filed without review and signature by the responsible lawyer or adviser: Agentic Platform does not create steps that file on the firm’s behalf.'
      },
      {
        id: 'personas',
        re: '\\b(?:evaluat\\w*|assess\\w*|scor\\w*|monitor\\w*|track\\w*|measur\\w*|sanction\\w*|dismiss\\w*|fire|rank\\w*)\\b[^.;]{0,40}\\b(?:workers?|employees?|associates|lawyers|solicitors|trainees|staff|people|personnel)\\b',
        title: 'Assessment of people',
        body: 'The text asks to assess, monitor or score lawyers or employees. Workflows in this space work on notifications, deadlines, matters and fee notes; they do not rate anyone’s performance.'
      },
      {
        id: 'contrario',
        re: '\\b(?:contact\\w*|writ\\w*|call\\w*|email\\w*|send\\w*|negotiat\\w*)\\b[^.;]{0,40}\\b(?:opposing party|other side|opposing counsel|the judge|judges|magistrates?)\\b',
        title: 'Contacting the opposing party or the court',
        body: 'The text asks an agent to address the opposing party or the court. The Código Deontológico de la Abogacía (Spanish Bar Code of Conduct) reserves those communications to the lawyer (where the other party has counsel, only through that counsel), so Agentic Platform does not create steps that speak on the firm’s behalf.'
      }
    ],
    idle: [
      ['bell', 'brand', 'Trigger', 'A LexNET notification, an email in the client care mailbox or a set time.'],
      ['cpu', '', 'Steps and systems', 'Which agent performs each step and which system it reads or updates: LexNET, Gestor de expedientes, iManage, Sede AEAT, Outlook or Teams.'],
      ['user-check', 'warn', 'Human approval', 'Who decides before an engagement is accepted, a corrective invoice is issued or a client is answered, under POL-CON-002 and POL-HON-004.'],
      ['file-text', '', 'Outputs', 'Deadline calculations, calendar entries, notices to lawyers, case files and replies produced by the workflow.']
    ],
    idleNote: 'Each element is linked to the sentence it comes from and checked against the deadline protocol, the conflicts policy and the fees policy before the draft is saved.',
    presenter: {
      idle: [
        'This is how the firm writes a procedure: in plain English, as in its internal manual. Nothing to draw, nothing to program.',
        'Agentic Platform turns it into a platform workflow: trigger, agents in order, human approval and outputs, each linked to its sentence.',
        'To be clear: text-to-workflow generation is simulated here and its integration into Agentic Platform is validated in the pilot; workflows (Routines), the editor, approval and auditing are standard.'
      ],
      outOfScopeExample: 'When a deadline is about to expire, automatically file the pleading in LexNET without the lawyer reviewing it'
    },

    templates: {
      alarma: {
        label: 'LexNET notification',
        icon: 'scale',
        refs: 'PRO-PLZ-001 and POL-CON-002',
        text: 'When a LexNET notification arrives, identify the matter in the Gestor de expedientes and the notified document in iManage. Calculate the deadline in working days under the LEC, excluding August and Málaga public holidays. Check for conflicts of interest with the parties to the matter; if there is a possible conflict, acceptance of the engagement must be approved by the Managing Partner before going any further. Notify the responsible lawyer via Teams within 30 minutes, and record the due date in the firm’s calendar. The notification must be reviewed and assigned within 4 hours; if more than 5 hours pass without assignment, treat it as critical and notify the Head of Litigation.'
      },
      reclamacion: {
        label: 'Fee complaint',
        icon: 'mail',
        refs: 'POL-HON-004 and RD 135/2021',
        text: 'When a client complaint about a fee note reaches the client care mailbox, log it in the Gestor de expedientes (client, matter, invoice, amount and engagement letter) and send the acknowledgement of receipt within 48 hours. Analyse the hours recorded on the matter against the engagement letter and the retainers, item by item. Propose, where appropriate, a corrective invoice or a partial credit on the fee note. Prepare the complaint file under POL-HON-004, with the progress updates sent to the client in the last 6 months, and the reply to the client. The corrective invoice and the reply are approved by the Head of Corporate and Commercial before they are issued; the file is resolved within 15 days.'
      },
      parte: {
        label: 'Daily summary',
        icon: 'clipboard',
        refs: 'PRO-PLZ-001 and CAL-TRI-006',
        text: 'Every working day at 07:30, review the court deadlines and tax due dates in LexNET, the Gestor de expedientes and the Sede AEAT (pending notifications, deadlines falling due this week, forms 200, 202 and 303, unrecorded hours and incomplete AML due diligence) and compare them with the deadline control protocol. For each deadline at warning or critical level, assign a task in the Gestor de expedientes to the lawyer on the matter, without duplicating tasks that are already open. If a matter has had a conflict of interest pending for more than 48 h, propose blocking or accepting the engagement, which must be approved by the Managing Partner. Publish the daily summary in the firm’s Teams channel.'
      }
    },

    catalog: {
      lexnet_intake: {
        agent: 'Notification intake', icon: 'mail', systems: ['LexNET', 'Gestor de expedientes', 'iManage'],
        what: 'Reads the LexNET notification and identifies the matter, the parties and the notified document',
        name: 'LexNET notification', verb: 'log the notification', token: 'lexnet',
        keywords: ['\\blexnet notifications?\\b', '\\bnotifications? (?:from|via|in|through) lexnet\\b'],
        strong: ['\\bidentif\\w*']
      },
      deadline_calc: {
        agent: 'Deadline calculation', icon: 'calendar', systems: ['Gestor de expedientes'],
        what: 'Calculates the due date in working days (arts. 130 to 136 LEC), treating August and local public holidays as non-working',
        name: 'Deadline calculation', verb: 'calculate the deadline', token: 'plazo',
        keywords: ['\\bcalculat\\w* (?:the )?(?:deadlines?|due dates?)\\b', '\\bworking days\\b'],
        strong: ['\\bcalculat\\w*']
      },
      conflict_check: {
        agent: 'Conflicts and acceptance', icon: 'shield', systems: ['Gestor de expedientes', 'iManage'], hitl: true, restricted: true, gateVerb: 'accepting the engagement',
        what: 'Checks the parties against the conflicts database, holds acceptance and only accepts the engagement after approval',
        name: 'Conflict of interest', verb: 'check conflicts', token: 'conflictos',
        keywords: ['\\bconflicts? of interests?\\b', '\\bconflict\\w*'],
        strong: ['\\bcheck\\w* for conflicts\\b', '\\bconflicts? of interests?\\b']
      },
      lawyer_notice: {
        agent: 'Lawyer notification', icon: 'message-square', systems: ['Microsoft Teams'],
        what: 'Notifies the responsible lawyer via Teams with the matter, the deadline and the document',
        name: 'Lawyer notification', verb: 'notify the lawyer', token: 'aviso-letrado',
        keywords: ['\\bresponsible lawyer\\b', '\\bvia teams\\b'],
        strong: ['\\bresponsible lawyer\\b', '\\bnotif\\w* \\w+ via teams\\b']
      },
      agenda: {
        agent: 'Firm calendar', icon: 'calendar', systems: ['Outlook', 'Gestor de expedientes'],
        what: 'Records the due date in the firm’s and the lawyer’s calendars, with reminders',
        name: 'Calendar entry', verb: 'record in the calendar', token: 'agenda',
        keywords: ['\\bcalendars?\\b', '\\brecord the (?:due date|deadline)\\b'],
        strong: ['\\brecord the (?:due date|deadline)\\b', '\\bcalendars?\\b']
      },
      escalation: {
        agent: 'Case files and alerts', icon: 'clipboard', systems: ['Gestor de expedientes', 'Microsoft Teams'],
        what: 'Opens or completes the case file, flags urgency and sends alerts to the partners',
        name: 'Partner alert', verb: 'alert the partner', token: 'aviso-socio',
        keywords: ['\\bnotify the (?:head of|managing partner|partner)\\b', '\\btreat it as critical\\b', '\\bcomplaint file\\b', '\\bpublish\\w* the (?:daily )?summary\\b'],
        strong: ['\\bas critical\\b', '\\bnotify the (?:head of|managing partner|partner)\\b', '\\bcomplaint file\\b', '\\bpublish\\w* the (?:daily )?summary\\b']
      },
      complaint_intake: {
        agent: 'Complaint intake', icon: 'mail', systems: ['Outlook', 'Gestor de expedientes'],
        what: 'Logs the complaint and extracts client, matter, invoice, amount and engagement letter',
        name: 'Client complaint', verb: 'log the complaint', token: 'queja',
        keywords: ['\\bcomplain\\w*'],
        strong: ['\\blog it\\b', '\\blog\\w* the complaint\\b', '\\bregister\\w*']
      },
      time_review: {
        agent: 'Time analysis', icon: 'clock', systems: ['Gestor de expedientes'],
        what: 'Compares the hours recorded with the engagement letter and the retainers, item by item',
        name: 'Analysis of hours recorded', verb: 'analyse the hours', token: 'horas',
        keywords: ['\\bhours recorded\\b', '\\brecorded hours\\b', '\\btime entries\\b', '\\bhours billed\\b'],
        strong: ['\\banaly[sz]\\w*', '\\bhours recorded\\b']
      },
      fee_adjust: {
        agent: 'Fee note correction', icon: 'euro', systems: ['Gestor de expedientes'], hitl: true, gateVerb: 'issuing the corrective invoice',
        what: 'Proposes the corrective invoice or partial credit and only issues it after approval',
        name: 'Corrective invoice', verb: 'correct the fee note', token: 'rectificativa',
        keywords: ['\\bcorrective invoices?\\b', '\\bpartial credits?\\b', '\\bcredit notes?\\b'],
        strong: ['\\bcorrective invoices?\\b', '\\bpartial credits?\\b']
      },
      notifier: {
        agent: 'Reply to the client', icon: 'send', systems: ['Outlook', 'Gestor de expedientes'], hitl: true, gateVerb: 'sending the reply',
        what: 'Drafts the reply to the client and sends it after approval',
        name: 'Reply to the client', verb: 'reply to the client', token: 'respuesta',
        keywords: ['\\breply to the client\\b', '\\brespond to the client\\b', '\\banswer the client\\b'],
        strong: ['\\breply to the client\\b', '\\brespond to the client\\b', '\\banswer the client\\b']
      },
      deadline_monitor: {
        agent: 'Daily firm summary', icon: 'activity', systems: ['LexNET', 'Gestor de expedientes', 'Sede AEAT'], multi: 2,
        what: 'Reviews court deadlines and tax due dates against the protocol and assigns tasks without duplicates',
        name: 'Daily firm summary', verb: 'run the daily summary', token: 'resumen-dia',
        keywords: ['\\bcourt deadlines\\b', '\\btax due dates\\b'],
        strong: ['\\breview\\b', '\\bassign\\w* a task\\b']
      }
    },

    domains: {
      alarma: {
        first: 'lexnet_intake',
        slug: 'wf-notificacion-lexnet',
        name: 'LexNET notification: deadline, conflicts and notices',
        approver: 'decider',
        approverOptions: ['decider', 'procesal'],
        policy: 'POL-CON-002',
        go: 'alarma',
        goLabel: 'Test it with the PO 1184/2026 notification',
        next: 'The next LexNET notification runs it. The one for PO 1184/2026 (Aceites Sierra Subbética, S.L.) is still unassigned.',
        trigger: {
          system: 'LexNET', type: 'notificación', icon: 'mail', badges: ['LexNET'],
          label: 'LexNET notification received', sub: 'review within {threshold}',
          entry: 'The firm’s LexNET mailbox, synchronised with the Gestor de expedientes',
          full: 'LexNET notification, reviewed and assigned within {threshold}'
        },
        steps: {
          lexnet_intake: { sub: 'Matter and document', what: 'Reads the LexNET notification, identifies the matter in the Gestor (parties, court, proceedings) and the notified document in iManage', outputs: [{ icon: 'file-text', text: 'Notification linked to the matter and to the document in iManage' }] },
          deadline_calc: { sub: 'Working days · LEC', what: 'Calculates the due date in working days (arts. 130 to 136 LEC), excludes August and Málaga public holidays and flags as urgent anything due in less than 5 working days', outputs: [{ icon: 'calendar', text: 'Deadline calculation with the due date' }] },
          conflict_check: { sub: 'After approval', what: 'Checks the parties against the conflicts database (art. 12 of the Código Deontológico); holds acceptance of the engagement and only records it after approval', outputs: [{ icon: 'shield', text: 'Conflicts checked and engagement accepted, after approval' }] },
          lawyer_notice: { sub: 'Within {minutes}', what: 'Notifies the responsible lawyer via Teams within {minutes} with the matter, the deadline and the document; if they are away, proposes a substitute from the practice area', outputs: [{ icon: 'message-square', text: 'Teams notification to the responsible lawyer' }] },
          agenda: { sub: 'Due date and reminders', what: 'Records the due date in the firm’s and the lawyer’s calendars, with reminders 5 and 2 working days before', outputs: [{ icon: 'calendar', text: 'Due date recorded in the calendar with reminders' }] },
          escalation: { sub: 'Critical > {critical}', systems: ['Gestor de expedientes', 'Microsoft Teams'], what: 'If the notification has been unassigned for more than {critical}, flags it as critical and notifies {al:notify} via Teams', outputs: [{ icon: 'bell', text: 'Teams notification to {al:notify} if it becomes critical' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Notification record in the matter, with the deadline calculation and the audit trail' }],
        params: [
          { key: 'threshold', label: 'Review and assignment', name: 'Notification review time', type: 'number', unit: 'h', unitLong: 'hours', min: 1, max: 24, step: 1, value: 4, integer: true, below: 'critical', ref: 'PRO-PLZ-001', hint: 'PRO-PLZ-001: 4 office hours from entry in the Gestor', hl: 'Review', extract: { from: 'text', re: '\\b(\\d{1,2})\\s*hours?\\b' } },
          { key: 'minutes', label: 'Lawyer notification', name: 'Notification to the responsible lawyer', type: 'number', unit: 'min', min: 5, max: 240, step: 5, value: 30, integer: true, ref: 'PRO-PLZ-001', hint: 'PRO-PLZ-001: 30 min, via Microsoft Teams', extract: { from: 'text', re: '(\\d{1,3})\\s*(?:minutes?|mins?)\\b' } },
          { key: 'critical', label: 'Critical: unassigned for more than', name: 'Critical notification', type: 'number', unit: 'h', unitLong: 'hours', min: 2, max: 48, step: 1, value: 5, integer: true, above: 'threshold', ref: 'PRO-PLZ-001', hint: 'PRO-PLZ-001: more than 5 h unassigned · partner alert', hl: 'Critical', extract: { from: 'sentence', near: '\\bcritic\\w*', re: '(\\d{1,2})\\s*hours?\\b' } },
          { key: 'approver', label: 'Approves acceptance of the engagement', ref: 'POL-CON-002', hint: 'POL-CON-002: with a possible conflict, only the Managing Partner or the Head of Litigation accepts' },
          { key: 'notify', label: 'Notify', name: 'Notification', type: 'role', value: 'procesal', options: ['procesal', 'decider', 'procesal_staff'], ref: 'PRO-PLZ-001', hint: 'Via Microsoft Teams, to reassign the deadline', extract: { kind: 'role', cap: 'escalation' } }
        ],
        check: { id: 'umbral', ref: 'PRO-PLZ-001', keys: ['threshold', 'minutes'], label: 'Review and notification', describe: 'review within {threshold} and lawyer notified within {minutes}', extra: 'critical when unassigned for more than {critical}', action: 'Checks the times against PRO-PLZ-001' },
        scenarios: [
          'a LexNET notification arrives and must be reviewed and assigned within {threshold}',
          'LexNET serves a claim against a client (e.g. PO 1184/2026 against Aceites Sierra Subbética, S.L.)',
          'the court agent (procurador) forwards a document with a deadline and the due date must be calculated',
          'conflicts of interest must be checked before accepting an engagement that comes in through LexNET'
        ],
        testUtterance: 'A claim in ordinary proceedings against Aceites Sierra Subbética has come in through LexNET with 20 days to file a defence',
        matchGroups: [
          { re: '\\blexnet\\b|\\bnotification\\w*|\\bprocurador\\w*|\\bserved\\b', w: 0.3, label: 'LexNET' },
          { re: '\\bclaims?\\b|\\bdocuments?\\b|\\border\\b|\\bjudgments?\\b|\\bproceedings\\b|\\bappeals?\\b', w: 0.3, label: 'document' },
          { re: '\\bdeadlines?\\b|\\bdue\\b|\\bdefen[cs]e\\b|\\bdays\\b', w: 0.25, label: 'deadline' },
          { re: '\\bsubbetica\\b|\\b1184\\b|\\bmora\\b', w: 0.07, label: 'Matter' }
        ],
        config: {
          lexnet_intake: [['mailbox', 'LexNET · Mora & Jordano'], ['review_hours', '{=threshold}'], ['documents', 'iManage · matter folder']],
          deadline_calc: [['computation', 'Working days · arts. 130 to 136 LEC'], ['non_working', 'August, Saturdays, Sundays, 24 and 31 December and Málaga public holidays'], ['urgent_if_due_within', '5 working days']],
          conflict_check: [['approver', '{approver}'], ['policy', 'POL-CON-002'], ['hold', 'Acceptance of the engagement until the conflict is resolved']],
          lawyer_notice: [['notify_minutes', '{=minutes}'], ['channel', 'Microsoft Teams'], ['absences', 'Substitute from the practice area']],
          agenda: [['calendar', 'Outlook · firm calendar'], ['reminders', '5 and 2 working days before']],
          escalation: [['critical_hours', '{=critical}'], ['notify', '{notify}'], ['channel', 'Microsoft Teams']]
        },
        say: {
          draft: [
            'Every sentence is linked to what it understood: the trigger comes from “When a LexNET notification arrives” and the times from “within {threshold}”.',
            'Each step says which system it touches: LexNET and the Gestor for the matter, iManage for the document, Teams and Outlook for notifications and the calendar.',
            'The engagement is not accepted without approval from {del:approver}: POL-CON-002 requires it, and the workflow enforces it even if the text did not say so.'
          ],
          published: ['From now on, every LexNET notification triggers it automatically. Let’s see it with this morning’s: PO 1184/2026, Juzgado de Primera Instancia nº 7 de Málaga (Court of First Instance no. 7).']
        }
      },
      reclamacion: {
        first: 'complaint_intake',
        slug: 'wf-queja-minuta',
        name: 'Client complaint about a fee note',
        approver: 'mercantil',
        approverOptions: ['mercantil', 'decider', 'client_care'],
        policy: 'POL-HON-004',
        go: 'reclamacion',
        goLabel: 'Test it with Grupo Hostelero Costa del Sol’s complaint',
        next: 'The next fee complaint runs it. Grupo Hostelero Costa del Sol, S.L.’s (F-2026-0938, 18,400 €) is awaiting a reply.',
        trigger: {
          system: 'Outlook', type: 'correo', icon: 'mail', badges: ['Outlook'],
          label: 'Complaint in the client care mailbox', sub: 'fee note',
          entry: 'Client care mailbox in Outlook and Gestor de expedientes',
          full: 'Client complaint about a fee note'
        },
        steps: {
          complaint_intake: { sub: 'Acknowledgement within {ack}', what: 'Logs the complaint in the Gestor de expedientes, extracts client, matter, invoice, amount and engagement letter, and sends the acknowledgement of receipt within {ack}', outputs: [{ icon: 'clipboard', text: 'Complaint logged in the Gestor with the extracted data' }] },
          time_review: { sub: 'Hours vs engagement letter', what: 'Compares the hours recorded on the matter with the engagement letter and the retainers, item by item, and highlights deviations', outputs: [{ icon: 'clock', text: 'Analysis of hours recorded against the engagement letter' }] },
          fee_adjust: { sub: 'After approval', what: 'Proposes, where appropriate, a corrective invoice or a partial credit on the fee note; it is issued only after approval', outputs: [{ icon: 'euro', text: 'Corrective invoice or partial credit, after approval' }] },
          escalation: { sub: 'Resolution within {days}', systems: ['Gestor de expedientes', 'Procedimientos'], what: 'Prepares the complaint file (POL-HON-004) with the progress updates from the last {months}', outputs: [{ icon: 'file-text', text: 'Complaint file (POL-HON-004), to be resolved within {days}' }] },
          notifier: { sub: 'After approval', what: 'Drafts the reply to the client with the breakdown of hours and the engagement letter; it is sent only after approval', outputs: [{ icon: 'send', text: 'Reply to the client, sent after approval' }] }
        },
        params: [
          { key: 'ack', label: 'Acknowledgement of receipt', name: 'Acknowledgement of receipt', type: 'number', unit: 'h', min: 1, max: 72, step: 1, value: 48, integer: true, ref: 'POL-HON-004', hint: 'POL-HON-004: 48 h', extract: { from: 'text', re: '\\backnowledge?ment\\b[^.;]{0,40}?(\\d{1,3})\\s*(?:h|hours?)\\b' } },
          { key: 'days', label: 'Resolution', name: 'Resolution deadline', type: 'number', unit: 'days', unitLong: 'days', min: 1, max: 30, step: 1, value: 15, integer: true, ref: 'POL-HON-004', hint: 'POL-HON-004: reply within 15 days', hl: 'Deadline', extract: { from: 'text', re: '(\\d{1,2})\\s*days\\b' } },
          { key: 'months', label: 'Progress updates', name: 'Communication history', type: 'number', unit: 'months', min: 1, max: 36, step: 1, value: 6, integer: true, ref: 'Policy', hint: 'Emails and meeting notes in the matter in iManage', hl: 'History', extract: { from: 'text', re: '(\\d{1,2})\\s*months\\b' } },
          { key: 'approver', label: 'Approves corrective invoice and reply', ref: 'POL-HON-004', hint: 'Before issuing an invoice or sending anything to the client' }
        ],
        check: { id: 'plazos', ref: 'POL-HON-004', keys: ['ack', 'days'], label: 'Deadlines', describe: 'acknowledgement within {ack} and resolution within {days}', action: 'Checks the deadlines against POL-HON-004' },
        scenarios: [
          'a client complaint about a fee note reaches the client care mailbox',
          'a client considers that the invoice exceeds what was agreed in the engagement letter',
          'a client complains that they are not kept informed about the progress of their matter',
          'a decision is needed on whether to issue a corrective invoice or a partial credit'
        ],
        testUtterance: 'A client is complaining that the fee note exceeds what was agreed in the engagement letter',
        matchGroups: [
          { re: '\\bcomplain\\w*|\\bdisput\\w*|\\bdissatisf\\w*', w: 0.35, label: 'complaint' },
          { re: '\\bclients?\\b', w: 0.2, label: 'client' },
          { re: '\\bfee notes?\\b|\\bfees\\b|\\binvoices?\\b|\\bamounts?\\b', w: 0.25, label: 'fees' },
          { re: '\\bengagement letter\\b|\\bhours\\b|\\bquote\\b', w: 0.12, label: 'engagement letter' }
        ],
        config: {
          complaint_intake: [['ack_hours', '{=ack}'], ['system', 'Gestor de expedientes']],
          time_review: [['source', 'Hours recorded in the Gestor'], ['reference', 'Engagement letter signed in Signaturit']],
          fee_adjust: [['document', 'Corrective invoice or partial credit'], ['approver', '{approver}']],
          escalation: [['template', 'Case file POL-HON-004'], ['deadline_days', '{=days}'], ['history_months', '{=months}']],
          notifier: [['channel', 'Email'], ['approver', '{approver}']]
        },
        say: {
          draft: [
            'Every sentence is linked to what it understood: the email to the client care mailbox triggers the workflow and the deadlines come from the text itself.',
            'The corrective invoice affects the client’s billing: it is not issued without approval from {del:approver}, and neither is the reply.',
            'The deadlines are checked against POL-HON-004; if anyone extends them, a reason is required on publishing.'
          ],
          published: ['The next fee complaint runs it automatically. Let’s see it with Grupo Hostelero Costa del Sol’s.']
        }
      },
      parte: {
        first: 'deadline_monitor',
        slug: 'wf-resumen-dia-despacho',
        name: 'Daily firm summary · deadlines and due dates',
        approver: 'decider',
        approverOptions: ['decider', 'procesal'],
        policy: 'PRO-PLZ-001',
        go: 'turno',
        goLabel: 'See the daily summary',
        next: 'It runs every working day at {time}.',
        trigger: {
          system: 'Programado', type: 'programado', icon: 'clock', badges: [],
          label: 'Every working day at {time}', sub: 'Scheduled',
          entry: 'Daily server schedule · {time}'
        },
        steps: {
          deadline_monitor: { sub: 'Deadlines and due dates', what: 'Reviews in LexNET, the Gestor and the Sede AEAT the pending notifications, this week’s deadlines, forms 200, 202 and 303, unrecorded hours and incomplete AML due diligence, and assigns tasks without duplicating open ones', outputs: [{ icon: 'list-checks', text: 'Tasks in the Gestor de expedientes, without duplicating open ones' }] },
          conflict_check: { sub: 'Conflicts older than 48 h', gateVerb: 'blocking or accepting the engagement', what: 'If a conflict of interest has been pending for more than 48 h, proposes blocking or accepting the engagement (POL-CON-002)', outputs: [{ icon: 'shield', text: 'Pending conflicts resolved, after approval' }] },
          escalation: { sub: 'Summary in Teams', systems: ['Microsoft Teams'], what: 'Publishes the daily summary in the “Firm · Málaga” channel', outputs: [{ icon: 'message-square', text: 'Summary in the “Firm · Málaga” Teams channel' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Daily firm summary (PDF)' }],
        params: [
          { key: 'time', label: 'Summary time', name: 'Summary time', type: 'time', value: '07:30', ref: 'PRO-PLZ-001', hint: 'Before the first hearing of the day', extract: { kind: 'time' } },
          { key: 'approver', label: 'Approves blocking or accepting engagements', ref: 'POL-CON-002', hint: 'POL-CON-002 · PRO-PLZ-001' }
        ],
        staticChecks: [
          { id: 'tributario', text: 'Tax calendar (CAL-TRI-006): form 202 instalment payment from 1 to 20 October; form 200 by 25 October', stream: { action: 'Checks the summary against PRO-PLZ-001 and CAL-TRI-006', result: 'Court deadlines with August as non-working · forms 202 (20-10) and 200 (25-10) included' } }
        ],
        rules: [{ key: 'noDuplicate', re: '\\bwithout duplicating\\b', label: 'Rule', check: 'Tasks without duplicating those already open in the Gestor de expedientes' }],
        scenarios: [
          'it is {time} on a working day and the daily firm summary is due',
          'the user asks for the summary of court deadlines and tax due dates',
          'the user asks which deadlines fall due this week'
        ],
        testUtterance: 'Run the daily summary of the firm’s deadlines and due dates',
        matchGroups: [
          { re: '\\bsummary\\b|\\bagenda\\b', w: 0.35, label: 'summary' },
          { re: '\\bdeadlines?\\b|\\bdue dates?\\b|\\bnotifications\\b|\\bforms?\\b', w: 0.3, label: 'deadlines' },
          { re: '\\bdaily\\b|\\btoday\\b|\\bweek\\b', w: 0.15, label: 'daily' },
          { re: '\\bfirm\\b|\\bmora\\b', w: 0.1, label: 'Firm' }
        ],
        config: {
          deadline_monitor: [['time', '{time}'], ['reviews', 'LexNET notifications, this week’s deadlines, forms 200, 202 and 303, unrecorded hours, AML due diligence (MAN-PBC-003)'], ['tasks', 'Gestor de expedientes, without duplicating open ones']],
          conflict_check: [['approver', '{approver}'], ['policy', 'POL-CON-002'], ['review', 'Conflicts pending for more than 48 h']],
          escalation: [['channel', 'Microsoft Teams · Firm · Málaga']]
        },
        say: {
          draft: [
            'The summary is scheduled: every working day at {time}, without anyone asking for it.',
            'It assigns tasks only for items without an open one, and it does not block or accept an engagement without approval from {del:approver}.'
          ],
          published: ['Tomorrow at {time} it runs on its own; today’s is in the daily summary.']
        }
      }
    }
  }
});
