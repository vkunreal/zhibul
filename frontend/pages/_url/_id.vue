<template>
  <section class="product fill-width d-flex flex-column align-center mb-10">
    <div class="breadcrumbs">
      <div class="breadcrumbs-wrapper">
        <p class="breadcrumbs__link">
          <nuxt-link class="mr-1" to="/">Каталог</nuxt-link> /
        </p>
        <p class="breadcrumbs__link">
          <nuxt-link class="mr-1" :to="`/${itemDetails.category_url}`">{{
            itemDetails.category_name
          }}</nuxt-link>
          /
        </p>
        <p class="breadcrumbs__link">
          <a class="mr-1" href="">{{ itemDetails.name }}</a>
        </p>
      </div>
    </div>

    <div class="product-wrapper fill-width">
      <template v-if="itemDetails">
        <!-- title -->
        <h1 class="mt-4">
          {{ itemDetails.category_name }}: {{ itemDetails.name }}
        </h1>
        <!-- title -->

        <div class="fill-width d-flex">
          <!-- main image -->
          <div class="product__images">
            <img
              width="450"
              :src="image ? image : images[0]"
              :alt="itemDetails.name"
            />
            <div
              class="product__images-footer d-flex g-1"
              @mouseover="($event) => $event.target.focus()"
            >
              <img
                height="150"
                style="cursor: pointer"
                v-for="src in images"
                :src="src"
                :key="src"
                :alt="itemDetails.name"
                @click="image = src"
              />
            </div>
          </div>
          <!-- main image -->

          <!-- details -->
          <div class="d-flex flex-column fill-width g-2 pd-1">
            <h2>Характеристики товара:</h2>

            <!-- brand -->
            <div class="d-flex justify-space-between">
              <p>Бренд</p>
              <div class="product__dotted-spacer fill-width" />
              <p>{{ itemDetails.brand }}</p>
            </div>
            <!-- brand -->

            <!-- manufacrurer -->
            <div class="d-flex justify-space-between">
              <p>Производитель</p>
              <div class="product__dotted-spacer fill-width" />
              <p>{{ itemDetails.manufacturer }}</p>
            </div>
            <!-- manufacrurer -->

            <!-- options -->
            <div
              class="d-flex justify-space-between"
              v-for="{ id, name, value } in itemOptions"
              :key="id"
            >
              <nobr>{{ name }}</nobr>
              <div class="product__dotted-spacer fill-width" />
              <nobr>{{ value }}</nobr>
            </div>
            <!-- options -->

            <!-- price -->
            <div class="product__price d-flex justify-center pd-1">
              <p>Стоимость: {{ itemDetails.price }} руб / шт</p>
            </div>
            <!-- price -->

            <!-- description -->
            <template v-if="itemDetails?.description">
              <h2>Описание товара:</h2>

              <div v-html="itemDetails?.description" />
            </template>
            <!-- description -->
          </div>
          <!-- details -->
        </div>
      </template>

      <!-- product not found -->
      <template v-else>
        <h3>Нет данных о товаре</h3>
      </template>
      <!-- product not found -->
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    image: null,
  }),
  mounted() {
    function scrollHorizontally(e) {
      e = window.event || e;
      var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
      document.getElementsByClassName("product__images-footer")[0].scrollLeft -=
        delta * 30; // Multiplied by 10
      e.preventDefault();
    }
    if (
      document.getElementsByClassName("product__images-footer")[0]
        .addEventListener
    ) {
      // IE9, Chrome, Safari, Opera
      document
        .getElementsByClassName("product__images-footer")[0]
        .addEventListener("mousewheel", scrollHorizontally, false);
      // Firefox
      document
        .getElementsByClassName("product__images-footer")[0]
        .addEventListener("DOMMouseScroll", scrollHorizontally, false);
    } else {
      // IE 6/7/8
      document
        .getElementsByClassName("product__images-footer")[0]
        .attachEvent("onmousewheel", scrollHorizontally);
    }
  },
  computed: {
    ...mapGetters("items", ["itemDetails", "itemOptions"]),
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
  &__dotted-spacer {
    border-bottom: 2px dotted #333;
    margin-bottom: 6px;
    margin-left: 4px;
    margin-right: 4px;
  }
  &__price {
    background: $primaryGrey;
    color: $white;
    font-size: 20px;
  }
  &__images {
    width: 450px;
    & img {
      user-select: none;
    }
    &-footer {
      width: 450px;
      overflow-x: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>
