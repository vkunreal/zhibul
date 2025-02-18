<template>
  <section class="category fill-width d-flex flex-column align-center mb-10">
    <div class="breadcrumbs">
      <div class="breadcrumbs-wrapper">
        <p class="breadcrumbs__link">
          <nuxt-link class="mr-1" to="/katalog">Каталог</nuxt-link> /
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

      <div
        v-if="filteredItems?.length"
        class="d-none d-sm-flex justify-end g-1 mt-4 mb-2"
      >
        <button
          @click="isWide = true"
          class="category__wide-btn"
          :class="{ active: isWide === true }"
        >
          <svg width="24" height="24">
            <use xlink:href="@/static/icons.svg#one_block" />
          </svg>
        </button>

        <button
          @click="isWide = false"
          class="category__wide-btn"
          :class="{ active: isWide === false }"
        >
          <svg width="26" height="26">
            <use xlink:href="@/static/icons.svg#many_blocks" />
          </svg>
        </button>
      </div>

      <div class="mt-4">
        <div
          v-if="!filteredItems?.length && undercategories.length"
          class="category__catalog-list"
        >
          <div
            v-for="{ name, description, image, url } in undercategories"
            class="category__catalog-item fill-height d-flex g-2"
          >
            <div
              class="fill-height d-flex flex-column align-center justify-space-between"
            >
              <div>
                <nuxt-link :to="'/menu/' + url">
                  <h2 class="category__undercategories-title text-center">
                    {{ name }}
                  </h2>
                </nuxt-link>
                <p class="mt-10">{{ description }}</p>
              </div>

              <div
                class="fill-width d-flex justify-start mt-6 g-4"
                :class="{ 'justify-center': !description.length }"
              >
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
              <img
                class="category__catalog-item-img"
                :src="image"
                :alt="name"
              />
            </nuxt-link>
          </div>
        </div>
        <div
          v-else-if="filteredItems?.length"
          :class="`category__list mt-2 ${isWide ? 'category__list--wide' : ''}`"
        >
          <template v-for="item in filteredItems">
            <!-- <nuxt-link :to="category?.url + '/' + item.url" :key="item.id"> -->
            <v-product
              class="category__item"
              :product="item"
              :isWide="isWide"
            />
            <!-- </nuxt-link> -->
          </template>
        </div>
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
      title: this.category?.seo_title || this.categoryName,
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
  data: () => ({
    isWide: false,
  }),
  mounted() {
    if (
      !this.categories.length ||
      !this.category?.id ||
      !this.category?.active
    ) {
      this.$router.push("/katalog");
    }
  },
  computed: {
    ...mapGetters("app", ["categories"]),
    ...mapGetters("items", ["items"]),
    url() {
      return this.$route.params.url || "";
    },
    category() {
      return (
        this.categories.filter((c) => c.url === this.url && !!c.active)[0] ||
        null
      );
    },
    undercategories() {
      return (
        this.categories
          ?.filter((c) => c?.parent_id === this?.category?.id && !!c.active)
          ?.sort((a, b) => (a.position < b.position ? -1 : 1)) || []
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
          this.categories.filter((c) => c?.id === tempCategory.parent_id)[0] ||
          null;
      }
      result.push(tempCategory);
      return result.reverse();
    },
    filteredItems() {
      const filterItems = [...this.items];
      return (
        filterItems?.sort((a, b) => (a.position < b.position ? -1 : 1)) || []
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
    max-width: 1250px;
  }

  &__wide-btn {
    svg {
      color: #ccc;
      transition: 0.3s ease;
    }

    &.active svg {
      color: #333 !important;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 10px;

    @include tablet {
      display: grid;
      grid-template-columns: repeat(2, 1fr);

      &--wide {
        display: flex;
        flex-direction: column;
        gap: 30px;
      }
    }

    @include laptop {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__item {
    width: 100%;
  }

  &__undercategories {
    &-title {
      font-size: 28px;
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
    max-width: 440px;
    align-self: start;
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
