const readline = require('node:readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`Login ? `, (login) => {
  rl.question(`Mot de passe ? `, (password) => {
    const data = { login, password };
    fetch('http://localhost:8000' + data)
      .then((response) => response.text())
      .then((body) => {
        console.log("Requête envoyé");
      })
      .catch((error) => {
        console.error('Erreur lors de la requête :', error);
      })
      .finally(() => {
        rl.close();
      });
  });
});
