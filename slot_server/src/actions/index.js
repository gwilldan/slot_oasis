const UserDB = require("../models/User");
const { encryptKey, generateRef } = require("../utils/helpers");
const { createNewWallet } = require("../utils/web3Utils");

const create_wallet = async (ctx) => {
	try {
		ctx.editMessageText("Creating new wallet ...");
		const newWallet = await createNewWallet();
		if (!newWallet) {
			ctx.reply("Error creating the new wallet, try again shortly!");
			return;
		}

		const enc = encryptKey(newWallet.privateKey);
		if (!enc) return console.log("encoding issues!");

		const refLink = generateRef();

		const data = await UserDB.create({
			enc: enc,
			FirstName: ctx.from.first_name,
			luck: 0,
			refLink: refLink,
			userId: ctx.from.id,
			address: newWallet.address,
			username: ctx.from.username,
		});

		ctx.reply(
			`Your wallet has been created ... \n\nWALLET DATA (N/B: KEEP VERY SAFE!)\n\nWALLET ADDRESS: \n${newWallet.address} \n\nPRIVATE KEY:  \n${newWallet.privateKey}\n\nYou private keys need maximum protection as it posseses unrevokable access to your wallet.
		
		\nYOUR REFERRAL LINK: \nhttps://t.me/SlotOasisBot?start=${refLink} `
		);
	} catch (error) {
		console.error("create_wallet error ----", error.message);
	}
};

const deposit = async (ctx) => {
	ctx.editMessageText(`Deposit address`);
};

const getLuck = async (ctx) => {
	ctx.editMessageText("This is the GET LUCK!!!! ");
};

const withdraw = async (ctx) => {
	ctx.editMessageText("You want to WITHDRAW right!!!!!");
};

module.exports = {
	create_wallet,
	deposit,
	getLuck,
	withdraw,
};
