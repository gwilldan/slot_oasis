const { createNewWallet } = require("../utils/web3Utils");

const create_wallet = async (ctx) => {
	ctx.editMessageText("Creating new wallet ...");
	const newWallet = await createNewWallet();
	if (!newWallet) {
		ctx.reply("Error creating the new wallet, try again shortly!");
		return;
	}
	ctx.reply(
		`Your wallet has been created ... \n\nWALLET DATA (N/B: KEEP VERY SAFE!)\n\nWALLET ADDRESS: ${newWallet.address} \n\nPRIVATE KEY:  ${newWallet.privateKey}\n\nYou private keys need maximum protection as it posseses unrevokable access to your wallet.`
	);
	console.log(newWallet);
};

const import_wallet = async () => {};

module.exports = {
	create_wallet,
	import_wallet,
};
