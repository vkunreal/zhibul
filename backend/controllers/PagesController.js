const PagesServices = require('../services/PagesServices')
const { writeLog } = require('../writeLog')

class PagesController {
  // get all pages
  async getPages(req, res) {
    const pages = await PagesServices.getPages()

    return res.status(200).json(pages)
  }

  // get page by url
  async getPageByUrl(req, res) {
    const url = req.params.url
    const page = await PagesServices.getPageByUrl(url)

    return res.status(200).json(page)
  }

  // get page images
  async getPageImages(req, res) {
    const url = req.params.url
    const images = await PagesServices.getPageImages(url)

    return res.status(200).json(images)
  }

  // add new page
  async addPage(req, res) {
    const { url, name, text, seo_title, seo_description, seo_keywords } =
      req.body

    if (!url.trim()) {
      writeLog('addPage: url is not defined')
      return res.status(400).json({ status: false })
    } else if (!name.trim()) {
      writeLog('addPage: name is not defined')
      return res.status(400).json({ status: false })
    }

    await PagesServices.addPage(
      url,
      name,
      text,
      seo_title,
      seo_description,
      seo_keywords
    )

    return res.status(200).json({ status: true })
  }

  // change page
  async changePage(req, res) {
    const { url, name, text, seo_title, seo_description, seo_keywords } =
      req.body

    if (!url.trim()) {
      writeLog('changePage: url is not defined')
      return res.status(400).json({ status: false })
    } else if (!name.trim()) {
      writeLog('changePage: name is not defined')
      return res.status(400).json({ status: false })
    }

    await PagesServices.changePage(
      url,
      name,
      text,
      seo_title,
      seo_description,
      seo_keywords
    )

    return res.status(200).json({ status: true })
  }

  // delete page
  async deletePage(req, res) {
    const url = req.body.url

    if (!url.trim()) {
      writeLog('deletePage: url is not defined')
      return res.status(400).json({ status: false })
    }

    await PagesServices.deletePage(url)

    return res.status(200).json({ status: true })
  }

  // delete page image
  async deleteImage(req, res) {
    const src = req.body.src

    if (!src.trim()) {
      writeLog('deleteImage: src is not defined')
      return res.status(400).json({ status: false })
    }

    await PagesServices.deleteImageInDB(src)

    return res.status(200).json({ status: true })
  }
}

module.exports = new PagesController()
