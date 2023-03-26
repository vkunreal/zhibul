<template>
  <section>
    <ul class="d-flex flex-column g-1">
      <li
        class="d-flex align-center g-1"
        v-for="{ id, name, url } in categoriesList()"
        :key="id"
      >
        <svg width="12" height="12">
          <use xlink:href="@/static/icons.svg#slider-arrow" />
        </svg>
        <nuxt-link :to="'/' + url">
          {{ name }}
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "VCategoriesList",
  computed: {
    ...mapGetters("app", ["categories"]),
    categoriesList() {
      return (parentId = null) =>
        this.categories.filter((c) => c.parent_id === parentId) || {};
    },
  },
};
</script>
