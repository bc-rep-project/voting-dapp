
const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3').default;
const VotingContract = require('./src/contracts/Voting.json');

const app = express();
const port = 3001;

app.use(bodyParser.json());

const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');
let contract;
let accounts;

const init = async () => {
  accounts = await web3.eth.getAccounts();
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = VotingContract.networks[networkId];
  contract = new web3.eth.Contract(
    VotingContract.abi,
    deployedNetwork && deployedNetwork.address,
  );
};

init();

app.post('/register', async (req, res) => {
  const { voterAddress } = req.body;
  try {
    await contract.methods.registerVoter(voterAddress).send({ from: accounts[0] });
    res.send('Voter registered successfully!');
  } catch (error) {
    res.status(500).send('Error registering voter.');
  }
});

app.post('/vote', async (req, res) => {
  const { candidateId } = req.body;
  try {
    await contract.methods.vote(candidateId).send({ from: accounts[0] });
    res.send('Vote cast successfully!');
  } catch (error) {
    res.status(500).send('Error casting vote.');
  }
});

app.get('/results', async (req, res) => {
  try {
    const candidateCount = await contract.methods.candidatesCount().call();
    const resultsList = [];
    for (let i = 0; i < candidateCount; i++) {
      const candidate = await contract.methods.candidates(i).call();
      resultsList.push(candidate);
    }
    res.json(resultsList);
  } catch (error) {
    res.status(500).send('Error fetching results.');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
