const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String,
})
module.exports = mongoose.model('Profile', profileSchema)