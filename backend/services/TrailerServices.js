const { request } = require('../db/database')

class TrailerServices {
  async getTrailerRents() {
    return await request('SELECT * FROM trailer_rent')
  }

  async getTrailers() {
    return await request('SELECT * FROM trailers')
  }

  async getTrailersByUrl(url) {
    return await request(
      `
      SELECT
        t.id,
        t.trailer_rent_id,
        t.title,
        t.text,
        tr.url
      FROM trailers t
      JOIN trailer_rent tr ON t.trailer_rent_id = tr.id AND tr.url = ?
      GROUP BY t.id
    `,
      [url]
    )
  }

  async getTrailer(trailer_id) {
    return await request('SELECT * FROM trailers WHERE id = ?', [trailer_id])
  }

  async getTrailerOptions(trailer_id) {
    return await request(
      'SELECT * FROM trailer_options WHERE trailer_id = ?',
      [trailer_id]
    )
  }

  async getTrailerImages(trailer_id) {
    return await request(
      'SELECT * FROM trailer_images WHERE trailer_id = ?',
      [trailer_id]
    )
  }

  async addTrailer(rent_id, title, text) {
    return await request('INSERT INTO trailers SET ?', [
      { trailer_rent_id: rent_id, title, text },
    ])
  }

  async addOption(trailer_id, icon, name, text) {
    return await request('INSERT INTO trailer_options SET ?', [
      { trailer_id, icon, name, text },
    ])
  }

  async addImage(trailer_id, src) {
    return await request('INSERT INTO trailer_images SET ?', [
      { trailer_id, src },
    ])
  }

  async changeTrailer(id, rent_id, title, text) {
    return await request('UPDATE trailers SET ? WHERE id = ?', [
      { trailer_rent_id: rent_id, title, text },
      id,
    ])
  }

  async changeOption(option_id, icon, name, text) {
    return await request('UPDATE trailer_options SET ? WHERE id = ?', [
      { icon, name, text },
      option_id,
    ])
  }

  async deleteTrailer(trailer_id) {
    return await request('DELETE FROM trailers WHERE id = ?', [trailer_id])
  }

  async deleteOption(option_id) {
    return await request('DELETE FROM trailer_options WHERE id = ?', [
      option_id,
    ])
  }

  async deleteOptionsByTrailerId(trailer_id) {
    return await request('DELETE FROM trailer_options WHERE trailer_id = ?', [
      trailer_id,
    ])
  }

  async deleteImageDB(src) {
    return await request('DELETE FROM trailer_images WHERE src = ?', [src])
  }
}

module.exports = new TrailerServices()
