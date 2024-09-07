// const mongoose = require("mongoose");

// // Models
// const Blog = require(`./models/blog`);

// // Connect to Mongodb
// mongoose
//   .connect(`mongodb://127.0.0.1:27017/sample_db`)
//   .then((res) => {
//     console.log("connect to mongodb");
//   })
//   .then((err) => {
//     console.log(err);
//   });

// // Seed data

// const seedBlogs = [
//   {
//     name: "Presiden Soekarno Mendeklarasikan Kemerdekaan Indonesia",
//     topic: "presiden Indonesia yang pertama",
//     description: "lorem ipsum dolor si amet",
//   },
//   {
//     name: "Mentri Agama Mengatakan Azan seperti Gonggong Anjing",
//     topic: "Menteri Agama",
//     description: "lorem ipsum dolor si amet",
//   },
//   {
//     name: "asdaw",
//     topic: "presiden Indonesia yang pertama",
//     description: "lorem ipsum dolor si amet",
//   },
// ];

// Blog.insertMany(seedBlogs)
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
