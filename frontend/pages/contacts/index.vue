<template>
  <section class="fill-width d-flex flex-column align-center">
    <div class="contacts fill-width">
      <h1 class="mb-4">{{ pageTitle }}</h1>

      <p>{{ pageText }}</p>

      <ul class="d-flex justify-space-between g-2 mt-10">
        <li
          class="contacts__contact fill-width d-flex flex-column g-1 align-center text-center"
        >
          <svg width="40" height="40" class="contacts__contact-icon">
            <use xlink:href="@/static/icons.svg#phone" />
          </svg>
          <h5 class="contacts__contact-name mt-2">Звонок по РБ</h5>
          <p class="contacts__contact-value">{{ variable("phone_sales") }}</p>
        </li>

        <li
          class="contacts__contact fill-width d-flex flex-column g-1 align-center text-center"
        >
          <svg width="40" height="40" class="contacts__contact-icon">
            <use xlink:href="@/static/icons.svg#email" />
          </svg>
          <h5 class="contacts__contact-name mt-2">Электронная почта</h5>
          <p class="contacts__contact-value">{{ variable("email") }}</p>
        </li>
      </ul>

      <div class="contacts__card-wrapper fill-width d-flex justify-center">
        <ul class="contacts__card fill-width d-flex flex-column mt-15 pd-4 g-4">
          <li class="contacts__card__elem d-flex align-center g-2">
            <svg width="32" height="32">
              <use xlink:href="@/static/icons.svg#phone" />
            </svg>
            <span>Телефон продаж</span>
            <div class="spacer"></div>
            <span>{{ variable("phone_sales") }}</span>
          </li>

          <li class="contacts__card__elem d-flex align-center g-2">
            <svg width="32" height="32">
              <use xlink:href="@/static/icons.svg#phone" />
            </svg>
            <span>Телефон услуг</span>
            <div class="spacer"></div>
            <span>{{ variable("phone_services") }}</span>
          </li>

          <li class="contacts__card__elem d-flex align-center g-2">
            <svg width="32" height="32">
              <use xlink:href="@/static/icons.svg#geopin" />
            </svg>
            <span>Адрес</span>
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

    <div class="bg--primary fill-width d-flex justify-center mt-10 mb-10">
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
      return this.page?.name || "Доставка";
    },
    pageText() {
      return this.page?.text || "";
    },
  },
  async fetch({ store }) {
    await store.dispatch("app/fetchPage", "contacts");
    const appVariables = store.getters.appVariables;
    if (!appVariables || appVariables.length === 0) {
      await store.dispatch("app/fetchVariables");
    }
  },
};
</script>

<style lang="scss">
.contacts {
  max-width: 1024px;
  &__contact {
    list-style: none;
    padding: 35px;
    box-shadow: 0 4px 16px rgb(0 0 0 / 4%), 0 1px 4px rgb(0 0 0 / 14%);
    max-width: 470px;
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
}
</style>
