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


    maladies: Maladie[];

    constructor(private maladieService: MaladieService) { }

    getMaladies() {
        this.maladieService.getMaladies("5")
            .subscribe(reponse => {
                this.maladies = reponse;
                console.log(this.maladies);

            })
    }

    ngOnInit() {
        // reset maladies
        this.getMaladies();
    }


}