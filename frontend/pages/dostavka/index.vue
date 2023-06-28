<template>
  <section class="fill-width d-flex flex-column align-center">
    <div class="breadcrumbs">
      <div class="breadcrumbs-wrapper">
        <p class="breadcrumbs__link">
          <nuxt-link class="mr-1" to="/">Главная</nuxt-link> /
        </p>
        <p class="breadcrumbs__link">
          <span class="mr-1" to="">Доставка</span>
        </p>
      </div>
    </div>

    <div class="delivery fill-width mt-2 pd-2">
      <h1 class="text-center mt-4 mb-4">{{ pageTitle }}</h1>

      <div v-html="pageText" />
    </div>

    <script
      type="text/javascript"
      charset="utf-8"
      async
      src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A62086dc6fbca1605ca60b02af6b538607abf5eb2f723be2e1d0fb60e2da0b89b&amp;width=100%25&amp;height=720&amp;lang=ru_RU&amp;scroll=true"
    ></script>

    <div class="delivery fill-width">
      <div class="bg--primary fill-width d-flex justify-center mt-10 mb-10">
        <v-feed-back />
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import VFeedBack from "@/components/VFeedBack";

export default {
  head() {
    return {
      title: this.page?.seo_title || "Доставка",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.page?.seo_description || "",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.page?.seo_keywords || "",
        },
      ],
    };
  },
  components: { VFeedBack },
  computed: {
    ...mapGetters("app", ["page"]),
    pageTitle() {
      return this.page?.name || "Доставка";
    },
    pageText() {
      return this.page?.text || "";
    },
  },
  async fetch({ store }) {
    const appVariables = store.getters.appVariables;
    const categories = store.getters.categories;
    if (!appVariables || !appVariables.length) {
      await store.dispatch("app/fetchVariables");
    }
    if (!categories || !categories.length) {
      await store.dispatch("app/fetchCategories");
    }
    await store.dispatch("app/fetchPage", "dostavka");
  },
};
</script>

<style lang="scss">
.delivery {
  max-width: 1024px;
}
</style>
