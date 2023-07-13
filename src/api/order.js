const axios = require('axios');
import baseUrl from './base';

const marketsRequest = async () => {
  const r = await axios.get(`${baseUrl}/markets`);
  if (r.status === 200) {
    // console.log('a', r.data);
    return r.data;
  } else {
    throw Error('Internal error');
  }
};

const sendOrder = async ({
  token,
  recipe_ids,
  market_id,
  phone,
  address,
  exclude_products,
}) => {
  // let exclude_productsa = Number(exclude_products.toString());
  console.log(`${baseUrl}/orders/?token=${token}`);
  console.log('token ', token);
  console.log('recipe_ids ', recipe_ids);
  console.log('market_id ', market_id);
  console.log('phone ', phone);
  console.log('address ', address);
  console.log('products ', exclude_products);
  const r = await axios.post(`${baseUrl}/orders/?token=${token}`, {
    market_id: market_id,
    recipe_ids: recipe_ids,
    exclude_products: exclude_products,
    phone: phone,
    address: address,
  });
  if (r.status === 200) {
    console.log(r.data);
    return r.data;
  } else {
    throw Error;
  }
};

module.exports = {
  marketsRequest,
  sendOrder,
};
