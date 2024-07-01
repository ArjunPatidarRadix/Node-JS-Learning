require("./../src/db/mongoose");
const User = require("./../src/models/user");

// User.findByIdAndUpdate("630470b32d10d8d869fbbb33", { age: 25 })
//   .then((user) => {
//     console.log("user : ", user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then((result) => {
//     console.log("result : ", result);
//   })
//   .catch((err) => {
//     console.log("err : ", err);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, {
    age,
  });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("630470b32d10d8d869fbbb33", 22)
  .then((count) => {
    console.log("count : ", count);
  })
  .catch((err) => {
    console.log("err : ", err);
  });
