const { request } = require('../db/database')
const { writeLog } = require('../writeLog')

const SORT_MODES = [
  'manual',
  'alphabet',
  'random',
  'price_asc',
  'price_desc',
  'newest',
]

const resolveSortMode = (value) =>
  SORT_MODES.includes(value) ? value : 'manual'

class CategoriesServices {
  async getAllCategories() {
    return await request('SELECT * FROM categories')
  }

  async getAllCategoriesWithItemsCount() {
    return await request(`
      SELECT
        c.*,
        COALESCE(p.items_count, 0) AS items_count
      FROM categories c
      LEFT JOIN (
        SELECT
          category_id,
          COUNT(*) AS items_count
        FROM items
        GROUP BY category_id
      ) p ON p.category_id = c.id  
    `)
  }

  // get all categories by parent_id
  async getAllCategoriesByParentId(parent_id) {
    if (parent_id === null) {
      return await request(`SELECT * FROM categories WHERE parent_id IS null`)
    }
    return await request('SELECT * FROM categories WHERE parent_id = ?', [
      parent_id,
    ])
  }

  // add new category
  async addCategory(category) {
    if (category.parent_id !== null) {
      await request('UPDATE categories SET is_contains = 1 WHERE id = ?', [
        category.parent_id,
      ])
    }

    await request('INSERT INTO categories SET ?', [
      {
        active: 0,
        name: category.name,
        parent_id: category.parent_id,
        is_contains: 0,
        position: category.position,
        description: category.description,
        url: category.url,
        seo_title: category.seo_title,
        seo_description: category.seo_description,
        seo_keywords: category.seo_keywords,
        sort_mode: resolveSortMode(category.sort_mode),
      },
    ])

    const last = await request(
      'SELECT MAX(id) as id FROM categories',
      [],
      (d) => d[0][0],
    )
    const categoryData = await request(
      'SELECT * FROM categories WHERE id = ?',
      [last.id],
      (d) => d[0][0],
    )

    writeLog('Category was added')
    return { status: true, data: categoryData }
  }

  // change category by id
  async changeCategoryById(category) {
    try {
      await request('UPDATE categories SET ? WHERE id = ?', [
        {
          position: category.position,
          url: category.url,
          name: category.name,
          description: category.description,
          seo_title: category.seo_title,
          seo_description: category.seo_description,
          seo_keywords: category.seo_keywords,
          sort_mode: resolveSortMode(category.sort_mode),
        },
        category.id,
      ])
    } catch (e) {
      console.error(e)
    }
  }

  async changeCategoryImage({ id, url }) {
    try {
      await request('UPDATE categories SET image = ? WHERE id = ?', [url, id])
    } catch (e) {
      console.error(e)
    }
  }

  async changeCategoryActiveById(active, id) {
    try {
      await request('UPDATE categories SET active = ? WHERE id = ?', [
        active ? 1 : 0,
        id,
      ])
    } catch (e) {
      console.error(e)
    }
  }

  // delete category by id
  async deleteCategoryById(id) {
    Promise.all([
      await request('DELETE FROM categories WHERE id = ?', [id]),
      await request('DELETE FROM categories WHERE parent_id = ?', [id]),
    ])
      .then(() => {
        writeLog('Category was deleted')
        return { status: true }
      })
      .catch(() => {
        writeLog('Deleting category was failed')
        return { status: false }
      })
  }
}

module.exports = new CategoriesServices()
