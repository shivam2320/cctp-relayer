"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenMessengerAddresses = exports.MessageTransmitterAddresses = exports.DepositorAddresses = void 0;
const chains_1 = require("./chains");
exports.DepositorAddresses = {
    [chains_1.CHAINS.ETHEREUM_MAINNET]: "",
    [chains_1.CHAINS.AVALANCHE_MAINNET]: "",
    [chains_1.CHAINS.ARBITRUM_MAINNET]: "",
    [chains_1.CHAINS.ETHEREUM_TESTNET]: "0x90f2154C3C99c990654f887Fc401f2893a354E3A",
    [chains_1.CHAINS.AVALANCHE_TESTNET]: "0x3427e1C8611153e151415104FA18FbE5F3f2cEea",
    [chains_1.CHAINS.ARBITRUM_TESTNET]: "",
};
exports.MessageTransmitterAddresses = {
    [chains_1.CHAINS.ETHEREUM_MAINNET]: "",
    [chains_1.CHAINS.AVALANCHE_MAINNET]: "",
    [chains_1.CHAINS.ARBITRUM_MAINNET]: "",
    [chains_1.CHAINS.ETHEREUM_TESTNET]: "0x26413e8157cd32011e726065a5462e97dd4d03d9",
    [chains_1.CHAINS.AVALANCHE_TESTNET]: "0xa9fb1b3009dcb79e2fe346c16a604b8fa8ae0a79",
    [chains_1.CHAINS.ARBITRUM_TESTNET]: "0x109bc137cb64eab7c0b1dddd1edf341467dc2d35",
};
exports.TokenMessengerAddresses = {
    [chains_1.CHAINS.ETHEREUM_MAINNET]: "",
    [chains_1.CHAINS.AVALANCHE_MAINNET]: "",
    [chains_1.CHAINS.ARBITRUM_MAINNET]: "",
    [chains_1.CHAINS.ETHEREUM_TESTNET]: "0xd0c3da58f55358142b8d3e06c1c30c5c6114efe8",
    [chains_1.CHAINS.AVALANCHE_TESTNET]: "0xeb08f243e5d3fcff26a9e38ae5520a669f4019d0",
    [chains_1.CHAINS.ARBITRUM_TESTNET]: "0x12dcfd3fe2e9eac2859fd1ed86d2ab8c5a2f9352",
};
