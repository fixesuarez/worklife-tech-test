<script setup lang="ts">
defineProps<{
  label?: string;
  labelValues: Record<string, string>;
}>();
const model = defineModel<string>();
</script>

<template>
  <div class="form-field" :class="{ filled: model }">
    <select id="custom-select" v-model="model">
      <option value="" disabled selected hidden></option>
      <option v-for="(label, value, index) in labelValues" :key="index" :value>
        {{ label }}
      </option>
    </select>
    <label for="custom-select">{{ label }}</label>
  </div>
</template>

<style lang="scss" scoped>
.form-field {
  position: relative;
  width: 150px;

  select {
    width: 100%;
    padding: 1.25rem 0 0.25rem 0;
    font-size: 1rem;
    border: none;
    border-bottom: 2px solid #7a7a7a;
    box-sizing: border-box;
    background: transparent;
    appearance: none;
    outline: none;
  }
  select:active,
  &.filled select {
    border-bottom: 2px solid #000;
  }

  label {
    position: absolute;
    left: 0;
    top: 1.25rem;
    font-size: 1rem;
    color: #7a7a7a;
    pointer-events: none;
    transition: all 0.2s ease;
    transform-origin: left top;
  }

  &.filled label,
  select:focus ~ label {
    transform: translateY(-1.2rem) scale(0.75);
    color: #000;
  }

  &::after {
    content: "▼";
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.7rem;
    pointer-events: none;
    color: #000;
  }
}
</style>
