const mongoose = require('mongoose');
const utilisateur = require('./utilisateur')
const Schema = mongoose.Schema;

const serveurMiningSchema = mongoose.Schema({
  idUtilisateur: {type: Schema.Types.ObjectId, ref: utilisateur},
  serveur: { type: String },
  nombre: { type: String },
  gainMois: { type: String },
});


module.exports = mongoose.model('ServeurMining', serveurMiningSchema);