const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String
});

const admin = mongoose.model("admin", adminSchema);

module.exports = admin;