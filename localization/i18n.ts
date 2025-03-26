import i18next from 'i18next';
import en from 'localization/en.json';
import fr from 'localization/fr.json';
import { initReactI18next } from 'react-i18next';

export const languages = ['en', 'fr'];

const resources = {
	en,
	fr,
};

i18next.use(initReactI18next).init({
	resources,
	lng: languages[0], // default language to use.
	// if you're using a language detector, do not define the lng option
	interpolation: {
		escapeValue: false,
	},
});
export default i18next;
