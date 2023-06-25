<template>
  <section class="catalog fill-width d-flex flex-column align-center mb-10">
    <div class="breadcrumbs">
      <div class="breadcrumbs-wrapper">
        <p class="breadcrumbs__link">
          <nuxt-link class="mr-1" to="/">Каталог</nuxt-link> /
        </p>
      </div>
    </div>

    <div class="catalog-wrapper fill-width pl-2 pr-2">
      <div class="mt-4">
        <div v-if="filteredCategories" class="catalog__list">
          <div
            v-for="{ name, description, image, url } in filteredCategories"
            class="catalog__item d-flex flex-column-reverse justify-space-between"
          >
            <div class="d-flex flex-column align-center justify-space-between">
              <nuxt-link :to="'/menu/' + url" class="mb-10">
                <h2>{{ name }}</h2>
              </nuxt-link>

              <div class="d-flex g-2">
                <nuxt-link :to="'/menu/' + url">
                  <button class="category__undercategories-button catalog">
                    Каталог
                  </button>
                </nuxt-link>
                <button
                  class="category__undercategories-button request"
                  @click="$orderModal()"
                >
                  Запрос
                </button>
              </div>
            </div>

            <nuxt-link :to="'/menu/' + url">
              <img class="catalog__item-image" :src="image" :alt="name" />
            </nuxt-link>
          </div>
        </div>
        <h3 v-else>Категорий пока нет</h3>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import VProduct from "@/components/VProduct";

export default {
  head() {
    return {
      title: this.page?.seo_title || "Каталог",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.page?.seo_description || "",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.page?.seo_keywords || "",
        },
      ],
    };
  },
  components: { VProduct },
  computed: {
    ...mapGetters("app", ["page", "categories"]),
    url() {
      return this.$route.params.url || "";
    },
    filteredCategories() {
      return (
        this.categories
          .filter((c) => !c.parent_id)
          ?.sort((a, b) => (a.position < b.position ? -1 : 1)) || []
      );
    },
  },
  // { store, req, redirect }
  async fetch({ store, params }) {
    const appVariables = store.getters.appVariables;
    const categories = store.getters.categories;
    if (!appVariables || !appVariables.length) {
      await store.dispatch("app/fetchVariables");
    }
    if (!categories || !categories.length) {
      await store.dispatch("app/fetchCategories");
    }
    await store.dispatch("app/fetchPage", "catalog");
  },
};
</script>

<style lang="scss">
@import "@/assets/mixins.scss";

.catalog {
  h2 {
    font-size: 24px;
    font-weight: 400;
  }
  & a {
    color: $black;
    text-decoration: none;
  }
  &-wrapper {
    max-width: 1024px;
  }

  &__item {
    width: 100%;
    text-align: center;
    &-image {
      width: 100%;
      // max-width: 400px;
      margin: 0 auto;
    }
  }

  @include tablet {
    &__list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      row-gap: 50px;
      column-gap: 20px;
    }
  }
}
</style>
