const { dbConnect } = require("./dbConnect/dbconnect");
const Book = require("./models/books.model");
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin : "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));



const PORT = process.env.PORT;

app.use(express.json())

dbConnect();

const newBookData ={
  "title": "Shoe Dog",
  "author": "Phil Knight",
  "publishedYear": 2016,
  "genre": ["Autobiography", "Business"],
  "language": "English",
  "country": "United States",
  "rating": 4.5,
  "summary": "An inspiring memoir by the co-founder of Nike, detailing the journey of building a global athletic brand.",
  "coverImageUrl": "https://example.com/shoe_dog.jpg"
};

const seedData = async (bookData) => {
  try {
    const newBook = new Book(bookData);
    const savedBook = await newBook.save()
    return savedBook
  } catch (error) {
    console.log("Error while creating new record in bookDb.",error);
  }
}

// seedData(newBookData);

app.post('/books/postBook', async (req,res)=>{
  try{
    const postBook = await seedData(req.body)
    if(postBook){
      res.status(200).json({
        message: 'Book has been posted Successfully'
      })
    }else{
        res.status(500).json({error : 'Book has not been posted due to parameter error please try again.'})
      }

  }catch(error){
    console.log(error)
  }
})

// -------------- To read all the data of books ------------------------

app.get('/books', async (req, res)=>{
  try{
    const allBooks = await readAllBooks()
    if(allBooks){
      res.send(allBooks)
    }else{
      res.status(400).json({error : 'No books data found in db.'})
    }
  }catch(error){
    res.status(500).json({message : 'APi is having some error.'})
  }
})

async function readAllBooks() {
  try {
    const readBooks = await Book.find();
    // console.log(readBooks);
    return readBooks
  } catch (error) {
    console.log("failed to read all books data");
  }
}

//-------------------------------------------------------------

// -------------- To read a book by its title  ------------------------

app.get('/books/:title', async (req, res)=>{
  try{
    const bookByTitle = await Book.findOne({title : req.params.title})
    if(bookByTitle){
      res.send(bookByTitle)
    }else{
      res.status(400).json({error : 'No books data found in db by this title.'})
    }
  }catch(error){
    res.status(500).json({error : 'APi is having some error.'})
  }
})

//-------------------------------------------------------------

// -------------- To read all the books by its author  ------------------------

app.get('/books/authors/:authorName', async (req, res)=>{
  try{
    const booksByAuthor = await Book.find({author : req.params.authorName})
    if(booksByAuthor){
      res.send(booksByAuthor)
    }else{
      res.status(400).json({error : 'No books found written by this author name.'})
    }
  }catch(error){
    res.status(500).json({error : 'APi is having some error.'})
  }
})

// -------------- To read all the books which is having Business genre.  ------------------------

app.get('/books/genres/:genreName', async (req, res)=>{
  try{
    const booksByGenre = await Book.find({genre : req.params.genreName})
    if(booksByGenre){
      res.send(booksByGenre)
    }else{
      res.status(400).json({error : 'No books found by this genre.'})
    }
  }catch(error){
    res.status(500).json({error : 'APi is having some error.'})
  }
})

//-------------------------------------------------------------

// -------------- To read all the books which is released in year 2012.  ------------------------

app.get('/books/releaseYear/:Year', async (req, res)=>{
  try{
    const booksByReleaseYear = await Book.find({publishedYear : req.params.Year})
    if(booksByReleaseYear){
      res.send(booksByReleaseYear)
    }else{
      res.status(400).json({error : 'No books was found released in year 2012.'})
    }
  }catch(error){
    res.status(500).json({error : 'APi is having some error.'})
  }
})

//-------------------------------------------------------------

// -------------- To read a book by its Id and update the rating.  ------------------------


app.post('/books/bookId/:bookId', async (req, res)=>{
  try{
    const updatedBookRating = await Book.findByIdAndUpdate({_id : req.params.bookId}, {rating : req.body.rating}, {new : true})
    if(updatedBookRating){
      res.status(200).json({message : 'Book rating updated successfully', updatedBookRating})
    }else{
      res.status(400).json({error : 'Book does not exist.'})
    }
  }catch(error){
    res.status(500).json({error : 'APi is having some error.'})
  }
})


// -------------- To read a book by its Title and update the rating.  ------------------------


app.post('/books/title/:bookTitle', async (req, res)=>{
  try{
    const updatedBookRatingByTitle = await Book.findOneAndUpdate({title : req.params.bookTitle}, {rating : req.body.rating, publishedYear : req.body.publishedYear}, {new : true})
    if(updatedBookRatingByTitle){
      res.status(200).json({message : 'Book rating updated successfully', updatedBookRatingByTitle})
    }else{
      res.status(400).json({error : 'Book does not exist.'})
    }
  }catch(error){
    res.status(500).json({error : 'APi is having some error.'})
  }
})


//-------------------------------------------------------------

// -------------- To delete a book by its id.  ------------------------


app.delete('/books/:bookId', async (req, res)=>{
  try{
    const deletedBook = await Book.findByIdAndDelete({_id : req.params.bookId})
    if(deletedBook){
      res.status(200).json({message : 'Book has been deleted successfully.'})
    }else{
      res.status(400).json({error : 'Book does not exist.'})
    }
  }catch(error){
    res.status(500).json({error : 'APi is having some error.'})
  }
})


//-------------------------------------------------------------


app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});
