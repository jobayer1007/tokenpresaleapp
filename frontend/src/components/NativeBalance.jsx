import { useNativeBalance } from 'hooks/useNativeBalance';

const NativeBalance = () => {
  const { data: balance } = useNativeBalance();

  if (!balance) return null;

  return (
    <div className="rounded-xl border border-ink/5 bg-surface px-3 py-2 text-sm font-semibold text-ink">
      Native balance: {balance.balance}
    </div>
  );
};

export default NativeBalance;
