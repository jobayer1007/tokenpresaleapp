import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import {
  InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector';
import { ethers } from 'ethers';

const NETWORKS = {
  eth: {
    chainId: 3,
    rpcUrl: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    name: 'Ethereum',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  bsc: {
    chainId: 97,
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    name: 'BSC Testnet',
    nativeCurrency: { name: 'Binance Coin', symbol: 'BNB', decimals: 18 },
  },
};

const Web3Context = createContext(null);

const getInjected = (chainId) => new InjectedConnector({ supportedChainIds: [chainId] });
const getWalletConnect = (net) =>
  new WalletConnectConnector({
    rpc: { [net.chainId]: net.rpcUrl },
    qrcode: true,
    pollingInterval: 12000,
  });

export function Web3Provider({ children }) {
  const { activate, deactivate, account, chainId, library, active } = useWeb3React();

  const wcRefs = useRef({});
  const autoConnected = useRef(false);
  const contractCache = useRef(new Map());

  const switchNetwork = useCallback(async (networkKey = 'eth') => {
    const net = NETWORKS[networkKey];
    if (!net || !window?.ethereum?.request) return false;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${net.chainId.toString(16)}` }],
      });
      return true;
    } catch (error) {
      // If the chain is missing in wallet, attempt to add it.
      if (error?.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${net.chainId.toString(16)}`,
                chainName: net.name,
                nativeCurrency: net.nativeCurrency,
                rpcUrls: [net.rpcUrl],
              },
            ],
          });
          return true;
        } catch (addError) {
          console.error('Unable to add chain', addError);
          return false;
        }
      }

      console.error('Network switch failed', error);
      return false;
    }
  }, []);

  const connect = useCallback(
    async (type, networkKey = 'eth') => {
      const net = NETWORKS[networkKey] || NETWORKS.eth;
      const connector =
        type === 'walletconnect'
          ? wcRefs.current[net.chainId] || (wcRefs.current[net.chainId] = getWalletConnect(net))
          : getInjected(net.chainId);

      try {
        await activate(connector, async (error) => {
          if (error instanceof UnsupportedChainIdError) {
            const switched = await switchNetwork(networkKey);
            if (switched) {
              await activate(connector);
            }
          } else if (error instanceof NoEthereumProviderError) {
            console.error('No provider found. Install Metamask or use a WalletConnect app.');
          } else if (
            error instanceof UserRejectedRequestErrorInjected ||
            error instanceof UserRejectedRequestErrorWalletConnect
          ) {
            console.warn('Wallet request was rejected by the user.');
          } else {
            console.error('Wallet activation failed', error);
          }
        });

        localStorage.setItem('wallet', `${type}_${networkKey}`);
        localStorage.setItem('connected', 'true');
      } catch (error) {
        console.error('Error connecting wallet', error);
      }
    },
    [activate, switchNetwork]
  );

  const disconnectWallet = useCallback(async () => {
    try {
      Object.values(wcRefs.current).forEach((connector) => connector?.close?.());
      await deactivate();
    } catch (error) {
      console.error('Disconnect failed', error);
    } finally {
      localStorage.removeItem('connected');
      localStorage.removeItem('wallet');
    }
  }, [deactivate]);

  useEffect(() => {
    if (autoConnected.current) return;
    const walletChoice = localStorage.getItem('wallet');
    if (!walletChoice) return;

    const [type, networkKey] = walletChoice.split('_');
    if (type) {
      autoConnected.current = true;
      connect(type, networkKey);
    }
  }, [connect]);

  // Clear cached contract instances when network/provider changes.
  useEffect(() => {
    contractCache.current.clear();
  }, [provider, chainId]);

  const getContract = useCallback(
    (abi, address, { withSigner = true } = {}) => {
      if (!abi || !address || !provider) return null;
      const cacheKey = `${withSigner ? 'signer' : 'provider'}-${chainId || 'unknown'}-${address.toLowerCase()}`;

      if (contractCache.current.has(cacheKey)) {
        return contractCache.current.get(cacheKey);
      }

      const instance = new ethers.Contract(
        address,
        abi,
        withSigner ? provider.getSigner() : provider
      );
      contractCache.current.set(cacheKey, instance);
      return instance;
    },
    [provider, chainId]
  );

  const readContract = useCallback(
    async (abi, address, method, args = []) => {
      const contract = getContract(abi, address, { withSigner: false });
      if (!contract || typeof contract[method] !== 'function') {
        throw new Error('Contract method unavailable');
      }
      return contract[method](...args);
    },
    [getContract]
  );

  const writeContract = useCallback(
    async (abi, address, method, args = [], overrides = {}) => {
      const contract = getContract(abi, address, { withSigner: true });
      if (!contract || typeof contract[method] !== 'function') {
        throw new Error('Contract method unavailable');
      }
      return contract[method](...args, overrides);
    },
    [getContract]
  );

  const signer = useMemo(() => (library ? library.getSigner() : null), [library]);
  const provider = library;

  const value = useMemo(
    () => ({
      account,
      chainId,
      provider,
      signer,
      isActive: active,
      connectInjected: (networkKey = 'eth') => connect('injected', networkKey),
      connectWalletConnect: (networkKey = 'eth') => connect('walletconnect', networkKey),
      disconnectWallet,
      switchNetwork,
      getContract,
      readContract,
      writeContract,
    }),
    [
      account,
      chainId,
      provider,
      signer,
      active,
      connect,
      disconnectWallet,
      switchNetwork,
      getContract,
      readContract,
      writeContract,
    ]
  );

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}
