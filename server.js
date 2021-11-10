const express = require("express");

const server = express();

server.listen(3006, () =>{
    console.log("Server running on port 3006");
});

server.use(express.urlencoded({extended: true}));
server.use(express.json());

let books = [{
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
server.get("/book", (req, res) => {
    res.send(books);
});

// /book/1: View book 1
// /book/:id
server.get("/book/:id", (req, res) =>{
    const id = req.params.id;
    const book = books.find((book) => book.id === id);
    console.log(book);
    res.send(book);
});

