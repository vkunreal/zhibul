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
        v-for="{ id, title, brand, url, images: { mobile } } in slider"
        :key="id"
        :src="mobile"
      >
        <div
          class="d-flex fill-height flex-column align-center justify-center g-35"
        >
          <p class="home__slider-title text--white text-uppercase text-center">
            {{ title }} <br />
            {{ brand }}
          </p>
          <v-btn
            class="home__slider-button ml-8 mr-8"
            @click="$router.push('/menu/' + url)"
          >
            Подробнее
          </v-btn>
        </div>
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
        <div class="d-flex fill-height flex-column justify-center align-center">
          <p class="home__slider-title text--white text-uppercase text-center">
            {{ title }} <br />
            {{ brand }}
          </p>
          <v-btn
            class="home__slider-button"
            @click="$router.push('/menu/' + url)"
            >Подробнее</v-btn
          >
        </div>
      </v-carousel-item>
    </v-carousel>

    <div class="home-wrapper fill-width mt-4 mb-4 pl-3 pr-3">
      <h1 class="text-uppercase">О компании</h1>

      <div class="home__devider mt-4 mb-8" />

      <p>
        Наша компания более 10 лет осуществляет продажу пневматического
        инструмента и крепежа, которые известны на всей территории Европы.
        <br /><br />

        Пневматический инструмент представлен следующими брендами: FASCO (BECK),
        EZ-FASTEN и SENCO. Данные компании являются лидерами по производству
        скобозабивных, штифтозабивных, шпилькозабивных, гвоздезабивных,
        специальных и упаковочных пистолетов. Эти компании не раз доказали всему
        миру надежность, приемлемую цену и ремонтопригодность производимого ими
        инструмента.
        <br /><br />

        Крепежные изделия представлены польской компанией EMES, которая
        специализируется на производстве скоб, штифтов, шпилек и гвоздей для
        пневматического инструмента. <br /><br />

        Также был расширен ассортимент товаров. Появились в продаже компрессоры
        (REMEZA), краскораспылители (WALCOM), соединительные элементы (AIGNEP),
        запасные части для краскораспылителей (WALCOM), а также трубки и шланги
        (AIGNEP). <br /><br />

        Помимо реализации товаров наша компания занимается ремонтом и
        обслуживанием пневматического инструмента и оборудования следующих
        брендов: BeA, BOSTITCH, DYNABRADE, EZ-FASTEN, FASCO (BECK), HITACHI,
        MAX, PREBENA, SENCO, SUMAKE.
      </p>
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
  computed: {
    ...mapGetters("app", ["page", "appVariables", "slider"]),
    variable() {
      return (variableName) =>
        this.appVariables?.find(({ name }) => name === variableName)?.value ||
        0;
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
      font-size: 26px;
      font-weight: 900;
    }
    &-button {
      background: $primaryGrey !important;
      color: $white !important;
      border-radius: 0 !important;
      padding: 25px 30px !important;
      max-width: 220px;
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
