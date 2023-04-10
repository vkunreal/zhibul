const { request } = require('../db/database')

class TrailerServices {
  async getTrailers() {
    return await request('SELECT * FROM trailer_rent')
  }

  async getTrailer(trailer_id) {
    return await request(`SELECT * FROM trailer WHERE id = "${trailer_id}"`)
  }

  async getTrailerOptions(trailer_id) {
    return await request(
      `SELECT * FROM trailer_options WHERE trailer_id = "${trailer_id}"`
    )
  }

  async getTrailerImages(trailer_id) {
    return await request(
      `SELECT * FROM trailer_images WHERE trailer_id = "${trailer_id}"`
    )
  }

  async addTrailer(title, text) {
    return await request(`
      INSERT INTO trailer_rent (title, text)
      VALUES
      ("${title}", "${text}")
    `)
  }

  async addOption(trailer_id, icon, name, text) {
    return await request(`
      INSERT INTO (trailer_id, icon, name, text)
      VALUES
      ("${trailer_id}", "${icon}", "${name}", "${text}")
    `)
  }

  async addImage(trailer_id, src) {
    return await request(`
      INSERT INTO trailer_images (trailer_id, src)
      VALUES
      ("${trailer_id}", "${src}")
    `)
  }

  async changeTrailer(id, title, text) {
    return await request(`
      UPDATE trailer_rent SET title = "${title}" WHERE id = "${id}";
      UPDATE trailer_rent SET text = "${text}" WHERE id = "${id}";
    `)
  }

  async changeOption(option_id, icon, name, text) {
    return await request(`
      UPDATE trailer_options SET icon = "${icon}" WHERE id = "${option_id}";
      UPDATE trailer_options SET name = "${name}" WHERE id = "${option_id}";
      UPDATE trailer_options SET text = "${text}" WHERE id = "${option_id}";
    `)
  }

  async deleteTrailer(trailer_id) {
    return await request(`DELETE FROM trailer_rent WHERE id = "${trailer_id}"`)
  }

  async deleteOption(option_id) {
    return await request(
      `DELETE FROM trailer_options WHERE id = "${option_id}"`
    )
  }

  async deleteOptionsByTrailerId(trailer_id) {
    return await request(
      `DELETE FROM trailer_options WHERE trailer_id = "${trailer_id}"`
    )
  }

  async deleteImageDB(src) {
    return await request(`DELETE FROM trailer_images WHERE src = "${src}"`)
  }
}

module.exports = new TrailerServices()
