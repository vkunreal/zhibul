<template>
  <section class="fill-width d-flex flex-column align-center">
    <div class="breadcrumbs">
      <div class="breadcrumbs-wrapper">
        <p class="breadcrumbs__link">
          <nuxt-link class="mr-1" to="/">Главная</nuxt-link> /
        </p>
        <p class="breadcrumbs__link">
          <nuxt-link class="mr-1" to="">Доставка</nuxt-link>
        </p>
      </div>
    </div>

    <div class="delivery fill-width">
      <h1 class="mt-4 mb-4">{{ pageTitle }}</h1>

      <p>{{ pageText }}</p>

      <div class="bg--primary fill-width d-flex justify-center mt-10 mb-10">
        <v-feed-back />
      </div>
    </div>

    <script
      type="text/javascript"
      charset="utf-8"
      async
      src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A62086dc6fbca1605ca60b02af6b538607abf5eb2f723be2e1d0fb60e2da0b89b&amp;width=100%25&amp;height=720&amp;lang=ru_RU&amp;scroll=true"
    ></script>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import VFeedBack from "@/components/VFeedBack";

export default {
  components: { VFeedBack },
  computed: {
    ...mapGetters("app", ["page"]),
    // variable() {
    //   return (variableName) =>
    //     this.appVariables?.find(({ name }) => name === variableName)?.value ||
    //     null;
    // },
    // variables() {
    //   return (variableName) =>
    //     this.appVariables?.filter(({ name }) => name === variableName);
    // },
    pageTitle() {
      return this.page?.name || "Доставка";
    },
    pageText() {
      return this.page?.text || "";
    },
  },
  async fetch({ store }) {
    await store.dispatch("app/fetchPage", "delivery");
    // const appVariables = store.getters.appVariables;
    // if (!appVariables || appVariables.length === 0) {
    //   await store.dispatch("app/fetchVariables");
    // }
  },
};
</script>

<style lang="scss">
.delivery {
  max-width: 1024px;
}
</style>
