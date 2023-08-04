const replaceQuotes = (string) => {
  return string.replaceAll(`'`, `\\'`).replaceAll(`"`, `\\"`)
}

module.exports = { replaceQuotes }
