<template>
  <section class="v-product d-flex" :title="product.name">
    <img
      class="v-product__image fill-width"
      :src="productImage"
      :alt="product.name"
    />

    <div class="v-product__info d-flex flex-column g-2">
      <h3 class="v-product__info-title">{{ product.name }}</h3>
      <p class="v-product__info-field">Бренд: {{ product.brand }}</p>
      <p class="v-product__info-field">
        Страна производитель: {{ product.manufacturer }}
      </p>
      <p class="v-product__info-field">Цена: {{ product.price }} руб.</p>
    </div>
  </section>
</template>

<script>
export default {
  name: "VProduct",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    productImage() {
      return this.product.images.split(",")[0] || "";
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/mixins.scss";

.v-product {
  display: flex;
  cursor: pointer;
  flex-direction: column;
  & p {
    margin: 0;
  }
  &__image {
    width: 100%;
  }
  &__info {
    margin-left: 10px;
  }
  @include tablet {
    flex-direction: row;
    &__image {
      width: 500px;
    }
    &__info {
      width: 100%;
      padding: 10px;
      margin-left: 0;
    }
  }
}
</style>
