import React, { useState } from 'react';
import './style.css';

const DoubleInputWithLabel = () => {
    const [amount, setAmount] = useState('');
    const maxAmount = '0.0000000';

    const handleMaxClick = () => {
        setAmount(maxAmount);
    };

    const handleInputChange = (e) => {
        setAmount(e.target.value);
    };

    return (
        <div className="double-input-container">
            <label className="myInput">Amount</label>
            <div className="double-input">
                <input
                    type="text"
                    value={amount}
                    onChange={handleInputChange}
                    placeholder="Enter an amount"
                    className="amount-input"
                />
                <div className="max-label" onClick={handleMaxClick}>
                    Max
                </div>
            </div>
        </div>
    );
};

export default DoubleInputWithLabel;



