import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { MedecinComponent,PatientComponent } from './home/index';
import { AuthGuard } from './_guards/index';
import {PatientDetailComponent} from "./home/patient-detail.component";

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },

    { path: 'medecin', component: MedecinComponent, canActivate: [AuthGuard] },
    { path: 'patient', component: PatientComponent, canActivate: [AuthGuard] },
    { path: 'detail-patient', component: PatientDetailComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);