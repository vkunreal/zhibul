const { request } = require('../db/database')
const { writeLog } = require('../writeLog')

class CategoriesServices {
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
  async addCategory(name, parent_id) {
    await request(
      `UPDATE categories SET is_contains = "1" WHERE id = "${parent_id}"`
    )

    await request(`
      INSERT INTO categories (name, parent_id, is_contains)
      VALUES ("${name}", "${parent_id}", 0)
    `)

    writeLog('Category was added')
    return { status: true }
  }

  // delete category by id
  async deleteCategoryById(id) {
    await request(`DELETE FROM categories WHERE id = "${id}"`)

    writeLog('Category was deleted')
    return { status: true }
  }
}

module.exports = new CategoriesServices()
