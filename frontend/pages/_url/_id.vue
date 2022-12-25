<template>
  <section class="product fill-width d-flex justify-center mb-10">
    <div class="product-wrapper fill-width d-flex">
      <template v-if="itemDetails">
        <img width="450" :src="images[0]" :alt="itemDetails.name" />

        <div class="d-flex flex-column g-2 pd-1">
          <h1>{{ itemDetails.name }}</h1>
          <p>{{ itemDetails.brand }}</p>
          <p>{{ itemDetails.manufacturer }}</p>
          <p>{{ itemDetails.price }} руб.</p>
        </div>
      </template>

      <template v-else>
        <h3>Нет данных о товаре</h3>
      </template>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("items", ["itemDetails"]),
    images() {
      return this.itemDetails?.images.split(",") || [];
    },
  },
  async fetch({ store, params }) {
    if (params?.id) {
      await store.dispatch("items/fetchItemDetails", { id: params?.id });
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/mixins.scss";

.product {
  & p,
  h1 {
    margin: 0;
  }
  &-wrapper {
    max-width: 1024px;
  }
}
</style>
