const statistics = [
  { label: 'Presale', value: 10 },
  { label: 'DEX Liquidity', value: 10 },
  { label: 'CEX Reserved', value: 10 },
  { label: 'Staking Rewards', value: 25 },
  { label: 'Team', value: 10 },
  { label: 'Ordering Rewards', value: 25 },
  { label: 'Customer Rewards', value: 5 },
  { label: 'Airdrop', value: 5 },
];

const TokenomicsSection = () => {
  return (
    <section className="border-b border-ink/5 bg-surface py-16" id="tokenomics">
      <div className="section-shell">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Tokenomics</p>
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">$ELO supply, fully transparent</h2>
          <p className="mx-auto max-w-2xl text-base text-ink/70">
            The presale covers 10% of the 1B total supply. The rest is split across liquidity,
            staking rewards, and community growth.
          </p>
          <div className="chip w-fit mx-auto text-base">1,000,000,000 total supply</div>
        </div>

        <div className="card space-y-4">
          <div className="flex items-center justify-between text-sm font-semibold text-ink/70">
            <span>Category</span>
            <span>Allocation</span>
          </div>
          <div className="space-y-3">
            {statistics.map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex items-center justify-between text-sm font-semibold text-ink">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-ink/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenomicsSection;
