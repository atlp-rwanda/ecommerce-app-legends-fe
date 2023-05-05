import axios from 'axios';

export const remoteURL = `https://ecommerce-app-legends-bn-production.up.railway.app`;
export default { remoteURL };

const client = axios.create({
  baseURL: remoteURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { client };
