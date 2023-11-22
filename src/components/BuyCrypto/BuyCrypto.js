import React, { useState, useEffect } from 'react';
import "./style.css";

export const AppBuyCrypto = () => {
    const [selectedCrypto, setSelectedCrypto] = useState('');

    const handleCryptoButtonClick = (crypto) => {
        setSelectedCrypto(`Buy ${crypto}`);
    };

    useEffect(() => {

        handleCryptoButtonClick('BTC');
    }, []);

    return (
        <div className="header-wallet-buy">
            <h3>BUY CRYPTO</h3>
            <p className="first-paragraph">Don't have crypto? We've got you covered!</p>
            <p className="second-paragraph">Just select the crypto of your liking and <br />
                replenish your TG.Binary Options account using a <br />
                credit card or local payment methods in mere <br />
                minutes!</p>

            <div className="crypto-buttons-row">
                <button className={`crypto-button ${selectedCrypto === 'Buy BTC' ? 'active' : ''}`} onClick={() => handleCryptoButtonClick('BTC')}>BTC</button>
                <button className={`crypto-button ${selectedCrypto === 'Buy ETH' ? 'active' : ''}`} onClick={() => handleCryptoButtonClick('ETH')}>ETH</button>
                <button className={`crypto-button ${selectedCrypto === 'Buy LTC' ? 'active' : ''}`} onClick={() => handleCryptoButtonClick('LTC')}>LTC</button>
            </div>

            <div className="crypto-buttons-row">
                <button className={`crypto-button ${selectedCrypto === 'Buy DOGE' ? 'active' : ''}`} onClick={() => handleCryptoButtonClick('DOGE')}>DOGE</button>
                <button className={`crypto-button ${selectedCrypto === 'Buy TRX' ? 'active' : ''}`} onClick={() => handleCryptoButtonClick('TRX')}>TRX</button>
                <button className={`crypto-button ${selectedCrypto === 'Buy SOL' ? 'active' : ''}`} onClick={() => handleCryptoButtonClick('SOL')}>SOL</button>
            </div>

            <button className="big-button">{selectedCrypto}</button>
        </div>
    );
};




