import React from 'react';

const ButtonWithdraw = ({ onClick, isButtonActive }) => {
    return (
        <button className='button-withdraw' onClick={isButtonActive ? onClick : undefined} disabled={!isButtonActive}>
            Withdraw
        </button>
    );
};

export default ButtonWithdraw;
