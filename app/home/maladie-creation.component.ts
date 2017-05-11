
/**
 * Created by Maazouza on 08/05/2017.
 */

import {Component, Input} from "@angular/core";
import {Maladie} from "../_models/maladie";
import {MaladieService} from "../_services/maladie.service";
import {DossierMedical} from "../_models/dossierMedical";

@Component({

    selector: 'maladie-creation',
    moduleId: module.id,

    templateUrl: 'maladie-creation.component.html',

})

export class MaladieCreationComponent {


    messageOK ='';
    messageKO='';

    maladie: Maladie = new Maladie();

    @Input()
    dossierMedical: DossierMedical;


    constructor(private maladieService: MaladieService) { }

    ajouterMaladie(maladie: Maladie) {


        console.log(this.messageOK );
        console.log(this.messageKO );
        maladie.idDos=this.dossierMedical.idDos;
        //console.log(maladie);
        this.maladieService.ajouterMaladie(maladie)
            .subscribe(result => {
                //console.log(result);
                this.resetMessage();
                if (result === true) {

                    this.messageOK = "Ajout Maladie ok";
                    this.maladie=new Maladie();



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


