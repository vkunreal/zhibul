export const state = () => ({
  appVariables: [],
  categories: [],
  page: null,
  slider: null,
});

export const mutations = {
  setVariables(state, variables) {
    state.appVariables = variables;
  },
  setCategories(state, categories) {
    state.categories = categories;
  },
  setPage(state, page) {
    state.page = page;
  },
  setSlider(state, slider) {
    state.slider = slider;
  },
};

export const actions = {
  async fetchVariables({ commit }) {
    const variables = await this.$axios.$get("/variables");
    commit("setVariables", variables);
  },
  async fetchCategories({ commit }) {
    const categories = await this.$axios.$get("/categories");
    commit("setCategories", categories);
  },
  async fetchPage({ commit }, url = "") {
    if (!url || !url.trim()) {
      console.error("app: fetchPage url is not found");
      return;
    }
    const page = await this.$axios.$get("/pages/" + url);
    commit("setPage", page);
  },
  async sendFeedback(
    {},
    { name = "", phone = "", company = "", email = "", comment = "" } = {}
  ) {
    console.log({
      name,
      phone,
      company,
      email,
      comment,
    });
    if (!name.trim() || !phone.trim()) {
      console.error("App store sendFeedback: not found name or phone");
      return;
    }

    return await this.$axios.$post("/user", {
      name,
      phone,
      company,
      email,
      comment,
    });
  },
  async fetchSlider({ commit }) {
    const slider = await this.$axios.$get("/slider");
    commit("setSlider", slider);
  },
};

export const getters = {
  appVariables: (s) => s.appVariables,
  categories: (s) => s.categories,
  page: (s) => s.page,
  slider: (s) => s.slider,
};
