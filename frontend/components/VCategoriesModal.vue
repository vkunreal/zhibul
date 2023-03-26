<template>
  <section
    class="v-categories-modal"
    :class="{ 'v-categories-modal--active': active }"
  >
    Modal
    <span @click="close">CLOSE</span>
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
}
</style>
