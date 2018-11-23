import { Component, OnInit } from '@angular/core';
import { AnuncioService } from "../../../shared/services/anuncio/anuncio.service";
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nuevoanuncio',
    templateUrl: "./nuevoanuncio.component.html",
    styleUrls: ['./nuevoanuncio.component.css']
})
export class NuevoAnuncioComponent implements OnInit {

    EdadId: Number = 0;
    PaisId: Number = 0;
    EstudioId: Number = 0;
    CabelloId: Number = 0;
    OjosId: Number = 0;
    EstaturaId: Number = 0;
    PesoId: Number = 0;

    constructor(
        private anuncioService: AnuncioService,
        private router: Router,
        private frmBuilder: FormBuilder
    ) { }
    ngOnInit() {
        //this.router.navigate(['/anuncio/servicios']);
    }
}


