var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
var users = new Schema({
    name: String,
    userID: String,
    password:String
}, { collection: "users" });
module.exports = mongoose.model('users', users);