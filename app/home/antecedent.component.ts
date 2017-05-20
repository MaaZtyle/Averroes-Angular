/**
 * Created by Maazouza on 07/05/2017.
 */



import {Component, Input, OnInit} from "@angular/core";
import {DossierMedical} from "../_models/dossierMedical";
import {AntecedentService} from "../_services/antecedent.service";
import {Antecedent} from "../_models/antecedent";



@Component({

    selector: 'antecedents',
    moduleId: module.id,
    templateUrl: 'antecedent.component.html',

})


export class AntecedentComponent {

    @Input()
    dossierMedical: DossierMedical;


    antecedents: Antecedent[];

    antecedentSelectionne: Antecedent;

    antecedent: Antecedent = new Antecedent;

    // variables temporaire pour pas modifier l'antecedent selectionnée du model, car sinon ca va modifier laliste
    // sans que l'antecedent soit modifiée en base

    idAnt: number;
    dateAnt: string;
    descriptionAnt: string;
    commentaireAnt: string;
    sujetAnt: string;

    //pour cacher le bouton
    public deleted = false;

    messageOK ='';
    messageKO='';


    constructor(private antecedentService: AntecedentService) { }

    // Réagir à la sélection d'une allergie dans la liste
    onSelect(antecedent: Antecedent) {
        // antecedent selectionné

        this.antecedentSelectionne = antecedent;
        // Je recupère les valeurs de la antecedent selectionnée au click

        this.idAnt=this.antecedentSelectionne.idAnt;
        this.descriptionAnt=this.antecedentSelectionne.descriptionAnt;
        this.dateAnt=this.antecedentSelectionne.dateAnt;
        this.commentaireAnt=this.antecedentSelectionne.commentaireAnt;
        this.sujetAnt=this.antecedentSelectionne.sujetAnt;


    }

    getAntecedents() {

        //console.log(dossierMedical.idDos);
        this.antecedentService.getAntecedents(this.dossierMedical.idDos.toString())
            .subscribe(reponse => {
                this.antecedents = reponse;
                console.log(this.antecedents);

            })
    }

    UpdateAntecedent() {

// je construis mon antecedent

        this.antecedent.idAnt=this.idAnt;
        this.antecedent.descriptionAnt=this.descriptionAnt;
        this.antecedent.dateAnt=this.dateAnt;
        this.antecedent.commentaireAnt=this.commentaireAnt;
        this.antecedent.sujetAnt= this.sujetAnt;


      //  console.log(this.antecedent.idAnt);

        this.resetMessage();
        this.antecedentService.updateAntecedent(this.antecedent)
            .subscribe(result => {

                this.resetMessage();

                if (result === true) {

                    console.log(this.messageOK);

                    this.messageOK = "Antécedent modifiée";
                    this.getAntecedents();

                }
                else if (result === false) {
                    console.log(this.messageKO);
                    this.messageKO = "Antécedent non modifiée";
                }

            })


    }


    DeleteAntecedent() {



        this.resetMessage();
        this.antecedentService.deleteAntecedent(this.antecedentSelectionne.idAnt)
            .subscribe(result => {

                this.resetMessage();

                if (result === true) {

                    this.antecedentSelectionne.idAnt=null;
                    this.antecedentSelectionne.descriptionAnt='';
                    this.antecedentSelectionne.dateAnt='';
                    this.antecedentSelectionne.commentaireAnt='';
                    this.antecedentSelectionne.commentaireAnt='';
                    this.antecedent.sujetAnt='';


                    this.messageOK = "Antécédent supprimée";
                    this.deleted=true;
                    this.getAntecedents();

                }
                else if (result === false) {

                    this.messageKO = "Antécédent non supprimé";
                }

            })



    }

    resetMessage(){
        this.messageOK ='';
        this.messageKO='';
        this.deleted=false;

    }

    ngOnChanges() {
        // reset allergies
        this.getAntecedents();
    }

    ngOnInit() {
        // reset antecédents
        this.getAntecedents();
    }


}