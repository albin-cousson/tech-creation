const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageArticleSchema = mongoose.Schema({
  imageArticle: { type: String },
});

module.exports = mongoose.model('ImageArticle', imageArticleSchema);