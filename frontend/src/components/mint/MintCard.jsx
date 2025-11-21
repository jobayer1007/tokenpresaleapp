import { Fragment, useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { ethers } from 'ethers';
import ERC721_ABI from '../../contracts/ERC721_abi.json';
import Alert from '../ui/Alert';
import { chainConfig, normalizeChainId } from '../../config/env';

const NFTContractAddress = chainConfig.nft.contractAddress;
const targetChainId = chainConfig.nft.chainId;

const MintCard = () => {
  const { Moralis, web3, user } = useMoralis();
  const [amountToMint, setAmountToMint] = useState(1);
  const [mintInfo, setMintInfo] = useState([]);
  const [presalePrice, setPresalePrice] = useState(0);
  const [mintActive, setMintActive] = useState(true);
  const [stateLabel, setStateLabel] = useState('Presale status');
  const [alertMsg, setAlertMsg] = useState('');
  const [openAlert, setOpenAlert] = useState(false);

  const handleMint = async () => {
    if (!web3?._provider) {
      setOpenAlert(true);
      setAlertMsg('Please connect a wallet.');
      return;
    }

    if (parseInt(web3.givenProvider.chainId) !== parseInt(targetChainId)) {
      setOpenAlert(true);
      setAlertMsg('Selected chain is unrecognized.');
      return;
    }

    const totalCost = amountToMint * presalePrice;

    const options = {
      contractAddress: NFTContractAddress,
      functionName: 'mintToken',
      abi: ERC721_ABI,
      params: { numberOfTokens: amountToMint },
      awaitReceipt: false,
      msgValue: Moralis.Units.ETH(totalCost.toPrecision(8).toString()),
    };

    const tx = await Moralis.executeFunction(options);

    tx.on('transactionHash', (hash) => {
      setOpenAlert(true);
      setAlertMsg(`Transaction hash: ${hash}`);
    })
      .on('receipt', () => {
        setOpenAlert(true);
        setAlertMsg('Transaction confirmed');
      })
      .on('confirmation', () => {
        setOpenAlert(true);
        setAlertMsg('Transaction finalized');
      })
      .on('error', (error) => {
        setOpenAlert(true);
        setAlertMsg(`Something went wrong: ${error}`);
      });
  };

  const getBalance = async () => {
    const options = { contractAddress: NFTContractAddress, abi: ERC721_ABI };

    const totalsupply = await Moralis.executeFunction({ functionName: 'totalSupply', ...options });
    const tokenPrice = await Moralis.executeFunction({ functionName: 'getTokenPrice', ...options });
    const atokenPrice = ethers.utils.formatUnits(tokenPrice, 18);
    setPresalePrice(Number(atokenPrice));
    const maxsupply = await Moralis.executeFunction({ functionName: 'maxSupply', ...options });
    const presaleactive = await Moralis.executeFunction({ functionName: 'presaleActive', ...options });
    const saleactive = await Moralis.executeFunction({ functionName: 'saleIsActive', ...options });

    if (presaleactive) {
      setStateLabel('Presale started');
    } else if (saleactive) {
      setStateLabel('Presale ended — Public mint live');
    } else {
      setStateLabel('Minting soon');
    }

    const remaining = maxsupply - totalsupply;

    if (remaining <= 0) {
      setMintActive(true);
      setStateLabel('Sold out');
    } else {
      setMintActive(false);
    }

    if (!presaleactive && !saleactive) {
      setMintActive(true);
    }

    setMintInfo([
      { label: 'Total Supply', value: maxsupply.toString() },
      { label: 'Remaining', value: remaining.toString() },
      { label: 'Minting Cost', value: `${atokenPrice.toString()} ETH` },
      { label: 'Per Wallet', value: '20 NFT' },
      { label: 'Network', value: normalizeChainId(targetChainId) },
    ]);
  };

  useEffect(() => {
    if (web3?._provider) {
      if (parseInt(web3.givenProvider.chainId) === parseInt(targetChainId)) {
        getBalance();
      } else {
        setOpenAlert(true);
        setAlertMsg('Selected chain is unrecognized');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3, user]);

  useEffect(() => {
    const handleAccountChange = () => {
      if (web3?._provider) {
        if (parseInt(web3.givenProvider.chainId) === parseInt(targetChainId)) {
          getBalance();
        } else {
          setOpenAlert(true);
          setAlertMsg('Selected chain is unrecognized');
        }
      }
    };

    const handleChainChange = (chain) => {
      if (web3?._provider) {
        if (parseInt(chain) === parseInt(targetChainId)) {
          getBalance();
        } else {
          setOpenAlert(true);
          setAlertMsg('Selected chain is unrecognized');
        }
      }
    };

    const unsubscribeAccount = Moralis.onAccountChanged?.(handleAccountChange);
    const unsubscribeChain = Moralis.onChainChanged?.(handleChainChange);

    return () => {
      if (typeof unsubscribeAccount === 'function') unsubscribeAccount();
      if (typeof unsubscribeChain === 'function') unsubscribeChain();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Moralis, web3]);

  return (
    <Fragment>
      <Alert openAlert={openAlert} setOpenAlert={setOpenAlert} msg={alertMsg} />
      <div className="grid justify-center">
        <div className="card w-full max-w-xl space-y-5 bg-white">
          <div className="flex items-center justify-between">
            <span className="chip">{stateLabel}</span>
            <span className="pill">Chain: {normalizeChainId(targetChainId)}</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {mintInfo.map((item) => (
              <div key={item.label} className="rounded-xl border border-ink/5 bg-surface px-3 py-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {item.label}
                </p>
                <p className="text-sm font-semibold text-ink">{item.value}</p>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between text-sm font-semibold text-ink">
              <label htmlFor="amount-to-mint">Amount to mint</label>
              <span className="text-ink/60">{amountToMint} NFT</span>
            </div>
            <input
              id="amount-to-mint"
              type="range"
              min="1"
              max="20"
              step="1"
              value={amountToMint}
              onChange={(e) => setAmountToMint(Number(e.target.value))}
              className="mt-2 w-full accent-primary"
            />
            <div className="flex items-center justify-between text-xs text-ink/60">
              <span>Min: 1</span>
              <span>Max: 20</span>
            </div>
          </div>

          <button
            className="btn-primary w-full"
            disabled={mintActive}
            onClick={handleMint}
            type="button"
          >
            Mint
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default MintCard;
