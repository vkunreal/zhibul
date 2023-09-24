const { request } = require('../db/database')
const { replaceQuotes } = require('../utils/quotes')
const { writeLog } = require('../writeLog')

class PagesServices {
  // get all pages
  async getPages() {
    return await request('SELECT * FROM pages')
  }

  // get page by url
  async getPageByUrl(url) {
    return await request(
      `SELECT * FROM pages WHERE url = "${url}"`,
      (res) => res[0][0] || null
    )
  }

  // get page images
  async getPageImages(url) {
    return await request(
      `SELECT src FROM page_images WHERE page_url = "${url}"`
    )
  }

  // add new page
  async addPage(
    url,
    name,
    text = '',
    seo_title = '',
    seo_description = '',
    seo_keywords = ''
  ) {
    return await request(`
      INSERT INTO pages (url, name, text, seo_title, seo_description, seo_keywords)
      VALUES ("${url}", "${replaceQuotes(name)}", "${replaceQuotes(
      text
    )}", "${replaceQuotes(seo_title)}", "${replaceQuotes(
      seo_description
    )}", "${replaceQuotes(seo_keywords)}")
    `).then(() => {
      writeLog('Added new page')
      return { status: true }
    })
  }

  // changePage
  async changePage(
    url,
    name = '',
    text = '',
    seo_title = '',
    seo_description = '',
    seo_keywords = ''
  ) {
    const updatePageField = async (field, value) =>
      await request(
        `UPDATE pages SET ${field} = "${value}" WHERE url = "${url}"`
      )

    updatePageField('name', replaceQuotes(name))
    updatePageField('text', replaceQuotes(text))
    updatePageField('seo_title', replaceQuotes(seo_title))
    updatePageField('seo_description', replaceQuotes(seo_description))
    updatePageField('seo_keywords', replaceQuotes(seo_keywords))

    writeLog('Page was changed')
    return { status: true }
  }

  // delete page
  async deletePage(url) {
    await request(`DELETE FROM pages WHERE url = "${url}"`)
    await request(`DELETE FROM page_images WHERE page_url = "${url}"`)
    writeLog('Deleted page')
  }

  // delete page image
  async deleteImageInDB(imageSrc) {
    await request(`DELETE FROM page_images WHERE src = "${imageSrc}"`)
    writeLog('Deleted page image')
  }
}

module.exports = new PagesServices()
