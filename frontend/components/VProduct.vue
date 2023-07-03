<template>
  <section class="v-product d-flex">
    <div class="fill-width">
      <img class="v-product__image" :src="productImage" :alt="product.name" />
    </div>

    <div class="v-product__info d-flex flex-column justify-space-between">
      <div class="d-flex flex-column g-1">
        <h2 class="v-product__info-title" v-html="product.name" />
        <p v-if="product.brand" class="v-product__info-field">
          Бренд: {{ product.brand }}
        </p>
        <p v-if="product.manufacturer" class="v-product__info-field">
          Страна производитель: {{ product.manufacturer }}
        </p>

        <template v-if="product.menuOptions">
          <p
            v-for="{ id, name, value } in product.menuOptions.filter(
              (op) => op.is_dropdown
            )"
            :key="id"
          >
            {{ name }}: {{ value.split("-").join(" - ") }}
          </p>
        </template>

        <template v-if="product.menuOptions">
          <p
            v-for="{ id, name, value } in product.menuOptions.filter(
              (op) => !op.is_dropdown
            )"
            :key="id"
          >
            {{ name }}: {{ value }}
          </p>
        </template>
      </div>
      <!-- <p class="v-product__info-field">Цена: {{ product.price }} руб.</p> -->

      <div class="d-flex flex-wrap g-2 mt-4">
        <nuxt-link
          :to="product.category_url + '/' + product.url"
          class="v-product__button v-product__button--price text-uppercase"
        >
          Подробнее
        </nuxt-link>
        <button class="v-product__button text-uppercase" @click="$orderModal()">
          {{ product.price }}
        </button>
      </div>
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
  flex-direction: column;
  & p {
    margin: 0;
  }
  &__image {
    width: 100%;
  }
  &__info {
    margin-left: 10px;
    &-title {
      font-size: 22px !important;
      font-weight: bold !important;
    }
  }
  &__button {
    color: $primaryGrey;
    border: 1px solid $primaryGrey;
    padding: 7px 24px;
    font-weight: bold;
    font-size: 14px;
    &--price {
      background: $primaryGrey;
      color: $white !important;
    }
  }
  @include tablet {
    flex-direction: row;
    &__image {
      max-width: 350px;
    }
    &__info {
      width: 100%;
      padding: 10px;
      margin-left: 0;
      &-title {
        font-size: 24px;
      }
    }
    &__button {
      font-size: 16px;
    }
  }

  @include laptop {
    &__image {
      max-width: 500px;
    }
  }
}
</style>
