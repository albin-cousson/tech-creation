const Utilisateur = require('../models/utilisateur');
const bcrypt = require('bcrypt');

exports.createUser = (req, res, next) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const utilisateur = new Utilisateur({
        ...req.body
    });
    utilisateur.save()
      .then(() => res.status(201).json({ message: 'Inscription réussi'}))
      .catch(error => res.status(400).json({ error }));
};