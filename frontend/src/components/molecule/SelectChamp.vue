<template>
  <div class="input">
    <select
      :id="name"
      :multiple="multiple"
      :value="modelValue"
      @change="onChange"
    >
      <option
        v-if="!multiple"
        disabled
        value=""
      >-- {{ label }} --</option>

      <option
        v-for="option in options"
        :key="option.id"
        :value="option.id"
      >
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  modelValue: {
    type: [String, Number, Array],
    default: () => []
  },
  name: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    required: true
  },
  multiple: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

function onChange(event) {
  const selected = event.target.selectedOptions
  const values = Array.from(selected).map(option => option.value)
  emit('update:modelValue', props.multiple ? values : values[0])
}
</script>

<style>
.input {
  margin-bottom: 1%;
}

select {
  padding: 0.75rem;
  font-family: 'ALATA';
  font-size: 1rem;
  color: #fff;
  background-color: #0a0a0acf;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  width: 80%;
  border-radius: 10px;
  transition: width 0.4s ease-in-out;
}

select:hover {
  width: 90%;
}

select option {
  background-color: #0a0a0acf;
  color: #fff;
}
</style>