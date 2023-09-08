"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Providers = void 0;
const ethers_1 = require("ethers");
const chains_1 = require("./chains");
exports.Providers = {
    [chains_1.CHAINS.ETHEREUM_MAINNET]: new ethers_1.ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth"),
    [chains_1.CHAINS.AVALANCHE_MAINNET]: new ethers_1.ethers.providers.JsonRpcProvider("https://rpc.ankr.com/avalanche"),
    [chains_1.CHAINS.ARBITRUM_MAINNET]: new ethers_1.ethers.providers.JsonRpcProvider("https://rpc.ankr.com/arbitrum"),
    [chains_1.CHAINS.ETHEREUM_TESTNET]: new ethers_1.ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth_goerli"),
    [chains_1.CHAINS.AVALANCHE_TESTNET]: new ethers_1.ethers.providers.JsonRpcProvider("https://rpc.ankr.com/avalanche_fuji"),
    [chains_1.CHAINS.ARBITRUM_TESTNET]: new ethers_1.ethers.providers.JsonRpcProvider("https://goerli-rollup.arbitrum.io/rpc"),
};
