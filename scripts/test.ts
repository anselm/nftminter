import fs from 'fs';
import hre from 'hardhat'
import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import PassReceiverData from '../config/pass-receiver-data.json';
import config from '../config/config.json';

import contractjson from '../artifacts/contracts/NFTStore.sol/NFTStore.json'

import { ecrecover } from 'ethereumjs-util'

interface DomainType {
	name: string;
	version: string;
	chainId: number;
	verifyingContract: string;
}

interface PassReq {
	receiver: string;
	amount: number;
}

const main: () => Promise<void> = async () => {

	// A few fields to try

	const [owner] = await ethers.getSigners();
	let owneraddr = owner.address
	let storeaddr = fs.readFileSync(config.savestore,'utf8').toString();
	let receiver = owner.address 
	const amount = ethers.BigNumber.from("100");

	// Build props by hand as a test

	const domain = {
		name: "BUZZ",
		version: "1",
		chainId: 4,
		verifyingContract: storeaddr
	};

	// This is not needed

	const domainSchema = [
	    { name: "name", type: "string" },
	    { name: "version", type: "string" },
	    { name: "chainId", type: "uint256" },
	    { name: "verifyingContract", type: "address" },
	];

	// Build types by hand as a test

	let types = {
		//		EIP712Domain: domainSchema, <- it does not want us to pass this!
		PassReq: [
		    { name: "receiver", type: "address" },
		    { name: "amount", type: "uint256" }
		],
		//		primaryType:"PassReq"
	}

	// Sign everything

	var data = { receiver, amount }
	let signature = await owner._signTypedData(domain,types,data)
	let {v,r,s} = ethers.utils.splitSignature(signature);
	console.log(signature)
	console.log({v,r,s})
	console.log(receiver)

	// Get the live store and do a few tests on it

	const [deployer] = await ethers.getSigners();
	const Store = await ethers.getContractFactory('NFTStore');
	const contract = await Store.attach(storeaddr);
	console.log("got store");

	let gas = ethers.BigNumber.from("0")
	gas = await contract.estimateGas.mintPreSaleSigned(1,amount,r,s,v);
	gas = gas.add("100000");
	console.log("gas is " + gas)

	try {
		let tx = await contract.mintPreSaleSigned(1,amount,r,s,v,{from:deployer.address,gasLimit:gas,gasPrice:gas});
		console.log("Results are :")
		console.log(tx)
	} catch(err) {
		console.error(err)
	}

};

main().then(() => {
	setTimeout(()=>{
		process.exit(0)
	},1000)
}).catch((error) => {
	console.error(error);
	process.exit(1);
});



