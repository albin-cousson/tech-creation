const Utilisateur = require('../models/utilisateur');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = (req, res, next) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const utilisateur = new Utilisateur({
        ...req.body
    });
    utilisateur.save()
      .then(() => res.status(201).json({
        userId: utilisateur._id,
        token:  jwt.sign(
          { userId: utilisateur._id },
          'RANDOM_TOKEN_SECRET',
          { expiresIn: '1h' }
        )
      }))
      .catch(error => res.status(400).json({ error }));
};