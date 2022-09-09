const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/assets"));
app.use("/api/products", require("./routes/products"));

// app.get("/api/products", (req, res) => {
//   res.send("HI");
// });

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "build", "index.html"))
);

mongoose.connect("mongodb://localhost:27017").then(() => {
  app.listen(port, () => {
    console.log(`app listens on port  + ${port}`);
  });
});
