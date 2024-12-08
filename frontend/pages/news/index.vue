<template>
  <div class="news d-flex justify-center">
    <div class="news__wrapper fill-width">
      <!-- <h1 class="text-center text-uppercase mt-4 mb-8">Новости</h1> -->

      <div v-if="news.length" class="d-flex flex-column g-4 mt-10">
        <div
          class="news__item d-flex flex-column flex-md-row g-2"
          v-for="{ id, url, title, short_text, media, date } in news"
          :key="id"
        >
          <nuxt-link v-if="media && media.length" :to="'/news/' + url">
            <img :src="media[0].src" :alt="title" width="350" height="350" />
          </nuxt-link>

          <div
            class="d-flex flex-column justify-space-between fill-width pd-2 pd-md-0 pb-5"
          >
            <div class="d-flex flex-column g-1 pt-2 pb-2">
              <span class="news__title">
                <nuxt-link :to="'/news/' + url">
                  <h2>{{ title }}</h2>
                </nuxt-link>
              </span>

              <time class="news__time">{{ getDate(date) }}</time>

              <p class="news__short-text" v-html="short_text"></p>
            </div>

            <div>
              <nuxt-link
                class="news__button text-uppercase"
                :to="'/news/' + url"
              >
                Подробнее
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

const months = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export default {
  name: "index",
  head() {
    return {
      title: this.page?.seo_title || "Новости",
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
  computed: {
    ...mapGetters("app", ["page"]),
    ...mapGetters("news", ["news"]),
  },
  methods: {
    ...mapActions("news", ["fetchNews"]),
    getDate(time) {
      const date = new Date(Number(time));

      let day = String(date.getDate());
      let monthId = date.getMonth();
      const year = date.getFullYear();

      return `${day} ${months[monthId]} ${year}`;
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
    await store.dispatch("app/fetchPage", "news");
    await store.dispatch("news/fetchNews");
  },
};
</script>

<style lang="scss">
@import "@/assets/mixins.scss";

.news {
  &__wrapper {
    max-width: 1200px;
  }

  & a {
    text-decoration: none;
    color: $black;
  }

  &__item {
    align-items: space-between;
  }

  &__short-text,
  &__title *,
  &__time {
    font-family: $manrope !important;
  }

  &__title * {
    font-weight: 800;
  }

  &__time {
    font-weight: 200;
    font-size: 14px;
  }

  &__button {
    padding: 7px 20px;
    font-weight: bold;
    font-size: 14px;
    background: $primaryGrey;
    color: $white !important;
    text-decoration: none;
  }

  @include toLaptop {
    &__item {
      align-items: center;
    }
  }
}
</style>
