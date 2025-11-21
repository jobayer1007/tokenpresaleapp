import { useMoralis } from 'react-moralis';
import { getEllipsisTxt } from '../../helpers/formatters';
import { getExplorer } from '../../helpers/networks';
import { useERC20Transfers } from 'hooks/useERC20Transfers';

function ERC20Transfers() {
  const { ERC20Transfers, chainId } = useERC20Transfers();
  const { Moralis } = useMoralis();

  return (
    <div className="overflow-hidden rounded-xl border border-ink/5 bg-white shadow-card">
      <table className="min-w-full divide-y divide-ink/10 text-sm">
        <thead className="bg-surface text-left text-xs font-semibold uppercase tracking-wide text-ink/70">
          <tr>
            <th className="px-4 py-3">Token</th>
            <th className="px-4 py-3">From</th>
            <th className="px-4 py-3">To</th>
            <th className="px-4 py-3">Value</th>
            <th className="px-4 py-3">Hash</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink/5">
          {!ERC20Transfers && (
            <tr>
              <td colSpan="5" className="px-4 py-6 text-center text-sm font-semibold text-ink/60">
                Fetching transfers...
              </td>
            </tr>
          )}
          {ERC20Transfers?.map((item, idx) => (
            <tr key={`${item.transaction_hash}-${idx}`} className="hover:bg-surface/60">
              <td className="px-4 py-3 font-semibold text-ink/80">{getEllipsisTxt(item.address, 8)}</td>
              <td className="px-4 py-3 text-ink/70">{getEllipsisTxt(item.from_address, 8)}</td>
              <td className="px-4 py-3 text-ink/70">{getEllipsisTxt(item.to_address, 8)}</td>
              <td className="px-4 py-3 font-semibold text-ink">
                {parseFloat(Moralis.Units.FromWei(item.value, item.decimals).toFixed(6))}
              </td>
              <td className="px-4 py-3">
                <a
                  href={`${getExplorer(chainId)}tx/${item.transaction_hash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline"
                >
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ERC20Transfers;
