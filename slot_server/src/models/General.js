// const { Mongoose, Schema } = require("mongoose");
// const mongoose = new Mongoose();

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GeneralSchema = new Schema({
	nonce: Number,
	enc: {
		pkey: String,
		iv: String,
		authTag: String,
	},
});

module.exports = mongoose.model("General", GeneralSchema);
