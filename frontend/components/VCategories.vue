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
          to="/katalog"
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

    <ul class="v-categories__tabs d-none d-md-flex g-6 align-center">
      <li
        class="v-categories__link pt-4 pb-3 ml-2 mr-2"
        style="position: relative"
        v-for="{ title, url, tabs } in tabs"
        :key="url"
        @mouseover="tabNesting = url"
        @mouseleave="tabNesting = null"
      >
        <nuxt-link v-if="url" class="text-uppercase" :to="url">
          {{ title }}
        </nuxt-link>
        <span v-else class="text-uppercase cursor-default">
          {{ title }}
        </span>
        <div
          v-if="tabs && tabNesting === url"
          class="v-categories__link-list d-flex flex-column mt-2"
        >
          <div
            class="v-categories__link-list-link d-flex flex-column g-2"
            v-for="{ title, url } in tabs"
            :key="url"
          >
            <nuxt-link
              class="d-flex justify-space-between align-center"
              :to="url"
            >
              {{ title }}
              <svg class="ml-4" width="12" height="12">
                <use xlink:href="@/static/icons.svg#slider-arrow" />
              </svg>
            </nuxt-link>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import VCategoriesList from "./VCategoriesList.vue";
import EventBus from "@/plugins/EventBus.js";

const tabs = [
  { title: "О компании", url: "/" },
  {
    title: "Доставка",
    url: "/dostavka",
  },
  {
    title: "Услуги",
    url: "/uslugi",
    tabs: [
      { title: "Ремонт пневмоинструмента", url: "/rembaza" },
      { title: "Аренда автоприцепов", url: "/arenda_prizepa" },
    ],
  },
  { title: "Новости", url: "/news" },
  { title: "Контакты", url: "/contacts" },
];

export default {
  name: "VCategories",
  components: { VCategoriesList },
  data: () => ({
    categoriesVisible: false,
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
      font-weight: 500;
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

  &__link {
    &-list {
      position: absolute;
      top: 40px;
      background: $colorGrey;
      a {
        width: max-content;
        color: $white !important;
        padding: 14px;
      }
      &-link {
        width: 100%;
        color: $white !important;
      }
    }
  }

  &__tabs {
    width: 100%;
    li {
      list-style: none;
    }
    a {
      color: $primaryGrey;
      font-weight: 500;
      &.nuxt-link-exact-active {
        color: $colorFourth;
      }
    }
    &-link {
      position: relative;
      &-list {
        position: absolute;
        top: 30px;
        background: $primaryGrey;
        color: $white;
        padding-left: 0;
        padding: 1rem;
      }
    }
  }

  @include laptop {
    &__menu {
      position: relative;
      &-catalog {
        &-treug {
          margin-left: -1px;
        }
      }
    }
  }
}
</style>
