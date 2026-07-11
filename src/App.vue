<template>
  <main class="container">
    <header class="header">
      <h1>Notas</h1>
      <p class="subtitle">Crea y guarda tus notas en Markdown para usarlas más adelante.</p>
    </header>

    <div class="toolbar">
      <button class="btn btn-primary" @click="abrirFormulario()">Nueva nota</button>
    </div>

    <div v-if="notas.length === 0" class="empty-state">
      Todavía no creaste ninguna nota.
    </div>

    <div v-else class="notas-grid">
      <NotaCard
        v-for="nota in notas"
        :key="nota.id"
        :nota="nota"
        @editar="abrirFormulario"
        @eliminar="eliminarNota"
      />
    </div>

    <NotaForm
      v-if="formularioAbierto"
      :nota="notaSeleccionada"
      @guardar="guardarNota"
      @cerrar="cerrarFormulario"
    />
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useNotas } from '@/composables/useNotas'
import NotaForm from '@/components/NotaForm.vue'
import NotaCard from '@/components/NotaCard.vue'

const { notas, agregarNota, editarNota, eliminarNota } = useNotas()

const formularioAbierto = ref(false)
const notaSeleccionada = ref(null)

function abrirFormulario(nota = null) {
  notaSeleccionada.value = nota
  formularioAbierto.value = true
}

function cerrarFormulario() {
  formularioAbierto.value = false
  notaSeleccionada.value = null
}

function guardarNota(datos) {
  if (notaSeleccionada.value) {
    editarNota(notaSeleccionada.value.id, datos)
  } else {
    agregarNota(datos)
  }
  cerrarFormulario()
}
</script>
