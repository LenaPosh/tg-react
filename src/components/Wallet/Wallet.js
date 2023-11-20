import {DropdownDeposit} from "./deposit/DropdownDeposit";
import React, { useState, useEffect } from 'react';
import './style.css';
import { SiWalletconnect } from 'react-icons/si';
import Tabs from './tabs/Tab';
import CopyableAddress from './deposit/PaymentButton';
import QRCode from 'qrcode.react';
import { DropdownWithdraw } from "./withdraw/DropdownWithdraw";
import TextInputWithLabel from "./withdraw/InputWithdraw";
import DoubleInputWithLabel from "./withdraw/DoubleInputWithLabel";
import ButtonWithdraw from "./withdraw/ButtonWithdraw";

export const AppWallet = () => {
    const paymentAddress = '0x97d03eF9Ffe1Ac3Cb2ADa6D20C71d139245bdd7b';
    const [qrCodeValue, setQRCodeValue] = useState('');
    const [selectedToken, setSelectedToken] = useState({ value: 'BTC', label: '0.000000000000', minAmount: '0.0002' });
    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [depositLabelText, setDepositLabelText] = useState('Select the token to deposit (Min 0.0001BTC)');

    useEffect(() => {
        setQRCodeValue(paymentAddress);
    }, [paymentAddress]);

    const handleTokenChange = (value, label, minAmount) => {
        setSelectedToken({ value, label, minAmount });
    };

    const handleInputChange1 = (event) => {
        setInputValue1(event.target.value);
    };

    const handleInputChange2 = (event) => {
        setInputValue2(event.target.value);
    };

    const isButtonActive = inputValue1 !== '' && inputValue2 !== '';

    const updateDepositText = (text) => {
        setDepositLabelText(text);
    };

    const tabs = [
        {
            label: 'Deposit',
            content: (
                <div className="tab-content">
                    <div className="input-container">
                        <label className="deposit-label">{depositLabelText}</label>
                        <DropdownDeposit onTokenChange={handleTokenChange} updateDepositText={updateDepositText} />
                    </div>
                    <CopyableAddress address={paymentAddress} />
                    <div className="qr-code-container">
                        <QRCode value={qrCodeValue} className="qr-code" />
                        <p className="qr-code-text">Send only {selectedToken.value} to this deposit address. <br /> Values sent below the
                            minimum amount or to an incorrect address will be lost.</p>
                    </div>
                </div>
            )
        },


        {
            label: 'Withdraw',
            content: (
                <div className="tab-content">
                    <label className="deposit-label">Select the token to withdraw (Min {selectedToken.minAmount}{selectedToken.value})</label>
                    <div className="content-container">
                        <DropdownWithdraw onTokenChange={handleTokenChange} />
                        <TextInputWithLabel value={inputValue1} onChange={handleInputChange1} label="Input 1" />
                        <DoubleInputWithLabel />
                        <ButtonWithdraw onClick={() => console.log('Button clicked')} isButtonActive={isButtonActive} />
                        <p className='text-after-button-withdraw'>Requesting a withdrawal will mean that you forget all bonus funds. </p>
                    </div>
                </div>
            )
        },

        {
            label: 'Buy Crypto',
            content: <div>Content for Tab 3</div>,
        },
    ];

    return (
        <div className="header-wallet">
            <button className="rounded-button">
                <div className="wallet-icon">
                    <SiWalletconnect size="20" /> WalletConnect
                </div>
            </button>

            <div>
                <Tabs tabs={tabs} />
            </div>
        </div>
    );
};
