const readline = require("readline");
const { getLoginToken } = require("../src");

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

const start = async () => {
  const account = await askQuestion("Input Your Riot Account: ");
  const password = await askQuestion("Input Your Riot Password: ");

  const idToken = await getLoginToken(account, password);
  console.log(idToken);
};

start();
