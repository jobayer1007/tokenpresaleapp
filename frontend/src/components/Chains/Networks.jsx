import { useEffect, useRef, useState } from 'react';
import { useChain, useMoralis } from 'react-moralis';
import { BinanceLogo, EthereumLogo } from '../ui/NetworkLogos';
import { chainConfig, normalizeChainId } from '../../config/env';

const iconForSymbol = (symbol) => {
  if (symbol?.toLowerCase().includes('bnb') || symbol === 'BSC') return <BinanceLogo width={20} />;
  return <EthereumLogo width={20} />;
};

export default function Networks() {
  const { isAuthenticated } = useMoralis();
  const { switchNetwork, chainId } = useChain();
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!chainId) return;
    const normalized = normalizeChainId(chainId).toLowerCase();
    const newSelected = chainConfig.presaleNetworks.find(
      (item) => normalizeChainId(item.key).toLowerCase() === normalized
    );
    setSelected(newSelected || null);
  }, [chainId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuItemClick = (item) => {
    switchNetwork(item.key);
    setOpen(false);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="btn-outline min-w-[110px]"
        onClick={() => setOpen((prev) => !prev)}
        type="button"
      >
        {iconForSymbol(selected?.symbol)}
        {selected?.symbol || 'Network'}
        <svg className="h-4 w-4 text-ink/70" viewBox="0 0 24 24" stroke="currentColor" fill="none">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-ink/5 bg-white p-2 shadow-card">
          {chainConfig.presaleNetworks.map((item) => (
            <button
              key={item.key}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                normalizeChainId(item.key).toLowerCase() === normalizeChainId(chainId).toLowerCase()
                  ? 'bg-primary/10 text-primary'
                  : 'text-ink/80 hover:bg-ink/5 hover:text-ink'
              }`}
              onClick={() => handleMenuItemClick(item)}
              type="button"
            >
              {iconForSymbol(item.symbol)}
              <span className="flex-1 text-left">{item.label}</span>
              <span className="pill">{item.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
