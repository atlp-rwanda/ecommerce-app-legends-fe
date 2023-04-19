module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'no-unused-vars': 'warn',
    'no-undef': 'warn',
    "react/prop-types": "off",
    "react/destructuring-assignment": "off",
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
  },
};
