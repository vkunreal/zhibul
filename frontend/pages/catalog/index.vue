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
      <h1 class="mt-8 mb-8 text-center text-uppercase">Каталог</h1>

      <div class="mt-4">
        <div v-if="filteredCategories" class="d-flex flex-column g-8">
          <div
            v-for="{ name, description, image, url } in filteredCategories"
            class="catalog__item d-flex flex-column-reverse flex-md-row justify-space-between"
            :title="name"
          >
            <div class="d-flex flex-column justify-space-between">
              <div>
                <h2>{{ name }}</h2>
                <p class="mt-10">{{ description }}</p>
              </div>

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

            <img class="catalog__item-image" :src="image" :alt="name" />
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
      return this.categories.filter((c) => !c.parent_id) || [];
    },
  },
  // { store, req, redirect }
  async fetch({ store, params }) {
    await store.dispatch("app/fetchPage", "catalog");
  },
};
</script>

<style lang="scss">
@import "@/assets/mixins.scss";

.catalog {
  h2 {
    font-size: 32px;
    font-weight: 400;
  }
  & a {
    color: #000;
    text-decoration: none;
  }
  &-wrapper {
    max-width: 1024px;
  }

  &__item {
    width: 100%;
    &-image {
      width: 100%;
      max-width: 400px;
    }
  }
}
</style>
