const axios = require('axios');
import baseUrl from './base';

const requestProductsF = async token => {
  const r = await axios.get(`${baseUrl}/profile/refrigeration/?${token}`);
  if (r.status === 200) {
    return r.data;
  } else {
    throw Error;
  }
};

const getProductsF = async (product_id, token) => {
  const r = await axios.post(
    `${baseUrl}/profile/refrigeration/?${product_id}&${token}`,
    {
      product_id: product_id,
    },
  );
  if (r.status === 204) {
    return r.data;
  } else {
    throw Error;
  }
};

const deleteProductsF = async (product_id, token) => {
  const r = await axios.delete(
    `${baseUrl}/profile/refrigeration/${product_id}/?${token}`,
    {
      product_id: product_id,
    },
  );
};

module.exports = {
  requestProductsF,
  getProductsF,
  deleteProductsF,
};
