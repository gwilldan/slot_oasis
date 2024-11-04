const { Markup } = require("telegraf");

const walletCommand = async (ctx) => {
	try {
		user = ctx.state.user;
		ctx.reply(
			` 
                    🔔 Wallet address: \n ${user.address} \n\n💰 $tCORE Bal: ${ctx.state.userBal} \n\n💰 LUCK Bal: ${user.luck} \n\n📣 LUCK Balance is an offchain player token that is used to play the Slot. Each game entry costs 10 LUCK. \n\nYou can convert your $tCORE to LUCK in the ratio of 1 tCORE = 1,000 LUCK `,
			Markup.inlineKeyboard([
				[Markup.button.callback("🔄 Get Luck", "getLuck")],
				[
					Markup.button.callback("💸 Deposit $tCORE ", "deposit"),
					Markup.button.callback(" 💼 Withdraw $tCORE", "withdraw"),
				],
			])
		);
	} catch (error) {
		ctx.editMessageText("Error! Try again shortly!");
	}
};

module.exports = walletCommand;
