<template>
  <v-dialog v-model="visible" width="600">
    <v-card>
      <v-card-title class="d-flex justify-center"
        >Закажите обратный звонок</v-card-title
      >
      <v-card-text class="text-center">
        <p>Заполните форму и наш специалист перезвонит вам</p>

        <v-text-field v-model="name" class="fill-width mt-2" label="Имя" />

        <v-text-field
          v-model="phone"
          class="fill-width"
          label="Телефон"
          v-mask="phoneMask"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          large
          class="fill-width bg--primary mb-2"
          :disabled="submitDisabled"
          @click="submit"
          >Отправить</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "VOrderModal",
  data() {
    return {
      visible: false,
      callback: null,
      name: "",
      phone: "",
      phoneMask: "+375 (##) ###-##-##",
    };
  },
  computed: {
    submitDisabled() {
      return !this.name.trim() || this.phone.length < 19;
    },
  },
  methods: {
    open(callback = null) {
      this.visible = true;
      this.callback = callback;
    },
    submit() {
      this.visible = false;
    },
  },
};
</script>
