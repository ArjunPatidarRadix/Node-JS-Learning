const {
  calculateTip,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
  add,
} = require("../src/math");

test("Should calculate total with tip", () => {
  const total = calculateTip(10, 0.3);
  expect(total).toBe(13);
});

test("Should calculate total with default tip", () => {
  const total = calculateTip(10);
  expect(total).toBe(12.5);
});

test("Should convert the fahrenheit To Celsius", () => {
  const res = fahrenheitToCelsius(32);
  expect(res).toBe(0);
});

test("Should convert the Celsius To fahrenheit", () => {
  const res = celsiusToFahrenheit(0);
  expect(res).toBe(32);
});

test("Should add two numbers", (done) => {
  add(2, 3).then((sum) => {
    expect(sum).toBe(5);
    done();
  });
});

test("Should add two numbers async/await", async () => {
  const sum = await add(10, 22);
  expect(sum).toBe(32);
});
