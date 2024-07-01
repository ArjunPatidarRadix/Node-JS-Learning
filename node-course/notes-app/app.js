const chalk = require("chalk");
var validator = require("validator");
const notes = require("./notes");

//yargs
const yargs = require("yargs");

// Customize yargs bersion
yargs.version("1.1.0");

// Create add command

yargs.command({
  command: "add",
  describe: "Add a new project",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    console.log("Adding a new note...", argv.title);
    console.log("Adding a new note...", argv.body);
    notes.addNote(argv.title, argv.body);
  },
});

//Remove command
yargs.command({
  command: "remove",
  describe: "remove a new project",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    console.log("Removing a new note...");
    notes.removeNote(argv.title);
  },
});

// Create list command

yargs.command({
  command: "list",
  describe: "List all notes",
  handler() {
    console.log("Listing all notes...");
    notes.listNotes();
  },
});

//Read command

yargs.command({
  command: "read",
  describe: "Reading a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(agrv) {
    console.log("Reading a note...");
    notes.readNotes(agrv.title);
  },
});

yargs.parse();

// console.log(process.argv);
// console.log(yargs.argv);

//create a command

//
//
//
// const msg = getNotes();

// console.log(chalk.green(msg));

// const command = process.argv[2];

// console.log(process.argv);

// if (command === "add") {
//   console.log("Adding note!");
// } else if (command === "remove") {
//   console.log("Removing note!");
// }

//Use the chalk library in yout project to constomize the console log color

// console.log(validator.isEmail("ar@gmail.com"));
// console.log(validator.isURL(""));

// const fs = require("fs");
// const add = require("./utils");
// fs.writeFileSync("notes.txt", "My name is arjun \n");
// fs.appendFileSync("notes.txt", "My last name is patidar");
// const sum = add(2, 4);
// console.log(sum);
