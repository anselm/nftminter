import { ethers } from 'hardhat';
import config from '../config/config.json';
import fs from 'fs';

const main: () => Promise<void> = async () => {
	const [deployer] = await ethers.getSigners();
	console.log('Deploying contracts with the account:', deployer.address);
	const Factory = await ethers.getContractFactory('NFTMint');
	const contract = await Factory.deploy(config.name,config.symbol,config.baseURI);
	await contract.deployed();
	console.log('Contract deployed at:', contract.address);
	fs.writeFileSync(config.savemint,contract.address);
};

main().then(() => process.exit(0)).catch((error) => {
	console.error(error);
	process.exit(1);
});
