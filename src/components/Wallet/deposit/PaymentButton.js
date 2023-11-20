import React, { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './PaymentButton.css';

const PaymentButton = ({ address }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        setCopied(true);
    };

    return (
        <div className="copyable-address-container">
            <input
                type="text"
                value={address}
                readOnly
                className="copyable-address-input"
            />
            <CopyToClipboard text={address} onCopy={handleCopy}>
                <button className="copy-button">
                    <FiCopy size="16" />
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </CopyToClipboard>
        </div>
    );
};

export default PaymentButton;

