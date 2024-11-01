const { BaseScene } = require("telegraf/scenes");
const { findUser } = require("../utils/dbUtils");
const { Wallet } = require("ethers");
const UserDB = require("../models/User");
const { Markup } = require("telegraf");
const { encryptKey, generateRef } = require("../utils/helpers");

const importScene = new BaseScene("import_scene");
importScene.enter((ctx) => {
	ctx.editMessageText("Please, input your private key.");
	ctx.state.pkeyUpdated = false;
});

importScene.on("text", async (ctx) => {
	try {
		if (!ctx.state.pkeyUpdated) {
			const user = await findUser(ctx.from.id);

			if (user) {
				return ctx.reply(
					`Found wallet associated with ${user.FirstName}. \nWallet address: \n${user.address}`
				);
			}

			const newWallet = new Wallet(ctx.text);
			const enc = encryptKey(newWallet.privateKey);

			const refLink = generateRef();
			console.log(refLink, enc);

			await UserDB.create({
				enc: enc,
				FirstName: ctx.from.first_name,
				luck: 0,
				refLink: refLink,
				userId: ctx.from.id,
				address: newWallet.address,
				username: ctx.from.username,
			});

			ctx.reply(
				`✅ Your wallet has been Imported ... \n\nWALLET ADDRESS: \n${newWallet.address}.

			\nYOUR REFERRAL LINK: \nhttps://t.me/SlotOasisBot?start=${refLink} `
			);
			ctx.scene.leave();
		}
	} catch (error) {
		if (error?.shortMessage?.includes("invalid BytesLike value")) {
			console.log(error.shortMessage);
			ctx.reply(
				"⚠️ Invalid private key. Input a valid private key ... ",
				Markup.inlineKeyboard([
					[Markup.button.callback("\u2003 ❌ cancel \u2003", "cancel")],
				])
			);
		} else {
			console.log(error.message);
		}
	}
});

module.exports = importScene;
