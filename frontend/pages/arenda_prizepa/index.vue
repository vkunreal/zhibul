<template>
  <section>
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

    <div class="trailers__wrapper d-flex justify-center">
      <div class="trailers__content">
        <div class="mt-10" v-for="{ id, title, text } in trailers" :key="id">
          <h2>{{ title }}</h2>

          <div class="home__devider mt-4 mb-8" />

          <p>{{ text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  async mounted() {
    await this.fetchTrailers();
  },
  computed: {
    ...mapGetters("trailers", ["trailers"]),
  },
  methods: {
    ...mapActions("trailers", ["fetchTrailers"]),
  },
};
</script>

<style lang="scss">
.trailers {
  &__wrapper {
    width: 100%;
  }
  &__content {
    max-width: 1024px;
    h2 {
      font-size: 34px;
      text-transform: uppercase;
    }
  }
}
</style>
