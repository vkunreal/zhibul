const fs = require('fs/promises')
const path = require('path')

const { request } = require('../db/database')
const { writeLog } = require('../writeLog')
const { replaceQuotes } = require('../utils/quotes')

const publicDir = path.resolve(__dirname, '..', 'public')

const sqlText = (value) => {
  if (value === null || value === undefined) return 'null'
  return `"${replaceQuotes(String(value))}"`
}

const sqlNumber = (value) => {
  if (value === null || value === undefined || value === '') return 'null'
  const number = Number(value)
  return Number.isFinite(number) ? String(number) : 'null'
}

const fileNameOf = (src) => {
  const name = path.basename(String(src || '').split('?')[0])
  if (!name || name === '.' || name === '..') return ''
  return name
}

// Копия лежит рядом с оригиналом, но под новым именем. Общий файл не переиспользуется.
const copyStoredFile = async (folder, src) => {
  const sourceName = fileNameOf(src)
  if (!sourceName) return null

  const folderDir = path.resolve(publicDir, folder)
  const sourcePath = path.resolve(folderDir, sourceName)
  if (!sourcePath.startsWith(folderDir + path.sep)) return null

  try {
    await fs.access(sourcePath)
  } catch {
    console.error(`Copy skipped, file is missing: ${sourcePath}`)
    return null
  }

  const ext = path.extname(sourceName).toLowerCase()
  const copyName = `copy-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`
  const destPath = path.resolve(folderDir, copyName)
  await fs.copyFile(sourcePath, destPath)

  const cleanSrc = String(src).split('?')[0]
  const slash = cleanSrc.lastIndexOf('/')
  const prefix = slash === -1 ? '' : cleanSrc.slice(0, slash + 1)

  return { src: `${prefix}${copyName}`, path: destPath }
}

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

const normalizeCode = (code) => String(code ?? '').trim().slice(0, 6)

const codeTakenError = () => {
  const error = new Error('Артикул уже занят')
  error.codeTaken = true
  return error
}

const isCodeDuplicate = (error) =>
  error?.codeTaken ||
  (error?.code === 'ER_DUP_ENTRY' && String(error.sqlMessage ?? error.message).includes('code'))

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
    const searchFilter = safeSearch
      ? `(it.name LIKE "%${safeSearch}%" OR it.code LIKE "%${safeSearch}%")`
      : ''

    const baseQuery = safeCategoryUrl
      ? queryItemsByCategoryUrl(safeCategoryUrl)
      : queryItems
    const filteredQuery = searchFilter
      ? safeCategoryUrl
        ? baseQuery.replace('WHERE 1 = 1', `WHERE 1 = 1 AND ${searchFilter}`)
        : baseQuery.replace(
            'GROUP BY it.id',
            `WHERE ${searchFilter}\n  GROUP BY it.id`,
          )
      : baseQuery

    const countQuery = safeCategoryUrl
      ? `SELECT COUNT(*) as count
         FROM items it
         JOIN categories c ON it.category_id = c.id AND c.url = "${safeCategoryUrl}"
         ${searchFilter ? `WHERE ${searchFilter}` : ''}`
      : `SELECT COUNT(*) as count FROM items it
         ${searchFilter ? `WHERE ${searchFilter}` : ''}`

    const items = await request(
      `${filteredQuery} ORDER BY it.position ASC, it.id ASC LIMIT ${limit} OFFSET ${
        (page - 1) * limit
      }`,
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

  // Пустой артикул свободен: в UNIQUE-колонке несколько NULL допустимы.
  // exceptId — текущий товар, его собственный артикул не считается занятым.
  async codeOwnerId(code, exceptId) {
    const article = normalizeCode(code)
    if (!article) return null

    const except = parseInt(exceptId, 10)
    const exceptSql = Number.isInteger(except) && except > 0 ? ` AND id != ${except}` : ''
    const row = await request(
      `SELECT id FROM items WHERE code = ${sqlText(article)}${exceptSql} LIMIT 1`,
      (res) => res[0][0],
    )

    return row?.id ?? null
  }

  async assertCodeFree(code, exceptId) {
    const ownerId = await this.codeOwnerId(code, exceptId)
    if (ownerId) throw codeTakenError()
  }

  // Артикул нового товара: `1.` и следующий id, до 6 символов. Если занят — берём следующий свободный.
  async nextDefaultCode() {
    const lastId = await request(
      'SELECT MAX(id) as id FROM items',
      (d) => d[0][0],
    )
    let n = Number(lastId?.id) || 0

    for (let step = 0; step < 100; step += 1) {
      n += 1
      const article = `1.${String(n).padStart(4, '0')}`
      if (article.length > 6) break
      if (!(await this.codeOwnerId(article))) return article
    }

    throw codeTakenError()
  }

  async changeItemById({
    item_id,
    category_id,
    code,
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
    if (code !== undefined) await this.assertCodeFree(code, item_id)

    try {
      const updateItemField = async (field, value) =>
        await request(
          `UPDATE items SET ${field} = ${
            value ? `"${value}"` : 'null'
          } WHERE id = "${item_id}"`,
        )

      updateItemField('category_id', category_id)
      if (code !== undefined) {
        await updateItemField('code', replaceQuotes(normalizeCode(code)))
      }
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
        `UPDATE items SET is_active = ${toSqlBool(is_active)} WHERE id = "${item_id}"`,
      )
      await request(
        `UPDATE items SET is_order_only = ${toSqlBool(
          is_order_only,
        )} WHERE id = "${item_id}"`,
      )

      writeLog('Item was changed')
      return { status: true }
    } catch (e) {
      if (isCodeDuplicate(e)) throw codeTakenError()
      console.error(e)
    }
  }

  async addItem({
    category_id,
    code,
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
    const typedCode = normalizeCode(code)
    const article = typedCode || (await this.nextDefaultCode())
    if (typedCode) await this.assertCodeFree(article)

    try {
      await request(`
        INSERT INTO items(code, position, url, category_id, name, description, brand, manufacturer_id, price, valute_id, purchase_price, profitabilaty, price_postfix, seo_title, seo_description, seo_keywords, is_active, is_order_only)
        VALUES (${sqlText(article)}, "${position}", "${url}", "${category_id}", "${name}", "${replaceQuotes(
          description,
        )}", "${brand}", "${manufacturer}", "${price}", "${valute_id || 1}", ${
          purchase_price ? `"${purchase_price}"` : 'null'
        }, ${
          profitabilaty ? `"${profitabilaty}"` : 'null'
        }, "${price_postfix}", "${replaceQuotes(seo_title)}", "${replaceQuotes(
          seo_description,
        )}", "${replaceQuotes(seo_keywords)}", ${toSqlBool(
          is_active,
        )}, ${toSqlBool(is_order_only)})
      `)

      writeLog('Item was added')
      return { status: true }
    } catch (e) {
      if (isCodeDuplicate(e)) throw codeTakenError()
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
        (res) => res[0][0],
      )
      await request(
        `UPDATE images SET is_main = "0" WHERE item_id = "${result.item_id}"`,
      )
      await request(`UPDATE images SET is_main = "1" WHERE src = "${src}"`)
    } catch (e) {
      console.error(e)
    }
  }

  // Свободный url для копии: к исходному адресу добавляется `-copy`,
  // а если он занят — `-copy-2`, `-copy-3` и дальше. Длина не больше 120 символов.
  async nextCopyUrl(url) {
    const raw = String(url || 'item').replace(/["\\]/g, '')

    for (let n = 1; n < 100; n++) {
      const suffix = n === 1 ? '-copy' : `-copy-${n}`
      const candidate = `${raw.slice(0, 120 - suffix.length)}${suffix}`
      const existing = await request(
        `SELECT id FROM items WHERE url = ${sqlText(candidate)} LIMIT 1`,
        (res) => res[0][0],
      )
      if (!existing) return candidate
    }

    throw new Error('Не удалось подобрать уникальный url')
  }

  // Новая карточка: id и url выдаёт база/этот метод, артикул — как у нового товара, is_active = 0.
  // Опции, картинки и файлы — отдельные записи, файлы скопированы на диск.
  async copyItem(itemId) {
    const safeId = parseInt(itemId, 10)
    if (!safeId) return null

    const source = await request(
      `SELECT * FROM items WHERE id = "${safeId}" LIMIT 1`,
      (res) => res[0][0],
    )
    if (!source) return null

    const category = await request(
      `SELECT url FROM categories WHERE id = "${source.category_id}" LIMIT 1`,
      (res) => res[0][0],
    )
    if (!category?.url) return null

    const url = await this.nextCopyUrl(source.url)
    const article = await this.nextDefaultCode()
    const createdFiles = []
    let newId = null

    try {
      const inserted = await request(`
        INSERT INTO items (
          code, position, url, category_id, name, description, brand, manufacturer_id,
          price, valute_id, purchase_price, profitabilaty, price_postfix,
          seo_title, seo_description, seo_keywords, is_active, is_order_only
        ) VALUES (
          ${sqlText(article)},
          ${sqlNumber(source.position) === 'null' ? 0 : sqlNumber(source.position)},
          ${sqlText(url)},
          ${sqlNumber(source.category_id)},
          ${sqlText(source.name)},
          ${sqlText(source.description)},
          ${sqlText(source.brand)},
          ${sqlNumber(source.manufacturer_id)},
          ${sqlText(source.price ?? '')},
          ${sqlNumber(source.valute_id) === 'null' ? 1 : sqlNumber(source.valute_id)},
          ${sqlNumber(source.purchase_price)},
          ${sqlNumber(source.profitabilaty)},
          ${sqlText(source.price_postfix)},
          ${sqlText(source.seo_title)},
          ${sqlText(source.seo_description)},
          ${sqlText(source.seo_keywords)},
          0,
          ${toSqlBool(source.is_order_only)}
        )
      `)

      newId = inserted?.insertId
      if (!newId) throw new Error('Insert did not return id')

      const images =
        (await request(`SELECT * FROM images WHERE item_id = "${safeId}"`)) ||
        []
      for (const image of images) {
        const copied = await copyStoredFile('images', image.src)
        if (!copied) continue
        createdFiles.push(copied.path)
        await request(`
          INSERT INTO images (item_id, src, is_main)
          VALUES ("${newId}", ${sqlText(copied.src)}, ${image.is_main ? 1 : 0})
        `)
      }

      const files =
        (await request(`SELECT * FROM files WHERE item_id = "${safeId}"`)) || []
      for (const file of files) {
        const copied = await copyStoredFile('files', file.src)
        if (!copied) continue
        createdFiles.push(copied.path)
        await request(`
          INSERT INTO files (item_id, src, title, icon)
          VALUES (
            "${newId}",
            ${sqlText(copied.src)},
            ${sqlText(file.title || '')},
            ${sqlText(file.icon || '')}
          )
        `)
      }

      const options =
        (await request(`SELECT * FROM options WHERE item_id = "${safeId}"`)) ||
        []
      for (const option of options) {
        await request(`
          INSERT INTO options (
            item_id, position, name, value, show_item, show_menu, is_dropdown
          ) VALUES (
            "${newId}",
            ${sqlNumber(option.position) === 'null' ? 0 : sqlNumber(option.position)},
            ${sqlText(option.name || '')},
            ${sqlText(option.value || '')},
            ${option.show_item ? 1 : 0},
            ${option.show_menu ? 1 : 0},
            ${option.is_dropdown ? 1 : 0}
          )
        `)
      }

      writeLog('Item was copied')
      return { id: newId, url, category_url: category.url }
    } catch (error) {
      await Promise.all(
        createdFiles.map((filePath) => fs.unlink(filePath).catch(() => {})),
      )
      if (newId) {
        await request(`DELETE FROM items WHERE id = "${newId}"`).catch(() => {})
      }
      throw error
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
