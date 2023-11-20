import React from 'react';
import './style.css';

const ButtonWithdraw = ({ onClick, isButtonActive }) => {
    return (
        <button className='button-withdraw' onClick={isButtonActive ? onClick : undefined} disabled={!isButtonActive}>
            Withdraw
        </button>
    );
};

export default ButtonWithdraw;
