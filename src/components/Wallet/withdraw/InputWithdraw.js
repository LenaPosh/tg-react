import React from 'react';
import './style.css';

const TextInputWithLabel = () => {
    return (
        <div className="input-container">
            <label className="myInput">Your withdrawal address:</label>
            <input type="text" id="myInput" placeholder="Your address" />
        </div>
    );
};

export default TextInputWithLabel;
