"use strict"

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

    saveUser: function(newUser, callback) {
      db.collection('users').insertOne(newUser, (err, result) => {
        if (err) {
          return callback(err)
        }
        callback(null, true)
      })
  },

  }
}
