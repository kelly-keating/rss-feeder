const knex = require('knex')
const env = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[env]
const db = knex(config)

function getGroups () {
  return db('Groups')
}

function addGroup (name) {
  return db('Groups')
    .insert({ name })
}

function subExists (id) {
  return db('Subscriptions')
    .where('id', id)
    .then(matches => {
      if (matches.length > 0) throw Error('Already subscribed')
    })
}

function getSubscriptions () {
  return db('Subscriptions')
}

function addSub (subscription) {
  return db('Subscriptions')
    .insert(subscription)
}

function getLastUpdate (id) {
  return db('Subscriptions')
    .where('id', id)
    .first()
    .then(match => match.last_updated)
}

function setUpdated (timeStr) {
  return db('Subscriptions')
    .update({ last_updated: timeStr })
}

function vidExists (id) {
  return db('Videos')
    .where('id', id)
    .then(matches => {
      if (matches.length > 0) throw Error('Already subscribed')
    })
}

function getVideos () {
  return db('Videos')
}

function getVideosByChannel (id) {
  return db('Videos')
    .where('sub_id', id)
}

function getVideoById (id) {
  return db('Videos')
    .where('id', id)
    .first()
}

function addVideos (videos) {
  return db('Videos')
    .insert(videos)
}

function updateVideo (id, video) {
  return db('Videos')
    .update(video)
    .where('id', id)
}

function deleteVideo (id) {
  return db('Videos')
    .del()
    .where('id', id)
}

module.exports = {
  getGroups,
  addGroup,

  subExists,
  getSubscriptions,
  addSub,
  getLastUpdate,
  setUpdated,

  vidExists,
  getVideos,
  getVideosByChannel,
  getVideoById,
  addVideos,
  updateVideo,
  deleteVideo
}
