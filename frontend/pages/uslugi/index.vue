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

    <div class="uslugi__wrapper fill-width d-flex flex-column g-2 mt-2">
      <!-- block -->
      <div
        class="uslugi__block d-flex flex-row-reverse g-4 pd-1"
        v-for="({ title, description, image, link, phone }, i) in blocks"
        :key="i"
      >
        <!-- body -->
        <div
          class="fill-width fill-height d-flex flex-column justify-space-between pt-10 pb-10"
        >
          <div class="">
            <h2>{{ title }}</h2>

            <p class="mt-4">{{ description }}</p>
          </div>

          <!-- actions -->
          <div class="d-flex g-2">
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
        <!-- body -->

        <img class="uslugi__block-image" :src="image" alt="uslugi_image" />
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
    description: "Тестовое описание",
    image: "http://194.67.78.19/images/remont-image.png",
    link: "rembaza",
    phone: "+375 (29) 741-52-26",
  },
  {
    title: "Аренда автоприцепов",
    description: "Тестовое описание",
    image: "http://194.67.78.19/trailers/preview-with-tent.png",
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
};
</script>

<style lang="scss">
@import "@/assets/mixins.scss";

.uslugi {
  &__wrapper {
    max-width: 1024px;
  }

  &__block {
    height: 400px;

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
  }

  @include laptop {
    &__block {
    }
  }
}
</style>
