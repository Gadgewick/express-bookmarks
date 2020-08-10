require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const bookmarksRouter = require('./bookmarks-router/bookmarks-router');
const { v4: uuidv4 } = require('uuid');
const app = express();

console.log(uuidv4())


const winston = require('winston')
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'info.log' })
  ]
})

if (!['production', 'test'].includes(NODE_ENV)) {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test'
}))
app.use(helmet())
app.use(bookmarksRouter)
app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN
  const authToken = req.get('Authorization')
  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized User' })
  }
  next()
})



app.get('/', (req, res) => {
    res.send('Hello, world!')
    })

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
     response = { error: { message: 'server error' } }
    } else {
    console.error(error)
    response = { message: error.message, error }
    }
    res.status(500).json(response)
    })
app.use(cors())

module.exports = app