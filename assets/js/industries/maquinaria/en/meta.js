/* Hidromec Ebro · general data (English). Fictitious company; synthetic demonstration data (MFM). */
agenticPackEn('maquinaria', {
  meta: {
    id: 'maquinaria',
    industry: 'Industrial machinery',
    company: 'Hidromec Ebro',
    legal: 'Hidromec Ebro, S.L.',
    short: 'HE',
    site: 'Zaragoza plant (PLAZA)',
    user_role: 'Plant manager',
    user_initials: 'PM',
    user_sub: 'Morning shift',
    today: '2026-09-29',
    weekday: 'Tuesday',
    clock_title: 'Plant time (Zaragoza)',
    theme: { brand: '#3D5A80', dark: '#2B4263', deep: '#16243A', tint: '#EDF1F6' },
    connectors: ['SAP S/4HANA', 'MES Opcenter', 'IIoT Vibración', 'GMAO Maximo', 'PLM Windchill', 'Salesforce Service', 'Microsoft Teams', 'Outlook'],
    data_nouns: 'Machines, orders, component batches, serial numbers, customers and procedures',
    system_icons: { 'SAP S/4HANA': 'database', 'MES Opcenter': 'factory', 'Opcenter': 'factory', 'IIoT Vibración': 'activity', 'GMAO Maximo': 'wrench', 'Maximo': 'wrench', 'PLM Windchill': 'layers', 'Windchill': 'layers', 'Salesforce Service': 'users', 'Salesforce': 'users' },
    trace: { noun: 'batch', systems: 'SAP S/4HANA, MES Opcenter and PLM Windchill', systems_short: 'SAP + Opcenter + Windchill', example: 'JNT-2607-031', quality_tab: 'Inspection' },
    doc_org: 'Hidromec Ebro · Quality',
    report_org: 'Hidromec Ebro · Zaragoza plant'
  },
  roles: {
    decider: 'Plant manager',
    quality: 'Quality manager',
    quality_shift: 'Shift quality technician',
    maintenance: 'Maintenance manager',
    production: 'Production manager',
    after_sales: 'After-sales manager',
    purchasing: 'Purchasing · supplier quality',
    customer_quality: 'Customer quality'
  }
});
