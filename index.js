const mongoose = require("mongoose");

// "mongodb://127.0.0.1:27017/movies"

mongoose.connect("mongodb+srv://kirpalvirk:Kirpal%40123@senecaweb.jo49cll.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: true 
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "This is thee connection error:"));

db.once("open", function() {
  console.log("Connected to MongoDB");
});

const movieSchema = new mongoose.Schema({
    year: String,
    title: String,
    plot: String,
    rating: String,
    runTime: String
  });
  
  const Movie = mongoose.model("Movie", movieSchema);

  const newMovie = new Movie({
    year: "2021",
    title: "The Matrix",
    plot: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    rating: "8.7",
    runTime: "136 min"
  });
  
  newMovie.save((error, movie) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Movie added successfully: ", movie);
    }
  });

  const express = require("express");
const app = express();

app.get("/add_movie", (req, res) => {
  Movie.find({}, (error, movies) => {
    if (error) {
      console.error(error);
    } else {
      res.render("index", { movies });
    }
  });
});

// app.get('/home', function(req, res) { 
//   // let sql = "SELECT * FROM country";     
//   // connection.query(function(err, results){
//   //     if (err) throw err;
//       // res.send(results);
//       res.render('home');
//   // });
// });

app.set('view engine', 'ejs');

app.listen(3000, () => {
  console.log("My Movie app listening on port 3000!");
});



// // Console will print the message
// console.log('Server running at http://127.0.0.1:8081/');