const FilesServices = require('../services/FilesServices')

class FilesController {
  async getFiles(req, res) {
    const { item_id } = req.params

    const files = await FilesServices.getFilesByItemId(item_id)

    res.status(200).json(files)
  }

  async addFile(req, res) {
    try {
      const { item_id, title, icon } = req.body

      if (!req.files) {
        return res.status(400).json({ status: false })
      }

      const file = Object.values(req.files)[0]
      if (!file) {
        return res.status(500).json({ status: false })
      }

      const fileName = `file-${item_id}-${Date.now() + file.name}`

      const filePath = path.resolve(
        __dirname,
        '..',
        'public',
        'files',
        fileName
      )

      const fileUrl = 'https://api.zhbl.by/files/' + fileName

      await file.mv(filePath, async (err) => {
        if (err) {
          console.log(err)
          return res.status(500).send(err)
        }
        await FilesServices.addFileByItemId(item_id, fileUrl, title, icon)
      })

      res
        .status(200)
        .json({ status: true, response: { item_id, fileUrl, title, icon } })
    } catch (e) {
      console.error(e)
    }
  }

  async deleteFile(req, res) {
    try {
      const fileName = req.body.src.split('/').pop()
      const filePath = path.resolve(
        __dirname,
        '..',
        'public',
        'files',
        fileName
      )
      fs.unlink(filePath, async (err) => {
        if (err) {
          res.status(500).json({ status: false })
          console.log(err)
        }
        await FilesServices.deleteFileBySrc(
          'https://api.zhbl.by/files/' + fileName
        )
        res.status(200).json({ status: true })
      })
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = new FilesController()
