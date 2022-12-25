<template>
  <section class="v-categories d-flex">
    <div
      class="v-categories__menu"
      @mouseover="categoriesVisible = true"
      @mouseleave="
        categoriesVisible = false;
        categoryDetail = null;
      "
    >
      <p class="text-uppercase">Каталог товаров</p>

      <transition name="fade">
        <div
          v-if="categoriesVisible"
          class="v-categories__menu-list d-flex g-4 pd-2"
        >
          <ul class="d-flex flex-column g-1">
            <li
              class="d-flex justify-space-between align-center g-1"
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
                  {{ name }} {{ "/" + url }}
                </nuxt-link>
              </li>
            </ul>
          </transition>
        </div>
      </transition>
    </div>

    <ul class="d-flex g-2">
      <li
        class="v-categories__link ml-2 mr-2"
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
          class="v-categories__link-list pt-2"
          style="position: absolute; z-index: 100000"
        >
          <div
            class="d-flex flex-column mt-2"
            v-for="{ title, url } in tabs"
            :key="url"
          >
            <nuxt-link :to="url">{{ title }}</nuxt-link>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

const tabs = [
  { title: "О компании", url: "/" },
  {
    title: "Покупателю",
    url: "/pokupatelu",
    tabs: [
      { title: "Доставка", url: "/delivery" },
      { title: "Гарантия", url: "/garanty" },
      { title: "Оплата", url: "/payment" },
      { title: "Акции", url: "/actions" },
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
  { title: "Новости", url: "/news" },
  { title: "Контакты", url: "/contacts" },
];

export default {
  name: "VCategories",
  data: () => ({
    categoriesVisible: false,
    categoryDetail: null,
    tabNesting: null,
  }),
  mounted() {},
  computed: {
    ...mapGetters("app", ["categories"]),
    tabs() {
      return tabs;
    },
    categoriesList() {
      return (parentId = null) =>
        this.categories.filter((c) => c.parent_id === parentId);
    },
  },
};
</script>

<style lang="scss">
.v-categories {
  & a {
    text-decoration: none;
  }
  &__menu {
    position: relative;
    z-index: 1000;
    &-list {
      width: max-content;
      position: absolute;
      background: $colorGrey;
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
    list-style: none;
    & a {
      color: $black;
    }
    &-list {
      background: $colorGrey;
      width: max-content;
      & a {
        min-width: 120px;
        padding: 0.5rem;
        color: $white !important;
        &:hover {
          background: $colorPrimary;
        }
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
