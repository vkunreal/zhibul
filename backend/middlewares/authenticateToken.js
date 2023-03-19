const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']

  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.status(400).json({ status: false })

  jwt.verify(token, process.env.secret_key, (err, user) => {
    console.error(err)
    if (err) return res.status(403).json({ status: false })

    req.user = user

    next()
  })
}

module.exports = authenticateToken
