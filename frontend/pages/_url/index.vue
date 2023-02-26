<template>
  <section class="category fill-width d-flex flex-column align-center mb-10">
    <div class="breadcrumbs">
      <div class="breadcrumbs-wrapper">
        <p class="breadcrumbs__link">
          <nuxt-link class="mr-1" to="/">Каталог</nuxt-link> /
        </p>
        <p
          class="breadcrumbs__link"
          v-for="category in breadCategories.slice(0, -1)"
          :key="category?.id"
        >
          <nuxt-link class="mr-1" :to="`/${category?.url}`">{{
            category?.name
          }}</nuxt-link>
          /
        </p>
        <p class="breadcrumbs__link">
          <nuxt-link class="mr-1" :to="`/${category?.url}`">{{
            category?.name
          }}</nuxt-link>
        </p>
      </div>
    </div>

    <div class="category-wrapper fill-width pl-2 pr-2">
      <h1 class="mt-8 mb-8 text-center text-uppercase">{{ categoryName }}</h1>

      <div class="mt-4">
        <div
          v-if="
            !category?.parent_id && !items?.length && undercategories.length
          "
          class="d-flex flex-column g-8"
        >
          <div
            v-for="{ name, description, image, url } in undercategories"
            class="d-flex justify-space-between"
            :title="name"
          >
            <div class="d-flex flex-column justify-space-between">
              <h3>{{ name }}</h3>
              <p>{{ description }}</p>

              <div class="d-flex g-2">
                <nuxt-link :to="url">
                  <button class="category__undercategories-button catalog">
                    Каталог
                  </button>
                </nuxt-link>
                <button class="category__undercategories-button request">
                  Запрос
                </button>
              </div>
            </div>

            <img width="400" :src="image" :alt="name" />
          </div>
        </div>
        <div
          v-else-if="items?.length"
          class="category__list d-flex flex-column"
        >
          <template v-for="item in items">
            <nuxt-link :to="category?.url + '/' + item.url" :key="item.id">
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
  computed: {
    ...mapGetters("app", ["categories"]),
    ...mapGetters("items", ["items"]),
    url() {
      return this.$route.params.url || "";
    },
    category() {
      return this.categories.filter((c) => c.url === this.url)[0] || null;
    },
    undercategories() {
      console.log(
        this.categories.filter((c) => c?.parent_id === this?.category.id) || []
      );
      return (
        this.categories.filter((c) => c?.parent_id === this?.category.id) || []
      );
    },
    categoryName() {
      return this.category?.name || "";
    },
    breadCategories() {
      let tempCategory = this.category;
      const result = [];
      while (tempCategory?.parent_id) {
        result.push(tempCategory);
        tempCategory =
          this.categories.filter((c) => c.id === tempCategory.parent_id)[0] ||
          null;
      }
      result.push(tempCategory);
      return result.reverse();
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
    gap: 10px;
  }

  &__item {
    width: 100%;
  }
}
</style>
