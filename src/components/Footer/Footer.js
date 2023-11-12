import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import './style.css'
import {AiOutlineMenu, AiOutlineHome, AiOutlineRise, AiOutlineWallet} from 'react-icons/ai';

const FooterStyle = styled.footer`
  padding: 35px 0;

  color: #fff;

  background-color: rgba(0, 0, 0, 0.82);
  text-align: center;
`
export const AppFooter = () => {
    // const items = [
    //     {label: 'MENU', icon: 'pi-align-justify'},
    //     {label: 'HOME', icon: 'pi pi-fw pi-calendar'},
    //     {label: 'TRADE', icon: 'pi pi-fw pi-pencil'},
    //     {label: 'WALLET', icon: 'pi pi-fw pi-file'}
    // ];
    return (

        <>
            <FooterStyle className='footer'>
                <div className='menu-navigation'>
                    <div className='menu-items'>

                        <NavLink to="/menu" className='menu'>
                            <div className='menu-icon'>
                                <AiOutlineMenu />
                            </div>
                            <div className='menu-text'>MENU</div>
                        </NavLink>

                        <NavLink to="/home" className='home'>
                            <div className='menu-icon'>
                                <AiOutlineHome/>
                            </div>
                            <div className='menu-text'>HOME</div>

                        </NavLink>
                        <NavLink to="/trade" className='trade'>
                            <div className='menu-icon'>
                                <AiOutlineRise/>
                            </div>
                            <div className='menu-text'>TRADE</div>
                        </NavLink>

                        <NavLink to="/wallet" className='wallet'>
                            <div className='menu-icon'>
                                <AiOutlineWallet/>
                            </div>
                            <div className='menu-text'>WALLET</div>

                        </NavLink>

                    </div>
                </div>

                {/*<div className="menu-items">*/}
                {/*    <div className="menu-text">*/}
                {/*        <div className="menu-icon">*/}
                {/*            <TabMenu model={items}/>*/}
                {/*        </div>*/}

                {/*    </div>*/}
                {/*</div>*/}

                {/*<a href='#menu'>MENU</a>*/}
                {/*<a href='#home'>HOME</a>*/}
                {/*<a href='#trade'>TRADE</a>*/}
                {/*<a href='#wallet'>WALLET</a>*/}
            </FooterStyle>
        </>


    )
}