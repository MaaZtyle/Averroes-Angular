/**
 * Created by Maazouza on 01/05/2017.
 */
import {Component, OnInit, Input} from '@angular/core';


import { PatientService } from '../_services/index';
import {Patient} from "../_models/patient";
import {JwtHelper} from "../_services/JwtHelper";




@Component({
    moduleId: module.id,
    templateUrl: 'patient.component.html',

})

export class PatientComponent implements OnInit {

    @Input()
    patient: Patient;

    constructor(private patientService: PatientService) { }

    ngOnInit() {


        var jwtHelper = new JwtHelper();
        var parsedToken = jwtHelper.decodeToken(localStorage.getItem('token'));

        console.log(parsedToken.role);


            // get users from secure api end point
            this.patientService.getPatient()
                .subscribe(reponse => {
                    this.patient = reponse;

                })



    }

}