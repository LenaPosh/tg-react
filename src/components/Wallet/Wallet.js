import './style.css'
import { SiWalletconnect } from "react-icons/si";

export const AppWallet= () => {
    return (
        <div className="header-wallet">
            <button className="rounded-button">
                <div className='wallet-icon'>
                    <SiWalletconnect size='20'/> WalletConnect
                </div>

            </button>
        </div>
    )
}