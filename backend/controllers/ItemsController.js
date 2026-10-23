const ItemsServices = require('../services/ItemsServices')
const { writeLog } = require('../writeLog')
const path = require('path')
const fs = require('fs')
const OptionsServices = require('../services/OptionsServices')
const FilesServices = require('../services/FilesServices')
const ValutesServices = require('../services/ValutesServices')
const {
  getEndpoint,
  createPrevURL,
  createNextUrl,
} = require('../utils/endpointSplitUrls')
const { buildDisplayPrice } = require('../utils/displayPrice')

const isItemActive = (item) => !!Number(item?.is_active)

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

    // Витрина: скрытые товары наружу не отдаём. CMS ходит в without-images / items-splitted.
    res.status(200).json((items || []).filter(isItemActive))
  }

  async getAllItemsSplitted(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 1
      const limit = parseInt(req.query.limit, 10) || 20
      const categoryUrl = req.query.category_url
        ? String(req.query.category_url)
        : ''
      const search = req.query.search ? String(req.query.search) : ''

      const [{ items: data, count }, valutes] = await Promise.all([
        ItemsServices.getAllItemsSplitted(page, limit, categoryUrl, search),
        ValutesServices.getAllValutes(),
      ])

      const items = (data || []).map((item) => {
        const valute = valutes.find((v) => v.id === item.valute_id)?.value

        return {
          ...item,
          display_price: buildDisplayPrice(item, valute),
        }
      })

      const endpointURL = getEndpoint(req)
      const query = {
        ...(categoryUrl ? { category_url: categoryUrl } : {}),
        ...(search ? { search } : {}),
      }

      res.status(200).json({
        data: items,
        count,
        prev: createPrevURL(endpointURL, page, limit, query),
        next: createNextUrl(endpointURL, page, limit, count, query),
      })
    } catch (e) {
      console.log('e', e)
      res.status(500).json({
        data: [],
        count: 0,
        prev: null,
        next: null,
      })
    }
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
      req.params.category_url,
      { onlyActive: true },
    )
    const valutes = await ValutesServices.getAllValutes()

    for (let i = 0; i < items.length; i++) {
      const itemId = items[i].id
      const images = await ItemsServices.getItemImages(itemId)
      const itemOptions = await OptionsServices.getOptionsByItemId(itemId)
      const itemFiles = await FilesServices.getFilesByItemId(itemId)
      const itemElem = items[i]
      const valute = valutes.find((v) => v.id === itemElem.valute_id)?.value

      items[i].images = images
      items[i].menuOptions = itemOptions.filter((op) => !!op.show_menu)
      items[i].files = itemFiles
      items[i].display_price = buildDisplayPrice(itemElem, valute)
    }

    res.status(200).json(items)
  }

  async getItemsWithoutImages(req, res) {
    const items = await ItemsServices.getItemsFromCategoryUrl(
      req.params.category_url,
    )

    for (let i = 0; i < items.length; i++) {
      const itemId = items[i].id
      const itemOptions = await OptionsServices.getOptionsByItemId(itemId)

      items[i].menuOptions = itemOptions.filter((op) => !!op.show_menu)
    }

    res.status(200).json(items)
  }

  // get one item from id (CMS)
  async getItem(req, res) {
    const item = await ItemsServices.getItemFromId(req.params.id)

    if (!item) {
      return res.status(404).json(null)
    }

    const valutes = await ValutesServices.getAllValutes()
    const valute = valutes.find((v) => v.id === item.valute_id)?.value
    item.display_price = buildDisplayPrice(item, valute)

    res.status(200).json(item)
  }

  async getItemFromUrl(req, res) {
    const item = await ItemsServices.getItemFromUrl(req.params.item_url)

    if (!item || !isItemActive(item)) {
      return res.status(404).json(null)
    }

    const valutes = await ValutesServices.getAllValutes()
    const images = await ItemsServices.getItemImages(item.id)
    const files = await FilesServices.getFilesByItemId(item.id)
    const valute = valutes.find((v) => v.id === item.valute_id)?.value

    item.images = images
    item.files = files
    item.display_price = buildDisplayPrice(item, valute)

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

    try {
      const result = await ItemsServices.changeItemById(item)
      res.status(200).json(result)
    } catch (e) {
      if (e.codeTaken) {
        return res.status(409).json({ status: false, message: 'Артикул уже занят' })
      }
      console.error(e)
      res.status(500).json({ status: false })
    }
  }

  async isCodeFree(req, res) {
    try {
      const ownerId = await ItemsServices.codeOwnerId(
        req.query.code,
        req.query.item_id,
      )
      res.status(200).json({ free: !ownerId })
    } catch (e) {
      console.error(e)
      res.status(500).json({ status: false })
    }
  }

  async copyItem(req, res) {
    try {
      const copied = await ItemsServices.copyItem(req.params.id)

      if (!copied) {
        return res.status(404).json({ status: false })
      }

      return res.status(201).json(copied)
    } catch (e) {
      console.error(e)
      return res.status(500).json({ status: false })
    }
  }

  async addItem(req, res) {
    const item = req.body
    const test = testItem(item)

    if (test) {
      return res.status(400).json(test)
    }

    try {
      const result = await ItemsServices.addItem(item)
      return res.status(201).json(result)
    } catch (e) {
      if (e.codeTaken) {
        return res.status(409).json({ status: false, message: 'Артикул уже занят' })
      }
      console.error(e)
      return res.status(500).json({ status: false })
    }
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
        imageName,
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
        imageName,
      )
      await ItemsServices.deleteImageInDB(
        'https://api.zhbl.by/images/' + imageName,
        // 'http://localhost:5000/images/' + imageName
      )
      if (fs.existsSync(imagePath)) {
        // return res.status(400).json({ status: false })
        fs.unlink(imagePath, async (err) => {
          if (err) {
            res.status(500).json({ status: false })
            console.log(err)
          }
          res.status(200).json({ status: true })
        })
      } else {
        res.status(200).json({ status: true })
      }
    } catch (e) {
      console.err(e)
    }
  }
}

module.exports = new ItemsController()
