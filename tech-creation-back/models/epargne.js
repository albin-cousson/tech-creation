const mongoose = require('mongoose');
const utilisateur = require('./utilisateur')
const Schema = mongoose.Schema;

const epargneSchema = mongoose.Schema({
  idUtilisateur: {type: Schema.Types.ObjectId, ref: utilisateur},
  epargne: { type: String },
  pourcentage: { type: String },
  solde: { type: String },
  gainMois: { type: String },
});


module.exports = mongoose.model('Epargne', epargneSchema);