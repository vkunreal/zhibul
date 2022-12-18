<template>
  <v-app>
    <div class="v-app__header-wrapper fill-width d-flex justify-center pd-1">
      <header
        class="v-app__header fill-width d-flex justify-space-around align-center"
      >
        <div class="pointer" @click="logoClick">
          <img width="140" src="@/static/logo.png" alt="logo" />
        </div>

        <div class="v-app__header__block d-flex flex-column">
          <p class="text-uppercase">Телефон</p>
          <p class="v-app__header__block-text">+375 (29) 741-52-26</p>
        </div>

        <div class="v-app__header__block d-flex flex-column">
          <p class="text-uppercase">E-mail</p>
          <p class="v-app__header__block-text">zhibul.maksim@yandex.ru</p>
        </div>

        <v-btn large color="yellow" @click="$orderModal()"
          >Заказать звонок</v-btn
        >
      </header>
    </div>

    <nav class="v-app__nav d-flex justify-center pd-2 mt-1">
      <v-categories class="v-app__nav__categories fill-width" />
    </nav>

    <main class="fill-height">
      <nuxt />
    </main>

    <div class="v-app__footer-wrapper d-flex justify-center pd-2">
      <footer class="v-app__footer fill-width">
        <div
          class="v-app__footer__contacts d-flex justify-space-between g-4 mt-4 mb-8"
        >
          <div
            class="v-app__footer__contacts__block fill-width d-flex align-center pd-4 g-4"
          >
            <svg width="40" height="40">
              <use xlink:href="@/static/icons.svg#phone" />
            </svg>
            <div>
              <h4 class="v-app__footer__contacts__block-title">
                Звонок по Беларуси
              </h4>
              <p class="v-app__footer__contacts__block-text">
                {{ variable("phone_sales") }}
              </p>
            </div>
          </div>

          <div
            class="v-app__footer__contacts__block fill-width d-flex justify-end align-center pd-4 g-4"
          >
            <svg width="40" height="40">
              <use xlink:href="@/static/icons.svg#email" />
            </svg>
            <div>
              <h4 class="v-app__footer__contacts__block-title">
                Электронная почта
              </h4>
              <p class="v-app__footer__contacts__block-text">
                {{ variable("email") }}
              </p>
            </div>
          </div>
        </div>

        <div class="v-app__footer__sections d-flex justify-space-between">
          <div class="v-app__footer__section fill-width">
            <h4 class="v-app__footer__section-title">Каталог</h4>
            <ul class="d-flex flex-column g-1 mt-1">
              <li class="v-app__footer__section-list-elem">
                <nuxt-link to="/category1">Категория 1</nuxt-link>
              </li>
              <li class="v-app__footer__section-list-elem">
                <nuxt-link to="/category1">Категория 2</nuxt-link>
              </li>
              <li class="v-app__footer__section-list-elem">
                <nuxt-link to="/category1">Категория 3</nuxt-link>
              </li>
            </ul>
          </div>

          <div class="v-app__footer__section fill-width">
            <h4 class="v-app__footer__section-title">Покупателю</h4>
            <ul class="d-flex flex-column g-1 mt-1">
              <li class="v-app__footer__section-list-elem">
                <nuxt-link to="/delivery">Доставка</nuxt-link>
              </li>
              <li class="v-app__footer__section-list-elem">
                <nuxt-link to="/garanty">Гарантия</nuxt-link>
              </li>
              <li class="v-app__footer__section-list-elem">
                <nuxt-link to="/payment">Оплата</nuxt-link>
              </li>
              <li class="v-app__footer__section-list-elem">
                <nuxt-link to="/actions">Акции</nuxt-link>
              </li>
            </ul>
          </div>

          <div class="fill-width">
            <ul class="d-flex g-1">
              <li class="v-app__footer__app">
                <a :href="variable('tg') || ''">
                  <svg width="30" height="30">
                    <use xlink:href="@/static/icons.svg#tg" />
                  </svg>
                </a>
              </li>
              <li class="v-app__footer__app">
                <a :href="variable('vk') || ''">
                  <svg width="30" height="30">
                    <use xlink:href="@/static/icons.svg#vk" />
                  </svg>
                </a>
              </li>
              <li class="v-app__footer__app">
                <a :href="variable('inst') || ''">
                  <svg width="30" height="30">
                    <use xlink:href="@/static/icons.svg#inst" />
                  </svg>
                </a>
              </li>
              <li class="v-app__footer__app">
                <a :href="variable('viber') || ''">
                  <svg width="30" height="30">
                    <use xlink:href="@/static/icons.svg#viber" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <v-btn large color="yellow" @click="$orderModal()"
              >Заказать звонок</v-btn
            >
          </div>
        </div>
      </footer>
    </div>

    <v-order-modal ref="order-modal" />
  </v-app>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import VCategories from "~/components/VCategories.vue";
import VOrderModal from "../components/VOrderModal.vue";

export default {
  name: "DefaultLayout",
  components: { VCategories, VOrderModal },
  async mounted() {
    Vue.prototype.$orderModal = this.$refs["order-modal"].open;

    await this.fetchVariables();
    await this.fetchCategories();
  },
  computed: {
    ...mapGetters("app", ["appVariables"]),
    variable() {
      return (variableName) =>
        this.appVariables?.find(({ name }) => name === variableName)?.value ||
        "";
    },
  },
  methods: {
    ...mapActions("app", ["fetchVariables", "fetchCategories"]),
    logoClick() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/display.scss";
@import "@/assets/mixins.scss";
@import "@/assets/variables.scss";
@import "@/assets/colors.scss";

.v-app {
  &__header {
    max-width: 1024px;
    &-wrapper {
      background: $primaryGrey;
      color: $white;
    }
    &__block {
      font-size: 12px;
      &-text {
        font-weight: bold;
      }
      & p {
        margin-bottom: 0;
      }
    }
  }

  &__nav {
    &__categories {
      max-width: 1024px;
    }
  }

  &__footer {
    max-width: 1024px;
    &-wrapper {
      background: $primaryGrey;
      color: $white;
    }
    & p {
      font-size: 14px;
      margin-bottom: 0;
    }
    & ul {
      list-style: none;
      padding-left: 0 !important;
    }
    &__contacts {
      &__block {
        background: $colorGrey;
        &-title {
          font-size: 14px;
          font-weight: 400;
          color: $dark-grey;
        }
        &-text {
          font-size: 28px !important;
        }
      }
    }
    &__section {
      &-title {
        font-weight: 400;
        font-size: 22px;
      }
      &-list {
        &-elem {
          & a {
            text-decoration: none;
            color: $white;
          }
        }
      }
    }
    &__app {
      padding: 5px;
      border-radius: 5px;
      cursor: pointer;
      & svg {
        color: $white;
      }
    }
  }

  @include tablet {
    &__footer {
      &__section {
        &-list {
          &-elem {
            & a:hover {
              text-decoration: underline;
            }
          }
        }
      }
      &__app {
        & svg:hover {
          color: $colorPrimary;
        }
      }
    }
  }
}
</style>
