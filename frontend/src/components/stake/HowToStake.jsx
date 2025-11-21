const stakingGuides = [
  {
    title: 'Staking',
    summary: 'Approve, enter amount, then stake. Wait for confirmations to finalize.',
    details: [
      'Connect your wallet.',
      'Approve the staking contract to use your tokens.',
      'Enter the amount to stake and confirm the transaction.',
    ],
  },
  {
    title: 'Checking balance',
    summary: 'Balances refresh after confirmations. Reconnect the correct wallet if needed.',
    details: [
      'Refresh the page after a stake.',
      'Confirm the connected wallet is the one you used to stake.',
    ],
  },
  {
    title: 'Unstaking',
    summary: 'When the pool allows, unstake and claim in one step.',
    details: [
      'Ensure you have a staked balance.',
      'Click “Claim & Unstake” and wait for the transaction to complete.',
    ],
  },
];

const HowToStake = () => {
  return (
    <div className="card bg-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Need a refresher?</p>
          <h3 className="text-lg font-semibold text-ink">How staking works</h3>
        </div>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {stakingGuides.map((guide) => (
          <div key={guide.title} className="rounded-xl border border-ink/5 bg-surface/60 p-4">
            <p className="text-sm font-semibold text-ink">{guide.title}</p>
            <p className="mb-2 text-xs text-ink/60">{guide.summary}</p>
            <ul className="space-y-1 text-xs text-ink/70">
              {guide.details.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowToStake;
