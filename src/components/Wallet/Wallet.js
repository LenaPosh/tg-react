import React from 'react';
import './style.css';
import { SiWalletconnect } from 'react-icons/si';
import Tabs from './Tab';
import { DropdownWallet } from './Dropdown';
import CopyableAddress from './PaymentButton';

export const AppWallet = () => {
    const paymentAddress = 'Your payment address is here';

    const tabs = [
        {
            label: 'Deposit',
            content: (
                <div className="tab-content">
                    Select the token to deposit (Min 0.0001BTC)
                    <DropdownWallet />
                    <CopyableAddress address={paymentAddress} />
                </div>
            ),
        },
        {
            label: 'Withdraw',
            content: <div>Content for Tab 2</div>,
        },
        {
            label: 'Buy crypto',
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