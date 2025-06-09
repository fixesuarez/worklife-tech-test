<script setup lang="ts">
import WTextInput from "@/components/core/inputs/WTextInput.vue";
import WButton from "@/components/core/inputs/WButton.vue";
import WSelect from "@/components/core/inputs/WSelect.vue";
import { ref } from "vue";

defineProps<{
  loading?: boolean;
}>();

const filterType = ref<string>("title");
const SEARCH_TYPES: Readonly<Record<string, string>> = {
  title: "Title",
  creator: "Artist",
  type: "Type",
};
const artSearch = ref<string>("");

const emit = defineEmits<{
  "on-artwork-search": [searchParams: Record<string, string>];
}>();
const submitSearch = () => {
  const searchParams = {
    [filterType.value]: artSearch.value,
  };
  emit("on-artwork-search", searchParams);
};
</script>

<template>
  <form class="search-form" @submit.prevent="submitSearch">
    <WSelect
      label="Search by"
      v-model="filterType"
      :label-values="SEARCH_TYPES"
      class="select-filter"
    />
    <WTextInput
      v-model="artSearch"
      label="Keyword"
      autofocus
      class="keyword-input"
    />
    <WButton :disabled="!artSearch" :loading>Show artworks</WButton>
  </form>
</template>

<style lang="scss" scoped>
.search-form {
  display: flex;
  align-items: center;
  gap: 20px;
  .select-filter {
    max-width: 100px;
  }
  .keyword-input {
    width: 400px;
    max-width: 50%;
  }
}

@media (max-width: 480px) {
  .search-form {
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    .select-filter {
      width: 100%;
    }
    .keyword-input {
      width: 180px;
      max-width: unset;
    }
  }
}
</style>
