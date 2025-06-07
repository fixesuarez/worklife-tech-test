<script setup lang="ts">
defineProps<{
  disabled?: boolean;
  loading?: boolean;
}>();
</script>

<template>
  <div class="w-button">
    <button>
      <slot />
    </button>
    <div class="loader-container" v-if="disabled || loading">
      <span v-if="loading" class="loader" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$radius: 4px;
.w-button {
  position: relative;
  button {
    padding: 0.75rem 1rem;
    background: transparent;
    font-size: 1rem;
    letter-spacing: 0.05em;
    color: #000;
    border: none;
    border: 2px solid #000;
    border-radius: $radius;
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover,
    &:focus {
      background: #000;
      color: #fff;
      outline: none;
      padding: 0.75rem 1rem;
    }
  }
  .loader-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    place-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: $radius;
  }
  .loader {
    width: 1rem;
    height: 1rem;
    border: 2px solid white;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
