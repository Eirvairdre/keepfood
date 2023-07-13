const axios = require('axios');
import baseUrl from './base';

const RecipesRequest = async token => {
  const r = await axios.get(`${baseUrl}/recommends/?token=${token}`);
};

const GetRecipes = async (token, recipe_id) => {
  console.log('!likes ');
  console.log(`${baseUrl}/recommends/?token=${token}`);
  const r = await axios.post(
    `${baseUrl}/recommends/?token=${token}`,
    recipe_id,
  );
  if (r.status === 204) {
    console.log(r.data);
    return r.data;
  } else {
    throw Error('Internal error');
  }
};

const likeRequest = async (token, recipe_id, positive) => {
  console.log('!!');
  const r = await axios.post(`${baseUrl}/recommends/?token=${token}`);
  if (r.status === 204) {
    console.log(r.data);
    return r.data;
  } else {
    throw Error('Internal error');
  }
};

const likeSet = async (token, recipe_id, positive) => {
  console.log('!!!');
  console.log(token, recipe_id, positive);
  const r = await axios.post(`${baseUrl}/recommends/estimate?token=${token}`, {
    recipe_id: recipe_id,
    positive: positive,
  });
  console.log(r.data);
  if (r.status === 204) {
    return r.data;
  } else {
    throw Error('Internal error');
  }
};

module.exports = {
  RecipesRequest,
  GetRecipes,
  likeRequest,
  likeSet,
};
