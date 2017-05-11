/**
 * Created by Maazouza on 01/05/2017.
 */
import {Component, OnInit, Input} from '@angular/core';

import { User } from '../_models/index';
import { UserService, MedecinService, DossierMedicalService } from '../_services/index';
import {Medecin} from "../_models/medecin";
import {JwtHelper} from "../_services/JwtHelper";
import {Patient} from "../_models/patient";
import { DossierMedicalComponent} from "./dossierMedical.component";
import {DossierMedical} from "../_models/dossierMedical";
import {Router} from "@angular/router";







@Component({

    moduleId: module.id,

    templateUrl: 'medecin.component.html',
    //directives : [DossierMedicalComponent]

})

export class MedecinComponent implements OnInit {

    constructor(private router: Router,private dossierMedicalService: DossierMedicalService,private medecinService: MedecinService,) { }

    public token: string;

    medecin: Medecin;


    patients: Patient[];


    dossierMedical: DossierMedical;

    // Patient sélectionnée
    patientSelectionne: Patient;



    // Réagir à la sélection d'un patient dans la liste, appel du ws pour afficher le dossier medical correspondant à celui selectionné
    onSelect(patient: Patient) {
        // patient selectionné

        this.patientSelectionne= patient;


       /* // get dossier medical
        this.dossierMedicalService.getDossierMedical(this.patientSelectionne)
            .subscribe(reponse => {
            this.dossierMedical = reponse;

        })
*/

    }

    useJwtHelper() {
        var jwtHelper = new JwtHelper();

        var token = localStorage.getItem("token");

       //console.log(
          //  jwtHelper.decodeToken(token),
         //   jwtHelper.getTokenExpirationDate(token),
            //jwtHelper.isTokenExpired(token)
      //  );

        if(jwtHelper.isTokenExpired(token))
            return true
        else return false;
    }

    ngOnInit() {


       // var jwtHelper = new JwtHelper();
        //var parsedToken = jwtHelper.decodeToken(localStorage.getItem('token'));

        //console.log(this.useJwtHelper());

        // si token expiré, je redirrige vers la page d'aeeuil et je supprime le token
        if(this.useJwtHelper() === true) {

            this.token = null;
            localStorage.removeItem('token');

            this.router.navigate(['login']);
        }

        else {
            // get users from secure api end point
            this.medecinService.getMedecin()
                .subscribe(reponse => {
                    this.medecin = reponse;


                })


            // get patients from secure api end point
            this.medecinService.getListPatients()
                .subscribe(reponse => {


                    this.patients = reponse;


                })

        }


    }



}