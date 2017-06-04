/**
 * Created by Maazouza on 04/05/2017.
*/
import {Observable} from "rxjs/Rx";
import {Http, Headers, RequestOptions, Response,URLSearchParams} from "@angular/http";
import {Vaccin} from "../_models/vaccin";
import {Injectable} from "@angular/core";


@Injectable()
export class VaccinService{

    constructor(
        private http: Http) {
    }


    getVaccins(idDos: string): Observable<Vaccin[]> {


        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': localStorage.getItem('token')});
        let options = new RequestOptions({ headers: headers });





        //set request params
        let params: URLSearchParams = new URLSearchParams();
        params.set("idDos", idDos);
        // params.set("role", parsedToken.role);
        options.search = params;


        let url = "http://localhost:8080/AVERROES_MIDDLEWARE/ws/dossiermedical/vaccins/";
        //console.log("url: ", url);

        //console.log(this.authenticationService.token);

        // get users from api
        return this.http.get(url,options)
            .map(this.extractData)
            .catch(this.handleError);

    }

    getVaccinsArchives(idDos: string): Observable<Vaccin[]> {


        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': localStorage.getItem('token')});
        let options = new RequestOptions({ headers: headers });





        //set request params
        let params: URLSearchParams = new URLSearchParams();
        params.set("idDos", idDos);
        // params.set("role", parsedToken.role);
        options.search = params;


        let url = "http://localhost:8080/AVERROES_MIDDLEWARE/ws/dossiermedical/vaccins/archives";
        //console.log("url: ", url);

        //console.log(this.authenticationService.token);

        // get users from api
        return this.http.get(url,options)
            .map(this.extractData)
            .catch(this.handleError);

    }

    private extractData(res: Response) {
        let body = res.json();

        //console.log(body);
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


    ajouterVaccin(vaccin: Vaccin){
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': localStorage.getItem('token')});
        let options = new RequestOptions({ headers: headers });


        let url = "http://localhost:8080/AVERROES_MIDDLEWARE/ws/dossiermedical/vaccin/";

        return this.http
            .post(url, JSON.stringify(vaccin),{headers: headers})
            .map((response: Response) => {
                return true;

            })

            .catch(() => {
                // this is executed on a 401 or on any error
                return Observable.of(false);
            });

    }
    updateVaccin(vaccin: Vaccin): Observable<any>{

        let headers = new Headers({ 'Authorization': localStorage.getItem('token')});
        let options = new RequestOptions({ headers: headers });

        let url = "http://localhost:8080/AVERROES_MIDDLEWARE/ws/dossiermedical/vaccin/";

        return this.http
            .put(url, JSON.stringify(vaccin),{headers: headers})
            .map((response: Response) => {

                return true;

            })

            .catch(() => {
                // this is executed on a 401 or on any error
                return Observable.of(false);
            });


    }


    deleteVaccin(idVac: number): Observable<any>{

        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': localStorage.getItem('token')});

        let options = new RequestOptions({ headers: headers});

        //set request params
        let params: URLSearchParams = new URLSearchParams();
        params.set("idVac", idVac.toString());
        // params.set("role", parsedToken.role);
        options.search = params;


        //let options = new RequestOptions({headers: headers, idAll: idAll });

        let url = "http://localhost:8080/AVERROES_MIDDLEWARE/ws/dossiermedical/vaccin/";

        return this.http
            .delete(url, options)
            .map((response: Response) => {
                return true;
            })

            .catch(() => {
                // this is executed on a 401 or on any error
                return Observable.of(false);
            });




    }


    archiveVaccin(vaccin: Vaccin): Observable<any>{

        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': localStorage.getItem('token')});

        let options = new RequestOptions({ headers: headers});

    //let options = new RequestOptions({headers: headers, idAll: idAll });

        let url = "http://localhost:8080/AVERROES_MIDDLEWARE/ws/dossiermedical/vaccin/archive";

        return this.http
            .post(url, JSON.stringify(vaccin),{headers: headers})
            .map((response: Response) => {
                return true;

            })

            .catch(() => {
                // this is executed on a 401 or on any error
                return Observable.of(false);
            });





    }



}