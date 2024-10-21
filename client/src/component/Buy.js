import React, { useState } from 'react';
import { parseEther } from 'ethers';

const Buy = ({ state, account }) => {
  const { contract } = state;

  const [stateData, setStateData] = useState({
    name: '',
    message: '',
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setStateData({ ...stateData, [name]: value });
  };

  const buyChai = async (event) => {
    event.preventDefault();
    const value = { value: parseEther('0.001') };
    const buyChai = await contract.buyChaiForMe(stateData.name, stateData.message, value);
    await buyChai.wait();
    console.log('Transaction Successful');
  };

  return (
    <div className="container mt-5">
      <form onSubmit={buyChai} className="card p-4 shadow-sm">
        <h3 className="text-center mb-4">Donate 0.001 Sepolia ETH</h3>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            placeholder="Your Name"
            value={stateData.name}
            onChange={handleInput}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <input
            type="text"
            name="message"
            id="message"
            className="form-control"
            placeholder="Your Message"
            value={stateData.message}
            onChange={handleInput}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block" disabled={!account}>
          Donate for 0.001 ETH
        </button>
      </form>
    </div>
  );
};

export default Buy;
