const app = require("./app");

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

const main = async () => {
  // const task = await Task.findById("630617c5d404dc15c40547dc");
  // await task.populate("owner");
  // // await task.populate([{ path: "owner" }]);
  // console.log(task.owner);
  /******************************** */
  // const user = await User.findById("630615a4e009f589d95d9050");
  // await user.populate("tasks");
  // console.log(user.tasks);
};
