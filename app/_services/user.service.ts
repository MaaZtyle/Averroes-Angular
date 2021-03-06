﻿import {Injectable, Input, Inject} from '@angular/core';
import { Http, Headers, RequestOptions, Response,URLSearchParams  } from '@angular/http';



import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AuthenticationService } from './index';

import { User } from '../_models/index';
import {LoginComponent} from "../login/login.component";
import {JwtHelper} from "./JwtHelper";
import {Observable} from "rxjs/Rx";
import {Medecin} from "../_models/medecin";
import {Patient} from "../_models/patient";


@Injectable()
export class UserService {



    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    getMedecin(): Observable<Medecin> {


        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': localStorage.getItem('token')});
        let options = new RequestOptions({ headers: headers });


        var jwtHelper = new JwtHelper();
        var parsedToken = jwtHelper.decodeToken(localStorage.getItem('token'));
        //console.log(parsedToken);
        //console.log(parsedToken.id);


        //set request params
        let params: URLSearchParams = new URLSearchParams();
        params.set("idMed", parsedToken.id);

        options.search = params;


        let url;


         url = "http://localhost:8080/AVERROES_MIDDLEWARE/ws/medecin/id/";


        //console.log("url: ", url);

        //console.log(this.authenticationService.token);

        // get users from api
        return this.http.get(url,options)
            .map(this.extractData)
            .catch(this.handleError);

}

    private extractData(res: Response) {
        let body = res.json();

        console.log(body);
        return body || {};
    }

    private handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }


    getPatient(): Observable<Patient> {


        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': localStorage.getItem('token')});
        let options = new RequestOptions({ headers: headers });


        var jwtHelper = new JwtHelper();
        var parsedToken = jwtHelper.decodeToken (localStorage.getItem('token'));
        //console.log(parsedToken);
        //console.log(parsedToken.id);


        //set request params
        let params: URLSearchParams = new URLSearchParams();
        params.set("idPat", parsedToken.id);
       // params.set("role", parsedToken.role);
        options.search = params;


        let url = "http://localhost:8080/AVERROES_MIDDLEWARE/ws/patient/id/";
        //console.log("url: ", url);

        //console.log(this.authenticationService.token);

        // get users from api
        return this.http.get(url,options)
            .map(this.extractData)
            .catch(this.handleError);

    }




}