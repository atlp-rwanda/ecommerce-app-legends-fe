import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const translationEn = {
  search: 'search',
  dashboard: 'Dashboard',
  products: 'Products',
  orders: 'Orders',
  customers: 'Customers',
  users: 'Users',
  logout: 'Log out',
  home: 'Home',
  settings: 'Settings',
  notifications: 'Notifications',
  search_text: 'I am here to search for...',
  copylights: 'Copyright',
};
const translationFr = {
  search: 'rechercher',
  dashboard: 'Panneau',
  products: 'Produits',
  orders: 'Commande',
  customers: 'Clients',
  users: 'utilisateurs',
  logout: 'Déconnecter',
  home: 'Maison',
  notifications: 'Avis',
  search_text: 'Je suis ici pour rechercher',
  settings: 'Paramètres',
  copylights: 'droits d auteur',
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEn },
    fr: { translation: translationFr },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
