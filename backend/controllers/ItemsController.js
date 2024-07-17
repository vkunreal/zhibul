const ItemsServices = require('../services/ItemsServices')
const { writeLog } = require('../writeLog')
const path = require('path')
const fs = require('fs')
const OptionsServices = require('../services/OptionsServices')
const FilesServices = require('../services/FilesServices')
const ValutesServices = require('../services/ValutesServices')

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
  } else if (!String(item.url).trim()) {
    writeLog('Url is not found')

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
    const items = await ItemsServices.getAllItems()

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
    const valutes = await ValutesServices.getAllValutes()

    for (let i = 0; i < items.length; i++) {
      const itemId = items[i].id
      const images = await ItemsServices.getItemImages(itemId)
      const itemOptions = await OptionsServices.getOptionsByItemId(itemId)
      const itemFiles = await FilesServices.getFilesByItemId(itemId)
      const itemElem = items[i]
      const valute = valutes.find((v) => v.id === itemElem.valute_id).value

      items[i].images = images
      items[i].menuOptions = itemOptions.filter((op) => !!op.show_menu)
      items[i].files = itemFiles
      if (itemElem.price) {
        items[i].display_price = itemElem.price
      } else if (
        itemElem.purchase_price &&
        itemElem.profitabilaty &&
        valute &&
        itemElem.price_postfix
      ) {
        items[i].display_price = `${(
          itemElem.purchase_price *
          itemElem.profitabilaty *
          valute
        ).toFixed(1)}0 ${itemElem.price_postfix}`
      } else {
        items[i].display_price = ''
      }
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

    if (item) {
      const images = await ItemsServices.getItemImages(item.id)
      const files = await FilesServices.getFilesByItemId(item.id)

      item.images = images
      item.files = files
    }

    res.status(200).json(item)
  }

  async getItemFromUrl(req, res) {
    const item = await ItemsServices.getItemFromUrl(req.params.item_url)
    const valutes = await ValutesServices.getAllValutes()

    if (item) {
      const images = await ItemsServices.getItemImages(item.id)
      const files = await FilesServices.getFilesByItemId(item.id)

      const valute = valutes.find((v) => v.id === item.valute_id).value

      item.images = images
      item.files = files
      if (item.price) {
        item.display_price = item.price
      } else if (
        item.purchase_price &&
        item.profitabilaty &&
        valute &&
        item.price_postfix
      ) {
        item.display_price = `${(
          item.purchase_price *
          item.profitabilaty *
          valute
        ).toFixed(1)}0 ${item.price_postfix}`
      } else {
        item.display_price = ''
      }
    }

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
      const imageName = `image-${item_id}-${
        Date.now() + Math.round(Math.random() * 100000)
      }.${file.name.split('.').pop().toLowerCase()}`
      const imagePath = path.resolve(
        __dirname,
        '..',
        'public',
        'images',
        imageName
      )
      const imageUrl = 'https://api.zhbl.by/images/' + imageName
      // const imageUrl = 'http://localhost:5000/images/' + imageName
      urls.push(imageUrl)
      await file.mv(imagePath, async (err) => {
        if (err) {
          console.log(err)
          return res.status(500).send(err)
        }
        await ItemsServices.addImageToDB(item_id, imageUrl)
      })
    }

    res.status(200).json({ status: true })
  }

  async putMain(req, res) {
    try {
      const { src } = req.body
      await ItemsServices.putMainImage(src)
      res.status(201).json({ status: true })
    } catch (e) {
      console.error(e)
      res.status(500).json({ status: false })
    }
  }

  async deleteImage(req, res) {
    try {
      const imageName = req.body.src.split('/').pop()
      const imagePath = path.resolve(
        __dirname,
        '..',
        'public',
        'images',
        imageName
      )
      if (!fs.existsSync(imagePath)) {
        return res.status(400).json({ status: false })
      }
      fs.unlink(imagePath, async (err) => {
        if (err) {
          res.status(500).json({ status: false })
          console.log(err)
        }
        await ItemsServices.deleteImageInDB(
          'https://api.zhbl.by/images/' + imageName
          // 'http://localhost:5000/images/' + imageName
        )
        res.status(200).json({ status: true })
      })
    } catch (e) {
      console.err(e)
    }
  }
}

module.exports = new ItemsController()
