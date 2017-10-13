var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
	"id" : Number,
	"name" : String,
	"email":String,
	"age" : Number,
	"sex" : String,
	"homeplace":String,
	"telephone" : Number,
	"birthday" : Date,
	"position" : String,
	"entryDate" : Date
});
module.exports = User = mongoose.model("User",userSchema);