import './style.css'
import { SiWalletconnect } from "react-icons/si";
import Tabs from "./Tab";
import {DropdownWallet} from "./Dropdown";

export const AppWallet= () => {
    const tabs = [
        {
            label: 'Deposit',
            content: <div className='tab-content'>Select the token to deposit (Min 0.0001BTC)</div>,
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
                <div className='wallet-icon'>
                    <SiWalletconnect size='20'/> WalletConnect
                </div>
            </button>

            <div>
                <Tabs tabs={tabs} />
            </div>
            <DropdownWallet/>
        </div>
    )
}