const fs = require('fs')
const path = require('path')

const writeLog = (text, logPath = 'server.log') => {
  const resultPath = path.resolve(__dirname, 'logs', logPath)
  text += '\n'

  try {
    if (fs.existsSync(resultPath)) {
      fs.appendFile(resultPath, text, (err) => {
        if (err) throw err
      })
    } else {
      fs.writeFile(resultPath, text, (err) => {
        if (err) throw err
      })
    }
  } catch (e) {
    console.error('Writing log: ', e)
  }
}

module.exports = { writeLog }
