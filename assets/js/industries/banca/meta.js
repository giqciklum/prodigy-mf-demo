/* Banco Cierzo · datos generales. Entidad ficticia; datos sintéticos de demostración (MFM). */
agenticPack('banca', {
  meta: {
    id: 'banca',
    industry: 'Banca y servicios financieros',
    company: 'Banco Cierzo',
    legal: 'Banco Cierzo, S.A.',
    short: 'BC',
    site: 'Centro de Operaciones · Madrid',
    user_role: 'Director de Operaciones',
    user_initials: 'DO',
    user_sub: 'Turno de mañana',
    today: '2026-09-29',
    weekday: 'martes',
    clock_title: 'Hora del centro de operaciones (Madrid)',
    theme: { brand: '#3A4E7A', dark: '#27365A', deep: '#171F36', tint: '#EEF0F6' },
    connectors: ['Core bancario T24', 'Falcon Fraud', 'Redsys', 'Salesforce FSC', 'ServiceNow', 'GRC Archer', 'Microsoft Teams', 'Outlook'],
    data_nouns: 'Tarjetas, operaciones, comercios, clientes, expedientes y políticas',
    system_icons: { 'Core bancario T24': 'database', 'T24': 'database', 'Falcon Fraud': 'shield', 'Falcon': 'shield', 'Redsys': 'globe', 'Salesforce FSC': 'users', 'Salesforce': 'users', 'ServiceNow': 'ticket', 'GRC Archer': 'scale', 'Archer': 'scale' },
    trace: { noun: 'expediente', systems: 'Core bancario T24, Falcon Fraud y Redsys', systems_short: 'T24 + Falcon + Redsys', example: 'CPP-2609-07', quality_tab: 'Controles' },
    doc_org: 'Banco Cierzo · Cumplimiento',
    report_org: 'Banco Cierzo · Centro de Operaciones'
  },
  roles: {
    decider: 'Director de Operaciones',
    fraud: 'Responsable de Prevención del Fraude',
    fraud_shift: 'Analista de fraude de turno',
    cards: 'Responsable de Medios de Pago',
    customer_service: 'Servicio de Atención al Cliente (SAC)',
    compliance: 'Responsable de Cumplimiento Normativo',
    it_risk: 'Riesgo tecnológico (DORA)',
    correspondent: 'Banca de corresponsales'
  }
});
