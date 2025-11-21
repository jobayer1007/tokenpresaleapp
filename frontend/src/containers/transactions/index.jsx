import React, { Fragment } from 'react';
import ERC20Transfers from 'components/ERC20Transfers';

export default function Transactions() {
  return (
    <Fragment>
      <section className="section-shell pb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Activity</p>
        <h1 className="text-3xl font-bold text-ink sm:text-4xl">Latest transactions</h1>
        <p className="max-w-3xl text-base text-ink/70">
          Keep tabs on your ERC20 transfers across the connected chain.
        </p>
      </section>
      <section className="border-y border-ink/5 bg-surface py-10">
        <div className="section-shell">
          <ERC20Transfers />
        </div>
      </section>
    </Fragment>
  );
}
