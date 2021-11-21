const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/book");
const cors = require("cors");

const server = express();

const databaseURL =
  "mongodb+srv://testUser:testUser@cluster0.s3vzv.mongodb.net/lms?retryWrites=true&w=majority";

const PORT = process.env.PORT || 3001;
mongoose
  .connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Connected to DB");
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

server.use(cors());
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
const convertToBook = (book) => {
  return {
    id: book._id,
    title: book.title,
    author: book.author,
    isAvailable: book.isAvailable,
    burrowedMemberId: book.burrowedMemberId,
    burrowedDate: book.burrowedDate,
  };
};
const sendBook = async (res, id) => {
  const book = await Book.findById(id);
  res.send(convertToBook(book));
};

//book: View all books
server.get("/book", async (req, res) => {
  //res.send(books);
  const books = await Book.find();
  res.send(
    books.map((book) => {
      return convertToBook(book);
    })
  );
});

// /book/1: View book 1
// /book/:id
server.get("/book/:id", async (req, res) => {
  const id = req.params.id;
  // const book = books.find((book) => book.id === id);
  // console.log(book);
  // res.send(book);

  sendBook(res, id);
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

  const book = new Book({
    title,
    author,
    isAvailable: true,
    burrowedMemberId: "",
    burrowedDate: "",
  });
  const response = await book.save();
  res.send(convertToBook(response));
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
  sendBook(res, id);
});

// /book/:id/return: Return book
// /book/1/return
server.put("/book/:id/return", async (req, res) => {
  const id = req.params.id;

  // const bookIndex = books.findIndex((book) => book.id === id);
  // books[bookIndex] = {
  //   ...books[bookIndex],
  //   isAvailable: true,
  //   burrowedMemberId: "",
  //   burrowedDate: "",
  // };

  // res.send(books[bookIndex]);

  const book = await Book.findByIdAndUpdate(id, {
    isAvailable: true,
    burrowedMemberId: "",
    burrowedDate: "",
  });
  sendBook(res, id);
});

// /book/:id Put: Edit book
// title, author
server.put("/book/:id", async (req, res) => {
  const id = req.params.id;
  const { title, author } = req.body;

  // const bookIndex = books.findIndex((book) => book.id === id);
  // books[bookIndex] = {
  //   ...books[bookIndex],
  //   title,
  //   author,
  // };

  // res.send(books[bookIndex]);

  const book = await Book.findByIdAndUpdate(id, {
    title,
    author,
  });
  sendBook(res, id);
});

// /book/:id: Delete Delete book
// /book/1
server.delete("/book/:id", async (req, res) => {
  const id = req.params.id;

  // books = books.filter((book) => book.id !== id);
  // res.send(id);
  // console.log(books);

  const book = await Book.findByIdAndDelete(id);
  res.send(book);
});
