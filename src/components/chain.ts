export const ZKSYNC_ERA_MAINNET_PARAMS = {
  chainId: 324,
  chainName: "zkSync Era Mainnet",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://mainnet.era.zksync.io"],
  blockExplorerUrls: ["https://explorer.zksync.io"],
};

export const ZKSYNC_ERA_TESTNET_PARAMS = {
  chainId: 280,
  chainName: "zkSync Era Goerli Testnet",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://zksync2-testnet.zksync.dev"],
  blockExplorerUrls: ["https://zksync2-testnet.zkscan.io"],
};

export const ETHEREUM_PARAMS: any = {
  test: ZKSYNC_ERA_TESTNET_PARAMS,
  main: ZKSYNC_ERA_MAINNET_PARAMS,
};

export const ETHEREUM_NETWORK =
  ETHEREUM_PARAMS[`${process.env.REACT_APP_NETWORK_CHAIN}`];

export const CONTRACT = process.env.REACT_APP_CONTRACT_ADDRESS;

export const CHAIN_EXT_INFO = [
  // {
  //   title: "All chains",
  //   chain: "",
  //   icon: "/images/all.png",
  //   currency: "",
  // },
  // {
  //   title: "BNB",
  //   chain: "bnb",
  //   icon: "/images/bnb.png",
  // },
  // {
  //   title: "zkSync Era Goerli",
  //   chain: "zkSync_Era_testnet",
  //   icon: "/images/arb.png",
  //   currency: "ETH",
  //   currencyIcon: "/images/ether.png",
  // },
  {
    title: "zkSync Era",
    chain: "zkSync_Era",
    icon: "/images/zk.png",
    currency: "ETH",
    currencyIcon: "/images/ether.png",
  },
  // {
  //   title: "ETH",
  //   chain: "eth",
  //   icon: "/images/eth.png",
  // },
];
