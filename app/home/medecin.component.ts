/**
 * Created by Maazouza on 01/05/2017.
 */
import {Component, OnInit, Input} from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';
import {Medecin} from "../_models/medecin";
import {JwtHelper} from "../_services/JwtHelper";




@Component({
    moduleId: module.id,
    templateUrl: 'medecin.component.html',

})

export class MedecinComponent implements OnInit {



    @Input()
    medecin: Medecin;



    constructor(private userService: UserService) { }

    ngOnInit() {


        var jwtHelper = new JwtHelper();
        var parsedToken = jwtHelper.decodeToken(localStorage.getItem('token'));

        console.log(parsedToken.role);

            // get users from secure api end point
            this.userService.getMedecin()
                .subscribe(reponse => {
                    this.medecin = reponse;

                })




    }

}