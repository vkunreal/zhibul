<template>
  <section class="home d-flex flex-column align-center">
    <v-carousel
      class="home__slider home__slider--mobile"
      v-if="slider"
      :show-arrows="false"
      :interval="5000"
      :cycle="true"
      delimiter-icon="mdi-minus"
      height="600"
    >
      <v-carousel-item
        v-for="{ id, title, url, images: { mobile } } in slider"
        :key="id"
        :src="mobile"
      >
        <nuxt-link
          class="d-flex fill-height flex-column align-space-between justify-center text-center g-48"
          style="text-decoration: none; color: #fff"
          :to="url"
        >
          <p class="home__slider-title text--white text-uppercase text-center">
            {{ title }}
          </p>

          <p class="text-uppercase">Уже в продаже</p>
        </nuxt-link>
      </v-carousel-item>
    </v-carousel>

    <v-carousel
      class="home__slider home__slider--desktop"
      v-if="slider"
      :show-arrows="false"
      :interval="5000"
      :cycle="true"
      delimiter-icon="mdi-minus"
      height="800"
    >
      <v-carousel-item
        v-for="{ id, title, brand, url, images: { desktop } } in slider"
        :key="id"
        :src="desktop"
      >
        <nuxt-link
          class="d-flex fill-height flex-column justify-center align-center g-15"
          :class="{ 'g-35': !brand.length }"
          style="text-decoration: none; color: #fff"
          :to="url"
        >
          <p class="home__slider-title text--white text-uppercase text-center">
            {{ title }}
          </p>

          <p class="text-center" style="max-width: 500px; font-size: 20px">
            {{ brand }}
          </p>

          <p
            class="home__slider-heading text-uppercase"
            style="font-size: 28px; font-weight: bold"
          >
            Уже в продаже
          </p>
        </nuxt-link>
      </v-carousel-item>
    </v-carousel>

    <div class="home-wrapper fill-width mt-4 mb-4 pl-3 pr-3">
      <h1 class="text-uppercase">О компании</h1>

      <div class="home__devider mt-4 mb-8" />

      <div>
        Наша компания более 10 лет осуществляет продажу пневматического
        инструмента, крепежных изделий, краскораспылителей, сервисного
        инструмента, соединительных элементов, компрессорного оборудования,
        осушителей, шестеренных насосов известных брендов.<br /><br />

        Помимо реализации товаров мы осуществляем ремонт и обслуживание
        пневматического инструмента и оборудования следующих брендов: BEA,
        BOSTITCH, DYNABRADE, EZ-FASTEN, FASCO, HITACHI, MAX, PREBENA, SENCO,
        SUMAKE.<br /><br />

        Основная миссия нашей компании - показать и рассказать людям о новинках
        и инновационных решениях в сфере сжатого воздуха, а так же дать понять,
        что брендовое оборудование может быть доступно для каждого.<br /><br />

        Мы начинали свой бизнес с продажи итальянского пневматического
        инструмента FASCO и крепежных изделий польского бренда EMES и постепенно
        расширяли наш ассортимент. <br /><br />

        На сегодняшний день мы поставляем:<br /><br />

        <ol>
          <li>Пневматический инструмент - FASCO, EZ-FASTEN, SENCO</li>
          <li>Крепежные изделия - EMES</li>
          <li>
            Компрессорное оборудования, осушители и запасные части - REMEZA
          </li>
          <li>Пневматику, трубопровод и соединительные элементы - AIGNEP</li>
          <li>
            Краскораспылители, принадлежности для окрасочных работ, сервисный
            инструмент и запасные части - WALCOM, ASTUROMEC
          </li>
          <li>Шестеренные насосы - МОСГИДРОПРИВОД</li>
        </ol>
        <br />

        Это делает нас одной из известных компаний на территории Беларуси.
      </div>
    </div>

    <div class="home__promotion fill-width d-flex justify-center pt-12 pb-12">
      <div
        class="home__promotion-wrapper fill-width d-flex flex-column flex-md-row g-4 justify-space-beetwen justify-md-space-around"
      >
        <div
          class="home__promotion-item fill-width d-flex flex-column align-center g-1"
        >
          <svg width="36" height="36">
            <use xlink:href="@/static/icons.svg#medal" />
          </svg>
          <h3 class="home__promotion-title text-center">
            {{ variable("years") }}
          </h3>
          <p class="home__promotion-text text-uppercase text-center">
            Лет на рынке
          </p>
        </div>

        <div
          class="home__promotion-item fill-width d-flex flex-column align-center g-1"
        >
          <svg width="36" height="36">
            <use xlink:href="@/static/icons.svg#people" />
          </svg>
          <h3 class="home__promotion-title text-center">
            {{ variable("clients") }}
          </h3>
          <p class="home__promotion-text text-uppercase text-center">
            Клиентов
          </p>
        </div>

        <div
          class="home__promotion-item fill-width d-flex flex-column align-center g-1"
        >
          <svg width="36" height="36">
            <use xlink:href="@/static/icons.svg#structure" />
          </svg>
          <h3 class="home__promotion-title text-center">
            {{ variable("partners") }}
          </h3>
          <p class="home__promotion-text text-uppercase text-center">
            Партнеров
          </p>
        </div>

        <div
          class="home__promotion-item fill-width d-flex flex-column align-center g-1"
        >
          <svg width="36" height="36">
            <use xlink:href="@/static/icons.svg#repair_done" />
          </svg>
          <h3 class="home__promotion-title text-center">
            {{ variable("repair_done") }}
          </h3>
          <p class="home__promotion-text text-uppercase text-center">
            Произведено ремонта
          </p>
        </div>
      </div>
    </div>

    <iframe
      src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=196054484550"
      width="100%"
      height="520"
      frameborder="0"
    />

    <div class="home__contacts fill-width">
      <div class="home__feedback fill-width d-flex justify-center">
        <v-feed-back />
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import VFeedBack from "../components/VFeedBack.vue";

export default {
  name: "IndexPage",
  components: { VFeedBack },
  head() {
    return {
      title: this.page?.seo_title || "Главная",
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
  mounted() {
    this.trackEvent();
  },
  computed: {
    ...mapGetters("app", ["page", "appVariables", "slider"]),
    variable() {
      return (variableName) =>
        this.appVariables?.find(({ name }) => name === variableName)?.value ||
        0;
    },
  },
  methods: {
    trackEvent() {
      this.$gtm.push({
        event: "Main page",
      });
    },
  },
  async fetch({ store }) {
    const appVariables = store.getters.appVariables;
    const categories = store.getters.categories;
    const slider = store.getters.slider;
    if (!appVariables || !appVariables.length) {
      await store.dispatch("app/fetchVariables");
    }
    if (!categories || !categories.length) {
      await store.dispatch("app/fetchCategories");
    }
    if (!slider) {
      await store.dispatch("app/fetchSlider");
    }
    await store.dispatch("app/fetchPage", "index");
  },
};
</script>

<style lang="scss">
@import "@/assets/mixins.scss";

.home {
  &__slider {
    &-title {
      font-size: 30px;
      font-weight: 900;
    }
    &-button {
      background: $primaryGrey !important;
      color: $white !important;
      border-radius: 0 !important;
      padding: 25px 30px !important;
      max-width: 220px;
    }
    &-heading {
      color: $colorFourth;
    }
    .v-btn::before {
      content: unset;
    }
    &--desktop {
      display: none;
    }
  }
  &-wrapper {
    max-width: 1024px;
  }
  & h1 {
    font-size: 35px;
  }
  &__devider {
    width: 70px;
    height: 10px;
    background: $primaryGrey;
  }
  &__promotion {
    background: $primaryGrey;
    color: $white;
    &-wrapper {
      max-width: 1024px;
    }
    &-title {
      font-size: 35px;
      font-weight: 400;
    }
    &-text {
      font-size: 12px;
    }
    &-item {
      svg {
        fill: $white;
        opacity: 0.6;
      }
    }
  }
  &__contacts {
    &-wrapper {
      max-width: 1024px;
    }
    &-block {
      min-width: 300px;
      min-height: 300px;
      &.border-right {
        border-right: 1px solid $light-grey;
      }
      &.border-bottom {
        border-bottom: 1px solid $light-grey;
      }
    }
  }
  &__feedback {
    background: $colorPrimary;
  }
  @include slider {
    &__slider {
      &--mobile {
        display: none;
      }
      &--desktop {
        display: block;
      }
    }
  }
}
</style>
