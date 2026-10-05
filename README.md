# Demo de Manuel por industria

Copia pública de la interfaz de Manuel Fernández-Utrilla Miguel, tomada de
`Mfer131313/Agentic_Platform_MFM`, revisión `43dc52f592910c299a6fa8bc24e114dfe7e4da44`.

[Abrir el despacho Mora & Jordano](https://giqciklum.github.io/prodigy-mf-demo/consola.html?ind=abogados&lang=es#turno)

[Abrir todas las industrias](https://giqciklum.github.io/prodigy-mf-demo/)

Cinco escenarios con datos ficticios: maquinaria, banca, retail, cervecería y despacho de abogados.
Cada uno incluye ocho pantallas, español e inglés, y modo presentador.

## Alcance

Frontera reproduce respuestas preparadas; no llama a un modelo. Local permite configurar una API
compatible con OpenAI/LiteLLM. Prodigy permite configurar un runtime autenticado.
Las consultas al modelo se aplican a procedimientos, cuestionario y respuesta a reclamación;
los conectores y otras acciones siguen simulados.
GitHub Pages aloja la interfaz estática: esta publicación no despliega Prodigy ni un modelo.
La vista pública funciona en modo de demostración sin claves ni instalación.

La copia no se sincroniza automáticamente con el repositorio de Manuel. `version.json` identifica
la revisión copiada. Solo publicamos HTML, estilos, scripts y datos sintéticos de la demo.
No incluye los ZIP del framework, configuraciones privadas, claves, grabaciones ni notas internas.

## Descargar

[HTML con recursos incrustados](https://giqciklum.github.io/prodigy-mf-demo/agentic-consola.html).
Puedes abrirlo en tu ordenador y configurar una conexión propia. El archivo mantiene las cinco
industrias y los idiomas. La web omite la carga opcional de `llm-local.js`, un archivo privado
que no forma parte del repositorio.

Los cambios confirmados en `main` de este repositorio publican esta copia en GitHub Pages.
