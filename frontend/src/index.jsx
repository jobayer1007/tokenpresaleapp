import React, { StrictMode, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { MoralisProvider } from 'react-moralis';
import './index.css';
import { MoralisDappProvider } from './providers/MoralisDappProvider/MoralisDappProvider';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
import { appConfig } from './config/env';
import { Web3Provider } from './providers/Web3Provider.jsx';

// Ensure Buffer is available for libraries expecting Node globals
if (typeof window !== 'undefined' && !window.Buffer) {
  import('buffer').then(({ Buffer }) => {
    window.Buffer = Buffer;
  });
}

const POLLING_INTERVAL = 12000;

const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};

const MoralisConfigBanner = () => (
  <div className="bg-amber-100 text-amber-900 border border-amber-200 px-4 py-2 text-sm text-center">
    Moralis env vars missing. Add VITE_MORALIS_APP_ID and VITE_MORALIS_SERVER_URL to enable Web3
    features.
  </div>
);

const Application = () => {
  const hasMoralisConfig = Boolean(appConfig.moralisAppId && appConfig.moralisServerUrl);
  const hasWarned = useRef(false);

  useEffect(() => {
    if (!hasMoralisConfig && !hasWarned.current) {
      console.warn(
        'Missing VITE_MORALIS_APP_ID or VITE_MORALIS_SERVER_URL. Update your .env file to enable Moralis.'
      );
      hasWarned.current = true;
    }
  }, [hasMoralisConfig]);

  return (
    <MoralisProvider
      appId={appConfig.moralisAppId || 'MORALIS_DISABLED'}
      serverUrl={appConfig.moralisServerUrl || 'MORALIS_DISABLED'}
      initializeOnMount={hasMoralisConfig}
    >
      {!hasMoralisConfig && <MoralisConfigBanner />}
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3Provider>
          <MoralisDappProvider>
            <App />
          </MoralisDappProvider>
        </Web3Provider>
      </Web3ReactProvider>
    </MoralisProvider>
  );
};

const container = document.getElementById('root');

if (container) {
  createRoot(container).render(
    <StrictMode>
      <Application />
    </StrictMode>
  );
}
