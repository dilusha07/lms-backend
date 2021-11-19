const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/book");

const server = express();

const databaseURL =
  "mongodb+srv://testUser:testUser@cluster0.s3vzv.mongodb.net/lms?retryWrites=true&w=majority";

mongoose
  .connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Connected to DB");
    server.listen(3001, () => {
      console.log("Server running on port 3001");
    });
  })
  .catch((err) => {
    console.log(err);
  });

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// import member routes
const memberRoutes = require("./routes/member.route");

//create member routes
server.use(memberRoutes);

let books = [
  {
    id: "1",
    title: "Harry Pooter",
    author: "J.K. Rowling",
    isAvailable: true,
    burrowedMemberId: "",
    burrowedDate: "",
  },
  {
    id: "2",
    title: "Charlie and the Chocolate factory",
    author: "J.K. Rowling",
    isAvailable: true,
    burrowedMemberId: "",
    burrowedDate: "",
  },
];

//book: View all books
server.get("/book", async (req, res) => {
  //res.send(books);
  const books = await Book.find();
  res.send(books);
});

// /book/1: View book 1
// /book/:id
server.get("/book/:id", async (req, res) => {
  const id = req.params.id;
  // const book = books.find((book) => book.id === id);
  // console.log(book);
  // res.send(book);

  const book = await Book.findById(id);
  res.send(book);
});

// /book: Post create book
// title, author
server.post("/book", async (req, res) => {
  const { title, author } = req.body;

  // const book = {
  //   id: Math.random().toString(16).slice(2),
  //   title,
  //   author,
  // };
  // books.push(book);
  // res.send(book);

  const book = new Book({ title, author });
  const response = await book.save();
  res.send(response);
});

// /book/:id/burrow book
// /book/1/burrow
// burrowedMemberId, burrowedData

server.put("/book/:id/burrow", async (req, res) => {
  const id = req.params.id;
  const { burrowedMemberId, burrowedDate } = req.body;

  // console.log(id, burrowedMemberId, burrowedDate);
  // const bookIndex = books.findIndex((book) => book.id === id);
  // books[bookIndex] = {
  //   ...books[bookIndex],
  //   isAvailable: false,
  //   burrowedMemberId,
  //   burrowedDate,
  // };

  // res.send(books[bookIndex]);

  const book = await Book.findByIdAndUpdate(id, {
    isAvailable: false,
    burrowedMemberId,
    burrowedDate,
  });
  res.send(book);
});

// /book/:id/return: Return book
// /book/1/return
server.put("/book/:id/return", (req, res) => {
  const id = req.params.id;

  const bookIndex = books.findIndex((book) => book.id === id);
  books[bookIndex] = {
    ...books[bookIndex],
    isAvailable: true,
    burrowedMemberId: "",
    burrowedDate: "",
  };

  res.send(books[bookIndex]);
});

// /book/:id Put: Edit book
// title, author
server.put("/book/:id", (req, res) => {
  const id = req.params.id;
  const { title, author } = req.body;

  const bookIndex = books.findIndex((book) => book.id === id);
  books[bookIndex] = {
    ...books[bookIndex],
    title,
    author,
  };

  res.send(books[bookIndex]);
});

// /book/:id: Delete Delete book
// /book/1
server.delete("/book/:id", (req, res) => {
  const id = req.params.id;

  books = books.filter((book) => book.id !== id);
  res.send(id);
  console.log(books);
});
