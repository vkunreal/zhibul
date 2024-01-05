const { request } = require('../db/database')
const { replaceQuotes } = require('../utils/quotes')

class NewsServices {
  async getAllNews() {
    return await request('SELECT * FROM news')
  }

  async getNewsItemFromId(id) {
    return await request(
      `SELECT * FROM news WHERE id = "${id}"`,
      (res) => res[0][0]
    )
  }

  async getNewsItemFromUrl(url) {
    return await request(
      `SELECT * FROM news WHERE url = "${url}"`,
      (r) => r[0][0]
    )
  }

  async getNewsMediaById(id) {
    return await request(`SELECT * FROM news_media WHERE news_id = "${id}"`)
  }

  async addNewsItem(
    url,
    title,
    text,
    short_text,
    seo_title,
    seo_description,
    seo_keywords
  ) {
    const date = new Date().getTime()

    await request(`
      INSERT INTO news (url, title, text, short_text, date, seo_title, seo_description, seo_keywords)
      VALUES
      ("${url}", "${title}", "${text}", "${short_text}", "${date}", "${seo_title}", "${seo_description}", "${seo_keywords}");
    `)
  }

  async changeNewsItem(
    url,
    title,
    text,
    short_text,
    seo_title,
    seo_description,
    seo_keywords
  ) {
    const updateNewsField = async (field, value) =>
      await request(
        `UPDATE news SET ${field} = "${value}" WHERE url = "${url}"`
      )

    updateNewsField('title', replaceQuotes(title))
    updateNewsField('text', replaceQuotes(text))
    updateNewsField('short_text', replaceQuotes(short_text))
    updateNewsField('seo_title', replaceQuotes(seo_title))
    updateNewsField('seo_description', replaceQuotes(seo_description))
    updateNewsField('seo_keywords', replaceQuotes(seo_keywords))
  }

  async deleteNewsItem(id) {
    await request(`DELETE FROM news WHERE id = "${id}"`)
  }

  // media

  async getNewsItemMedia(id) {
    return await request(`SELECT * FROM news WHERE id = "${id}"`)
  }

  async addNewsMedia(news_id, src, position = 0) {
    await request(`
      INSERT INTO news_media (news_id, src, position)
      VALUES
      ("${news_id}", "${src}", "${position}");
    `)
  }

  async deleteNewsMedia(src) {
    await request(`DELETE FROM news_media WHERE src = "${src}"`)
  }

  // files

  async getFilesByNewsItem(news_id) {
    return await request(
      `SELECT * FROM news_files WHERE news_id = "${news_id}"`
    )
  }

  async addFileToNewsItem(news_id, src, title, icon) {
    await request(`
      INSERT INTO news_files (news_id, src, title, icon)
      VALUES
      ("${news_id}", "${src}", "${title}", "${icon}")`)
  }

  async deleteNewsItemFile(src) {
    await request(`DELETE FROM news_files WHERE src = "${src}"`)
  }
}

module.exports = new NewsServices()
