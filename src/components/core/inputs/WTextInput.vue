<script setup lang="ts">
defineProps<{
  modelValue: string;
  label?: string;
  autofocus?: boolean;
}>();
const model = defineModel();
</script>

<template>
  <div class="floating-label-input">
    <input type="text" v-model="model" :id="label" placeholder=" " autofocus />
    <label :for="label">{{ label }}</label>
  </div>
</template>

<style lang="scss" scoped>
.floating-label-input {
  position: relative;
  display: inline-block;
  font-family: sans-serif;

  input {
    width: 100%;
    padding: 1.25rem 0 0.25rem 0;
    font-size: 1rem;
    border: none;
    border-bottom: 2px solid #7a7a7a;
    background: transparent;
    box-sizing: border-box;
    outline: none;
    transition: border-color 0.2s;
    color: #2f2f2f;

    &:focus {
      border-bottom: 2px solid #000;
    }

    &:focus + label,
    &:not(:placeholder-shown) + label {
      transform: translateY(-1.2rem) scale(0.75);
      color: #2f2f2f;
    }
  }

  label {
    color: #7a7a7a;
    position: absolute;
    left: 0;
    top: 1.25rem;
    font-size: 1rem;
    pointer-events: none;
    transition: all 0.2s ease;
    transform-origin: top left;
  }
}
</style>
