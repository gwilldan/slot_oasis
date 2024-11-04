const { Markup } = require("telegraf");
const userDB = require("../models/User");
const { findUser } = require("../utils/dbUtils");
const { getNativeBal } = require("../utils/web3Utils");

const isNewUser = async (ctx, next) => {
	const user = await findUser(ctx.from.id);
	if (!user) {
		return next();
	} else {
		ctx.session = user;
		console.log(ctx.session);
		const messages = [
			ctx.reply(`Welcome Back, ${user.FirstName}`),
			ctx.reply("Hit a new milestone today on Slot Oasis ... "),
		];
		await Promise.all(messages);
	}
};

const isNewUserWallet = async (ctx, next) => {
	const user = await findUser(ctx.from.id);

	if (user) {
		const bal = await getNativeBal(user.address);
		ctx.state.user = user;
		ctx.state.userBal = bal;
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
