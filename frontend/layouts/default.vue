<template>
  <v-app id="v-app">
    <div
      class="v-app__header-wrapper d-block d-md-none fill-width d-flex justify-center pd-4"
    >
      <header
        class="v-app__header fill-width d-flex flex-column g-4 align-center"
      >
        <div class="d-flex align-center pointer" @click="logoClick">
          <img width="140" src="@/static/logo.png" alt="logo" />
        </div>

        <div class="d-flex flex-column g-2">
          <div class="v-app__header__block d-flex align-center g-2">
            <svg class="shrink" width="30" height="30">
              <use xlink:href="@/static/icons.svg#phone" />
            </svg>

            <div class="d-flex flex-column align-center fill-width">
              <a
                :href="`tel:${phone_sales}`"
                class="v-app__header__block-text text--white"
              >
                {{ phone_sales }}
              </a>
              <a
                :href="`tel:${phone_services}`"
                class="v-app__header__block-text text--white"
              >
                {{ phone_services }}
              </a>
            </div>
          </div>

          <div class="v-app__header__block d-flex align-center g-2">
            <svg width="30" height="30">
              <use xlink:href="@/static/icons.svg#email" />
            </svg>
            <a
              :href="`mailto:${email}`"
              class="v-app__header__block-text text--white"
              >{{ email }}</a
            >
          </div>
        </div>

        <v-btn large color="yellow" @click="$orderModal()"
          >Заказать звонок</v-btn
        >
      </header>
    </div>

    <div class="v-app__top">
      <div
        class="v-app__header-wrapper d-none d-md-flex fill-width justify-center pd-1"
      >
        <header
          class="v-app__header fill-width d-flex justify-space-between align-center"
        >
          <div class="d-flex align-center pointer" @click="logoClick">
            <img width="140" src="@/static/logo.png" alt="logo" />
          </div>

          <div class="v-app__header__block d-flex align-center g-2">
            <svg width="25" height="25">
              <use xlink:href="@/static/icons.svg#phone" />
            </svg>

            <div class="d-flex flex-column">
              <a
                :href="`tel:${phone_sales}`"
                class="v-app__header__block-text text--white"
              >
                {{ phone_sales }}
              </a>
              <a
                :href="`tel:${phone_services}`"
                class="v-app__header__block-text text--white"
              >
                {{ phone_services }}
              </a>
            </div>
          </div>

          <div class="v-app__header__block d-flex align-center g-2">
            <svg width="30" height="30">
              <use xlink:href="@/static/icons.svg#email" />
            </svg>
            <a
              :href="`mailto:${email}`"
              class="v-app__header__block-text text--white"
              >{{ email }}</a
            >
          </div>

          <v-btn large color="yellow" @click="$orderModal()"
            >Заказать звонок</v-btn
          >
        </header>
      </div>

      <nav class="v-app__nav d-flex justify-center mt-1 mb-1">
        <div class="v-app__nav-spacer left" />
        <v-categories class="v-app__nav__categories fill-width" />
        <div class="v-app__nav-spacer right" />
      </nav>
    </div>

    <main class="v-app__content fill-height">
      <nuxt />
    </main>

    <div class="v-app__footer-wrapper d-flex justify-center pd-2">
      <footer class="v-app__footer fill-width">
        <div
          class="v-app__footer__contacts d-flex flex-column flex-md-row justify-space-between g-4 mt-4 mb-8"
        >
          <a
            class="v-app__footer__contacts__block fill-width d-flex flex-wrap justify-center align-center text--white pd-4 g-4"
            :href="`tel:${phone_sales}`"
          >
            <svg class="shrink" width="35" height="35">
              <use xlink:href="@/static/icons.svg#phone" />
            </svg>
            <div>
              <h4 class="v-app__footer__contacts__block-title">Звонок</h4>
              <p class="v-app__footer__contacts__block-text">
                {{ phone_sales }}
              </p>
            </div>
          </a>

          <a
            class="v-app__footer__contacts__block fill-width d-flex flex-wrap justify-center align-center text--white pd-4 g-4"
            :href="`mailto:${email}`"
          >
            <svg class="shrink" width="40" height="40">
              <use xlink:href="@/static/icons.svg#email" />
            </svg>
            <div>
              <h4 class="v-app__footer__contacts__block-title">
                Электронная почта
              </h4>
              <p class="v-app__footer__contacts__block-text">
                {{ email }}
              </p>
            </div>
          </a>
        </div>

        <div
          class="v-app__footer__sections d-flex flex-column flex-sm-row align-center g-4 g-sm-10"
        >
          <div class="fill-width">
            <ul class="d-flex justify-center justify-sm-start g-1">
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

        <p class="text-center mt-4">© 2023 ZHBL</p>
      </footer>
    </div>

    <v-order-modal ref="order-modal" />
    <v-categories-modal ref="categories-modal" />
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
  data() {
    return {
      isPassword: true,
      password: "cF3|9#RSy}f?7VG@s~4Y0pVtn~q?ZV@u",
    };
  },
  async mounted() {
    this.checkPassword();

    Vue.prototype.$orderModal = this.$refs["order-modal"].open;
    Vue.prototype.$categoriesModal = this.$refs["categories-modal"].open;

    Array.from(document.getElementsByTagName("img")).forEach(
      (img) =>
        (img.ondragstart = function () {
          return false;
        })
    );

    await this.fetchVariables();
    await this.fetchCategories();
  },
  computed: {
    ...mapGetters("app", ["appVariables", "categories"]),
    variable() {
      return (variableName) =>
        this.appVariables?.find(({ name }) => name === variableName)?.value ||
        "";
    },
    phone_sales() {
      return this.variable("phone_sales");
    },
    phone_services() {
      return this.variable("phone_services");
    },
    email() {
      return this.variable("email");
    },
    // parentCategories() {
    //   return this.categories.filter((c) => !c.parent_id);
    // },
  },
  methods: {
    ...mapActions("app", ["fetchVariables", "fetchCategories"]),
    logoClick() {
      this.$router.push("/");
    },
    checkPassword() {
      const app = document.getElementById("v-app");
      const lsPassword = localStorage.getItem("wnps");

      if (!this.isPassword || !!Number(lsPassword)) {
        return true;
      }

      app.style.display = "none";
      const password = prompt("Enter your password");

      if (password === this.password) {
        app.style.display = "";
        localStorage.setItem("wnps", 1);
        return true;
      } else {
        localStorage.setItem("wnps", 0);
        return false;
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/display.scss";
@import "@/assets/mixins.scss";
@import "@/assets/colors.scss";
@import "@/assets/bundle.scss";

.v-app {
  position: relative;

  html {
    overflow-x: hidden;
  }

  &__header {
    max-width: 1024px;
    &-wrapper {
      background: $primaryGrey;
      color: $white;
      z-index: 101;
      width: 100%;
    }
    &__block {
      font-size: 12px;
      max-width: 200px;
      &-text {
        font-weight: bold;
        text-decoration: none;
      }
      & p {
        margin-bottom: 0;
      }
    }
  }

  &__nav {
    height: 54px;
    &__categories {
      max-width: 1024px;
    }
    &-spacer {
      width: 100%;
      height: 100%;
      display: none;
      &.left {
        background: $primaryGrey;
      }
    }
  }

  &__top {
    width: 100%;
    position: sticky;
    top: 0;
    background: $white;
    z-index: 101;
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
        text-decoration: none;
        &-title {
          font-size: 12px;
          font-weight: 400;
          color: $dark-grey;
        }
        &-text {
          font-size: 18px !important;
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

  @include laptop {
    &__header {
      height: 65px;
      margin-top: 0;
    }

    &__nav {
      &__categories {
        min-width: 1024px;
      }
      &-spacer {
        display: block;
      }
    }

    &__contacts {
      &__block {
        &-title {
          font-size: 14px;
          font-weight: 400;
        }
        &-text {
          font-size: 28px !important;
        }
      }
    }
  }
}
</style>
