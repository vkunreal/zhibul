<template>
  <section class="v-categories d-flex">
    <!-- <div
      class="v-categories__menu"
      @mouseover="categoriesVisible = true"
      @mouseleave="
        categoriesVisible = false;
        categoryDetail = null;
      "
    >
      <div class="d-flex">
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
      </div>

      <transition name="fade">
        <div
          v-if="categoriesVisible"
          class="v-categories__menu-list d-flex g-4 pd-2"
        >
          <ul class="d-flex flex-column g-1">
            <li
              class="d-flex d-md-none justify-space-between align-center g-1"
              v-for="{ id, name, url, is_contains } in categoriesList()"
              :key="id"
              @click="categoryDetail = id"
            >
              <nuxt-link :to="'/' + url">
                {{ name }}
              </nuxt-link>
              <svg class="ml-4" v-if="is_contains" width="12" height="12">
                <use xlink:href="@/static/icons.svg#slider-arrow" />
              </svg>
            </li>

            <li
              class="d-none d-md-flex justify-space-between align-center g-1"
              v-for="{ id, name, url, is_contains } in categoriesList()"
              :key="id"
              @mouseover="categoryDetail = id"
              @click="
                categoriesVisible = false;
                categoryDetail = null;
              "
            >
              <nuxt-link :to="'/' + url">
                {{ name }}
              </nuxt-link>
              <svg class="ml-4" v-if="is_contains" width="12" height="12">
                <use xlink:href="@/static/icons.svg#slider-arrow" />
              </svg>
            </li>

            <li
              class="d-flex justify-space-between align-center g-1"
              v-for="{ title, url, tabs } in tabs"
              :key="url"
              @mouseover="tabNesting = url"
              @mouseleave="tabNesting = null"
            >
              <nuxt-link :to="url">
                {{ title }}
              </nuxt-link>

              <svg class="ml-4" width="12" height="12">
                <use xlink:href="@/static/icons.svg#slider-arrow" />
              </svg>
            </li>
          </ul>

          <transition name="fade">
            <ul
              class="v-categories__menu-list-details d-flex flex-column g-1"
              v-if="categoryDetail && categoriesList(categoryDetail).length"
            >
              <li
                v-for="{ id, name, url } in categoriesList(categoryDetail)"
                :key="id"
                @click="
                  categoriesVisible = false;
                  categoryDetail = null;
                "
              >
                <nuxt-link :to="'/' + url">
                  {{ name }}

                  <svg class="ml-4" v-if="is_contains" width="12" height="12">
                    <use xlink:href="@/static/icons.svg#slider-arrow" />
                  </svg>
                </nuxt-link>
              </li>
            </ul>
          </transition>
        </div>
      </transition>
    </div>

    <ul class="d-none d-md-flex g-2 pl-0">
      <li
        class="v-categories__link pt-4 pb-3 ml-2 mr-2"
        style="position: relative"
        v-for="{ title, url, tabs } in tabs"
        :key="url"
        @mouseover="tabNesting = url"
        @mouseleave="tabNesting = null"
      >
        <nuxt-link class="text-uppercase" :to="url">
          {{ title }}
        </nuxt-link>

        <div
          v-if="tabs && tabNesting === url"
          class="v-categories__link-list mt-2"
        >
          <div
            class="d-flex flex-column g-2"
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
    </ul> -->

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
            class="v-categories__menu-list d-none d-sm-flex g-4 pd-2 mt-13"
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

const tabs = [
  { title: "О компании", url: "/" },
  {
    title: "Покупателю",
    url: "/pokupatelu",
    tabs: [
      { title: "Доставка", url: "/delivery" },
      //      { title: "Гарантия", url: "/garanty" },
      //      { title: "Оплата", url: "/payment" },
      //      { title: "Акции", url: "/actions" },
    ],
  },
  {
    title: "Услуги",
    url: "/uslugi",
    tabs: [
      { title: "Ремонт пневмоинструмента", url: "/remont_pnevmoinstrymenta" },
      { title: "Аренда автоприцепов", url: "/arenda_prizepa" },
    ],
  },
  //  { title: "Новости", url: "/news" },
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
      console.log("CLOSED");
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
