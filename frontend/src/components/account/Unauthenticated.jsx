import { Fragment, useState } from 'react';
import WalletProviders from './NetworkWalletProviders';
import WalletIcon from '../ui/icons/Wallet';

const Unauthenticated = () => {
  const [walletProvidersDialogOpen, setWalletProvidersDialogOpen] = useState(false);

  const handleWalletProvidersDialogToggle = () => {
    setWalletProvidersDialogOpen((prev) => !prev);
  };

  return (
    <Fragment>
      <button
        className="btn-primary shadow-card"
        onClick={handleWalletProvidersDialogToggle}
        type="button"
      >
        <WalletIcon className="h-4 w-4" />
        Connect wallet
      </button>
      <WalletProviders
        walletProvidersDialogOpen={walletProvidersDialogOpen}
        handleWalletProvidersDialogToggle={handleWalletProvidersDialogToggle}
      />
    </Fragment>
  );
};

export default Unauthenticated;
