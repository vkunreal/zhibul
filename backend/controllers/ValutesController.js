const ValutesServices = require('../services/ValutesServices')

class ValutesController {
  async getAllValutes(_, res) {
    try {
      const valutes = await ValutesServices.getAllValutes()

      res.status(200).json(valutes)
    } catch (e) {
      res.status(500).json({ status: false })
    }
  }

  async changeValute(req, res) {
    try {
      const { id, value } = req.body

      await ValutesServices.changeValuteValue(id, value)

      res.status(201).json({ status: true })
    } catch (e) {
      res.status(500).json({ status: false })
    }
  }
}

module.exports = new ValutesController()
