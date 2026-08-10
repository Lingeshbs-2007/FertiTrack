import { BrowserProvider, Contract, JsonRpcSigner } from "ethers";
import { CONTRACT_ADDRESS } from "./contractAddress";
import { CONTRACT_ABI } from "./contractABI";

declare global {
  interface Window {
    ethereum?: any;
  }
}

/**
 * Returns the BrowserProvider connected to MetaMask.
 */
export const getProvider = (): BrowserProvider => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed.");
  }

  return new BrowserProvider(window.ethereum);
};

/**
 * Returns the connected signer.
 * Used for write transactions.
 */
export const getSigner = async (): Promise<JsonRpcSigner> => {
  const provider = getProvider();

  await provider.send("eth_requestAccounts", []);

  return await provider.getSigner();
};

/**
 * Returns a contract instance for read-only operations.
 */
export const getReadContract = (): Contract => {
  const provider = getProvider();

  return new Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    provider
  );
};

/**
 * Returns a contract instance for write operations.
 */
export const getWriteContract = async (): Promise<Contract> => {
  const signer = await getSigner();

  return new Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    signer
  );
};