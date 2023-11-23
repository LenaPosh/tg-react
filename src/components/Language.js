import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';


export const LanguageButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: 0;
  margin-right: 800px;
`;

export const LanguageButton = styled.button`
  margin-right: 10px;
  background-color: slategrey;
  color: white;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  padding: 10px;
  font-size: 16px;
`;

export const Language = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    return (
        <LanguageButtonsContainer>
            <LanguageButton onClick={() => changeLanguage('en')}>EN</LanguageButton>
            <LanguageButton onClick={() => changeLanguage('ru')}>RU</LanguageButton>
        </LanguageButtonsContainer>
    );
};
