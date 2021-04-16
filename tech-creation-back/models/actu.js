const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actuSchema = mongoose.Schema({
  nomDuRedacteur: { type: String },
  prenomDuRedacteur: { type: String },
  dateDeCreation: { type: String },
  imageUrl: { type: String },
  text: { type: String },
  like: { type: Number },
  commentaire: { type: Array },
});

module.exports = mongoose.model('Actu', actuSchema);