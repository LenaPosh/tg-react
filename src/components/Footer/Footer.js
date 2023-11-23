import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Импортируем useTranslation
import './style.css';
import { FaWallet } from 'react-icons/fa';
import { TiChartBarOutline } from 'react-icons/ti';
import { ImHome } from 'react-icons/im';
import { RiMenu2Line } from 'react-icons/ri';

export const Screen = styled.div`
  min-height: 100vh;
`;

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
`;

export const AppFooter = () => {
    const { t } = useTranslation(); // Используем хук useTranslation для перевода

    return (
        <>
            <FooterStyle className="footer">
                <div className="menu-navigation">
                    <div className="menu-items">
                        <NavLink to="/menu" className="menu-item">
                            <div className="menu-icon">
                                <RiMenu2Line />
                            </div>
                            <div className="menu-text">{t('menu')}</div>
                        </NavLink>

                        <NavLink to="/home" className="menu-item">
                            <div className="menu-icon">
                                <ImHome />
                            </div>
                            <div className="menu-text" style={{ whiteSpace: 'nowrap' }}>{t('home')}</div>
                        </NavLink>

                        <NavLink to="/trade" className="menu-item">
                            <div className="menu-icon">
                                <TiChartBarOutline />
                            </div>
                            <div className="menu-text">{t('trade')}</div>
                        </NavLink>

                        <NavLink to="/wallet" className="menu-item">
                            <div className="menu-icon">
                                <FaWallet />
                            </div>
                            <div className="menu-text">{t('wallet')}</div>
                        </NavLink>
                    </div>
                </div>
            </FooterStyle>
        </>
    );
};
