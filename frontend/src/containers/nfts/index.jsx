import React, { Fragment } from 'react';
import NFTBalance from 'components/NFTBalance';

export default function NFTs() {
  return (
    <Fragment>
      <section className="section-shell pb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">NFTs</p>
        <h1 className="text-3xl font-bold text-ink sm:text-4xl">Your NFTs</h1>
        <p className="max-w-3xl text-base text-ink/70">
          View the NFTs held by your connected wallet.
        </p>
      </section>
      <section className="border-y border-ink/5 bg-surface py-10">
        <div className="section-shell">
          <NFTBalance />
        </div>
      </section>
    </Fragment>
  );
}
