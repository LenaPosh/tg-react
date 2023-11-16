import {useState} from "react";
import {FaBitcoin} from "react-icons/fa";
import {SiEthereum, SiLitecoin, SiTether} from "react-icons/si";


export const DropdownWallet = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const options = [
        { label: '0,00000', icon: <FaBitcoin size="30" color="orange" /> },
        { label: '0,00000', icon: <SiEthereum size="30" color="blueviolet" /> },
        { label: '0,00000', icon: <SiLitecoin size="30" color="lightgrey"/> },
    ];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    return (
        <>
            <div className={`dropdown-wallet ${isOpen ? 'isOpen' : ''}`}>

                <button className="dropdown-toggle-wallet" onClick={toggleDropdown}>
                    {selectedOption ? (
                        <>
                            <span className="option-icon">{selectedOption.icon}</span>
                            {selectedOption.label}
                        </>
                    ) : (
                        <>
                            <span className="option-icon-wallet"><SiTether size="30" color="lightseagreen" /></span>
                            0,00000
                        </>
                    )}
                </button>

                {isOpen && (
                    <ul className="dropdown-menu-wallet">
                        {options.map((option, index) => (
                            <li key={index} onClick={() => handleOptionClick(option)} className="dropdown-option">
                                <span className="option-icon-wallet">{option.icon}</span>
                                <span className="option-label-wallet">{option.label}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>


        </>


    )
}
