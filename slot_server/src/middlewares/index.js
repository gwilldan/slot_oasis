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
		const messages = [
			ctx.reply(`Welcome Back, ${user.FirstName}`),
			ctx.reply(
				"Hit a new milestone today on Slot Oasis ... ",
				Markup.inlineKeyboard([
					[
						Markup.button.url(
							"\u2003 🕹️ Play Slot Oasis \u2003 ",
							"https://slot-oasis.vercel.app/"
						),
					],
				])
			),
		];
		await Promise.all(messages);

		// ctx.sendPhoto("../../public/logo.png", {
		// 	caption: "Hit a new milestone today on Slot Oasis...",
		// 	reply_markup: Markup.inlineKeyboard([
		// 		[
		// 			Markup.button.url(
		// 				"\u2003 🕹️ Play Slot Oasis \u2003 ",
		// 				"https://slot-oasis.vercel.app/"
		// 			),
		// 		],
		// 	]),
		// });
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
