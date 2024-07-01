const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=3da71295fd21b2c7a79a9e237aeb7ddf&query=" +
    latitude +
    "," +
    longitude;
  // "http://api.weatherstack.com/current?access_key=3da71295fd21b2c7a79a9e237aeb7ddf&query=Mandsaur";

  request({ url: url, json: true }, (error, response) => {
    console.log("forecast response :", response.body);
    console.log(error);
    if (error) {
      callback("Unable to connect to wether service", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      // console.log(response.body);
      //   console.log(
      //     `Is is currently ${response.body.current.temperature}, Is feels like ${response.body.current.feelslike} degress out`
      //   );
      callback(undefined, {
        temperature: response.body.current.temperature,
        feelslike: response.body.current.feelslike,
        location: response.body.location.name,
        forecast: response.body.current.weather_descriptions,
        humidity: response.body.current.humidity,
      });
    }
  });
};

module.exports = forecast;
