const TrailerServices = require('../services/TrailerServices')
const { writeLog } = require('../writeLog')

class TrailersController {
  async getTrailersUnion(req, res) {
    try {
      const trailers = Array.from(await TrailerServices.getTrailers())

      for (let i = 0; i < trailers.length; i++) {
        const options = await TrailerServices.getTrailerOptions(trailers[i].id)
        const images = await TrailerServices.getTrailerImages(trailers[i].id)

        trailers[i].options = options
        trailers[i].images = images
      }

      res.status(200).json(trailers)
    } catch (e) {
      writeLog('getTrailersUnion ERROR: ' + e)
      res.status(500).json({ status: false })
    }
  }

  async getTrailers(req, res) {
    try {
      const trailers = await TrailerServices.getTrailers()

      res.status(200).json(trailers)
    } catch (e) {
      writeLog('getTrailers ERROR: ' + e)
      res.status(500).json({ status: false })
    }
  }

  async getTrailerOptions(req, res) {
    try {
      const { trailer_id } = req.params
      const options = await TrailerServices.getTrailerOptions(trailer_id)

      res.status(200).json(options)
    } catch (e) {
      writeLog('getTrailerOptions ERROR: ' + e)
      res.status(500).json({ status: false })
    }
  }

  async getTrailerImages(req, res) {
    try {
      const { trailer_id } = req.params
      const images = await TrailerServices.getTrailerImages(trailer_id)

      res.status(200).json(images)
    } catch (e) {
      writeLog('getTrailerImages ERROR: ' + e)
      res.status(500).json({ status: false })
    }
  }

  async addTrailer(req, res) {
    try {
      const { title, text } = req.body
      await TrailerServices.addTrailer(title, text)

      res.status(201).json({ status: true })
    } catch (e) {
      writeLog('addTrailer ERROR: ' + e)
      res.status(500).json({ status: false })
    }
  }

  async addOption(req, res) {
    try {
      const { trailer_id, icon, name, text } = req.body
      await TrailerServices.addOption(trailer_id, icon, name, text)

      res.status(201).json({ status: true })
    } catch (e) {
      writeLog('addOption ERROR: ' + e)
      res.status(500).json({ status: false })
    }
  }

  async addImageDB(req, res) {
    try {
      const { trailer_id, src } = req.body
      await TrailerServices.addImage(trailer_id, src)

      res.status(201).json({ status: true })
    } catch (e) {
      writeLog('addImageDB ERROR: ' + e)
      res.status(500).json({ status: false })
    }
  }

  async changeTrailer(req, res) {
    try {
      const { id, title, text } = req.body
      await TrailerServices.changeTrailer(id, title, text)

      const trailer = await TrailerServices.getTrailer(id)

      res.status(201).json(trailer)
    } catch (e) {
      writeLog('changeTrailer ERROR: ' + e)
      res.status(500).json({ status: false })
    }
  }

  async changeOption(req, res) {
    try {
      const { option_id, icon, name, text } = req.body
      await TrailerServices.changeOption(option_id, icon, name, text)

      res.status(201).json({ message: true })
    } catch (e) {
      writeLog('changeOption ERROR: ' + e)
      res.status(500).json({ status: false })
    }
  }

  async deleteTrailer(req, res) {
    try {
      const { trailer_id } = req.body
      await TrailerServices.deleteTrailer(trailer_id)
      await TrailerServices.deleteOptionsByTrailerId(trailer_id)

      res.status(200).json({ message: true })
    } catch (e) {
      writeLog('deleteTrailer ERROR: ' + e)
      res.status(500).json({ status: false })
    }
  }

  async deleteTrailerOption(req, res) {
    try {
      const { option_id } = req.body
      await TrailerServices.deleteOption(option_id)

      res.status(200).json({ status: true })
    } catch (e) {
      writeLog('deleteTrailer ERROR: ' + e)
      res.status(500).json({ status: false })
    }
  }

  async deleteTrailerImage(req, res) {
    try {
      const { src } = req.body
      await TrailerServices.deleteImageDB(src)
    } catch (e) {
      writeLog('deleteTrailer ERROR: ' + e)
      res.status(500).json({ status: false })
    }
  }
}

module.exports = new TrailersController()
