import { ref, watch } from 'vue'
import { convertirMarkdown } from '@/utils/markdown'

const STORAGE_KEY = 'notas'

function cargarNotas() {
  const guardado = localStorage.getItem(STORAGE_KEY)
  if (guardado) return JSON.parse(guardado)

  const bienvenidaMarkdown =
    '# Bienvenido a Notas\n\nEscribe tus notas en **Markdown**.\n\n- Crea, edita y elimina notas\n- Se guardan solas al cerrar el navegador'

  return [
    {
      id: crypto.randomUUID(),
      titulo: 'Nota de bienvenida',
      contenidoMarkdown: bienvenidaMarkdown,
      contenidoHtml: convertirMarkdown(bienvenidaMarkdown),
      fechaCreacion: new Date().toISOString(),
    },
  ]
}

const notas = ref(cargarNotas())

watch(
  notas,
  (valor) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(valor))
  },
  { deep: true },
)

export function useNotas() {
  function agregarNota({ titulo, contenidoMarkdown }) {
    notas.value.push({
      id: crypto.randomUUID(),
      titulo,
      contenidoMarkdown,
      contenidoHtml: convertirMarkdown(contenidoMarkdown),
      fechaCreacion: new Date().toISOString(),
    })
  }

  function editarNota(id, { titulo, contenidoMarkdown }) {
    const nota = notas.value.find((item) => item.id === id)
    if (!nota) return

    nota.titulo = titulo
    nota.contenidoMarkdown = contenidoMarkdown
    nota.contenidoHtml = convertirMarkdown(contenidoMarkdown)
  }

  function eliminarNota(id) {
    notas.value = notas.value.filter((item) => item.id !== id)
  }

  return {
    notas,
    agregarNota,
    editarNota,
    eliminarNota,
  }
}
