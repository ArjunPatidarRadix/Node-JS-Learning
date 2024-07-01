const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirPath = path.join(__dirname, "../public"); // to manuplate the folder directory
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlers engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath); // if folder name is other than "views" then cset that path.
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath)); // Now the index.html will load whcih is inside the public folder

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Arjun",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Weather app",
    name: "Arjun",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Contact us",
    helpText: "Write us to get help",
    name: "Test user",
  });
});

// app.get("", (req, res) => {
//   res.send("<h1>Weather!</h1>");
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address is missing",
    });
  }
  console.log(req.query);

  geoCode(req.query.address, (error, data) => {
    console.log("error : ", error);
    console.log("data : ", data);

    if (error) {
      console.log(error);
      return res.send({
        error: error,
      });
    }

    // forecast(22.764351, 75.891151, (error, data) => {
    forecast(data.latitude, data.longitude, (forecasrError, forecastData) => {
      console.log("forecasrError : ", forecasrError);
      console.log("forecastData : ", forecastData);
      if (forecasrError) {
        console.log(forecasrError);
        return res.send({
          error: forecasrError,
        });
      }
      forecastData.location = data.location;
      return res.send(forecastData);
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Test user",
    errorMessage: "Help artical not found.",
  });
});

//the 404 page
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Test user",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
