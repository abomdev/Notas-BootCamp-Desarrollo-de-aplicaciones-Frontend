<template>
  <article class="nota-card">
    <div class="nota-header">
      <h2 class="nota-titulo">{{ nota.titulo }}</h2>
      <span class="nota-fecha">{{ fechaFormateada }}</span>
    </div>

    <div class="nota-contenido" v-html="nota.contenidoHtml"></div>

    <div class="nota-actions">
      <button class="btn-link" @click="$emit('editar', nota)">Editar</button>
      <button class="btn-link btn-link-danger" @click="$emit('eliminar', nota.id)">Eliminar</button>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  nota: {
    type: Object,
    required: true,
  },
})

defineEmits(['editar', 'eliminar'])

const fechaFormateada = computed(() =>
  new Date(props.nota.fechaCreacion).toLocaleDateString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }),
)
</script>
