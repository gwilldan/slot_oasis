require("dotenv").config();
const { Telegraf, Markup, session, Scenes } = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);
const mongoose = require("mongoose");

// action imports
const { create_wallet } = require("./actions");

// web3 utils
const { importWallet } = require("./utils/web3Utils");

//middleware imports
const { isNewUser } = require("./middlewares");
const { BaseScene } = require("telegraf/scenes");

// scenes imports
const importScene = require("./scenes/importScene");

// connect Database
mongoose.connect(process.env.DB_URI);

bot.start(isNewUser, async (ctx) => {
	await ctx.reply(`Welcome to Slot Oasis, ${ctx.from.first_name}`);
	await ctx.reply(
		" 🔔 To play, you need to create a wallet, would you like to create a new wallet or import an old wallet?"
	);
	await ctx.reply(
		"Wallet Options:",
		Markup.inlineKeyboard([
			[
				Markup.button.callback(" + CREATE WALLET", "create"),
				Markup.button.callback(" ♲ IMPORT WALLET", "import"),
			],

			[
				Markup.button.callback("DELET WALLET", "delete"),
				Markup.button.callback("MANAGE WALLETS", "manage"),
			],
		])
	);
});

const stage = new Scenes.Stage([importScene]);
bot.use(session());
bot.use(stage.middleware());

bot.action("import", (ctx) => ctx.scene.enter("import_scene"));

bot.command("remove", (ctx) => {
	ctx.reply("Keyboard removed", Markup.removeKeyboard());
});

bot.action("manage", isNewUser, (ctx) => {
	ctx.reply("BUYING ALL WHAT YOU'RE SELLING!...");
});

bot.action("create", create_wallet);

bot.action("close", (ctx) => {
	ctx.editMessageText("Closed! Click on Menu or /start for our menu options.");
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
