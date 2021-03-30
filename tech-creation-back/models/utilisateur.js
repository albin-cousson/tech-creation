const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const utilisateurSchema = mongoose.Schema({
  identifiant: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  lieuDeNaissance: { type: String, required: true },
  dateDeNaissance: { type: String, required: true },
  nationalite: { type: Array, required: true },
  sexe: { type: Array, required: true },
  adresse: { type: String, required: true },
  pays: { type: Array, required: true },
  codePostale: { type: String, required: true },
  ville: { type: String, required: true },
  telFixe: { type: String, required: true },
  telPortable: { type: String, required: true },
  email: { type: String, required: true },
  souscription: { type: Array, required: true },
});

utilisateurSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Utilisateur', utilisateurSchema);