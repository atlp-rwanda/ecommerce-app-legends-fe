// eslint-disable-next-line import/no-extraneous-dependencies
import io from 'socket.io-client';

const socket = io(
  'https://ecommerce-app-legends-bn-production.up.railway.app/'
);
export default socket;
