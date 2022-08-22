const { request } = require('../db/database')

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

    return await request(`
      INSERT INTO categories (name, parent_id, is_contains)
      VALUES ("${name}", "${parent_id}", 0)
    `)
  }

  // delete category by id
  async deleteCategoryById(id) {
    return await request(`DELETE FROM categories WHERE id = "${id}"`)
  }
}

module.exports = new CategoriesServices()
