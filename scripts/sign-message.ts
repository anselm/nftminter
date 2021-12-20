import fs from 'fs';
import hre from 'hardhat'
import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import PassReceiverData from '../config/pass-receiver-data.json';
import config from '../config/config.json';

import { buildDomainSeparator } from './domain-separator'

interface Signatures {
	v: number;
	r: string;
	s: string;
	amount: number;
}

const signatures: { [key: string]: Signatures } = {};

async function main() {
	let domain = buildDomainSeparator();
	const [owner] = await ethers.getSigners();
	await Promise.all(
		Object.entries(PassReceiverData).map(
			async ([receiver, amount]) => {
				let data = { receiver, amount }
				const signature = await owner._signTypedData(domain, config.types, data);
				let {r,s,v} = ethers.utils.splitSignature(signature);
				signatures[receiver] = { v,r,s,amount }
			}
		)
	);
	fs.writeFileSync(config.savepath+"/signatures-"+hre.network.name+".json", JSON.stringify(signatures));
	console.log(signatures)
	console.log("sign-message: Done!")
};

main().then(() => process.exit(0)).catch((error) => {
	console.error(error);
	process.exit(1);
});
