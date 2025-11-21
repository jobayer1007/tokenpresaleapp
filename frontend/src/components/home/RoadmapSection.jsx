const stages = [
  {
    name: 'Phase I',
    items: ['1K holders', 'Presale launch', 'Stage 1 marketing', '1% airdrop'],
  },
  {
    name: 'Phase II',
    items: ['3K holders', 'Add to DEX', 'Stage 2 marketing'],
  },
  {
    name: 'Phase III',
    items: ['Stage 3 marketing', 'Add to CEX', '1% airdrop'],
  },
  {
    name: 'Phase IV',
    items: ['5K holders', 'Staking pool launch', 'Community growth'],
  },
  {
    name: 'Phase V',
    items: ['10K holders', 'Ordering Reward launch', '1% airdrop', 'To the moon'],
  },
];

const RoadmapSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="section-shell">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Roadmap</p>
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">Building in public</h2>
          <p className="mx-auto max-w-2xl text-base text-ink/70">
            Milestones we’re shipping next—spanning liquidity, exchange listings, and community
            rewards.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {stages.map((stage, index) => (
            <div key={stage.name} className="card space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-ink">{stage.name}</h3>
                </div>
                <span className="pill">Planned</span>
              </div>
              <ul className="space-y-2 text-sm text-ink/80">
                {stage.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
