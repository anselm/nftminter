import { ethers } from 'hardhat';
import config from '../config/config.json';
import fs from 'fs';

import contractjson from '../artifacts/contracts/NFTStore.sol/NFTStore.json'

const main: () => Promise<void> = async () => {
	const [deployer] = await ethers.getSigners();
	console.log('Deploy-Store: Deploying contracts with the account:', deployer.address);
	const Store = await ethers.getContractFactory('NFTStore');
	const store = await Store.deploy(config.name)
	await store.deployed();
	console.log('Deploy-Store: Contract deployed at:', store.address);
	fs.writeFileSync(config.savestore,store.address);

	if(fs.existsSync(config.savemint)) {
		console.log('Deploy-Store: Updating the mint to point to the new store')
		let mintaddr = fs.readFileSync(config.savemint,'utf8').toString();
		const Mint = await ethers.getContractFactory('NFTMint');
		const mint = await Mint.attach(mintaddr);
		let gas = ethers.BigNumber.from("0")
		gas = await mint.estimateGas.setStore(store.address)
		console.log("Deploy-Store: gas is " + gas)
		try {
			let tx = await mint.setStore(store.address)
			console.log("Deploy-Store: Successfully set store ")
		} catch(err) {
			console.error(err)
		}

		console.log('Deploy-Store: Updating the store to point at the mint also')
		const store2 = await Store.attach(store.address);
		gas = await store2.estimateGas.setNFTContract(mintaddr)
		console.log("Deploy-Store: gas is " + gas)
		try {
			let tx = await store2.setNFTContract(mintaddr)
			console.log("Deploy-Store: Successfully set store ")
		} catch(err) {
			console.error(err)
		}

	} else {
		console.log("Deploy-Store: you may want to deploy your mint also")
	}

};

main().then(() => process.exit(0)).catch((error) => {
	console.error(error);
	process.exit(1);
});
