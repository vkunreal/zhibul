<template>
  <section class="v-tabs-list pd-1 pt-0">
    <ul class="d-flex flex-column g-1">
      <li v-for="{ title, url, tabs } in tabs" :key="url">
        <div
          class="v-tabs-list__item d-flex justify-space-between align-center pd-1"
          :class="{ 'v-tabs-list__item--active': url === selectedTab }"
        >
          <div class="d-flex align-center g-1 mr-4">
            <nuxt-link v-if="url" :to="url" @click.native="linkClick">
              <span>
                <svg class="v-tabs-list__item-arrow" width="12" height="12">
                  <use xlink:href="@/static/icons.svg#slider-arrow" />
                </svg>
                {{ title }}
              </span>
            </nuxt-link>
            <span v-else class="text--white cursor-default">
              <svg class="v-tabs-list__item-arrow" width="12" height="12">
                <use xlink:href="@/static/icons.svg#slider-arrow" />
              </svg>
              {{ title }}
            </span>
          </div>

          <p
            v-if="expandedLinks && tabs?.length"
            class="v-tabs-list__more text--white text-uppercase"
            @click="selectTab(url)"
          >
            <template v-if="selectedTab === url">Свернуть</template>
            <template v-else>Развернуть</template>
          </p>
        </div>

        <ul
          v-if="tabs?.length && selectedTab === url"
          class="d-flex flex-column g-1 ml-4 mt-2 mb-2"
        >
          <li
            class="d-flex align-center g-1"
            v-for="{ title, url } in tabs"
            :key="url"
          >
            <nuxt-link :to="url" @click.native="linkClick">
              <span>
                <svg width="12" height="12">
                  <use xlink:href="@/static/icons.svg#slider-arrow" />
                </svg>
                {{ title }}
              </span>
            </nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script>
import EventBus from "@/plugins/EventBus.js";

const tabs = [
  { title: "О компании", url: "/" },
  {
    title: "Доставка",
    url: "/delivery",
  },
  {
    title: "Услуги",
    url: "",
    tabs: [
      { title: "Ремонт пневмоинструмента", url: "/remont_pnevmoinstrymenta" },
      { title: "Аренда автоприцепов", url: "/arenda_prizepa" },
    ],
  },
  //  { title: "Новости", url: "/news" },
  { title: "Контакты", url: "/contacts" },
];

export default {
  name: "VTabsList",
  props: {
    expandedLinks: Boolean,
  },
  data: () => ({
    selectedTab: null,
  }),
  mounted() {
    EventBus.$on("category-selected", this.categorySelected);
  },
  destroyed() {
    EventBus.$off("category-selected");
  },
  computed: {
    tabs() {
      return tabs;
    },
  },
  methods: {
    linkClick() {
      this.$emit("link-click");
    },
    selectTab(url) {
      if (this.selectedTab === url) {
        this.selectedTab = null;
      } else {
        this.selectedTab = url;
        EventBus.$emit("selected-tab");
      }
    },
    categorySelected() {
      this.selectedTab = null;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/mixins.scss";

.v-tabs-list {
  a {
    color: $white;
    text-decoration: none;
    &.nuxt-link-exact-active,
    &.nuxt-link-exact-active svg {
      color: $colorPrimary;
    }
  }
  p {
    margin-bottom: 0;
  }
  svg {
    color: $white;
  }
  ul {
    padding-left: 0;
    li {
      list-style: none;
    }
  }

  &__item {
    &--active {
      .v-tabs-list__item {
        background: $colorGrey;
        border-radius: 10px;

        &-arrow {
          transform: rotate(90deg);
        }
      }
    }
    &-arrow {
      transition: 0.3s ease;
    }
  }

  &__more {
    cursor: pointer;
    user-select: none;
    font-size: 12px;
  }

  @include tablet {
    &__more {
      font-size: 14px;
    }
  }
}
</style>
