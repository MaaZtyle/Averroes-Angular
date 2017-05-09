/**
 * Created by Maazouza on 07/05/2017.
 */



import {Component, Input, OnInit} from "@angular/core";
import {DossierMedical} from "../_models/dossierMedical";
import {AntecedentService} from "../_services/antecedent.service";
import {Antecedent} from "../_models/antecedent";


@Component({

    selector: 'antecedents',
    moduleId: module.id,
    templateUrl: 'antecedent.component.html',

})


export class AntecedentComponent {

    @Input()
    dossierMedical: DossierMedical;


    antecedents: Antecedent[];

    constructor(private antecedentService: AntecedentService) { }

    getAntecedents() {

        //console.log(dossierMedical.idDos);
        this.antecedentService.getAntecedents(this.dossierMedical.idDos.toString())
            .subscribe(reponse => {
                this.antecedents = reponse;
                console.log(this.antecedents);

            })
    }

    ngOnInit() {
        // reset antecédents
        this.getAntecedents();
    }


}