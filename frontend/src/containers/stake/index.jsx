import { Fragment } from 'react';
import TokenPools from '../../components/stake/TokenPools';
import StakeSteps from '../../components/stake/StakeSteps';
import HowToStake from '../../components/stake/HowToStake';

export default function Stake() {
  return (
    <Fragment>
      <section className="section-shell pb-6">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Staking</p>
          <h1 className="text-3xl font-bold text-ink sm:text-4xl">Stake $ELO, earn more $ELO</h1>
          <p className="max-w-3xl text-base text-ink/70">
            Lock your tokens to earn boosted rewards. APRs adjust as more people join the pool, so
            early participants get the strongest upside.
          </p>
        </div>
      </section>

      <section className="border-y border-ink/5 bg-surface py-12">
        <div className="section-shell fadeInUp space-y-8">
          <div className="space-y-3 text-center">
            <h2 className="text-2xl font-bold text-ink">Simple 3-step staking</h2>
            <p className="mx-auto max-w-2xl text-base text-ink/70">
              Approve once, choose an amount, and confirm. Rewards start accruing as soon as your
              transaction finalizes.
            </p>
          </div>
          <StakeSteps />
          <HowToStake />
          <TokenPools />
        </div>
      </section>
    </Fragment>
  );
}
