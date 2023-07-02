const VariablesServices = require('../services/VariablesServices')

class VariablesController {
  async getVariables(req, res) {
    const variables = await VariablesServices.getVariables()

    res.status(200).json(variables)
  }

  async addVariable(req, res) {
    try {
      const { name, value } = req.body

      if (!name.trim() || !value.trim()) {
        return res.status(400).json({ status: false })
      }

      await VariablesServices.createVariable(name, value)

      res.status(200).json({ status: true })
    } catch (e) {
      console.error(e)
    }
  }

  async changeVariable(req, res) {
    try {
      const { id, name, value } = req.body

      if (!id || !name.trim() || !value.trim()) {
        return res.status(400).json({ status: false })
      }

      const result = await VariablesServices.changeVariable(id, name, value)

      if (!result.status) {
        return res.status(500).json({ status: false })
      }

      res.status(200).json({ status: true })
    } catch (e) {
      console.error(e)
    }
  }

  async deleteVariable(req, res) {
    try {
      const { id } = req.body

      if (!id) {
        return res.status(400).json({ status: false })
      }

      const result = await VariablesServices.deleteVariableById(id)

      if (!result.status) {
        return res.status(500).json({ status: false })
      }

      res.status(200).json({ status: true })
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = new VariablesController()
