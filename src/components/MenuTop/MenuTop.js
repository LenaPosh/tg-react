import styled from "styled-components";
import {NavLink} from "react-router-dom";
import LogoTB from "../../img/Free_Sample_By_Wix.jpg"
import './style.css'
import {useState} from "react";
import { SiTether } from "react-icons/si";
import { SiEthereum } from "react-icons/si";
import { SiLitecoin } from "react-icons/si";
import { FaBitcoin } from "react-icons/fa";





const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 25px 0;
  background-color: #2c2c2c;
  color: #fff;
  height: 50px;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  `

export const MenuTop = () => {
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

    const tg = window.Telegram.WebApp;

    return (
        <StyledNav>

            <NavLink to="/">
                <img className='logo-text' alt='' src={LogoTB} />
            </NavLink>

            <div className={`dropdown ${isOpen ? 'isOpen' : ''}`}>

                <button className="dropdown-toggle" onClick={toggleDropdown}>
                    {selectedOption ? (
                        <>
                            <span className="option-icon">{selectedOption.icon}</span>
                            {selectedOption.label}
                        </>
                    ) : (
                        <>
                            <span className="option-icon"><SiTether size="30" color="lightseagreen" /></span>
                            0,00000
                        </>
                    )}
                </button>

                {isOpen && (
                    <ul className="dropdown-menu">
                        {options.map((option, index) => (
                            <li key={index} onClick={() => handleOptionClick(option)} className="dropdown-option">
                                <span className="option-icon">{option.icon}</span>
                                <span className="option-label">{option.label}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <span className={'username'}>
                {tg.initDataUnsafe?.user?.username}
            </span>


        </StyledNav>


    )
}

