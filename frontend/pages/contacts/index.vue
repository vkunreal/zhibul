<template>
  <section>
    <h1 class="mb-4">{{ page.name }}</h1>

    <p>{{ page.text }}</p>

    <iframe
      src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=196054484550"
      width="100%"
      height="520"
      frameborder="0"
    />
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("app", ["page"]),
  },
  async fetch({ store }) {
    await store.dispatch("app/fetchPage", "contacts");
  },
};
</script>
