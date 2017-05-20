
/**
 * Created by Maazouza on 08/05/2017.
 */

import {Component, Input} from "@angular/core";
import {Antecedent} from "../_models/antecedent";
import {AntecedentService} from "../_services/antecedent.service";
import {DossierMedical} from "../_models/dossierMedical";

@Component({

    selector: 'antecedent-creation',
    moduleId: module.id,

    templateUrl: 'antecedent-creation.component.html',

})

export class AntecedentCreationComponent {


    messageOK ='';
    messageKO='';

    antecedent: Antecedent = new Antecedent();



    @Input()
    dossierMedical: DossierMedical;


    constructor(private antecedentService: AntecedentService) { }

    ajouterAntecedent(antecedent: Antecedent) {





        antecedent.idDos=this.dossierMedical.idDos;

        this.resetMessage();
        //console.log(maladie);
        this.antecedentService.ajouterAntecedent(antecedent)
            .subscribe(result => {
                //console.log(result);

                if (result === true) {

                    this.messageOK = "Ajout Antecedent ok";
                    this.antecedent=new Antecedent();




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




    }



}


