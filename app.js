const express = require("express");

// buat instance express
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello dari aplikasi express");
});

app.listen(PORT, () => {
  console.log(`Aplikasi Sudah Berjalan pada http://localhost:${PORT}`);
});
