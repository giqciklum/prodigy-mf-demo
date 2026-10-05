/* Cervecera Bardenas · datos generales. Empresa ficticia; datos sintéticos de demostración (MFM). */
agenticPack('cerveceria', {
  meta: {
    id: 'cerveceria',
    industry: 'Cervecera y bebidas',
    company: 'Cervecera Bardenas',
    legal: 'Cervecera Bardenas, S.A.',
    short: 'CB',
    site: 'Fábrica de Arguedas',
    user_role: 'Jefa de producción',
    user_initials: 'JP',
    user_sub: 'Turno de mañana',
    today: '2026-09-29',
    weekday: 'martes',
    clock_title: 'Hora de la fábrica (Arguedas)',
    theme: { brand: '#7A4B32', dark: '#5C3622', deep: '#2E1B11', tint: '#F5EEEA' },
    connectors: ['SAP S/4HANA', 'Brewmaxx (MES)', 'SCADA bodega', 'LIMS LabWare', 'WMS Mecalux', 'GMAO Maximo', 'Microsoft Teams', 'Outlook'],
    data_nouns: 'Lotes, depósitos, análisis, barriles, clientes y procedimientos',
    system_icons: { 'SAP S/4HANA': 'database', 'Brewmaxx': 'factory', 'Brewmaxx (MES)': 'factory', 'SCADA bodega': 'activity', 'LIMS LabWare': 'flask', 'LIMS': 'flask', 'WMS Mecalux': 'warehouse', 'GMAO Maximo': 'wrench', 'Maximo': 'wrench' },
    trace: { noun: 'lote', systems: 'SAP S/4HANA, Brewmaxx y WMS Mecalux', systems_short: 'SAP + Brewmaxx + WMS', example: 'L2608-K14', quality_tab: 'Análisis LIMS' },
    doc_org: 'Cervecera Bardenas · Calidad',
    report_org: 'Cervecera Bardenas · Fábrica de Arguedas'
  },
  roles: {
    decider: 'Jefa de producción',
    quality: 'Responsable de Calidad',
    quality_shift: 'Técnico de Calidad de turno',
    maintenance: 'Jefe de mantenimiento',
    brewmaster: 'Maestro cervecero',
    logistics: 'Responsable de logística',
    customer_service: 'Atención al cliente',
    customer_quality: 'Calidad del cliente'
  }
});
