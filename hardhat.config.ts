import '@nomiclabs/hardhat-etherscan';
import 'hardhat-gas-reporter';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import 'hardhat-contract-sizer';
import 'hardhat-tracer';
import 'solidity-coverage';
import { HardhatUserConfig } from 'hardhat/config';
import dotenv from 'dotenv';


const { INFURA_KEY_MAINNET } = require('./secrets.json')
const { INFURA_KEY_RINKEBY } = require('./secrets.json')
const { RINKEBY_PRIV_KEY } = require('./secrets.json')
const { MAINNET_PRIV_KEY } = require('./secrets.json')

//const { ETHERSCAN_KEY } = require('./secrets.json')

let ETHERSCAN_KEY = "YB6JB2DN896C398GK1Z4AVQANTXQVABJEQ"

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const onlyRunInFullTest = () => (process.env.FULL_TEST ? true : false);

const config: HardhatUserConfig = {
  solidity: { version: "0.8.4",
   settings: { optimizer: {enabled: true,runs: 200} },
  },
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_KEY_RINKEBY}`,
      accounts: [`0x${RINKEBY_PRIV_KEY}`]
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_KEY_MAINNET}`,
      accounts: [`0x${MAINNET_PRIV_KEY}`]
    }
  },

  etherscan: {
    apiKey: ETHERSCAN_KEY,
  }
};

export default config;
