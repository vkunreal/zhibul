const SliderServices = require('../services/SliderServices')

class SliderController {
  async getSlider(req, res) {
    const slider = await SliderServices.getSliderFromDB()

    res.status(200).json(slider)
  }
}

module.exports = new SliderController()
