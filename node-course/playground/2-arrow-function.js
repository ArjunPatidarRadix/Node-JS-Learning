// const sqaure = function (x) {
//   return x * x;
// };

// const sqaure = (x) => {
//   return x * x;
// };

// console.log(sqaure(3));

const event = {
  name: "Birthday party",
  gusestList: ["Andrew", "Jen", "Steve"],
  printGuestList() {
    console.log("Guest list for " + this.name);
    this.gusestList.forEach((guest) => {
      console.log(guest + " is attending " + this.name);
    });
  },
};

event.printGuestList();
