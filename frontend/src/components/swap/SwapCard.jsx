import { useState, useEffect, useMemo, Fragment } from 'react';
import { useMoralis } from 'react-moralis';
import { useMoralisDapp } from 'providers/MoralisDappProvider/MoralisDappProvider';
import Tokens from './Tokens';
import useInchDex from 'hooks/useInchDex';
import useTokenPrice from 'hooks/useTokenPrice';
import { tokenValue } from 'helpers/formatters';
import Alert from '../ui/Alert';

const nativeAddress = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
const chainIds = { '0x1': 'eth', '0x38': 'bsc', '0x61': 'bsc' };

const TokenImage = ({ src }) => (
  <span className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-surface">
    {src ? <img src={src} alt="Token" className="h-full w-full object-cover" /> : null}
  </span>
);

const SwapCard = () => {
  const { chainId } = useMoralisDapp();
  const chain = chainIds?.[chainId];
  const { trySwap, tokenList, getQuote } = useInchDex(chain);
  const { Moralis, isInitialized } = useMoralis();
  const [isFromModalActive, setFromModalActive] = useState(false);
  const [isToModalActive, setToModalActive] = useState(false);
  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [fromAmount, setFromAmount] = useState('');
  const [quote, setQuote] = useState();
  const [currentTrade, setCurrentTrade] = useState();
  const { fetchTokenPrice } = useTokenPrice();
  const [tokenPricesUSD, setTokenPricesUSD] = useState({});
  const [alertMsg, setAlertMsg] = useState('');
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    if (!isInitialized || !fromToken || !chain) return;
    fetchTokenPrice({ chain, address: fromToken?.address })
      .then((price) =>
        setTokenPricesUSD((prev) => ({
          ...prev,
          [fromToken.address]: price['usdPrice'],
        }))
      )
      .catch((e) => {
        setOpenAlert(true);
        setAlertMsg(e.error || 'Unable to fetch token price');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain, isInitialized, fromToken]);

  useEffect(() => {
    if (!isInitialized || !toToken || !chain) return;
    fetchTokenPrice({ chain, address: toToken?.address })
      .then((price) =>
        setTokenPricesUSD((prev) => ({
          ...prev,
          [toToken.address]: price['usdPrice'],
        }))
      )
      .catch((e) => {
        setOpenAlert(true);
        setAlertMsg(e.error || 'Unable to fetch token price');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain, isInitialized, toToken]);

  useEffect(() => {
    if (!tokenList) return;
    setFromToken(tokenList[nativeAddress]);
  }, [tokenList]);

  const ButtonState = useMemo(() => {
    if (chainIds?.[chainId] !== chain) return { isActive: false, text: `Switch to ${chain}` };

    if (!fromAmount || fromAmount <= 0) return { isActive: false, text: 'Enter an amount' };

    if (fromAmount && currentTrade) return { isActive: true, text: 'Swap' };

    return { isActive: false, text: 'Select tokens' };
  }, [fromAmount, currentTrade, chainId, chain]);

  useEffect(() => {
    if (fromToken && toToken && fromAmount)
      setCurrentTrade({ fromToken, toToken, fromAmount, chain });
  }, [toToken, fromToken, fromAmount, chain]);

  useEffect(() => {
    if (!currentTrade) return undefined;

    let isMounted = true;
    getQuote(currentTrade).then((q) => {
      if (isMounted) setQuote(q);
    });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrade]);

  const PriceSwap = () => {
    const Quote = quote;
    if (!Quote || !tokenPricesUSD?.[toToken?.address]) return null;
    if (Quote?.statusCode === 400) return <div className="text-xs text-ink/70">{Quote.message}</div>;
    const { fromTokenAmount, toTokenAmount } = Quote;
    const { symbol: fromSymbol } = fromToken;
    const { symbol: toSymbol } = toToken;
    const pricePerToken = parseFloat(
      tokenValue(fromTokenAmount, fromToken['decimals']) /
        tokenValue(toTokenAmount, toToken['decimals'])
    ).toFixed(6);
    return (
      <div className="flex items-center justify-between text-sm font-semibold text-ink">
        <span className="text-ink/70">Price</span>
        <span>
          1 {toSymbol} = {pricePerToken} {fromSymbol} (${tokenPricesUSD[toToken.address].toFixed(6)})
        </span>
      </div>
    );
  };

  return (
    <Fragment>
      <Alert openAlert={openAlert} setOpenAlert={setOpenAlert} msg={alertMsg} />
      <div className="card fadeInUp w-full max-w-xl space-y-4 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Swap</p>
            <h3 className="text-xl font-bold text-ink">Swap across supported chains</h3>
          </div>
          <div className="pill">{chainId ? chain?.toUpperCase() : 'Connect wallet'}</div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-ink" htmlFor="from">
            From
          </label>
          <div className="flex items-center gap-2 rounded-xl border border-ink/10 bg-surface px-3 py-2 focus-within:border-primary">
            <input
              type="number"
              id="from"
              placeholder="0.00"
              className="w-full bg-transparent text-base font-semibold text-ink outline-none"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              min="0"
            />
            {chainId ? (
              <button
                className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-semibold text-ink shadow-soft"
                onClick={() => setFromModalActive(true)}
                type="button"
                disabled={!tokenList}
              >
                <TokenImage src={fromToken?.logoURI} />
                {fromToken?.symbol || 'Select Token'}
              </button>
            ) : (
              <span className="pill">Connect wallet</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white text-ink/70">
            <svg className="h-4 w-4" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-ink" htmlFor="to">
            To
          </label>
          <div className="flex items-center gap-2 rounded-xl border border-ink/10 bg-surface px-3 py-2">
            <input
              type="text"
              id="to"
              placeholder="0.00"
              className="w-full bg-transparent text-base font-semibold text-ink outline-none"
              value={
                quote
                  ? Moralis.Units.FromWei(quote?.toTokenAmount, quote?.toToken?.decimals).toFixed(6)
                  : ''
              }
              readOnly
            />
            {chainId ? (
              <button
                className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-semibold text-ink shadow-soft"
                onClick={() => setToModalActive(true)}
                type="button"
                disabled={!tokenList}
              >
                <TokenImage src={toToken?.logoURI} />
                {toToken?.symbol || 'Select Token'}
              </button>
            ) : (
              <span className="pill">Connect wallet</span>
            )}
          </div>
        </div>

        {quote && (
          <div className="space-y-2 rounded-xl border border-ink/5 bg-surface px-3 py-2">
            <div className="flex items-center justify-between text-sm font-semibold text-ink">
              <span className="text-ink/70">Estimated Gas</span>
              <span>{quote?.estimatedGas}</span>
            </div>
            <PriceSwap />
          </div>
        )}

        <button
          className={`btn-primary w-full ${!ButtonState.isActive ? 'opacity-60' : ''}`}
          onClick={() => trySwap(currentTrade)}
          disabled={!ButtonState.isActive}
          type="button"
        >
          {ButtonState.text}
        </button>
      </div>

      {isFromModalActive && (
        <Tokens
          open={isFromModalActive}
          handleClose={() => setFromModalActive(false)}
          setToken={setFromToken}
          tokenList={tokenList}
        />
      )}
      {isToModalActive && (
        <Tokens
          open={isToModalActive}
          handleClose={() => setToModalActive(false)}
          setToken={setToToken}
          tokenList={tokenList}
        />
      )}
    </Fragment>
  );
};

export default SwapCard;
