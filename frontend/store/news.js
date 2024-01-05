export const state = () => ({
  news: [],
  newsItem: null,
});

export const mutations = {
  setNews(state, news) {
    state.news = news;
  },
  setNewsItem(state, newsItem) {
    state.newsItem = newsItem;
  },
};

export const actions = {
  async fetchNews({ commit }) {
    const news = await this.$axios.$get("/news");
    commit("setNews", news);
  },

  async fetchNewsItem({ commit }, url) {
    const newsItem = await this.$axios.$get(`/news/${url}`);
    if (newsItem) commit("setNewsItem", newsItem);
  },
};

export const getters = {
  news: (s) => s.news,
  newsItem: (s) => s.newsItem,
};
