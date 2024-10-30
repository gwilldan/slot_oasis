require("dotenv").config();
const crypto = require("crypto");

const encryptKey = (pkey) => {
	try {
		const key = crypto.createHash("sha256").update(process.env.S_KEY).digest();
		const iv = crypto.randomBytes(12);

		const cipher = crypto.createCipheriv("aes-256-ccm", key, iv, {
			authTagLength: 16,
		});

		const enc = Buffer.concat([cipher.update(pkey, "utf-8"), cipher.final()]);

		const authTag = cipher.getAuthTag();

		return {
			iv: iv.toString("hex"),
			pkey: enc.toString("hex"),
			authTag: authTag.toString("hex"),
		};
	} catch (error) {
		console.log("error encryptkey --- ", error.message);
		return null;
	}
};

const decryptKey = (pkey, _iv, _authTag) => {
	try {
		const key = crypto.createHash("sha256").update(process.env.S_KEY).digest();
		const iv = Buffer.from(_iv, "hex");
		const authTag = Buffer.from(_authTag, "hex");
		const decipher = crypto.createDecipheriv("aes-256-ccm", key, iv, {
			authTagLength: 16,
		});
		decipher.setAuthTag(authTag);
		const dec = Buffer.concat([decipher.update(pkey, "hex"), decipher.final()]);
		return dec.toString("utf8");
	} catch (error) {
		console.log("error decryptKey --- ", error.message);
		return null;
	}
};

const generateRef = () => {
	const chars =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	for (let i = 0; i < 6; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}

	return result;
};

module.exports = {
	encryptKey,
	decryptKey,
	generateRef,
};
