# NFTMint and NFTStore

This is an attempt to better capture and better document some of the basics around building an NFT store.

It's taking a nice but-could-have-been-better-documented signing feature from https://twitter.com/mempooool -> see https://github.com/theprojecturs/URS.contract which I discuss in more detail at the very bottom of this document.

Here is how it works step by step:

### 1. This project uses yarn - but not for a website, just for local tools such as hardhat...:

	yarn build


### 2. Edit secrets.json and add your secrets:

edit ./secrets.json

```
{
		"INFURA_KEY_RINKEBY": "infuriakeys-sameforboth",
		"INFURA_KEY_MAINNET": "infuriakeys-sameforboth",
		"RINKEBY_PRIV_KEY": "ohnoesmyprivatekey",
		"MAINNET_PRIV_KEY": "ohnoesmyprivatekey",
		"ETHERSCAN_KEY": "etherscankeysforfun"
}
```


### 3. Create and/or edit scripts/config.json which sets up properties for your mint (you could also have hard-coded these in the mint itself). We do this here because of a fancy signing technique used later. Note that the scripts/ try to find the chain by themselves.

edit ./config/config.json

```
{
	"name": "BUZZ",
	"symbol": "BUZZ",
	"baseURI": "https://myawesome.com/tokens/",
	"version": "1",
	"chainId": -1,
	"value": 0.01,
	"types":{
		"PassReq": [
			{ "name": "receiver", "type": "address" },
			{ "name": "amount", "type": "uint256" }
		]
	},
	"savemint":"config/address-mint.txt",
	"savestore":"config/address-store.txt",
	"savesigs":"config/pass-signatures.json"
}
```

### 4. Deploy and verify the mint:

This is a fairly vanilla ERC 721 ... you can also rewrite this to use an ERC 1155. Here is an example of deploying it by hand:

yarn hardhat run scripts/deploy-mint.ts --network rinkeby

This will spit out a deploy adddress. You can look at this on EtherScan. For example here is a pass I ran - and I can see the contract on the test ledger at:

https://rinkeby.etherscan.io/address/0x47389c1cc6b183c066fabe79689dd39e3890e923

Please go ahead and verify your deploy so that etherscan will be able to show your interfaces (use your address not my example address):

yarn hardhat verify --network rinkeby 0x47389c1cc6b183c066fabe79689dd39e3890e923 "BUZZ" "BUZZ" "https://myawesome.com/tokens/"



### 5. Deploy the store:

yarn hardhat run scripts/deploy-store.ts --network rinkeby

You should see a result like : Contract deployed at: 0x023fac77413Ee1E179B70c8e6a9c44c41db26A0c -> take that and use it to verify:

yarn hardhat verify --network rinkeby 0x023fac77413Ee1E179B70c8e6a9c44c41db26A0c "BUZZ"

The store should show up somewhere in the possible space of ethereum:

https://rinkeby.etherscan.io/address/0x023fac77413Ee1E179B70c8e6a9c44c41db26A0c



### 6. Point the store at the mint and point the mint at the store

I wrote helpers that should automate this (see scripts/deploy-store.ts - but always best to verify - can do by hand on etherscan.


### 7. Turn on the mainSale and the preSale for testing

Nothing will work and you will be sad if you do not turn these on.


### 8. Sign the VIP passes and generate signed VIP perms:

It's worth walking through whats going on here. Basically EIP 712 does two separate things. First, it shows the human intermediary, the buyer, what is going on behind the scenes. It is a way of letting somebody see what the client (metamask) and the ledger (the contract on the ledger) intend to do. This gives the user an opportunity to say no. Secondly, it performs an actual function call; passing some arguments from the client (metamask and in this case your whole client side web3 app) to the ledger (the contract).

The idea of signing arguments for a function call is super helpful all around, for many reasons. It allows the contract running on the ledger to feel comfortable that arguments are being passed from a legitimate channel. Since it is impossible? (extremely unlikely) that the arguments can be forged (since they are signed) it becomes a way to know that an action being requested is endorsed by the contract creators. It also lets the human participants in this transaction feel safer.

The mechanics behind this are that the contract creator can use a private key to sign any data that they want to send to the contract. For security reasons it makes sense that the contract creator sign all the data earlier, and then not leave their private key lying around obviously. So typically, such as say in granting whitelist passes to VIPS, every pass is signed ahead of time, and then those signed passes can be sent to the contract at will; whenever we want to let a VIP in.

Create a file similar to this in config/pass-receiver-data.json if you don't have one already - with who gets passes...

edit data/pass-receiver-data.json

```
{
	"0x6B83f3d4e92F82F063674bA136B465e5788c9eF8":100
}
```

Run this script to generate your passes and then try use them to perform transactions.

yarn hardhat run scripts/sign-message.ts


### 9. Play with it

First Make sure to point your store at your NFT contract and visa versa! You can do this directly inside etherscan if you wish (see the Write Contract section).

You can mount a connection to your contract from http://remix.ethereum.org/ ... or you can just use etherscan.


### Addendum: Understanding EIP712

EIP712 is a way to formalize when _signed_ data is being sent between clients and servers (such as between metamask and a contract) to reduce various kinds of phishing attacks. It makes the contents of what is being sent more visible to a human observer. This is critically important because signed data blobs are often used to do real work, and there is real risk.

On the consumption Side:

Here's an early look at proving that something is truly signed by a signer. The key elements here are that the caller is passing a pile of pieces (v,r,s,hash) and recovering the public address of the signer from those pieces. Since only the signer can create those pieces, we can know that a document is sent from a creator.

https://soliditydeveloper.com/ecrecover  <- in fact you could just pretty much use this as is (on the solidity side)

On the construction side:

But it's helpful to look back at July 2018 before good libraries existed. Here you see something similar to the above, except it provides more clarity on how to compose the traffic on the server side. 

https://medium.com/metamask/eip712-is-coming-what-to-expect-and-how-to-use-it-bb92fd1a7a26

It's also worth at least appreciating how tools like Metamask and Ethers.js interacts with this - since it is used to sign stuff (we're actually more interested in Ethers.js since in this use case we have a pre-compilation pass that uses ethers.js to sign for vip whitelisting inclusion).

A few other references:

https://github.com/ethereum/EIPs/blob/master/assets/eip-712/Example.sol <- vanilla examples of general signing, not that useful
https://eips.ethereum.org/EIPS/eip-712 <- this messy document looks at some of the early security issues and technical solutions
https://solidity-by-example.org/hashing/ <- clarity on keccak256() if you're not familiar with it
https://medium.com/@libertylocked/what-are-abi-encoding-functions-in-solidity-0-4-24-c1a90b5ddce8 <- clarity on abi.encode()
https://github.com/fractional-company/contracts/blob/master/src/OpenZeppelin/drafts/EIP712.sol <- an example implementation of EIP712 wrapper
https://medium.com/uport/simplifying-typed-data-for-ethereum-915a72d576c3 <- another slightly obsolete tutorial about a EIP712 wrapper
https://gist.github.com/ajb413/6ca63eb868e179a9c0a3b8dc735733cf <- yet another wrapper for EIP712
https://docs.metamask.io/guide/signing-data.html#sign-typed-data-v4 <- how metamask uses on EIP712
https://docs.ethers.io/v5/api/signer/ <- how ethers makes EIP712 functions available



### NOTES AND TODOS

	- immediate
		- test
		- write test suites

	- later
		- deal with generating mutations
		- deal with pinata; posting mutations

	- future
		- look at contracts that do fancier things such as game like things



	- add debugging tools such as remix to docs!

	- read https://news.bitcoin.com/want-to-mint-and-sell-an-nft-these-tools-can-give-anyone-the-skills-to-issue-nft-assets/

	- funny https://www.oreilly.com/radar/why-its-too-early-to-get-excited-about-web3

	- reference https://future.a16z.com/nft-canon/

	- https://dev.to/dabit3/building-scalable-full-stack-apps-on-ethereum-with-polygon-2cfb



