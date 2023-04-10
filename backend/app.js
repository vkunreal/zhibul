require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const { existsSync } = require('fs')

const app = express()
const PORT = process.env.PORT || 5000

const AuthRouter = require('./routers/AuthRouter')
const ItemsRouter = require('./routers/ItemsRouter')
const CategoriesRouter = require('./routers/CategoriesRouter')
const UsersRouter = require('./routers/UsersRouter')
const OptionsRouter = require('./routers/OptionsRouter')
const VariablesRouter = require('./routers/VariablesRouter')
const PagesRouter = require('./routers/PagesRouter')
const SliderRouter = require('./routers/SliderRouter')
const FilesRouter = require('./routers/FilesRouter')
const TrailersRouter = require('./routers/TrailersRouter')

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.static(path.resolve(__dirname, 'build')))
app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(fileUpload({}))

app.use('/api', AuthRouter)
app.use('/api', ItemsRouter)
app.use('/api', CategoriesRouter)
app.use('/api', UsersRouter)
app.use('/api', OptionsRouter)
app.use('/api', VariablesRouter)
app.use('/api', PagesRouter)
app.use('/api', SliderRouter)
app.use('/api', FilesRouter)
app.use('/api', TrailersRouter)

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

app.get('/slider/:image', (req, res) => {
  const imagePath = path.resolve(
    __dirname,
    'public',
    'slider',
    req.params.image
  )
  if (existsSync(imagePath)) {
    res.sendFile(imagePath)
  } else {
    res.status(400).json({ status: false })
  }
})

app.get('/files/:file', (req, res) => {
  const filePath = path.resolve(__dirname, 'public', 'files', req.params.file)
  if (existsSync(filePath)) {
    res.sendFile(filePath)
  } else {
    res.status(400).json({ status: false })
  }
})

app.get('*', (req, res) => {
  const client = path.resolve(__dirname, 'build', 'index.html')
  res.sendFile(client)
})

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT)
})
