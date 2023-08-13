<template>
  <section class="v-categories-list d-flex g-2 pd-1">
    <ul class="d-flex fill-width flex-column g-1 pr-md-8">
      <li v-for="{ id, name, url, is_contains } in categoriesList()" :key="id">
        <template v-if="expandedLinks">
          <!-- link -->
          <div
            class="v-categories-list__item d-flex justify-space-between align-center pd-1"
            :class="{
              'v-categories-list__item--active': id === categoryDetail,
            }"
          >
            <!-- link title -->
            <div class="d-flex align-center g-1 mr-4">
              <nuxt-link :to="'/menu/' + url" @click.native="linkClick">
                <span
                  ><svg
                    class="v-categories-list__item-arrow"
                    width="12"
                    height="12"
                  >
                    <use xlink:href="@/static/icons.svg#slider-arrow" />
                  </svg>
                  {{ name }}
                </span>
              </nuxt-link>
            </div>
            <!-- link title -->

            <!-- more -->
            <p
              v-if="expandedLinks && is_contains"
              class="v-categories-list__more text--white text-uppercase"
              @click="selectCategory(id)"
            >
              <template v-if="id === categoryDetail">Свернуть</template>
              <template v-else>Развернуть</template>
            </p>
            <!-- more -->
          </div>
          <!-- link -->

          <!-- link details -->
          <ul
            v-if="id === categoryDetail"
            class="d-flex flex-column g-1 ml-4 mt-2 mb-2"
          >
            <li
              class="d-flex flex-column g-1"
              v-for="{ id, name, url, is_contains } in categoriesList(
                categoryDetail
              )"
              :key="id"
            >
              <div
                class="fill-width d-flex align-center justify-space-between mr-2 g-1"
              >
                <nuxt-link :to="'/menu/' + url" @click.native="linkClick">
                  <span
                    ><svg
                      class="v-categories-list__arrow"
                      :class="{
                        'v-categories-list__arrow--active':
                          id === categoryDetailSecond,
                      }"
                      width="12"
                      height="12"
                    >
                      <use xlink:href="@/static/icons.svg#slider-arrow" />
                    </svg>
                    {{ name }}
                  </span>
                </nuxt-link>
                <span
                  v-if="is_contains"
                  class="v-categories-list__more text--white text-uppercase"
                  @click="selectDetailCategory(id)"
                >
                  <template v-if="id === categoryDetailSecond"
                    >Свернуть</template
                  >
                  <template v-else>Развернуть</template>
                </span>
              </div>

              <ul
                class="d-flex flex-column g-1 ml-4 mt-2 mb-2"
                v-if="categoryDetailSecond && categoryDetailSecond === id"
              >
                <li
                  class="d-flex align-center g-1"
                  v-for="{ id, name, url } in categoriesList(
                    categoryDetailSecond
                  )"
                  :key="id"
                >
                  <nuxt-link :to="'/menu/' + url" @click.native="linkClick">
                    <span
                      ><svg width="12" height="12">
                        <use xlink:href="@/static/icons.svg#slider-arrow" />
                      </svg>
                      {{ name }}
                    </span>
                  </nuxt-link>
                </li>
              </ul>
            </li>
          </ul>
          <!-- link details -->
        </template>

        <template v-else>
          <div class="d-flex align-center g-1">
            <nuxt-link
              :to="'/menu/' + url"
              @click.native="linkClick"
              @mouseover.native="categoryDetail = id"
            >
              <span>
                <svg width="12" height="12">
                  <use xlink:href="@/static/icons.svg#slider-arrow" />
                </svg>
                {{ name }}
              </span>
            </nuxt-link>
          </div>
        </template>
      </li>
    </ul>

    <ul
      v-if="
        !expandedLinks &&
        categoryDetail &&
        categoriesList(categoryDetail).length
      "
      class="d-flex flex-column g-1 pr-md-8"
    >
      <li
        class="v-categories-list__nesting d-flex align-center g-1"
        style="width: max-content"
        v-for="{ id, name, url } in categoriesList(categoryDetail)"
        :key="id"
      >
        <nuxt-link
          :to="'/menu/' + url"
          @click.native="linkClick"
          @mouseover.native="categoryDetailSecond = id"
        >
          <span>
            <svg width="12" height="12">
              <use xlink:href="@/static/icons.svg#slider-arrow" />
            </svg>
            {{ name }}
          </span>
        </nuxt-link>
      </li>
    </ul>

    <ul
      v-if="
        !expandedLinks &&
        categoryDetailSecond &&
        categoriesList(categoryDetailSecond).length
      "
      class="d-flex flex-column g-1"
    >
      <li
        class="v-categories-list__nesting d-flex align-center g-1"
        style="width: max-content"
        v-for="{ id, name, url } in categoriesList(categoryDetailSecond)"
        :key="id"
      >
        <nuxt-link :to="'/menu/' + url" @click.native="linkClick">
          <span>
            <svg width="12" height="12">
              <use xlink:href="@/static/icons.svg#slider-arrow" />
            </svg>
            {{ name }}
          </span>
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import EventBus from "@/plugins/EventBus.js";

export default {
  name: "VCategoriesList",
  props: {
    expandedLinks: Boolean,
  },
  data: () => ({
    categoryDetail: null,
    categoryDetailSecond: null,
  }),
  mounted() {
    EventBus.$on("selected-tab", this.tabSelected);
  },
  destroyed() {
    EventBus.$off("selected-tab");
  },
  watch: {
    categoryDetail() {
      this.categoryDetailSecond = null;
    },
  },
  computed: {
    ...mapGetters("app", ["categories"]),
    categoriesList() {
      return (parentId = null) =>
        this.categories
          .filter((c) => c.parent_id === parentId && !!c.active)
          .sort((a, b) => (a.position < b.position ? -1 : 1)) || {};
    },
  },
  methods: {
    linkClick() {
      this.$emit("link-click");
    },
    selectCategory(id) {
      if (this.categoryDetail === id) {
        this.categoryDetail = null;
      } else {
        this.categoryDetail = id;
        EventBus.$emit("category-selected");
      }
    },
    selectDetailCategory(id) {
      if (this.categoryDetailSecond === id) {
        this.categoryDetailSecond = null;
      } else {
        this.categoryDetailSecond = id;
      }
    },
    tabSelected() {
      console.log("selected tab");
      this.categoryDetail = null;
      console.log(this.categoryDetail);
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/mixins.scss";

.v-categories-list {
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
      .v-categories-list__item {
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

  &__arrow {
    transition: 0.3s ease;
    &--active {
      transform: rotate(90deg);
    }
  }

  @include tablet {
    &__more {
      font-size: 14px;
    }
  }

  @include laptop {
    &__nesting {
      min-width: 150px;
      width: 100%;
    }
  }
}
</style>
