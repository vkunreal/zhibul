<template>
  <section>
    <div class="breadcrumbs">
      <div class="breadcrumbs-wrapper">
        <p class="breadcrumbs__link">
          <nuxt-link class="mr-1" to="/">Главная</nuxt-link> /
        </p>
        <p class="breadcrumbs__link">
          <nuxt-link class="mr-1" to="">Аренда прицепа</nuxt-link>
        </p>
      </div>
    </div>

    <div class="trailers__wrapper d-flex justify-center mb-20">
      <div class="trailers__content pd-4">
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
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import VArendaIcon from "@/components/VArendaIcon";

export default {
  components: { VArendaIcon },
  async mounted() {
    await this.fetchTrailers();
  },
  computed: {
    ...mapGetters("trailers", ["trailers"]),
  },
  methods: {
    ...mapActions("trailers", ["fetchTrailers"]),
  },
};
</script>

<style lang="scss">
@import "@/assets/mixins.scss";

.trailers {
  &__wrapper {
    width: 100%;
  }
  &__content {
    max-width: 1024px;
  }
  &__trailer {
    h2 {
      font-size: 22px;
      text-transform: uppercase;
    }
    &-images {
      a {
        img {
          width: 100%;
        }
        transition: 0.3s;
        cursor: pointer;
        &:hover {
          transform: scale(1.1);
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
