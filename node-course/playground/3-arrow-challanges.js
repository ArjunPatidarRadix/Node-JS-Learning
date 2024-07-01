const tasks = {
  tasks: [
    {
      text: "Grocery shopping",
      completed: true,
    },
    {
      text: "Clean yard",
      completed: false,
    },
    {
      text: "File course",
      completed: false,
    },
  ],
  getTasksToDo() {
    const tasksToDo = this.tasks.filter((task) => {
      return task.completed === false;
    });
    return tasksToDo;
  },
};

console.log(tasks.getTasksToDo());
