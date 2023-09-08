"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenMessengerContract = exports.MessageTransmitterContract = void 0;
const ethers_1 = require("ethers");
const MessageTransmitter_1 = require("./abi/MessageTransmitter");
const providers_1 = require("./providers");
const TokenMessenger_1 = require("./abi/TokenMessenger");
const address_1 = require("./address");
const MessageTransmitterContract = (chain) => {
    return new ethers_1.ethers.Contract(address_1.MessageTransmitterAddresses[chain], MessageTransmitter_1.MessageTransmitterABI, providers_1.Providers[chain]);
};
exports.MessageTransmitterContract = MessageTransmitterContract;
const TokenMessengerContract = (chain) => {
    return new ethers_1.ethers.Contract(address_1.TokenMessengerAddresses[chain], TokenMessenger_1.TokenMessengerABI, providers_1.Providers[chain]);
};
exports.TokenMessengerContract = TokenMessengerContract;
