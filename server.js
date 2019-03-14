const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
const API_KEY = "bc98cf87e108ffd8499852341c288ac0";
const ROOT_URL = "https://api.themoviedb.org/3";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/tv", (req, res) => {
  fetch(
    `${ROOT_URL}/discover/tv?api_key=${API_KEY}&sort_by=popularity.desc&page=1`
  )
    .then(result => result.json())
    .then(data => {
      res.send(data.results);
    });
});

app.get("/api/tv/:tvId", (req, res) => {
  fetch(`${ROOT_URL}/tv/${req.params.tvId}?api_key=${API_KEY}`)
    .then(result => result.json())
    .then(data => res.send(data));
});

app.get("/api/episodes/:tvId/:season_number", (req, res) => {
  fetch(
    `${ROOT_URL}/tv/${req.params.tvId}/season/${
      req.params.season_number
    }?api_key=${API_KEY}`
  )
    .then(result => result.json())
    .then(data => res.send(data.episodes));
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
