<template>
  <v-app>
    <div class="v-app__header-wrapper d-flex justify-center pd-1">
      <header
        class="
          v-app__header
          fill-width
          d-flex
          justify-space-around
          align-center
        "
      >
        <div class="pointer">
          <img width="140" src="@/static/logo.png" alt="logo" />
        </div>

        <div class="v-app__header__block d-flex flex-column">
          <p class="text-uppercase">Телефон</p>
          <p class="v-app__header__block-text">+375 (29) 741-52-26</p>
        </div>

        <div class="v-app__header__block d-flex flex-column">
          <p class="text-uppercase">E-mail</p>
          <p class="v-app__header__block-text">zhibul.maksim@yandex.ru</p>
        </div>

        <v-btn color="yellow" large>Заказать звонок</v-btn>
      </header>
    </div>

    <nav class="d-flex justify-space-between"></nav>

    <main class="fill-height">
      <nuxt />
    </main>

    <div class="v-app__footer-wrapper d-flex justify-center pd-2">
      <footer class="v-app__footer fill-width">
        <div class="d-flex justify-space-between">
          <div class="fill-width d-flex flex-column g-1">
            <h3 class="mb-1">Контакты</h3>

            <p>Продажи: +375 (29) 741-52-26</p>
            <p>Услуги: +375 (44) 758-16-43</p>
            <p>Email: zhibul.maksim@yandex.ru</p>
          </div>

          <div class="d-flex g-10">
            <div class="d-flex flex-column g-1">
              <h3 class="mb-1">Каталог</h3>

              <p>Пневмоинструмент</p>
              <p>Крепеж</p>
              <p>Компрессоры</p>
              <p>Комплектующие и расходные материалы</p>
            </div>

            <div class="d-flex flex-column g-1">
              <h3 class="mb-1">Услуги</h3>

              <p>Ремонт пневмоинструмента</p>
              <p>Аренда прицепов</p>
            </div>
          </div>
        </div>

        <p class="text-center mt-10">© 2022 ZHBL</p>
      </footer>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data: () => ({}),
};
</script>

<style lang="scss">
@import "@/assets/display.scss";
@import "@/assets/mixins.scss";
@import "@/assets/variables.scss";
@import "@/assets/colors.scss";

.v-app {
  &__header {
    max-width: 1024px;
    &-wrapper {
      background: $primaryGrey;
      color: $white;
    }
    &__block {
      font-size: 12px;
      &-text {
        font-weight: bold;
      }
      & p {
        margin-bottom: 0;
      }
    }
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
  }
}
</style>