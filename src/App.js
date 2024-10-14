
import './App.css';
import React, { useState, useEffect } from 'react';
import { initWeb3, fetchAccounts, loadContract } from './web3Utils';
import RegistrationForm from './components/RegistrationForm';
import VotingPage from './components/VotingPage';
import ResultsPage from './components/ResultsPage';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState('Initializing...');

  useEffect(() => {
    const initialize = async () => {
      try {
        setLoadingMessage('Connecting to Web3...');
        const web3 = await initWeb3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');

        setLoadingMessage('Fetching accounts...');
        const accounts = await fetchAccounts(web3);

        setLoadingMessage('Loading contract...');
        const networkId = await web3.eth.net.getId();
        const contract = await loadContract(web3, networkId);

        setWeb3(web3);
        setAccounts(accounts);
        setContract(contract);
      } catch (error) {
        console.error('Error initializing web3:', error);
        setLoadingMessage('Error initializing web3. Please try again.');
      }
    };

    initWeb3();
  }, []);

  if (!web3 || !accounts.length || !contract) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <div>{loadingMessage}</div>
      </div>
    );
  }

  return (
    <div>
      <h1>Blockchain Voting System</h1>
      <RegistrationForm contract={contract} accounts={accounts} />
      <VotingPage contract={contract} accounts={accounts} />
      <ResultsPage contract={contract} />
    </div>
  );
};

export default App;
