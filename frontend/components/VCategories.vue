<template>
  <section class="v-categories d-flex">
    <div class="v-categories__menu">
      <!-- desktop catalog -->
      <div
        class="d-none d-md-flex"
        @mouseover="categoriesVisible = true"
        @mouseleave="
          categoriesVisible = false;
          categoryDetail = null;
        "
      >
        <nuxt-link
          to="/catalog"
          class="v-categories__menu-catalog d-flex align-center text--white pointer g-1 pt-3 pb-3 pl-2 pr-2"
        >
          <svg class="text--white" width="30" height="30">
            <use xlink:href="@/static/icons.svg#menu" />
          </svg>

          <p class="text-uppercase">Каталог</p>
        </nuxt-link>

        <svg class="v-categories__menu-catalog-treug">
          <use xlink:href="@/static/icons.svg#treug" />
        </svg>

        <!-- menu list -->
        <transition name="fade">
          <div
            v-if="categoriesVisible"
            class="v-categories__menu-list d-none d-sm-flex g-4 pd-1 mt-13"
          >
            <v-categories-list />
          </div>
        </transition>
        <!-- menu list -->
      </div>
      <!-- desktop catalog -->

      <!-- mobile catalog -->
      <div class="d-flex d-md-none" @click="catalogClick">
        <div
          class="v-categories__menu-catalog d-flex align-center text--white pointer g-1 pt-3 pb-3 pl-2 pr-2"
        >
          <svg class="text--white" width="30" height="30">
            <use xlink:href="@/static/icons.svg#menu" />
          </svg>

          <p class="text-uppercase">Каталог</p>
        </div>

        <svg class="v-categories__menu-catalog-treug">
          <use xlink:href="@/static/icons.svg#treug" />
        </svg>
      </div>
      <!-- mobile catalog -->
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import VCategoriesList from "./VCategoriesList.vue";
import EventBus from "@/plugins/EventBus.js";

export default {
  name: "VCategories",
  components: { VCategoriesList },
  data: () => ({
    categoriesVisible: true,
    categoryDetail: null,
    tabNesting: null,
  }),
  mounted() {
    EventBus.$on("categories-modal-close", this.modalClosed);
  },
  destroyed() {
    EventBus.$off("categories-modal-close");
  },
  computed: {
    ...mapGetters("app", ["categories"]),
    tabs() {
      return tabs;
    },
  },
  methods: {
    catalogClick() {
      if (this.categoriesVisible) {
        this.categoriesVisible = false;
        this.categoryDetail = null;
      } else {
        this.categoriesVisible = true;
        this.$categoriesModal();
      }
    },
    modalClosed() {
      this.categoriesVisible = false;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/mixins.scss";

.v-categories {
  & a {
    text-decoration: none;
  }
  & p {
    margin-bottom: 0 !important;
  }
  &__menu {
    z-index: 99;
    &-catalog {
      background: $primaryGrey;
      color: $white;
      &-treug {
        width: 54px;
        height: 54px;
        color: $primaryGrey;
      }
    }
    &-list {
      width: max-content;
      position: absolute;
      background: $primaryGrey;
      color: $white;
      & ul {
        padding-left: 0 !important;
      }
      & li {
        list-style: none;
      }
      & a {
        color: $white;
      }
    }
  }

  @include laptop {
    &__menu {
      position: relative;
    }
  }
}
</style>
