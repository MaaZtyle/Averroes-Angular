/**
 * Created by Maazouza on 01/05/2017.
 */
import {Component, OnInit, Input} from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';
import {Patient} from "../_models/patient";
import {JwtHelper} from "../_services/JwtHelper";




@Component({
    moduleId: module.id,
    templateUrl: 'patient.component.html',

})

export class PatientComponent implements OnInit {

    @Input()
    patient: Patient;

    constructor(private userService: UserService) { }

    ngOnInit() {


        var jwtHelper = new JwtHelper();
        var parsedToken = jwtHelper.decodeToken(localStorage.getItem('token'));

        console.log(parsedToken.role);


            // get users from secure api end point
            this.userService.getPatient()
                .subscribe(reponse => {
                    this.patient = reponse;

                })



    }

}