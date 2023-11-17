import React, { useState, useEffect } from 'react';
import './style.css';
import { SiWalletconnect } from 'react-icons/si';
import Tabs from './Tab';
import { DropdownWallet } from './DropdownDeposit';
import CopyableAddress from './PaymentButton';
import QRCode from 'qrcode.react';

export const AppWallet = () => {
    const paymentAddress = '0x97d03eF9Ffe1Ac3Cb2ADa6D20C71d139245bdd7b';
    const [qrCodeValue, setQRCodeValue] = useState('');

    useEffect(() => {
        setQRCodeValue(paymentAddress);
    }, [paymentAddress]);

    const tabs = [
        {
            label: 'Deposit',
            content: (
                <div className="tab-content">
                    Select the token to deposit (Min 0.0001BTC)
                    <DropdownWallet />
                    <CopyableAddress address={paymentAddress} />
                    <div className="qr-code-container">
                        <QRCode value={qrCodeValue} className="qr-code" />
                        <p className="qr-code-text">Send only BTC to this deposit address. <br/> Values sent bellow the minimum amount or to an incorrect address will be lost.</p>
                    </div>
                </div>
            ),
        },
        {
            label: 'Withdraw',
            content: <div>Content for Tab 2</div>,
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
