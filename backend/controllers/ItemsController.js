const ItemsServices = require('../services/ItemsServices')

class ItemsController {
  // get items from id, category or undercategory
  async getItemsFromCategory(req, res) {
    let items

    if (req.query.id) {
      items = await ItemsServices.getItemsFromCategoryId(req.query.id)
    } else if (req.query.category_name) {
      items = await ItemsServices.getItemsFromCategoryName(
        req.query.category_name
      )
    } else if (req.query.undercategory_name) {
      items = await ItemsServices.getItemsFromUndercategoryName(
        req.query.undercategory_name
      )
    } else {
      items = await ItemsServices.getAllItems()
    }

    res.status(200).json(items)
  }

  // get one item from id or name
  async getItem(req, res) {
    let item

    if (req.query.id) {
      item = await ItemsServices.getItemFromId(req.query.id)
    } else if (req.query.name) {
      item = await ItemsServices.getItemFromName(req.query.name)
    } else {
      res.status(400).json({ message: 'Is not item id or name' })
    }

    res.status(200).json(item)
  }

  // add item (body = { name, brand, manufacturer, count, price })
  async addItemFromUndercategoryId(req, res) {
    const undercategory_id = req.params.undercategory_id
    const item = req.body

    ItemsServices.addItemFromUndercategoryId(undercategory_id, item).then(
      () => {
        res.status(201).json(item)
      }
    )
  }

  // delete item from id
  async deleteItemFromId(req, res) {
    const item_id = req.params.item_id

    ItemsServices.deleteItemFromId(item_id).then(() => {
      res.status(200).json({ message: 'Item was deleted' })
    })
  }
}

module.exports = new ItemsController()
