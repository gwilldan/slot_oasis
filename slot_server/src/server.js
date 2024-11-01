require("dotenv").config();
const { Telegraf, Markup, session, Scenes } = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);
const mongoose = require("mongoose");

// command imports
const walletCommand = require("./commands/walletCommand");

// action imports
const { create_wallet } = require("./actions");

// web3 utils
const {} = require("./utils/web3Utils");

//middleware imports
const { isNewUser, isNewUserWallet } = require("./middlewares");
const { BaseScene } = require("telegraf/scenes");

// scenes imports
const importScene = require("./scenes/importScene");

// connect Database
mongoose.connect(process.env.DB_URI);

bot.start(isNewUser, async (ctx) => {
	ctx.reply(`Welcome to Slot Oasis, ${ctx.from.first_name}`);
	await ctx.reply(
		" 🔔 To play, you need to create a wallet, would you like to create a new wallet or import an old wallet?"
	);
	await ctx.reply(
		"Wallet Options:",
		Markup.inlineKeyboard([
			[
				Markup.button.callback("\u2003+ CREATE WALLET \u2003", "create"),
				Markup.button.callback("\u2003♲ IMPORT WALLET \u2003", "import"),
			],
		])
	);
});

const stage = new Scenes.Stage([importScene]);
bot.use(session());
bot.use(stage.middleware());

bot.command("wallet", isNewUserWallet, walletCommand);

bot.action("import", (ctx) => ctx.scene.enter("import_scene"));
bot.action("create", create_wallet);

bot.action("cancel", (ctx) => {
	ctx.editMessageText(
		"Cancelled! Click on Menu or /start for our menu options."
	);
	ctx.scene.leave();
});

bot.on("text", async (ctx) => {
	console.log(ctx.message.text);
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
