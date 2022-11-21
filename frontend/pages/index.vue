<template>
  <section class="home d-flex flex-column align-center">
    <div class="home-wrapper fill-width pd-4">
      <h1 class="text-uppercase">О нас</h1>

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

    <div
      class="home__promotion fill-width d-flex justify-center pt-12 pb-12 mb-2"
    >
      <div
        class="home__promotion-wrapper fill-width d-flex justify-space-between"
      >
        <div>
          <h3 class="home__promotion-title text-center">12</h3>
          <p class="home__promotion-text text-uppercase text-center">
            Лет на рынке
          </p>
        </div>

        <div>
          <h3 class="home__promotion-title text-center">209</h3>
          <p class="home__promotion-text text-uppercase text-center">
            Клиентов
          </p>
        </div>

        <div>
          <h3 class="home__promotion-title text-center">12</h3>
          <p class="home__promotion-text text-uppercase text-center">
            Партнеров
          </p>
        </div>

        <div>
          <h3 class="home__promotion-title text-center">2974</h3>
          <p class="home__promotion-text text-uppercase text-center">
            Произведено ремонта
          </p>
        </div>
      </div>
    </div>

    <div class="home__contacts fill-width d-flex justify-center mt-8 mb-8">
      <div
        class="
          home__contacts-wrapper
          fill-width
          d-flex
          justify-space-between
          g-8
        "
      >
        <div class="fill-width">
          <h2 class="text-center mb-16">Контакты</h2>

          <v-row>
            <v-col
              class="
                home__contacts-block
                border-right border-bottom
                d-flex
                flex-column
                justify-center
                align-center
              "
            >
              <h4>Адрес</h4>
              <p>г. Минск, Селицкого 21К</p>
            </v-col>
            <v-col
              class="
                home__contacts-block
                border-bottom
                d-flex
                flex-column
                justify-center
                align-center
              "
            >
              <h4>Продажи</h4>
              <p>г. Минск, Селицкого 21К</p>
            </v-col>
          </v-row>

          <v-row>
            <v-col
              class="
                home__contacts-block
                border-right
                d-flex
                flex-column
                justify-center
                align-center
              "
            >
              <h4>Услуги</h4>
              <p>г. Минск, Селицкого 21К</p>
            </v-col>
            <v-col
              class="
                home__contacts-block
                d-flex
                flex-column
                justify-center
                align-center
              "
            >
              <h4>E-mail</h4>
              <p>г. Минск, Селицкого 21К</p>
            </v-col>
          </v-row>
        </div>

        <v-feed-back class="fill-width" />
      </div>
    </div>
  </section>
</template>

<script>
import VFeedBack from "../components/VFeedBack.vue";

export default {
  name: "IndexPage",
  components: { VFeedBack },
};
</script>

<style lang="scss">
.home {
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
      min-height: 220px;
      &.border-right {
        border-right: 1px solid $light-grey;
      }
      &.border-bottom {
        border-bottom: 1px solid $light-grey;
      }
    }
  }
}
</style>
