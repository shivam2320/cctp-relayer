import { ethers, utils } from "ethers";
import { MessageTransmitterABI } from "./constants/abi/MessageTransmitter";
import { Providers } from "./constants/providers";
import { CHAINS } from "./constants/chains";
import { DepositorAddresses } from "./constants/address";
import { TokenMessengerContract } from "./constants/contracts";
import { ContractWithWallet } from "./constants/contractWithWallet";
import fetch from "cross-fetch";

function sleep(ms: number) {
  return new Promise((resolveFunc) => setTimeout(resolveFunc, ms));
}

const getLogs = async (a: any, chain: CHAINS) => {
  const transactionObject = a[a.length - 1];
  if (transactionObject.args[3] === DepositorAddresses[chain]) {
    const dst: string = transactionObject.args[5].toString();
    const receipt = await Providers[chain].getTransactionReceipt(
      transactionObject.transactionHash
    );
    console.log("Transaction hash: ", transactionObject.transactionHash);
    const log = receipt.logs.filter(
      (x) =>
        x.topics[0].toLowerCase() ===
        "0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036".toLowerCase()
    );

    const iface = new ethers.utils.Interface(MessageTransmitterABI);

    const message = iface.parseLog(log[0]).args.message;

    return [message, dst];
  }

  return [undefined, undefined];
};

const getAttestation = async (message: string) => {
  const messageHash = utils.keccak256(message);
  console.log(
    "Getting attestation",
    `https://iris-api-sandbox.circle.com/attestations/${messageHash}`
  );
  const _response = await fetch(
    `https://iris-api-sandbox.circle.com/attestations/${messageHash}`
  ).then((resp) => resp.json());
  console.log("Attestation response: ", _response);

  return _response;
};

const relayUSDC = async (a: any, chain: CHAINS) => {
  let [message, dst] = await getLogs(a, chain);
  console.log("logs: ", message, dst);
  if (!message || !dst) return;

  let response = await getAttestation(message!);

  if (response.status === "complete") {
    console.log("Status = complete");
    const txn = await ContractWithWallet[dst].receiveMessage(
      message,
      response.attestation
    );
    await txn.wait();
  } else {
    console.log("Status = pending");
    while (response.status === "pending_confirmations") {
      try {
        response = await getAttestation(message!);

        if (response.status === "complete") {
          console.log("Status = complete");
          const txn = await ContractWithWallet[dst].receiveMessage(
            message,
            response.attestation
          );
          await txn.wait();

          break;
        } else {
          await sleep(5000);
          continue;
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};

TokenMessengerContract(CHAINS.ARBITRUM_TESTNET).on(
  "DepositForBurn",
  async (...a) => {
    console.log("Relaying in process");
    setTimeout(async () => {
      await relayUSDC(a, CHAINS.ETHEREUM_TESTNET);
      console.log("Relaying complete");
    }, 15000);
  }
);

TokenMessengerContract(CHAINS.ETHEREUM_TESTNET).on(
  "DepositForBurn",
  async (...a) => {
    console.log("Relaying in process");
    setTimeout(async () => {
      await relayUSDC(a, CHAINS.ETHEREUM_TESTNET);
      console.log("Relaying complete");
    }, 15000);
  }
);

TokenMessengerContract(CHAINS.AVALANCHE_TESTNET).on(
  "DepositForBurn",
  async (...a) => {
    console.log("Relaying in process");
    setTimeout(async () => {
      await relayUSDC(a, CHAINS.AVALANCHE_TESTNET);
      console.log("Relaying complete");
    }, 15000);
  }
);
