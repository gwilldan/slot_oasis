require("dotenv").config();
const { ethers, JsonRpcProvider, Wallet, formatEther } = require("ethers");
const { RPC_URL } = require("../../constants");
const provider = new JsonRpcProvider(RPC_URL);

const createNewWallet = async () => {
	try {
		const newWallet = Wallet.createRandom(provider);
		return newWallet;
	} catch (error) {
		console.error("create new wallet error --- ", error.message);
		return;
	}
};

const getNativeBal = async (address) => {
	try {
		const bal = await provider.getBalance(address);
		const formattedBal = !bal
			? 0
			: Number(formatEther(bal)).toFixed(4) > 0.001
			? Number(formatEther(bal)).toFixed(4)
			: "< 0.001";
		return formattedBal;
	} catch (error) {
		console.error(error);
	}
};

module.exports = {
	createNewWallet,
	getNativeBal,
};
