import { useTranslation } from 'react-i18next';
import './style.css';
export const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (language) => {
        console.log(`Changing language to ${language}`);
        i18n.changeLanguage(language);
    };

    return (
        <div className="language-selector">
            <button onClick={() => changeLanguage('en')}>EN</button>
            <button onClick={() => changeLanguage('ru')}>RU</button>
          </div>
    );
};

