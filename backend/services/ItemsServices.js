const fs = require('fs/promises')
const path = require('path')

const { request } = require('../db/database')
const { writeLog } = require('../writeLog')

const publicDir = path.resolve(__dirname, '..', 'public')

const toNumber = (value) => {
  if (value === null || value === undefined || value === '') return null
  const number = Number(value)
  return Number.isFinite(number) ? number : null
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

const queryItemsByCategoryUrl = ({ onlyActive = false } = {}) => {
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
  JOIN categories c ON it.category_id = c.id AND c.url = ?
  JOIN countries ct ON ct.id = it.manufacturer_id
  WHERE 1 = 1 ${activeFilter}
  GROUP BY it.id
`
}

const queryItemByUrl = `
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
  WHERE it.url = ?
  GROUP BY it.id
`

const queryItemById = `
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
  WHERE it.id = ?
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

    const safeCategoryUrl = categoryUrl ? String(categoryUrl) : ''
    // LIKE-метасимволы убираем, чтобы % и _ во вводе искались как текст.
    const safeSearch = String(search || '')
      .trim()
      .replace(/[\\%_]/g, '')
      .slice(0, 100)
    const searchFilter = safeSearch ? '(it.name LIKE ? OR it.code LIKE ?)' : ''
    const searchParams = safeSearch
      ? [`%${safeSearch}%`, `%${safeSearch}%`]
      : []
    const categoryParams = safeCategoryUrl ? [safeCategoryUrl] : []

    const baseQuery = safeCategoryUrl ? queryItemsByCategoryUrl() : queryItems
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
         JOIN categories c ON it.category_id = c.id AND c.url = ?
         ${searchFilter ? `WHERE ${searchFilter}` : ''}`
      : `SELECT COUNT(*) as count FROM items it
         ${searchFilter ? `WHERE ${searchFilter}` : ''}`

    const items = await request(
      `${filteredQuery} ORDER BY it.position ASC, it.id ASC LIMIT ? OFFSET ?`,
      [...categoryParams, ...searchParams, limit, (page - 1) * limit],
    )

    const { count } = await request(
      countQuery,
      [...categoryParams, ...searchParams],
      (res) => res[0][0],
    )

    return { items, count: Number(count) }
  }

  async getCountries() {
    return await request('SELECT * FROM countries')
  }

  async getItemsFromCategoryUrl(category_url, { onlyActive = false } = {}) {
    try {
      const safeUrl = String(category_url)
      let sortMode = 'manual'

      if (onlyActive) {
        const category = await request(
          'SELECT sort_mode FROM categories WHERE url = ? LIMIT 1',
          [safeUrl],
          (res) => res[0][0],
        )
        sortMode = category?.sort_mode || 'manual'
      }

      // ORDER BY не передать через ?, поэтому он берётся только из SORT_MODE_ORDER_BY.
      const orderBy = SORT_MODE_ORDER_BY[sortMode] || SORT_MODE_ORDER_BY.manual

      return await request(
        `${queryItemsByCategoryUrl({ onlyActive })} ORDER BY ${orderBy}`,
        [safeUrl],
      )
    } catch (e) {
      console.error(e)
    }
  }

  async getItemImages(item_id) {
    return await request('SELECT * FROM images WHERE item_id = ?', [item_id])
  }

  // get item from db by id
  async getItemFromId(item_id) {
    try {
      const safeId = parseInt(item_id, 10)
      if (!safeId) return null

      return await request(queryItemById, [safeId], (res) => res[0][0])
    } catch (e) {
      console.error(e)
    }
  }

  async getItemFromUrl(item_url) {
    try {
      return await request(queryItemByUrl, [item_url], (it) => it[0][0])
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
    const hasExcept = Number.isInteger(except) && except > 0
    const row = await request(
      `SELECT id FROM items WHERE code = ?${hasExcept ? ' AND id != ?' : ''} LIMIT 1`,
      hasExcept ? [article, except] : [article],
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
      [],
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
      // Пустые значения полей сохраняются как null.
      const fields = {
        category_id,
        name,
        position,
        url,
        description,
        brand,
        manufacturer_id: manufacturer,
        price,
        valute_id,
        purchase_price,
        profitabilaty,
        price_postfix,
        seo_title,
        seo_description,
        seo_keywords,
      }
      if (code !== undefined) fields.code = normalizeCode(code)

      const changes = {}
      for (const [field, value] of Object.entries(fields)) {
        changes[field] = value || null
      }
      changes.is_active = toSqlBool(is_active)
      changes.is_order_only = toSqlBool(is_order_only)

      await request('UPDATE items SET ? WHERE id = ?', [changes, item_id])

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
      await request('INSERT INTO items SET ?', [
        {
          code: article,
          position,
          url,
          category_id,
          name,
          description,
          brand,
          manufacturer_id: manufacturer,
          price,
          valute_id: valute_id || 1,
          purchase_price: purchase_price || null,
          profitabilaty: profitabilaty || null,
          price_postfix,
          seo_title,
          seo_description,
          seo_keywords,
          is_active: toSqlBool(is_active),
          is_order_only: toSqlBool(is_order_only),
        },
      ])

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
      await request('DELETE FROM items WHERE id = ?', [item_id])

      writeLog('Item was delete')
      return { status: true }
    } catch (e) {
      console.error(e)
    }
  }

  async addImageToDB(item_id, imageName) {
    try {
      await request('INSERT INTO images SET ?', [{ item_id, src: imageName }])
    } catch (e) {
      console.error(e)
    }
  }

  async putMainImage(src) {
    try {
      const result = await request(
        'SELECT item_id FROM images WHERE src = ?',
        [src],
        (res) => res[0][0],
      )
      await request('UPDATE images SET is_main = 0 WHERE item_id = ?', [
        result.item_id,
      ])
      await request('UPDATE images SET is_main = 1 WHERE src = ?', [src])
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
        'SELECT id FROM items WHERE url = ? LIMIT 1',
        [candidate],
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
      'SELECT * FROM items WHERE id = ? LIMIT 1',
      [safeId],
      (res) => res[0][0],
    )
    if (!source) return null

    const category = await request(
      'SELECT url FROM categories WHERE id = ? LIMIT 1',
      [source.category_id],
      (res) => res[0][0],
    )
    if (!category?.url) return null

    const url = await this.nextCopyUrl(source.url)
    const article = await this.nextDefaultCode()
    const createdFiles = []
    let newId = null

    try {
      const inserted = await request('INSERT INTO items SET ?', [
        {
          code: article,
          position: toNumber(source.position) ?? 0,
          url,
          category_id: toNumber(source.category_id),
          name: source.name,
          description: source.description,
          brand: source.brand,
          manufacturer_id: toNumber(source.manufacturer_id),
          price: source.price ?? '',
          valute_id: toNumber(source.valute_id) ?? 1,
          purchase_price: toNumber(source.purchase_price),
          profitabilaty: toNumber(source.profitabilaty),
          price_postfix: source.price_postfix,
          seo_title: source.seo_title,
          seo_description: source.seo_description,
          seo_keywords: source.seo_keywords,
          is_active: 0,
          is_order_only: toSqlBool(source.is_order_only),
        },
      ])

      newId = inserted?.insertId
      if (!newId) throw new Error('Insert did not return id')

      const images =
        (await request('SELECT * FROM images WHERE item_id = ?', [safeId])) ||
        []
      for (const image of images) {
        const copied = await copyStoredFile('images', image.src)
        if (!copied) continue
        createdFiles.push(copied.path)
        await request('INSERT INTO images SET ?', [
          { item_id: newId, src: copied.src, is_main: image.is_main ? 1 : 0 },
        ])
      }

      const files =
        (await request('SELECT * FROM files WHERE item_id = ?', [safeId])) || []
      for (const file of files) {
        const copied = await copyStoredFile('files', file.src)
        if (!copied) continue
        createdFiles.push(copied.path)
        await request('INSERT INTO files SET ?', [
          {
            item_id: newId,
            src: copied.src,
            title: file.title || '',
            icon: file.icon || '',
          },
        ])
      }

      const options =
        (await request('SELECT * FROM options WHERE item_id = ?', [safeId])) ||
        []
      for (const option of options) {
        await request('INSERT INTO options SET ?', [
          {
            item_id: newId,
            position: toNumber(option.position) ?? 0,
            name: option.name || '',
            value: option.value || '',
            show_item: option.show_item ? 1 : 0,
            show_menu: option.show_menu ? 1 : 0,
            is_dropdown: option.is_dropdown ? 1 : 0,
          },
        ])
      }

      writeLog('Item was copied')
      return { id: newId, url, category_url: category.url }
    } catch (error) {
      await Promise.all(
        createdFiles.map((filePath) => fs.unlink(filePath).catch(() => {})),
      )
      if (newId) {
        await request('DELETE FROM items WHERE id = ?', [newId]).catch(() => {})
      }
      throw error
    }
  }

  async deleteImageInDB(imageSrc) {
    try {
      await request('DELETE FROM images WHERE src = ?', [imageSrc])
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = new ItemsServices()
