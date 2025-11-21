import { useState } from 'react';

const stakingPoolData = [
  { label: 'APR', value: '0.000%' },
  { label: 'Wallet Balance', value: '0.0 $ELO' },
  { label: 'Staked', value: '0.0 $ELO' },
  { label: 'Earned', value: '0.0000 $ELO' },
];

const TokenPools = () => {
  const [amountToStake, setAmountToStake] = useState('');

  return (
    <div className="grid justify-center">
      <div className="card w-full max-w-lg bg-white">
        <div className="mb-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Pool</p>
          <h3 className="text-xl font-bold text-ink">Staking pool</h3>
        </div>
        <div className="space-y-2">
          {stakingPoolData.map((item) => (
            <div key={item.label} className="flex items-center justify-between rounded-lg bg-surface px-3 py-2">
              <p className="text-sm font-semibold text-ink/70">{item.label}</p>
              <p className="text-sm font-semibold text-ink">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-2">
          <label className="text-sm font-semibold text-ink" htmlFor="amount-to-stake">
            Amount to stake
          </label>
          <div className="rounded-xl border border-ink/10 bg-surface px-3 py-2 focus-within:border-primary">
            <input
              id="amount-to-stake"
              className="w-full bg-transparent text-base font-semibold text-ink outline-none"
              type="number"
              placeholder="0.0"
              value={amountToStake}
              onChange={(e) => setAmountToStake(e.target.value)}
              min="0"
            />
            <p className="text-xs text-ink/60">Maximum amount is 0</p>
          </div>
        </div>
        <button className="btn-primary mt-4 w-full" type="button">
          Stake
        </button>
      </div>
    </div>
  );
};

export default TokenPools;
