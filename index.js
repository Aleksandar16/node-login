const readline = require('node:readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`Login ? `, (login) => {
  rl.question(`Mot de passe ? `, (password) => {
    const data = { login, password };
    
    fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify(data), 
    })
      .then((response) => response.json())
      .then((body) => {
        console.log("Requête envoyée");
        console.log("Réponse :", body); 
      })
      .catch((error) => {
        console.error('Erreur lors de la requête :', error);
      })
      .finally(() => {
        rl.close();
      });
  });
});
