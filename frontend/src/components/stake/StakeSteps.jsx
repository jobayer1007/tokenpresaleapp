const steps = ["Approve you've $ELO", 'Enter an amount', 'Press stake'];

const StakeSteps = () => {
  return (
    <div className="mx-auto mb-6 grid max-w-3xl gap-3 sm:grid-cols-3">
      {steps.map((step, idx) => (
        <div key={step} className="card flex h-full flex-col gap-2 bg-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
            {idx + 1}
          </div>
          <p className="text-sm font-semibold text-ink">{step}</p>
          <p className="text-xs text-ink/60">
            {idx === 0
              ? 'Give the staking contract permission to use your tokens.'
              : idx === 1
              ? 'Choose how many tokens you want to stake.'
              : 'Confirm the transaction and start earning.'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StakeSteps;
