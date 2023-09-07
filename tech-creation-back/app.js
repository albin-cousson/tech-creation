const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const signUpRoute = require('./routes/sign-up')
const signInRoute = require('./routes/sign-in')
const userSpaceRoute = require('./routes/user-space')
const actuRoute = require('./routes/actu')
 
const app = express();

mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

app.use('/api/sign-up', signUpRoute);
app.use('/api/sign-in', signInRoute);
app.use('/api/souscription', userSpaceRoute);
app.use('/api/actu', actuRoute);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app; 