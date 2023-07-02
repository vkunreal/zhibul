<template>
  <section class="fill-width d-flex flex-column align-center">
    <div class="breadcrumbs">
      <div class="breadcrumbs-wrapper">
        <p class="breadcrumbs__link">
          <nuxt-link class="mr-1" to="/">Главная</nuxt-link> /
        </p>
        <p class="breadcrumbs__link">
          <span class="mr-1" to="">Контакты</span>
        </p>
      </div>
    </div>
    <div class="contacts fill-width">
      <h1 class="text-center mt-4 mb-4">{{ pageTitle }}</h1>

      <p>{{ pageText }}</p>

      <ul
        class="d-flex flex-column flex-md-row justify-space-between g-2 mt-10 pl-3 pr-3"
      >
        <a
          class="contacts__contact fill-width d-flex flex-column g-1 align-center text-center"
          :href="`tel:${phone_sales}`"
        >
          <svg width="40" height="40" class="contacts__contact-icon">
            <use xlink:href="@/static/icons.svg#phone" />
          </svg>
          <h5 class="contacts__contact-name mt-2">Телефон</h5>
          <p class="contacts__contact-value">{{ variable("phone_sales") }}</p>
        </a>

        <a
          class="contacts__contact fill-width d-flex flex-column g-1 align-center text-center"
          :href="`mailto:${email}`"
        >
          <svg width="40" height="40" class="contacts__contact-icon">
            <use xlink:href="@/static/icons.svg#email" />
          </svg>
          <h5 class="contacts__contact-name mt-2">Электронная почта</h5>
          <p class="contacts__contact-value">{{ variable("email") }}</p>
        </a>
      </ul>

      <div
        class="contacts__card-wrapper fill-width d-flex justify-center pl-3 pr-3"
      >
        <ul class="contacts__card fill-width d-flex flex-column mt-15 pd-4 g-4">
          <li class="contacts__card__elem d-flex flex-wrap align-center g-2">
            <span class="d-flex align-center g-2">
              <svg width="32" height="32">
                <use xlink:href="@/static/icons.svg#phone" />
              </svg>
              <span>Телефон продаж</span>
            </span>
            <div class="spacer"></div>
            <nobr>{{ variable("phone_sales") }}</nobr>
          </li>

          <li class="contacts__card__elem d-flex flex-wrap align-center g-2">
            <span class="d-flex align-center g-2">
              <svg width="32" height="32">
                <use xlink:href="@/static/icons.svg#phone" />
              </svg>
              <span>Телефон услуг</span>
            </span>
            <div class="spacer"></div>
            <nobr>{{ variable("phone_services") }}</nobr>
          </li>

          <li class="contacts__card__elem d-flex flex-wrap align-center g-2">
            <span class="d-flex align-center g-2">
              <svg width="32" height="32">
                <use xlink:href="@/static/icons.svg#geopin" />
              </svg>
              <span>Адрес</span>
            </span>
            <div class="spacer"></div>
            <span>{{ variable("address") }}</span>
          </li>

          <hr />

          <li>
            <h3 class="mb-4">Режим работы</h3>

            <p
              class="mt-2 mb-0"
              v-for="{ value, id } in variables('work_time')"
              :key="id"
            >
              {{ value }}
            </p>
          </li>
        </ul>
      </div>
    </div>

    <div class="bg--primary fill-width d-flex justify-center mt-10">
      <v-feed-back />
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
import VFeedBack from "@/components/VFeedBack.vue";

export default {
  head() {
    return {
      title: this.page?.seo_title || "Контакты",
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
  components: { VFeedBack },
  computed: {
    ...mapGetters("app", ["page", "appVariables"]),
    variable() {
      return (variableName) =>
        this.appVariables?.find(({ name }) => name === variableName)?.value ||
        null;
    },
    variables() {
      return (variableName) =>
        this.appVariables?.filter(({ name }) => name === variableName);
    },
    pageTitle() {
      return this.page?.name || "Контакты";
    },
    pageText() {
      return this.page?.text || "";
    },
    phone_sales() {
      return this.variable("phone_sales");
    },
    email() {
      return this.variable("email");
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
    await store.dispatch("app/fetchPage", "contacts");
  },
};
</script>

<style lang="scss">
@import "@/assets/mixins.scss";

.contacts {
  ul {
    padding: 0;
  }
  max-width: 1024px;
  &__contact {
    color: $black !important;
    text-decoration: none;
    list-style: none;
    padding: 35px;
    box-shadow: 0 4px 16px rgb(0 0 0 / 4%), 0 1px 4px rgb(0 0 0 / 14%);
    &-name {
      color: $dark-grey;
    }
    &-value {
      font-size: 24px;
    }
  }
  &__card {
    max-width: 768px;
    background: $light-grey;
    border-radius: 16px;
    list-style: none;
    & hr {
      border-top: 1px solid $dark-grey;
    }
    & svg {
      color: #000;
    }
  }

  @include laptop {
    &__contact {
      max-width: 470px;
    }
  }
}
</style>
