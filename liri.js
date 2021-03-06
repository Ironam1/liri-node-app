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
var divider =
  "\n------------------------------------------------------------\n\n";
var concert = "";
var movie = "";
var song = "";

for (var i = 3; i < args.length; i++) {
  if (i > 3 && i < args.length) {
    name = name + "+" + args[i];
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
        for (var i = 0; i < 10; i++) {
          console.log(
            resp.data[i].venue.name +
              "\n" +
              resp.data[i].venue.city +
              ", " +
              resp.data[i].venue.region +
              "\n" +
              resp.data[i].datetime +
              divider
          );
          concert =
            resp.data[i].venue.name +
            "\n" +
            resp.data[i].venue.city +
            ", " +
            resp.data[i].venue.region +
            "\n" +
            resp.data[i].datetime +
            divider;
        }
        fs.appendFile("log.txt", concert + divider, function(err) {
          if (err) throw err;
          console.log(concert);
        });
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
    if (name === "") {
      name = "The Sign  Ace of Base";
    }
    spotify
      .request(
        "https://api.spotify.com/v1/search?q=" +
          name +
          "&type=track%2Calbum%2Cartist&limit=1"
      )
      .then(function(data) {
        console.log(data.tracks.items[0].album.artists[0].name);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].preview_url);
        console.log(data.tracks.items[0].album.name);

        song =
          data.tracks.items[0].album.artists[0].name +
          "\n" +
          data.tracks.items[0].name +
          "\n" +
          data.tracks.items[0].preview_url +
          "\n" +
          data.tracks.items[0].album.name;

        fs.appendFile("log.txt", song + divider, function(err) {
          if (err) throw err;
          // console.log("IT WORKED");
        });
      })
      .catch(function(err) {
        console.error("Error occurred: " + err);
      });

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
        movie =
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
          resp.data.Actors;

        fs.appendFile("log.txt", movie + divider, function(err) {
          if (err) throw err;
          // console.log("IT WORKED");
        });
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
    fs.readFile("./random.txt", "utf8", (err, resp) => {
      if (err) throw err;
      console.log(resp);
    });

    break;
}
