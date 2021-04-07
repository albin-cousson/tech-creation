const Utilisateur = require('../models/utilisateur');
const Epargne = require('../models/epargne');
const ServeurMining = require('../models/serveurMining');

exports.getUser = (req, res, next) => {
    Utilisateur.findOne({ _id: req.body.userId })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));
};
   
exports.getEpargne = (req, res, next) => {
    Epargne.findOne({ idUtilisateur: req.body.userId })
    .then(epargne => res.status(200).json(epargne))
    .catch(error => res.status(404).json({ error }));
};

exports.getServeurMining = (req, res, next) => {
    ServeurMining.findOne({ idUtilisateur: req.body.userId })
    .then(serveurMining => res.status(200).json(serveurMining))
    .catch(error => res.status(404).json({ error }));
};