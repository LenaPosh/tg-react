import styled from "styled-components";
import {NavLink} from "react-router-dom";
import LogoTB from "../../img/Free_Sample_By_Wix.jpg"
import './style.css'

// import {AiOutlineEuroCircle} from 'react-icons/ai';
// import { Dropdown } from 'primereact/dropdown';
// import {useRef, useState} from "react";
// import {
//     BsBoxArrowRight,
//     BsFillBellFill, BsFillGearFill,
//     BsFillPersonFill,
//     BsGeoAltFill,
//     BsGiftFill,
//     BsPersonCircle
// } from "react-icons/bs";
// import {useClickOutside} from "primereact/hooks";


const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 25px 0;
  background-color: #2c2c2c;
  color: #D67E35;
  height: 50px;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  `


export const MenuTop = () => {
    // const [isOpen, setOpen] = useState(false);
    // const menuRef = useRef(null);
    // useClickOutside(menuRef, () => {
    //     if (isOpen) setTimeout(() => setOpen(false), 50);
    // });
    // const [selectedCurrency, setSelectedCurrency] = useState(null);
    // const currency = [
    //     { name: '0.00000', code: 'pi-bitcoin' },
    //     { name: '0.00000', code: 'pi-bitcoin' },
    //     { name: '0.00000', code: 'pi-bitcoin' },
    //     { name: '0.00000', code: 'pi-bitcoin' },
    //     { name: '0.00000', code: 'pi-bitcoin' },
    // ];
    //
    // const selectedCurrencyTemplate = (option, props) => {
    //     if (option) {
    //         return (
    //             <div className="flex align-items-center">
    //                 <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} />
    //                 <div>{option.name}</div>
    //             </div>
    //         );
    //     }
    //
    //     return <span>{props.placeholder}</span>;
    // };
    //
    // const currencyOptionTemplate = (option) => {
    //     return (
    //         <div className="flex align-items-center">
    //             <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} />
    //             <div>{option.name}</div>
    //         </div>
    //     );
    // };
    //
    // const panelFooterTemplate = () => {
    //     return (
    //         <div className="py-2 px-3">
    //             {selectedCurrency ? (
    //                 <span>
    //                     <b>{selectedCurrency.name}</b> selected.
    //                 </span>
    //             ) : (
    //                 'Currency not selected.'
    //             )}
    //         </div>
    //     );
    // };

    return (
        <StyledNav>

            <NavLink to="/">
                <img className='logo-text' alt='' src={LogoTB} />
            </NavLink>



        {/*    <header className="header-dropdown">*/}
        {/*        <button className="menu-button" onClick={() => setOpen(!isOpen)}>*/}
        {/*            <BsPersonCircle />*/}
        {/*        </button>*/}
        {/*        <nav className={`menu-dropdown ${isOpen ? "active" : ""}`} ref={menuRef}>*/}
        {/*            <ul className="menu__list">*/}
        {/*                <li className="menu__item">*/}
        {/*                    <BsFillPersonFill className="icon" />*/}
        {/*                    <span>Profile</span>*/}
        {/*                </li>*/}
        {/*                <li className="menu__item">*/}
        {/*                    <BsGiftFill className="icon" />*/}
        {/*                    <span>Bonus</span>*/}
        {/*                </li>*/}
        {/*                <li className="menu__item">*/}
        {/*                    <BsFillBellFill className="icon" />*/}
        {/*                    <span>Notify</span>*/}
        {/*                </li>*/}
        {/*                <li className="menu__item">*/}
        {/*                    <BsGeoAltFill className="icon" />*/}
        {/*                    <span>Location</span>*/}
        {/*                </li>*/}
        {/*                <li className="menu__item">*/}
        {/*                    <BsFillGearFill className="icon" />*/}
        {/*                    <span>Settings</span>*/}
        {/*                </li>*/}
        {/*                <li className="menu__item">*/}
        {/*                    <BsBoxArrowRight className="icon" />*/}
        {/*                    <span>Exit</span>*/}
        {/*                </li>*/}
        {/*            </ul>*/}
        {/*        </nav>*/}
        {/*    </header>*/}
        {/*)*/}


        </StyledNav>


    )
}

