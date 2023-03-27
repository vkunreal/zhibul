<template>
  <section class="v-tabs-list pd-1 pt-0">
    <ul class="d-flex flex-column g-1">
      <li v-for="{ title, url, tabs } in tabs" :key="url">
        <div
          class="v-tabs-list__item d-flex justify-space-between align-center pd-1"
          :class="{ 'v-tabs-list__item--active': url === selectedTab }"
        >
          <div class="d-flex align-center g-1">
            <svg width="12" height="12">
              <use xlink:href="@/static/icons.svg#slider-arrow" />
            </svg>

            <nuxt-link :to="url" @click.native="linkClick">
              {{ title }}
            </nuxt-link>
          </div>

          <p
            v-if="expandedLinks && tabs?.length"
            class="v-tabs-list__more text--white text-uppercase"
            @click="selectTab(url)"
          >
            Развернуть
          </p>
        </div>

        <ul
          v-if="tabs?.length && selectedTab === url"
          class="d-flex flex-column g-1 ml-4 mt-2 mb-2"
        >
          <li
            class="d-flex align-center g-1"
            v-for="{ title, url } in tabs"
            :key="url"
          >
            <svg width="12" height="12">
              <use xlink:href="@/static/icons.svg#slider-arrow" />
            </svg>

            <nuxt-link :to="url" @click.native="linkClick">
              {{ title }}
            </nuxt-link>
          </li>
        </ul>
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
  name: "VTabsList",
  props: {
    expandedLinks: Boolean,
  },
  data: () => ({
    selectedTab: null,
  }),
  computed: {
    tabs() {
      return tabs;
    },
  },
  methods: {
    linkClick() {
      this.$emit("link-click");
    },
    selectTab(url) {
      if (this.selectedTab === url) {
        this.selectedTab = null;
      } else {
        this.selectedTab = url;
      }
    },
  },
};
</script>

<style lang="scss">
.v-tabs-list {
  a {
    color: $white;
    text-decoration: none;
  }
  p {
    margin-bottom: 0;
  }
  svg {
    color: $white;
  }
  ul {
    padding-left: 0;
    li {
      list-style: none;
    }
  }

  &__item {
    &--active {
      background: $colorGrey;
      border-radius: 10px;
    }
  }

  &__more {
    cursor: pointer;
    user-select: none;
  }
}
</style>
