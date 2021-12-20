/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface NFTStoreInterface extends utils.Interface {
  functions: {
    "TYPEHASH()": FunctionFragment;
    "mainSaleOn()": FunctionFragment;
    "mintGift(address[])": FunctionFragment;
    "mintMainSale(uint256)": FunctionFragment;
    "mintPreSaleBrute(uint256)": FunctionFragment;
    "mintPreSaleSigned(uint256,uint256,bytes32,bytes32,uint8)": FunctionFragment;
    "mintedMax()": FunctionFragment;
    "mintedPerTxMax()": FunctionFragment;
    "mintedPerVIPMax()": FunctionFragment;
    "mintedSoFar()": FunctionFragment;
    "mintedVIPMax()": FunctionFragment;
    "nftcontract()": FunctionFragment;
    "owner()": FunctionFragment;
    "preSaleOn()": FunctionFragment;
    "price()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setMainSale(bool)": FunctionFragment;
    "setNFTContract(address)": FunctionFragment;
    "setPreSale(bool)": FunctionFragment;
    "setPrice(uint256)": FunctionFragment;
    "toggleMainSale()": FunctionFragment;
    "togglePreSale()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "vipBruteAdd(address[],uint256[])": FunctionFragment;
    "withdraw(address,uint256)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "TYPEHASH", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "mainSaleOn",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "mintGift", values: [string[]]): string;
  encodeFunctionData(
    functionFragment: "mintMainSale",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "mintPreSaleBrute",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "mintPreSaleSigned",
    values: [BigNumberish, BigNumberish, BytesLike, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "mintedMax", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "mintedPerTxMax",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "mintedPerVIPMax",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "mintedSoFar",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "mintedVIPMax",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "nftcontract",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "preSaleOn", values?: undefined): string;
  encodeFunctionData(functionFragment: "price", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setMainSale",
    values: [boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setNFTContract",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "setPreSale", values: [boolean]): string;
  encodeFunctionData(
    functionFragment: "setPrice",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "toggleMainSale",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "togglePreSale",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "vipBruteAdd",
    values: [string[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [string, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "TYPEHASH", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mainSaleOn", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mintGift", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "mintMainSale",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mintPreSaleBrute",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mintPreSaleSigned",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "mintedMax", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "mintedPerTxMax",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mintedPerVIPMax",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mintedSoFar",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mintedVIPMax",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "nftcontract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "preSaleOn", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "price", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setMainSale",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setNFTContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setPreSale", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setPrice", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "toggleMainSale",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "togglePreSale",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "vipBruteAdd",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "MintedEvent(address,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "WithdrawEvent(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "MintedEvent"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WithdrawEvent"): EventFragment;
}

export type MintedEventEvent = TypedEvent<
  [string, BigNumber],
  { account: string; amount: BigNumber }
>;

export type MintedEventEventFilter = TypedEventFilter<MintedEventEvent>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export type WithdrawEventEvent = TypedEvent<
  [string, BigNumber],
  { to: string; amount: BigNumber }
>;

export type WithdrawEventEventFilter = TypedEventFilter<WithdrawEventEvent>;

export interface NFTStore extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: NFTStoreInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    TYPEHASH(overrides?: CallOverrides): Promise<[string]>;

    mainSaleOn(overrides?: CallOverrides): Promise<[boolean]>;

    mintGift(
      recipients: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    mintMainSale(
      _amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    mintPreSaleBrute(
      _amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    mintPreSaleSigned(
      _amount: BigNumberish,
      _max: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      v: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    mintedMax(overrides?: CallOverrides): Promise<[BigNumber]>;

    mintedPerTxMax(overrides?: CallOverrides): Promise<[BigNumber]>;

    mintedPerVIPMax(overrides?: CallOverrides): Promise<[BigNumber]>;

    mintedSoFar(overrides?: CallOverrides): Promise<[BigNumber]>;

    mintedVIPMax(overrides?: CallOverrides): Promise<[BigNumber]>;

    nftcontract(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    preSaleOn(overrides?: CallOverrides): Promise<[boolean]>;

    price(overrides?: CallOverrides): Promise<[BigNumber]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setMainSale(
      status: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setNFTContract(
      _nftcontract: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setPreSale(
      status: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setPrice(
      _price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    toggleMainSale(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    togglePreSale(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    vipBruteAdd(
      _vips: string[],
      _maxper: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      _address: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  TYPEHASH(overrides?: CallOverrides): Promise<string>;

  mainSaleOn(overrides?: CallOverrides): Promise<boolean>;

  mintGift(
    recipients: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  mintMainSale(
    _amount: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  mintPreSaleBrute(
    _amount: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  mintPreSaleSigned(
    _amount: BigNumberish,
    _max: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    v: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  mintedMax(overrides?: CallOverrides): Promise<BigNumber>;

  mintedPerTxMax(overrides?: CallOverrides): Promise<BigNumber>;

  mintedPerVIPMax(overrides?: CallOverrides): Promise<BigNumber>;

  mintedSoFar(overrides?: CallOverrides): Promise<BigNumber>;

  mintedVIPMax(overrides?: CallOverrides): Promise<BigNumber>;

  nftcontract(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  preSaleOn(overrides?: CallOverrides): Promise<boolean>;

  price(overrides?: CallOverrides): Promise<BigNumber>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setMainSale(
    status: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setNFTContract(
    _nftcontract: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setPreSale(
    status: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setPrice(
    _price: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  toggleMainSale(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  togglePreSale(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  vipBruteAdd(
    _vips: string[],
    _maxper: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdraw(
    _address: string,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    TYPEHASH(overrides?: CallOverrides): Promise<string>;

    mainSaleOn(overrides?: CallOverrides): Promise<boolean>;

    mintGift(recipients: string[], overrides?: CallOverrides): Promise<void>;

    mintMainSale(
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    mintPreSaleBrute(
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    mintPreSaleSigned(
      _amount: BigNumberish,
      _max: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      v: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    mintedMax(overrides?: CallOverrides): Promise<BigNumber>;

    mintedPerTxMax(overrides?: CallOverrides): Promise<BigNumber>;

    mintedPerVIPMax(overrides?: CallOverrides): Promise<BigNumber>;

    mintedSoFar(overrides?: CallOverrides): Promise<BigNumber>;

    mintedVIPMax(overrides?: CallOverrides): Promise<BigNumber>;

    nftcontract(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    preSaleOn(overrides?: CallOverrides): Promise<boolean>;

    price(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setMainSale(status: boolean, overrides?: CallOverrides): Promise<void>;

    setNFTContract(
      _nftcontract: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setPreSale(status: boolean, overrides?: CallOverrides): Promise<void>;

    setPrice(_price: BigNumberish, overrides?: CallOverrides): Promise<void>;

    toggleMainSale(overrides?: CallOverrides): Promise<void>;

    togglePreSale(overrides?: CallOverrides): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    vipBruteAdd(
      _vips: string[],
      _maxper: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw(
      _address: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "MintedEvent(address,uint256)"(
      account?: null,
      amount?: null
    ): MintedEventEventFilter;
    MintedEvent(account?: null, amount?: null): MintedEventEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "WithdrawEvent(address,uint256)"(
      to?: null,
      amount?: null
    ): WithdrawEventEventFilter;
    WithdrawEvent(to?: null, amount?: null): WithdrawEventEventFilter;
  };

  estimateGas: {
    TYPEHASH(overrides?: CallOverrides): Promise<BigNumber>;

    mainSaleOn(overrides?: CallOverrides): Promise<BigNumber>;

    mintGift(
      recipients: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    mintMainSale(
      _amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    mintPreSaleBrute(
      _amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    mintPreSaleSigned(
      _amount: BigNumberish,
      _max: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      v: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    mintedMax(overrides?: CallOverrides): Promise<BigNumber>;

    mintedPerTxMax(overrides?: CallOverrides): Promise<BigNumber>;

    mintedPerVIPMax(overrides?: CallOverrides): Promise<BigNumber>;

    mintedSoFar(overrides?: CallOverrides): Promise<BigNumber>;

    mintedVIPMax(overrides?: CallOverrides): Promise<BigNumber>;

    nftcontract(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    preSaleOn(overrides?: CallOverrides): Promise<BigNumber>;

    price(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setMainSale(
      status: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setNFTContract(
      _nftcontract: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setPreSale(
      status: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setPrice(
      _price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    toggleMainSale(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    togglePreSale(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    vipBruteAdd(
      _vips: string[],
      _maxper: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdraw(
      _address: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    TYPEHASH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mainSaleOn(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mintGift(
      recipients: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    mintMainSale(
      _amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    mintPreSaleBrute(
      _amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    mintPreSaleSigned(
      _amount: BigNumberish,
      _max: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      v: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    mintedMax(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mintedPerTxMax(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mintedPerVIPMax(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mintedSoFar(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mintedVIPMax(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nftcontract(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    preSaleOn(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    price(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setMainSale(
      status: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setNFTContract(
      _nftcontract: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setPreSale(
      status: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setPrice(
      _price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    toggleMainSale(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    togglePreSale(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    vipBruteAdd(
      _vips: string[],
      _maxper: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      _address: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}