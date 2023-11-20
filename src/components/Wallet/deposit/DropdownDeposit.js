import React, { useState, useEffect } from "react";
import { FaBitcoin } from "react-icons/fa";
import { SiEthereum, SiLitecoin, SiTether, SiWalletconnect } from "react-icons/si";
import './style.css';

export const DropdownDeposit = ({ onTokenChange, updateDepositText }) => {
    const options = [
        { label: 'BTC', value: 'BTC', minAmount: '0.0002', icon: <FaBitcoin size="30" color="orange" /> },
        { label: 'ETH', value: 'ETH', minAmount: '0.01', icon: <SiEthereum size="30" color="blueviolet" /> },
        { label: 'LTC', value: 'LTC', minAmount: '0.01', icon: <SiLitecoin size="30" color="lightgrey" /> },
        { label: 'USDT', value: 'USDT', minAmount: '0.01', icon: <SiTether size="30" color="lightseagreen" /> },
        { label: 'WALLETCONNECT', value: 'ETH', minAmount: '0.01', icon: <SiWalletconnect size="30" color="blue" /> }
    ];

    const usdtOptions = [
        { network: 'TRC20', minAmount: '2.0' },
        { network: 'ERC20', minAmount: '5.0' }
    ];

    const usdtDefaultOption = usdtOptions[0];

    const [selectedOption, setSelectedOption] = useState(options[3]); // Начальное значение USDT
    const [isOpen, setIsOpen] = useState(false);
    const [isUSDTSelected, setIsUSDTSelected] = useState(true);
    const [selectedUSDTNetwork, setSelectedUSDTNetwork] = useState(usdtDefaultOption.network);

    useEffect(() => {
        const selectedMinAmount = isUSDTSelected
            ? usdtOptions.find(option => option.network === selectedUSDTNetwork)?.minAmount
            : selectedOption.minAmount;

        updateDepositText(`Select the token to deposit (Min ${selectedMinAmount} ${isUSDTSelected ? 'USDT' : selectedOption.label})`);
    }, [selectedOption, selectedUSDTNetwork, isUSDTSelected, updateDepositText]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onTokenChange(option.value, option.label, option.minAmount);

        if (option.value === 'USDT') {
            setIsUSDTSelected(true);
            setSelectedUSDTNetwork(usdtDefaultOption.network);
        } else {
            setIsUSDTSelected(false);
        }
    };

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
                    {options.map((option, index) => (
                        <li key={index} onClick={() => handleOptionClick(option)} className={`dropdown-option ${option.value === selectedOption.value ? 'active' : ''}`}>
                            <span className="option-icon">{option.icon}</span>
                            <span className="option-label">{option.label}</span>
                        </li>
                    ))}
                </ul>
            )}

            {isUSDTSelected && (
                <div className="additional-options">
                    <button onClick={() => setSelectedUSDTNetwork('TRC20')} className={selectedUSDTNetwork === 'TRC20' ? 'active' : ''}>
                        USDT-Tron
                        <br />
                        (TRC20)
                    </button>
                    <button onClick={() => setSelectedUSDTNetwork('ERC20')} className={selectedUSDTNetwork === 'ERC20' ? 'active' : ''}>
                        USDTE-Ethereum
                        <br/>
                        (ERC20)
                    </button>
                </div>
            )}
        </div>
    );
};

