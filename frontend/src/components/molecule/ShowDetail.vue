<template>
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <slot></slot>
      <button class="modal-button" @click="closeModal">Fermer</button>
    </div>
  </div>
</template>

<script setup>

defineProps(['showModal']);
const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #2a2a2a;
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
}

</style>

