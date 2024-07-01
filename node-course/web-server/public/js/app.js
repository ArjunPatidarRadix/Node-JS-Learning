// console.log("Cliet side java script file");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  console.log("Testing!v:: ", location);
  message1.textContent = "Loading...";
  message2.textContent = "";
  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        message1.textContent = data.error;
      } else {
        console.log(data);
        message1.textContent = data.location;
        message2.textContent = `Temprature is ${data.temperature}°C feels like ${data.feelslike}°C \n ${data.forecast}, \n Humidity in air is ${data.humidity}`;
      }
    });
  });
});
