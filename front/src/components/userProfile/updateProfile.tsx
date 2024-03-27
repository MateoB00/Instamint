import React, { useState } from 'react';
import '../../scss/components/userProfile/updateProfile/updateProfile.scss';
import '../../scss/components/userProfile/updateProfile/updateProfileResponsive.scss';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

export default function UpdateProfile() {
  const { t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await i18n.changeLanguage(language);
    // OnClose();
  };

  return (
    <>
      <div className="updateProfile">
        <div className="personalInformations">
          <h1>{t('setting.personalInformations')}</h1>
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
        <div className="confidentialInformations">
          <h2>{t('setting.confidentialInformations')}</h2>
          <form></form>
        </div>
      </div>
    </>
  );
}
