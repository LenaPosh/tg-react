import styled from "styled-components";
import {NavLink} from "react-router-dom";
import LogoTB from "../../img/Free_Sample_By_Wix.jpg"
import './style.css'

// import {AiOutlineEuroCircle} from 'react-icons/ai';
import { Dropdown } from 'primereact/dropdown';
import {useState} from "react";


const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 25px 0;
  background-color: #2c2c2c;
  color: #D67E35;
  height: 50px;
`


export const MenuTop = () => {
    const [selectedCurrency, setSelectedCurrency] = useState(null);
    const currency = [
        { name: '0.00000', code: 'pi-bitcoin' },
        { name: '0.00000', code: 'pi-bitcoin' },
        { name: '0.00000', code: 'pi-bitcoin' },
        { name: '0.00000', code: 'pi-bitcoin' },
        { name: '0.00000', code: 'pi-bitcoin' },
    ];

    const selectedCurrencyTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} />
                    <div>{option.name}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const currencyOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} />
                <div>{option.name}</div>
            </div>
        );
    };

    const panelFooterTemplate = () => {
        return (
            <div className="py-2 px-3">
                {selectedCurrency ? (
                    <span>
                        <b>{selectedCurrency.name}</b> selected.
                    </span>
                ) : (
                    'Currency not selected.'
                )}
            </div>
        );
    };

    return (
        <StyledNav>

            <NavLink to="/">
                <img className='logo-text' alt='' src={LogoTB} />
            </NavLink>
            {/*<div className="app-header-card">*/}
            {/*    <AiOutlineEuroCircle color="orange" size='25'/>*/}
            {/*    <Menubar model={items} className='app-header-menu' breakpoint="960px" />*/}
            {/*</div>*/}
            <div className="card flex justify-content-center">
                <Dropdown  value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.value)} options={currency} optionLabel="name" placeholder="Select a Currency"
                          valueTemplate={selectedCurrencyTemplate} itemTemplate={currencyOptionTemplate} className="w-full md:w-14rem" panelFooterTemplate={panelFooterTemplate} />
            </div>

        </StyledNav>


    )
}

