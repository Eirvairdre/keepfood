const axios = require('axios');
import baseUrl from './base';

const mealsRequest = async () => {
  const r = await axios.get(`${baseUrl}/meals`);
  if (r.status === 200) {
    return r.data;
  } else {
    throw Error('Internal error');
  }
};

module.exports = {
  mealsRequest,
};
