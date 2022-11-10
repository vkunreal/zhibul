const OptionsServices = require('../services/OptionsServices')

class OptionsController {
  // get options by item id
  async getOptions(req, res) {
    const options = await OptionsServices.getOptionsByItemId(req.params.item_id)

    res.status(200).json(options)
  }

  // change option (body = {option_id(required), name (required), value (required)})
  async changeOption(req, res) {
    const body = req.body

    if (!body.option_id || !String(body.option_id).trim()) {
      return res.status(400).json({ message: 'Option id is not found' })
    } else if (!body.name || !body.name.trim()) {
      return res.status(400).json({ message: 'Option name is not found' })
    } else if (!body.value || !body.value.trim()) {
      return res.status(400).json({ message: 'Option value is not found' })
    }

    const result = await OptionsServices.changeOptionById(body)

    return res.status(200).json(result)
  }

  async changeOptionsPosition(req, res) {
    const body = req.body
    const response = await OptionsServices.changeOptionsPosition(body)
    res.status(200).json(response)
  }

  // add option (body = {item_id(required), name (required), value (required)})
  async addOption(req, res) {
    const option = req.body

    if (!option.item_id || !String(option.item_id).trim()) {
      return res.status(400).json({ message: 'Item id is not found' })
    } else if (!option.name || !option.name.trim()) {
      return res.status(400).json({ message: 'Option name is not found' })
    } else if (!option.value || !option.value.trim()) {
      return res.status(400).json({ message: 'Option value is not found' })
    }

    const result = await OptionsServices.addOptionByItemId(option)

    res.status(201).json(result)
  }

  // delete option by option id
  async deleteOption(req, res) {
    const option_id = req.body.option_id
    const result = await OptionsServices.deleteOptionById(option_id)

    res.status(200).json(result)
  }
}

module.exports = new OptionsController()
