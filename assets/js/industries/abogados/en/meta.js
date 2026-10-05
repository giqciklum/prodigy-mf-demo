/* Mora & Jordano · general data (English). Demo scenario with synthetic data (MFM): people, clients and matters are fictitious. */
agenticPackEn('abogados', {
  meta: {
    id: 'abogados',
    industry: 'Law firm',
    company: 'Mora & Jordano',
    legal: 'Mora & Jordano Abogados',
    short: 'MJ',
    site: 'Málaga office · Calle Linaje',
    user_role: 'Managing Partner',
    user_initials: 'MP',
    user_sub: "Today's agenda",
    today: '2026-09-29',
    weekday: 'Tuesday',
    clock_title: 'Firm time (Málaga)',
    theme: { brand: '#7A2E3A', dark: '#5A1F2A', deep: '#33111A', tint: '#F6EEF0' },
    connectors: ['LexNET', 'Sede AEAT', 'Gestor de expedientes', 'iManage', 'Aranzadi', 'Signaturit', 'Microsoft Teams', 'Outlook'],
    data_nouns: 'Matters, deadlines, court notifications, clients, filings and fees',
    system_icons: { 'LexNET': 'mail', 'Sede AEAT': 'globe', 'AEAT': 'globe', 'Gestor de expedientes': 'database', 'Gestor': 'database', 'iManage': 'file-text', 'Aranzadi': 'book-open', 'Signaturit': 'edit' },
    trace: { noun: 'matter', systems: 'Gestor de expedientes, iManage and LexNET', systems_short: 'Gestor + iManage + LexNET', example: 'RGPD-2609-03', quality_tab: 'Compliance' },
    doc_org: 'Mora & Jordano · Compliance and Quality',
    report_org: 'Mora & Jordano · Firm Management'
  },
  roles: {
    decider: 'Managing Partner',
    procesal: 'Head of Litigation (partner)',
    procesal_staff: 'Senior Associate, Litigation',
    fiscal: 'Head of Tax (partner)',
    mercantil: 'Head of Corporate and Commercial (partner)',
    civil: 'Head of Civil Law (partner)',
    compliance: 'Compliance Officer (AML and GDPR)',
    dpo: 'Data Protection Officer',
    client_care: 'Client Care and Billing',
    it: 'IT and Information Security'
  }
});
