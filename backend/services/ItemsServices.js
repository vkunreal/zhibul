const { request } = require('../db/database')

const queryItems = `
  SELECT
    t.id,
    c.name as category,
    uc.name as undercategory,
    t.name,
    t.count,
    t.price,
    t.manufacturer
  FROM items t JOIN undercategories uc JOIN categories c
`

const queryItem = `
  SELECT
    id,
    (SELECT name FROM undercategories WHERE id = undercategory_id) as undercategory,
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
    return await request(`${queryItems} WHERE c.id = "${category_id}";`)
  }

  // get all items from db by category name
  async getItemsFromCategoryName(category_name) {
    return await request(`${queryItems} WHERE c.name = "${category_name}";`)
  }

  // get all items from db by undercategory name
  async getItemsFromUndercategoryName(undercategory_name) {
    return await request(
      `${queryItems} WHERE uc.name = "${undercategory_name}";`
    )
  }

  // get item from db by id
  async getItemFromId(item_id) {
    return await request(
      `${queryItem} WHERE id = "${item_id}"`,
      (res) => res[0][0]
    )
  }

  // get item from db by name
  async getItemFromName(item_name) {
    return await request(
      `${queryItem} WHERE name = "${item_name}"`,
      (res) => res[0][0]
    )
  }

  // add item to db by undercategory id
  async addItemFromUndercategoryId(
    undercategory_id,
    { name, brand, manufacturer, count, price }
  ) {
    const sqlAddItem = `
      INSERT INTO items(undercategory_id, name, brand, manufacturer, count, price)
      VALUES ("${undercategory_id}", "${name}", "${brand}", "${manufacturer}", "${count}", "${price}")
    `
    return await request(sqlAddItem)
  }

  // delete item from db by id
  async deleteItemFromId(item_id) {
    return await request(`DELETE FROM items WHERE id = "${item_id}"`)
  }
}

module.exports = new ItemsServices()
