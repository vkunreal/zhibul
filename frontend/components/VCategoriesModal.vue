<template>
  <section
    class="v-categories-modal pt-8"
    :class="{ 'v-categories-modal--active': active }"
  >
    <span class="v-categories-modal__close text--white" @click="close"
      >&#10006;</span
    >

    <div
      class="v-categories-modal__scrollbar fill-height d-flex flex-column justify-space-between"
    >
      <div>
        <v-categories-list expanded-links @link-click="close" />
        <v-tabs-list class="mt-1" expanded-links @link-click="close" />
      </div>

      <div class="d-flex flex-column align-center g-2 pb-4">
        <img width="140" src="@/static/logo.png" alt="logo" />
      </div>
    </div>
  </section>
</template>

<script>
import EventBus from "@/plugins/EventBus.js";

export default {
  name: "VCategoriesModal",
  data: () => ({
    active: false,
  }),
  methods: {
    open() {
      this.active = true;
      document.querySelector("html").style.overflow = "hidden";
    },
    close() {
      this.active = false;
      document.querySelector("html").style.overflow = "unset";
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
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: $white;
  }

  &::-webkit-scrollbar-thumb {
    background: $colorGrey;
    border-radius: 20px;
    border-top: 1px solid $white;
    border-bottom: 1px solid $white;
  }

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
