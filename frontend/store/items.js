export const state = () => ({
  items: [],
});

export const mutations = {
  setItems(state, items) {
    state.items = items;
  },
};

export const actions = {
  async fetchItems({ commit }) {
    const items = await this.$axios.$get("/items");
    commit("setItems", items);
  },
};

export const getters = {
  items: (s) => s.items,
};
