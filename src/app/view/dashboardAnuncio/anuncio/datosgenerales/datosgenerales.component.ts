import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AnuncioService } from "../../../../shared/services/anuncio/anuncio.service";
import { DatosGenerales } from "../../../models/modelanuncio";
import { ParameterService } from "../../../../shared/services/anuncio/parameter.service";
import { PaginatedResult } from '../../../../Models/Tbl_parameter_detModels';
@Component({
    selector: 'app-datosgenerales',
    templateUrl: './datosgenerales.component.html',
    styleUrls: ['./datosgenerales.component.css']
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

    constructor(
        private anuncioService: AnuncioService,
        private router: Router,
        private parameter: ParameterService

    ) { }

    ngOnInit() {
        debugger;
        let listaParamter = JSON.parse(localStorage.getItem('listParamter'));
        this.datosgenerales = this.anuncioService.getDatosGenerales();
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
        this.txt_descripcion_generalesCtrl = new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]);


        this.fromDatosGenerales = new FormGroup({
            int_edad: this.edadCtrl,
            int_pais_origen: this.paisCtrl,
            int_estudios: this.estudiosCtrl,
            txt_presentacion: this.txt_descripcion_generalesCtrl
        });

        // this.fromDatosGenerales.patchValue({
        //     edad: this.datosgenerales.cbo_edad,
        //     pais: this.datosgenerales.cbo_pais_origen,
        //     estudios: this.datosgenerales.cbo_estudio,
        //     descripciongenerales: this.datosgenerales.txt_descripcion_generales
        // });

    }

    selectName() {

    }
    goToPrevious(form: any) {
        this.router.navigate(['DashboardAnuncion/nuevoanuncio/datos-contacto']);
    }


    saveDatosGenerales() {
        this.isSubmittedDatosGenerales = true;
        if (!this.fromDatosGenerales.valid)
            return;

        let entidad: any = {};
        entidad.id_usuario = 11;
        entidad.int_edad = parseInt(this.fromDatosGenerales.value.int_edad);
        entidad.int_pais_origen = parseInt(this.fromDatosGenerales.value.int_pais_origen);
        entidad.int_estudios = parseInt(this.fromDatosGenerales.value.int_estudios);
        entidad.txt_presentacion = this.fromDatosGenerales.value.txt_presentacion;

        this.anuncioService.SaveSegundoPaso(entidad).subscribe(
            (res: PaginatedResult<any[]>) => {
                console.log(res.result);
                // localStorage.setItem('listParamter', JSON.stringify(this.listParameter));
                this.router.navigate(['DashboardAnuncion/nuevoanuncio/apariencia']);
            }
        );
        // this.anuncioService.setDatosGenerales(this.fromDatosGenerales.value)

        console.log(this.fromDatosGenerales);
        // userService.Save(this.register.value);
        this.result = this.fromDatosGenerales.value;
        setTimeout(() => {
            this.result = null;
            this.resetDatosGenerales();
        }, 2000);
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
        this.router.navigate(['DashboardAnuncion/nuevoanuncio/datos-contacto']);
    }
}
