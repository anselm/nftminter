import fs from 'fs';
import hre from 'hardhat'
import { ethers } from 'hardhat';
import config from '../config/config.json';

export interface DomainType {
	name: string;
	version: string;
	chainId: number;
	verifyingContract: string;
}

export function buildDomainSeparator() : DomainType {
	if(!fs.existsSync(config.savepath+"/address-"+hre.network.name+"-store.txt")) {
		console.error("build-domain-separator: Build store first");
		throw "build-domain-separator: build store first"
	} else {
		let storeaddr = fs.readFileSync(config.savepath+"/address-"+hre.network.name+"-store.txt",'utf8').toString();
		let chainId = 4;
		switch(hre.network.name) {
			case "ropsten": chainId = 3; break;
			case "rinkeby": chainId = 4; break;
			case "main": chainId = 1; break;
			case "mainnet": chainId = 1; break;
			case "homestead": chainId = 1; break;
			default: console.error("build-domain-separator: Cannot figure out chainId - please add your chain id here");
		}
		if(config.chainId != -1 && config.chainId != chainId) {
			console.warn("build-domain-separator: Note the chainId you are forcing does not match what our sophisticated omniscannertron found");
			chainId = config.chainId
		}
		let domain : DomainType = {
			"name":config.name,
			"version":config.version,
			"chainId": chainId,
			"verifyingContract":storeaddr
		}
		return domain
	}
}

