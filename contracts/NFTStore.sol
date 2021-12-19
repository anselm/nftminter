// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// import "./BloomFilter.sol";

interface NFTContract {
	function mint(address) external;
}

contract NFTStore is EIP712, Ownable {

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Public events
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	event MintedEvent(address account, uint256 amount);
	event WithdrawEvent(address to, uint256 amount);

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Variables
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// This is address of the lower level raw nft mint that the store is managing - it can be changed on the fly
	NFTContract public nftcontract = NFTContract(0x47389c1CC6b183C066fABe79689dd39E3890E923);

	// Price per item (all items have the same price in this approach - arguably the lower level contract could store this)
	uint256 public price = 0.01 ether;

	// There is a concept of a presale open only to VIPS
	bool public preSaleOn = false;

	// There is a concept of a mainsale open to everybody
	bool public mainSaleOn = false;

	// How many have been sold?
	uint256 public mintedSoFar = 0;

	// There is a concept of a total ceiling of how many can be sold absolutely before the store "sells out" in this approach
	uint256 public mintedMax = 9999;

	// Security paranoia; limit how many tokens can be minted per transaction
	uint256 public constant mintedPerTxMax = 30;

	// There is a concept of a VIP list of early permitted participants. This is the cap of the total they can buy.
	uint256 public mintedVIPMax = 1000;

	// There are various strategies for limiting VIP sales. In one approach all VIPS have the same maximum opportunity.
	uint256 public mintedPerVIPMax = 4;

	// Convenience mapping to more easily track how many items have been sold to a given VIP
	mapping(address => uint256) private mintedPerVIP;

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Modifiers
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	modifier mainSaleOnTest() {
		require( mainSaleOn, "Store is not opened" );
		_;
	}

	modifier preSaleOnTest() {
		require(preSaleOn, "Store is not opened for you");
		_;
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Setters
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	function setNFTContract(NFTContract _nftcontract) external onlyOwner {
		nftcontract = _nftcontract;
	}

	function setPrice(uint256 _price) external onlyOwner {
		price = _price;
	}

	function togglePreSale() external onlyOwner {
		preSaleOn = !preSaleOn;
	}

	function toggleMainSale() external onlyOwner {
		mainSaleOn = !mainSaleOn;
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Constructor with support for EIP712
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// see https://github.com/ethereum/EIPs/blob/master/assets/eip-712/Example.sol
	// https://medium.com/metamask/eip712-is-coming-what-to-expect-and-how-to-use-it-bb92fd1a7a26
	// https://eips.ethereum.org/EIPS/eip-712

	constructor( string memory _name ) EIP712("BUZZ", "1" ) {
		//vipBloomFilter.init(1000);
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Withdrawal helpers
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	function withdraw(address _address, uint256 _amount) external onlyOwner {
		payable(_address).transfer(_amount);
		emit WithdrawEvent(_address,_amount);
	}

	/*
	mapping(address => uint256) public stakeholders;
	uint256 private nstakeholders = 0;
	uint256 private constant stakeBase = 100000;

	function stakesUpdate(address[] memory _stakers,uint256[] memory _percentages) external onlyOwner {
		uint256 len = _stakers.length;
		require(len == _percentages.length,"arrays do not match len");
		require(len < mintedPerTxMax,"too many at a time");
		for (uint256 i = 0; i < len; i++) {
			address addr = _stakers[i];
			require(addr != address(0),"address(0) found");
			stakeholders[addr]=_percentages[i];
		}
		nstakeholders++
	}

	function stakesWithdraw(uint256 _amount) external {
		bool permitted = false;
		if(msg.sender == owner()) permitted = true ;
		for (uint256 i = 0; i < nstakeholders; i++) {
			if(msg.sender == stakeholders[i]) permitted = true;
		}
		require(permitted,"only stakeholders can perform payouts");
		for (uint256 i = 0; i < len; i++) {
			uint256 chunk = _amount / stakeBase;
			payable(stakeholders[i],chunk);
		}
	}
	*/

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Minting
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	function mintGift(address[] memory recipients) external onlyOwner {
		uint256 _amount = recipients.length;
		require(_amount <= mintedPerTxMax, "exceeds max tx");
		require(_amount <= mintedMax - mintedSoFar, "exceeds avail");
		for (uint256 i = 0; i < _amount; i++) {
			require(recipients[i] != address(0),"invalid gift address found");
		}
		for (uint256 i = 0; i < _amount; i++) {
			nftcontract.mint(recipients[i]);
		}
		mintedSoFar+=_amount;
		emit MintedEvent(msg.sender, _amount);
	}

	function mintMainSale(uint256 _amount) external payable mainSaleOnTest {
		require(_amount <= mintedPerTxMax, "exceeds max tx");
		require(_amount <= mintedMax - mintedSoFar, "exceeds avail");
		require(price * _amount <= msg.value, "exceeds caller spend");
		for (uint256 i = 0; i < _amount; i++) {
			nftcontract.mint(msg.sender);
		}
		mintedSoFar+=_amount;
		emit MintedEvent(msg.sender, _amount);
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Method #1 for doing a VIP whitelist - a brute force mapping. Very expensive!
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	mapping(address => uint256) private vip_brute;

	function vipBruteAdd(address[] memory _vips, uint256[] memory _maxper) public onlyOwner {
		uint256 len = _vips.length;
		require(len == _maxper.length, "arrays do not match len");
		for (uint256 i = 0; i < len; i++) {
			address addr = _vips[i];
			require(addr != address(0),"address(0) found");
			vip_brute[addr] = _maxper[i];
		}
	}

	function mintPreSaleBrute(uint256 _amount) external payable preSaleOnTest {
		require(_amount <= mintedPerTxMax, "exceeds max tx");
		require(_amount <= mintedMax - mintedSoFar, "exceeds avail");
		require(price * _amount <= msg.value, "exceeds caller spend");
		require(_amount <= mintedVIPMax - mintedSoFar,"exceeds vip avail");
		require(_amount <= vip_brute[msg.sender], "exceeds avail to you");
		for (uint256 i = 0; i < _amount; i++) {
			nftcontract.mint(msg.sender);
		}
		vip_brute[msg.sender] -= _amount;
		mintedSoFar+=_amount;
		emit MintedEvent(msg.sender, _amount);
	}

	/*
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Method #2 for doing a VIP whitelist - a bloom filter. Expensive! - could be optimized by building bloom offchain
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	BloomFilter.Filter vipBloomFilter;

	function vipBloomAdd(address _address) external onlyOwner {
		vipBloomFilter.add( bytes32(uint256(uint160(_address)) << 96) );
	}

	function vipBloomFinalize(uint256 _amount) internal {
		bool mayParticipate = true; //vipBloomFilter.check( bytes32(uint256(uint160(msg.sender)) << 96) );
		require( mayParticipate, "not in presale");
	}

	function mintPreSaleBloom(uint256 _amount) external payable preSaleOnTest {
		require(_amount <= mintedPerTxMax, "exceeds max tx");
		require(_amount <= mintedMax - mintedSoFar, "exceeds avail");
		require(price * _amount <= msg.value, "exceeds caller spend");
		require(_amount <= mintedVIPMax - mintedSoFar,"exceeds vip avail");
		require(_amount <= mintedPerVIPMax - mintedPerVIP[msg.sender],"exceeds per vip");
		vipBloomFinalize(_amount);
		for (uint256 i = 0; i < _amount; i++) {
			nftcontract.mint(msg.sender);
		}
		mintedPerVIP[msg.sender]+=_amount;
		mintedSoFar+=_amount;
		emit MintedEvent(msg.sender, _amount);
	}
	*/

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Method #3 for doing a VIP whitelist - use EIP712
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	bytes32 public constant TYPEHASH = keccak256("PassReq(address receiver,uint256 amount)");

	function vipSignedFinalize(uint256 _amount, uint256 _max, bytes32 r, bytes32 s, uint8 v ) internal {
		bytes32 digest = _hashTypedDataV4( keccak256(abi.encode(TYPEHASH, msg.sender, _max)) );
		address signer = ecrecover(digest,v,r,s);
		require(signer == msg.sender, "Signature is not from the owner");
	}

	function mintPreSaleSigned(uint256 _amount,uint256 _max, bytes32 r, bytes32 s, uint8 v) external payable preSaleOnTest {
		require(_amount <= mintedPerTxMax, "exceeds max tx");
		require(_amount <= mintedMax - mintedSoFar, "exceeds avail");
		require(price * _amount <= msg.value, "exceeds caller spend");
		require(_amount <= mintedVIPMax - mintedSoFar, "exceeds vip avail");
		require(_amount <= _max - mintedPerVIP[msg.sender], "exceeds mint avail for you");
		vipSignedFinalize(_amount,_max,r,s,v);
		for (uint256 i = 0; i < _amount; i++) {
			nftcontract.mint(msg.sender);
		}
		mintedPerVIP[msg.sender]+=_amount;
		mintedSoFar+=_amount;
		emit MintedEvent(msg.sender, _amount);
	}

}
