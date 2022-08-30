

//=========NOT IN USE========//
const mongoose = require('mongoose');

const dotenv = require('dotenv')
dotenv.config()
const mongoAccessURL = process.env.ACCESS_AUTH

const user_db = mongoose.Schema({
    email: String,
    username: String,
    password: String,
    following: [],
    followers: []
})
const post_db = mongoose.Schema({
    username:String,
    text:String,
    date:Date
})

const userCollection = mongoose.model("usersCollection", user_db, "users")

module.exports = {
    mongoAccessURL,
    userCollection
}