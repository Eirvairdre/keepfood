const axios = require('axios');
import baseUrl from './base';

export const productsRequest = async ({name, page}) => {
  const r = await axios.get(
    `${baseUrl}/products/?${name ? `name=${String(name)}` : ''}&${
      page ? `page=${page}` : 'f'
    }`,
  );
  if (r.status === 200) {
    return r.data;
  } else {
    throw Error();
  }
};
