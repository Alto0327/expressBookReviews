const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password){
    if(!isValid(username)){
      users.push({"username": username, "password": password});
      return res.status(200).json({message: "User registered successfully"});
    }else{
      return res.status(404).json({message: "user already exists!"})
    }
  }
  return res.status(404).json({message: "username and password are required"});
 
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  
  return res.send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  let filteredAuthor = Object.values(books).filter((book) => book.author === author);
  
  if(filteredAuthor.length >0){
    res.send(filteredAuthor);
  }else{
    return res.status(404).json({message: "Book not found"});
  }

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  let filteredTitle = Object.values(books).filter((book) => book.title === title);
  
  if(filteredTitle.length >0){
    res.send(filteredTitle);
  }else{
    return res.status(404).json({message: "Book not found"});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let review = books[isbn].reviews;

  if(review){
    res.send(review);
  }else{
    return res.status(404).json({message:"Book not found"})
  }
});

module.exports.general = public_users;
