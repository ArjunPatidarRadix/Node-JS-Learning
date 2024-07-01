// setTimeout(() => {
//   console.log("Two seconds are up");
// }, 2000);

// const names = ["Steve", "Jarvis", "Bruce", "Natasha"];

// const shortNames = names.filter((name) => {
//   return name.length <= 4;
// });

// const geoCode = (address, callback) => {
//   setTimeout(() => {
//     const data = {
//       latitude: 12.343434,
//       longitude: -23.3432,
//     };
//     callback(data);
//   }, 2000);
// };

// geoCode("Mandsaur", (data) => {
//   console.log("Data : ", data);
// });

// const add = (first, second, callback) => {
//   setTimeout(() => {
//     const sum = first + second;
//     callback(sum);
//   }, 1000);
// };

// add(1, 2, (sum) => {
//   console.log(sum);
// });

const doWorkCallback = (callback) => {
  setTimeout(() => {
    callback(undefined, [1, 2, 3, 4, 5]);
  }, 2000);
};

doWorkCallback((error, result) => {
  if (error) {
    return console.log(error);
  }
  console.log(result);
});
