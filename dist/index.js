"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const MessageTransmitter_1 = require("./constants/abi/MessageTransmitter");
const providers_1 = require("./constants/providers");
const chains_1 = require("./constants/chains");
const address_1 = require("./constants/address");
const contracts_1 = require("./constants/contracts");
const contractWithWallet_1 = require("./constants/contractWithWallet");
const cross_fetch_1 = __importDefault(require("cross-fetch"));
function sleep(ms) {
    return new Promise((resolveFunc) => setTimeout(resolveFunc, ms));
}
const getLogs = (a, chain) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionObject = a[a.length - 1];
    if (transactionObject.args[3] === address_1.DepositorAddresses[chain]) {
        const dst = transactionObject.args[5].toString();
        const receipt = yield providers_1.Providers[chain].getTransactionReceipt(transactionObject.transactionHash);
        console.log("Transaction hash: ", transactionObject.transactionHash);
        const log = receipt.logs.filter((x) => x.topics[0].toLowerCase() ===
            "0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036".toLowerCase());
        const iface = new ethers_1.ethers.utils.Interface(MessageTransmitter_1.MessageTransmitterABI);
        const message = iface.parseLog(log[0]).args.message;
        return [message, dst];
    }
    return [undefined, undefined];
});
const getAttestation = (message) => __awaiter(void 0, void 0, void 0, function* () {
    const messageHash = ethers_1.utils.keccak256(message);
    console.log("Getting attestation", `https://iris-api-sandbox.circle.com/attestations/${messageHash}`);
    const _response = yield (0, cross_fetch_1.default)(`https://iris-api-sandbox.circle.com/attestations/${messageHash}`).then((resp) => resp.json());
    console.log("Attestation response: ", _response);
    return _response;
});
const relayUSDC = (a, chain) => __awaiter(void 0, void 0, void 0, function* () {
    let [message, dst] = yield getLogs(a, chain);
    console.log("logs: ", message, dst);
    if (!message || !dst)
        return;
    let response = yield getAttestation(message);
    if (response.status === "complete") {
        console.log("Status = complete");
        const txn = yield contractWithWallet_1.ContractWithWallet[dst].receiveMessage(message, response.attestation);
        yield txn.wait();
    }
    else {
        console.log("Status = pending");
        while (response.status === "pending_confirmations") {
            try {
                response = yield getAttestation(message);
                if (response.status === "complete") {
                    console.log("Status = complete");
                    const txn = yield contractWithWallet_1.ContractWithWallet[dst].receiveMessage(message, response.attestation);
                    yield txn.wait();
                    break;
                }
                else {
                    yield sleep(5000);
                    continue;
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    }
});
(0, contracts_1.TokenMessengerContract)(chains_1.CHAINS.ARBITRUM_TESTNET).on("DepositForBurn", (...a) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Relaying in process");
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        yield relayUSDC(a, chains_1.CHAINS.ETHEREUM_TESTNET);
        console.log("Relaying complete");
    }), 15000);
}));
(0, contracts_1.TokenMessengerContract)(chains_1.CHAINS.ETHEREUM_TESTNET).on("DepositForBurn", (...a) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Relaying in process");
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        yield relayUSDC(a, chains_1.CHAINS.ETHEREUM_TESTNET);
        console.log("Relaying complete");
    }), 15000);
}));
(0, contracts_1.TokenMessengerContract)(chains_1.CHAINS.AVALANCHE_TESTNET).on("DepositForBurn", (...a) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Relaying in process");
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        yield relayUSDC(a, chains_1.CHAINS.AVALANCHE_TESTNET);
        console.log("Relaying complete");
    }), 15000);
}));
