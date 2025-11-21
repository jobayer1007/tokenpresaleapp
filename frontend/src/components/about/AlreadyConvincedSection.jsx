import { Link } from 'react-router-dom';

const AlreadyConvincedSection = () => {
  return (
    <section className="border-y border-ink/5 bg-surface py-14">
      <div className="section-shell items-center text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Ready to go?</p>
        <h3 className="text-2xl font-bold text-ink sm:text-3xl">Claim your $ELO and start earning</h3>
        <p className="mx-auto max-w-2xl text-base text-ink/70">
          Lock in your allocation during the presale and be first in line for staking rewards and
          customer perks.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/pre-sale" className="btn-primary">
            Join the presale
          </Link>
          <Link to="/stake" className="btn-outline">
            View staking
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AlreadyConvincedSection;
