import React, { useState } from 'react';
import './style.css'

const DoubleInputWithLabel = () => {
    const [amount, setAmount] = useState('Enter an amount');

    const handleMaxClick = () => {
        setAmount('0.0000000'); // Здесь установите значение Max
    };

    return (
        <div className="double-input-container">
            <label className="myInput">Amount</label>
            <div className="double-input">
                <input type="text" value={amount} readOnly />
                <div className="max-label" onClick={handleMaxClick}>
                    Max
                </div>
            </div>
        </div>
    );
};

export default DoubleInputWithLabel;

