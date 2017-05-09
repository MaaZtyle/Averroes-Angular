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


    vaccins: Vaccin[];

    constructor(private vaccinService: VaccinService) { }

    getVaccins() {

        //console.log(dossierMedical.idDos);
        this.vaccinService.getMaladies(this.dossierMedical.idDos.toString())
            .subscribe(reponse => {
                this.vaccins = reponse;
                //console.log(this.maladies);

            })
    }

    ngOnInit() {
        // reset maladies
        this.getVaccins();
    }


}