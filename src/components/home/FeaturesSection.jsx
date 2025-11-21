import { FiGift, FiRefreshCw, FiShield } from 'react-icons/fi';

const features = [
  {
    title: 'Rewards that feel instant',
    description: 'Earn $ELO automatically on every eligible order and keep accruing value as you shop.',
    icon: <FiGift className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Built for real usage',
    description: 'Stake, swap, and claim from one dashboard—no browser-hop required.',
    icon: <FiRefreshCw className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Security-first architecture',
    description: 'Audited smart contracts, clear vesting, and on-chain transparency for every phase.',
    icon: <FiShield className="h-6 w-6 text-primary" />,
  },
];

const FeaturesSection = () => {
  return (
    <section className="border-t border-ink/5 bg-surface py-16">
      <div className="section-shell">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Why ELO</p>
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">One token, many ways to earn</h2>
          <p className="mx-auto max-w-2xl text-base text-ink/70">
            ELO was designed to be more than a presale. Holders get immediate rewards, clean UX, and
            a roadmap focused on real utility.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="card space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-ink">{feature.title}</h3>
              <p className="text-sm text-ink/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
