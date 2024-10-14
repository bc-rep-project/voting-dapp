
import React, { useState } from 'react';
import Web3 from 'web3';
import CryptoJS from 'crypto-js';

const RegistrationForm = ({ contract, accounts }) => {
  const [voterAddress, setVoterAddress] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const encryptedAddress = CryptoJS.AES.encrypt(voterAddress, 'secret-key').toString();
      await contract.methods.registerVoter(encryptedAddress).send({ from: accounts[0] });
      alert('Voter registered successfully!');
    } catch (error) {
      console.error('Error registering voter:', error);
      alert('Error registering voter.');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div>
        <label>Voter Address:</label>
        <input
          type="text"
          value={voterAddress}
          onChange={(e) => setVoterAddress(e.target.value)}
          required
        />
      </div>
      <button type="submit">Register Voter</button>
    </form>
  );
};

export default RegistrationForm;
