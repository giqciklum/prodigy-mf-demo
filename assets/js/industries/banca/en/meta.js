/* Banco Cierzo · general data (English). Fictitious bank; synthetic demo data (MFM). */
agenticPackEn('banca', {
  meta: {
    id: 'banca',
    industry: 'Banking and financial services',
    company: 'Banco Cierzo',
    legal: 'Banco Cierzo, S.A.',
    short: 'BC',
    site: 'Operations Centre · Madrid',
    user_role: 'Head of Operations',
    user_initials: 'HO',
    user_sub: 'Morning shift',
    today: '2026-09-29',
    weekday: 'Tuesday',
    clock_title: 'Operations Centre time (Madrid)',
    theme: { brand: '#3A4E7A', dark: '#27365A', deep: '#171F36', tint: '#EEF0F6' },
    connectors: ['Core bancario T24', 'Falcon Fraud', 'Redsys', 'Salesforce FSC', 'ServiceNow', 'GRC Archer', 'Microsoft Teams', 'Outlook'],
    data_nouns: 'Cards, transactions, merchants, customers, cases and policies',
    system_icons: { 'Core bancario T24': 'database', 'T24': 'database', 'Falcon Fraud': 'shield', 'Falcon': 'shield', 'Redsys': 'globe', 'Salesforce FSC': 'users', 'Salesforce': 'users', 'ServiceNow': 'ticket', 'GRC Archer': 'scale', 'Archer': 'scale' },
    trace: { noun: 'case', systems: 'Core bancario T24, Falcon Fraud and Redsys', systems_short: 'T24 + Falcon + Redsys', example: 'CPP-2609-07', quality_tab: 'Controls' },
    doc_org: 'Banco Cierzo · Compliance',
    report_org: 'Banco Cierzo · Operations Centre'
  },
  roles: {
    decider: 'Head of Operations',
    fraud: 'Head of Fraud Prevention',
    fraud_shift: 'Fraud analyst on shift',
    cards: 'Head of Payments and Cards',
    customer_service: 'Customer Service Department (SAC)',
    compliance: 'Chief Compliance Officer',
    it_risk: 'ICT Risk (DORA)',
    correspondent: 'Correspondent Banking'
  }
});
