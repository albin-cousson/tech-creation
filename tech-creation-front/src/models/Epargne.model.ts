export class EpargneModel {
    epargne;
    pourcentage;
    solde;
    gainMois;
    constructor(epargne, pourcentage, solde, gainMois) {
        this.epargne = epargne;
        this.pourcentage = pourcentage;
        this.solde = solde;
        this.gainMois = gainMois;
    }
}