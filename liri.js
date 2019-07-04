require("dotenv").config();

var keys = require("./keys");
var bandsintown = require("bandsintown");
var Spotify = require("node-spotify-api");
var fs = require("fs-extra");
var axios = require("axios");
var spotify = new Spotify(keys.spotify);
var action = process.argv[2];
var args = process.argv;
var name = "";

for (var i = 3; i < args.length; i++) {
  if (i > 3 && i < args.length) {
    name = name + " " + args[i];
  } else {
    name += args[i];
  }
}
// console.log("name: " + name);

switch (action) {
  case "concert-this":
    axios
      .get(
        "https://rest.bandsintown.com/artists/" +
          name +
          "/events?app_id=codingbootcamp&date=upcoming"
      )
      .then(function(resp) {
        console.log(resp);
      })
      .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
    break;

  case "spotify-this-song":
      spotify
      .search({ type: 'track', query: name}, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        
        console.log(data);
      });
    // spotify
    //   .search({
    //     type: "track",
    //     query: name
    //   })
    //   .then(function(resp) {
    //     console.log(resp);
    //   })
    //   .catch(function(error) {
    //     if (error.response) {
    //       // The request was made and the server responded with a status code
    //       // that falls out of the range of 2xx
    //       console.log("---------------Data---------------");
    //       console.log(error.response.data);
    //       console.log("---------------Status---------------");
    //       console.log(error.response.status);
    //       console.log("---------------Status---------------");
    //       console.log(error.response.headers);
    //     } else if (error.request) {
    //       // The request was made but no response was received
    //       // `error.request` is an object that comes back with details pertaining to the error that occurred.
    //       console.log(error.request);
    //     } else {
    //       // Something happened in setting up the request that triggered an Error
    //       console.log("Error", error.message);
    //     }
    //     console.log(error.config);
    //   });
    break;

  case "movie-this":
    if (name === "") {
      name = "Mr. Nobody";
    }
    axios
      .get("http://www.omdbapi.com/?t=" + name + "&apikey=trilogy")
      .then(function(resp) {
        console.log(
          resp.data.Title +
            "\n" +
            resp.data.Year +
            "\n" +
            resp.data.imdbRating +
            "\n" +
            resp.data.Country +
            "\n" +
            resp.data.Language +
            "\n" +
            resp.data.Plot +
            "\n" +
            resp.data.Actors
        );
      })
      .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
    break;

  case "do-what-it-says":
    fs.readFile("./random.txt")
      .then(function(resp) {
        console.log(resp);
      })
      .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
    break;
}
