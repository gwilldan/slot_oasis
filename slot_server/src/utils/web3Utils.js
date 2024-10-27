const { ethers, JsonRpcProvider, Wallet } = require("ethers");
const { import_wallet } = require("../actions");
const provider = new JsonRpcProvider(process.env.RPC_URL);

const createNewWallet = async () => {
	try {
		const newWallet = Wallet.createRandom(provider);
		return newWallet;
	} catch (error) {
		console.error("create new wallet error --- ", error.message);
		return;
	}
};

const importWallet = (pkey) => {
	if (!pkey) return;
	try {
		console.log(pkey);
		const wallet = new Wallet(pkey, provider);
		console.log(wallet);

		// return wallet;
	} catch (error) {
		console.error("import wallet errror --- ", error);
		return undefined;
	}
};

module.exports = {
	createNewWallet,
	importWallet,
};
