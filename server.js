const express = require("express");

const server = express();

server.listen(3006, () =>{
    console.log("Server running on port 3006");
});

// import member routes
const memberRoutes = require('./routes/member.route');

//create member routes
server.use(memberRoutes);

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

// /book: Post create book
// title, author
server.post("/book", (req, res) =>{
    const {title, author} = req.body;
    
    const book = {
        id: Math.random().toString(16).slice(2),
        title,
        author,
    };
    books.push(book);
    res.send(book);
    
});


// /book/:id/burrow book
// /book/1/burrow
// burrowedMemberId, burrowedData

server.put("/book/:id/burrow", (req, res) => {
    const id = req.params.id;
    const {burrowedMemberId, burrowedDate} = req.body;

    console.log(id, burrowedMemberId, burrowedDate);
    const bookIndex = books.findIndex((book) => book.id ===id);
    books[bookIndex] = {
        ...books[bookIndex],
        isAvailable: false,
        burrowedMemberId,
        burrowedDate,
    }

    res.send(books[bookIndex]);
});

// /book/:id/return: Return book
// /book/1/return
server.put("/book/:id/return", (req, res) => {
    const id = req.params.id;

    const bookIndex = books.findIndex((book) => book.id ===id);
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
    const {title, author} = req.body;

    const bookIndex = books.findIndex((book) => book.id ===id);
    books[bookIndex] = {
        ...books[bookIndex],
        title,
        author,
    }

    res.send(books[bookIndex]);
});

// /book/:id: Delete Delete book
// /book/1
server.delete("/book/:id", (req, res) => {
    const id = req.params.id;

    books = books.filter((book) => book.id !== id);
    res.send(id);
    console.log(books)
})

