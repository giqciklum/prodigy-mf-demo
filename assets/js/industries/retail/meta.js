/* Mercados Moncayo · datos generales. Empresa ficticia; datos sintéticos de demostración (MFM). */
agenticPack('retail', {
  meta: {
    id: 'retail',
    industry: 'Gran consumo y retail',
    company: 'Mercados Moncayo',
    legal: 'Mercados Moncayo, S.A.',
    short: 'MM',
    site: 'Plataforma de Plaza · 64 tiendas',
    user_role: 'Directora de Operaciones',
    user_initials: 'DO',
    user_sub: 'Turno de mañana',
    today: '2026-09-29',
    weekday: 'martes',
    clock_title: 'Hora de la plataforma (Zaragoza)',
    theme: { brand: '#2F6F73', dark: '#1F5155', deep: '#13302F', tint: '#EAF3F3' },
    connectors: ['SAP S/4 Retail', 'WMS Manhattan', 'Sensores de frío', 'TPV tiendas', 'CRM Fidelización', 'ServiceNow', 'Microsoft Teams', 'Outlook'],
    data_nouns: 'Tiendas, productos, lotes, ventas, clientes de fidelización y procedimientos',
    system_icons: { 'SAP S/4 Retail': 'database', 'WMS Manhattan': 'warehouse', 'Manhattan': 'warehouse', 'Sensores de frío': 'thermometer', 'TPV tiendas': 'barcode', 'TPV': 'barcode', 'CRM Fidelización': 'users', 'CRM': 'users', 'ServiceNow': 'ticket' },
    trace: { noun: 'lote', systems: 'SAP S/4 Retail, WMS Manhattan y TPV de tiendas', systems_short: 'SAP + WMS + TPV', example: 'L26214', quality_tab: 'Calidad' },
    doc_org: 'Mercados Moncayo · Calidad',
    report_org: 'Mercados Moncayo · Plataforma de Plaza'
  },
  roles: {
    decider: 'Directora de Operaciones',
    quality: 'Responsable de Calidad',
    quality_shift: 'Técnico de Calidad de guardia',
    store_ops: 'Jefe de zona de tiendas',
    maintenance: 'Mantenimiento de frío',
    logistics: 'Jefe de plataforma',
    customer_service: 'Atención al consumidor',
    supplier_quality: 'Calidad de proveedores'
  }
});
