const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actuSchema = mongoose.Schema({
  nomDuRedacteur: { type: String },
  prenomDuRedacteur: { type: String },
  imageDuRedacteurUrl: { type: String },
  dateDeCreation: { type: String },
  titre: { type: String },
  imageHeaderUrl: { type: String },
  textArticle: { type: String },
  imageArticleUrl: { type: Array },
  like: { type: Number },
  commentaire: { type: Array },
});

module.exports = mongoose.model('Actu', actuSchema);