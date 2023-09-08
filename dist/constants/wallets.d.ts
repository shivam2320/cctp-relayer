import { ethers } from "ethers";
import { CHAINS } from "./chains";
import "dotenv/config";
export declare const Wallets: (chain: CHAINS) => ethers.Wallet;
