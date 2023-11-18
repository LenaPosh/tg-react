import {useState} from "react";
import {FaBitcoin} from "react-icons/fa";
import {SiEthereum, SiLitecoin, SiTether} from "react-icons/si";
import { SiWalletconnect } from 'react-icons/si';


export const DropdownWithdraw = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const options = [
        { label: '0.000000000000', icon: <FaBitcoin size="30" color="orange" /> },
        { label: '0.000000000000', icon: <SiEthereum size="30" color="blueviolet" /> },
        { label: '0.000000000000', icon: <SiLitecoin size="30" color="lightgrey"/> },
        { label: '0.000000000000', icon: <SiWalletconnect size="30" color="blue" />}
    ];

    const toggleDropdownWithdraw = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    return (
        <>
            <div className={`dropdown-wallet ${isOpen ? 'isOpen' : ''}`}>
                <button className="dropdown-toggle-wallet" onClick={toggleDropdownWithdraw}>
                    <div className="option-info">
                        {selectedOption ? (
                            <>
                                <span className="option-icon">{selectedOption.icon}</span>
                                <span className="option-label">{selectedOption.label}</span>
                            </>
                        ) : (
                            <>
                                <span className="option-icon"><SiTether size="30" color="lightseagreen" /></span>
                                <span className="option-label">0.000000000000</span>
                            </>
                        )}
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
        </>
    )
}