export class ActuModel {
    nomDuRedacteur;
    prenomDuRedacteur;
    imageDuRedacteurUrl
    dateDeCreation;
    titre;
    imageHeaderUrl;
    textArticle;
    imageArticleUrl;
    like;
    commentaire;
    constructor(nomDuRedacteur, prenomDuRedacteur, imageDuRedacteurUrl, dateDeCreation, titre, imageHeaderUrl, textArticle, imageArticleUrl, like, commentaire) {
        this.nomDuRedacteur = nomDuRedacteur;
        this.prenomDuRedacteur = prenomDuRedacteur;
        this.imageDuRedacteurUrl = imageDuRedacteurUrl;
        this.dateDeCreation = dateDeCreation;
        this.titre = titre;
        this.imageHeaderUrl = imageHeaderUrl;
        this.textArticle = textArticle;
        this.imageArticleUrl = imageArticleUrl;
        this.like = like;
        this.commentaire = commentaire;
    }
}
