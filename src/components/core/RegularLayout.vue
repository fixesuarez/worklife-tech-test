<script setup lang="ts">
import WToolbar from "@/components/core/WToolbar.vue";
</script>

<template>
  <div class="regular-layout">
    <WToolbar />
    <main>
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/variables.scss";

.regular-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  main {
    padding: 0 variables.$padding-x;
    margin-top: variables.$toolbar-height;
  }
}

@media (max-width: 480px) {
  main {
    padding: 0 20px !important;
    margin-top: variables.$toolbar-height;
  }
}
</style>
