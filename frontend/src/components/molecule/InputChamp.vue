<template>
    <div class="input">
        <input :placeholder="label" :type="type" :id="name" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" required>
    </div>
</template>

<script setup>
defineProps({
    label: {
        type: String,
        required: true
    },
    modelValue: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    },
    name: {
        type: String,
        default: ''
    }
})
</script>

<style scoped>
.input{
    margin-bottom: 1%;
}

input {
    padding: 0.75rem;
    font-family: 'ALATA';
    font-size: 1rem;
    color: #fff;
    /* background: transparent; */
    background-color: #0a0a0acf;
    border: none;
    border-bottom: 2px solid #fff;
    outline: none;
    width: 100%;
    border-radius: 10px;
    outline: none;
    -webkit-transition: width 0.4s ease-in-out;
    transition: width 0.4s ease-in-out;
}

input:hover
{
    width: 110%;
}

input::placeholder {
    color: #f8f8f8;
}

.modal-button {
  padding: 1rem 1rem;
  margin: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
}

.modal-button.cancel {
  background-color: #f44336;
}

</style>