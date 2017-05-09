/**
 * Created by Maazouza on 07/05/2017.
 */

import {Component, Input, OnInit} from "@angular/core";
import {DossierMedical} from "../_models/dossierMedical";
import {OrdonnanceService} from "../_services/ordonnance.service";
import {Ordonnance} from "../_models/ordonnance";


@Component({

    selector: 'ordonnances',
    moduleId: module.id,
    templateUrl: 'ordonnance.component.html',

})


export class OrdonnanceComponent {

    @Input()
    dossierMedical: DossierMedical;


    ordonnances: Ordonnance[];

    constructor(private ordonnanceService: OrdonnanceService) { }

    getOrdonnances() {

        //console.log(dossierMedical.idDos);
        this.ordonnanceService.getOrdonnances(this.dossierMedical.idDos.toString())
            .subscribe(reponse => {
                this.ordonnances = reponse;
                console.log(this.ordonnances);

            })
    }

    ngOnInit() {
        // reset ordonnances
        this.getOrdonnances();
    }


}
