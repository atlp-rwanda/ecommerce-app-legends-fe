/* eslint-disable no-param-reassign */
import axios from 'axios';

export const remoteURL = `https://ecommerce-app-legends-bn-production.up.railway.app`;
// export const remoteURL = `http://127.0.0.1:5000`;
export default { remoteURL };
const token = localStorage.getItem('token');
const client = axios.create({
  baseURL: remoteURL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

let tokenPromise;

client.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token');
    if (token) {
      config.headers.authorization = `Bearer ${JSON.parse(token)}`;
      // config.headers['Content-Type'] = `application/json`;
      config.headers['Content-Type'] = `multipart/form-data`;
    }
    console.log({ request: config });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function setToken(tokens) {
  localStorage.setItem('token', tokens);

  // Wait for the token to be set before resolving the promise
  tokenPromise = new Promise((resolve) => {
    resolve();
  });
}

function getTokenPromise() {
  return tokenPromise;
}

client.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    // console.log();
    if (
      (error && error.response && error.response.status === 403) ||
      error.response.status === 401
    ) {
      // Clear the token and state fields from local storage
      console.log(error.response.status);
      // localStorage.removeItem('token');
      // localStorage.removeItem('state');
    }
    return Promise.reject(error);
  }
);

export { client, getTokenPromise };
