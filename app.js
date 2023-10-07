const http = require("http");
const url = require("url");

const PORT = 3000;

const server = http.createServer((req, res) => {
  try {
    if (req.method === "GET") {
      const parsedUrl = url.parse(req.url, true);
      const pathname = parsedUrl.pathname;

      if (pathname === "/") {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end("Hello !\n");
      } else if (pathname === "/users") {
        const { users } = require("./datauser.js");
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(JSON.stringify(users));
      } else {
        const { err404 } = require("./error.js");
        res.setHeader("Content-Type", "application/json");
        res.writeHead(404);
        res.end(JSON.stringify(err404));
      }
    } else {
      const { err405 } = require("./error.js");
      res.setHeader("Content-Type", "application/json");
      res.writeHead(405);
      res.end(JSON.stringify(err405));
    }
  } catch (err) {
    console.log("Terjadi error berupa", err.message);
  }
});

const port = 3000;

server.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
