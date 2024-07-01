const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { userOne, userOneId, setUpDatabase } = require("./fixtures/db");

beforeEach(setUpDatabase);

test("should signup a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Test user",
      email: "test@yopmail.com",
      password: "test123",
    })
    .expect(201);

  //Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
  expect(response.body).toMatchObject({
    user: {
      name: "Test user",
      email: "test@yopmail.com",
    },
    token: user.tokens[0].token,
  });
  expect(user.password).not.toBe("test123");
});

test("should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test("should not login non-existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "wrong@yopmail.com",
      password: "123123123",
    })
    .expect(400);
});

test("Should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get profile for unAuthorized user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("Should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not delete profile for unAuthorized user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});
test("Should delete profile for Authorized user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test("Should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update valid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Test user 22",
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.name).toEqual("Test user 22");
});

test("Should not update invalid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: "India",
    })
    .expect(404);
});
