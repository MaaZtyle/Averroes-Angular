import { Injectable } from '@angular/core';
import { Http, Headers, Response, ResponseOptions, ResponseContentType,ResponseOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';



@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: Http) {
        // set token if saved in local storage
        //var token = JSON.parse(localStorage.getItem('token'));
        //this.token = token;

        localStorage.removeItem('token');
    }

    login(username: string, password: string): Observable<boolean> {



        let o = new Headers;
        o.append("Content-Type", "application/x-www-form-urlencoded");

        let n = new URLSearchParams;
        n.append("username", username), n.append("password", password)

        return this.http.post('http://localhost:8080/AVERROES_MIDDLEWARE/ws/authentification', n.toString(),{headers: o})
            .map((response: Response) => {


                // login successful if there's a jwt token in the response
                // login successful if there's a jwt token in the response
                let token = response.text();

                //console.log( response.text);
                console.log(username);
                console.log(password);


                if (token) {
                    // set token property
                    this.token = token;


                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem("token", token);


                    // return true to indicate successful login
                    return true;
                }
            })
            .catch(() => {
                // this is executed on a 401 or on any error
                return Observable.of(false);
            });
    }
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('token');
    }


}