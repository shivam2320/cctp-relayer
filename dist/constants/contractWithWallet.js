"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractWithWallet = void 0;
const chains_1 = require("./chains");
const contracts_1 = require("./contracts");
const wallets_1 = require("./wallets");
exports.ContractWithWallet = {
    "0": (0, contracts_1.MessageTransmitterContract)(chains_1.CHAINS.ETHEREUM_TESTNET).connect((0, wallets_1.Wallets)(chains_1.CHAINS.ETHEREUM_TESTNET)),
    "1": (0, contracts_1.MessageTransmitterContract)(chains_1.CHAINS.AVALANCHE_TESTNET).connect((0, wallets_1.Wallets)(chains_1.CHAINS.AVALANCHE_TESTNET)),
    "3": (0, contracts_1.MessageTransmitterContract)(chains_1.CHAINS.ARBITRUM_TESTNET).connect((0, wallets_1.Wallets)(chains_1.CHAINS.ARBITRUM_TESTNET)),
};
