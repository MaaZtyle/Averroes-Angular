/**
 * Created by Maazouza on 07/05/2017.
 */



import {Component, Input, OnInit} from "@angular/core";
import {DossierMedical} from "../_models/dossierMedical";
import {VaccinService} from "../_services/vaccin.service";
import {Vaccin} from "../_models/vaccin";


@Component({

    selector: 'vaccins',
    moduleId: module.id,
    templateUrl: 'vaccin.component.html',

})


export class VaccinComponent {

    @Input()
    dossierMedical: DossierMedical;


    vaccinSelectionne: Vaccin;
    
    vaccins: Vaccin[];


    vaccin: Vaccin = new Vaccin;

    // variables temporaire pour pas modifier l'vaccin selectionnée du model, car sinon ca va modifier laliste
    // sans que la vaccin soit modifiée en base
    idVac: number;
    nomVac: string;
    descriptionVaccin: string;
    dateDernierVaccin: string;
    dateProchainVaccin: string;
    alertePatientVaccin = false;
    alerteMedecinVaccin = false;
    //pour cacher le bouton
    public deleted = false;

    messageOK ='';
    messageKO='';

    constructor(private vaccinService: VaccinService) { }

    // Réagir à la sélection d'un vaccin dans la liste
    onSelect(vaccin: Vaccin) {
        // vaccin selectionné

        this.vaccinSelectionne = vaccin;
        // Je recupère les valeurs de la vaccin selectionnée au click

        this.idVac=this.vaccinSelectionne.idVac;

        this.nomVac=this.vaccinSelectionne.nomVac;
        this.descriptionVaccin=this.vaccinSelectionne.descriptionVac;
        this.dateDernierVaccin=this.vaccinSelectionne.dateDernierVac;
        this.dateProchainVaccin=this.vaccinSelectionne.dateProchainVac;
        this.alertePatientVaccin = this.vaccinSelectionne.alertePatientVac;
        this.alerteMedecinVaccin = this.vaccinSelectionne.alerteMedecinVac;


       
    }
    
    getVaccins() {

        //console.log(dossierMedical.idDos);
        this.vaccinService.getVaccins(this.dossierMedical.idDos.toString())
            .subscribe(reponse => {
                this.vaccins = reponse;
                //console.log(this.maladies);
                
                

            })
    }

    UpdateVaccin() {

// je construis mon vaccin

        this.vaccin.idVac=this.idVac;
        this.vaccin.nomVac=this.nomVac;
        this.vaccin.descriptionVac=this.descriptionVaccin;
        this.vaccin.dateDernierVac=this.dateDernierVaccin;
        this.vaccin.alertePatientVac= this.alertePatientVaccin;
        this.vaccin.alertePatientVac= this.alerteMedecinVaccin;

        console.log(this.vaccin.idVac);

        this.resetMessage();
        this.vaccinService.updateVaccin(this.vaccin)
            .subscribe(result => {

                this.resetMessage();

                if (result === true) {

                    console.log(this.messageOK);

                    this.messageOK = "Vaccin modifié";
                    this.getVaccins();

                }
                else if (result === false) {
                    console.log(this.messageKO);
                    this.messageKO = "Vaccin non modifiée";
                }

            })


    }


    DeleteVaccin() {

   


        this.resetMessage();
        this.vaccinService.deleteVaccin(this.vaccinSelectionne.idVac)
            .subscribe(result => {

                this.resetMessage();

                if (result === true) {

                    this.vaccin.idVac=null;
                    this.vaccin.nomVac='';
                    this.vaccin.descriptionVac='';
                    this.vaccin.dateDernierVac='';
                    this.vaccin.alertePatientVac= false;
                    this.vaccin.alertePatientVac= false;

                    this.messageOK = "Vaccin supprimée";
                    this.deleted=true;
                    this.getVaccins();

                }
                else if (result === false) {

                    this.messageKO = "Vaccin non supprimée";
                }

            })



    }

    resetMessage(){
        this.messageOK ='';
        this.messageKO='';
        this.deleted=false;

    }

    ngOnChanges() {
        // reset vaccins
        this.getVaccins();
    }

    ngOnInit(){

        this.messageOK ='';
        this.messageKO='';
    }



}