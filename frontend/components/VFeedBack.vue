<template>
  <section class="v-feed-back fill-width d-flex justify-space-around g-8 pd-6">
    <div class="fill-width">
      <h2 class="mb-4">Есть вопросы или необходима консультация?</h2>
      <p>Заполните форму и наш специалист ответит на все возникшие вопросы!</p>
    </div>

    <div class="fill-width">
      <v-text-field v-model="name" class="fill-width mt-2" label="Имя *" />

      <v-text-field
        v-model="phone"
        class="fill-width"
        label="Телефон *"
        v-mask="phoneMask"
      />

      <v-text-field v-model="company" class="fill-width" label="Компания" />

      <v-text-field v-model="email" class="fill-width" label="E-mail" />

      <v-textarea v-model="comment" class="fill-width" label="Комментарий" />

      <v-btn
        large
        class="fill-width"
        color="white"
        :disabled="submitDisabled"
        @click="submit"
        >Отправить</v-btn
      >
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "VFeedBack",
  data: () => ({
    name: "",
    phone: "",
    company: "",
    email: "",
    comment: "",
    phoneMask: "+375 (##) ###-##-##",
  }),
  computed: {
    submitDisabled() {
      return !this.name.trim() || this.phone.length < 19;
    },
  },
  methods: {
    ...mapActions("app", ["sendFeedback"]),
    submit() {
      const { name, phone, company, email, comment, submitDisabled } = this;
      // if (!submitDisabled) return;

      this.sendFeedback({
        name,
        phone,
        company,
        email,
        comment,
        submitDisabled,
      }).then((res) => {
        console.log(res, "submited");
      });
    },
  },
};
</script>

<style lang="scss">
.v-feed-back {
  max-width: 900px;
  background: $colorPrimary;
  & .v-input {
    margin-top: -10px;
    &:first-child {
      margin-top: 0px !important;
    }
  }
}
</style>
