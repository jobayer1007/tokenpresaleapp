import React from 'react';
import { useMoralis, useNFTBalances } from 'react-moralis';
import { useMoralisDapp } from 'providers/MoralisDappProvider/MoralisDappProvider';
import { getExplorer } from 'helpers/networks';

function NFTBalance() {
  const { data: NFTBalances } = useNFTBalances();
  const { chainId, walletAddress } = useMoralisDapp();
  const { Moralis } = useMoralis();

  if (!NFTBalances?.result || NFTBalances?.result.length === 0) {
    return (
      <p className="text-center text-sm font-semibold text-ink/60">
        You do not have NFTs on the connected network.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {NFTBalances.result.map((nft) => (
        <div key={`${nft.token_address}-${nft.token_id}`} className="card bg-white">
          <div className="aspect-square overflow-hidden rounded-xl bg-surface">
            <img
              src={nft?.image}
              alt={nft.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.target.src =
                  'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=700&q=80';
              }}
            />
          </div>
          <div className="mt-3 space-y-1">
            <p className="text-base font-semibold text-ink">{nft.name || 'NFT'}</p>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/60">
              Token #{nft.token_id}
            </p>
            <p className="text-xs font-semibold text-ink/60">{nft.token_address}</p>
          </div>
          <a
            href={`${getExplorer(chainId)}address/${walletAddress}`}
            target="_blank"
            rel="noreferrer"
            className="btn-outline mt-3 w-full justify-center"
          >
            View on explorer
          </a>
        </div>
      ))}
    </div>
  );
}

export default NFTBalance;
