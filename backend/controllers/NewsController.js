const NewsServices = require('../services/NewsServices')
const { writeLog } = require('../writeLog')

class NewsController {
  async getNews(req, res) {
    const news = await NewsServices.getAllNews()

    for (let i = 0; i < news.length; i++) {
      const media = await NewsServices.getNewsMediaById(news[i].id)
      news[i].media = media.sort((a, b) => (a.position > b.position ? 1 : -1))
    }

    res.status(200).json(news)
  }

  async getNewsItem(req, res) {
    const newsItem = await NewsServices.getNewsItemFromId(req.params.id)

    const media = await NewsServices.getNewsMediaById(newsItem.id)
    newsItem.media = media.sort((a, b) => (a.position > b.position ? 1 : -1))

    res.status(200).json(newsItem)
  }

  async addNewsItem(req, res) {
    try {
      const {
        url,
        title,
        text,
        short_text,
        seo_title,
        seo_description,
        seo_keywords,
      } = req.body

      await NewsServices.addNewsItem(
        url,
        title,
        text,
        short_text,
        seo_title,
        seo_description,
        seo_keywords
      )

      res.status(201).json({ status: true })
    } catch (e) {
      writeLog('AddNewsItem: ', e)
      res.status(500).json({ status: false })
    }
  }

  async changeNewsItem(req, res) {
    try {
      const {
        url,
        title,
        text,
        short_text,
        seo_title,
        seo_description,
        seo_keywords,
      } = req.body

      await NewsServices.changeNewsItem(
        url,
        title,
        text,
        short_text,
        seo_title,
        seo_description,
        seo_keywords
      )

      res.status(201).json({ status: true })
    } catch (e) {
      writeLog('changeNewsItem: ', e)
      res.status(500).json({ status: false })
    }
  }

  async deleteNewsItem(req, res) {
    try {
      const { id } = req.body

      await NewsServices.deleteNewsItem(id)

      res.status(200).json({ status: false })
    } catch (e) {
      writeLog('changeNewsItem: ', e)
      res.status(500).json({ status: false })
    }
  }

  async addNewsMedia(req, res) {
    try {
      const { news_id } = req.params
      if (!req.files) {
        return res.status(400).json({ status: false })
      }
      const files = Object.values(req.files)
      const urls = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (!file) {
          return res.status(500).json({ status: false })
        }
        const mediaName = `news-media-${news_id}-${
          Date.now() + Math.round(Math.random() * 100000)
        }.${file.name.split('.').pop().toLowerCase()}`
        const mediaPath = path.resolve(
          __dirname,
          '..',
          'public',
          'images',
          mediaName
        )
        const mediaUrl = 'https://api.zhbl.by/images/' + imageName
        urls.push(mediaUrl)
        await file.mv(mediaPath, async (err) => {
          if (err) {
            writeLog('addNewsMedia: ', e)
            return res.status(500).send(err)
          }
          await NewsServices.addNewsMedia(news_id, mediaUrl)
        })
      }

      res.status(200).json({ status: true })
    } catch (e) {
      writeLog('addNewsMedia: ', e)
      res.status(500).json({ status: false })
    }
  }

  async deleteNewsImage(req, res) {
    try {
      const mediaName = req.body.src.split('/').pop()
      const mediaPath = path.resolve(
        __dirname,
        '..',
        'public',
        'images',
        mediaName
      )

      if (!fs.existsSync(mediaPath)) {
        return res.status(400).json({ status: false })
      }

      fs.unlink(mediaPath, async (err) => {
        if (err) {
          res.status(500).json({ status: false })
          console.log(err)
        }
        await NewsServices.deleteNewsMedia(
          'https://api.zhbl.by/images/' + mediaName
        )
      })

      res.status(200).json({ status: true })
    } catch (e) {
      writeLog('deleteNewsImage: ', e)
      res.status(500).json({ status: false })
    }
  }
}

module.exports = new NewsController()
