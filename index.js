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
    id: 1,
    title: "Node.js",
    subtitle: "Belajar NodeJS dengan Mudah",
    image: "/assets/images/nodejs.png",
    alt: "nodejs",
    date: "11 September 2024",
    body: "Node.js adalah runtime JavaScript di sisi server yang dibangun di atas mesin V8 milik Chrome. Ini memungkinkan developer untuk menjalankan JavaScript di server, sehingga memungkinkan untuk membangun aplikasi backend dengan JavaScript.",
    author: "Apriyanto",
    category: "Programming",
  },
  {
    id: 2,
    title: "Express.js",
    subtitle: "Salah Satu Library untuk Node.js yang Mudah Digunakan",
    image: "/assets/images/express.png",
    alt: "nodejs",
    date: "11 September 2024",
    body: "Express.js adalah framework web minimalis untuk Node.js. Ini sering digunakan untuk membangun aplikasi web atau API. Express.js membuat pengembangan server dengan Node.js lebih mudah dengan menyediakan fitur-fitur yang membantu menangani rute, middleware, dan respons HTTP.",
    author: "Apriyanto",
    category: "Programming",
  },
  {
    id: 3,
    title: "JavaScript",
    subtitle: "Belajar JavaScript dengan Mudah dengan Fundamental",
    image: "/assets/images/javascript.png",
    alt: "nodejs",
    date: "11 September 2024",
    body: "JavaScript adalah bahasa pemrograman yang awalnya dirancang untuk pengembangan di sisi frontend (klien), tetapi sekarang juga digunakan di sisi backend (server) berkat Node.js. JavaScript adalah salah satu bahasa yang paling banyak digunakan di dunia pengembangan web dan dikenal karena kemampuannya untuk membuat halaman web lebih interaktif.",
    author: "Apriyanto",
    category: "Programming",
  },
  {
    id: 4,
    title: "React.JS",
    subtitle: "Framework JavaScript Paling Populer di Indonesia",
    image: "/assets/images/ReactJS.png",
    alt: "nodejs",
    date: "11 September 2024",
    body: "React.js adalah pustaka (library) JavaScript yang digunakan untuk membangun antarmuka pengguna (User Interfaces/UI) secara komponen. React dikembangkan oleh Facebook dan telah menjadi salah satu teknologi frontend yang paling populer.",
    author: "Apriyanto",
    category: "Programming",
  },
  {
    id: 5,
    title: "React.JS",
    subtitle: "Framework JavaScript Paling Populer di Indonesia",
    image: "/assets/images/nodejs.png",
    alt: "nodejs",
    date: "11 September 2024",
    body: "Konten artikelLorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, maxime.",
    author: "Apriyanto",
    category: "Programming",
  },
  {
    id: 6,
    title: "React.JS",
    subtitle: "Framework JavaScript Paling Populer di Indonesia",
    image: "/assets/images/nodejs.png",
    alt: "nodejs",
    date: "11 September 2024",
    body: "Konten artikelLorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, maxime.",
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
  {
    id: uuidv4(),
    username: "Muhammad Ali Farizi",
    date: "14 September 2024",
    text: "Sangat bermanafaat oleh Devtech Hidayah Keren",
  },
];

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Template Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.use((req, res) => {
//   console.log("we Got");
//   res.send({ message: "Hallo" });
// });

app.get("/", (req, res) => {
  res.render("form.ejs");
});

// Home Page

app
  .get("/home", (req, res) => {
    res.render("home.ejs");
  })
  .post("/home", (req, res) => {
    res.render("home.ejs");
  });

app.get("/blog", (req, res) => {
  res.render("blog.ejs", { post, comments });
});

app
  .get("/blog/:id", (req, res) => {
    const { id } = req.params;
    const posted = post.find((c) => c.id === parseInt(id));
    if (posted) {
      res.render("show.ejs", { posted });
    } else {
      res.send(`
        <div style="width:100%; height:90vh; display:flex; flex-direction:column; align-items:center; justify-content:center">
        <h1 style="color:red; text-align:center" >
        Oops 404 <br>Page Not Found</h1>
        </div>`);
    }
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

app
  .get("/show/:id", (req, res) => {
    const { id } = req.params;
    const comment = comments.find((c) => c.id === id);
    res.render("show.ejs", { comment });
  })
  .patch("/show/:id", (req, res) => {
    const newComment = req.body.text;
    const foundComment = comments.find((c) => c.id === id);
    foundComment.text = newComment;
    res.redirect("show", { comment: foundComment });
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
