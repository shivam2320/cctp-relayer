import { ethers } from "ethers";
import { CHAINS } from "./chains";
import { Providers } from "./providers";
import "dotenv/config";

const privateKey = process.env.PRIVATE_KEY;

export const Wallets = (chain: CHAINS) => {
  return new ethers.Wallet(privateKey!, Providers[chain]);
};
