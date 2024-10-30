require("dotenv").config();
const { Telegraf, Markup } = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);
const mongoose = require("mongoose");

// action imports
const { create_wallet } = require("./actions");

// web3 utils
const { importWallet } = require("./utils/web3Utils");

//middleware imports
const { isNewUser } = require("./middlewares");

//all the states;
let privateKeyNeeded;

// connect Database
mongoose.connect(process.env.DB_URI);

bot.start(async (ctx) => {
	await ctx.reply(`Welcome to Slot Oasis, ${ctx.from.first_name}`);
	await ctx.reply(
		"To play, you need to create a wallet, would you like to create a new wallet or import an old wallet?"
	);
	await ctx.reply(
		"Wallet Options:",
		Markup.inlineKeyboard([
			[
				Markup.button.callback("CREATE WALLET", "create"),
				Markup.button.callback("IMPORT WALLET", "import"),
			],

			[
				Markup.button.callback("DELET WALLET", "delete"),
				Markup.button.callback("MANAGE WALLETS", "manage"),
			],
		])
	);
});

bot.command("remove", (ctx) => {
	ctx.reply("Keyboard removed", Markup.removeKeyboard());
});

bot.action("import", (ctx) => {
	ctx.reply("To import your wallet, reply with your private key");
	privateKeyNeeded = true;
});

bot.action("manage", (ctx) => {
	ctx.reply("oooo... managing...");
});

// bot.action("manage", isNewUser, (ctx) => {
// 	ctx.reply("BUYING ALL WHAT YOU'RE SELLING!...");
// });

bot.action("create", create_wallet);

bot.on("text", async (ctx) => {
	if (privateKeyNeeded) {
		const privateKey = ctx.text;
		const wallet = importWallet(privateKey);

		if (!wallet) {
			ctx.reply("Invalid Private Key. Confirm and retry ...");
			return;
		}
		ctx.reply(`Wallet Imported successfully. \n\n${wallet.address}`);
	}
});

mongoose.connection.on("connected", (err) => {
	if (err) return console.error("error from db connection ", err);

	bot.launch((err) => {
		if (err) return console.log("error from bot launch", err);

		console.log("Bot luanched!");
	});
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
