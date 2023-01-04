const { request } = require('../db/database')

const querySlider = `
  SELECT 
    sl.id,
    sl.url,
    sl.name,
    sl.brand,
    GROUP_CONCAT(im.src SEPARATOR ',') as images,
  FROM slides sl
  JOIN slider_images im ON im.slide_id = sl.id
  GROUP BY sl.id
`

class SliderServices {
  async getSliderFromDB() {
    const slides = await request('SELECT * FROM slides')
    const images = await request('SELECT * FROM slider_images')
    slides.forEach((s) => {
      s.images = {}
      const sImages = images.filter((im) => im.slide_id === s.id)
      sImages.forEach((im) => {
        s.images[im.display] = im.src
      })
    })
    return slides
  }
}

module.exports = new SliderServices()
