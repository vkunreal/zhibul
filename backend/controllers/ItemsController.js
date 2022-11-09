const ItemsServices = require('../services/ItemsServices')
const { writeLog } = require('../writeLog')
const path = require('path')
const fs = require('fs')

const testItem = (item) => {
  if (!item.category_id || !String(item.category_id).trim()) {
    // test category_id
    writeLog('Category id is not found')

    return { status: false }
  } else if (!item.name || !item.name.trim()) {
    // test name
    writeLog('Name id is not found')

    return { status: false }
  } else if (!item.brand || !item.brand.trim()) {
    // test brand
    writeLog('Brand id is not found')
    return { status: false }
  } else if (!item.manufacturer || !item.manufacturer.trim()) {
    // test manufacturer
    writeLog('Manufacturer id is not found')

    return { status: false }
  } else if (!item.price || !String(item.price).trim()) {
    // test price
    writeLog('Price id is not found')

    return { status: false }
  }

  return null
}

class ItemsController {
  // get items from category_id
  async getItemsFromCategory(req, res) {
    let items

    if (req.query.category_id) {
      items = await ItemsServices.getItemsFromCategoryId(req.query.category_id)
    } else {
      items = await ItemsServices.getAllItems()
    }

    res.status(200).json(items)
  }

  // get one item from id or name
  async getItem(req, res) {
    const item = await ItemsServices.getItemFromId(req.params.id)

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
    files.forEach((file) => {
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
      file.mv(imagePath, async (err) => {
        if (err) {
          console.log(err)
          return res.status(500).send(err)
        }
        await ItemsServices.addImageToDB(
          item_id,
          'http://localhost:5000/images/' + imageName
        )
        res.status(200).json({ status: true })
      })
    })
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
