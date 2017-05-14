/**
 * Created by Maazouza on 04/05/2017.
 */


import {Component, Input, OnInit} from "@angular/core";
import {DossierMedical} from "../_models/dossierMedical";
import {MaladieService} from "../_services/maladie.service";
import {Maladie} from "../_models/maladie";


@Component({

    selector: 'maladies',
    moduleId: module.id,
    templateUrl: 'maladie.component.html',

})


export class MaladieComponent {

    @Input()
    dossierMedical: DossierMedical;

    // variables temporaire pour pas modifier la maladie selectionnée du model, car sinon ca va modifier laliste
    // sans que la maladie soit modifiée en base
    idMal: number;
    designationMal: string;
    dateAppMal: string;
    descriptionMal: string;


    //pour cacher le bouton
    public deleted = false;


    // Maladie sélectionnée
    maladie: Maladie = new Maladie;

    maladieSelectionne: Maladie;

    maladies: Maladie[];

    messageOK ='';
    messageKO='';


    constructor(private maladieService: MaladieService) { }

    // Réagir à la sélection d'une maladie dans la liste
    onSelect(maladie: Maladie) {
        // maladie selectionné

        this.maladieSelectionne = maladie;
        // Je recupère les valeurs de la maladie selectionnée au click
        this.idMal=this.maladieSelectionne.idMal;
        this.designationMal=this.maladieSelectionne.designationMal;
        this.dateAppMal=this.maladieSelectionne.dateAppMal;
        this.descriptionMal=this.maladieSelectionne.designationMal;
        this.deleted=false;
        this.resetMessage();


        //console.log(this.maladieSelectionne);
    }

    getMaladies() {

        //console.log(dossierMedical.idDos);
        this.maladieService.getMaladies(this.dossierMedical.idDos.toString())
            .subscribe(reponse => {
                this.maladies = reponse;
                console.log(this.maladies);

            })
    }

    UpdateMaladie() {

// je construis ma maladie
        this.maladie.idMal=this.idMal;
        this.maladie.designationMal=this.designationMal;
        this.maladie.descriptionMal=this.descriptionMal;
        this.maladie.dateAppMal=this.dateAppMal;

        /*console.log(this.maladie.idMal);
        console.log(this.maladie.designationMal);
        console.log(this.maladie.descriptionMal);
        console.log(this.maladie.dateAppMal);

*/




        this.maladieService.updateMaladie(this.maladie)
            .subscribe(result => {



                if (result === true) {



                    this.messageOK = "Maladie modifiée";
                    this.getMaladies();

                }
                else if (result === false) {

                    this.messageKO = "Maladie non modifiée";
                }

            })


    }


    DeleteMaladie() {

        //this.maladie.idMal=this.maladieSelectionne.idMal;



        this.maladieService.deleteMaladie(this.maladieSelectionne.idMal)
            .subscribe(result => {



                if (result === true) {


                    this.idMal=null;
                    this.designationMal='';
                    this.dateAppMal='';
                    this.descriptionMal='';



                    this.messageOK = "Maladie supprimée";
                    this.deleted=true;
                    this.getMaladies();

                }
                else if (result === false) {

                    this.messageKO = "Maladie non supprimée";
                }

            })



    }

    resetMessage(){
        this.messageOK ='';
        this.messageKO='';
        this.deleted=false;


    }

    ngOnChanges() {
        // reset maladies
        this.getMaladies();
    }

    ngOnInit(){




    }


}