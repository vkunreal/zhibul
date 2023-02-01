export const state = () => ({
  items: [],
  itemDetails: null,
  itemOptions: null,
});

export const mutations = {
  setItems(state, items) {
    state.items = items;
  },
  setItemDetails(state, item) {
    state.itemDetails = item;
  },
  setItemOptions(state, options) {
    state.itemOptions = options;
  },
};

export const actions = {
  async fetchItems({ commit }, { url }) {
    const items = await this.$axios.$get("/items/" + url);
    commit("setItems", items);
  },
  async fetchItemDetails({ commit, dispatch }, { id }) {
    const item = await this.$axios.$get("/item/" + id);
    await dispatch("fetchItemOptions", item?.id);
    commit("setItemDetails", item);
  },
  async fetchItemOptions({ commit }, item_id) {
    const options = await this.$axios.$get("/options/" + item_id);
    commit("setItemOptions", options);
  },
};

export const getters = {
  items: (s) => s.items,
  itemDetails: (s) => s.itemDetails,
  itemOptions: (s) => s.itemOptions,
};
