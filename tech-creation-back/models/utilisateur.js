const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const utilisateurSchema = mongoose.Schema({
  identifiant: { type: String, require:true,  unique: true },
  password: { type: String, require:true, },
  nom: { type: String, require:true, },
  prenom: { type: String, require:true, },
  lieuDeNaissance: { type: String, require:true, },
  dateDeNaissance: { type: String, require:true, },
  nationalite: { type: Array, require:true, },
  sexe: { type: Array, require:true, },
  adresse: { type: String, require:true, },
  pays: { type: Array, require:true, },
  codePostale: { type: String, require:true, },
  ville: { type: String, require:true, },
  telFixe: { type: String, require:true, },
  telPortable: { type: String, require:true, },
  email: { type: String, require:true, },
  souscription: { type: Array, require:true, },
});

utilisateurSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Utilisateur', utilisateurSchema);