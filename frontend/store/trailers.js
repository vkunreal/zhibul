export const state = () => ({
  trailers_rent: [],
  trailers: [],
});

export const mutations = {
  setTrailersRent(state, trailers_rent) {
    state.trailers_rent = trailers_rent;
  },
  setTrailers(state, trailers) {
    state.trailers = trailers;
  },
};

export const actions = {
  async fetchTrailersRent({ commit }) {
    const trailers_rent = await this.$axios.$get("/trailers-rent");
    commit("setTrailersRent", trailers_rent);
  },
  async fetchTrailers({ commit }) {
    const trailers = await this.$axios.$get("/trailers-union");
    commit("setTrailers", trailers);
  },
};

export const getters = {
  trailersRent: (s) => s.trailers_rent,
  trailers: (s) => s.trailers,
};
