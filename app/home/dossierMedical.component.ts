/**
 * Created by Maazouza on 01/05/2017.
 */
import {Component, Input, OnInit} from "@angular/core";
import {DossierMedical} from "../_models/dossierMedical";
import {Patient} from "../_models/patient";
import {DossierMedicalService} from "../_services/dossierMedical.service";
import {MaladieComponent} from "./maladie.component";


@Component({

    selector: 'dossierMedical',
    moduleId: module.id,
    templateUrl: 'dossierMedical.component.html',
    //directives : [MaladieComponent]

})

export class DossierMedicalComponent{

    @Input()
    patient: Patient;



    dossierMedical: DossierMedical;

    constructor(private dossierMedicalService: DossierMedicalService) { }

    detailDossier() {
        this.dossierMedicalService.getDossierMedical(this.patient.idPat.toString())
            .subscribe(reponse => {
                this.dossierMedical = reponse;
                console.log(this.dossierMedical);

            })
    }

    ngOnChanges() {
    // reset dossier details
        this.detailDossier();
    }




}
