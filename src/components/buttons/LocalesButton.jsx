import React from 'react';
import { useDispatch } from 'react-redux';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import i18n from '../../i18n/i18n';
import { setLocale } from '../../redux/types/sideBardButtons';

function LocalesButton() {
  const dispatch = useDispatch();

  const onChangeLocale = (event) => {
    const selectedLocale = event.target.value;
    dispatch(setLocale(selectedLocale));
    i18n.changeLanguage(selectedLocale);
  };

  return (
    <div>
      <select
        className="locale md:text-2xl"
        name="locales"
        onChange={onChangeLocale}
      >
        <option value="en">{getUnicodeFlagIcon('GB')} en</option>
        <option value="fr">{getUnicodeFlagIcon('FR')} fr</option>
      </select>
    </div>
  );
}
export default LocalesButton;
