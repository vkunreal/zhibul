<template>
  <div class="v-feed-back d-flex flex-column align-center">
    <h2 class="mt-2">Обратная связь</h2>
    <p class="mt-2 ml-2 mr-2 mb-2 text-center">
      Поделитесь мнением о нашей работе или задайте нам любой интересующий вас
      вопрос в поле комментарий
    </p>

    <div class="v-feed-back__devider fill-width" />

    <div class="fill-width pd-2">
      <v-text-field filled class="fill-width mt-2" label="Имя" />

      <v-text-field filled class="fill-width" label="Компания" />

      <v-text-field
        filled
        class="fill-width"
        label="Телефон"
        v-mask="'+7 (###) ###-##-##'"
      />

      <v-text-field filled class="fill-width" label="E-mail" />

      <v-textarea filled class="fill-width" label="Комментарий" />

      <v-btn class="v-feed-back__submit fill-width">Отправить</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "VFeedBack",
};
</script>

<style lang="scss">
.v-feed-back {
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  & .v-input {
    margin-top: -10px;
    &:first-child {
      margin-top: 0px !important;
    }
  }
  &__devider {
    height: 1px;
    background: $light-grey;
  }
  &__submit {
    background: $primaryGrey !important;
    color: $white !important;
    padding: 24px 0 !important;
    text-transform: unset !important;
  }
}
</style>
