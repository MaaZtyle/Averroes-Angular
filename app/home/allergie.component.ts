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


    allergies: Allergie[];

    constructor(private allergieService: AllergieService) { }

    getAllergies() {

        //console.log(dossierMedical.idDos);
        this.allergieService.getAllergies(this.dossierMedical.idDos.toString())
            .subscribe(reponse => {
                this.allergies = reponse;
                console.log(this.allergies);

            })
    }

    ngOnInit() {
        // reset maladies
        this.getAllergies();
    }


}