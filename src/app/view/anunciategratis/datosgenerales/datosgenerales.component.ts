import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AnuncioService } from "../../../shared/services/anuncio/anuncio.service";
import { DatosGenerales } from "../../../models/modelanuncio";
import { ParameterService } from "../../../shared/services/anuncio/parameter.service";
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
    selector: 'app-datosgenerales-gratis',
    templateUrl: './datosgenerales.component.html',
    //styleUrls: ['../css/global.component.css'],
})
export class DatosGeneralesComponent implements OnInit {

    datosgenerales: DatosGenerales;
    result: any = null;

    fromDatosGenerales: FormGroup;
    isSubmittedDatosGenerales: boolean = false;
    //Datos Generales
    edadCtrl: FormControl;
    paisCtrl: FormControl;
    estudiosCtrl: FormControl;
    txt_descripcion_generalesCtrl: FormControl;


    ListEdad: any = [];
    ListPais: any = [];
    ListEstudios: any = [];
    DataJsonAnuncio: any;
    constructor(
        private anuncioService: AnuncioService,
        private router: Router,
        private parameter: ParameterService,
        private spinner: NgxSpinnerService
    ) { }

    ngOnInit() {        
        this.DataJsonAnuncio = JSON.parse(localStorage.getItem('DataAnuncio'));
        let listaParamter = JSON.parse(localStorage.getItem('listParamter'));
        this.anuncioService.segundopaso(true);
        this.anuncioService.tercerpaso(false);
        this.anuncioService.cuartopaso(false);
        this.anuncioService.quintopaso(false);
        this.anuncioService.sextopaso(false);
        this.ListEdad = listaParamter.edad;// this.anuncioService.getListEdad();
        this.ListPais = listaParamter.pais; //this.anuncioService.getListPais();
        this.ListEstudios = listaParamter.estudios; //this.anuncioService.getListEstudios();
        //Controles Datos Generales
        this.edadCtrl = new FormControl('', [Validators.required]);
        this.paisCtrl = new FormControl('', [Validators.required]);
        this.estudiosCtrl = new FormControl('', [Validators.required]);
        this.txt_descripcion_generalesCtrl = new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(2000)]);


        this.fromDatosGenerales = new FormGroup({
            int_edad: this.edadCtrl,
            int_pais_origen: this.paisCtrl,
            int_estudios: this.estudiosCtrl,
            txt_presentacion: this.txt_descripcion_generalesCtrl
        });
        if (this.DataJsonAnuncio !== null) {
            this.fromDatosGenerales.patchValue({
                int_edad: this.DataJsonAnuncio.int_edad == 0 ? "" : this.DataJsonAnuncio.int_edad,
                int_pais_origen: this.DataJsonAnuncio.int_pais_origen == 0 ? "" : this.DataJsonAnuncio.int_pais_origen,
                int_estudios: this.DataJsonAnuncio.int_estudios == 0 ? "" : this.DataJsonAnuncio.int_estudios,
                txt_presentacion: this.DataJsonAnuncio.txt_presentacion
            });
        }
    }
    selectName() {

    }
    goToPrevious(form: any) {
        this.router.navigate(['anunciategratis/datos-contacto']);
    }
    saveDatosGenerales() {
        this.isSubmittedDatosGenerales = true;
        if (!this.fromDatosGenerales.valid)
            return;
            
        this.spinner.show();
        this.DataJsonAnuncio.int_edad = parseInt(this.fromDatosGenerales.value.int_edad);
        this.DataJsonAnuncio.int_pais_origen = parseInt(this.fromDatosGenerales.value.int_pais_origen);
        this.DataJsonAnuncio.int_estudios = parseInt(this.fromDatosGenerales.value.int_estudios);
        this.DataJsonAnuncio.txt_presentacion = this.fromDatosGenerales.value.txt_presentacion;
        this.anuncioService.SaveSegundoPaso(this.DataJsonAnuncio).subscribe(
            (res) => {
                if (res.Status == "OK") {
                    let DataJsonAnuncio: any = res.Data;
                    localStorage.setItem('DataAnuncio', DataJsonAnuncio);
                    this.router.navigate(['anunciategratis/apariencia']);
                }
                setTimeout(() => {
                    this.spinner.hide();
                  }, 2000);
            }
        );
    }
    resetDatosGenerales() {
        this.isSubmittedDatosGenerales = false;
        /*Reseteamos el select value por default en vacio */
        this.fromDatosGenerales.reset({
            edad: '',
            pais: '',
            estudios: ''
        });
    }

    btnAtras(form: any) {
        this.router.navigate(['anunciategratis/datos-contacto']);
    }
}
