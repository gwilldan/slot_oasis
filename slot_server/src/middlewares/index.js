const { Markup } = require("telegraf");
const userDB = require("../models/User");
const { findUser } = require("../utils/dbUtils");

const isNewUser = async (ctx, next) => {
	const user = await findUser(ctx.from.id);
	if (!user) {
		return next();
	} else {
		ctx.reply(`Welcome Back, ${user.FirstName}`);
		await ctx.reply("Hit a new milestone today on Slot Oasis ... ");
	}
};

const isNewUserWallet = async (ctx, next) => {
	const user = await findUser(ctx.from.id);
	if (user) {
		ctx.state.user = user;
		return next();
	} else {
		ctx.reply(
			`You do not have an active wallet. Kindly create one.`,
			Markup.inlineKeyboard([
				[
					Markup.button.callback(" + CREATE WALLET", "create"),
					Markup.button.callback(" ♲ IMPORT WALLET", "import"),
				],
			])
		);
	}
};

module.exports = {
	isNewUser,
	isNewUserWallet,
};
