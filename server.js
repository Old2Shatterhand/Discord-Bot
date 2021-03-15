
const express = require('express')

const server = express()

server.all('/', (res, req) => {
  res.send('Bot is running')
})

const runner = () => {
  server.listen(3000, () => {
    console.log('Ready')
  })
}

module.exports = runner