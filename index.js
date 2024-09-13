const path = require("path");
const { v4: uuidv4 } = require("uuid");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// ! CONNECT TO MONGODB
mongoose
  .connect("mongodb://127.0.0.1/shop_db")
  .then((res) => {
    console.log("Connect To MongoDB");
  })
  .catch((err) => {
    console.log(err + " ERROR CUYYY");
  });

// contoh data sementara
const post = [
  {
    id: uuidv4(),
    title: "Belajar Node.js",
    image: "assets/images/nodejs.png",
    alt: "nodejs",
    date: "11 September 2024",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum necessitatibus ducimus consequatur suscipit quidem eaque modi. Ut esse dicta maxime animi temporibus accusamus itaque perferendis ab deleniti eveniet ex, nulla aperiam obcaecati maiores dolorum nemo quis voluptate sint soluta a inventore, sed explicabo sunt numquam. Ipsa eligendi voluptatum accusantium deleniti labore nulla, alias iste ratione aperiam libero corrupti optio veniam, totam quibusdam possimus odit blanditiis nobis consequuntur id tenetur! Odit quasi rem incidunt molestiae blanditiis? Commodi fuga quidem, reprehenderit quaerat molestias aperiam maxime, temporibus, beatae minus optio harum inventore labore illum ratione nisi officia reiciendis libero perspiciatis explicabo repudiandae. Laboriosam?",
    author: "Apriyanto",
    category: "Programming",
  },
  {
    id: uuidv4(),
    title: "Belajar Express.js",
    body: "Konten artikel...",
    author: "Apriyanto",
    category: "Programming",
  },
];

const comments = [
  {
    id: uuidv4(),
    username: "Apriyanto",
    date: "11 September 2024",
    text: "Sangat bermanafaat oleh Devtech Hidayah",
  },
  {
    id: uuidv4(),
    username: "Woro Widowati",
    date: "13 September 2024",
    text: "Sangat bermanafaat oleh Devtech Hidayah kamu",
  },
  {
    id: uuidv4(),
    username: "Muhammad Rizki",
    date: "13 September 2024",
    text: "Sangat bermanafaat oleh Devtech Hidayah Mantap",
  },
];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Template Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
// app.use((req, res) => {
//   console.log("we Got");
//   res.send({ message: "Hallo" });
// });

app.get("/", (req, res) => {
  res.render("form.ejs");
});

// app.get("/index", (req, res) => {
//   res.render("index.ejs");
// });

app.post("/login", (req, res) => {
  res.render("home.ejs");
});

app
  .get("/blog", (req, res) => {
    res.render("blog.ejs", { post, comments });
  })
  .post("/blog", (req, res) => {
    const { username, text } = req.body;
    comments.push({
      username,
      date: new Date().toLocaleDateString("id-ID", {
        weekday: "long", // Nama hari (Senin, Selasa, dll.)
        year: "numeric", // Tahun (2023, dll.)
        month: "long", // Nama bulan (Januari, Februari, dll.)
        day: "numeric", // Tanggal (1, 2, 3, dll.)
      }),
      text,
    });
    res.render("blog.ejs", { post, comments });
  })
  .patch("/blog", (req, res) => {})
  .delete("/blog", (req, res) => {});

app.get("/blog/:id", (req, res) => {
  const { id } = req.params;
  const post = post.find((c) => c.id == id);
  res.render("/blog/show", { post });
});

app.get("*", (req, res) => {
  res.send(`
    <div style="width:100%; height:90vh; display:flex; flex-direction:column; align-items:center; justify-content:center">
    <h1 style="color:red; text-align:center" >
    Page Not Found</h1>
    <img src="assets/images/404.png" alt="404" style="width:300px" />
    </div>`);
});

app.listen(3000, () => {
  console.log(`listening to http://127.0.0.1:3000 `);
});
