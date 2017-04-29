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



                    this.router.navigate(['/']);

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
