/*
 * Registro de paquetes de industria. Cada fichero industries/<id>/<parte>.js aporta una parte del paquete
 * (meta, turno, trace, workflow, alarma, reclamacion, retirada, cuestionario, procedimientos, plataforma):
 *   prodigyPack('cerveceria', { alarma: { ... } });
 * La versión en inglés de cada parte vive en industries/<id>/en/<parte>.js y se registra igual:
 *   prodigyPackEn('cerveceria', { alarma: { ... } });
 * boot.js elige después el paquete activo, sustituye las partes por las inglesas si el idioma es inglés
 * y lo publica como window.CN_DATA.
 */
window.PRODIGY_INDUSTRIES = window.PRODIGY_INDUSTRIES || {};
window.PRODIGY_INDUSTRIES_EN = window.PRODIGY_INDUSTRIES_EN || {};
window.prodigyPack = function (id, part) {
  'use strict';
  const P = window.PRODIGY_INDUSTRIES;
  P[id] = Object.assign(P[id] || {}, part);
  return P[id];
};
window.prodigyPackEn = function (id, part) {
  'use strict';
  const P = window.PRODIGY_INDUSTRIES_EN;
  P[id] = Object.assign(P[id] || {}, part);
  return P[id];
};
