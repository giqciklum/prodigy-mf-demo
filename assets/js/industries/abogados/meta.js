/* Mora & Jordano · datos generales. Escenario de demostración con datos sintéticos (MFM): personas, clientes y expedientes son ficticios. */
agenticPack('abogados', {
  meta: {
    id: 'abogados',
    industry: 'Despacho de abogados',
    company: 'Mora & Jordano',
    legal: 'Mora & Jordano Abogados',
    short: 'MJ',
    site: 'Sede de Málaga · Calle Linaje',
    user_role: 'Socio director',
    user_initials: 'SD',
    user_sub: 'Agenda de hoy',
    today: '2026-09-29',
    weekday: 'martes',
    clock_title: 'Hora del despacho (Málaga)',
    theme: { brand: '#7A2E3A', dark: '#5A1F2A', deep: '#33111A', tint: '#F6EEF0' },
    connectors: ['LexNET', 'Sede AEAT', 'Gestor de expedientes', 'iManage', 'Aranzadi', 'Signaturit', 'Microsoft Teams', 'Outlook'],
    data_nouns: 'Expedientes, plazos, notificaciones, clientes, escritos y honorarios',
    system_icons: { 'LexNET': 'mail', 'Sede AEAT': 'globe', 'AEAT': 'globe', 'Gestor de expedientes': 'database', 'Gestor': 'database', 'iManage': 'file-text', 'Aranzadi': 'book-open', 'Signaturit': 'edit' },
    trace: { noun: 'expediente', systems: 'Gestor de expedientes, iManage y LexNET', systems_short: 'Gestor + iManage + LexNET', example: 'RGPD-2609-03', quality_tab: 'Cumplimiento' },
    doc_org: 'Mora & Jordano · Cumplimiento y calidad',
    report_org: 'Mora & Jordano · Dirección del despacho'
  },
  roles: {
    decider: 'Socio director',
    procesal: 'Socio responsable de Procesal',
    procesal_staff: 'Asociado sénior de Procesal',
    fiscal: 'Socia responsable de Fiscal y Tributario',
    mercantil: 'Socio responsable de Mercantil',
    civil: 'Socia responsable de Civil',
    compliance: 'Responsable de Cumplimiento (PBC y RGPD)',
    dpo: 'Delegado de Protección de Datos',
    client_care: 'Atención al cliente y facturación',
    it: 'Sistemas y seguridad de la información'
  }
});
