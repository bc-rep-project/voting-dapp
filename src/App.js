
import './App.css';
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import VotingContract from './contracts/Voting.json';
import RegistrationForm from './components/RegistrationForm';
import VotingPage from './components/VotingPage';
import ResultsPage from './components/ResultsPage';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
        const accounts = await web3.eth.requestAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = VotingContract.networks[networkId];
        const contract = new web3.eth.Contract(
          VotingContract.abi,
          deployedNetwork && deployedNetwork.address,
        );

        setWeb3(web3);
        setAccounts(accounts);
        setContract(contract);
      } catch (error) {
        console.error('Error initializing web3:', error);
      }
    };

    initWeb3();
  }, []);

  if (!web3 || !accounts.length || !contract) {
    return <div>Loading Web3, accounts, and contract...</div>;
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
