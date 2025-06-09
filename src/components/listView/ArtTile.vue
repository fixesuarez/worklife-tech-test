<script setup lang="ts">
defineProps<{
  imageUrl: string;
  title: string;
}>();
</script>

<template>
  <div class="artwork-tile">
    <img :src="imageUrl" :alt="title" class="artwork-image" loading="lazy" />
    <div class="artwork-title-container">
      <span class="art-item-title">{{ title }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/variables.scss";

.artwork-tile {
  position: relative;
  &:hover {
    .artwork-title-container {
      background-color: rgba(255, 255, 255, 0.7);
    }
    .art-item-title {
      color: rgba(0, 0, 0, 1) !important;
    }
  }
  .artwork-image {
    width: 100%;
    height: variables.$tile-height-regular;
    object-fit: cover;
    border-radius: 4px;
  }
  .artwork-title-container {
    position: absolute;
    bottom: 3px;
    left: 0;
    height: 50%;
    width: 100%;
    display: grid;
    place-content: center;
    background-color: rgba(255, 255, 255, 0);
    padding: 8px;
    box-sizing: border-box;
    border-radius: 0 0 4px 4px;
    transition: all 0.3s ease;
    .art-item-title {
      color: rgba(0, 0, 0, 0);
      text-align: center;
      font-size: 1rem;
      border-radius: 0 0 4px 4px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: all 0.3s ease;
    }
  }
}
@media (max-width: 480px) {
  .artwork-tile {
    .art-image {
      height: variables.$tile-height-mobile;
    }
  }
}
</style>
