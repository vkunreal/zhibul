const axios = require("axios");
const https = require("https");

const sitemapRequests = async () => {
  // disable ssl
  axios.defaults.httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  // categories
  const categories = await axios
    .get("https://api.zhbl.by/api/categories")
    .then((res) => res.data);

  // items
  const items = await axios
    .get("https://api.zhbl.by/api/items")
    .then((res) => res.data);

  // trailers
  const trailers = await axios
    .get("https://api.zhbl.by/api/trailers-rent")
    .then((res) => res.data);

  let urls = [];

  // categories urls
  urls = [...categories.map((c) => `/menu/${c.url}`)];

  // items urls
  urls = [...urls, ...items.map((it) => `/menu/${it.category_url}/${it.url}`)];

  // prizepi urls
  urls = [...urls, ...trailers.map((tr) => `/arenda_prizepa/${tr.url}`)];

  return urls;
};

export default sitemapRequests;
