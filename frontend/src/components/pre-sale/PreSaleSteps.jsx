const steps = ['Connect wallet', 'Choose network', 'Enter amount', 'Click Buy'];

const PreSaleSteps = () => {
  return (
    <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-4">
      {steps.map((label, idx) => (
        <div key={label} className="card flex flex-col gap-2 bg-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
            {idx + 1}
          </div>
          <p className="text-sm font-semibold text-ink">{label}</p>
          <p className="text-xs text-ink/60">
            {idx === 0
              ? 'Authenticate with MetaMask or WalletConnect.'
              : idx === 1
              ? 'Switch to the supported chain in the header.'
              : idx === 2
              ? 'Pick your contribution amount.'
              : 'Confirm the transaction to finalize.'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PreSaleSteps;
