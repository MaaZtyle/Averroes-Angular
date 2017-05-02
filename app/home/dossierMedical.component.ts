/**
 * Created by Maazouza on 01/05/2017.
 */
import {Component, Input, OnInit} from "@angular/core";
import {DossierMedical} from "../_models/dossierMedical";
import {Patient} from "../_models/patient";


@Component({

    selector: 'dossierMedical',
    moduleId: module.id,
    templateUrl: 'dossierMedical.component.html',

})

export class DossierMedicalComponent{

    @Input()
    patient: Patient;








}
