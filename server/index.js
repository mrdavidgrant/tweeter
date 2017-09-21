"use strict"
require('dotenv').config();
const PORT          = process.env.PORT
const express       = require("express")
const bodyParser    = require("body-parser")
const app           = express()
const MongoClient   = require("mongodb").MongoClient
const MONGODB_URI   = process.env.MONGODB_URI
const morgan        = require('morgan')
const cookieSession = require('cookie-session')
const methodOverride = require('method-override')

app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cookieSession({
  name: 'user_id',
  keys: ['asdlfiv vsagfjsahfvakjsdfhsnkvdjgnhskdglsvdhngsdgh bsdlkfghsvnaslkfdjvhngsdkghsdngvksdhn', 'asfdlkjfsahsadfas'],
}))
app.use(morgan('dev'))

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    throw err
  }
  const DataHelpers = require("./lib/data-helpers.js")(db)

  const tweetsRoutes = require("./routes/tweets")(DataHelpers)

  app.use("/tweets", tweetsRoutes)

})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT)
})
