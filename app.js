// const http = require("http");

// const server = http.createServer((req, res) => {
//   // Mendapatkan URL yang diminta oleh client
//   const url = req.url;
//   // Mendapatkan metode HTTP yang digunakan oleh client
//   const method = req.method;

//   // Endpoint 1: GET localhost:3000/
//   if (url === "/" && method === "GET") {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end("Hello world");
//   }

//   // Endpoint 2: GET localhost:3000/users
//   else if (url === "/users" && method === "GET") {
//     const users = [
//       { name: "John", age: 30 },
//       { name: "Jane", age: 28 },
//     ];
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify(users));
//   }

//   // Endpoint 3: Handle semua URL selain di atas
//   else {
//     res.writeHead(404, { "Content-Type": "text/plain" });
//     res.end("Resource not found");
//   }

//   // Endpoint 4: Handle HTTP methods selain GET
//   if (method !== "GET") {
//     res.writeHead(405, { "Content-Type": "text/plain" });
//     res.end("Metode HTTP tidak diizinkan");
//   }
// });

// const port = 3000;

// server.listen(port, () => {
//   console.log(`Server berjalan di http://localhost:${port}`);
// });

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
