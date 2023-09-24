<template>
  <section class="product fill-width d-flex flex-column align-center mb-10">
    <div class="breadcrumbs">
      <div
        class="breadcrumbs-wrapper d-flex align-center flex-wrap justify-space-between"
      >
        <div class="d-flex flex-column g-1">
          <div class="d-flex g-1">
            <nobr class="breadcrumbs__link">
              <nuxt-link class="mr-1" to="/katalog">Каталог</nuxt-link> /
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
        <div class="breadcrumbs__link d-flex fill-width justify-space-between">
          <span class="mr-1">{{ productNameBread }}</span>

          <p v-if="itemDetails">{{ itemDetails?.code }}</p>
        </div>
      </div>
    </div>

    <div class="product-wrapper fill-width pd-2">
      <template v-if="itemDetails">
        <!-- title -->
        <h1
          class="text-center text-uppercase mt-8 ml-2 ml-md-0 mr-2 mr-md-0 mb-8"
          v-html="productName"
        />
        <!-- title -->

        <div class="fill-width d-flex flex-column flex-md-row mb-8">
          <!-- main image -->
          <div
            v-if="images?.length"
            class="product__images d-flex flex-column align-center mr-10"
          >
            <img
              class="product__preview mb-10"
              :src="image ? image : productImage.src"
              :alt="itemDetails.name"
            />
            <div
              class="product__images-footer d-flex g-1"
              v-if="images.length > 1"
              @mouseover="($event) => $event.target.focus()"
            >
              <img
                width="150"
                height="150"
                style="cursor: pointer"
                v-for="im in images"
                :src="im.src"
                :key="im.src"
                :alt="itemDetails.name"
                @click="image = im.src"
              />
            </div>
          </div>
          <!-- main image -->

          <!-- details -->
          <div
            class="product__details d-flex flex-column mt-2 mt-md-0 g-2 pd-md-1"
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
              :items="value?.split('-')"
              :value="value?.split('-')[0]"
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
              <nobr>Страна производитель</nobr>
              <div class="product__dotted-spacer fill-width" />
              <nobr>{{ itemDetails.manufacturer }}</nobr>
            </div>
            <!-- manufacrurer -->

            <!-- options -->
            <div
              class="d-flex justify-space-between"
              v-for="{ id, name, value } in itemOptions
                .filter((op) => !op?.is_dropdown && op?.show_item)
                .sort((a, b) => (a.position < b.position ? -1 : 1))"
              :key="id"
            >
              <nobr>{{ name }}</nobr>
              <div class="product__dotted-spacer fill-width" />
              <nobr>{{ value }}</nobr>
            </div>
            <!-- options -->

            <!-- price -->
            <div class="product__price d-flex justify-center pd-1 mt-2">
              <p>Стоимость: {{ itemDetails.price }}</p>
            </div>
            <!-- price -->
          </div>
          <!-- details -->
        </div>
      </template>

      <!-- files -->
      <div v-if="!!itemDetails.files.length">
        <h2>Прикрепленные файлы:</h2>

        <div class="d-flex flex-wrap g-2 mt-4 mb-4">
          <a
            v-for="(file, ind) in itemDetails.files"
            :href="file.src"
            :key="ind"
            target="_blank"
            class="product__file d-flex align-center g-2"
          >
            <v-file-icon :icon="file.icon" />
            <p>{{ file.title }}</p>
          </a>
        </div>
      </div>
      <!-- files -->

      <!-- description -->
      <div v-if="itemDetails?.description">
        <h2>Описание товара:</h2>

        <div class="mt-4" v-html="itemDetails?.description" />
      </div>
      <!-- description -->
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import VFileIcon from "~/components/VFileIcon.vue";

export default {
  head() {
    const {
      productName,
      itemDetails: { description, seo_title, seo_description, seo_keywords },
    } = this;
    return {
      title: seo_title || productName || "",
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
  components: { VFileIcon },
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
      return this.itemDetails?.images;
    },
    productImage() {
      return this.images.filter((im) => im.is_main)[0] ?? this.images[0];
    },
    productName() {
      return this.itemDetails?.name;
    },
    productNameBread() {
      return this.productName?.split("<br/>").join(" ");
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
  .v-input {
    * {
      font-size: 18px;
    }
  }

  & p,
  h1 {
    margin: 0;
  }
  .v-input {
    flex: none !important;
  }
  &-wrapper {
    max-width: 1200px;
  }
  &__details {
    width: 100%;
    font-size: 18px;
    * {
      font-family: $serif;
    }
    h2 {
      font-size: 24px;
    }
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
    font-size: 22px;
  }
  &__preview {
    max-width: 450px;
    width: 100%;
  }
  &__images {
    width: 100%;
    & img {
      user-select: none;
      // width: 100%;
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
  &__file {
    min-width: 200px;
    padding: 10px;
    text-decoration: none;
    transition: 0.4s;
    & p {
      color: $primaryGrey;
    }
    & svg {
      fill: $primaryGrey;
    }
    &:hover {
      & p {
        color: orange;
      }
      & svg {
        // fill: $white;
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
