<template>
  <section
    class="v-categories-modal pt-8"
    :class="{ 'v-categories-modal--active': active }"
  >
    <span class="v-categories-modal__close text--white" @click="close"
      >&#10006;</span
    >

    <div class="fill-height d-flex flex-column justify-space-between">
      <div>
        <v-categories-list expanded-links @link-click="close" />
        <v-tabs-list class="mt-1" expanded-links @link-click="close" />
      </div>

      <div class="d-flex flex-column align-center g-2 mb-4">
        <img width="140" src="@/static/logo.png" alt="logo" />
      </div>
    </div>
  </section>
</template>

<script>
import EventBus from "@/plugins/EventBus.js";
import VCategoriesList from "./VCategoriesList";

export default {
  name: "VCategoriesModal",
  components: { VCategoriesList },
  data: () => ({
    active: false,
  }),
  methods: {
    open() {
      this.active = true;
    },
    close() {
      this.active = false;
      EventBus.$emit("categories-modal-close");
    },
  },
};
</script>

<style lang="scss">
.v-categories-modal {
  width: 100%;
  height: 100vh;
  background: $primaryGrey;
  position: fixed;
  top: 0;
  left: 0;
  display: none !important;
  z-index: 10000;
  overflow-y: none;

  &--active {
    display: block !important;
  }

  &__close {
    position: absolute;
    cursor: pointer;
    top: 10px;
    right: 12px;
  }
}
</style>
