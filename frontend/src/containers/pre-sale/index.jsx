import { Fragment } from 'react';
import PhaseI from '../../components/pre-sale/PhaseI/Renderer';
import PreSaleSteps from 'components/pre-sale/PreSaleSteps';

export default function PreSale() {
  return (
    <Fragment>
      <section className="section-shell pb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Pre-sale</p>
        <h1 className="text-3xl font-bold text-ink sm:text-4xl">Claim your pre-sale allocation</h1>
        <p className="max-w-3xl text-base text-ink/70">
          Buy $ELO during the pre-sale. Purchased tokens are claimable after the vesting period
          completes.
        </p>
      </section>
      <section className="border-y border-ink/5 bg-surface py-12">
        <div className="section-shell space-y-6">
          <p className="text-center text-base font-semibold text-ink/80">
            Grab your ELO token now and enjoy the benefits that come with being early.
          </p>
          <PreSaleSteps />
          <PhaseI />
        </div>
      </section>
    </Fragment>
  );
}
