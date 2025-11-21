import React, { useEffect, useState } from 'react';
import useWeb3 from '../../hooks/useWeb3.js';
import { BinanceLogo, EthereumLogo } from '../ui/NetworkLogos.jsx';
import { MetamaskLogo, WalletConnectLogo } from '../ui/WalletLogos.jsx';

const networks = [
  { label: 'Ethereum', value: 'eth', icon: <EthereumLogo width={60} /> },
  { label: 'Binance', value: 'bsc', icon: <BinanceLogo width={60} /> },
];

const wallets = [
  { label: 'Metamask', value: 'injected', icon: <MetamaskLogo width={60} /> },
  { label: 'WalletConnect', value: 'walletconnect', icon: <WalletConnectLogo width={60} /> },
];

const setWalletProvider = (wallet) => {
  localStorage.setItem('wallet', wallet);
};

const NetworkWalletProviders = ({
  walletProvidersDialogOpen,
  handleWalletProvidersDialogToggle,
}) => {
  const { provider, connectInjected, connectWalletConnect } = useWeb3();
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [selectedWallet, setSelectedWallet] = useState(null);

  useEffect(() => {
    if (provider) {
      handleWalletProvidersDialogToggle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  const connectWallet = async (walletprovider) => {
    localStorage.setItem('connected', true);

    switch (walletprovider) {
      case 'injected_eth':
        setWalletProvider('injected_eth');
        await connectInjected('eth');
        break;
      case 'walletconnect_eth':
        setWalletProvider('walletconnect_eth');
        await connectWalletConnect('eth');
        break;
      case 'injected_bsc':
        setWalletProvider('injected_bsc');
        await connectInjected('bsc');
        break;
      case 'walletconnect_bsc':
        setWalletProvider('walletconnect_bsc');
        await connectWalletConnect('bsc');
        break;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (localStorage.getItem('connected')) {
      connectWallet(localStorage.getItem('wallet'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConnectWallet = () => {
    if (selectedWallet && selectedNetwork) {
      const walletprovider = `${selectedWallet}_${selectedNetwork}`;
      connectWallet(walletprovider);
    }
  };

  if (!walletProvidersDialogOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm">
      <div className="card w-full max-w-md">
        <div className="mb-4 flex items-center justify-between border-b border-ink/5 pb-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Wallet</p>
            <p className="text-lg font-semibold text-ink">Connect your wallet</p>
          </div>
          <button
            className="rounded-full p-2 text-ink/70 hover:bg-ink/5"
            onClick={handleWalletProvidersDialogToggle}
            aria-label="Close wallet modal"
            type="button"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                1
              </span>
              Choose network
            </div>
            <div className="grid grid-cols-2 gap-3">
              {networks.map((network) => (
                <button
                  type="button"
                  key={network.value}
                  onClick={() => setSelectedNetwork(network.value)}
                  className={`flex flex-col items-center gap-2 rounded-xl border px-4 py-3 transition ${
                    selectedNetwork === network.value
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-ink/10 bg-white text-ink'
                  }`}
                >
                  <div className="h-12 w-12">{network.icon}</div>
                  <span className="text-sm font-semibold">{network.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                2
              </span>
              Choose wallet
            </div>
            <div className="grid grid-cols-2 gap-3">
              {wallets.map((wallet) => (
                <button
                  type="button"
                  key={wallet.value}
                  onClick={() => setSelectedWallet(wallet.value)}
                  className={`flex flex-col items-center gap-2 rounded-xl border px-4 py-3 transition ${
                    selectedWallet === wallet.value
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-ink/10 bg-white text-ink'
                  }`}
                >
                  <div className="h-12 w-12">{wallet.icon}</div>
                  <span className="text-sm font-semibold">{wallet.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            className="btn-outline w-full"
            onClick={handleWalletProvidersDialogToggle}
            type="button"
          >
            Cancel
          </button>
          <button
            className="btn-primary w-full"
            onClick={handleConnectWallet}
            disabled={!selectedNetwork || !selectedWallet}
            type="button"
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default NetworkWalletProviders;
