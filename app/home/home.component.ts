import {Component, OnInit, Input} from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';
import {Medecin} from "../_models/medecin";
import {Patient} from "../_models/patient";
import {JwtHelper} from "../_services/JwtHelper";




@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',

})

export class HomeComponent implements OnInit {

    @Input()
    users: User;

    @Input()
    medecins: Medecin;

    @Input()
    patients: Patient;

    constructor(private userService: UserService) { }

    ngOnInit() {


        var jwtHelper = new JwtHelper();
        var parsedToken = jwtHelper.decodeToken(localStorage.getItem('token'));

        console.log(parsedToken.role);
        if(parsedToken.role === "medecin") {
            // get users from secure api end point
            this.userService.getMedecin()
                .subscribe(reponse => {
                    this.medecins = reponse;

                })
        }
        else {
            // get users from secure api end point
            this.userService.getPatient()
                .subscribe(reponse => {
                    this.patients = reponse;

                })
        }


    }

}