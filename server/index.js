"use strict"
require('dotenv').config();
const PORT          = process.env.PORT
const express       = require("express")
const bodyParser    = require("body-parser")
const app           = express()
const MongoClient   = require("mongodb").MongoClient
const MONGODB_URI   = process.env.MONGODB_URI
const path          = require('path')
const sassMiddleware = require('node-sass-middleware')
var winston = require('winston')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(sassMiddleware({
  /* Options */
  src: path.join(__dirname, '/styles')
  , response: false
  , dest: path.join(__dirname, '../public/styles')
  , outputStyle: 'extended'
  , prefix: '/styles'
}));
app.use(express.static("public"))

MongoClient.connect(MONGODB_URI, (err, db) => {

const DataHelpers = require("./lib/data-helpers.js")(db)

const tweetsRoutes = require("./routes/tweets")(DataHelpers)

app.use("/tweets", tweetsRoutes)
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT)
})
