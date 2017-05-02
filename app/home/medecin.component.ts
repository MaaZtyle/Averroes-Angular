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





@Component({

    moduleId: module.id,
    templateUrl: 'medecin.component.html',
    entryComponents: [DossierMedicalComponent]

})

export class MedecinComponent implements OnInit {

    constructor(private dossierMedicalService: DossierMedicalService,private medecinService: MedecinService) { }

    @Input()
    medecin: Medecin;

    @Input()
    patients: Patient[];

    @Input()
    dossierMedical: DossierMedical;

    // Patient sélectionnée
    patientSelectionne: Patient;


    // Réagir à la sélection d'un patient dans la liste, appel du ws pour afficher le dossier medical correspondant à celui selectionné
    onSelect(patient: Patient) {
        // patient selectionné

        this.patientSelectionne= patient;


        // get dossier medical
        this.dossierMedicalService.getDossierMedical(this.patientSelectionne)
            .subscribe(reponse => {
            this.dossierMedical = reponse;

        })


    }



    ngOnInit() {


        var jwtHelper = new JwtHelper();
        var parsedToken = jwtHelper.decodeToken(localStorage.getItem('token'));

        //console.log(parsedToken.role);

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