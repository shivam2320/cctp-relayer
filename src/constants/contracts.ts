import { ethers } from "ethers";
import { CHAINS } from "./chains";
import { MessageTransmitterABI } from "./abi/MessageTransmitter";
import { Providers } from "./providers";
import { TokenMessengerABI } from "./abi/TokenMessenger";
import {
  MessageTransmitterAddresses,
  TokenMessengerAddresses,
} from "./address";

export const MessageTransmitterContract = (chain: CHAINS) => {
  return new ethers.Contract(
    MessageTransmitterAddresses[chain],
    MessageTransmitterABI,
    Providers[chain]
  );
};

export const TokenMessengerContract = (chain: CHAINS) => {
  return new ethers.Contract(
    TokenMessengerAddresses[chain],
    TokenMessengerABI,
    Providers[chain]
  );
};
