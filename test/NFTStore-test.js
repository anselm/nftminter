import chai from 'chai';
import { ethers } from 'hardhat';
import { TestNFTStore, TestNFTStore__factory } from '../types';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { solidity } from 'ethereum-waffle';
import { signTypedData, DomainType, splitSignature } from './utils/EIP712';

chai.use(solidity);
const { expect } = chai;

const MAX_SUPPLY = 1000;
const configs = {
	name: 'BUZZ',
	symbol: 'BUZZ',
	baseURI: 'https://myawesome.com/tokens/',
};

describe('NFTStore', () => {

	let [
		deployer,
		nonDeployer,
		tokenHolder,
		nonTokenHolder,
	]: SignerWithAddress[] = [];

	let nftsContract: TestNFTStore;

	beforeEach(async () => {
		[deployer, nonDeployer, tokenHolder, nonTokenHolder] =
		await ethers.getSigners();
		const NFTStoreFactory = new TestNFTStore__factory(deployer);
		nftsContract = await NFTStoreFactory.deploy(
			configs.name,
			configs.symbol,
			configs.baseURI
		);
	});

	describe('constructor', async () => {
		it('Should be initialized successfully', async () => {
			expect(await nftsContract.owner()).to.eq(deployer.address);
//			expect(await nftsContract.paused()).to.eq(true);
//			expect(await nftsContract.baseURI()).to.eq(configs.baseURI);
//			expect(await nftsContract.totalSupply()).to.eq(0);
//			expect(await nftsContract.MAX_SUPPLY()).to.eq(MAX_SUPPLY);
//			expect(await nftsContract.name()).to.eq(configs.name);
//			expect(await nftsContract.symbol()).to.eq(configs.symbol);
//			expect(await nftsContract.claimUntil()).to.eq(0);
		});
	});

/*
	describe('pause', async () => {
		it('can be set by owner only', async () => {
			await expect(
				nftsContract.connect(nonDeployer).pause()
				).to.be.revertedWith('Ownable: caller is not the owner');
			await expect(nftsContract.connect(deployer).pause()).not.to.be.reverted;
		});

		it("emit 'Paused' event", async () => {
			await expect(nftsContract.connect(deployer).pause()).to.emit(
				nftsContract,
				'Paused'
				);
		});

		it('prevents token transfer', async () => {
			const tokenId = 10;
			await nftsContract.connect(deployer).mint(tokenHolder.address, tokenId);
			expect(await nftsContract.ownerOf(tokenId)).to.eq(tokenHolder.address);

			expect(await nftsContract.paused()).to.eq(true);

			await expect(
				nftsContract
				.connect(tokenHolder)
				.transferFrom(tokenHolder.address, nonTokenHolder.address, tokenId)
				).to.be.revertedWith('token transfer while paused');
		});
	});

	describe('unpause', async () => {
		it('can be set by owner only', async () => {
			await expect(
				nftsContract.connect(nonDeployer).unpause()
				).to.be.revertedWith('Ownable: caller is not the owner');

			await expect(nftsContract.connect(deployer).unpause()).not.to.be.reverted;
		});

		it("emit 'Unpaused' event", async () => {
			await expect(nftsContract.connect(deployer).unpause()).to.emit(
				nftsContract,
				'Unpaused'
				);
		});

		it('allow token transfer', async () => {
			const tokenId = 10;
			await nftsContract.connect(deployer).mint(tokenHolder.address, tokenId);
			expect(await nftsContract.ownerOf(tokenId)).to.eq(tokenHolder.address);

			await nftsContract.connect(deployer).unpause();
			expect(await nftsContract.paused()).to.eq(false);

			await expect(
				nftsContract
				.connect(tokenHolder)
				.transferFrom(tokenHolder.address, nonTokenHolder.address, tokenId)
				).not.to.be.reverted;

			expect(await nftsContract.ownerOf(tokenId)).to.eq(nonTokenHolder.address);
		});
	});

	describe('setClaimUntil', async () => {
		it("fails for non-owner's request", async () => {
			await expect(
				nftsContract.connect(nonDeployer).setClaimUntil(1)
				).to.be.revertedWith('Ownable: caller is not the owner');

			await expect(nftsContract.connect(deployer).setClaimUntil(1)).not.to.be
			.reverted;
		});

		it("sets 'claimUntil' timestamp", async () => {
			const targetTimestamp = 1000000;

			const currentTimestamp = await nftsContract.claimUntil();
			expect(currentTimestamp).to.eq(0).not.to.eq(targetTimestamp);

			await nftsContract.connect(deployer).setClaimUntil(targetTimestamp);

			const newTimestamp = await nftsContract.claimUntil();
			expect(newTimestamp).to.eq(targetTimestamp);
		});

		it("emits 'SetClaimUntil' event", async () => {
			const targetTimestamp = 1000000;

			await expect(
				nftsContract.connect(deployer).setClaimUntil(targetTimestamp)
				)
			.to.emit(nftsContract, 'SetClaimUntil')
			.withArgs(targetTimestamp);
		});
	});

	describe('tokenURI', async () => {
		it('always return same endpoint', async () => {
			expect(await nftsContract.tokenURI(0)).to.eq(configs.baseURI);
			expect(await nftsContract.tokenURI(1)).to.eq(configs.baseURI);
		});
	});
*/

	describe('mintPreSaleSigned', async () => {

		let currentTimestamp: number;

		const amount = 4;

		let contractOwner: SignerWithAddress = deployer;
		let receiver: SignerWithAddress = nonDeployer;
		let domain: DomainType;
		let types: any;
		let signature: string;

		// [v, r, s]
		let splitSig: [number, string, string];

		beforeEach(async () => {

			contractOwner = deployer;
			receiver = nonDeployer;

			domain = {
				name: configs.name,
				version: '1',
				chainId: 31337, // hardhat test chainId
				verifyingContract: nftsContract.address,
			};

			types = {
				NFTStoreReq: [
				{
					name: 'receiver',
					type: 'address',
				},
				{
					name: 'amount',
					type: 'uint256',
				},
				],
			};

			signature = await signTypedData({
				signer: contractOwner,
				domain,
				types,
				data: {
					receiver: receiver.address,
					amount,
				},
			});

			const { r, s, v } = splitSignature(signature);
			splitSig = [v, r, s];

			const currentBlockNum = await ethers.provider.getBlockNumber();
			const currentBlock = await ethers.provider.getBlock(currentBlockNum);
			currentTimestamp = currentBlock.timestamp;

//			await nftsContract.setClaimUntil(currentTimestamp + 3600);
		});

		it('successfully mints claimed amount nfts', async () => {
			const currentNFTStoreBalance = await nftsContract.balanceOf(receiver.address);

			await nftsContract.connect(receiver).claimNFTStore(amount, ...splitSig);

			const updatedNFTStoreBalance = await nftsContract.balanceOf(receiver.address);
			expect(updatedNFTStoreBalance).to.eq(currentNFTStoreBalance.toNumber() + amount);
		});

		it("fails if block.timestamp exceeds 'claimUntil' timestamp", async () => {
			await nftsContract.setClaimUntil(1);

			await expect(
				nftsContract.connect(receiver).claimNFTStore(amount, ...splitSig)
				).to.be.revertedWith('Claim period has been ended');

			await nftsContract.setClaimUntil(currentTimestamp + 3600);
			await expect(
				nftsContract.connect(receiver).claimNFTStore(amount, ...splitSig)
				).not.to.be.reverted;
		});

		it('fails if user already holds nfts', async () => {
			await nftsContract.connect(receiver).claimNFTStore(amount, ...splitSig);
			const nftsBalance = await nftsContract.balanceOf(receiver.address);
			expect(nftsBalance).to.eq(amount).not.to.eq(0);

			await expect(
				nftsContract.connect(receiver).claimNFTStore(amount, ...splitSig)
				).to.be.revertedWith('Already received nfts');
		});

		it('fails if unmatched amount is sent', async () => {
			await expect(
				nftsContract.connect(receiver).claimNFTStore(amount + 1, ...splitSig)
				).to.be.revertedWith('Signature is not from the owner');
		});

		it('fails if signer is not the contract owner', async () => {
			signature = await signTypedData({
				signer: receiver,
				domain,
				types,
				data: {
					receiver: receiver.address,
					amount,
				},
			});
			const { r, s, v } = splitSignature(signature);

			await expect(
				nftsContract.connect(receiver).claimNFTStore(amount + 1, v, r, s)
				).to.be.revertedWith('Signature is not from the owner');
		});

		it('fails if receiver and transaction sender are different', async () => {
			await expect(
				nftsContract.connect(deployer).claimNFTStore(amount, ...splitSig)
				).to.be.revertedWith('Signature is not from the owner');
		});

		it('fails if trying to mint more than MAX_SUPPLY', async () => {
			const attemptAmount = MAX_SUPPLY + 1;
			signature = await signTypedData({
				signer: contractOwner,
				domain,
				types,
				data: {
					receiver: receiver.address,
					amount: attemptAmount,
				},
			});
			const { r, s, v } = splitSignature(signature);

			await expect(
				nftsContract.connect(receiver).claimNFTStore(attemptAmount, v, r, s)
				).to.be.revertedWith('Exceeds max supply');
		});

		it('emits ClaimNFTStore event', async () => {
			await expect(
				nftsContract.connect(receiver).claimNFTStore(amount, ...splitSig)
				)
			.to.emit(nftsContract, 'ClaimNFTStore')
			.withArgs(receiver.address, amount);
		});
	});

});