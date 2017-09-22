"use strict"

const ObjectId      = require("mongodb").ObjectId

module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
        db.collection('tweets').insertOne(newTweet, (err, result) => {
          if (err) {
            return callback(err)
          }
          
          callback(null, true)
        })
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      const sortNewestFirst = (a, b) => b.created_at - a.created_at
      db.collection('tweets').find().toArray((err, tweets) => {
        callback(null, tweets)
      })
    },

    likeTweets: function(data, callback) {
      // var doc = db.collection('tweets').find( { "_id" : data.id} )
      console.log('Sending to DB: ', data)
      db.collection('tweets').update( { "_id" : ObjectId(data.id) }, { $set: { liked: data.liked } }, (err, result) => {
        if (err) {
          return callback(err)
        }

        callback(null, true)
      } )
    }

  }
}
