<template>
  <section class="trailers fill-width d-flex flex-column align-center">
    <div class="breadcrumbs">
      <div class="breadcrumbs-wrapper">
        <p class="breadcrumbs__link">
          <nuxt-link class="mr-1" to="/">Главная</nuxt-link> /
        </p>
        <p class="breadcrumbs__link">
          <nuxt-link class="mr-1" to="/arenda_prizepa"
            >Аренда прицепа</nuxt-link
          >
          /
        </p>
        <p class="breadcrumbs__link">Аренда прицепа</p>
      </div>
    </div>

    <div class="trailers__wrapper fill-width pd-2 pd-md-4">
      <div
        class="trailers__trailer mt-10"
        v-for="{ id, title, text, images, options } in trailers"
        :key="id"
      >
        <h2>{{ title }}</h2>

        <div class="home__devider mt-4 mb-8" />

        <p>{{ text }}</p>

        <div
          v-if="images"
          class="trailers__trailer-images d-flex flex-column flex-md-row g-2"
        >
          <a v-for="({ src }, i) in images" :href="src" :key="i">
            <img :src="src" :alt="'trailer-' + i" />
          </a>
        </div>

        <template v-if="options">
          <h2 class="text-center mt-15 mb-10">Характеристики</h2>

          <div
            class="d-flex flex-wrap justify-center justify-md-space-between g-4"
          >
            <div
              class="trailers__trailer-option d-flex align-center g-3 g-sm-6"
              v-for="{ id, icon, name, text } in options"
              :key="id"
            >
              <v-arenda-icon :icon="icon" />
              <span>
                <h5 class="text-uppercase mb-1">{{ name }}</h5>
                <p v-html="text" />
              </span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  async mounted() {
    const { url } = this.$route?.params;
  },
  computed: {
    ...mapGetters("trailers", ["trailers"]),
  },
  async fetch({ store, params }) {
    const url = params?.url;
    await store.dispatch("trailers/fetchTrailers", url);
  },
};
</script>

<style lang="scss">
@import "@/assets/mixins.scss";
.trailers {
  &__wrapper {
    max-width: 1024px;
  }
  &__trailer {
    h2 {
      font-size: 22px;
      text-transform: uppercase;
      text-align: center;
    }
    &.call-btn {
      background: $colorThird;
      color: $primaryGrey;
    }
    &-images {
      a {
        img {
          width: 100%;
        }
        transition: 0.3s;
        cursor: pointer;
        &:hover {
          transform: scale(1.12);
        }
      }
    }
    &-option {
      max-width: 300px;
      width: 100%;
      h5 {
        font-size: 14px;
        line-height: 1.4;
        font-weight: 800;
      }
      p {
        font-size: 14px;
      }
    }
  }
  @include laptop {
    &__trailer {
      h2 {
        font-size: 30px;
        text-transform: uppercase;
      }
      &-option {
        max-width: 380px;
        h5 {
          font-size: 17px;
        }
        p {
          font-size: 15px;
        }
      }
    }
  }
}
</style>
