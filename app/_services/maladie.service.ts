/**
 * Created by Maazouza on 04/05/2017.
 */
import {Observable} from "rxjs/Rx";
import {Http, Headers, RequestOptions, Response, URLSearchParams, RequestMethod,RequestOptionsArgs} from "@angular/http";
import {Maladie} from "../_models/maladie";
import {Injectable} from "@angular/core";


@Injectable()
export class MaladieService{

    constructor(
        private http: Http) {
    }


    getMaladies(idDos: string): Observable<Maladie[]> {


        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': localStorage.getItem('token')});
        let options = new RequestOptions({ headers: headers });

        //set request params
        let params: URLSearchParams = new URLSearchParams();
        params.set("idDos", idDos);
        // params.set("role", parsedToken.role);
        options.search = params;


        let url = "http://localhost:8080/AVERROES_MIDDLEWARE/ws/dossiermedical/maladies/";
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

    ajouterMaladie(maladie: Maladie){
       // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': localStorage.getItem('token')});
        let options = new RequestOptions({ headers: headers });

        //set request params
        //let params: URLSearchParams = new URLSearchParams();

        //console.log(maladie);
        //params.set("idDos", idDos);
        //params.set("designationMal",maladie.designationMal )
        //params.set("descriptionMal",maladie.descriptionMal)
        //params.set("dateAppMal",maladie.dateAppMal)
        // params.set("role", parsedToken.role);
        //options.url = params;
        let url = "http://localhost:8080/AVERROES_MIDDLEWARE/ws/dossiermedical/maladie/";

         return this.http
            .post(url, JSON.stringify(maladie),{headers: headers})
            .map((response: Response) => {
                  return true;

         })

            .catch(() => {
                // this is executed on a 401 or on any error
                return Observable.of(false);
            });

    }
    updateMaladie(maladie: Maladie): Observable<any>{

        let headers = new Headers({ 'Authorization': localStorage.getItem('token')});
        let options = new RequestOptions({ headers: headers });

        let url = "http://localhost:8080/AVERROES_MIDDLEWARE/ws/dossiermedical/maladie/";

        return this.http
            .put(url, JSON.stringify(maladie),{headers: headers})
            .map((response: Response) => {

                return true;

            })

            .catch(() => {
                // this is executed on a 401 or on any error
                return Observable.of(false);
            });


    }


    deleteMaladie(idMal: number): Observable<any>{

        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': localStorage.getItem('token')});

        let options = new RequestOptions({ headers: headers});

       //set request params
        let params: URLSearchParams = new URLSearchParams();
        params.set("idMal", idMal.toString());
        // params.set("role", parsedToken.role);
        options.search = params;


        //let options = new RequestOptions({headers: headers, idMal: idMal });

        let url = "http://localhost:8080/AVERROES_MIDDLEWARE/ws/dossiermedical/maladie/";

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