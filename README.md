# Prodigy por industria

Cuatro consolas de demostración de Prodigy con la misma estructura de escenas que la demo de
Congelados de Navarra ([giqciklum/prodigy-cn-demo](https://github.com/giqciklum/prodigy-cn-demo)):

| Industria | Empresa ficticia | Consola |
|---|---|---|
| Maquinaria industrial | Hidromec Ebro | `consola.html?ind=maquinaria` |
| Banca y servicios financieros | Banco Cierzo | `consola.html?ind=banca` |
| Gran consumo y retail | Mercados Moncayo | `consola.html?ind=retail` |
| Cervecera y bebidas | Cervecera Bardenas | `consola.html?ind=cerveceria` |

Cada consola tiene las ocho escenas de la demo de referencia: resumen del turno, de palabras a workflow, alarma con
aprobación humana, reclamación de cliente, simulacro de trazabilidad, cuestionario de cliente, procedimientos con
citas y cómo encaja Prodigy. Los casos de cada sector y sus identificadores están en [HISTORIAS.md](HISTORIAS.md).

## Enlace público

[Abrir la demo de Manuel](https://giqciklum.github.io/prodigy-mf-demo/)

Elige una industria y entra en su consola. Los botones ESP y ENG cambian el idioma.

Esta publicación copia únicamente `demos/prodigy-industrias/` de la rama
`claude/prodigy-multi-industry-demos-yuipgg` de `Mfer131313/Prodigy_MF`, revisión
`d41f60df29873299a57165b7cb3a3f506efb48f4`. Manuel mantiene la fuente en su repositorio.
Esta copia no se actualiza automáticamente cuando él cambia la rama.

La publicación conserva las escenas y los paquetes de industria. Corrige comillas sin escapar
en el cuestionario inglés de cervecería y omite la carga del archivo privado opcional `llm-local.js`.

GitHub Pages sirve la raíz de `main`; el archivo `.nojekyll` permite servir los recursos estáticos.

## Abrirla en tu ordenador

Es HTML, CSS y JavaScript sin compilación ni dependencias. Basta con servir la carpeta:

```bash
python3 -m http.server 8080
# http://localhost:8080/            portada con las cuatro industrias
# http://localhost:8080/consola.html?ind=banca#alarma
```

`?reset=1` borra el estado guardado de la industria abierta. Cada industria guarda su estado aparte en el
navegador (`prodigy-ind-<industria>-v1`), así que publicar un workflow en banca no afecta a la cervecera.

## Cómo está hecha

```
index.html                       portada: selector de industria
consola.html                     la consola (marco de la demo de referencia)
HISTORIAS.md                     casos e identificadores por industria
assets/css/                      tokens y estilos de la demo de referencia, más opsmap.css e industrias.css
assets/js/
  industries/_register.js        prodigyPack(id, parte): reúne las partes de cada paquete
  industries/<industria>/        meta, turno, trace, workflow, alarma, reclamacion, retirada,
                                 cuestionario, procedimientos, plataforma (solo datos)
  boot.js                        elige el paquete (?ind= o la última industria), lo publica como CN_DATA y aplica sus colores
  core.js                        núcleo de la demo de referencia (App.*), con almacenamiento por industria y traza genérica
  opsmap.js                      mapa de la operación por zonas (sustituye al plano de planta)
  scenes/*.js                    las ocho escenas, genéricas: todo el texto del sector sale de CN_DATA
```

Las escenas no contienen texto de ningún sector. Para añadir una industria se crea una carpeta en
`assets/js/industries/` con las diez partes, se añade su id a `boot.js` y a la portada, y se cargan sus ficheros en
`consola.html`.

## Selector Frontera / Local

- **Frontera**: respuestas preparadas en el navegador. No hace llamadas a un modelo.
- **Local**: abre los ajustes de un servidor LiteLLM o una API compatible con OpenAI.
  Con una conexión válida, las escenas de procedimientos, cuestionario y reclamación pueden pedir al modelo
  que redacte texto. Los demás pasos y los conectores de negocio siguen siendo simulados.

La URL de la API, el nombre del modelo y la clave se introducen en el diálogo de conexión.
El código de Manuel guarda esos datos en el almacenamiento local de ese navegador.
No se incluye ninguna clave en esta publicación. Usa una clave virtual limitada para la demo.
La API debe permitir las peticiones del navegador desde este origen (CORS).
`localhost:4000` se refiere al ordenador de quien abre la página; no es un servidor compartido.
La conexión real al modelo requiere un servicio accesible y configurado. Publicar en GitHub Pages solo aloja la interfaz.

Las empresas y los datos son ficticios. Esta carpeta no incluye el backend, la base de datos ni los agentes
del framework Prodigy. No envía correos, bloquea equipos ni modifica sistemas reales.
