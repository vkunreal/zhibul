const ItemsServices = require('../services/ItemsServices')

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
    const item = await ItemsServices.getItemFromId(req.query.id)

    res.status(200).json(item)
  }

  // delete item by id
  async deleteItemById(req, res) {
    const item_id = req.body.id

    const result = await ItemsServices.deleteItemFromId(item_id)

    res.status(200).json(result)
  }
}

module.exports = new ItemsController()
