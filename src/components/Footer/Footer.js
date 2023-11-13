import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import './style.css'
import {AiOutlineMenu, AiOutlineHome, AiOutlineRise, AiOutlineWallet} from 'react-icons/ai';

export const Screen = styled.div`
    min-height: 100vh;
`

const FooterStyle = styled.footer`
  padding: 25px 0;
  color: #fff;
  background-color: #2c2c2c;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;

`
export const AppFooter = () => {

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

            </FooterStyle>
        </>


    )
}