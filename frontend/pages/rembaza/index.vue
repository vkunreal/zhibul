<template>
  <section class="remont d-flex flex-column align-center">
    <div class="breadcrumbs">
      <div class="breadcrumbs-wrapper">
        <p class="breadcrumbs__link">
          <nuxt-link class="mr-1" to="/">Главная</nuxt-link> /
        </p>
        <p class="breadcrumbs__link">
          <nuxt-link class="mr-1" to="">Ремонт пневмоинструмента</nuxt-link>
        </p>
      </div>
    </div>

    <div
      class="remont__wrapper fill-width d-flex flex-column align-center mt-4 pd-2 pd-md-4"
    >
      <h1 v-html="page?.name" />

      <div class="home__devider mt-4 mb-8" />

      <div class="d-flex flex-column-reverse flex-md-row align-center">
        <img
          class="remont__image"
          src="http://194.67.78.19/images/remont-image.png"
          alt="Remont image"
        />

        <div>
          <h2
            class="remont__text-heading d-flex justify-center justify-md-start align-center text-uppercase g-1"
          >
            <svg style="fill: black" width="28" height="28">
              <use xlink:href="@/static/icons.svg#info" />
            </svg>
            О нашем сервисе
          </h2>

          <hr class="mt-4 mb-4" />

          <p class="remont__text" v-html="page?.text" />
        </div>
      </div>

      <h2 class="remont__option-heading text-uppercase text-center mt-12 mb-12">
        Преимущества нашей сервисной службы
      </h2>

      <div class="d-flex flex-wrap justify-center justify-md-space-between g-4">
        <div
          class="remont__option d-flex align-center g-3 g-sm-6"
          v-for="({ icon, name, text }, i) in options"
          :key="i"
        >
          <span class="d-flex align-center g-4">
            <v-arenda-icon :icon="icon" />

            <span>
              <h5 class="text-uppercase mb-2">{{ name }}</h5>
              <p v-html="text" />
            </span>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
const options = [
  {
    icon: "repair",
    name: "КАЧЕСТВЕННЫЙ РЕМОНТ",
    text: "Техническое обслуживание, ремонт инструмента и пневмооборудования осуществляется только квалифицированными специалистами.",
  },
  {
    icon: "warehouse",
    name: "СКЛАД ЗАПЧАСТЕЙ",
    text: "Наша сервисная служба всегда располагает большим складом запчастей для пневмоинструмента и оборудования марок: <b>BeA, BOSTITCH, DYNABRADE, EZ-Fasten, FASCO (BECK), HITACHI, PREBENA, SENCO и SUMAKE.</b>",
  },
  {
    icon: "message",
    name: "ГРАМОТНАЯ КОНСУЛЬТАЦИЯ",
    text: "Квалифицированная консультация по эксплуатации и работе пневматического инструмента.",
  },
  {
    icon: "truck",
    name: "СПОСОБ ОБСЛУЖИВАНИЯ",
    text: "Вы всегда можете выбрать наиболее удобный способ сервисного обслуживания. Выезд специалиста к вам на предприятие или же приехать непосредственно в сервисную службу.",
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
    options() {
      return options;
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
    await store.dispatch("app/fetchPage", "rembaza");
  },
};
</script>

<style lang="scss">
@import "@/assets/mixins.scss";

.remont {
  &__wrapper {
    max-width: 1024px;
  }

  &__image {
    max-width: 400px;
    width: 100%;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 0.25rem;
    text-transform: uppercase;
    text-align: center;
  }

  hr {
    border: 1px solid $colorGrey;
  }

  &__text {
    &-heading {
      font-size: 18px;
      text-align: center;
    }
    font-size: 15px;
    line-height: 24px;
  }

  &__option {
    &-heading {
      font-size: 26px;
    }
    max-width: 450px;
    width: 100%;
    h5 {
      font-size: 18px;
      line-height: 1.4;
      font-weight: 800;
    }
    p {
      font-size: 14px;
    }
  }

  @include laptop {
    h1 {
      font-size: 34px;
    }
  }
}
</style>
