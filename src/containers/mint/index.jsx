import { Fragment } from 'react';
import MintCard from '../../components/mint/MintCard';

export default function Mint() {
  return (
    <Fragment>
      <section className="section-shell pb-6">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Fair launch</p>
          <h1 className="text-3xl font-bold text-ink sm:text-4xl">Mint your NFT</h1>
          <p className="max-w-3xl text-base text-ink/70">
            Secure your collectible and unlock future rewards tied to ordering milestones and
            staking perks.
          </p>
        </div>
      </section>
      <section className="border-y border-ink/5 bg-surface py-12">
        <div className="section-shell">
          <MintCard />
        </div>
      </section>
    </Fragment>
  );
}
