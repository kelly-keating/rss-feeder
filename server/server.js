const path = require('path')
const express = require('express')

const routes = require('./routes')
const youtube = require('./routes/youtubeApi')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/v1', routes)

server.get('/v1/youtube/channel/:id', (req, res) => {
  youtube.getChannelFeed(req.params.id)
    .then(feed => res.json(feed))
    .catch(err => console.log(err.message))
})

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

module.exports = server
