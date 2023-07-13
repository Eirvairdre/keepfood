const {mealsRequest} = require('../../src/api/meals');

mealsRequest()
  .then(r => console.log('Meals: ', r))
  .catch(e => console.log(e));
