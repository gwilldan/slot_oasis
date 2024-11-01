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

module.exports = {
	createNewWallet,
};
