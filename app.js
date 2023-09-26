// jika hanya mengguanakan node.js maka ketika ingin membuat server langkah pertama yang harus dilakukan adalah membuat http-server seperti dibawah ini

/**
 * const http = require("http");
 *
 * const server = http.createServer((req, res) => {
 * if (req.url === '/') {
 * res.write('Hello Dunia')
 * res.end()
 * }
 * });
 *
 * server.listen(port, () => {);
 */

// membuat serve static file pada node.js menggunakan const fs = require('fs');

// jika menggunakan express maka kita hanya perlu melakukan import package express
const express = require("express");
const fs = require("fs");

// buat instance express
const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello dari aplikasi express");
});

app.get("/about", (req, res) => {
  console.log(__dirname);
  res.sendFile("./public/about.html", { root: __dirname });
  console.log(__dirname);
});

// CRUD -> create, read, update, delete

// implementasi read
app.get("/users", (req, res) => {
  // task setelah menerima request dari users, ke endpoint "/user" harapannya dari API yang dibikin akan memberikan response berupa data user, untuk kali ini data usernya kita ambil dari 'db/user.json'
  fs.readFile("./db/users.json", "utf-8", (error, data) => {
    if (error) res.send("Terjadi kesalahan pada pembacaan file");
    res.send(JSON.parse(data));
  });

  // nanti kalau pake database beneran kita perlu melakukan query ke database, misalnya kalau pake mysql atau postgresql itu pake sintaks ```SELECT * FROM users```
  //  atau nanti bisa menggunakan bantuan, agar tidak perlu melakukan query ke database, pakai yang namanya ORM -> Object Relational Mapping

  // contoh sintaksnya seperti berikut ini:
  /**
   * jika menggunakan query
   * const user = db.query('SELECT * FROM user');
   *
   * jika menggunakan ORM
   * const user = db.findAll('user');
   */
});

// untuk get by id pada database
// kita akan mengambil user pada database denagn user id = user id yang dikirimkan oleh user melalui request params
app.get("/users/:id", (req, res) => {
  console.log(req.params);

  // distructuring an object
  const { id } = req.params;

  fs.readFile("./db/users.json", "utf-8", (error, data) => {
    if (error) res.send("gagal dalam pembacaan database");
    const users = JSON.parse(data);
    console.log(users);

    // filter data dari database, dan kita cari user dengan id sesuai dengan id ynag dilempar melalui req.params

    const user = users.find((user) => user.id === Number(id));
    if (!user) res.send("User Not Found");
    res.send(user);
  });
});

app.listen(PORT, () => {
  console.log(`Aplikasi Sudah Berjalan pada http://localhost:${PORT}`);
});
