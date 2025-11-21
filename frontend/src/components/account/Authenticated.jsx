import { Fragment, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import AccountDetails from './AccountDetails';
import { getEllipsisTxt } from '../../helpers/formatters';

const Authenticated = ({ library, account }) => {
  const [balance, setBalance] = useState();
  const [chainId, setChainId] = useState(0);
  const [accountDetailsDialogOpen, setAccountDetailsDialogOpen] = useState(false);

  const getBalance = async () => {
    const bal = await library.getBalance(account);
    setBalance(ethers.utils.formatUnits(bal, 18).toString());
  };

  const getChain = () => {
    setChainId(library.provider.chainId);
  };

  useEffect(() => {
    getBalance();
    if (library.provider) {
      getChain();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [library, account]);

  const handleAccountDetailsDialogToggle = () => {
    setAccountDetailsDialogOpen((prev) => !prev);
  };

  return (
    <Fragment>
      <button
        className="btn-outline min-w-[140px]"
        onClick={handleAccountDetailsDialogToggle}
        type="button"
      >
        {getEllipsisTxt(account, 6)}
      </button>
      <AccountDetails
        accountDetailsDialogOpen={accountDetailsDialogOpen}
        handleAccountDetailsDialogToggle={handleAccountDetailsDialogToggle}
        data={{ balance, account, chainId }}
      />
    </Fragment>
  );
};

export default Authenticated;
