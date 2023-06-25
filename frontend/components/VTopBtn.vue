<template>
  <div>
    <transition name="fade">
      <button
        class="v-top-btn justify-center align-center"
        v-if="scroll"
        @click="toTop"
      >
        <svg width="42" height="42">
          <use xlink:href="@/static/icons.svg#arrow" />
        </svg>
      </button>
    </transition>
  </div>
</template>

<script>
export default {
  name: "VTopBtn",
  data() {
    return {
      scrollValue: 0,
    };
  },
  mounted() {
    document.addEventListener("scroll", this.checkScroll);
    this.checkScroll();
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.checkScroll);
  },
  computed: {
    scroll() {
      return this.scrollValue > 1000;
    },
  },
  methods: {
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    checkScroll() {
      this.scrollValue =
        window.pageYOffset !== undefined
          ? window.pageYOffset
          : (
              document.documentElement ||
              document.body.parentNode ||
              document.body
            ).scrollTop;
    },
  },
};
</script>

<style lang="scss">
.v-top-btn {
  width: 64px;
  height: 64px;
  background: $light-grey;
  position: fixed;
  bottom: 64px;
  left: 64px;
  border-radius: 50%;
  z-index: 550;
  transition: 0.3s ease;

  svg {
    color: $primaryGrey;
  }

  &:hover {
    background: $secondaryGrey;

    svg {
      color: $white;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
