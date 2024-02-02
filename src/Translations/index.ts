import i18n, {Namespace} from 'i18next';
import {initReactI18next} from 'react-i18next';
import {en} from './resources';

export const resources = {
  en: {
    translation: en,
  },
} as const;

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en',
});

export type TranslationKey = Namespace<'translation'>;

export default i18n;
