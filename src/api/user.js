const axios = require('axios');
import baseUrl from './base';

const getUser = async token => {
  console.log(`${baseUrl}/user/?token=${token}`);
  const r = await axios.get(`${baseUrl}/user/?token=${token}`);
  if (r.status === 200) {
    return r.data;
  } else {
    throw Error;
  }
};

module.exports = {
  getUser,
};
