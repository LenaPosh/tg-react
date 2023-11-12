
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import Logotext from "./Tgbinaryoptions-transformed.png"
import './style.css'
import { MegaMenu } from 'primereact/megamenu';
import {AiOutlineEuroCircle} from 'react-icons/ai';
// import SiBitcoinsv from 'react-icons/si';


const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  background-color: rgba(0, 0, 0, 0.82);
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
                [
                    {
                        icon: 'pi-wallet',
                        label: '0.00000',
                        items: [{ label: '0.00000' }, { label: '0.00000' }]
                    },
                    {
                        label: '0.00000',
                        items: [{ label: '0.00000' }, { label: '0.00000' }]
                    }
                ]
            ]
        }
    ]
    return (
        <StyledNav>

            <NavLink to="/">
                <img className='logo-text' alt='' src={Logotext} />
            </NavLink>
                <div className="card">
                    <AiOutlineEuroCircle color="orange" size='25'/>
                    <MegaMenu model={items} breakpoint="960px" />
                </div>

        </StyledNav>



    )
}