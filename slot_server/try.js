const { Wallet } = require("ethers");

const test = async (key) => {
	const wallet = new Wallet(key);
	console.log("wallet ---- ", wallet);
};

test("hello");
