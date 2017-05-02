import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule,JsonpModule } from '@angular/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
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

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        MedecinComponent,
        PatientComponent,
        DossierMedicalComponent
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        UserService,
        MedecinService,
        PatientService,
        DossierMedicalService,



        // providers used to create fake backend
        //fakeBackendProvider,
       // MockBackend,
        //BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }