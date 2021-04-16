const Actu = require('../models/actu');
const ImageArticle = require('../models/imageArticle');
const fs = require('fs');

exports.getActu = (req, res, next) => {
    Actu.find()
    .then(actu => res.status(200).json(actu))
    .catch(error => res.status(404).json({ error }));
};

exports.addArticle = (req, res, next) => {
    const actuObject = JSON.parse(req.body.actu);
    const actu = new Actu({
        ...actuObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    actu.save()
    .then(() => res.status(201).json({message: "ok"}))
    .catch(error => res.status(400).json({ error }));
}

exports.addImageArticle = (req, res, next) => {
    const imageArticle = new ImageArticle({
        imageArticle: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    imageArticle.save()
    .then(() => res.status(201).json({imageArticle: imageArticle.imageArticle}))
    .catch(error => res.status(400).json({ error }));
}

exports.putArticle = (req, res, next) => {
    const actuObject = req.file ?
    {
      ...JSON.parse(req.body.actu),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Actu.updateOne({ _id: req.params.id }, { ...actuObject, _id: req.params.id })
    .then((actu) => res.status(200).json(actu))
    .catch(error => res.status(400).json({ error }));
}

exports.deleteArticle = (req, res, next) => {
    Actu.findOne({ _id: req.params.id })
    .then(actu => {
      const filename = actu.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Actu.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
}