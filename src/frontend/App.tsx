import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';

interface Candidate {
  id: number;
  name: string;
  voteCount: number;
}

function App() {
  const [account, setAccount] = useState<string>('');
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [votingOpen, setVotingOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);

          // TODO: Initialize contract with deployed address
          // const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
          // setContract(contract);

          setLoading(false);
        } catch (error) {
          console.error('Error initializing:', error);
          setLoading(false);
        }
      }
    };

    init();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    }
  };

  const castVote = async (candidateId: number) => {
    if (!contract) return;
    try {
      const tx = await contract.castVote(candidateId);
      await tx.wait();
      // Refresh candidate list
    } catch (error) {
      console.error('Error casting vote:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>OpenVote</h1>
        {!account ? (
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <p>Connected: {account}</p>
        )}
      </header>
      <main>
        {votingOpen ? (
          <div className="candidates-list">
            {candidates.map((candidate) => (
              <div key={candidate.id} className="candidate-card">
                <h3>{candidate.name}</h3>
                <p>Votes: {candidate.voteCount}</p>
                <button onClick={() => castVote(candidate.id)}>Vote</button>
              </div>
            ))}
          </div>
        ) : (
          <p>Voting is currently closed</p>
        )}
      </main>
    </div>
  );
}

export default App; 