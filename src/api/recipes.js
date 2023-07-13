const axios = require('axios');
import baseUrl from './base';

export const recipesRequest = async ({
  page = null,
  name = null,
  user_id = null,
  cooking_time_smallest = null,
  exclude_allergies = null,
  token = null,
  meals = null,
}) => {
  const url = `${baseUrl}/recipes/?${name ? `name=${name}` : ''}${
    user_id ? `&user_id=${user_id}` : ''
  }${meals ? `meals=${meals}` : ''}${
    cooking_time_smallest
      ? `&cooking_time_smallest=${cooking_time_smallest}`
      : ''
  }${exclude_allergies ? `&exclude_allergies=${exclude_allergies}` : ''}${
    token ? `&token=${token}` : ''
  }`;
  console.log(
    `${baseUrl}/recipes/?${meals ? `meals=${meals}` : ''}${
      token ? `&token=${token}` : ''
    }`,
  );

  try {
    const r = await axios.get(url, {
      name: name,
      page: page,
      user_id: user_id,
      cooking_time_smallest: cooking_time_smallest,
      exclude_allergies: exclude_allergies,
      token: token,
      meals: meals,
    });
    if (r.status === 200) {
      return r.data;
    } else {
      throw Error();
    }
  } catch (err) {
    console.log(err);
  }
};

export const getRecipe = async (recipe_id, token) => {
  // console.log(`${baseUrl}/recipes/${recipe_id}/?token=${token}`);
  const r = await axios.get(`${baseUrl}/recipes/${recipe_id}/?token=${token}`, {
    recipe_id: recipe_id,
    token: token,
  });
  // console.log(r);
  if (r.status === 200) {
    return r.data;
  } else {
    throw Error('not found');
  }
};
export const bookmark = async (token, recipe_id, value) => {
  console.log(
    '+',
    `${baseUrl}/recipes/${recipe_id}/bookmark/?add=${value}&token=${token}`,
  );
  const r = await axios.post(
    `${baseUrl}/recipes/${recipe_id}/bookmark/?add=${value}&token=${token}`,
    {
      token: token,
      recipe_id: recipe_id,
      value: value,
    },
  );
  if (r.status === 204) {
    return r.data;
  } else {
    throw Error('not found');
  }
};
