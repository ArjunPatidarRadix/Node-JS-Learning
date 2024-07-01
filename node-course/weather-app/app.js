const forecast = require("./utils/forecast");
const geoCode = require("./utils/geocode");

console.log(process.argv);

const address = process.argv[2];

if (!address) {
  console.log("Please provide a valid address");
} else {
  geoCode(address, (error, data) => {
    console.log("error : ", error);
    console.log("data : ", data);

    if (error) {
      return console.log(error);
    }

    // forecast(22.764351, 75.891151, (error, data) => {
    forecast(data.latitude, data.longitude, (forecasrError, forecastData) => {
      console.log("forecasrError : ", forecasrError);
      console.log("forecastData : ", forecastData);
      if (forecasrError) {
        return console.log(forecasrError);
      }
    });
  });
}
