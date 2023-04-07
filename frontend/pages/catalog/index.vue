<template>
  <section class="category fill-width d-flex flex-column align-center mb-10">
    <div class="breadcrumbs">
      <div class="breadcrumbs-wrapper">
        <p class="breadcrumbs__link">
          <nuxt-link class="mr-1" to="/">Каталог</nuxt-link> /
        </p>
      </div>
    </div>

    <div class="category-wrapper fill-width pl-2 pr-2">
      <h1 class="mt-8 mb-8 text-center text-uppercase">Каталог</h1>

      <div class="mt-4">
        <div v-if="filteredCategories" class="d-flex flex-column g-8">
          <div
            v-for="{ name, description, image, url } in filteredCategories"
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
                <button
                  class="category__undercategories-button request"
                  @click="$orderModal()"
                >
                  Запрос
                </button>
              </div>
            </div>

            <img width="400" :src="image" :alt="name" />
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
  components: { VProduct },
  computed: {
    ...mapGetters("app", ["categories"]),
    url() {
      return this.$route.params.url || "";
    },
    filteredCategories() {
      return this.categories.filter((c) => !c.parent_id) || [];
    },
  },
  // { store, req, redirect }
  async fetch({ store, params }) {},
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
