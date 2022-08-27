const { request } = require('../db/database')
const { writeLog } = require('../writeLog')

const queryItems = `
  SELECT
    id,
    (SELECT name FROM categories WHERE id = category_id) as category,
    name,
    brand,
    manufacturer,
    count,
    price
  FROM items
`

class ItemsServices {
  // get all items from db
  async getAllItems() {
    return await request(queryItems)
  }

  // get all items from db by category id
  async getItemsFromCategoryId(category_id) {
    return await request(`${queryItems} WHERE category_id = "${category_id}";`)
  }

  async changeItemById({
    item_id,
    category_id,
    name,
    brand,
    manufacturer,
    price,
  }) {
    const updateItemField = async (field, value) =>
      await request(
        `UPDATE items SET ${field} = "${value}" WHERE id = "${item_id}"`
      )

    updateItemField('category_id', category_id)
    updateItemField('name', name)
    updateItemField('brand', brand)
    updateItemField('manufacturer', manufacturer)
    updateItemField('price', price)

    writeLog('Item was changed')
    return { status: true }
  }

  // get item from db by id
  async getItemFromId(item_id) {
    return await request(
      `${queryItem} WHERE id = "${item_id}"`,
      (res) => res[0][0]
    )
  }

  // delete item from db by id
  async deleteItemFromId(item_id) {
    await request(`DELETE FROM items WHERE id = "${item_id}"`)

    writeLog('Item was delete')
    return { status: true }
  }
}

module.exports = new ItemsServices()
