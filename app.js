require("colors");
console.clear();

const {
  iqMenu,
  iqPause,
  readInput,
  listDeleteTask,
  confirm,
  showListChecklist,
} = require("./helpers/inquirer");
const { saveDB, readDB } = require("./helpers/dbActions");
const Tasks = require("./models/tasks");

const main = async (params) => {
  let opt = "";
  const tasks = new Tasks();

  const dbTask = readDB();

  if (dbTask) {
    tasks.loadTaskFromArray(dbTask);
  }

  do {
    opt = await iqMenu();

    switch (opt) {
      case "1":
        const desc = await readInput("Description: ");
        tasks.createTask(desc);
        break;
      case "2":
        tasks.printFinalList();
        break;
      case "3":
        tasks.printCompleted(true);
        break;
      case "4":
        tasks.printCompleted(false);
        break;
      case "5":
        const ids = await showListChecklist(tasks.listToArray);
        tasks.toggleCompleteTask(ids);
        break;
      case "6":
        const id = await listDeleteTask(tasks.listToArray);

        if (id !== 0) {
          const ok = await confirm("Are you sure?");

          if (ok) {
            tasks.deleteTask(id);
            console.log(`Task Deleted`.red);
          }
        }
        break;
      default:
        break;
    }

    saveDB(tasks.listToArray);

    if (opt !== "0") await iqPause();
  } while (opt !== "0");
};

main();
