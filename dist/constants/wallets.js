"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallets = void 0;
const ethers_1 = require("ethers");
const providers_1 = require("./providers");
require("dotenv/config");
const privateKey = process.env.PRIVATE_KEY;
const Wallets = (chain) => {
    return new ethers_1.ethers.Wallet(privateKey, providers_1.Providers[chain]);
};
exports.Wallets = Wallets;
