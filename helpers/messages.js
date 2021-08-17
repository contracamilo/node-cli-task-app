require("colors");

const readline = require("readline");

const showMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log("=========================================".green);
    console.log("======= Please select an option =========".green);
    console.log("=========================================\n".green);

    console.log(`${"1".green}. Create task`);
    console.log(`${"2".green}. List tasks`);
    console.log(`${"3".green}. List Completed tasks`);
    console.log(`${"4".green}. List pending tasks`);
    console.log(`${"5".green}. Complete task`);
    console.log(`${"6".green}. Delete task`);
    console.log(`${"0".green}. Exit \n`);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Please select an option ", (opt) => {
      rl.close();
      resolve(opt);
    });
  });
};

const pause = () => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(`\n Press ${"ENTER".green} to continue \n`, (answer) => {
      readLine.close();
      resolve(answer);
    });
  });
};

module.exports = {
  showMenu,
  pause,
};
