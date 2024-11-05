<template>
  <section class="v-tabs-list d-flex flex-column g-2 mt-2 d-md-none">
    <hr />
    <div
      v-for="tab in tabs"
      :key="tab.url"
      class="d-flex align-center flex-column"
    >
      <nuxt-link :to="tab.url" class="v-tabs-list__link">{{
        tab.title
      }}</nuxt-link>

      <div v-if="tab?.tabs?.length" class="pd-1">
        <div
          v-for="tab in tab.tabs"
          :key="tab.url"
          class="pd-1 d-flex justify-center"
        >
          <nuxt-link :to="tab.url" class="v-tabs-list__link--under">{{
            tab.title
          }}</nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
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
  name: "VTabsList",
  computed: {
    tabs() {
      return tabs;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/mixins.scss";

.v-tabs-list {
  padding-top: 40px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;

  hr {
    border: 0;
    border-top: 1px solid #999;
  }

  a {
    text-decoration: none;
    color: #000;
    &:active {
      text-decoration: underline;
    }
  }

  &__link {
    font-size: 22px;
    color: $colorSecondary !important;

    &--under {
      font-size: 14px;
    }
  }

  @include tablet {
    padding: 40px 60px;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
  }
}
</style>
