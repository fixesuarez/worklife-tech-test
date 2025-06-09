<script setup lang="ts">
import RegularLayout from "@/components/core/RegularLayout.vue";
import SearchForm from "@/components/listView/SearchForm.vue";
import ArtTile from "@/components/listView/ArtTile.vue";
import { computed, ref } from "vue";
import type {
  ArtworkDetails,
  MuseumCollectionSearchResponse,
} from "@/models/museum";
import {
  getArtworkDetails,
  getMuseumCollection,
} from "@/services/museumCollectionService";
import WButton from "@/components/core/inputs/WButton.vue";
import { httpGet } from "@/utils/http";

const isLoading = ref(false);
const artworks = ref<ArtworkDetails[]>([]);

const museumCollectionSearchResponse = ref<MuseumCollectionSearchResponse>();
const searchMuseumCollection = async (
  searchParams?: Record<string, string>,
) => {
  isLoading.value = true;
  artworks.value = [];
  museumCollectionSearchResponse.value =
    await getMuseumCollection(searchParams);
  getNextArtworksDetails();
};
searchMuseumCollection();
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

const addArtworks = (newArtworks: ArtworkDetails[]) => {
  artworks.value = [...artworks.value, ...newArtworks];
};

const isLoadMoreButtonVisible = computed<boolean>(() => {
  return (
    !!museumCollectionSearchResponse.value &&
    (!!museumCollectionSearchResponse.value.next ||
      (museumCollectionSearchResponse.value?.orderedItems &&
        museumCollectionSearchResponse.value.orderedItems.length > 0))
  );
});
const loadMoreArtworks = async () => {
  isLoading.value = true;
  if (
    museumCollectionSearchResponse.value?.orderedItems &&
    museumCollectionSearchResponse.value.orderedItems.length > 0
  ) {
    await getNextArtworksDetails();
  } else if (museumCollectionSearchResponse.value?.next) {
    museumCollectionSearchResponse.value = await httpGet(
      museumCollectionSearchResponse.value.next.id,
    );
    getNextArtworksDetails();
  }
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
      <WButton
        v-if="artworks.length > 0 && isLoadMoreButtonVisible"
        :loading="isLoading"
        @click="loadMoreArtworks()"
        >Load more</WButton
      >
    </div>
  </RegularLayout>
</template>

<style lang="scss" scoped>
@use "@/assets/variables.scss";

.list-view-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 4rem;
  padding-bottom: 4rem;
  :deep(.search-form) {
    padding-top: 4rem;
  }
  .tiles-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(variables.$tile-height-regular, 1fr)
    );
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .list-view-container {
    padding-bottom: 2rem;
    .tiles-container {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 8px;
      padding-bottom: 2rem;
    }
  }
}
</style>
