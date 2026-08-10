import { BrowserProvider } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

/**
 * Checks whether MetaMask is installed.
 */
export const isMetaMaskInstalled = (): boolean => {
  return typeof window.ethereum !== "undefined";
};

/**
 * Connects to MetaMask and returns the connected wallet address.
 */
export const connectWallet = async (): Promise<string> => {
  if (!isMetaMaskInstalled()) {
    throw new Error("MetaMask is not installed.");
  }

  const provider = new BrowserProvider(window.ethereum);

  const accounts = await provider.send("eth_requestAccounts", []);

  localStorage.removeItem("walletDisconnected");

  return accounts[0];
};

/**
 * Returns the currently connected wallet address.
 * Returns null if no wallet is connected.
 */
export const getConnectedAccount = async (): Promise<string | null> => {
  if (!isMetaMaskInstalled()) {
    return null;
  }

  const provider = new BrowserProvider(window.ethereum);

  const accounts = await provider.send("eth_accounts", []);

  if (accounts.length === 0) {
    return null;
  }

  return accounts[0];
};

/**
 * Listens for MetaMask account changes.
 */
export const onAccountsChanged = (
  callback: (accounts: string[]) => void
): void => {
  if (!isMetaMaskInstalled()) return;

  window.ethereum.on("accountsChanged", callback);
};

/**
 * Listens for network changes.
 */
export const onChainChanged = (
  callback: () => void
): void => {
  if (!isMetaMaskInstalled()) return;

  window.ethereum.on("chainChanged", callback);
};