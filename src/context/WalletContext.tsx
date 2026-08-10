import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  connectWallet,
  getConnectedAccount,
  onAccountsChanged,
  onChainChanged,
} from "../services/walletService";

interface WalletContextType {
  account: string | null;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
   const checkConnection = async () => {
  const manuallyDisconnected =
    localStorage.getItem("walletDisconnected") === "true";

  if (manuallyDisconnected) {
    return;
  }

  const connectedAccount = await getConnectedAccount();
  setAccount(connectedAccount);
};
    checkConnection();

    onAccountsChanged((accounts: string[]) => {
      if (accounts.length === 0) {
        setAccount(null);
      } else {
        setAccount(accounts[0]);
      }
    });

    onChainChanged(() => {
      window.location.reload();
    });
  }, []);

  const connect = async () => {
    const connectedAccount = await connectWallet();
    setAccount(connectedAccount);
  };

  const disconnect = () => {
  localStorage.setItem("walletDisconnected", "true");
  setAccount(null);
};

  return (
    <WalletContext.Provider
      value={{
        account,
        isConnected: account !== null,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error("useWallet must be used inside WalletProvider");
  }

  return context;
};