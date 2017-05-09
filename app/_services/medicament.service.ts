/**
 * Created by Maazouza on 04/05/2017.
 */
import {Observable} from "rxjs/Rx";
import {Http, Headers, RequestOptions, Response,URLSearchParams} from "@angular/http";
import {Medicament} from "../_models/medicament";
import {Injectable} from "@angular/core";


@Injectable()
export class MedicamentService{

    constructor(
        private http: Http) {
    }


    getMedicaments(idOrd: string): Observable<Medicament[]> {


        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': localStorage.getItem('token')});
        let options = new RequestOptions({ headers: headers });





        //set request params
        let params: URLSearchParams = new URLSearchParams();
        params.set("idOrd", idOrd);
        // params.set("role", parsedToken.role);
        options.search = params;


        let url = "http://localhost:8080/AVERROES_MIDDLEWARE/ws/dossiermedical/ordonnance/medicaments/";
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



}