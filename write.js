const fs = require("fs"),
    http = require('http'),
    server = http.createServer((request, response) => {
        const { method, url, headers } = request;
        let queryArr = url.split("?");
        let formDataArr = queryArr[1].split("&");
        let title = decodeURIComponent(formDataArr[0].split("=")[1]).replace("+", " ");
        let author = decodeURIComponent(formDataArr[1].split("=")[1]).replace("+", " ");
        let year = decodeURIComponent(formDataArr[2].split("=")[1]).replace("+", " ");
        response = addBook(title, author, year);
    }),
    directory = "data/",
    fileName = "data.json";

server.listen(8080, () => {
    console.log("Success! Listening on port 8080");
});

fs.mkdir(directory, (err) => {
    if (err){
        if (err.code != "EEXIST") {
            if (err) throw err;
        } else {
            console.log("directory exists");
        }
    } else {
        console.log("directory created ");
    }
});

const Book = function Book(title, author, yearPublished){
    this.Title = title;
    this.Author = author;
    this.Year = yearPublished;
};

let books = [];

function addBook(title, author, year){
    let book = new Book(title, author, year);
    books.push(book);
    fs.appendFile(directory + fileName, JSON.stringify(book), (err) => {
        if (err) throw err;
        console.log(JSON.stringify(book) + ' was appended to file!');
    });
}
