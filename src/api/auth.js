const axios = require('axios');
import baseUrl from './base';

const emailExistRequest = async email => {
  const r = await axios.get(`${baseUrl}/email_exists/?email=${email}`);

  return r.data.exists;
};

const signUpRequest = async (email, name, password) => {
  const r = await axios.post(`${baseUrl}/signup/`, {
    email: email,
    name: name,
    password: password,
  });

  if (r.status === 200) {
    return r.data;
  } else {
    throw Error('Почта уже существует');
  }
};

const signInRequest = async (password, email) => {
  const r = await axios.post(`${baseUrl}/signin`, {
    password: password,
    email: email,
  });
  if (r.status === 201) {
    return r.data;
  } else {
    throw Error('Неверный логин или пароль');
  }
};

const deleteRequest = async token => {
  const r = await axios.delete(`${baseUrl}/delete`, {
    token: token,
  });
  if (r.status === 204) {
    return r.data;
  } else {
    throw Error('Internal error');
  }
};

const updateRequest = async (email, name, password) => {
  const r = await axios.patch(`${baseUrl}/patch`, {
    email: email,
    name: name,
    password: password,
  });
  if (r.status === 204) {
    return r.data;
  } else {
    throw Error('Internal error');
  }
};

module.exports = {
  emailExistRequest,
  signUpRequest,
  signInRequest,
  updateRequest,
  deleteRequest,
};
