const request = require("request");

const geoCode = (address, callback) => {
  const add = encodeURIComponent(address);
  const geoCodeUrl =
    "https://api.positionstack.com/v1/forward?access_key=f5762b11f5584829852b29f7c45dd699&query=" +
    add +
    "&limit=1";

  request({ url: geoCodeUrl, json: true }, (error, response) => {
    //   console.log(response.body);
    if (error) {
      callback("Unable to connect to wether service", undefined);
    } else {
      const geoCodeData = response.body.data;
      if (geoCodeData) {
        console.log(geoCodeData);
        const latitude = geoCodeData[0].latitude;
        const longitude = geoCodeData[0].longitude;

        console.log("latitude is " + latitude + " longitude is " + longitude);

        callback(undefined, {
          latitude: latitude,
          longitude: longitude,
          location: geoCodeData[0].label,
        });
      } else {
        callback("Unable to find location", undefined);
      }
    }
  });
};

module.exports = geoCode;
