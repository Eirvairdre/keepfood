const axios = require('axios');
import baseUrl from './base';

export const categoriesRequest = async meal_id => {
  const url = `${baseUrl}/categories/?meal_id=${meal_id}`;
  try {
    console.log(url);
    const r = await axios.get(url);
    if (r.status === 200) {
      return r.data;
    } else {
      throw Error();
    }
  } catch (err) {
    console.log(err);
  }
};
