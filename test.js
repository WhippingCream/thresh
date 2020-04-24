const test = require('./');

const start = async () => {
  const idToken = await test.getLoginToken('id', 'password');
  console.log(idToken);
};

start();