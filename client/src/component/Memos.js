import React, { useEffect, useState } from 'react';

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract, provider } = state; // Destructure contract and provider from state

  useEffect(() => {
    const memosMessages = async () => {
      if (contract) {
        // Fetch memos from the contract
        const memosFromContract = await contract.getMemos();
        setMemos(memosFromContract);
      }
    };
    memosMessages();
  }, [contract, provider]);

  function convertTimestampToDateTime(timestamp) {
    // Create a new Date object from the timestamp (in milliseconds)
    const date = new Date(parseInt(timestamp) * 1000);
    
    // Format the date as YYYY-MM-DD
    const formattedDate = date.toISOString().slice(0, 10); // YYYY-MM-DD
  
    // Extract hours, minutes, and seconds
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Ensure two digits
    const seconds = String(date.getSeconds()).padStart(2, '0'); // Ensure two digits
    
    // Determine AM/PM suffix
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert to 12-hour format
    hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
    
    // Combine formatted time
    const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;
  
    return `<span>${formattedDate}</span> <span className="text-primary" style="color: #007bff">${formattedTime}</span>`;
  }
  
  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Donor People History</h3>
      <div className="row">
  {memos && memos.length === 0 ? (
    <p className="text-center">Zero Donations yet</p>
  ) : (
    memos.map((memo, index) => (
      <div key={memo.timestamp} className="col-md-4 mb-3"> {/* Adjusted to 4 for 3 cards per row */}
        <div className="card shadow-sm">
          <div className="card-body">
            <p className="card-text"><strong>Name:</strong> {memo.name}</p>
            <p className="card-text"><strong>Message:</strong> {memo.message}</p>
            <p><strong>Timestamp:</strong> <span dangerouslySetInnerHTML={{ __html: convertTimestampToDateTime(memo.timestamp) }}></span></p>
            <p className="card-text"><strong>From:</strong> {memo.from}</p>
          </div>
        </div>
      </div>
    ))
  )}
</div>

    </div>
  );
};

export default Memos;
