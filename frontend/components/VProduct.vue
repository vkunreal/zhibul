<template>
  <section :class="`v-product d-flex ${isWide ? 'v-product--wide' : ''}`">
    <div :class="`${isWide ? '' : 'fill-width'}`">
      <img
        class="v-product__image"
        :src="productImage.src"
        :alt="product.name"
      />
    </div>

    <div
      class="v-product__info d-flex flex-column justify-space-between fill-height"
    >
      <div class="d-flex flex-column g-1">
        <h2 class="v-product__info-title" v-html="product.name" />
        <p v-if="product.brand" class="v-product__info-field">
          <span class="v-product__info-field--category">Бренд:</span>

          <span>
            {{ product.brand }}
          </span>
        </p>
        <p v-if="product.manufacturer" class="v-product__info-field">
          <span class="v-product__info-field--category"
            >Страна производитель:</span
          >

          <span>
            {{ product.manufacturer }}
          </span>
        </p>

        <template v-if="product.menuOptions">
          <p
            v-for="{ id, name, value } in product.menuOptions.filter(
              (op) => op.is_dropdown
            )"
            :key="id"
            class="v-product__info-field"
          >
            <span class="v-product__info-field--category">{{ name }}:</span>

            <span>
              {{ value.split("-").join(" - ") }}
            </span>
          </p>
        </template>

        <template v-if="product.menuOptions">
          <p
            v-for="{ id, name, value } in product.menuOptions
              .filter((op) => !op.is_dropdown)
              .sort((a, b) => (a.position < b.position ? -1 : 1))"
            :key="id"
            class="v-product__info-field"
          >
            <span class="v-product__info-field--category">{{ name }}:</span>

            <span>
              {{ value }}
            </span>
          </p>
        </template>
      </div>

      <div class="d-flex flex-wrap g-2 mt-4">
        <nuxt-link
          :to="product.category_url + '/' + product.url"
          class="v-product__button v-product__button--price text-uppercase"
        >
          Подробнее
        </nuxt-link>
        <button class="v-product__button text-uppercase" @click="$orderModal()">
          {{ product.display_price }}
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
    isWide: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    productImage() {
      return (
        this.product.images.filter((im) => im.is_main)[0] ??
        this.product.images[0]
      );
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
      font-size: 22px;
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
    &__info {
      margin-left: 10px;
      &-title {
        font-size: 18px;
      }
      &-field {
        font-size: 14px;
        &--category {
          color: #888;
        }
      }
    }

    &__image {
      max-width: 350px;
    }

    &--wide {
      flex-direction: row;
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
  }
}
</style>
