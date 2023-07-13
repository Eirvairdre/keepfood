const {productsRequest} = require('../../src/api/products');

productsRequest('t', 1)
  .then(r => console.log('Success'))
  .catch(_ => console.log('Product missmatch'));
