<template>
  <section class="category fill-width d-flex flex-column align-center mb-10">
    <div class="breadcrumbs">
      <div class="breadcrumbs-wrapper">
        <p class="breadcrumbs__link">
          <nuxt-link class="mr-1" to="/catalog">Каталог</nuxt-link> /
        </p>
        <p
          class="breadcrumbs__link"
          v-for="category in breadCategories.slice(0, -1)"
          :key="category?.id"
        >
          <nuxt-link class="mr-1" :to="`/menu/${category?.url}`">{{
            category?.name
          }}</nuxt-link>
          /
        </p>
        <p class="breadcrumbs__link">
          <span class="mr-1">{{ category?.name }}</span>
        </p>
      </div>
    </div>

    <div class="category-wrapper fill-width pl-2 pr-2">
      <!-- <h1 class="mt-8 mb-8 text-center text-uppercase">{{ categoryName }}</h1> -->

      <div class="mt-4">
        <div
          v-if="
            !category?.parent_id && !items?.length && undercategories.length
          "
          class="category__catalog-list"
        >
          <div
            v-for="{ name, description, image, url } in undercategories"
            class="category__catalog-item d-flex g-2"
            :title="name"
          >
            <div class="d-flex flex-column align-center justify-space-between">
              <div>
                <h2 class="category__undercategories-title">{{ name }}</h2>
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

            <img class="category__catalog-item-img" :src="image" :alt="name" />
          </div>
        </div>
        <div
          v-else-if="items?.length"
          class="category__list d-flex flex-column"
        >
          <template v-for="item in items">
            <!-- <nuxt-link :to="category?.url + '/' + item.url" :key="item.id"> -->
            <v-product class="category__item" :product="item" />
            <!-- </nuxt-link> -->
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
  head() {
    return {
      title: this.category?.seo_title || this.category?.name || "",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.category?.seo_description || "",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.category?.seo_keywords || "",
        },
      ],
    };
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
    undercategories() {
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
  h1 {
    font-size: 25px;
  }
  & a {
    color: $black;
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

  &__undercategories {
    &-title {
      font-size: 32px;
      font-weight: 400;
    }
    &-button {
      padding: 8px 24px;
      font-size: 18px;
      font-weight: 700;
      &.catalog {
        background: $primaryGrey;
        color: $white;
      }
      &.request {
        border: 1px solid $primaryGrey;
      }
    }
  }

  &__catalog-list {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 50px;
  }

  &__catalog-item {
    flex-direction: column-reverse;
    max-width: 400px;
    align-self: center;
    justify-self: center;
    &-img {
      width: 100%;
      max-width: 400px !important;
      margin: 0 auto;
    }
  }

  @include tablet {
    &__catalog-list {
      grid-template-columns: 1fr 1fr;
      column-gap: 20px;
    }
  }
}
</style>
