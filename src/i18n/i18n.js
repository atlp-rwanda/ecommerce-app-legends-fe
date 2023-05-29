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
  recommended: 'recommended',
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
  emailLabel: 'Email',
  passwordLabel: 'Password',
  loginButton: 'Login',
  emailPlaceholder: 'Enter your email address',
  passwordPlaceholder: 'Enter password here',
  loginText: 'Login to your account',
  googleLoginButton: 'Google Login',
  dontHaveccount: `Don't have an account?`,
  signup: 'Sign up',
  loading: 'Loading...',
  firstNamePlaceholder: 'Enter first name',
  lastNamePlaceholder: 'Enter last Name',
  firstName: 'First Name',
  lastName: 'Last Name',
  phonePlaceholder: 'Enter phone number',
  phoneLabel: 'Telephone',
  dobLabel: 'Date of Birth',
  addressLabel: 'Address',
  save: 'Save',
  profileTitle: 'User Information',
  profileSubTitle: 'You can change your profile here',
  my_cart: 'MY CART',
  name: 'Name',
  quantity: 'Quantity',
  total_price: 'Total Price',
  option: 'Option',
  remove: 'Remove',
  total_amount: 'Total Amount',
  checkout: 'Checkout',
  continue_shopping: 'continue shopping',
  clear_cart: 'clear cart',
  start_shopping: 'start shopping',
  your_cart_is_empty: 'YOUR CART IS EMPTY',
  status: 'Status',
  add_to_cart: 'add to cart',
  view_variatios: 'Variations',
  your_wishlist_is_empty: 'YOUR WISHLIST IS EMPTY!',
  my_wishlist: 'MY WISHLIST',
  Firstname: 'First name',
  Lastname: 'Last name',
  emailaddress: 'email address',
  dateofbirth: 'date of birth',
  gender: 'gender',
  Acc_status: 'status',
  role: 'role',
  vendor: 'vendor',
  admin: 'admin',
  Buyer: 'Buyer',
  All: 'All',
  filterUser: 'Filter users by role',
  yes_clear_it: 'YES CLEAR IT',
  cart_cleared: 'Cart cleared successfully',
  are_you_sure_you_clear_cart: 'Are you sure you want to clear this cart ?',
  my_wishlists: 'MY WISHLIST',
  are_you_sure: 'Are you sure ?',
  you_will_not_be_able_to_revert: "You won't be able to revert this!",
  yes_delete_it: 'Yes, delete it !',
  model: 'Model',
  options: 'Options',
  pname: 'P. name',
  attr_name: 'Attribute name',
  cancel: 'Cancel',
  edit_product: 'Edit Product',
  no_data_found: 'No data found ...',
  product: 'Product',
  expiration_date: 'Expiration date',
  product_image: 'Product image',
  product_attribute: 'Product Attributes',
  price: 'Price',
  size: 'Size',
  availability: 'Availability',
  description: 'Description',
  active: 'active',
  inactive: 'inactive',
  add: 'Add',
  all_products: 'all products',
  all_ratings: 'all ratings',
  all_customers: 'all customers',
  no_related_search_product_found: 'No related product found',
  search_product: 'Search product',
  color: 'Color',
  top_reviewrs: 'Top reviews',
  shopby: 'Shop by category',
  shobySeller: 'shop by sellers of your choice',
  sortBy: 'Sort by',
  many: 'many in stock',
  yes_update_it: 'Yes update it',
  update_this_order_to: 'Update this order to ',
  paid: 'Paid',
  pending: 'Pending',
  shipping: 'Shipping',
  completed: 'Completed',
  processing: 'Proccessing',
  amount: 'Amount',
  location: 'Location',
  items: 'Items',
  activate: 'Activate',
  disable: 'Disable',
  aboutUs: 'About us',
  aboutUsText:
    'At ALTP Ecommerce, we believe in providing a platform that enables anyone to sell their products easily. Whether you are an individual with unique handmade items or a business looking to expand your online presence, we have got you covered.',
  ourMission: 'Our Mission',
  ourMissionText:
    'Our mission is to provide a platform that enables anyone to sell their products easily. Whether you are an individual with unique handmade items or a business looking to expand your online presence, we have got you covered.',
  ourVision: 'Our Vision',
  ourVisionText:
    'Our vision is to be the leading ecommerce platform in the world. We want to be the go-to platform for anyone looking to sell their products online.',
  ourVisionText2:
    'Join our community of sellers today and start monetizing your products. Whether itis fashion, electronics, art, or any other category, ALTP Ecommerce is the platform for you. We are excited to have you on board!',
  contactUs: 'Contact us',
  contactUsText:
    "We're always happy to hear from you! If you have any questions or concerns, please feel free to contact us at any time.",
  contactUsText2: 'reach out to us possibly via the following',
  fullname: 'name',
  message: 'Message',
  sendMsg: 'Send message',
  techSupport: 'Technical Support',
  salesQuestion: 'Sales Question',
  press: 'Press',
  bugSupport: 'Bug Support',
  quick_links: 'Quick Links',
  footer_message: 'Legends E-commerce',
  singlePageDescription: 'description',
  singlePageModel: 'Model',
  singlePageColor: 'Color',
  singlePageInstock: 'In stock',
  singlePageSize: 'Size',
  singlePageSeller: 'Seller',
  singlePageAddToCart: 'add to Cart',
  singlePageAddToWish: 'add to WishList',
  singlePageTopReviews: 'Top Reviews',
  singlePageAddReview: 'Add Review',
  singlePageRateProduct: 'Rate Product',
  singlePageComment: 'Comment',
  singlePagePostReview: 'Post Review',

  singlePageRelated: 'Related Products',
  passwordOldPassword: 'Old Password',
  passwordNewPassword: 'New Password',
  passwordConfirmPassword: 'Confirm Password',
  passwordUpdatePassword: 'UPDATE PASSWORD',
  passwordUlT: 'Creating a Secure Password',
  passwordUlTa: 'Never use personal information.',
  passwordUlTb: 'Include a combination of letters, numbers, and characters.',
  passwordUlTc: 'Prioritize password length.',
  passwordUlTd: 'Never repeat passwords.',
  passwordUlTe: 'Avoid using real words.',
  passwordUpdate: 'Update',
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
  emailLabel: 'Email',
  passwordLabel: 'Mot de passe',
  loginButton: 'Connexion',
  emailPlaceholder: 'Entrez votre adresse e-mail',
  passwordPlaceholder: 'Entrez le mot de passe ici',
  loginText: 'Connectez-vous à votre compte',
  googleLoginButton: 'Connexion Google',
  dontHaveccount: `Vous n'avez pas de compte ?`,
  signup: `S'inscrire`,
  loading: 'Chargement...',
  firstNamePlaceholder: 'Entrez votre prénom',
  lastNamePlaceholder: 'Entrer le nom de famille',
  firstName: 'Prénom',
  lastName: 'Nom de famille',
  phonePlaceholder: 'Numéro de téléphone',
  phoneLabel: 'Téléphone',
  dobLabel: 'Date de naissance',
  addressLabel: 'Adresse',
  save: 'sauvegarder',
  profileTitle: 'Informations sur l utilisateur',
  profileSubTitle: 'Vous pouvez changer votre profil ici',
  my_cart: 'MON PANIER',
  name: 'Nom',
  quantity: 'Quantité',
  total_price: 'Prix ​​total',
  option: 'Choix',
  remove: 'Retirer',
  total_amount: 'Montant total',
  checkout: 'Vérifier',
  continue_shopping: 'continuer achats',
  clear_cart: 'vider le panier',
  start_shopping: 'commencer à magasiner',
  your_cart_is_empty: 'VOTRE PANIER EST VIDE!',
  available: 'Disponible',

  status: 'Statut',
  add_to_cart: 'Ajouter au panier',
  view_variatios: 'Variations',
  your_wishlist_is_empty: 'VOTRE LISTE DE SOUHAITS EST VIDE!',
  my_wishlist: 'MA LISTE DE SOUHAITS',

  Firstname: 'Prénom',
  Lastname: 'nom de famille',
  emailaddress: 'Adresse e-mail',
  dateofbirth: 'Date de naissance',
  gender: 'genre',
  Acc_status: 'statut',
  role: 'rôle',
  Vendor: 'vendeur',
  admin: 'administrateur',
  Buyer: 'acheteur',
  All: 'Tout',
  filterUser: 'Filtrer les utilisateurs par rôle',
  yes_clear_it: 'OUI EFFACER',
  cart_cleared: 'Panier vidé avec succès',
  are_you_sure_you_clear_cart: 'Êtes-vous sûr de vouloir vider ce panier ?',
  are_you_sure: 'Es-tu sûr ?',
  you_will_not_be_able_to_revert: 'Vous ne pourrez pas revenir en arrière !',
  yes_delete_it: 'Oui, supprimez-le !',
  model: 'Modèle',
  options: 'Choix',
  pname: 'Non du produit',
  attr_name: "Nom d'attribut",
  cancel: 'Annuler',
  edit_product: 'Modifier le produit',
  no_data_found: 'Aucune donnée disponible ...',
  product: 'Produit',
  expiration_date: "Date d'expiration",
  product_image: 'Image du produit',
  product_attribute: 'Attributs du produit',
  price: 'Prix',
  size: 'taille',
  availablity: 'disponibilité',
  description: 'Description',
  active: 'actif',
  inactive: 'inactif',
  all_products: 'Tous les produits',
  add: 'Ajouter',
  shopby: 'Magasinez par catégorie',
  shobySeller: 'Magasinez auprès des vendeurs de votre choix',
  sortBy: 'Tri par',
  many: 'Beaucoup en stock',

  all_ratings: 'Tous les évaluations',
  all_customers: 'Tous les clients',
  no_related_search_product_found: 'Aucun produit associé trouvé',
  search_product: 'produit de recherche',
  color: 'Couleur',
  top_reviewrs: 'meilleurs commentateurs',
  yes_update_it: 'oui le mettre à jour',
  update_this_order_to: 'Mettre à jour cette commande pour ',
  paid: 'Payé',
  pending: 'En attente',
  shipping: 'Expédition',
  completed: 'Complété',
  processing: 'Traitement',
  amount: 'Montant',
  location: 'Emplacement',
  items: 'éléments',
  activate: 'Activer',
  disable: 'Désactiver',
  aboutUs: 'À propos de nous',
  aboutUsText:
    "Chez ALTP Ecommerce, nous croyons en la fourniture d'une plate-forme qui permet n'importe qui de vendre ses produits facilement. Que vous soyez un particulier avec des objets uniques faits à la main ou une entreprise cherchant à développez votre présence en ligne, nous avons ce qu'il vous faut.",
  ourMission: 'Notre mission',
  ourMissionText:
    'Notre mission est de fournir une plate-forme de commerce électronique qui permet à quiconque de vendre ses produits en ligne facilement. Nous voulons que vous puissiez vendre vos produits en ligne sans avoir à vous soucier de la technologie. Nous nous occupons de la technologie afin que vous puissiez vous concentrer sur la vente de vos produits.',
  ourVision: 'Notre vision',
  ourVisionText:
    "Avec ALTP Ecommerce, vous pouvez créer votre propre boutique en ligne, gérer votre inventaire et atteignez un public plus large sans complexités de la construction d'un site Web à partir de zéro. Nous fournissons un interface conviviale, outils puissants et backend robuste infrastructure pour soutenir votre parcours entrepreneurial.",
  ourVisionText2:
    'Nous croyons que tout le monde devrait avoir la possibilité de vendre en ligne. Nous croyons que les petites entreprises et les particuliers devraient avoir la possibilité de vendre en ligne sans avoir à se soucier de la technologie. Nous croyons que les petites entreprises et les particuliers devraient avoir la possibilité de vendre en ligne sans avoir à se soucier de la technologie.',
  contactUs: 'Contactez nous',
  contactUsText:
    "Si vous avez des questions, des commentaires ou des préoccupations, n'hésitez pas à nous contacter. Nous sommes toujours heureux d'avoir de vos nouvelles.",
  contactUsText2: 'contactez-nous éventuellement via les éléments suivants',
  fullname: 'Nom',
  message: 'Message',
  sendMsg: 'Envoyer le message',
  techSupport: 'Support technique',
  salesQuestion: 'Questions de vente',
  press: 'Presse',
  bugSupport: 'Support de bogues',
  quick_links: 'Liens rapides',
  footer_message: 'Légendes E-commerce',
  singlePageDescription: 'description',
  singlePageModel: 'Modèle',
  singlePageColor: 'Couleur',
  singlePageInstock: 'En stock',
  singlePageSize: 'Taille',
  singlePageSeller: 'Vendeur',
  singlePageAddToCart: 'Ajouter au panier',
  singlePageAddToWish: 'ajouter à la liste',
  singlePageTopReviews: 'Meilleures Critiques',
  singlePageAddReview: 'Ajouter un commentaire',
  singlePageRateProduct: 'Avaluer le produit',
  singlePageComment: 'Commentaire',
  singlePagePostReview: 'Publier un avis',
  singlePageRelated: 'Produits connexes',
  passwordOldPassword: 'Ancien mot de passe',
  passwordNewPassword: 'Nouveau mot de passe',
  passwordConfirmPassword: 'Confirmez le mot de passe',
  passwordUpdatePassword: 'METTRE À JOUR LE MOT DE PASSE',
  passwordUlT: 'Création d un mot de passe sécurisé',
  passwordUlTa: 'N utilisez jamais d informations personnelles.',
  passwordUlTb:
    'Incluez une combinaison de lettres, de chiffres et de caractères.',
  passwordUlTc: 'Privilégier la longueur du mot de passe.',
  passwordUlTd: 'Ne répétez jamais les mots de passe.',
  passwordUlTe: 'Évitez d utiliser de vrais mots.',
  passwordUpdate: 'Mise à jour',
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
