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
      class="trailer-rents__wrapper fill-width pt-2 pb-10 d-flex flex-column align-center g-8"
    >
      <!-- rent -->
      <div
        class="trailer-rents__rent d-flex flex-column flex-md-row justify-space-between align-center pd-1"
        v-for="{ id, title, description, url, image_src } in trailersRent"
        :key="id"
      >
        <img class="trailer-rents__rent-image" :src="image_src" alt="pricep" />

        <div class="pd-2">
          <div>
            <h2>{{ title }}</h2>

            <p class="mt-4 mt-sm-8">{{ description }}</p>
          </div>

          <!-- actions -->
          <div class="d-flex flex-wrap g-2 mt-10">
            <nuxt-link
              class="trailer-rents__rent-button trailer-rents__rent-button--more text-uppercase"
              :to="'/arenda_prizepa/' + url"
            >
              Подробнее
            </nuxt-link>
            <a
              class="uslugi__block-button text-uppercase"
              :href="`tel:${phone_services}`"
            >
              Позвонить
            </a>
          </div>
          <!-- actions -->
        </div>
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
    ...mapGetters("app", ["appVariables", "page"]),
    ...mapGetters("trailers", ["trailersRent"]),
    variable() {
      return (variableName) =>
        this.appVariables?.find(({ name }) => name === variableName)?.value ||
        "";
    },
    phone_services() {
      return this.variable("phone_services");
    },
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
  &__wrapper {
    max-width: 1024px;
  }

  &__rent {
    width: 100%;
    max-width: 600px;
    transition: 0.3s;

    &-image {
      max-width: 400px;
      width: 100%;
    }

    &-button,
    &-button a {
      color: $primaryGrey;
      border: 1px solid $primaryGrey;
      padding: 7px 20px;
      font-weight: bold;
      font-size: 14px;
      text-decoration: none;
      color: $primaryGrey !important;

      &--more {
        background: $primaryGrey;
        color: $white !important;
      }
    }
  }

  @include laptop {
    &__rent {
      max-width: unset;
    }
  }
}
</style>
