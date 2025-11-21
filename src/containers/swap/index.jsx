import React, { Fragment } from 'react';
import SwapCard from '../../components/swap/SwapCard';
import oneInch from 'assets/images/partners/1inch.svg';

const poweredBy = { src: oneInch, href: 'https://1inch.exchange/#/' };

export default function Swap() {
  return (
    <Fragment>
      <section className="section-shell pb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Swap</p>
        <h1 className="text-3xl font-bold text-ink sm:text-4xl">Swap tokens on ETH and BSC</h1>
        <p className="mx-auto max-w-2xl text-base text-ink/70">
          Connect your wallet, pick tokens, and swap with live pricing powered by 1inch.
        </p>
      </section>
      <section className="border-y border-ink/5 bg-surface py-12">
        <div className="section-shell space-y-6">
          <div className="flex justify-center">
            <SwapCard />
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink/60">
            <span>Powered by</span>
            <a href={poweredBy.href} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100">
              <img src={poweredBy.src} alt="1Inch logo" className="h-6" />
            </a>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
