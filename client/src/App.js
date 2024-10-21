import { useState, useEffect } from 'react';
import './App.css';
import ABIData from './contracts/BuyChai.json';
import Buy from './component/Buy';
import Memos from './component/Memos';
import { ethers } from 'ethers';

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState(null);

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = '0x1cFAA018aa6ec657Cdd77260944430912967566C';
      const contractABI = ABIData?.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const accountDetails = await ethereum.request({ method: 'eth_requestAccounts' });

          window.ethereum.on('chainChanged', () => {
            window.location.reload();
          });

          window.ethereum.on('accountsChanged', () => {
            window.location.reload();
          });
          const provider = new ethers.BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const MyContract = new ethers.Contract(contractAddress, contractABI, signer);

          setAccount(accountDetails[0]);
          setState({
            provider,
            signer,
            contract: MyContract,
          });
        } else {
          alert('Please install metamask');
        }
      } catch (error) {
        console.log(error);
      }
    };

    connectWallet();
  }, []);

  console.log(state);
  return (
    <>

      <Buy state={state} account={account} />
      {/* Seperate two components */}
      <div className="container mt-5"> Connected Account: {account ? account : 'Account not connected'}</div>
      <Memos state={state} />
      <footer className="footer mt-auto py-3 bg-success  w-100" style={{ position: 'fixed', bottom: 0 }}>
        <div className="container">
          <div className="d-flex justify-content-between">
            <span className="text-white">www.codinghelps.com</span>
            <span className="text-white">Nofal Basan</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
