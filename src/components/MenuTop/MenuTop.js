import styled from "styled-components";
import {NavLink} from "react-router-dom";
import LogoTB from "../../img/Free_Sample_By_Wix.jpg"
import './style.css'
import {Menubar} from 'primereact/menubar';
import {AiOutlineEuroCircle} from 'react-icons/ai';


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
// const MegamenuStyle = styled.div`
//   margin: 20px auto 0;
//   display: flex;
//   justify-content: center;
//   color: #96F1F4
// `


export const MenuTop = () => {
    const items = [
        {
            label: '0.00000',
            items: [
                {
                    icon: 'pi-wallet pi pi-fw',
                    label: '0.00000',
                    items: [{label: '0.00000'}, {label: '0.00000'}]
                },
                {
                    label: '0.00000',
                    items: [{label: '0.00000'}, {label: '0.00000'}]
                }
            ]
        }
    ]
    return (
        <StyledNav>

            <NavLink to="/">
                <img className='logo-text' alt='' src={LogoTB} />
            </NavLink>
            <div className="app-header-card">
                <AiOutlineEuroCircle color="orange" size='25'/>
                <Menubar model={items} className='app-header-menu' breakpoint="960px" />
            </div>

        </StyledNav>


    )
}

