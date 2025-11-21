import useTokenPrice from 'hooks/useTokenPrice';

function TokenPrice(props) {
  const { tokenPrice } = useTokenPrice(props);
  if (!tokenPrice) return null;
  return (
    <div className="rounded-xl border border-ink/5 bg-surface px-3 py-2 text-sm font-semibold text-ink">
      Token price: ${tokenPrice.usdPrice?.toFixed ? tokenPrice.usdPrice.toFixed(4) : tokenPrice.usdPrice}
    </div>
  );
}

export default TokenPrice;
