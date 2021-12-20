/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { NFTMint, NFTMintInterface } from "../NFTMint";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "__name",
        type: "string",
      },
      {
        internalType: "string",
        name: "__symbol",
        type: "string",
      },
      {
        internalType: "string",
        name: "__baseURI",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "MAX_SUPPLY",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "mintedSoFar",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "__baseURI",
        type: "string",
      },
    ],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_store",
        type: "address",
      },
    ],
    name: "setStore",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "store",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001c5638038062001c5683398101604081905262000034916200024e565b8251839083906200004d906000906020850190620000f5565b50805162000063906001906020840190620000f5565b505050620000806200007a6200009f60201b60201c565b620000a3565b805162000095906007906020840190620000f5565b505050506200032e565b3390565b600680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b8280546200010390620002db565b90600052602060002090601f01602090048101928262000127576000855562000172565b82601f106200014257805160ff191683800117855562000172565b8280016001018555821562000172579182015b828111156200017257825182559160200191906001019062000155565b506200018092915062000184565b5090565b5b8082111562000180576000815560010162000185565b600082601f830112620001ac578081fd5b81516001600160401b0380821115620001c957620001c962000318565b604051601f8301601f19908116603f01168101908282118183101715620001f457620001f462000318565b8160405283815260209250868385880101111562000210578485fd5b8491505b8382101562000233578582018301518183018401529082019062000214565b838211156200024457848385830101525b9695505050505050565b60008060006060848603121562000263578283fd5b83516001600160401b03808211156200027a578485fd5b62000288878388016200019b565b945060208601519150808211156200029e578384fd5b620002ac878388016200019b565b93506040860151915080821115620002c2578283fd5b50620002d1868287016200019b565b9150509250925092565b600181811c90821680620002f057607f821691505b602082108114156200031257634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b611918806200033e6000396000f3fe608060405234801561001057600080fd5b506004361061014d5760003560e01c80636c0360eb116100c3578063975057e71161007c578063975057e71461029d578063a22cb465146102b0578063b88d4fde146102c3578063c87b56dd146102d6578063e985e9c5146102e9578063f2fde38b1461032557600080fd5b80636c0360eb1461025857806370a0823114610260578063715018a6146102735780638da5cb5b1461027b57806393bd3da51461028c57806395d89b411461029557600080fd5b806323b872dd1161011557806323b872dd146101e257806332cb6b0c146101f557806342842e0e1461020c57806355f804b31461021f5780636352211e146102325780636a6278421461024557600080fd5b806301ffc9a71461015257806306fdde031461017a578063081812fc1461018f578063087cbd40146101ba578063095ea7b3146101cf575b600080fd5b610165610160366004611598565b610338565b60405190151581526020015b60405180910390f35b61018261038a565b60405161017191906116c6565b6101a261019d366004611616565b61041c565b6040516001600160a01b039091168152602001610171565b6101cd6101c8366004611435565b6104b6565b005b6101cd6101dd36600461156f565b610502565b6101cd6101f0366004611481565b610618565b6101fe61271081565b604051908152602001610171565b6101cd61021a366004611481565b610649565b6101cd61022d3660046115d0565b610664565b6101a2610240366004611616565b6106a5565b6101cd610253366004611435565b61071c565b610182610826565b6101fe61026e366004611435565b6108b4565b6101cd61093b565b6006546001600160a01b03166101a2565b6101fe60085481565b610182610971565b6009546101a2906001600160a01b031681565b6101cd6102be366004611535565b610980565b6101cd6102d13660046114bc565b61098b565b6101826102e4366004611616565b6109c3565b6101656102f736600461144f565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b6101cd610333366004611435565b610a9e565b60006001600160e01b031982166380ac58cd60e01b148061036957506001600160e01b03198216635b5e139f60e01b145b8061038457506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606000805461039990611820565b80601f01602080910402602001604051908101604052809291908181526020018280546103c590611820565b80156104125780601f106103e757610100808354040283529160200191610412565b820191906000526020600020905b8154815290600101906020018083116103f557829003601f168201915b5050505050905090565b6000818152600260205260408120546001600160a01b031661049a5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b6006546001600160a01b031633146104e05760405162461bcd60e51b81526004016104919061172b565b600980546001600160a01b0319166001600160a01b0392909216919091179055565b600061050d826106a5565b9050806001600160a01b0316836001600160a01b0316141561057b5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152608401610491565b336001600160a01b0382161480610597575061059781336102f7565b6106095760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c00000000000000006064820152608401610491565b6106138383610b39565b505050565b6106223382610ba7565b61063e5760405162461bcd60e51b815260040161049190611760565b610613838383610c9e565b6106138383836040518060200160405280600081525061098b565b6006546001600160a01b0316331461068e5760405162461bcd60e51b81526004016104919061172b565b80516106a190600790602084019061130a565b5050565b6000818152600260205260408120546001600160a01b0316806103845760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b6064820152608401610491565b6009546001600160a01b031633148061074e5750336107436006546001600160a01b031690565b6001600160a01b0316145b6107b75760405162461bcd60e51b815260206004820152603460248201527f21212120796f75206e65656420746f20706f696e7420796f7572206e66746d696044820152736e7420617420796f75722073746f72652021212160601b6064820152608401610491565b612710600854106107ff5760405162461bcd60e51b815260206004820152601260248201527145786365656473206d617820737570706c7960701b6044820152606401610491565b61080b81600854610e3e565b60016008600082825461081e91906117b1565b909155505050565b6007805461083390611820565b80601f016020809104026020016040519081016040528092919081815260200182805461085f90611820565b80156108ac5780601f10610881576101008083540402835291602001916108ac565b820191906000526020600020905b81548152906001019060200180831161088f57829003601f168201915b505050505081565b60006001600160a01b03821661091f5760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b6064820152608401610491565b506001600160a01b031660009081526003602052604090205490565b6006546001600160a01b031633146109655760405162461bcd60e51b81526004016104919061172b565b61096f6000610f80565b565b60606001805461039990611820565b6106a1338383610fd2565b6109953383610ba7565b6109b15760405162461bcd60e51b815260040161049190611760565b6109bd848484846110a1565b50505050565b6000818152600260205260409020546060906001600160a01b0316610a425760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b6064820152608401610491565b6000610a4c6110d4565b90506000815111610a6c5760405180602001604052806000815250610a97565b80610a76846110e3565b604051602001610a8792919061165a565b6040516020818303038152906040525b9392505050565b6006546001600160a01b03163314610ac85760405162461bcd60e51b81526004016104919061172b565b6001600160a01b038116610b2d5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610491565b610b3681610f80565b50565b600081815260046020526040902080546001600160a01b0319166001600160a01b0384169081179091558190610b6e826106a5565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600260205260408120546001600160a01b0316610c205760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b6064820152608401610491565b6000610c2b836106a5565b9050806001600160a01b0316846001600160a01b03161480610c665750836001600160a01b0316610c5b8461041c565b6001600160a01b0316145b80610c9657506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b0316610cb1826106a5565b6001600160a01b031614610d195760405162461bcd60e51b815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201526839903737ba1037bbb760b91b6064820152608401610491565b6001600160a01b038216610d7b5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610491565b610d86600082610b39565b6001600160a01b0383166000908152600360205260408120805460019290610daf9084906117dd565b90915550506001600160a01b0382166000908152600360205260408120805460019290610ddd9084906117b1565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6001600160a01b038216610e945760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610491565b6000818152600260205260409020546001600160a01b031615610ef95760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610491565b6001600160a01b0382166000908152600360205260408120805460019290610f229084906117b1565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b600680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b816001600160a01b0316836001600160a01b031614156110345760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610491565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6110ac848484610c9e565b6110b8848484846111fd565b6109bd5760405162461bcd60e51b8152600401610491906116d9565b60606007805461039990611820565b6060816111075750506040805180820190915260018152600360fc1b602082015290565b8160005b8115611131578061111b8161185b565b915061112a9050600a836117c9565b915061110b565b60008167ffffffffffffffff81111561115a57634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015611184576020820181803683370190505b5090505b8415610c96576111996001836117dd565b91506111a6600a86611876565b6111b19060306117b1565b60f81b8183815181106111d457634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a9053506111f6600a866117c9565b9450611188565b60006001600160a01b0384163b156112ff57604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290611241903390899088908890600401611689565b602060405180830381600087803b15801561125b57600080fd5b505af192505050801561128b575060408051601f3d908101601f19168201909252611288918101906115b4565b60015b6112e5573d8080156112b9576040519150601f19603f3d011682016040523d82523d6000602084013e6112be565b606091505b5080516112dd5760405162461bcd60e51b8152600401610491906116d9565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610c96565b506001949350505050565b82805461131690611820565b90600052602060002090601f016020900481019282611338576000855561137e565b82601f1061135157805160ff191683800117855561137e565b8280016001018555821561137e579182015b8281111561137e578251825591602001919060010190611363565b5061138a92915061138e565b5090565b5b8082111561138a576000815560010161138f565b600067ffffffffffffffff808411156113be576113be6118b6565b604051601f8501601f19908116603f011681019082821181831017156113e6576113e66118b6565b816040528093508581528686860111156113ff57600080fd5b858560208301376000602087830101525050509392505050565b80356001600160a01b038116811461143057600080fd5b919050565b600060208284031215611446578081fd5b610a9782611419565b60008060408385031215611461578081fd5b61146a83611419565b915061147860208401611419565b90509250929050565b600080600060608486031215611495578081fd5b61149e84611419565b92506114ac60208501611419565b9150604084013590509250925092565b600080600080608085870312156114d1578081fd5b6114da85611419565b93506114e860208601611419565b925060408501359150606085013567ffffffffffffffff81111561150a578182fd5b8501601f8101871361151a578182fd5b611529878235602084016113a3565b91505092959194509250565b60008060408385031215611547578182fd5b61155083611419565b915060208301358015158114611564578182fd5b809150509250929050565b60008060408385031215611581578182fd5b61158a83611419565b946020939093013593505050565b6000602082840312156115a9578081fd5b8135610a97816118cc565b6000602082840312156115c5578081fd5b8151610a97816118cc565b6000602082840312156115e1578081fd5b813567ffffffffffffffff8111156115f7578182fd5b8201601f81018413611607578182fd5b610c96848235602084016113a3565b600060208284031215611627578081fd5b5035919050565b600081518084526116468160208601602086016117f4565b601f01601f19169290920160200192915050565b6000835161166c8184602088016117f4565b8351908301906116808183602088016117f4565b01949350505050565b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906116bc9083018461162e565b9695505050505050565b602081526000610a97602083018461162e565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b600082198211156117c4576117c461188a565b500190565b6000826117d8576117d86118a0565b500490565b6000828210156117ef576117ef61188a565b500390565b60005b8381101561180f5781810151838201526020016117f7565b838111156109bd5750506000910152565b600181811c9082168061183457607f821691505b6020821081141561185557634e487b7160e01b600052602260045260246000fd5b50919050565b600060001982141561186f5761186f61188a565b5060010190565b600082611885576118856118a0565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160e01b031981168114610b3657600080fdfea2646970667358221220a385c334115037f2e37455f04fea890d004f8e47fd68767b16c17a9dffa4912c64736f6c63430008040033";

type NFTMintConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NFTMintConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NFTMint__factory extends ContractFactory {
  constructor(...args: NFTMintConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    __name: string,
    __symbol: string,
    __baseURI: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<NFTMint> {
    return super.deploy(
      __name,
      __symbol,
      __baseURI,
      overrides || {}
    ) as Promise<NFTMint>;
  }
  getDeployTransaction(
    __name: string,
    __symbol: string,
    __baseURI: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      __name,
      __symbol,
      __baseURI,
      overrides || {}
    );
  }
  attach(address: string): NFTMint {
    return super.attach(address) as NFTMint;
  }
  connect(signer: Signer): NFTMint__factory {
    return super.connect(signer) as NFTMint__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NFTMintInterface {
    return new utils.Interface(_abi) as NFTMintInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NFTMint {
    return new Contract(address, _abi, signerOrProvider) as NFTMint;
  }
}
