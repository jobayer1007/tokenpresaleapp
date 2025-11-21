const env = (key, fallback = '') => (import.meta.env[key] !== undefined ? import.meta.env[key] : fallback);

const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export const normalizeChainId = (value) => {
  if (!value) return '';
  if (typeof value === 'number') return `0x${value.toString(16)}`;
  return value.toString();
};

export const appConfig = {
  brandName: env('VITE_BRAND_NAME', 'ELO'),
  moralisAppId: env('VITE_MORALIS_APP_ID', ''),
  moralisServerUrl: env('VITE_MORALIS_SERVER_URL', ''),
  heroVideoUrl: env('VITE_HERO_VIDEO_URL', 'https://www.youtube.com/watch?v=VB5_R9_F8MY'),
  whitepaperUrl: env('VITE_WHITEPAPER_URL', ''),
  contactEmail: env('VITE_CONTACT_EMAIL', ''),
  galleryImageBase: env(
    'VITE_GALLERY_IMAGE_BASE',
    'https://images.unsplash.com/photo-1505238680356-667803448bb6?auto=format&fit=crop&w=900&q=80'
  ),
  social: {
    twitter: env('VITE_SOCIAL_TWITTER', 'https://twitter.com/'),
    telegram: env('VITE_SOCIAL_TELEGRAM', 'https://t.me/'),
    discord: env('VITE_SOCIAL_DISCORD', 'https://discord.gg'),
  },
};

export const chainConfig = {
  presaleOpensAt: toNumber(env('VITE_PRESALE_OPENS_AT', '0')) || Date.now(),
  presaleNetworks: [
    {
      key: env('VITE_PRESALE_CHAIN_ETH_ID', '0x3'),
      label: env('VITE_PRESALE_CHAIN_ETH_NAME', 'Ethereum Testnet'),
      symbol: env('VITE_PRESALE_CHAIN_ETH_SYMBOL', 'ETH'),
      currencyLabel: env('VITE_PRESALE_CHAIN_ETH_CURRENCY', '$ETH'),
      contractAddress: env('VITE_PRESALE_CHAIN_ETH_CONTRACT', ''),
    },
    {
      key: env('VITE_PRESALE_CHAIN_BSC_ID', '0x61'),
      label: env('VITE_PRESALE_CHAIN_BSC_NAME', 'BSC Testnet'),
      symbol: env('VITE_PRESALE_CHAIN_BSC_SYMBOL', 'BNB'),
      currencyLabel: env('VITE_PRESALE_CHAIN_BSC_CURRENCY', '$BNB'),
      contractAddress: env('VITE_PRESALE_CHAIN_BSC_CONTRACT', ''),
    },
  ],
  nft: {
    chainId: env('VITE_NFT_CHAIN_ID', '0x4'),
    contractAddress: env('VITE_NFT_CONTRACT_ADDRESS', ''),
  },
};
