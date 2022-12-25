export const state = () => ({
  items: [],
  itemDetails: null,
});

export const mutations = {
  setItems(state, items) {
    state.items = items;
  },
  setItemDetails(state, item) {
    state.itemDetails = item;
  },
};

export const actions = {
  async fetchItems({ commit }, { url }) {
    const items = await this.$axios.$get("/items/" + url);
    commit("setItems", items);
  },
  async fetchItemDetails({ commit }, { id }) {
    const item = await this.$axios.$get("/item/" + id);
    commit("setItemDetails", item);
  },
};

export const getters = {
  items: (s) => s.items,
  itemDetails: (s) => s.itemDetails,
};
