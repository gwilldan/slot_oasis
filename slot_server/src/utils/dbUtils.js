const UserDB = require("../models/User");

const findUser = async (userId) => {
	try {
		const user = await UserDB.findOne({ userId });
		if (user) {
			return user;
		} else {
			return null;
		}
	} catch (error) {
		console.log("findUser Error --- ", error?.message);
		return null;
	}
};

const updateUser = async (userId, field, value) => {
	try {
		const user = await UserDB.findOne({
			userId,
		});

		if (user) {
			user[field] = value;
			await user.save();

			return user;
		} else {
			return null;
		}
	} catch (error) {
		console.log("updateUser --- ", error?.message);
		return null;
	}
};

module.exports = {
	findUser,
	updateUser,
};
