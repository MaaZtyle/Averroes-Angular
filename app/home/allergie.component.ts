/**
 * Created by Maazouza on 07/05/2017.
 */



import {Component, Input, OnInit} from "@angular/core";
import {DossierMedical} from "../_models/dossierMedical";
import {AllergieService} from "../_services/allergie.service";
import {Allergie} from "../_models/allergie";


@Component({

    selector: 'allergies',
    moduleId: module.id,
    templateUrl: 'allergie.component.html',

})


export class AllergieComponent {

    @Input()
    dossierMedical: DossierMedical;

    allergieSelectionne: Allergie;

    // Maladie sélectionnée
    allergie: Allergie = new Allergie;
    
    // variables temporaire pour pas modifier l'allergie selectionnée du model, car sinon ca va modifier laliste
    // sans que la allergie soit modifiée en base
    idAll: number;
    designationAll: string;
    dateAppAll: string;
    descriptionAll: string;
    etatAll = false;

    //pour cacher le bouton
    public deleted = false;

    allergies: Allergie[];

    messageOK ='';
    messageKO='';

    constructor(private allergieService: AllergieService) { }

    // Réagir à la sélection d'une allergie dans la liste
    onSelect(allergie: Allergie) {
        // allergie selectionné

        this.allergieSelectionne = allergie;
        // Je recupère les valeurs de la allergie selectionnée au click

        this.idAll=this.allergieSelectionne.idAll;

        this.designationAll=this.allergieSelectionne.designationAll;
        this.dateAppAll=this.allergieSelectionne.dateAppAll;
        this.descriptionAll=this.allergieSelectionne.descriptionAll;
        this.etatAll = this.allergieSelectionne.etatAll;


        //console.log(this.allergieSelectionne);
    }

    getAllergies() {

        //console.log(dossierMedical.idDos);
        this.allergieService.getAllergies(this.dossierMedical.idDos.toString())
            .subscribe(reponse => {
                this.allergies = reponse;
                console.log(this.allergies);

            })
    }

    UpdateAllergie() {

// je construis mon allergie

        this.allergie.idAll=this.idAll;
        this.allergie.designationAll=this.designationAll;
        this.allergie.descriptionAll=this.descriptionAll;
        this.allergie.dateAppAll=this.dateAppAll;
        this.allergie.etatAll= this.etatAll;

        console.log(this.allergie.idAll);

      this.resetMessage();
        this.allergieService.updateAllergie(this.allergie)
            .subscribe(result => {

                this.resetMessage();

                if (result === true) {

                    console.log(this.messageOK);

                    this.messageOK = "Allergie modifiée";
                    this.getAllergies();

                }
                else if (result === false) {
                    console.log(this.messageKO);
                    this.messageKO = "Allergie non modifiée";
                }

            })


    }


    DeleteAllergie() {

        //this.allergie.idAll=this.allergieSelectionne.idAll;


        this.resetMessage();
        this.allergieService.deleteAllergie(this.allergieSelectionne.idAll)
            .subscribe(result => {

                this.resetMessage();

                if (result === true) {

                    this.allergieSelectionne.idAll=null;
                    this.allergieSelectionne.designationAll='';
                    this.allergieSelectionne.descriptionAll='';
                    this.allergieSelectionne.dateAppAll='';

                    this.messageOK = "Allergie supprimée";
                    this.deleted=true;
                    this.getAllergies();

                }
                else if (result === false) {

                    this.messageKO = "Allergie non supprimée";
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
        this.getAllergies();
    }

    ngOnInit(){

        this.messageOK ='';
        this.messageKO='';
    }




}