  import { LightSmartContractAccount, getDefaultLightAccountFactoryAddress, } from "@alchemy/aa-accounts";
  import { AlchemyProvider } from "@alchemy/aa-alchemy";
  import { LocalAccountSigner, type Hex } from "@alchemy/aa-core";
  import { polygonMumbai, sepolia } from "viem/chains";
  import * as dotenvenc from '@chainlink/env-enc'
  import { maxUint256, parseEther } from "viem";
  dotenvenc.config();
  
  const chain = sepolia;
  
  
  // The private key of your EOA that will be the owner of Light Account
  const PRIVATE_KEY = process.env.PRIVATE_KEY as Hex;
  const owner = LocalAccountSigner.privateKeyToAccountSigner(PRIVATE_KEY);
  const apiKey = process.env.ALCHEMY_API_SEPOLIA;
  
  // Create a provider to send user operations from your smart account
  const provider = new AlchemyProvider({
    // get your Alchemy API key at https://dashboard.alchemy.com
    apiKey: apiKey !== undefined ? apiKey: "",
    chain,
  }).connect(
    (rpcClient) =>
      new LightSmartContractAccount({
        rpcClient,
        owner,
        chain,
        factoryAddress: getDefaultLightAccountFactoryAddress(chain),
      })
  );
  
  (async () => {
    // Fund your account address with ETH to send for the user operations
    // (e.g. Get Sepolia ETH at https://sepoliafaucet.com)
    console.log("Smart Account Address: ", await provider.getAddress()); // Log the smart account address

    // const vitalikAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" as Address;
    // Send a user operation from your smart account to Vitalik that does nothing

    const amountToSend: bigint = parseEther("0.1");


    const myAddress = "0x87D51f8aB6c2CAd50D377A3f95320BC5DC69729B"; // Your EOA Public Key/Address
    const contractAddress = "0x1C8c296EB0C9eb411102779339eEBff884AA2016"


    const { hash: uoHash } = await provider.sendUserOperation({
    target: myAddress, // The desired target contract address
    data: "0x", // The desired call data
    value: amountToSend, // (Optional) value to send the target contract address
  });

    console.log("UserOperation Hash: ", uoHash); // Log the user operation hash
    

    // Wait for the user operation to be mined
    const txHash = await provider.waitForUserOperationTransaction(uoHash);

  console.log("Transaction Hash: ", txHash); // Log the transaction hash
  console.log("Value ", amountToSend)
  })();