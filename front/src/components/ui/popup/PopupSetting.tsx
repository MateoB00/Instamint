import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';
import '../../../scss/components/ui/popup/PopupSetting.scss';

interface PopupSettingProps {
  onClose: () => void;
}

const PopupSetting: React.FC<PopupSettingProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log('Current language before change:', i18n.language);
    await i18n.changeLanguage(language);
    // eslint-disable-next-line no-console
    console.log('New language after change:', i18n.language);
    onClose();
  };

  return (
    <div className="popup-setting-overlay" onClick={onClose}>
      <div
        className="popup-setting-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{t('popup.setting.title')}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <strong>{t('popup.setting.language')}</strong>
            <select value={language} onChange={handleLanguageChange}>
              <option value="en">{t('english')}</option>
              <option value="fr">{t('french')}</option>
              <option value="es">{t('spanish')}</option>
            </select>
          </div>

          <button type="submit">{t('popup.setting.saveChanges')}</button>
        </form>
      </div>
    </div>
  );
};

export default PopupSetting;
