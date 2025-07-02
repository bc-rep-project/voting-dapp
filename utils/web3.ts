
import Web3 from 'web3';

interface EthereumProvider {
  request: (args: { method: string }) => Promise<string[]>;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

let web3: Web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  // We are in the browser and MetaMask is running.
  window.ethereum?.request({ method: 'eth_requestAccounts' });
  web3 = new Web3(window.ethereum as EthereumProvider);
} else {
  // We are on the server *OR* the user is not running MetaMask
  const provider = new Web3.providers.HttpProvider(
    'http://localhost:8545'
  );
  web3 = new Web3(provider);
}

export default web3;
