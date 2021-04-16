export class ActuModel {
    nomDuRedacteur;
    prenomDuRedacteur;
    dateDeCreation;
    imageUrl;
    text;
    like;
    commentaire;
    constructor(nomDuRedacteur, prenomDuRedacteur, dateDeCreation, imageUrl, text, like, commentaire) {
        this.nomDuRedacteur = nomDuRedacteur;
        this.prenomDuRedacteur = prenomDuRedacteur;
        this.dateDeCreation = dateDeCreation;
        this.imageUrl = imageUrl;
        this.text = text;
        this.like = like;
        this.commentaire = commentaire;
    }
}