<template>
  <section class="trailer-rents d-flex flex-column align-center">
    <div class="breadcrumbs">
      <div class="breadcrumbs-wrapper">
        <p class="breadcrumbs__link">
          <nuxt-link class="mr-1" to="/">Главная</nuxt-link> /
        </p>
        <p class="breadcrumbs__link">
          <nuxt-link class="mr-1" to="">Аренда автоприцепов</nuxt-link>
        </p>
      </div>
    </div>

    <div
      class="trailer-rents__wrapper fill-width pt-2 pb-10 d-flex flex-column g-8"
    >
      <!-- rent -->
      <div
        class="trailer-rents__rent d-flex flex-column justify-space-between align-center pd-2"
        v-for="{ id, title, url, image_src } in trailersRent"
        :style="`background-image: url('${image_src}')`"
        :key="id"
      >
        <h2>{{ title }}</h2>

        <!-- actions -->
        <div class="d-flex flex-wrap justify-center g-4">
          <!-- more -->
          <nuxt-link :to="'/arenda_prizepa/' + url">
            Подробнее
            <svg class="ml-4" width="12" height="12">
              <use xlink:href="@/static/icons.svg#slider-arrow" />
            </svg>
          </nuxt-link>
          <!-- more -->

          <!-- call -->
          <button class="trailer-rents__rent-button call-btn">
            Заказать звонок
          </button>
          <!-- call -->
        </div>
        <!-- actions -->
      </div>
      <!-- rent -->
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  head() {
    return {
      title: this.page?.seo_title || "Аренда автоприцепов",
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
  computed: {
    ...mapGetters("app", ["page"]),
    ...mapGetters("trailers", ["trailersRent"]),
  },
  async fetch({ store }) {
    const appVariables = store.getters.appVariables;
    const categories = store.getters.categories;
    if (!appVariables || !appVariables.length) {
      await store.dispatch("app/fetchVariables");
    }
    if (!categories || !categories.length) {
      await store.dispatch("app/fetchCategories");
    }
    await store.dispatch("trailers/fetchTrailersRent");
    await store.dispatch("app/fetchPage", "arenda_prizepa");
  },
};
</script>

<style lang="scss">
@import "@/assets/mixins.scss";

.trailer-rents {
  h2 {
    text-align: center;
  }

  &__wrapper {
    max-width: 1024px;
  }

  &__rent {
    width: 100%;
    height: 640px;
    background-position: center;
    background-size: 100%;
    transition: 0.3s;
    &-button,
    a {
      width: 180px;
      padding: 12px;
      background: $primaryGrey;
      color: $white;
      font-weight: 500;
      text-transform: uppercase;
      text-align: center;
      text-decoration: none;

      &.call-btn {
        background: $colorThird;
        color: $primaryGrey;
      }
    }
  }

  @include slider {
    h2 {
      font-size: 32px;
    }
    &__rent {
      background-size: 65%;
      &:hover {
        background-size: 70%;
      }
    }
  }
}
</style>
