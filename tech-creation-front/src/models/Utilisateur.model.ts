export class UtilisateurModel {
    identifiant;
    password;
    nom;
    prenom;
    lieuDeNaissance;
    dateDeNaissance;
    nationalite;
    sexe;
    adresse;
    pays;
    codePostale;
    ville;
    telFixe;
    telPortable;
    email;
    souscription;
    constructor(identifiant, password, nom,  prenom, lieuDeNaissance, dateDeNaissance, nationalite, sexe, adresse, pays, codePostale, ville, telFixe, telPortable, email, souscription) {
        this.identifiant = identifiant;
        this.password = password;
        this.nom = nom;
        this.prenom= prenom;
        this.lieuDeNaissance = lieuDeNaissance;
        this.dateDeNaissance = dateDeNaissance;;
        this.nationalite = nationalite;
        this.sexe = sexe;
        this.adresse = adresse;
        this.pays = pays;
        this.codePostale = codePostale;
        this.ville = ville;
        this.telFixe = telFixe;
        this.telPortable = telPortable;
        this.email = email;
        this.souscription = souscription;
    }
}