// const doWorkPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve([1, 2, 3, 4, 5]);
//     reject("Went wrong");
//   }, 2000);
// });

// doWorkPromise
//   .then((result) => {
//     console.log("Success! ", result);
//   })
//   .catch((error) => {
//     console.log("Error! ", error);
//   });

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
};

// add(1, 2)
//   .then((sum) => {
//     console.log("Success! ", sum);
//     add(sum, 5)
//       .then((result) => {
//         console.log("Success! 2 ", result);
//       })
//       .catch((error) => {
//         console.log("Error! ", error);
//       });
//   })
//   .catch((e) => {
//     console.log("Error! ", e);
//   });

add(1, 2)
  .then((sum) => {
    console.log("Success! ", sum);
    return add(sum, 5);
  })
  .then((sum2) => {
    console.log("Success!2 : ", sum2);
  });
