import { ethers } from "ethers";
import { CHAINS } from "./chains";

export const Providers = {
  [CHAINS.ETHEREUM_MAINNET]: new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth"
  ),
  [CHAINS.AVALANCHE_MAINNET]: new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/avalanche"
  ),
  [CHAINS.ARBITRUM_MAINNET]: new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/arbitrum"
  ),
  [CHAINS.ETHEREUM_TESTNET]: new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth_goerli"
  ),
  [CHAINS.AVALANCHE_TESTNET]: new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/avalanche_fuji"
  ),
  [CHAINS.ARBITRUM_TESTNET]: new ethers.providers.JsonRpcProvider(
    "https://goerli-rollup.arbitrum.io/rpc"
  ),
};
