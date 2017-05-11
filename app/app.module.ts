import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule,JsonpModule } from '@angular/http';


// used to create fake backend

import { BaseRequestOptions } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';



import { AuthGuard } from './_guards/index';
import { AuthenticationService, UserService } from './_services/index';
import { LoginComponent } from './login/index';
import {MedecinComponent} from "./home/medecin.component";
import {PatientComponent} from "./home/patient.component";
import {MedecinService} from "./_services/medecin.service";
import {PatientService} from "./_services/patient.service";
import {DossierMedicalService} from "./_services/dossierMedical.service";
import {DossierMedicalComponent} from "./home/dossierMedical.component";
import { MaladieComponent} from "./home/maladie.component";
import {MaladieService} from "./_services/maladie.service";
import {AllergieService} from "./_services/allergie.service";
import {AntecedentService} from "./_services/antecedent.service";
import {MedicamentService} from "./_services/medicament.service";
import {OrdonnanceService} from "./_services/ordonnance.service";
import {VaccinService} from "./_services/vaccin.service";
import {AllergieComponent} from "./home/allergie.component";
import {AntecedentComponent} from "./home/antecedent.component";
import {OrdonnanceComponent} from "./home/ordonnance.component";
import {VaccinComponent} from "./home/vaccin.component";
import {PatientDetailComponent} from "./home/patient-detail.component";
import {ModalModule, AlertModule} from "ngx-bootstrap";
import {MaladieCreationComponent} from "./home/maladie-creation.component";







@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ModalModule.forRoot(),// pour fenettre modal
        AlertModule.forRoot(),// pour alerte modal


        routing
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        MedecinComponent,
        PatientComponent,
        DossierMedicalComponent,
        MaladieComponent,
        AllergieComponent,
        AntecedentComponent,
        OrdonnanceComponent,
        VaccinComponent,
        PatientDetailComponent,
        MaladieCreationComponent






    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        UserService,
        MedecinService,
        PatientService,
        DossierMedicalService,
        MaladieService,
        AllergieService,
        AntecedentService,
        MedicamentService,
        OrdonnanceService,
        VaccinService,





        // providers used to create fake backend
        //fakeBackendProvider,
       // MockBackend,
        //BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }