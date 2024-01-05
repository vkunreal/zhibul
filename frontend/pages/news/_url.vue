<template>
  <div class="news-item d-flex flex-column align-center">
    <div class="news-item__wrapper fill-width">
      <template v-if="newsItem">
        <h1 class="text-center mt-2 mb-4">{{ newsItem.title }}</h1>

        <div class="d-none d-md-block">
          <div style="float: left">
            <img
              :src="image?.src || newsItem.media[0].src"
              :alt="newsItem.title"
              width="400"
              height="400"
              class="mr-6 mb-4"
            />

            <div
              class="news-item__images-footer d-flex g-1"
              v-if="newsItem.media.length > 1"
              @mouseover="($event) => $event.target.focus()"
            >
              <img
                width="150"
                height="150"
                style="cursor: pointer"
                v-for="im in newsItem.media"
                :src="im.src"
                :key="im.src"
                :alt="newsItem.title"
                @click="image = im"
              />
            </div>
          </div>

          <p v-html="newsItem.text" />
        </div>

        <div class="d-flex d-md-none flex-column">
          <div class="d-flex flex-column align-center">
            <img
              :src="image?.src || newsItem.media[0].src"
              :alt="newsItem.title"
              width="400"
              height="400"
              class="mb-4"
            />

            <div
              class="news-item__images-footer d-flex g-1"
              style="max-width: 95%"
              v-if="newsItem.media.length > 1"
              @mouseover="($event) => $event.target.focus()"
            >
              <img
                width="150"
                height="150"
                style="cursor: pointer"
                v-for="im in newsItem.media"
                :src="im.src"
                :key="im.src"
                :alt="newsItem.title"
                @click="image = im"
              />
            </div>
          </div>

          <p class="pd-2" v-html="newsItem.text" />
        </div>
      </template>
      <div
        v-else
        class="news-item__404 fill-width d-flex justify-center align-center"
      >
        Новость не найдена
      </div>
    </div>

    <div class="news-item__feedback fill-width d-flex justify-center mt-4">
      <v-feed-back />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VFeedBack from "@/components/VFeedBack";

export default {
  head() {
    const {
      newsItem: { title, short_text, seo_title, seo_description, seo_keywords },
    } = this;
    return {
      title: seo_title || title || "",
      meta: [
        {
          hid: "description",
          name: "description",
          content: seo_description || short_text || "",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: seo_keywords || "",
        },
      ],
    };
  },
  components: { VFeedBack },
  data: () => ({
    image: null,
  }),
  computed: {
    ...mapGetters("news", ["newsItem"]),
  },
  async fetch({ store, params }) {
    const appVariables = store.getters.appVariables;
    const categories = store.getters.categories;
    if (!appVariables || !appVariables.length) {
      await store.dispatch("app/fetchVariables");
    }
    if (!categories || !categories.length) {
      await store.dispatch("app/fetchCategories");
    }
    await store.dispatch("news/fetchNewsItem", params.url);
  },
};
</script>

<style lang="scss">
.news-item {
  & * {
    font-family: $manrope;
  }

  &__wrapper {
    max-width: 1024px;
  }

  &__404 {
    height: 500px;
    font-size: 24px;
    font-weight: 700;
  }

  &__feedback {
    background: $colorPrimary;
  }

  &__images-footer {
    max-width: 400px;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background-color: $white;
    }

    &::-webkit-scrollbar-thumb {
      background: $colorGrey;
      border-radius: 20px;
      border-top: 1px solid $white;
      border-bottom: 1px solid $white;
    }
  }
}
</style>
