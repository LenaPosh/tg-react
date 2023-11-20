import React, { useState, useEffect } from "react";
import { FaBitcoin } from "react-icons/fa";
import { SiEthereum, SiLitecoin, SiTether, SiWalletconnect } from "react-icons/si";
import './style.css';

export const DropdownDeposit = ({ onTokenChange, updateDepositText }) => {
    const defaultOption = { label: 'BTC', value: 'BTC', minAmount: '0.0002', icon: <FaBitcoin size="30" color="orange" /> };
    const [selectedOption, setSelectedOption] = useState(defaultOption);
    const [isOpen, setIsOpen] = useState(false);

    const options = [
        { label: 'BTC', value: 'BTC', minAmount: '0.0002', icon: <FaBitcoin size="30" color="orange" /> },
        { label: 'ETH', value: 'ETH', minAmount: '0.01', icon: <SiEthereum size="30" color="blueviolet" /> },
        { label: 'LTC', value: 'LTC', minAmount: '0.01', icon: <SiLitecoin size="30" color="lightgrey" /> },
        { label: 'WALLETCONNECT', value: 'ETH', minAmount: '0.01', icon: <SiWalletconnect size="30" color="blue" /> }
    ];

    useEffect(() => {
        // Вызываем функцию для обновления текста в родительском компоненте
        updateDepositText(`Select the token to deposit (Min ${selectedOption.minAmount}${selectedOption.label})`);
    }, [selectedOption, updateDepositText]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onTokenChange(option.value, option.label, option.minAmount);
    };

    // Исключаем выбранный токен из списка options
    const filteredOptions = options.filter(option => option.value !== selectedOption.value);

    return (
        <div className={`dropdown-wallet ${isOpen ? 'isOpen' : ''}`}>
            <button className="dropdown-toggle-wallet" onClick={toggleDropdown}>
                <div className="option-info">
                    <span className="option-icon">{selectedOption.icon}</span>
                    <span className="option-label">{selectedOption.label}</span>
                </div>
                <div className="arrow-icon">&#9660;</div>
            </button>
            {isOpen && (
                <ul className="dropdown-menu-wallet">
                    {filteredOptions.map((option, index) => (
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
