
/**
 * Created by Maazouza on 08/05/2017.
 */

import {Component, Input} from "@angular/core";
import {Allergie} from "../_models/allergie";
import {AllergieService} from "../_services/allergie.service";
import {DossierMedical} from "../_models/dossierMedical";

@Component({

    selector: 'allergie-creation',
    moduleId: module.id,

    templateUrl: 'allergie-creation.component.html',

})

export class AllergieCreationComponent {


    messageOK ='';
    messageKO='';

    allergie: Allergie = new Allergie();



    @Input()
    dossierMedical: DossierMedical;


    constructor(private allergieService: AllergieService) { }

    ajouterAllergie(allergie: Allergie) {



        console.log(this.allergie.dateAppAll );
        console.log(this.allergie.etatAll);
        console.log(this.allergie.descriptionAll );
        console.log(this.allergie.designationAll );

        allergie.idDos=this.dossierMedical.idDos;

        this.resetMessage();
        //console.log(maladie);
        this.allergieService.ajouterAllergie(allergie)
            .subscribe(result => {
                //console.log(result);

                if (result === true) {

                    this.messageOK = "Ajout Allergie ok";
                    this.allergie=new Allergie();
                    this.allergie.etatAll=false;



                }

                else if (result === false) {

                    this.messageKO = "Erreur d'ajout";
                }
            })




    }

    resetMessage(){
        this.messageOK ='';
        this.messageKO='';

    }



    ngOnInit(){
        this.messageOK ='';
        this.messageKO='';
        this.allergie.etatAll=false;



    }



}


