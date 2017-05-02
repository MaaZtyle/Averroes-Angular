import {Component, OnInit, Input, Injectable} from '@angular/core';
import { Router } from '@angular/router';


import { AuthenticationService } from '../_services/index';
import {JwtHelper} from '../_services/JwtHelper';


@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',


})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';


    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    login() {
        this.loading = true;

        //console.log(username);

        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {

                    var jwtHelper = new JwtHelper();
                    var parsedToken = jwtHelper.decodeToken(localStorage.getItem('token'));

                    //console.log(parsedToken.role);
                    if(parsedToken.role === "medecin") {
                        // si c'est un medecin, j'affiche sa page d'acceuil
                        this.router.navigate(['medecin']);

                            }

                    else {
                    // si c'est un patient, j'affiche sa page d'acceuil
                    this.router.navigate(['patient']);
                    }



                } else {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }

    /*getUsername() : string{

        return this.model.username;
    }*/
}
