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
        imageDuRedacteurUrl: `${req.protocol}://${req.get('host')}/images/${req.files[0].filename}`,
        imageHeaderUrl: `${req.protocol}://${req.get('host')}/images/${req.files[1].filename}`
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
    // if(req.body.image==undefined){
    //     Actu.findOne({ _id: req.params.id })
    //     .then(actu => {
    //         const filenameImageDuRedacteurUrl = actu.imageDuRedacteurUrl.split('/images/')[1];
    //         fs.unlink(`images/${filenameImageDuRedacteurUrl}`, () => {});
    //         const filenameImageHeaderUrl = actu.imageHeaderUrl.split('/images/')[1];
    //         fs.unlink(`images/${filenameImageHeaderUrl}`, () => {});
    //     })
    //     .catch(error => res.status(500).json({ error }));
    // }
    if(req.files[0] != undefined && req.files[1] == undefined ){
        const actuObject = 
        {
            ...JSON.parse(req.body.actu),
            imageDuRedacteurUrl: `${req.protocol}://${req.get('host')}/images/${req.files[0].filename}`,
            imageHeaderUrl: req.body.imageHeaderUrl
        }
        Actu.updateOne({ _id: req.params.id }, { ...actuObject, _id: req.params.id })
            .then((actu) => res.status(200).json({ actu }))
            .catch(error => res.status(400).json({ error }));
    }
    if(req.files[0] == undefined && req.files[1] != undefined ){
        const actuObject = 
        {
            ...JSON.parse(req.body.actu),
            imageDuRedacteurUrl: req.body.imageDuRedacteurUrl,
            imageHeaderUrl: `${req.protocol}://${req.get('host')}/images/${req.files[0].filename}`
        }
        Actu.updateOne({ _id: req.params.id }, { ...actuObject, _id: req.params.id })
            .then((actu) => res.status(200).json({ actu }))
            .catch(error => res.status(400).json({ error }));
    }
    const actuObjectTwo = req.files[0] == undefined && req.files[1] != undefined ?
    {
        ...JSON.parse(req.body.actu),
        imageDuRedacteurUrl: req.body.imageDuRedacteurUrl,
        imageHeaderUrl: `${req.protocol}://${req.get('host')}/images/${req.files[1].filename}`
    } : { 
        ...JSON.parse(req.body.actu),
        imageDuRedacteurUrl: `${req.protocol}://${req.get('host')}/images/${req.files[0].filename}`,
        imageHeaderUrl: req.body.imageHeaderUrl
    };
    const actuObjectOneAndTwo = req.files[0] != undefined && req.files[1] != undefined ?
    {
        ...JSON.parse(req.body.actu),
        imageDuRedacteurUrl: `${req.protocol}://${req.get('host')}/images/${req.files[0].filename}`,
        imageHeaderUrl: `${req.protocol}://${req.get('host')}/images/${req.files[1].filename}`
    } : { 
        ...JSON.parse(req.body.actu),
        imageDuRedacteurUrl: req.body.imageDuRedacteurUrl,
        imageHeaderUrl: req.body.imageHeaderUrl
    };
}

exports.deleteArticle = (req, res, next) => {
    Actu.findOne({ _id: req.params.id })
    .then(actu => {
      const filenameImageDuRedacteurUrl = actu.imageDuRedacteurUrl.split('/images/')[1];
      const filenameImageHeaderUrl = actu.imageHeaderUrl.split('/images/')[1];
      fs.unlink(`images/${filenameImageDuRedacteurUrl}`, () => {
        fs.unlink(`images/${filenameImageHeaderUrl}`, () => {
            Actu.deleteOne({ _id: req.params.id }) 
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      });
    })
    .catch(error => res.status(500).json({ error }));
}