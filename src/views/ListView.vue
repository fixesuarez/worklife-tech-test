<script setup lang="ts">
import RegularLayout from "@/components/core/RegularLayout.vue";
import SearchForm from "@/components/listView/SearchForm.vue";
import ArtTile from "@/components/listView/ArtTile.vue";
import { ref } from "vue";
import type {
  ArtworkDetails,
  MuseumCollectionSearchResponse,
} from "@/models/museum";
import {
  getArtworkDetails,
  getMuseumCollection,
} from "@/services/museumCollectionService";

const isLoading = ref(false);

const museumCollectionSearchResponse = ref<MuseumCollectionSearchResponse>();
const searchMuseumCollection = async (searchParams: Record<string, string>) => {
  isLoading.value = true;
  artworks.value = [];
  museumCollectionSearchResponse.value =
    await getMuseumCollection(searchParams);
  getNextArtworksDetails();
};
const getNextArtworksDetails = async () => {
  if (!museumCollectionSearchResponse.value) return;
  const nextItems = museumCollectionSearchResponse.value.orderedItems.splice(
    0,
    20,
  );
  const artworkDetails = await getArtworkDetails(nextItems);
  addArtworks(artworkDetails);
  isLoading.value = false;
};

const artworks = ref<ArtworkDetails[]>([]);
const addArtworks = (newArtworks: ArtworkDetails[]) => {
  artworks.value = [...artworks.value, ...newArtworks];
};
</script>

<template>
  <RegularLayout>
    <div class="list-view-container">
      <SearchForm
        @on-artwork-search="searchMuseumCollection"
        class="art-search-form"
        :loading="isLoading"
      />
      <div class="tiles-container">
        <ArtTile
          v-for="(artwork, index) in artworks"
          :key="index"
          :image-url="artwork.imageUrl"
          :title="artwork.title"
        />
      </div>
    </div>
  </RegularLayout>
</template>

<style lang="scss" scoped>
.list-view-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  :deep(.search-form) {
    padding: 4rem 0;
  }
  .tiles-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .list-view-container {
    padding-bottom: 2rem;
    .tiles-container {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 8px;
    }
  }
}
</style>
