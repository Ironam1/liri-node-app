require("dotenv").config();

var keys = require("./keys");
var bandsintown = require("bandsintown");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var action = process.argv[2];
var args = process.argv;
var name = "";
var fs = require("fs");

for (var i = 3; i < args.length; i++) {
  if (i > 3 && i < args.length) {
    name = name + "+" + args[i];
  } else {
    name += args[i];
  }
}
console.log("name: " + name);

switch (action) {
  case "concert-this":
    axios.
      .getArtisEventList(name)
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
    spotify.search
      .artists(name)
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

  case "movie-this":
    axios
      .get("http://www.omdbapi.com/?t=" + name + "apikey=trilogy")
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

  case "do-what-it-says":
    fs.readFile("/random.txt");
    console.log(fs);
}
