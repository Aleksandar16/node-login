const http = require("http");
const crypto = require("crypto");
require("dotenv").config(); 

const users = JSON.parse(process.env.USERS);
const data = JSON.parse(process.env.DATA);

function hashPassword(password) {
  return crypto.createHash("md5").update(password).digest("hex");
}

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/login") {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      const { login, password } = JSON.parse(body);
      const hashedPassword = hashPassword(password);

      const user = users.find(u => u.login === login && u.passwordHash === hashedPassword);

      if (user) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
      } else {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid credentials" }));
      }
    });
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Serveur démarré sur http://localhost:3000");
});
