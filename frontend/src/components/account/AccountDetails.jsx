import CopyToClipboard from 'components/shared/CopyToClipboard.jsx';
import { getEllipsisTxt } from '../../helpers/formatters.js';
import { getExplorer } from '../../helpers/networks.js';
import { useWalletConnector } from './WalletConnector.jsx';

const resetLocalStorage = () => {
  localStorage.removeItem('wallet');
  localStorage.removeItem('connected');
};

const AccountDetails = ({ accountDetailsDialogOpen, handleAccountDetailsDialogToggle, data }) => {
  const { logoutWalletConnector } = useWalletConnector();

  const handleLogout = () => {
    logoutWalletConnector();
    handleAccountDetailsDialogToggle();
    resetLocalStorage();
  };

  if (!accountDetailsDialogOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm">
      <div className="card w-full max-w-sm">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-base font-semibold text-ink">Account</p>
          <button
            className="rounded-full p-2 text-ink/70 hover:bg-ink/5"
            onClick={handleAccountDetailsDialogToggle}
            aria-label="Close account modal"
            type="button"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3 rounded-xl border border-ink/5 bg-surface px-3 py-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Address</p>
              <a
                href={`${getExplorer(data.chainId)}/address/${data.account}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-ink hover:text-primary"
              >
                {getEllipsisTxt(data.account, 6)}
              </a>
            </div>
            <CopyToClipboard text={data.account} />
          </div>

          <div className="rounded-xl border border-ink/5 bg-surface px-3 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Balance</p>
            <p className="text-sm font-semibold text-ink">{data.balance}</p>
          </div>
        </div>

        <button className="btn-primary mt-5 w-full" onClick={handleLogout} type="button">
          Disconnect wallet
        </button>
      </div>
    </div>
  );
};

export default AccountDetails;
