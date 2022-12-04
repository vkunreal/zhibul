<template>
  <section class="v-categories d-flex">
    <div>
      <p>Menu</p>
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
        <nuxt-link :to="url">
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
    tabNesting: null,
  }),
  computed: {
    tabs() {
      return tabs;
    },
  },
  methods: {
    tabMouseOver(url) {
      console.log(url);
    },
  },
};
</script>

<style lang="scss">
.v-categories {
  &__link {
    list-style: none;
    & a {
      text-decoration: none;
      color: $black;
    }
    &-list {
      background: $white;
      & a {
        min-width: 120px;
        padding: 0.5rem;
        &:hover {
          background: $colorPrimary;
        }
      }
    }
  }
}
</style>
