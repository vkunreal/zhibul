<template>
  <section class="trailer-rents d-flex flex-column align-center">
    <div class="breadcrumbs">
      <div class="breadcrumbs-wrapper">
        <p class="breadcrumbs__link">
          <nuxt-link class="mr-1" to="/">Главная</nuxt-link> /
        </p>
        <p class="breadcrumbs__link">
          <nuxt-link class="mr-1" to="">Аренда прицепа</nuxt-link>
        </p>
      </div>
    </div>
    <div
      class="trailer-rents__wrapper fill-width d-flex flex-column g-4 mt-4 mb-4 pd-2 pd-md-4"
    >
      <div
        class="trailer-rents__rent fill-width d-flex flex-column justify-center align-center g-5 pd-2"
        v-for="{ id, title, url } in trailersRent"
        :key="id"
      >
        <h2>{{ title }}</h2>

        <div class="d-flex flex-column flex-sm-row g-2">
          <nuxt-link
            class="trailer-rents__rent-button"
            :to="'/arenda_prizepa/' + url"
          >
            Подробнее
            <svg class="ml-4" width="12" height="12">
              <use xlink:href="@/static/icons.svg#slider-arrow" />
            </svg>
          </nuxt-link>
          <button class="trailer-rents__rent-button call-btn">
            Заказать звонок
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("trailers", ["trailersRent"]),
  },
  async fetch({ store }) {
    await store.dispatch("trailers/fetchTrailersRent");
  },
};
</script>

<style lang="scss">
.trailer-rents {
  &__wrapper {
    max-width: 1024px;
  }

  &__rent {
    width: 100%;
    height: 400px;
    background: $colorGrey;
    color: $white;
    h2 {
      text-align: center;
    }
    &-button,
    a {
      min-width: 160px;
      padding: 12px;
      background: $primaryGrey;
      font-weight: 500;
      text-transform: uppercase;
      text-align: center;
      &.call-btn {
        background: $colorThird;
        color: $primaryGrey;
      }
    }
    a {
      text-decoration: none;
      color: $white;
    }
  }
}
</style>
