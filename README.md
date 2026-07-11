# Notas

## El problema

Se pidió una app de notas donde el contenido se escribiera en Markdown y, al guardar, se convirtiera a HTML - sin depender de un backend, con las notas persistiendo entre sesiones del navegador.

## La solución

Una app de notas en Vue 3 con CRUD completo: cada nota se escribe en Markdown, se convierte a HTML sanitizado al guardarla, y se muestra ya renderizada. Todo persiste en `localStorage`.

## Cómo lo resolví

- **Conversión Markdown → HTML aislada**: `utils/markdown.js` usa `marked` para convertir el texto y `DOMPurify` para sanitizar el resultado antes de renderizarlo con `v-html`, evitando inyectar HTML sin control.
- **Doble representación del contenido**: cada nota guarda tanto el Markdown crudo (para poder volver a editarla) como el HTML ya convertido (para mostrarla), generados una sola vez al guardar.
- **CRUD en composable**: `useNotas.js` centraliza alta, edición, borrado y persistencia en `localStorage`, separado de la interfaz.

## Features

- Crear, editar y eliminar notas.
- Contenido en Markdown, convertido a HTML al guardar.
- Sugerencias de sintaxis Markdown visibles en el formulario.
- Fecha de creación de cada nota.
- Persistencia en `localStorage`, sin backend.

## Tecnologías

- [Vue 3](https://vuejs.org/) (Composition API)
- [Vite](https://vitejs.dev/)
- [marked](https://marked.js.org/) + [DOMPurify](https://github.com/cure53/DOMPurify)
- JavaScript
