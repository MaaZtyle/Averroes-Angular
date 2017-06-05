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

        {nom:'BCG', rappel:5},
        {nom:'Diphtérie / Tétanos', rappel:2},
        {nom:'Diphtérie / Tétanos / Poliomyélite', rappel:3},
        {nom:'Diphtérie / Tétanos / Coqueluche /Poliomyélite', rappel:4},
        {nom:'Diphtérie / Tétanos / Coqueluche / Poliomyélite / Haemophilus Influenzae b ', rappel:5},
        {nom:'Diphtérie, Coqueluche acellulaire, Tétanos, Haemophilus influenzae de type b	', rappel:6},
        {nom:'Fièvre jaune', rappel:5},
        {nom:'Grippe saisonnière', rappel:2},
        {nom:'Hépatite A', rappel:3},
        {nom:'Hépatite B', rappel:4},
        {nom:'Hépatite A & Hépatite B', rappel:5},
        {nom:'Leptospirose', rappel:6},
        {nom:'Méningocoque A & C', rappel:6},
        {nom:'Méningocoque A, C, Y, W135', rappel:6},
        {nom:'Méningocoque C (vaccins conjugués)', rappel:6},
        {nom:'Papillomavirus humains (HPV)', rappel:6},
        {nom:'Pneumocoque (infections invasives à = IIP)', rappel:5},
        {nom:'Poliomyélite', rappel:6},
        {nom:'Rage', rappel:6},
        {nom:'Rougeole', rappel:6},
        {nom:'Rougeole / Oreillons / Rubéole', rappel:6},
        {nom:'Tétanos', rappel:6},
        {nom:'Typhoïde (fièvre) ', rappel:6},
        {nom:'Typhoïde et Hépatite A ', rappel:6},
        {nom:'Varicelle', rappel:6},

        ];



    vaccinModelSelectionne: any;

    vaccin: Vaccin = new Vaccin();



    @Input()
    dossierMedical: DossierMedical;


    constructor(private vaccinService: VaccinService) { }

    onSelect(vaccin: Vaccin) {

        var dateDernierVaccin = moment(this.vaccin.dateDernierVac);
        var dateProchainVaccin = dateDernierVaccin.add(this.vaccinModelSelectionne.rappel, 'd');
        //console.log(dateDernierVaccin);
        //console.log(dateProchainVaccin);
        this.vaccin.dateProchainVac = dateProchainVaccin.format('YYYY-MM-DD');


    }

    ajouterVaccin(vaccin: Vaccin) {


        vaccin.idDos=this.dossierMedical.idDos;
        vaccin.nomVac=this.vaccinModelSelectionne.nom;

        var dateDernierVaccin= moment(this.vaccin.dateDernierVac);
        var dateProchainVaccin= moment(this.vaccin.dateProchainVac);


        vaccin.dateDernierVac=dateDernierVaccin.format('DD-MM-YYYY');
        vaccin.dateProchainVac=dateProchainVaccin.format('DD-MM-YYYY');
        this.resetMessage();


        //vaccin.nomVac= this.vaccinModelSelectionne.nom;
        //console.log(vaccin.dateDernierVac);






        //console.log(this.vaccinModelSelectionne.nom)       // var newDateObj = moment(dateFormat).add( ,'days').calendar();
        //console.log(this.vaccinModelSelectionne.rappel)

        //console.log(newDateObj);
        this.vaccinService.ajouterVaccin(vaccin)
            .subscribe(result => {


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
        this.messageOK =null;
        this.messageKO=null;

    }



    ngOnInit(){
        this.messageOK ='';
        this.messageKO='';
        this.vaccin.alertePatientVac=false;
        this.vaccin.alerteMedecinVac=false;



    }



}


