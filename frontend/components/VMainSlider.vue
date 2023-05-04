<template>
  <div>
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "VMainSlider",
  computed: {
    ...mapGetters("app", ["slider"]),
  },
};
</script>
