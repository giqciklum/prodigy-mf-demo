/*
 * Registro de paquetes de industria. Cada fichero industries/<id>/<parte>.js aporta una parte del paquete
 * (meta, turno, trace, workflow, alarma, reclamacion, retirada, cuestionario, procedimientos, plataforma):
 *   agenticPack('cerveceria', { alarma: { ... } });
 * La versión en inglés de cada parte vive en industries/<id>/en/<parte>.js y se registra igual:
 *   agenticPackEn('cerveceria', { alarma: { ... } });
 * boot.js elige después el paquete activo, sustituye las partes por las inglesas si el idioma es inglés
 * y lo publica como window.CN_DATA.
 */
window.AGENTIC_INDUSTRIES = window.AGENTIC_INDUSTRIES || {};
window.AGENTIC_INDUSTRIES_EN = window.AGENTIC_INDUSTRIES_EN || {};
window.agenticPack = function (id, part) {
  'use strict';
  const P = window.AGENTIC_INDUSTRIES;
  P[id] = Object.assign(P[id] || {}, part);
  return P[id];
};
window.agenticPackEn = function (id, part) {
  'use strict';
  const P = window.AGENTIC_INDUSTRIES_EN;
  P[id] = Object.assign(P[id] || {}, part);
  return P[id];
};
