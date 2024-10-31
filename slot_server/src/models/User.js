const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	userId: { type: Number, immutable: true },
	username: String,
	FirstName: String,
	address: String,
	luck: Number,
	refLink: String,
	enc: {
		pkey: { type: String, immutable: true },
		iv: { type: String, immutable: true },
		authTag: { type: String, immutable: true },
	},
});

module.exports = mongoose.model("User", UserSchema);
