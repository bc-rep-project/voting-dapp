import contractConfig from './contract.config.json';

export const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || contractConfig.contractAddress;
