const { request } = require('../db/database')
const { writeLog } = require('../writeLog')
const { replaceQuotes } = require('../utils/quotes')

const queryItems = `
  SELECT
    it.id,
    it.code,
    it.position,
    c.url as category_url,
    c.name as category_name,
    it.category_id,
    it.url,
    it.name,
    it.description,
    ct.name as manufacturer,
    it.brand,
    it.price,
    it.valute_id,
    it.purchase_price,
    it.profitabilaty,
    it.price_postfix,
    it.seo_title,
    it.seo_description,
    it.seo_keywords
  FROM items it
  JOIN categories c ON it.category_id = c.id
  JOIN countries ct ON ct.id = it.manufacturer_id
  GROUP BY it.id
`

const queryItemsByCategoryUrl = (category_url) => `
  SELECT
    it.id,
    it.code,
    it.position,
    c.url as category_url,
    c.name as category_name,
    it.category_id,
    it.url,
    it.name,
    it.description,
    ct.name as manufacturer,
    it.brand,
    it.price,
    it.valute_id,
    it.purchase_price,
    it.profitabilaty,
    it.price_postfix,
    it.seo_title,
    it.seo_description,
    it.seo_keywords
  FROM items it
  JOIN categories c ON it.category_id = c.id AND c.url = "${category_url}"
  JOIN countries ct ON ct.id = it.manufacturer_id
  GROUP BY it.id
`

const queryItemByUrl = (item_url) => `
  SELECT
    it.id,
    it.code,
    it.position,
    c.url as category_url,
    c.name as category_name,
    it.category_id,
    it.url,
    it.name,
    it.description,
    ct.name as manufacturer,
    it.brand,
    it.price,
    it.valute_id,
    it.purchase_price,
    it.profitabilaty,
    it.price_postfix,
    it.seo_title,
    it.seo_description,
    it.seo_keywords
  FROM items it
  JOIN categories c ON it.category_id = c.id
  JOIN countries ct ON ct.id = it.manufacturer_id
  WHERE it.url = "${item_url}"
  GROUP BY it.id
`

class ItemsServices {
  // get all items from db
  async getAllItems() {
    try {
      return await request(queryItems)
    } catch (e) {
      console.error(e)
    }
  }

  async getCountries() {
    return await request('SELECT * FROM countries')
  }

  async getItemsFromCategoryUrl(category_url, withImages = true) {
    try {
      return await request(queryItemsByCategoryUrl(category_url, withImages))
    } catch (e) {
      console.error(e)
    }
  }

  async getItemImages(item_id) {
    return await request(`SELECT * FROM images WHERE item_id = "${item_id}"`)
  }

  // get item from db by id
  async getItemFromId(item_id) {
    try {
      return await request(
        `${queryItems} WHERE id = "${item_id}"`,
        (res) => res[0][0]
      )
    } catch (e) {
      console.error(e)
    }
  }

  async getItemFromUrl(item_url) {
    try {
      return await request(queryItemByUrl(item_url), (it) => it[0][0])
    } catch (e) {
      console.error(e)
    }
  }

  async changeItemById({
    item_id,
    category_id,
    url,
    position,
    name,
    brand,
    manufacturer,
    description,
    price,
    valute_id,
    purchase_price,
    profitabilaty,
    price_postfix,
    seo_title,
    seo_description,
    seo_keywords,
  }) {
    try {
      const updateItemField = async (field, value) =>
        await request(
          `UPDATE items SET ${field} = "${value}" WHERE id = "${item_id}"`
        )

      updateItemField('category_id', category_id)
      updateItemField('name', replaceQuotes(name))
      updateItemField('position', position)
      updateItemField('url', url)
      updateItemField('description', replaceQuotes(description))
      updateItemField('brand', replaceQuotes(brand))
      updateItemField('manufacturer_id', manufacturer)
      updateItemField('price', replaceQuotes(price))
      updateItemField('valute_id', valute_id)
      updateItemField('purchase_price', purchase_price)
      updateItemField('profitabilaty', profitabilaty)
      updateItemField('price_postfix', price_postfix)
      updateItemField('seo_title', replaceQuotes(seo_title))
      updateItemField('seo_description', replaceQuotes(seo_description))
      updateItemField('seo_keywords', replaceQuotes(seo_keywords))

      writeLog('Item was changed')
      return { status: true }
    } catch (e) {
      console.error(e)
    }
  }

  async addItem({
    category_id,
    url,
    position,
    name,
    description,
    brand,
    manufacturer,
    price,
    valute_id,
    purchase_price,
    profitabilaty,
    price_postfix,
    seo_title,
    seo_description,
    seo_keywords,
  }) {
    try {
      const lastId = await request(
        'SELECT MAX(id) as id FROM items',
        (d) => d[0][0]
      )
      const code = '1.' + String(lastId.id + 1).padStart(4, '0')

      await request(`
        INSERT INTO items(code, position, url, category_id, name, description, brand, manufacturer_id, price, valute_id, purchase_price, profitabilaty, price_postfix, seo_title, seo_description, seo_keywords)
        VALUES ("${code}", "${position}", "${url}", "${category_id}", "${name}", "${replaceQuotes(
        description
      )}", "${brand}", "${manufacturer}", "${price}", "${valute_id}", "${purchase_price}", "${profitabilaty}", "${price_postfix}", "${replaceQuotes(
        seo_title
      )}", "${replaceQuotes(seo_description)}", "${replaceQuotes(
        seo_keywords
      )}")
      `)

      writeLog('Item was added')
      return { status: true }
    } catch (e) {
      console.error(e)
    }
  }

  // delete item from db by id
  async deleteItemFromId(item_id) {
    try {
      await request(`DELETE FROM items WHERE id = "${item_id}"`)

      writeLog('Item was delete')
      return { status: true }
    } catch (e) {
      console.error(e)
    }
  }

  async addImageToDB(item_id, imageName) {
    try {
      await request(`INSERT INTO images (item_id, src)
        VALUES
        ("${item_id}", "${imageName}")`)
    } catch (e) {
      console.error(e)
    }
  }

  async putMainImage(src) {
    try {
      const result = await request(
        `SELECT item_id FROM images WHERE src = "${src}"`,
        (res) => res[0][0]
      )
      await request(
        `UPDATE images SET is_main = "0" WHERE item_id = "${result.item_id}"`
      )
      await request(`UPDATE images SET is_main = "1" WHERE src = "${src}"`)
    } catch (e) {
      console.error(e)
    }
  }

  async deleteImageInDB(imageSrc) {
    try {
      await request(`DELETE FROM images WHERE src = "${imageSrc}"`)
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = new ItemsServices()
