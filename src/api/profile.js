const axios = require('axios');
import baseUrl from './base';

const profile = async token => {
  const r = await axios.get(`${baseUrl}/profile/?token=${r.token}`);
};

const profileInit = async (token, budget_min, budget_max, skill_level) => {
  console.log('123');
  const r = await axios.post(`${baseUrl}/profile/?token=${token}`, {
    budget_min: budget_min,
    budget_max: budget_max,
    skill_level: skill_level,
  });
  if (r.status === 204) {
    return r.data;
  } else {
    throw Error('Internal error');
  }
};

const profileUpdate = async (token, budget_min, budget_max, skill_level) => {
  const r = await axios.patch(`${baseUrl}/profile/?token=${token}`, {
    budget_min: budget_min,
    budget_max: budget_max,
    skill_level: skill_level,
  });
};

const allergiesRequest = async token => {
  const r = await axios.get(`${baseUrl}/profile/allergies/?token=${token}`);
};

const allergiesAdd = async (token, product_ids) => {
  const r = await axios.post(
    `${baseUrl}/profile/allergies/?token=${token}`,
    product_ids,
  );
  if (r.status === 204) {
    return r.data;
  } else {
    throw Error('Internal error');
  }
};

const allergiesRemove = async (token, product_id) => {
  const r = await axios.delete(
    `${baseUrl}/profile/allergies/${product_id}/?token=${token}`,
    {
      product_id: product_id,
    },
  );
};

const mealsRequest = async token => {
  const r = await axios.get(`${baseUrl}/profile/meals/?token=${token}`);
};

const mealsInit = async (token, meal_ids) => {
  const r = await axios.post(
    `${baseUrl}/profile/meals/?token=${token}`,
    meal_ids,
  );
  if (r.status === 204) {
    return r.data;
  } else {
    throw Error('Internal error');
  }
};

const mealsDelete = async (token, meal_id) => {
  const r = await axios.delete(
    `${baseUrl}/profile/meals/${meal_id}/?token=${token}`,
    {
      meal_id: meal_id,
      token: token,
    },
  );
};

module.exports = {
  profile,
  profileInit,
  profileUpdate,
  allergiesRequest,
  allergiesAdd,
  allergiesRemove,
  mealsRequest,
  mealsInit,
  mealsDelete,
};
