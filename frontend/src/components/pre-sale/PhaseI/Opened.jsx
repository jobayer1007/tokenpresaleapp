import { useState, useEffect, Fragment } from 'react';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import PRESALE_ABI from '../../../contracts/presale.json';
import Alert from '../../ui/Alert';
import moment from 'moment';
import { chainConfig, normalizeChainId } from '../../../config/env';

const CardLabel = ({ text }) => (
  <p className="text-sm font-semibold text-ink/60">{text}</p>
);

const CardValue = ({ text }) => (
  <p className="text-sm font-semibold text-ink text-right">{text}</p>
);

const Opened = () => {
  const [amountToBuy, setAmountToBuy] = useState(1);
  const [tokenInfo, setTokenInfo] = useState([]);
  const [presaleInfo, setPresaleInfo] = useState([]);
  const [buyerInfo, setBuyerInfo] = useState([]);
  const [status, setStatus] = useState([]);
  const [presaleState, setPresaleState] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const [openAlert, setOpenAlert] = useState(false);

  const { account, library } = useWeb3React();

  const getNetwork = () => {
    const current = normalizeChainId(library?.provider?.chainId || '');
    return chainConfig.presaleNetworks.find(
      (net) => normalizeChainId(net.key).toLowerCase() === current.toLowerCase()
    );
  };

  useEffect(() => {
    if (!library) {
      resetState();
      return;
    }

    const activeNet = getNetwork();
    if (!activeNet) {
      setOpenAlert(true);
      setAlertMsg('Selected chain is unrecognized');
      return;
    }

    getInfo(activeNet);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, library]);

  const resetState = () => {
    setAmountToBuy(1);
    setTokenInfo([]);
    setPresaleInfo([]);
    setStatus([]);
    setBuyerInfo([]);
    setPresaleState('');
  };

  const getContract = (abi, address, signer = null) => {
    const signerOrProvider = signer;
    return new ethers.Contract(address, abi, signerOrProvider);
  };

  const getInfo = async (network) => {
    if (!account) {
      setOpenAlert(true);
      setAlertMsg('Wallet is unconnected');
      return null;
    }

    const signer = await library.getSigner();
    const presalecontract = getContract(PRESALE_ABI, network.contractAddress, signer);
    const chainSuffix = network.currencyLabel || network.symbol;

    let tokenrate;
    try {
      tokenrate = await presalecontract.token_rate();
    } catch (error) {
      setOpenAlert(true);
      setAlertMsg('Get token rate Information Error');
      return null;
    }

    let presaleinfo;
    try {
      presaleinfo = await presalecontract.presale_info();
    } catch (error) {
      setOpenAlert(true);
      setAlertMsg('Get Presale Information Error');
      return null;
    }

    const soft_starttime = `${moment
      .utc(parseInt(presaleinfo.soft_start) * 1000)
      .format('Do of MMM, h A')} UTC`;
    const soft_endtime = `${moment.utc(parseInt(presaleinfo.soft_end) * 1000).format('Do of MMM, h A')} UTC`;
    const public_starttime = `${moment
      .utc(parseInt(presaleinfo.public_start) * 1000)
      .format('Do of MMM, h A')} UTC`;
    const public_endtime = `${moment
      .utc(parseInt(presaleinfo.public_end) * 1000)
      .format('Do of MMM, h A')} UTC`;

    const readableRate = Number(tokenrate);
    const tokenRateDisplay = readableRate ? 1 / readableRate : 0;

    setPresaleInfo([
      { id: 'Token Rate:', val: `${tokenRateDisplay} ${chainSuffix}` },
      { id: 'Softcap:', val: `${ethers.utils.formatUnits(presaleinfo.softcap, 18)} ${chainSuffix}` },
      { id: 'Hardcap:', val: `${ethers.utils.formatUnits(presaleinfo.hardcap, 18)} ${chainSuffix}` },
      { id: 'Buy min:', val: `${ethers.utils.formatUnits(presaleinfo.raise_min, 18)} ${chainSuffix}` },
      { id: 'Buy max:', val: `${ethers.utils.formatUnits(presaleinfo.raise_max, 18)} ${chainSuffix}` },
      { id: 'Soft Presale Start:', val: soft_starttime },
      { id: 'Soft Presale End:', val: soft_endtime },
      { id: 'Public Presale Start:', val: public_starttime },
      { id: 'Public Presale End:', val: public_endtime },
    ]);

    let tokeninfoarr;
    try {
      tokeninfoarr = await presalecontract.tokeninfo();
    } catch (error) {
      setOpenAlert(true);
      setAlertMsg('Get Token Information Error');
      return null;
    }

    const sale_supply =
      (ethers.utils.formatUnits(tokeninfoarr.totalsupply, tokeninfoarr.decimal) / 100) * 10;
    setTokenInfo([
      { id: 'Token Name:', val: tokeninfoarr.name },
      { id: 'Token Symbol:', val: tokeninfoarr.symbol },
      { id: 'Token Decimal:', val: parseInt(tokeninfoarr.decimal) },
      { id: 'Address:', val: presaleinfo.sale_token },
      { id: 'Sale Supply:', val: `${sale_supply} ${tokeninfoarr.symbol}` },
    ]);

    let statusData;
    try {
      statusData = await presalecontract.status();
    } catch (error) {
      setOpenAlert(true);
      setAlertMsg('Get Status Information Error');
      return null;
    }

    setStatus([
      {
        id: 'Raised Amount',
        val: `${ethers.utils.formatUnits(statusData.raised_amount, 18)} ${chainSuffix}`,
      },
      {
        id: 'Sold Amount',
        val: `${ethers.utils.formatUnits(statusData.sold_amount, tokeninfoarr.decimal)} ${
          tokeninfoarr.symbol
        }`,
      },
    ]);

    try {
      const buyer = await presalecontract.buyers(account);
      setBuyerInfo([
        { id: 'Invested', val: `${ethers.utils.formatUnits(buyer.base, 18)} ${chainSuffix}` },
        {
          id: 'ELO Amount',
          val: `${ethers.utils.formatUnits(buyer.sale, tokeninfoarr.decimal)} ${tokeninfoarr.symbol}`,
        },
      ]);
    } catch (error) {
      setOpenAlert(true);
      setAlertMsg('Get Buyers Information Error');
      return null;
    }

    const state = await getPresaleStatus(presalecontract);
    switch (parseInt(state)) {
      case 1:
        setPresaleState('Public Presale Active');
        break;
      case 2:
        setPresaleState('Stopped');
        break;
      case 3:
        setPresaleState('Soft Presale Active');
        break;
      case 4:
        setPresaleState('Success');
        break;
      case 5:
        setPresaleState('Failed');
        break;
      default:
        setPresaleState('Unknown state');
        break;
    }
  };

  const getPresaleStatus = async (presalecontract) => {
    try {
      return await presalecontract.presaleStatus();
    } catch (error) {
      setOpenAlert(true);
      setAlertMsg('Get Status Error');
      return null;
    }
  };

  const withContract = async (action) => {
    if (!account) {
      setOpenAlert(true);
      setAlertMsg('Wallet is unconnected');
      return null;
    }
    const activeNet = getNetwork();
    if (!activeNet) {
      setOpenAlert(true);
      setAlertMsg('Selected chain is unrecognized');
      return null;
    }
    const signer = await library.getSigner();
    return getContract(PRESALE_ABI, activeNet.contractAddress, signer);
  };

  const Deposit = async (amount) => {
    const presalecontract = await withContract();
    if (!presalecontract) return;
    if (!amount || amount <= 0) {
      setOpenAlert(true);
      setAlertMsg('Please enter a valid amount');
      return;
    }
    const overrid = { value: ethers.utils.parseUnits(amount.toString(), 18) };
    try {
      await presalecontract.userDeposit(overrid);
      setOpenAlert(true);
      setAlertMsg('Deposit done successfully');
    } catch (error) {
      setOpenAlert(true);
      setAlertMsg('Deposit failed');
    }
  };

  const Withdraw = async () => {
    const presalecontract = await withContract();
    if (!presalecontract) return;
    try {
      await presalecontract.userWithdrawBaseTokens();
      setOpenAlert(true);
      setAlertMsg('Withdraw done successfully');
    } catch (error) {
      setOpenAlert(true);
      setAlertMsg('Withdraw failed');
    }
  };

  const Claim = async () => {
    const presalecontract = await withContract();
    if (!presalecontract) return;
    try {
      await presalecontract.userWithdrawTokens();
      setOpenAlert(true);
      setAlertMsg('Claim done successfully');
    } catch (error) {
      setOpenAlert(true);
      setAlertMsg('Claim failed');
    }
  };

  const actionButton = () => {
    let label;
    let handler;
    switch (presaleState) {
      case 'Soft Presale Active':
      case 'Public Presale Active':
        label = 'Buy';
        handler = () => Deposit(amountToBuy);
        break;
      case 'Success':
        label = 'Claim';
        handler = () => Claim();
        break;
      case 'Failed':
        label = 'Withdraw';
        handler = () => Withdraw();
        break;
      default:
        return null;
    }

    return (
      <button className="btn-primary w-full" onClick={handler} type="button">
        {label}
      </button>
    );
  };

  const handleSelectedChain = () => {
    try {
      const activeNet = getNetwork();
      return activeNet?.currencyLabel || '$';
    } catch (e) {
      return 'Native';
    }
  };

  const infoSection = (title, data) => (
    <div className="space-y-2 rounded-2xl border border-ink/5 bg-surface px-4 py-3">
      <p className="text-sm font-semibold text-ink">{title}</p>
      <div className="space-y-2">
        {data.map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <CardLabel text={item.id} />
            <CardValue text={item.val} />
          </div>
        ))}
      </div>
    </div>
  );

  const stateChipColor = () => {
    switch (presaleState) {
      case 'Soft Presale Active':
      case 'Public Presale Active':
      case 'Success':
        return 'bg-success/10 text-success';
      case 'Failed':
        return 'bg-danger/10 text-danger';
      default:
        return 'bg-ink/5 text-ink/70';
    }
  };

  return (
    <Fragment>
      <Alert openAlert={openAlert} setOpenAlert={setOpenAlert} msg={alertMsg} />

      {presaleState && (
        <div className="text-center">
          <p className="text-sm font-semibold text-ink">{presaleState}</p>
        </div>
      )}

      <div className="grid justify-center">
        <div className="card w-full max-w-4xl space-y-4 bg-white">
          {presaleState && (
            <div className={`pill w-fit ${stateChipColor()}`}>{presaleState}</div>
          )}
          <div className="grid gap-4 md:grid-cols-2">
            {infoSection('Token Information', tokenInfo)}
            {infoSection('Presale Information', presaleInfo)}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {infoSection('Presale Status', status)}
            {infoSection('Buyer Information', buyerInfo)}
          </div>

          {(presaleState === 'Public Presale Active' || presaleState === 'Soft Presale Active') && (
            <div className="space-y-2 rounded-2xl border border-ink/5 bg-surface px-4 py-3">
              <p className="text-sm font-semibold text-ink">Buy $ELO Token</p>
              <div className="rounded-xl border border-ink/10 bg-white px-3 py-2 focus-within:border-primary">
                <div className="flex items-center gap-2">
                  <span className="pill">{handleSelectedChain()}</span>
                  <input
                    type="number"
                    id="amountToBuy"
                    placeholder="0.00"
                    className="w-full bg-transparent text-base font-semibold text-ink outline-none"
                    value={amountToBuy}
                    onChange={(e) => setAmountToBuy(e.target.value)}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          )}

          {actionButton()}
        </div>
      </div>
    </Fragment>
  );
};

export default Opened;
