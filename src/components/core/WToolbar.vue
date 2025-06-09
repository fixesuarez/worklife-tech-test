<script setup lang="ts"></script>

<template>
  <div class="toolbar">
    <RouterLink class="logo-wrapper" :to="{ name: 'landing' }">
      <img
        class="toolbar-logo"
        src="@/assets/test-logo.png"
        alt="Technical test logo"
      />
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/variables.scss";

.toolbar {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100vw;
  height: variables.$toolbar-height;
  padding: 5px variables.$padding-x;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  .logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .toolbar-logo {
      margin: -5px;
      height: 100%;
    }
  }
}

@media screen and (max-width: 480px) {
  .toolbar {
    padding: 5px 20px !important;
    .logo-wrapper {
      .toolbar-logo {
        height: 100%;
      }
    }
  }
}
</style>
