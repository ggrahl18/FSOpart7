const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs') //!!!

const middleware = require('./utils/middleware')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}

console.log('connecting to', config.MONGODB_URI)

// mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
mongoose.connect(config.MONGODB_URI, connectionOptions)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app