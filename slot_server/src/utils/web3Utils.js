require("dotenv").config();
const { ethers, JsonRpcProvider, Wallet } = require("ethers");
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
		const wallet = new Wallet(pkey);
		return wallet;
	} catch (error) {
		console.error("import wallet errror --- ", error);
		return;
	}
};

module.exports = {
	createNewWallet,
	importWallet,
};
