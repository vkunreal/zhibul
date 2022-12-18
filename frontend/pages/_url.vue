<template>
  <section class="category fill-width d-flex justify-center mb-10 pl-2 pr-2">
    <div class="category-wrapper fill-width">
      <h1>{{ categoryName }}</h1>

      <div class="mt-4">
        <div v-if="items?.length" class="d-flex flex-wrap">
          <div
            class="category__item pd-2"
            v-for="{ id, name, brand, manufacturer, price } in items"
            :key="id"
          >
            <img height="200" :src="itemImage(id)" :alt="name" />
            <h3>{{ name }} {{ id }}</h3>
            <p>{{ brand }}</p>
            <p>{{ manufacturer }}</p>
            <p>{{ price }} руб.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  watch: {
    categories() {
      console.log(this.categoryName);
    },
  },
  computed: {
    ...mapGetters("app", ["categories"]),
    ...mapGetters("items", ["items"]),
    url() {
      return this.$route.params.url || "";
    },
    category() {
      return this.categories.filter((c) => c.url === this.url)[0] || null;
    },
    categoryName() {
      return this.category?.name || "";
    },
    itemImage() {
      return (id) =>
        this.items.filter((i) => i.id === id)[0]?.images?.split(",")[0] || "";
    },
  },
  async fetch({ store }) {
    await store.dispatch("items/fetchItems", { categoryId: this.category?.id });
  },
};
</script>

<style lang="scss">
@import "@/assets/mixins.scss";

.category {
  & ul {
    padding-left: 0 !important;
  }
  & li {
    list-style: none;
  }
  &-wrapper {
    max-width: 1024px;
  }
  &__item {
    width: 100%;
    margin: 5px;
  }

  @include tablet {
    &__item {
      width: 48%;
    }
  }

  @include laptop {
    &__item {
      width: 32%;
    }
  }
}
</style>
