<template>
  <div class="modal-overlay" @click.self="$emit('cerrar')">
    <div class="modal">
      <h2 class="modal-title">{{ nota ? 'Editar nota' : 'Nueva nota' }}</h2>

      <form @submit.prevent="guardar">
        <label class="field">
          <span>Título</span>
          <input v-model.trim="form.titulo" type="text" placeholder="Título de la nota" />
          <small v-if="intentoGuardar && !tituloValido" class="field-error">
            El título es obligatorio.
          </small>
        </label>

        <label class="field">
          <span>Contenido</span>
          <textarea
            v-model="form.contenidoMarkdown"
            rows="10"
            placeholder="# Título&#10;&#10;Escribe tu nota en **Markdown**..."
          ></textarea>
          <small v-if="intentoGuardar && !contenidoValido" class="field-error">
            El contenido no puede estar vacío.
          </small>

          <p class="markdown-hints-title">Sugerencias de Markdown</p>
          <ul class="markdown-hints">
            <li><code># Título</code></li>
            <li><code>## Subtítulo</code></li>
            <li><code>**negrita**</code></li>
            <li><code>*cursiva*</code></li>
            <li><code>- Ítem de lista</code></li>
            <li><code>[texto](https://url.com)</code></li>
            <li><code>`código`</code></li>
          </ul>
        </label>

        <div class="modal-actions">
          <button type="button" class="btn btn-secondary" @click="$emit('cerrar')">Cancelar</button>
          <button type="submit" class="btn btn-primary">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

const props = defineProps({
  nota: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['guardar', 'cerrar'])

const form = reactive({
  titulo: props.nota?.titulo ?? '',
  contenidoMarkdown: props.nota?.contenidoMarkdown ?? '',
})

const intentoGuardar = ref(false)

const tituloValido = computed(() => form.titulo.length > 0)
const contenidoValido = computed(() => form.contenidoMarkdown.trim().length > 0)
const formularioValido = computed(() => tituloValido.value && contenidoValido.value)

function guardar() {
  intentoGuardar.value = true
  if (!formularioValido.value) return

  emit('guardar', { titulo: form.titulo, contenidoMarkdown: form.contenidoMarkdown })
}
</script>
