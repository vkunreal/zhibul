require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000

const ItemsRouter = require('./routers/ItemsRouter')
const CategoriesRouter = require('./routers/CategoriesRouter')
const UsersRouter = require('./routers/UsersRouter')
const OptionsRouter = require('./routers/OptionsRouter')
const { existsSync } = require('fs')

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }))

app.use('/api', ItemsRouter)
app.use('/api', CategoriesRouter)
app.use('/api', UsersRouter)
app.use('/api', OptionsRouter)

app.get('/', (req, res) => {
  res.status(200).json({ message: req.query.id })
})

app.get('/images/:image', (req, res) => {
  const imagePath = path.resolve(
    __dirname,
    'public',
    'images',
    req.params.image
  )
  if (existsSync(imagePath)) {
    res.sendFile(imagePath)
  } else {
    res.status(400).json({ status: false })
  }
})

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT)
})
