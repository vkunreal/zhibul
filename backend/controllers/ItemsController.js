const ItemsServices = require('../services/ItemsServices')
const { writeLog } = require('../writeLog')
const path = require('path')
const fs = require('fs')
const OptionsServices = require('../services/OptionsServices')

const testItem = (item) => {
  if (!item?.category_id || !String(item?.category_id).trim()) {
    // test category_id
    writeLog('Category id is not found')

    return { status: false }
  } else if (!item?.name || !item.name?.trim()) {
    // test name
    writeLog('Name id is not found')

    return { status: false }
  } else if (!item?.brand || !item?.brand?.trim()) {
    // test brand
    writeLog('Brand id is not found')
    return { status: false }
  } else if (!item?.manufacturer) {
    // test manufacturer
    writeLog('Manufacturer id is not found')

    return { status: false }
  } else if (!item?.price || !String(item?.price).trim()) {
    // test price
    writeLog('Price id is not found')

    return { status: false }
  }

  return null
}

class ItemsController {
  async getAllItems(req, res) {
    const items = await ItemsServices.getAllItems()

    res.status(200).json(items)
  }

  async getAllItemsWithoutImages(req, res) {
    const items = await ItemsServices.getAllItems(false)

    res.status(200).json(items)
  }

  async getCountries(req, res) {
    const countries = await ItemsServices.getCountries()

    res.status(200).json(countries)
  }

  async getItemsFromUrl(req, res) {
    const items = await ItemsServices.getItemsFromCategoryUrl(
      req.params.category_url
    )

    for (let i = 0; i < items.length; i++) {
      const itemId = items[i].id
      const itemOptions = await OptionsServices.getOptionsByItemId(itemId)

      items[i].menuOptions = itemOptions.filter((op) => !!op.show_menu)
    }

    res.status(200).json(items)
  }

  async getItemsWithoutImages(req, res) {
    const items = await ItemsServices.getItemsFromCategoryUrl(
      req.params.category_url,
      false
    )

    for (let i = 0; i < items.length; i++) {
      const itemId = items[i].id
      const itemOptions = await OptionsServices.getOptionsByItemId(itemId)

      items[i].menuOptions = itemOptions.filter((op) => !!op.show_menu)
    }

    res.status(200).json(items)
  }

  // get one item from id or name
  async getItem(req, res) {
    const item = await ItemsServices.getItemFromId(req.params.id)

    res.status(200).json(item)
  }

  async getItemFromUrl(req, res) {
    const item = await ItemsServices.getItemFromUrl(req.params.item_url)

    res.status(200).json(item)
  }

  async getItemImages(req, res) {
    const item_id = req.params.item_id
    const images = await ItemsServices.getItemImages(item_id)
    res.status(200).json(images)
  }

  async changeItem(req, res) {
    const item = req.body
    const test = testItem(item)

    if (test) {
      return res.status(400).json(test)
    } else if (!item.item_id || !String(item.item_id).trim()) {
      return res.status(400).json({ status: false })
    }

    const result = await ItemsServices.changeItemById(item)

    res.status(200).json(result)
  }

  async addItem(req, res) {
    const item = req.body
    const test = testItem(item)

    if (test) {
      return res.status(400).json(test)
    }

    const result = await ItemsServices.addItem(item)
    return res.status(201).json(result)
  }

  // delete item by id
  async deleteItemById(req, res) {
    const item_id = req.params.id

    const result = await ItemsServices.deleteItemFromId(item_id)

    res.status(200).json(result)
  }

  async loadImages(req, res) {
    const { item_id } = req.params
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
      const imageName = `image-${item_id}-${Date.now() + file.name}`
      const imagePath = path.resolve(
        __dirname,
        '..',
        'public',
        'images',
        imageName
      )
      const imageUrl = 'http://localhost:5000/images/' + imageName
      urls.push(imageUrl)
      await file.mv(imagePath, async (err) => {
        if (err) {
          console.log(err)
          return res.status(500).send(err)
        }
        await ItemsServices.addImageToDB(item_id, imageUrl)
      })
    }

    res.status(200).json({ status: true, response: urls })
  }

  async deleteImage(req, res) {
    const imageName = req.body.src.split('/').pop()
    const imagePath = path.resolve(
      __dirname,
      '..',
      'public',
      'images',
      imageName
    )
    fs.unlink(imagePath, async (err) => {
      if (err) {
        res.status(500).json({ status: false })
        console.log(err)
      }
      await ItemsServices.deleteImageInDB(
        'http://localhost:5000/images/' + imageName
      )
      res.status(200).json({ status: true })
    })
  }
}

module.exports = new ItemsController()
