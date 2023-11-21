// Setup: npm install alchemy-sdk
import { Network, Alchemy } from "alchemy-sdk";

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: "Q05kX0x14eN2Hm5JrONHZIFJrzPWZocu", // Replace with your Alchemy API Key.
  network: Network.ETH_SEPOLIA // Replace with your network.
};

const alchemy = new Alchemy(settings);

async function main() {
  const latestBlock = await alchemy.core.getBlockNumber();
  console.log("The latest block number is", latestBlock);
}

main();