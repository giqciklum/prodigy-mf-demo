/* Hidromec Ebro · datos generales. Empresa ficticia; datos sintéticos de demostración (MFM). */
agenticPack('maquinaria', {
  meta: {
    id: 'maquinaria',
    industry: 'Maquinaria industrial',
    company: 'Hidromec Ebro',
    legal: 'Hidromec Ebro, S.L.',
    short: 'HE',
    site: 'Planta de Zaragoza (PLAZA)',
    user_role: 'Jefe de planta',
    user_initials: 'JP',
    user_sub: 'Turno de mañana',
    today: '2026-09-29',
    weekday: 'martes',
    clock_title: 'Hora de la planta (Zaragoza)',
    theme: { brand: '#3D5A80', dark: '#2B4263', deep: '#16243A', tint: '#EDF1F6' },
    connectors: ['SAP S/4HANA', 'MES Opcenter', 'IIoT Vibración', 'GMAO Maximo', 'PLM Windchill', 'Salesforce Service', 'Microsoft Teams', 'Outlook'],
    data_nouns: 'Máquinas, órdenes, lotes de componente, números de serie, clientes y procedimientos',
    system_icons: { 'SAP S/4HANA': 'database', 'MES Opcenter': 'factory', 'Opcenter': 'factory', 'IIoT Vibración': 'activity', 'GMAO Maximo': 'wrench', 'Maximo': 'wrench', 'PLM Windchill': 'layers', 'Windchill': 'layers', 'Salesforce Service': 'users', 'Salesforce': 'users' },
    trace: { noun: 'lote', systems: 'SAP S/4HANA, MES Opcenter y PLM Windchill', systems_short: 'SAP + Opcenter + Windchill', example: 'JNT-2607-031', quality_tab: 'Inspección' },
    doc_org: 'Hidromec Ebro · Calidad',
    report_org: 'Hidromec Ebro · Planta de Zaragoza'
  },
  roles: {
    decider: 'Jefe de planta',
    quality: 'Responsable de Calidad',
    quality_shift: 'Técnico de Calidad de turno',
    maintenance: 'Jefe de mantenimiento',
    production: 'Jefe de producción',
    after_sales: 'Responsable de posventa',
    purchasing: 'Compras · calidad de proveedor',
    customer_quality: 'Calidad del cliente'
  }
});
