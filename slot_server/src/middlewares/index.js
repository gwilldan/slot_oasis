const userDB = require("../models/User");
const { findUser } = require("../utils/dbUtils");

const isNewUser = async (ctx, next) => {
	const user = await findUser(ctx.from.id);
	if (!user) {
		return next();
	} else {
		ctx.reply(`Welcome Back, ${user.FirstName}`);
		ctx.reply("Hit a new milestone today on Slot Oasis ... ");
	}
};

module.exports = {
	isNewUser,
};
