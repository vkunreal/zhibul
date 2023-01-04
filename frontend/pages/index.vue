<template>
  <section class="home d-flex flex-column align-center">
    <!-- :vertical="true"
    :vertical-delimiters="true" -->
    <v-carousel
      v-if="slider"
      :show-arrows="false"
      :interval="5000"
      :cycle="true"
    >
      <v-carousel-item
        v-for="{ id, title, brand, url, images: { desktop } } in slider"
        :key="id"
        :src="desktop"
      >
        <div class="d-flex fill-height flex-column justify-center align-center">
          <p
            class="home__slider-title text--primary text-uppercase text-center"
          >
            {{ title }} <br />
            {{ brand }}
          </p>
          <v-btn class="home__slider-button" @click="$router.push('/' + url)"
            >Подробнее</v-btn
          >
        </div>
      </v-carousel-item>
    </v-carousel>

    <div class="home-wrapper fill-width mt-4 mb-4 pl-2 pr-2">
      <h1 class="text-uppercase">О компании</h1>

      <div class="home__devider mt-4 mb-8" />

      <p>
        Наша компания более 10 лет осуществляет продажу пневматического
        инструмента и крепежа, которые известны на всей территории Европы.
        <br /><br />

        Пневматический инструмент и оборудование представлены такими компаниями,
        как: Fasco, EZ-Fasten, Bostitch и BeA. Данные компании являются лидерами
        по производству: скобозабивных, штифтозабивных, шпилькозабивных,
        гвоздезабивных и упаковочных пистолетов. Эти компании не раз доказали
        всему миру надежность, приемлемую цену и ремонтопригодность
        производимого ими инструмента и оборудования. <br /><br />

        Крепежная продукция представлена польской компанией EMES, которая
        специализируется на производстве скоб, штифтов, шпилек и гвоздей для
        пневматического инструмента. <br /><br />

        С недавнего времени был расширен наш ассортимент товаров в области
        сжатого воздуха и пневматического инструмента. Появились в продаже
        компрессоры (Remeza), краскораспылители (Walcom/Walmec), обдувочные
        пистолеты (Gav, Walmec), соединительные элементы и пневматика (Aignep),
        расходные материалы и запасные части для компрессоров и пневматического
        инструмента. <br /><br />

        Помимо реализации товаров мы занимаемся ремонтом и обслуживанием
        пневматического инструмента и оборудования таких брендов, как: Bea,
        Fasco, EZ-Fasten, Bostitch, Sumake, Max, Dynabrade.
      </p>
    </div>

    <div class="home__promotion fill-width d-flex justify-center pt-12 pb-12">
      <div
        class="home__promotion-wrapper fill-width d-flex justify-space-between"
      >
        <div>
          <h3 class="home__promotion-title text-center">
            {{ variable("years") }}
          </h3>
          <p class="home__promotion-text text-uppercase text-center">
            Лет на рынке
          </p>
        </div>

        <div>
          <h3 class="home__promotion-title text-center">
            {{ variable("clients") }}
          </h3>
          <p class="home__promotion-text text-uppercase text-center">
            Клиентов
          </p>
        </div>

        <div>
          <h3 class="home__promotion-title text-center">
            {{ variable("partners") }}
          </h3>
          <p class="home__promotion-text text-uppercase text-center">
            Партнеров
          </p>
        </div>

        <div>
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
  head: () => ({
    title: "Главная",
  }),
  computed: {
    ...mapGetters("app", ["appVariables", "slider"]),
    variable() {
      return (variableName) =>
        this.appVariables?.find(({ name }) => name === variableName)?.value ||
        0;
    },
  },
  async fetch({ store }) {
    const appVariables = store.getters.appVariables;
    const slider = store.getters.slider;
    if (!appVariables || appVariables.length === 0) {
      await store.dispatch("app/fetchVariables");
    }
    if (!slider) {
      await store.dispatch("app/fetchSlider");
    }
  },
};
</script>

<style lang="scss">
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
}
</style>
