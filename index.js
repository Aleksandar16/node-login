const readline = require('node:readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`Login ? `, name => {
  rl.question(`Login ? `, name => {
    fetch('https://api-adresse.data.gouv.fr/search/?q=' + name)
    .then((response) => response.text())
    .then((body) => {
        console.log(body);
    });
  })
  rl.close();
});