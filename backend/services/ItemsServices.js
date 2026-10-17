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
    it.seo_keywords,
    it.is_active,
    it.is_order_only
  FROM items it
  JOIN categories c ON it.category_id = c.id
  JOIN countries ct ON ct.id = it.manufacturer_id
  GROUP BY it.id
`

const SORT_MODE_ORDER_BY = {
  manual: 'it.position ASC, it.id ASC',
  alphabet: 'it.name ASC',
  random: 'RAND()',
  price_asc:
    'COALESCE(CAST(NULLIF(it.price, "") AS DECIMAL(12,2)), it.purchase_price * IFNULL(it.profitabilaty, 1)) ASC, it.id ASC',
  price_desc:
    'COALESCE(CAST(NULLIF(it.price, "") AS DECIMAL(12,2)), it.purchase_price * IFNULL(it.profitabilaty, 1)) DESC, it.id ASC',
  newest: 'it.id DESC',
}

const queryItemsByCategoryUrl = (category_url, { onlyActive = false } = {}) => {
  const activeFilter = onlyActive ? 'AND it.is_active = 1' : ''

  return `
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
    it.seo_keywords,
    it.is_active,
    it.is_order_only
  FROM items it
  JOIN categories c ON it.category_id = c.id AND c.url = "${category_url}"
  JOIN countries ct ON ct.id = it.manufacturer_id
  WHERE 1 = 1 ${activeFilter}
  GROUP BY it.id
`
}

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
    it.seo_keywords,
    it.is_active,
    it.is_order_only
  FROM items it
  JOIN categories c ON it.category_id = c.id
  JOIN countries ct ON ct.id = it.manufacturer_id
  WHERE it.url = "${item_url}"
  GROUP BY it.id
`

const queryItemById = (item_id) => `
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
    it.seo_keywords,
    it.is_active,
    it.is_order_only
  FROM items it
  JOIN categories c ON it.category_id = c.id
  JOIN countries ct ON ct.id = it.manufacturer_id
  WHERE it.id = "${item_id}"
  GROUP BY it.id
`

const toSqlBool = (value) => (value ? 1 : 0)

class ItemsServices {
  // get all items from db
  async getAllItems() {
    try {
      return await request(queryItems)
    } catch (e) {
      console.error(e)
    }
  }

  async getAllItemsSplitted(page, limit, categoryUrl, search = '') {
    if (page < 1 || limit < 1) {
      throw new Error(`Invalid parametrs page: ${page}, limit: ${limit}`)
    }

    const safeCategoryUrl = categoryUrl
      ? String(categoryUrl).replace(/"/g, '')
      : ''
    // Убираем кавычки и LIKE-метасимволы из поисковой строки.
    const safeSearch = String(search || '')
      .trim()
      .replace(/["\\%_]/g, '')
      .slice(0, 100)
    const nameFilter = safeSearch
      ? `it.name LIKE "%${safeSearch}%"`
      : ''

    const baseQuery = safeCategoryUrl
      ? queryItemsByCategoryUrl(safeCategoryUrl)
      : queryItems
    const filteredQuery = nameFilter
      ? safeCategoryUrl
        ? baseQuery.replace('WHERE 1 = 1', `WHERE 1 = 1 AND ${nameFilter}`)
        : baseQuery.replace('GROUP BY it.id', `WHERE ${nameFilter}\n  GROUP BY it.id`)
      : baseQuery

    const countQuery = safeCategoryUrl
      ? `SELECT COUNT(*) as count
         FROM items it
         JOIN categories c ON it.category_id = c.id AND c.url = "${safeCategoryUrl}"
         ${nameFilter ? `WHERE ${nameFilter}` : ''}`
      : `SELECT COUNT(*) as count FROM items it
         ${nameFilter ? `WHERE ${nameFilter}` : ''}`

    const items = await request(
      `${filteredQuery} ORDER BY it.position ASC, it.id ASC LIMIT ${limit} OFFSET ${
        (page - 1) * limit
      }`
    )

    const { count } = await request(countQuery, (res) => res[0][0])

    return { items, count: Number(count) }
  }

  async getCountries() {
    return await request('SELECT * FROM countries')
  }

  async getItemsFromCategoryUrl(category_url, { onlyActive = false } = {}) {
    try {
      const safeUrl = String(category_url).replace(/"/g, '')
      let sortMode = 'manual'

      if (onlyActive) {
        const category = await request(
          `SELECT sort_mode FROM categories WHERE url = "${safeUrl}" LIMIT 1`,
          (res) => res[0][0],
        )
        sortMode = category?.sort_mode || 'manual'
      }

      const orderBy = SORT_MODE_ORDER_BY[sortMode] || SORT_MODE_ORDER_BY.manual

      return await request(
        `${queryItemsByCategoryUrl(safeUrl, { onlyActive })} ORDER BY ${orderBy}`,
      )
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
      const safeId = parseInt(item_id, 10)
      if (!safeId) return null

      return await request(queryItemById(safeId), (res) => res[0][0])
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
    is_active,
    is_order_only,
  }) {
    try {
      const updateItemField = async (field, value) =>
        await request(
          `UPDATE items SET ${field} = ${
            value ? `"${value}"` : 'null'
          } WHERE id = "${item_id}"`
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

      // false нельзя гонять через updateItemField — там falsy превращается в null
      await request(
        `UPDATE items SET is_active = ${toSqlBool(is_active)} WHERE id = "${item_id}"`
      )
      await request(
        `UPDATE items SET is_order_only = ${toSqlBool(
          is_order_only
        )} WHERE id = "${item_id}"`
      )

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
    is_active = true,
    is_order_only = false,
  }) {
    try {
      const lastId = await request(
        'SELECT MAX(id) as id FROM items',
        (d) => d[0][0]
      )
      const code = '1.' + String(lastId.id + 1).padStart(4, '0')

      await request(`
        INSERT INTO items(code, position, url, category_id, name, description, brand, manufacturer_id, price, valute_id, purchase_price, profitabilaty, price_postfix, seo_title, seo_description, seo_keywords, is_active, is_order_only)
        VALUES ("${code}", "${position}", "${url}", "${category_id}", "${name}", "${replaceQuotes(
        description
      )}", "${brand}", "${manufacturer}", "${price}", "${valute_id || 1}", ${
        purchase_price ? `"${purchase_price}"` : 'null'
      }, ${
        profitabilaty ? `"${profitabilaty}"` : 'null'
      }, "${price_postfix}", "${replaceQuotes(seo_title)}", "${replaceQuotes(
        seo_description
      )}", "${replaceQuotes(seo_keywords)}", ${toSqlBool(
        is_active
      )}, ${toSqlBool(is_order_only)})
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
