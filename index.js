const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/movies", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

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

app.get("/", (req, res) => {
  Movie.find({}, (error, movies) => {
    if (error) {
      console.error(error);
    } else {
      res.render("index", { movies });
    }
  });
});

app.set('view engine', 'ejs');

app.listen(8081, () => {
  console.log("Movie app listening on port 3000!");
});

// var http = require("http");

// http.createServer(function (request, response) {
//    // Send the HTTP header 
//    // HTTP Status: 200 : OK
//    // Content Type: text/plain
//    response.writeHead(200, {'Content-Type': 'text/plain'});
   
//    // Send the response body as "Hello World"
//    response.end('Hello World\n');
// }).listen(8081);

// // Console will print the message
// console.log('Server running at http://127.0.0.1:8081/');