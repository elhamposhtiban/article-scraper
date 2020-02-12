const mongoose = require("mongoose");


const Schema = mongoose.Schema;
// Save a reference to the Schema constructor
const NoteSchema = new Schema({
  // `title` is of type String
  title: String,
  // `body` is of type String
  body: String
});


const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;