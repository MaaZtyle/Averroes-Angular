/**
 * Created by Maazouza on 07/05/2017.
 */


import {Component, Input} from "@angular/core";
import {Patient} from "../_models/patient";


@Component({

    selector: 'patient-detail',
    moduleId: module.id,

    templateUrl: 'patient-detail.component.html',

})

export class PatientDetailComponent {

    @Input()
    patient: Patient;

}