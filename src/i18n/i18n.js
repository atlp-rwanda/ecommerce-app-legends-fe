/* eslint-disable quotes */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const translationEn = {
  search: 'search',
  dashboard: 'Dashboard',
  products: 'Products',
  orders: 'Orders',
  customers: 'Customers',
  users: 'Users',
  logout: 'Logout',
  home: 'Home',
  settings: 'Settings',
  notifications: 'Notifications',
  search_text: 'I am here to search for...',
  copylights: 'Copyright',
  browse_our_premium_product: 'BROWSE OUR PREMIUM PRODUCT',
  legend_ecommerce_welcome_intro:
    'Quality is never an accident; it is always the result of high intention, sincere effort, intelligent direction and skillful execution; it represents the wise choice of many alternatives.',
  top_products: 'Top products',
  latest_products: 'Latest products',
  recommended: 'Recommandé',
  see_all: 'See all',
  our_top_vendors: 'Our top vendors',
  footer_long_message:
    'Overall, Legends multi-vendor e-commerce platforms have become a popular business model in the e-commerce industry, offering a convenient and efficient way for vendors and buyers to engage in online commerce',
  shop: 'Shop',
  categories: 'Categories',
  about_us: 'About us',
  contact_us: 'Contact us',
  useful_links: 'Useful links',
  login: 'Login',
  sign_up: 'Sign up',
  contacts: 'Contacts',
  cart: 'Cart',
  footer_copyright: ' Copyright 2023 Legends Ecommerce . All rights reserved.',
  profile: 'Profile',
  browse: 'Browse Now',
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
  browse_our_premium_product: 'PARCOURIR NOTRE PRODUIT PREMIUM',
  legend_ecommerce_welcome_intro:
    "La qualité n 'est jamais un accident c 'est toujours le résultat de hautes intention, effort sincère, direction intelligente et habile exécution; il représente le choix judicieux de nombreuses alternatives.",
  top_products: 'Meilleurs produits',
  latest_products: 'Derniers produits',
  recommended: 'recommandé',
  see_all: 'Voir tout',
  our_top_vendors: 'Nos meilleurs fournisseurs',
  footer_long_message:
    "Dans l'ensemble, les plates-formes de commerce électronique multi-fournisseurs Legends sont devenues un modèle commercial populaire dans l'industrie du commerce électronique, offrant un moyen pratique et efficace pour les fournisseurs et les acheteurs de s'engager dans le commerce en ligne.",
  shop: 'Boutique',
  categories: 'Catégories',
  about_us: 'À propos',
  contact_us: 'Contact us',
  useful_links: 'Liens utiles',
  login: 'Connexion',
  sign_up: "S'inscrire",
  contacts: 'Contacts',
  cart: 'Chariot',
  footer_copyright:
    'Copyright 2023 Legends Ecommerce. Tous les droits sont réservés.',
  profile: 'Profil',
  browse: 'parcourir',
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
