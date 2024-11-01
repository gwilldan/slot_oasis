const { error } = require("console");
const { isNewUserWallet } = require("../middlewares");
const { Markup } = require("telegraf");

const walletCommand = async (ctx) => {
	try {
		user = ctx.state.user;
		const messages = [
			ctx.reply(`💳 ${user.address.slice(0, 4)} ... ${user.address.slice(-4)}`),
			ctx.reply(
				`${user.luck} $LUCK`,
				Markup.inlineKeyboard([
					[Markup.button.callback("🔄 Get $Luck", "getLuck")],
					[
						Markup.button.callback("\u2003 💸 Deposit  \u2003 ", "deposit"),
						Markup.button.callback(" \u2003 💼 Withdraw  \u2003", "withdraw"),
					],
				])
			),
		];

		await Promise.all(messages);
	} catch (error) {
		ctx.editMessageText("Error! Try again shortly!");
	}
};

module.exports = walletCommand;
