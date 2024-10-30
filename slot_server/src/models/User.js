// const { Mongoose, Schema } = require("mongoose");
// const mongoose = new Mongoose();

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	userId: Number,
	username: String,
	FirstName: String,
	luck: Number,
	refLink: String,
	enc: {
		pkey: String,
		iv: String,
		authTag: String,
	},
});

module.exports = mongoose.model("User", UserSchema);
