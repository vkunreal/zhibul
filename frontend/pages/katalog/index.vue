<template>
  <div>
    <section class="v-categories-list">
      <div
        v-for="{ id: parent_id, name, url } in categoriesList()"
        :key="parent_id"
      >
        <nuxt-link :to="`/menu/${url}`">
          <span class="v-categories-list__elem-title">{{ name }}</span>
        </nuxt-link>

        <ul class="v-categories-list__details mt-4">
          <li v-for="{ id, name, url } in categoriesList(parent_id)" :key="id">
            <nuxt-link :to="`/menu/${url}`">
              <span>{{ name }}</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </section>

    <v-tabs-list class="mt-1" expanded-links @link-click="close" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VTabsList from "~/components/VTabsList.vue";

export default {
  components: { VTabsList },
  head() {
    return {
      title: this.page?.seo_title || "Каталог",
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
  data: () => ({
    categoryDetail: null,
    categoryDetailSecond: null,
  }),
  computed: {
    ...mapGetters("app", ["page", "categories"]),
    categoriesList() {
      return (parentId = null) =>
        this.categories
          .filter((c) => c.parent_id === parentId && !!c.active)
          .sort((a, b) => (a.position < b.position ? -1 : 1)) || {};
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
    await store.dispatch("app/fetchPage", "katalog");
  },
};
</script>

<style lang="scss">
@import "@/assets/mixins.scss";

.v-categories-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  font-size: 14px;
  padding: 20px 20px;

  ul {
    padding: 0;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: #000;
  }

  &__elem-title {
    font-size: 18px;
    color: $colorSecondary;
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin: 0 auto;

    & span {
      transition: 0.3s;
      color: $black;
      &:hover {
        background: $colorSecondary;
        color: $white;
        padding: 0 2px;
      }
    }
  }

  @include tablet {
    grid-template-columns: 1fr 1fr;
    padding: 40px 60px;
  }

  @include laptop {
    max-width: 1300px;
    width: 100%;
    margin: 0 auto;
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
