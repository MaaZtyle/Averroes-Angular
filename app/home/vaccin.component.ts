/**
 * Created by Maazouza on 07/05/2017.
 */



import {Component, Input, OnInit} from "@angular/core";
import {DossierMedical} from "../_models/dossierMedical";
import {VaccinService} from "../_services/vaccin.service";
import {Vaccin} from "../_models/vaccin";
import moment = require("moment/moment");



@Component({

    selector: 'vaccins',
    moduleId: module.id,
    templateUrl: 'vaccin.component.html',

})


export class VaccinComponent {

    @Input()
    dossierMedical: DossierMedical;
    vaccinsModel =[

        {nom: 'diphtérie', rappel:5},
        {nom:'tétanos', rappel:2},
        {nom:'grippe', rappel:3},
        {nom:'poliomyélite', rappel:4},
        {nom:'fièvre jaune', rappel:5},
        {nom:'autre', rappel:6} ];


    vaccinSelectionne: any;
    vaccinModelSelectionne: any;


    
    vaccins: Vaccin[];
    vaccinsArchives: Vaccin[];


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

    constructor(private vaccinService: VaccinService) {


    }

    // Réagir à la sélection d'un vaccin dans la liste
    onSelect(vaccin: Vaccin) {
        // vaccin selectionné

        this.vaccinSelectionne = vaccin;
        // Je recupère les valeurs de la vaccin selectionnée au click

        this.idVac=this.vaccinSelectionne.idVac;

        this.nomVac=this.vaccinSelectionne.nomVac;

        //console.log( this.vaccinModelSelectionne);
        //console.log( this.vaccinSelectionne.descriptionVac);
        // pour chercher dans mon model le nom du vaccin
        this.vaccinModelSelectionne = this.vaccinsModel.find(c => c.nom == this.nomVac);

        this.descriptionVaccin=this.vaccinSelectionne.descriptionVac;

         var dateDernierVaccin= moment(this.vaccinSelectionne.dateDernierVac,"DD-MM-YYYY");
         var dateProchainVaccin= moment(this.vaccinSelectionne.dateProchainVac,"DD-MM-YYYY");
        //console.log(this.vaccinSelectionne.dateDernierVac);
        //console.log(this.vaccinSelectionne.dateProchainVac);

        /*if(this.vaccinModelSelectionne === undefined){
            console.log( vaccin.dateProchainVac);}

        else {
            console.log(this.vaccinModelSelectionne);
            var dateProchainVaccin = dateDernierVaccin.add(this.vaccinModelSelectionne.rappel, 'd');
            console.log(dateProchainVaccin);
        }
        //var dateProchainVaccin = dateDernierVaccin.add(this.vaccinModelSelectionne.rappel, 'd');
*/

        this.dateDernierVaccin=dateDernierVaccin.format('YYYY-MM-DD');
          this.dateProchainVaccin=dateProchainVaccin.format('YYYY-MM-DD');

        this.alertePatientVaccin = this.vaccinSelectionne.alertePatientVac;
        this.alerteMedecinVaccin = this.vaccinSelectionne.alerteMedecinVac;


       
    }

    onSelect2(vaccinModelSelectionne: Vaccin){


     // a la selection dun nouvell emaladie, je recalcule la date de fin

        var dateDernierVaccin = moment(this.dateDernierVaccin);
        var dateProchainVaccin = dateDernierVaccin.add(this.vaccinModelSelectionne.rappel, 'd');
        this.dateProchainVaccin = dateProchainVaccin.format('YYYY-MM-DD');


    }
    
    getVaccins() {

        //console.log(dossierMedical.idDos);
        this.vaccinService.getVaccins(this.dossierMedical.idDos.toString())
            .subscribe(reponse => {
                this.vaccins = reponse;
                //console.log(this.maladies);
                
                

            })
    }

    getVaccinsArchives() {

        //console.log(dossierMedical.idDos);
        this.vaccinService.getVaccinsArchives(this.dossierMedical.idDos.toString())
            .subscribe(reponse => {
                this.vaccinsArchives = reponse;

                console.log(this.vaccinsArchives);



            })
    }

    UpdateVaccin() {

// je construis mon vaccin

        this.vaccin.idVac=this.idVac;
        this.vaccin.nomVac=this.vaccinModelSelectionne.nom;
        this.vaccin.descriptionVac=this.descriptionVaccin;

        console.log(this.dateDernierVaccin);
        console.log(this.dateProchainVaccin);

        var dateDernierVaccin= moment(this.dateDernierVaccin);
        var dateProchainVaccin= moment(this.dateProchainVaccin);



        this.vaccin.dateDernierVac=dateDernierVaccin.format('DD-MM-YYYY');
        this.vaccin.dateProchainVac=dateProchainVaccin.format('DD-MM-YYYY');

        this.vaccin.alertePatientVac= this.alertePatientVaccin;
        this.vaccin.alerteMedecinVac= this.alerteMedecinVaccin;






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


    ArchiveVaccin() {

        this.vaccinSelectionne.idDos = this.dossierMedical.idDos;
        console.log(this.vaccinSelectionne);



        this.vaccinService.archiveVaccin(this.vaccinSelectionne)
            .subscribe(result => {


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

                    this.messageOK = "Vaccin supprimé";
                    this.deleted=true;
                    this.getVaccins();

                }
                else if (result === false) {

                    this.messageKO = "Vaccin non supprimé";
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
        this.getVaccinsArchives();
    }

    ngOnInit(){

        this.messageOK ='';
        this.messageKO='';
    }



}