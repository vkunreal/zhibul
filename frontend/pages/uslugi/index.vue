<template>
  <section class="uslugi d-flex flex-column align-center">
    <!-- breadcrumbs -->
    <div class="breadcrumbs">
      <div class="breadcrumbs-wrapper">
        <p class="breadcrumbs__link">
          <nuxt-link class="mr-1" to="/">Главная</nuxt-link> /
        </p>
        <p class="breadcrumbs__link">
          <nuxt-link class="mr-1" to="">Услуги</nuxt-link>
        </p>
      </div>
    </div>
    <!-- breadcrumbs -->

    <div
      class="uslugi__wrapper fill-width d-flex flex-column align-center g-2 mt-2"
    >
      <!-- block -->
      <div
        class="uslugi__block pd-1 d-flex flex-column flex-md-row align-center"
        v-for="({ title, description, image, link, phone }, i) in blocks"
        :key="i"
      >
        <img class="uslugi__block-image" :src="image" alt="uslugi-image" />

        <div class="pd-2">
          <!-- info -->
          <div>
            <h2>{{ title }}</h2>

            <p class="mt-4 mt-md-8">{{ description }}</p>
          </div>
          <!-- info -->

          <!-- actions -->
          <div class="d-flex g-2 mt-16">
            <nuxt-link
              class="uslugi__block-button uslugi__block-button--more text-uppercase"
              :to="'/' + link"
            >
              Подробнее
            </nuxt-link>
            <a
              class="uslugi__block-button text-uppercase"
              :href="`tel:${phone}`"
            >
              Позвонить
            </a>
          </div>
          <!-- actions -->
        </div>
      </div>
      <!-- block -->
    </div>

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

const blocks = [
  {
    title: "Ремонт пневмоинструмента",
    description:
      "Занимаемся ремонтом пневмоинструментов следующих брендов: BeA, BOSTITCH, DYNABRADE, EZ-FASTEN, FASCO (BECK), HITACHI, MAX, PREBENA, SENCO, SUMAKE.",
    image: "https://api.zhbl.by/images/uslugi-1.png",
    link: "rembaza",
    phone: "+375 (44) 758-16-43",
  },
  {
    title: "Аренда автоприцепов",
    description:
      "Предлагаем к сдаче в аренду автоприцепы с тентом (3 х 1.5 м / 2.6 х 1.5 м) и без тента (3 х 1.5 м) всего за 20 рублей в сутки, также есть возможность почасовой аренды.",
    image: "https://api.zhbl.by/images/uslugi-2.png",
    link: "arenda_prizepa",
    phone: "+375 (29) 741-52-26",
  },
];

export default {
  head() {
    return {
      title: this.page?.seo_title || "Ремонт пневмоинструмента",
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
    blocks() {
      return blocks;
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
    await store.dispatch("app/fetchPage", "uslugi");
  },
};
</script>

<style lang="scss">
@import "@/assets/mixins.scss";

.uslugi {
  &__wrapper {
    max-width: 1024px;
  }

  &__block {
    max-width: 600px;

    &-button {
      color: $primaryGrey;
      border: 1px solid $primaryGrey;
      padding: 7px 20px;
      font-weight: bold;
      font-size: 14px;
      text-decoration: none;
      color: $primaryGrey !important;

      &--more {
        background: $primaryGrey;
        color: $white !important;
      }
    }

    &-image {
      width: 100%;
      max-width: 400px;
    }
  }

  @include laptop {
    &__block {
      max-width: unset;
    }
  }
}
</style>
