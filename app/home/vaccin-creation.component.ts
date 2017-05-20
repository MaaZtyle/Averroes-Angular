/**
 * Created by Maazouza on 18/05/2017.
 */



import {Component, Input} from "@angular/core";
import {Vaccin} from "../_models/vaccin";
import {VaccinService} from "../_services/vaccin.service";
import {DossierMedical} from "../_models/dossierMedical";
import * as moment from 'moment/moment';
import {VaccinModel} from "../_models/vaccinModel";



@Component({

    selector: 'vaccin-creation',
    moduleId: module.id,

    templateUrl: 'vaccin-creation.component.html',

})

export class VaccinCreationComponent {


    messageOK ='';
    messageKO='';
    // liste des vaccins



    vaccinsModel =[

        {nom: 'diphtérie', rappel:1},
        {nom:'tétanos', rappel:2},
        {nom:'grippe', rappel:3},
        {nom:'poliomyélite', rappel:4},
        {nom:'fièvre jaune', rappel:5},
        {nom:'autre', rappel:6} ];



    vaccinModelSelectionne;

    vaccin: Vaccin = new Vaccin();



    @Input()
    dossierMedical: DossierMedical;


    constructor(private vaccinService: VaccinService) { }

    ajouterVaccin(vaccin: Vaccin) {

        vaccin.idDos=this.dossierMedical.idDos;

        this.resetMessage();


        //vaccin.nomVac= this.vaccinModelSelectionne.nom;
        //console.log(vaccin.dateDernierVac);

        //var dateFormat = moment(vaccin.dateDernierVac).format("DD-MM-YYYY");

        console.log(this.vaccinModelSelectionne.nom)       // var newDateObj = moment(dateFormat).add( ,'days').calendar();
        console.log(this.vaccinModelSelectionne.rappel)

        console.log(newDateObj);
        this.vaccinService.ajouterVaccin(vaccin)
            .subscribe(result => {
                //console.log(result);

                if (result === true) {

                    this.messageOK = "Ajout Vaccin ok";
                    this.vaccin=new Vaccin();
                    this.vaccin.alertePatientVac=false;
                    this.vaccin.alerteMedecinVac=false;



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
        this.vaccin.alertePatientVac=false;
        this.vaccin.alerteMedecinVac=false;



    }



}


