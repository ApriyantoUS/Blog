const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Models
const Blog = require(`./models/blog`);

// Connect to Mongodb
mongoose
  .connect(`mongodb://127.0.0.1:27017/sample_db`)
  .then((result) => {
    console.log("CONNECTED TO MONGODB YA MAS APRI GANTENG");
  })
  .catch((err) => {
    console.log(err + " ERROR CUY ADA YANG SALAH MUNGKIN DI LINK NYA ");
  });

//  Template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Express Js

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/t/:tag", (req, res) => {
  const { tag } = req.params;
  res.render("tag.ejs", { tag });
});

app.get("/rand", (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  res.render("random.ejs", { num });
});

app.listen(3000, () => {
  console.log(`listening on http://127.0.0.1:3000`);
});
