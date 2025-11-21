import CopyToClipboard from './CopyToClipboard';
import { chainConfig, normalizeChainId } from '../../config/env';
import { getExplorer } from '../../helpers/networks';

const Contracts = ({ open, handleClose }) => {
  if (!open) return null;

  const contracts = chainConfig.presaleNetworks
    .filter((net) => net.contractAddress)
    .map((net) => {
      const explorer = getExplorer(normalizeChainId(net.key)) || '';
      return {
        title: `${net.label} Presale`,
        value: net.contractAddress,
        link: explorer ? `${explorer}address/${net.contractAddress}` : net.contractAddress,
      };
    });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm">
      <div className="card w-full max-w-xl space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-ink">Contracts</p>
          <button
            className="rounded-full p-2 text-ink/70 hover:bg-ink/5"
            onClick={handleClose}
            aria-label="Close contracts modal"
            type="button"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          {contracts.map((contract) => (
            <div
              key={contract.value}
              className="flex flex-col gap-2 rounded-xl border border-ink/5 bg-surface px-3 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-ink">{contract.title}</p>
                <a
                  href={contract.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  {contract.value}
                </a>
              </div>
              <CopyToClipboard text={contract.value} />
            </div>
          ))}
          {contracts.length === 0 && (
            <p className="text-sm font-semibold text-ink/60">No contract addresses configured yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contracts;
