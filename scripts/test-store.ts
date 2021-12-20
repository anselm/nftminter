import fs from 'fs';
import hre from 'hardhat'
import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import PassReceiverData from '../config/pass-receiver-data.json';
import config from '../config/config.json';

import contractjson from '../artifacts/contracts/NFTStore.sol/NFTStore.json'

import { ecrecover } from 'ethereumjs-util'

import { buildDomainSeparator } from './domain-separator'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// get provider myself? if this is coming in via hardhat it is not clear why it is not set? TODO examine
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const secrets = require('../secrets.json')

const provider = ethers.getDefaultProvider(hre.network.name, {
    etherscan: secrets.ETHERSCAN_KEY,
    infura: secrets.INFURIA_KEY_RINKEBY,
    alchemy: secrets.ALCHEMY_KEY_ROPSTEN,
});

// debug max

ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.DEBUG)

// get these statically for convenience

const mintaddr = fs.readFileSync(config.savepath+"/address-"+hre.network.name+"-mint.txt",'utf8').toString();
const storeaddr = fs.readFileSync(config.savepath+"/address-"+hre.network.name+"-store.txt",'utf8').toString();

let blockNumber : any = 0
let gasPriceInGWEI : any = 0
let feeData : any = 0

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// main()
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

main().then(() => {
	console.log("done");
	setTimeout(()=>{ process.exit(0) },1000)
}).catch((error) => {
	console.error(error);
	process.exit(1);
});

async function main() {

	blockNumber = await provider.getBlockNumber()
	gasPriceInGWEI = await provider.getGasPrice()
	feeData = await provider.getFeeData()

	// Get a few ledger facts
	console.log("test-store: Current ethereum block number = " + blockNumber);
	console.log("test-store: Current ethereum gas price = " + gasPriceInGWEI);
	console.log(feeData)
	console.log("test-store: maxFeePerGas = " + ethers.utils.formatUnits(feeData.maxFeePerGas))
	console.log("test-store: maxPriorityFeePerGas = " + ethers.utils.formatUnits(feeData.maxPriorityFeePerGas))

	// get a few general details for tests
	let priceforone = ethers.utils.parseEther(`${config.price}`)
	let numbertobuy = ethers.BigNumber.from(1)
	let notsigner = ethers.utils.getAddress("0xd8EC5d1452E658cD3e277B27Adea62e941A51241")
	console.log("test-store: desired price per item in config is " + priceforone)
	console.log("test-store: desired number to buy is " + numbertobuy)
	console.log("...")

	// get facts about current signer
	const [signer] = await ethers.getSigners();
	console.log("test-store: the signer who presumably owns the mint and the store is " + signer)
	console.log("test-store: signer balance  = " + await signer.getBalance())
	console.log("test-store: signer chainId = " + await signer.getChainId())
	console.log("test-store: signer gas price = " + await signer.getGasPrice())
	console.log("test-store: signer transaction count = "  + await signer.getTransactionCount())
	console.log("...")

	try {

		// ------------------------------------------------------ ethers - make sure minter is ok -----------------------

		const Mint = await ethers.getContractFactory('NFTMint');
		const mint = await Mint.attach(mintaddr);
		console.log("test-store: examining low level mint with contract at " + mintaddr);
		console.log(`test-store: the low level mint has minted ${await mint.mintedSoFar()} items`);
		console.log("...")

		// verify that the minter is pointing to the store
		if(await mint.store() != ethers.utils.getAddress(storeaddr)) {
			console.error("Minter does not match store")
			console.error(await mint.store())
			console.error(storeaddr)
			throw "test-store: mint does not match"
		}

		// ------------------------------------------------------ ethers - make sure store is ok -----------------------

		const Store = await ethers.getContractFactory('NFTStore');
		const store = await Store.attach(storeaddr);
		console.log("test-store: examining store with contract at " + storeaddr);
		console.log(`test-store: the store has minted ${await store.mintedSoFar()} items`);
		console.log("...")

		// verify that the price is matching desired price in config
		let priceinstore = await store.price()
		if(!priceforone.eq(priceinstore) ) {
			console.log(ethers.utils.formatUnits(priceforone))
			console.log(ethers.utils.formatUnits(priceinstore))
			console.error("Prices don't match - changing price in store - you should verify this yourself also")
			await store.setPrice(priceinstore) // this often fails probably due to gas
		}
		priceinstore = await store.price()
		console.log("test-store: price per item in store is " + ethers.utils.formatUnits(priceinstore))

		// verify that the main store is open!
		if(!await store.mainSaleOn()) {
			console.error("test-store: main store is not open - will try opening store now - but you may want to check manually!!")
			await store.setMainSale(true);
		}
		console.log("test-store: the main store is open")
		console.log("...")

		// ------------------------------------------------------ paranonia test non ethers things -----------------------

		// rpc does seem stable
		await test_raw_rpc()

		// ------------------------------------------------------ test minter and store with web3 -----------------------

		// these seem to work well
		await test_web3_low_level_mint(signer.address,signer.address);

		// test: paranoia test the store from web3 - works well - has hardcoded gas however
		await test_web3_store_main(signer.address,signer.address,priceforone,numbertobuy);

		// ------------------------------------------------------ testing minter ethers -----------------------

		// test: paranoia test the minter, attempt to mint (basically gifting) directly on minter
		await test_ethers_low_level_minter(mint,signer.address)

		// ------------------------------------------------------ testing store -----------------------

		// test: gifting from store to ourselves
		await test_ethers_store_gift(store,signer.address)

		// ------------------------------------------------------ test signed transactions -----------------------
		await test_ethers_store_mint(store,signer.address,priceforone,numbertobuy)

		// ------------------------------------------------------ test signed transactions -----------------------
		await test_ethers_store_signed_premint(store,signer.address,priceforone,numbertobuy,signer)

		// ------------------------------------------------------ done

		// how many things has the store minted now?
		console.log(`test-store: now the store has minted ${await store.mintedSoFar()} items`);

	} catch(err) {
		console.error(err)
	}

};

var request = require('request');

async function test_raw_rpc() {

	var headers = {
		'Content-Type': 'application/json'
	};

	var dataString = '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",true], "id":1}';

	var options = {
		url: `https://rinkeby.infura.io/v3/07b63bbd62f84689a9c2162df61d9656`,
		method: 'POST',
		headers: headers,
		body: dataString,
	};

	function callback(error : any, response : any , body : any) {
		if (!error && response.statusCode == 200) {
			let json = response.body;
			var obj = JSON.parse(json);
			console.log(obj)
		}
	}

	request(options, callback);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// because transaction finalization can take a long time - let's have a fancy timeout mechanism
// https://advancedweb.hu/how-to-add-timeout-to-a-promise-in-javascript/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function timeout(prom : any, time: any, exception: any ) {
	let timer : any = null;
	return Promise.race([
		prom,
		new Promise((_r, rej) => timer = setTimeout(rej, time, exception))
	]).finally(() => clearTimeout(timer));
}

async function timeout_helper(mypromise: any) {
	const timeoutError = Symbol();
	try {
		const result = await timeout(mypromise, 60000, timeoutError);
		return result
	}catch (e) {
		if (e === timeoutError) {
			console.warn("test-store: timeout gave up")
		}else {
			console.error("test-store: timeout crashed!")
			console.error(e)
			throw e;
		}
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// test web3 - sometimes it performs better than ethers.js - like ethers js seems to hang on some ops? gas estimation?
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Web3 = require('web3');

//import { Web3 } from "@alch/alchemy-web3";

let web3 = new Web3(`https://rinkeby.infura.io/v3/${secrets.INFURA_KEY_RINKEBY}`);
const mint_contract_raw = require("../artifacts/contracts/NFTMint.sol/NFTMint.json");
const store_contract_raw = require("../artifacts/contracts/NFTStore.sol/NFTStore.json");
const mint_web3 = new web3.eth.Contract(mint_contract_raw.abi, mintaddr);
const store_web3 = new web3.eth.Contract(store_contract_raw.abi, storeaddr);
web3.eth.accounts.wallet.add(secrets.RINKEBY_PRIV_KEY);

// https://www.blocknative.com/blog/eip-1559-fees#:~:text=Our%20EIP%2D1559%2Dcompliant%20Gas,Base%20Fee%20)%20%2B%20Max%20Priority%20Fee
// https://docs.alchemy.com/alchemy/guides/eip-1559/gas-estimator
// https://docs.alchemy.com/alchemy/guides/eip-1559/send-tx-eip-1559

async function test_web3_low_level_mint(receiver:any,signer:any) {

	console.log("test-store: testing web3 low level minting on rinkeby only...")
	if(hre.network.name != "rinkeby") {
		console.error("test-store: you're not currently actually on rinkeby")
		return
	}

	// get the nonce and force it apart to avoid "replacement" collisions lol
	// turns out if you mess with this you can get the upstream validator to hang - and then lock up all future transactions :(
	//let pending = await web3.eth.getTransactionCount(signer, 'pending');
	//let nonce = await web3.eth.getTransactionCount(signer, 'latest');
	//console.log("pending is = " + pending)
	//console.log("nonce is = " + nonce)

	// Interesting comment on gas estimation:
	//
	// https://ethereum.stackexchange.com/questions/76543/does-using-a-very-high-gas-limit-somehow-get-your-transactions-executed-slower
	// The reasoning: miners seek to maximize their profit within each block.
	// Calls to eth_estimateGas can be computationally heavy
	// miners typically do not determine the actual gas each tx will consume.
	// Instead they calculate gasPrice * gasLimit for each given transaction
	// from that determine the most cost-effective set of transactions to mine.

	// LEGACY APPROACH TO GAS
	// https://decenter.org/en/what-are-gas-gas-limit-and-gas-price-in-the-ethereum-network
	// "Gas" is separate from gwei or ether, each unit of gas costs some number of gwei; this price fluctuates

	// get the current gas pricing in terms of gwei
	let gasPriceInGWEI = await web3.eth.getGasPrice();
	console.log("gasPriceInGWEI is = " + gasPriceInGWEI)

	// get the current block gas limit on how many UNITS OF gas (not gwei) it is permitted to pay for something in a block
	// "Gas Limit" is the upper bound that it is permissable to pay for gas in a recent block
	let blockGasLimitInGas = (await web3.eth.getBlock("latest")).gasLimit
	console.log("blockGasLimitInGas is = " + blockGasLimitInGas)

	// Estimate how much gas this method will use - this is presigned... TODO?
	let gasEstimateInGas = await mint_web3.methods.mint(receiver).estimateGas({from: signer});
	// gas = web3.eth.estimateGas({to:receiver,data:ssomething}) // another slight variation
	console.log("gasEstimateInGas is = " + gasEstimateInGas)

	// Get the priority fees - turns out this is set automatically
	// see https://docs.alchemy.com/alchemy/guides/eip-1559/send-tx-eip-1559
	//let maxPriorityFeePerGas = feeData.maxPriorityFeePerGas // await web3.eth.getMaxPriorityFeePerGas()
	//console.log("maxPriorityFeePerGas is = ",maxPriorityFeePerGas)

	const tx = {
		from: receiver,
		to: mintaddr,
		// nonce: nonce,

		// apparently it turns out that it does make sense to bump up the gas a bit 
		gas: Math.floor(gasEstimateInGas*1.2),

		// for legacy:
		// gasPrice:gasPriceInGWEI, // <- this should be set automatically - it is above however

		// for new - this is optional:
		//'maxPriorityFeePerGas': maxPriorityFeePerGas, 

		data: mint_web3.methods.mint(receiver).encodeABI()
	};

	const signedTx = await web3.eth.accounts.signTransaction(tx,secrets.RINKEBY_PRIV_KEY);
	const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction); 
	console.log(`Transaction receipt: ${transactionReceipt.blockHash}`);
}

async function test_web3_store_main(receiver:any,signer:any,priceforone:any,numbertobuy:any) {

	console.log("test-store: testing store minting on web3 gateway on rinkeby only...")
	if(hre.network.name != "rinkeby") {
		console.error("test-store: you're not currently actually on rinkeby")
		return
	}

	let value = priceforone.mul(numbertobuy)

	let gasEstimateInGas = await store_web3.methods.mintMainSale(numbertobuy).estimateGas({from: signer,value:value});
	console.log("gas estimate is = " + gasEstimateInGas);

	web3.eth.handleRevert = true
	const tx = {
		from: receiver,
		to: storeaddr,
		gas: Math.floor(gasEstimateInGas*1.2),
		// for legacy:
		// gasPrice:gasPriceInGWEI, // <- this should be set automatically - it is above however
		// for new - this is optional:
		//'maxPriorityFeePerGas': maxPriorityFeePerGas, 
		value:value,
		data: store_web3.methods.mintMainSale(numbertobuy).encodeABI()
	};
	const signedTx = await web3.eth.accounts.signTransaction(tx,secrets.RINKEBY_PRIV_KEY);
	const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
	console.log(`Transaction receipt: ${transactionReceipt.blockHash}`);

	// print results
	// console.log(`test-store: the store has minted ${await store.mintedSoFar()} items`);
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// test ethers low level minter minting
//
// ISSUES:
//
// Currently ethersjs hangs on the transaction waiting for it to close - on rinkeby and ropsten
// The web3 gateway does work, and can perform transactions, but ethers cannot...
// It may have something to do with the gas fees
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function test_ethers_low_level_minter(mint : any,receiver : any) {

	console.log("test-store: ethers - testing low level minter gateway...")
	console.log(`test-store: the mint itself has minted ${await mint.mintedSoFar()} items`);

	// estimate gas - this will tell us already if this suceeeds
	console.log("test-store: estimating gas for receiver " + receiver)
	let gas = await mint.estimateGas.mint(receiver);
	console.log("test-store: estimated low level mint gas = " + gas)

	console.log("test-store: estimated low level mint gas = " + gas)

	// TODO evaluate on main net - some of these may need to be set

	let overrides = {
		// setting these seems to be forcing the network into legacy mode and then the transactions fail
		//gasPrice: Math.floor(gas*1.2),  // this is the estimation of gas (in gas units) you want to spend
		//gasLimit: Math.floor(gas*2), // in a legacy system this is the max gas (in gas units) you are willing to spend

		// for eip 1559 -> this may work to bump up the reward - apparently it is a bit expensive and you can calculate it better
		// https://docs.alchemy.com/alchemy/guides/eip-1559/maxpriorityfeepergas-vs-maxfeepergas
		maxFeePerGas: feeData.maxFeePerGas, //.mul(ethers.utils.parseEther("1.1")),
		maxPriorityFeePerGas: feeData.maxPriorityFeePerGas // this apparently is already the "max?"
	}

	// mint
	console.log("test-store: about to attempt mint")
	let tx = await mint.mint(receiver,overrides);
	console.log("test-store: minting transaction in progress - hash is :" + tx.hash)
	let results = await timeout_helper(tx.wait())
	console.log(results)

	// print out how many minted
	console.log(`test-store: the mint itself has minted ${await mint.mintedSoFar()} items`);

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// test store gifting
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function test_ethers_store_gift(store : any,receiver : any) {

	console.log("test-store: ethers - testing store gifting...")

	let gas = await store.estimateGas.mintGift([receiver]);
	console.log("test-store: testing store gifting with gas = " + gas)
	let overrides = {
		maxFeePerGas: feeData.maxFeePerGas,
		maxPriorityFeePerGas: feeData.maxPriorityFeePerGas
	}

	// mint
	console.log('test-store: about to gift')
	let tx = await store.mintGift([receiver],overrides);
	console.log("test-store: gifting transaction in progress - hash is :" + tx.hash)
	let results = await timeout_helper(tx.wait())
	console.log(results)

	// print out how many minted
	console.log(`test-store: the store minted ${await store.mintedSoFar()} items`);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// test store purchase main
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function test_ethers_store_mint(store : any, receiver: any, priceforone : any, numbertobuy: any ) {

	console.log("test-store: testing main store...")

	let gas = await store.estimateGas.mintMainSale(numbertobuy,{ value: priceforone.mul(numbertobuy) });
	let overrides = {
		value: priceforone.mul(numbertobuy),
		// these probably are not needed - but it's fun to include them
		maxFeePerGas: feeData.maxFeePerGas,
		maxPriorityFeePerGas: feeData.maxPriorityFeePerGas 
	}

	// mint
	console.log("test-store: about to mint for $")
	let tx = await store.mintMainSale(numbertobuy,overrides);
	console.log("test-store: minting transaction in progress - hash is :" + tx.hash)
	let results = await timeout_helper(tx.wait())
	console.log(results)

	// print out how many minted
	console.log(`test-store: the store minted ${await store.mintedSoFar()} items`);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// test store premint
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function test_ethers_store_signed_premint(store: any, receiver: any, priceforone : any, numbertobuy: any, signer: any ) {

	console.log("test-store: testing signed premint...")

	// build evil domain separator
	let domain = buildDomainSeparator();

	// verify that the presale store is open!
	if(!await store.preSaleOn()) {
		console.error("test-store: presale store is not open - opening store now for presales")
		await store.togglePreSale();
	}
	console.log("test-store: the presale store is open")

	// compose a signed message that grants the receiver permissions to some number of mintings
	const amount = ethers.BigNumber.from("100");
	var data = { receiver, amount }

	// sign now - we can do this because this test suite is running with access to the priv key - in production this would be bad
	let signature = await signer._signTypedData(domain,config.types,data)
	let {v,r,s} = ethers.utils.splitSignature(signature);
	console.log("test-store: built signatures:")
	console.log({v,r,s,receiver})

	// estimate gas
	let gas = await store.estimateGas.mintPreSaleSigned(numbertobuy,amount,r,s,v,{ value: priceforone.mul(numbertobuy) });

	let overrides = {
		value: priceforone.mul(numbertobuy),
		//maxFeePerGas: feeData.maxFeePerGas,
		//maxPriorityFeePerGas: feeData.maxPriorityFeePerGas 
	}

	// mint
	console.log("test-store: about to test signed minting")
	let tx = await store.mintPreSaleSigned(1,amount,r,s,v,overrides);
	console.log("test-store: minting transaction in progress - hash is :" + tx.hash)
	let results = await timeout_helper(tx.wait())
	console.log(results)

	// print out how many minted
	console.log(`test-store: the store minted ${await store.mintedSoFar()} items`);
}
