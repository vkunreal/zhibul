const { request } = require('../db/database')
const { replaceQuotes } = require('../utils/quotes')
const { writeLog } = require('../writeLog')

class CategoriesServices {
  async getAllCategories() {
    return await request('SELECT * FROM categories')
  }

  // get all categories by parent_id
  async getAllCategoriesByParentId(parent_id) {
    if (parent_id === null) {
      return await request(`SELECT * FROM categories WHERE parent_id IS null`)
    }
    return await request(
      `SELECT * FROM categories WHERE parent_id = "${parent_id}";`
    )
  }

  // add new category
  async addCategory(category) {
    if (category.parent_id !== null) {
      await request(
        `UPDATE categories SET is_contains = "1" WHERE id = "${category.parent_id}"`
      )
      await request(`
        INSERT INTO categories (active, name, parent_id, is_contains, position, description, url, seo_title, seo_description, seo_keywords)
        VALUES ("0", "${category.name}", "${category.parent_id}", 0, "${
        category.position
      }", "${replaceQuotes(category.description)}", "${
        category.url
      }", "${replaceQuotes(category.seo_title)}", "${replaceQuotes(
        category.seo_description
      )}", "${replaceQuotes(category.seo_keywords)}")
      `)
    } else {
      await request(`
        INSERT INTO categories (active, name, parent_id, is_contains, position, description, url, seo_title, seo_description, seo_keywords)
        VALUES ("0", "${category.name}", ${category.parent_id}, 0, "${category.position}", "${category.description}", "${category.url}", "${category.seo_title}", "${category.seo_description}", "${category.seo_keywords}")
      `)
    }

    const last = await request(
      'SELECT MAX(id) as id FROM categories',
      (d) => d[0][0]
    )
    const categoryData = await request(
      `SELECT * FROM categories WHERE id = "${last.id}"`,
      (d) => d[0][0]
    )

    writeLog('Category was added')
    return { status: true, data: categoryData }
  }

  // change category by id
  async changeCategoryById(category) {
    try {
      const updateCategoryField = async (field, value) =>
        await request(
          `UPDATE categories SET ${field} = "${value}" WHERE id = "${category.id}"`
        )

      updateCategoryField('position', category.position)
      updateCategoryField('url', category.url)
      updateCategoryField('name', replaceQuotes(category.name))
      updateCategoryField('description', replaceQuotes(category.description))
      updateCategoryField('seo_title', replaceQuotes(category.seo_title))
      updateCategoryField(
        'seo_description',
        replaceQuotes(category.seo_description)
      )
      updateCategoryField('seo_keywords', replaceQuotes(category.seo_keywords))
    } catch (e) {
      console.error(e)
    }
  }

  async changeCategoryImage({ id, url }) {
    try {
      await request(`UPDATE categories SET image = "${url}" WHERE id = "${id}"`)
    } catch (e) {
      console.error(e)
    }
  }

  async changeCategoryActiveById(active, id) {
    try {
      await request(
        `UPDATE categories SET active = "${active ? 1 : 0}" WHERE id = "${id}"`
      )
    } catch (e) {
      console.error(e)
    }
  }

  // delete category by id
  async deleteCategoryById(id) {
    Promise.all([
      await request(`DELETE FROM categories WHERE id = "${id}"`),
      await request(`DELETE FROM categories WHERE parent_id = "${id}"`),
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
