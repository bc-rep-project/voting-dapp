
import Web3 from 'web3';
import VotingContract from './contracts/Voting.json';

export const initWeb3 = async (providerUrl) => {
  try {
    const web3 = new Web3(providerUrl);
    return web3;
  } catch (error) {
    console.error('Error initializing Web3:', error);
    throw error;
  }
};

export const fetchAccounts = async (web3) => {
  try {
    const accounts = await web3.eth.requestAccounts();
    return accounts;
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error;
  }
};

export const loadContract = async (web3, networkId) => {
  try {
    const deployedNetwork = VotingContract.networks[networkId];
    const contract = new web3.eth.Contract(
      VotingContract.abi,
      deployedNetwork && deployedNetwork.address,
    );
    return contract;
  } catch (error) {
    console.error('Error loading contract:', error);
    throw error;
  }
};
