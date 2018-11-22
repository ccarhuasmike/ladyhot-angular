import { Component, OnInit } from '@angular/core';
import { AnuncioService } from "../../../../shared/services/anuncio/anuncio.service";
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { Apariencia } from "../../../models/modelanuncio";
@Component({
    selector: 'app-not-found',
    templateUrl: './apariencia.component.html',
    styleUrls: ['./apariencia.component.css']
})
export class AparienciaComponent implements OnInit {

    apariencia: Apariencia;
    fromApariencia: FormGroup;

    isSubmittedApariencia: boolean = false;
    result: any = null;

    ListCabellos: any = [];
    ListOjos: any = [];
    ListEstatura: any = [];
    ListPeso: any = [];

    //Controles Apariencia
    bustoCtrl: FormControl;
    cinturaCtrl: FormControl;
    caderaCtrl: FormControl;
    cabellosCtrl: FormControl;
    ojosCtrl: FormControl;
    estaturaCtrl: FormControl;
    pesoCtrl: FormControl;
    descripcionaparienciaCtrl: FormControl;

    constructor(
        private anuncioService: AnuncioService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.apariencia = this.anuncioService.getApariencia();
        this.anuncioService.segundopaso(true);
        this.anuncioService.tercerpaso(true);
        this.anuncioService.cuartopaso(false);
        this.anuncioService.quintopaso(false);

        this.ListCabellos = this.anuncioService.getListCabellos();
        this.ListOjos = this.anuncioService.getListOjos();
        this.ListEstatura = this.anuncioService.getListEstatura();
        this.ListPeso = this.anuncioService.getListPeso();
        //Controles Apariencia
        this.bustoCtrl = new FormControl('', [Validators.required]);
        this.cinturaCtrl = new FormControl('', [Validators.required]);
        this.caderaCtrl = new FormControl('', [Validators.required]);

        this.cabellosCtrl = new FormControl('', [Validators.required]);
        this.ojosCtrl = new FormControl('', [Validators.required]);
        this.estaturaCtrl = new FormControl('', [Validators.required]);
        this.pesoCtrl = new FormControl('', [Validators.required]);
        this.descripcionaparienciaCtrl = new FormControl('', [Validators.maxLength(450)]);
        this.fromApariencia = new FormGroup({
            busto: this.bustoCtrl,
            cintura: this.cinturaCtrl,
            cadera: this.caderaCtrl,
            cabello: this.cabellosCtrl,
            ojos: this.ojosCtrl,
            estatura: this.estaturaCtrl,
            peso: this.pesoCtrl,
            descripcionapariencia: this.descripcionaparienciaCtrl
        });

        this.fromApariencia.patchValue({
            busto: this.apariencia.txt_busto,
            cintura: this.apariencia.txt_cintura,
            cadera: this.apariencia.txt_cadera,
            cabello: this.apariencia.cbo_cabello,
            ojos: this.apariencia.cbo_ojos,
            estatura: this.apariencia.cbo_estatura,
            peso: this.apariencia.cbo_peso,
            descripcionapariencia: this.apariencia.txt_descripcion_apariencia
        });

    }

    selectName() {

    }
    saveApariencia() {
        debugger;
        this.isSubmittedApariencia = true;
        if (!this.fromApariencia.valid)
            return;
        this.anuncioService.setApariencia(this.fromApariencia.value)
        this.router.navigate(['/anuncio/tarifa']);

        // userService.Save(this.register.value);
        // this.result = this.fromApariencia.value;
        // setTimeout(() => {
        //     this.result = null;
        //     this.resetApariencia();
        // }, 2000);
    }
    resetApariencia() {
        this.isSubmittedApariencia = false;
        this.fromApariencia.reset();

    }

    btnAtras(form: any) {
        this.router.navigate(['/anuncio/datos-generales']);
    }



}
