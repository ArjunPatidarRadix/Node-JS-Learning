const fs = require("fs");
const chalk = require("chalk");
const getNotes = function () {
  return "Success!";
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter(function (note) {
    return note.title === title;
  });

  // debugger; // We can add debugger as break point to debug the notes and run the command
  // node inspect app.js add --title="Courses" --body="too"

  if (duplicateNotes.length === 0) {
    const newData = {
      title: title,
      body: body,
    };

    notes.push(newData);

    console.log("notes added : ");
  } else {
    console.log("notes already takne : ");
  }
  console.log("notes", notes);

  saveNotes(notes);
};

const removeNote = (title) => {
  console.log("removeNote title : ", title);
  const notes = loadNotes();
  const filteredNotes = notes.filter(function (note) {
    return note.title !== title;
  });

  if (notes.length > filteredNotes.length) {
    console.log(chalk.green.inverse("Note removed"));
    saveNotes(filteredNotes);
  } else {
    console.log(chalk.red.inverse("No note found"));
  }
};

const listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.green.inverse("Your notes."));

  notes.forEach((note) => {
    console.log(note.title);
  });
};

const readNotes = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log(chalk.inverse(note.title));
  } else {
    console.log(chalk.red.inverse("Note not found"));
  }
  return note;
};

const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJsON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJson = dataBuffer.toString();
    const data = JSON.parse(dataJson);
    return data;
  } catch (error) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNotes: readNotes,
};
