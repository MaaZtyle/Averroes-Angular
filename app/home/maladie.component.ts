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



    // Maladie sélectionnée

    maladieSelectionne: Maladie;

    maladies: Maladie[];

    constructor(private maladieService: MaladieService) { }

    // Réagir à la sélection d'une maladie dans la liste
    onSelect(maladie: Maladie) {
        // patient selectionné

        this.maladieSelectionne = maladie;

        console.log(this.maladieSelectionne);
    }

    getMaladies() {

        //console.log(dossierMedical.idDos);
        this.maladieService.getMaladies(this.dossierMedical.idDos.toString())
            .subscribe(reponse => {
                this.maladies = reponse;
                console.log(this.maladies);

            })
    }
    ngOnInit() {
        // reset ordonnances
        this.getMaladies();
    }


}