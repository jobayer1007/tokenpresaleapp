const steps = [
  {
    title: 'Choose your network',
    detail: 'ELO supports Ethereum and BSC. Switch networks from the header before you start.',
  },
  {
    title: 'Connect your wallet',
    detail: 'Use MetaMask or WalletConnect to authenticate—no separate accounts required.',
  },
  {
    title: 'Join the pre-sale',
    detail: 'Swap your native token for $ELO and lock in your allocation before the public launch.',
  },
  {
    title: 'Stake and earn',
    detail: 'After purchase, head to staking to start compounding rewards during the vesting window.',
  },
];

const HowToSection = () => {
  return (
    <section className="border-t border-b border-ink/5 bg-white py-16" id="getELO">
      <div className="section-shell">
        <div className="text-center space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Get started</p>
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">How to get $ELO</h2>
          <p className="mx-auto max-w-2xl text-base text-ink/70">
            Four simple steps take you from first visit to holding and staking your tokens.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="card flex items-start gap-4 bg-surface/80 transition hover:shadow-soft"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-semibold">
                {index + 1}
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                <p className="text-sm text-ink/70">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToSection;
