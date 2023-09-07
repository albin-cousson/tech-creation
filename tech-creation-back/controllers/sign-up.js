const Utilisateur = require('../models/utilisateur');
const Epargne = require('../models/epargne');
const ServeurMining = require('../models/serveurMining');
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
      .then(
        ()=>{
          souscription = req.body.souscription
          for (var key in souscription) {
            value = souscription[key];
            if(value==true) {
              if(key=="epargne"){
                const epargne = new Epargne({
                  idUtilisateur:utilisateur._id,
                  epargne:"",
                  pourcentage:"",
                  solde:"",
                  gainMois:""
                });
                epargne.save();
              }
              if(key=="serveurMining"){
                const serveurMining = new ServeurMining({
                  idUtilisateur:utilisateur._id,
                  serveur:"",
                  nombre:"",
                  gainMois:""
                });
                serveurMining.save();
              }
            }
          }
        })
      .catch(error => res.status(400).json({ error }));
};