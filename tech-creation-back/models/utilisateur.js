const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const utilisateurSchema = mongoose.Schema({
  identifiant: { type: String,  unique: true },
  password: { type: String,  },
  nom: { type: String,  },
  prenom: { type: String,  },
  lieuDeNaissance: { type: String,  },
  dateDeNaissance: { type: String,  },
  nationalite: { type: Array,  },
  sexe: { type: Array,  },
  adresse: { type: String,  },
  pays: { type: Array,  },
  codePostale: { type: String,  },
  ville: { type: String,  },
  telFixe: { type: String,  },
  telPortable: { type: String,  },
  email: { type: String,},
  souscription: { type: Array,  },
});

utilisateurSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Utilisateur', utilisateurSchema);