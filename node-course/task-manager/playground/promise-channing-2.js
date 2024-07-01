require("./../src/db/mongoose");
const Task = require("./../src/models/task");

// Task.findByIdAndDelete("63046ee19186dc61bbd0dfa3")
//   .then((task) => {
//     console.log("user : ", task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((result) => {
//     console.log("result : ", result);
//   })
//   .catch((err) => {
//     console.log("err : ", err);
//   });

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount("6304b161484158561752cd8d")
  .then((count) => {
    console.log("count : ", count);
  })
  .catch((err) => {
    console.log("err : ", err);
  });
