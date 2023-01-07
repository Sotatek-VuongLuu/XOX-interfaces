import { ChainId } from "@pancakeswap/sdk";

const Bsc = "/images/networks/bsc-network.png";
const Goerli = "/images/networks/goerli-network.jpg";
const Polygon = "/images/networks/eth-network.png";
const Rinkeby = "/images/networks/eth-network.png";

export const NETWORK_ICON = {
  [ChainId.BSC]: Bsc,
  [ChainId.BSC_TESTNET]: Bsc,
  [ChainId.ETHEREUM]: Polygon,
  [ChainId.GOERLI]: Polygon,
  [ChainId.RINKEBY]: Rinkeby,
};

export const NETWORK_LABEL: { [chainId in ChainId]?: string } = { [ChainId.RINKEBY]: "Rinkeby", [ChainId.BSC_TESTNET]: "BSC", [ChainId.ETHEREUM]: "Ethereum", [ChainId.GOERLI]: "Ethereum" }

export const NETWORK_LINK: { [chainId in ChainId]?: any } = {
  [ChainId.RINKEBY]: "https://rinkeby.etherscan.io",
  [ChainId.BSC]: "https://bscscan.com",
  [ChainId.BSC_TESTNET]: "https://testnet.bscscan.com"
};
