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
@use "@/assets/spacing.scss";

.regular-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  main {
    padding: 0 spacing.$padding-x;
    margin-top: spacing.$toolbar-height;
  }
}

@media (max-width: 480px) {
  main {
    padding: 0 20px !important;
    margin-top: spacing.$toolbar-height;
  }
}
</style>
