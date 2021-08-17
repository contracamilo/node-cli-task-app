const { green } = require("colors");
const Task = require("./task");

class Tasks {
  _list = {};

  constructor() {
    this._list = {};
  }

  get listToArray() {
    const taskList = [];
    Object.keys(this._list).forEach((key) => {
      const task = this._list[key];
      taskList.push(task);
    });
    return taskList;
  }

  createTask(desc = "") {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  loadTaskFromArray(tasks = []) {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  }

  printFinalList() {
    console.log();
    this.listToArray.forEach((task, index) => {
      const { description, completedDate } = this._list[task.id];
      const idx = `${++index}`.green;
      const state = completedDate ? "Completed".green : "Pending".red;

      const result = `${idx} ${description} :: ${state}`;
      console.log(result);
    });
  }

  printCompleted(completed = true) {
    console.log();

    let counter = 0;
    this.listToArray.forEach((task) => {
      const { description, completedDate } = this._list[task.id];
      const state = completedDate ? "Completed".green : "Pending".red;

      if (completed) {
        ++counter;
        if (completedDate)
          console.log(
            `${(counter + ".").green} ${description} :: Completed in ${
              completedDate.green
            }`
          );
      } else {
        ++counter;
        if (!completedDate)
          console.log(`${(counter + ".").green} ${description} :: ${state}`);
      }
    });
  }

  toggleCompleteTask(ids = []) {
    ids.forEach((id) => {
      const task = this._list[id];

      if (!task.completedDate) {
        task.completedDate = new Date().toISOString();
      }
    });

    this.listToArray.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completedDate = null;
      }
    });
  }

  deleteTask(id = "") {
    if (this._list[id]) {
      delete this._list[id];
    }
  }
}

module.exports = Tasks;
