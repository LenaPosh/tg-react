import { useState } from "react";
import { FaBitcoin } from "react-icons/fa";
import { SiEthereum, SiLitecoin, SiTether, SiWalletconnect } from "react-icons/si";

export const DropdownWithdraw = ({ onTokenChange }) => {
    const [selectedOption, setSelectedOption] = useState({ label: '0.000000000000', value: 'BTC', minAmount: '0.0002', icon: <FaBitcoin size="30" color="orange" /> });
    const [isOpen, setIsOpen] = useState(false);

    const options = [
        { label: '0.000000000000', value: 'BTC', minAmount: '0.0002', icon: <FaBitcoin size="30" color="orange" /> },
        { label: '0.000000000000', value: 'ETH', minAmount: '0.01', icon: <SiEthereum size="30" color="blueviolet" /> },
        { label: '0.000000000000', value: 'LTC', minAmount: '0.01', icon: <SiLitecoin size="30" color="lightgrey" /> }

    ];

    const toggleDropdownWithdraw = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onTokenChange(option.value, option.label, option.minAmount);
    };

    return (
        <div className={`dropdown-wallet ${isOpen ? 'isOpen' : ''}`}>
            <button className="dropdown-toggle-wallet" onClick={toggleDropdownWithdraw}>
                <div className="option-info">
                    <span className="option-icon">{selectedOption.icon}</span>
                    <span className="option-label">{selectedOption.label}</span>
                </div>
                <div className="arrow-icon">&#9660;</div>
            </button>

            {isOpen && (
                <ul className="dropdown-menu-wallet">
                    {options.map((option, index) => (
                        <li key={index} onClick={() => handleOptionClick(option)} className="dropdown-option">
                            <span className="option-icon">{option.icon}</span>
                            <span className="option-label">{option.label}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
