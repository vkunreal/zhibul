const { request } = require('../db/database')

class FilesServices {
  async getFilesByItemId(item_id) {
    return await request(`SELECT * FROM files WHERE item_id = "${item_id}"`)
  }

  async addFileByItemId(item_id, src, title, icon) {
    await request(`
      INSERT INTO files (item_id, src, title, icon)
      VALUES
      ("${item_id}", "${src}", "${title}", "${icon}")`)
  }

  async deleteFileBySrc(src) {
    await request(`DELETE FROM files WHERE src = "${src}"`)
  }

  async deleteFilesByItemId(item_id) {
    const safeId = parseInt(item_id, 10)
    if (!safeId) return { status: false }

    await request(`DELETE FROM files WHERE item_id = "${safeId}"`)
    return { status: true }
  }
}

module.exports = new FilesServices()
