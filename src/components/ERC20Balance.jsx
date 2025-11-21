import { useMoralis } from 'react-moralis';
import { useERC20Balance } from 'hooks/useERC20Balance';
import { getEllipsisTxt } from 'helpers/formatters';

const ERC20Balance = (props) => {
  const { assets } = useERC20Balance(props);
  const { Moralis } = useMoralis();

  return (
    <section className="section-shell">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Portfolio</p>
        <h1 className="text-3xl font-bold text-ink sm:text-4xl">Token balances</h1>
        <p className="max-w-2xl text-base text-ink/70">View the assets detected in your wallet.</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-ink/5 bg-white shadow-card">
        <table className="min-w-full divide-y divide-ink/10 text-sm">
          <thead className="bg-surface text-left text-xs font-semibold uppercase tracking-wide text-ink/70">
            <tr>
              <th className="px-4 py-3">Token</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Symbol</th>
              <th className="px-4 py-3">Balance</th>
              <th className="px-4 py-3">Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/5">
            {!assets && (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-sm font-semibold text-ink/60">
                  Loading balances...
                </td>
              </tr>
            )}
            {assets?.map((asset) => (
              <tr key={asset.token_address} className="hover:bg-surface/60">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={asset.logo || 'https://etherscan.io/images/main/empty-token.png'}
                      alt={asset.symbol}
                      className="h-7 w-7 rounded-full bg-surface"
                    />
                  </div>
                </td>
                <td className="px-4 py-3 font-semibold text-ink">{asset.name}</td>
                <td className="px-4 py-3 font-semibold text-ink/80">{asset.symbol}</td>
                <td className="px-4 py-3 font-semibold text-ink">
                  {parseFloat(Moralis.Units.FromWei(asset.balance, asset.decimals).toFixed(6))}
                </td>
                <td className="px-4 py-3 text-ink/70">{getEllipsisTxt(asset.token_address, 5)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ERC20Balance;
