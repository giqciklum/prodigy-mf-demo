/* Cervecera Bardenas · general data (English). Fictitious company; synthetic demo data (MFM). */
agenticPackEn('cerveceria', {
  meta: {
    id: 'cerveceria',
    industry: 'Brewing and beverages',
    company: 'Cervecera Bardenas',
    legal: 'Cervecera Bardenas, S.A.',
    short: 'CB',
    site: 'Arguedas Brewery',
    user_role: 'Production Manager',
    user_initials: 'PM',
    user_sub: 'Morning shift',
    today: '2026-09-29',
    weekday: 'Tuesday',
    clock_title: 'Brewery time (Arguedas)',
    theme: { brand: '#7A4B32', dark: '#5C3622', deep: '#2E1B11', tint: '#F5EEEA' },
    connectors: ['SAP S/4HANA', 'Brewmaxx (MES)', 'SCADA bodega', 'LIMS LabWare', 'WMS Mecalux', 'GMAO Maximo', 'Microsoft Teams', 'Outlook'],
    data_nouns: 'Batches, vessels, lab analyses, kegs, customers and procedures',
    system_icons: { 'SAP S/4HANA': 'database', 'Brewmaxx': 'factory', 'Brewmaxx (MES)': 'factory', 'SCADA bodega': 'activity', 'LIMS LabWare': 'flask', 'LIMS': 'flask', 'WMS Mecalux': 'warehouse', 'GMAO Maximo': 'wrench', 'Maximo': 'wrench' },
    trace: { noun: 'batch', systems: 'SAP S/4HANA, Brewmaxx and WMS Mecalux', systems_short: 'SAP + Brewmaxx + WMS', example: 'L2608-K14', quality_tab: 'LIMS analyses' },
    doc_org: 'Cervecera Bardenas · Quality',
    report_org: 'Cervecera Bardenas · Arguedas Brewery'
  },
  roles: {
    decider: 'Production Manager',
    quality: 'Quality Manager',
    quality_shift: 'Shift Quality Technician',
    maintenance: 'Maintenance Manager',
    brewmaster: 'Head Brewer',
    logistics: 'Logistics Manager',
    customer_service: 'Customer Service',
    customer_quality: 'Customer Quality'
  }
});
