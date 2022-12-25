<template>
  <section class="category fill-width d-flex justify-center mb-10 pl-2 pr-2">
    <div class="category-wrapper fill-width">
      <h1>{{ categoryName }}</h1>

      <div class="mt-4">
        <div v-if="items?.length" class="category__list">
          <template v-for="item in items">
            <nuxt-link :to="category.url + '/' + item.url" :key="item.id">
              <v-product class="category__item" :product="item" />
            </nuxt-link>
          </template>
        </div>
        <h3 v-else>Товаров пока нет</h3>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import VProduct from "@/components/VProduct";

export default {
  components: { VProduct },
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
  },
  // { store, req, redirect }
  async fetch({ store, params }) {
    if (params?.url) {
      await store.dispatch("items/fetchItems", { url: params.url });
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/mixins.scss";

.category {
  & a {
    color: #000;
    text-decoration: none;
  }
  &-wrapper {
    max-width: 1024px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__item {
    width: 100%;
  }

  @include tablet {
    &__list {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
}
</style>
