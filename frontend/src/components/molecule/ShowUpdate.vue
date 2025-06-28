<template>
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      
      <form @submit.prevent="submitUpdate">
        <h2>Modifier</h2>
        <slot></slot>
        <div class="form-actions">
          <button type="submit" class="modal-button">Save</button>
          <button type="button" class="modal-button cancel" @click="closeModal">X</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
defineProps(['showModal']);
const emit = defineEmits(['close', 'submit']);

const closeModal = () => {
  emit('close');
};

const submitUpdate = () => {
  emit('submit');
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


.form-actions {
  margin-top: 1rem;
}
</style>