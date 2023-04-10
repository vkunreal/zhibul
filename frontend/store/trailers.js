export const state = () => ({
  trailers: [],
});

export const mutations = {
  setTrailers(state, trailers) {
    state.trailers = trailers;
  },
};

export const actions = {
  async fetchTrailers({ commit }) {
    const trailers = await this.$axios.$get("/trailers-union");
    commit("setTrailers", trailers);
  },
};

export const getters = {
  trailers: (s) => s.trailers,
};
