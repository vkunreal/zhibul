const { request } = require('../db/database')
const { writeLog } = require('../writeLog')

const queryItems = `
  SELECT
    it.id,
    c.url as category_url,
    c.name as category_name,
    GROUP_CONCAT(im.src SEPARATOR ',') as images,
    it.category_id,
    it.url,
    it.name,
    it.description,
    ct.name as manufacturer,
    it.brand,
    it.price
  FROM items it
  JOIN categories c ON it.category_id = c.id
  JOIN images im ON im.item_id = it.id
  JOIN countries ct ct.id = it.manufacturer_id
  GROUP BY it.id
`

const queryItemsByCategoryUrl = (category_url) => `
  SELECT
    it.id,
    c.url as category_url,
    c.name as category_name,
    GROUP_CONCAT(im.src SEPARATOR ',') as images,
    it.category_id,
    it.url,
    it.name,
    it.description,
    ct.name as manufacturer,
    it.brand,
    it.price
  FROM items it
  JOIN categories c ON it.category_id = c.id AND c.url = "${category_url}"
  JOIN images im ON im.item_id = it.id
  JOIN countries ct ON ct.id = it.manufacturer_id
  GROUP BY it.id
`

const queryItemByUrl = (item_url) => `
  SELECT
    it.id,
    c.url as category_url,
    c.name as category_name,
    GROUP_CONCAT(im.src SEPARATOR ',') as images,
    it.category_id,
    it.url,
    it.name,
    it.description,
    ct.name as manufacturer,
    it.brand,
    it.price
  FROM items it
  JOIN categories c ON it.category_id = c.id
  JOIN images im ON im.item_id = it.id
  JOIN countries ct ON ct.id = it.manufacturer_id
  WHERE it.url = "${item_url}"
  GROUP BY it.id
`

class ItemsServices {
  // get all items from db
  async getAllItems() {
    return await request('SELECT * FROM items')
  }

  async getItemsFromCategoryUrl(category_url) {
    return await request(queryItemsByCategoryUrl(category_url))
  }

  async getItemImages(item_id) {
    return await request(`SELECT src FROM images WHERE item_id = "${item_id}"`)
  }

  // get item from db by id
  async getItemFromId(item_id) {
    return await request(
      `${queryItems} WHERE id = "${item_id}"`,
      (res) => res[0][0]
    )
  }

  async getItemFromUrl(item_url) {
    return await request(queryItemByUrl(item_url), (it) => it[0][0])
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

  async addItem({ category_id, name, brand, manufacturer, price }) {
    await request(`
      INSERT INTO items(category_id, name, brand, manufacturer, price)
      VALUES ("${category_id}", "${name}", "${brand}", "${manufacturer}", "${price}")
    `)

    writeLog('Item was added')
    return { status: true }
  }

  // delete item from db by id
  async deleteItemFromId(item_id) {
    await request(`DELETE FROM items WHERE id = "${item_id}"`)

    writeLog('Item was delete')
    return { status: true }
  }

  async addImageToDB(item_id, imageName) {
    await request(`INSERT INTO images (item_id, src)
      VALUES
      ("${item_id}", "${imageName}")`)
  }

  async deleteImageInDB(imageSrc) {
    await request(`DELETE FROM images WHERE src = "${imageSrc}"`)
  }
}

module.exports = new ItemsServices()
