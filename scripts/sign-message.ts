import fs from 'fs';
import hre from 'hardhat'
import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import PassReceiverData from '../config/pass-receiver-data.json';
import config from '../config/config.json';



interface DomainType {
	name: string;
	version: string;
	chainId: number;
	verifyingContract: string;
}

interface Signatures {
	v: number;
	r: string;
	s: string;
	amount: number;
}

const passReqMap: { [key: string]: Signatures } = {};

const main = async () => {
	const [owner] = await ethers.getSigners();
	let storeaddr = fs.readFileSync(config.savestore,'utf8').toString();
	let chainId = hre.network.name == "rinkeby" ? 4 : 1;
	if(config.chainId != -1 && config.chainId != chainId) {
		console.warn("**** Note the chainId you are forcing does not match what our sophisticated omniscannertron found ***");
		chainId = config.chainId
	}
	let domain : DomainType = {
		"name":config.name,
		"version":config.version,
		"chainId": chainId,
		"verifyingContract":storeaddr
	}
	console.log(domain);
	await Promise.all(
		Object.entries(PassReceiverData).map(
			async ([receiver, amount]) => {
				let data = { receiver, amount }
				const signature = await owner._signTypedData(domain, config.types, data);
				let {r,s,v} = ethers.utils.splitSignature(signature);
				passReqMap[receiver] = { v,r,s,amount }
			}
		)
	);
	fs.writeFileSync(config.savesigs, JSON.stringify(passReqMap));
	console.log(passReqMap)
};

main().then(() => process.exit(0)).catch((error) => {
	console.error(error);
	process.exit(1);
});
