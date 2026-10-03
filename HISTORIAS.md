# Historias por industria

Las cuatro consolas repiten los casos de la demo de Congelados de Navarra (`giqciklum/prodigy-cn-demo`),
trasladados a cada sector. Este documento fija los identificadores que comparten las escenas de una misma
industria, para que el resumen del turno, la alarma, la reclamación, el simulacro y el cuestionario cuenten
la misma historia. Todas las empresas, personas y cifras son ficticias. Fecha de la demo: martes 29/09/2026.

| Escena de referencia | Maquinaria (Hidromec Ebro) | Banca (Banco Cierzo) | Retail (Mercados Moncayo) | Cervecera (Cervecera Bardenas) |
|---|---|---|---|---|
| Resumen del turno | Planta de Zaragoza: mecanizado, montaje, banco de pruebas, expedición | Centro de Operaciones: canales, autorización, fraude, SAC | Plataforma de Plaza y 64 tiendas | Fábrica de Arguedas: cocimiento, bodega, envasado, almacén |
| Alarma con aprobación | Vibración del husillo del centro de mecanizado MC-04 | Pico de fraude en tarjetas del BIN 454812 | Mural de lácteos de la tienda T-027 por encima de 5 °C | Temperatura del fermentador FV-12 fuera de consigna |
| Reclamación | Fuga de aceite en una prensa PH-250 de un cliente | Cliente que no reconoce tres cargos con tarjeta | Consumidor que encuentra un fragmento de vidrio en tomate frito de marca propia | Distribuidor de hostelería con barriles con sabor oxidado |
| Simulacro de trazabilidad | Campaña de campo por el lote de juntas JNT-2607-031 | Punto común de compromiso CPP-2609-07 (TPV de una gasolinera) | Retirada del lote L26214 de tomate frito Moncayo | Retirada del lote de barril L2608-K14 |
| Cuestionario de cliente | Auditoría de proveedor de un fabricante de vehículos industriales | Wolfsberg CBDDQ de un banco corresponsal | Preauditoría IFS Logistics de la plataforma | Homologación de un importador británico |
| Procedimientos con citas | Mantenimiento, 8D, LOTO, campañas de campo | Fraude, SAC, reemisión, DORA, PBC/FT | APPCC de tienda, alertas, reclamaciones | APPCC, fermentación, retirada, vidrio, CIP |

## Maquinaria industrial · Hidromec Ebro, S.L. (Planta de Zaragoza, PLAZA)

Fabrica prensas hidráulicas (PH-160, PH-250, PH-400) y grupos hidráulicos (GH-30, GH-55). Sistemas: SAP S/4HANA
(PP, QM, SD), MES Opcenter, IIoT Vibración (sensores en husillos), GMAO Maximo, PLM Windchill, Salesforce Service,
Microsoft Teams, Outlook.

- **Alarma (05:50)**: centro de mecanizado **MC-04** (DMG Mori DMU 65), vibración del husillo **7,8 mm/s RMS**
  frente al límite de 4,5 mm/s (ISO 10816-3, zona D) desde las 03:40, pico 8,4 mm/s a las 05:32. En la ventana se
  mecanizaron **42 culatas de cilindro** del lote **CUL-2609-118** (OF 4100872). Agentes: Mantenimiento (OT en
  Maximo, parada y revisión de rodamientos), Calidad (bloqueo QM de las 42 piezas y metrología 100 %),
  Planificación (reasignar la OF a MC-02). Aprueba: Jefe de mantenimiento.
- **Reclamación**: **Prensas y Servicios del Norte, S.L.** (distribuidor, Bilbao) informa por correo de una fuga
  de aceite en la prensa **PH-250 n.º serie PH250-26-0412**, entregada el 04/08/2026 a su cliente final. La junta
  del cilindro principal es del lote **JNT-2607-031** del proveedor **Sellados Ibéricos, S.A.** Respuesta: acuse en
  24 h y 8D en 10 días laborables.
- **Simulacro**: lote de juntas **JNT-2607-031** → recibidas 1.200, montadas 1.104 en 3 lotes de montaje
  (MON-2607-22, MON-2608-03, MON-2608-11), 72 en almacén, 24 desechadas en inspección → **23 equipos en campo**
  (17 PH-250 y 6 GH-55) en **11 clientes** de España, Portugal y Francia. Objetivo: campaña en 4 h.
- **Cuestionario**: **Vehículos Industriales Arga** (OEM ficticio) envía su cuestionario de auditoría de
  proveedor (ISO 9001 certificada, IATF 16949 no certificada, marcado CE, Reglamento (UE) 2023/1230, PPAP nivel 3,
  trazabilidad por número de serie, calibración, plan de continuidad, ESG/ISO 14001).
- **Procedimientos**: PR-MAN-011 Vigilancia de vibraciones, IT-MEC-021 Cambio de husillo, PR-CAL-004 No
  conformidades, PR-CAL-008 Metodología 8D, PR-SEG-002 Consignación LOTO, PR-POS-005 Campañas de campo.

## Banca y servicios financieros · Banco Cierzo, S.A. (Centro de Operaciones, Madrid)

Sistemas: Core bancario T24, Falcon Fraud, Redsys, Salesforce FSC, ServiceNow, GRC Archer, Microsoft Teams, Outlook.
La «trazabilidad» se hace por expediente: comercio → tarjetas → clientes.

- **Alarma (05:50)**: **BIN 454812** (Tarjeta Cierzo Débito). La tasa de fraude en compras sin tarjeta presente
  sube al **2,9 %** frente al 0,3 % habitual desde las 02:10; **186 operaciones sospechosas** por 41.230 €, pico a
  las 04:55. Agentes: Fraude (regla de bloqueo preventivo en Falcon para comercio electrónico de riesgo alto en el
  BIN), Medios de pago (reemisión de 214 tarjetas afectadas), Clientes (SMS y notificación en la app). Aprueba:
  Responsable de Prevención del Fraude.
- **Reclamación**: la clienta **Lucía Ferrer Gil** no reconoce tres cargos (612,40 € en total) del comercio
  **TIENDAONLINE-ELEC** del 26/09/2026. Plazo de respuesta del SAC: 15 días hábiles (PSD2 y Orden ECE/1263/2019);
  la devolución provisional se decide antes del fin del día hábil siguiente.
- **Simulacro**: expediente **CPP-2609-07**, punto común de compromiso en el TPV 3 de **Gasolinera Ronda Norte**
  (comercio 334512987) entre el 10 y el 22/09/2026 → **1.284 tarjetas** usadas allí, 1.107 de Banco Cierzo y 177 de
  otros emisores (aviso por las redes Visa y Mastercard) → bloqueo, reemisión y aviso a clientes. Marco: PCI DSS,
  PSD2 y DORA (notificación inicial de incidente grave en 4 h).
- **Cuestionario**: **Nordbank AG** (corresponsal ficticio) pide el Wolfsberg **CBDDQ** v1.4 (propiedad, licencias,
  programa PBC/FT, sanciones, KYC, PEP, banca corresponsal, monitorización, formación, auditoría).
- **Procedimientos**: POL-FRA-003 Prevención del fraude en tarjetas, PR-SAC-001 Reclamaciones de clientes,
  PR-TAR-007 Bloqueo y reemisión, PR-DORA-002 Notificación de incidentes, MAN-PBC-001 Manual de PBC/FT.

## Gran consumo y retail · Mercados Moncayo, S.A. (Plataforma de Plaza, 64 tiendas)

Cadena de supermercados de Aragón y La Rioja con marca propia «Moncayo». Sistemas: SAP S/4 Retail, WMS Manhattan,
Sensores de frío, TPV de tiendas, CRM Fidelización, ServiceNow, Microsoft Teams, Outlook.

- **Alarma (05:50)**: tienda **T-027 Huesca Centro**, mural de lácteos **MR-3** a **9,4 °C** frente al límite de
  5 °C desde las 03:55 (fallo del ventilador del evaporador), pico 9,8 °C. Dentro hay **318 unidades** de
  refrigerados (yogures, postres y frescos). Agentes: Tienda (tarea de retirada y traslado a cámara), Mantenimiento
  de frío (OT urgente), Calidad (bloqueo de venta en TPV de lo expuesto > 2 h). Aprueba: Responsable de Calidad.
- **Reclamación**: el consumidor **Javier Lasheras** escribe desde la app de fidelización: fragmento de vidrio en
  un tarro de **Tomate frito Moncayo 400 g**, lote **L26214**, comprado en la tienda T-011 Zaragoza Delicias.
  Fabricante de la marca propia: **Conservas del Jalón, S.L.** Respuesta al consumidor en 48 h.
- **Simulacro**: lote **L26214** → recibidas 4.800 unidades en plataforma, servidas 4.320 a **41 tiendas**,
  480 en plataforma; **1.920 vendidas**, 2.400 en lineal; **612 clientes de fidelización** compraron el lote.
  Aviso a AESAN y a la comunidad autónoma; objetivo de retirada en 4 h.
- **Cuestionario**: **preauditoría IFS Logistics v3** de la plataforma (APPCC, control de temperaturas,
  trazabilidad, plagas, formación, gestión de incidentes, food defense, alérgenos).
- **Procedimientos**: APPCC-TIE-01 Cadena de frío en tienda, PR-CAL-010 Gestión de alertas y retiradas, PR-ATC-002
  Reclamaciones de consumidores, PR-PRO-006 Homologación de proveedores de marca propia, IT-TIE-014 Limpieza de
  murales.

## Cervecera y bebidas · Cervecera Bardenas, S.A. (Fábrica de Arguedas)

Elabora Bardenas Lager, Bardenas Tostada y Bardenas Sin. Sistemas: SAP S/4HANA, Brewmaxx (MES), SCADA bodega,
LIMS LabWare, WMS Mecalux, GMAO Maximo, Microsoft Teams, Outlook.

- **Alarma (05:50)**: fermentador **FV-12** (Bardenas Lager, lote de mosto **L2609-FV12**, 480 hl, día 3 de
  fermentación) a **16,8 °C** frente a la consigna de 12 °C (límite 13,5 °C) desde las 02:30 por fallo de la
  válvula de glicol **VG-12**; pico 17,1 °C a las 05:20. Agentes: Mantenimiento (OT de la válvula), Calidad
  (retención del lote y análisis de diacetilo y acetaldehído en LIMS), Producción (reprogramar el trasiego). Aprueba:
  Maestro cervecero.
- **Reclamación**: **Distribuciones Hosteleras Ribera, S.L.** informa de barriles de 30 l de Bardenas Lager con sabor
  a cartón (oxidación) en tres bares; lote de barril **L2608-K14**, envasado el 18/08/2026. Respuesta en 48 h.
- **Simulacro**: lote **L2608-K14** → 1.040 barriles llenados, 912 expedidos a **14 clientes** (distribuidores y
  hostelería), 96 en almacén, 32 retenidos por calidad; materias primas: malta **MAL-2607-05**, lúpulo
  **LUP-2606-11**, CO₂ **CO2-2608-02**. Objetivo de retirada en 4 h.
- **Cuestionario**: **Northgate Beverages Ltd** (importador británico ficticio) envía su cuestionario de
  homologación (BRCGS o IFS, APPCC, gluten, política de vidrio, trazabilidad, retirada, cuerpos extraños, envases,
  sostenibilidad, etiquetado UK).
- **Procedimientos**: APPCC-01 Plan APPCC, PR-FER-003 Control de fermentación, PR-CAL-006 Retirada de producto,
  PR-ENV-002 Gestión de vidrio y cuerpos extraños, PR-LIM-001 Limpieza CIP.
