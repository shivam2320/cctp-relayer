import { ethers } from "ethers";
import { CHAINS } from "./chains";
export declare const MessageTransmitterContract: (chain: CHAINS) => ethers.Contract;
export declare const TokenMessengerContract: (chain: CHAINS) => ethers.Contract;
