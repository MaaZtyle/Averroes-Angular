/**
 * Created by Maazouza on 04/05/2017.
 */
import {Observable} from "rxjs/Rx";
import {Http, Headers, RequestOptions, Response,URLSearchParams} from "@angular/http";
import {Antecedent} from "../_models/antecedent";
import {Injectable} from "@angular/core";


@Injectable()
export class AntecedentService{

    constructor(
        private http: Http) {
    }


    getAntecedents(idDos: string): Observable<Antecedent[]> {


        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': localStorage.getItem('token')});
        let options = new RequestOptions({ headers: headers });





        //set request params
        let params: URLSearchParams = new URLSearchParams();
        params.set("idDos", idDos);
        // params.set("role", parsedToken.role);
        options.search = params;


        let url = "http://localhost:8080/AVERROES_MIDDLEWARE/ws/dossiermedical/antecedents/";
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


    ajouterAntecedent(antecedent: Antecedent){
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': localStorage.getItem('token')});
        let options = new RequestOptions({ headers: headers });


        let url = "http://localhost:8080/AVERROES_MIDDLEWARE/ws/dossiermedical/antecedent/";

        return this.http
            .post(url, JSON.stringify(antecedent),{headers: headers})
            .map((response: Response) => {
                return true;

            })

            .catch(() => {
                // this is executed on a 401 or on any error
                return Observable.of(false);
            });

    }
    updateAntecedent(antecedent: Antecedent): Observable<any>{

        let headers = new Headers({ 'Authorization': localStorage.getItem('token')});
        let options = new RequestOptions({ headers: headers });

        let url = "http://localhost:8080/AVERROES_MIDDLEWARE/ws/dossiermedical/antecedent/";

        return this.http
            .put(url, JSON.stringify(antecedent),{headers: headers})
            .map((response: Response) => {

                return true;

            })

            .catch(() => {
                // this is executed on a 401 or on any error
                return Observable.of(false);
            });


    }


    deleteAntecedent(idAnt: number): Observable<any>{

        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': localStorage.getItem('token')});

        let options = new RequestOptions({ headers: headers});

        //set request params
        let params: URLSearchParams = new URLSearchParams();
        params.set("idAnt", idAnt.toString());
        // params.set("role", parsedToken.role);
        options.search = params;


        //let options = new RequestOptions({headers: headers, idAll: idAll });

        let url = "http://localhost:8080/AVERROES_MIDDLEWARE/ws/dossiermedical/antecedent/";

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




}