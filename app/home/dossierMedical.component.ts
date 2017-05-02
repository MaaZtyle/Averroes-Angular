/**
 * Created by Maazouza on 01/05/2017.
 */
import {Component, Input, OnInit} from "@angular/core";
import {DossierMedical} from "../_models/dossierMedical";
import {Patient} from "../_models/patient";
import {DossierMedicalService} from "../_services/dossierMedical.service";


@Component({

    selector: 'dossierMedical',
    moduleId: module.id,
    templateUrl: 'dossierMedical.component.html',

})

export class DossierMedicalComponent{

    @Input()
    patient: Patient;


    dossierMedical: DossierMedical;

    constructor(private dossierMedicalService: DossierMedicalService) { }

    detailDossier() {
        this.dossierMedicalService.getDossierMedical(this.patient.idPat)
            .subscribe(reponse => {
                this.dossierMedical = reponse;
                console.log(this.dossierMedical);

            })
    }

    ngOnChanges() {
    // reset login status
        this.detailDossier();
    }




}
