import useWeb3 from '../../hooks/useWeb3.js';

// Legacy wrapper kept for backwards compatibility. Most consumers should import useWeb3 directly.
export function useWalletConnector() {
  const { connectInjected, connectWalletConnect, disconnectWallet } = useWeb3();

  return {
    loginMetamask: (networkKey = 'eth') => connectInjected(networkKey),
    loginWalletConnect: (networkKey = 'eth') => connectWalletConnect(networkKey),
    loginBSC: () => connectInjected('bsc'),
    logoutWalletConnector: disconnectWallet,
  };
}
