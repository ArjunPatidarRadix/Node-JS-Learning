const https = require("https");
const geoCodeUrl =
  "https://api.weatherstack.com/current?access_key=3da71295fd21b2c7a79a9e237aeb7ddf&query=Mandsaur";

const request = https.request(geoCodeUrl, (response) => {
  let data = "";
  response.on("data", (chunk) => {
    console.log(chunk.toString());
  });

  response.on("end", () => {});
});

request.end();
