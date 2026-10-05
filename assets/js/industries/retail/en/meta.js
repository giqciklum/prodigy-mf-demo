/* Mercados Moncayo · general data (English). Fictitious company; synthetic demo data (MFM). */
agenticPackEn('retail', {
  meta: {
    id: 'retail',
    industry: 'Grocery and retail',
    company: 'Mercados Moncayo',
    legal: 'Mercados Moncayo, S.A.',
    short: 'MM',
    site: 'Plaza distribution centre · 64 stores',
    user_role: 'Director of Operations',
    user_initials: 'DO',
    user_sub: 'Morning shift',
    today: '2026-09-29',
    weekday: 'Tuesday',
    clock_title: 'Distribution centre time (Zaragoza)',
    theme: { brand: '#2F6F73', dark: '#1F5155', deep: '#13302F', tint: '#EAF3F3' },
    connectors: ['SAP S/4 Retail', 'WMS Manhattan', 'Sensores de frío', 'TPV tiendas', 'CRM Fidelización', 'ServiceNow', 'Microsoft Teams', 'Outlook'],
    data_nouns: 'Stores, products, lots, sales, loyalty customers and procedures',
    system_icons: { 'SAP S/4 Retail': 'database', 'WMS Manhattan': 'warehouse', 'Manhattan': 'warehouse', 'Sensores de frío': 'thermometer', 'TPV tiendas': 'barcode', 'TPV': 'barcode', 'CRM Fidelización': 'users', 'CRM': 'users', 'ServiceNow': 'ticket' },
    trace: { noun: 'lot', systems: 'SAP S/4 Retail, WMS Manhattan and store POS', systems_short: 'SAP + WMS + POS', example: 'L26214', quality_tab: 'Quality' },
    doc_org: 'Mercados Moncayo · Quality',
    report_org: 'Mercados Moncayo · Plaza distribution centre'
  },
  roles: {
    decider: 'Director of Operations',
    quality: 'Head of Quality',
    quality_shift: 'On-call Quality Technician',
    store_ops: 'Area Store Manager',
    maintenance: 'Refrigeration Maintenance',
    logistics: 'Distribution Centre Manager',
    customer_service: 'Consumer Care',
    supplier_quality: 'Supplier Quality'
  }
});
