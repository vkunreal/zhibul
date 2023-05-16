<template>
  <section class="product fill-width d-flex flex-column align-center mb-10">
    <div class="breadcrumbs">
      <div class="breadcrumbs-wrapper flex-column justify-space-between">
        <div class="d-flex flex-column g-1">
          <div class="d-flex g-1">
            <nobr class="breadcrumbs__link">
              <nuxt-link class="mr-1" to="/catalog">Каталог</nuxt-link> /
            </nobr>
            <nobr
              class="breadcrumbs__link"
              v-for="category in breadCategories"
              :key="category?.id"
            >
              <nuxt-link class="mr-1" :to="`/menu/${category?.url}`">{{
                category?.name
              }}</nuxt-link>
              /
            </nobr>
          </div>
        </div>
        <div class="breadcrumbs__link fill-width d-flex justify-space-between">
          <span class="mr-1">{{ productName }}</span>

          <p v-if="itemDetails">{{ itemDetails?.code }}</p>
        </div>
      </div>
    </div>

    <div class="product-wrapper fill-width pd-2">
      <template v-if="itemDetails">
        <!-- title -->
        <h1
          class="text-center text-uppercase mt-8 ml-2 ml-md-0 mr-2 mr-md-0 mb-8"
        >
          {{ productName }}
        </h1>
        <!-- title -->

        <div
          class="fill-width d-flex flex-column flex-md-row pd-2 mb-8 pd-md-0"
        >
          <!-- main image -->
          <div
            v-if="images?.length"
            class="product__images d-flex flex-column align-center mr-10"
          >
            <img :src="image ? image : images[0]" :alt="itemDetails.name" />
            <div
              class="product__images-footer d-flex g-1"
              v-if="images.length > 1"
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
          <div
            class="product__details d-flex flex-column mt-2 mt-md-0 g-2 pd-1"
          >
            <h2>Характеристики товара:</h2>

            <!-- dropdown -->
            <v-select
              class="mb-n2"
              v-for="{ id, name, value } in itemOptions.filter(
                (op) => op.is_dropdown
              )"
              :key="id"
              :label="name"
              :items="value.split('-')"
              :value="value.split('-')[0]"
              variant="default"
            />
            <!-- dropdown -->

            <!-- brand -->
            <div class="d-flex justify-space-between">
              <nobr>Бренд</nobr>
              <div class="product__dotted-spacer fill-width" />
              <nobr>{{ itemDetails.brand }}</nobr>
            </div>
            <!-- brand -->

            <!-- manufacrurer -->
            <div class="d-flex justify-space-between">
              <nobr>Производитель</nobr>
              <div class="product__dotted-spacer fill-width" />
              <nobr>{{ itemDetails.manufacturer }}</nobr>
            </div>
            <!-- manufacrurer -->

            <!-- options -->
            <div
              class="d-flex justify-space-between"
              v-for="{ id, name, value } in itemOptions.filter(
                (op) => !op.is_dropdown
              )"
              :key="id"
            >
              <nobr>{{ name }}</nobr>
              <div class="product__dotted-spacer fill-width" />
              <nobr>{{ value }}</nobr>
            </div>
            <!-- options -->

            <!-- price -->
            <div class="product__price d-flex justify-center pd-1 mt-2">
              <p>Стоимость: {{ itemDetails.price }} руб / шт</p>
            </div>
            <!-- price -->
          </div>
          <!-- details -->
        </div>
      </template>

      <!-- description -->
      <div class="pl-6 pl-md-0 pr-6 pr-md-0" v-if="itemDetails?.description">
        <h2>Описание товара:</h2>

        <div class="mt-1" v-html="itemDetails?.description" />
      </div>
      <!-- description -->
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  head() {
    const {
      itemDetails: {
        name,
        description,
        seo_title,
        seo_description,
        seo_keywords,
      },
    } = this;
    return {
      title: seo_title || name || "",
      meta: [
        {
          hid: "description",
          name: "description",
          content: seo_description || description || "",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: seo_keywords || "",
        },
      ],
    };
  },
  data: () => ({
    image: null,
  }),
  mounted() {
    if (this.images.length > 1) {
      function scrollHorizontally(e) {
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
        document.getElementsByClassName(
          "product__images-footer"
        )[0].scrollLeft -= delta * 30; // Multiplied by 10
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
    }
  },
  computed: {
    ...mapGetters("app", ["categories"]),
    ...mapGetters("items", ["itemDetails", "itemOptions"]),
    images() {
      return this.itemDetails?.images?.split(",") || [];
    },
    productName () {
      return this.itemDetails?.name.split('<br/>').join('')
    },
    breadCategories() {
      let tempCategory = this.categories.filter(
        (c) => c.url === this.itemDetails.category_url
      )[0];

      const result = [];
      while (tempCategory?.parent_id) {
        result.push(tempCategory);
        tempCategory =
          this.categories.filter((c) => c.id === tempCategory.parent_id)[0] ||
          null;
      }

      result.push(tempCategory);
      return result.reverse() || [];
    },
  },
  async fetch({ store, params }) {
    const appVariables = store.getters.appVariables;
    const categories = store.getters.categories;
    if (!appVariables || !appVariables.length) {
      await store.dispatch("app/fetchVariables");
    }
    if (!categories || !categories.length) {
      await store.dispatch("app/fetchCategories");
    }
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
    max-width: 1200px;
  }
  &__details {
    width: 100%;
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
    width: 100%;
    & img {
      user-select: none;
      width: 100%;
      max-width: 450px;
    }
    &-footer {
      width: 100%;
      overflow-x: auto;
      &::-webkit-scrollbar {
        height: 8px;
        background-color: $light-grey;
        border-radius: 9em;
      }
      &::-webkit-scrollbar-thumb {
        background-color: $primaryGrey;
        border-radius: 9em;
      }
    }
  }

  @include laptop {
    &__images {
      width: 450px;
      &-footer {
        width: 450px;
      }
    }
    &__details {
      width: 55%;
    }
  }
}
</style>
