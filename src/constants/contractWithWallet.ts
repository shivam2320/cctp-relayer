import { Contract } from "ethers";
import { CHAINS } from "./chains";
import { MessageTransmitterContract } from "./contracts";
import { Wallets } from "./wallets";

export const ContractWithWallet: { [key: string]: Contract } = {
  "0": MessageTransmitterContract(CHAINS.ETHEREUM_TESTNET).connect(
    Wallets(CHAINS.ETHEREUM_TESTNET)
  ),
  "1": MessageTransmitterContract(CHAINS.AVALANCHE_TESTNET).connect(
    Wallets(CHAINS.AVALANCHE_TESTNET)
  ),
  "3": MessageTransmitterContract(CHAINS.ARBITRUM_TESTNET).connect(
    Wallets(CHAINS.ARBITRUM_TESTNET)
  ),
};
